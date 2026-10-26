/**
 * Question bank in the browser: `loadBank` fetches the six files on demand (one chunk each), so a
 * page ships only the questions its first render shows until the visitor asks for a new draw.
 * `BANK` (lib/banks-build.ts) is for the build only.
 */
import type { Question } from './engine/exam';
const strip = (m: { default: unknown }) => (m.default as { questions: Question[] }).questions;
let cache: Promise<Question[]> | null = null;
export function loadBank(): Promise<Question[]> {
  cache ??= Promise.all([
    import('../data/questions/cna.json'), import('../data/questions/pharm.json'), import('../data/questions/ma.json'),
    import('../data/questions/phleb.json'), import('../data/questions/ekg.json'), import('../data/questions/emt.json'),
  ]).then((ms) => ms.flatMap(strip));
  return cache;
}
