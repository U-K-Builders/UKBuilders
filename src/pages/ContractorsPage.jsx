import { useState } from 'react';
import { saveSubmission } from '../utils/submissions';

const CATEGORIES = [
  'Civil & Structural',
  'Plumbing & Sanitation',
  'Electrical & ELV',
  'HVAC & Fire Fighting',
  'Aluminium & Glazing',
  'Interior & Finishing',
  'Landscaping & Hardscaping',
  'Waterproofing',
  'Elevators & Escalators',
  'Material / Raw Goods Supplier',
  'Other',
];

const WHAT_WE_LOOK_FOR = [
  {
    title: 'Proven Track Record',
    body: 'Minimum 5 years of experience on comparable residential projects in Mumbai, with verifiable completion records and client references.',
  },
  {
    title: 'Quality Commitment',
    body: 'Adherence to IS codes and project specifications. Our QC team conducts joint inspections at every milestone — we expect the same standard from our partners.',
  },
  {
    title: 'Financial Stability',
    body: 'Ability to mobilise manpower and materials on schedule. Timely delivery is a core U.K. Builders value and we hold our contractors to the same standard.',
  },
  {
    title: 'Safety First',
    body: 'All workers must be covered under ESIC/PF, and all site operations must comply with Mumbai Building Bye-laws and BIS safety standards.',
  },
];

const PERKS = [
  { label: 'Long-term Relationships', desc: 'We work with the same contractor pool across projects — good partners stay for decades.' },
  { label: 'Prompt Payments', desc: 'Running bills cleared within 30 days of certification. No arbitrary deductions.' },
  { label: 'Clear Scope of Work', desc: 'Detailed BOQs and technical drawings issued before commencement. No scope ambiguity.' },
  { label: 'Growing Pipeline', desc: '3 ongoing projects + 2 upcoming — consistent workload for registered contractors.' },
];

function ContractorForm() {
  const [fields, setFields] = useState({ company: '', category: CATEGORIES[0], years: '', contact: '', email: '', phone: '', pan: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!fields.company.trim()) errs.company = 'Company name is required.';
    if (!fields.contact.trim()) errs.contact = 'Contact person is required.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.';
    if (!fields.phone.trim()) errs.phone = 'Phone is required.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(fields.phone)) errs.phone = 'Enter a valid phone number.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    await saveSubmission('contractors', fields);
    setSubmitted(true);
  };

  const inputClass = (f) =>
    `w-full bg-surface-light border px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 ${errors[f] ? 'border-red-400' : 'border-border-light'}`;

  if (submitted) {
    return (
      <div className="border border-gold bg-gold/10 p-8 text-center">
        <span className="block text-gold font-bold text-sm uppercase tracking-[2px] mb-2">Registration Received</span>
        <p className="text-text-primary text-sm leading-[1.8]">
          Thank you, <span className="font-bold">{fields.company}</span>. Our procurement team will review your profile and reach out to <span className="font-bold">{fields.email}</span> within 5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">Company / Firm Name <span className="text-gold">*</span></label>
        <input name="company" type="text" value={fields.company} onChange={handleChange} className={inputClass('company')} placeholder="Your company name" />
        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">Trade Category <span className="text-gold">*</span></label>
          <select name="category" value={fields.category} onChange={handleChange} className="w-full bg-surface-light border border-border-light px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">Years in Business</label>
          <input name="years" type="number" min="1" value={fields.years} onChange={handleChange} className={inputClass('years')} placeholder="e.g. 12" />
        </div>
      </div>
      <div className="border-t border-border-light pt-4">
        <p className="text-[0.6875rem] uppercase tracking-[2px] text-text-muted mb-3">Primary Contact</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">Contact Person <span className="text-gold">*</span></label>
            <input name="contact" type="text" autoComplete="name" value={fields.contact} onChange={handleChange} className={inputClass('contact')} placeholder="Director / Partner / Manager" />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">Email <span className="text-gold">*</span></label>
              <input name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} className={inputClass('email')} placeholder="you@company.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">Phone <span className="text-gold">*</span></label>
              <input name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+91 98765 43210" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">PAN / GST No. <span className="text-text-muted font-normal normal-case tracking-normal">(optional)</span></label>
            <input name="pan" type="text" value={fields.pan} onChange={handleChange} className={inputClass('pan')} placeholder="For faster empanelment" />
          </div>
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">Past Projects / Portfolio <span className="text-text-muted font-normal normal-case tracking-normal">(optional)</span></label>
            <textarea name="message" rows={3} value={fields.message} onChange={handleChange} className={`${inputClass('message')} resize-none`} placeholder="List key completed projects and their locations…" />
          </div>
        </div>
      </div>
      <button type="submit" className="bg-gold text-white px-8 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold">
        Register as Contractor
      </button>
    </form>
  );
}

export default function ContractorsPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-navy py-20 px-5 text-center border-b border-gold/30">
        <span className="text-gold text-[0.6875rem] uppercase tracking-[4px] mb-4 block">Vendor & Contractor Empanelment</span>
        <h1 className="font-serif text-white text-4xl md:text-5xl font-normal uppercase tracking-[4px] mb-4">
          Partner With Us
        </h1>
        <span className="block w-[60px] h-[2px] bg-gold mx-auto mb-6" />
        <p className="text-text-muted max-w-[600px] mx-auto text-sm leading-[1.8]">
          We build lasting relationships with contractors and suppliers who share our commitment to quality, timelines, and craftsmanship. If that sounds like you, we want to hear from you.
        </p>
      </div>

      <div className="py-16 md:py-24 px-5">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-20">

          {/* What we look for */}
          <section>
            <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
              What We Look For
              <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-8" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WHAT_WE_LOOK_FOR.map((w) => (
                <div key={w.title} className="bg-surface-light border border-border-light p-8 hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <span className="block text-navy font-serif text-lg mb-3">{w.title}</span>
                  <p className="text-text-tertiary text-sm leading-[1.8]">{w.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why work with us */}
          <section>
            <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
              Why Work With U.K. Builders
              <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-8" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {PERKS.map((p) => (
                <div key={p.label} className="border border-gold/40 bg-navy text-white p-8 text-center hover:border-gold transition-all duration-300">
                  <span className="block text-gold font-serif text-base mb-3">{p.label}</span>
                  <p className="text-text-muted text-xs leading-[1.8]">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Registration Form */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
                  Contractor Registration
                  <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-6" />
                </h3>
                <p className="text-text-tertiary text-sm leading-[1.8] mb-8">
                  Submit your details to be added to our empanelled contractor list. Our procurement team reviews every application and will reach out if there is a project fit.
                </p>
                <div className="bg-navy text-white p-8 border border-gold">
                  <span className="block text-[0.6875rem] uppercase tracking-[3px] text-gold mb-4">Procurement Office</span>
                  <p className="text-text-light text-sm mb-1"><a href="tel:+919820311177" className="hover:text-gold transition-colors duration-300">+91 98203 11177</a></p>
                  <p className="text-text-light text-sm"><a href="mailto:u.k.builders1981@gmail.com" className="hover:text-gold transition-colors duration-300">u.k.builders1981@gmail.com</a></p>
                </div>
              </div>
              <div className="bg-surface-light border border-border-light p-8">
                <ContractorForm />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
