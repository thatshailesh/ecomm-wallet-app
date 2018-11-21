const Sales = require('../models/sales');
const Inventory = require('../models/inventory');
const Product = require('../models/product');

const { NotFoundError } = require('../errors');

module.exports = {
  getCurrentFlashSale: async (req, res, next) => {
    const { country } = req.query;

    try {
      const flashSales = await Sales.find({
        startDate: { $lte: new Date().getTime() },
        endDate: { $gte: new Date().getTime() },
        country,
      });

      if (!flashSales.length)
        throw new NotFoundError('There no current flash sales');

      const result = flashSales.map(async el => {
        const productInventory = await Inventory.findOne({
          productId: el.productId,
        });

        const productDetails = await Product.findOne({
          id: el.productId,
        });

        if (productInventory && productDetails)
          return {
            product_id: el.productId,
            price: productDetails.price,
            currency: productDetails.currency,
            total_items: productInventory.totalItems,
            items_left: productInventory.itemsLeft,
            time_left:
              (new Date(el.endDate).getTime() - new Date().getTime()) / 1000,
          };

        return {};
      });

      const data = await Promise.all(result);

      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};
