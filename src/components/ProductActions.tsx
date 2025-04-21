"use client";

import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';

interface ProductActionsProps {
  productData: string;
}

export default function ProductActions({ productData }: ProductActionsProps) {
  const product = JSON.parse(productData) as Product;
  
  return (
    <div className="mt-auto">
      <AddToCartButton product={product} />
    </div>
  );
} 