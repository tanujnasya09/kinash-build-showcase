import type { Metadata } from 'next';
import { Suspense } from 'react';
import AllProperties from '@/views/AllProperties';
import { properties } from '@/content/properties';

export const metadata: Metadata = {
  title: properties.en.meta.title,
  description: properties.en.meta.description,
  keywords: properties.en.meta.keywords,
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0c0d10]">
          <span className="w-10 h-10 border border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      }
    >
      <AllProperties />
    </Suspense>
  );
}
