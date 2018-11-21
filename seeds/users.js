const chance = require('chance')();

const generateUsers = walletId => ({
  name: chance.first(),
  address: chance.address(),
  email: chance.email(),
  id: chance.integer({ min: 100, max: 200 }),
  walletId,
});

const users = [];

const numberOfUsers = process.env.USERS_NUM || 10;

for (let i = 1; i <= numberOfUsers; i += 1) users.push(generateUsers(i + 1));

module.exports = users;
