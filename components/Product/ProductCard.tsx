// components/productCard.tsx
'use client'
import { IProduct } from "@/lib/models/products.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface Props {
  product: IProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  // console.log(product)
  return (
    <div className="relative bg-white overflow-hidden group cursor-pointer border border-gray-200 h-full flex flex-col justify-between">
      {/* Sale Tag */}
      {/* {product.isOnSale && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10 animate-pulse">
          Sale
        </div>
      )} */}

      {/* Product Image */}
      <Image
        src={product.images[0] || '/placeholder.png'}
        height={1000}
        width={1000}
        quality={100}
        alt={product.name}
        className="w-full transform transition-all duration-300 h-64 object-cover hover:scale-110 hover:border-pink-400"
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-md text-black font-semibold mb-1">{product.name}</h2>
          
            {/* <span className="text-lg font-bold text-black">
              $ {product.price}
            </span> */}
            
          </div>
          <span className="text-sm font-bold text-pink-600">
              Custom Orders applicable
            </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex space-x-2 my-2 mx-2">
         <Link href="/contact" className="relative flex-1 text-black text-sm py-2 rounded border border-pink-600 overflow-hidden z-10 transition-all duration-500 text-center hover:text-black hover:shadow-pink-glow neon-btn">Contact</Link> 
          
           <a
                      href={`https://wa.me/8613032717391`}
                      target="_blank"
                      rel="noopener noreferrer"
                       onClick={(e) => e.stopPropagation()}
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center gap-1 flex-1 bg-green-500 cursor-pointer text-white text-sm py-2 rounded hover:bg-black transition-colors"
                    >
                      <FaWhatsapp /> Order
                    </a>
          {/* <button className="flex-1 bg-green-500 cursor-pointer text-white text-sm py-2 rounded hover:bg-black transition-colors">
            Order
          </button> */}
        </div>
      </div>
    
  );
};

export default ProductCard;
