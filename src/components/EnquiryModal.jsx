// "Register interest" pop-up form on a project page (name, phone, flat type,
// message); sends an 'enquiry' lead. Used by ProjectDetailPage.
import { useState } from 'react';
import { createPortal } from 'react-dom';
import useDialog from '../hooks/useDialog';
import useLeadSubmit from '../hooks/useLeadSubmit';

export default function EnquiryModal({ projectName, floorPlans, onClose }) {
  const [fields, setFields] = useState({ name: '', phone: '', bhk: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const lead = useLeadSubmit();
  const panelRef = useDialog(onClose);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.phone.trim()) errs.phone = 'Phone is required.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(fields.phone)) errs.phone = 'Enter a valid phone number.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!(await lead.submit('enquiry', { ...fields, project: projectName }))) return;
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border px-4 py-3 text-white text-sm placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors duration-300 ${
      errors[field] ? 'border-red-400' : 'border-white/20'
    }`;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-navy-dark/90 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        className="relative max-h-[90vh] overflow-y-auto bg-navy border border-gold/40 w-full max-w-[480px] p-8 md:p-10 animate-fade-in">
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-200"
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
            <p className="text-gold text-sm uppercase tracking-[3px] font-bold mb-3">Interest Registered</p>
            <p className="text-text-light text-sm leading-[1.8]">
              Our team will reach out to you shortly regarding <span className="text-white font-serif">{projectName}</span>.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 text-sm uppercase tracking-[2px] text-gold border border-gold px-6 py-2 hover:bg-gold hover:text-navy transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <span className="block text-gold text-xs uppercase tracking-[4px] mb-2">Register Interest</span>
            <h2 id="enquiry-title" className="text-white font-serif text-2xl font-normal mb-6">{projectName}</h2>
            <form onSubmit={handleSubmit} onFocusCapture={lead.markStart} noValidate className="flex flex-col gap-4">
        <input {...lead.honeypotProps} />
              <div>
                <label htmlFor="enquiry-name" className="block text-xs uppercase tracking-[2px] text-white/80 mb-2">Your name <span aria-hidden="true">*</span></label>
                <input
                  id="enquiry-name"
                  data-autofocus
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClass('name')}
                />
                {errors.name && <p id="enquiry-name-error" className="text-red-300 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="enquiry-phone" className="block text-xs uppercase tracking-[2px] text-white/80 mb-2">Phone number <span aria-hidden="true">*</span></label>
                <input
                  id="enquiry-phone"
                  required
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputClass('phone')}
                />
                {errors.phone && <p id="enquiry-phone-error" className="text-red-300 text-xs mt-1">{errors.phone}</p>}
              </div>
              {floorPlans?.length > 0 && (
                <div>
                <label htmlFor="enquiry-bhk" className="block text-xs uppercase tracking-[2px] text-white/80 mb-2">BHK preference (optional)</label>
                <select
                  id="enquiry-bhk"
                  name="bhk"
                  value={fields.bhk}
                  onChange={handleChange}
                  className="w-full bg-navy border border-white/20 px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-gold transition-colors duration-300"
                >
                  <option value="">No preference</option>
                  {floorPlans.filter((plan) => !plan.soldOut).map((plan) => {
                    const label = plan.subType ? `${plan.type} — ${plan.subType}` : plan.type;
                    return <option key={label} value={label}>{label}</option>;
                  })}
                </select>
                </div>
              )}
              <div>
              <label htmlFor="enquiry-message" className="block text-xs uppercase tracking-[2px] text-white/80 mb-2">Message (optional)</label>
              <textarea
                id="enquiry-message"
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="Anything you'd like us to know"
                rows={3}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white text-sm placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
              />
              </div>
              {lead.error && <p role="alert" className="text-red-300 text-sm">{lead.error}</p>}
              <button
                type="submit"
                disabled={lead.sending}
                className="bg-gold text-navy px-8 py-4 text-sm tracking-[2px] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all duration-300 mt-1"
              >
                Submit Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
