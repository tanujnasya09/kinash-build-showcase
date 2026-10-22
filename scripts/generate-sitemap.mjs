import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const siteConfig = readFileSync(join(root, 'src/config/site.ts'), 'utf8');
const siteUrl = (siteConfig.match(/url:\s*["']([^"']+)["']/)?.[1] ?? 'https://example.com').replace(
  /\/$/,
  ''
);

const propertyContext = readFileSync(join(root, 'src/context/PropertyContext.tsx'), 'utf8');
const slugs = [...propertyContext.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);

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
