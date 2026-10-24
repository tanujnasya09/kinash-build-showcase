import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'apex-luxury',
  title: 'Apex Luxury — Listings',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Properties')
              .schemaType('property')
              .child(S.documentTypeList('property').title('Properties').defaultOrdering([{ field: 'orderRank', direction: 'asc' }])),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-10-01' }),
  ],
  schema: { types: schemaTypes },
});
