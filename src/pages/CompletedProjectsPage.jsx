import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignatureCard from '../components/SignatureCard';
import Lightbox from '../components/Lightbox';
import { completedWithPhotos } from '../data/projects';

export default function CompletedProjectsPage() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="animate-fade-in">
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <h1 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          A Legacy of Excellence
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h1>
        <p className="text-text-tertiary max-w-[600px] mx-auto">
          Explore our extensive portfolio of over 50 completed masterworks, each a testament to our commitment to structural integrity, timeless design, and unparalleled luxury across Mumbai.
        </p>
      </div>

      <div className="py-16 md:py-24 px-5 bg-surface-subtle">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {completedWithPhotos.map((project) => (
            <SignatureCard
              key={`${project.name}-${project.year}`}
              project={project}
              onPhotoClick={(p) => setLightbox(p)}
            />
          ))}
        </div>
        <div className="max-w-[1200px] mx-auto mt-16 text-center">
          <p className="text-text-tertiary mb-6">
            These are a few of our recent buildings. Every project since 1972 is on our timeline.
          </p>
          <Link
            to="/timeline"
            className="inline-flex items-center min-h-[44px] px-8 py-3 bg-navy text-gold-bright text-sm tracking-[2px] uppercase no-underline border border-navy transition-all duration-300 hover:bg-gold hover:text-navy hover:border-gold"
          >
            View the full timeline
          </Link>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.image}
          alt={lightbox.alt || lightbox.name}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
