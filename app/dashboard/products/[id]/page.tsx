import ProductUpdateForm from '@/components/dashboard/ProductUpdateForm'
import React, { JSX } from 'react'

export default async function Page({ params }: any):Promise<JSX.Element> {
  return (
    <div>
        <ProductUpdateForm id={params?.id}/>
    </div>
  )
}

// export default Page