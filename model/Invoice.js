const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoiceNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  gstin: { type: String, required: true },
  estimateDate: { type: Date, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Invoice', invoiceSchema);
