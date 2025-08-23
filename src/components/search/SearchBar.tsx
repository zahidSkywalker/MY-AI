'use client'

import { useState, useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface SearchBarProps {
  onClose: () => void
}

// Mock search suggestions
const mockSuggestions = [
  'Saree',
  'Salwar Kameez',
  'Panjabi',
  'T-Shirt',
  'Shirt',
  'Traditional Wear',
  'Casual Wear',
  'Formal Wear'
]

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true)
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
        setSuggestions(filtered)
        setIsSearching(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    // Navigate to search results
    window.location.href = `/search?q=${encodeURIComponent(suggestion)}`
  }

  return (
    <div ref={searchRef} className="relative bg-white border-b border-gray-200 py-4">
      <div className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, categories, or brands..."
              className="w-full pl-12 pr-20 py-4 text-lg bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Search
            </button>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </form>

        {/* Search Suggestions */}
        {query.trim() && (
          <div className="mt-4 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">
                <div className="spinner mx-auto mb-2"></div>
                Searching...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}

        {/* Popular Searches */}
        {!query.trim() && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {mockSuggestions.slice(0, 6).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Categories */}
        {!query.trim() && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Quick categories:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Traditional', bengaliName: 'ঐতিহ্যগত', href: '/category/traditional' },
                { name: 'Casual', bengaliName: 'ক্যাজুয়াল', href: '/category/casual' },
                { name: 'Formal', bengaliName: 'ফরমাল', href: '/category/formal' },
                { name: 'New Arrivals', bengaliName: 'নতুন আগমন', href: '/new-arrivals' }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
                >
                  <div className="text-sm font-medium text-gray-700">{category.name}</div>
                  <div className="text-xs text-gray-500 bengali">{category.bengaliName}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}