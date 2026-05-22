export function saveSubmission(category, data) {
  const key = 'ukb_sub_' + category;
  const existing = getSubmissions(category);
  existing.unshift({ ...data, _id: Date.now(), _at: new Date().toISOString() });
  try { localStorage.setItem(key, JSON.stringify(existing)); } catch {}
}

export function getSubmissions(category) {
  try { return JSON.parse(localStorage.getItem('ukb_sub_' + category) || '[]'); } catch { return []; }
}

export function clearSubmissions(category) {
  try { localStorage.removeItem('ukb_sub_' + category); } catch {}
}
