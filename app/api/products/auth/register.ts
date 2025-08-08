import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import usersModel from '@/lib/models/users.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { name, email, password } = req.body;
  try {
    const exists = await usersModel.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already in use' });

    const user = new usersModel({ name, email, password });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
