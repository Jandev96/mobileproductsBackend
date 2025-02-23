const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const Product = require('./models/product'); // Import the Product model

const cors = require('cors');

// Enable CORS for all routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['https://mobileproducts-front.vercel.app', 'http://localhost:5173'] // Your frontend URL
  }));
// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Route to create a new product
app.post('/products', async (req, res) => {
  try {
    const { title, image, description, price } = req.body;

    // Create a new product using the Product model
    const product = new Product({ title, image, description, price });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// Route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});