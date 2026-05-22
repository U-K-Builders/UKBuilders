import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import AccessibilityPanel from './AccessibilityPanel';
import { useAuth } from '../context/AuthContext';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const location = useLocation();
  const [dark, toggleDark] = useTheme();
  const { isAdmin, logout } = useAuth();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [legacyOpen, setLegacyOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileLegacyOpen, setMobileLegacyOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isProjectsActive = location.pathname.startsWith('/projects');
  const isLegacyActive = ['/our-story', '/history', '/timeline'].includes(location.pathname);
  const isContactActive = ['/contact', '/book-a-call', '/investors', '/redevelopment', '/contractors'].includes(location.pathname);

  const navLinkClass = (active) =>
    `text-[0.8125rem] tracking-[1px] uppercase no-underline pb-1 transition-all duration-300 border-b-2 leading-none ${
      active ? 'text-gold border-gold' : 'text-white border-transparent hover:text-gold hover:border-gold'
    }`;

  const dropdownLinkClass = 'block px-5 py-4 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white border-b border-white/5 hover:bg-white/5 hover:text-gold transition-all duration-300';

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileProjectsOpen(false);
    setMobileLegacyOpen(false);
    setMobileContactOpen(false);
  };

  return (
    <header className={`text-gold px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-navy/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.35)]' : 'py-5 bg-navy shadow-[0_2px_15px_rgba(0,0,0,0.2)]'}`}>
      <Link to="/" className="no-underline" onClick={closeMobile}>
        <h1 className="m-0 text-xl md:text-2xl tracking-[2px] uppercase font-serif text-gold cursor-pointer">
          U.K. Builders
        </h1>
      </Link>

      <div className="flex items-center gap-3">
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className={navLinkClass(isActive('/'))}>Home</Link>

          {/* Projects dropdown */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <span className={`${navLinkClass(isProjectsActive)} cursor-pointer`}>Projects</span>
            {projectsOpen && (
              <div className="animate-dropdown absolute top-full left-0 mt-[1px] bg-navy min-w-[220px] shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-t-2 border-gold z-50">
                <Link to="/projects/ongoing" className={dropdownLinkClass}>Ongoing Projects</Link>
                {isAdmin && <Link to="/projects/upcoming" className={dropdownLinkClass}>Upcoming Projects</Link>}
                <Link to="/projects/completed" className={dropdownLinkClass}>Completed Projects</Link>
              </div>
            )}
          </div>

          {/* Our Legacy dropdown */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setLegacyOpen(true)}
            onMouseLeave={() => setLegacyOpen(false)}
          >
            <span className={`${navLinkClass(isLegacyActive)} cursor-pointer`}>About Us</span>
            {legacyOpen && (
              <div className="animate-dropdown absolute top-full left-0 mt-[1px] bg-navy min-w-[220px] shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-t-2 border-gold z-50">
                <Link to="/our-story" className={dropdownLinkClass}>Our Legacy</Link>
                <Link to="/history" className={dropdownLinkClass}>Company History</Link>
                <Link to="/timeline" className="block px-5 py-4 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white hover:bg-white/5 hover:text-gold transition-all duration-300">
                  Project Timeline
                </Link>
              </div>
            )}
          </div>

          <Link to="/careers" className={navLinkClass(isActive('/careers'))}>Careers</Link>

          {/* Contact dropdown */}

          <div
            className="relative flex items-center"
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <span className={`${navLinkClass(isContactActive)} cursor-pointer`}>Contact</span>
            {contactOpen && (
              <div className="animate-dropdown absolute top-full right-0 mt-[1px] bg-navy min-w-[240px] shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-t-2 border-gold z-50">
                <Link to="/contact" className={dropdownLinkClass}>Contact Us</Link>
                <Link to="/book-a-call" className={dropdownLinkClass}>Book a Video Call</Link>
                <div className="border-t border-white/10 mx-5 my-1" />
                <Link to="/investors" className={dropdownLinkClass}>For Investors</Link>
                <Link to="/redevelopment" className={dropdownLinkClass}>For Redevelopment</Link>
                <Link to="/contractors" className={dropdownLinkClass}>For Contractors</Link>
              </div>
            )}
          </div>

          <Link to="/owner-portal" className={navLinkClass(isActive('/owner-portal'))}>Owner Portal</Link>

          {isAdmin && (
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-1">
              <span className="text-[0.625rem] uppercase tracking-[2px] text-gold/70">Admin</span>
              <button
                onClick={() => logout()}
                className="text-[0.625rem] uppercase tracking-[1px] text-white/40 hover:text-gold transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>

        {/* Accessibility panel */}
        <AccessibilityPanel />

        {/* Theme toggle */}
        <button
          onClick={toggleDark}
          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-gold transition-colors duration-300 bg-transparent border-none cursor-pointer shrink-0"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[2px] bg-gold transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-gold transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-gold transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Click-outside overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={closeMobile} aria-hidden="true" />
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-navy border-t-2 border-gold shadow-[0_8px_16px_rgba(0,0,0,0.4)] md:hidden z-50">
          <Link
            to="/"
            onClick={closeMobile}
            className={`block px-6 py-4 text-[0.8125rem] tracking-[1px] uppercase no-underline border-b border-white/5 transition-all duration-300 ${
              isActive('/') ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
            }`}
          >
            Home
          </Link>

          {/* Mobile Projects */}
          <div>
            <button
              onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
              className={`w-full text-left px-6 py-4 text-[0.8125rem] tracking-[1px] uppercase bg-transparent border-none border-b border-white/5 cursor-pointer transition-all duration-300 ${
                isProjectsActive ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
              }`}
            >
              Projects
            </button>
            {mobileProjectsOpen && (
              <div className="bg-white/5">
                <Link to="/projects/ongoing" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Ongoing Projects</Link>
                {isAdmin && <Link to="/projects/upcoming" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Upcoming Projects</Link>}
                <Link to="/projects/completed" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Completed Projects</Link>
              </div>
            )}
          </div>

          {/* Mobile Our Legacy */}
          <div>
            <button
              onClick={() => setMobileLegacyOpen(!mobileLegacyOpen)}
              className={`w-full text-left px-6 py-4 text-[0.8125rem] tracking-[1px] uppercase bg-transparent border-none border-b border-white/5 cursor-pointer transition-all duration-300 ${
                isLegacyActive ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
              }`}
            >
              About Us
            </button>
            {mobileLegacyOpen && (
              <div className="bg-white/5">
                <Link to="/our-story" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Our Legacy</Link>
                <Link to="/history" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Company History</Link>
                <Link to="/timeline" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Project Timeline</Link>
              </div>
            )}
          </div>

          <Link
            to="/careers"
            onClick={closeMobile}
            className={`block px-6 py-4 text-[0.8125rem] tracking-[1px] uppercase no-underline border-b border-white/5 transition-all duration-300 ${
              isActive('/careers') ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
            }`}
          >
            Careers
          </Link>

          {/* Mobile Contact */}
          <div>
            <button
              onClick={() => setMobileContactOpen(!mobileContactOpen)}
              className={`w-full text-left px-6 py-4 text-[0.8125rem] tracking-[1px] uppercase bg-transparent border-none border-b border-white/5 cursor-pointer transition-all duration-300 ${
                isContactActive ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
              }`}
            >
              Contact
            </button>
            {mobileContactOpen && (
              <div className="bg-white/5">
                <Link to="/contact" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Contact Us</Link>
                <Link to="/book-a-call" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Book a Video Call</Link>
                <Link to="/investors" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">For Investors</Link>
                <Link to="/redevelopment" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">For Redevelopment</Link>
                <Link to="/contractors" onClick={closeMobile} className="block px-10 py-3 text-[0.8125rem] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300">For Contractors</Link>
              </div>
            )}
          </div>

          <Link
            to="/owner-portal"
            onClick={closeMobile}
            className={`block px-6 py-4 text-[0.8125rem] tracking-[1px] uppercase no-underline border-b border-white/5 transition-all duration-300 ${
              isActive('/owner-portal') ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
            }`}
          >
            Owner Portal
          </Link>

          {isAdmin ? (
            <button
              onClick={() => { logout(); closeMobile(); }}
              className="w-full text-left px-6 py-4 text-[0.8125rem] tracking-[1px] uppercase bg-transparent border-none border-b border-white/5 cursor-pointer text-gold/70 hover:text-gold hover:bg-white/5 transition-all duration-300"
            >
              Admin — Sign Out
            </button>
          ) : (
            <Link
              to="/admin"
              onClick={closeMobile}
              className="block px-6 py-4 text-[0.8125rem] tracking-[1px] uppercase no-underline border-b border-white/5 text-white/30 hover:text-gold hover:bg-white/5 transition-all duration-300"
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
