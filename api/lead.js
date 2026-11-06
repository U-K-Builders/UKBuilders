// POST /api/lead — the only backend of the public website.
//
// Validates a form submission, filters spam, stores it in Supabase
// (public.leads) and optionally emails an alert.
//
// Required environment variables (Vercel → Project → Settings → Environment
// Variables; never prefix them with VITE_, or they would ship to browsers):
//   SUPABASE_URL          https://<ref>.supabase.co
//   SUPABASE_SECRET_KEY   Supabase secret key (sb_secret_…) — mark "Sensitive"
// Optional:
//   LEAD_IP_SALT          salt for hashing visitor IPs (defaults to the secret key)
//   ALLOWED_ORIGINS       extra allowed origins, comma separated (e.g. https://ukbuilders.in)
//   RESEND_API_KEY        enables email alerts via resend.com
//   LEAD_ALERT_EMAIL      where alerts go (comma separated)
//   LEAD_ALERT_FROM       verified sender, e.g. "U.K. Builders <leads@ukbuilders.in>"

import { createHash } from 'node:crypto';

const CATEGORIES = new Set([
  'contact', 'enquiry', 'waitlist', 'site_visit', 'milestone_updates', 'video_call',
  'investor', 'contractor', 'career', 'guide_download', 'redevelopment',
]);

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 2500;            // humans take longer than this to fill a form
const PER_IP_LIMIT = 5;              // submissions per IP …
const PER_IP_WINDOW_MIN = 10;        // … per 10 minutes
const GLOBAL_LIMIT_PER_HOUR = 300;   // circuit breaker against floods

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

// Which incoming field names fill the main columns.
const COLUMN_SOURCES = {
  name: ['name', 'contact', 'contactPerson', 'fullName'],
  phone: ['phone', 'whatsapp', 'mobile'],
  email: ['email'],
  project: ['project', 'projectName'],
  message: ['message', 'notes', 'note', 'coverNote', 'questions'],
};

function clean(value, max) {
  if (value === undefined || value === null) return null;
  // eslint-disable-next-line no-control-regex -- strip control characters
  const text = String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  return text ? text.slice(0, max) : null;
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin form posts from some browsers omit it
  let host;
  try { host = new URL(origin).host; } catch { return false; }
  if (host === req.headers.host) return true;
  if (host === 'localhost:5173' || host === 'localhost:4173') return process.env.VERCEL_ENV !== 'production';
  const extra = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return extra.some((o) => { try { return new URL(o).host === host; } catch { return false; } });
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error('too large'), { status: 413 });
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

function supabaseHeaders(key, extra = {}) {
  const headers = { apikey: key, 'Content-Type': 'application/json', ...extra };
  if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`; // legacy service_role JWT
  return headers;
}

async function countSince(url, key, filter, minutes) {
  const since = new Date(Date.now() - minutes * 60_000).toISOString();
  const q = `${url}/rest/v1/leads?select=id&created_at=gte.${encodeURIComponent(since)}${filter}`;
  const r = await fetch(q, { method: 'HEAD', headers: supabaseHeaders(key, { Prefer: 'count=exact' }) });
  if (!r.ok) throw new Error(`count failed ${r.status}`);
  const range = r.headers.get('content-range') || '*/0';
  return Number(range.split('/')[1]) || 0;
}

async function sendAlert(lead) {
  const { RESEND_API_KEY, LEAD_ALERT_EMAIL, LEAD_ALERT_FROM } = process.env;
  if (!RESEND_API_KEY || !LEAD_ALERT_EMAIL || !LEAD_ALERT_FROM) return;
  const lines = [
    `New ${lead.category.replace('_', ' ')} lead`,
    '',
    `Name: ${lead.name || '-'}`,
    `Phone: ${lead.phone || '-'}`,
    `Email: ${lead.email || '-'}`,
    `Project: ${lead.project || '-'}`,
    `Message: ${lead.message || '-'}`,
    '',
    ...Object.entries(lead.details).map(([k, v]) => `${k}: ${v}`),
    '',
    `Page: ${lead.page || '-'}`,
  ];
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: LEAD_ALERT_FROM,
        to: LEAD_ALERT_EMAIL.split(',').map((s) => s.trim()),
        subject: `Website lead: ${lead.category.replace('_', ' ')}${lead.project ? ` – ${lead.project}` : ''}`,
        text: lines.join('\n'),
      }),
    });
    if (!r.ok) console.error('lead: alert email failed', r.status, (await r.text()).slice(0, 300));
  } catch (err) {
    // An alert failure must not lose the lead; it is already stored.
    console.error('lead: alert email error', err);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, error: 'Method not allowed.' });
  }
  if (!originAllowed(req)) return send(res, 403, { ok: false, error: 'Forbidden.' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error('lead: SUPABASE_URL / SUPABASE_SECRET_KEY not configured');
    return send(res, 503, { ok: false, error: 'Enquiries are temporarily unavailable. Please call or WhatsApp us.' });
  }

  let body;
  try {
    body = await readJson(req);
  } catch (err) {
    return send(res, err.status || 400, { ok: false, error: 'Invalid request.' });
  }

  const category = clean(body.category, 40);
  if (!category || !CATEGORIES.has(category)) return send(res, 400, { ok: false, error: 'Invalid form.' });

  // Spam traps: a hidden field humans never fill, and a minimum fill time.
  // Bots get a fake success so they don't adapt.
  const startedAt = Number(body.startedAt);
  if (clean(body.website, 200) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return send(res, 200, { ok: true });
  }

  const fields = body.fields && typeof body.fields === 'object' && !Array.isArray(body.fields) ? body.fields : {};
  const used = new Set();
  const pick = (column, max) => {
    for (const name of COLUMN_SOURCES[column]) {
      if (fields[name] !== undefined && clean(fields[name], max)) { used.add(name); return clean(fields[name], max); }
    }
    return null;
  };

  const lead = {
    category,
    name: pick('name', 120),
    phone: pick('phone', 25),
    email: pick('email', 200),
    project: pick('project', 120),
    message: pick('message', 4000),
    details: {},
    page: clean(body.page, 300),
  };

  for (const [k, v] of Object.entries(fields).slice(0, 30)) {
    if (used.has(k) || !/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/.test(k)) continue;
    const value = clean(typeof v === 'object' ? JSON.stringify(v) : v, 1000);
    if (value) lead.details[k] = value;
  }

  if (!lead.phone && !lead.email) return send(res, 400, { ok: false, error: 'Please give a phone number or email.' });
  if (lead.email && !EMAIL_RE.test(lead.email)) return send(res, 400, { ok: false, error: 'Please enter a valid email.' });
  if (lead.phone && !PHONE_RE.test(lead.phone)) return send(res, 400, { ok: false, error: 'Please enter a valid phone number.' });

  const ip = clean(req.headers['x-real-ip'] || String(req.headers['x-forwarded-for'] || '').split(',')[0], 64) || 'unknown';
  const salt = process.env.LEAD_IP_SALT || key;
  const ipHash = createHash('sha256').update(`${salt}:${ip}`).digest('hex');

  try {
    const [recentFromIp, lastHour] = await Promise.all([
      countSince(url, key, `&ip_hash=eq.${ipHash}`, PER_IP_WINDOW_MIN),
      countSince(url, key, '', 60),
    ]);
    if (recentFromIp >= PER_IP_LIMIT || lastHour >= GLOBAL_LIMIT_PER_HOUR) {
      return send(res, 429, { ok: false, error: 'Too many submissions. Please try again later, or call us.' });
    }

    const insert = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: supabaseHeaders(key, { Prefer: 'return=minimal' }),
      body: JSON.stringify({ ...lead, ip_hash: ipHash, user_agent: clean(req.headers['user-agent'], 400) }),
    });
    if (!insert.ok) {
      console.error('lead: insert failed', insert.status, await insert.text());
      return send(res, 502, { ok: false, error: 'Sorry, something went wrong. Please call or WhatsApp us.' });
    }
  } catch (err) {
    console.error('lead: storage error', err);
    return send(res, 502, { ok: false, error: 'Sorry, something went wrong. Please call or WhatsApp us.' });
  }

  await sendAlert(lead);
  return send(res, 200, { ok: true });
}
