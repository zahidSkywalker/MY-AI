"use client";

import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const chatOptions = [
    {
      name: 'WhatsApp',
      icon: '📱',
      bgColor: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      href: 'https://wa.me/8801234567890?text=Hi! I have a question about Z Fashion products.',
      description: 'Chat on WhatsApp'
    },
    {
      name: 'Messenger',
      icon: '💬',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-600',
      href: 'https://m.me/zfashion.bd',
      description: 'Chat on Messenger'
    },
    {
      name: 'Live Chat',
      icon: '💻',
      bgColor: 'bg-slate-600',
      textColor: 'text-slate-700',
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
          className="w-16 h-16 bg-slate-900 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
        >
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-white mx-auto" />
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
          <div className="absolute bottom-24 right-6 w-80 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Z</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Need Help?</h3>
                    <p className="text-slate-300 text-sm">We're here to assist you</p>
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
                  className="block p-4 hover:bg-slate-50 rounded-2xl hover:scale-105 transition-all duration-300 group border border-transparent hover:border-slate-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${option.bgColor} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${option.textColor} group-hover:scale-105 transition-transform duration-200`}>
                        {option.name}
                      </h4>
                      <p className="text-slate-600 text-sm">{option.description}</p>
                    </div>
                    <div className={`w-6 h-6 ${option.bgColor} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200">
              <p className="text-center text-slate-600 text-sm">
                Response time: <span className="font-semibold text-slate-900">Usually within 5 minutes</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;