const mongoose = require('mongoose');

const { Schema } = mongoose;

const inventorySchema = new Schema(
  {
    productId: { type: Number, required: true, index: true },
    totalItems: { type: Number, required: true },
    itemsLeft: { type: Number, index: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = mongoose.model('Inventory', inventorySchema);
