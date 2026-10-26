/**
 * Page calculator (RECETTE §9.3): a few fields on the left, the answer in large type on the right with
 * two to four lines of working, and a link to the page that goes further. The arithmetic lives in the
 * engines (lib/engine/*) through `lib/mini-specs.ts`. First render = build defaults (§17.5). Nothing
 * typed here leaves the browser.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { getSpec } from '../../lib/mini-specs';

interface Props { kind: string; href?: string; defaults?: Record<string, number>; primary?: boolean; idPrefix?: string }

export default function MiniSim({ kind, href, defaults = {}, primary = false, idPrefix = 'm' }: Props) {
  const spec = getSpec(kind);
  const [v, setV] = useState<Record<string, number>>(() => Object.fromEntries(spec.inputs.map((i) => [i.id, defaults[i.id] ?? i.def])));
  const out = useMemo(() => spec.run(v), [v, spec]);
  const set = (id: string) => (x: number) => setV((o) => ({ ...o, [id]: x }));
  const fid = (i: string) => `${idPrefix}-${kind}-${i}`;
  const tone = out.tone === 'warn' ? 'border-amber-600' : out.tone === 'ok' ? 'border-emerald-700' : 'border-accent-500';
  return (
    <div data-chrome data-mini={kind} className={`not-prose rechner-mini rounded-2xl border border-navy-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <p className="font-serif text-lg font-semibold text-navy-900">{spec.title}</p>
      <div className="mt-3 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="grid content-start gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          {spec.inputs.map((i) => i.options
            ? <SelectField key={i.id} id={fid(i.id)} label={i.label} value={String(v[i.id])} onChange={(x) => set(i.id)(Number(x))} options={i.options} help={i.help} className={spec.inputs.length === 1 || i.options.some((o) => o.label.length > 22) ? 'sm:col-span-2' : ''} />
            : <NumberField key={i.id} id={fid(i.id)} label={i.label} value={v[i.id]} onChange={set(i.id)} unit={i.unit} max={i.max} decimals={i.decimals} help={i.help} />)}
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className={`rounded-xl border-l-4 bg-navy-50 p-4 ${tone}`}>
          <p className="text-sm font-medium text-navy-600">{out.head[0]}</p>
          <p className="tabular-nums mt-1 font-serif text-3xl font-bold text-navy-900">{out.head[1]}</p>
          <dl className="mt-3 divide-y divide-navy-200 text-sm">
            {out.rows.map(([l, x]) => <div key={l} className="flex justify-between gap-3 py-1.5"><dt className="text-navy-600">{l}</dt><dd className="tabular-nums text-right text-navy-900">{x}</dd></div>)}
          </dl>
          {out.note && <p className="mt-2 text-xs text-navy-600">{out.note}</p>}
        </div>
      </div>
      {href && spec.cta && <a href={href} className="mt-4 inline-block text-sm font-medium text-accent-700 underline-offset-2 hover:underline">{spec.cta} →</a>}
    </div>
  );
}
