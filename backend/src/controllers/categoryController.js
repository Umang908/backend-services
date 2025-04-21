const { Category, Product } = require('../models');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    
    // Return just the category names as an array
    const categoryNames = categories.map(category => category.name);
    
    res.status(200).json(categoryNames);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all categories with details
exports.getAllCategoriesWithDetails = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Product,
        as: 'products',
        attributes: ['id', 'title']
      }]
    });
    
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error getting categories with details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        as: 'products',
        attributes: ['id', 'title', 'price', 'image', 'stock', 'rating_rate', 'rating_count']
      }]
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error getting category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({
      where: { name: name.toLowerCase() }
    });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({
      name,
      description,
      icon,
      color
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // If name is being changed, check for uniqueness
    if (name && name.toLowerCase() !== category.name) {
      const existingCategory = await Category.findOne({
        where: { name: name.toLowerCase() }
      });

      if (existingCategory) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
    }

    await category.update({
      name: name || category.name,
      description: description || category.description,
      icon: icon || category.icon,
      color: color || category.color
    });

    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if any products are using this category
    const productsCount = await Product.count({
      where: { categoryId: id }
    });

    if (productsCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category because it is being used by products',
        count: productsCount 
      });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 