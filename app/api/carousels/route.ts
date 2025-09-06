import productsModel from '@/lib/models/products.model';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import carouselModel from '@/lib/models/carousel.model';
import { uploadImageToCloud } from '../products/uploadImageToCloudinary';


interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest) {
  try {
    dbConnect();
   
    const carousels = await carouselModel.find() // Count the total number of products matching the query

    // Return paginated products along with the total count
    return NextResponse.json({
      carousels,
      
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await dbConnect();
    const deleted = await carouselModel.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Item deleted' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    await dbConnect();
    const body = await req.json();

    const { image, heading, subHeading } = body;
    const updated = await carouselModel.findByIdAndUpdate(
      params.id,
      { image, heading, subHeading },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    dbConnect();
    const formData = await req.formData();
    const heading = formData.get("heading") as string;
    // const price = parseFloat(formData.get("price") as string);
    // const quantity = parseInt(formData.get("quantity") as string); // Get quantity
    // const hasStock = formData.get("hasStock") === "true"; // Parse hasStock as boolean
    const subHeading = formData.get("subHeading") as string;
    const images: string[] = [];

    const imageFiles = formData.get('image') as File;
    // Upload each image to Cloudinary
    // for (const file of imageFiles) {
      const imageUrl = await uploadImageToCloud(imageFiles); // Upload image to Cloudinary
    //   images.push(imageUrl);
    // }

    // Validate required fields
    if (!heading && !subHeading) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create the new product in the database
    const carousel = new carouselModel({
    image:imageUrl,
    heading,
    subHeading

    });
    // Save the product to the database
    await carousel.save();

    // Return the newly created product as a response
    return NextResponse.json(carousel, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
