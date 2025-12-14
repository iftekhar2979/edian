'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Product Grid Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an error while loading the products. This could be due to a
          temporary issue with our servers.
        </p>
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-700 font-mono">
            {error?.message || 'An unexpected error occurred'}
          </p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}