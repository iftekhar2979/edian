'use client'

import React from 'react'
import Link from 'next/link'

// Heroicons (solid or outline based on your preference)
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

import {
  ShoppingBagIcon,
  HomeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid'

import {
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* Logo and Intro */}
        <div className=''>
            <div className='flex items-center space-x-2'>
         <Link href='/'><Image src="/logo.jpeg" alt="Logo" width={60} height={60} className="object-contain"/></Link>
                  <Link href='/'> <h3 className="text-xl font-serif text-gray-800 tracking-widest">Shen J-idian Technology</h3></Link>
         
                   </div>
          <p className="text-sm text-gray-600">
            A Modern Technology company specializing in the research and development
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-base mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="flex items-center space-x-2 hover:underline">
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/products" className="flex items-center space-x-2 hover:underline">
                <ShoppingBagIcon className="w-4 h-4" />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex items-center space-x-2 hover:underline">
                <PaperAirplaneIcon className="w-4 h-4 rotate-45" />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-base mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
              href="/faq"
              className="flex items-center space-x-2 hover:underline"
            >
                <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
              
              <span>FAQs</span>
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="flex items-center space-x-2 hover:underline">
                <MapPinIcon className="w-4 h-4" />
                <span>Shipping</span>
              </Link>
            </li>
            <li>
              <Link href="/returns" className="flex items-center space-x-2 hover:underline">
                <XMarkIcon className="w-4 h-4" />
                <span>Returns</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="font-semibold text-base mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <EnvelopeIcon className="w-4 h-4" />
              <span>eshan@j-idian.com</span>
            </li>
            <li className="flex items-center space-x-2">
            
                  <a
                          href={`tel:${+8618681589043}`}
                          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-1"
                        >
                           <PhoneIcon className="w-4 h-4" />
                        </a>
              <span>+86 186 81589043</span>

            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Shen J-idian Technology All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
