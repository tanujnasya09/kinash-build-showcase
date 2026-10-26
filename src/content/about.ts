import type { Localized, MetaContent, StatItem } from './types';

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutMember {
  name: string;
  position: string;
  bio: string;
}

export interface AboutContent {
  meta: MetaContent;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  heritageEyebrow: string;
  heritageTitle: string;
  heritageP1: string;
  heritageP2: string;
  heritageP3: string;
  valuesEyebrow: string;
  valuesTitle: string;
  values: AboutValue[];
  teamEyebrow: string;
  teamTitle: string;
  team: AboutMember[];
  stats: StatItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaAccent: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaFooter: string;
}

export const about: Localized<AboutContent> = {
  en: {
    meta: {
      title: 'Our Story & Vision',
      description:
        'The heritage, leadership, and operating standards of Apex Luxury — a Dehradun firm specialising in plot demarcation, civil construction, and secure registry transfers.',
      keywords: 'apex luxury, construction company dehradun, real estate history, leadership team'
    },
    eyebrow: 'corporate profile',
    title: 'Built on Vision,',
    titleAccent: 'Driven by Craft.',
    intro: 'Established in Dehradun, Apex Luxury specializes in demarcating high-value plots and constructing state-of-the-art civil infrastructure under verified ISO compliance workflows.',
    heritageEyebrow: 'our heritage',
    heritageTitle: 'The History of Apex',
    heritageP1: 'Founded with a clear vision: to transform the land registry, construction mapping, and real estate development model in Uttarakhand through absolute compliance, legal transparency, and engineering quality.',
    heritageP2: 'What began as a specialized engineering survey desk has expanded into a premier multi-division contracting firm, delivering high-precision layout demarcations and structural concrete works across private and public sectors.',
    heritageP3: 'Today, we utilize electronic total station surveying and soil mechanics studies to ensure that every asset in the Apex Luxury portfolio represents a secure equity path. Our legal partners review each registry title, ensuring zero-risk ownership.',
    valuesEyebrow: 'operating code',
    valuesTitle: 'The Principles Behind Our Standards',
    values: [
      { title: 'Excellence', description: 'We pursue excellence in every project, ensuring the highest standards of quality and craftsmanship.' },
      { title: 'Integrity', description: 'Our commitment to transparency and ethical business practices builds lasting trust with our clients.' },
      { title: 'Collaboration', description: 'We believe in the power of teamwork and collaborative partnerships to achieve outstanding results.' },
      { title: 'Innovation', description: 'We embrace cutting-edge technologies and innovative approaches to deliver superior solutions.' },
    ],
    teamEyebrow: 'executive council',
    teamTitle: 'Governance & Leadership',
    team: [
      { name: 'Michael Apex', position: 'Founder & CEO', bio: 'With over 20 years in construction and real estate, Michael leads our vision of building excellence.' },
      { name: 'Sarah Chen', position: 'VP of Construction', bio: 'Licensed architect with expertise in sustainable design and large-scale commercial projects.' },
      { name: 'David Rodriguez', position: 'VP of Real Estate', bio: 'Real estate investment specialist with a proven track record in property development and management.' },
    ],
    stats: [
      { value: '15+', label: 'Years of Excellence' },
      { value: '500+', label: 'Projects Completed' },
      { amount: 2000000000, suffix: '+', label: 'Equity Value Delivered' },
      { value: '98%', label: 'Client Satisfaction' },
    ],
    ctaEyebrow: 'secure connection',
    ctaTitle: 'Ready to Build Your',
    ctaAccent: 'Legacy?',
    ctaBody: 'Get in touch with a senior portfolio advisor or request technical survey records for active registries.',
    ctaPrimary: 'Connect with advisor',
    ctaSecondary: 'Browse properties catalog',
    ctaFooter: 'Secured End-to-End Registry Pipeline',
  },
  es: {
    meta: {
      title: 'Nuestra Historia y Visión',
      description:
        'El legado, el equipo directivo y los estándares de operación de Apex Luxury: trazados de parcelas, construcción civil y transferencias registrales seguras.',
      keywords: 'apex luxury, empresa constructora dehradun, historia inmobiliaria, equipo directivo'
    },
    eyebrow: 'perfil corporativo',
    title: 'Construido con Visión,',
    titleAccent: 'Guiado por la Maestría.',
    intro: 'Establecida en Dehradun, Apex Luxury se especializa en el trazado de terrenos de alto valor y en la construcción de infraestructura civil de última generación bajo flujos de cumplimiento ISO verificados.',
    heritageEyebrow: 'nuestro legado',
    heritageTitle: 'La Historia de Apex',
    heritageP1: 'Fundada con una visión clara: transformar el modelo de registro de tierras, cartografía de construcción y desarrollo inmobiliario en Uttarakhand mediante cumplimiento absoluto, transparencia legal y calidad de ingeniería.',
    heritageP2: 'Lo que comenzó como una mesa especializada de topografía de ingeniería se ha convertido en una firma líder de contratación multisectorial, entregando trazados de alta precisión y obras de hormigón estructural en los sectores privado y público.',
    heritageP3: 'Hoy utilizamos levantamientos con estación total electrónica y estudios de mecánica de suelos para garantizar que cada activo del portafolio Apex Luxury represente una vía segura de valor. Nuestros socios legales revisan cada título registral, garantizando propiedad sin riesgo.',
    valuesEyebrow: 'código operativo',
    valuesTitle: 'Los Principios Tras Nuestros Estándares',
    values: [
      { title: 'Excelencia', description: 'Buscamos la excelencia en cada proyecto, asegurando los más altos estándares de calidad y artesanía.' },
      { title: 'Integridad', description: 'Nuestro compromiso con la transparencia y las prácticas éticas genera confianza duradera con nuestros clientes.' },
      { title: 'Colaboración', description: 'Creemos en el poder del trabajo en equipo y las alianzas colaborativas para lograr resultados extraordinarios.' },
      { title: 'Innovación', description: 'Abrigamos tecnologías de vanguardia y enfoques innovadores para ofrecer soluciones superiores.' },
    ],
    teamEyebrow: 'consejo ejecutivo',
    teamTitle: 'Gobernanza y Liderazgo',
    team: [
      { name: 'Michael Apex', position: 'Fundador y CEO', bio: 'Con más de 20 años en construcción y immobilier, Michael lidera nuestra visión de construir excelencia.' },
      { name: 'Sarah Chen', position: 'VP de Construcción', bio: 'Arquitecta licenciada con experiencia en diseño sostenible y proyectos comerciales de gran envergadura.' },
      { name: 'David Rodriguez', position: 'VP de Inmuebles', bio: 'Especialista en inversión inmobiliaria con un historial probado en desarrollo y gestión de propiedades.' },
    ],
    stats: [
      { value: '15+', label: 'Años de Excelencia' },
      { value: '500+', label: 'Proyectos Completados' },
      { amount: 2000000000, suffix: '+', label: 'Valor Patrimonial Entregado' },
      { value: '98%', label: 'Satisfacción del Cliente' },
    ],
    ctaEyebrow: 'conexión segura',
    ctaTitle: 'Listo para Construir Su',
    ctaAccent: 'Legado?',
    ctaBody: 'Contacte con un asesor senior de portafolio o solicite los registros técnicos de levantamiento para los registros activos.',
    ctaPrimary: 'Conectar con asesor',
    ctaSecondary: 'Explorar catálogo de propiedades',
    ctaFooter: 'Pipeline Registral Seguro de Extremo a Extremo',
  },
  de: {
    meta: {
      title: 'Unsere Geschichte & Vision',
      description:
        'Erbe, Führungsteam und Arbeitsstandards von Apex Luxury: Parzellenabsteckung, Tiefbau und sichere Grundbuchübertragungen aus Dehradun.',
      keywords: 'apex luxury, bauunternehmen dehradun, immobilien geschichte, führungsteam'
    },
    eyebrow: 'unternehmensprofil',
    title: 'Erbaut auf Vision,',
    titleAccent: 'Geleitet von Handwerk.',
    intro: 'Mit Sitz in Dehradun spezialisiert sich Apex Luxury auf die Parzellierung hochwertiger Grundstücke sowie den Bau modernster Tiefbauinfrastruktur — unter verifizierten ISO-konformen Abläufen.',
    heritageEyebrow: 'unsere geschichte',
    heritageTitle: 'Die Geschichte von Apex',
    heritageP1: 'Gegründet mit einer klaren Vision: das Grundbuch-, Vermessungs- und Immobilienentwicklungsmodell in Uttarakhand durch absolute Konformität, rechtliche Transparanz und Ingenieursqualität zu verändern.',
    heritageP2: 'Was als spezialisierter Vermessungstisch begann, ist heute ein führender Contracting-Konzern mit mehreren Divisionen — von hochpräzisen Parzellierungen bis zu strukturellen Betonarbeiten im privaten und öffentlichen Sektor.',
    heritageP3: 'Heute nutzen wir elektronische Totalstations-Vermessung und Bodenmechanik-Studien, damit jedes Asset im Apex-Luxury-Portfolio einen sicheren Wertpfad darstellt. Unsere Rechtspartner prüfen jeden Grundbucheintrag und garantieren so risikofreies Eigentum.',
    valuesEyebrow: 'arbeitsweise',
    valuesTitle: 'Die Prinzipien Hinter Unseren Standards',
    values: [
      { title: 'Exzellenz', description: 'Wir streben in jedem Projekt nach Höchstleistung und sichern höchste Qualitäts- und Handwerksstandards.' },
      { title: 'Integrität', description: 'Unser Engagement für Transparenz und ethische Geschäftspraktiken schafft dauerhaftes Vertrauen bei unseren Kunden.' },
      { title: 'Zusammenarbeit', description: 'Wir glauben an die Kraft der Teamarbeit und partnerschaftlicher Zusammenarbeit für herausragende Ergebnisse.' },
      { title: 'Innovation', description: 'Wir setzen auf Spitzentechnologie und innovative Ansätze, um überlegene Lösungen zu liefern.' },
    ],
    teamEyebrow: 'exekutivrat',
    teamTitle: 'Governance & Führung',
    team: [
      { name: 'Michael Apex', position: 'Gründer & CEO', bio: 'Mit über 20 Jahren Erfahrung in Bau und Immobilien führt Michael unsere Vision des Exzellenz-Baus.' },
      { name: 'Sarah Chen', position: 'VP Construction', bio: 'Architektin mit Expertise in nachhaltigem Design und großflächigen Gewerbeprojekten.' },
      { name: 'David Rodriguez', position: 'VP Real Estate', bio: 'Immobilien-Investment-Spezialist mit nachgewiesener Erfolgsbilanz in Entwicklung und Verwaltung.' },
    ],
    stats: [
      { value: '15+', label: 'Jahre Exzellenz' },
      { value: '500+', label: 'Abgeschlossene Projekte' },
      { amount: 2000000000, suffix: '+', label: 'Übergebener Sachwert' },
      { value: '98%', label: 'Kundenzufriedenheit' },
    ],
    ctaEyebrow: 'sichere verbindung',
    ctaTitle: 'Bereit, Ihr',
    ctaAccent: 'Legacy zu Bauen?',
    ctaBody: 'Sprechen Sie mit einem erfahrenen Portfolio-Berater oder fordern Sie technische Vermessungsprotokolle aktiver Grundbücher an.',
    ctaPrimary: 'Berater kontaktieren',
    ctaSecondary: 'Objektkatalog durchsuchen',
    ctaFooter: 'Durchgängig Gesicherte Grundbuch-Pipeline',
  },
};
