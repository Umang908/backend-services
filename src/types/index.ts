export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock?: number;
  featured?: boolean;
}

export type ProductCategory = string;

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  products?: Product[];
} 