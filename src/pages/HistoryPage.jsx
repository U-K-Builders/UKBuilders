import { lazy, Suspense } from 'react';
import { completedProjects } from '../data/projects';

const ProjectMap = lazy(() => import('../components/ProjectMap'));

export default function HistoryPage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <h2 className="text-center text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Our Heritage
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h2>
        <p className="text-text-tertiary max-w-[600px] mx-auto">
          Building Trust and Shaping Skylines Since 1969.
        </p>
      </div>

      <div className="py-24 px-5 max-w-[1200px] mx-auto">
        <div className="flex gap-12 items-center max-lg:flex-col">
          <div className="flex-[1.2] text-lg text-text-primary leading-[1.8] text-justify">
            <h3 className="font-serif text-navy text-[1.75rem] mt-0">Foundations Built on Trust</h3>
            <p className="mb-6">
              U.K. Builders has been raising the industry&apos;s standard ever since the late 1960s, imparting state-of-the-art real estate solutions for the Redevelopment of Co-operative Housing Societies in the western suburbs of Mumbai for over 55 Years. Our success story is created over 5 decades, bringing over 50 diverse projects to life.
            </p>
            <p className="mb-6">
              From residential masterpieces to commercial landmarks, each endeavour reflects our unwavering dedication to quality and craftsmanship. The core principle on which all our companies — U.K. Builders, U.K. Properties, and U.K. Homes — are based is the trust earned by our founder, Kishore Shah, by providing over 3,000 homes to happy families.
            </p>
            <p>
              In an era where sustainability and innovation are paramount, our companies are dedicated to incorporating cutting-edge technologies and eco-friendly practices. All our companies pride themselves on a commitment to timely project delivery without compromising on quality. This dedication to efficiency is not just a business strategy; it is a promise to our clients that their vision will materialize on schedule.
            </p>
          </div>

          <div className="flex-[0.8] bg-navy text-white p-12 border border-gold text-center">
            <div className="mb-10">
              <span className="text-[4rem] text-gold font-serif block leading-none mb-2">55+</span>
              <span className="text-sm uppercase tracking-[2px] text-text-light">Years of Legacy</span>
            </div>
            <div className="mb-10">
              <span className="text-[4rem] text-gold font-serif block leading-none mb-2">50+</span>
              <span className="text-sm uppercase tracking-[2px] text-text-light">Projects Delivered</span>
            </div>
            <div>
              <span className="text-[4rem] text-gold font-serif block leading-none mb-2">3000+</span>
              <span className="text-sm uppercase tracking-[2px] text-text-light">Happy Families</span>
            </div>
          </div>
        </div>
      </div>

      {/* Group companies */}
      <div className="border-t border-border-light py-16 md:py-24 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-serif text-navy text-3xl text-center mb-3 uppercase tracking-[2px] font-normal">
            Legacy of Companies
            <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
          </h3>
          <p className="text-text-tertiary text-center mb-14 max-w-[560px] mx-auto">
            As the second generation joined the business, Kishore Shah&apos;s children each established their own companies under the U.K. umbrella — expanding the group&apos;s reach while staying true to its founding values.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* U.K. Builders */}
            <div className="bg-navy border border-gold p-8 text-center flex flex-col">
              <span className="block text-gold font-serif text-2xl font-bold uppercase tracking-[3px] mb-1">U.K. Builders</span>
              <span className="block text-xs uppercase tracking-[2px] text-text-muted mb-5">Est. 1981 · Kishore Shah</span>
              <div className="w-10 h-[2px] bg-gold mx-auto mb-6" />
              <p className="text-text-light text-sm leading-[1.9] flex-1">
                The founding company, established by Kishore Shah in 1981 — formalising the construction practice he began in 1969. Built on a foundation of trust and an uncompromising commitment to quality, U.K. Builders has delivered over 50 projects and 3,000+ homes across Malad West — making it one of the western suburbs&apos; most enduring names in residential construction.
              </p>
            </div>

            {/* U.K. Properties */}
            <div className="bg-navy border border-gold p-8 text-center flex flex-col">
              <span className="block text-gold font-serif text-2xl font-bold uppercase tracking-[3px] mb-1">U.K. Properties</span>
              <span className="block text-xs uppercase tracking-[2px] text-text-muted mb-5">Rajeev Shah</span>
              <div className="w-10 h-[2px] bg-gold mx-auto mb-6" />
              <p className="text-text-light text-sm leading-[1.9] flex-1">
                Founded by Rajeev Shah, U.K. Properties carries the group into a new era of premium residential development. Focused on delivering larger, more sophisticated projects, U.K. Properties has raised the bar for luxury living in Orlem — with landmark developments like Silver Coin, La Serena, and Cinderella to its name.
              </p>
            </div>

            {/* U.K. Homes */}
            <div className="bg-navy border border-gold p-8 text-center flex flex-col">
              <span className="block text-gold font-serif text-2xl font-bold uppercase tracking-[3px] mb-1">U.K. Homes</span>
              <span className="block text-xs uppercase tracking-[2px] text-text-muted mb-5">Kiran Shah</span>
              <div className="w-10 h-[2px] bg-gold mx-auto mb-6" />
              <p className="text-text-light text-sm leading-[1.9] flex-1">
                Established by Kiran Shah, U.K. Homes reflects her hallmark attention to detail and dedication to craftsmanship. The company focuses on creating thoughtfully designed residences where quality of construction and quality of life are equally paramount — continuing the Shah family&apos;s legacy of homes built to last.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project map section */}
      <div className="bg-surface-light border-t border-border-light py-16 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-serif text-navy text-3xl text-center mb-3 uppercase tracking-[2px] font-normal">
            Our Footprint Across Mumbai
            <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
          </h3>
          <p className="text-text-tertiary text-center mb-10 max-w-[560px] mx-auto">
            Every pin marks a home we built — a community we shaped. From Madh Island to Kandivali, our legacy spans the city.
          </p>
          <div className="w-full h-[480px] border border-border-light overflow-hidden">
            <Suspense fallback={<div className="w-full h-full bg-surface-subtle flex items-center justify-center text-text-muted text-sm">Loading map…</div>}>
              <ProjectMap projects={completedProjects} />
            </Suspense>
          </div>
          <p className="text-center text-xs text-text-muted mt-3">Click any marker to see project details.</p>
        </div>
      </div>
    </div>
  );
}
