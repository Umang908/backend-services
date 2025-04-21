"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

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

  // Check if cart is empty and redirect
  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      router.push('/products');
    }
  }, [cartItems, router, orderPlaced]);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate random order ID
    const randomOrderId = 'ORD' + Math.floor(Math.random() * 10000000);
    setOrderId(randomOrderId);
    
    setOrderPlaced(true);
    clearCart();
    setIsProcessing(false);
  };

  // Render confirmation screen after order is placed
  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You For Your Order!</h1>
          <p className="text-gray-600 mb-2">Your order has been placed successfully.</p>
          <p className="text-gray-600 mb-6">Order ID: <span className="font-semibold">{orderId}</span></p>
          
          <div className="mb-8 bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-gray-700 mb-2">We have sent an order confirmation email to your registered email address.</p>
            <p className="text-gray-700">Your order will be delivered within 3-5 business days.</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/products"
              className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="flex mb-8 border-b">
        <div className={`pb-4 px-4 ${step >= 1 ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-500'}`}>
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>1</span>
          Delivery Address
        </div>
        <div className={`pb-4 px-4 ${step >= 2 ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-500'}`}>
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>2</span>
          Payment Method
        </div>
        <div className={`pb-4 px-4 ${step >= 3 ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-500'}`}>
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>3</span>
          Review & Place Order
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Delivery Address */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
              <form onSubmit={handleAddressSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={deliveryAddress.name}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    id="street"
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      id="state"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      id="pincode"
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={deliveryAddress.pincode}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, pincode: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                  >
                    Continue to Payment
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <form onSubmit={handlePaymentSubmit}>
                <div className="space-y-4">
                  <div className="border rounded-md p-3 flex items-start">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1"
                    />
                    <label htmlFor="cod" className="ml-3 flex-1">
                      <span className="block font-medium text-gray-700">Cash on Delivery</span>
                      <span className="block text-sm text-gray-500 mt-1">Pay when your order is delivered</span>
                    </label>
                  </div>
                  
                  <div className="border rounded-md p-3 flex items-start">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1"
                    />
                    <label htmlFor="card" className="ml-3 flex-1">
                      <span className="block font-medium text-gray-700">Credit/Debit Card</span>
                      <span className="block text-sm text-gray-500 mt-1">Pay securely with your card</span>
                    </label>
                  </div>
                  
                  <div className="border rounded-md p-3 flex items-start">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1"
                    />
                    <label htmlFor="upi" className="ml-3 flex-1">
                      <span className="block font-medium text-gray-700">UPI</span>
                      <span className="block text-sm text-gray-500 mt-1">Pay with your preferred UPI app</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                  >
                    Continue to Review
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 3: Review Order */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>
                
                {/* Delivery Address Summary */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Delivery Address</h3>
                    <button 
                      onClick={() => setStep(1)} 
                      className="text-sm text-emerald-600 hover:text-emerald-800"
                    >
                      Change
                    </button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">{deliveryAddress.name}</p>
                    <p>{deliveryAddress.street}</p>
                    <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.pincode}</p>
                    <p>Phone: {deliveryAddress.phone}</p>
                  </div>
                </div>
                
                {/* Payment Method Summary */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Payment Method</h3>
                    <button 
                      onClick={() => setStep(2)} 
                      className="text-sm text-emerald-600 hover:text-emerald-800"
                    >
                      Change
                    </button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    {paymentMethod === 'cod' && <p>Cash on Delivery</p>}
                    {paymentMethod === 'card' && <p>Credit/Debit Card</p>}
                    {paymentMethod === 'upi' && <p>UPI</p>}
                  </div>
                </div>
                
                {/* Order Items */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Order Items ({cartCount})</h3>
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex border-b pb-4">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded border overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Intl.NumberFormat('en-IN', { 
                              style: 'currency', 
                              currency: 'INR' 
                            }).format(item.price)} × {item.quantity}
                          </p>
                          <p className="text-sm font-medium mt-1">
                            {new Intl.NumberFormat('en-IN', { 
                              style: 'currency', 
                              currency: 'INR' 
                            }).format(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className={`px-6 py-2 rounded-md transition-colors flex items-center ${
                      isProcessing 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Items ({cartCount}):</span>
                <span>
                  {new Intl.NumberFormat('en-IN', { 
                    style: 'currency', 
                    currency: 'INR' 
                  }).format(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping & Handling:</span>
                <span>₹0.00</span>
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
            </div>
            
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>Order Total:</span>
                <span>
                  {new Intl.NumberFormat('en-IN', { 
                    style: 'currency', 
                    currency: 'INR' 
                  }).format(cartTotal)}
                </span>
              </div>
            </div>
            
            {step === 3 && (
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full mt-4 px-6 py-2 rounded-md transition-colors flex items-center justify-center ${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            )}
            
            <div className="mt-4 bg-green-50 p-3 rounded-md text-sm text-green-800">
              <p className="flex items-start">
                <svg className="h-5 w-5 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Your order is eligible for FREE Delivery.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 