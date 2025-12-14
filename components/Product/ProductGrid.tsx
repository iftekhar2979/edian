import ProductCard from "./ProductCard";
import Link from "next/link";

interface ProductGridProps {
  search: string;
  page: string;
  limit: string;
}

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASEURL) {
  throw new Error("No base url provided");
}

const ProductGrid = async ({ search, page, limit }: ProductGridProps) => {
  try {
    // Fetch products data on the server using URL query parameters
    console.log(`${BASEURL}/api/products?search=${search}&page=${page}&limit=${limit}`);
    const res = await fetch(
      `${BASEURL}/api/products?search=${search}&page=${page}&limit=${limit}`,
      {
        cache: "no-store", // Ensure fresh data is fetched on each request
      }
    );

    // Check if the response is OK
    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      
      // Handle specific status codes
      if (res.status === 404) {
        return (
          <div className="text-center p-10">
            <h1 className="text-2xl font-semibold text-gray-800">Products Not Found</h1>
            <p className="text-gray-600 mt-2">The requested products could not be found.</p>
          </div>
        );
      }
      
      // For other errors, show a generic error message
      return (
        <div className="text-center p-10">
          <h1 className="text-2xl font-semibold text-red-600">Error Loading Products</h1>
          <p className="text-gray-600 mt-2">
            Unable to load products at this time. Please try again later.
          </p>
          <p className="text-sm text-gray-500 mt-2">Error Code: {res.status}</p>
        </div>
      );
    }

    const data = await res.json();

    // If no products are found, return a message
    if (!data.products || data.products.length === 0) {
      return (
        <div className="text-center p-10">
          <h1 className="text-2xl font-semibold text-gray-800">No products available</h1>
          {search && (
            <p className="text-gray-600 mt-2">
              No results found for "{search}". Try a different search term.
            </p>
          )}
        </div>
      );
    }

    const { products, totalPages, currentPage } = data;
    const currentPageNum = parseInt(currentPage);
    const totalPagesNum = parseInt(totalPages);

    return (
      <div className="bg-gray-50 px-4 pt-6 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative max-w-7xl mx-auto px-6 sm:px-8 my-6">
          {products.map((product: any) => (
            <div key={product._id} className="transform">
              <Link href={`/products/${product._id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        {totalPagesNum > 1 && (
          <div className="flex justify-center items-center space-x-4 my-6">
            {currentPageNum > 1 ? (
              <Link
                href={`?search=${search}&page=${currentPageNum - 1}&limit=${limit}`}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Previous
              </Link>
            ) : (
              <span className="px-4 py-2 border rounded-md text-gray-400 cursor-not-allowed">
                Previous
              </span>
            )}
            
            <span className="text-gray-700 font-medium">
              Page {currentPageNum} of {totalPagesNum}
            </span>
            
            {currentPageNum < totalPagesNum ? (
              <Link
                href={`?search=${search}&page=${currentPageNum + 1}&limit=${limit}`}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Next
              </Link>
            ) : (
              <span className="px-4 py-2 border rounded-md text-gray-400 cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    // Catch any network errors or JSON parsing errors
    console.error("Error fetching products:", error);
    
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-semibold text-red-600">Connection Error</h1>
        <p className="text-gray-600 mt-2">
          Unable to connect to the server. Please check your connection and try again.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
      </div>
    );
  }
};

export default ProductGrid;