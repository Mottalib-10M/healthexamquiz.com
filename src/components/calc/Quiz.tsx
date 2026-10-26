/**
 * The practice engine of the site: practice by outline domain (each answer corrected and explained at
 * once), full mock in the published format (official item count and time, corrections at the end, a
 * question map with flags as on a testing-center screen) and review of the questions missed earlier.
 * First render = the questions drawn at build time for this page (RECETTE §17.5); a new draw, another
 * exam or a shared link only change things after mount. Answers are kept in this browser only
 * (localStorage, lib/progress.ts); nothing is sent.
 */
import { useEffect, useRef, useState } from 'react';
import SelectField from '../ui/SelectField';
import { buildMock, buildPractice, domainsOf, domainFor, examOf, minutesFor, targetCount, shuffle, rng, EXAM_IDS, LABEL, type ExamId, type Question } from '../../lib/engine/exam';
import { loadBank } from '../../lib/banks';
import { recordAnswer, recordRun, mistakes } from '../../lib/progress';
import { readParams, updateURL } from '../../lib/url-state';

type Mode = 'practice' | 'mock' | 'review';
const LETTERS = 'ABCD';

interface Props {
  exam: ExamId; mode?: Mode; domain?: string | null; n?: number; pick?: boolean;
  initial: Question[]; seed: number; idPrefix?: string; secondary?: boolean;
}

export default function Quiz({ exam: e0, mode = 'practice', domain: d0 = null, n: size = 10, pick = false, initial, seed: seed0, idPrefix = 'q', secondary = false }: Props) {
  const [exam, setExam] = useState<ExamId>(e0);
  const [domain, setDomain] = useState<string | null>(d0);
  const [qs, setQs] = useState<Question[]>(initial);
  const [answers, setAnswers] = useState<Array<number | null>>(() => initial.map(() => null));
  const [flags, setFlags] = useState<boolean[]>(() => initial.map(() => false));
  const [cur, setCur] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [empty, setEmpty] = useState(mode === 'review' && initial.length === 0);
  const started = useRef<number | null>(null);
  const seedRef = useRef(seed0);
  const x = examOf(exam);
  const isMock = mode === 'mock';
  const n = qs.length;
  const minutes = minutesFor(exam, Math.max(1, n));

  const draw = async (ex: ExamId, dom: string | null, seed: number) => {
    setLoading(true);
    const bank = await loadBank();
    let next: Question[];
    if (isMock) next = buildMock(bank, ex, seed);
    else if (mode === 'review') { const ids = new Set(mistakes()); next = shuffle(bank.filter((q) => ids.has(q.id) && domainFor(q, ex) != null), rng(seed)).slice(0, size); }
    else next = buildPractice(bank, ex, dom, seed, size);
    seedRef.current = seed;
    setQs(next); setAnswers(next.map(() => null)); setFlags(next.map(() => false)); setCur(0); setDone(false); setLoading(false);
    started.current = null; setLeft(null); setEmpty(mode === 'review' && next.length === 0);
  };
  useEffect(() => {
    if (mode === 'review') { draw(e0, null, Math.floor(Math.random() * 2 ** 31)); return; }
    if (secondary) return;
    const u = readParams(window.location.search); // shared link (?set=…): applied after the first render only
    const s = Number(u.get('set'));
    if (s && s !== seed0) draw(e0, d0, s);
  }, []);
  useEffect(() => { // clock of the mock: starts with the first answer, marks the test at zero
    if (!isMock || done) return;
    const id = window.setInterval(() => {
      if (started.current == null) return;
      const rem = minutes * 60 - Math.floor((Date.now() - started.current) / 1000);
      setLeft(Math.max(0, rem)); if (rem <= 0) setDone(true);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isMock, done, minutes]);

  const answeredN = answers.filter((a) => a !== null).length;
  const right = qs.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const reveal = !isMock || done;
  const target = targetCount(exam, Math.max(1, n));
  const q = qs[cur];
  const a = answers[cur];
  useEffect(() => { // a mock is marked: its answers go to the progress kept in this browser
    if (!done || !answeredN) return;
    if (isMock) qs.forEach((qq, i) => { if (answers[i] !== null) recordAnswer(qq.id, answers[i] === qq.answer); });
    recordRun({ exam, mode, right, total: n, at: new Date().toISOString().slice(0, 10) });
  }, [done]);
  const choose = (i: number) => {
    if (done || (!isMock && a !== null)) return;
    if (started.current == null) started.current = Date.now();
    setAnswers((o) => o.map((v, j) => (j === cur ? i : v)));
    if (!isMock) recordAnswer(q.id, i === q.answer);
  };
  const newSet = () => { const s = Math.floor(Math.random() * 2 ** 31); if (!secondary) updateURL({ set: s }); draw(exam, domain, s); };
  const byDomain = domainsOf(exam).map((d) => {
    const idx = qs.map((v, i) => (domainFor(v, exam) === d.code ? i : -1)).filter((i) => i >= 0);
    return { code: d.code, short: d.short, n: idx.length, r: idx.filter((i) => answers[i] === qs[i].answer).length };
  }).filter((d) => d.n);
  const secs = left == null ? minutes * 60 : left;
  const clock = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  const shown = reveal ? right : answeredN;
  const status = !answeredN ? 'Pick an answer to start' : !reveal ? `${n - answeredN} question${n - answeredN === 1 ? '' : 's'} left to answer` : right >= target ? 'At or above our study target' : `${target - right} more correct to reach our study target`;
  const tone = !answeredN || !reveal ? 'text-navy-800' : right >= target ? 'text-green-800' : 'text-red-700';
  const domName = (code: string) => domainsOf(exam).find((d) => d.code === code)?.short ?? code;
  const qDomain = q ? domainFor(q, exam) : null;

  return (
    <div data-chrome className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
      <form className="space-y-4" onSubmit={(ev) => ev.preventDefault()} {...(secondary ? { 'data-simulateur-secondaire': '' } : {})}>
        {(pick || mode === 'practice') && (
          <div className="grid gap-3 sm:grid-cols-2">
            {pick && <SelectField id={`${idPrefix}-exam`} label="Exam" value={exam} onChange={(v) => { const ex = v as ExamId; setExam(ex); setDomain(null); draw(ex, null, seedRef.current); }} options={EXAM_IDS.map((id) => ({ value: id, label: `${LABEL(id)}: ${examOf(id).name}` }))} />}
            {mode === 'practice' && <SelectField id={`${idPrefix}-domain`} label="Outline domain" value={domain ?? ''} onChange={(v) => { const d = v || null; setDomain(d); draw(exam, d, seedRef.current); }} options={[{ value: '', label: 'All domains, mixed' }, ...domainsOf(exam).map((d) => ({ value: d.code, label: d.short }))]} />}
          </div>
        )}
        <div className="rounded-lg border border-navy-300 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-200 px-4 py-2.5 text-sm text-navy-700">
            <span className="tabular-nums font-medium">{n ? `Question ${cur + 1} of ${n}` : LABEL(exam)}{qDomain && <span className="font-normal text-navy-600"> · {domName(qDomain)}</span>}</span>
            {q && isMock && !done && <button type="button" onClick={() => setFlags((f) => f.map((v, j) => (j === cur ? !v : v)))} aria-pressed={flags[cur]} className={`h-9 rounded border px-3 text-xs font-semibold ${flags[cur] ? 'border-amber-700 bg-amber-50 text-amber-900' : 'border-navy-300 bg-white text-navy-700 hover:bg-navy-50'}`}>{flags[cur] ? 'Flagged' : 'Flag for later'}</button>}
          </div>
          <div className="p-4 sm:p-5">
            {loading && <p className="text-navy-700">Loading the questions…</p>}
            {!loading && empty && <p className="text-navy-700">No missed question is saved in this browser for the {LABEL(exam)} yet. Answer a practice set or a mock first: every question you miss comes back here until you get it right.</p>}
            {q && !loading && (
              <fieldset>
                <legend className="text-lg font-semibold leading-snug text-navy-900">{q.q}</legend>
                <div className="mt-4 grid gap-2">
                  {q.options.map((o, i) => {
                    const picked = a === i, isRight = i === q.answer, open = reveal && a !== null;
                    const cls = !open ? (picked ? 'border-accent-700 bg-accent-50 text-navy-900' : 'border-navy-300 bg-white text-navy-900 hover:border-accent-500') : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-600';
                    return <button key={i} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`flex min-h-12 items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-base ${cls}`}><span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{LETTERS[i]}</span><span>{o}</span></button>;
                  })}
                </div>
                {a !== null && reveal && (
                  <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800" aria-live="polite">
                    <p><strong>{a === q.answer ? 'Right.' : `Not quite: the answer is ${LETTERS[q.answer]}.`}</strong> {q.explain}</p>
                    <p className="mt-1 text-xs text-navy-600">Outline: {examOf(exam).label} · {q.ref}</p>
                  </div>
                )}
                {a !== null && !reveal && <p className="mt-3 text-sm text-navy-700">Answer saved. As on the real exam, the corrections come when you end the test.</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {cur > 0 && <button type="button" onClick={() => setCur(cur - 1)} className="h-12 rounded-lg border border-navy-300 px-4 font-medium text-navy-800 hover:bg-navy-50">Back</button>}
                  {cur < n - 1 && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">Next question</button>}
                  {isMock && !done && answeredN > 0 && <button type="button" onClick={() => setDone(true)} className="h-12 rounded-lg border border-accent-700 px-4 font-semibold text-accent-800 hover:bg-accent-50">End and mark the test</button>}
                  <button type="button" onClick={newSet} className="h-12 rounded-lg border border-navy-300 px-4 font-medium text-navy-800 hover:bg-navy-50">{isMock ? 'New mock' : 'New questions'}</button>
                </div>
              </fieldset>
            )}
          </div>
          {isMock && n > 1 && (
            <div className="border-t border-navy-200 px-4 py-3">
              <p className="mb-2 text-xs font-medium text-navy-700">Question map{flags.some(Boolean) ? ' · amber = flagged' : ''}</p>
              <div className="flex flex-wrap gap-1">
                {qs.map((v, i) => {
                  const st = done ? (answers[i] === v.answer ? 'border-green-700 bg-green-50 text-green-900' : 'border-red-700 bg-red-50 text-red-900') : flags[i] ? 'border-amber-700 bg-amber-50 text-amber-900' : answers[i] !== null ? 'border-accent-700 bg-accent-700 text-white' : 'border-navy-300 bg-white text-navy-700';
                  return <button key={v.id} type="button" onClick={() => setCur(i)} aria-current={i === cur ? 'step' : undefined} aria-label={`Go to question ${i + 1}`} className={`tabular-nums h-8 w-9 rounded border text-xs ${st} ${i === cur ? 'ring-2 ring-navy-900' : ''}`}>{i + 1}</button>;
                })}
              </div>
            </div>
          )}
        </div>
        {done && isMock && (
          <div className="rounded-lg border border-navy-200 bg-white p-4 text-sm">
            {left === 0 && <p className="mb-2 font-medium text-red-700">Time is up: the test was marked as it stood.</p>}
            <p className="font-semibold text-navy-900">Questions to read again</p>
            {qs.every((v, i) => answers[i] === v.answer) ? <p className="mt-2 text-navy-700">None: every answer was right.</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{qs.map((v, i) => (answers[i] !== v.answer ? <li key={v.id}><span className="font-medium">{v.q}</span> Answer: {v.options[v.answer]}. <span className="text-navy-700">{v.explain}</span></li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div {...(secondary ? {} : { 'data-resultat': '' })} aria-live="polite" className="h-fit rounded-lg border-t-4 border-accent-700 bg-navy-50 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{LABEL(exam)} · {isMock ? 'mock exam' : mode === 'review' ? 'review of mistakes' : 'practice'}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{shown}<span className="text-xl font-semibold text-navy-700"> / {reveal ? Math.max(answeredN, 0) : n}</span></p>
        <p className="text-sm text-navy-700">{reveal ? 'correct out of answered' : 'answered'}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(answeredN / Math.max(1, n)) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${tone}`}>{status}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 text-navy-700">Study target: {target} of {n || 0} ({Math.round(x.target * 100)}%), not the official passing score</td></tr>
          {isMock && <tr><td className="tabular-nums py-1.5 text-navy-700">Time left: {clock} of {minutes} min</td></tr>}
          {isMock && <tr><td className="py-1.5 text-navy-700">{x.passText}</td></tr>}
        </tbody></table>
        {reveal && answeredN > 0 && byDomain.length > 1 && (
          <div className="mt-3"><p className="text-sm font-semibold text-navy-900">By outline domain</p>
            <ul className="mt-1 space-y-1.5 text-xs text-navy-700">{byDomain.map((b) => <li key={b.code}><div className="flex justify-between gap-2"><span>{b.short}</span><span className="tabular-nums">{b.r}/{b.n}</span></div><div className="mt-0.5 h-1.5 w-full rounded bg-navy-200" aria-hidden="true"><div className="h-1.5 rounded bg-accent-700" style={{ width: `${(b.r / b.n) * 100}%` }} /></div></li>)}</ul></div>
        )}
        <p className="mt-3 text-xs text-navy-700">Practice questions written by Radif Partners from the public outline; not questions from the real exam. Progress stays in this browser.</p>
      </div>
    </div>
  );
}
