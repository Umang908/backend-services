"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

export interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  // Reset the "Added" status after 2 seconds
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleAddToCart = () => {
    // Add the product to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    // Show success feedback
    setIsAdded(true);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex items-center">
        <button 
          onClick={decrementQuantity}
          className="border rounded-l-md py-2 px-4 bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
        >
          -
        </button>
        <input 
          type="text" 
          className="w-12 border-t border-b text-center py-2" 
          value={quantity} 
          readOnly
        />
        <button 
          onClick={incrementQuantity}
          className="border rounded-r-md py-2 px-4 bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      <button 
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`flex-grow py-3 px-8 rounded-md font-medium inline-flex items-center justify-center transition-all duration-300 ${
          isAdded 
            ? 'bg-green-500 text-white' 
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isAdded ? (
          <>
            <svg 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            Added to Cart
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
} 