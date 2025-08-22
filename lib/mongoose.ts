import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Global variable to hold the cached connection in development mode
let cached = (global as any).mongoose;

// This ensures that the connection is persistent and reused in the development environment
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  // If there's an existing connection, return it
  if (cached.conn) return cached.conn;

  // If there's no existing connection, create a new one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // bufferCommands: false,
      // useNewUrlParser: true,   // Use the latest URL parser
      // useUnifiedTopology: true, // Avoid deprecation warnings
    });
  }

  // Wait for the connection to be established and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
