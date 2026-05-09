import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = ['Justin', 'Christina', 'Elvira', 'New Life', 'Madonna', 'General Enquiry'];

const TIMEZONES = [
  { label: 'India — IST (UTC+5:30)', offset: 330 },
  { label: 'UAE / Dubai — GST (UTC+4)', offset: 240 },
  { label: 'United Kingdom — GMT (UTC+0)', offset: 0 },
  { label: 'USA — Eastern (UTC−5)', offset: -300 },
  { label: 'USA — Central (UTC−6)', offset: -360 },
  { label: 'USA — Pacific (UTC−8)', offset: -480 },
  { label: 'Canada — Eastern (UTC−5)', offset: -300 },
  { label: 'Australia — AEST (UTC+10)', offset: 600 },
  { label: 'Singapore — SGT (UTC+8)', offset: 480 },
  { label: 'Hong Kong — HKT (UTC+8)', offset: 480 },
  { label: 'New Zealand — NZST (UTC+12)', offset: 720 },
];

const IST_SLOTS = [
  { label: '10:00 AM', minutes: 600 },
  { label: '10:30 AM', minutes: 630 },
  { label: '11:00 AM', minutes: 660 },
  { label: '11:30 AM', minutes: 690 },
  { label: '12:00 PM', minutes: 720 },
  { label: '12:30 PM', minutes: 750 },
  { label: '2:00 PM', minutes: 840 },
  { label: '2:30 PM', minutes: 870 },
  { label: '3:00 PM', minutes: 900 },
  { label: '3:30 PM', minutes: 930 },
  { label: '4:00 PM', minutes: 960 },
  { label: '4:30 PM', minutes: 990 },
  { label: '5:00 PM', minutes: 1020 },
  { label: '5:30 PM', minutes: 1050 },
];

const IST_OFFSET = 330;

function toLocalTime(istMinutes, targetOffset) {
  const utc = istMinutes - IST_OFFSET;
  let local = utc + targetOffset;
  let note = '';
  if (local < 0) { local += 1440; note = ' (prev day)'; }
  else if (local >= 1440) { local -= 1440; note = ' (next day)'; }
  const h = Math.floor(local / 60);
  const m = local % 60;
  const period = h < 12 ? 'AM' : 'PM';
  const dh = h % 12 || 12;
  const dm = String(m).padStart(2, '0');
  return `${dh}:${dm} ${period}${note}`;
}

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Full name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[0-9+\-\s()]{7,20}$/.test(fields.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (!fields.date) errors.date = 'Please select a date.';
  if (!fields.slot) errors.slot = 'Please select a time slot.';
  return errors;
}

function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-3 text-sm text-text-light leading-[1.7]">
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 mt-0.5 text-gold" aria-hidden="true">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </li>
  );
}

export default function VirtualCallPage() {
  const [fields, setFields] = useState({
    name: '', email: '', phone: '', country: '',
    project: PROJECTS[0], date: '', timezone: '330', slot: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const selectedTz = TIMEZONES.find(tz => String(tz.offset) === fields.timezone) || TIMEZONES[0];
  const showLocalTime = selectedTz.offset !== IST_OFFSET;

  const slots = useMemo(() => IST_SLOTS.map(s => ({
    ...s,
    localLabel: toLocalTime(s.minutes, selectedTz.offset),
  })), [selectedTz.offset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSlot = (label) => {
    setFields(prev => ({ ...prev, slot: label }));
    if (errors.slot) setErrors(prev => ({ ...prev, slot: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-white border px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 ${
      errors[field] ? 'border-red-400' : 'border-border-light'
    }`;

  const labelClass = 'block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2';

  if (submitted) {
    const chosenSlot = IST_SLOTS.find(s => s.label === fields.slot);
    return (
      <div className="animate-fade-in">
        <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
          <h2 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
            You&apos;re Booked
            <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
          </h2>
        </div>
        <div className="py-24 px-5 max-w-[680px] mx-auto text-center">
          <div className="border border-gold bg-gold/5 p-12">
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-serif text-navy text-2xl mb-4">Request Received</h3>
            <p className="text-text-secondary leading-[1.8] mb-8">
              Thank you, <strong>{fields.name}</strong>. Our team will confirm your slot and send a Zoom link to <strong>{fields.email}</strong> within 2 business hours.
            </p>
            <div className="bg-navy text-white p-6 mb-8 text-left grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-[0.625rem] uppercase tracking-[2px] text-text-muted mb-1">Project</span>
                <span>{fields.project}</span>
              </div>
              <div>
                <span className="block text-[0.625rem] uppercase tracking-[2px] text-text-muted mb-1">Date</span>
                <span>{new Date(fields.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div>
                <span className="block text-[0.625rem] uppercase tracking-[2px] text-text-muted mb-1">Time (IST)</span>
                <span>{fields.slot}</span>
              </div>
              {showLocalTime && chosenSlot && (
                <div>
                  <span className="block text-[0.625rem] uppercase tracking-[2px] text-text-muted mb-1">Your Local Time</span>
                  <span>{toLocalTime(chosenSlot.minutes, selectedTz.offset)}</span>
                </div>
              )}
            </div>
            <p className="text-text-muted text-xs mb-8">
              Need to reschedule? Call{' '}
              <a href="tel:+919820311177" className="text-gold hover:underline">+91 98203 11177</a>
              {' '}or email{' '}
              <a href="mailto:u.k.builders1981@gmail.com" className="text-gold hover:underline">u.k.builders1981@gmail.com</a>
            </p>
            <button
              onClick={() => { setSubmitted(false); setFields({ name: '', email: '', phone: '', country: '', project: PROJECTS[0], date: '', timezone: '330', slot: '', message: '' }); }}
              className="text-sm uppercase tracking-[2px] text-gold border border-gold px-8 py-3 hover:bg-gold hover:text-white transition-all duration-300"
            >
              Book Another Call
            </button>
          </div>
          <div className="mt-8">
            <Link to="/" className="text-[0.6875rem] uppercase tracking-[3px] text-gold hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <p className="text-[0.6875rem] uppercase tracking-[4px] text-gold mb-3">Virtual Site Visit</p>
        <h2 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Book a Video Call
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h2>
        <p className="text-text-tertiary max-w-[600px] mx-auto leading-[1.8]">
          Can&apos;t visit in person? Schedule a live Zoom walkthrough with our sales team — from anywhere in the world.
        </p>
      </div>

      {/* How it works */}
      <div className="bg-navy py-14 px-5">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { step: '01', title: 'Fill the Form', desc: 'Choose your project, date, and preferred time slot in your timezone.' },
            { step: '02', title: 'We Confirm', desc: 'Our team sends a Zoom link to your email within 2 business hours.' },
            { step: '03', title: 'Join the Call', desc: 'A live 30–45 minute walkthrough with our senior sales team.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center">
              <span className="font-serif text-gold text-5xl font-black mb-2">{step}</span>
              <span className="block w-8 h-[2px] bg-gold/40 mb-4" />
              <h4 className="text-white font-serif text-lg uppercase tracking-[2px] mb-2">{title}</h4>
              <p className="text-text-muted text-sm leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form + sidebar */}
      <div className="py-16 md:py-24 px-5">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* Form */}
          <div>
            <h3 className="font-serif text-navy text-2xl mb-1">Schedule Your Call</h3>
            <p className="text-text-tertiary text-sm leading-[1.8] mb-8">
              All slots are in IST. Select your timezone to see your local equivalent.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Full Name <span className="text-gold">*</span></label>
                  <input name="name" type="text" autoComplete="name" value={fields.name} onChange={handleChange} className={inputClass('name')} placeholder="Priya Mehta" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email Address <span className="text-gold">*</span></label>
                  <input name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} className={inputClass('email')} placeholder="priya@example.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Phone / WhatsApp <span className="text-gold">*</span></label>
                  <input name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+91 98765 43210" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelClass}>Country of Residence</label>
                  <input name="country" type="text" value={fields.country} onChange={handleChange} className={inputClass('country')} placeholder="India / UAE / UK…" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Project of Interest</label>
                <select name="project" value={fields.project} onChange={handleChange} className="w-full bg-white border border-border-light px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer">
                  {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Preferred Date <span className="text-gold">*</span></label>
                  <input name="date" type="date" min={getMinDate()} value={fields.date} onChange={handleChange} className={inputClass('date')} />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  <p className="text-text-muted text-[0.625rem] mt-1">Monday – Saturday only</p>
                </div>
                <div>
                  <label className={labelClass}>Your Timezone</label>
                  <select name="timezone" value={fields.timezone} onChange={handleChange} className="w-full bg-white border border-border-light px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer">
                    {TIMEZONES.map(tz => (
                      <option key={tz.offset} value={String(tz.offset)}>{tz.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Preferred Time Slot <span className="text-gold">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                  {slots.map(slot => (
                    <button
                      key={slot.label}
                      type="button"
                      onClick={() => handleSlot(slot.label)}
                      className={`px-3 py-3 text-center border text-xs transition-all duration-200 ${
                        fields.slot === slot.label
                          ? 'bg-gold text-white border-gold'
                          : 'bg-white border-border-light text-text-secondary hover:border-gold hover:text-gold'
                      }`}
                    >
                      <span className="block font-bold">{slot.label} IST</span>
                      {showLocalTime && (
                        <span className="block text-[0.625rem] mt-0.5 opacity-80">{slot.localLabel}</span>
                      )}
                    </button>
                  ))}
                </div>
                {errors.slot && <p className="text-red-500 text-xs mt-2">{errors.slot}</p>}
              </div>

              <div>
                <label className={labelClass}>Questions or Notes <span className="text-text-muted font-normal normal-case tracking-normal">(optional)</span></label>
                <textarea name="message" rows={3} value={fields.message} onChange={handleChange} className="w-full bg-white border border-border-light px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 resize-none" placeholder="Any specific questions about floor plans, pricing, or configurations…" />
              </div>

              <button type="submit" className="self-start bg-gold text-white px-12 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold">
                Request Video Call
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-navy text-white p-8 border border-gold">
              <span className="block text-[0.6875rem] uppercase tracking-[3px] text-gold mb-5">What to Expect</span>
              <ul className="flex flex-col gap-4">
                <CheckItem>Live video walkthrough of the building site and surroundings</CheckItem>
                <CheckItem>Tour of the sample flat and common areas</CheckItem>
                <CheckItem>Detailed floor plan and configuration walkthrough</CheckItem>
                <CheckItem>Pricing, payment plans, and current offers</CheckItem>
                <CheckItem>Q&A with our senior sales team</CheckItem>
                <CheckItem>Duration: 30–45 minutes via Zoom</CheckItem>
              </ul>
            </div>

            <div className="bg-surface-light border border-border-light p-8">
              <span className="block text-[0.6875rem] uppercase tracking-[3px] text-navy font-bold mb-3">Prefer to Call Us?</span>
              <p className="text-text-secondary text-sm leading-[1.8] mb-4">Available Mon–Sat, 10 AM to 6 PM IST.</p>
              <a href="tel:+919820311177" className="flex items-center gap-2 text-gold font-serif text-lg hover:underline mb-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                +91 98203 11177
              </a>
              <a href="mailto:u.k.builders1981@gmail.com" className="text-sm text-text-secondary hover:text-gold transition-colors duration-300">
                u.k.builders1981@gmail.com
              </a>
            </div>

            <div className="bg-gold/10 border border-gold/40 p-6">
              <span className="block text-[0.6875rem] uppercase tracking-[3px] text-gold font-bold mb-2">NRI Buyers</span>
              <p className="text-text-secondary text-sm leading-[1.7]">
                We guide NRI buyers through the full process remotely — documentation, power of attorney, and registration. Our team speaks English, Hindi, and Gujarati.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
