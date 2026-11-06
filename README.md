# U.K. Builders website

The marketing website for **U.K. Builders**, a residential developer in Orlem, Malad West, Mumbai, building since 1969.

It is a single-page React app, frontend only, hosted on Vercel.

> **Before you start:** the enquiry forms do not send leads anywhere yet. See [Known limitations](#known-limitations).

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

---

## Project structure

```
public/
  images/Building/   Project photos (filenames contain spaces)
  images/company/    Logos and company images
src/
  App.jsx            All routes
  index.css          Tailwind theme tokens and custom utilities
  components/        Header, Footer, cards, modals, maps, carousel
  pages/             One file per route
  data/              Site content (see below)
  context/           AuthContext (admin login)
  hooks/             Theme, accessibility and in-view hooks
  utils/             submissions.js (form storage)
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
| `/owner-portal`, `/admin-dashboard` | Owner registration and admin view (see limitations) |

Any other path shows the 404 page.

---

## Deployment

The site deploys to **Vercel**. A push to `main` deploys to production. Other branches get preview deployments.

`vercel.json` rewrites every path to `index.html`, so client-side routes work on refresh, and sets the security headers. `public/_headers` and `public/_redirects` are leftovers from Netlify and are not used.

---

## Branches

| Branch | Purpose |
|---|---|
| `main` | The live site |
| `ui-redesign` | Work in progress: a new design, plus fixes for broken and oversized images that are not on `main` yet |

---

## Known limitations

1. **Enquiries are not delivered.** All forms call `saveSubmission()` in `src/utils/submissions.js`, which only saves to the visitor's own browser (`localStorage`). Nothing reaches the business. The plan is a single server endpoint (for example a Vercel function at `/api/lead`) that validates the form, blocks spam, stores the lead and sends an email alert.
2. **The admin login is not secure.** `AuthContext.jsx` checks a password hash that ships in the JavaScript bundle, and the encryption key in `submissions.js` is public too. The admin dashboard can only see submissions made in the same browser. Remove both once the lead endpoint exists. Never use this pattern for real customer data: the planned customer and owner portal will be a separate project with real authentication.
3. **Some images are broken or very large on `main`.** Four photos (including the homepage hero) are HEIC files with a `.jpg` name and don't show in Chrome or on Android. Images total about 29 MB. Both are fixed on `ui-redesign`.
4. **MahaRERA QR codes are missing** next to the RERA numbers on project pages. MahaRERA requires them on all advertising.
5. **No SEO metadata.** All pages share one `<title>`, and there is no meta description, Open Graph tags (so WhatsApp link previews are blank), `robots.txt` or `sitemap.xml`.
6. **Lint:** `npm run lint` reports a handful of known errors (empty `catch {}` blocks and similar). They don't break the build.

---

## Contact

U.K. Builders, F-34, Sej Plaza, Marve Road, Malad West, Mumbai 400 064
Phone +91 98203 11177 · u.k.builders1981@gmail.com
