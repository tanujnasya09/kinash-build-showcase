import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const siteConfig = readFileSync(join(root, 'src/config/site.ts'), 'utf8');
const siteUrl = (siteConfig.match(/url:\s*["']([^"']+)["']/)?.[1] ?? 'https://example.com').replace(
  /\/$/,
  ''
);

// ---- Read .env / .env.local (no dependency on dotenv) ----
const readEnv = () => {
  const env = { ...process.env };
  for (const file of ['.env', '.env.local', '.env.production']) {
    try {
      for (const line of readFileSync(join(root, file), 'utf8').split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    } catch {
      /* file not present */
    }
  }
  return env;
};
const env = readEnv();

const localSlugs = () => {
  const data = readFileSync(join(root, 'src/data/properties.ts'), 'utf8');
  return [...data.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
};

// Sanity mode: pull live slugs so new listings are indexed on every build.
const sanitySlugs = async () => {
  const projectId = env.VITE_SANITY_PROJECT_ID?.trim();
  if (!projectId) return null;
  const dataset = env.VITE_SANITY_DATASET || 'production';
  const apiVersion = env.VITE_SANITY_API_VERSION || '2024-10-01';
  const query = encodeURIComponent('*[_type == "property" && defined(slug.current)].slug.current');
  try {
    const res = await fetch(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { result } = await res.json();
    return Array.isArray(result) ? result : null;
  } catch (err) {
    console.warn(`sitemap: Sanity fetch failed (${err.message}) — using demo listings.`);
    return null;
  }
};

const slugs = (await sanitySlugs()) ?? localSlugs();

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/properties', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/construction', priority: '0.8', changefreq: 'monthly' },
  { path: '/real-estate', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
];

const url = (path) => `${siteUrl}${path}`;

const entries = [
  ...staticRoutes.map(
    (route) => `  <url>
    <loc>${url(route.path)}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  ),
  ...slugs.map(
    (slug) => `  <url>
    <loc>${url(`/property/${slug}`)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public/sitemap.xml'), sitemap, 'utf8');
console.log(`sitemap.xml written — ${staticRoutes.length + slugs.length} URLs for ${siteUrl}`);
