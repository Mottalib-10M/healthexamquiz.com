/**
 * Question bank browser: one exam and one outline domain at a time, every question with its answer,
 * explanation and outline point in the HTML (native <details>, readable without JavaScript). First
 * render = the domain of the page at build time; another domain is loaded only when picked.
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import { loadBank } from '../../lib/banks';
import { pool, domainsOf, LABEL, type ExamId, type Question } from '../../lib/engine/exam';

interface Props { exam: ExamId; domain: string; initial: Question[]; total: number; idPrefix?: string }
export default function Bank({ exam, domain: d0, initial, total, idPrefix = 'b' }: Props) {
  const [domain, setDomain] = useState(d0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const pick = async (d: string) => { setDomain(d); setLoading(true); setQs(pool(await loadBank(), exam, d)); setLoading(false); };
  const short = domainsOf(exam).find((d) => d.code === domain)?.short ?? domain;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
      <div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-domain`} label={`${LABEL(exam)} outline domain`} value={domain} onChange={pick} options={domainsOf(exam).map((d) => ({ value: d.code, label: d.short }))} />
          <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
            <span className="mb-1 block text-sm font-medium text-navy-700">Answers</span>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-pressed={open} className="h-12 rounded-lg border border-navy-300 bg-white px-4 text-left text-navy-900 hover:bg-navy-50">{open ? 'Hide all answers' : 'Show all answers'}</button>
            <span />
          </div>
        </form>
        {loading ? <p className="mt-4 text-navy-700">Loading…</p> : (
          <ol data-chrome className="mt-4 space-y-2">
            {qs.map((q, i) => (
              <li key={q.id}>
                <details className="rounded-lg border border-navy-200 bg-white" open={open}>
                  <summary className="cursor-pointer px-4 py-3 font-medium text-navy-900"><span className="tabular-nums mr-2 text-navy-600">{i + 1}.</span>{q.q}</summary>
                  <div className="px-4 pb-4 text-sm text-navy-800">
                    <ul className="mb-2 space-y-1">{q.options.map((o, j) => <li key={j} className={j === q.answer ? 'font-semibold text-green-800' : 'text-navy-700'}>{'ABCD'[j]}. {o}{j === q.answer ? ' (answer)' : ''}</li>)}</ul>
                    <p>{q.explain}</p>
                    <p className="mt-1 text-xs text-navy-600">Outline point: {q.ref}</p>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div data-resultat className="h-fit rounded-lg border-t-4 border-accent-700 bg-navy-50 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{LABEL(exam)} · {short}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{qs.length}</p>
        <p className="text-sm text-navy-700">questions in this domain, {total} for the {LABEL(exam)} in all</p>
        <p className="mt-3 text-xs text-navy-700">Open a question for the four options, the answer, the reasoning and the outline point it trains. Written by Radif Partners; not questions from the real exam.</p>
      </div>
    </div>
  );
}
