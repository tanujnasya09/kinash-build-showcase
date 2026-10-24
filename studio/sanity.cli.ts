import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Set this to deploy to https://<studioHost>.sanity.studio with `npm run deploy`
  studioHost: process.env.SANITY_STUDIO_HOSTNAME || undefined,
});
