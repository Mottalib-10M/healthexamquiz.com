/**
 * Top 200 drugs trainer. `cards`: flash cards (generic name, then brand, FDA class and common use),
 * filtered by use; `quiz`: ten questions drawn from the list (brand of a generic, generic of a brand,
 * class of a generic); `suffix`: drug name stems and the classes they signal, with the look-alike
 * traps found in the same list. Names and FDA classes come from RxNorm and RxClass (NLM, public
 * domain), read on the date in drugs.json. Brand names are facts; no logo, no product image.
 */
import { useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import D from '../../data/drugs.json';
import ST from '../../data/stems.json';
import { rng, shuffle } from '../../lib/engine/exam';

type Drug = { generic: string; brand: string; use: string; area: string; epc: string[] };
const DRUGS = D.drugs as Drug[];
const AREAS = Array.from(new Set(DRUGS.map((d) => d.area))).sort();
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const LET = 'ABCD';

export function stemMatch(stem: string, g: string): boolean {
  return stem.split('/').map((p) => p.trim()).some((p) => {
    const core = p.replace(/-/g, '').trim();
    if (p.startsWith('-')) return g.split(' ')[0].endsWith(core);
    if (p.endsWith('-')) return g.startsWith(core);
    return false;
  });
}
export const STEMS = ST.stems.map((s) => {
  const hits = DRUGS.filter((d) => stemMatch(s.stem, d.generic));
  const fits = (d: Drug) => !s.match || d.epc.some((e) => e.toLowerCase().includes(s.match.toLowerCase()));
  return { ...s, drugs: hits.filter(fits), traps: hits.filter((d) => !fits(d)) };
});

interface Q { q: string; options: string[]; answer: number; note: string }
export function drugQuiz(seed: number, n = 10): Q[] {
  const r = rng(seed);
  const out: Q[] = [];
  const pool = shuffle(DRUGS, r);
  for (const d of pool) {
    if (out.length >= n) break;
    const kind = Math.floor(r() * 3);
    const others = shuffle(DRUGS.filter((x) => x.generic !== d.generic), r);
    if (kind === 0 && d.brand) {
      const wrong = others.filter((x) => x.brand).slice(0, 3).map((x) => x.brand);
      const opts = shuffle([d.brand, ...wrong], r);
      out.push({ q: `Which brand name goes with ${d.generic}?`, options: opts, answer: opts.indexOf(d.brand), note: `${cap(d.generic)} is sold as ${d.brand}; use: ${d.use.toLowerCase()}.` });
    } else if (kind === 1 && d.brand) {
      const wrong = others.slice(0, 3).map((x) => x.generic);
      const opts = shuffle([d.generic, ...wrong], r);
      out.push({ q: `${d.brand} is the brand name of which generic drug?`, options: opts, answer: opts.indexOf(d.generic), note: `${d.brand} contains ${d.generic}; FDA class: ${d.epc[0] ?? 'not listed in RxClass'}.` });
    } else if (d.epc.length) {
      const wrong = Array.from(new Set(others.filter((x) => x.epc.length && !x.epc.includes(d.epc[0])).map((x) => x.epc[0]))).slice(0, 3);
      const opts = shuffle([d.epc[0], ...wrong], r);
      out.push({ q: `What is the FDA established pharmacologic class of ${d.generic}?`, options: opts, answer: opts.indexOf(d.epc[0]), note: `${cap(d.generic)}: ${d.epc.join('; ')}. Common use: ${d.use.toLowerCase()}.` });
    }
  }
  return out;
}

interface Props { mode?: 'cards' | 'quiz' | 'suffix'; idPrefix?: string; secondary?: boolean }
export default function DrugCards({ mode = 'cards', idPrefix = 'dr', secondary = false }: Props) {
  const [use, setUse] = useState('all');
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [known, setKnown] = useState<Record<string, boolean>>({});
  const [seed, setSeed] = useState(11);
  const [ans, setAns] = useState<Array<number | null>>(() => Array(10).fill(null));
  const [stem, setStem] = useState(0);
  const deck = useMemo(() => (use === 'all' ? DRUGS : DRUGS.filter((d) => d.area === use)), [use]);
  const quiz = useMemo(() => drugQuiz(seed), [seed]);
  const res = secondary ? {} : { 'data-resultat': '' };
  const sec = secondary ? { 'data-simulateur-secondaire': '' } : {};
  const box = 'not-prose grid gap-5 rounded-2xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_280px]';
  const panel = 'h-fit rounded-xl border-l-4 border-accent-500 bg-navy-50 p-4';
  const btn = 'rounded-lg border border-navy-300 px-4 py-2 text-sm font-medium text-navy-800 hover:border-accent-500';

  if (mode === 'quiz') {
    const right = quiz.reduce((s, q, k) => s + (ans[k] === q.answer ? 1 : 0), 0);
    const done = ans.filter((a) => a != null).length;
    return (
      <div data-chrome className={box}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} {...sec}>
          {quiz.map((q, k) => (
            <fieldset key={k} className="rounded-lg border border-navy-200 p-3">
              <legend className="px-1 text-sm font-semibold text-navy-900">{k + 1}. {q.q}</legend>
              <div className="mt-1 grid gap-2 sm:grid-cols-2">
                {q.options.map((o, j) => {
                  const a = ans[k], show = a != null;
                  const cls = show && j === q.answer ? 'border-emerald-700 bg-emerald-50' : show && j === a ? 'border-amber-600 bg-amber-50' : 'border-navy-300 hover:border-accent-500';
                  return <button key={j} id={`${idPrefix}-${k}-${j}`} type="button" aria-pressed={a === j} disabled={show} onClick={() => setAns((x) => x.map((v, m) => (m === k ? j : v)))} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm text-navy-900 ${cls}`}><span className="text-xs font-bold text-navy-500">{LET[j]}</span>{o}</button>;
                })}
              </div>
              {ans[k] != null && <p className="mt-2 text-sm text-navy-700">{q.note}</p>}
            </fieldset>
          ))}
        </form>
        <div {...res} aria-live="polite" className={`${panel} lg:sticky lg:top-20`}>
          <p className="text-sm font-medium text-navy-600">Score</p>
          <p className="tabular-nums font-serif text-3xl font-bold text-navy-900">{right} of {quiz.length}</p>
          <p className="mt-1 text-sm text-navy-700">{done} answered</p>
          <button type="button" className={`${btn} mt-3`} onClick={() => { setSeed(Math.floor(Math.random() * 2 ** 31)); setAns(Array(10).fill(null)); }}>Ten new questions</button>
        </div>
      </div>
    );
  }

  if (mode === 'suffix') {
    const s = STEMS[stem] ?? STEMS[0];
    return (
      <div data-chrome className={box}>
        <div>
          <form onSubmit={(e) => e.preventDefault()} {...sec}>
            <SelectField id={`${idPrefix}-stem`} label="Name stem" value={String(stem)} onChange={(x) => setStem(Number(x))} options={STEMS.map((x, k) => ({ value: String(k), label: `${x.stem}  ·  ${x.cls}` }))} />
          </form>
          <p className="mt-3 text-sm font-medium text-navy-700">In the top 200 list</p>
          <ul className="mt-1 grid gap-1 text-sm sm:grid-cols-2">
            {s.drugs.map((d) => <li key={d.generic} className="text-navy-900">{d.generic}{d.brand ? <span className="text-navy-600"> ({d.brand})</span> : null}</li>)}
          </ul>
          {s.traps.length > 0 && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Look-alike: {s.traps.map((d) => `${d.generic} (${d.epc[0] ?? d.use})`).join(', ')} ends the same way but is not in this class.</p>}
        </div>
        <div {...res} aria-live="polite" className={panel}>
          <p className="text-sm font-medium text-navy-600">{s.stem} signals</p>
          <p className="font-serif text-2xl font-bold text-navy-900">{s.cls}</p>
          <p className="mt-2 text-sm text-navy-700">{s.drugs.length} drug{s.drugs.length === 1 ? '' : 's'} of the list carry it.</p>
        </div>
      </div>
    );
  }

  const d = deck[Math.min(i, deck.length - 1)];
  const nKnown = deck.filter((x) => known[x.generic]).length;
  const go = (k: number) => { setI((k + deck.length) % deck.length); setFlip(false); };
  return (
    <div data-chrome className={box}>
      <div>
        <form onSubmit={(e) => e.preventDefault()} {...sec}>
          <SelectField id={`${idPrefix}-use`} label="Deck" value={use} onChange={(x) => { setUse(x); setI(0); setFlip(false); }} options={[{ value: 'all', label: `All ${DRUGS.length} drugs` }, ...AREAS.map((u) => ({ value: u, label: `${u} (${DRUGS.filter((d) => d.area === u).length})` }))]} />
        </form>
        <button type="button" id={`${idPrefix}-card`} aria-pressed={flip} onClick={() => setFlip(!flip)} className="mt-4 flex min-h-40 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-accent-500 bg-white p-5 text-center">
          <span className="text-xs uppercase tracking-wide text-navy-500">Card {i + 1} of {deck.length} · tap to turn</span>
          <span className="mt-2 font-serif text-2xl font-bold text-navy-900">{d.generic}</span>
          {flip && <span className="mt-2 text-base text-navy-800">{d.brand ? `Brand: ${d.brand}` : 'Mostly sold under its generic name'}</span>}
          {flip && <span className="mt-1 text-sm text-navy-700">{d.epc.length ? `FDA class: ${d.epc[0]}` : 'No FDA class listed in RxClass'} · {d.use}</span>}
        </button>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className={btn} onClick={() => go(i - 1)}>Previous</button>
          <button type="button" className={btn} onClick={() => { setKnown((k) => ({ ...k, [d.generic]: true })); go(i + 1); }}>I knew it</button>
          <button type="button" className={btn} onClick={() => { setKnown((k) => ({ ...k, [d.generic]: false })); go(i + 1); }}>Show it again later</button>
        </div>
      </div>
      <div {...res} aria-live="polite" className={panel}>
        <p className="text-sm font-medium text-navy-600">Known in this deck</p>
        <p className="tabular-nums font-serif text-3xl font-bold text-navy-900">{nKnown} of {deck.length}</p>
        <p className="mt-2 text-xs text-navy-600">Names and classes from RxNorm and RxClass (National Library of Medicine), read on {new Date(`${D.retrieved_at}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}.</p>
      </div>
    </div>
  );
}
