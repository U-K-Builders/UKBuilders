export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white/5 p-8 md:p-10 border border-white/8 border-l-[3px] border-l-gold box-border text-left h-full transition-all duration-400 hover:bg-white/8 hover:border-l-gold-dark">
      <div className="text-gold text-[36px] font-serif leading-none mb-4 opacity-60">&ldquo;</div>
      <p className="italic text-[15px] leading-[1.9] text-white/65 mb-6">
        {testimonial.quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-6 h-[1px] bg-gold/50" />
        <p className="text-gold text-[11px] uppercase tracking-[2.5px] font-light m-0">
          {testimonial.clientName}
        </p>
      </div>
    </div>
  );
}
