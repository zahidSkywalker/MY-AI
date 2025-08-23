import React, { useState } from 'react';
import { UserIcon, CogIcon, HeartIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Handle logout logic
    setIsLoggedIn(false);
    setIsOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <button className="text-gray-700 hover:text-primary-600 transition-colors duration-200">
          Sign In
        </button>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
      >
        <UserIcon className="h-5 w-5" />
        <span className="hidden sm:block">John Doe</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
          
          <div className="py-1">
            <a
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <UserIcon className="h-4 w-4 mr-3" />
              Profile
            </a>
            <a
              href="/orders"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <ShoppingBagIcon className="h-4 w-4 mr-3" />
              Orders
            </a>
            <a
              href="/wishlist"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <HeartIcon className="h-4 w-4 mr-3" />
              Wishlist
            </a>
            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <CogIcon className="h-4 w-4 mr-3" />
              Settings
            </a>
          </div>
          
          <div className="border-t border-gray-100 pt-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;