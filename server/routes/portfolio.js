import express from 'express';
import Portfolio from '../models/Portfolio.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching portfolio items' });
  }
});

// Add new portfolio item (admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating portfolio item' });
  }
});

// Update portfolio item (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating portfolio item' });
  }
});

// Delete portfolio item (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting portfolio item' });
  }
});

export default router;