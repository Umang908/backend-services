import { Product } from '@/types';

const API_URL = 'http://localhost:5000/api';

/**
 * Fetch all products from the local API
 */
export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products in category: ${category}`);
  }
  
  return response.json();
}

/**
 * Fetch all product categories
 */
export async function getAllCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID: ${id}`);
  }
  
  return response.json();
}

/**
 * Create a new product
 */
export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  
  return response.json();
}

/**
 * Update an existing product
 */
export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update product with ID: ${id}`);
  }
  
  return response.json();
}

/**
 * Delete a product
 */
export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete product with ID: ${id}`);
  }
} 