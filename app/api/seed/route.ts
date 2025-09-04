// /app/api/seed/route.ts
import usersModel from '@/lib/models/users.model';
import dbConnect from '@/lib/mongoose';
export async function GET() {
  // console.log("Request received to seed admin user",req);
  try {
    await dbConnect(); // Connect to the database
const adminEmail ='admin@shenjidan.com'
const adminPassword ='admin123' 
    // Check if the admin already exists
    const existingAdmin = await usersModel.findOne({ email:adminEmail });
    if (existingAdmin) {
      return new Response(
        JSON.stringify({ message: 'Admin user already exists.' }),
        { status: 200 }
      );
    }

    const adminUser = new usersModel({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
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
