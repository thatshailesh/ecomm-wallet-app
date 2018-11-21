const chance = require('chance')();

const generateProducts = id => ({
  price: chance.floating({ min: 50, max: 1000, fixed: 1 }),
  currency: 'SGD',
  id,
  salesId: 1,
});

const products = [];

const totalProducts = process.env.PROD_NUM || 50;

for (let i = 1; i <= totalProducts; i += 1) products.push(generateProducts(i));

module.exports = products;
