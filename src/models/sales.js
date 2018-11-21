const mongoose = require('mongoose');

const { Schema } = mongoose;

const salesSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    country: { type: String, required: true, default: 'SG' },
    startDate: { type: Number, required: true },
    endDate: { type: Number, required: true },
    discount: { type: Number, required: true },
    productId: { type: Number, required: true, ref: 'Product', field: 'id' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = mongoose.model('Sales', salesSchema);
