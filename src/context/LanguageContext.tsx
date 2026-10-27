'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import siteConfig from '@/config/site';
import { type Currency, getCurrency } from '@/lib/currency';
import { translations, languages, interpolate, type Language, type TranslationKey } from '@/i18n';
import { getContent, type PageContent } from '@/content';

export type TranslationParams = Record<string, string | number>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: typeof languages;
  currency: Currency;
  setCurrency: (code: string) => void;
  content: PageContent;
  t: (key: TranslationKey, params?: TranslationParams) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [currency, setCurrencyState] = useState<Currency>(() => getCurrency(siteConfig.defaultCurrency));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('apex_lang') as Language | null;
      if (savedLang && (savedLang === 'en' || savedLang === 'es' || savedLang === 'de')) {
        setLanguageState(savedLang);
      }
      const savedCurr = localStorage.getItem('apex_currency');
      if (savedCurr) {
        setCurrencyState(getCurrency(savedCurr));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('apex_lang', lang);
  };

  const setCurrency = (code: string) => {
    const next = getCurrency(code);
    setCurrencyState(next);
    localStorage.setItem('apex_currency', next.code);
  };

  const content = useMemo(() => getContent(language), [language]);

  const t = (key: TranslationKey, params?: TranslationParams): string => {
    const template = translations[language][key] ?? translations.en[key] ?? key;
    if (!params) return template;
    return interpolate(template, params);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages, currency, setCurrency, content, t }}>
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

export type { Language };
