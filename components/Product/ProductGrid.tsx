// components/ProductGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard  from "./ProductCard";
import { Product } from "@/types/product";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-16">
      <h1 className="text-3xl font-bold text-center mb-8  text-gray-800 tracking-widest">Edian Originals</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 relative">
        {products.map((product) => (
          <div
            key={product.id}
            className={`transform `}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
   <button className="bg-green-500 mt-6 cursor-pointer hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold transition">
                    View all
                  </button>
      </div>
   
    </div>
  );
};

export default ProductGrid;
