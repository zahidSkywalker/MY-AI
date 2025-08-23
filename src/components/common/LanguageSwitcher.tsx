'use client'

import { useState } from 'react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<'bn' | 'en'>('bn')

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'bn' ? 'en' : 'bn')
    // TODO: Implement language switching logic
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 text-white hover:text-primary-200 transition-colors duration-200"
    >
      <GlobeAltIcon className="h-4 w-4" />
      <span className="text-sm font-medium">
        {currentLanguage === 'bn' ? 'বাংলা' : 'English'}
      </span>
    </button>
  )
}