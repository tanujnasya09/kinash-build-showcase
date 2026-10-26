# Apex Luxury — Ultra-Luxury Real Estate & Construction Web Template

A production-ready, agency-grade website template engineered for property developers, architects, and boutique real-estate firms. Built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui, and a **pre-configured Headless Sanity CMS Studio (`/studio`)** — with a tri-lingual content layer, a multi-currency display layer, an interactive Leaflet price-tag map, and SEO wired end to end.

**Every word on the site, every listing, and every brand detail is editable without touching a single component.**

---

## Highlights

| Feature | Details |
|---|---|
| **Headless Sanity CMS (`/studio`)** | Full production Sanity Studio embedded inside the codebase. Cloud database, media pipeline, multi-device team editing, and zero write tokens exposed to the browser. |
| **Hybrid Zero-Setup Fallback** | Runs immediately out of the box using local browser storage (`src/data/properties.ts`). Add a Sanity Project ID in `.env` whenever you're ready to go live. |
| **Dual Theme Engine** | Bespoke **Obsidian Dark** & **Architectural Alabaster Light** palettes with hardware card depth and 1-click header switcher. |
| **Tri-lingual (EN / ES / DE)** | Instant language switching, per-listing translations, localized `<html lang>`, hreflang alternates, and localized SEO meta. |
| **Multi-currency display** | INR (₹), USD ($), EUR (€), GBP (£) with locale-correct formatting (`₹200Cr`, `$2B`, `2 Mrd. €`, `£2B`). |
| **Wealth & Mortgage Workbench** | Live interactive EMI financing calculator with sliders for down payment, interest rate, tenure, and 5-year capital appreciation projection. |
| **Printable Client Dossier** | One-click print-ready black & white A4/Letter dossier for in-person high-net-worth client meetings via `window.print()`. |
| **Interactive Leaflet price-tag map** | Custom gold Leaflet markers that pan with the viewport and stay in sync with the filter grid. |
| **3D tour & video embeds** | Built-in modal viewers for Matterport 3D digital-twin scans and YouTube / Vimeo walkthroughs. |
| **Dynamic SEO & Sitemap** | Native Next.js metadata, Open Graph + Twitter cards, JSON-LD Schema, auto-generated `sitemap.xml` and `robots.txt` that update from live CMS slugs. |
| **Zero backend server required** | Pre-rendered static HTML (SSG) & SSR. Zero-config deploy to Vercel, Netlify, Cloudflare Pages, or AWS Amplify in 2 minutes. |

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev      # website → http://localhost:3000

# 3. Production build
npm run build    # builds optimized production site
npm run start    # preview the production build locally
```

### Launching Sanity Studio (Optional)

```bash
cd studio
npm install
npm run seed     # imports demo listings into your Sanity dataset
npm run dev      # studio dashboard → http://localhost:3333
npm run deploy   # free hosted studio → https://<your-name>.sanity.studio
```
See [SANITY-SETUP.md](./SANITY-SETUP.md) for the 10-minute guide.

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero text reveal, bento statistics, featured portfolio, divisions, CTA |
| `/properties` | Directory — split-view filter grid + sticky Leaflet map |
| `/property/:slug` | Property detail — gallery, 3D tour, specs table, video, printable dossier |
| `/services` | Services & infrastructure |
| `/construction` | Construction & structural engineering (with live counter) |
| `/real-estate` | Real-estate advisory & market metrics |
| `/about` | Legacy, leadership, operating values |
| `/contact` | Lead capture with simulated CRM intake pipeline |
| `/admin` | CMS synchronization & property management dashboard |
| `*` | Branded 404 |

---

## Project structure

```
apex-luxury/
├─ public/                    # favicon, logo, OG images, static assets
├─ scripts/
│  ├─ generate-sitemap.mjs    # builds sitemap.xml from site config + live Sanity slugs
│  └─ package.mjs             # creates release zip excluding private envs
├─ src/
│  ├─ app/                    # Next.js App Router (layout, routes, sitemap.ts, robots.ts)
│  ├─ views/                  # route views (Home, Properties, Detail, Contact, etc.)
│  ├─ components/             # Layout, Map, SEO, Admin panel, UI primitives
│  ├─ config/site.ts          # brand, contact, social, domain, default currency
│  ├─ content/                # page copy per language (EN / ES / DE)
│  ├─ context/                # LanguageContext, PropertyContext (hybrid Sanity provider)
│  ├─ data/properties.ts      # fallback demo properties
│  ├─ i18n/                   # UI translation strings (en.ts, es.ts, de.ts)
│  ├─ lib/sanity.ts           # Sanity client & GROQ listing queries
│  ├─ lib/currency.ts         # multi-currency table + formatters
│  └─ types/property.ts       # unified TypeScript property model
├─ studio/                    # Embedded Headless Sanity CMS Studio
│  ├─ schemaTypes/            # luxury real estate document schema
│  ├─ scripts/seed.ts         # 1-command demo data seeder
│  └─ sanity.config.ts        # Sanity Studio configuration
├─ SANITY-SETUP.md            # step-by-step Sanity setup guide
├─ DOCUMENTATION.md           # full customization, rebrand, & deployment guide
├─ DESIGN.md                  # design system tokens, typography, motion rules
└─ GUMROAD-LISTING.md         # marketplace copy & sales kit
```

---

## Customization in 60 seconds

1. **Brand, contact, domain, default currency** → `src/config/site.ts`
2. **Page copy and SEO meta** → `src/content/*.ts` (EN / ES / DE)
3. **Navigation, buttons, form labels, filters** → `src/i18n/{en,es,de}.ts`
4. **Listings** → Connect Sanity Studio (`studio/`) or edit `src/data/properties.ts`
5. **Colors, type scale, spacing** → `tailwind.config.ts` and `src/index.css`

The complete walkthrough — including hosting, domain configuration, and SEO — is in [DOCUMENTATION.md](./DOCUMENTATION.md).

---

## Design system

- **Palette**: charcoal `#0c0d10`, champagne gold `#dfba48`, ivory `#fdfbf7`
- **Type**: Archivo (display), Manrope (body), JetBrains Mono (technical metadata)
- **Geometry**: flat, square corners, hairline gold rules, 1px borders

Full rationale and override rules live in [DESIGN.md](./DESIGN.md).

---

## Quality gates

```bash
npx tsc --noEmit     # type check
npm run build        # production build & SSG validation (19/19 routes)
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
