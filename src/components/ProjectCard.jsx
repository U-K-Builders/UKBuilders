import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const slug = project.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="group bg-white border border-border-light box-border text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(10,24,40,0.12)] overflow-hidden">

      {/* Gold top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="p-8 md:p-10">
        {/* Title block */}
        <div className="mb-6">
          <h3 className="gradient-text font-serif text-[40px] md:text-[52px] font-black uppercase tracking-[6px] m-0 leading-none">
            {project.name}
          </h3>
          <span className="block text-[10px] tracking-[5px] text-gold uppercase mt-3">
            {project.subtitle}
          </span>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-10 h-[1px] bg-gold/30" />
            <div className="w-6 h-[2px] bg-gold" />
            <div className="w-10 h-[1px] bg-gold/30" />
          </div>
        </div>

        {project.image && (
          <div className="inline-block mb-6 border-2 border-gold/30 group-hover:border-gold p-2 bg-white overflow-hidden transition-all duration-500">
            <img
              src={project.image}
              alt={project.alt}
              className="block max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        )}

        <div className="mt-8 text-left space-y-6">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[3px] text-gold mb-2">
              Configurations
            </span>
            <div className="w-full h-[1px] bg-border-light mb-3" />
            <span className="block text-xl md:text-[22px] text-text-dark font-serif font-normal">
              {project.configs}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[3px] text-gold mb-2">
              Location
            </span>
            <div className="w-full h-[1px] bg-border-light mb-3" />
            <span className="block text-xl md:text-[22px] text-text-dark font-serif font-normal">
              {project.location}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            to={`/projects/${slug}`}
            className="flex-1 bg-gold text-white px-6 py-3.5 text-[10px] tracking-[2.5px] uppercase border-2 border-gold transition-all duration-300 hover:bg-transparent hover:text-gold text-center font-light"
          >
            View Details
          </Link>
          <Link
            to={`/projects/${slug}#book-visit`}
            className="flex-1 bg-transparent text-navy px-6 py-3.5 text-[10px] tracking-[2.5px] uppercase border-2 border-navy/30 transition-all duration-300 hover:border-gold hover:text-gold text-center font-light"
          >
            Book a Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
