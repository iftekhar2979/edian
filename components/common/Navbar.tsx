'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for toggling search input
  const [searchQuery, setSearchQuery] = useState(''); // State to track search query
  const pathname = usePathname(); // 👈 get current path
  const router = useRouter(); // Next.js router to navigate programmatically

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Navigate to the products page with the search query as a URL parameter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      router.push(`/products?search=${searchQuery}`); // Navigate to products with search query
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-100 border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-serif text-gray-800 tracking-widest">Shen J-idian Technology</div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
            <Link
              href="/"
              className={isActive('/') ? 'underline underline-offset-4' : 'hover:underline'}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={isActive('/products') ? 'underline underline-offset-4' : 'hover:underline'}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className={isActive('/contact') ? 'underline underline-offset-4' : 'hover:underline'}
            >
              Contact
            </Link>
            <Link
              href="/about"
              className={isActive('/about') ? 'underline underline-offset-4' : 'hover:underline'}
            >
              About Us
            </Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Icon */}
            <MagnifyingGlassIcon 
              className="h-5 w-5 text-gray-700 cursor-pointer" 
              onClick={toggleSearch} 
            />
            {/* Show search input when 'isSearchOpen' is true */}
            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="p-2 border text-black rounded-md"
                  autoFocus
                />
                <button type="submit" className="ml-2 p-2 bg-blue-600 text-white rounded-md">
                  Search
                </button>
              </form>
            )}

            <Link href={'/login'}>
              <UserIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
            </Link>
            <ShoppingBagIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center space-x-4">
            <Bars3Icon 
              className="h-6 w-6 text-gray-700 cursor-pointer" 
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      >
        {/* Sliding Drawer */}
        <div 
          className={`fixed left-0 top-0 w-64 h-full bg-white p-6 space-y-6 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the drawer
        >
          {/* Close Icon */}
          <div className="flex justify-end">
            <XMarkIcon 
              className="h-6 w-6 text-gray-700 cursor-pointer" 
              onClick={toggleMenu}
            />
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-4 text-sm font-medium text-gray-700">
            <Link
              href="/"
              className={isActive('/') ? 'underline underline-offset-4' : 'hover:underline'}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={isActive('/products') ? 'underline underline-offset-4' : 'hover:underline'}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className={isActive('/contact') ? 'underline underline-offset-4' : 'hover:underline'}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-6">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
            <Link href={'/login'}>
              <UserIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
            </Link>
            <ShoppingBagIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
