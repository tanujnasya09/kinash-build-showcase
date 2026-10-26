# Gumroad Listing & Fulfillment Kit

Use this document to fill out both the **Product** tab and the **Content** tab on Gumroad.

---

## 1. PRODUCT TAB (What visitors see before buying)

### Title
```
Apex Luxury — Ultra-Luxury Real Estate & Contracting Website Template (Next.js 14 + Sanity CMS)
```

### Tagline
```
Agency-grade Next.js 14 template with Dual Themes, Leaflet Price Map, Mortgage Simulator, and Headless Sanity CMS Studio.
```

### Price
```
$49 (Single Project)  |  $129 (Agency / Unlimited Projects)
```

### Description (Copy & paste into the Product Description box)
```markdown
Apex Luxury is an architectural-grade showcase website template engineered for prime residential estates, luxury villas, private land developments, and bespoke architectural firms. Built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, and shadcn/ui — featuring an embedded Headless Sanity CMS Studio.

It delivers the bespoke, high-ticket digital presence top design agencies charge $15,000–$25,000 to build — without the agency invoice or months of waiting.

---

### 🏛️ Why It Commands a Premium

- 🌓 Curated Dual Theme Engine (Obsidian Dark & Alabaster Light)
  - Obsidian Dark: Deep titanium canvas (#0c0d10), radiant champagne-gold accents (#dfba48), ivory typography.
  - Alabaster Light: Warm gallery stone (#f8f7f4), carrara architectural stone, heritage gold (#ba891d), charcoal obsidian type.
  - 1-click header switcher with zero flicker and persistent browser memory.

- 🛠️ Headless Sanity CMS Studio Included (/studio)
  - Full production Sanity Studio pre-configured inside the project.
  - Real cloud database, image CDN pipeline, and team collaboration on any device.
  - 1-command demo importer (`npm run seed`) so your site is populated instantly.
  - Hybrid fallback: Works with zero configuration using browser storage if no Sanity API key is set.

- 🧮 Interactive Wealth & Mortgage EMI Workbench
  - Real-time financing calculator with live sliders for down payment, APR interest, and loan tenure.
  - Instant EMI calculation rendered in the active currency with a 5-year capital appreciation projection.

- 🖨️ One-Click Printable Architectural Client Dossier
  - High-net-worth property buyers love physical documents. Built-in print rules format the screen into an elegant black-and-white A4/Letter dossier ready for client meetings or PDF export via window.print().

- 📱 Mobile Conversion Action Bar
  - Ergonomic bottom thumb-zone bar with live currency valuation, quick-dial agent trigger, and consultation booking.

- 🗺️ Interactive Leaflet Price-Tag Map
  - Custom gold price-pill markers synchronized in real time with directory filters, category tabs, and budget sliders.

- 💱 Multi-Currency & Trilingual Localization
  - 4 Currencies: INR (₹), USD ($), EUR (€), GBP (£) with locale-correct numbering (e.g. ₹200Cr, $2B).
  - 3 Languages: English, Español (Spanish), Deutsch (German).

- 🕶️ Matterport 3D Digital-Twin & Video Tours
  - Built-in modal viewers for Matterport 3D walkthroughs, YouTube, Vimeo, and direct MP4 videos.

- 🗂️ Clean 4-Layer Architecture (Zero-Code Rebranding)
  - `src/config/site.ts` → Brand, contact, and social links
  - `src/content/*.ts` → Page copy & marketing text
  - `src/i18n/` → UI labels & translations
  - `/studio` or `/admin` → Property listings

- 🔍 Complete SEO Architecture
  - Per-page meta tags, Open Graph + Twitter cards, JSON-LD Schema markup, canonical links, and an auto-generating `sitemap.xml` that updates from your CMS.

- ⚡ Fast, Accessible & Zero-Backend Deployment
  - Pre-rendered static SSG & SSR output. Deploy to Vercel, Netlify, or Cloudflare Pages in 2 minutes.

---

### 📄 Pages & Routes Included

1. Home (Hero with text reveal, bento statistics, featured portfolio, divisions, CTA)
2. Properties Directory (/properties — split-view filter grid + sticky interactive Leaflet map)
3. Property Detail (/property/:slug — photo gallery, 3D Matterport, specs, video tour, printable brochure)
4. Services & Infrastructure (/services)
5. Construction & Engineering (/construction — live project counter)
6. Real Estate Advisory (/real-estate)
7. About Us (/about — heritage legacy, values, leadership)
8. Private Consultation & Contact (/contact — simulated CRM intake pipeline)
9. CMS Admin Panel (/admin)
10. Sanity Studio (/studio)
11. Branded 404 Route

---

### 📦 What You Get

- Full Next.js 14 App Router & TypeScript source code for the entire website
- Complete Sanity Studio codebase (/studio) with custom schemas
- Documentation:
  - SANITY-SETUP.md (10-minute setup & deployment guide)
  - DOCUMENTATION.md (Full rebranding, hosting, & SEO checklist)
  - DESIGN.md (Design system, typography, & animation tokens)
  - ASSETS-LICENSES.md (Commercial licensing clearance)
- Seed script to import demo listings in 1 command
- Lifetime updates & commercial-safe licenses (MIT, BSD-2, SIL OFL)
```

---

## 2. CONTENT TAB (What buyers see AFTER purchase)

Paste this directly into Gumroad's **Content / Delivery** text box and attach `apex-luxury-real-estate-template-pro-v2.0.0.zip` to the download section:

```markdown
# Welcome to Apex Luxury! 🏛️

Thank you for your purchase! You now have the complete source code for **Apex Luxury — Ultra-Luxury Real Estate & Contracting Web Template (Next.js 14 + Sanity CMS)**.

---

### 📥 1. Download Your Files
Click the download button above to get:
**`apex-luxury-real-estate-template-pro-v2.0.0.zip`**

Extract the zip file to your local computer.

---

### ⚡ 2. Quick Start (Run Locally in 2 Minutes)

Open your terminal inside the extracted project folder:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Visit **http://localhost:3000** in your browser. The site is live with demo properties!

---

### 🛠️ 3. Connecting Headless Sanity CMS (Optional)

The website works immediately out of the box with zero configuration! If you want to connect your free cloud Sanity CMS for multi-device editing:

1. Open `SANITY-SETUP.md` inside the project root.
2. In your terminal:
   ```bash
   cd studio
   npm install
   npx sanity login
   npm run seed      # Imports demo properties into Sanity
   npm run dev       # Starts your CMS Studio at http://localhost:3333
   ```
3. Copy your Sanity Project ID into `.env`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   ```
4. Restart your website (`npm run dev`) — it will now pull live from your cloud database!

---

### 🚀 4. Rebranding & Deploying

- **Rebrand in 60 seconds**: Open `src/config/site.ts` to edit brand name, phone, address, and email.
- **Deploy to Vercel/Netlify**: Push your repo to GitHub and connect to Vercel for instant zero-config SSR/SSG deployment.
- **Full Guide**: Open `DOCUMENTATION.md` for complete guides on custom domains, colors, and SEO.

---

### 💬 Need Help or Have Questions?
If you have any questions or need assistance, reply to your Gumroad receipt or leave a message on the product page.

Happy building!
```
