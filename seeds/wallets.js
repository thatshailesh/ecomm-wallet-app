const chance = require('chance')();

const generateWallets = id => ({
  id,
  balance: chance.floating({ min: 1000, max: 5000, fixed: 1 }),
  currency: 'SGD',
});

const wallets = [generateWallets(1)];

const totalWallets = process.env.WALLET_NUM || 8;

for (let i = 2; i <= totalWallets; i += 1) wallets.push(generateWallets(i));

module.exports = wallets;
