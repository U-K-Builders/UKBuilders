import { useInView } from '../hooks/useInView';

function slide(inView, delay = 0) {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  };
}

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
    title: 'Trusted Since 1969',
    desc: 'Over five decades of landmark residential projects delivered across Mumbai.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'RERA Compliant',
    desc: 'All projects fully registered and compliant with Maharashtra RERA regulations.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M2 20h20" />
        <path d="M5 20V8l7-6 7 6v12" />
        <path d="M9 20v-5h6v5" />
      </svg>
    ),
    title: 'Bespoke Architecture',
    desc: 'Every building crafted with meticulous attention to design, materials, and finish.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: '3,000+ Families',
    desc: 'Thousands of families call our residences home across prime Mumbai locations.',
  },
];

export default function TrustPillars() {
  const [ref, inView] = useInView(0.15);

  return (
    <div className="bg-surface-light py-20 px-5" ref={ref}>
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PILLARS.map(({ icon, title, desc }, i) => (
          <div
            key={title}
            className="text-center px-4"
            style={slide(inView, i * 120)}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 border border-gold/30 text-gold mb-5 transition-all duration-300 hover:border-gold hover:bg-gold/5">
              {icon}
            </div>
            <h3 className="font-serif text-navy text-lg font-normal mb-3 tracking-[0.5px]">{title}</h3>
            <div className="w-8 h-px bg-gold/50 mx-auto mb-3" />
            <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
