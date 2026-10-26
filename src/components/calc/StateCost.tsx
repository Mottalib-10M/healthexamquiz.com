/**
 * Nurse aide exam cost by state: vendor, fee of each part, retake fees, attempts and format, read on
 * the vendor's or the state's page (params-2026.json `cnaStates`, each with its source).
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import P from '../../data/params-2026.json';
import { money } from '../../lib/format-l';

type Vendor = { vendor: string; written: number | null; skills: number | null; oral: number | null; retakeWritten: number | null; retakeSkills: number | null; bundle?: number; retakeBundle?: number; bundleOral?: number; format: string; source: string };
const S = P.cnaStates as Array<{ id: string; name: string; vendors: Vendor[]; attempts: string; agency: string; stateSource: string }>;
const SRC = P.sources as Record<string, { url: string; label: { en: string } }>;
const m = (x: number | null | undefined) => (x == null ? 'Not listed' : money(x));
export const firstCost = (v: Vendor) => v.bundle ?? ((v.written ?? 0) + (v.skills ?? 0) || null);

interface Props { state?: string; idPrefix?: string; secondary?: boolean }
export default function StateCost({ state = 'ca', idPrefix = 'st', secondary = false }: Props) {
  const [id, setId] = useState(state);
  const [vi, setVi] = useState(0);
  const s = S.find((x) => x.id === id) ?? S[0];
  const v = s.vendors[Math.min(vi, s.vendors.length - 1)];
  const first = firstCost(v);
  return (
    <div data-chrome className="not-prose grid gap-5 rounded-2xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} {...(secondary ? { 'data-simulateur-secondaire': '' } : {})}>
          <SelectField id={`${idPrefix}-state`} label="State" value={s.id} onChange={(x) => { setId(x); setVi(0); }} options={S.map((x) => ({ value: x.id, label: x.name }))} />
          <SelectField id={`${idPrefix}-vendor`} label="Test vendor" value={String(vi)} onChange={(x) => setVi(Number(x))} options={s.vendors.map((x, i) => ({ value: String(i), label: x.vendor }))} />
        </form>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-navy-600">Written exam</dt><dd className="tabular-nums text-right text-navy-900">{m(v.written)}</dd>
          <dt className="text-navy-600">Oral (audio) version</dt><dd className="tabular-nums text-right text-navy-900">{m(v.oral)}</dd>
          <dt className="text-navy-600">Skills exam</dt><dd className="tabular-nums text-right text-navy-900">{m(v.skills)}</dd>
          <dt className="text-navy-600">Retake, written</dt><dd className="tabular-nums text-right text-navy-900">{m(v.retakeWritten)}</dd>
          <dt className="text-navy-600">Retake, skills</dt><dd className="tabular-nums text-right text-navy-900">{m(v.retakeSkills)}</dd>
          {v.retakeBundle != null && <><dt className="text-navy-600">Each new attempt</dt><dd className="tabular-nums text-right text-navy-900">{m(v.retakeBundle)}</dd></>}
        </dl>
        <p className="mt-3 text-sm text-navy-700">{v.format}</p>
        <p className="mt-2 text-sm text-navy-700">{s.attempts}.</p>
        <p className="mt-2 text-xs text-navy-600">Read on <a className="underline" href={SRC[v.source].url} target="_blank" rel="nofollow noopener noreferrer">{SRC[v.source].label.en}</a> and <a className="underline" href={SRC[s.stateSource].url} target="_blank" rel="nofollow noopener noreferrer">{s.agency}</a>.</p>
      </div>
      <div {...(secondary ? {} : { 'data-resultat': '' })} aria-live="polite" className="h-fit rounded-xl border-l-4 border-accent-500 bg-navy-50 p-4">
        <p className="text-sm font-medium text-navy-600">First attempt, written and skills</p>
        <p className="tabular-nums font-serif text-3xl font-bold text-navy-900">{first ? money(first) : 'Not published'}</p>
        {v.bundleOral && <p className="mt-1 text-sm text-navy-700">With the oral version: {money(v.bundleOral)}</p>}
        <p className="mt-2 text-sm text-navy-700">{s.name}, {v.vendor}</p>
        <p className="mt-2 text-xs text-navy-600">Training programs and employers often pay this fee. Check the vendor's current page before you pay.</p>
      </div>
    </div>
  );
}
