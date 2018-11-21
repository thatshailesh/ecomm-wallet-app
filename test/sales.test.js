const chai = require('chai');
const chance = require('chance')();
const request = require('supertest');
const Sales = require('../src/models/sales');
const Product = require('../src/models/product');
const inventory = require('../src/models/inventory');

const productData = require('../seeds/products');
const inventoryData = require('../seeds/inventory');

const app = require('../app');

const { expect } = chai;

describe('/GET flash sales', () => {
  const generateSales = id => ({
    name: chance.string(),
    country: 'SG',
    startDate: new Date(
      chance.date({ year: 2018, month: 10, day: 3 })
    ).getTime(),
    endDate: new Date(chance.date({ year: 2018, month: 11, day: 3 })).getTime(),
    discount: 10,
    productId: id,
  });

  const salesList = [];
  const totalSales = 5;

  for (let i = 1; i < totalSales; i += 1) salesList.push(generateSales(i));

  before(async () => {
    await Promise.all([
      Product.create(productData),
      inventory.create(inventoryData),
      Sales.create(salesList),
    ]);
  });

  after(async () => {
    await Promise.all([
      Product.collection.deleteMany(),
      inventory.collection.deleteMany(),
      Sales.collection.deleteMany(),
    ]);
  });

  it('should be able to get current flash sales', done => {
    request(app)
      .get('/sales/current?country=SG')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body)
          .to.be.an('array')
          .have.lengthOf(totalSales - 1);

        res.body.forEach(element => {
          expect(element).to.have.property('time_left');
          expect(element).to.have.property('items_left');
          expect(element).to.have.property('total_items');
          expect(element).to.have.property('currency');
          expect(element).to.have.property('price');
          expect(element).to.have.property('product_id');
        });
        done();
      });
  });

  it('should not show flash sales of country other than SG', done => {
    request(app)
      .get('/sales/current?country=US')
      .expect(404, done);
  });
});
