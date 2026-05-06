import { useState } from 'react';

const PROJECTS = ['Justin', 'Christina', 'Elvira', 'Silver Coin', 'La Serena', 'Aurola-Muriel Villa', 'Cinderella', 'Little Sunflower', 'Other'];

const RESOURCES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Move-in Checklist',
    desc: 'Step-by-step guide for possession day — snag list, key handover, and first-week essentials.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Society Contacts',
    desc: 'Emergency numbers, security desk, housekeeping, and committee members for your building.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Maintenance Requests',
    desc: 'Log repair or maintenance issues directly with our post-handover support team.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Important Documents',
    desc: 'NOC, occupation certificate, society bylaws, and building completion records.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Utility Setup Guide',
    desc: 'How to activate electricity, gas, water, broadband, and parking access for your unit.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Community Calendar',
    desc: 'Society AGM dates, festive events, maintenance windows, and committee meeting schedules.',
  },
];

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LoginForm() {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFields((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.email.trim() && fields.password.trim()) setSubmitted(true);
  };

  const inputClass = 'w-full bg-surface-light border border-border-light px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300';

  if (submitted) {
    return (
      <div className="border border-gold bg-gold/10 p-8 text-center">
        <span className="block text-gold font-bold text-sm uppercase tracking-[2px] mb-2">Check Your Email</span>
        <p className="text-text-primary text-sm leading-[1.8]">
          If your account exists, a login link has been sent to <span className="font-bold">{fields.email}</span>.
          Please contact us if you haven&apos;t registered yet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label className="block text-[11px] uppercase tracking-[2px] text-navy font-bold mb-2">
          Email Address
        </label>
        <input name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required />
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[2px] text-navy font-bold mb-2">
          Password
        </label>
        <input name="password" type="password" autoComplete="current-password" value={fields.password} onChange={handleChange} className={inputClass} placeholder="••••••••" required />
      </div>
      <p className="text-text-muted text-xs -mt-1">
        Forgot your password?{' '}
        <a href="mailto:u.k.builders1981@gmail.com" className="text-gold hover:underline">Contact us</a>
      </p>
      <button
        type="submit"
        className="bg-gold text-white px-8 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
      >
        Sign In
      </button>
    </form>
  );
}

function RegisterForm() {
  const [fields, setFields] = useState({ project: PROJECTS[0], unit: '', name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!fields.unit.trim()) errs.unit = 'Flat / unit number is required.';
    if (!fields.name.trim()) errs.name = 'Full name is required.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email address.';
    if (!fields.phone.trim()) errs.phone = 'Phone number is required.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(fields.phone)) errs.phone = 'Enter a valid phone number.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputClass = (f) =>
    `w-full bg-surface-light border px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 ${errors[f] ? 'border-red-400' : 'border-border-light'}`;

  if (submitted) {
    return (
      <div className="border border-gold bg-gold/10 p-8 text-center">
        <span className="block text-gold font-bold text-sm uppercase tracking-[2px] mb-2">Registration Submitted</span>
        <p className="text-text-primary text-sm leading-[1.8]">
          Thank you, <span className="font-bold">{fields.name}</span>. We&apos;ll verify your ownership for{' '}
          <span className="font-bold">{fields.project} — {fields.unit}</span> and send your portal credentials to{' '}
          <span className="font-bold">{fields.email}</span> within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[11px] uppercase tracking-[2px] text-navy font-bold mb-2">
            Building <span className="text-gold">*</span>
          </label>
          <select
            name="project"
            value={fields.project}
            onChange={handleChange}
            className="w-full bg-surface-light border border-border-light px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer"
          >
            {PROJECTS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[11px] uppercase tracking-[2px] text-navy font-bold mb-2">
            Flat / Unit No. <span className="text-gold">*</span>
          </label>
          <input name="unit" type="text" value={fields.unit} onChange={handleChange} className={inputClass('unit')} placeholder="e.g. 8A, 12B" />
          {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
        </div>
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[2px] text-navy font-bold mb-2">
          Full Name <span className="text-gold">*</span>
        </label>
        <input name="name" type="text" autoComplete="name" value={fields.name} onChange={handleChange} className={inputClass('name')} placeholder="As on sale agreement" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[2px] text-navy font-bold mb-2">
          Email Address <span className="text-gold">*</span>
        </label>
        <input name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} className={inputClass('email')} placeholder="you@example.com" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[2px] text-navy font-bold mb-2">
          Phone Number <span className="text-gold">*</span>
        </label>
        <input name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+91 98765 43210" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <button
        type="submit"
        className="bg-gold text-white px-8 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
      >
        Submit Registration
      </button>
    </form>
  );
}

export default function OwnerPortalPage() {
  const [mode, setMode] = useState('register');

  const tabClass = (m) =>
    `px-6 py-3 text-[11px] uppercase tracking-[2px] border transition-all duration-300 cursor-pointer ${
      mode === m
        ? 'bg-gold text-white border-gold'
        : 'bg-transparent text-text-secondary border-border-light hover:border-gold hover:text-gold'
    }`;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-navy py-20 px-5 text-center border-b border-gold/30">
        <span className="text-gold text-[11px] uppercase tracking-[4px] mb-4 block">For Existing Homeowners</span>
        <h1 className="font-serif text-white text-4xl md:text-5xl font-normal uppercase tracking-[4px] mb-4">
          Owner Portal
        </h1>
        <span className="block w-[60px] h-[2px] bg-gold mx-auto mb-6" />
        <p className="text-text-muted max-w-[560px] mx-auto text-sm leading-[1.8]">
          Your dedicated post-handover hub — access building documents, lodge maintenance requests, connect with your society, and more.
        </p>
      </div>

      <div className="py-16 md:py-24 px-5">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-20">

          {/* Access Panel */}
          <section>
            <div className="max-w-[560px] mx-auto">
              {/* Tabs */}
              <div className="flex gap-3 mb-8">
                <button className={tabClass('login')} onClick={() => setMode('login')}>Existing Member</button>
                <button className={tabClass('register')} onClick={() => setMode('register')}>Register as Owner</button>
              </div>

              {mode === 'login' ? (
                <div>
                  <h2 className="font-serif text-navy text-2xl mb-2 tracking-[1px]">Sign In</h2>
                  <p className="text-text-tertiary text-sm leading-[1.8] mb-6">
                    Access your owner dashboard using the credentials sent to you at possession.
                  </p>
                  <LoginForm />
                </div>
              ) : (
                <div>
                  <h2 className="font-serif text-navy text-2xl mb-2 tracking-[1px]">Register Your Unit</h2>
                  <p className="text-text-tertiary text-sm leading-[1.8] mb-6">
                    New to the portal? Submit your details and we&apos;ll verify ownership and send your login credentials within 2 business days.
                  </p>
                  <RegisterForm />
                </div>
              )}
            </div>
          </section>

          {/* Resources Preview */}
          <section>
            <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
              What&apos;s Inside
              <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-8" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {RESOURCES.map((r) => (
                <div
                  key={r.title}
                  className="border border-border-light bg-white p-6 hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 relative"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-gold mt-0.5">{r.icon}</span>
                    <h4 className="font-serif text-navy text-lg leading-snug">{r.title}</h4>
                  </div>
                  <p className="text-text-tertiary text-sm leading-[1.8] mb-4">{r.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[1.5px] text-text-muted border border-border-light px-3 py-1.5">
                    <LockIcon />
                    Members only
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Support strip */}
          <section className="bg-navy border border-gold/40 p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <span className="block text-[10px] uppercase tracking-[3px] text-gold mb-2">Post-Handover Support</span>
              <p className="text-text-light text-sm leading-[1.8]">Our team is available Mon – Sat, 10 am – 6 pm for all owner queries.</p>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[3px] text-gold mb-2">Call Us</span>
              <a href="tel:+919820311177" className="text-white text-sm hover:text-gold transition-colors duration-300">+91 98203 11177</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[3px] text-gold mb-2">Email Us</span>
              <a href="mailto:u.k.builders1981@gmail.com" className="text-white text-sm hover:text-gold transition-colors duration-300">u.k.builders1981@gmail.com</a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
