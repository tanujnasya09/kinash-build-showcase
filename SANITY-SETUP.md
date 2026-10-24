# Sanity CMS Setup (Pro Edition)

Connect the template to **Sanity**, a hosted headless CMS with a free tier. You can then add listings, upload photos and publish from any device, and the website updates automatically.

> **No Sanity? No problem.** If `VITE_SANITY_PROJECT_ID` is empty, the site runs in demo mode. Listings come from `src/data/properties.ts` and can be edited at `/admin` in the browser.

Setup takes about 10 minutes.

---

## 1. Create a Sanity project (free)

```bash
cd studio
npm install
npx sanity login            # Google / GitHub / email
npx sanity projects create  # or create one at https://www.sanity.io/manage
```

Copy the **Project ID** it prints. The dataset name is usually `production`.

## 2. Configure the Studio

```bash
# inside /studio
cp .env.example .env
```

```env
SANITY_STUDIO_PROJECT_ID=abc123xy
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_HOSTNAME=apex-luxury   # → https://apex-luxury.sanity.studio
```

## 3. Import the demo listings (optional)

```bash
npm run seed
```

This imports the 6 demo properties so the site isn't empty on day one. You can run it again safely: existing listings are replaced, not duplicated.

## 4. Run / deploy the Studio

```bash
npm run dev      # local editor → http://localhost:3333
npm run deploy   # free hosting → https://<hostname>.sanity.studio
```

Invite your client from **sanity.io/manage → Members**. They log in to the Studio URL and manage listings. They never touch code.

## 5. Connect the website

In the **project root** (not `/studio`):

```bash
cp .env.example .env
```

```env
VITE_SANITY_PROJECT_ID=abc123xy
VITE_SANITY_DATASET=production
VITE_SANITY_STUDIO_URL=https://apex-luxury.sanity.studio
```

Add the same variables in **Vercel / Netlify → Environment Variables**, then redeploy.

## 6. Allow your domain (CORS), required

**sanity.io/manage → your project → API → CORS origins → Add origin**

- `http://localhost:8080` (local dev)
- `https://your-site.com` (production)
- Leave **"Allow credentials"** unchecked

If you skip this step, the browser blocks the request. The site falls back to demo listings and `/admin` shows a "Connection issue" notice.

---

## How it works

| Piece | File |
|---|---|
| Sanity client + GROQ query | `src/lib/sanity.ts` |
| Demo/Sanity switch, fallback | `src/context/PropertyContext.tsx` |
| `/admin` in Sanity mode | `src/components/admin/SanityAdminPanel.tsx` |
| Document schema | `studio/schemaTypes/property.ts` |
| Demo data importer | `studio/scripts/seed.ts` |
| Sitemap from live slugs | `scripts/generate-sitemap.mjs` |

- **Reads are public** through the Sanity CDN, so the website needs no token. Keep the dataset **public** (the default).
- **Writes happen only inside Sanity Studio** with each editor's own login. No write token is ever shipped to the browser.
- **Content updates** appear within about 60 seconds (CDN cache). For a new listing to appear in `sitemap.xml`, redeploy the site. Optional: add a Sanity webhook that calls your Vercel/Netlify deploy hook.
- **Photos:** uploaded images are served from Sanity's image CDN, auto-optimized (`?w=1600&auto=format`). You can also paste external image URLs.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `/admin` says "Connection issue" | Add your site URL to CORS origins (step 6) and check the project ID |
| Listings don't change after editing | Click **Publish** in Studio (drafts are hidden), wait ~60s, then click **Re-sync** at `/admin` |
| `npm run seed` → "Unauthorized" | Run `npx sanity login` inside `/studio` first |
| Studio shows "project not found" | `studio/.env` project ID doesn't match `sanity.io/manage` |
