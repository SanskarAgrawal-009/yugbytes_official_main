import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import path from 'path';
import Portfolio from '../models/Portfolio.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  })
});

// Get all portfolio projects, with optional category filter
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const projects = await Portfolio.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching portfolio projects' });
  }
});

// Add new project (admin only)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, category, client, description, tags, externalLink, showOnHomepage } = req.body;
    const image = req.file ? req.file.location : null;

    if (!title || !category || !client || !description || !image) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const tagsArray = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : [];

    const project = new Portfolio({
      title,
      category,
      client,
      description,
      image,
      tags: tagsArray,
      externalLink,
      showOnHomepage: showOnHomepage === 'true' || showOnHomepage === true,
    });

    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ success: false, message: 'Error adding project' });
  }
});

// Update project (admin only)
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, client, description, tags, externalLink, showOnHomepage } = req.body;
    const updateData = {
      title,
      category,
      client,
      description,
      externalLink,
      showOnHomepage: showOnHomepage === 'true' || showOnHomepage === true,
    };

    if (tags) {
      updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    }

    if (req.file) {
      updateData.image = req.file.location;
    }

    const updatedProject = await Portfolio.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, message: 'Error updating project' });
  }
});

// Delete project (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Portfolio.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, message: 'Error deleting project' });
  }
});

export default router;
