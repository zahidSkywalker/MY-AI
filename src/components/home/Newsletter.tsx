'use client'

import { useState } from 'react'
import { EnvelopeIcon, GiftIcon, TagIcon, BellIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // TODO: Implement newsletter subscription
      console.log('Subscribing email:', email)
      setIsSubscribed(true)
      setEmail('')
      
      // Reset subscription status after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const benefits = [
    {
      icon: GiftIcon,
      title: 'Exclusive Offers',
      bengaliTitle: 'এক্সক্লুসিভ অফার',
      description: 'Get early access to sales and special discounts'
    },
    {
      icon: TagIcon,
      title: 'Special Deals',
      bengaliTitle: 'বিশেষ ডিল',
      description: 'Receive personalized deals based on your preferences'
    },
    {
      icon: BellIcon,
      title: 'New Arrivals',
      bengaliTitle: 'নতুন আগমন',
      description: 'Be the first to know about new products and collections'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-bengali-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="block bengali">আপডেট থাকুন</span>
                <span className="block">Stay Updated</span>
              </h2>
              <p className="text-xl text-primary-100 leading-relaxed">
                Subscribe to our newsletter and never miss out on the latest fashion trends, 
                exclusive offers, and exciting new arrivals.
                <span className="block bengali">আমাদের নিউজলেটার সাবস্ক্রাইব করুন এবং সর্বশেষ ফ্যাশন ট্রেন্ড, এক্সক্লুসিভ অফার এবং উত্তেজনাপূর্ণ নতুন আগমন থেকে বাদ পড়বেন না।</span>
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg">
                    <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-primary-100 bengali">
                      {benefit.bengaliTitle}
                    </p>
                    <p className="text-sm text-primary-200">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
                <EnvelopeIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                <span className="block bengali">নিউজলেটার সাবস্ক্রাইব করুন</span>
                <span className="block">Subscribe to Newsletter</span>
              </h3>
              <p className="text-primary-100">
                Get ৳500 off on your first order!
              </p>
            </div>

            {isSubscribed ? (
              <div className="text-center p-6 bg-green-500/20 rounded-2xl border border-green-500/30">
                <div className="text-green-300 text-lg font-semibold mb-2">
                  <span className="block bengali">সফলভাবে সাবস্ক্রাইব!</span>
                  <span className="block">Successfully Subscribed!</span>
                </div>
                <p className="text-green-200 text-sm">
                  Thank you for subscribing. You'll receive our updates soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-100 mb-2">
                    <span className="bengali">ইমেইল ঠিকানা</span>
                    <span className="ml-2">Email Address</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-primary-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  <span>
                    <span className="bengali">সাবস্ক্রাইব করুন</span>
                    <span className="ml-2">Subscribe</span>
                  </span>
                </button>

                <p className="text-xs text-primary-200 text-center">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                  <span className="block bengali">সাবস্ক্রাইব করে, আপনি আমাদের গোপনীয়তা নীতি এবং সেবার শর্তাবলীতে সম্মত হন।</span>
                </p>
              </form>
            )}

            {/* Social Media Links */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-center text-primary-100 mb-4">
                <span className="bengali">আমাদের অনুসরণ করুন</span>
                <span className="ml-2">Follow us on</span>
              </p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                  <span className="text-lg">📘</span>
                </a>
                <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                  <span className="text-lg">📷</span>
                </a>
                <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                  <span className="text-lg">🐦</span>
                </a>
                <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                  <span className="text-lg">📺</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}