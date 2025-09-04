import mongoose, { Schema } from 'mongoose';

// Define the Product interface
export interface IProduct  {
  name: string;
  price: number;
  description: string;
  quantity:number;
  hasStock:boolean;
  images: string[];  // Array of image URLs
}

// Create a schema for the Product model
const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1, // Default quantity to 1 if not provided
    },
    hasStock: {
      type: Boolean,
      required: true,
      default: true, // Default hasStock to true if not provided
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Product model
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
