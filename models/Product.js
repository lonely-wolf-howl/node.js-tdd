const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  price: {
    type: Number,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
