import { Request, Response } from 'express';
import connectDB from '../lib/db';
import Contact from '../models/Contact';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const contact = await Contact.create(req.body);
    
    return res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ success: false, message: 'Error saving contact form' });
  }
}