const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: true },
    walletId: { type: Number, index: true, ref: 'Wallet', field: 'id' },
    email: { type: String },
    id: { type: Number, index: true, required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = mongoose.model('User', userSchema);
