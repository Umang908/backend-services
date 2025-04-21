const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const { syncDatabase } = require('./models');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Create Express app
const app = express();

// Set port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to UT Mart API',
    endpoints: {
      products: '/api/products',
      productById: '/api/products/:id',
      productsByCategory: '/api/products/category/:category',
      categories: '/api/categories',
      categoriesWithDetails: '/api/categories/details',
      categoryById: '/api/categories/:id'
    }
  });
});

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Sync models with database (set force to true to drop and recreate tables)
    await syncDatabase(false);
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 