'use client'

import React from 'react'
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

const CompanyInfo: React.FC = () => {
  return (
    <div className=" p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Our Company</h2>
      <ul className="space-y-4 text-sm text-gray-700">
        <li className="flex items-start space-x-3">
          <MapPinIcon className="w-5 h-5 text-gray-500 mt-1" />
          <span>
            1234 Innovation Avenue<br />
            San Francisco, CA 94102, USA
          </span>
        </li>
        <li className="flex items-center space-x-3">
          <PhoneIcon className="w-5 h-5 text-gray-500" />
          <span>+1 (800) 123-4567</span>
        </li>
        <li className="flex items-center space-x-3">
          <EnvelopeIcon className="w-5 h-5 text-gray-500" />
          <span>contact@edian.com</span>
        </li>
      </ul>
    </div>
  )
}

export default CompanyInfo
