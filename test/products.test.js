const chai = require('chai');
const chance = require('chance')();
const request = require('supertest');
const User = require('../src/models/user');
const Wallet = require('../src/models/wallet');
const Product = require('../src/models/product');
const Inventory = require('../src/models/inventory');
const userData = require('../seeds/users');
const walletData = require('../seeds/wallets');
const productData = require('../seeds/products');
const inventoryData = require('../seeds/inventory');
const { transfer } = require('../src/controllers/products');

const app = require('../app');

const { expect } = chai;

const generateWallet = (id, balance) => ({
  id,
  balance,
  currency: 'SGD',
});

const generateUsers = walletId => ({
  name: chance.first(),
  address: chance.address(),
  email: chance.email(),
  id: chance.integer({ min: 100, max: 200 }),
  walletId,
});

describe('POST /products', () => {
  before(done => {
    const data = [
      User.create(userData),
      Wallet.create(walletData),
      Product.create(productData),
      Inventory.create(inventoryData),
    ];

    Promise.all(data).then(result => {
      if (!result || !result.length) throw new Error('Failed to create');
      done();
    });
  });

  after(done => {
    User.collection.deleteMany();
    Wallet.collection.deleteMany();
    Product.collection.deleteMany();
    done();
  });

  it('should allow user to purchase product', done => {
    const idx = walletData.findIndex(el => el.id === userData[0].walletId);

    const usrWalletBalance = walletData[idx].balance;

    const index = walletData.findIndex(el => el.id === 1);

    const companyWalletBalance = walletData[index].balance;

    request(app)
      .post(`/products/${productData[0].id}/purchase`)
      .send({
        user_id: userData[0].id,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        Product.findOne({ id: productData[0].id })
          .then(productDetails => {
            if (!productDetails) throw new Error('Product not found');
            const { price } = productDetails;
            const remainingBalance = usrWalletBalance - price;
            const toBalance = companyWalletBalance + price;
            expect(res.body.from.balance).to.equal(remainingBalance);
            expect(res.body.to.balance).to.equal(toBalance);
            done();
          })
          .catch(done);
      });
  });

  it('should not allow transaction of negative balance', done => {
    const lowBalanceWallet = generateWallet(111, 0);

    Wallet.create(lowBalanceWallet)
      .then(result => {
        if (!result) throw new Error('Failed to create');

        const user = generateUsers(111);

        return User.create(user);
      })
      .then(user => {
        if (!user) throw new Error('Failed to create');
        request(app)
          .post(`/products/${productData[1].id}/purchase`)
          .send({
            user_id: user.id,
          })
          .expect(400, done);
      })
      .catch(done);
  });

  it('should fail to purchase without user id', done => {
    request(app)
      .post(`/products/${123}/purchase`)
      .expect(422, done);
  });
});

describe('purchase', () => {
  it('should throw error for invalid dependecies', async () => {
    try {
      await transfer();
    } catch (err) {
      expect(err.status).to.equal(400);
    }
  });
});
