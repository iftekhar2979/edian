
import bcrypt from 'bcryptjs';
import User from './models/users.model';
import dbConnect from './mongoose';

const seedAdminUser = async () => {
  await dbConnect();

  const existingAdmin = await User.findOne({ email: 'admin@shenjidan.com' });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  // Create a new admin user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt); 

  const adminUser = new User({
    name: 'Admin',
    email: 'admin@shenjidan.com',
    password: hashedPassword,
    role: 'admin',
    image: '',  // You can add a default image URL or leave it blank
  });
console.log(adminUser)
  await adminUser.save();
  console.log('Admin user seeded successfully.');
};

seedAdminUser().catch((error) => {
  console.error('Error seeding admin user:', error);
});
