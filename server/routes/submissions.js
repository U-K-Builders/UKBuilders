import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = Router();

const VALID_CATEGORIES = new Set([
  'buyers', 'enquiries', 'site_visits', 'video_calls', 'waitlist',
  'milestone_subs', 'society', 'investors', 'contractors', 'careers', 'downloads',
]);

const sanitize = [body('*').trim()];

function requireAdmin(req, res, next) {
  const token = req.cookies?.ukb_token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.clearCookie('ukb_token', { path: '/' });
    res.status(401).json({ error: 'Session expired' });
  }
}

function validCategory(req, res, next) {
  if (!VALID_CATEGORIES.has(req.params.category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  next();
}

// POST /api/submissions/:category  — save a form submission
router.post('/:category', validCategory, sanitize, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const payload = JSON.stringify(req.body);
  if (payload.length > 8000) return res.status(413).json({ error: 'Payload too large' });

  try {
    db.prepare('INSERT INTO submissions (category, data) VALUES (?, ?)').run(req.params.category, payload);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Save failed' });
  }
});

// GET /api/submissions/:category  — list all entries (admin only)
router.get('/:category', requireAdmin, validCategory, (req, res) => {
  const rows = db
    .prepare('SELECT id, data, created_at FROM submissions WHERE category = ? ORDER BY created_at DESC')
    .all(req.params.category);
  const result = rows.map(r => ({ ...JSON.parse(r.data), _id: r.id, _at: r.created_at }));
  res.json(result);
});

// DELETE /api/submissions/:category  — clear a category (admin only)
router.delete('/:category', requireAdmin, validCategory, (req, res) => {
  db.prepare('DELETE FROM submissions WHERE category = ?').run(req.params.category);
  res.json({ ok: true });
});

export default router;
