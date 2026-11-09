import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * 3D ring carousel: cards sit on a rotating cylinder. The front card faces
 * the viewer; its neighbours turn away at a steep angle; the rest are hidden.
 *
 *   <Carousel3D items={projects} label="Legacy projects"
 *               getKey={(p) => p.name} renderItem={(p) => <Card … />} />
 *
 * Accessibility: arrow keys, swipe, prev/next and dot buttons, a pause
 * button for the autoplay (WCAG 2.2.2), autoplay off for reduced motion,
 * and only the front card is exposed to screen readers.
 */

const mod = (n, m) => ((n % m) + m) % m;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export default function Carousel3D({ items, renderItem, getKey, getLabel, label, interval = 4500, maxCardWidth = 320, cardRatio = 1.25 }) {
  const total = items.length;
  const [step, setStep] = useState(0);            // unbounded, so the ring never spins backwards to wrap
  const [cardWidth, setCardWidth] = useState(maxCardWidth);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [announce, setAnnounce] = useState(false);
  const rootRef = useRef(null);
  const dragX = useRef(null);

  const active = mod(step, total);
  const angle = 360 / total;
  // Distance from the centre of the ring to each card, with a little spacing.
  const radius = Math.round((cardWidth / 2 / Math.tan(Math.PI / total)) * 1.18);

  // Fit the card size to the available width.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setCardWidth(Math.round(Math.min(maxCardWidth, Math.max(200, w * 0.58))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxCardWidth]);

  // Only animate while the carousel is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((delta, byUser = true) => {
    if (byUser) setAnnounce(true);
    setStep((s) => s + delta);
  }, []);

  // Autoplay: pauses on hover, keyboard focus, off-screen, or the pause button.
  useEffect(() => {
    if (!playing || hovered || focused || !onScreen || total < 2) return undefined;
    const id = setInterval(() => {
      if (!document.hidden) go(1, false);
    }, interval);
    return () => clearInterval(id);
  }, [playing, hovered, focused, onScreen, interval, go, total]);

  const goTo = (index) => {
    let delta = mod(index - active, total);
    if (delta > total / 2) delta -= total;
    go(delta);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  };

  const onPointerDown = (e) => { dragX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  if (total === 0) return null;

  const cardHeight = Math.round(cardWidth * cardRatio);
  const btn =
    'w-11 h-11 flex items-center justify-center border border-white/25 text-white/80 hover:border-gold hover:text-gold transition-colors duration-200 cursor-pointer bg-transparent';

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={label}
      className="relative select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
    >
      {/* Stage */}
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { dragX.current = null; }}
        className="relative mx-auto outline-none focus-visible:ring-2 focus-visible:ring-gold/70 touch-pan-y"
        style={{ height: cardHeight + 60, perspective: `${Math.round(cardWidth * 3.4)}px` }}
        aria-label={`${label}. Use the left and right arrow keys to browse.`}
      >
        {/* Soft floor glow */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 bottom-0 -translate-x-1/2 h-16 rounded-[50%] bg-gold/10 blur-2xl"
          style={{ width: cardWidth * 2.2 }}
        />
        <div
          className="absolute left-1/2 top-5 motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(.22,.8,.2,1)]"
          style={{
            width: cardWidth,
            height: cardHeight,
            marginLeft: -cardWidth / 2,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${-radius}px) rotateY(${-step * angle}deg)`,
          }}
        >
          {items.map((item, i) => {
            let d = mod(i - active, total);
            if (d > total / 2) d -= total;
            const isActive = d === 0;
            const visible = Math.abs(d) <= 1;
            return (
              <div
                key={getKey ? getKey(item) : i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${getLabel ? `${getLabel(item)}, ` : ''}${i + 1} of ${total}`}
                aria-hidden={!isActive}
                inert={!isActive}
                onClick={!isActive && visible ? () => go(d) : undefined}
                className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-700 ${
                  !isActive && visible ? 'cursor-pointer' : ''
                }`}
                style={{
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  opacity: visible ? 1 : 0,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
              >
                <div
                  className="h-full motion-safe:transition-[filter] motion-safe:duration-700"
                  style={{ filter: isActive ? 'none' : 'brightness(0.55)' }}
                >
                  {renderItem(item, isActive)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Announces the new card after a user action (not during autoplay). */}
      <p className="sr-only" aria-live="polite">
        {announce ? `${getLabel ? getLabel(items[active]) : ''}, ${active + 1} of ${total}` : ''}
      </p>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button type="button" className={btn} onClick={() => go(-1)} aria-label="Previous project">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="flex items-center">
          {items.map((item, i) => (
            <button
              key={getKey ? getKey(item) : i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show project ${i + 1} of ${total}`}
              aria-current={i === active ? 'true' : undefined}
              className="w-8 h-11 flex items-center justify-center bg-transparent border-0 cursor-pointer"
            >
              <span className={`block h-[3px] transition-all duration-300 ${i === active ? 'w-6 bg-gold' : 'w-3 bg-white/35'}`} />
            </button>
          ))}
        </div>
        <button type="button" className={btn} onClick={() => go(1)} aria-label="Next project">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <button
          type="button"
          className={`${btn} ml-2`}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause automatic rotation' : 'Start automatic rotation'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
      </div>
    </section>
  );
}
