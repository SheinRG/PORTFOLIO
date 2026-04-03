import express from 'express';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ chapterNumber: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message saved!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
