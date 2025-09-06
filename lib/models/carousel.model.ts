import mongoose, { Schema } from "mongoose";

interface ICarousel{
    image:string,
    heading:string,
    subHeading:string
}
// Create a schema for the Product model
const carouselSchema = new Schema<ICarousel>(
  {
   
    image: {
      type: String,
      required: true,
    },
    heading:{
        type:String,
        required:true
    },
    subHeading:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

// Export the Product model
export default mongoose.models.Product || mongoose.model<ICarousel>('Carousel', carouselSchema);
