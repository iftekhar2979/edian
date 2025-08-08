import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import usersModel from '@/lib/models/users.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { email, password } = req.body;
  try {
    const user = await usersModel.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });

    return res.status(200).json({ message: 'Login successful' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
