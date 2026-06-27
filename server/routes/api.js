import express from 'express';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Message from '../models/Message.js';

const router = express.Router();

// Lightweight in-memory rate limiter (no external deps).
// Limits each IP to MAX_HITS message submissions per WINDOW_MS.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;
const hits = new Map(); // ip -> [timestamps]

const rateLimit = (req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(ts => now - ts < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }
  recent.push(now);
  hits.set(ip, recent);
  next();
};

// Periodically purge stale entries so the Map doesn't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of hits) {
    const recent = timestamps.filter(ts => now - ts < WINDOW_MS);
    if (recent.length) hits.set(ip, recent);
    else hits.delete(ip);
  }
}, WINDOW_MS).unref?.();

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

router.post('/messages', rateLimit, async (req, res) => {
  try {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return res.status(400).json({ error: 'One or more fields exceed the maximum length.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Only persist whitelisted fields to avoid mass-assignment of unexpected keys.
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message saved!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
