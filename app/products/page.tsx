import FilterSortBar from '@/components/filter/FilterBar'
import ProductGrid from '@/components/Product/ProductGrid'
import ProductsText from '@/components/Resuable/Banner/ProductsText'
import React from 'react'

function page() {
  return (
    <div className=' min-h-screen pt-16'>
        <ProductsText/>
        <FilterSortBar/>
        <ProductGrid/>
    </div>
  )
}

export default page