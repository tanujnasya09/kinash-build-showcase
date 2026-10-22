import type { Localized, MetaContent } from './types';

export interface Capability {
  title: string;
  description: string;
  projects: string[];
}

export interface FeaturedProject {
  title: string;
  category: string;
  size: string;
  completion: string;
  description: string;
}

export interface Advantage {
  title: string;
  description: string;
}

export interface ConstructionContent {
  meta: MetaContent;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  capabilitiesEyebrow: string;
  capabilitiesTitle: string;
  capabilities: Capability[];
  projectsEyebrow: string;
  projectsTitle: string;
  projects: FeaturedProject[];
  projectsCompletedPrefix: string;
  advantagesEyebrow: string;
  advantagesTitle: string;
  advantages: Advantage[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaAccent: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const construction: Localized<ConstructionContent> = {
  en: {
    meta: {
      title: 'Luxury Construction & Engineering',
      description:
        'Commercial complexes, high-end residential estates, and civil infrastructure planning — delivered with surveying-grade precision and verified build quality.',
      keywords: 'luxury builders dehradun, general contractors, site engineers uttarakhand'
    },
    eyebrow: 'civil contracting',
    title: 'Structural Integrity,',
    titleAccent: 'Architectural Elegance.',
    intro: 'We map, engineer, and build high-performance structural systems matching state-of-the-art seismic design guidelines and luxury standards.',
    heroCtaPrimary: 'Start Your Project',
    heroCtaSecondary: 'View Portfolio',
    capabilitiesEyebrow: 'capabilities',
    capabilitiesTitle: 'Engineering Divisions',
    capabilities: [
      {
        title: 'Commercial Construction',
        description: 'Office buildings, retail centers, and industrial facilities built to the highest standards.',
        projects: ['Corporate Headquarters', 'Shopping Centers', 'Manufacturing Facilities', 'Healthcare Centers'],
      },
      {
        title: 'Residential Development',
        description: 'Custom homes and residential communities that set new standards for quality living.',
        projects: ['Luxury Single-Family Homes', 'Condominiums', 'Townhouse Communities', 'Senior Living'],
      },
      {
        title: 'Infrastructure Projects',
        description: 'Large-scale infrastructure development including roads, utilities, and public facilities.',
        projects: ['Transportation Systems', 'Utility Networks', 'Public Buildings', 'Sports Facilities'],
      },
      {
        title: 'Renovation & Restoration',
        description: 'Breathing new life into existing structures with modern upgrades and historic preservation.',
        projects: ['Historic Renovations', 'Commercial Upgrades', 'Adaptive Reuse', 'Sustainability Retrofits'],
      },
    ],
    projectsEyebrow: 'portfolio',
    projectsTitle: 'Landmark Commissions',
    projects: [
      {
        title: 'Metropolitan Business Center',
        category: 'Commercial',
        size: '2.5M sq ft',
        completion: '2024',
        description: 'A state-of-the-art office complex featuring sustainable design and smart building technology.',
      },
      {
        title: 'Riverside Luxury Residences',
        category: 'Residential',
        size: '150 units',
        completion: '2023',
        description: 'Premium waterfront condominiums with panoramic views and luxury amenities.',
      },
      {
        title: 'Innovation Campus',
        category: 'Mixed-Use',
        size: '1.8M sq ft',
        completion: '2024',
        description: 'A cutting-edge research and development facility with integrated retail and dining.',
      },
    ],
    projectsCompletedPrefix: 'Completed',
    advantagesEyebrow: 'why apex',
    advantagesTitle: 'The Engineering Edge',
    advantages: [
      { title: 'Quality Assurance', description: 'Rigorous quality control at every stage ensures exceptional results.' },
      { title: 'On-Time Delivery', description: 'Proven track record of completing projects on schedule and within budget.' },
      { title: 'Cost Efficiency', description: 'Competitive pricing without compromising on quality or safety standards.' },
      { title: 'Expert Team', description: 'Experienced professionals with deep expertise in construction management.' },
    ],
    ctaEyebrow: 'secure registry',
    ctaTitle: 'Launch Your Civil',
    ctaAccent: 'Endeavor.',
    ctaBody: 'Schedule a session with our site planning engineers to draft structural blueprints and schedule soil-mechanics studies.',
    ctaPrimary: 'Start Your Project',
    ctaSecondary: 'Schedule Consultation',
  },
  es: {
    meta: {
      title: 'Construcción y Ingeniería de Lujo',
      description:
        'Complejos comerciales, estates residenciales de alta gama y planificación de infraestructura civil, ejecutados con precisión topográfica y calidad verificada.',
      keywords: 'constructores de lujo dehradun, contratistas generales, ingenieros uttarakhand'
    },
    eyebrow: 'contratación civil',
    title: 'Integridad Estructural,',
    titleAccent: 'Elegancia Arquitectónica.',
    intro: 'Cartografiamos, ingenieramos y construimos sistemas estructurales de alto rendimiento que cumplen las directrices sísmicas más avanzadas y estándares de lujo.',
    heroCtaPrimary: 'Iniciar Su Proyecto',
    heroCtaSecondary: 'Ver Portafolio',
    capabilitiesEyebrow: 'capacidades',
    capabilitiesTitle: 'Divisiones de Ingeniería',
    capabilities: [
      {
        title: 'Construcción Comercial',
        description: 'Edificios de oficinas, centros comerciales e instalaciones industriales construidos con los estándares más altos.',
        projects: ['Sedes Corporativas', 'Centros Comerciales', 'Instalaciones de Fabricación', 'Centros Sanitarios'],
      },
      {
        title: 'Desarrollo Residencial',
        description: 'Viviendas a medida y comunidades residenciales que establecen nuevos estándares de calidad de vida.',
        projects: ['Vivillas de Lujo', 'Condominios', 'Comunidades de Casas Adosadas', 'Vivienda para Mayores'],
      },
      {
        title: 'Proyectos de Infraestructura',
        description: 'Desarrollo de infraestructura a gran escala, incluyendo carreteras, servicios públicos y equipamiento.',
        projects: ['Sistemas de Transporte', 'Redes de Servicios', 'Edificios Públicos', 'Instalaciones Deportivas'],
      },
      {
        title: 'Renovación y Restauración',
        description: 'Damos nueva vida a estructuras existentes con mejoras modernas y conservación histórica.',
        projects: ['Renovaciones Históricas', 'Modernización Comercial', 'Reutilización Adaptativa', 'Modernización Sustentable'],
      },
    ],
    projectsEyebrow: 'portafolio',
    projectsTitle: 'Encargos Emblemáticos',
    projects: [
      {
        title: 'Metropolitan Business Center',
        category: 'Comercial',
        size: '2,5M pies²',
        completion: '2024',
        description: 'Complejo de oficinas de última generación con diseño sostenible y tecnología de edificios inteligentes.',
      },
      {
        title: 'Riverside Luxury Residences',
        category: 'Residencial',
        size: '150 unidades',
        completion: '2023',
        description: 'Condominios premium frente al agua con vistas panorámicas y amenidades de lujo.',
      },
      {
        title: 'Innovation Campus',
        category: 'Uso Mixto',
        size: '1,8M pies²',
        completion: '2024',
        description: 'Centro de investigación y desarrollo de vanguardia con comercio y restauración integrados.',
      },
    ],
    projectsCompletedPrefix: 'Finalizado',
    advantagesEyebrow: 'por qué apex',
    advantagesTitle: 'La Ventaja de Ingeniería',
    advantages: [
      { title: 'Aseguramiento de Calidad', description: 'Un control de calidad riguroso en cada etapa garantiza resultados excepcionales.' },
      { title: 'Entrega a Tiempo', description: 'Historial probado de completar proyectos en plazo y dentro del presupuesto.' },
      { title: 'Eficiencia de Costes', description: 'Precios competitivos sin comprometer la calidad ni los estándares de seguridad.' },
      { title: 'Equipo Experto', description: 'Profesionales con experiencia y profundo conocimiento en gestión de obras.' },
    ],
    ctaEyebrow: 'registro seguro',
    ctaTitle: 'Lance Su',
    ctaAccent: 'Iniciativa Civil.',
    ctaBody: 'Agende una sesión con nuestros ingenieros de planeación de obra para redactar planos estructurales y programar estudios de mecánica de suelos.',
    ctaPrimary: 'Iniciar Su Proyecto',
    ctaSecondary: 'Agendar Consultoría',
  },
  de: {
    meta: {
      title: 'Luxusbau & Ingenieurskunst',
      description:
        'Gewerbekomplexe, hochwertige Wohnsiedlungen und Tiefbauplanung — ausgeführt mit Vermessungspräzision und geprüfter Bauqualität.',
      keywords: 'luxus bauunternehmen dehradun, generalunternehmer, ingenieure uttarakhand'
    },
    eyebrow: 'tiefbauunternehmung',
    title: 'Strukturelle Integrität,',
    titleAccent: 'Architektonische Eleganz.',
    intro: 'Wir vermessen, konstruieren und bauen leistungsfähige Tragwerke nach modernsten Erdbebennormen und Luxus-Standards.',
    heroCtaPrimary: 'Projekt Starten',
    heroCtaSecondary: 'Portfolio Ansehen',
    capabilitiesEyebrow: 'kompetenzen',
    capabilitiesTitle: 'Ingenieursdivisionen',
    capabilities: [
      {
        title: 'Gewerbebau',
        description: 'Bürogebäude, Einkaufszentren und Industriefacilities auf höchstem Standard.',
        projects: ['Unternehmenszentralen', 'Einkaufszentren', 'Produktionsstätten', 'Gesundheitszentren'],
      },
      {
        title: 'Wohnentwicklung',
        description: 'Maßgebaute Häuser und Wohngemeinschaften, die neue Maßstäbe für Wohnqualität setzen.',
        projects: ['Luxus-Einfamilienhäuser', 'Eigentumswohnungen', 'Reihenhausgemeinschaften', 'Seniorenwohnen'],
      },
      {
        title: 'Infrastrukturprojekte',
        description: 'Großflächige Infrastrukturentwicklung — Straßen, Versorgung und öffentliche Bauten.',
        projects: ['Verkehrssysteme', 'Versorgungsnetze', 'Öffentliche Gebäude', 'Sportanlagen'],
      },
      {
        title: 'Sanierung & Restaurierung',
        description: 'Wir verleihen bestehenden Bauwerken neues Leben — mit modernen Upgrades und Denkmalschutz.',
        projects: ['Historische Sanierungen', 'Gewerbe-Upgrades', 'Umnutzung', 'Nachhaltige Nachrüstung'],
      },
    ],
    projectsEyebrow: 'portfolio',
    projectsTitle: 'Landmark-Projekte',
    projects: [
      {
        title: 'Metropolitan Business Center',
        category: 'Gewerbe',
        size: '2,5 Mio. ft²',
        completion: '2024',
        description: 'Ein hochmoderner Bürokomplex mit nachhaltigem Design und intelligenter Gebäudetechnik.',
      },
      {
        title: 'Riverside Luxury Residences',
        category: 'Wohnen',
        size: '150 Einheiten',
        completion: '2023',
        description: 'Premium-Wasserwohnungen mit Panoramablick und luxuriösen Gemeinschaftseinrichtungen.',
      },
      {
        title: 'Innovation Campus',
        category: 'Mischgebiete',
        size: '1,8 Mio. ft²',
        completion: '2024',
        description: 'Ein wegweisender Forschungs- und Entwicklungscampus mit integriertem Retail und Gastronomie.',
      },
    ],
    projectsCompletedPrefix: 'Fertiggestellt',
    advantagesEyebrow: 'warum apex',
    advantagesTitle: 'Der Ingenieursvorsprung',
    advantages: [
      { title: 'Qualitätssicherung', description: 'Strenges Qualitätsmanagement in jeder Phase sichert außergewöhnliche Ergebnisse.' },
      { title: 'Termintreue', description: 'Nachweisliche Geschichte termingerechter und budgetgerechter Projektabschlüsse.' },
      { title: 'Kosteneffizienz', description: 'Wettbewerbsfähige Preise ohne Abstriche bei Qualität oder Sicherheitsstandard.' },
      { title: 'Expertenteam', description: 'Erfahrene Fachkräfte mit tiefem Know-how im Baumanagement.' },
    ],
    ctaEyebrow: 'sicheres grundbuch',
    ctaTitle: 'Starten Sie Ihr',
    ctaAccent: 'Bauvorhaben.',
    ctaBody: 'Vereinbaren Sie einen Termin mit unseren Bauvorbereitungsingenieuren — für Tragwerkspläne und angesetzte Bodenmechanik-Studien.',
    ctaPrimary: 'Projekt Starten',
    ctaSecondary: 'Beratung Terminieren',
  },
};
