"use client";

import React, { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      price: '৳1,299',
      originalPrice: '৳1,599',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Men',
      rating: 4.8,
      reviews: 124,
      badge: 'New'
    },
    {
      id: 2,
      name: 'Elegant Silk Dress',
      price: '৳3,999',
      originalPrice: '৳4,999',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Women',
      rating: 4.9,
      reviews: 89,
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'Classic Denim Jacket',
      price: '৳2,799',
      originalPrice: '৳3,299',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Unisex',
      rating: 4.7,
      reviews: 156,
      badge: 'Trending'
    },
    {
      id: 4,
      name: 'Traditional Kurta Set',
      price: '৳5,499',
      originalPrice: '৳6,999',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Traditional',
      rating: 4.9,
      reviews: 203,
      badge: 'Limited'
    },
    {
      id: 5,
      name: 'Casual Summer Shirt',
      price: '৳1,899',
      originalPrice: '৳2,199',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Men',
      rating: 4.6,
      reviews: 78,
      badge: 'Sale'
    },
    {
      id: 6,
      name: 'Designer Handbag',
      price: '৳4,299',
      originalPrice: '৳5,499',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Accessories',
      rating: 4.8,
      reviews: 167,
      badge: 'Premium'
    }
  ];

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / products.length;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(products.length - 1, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={scrollLeft}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="h-6 w-6 text-slate-600" />
      </button>

      <button
        onClick={scrollRight}
        disabled={currentIndex === products.length - 1}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="h-6 w-6 text-slate-600" />
      </button>

      {/* Product Carousel */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-80 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 border border-white/50">
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110">
                  <HeartIcon className="w-4 h-4 text-slate-600" />
                </button>
                <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110">
                  <EyeIcon className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full bg-white text-slate-900 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
                  <ShoppingCartIcon className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 uppercase tracking-wide">{product.category}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-slate-600">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviews})</span>
                </div>
              </div>

              <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-slate-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                )}
              </div>

              {/* Size Options */}
              <div className="flex gap-2 mb-3">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className="w-8 h-8 border border-slate-200 rounded text-xs font-medium hover:border-slate-400 transition-colors duration-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-slate-900 scale-125'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;