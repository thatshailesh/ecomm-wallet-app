const chance = require('chance')();

const generateInventory = id => {
  const totalItems = chance.integer({ min: 100, max: 200 });
  return {
    productId: id,
    totalItems,
    itemsLeft: totalItems,
  };
};

const inventoryList = [];

const totalInvetory = process.env.INVENTORY || 50;

for (let i = 1; i <= totalInvetory; i += 1)
  inventoryList.push(generateInventory(i));

module.exports = inventoryList;
