import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './app/api/auth/verifyToken';
// import { verifyToken } from './app/api/auth/verifyToken'; // Adjust the import path as needed

export async function middleware(req: NextRequest) {
  // Get the token from cookies
  console.log('Middleware triggered for:', req.url);
  const token = req.cookies.get('token') as string | undefined;
  console.log('Token from cookies:', token);

  // If there's no token, redirect the user to the login page
  if (!token) {
    console.log('No token, redirecting to login...');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the JWT token
    await verifyToken(token);
 console.log('Token is valid, proceeding...');
    // If the token is valid, allow the request to continue
    return NextResponse.next();
  } catch (error) {
      console.log('Invalid token, redirecting to login...');
    // If the token is invalid, redirect to the login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Apply middleware to the /dashboard route and its subroutes
export const config = {
  matcher: ['/dashboard/'],  // Middleware runs for any route starting with /dashboard
};

