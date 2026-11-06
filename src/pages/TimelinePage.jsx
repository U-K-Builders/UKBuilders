import { completedProjects, ongoingProjects, upcomingProjects } from '../data/projects';

const chronological = [...completedProjects].sort((a, b) => a.year - b.year);

function groupByDecade(projects) {
  const groups = {};
  for (const p of projects) {
    const key = `${Math.floor(p.year / 10) * 10}s`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  }
  return groups;
}

const grouped = groupByDecade(chronological);
const decades = Object.keys(grouped);

function TimelineCard({ project, align, isOngoing }) {
  return (
    <div className={`bg-white border border-border-light p-5 md:p-6 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] ${align === 'right' ? 'md:text-right' : 'text-left'}`}>
      <h3 className={`gradient-text font-serif text-lg font-black uppercase tracking-[2px] mb-1`}>
        {project.name}
      </h3>
      {isOngoing ? (
        <>
          <span className="text-gold text-xs uppercase tracking-[2px] font-bold mb-2 block">
            {project.subtitle}
          </span>
          <p className="text-text-secondary text-sm leading-[1.7] mb-1">{project.configs}</p>
          <p className="text-text-tertiary text-xs">{project.location}</p>
        </>
      ) : (
        <>
          <span className="text-gold text-xs uppercase tracking-[2px] font-bold mb-3 block">
            {project.year} · {project.builder}
          </span>
          <p className="text-text-secondary text-sm leading-[1.7]">{project.description}</p>
        </>
      )}
    </div>
  );
}

function DecadeBanner({ label, isOngoing }) {
  return (
    <div className="relative flex items-center my-10 md:my-14 z-10">
      <div className="flex-1 h-px bg-gold/20" />
      <div className={`mx-4 px-10 py-4 text-base md:text-xl uppercase tracking-[4px] font-bold font-serif border whitespace-nowrap ${
        isOngoing ? 'bg-gold text-navy border-gold' : 'bg-navy text-gold border-gold'
      }`}>
        {label}
      </div>
      <div className="flex-1 h-px bg-gold/20" />
    </div>
  );
}

function Dot({ year, isOngoing }) {
  return (
    <div className={`w-24 h-24 rounded-full border-[3px] border-gold flex items-center justify-center flex-shrink-0 z-10 relative ${
      isOngoing ? 'bg-gold' : 'bg-navy'
    }`}>
      <span className={`text-base font-bold text-center leading-tight ${isOngoing ? 'text-white' : 'text-gold'}`}>
        {isOngoing ? 'NOW' : year}
      </span>
    </div>
  );
}

function TimelineItem({ project, index, isOngoing }) {
  const isLeft = index % 2 === 0;
  return (
    <div className="relative mb-6 md:mb-8">
      {/* Mobile: dot left, card right */}
      <div className="flex md:hidden items-start gap-4">
        <Dot year={project.year} isOngoing={isOngoing} />
        <div className="flex-1 min-w-0">
          <TimelineCard project={project} align="left" isOngoing={isOngoing} />
        </div>
      </div>

      {/* Desktop: alternating left / right */}
      <div className="hidden md:grid md:grid-cols-[1fr_100px_1fr] items-start">
        <div className="flex justify-end pr-6">
          {isLeft && <TimelineCard project={project} align="right" isOngoing={isOngoing} />}
        </div>
        <div className="flex justify-center pt-1">
          <Dot year={project.year} isOngoing={isOngoing} />
        </div>
        <div className="pl-6">
          {!isLeft && <TimelineCard project={project} align="left" isOngoing={isOngoing} />}
        </div>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <div className="animate-fade-in">
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <h2 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Project Timeline
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h2>
        <p className="text-text-tertiary max-w-[600px] mx-auto">
          Five decades of crafting landmark residences across Mumbai&apos;s western suburbs — from our earliest foundations to the present day.
        </p>
      </div>

      <div className="py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-[1100px] mx-auto relative">

          {/* Vertical line — desktop: centred, mobile: left-aligned at dot centre */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-gold/40 -translate-x-1/2" />
          <div className="md:hidden absolute left-[47px] top-0 bottom-0 w-[3px] bg-gold/40" />

          {decades.map((decade) => (
            <div key={decade}>
              <DecadeBanner label={decade} />
              {grouped[decade].map((project, idx) => (
                <TimelineItem
                  key={`${project.name}-${project.year}`}
                  project={project}
                  index={idx}
                  isOngoing={false}
                />
              ))}
            </div>
          ))}

          <DecadeBanner label="Ongoing" isOngoing />
          {ongoingProjects.map((project, idx) => (
            <TimelineItem
              key={project.name}
              project={project}
              index={idx}
              isOngoing
            />
          ))}

          <DecadeBanner label="Upcoming" isOngoing />
          {upcomingProjects.map((project, idx) => (
            <TimelineItem
              key={project.name}
              project={project}
              index={idx}
              isOngoing
            />
          ))}

        </div>
      </div>
    </div>
  );
}
