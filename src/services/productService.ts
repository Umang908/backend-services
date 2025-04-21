import { Product } from '@/types';

// Update the API URL to point to our local backend
const API_URL = 'http://localhost:5000/api';

/**
 * Fetch all products from the API
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products in category: ${category}`);
    }
    
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
}

/**
 * Fetch all product categories
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }
    
    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

/**
 * Create a new product
 */
export async function createProduct(productData: Omit<Product, 'id'>): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update product with ID: ${id}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    return null;
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete product with ID: ${id}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    return false;
  }
} 