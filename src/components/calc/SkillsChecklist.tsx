/**
 * CNA skills checklist: the official NNAAP skill titles, each with steps written by Radif Partners
 * (cna-skills.json), common opening and closing steps, ticks kept in this browser only, and a draw
 * of a five-skill mock test in the NNAAP pattern (hand hygiene, one measurement skill, three others).
 * First render = the page's skill with nothing ticked; saved ticks are read after mount.
 */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import S from '../../data/cna-skills.json';
import { rng, shuffle } from '../../lib/engine/exam';

type Skill = { id: string; title: string; steps: string[]; always?: boolean; measure?: boolean; wrap?: boolean; state?: string };
const SK = S.skills as Skill[];
const KEY = 'uhe-skills-v1';
export const stepsOf = (s: Skill) => (s.wrap === false ? s.steps : [...S.opening, ...s.steps, ...S.closing]);
export function drawSkills(seed: number): Skill[] {
  const r = rng(seed);
  const hh = SK.find((s) => s.always)!;
  const m = shuffle(SK.filter((s) => s.measure && !s.state), r)[0];
  const rest = shuffle(SK.filter((s) => !s.always && !s.measure), r).slice(0, 3);
  return [hh, m, ...rest];
}

interface Props { skill?: string; idPrefix?: string; secondary?: boolean }
export default function SkillsChecklist({ skill = 'hand-hygiene', idPrefix = 'sk', secondary = false }: Props) {
  const [id, setId] = useState(skill);
  const [ticks, setTicks] = useState<Record<string, boolean[]>>({});
  const [mock, setMock] = useState<Skill[] | null>(null);
  useEffect(() => { try { const t = JSON.parse(localStorage.getItem(KEY) ?? '{}'); if (t && typeof t === 'object') setTicks(t); } catch { /* storage blocked */ } }, []);
  const s = SK.find((x) => x.id === id) ?? SK[0];
  const steps = stepsOf(s);
  const mine = ticks[s.id] ?? [];
  const save = (t: Record<string, boolean[]>) => { setTicks(t); try { localStorage.setItem(KEY, JSON.stringify(t)); } catch { /* storage blocked */ } };
  const toggle = (k: number) => { const a = steps.map((_, j) => !!mine[j]); a[k] = !a[k]; save({ ...ticks, [s.id]: a }); };
  const done = steps.filter((_, j) => mine[j]).length;
  const mastered = SK.filter((x) => { const t = ticks[x.id] ?? []; return stepsOf(x).every((_, j) => t[j]); }).length;
  return (
    <div data-chrome className="not-prose grid gap-5 rounded-2xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_290px]">
      <div>
        <form onSubmit={(e) => e.preventDefault()} {...(secondary ? { 'data-simulateur-secondaire': '' } : {})}>
          <SelectField id={`${idPrefix}-skill`} label="Skill" value={s.id} onChange={setId} options={SK.map((x) => ({ value: x.id, label: x.title }))} />
        </form>
        {s.state && <p className="mt-2 text-xs font-medium text-amber-800">{s.state}: tested only where the state handbook lists it.</p>}
        <ol className="mt-3 space-y-1.5">
          {steps.map((st, k) => (
            <li key={k}>
              <label htmlFor={`${idPrefix}-${s.id}-${k}`} className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-navy-50">
                <input id={`${idPrefix}-${s.id}-${k}`} type="checkbox" checked={!!mine[k]} onChange={() => toggle(k)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#0E5A66]" />
                <span className={mine[k] ? 'text-navy-500 line-through' : 'text-navy-900'}><span className="tabular-nums mr-1 text-navy-500">{k + 1}.</span>{st}</span>
              </label>
            </li>
          ))}
        </ol>
      </div>
      <div {...(secondary ? {} : { 'data-resultat': '' })} aria-live="polite" className="h-fit rounded-xl border-l-4 border-accent-500 bg-navy-50 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-600">Steps practiced</p>
        <p className="tabular-nums font-serif text-3xl font-bold text-navy-900">{done} of {steps.length}</p>
        <p className="mt-1 text-sm text-navy-700">Skills fully ticked: {mastered} of {SK.length}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => save({ ...ticks, [s.id]: [] })} className="rounded-lg border border-navy-300 px-3 py-1.5 text-sm text-navy-800 hover:border-accent-500">Untick this skill</button>
          <button type="button" onClick={() => setMock(drawSkills(Math.floor(Math.random() * 2 ** 31)))} className="rounded-lg bg-accent-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-accent-800">Draw a 5-skill test</button>
        </div>
        {mock && <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-navy-800">{mock.map((m) => <li key={m.id}><button type="button" className="text-left underline" onClick={() => setId(m.id)}>{m.title}</button></li>)}</ol>}
        <p className="mt-3 text-xs text-navy-600">Ticks stay in this browser. Steps are written by us; the evaluator follows your state's checklist.</p>
      </div>
    </div>
  );
}
