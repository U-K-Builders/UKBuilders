import { useState, useRef, useCallback, useEffect } from 'react';

export default function BeforeAfterSlider({ before, after, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => { if (dragging.current) updatePosition(e.clientX); };
    const onMouseUp   = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [updatePosition]);

  const onTouchMove = useCallback((e) => updatePosition(e.touches[0].clientX), [updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none cursor-ew-resize w-full h-full"
      onMouseDown={() => { dragging.current = true; }}
      onTouchMove={onTouchMove}
    >
      {/* After image (base layer, full width) */}
      <img src={after.src} alt={after.alt || afterLabel} className="w-full h-full object-cover block" draggable="false" />

      {/* Before image (clipped to left of handle) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={before.src} alt={before.alt || beforeLabel}
          className="absolute inset-0 h-full object-cover block"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          draggable="false"
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
        {/* Handle circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-2 border-gold flex items-center justify-center shadow-xl pointer-events-auto cursor-ew-resize">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-navy" aria-hidden="true">
            <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span
        className="absolute top-3 left-3 bg-navy/75 text-white text-[0.625rem] uppercase tracking-[2px] px-2 py-1 transition-opacity duration-200 pointer-events-none"
        style={{ opacity: position > 12 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute top-3 right-3 bg-navy/75 text-white text-[0.625rem] uppercase tracking-[2px] px-2 py-1 transition-opacity duration-200 pointer-events-none"
        style={{ opacity: position < 88 ? 1 : 0 }}
      >
        {afterLabel}
      </span>
    </div>
  );
}
