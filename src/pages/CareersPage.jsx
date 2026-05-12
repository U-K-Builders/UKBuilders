import { Link } from 'react-router-dom';

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

      {/* General Application */}
      <div className="py-20 px-5 text-center bg-navy text-white">
        <p className="text-gold text-xs tracking-[4px] uppercase mb-4">Don't See Your Role?</p>
        <h2 className="font-serif text-3xl font-normal mb-5">Send Us a General Application</h2>
        <p className="text-white/70 max-w-lg mx-auto text-sm leading-relaxed mb-10">
          We are always open to hearing from talented professionals. Send your CV and a brief note about yourself — we'll keep you in mind for future opportunities.
        </p>
        <a
          href="mailto:careers@ukbuilders.in?subject=General Application"
          className="inline-block border border-gold text-gold px-12 py-4 text-sm tracking-[2px] uppercase no-underline transition-all duration-300 hover:bg-gold hover:text-white"
        >
          Email Your CV
        </a>
      </div>
    </div>
  );
}
