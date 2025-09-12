// components/Advantages.tsx

import React from 'react';
import { FaPencilRuler, FaIndustry, FaClock, FaUsers } from 'react-icons/fa';

interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const advantages: AdvantageItem[] = [
  {
    icon: <FaPencilRuler className="text-blue-500 text-6xl mb-4" />,
    title: 'R & D Advantages',
    description: 'We provide innovative research and development to stay ahead of the competition.',
  },
  {
    icon: <FaIndustry className="text-blue-500 text-6xl mb-4" />,
    title: 'Manufacturing Advantage',
    description: 'State-of-the-art manufacturing processes ensure high-quality production.',
  },
  {
    icon: <FaClock className="text-blue-500 text-6xl mb-4" />,
    title: 'Time Advantage',
    description: 'Efficient workflows that reduce time-to-market without compromising quality.',
  },
  {
    icon: <FaUsers className="text-blue-500 text-6xl mb-4" />,
    title: 'Service Advantage',
    description: 'Dedicated customer support and after-sales service to ensure satisfaction.',
  },
];

const Advantages: React.FC = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-12 text-black">Our Advantage</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-6">
        {advantages.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {item.icon}
            <h3 className="text-lg font-bold mt-2 mb-2 text-black">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
