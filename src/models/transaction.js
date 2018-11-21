const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  userId: { type: Number, ref: 'User', field: 'id', index: true },
  amount: { type: Number, index: true },
  type: { type: String, index: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
