'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  XMarkIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    name: 'Traditional Saree',
    bengaliName: 'ঐতিহ্যগত শাড়ি',
    price: 2500,
    quantity: 1,
    image: '/images/products/saree-1.jpg',
    size: 'Free Size',
    color: 'Red'
  },
  {
    id: 2,
    name: 'Salwar Kameez Set',
    bengaliName: 'সালোয়ার কামিজ সেট',
    price: 1800,
    quantity: 2,
    image: '/images/products/salwar-1.jpg',
    size: 'M',
    color: 'Pink'
  }
]

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState(mockCartItems)

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 1000 ? 0 : 100
  const total = subtotal + shipping

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold">
                <span className="bengali">শপিং কার্ট</span>
                <span className="ml-2">Shopping Cart</span>
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
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  <span className="bengali">আপনার কার্ট খালি</span>
                  <span className="ml-2">Your cart is empty</span>
                </h3>
                <p className="text-gray-500 mb-6">
                  Start shopping to add items to your cart
                </p>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <span className="bengali">শপিং শুরু করুন</span>
                  <span className="ml-2">Start Shopping</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 bengali">
                        {item.bengaliName}
                      </p>
                      <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                        <span>Size: {item.size}</span>
                        <span>•</span>
                        <span>Color: {item.color}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          ৳{item.price.toLocaleString()}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Summary Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    <span className="bengali">সাবটোটাল</span>
                    <span className="ml-2">Subtotal</span>
                  </span>
                  <span className="font-medium">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    <span className="bengali">শিপিং</span>
                    <span className="ml-2">Shipping</span>
                  </span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `৳${shipping.toLocaleString()}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className="text-xs text-green-600">
                    <span className="bengali">৳১০০০ এর উপরে অর্ডারে বিনামূল্যে শিপিং</span>
                    <span className="ml-2">Free shipping on orders above ৳1000</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>
                      <span className="bengali">মোট</span>
                      <span className="ml-2">Total</span>
                    </span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 text-center block"
                >
                  <span className="bengali">চেকআউট করুন</span>
                  <span className="ml-2">Proceed to Checkout</span>
                </Link>
                
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-center block"
                >
                  <span className="bengali">কার্ট দেখুন</span>
                  <span className="ml-2">View Cart</span>
                </Link>
              </div>

              {/* Continue Shopping */}
              <div className="text-center">
                <button
                  onClick={onClose}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                >
                  <span className="bengali">শপিং চালিয়ে যান</span>
                  <span className="ml-2">Continue Shopping</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}