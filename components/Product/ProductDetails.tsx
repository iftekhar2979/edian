"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: number;
  quantityAvailable?: number;
}

const ProductDetails: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  price,
  quantityAvailable = 1,
}) => {

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < quantityAvailable) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-5xl mt-16 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* Image */}
      <div className="flex justify-center items-center">
      
        <Image
          src={imageUrl}
          alt={title}
          className="w-full max-w-md rounded-lg shadow-lg"
          height={400}
          width={400}
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-center space-y-6">
        <h1 className="text-3xl font-semibold text-black">{title}</h1>
        <p className="text-xl text-gray-700">Tk {price.toLocaleString()}</p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-3 text-black">
          <button
            onClick={handleDecrement}
            className="p-1 border rounded disabled:opacity-40"
            disabled={quantity === 1}
          >
            <MinusIcon className="h-5 w-5 text-black" />
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="p-1 border rounded disabled:opacity-40"
            disabled={quantity === quantityAvailable}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 border text-black border-gray-800 py-2 px-4 rounded hover:bg-gray-100 transition">
            Add to cart
          </button>
          <button className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition">
            Buy it now
          </button>
        </div>

        {/* View Counter */}
        {/* <p className="text-red-600 text-sm flex items-center">
          👁️ 1 People are currently viewing this product.
        </p> */}
      </div>
    </div>
  );
};

export default ProductDetails;
