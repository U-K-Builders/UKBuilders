import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import SignatureCard from '../components/SignatureCard';
import TestimonialCard from '../components/TestimonialCard';
import Carousel from '../components/Carousel';
import { ongoingProjects, completedProjects } from '../data/projects';
import { testimonials } from '../data/testimonials';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <HeroSection />

      <div className="py-24 px-5" style={{ background: 'linear-gradient(180deg, #faf6ef 0%, #f5ede0 100%)' }}>
        <div className="max-w-[1200px] mx-auto">
        <SectionTitle>Ongoing Masterpieces</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ongoingProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
        </div>
      </div>

      <div className="py-24 px-5 bg-surface-subtle">
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle>Legacy Projects</SectionTitle>
          <Carousel interval={5000} visibleCount={3}>
            {completedProjects.filter((p) => p.image).map((project) => (
              <SignatureCard key={`${project.name}-${project.year}`} project={project} className="h-full" />
            ))}
          </Carousel>
          <div className="text-center mt-12">
            <Link
              to="/projects/completed"
              className="inline-block bg-gold text-white px-12 py-5 no-underline text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
            >
              View All Completed Projects
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-navy text-white py-24 overflow-hidden">
        <SectionTitle className="!text-white">Client Experiences</SectionTitle>
        <Carousel interval={5000} visibleCount={3}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
