import { useState } from 'react';

const GUIDES = [
  {
    title: 'NRI Buying Guide',
    desc: 'Everything an NRI needs to know — FEMA eligibility, NRE/NRO accounts, power of attorney, repatriation of funds, and step-by-step buying process from abroad.',
    icon: '🌐',
    topics: ['FEMA eligibility rules', 'NRE / NRO account usage', 'Power of attorney process', 'Repatriation of sale proceeds'],
  },
  {
    title: 'RERA Checklist',
    desc: 'A practical checklist of what to verify before signing anything — how to read a RERA certificate, what approvals to check, and your rights as a buyer under MahaRERA.',
    icon: '✅',
    topics: ['How to verify on MahaRERA portal', 'Key documents to check', 'Builder obligations under RERA', 'Buyer rights & remedies'],
  },
  {
    title: 'Home Loan Basics',
    desc: 'Understand LTV ratios, EMI calculations, processing fees, and which banks offer the best rates for Mumbai residential property — including NRI-specific loan products.',
    icon: '🏦',
    topics: ['LTV ratios explained', 'EMI calculation method', 'NRI loan products (HDFC, SBI, ICICI)', 'Tax benefits under 80C & 24(b)'],
  },
  {
    title: 'Carpet Area Explained',
    desc: 'A clear breakdown of carpet area, built-up area, and super built-up area — what each means, how they are calculated, and what you are actually paying for.',
    icon: '📐',
    topics: ['Carpet vs built-up vs super built-up', 'Loading factor explained', 'RERA mandated carpet area disclosure', 'How to compare projects fairly'],
  },
];

const FAQS = [
  {
    q: 'What is RERA and why does it matter?',
    a: 'RERA (Real Estate Regulation and Development Act, 2016) is a central law that protects homebuyers. Under MahaRERA (Maharashtra\'s RERA authority), every project must be registered before marketing begins. Registration means the builder has submitted approved plans, land title, and completion timelines — and is legally bound to deliver. Always verify a project on the MahaRERA portal before booking.',
  },
  {
    q: 'What is the difference between carpet area and built-up area?',
    a: 'Carpet area is the actual usable floor space inside your flat — walls excluded. Built-up area adds the thickness of internal and external walls. Super built-up area (or saleable area) further adds your proportionate share of common areas (lobby, staircase, lift shaft, etc.). RERA mandates that all transactions be quoted in carpet area, making it the most transparent measure.',
  },
  {
    q: 'Can NRIs buy residential property in India?',
    a: 'Yes. Indian citizens holding an NRI or OCI status can purchase residential and commercial property in India without prior RBI approval, under FEMA (Foreign Exchange Management Act). Funds must flow through normal banking channels into an NRE or NRO account. Agricultural land, plantation property, and farmhouses are excluded. Repatriation of sale proceeds is permitted subject to annual limits.',
  },
  {
    q: 'What banks offer home loans for U.K. Builders projects?',
    a: 'Most nationalised and private banks offer home loans against approved projects in Malad West. Commonly used lenders include HDFC, SBI, ICICI Bank, Axis Bank, and Bank of Baroda — all of which have dedicated NRI loan products. Loan-to-value (LTV) ratios typically range from 75–90% for resident Indians and 80% for NRIs. Contact our sales team for bank tie-up details specific to Justin and Christina.',
  },
  {
    q: 'What is the typical payment plan structure?',
    a: 'Most ongoing projects follow a construction-linked payment plan: 10–20% at booking, followed by milestone-linked tranches tied to floor slab completion, and the balance on possession. Some banks disburse home loans directly in line with construction milestones. Specific payment schedules for Justin and Christina are available on request from our sales team.',
  },
  {
    q: 'How do I book a flat remotely as an NRI?',
    a: 'NRIs can book through a duly notarised Power of Attorney (POA) given to a trusted representative in India. The booking form, allotment letter, and agreement for sale can be executed via POA. Payment flows through your NRE or NRO account. Our team has extensive experience guiding NRI buyers through this process and can connect you with empanelled lawyers for POA documentation in your country of residence.',
  },
  {
    q: 'What happens at the time of possession?',
    a: 'Before possession, the builder issues an Occupation Certificate (OC) from the municipal authority confirming the building is fit for habitation. You will then be invited for a pre-possession inspection, after which the sale deed is executed and registered at the sub-registrar\'s office. Stamp duty (5–6% in Maharashtra) and registration charges (1%) are payable at this stage. Keys are handed over after full payment and registration.',
  },
];

function DownloadCard({ guide }) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setDone(true);
  };

  return (
    <div className="border border-border-light bg-white flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="p-8 flex-1">
        <span className="text-3xl mb-4 block">{guide.icon}</span>
        <h3 className="font-serif text-navy text-xl uppercase tracking-[2px] mb-3">{guide.title}</h3>
        <p className="text-text-tertiary text-sm leading-[1.8] mb-5">{guide.desc}</p>
        <ul className="flex flex-col gap-2 mb-6">
          {guide.topics.map(t => (
            <li key={t} className="flex items-start gap-2 text-text-secondary text-xs">
              <span className="text-gold mt-0.5 shrink-0">›</span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-8 pb-8">
        {!open && !done && (
          <button
            onClick={() => setOpen(true)}
            className="w-full bg-navy text-gold px-6 py-3 text-xs tracking-[2px] uppercase border border-navy transition-all duration-300 hover:bg-gold hover:text-white hover:border-gold"
          >
            Download Free Guide
          </button>
        )}

        {open && !done && (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 border-t border-border-light pt-6">
            <p className="text-[0.625rem] uppercase tracking-[2px] text-text-muted mb-1">Enter details to receive your guide</p>
            <div>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={fields.name}
                onChange={handleChange}
                className={`w-full border px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-gold transition-colors ${errors.name ? 'border-red-400' : 'border-border-light'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={fields.email}
                onChange={handleChange}
                className={`w-full border px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-gold transition-colors ${errors.email ? 'border-red-400' : 'border-border-light'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-gold text-white px-4 py-2.5 text-xs tracking-[2px] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all duration-300">
                Send Guide
              </button>
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2.5 text-xs text-text-muted border border-border-light hover:border-navy hover:text-navy transition-all duration-300">
                Cancel
              </button>
            </div>
          </form>
        )}

        {done && (
          <div className="border border-gold bg-gold/5 px-5 py-4 text-center">
            <p className="text-gold text-xs uppercase tracking-[2px] font-bold mb-1">Guide on its way</p>
            <p className="text-text-secondary text-xs leading-[1.7]">
              We&apos;ll email <strong>{guide.title}</strong> to <strong>{fields.email}</strong> within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-light">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between gap-4 py-5 bg-transparent border-none cursor-pointer group"
      >
        <span className={`text-sm md:text-base font-serif transition-colors duration-300 ${open ? 'text-gold' : 'text-navy group-hover:text-gold'}`}>
          {faq.q}
        </span>
        <span className={`shrink-0 w-6 h-6 rounded-full border border-gold flex items-center justify-center text-gold transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-text-secondary text-sm leading-[1.9] pb-6 pr-10">
          {faq.a}
        </p>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-surface-light py-16 px-5 text-center border-b border-border-light">
        <p className="text-[0.6875rem] uppercase tracking-[4px] text-gold mb-3">Buyer Education</p>
        <h2 className="text-center text-3xl md:text-4xl text-navy mb-5 uppercase tracking-[3px] font-serif font-normal">
          Knowledge Hub
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-4" />
        </h2>
        <p className="text-text-tertiary max-w-[600px] mx-auto leading-[1.8]">
          Free guides, checklists, and answers to help you make a confident, informed decision — whether you are a first-time buyer, investor, or NRI.
        </p>
      </div>

      {/* Guides */}
      <div className="py-16 md:py-24 px-5 bg-surface-subtle">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2 text-center">
            Free Guides
            <span className="block w-[40px] h-[2px] bg-gold mx-auto mt-3 mb-10" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUIDES.map(guide => (
              <DownloadCard key={guide.title} guide={guide} />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 md:py-24 px-5">
        <div className="max-w-[800px] mx-auto">
          <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2 text-center">
            Frequently Asked Questions
            <span className="block w-[40px] h-[2px] bg-gold mx-auto mt-3 mb-10" />
          </h3>
          <div>
            {FAQS.map(faq => (
              <FaqItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div className="bg-navy py-16 px-5 text-center">
        <h3 className="font-serif text-white text-2xl md:text-3xl font-normal uppercase tracking-[3px] mb-4">
          Still have questions?
        </h3>
        <p className="text-text-muted max-w-[500px] mx-auto mb-8 leading-[1.8] text-sm">
          Our team is happy to walk you through anything — from floor plans to payment plans to the registration process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+919820311177"
            className="inline-block bg-gold text-white px-10 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold"
          >
            Call Us
          </a>
          <a
            href="/book-a-call"
            className="inline-block bg-transparent text-gold px-10 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-gold hover:text-white"
          >
            Book a Video Call
          </a>
        </div>
      </div>
    </div>
  );
}
