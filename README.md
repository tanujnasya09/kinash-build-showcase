# Apex Luxury — Luxury Real Estate & Construction Template

A production-ready, agency-grade website template for property developers, architects, and boutique real-estate firms. Built with React 18, TypeScript, Vite, Tailwind CSS, and shadcn/ui — with a tri-lingual content layer, a multi-currency display layer, a Leaflet price-tag map, a client-side CMS, and SEO wired end to end.

**Every word on the site and every brand detail is editable without touching a component.** The demo brand (Apex Luxury, Dehradun) is just one configuration away from being yours.

---

## Highlights

| | |
|---|---|
| **Tri-lingual (EN / ES / DE)** | Instant language switching, per-listing translations, localized `<html lang>`, hreflang alternates, and localized SEO meta. |
| **Multi-currency display** | INR, USD, EUR, GBP with locale-correct formatting (`₹200Cr`, `$2B`, `2 Mrd. €`, `£2B`). No backend, no FX API. |
| **Content layer** | All page copy lives in `src/content/*.ts` — hero, sections, CTAs, and per-page meta titles/descriptions. |
| **Client-side CMS** | `/admin` gives you full property CRUD with LocalStorage persistence and a Sanity-shaped document model. |
| **Interactive price-tag map** | Custom gold Leaflet markers that pan with the viewport and stay in sync with the filter grid. |
| **3D tour embeds** | Matterport and YouTube walkthrough modals on every property page. |
| **SEO ready** | Per-page meta, Open Graph + Twitter cards, JSON-LD Organization/WebSite schema, generated `sitemap.xml`, `robots.txt`, canonical URLs. |
| **Route-level code splitting** | Every page is a separate chunk; the map bundle only loads when `/properties` is opened. |
| **Accessible by default** | Skip link, visible focus rings, `prefers-reduced-motion` gates, labelled controls, semantic landmarks. |
| **Zero backend** | Static output in `dist/`. Deploy to Netlify, Vercel, Cloudflare Pages, or GitHub Pages. |

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # dev server → http://localhost:8080
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

Node 18+ is required. The dev server port is set in `vite.config.ts` (`server.port`).

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, bento stats, featured collection, divisions, CTA |
| `/properties` | Directory — split-view filter grid + sticky Leaflet map |
| `/property/:slug` | Property detail — gallery, 3D tour, specs, brochure |
| `/services` | Services & infrastructure |
| `/construction` | Construction & engineering |
| `/real-estate` | Real-estate advisory |
| `/about` | Legacy, leadership, values |
| `/contact` | Lead capture with a simulated CRM intake |
| `/admin` | Client-side property CMS |
| `*` | Branded 404 |

---

## Project structure

```
apex-luxury/
├─ public/                    # favicon, logo, OG image, property photos, sitemap.xml, robots.txt, _redirects
├─ scripts/
│  └─ generate-sitemap.mjs    # regenerates public/sitemap.xml from site config + listings
├─ src/
│  ├─ components/             # Layout, Map, SEO, Loader + ui/ primitives
│  ├─ config/site.ts          # brand, contact, social, domain, default currency
│  ├─ content/                # page copy per language (home, about, services, realEstate, construction, properties, contact, notFound)
│  ├─ context/                # LanguageContext (language + currency + content), PropertyContext (listings + CMS state)
│  ├─ i18n/                   # chrome strings per language (en.ts, es.ts, de.ts) + interpolate()
│  ├─ lib/currency.ts         # currency table + formatters
│  ├─ lib/stat.ts             # money-aware stat renderer
│  ├─ pages/                  # one file per route
│  ├─ App.tsx                 # providers, router, route-level lazy loading
│  └─ index.css               # Tailwind layers, design tokens, keyframes
├─ DESIGN.md                  # design system, typography, motion rules
├─ DOCUMENTATION.md           # full customization + rebrand guide
└─ GUMROAD-LISTING.md         # marketplace copy for the product page
```

---

## Customization in 60 seconds

1. **Brand, contact, domain, default currency** → `src/config/site.ts`
2. **Page copy and SEO meta** → `src/content/*.ts` (EN / ES / DE)
3. **Navigation, buttons, form labels, filters** → `src/i18n/{en,es,de}.ts`
4. **Listings and coordinates** → `src/context/PropertyContext.tsx` or the `/admin` dashboard
5. **Colors, type scale, spacing** → `tailwind.config.ts` and `src/index.css`

The full walkthrough — including how to add a language, wire a real CMS, and deploy — is in [DOCUMENTATION.md](./DOCUMENTATION.md).

---

## Design system

- **Palette**: charcoal `#0c0d10`, champagne gold `#dfba48`, ivory `#fdfbf7`
- **Type**: Archivo (display), Manrope (body), JetBrains Mono (technical metadata)
- **Geometry**: flat, square corners, hairline gold rules, 1px borders

Full rationale and override rules live in [DESIGN.md](./DESIGN.md).

---

## Quality gates

```bash
npx tsc --noEmit -p tsconfig.app.json   # type check
npm run lint                            # eslint (0 errors)
npm run build                           # production bundle
```

---

## License

Source code is sold under two tiers, as described in `GUMROAD-LISTING.md` and written out in
`LICENSE.md`:

- **Standard License** — one personal or client production site.
- **Agency License** — unlimited client sites.

Third-party components keep their own licences: GSAP under Webflow's standard "No Charge" licence
(free for commercial use, all plugins included), Leaflet (BSD-2), Lucide (ISC), Radix (MIT),
Lenis, Sonner, React Query, React Router (MIT), Tailwind (MIT), and Archivo / Manrope /
JetBrains Mono under the SIL Open Font License. Nothing in the dependency tree requires a separate
fee or blocks reselling the end product you build. The full list is in `ASSETS-LICENSES.md`.

## Images, video, and embeds

No third-party photography is bundled in the package. Demo photos are hot-linked from Unsplash
(free for commercial use, no attribution required), the 3D tour points at Matterport's official
public demo space, and the walkthrough video panel ships empty so no third party's video is
embedded in your site. Replace the brand assets (`logo.png`, `favicon.png`, `apex-opengraph.png`)
and the demo photos with your own before launch — see the pre-launch checklist in
`ASSETS-LICENSES.md`.
