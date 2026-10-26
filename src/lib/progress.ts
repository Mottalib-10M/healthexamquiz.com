/**
 * Progress kept in THIS browser only (localStorage), never sent anywhere: for each question answered,
 * how many times it was seen and whether the last answer was right; the questions flagged; the last
 * mock results. Every access is wrapped: a private window or blocked storage simply means no saved progress.
 */
import type { ExamId } from './engine/exam';
const KEY = 'uhe-progress-v1';
const KEY_RUNS = 'uhe-runs-v1';
export interface Seen { n: number; ok: number; last: 0 | 1 }
export interface Run { exam: ExamId; mode: 'practice' | 'mock' | 'review'; right: number; total: number; at: string }
function read<T>(k: string, d: T): T { try { const s = localStorage.getItem(k); return s ? (JSON.parse(s) as T) : d; } catch { return d; } }
function write(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked: nothing saved */ } }
export const loadSeen = () => read<Record<string, Seen>>(KEY, {});
export const loadRuns = () => read<Run[]>(KEY_RUNS, []);
export function recordAnswer(id: string, right: boolean) {
  const s = loadSeen(); const o = s[id] ?? { n: 0, ok: 0, last: 0 };
  s[id] = { n: o.n + 1, ok: o.ok + (right ? 1 : 0), last: right ? 1 : 0 }; write(KEY, s);
}
export function recordRun(r: Run) { const runs = loadRuns(); runs.push(r); write(KEY_RUNS, runs.slice(-60)); }
export function clearProgress() { try { localStorage.removeItem(KEY); localStorage.removeItem(KEY_RUNS); } catch { /* nothing to clear */ } }
/** Ids whose last answer was wrong. */
export const mistakes = () => Object.entries(loadSeen()).filter(([, v]) => v.last === 0).map(([k]) => k);
