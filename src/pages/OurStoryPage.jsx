import { Link } from 'react-router-dom';

const GENERATIONS = [
  {
    label: 'First Generation',
    people: [
      {
        name: 'Kishore Shah',
        initials: 'KS',
        title: 'Founder & Chairman',
        bio: 'Kishore Shah began construction in 1969 with a single, unwavering conviction: that every family deserves a home built with integrity. Starting with a modest development in Orlem, he built the company project by project — each one a testament to his belief that quality is never compromised and trust is never traded. Over five decades, his vision has transformed U.K. Builders into one of Malad West\'s most respected names, delivering over 3,000 homes across 50+ projects. The values he set on day one remain the bedrock of everything the group does today.',
      },
    ],
  },
  {
    label: 'Second Generation',
    people: [
      {
        name: 'Rajeev Shah',
        initials: 'RS',
        title: null,
        bio: 'Kishore Shah\'s son Rajeev stepped into the business with a vision to scale his father\'s legacy without ever diluting it. He led the company\'s expansion into larger, more ambitious residential projects and strengthened the group\'s reputation for delivering on time and to specification. Under his leadership, U.K. Builders evolved from a trusted local builder into the premium brand it is today — one synonymous with craftsmanship, reliability, and a deep understanding of what Mumbai families truly need in a home.',
      },
      {
        name: 'Kiran Shah',
        initials: 'KiS',
        title: null,
        bio: 'Kishore Shah\'s daughter Kiran brought operational rigour and an unwavering eye for detail that elevated the group\'s quality standards across every project. Her focus on construction excellence, material selection, and vendor partnerships ensures that every U.K. Builders home reflects the same pride and precision that her father instilled from day one. Where others see a finished building, Kiran sees the sum of thousands of decisions made correctly.',
      },
    ],
  },
  {
    label: 'Third Generation',
    people: [
      {
        name: 'Avi Shah',
        initials: 'AS',
        title: null,
        bio: 'Rajeev Shah\'s son Avi represents the future of U.K. Builders — combining his grandfather\'s founding values with a modern perspective on design, sustainability, and customer experience. His energy and vision are shaping the next chapter of the group, from reimagining how buyers engage with projects to setting new benchmarks in luxury living across Mumbai\'s western suburbs. In Avi, three generations of accumulated wisdom meet the ambition of what U.K. Builders will become.',
      },
    ],
  },
];

const VALUES = [
  {
    title: 'Trust',
    desc: 'Kishore Shah built this business on trust above all else. Fifty years on, every commitment we make — to buyers, to partners, to the communities we build in — is kept without exception.',
  },
  {
    title: 'Quality',
    desc: 'From foundation to finish, every material and every detail is chosen with one conviction: that quality is not a feature, it is our minimum standard. It is what every generation of this family has stood behind.',
  },
  {
    title: 'Legacy',
    desc: 'We do not build for today. We build for the families who will live in these homes for decades to come — and for the generation of this family that will take the business further still.',
  },
];

export default function OurStoryPage() {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <h1 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Our Legacy
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h1>
        <p className="text-text-tertiary max-w-[580px] mx-auto">
          Three generations. One family. An unbroken commitment to building homes that endure.
        </p>
      </div>

      {/* Opening narrative */}
      <div className="py-16 md:py-20 px-5">
        <div className="max-w-[780px] mx-auto">
          <p className="text-text-primary text-lg leading-[1.95] text-justify">
            The story of U.K. Builders is, at its heart, the story of the Shah family — a family that has spent over five decades building not just structures, but communities, trust, and a legacy that grows stronger with every generation. What began in 1969 as one man&apos;s ambition on a quiet lane in Orlem has become a true family enterprise — Kishore Shah&apos;s children Rajeev and Kiran carried the torch into a new era, and now Rajeev&apos;s son Avi brings the energy of a third generation. Each has added their own strengths without ever changing what the name stands for.
          </p>
        </div>
      </div>

      {/* Generation sections */}
      <div className="pb-24 px-5">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-20">
          {GENERATIONS.map((gen) => (
            <div key={gen.label}>
              {/* Banner */}
              <div className="flex items-center gap-5 mb-12">
                <div className="flex-1 h-px bg-gold/25" />
                <div className="px-8 py-3 bg-navy border border-gold text-gold-bright font-serif font-bold text-sm uppercase tracking-[3px] whitespace-nowrap">
                  {gen.label}
                </div>
                <div className="flex-1 h-px bg-gold/25" />
              </div>

              {/* Cards */}
              <div className={`grid gap-8 ${gen.people.length === 1 ? 'max-w-[700px] mx-auto grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {gen.people.map((person) => (
                  <div
                    key={person.name}
                    className="bg-white border border-border-light p-10 flex flex-col items-center text-center hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-shadow duration-300"
                  >
                    <div className="w-24 h-24 rounded-full bg-navy border-2 border-gold flex items-center justify-center mb-6 shrink-0">
                      <span className="text-gold font-serif text-2xl font-bold tracking-widest">{person.initials}</span>
                    </div>
                    <h3 className="font-serif text-navy text-2xl font-normal mb-1">{person.name}</h3>
                    {person.title && (
                      <span className="text-gold text-xs uppercase tracking-[3px] mb-7 block">{person.title}</span>
                    )}
                    <p className="text-text-secondary text-sm leading-[1.9] text-left">{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="bg-navy py-20 px-5">
        <div className="max-w-[1000px] mx-auto text-center">
          <h3 className="font-serif text-white text-3xl font-normal uppercase tracking-[2px] mb-2">
            The Values We Carry Forward
          </h3>
          <span className="block w-[50px] h-[2px] bg-gold mx-auto mt-4 mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="border border-gold/30 p-8 hover:border-gold transition-colors duration-300">
                <h4 className="font-serif text-gold text-2xl font-normal uppercase tracking-[3px] mb-4">{v.title}</h4>
                <p className="text-text-light text-sm leading-[1.9]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 px-5 bg-surface-light border-t border-border-light text-center">
        <p className="text-text-tertiary text-sm mb-6 max-w-[480px] mx-auto">
          Interested in becoming part of the U.K. Builders story as a homeowner?
        </p>
        <Link
          to="/projects/ongoing"
          className="inline-block bg-gold text-navy px-10 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
        >
          Explore Our Projects
        </Link>
      </div>

    </div>
  );
}
