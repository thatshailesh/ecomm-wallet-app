const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true, index: true },
    walletId: { type: Number, index: true, ref: 'Wallet', field: 'id' },
    id: { type: Number, index: true, require: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = mongoose.model('Company', companySchema);
