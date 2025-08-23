import React from 'react';
import {
  UserIcon,
  HeartIcon,
  SparklesIcon,
  FireIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const Categories = () => {
  const categories = [
    {
      id: 'men',
      name: 'Men',
      bengaliName: 'পুরুষ',
      description: 'Traditional and modern clothing for men',
      bengaliDescription: 'পুরুষদের জন্য ঐতিহ্যগত এবং আধুনিক পোশাক',
      productCount: 2500,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      icon: UserIcon,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'women',
      name: 'Women',
      bengaliName: 'মহিলা',
      description: 'Elegant sarees, salwar kameez, and modern fashion',
      bengaliDescription: 'ম elegant শাড়ি, সালওয়ার কামিজ এবং আধুনিক ফ্যাশন',
      productCount: 3800,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      icon: UserIcon,
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      id: 'children',
      name: 'Children',
      bengaliName: 'শিশু',
      description: 'Adorable clothing for kids of all ages',
      bengaliDescription: 'সব বয়সের শিশুদের জন্য সুন্দর পোশাক',
      productCount: 1200,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      icon: HeartIcon,
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'traditional',
      name: 'Traditional',
      bengaliName: 'ঐতিহ্যগত',
      description: 'Heritage clothing and cultural fashion',
      bengaliDescription: 'ঐতিহ্যগত পোশাক এবং সাংস্কৃতিক ফ্যাশন',
      productCount: 2100,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      icon: SparklesIcon,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'casual',
      name: 'Casual',
      bengaliName: 'ক্যাজুয়াল',
      description: 'Comfortable everyday wear',
      bengaliDescription: 'আরামদায়ক দৈনন্দিন পোশাক',
      productCount: 3200,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      icon: FireIcon,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'formal',
      name: 'Formal',
      bengaliName: 'ফরমাল',
      description: 'Professional and business attire',
      bengaliDescription: 'পেশাদার এবং ব্যবসায়িক পোশাক',
      productCount: 1800,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      icon: AcademicCapIcon,
      gradient: 'from-gray-600 to-gray-700'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
            <span className="block text-xl text-gray-600 mt-2">বিভাগ অনুযায়ী কেনাকাটা</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection organized by style, occasion, and preference.
            Find exactly what you're looking for in our carefully curated categories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80`}></div>

                  {/* Icon */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>

                  {/* Product Count Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-semibold">
                      {category.productCount.toLocaleString()}+
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {category.name}
                    <span className="block text-sm font-normal mt-1 opacity-90">
                      {category.bengaliName}
                    </span>
                  </h3>

                  <p className="text-sm opacity-90 mb-3 line-clamp-2">
                    {category.description}
                  </p>

                  <p className="text-xs opacity-75 mb-4">
                    {category.bengaliDescription}
                  </p>

                  {/* Hover Effect - Show more info */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {category.productCount.toLocaleString()} Products
                      </span>
                      <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 backdrop-blur-sm">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
            View All Categories
            <span className="block text-sm mt-1">সব বিভাগ দেখুন</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;