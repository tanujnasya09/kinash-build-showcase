import type { Metadata } from 'next';
import HomePage from '@/views/HomePage';
import { home } from '@/content/home';

export const metadata: Metadata = {
  title: home.en.meta.title,
  description: home.en.meta.description,
  keywords: home.en.meta.keywords,
};

export default function Page() {
  return <HomePage />;
}
