const Wallet = require('../models/wallet');
const User = require('../models/user');

const { NotFoundError } = require('../errors');

module.exports = {
  getWallet: async (req, res, next) => {
    const { id } = req.params;

    try {
      const userDetails = await User.findOne({ id: Number(id) });

      if (!userDetails) throw new NotFoundError('User not found');

      const walletDetails = await Wallet.findOne({ id: userDetails.walletId });

      if (!walletDetails) throw new NotFoundError('Wallet not found');

      res.json(walletDetails);
    } catch (e) {
      return next(e);
    }
  },
};
