'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // TODO: Replace with actual auth state

  const toggleMenu = () => setIsOpen(!isOpen)

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href="/login"
          className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
        >
          <span className="bengali">লগইন</span>
          <span className="ml-1">Login</span>
        </Link>
        <Link
          href="/register"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
        >
          <span className="bengali">রেজিস্টার</span>
          <span className="ml-1">Register</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <UserIcon className="h-6 w-6" />
        <span className="text-sm font-medium">John Doe</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="bengali">প্রোফাইল</span>
            <span className="ml-2">Profile</span>
          </Link>
          <Link
            href="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="bengali">অর্ডার</span>
            <span className="ml-2">Orders</span>
          </Link>
          <Link
            href="/wishlist"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="bengali">উইশলিস্ট</span>
            <span className="ml-2">Wishlist</span>
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="bengali">সেটিংস</span>
            <span className="ml-2">Settings</span>
          </Link>
          <hr className="my-2" />
          <button
            onClick={() => {
              setIsAuthenticated(false)
              setIsOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <span className="bengali">লগআউট</span>
            <span className="ml-2">Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}