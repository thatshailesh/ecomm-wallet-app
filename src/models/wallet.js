const mongoose = require('mongoose');

const { Schema } = mongoose;

const walletSchema = new Schema(
  {
    balance: { type: Number, required: true, index: true },
    currency: { type: String, required: true },
    id: { type: Number, index: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = mongoose.model('Wallet', walletSchema);
