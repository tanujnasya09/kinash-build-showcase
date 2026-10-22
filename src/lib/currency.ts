import siteConfig from '@/config/site';

export interface Currency {
  code: string;
  symbol: string;
  label: string;
  locale: string;
}

export const currencies: Currency[] = [
  { code: 'INR', symbol: '\u20B9', label: 'INR (\u20B9)', locale: 'en-IN' },
  { code: 'USD', symbol: '$', label: 'USD ($)', locale: 'en-US' },
  { code: 'EUR', symbol: '\u20AC', label: 'EUR (\u20AC)', locale: 'de-DE' },
  { code: 'GBP', symbol: '\u00A3', label: 'GBP (\u00A3)', locale: 'en-GB' },
];

export function getCurrency(code: string = siteConfig.defaultCurrency): Currency {
  return currencies.find((c) => c.code === code) ?? currencies[0];
}

export function parseAmount(value: string | number): number {
  if (typeof value === 'number') return value;
  const digits = value.replace(/[^\d.]/g, '');
  return parseFloat(digits) || 0;
}

/**
 * Formats a bare number in the active currency. Rebranding to USD/EUR/GBP is a
 * one-line change in `src/config/site.ts`; nothing here is locale-hardcoded.
 */
export function formatCurrency(value: number, code?: string): string {
  const currency = getCurrency(code);
  const amount = Math.round(value);
  return `${currency.symbol}${amount.toLocaleString(currency.locale)}`;
}

/**
 * Locale-correct compact money using Intl notation, so each locale keeps its
 * own magnitude words: 2000000000 -> "₹200Cr" (en-IN), "$2B" (en-US),
 * "2 Mrd. €" (de-DE). Used for marketing stats that describe value, not price.
 */
export function formatMoneyCompact(value: number, code?: string): string {
  const currency = getCurrency(code);
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Compact display for map pins and budget labels: 6500000 -> "₹65L" (en-IN),
 * "$6.5M" (en-US), "65 Mio. €" (de-DE). Locale-aware, so no Indian grouping
 * leaks into a US or European build.
 */
export function formatCompact(value: number, code?: string): string {
  const currency = getCurrency(code);
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/** Existing price fields already carry their unit ("₹17,000.00 / Gaj"). */
export function formatPrice(value: string | number, code?: string): string {
  if (typeof value === 'string' && /[^\d.,\s]/.test(value.replace(/[\u20B9$€£]/g, ''))) {
    const amount = parseAmount(value);
    const suffix = value.replace(/[\d.,\s\u20B9$€£]/g, '').trim();
    return `${formatCurrency(amount, code)}${suffix ? ` ${suffix}` : ''}`;
  }
  return formatCurrency(parseAmount(value), code);
}
