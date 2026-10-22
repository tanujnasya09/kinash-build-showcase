# Gumroad Listing — Copy & Assets

Use this file as the exact copy for your Gumroad product page.

---

## Product Title
**Apex Luxury — Premium Real Estate & Construction Web Template**

## Tagline
An agency-grade, ultra-luxury React template for property developers, architects, and real-estate firms — tri-lingual, multi-currency, with a client CMS and SEO wired end to end.

## Short Description (Card / Social Preview)
Launch a world-class luxury property site in minutes. React 18 + TypeScript + Vite + Tailwind, Leaflet price-tag map, Matterport 3D tour embeds, a client-side CMS admin, four display currencies, and three languages (EN/ES/DE).

---

## Pricing Tiers
- **Standard License ($99)**: single production site for a property developer, agency client, or real estate firm. Includes full TypeScript source code, zero-backend CMS admin, multi-currency engine, documentation, commercial license clearance, and lifetime updates.
- **Agency / Commercial License ($249)**: unlimited client websites. For design studios, digital agencies, and independent freelancers building high-ticket client portals and charging clients $5,000–$25,000+.

---

## Long Description

### Everything a modern luxury property firm needs, out of the box.

**Apex Luxury** is an architectural-grade showcase template crafted for prime residences, luxury land plots, private estates, and commercial developments. Built with React 18, TypeScript, Tailwind CSS, and shadcn/ui — inspired by the Open Design *Luxury & Atelier Zero* aesthetic (obsidian canvas, champagne gold accents, physical Doppelrand card depth, razor-sharp 0rem geometry). The bespoke agency design high-ticket clients expect, without the $20,000 agency invoice.

### Why it commands a premium:

- 💎 **Open Design Luxury & Atelier Zero Architecture**: Pitch-black canvas (`#0c0d10`), warm champagne-gold accents (`#dfba48`), ivory editorial typography (Archivo & Manrope), and physical hardware-plate card depth with dual-bezel highlights.
- 🧮 **Interactive Wealth & Mortgage EMI Workbench**: Built-in private banking financing simulator with real-time sliders for down payment, APR interest rate, amortization tenure, live EMI calculation in the active currency, and a 5-year capital appreciation projector.
- 🖨️ **One-Click Printable Architectural Client Dossier**: High-net-worth real estate transactions happen over tangible documents. Built-in `@media print` rules automatically transform the web view into a clean, black-and-white architectural A4/Letter dossier ready for client meetings or PDF export via `window.print()`.
- 📱 **Mobile Thumb-Zone Conversion Bar**: High-converting sticky bottom action bar on mobile and tablet screens with live currency valuation, quick-dial specialist trigger, and instant consultation booking.
- 🗂️ **Four clean editing layers**: brand & contact details in `src/config/site.ts`, page copy in `src/content/*.ts`, UI labels in `src/i18n/`, listings in the CMS. Rebrand without touching a single component.
- 🌐 **Tri-lingual, in three complete languages**: instant EN / ES / DE switching, per-property translations, localized `<html lang>`, hreflang alternates, and localized SEO titles & descriptions.
- 💱 **Four display currencies**: INR, USD, EUR, GBP with locale-correct formatting — `₹200Cr`, `$2B`, `2 Mrd. €`, `£2B` — from a header picker, no API key, no backend.
- 🗺️ **Interactive Leaflet price-tag map**: custom gold price-pill markers that pan with the viewport and stay in sync with the filter grid and budget sliders.
- 🛠️ **Client-side admin CMS**: full property CRUD at `/admin` with browser persistence, image galleries, coordinates, and a Sanity-shaped document model ready for a real backend.
- 🕶️ **Matterport & YouTube tour embeds**: built-in modal viewers for 3D property scans and video walkthroughs.
- 🔍 **SEO shipped, not promised**: per-page meta, Open Graph + Twitter cards, JSON-LD Organization/WebSite schema, canonical URLs, an auto-generated `sitemap.xml`, and `robots.txt`.
- ⚡ **Fast by construction**: route-level code splitting — every page is its own chunk, and the 154 kB map bundle only loads when the directory opens.
- ♿ **Accessible by default**: skip link, visible focus rings, `prefers-reduced-motion` gates, labelled controls, semantic landmarks.
- 🛡️ **100% Commercial-Safe Licensing**: Zero bundled copyright photography, zero stock-photo trap dependencies. Ships with clean licenses (BSD-2, ISC, MIT, SIL OFL).
- 🚀 **Zero-friction deployment**: no backend, no database. Static output in `dist/` — deploy to Netlify, Vercel, Cloudflare Pages, or GitHub Pages in one click.

### Pages & routes included:

1. **Home**: hero with text reveal, bento statistics, featured collection, divisions, and a closing CTA banner.
2. **Properties directory (`/properties`)**: split-view filter grid + sticky Leaflet map with budget sliders, division filters, and currency-formatted prices.
3. **Property detail (`/property/:slug`)**: high-resolution gallery, Matterport 3D portal, technical specification table, YouTube walkthrough embed, and a downloadable prospectus.
4. **Services (`/services`)**: residential, commercial, and advisory offerings with a delivery process timeline.
5. **Construction (`/construction`)**: structural development and engineering capabilities with a live project counter.
6. **Real-estate advisory (`/real-estate`)**: acquisition, portfolio consulting, and market statistics.
7. **About (`/about`)**: company legacy, operating values, and leadership team.
8. **Contact (`/contact`)**: lead-capture form with a simulated CRM intake pipeline and a registry reference.
9. **CMS admin (`/admin`)**: interactive property creator and manager.
10. **404**: branded fallback route.

### What you get:

- Full source code with TypeScript types on every content object
- A documented four-layer content model (brand / page copy / UI strings / listings)
- `DESIGN.md` — the design system, typography, and motion rules the template follows
- `DOCUMENTATION.md` — rebrand walkthrough, deployment guides for four hosts, and an SEO launch checklist
- `sitemap.xml` generator that rebuilds itself from your listings on every build

---

## Frequently Asked Questions (FAQ)

**Q: What tech stack is used?**
A: React 18, TypeScript, Vite 5, Tailwind CSS 3, shadcn/ui (Radix), GSAP + ScrollTrigger, Lenis, Leaflet, React Helmet Async, and Lucide icons.

**Q: Do I need a database or backend server?**
A: No. The template is fully client-side and the admin CMS persists to browser LocalStorage. You can connect Sanity, Supabase, or your own API later — the components already read the same document fields.

**Q: Does the currency switcher convert prices?**
A: It changes formatting, not value. `4500000` renders as `₹45,00,000`, `$4,500,000`, `4.500.000 €`, or `£4,500,000`. One-line hook in `src/lib/currency.ts` if you want live rates.

**Q: How much of the content do I have to rewrite?**
A: As much as you want. Brand, contact, social, and domain live in one config file; page copy lives in one file per page; UI labels live in one file per language.

**Q: Can I change colors and fonts?**
A: Yes — `tailwind.config.ts` and `src/index.css`. The palette is charcoal `#0c0d10`, champagne gold `#dfba48`, and ivory `#fdfbf7`; type is Archivo, Manrope, and JetBrains Mono.

**Q: Is the photography and video included for commercial use?**
A: Zero third-party copyright liabilities. Demo photos are hot-linked from Unsplash under their worldwide commercial licence (free collection). The 3D tour links to Matterport's official public demo space, and the walkthrough video player supports YouTube, Vimeo, and direct MP4/WebM files with commercial-safe 4K architectural showcase tours. You can swap in your own imagery and video links anytime in `src/context/PropertyContext.tsx` or via the `/admin` CMS. Every external asset and its license is documented in `ASSETS-LICENSES.md`.

**Q: Are the fonts and libraries included legally?**
A: Yes. GSAP is covered by Webflow's standard "No Charge" license — free for commercial use, all plugins included. Leaflet is BSD-2, Lucide is ISC, Radix / Lenis / Sonner / React Query / React Router / Tailwind are MIT, and the three typography faces are SIL OFL. Nothing in the dependency tree requires extra subscriptions or restricts commercial resale.

**Q: Do I get support?**
A: Documentation and lifetime updates are included. Questions in the comments on your Gumroad purchase are answered.

**Q: Which license do I need?**
A: One site — Standard. Client work for multiple clients, or reselling the template — Agency.
