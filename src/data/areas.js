// Local area pages for buyers searching "flats in Malad West / Orlem".
// One entry = one page at /<slug>, rendered by src/pages/AreaPage.jsx and
// routed in src/App.jsx; `meta` is its search title and description
// (merged into PAGE_META in pageMeta.js).
// STUB: owned by feature/security-speed (Phase 3), which writes the content.
// Use only confirmed facts (see src/data/site.js); anything else is a TODO.
export const areas = [
  {
    slug: 'flats-in-malad-west',
    title: 'Flats in Malad West',
    intro: 'Coming soon.', // TODO(feature/security-speed): page content
    meta: {
      title: 'Flats in Malad West, Mumbai | U.K. Builders',
      description: 'Homes by U.K. Builders in Malad West, Mumbai, building here since 1969. Now presenting Justin and Christina in Orlem.',
    },
  },
  {
    slug: 'flats-in-orlem',
    title: 'Flats in Orlem',
    intro: 'Coming soon.', // TODO(feature/security-speed): page content
    meta: {
      title: 'Flats in Orlem, Malad West | U.K. Builders',
      description: 'Homes by U.K. Builders in Orlem, Malad West, building here since 1969. Now presenting Justin and Christina.',
    },
  },
];

export const AREA_CTA = { label: 'See our ongoing projects', to: '/projects/ongoing' };
