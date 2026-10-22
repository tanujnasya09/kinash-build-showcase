import type { Localized, MetaContent } from './types';

export interface NotFoundContent {
  meta: MetaContent;
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
}

export const notFound: Localized<NotFoundContent> = {
  en: {
    meta: {
      title: 'Page not found',
      description: 'The page you are looking for could not be found.',
      keywords: '404, page not found, apex luxury'
    },
    eyebrow: 'Error 404',
    title: 'This address is off the registry.',
    body: 'The page you requested may have moved, or the link may be out of date. Return to the collection or browse the current portfolio.',
    primary: 'Return home',
    secondary: 'Browse properties',
  },
  es: {
    meta: {
      title: 'Página no encontrada',
      description: 'No se ha podido encontrar la página solicitada.',
      keywords: '404, página no encontrada, apex luxury'
    },
    eyebrow: 'Error 404',
    title: 'Esta dirección no figura en el registro.',
    body: 'Es posible que la página solicitada se haya movido o que el enlace esté desactualizado. Vuelva a la colección o explore el portafolio actual.',
    primary: 'Volver al inicio',
    secondary: 'Explorar propiedades',
  },
  de: {
    meta: {
      title: 'Seite nicht gefunden',
      description: 'Die gesuchte Seite konnte nicht gefunden werden.',
      keywords: '404, seite nicht gefunden, apex luxury'
    },
    eyebrow: 'Fehler 404',
    title: 'Diese Adresse ist nicht im Grundbuch.',
    body: 'Die angeforderte Seite wurde möglicherweise verschoben oder der Link ist veraltet. Kehren Sie zur Sammlung zurück oder durchstöbern Sie das aktuelle Portfolio.',
    primary: 'Zur Startseite',
    secondary: 'Objekte durchsuchen',
  },
};
