// components/productCard.tsx
import { IProduct } from "@/lib/models/products.model";
import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";

interface Props {
  product: IProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  console.log(product)
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
        height={100}
        width={100}
        alt={product.name}
        className="w-full transform transition-all duration-300 h-64 object-cover hover:scale-110 hover:border-pink-400"
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-md text-black font-semibold mb-1">{product.name}</h2>
          <div className="text-sm text-gray-500 mb-2" dangerouslySetInnerHTML={{ __html: product.description }}></div>


          
            <span className="text-lg font-bold text-pink-600">
              Tk {product.price}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex space-x-2">
          <button className="relative flex-1 text-black text-sm py-2 rounded border border-pink-600 overflow-hidden z-10 transition-all duration-500 hover:text-black hover:shadow-pink-glow neon-btn">
  Add to Cart
</button>
          <button className="flex-1 bg-green-500 cursor-pointer text-white text-sm py-2 rounded hover:bg-black transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    
  );
};

export default ProductCard;
