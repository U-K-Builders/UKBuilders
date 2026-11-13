import { useState } from 'react';
import useLeadSubmit from '../hooks/useLeadSubmit';
import { ongoingProjects } from '../data/projects';

// Only projects the public may see (never hidden or unregistered ones).
const PROJECT_OPTIONS = [
  ...ongoingProjects.filter((p) => !p.hidden).map((p) => p.name),
  'General Inquiry',
  'Investment Opportunity',
];

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Full name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (fields.phone && !/^[0-9+\-\s()]{7,15}$/.test(fields.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!fields.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function ContactPage() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    interest: PROJECT_OPTIONS[0],
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const lead = useLeadSubmit();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (!(await lead.submit('contact', fields))) return;
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-surface-light border px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 ${
      errors[field] ? 'border-red-400' : 'border-border-light'
    }`;

  return (
    <div className="animate-fade-in">
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <h1 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Contact Us
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h1>
        <p className="text-text-tertiary max-w-[600px] mx-auto">
          We would love to hear from you. Reach out to discuss your dream home or learn more about our projects.
        </p>
      </div>

      <div className="py-16 md:py-24 px-5">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Left: form */}
            <div>
              <h3 className="font-serif text-navy text-2xl mb-2">Send Us a Message</h3>
              <p className="text-text-tertiary leading-[1.8] mb-8 text-sm">
                Fill in the form and our team will get back to you within one business day.
              </p>

              {submitted ? (
                <div className="border border-gold bg-gold/10 p-8 text-center">
                  <span className="block text-gold font-bold text-lg mb-2 uppercase tracking-[2px]">
                    Thank You
                  </span>
                  <p className="text-text-primary leading-[1.8]">
                    Your message has been received. We will be in touch shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFields({ name: '', email: '', phone: '', interest: PROJECT_OPTIONS[0], message: '' }); }}
                    className="mt-6 text-sm uppercase tracking-[2px] text-gold border border-gold px-6 py-2 hover:bg-gold hover:text-navy transition-all duration-300"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onFocusCapture={lead.markStart} noValidate className="flex flex-col gap-5">
        <input {...lead.honeypotProps} />
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={fields.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                      placeholder="Priya Mehta"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      placeholder="priya@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">
                      Phone Number <span className="text-text-muted font-normal normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={fields.phone}
                      onChange={handleChange}
                      className={inputClass('phone')}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">
                      Interested In
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={fields.interest}
                      onChange={handleChange}
                      className="w-full bg-surface-light border border-border-light px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer"
                    >
                      {PROJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-[2px] text-navy font-bold mb-2">
                      Message <span className="text-gold">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      className={`${inputClass('message')} resize-none`}
                      placeholder="Tell us about your requirements…"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {lead.error && <p role="alert" className="text-red-700 text-sm">{lead.error}</p>}
                  <button
                    type="submit"
                    disabled={lead.sending}
                    className="self-start bg-gold text-navy px-10 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Right: contact info */}
            <div className="flex flex-col gap-8">
              <div className="bg-navy text-white p-8 border border-gold">
                <span className="block text-[0.8125rem] font-extrabold uppercase tracking-[3px] mb-3 text-gold">
                  Corporate Office
                </span>
                <p className="text-text-light leading-[1.8] mb-4">
                  F-34, Sej Plaza, Marve Road,<br />
                  Malad West, Mumbai - 400 064
                </p>
                <a
                  href="https://maps.google.com/?q=F-34+Sej+Plaza+Marve+Road+Malad+West+Mumbai+400064"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] text-gold border border-gold/50 px-4 py-2 hover:bg-gold hover:text-navy transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  View on Google Maps
                </a>
              </div>

              <div className="bg-navy text-white p-8 border border-gold">
                <span className="block text-[0.8125rem] font-extrabold uppercase tracking-[3px] mb-3 text-gold">
                  Email
                </span>
                <a href="mailto:u.k.builders1981@gmail.com" className="text-text-light no-underline hover:text-gold transition-colors duration-300">
                  u.k.builders1981@gmail.com
                </a>
              </div>

              <div className="bg-navy text-white p-8 border border-gold">
                <span className="block text-[0.8125rem] font-extrabold uppercase tracking-[3px] mb-3 text-gold">
                  Phone
                </span>
                <a href="tel:+919820311177" className="text-text-light no-underline hover:text-gold transition-colors duration-300">
                  +91 98203 11177
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
