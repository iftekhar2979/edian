import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";

const ProductImageCarousel = ({ images, name }: { images: string[], name: string }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Handle clicking on a thumbnail
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Slick Slider Settings
  const sliderSettings = {
    dots: true, // Display navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedImageIndex, // Show the selected image initially
  };

  return (
    <div className="flex justify-center flex-col space-y-4">
      {/* Main Image Slider */}
      <div className="w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
        <Slider {...sliderSettings}>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <Image
                src={imageUrl}
                alt={name}
                className="w-full h-full object-contain"
                height={400}
                width={400}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Image Thumbnails */}
      <div className="flex space-x-2 mx-auto overflow-x-auto">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className={`w-20 h-20 border-2 rounded-md cursor-pointer overflow-hidden ${
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
  );
};

export default ProductImageCarousel;
