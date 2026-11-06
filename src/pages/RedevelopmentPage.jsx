import { useState } from 'react';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Initial Consultation',
    body: 'We meet your managing committee, review the society\'s existing structure, and assess development potential — completely at no cost or obligation.',
  },
  {
    num: '02',
    title: 'Feasibility & IOD',
    body: 'Our architects prepare a feasibility report, FSI calculations, and help your society obtain the Intimation of Disapproval (IOD) from MCGM.',
  },
  {
    num: '03',
    title: 'Development Agreement',
    body: 'A transparent Development Agreement is drafted covering corpus fund, transit rent, additional area, and the handover timeline — reviewed by your society\'s advocate.',
  },
  {
    num: '04',
    title: 'Transit & Construction',
    body: 'We arrange transit rent for every member for the duration of construction and manage the entire build process with regular progress updates.',
  },
  {
    num: '05',
    title: 'Possession & Registration',
    body: 'Members receive their new, larger flat with fresh interiors, modern amenities, and clear title — registered in their name before project handover.',
  },
];

const BENEFITS = [
  { title: 'Larger Flat', body: 'Existing members typically receive a flat 20–35% larger than their current unit at zero additional cost.' },
  { title: 'Corpus Fund', body: 'A lump-sum corpus fund is deposited with the society upfront — before a single brick is removed.' },
  { title: 'Transit Rent', body: 'Monthly transit rent is paid to every member for the entire duration of construction, covering alternate accommodation.' },
  { title: 'Modern Amenities', body: 'New building with high-speed elevators, 100% power backup, covered parking, and CCTV — a complete lifestyle upgrade.' },
  { title: 'Clear Title', body: 'All encumbrances are cleared and the new flat is registered in the member\'s name before handover.' },
  { title: 'Zero Legal Risk', body: 'Our in-house legal team handles NOC, IOD, CC, OC, and all municipal approvals — members bear no compliance burden.' },
];

function RedevelopmentForm() {
  const [fields, setFields] = useState({ society: '', location: '', units: '', land: '', contact: '', email: '', phone: '', message: '' });
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
    if (!fields.society.trim()) errs.society = 'Society name is required.';
    if (!fields.contact.trim()) errs.contact = 'Contact person name is required.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.';
    if (!fields.phone.trim()) errs.phone = 'Phone is required.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(fields.phone)) errs.phone = 'Enter a valid phone number.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputClass = (f) =>
    `w-full bg-surface-light border px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 ${errors[f] ? 'border-red-400' : 'border-border-light'}`;

  if (submitted) {
    return (
      <div className="border border-gold bg-gold/10 p-8 text-center">
        <span className="block text-gold font-bold text-sm uppercase tracking-[2px] mb-2">Inquiry Received</span>
        <p className="text-text-primary text-sm leading-[1.8]">
          Thank you. Our redevelopment team will contact the managing committee of <span className="font-bold">{fields.society}</span> within 2 business days to schedule a consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Society Name <span className="text-gold">*</span></label>
          <input name="society" type="text" value={fields.society} onChange={handleChange} className={inputClass('society')} placeholder="e.g. Sunshine Co-op Housing Society" />
          {errors.society && <p className="text-red-500 text-xs mt-1">{errors.society}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Location / Area</label>
          <input name="location" type="text" value={fields.location} onChange={handleChange} className={inputClass('location')} placeholder="Malad West, Mumbai…" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">No. of Existing Units</label>
          <input name="units" type="number" min="1" value={fields.units} onChange={handleChange} className={inputClass('units')} placeholder="e.g. 24" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Plot Area (sq.ft.) <span className="text-text-muted font-normal normal-case tracking-normal">(approx.)</span></label>
          <input name="land" type="text" value={fields.land} onChange={handleChange} className={inputClass('land')} placeholder="e.g. 3,500 sq.ft." />
        </div>
      </div>
      <div className="border-t border-border-light pt-4">
        <p className="text-xs uppercase tracking-[2px] text-text-muted mb-3">Managing Committee Contact</p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Name <span className="text-gold">*</span></label>
            <input name="contact" type="text" autoComplete="name" value={fields.contact} onChange={handleChange} className={inputClass('contact')} placeholder="Chairman / Secretary" />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Email <span className="text-gold">*</span></label>
              <input name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} className={inputClass('email')} placeholder="you@example.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Phone <span className="text-gold">*</span></label>
              <input name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+91 98765 43210" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">Additional Notes <span className="text-text-muted font-normal normal-case tracking-normal">(optional)</span></label>
            <textarea name="message" rows={3} value={fields.message} onChange={handleChange} className={`${inputClass('message')} resize-none`} placeholder="Any specific concerns or questions from the committee…" />
          </div>
        </div>
      </div>
      <button type="submit" className="bg-gold text-navy px-8 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold">
        Request Consultation
      </button>
    </form>
  );
}

export default function RedevelopmentPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-navy py-20 px-5 text-center border-b border-gold/30">
        <span className="text-gold text-xs uppercase tracking-[4px] mb-4 block">For Housing Societies</span>
        <h1 className="font-serif text-white text-4xl md:text-5xl font-normal uppercase tracking-[4px] mb-4">
          Redevelop With Us
        </h1>
        <span className="block w-[60px] h-[2px] bg-gold mx-auto mb-6" />
        <p className="text-text-muted max-w-[600px] mx-auto text-sm leading-[1.8]">
          Transform your ageing building into a modern, spacious home — with a larger flat, full corpus fund, and zero displacement stress. Trusted by societies in Malad since 1969.
        </p>
      </div>

      <div className="py-16 md:py-24 px-5">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-20">

          {/* Member Benefits */}
          <section>
            <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
              What Members Receive
              <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-8" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-surface-light border border-border-light p-8 hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <span className="block text-navy font-serif text-lg mb-3">{b.title}</span>
                  <p className="text-text-tertiary text-sm leading-[1.8]">{b.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section>
            <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
              Our Redevelopment Process
              <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-8" />
            </h3>
            <div className="flex flex-col gap-0">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`flex gap-8 items-start p-8 border border-border-light ${i > 0 ? '-mt-px' : ''} hover:border-gold hover:z-10 relative bg-white transition-all duration-300`}>
                  <span className="font-serif text-4xl text-gold/40 font-black shrink-0 leading-none">{step.num}</span>
                  <div>
                    <span className="block text-navy font-serif text-lg mb-2">{step.title}</span>
                    <p className="text-text-tertiary text-sm leading-[1.8]">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Inquiry Form */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
                  Get a Free Consultation
                  <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-6" />
                </h3>
                <p className="text-text-tertiary text-sm leading-[1.8] mb-8">
                  Share your society&apos;s details and our redevelopment team will visit, assess feasibility, and present a no-obligation proposal to the managing committee.
                </p>
                <div className="bg-navy text-white p-8 border border-gold">
                  <span className="block text-xs uppercase tracking-[3px] text-gold mb-4">Speak to Our Team</span>
                  <p className="text-text-light text-sm mb-1"><a href="tel:+919820311177" className="hover:text-gold transition-colors duration-300">+91 98203 11177</a></p>
                  <p className="text-text-light text-sm"><a href="mailto:u.k.builders1981@gmail.com" className="hover:text-gold transition-colors duration-300">u.k.builders1981@gmail.com</a></p>
                </div>
              </div>
              <div className="bg-surface-light border border-border-light p-8">
                <RedevelopmentForm />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
