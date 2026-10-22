import type { Localized, MetaContent } from './types';

export interface ContactContent {
  meta: MetaContent;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  headquarters: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  certification: string;
  securityTitle: string;
  securityBody: string;
  formTitle: string;
  propertyInterest: string;
  selectPlaceholder: string;
  generalInquiry: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderMessage: string;
  registryTitle: string;
  registryBadge: string;
  registryBody: string;
  officerLabel: string;
  officerStatus: string;
  segmentLabel: string;
}

export const contact: Localized<ContactContent> = {
  en: {
    meta: {
      title: 'Inquire & Connect',
      description:
        'Request a consultation, request a brochure, or schedule a site visit with the Apex Luxury real estate and construction team in Dehradun.',
      keywords: 'contact construction, real estate agent dehradun, luxury property inquiry'
    },
    eyebrow: 'Get In Touch',
    headline: 'Establish a Secure',
    headlineAccent: 'Connection.',
    headquarters: 'Apex Headquarters',
    addressLabel: 'Address',
    phoneLabel: 'Phone Support',
    emailLabel: 'Email Address',
    certification: 'Government Registered & ISO Certified',
    securityTitle: 'Corporate Database Protection Active',
    securityBody: "All communication is fully encrypted using TLS 1.3 protocol and dispatched directly to Apex Luxury' private corporate directory. Your data privacy is strictly protected.",
    formTitle: 'Direct Property Inquiry',
    propertyInterest: 'Property of Interest',
    selectPlaceholder: '-- Select Listing (Optional) --',
    generalInquiry: 'General Inquiry',
    placeholderName: 'Enter full name',
    placeholderEmail: 'E.g. name@domain.com',
    placeholderPhone: 'E.g. +91 11 5555 0199',
    placeholderMessage: 'Describe your requirements, preferred calling times, or questions...',
    registryTitle: 'Inquiry Security Registry',
    registryBadge: 'Official Submission Logged',
    registryBody: 'Your inquiry has been cataloged under Reference ID {id}. A dedicated Apex portfolio representative is being allocated to compile your requested information, site plans, and custom pricing arrays.',
    officerLabel: 'Assigned Officer Status',
    officerStatus: 'Allocation In Progress',
    segmentLabel: 'Target Portfolio Segment',
  },
  es: {
    meta: {
      title: 'Consulta y Contacto',
      description:
        'Solicite una consulta, pida un folleto o agende una visita a obra con el equipo de Apex Luxury en Dehradun.',
      keywords: 'contacto construcción, agente inmobiliario dehradun, consulta de propiedad de lujo'
    },
    eyebrow: 'Contacto',
    headline: 'Establezca una Conexión',
    headlineAccent: 'Segura.',
    headquarters: 'Sede Central de Apex',
    addressLabel: 'Dirección',
    phoneLabel: 'Soporte Telefónico',
    emailLabel: 'Correo Electrónico',
    certification: 'Registro Gubernamental y Certificación ISO',
    securityTitle: 'Protección de Base de Datos Corporativa Activa',
    securityBody: 'Toda comunicación se cifra por completo mediante el protocolo TLS 1.3 y se envía directamente al directorio corporativo privado de Apex Luxury. Su privacidad está estrictamente protegida.',
    formTitle: 'Consulta Directa de Propiedad',
    propertyInterest: 'Propiedad de Interés',
    selectPlaceholder: '-- Seleccionar (Opcional) --',
    generalInquiry: 'Consulta General',
    placeholderName: 'Introduzca su nombre completo',
    placeholderEmail: 'Ej. nombre@dominio.com',
    placeholderPhone: 'Ej. +91 11 5555 0199',
    placeholderMessage: 'Describa sus requisitos, horarios preferidos de llamada o preguntas...',
    registryTitle: 'Registro de Seguridad de Consultas',
    registryBadge: 'Envío Oficial Registrado',
    registryBody: 'Su consulta ha sido catalogada con el ID de Referencia {id}. Un representante de cartera Apex está siendo asignado para recopilar la información solicitada, los planos y las tarifas personalizadas.',
    officerLabel: 'Estado del Responsable Asignado',
    officerStatus: 'Asignación en Curso',
    segmentLabel: 'Segmento de Cartera Objetivo',
  },
  de: {
    meta: {
      title: 'Anfrage & Kontakt',
      description:
        'Beratung anfragen, Broschüre anfordern oder einen Baustellenbesuch mit dem Apex-Luxury-Team in Dehradun vereinbaren.',
      keywords: 'kontakt bauunternehmen, immobilienmakler dehradun, anfrage luxusimmobilie'
    },
    eyebrow: 'Kontakt',
    headline: 'Stellen Sie eine sichere',
    headlineAccent: 'Verbindung her.',
    headquarters: 'Apex Hauptsitz',
    addressLabel: 'Adresse',
    phoneLabel: 'Telefon-Support',
    emailLabel: 'E-Mail-Adresse',
    certification: 'Staatlich registriert & ISO-zertifiziert',
    securityTitle: 'Unternehmensdatenbankschutz aktiv',
    securityBody: 'Die gesamte Kommunikation wird mit dem TLS-1.3-Protokoll verschlüsselt und direkt an das private Unternehmensverzeichnis von Apex Luxury übermittelt. Ihre Datenschutzrechte sind strikt geschützt.',
    formTitle: 'Direkte Objektanfrage',
    propertyInterest: 'Objekt von Interesse',
    selectPlaceholder: '-- Objekt wählen (Optional) --',
    generalInquiry: 'Allgemeine Anfrage',
    placeholderName: 'Vollständigen Namen eingeben',
    placeholderEmail: 'z. B. name@domain.com',
    placeholderPhone: 'z. B. +91 11 5555 0199',
    placeholderMessage: 'Beschreiben Sie Ihre Anforderungen, bevorzugte Anrufzeiten oder Fragen...',
    registryTitle: 'Anfrage-Sicherheitsregister',
    registryBadge: 'Offizielle Übermittlung protokolliert',
    registryBody: 'Ihre Anfrage wurde unter der Referenz-ID {id} erfasst. Ein dedizierter Apex-Portfoliobetreuer wird zugeteilt, um die angeforderten Informationen, Baupläne und individuelle Preiskalkulationen zusammenzustellen.',
    officerLabel: 'Status des zuständigen Betreuers',
    officerStatus: 'Zuweisung läuft',
    segmentLabel: 'Ziel-Portfolio-Segment',
  },
};
