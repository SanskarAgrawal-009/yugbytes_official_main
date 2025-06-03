import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import Portfolio from '../models/Portfolio.js';
import { verifyToken } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadToS3(buffer, filename, mimetype) {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'public-read',
    },
  });

  await upload.done();
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
}

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

    if (!title || !category || !client || !description || !req.file) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const uniqueSuffix = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname);
    const imageUrl = await uploadToS3(req.file.buffer, uniqueSuffix, req.file.mimetype);

    const tagsArray = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : [];

    const project = new Portfolio({
      title,
      category,
      client,
      description,
      image: imageUrl,
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
      const uniqueSuffix = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname);
      const imageUrl = await uploadToS3(req.file.buffer, uniqueSuffix, req.file.mimetype);
      updateData.image = imageUrl;
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
