import ProductForm from "@/components/dashboard/ProductUploadForm";
import CarouselUploader from "@/components/home/Carousels";
import CarouselList from "@/components/Product/dashboard/CarouselList";


export default function Page() {
  return (
    <div>
        <CarouselList/>
        
      <CarouselUploader/>
    </div>
  );
}
