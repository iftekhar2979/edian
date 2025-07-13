import CompanyInfo from "@/components/company/CompanyInfo";
import ContactForm from "@/components/contact/ContactUs";
import Banner from "@/components/home/Banner";
import ProductGrid from "@/components/Product/ProductGrid";

export default function Home() {
  return (
   <>
   <Banner/>
   <ProductGrid/>
   <ContactForm/>
   <CompanyInfo/>
   </>
  );
}
