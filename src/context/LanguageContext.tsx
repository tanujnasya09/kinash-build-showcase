import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.construction': 'Construction',
    'nav.realEstate': 'Real Estate',
    'nav.about': 'About',
    'nav.properties': 'Properties',
    'nav.contact': 'Contact Us',
    'nav.admin': 'CMS Admin',
    
    // Hero
    'hero.companyName': 'Kinash Associates & Construction',
    'hero.title1': 'Building Excellence,',
    'hero.title2': 'Creating Landmarks',
    'hero.tagline': 'Delivering premium construction & real estate solutions with unmatched quality, timeless design, and lasting value.',
    'hero.cta.services': 'Explore Services',
    'hero.cta.about': 'About Us',
    'hero.searchPlaceholder': 'Search by property name, location, or area...',
    'hero.searchBtn': 'Search',
    
    // Stats
    'stats.completed': 'Projects Completed',
    'stats.experience': 'Years Experience',
    'stats.awards': 'Industry Awards',
    'stats.delivered': 'Value Delivered',
    
    // Services
    'services.title': 'Our Core Services',
    'services.subtitle': 'From groundbreaking construction projects to strategic real estate solutions, we deliver excellence across every aspect of property development.',
    'services.residential': 'Residential Development',
    'services.residentialDesc': 'Creating exceptional living spaces with innovative design and quality.',
    'services.realEstate': 'Real Estate Services',
    'services.realEstateDesc': 'Comprehensive property solutions from acquisition to management.',
    'services.consulting': 'Project Consulting',
    'services.consultingDesc': 'Expert guidance to ensure your project exceeds expectations.',
    'services.learnMore': 'Learn More',
    
    // Property Listings
    'properties.title': 'Luxury Portfolio',
    'properties.subtitle': 'Discover your dream home with our curated collection of premium properties. Advanced search and visual mapping to explore locations.',
    'properties.filter.status': 'Property Status',
    'properties.filter.all': 'All Properties',
    'properties.filter.available': 'Available',
    'properties.filter.sold': 'Sold',
    'properties.filter.budget': 'Max Budget',
    'properties.filter.clear': 'Clear Filters',
    'properties.grid': 'Grid View',
    'properties.map': 'Map View',
    'properties.split': 'Interactive Split View',
    'properties.contact': 'Contact',
    'properties.viewDetails': 'View Details',
    'properties.noResults': 'No Properties Found',
    'properties.noResultsDesc': 'We couldn\'t find any properties matching your search criteria. Try adjusting your filters or search terms.',
    
    // Property Detail
    'detail.back': 'Back to Properties',
    'detail.tour': 'Property Tour',
    'detail.gallery': 'Property Gallery',
    'detail.viewAll': 'View All Photos',
    'detail.overview': 'Overview',
    'detail.features': 'Features',
    'detail.specs': 'Specifications',
    'detail.descTitle': 'Property Description',
    'detail.type': 'Property Type',
    'detail.possession': 'Possession',
    'detail.facing': 'Facing',
    'detail.sizeOptions': 'Size Options',
    'detail.highlights': 'Key Highlights',
    'detail.callNow': 'Call Now',
    'detail.sendMessage': 'Send Message',
    'detail.schedule': 'Schedule Visit',
    'detail.brochure': 'Download Brochure',
    'detail.floorPlan': 'Floor Plans',
    'detail.3dTour': '3D Virtual Tour',
    'detail.brochureDownload': 'PDF Brochure Ready',
    'detail.brochureText': 'A luxury architectural prospectus will download instantly.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Reach out to our expert team to discuss your next project, investment, or property purchase.',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Your Message',
    'contact.submit': 'Send Secure Enquiry',
    'contact.submitting': 'Integrating with CRM...',
    'contact.success': 'Enquiry Submitted Successfully!',
    'contact.successDesc': 'Your message has been captured. A CRM lead profile has been created, and our luxury property specialist will contact you within 2 hours.',
    
    // Admin / CMS
    'admin.title': 'CMS Management',
    'admin.subtitle': 'Visually add, edit, and delete properties. Sync videos, photos, specs, and YouTube links instantly.',
    'admin.dashboard': 'Dashboard',
    'admin.addListing': 'Add Listing',
    'admin.sanity': 'Sanity Integration Map',
    'admin.notice': 'CMS Visual Editor',
    'admin.noticeDesc': 'This portal is a fully operational client-side CMS that stores listings in local storage for instant feedback. It maps precisely to Sanity CMS schema structures for seamless transition later.'
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.construction': 'Construcción',
    'nav.realEstate': 'Bienes Raíces',
    'nav.about': 'Nosotros',
    'nav.properties': 'Propiedades',
    'nav.contact': 'Contacto',
    'nav.admin': 'Admin CMS',
    
    // Hero
    'hero.companyName': 'Kinash Associates y Construcción',
    'hero.title1': 'Construyendo Excelencia,',
    'hero.title2': 'Creando Hitos',
    'hero.tagline': 'Entregando soluciones premium de construcción y bienes raíces con calidad inigualable, diseño atemporal y valor duradero.',
    'hero.cta.services': 'Explorar Servicios',
    'hero.cta.about': 'Sobre Nosotros',
    'hero.searchPlaceholder': 'Buscar por nombre, ubicación o área...',
    'hero.searchBtn': 'Buscar',
    
    // Stats
    'stats.completed': 'Proyectos Completados',
    'stats.experience': 'Años de Experiencia',
    'stats.awards': 'Premios de la Industria',
    'stats.delivered': 'Valor Entregado',
    
    // Services
    'services.title': 'Nuestros Servicios Clave',
    'services.subtitle': 'Desde proyectos innovadores de construcción hasta soluciones inmobiliarias estratégicas, entregamos excelencia en cada aspecto del desarrollo.',
    'services.residential': 'Desarrollo Residencial',
    'services.residentialDesc': 'Creando espacios habitables excepcionales con diseño innovador y calidad.',
    'services.realEstate': 'Servicios de Bienes Raíces',
    'services.realEstateDesc': 'Soluciones inmobiliarias integrales desde la adquisición hasta la gestión.',
    'services.consulting': 'Consultoría de Proyectos',
    'services.consultingDesc': 'Orientación experta para asegurar que su proyecto supere las expectativas.',
    'services.learnMore': 'Saber Más',
    
    // Property Listings
    'properties.title': 'Portafolio de Lujo',
    'properties.subtitle': 'Descubra la casa de sus sueños en nuestra colección de propiedades de alta gama. Búsqueda avanzada y mapa interactivo.',
    'properties.filter.status': 'Estado de la Propiedad',
    'properties.filter.all': 'Todas las Propiedades',
    'properties.filter.available': 'Disponible',
    'properties.filter.sold': 'Vendido',
    'properties.filter.budget': 'Presupuesto Máximo',
    'properties.filter.clear': 'Limpiar Filtros',
    'properties.grid': 'Cuadrícula',
    'properties.map': 'Mapa',
    'properties.split': 'Pantalla Dividida',
    'properties.contact': 'Contacto',
    'properties.viewDetails': 'Ver Detalles',
    'properties.noResults': 'Propiedades no Encontradas',
    'properties.noResultsDesc': 'No pudimos encontrar propiedades que coincidan con sus criterios. Intente ajustar los filtros.',
    
    // Property Detail
    'detail.back': 'Volver a Propiedades',
    'detail.tour': 'Recorrido Virtual',
    'detail.gallery': 'Galería de Fotos',
    'detail.viewAll': 'Ver Todas las Fotos',
    'detail.overview': 'Descripción',
    'detail.features': 'Características',
    'detail.specs': 'Especificaciones',
    'detail.descTitle': 'Descripción de la Propiedad',
    'detail.type': 'Tipo de Propiedad',
    'detail.possession': 'Posesión',
    'detail.facing': 'Orientación',
    'detail.sizeOptions': 'Tamaños Disponibles',
    'detail.highlights': 'Puntos Destacados',
    'detail.callNow': 'Llamar Ahora',
    'detail.sendMessage': 'Enviar Mensaje',
    'detail.schedule': 'Agendar Visita',
    'detail.brochure': 'Descargar Folleto',
    'detail.floorPlan': 'Planos de Planta',
    'detail.3dTour': 'Recorrido 3D',
    'detail.brochureDownload': 'Folleto PDF Listo',
    'detail.brochureText': 'Se descargará instantáneamente un folleto arquitectónico de lujo.',
    
    // Contact
    'contact.title': 'Contáctenos',
    'contact.subtitle': 'Comuníquese con nuestro equipo de expertos para hablar sobre su próximo proyecto, inversión o adquisición.',
    'contact.name': 'Su Nombre',
    'contact.email': 'Dirección de Correo',
    'contact.phone': 'Número Telefónico',
    'contact.message': 'Su Mensaje',
    'contact.submit': 'Enviar Consulta Segura',
    'contact.submitting': 'Integrando con CRM...',
    'contact.success': '¡Consulta Enviada con Éxito!',
    'contact.successDesc': 'Su mensaje ha sido registrado. Se ha creado un perfil de lead en el CRM y un especialista en propiedades de lujo lo contactará en un plazo de 2 horas.',
    
    // Admin / CMS
    'admin.title': 'Gestión CMS',
    'admin.subtitle': 'Agregue, edite y elimine propiedades visualmente. Sincronice videos, fotos y enlaces de YouTube al instante.',
    'admin.dashboard': 'Panel de Control',
    'admin.addListing': 'Agregar Propiedad',
    'admin.sanity': 'Mapa de Integración Sanity',
    'admin.notice': 'Editor Visual de CMS',
    'admin.noticeDesc': 'Este portal es un CMS del lado del cliente totalmente operativo que guarda las propiedades en almacenamiento local. Mapea exactamente con el esquema de Sanity CMS para una transición fluida.'
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.services': 'Dienstleistungen',
    'nav.construction': 'Bauwesen',
    'nav.realEstate': 'Immobilien',
    'nav.about': 'Über Uns',
    'nav.properties': 'Immobilien',
    'nav.contact': 'Kontakt',
    'nav.admin': 'CMS Admin',
    
    // Hero
    'hero.companyName': 'Kinash Associates & Bauwesen',
    'hero.title1': 'Exzellenz Bauen,',
    'hero.title2': 'Wahrzeichen Schaffen',
    'hero.tagline': 'Bereitstellung von erstklassigen Bau- und Immobilienlösungen mit unübertroffener Qualität, zeitlosem Design und dauerhaftem Wert.',
    'hero.cta.services': 'Dienstleistungen Entdecken',
    'hero.cta.about': 'Über Uns',
    'hero.searchPlaceholder': 'Suche nach Name, Ort oder Bereich...',
    'hero.searchBtn': 'Suche',
    
    // Stats
    'stats.completed': 'Fertiggestellte Projekte',
    'stats.experience': 'Jahre Erfahrung',
    'stats.awards': 'Branchenauszeichnungen',
    'stats.delivered': 'Gelieferter Wert',
    
    // Services
    'services.title': 'Unsere Kerndienste',
    'services.subtitle': 'Von bahnbrechenden Bauprojekten bis hin zu strategischen Immobilienlösungen bieten wir Exzellenz in jedem Bereich der Immobilienentwicklung.',
    'services.residential': 'Wohnbebauung',
    'services.residentialDesc': 'Schaffung außergewöhnlicher Wohnräume durch innovatives Design und Qualität.',
    'services.realEstate': 'Immobiliendienstleistungen',
    'services.realEstateDesc': 'Umfassende Immobilienlösungen vom Erwerb bis zum Management.',
    'services.consulting': 'Projektberatung',
    'services.consultingDesc': 'Expertenberatung, um sicherzustellen, dass Ihr Projekt die Erwartungen übertrifft.',
    'services.learnMore': 'Mehr Erfahren',
    
    // Property Listings
    'properties.title': 'Luxus-Portfolio',
    'properties.subtitle': 'Entdecken Sie Ihr Traumhaus in unserer kuratierten Luxus-Immobiliensammlung. Erweiterte Suche und interaktive Karte.',
    'properties.filter.status': 'Immobilienstatus',
    'properties.filter.all': 'Alle Immobilien',
    'properties.filter.available': 'Verfügbar',
    'properties.filter.sold': 'Verkauft',
    'properties.filter.budget': 'Maximales Budget',
    'properties.filter.clear': 'Filter Löschen',
    'properties.grid': 'Raster',
    'properties.map': 'Karte',
    'properties.split': 'Splitscreen',
    'properties.contact': 'Kontakt',
    'properties.viewDetails': 'Details Anzeigen',
    'properties.noResults': 'Keine Immobilien Gefunden',
    'properties.noResultsDesc': 'Wir konnten keine passenden Immobilien finden. Bitte passen Sie Ihre Filter oder Suchbegriffe an.',
    
    // Property Detail
    'detail.back': 'Zurück zu Immobilien',
    'detail.tour': 'Objektbesichtigung',
    'detail.gallery': 'Bildergalerie',
    'detail.viewAll': 'Alle Fotos Anzeigen',
    'detail.overview': 'Übersicht',
    'detail.features': 'Merkmale',
    'detail.specs': 'Spezifikationen',
    'detail.descTitle': 'Objektbeschreibung',
    'detail.type': 'Immobilientyp',
    'detail.possession': 'Übergabe',
    'detail.facing': 'Ausrichtung',
    'detail.sizeOptions': 'Größenoptionen',
    'detail.highlights': 'Wichtige Highlights',
    'detail.callNow': 'Jetzt Anrufen',
    'detail.sendMessage': 'Nachricht Senden',
    'detail.schedule': 'Besichtigung Buchen',
    'detail.brochure': 'Exposé Herunterladen',
    'detail.floorPlan': 'Grundrisse',
    'detail.3dTour': '3D-Rundgang',
    'detail.brochureDownload': 'PDF-Exposé Bereit',
    'detail.brochureText': 'Ein luxuriöses Architektur-Exposé wird sofort heruntergeladen.',
    
    // Contact
    'contact.title': 'Kontaktieren Sie Uns',
    'contact.subtitle': 'Wenden Sie sich an unser Expertenteam, um Ihr nächstes Projekt, Ihre Investition oder Ihren Immobilienkauf zu besprechen.',
    'contact.name': 'Ihr Name',
    'contact.email': 'E-Mail-Adresse',
    'contact.phone': 'Telefonnummer',
    'contact.message': 'Ihre Nachricht',
    'contact.submit': 'Sichere Anfrage Senden',
    'contact.submitting': 'CRM-Integration läuft...',
    'contact.success': 'Anfrage erfolgreich übermittelt!',
    'contact.successDesc': 'Ihre Nachricht wurde erfasst. Ein CRM-Lead-Profil wurde erstellt, und unser Luxusimmobilien-Spezialist wird Sie innerhalb von 2 Stunden kontaktieren.',
    
    // Admin / CMS
    'admin.title': 'CMS-Verwaltung',
    'admin.subtitle': 'Fügen Sie Immobilien visuell hinzu, bearbeiten oder löschen Sie sie. Synchronisieren Sie Videos, Fotos und YouTube-Links sofort.',
    'admin.dashboard': 'Dashboard',
    'admin.addListing': 'Eintrag Hinzufügen',
    'admin.sanity': 'Sanity-Integrationsplan',
    'admin.notice': 'Visueller CMS-Editor',
    'admin.noticeDesc': 'Dieses Portal ist ein voll funktionsfähiges clientseitiges CMS, das Einträge im lokalen Speicher sichert. Es entspricht exakt den Sanity-CMS-Schemastrukturen für einen nahtlosen späteren Übergang.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kinash_lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kinash_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
