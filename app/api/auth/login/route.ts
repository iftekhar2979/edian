import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongoose'; // Adjust path as needed
import usersModel from '@/lib/models/users.model'; // Adjust path as needed

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
    console.log(user)
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
    }

    // Validate password
    console.log(password)
    const isValid = bcrypt.compare(password, user.password);
    console.log(isValid)
    if (!isValid) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 400 });
    }

    // Generate JWT token
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image, // Include any other fields you want in the payload
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d', // Default expiry to 1 day
    });

    // Set the token in a cookie (HttpOnly)
    const headers = new Headers();
    headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400;`);

    // Return response with JWT token
    return new NextResponse(JSON.stringify({ message: 'Login successful', token }), {
      status: 200,
      headers,
    });
  } catch (err:any) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ error: 'An error occurred during login', details: err.message }),
      {
        status: 500,
      }
    );
  }
}
