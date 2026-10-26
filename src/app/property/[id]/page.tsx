import type { Metadata } from 'next';
import PropertyDetails from '@/views/Property';
import { demoProperties } from '@/data/properties';

export function generateStaticParams() {
  return demoProperties.map((p) => ({
    id: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const property = demoProperties.find((p) => p.slug === params.id);
  if (!property) {
    return { title: 'Property Details' };
  }
  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: property.images?.[0] ? [{ url: property.images[0] }] : undefined,
    },
  };
}

export default function Page() {
  return <PropertyDetails />;
}
