# @wholnex/client

React SPA for the WHOLNEX LLC website (`https://wholnex.org`) — VPS hosting marketing pages, the VPS
quote configurator, contact form, customer accounts, and the admin console.

## Prerequisites

- Node.js 20+
- Running API (see [`server`](../server)) for forms, accounts, and admin

## Setup

```bash
cp .env.example .env
npm install   # also builds vendored ./shared via prepare
npm run dev
```

Dev server: `http://localhost:5173` (Vite proxies `/api` to `:5000`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Build shared + typecheck + production bundle |
| `npm run preview` | Preview production build |
| `npm run test` | Vitest |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript project references check |

## Where business content lives

| File | Contents |
| --- | --- |
| `src/lib/constants.ts` | Company facts (name, CEO, address, domain), navigation, footer |
| `src/lib/vps-plans.ts` | VPS plan tiers, confirmed specs/pricing (currently `null`), dev-only draft data |
| `src/lib/capabilities.ts` | Infrastructure/security capabilities (`confirmed` flags) and hosting regions |
| `src/lib/operating-systems.ts` | OS options shown in the OS explorer and configurator |
| `src/lib/content.ts` | Use cases, getting-started steps, FAQ |
| `src/lib/legal.ts` | Legal document status (`draft` / `approved`) |
| `src/lib/images.ts` | Licensed photography registry with credits |

Publishing confirmed plan data, capabilities, regions, or approved policies is a config change
in these files — the UI updates automatically.

## Shared dependency

`@wholnex/shared` is vendored at [`./shared`](./shared) so Cloudflare Pages and other
client-only deploys resolve schemas without a sibling package:

```json
"@wholnex/shared": "file:./shared"
```

Keep this copy identical to `server/shared/src/index.ts` when schemas change.

## Cloudflare Pages

- **Root directory:** `/` (repository root = this package)
- **Build command:** `npm run build`
- **Output directory:** `dist`
- Set `VITE_API_URL` and `VITE_SITE_URL` as build environment variables
- Add an SPA fallback so deep links resolve (Pages does this automatically when no `404.html` exists)

## Docker

```bash
docker build -t wholnex-client .
```

## Environment

See [`.env.example`](.env.example):

- `VITE_API_URL` — e.g. `https://wholnex.org/api/v1`
- `VITE_SITE_URL` — e.g. `https://wholnex.org`
- `VITE_PUBLIC_CONTACT_EMAIL` — optional override; defaults to `support@wholnex.org`
- `VITE_SHOW_DRAFT_PLAN_DATA` — development only; previews draft plan data (ignored in production)

## Logo

`src/components/logo.tsx` contains an original "connected W" SVG mark created for this site
(also used for `public/favicon.svg`, PWA icons, and `public/og-image.png`). Replace it if WHOLNEX
supplies official artwork — see [`src/assets/README.md`](src/assets/README.md).

## License

Proprietary — © WHOLNEX LLC. All rights reserved.
