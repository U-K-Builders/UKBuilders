import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          el.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.3}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative px-5 text-center text-white bg-cover bg-center overflow-hidden hero-ken-burns"
      style={{
        backgroundImage: `linear-gradient(rgba(10,24,40,0.48), rgba(10,24,40,0.78)), url('/images/Building/La Serena.jpg')`,
      }}
    >
      {/* Main content */}
      <div className="relative z-10 max-w-[820px]">
        <p
          className="hero-item text-[0.5625rem] tracking-[5px] uppercase text-gold/80 mb-7"
          style={{ animationDelay: '0.1s' }}
        >
          Mumbai · Est. 1969
        </p>

        <h2
          className="hero-item text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] mb-7 font-serif font-normal leading-[1.1] tracking-[-0.5px]"
          style={{ animationDelay: '0.3s' }}
        >
          Crafting Legacy<br />Residences
        </h2>

        <p
          className="hero-item text-lg text-white/60 max-w-[520px] mx-auto mb-12 leading-relaxed"
          style={{ animationDelay: '0.55s' }}
        >
          Experience unparalleled luxury and architectural excellence in the heart of Mumbai.
        </p>

        <div
          className="hero-item flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animationDelay: '0.8s' }}
        >
          <Link
            to="/projects/ongoing"
            className="inline-block bg-gold text-white px-10 py-4 no-underline text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
          >
            View Ongoing Projects
          </Link>
          <Link
            to="/contact"
            className="inline-block bg-transparent text-white/80 px-10 py-4 no-underline text-sm tracking-[2px] uppercase border border-white/30 transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade into stats strip */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-navy-dark pointer-events-none z-10" />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 hero-item"
        style={{ animationDelay: '1.3s' }}
      >
        <span className="text-[0.5rem] tracking-[3px] uppercase text-white/35">Scroll</span>
        <div className="w-px h-10 overflow-hidden relative">
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"
            style={{ animation: 'scrollDrop 1.6s ease-in-out infinite' }}
          />
        </div>
      </div>
    </div>
  );
}
