import ProductUpdateForm from '@/components/dashboard/ProductUpdateForm'
import { Product } from '@/types/product';
import React, { JSX } from 'react'

async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    cache: 'no-store', // important to ensure SSR fetches fresh data
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data;
}

export default async function Page({ params }: any):Promise<JSX.Element> {
  const product = await getProductById(params?.id);
  return (
    <div>
        <ProductUpdateForm id={params?.id}/>
    </div>
  )
}

// export default Page