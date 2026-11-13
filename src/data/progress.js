// Construction progress per project, keyed by project slug. Read by
// projectDetails.js, so it shows on the project page (stepper) and on
// ProjectCard (% ring). Owned by feature/trust (Phase 3).
//
// TODO(owner, issue #52): everything below is STALE. It was written around
// Q2 2026 and has not been confirmed since. Replace it with the owner's
// current stage for each building, set `updated` to the date the owner
// confirmed it (YYYY-MM-DD), and give `percent` only if the owner gives an
// honest figure (else null). Step `status`: 'done' | 'active' | 'upcoming'.
export const progress = {
  justin: {
    updated: null, // TODO(owner): date this was last confirmed
    percent: 60,   // TODO(owner): stale, unconfirmed
    steps: [
      { label: 'Foundation & Excavation', date: 'Q3 2025', status: 'done' },
      { label: 'Plinth Level', date: 'Q4 2025', status: 'done' },
      { label: 'Structure: 5th Floor', date: 'Q1 2026', status: 'done' },
      { label: 'Structure: 10th Floor', date: 'Q2 2026', status: 'active' },
      { label: 'Structure: 15th Floor', date: 'Q3 2026', status: 'upcoming' },
      { label: 'RCC Complete', date: 'Q4 2026', status: 'upcoming' },
      { label: 'Facade & Brickwork', date: 'Q1 2027', status: 'upcoming' },
      { label: 'Interior Finishing', date: 'Q2 2027', status: 'upcoming' },
      { label: 'Possession', date: 'Q3 2027', status: 'upcoming' },
    ],
  },
  christina: {
    updated: null, // TODO(owner): date this was last confirmed
    percent: 15,   // TODO(owner): stale, unconfirmed
    steps: [
      { label: 'Foundation & Excavation', date: 'Q2 2026', status: 'active' },
      { label: 'Plinth Level', date: 'Q3 2026', status: 'upcoming' },
      { label: 'Structure: 5th Floor', date: 'Q1 2027', status: 'upcoming' },
      { label: 'Structure: 10th Floor', date: 'Q2 2027', status: 'upcoming' },
      { label: 'Structure: 15th Floor', date: 'Q3 2027', status: 'upcoming' },
      { label: 'RCC Complete', date: 'Q4 2027', status: 'upcoming' },
      { label: 'Facade & Brickwork', date: 'Q1 2028', status: 'upcoming' },
      { label: 'Interior Finishing', date: 'Q1 2028', status: 'upcoming' },
      { label: 'Possession', date: 'Q3 2028', status: 'upcoming' },
    ],
  },
  // Hidden project (not MahaRERA registered yet): never shown.
  elvira: {
    updated: null,
    percent: null,
    steps: [
      { label: 'Foundation & Excavation', date: 'Q2 2024', status: 'done' },
      { label: 'Plinth Level', date: 'Q4 2024', status: 'done' },
      { label: 'Structure: 5th Floor', date: 'Q2 2025', status: 'done' },
      { label: 'RCC Complete', date: 'Q4 2025', status: 'done' },
      { label: 'Facade & Finishing', date: 'Q2 2026', status: 'active' },
      { label: 'Possession', date: '2027', status: 'upcoming' },
    ],
  },
};
