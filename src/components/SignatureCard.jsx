// Compact card for a completed project (photo, year, name, description). Used
// by CompletedProjectsPage.
export default function SignatureCard({ project, className = '', onPhotoClick }) {
  return (
    <div className={`group bg-white border border-border-light box-border flex flex-col text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,24,40,0.12)] overflow-hidden ${className}`}>
      <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {project.image && (
        <button
          type="button"
          className="relative block w-full h-[240px] overflow-hidden bg-surface-subtle cursor-zoom-in"
          onClick={() => onPhotoClick && onPhotoClick(project)}
          aria-label={`View photo of ${project.name}`}
        >
          <img loading="lazy" decoding="async"
            src={project.image}
            alt=""
            className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 bg-navy/80 text-gold-bright text-xs uppercase tracking-[2px] px-3 py-1.5">
              View Photo
            </span>
          </span>
        </button>
      )}

      <div className="px-6 pt-4 pb-8 flex flex-col grow">
        <span className="text-xs uppercase tracking-[3px] text-gold/70 block mt-2 mb-1">
          Completed {project.year}
        </span>
        <h3 className="gradient-text font-serif text-xl md:text-2xl font-black uppercase tracking-[2px] my-3 text-center">
          {project.name}
        </h3>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-[1px] bg-gold/30" />
          <div className="w-4 h-[2px] bg-gold" />
          <div className="w-8 h-[1px] bg-gold/30" />
        </div>
        <p className="text-text-secondary text-[0.8125rem] leading-[1.8] grow text-left">
          {project.description}
        </p>
      </div>
    </div>
  );
}
