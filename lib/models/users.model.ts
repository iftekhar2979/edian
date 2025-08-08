import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  image: string
}
enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type:String ,enum:UserRole , default: UserRole.USER },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

// Pre-save hook to hash passwords
UserSchema.pre('save', async function (next: any) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err as any);
  }
});

// Instance method to check passwords
UserSchema.methods.validatePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

// Prevent model overwrite during development
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
