"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const rating = product.rating.rate || 4.5;
  const stars = Array(5).fill(0);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  
  // Get discounted price (deterministic based on product ID)
  const discount = 5 + (product.id % 20); // Will generate a number between 5-24
  const originalPrice = (product.price * (100 / (100 - discount))).toFixed(2);
  
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div 
      className="group rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden bg-white">
        {imageError ? (
          // Fallback for image loading errors
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-500">{product.title}</p>
            </div>
          </div>
        ) : (
          <>
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 scale-90 group-hover:scale-100"
              onError={() => setImageError(true)}
            />
          </>
        )}
        
        {/* Top right badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.stock && product.stock < 5 ? (
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              Only {product.stock} left
            </span>
          ) : (
            <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              In Stock
            </span>
          )}
          
          {product.featured && (
            <span className="bg-yellow-400 text-green-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              Featured
            </span>
          )}
          
          <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {discount}% OFF
          </span>
        </div>
        
        {/* Quick Action Buttons that appear on hover */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <button className="bg-white text-green-700 p-2 rounded-full shadow-md hover:bg-green-50 transition-colors" title="Add to favorites">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="bg-white text-green-700 p-2 rounded-full shadow-md hover:bg-green-50 transition-colors" title="Quick view">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="bg-white text-green-700 p-2 rounded-full shadow-md hover:bg-green-50 transition-colors" title="Compare">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Category badge */}
      <div className="bg-gray-100 text-gray-700 text-xs px-3 py-1 capitalize">
        {product.category}
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="mb-2">
          <h3 className="text-md font-semibold text-gray-800 line-clamp-1 group-hover:text-green-700 transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center mt-1">
            <div className="flex text-amber-400">
              {stars.map((_, index) => (
                <svg 
                  key={index} 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-3 w-3 ${index < Math.floor(rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-500">({product.rating.count})</span>
            </div>
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="text-green-700 font-bold text-lg">₹{product.price.toFixed(2)}</span>
          <span className="ml-2 text-gray-400 line-through text-xs">₹{originalPrice}</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-xs mb-4 h-8 line-clamp-2">{product.description}</p>
        
        {/* Stock indicator */}
        {product.stock && (
          <div className="mb-3">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-gray-500">Available: {product.stock}</span>
              <span className="text-gray-500">{Math.min(100, Math.round((product.stock / 20) * 100))}%</span>
            </div>
            <div className="bg-gray-100 h-1.5 w-full rounded-full overflow-hidden">
              <div 
                className="bg-green-600 h-full rounded-full" 
                style={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Link 
            href={`/products/${product.id}`}
            className="flex justify-center items-center bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Details
          </Link>
          <button 
            onClick={handleAddToCart}
            className="flex justify-center items-center bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors group-hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 