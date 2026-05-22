import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_HASH = process.env.ADMIN_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_HASH || !JWT_SECRET) {
  throw new Error('ADMIN_HASH and JWT_SECRET must be set in environment variables');
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 8 * 60 * 60 * 1000, // 8 hours
  path: '/',
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  const userMatch = username === ADMIN_USER;
  const passMatch = userMatch && await bcrypt.compare(String(password), ADMIN_HASH);

  if (!userMatch || !passMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  res.cookie('ukb_token', token, cookieOptions);
  res.json({ ok: true });
});

router.post('/logout', (_req, res) => {
  res.clearCookie('ukb_token', { path: '/' });
  res.json({ ok: true });
});

router.get('/verify', (req, res) => {
  const token = req.cookies?.ukb_token;
  if (!token) return res.json({ isAdmin: false });
  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ isAdmin: true });
  } catch {
    res.clearCookie('ukb_token', { path: '/' });
    res.json({ isAdmin: false });
  }
});

export default router;
