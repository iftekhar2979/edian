import ProductUpdateForm from '@/components/dashboard/ProductUpdateForm'
import React, { JSX } from 'react'

export default async function Page({ params }: any):Promise<JSX.Element> {
  const {id} = await params
  return (
    <div>
        <ProductUpdateForm id={id}/>
    </div>
  )
}

// export default Page 