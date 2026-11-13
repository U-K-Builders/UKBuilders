// Dark/light mode switch (follows the phone's setting until the visitor
// chooses). Used by Header and AccessibilityPanel.
import { useState, useEffect } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('ukb-theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('ukb-theme', dark ? 'dark' : 'light'); } catch { /* storage blocked: the choice just won't persist */ }
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}
