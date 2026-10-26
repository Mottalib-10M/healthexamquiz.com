/** Number, money, percent and date writing for en-US pages and tools (RECETTE §4.1, §8.4). */
import { formatNumber, formatMoney, formatPercent } from './format';
export const formatNumberL = (n: number, _lang = 'en', d = 0) => formatNumber(n, d);
export const money = (n: number, d = 0) => formatMoney(n, d);
export const pct = (x: number, _lang = 'en', d = 0) => formatPercent(x, d);
/** "January 19, 2027": dates are written in words, the ISO form stays in datetime attributes. */
export function dateL(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
