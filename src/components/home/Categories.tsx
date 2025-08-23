'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  UserIcon, 
  UserGroupIcon, 
  SparklesIcon,
  TShirtIcon,
  AcademicCapIcon,
  HeartIcon 
} from '@heroicons/react/24/outline'

const categories = [
  {
    id: 'men',
    name: 'পুরুষ',
    englishName: 'Men',
    description: 'পুরুষদের জন্য স্টাইলিশ পোশাক',
    icon: UserIcon,
    image: '/images/categories/men.jpg',
    href: '/category/men',
    color: 'from-blue-500 to-blue-600',
    productCount: 150
  },
  {
    id: 'women',
    name: 'মহিলা',
    englishName: 'Women',
    description: 'মহিলাদের জন্য সুন্দর পোশাক',
    icon: HeartIcon,
    image: '/images/categories/women.jpg',
    href: '/category/women',
    color: 'from-pink-500 to-pink-600',
    productCount: 200
  },
  {
    id: 'children',
    name: 'শিশু',
    englishName: 'Children',
    description: 'শিশুদের জন্য আরামদায়ক পোশাক',
    icon: UserGroupIcon,
    image: '/images/categories/children.jpg',
    href: '/category/children',
    color: 'from-green-500 to-green-600',
    productCount: 100
  },
  {
    id: 'traditional',
    name: 'ঐতিহ্যগত',
    englishName: 'Traditional',
    description: 'বাংলাদেশের ঐতিহ্যগত পোশাক',
    icon: SparklesIcon,
    image: '/images/categories/traditional.jpg',
    href: '/category/traditional',
    color: 'from-purple-500 to-purple-600',
    productCount: 120
  },
  {
    id: 'casual',
    name: 'ক্যাজুয়াল',
    englishName: 'Casual',
    description: 'দৈনন্দিন ব্যবহারের জন্য ক্যাজুয়াল পোশাক',
    icon: TShirtIcon,
    image: '/images/categories/casual.jpg',
    href: '/category/casual',
    color: 'from-orange-500 to-orange-600',
    productCount: 180
  },
  {
    id: 'formal',
    name: 'ফরমাল',
    englishName: 'Formal',
    description: 'অফিস এবং অনুষ্ঠানের জন্য ফরমাল পোশাক',
    icon: AcademicCapIcon,
    image: '/images/categories/formal.jpg',
    href: '/category/formal',
    color: 'from-gray-500 to-gray-600',
    productCount: 90
  }
]

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="block bengali">পণ্যের বিভাগসমূহ</span>
            <span className="block">Shop by Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of clothing categories designed for every occasion and style preference.
            <span className="block bengali">প্রতিটি অনুষ্ঠান এবং স্টাইল পছন্দের জন্য ডিজাইন করা আমাদের বিস্তৃত পোশাক বিভাগগুলি আবিষ্কার করুন।</span>
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Category Icon */}
                <div className={`absolute top-4 right-4 p-3 rounded-full bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                  <category.icon className="h-6 w-6" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="mb-2">
                  <h3 className="text-xl font-bold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-200 mb-2">
                    {category.englishName}
                  </p>
                  <p className="text-sm text-gray-300 mb-3">
                    {category.description}
                  </p>
                </div>
                
                {/* Product Count & CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    {category.productCount} Products
                  </span>
                  <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    Shop Now →
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="bengali">সব বিভাগ দেখুন</span>
            <span className="ml-2">View All Categories</span>
          </Link>
        </div>
      </div>
    </section>
  )
}