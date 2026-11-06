import { useState } from 'react';
import useLeadSubmit from '../hooks/useLeadSubmit';
import { Link } from 'react-router-dom';

const HIGHLIGHTS = [
  {
    stat: '55+',
    label: 'Years of Delivered Excellence',
    desc: 'A proven track record since 1969 across 50+ completed projects — zero project abandonment, every possession honoured.',
  },
  {
    stat: '₹2 Cr+',
    label: 'Typical Capital Appreciation',
    desc: 'Orlem, Malad West has consistently outpaced Mumbai\'s average appreciation owing to its scarcity of FSI-eligible land.',
  },
  {
    stat: '100%',
    label: 'On-Time Delivery Record',
    desc: 'Every completed project was handed over within the committed timeline, protecting the capital and rental plans of our investors.',
  },
  {
    stat: 'RERA',
    label: 'Compliant & Transparent',
    desc: 'All ongoing projects are RERA-registered or pending registration, with full disclosure of construction progress and financials.',
  },
];

const REASONS = [
  {
    title: 'Prime Micro-Market',
    body: 'Orlem, Malad West sits at the nexus of the Western Express Highway, Link Road, and Mindspace business district — giving residents both connectivity and calm.',
  },
  {
    title: 'Premium Rental Yields',
    body: '2 & 3 BHK units in the Orlem pocket command ₹55,000 – ₹1.10 Lac per month in rent, translating to gross yields of 3.5 – 4.5% — above the Mumbai average.',
  },
  {
    title: 'NRI-Friendly Process',
    body: 'We handle POA registration, NRE/NRO fund routing, Form 13 TDS certificates, and FEMA compliance so your investment is seamless from abroad.',
  },
  {
    title: 'Exclusive Inventory',
    body: 'Our projects are small-format (14 storeys, ~100 units) — meaning limited supply, higher exclusivity, and sustained resale premiums.',
  },
];

const BUDGET_OPTIONS = [
  'Under ₹1.5 Cr',
  '₹1.5 Cr – ₹3 Cr',
  '₹3 Cr – ₹5 Cr',
  'Above ₹5 Cr',
  'Multiple Units / Bulk',
];

function InquiryForm() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', budget: BUDGET_OPTIONS[0], project: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const lead = useLeadSubmit();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.';
    if (!fields.phone.trim()) errs.phone = 'Phone is required.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(fields.phone)) errs.phone = 'Enter a valid phone number.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!(await lead.submit('investor', fields))) return;
    setSubmitted(true);
  };

  const inputClass = (f) =>
    `w-full bg-surface-light border px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 ${errors[f] ? 'border-red-400' : 'border-border-light'}`;

  if (submitted) {
    return (
      <div className="border border-gold bg-gold/10 p-8 text-center">
        <span className="block text-gold font-bold text-sm uppercase tracking-[2px] mb-2">Thank You</span>
        <p className="text-text-primary text-sm leading-[1.8]">
          Our investment team will contact you at <span className="font-bold">{fields.email}</span> within one business day with a detailed briefing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocusCapture={lead.markStart} noValidate className="flex flex-col gap-4">
        <input {...lead.honeypotProps} />
      <div>
        <label htmlFor="investors-name" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Full Name <span className="text-gold">*</span></label>
        <input id="investors-name" name="name" type="text" autoComplete="name" value={fields.name} onChange={handleChange} className={inputClass('name')} placeholder="Your name" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="investors-email" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Email <span className="text-gold">*</span></label>
          <input id="investors-email" name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} className={inputClass('email')} placeholder="you@example.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="investors-phone" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Phone <span className="text-gold">*</span></label>
          <input id="investors-phone" name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+91 98765 43210" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="investors-budget" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Investment Budget</label>
          <select id="investors-budget" name="budget" value={fields.budget} onChange={handleChange} className="w-full bg-surface-light border border-border-light px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer">
            {BUDGET_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="investors-project" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Project of Interest</label>
          <input id="investors-project" name="project" type="text" value={fields.project} onChange={handleChange} className={inputClass('project')} placeholder="Justin, Christina, Any…" />
        </div>
      </div>
      <div>
        <label htmlFor="investors-message" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Message <span className="text-text-muted font-normal normal-case tracking-normal">(optional)</span></label>
        <textarea id="investors-message" name="message" rows={3} value={fields.message} onChange={handleChange} className={`${inputClass('message')} resize-none`} placeholder="Tell us about your investment goals…" />
      </div>
      {lead.error && <p role="alert" className="text-red-700 text-sm">{lead.error}</p>}
      <button type="submit" disabled={lead.sending} className="bg-gold text-navy px-8 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold">
        Submit Inquiry
      </button>
    </form>
  );
}

export default function InvestorsPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-navy py-20 px-5 text-center border-b border-gold/30">
        <span className="text-gold text-xs uppercase tracking-[4px] mb-4 block">Investment Opportunities</span>
        <h1 className="font-serif text-white text-4xl md:text-5xl font-normal uppercase tracking-[4px] mb-4">
          Invest With U.K. Builders
        </h1>
        <span className="block w-[60px] h-[2px] bg-gold mx-auto mb-6" />
        <p className="text-text-muted max-w-[600px] mx-auto text-sm leading-[1.8]">
          Five decades of on-time delivery, a prime Orlem micro-market, and a development pipeline of ₹500 Cr+ — a compelling case for the discerning real estate investor.
        </p>
      </div>

      <div className="py-16 md:py-24 px-5">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-20">

          {/* Stats */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {HIGHLIGHTS.map((h) => (
                <div key={h.stat} className="border border-border-light bg-white p-8 hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 text-center">
                  <span className="block gradient-text font-serif text-4xl font-black mb-2">{h.stat}</span>
                  <span className="block text-navy text-xs uppercase tracking-[2px] mb-3 font-bold">{h.label}</span>
                  <p className="text-text-tertiary text-xs leading-[1.8]">{h.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Invest */}
          <section>
            <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
              Why Invest in Orlem
              <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-8" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REASONS.map((r) => (
                <div key={r.title} className="bg-surface-light border border-border-light p-8 hover:border-gold transition-all duration-300">
                  <span className="block text-navy font-serif text-lg mb-3">{r.title}</span>
                  <p className="text-text-tertiary text-sm leading-[1.8]">{r.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Current Opportunities */}
          <section>
            <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
              Current Investment Opportunities
              <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-8" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'Justin', config: '2, 3 & 4 BHK', possession: '2027', carpet: '620 – 1,367 sq.ft.', note: 'Final units available' },
                { name: 'Christina', config: '2, 3 & 4 BHK', possession: '2028', carpet: '650 – 1,470 sq.ft.', note: 'Limited inventory' },
                { name: 'Elvira', config: '1 & 2 BHK', possession: '2027', carpet: '400 – 725 sq.ft.', note: 'Compact investment entry' },
              ].map((p) => (
                <div key={p.name} className="border border-gold/40 bg-navy text-white p-8 hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300">
                  <span className="block text-xs uppercase tracking-[3px] text-gold mb-1">{p.note}</span>
                  <span className="block font-serif text-3xl text-white mb-4">{p.name}</span>
                  <div className="flex flex-col gap-1 text-sm text-text-muted mb-6">
                    <span>{p.config}</span>
                    <span>{p.carpet}</span>
                    <span>Possession {p.possession}</span>
                  </div>
                  <Link
                    to={`/projects/${p.name.toLowerCase()}`}
                    className="inline-block text-xs uppercase tracking-[2px] text-gold border border-gold px-5 py-2 hover:bg-gold hover:text-navy transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Inquiry Form */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
                  Investment Inquiry
                  <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-6" />
                </h3>
                <p className="text-text-tertiary text-sm leading-[1.8] mb-8">
                  Share your investment brief and our team will prepare a customised project briefing — including indicative pricing, payment plans, and rental yield projections.
                </p>
                <div className="bg-navy text-white p-8 border border-gold">
                  <span className="block text-xs uppercase tracking-[3px] text-gold mb-4">Direct Line</span>
                  <p className="text-text-light text-sm mb-1"><a href="tel:+919820311177" className="hover:text-gold transition-colors duration-300">+91 98203 11177</a></p>
                  <p className="text-text-light text-sm"><a href="mailto:u.k.builders1981@gmail.com" className="hover:text-gold transition-colors duration-300">u.k.builders1981@gmail.com</a></p>
                </div>
              </div>
              <div className="bg-surface-light border border-border-light p-8">
                <InquiryForm />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
