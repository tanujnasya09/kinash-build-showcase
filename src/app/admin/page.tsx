import type { Metadata } from 'next';
import AdminPage from '@/views/AdminPage';

export const metadata: Metadata = {
  title: 'Content Administration',
  description: 'Manage listings and configure Sanity CMS Studio',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <AdminPage />;
}
