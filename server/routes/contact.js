import express from 'express';
import Contact from '../models/Contact.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving contact form' });
  }
});

// Get all contacts (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
});

export default router;