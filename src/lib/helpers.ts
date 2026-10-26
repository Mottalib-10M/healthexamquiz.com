/** Writing helpers handed to every page: links, figures read from params-2026.json, tables, bank sizes. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import { BANK } from './banks-build';
import { pool, examOf, domainsOf, type ExamId } from './engine/exam';
import P from '../data/params-2026.json';
import DRUGS from '../data/drugs.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 align-top text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const hm = (m: number) => { const h = Math.floor(m / 60), r = m % 60; return `${h ? `${h} hour${h === 1 ? '' : 's'}` : ''}${h && r ? ' ' : ''}${r ? `${r} minutes` : ''}`; };

export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  const usd = (n: number, d = 0) => money(n, d);
  const pc = (x: number, d = 0) => pct(x, 'en', d);
  const X = (e: ExamId) => examOf(e);
  const dom = (e: ExamId, code: string) => domainsOf(e).find((d) => d.code === code)!;
  return {
    lang, a, ext, src, usd, num, pc, P, R: P.rules,
    date: (iso: string) => dateL(iso),
    /** Day the formats and fees were read: "October 26, 2026". */
    read: dateL(P.retrieved_at),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al),
    X, dom, hm,
    /** "1 hour 50 minutes" for an exam. */
    time: (e: ExamId) => hm(X(e).minutes),
    /** Outline table of an exam: domain, items in our mock, share. */
    outline: (e: ExamId, caption?: string) => table(['Outline domain', 'Questions in a full mock', 'Weight'], domainsOf(e).map((d) => [d.name, d.items, (d as { range?: string }).range ?? pct(d.share)]), caption, ['l', 'r', 'r']),
    count: BANK.length,
    inPool: (e: ExamId, d?: string) => pool(BANK, e, d).length,
    drugs: DRUGS.drugs,
    state: (id: string) => P.cnaStates.find((s) => s.id === id)!,
  };
}
export type Helpers = ReturnType<typeof helpers>;
