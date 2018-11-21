const mongoose = require('mongoose');
const { body, param, validationResult } = require('express-validator/check');

const Product = require('../models/product');
const Inventory = require('../models/inventory');

const Wallet = require('../models/wallet');
const User = require('../models/user');
const { NotFoundError, BadRequestError } = require('../errors');

const companyWalletId = 1;

async function transfer(from, to, amount) {
  if (!from || !to || !amount) throw new BadRequestError('Unmet dependencies');

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const opts = { session, new: true };
    const userWallet = await Wallet.findOneAndUpdate(
      { id: from },
      { $inc: { balance: -amount } },
      opts
    );

    if (!userWallet) throw new NotFoundError('User wallet dont exists');

    if (userWallet.balance < 0)
      // If A would have negative balance, fail and abort the transaction
      // `session.abortTransaction()` will undo the above `findOneAndUpdate()`
      throw new BadRequestError(
        `Insufficient funds: ${userWallet.balance + amount}`
      );

    const companyWallet = await Wallet.findOneAndUpdate(
      { id: to },
      { $inc: { balance: amount } },
      opts
    );

    if (!companyWallet) throw new NotFoundError('User wallet dont exists');

    await session.commitTransaction();
    session.endSession();
    return { from: userWallet, to: companyWallet };
  } catch (error) {
    // If an error occurred, abort the whole transaction and
    // undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
    throw error; // Rethrow so calling function sees error
  }
}

async function updateInventory(productId) {
  const productInventory = await Inventory.findOne({ productId });

  if (!productInventory)
    throw new NotFoundError('Inventory not found for product: ', productId);

  let { itemsLeft = null } = productInventory;
  const { totalItems } = productInventory;

  if (itemsLeft) itemsLeft -= 1;
  else itemsLeft = totalItems - 1;

  await Inventory.findOneAndUpdate(
    {
      productId,
    },
    {
      $set: {
        itemsLeft,
      },
    }
  );
}

module.exports = {
  purchase: async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    try {
      const productId = Number(req.params.id);
      const productDetails = await Product.findOne({
        id: productId,
      });

      if (!productDetails) throw new NotFoundError('Product not found');
      const { price } = productDetails;

      const { walletId } = await User.findOne({ id: Number(req.body.user_id) });

      const result = await transfer(walletId, companyWalletId, price);

      await updateInventory(productId);

      res.json(result);
    } catch (error) {
      return next(error);
    }
  },

  validate: method => {
    switch (method) {
      case 'purchase': {
        return [
          param('id')
            .exists()
            .isNumeric(),
          body('user_id')
            .exists()
            .isNumeric(),
        ];
      }
      default: {
        return [];
      }
    }
  },
  transfer,
};
