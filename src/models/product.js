const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    price: { type: Number, required: true, index: true },
    currency: { type: String, required: true },
    id: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = mongoose.model('Product', productSchema);
