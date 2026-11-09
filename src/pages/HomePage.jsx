import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import TestimonialCard from '../components/TestimonialCard';
import Carousel from '../components/Carousel';
import Carousel3D from '../components/Carousel3D';
import TrustPillars from '../components/TrustPillars';
import { ongoingProjects, upcomingProjects, publicCompletedProjects, completedWithPhotos } from '../data/projects';
import { testimonials } from '../data/testimonials';
import { useInView } from '../hooks/useInView';

const CityProjectsMap = lazy(() => import('../components/CityProjectsMap'));

function slide(inView, delay = 0) {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(32px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  };
}

export default function HomePage() {
  const [ongoingRef,      ongoingInView]      = useInView(0.1);
  const [mapRef,          mapInView]          = useInView(0.1);
  const [legacyRef,       legacyInView]       = useInView(0.1);
  const [testimonialsRef, testimonialsInView] = useInView(0.1);


  return (
    <div className="animate-fade-in">
      <HeroSection />

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
                upcoming={upcomingProjects.filter((p) => !p.hidden)}
                completed={publicCompletedProjects}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* ── Legacy projects (3D ring) ─────────────────────────────────────── */}
      <div className="py-24 px-5 bg-navy-dark text-white overflow-hidden" ref={legacyRef}>
        <div className="max-w-[1200px] mx-auto">
          <div style={slide(legacyInView)}>
            <p className="text-center text-xs uppercase tracking-[4px] text-gold mb-3">Since 1969</p>
            <SectionTitle className="!text-white !mb-6">Legacy Projects</SectionTitle>
            <p className="text-center text-white/70 max-w-[520px] mx-auto mb-12 leading-[1.8]">
              Five decades of homes across Orlem and Malad West. A few of our recent buildings.
            </p>
          </div>
          <div style={slide(legacyInView, 150)}>
            <Carousel3D
              label="Legacy projects"
              items={completedWithPhotos}
              getKey={(p) => `${p.name}-${p.year}`}
              getLabel={(p) => `${p.name}, completed ${p.year}`}
              renderItem={(project) => (
                <article className="h-full flex flex-col bg-navy border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.45)] overflow-hidden">
                  <div className="relative grow min-h-0 bg-white/5">
                    <img
                      src={project.image}
                      alt={project.alt || project.name}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-5 text-left">
                    <p className="text-xs uppercase tracking-[3px] text-gold mb-2">Completed {project.year}</p>
                    <h3 className="font-serif text-white text-xl tracking-[1px] mb-2">{project.name}</h3>
                    <p className="hidden sm:[display:-webkit-box] text-white/70 text-sm leading-[1.6] line-clamp-2">{project.description}</p>
                  </div>
                </article>
              )}
            />
          </div>
          <div className="text-center mt-12" style={slide(legacyInView, 300)}>
            <Link
              to="/projects/completed"
              className="inline-block bg-gold text-navy px-12 py-5 no-underline text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
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
