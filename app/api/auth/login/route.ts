import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongoose'; // Adjust path as needed
import usersModel from '@/lib/models/users.model'; // Adjust path as needed


  interface Payload {
      email:string;
      name:string,
      role:string,
      image:string
    }

export async function POST(req: NextRequest) {
  // Connect to the database
  await dbConnect();

  try {
    const { email, password } = await req.json(); // Parse request body
    
    // Validate if both email and password are provided
    if (!email || !password) {
      return new NextResponse(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
      });
    }

    // Find user by email
    const user = await usersModel.findOne({ email });
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
    }

    // Validate password (bcrypt.compare is async, so we need to await it)
    const isValid = await bcrypt.compare(password, user.password); // Await bcrypt.compare
    if (!isValid) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
    }

    // Generate JWT token
    const payload : Payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image, // Include any other fields you want in the payload
    };
    const jwtSecret  = process.env.JWT_SECRET as string
  const expires  = process.env.JWT_EXPIRES_IN as string
  if(!jwtSecret && !expires){
    throw new Error("token not provided")
  }
  if(typeof jwtSecret !=="string" && typeof expires !=='string'){
    throw new Error("token not provided")
  }
    const token = jwt.sign(payload, 'my-secret-key', {
      expiresIn: '1d' , // Default expiry to 1 day
    });

    // Set the token in a cookie (HttpOnly)
    const headers = new Headers();
    headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400;`);

    // Return response with JWT token
    return new NextResponse(JSON.stringify({ message: 'Login successful', token }), {
      status: 200,
      headers,
    });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ error: 'An error occurred during login', details: err.message }),
      {
        status: 500,
      }
    );
  }
}
