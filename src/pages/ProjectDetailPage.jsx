import { useState, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectDetails } from '../data/projectDetails';
import Lightbox from '../components/Lightbox';
import EnquiryModal from '../components/EnquiryModal';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const ProjectLocationMap = lazy(() => import('../components/ProjectLocationMap'));
const NeighbourhoodMap = lazy(() => import('../components/NeighbourhoodMap'));

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeading({ children }) {
  return (
    <h3 className="font-serif text-navy text-2xl md:text-3xl font-normal uppercase tracking-[2px] mb-2">
      {children}
      <span className="block w-[50px] h-[2px] bg-gold mt-3 mb-8" />
    </h3>
  );
}

function ProgressStepper({ steps }) {
  return (
    <>
      {/* Desktop: horizontal */}
      <div className="hidden md:block relative pt-2 pb-6">
        <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-border-light" />
        <div className="flex justify-between">
          {steps.map((step, i) => {
            const done = step.status === 'done';
            const active = step.status === 'active';
            return (
              <div key={i} className="flex flex-col items-center flex-1 relative">
                <div className={`w-8 h-8 rounded-full border-2 z-10 flex items-center justify-center shrink-0 ${
                  done ? 'bg-gold border-gold' : active ? 'bg-navy border-gold ring-4 ring-gold/25' : 'bg-white border-border-light'
                }`}>
                  {done && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {active && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                </div>
                <p className={`mt-2 text-center text-[0.625rem] uppercase tracking-[1px] leading-tight max-w-[80px] ${
                  active ? 'text-navy font-bold' : done ? 'text-text-secondary' : 'text-text-muted'
                }`}>{step.label}</p>
                <p className="text-[0.625rem] text-text-muted mt-0.5">{step.date}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden flex flex-col gap-0">
        {steps.map((step, i) => {
          const done = step.status === 'done';
          const active = step.status === 'active';
          const isLast = i === steps.length - 1;
          return (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  done ? 'bg-gold border-gold' : active ? 'bg-navy border-gold ring-4 ring-gold/25' : 'bg-white border-border-light'
                }`}>
                  {done && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {active && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                </div>
                {!isLast && <div className={`w-[2px] h-8 ${done ? 'bg-gold/40' : 'bg-border-light'}`} />}
              </div>
              <div className="pb-6">
                <p className={`text-sm uppercase tracking-[1px] leading-tight ${active ? 'text-navy font-bold' : done ? 'text-text-secondary' : 'text-text-muted'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{step.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 shrink-0" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MilestoneSubscribeForm({ projectName, nextMilestone }) {
  const [fields, setFields] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email address.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-navy border border-gold mt-10 px-8 py-10 flex flex-col md:flex-row items-center gap-6">
        <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center shrink-0 text-gold">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-gold text-sm font-bold uppercase tracking-[2px] mb-1">You&apos;re subscribed</p>
          <p className="text-text-light text-sm leading-[1.8]">
            We&apos;ll notify you at <span className="text-white">{fields.email}</span> whenever {projectName} reaches a new construction milestone.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy border border-gold/40 mt-10 px-8 py-10">
      <div className="flex items-start gap-4 mb-6">
        <span className="text-gold mt-0.5"><BellIcon /></span>
        <div>
          <h4 className="text-white font-serif text-xl tracking-[1px] mb-1">Stay Updated on Construction Progress</h4>
          <p className="text-text-muted text-sm leading-[1.8]">
            Receive an email notification each time {projectName} hits a major construction milestone
            {nextMilestone ? ` — next up: ${nextMilestone}` : ''}.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`w-full bg-white/5 border px-4 py-3 text-white text-sm placeholder-text-muted focus:outline-none focus:border-gold transition-colors duration-300 ${errors.name ? 'border-red-400' : 'border-white/20'}`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="flex-1">
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full bg-white/5 border px-4 py-3 text-white text-sm placeholder-text-muted focus:outline-none focus:border-gold transition-colors duration-300 ${errors.email ? 'border-red-400' : 'border-white/20'}`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <button
            type="submit"
            className="shrink-0 bg-gold text-white px-8 py-3 text-[0.6875rem] uppercase tracking-[2px] border border-gold hover:bg-transparent hover:text-gold transition-all duration-300"
          >
            Notify Me
          </button>
        </div>
        <p className="text-text-muted text-[0.625rem] mt-3 uppercase tracking-[1px]">No spam — milestone updates only. Unsubscribe at any time.</p>
      </form>
    </div>
  );
}

function BookVisitForm({ projectName }) {
  const [fields, setFields] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Name is required.';
    if (!fields.phone.trim()) errs.phone = 'Phone is required.';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(fields.phone)) errs.phone = 'Enter a valid phone number.';
    if (!fields.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email address.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-white border px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors duration-300 ${
      errors[field] ? 'border-red-400' : 'border-border-light'
    }`;

  if (submitted) {
    return (
      <div className="border border-gold bg-gold/10 p-8 text-center">
        <span className="block text-gold font-bold text-lg mb-2 uppercase tracking-[2px]">Thank You</span>
        <p className="text-text-primary leading-[1.8]">
          Our team will contact you shortly to confirm your visit to {projectName}.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFields({ name: '', phone: '', email: '' }); }}
          className="mt-6 text-sm uppercase tracking-[2px] text-gold border border-gold px-6 py-2 hover:bg-gold hover:text-white transition-all duration-300"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="visit-name" className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">
          Full Name <span className="text-gold">*</span>
        </label>
        <input id="visit-name" name="name" type="text" autoComplete="name" value={fields.name} onChange={handleChange} className={inputClass('name')} placeholder="Your name" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="visit-phone" className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">
          Phone Number <span className="text-gold">*</span>
        </label>
        <input id="visit-phone" name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+91 98765 43210" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="visit-email" className="block text-[0.6875rem] uppercase tracking-[2px] text-navy font-bold mb-2">
          Email Address <span className="text-gold">*</span>
        </label>
        <input id="visit-email" name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} className={inputClass('email')} placeholder="you@example.com" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <button type="submit" className="bg-gold text-white px-8 py-4 text-sm tracking-[2px] uppercase border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold">
        Book My Visit
      </button>
    </form>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projectDetails[slug];
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!project) {
    return (
      <div className="animate-fade-in py-32 px-5 text-center">
        <p className="text-text-muted uppercase tracking-[3px] text-sm mb-4">Project Not Found</p>
        <Link to="/projects/ongoing" className="text-gold border border-gold px-8 py-3 text-sm uppercase tracking-[2px] hover:bg-gold hover:text-white transition-all duration-300">
          View All Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative bg-navy overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.name} className="w-full h-[50vh] md:h-[60vh] object-cover opacity-60" />
        ) : (
          <div className="w-full h-[40vh] md:h-[50vh]" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <span className="text-gold text-[0.6875rem] uppercase tracking-[4px] mb-3">{project.subtitle}</span>
          <h1 className="font-serif text-white text-5xl md:text-7xl font-black uppercase tracking-[6px] md:tracking-[10px]">
            {project.name}
          </h1>
          <span className="block w-[60px] h-[2px] bg-gold mx-auto mt-5" />
          <p className="text-text-light max-w-[560px] mt-5 leading-[1.8] text-sm md:text-base">{project.tagline}</p>
        </div>
      </div>

      {/* Stats bar + Register Interest CTA */}
      <div className="bg-navy-dark border-b border-gold/30">
        {(() => {
          const stats = project.buildingSpec ? [
            { label: 'Configurations', value: project.configs },
            { label: 'Building', value: project.buildingSpec },
            { label: 'Built Up Area', value: project.builtUpArea },
            { label: 'Location', value: project.location },
            { label: 'Est. Possession', value: project.possession },
            { label: 'RERA', value: project.rera || 'Pending Registration' },
          ] : [
            { label: 'Configurations', value: project.configs },
            { label: 'Location', value: project.location },
            { label: 'Est. Possession', value: project.possession },
            { label: 'RERA', value: project.rera || 'Pending Registration' },
          ];
          const gridClass = stats.length === 6
            ? 'grid-cols-2 md:grid-cols-3'
            : 'grid-cols-2 md:grid-cols-4';
          return (
            <>
              <div className={`max-w-[1100px] mx-auto grid ${gridClass} divide-x divide-gold/20`}>
                {stats.map(({ label, value }) => (
                  <div key={label} className="px-6 py-6 text-center">
                    <span className="block text-[0.625rem] uppercase tracking-[2px] text-text-muted mb-1">{label}</span>
                    <span className="block text-white text-sm font-serif">{value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gold/20 py-4 text-center">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="bg-gold text-white px-10 py-3 text-[0.6875rem] uppercase tracking-[3px] border border-gold hover:bg-transparent hover:text-gold transition-all duration-300 cursor-pointer"
                >
                  Register Interest
                </button>
              </div>
            </>
          );
        })()}
      </div>

      <div className="py-16 md:py-24 px-5">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-20">

          {/* Amenities */}
          <section>
            <SectionHeading>Amenities</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {project.amenities.map((amenity) => (
                <div key={amenity} className="flex items-start gap-2 bg-surface-light border border-border-light px-4 py-3">
                  <span className="text-gold mt-0.5"><CheckIcon /></span>
                  <span className="text-text-secondary text-sm leading-snug">{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Floor Plans */}
          <section>
            <SectionHeading>Floor Plans</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {project.floorPlans.map((plan) => (
                <div key={`${plan.type}-${plan.subType || ''}`} className={`relative border bg-surface-light p-8 text-center transition-all duration-300 ${plan.soldOut ? 'border-border-light opacity-90' : 'border-border-light hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]'}`}>
                  {plan.soldOut && (
                    <span className="absolute top-3 right-3 text-[0.625rem] uppercase tracking-[2px] font-bold text-red-600 border border-red-600 px-2 py-1 bg-surface-light">
                      Sold Out
                    </span>
                  )}
                  <span className="block gradient-text font-serif text-2xl md:text-3xl font-black tracking-[1.5px] whitespace-nowrap">{plan.type}</span>
                  <span className={`block text-sm font-semibold uppercase tracking-[3px] mt-2 ${plan.subType ? 'text-gold' : 'invisible'}`}>{plan.subType || '—'}</span>
                  <div className="w-12 h-[2px] bg-gold mx-auto my-4" />
                  <p className="text-gold text-sm uppercase tracking-[2px] font-semibold mb-1">Carpet Area</p>
                  <p className="text-navy text-xl font-serif font-bold mb-5">{plan.carpet}</p>
                  <div className="flex justify-center gap-6 text-navy text-base font-semibold mb-6">
                    <span>{plan.beds} Bed</span>
                    <span>{plan.baths} Bath</span>
                  </div>
                  {plan.soldOut ? (
                    <span className="inline-block text-[0.6875rem] uppercase tracking-[2px] text-text-muted border border-border-light px-5 py-2 cursor-not-allowed">
                      Unavailable
                    </span>
                  ) : (
                    <a
                      href="mailto:u.k.builders1981@gmail.com"
                      className="inline-block text-[0.6875rem] uppercase tracking-[2px] text-gold border border-gold px-5 py-2 hover:bg-gold hover:text-white transition-all duration-300"
                    >
                      Request Floor Plan
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Interior Finishes / Mood Board */}
          {project.moodBoard && (
            <section>
              <SectionHeading>Interior Finishes</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.moodBoard.map((item) => (
                  <div key={item.label} className="border border-border-light bg-white hover:border-gold hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.label} className="w-full h-36 object-cover" />
                    ) : (
                      <div className="w-full h-36 bg-surface-subtle flex items-center justify-center">
                        <span className="text-4xl text-gold/40 select-none">{item.icon}</span>
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-navy text-[0.6875rem] uppercase tracking-[2px] font-bold mb-1">{item.label}</p>
                      <p className="text-text-tertiary text-xs leading-[1.6]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Before / After Slider */}
          {project.beforeAfterPhotos?.before?.src && project.beforeAfterPhotos?.after?.src && (
            <section>
              <SectionHeading>Before &amp; After</SectionHeading>
              <div className="w-full h-[420px] border border-border-light overflow-hidden">
                <BeforeAfterSlider
                  before={project.beforeAfterPhotos.before}
                  after={project.beforeAfterPhotos.after}
                  beforeLabel={project.beforeAfterPhotos.beforeLabel || 'Before'}
                  afterLabel={project.beforeAfterPhotos.afterLabel || 'After'}
                />
              </div>
              <p className="text-text-muted text-xs mt-2">Drag the handle to compare</p>
            </section>
          )}

          {/* Commercial Shops */}
          {project.shops && (
            <section>
              <SectionHeading>Commercial Shops</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {project.shops.map((shop, i) => (
                  <div key={i} className="border border-gold/40 bg-navy text-white p-8 text-center hover:border-gold hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300">
                    <span className="block font-serif text-4xl font-black tracking-[2px] mb-1 text-gold">{shop.type}</span>
                    <div className="w-10 h-[2px] bg-gold mx-auto my-4" />
                    <p className="text-text-muted text-xs uppercase tracking-[2px] mb-1">Carpet Area</p>
                    <p className="text-text-light text-base font-serif mb-6">{shop.carpet}</p>
                    <a
                      href="mailto:u.k.builders1981@gmail.com"
                      className="inline-block text-[0.6875rem] uppercase tracking-[2px] text-gold border border-gold px-5 py-2 hover:bg-gold hover:text-white transition-all duration-300"
                    >
                      Enquire Now
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Construction Photos */}
          {project.constructionPhotos !== null && (
            <section>
              <SectionHeading>Site Progress</SectionHeading>
              {project.constructionPhotos && project.constructionPhotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.constructionPhotos.map((photo, i) => (
                    <div
                      key={i}
                      className="overflow-hidden cursor-zoom-in group relative border border-border-light"
                      onClick={() => setLightboxSrc({ src: photo.src, alt: photo.caption })}
                    >
                      <img src={photo.src} alt={photo.caption} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-navy/70 px-3 py-2">
                          <p className="text-white text-[0.625rem] uppercase tracking-[1px]">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-border-light bg-surface-light p-12 text-center">
                  <p className="text-text-muted text-sm uppercase tracking-[2px]">Construction photos coming soon</p>
                  <p className="text-text-muted text-xs mt-2">We&apos;ll be sharing regular site updates as the project progresses.</p>
                </div>
              )}
            </section>
          )}

          {/* Location Map */}
          {project.lat && project.lng && (
            <section>
              <SectionHeading>Location</SectionHeading>
              <p className="text-text-tertiary text-sm mb-6 -mt-4">{project.location}</p>
              <div className="w-full h-[360px] border border-border-light overflow-hidden">
                <Suspense fallback={<div className="w-full h-full bg-surface-subtle flex items-center justify-center text-text-muted text-sm">Loading map…</div>}>
                  <ProjectLocationMap name={project.name} lat={project.lat} lng={project.lng} />
                </Suspense>
              </div>
              <p className="text-xs text-text-muted mt-2">
                <a
                  href={`https://maps.google.com/?q=${project.lat},${project.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  Open in Google Maps ↗
                </a>
              </p>
            </section>
          )}

          {/* Neighbourhood Guide */}
          {project.neighbourhood && (
            <section>
              <SectionHeading>Neighbourhood Guide</SectionHeading>
              <p className="text-text-tertiary text-sm -mt-4 mb-6">
                Schools, hospitals, places of worship, and key landmarks near {project.name}.
              </p>

              {/* Map */}
              <div className="w-full h-[440px] border border-border-light overflow-hidden mb-4">
                <Suspense fallback={<div className="w-full h-full bg-surface-subtle flex items-center justify-center text-text-muted text-sm">Loading map…</div>}>
                  <NeighbourhoodMap
                    name={project.name}
                    lat={project.lat}
                    lng={project.lng}
                    neighbourhood={project.neighbourhood}
                  />
                </Suspense>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[1px] text-text-muted mb-8">
                {[
                  { color: 'bg-gold',        label: 'Project'          },
                  { color: 'bg-blue-500',    label: 'Schools'          },
                  { color: 'bg-red-500',     label: 'Hospitals'        },
                  { color: 'bg-violet-500',  label: 'Religious Places' },
                  { color: 'bg-amber-400',   label: 'Landmarks'        },
                ].map(({ color, label }) => (
                  <span key={label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${color} shrink-0`} />{label}
                  </span>
                ))}
                <span className="ml-auto italic normal-case tracking-normal text-text-muted">Distances are approximate</span>
              </div>

              {/* POI grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { key: 'schools',   color: 'bg-blue-500',   label: 'Schools'           },
                  { key: 'hospitals', color: 'bg-red-500',    label: 'Hospitals'          },
                  { key: 'religious', color: 'bg-violet-500', label: 'Religious Places'   },
                  { key: 'landmarks', color: 'bg-amber-400',  label: 'Landmarks & Transit'},
                ].map(({ key, color, label }) => (
                  <div key={key} className="border border-border-light bg-surface-light p-6">
                    <h4 className="text-navy text-[0.6875rem] uppercase tracking-[3px] font-bold mb-4 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${color} shrink-0`} />
                      {label}
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {(project.neighbourhood[key] || []).map((poi) => (
                        <li key={poi.name} className="flex items-center justify-between gap-4">
                          <span className="text-text-secondary text-sm">{poi.name}</span>
                          <span className="text-text-muted text-xs shrink-0">{poi.distance}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Construction Progress */}
          {project.progress && (
            <section>
              <SectionHeading>Construction Progress</SectionHeading>
              <ProgressStepper steps={project.progress} />
              <MilestoneSubscribeForm
                projectName={project.name}
                nextMilestone={project.progress.find((s) => s.status === 'upcoming')?.label}
              />
            </section>
          )}

          {/* Book a Site Visit */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <SectionHeading>Book a Site Visit</SectionHeading>
                <p className="text-text-tertiary leading-[1.8] -mt-4 mb-8 text-sm">
                  Experience {project.name} in person. Fill in your details and our team will schedule a visit at your convenience.
                </p>
                <div className="bg-navy text-white p-8 border border-gold">
                  <span className="block text-[0.6875rem] uppercase tracking-[3px] text-gold mb-4">Get in Touch</span>
                  <p className="text-text-light text-sm leading-[1.8] mb-2">
                    <a href="tel:+919820311177" className="hover:text-gold transition-colors duration-300">+91 98203 11177</a>
                  </p>
                  <p className="text-text-light text-sm leading-[1.8]">
                    <a href="mailto:u.k.builders1981@gmail.com" className="hover:text-gold transition-colors duration-300">u.k.builders1981@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="bg-surface-light border border-border-light p-8">
                <BookVisitForm projectName={project.name} />
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Back link */}
      <div className="py-8 px-5 border-t border-border-light text-center">
        <Link to="/projects/ongoing" className="text-[0.6875rem] uppercase tracking-[3px] text-gold hover:underline">
          ← Back to All Projects
        </Link>
      </div>

      {lightboxSrc && (
        <Lightbox src={lightboxSrc.src} alt={lightboxSrc.alt} onClose={() => setLightboxSrc(null)} />
      )}

      {enquiryOpen && (
        <EnquiryModal
          projectName={project.name}
          floorPlans={project.floorPlans}
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </div>
  );
}
