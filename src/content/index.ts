import type { Language } from '@/i18n';
import { home, type HomeContent } from './home';
import { about, type AboutContent } from './about';
import { services, type ServicesContent } from './services';
import { realEstate, type RealEstateContent } from './realEstate';
import { construction, type ConstructionContent } from './construction';
import { notFound, type NotFoundContent } from './notFound';
import { properties, type PropertiesContent } from './properties';
import { contact, type ContactContent } from './contact';

export interface PageContent {
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  realEstate: RealEstateContent;
  construction: ConstructionContent;
  notFound: NotFoundContent;
  properties: PropertiesContent;
  contact: ContactContent;
}

const all: Record<Language, PageContent> = {
  en: { home: home.en, about: about.en, services: services.en, realEstate: realEstate.en, construction: construction.en, notFound: notFound.en, properties: properties.en, contact: contact.en },
  es: { home: home.es, about: about.es, services: services.es, realEstate: realEstate.es, construction: construction.es, notFound: notFound.es, properties: properties.es, contact: contact.es },
  de: { home: home.de, about: about.de, services: services.de, realEstate: realEstate.de, construction: construction.de, notFound: notFound.de, properties: properties.de, contact: contact.de },
};

export function getContent(language: Language): PageContent {
  return all[language] ?? all.en;
}

export * from './types';
export type { HomeContent } from './home';
export type { AboutContent } from './about';
export type { ServicesContent } from './services';
export type { RealEstateContent } from './realEstate';
export type { ConstructionContent } from './construction';
export type { NotFoundContent } from './notFound';
export type { PropertiesContent } from './properties';
export type { ContactContent } from './contact';
