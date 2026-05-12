import { Link } from 'react-router-dom';
import { projectDetails } from '../data/projectDetails';

function getMonthsToHandover(possessionYear) {
  if (!possessionYear) return null;
  const now = new Date();
  const target = new Date(parseInt(possessionYear), 11, 31);
  const months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  return Math.max(0, months);
}

function getMilestonePercent(name) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const progress = projectDetails[slug]?.progress;
  if (!progress) return null;
  const done = progress.filter((s) => s.status === 'done').length;
  return Math.round((done / progress.length) * 100);
}

function ProgressRing({ percent }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width="56" height="56" className="-rotate-90" aria-hidden="true">
      <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(212,168,78,0.18)" strokeWidth="4" />
      <circle
        cx="28" cy="28" r={r} fill="none"
        stroke="#D4A84E" strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProjectCard({ project }) {
  const slug = project.name.toLowerCase().replace(/\s+/g, '-');
  const months = getMonthsToHandover(project.possession);
  const percent = getMilestonePercent(project.name);

  return (
    <div className="bg-white border border-gold p-6 md:p-10 box-border text-center transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(197,160,89,0.15)]">
      <div className="mb-4">
        <h3 className="gradient-text font-serif text-3xl md:text-[2.875rem] font-black uppercase tracking-[4px] md:tracking-[8px] m-0">
          {project.name}
        </h3>
        <span className="block text-xs tracking-[5px] text-text-muted uppercase mt-2">
          {project.subtitle}
        </span>
        <div className="w-[50px] h-[3px] bg-gold mx-auto mt-5 mb-8" />
      </div>

      {/* Possession countdown + progress ring */}
      {(months !== null || percent !== null) && (
        <div className="flex items-center justify-center gap-5 mb-8 py-4 border-y border-border-light">
          {percent !== null && (
            <div className="relative shrink-0">
              <ProgressRing percent={percent} />
              <span className="absolute inset-0 flex items-center justify-center text-[0.625rem] font-bold text-gold rotate-0">
                {percent}%
              </span>
            </div>
          )}
          <div className="text-left">
            {months !== null && (
              <>
                <p className="text-2xl md:text-3xl font-serif text-navy font-black leading-none">{months}</p>
                <p className="text-[0.625rem] uppercase tracking-[1.5px] text-text-muted mt-1">months to possession</p>
              </>
            )}
            {percent !== null && (
              <p className="text-[0.625rem] uppercase tracking-[1.5px] text-text-muted mt-1">construction complete</p>
            )}
          </div>
        </div>
      )}

      {project.image && (
        <div className="inline-block mb-6 border border-gold-dark p-2 bg-white overflow-hidden">
          <img
            src={project.image}
            alt={project.alt}
            className="block max-w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="mt-8 text-left">
        <div className="mb-6">
          <span className="block text-navy text-[0.8125rem] font-extrabold uppercase tracking-[3px] mb-2 border-b-2 border-gold pb-1 w-fit">
            Configurations
          </span>
          <span className="block text-lg md:text-[1.375rem] text-text-dark font-serif font-normal py-1">
            {project.configs}
          </span>
        </div>
        <div className="mb-8">
          <span className="block text-navy text-[0.8125rem] font-extrabold uppercase tracking-[3px] mb-2 border-b-2 border-gold pb-1 w-fit">
            Location
          </span>
          <span className="block text-lg md:text-[1.375rem] text-text-dark font-serif font-normal py-1">
            {project.location}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to={`/projects/${slug}`}
          className="flex-1 bg-gold text-white px-6 py-3 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold text-center"
        >
          View Details
        </Link>
        <Link
          to={`/projects/${slug}#book-visit`}
          className="flex-1 bg-transparent text-gold px-6 py-3 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-gold hover:text-white text-center"
        >
          Book a Visit
        </Link>
      </div>
    </div>
  );
}
