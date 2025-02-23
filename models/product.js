const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  image: {
    type: String,
    required: true, // Image URL is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  price: {
    type: Number,
    required: true, // Price is required
    min: 0, // Price cannot be negative
  },
});

// Create the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;