import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div
      className="relative py-40 px-5 text-center text-white bg-fixed bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(160deg, rgba(5,14,26,0.82) 0%, rgba(10,24,40,0.68) 50%, rgba(60,36,8,0.72) 100%), url('/images/Building/La Serena.jpg')`,
      }}
    >
      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Overline */}
      <p className="text-gold text-[11px] tracking-[6px] uppercase mb-6 font-light">
        Est. 1969 · Orlem, Malad West, Mumbai
      </p>

      <h1 className="font-serif text-[52px] md:text-[72px] font-normal leading-[1.08] mb-6 tracking-[-0.5px]">
        Crafting Legacy<br />
        <span className="italic text-gold">Residences</span>
      </h1>

      <div className="w-16 h-[2px] bg-gold mx-auto mb-8" />

      <p className="text-[16px] md:text-[18px] text-white/70 max-w-[600px] mx-auto mb-12 font-light leading-relaxed tracking-wide">
        Over five decades of trust, precision, and community — delivered one home at a time in the heart of Mumbai.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to="/projects/ongoing"
          className="inline-block bg-gold text-white px-12 py-4 no-underline text-[11px] tracking-[3px] uppercase border-2 border-gold transition-all duration-300 hover:bg-transparent hover:text-gold font-light"
        >
          View Ongoing Projects
        </Link>
        <Link
          to="/our-story"
          className="inline-block bg-transparent text-white/80 px-12 py-4 no-underline text-[11px] tracking-[3px] uppercase border-2 border-white/30 transition-all duration-300 hover:border-gold hover:text-gold font-light"
        >
          Our Story
        </Link>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-light to-transparent pointer-events-none" />
    </div>
  );
}
