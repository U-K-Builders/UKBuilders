const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const apiGet    = (path)        => request(path);
export const apiPost   = (path, body)  => request(path, { method: 'POST',   body: JSON.stringify(body) });
export const apiDelete = (path)        => request(path, { method: 'DELETE' });
