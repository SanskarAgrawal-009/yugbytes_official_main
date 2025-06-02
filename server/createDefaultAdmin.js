import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createDefaultAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Default admin user already exists.');
      process.exit(0);
    }

    const admin = new User({
      email: 'admin@example.com',
      password: 'Admin@1234', // Default password
      role: 'admin',
    });

    await admin.save();
    console.log('Default admin user created with email: admin@example.com and password: Admin@1234');
    process.exit(0);
  } catch (error) {
    console.error('Error creating default admin user:', error);
    process.exit(1);
  }
};

createDefaultAdmin();
