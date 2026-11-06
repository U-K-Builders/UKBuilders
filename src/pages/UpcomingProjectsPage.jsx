import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import WaitlistModal from '../components/WaitlistModal';
import { upcomingProjects } from '../data/projects';
import { useAuth } from '../context/AuthContext';

export default function UpcomingProjectsPage() {
  const { isAdmin } = useAuth();
  const [waitlistProject, setWaitlistProject] = useState(null);
  const visibleProjects = isAdmin ? upcomingProjects : upcomingProjects.filter((p) => !p.hidden);

  return (
    <div className="animate-fade-in">
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <h1 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Upcoming Projects
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h1>
        <p className="text-text-tertiary max-w-[600px] mx-auto">
          A glimpse at what is coming next — new addresses in Orlem crafted with the same uncompromising standard that defines every U.K. Builders home.
        </p>
      </div>

      <div className="py-16 md:py-24 px-5 bg-surface-subtle">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
          {visibleProjects.map((project) => (
            <div key={project.name} className="flex flex-col gap-4">
              <ProjectCard project={project} />

              {/* Waitlist CTA */}
              <div className="bg-navy border border-gold/30 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-gold text-xs uppercase tracking-[3px] font-bold mb-1">Pre-launch Waitlist Open</p>
                  <p className="text-text-light text-sm leading-[1.7]">
                    Be the first to receive pricing, floor plans and early-bird availability for {project.name}.
                  </p>
                </div>
                <button
                  onClick={() => setWaitlistProject(project.name)}
                  className="shrink-0 bg-gold text-navy px-8 py-3 text-xs uppercase tracking-[3px] border border-gold hover:bg-transparent hover:text-gold transition-all duration-300 cursor-pointer"
                >
                  Notify Me
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {waitlistProject && (
        <WaitlistModal
          projectName={waitlistProject}
          onClose={() => setWaitlistProject(null)}
        />
      )}
    </div>
  );
}
