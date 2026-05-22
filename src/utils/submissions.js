import CryptoJS from 'crypto-js';

const ENC_KEY = 'ukb!xK9mP#nQ2rL_enc_2024_$7vZ';

function encrypt(obj) {
  return CryptoJS.AES.encrypt(JSON.stringify(obj), ENC_KEY).toString();
}

function decrypt(str) {
  const bytes = CryptoJS.AES.decrypt(str, ENC_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function saveSubmission(category, data) {
  const existing = getSubmissions(category);
  existing.unshift({ ...data, _id: Date.now(), _at: new Date().toISOString() });
  try { localStorage.setItem('ukb_sub_' + category, encrypt(existing)); } catch {}
}

export function getSubmissions(category) {
  try {
    const raw = localStorage.getItem('ukb_sub_' + category);
    if (!raw) return [];
    return decrypt(raw) || [];
  } catch { return []; }
}

export function clearSubmissions(category) {
  try { localStorage.removeItem('ukb_sub_' + category); } catch {}
}
