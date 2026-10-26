# Apex Luxury — Customization & Rebrand Guide

Everything you need to turn the demo into your own site. Each layer of the template is isolated so you only touch the files you actually need.

---

## 1. The four editing layers

| Layer | File(s) | What lives there |
|---|---|---|
| **Brand & business data** | `src/config/site.ts` | Name, wordmark, tagline, domain, contact details, social links, default currency, OG image |
| **Page copy** | `src/content/*.ts` | Every headline, paragraph, CTA, stat, and per-page SEO meta — in EN / ES / DE |
| **UI chrome** | `src/i18n/{en,es,de}.ts` | Nav labels, buttons, form labels, filter names, footer, CMS strings |
| **Listings** | `src/context/PropertyContext.tsx` | Properties, prices, coordinates, photos, 3D tour URLs, per-listing translations |

Nothing in `src/components`, `src/views`, or `src/app` needs editing to rebrand the site.

---

## 2. Brand, contact, domain (`src/config/site.ts`)

```ts
export const siteConfig: SiteConfig = {
  name: "Apex Luxury Real Estate & Contracting",   // legal / full name
  shortName: "Apex Luxury",                        // used in UI + SEO
  wordmark: "Apex",                                // header/footer logo text
  brandLine: "Real Estate & Contracting",          // logo sub-line
  tagline: "Architectural Excellence, Exceptional Living",
  description: "Curated portfolio of prime architectural estates…",
  url: "https://apexluxuryestates.com",            // canonical domain (SEO, sitemap)
  ogImage: "/assets/apex-opengraph.png",           // 1200×630 social card
  contact: { phone, phoneFormatted, email, address, city, country, hours },
  social: { facebook, twitter, instagram, linkedin, youtube },
  defaultCurrency: "INR",                          // "INR" | "USD" | "EUR" | "GBP"
};
```

Changing `url` here is enough — the canonical tags, Open Graph URLs, JSON-LD, `robots.txt`, and the generated Next.js `sitemap.xml` all follow it automatically.

> Next.js App Router manages metadata natively in `src/app/layout.tsx` and individual `page.tsx` routes. Crawlers and social bots receive fully-rendered `<title>`, `<meta name="description">`, and Open Graph tags directly in the initial HTML payload (SSG/SSR).

---

## 3. Page copy (`src/content/`)

One file per page, each holding all three languages:

```
src/content/
├─ home.ts         # hero, stats, bento, collection, divisions, CTA
├─ about.ts        # heritage, values, team, stats, CTA
├─ services.ts     # service grid, process steps, CTA
├─ realEstate.ts   # advisory sections, market stats, CTA
├─ construction.ts # capabilities, projects, completed counter, CTA
├─ properties.ts   # directory headline + intro
├─ contact.ts      # office details, form labels, registry block
└─ notFound.ts     # 404 copy
```

Each file exports a `Localized<T>` object (`{ en, es, de }`) plus its TypeScript interface, so adding a field is type-checked everywhere it is rendered.

**SEO meta lives here too.** Every page interface carries a `meta` block:

```ts
meta: {
  title: 'Luxury Real Estate & Construction',
  description: 'Premium architectural layouts, plot demarcations and turnkey construction…',
  keywords: 'luxury real estate dehradun, construction company uttarakhand'
}
```

`SEOHead` appends the brand suffix automatically, sets the canonical URL, Open Graph/Twitter cards, `hreflang` alternates, and the JSON-LD graph.

**Money figures are currency-aware.** Marketing stats use a `StatItem`:

```ts
{ amount: 2000000000, suffix: '+', label: 'Capital Deployed' }  // renders as ₹200Cr / $2B / 2 Mrd. €
{ value: '98%', label: 'On-Time Delivery' }                     // static text
```

`src/lib/stat.ts` picks the right renderer for the active currency, so one number works in every market.

---

## 4. UI chrome (`src/i18n/`)

`en.ts`, `es.ts`, and `de.ts` are flat key/value maps — nav, buttons, form labels, filters, footer, and CMS strings. Keys are typed from `en.ts`, so a missing translation is a compile error.

```ts
t('properties.filter.budget')
t('properties.showing', { count: 12 })   // "Showing 12 matching estates"
```

Templates support `{placeholder}` interpolation via `interpolate()` in `src/i18n/index.ts`.

To add a language: copy `en.ts` to `xx.ts`, translate the values, register it in `src/i18n/index.ts` (`translations`, `languages`), and add the matching block to each `src/content/*.ts`.

---

## 5. Currency display (`src/lib/currency.ts`)

Four currencies ship by default:

| Code | Symbol | Locale | Compact example |
|---|---|---|---|
| INR | ₹ | `en-IN` | ₹200Cr |
| USD | $ | `en-US` | $2B |
| EUR | € | `de-DE` | 2 Mrd. € |
| GBP | £ | `en-GB` | £2B |

- The picker lives in the header (desktop and mobile) and the choice is stored in `localStorage` under `apex_currency`.
- **This is display formatting, not conversion.** A price of `4500000` displays as `₹45,00,000`, `$4,500,000`, `4.500.000 €`, or `£4,500,000` depending on the active currency. If you need conversion, multiply by your own rate before rendering, or hook the `getCurrency()` call to a pricing API.
- Add a currency by appending an entry to `currencies` in `src/lib/currency.ts`.

---

## 6. Listings & the CMS

The template features a **hybrid CMS architecture** that supports both an enterprise headless cloud CMS and zero-setup local storage.

### Option A: Headless Sanity CMS Studio (Recommended for Production)

The template comes with an embedded, pre-configured **Sanity Studio** inside the `studio/` folder.

1. **Setup**: Follow the 10-minute guide in [SANITY-SETUP.md](./SANITY-SETUP.md).
2. **Seeding demo data**: Inside `studio/`, run `npm run seed` to import all demo properties into your Sanity cloud dataset in one command.
3. **Editing & Media**: Run `npm run dev` inside `studio/` (or deploy to `https://<your-project>.sanity.studio`) to manage properties, upload high-res galleries, set Leaflet map coordinates, and enter Spanish/German translations.
4. **Connecting the site**: Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (or `VITE_SANITY_PROJECT_ID`) in your `.env` (and your hosting dashboard). The website will automatically pull listings live via GROQ (`src/lib/sanity.ts`).
5. **Admin panel in Sanity mode**: Visiting `/admin` displays a live synchronization dashboard with connection health status, listing counts, a manual re-sync button, and direct deep-links into Sanity Studio.

### Option B: Local Browser Admin (`/admin`)

If `NEXT_PUBLIC_SANITY_PROJECT_ID` (or `VITE_SANITY_PROJECT_ID`) is left empty in `.env`, the template runs in **Demo Mode**:
- Add, edit, and delete properties through the built-in `/admin` form.
- Data persists to the browser's `localStorage` under `apex_properties` and updates the directory, the Leaflet map, and home page collections immediately.
- Zero API keys or cloud accounts needed — ideal for quick offline client mockups.

### Option C: Hardcoded Demo Data (`src/data/properties.ts`)

Default fallback properties live in `src/data/properties.ts` as `demoProperties`:

```ts
{
  id: 1,
  slug: 'mg-residency',
  title: 'MG Residency',
  location: 'Dehradun',
  price: '₹4,50,00,000',
  status: 'Available',
  coordinates: [30.3165, 78.0322],
  images: ['https://images.unsplash.com/...'],
  videoLink: 'https://youtube.com/watch?v=YOUR_VIDEO_ID',
  virtualTourUrl: 'https://my.matterport.com/show/?m=YOUR_SPACE_ID',
  features: ['24/7 Security', 'Private Clubhouse'],
  specs: { type: 'Luxury Villa', area: '4,500 sq.ft', sizes: ['4 BHK'], possession: 'Immediate', facing: 'East' },
  translations: { es: { title: '…', location: '…', description: '…' }, de: { … } }
}
```

The dynamic Next.js sitemap (`src/app/sitemap.ts`) automatically pulls live Sanity listings, and falls back to `src/data/properties.ts` if Sanity is offline. Visiting `/sitemap.xml` renders valid XML with all live property URLs.

---

## 7. Images, video, and embeds (licence-safe by default)

The template ships **no third-party photography inside the package**. Demo photos are hot-linked
from Unsplash, the 3D tour points at Matterport's official public demo space, and the walkthrough
panel ships empty. Full details of every external asset and its licence are in
`ASSETS-LICENSES.md`.

**Your own property photos**

1. Drop your files in `public/assets/` (or any path you prefer) and reference them as
   `/assets/your-file.jpg`.
2. Use photos you shot, shot under a buyout/work-for-hire agreement, or hold a commercial licence
   that permits redistribution. A photographer keeps copyright in the images they shoot.
3. Do not use Unsplash **+** (paid) images — their terms forbid use in templates for resale. Free
   Unsplash images are fine, and attribution is optional but appreciated.

**3D tour** — one switch for the whole site:

```ts
// src/config/site.ts
demo: {
  virtualTourUrl: 'https://my.matterport.com/show/?m=YOUR_SPACE_ID',
}
```

**Walkthrough video** — per listing, only for a video you own or may embed:

```ts
videoLink: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID', // omit to hide the panel
```

Leave `videoLink` unset and the panel renders a designed "guided tour" state that links to the
contact form — that is what the demo listings ship with, so no third party's video is embedded in
your site.

**Map tiles** — `src/components/Map/InteractiveMap.tsx` renders CARTO tiles over OpenStreetMap
data. The attribution line is a licence condition (OSM data is ODbL); do not remove it.

**Fonts** — loaded from Google Fonts under the SIL OFL. Self-host them if you need to work offline
or avoid third-party requests, and keep the OFL notice.

---

## 7. Design system (`DESIGN.md`, `tailwind.config.ts`, `src/index.css`)

- **Colors** — charcoal `#0c0d10`, champagne gold `#dfba48`, ivory `#fdfbf7`, card `#121318`
- **Type** — Archivo (display), Manrope (body), JetBrains Mono (technical metadata)
- **Shape** — square corners, hairline borders, 1px gold rules

`DESIGN.md` documents the token set and the "craft floor" rules the design follows (no gradient text, no glassmorphism, no pill buttons). Read it before restyling so the result stays cohesive.

---

## 8. SEO checklist before launch

1. Set `siteConfig.url` to your live domain in `src/config/site.ts`.
2. Replace `public/assets/apex-opengraph.png` with your own 1200×630 social card.
3. Edit the `meta` block in each `src/content/*.ts` file with your page titles, descriptions, and keywords.
4. Run `npm run build` to verify all 19 routes compile cleanly into static SSG pages.
5. Your dynamic sitemap is automatically available at `/sitemap.xml` and robots at `/robots.txt`.
6. Submit `https://your-domain.com/sitemap.xml` in Google Search Console.
7. Replace demo photos with your own, and check the pre-launch list in `ASSETS-LICENSES.md`.

---

## 9. Deployment

### Vercel (Recommended — Zero Configuration)
1. Push your repository to GitHub or GitLab.
2. In Vercel, click **Import Project** and select your repository.
3. Vercel automatically detects **Next.js**:
   - Framework preset: **Next.js**
   - Build command: `npm run build` (`next build`)
   - Output directory: `.next`
4. Add environment variables if using Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID`, etc.).
5. Click **Deploy**. Full SSR/SSG rendering, dynamic metadata, and edge routing work immediately out of the box with zero custom rewrite configuration.

### Netlify
- Framework preset: **Next.js**
- Build command: `npm run build`
- Publish directory: `.next` (Netlify Next.js Runtime handles SSR/SSG automatically)

### Cloudflare Pages
- Framework preset: **Next.js**
- Build command: `npx @cloudflare/next-on-pages` or standard Next.js static build

---

## 10. FAQ

**Do I need a backend?**
No backend server required. The CMS stores to LocalStorage in the visitor's browser for instant offline mockups, and seamlessly synchronizes with hosted Sanity CMS in the cloud when you're ready.

**Can I change colors and fonts?**
Yes — `tailwind.config.ts` and `src/index.css`. Keep the contrast ratio of gold on charcoal (about 8:1) for accessibility.

**Does the language switcher change the currency?**
No, they are independent. Language is stored under `apex_lang`, currency under `apex_currency`.

**How do I remove the `/admin` route?**
Delete the directory `src/app/admin/`.

**Why do prices show the same number in different currencies?**
The template formats numbers, it does not convert them. See section 5.

**Can I use the demo photos on my client's site?**
Use your own. The demo photos are hot-linked from Unsplash under a licence that permits commercial
use, but they are placeholders — they do not depict the properties you are selling, and swapping in
your own is what makes the template pay for itself. See section 7 and `ASSETS-LICENSES.md`.

**Is GSAP included legally?**
Yes. GSAP ships under Webflow's standard "No Charge" licence (free for commercial use, including
all plugins). The only thing you may not build with it is a no-code animation builder that competes
with Webflow. See `ASSETS-LICENSES.md`.
