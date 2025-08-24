"use client";

import React from 'react';
import {
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  PhoneIcon,
  StarIcon,
  FlagIcon
} from '@heroicons/react/24/outline';

const WhyChooseUs = () => {
  const features = [
    {
      icon: TruckIcon,
      title: 'Free Delivery',
      description: 'Free delivery on orders above ৳2000',
      color: 'text-blue-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Guarantee',
      description: '100% quality assurance on all products',
      color: 'text-green-600'
    },
    {
      icon: CreditCardIcon,
      title: 'Secure Payment',
      description: 'Multiple secure payment options',
      color: 'text-purple-600'
    },
    {
      icon: PhoneIcon,
      title: '24/7 Support',
      description: 'Round the clock customer support',
      color: 'text-orange-600'
    },
    {
      icon: StarIcon,
      title: 'Premium Quality',
      description: 'Handpicked premium clothing items',
      color: 'text-yellow-600'
    },
    {
      icon: FlagIcon,
      title: 'Bangladesh Made',
      description: 'Supporting local artisans and craftsmen',
      color: 'text-red-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products' },
    { number: '64', label: 'Cities' },
    { number: '99%', label: 'Satisfaction' }
  ];

  const paymentMethods = [
    {
      name: 'SSL Commerce',
      logo: 'https://www.sslcommerz.com/images/logo.png',
      type: 'Secure Payment Gateway'
    },
    {
      name: 'bKash',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/bKash_logo.svg/1200px-bKash_logo.svg.png',
      type: 'Mobile Banking'
    },
    {
      name: 'Nagad',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Nagad_logo.svg/1200px-Nagad_logo.svg.png',
      type: 'Digital Financial Service'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
            <span className="block text-xl text-gray-600 mt-2">কেন আমাদের বেছে নেবেন?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best shopping experience with quality products,
            secure payments, and exceptional customer service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1"
              >
                <div className={`inline-flex p-4 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200 mb-4`}>
                  <IconComponent className={`h-8 w-8 ${feature.color}`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Success in Numbers */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Success in Numbers
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Secure Payment Methods
            </h3>
            <p className="text-gray-600">
              Choose from multiple secure payment options for your convenience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-gray-100 transition-colors duration-200 group cursor-pointer"
              >
                <div className="h-16 flex items-center justify-center mb-3">
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                  />
                </div>

                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {method.name}
                </h4>

                <p className="text-xs text-gray-500">
                  {method.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-gradient-to-r from-primary-600 to-slate-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Trusted by Millions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">SSL Secured</h4>
                <p className="text-sm opacity-90">256-bit encryption</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Verified Seller</h4>
                <p className="text-sm opacity-90">Authentic products</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Fast Delivery</h4>
                <p className="text-sm opacity-90">Same day dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;