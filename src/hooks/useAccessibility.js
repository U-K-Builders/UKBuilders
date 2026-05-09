import { useState, useEffect } from 'react';

const COLOR_CLASSES = ['', 'acc-deuteranopia', 'acc-protanopia', 'acc-tritanopia', 'acc-greyscale'];

function load() {
  try {
    return { colorMode: parseInt(localStorage.getItem('ukb-colormode') || '0', 10) };
  } catch { return { colorMode: 0 }; }
}

function applyClasses(colorMode) {
  const html = document.documentElement;
  COLOR_CLASSES.forEach(c => c && html.classList.remove(c));
  if (COLOR_CLASSES[colorMode]) html.classList.add(COLOR_CLASSES[colorMode]);
}

export function useAccessibility() {
  const [state, setState] = useState(load);

  useEffect(() => {
    applyClasses(state.colorMode);
    try {
      localStorage.setItem('ukb-colormode', String(state.colorMode));
    } catch {}
  }, [state]);

  const setColorMode = (v) => setState(s => ({ ...s, colorMode: v }));

  return { ...state, setColorMode };
}
