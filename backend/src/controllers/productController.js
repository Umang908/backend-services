const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        as: 'categoryDetails',
        attributes: ['id', 'name']
      }]
    });

    // Transform the data to match the expected format
    const formattedProducts = products.map(product => ({
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock,
      rating: product.getRating(),
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'categoryDetails',
        attributes: ['id', 'name']
      }]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Format the product data
    const formattedProduct = {
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock,
      rating: product.getRating(),
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const products = await Product.findAll({
      where: {
        category: category.toLowerCase()
      },
      include: [{
        model: Category,
        as: 'categoryDetails',
        attributes: ['id', 'name']
      }]
    });

    // Transform the data to match the expected format
    const formattedProducts = products.map(product => ({
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock,
      rating: product.getRating(),
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Error getting products by category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { 
      title, price, description, category, 
      image, stock, rating_rate, rating_count, featured 
    } = req.body;

    // Check if category exists, if not create it
    let categoryRecord = await Category.findOne({
      where: { name: category.toLowerCase() }
    });

    if (!categoryRecord) {
      categoryRecord = await Category.create({
        name: category.toLowerCase(),
        description: `${category} category`
      });
    }

    // Create the product
    const product = await Product.create({
      title,
      price,
      description,
      category: category.toLowerCase(),
      image,
      stock: stock || 10,
      rating_rate: rating_rate || 0,
      rating_count: rating_count || 0,
      featured: featured || false,
      categoryId: categoryRecord.id
    });

    res.status(201).json({
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock,
      rating: product.getRating(),
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, price, description, category, 
      image, stock, rating_rate, rating_count, featured 
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If category has changed, update the categoryId
    if (category && category.toLowerCase() !== product.category) {
      let categoryRecord = await Category.findOne({
        where: { name: category.toLowerCase() }
      });

      if (!categoryRecord) {
        categoryRecord = await Category.create({
          name: category.toLowerCase(),
          description: `${category} category`
        });
      }

      product.categoryId = categoryRecord.id;
    }

    // Update the product
    await product.update({
      title: title || product.title,
      price: price || product.price,
      description: description || product.description,
      category: category ? category.toLowerCase() : product.category,
      image: image || product.image,
      stock: stock !== undefined ? stock : product.stock,
      rating_rate: rating_rate !== undefined ? rating_rate : product.rating_rate,
      rating_count: rating_count !== undefined ? rating_count : product.rating_count,
      featured: featured !== undefined ? featured : product.featured
    });

    res.status(200).json({
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock,
      rating: product.getRating(),
      featured: product.featured,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 