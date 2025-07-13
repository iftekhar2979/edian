"use client"
import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-serif text-gray-800 tracking-widest">Edian</div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="underline underline-offset-4">Products</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
            <UserIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
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
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="underline underline-offset-4">Products</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center space-x-6">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
            <UserIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
            <ShoppingBagIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
