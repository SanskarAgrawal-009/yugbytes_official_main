import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import path from 'path';
import Portfolio from '../models/Portfolio.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all portfolio projects, with optional category filter
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.showOnHomepage !== undefined) {
      filter.showOnHomepage = req.query.showOnHomepage === 'true';
    }
    const projects = await Portfolio.find(filter).sort({ createdAt: -1 });

    // Convert image buffer to base64 string for each project
    const projectsWithImages = projects.map(project => {
      const projectObj = project.toObject();
      if (project.image && project.image.data) {
        projectObj.imageUrl = `data:${project.image.contentType};base64,${project.image.data.toString('base64')}`;
      } else {
        projectObj.imageUrl = null;
      }
      return projectObj;
    });

    res.json({ success: true, data: projectsWithImages });
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

    const tagsArray = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : [];

    const project = new Portfolio({
      title,
      category,
      client,
      description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
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
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
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
