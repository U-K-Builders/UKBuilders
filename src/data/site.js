// Company facts, contact details and shared wording for the whole site.
// Used by the Header, Footer, MobileActionBar, ContactPage, forms
// (useLeadSubmit, ConsentNote), ReraBadge, projectDetails.js and other pages.
//
// Edit contact details HERE, never in components. Only facts the owner has
// confirmed belong here. `null` + TODO means "still to come from the owner":
// components show nothing for it, so never fill one in with a guess.
// This repo is public: no personal phone numbers, IDs or customer data.

export const COMPANY = {
  name: 'U.K. Builders',
  // Both businesses are partnership firms, so there is no CIN to show.
  firms: ['U.K. Builders', 'U.K. Properties'],
  firmType: 'Partnership firm',
  gstin: null, // TODO(owner): GSTIN to show in the footer.
  buildingSince: 1969,
  founded: 1981,
  projects: '50+',
  families: '3,000+',
};

const PHONE = '+919820311177';
const WHATSAPP = '917710038007';

export const CONTACT = {
  phone: { display: '+91 98203 11177', href: `tel:${PHONE}` },
  whatsapp: { display: '+91 77100 38007', href: `https://wa.me/${WHATSAPP}` },
  // Pre-filled first message when a visitor taps a WhatsApp button.
  whatsappMessage: "Hi U.K. Builders, I'd like to know more about your projects.",
  email: { display: 'u.k.builders1981@gmail.com', href: 'mailto:u.k.builders1981@gmail.com' },
  office: {
    label: 'Corporate Office',
    street: 'F-34, Sej Plaza, Marve Road',
    area: 'Malad West, Mumbai 400 064',
    mapsUrl: 'https://www.google.com/maps/place/U.K.+Builders/@19.1919081,72.8456841,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b7c9ca97e5d3:0x1a74ea6695565d49!8m2!3d19.1919081!4d72.8456841!16s%2Fg%2F11z7lgtw7p!18m1!1e1',
  },
  person: null,     // TODO(owner): name (and photo) of the person buyers will speak to.
  visitHours: null, // TODO(owner): office and site-visit hours.
};

/** WhatsApp chat link, optionally with a first message already typed. */
export function whatsappLink(message = CONTACT.whatsappMessage) {
  return message ? `${CONTACT.whatsapp.href}?text=${encodeURIComponent(message)}` : CONTACT.whatsapp.href;
}

export const SOCIAL = [
  { name: 'Instagram', label: 'Follow us on Instagram', href: 'https://www.instagram.com/u.k.builders' },
  { name: 'Facebook', label: 'Follow us on Facebook', href: 'https://www.facebook.com/people/UK-Builders/100089528300390/' },
  { name: 'LinkedIn', label: 'Connect with us on LinkedIn', href: 'https://www.linkedin.com/company/u-k-builders-1981/' },
  { name: 'WhatsApp', label: 'Chat with us on WhatsApp', href: CONTACT.whatsapp.href },
];

// MahaRERA registration per project, keyed by project slug (the URL name).
// Shown by ReraBadge. A project without a number here must not be advertised.
export const RERA = {
  label: 'MahaRERA',
  website: 'https://maharera.maharashtra.gov.in',
  projects: {
    // TODO(owner, issue #51): MahaRERA QR code images. Put them in
    // photos/rera/ and set `qr` to '/images/rera/<file>' (feature/trust).
    justin: { name: 'Justin', number: 'PR1180002500760', qr: null },
    christina: { name: 'Christina', number: 'PR1180002600221', qr: null },
  },
};

// One line under every form (placed by ConsentNote).
export const CONSENT = {
  text: "We'll use your details only to contact you about our projects.",
  linkLabel: 'Privacy policy',
  linkTo: '/privacy',
};

// Small print at the bottom of the footer. Owned by feature/trust: add the
// disclaimer text and the Privacy / Disclaimer links once those pages are
// written (lawyer to review). Empty values show nothing.
export const LEGAL = {
  copyright: 'All rights reserved.',
  locality: 'Orlem, Malad West, Mumbai',
  disclaimer: null, // TODO(feature/trust): short disclaimer line, lawyer to review.
  links: [],        // e.g. { to: '/privacy', label: 'Privacy policy' }
};
