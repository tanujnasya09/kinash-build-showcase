import type { Metadata } from 'next';
import AboutPage from '@/views/AboutPage';
import { about } from '@/content/about';

export const metadata: Metadata = {
  title: about.en.meta.title,
  description: about.en.meta.description,
  keywords: about.en.meta.keywords,
};

export default function Page() {
  return <AboutPage />;
}
