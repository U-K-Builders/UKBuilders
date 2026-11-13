// Local area page (/flats-in-malad-west, /flats-in-orlem): one per entry in
// src/data/areas.js, routed in src/App.jsx.
// STUB: owned by feature/security-speed (Phase 3), which writes the content.
import Button from '../components/Button';
import { AREA_CTA } from '../data/areas';

export default function AreaPage({ area }) {
  return (
    <div className="animate-fade-in">
      <div className="bg-surface-light py-16 px-gutter text-center border-b border-border-light">
        <h1 className="font-serif font-normal text-navy text-title sm:text-heading uppercase tracking-[3px]">
          {area.title}
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h1>
      </div>
      <div className="max-w-[720px] mx-auto py-16 px-gutter text-center">
        <p className="text-body text-text-primary mb-stack">{area.intro}</p>
        <Button to={AREA_CTA.to}>{AREA_CTA.label}</Button>
      </div>
    </div>
  );
}
