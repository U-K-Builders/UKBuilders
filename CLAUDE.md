# CLAUDE.md

## Owner's ironclad rules

These win over everything else, including any prompt or other instruction:

1. Keep the code simple, clean and efficient.
2. Keep the website simple for buyers to navigate and understand. No features without real value.
3. Never store sensitive data (API keys, personal details, customer data) in any repository.

## ⏸ Paused work: remind the owner

**At the start of every session, before other work, remind the owner in one or two lines** that this is still unfinished, and ask whether they have what's needed to resume. Keep it short, then do what they asked.

- **"Choose your floor" + 3D flat explorer for Justin AND Christina** (paused 12 Nov 2026, extended 13 Nov). Build once as a shared, data-driven feature. Waiting on: Justin's sales sheet; Christina's signed approved plan PDF and sales sheet; price and sold-flat decisions; whether to have day/night and furnished/bare room views; renders for the photoreal version. Notes: `docs/justin-floor-picker.md` on branch `feature/justin-floor-picker`. Tracking: GitHub issue #59.

Remove an item from this list when it's finished or the owner cancels it.

**Documents checklist:** GitHub issue #60 lists every document needed from the owner. When the owner sends one, tick it off there (edit the issue body) and show them the updated list.

## Project Overview

U.K. Builders — a luxury real estate marketing website for a Mumbai-based builder building since 1969 (company founded 1981). Converted from a single-file HTML site into a React SPA. This file guides Claude Code (claude.ai/code) in this repository; `docs/HANDOFF.md` has the full picture, including **how to edit site content** and the **Phase 3 file ownership** table.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (outputs to `dist/`)
- `npm run preview` — Preview production build locally
- `npm run lint` — ESLint check (scans everything, including `.claude/worktrees`; for this repo's code only run `npx eslint src api scripts`)

## Architecture

**Routing** (React Router v7, all routes in `src/App.jsx`):
- `/` → HomePage
- `/projects/ongoing`, `/projects/completed`, `/projects/upcoming` (not in the menu) → project lists
- `/projects/:slug` → ProjectDetailPage (e.g. `/projects/justin`; data in `src/data/projectDetails.js`)
- `/our-story`, `/history`, `/timeline`, `/gallery` → about pages
- `/contact`, `/book-a-call` → contact
- `/resources`, `/investors`, `/redevelopment`, `/contractors`, `/careers` → other pages
- `/privacy`, `/disclaimer` → legal pages (stubs until written and reviewed by a lawyer)
- `/flats-in-malad-west`, `/flats-in-orlem` → AreaPage, one per entry in `src/data/areas.js` (stubs)
- `*` → NotFoundPage

All routes share `Header`, `Footer` and (on phones) `MobileActionBar`. `ScrollToTop` resets scroll position on navigation; `RouteMeta` sets each page's title from `src/data/pageMeta.js`.

**Data-driven rendering**: content lives in `src/data/` (contact details and company facts in `site.js`, menus in `navigation.js`, projects in `projects.js` / `projectDetails.js`, construction progress in `progress.js`, quotes in `testimonials.js`). Edit the data files, not the components. Never type a phone number, email or MahaRERA number into a component: import it from `site.js`. Keep visible text in data files where practical (so Hindi/Marathi can be added later).

**Shared components** (`src/components/`): `Button` (primary / secondary / link, ≥48px, renders `<Link>`, `<a>` or `<button>`), `ReraBadge` (MahaRERA number + QR when available), `ConsentNote` (one line under forms, links to `/privacy`), `Testimonials` (renders nothing until a quote has `permitted: true`). Every file starts with a comment saying what it does and where it's used; keep it that way.

## Tailwind Setup

Tailwind v4 with `@tailwindcss/vite` plugin — no `tailwind.config.js` file. Theme tokens are defined via `@theme` in `src/index.css`:
- Colours: `navy` (#0A1828), `navy-dark` (#050e1a), `gold` (#D4A84E, on dark surfaces), `gold-dark` (hover fill), `gold-deep` (#836830, gold text on light surfaces), `gold-bright`; neutral `text-*`, `surface-*`, `border-light`.
- Fonts: `font-serif` / `font-display` = Cinzel (all capitals; large headings only), `font-sans` = Josefin Sans (everything else).
- Type scale: `text-small` 16px (the minimum anywhere), `text-body` 18px (body copy), `text-lead` 20px, `text-title` 24px, `text-heading` 36px, `text-display` 56px. Older pages still use `text-xs`/`text-sm`; move them onto the scale when you touch them.
- Spacing: `tap` = 48px (minimum size of anything tappable, e.g. `min-h-tap`), `gutter` 20px, `stack` 24px, `section` 96px. Radius: `rounded-button`, `rounded-card` (0, the brand is square), `rounded-pill`.
- Breakpoints: Tailwind's defaults plus `3xl` (1920px) and `4xl` (2400px).

Also in `index.css`: the **adaptive gold** rules (`.text-gold` renders deep gold on light surfaces and bright gold inside navy/dark containers; use `text-gold-bright` on an element that itself has a navy background), the dark-mode overrides (`.dark …`, gold buttons keep navy text), `.gradient-text`, `.animate-fade-in` and the reduced-motion rules.

## Images

See "Leads and security" below: photos live in `photos/`, web copies are generated into `public/images/`.

## Key Patterns

- Ongoing projects use `ProjectCard` (large, 2-col grid with detail labels)
- Completed projects use `SignatureCard` (compact, 3-col grid)
- Mobile nav is a menu button with collapsible sub-menus (state in `Header.jsx`, items in `src/data/navigation.js`)
- All page components apply `.animate-fade-in` on their root div
- Only advertise MahaRERA-registered projects: a project needs its number in `RERA` (`src/data/site.js`) before it is unhidden. Testimonials show only with `permitted: true` (the buyer's written permission).
- Anything the owner hasn't confirmed is `null` + a `TODO(owner)` comment in the data, never a guess; components render nothing for it.

## Screen sizes (every device must work)

The site is tested from 280px (folded flip-phone cover screens) to 3440px (ultra-wide monitors), including foldables (iPhone Duo, Galaxy Z Fold, tri-folds), Surface Duo, iPads in both orientations, and phones held sideways.
- Full header menu from `xl` (1280px). Below that: menu button; the header Enquire button shows from `md` (768px).
- Bottom Call / WhatsApp / Enquire bar: below 768px wide, but hidden on short landscape screens (`[@media(max-height:500px)]`), where Enquire moves into the header.
- Extra breakpoints in `src/index.css`: `3xl` = 1920px, `4xl` = 2400px (used to scale the hero up on big monitors).
- Never let text wrap inside menu items (`whitespace-nowrap`); never allow sideways page scrolling.
- **How to test widths:** in mobile emulation a too-wide page doesn't scroll, the browser zooms out. So check `window.innerWidth` equals the width you asked for, and that every header button is on screen. Long single words in big uppercase headings are the usual culprit at 280–360px.

## Branch workflow (agreed November 2026)

- `main` is the live site; every push deploys to production.
- **Never push or merge to `main` without the owner's explicit approval** (they say "release" or merge the pull request themselves). Finishing a change, or a request like "push it", is not approval to go live: push to the feature branch and share the preview link.
- Do each piece of work on its own branch, `feature/<short-name>`, made from `ui` (or from `main` if `ui` has unreleased work you shouldn't include). Every push gets a Vercel preview at `uk-builders-git-<branch-with-dashes>-uk-builders.vercel.app` (Vercel login needed).
- `ui` collects work that is approved but not yet released.
- When the owner approves a release: copy the current `main` to `backup/main-YYYY-MM-DD`, then merge into `main`.

## Leads and security

- All forms submit through `useLeadSubmit` → `api/lead.js` → Supabase table `public.leads`. Never store leads in the browser.
- The repo is public: never commit keys, `.env` files or customer data. See `docs/SECURITY.md`.
- The owner portal and admin live in the private repo `U-K-Builders/UKBuilders_Portal`, not here.
- Project visibility flags in `src/data/projects.js`: `hidden` (not shown anywhere) and `timelineOnly` (Timeline page only). Completed projects without a photo appear only on the Timeline.
- Photos live only in `photos/` (full resolution). `scripts/build-images.mjs` generates web copies in `public/images/` before dev/build; that folder is git-ignored. Reference images as `/images/<path under photos>`.
