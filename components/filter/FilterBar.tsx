'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const FilterSortBar = () => {
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');

  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });

  const [sortOption, setSortOption] = useState('Alphabetically, A-Z');

  const totalProducts = 22;
  const selectedAvailabilityCount =
    Number(availability.inStock) + Number(availability.outOfStock);

  const resetAvailability = () => {
    setAvailability({ inStock: false, outOfStock: false });
  };

  const resetPrice = () => {
    setFromPrice('');
    setToPrice('');
  };

  const toggleDropdown = (type: 'availability' | 'price' | 'sort') => {
    setAvailabilityOpen(type === 'availability' ? !availabilityOpen : false);
    setPriceOpen(type === 'price' ? !priceOpen : false);
    setSortOpen(type === 'sort' ? !sortOpen : false);
  };

  return (
    <div className="w-full px-4 py-3 text-sm text-gray-600 border-b border-gray-200 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 gap-x-6">
        {/* Filter Group */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm text-gray-600">Filter:</span>

          {/* Availability */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('availability')}
              className="flex items-center space-x-1 hover:text-black"
            >
              <span>Availability</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {availabilityOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-md rounded-md border z-20 p-4 text-xs">
                <div className="flex justify-between items-center mb-2 text-gray-700">
                  <span>{selectedAvailabilityCount} selected</span>
                  <button
                    onClick={resetAvailability}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    Reset
                  </button>
                </div>

                <div className="border-b mb-2" />

                <div className="space-y-2 text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availability.inStock}
                      onChange={(e) =>
                        setAvailability((prev) => ({
                          ...prev,
                          inStock: e.target.checked,
                        }))
                      }
                      className="form-checkbox"
                    />
                    <span>In stock (19)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availability.outOfStock}
                      onChange={(e) =>
                        setAvailability((prev) => ({
                          ...prev,
                          outOfStock: e.target.checked,
                        }))
                      }
                      className="form-checkbox"
                    />
                    <span>Out of stock (3)</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('price')}
              className="flex items-center space-x-1 hover:text-black"
            >
              <span>Price</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {priceOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white shadow-md rounded-md border z-20 p-4 text-xs">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-700">
                    The highest price is <strong>$ 3,300.00</strong>
                  </span>
                  <button
                    onClick={resetPrice}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                    <span className="text-gray-500">৳</span>
                    <input
                      type="number"
                      value={fromPrice}
                      onChange={(e) => setFromPrice(e.target.value)}
                      placeholder="From"
                      className="w-full outline-none px-2 text-sm bg-transparent"
                    />
                  </div>

                  <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                    <span className="text-gray-500">৳</span>
                    <input
                      type="number"
                      value={toPrice}
                      onChange={(e) => setToPrice(e.target.value)}
                      placeholder="To"
                      className="w-full outline-none px-2 text-sm bg-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sort + Count */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <div className="flex items-center space-x-1">
              <span>Sort by:</span>
              <button
                onClick={() => toggleDropdown('sort')}
                className="flex items-center hover:text-black"
              >
                <span>{sortOption}</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
            </div>

            {sortOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md border z-20">
                <ul className="p-2 text-xs space-y-1">
                  {[
                    'Alphabetically, A-Z',
                    'Alphabetically, Z-A',
                    'Newest First',
                    'Oldest First',
                  ].map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setSortOption(option);
                        setSortOpen(false);
                      }}
                      className="hover:bg-gray-100 cursor-pointer px-2 py-1"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Product Count */}
          <div>{totalProducts} products</div>
        </div>
      </div>
    </div>
  );
};

export default FilterSortBar;
