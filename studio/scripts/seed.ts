/**
 * Imports the template's demo listings into your Sanity dataset.
 *
 *   cd studio
 *   npm run seed
 *
 * Safe to re-run: each listing gets a stable _id (property-<slug>), so it is replaced, not duplicated.
 * Demo photos are stored as external image URLs — upload your own photos in the Studio later.
 */
import { getCliClient } from 'sanity/cli';
import { demoProperties } from '../../src/data/properties';

const client = getCliClient({ apiVersion: '2024-10-01' });

async function seed() {
  const tx = client.transaction();

  demoProperties.forEach((p, index) => {
    tx.createOrReplace({
      _id: `property-${p.slug}`,
      _type: 'property',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      price: p.price,
      status: p.status,
      location: p.location,
      description: p.description,
      features: p.features,
      additionalInfo: p.additionalInfo,
      contact: p.contact,
      orderRank: index + 1,
      imageUrls: p.images,
      videoLink: p.videoLink,
      virtualTourUrl: p.virtualTourUrl,
      floorPlanUrl: p.floorPlanUrl,
      brochureUrl: p.brochureUrl,
      specs: {
        type: p.specs.type,
        sizes: p.specs.sizes,
        possession: p.specs.possession,
        facing: p.specs.facing,
        bedrooms: p.specs.bedrooms != null ? String(p.specs.bedrooms) : undefined,
        bathrooms: p.specs.bathrooms != null ? String(p.specs.bathrooms) : undefined,
        parking: p.specs.parking != null ? String(p.specs.parking) : undefined,
        area: p.specs.area,
      },
      coordinates: { lat: p.coordinates[0], lng: p.coordinates[1] },
      translations: p.translations,
    });
  });

  const result = await tx.commit();
  console.log(`✔ Imported ${result.results.length} demo listings into "${client.config().dataset}".`);
}

seed().catch((err) => {
  console.error('✖ Seed failed:', err.message);
  process.exit(1);
});
