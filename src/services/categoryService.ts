import { Category } from '@/types';

const API_URL = 'http://localhost:5000/api';

/**
 * Fetch all categories with just names
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
 * Fetch all categories with details
 */
export async function getAllCategoriesWithDetails(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/categories/details`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories with details');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching categories with details:', error);
    return [];
  }
}

/**
 * Fetch a single category by ID
 */
export async function getCategoryById(id: number): Promise<Category | null> {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category with ID: ${id}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return null;
  }
}

/**
 * Create a new category
 */
export async function createCategory(categoryData: Omit<Category, 'id'>): Promise<Category | null> {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
}

/**
 * Update an existing category
 */
export async function updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update category with ID: ${id}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    return null;
  }
}

/**
 * Delete a category
 */
export async function deleteCategory(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete category with ID: ${id}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    return false;
  }
} 