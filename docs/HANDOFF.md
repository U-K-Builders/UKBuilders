# U.K. Builders: handoff (6 November 2026)

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
`SUPABASE_SECRET_KEY` ❌ **missing**, `RESEND_API_KEY` ❌ missing.
Secrets are added by Avi in the dashboards, never pasted into chat or files.

---

## 3. Website: how it works now

- **Branches:** `main` = live (every push deploys) and **only changes with the
  owner's explicit approval**. Each piece of work gets its own
  `feature/<name>` branch with its own Vercel preview. `ui` holds approved work
  waiting for release. Before each release copy `main` to
  `backup/main-YYYY-MM-DD`, then merge. In progress: `feature/3d-carousel`.
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
- **Project visibility** (`src/data/projects.js`): `hidden: true` (New Life,
  Madonna) means shown nowhere; `timelineOnly: true` (Shanti Niketan) means
  Timeline only. Completed projects without a photo appear only on the Timeline;
  the Completed page shows the 5 with photos.
- **Photos:** live only in `photos/` (full resolution, metadata stripped; see
  `photos/README.md`). `npm run dev`/`build` generates web copies into
  `public/images/` (git-ignored) with `scripts/build-images.mjs` (sharp).
- **Removed from the public site:** `/owner-portal`, `/admin-dashboard`, the
  client-side login and the hardcoded encryption key. They now live in the
  portal repo under `legacy-from-public-site/`.
- **Lint:** 6 known, older errors (empty catch blocks, setState-in-effect in
  `Carousel.jsx`, refs in `BeforeAfterSlider.jsx`). They don't break the build.

---

## 4. Open tasks (GitHub issues in `UKBuilders`)

Tracking issue: **#49 Launch checklist**.

| # | Task | Blocked on |
|---|---|---|
| **50** | **Add `SUPABASE_SECRET_KEY` to Vercel. Until then, live forms show an error** | Avi (dashboard) |
| 54 | Create a Resend account **with u.k.builders1981@gmail.com**, add `RESEND_API_KEY` | Avi |
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
