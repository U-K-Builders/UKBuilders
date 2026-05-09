import { Link } from 'react-router-dom';

const MAPS_URL = 'https://maps.google.com/?q=F-34+Sej+Plaza+Marve+Road+Malad+West+Mumbai+400064';

const SOCIAL = {
  instagram: 'https://www.instagram.com/u.k.builders',
  facebook: 'https://www.facebook.com/people/UK-Builders/100089528300390/',
  whatsapp: 'https://wa.me/919820311177',
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const NAV_COLS = [
  {
    heading: 'Projects',
    links: [
      { to: '/projects/ongoing',   label: 'Ongoing Projects'   },
      { to: '/projects/upcoming',  label: 'Upcoming Projects'  },
      { to: '/projects/completed', label: 'Completed Projects' },
      { to: '/gallery',            label: 'Photo Gallery'      },
      { to: '/timeline',           label: 'Project Timeline'   },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/our-story',     label: 'Our Legacy'      },
      { to: '/history',       label: 'Company History' },
      { to: '/investors',     label: 'For Investors'   },
      { to: '/redevelopment', label: 'Redevelopment'   },
      { to: '/contractors',   label: 'For Contractors' },
      { to: '/careers',       label: 'Careers'         },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { to: '/resources',    label: 'Knowledge Hub' },
      { to: '/book-a-call',  label: 'Book a Call'   },
      { to: '/owner-portal', label: 'Owner Portal'  },
      { to: '/contact',      label: 'Contact Us'    },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#040d1a] text-white">
      {/* Gold gradient top accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Brand hero row */}
      <div className="text-center pt-16 pb-10 px-6 border-b border-white/8">
        <div className="flex items-center justify-center gap-5 mb-5">
          <img
            src="/images/company/logo/U.K. Builders Logo (Square) copy.jpg"
            alt="U.K. Builders Logo"
            className="h-[68px] w-auto mix-blend-screen brightness-110"
          />
          <div className="text-left">
            <h2 className="font-serif text-[32px] md:text-[38px] tracking-[4px] uppercase text-white m-0 leading-none">
              U.K. Builders
            </h2>
            <p className="text-[10px] tracking-[4px] uppercase text-gold/70 mt-2 m-0">Est. 1969 · Orlem, Malad West, Mumbai</p>
          </div>
        </div>

        <p className="text-white/40 text-[13px] tracking-wide max-w-md mx-auto leading-relaxed mt-4 mb-8">
          Over five decades of crafting homes that endure — built on trust, quality, and community.
        </p>

        {/* Contact details */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-[13px] mb-8">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-white transition-colors duration-300 no-underline"
          >
            F-34, Sej Plaza, Marve Road, Malad West, Mumbai — 400 064
          </a>
          <span className="hidden md:block text-white/20">|</span>
          <a href="tel:+919820311177" className="text-white/60 hover:text-gold transition-colors duration-300 no-underline tracking-wide">
            +91 98203 11177
          </a>
          <span className="hidden md:block text-white/20">|</span>
          <a href="mailto:u.k.builders1981@gmail.com" className="text-white/60 hover:text-gold transition-colors duration-300 no-underline">
            u.k.builders1981@gmail.com
          </a>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-3">
          {[
            { href: SOCIAL.instagram, label: 'Instagram', Icon: InstagramIcon },
            { href: SOCIAL.facebook,  label: 'Facebook',  Icon: FacebookIcon  },
            { href: SOCIAL.whatsapp,  label: 'WhatsApp',  Icon: WhatsAppIcon  },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 border border-gold/30 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all duration-300"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Nav columns */}
      <div className="max-w-[1000px] mx-auto px-8 py-14 grid grid-cols-2 md:grid-cols-3 gap-10">
        {NAV_COLS.map(({ heading, links }) => (
          <div key={heading}>
            <div className="mb-5">
              <h4 className="font-serif text-[15px] tracking-[1px] text-gold font-normal m-0 mb-2">{heading}</h4>
              <div className="w-6 h-[1px] bg-gold/40" />
            </div>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/40 hover:text-gold text-[12px] tracking-[1px] uppercase no-underline transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] tracking-[0.5px] text-white/25">
        <span>&copy; {new Date().getFullYear()} U.K. Builders. All rights reserved.</span>
        <span className="text-center">MahaRERA Registration Pending · Projects in Orlem, Malad West</span>
        <span>Designed with care in Mumbai</span>
      </div>
    </footer>
  );
}
