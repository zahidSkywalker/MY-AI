import React from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      bengaliTitle: 'দ্রুত লিঙ্ক',
      links: [
        { name: 'Home', bengaliName: 'হোম', href: '/' },
        { name: 'Products', bengaliName: 'পণ্য', href: '/products' },
        { name: 'Categories', bengaliName: 'বিভাগ', href: '/categories' },
        { name: 'About Us', bengaliName: 'আমাদের সম্পর্কে', href: '/about' },
        { name: 'Contact', bengaliName: 'যোগাযোগ', href: '/contact' }
      ]
    },
    {
      title: 'Customer Service',
      bengaliName: 'গ্রাহক সেবা',
      links: [
        { name: 'Help Center', bengaliName: 'সাহায্য কেন্দ্র', href: '/help' },
        { name: 'Size Guide', bengaliName: 'সাইজ গাইড', href: '/size-guide' },
        { name: 'Return Policy', bengaliName: 'ফেরত নীতি', href: '/returns' },
        { name: 'Shipping Info', bengaliName: 'শিপিং তথ্য', href: '/shipping' },
        { name: 'Track Order', bengaliName: 'অর্ডার ট্র্যাক', href: '/track' }
      ]
    },
    {
      title: 'Payment Methods',
      bengaliName: 'অর্থপ্রদানের পদ্ধতি',
      links: [
        { name: 'bKash', bengaliName: 'বিকাশ', href: '/payment/bkash' },
        { name: 'Nagad', bengaliName: 'নগদ', href: '/payment/nagad' },
        { name: 'Rocket', bengaliName: 'রকেট', href: '/payment/rocket' },
        { name: 'Credit Card', bengaliName: 'ক্রেডিট কার্ড', href: '/payment/card' },
        { name: 'Cash on Delivery', bengaliName: 'ক্যাশ অন ডেলিভারি', href: '/payment/cod' }
      ]
    },
    {
      title: 'Categories',
      bengaliName: 'বিভাগ',
      links: [
        { name: 'Men', bengaliName: 'পুরুষ', href: '/category/men' },
        { name: 'Women', bengaliName: 'মহিলা', href: '/category/women' },
        { name: 'Children', bengaliName: 'শিশু', href: '/category/children' },
        { name: 'Traditional', bengaliName: 'ঐতিহ্যগত', href: '/category/traditional' },
        { name: 'Casual', bengaliName: 'ক্যাজুয়াল', href: '/category/casual' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: 'https://facebook.com/bangladeshfashion' },
    { name: 'Instagram', icon: '📷', href: 'https://instagram.com/bangladeshfashion' },
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/bangladeshfashion' },
    { name: 'YouTube', icon: '📺', href: 'https://youtube.com/bangladeshfashion' },
    { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/bangladeshfashion' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-bengali-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ব</span>
              </div>
              <div>
                <div className="text-xl font-bold">BanglaFashion</div>
                <div className="text-sm text-gray-400">বাংলা ফ্যাশন</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Premium clothing for every occasion. From traditional elegance to modern fashion, 
              find your perfect look with Bangladesh's finest collection.
            </p>
            
            <p className="text-gray-400 text-sm mb-6">
              প্রিমিয়াম পোশাক প্রতিটি অনুষ্ঠানের জন্য। ঐতিহ্যগত শোভা থেকে আধুনিক ফ্যাশন, 
              বাংলাদেশের সেরা সংগ্রহ দিয়ে আপনার নিখুঁত লুক খুঁজে পান।
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300 text-sm">
                  Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300 text-sm">
                  +880 1234-567890
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300 text-sm">
                  info@bangladeshfashion.com
                </span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
                <span className="block text-sm font-normal text-gray-400 mt-1">
                  {section.bengaliName}
                </span>
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm group"
                    >
                      <span className="block">{link.name}</span>
                      <span className="block text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                        {link.bengaliName}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              Subscribe to Our Newsletter
              <span className="block text-sm font-normal text-gray-400 mt-1">
                আমাদের নিউজলেটার সাবস্ক্রাইব করুন
              </span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Get updates about new products, special offers, and fashion trends delivered to your inbox.
            </p>
            
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                © {currentYear} BanglaFashion. All rights reserved.
                <span className="block text-xs mt-1">
                  © {currentYear} বাংলা ফ্যাশন। সর্বস্বত্ব সংরক্ষিত।
                </span>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  title={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>

            {/* Language & Currency */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="h-4 w-4" />
                <select className="bg-transparent border-none focus:outline-none">
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span>Currency:</span>
                <select className="bg-transparent border-none focus:outline-none">
                  <option value="BDT">৳ BDT</option>
                  <option value="USD">$ USD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold text-sm mb-1">SSL Secured</h4>
              <p className="text-xs text-gray-400">256-bit encryption</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">✅</div>
              <h4 className="font-semibold text-sm mb-1">Verified Seller</h4>
              <p className="text-xs text-gray-400">Authentic products</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🚚</div>
              <h4 className="font-semibold text-sm mb-1">Fast Delivery</h4>
              <p className="text-xs text-gray-400">Same day dispatch</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">💎</div>
              <h4 className="font-semibold text-sm mb-1">Quality Assured</h4>
              <p className="text-xs text-gray-400">100% guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Made with Love */}
      <div className="bg-gray-900 py-4 text-center">
        <p className="text-gray-500 text-sm">
          Made with <HeartIcon className="inline h-4 w-4 text-red-500" /> in Bangladesh
        </p>
      </div>
    </footer>
  );
};

export default Footer;