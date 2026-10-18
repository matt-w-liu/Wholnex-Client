# Brand assets

## Logo

No official WHOLNEX logo was supplied. The site uses an original concept mark — a "connected W":
a single stroke through three network nodes on a navy tile, suggesting servers joined by a
network.

- **Component:** `src/components/logo.tsx` (`Logo`, `LogoMark`)
- **Static copies:** `public/favicon.svg`, `public/favicon-48.png`, `public/apple-touch-icon.png`,
  `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png`, `public/og-image.png`
- **Used in:** site header, footer, mobile menu, admin layout, login and register pages

If WHOLNEX supplies official artwork, update `LogoMark`, then regenerate the static PNGs and
the Open Graph image from the new SVG.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| Navy 900 | `#080F1F` | Dark background, hero, CTA bands |
| Navy 800 | `#101B30` | Dark surfaces |
| Primary blue | `#2563EB` | Filled buttons (white text, 5.2:1) |
| Brand text (dark) | `#60A5FA` | Accent text on dark backgrounds |
| Cyan | `#06B6D4` | Secondary accent |
| Light background | `#F8FAFC` | Light theme background |
| Muted text | `#94A3B8` | Secondary text on dark |

Tokens are CSS variables in `src/index.css` and Tailwind colors in `tailwind.config.js`
(`navy-*`, `brand`, `cyan`). The transactional email templates
(`server/src/services/email.templates.ts`) mirror the same palette — change both together.

## Typography

Space Grotesk (display), Inter (body), and JetBrains Mono (technical labels and code), loaded
from Google Fonts in `index.html`.
