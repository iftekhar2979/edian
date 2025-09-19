
import ProductGrid from '@/components/Product/ProductGrid';
import ProductsText from '@/components/Resuable/Banner/ProductsText';

const Page = () => {
  return (
    <div className='min-h-screen pt-16'>
      <ProductsText />
      {/* <FilterSortBar /> */}
      {/* Pass search, page, and limit to ProductGrid */}
      <ProductGrid search={''} page={'1'} limit={'10'} />
    </div>
  );
};

export default Page;
