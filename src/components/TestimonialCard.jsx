export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white/5 p-6 md:p-10 border-l-2 border-gold box-border text-left h-full flex flex-col justify-between gap-6">
      <p
        className="italic text-base leading-[1.9] text-text-light"
        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div>
        <div className="w-8 h-[1px] bg-gold/50 mb-3" />
        <p className="font-bold text-gold uppercase tracking-[2px] text-xs">
          {testimonial.clientName}
        </p>
        {testimonial.project && (
          <p className="text-white/30 text-xs uppercase tracking-[1px] mt-1">{testimonial.project}</p>
        )}
      </div>
    </div>
  );
}
