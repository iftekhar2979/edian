import productsModel from '@/lib/models/products.model';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import dbConnect from '@/lib/mongoose';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Handler to get all products
export async function GET(req: NextRequest) {
  try {
    dbConnect()
    // console.log(req)
    // Fetch all products from the database
    const products = await productsModel.find();
    if(!products || products.length === 0) {
      return NextResponse.json({ message: 'No products found' }, { status: 404 });
    }
console.log(products)
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    dbConnect()
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string; // This will contain rich text
    const images: string[] = [];

    // Handle image file uploads (store URLs or upload to cloud storage)
    const imageFiles = formData.getAll('images') as File[];
    
    // Upload each image to Cloudinary
    for (const file of imageFiles) {
      const imageUrl = await uploadImageToCloud(file); // Upload image to Cloudinary
      images.push(imageUrl); // Push the image URL to the array
    }
// console.log(images)
    // Validate required fields
    if (!name || !price || !description || images.length === 0) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create the new product in the database
    const newProduct = new productsModel({
      name,
      price,
      description,
      images,
    });
console.log(newProduct)
    // Save the product to the database
    await newProduct.save();

    // Return the newly created product as a response
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// Function to upload image to Cloudinary and get the image URL
async function uploadImageToCloud(file: File) {
  return new Promise<string>(async(resolve, reject) => {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    
    cloudinary.v2.uploader.upload_stream(
      { resource_type: 'auto', folder: 'products' }, // Upload images to a 'products' folder
      (error, result) => {
        if (error) {
          reject(error); // Handle any errors during upload
        } else {
          resolve(result?.secure_url || ''); // Return the URL of the uploaded image
        }
      }
    ).end(fileBuffer);
  });
}