// components/productCard.tsx
import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";



interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="relative bg-white overflow-hidden group cursor-pointer border border-gray-200 h-full" >
  {product.isOnSale && (
    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10 animate-pulse">
      Sale
    </div>
  )}

  <Image
    src={product.imageUrl}
    height={100}
    width={100}
    alt={product.name}
    className="w-full transform transition-all duration-300 h-64 object-cover hover:scale-110 hover:border-pink-400"
  />

  <div className="p-4">
    <h2 className="text-md text-black font-semibold mb-1">{product.name}</h2>
    <p className="text-sm text-gray-500 mb-2">{product.description}</p>

    <div className="flex items-center space-x-2">
      {product.oldPrice && (
        <span className="text-sm line-through text-gray-400">
          Tk {product.oldPrice}
        </span>
      )}
      <span className="text-lg font-bold text-pink-600">
        Tk {product.price}
      </span>
    </div>
  </div>
</div>


  );
};

export default ProductCard;
