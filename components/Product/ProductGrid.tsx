// components/ProductGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard  from "./ProductCard";
import { Product } from "@/types/product";
import Link from "next/link";
import { IProduct } from "@/lib/models/products.model";

const ProductGrid = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 px-4 pt-6 sm:px-6 lg:px-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative max-w-7xl mx-auto px-6 sm:px-8 my-6" >
        {products.map((product) => (
          <div
            // key={product._id}
            className={`transform `}
          >
             <Link href={`/products/${product._id}`}>
            <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center">

      </div>
   
    </div>
  );
};

export default ProductGrid;
