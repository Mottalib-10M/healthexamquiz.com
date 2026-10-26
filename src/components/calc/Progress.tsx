/**
 * Progress kept in this browser: questions answered per exam and domain, share right at the last
 * attempt, questions to review and the last mocks. Server render = empty board (nothing is known at
 * build time); the saved progress is read after mount. One button wipes it. Nothing is ever sent.
 */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import { loadBank } from '../../lib/banks';
import { loadSeen, loadRuns, clearProgress, type Seen, type Run } from '../../lib/progress';
import { pool, domainsOf, examOf, EXAM_IDS, LABEL, type ExamId, type Question } from '../../lib/engine/exam';

interface Props { exam: ExamId; reviewHref?: string; idPrefix?: string; secondary?: boolean }
export default function Progress({ exam: e0, reviewHref, idPrefix = 'pg', secondary = false }: Props) {
  const [exam, setExam] = useState<ExamId>(e0);
  const [bank, setBank] = useState<Question[] | null>(null);
  const [seen, setSeen] = useState<Record<string, Seen>>({});
  const [runs, setRuns] = useState<Run[]>([]);
  useEffect(() => { setSeen(loadSeen()); setRuns(loadRuns()); loadBank().then(setBank); }, []);
  const rows = domainsOf(exam).map((d) => {
    const p = bank ? pool(bank, exam, d.code) : [];
    const done = p.filter((q) => seen[q.id]);
    const ok = done.filter((q) => seen[q.id].last === 1).length;
    return { code: d.code, short: d.short, size: p.length, done: done.length, ok, share: d.share };
  });
  const tot = rows.reduce((a, r) => ({ size: a.size + r.size, done: a.done + r.done, ok: a.ok + r.ok }), { size: 0, done: 0, ok: 0 });
  const toReview = tot.done - tot.ok;
  const mocks = runs.filter((r) => r.exam === exam && r.mode === 'mock').slice(-5).reverse();
  const share = tot.done ? Math.round((tot.ok / tot.done) * 100) : 0;
  return (
    <div data-chrome className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
      <div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} {...(secondary ? { 'data-simulateur-secondaire': '' } : {})}>
          <SelectField id={`${idPrefix}-exam`} label="Exam" value={exam} onChange={(v) => setExam(v as ExamId)} options={EXAM_IDS.map((id) => ({ value: id, label: `${LABEL(id)}: ${examOf(id).name}` }))} />
          <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
            <span className="mb-1 block text-sm font-medium text-navy-700">Saved in this browser</span>
            <button type="button" onClick={() => { clearProgress(); setSeen({}); setRuns([]); }} className="h-12 rounded-lg border border-navy-300 bg-white px-4 text-left text-navy-900 hover:bg-navy-50">Erase my progress</button>
            <span />
          </div>
        </form>
        <div className="mt-4 overflow-x-auto"><table className="journal w-full text-sm">
          <thead><tr><th scope="col" className="px-3 py-2 text-left">Outline domain</th><th scope="col" className="px-3 py-2 text-right">Weight</th><th scope="col" className="px-3 py-2 text-right">Practiced</th><th scope="col" className="px-3 py-2 text-right">Right last time</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r.code}><td className="border-b border-navy-100 px-3 py-2">{r.short}</td><td className="tabular-nums border-b border-navy-100 px-3 py-2 text-right">{Math.round(r.share * 100)}%</td><td className="tabular-nums border-b border-navy-100 px-3 py-2 text-right">{r.done} / {r.size}</td><td className="tabular-nums border-b border-navy-100 px-3 py-2 text-right">{r.done ? `${Math.round((r.ok / r.done) * 100)}%` : '–'}</td></tr>)}</tbody>
        </table></div>
        {mocks.length > 0 && <div className="mt-4 text-sm"><p className="font-semibold text-navy-900">Last {LABEL(exam)} mocks</p><ul className="mt-1 space-y-1 text-navy-700">{mocks.map((r, i) => <li key={i} className="tabular-nums">{r.at}: {r.right} / {r.total} ({Math.round((r.right / Math.max(1, r.total)) * 100)}%)</li>)}</ul></div>}
      </div>
      <div {...(secondary ? {} : { 'data-resultat': '' })} aria-live="polite" className="h-fit rounded-lg border-t-4 border-accent-700 bg-navy-50 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{LABEL(exam)}: questions practiced</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{tot.done}<span className="text-xl font-semibold text-navy-700"> / {tot.size}</span></p>
        <p className="text-sm text-navy-700">{tot.done ? `${share}% right at the last attempt` : 'Nothing saved in this browser yet'}</p>
        <p className="mt-3 text-sm text-navy-800">{toReview} question{toReview === 1 ? '' : 's'} to review{reviewHref && toReview > 0 ? <> · <a href={reviewHref} className="underline">review them now</a></> : null}</p>
        <p className="mt-3 text-xs text-navy-700">Kept in this browser only (local storage): another browser or a private window starts empty, and nothing is sent to anyone.</p>
      </div>
    </div>
  );
}
