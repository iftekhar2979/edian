"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import Image from "next/image";

const ImageSlider: React.FC = () => {
  const slides = [
    {
      image:"/pngtree-e-commerce-tmall-dash-cam-black-high-end-banner-image_909564.jpg",
      heading: "Dash camera for you .",
      subheading: "Experience the best in-car surveillance with premium features and reliable service.",
    },
    {
      image:
        "/top-new-1.png",
      heading: "Top Performance, New Arrival",
      subheading: "Stay safe on the road with our latest dash cam technology – built for clarity and peace of mind.",
    },
    {
      image:
        "https://essentialsaltspa.com/wp-content/uploads/2024/11/vecteezy_salvia-officinalis-sage-oil-homemade-sage-infused-oil-in_15992101-1024x683.jpg",
      heading: "Drive with Confidence",
      subheading: "Enhance your journey with smart recording and real-time safety – because your drive deserves the best.",
    },
  ];

  return (
    <div className="relative image-slider-container">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        speed={1000} // Smooth animation speed
        parallax={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Navigation, Pagination, Autoplay, Parallax]}
      >
        <div
          slot="container-start"
          className="parallax-bg absolute top-0 left-0 w-full h-full"
          data-swiper-parallax="-23%"
        />

        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[60vh] w-full">
              <Image
                src={slide.image}
                alt={`slide-${index}`}
                height={1000}
                width={1000}
                className="object-cover w-full h-full brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div
                className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white text-center px-4"
                data-swiper-parallax="-200"
              >
                <h2
                  className="text-3xl md:text-5xl font-bold mb-2 transition-all duration-700"
                  data-swiper-parallax="-300"
                >
                  {slide.heading}
                </h2>
                <p
                  className="text-md md:text-xl mb-4 max-w-xl transition-all duration-700"
                  data-swiper-parallax="-100"
                >
                  {slide.subheading}
                </p>
                <div className="flex gap-4">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold transition">
                    Purchase
                  </button>
                  <button className="border border-white text-white px-6 py-3 rounded-md font-semibold relative group overflow-hidden">
                    <span className="relative z-10">Contact Us</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 transition duration-300 blur-sm" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="custom-prev absolute top-1/2 left-4 z-30 transform -translate-y-1/2 cursor-pointer">
          <ChevronLeftIcon className="w-10 h-10 text-white hover:text-green-400 transition" />
        </div>
        <div className="custom-next absolute top-1/2 right-4 z-30 transform -translate-y-1/2 cursor-pointer">
          <ChevronRightIcon className="w-10 h-10 text-white hover:text-green-400 transition" />
        </div>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
