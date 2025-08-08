// /app/products/[id]/page.tsx

import ProductDetails from '@/components/Product/ProductDetails'
import { JSX } from 'react';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
  isOnSale?: boolean;
  description?: string;
}

// This is a Server Component (SSR)
async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?id=${id}`, {
    cache: 'no-store', // important to ensure SSR fetches fresh data
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data;
}

export default async function Page({ params }: any):Promise<JSX.Element> {
  const product = await getProductById(params?.id);

  if (!product) {
    return <div className="text-center p-10">Product not found</div>;
  }

  return (
    <div>
      <ProductDetails
        imageUrl={product.imageUrl}
        title={product.name}
        price={product.price}
        quantityAvailable={10}
      />
    </div>
  );
}
