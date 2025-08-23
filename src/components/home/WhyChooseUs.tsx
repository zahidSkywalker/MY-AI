'use client'

import { 
  TruckIcon, 
  ShieldCheckIcon, 
  CreditCardIcon, 
  ChatBubbleLeftRightIcon,
  StarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: TruckIcon,
    title: 'Free Delivery',
    bengaliTitle: 'বিনামূল্যে ডেলিভারি',
    description: 'Free delivery on orders above ৳1000 across Bangladesh',
    bengaliDescription: 'বাংলাদেশের যেকোনো জায়গায় ৳১০০০ এর উপরে অর্ডারে বিনামূল্যে ডেলিভারি',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Guarantee',
    bengaliTitle: 'মানের গ্যারান্টি',
    description: '100% quality guarantee with easy return policy',
    bengaliDescription: '১০০% মানের গ্যারান্টি সহ সহজ রিটার্ন পলিসি',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: CreditCardIcon,
    title: 'Secure Payment',
    bengaliTitle: 'নিরাপদ পেমেন্ট',
    description: 'Multiple secure payment options including bKash, Nagad',
    bengaliDescription: 'বিকাশ, নগদ সহ একাধিক নিরাপদ পেমেন্ট অপশন',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: '24/7 Support',
    bengaliTitle: '২৪/৭ সহায়তা',
    description: 'Round the clock customer support in Bengali & English',
    bengaliDescription: 'বাংলা ও ইংরেজি ভাষায় ২৪ ঘন্টা গ্রাহক সহায়তা',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: StarIcon,
    title: 'Premium Quality',
    bengaliTitle: 'প্রিমিয়াম মান',
    description: 'Handpicked premium quality fabrics and materials',
    bengaliDescription: 'হাতে বাছাই করা প্রিমিয়াম মানের কাপড় এবং উপকরণ',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: GlobeAltIcon,
    title: 'Bangladesh Made',
    bengaliTitle: 'বাংলাদেশে তৈরি',
    description: 'Supporting local artisans and traditional craftsmanship',
    bengaliDescription: 'স্থানীয় কারিগর এবং ঐতিহ্যগত কারুশিল্পকে সমর্থন',
    color: 'from-red-500 to-red-600'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="block bengali">কেন আমাদের বেছে নেবেন</span>
            <span className="block">Why Choose Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are committed to providing the best shopping experience with quality products, 
            excellent service, and customer satisfaction as our top priority.
            <span className="block bengali">মানসম্পন্ন পণ্য, উৎকৃষ্ট সেবা এবং গ্রাহক সন্তুষ্টি আমাদের সর্বোচ্চ অগ্রাধিকার হিসেবে আমরা সর্বোত্তম শপিং অভিজ্ঞতা প্রদানের জন্য প্রতিশ্রুতিবদ্ধ।</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 bengali">
                  {feature.bengaliTitle}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <p className="text-sm text-gray-500 bengali leading-relaxed">
                  {feature.bengaliDescription}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 to-bengali-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="block bengali">আমাদের সাফল্যের সংখ্যা</span>
              <span className="block">Our Success in Numbers</span>
            </h3>
            <p className="text-primary-100 text-lg">
              Trusted by thousands of customers across Bangladesh
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-primary-100">
                <span className="block bengali">সন্তুষ্ট গ্রাহক</span>
                <span className="block">Happy Customers</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-100">
                <span className="block bengali">পণ্যের ধরন</span>
                <span className="block">Product Types</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">64</div>
              <div className="text-primary-100">
                <span className="block bengali">জেলায় সেবা</span>
                <span className="block">Districts Served</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8</div>
              <div className="text-primary-100">
                <span className="block bengali">গড় রেটিং</span>
                <span className="block">Average Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">
            <span className="bengali">আমাদের বিশ্বস্ততা প্রমাণ করে</span>
            <span className="block">Trusted by leading brands and organizations</span>
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">SSL Secured</div>
            <div className="text-2xl font-bold text-gray-400">PCI DSS</div>
            <div className="text-2xl font-bold text-gray-400">ISO 9001</div>
            <div className="text-2xl font-bold text-gray-400">Trusted Shop</div>
          </div>
        </div>
      </div>
    </section>
  )
}