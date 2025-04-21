const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET all categories (names only)
router.get('/', categoryController.getAllCategories);

// GET all categories with details
router.get('/details', categoryController.getAllCategoriesWithDetails);

// GET a single category by ID
router.get('/:id', categoryController.getCategoryById);

// POST create a new category
router.post('/', categoryController.createCategory);

// PUT update a category
router.put('/:id', categoryController.updateCategory);

// DELETE a category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router; 