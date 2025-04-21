const { sequelize } = require('../config/db');
const Category = require('./Category');
const Product = require('./Product');

// Define relationships
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products'
});

// Function to sync all models with the database
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  Category,
  Product,
  syncDatabase
}; 