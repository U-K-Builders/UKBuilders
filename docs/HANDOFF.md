# U.K. Builders: handoff (6 November 2026, updated 13 November)

Read this first if you are a new Claude Code session (or a person) picking up
the work. It covers both repositories. Owner: Avi (GitHub `rishonavi`).
Krish is no longer involved: don't assign or mention him.

---

## 1. The two projects

| | Public website | Customer & Owner Portal |
|---|---|---|
| Repo | `U-K-Builders/UKBuilders` (**public**) | `U-K-Builders/UKBuilders_Portal` (**private**) |
| Purpose | Show the company, build trust, collect enquiries | Logged-in area for buyers and staff |
| State | **Live** on Vercel | **Not started.** Only legacy reference code and a README |
| Stack | React 19, Vite 8, Tailwind v4, React Router 7, one Vercel function | To be decided; recommended: same stack + Supabase Auth |

Company facts the owner confirmed (don't change without asking): building
since **1969**, company founded **1981**, **50+ projects, 3,000+ families**.
Justin: possession Aug 2027, RERA `PR1180002500760`. Christina: possession
Aug 2028, RERA `PR1180002600221`. Phone +91 98203 11177, WhatsApp
+91 77100 38007, email u.k.builders1981@gmail.com, office F-34 Sej Plaza,
Marve Road, Malad West, Mumbai 400 064.

Owner answers (13 Nov 2026), so nobody invents these:
- The businesses are **partnership firms** (U.K. Builders, U.K. Properties): there is **no CIN**. Show the firm name and GSTIN instead. GSTIN: TODO, Avi will provide.
- **Elvira** is not yet MahaRERA registered (in progress), so it is hidden everywhere (`hidden: true` in `src/data/projects.js`). Unhide only with its RERA number.
- **Investor figures** (appreciation, on-time %, yields, pipeline) are unverified and removed; the list is in a TODO at the top of `src/pages/InvestorsPage.jsx`. Restore only with a source.
- Contact person and details, the privacy decisions, and which extra pages to keep (Investors, Redevelopment, Contractors, Careers, Buyer Guides, Video Call): TODO, Avi will provide.
- The old admin password from the removed client-side login is being changed by Avi wherever it was reused.

---

## 2. Accounts and infrastructure

| Service | Where | Notes |
|---|---|---|
| GitHub | org `U-K-Builders` | Claude GitHub App installed on all repos |
| Vercel | team **UK Builders**, project `uk-builders` | Production: `uk-builders-three.vercel.app` (public). Previews need a Vercel login. No custom domain yet |
| Supabase | org "U-K-Builders's Org", project `uk-builders-leads` (ref `fsygoyrccdhojlbeddbx`, region ap-south-1 Mumbai) | Holds `public.leads` |
| Resend | not set up yet | For lead alert emails |

**Vercel environment variables (website):** `SUPABASE_URL` ✅,
`LEAD_ALERT_EMAIL` = u.k.builders1981@gmail.com ✅,
`LEAD_ALERT_FROM` = `U.K. Builders Website <onboarding@resend.dev>` ✅,
`SUPABASE_SECRET_KEY` ✅ and `RESEND_API_KEY` ✅ (both Production only,
marked Sensitive; confirmed by the November 2026 audit). Forms on preview
links therefore say "temporarily unavailable"; that's expected.
Secrets are added by Avi in the dashboards, never pasted into chat or files.

---

## 3. Website: how it works now

- **Branches:** `main` = live (every push deploys) and **only changes with the
  owner's explicit approval**. Each piece of work gets its own
  `feature/<name>` branch with its own Vercel preview. `ui` holds approved work
  waiting for release. Before each release copy `main` to
  `backup/main-YYYY-MM-DD`, then merge. Phase 3 branches build on
  `feature/foundation` (see "Phase 3 file ownership" below).
  Old merged branches (`ui-redesign`, `claude/*`, `archive/owner-portal-admin`)
  can be deleted.
- **Leads:** every form → `useLeadSubmit` hook → `POST /api/lead`
  (`api/lead.js`) → Supabase `public.leads`, then an optional Resend email.
  The function validates input, uses a honeypot and minimum fill time, limits
  5 submits per IP per 10 min and 300 per hour site-wide, and stores only a
  salted IP hash. Forms only say "thank you" when the lead is stored.
- **Database security:** RLS on, **no policies**, all privileges revoked from
  `anon`/`authenticated`; default privileges for new tables revoked too. Only
  the server's secret key can read or write. Details in `docs/SECURITY.md`.
- **SEO:** per-route titles and descriptions (`src/data/pageMeta.js`,
  `usePageMeta`), Open Graph and Twitter tags plus JSON-LD in `index.html`
  (preview URLs point to the `vercel.app` host until a domain exists),
  `robots.txt`, share image `public/images/og-image.jpg`.
- **Design:** navy and gold brand, Cinzel + Josefin Sans. `.text-gold` adapts
  (deep gold on light, bright on navy); use `text-gold-bright` for gold text on
  an element that itself has a navy background. An axe-core audit of all pages
  (desktop and mobile) found **0 WCAG A/AA violations** on release.
- **Project visibility** (`src/data/projects.js`): `hidden: true` (Elvira, New
  Life, Madonna) means shown nowhere; `timelineOnly: true` (Shanti Niketan) means
  Timeline only. Completed projects without a photo appear only on the Timeline;
  the Completed page shows the 5 with photos.
- **Photos:** live only in `photos/` (full resolution, metadata stripped; see
  `photos/README.md`). `npm run dev`/`build` generates web copies into
  `public/images/` (git-ignored) with `scripts/build-images.mjs` (sharp).
- **Removed from the public site:** `/owner-portal`, `/admin-dashboard`, the
  client-side login and the hardcoded encryption key. They now live in the
  portal repo under `legacy-from-public-site/`.
- **Lint:** `npx eslint src api scripts` reports 0 errors (the 6 older ones
  were fixed or removed with dead code on `feature/foundation`). Plain
  `npm run lint` also scans `.claude/worktrees`, so use the command above.
- **Testimonials:** all six quotes are hidden (`permitted: false` in
  `src/data/testimonials.js`) until Avi confirms each with the buyer's written
  permission, project and year. The home-page section disappears when none is
  permitted.

### How to edit site content

Change the data file, not the component. Anything still unknown is `null`
with a `TODO(owner)` comment; components show nothing for it, so never fill
one in with a guess.

| To change… | Edit |
|---|---|
| Phone, WhatsApp, email, office address and map link, social links, company facts (since 1969, founded 1981, 50+ projects, 3,000+ families), GSTIN, contact person, visit hours | `src/data/site.js` (`COMPANY`, `CONTACT`, `SOCIAL`) |
| MahaRERA numbers and QR images | `src/data/site.js` (`RERA`); QR images go in `photos/rera/` |
| Consent line under forms | `src/data/site.js` (`CONSENT`) |
| Footer small print (copyright, disclaimer line, Privacy/Disclaimer links) | `src/data/site.js` (`LEGAL`) |
| Menu items, footer link columns, button labels (Call, WhatsApp, Enquire…) | `src/data/navigation.js` |
| Which projects appear (cards, maps, dropdowns, timeline), hiding a project | `src/data/projects.js` |
| A project page: specs, floor plans, amenities, finishes, shops, neighbourhood | `src/data/projectDetails.js` |
| Construction progress (stages, %, date confirmed) | `src/data/progress.js` |
| Buyer quotes (and permission to show them) | `src/data/testimonials.js` |
| Area pages (/flats-in-malad-west, /flats-in-orlem) | `src/data/areas.js` |
| Page titles and Google descriptions | `src/data/pageMeta.js` (project pages: built from `projectDetails.js`) |
| Photos | `photos/` (then `npm run images`, or just `npm run dev`/`build`) |
| Colours, fonts, text sizes, spacing | `src/index.css` (`@theme` tokens; see CLAUDE.md "Tailwind Setup") |
| Other page text | still inside the page in `src/pages/` (move it to `src/data/` when you touch it) |

### Phase 3 file ownership

Four branches are built in parallel on top of `feature/foundation`. To avoid
merge conflicts, each file has one owner; only that branch edits it. If you
need a change in someone else's file, ask the lead to coordinate.

| Branch | Owns |
|---|---|
| **A** `feature/navigation-design` | `Header.jsx`, `Footer.jsx` (layout), `MobileActionBar.jsx`, `AccessibilityPanel.jsx`, `src/data/navigation.js`, `HomePage.jsx`, `HeroSection.jsx`, `ProjectCard.jsx`, `OngoingProjectsPage.jsx`, `ProjectDetailPage.jsx` (layout), `CompletedProjectsPage.jsx`, `SignatureCard.jsx`, `TimelinePage.jsx`, `Carousel3D.jsx`, `SectionTitle.jsx`, `PageTransition.jsx`, `ScrollToTopButton.jsx`, `Lightbox.jsx`, `Icon.jsx`, `NotFoundPage.jsx`, `Button.jsx`, `src/index.css`, `useTheme.js`, `useAccessibility.js`, `useInView.js`; and which of the other pages stay (OurStory, History, Gallery, Upcoming, Investors, Redevelopment, Contractors, Careers, Resources, Book a call) and their layout |
| **B** `feature/trust` | `TrustPillars.jsx`, `Testimonials.jsx`, `TestimonialCard.jsx`, `src/data/testimonials.js`, `ReraBadge.jsx`, `src/data/progress.js`, `PrivacyPage.jsx`, `DisclaimerPage.jsx`, footer legal content in `src/data/site.js` (`LEGAL`, `RERA` QR images, `COMPANY.gstin`), `photos/rera/`, unverified claims in `src/data/projectDetails.js` and the extra pages' text |
| **C** `feature/enquiry-flow` | All forms (`ContactPage.jsx`, `VirtualCallPage.jsx`, the forms inside `ProjectDetailPage.jsx` and the extra pages; best moved into their own components first), `EnquiryModal.jsx`, `WaitlistModal.jsx`, `useLeadSubmit.js`, `useDialog.js`, `api/lead.js` (alert step), `EmiCalculator.jsx` (already placed on the project page), brochure and site-visit flow, `ConsentNote.jsx` and its placement, `CONSENT` in `src/data/site.js` |
| **D** `feature/security-speed` | `vercel.json`, `package.json` / `package-lock.json` (dependencies), `index.html`, fonts, `scripts/build-images.mjs`, `public/` (sitemap, robots, removing `_headers`/`_redirects`), `AreaPage.jsx`, `src/data/areas.js`, `src/data/pageMeta.js`, `usePageMeta.js`, the four map components, meta tags, analytics, lazy-loading routes in `src/App.jsx` |

Shared rules: `src/App.jsx` belongs to D; A adds or removes a route only when
it adds or deletes a page, in its own small commit. `CONTACT` and `COMPANY` in
`src/data/site.js` change only when Avi confirms a fact, by whichever branch
receives it. Inside a page owned by A, C changes only the form and A only the
layout around it.

---

## 4. Open tasks (GitHub issues in `UKBuilders`)

Tracking issue: **#49 Launch checklist**.

| # | Task | Blocked on |
|---|---|---|
| 50 | Add `SUPABASE_SECRET_KEY` to Vercel: **set** (audit, 12 Nov). Close after one real test enquiry from the live site arrives | Avi (test enquiry) |
| 54 | Resend account **with u.k.builders1981@gmail.com**: `RESEND_API_KEY` **set**; check the alert email arrives with that test enquiry | Avi |
| 51 | MahaRERA QR codes next to RERA numbers (legal requirement) | Avi to download from the MahaRERA portal and attach the images in a Claude session |
| 52 | Update Justin and Christina construction progress (still says Q2 2026) | Avi to send current stages and photos |
| 53 | Check the new live site on phone and laptop | Avi |
| 55 | Connect the company domain (later): then update OG URLs, `ALLOWED_ORIGINS`, sitemap, Resend sender | Domain |
| 57 | Delete the old Vercel project and the Railway project, revoke leaked tokens | Account access |
| 58 | Two-factor authentication on GitHub, Vercel and Supabase | Avi |

Also: more photos of completed buildings (each becomes a card once it has one).

---

## 5. Portal: where to start

**Goal:** a secure logged-in area. Phase 1 suggestion:

1. **Staff leads view:** staff log in and see and update website leads
   (`status`: new → contacted → qualified → closed/spam). This replaces reading
   leads in the Supabase table editor.
2. **Buyer area:** a buyer sees their own unit, payment schedule, demand
   letters, receipts, documents and construction photos; can raise queries.
3. **Owners after possession:** don't build this. Use MyGate, ApnaComplex or
   NoBrokerHood.

**Security rules (non-negotiable)**
- Real authentication: Supabase Auth (email OTP or magic link; phone OTP
  later). Never a password or hash in browser code.
- Every table: RLS on, explicit policies. Buyers see only their own rows. Staff
  via a `staff` role or table checked in policies, not in the frontend.
- The public website's `leads` table is locked to the secret key. To let
  staff read it, add a policy for authenticated staff only, never for `anon`.
  Consider whether the portal should use the same Supabase project (simpler,
  shared leads) or a separate one (stronger isolation).
- Sensitive files (PAN, agreements, payment proofs) in **private** storage
  buckets with short-lived signed URLs.
- No secrets in the repo; `.env*` in `.gitignore`. Only `VITE_SUPABASE_URL` and
  the publishable key may be in frontend code.
- Run Supabase Advisors → Security after every migration.

**Legacy code** in `legacy-from-public-site/` is **reference only**: its
"login" compared a SHA-256 hash in the bundle and its "encryption" key was
public. Both were in the public repo, so treat them as compromised. Reuse
layouts and form fields, not logic.

**Hosting:** a separate Vercel project in the UK Builders team, e.g. on
`portal.<company-domain>` once the domain exists. Link to it from the website
header ("Owner Login") only when real login works.

---

## 6. Working with Claude

- Website work: branch from `ui`, preview, then release via the backup and
  merge workflow. Portal work: normal feature branches into `main`.
- Never put keys in chat. Use dashboards; ask Claude for the steps.
- To give Claude new images (QR codes, photos), attach them in the chat or in
  a GitHub issue comment.
- Grant Claude access to new repos: github.com/organizations/U-K-Builders/settings/installations → Claude → Configure.
