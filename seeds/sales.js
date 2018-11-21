const chance = require('chance')();

const generateSales = id => ({
  name: chance.string(),
  country: 'SG',
  startDate: new Date(chance.date({ year: 2018, month: 10, day: 3 })).getTime(),
  endDate: new Date(chance.date({ year: 2018, month: 11, day: 3 })).getTime(),
  discount: 10,
  productId: id,
});

const sales = [];
sales.push(generateSales(1));
module.exports = sales;
