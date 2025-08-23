"use client";

import React from 'react';
import { XMarkIcon, TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface CartDrawerProps {
  onClose: () => void;
}

const CartDrawer = ({ onClose }: CartDrawerProps) => {
  // Mock cart data - in real app this would come from context/state
  const cartItems = [
    {
      id: '1',
      name: 'Traditional Jamdani Saree',
      bengaliName: 'ঐতিহ্যগত জামদানি শাড়ি',
      price: 8500,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      size: 'Free Size',
      color: 'Red'
    },
    {
      id: '2',
      name: 'Modern Kurta Set',
      bengaliName: 'আধুনিক কুর্তা সেট',
      price: 3200,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      size: 'M',
      color: 'White'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart
              <span className="block text-sm font-normal text-gray-500">শপিং কার্ট</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Start shopping to add items to your cart</p>
              <button
                onClick={onClose}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {item.bengaliName}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>Size: {item.size}</span>
                    <span>Color: {item.color}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">৳{item.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700 transition-colors duration-200">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `৳${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-gray-500">
                  Free shipping on orders above ৳2000
                </div>
              )}
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                Proceed to Checkout
                <span className="block text-sm font-normal">চেকআউটে এগিয়ে যান</span>
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Shopping
                <span className="block text-sm font-normal">কেনাকাটা চালিয়ে যান</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>Free delivery on orders above ৳2000</p>
              <p>Easy returns & exchanges</p>
              <p>Secure payment options</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;