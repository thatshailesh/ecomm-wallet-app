const chance = require('chance')();

module.exports = [
  {
    name: chance.company(),
    address: chance.address(),
    phone: chance.phone(),
    walletId: 1,
  },
];
