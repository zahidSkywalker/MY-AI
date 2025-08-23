"use client";

import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const chatOptions = [
    {
      name: 'WhatsApp',
      icon: '📱',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-600',
      href: 'https://wa.me/8801234567890?text=Hi! I have a question about Z Fashion products.',
      description: 'Chat on WhatsApp'
    },
    {
      name: 'Messenger',
      icon: '💬',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-600',
      href: 'https://m.me/zfashion.bd',
      description: 'Chat on Messenger'
    },
    {
      name: 'Live Chat',
      icon: '💻',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-600',
      href: '#',
      description: 'Start live chat'
    }
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-700 rounded-full shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-110 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full"></div>
          <ChatBubbleLeftRightIcon className="relative w-8 h-8 text-white mx-auto" />
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Chat Options Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Modal */}
          <div className="absolute bottom-24 right-6 w-80 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600/20 to-purple-600/20 p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Z</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Need Help?</h3>
                    <p className="text-white/80 text-sm">We're here to assist you</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Options */}
            <div className="p-4 space-y-3">
              {chatOptions.map((option, index) => (
                <a
                  key={index}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 ${option.bgColor} ${option.borderColor} border rounded-2xl hover:scale-105 transition-all duration-300 group`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${option.textColor} group-hover:scale-105 transition-transform duration-200`}>
                        {option.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                    <div className={`w-6 h-6 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 p-4 border-t border-white/20">
              <p className="text-center text-gray-600 text-sm">
                Response time: <span className="font-semibold text-primary-600">Usually within 5 minutes</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;