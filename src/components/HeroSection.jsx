// Home page hero: Justin photo, headline, main buttons and the 55+ / 50+ /
// 3,000+ facts strip. Used by HomePage.
import { Link } from 'react-router-dom';

const HERO_IMAGE = '/images/buildings/justin-night-view.jpg';

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="on-dark relative bg-navy text-white overflow-hidden lg:grid lg:grid-cols-[1.05fr_1fr] lg:min-h-[calc(100svh-76px)]"
    >
      {/* Photo: full-bleed behind the copy on mobile, right-hand column on desktop */}
      <div className="absolute inset-0 lg:relative lg:order-2 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Justin, U.K. Builders' signature residential tower in Orlem, Malad West, lit at night"
          width="1379"
          height="2000"
          fetchPriority="high"
          decoding="async"
          className="hero-drift absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        {/* Mobile: darken for legibility. Desktop: soft seam into the navy panel */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/95 lg:bg-gradient-to-r lg:from-navy lg:via-navy/10 lg:to-transparent" />
      </div>

      {/* Copy */}
      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:pl-16 xl:pl-24 3xl:pl-[8vw] lg:pr-10 py-16 sm:py-20 [@media(max-height:500px)]:py-6 min-h-[calc(100svh-68px)] lg:min-h-0 lg:order-1">
        <p className="hero-item text-xs 3xl:text-sm tracking-[0.35em] uppercase text-gold mb-6 [@media(max-height:500px)]:mb-3" style={{ animationDelay: '0.05s' }}>
          Mumbai · Since 1969
        </p>

        <h1
          id="hero-heading"
          className="hero-item font-serif font-normal text-[2.5rem] leading-[1.08] sm:text-6xl xl:text-7xl 3xl:text-8xl 4xl:text-[8rem] [@media(max-height:500px)]:text-4xl tracking-[0.02em] mb-6 [@media(max-height:500px)]:mb-3 max-w-[11ch] [@media(max-height:500px)]:max-w-none"
          style={{ animationDelay: '0.15s' }}
        >
          Crafting Legacy Residences
        </h1>

        <p className="hero-item text-lg 3xl:text-xl 4xl:text-2xl text-white/80 max-w-[34ch] leading-relaxed mb-10 [@media(max-height:500px)]:mb-5 [@media(max-height:500px)]:text-base [@media(max-height:500px)]:max-w-[60ch]" style={{ animationDelay: '0.3s' }}>
          Five decades of homes built to last across Orlem and Malad West. Now presenting Justin and Christina.
        </p>

        <div className="hero-item flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 [@media(max-height:500px)]:flex-row [@media(max-height:500px)]:items-center" style={{ animationDelay: '0.45s' }}>
          <Link
            to="/projects/ongoing"
            className="inline-flex items-center justify-center min-h-[52px] bg-gold text-navy px-9 text-sm font-semibold tracking-[0.18em] uppercase no-underline border border-gold transition-colors duration-200 hover:bg-gold-dark hover:border-gold-dark"
          >
            Explore Current Projects
          </Link>
          <Link
            to="/book-a-call"
            className="group inline-flex items-center justify-center sm:justify-start gap-2 min-h-[44px] text-sm tracking-[0.18em] uppercase text-white/90 no-underline transition-colors duration-200 hover:text-gold"
          >
            Book a site visit
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Proof strip */}
        <dl className="hero-item grid grid-cols-3 gap-4 mt-16 pt-8 [@media(max-height:500px)]:hidden border-t border-white/15 max-w-[480px] 4xl:max-w-[640px]" style={{ animationDelay: '0.6s' }}>
          {[
            ['55+', 'Years'],
            ['50+', 'Projects'],
            ['3,000+', 'Families'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="m-0">
                <span className="block font-serif text-2xl sm:text-3xl 4xl:text-4xl text-gold leading-none">{value}</span>
                <span className="block text-xs tracking-[0.2em] uppercase text-white/70 mt-2" aria-hidden="true">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
