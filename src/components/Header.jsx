import { useState, useEffect, useRef, useId } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import AccessibilityPanel from './AccessibilityPanel';

const LOGO = '/images/logo/uk-builders-logo-square.png';

/* Single source of truth for desktop and mobile navigation */
const NAV = [
  {
    label: 'Projects',
    match: (p) => p.startsWith('/projects') || p === '/gallery',
    items: [
      { to: '/projects/ongoing', label: 'Ongoing Projects' },
      { to: '/projects/upcoming', label: 'Upcoming Projects', adminOnly: true },
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

function Chevron({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Desktop dropdown: opens on hover, click, or keyboard; closes on Escape / focus leaving */
function NavDropdown({ group, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const menuId = useId();
  const items = group.items.filter((i) => !i.adminOnly);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus(); } };
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget)) setOpen(false); }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 min-h-[44px] px-1 text-sm tracking-[0.12em] uppercase bg-transparent border-0 cursor-pointer transition-colors duration-200 ${active ? 'text-gold' : 'text-white hover:text-gold'}`}
      >
        {group.label}
        <Chevron open={open} />
      </button>
      {open && (
        <ul id={menuId} className="animate-dropdown absolute top-full left-0 m-0 p-0 list-none bg-navy min-w-[240px] shadow-[0_12px_32px_rgba(0,0,0,0.45)] border-t-2 border-gold z-50">
          {items.map((item) => (
            <li key={item.to || item.label}>
              {item.onClick ? (
                <button
                  type="button"
                  onClick={() => { setOpen(false); item.onClick(); }}
                  className="w-full text-left flex items-center min-h-[48px] px-5 text-sm tracking-[0.08em] uppercase bg-transparent border-0 cursor-pointer text-red-300 hover:bg-white/5"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[48px] px-5 text-sm tracking-[0.08em] uppercase no-underline text-white border-b border-white/5 hover:bg-white/5 hover:text-gold transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [dark, toggleDark] = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close the mobile menu whenever the route changes
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setMobileGroup(null);
  }

  // Lock page scroll and support Escape while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [mobileOpen]);

  const linkClass = (active) =>
    `inline-flex items-center min-h-[44px] px-1 text-sm tracking-[0.12em] uppercase no-underline transition-colors duration-200 ${active ? 'text-gold' : 'text-white hover:text-gold'}`;

  const iconBtn = 'w-11 h-11 flex items-center justify-center text-white/75 hover:text-gold transition-colors duration-200 bg-transparent border-0 cursor-pointer shrink-0';

  return (
    <header
      className={`on-dark sticky top-0 z-50 bg-navy transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.4)]' : ''}`}
    >
      <div className={`flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-12 transition-[padding] duration-300 ${scrolled ? 'py-2' : 'py-3.5'}`}>
        <Link to="/" className="flex items-center gap-3 no-underline shrink-0" aria-label="U.K. Builders home">
          <img src={LOGO} alt="" width="40" height="40" className="w-10 h-10 object-contain" />
          <span className="font-serif text-lg sm:text-xl tracking-[0.12em] uppercase text-gold leading-none">U.K. Builders</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
          {NAV.map((entry) =>
            entry.items ? (
              <NavDropdown key={entry.label} group={entry} active={entry.match(pathname)} />
            ) : (
              <Link key={entry.to} to={entry.to} className={linkClass(pathname === entry.to)} aria-current={pathname === entry.to ? 'page' : undefined}>
                {entry.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1">
          <AccessibilityPanel />
          <button onClick={toggleDark} className={iconBtn} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center min-h-[44px] ml-2 px-6 bg-gold text-navy text-sm font-semibold tracking-[0.14em] uppercase no-underline border border-gold hover:bg-gold-dark transition-colors duration-200"
          >
            Enquire
          </Link>
          <button
            className={`${iconBtn} lg:hidden`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block w-6 h-4" aria-hidden="true">
              <span className={`absolute left-0 w-6 h-[2px] bg-gold transition-all duration-300 ${mobileOpen ? 'top-[7px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-[7px] w-6 h-[2px] bg-gold transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 w-6 h-[2px] bg-gold transition-all duration-300 ${mobileOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="lg:hidden absolute top-full left-0 right-0 h-[calc(100dvh-100%)] overflow-y-auto bg-navy border-t-2 border-gold pb-[calc(96px+env(safe-area-inset-bottom))]"
        >
          <ul className="m-0 p-0 list-none">
            <li>
              <Link to="/" className="flex items-center min-h-[56px] px-6 text-base tracking-[0.1em] uppercase no-underline text-white border-b border-white/10" aria-current={pathname === '/' ? 'page' : undefined}>
                Home
              </Link>
            </li>
            {NAV.map((entry) => {
              if (!entry.items) {
                return (
                  <li key={entry.to}>
                    <Link to={entry.to} className={`flex items-center min-h-[56px] px-6 text-base tracking-[0.1em] uppercase no-underline border-b border-white/10 ${pathname === entry.to ? 'text-gold' : 'text-white'}`}>
                      {entry.label}
                    </Link>
                  </li>
                );
              }
              const open = mobileGroup === entry.label;
              const panelId = `m-${entry.label.replace(/\s+/g, '-').toLowerCase()}`;
              return (
                <li key={entry.label} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setMobileGroup(open ? null : entry.label)}
                    className={`w-full flex items-center justify-between min-h-[56px] px-6 text-base tracking-[0.1em] uppercase bg-transparent border-0 cursor-pointer ${entry.match(pathname) ? 'text-gold' : 'text-white'}`}
                  >
                    {entry.label}
                    <Chevron open={open} />
                  </button>
                  {open && (
                    <ul id={panelId} className="m-0 p-0 list-none bg-white/5">
                      {entry.items.filter((i) => !i.adminOnly).map((item) => (
                        <li key={item.to}>
                          <Link to={item.to} className={`flex items-center min-h-[48px] pl-10 pr-6 text-sm tracking-[0.08em] uppercase no-underline ${pathname === item.to ? 'text-gold' : 'text-white/85'}`}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="px-6 pt-8">
            <Link to="/contact" className="flex items-center justify-center min-h-[52px] bg-gold text-navy text-sm font-semibold tracking-[0.16em] uppercase no-underline">
              Enquire Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
