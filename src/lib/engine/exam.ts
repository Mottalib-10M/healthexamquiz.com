/**
 * Practice sets and mock exams for the eight certification exams. Formats (items, scored items,
 * minutes, passing standard, items per outline domain) are read from params-2026.json, which copies
 * what each certifying body publishes. The questions (src/data/questions/*.json) are written by
 * Radif Partners from the topics of those outlines; none is copied from a handbook, a prep provider,
 * a flash-card site or a real exam.
 *
 * Marking: no certifier publishes a table from raw correct answers to its scaled score, and the NREMT
 * exam is adaptive. A mock therefore reports the share of correct answers and compares it with a
 * study target stated on the page (never presented as the official pass mark).
 */
import P from '../../data/params-2026.json';

export type ExamId = 'cna' | 'ptce' | 'excpt' | 'ccma' | 'cma' | 'cpt' | 'cet' | 'emt';
export const EXAM_IDS: ExamId[] = ['cna', 'ptce', 'excpt', 'ccma', 'cma', 'cpt', 'cet', 'emt'];
export interface Tag { exam: ExamId; domain: string }
export interface Question {
  id: string; exam: ExamId; domain: string; also?: Tag[];
  /** Point of the official outline this question trains (e.g. "1.4" or "Clinical: phlebotomy"). */
  ref: string; q: string; options: string[]; answer: number; explain: string;
}
export interface Domain { code: string; name: string; short: string; items: number; share: number; range?: string }
export interface ExamParams {
  label: string; name: string; owner: string; vendor: string;
  items: number; scored: number; minutes: number; itemsMin?: number; feeNonMember?: number;
  scoring: string; passText: string; target: number;
  fee: number; feeText?: string; domains: Domain[];
}
export const examOf = (e: ExamId) => (P.exams as unknown as Record<ExamId, ExamParams>)[e];
export const domainsOf = (e: ExamId) => examOf(e).domains;
export const LABEL = (e: ExamId) => examOf(e).label;

/** mulberry32: same seed, same draw (shared link, hydration). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function shuffle<T>(xs: T[], r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Stable seed from a text (page id): the build and the browser draw the same first set. */
export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}

/** Domain of question q for this exam: its own exam, or an `also` tag; null if it does not count. */
export function domainFor(q: Question, exam: ExamId): string | null {
  if (q.exam === exam) return q.domain;
  return q.also?.find((t) => t.exam === exam)?.domain ?? null;
}
export const pool = (bank: Question[], exam: ExamId, domain?: string | null) =>
  bank.filter((q) => { const d = domainFor(q, exam); return d != null && (!domain || d === domain); });

/** Questions of a full mock: the official item count, split by domain as the outline weights it. */
export const mockLength = (e: ExamId) => examOf(e).items;
/** Minutes of a mock of n questions: official time, prorated when the set is shorter. */
export const minutesFor = (e: ExamId, n: number) => { const x = examOf(e); return Math.max(1, Math.round((x.minutes * n) / x.items)); };
/** Correct answers to reach the study target on a set of n questions. */
export const targetCount = (e: ExamId, n: number) => Math.ceil(examOf(e).target * n - 1e-9);

/** Full mock: the official number of items in each outline domain, then shuffled. */
export function buildMock(bank: Question[], exam: ExamId, seed: number): Question[] {
  const r = rng(seed);
  const used = new Set<string>();
  const out: Question[] = [];
  for (const d of domainsOf(exam)) {
    const p = shuffle(pool(bank, exam, d.code), r).filter((q) => !used.has(q.id)).slice(0, d.items);
    p.forEach((q) => used.add(q.id)); out.push(...p);
  }
  const short = mockLength(exam) - out.length;
  if (short > 0) out.push(...shuffle(pool(bank, exam).filter((q) => !used.has(q.id)), r).slice(0, short));
  return shuffle(out, r);
}
/** Practice set: n questions of one domain (or of the whole exam), same seed → same set. */
export function buildPractice(bank: Question[], exam: ExamId, domain: string | null, seed: number, n = 10): Question[] {
  const own = pool(bank, exam, domain);
  return shuffle(own, rng(seed)).slice(0, Math.min(n, own.length));
}

export interface Score { right: number; total: number; target: number; reached: boolean; byDomain: Array<{ code: string; short: string; n: number; r: number }> }
export function score(exam: ExamId, qs: Question[], answers: Array<number | null>): Score {
  const right = qs.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const target = targetCount(exam, qs.length);
  const byDomain = domainsOf(exam).map((d) => {
    const idx = qs.map((q, i) => (domainFor(q, exam) === d.code ? i : -1)).filter((i) => i >= 0);
    return { code: d.code, short: d.short, n: idx.length, r: idx.filter((i) => answers[i] === qs[i].answer).length };
  }).filter((d) => d.n > 0);
  return { right, total: qs.length, target, reached: right >= target, byDomain };
}

/** Binomial tail: chance of at least `need` right out of `n` when each answer is right with probability p. */
export function atLeast(n: number, need: number, p: number) {
  if (need <= 0) return 1;
  if (need > n) return 0;
  if (p <= 0) return 0; if (p >= 1) return 1;
  const lf = (k: number) => { let s = 0; for (let i = 2; i <= k; i++) s += Math.log(i); return s; };
  let s = 0;
  for (let k = need; k <= n; k++) s += Math.exp(lf(n) - lf(k) - lf(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
  return Math.min(1, Math.max(0, s));
}
