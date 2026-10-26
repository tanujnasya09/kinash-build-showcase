import { MetadataRoute } from 'next';
import siteConfig from '@/config/site';
import { demoProperties } from '@/data/properties';

const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[`NEXT_PUBLIC_${key}`] || process.env[key] || process.env[`VITE_${key}`];
  }
  return undefined;
};

async function getPropertySlugs(): Promise<string[]> {
  const projectId = getEnv('SANITY_PROJECT_ID')?.trim();
  if (!projectId) {
    return demoProperties.map((p) => p.slug);
  }

  const dataset = getEnv('SANITY_DATASET') || 'production';
  const apiVersion = getEnv('SANITY_API_VERSION') || '2024-10-01';
  const query = encodeURIComponent('*[_type == "property" && defined(slug.current)].slug.current');

  try {
    const res = await fetch(
      `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { result } = await res.json();
    if (Array.isArray(result) && result.length > 0) {
      return result;
    }
  } catch (err) {
    // Fall back to demo listings gracefully if Sanity is unreachable
  }

  return demoProperties.map((p) => p.slug);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/construction`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/real-estate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  const slugs = await getPropertySlugs();
  const propertyRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/property/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
