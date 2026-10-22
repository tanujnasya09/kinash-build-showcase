import type { Localized, MetaContent } from './types';

export interface PropertiesContent {
  meta: MetaContent;
  headline: string;
  headlineAccent: string;
  intro: string;
}

export const properties: Localized<PropertiesContent> = {
  en: {
    meta: {
      title: 'Luxury Portfolio Listings',
      description:
        'Browse verified plots, villas, and luxury apartments with mapped coordinates, filters by division, and instant budget formatting in your currency.',
      keywords: 'luxury real estate, architectural plots, estates, portfolio, property listings'
    },
    headline: 'Curated Architectural',
    headlineAccent: 'Listings.',
    intro: 'Browse our catalog of verified private lands, residential estates, and architectural master plans. Every listing is legally vetted with demarcated spatial coordinates.',
  },
  es: {
    meta: {
      title: 'Listado de Propiedades de Lujo',
      description:
        'Explore parcelas, villas y apartamentos de lujo verificados con coordenadas mapeadas, filtros por división y precios en su moneda.',
      keywords: 'inmobiliaria de lujo, parcelas arquitectónicas, estates, portafolio, listado de propiedades'
    },
    headline: 'Propiedades Arquitectónicas',
    headlineAccent: 'Curadas.',
    intro: 'Explore nuestro catálogo de terrenos privados verificados, estates residenciales y planos maestros arquitectónicos. Cada propiedad es verificada legalmente con coordenadas demarcadas.',
  },
  de: {
    meta: {
      title: 'Luxus-Immobilienübersicht',
      description:
        'Durchsuchen Sie verifizierte Grundstücke, Villen und Luxuswohnungen mit kartierten Koordinaten, Filtern nach Division und Preisen in Ihrer Währung.',
      keywords: 'luxus immobilien, baupläne, anwesen, portfolio, objektübersicht'
    },
    headline: 'Kuratierte',
    headlineAccent: 'Architektur-Objekte.',
    intro: 'Durchsuchen Sie unseren Katalog verifizierter Privatgrundstücke, Wohnsiedlungen und architektonischer Masterpläne. Jedes Objekt ist rechtlich geprüft und mit vermessenen Koordinaten hinterlegt.',
  },
};
