import { apiPost, apiGet, apiDelete } from './api.js';

export async function saveSubmission(category, data) {
  await apiPost('/api/submissions/' + category, data);
}

export async function getSubmissions(category) {
  try { return await apiGet('/api/submissions/' + category); } catch { return []; }
}

export async function clearSubmissions(category) {
  await apiDelete('/api/submissions/' + category);
}
