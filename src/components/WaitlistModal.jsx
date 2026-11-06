import { useState, useEffect, useRef } from 'react';
import { saveSubmission } from '../utils/submissions';

export default function WaitlistModal({ projectName, onClose }) {
  const [fields, setFields] = useState({ name: '', email: '', bhk: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const firstFocusRef = useRef(null);

  useEffect(() => {
    firstFocusRef.current?.focus();
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    saveSubmission('waitlist', { ...fields, project: projectName });
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors duration-300 ${
      errors[field] ? 'border-red-400' : 'border-white/20'
    }`;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-navy-dark/90 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-navy border border-gold/40 w-full max-w-[440px] p-8 md:p-10 animate-fade-in">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-white/40 hover:text-gold transition-colors duration-200 p-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto mb-4 text-gold">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-gold text-sm uppercase tracking-[3px] font-bold mb-3">You&apos;re on the list</p>
            <p className="text-text-light text-sm leading-[1.8]">
              We&apos;ll notify you at <span className="text-white">{fields.email}</span> as soon as{' '}
              <span className="font-serif text-white">{projectName}</span> launches.
            </p>
            <button
              onClick={onClose}
              className="mt-6 text-sm uppercase tracking-[2px] text-gold border border-gold px-6 py-2 hover:bg-gold hover:text-navy transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="block text-gold text-xs uppercase tracking-[4px] mb-2">Pre-launch Waitlist</span>
              <h2 className="text-white font-serif text-2xl font-normal">{projectName}</h2>
              <p className="text-text-muted text-sm mt-2 leading-[1.7]">
                Be the first to know when this project launches — pricing, floor plans, and early-bird availability.
              </p>
            </div>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div>
                <input
                  ref={firstFocusRef}
                  name="name" type="text" autoComplete="name"
                  value={fields.name} onChange={handleChange}
                  placeholder="Your name *" className={inputClass('name')}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  name="email" type="email" autoComplete="email"
                  value={fields.email} onChange={handleChange}
                  placeholder="Email address *" className={inputClass('email')}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <select
                name="bhk" value={fields.bhk} onChange={handleChange}
                className="w-full bg-navy border border-white/20 px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-gold transition-colors duration-300"
              >
                <option value="">Preferred BHK (optional)</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
              <button
                type="submit"
                className="bg-gold text-navy px-8 py-4 text-sm tracking-[2px] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all duration-300 mt-1"
              >
                Notify Me When It Launches
              </button>
              <p className="text-white/25 text-xs uppercase tracking-[1px] text-center">
                No spam. Pre-launch updates only.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
