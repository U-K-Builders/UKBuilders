// Buyer quotes for the "Client Experiences" section (src/components/Testimonials.jsx,
// on the home page). Owned by feature/trust.
//
// `permitted` must stay false until the owner has the buyer's WRITTEN
// permission to publish the quote with their name, and has confirmed their
// project and year (add them as `project` and `year`). None of these six has
// been confirmed yet (Nov 2026), so the section is hidden. Never invent or
// reword a quote.
export const testimonials = [
  {
    quote: 'The attention to detail and quality of construction is unmatched. Moving into a U.K. Builders property was the best decision for our family.',
    clientName: 'Rajesh & Priya Desai',
    permitted: false,
  },
  {
    quote: 'Professionalism from day one to handover. The finishing, the layout, and the premium amenities exceeded our expectations.',
    clientName: 'Ananya Sharma',
    permitted: false,
  },
  {
    quote: 'As an NRI, I was looking for transparency and reliability. U.K. Builders provided exceptional updates throughout the process.',
    clientName: 'Dr. Vikram Malhotra',
    permitted: false,
  },
  {
    quote: 'The architectural design is ahead of its time. The ventilation and natural lighting are perfect. Truly a legacy builder.',
    clientName: 'Michael & Sarah D\'Souza',
    permitted: false,
  },
  {
    quote: 'From Italian marble to premium fittings, everything screams quality. The team made the process stress-free.',
    clientName: 'Adv. Sanjay Kulkarni',
    permitted: false,
  },
  {
    quote: 'Living here feels exclusive. The podium gardens provide a perfect escape from the city\'s hustle. Outstanding experience.',
    clientName: 'Preeti Grewal',
    permitted: false,
  },
];

// Only these are ever shown.
export const permittedTestimonials = testimonials.filter((t) => t.permitted === true);

export const TESTIMONIALS_HEADING = 'Client Experiences';
