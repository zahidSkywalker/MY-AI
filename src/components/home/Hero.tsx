"use client";

import React from 'react';
import { MagnifyingGlassIcon, PlayIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          <span className="block text-white">Discover Your Style</span>
          <span className="block text-lg sm:text-xl md:text-3xl lg:text-4xl font-medium mt-2 text-slate-200">আপনার স্টাইল আবিষ্কার করুন</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed px-2">
          Premium clothing for every occasion. From traditional elegance to modern fashion,
          find your perfect look with Z Fashion's finest collection.
        </p>

        {/* Search Bar */}
        <div className="max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8 px-2">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 rounded-full text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 shadow-lg transition-all duration-300 group-hover:shadow-xl text-sm sm:text-base bg-white border border-slate-200 hover:border-slate-300"
            />
            <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400 transition-colors duration-200 group-hover:text-slate-600" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
          <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group text-sm sm:text-base">
            Shop Traditional
            <span className="text-xs sm:text-sm opacity-90">ঐতিহ্যগত কেনাকাটা</span>
          </button>

          <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border border-white/30 group text-sm sm:text-base">
            <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-110" />
            Watch Video
            <span className="text-xs sm:text-sm opacity-90">ভিডিও দেখুন</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto px-2">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary-400">50K+</div>
            <div className="text-xs sm:text-sm text-gray-300">Happy Customers</div>
            <div className="text-xs text-gray-400">সন্তুষ্ট গ্রাহক</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary-400">10K+</div>
            <div className="text-xs sm:text-sm text-gray-300">Products</div>
            <div className="text-xs text-gray-400">পণ্য</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary-400">64</div>
            <div className="text-xs sm:text-sm text-gray-300">Cities</div>
            <div className="text-xs text-gray-400">শহর</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 sm:top-8 lg:top-20 right-4 sm:right-8 lg:right-10 hidden sm:block">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl hover:scale-105 transition-all duration-300 border border-slate-100">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900">Free Delivery</div>
            <div className="text-xs sm:text-sm text-slate-600">On orders above ৳2000</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 lg:bottom-20 left-4 sm:left-8 lg:left-10 hidden sm:block">
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl hover:scale-105 transition-all duration-300">
          <div className="text-white text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">৳500</div>
            <div className="text-xs sm:text-sm text-slate-300">Off on first order</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;