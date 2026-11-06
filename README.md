# U.K. Builders website

The marketing website for **U.K. Builders**, a residential developer in Orlem, Malad West, Mumbai, building since 1969.

It is a single-page React app hosted on Vercel. Its only backend is one serverless function, `api/lead.js`, which stores enquiries in Supabase. See [docs/SECURITY.md](docs/SECURITY.md).

---

## Quick start

You need Node.js 20.19 or newer (required by Vite 8).

```bash
npm install
```

```bash
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Tech stack

- **React 19** and **Vite 8**
- **Tailwind CSS v4**, through the `@tailwindcss/vite` plugin. There is no `tailwind.config.js`: theme tokens (colours, fonts) live in the `@theme` block in `src/index.css`.
- **React Router 7** for routing
- **MapLibre** and **Leaflet** for maps
- **Supabase** (Postgres) for storing leads, written only by `api/lead.js`

---

## Project structure

```
api/
  lead.js            POST /api/lead: validates, filters spam, stores the lead
docs/
  SECURITY.md        How leads and secrets are protected
public/
  images/Building/   Project photos (filenames contain spaces)
  images/company/    Logos and company images
photos/              Full-resolution photos for brochures and social media (not used by the site)
src/
  App.jsx            All routes
  index.css          Tailwind theme tokens and custom utilities
  components/        Header, Footer, cards, modals, maps, carousel
  pages/             One file per route
  data/              Site content (see below)
  hooks/             useLeadSubmit (forms), useDialog (modals), usePageMeta, theme
  data/pageMeta.js   Page titles and descriptions for every route
vercel.json          SPA rewrite and security headers
```

---

## Editing content

Most content lives in plain data files, not in the page components. To add or change a project, edit the data:

| File | Contents |
|---|---|
| `src/data/projects.js` | Ongoing, upcoming and completed projects (name, location, year, image) |
| `src/data/projectDetails.js` | Detail pages for `justin`, `christina`, `elvira` and `madonna`: RERA numbers, floor plans, amenities, possession dates, construction progress |
| `src/data/testimonials.js` | Customer testimonials |

**Images:** put them in `public/images/` and reference them from the data files as `/images/Building/Name.jpg`. Use real JPEG or WebP files, resized to around 2000 px on the long side. iPhone photos are often HEIC files: convert them first, because Chrome and Android browsers cannot show HEIC.

**Hidden projects:** set `hidden: true` on a project to show it only to a logged-in admin.

**Confirmed facts:** don't change these without checking with the owner: "since 1969", company founded 1981, 50+ projects, 3,000+ families, the RERA numbers, the possession dates and the contact details.

---

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/projects/ongoing`, `/projects/upcoming`, `/projects/completed` | Project lists |
| `/projects/:slug` | Project detail (for example `/projects/justin`) |
| `/history`, `/our-story`, `/timeline` | Company history |
| `/gallery` | Photo gallery |
| `/resources` | Buyer guides and downloads |
| `/contact`, `/book-a-call` | Contact and video-call booking |
| `/redevelopment` | For housing societies |
| `/investors`, `/contractors`, `/careers` | Partner and job enquiries |

Any other path shows the 404 page.

---

## Deployment

The site deploys to **Vercel**. A push to `main` deploys to production. Other branches get preview deployments.

`vercel.json` rewrites every path to `index.html`, so client-side routes work on refresh, and sets the security headers. Files in `api/` are deployed as serverless functions.

**Environment variables** (Vercel → Project → Settings → Environment Variables):

| Name | Value | Secret? |
|---|---|---|
| `SUPABASE_URL` | `https://<project-ref>.supabase.co` | No |
| `SUPABASE_SECRET_KEY` | Supabase → Project Settings → API Keys → secret key | **Yes, mark Sensitive** |
| `ALLOWED_ORIGINS` | e.g. `https://www.example.com` once the domain is live | No |
| `RESEND_API_KEY`, `LEAD_ALERT_EMAIL`, `LEAD_ALERT_FROM` | Email alerts for new leads (optional) | API key is secret |

Never prefix a secret with `VITE_`: Vite puts `VITE_` variables into the public JavaScript.

Locally, `npm run dev` serves the site but not `api/`, so forms show an error. To test the API locally, use `vercel dev`. `public/_headers` and `public/_redirects` are leftovers from Netlify and are not used.

---

## Branches and workflow

| Branch | Purpose |
|---|---|
| `main` | **The live site.** Every push deploys to production. Keep it working. |
| `ui` | New design and feature work. Every push gets a Vercel preview (Vercel login needed). |
| `backup/main-YYYY-MM-DD` | A copy of `main` taken just before each release, so you can go back. |

**Releasing new work**

1. Build and test on `ui` (or a branch made from it). Check the Vercel preview on a phone and a laptop.
2. Save the current live site: create `backup/main-<today's date>` from `main`.
3. Merge `ui` into `main`. Vercel deploys it.
4. If something breaks, either promote the previous deployment in Vercel (Deployments → ⋯ → Promote) or reset `main` to the backup branch.

Older branches (`ui-redesign`, `claude/...`) are already merged and can be deleted.

---|---|
| `main` | The live site |
| `claude/lucid-euler-o93hnj` | Redesign, accessibility fixes, lead API and page titles, being tested before merging into `main` |
| `ui-redesign` | The original redesign work, now included in the branch above |
| `archive/owner-portal-admin` | The old owner portal and admin pages, kept until they move to the private portal repo |

---

## Known limitations

1. **Lead alerts by email** go to u.k.builders1981@gmail.com once `RESEND_API_KEY` is set in Vercel. Until then, check leads in Supabase.
2. **MahaRERA QR codes are missing** next to the RERA numbers on project pages. MahaRERA requires them on all advertising.
3. **Link previews use the `vercel.app` address** in `index.html`. Update them, and add a sitemap, once the company domain is connected.
4. **Lint:** `npm run lint` reports a handful of older errors (empty `catch {}` blocks and similar). They don't break the build.

Work in progress is tracked in GitHub Issues.

---

## Contact

U.K. Builders, F-34, Sej Plaza, Marve Road, Malad West, Mumbai 400 064
Phone +91 98203 11177 · u.k.builders1981@gmail.com
