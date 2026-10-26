import type { Localized, MetaContent } from './types';

export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicesContent {
  meta: MetaContent;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  services: ServiceItem[];
  exploreDivision: string;
  processEyebrow: string;
  processTitle: string;
  process: ProcessStep[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaAccent: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const services: Localized<ServicesContent> = {
  en: {
    meta: {
      title: 'Services & Infrastructure',
      description:
        'Commercial construction, luxury homes, property management, and registry-grade documentation — the full delivery stack for premium real estate projects.',
      keywords: 'commercial building construction dehradun, luxury villa builders, real estate consultants'
    },
    eyebrow: 'service portfolio',
    title: 'Integrated Services,',
    titleAccent: 'Turnkey Capabilities.',
    intro: 'From civil structural construction to premium registry transfers, our specialized divisions deliver secure real estate development and asset management.',
    services: [
      {
        title: 'Commercial Construction',
        description: 'State-of-the-art office buildings, retail spaces, and industrial facilities designed for modern business needs.',
        features: ['Office Buildings', 'Retail Centers', 'Industrial Facilities', 'Mixed-Use Developments'],
      },
      {
        title: 'Residential Development',
        description: 'Luxury homes and residential communities that combine comfort, style, and sustainability.',
        features: ['Custom Homes', 'Residential Communities', 'Luxury Condominiums', 'Affordable Housing'],
      },
      {
        title: 'Real Estate Investment',
        description: 'Strategic investment opportunities and portfolio management for maximum returns.',
        features: ['Investment Analysis', 'Portfolio Management', 'Market Research', 'ROI Optimization'],
      },
      {
        title: 'Property Management',
        description: 'Comprehensive property management services to maximize asset value and tenant satisfaction.',
        features: ['Tenant Relations', 'Maintenance Services', 'Financial Management', 'Asset Optimization'],
      },
      {
        title: 'Project Consulting',
        description: 'Expert guidance through every phase of your construction or real estate project.',
        features: ['Feasibility Studies', 'Project Planning', 'Cost Estimation', 'Risk Assessment'],
      },
      {
        title: 'Quality Assurance',
        description: 'Rigorous quality control and compliance ensuring the highest standards in every project.',
        features: ['Quality Control', 'Safety Compliance', 'Code Compliance', 'Performance Testing'],
      },
    ],
    exploreDivision: 'Explore Division',
    processEyebrow: 'methodology',
    processTitle: 'The Execution Framework',
    process: [
      { step: '01', title: 'Initial Consultation', description: 'We meet to understand your vision, requirements, and goals for the project.' },
      { step: '02', title: 'Planning & Design', description: 'Our experts develop comprehensive plans and designs tailored to your needs.' },
      { step: '03', title: 'Execution', description: 'Professional implementation with regular updates and quality checkpoints.' },
      { step: '04', title: 'Delivery & Support', description: 'Project completion with ongoing support and maintenance services.' },
    ],
    ctaEyebrow: 'secure connection',
    ctaTitle: 'Ready to Connect',
    ctaAccent: 'With Us?',
    ctaBody: 'Contact us today to discuss your project requirements and discover how we can help bring your vision to life.',
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn About Apex',
  },
  es: {
    meta: {
      title: 'Servicios e Infraestructura',
      description:
        'Construcción comercial, viviendas de lujo, gestión de propiedades y documentación registral: la cadena completa de entrega para proyectos inmobiliarios premium.',
      keywords: 'construcción de edificios comerciales dehradun, constructores de villas de lujo, consultores inmobiliarios'
    },
    eyebrow: 'portafolio de servicios',
    title: 'Capacidades Arquitectónicas',
    titleAccent: 'Integrales.',
    intro: 'Desde la construcción civil estructural hasta transferencias registrales premium, nuestras divisiones especializadas entregan desarrollo inmobiliario y gestión de activos segura.',
    services: [
      {
        title: 'Construcción Comercial',
        description: 'Edificios de oficinas de última generación, espacios comerciales e instalaciones industriales diseñados para las necesidades empresarial actuales.',
        features: ['Edificios de Oficinas', 'Centros Comerciales', 'Instalaciones Industriales', 'Desarrollos de Uso Mixto'],
      },
      {
        title: 'Desarrollo Residencial',
        description: 'Viviendas de lujo y comunidades residenciales que combinan comodidad, estilo y sostenibilidad.',
        features: ['Viviendas a Medida', 'Comunidades Residenciales', 'Condominios de Lujo', 'Vivienda Asequible'],
      },
      {
        title: 'Inversión Inmobiliaria',
        description: 'Oportunidades de inversión estratégica y gestión de portafolio para maximizar los retornos.',
        features: ['Análisis de Inversión', 'Gestión de Portafolio', 'Investigación de Mercado', 'Optimización del ROI'],
      },
      {
        title: 'Gestión de Propiedades',
        description: 'Servicios integrales de gestión de propiedades para maximizar el valor del activo y la satisfacción del inquilino.',
        features: ['Relación con Inquilinos', 'Servicios de Mantenimiento', 'Gestión Financiera', 'Optimización de Activos'],
      },
      {
        title: 'Consultoría de Proyectos',
        description: 'Asesoría experta en cada fase de su proyecto de construcción o inmobiliario.',
        features: ['Estudios de Viabilidad', 'Planificación de Proyectos', 'Estimación de Costos', 'Evaluación de Riesgos'],
      },
      {
        title: 'Aseguramiento de Calidad',
        description: 'Control de calidad riguroso y cumplimiento que garantiza los estándares más altos en cada proyecto.',
        features: ['Control de Calidad', 'Cumplimiento de Seguridad', 'Cumplimiento Normativo', 'Pruebas de Rendimiento'],
      },
    ],
    exploreDivision: 'Explorar División',
    processEyebrow: 'metodología',
    processTitle: 'El Marco de Ejecución',
    process: [
      { step: '01', title: 'Consultoría Inicial', description: 'Nos reunimos para entender su visión, requisitos y objetivos del proyecto.' },
      { step: '02', title: 'Planificación y Diseño', description: 'Nuestros expertos desarrollan planes y diseños completos adaptados a sus necesidades.' },
      { step: '03', title: 'Ejecución', description: 'Implementación profesional con actualizaciones regulares y puntos de control de calidad.' },
      { step: '04', title: 'Entrega y Soporte', description: 'Finalización del proyecto con soporte continuo y servicios de mantenimiento.' },
    ],
    ctaEyebrow: 'conexión segura',
    ctaTitle: 'Listo para Conectar',
    ctaAccent: 'Con Nosotros?',
    ctaBody: 'Contáctenos hoy para discutir los requisitos de su proyecto y descubrir cómo podemos ayudar a hacer realidad su visión.',
    ctaPrimary: 'Contáctenos',
    ctaSecondary: 'Conozca Apex',
  },
  de: {
    meta: {
      title: 'Leistungen & Infrastruktur',
      description:
        'Gewerbebau, Luxuswohnhäuser, Immobilienverwaltung und grundbuchtaugliche Dokumentation — die komplette Lieferkette für Premium-Bauvorhaben.',
      keywords: 'gewerbebau dehradun, luxusvilla bauunternehmen, immobilienberatung'
    },
    eyebrow: 'leistungsportfolio',
    title: 'Umfassende Architektur',
    titleAccent: 'Kompetenzen.',
    intro: 'Von der strukturellen Tiefbauplanung bis zur hochwertigen Grundbuchumschreibung liefern unsere spezialisierten Divisionen sichere Immobilienentwicklung und Asset-Management.',
    services: [
      {
        title: 'Gewerbebau',
        description: 'State-of-the-art Bürogebäude, Handelsflächen und Industriefacilities, konzipiert für moderne Geschäftsanforderungen.',
        features: ['Bürogebäude', 'Einkaufszentren', 'Industriefacilities', 'Mischgebietsentwicklungen'],
      },
      {
        title: 'Wohnentwicklung',
        description: 'Luxusresidenzen und Wohngemeinschaften, die Komfort, Stil und Nachhaltigkeit vereinen.',
        features: ['Maßgebaute Häuser', 'Wohngemeinschaften', 'Luxuswohnungen', 'Bezahlbarer Wohnraum'],
      },
      {
        title: 'Immobilieninvestment',
        description: 'Strategische Investmentchancen und Portfoliomanagement für maximale Rendite.',
        features: ['Investmentanalyse', 'Portfoliomanagement', 'Marktforschung', 'ROI-Optimierung'],
      },
      {
        title: 'Objektverwaltung',
        description: 'Ganzheitliche Verwaltungsleistungen zur Maximierung des Asset-Werts und der Mieterzufriedenheit.',
        features: ['Mieterbetreuung', 'Wartungsservices', 'Finanzmanagement', 'Asset-Optimierung'],
      },
      {
        title: 'Projektberatung',
        description: 'Expertenbegleitung in jeder Phase Ihres Bau- oder Immobilienprojekts.',
        features: ['Machbarkeitsstudien', 'Projektplanung', 'Kostenschätzung', 'Risikoanalyse'],
      },
      {
        title: 'Qualitätssicherung',
        description: 'Strenges Qualitätsmanagement und Konformität für höchste Standards in jedem Projekt.',
        features: ['Qualitätskontrolle', 'Sicherheitskonformität', 'Normenkonformität', 'Leistungstests'],
      },
    ],
    exploreDivision: 'Division Entdecken',
    processEyebrow: 'methodik',
    processTitle: 'Der Ausführungsrahmen',
    process: [
      { step: '01', title: 'Erstberatung', description: 'Wir lernen Ihre Vision, Anforderungen und Ziele für das Projekt kennen.' },
      { step: '02', title: 'Planung & Entwurf', description: 'Unsere Experten erarbeiten umfassende Pläne und Entwürfe, abgestimmt auf Ihre Bedürfnisse.' },
      { step: '03', title: 'Ausführung', description: 'Professionelle Umsetzung mit regelmäßigen Updates und Qualitätskontrollen.' },
      { step: '04', title: 'Übergabe & Support', description: 'Projektabschluss mit laufender Betreuung und Wartungsservices.' },
    ],
    ctaEyebrow: 'sichere verbindung',
    ctaTitle: 'Bereit für die Verbindung',
    ctaAccent: 'Mit Uns?',
    ctaBody: 'Kontaktieren Sie uns heute, um Ihre Projektanforderungen zu besprechen und zu erfahren, wie wir Ihre Vision Wirklichkeit werden lassen.',
    ctaPrimary: 'Kontakt Aufnehmen',
    ctaSecondary: 'Apex Kennenlernen',
  },
};
