import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose'; // Your database connection handler=
import productsModel from '@/lib/models/products.model';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); // Ensure the database connection is established

    const { id } = params; // Extract product ID from the URL params

    // Find the product by ID in the database
    const product = await productsModel.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
