import en from './en';
import es from './es';
import de from './de';

export type TranslationKey = keyof typeof en;

export const translations = { en, es, de } as const;

export type Language = keyof typeof translations;

export const languages: { code: Language; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Espa\u00f1ol', short: 'ES' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
];

/** Replaces `{name}` placeholders in a template with the given values. */
export function interpolate(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  );
}
