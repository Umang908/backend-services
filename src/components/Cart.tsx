"use client";

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

// Define CartItem interface
interface CartItem extends Product {
  quantity: number;
}

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartTotal,
    cartCount 
  } = useCart();
  const router = useRouter();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty >= 1) {
      updateQuantity(id, newQty);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      {/* Cart Button */}
      <button 
        onClick={toggleCart}
        className="relative p-2 text-green-700 hover:bg-green-50 rounded-full transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Cart Drawer */}
      <div className={`fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Your Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-500 mb-6">Your cart is empty</p>
                <button 
                  onClick={() => {
                    router.push('/products');
                    setIsOpen(false);
                  }}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItemCard 
                    key={item.id} 
                    item={item} 
                    removeFromCart={removeFromCart} 
                    updateQuantity={handleQuantityChange} 
                  />
                ))}

                {/* Clear Cart Button */}
                <div className="mt-4 pt-4 border-t">
                  <button 
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Subtotal:</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 font-bold text-gray-800">
                <span>Total:</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CartItemCardProps {
  item: CartItem;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

function CartItemCard({ item, removeFromCart, updateQuantity }: CartItemCardProps) {
  return (
    <div className="flex border rounded-lg p-2 bg-white">
      {/* Product Image */}
      <div className="w-16 h-16 bg-gray-50 rounded flex-shrink-0 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.png'; // Fallback image
          }}
        />
      </div>
      
      {/* Product Details */}
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <div>
            <Link 
              href={`/products/${item.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-gray-800 hover:text-green-600 line-clamp-1"
            >
              {item.title}
            </Link>
            <p className="text-xs text-gray-500 capitalize">{item.category}</p>
          </div>
          
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded-md">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-2 text-xs font-medium">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          
          <div className="text-right">
            <div className="text-sm font-medium text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</div>
            <div className="text-xs text-gray-500">₹{item.price.toFixed(2)} each</div>
          </div>
        </div>
      </div>
    </div>
  );
} 