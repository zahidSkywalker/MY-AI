"use client";

import React from 'react';
import ProductCarousel from './ProductCarousel';

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of premium clothing items,
            carefully selected for quality and style.
          </p>
        </div>

        {/* Product Carousel */}
        <ProductCarousel />
      </div>
    </section>
  );
};

export default FeaturedProducts;