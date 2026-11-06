# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

U.K. Builders — a luxury real estate marketing website for a Mumbai-based builder with 55+ years of history. Converted from a single-file HTML site into a React SPA.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (outputs to `dist/`)
- `npm run preview` — Preview production build locally
- `npm run lint` — ESLint check

## Architecture

**Routing** (React Router v7, defined in `src/App.jsx`):
- `/` → HomePage
- `/projects/ongoing` → OngoingProjectsPage
- `/projects/completed` → CompletedProjectsPage
- `/history` → HistoryPage
- `/contact` → ContactPage

All routes share `Header` and `Footer` wrappers. `ScrollToTop` resets scroll position on navigation.

**Data-driven rendering**: Project and testimonial content lives in `src/data/projects.js` and `src/data/testimonials.js` as plain JS arrays. Components iterate over these — add new projects/testimonials by editing the data files, not the page components.

**Carousel** (`src/components/Carousel.jsx`): Infinite-loop auto-rotating slider using cloned items and percentage-based transforms. Accepts `interval` (ms) and `visibleCount` props. Responsive — shows 1 item on mobile, `visibleCount` on desktop (breakpoint: 992px).

## Tailwind Setup

Tailwind v4 with `@tailwindcss/vite` plugin — no `tailwind.config.js` file. Custom theme tokens defined via `@theme` in `src/index.css`:
- Colors: `navy` (#0B1D3A), `navy-dark` (#061124), `gold` (#C5A059), `gold-dark` (#D4AF37)
- Font: `font-serif` maps to Georgia

Custom utility classes in `index.css`: `.gradient-text` (navy-to-gold text gradient), `.animate-fade-in`.

## Images

Static images served from `public/images/`. Referenced in data files as `/images/filename.jpg`. Image filenames have spaces (e.g., `Justin Night View.jpg`).

## Key Patterns

- Ongoing projects use `ProjectCard` (large, 2-col grid with detail labels)
- Completed projects use `SignatureCard` (compact, 3-col grid)
- Mobile nav is a hamburger menu with collapsible Projects sub-menu (state in `Header.jsx`)
- All page components apply `.animate-fade-in` on their root div

## Branch workflow (agreed November 2026)

- `main` is the live site; every push deploys to production. Don't commit unfinished work to it.
- Do new UI and feature work on `ui` (or a branch from it) and test on the Vercel preview.
- Before merging into `main`, copy the current `main` to `backup/main-YYYY-MM-DD`.

## Leads and security

- All forms submit through `useLeadSubmit` → `api/lead.js` → Supabase table `public.leads`. Never store leads in the browser.
- The repo is public: never commit keys, `.env` files or customer data. See `docs/SECURITY.md`.
- The owner portal and admin live in the private repo `U-K-Builders/UKBuilders_Portal`, not here.
- Project visibility flags in `src/data/projects.js`: `hidden` (not shown anywhere) and `timelineOnly` (Timeline page only). Completed projects without a photo appear only on the Timeline.
- Full-resolution photos are in `photos/`; web-sized copies in `public/images/`.
