# UT Mart Backend API

This is a RESTful API backend for the UT Mart application, built with Express.js and MySQL using Sequelize ORM.

## Features

- Product management (CRUD operations)
- Category management (CRUD operations)
- RESTful API endpoints for frontend integration
- MySQL database with Sequelize ORM
- Response formatting to match the Fake Store API format

## Requirements

- Node.js (v18.18.0+)
- MySQL server
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
```bash
cd backend
```
3. Install dependencies:
```bash
npm install
```
4. Create a MySQL database named `kirana_store`
5. Configure the `.env` file with your database credentials

## Configuration

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
NODE_ENV=development

# MySQL Database
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=kirana_store
DB_PORT=3306
```

## Usage

### Start the server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Categories

- `GET /api/categories` - Get all category names (as an array)
- `GET /api/categories/details` - Get all categories with detailed info
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

## Request Examples

### Create a product

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "price": 19.99,
    "description": "This is a test product",
    "category": "electronics",
    "image": "https://example.com/image.jpg",
    "stock": 10,
    "rating_rate": 4.5,
    "rating_count": 10,
    "featured": true
  }'
```

### Create a category

```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Category",
    "description": "This is a new category",
    "icon": "🚀",
    "color": "bg-blue-100 text-blue-800"
  }'
```

## Data Model

### Product

- `id` - Auto-incremented ID
- `title` - Product title/name
- `price` - Product price
- `description` - Product description
- `category` - Category name (lowercase)
- `image` - Image URL
- `stock` - Stock amount (default: 10)
- `rating_rate` - Rating score (0-5)
- `rating_count` - Number of ratings
- `featured` - Whether the product is featured (boolean)
- `categoryId` - Foreign key to Category

### Category

- `id` - Auto-incremented ID
- `name` - Category name (lowercase, unique)
- `description` - Category description
- `icon` - Emoji or icon (default: 📦)
- `color` - CSS color classes (default: bg-gray-100 text-gray-800)

## Frontend Integration

To use this API with the frontend, update the services in the Next.js frontend to use this API instead of the Fake Store API:

```javascript
// src/services/productService.ts

const API_URL = 'http://localhost:5000/api';

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export async function getAllCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
}

// ... other methods
``` 