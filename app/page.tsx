import CompanyInfo from "@/components/company/CompanyInfo";
import ContactForm from "@/components/contact/ContactUs";
import Banner from "@/components/home/Banner";
import ProductGrid from "@/components/Product/ProductGrid";
import ProductsText from "@/components/Resuable/Banner/ProductsText";

export default function Home() {
  return (
   <section>
   <Banner/>
<ProductsText/>
   <ProductGrid/>
   <ContactForm/>
   <CompanyInfo/>
   </section>
  );
}
