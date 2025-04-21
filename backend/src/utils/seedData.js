const fetch = require('node-fetch');
const { sequelize, Category, Product, syncDatabase } = require('../models');
const { connectDB } = require('../config/db');
require('dotenv').config();

// URL for Fake Store API
const FAKE_STORE_API = 'https://fakestoreapi.com';

// Function to seed categories
const seedCategories = async () => {
  try {
    // Fetch categories from Fake Store API
    const response = await fetch(`${FAKE_STORE_API}/products/categories`);
    const categories = await response.json();
    
    console.log('Seeding categories...');
    
    // Create categories
    for (const category of categories) {
      // Define icon and color based on category
      let icon = '📦';
      let color = 'bg-gray-100 text-gray-800';
      
      switch(category) {
        case 'electronics':
          icon = '🔌';
          color = 'bg-blue-100 text-blue-800';
          break;
        case 'jewelery':
          icon = '💍';
          color = 'bg-purple-100 text-purple-800';
          break;
        case "men's clothing":
          icon = '👔';
          color = 'bg-amber-100 text-amber-800';
          break;
        case "women's clothing":
          icon = '👗';
          color = 'bg-pink-100 text-pink-800';
          break;
      }
      
      await Category.create({
        name: category,
        description: `${category.charAt(0).toUpperCase() + category.slice(1)} products`,
        icon,
        color
      });
    }
    
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
};

// Function to seed products
const seedProducts = async () => {
  try {
    // Fetch products from Fake Store API
    const response = await fetch(`${FAKE_STORE_API}/products`);
    const products = await response.json();
    
    console.log('Seeding products...');
    
    // Get all categories
    const categories = await Category.findAll();
    
    // Create products
    for (const product of products) {
      // Find category
      const category = categories.find(c => c.name === product.category);
      
      await Product.create({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        stock: Math.floor(Math.random() * 100) + 1, // Random stock between 1 and 100
        rating_rate: product.rating.rate,
        rating_count: product.rating.count,
        featured: Math.random() > 0.7, // 30% chance of being featured
        categoryId: category ? category.id : null
      });
    }
    
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

// Main function to seed the database
const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    console.log('Syncing database models...');
    await syncDatabase(true); // Passing true to drop and recreate tables
    
    console.log('Starting seed process...');
    await seedCategories();
    await seedProducts();
    
    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 