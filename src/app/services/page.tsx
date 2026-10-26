import type { Metadata } from 'next';
import ServicesPage from '@/views/ServicesPage';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: services.en.meta.title,
  description: services.en.meta.description,
  keywords: services.en.meta.keywords,
};

export default function Page() {
  return <ServicesPage />;
}
