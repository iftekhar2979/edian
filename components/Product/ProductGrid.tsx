// components/ProductGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard  from "./ProductCard";
import { Product } from "@/types/product";
import FilterSortBar from "../filter/FilterBar";

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
    <div className="bg-gray-50 px-4 py-6 sm:px-6 lg:px-16">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 relative max-w-7xl mx-auto px-6 sm:px-8 my-6" >
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

      </div>
   
    </div>
  );
};

export default ProductGrid;
