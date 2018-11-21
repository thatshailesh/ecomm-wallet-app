const chai = require('chai');
const request = require('supertest');
const User = require('../src/models/user');
const Wallet = require('../src/models/wallet');
const userData = require('../seeds/users');
const walletData = require('../seeds/wallets');

const app = require('../app');

const { expect } = chai;

describe('GET /users', () => {
  before(done => {
    User.create(userData)
      .then(result => {
        if (!result) throw new Error('Failed to create');
        return Wallet.create(walletData);
      })
      .then(result => {
        if (!result) throw new Error('Failed to create');
        done();
      });
  });

  after(done => {
    User.collection.deleteMany();
    Wallet.collection.deleteMany();
    done();
  });

  it('should fail to get the wallet for invalid user', done => {
    request(app)
      .get('/users/wallet/1232323')
      .expect(404, done);
  });

  it('should be able to get the valid user wallet', done => {
    request(app)
      .get(`/users/wallet/${userData[0].id}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('balance');
        done();
      });
  });
});
