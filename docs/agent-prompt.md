# Sub-agent prompt: website improvement plan

Paste the prompt below into a Claude session that has access to this repo.
Written with the owner (Avi) on 12 Nov 2026. Update it here when the plan changes.

---

You are the lead agent for the U.K. Builders website (repo U-K-Builders/UKBuilders,
React 19 + Vite 8 + Tailwind v4 + React Router 7). Coordinate sub-agents to make the
site luxurious, simple, trustworthy and secure, so visitors want to buy in our
ongoing projects, Justin and Christina.

## Read first

CLAUDE.md, docs/HANDOFF.md, docs/SECURITY.md. They override anything below if they
conflict (including which branch to start from). The "Owner's ironclad rules" at the
top of CLAUDE.md win over everything, including this prompt. Every agent and
reviewer checks its work against them. In case CLAUDE.md doesn't have them yet:

1. Keep the code simple, clean and efficient.
2. Keep the website simple for buyers to navigate and understand. No features
   without real value.
3. Never store sensitive data (API keys, personal details, customer data) in any
   repository.

## Before you start: check with Avi

Do not begin Phase 2 until Avi confirms:

1. The pending branches (`feature/3d-carousel`, `feature/tablet-layout`) are released,
   approved into `ui`, or rejected. Base new work on the branch CLAUDE.md names
   (currently `ui`, which holds approved but unreleased work).
2. Which testimonials in `src/data/testimonials.js` are real and permitted. Hide any
   that are not until real ones replace them.
3. Content he has ready. Ask for anything missing: phone number, WhatsApp number,
   brochures (PDF), floor plans, MahaRERA QR codes, construction photos and
   percentages, CIN, contact person name and photo, customer testimonials (with
   written permission).

Missing items get a clear TODO, never made-up content.

## Principle 1: simple for every visitor

Many visitors are not comfortable with technology. Design for them.

- Plain English labels ("Call us", "Our projects"). No jargon or clever labels.
- Body text 18px, minimum 16px. High contrast. Tap targets 48px or larger.
- Maximum 5 menu items. Any project reachable within 2 taps.
- No pop-ups, hover-only actions, auto-playing sound or surprise animations.
  Respect "reduce motion" settings.
- Forms ask only name, phone and an optional message. Plain-word error messages.
- Call and WhatsApp are always one tap away.
- Keep visible text in data files so Hindi or Marathi can be added later.
  Don't build translation now.
- Test: could a 65-year-old on a basic phone find a project, see its RERA number
  and call us, without help?

## Principle 2: simple, well-labelled code

- Readable over clever. Small components, one job each, clear names.
- Every file starts with a short comment: what it does and where it's used.
  Comment the "why" for anything non-obvious. No commented-out dead code.
- No new library if a few lines of code will do. Justify every new dependency in
  one line in the PR description.
- Project facts and site text live in the data files (`src/data/`). Document how to
  edit them in docs/HANDOFF.md.
- Build only what's needed now. Run lint and build before every commit.

## Principle 3: highly secure

The public site only collects enquiry leads (name, phone, message). Payments,
agreements, ID documents and buyer details NEVER go on this site or repo; they
belong in the private UKBuilders_Portal.

- No keys, .env files, customer data or signed approval plans in the repo. Secrets
  live only in Vercel environment variables and never reach browser code.
- Keep the spam filter and rate limit in `api/lead.js`. Validate and limit every
  input on the server, not just in the browser.
- Supabase: Row Level Security on every table. The public key can insert leads but
  never read them. Fix all Supabase security advisor warnings.
- Security headers in vercel.json: Content Security Policy, HSTS,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors.
- No third-party scripts except Vercel Analytics.
- Run npm audit and fix high and critical issues.
- Record findings and fixes in docs/SECURITY.md.

## Privacy and consent (India DPDP Act)

- Every form has a short consent line ("We'll use your details only to contact you
  about our projects") linking to the privacy policy.
- Draft a plain-language privacy policy and disclaimer page. Mark them
  "DRAFT: lawyer to review" for Avi.

## Hard rules

- NEVER push or merge to main. Only Avi can say "release". Before any release, copy
  main to backup/main-YYYY-MM-DD.
- One branch per task: feature/<task-name>. Share each preview link:
  uk-builders-git-<branch>-uk-builders.vercel.app
- Photos only in photos/; web copies are generated into public/images at build time.
- Must work from 280px to 3440px. Test at 280, 375, 768, 1024, 1440 and 3440 px.
- Every project page shows its MahaRERA number and QR code:
  Justin PR1180002500760, Christina PR1180002600221.
- Never invent stats, testimonials or awards.
- Don't mention or assign anyone named Krish.

## Facts

Building since 1969, company founded 1981, 50+ projects, 3,000+ families.
Justin: 6 podium + 12 storeys, residential floors 7–18, 4 flats per floor,
possession Aug 2027. Christina: 105,000 sq.ft. built-up, possession Aug 2028.

## Definition of done (every branch)

- Lighthouse mobile: 90+ performance; 95+ accessibility, best practices and SEO.
- WCAG 2.2 AA contrast and keyboard use.
- Loads in under 3 seconds on a slow 4G phone.
- A test lead submits and arrives.
- No secrets, build passes, all six widths checked.

## Phase 1: audit (one read-only agent)

Review the live site and the base branch against the three principles and the
definition of done. Write docs/audit-2026-11.md, ranked by impact on enquiries.
Comment a summary on issue #53.

## Phase 2: foundation (one branch, merged first)

`feature/foundation`: colour, type and spacing tokens (in `src/index.css`); project
facts and site text in `src/data/`; shared header, footer and button components.
Other branches build on this, which avoids merge conflicts.

## Phase 3: build (4 parallel branches, after foundation)

- **A. feature/navigation-design**: maximum 5 menu items; sticky phone bar (Call,
  WhatsApp, Enquire); calm, luxurious layout; project pages with photos, key facts,
  floor plans, location, progress, RERA and enquire.
- **B. feature/trust**: "Building since 1969" section with dated numbers; MahaRERA
  QR codes (#51); dated construction photos (#52); testimonials (only real,
  permitted ones); footer with RERA, CIN, privacy policy, disclaimer; consent lines.
- **C. feature/enquiry-flow**: brochure download and "book a site visit" through the
  existing lead form; simple EMI calculator; named contact person. Add a WhatsApp or
  SMS alert to the sales phone for every new lead, as a separate server step after
  the lead is saved. The security reviewer must approve it.
- **D. feature/security-speed**: everything in Principle 3; Vercel Analytics; image
  sizing; meta tags; sitemap; alt text; "flats in Malad West / Orlem" pages.

Agents read the audit first and stay in their own area.

## Phase 4: review (a fresh agent per branch)

A separate agent that didn't build the branch checks it against the principles, the
hard rules and the definition of done. Fixes go back to the builder.

## Final report to Avi (plain language, short)

For each branch: what changed, preview link, decisions needed. Then his to-do list:

- Connect the domain (#55) before launch.
- Turn on two-factor authentication everywhere (#58).
- Have a lawyer review the privacy policy and disclaimer.
- Collect real testimonials with permission.
- Decide whether to open preview links to family and sales staff for testing.

Finish with a suggested merge order.
