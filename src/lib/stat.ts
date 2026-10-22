import type { StatItem } from '@/content/types';
import { formatMoneyCompact } from './currency';

/**
 * Renders a marketing stat. Money stats carry a numeric `amount` and are
 * formatted in the active currency; every other stat uses its static `value`.
 */
export function statValue(stat: StatItem, code?: string): string {
  if (stat.amount !== undefined) {
    return `${formatMoneyCompact(stat.amount, code)}${stat.suffix ?? ''}`;
  }
  return stat.value ?? '';
}
