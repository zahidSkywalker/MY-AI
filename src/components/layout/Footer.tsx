'use client'

import Link from 'next/link'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const footerLinks = {
  company: [
    { name: 'About Us', bengaliName: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'Our Story', bengaliName: 'আমাদের গল্প', href: '/story' },
    { name: 'Careers', bengaliName: 'ক্যারিয়ার', href: '/careers' },
    { name: 'Press', bengaliName: 'প্রেস', href: '/press' }
  ],
  support: [
    { name: 'Help Center', bengaliName: 'সাহায্য কেন্দ্র', href: '/help' },
    { name: 'Contact Us', bengaliName: 'যোগাযোগ করুন', href: '/contact' },
    { name: 'Size Guide', bengaliName: 'সাইজ গাইড', href: '/size-guide' },
    { name: 'Returns', bengaliName: 'রিটার্ন', href: '/returns' }
  ],
  legal: [
    { name: 'Privacy Policy', bengaliName: 'গোপনীয়তা নীতি', href: '/privacy' },
    { name: 'Terms of Service', bengaliName: 'সেবার শর্তাবলী', href: '/terms' },
    { name: 'Shipping Policy', bengaliName: 'শিপিং নীতি', href: '/shipping' },
    { name: 'Refund Policy', bengaliName: 'রিফান্ড নীতি', href: '/refund' }
  ],
  categories: [
    { name: 'Men', bengaliName: 'পুরুষ', href: '/category/men' },
    { name: 'Women', bengaliName: 'মহিলা', href: '/category/women' },
    { name: 'Children', bengaliName: 'শিশু', href: '/category/children' },
    { name: 'Traditional', bengaliName: 'ঐতিহ্যগত', href: '/category/traditional' }
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: '📘', href: '#' },
  { name: 'Instagram', icon: '📷', href: '#' },
  { name: 'Twitter', icon: '🐦', href: '#' },
  { name: 'YouTube', icon: '📺', href: '#' },
  { name: 'LinkedIn', icon: '💼', href: '#' }
]

const paymentMethods = [
  'bKash', 'Nagad', 'Rocket', 'Visa', 'Mastercard', 'PayPal'
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ব</span>
              </div>
              <span className="ml-2 text-2xl font-bold bengali">
                বাংলাদেশ ফ্যাশন
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Bangladesh's premier destination for traditional and modern fashion. 
              We bring you the finest quality clothing with authentic Bangladeshi craftsmanship.
              <span className="block bengali mt-2">
                ঐতিহ্যগত এবং আধুনিক ফ্যাশনের জন্য বাংলাদেশের শীর্ষস্থানীয় গন্তব্য। 
                আমরা আপনাকে আসল বাংলাদেশি কারুশিল্পের সাথে সর্বোত্তম মানের পোশাক এনে দিই।
              </span>
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">info@bangladeshfashion.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400 mt-1" />
                <span className="text-gray-300">
                  House #123, Road #12, Dhanmondi, Dhaka-1209, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="bengali">কোম্পানি</span>
              <span className="ml-2">Company</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="bengali">{link.bengaliName}</span>
                    <span className="ml-2">({link.name})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="bengali">সাহায্য</span>
              <span className="ml-2">Support</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="bengali">{link.bengaliName}</span>
                    <span className="ml-2">({link.name})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="bengali">বিভাগসমূহ</span>
              <span className="ml-2">Categories</span>
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="bengali">{link.bengaliName}</span>
                    <span className="ml-2">({link.name})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <span className="bengali">© ২০২৪ বাংলাদেশ ফ্যাশন। সর্বস্বত্ব সংরক্ষিত।</span>
              <span className="ml-2">© 2024 Bangladesh Fashion. All rights reserved.</span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Payment Methods:</span>
              <div className="flex space-x-2">
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors duration-200"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              <span className="bengali">নিউজলেটার সাবস্ক্রাইব করুন</span>
              <span className="ml-2">Subscribe to Newsletter</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Get updates about new products, sales, and fashion tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}