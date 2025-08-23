'use client'

import React from 'react';
import { MagnifyingGlassIcon, PlayIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Professional Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="block">Discover Your Style</span>
          <span className="block text-2xl md:text-4xl font-medium mt-2">আপনার স্টাইল আবিষ্কার করুন</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Premium clothing for every occasion. From traditional elegance to modern fashion, 
          find your perfect look with Bangladesh's finest collection.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 pl-12 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center gap-2">
            Shop Traditional
            <span className="text-sm">ঐতিহ্যগত কেনাকাটা</span>
          </button>
          
          <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 backdrop-blur-sm">
            <PlayIcon className="h-5 w-5" />
            Watch Video
            <span className="text-sm">ভিডিও দেখুন</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400">50K+</div>
            <div className="text-sm text-gray-300">Happy Customers</div>
            <div className="text-xs text-gray-400">সন্তুষ্ট গ্রাহক</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400">10K+</div>
            <div className="text-sm text-gray-300">Products</div>
            <div className="text-xs text-gray-400">পণ্য</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400">64</div>
            <div className="text-sm text-gray-300">Cities</div>
            <div className="text-xs text-gray-400">শহর</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white text-center">
            <div className="text-2xl font-bold">Free Delivery</div>
            <div className="text-sm text-gray-300">On orders above ৳2000</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-10 hidden lg:block">
        <div className="bg-primary-600 rounded-2xl p-4 shadow-lg">
          <div className="text-white text-center">
            <div className="text-2xl font-bold">৳500</div>
            <div className="text-sm text-gray-200">Off on first order</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;