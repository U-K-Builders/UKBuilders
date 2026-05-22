const KEYS = {
  buyers:      'ukb_sub_buyers',
  society:     'ukb_sub_society',
  contractors: 'ukb_sub_contractors',
  careers:     'ukb_sub_careers',
  investors:   'ukb_sub_investors',
};

export function saveSubmission(category, data) {
  const existing = getSubmissions(category);
  existing.unshift({ ...data, _id: Date.now(), _at: new Date().toISOString() });
  try { localStorage.setItem(KEYS[category], JSON.stringify(existing)); } catch {}
}

export function getSubmissions(category) {
  try { return JSON.parse(localStorage.getItem(KEYS[category]) || '[]'); } catch { return []; }
}

export function clearSubmissions(category) {
  try { localStorage.removeItem(KEYS[category]); } catch {}
}
