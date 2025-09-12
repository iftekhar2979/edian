import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose'; // Your database connection handler=
import productsModel from '@/lib/models/products.model';
import { uploadImageToCloud } from '../uploadImageToCloudinary';


export async function GET(req: NextRequest, { params }: any) {
  try {
    await dbConnect(); // Ensure the database connection is established
    // console.log(params)
    // Directly destructure the id from params
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Product ID is missing" }, { status: 400 });
    }

    // Find the product by ID in the database
    const product = await productsModel.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    dbConnect();
    console.log("Product Details")
    const formData = await req.formData();
    const productId = formData.get("id") as string; // Get the product ID from the request
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string); // Get quantity
    const hasStock = formData.get("hasStock") === "true"; // Parse hasStock as boolean
    const description = formData.get("description") as string;
    const images: string[] = []; // To hold the image URLs

    const imageFiles = formData.getAll("images") as File[];
    
    // Handle new images: Upload each new image to Cloudinary
    for (const file of imageFiles) {
      const imageUrl = await uploadImageToCloud(file); // Upload image to Cloudinary
      images.push(imageUrl); // Add the image URL to the images array
    }

    // Validate required fields
    if (!name || !price || !description || quantity < 1) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    // Fetch the existing product from the database
    const product = await productsModel.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update product details
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.hasStock = hasStock;
    product.description = description;

    // Add new images and update existing ones
    if (images.length > 0) {
      product.images = [...product.images, ...images]; // Add new images to the existing images array
    }

    // Save the updated product to the database
    await product.save();

    // Return the updated product as a response
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// Function to upload image to Cloudinary and get the image URL
