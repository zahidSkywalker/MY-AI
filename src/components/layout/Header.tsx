"use client";

import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon
} from '@heroicons/react/24/outline';

import UserMenu from '../auth/UserMenu';
import SearchBar from '../search/SearchBar';
import CartDrawer from '../cart/CartDrawer';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigation = [
    { name: 'Men', href: '/category/men' },
    { name: 'Women', href: '/category/women' },
    { name: 'Children', href: '/category/children' },
    { name: 'Traditional', href: '/category/traditional' },
    { name: 'Casual', href: '/category/casual' },
    { name: 'Formal', href: '/category/formal' }
  ];

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  {/* Professional Logo */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg sm:text-xl">Z</span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-lg sm:text-xl font-bold text-slate-900">Z Fashion</div>
                    <div className="text-xs text-slate-500">Premium Style Collection</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 px-2 sm:px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 sm:p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Wishlist */}
              <button className="p-1.5 sm:p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 relative">
                <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="hidden sm:block">
                <UserMenu />
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 sm:p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 relative"
              >
                <ShoppingBagIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-3 pt-3 pb-4 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile-only actions */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between px-4 py-2">
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <CartDrawer onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
};

export default Header;