import type { Localized, MetaContent, StatItem } from './types';

export interface RealEstateService {
  title: string;
  description: string;
  features: string[];
}

export interface PropertyType {
  title: string;
  description: string;
  features: string[];
}

export interface RealEstateContent {
  meta: MetaContent;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  services: RealEstateService[];
  servicesEyebrow: string;
  servicesTitle: string;
  typesEyebrow: string;
  typesTitle: string;
  types: PropertyType[];
  statsEyebrow: string;
  statsTitle: string;
  stats: StatItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaAccent: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const realEstate: Localized<RealEstateContent> = {
  en: {
    meta: {
      title: 'Luxury Real Estate Portfolio',
      description:
        'Private mansions, commercial estates, and acquisition advisory — legally vetted listings with registry-grade diligence and mapped coordinates.',
      keywords: 'luxury property dehradun, real estate broker uttarakhand, property acquisition registry'
    },
    eyebrow: 'real estate advisory',
    title: 'Strategic Acquisitions,',
    titleAccent: 'Asset Optimization.',
    intro: 'We source, manage, and scale prime real estate assets across North India, prioritizing secure titles, high occupancy yields, and premium capital gains.',
    heroCtaPrimary: 'Explore Opportunities',
    heroCtaSecondary: 'Schedule Consultation',
    services: [
      {
        title: 'Property Acquisition',
        description: 'Expert guidance in finding and acquiring the perfect property for your needs and investment goals.',
        features: ['Market Analysis', 'Property Evaluation', 'Negotiation Support', 'Due Diligence'],
      },
      {
        title: 'Investment Advisory',
        description: 'Strategic real estate investment consulting to maximize returns and build wealth through property.',
        features: ['Investment Strategy', 'Market Research', 'Portfolio Analysis', 'Risk Assessment'],
      },
      {
        title: 'Property Management',
        description: 'Comprehensive property management services to optimize performance and tenant satisfaction.',
        features: ['Tenant Management', 'Maintenance Coordination', 'Financial Reporting', 'Asset Optimization'],
      },
      {
        title: 'Development Consulting',
        description: 'From concept to completion, we guide real estate development projects to successful outcomes.',
        features: ['Site Selection', 'Feasibility Studies', 'Project Planning', 'Market Positioning'],
      },
    ],
    servicesEyebrow: 'services',
    servicesTitle: 'Advisory Solutions',
    typesEyebrow: 'classifications',
    typesTitle: 'Property Specializations',
    types: [
      {
        title: 'Commercial Estates',
        description: 'Office buildings, retail spaces, and industrial properties for business investment.',
        features: ['Office Buildings', 'Retail Centers', 'Warehouses', 'Mixed-Use'],
      },
      {
        title: 'Residential Mansions',
        description: 'Luxury homes, condominiums, and residential developments for personal and investment use.',
        features: ['Luxury Homes', 'Condominiums', 'Townhouses', 'Rental Properties'],
      },
      {
        title: 'Industrial Facilities',
        description: 'Manufacturing facilities, distribution centers, and specialized industrial spaces.',
        features: ['Manufacturing', 'Distribution', 'R&D Facilities', 'Flex Space'],
      },
    ],
    statsEyebrow: 'proven track record',
    statsTitle: 'Market Leadership',
    stats: [
      { amount: 2000000000, suffix: '+', label: 'Valuation Managed' },
      { value: '1,200+', label: 'Successful Transactions' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '500+', label: 'Active Clients' },
    ],
    ctaEyebrow: 'secure access',
    ctaTitle: 'Scale Your Property',
    ctaAccent: 'Equity.',
    ctaBody: 'Book an orientation session with a senior real estate director to evaluate active catalog yields and secure immediate registry title allocations.',
    ctaPrimary: 'Explore Opportunities',
    ctaSecondary: 'Request Consultation',
  },
  es: {
    meta: {
      title: 'Cartera de Inmuebles de Lujo',
      description:
        'Mansiones privadas, estates comerciales y asesoría de adquisición: ofertas verificadas con diligencia registral y coordenadas mapeadas.',
      keywords: 'propiedad de lujo dehradun, corredor inmobiliario uttarakhand, adquisición inmobiliaria, registro'
    },
    eyebrow: 'asesoría inmobiliaria',
    title: 'Adquisiciones Estratégicas,',
    titleAccent: 'Optimización de Activos.',
    intro: 'Buscamos, gestionamos y escalamos activos inmobiliarios prime en el norte de la India, priorizando títulos seguros, alta ocupación y ganancias de capital.',
    heroCtaPrimary: 'Explorar Oportunidades',
    heroCtaSecondary: 'Agendar Consultoría',
    services: [
      {
        title: 'Adquisición de Propiedades',
        description: 'Asesoría experta para encontrar y adquirir la propiedad ideal según sus necesidades y objetivos de inversión.',
        features: ['Análisis de Mercado', 'Evaluación de Propiedades', 'Apoyo en Negociación', 'Debida Diligencia'],
      },
      {
        title: 'Asesoría en Inversiones',
        description: 'Consultoría estratégica de inversión inmobiliaria para maximizar retornos y construir patrimonio.',
        features: ['Estrategia de Inversión', 'Investigación de Mercado', 'Análisis de Portafolio', 'Evaluación de Riesgos'],
      },
      {
        title: 'Gestión de Propiedades',
        description: 'Servicios integrales de gestión para optimizar el rendimiento y la satisfacción del inquilino.',
        features: ['Gestión de Inquilinos', 'Coordinación de Mantenimiento', 'Informes Financieros', 'Optimización de Activos'],
      },
      {
        title: 'Consultoría de Desarrollo',
        description: 'Del concepto a la entrega, guiamos los proyectos de desarrollo inmobiliario hacia el éxito.',
        features: ['Selección de Terreno', 'Estudios de Viabilidad', 'Planificación de Proyectos', 'Posicionamiento de Mercado'],
      },
    ],
    servicesEyebrow: 'servicios',
    servicesTitle: 'Soluciones de Asesoría',
    typesEyebrow: 'clasificaciones',
    typesTitle: 'Especializaciones Inmobiliarias',
    types: [
      {
        title: 'Propiedades Comerciales',
        description: 'Edificios de oficinas, espacios comerciales e propiedades industriales para inversión empresarial.',
        features: ['Edificios de Oficinas', 'Centros Comerciales', 'Almacenes', 'Uso Mixto'],
      },
      {
        title: 'Mansiones Residenciales',
        description: 'Viviendas de lujo, condominios y desarrollos residenciales para uso personal y de inversión.',
        features: ['Viviendas de Lujo', 'Condominios', 'Casas Adosadas', 'Propiedades en Alquiler'],
      },
      {
        title: 'Instalaciones Industriales',
        description: 'Plantas de fabricación, centros de distribución y espacios industriales especializados.',
        features: ['Fabricación', 'Distribución', 'Instalaciones de I+D', 'Espacio Flexible'],
      },
    ],
    statsEyebrow: 'historial probado',
    statsTitle: 'Liderazgo de Mercado',
    stats: [
      { amount: 2000000000, suffix: '+', label: 'Valoración Gestionada' },
      { value: '1.200+', label: 'Transacciones Exitosas' },
      { value: '98%', label: 'Satisfacción del Cliente' },
      { value: '500+', label: 'Clientes Activos' },
    ],
    ctaEyebrow: 'acceso seguro',
    ctaTitle: 'Escalen su Patrimonial',
    ctaAccent: 'Inmobiliario.',
    ctaBody: 'Agende una sesión de orientación con un director inmobiliario senior para evaluar rendimientos del catálogo activo y asegurar asignaciones inmediatas de títulos registrales.',
    ctaPrimary: 'Explorar Oportunidades',
    ctaSecondary: 'Solicitar Consultoría',
  },
  de: {
    meta: {
      title: 'Luxus-Immobilienportfolio',
      description:
        'Private Anwesen, Gewerbeimmobilien und Ankaufberatung — rechtlich geprüfte Angebote mit grundbuchtauglicher Prüfung und kartierten Koordinaten.',
      keywords: 'luxus immobilie dehradun, immobilienmakler uttarakhand, immobilienankauf, grundbuch'
    },
    eyebrow: 'immobilienberatung',
    title: 'Strategische Akquisitionen,',
    titleAccent: 'Asset-Optimierung.',
    intro: 'Wir beschaffen, verwalten und skalieren hochwertige Immobilienassets in Nordindien — mit Priorität auf sichere Titel, hohe Belegung und Premium-Kapitalgewinne.',
    heroCtaPrimary: 'Chancen Entdecken',
    heroCtaSecondary: 'Beratung Terminieren',
    services: [
      {
        title: 'Objektakquisition',
        description: 'Expertenbegleitung bei der Suche und dem Erwerb des passenden Objekts für Ihre Bedürfnisse und Anlageziele.',
        features: ['Marktanalyse', 'Objektbewertung', 'Verhandlungsunterstützung', 'Due Diligence'],
      },
      {
        title: 'Investmentberatung',
        description: 'Strategische Immobilien-Investmentberatung für maximale Rendite und Vermögensaufbau.',
        features: ['Investmentstrategie', 'Marktforschung', 'Portfolioanalyse', 'Risikoanalyse'],
      },
      {
        title: 'Objektverwaltung',
        description: 'Ganzheitliche Verwaltungsleistungen zur Optimierung von Performance und Mieterzufriedenheit.',
        features: ['Mietermanagement', 'Wartungskoordination', 'Finanzberichte', 'Asset-Optimierung'],
      },
      {
        title: 'Entwicklungsberatung',
        description: 'Vom Konzept bis zur Fertigstellung begleiten wir Immobilienentwicklungen zum Erfolg.',
        features: ['Standortwahl', 'Machbarkeitsstudien', 'Projektplanung', 'Marktpositionierung'],
      },
    ],
    servicesEyebrow: 'leistungen',
    servicesTitle: 'Beratungslösungen',
    typesEyebrow: 'klassen',
    typesTitle: 'Immobilienspezialisierungen',
    types: [
      {
        title: 'Gewerbeimmobilien',
        description: 'Bürogebäude, Handelsflächen und Industrieimmobilien für Unternehmensinvestitionen.',
        features: ['Bürogebäude', 'Einkaufszentren', 'Lagerhallen', 'Mischgebiete'],
      },
      {
        title: 'Residenzen',
        description: 'Luxusresidenzen, Eigentumswohnungen und Wohnentwicklungen für private und Anlagezwecke.',
        features: ['Luxusresidenzen', 'Eigentumswohnungen', 'Reihenhäuser', 'Mietobjekte'],
      },
      {
        title: 'Industriefacilities',
        description: 'Produktionsanlagen, Distributionszentren und spezialisierte Industrieflächen.',
        features: ['Produktion', 'Distribution', 'F&E-Einrichtungen', 'Flexspace'],
      },
    ],
    statsEyebrow: 'bewährte erfahrung',
    statsTitle: 'Marktführerschaft',
    stats: [
      { amount: 2000000000, suffix: '+', label: 'Verwaltetes Volumen' },
      { value: '1.200+', label: 'Erfolgreiche Transaktionen' },
      { value: '98%', label: 'Kundenzufriedenheit' },
      { value: '500+', label: 'Aktive Mandanten' },
    ],
    ctaEyebrow: 'sicherer zugang',
    ctaTitle: 'Skalieren Sie Ihr',
    ctaAccent: 'Immobilienvermögen.',
    ctaBody: 'Vereinbaren Sie eine Orientierung mit einem erfahrenen Immobiliendirektor — für Renditen des aktiven Katalogs und sofortige Grundbuchzuweisungen.',
    ctaPrimary: 'Chancen Entdecken',
    ctaSecondary: 'Beratung Anfragen',
  },
};
