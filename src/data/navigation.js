// Menus and the short labels around them. Used by Header (desktop and
// mobile menu), Footer (link columns) and MobileActionBar.
// Edit menu items and their wording here, not in the components.
// Owned by feature/navigation-design (Phase 3), which redesigns the menu.

// Main menu: an entry with `items` is a dropdown; `match` says which pages
// highlight it.
export const MAIN_NAV = [
  {
    label: 'Projects',
    match: (p) => p.startsWith('/projects') || p === '/gallery',
    items: [
      { to: '/projects/ongoing', label: 'Ongoing Projects' },
      { to: '/projects/completed', label: 'Completed Projects' },
      { to: '/gallery', label: 'Photo Gallery' },
    ],
  },
  {
    label: 'About',
    match: (p) => ['/our-story', '/history', '/timeline'].includes(p),
    items: [
      { to: '/our-story', label: 'Our Legacy' },
      { to: '/history', label: 'Company History' },
      { to: '/timeline', label: 'Project Timeline' },
    ],
  },
  {
    label: 'Work With Us',
    match: (p) => ['/investors', '/redevelopment', '/contractors', '/careers'].includes(p),
    items: [
      { to: '/redevelopment', label: 'Redevelopment' },
      { to: '/investors', label: 'For Investors' },
      { to: '/contractors', label: 'For Contractors' },
      { to: '/careers', label: 'Careers' },
    ],
  },
  { to: '/resources', label: 'Buyer Guides' },
  {
    label: 'Contact',
    match: (p) => ['/contact', '/book-a-call'].includes(p),
    items: [
      { to: '/contact', label: 'Contact Us' },
      { to: '/book-a-call', label: 'Book a Video Call' },
    ],
  },
];

export const FOOTER_NAV = [
  {
    heading: 'Projects',
    links: [
      { to: '/projects/ongoing', label: 'Ongoing Projects' },
      { to: '/projects/completed', label: 'Completed Projects' },
      { to: '/gallery', label: 'Photo Gallery' },
      { to: '/timeline', label: 'Project Timeline' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/our-story', label: 'Our Legacy' },
      { to: '/history', label: 'Company History' },
      { to: '/investors', label: 'For Investors' },
      { to: '/redevelopment', label: 'Redevelopment' },
      { to: '/contractors', label: 'For Contractors' },
      { to: '/careers', label: 'Careers' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { to: '/resources', label: 'Knowledge Hub' },
      { to: '/book-a-call', label: 'Book a Call' },
      { to: '/contact', label: 'Contact Us' },
    ],
  },
];

// Where the "Enquire" buttons go.
export const ENQUIRE_PATH = '/contact';

export const LABELS = {
  skipToContent: 'Skip to content',
  home: 'Home',
  homeAria: 'U.K. Builders home',
  mainMenu: 'Main',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  darkMode: 'Switch to dark mode',
  lightMode: 'Switch to light mode',
  enquire: 'Enquire',
  enquireNow: 'Enquire Now',
  call: 'Call',
  whatsapp: 'WhatsApp',
  quickContact: 'Quick contact',
  officePrefix: 'Corporate Office:',
  enquiriesPrefix: 'Inquiries:',
  backToTop: 'Back to top',
};
