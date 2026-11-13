// Per-route <title> and meta description, applied by usePageMeta from
// RouteMeta in src/App.jsx (project pages set their own in ProjectDetailPage).
// Keep descriptions under ~155 characters. Owned by feature/security-speed.
import { CONTACT } from './site';
import { areas } from './areas';

export const DEFAULT_META = {
  title: 'U.K. Builders | Residential Developer in Malad West, Mumbai since 1969',
  description:
    'U.K. Builders: homes in Orlem and Malad West, Mumbai since 1969. 50+ projects and 3,000+ families. Now presenting Justin and Christina.',
};

export const PAGE_META = {
  '/': DEFAULT_META,
  '/projects/ongoing': {
    title: 'Ongoing Projects | U.K. Builders',
    description: 'Justin and Christina: 2, 3 and 4 BHK homes under construction in Orlem, Malad West. MahaRERA registered. Floor plans, progress and site visits.',
  },
  '/projects/upcoming': {
    title: 'Upcoming Projects | U.K. Builders',
    description: 'Upcoming U.K. Builders residences in Malad West, Mumbai. Join the pre-launch waitlist for early pricing and floor plans.',
  },
  '/projects/completed': {
    title: 'Completed Projects | U.K. Builders',
    description: 'Five decades of completed homes across Orlem, Lourdes Colony and Malad West, from Shivam Apartments (1972) to Silver Coin (2024).',
  },
  '/history': {
    title: 'Our History | U.K. Builders',
    description: 'From 1969 to today: the story of U.K. Builders, three generations of building homes in Malad West, Mumbai.',
  },
  '/our-story': {
    title: 'Our Story | U.K. Builders',
    description: 'The family behind U.K. Builders, U.K. Properties and U.K. Homes, and the values that have guided every building since 1969.',
  },
  '/timeline': {
    title: 'Project Timeline | U.K. Builders',
    description: 'Every U.K. Builders project on one timeline, from the first building in 1972 to Justin and Christina today.',
  },
  '/gallery': {
    title: 'Gallery | U.K. Builders',
    description: 'Photos of U.K. Builders residences across Orlem and Malad West, Mumbai.',
  },
  '/resources': {
    title: 'Buyer Guides | U.K. Builders',
    description: 'Free guides for home buyers in Mumbai: NRI buying, RERA checklist, home loan basics and carpet area explained.',
  },
  '/contact': {
    title: 'Contact Us | U.K. Builders',
    description: `Call ${CONTACT.phone.display}, WhatsApp us, or visit our office at Sej Plaza, Marve Road, Malad West, Mumbai 400 064.`,
  },
  '/book-a-call': {
    title: 'Book a Video Call | U.K. Builders',
    description: 'Book a video site visit of Justin or Christina from anywhere in the world. Ideal for NRI buyers.',
  },
  '/investors': {
    title: 'Investors | U.K. Builders',
    description: 'Invest in residential projects in Malad West, Mumbai with a developer building since 1969.',
  },
  '/redevelopment': {
    title: 'Society Redevelopment in Malad West | U.K. Builders',
    description: 'Redevelopment for housing societies in Malad West and Orlem. A local developer since 1969, with 50+ buildings delivered.',
  },
  '/contractors': {
    title: 'Contractors & Vendors | U.K. Builders',
    description: 'Register as a contractor, supplier or vendor with U.K. Builders in Mumbai.',
  },
  '/careers': {
    title: 'Careers | U.K. Builders',
    description: 'Join U.K. Builders: site, engineering, sales and office roles in Malad West, Mumbai.',
  },
  '/privacy': {
    title: 'Privacy Policy | U.K. Builders',
    description: 'How U.K. Builders uses the details you share when you enquire about our homes.',
  },
  '/disclaimer': {
    title: 'Disclaimer | U.K. Builders',
    description: 'Disclaimer for the U.K. Builders website.',
  },
  ...Object.fromEntries(areas.map((a) => [`/${a.slug}`, a.meta])),
};

export const NOT_FOUND_META = {
  title: 'Page Not Found | U.K. Builders',
  description: DEFAULT_META.description,
};
