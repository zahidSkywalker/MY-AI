'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon, PlayIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-bengali-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="block bengali">বাংলাদেশের সেরা</span>
                <span className="block">Fashion Collection</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
                Discover traditional elegance and modern style. 
                <span className="block bengali">ঐতিহ্যবাহী শৈলী এবং আধুনিক ফ্যাশনের সন্ধান করুন</span>
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-600"
                />
                <MagnifyingGlassIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/category/traditional"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                <span className="bengali">ঐতিহ্যগত পোশাক</span>
                <span className="ml-2">Shop Traditional</span>
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary-600 transition-colors duration-200">
                <PlayIcon className="h-5 w-5 mr-2" />
                <span className="bengali">ভিডিও দেখুন</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-primary-100 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-primary-100 text-sm">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-primary-100 text-sm">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/hero-fashion.jpg"
                alt="Traditional Bangladeshi Fashion"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white text-primary-600 p-4 rounded-full shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">৳</div>
                <div className="text-xs">Best Prices</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-accent-500 text-white p-4 rounded-full shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">🚚</div>
                <div className="text-xs">Free Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19.77,81.84-31.16,122.8-37.8C402.34,4.92,485.09,1.92,568.09,5.4c83.26,3.48,166.07,12.21,248.8,25.34,82.26,13.14,164.67,30.41,246.48,46.69,41.84,10.31,83.51,19.19,125.45,23.45C1109.43,107.66,1200,107.66,1200,107.66V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,120.4,6.66,180.2,15.28C943.7,40.35,1101.6,52.11,1200,52.11V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}