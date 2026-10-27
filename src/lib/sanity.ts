/**
 * Sanity CMS connector.
 *
 * The template runs in one of two modes:
 *  - "demo"   : no VITE_SANITY_PROJECT_ID set → listings come from src/data/properties.ts
 *               and the /admin page edits them in the browser (localStorage).
 *  - "sanity" : VITE_SANITY_PROJECT_ID set → listings are fetched live from your Sanity
 *               dataset and edited in Sanity Studio (see /studio).
 *
 * Reads are public (no token) — keep your dataset "public" or add a read token proxy.
 * Never put a write token in VITE_* variables: they are shipped to the browser.
 */
import type { SanityClient } from '@sanity/client';
import type { Property } from '@/types/property';

const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[`NEXT_PUBLIC_${key}`] || process.env[key] || process.env[`VITE_${key}`];
  }
  return undefined;
};

const projectId = getEnv('SANITY_PROJECT_ID');
const dataset = getEnv('SANITY_DATASET') || 'production';
const apiVersion = getEnv('SANITY_API_VERSION') || '2024-10-01';

/** Public URL of your deployed Studio, e.g. https://apex-luxury.sanity.studio */
export const sanityStudioUrl = getEnv('SANITY_STUDIO_URL') || '';

export const isSanityEnabled = Boolean(projectId && projectId.trim());

let _client: SanityClient | null = null;
export function getSanityClient(): SanityClient | null {
  if (!isSanityEnabled) return null;
  if (!_client) {
    try {
      const { createClient } = require('@sanity/client');
      _client = createClient({
        projectId: projectId!.trim(),
        dataset,
        apiVersion,
        useCdn: true, // fast, cached reads; content updates appear within ~60s
        perspective: 'published',
      });
    } catch (e) {
      console.warn('[Apex] Failed to initialize @sanity/client:', e);
      return null;
    }
  }
  return _client;
}

export const sanityClient: SanityClient | null = isSanityEnabled ? getSanityClient() : null;

/**
 * GROQ query — shapes Sanity documents into the exact `Property` interface the UI uses,
 * so no component needs to know where the data came from.
 * Uploaded images and pasted external URLs are merged into one gallery.
 */
export const PROPERTIES_QUERY = /* groq */ `
*[_type == "property" && defined(slug.current)] | order(coalesce(orderRank, 9999) asc, _createdAt asc) {
  _id,
  "slug": slug.current,
  title,
  price,
  status,
  location,
  description,
  "features": coalesce(features, []),
  contact,
  videoLink,
  additionalInfo,
  "images": array::compact(coalesce(gallery[].asset->url, [])) + coalesce(imageUrls, []),
  "specs": {
    "type": coalesce(specs.type, ""),
    "sizes": coalesce(specs.sizes, []),
    "possession": coalesce(specs.possession, ""),
    "facing": coalesce(specs.facing, ""),
    "bedrooms": specs.bedrooms,
    "bathrooms": specs.bathrooms,
    "parking": specs.parking,
    "area": specs.area
  },
  "lat": coordinates.lat,
  "lng": coordinates.lng,
  "floorPlanUrl": coalesce(floorPlan.asset->url, floorPlanUrl),
  virtualTourUrl,
  "brochureUrl": coalesce(brochure.asset->url, brochureUrl),
  translations
}`;

interface SanityPropertyRow extends Omit<Property, 'id' | 'coordinates'> {
  _id: string;
  lat?: number | null;
  lng?: number | null;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop';

/** Optimise Sanity CDN image URLs; external URLs pass through untouched. */
const optimise = (url: string) =>
  url.includes('cdn.sanity.io/images') && !url.includes('?') ? `${url}?w=1600&auto=format&q=80` : url;

export async function fetchSanityProperties(): Promise<Property[]> {
  const client = getSanityClient();
  if (!client) return [];
  const rows = await client.fetch<SanityPropertyRow[]>(PROPERTIES_QUERY);

  return rows.map((row, index) => {
    const { _id, lat, lng, ...rest } = row;
    const images = (rest.images || []).filter(Boolean).map(optimise);
    return {
      ...rest,
      id: index + 1,
      title: rest.title || 'Untitled property',
      price: rest.price || '',
      status: rest.status || 'Available',
      location: rest.location || '',
      description: rest.description || '',
      contact: rest.contact || '',
      images: images.length > 0 ? images : [FALLBACK_IMAGE],
      coordinates: [lat ?? 30.3165, lng ?? 78.0322],
      translations: rest.translations || undefined,
      sanityId: _id,
    } as Property;
  });
}
