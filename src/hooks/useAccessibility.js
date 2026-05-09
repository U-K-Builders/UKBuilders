import { useState, useEffect } from 'react';

const SIZE_CLASSES  = ['', 'acc-text-lg', 'acc-text-xl'];
const COLOR_CLASSES = ['', 'acc-deuteranopia', 'acc-protanopia', 'acc-tritanopia', 'acc-greyscale'];

function load() {
  try {
    return {
      textSize:  parseInt(localStorage.getItem('ukb-textsize')  || '0', 10),
      colorMode: parseInt(localStorage.getItem('ukb-colormode') || '0', 10),
    };
  } catch { return { textSize: 0, colorMode: 0 }; }
}

function applyClasses(textSize, colorMode) {
  const html = document.documentElement;
  SIZE_CLASSES.forEach(c => c && html.classList.remove(c));
  COLOR_CLASSES.forEach(c => c && html.classList.remove(c));
  if (SIZE_CLASSES[textSize])  html.classList.add(SIZE_CLASSES[textSize]);
  if (COLOR_CLASSES[colorMode]) html.classList.add(COLOR_CLASSES[colorMode]);
}

export function useAccessibility() {
  const [state, setState] = useState(load);

  useEffect(() => {
    applyClasses(state.textSize, state.colorMode);
    try {
      localStorage.setItem('ukb-textsize',  String(state.textSize));
      localStorage.setItem('ukb-colormode', String(state.colorMode));
    } catch {}
  }, [state]);

  const setTextSize  = (v) => setState(s => ({ ...s, textSize:  Math.max(0, Math.min(2, v)) }));
  const setColorMode = (v) => setState(s => ({ ...s, colorMode: v }));

  return { ...state, setTextSize, setColorMode };
}
