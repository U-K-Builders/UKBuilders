import { useState, useEffect } from 'react';

export function useTextSize() {
  const [large, setLarge] = useState(() => {
    try { return localStorage.getItem('ukb-textsize') === 'large'; } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('text-large', large);
    try { localStorage.setItem('ukb-textsize', large ? 'large' : 'normal'); } catch {}
  }, [large]);

  return [large, () => setLarge((v) => !v)];
}
