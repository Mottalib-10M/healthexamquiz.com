/**
 * Order of draw trainer (CLSI GP41, as CLSI summarizes it publicly): the tubes are shown shuffled,
 * the visitor taps them in the order they would be filled, and each tap is checked at once. First
 * render = the build's shuffle (fixed seed); a new shuffle only after a click.
 */
import { useState } from 'react';
import { rng, shuffle } from '../../lib/engine/exam';

/** CLSI order; colors are the usual closure colors named in the CLSI summary. */
export const DRAW = [
  { id: 'culture', name: 'Blood culture bottles', color: '#e5e7eb', ink: '#111827', why: 'Drawn first so the sample stays sterile.' },
  { id: 'citrate', name: 'Sodium citrate (light blue)', color: '#93c5fd', ink: '#0c2340', why: 'Coagulation tests: no clot activator or other additive may reach it first.' },
  { id: 'serum', name: 'Serum tube, with or without clot activator or gel (red, gold)', color: '#d97706', ink: '#1f1300', why: 'Clot activator would distort coagulation results if drawn before citrate.' },
  { id: 'heparin', name: 'Heparin, with or without gel (green)', color: '#16a34a', ink: '#ffffff', why: 'Heparin carried into a serum tube would hinder clotting.' },
  { id: 'edta', name: 'EDTA (lavender, pink)', color: '#a78bfa', ink: '#1a0f3d', why: 'EDTA binds calcium and adds potassium: it must come after the chemistry tubes.' },
  { id: 'fluoride', name: 'Sodium fluoride / potassium oxalate (gray)', color: '#6b7280', ink: '#ffffff', why: 'Last: oxalate and fluoride would change other results.' },
];

interface Props { idPrefix?: string; secondary?: boolean }
export default function OrderOfDraw({ idPrefix = 'd', secondary = false }: Props) {
  const [tubes, setTubes] = useState(() => shuffle(DRAW, rng(7)));
  const [picked, setPicked] = useState<string[]>([]);
  const [miss, setMiss] = useState<string | null>(null);
  const [errors, setErrors] = useState(0);
  const next = DRAW[picked.length];
  const done = picked.length === DRAW.length;
  const tap = (id: string) => {
    if (done || picked.includes(id)) return;
    if (id === next.id) { setPicked([...picked, id]); setMiss(null); } else { setMiss(id); setErrors((e) => e + 1); }
  };
  const reset = () => { setTubes(shuffle(DRAW, rng(Math.floor(Math.random() * 2 ** 31)))); setPicked([]); setMiss(null); setErrors(0); };
  return (
    <div data-chrome className="not-prose grid gap-5 rounded-2xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div {...(secondary ? { 'data-simulateur-secondaire': '' } : {})}>
        <p className="font-serif text-lg font-semibold text-navy-900">Tap the tubes in the order you would fill them</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {tubes.map((t) => {
            const pos = picked.indexOf(t.id);
            return (
              <button key={t.id} id={`${idPrefix}-${t.id}`} type="button" aria-pressed={pos >= 0} onClick={() => tap(t.id)}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm ${pos >= 0 ? 'border-emerald-700 bg-emerald-50' : miss === t.id ? 'border-amber-600 bg-amber-50' : 'border-navy-300 hover:border-accent-500'}`}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: t.color, color: t.ink }}>{pos >= 0 ? pos + 1 : ''}</span>
                <span className="text-navy-900">{t.name}</span>
              </button>
            );
          })}
        </div>
        <button type="button" onClick={reset} className="mt-3 rounded-lg border border-navy-300 px-4 py-2 text-sm font-medium text-navy-800 hover:border-accent-500">Shuffle again</button>
      </div>
      <div {...(secondary ? {} : { 'data-resultat': '' })} aria-live="polite" className="h-fit rounded-xl border-l-4 border-accent-500 bg-navy-50 p-4">
        <p className="text-sm font-medium text-navy-600">Tubes placed</p>
        <p className="tabular-nums font-serif text-3xl font-bold text-navy-900">{picked.length} of {DRAW.length}</p>
        <p className="mt-1 text-sm text-navy-700">Wrong taps: {errors}</p>
        <p className="mt-3 text-sm text-navy-800">{done ? 'Complete. Shuffle again and aim for no wrong taps.' : miss ? `Not yet: the next tube is not that one. ${next.why}` : picked.length ? DRAW[picked.length - 1].why : 'Start with the tube that must stay sterile.'}</p>
      </div>
    </div>
  );
}
