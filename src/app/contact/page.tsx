import type { Metadata } from 'next';
import ContactPage from '@/views/ContactPage';
import { contact } from '@/content/contact';

export const metadata: Metadata = {
  title: contact.en.meta.title,
  description: contact.en.meta.description,
  keywords: contact.en.meta.keywords,
};

export default function Page() {
  return <ContactPage />;
}
