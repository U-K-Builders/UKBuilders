import { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { useTheme } from '../hooks/useTheme';

const COLOR_MODES = [
  { label: 'Normal',       desc: 'Default colours'        },
  { label: 'Deuteranopia', desc: 'Red-green (green weak)' },
  { label: 'Protanopia',   desc: 'Red-green (red weak)'   },
  { label: 'Tritanopia',   desc: 'Blue-yellow'            },
  { label: 'Greyscale',    desc: 'No colour'              },
];

function AccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <circle cx="12" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 9h14M12 9v11M8 20l4-6 4 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const { colorMode, setColorMode } = useAccessibility();
  const [dark, toggleDark] = useTheme();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* SVG colour-blindness filter definitions */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="acc-deuteranopia">
            <feColorMatrix type="matrix" values="0.625 0.375 0     0 0  0.7   0.3   0     0 0  0     0.3   0.7   0 0  0     0     0     1 0" />
          </filter>
          <filter id="acc-protanopia">
            <feColorMatrix type="matrix" values="0.567 0.433 0     0 0  0.558 0.442 0     0 0  0     0.242 0.758 0 0  0     0     0     1 0" />
          </filter>
          <filter id="acc-tritanopia">
            <feColorMatrix type="matrix" values="0.95  0.05  0     0 0  0     0.433 0.567 0 0  0     0.475 0.525 0 0  0     0     0     1 0" />
          </filter>
        </defs>
      </svg>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(o => !o)}
          className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 bg-transparent border-none cursor-pointer shrink-0 ${open ? 'text-gold' : 'text-white/60 hover:text-gold'}`}
          aria-label="Accessibility options"
          title="Accessibility options"
        >
          <AccessibilityIcon />
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-navy border border-gold/30 shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-[60]">
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-[0.625rem] tracking-[2.5px] uppercase text-gold m-0">Accessibility</p>
            </div>

            {/* Dark mode */}
            <div className="px-4 py-4 border-b border-white/10">
              <p className="text-[0.625rem] tracking-[2px] uppercase text-white/50 mb-3">Display</p>
              <button
                onClick={toggleDark}
                className="w-full flex items-center justify-between px-3 py-2.5 border border-white/10 hover:border-gold/50 hover:text-white text-white/60 transition-all duration-200 bg-transparent cursor-pointer"
              >
                <span className="text-[0.75rem] tracking-[0.5px]">{dark ? 'Light Mode' : 'Dark Mode'}</span>
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>

            {/* Colour vision */}
            <div className="px-4 py-4">
              <p className="text-[0.625rem] tracking-[2px] uppercase text-white/50 mb-3">Colour Vision</p>
              <div className="flex flex-col gap-1.5">
                {COLOR_MODES.map((mode, i) => (
                  <button
                    key={i}
                    onClick={() => setColorMode(i)}
                    className={`w-full text-left px-3 py-2.5 border transition-all duration-200 bg-transparent cursor-pointer ${
                      colorMode === i
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 text-white/60 hover:border-gold/50 hover:text-white'
                    }`}
                  >
                    <span className="block text-[0.75rem] tracking-[0.5px]">{mode.label}</span>
                    <span className="block text-[0.625rem] opacity-60 mt-0.5">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
