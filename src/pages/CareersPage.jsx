import { useState } from 'react';
import { Link } from 'react-router-dom';
import { saveSubmission } from '../utils/submissions';

const OPENINGS = [
  {
    title: 'Site Engineer',
    department: 'Construction',
    type: 'Full-time · On-site',
    location: 'Malad West, Mumbai',
    desc: 'Oversee day-to-day construction activities, coordinate with contractors, and ensure quality standards are met across active project sites.',
    requirements: ['B.E. / B.Tech in Civil Engineering', '2–5 years of residential construction experience', 'Proficiency in AutoCAD and MS Project', 'Strong communication and problem-solving skills'],
  },
  {
    title: 'Sales Executive',
    department: 'Sales & Marketing',
    type: 'Full-time · On-site',
    location: 'Malad West, Mumbai',
    desc: 'Drive residential unit sales through client engagement, site visits, and relationship management. Work closely with the marketing team on campaigns and lead nurturing.',
    requirements: ['Graduate in any discipline', '2+ years of real estate sales experience', 'Excellent interpersonal and negotiation skills', 'Fluency in English, Hindi & Marathi preferred'],
  },
  {
    title: 'Junior Architect',
    department: 'Design',
    type: 'Full-time · On-site',
    location: 'Malad West, Mumbai',
    desc: 'Assist in the design and documentation of residential and mixed-use projects. Collaborate with senior architects and consultants to deliver premium living spaces.',
    requirements: ['B.Arch from a recognised institution', '1–3 years of experience', 'Proficiency in AutoCAD, SketchUp, and Revit', 'Portfolio of residential or commercial projects'],
  },
  {
    title: 'Accounts Executive',
    department: 'Finance',
    type: 'Full-time · On-site',
    location: 'Malad West, Mumbai',
    desc: 'Manage project-level accounts, vendor payments, and financial reporting. Work alongside senior management to ensure accurate and timely financial records.',
    requirements: ['B.Com / M.Com or CA Inter', '2–4 years of experience in real estate or construction finance', 'Proficiency in Tally and MS Excel', 'Attention to detail and high integrity'],
  },
];

const VALUES = [
  { title: 'Legacy & Pride', body: 'Be part of a 55-year-old institution that has shaped the skyline of Malad West — a name every resident of Orlem recognises.' },
  { title: 'Growth & Ownership', body: 'We are a lean, high-ownership team. Your work here is visible, valued, and directly tied to the quality of homes we deliver.' },
  { title: 'Integrity First', body: 'We build with honesty — in our concrete and in our conversations. Every team member is trusted to act with full integrity.' },
  { title: 'Family Culture', body: 'Many of our staff have been with us for over a decade. We invest in our people the same way we invest in our buildings — for the long term.' },
];

function ApplicationForm() {
  const roleOptions = ['Site Engineer', 'Sales Executive', 'Junior Architect', 'Accounts Executive', 'General Application'];
  const [fields, setFields] = useState({ name: '', email: '', phone: '', role: roleOptions[0], message: '' });
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
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.';
    if (!fields.phone.trim()) errs.phone = 'Phone is required.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(fields.phone)) errs.phone = 'Enter a valid phone number.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    await saveSubmission('careers', fields);
    setSubmitted(true);
  };

  const inputClass = (f) =>
    `w-full border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors duration-300 bg-white/10 text-white placeholder-white/30 ${errors[f] ? 'border-red-400' : 'border-white/20'}`;

  if (submitted) {
    return (
      <div className="border border-gold bg-gold/10 p-8 text-center max-w-lg mx-auto">
        <span className="block text-gold font-bold text-sm uppercase tracking-[2px] mb-2">Application Received</span>
        <p className="text-white/70 text-sm leading-[1.8]">
          Thank you, <span className="font-bold text-white">{fields.name}</span>. We'll review your application for <span className="font-bold text-white">{fields.role}</span> and be in touch at <span className="font-bold text-white">{fields.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-lg mx-auto text-left">
      <div>
        <label className="block text-[0.6875rem] uppercase tracking-[2px] text-gold mb-2">Role <span className="text-gold">*</span></label>
        <select name="role" value={fields.role} onChange={handleChange} className="w-full border border-white/20 px-4 py-3 text-sm bg-white/10 text-white focus:outline-none focus:border-gold transition-colors duration-300 cursor-pointer">
          {roleOptions.map((r) => <option key={r} className="text-navy bg-white">{r}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-[0.6875rem] uppercase tracking-[2px] text-gold mb-2">Full Name <span className="text-gold">*</span></label>
        <input name="name" type="text" autoComplete="name" value={fields.name} onChange={handleChange} className={inputClass('name')} placeholder="Your name" />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[0.6875rem] uppercase tracking-[2px] text-gold mb-2">Email <span className="text-gold">*</span></label>
          <input name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} className={inputClass('email')} placeholder="you@example.com" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-[0.6875rem] uppercase tracking-[2px] text-gold mb-2">Phone <span className="text-gold">*</span></label>
          <input name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+91 98765 43210" />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className="block text-[0.6875rem] uppercase tracking-[2px] text-gold mb-2">Cover Note <span className="text-white/40 font-normal normal-case tracking-normal">(optional)</span></label>
        <textarea name="message" rows={3} value={fields.message} onChange={handleChange} className={`${inputClass('message')} resize-none`} placeholder="Brief note about yourself and your experience…" />
      </div>
      <button type="submit" className="bg-gold text-white px-8 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold">
        Submit Application
      </button>
    </form>
  );
}

export default function CareersPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-navy text-white py-28 px-5 text-center">
        <p className="text-gold text-xs tracking-[4px] uppercase mb-4">Join Our Team</p>
        <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6">Build With Us</h1>
        <p className="text-white/70 max-w-xl mx-auto text-base leading-relaxed">
          At U.K. Builders, we don't just construct buildings — we craft legacies. If you share our commitment to quality, integrity, and community, we'd love to hear from you.
        </p>
      </div>

      {/* Why Join Us */}
      <div className="py-20 px-5 max-w-[1100px] mx-auto">
        <p className="text-gold text-xs tracking-[4px] uppercase text-center mb-3">Why U.K. Builders</p>
        <h2 className="font-serif text-3xl text-navy text-center font-normal mb-14">A Place Where Careers Are Built to Last</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map((v) => (
            <div key={v.title} className="border border-[#e8dfc8] p-8">
              <div className="w-8 h-[2px] bg-gold mb-5" />
              <h3 className="font-serif text-xl text-navy mb-3">{v.title}</h3>
              <p className="text-[#555] text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Openings */}
      <div className="bg-surface-subtle py-20 px-5">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-gold text-xs tracking-[4px] uppercase text-center mb-3">Opportunities</p>
          <h2 className="font-serif text-3xl text-navy text-center font-normal mb-14">Current Openings</h2>
          <div className="flex flex-col gap-6">
            {OPENINGS.map((job) => (
              <div key={job.title} className="bg-white border border-[#e8dfc8] p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-serif text-xl text-navy mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs tracking-[1px] uppercase">
                      <span className="text-gold">{job.department}</span>
                      <span className="text-[#999]">·</span>
                      <span className="text-[#666]">{job.type}</span>
                      <span className="text-[#999]">·</span>
                      <span className="text-[#666]">{job.location}</span>
                    </div>
                  </div>
                  <a
                    href="mailto:careers@ukbuilders.in?subject=Application: "
                    className="shrink-0 inline-block bg-gold text-white px-7 py-3 text-xs tracking-[2px] uppercase no-underline border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
                  >
                    Apply Now
                  </a>
                </div>
                <p className="text-[#555] text-sm leading-relaxed mb-5">{job.desc}</p>
                <div>
                  <p className="text-xs tracking-[2px] uppercase text-navy mb-3">Requirements</p>
                  <ul className="flex flex-col gap-1">
                    {job.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-[#555]">
                        <span className="text-gold mt-[3px] shrink-0">–</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-20 px-5 bg-navy text-white">
        <p className="text-gold text-xs tracking-[4px] uppercase mb-4 text-center">Apply Now</p>
        <h2 className="font-serif text-3xl font-normal mb-5 text-center">Submit Your Application</h2>
        <p className="text-white/70 max-w-lg mx-auto text-sm leading-relaxed mb-10 text-center">
          Select the role you're interested in and fill in your details — we'll be in touch within 5 business days.
        </p>
        <ApplicationForm />
      </div>
    </div>
  );
}
