import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import SignatureCard from '../components/SignatureCard';
import TestimonialCard from '../components/TestimonialCard';
import Carousel from '../components/Carousel';
import AnimatedCounter from '../components/AnimatedCounter';
import TrustPillars from '../components/TrustPillars';
import { ongoingProjects, upcomingProjects, completedProjects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import { useInView } from '../hooks/useInView';
import { useAuth } from '../context/AuthContext';

const CityProjectsMap = lazy(() => import('../components/CityProjectsMap'));

const STATS = [
  { target: 55,   suffix: '+', label: 'Years of Legacy'    },
  { target: 50,   suffix: '+', label: 'Projects Delivered' },
  { target: 3000, suffix: '+', label: 'Families Housed'    },
];

function slide(inView, delay = 0) {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(32px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  };
}

export default function HomePage() {
  const { isAdmin } = useAuth();
  const [statsRef,        statsInView]        = useInView(0.3);
  const [ongoingRef,      ongoingInView]      = useInView(0.1);
  const [upcomingRef,     upcomingInView]     = useInView(0.1);
  const [mapRef,          mapInView]          = useInView(0.1);
  const [legacyRef,       legacyInView]       = useInView(0.1);
  const [testimonialsRef, testimonialsInView] = useInView(0.1);

  const visibleUpcoming = isAdmin ? upcomingProjects : upcomingProjects.filter((p) => !p.hidden);

  return (
    <div className="animate-fade-in">
      <HeroSection />

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <div className="bg-navy-dark py-16 px-5" ref={statsRef}>
        <div className="max-w-[900px] mx-auto grid grid-cols-3 divide-x divide-white/10">
          {STATS.map(({ target, suffix, label }, i) => (
            <div key={label} className="text-center px-4 sm:px-8" style={slide(statsInView, i * 150)}>
              <p className="text-4xl sm:text-5xl font-serif text-gold font-normal m-0 mb-2">
                <AnimatedCounter target={target} suffix={suffix} active={statsInView} duration={1800} />
              </p>
              <p className="text-[0.625rem] tracking-[2px] uppercase text-white/50 m-0">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust pillars ────────────────────────────────────────────────── */}
      <TrustPillars />

      {/* ── Ongoing projects ─────────────────────────────────────────────── */}
      <div className="py-24 px-5 bg-surface-subtle" ref={ongoingRef}>
        <div className="max-w-[1200px] mx-auto">
          <div style={slide(ongoingInView)}>
            <SectionTitle>Ongoing Masterpieces</SectionTitle>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ongoingProjects.map((project, i) => (
              <div key={project.name} style={slide(ongoingInView, 150 + i * 150)}>
                <ProjectCard project={project} showCountdown={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Upcoming projects ────────────────────────────────────────────── */}
      {isAdmin && visibleUpcoming.length > 0 && (
        <div className="py-24 px-5 bg-surface-subtle border-t border-border-light" ref={upcomingRef}>
          <div className="max-w-[1200px] mx-auto">
            <div style={slide(upcomingInView)}>
              <SectionTitle>Upcoming Projects</SectionTitle>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {visibleUpcoming.map((project, i) => (
                <div key={project.name} style={slide(upcomingInView, 150 + i * 150)}>
                  <ProjectCard project={project} showCountdown={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── City map ─────────────────────────────────────────────────────── */}
      <div className="bg-navy py-24 px-5" ref={mapRef}>
        <div className="max-w-[1100px] mx-auto">
          <div style={slide(mapInView)}>
            <SectionTitle className="!text-white">Our Presence Across Mumbai</SectionTitle>
            <p className="text-center text-white/50 text-sm tracking-[0.5px] -mt-10 mb-10 max-w-[560px] mx-auto">
              Over 55 years, 50+ projects spanning Malad, Kandivali, Andheri, Khar and beyond.
            </p>
          </div>
          <div style={slide(mapInView, 200)}>
            <Suspense fallback={<div className="h-[520px] bg-white/5 animate-pulse" />}>
              <CityProjectsMap
                ongoing={ongoingProjects}
                upcoming={upcomingProjects}
                completed={completedProjects}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* ── Legacy projects ──────────────────────────────────────────────── */}
      <div className="py-24 px-5 bg-surface-subtle" ref={legacyRef}>
        <div className="max-w-[1200px] mx-auto">
          <div style={slide(legacyInView)}>
            <SectionTitle>Legacy Projects</SectionTitle>
          </div>
          <div style={slide(legacyInView, 150)}>
            <Carousel interval={5000} visibleCount={3}>
              {completedProjects.filter((p) => p.image).map((project) => (
                <SignatureCard key={`${project.name}-${project.year}`} project={project} className="h-full" />
              ))}
            </Carousel>
          </div>
          <div className="text-center mt-12" style={slide(legacyInView, 300)}>
            <Link
              to="/projects/completed"
              className="inline-block bg-gold text-white px-12 py-5 no-underline text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
            >
              View All Completed Projects
            </Link>
          </div>
        </div>
      </div>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <div className="bg-navy text-white py-24 overflow-hidden" ref={testimonialsRef}>
        <div style={slide(testimonialsInView)}>
          <SectionTitle className="!text-white">Client Experiences</SectionTitle>
        </div>
        <div style={slide(testimonialsInView, 150)}>
          <Carousel interval={5000} visibleCount={3}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
