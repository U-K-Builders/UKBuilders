# Security notes

This repository is **public**. Never commit keys, tokens, passwords, `.env`
files or customer data. Secrets live only in Vercel and Supabase settings.

## How leads are handled

```
Browser form ──POST /api/lead──▶ Vercel function ──secret key──▶ Supabase table public.leads
                                      │
                                      └──(optional) email alert via Resend
```

| Layer | Protection |
|---|---|
| Browser | No keys at all. The form only knows the URL `/api/lead`. |
| `/api/lead` | Accepts POST only, JSON up to 16 KB, from this site's own origin (plus `ALLOWED_ORIGINS`). Validates category, lengths, email and phone. Strips control characters. |
| Spam | Hidden "honeypot" field and a minimum fill time (bots get a fake "ok" and nothing is stored). 5 submissions per visitor per 10 minutes; 300 per hour site-wide. |
| Privacy | Visitor IPs are stored only as a salted SHA-256 hash, for rate limiting. |
| Database | Row Level Security is on and there are **no policies**, and all privileges are revoked from the `anon` and `authenticated` roles. The public Supabase API cannot read or write leads. Only the server's secret key can. New tables also start with no public access. |
| Secrets | `SUPABASE_SECRET_KEY` (and `RESEND_API_KEY`) are Vercel environment variables marked **Sensitive**. Never give them a `VITE_` prefix: that would ship them to every visitor. |

## Reading leads

For now, read leads in the Supabase dashboard: **Table Editor → leads**. Only
people invited to the Supabase organisation can see them. Turn on two-factor
authentication for every account that has access (Supabase, Vercel, GitHub).

A proper staff view belongs in the separate Customer & Owner Portal, behind
real login (Supabase Auth) with policies that allow staff only.

## What was removed from the public site, and why

The old `/owner-portal` admin login and `/admin-dashboard` checked a password
hash inside the JavaScript bundle and "encrypted" data with a key that was
also in the bundle. Anyone could read both. They are removed from the public
site and preserved on the `archive/owner-portal-admin` branch, to be moved to
the private portal repository.

Because that code was in a public repo, treat the old admin password and the
old encryption key as **public**: never reuse them anywhere.

Hidden projects (`hidden: true`) are not shown in lists, maps, the timeline or
detail pages, but their data still ships in the JavaScript bundle and sits in
this public repo. Don't put anything confidential in the data files.

## Checklist

- [ ] `SUPABASE_SECRET_KEY` set in Vercel as Sensitive (Production + Preview)
- [ ] Two-factor authentication on GitHub, Vercel and Supabase for everyone
- [ ] Old leaked tokens revoked (GitHub token for `rishonavi`, Railway token)
- [ ] Railway project deleted
- [ ] Add the company domain to `ALLOWED_ORIGINS` and the Open Graph tags when connected
- [ ] Run Supabase **Advisors → Security** after every database change

## Reporting a problem

Email u.k.builders1981@gmail.com. Please don't open a public issue for
security problems.
