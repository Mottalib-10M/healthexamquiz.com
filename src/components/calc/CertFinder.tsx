/**
 * "Which certification?": a job goal → the exams that lead to it, who runs them, the official route to
 * eligibility, the fee and the renewal cycle, all read from params-2026.json. No school or course is
 * named or recommended.
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import P from '../../data/params-2026.json';
import { money } from '../../lib/format-l';
import { examOf, type ExamId } from '../../lib/engine/exam';

const R = P.rules;
const n = (x: number) => x.toLocaleString('en-US');
export const ROUTES: Record<ExamId, { route: string; renew: string }> = {
  cna: { route: `A state-approved training program of at least ${R.cnaFederal.trainingHours} hours, ${R.cnaFederal.clinicalHours} of them supervised practical training (federal minimum; many states ask more)`, renew: `Listed on the state registry; after ${R.cnaFederal.lapseMonths} consecutive months without paid nursing work, new training or a new evaluation is required` },
  ptce: { route: `A PTCB-recognized program, or ${n(R.ptce.workHours)} hours of work as a pharmacy technician`, renew: `Every ${R.ptce.renewYears} years, ${R.ptce.renewCE} hours of continuing education, ${money(R.ptce.renewFee)}` },
  excpt: { route: `A training program finished within 5 years, or ${n(R.nha.pharmHours)} hours of supervised work in the last 3 years`, renew: `Every ${R.nha.renewYears} years, ${R.nha.pharmRenewCE} hours of continuing education` },
  ccma: { route: 'A training program finished within 5 years, or one year of supervised work in the last three', renew: `Every ${R.nha.renewYears} years, ${R.nha.renewCredits} continuing education credits` },
  cma: { route: 'A medical assisting program accredited by CAAHEP or ABHES (other routes are narrow)', renew: `Every ${R.cma.renewMonths} months, ${R.cma.renewCEU} continuing education units or a new exam` },
  cpt: { route: `A training program or one year of work, plus ${R.nha.cptVenipunctures} venipunctures and ${R.nha.cptCapillary} capillary sticks on live people`, renew: `Every ${R.nha.renewYears} years, ${R.nha.renewCredits} continuing education credits` },
  cet: { route: `A training program or one year of work, plus ${R.nha.cetEkgs} EKGs on live people`, renew: `Every ${R.nha.renewYears} years, ${R.nha.renewCredits} continuing education credits` },
  emt: { route: `A state-approved EMT course finished within ${R.emt.courseWithinYears} years, and a state-approved skills exam`, renew: `Every ${R.emt.renewYears} years, with continuing education` },
};
export const GOALS: Array<{ label: string; exams: ExamId[]; note: string }> = [
  { label: 'Give daily care in a nursing home or hospital', exams: ['cna'], note: 'Nurse aides in nursing homes that take Medicare or Medicaid must pass a state competency evaluation: a written (or oral) part and a skills part.' },
  { label: 'Fill prescriptions in a pharmacy', exams: ['ptce', 'excpt'], note: 'Both lead to the CPhT credential; many state boards accept either. Check what your state board of pharmacy requires.' },
  { label: 'Assist providers in a clinic or doctor’s office', exams: ['ccma', 'cma'], note: 'The CCMA (NHA) accepts work experience; the CMA (AAMA) asks for an accredited program in most cases.' },
  { label: 'Draw blood in a lab, clinic or hospital', exams: ['cpt'], note: 'A few states (California among them) license phlebotomists themselves; elsewhere employers choose the credential.' },
  { label: 'Record EKGs in a hospital or cardiology office', exams: ['cet'], note: 'Employers set the requirement; the CET is one of the national credentials they accept.' },
  { label: 'Respond to emergency calls on an ambulance', exams: ['emt'], note: 'The state issues the license; many states use the NREMT exams for it.' },
];

interface Props { goal?: number; idPrefix?: string; secondary?: boolean; links?: Partial<Record<ExamId, string | undefined>> }
export default function CertFinder({ goal = 0, idPrefix = 'cf', secondary = false, links = {} }: Props) {
  const [g, setG] = useState(goal);
  const G = GOALS[g] ?? GOALS[0];
  return (
    <div data-chrome className="not-prose grid gap-5 rounded-2xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <form onSubmit={(e) => e.preventDefault()} {...(secondary ? { 'data-simulateur-secondaire': '' } : {})}>
          <SelectField id={`${idPrefix}-goal`} label="The job you want" value={String(g)} onChange={(x) => setG(Number(x))} options={GOALS.map((x, i) => ({ value: String(i), label: x.label }))} />
        </form>
        <p className="mt-3 text-sm text-navy-700">{G.note}</p>
      </div>
      <div {...(secondary ? {} : { 'data-resultat': '' })} aria-live="polite" className="space-y-3">
        {G.exams.map((e) => {
          const x = examOf(e);
          return (
            <div key={e} className="rounded-xl border-l-4 border-accent-500 bg-navy-50 p-4">
              <p className="text-sm font-medium text-navy-600">{x.owner}</p>
              <p className="font-serif text-2xl font-bold text-navy-900">{x.label}</p>
              <dl className="mt-2 space-y-1 text-sm">
                <div><dt className="inline text-navy-600">Exam: </dt><dd className="inline text-navy-900">{e === 'emt' ? '70 to 120' : n(x.items)} questions, {Math.round(x.minutes)} minutes</dd></div>
                <div><dt className="inline text-navy-600">Fee: </dt><dd className="inline text-navy-900">{e === 'cna' ? 'set by the state' : x.fee ? money(x.fee) : 'not published by the NHA'}</dd></div>
                <div><dt className="inline text-navy-600">To qualify: </dt><dd className="inline text-navy-900">{ROUTES[e].route}</dd></div>
                <div><dt className="inline text-navy-600">Renewal: </dt><dd className="inline text-navy-900">{ROUTES[e].renew}</dd></div>
              </dl>
              {links[e] && <a href={links[e]} className="mt-2 inline-block text-sm font-medium text-accent-700 hover:underline">Practice for the {x.label} →</a>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
