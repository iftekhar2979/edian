import mongoose, { Document, Schema } from 'mongoose';

// Define the Product interface
export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  images: string[];  // Array of image URLs
}

// Create a schema for the Product model
const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Price should be a positive number
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs
      required: true, // You can make it optional if desired
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Product model
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
