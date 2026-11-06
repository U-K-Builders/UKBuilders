export default function SignatureCard({ project, className = '', onPhotoClick }) {
  return (
    <div className={`group bg-white border border-border-light box-border flex flex-col text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(10,24,40,0.12)] overflow-hidden ${className}`}>
      <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {project.image && (
        <div
          className="self-center inline-block m-6 mb-2 border-2 border-gold/25 group-hover:border-gold p-2 bg-white overflow-hidden cursor-zoom-in relative transition-all duration-500"
          onClick={() => onPhotoClick && onPhotoClick(project)}
        >
          <img
            src={project.image}
            alt={project.alt || project.name}
            className="block max-w-full h-[220px] object-contain transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-navy/80 text-gold text-xs uppercase tracking-[2px] px-3 py-1.5">
              View Photo
            </span>
          </div>
        </div>
      )}

      <div className="px-6 pb-8 flex flex-col grow">
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
