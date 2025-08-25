// /app/api/seed/route.ts
import usersModel from '@/lib/models/users.model';
import dbConnect from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export async function GET() {
  // console.log("Request received to seed admin user",req);
  try {
    await dbConnect(); // Connect to the database

    // Check if the admin already exists
    const existingAdmin = await usersModel.findOne({ email: 'admin@shenjidan.com' });
    if (existingAdmin) {
      return new Response(
        JSON.stringify({ message: 'Admin user already exists.' }),
        { status: 200 }
      );
    }

    // If the admin doesn't exist, create a new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('shenjidan123', salt);

    const adminUser = new usersModel({
      name: 'Admin',
      email: 'admin@shenjidan.com',
      password: hashedPassword,
      role: 'admin',
      image: '',
    });
    await adminUser.save();

    return new Response(
      JSON.stringify({ message: 'Admin user seeded successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Error seeding admin user', error }),
      { status: 500 }
    );
  }
}
