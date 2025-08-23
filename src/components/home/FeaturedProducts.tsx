"use client";

import React, { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All', bengaliName: 'সব' },
    { id: 'traditional', name: 'Traditional', bengaliName: 'ঐতিহ্যগত' },
    { id: 'casual', name: 'Casual', bengaliName: 'ক্যাজুয়াল' },
    { id: 'formal', name: 'Formal', bengaliName: 'ফরমাল' },
    { id: 'children', name: 'Children', bengaliName: 'শিশু' }
  ];

  const products = [
    {
      id: '1',
      name: 'Traditional Jamdani Saree',
      bengaliName: 'ঐতিহ্যগত জামদানি শাড়ি',
      price: 8500,
      originalPrice: 12000,
      discount: 29,
      rating: 4.8,
      reviewCount: 127,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'traditional',
      colors: ['Red', 'Blue', 'Green'],
      sizes: ['Free Size'],
      isNew: true
    },
    {
      id: '2',
      name: 'Modern Kurta Set',
      bengaliName: 'আধুনিক কুর্তা সেট',
      price: 3200,
      originalPrice: 4500,
      discount: 29,
      rating: 4.6,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'casual',
      colors: ['White', 'Black', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
      isNew: false
    },
    {
      id: '3',
      name: 'Elegant Salwar Kameez',
      bengaliName: 'ম elegant সালওয়ার কামিজ',
      price: 5500,
      originalPrice: 7500,
      discount: 27,
      rating: 4.9,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'traditional',
      colors: ['Pink', 'Purple', 'Gold'],
      sizes: ['S', 'M', 'L'],
      isNew: true
    },
    {
      id: '4',
      name: 'Casual T-Shirt Collection',
      bengaliName: 'ক্যাজুয়াল টি-শার্ট কালেকশন',
      price: 1200,
      originalPrice: 1800,
      discount: 33,
      rating: 4.5,
      reviewCount: 234,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'casual',
      colors: ['White', 'Black', 'Gray', 'Blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      isNew: false
    },
    {
      id: '5',
      name: 'Formal Business Suit',
      bengaliName: 'ফরমাল ব্যবসায়িক স্যুট',
      price: 15000,
      originalPrice: 22000,
      discount: 32,
      rating: 4.7,
      reviewCount: 67,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'formal',
      colors: ['Navy', 'Charcoal', 'Black'],
      sizes: ['S', 'M', 'L', 'XL'],
      isNew: false
    },
    {
      id: '6',
      name: 'Kids Traditional Dress',
      bengaliName: 'শিশুদের ঐতিহ্যগত পোশাক',
      price: 2800,
      originalPrice: 3800,
      discount: 26,
      rating: 4.8,
      reviewCount: 98,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'children',
      colors: ['Red', 'Blue', 'Pink', 'Yellow'],
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
      isNew: true
    }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Featured Products
            <span className="block text-xl text-gray-600 mt-2">বৈশিষ্ট্যযুক্ত পণ্য</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of premium clothing items,
            carefully selected for quality and style.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow-md hover:border-primary-200'
              }`}
            >
              <span className="block">{category.name}</span>
              <span className="block text-xs mt-1 opacity-80">{category.bengaliName}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 border border-white/50">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* New Badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    New
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  -{product.discount}%
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-16 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-all duration-200 hover:scale-110"
                >
                  {wishlist.includes(product.id) ? (
                    <HeartSolidIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                </button>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                  <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 shadow-xl hover:scale-105">
                    <ShoppingCartIcon className="h-5 w-5" />
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="text-xs text-gray-500 mb-1">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {product.bengaliName}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          product.rating > i ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ৳{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Colors & Sizes */}
                <div className="space-y-3 mb-4">
                  {/* Colors */}
                  <div>
                    <span className="text-sm font-medium text-gray-700">Colors:</span>
                    <div className="flex gap-2 mt-1">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <span className="text-sm font-medium text-gray-700">Sizes:</span>
                    <div className="flex gap-2 mt-1">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:border-primary-500 hover:text-primary-600 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5" />
                  Add to Cart
                  <span className="text-sm">কার্টে যোগ করুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg">
            View All Products
            <span className="block text-sm mt-1">সব পণ্য দেখুন</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;