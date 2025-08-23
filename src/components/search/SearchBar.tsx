"use client";

import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches] = useState([
    'Traditional Saree',
    'Men Kurta',
    'Children Dress',
    'Casual T-Shirt'
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery);
      onClose();
    }
  };

  const handleRecentSearch = (search: string) => {
    setSearchQuery(search);
    // Handle search logic here
    console.log('Searching for:', search);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Search Products
            <span className="block text-sm font-normal text-gray-500">পণ্য অনুসন্ধান করুন</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="p-4 border-b border-gray-200">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, categories, brands..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Recent Searches */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Recent Searches
            <span className="block text-xs font-normal text-gray-500">সাম্প্রতিক অনুসন্ধান</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearch(search)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Popular Categories
            <span className="block text-xs font-normal text-gray-500">জনপ্রিয় বিভাগ</span>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['Traditional', 'Casual', 'Formal', 'Children'].map((category, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearch(category)}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200 text-left"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-2">
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
              Advanced Search
            </button>
            <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
              Browse All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;