import { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { ongoingProjects } from '../data/projects';
import { projectDetails } from '../data/projectDetails';

function getBHKTypes(configs) {
  const nums = configs.match(/\d+/g);
  return nums ? nums.map((n) => `${n} BHK`) : [];
}

function projectHasShops(name) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return projectDetails[slug]?.shops?.length > 0;
}

const BHK_OPTIONS = ['All', ...Array.from(
  new Set(ongoingProjects.flatMap((p) => getBHKTypes(p.configs)))
).sort((a, b) => parseInt(a) - parseInt(b))];

const HAS_ANY_SHOPS = ongoingProjects.some((p) => projectHasShops(p.name));

export default function OngoingProjectsPage() {
  const [query, setQuery]       = useState('');
  const [bhk, setBhk]           = useState('All');
  const [shopsOnly, setShopsOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ongoingProjects.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      const matchesBHK =
        bhk === 'All' || getBHKTypes(p.configs).includes(bhk);
      const matchesShops =
        !shopsOnly || projectHasShops(p.name);
      return matchesSearch && matchesBHK && matchesShops;
    });
  }, [query, bhk, shopsOnly]);

  return (
    <div className="animate-fade-in">
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <h1 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Ongoing Masterpieces
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h1>
        <p className="text-text-tertiary max-w-[600px] mx-auto">
          Discover our current developments shaping the future of Mumbai&apos;s skyline with signature luxury and precision.
        </p>

        {/* Search + filter */}
        <div className="mt-10 max-w-[640px] mx-auto flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or location…"
              className="w-full bg-white border border-border-light pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors duration-300"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors duration-200"
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* BHK + Shops filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {BHK_OPTIONS.map((type) => (
              <button
                key={type}
                onClick={() => setBhk(type)}
                className={`px-5 py-2 text-xs uppercase tracking-[2px] border transition-all duration-200 cursor-pointer ${
                  bhk === type
                    ? 'bg-gold border-gold text-navy'
                    : 'bg-white border-border-light text-text-muted hover:border-gold hover:text-navy'
                }`}
              >
                {type}
              </button>
            ))}
            {HAS_ANY_SHOPS && (
              <button
                onClick={() => setShopsOnly((v) => !v)}
                className={`px-5 py-2 text-xs uppercase tracking-[2px] border transition-all duration-200 cursor-pointer ${
                  shopsOnly
                    ? 'bg-navy border-navy text-white'
                    : 'bg-white border-border-light text-text-muted hover:border-navy hover:text-navy'
                }`}
              >
                Shops / Commercial
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24 px-5 bg-surface-subtle">
        <div className="max-w-[1200px] mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filtered.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted uppercase tracking-[3px] text-sm mb-3">No projects found</p>
              <p className="text-text-muted text-sm mb-6">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setQuery(''); setBhk('All'); setShopsOnly(false); }}
                className="text-gold border border-gold px-6 py-2 text-sm uppercase tracking-[2px] hover:bg-gold hover:text-navy transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
