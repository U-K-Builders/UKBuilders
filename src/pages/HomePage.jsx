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

      {/* Ongoing projects */}
      <div className="py-28 px-5 max-w-[1200px] mx-auto">
        <SectionTitle overline="Currently Under Construction">Ongoing Masterpieces</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {ongoingProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>

      {/* Legacy projects */}
      <div className="py-28 px-5 bg-surface-subtle">
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle overline="55+ Years of Delivered Excellence">Legacy Projects</SectionTitle>
          <Carousel interval={5000} visibleCount={3}>
            {completedProjects.filter((p) => p.image).map((project) => (
              <SignatureCard key={`${project.name}-${project.year}`} project={project} className="h-full" />
            ))}
          </Carousel>
          <div className="text-center mt-14">
            <Link
              to="/projects/completed"
              className="inline-block bg-gold text-white px-14 py-4 no-underline text-[11px] tracking-[3px] uppercase border-2 border-gold transition-all duration-300 hover:bg-transparent hover:text-gold font-light"
            >
              View All Completed Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-navy text-white py-28 overflow-hidden">
        <SectionTitle overline="Voices of Our Community" className="!text-white">Client Experiences</SectionTitle>
        <Carousel interval={5000} visibleCount={3}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
