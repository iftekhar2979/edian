"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { IProduct } from "@/lib/models/products.model";



const ProductDetails: React.FC<{ product }> = ({ product }) => {
  const { images, name, price, description } = product;

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to manage the selected image index

  // const handleIncrement = () => {
  //   if (quantity < quantityAvailable) {
  //     setQuantity((prev) => prev + 1);
  //   }
  // };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index); // Set the selected image when the user clicks on a thumbnail
  };

  return (
    <div className="max-w-5xl mt-16 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* Image Section */}
      <div className="flex justify-center items-center flex-col space-y-4">
        {/* Main Image */}
        <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden">
          <Image
            src={images[selectedImageIndex]}
            alt={name}
            className="w-full h-full object-contain"
            height={400}
            width={400}
          />
        </div>

        {/* Image Thumbnails */}
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className={`w-16 h-16 border-2 rounded-md cursor-pointer overflow-hidden ${
                selectedImageIndex === index ? "border-black" : "border-gray-300"
              }`}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={imageUrl}
                alt={`Thumbnail ${index}`}
                className="object-cover w-full h-full"
                height={64}
                width={64}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}

      <div className="flex flex-col justify-center space-y-6">
        <h1 className="text-3xl font-semibold text-black">{name}</h1>
        <div className="text-black" dangerouslySetInnerHTML={{__html:description}}></div>
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
          {/* <button
            onClick={handleIncrement}
            className="p-1 border rounded disabled:opacity-40"
            disabled={quantity === quantityAvailable}
          > */}
            {/* <PlusIcon className="h-5 w-5" />
          </button> */}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 my-6">
          <button className="flex-1 border text-black border-gray-800 py-2 px-4 rounded hover:bg-gray-100 transition">
            Add to cart
          </button>
          <button className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition">
            Buy it now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
