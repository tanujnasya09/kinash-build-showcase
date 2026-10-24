import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Property listing — mirrors `src/types/property.ts` in the website.
 * The website's GROQ query (src/lib/sanity.ts) maps these fields 1:1.
 */

const translationFields = (lang: string) => [
  defineField({ name: 'title', title: `Title (${lang})`, type: 'string' }),
  defineField({ name: 'location', title: `Location (${lang})`, type: 'string' }),
  defineField({ name: 'description', title: `Description (${lang})`, type: 'text', rows: 4 }),
  defineField({
    name: 'features',
    title: `Features (${lang})`,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  }),
  defineField({ name: 'specsType', title: `Property type (${lang})`, type: 'string' }),
  defineField({ name: 'specsPossession', title: `Possession (${lang})`, type: 'string' }),
  defineField({ name: 'specsFacing', title: `Facing (${lang})`, type: 'string' }),
];

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  groups: [
    { name: 'main', title: 'Listing', default: true },
    { name: 'media', title: 'Media' },
    { name: 'specs', title: 'Specifications' },
    { name: 'location', title: 'Map' },
    { name: 'i18n', title: 'Translations' },
  ],
  fields: [
    // ---------- Listing ----------
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
      validation: (r) => r.required().max(90),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'main',
      description: 'Used in the page URL: /property/<slug>',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      group: 'main',
      description: 'Enter as you want it parsed, e.g. "₹4,50,00,000" or "45000000". The site formats it per selected currency.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'main',
      initialValue: 'Available',
      options: {
        list: ['Available', 'Under Construction', 'Ready to Move', 'Pre-Launch', 'Sold Out'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'main',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5, group: 'main' }),
    defineField({
      name: 'features',
      title: 'Key features',
      type: 'array',
      group: 'main',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'additionalInfo', title: 'Additional info', type: 'text', rows: 3, group: 'main' }),
    defineField({ name: 'contact', title: 'Contact phone', type: 'string', group: 'main' }),
    defineField({
      name: 'orderRank',
      title: 'Display order',
      type: 'number',
      group: 'main',
      description: 'Lower numbers appear first. Leave empty to sort by creation date.',
    }),

    // ---------- Media ----------
    defineField({
      name: 'gallery',
      title: 'Photo gallery',
      type: 'array',
      group: 'media',
      description: 'Upload photos. The first image is used as the cover.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'imageUrls',
      title: 'External image URLs (optional)',
      type: 'array',
      group: 'media',
      description: 'Paste image links if you host photos elsewhere. Shown after uploaded photos.',
      of: [defineArrayMember({ type: 'url' })],
    }),
    defineField({ name: 'videoLink', title: 'Video walkthrough URL (YouTube / Vimeo / MP4)', type: 'url', group: 'media' }),
    defineField({ name: 'virtualTourUrl', title: 'Matterport 3D tour URL', type: 'url', group: 'media' }),
    defineField({ name: 'floorPlan', title: 'Floor plan image', type: 'image', group: 'media' }),
    defineField({ name: 'floorPlanUrl', title: 'Floor plan URL (if not uploaded)', type: 'url', group: 'media' }),
    defineField({
      name: 'brochure',
      title: 'Brochure (PDF)',
      type: 'file',
      group: 'media',
      options: { accept: 'application/pdf' },
    }),
    defineField({ name: 'brochureUrl', title: 'Brochure URL (if not uploaded)', type: 'string', group: 'media' }),

    // ---------- Specifications ----------
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'object',
      group: 'specs',
      fields: [
        defineField({ name: 'type', title: 'Property type', type: 'string', initialValue: 'Residential Plot' }),
        defineField({
          name: 'sizes',
          title: 'Available sizes',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          options: { layout: 'tags' },
        }),
        defineField({ name: 'possession', title: 'Possession', type: 'string', initialValue: 'Immediate' }),
        defineField({
          name: 'facing',
          title: 'Facing',
          type: 'string',
          options: { list: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'] },
        }),
        defineField({ name: 'bedrooms', title: 'Bedrooms', type: 'string' }),
        defineField({ name: 'bathrooms', title: 'Bathrooms', type: 'string' }),
        defineField({ name: 'parking', title: 'Parking', type: 'string' }),
        defineField({ name: 'area', title: 'Area', type: 'string', description: 'e.g. "4,500 Sq Ft"' }),
      ],
    }),

    // ---------- Map ----------
    defineField({
      name: 'coordinates',
      title: 'Map coordinates',
      type: 'object',
      group: 'location',
      description: 'Tip: right-click a spot in Google Maps to copy its latitude, longitude.',
      fields: [
        defineField({ name: 'lat', title: 'Latitude', type: 'number', validation: (r) => r.min(-90).max(90) }),
        defineField({ name: 'lng', title: 'Longitude', type: 'number', validation: (r) => r.min(-180).max(180) }),
      ],
    }),

    // ---------- Translations ----------
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'object',
      group: 'i18n',
      description: 'Optional. Empty fields fall back to English.',
      options: { collapsible: true },
      fields: [
        defineField({ name: 'es', title: 'Español', type: 'object', options: { collapsible: true, collapsed: true }, fields: translationFields('ES') }),
        defineField({ name: 'de', title: 'Deutsch', type: 'object', options: { collapsible: true, collapsed: true }, fields: translationFields('DE') }),
      ],
    }),
  ],

  orderings: [
    { title: 'Display order', name: 'orderRankAsc', by: [{ field: 'orderRank', direction: 'asc' }] },
    { title: 'Newest first', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'location', status: 'status', media: 'gallery.0' },
    prepare: ({ title, subtitle, status, media }) => ({
      title,
      subtitle: [status, subtitle].filter(Boolean).join(' · '),
      media,
    }),
  },
});
