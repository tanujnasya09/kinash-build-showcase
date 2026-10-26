export interface ServiceItem {
  id: string;
  iconName: 'Building2' | 'Home' | 'MapPin' | 'Layers' | 'Wrench' | 'ShieldCheck' | 'CheckCircle';
  title: {
    en: string;
    es: string;
    de: string;
  };
  tag: {
    en: string;
    es: string;
    de: string;
  };
  description: {
    en: string;
    es: string;
    de: string;
  };
  bullets: {
    en: string[];
    es: string[];
    de: string[];
  };
  link: string;
  image: string;
  isHomeDivision: boolean;
  isConstructionDivision: boolean;
  isCoreOffering: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'civil-construction',
    iconName: 'Building2',
    tag: {
      en: 'DIVISION 01 // EPC CONTRACTING',
      es: 'DIVISIÓN 01 // CONTRATACIÓN EPC',
      de: 'DIVISION 01 // GENERALBAU',
    },
    title: {
      en: 'Civil & Commercial Contracting',
      es: 'Contratación Civil y Comercial',
      de: 'Hoch- und Tiefbauunternehmen',
    },
    description: {
      en: 'Institutional complexes, commercial centres, and high-performance structural systems engineered to the highest seismic standards.',
      es: 'Complejos institucionales, centros comerciales y estructuras de alto rendimiento diseñadas según los estándares sísmicos más avanzados.',
      de: 'Komplexe Gewerbebauten und Hochleistungs-Tragwerke, ausgelegt nach modernsten Erdbebenschutz-Richtlinien.',
    },
    bullets: {
      en: ['100% Seismic Zone IV Compliance', 'Turnkey EPC Project Delivery', 'ISO 9001:2015 Accredited Quality'],
      es: ['100% Cumplimiento Zona Sísmica IV', 'Entrega de Proyecto EPC Llave en Mano', 'Calidad Acreditada ISO 9001:2015'],
      de: ['100% Erdbebenzonen-Konformität', 'Schlüsselfertige EPC-Projektabwicklung', 'Zertifizierte ISO 9001:2015 Qualität'],
    },
    link: '/construction',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80',
    isHomeDivision: true,
    isConstructionDivision: true,
    isCoreOffering: true,
  },
  {
    id: 'residential-villas',
    iconName: 'Home',
    tag: {
      en: 'DIVISION 02 // BESPOKE RESIDENCES',
      es: 'DIVISIÓN 02 // RESIDENCIAS DE AUTOR',
      de: 'DIVISION 02 // LUXUSWOHNSITZE',
    },
    title: {
      en: 'Residential Contracting & Villas',
      es: 'Construcción Residencial y Villas',
      de: 'Wohnungsbau & Villenbau',
    },
    description: {
      en: 'Bespoke hillside villas, multi-family luxury residences, and architectural estates crafted with uncompromising material precision.',
      es: 'Villas de ladera personalizadas, residencias multifamiliares de lujo y fincas arquitectónicas construidas con precisión sin concesiones.',
      de: 'Maßgeschneiderte Hangvillen, exklusive Wohnanlagen und architektonische Meisterwerke in kompromissloser Präzision.',
    },
    bullets: {
      en: ['Architectural Blueprinting & Execution', 'Grade-A Thermal & Acoustic Insulation', 'Bespoke Landscape Integration'],
      es: ['Planos Arquitectónicos y Ejecución', 'Aislamiento Térmico y Acústico Grado A', 'Integración Paisajística a Medida'],
      de: ['Architekturplanung & Bauausführung', 'Erstklassige Wärme- und Schalldämmung', 'Individuelle Landschaftsintegration'],
    },
    link: '/construction',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    isHomeDivision: true,
    isConstructionDivision: true,
    isCoreOffering: true,
  },
  {
    id: 'land-demarcation',
    iconName: 'MapPin',
    tag: {
      en: 'DIVISION 03 // MASTER LAYOUTS',
      es: 'DIVISIÓN 03 // TRAZADOS Y PLANIFICACIÓN',
      de: 'DIVISION 03 // AREALENTWICKLUNG',
    },
    title: {
      en: 'Real Estate & Plot Demarcation',
      es: 'Bienes Raíces y Demarcación de Parcelas',
      de: 'Grundstücke & Parzellierung',
    },
    description: {
      en: 'High-precision cadastral demarcation, verified legal plot transfers, and prime Himalayan foothill residential layouts.',
      es: 'Demarcación catastral de alta precisión, transferencias registrales verificadas y parcelaciones de primer nivel.',
      de: 'Präzise Katastervermessung, rechtssichere Grundbucheinträge und erstklassige Baugrundstücke im Vorgebirge.',
    },
    bullets: {
      en: ['Electronic Total Station Surveying', '100% Freehold Clear Title Guarantee', 'Immediate Mutation & Registry Pipeline'],
      es: ['Levantamiento con Estación Total Electrónica', 'Garantía 100% de Título Limpio y Propiedad', 'Trámite Inmediato de Registro'],
      de: ['Elektronische Tachymeter-Vermessung', '100% rechtssicherer Eigentumstitel', 'Sofortige Grundbucheintragung'],
    },
    link: '/real-estate',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    isHomeDivision: true,
    isConstructionDivision: false,
    isCoreOffering: true,
  },
  {
    id: 'infrastructure-development',
    iconName: 'Layers',
    tag: {
      en: 'CIVIL WORKS // INFRASTRUCTURE',
      es: 'OBRAS CIVILES // INFRAESTRUCTURA',
      de: 'INFRASTRUKTUR // ERSCHLIESSUNG',
    },
    title: {
      en: 'Infrastructure & Master Planning',
      es: 'Infraestructura y Planificación Maestra',
      de: 'Infrastruktur & Arealerschließung',
    },
    description: {
      en: 'Wide paved access corridors, stormwater networks, dedicated power distribution transformers, and subterranean water connections.',
      es: 'Corredores viales pavimentados amplios, redes de pluviales, transformadores de energía y canalizaciones subterráneas.',
      de: 'Breite Zufahrtsstraßen, Regenwassernetze, eigene Transformatoren und unterirdische Wasserleitungen.',
    },
    bullets: {
      en: ['30ft - 50ft Paved Internal Roads', 'Dedicated Substation Connections', 'Subterranean Utility Conduit Layout'],
      es: ['Vías Pavimentadas de 30 a 50 Pies', 'Conexiones a Subestaciones Propias', 'Red de Canalizaciones Subterráneas'],
      de: ['9m - 15m breite Asphaltstraßen', 'Eigene Transformatoranschlüsse', 'Unterirdische Versorgungsleitungen'],
    },
    link: '/construction',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80',
    isHomeDivision: false,
    isConstructionDivision: true,
    isCoreOffering: true,
  },
  {
    id: 'renovation-retrofitting',
    iconName: 'Wrench',
    tag: {
      en: 'STRUCTURAL RESTORATION',
      es: 'RESTAURACIÓN ESTRUCTURAL',
      de: 'TRAGWERKSANIERUNG',
    },
    title: {
      en: 'Renovation & Retrofitting',
      es: 'Renovación y Readecuación Estructural',
      de: 'Modernisierung & Sanierung',
    },
    description: {
      en: 'Seismic retrofitting, architectural restoration, and structural longevity enhancements for historical and existing properties.',
      es: 'Refuerzo sísmico, restauración arquitectónica y prolongación de vida útil estructural en fincas existentes.',
      de: 'Erdbeben-Nachrüstung, denkmalgerechte Sanierung und strukturelle Wertsteigerung bestehender Gebäude.',
    },
    bullets: {
      en: ['Carbon Fiber & Steel Jacketing', 'Complete MEP & HVAC Overhaul', 'Facade Modernization & Waterproofing'],
      es: ['Encamisado de Acero y Fibra de Carbono', 'Revisión Completa de Instalaciones MEP', 'Modernización de Fachada e Impermeabilización'],
      de: ['Carbonfaser- und Stahlummantelung', 'Komplette TGA- und HLK-Erneuerung', 'Fassadenmodernisierung & Abdichtung'],
    },
    link: '/construction',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80',
    isHomeDivision: false,
    isConstructionDivision: true,
    isCoreOffering: false,
  },
  {
    id: 'legal-title-advisory',
    iconName: 'ShieldCheck',
    tag: {
      en: 'LEGAL PROTOCOLS // MUTATION',
      es: 'PROTOCOLOS LEGALES // REGISTRO',
      de: 'RECHTSSICHERHEIT // GRUNDBUCH',
    },
    title: {
      en: 'Legal Title & Registry Transfer',
      es: 'Asesoría de Título y Registro',
      de: 'Grundbuchübertragung & Rechtstitel',
    },
    description: {
      en: 'Exhaustive title deed due diligence, government registry transfer liaison, and zero-encumbrance legal certifications.',
      es: 'Auditoría exhaustiva de escrituras, enlace registral oficial y certificados de libertad de gravamen.',
      de: 'Umfassende Grundbuchprüfung, Behördenabwicklung und unbelastete Eigentumszertifikate.',
    },
    bullets: {
      en: ['30-Year Chain of Title Verification', 'Direct Sub-Registrar Liaison', 'Zero Legal Encumbrance Guarantee'],
      es: ['Verificación de Títulos de 30 Años', 'Gestión Directa con el Sub-Registrador', 'Garantía Cero Gravámenes Legales'],
      de: ['30-jährige Eigentumshistorie-Prüfung', 'Direkte Grundbuchamt-Koordination', 'Garantierte Lastenfreiheit'],
    },
    link: '/about',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    isHomeDivision: false,
    isConstructionDivision: false,
    isCoreOffering: true,
  },
  {
    id: 'iso-audits',
    iconName: 'CheckCircle',
    tag: {
      en: 'QUALITY ASSURANCE // TESTING',
      es: 'GARANTÍA DE CALIDAD // ENSAYOS',
      de: 'QUALITÄTSSICHERUNG // PRÜFUNGEN',
    },
    title: {
      en: 'ISO Quality Audits & Compliance',
      es: 'Auditorías de Calidad y Normativa ISO',
      de: 'ISO-Qualitätsaudits & Prüfungen',
    },
    description: {
      en: 'Continuous third-party concrete cube compression tests, soil mechanics validation, and verified engineering compliance reports.',
      es: 'Ensayos continuos de compresión de hormigón, validación mecánica del suelo e informes de cumplimiento verificado.',
      de: 'Kontinuierliche Druckfestigkeitsprüfungen, Baugrundgutachten und akkreditierte Ingenieurberichte.',
    },
    bullets: {
      en: ['Compressive Strength Laboratory Tests', 'Soil Mechanics & Bearing Capacity', 'Weekly NABL Accredited Reports'],
      es: ['Ensayos de Laboratorio de Resistencia', 'Mecánica de Suelos y Capacidad Portante', 'Informes Semanales Acreditados NABL'],
      de: ['Labor-Druckfestigkeitstests', 'Bodenmechanik & Tragfähigkeit', 'Wöchentliche akkreditierte Berichte'],
    },
    link: '/about',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    isHomeDivision: false,
    isConstructionDivision: false,
    isCoreOffering: true,
  },
];

export const getHomeDivisions = () => servicesData.filter((s) => s.isHomeDivision);
export const getConstructionDivisions = () => servicesData.filter((s) => s.isConstructionDivision);
export const getCoreOfferings = () => servicesData.filter((s) => s.isCoreOffering);

export default servicesData;
