import productsModel from '@/lib/models/products.model';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';

import { uploadImageToCloud } from './uploadImageToCloudinary';

// Handler to get all products
// export async function GET(req: NextRequest) {
//   try {
//     dbConnect()
//     // console.log(req)
//     // Fetch all products from the database
//     const products = await productsModel.find();
//     if(!products || products.length === 0) {
//       return NextResponse.json({ message: 'No products found' }, { status: 404 });
//     }
// // console.log(products)
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
//   }
// }


export async function GET(req: NextRequest) {
  try {
    dbConnect();
    
    // Get query parameters
    const { search, page = 1, limit = 10, hasStock, priceMin, priceMax } = req.nextUrl.searchParams as any;

    const query: any = {};
    
    // Filter by search term (name of product)
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Filter by stock availability (hasStock)
    if (hasStock !== undefined) {
      query.hasStock = hasStock === 'true'; // Convert string to boolean
    }

    // Filter by price range
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseFloat(priceMin);
      if (priceMax) query.price.$lte = parseFloat(priceMax);
    }

    // Pagination
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const products = await productsModel.find(query)
      .skip(skip)
      .limit(parseInt(limit as string));

    const totalProducts = await productsModel.countDocuments(query); // Count the total number of products matching the query

    // Return paginated products along with the total count
    return NextResponse.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / parseInt(limit as string)),
      currentPage: parseInt(page as string)
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    dbConnect();
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string); // Get quantity
    const hasStock = formData.get("hasStock") === "true"; // Parse hasStock as boolean
    const description = formData.get("description") as string;
    const images: string[] = [];

    const imageFiles = formData.getAll("images") as File[];
    // Upload each image to Cloudinary
    for (const file of imageFiles) {
      const imageUrl = await uploadImageToCloud(file); // Upload image to Cloudinary
      images.push(imageUrl);
    }

    // Validate required fields
    if (!name || !price || !description || images.length === 0 || quantity < 1) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create the new product in the database
    const newProduct = new productsModel({
      name,
      price,
      quantity:quantity, // Add quantity
      hasStock:hasStock, // Add hasStock
      description,
      images,
    });
    // Save the product to the database
    await newProduct.save();

    // Return the newly created product as a response
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
