'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  StarIcon,
  EyeIcon 
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

// Mock featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Traditional Saree',
    bengaliName: 'ঐতিহ্যগত শাড়ি',
    price: 2500,
    originalPrice: 3000,
    rating: 4.8,
    reviewCount: 124,
    image: '/images/products/saree-1.jpg',
    category: 'traditional',
    isNew: true,
    discount: 17,
    colors: ['Red', 'Blue', 'Green'],
    sizes: ['Free Size']
  },
  {
    id: 2,
    name: 'Salwar Kameez Set',
    bengaliName: 'সালোয়ার কামিজ সেট',
    price: 1800,
    originalPrice: 2200,
    rating: 4.6,
    reviewCount: 89,
    image: '/images/products/salwar-1.jpg',
    category: 'traditional',
    isNew: false,
    discount: 18,
    colors: ['Pink', 'Purple', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'Panjabi for Men',
    bengaliName: 'পুরুষদের পাঞ্জাবি',
    price: 1200,
    originalPrice: 1500,
    rating: 4.7,
    reviewCount: 156,
    image: '/images/products/panjabi-1.jpg',
    category: 'traditional',
    isNew: true,
    discount: 20,
    colors: ['White', 'Black', 'Navy'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 4,
    name: 'Casual T-Shirt',
    bengaliName: 'ক্যাজুয়াল টি-শার্ট',
    price: 450,
    originalPrice: 600,
    rating: 4.5,
    reviewCount: 203,
    image: '/images/products/tshirt-1.jpg',
    category: 'casual',
    isNew: false,
    discount: 25,
    colors: ['White', 'Black', 'Gray', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'Formal Shirt',
    bengaliName: 'ফরমাল শার্ট',
    price: 800,
    originalPrice: 1000,
    rating: 4.4,
    reviewCount: 167,
    image: '/images/products/shirt-1.jpg',
    category: 'formal',
    isNew: false,
    discount: 20,
    colors: ['White', 'Light Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6,
    name: 'Kids Dress',
    bengaliName: 'শিশুদের পোশাক',
    price: 650,
    originalPrice: 800,
    rating: 4.9,
    reviewCount: 78,
    image: '/images/products/kids-1.jpg',
    category: 'children',
    isNew: true,
    discount: 19,
    colors: ['Red', 'Blue', 'Pink', 'Yellow'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y']
  }
]

const categories = [
  { id: 'all', name: 'সব', englishName: 'All' },
  { id: 'traditional', name: 'ঐতিহ্যগত', englishName: 'Traditional' },
  { id: 'casual', name: 'ক্যাজুয়াল', englishName: 'Casual' },
  { id: 'formal', name: 'ফরমাল', englishName: 'Formal' },
  { id: 'children', name: 'শিশু', englishName: 'Children' }
]

export default function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = selectedCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === selectedCategory)

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const addToCart = (productId: number) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', productId)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="block bengali">বৈশিষ্ট্যযুক্ত পণ্যসমূহ</span>
            <span className="block">Featured Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of trending and popular products.
            <span className="block bengali">ট্রেন্ডিং এবং জনপ্রিয় পণ্যগুলির আমাদের হাতে বাছাই করা সংগ্রহ আবিষ্কার করুন।</span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              <span className="bengali">{category.name}</span>
              <span className="ml-2">({category.englishName})</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                  >
                    {wishlist.includes(product.id) ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200">
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <div className="text-sm text-primary-600 font-medium mb-2">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 bengali">
                  {product.bengaliName}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Colors & Sizes */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border-2 border-gray-200"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.sizes.length} sizes
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="bengali">সব পণ্য দেখুন</span>
            <span className="ml-2">View All Products</span>
          </Link>
        </div>
      </div>
    </section>
  )
}