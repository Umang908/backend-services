"use client";

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { XMarkIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    cartCount
  } = useCart();

  // Calculate savings
  const calculateSavings = () => {
    let regularTotal = 0;
    cartItems.forEach(item => {
      // Assume 10% markup for original price
      const originalPrice = item.price * 1.1;
      regularTotal += originalPrice * item.quantity;
    });
    return regularTotal - cartTotal;
  };

  return (
    <>
      {/* Overlay/backdrop */}
      {/* {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-0 z-40"
          onClick={closeCart}
          aria-hidden="false"
        />
      )} */}

      {/* Cart drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-labelledby="cart-heading"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col">
          {/* Cart header */}
          <div className="px-4 py-3 bg-emerald-600 text-white flex justify-between items-center">
            <h2 id="cart-heading" className="text-lg font-semibold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Shopping Cart ({cartCount})
            </h2>
            <button 
              onClick={closeCart}
              className="p-1 rounded-full hover:bg-emerald-700 transition-colors"
              aria-label="Close cart"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto py-2 bg-gray-50">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium mb-2">Your cart is empty</p>
                <p className="text-gray-500 text-sm mb-6">Add items to it now</p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 bg-white mb-2 shadow-sm">
                    <div className="flex items-start">
                      {/* Product image */}
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain object-center p-1"
                        />
                      </div>

                      {/* Product details */}
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded-md bg-gray-50">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 px-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-2 text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2 text-gray-600 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {new Intl.NumberFormat('en-IN', { 
                                style: 'currency', 
                                currency: 'INR' 
                              }).format(item.price * item.quantity)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Intl.NumberFormat('en-IN', { 
                                style: 'currency', 
                                currency: 'INR' 
                              }).format(item.price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart footer */}
          {cartItems.length > 0 && (
            <div className="border-t px-4 py-4 sm:px-6 bg-white">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({cartCount} items):</span>
                  <span>
                    {new Intl.NumberFormat('en-IN', { 
                      style: 'currency', 
                      currency: 'INR' 
                    }).format(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Your Savings:</span>
                  <span>
                    {new Intl.NumberFormat('en-IN', { 
                      style: 'currency', 
                      currency: 'INR' 
                    }).format(calculateSavings())}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t">
                  <span>Total:</span>
                  <span>
                    {new Intl.NumberFormat('en-IN', { 
                      style: 'currency', 
                      currency: 'INR' 
                    }).format(cartTotal)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-green-600 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your order is eligible for FREE Delivery
              </p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={closeCart}
                  className="text-sm text-emerald-600 hover:text-emerald-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 