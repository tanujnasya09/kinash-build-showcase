export interface Property {
  id: number;
  /** Sanity document `_id` — present only when listings are loaded from Sanity CMS. */
  sanityId?: string;
  slug: string;
  title: string;
  price: string;
  status: string;
  location: string;
  description: string;
  features: string[];
  contact: string;
  videoLink?: string;
  additionalInfo?: string;
  images: string[];
  specs: {
    type: string;
    sizes: string[];
    possession: string;
    facing: string;
    bedrooms?: string | number;
    bathrooms?: string | number;
    parking?: string | number;
    area?: string;
  };
  coordinates: [number, number]; // [lat, lng] for Leaflet
  floorPlanUrl?: string;
  virtualTourUrl?: string;
  brochureUrl?: string;
  translations?: {
    es: {
      title: string;
      description: string;
      location: string;
      features: string[];
      specsType: string;
      specsPossession: string;
      specsFacing: string;
    };
    de: {
      title: string;
      description: string;
      location: string;
      features: string[];
      specsType: string;
      specsPossession: string;
      specsFacing: string;
    };
  };
}
