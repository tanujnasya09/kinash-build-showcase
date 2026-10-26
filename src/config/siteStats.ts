export interface SiteStatMetric {
  id: 'projects' | 'years' | 'value' | 'satisfaction' | 'awards';
  numericValue: number;
  suffix: string;
  prefix?: string;
  formattedRaw: string;
  amountInINR?: number;
  labels: {
    en: string;
    es: string;
    de: string;
  };
  descriptions: {
    en: string;
    es: string;
    de: string;
  };
}

export const siteStats = {
  projects: {
    id: 'projects' as const,
    numericValue: 500,
    suffix: '+',
    formattedRaw: '500+',
    labels: {
      en: 'Projects Completed',
      es: 'Proyectos Completados',
      de: 'Abgeschlossene Projekte',
    },
    descriptions: {
      en: 'High-end villas, demarcations & civil developments delivered.',
      es: 'Villas de lujo, demarcaciones y obras civiles entregadas.',
      de: 'Luxusvillen, Demarkationen und Bauprojekte übergeben.',
    },
  },
  years: {
    id: 'years' as const,
    numericValue: 15,
    suffix: '+',
    formattedRaw: '15+',
    labels: {
      en: 'Years Experience',
      es: 'Años de Experiencia',
      de: 'Jahre Erfahrung',
    },
    descriptions: {
      en: 'Generational civil engineering and master-planned layouts.',
      es: 'Ingeniería civil generacional y trazados planificados.',
      de: 'Erstklassiger Ingenieurbau und meisterhafte Planung.',
    },
  },
  value: {
    id: 'value' as const,
    numericValue: 200,
    amountInINR: 2000000000,
    suffix: 'Cr+',
    prefix: '₹',
    formattedRaw: '₹200Cr+',
    labels: {
      en: 'Managed Equity Value',
      es: 'Valor de Capital Gestionado',
      de: 'Verwalteter Vermögenswert',
    },
    descriptions: {
      en: 'Cumulative value of delivered real estate assets.',
      es: 'Valor acumulado de activos inmobiliarios entregados.',
      de: 'Gesamtwert der übergebenen Immobilienanlagen.',
    },
  },
  satisfaction: {
    id: 'satisfaction' as const,
    numericValue: 98,
    suffix: '%',
    formattedRaw: '98%',
    labels: {
      en: 'Client Satisfaction',
      es: 'Satisfacción del Cliente',
      de: 'Kundenzufriedenheit',
    },
    descriptions: {
      en: 'Verified registry approvals and client endorsement rate.',
      es: 'Aprobaciones registrales verificadas y respaldo de clientes.',
      de: 'Verifizierte Grundbucheinträge und Weiterempfehlungsrate.',
    },
  },
  awards: {
    id: 'awards' as const,
    numericValue: 25,
    suffix: '+',
    formattedRaw: '25+',
    labels: {
      en: 'Industry Awards',
      es: 'Premios del Sector',
      de: 'Branchenauszeichnungen',
    },
    descriptions: {
      en: 'Architectural, civil engineering and design excellence honors.',
      es: 'Reconocimientos por excelencia arquitectónica y de ingeniería.',
      de: 'Auszeichnungen für architektonische und bauliche Spitzenleistung.',
    },
  },
};

export default siteStats;
