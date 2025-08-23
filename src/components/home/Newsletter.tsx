import React, { useState } from 'react';
import { EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Professional Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
            <span className="block text-xl font-normal text-gray-200 mt-2">আপডেট থাকুন</span>
          </h2>

          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, special deals, and new arrivals.
            Be the first to know about our latest collections and promotions.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                  <span className="block text-sm">সাবস্ক্রাইব করুন</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-6">
                <div className="flex items-center justify-center gap-3 text-green-400 mb-3">
                  <CheckIcon className="h-6 w-6" />
                  <span className="text-lg font-semibold">Successfully Subscribed!</span>
                </div>
                <p className="text-green-300 text-sm">
                  Thank you for subscribing! You'll receive our updates soon.
                </p>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="font-semibold text-white mb-1">Exclusive Offers</h3>
              <p className="text-sm text-gray-300">Special discounts for subscribers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🆕</div>
              <h3 className="font-semibold text-white mb-1">New Arrivals</h3>
              <p className="text-sm text-gray-300">First access to latest collections</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="font-semibold text-white mb-1">VIP Access</h3>
              <p className="text-sm text-gray-300">Priority customer benefits</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-gray-300 mb-4">Follow us on social media</p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-white hover:text-primary-400 transition-colors duration-200">
                <span className="text-2xl">📘</span>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors duration-200">
                <span className="text-2xl">📷</span>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors duration-200">
                <span className="text-2xl">🐦</span>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white hover:text-primary-400 transition-colors duration-200">
                <span className="text-2xl">📺</span>
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;