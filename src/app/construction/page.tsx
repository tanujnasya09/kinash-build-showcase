import type { Metadata } from 'next';
import ConstructionPage from '@/views/ConstructionPage';
import { construction } from '@/content/construction';

export const metadata: Metadata = {
  title: construction.en.meta.title,
  description: construction.en.meta.description,
  keywords: construction.en.meta.keywords,
};

export default function Page() {
  return <ConstructionPage />;
}
