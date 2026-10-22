import type { Language } from '@/i18n';

/**
 * Page content is stored per language so the whole site can be translated
 * without touching component code. A buyer rebrand edits the content files
 * in `src/content/`; chrome (nav, buttons, form labels) lives in `src/i18n/`.
 */
export type Localized<T> = Record<Language, T>;

export interface FeatureItem {
  label: string;
}

export interface StatItem {
  /** Static text stat, e.g. "1,200+" or "98%". */
  value?: string;
  /** Money stat; rendered with the active currency when present. */
  amount?: number;
  /** Optional trailing marker for money stats, e.g. "+". */
  suffix?: string;
  label: string;
  desc?: string;
}

/** Per-page search/social metadata. Kept beside the page copy so a rebrand
 *  edits SEO text in the same place as everything else. */
export interface MetaContent {
  title: string;
  description: string;
  keywords: string;
}
