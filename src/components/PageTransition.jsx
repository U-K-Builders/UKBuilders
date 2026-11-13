// Brief navy fade over the page on every route change. Rendered once in
// App.jsx.
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const location = useLocation();
  const overlayRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.opacity = '1';
    void el.offsetHeight;
    el.style.transition = 'opacity 0.45s ease';
    el.style.opacity = '0';
  }, [location.key]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-navy pointer-events-none"
      style={{ opacity: 0 }}
    />
  );
}
