# Asset & Third-Party Licence Register

Every external asset that ships in, or is loaded by, this template — what it is, who owns it,
what the licence permits, and what **you** must do before you launch.

Read this before you publish. A buyer who ships unlicensed photography or third-party video is
exposing themselves, and in most cases the risk passes straight back to the seller through
support requests and chargebacks.

---

## 1. Shipped inside the package (in `public/`)

| Asset | Source | Licence | Action required |
|---|---|---|---|
| `public/assets/logo.png` | Original Apex Luxury brand mark | Owned by the seller | **Replace** with your own logo |
| `public/favicon.png` | Original Apex Luxury brand mark | Owned by the seller | **Replace** with your own favicon |
| `public/assets/apex-opengraph.png` | Original Apex Luxury social share card | Owned by the seller | **Replace** with your own 1200×630 card |
| `public/placeholder.svg` | Original vector placeholder | Owned by the seller | Optional to replace |

No third-party photography, video, or model files are bundled in the package. That is deliberate:
bundled stock imagery is the single largest source of licence disputes in sold templates.

## 2. Photography (hot-linked, not bundled)

All demo photography is hot-linked from **Unsplash** (`images.unsplash.com`) — 22 unique photos.

| Item | Licence | Notes |
|---|---|---|
| Unsplash free-collection photos | [Unsplash Licence](https://unsplash.com/license) — irrevocable, worldwide, commercial use, no attribution required | You may use and redistribute these in a website you build with this template |
| Unsplash **+** (paid) photos | **Prohibited** in templates | Never swap in an Unsplash+ photo — their terms forbid use in digital templates intended for resale |
| Third-party / client photography | **You must own it or hold a written release** | A photographer keeps copyright in the photos they shoot. If a photographer, a previous client, or a stock agency shot your listings, you need their permission **in writing** before redistributing the files in a product |

**Rules for you**

1. Replace every demo photo with your own property photography before launch. The demo photos are
   placeholders — they are not part of what you paid for.
2. If you use your own photos, you either shot them, hired a photographer under a work-for-hire /
   buyout agreement, or hold a commercial licence that permits redistribution.
3. Hot-linking `images.unsplash.com` works without an API key. Unsplash asks API clients to include
   attribution; for a plain hot-link, attribution is optional but appreciated. If you want
   attribution-free, self-hosted images, download them and keep the photographer credit in a credits
   page — the licence permits this.

## 3. Third-party embeds

| Embed | Where | Terms | Action required |
|---|---|---|---|
| **Matterport 3D tour** | Property page + fullscreen modal | Matterport's public demo space, free to embed. Your own scans require a Matterport account and a space ID | Replace `src/config/site.ts` → `demo.virtualTourUrl` with your own space URL. The bundled value points at Matterport's official demo space, not a third-party property. |
| **YouTube walkthrough** | Property page right column | Only set a `videoLink` for a video **you own** or are licensed to embed | The demo listings ship with **no** video link, so the panel shows a designed "guided tour" state instead of someone else's content. Add your own YouTube ID per listing in `src/context/PropertyContext.tsx`. |
| **Google Maps embed** | Property page map | Google's embed terms permit the classic `maps.google.com/...&output=embed` form. The Maps JavaScript API requires your own key and billing account | Keep the Google attribution shown by the embed, or switch to the JS API with your own key |
| **CARTO + OpenStreetMap tiles** | Interactive map on `/properties` | OSM data is **ODbL** (attribution required); CARTO's basemap is free for this volume with attribution | The attribution string is already in `src/components/Map/InteractiveMap.tsx` — **do not remove it**, it is a licence condition |

## 4. Fonts

| Font | Licence | Notes |
|---|---|---|
| Archivo, Manrope, JetBrains Mono | [SIL Open Font Licence 1.1](https://openfontlicense.org) | OFL permits commercial use and redistribution inside a product. Keep the OFL notice if you self-host the font files. |

Fonts are currently loaded from `fonts.googleapis.com`. For privacy/GDPR and to work offline, self-host
them (`@fontsource/archivo` etc.) and keep the licence files in the package.

## 5. Code dependencies (shipped as `node_modules` to the buyer)

| Package | Licence | Notes |
|---|---|---|
| `gsap` | [GSAP Standard "No Charge" Licence](https://gsap.com/licensing/) (Webflow, effective 30 Apr 2025) | **Commercial use is covered at no charge, including all formerly paid plugins.** The only prohibited use is shipping a *no-code* animation builder that competes with Webflow — a source-code template is not that. You may not strip GSAP's proprietary notices, and you may not use it to build a competitive visual animation tool. |
| `leaflet` / `react-leaflet` | BSD-2-Clause / MIT | Attribution in file headers only. |
| `lucide-react` | ISC | |
| `@radix-ui/*` | MIT | |
| `class-variance-authority` | Apache-2.0 | |
| `clsx` / `tailwind-merge` | MIT | |
| `lenis` | MIT | |
| `sonner` | MIT | |
| `react-helmet-async` | Apache-2.0 | |
| `@tanstack/react-query` | MIT | |
| `react-router-dom` | MIT | |
| `@sanity/client` / `sanity` | MIT | Official open-source Sanity client & studio framework. Permissive commercial use. |
| `react` / `react-dom` | MIT | |
| `tailwindcss` | MIT | |

All of the above permit commercial use and redistribution inside a product you sell. None of them
require you to pay a separate fee, and none of them forbid resale of the *product* you build with
them.

---

## Pre-launch checklist

- [ ] Replaced `logo.png`, `favicon.png`, `apex-opengraph.png` with your own brand assets
- [ ] Configured Sanity CMS Studio (or decided to run local demo mode) per `SANITY-SETUP.md`
- [ ] Replaced every demo listing photo with photos you own or are licensed to redistribute
- [ ] Set `siteConfig.demo.virtualTourUrl` to your own Matterport space (or left the official demo)
- [ ] Added your own YouTube walkthrough IDs (or left them unset)
- [ ] Set your domain in `siteConfig.url` and regenerated the sitemap (`npm run sitemap`)
- [ ] Updated the contact phone, email, address, and social links in `siteConfig`
- [ ] Kept the OpenStreetMap / CARTO attribution on the interactive map
- [ ] Read `LICENSE.md` and picked the licence tier that matches how you will distribute this
