// Home page (/): hero, trust pillars, ongoing projects, city map, legacy
// projects carousel and (once permitted) buyer testimonials.
// Owned by feature/navigation-design (Phase 3); the sections it imports belong
// to their own branches (see docs/HANDOFF.md, "Phase 3 file ownership").
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import Carousel3D from '../components/Carousel3D';
import TrustPillars from '../components/TrustPillars';
import Testimonials from '../components/Testimonials';
import { ongoingProjects, upcomingProjects, publicCompletedProjects, completedWithPhotos } from '../data/projects';
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
              maxCardWidth={300}
              cardRatio={1.48}
              items={completedWithPhotos}
              getKey={(p) => `${p.name}-${p.year}`}
              getLabel={(p) => `${p.name}, completed ${p.year}`}
              renderItem={(project, isActive, cardWidth) => (
                <article className="h-full flex flex-col bg-navy border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.45)] overflow-hidden">
                  {/* Same frame for every photo; the photo is the focus. */}
                  <div className="relative grow min-h-0 overflow-hidden bg-navy-dark">
                    <img
                      src={project.image}
                      alt={project.alt || project.name}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="shrink-0 px-3 py-3 text-left">
                    <p className="text-xs leading-none uppercase tracking-[3px] text-gold mb-2">Completed {project.year}</p>
                    {/* One line, sized to the card width. */}
                    <h3
                      className="font-serif text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ fontSize: Math.min(24, Math.floor((cardWidth - 26) / 11)) }}
                    >
                      {project.name}
                    </h3>
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

      {/* ── Testimonials (renders nothing until a quote is permitted) ─────── */}
      <Testimonials />
    </div>
  );
}
