# MarketIQ — AI-Powered Market Research Platform (Demo)

A multi-page Next.js 15 demo for a fictional enterprise market research company.
Blue/white enterprise theme, fully responsive, mock data only — no backend, no auth, no database.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Framer Motion
- Recharts

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To run a production build locally:

```bash
npm run build
npm run start
```

## Routes

| Route | Description |
|---|---|
| `/` | Marketing homepage — Hero, Stats, About, Services, Solutions, AI Survey Builder demo, multi-step research request form, Footer |
| `/signup` | Respondent panel sign-up (banner + multi-field registration form) |
| `/client-portal` | Client portal — Active Projects (default), Reports, Survey Responses, Files, Messages, Invoices |
| `/admin` | Internal admin console — redirects to `/admin/leads` |
| `/admin/leads` | Lead management — search, filter, detail drawer with notes |
| `/admin/projects` | Project management — search, filter, status/health tracking |
| `/admin/requests` | Research request triage — search, filter, detail drawer with notes |

## Notes

- All data is static/mock, defined in `lib/*.ts` files. There is no database, no API routes, and no authentication — `/admin` and `/client-portal` are open routes for demo purposes.
- Forms (lead form, signup form, admin notes) only update local component state; nothing persists across a page reload.
