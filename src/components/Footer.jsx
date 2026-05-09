import { Link } from 'react-router-dom';

const MAPS_URL = 'https://maps.google.com/?q=F-34+Sej+Plaza+Marve+Road+Malad+West+Mumbai+400064';

const SOCIAL = {
  instagram: 'https://www.instagram.com/u.k.builders',
  facebook: 'https://www.facebook.com/people/UK-Builders/100089528300390/',
  whatsapp: 'https://wa.me/919820311177',
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FooterHeading({ children }) {
  return (
    <div className="mb-5">
      <h4 className="text-white text-xs tracking-[3px] uppercase font-normal m-0 mb-3">{children}</h4>
      <div className="w-8 h-[1px] bg-gold" />
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-white/50 hover:text-gold text-[13px] tracking-[0.5px] no-underline transition-colors duration-300 leading-none"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#040e1e] text-white">
      {/* Gold top accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Main grid */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1 — Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <img
              src="/images/company/logo/U.K. Builders Logo (Square) copy.jpg"
              alt="U.K. Builders Logo"
              className="h-12 w-auto mix-blend-screen brightness-110"
            />
            <span className="font-serif text-lg tracking-[2px] uppercase text-white">U.K. Builders</span>
          </div>
          <p className="text-white/45 text-[13px] leading-relaxed mb-6">
            Crafting homes in Orlem, Malad West since 1969. Over 55 years of trust, quality, and community.
          </p>
          <div className="flex gap-3">
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
                className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Projects */}
        <div>
          <FooterHeading>Projects</FooterHeading>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            <FooterLink to="/projects/ongoing">Ongoing Projects</FooterLink>
            <FooterLink to="/projects/upcoming">Upcoming Projects</FooterLink>
            <FooterLink to="/projects/completed">Completed Projects</FooterLink>
            <FooterLink to="/gallery">Photo Gallery</FooterLink>
            <FooterLink to="/timeline">Project Timeline</FooterLink>
          </ul>
        </div>

        {/* Column 3 — Company */}
        <div>
          <FooterHeading>Company</FooterHeading>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            <FooterLink to="/our-story">Our Legacy</FooterLink>
            <FooterLink to="/history">Company History</FooterLink>
            <FooterLink to="/investors">For Investors</FooterLink>
            <FooterLink to="/redevelopment">Redevelopment</FooterLink>
            <FooterLink to="/contractors">For Contractors</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/owner-portal">Owner Portal</FooterLink>
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <FooterHeading>Get In Touch</FooterHeading>
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
            <li>
              <p className="text-white/30 text-[10px] tracking-[2px] uppercase mb-1">Office</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-gold text-[13px] leading-relaxed no-underline transition-colors duration-300"
              >
                F-34, Sej Plaza, Marve Road,<br />Malad West, Mumbai — 400 064
              </a>
            </li>
            <li>
              <p className="text-white/30 text-[10px] tracking-[2px] uppercase mb-1">Phone</p>
              <a href="tel:+919820311177" className="text-white/50 hover:text-gold text-[13px] no-underline transition-colors duration-300">
                +91 98203 11177
              </a>
            </li>
            <li>
              <p className="text-white/30 text-[10px] tracking-[2px] uppercase mb-1">Email</p>
              <a href="mailto:u.k.builders1981@gmail.com" className="text-white/50 hover:text-gold text-[13px] no-underline transition-colors duration-300">
                u.k.builders1981@gmail.com
              </a>
            </li>
            <li className="pt-1">
              <Link
                to="/book-a-call"
                className="inline-block border border-gold/50 text-gold text-[11px] tracking-[2px] uppercase px-5 py-2.5 no-underline hover:bg-gold hover:text-white transition-all duration-300"
              >
                Book a Video Call
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-[11px] tracking-[0.5px] m-0">
            &copy; {new Date().getFullYear()} U.K. Builders. All rights reserved.
          </p>
          <p className="text-white/25 text-[11px] tracking-[0.5px] m-0 text-center">
            MahaRERA Registration pending · Projects in Orlem, Malad West, Mumbai
          </p>
          <div className="flex gap-5">
            <Link to="/contact" className="text-white/25 hover:text-gold text-[11px] tracking-[1px] uppercase no-underline transition-colors duration-300">Contact</Link>
            <Link to="/resources" className="text-white/25 hover:text-gold text-[11px] tracking-[1px] uppercase no-underline transition-colors duration-300">Knowledge Hub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
