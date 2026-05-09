export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white/5 p-6 md:p-10 border-l-2 border-gold box-border text-left h-full">
      <p className="italic text-base mb-5 leading-[1.8] text-text-light">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <p className="font-bold text-gold uppercase tracking-[1px] text-[13px]">
        — {testimonial.clientName}
      </p>
    </div>
  );
}
