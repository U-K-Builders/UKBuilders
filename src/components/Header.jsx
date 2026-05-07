import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isProjectsActive = location.pathname.startsWith('/projects') || location.pathname === '/timeline';
  const isContactActive = ['/contact', '/book-a-call', '/investors', '/redevelopment', '/contractors'].includes(location.pathname);

  const navLinkClass = (active) =>
    `text-[13px] tracking-[1px] uppercase no-underline pb-1 transition-all duration-300 border-b-2 leading-none ${
      active ? 'text-gold border-gold' : 'text-white border-transparent hover:text-gold hover:border-gold'
    }`;

  const dropdownLinkClass = 'block px-5 py-4 text-[13px] tracking-[1px] uppercase no-underline text-white border-b border-white/5 hover:bg-white/5 hover:text-gold transition-all duration-300';

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileProjectsOpen(false);
    setMobileContactOpen(false);
  };

  return (
    <header className="bg-navy text-gold px-6 md:px-12 py-5 flex justify-between items-center sticky top-0 z-50 shadow-[0_2px_15px_rgba(0,0,0,0.2)]">
      <Link to="/" className="no-underline" onClick={closeMobile}>
        <h1 className="m-0 text-xl md:text-2xl tracking-[2px] uppercase font-serif text-gold cursor-pointer">
          U.K. Builders
        </h1>
      </Link>

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
            <div className="absolute top-full left-0 mt-[1px] bg-navy min-w-[220px] shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-t-2 border-gold z-50">
              <Link to="/projects/ongoing" className={dropdownLinkClass}>Ongoing Projects</Link>
              <Link to="/projects/upcoming" className={dropdownLinkClass}>Upcoming Projects</Link>
              <Link to="/projects/completed" className={dropdownLinkClass}>Completed Projects</Link>
              <Link to="/timeline" className="block px-5 py-4 text-[13px] tracking-[1px] uppercase no-underline text-white hover:bg-white/5 hover:text-gold transition-all duration-300">
                Project Timeline
              </Link>
            </div>
          )}
        </div>

        <Link to="/history" className={navLinkClass(isActive('/history'))}>Company History</Link>
        <Link to="/our-story" className={navLinkClass(isActive('/our-story'))}>Our Legacy</Link>

        {/* Contact dropdown */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setContactOpen(true)}
          onMouseLeave={() => setContactOpen(false)}
        >
          <span className={`${navLinkClass(isContactActive)} cursor-pointer`}>Contact</span>
          {contactOpen && (
            <div className="absolute top-full right-0 mt-[1px] bg-navy min-w-[240px] shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-t-2 border-gold z-50">
              <Link to="/contact" className={dropdownLinkClass}>Contact Us</Link>
              <Link to="/book-a-call" className={dropdownLinkClass}>Book a Video Call</Link>
              <div className="border-t border-white/10 mx-5 my-1" />
              <Link to="/investors" className={dropdownLinkClass}>For Investors</Link>
              <Link to="/redevelopment" className={dropdownLinkClass}>For Redevelopment</Link>
              <Link to="/contractors" className={dropdownLinkClass}>For Contractors</Link>
            </div>
          )}
        </div>
      </nav>

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
            className={`block px-6 py-4 text-[13px] tracking-[1px] uppercase no-underline border-b border-white/5 transition-all duration-300 ${
              isActive('/') ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
            }`}
          >
            Home
          </Link>

          {/* Mobile Projects */}
          <div>
            <button
              onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
              className={`w-full text-left px-6 py-4 text-[13px] tracking-[1px] uppercase bg-transparent border-none border-b border-white/5 cursor-pointer transition-all duration-300 ${
                isProjectsActive ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
              }`}
            >
              Projects
            </button>
            {mobileProjectsOpen && (
              <div className="bg-white/5">
                <Link to="/projects/ongoing" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300">Ongoing Projects</Link>
                <Link to="/projects/upcoming" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Upcoming Projects</Link>
                <Link to="/projects/completed" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Completed Projects</Link>
                <Link to="/timeline" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Project Timeline</Link>
              </div>
            )}
          </div>

          <Link
            to="/history"
            onClick={closeMobile}
            className={`block px-6 py-4 text-[13px] tracking-[1px] uppercase no-underline border-b border-white/5 transition-all duration-300 ${
              isActive('/history') ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
            }`}
          >
            Company History
          </Link>

          <Link
            to="/our-story"
            onClick={closeMobile}
            className={`block px-6 py-4 text-[13px] tracking-[1px] uppercase no-underline border-b border-white/5 transition-all duration-300 ${
              isActive('/our-story') ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
            }`}
          >
            Our Legacy
          </Link>

          {/* Mobile Contact */}
          <div>
            <button
              onClick={() => setMobileContactOpen(!mobileContactOpen)}
              className={`w-full text-left px-6 py-4 text-[13px] tracking-[1px] uppercase bg-transparent border-none border-b border-white/5 cursor-pointer transition-all duration-300 ${
                isContactActive ? 'text-gold' : 'text-white hover:text-gold hover:bg-white/5'
              }`}
            >
              Contact
            </button>
            {mobileContactOpen && (
              <div className="bg-white/5">
                <Link to="/contact" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Contact Us</Link>
                <Link to="/book-a-call" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">Book a Video Call</Link>
                <Link to="/investors" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">For Investors</Link>
                <Link to="/redevelopment" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300 border-b border-white/5">For Redevelopment</Link>
                <Link to="/contractors" onClick={closeMobile} className="block px-10 py-3 text-[13px] tracking-[1px] uppercase no-underline text-white/80 hover:text-gold transition-all duration-300">For Contractors</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
