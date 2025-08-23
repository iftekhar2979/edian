import { IProduct } from "@/lib/models/products.model"; // Import the Product type
import ProductCard from "./ProductCard"; // Import ProductCard component
import Link from "next/link";

// Server Component
const ProductGrid = async () => {
  // Fetch products data on the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store", // Ensure fresh data is fetched on each request
  });
  
  const products: IProduct[] = await res.json(); // Parse the response

  // If no products are found, return a message
  if (products.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-semibold">No products available</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-4 pt-6 sm:px-6 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative max-w-7xl mx-auto px-6 sm:px-8 my-6">
        {products.map((product) => (
          <div key={product._id} className="transform">
            <Link href={`/products/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
