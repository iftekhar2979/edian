import { IProduct } from "@/lib/models/products.model"; // Import the Product type
import ProductCard from "./ProductCard"; // Import ProductCard component
import Link from "next/link";
import { notFound } from 'next/navigation';

interface ProductGridProps {
  search: string;
  page: string;
  limit: string;
}

const ProductGrid = async ({ search, page, limit }: ProductGridProps) => {
  // Fetch products data on the server using URL query parameters for search and pagination
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${search}&page=${page}&limit=${limit}`, 
    {
      cache: "no-store", // Ensure fresh data is fetched on each request
    }
  );
  
  const data = await res.json();

  // If no products are found, return a message
  if (!data.products || data.products.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-semibold">No products available</h1>
      </div>
    );
  }

  const { products, totalPages, currentPage } = data;

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

      {/* Pagination Component */}
      <div className="flex justify-center space-x-4 my-6">
        {currentPage > 1 && (
          <button
            onClick={() => notFound()}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
        )}
        <span className="self-center text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <button
            onClick={() => notFound()}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-200"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
