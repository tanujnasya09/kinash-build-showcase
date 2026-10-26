import type { Metadata } from 'next';
import RealEstatePage from '@/views/RealEstatePage';
import { realEstate } from '@/content/realEstate';

export const metadata: Metadata = {
  title: realEstate.en.meta.title,
  description: realEstate.en.meta.description,
  keywords: realEstate.en.meta.keywords,
};

export default function Page() {
  return <RealEstatePage />;
}
