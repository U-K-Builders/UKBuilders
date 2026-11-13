// "Client Experiences" section on the home page: buyer quotes from
// src/data/testimonials.js. Shows only quotes marked `permitted: true`, and
// renders nothing at all (no empty section) when there are none, which is
// the case until the owner confirms them. Owned by feature/trust.
import SectionTitle from './SectionTitle';
import TestimonialCard from './TestimonialCard';
import { permittedTestimonials, TESTIMONIALS_HEADING } from '../data/testimonials';

export default function Testimonials() {
  if (permittedTestimonials.length === 0) return null;
  return (
    <section className="bg-navy text-white py-24 px-5">
      <SectionTitle className="!text-white">{TESTIMONIALS_HEADING}</SectionTitle>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {permittedTestimonials.map((t) => (
          <TestimonialCard key={t.clientName} testimonial={t} />
        ))}
      </div>
    </section>
  );
}
