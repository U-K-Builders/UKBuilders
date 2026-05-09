export default function SectionTitle({ children, overline, className = '' }) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {overline && (
        <p className="text-gold text-[10px] tracking-[5px] uppercase mb-3 font-light">{overline}</p>
      )}
      <h2 className="text-navy text-4xl md:text-[42px] uppercase tracking-[3px] font-serif font-normal m-0 leading-tight">
        {children}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="w-12 h-[1px] bg-gold/40" />
        <div className="w-8 h-[3px] bg-gold" />
        <div className="w-12 h-[1px] bg-gold/40" />
      </div>
    </div>
  );
}
