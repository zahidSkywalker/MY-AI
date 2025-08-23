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
      bengaliTitle: 'বিনামূল্যে ডেলিভারি',
      description: 'Free delivery on orders above ৳2000',
      bengaliDescription: '৳২০০০ এর উপরে অর্ডারে বিনামূল্যে ডেলিভারি',
      color: 'text-blue-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Guarantee',
      bengaliTitle: 'মানের গ্যারান্টি',
      description: '100% quality assurance on all products',
      bengaliDescription: 'সব পণ্যে ১০০% মানের নিশ্চয়তা',
      color: 'text-green-600'
    },
    {
      icon: CreditCardIcon,
      title: 'Secure Payment',
      bengaliTitle: 'নিরাপদ অর্থপ্রদান',
      description: 'Multiple secure payment options',
      bengaliDescription: 'বহু নিরাপদ অর্থপ্রদানের বিকল্প',
      color: 'text-purple-600'
    },
    {
      icon: PhoneIcon,
      title: '24/7 Support',
      bengaliTitle: '২৪/৭ সহায়তা',
      description: 'Round the clock customer support',
      bengaliDescription: 'চব্বিশ ঘণ্টা গ্রাহক সহায়তা',
      color: 'text-orange-600'
    },
    {
      icon: StarIcon,
      title: 'Premium Quality',
      bengaliTitle: 'প্রিমিয়াম মান',
      description: 'Handpicked premium clothing items',
      bengaliDescription: 'হাতে বাছাই করা প্রিমিয়াম পোশাক',
      color: 'text-yellow-600'
    },
    {
      icon: FlagIcon,
      title: 'Bangladesh Made',
      bengaliTitle: 'বাংলাদেশে তৈরি',
      description: 'Supporting local artisans and craftsmen',
      bengaliDescription: 'স্থানীয় কারিগর এবং শিল্পীদের সমর্থন',
      color: 'text-red-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers', bengaliLabel: 'সন্তুষ্ট গ্রাহক' },
    { number: '10K+', label: 'Products', bengaliLabel: 'পণ্য' },
    { number: '64', label: 'Cities', bengaliLabel: 'শহর' },
    { number: '99%', label: 'Satisfaction', bengaliLabel: 'সন্তুষ্টি' }
  ];

  const paymentMethods = [
    {
      name: 'bKash',
      bengaliName: 'বিকাশ',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/bKash_logo.svg/1200px-bKash_logo.svg.png',
      type: 'Mobile Banking'
    },
    {
      name: 'Nagad',
      bengaliName: 'নগদ',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Nagad_logo.svg/1200px-Nagad_logo.svg.png',
      type: 'Digital Financial Service'
    },
    {
      name: 'Rocket',
      bengaliName: 'রকেট',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Dutch_Bangla_Bank_Rocket_logo.svg/1200px-Dutch_Bangla_Bank_Rocket_logo.svg.png',
      type: 'Mobile Banking'
    },
    {
      name: 'Visa',
      bengaliName: 'ভিসা',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png',
      type: 'Credit/Debit Card'
    },
    {
      name: 'Mastercard',
      bengaliName: 'মাস্টারকার্ড',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png',
      type: 'Credit/Debit Card'
    },
    {
      name: 'PayPal',
      bengaliName: 'পেপাল',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/1200px-PayPal_logo.svg.png',
      type: 'Digital Wallet'
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
                  <span className="block text-sm font-normal text-gray-600 mt-1">
                    {feature.bengaliTitle}
                  </span>
                </h3>

                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {feature.bengaliDescription}
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
              <span className="block text-lg text-gray-600 mt-1">সংখ্যায় সাফল্য</span>
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
                <div className="text-xs text-gray-500">
                  {stat.bengaliLabel}
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
              <span className="block text-lg text-gray-600 mt-1">নিরাপদ অর্থপ্রদানের পদ্ধতি</span>
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
                <p className="text-xs text-gray-600 mb-1">
                  {method.bengaliName}
                </p>
                <p className="text-xs text-gray-500">
                  {method.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-gradient-to-r from-primary-600 to-bengali-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Trusted by Millions
              <span className="block text-lg font-normal opacity-90 mt-1">
                লক্ষ লক্ষ মানুষের বিশ্বাস
              </span>
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