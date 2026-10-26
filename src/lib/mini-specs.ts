/**
 * Calculators of the pages (RECETTE §9.3): one subject = one calculation, read from params-2026.json
 * or the engines (exam.ts, pharm.ts, ekg.ts, scores.ts), never a second formula in a page.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { money, formatNumberL, pct, dateL } from './format-l';
import { examOf, atLeast, targetCount, EXAM_IDS, type ExamId } from './engine/exam';
import { convert, daysSupply, dropsDays, insulinDays, doseByWeight, dilution, alligation, ivRate, quantityFor } from './engine/pharm';
import { rateFromBoxes, rateFromStrip, rateBand, intervalSeconds } from './engine/ekg';
import { apgar, apgarBand } from './engine/scores';

const n0 = (v: number, d = 0) => formatNumberL(v, 'en', d);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const plural = (k: number, w: string) => `${n0(k)} ${w}${k === 1 ? '' : 's'}`;
const EXAMS = EXAM_IDS.map((id, i) => ({ value: String(i), label: examOf(id).label }));
const ex = (v: number | undefined): ExamId => EXAM_IDS[clamp(Math.round(v ?? 0), 0, EXAM_IDS.length - 1)];
/** Index of an exam in the select, for page defaults: idx('ptce') = 1. */
export const idx = (e: ExamId) => EXAM_IDS.indexOf(e);
const R = P.rules;
const NHA: ExamId[] = ['excpt', 'ccma', 'cpt', 'cet'];
const ownerOf = (e: ExamId) => examOf(e).owner;
/** First-attempt cost of written + skills (or the bundle) with the state's first vendor. */
export function stateFirst(id: string): number {
  const v = P.cnaStates.find((s) => s.id === id)!.vendors[0] as { written: number | null; skills: number | null; bundle?: number };
  return v.bundle ?? (v.written ?? 0) + (v.skills ?? 0);
}
const hm = (m: number) => { const h = Math.floor(m / 60), r = Math.round(m % 60); return h ? `${h} h${r ? ` ${r} min` : ''}` : `${r} min`; };

const MASS_U = ['mcg', 'mg', 'g', 'kg', 'gr', 'lb'];
const VOL_U = ['mL', 'L', 'tsp', 'tbsp', 'floz', 'cup'];
const UNITS = [...MASS_U, ...VOL_U];
const UNAME: Record<string, string> = { mcg: 'micrograms (mcg)', mg: 'milligrams (mg)', g: 'grams (g)', kg: 'kilograms (kg)', gr: 'grains (gr)', lb: 'pounds (lb)', mL: 'milliliters (mL)', L: 'liters (L)', tsp: 'teaspoons (tsp)', tbsp: 'tablespoons (tbsp)', floz: 'fluid ounces (fl oz)', cup: 'cups' };
const UOPT = UNITS.map((u, i) => ({ value: String(i), label: UNAME[u] }));
const bandText = { below: 'Below 60', within: '60 to 100', above: 'Above 100' } as const;

/** Outcome of each exam's retake rule after a given number of failed attempts. */
export function retakeRule(e: ExamId, failed: number): { wait: string; left: string; note: string } {
  const k = Math.max(1, Math.round(failed));
  if (e === 'ptce') {
    const wait = k <= 2 ? 'None' : k === 3 ? '6 months' : 'After approved preparation';
    return { wait, left: k >= 4 ? 'Needs PTCB approval' : plural(4 - k, 'attempt') + ' before the review step', note: 'PTCB: no wait before the 2nd and 3rd attempts, 6 months before the 4th; after 4 attempts, proof of approved preparation is required.' };
  }
  if (NHA.includes(e)) {
    const wait = k < R.nha.attempts ? `${R.nha.waitDays} days` : '1 year';
    return { wait, left: k < R.nha.attempts ? plural(R.nha.attempts - k, 'attempt') + ' in the first cycle' : 'One per year', note: `NHA: ${R.nha.waitDays} days between attempts, ${R.nha.attempts} attempts, then one year of waiting after each further failure.` };
  }
  if (e === 'cma') return { wait: 'None required', left: k < R.cma.attempts ? plural(R.cma.attempts - k, 'attempt') + ` in ${R.cma.withinMonths} months` : `Wait for the ${R.cma.withinMonths}-month window`, note: `AAMA: up to ${R.cma.attempts} attempts within a ${R.cma.withinMonths}-month period.` };
  if (e === 'emt') return { wait: `${R.emt.waitDays} days`, left: k < R.emt.remedialAfter ? plural(R.emt.remedialAfter - k, 'attempt') + ' before remedial training' : k < R.emt.attempts ? plural(R.emt.attempts - k, 'attempt') + ' after remedial training' : 'Course must be retaken', note: `NREMT: ${R.emt.waitDays} days between attempts; remedial training after ${R.emt.remedialAfter} failures; ${R.emt.attempts} attempts in all.` };
  return { wait: 'Set by the state', left: `At least ${R.cnaFederal.minAttempts} by federal rule`, note: `Federal rule (42 CFR 483.154): at least ${R.cnaFederal.minAttempts} chances to pass; each state sets the window and the fee.` };
}

const SPECS: Record<string, () => MiniSpec> = {
  readiness: () => ({
    title: 'Is my practice score ready for exam day?', cta: 'Check it on a full timed mock', ctaPage: 'ptce-practice-exam',
    inputs: [{ id: 'e', label: 'Exam', def: 1, options: EXAMS }, { id: 'p', label: 'Share right in practice', def: 76, max: 100, unit: '%' }],
    run: (v) => {
      const e = ex(v.e), x = examOf(e), n = x.items, p = clamp(v.p ?? 0, 0, 100) / 100, need = targetCount(e, n);
      const chance = atLeast(n, need, p);
      return { head: ['Chance to reach the study target on a full mock', pct(chance)], tone: chance >= 0.7 ? 'ok' : 'warn', rows: [['Full mock', `${n0(n)} questions, ${hm(x.minutes)}`], ['Study target (ours)', `${need} right, ${pct(x.target)}`], ['Expected right at your rate', n0(Math.round(p * n))]], note: `The target is a study goal set by this site, not the official pass mark (${x.passText.replace('Official pass: ', '')}).` };
    },
  }),
  pace: () => ({
    title: 'Time per question on the real exam', cta: 'Practice at that pace', ctaPage: 'cna-practice-exam',
    inputs: [{ id: 'e', label: 'Exam', def: 0, options: EXAMS }, { id: 'r', label: 'Minutes kept for review', def: 10, max: 120 }],
    run: (v) => {
      const e = ex(v.e), x = examOf(e), keep = clamp(v.r ?? 0, 0, x.minutes - 1), sec = ((x.minutes - keep) * 60) / x.items;
      return { head: ['Seconds per question', n0(sec)], rows: [['Questions', e === 'emt' ? `${(x as { itemsMin?: number }).itemsMin} to ${x.items} (adaptive)` : n0(x.items)], ['Time allowed', hm(x.minutes)], ['Average with no review', `${n0((x.minutes * 60) / x.items)} s`]], note: e === 'emt' ? 'The NREMT exam stops between 70 and 120 items; the pace is worked out for the longest case.' : `${x.label}: ${n0(x.items)} questions, of which ${n0(x.scored)} count toward the score.` };
    },
  }),
  retake: () => ({
    title: 'Waiting time before the next attempt', cta: 'Review the questions you missed', ctaPage: 'review-mistakes',
    inputs: [{ id: 'e', label: 'Exam', def: 1, options: EXAMS }, { id: 'k', label: 'Attempts failed so far', def: 1, max: 10 }],
    run: (v) => {
      const e = ex(v.e), r = retakeRule(e, v.k ?? 1);
      return { head: ['Wait before the next attempt', r.wait], rows: [['Exam owner', ownerOf(e)], ['Attempts left', r.left]], note: r.note };
    },
  }),
  fees: () => ({
    title: 'What the exam costs', cta: 'See every fee and retake rule', ctaPage: 'exam-fees-retakes',
    inputs: [{ id: 'e', label: 'Exam', def: 1, options: EXAMS }, { id: 'k', label: 'Attempts you budget for', def: 1, max: 6 }],
    run: (v) => {
      const e = ex(v.e), x = examOf(e) as ReturnType<typeof examOf> & { feeNonMember?: number }, k = clamp(Math.round(v.k ?? 1), 1, 6);
      if (e === 'cna') return { head: ['Exam fee', 'Set by your state'], rows: [['Example: Texas, Prometric', money(stateFirst('tx'))], ['Example: Michigan, Headmaster', money(stateFirst('mi'))]], note: 'Nurse aide exam fees and vendors change by state: the state table gives ten of them.' };
      if (!x.fee) return { head: ['Exam fee', 'Not published'], rows: [['Exam owner', x.owner], ['Where to see it', 'NHA account or your school']], note: `The NHA did not show its exam fees on a public page on ${dateL(P.retrieved_at)}; schools often pay them.` };
      const nm = x.feeNonMember;
      return { head: [k > 1 ? `Cost of ${k} attempts` : 'Exam fee', money(x.fee * k)], rows: [['One attempt', money(x.fee)], ...(nm ? [['Nonmember, one attempt', money(nm)] as [string, string]] : []), ['Paid to', x.owner]], note: e === 'cma' ? 'AAMA member rate; recent graduates of accredited programs also pay the lower fee within 12 months.' : 'Each attempt is paid again in full.' };
    },
  }),
  convert: () => ({
    title: 'Pharmacy unit converter', cta: 'Train on pharmacy math questions', ctaPage: 'pharmacy-math',
    inputs: [{ id: 'x', label: 'Amount', def: 2, max: 1e7, decimals: 4 }, { id: 'f', label: 'From', def: 8, options: UOPT }, { id: 't', label: 'To', def: 6, options: UOPT }],
    run: (v) => {
      const f = UNITS[clamp(Math.round(v.f ?? 0), 0, UNITS.length - 1)], t = UNITS[clamp(Math.round(v.t ?? 0), 0, UNITS.length - 1)];
      const r = convert(v.x ?? 0, f, t);
      if (r == null) return { head: ['Result', 'Not convertible'], tone: 'warn', rows: [['From', UNAME[f]], ['To', UNAME[t]]], note: 'A mass (mg, g, gr) and a volume (mL, tsp) cannot be converted without the strength of the product, in mg per mL.' };
      return { head: [`${n0(v.x ?? 0, 4)} ${f} =`, `${n0(r, r < 1 ? 4 : 2)} ${t}`], rows: [['1 tsp', `${P.pharmMath.tspMl} mL`], ['1 tbsp', `${P.pharmMath.tbspMl} mL`], ['1 fl oz', `${P.pharmMath.flozMl} mL`]], note: 'Household measures as federal labeling rules round them (21 CFR 101.9); 1 grain is taken as 64.79891 mg and 1 lb as 0.45359237 kg.' };
    },
  }),
  dayssupply: () => ({
    title: 'Days supply of tablets or capsules', cta: 'All pharmacy math', ctaPage: 'pharmacy-math',
    inputs: [{ id: 'q', label: 'Quantity dispensed', def: 90, max: 10000 }, { id: 'd', label: 'Units per dose', def: 1, max: 20, decimals: 2 }, { id: 'f', label: 'Doses per day', def: 2, max: 24 }],
    run: (v) => {
      const days = daysSupply(v.q ?? 0, v.d ?? 0, v.f ?? 0);
      return { head: ['Days supply', plural(days, 'day')], rows: [['Units a day', n0((v.d ?? 0) * (v.f ?? 0), 2)], ['For 30 days', `${n0(quantityFor(30, v.d ?? 0, v.f ?? 0))} units`], ['For 90 days', `${n0(quantityFor(90, v.d ?? 0, v.f ?? 0))} units`]], note: 'Quantity divided by units a day, rounded down to whole days.' };
    },
  }),
  liquid: () => ({
    title: 'Days supply of an oral liquid', cta: 'Days supply for every form', ctaPage: 'days-supply',
    inputs: [{ id: 'm', label: 'Volume dispensed', def: 150, max: 5000, unit: 'mL' }, { id: 'd', label: 'Dose', def: 1, max: 100, decimals: 2 }, { id: 'u', label: 'Dose unit', def: 0, options: [{ value: '0', label: 'teaspoons' }, { value: '1', label: 'mL' }, { value: '2', label: 'tablespoons' }] }, { id: 'f', label: 'Doses per day', def: 3, max: 24 }],
    run: (v) => {
      const per = (v.d ?? 0) * [P.pharmMath.tspMl, 1, P.pharmMath.tbspMl][clamp(Math.round(v.u ?? 0), 0, 2)];
      const days = daysSupply(v.m ?? 0, per, v.f ?? 0);
      return { head: ['Days supply', plural(days, 'day')], rows: [['Dose in mL', `${n0(per, 2)} mL`], ['mL a day', `${n0(per * (v.f ?? 0), 2)} mL`]], note: '1 teaspoon = 5 mL and 1 tablespoon = 15 mL (21 CFR 101.9); days rounded down.' };
    },
  }),
  insulin: () => ({
    title: 'Days supply of insulin', cta: 'Days supply for every form', ctaPage: 'days-supply',
    inputs: [{ id: 'm', label: 'mL dispensed', def: 15, max: 100, unit: 'mL', help: 'Five 3 mL pens = 15 mL' }, { id: 'c', label: 'Units per mL', def: 100, max: 500 }, { id: 'u', label: 'Units a day', def: 40, max: 500 }, { id: 'p', label: 'Priming units a day', def: 0, max: 50 }],
    run: (v) => {
      const total = (v.m ?? 0) * (v.c ?? 0), days = insulinDays(v.m ?? 0, v.c ?? 0, v.u ?? 0, v.p ?? 0);
      return { head: ['Days supply', plural(days, 'day')], rows: [['Units dispensed', n0(total)], ['Units used a day', n0((v.u ?? 0) + (v.p ?? 0))]], note: 'Units in the package divided by units used a day, priming included when the label calls for it; days rounded down.' };
    },
  }),
  drops: () => ({
    title: 'Days supply of eye or ear drops', cta: 'Days supply for every form', ctaPage: 'days-supply',
    inputs: [{ id: 'm', label: 'Bottle size', def: 5, max: 100, unit: 'mL' }, { id: 'g', label: 'Drops per mL', def: 20, max: 40, help: 'Use the count your plan or the label gives' }, { id: 'd', label: 'Drops per eye per dose', def: 1, max: 10 }, { id: 'f', label: 'Doses per day', def: 2, max: 12 }, { id: 'e', label: 'Eyes', def: 2, options: [{ value: '1', label: 'One eye' }, { value: '2', label: 'Both eyes' }] }],
    run: (v) => {
      const days = dropsDays(v.m ?? 0, v.g ?? 0, v.d ?? 0, v.f ?? 0, v.e ?? 1);
      return { head: ['Days supply', plural(days, 'day')], rows: [['Drops in the bottle', n0((v.m ?? 0) * (v.g ?? 0))], ['Drops a day', n0((v.d ?? 0) * (v.f ?? 0) * (v.e ?? 1))]], note: 'No federal rule fixes drops per mL; plans and exam questions state the figure, often between 15 and 20.' };
    },
  }),
  dose: () => ({
    title: 'Dose by body weight', cta: 'More dosage calculations', ctaPage: 'dosage-calculations',
    inputs: [{ id: 'k', label: 'Dose ordered', def: 10, max: 1000, unit: 'mg/kg', decimals: 2 }, { id: 'w', label: 'Weight', def: 44, max: 1000, decimals: 1 }, { id: 'u', label: 'Weight unit', def: 1, options: [{ value: '0', label: 'kg' }, { value: '1', label: 'lb' }] }, { id: 'c', label: 'Strength', def: 50, max: 10000, unit: 'mg/mL', decimals: 2 }],
    run: (v) => {
      const r = doseByWeight(v.k ?? 0, v.w ?? 0, Math.round(v.u ?? 0) === 1 ? 'lb' : 'kg', v.c ?? 0);
      return { head: ['Dose', `${n0(r.mg, 1)} mg`], rows: [['Weight in kg', n0(r.kg, 1)], ['Volume to give', `${n0(r.ml, 2)} mL`]], note: `Pounds are divided by ${P.pharmMath.lbPerKg}, the factor exam questions use. Practice arithmetic only, not a dosing tool.` };
    },
  }),
  dilution: () => ({
    title: 'Dilution with C1 × V1 = C2 × V2', cta: 'More dosage calculations', ctaPage: 'dosage-calculations',
    inputs: [{ id: 'a', label: 'Stock strength', def: 70, max: 100, unit: '%', decimals: 2 }, { id: 'b', label: 'Strength wanted', def: 25, max: 100, unit: '%', decimals: 2 }, { id: 'v', label: 'Final volume', def: 500, max: 100000, unit: 'mL' }],
    run: (v) => {
      const r = dilution(v.a ?? 0, v.b ?? 0, v.v ?? 0);
      if (!r) return { head: ['Stock to use', 'Not possible'], tone: 'warn', rows: [['Check', 'Wanted strength above stock']], note: 'A dilution can only lower the strength.' };
      return { head: ['Stock to use', `${n0(r.stock, 1)} mL`], rows: [['Diluent to add', `${n0(r.diluent, 1)} mL`], ['Final volume', `${n0(v.v ?? 0)} mL`]], note: 'V1 = C2 × V2 ÷ C1; the diluent makes up the rest of the volume.' };
    },
  }),
  alligation: () => ({
    title: 'Alligation: mix two strengths', cta: 'More dosage calculations', ctaPage: 'dosage-calculations',
    inputs: [{ id: 'h', label: 'Higher strength', def: 10, max: 100, unit: '%', decimals: 2 }, { id: 'l', label: 'Lower strength', def: 2, max: 100, unit: '%', decimals: 2 }, { id: 'w', label: 'Strength wanted', def: 5, max: 100, unit: '%', decimals: 2 }, { id: 't', label: 'Total amount', def: 240, max: 100000, unit: 'g' }],
    run: (v) => {
      const r = alligation(v.h ?? 0, v.l ?? 0, v.w ?? 0, v.t ?? 0);
      if (!r) return { head: ['Mix', 'Not possible'], tone: 'warn', rows: [['Check', 'Wanted must sit between the two']], note: 'The strength wanted must be lower than the higher one and higher than the lower one.' };
      return { head: ['Higher strength to use', `${n0(r.high, 1)} g`], rows: [['Lower strength to use', `${n0(r.low, 1)} g`], ['Parts', `${n0(r.pHigh, 2)} : ${n0(r.pLow, 2)}`]], note: 'Parts of the higher = wanted minus lower; parts of the lower = higher minus wanted.' };
    },
  }),
  ivrate: () => ({
    title: 'IV flow rate', cta: 'More dosage calculations', ctaPage: 'dosage-calculations',
    inputs: [{ id: 'v', label: 'Volume', def: 1000, max: 10000, unit: 'mL' }, { id: 'h', label: 'Time', def: 8, max: 72, unit: 'h', decimals: 2 }, { id: 'g', label: 'Drop factor', def: 15, max: 60, unit: 'gtt/mL' }],
    run: (v) => {
      const r = ivRate(v.v ?? 0, (v.h ?? 0) * 60, v.g ?? 0);
      return { head: ['Flow rate', `${n0(r.mlHr, 1)} mL/h`], rows: [['Drops per minute', n0(r.gttMin, 1)], ['Volume per minute', `${n0(r.mlHr / 60, 2)} mL`]], note: 'mL per hour = volume ÷ hours; drops per minute = volume × drop factor ÷ minutes.' };
    },
  }),
  ekgrate: () => ({
    title: 'Heart rate from an EKG strip', cta: 'Train on EKG questions', ctaPage: 'ekg-practice-test',
    inputs: [{ id: 'm', label: 'Method', def: 0, options: [{ value: '0', label: 'Small boxes between two R waves' }, { value: '1', label: 'Large boxes between two R waves' }, { value: '2', label: 'QRS complexes on a 6-second strip' }] }, { id: 'x', label: 'Count', def: 20, max: 300, decimals: 1 }, { id: 's', label: 'Paper speed', def: 25, max: 100, unit: 'mm/s' }],
    run: (v) => {
      const m = Math.round(v.m ?? 0), sp = v.s ?? 0;
      const bpm = m === 2 ? rateFromStrip(v.x ?? 0, 6) : rateFromBoxes(v.x ?? 0, m === 1 ? 'large' : 'small', sp);
      const b = rateBand(bpm);
      return { head: ['Heart rate', `${n0(bpm)} bpm`], tone: b === 'within' ? 'ok' : 'warn', rows: [['Small box', `${n0(intervalSeconds(1, sp), 2)} s`], ['Large box', `${n0(intervalSeconds(5, sp), 2)} s`], ['Adult resting range 60 to 100', bandText[b]]], note: 'Type the speed printed on the strip; a box lasts its width in mm divided by that speed. Exam arithmetic, not a reading of a real tracing.' };
    },
  }),
  apgar: () => {
    const opt = [{ value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' }];
    return {
      title: 'Apgar score', cta: 'Train on EMT questions', ctaPage: 'nremt-practice-test',
      inputs: [{ id: 'a', label: 'Appearance (color)', def: 1, options: opt }, { id: 'p', label: 'Pulse', def: 2, options: opt }, { id: 'g', label: 'Grimace (reflex)', def: 2, options: opt }, { id: 'c', label: 'Activity (tone)', def: 2, options: opt }, { id: 'r', label: 'Respiration', def: 2, options: opt }],
      run: (v) => {
        const t = apgar([v.a, v.p, v.g, v.c, v.r].map((x) => x ?? 0));
        return { head: ['Apgar score', `${t} of 10`], tone: apgarBand(t) === 'normal' ? 'ok' : 'warn', rows: [['Reading', apgarBand(t) === 'normal' ? `${P.apgar.normalMin} or more: normal range` : `Below ${P.apgar.normalMin}: newborn needs attention`], ['Usually scored', 'At 1 and 5 minutes']], note: 'Bands as MedlinePlus states them. A study aid for exam questions.' };
      },
    };
  },
  pulse: () => ({
    title: 'Radial pulse from a timed count', cta: 'Practice the CNA skills', ctaPage: 'cna-skills-list',
    inputs: [{ id: 'b', label: 'Beats counted', def: 36, max: 300 }, { id: 's', label: 'Counted for', def: 1, options: [{ value: '0', label: '15 seconds' }, { value: '1', label: '30 seconds' }, { value: '2', label: '60 seconds' }] }],
    run: (v) => {
      const sec = [15, 30, 60][clamp(Math.round(v.s ?? 1), 0, 2)], bpm = ((v.b ?? 0) * 60) / sec, b = rateBand(bpm);
      return { head: ['Beats per minute', n0(bpm)], tone: b === 'within' ? 'ok' : 'warn', rows: [['Multiplier', `× ${60 / sec}`], ['Adult resting range', bandText[b]]], note: 'MedlinePlus gives 60 to 100 beats a minute for adults at rest. On the skills test, follow the counting time your state handbook asks for.' };
    },
  }),
  io: () => ({
    title: 'Intake in mL from household measures', cta: 'Practice the CNA skills', ctaPage: 'cna-skills-list',
    inputs: [{ id: 'c', label: 'Cups', def: 1, max: 20, decimals: 2 }, { id: 'o', label: 'Fluid ounces', def: 4, max: 200, decimals: 1 }, { id: 'm', label: 'Already in mL', def: 120, max: 10000 }],
    run: (v) => {
      const cup = (v.c ?? 0) * P.pharmMath.cupMl, oz = (v.o ?? 0) * P.pharmMath.flozMl, t = cup + oz + (v.m ?? 0);
      return { head: ['Total intake', `${n0(t)} mL`], rows: [['From cups', `${n0(cup)} mL`], ['From fluid ounces', `${n0(oz)} mL`]], note: `1 cup = ${P.pharmMath.cupMl} mL and 1 fl oz = ${P.pharmMath.flozMl} mL, the federal labeling values (21 CFR 101.9). Use the conversion card your test site provides if it differs.` };
    },
  }),
  studyplan: () => ({
    title: 'Questions a day to cover the bank', cta: 'Track your progress', ctaPage: 'review-mistakes',
    inputs: [{ id: 'e', label: 'Exam', def: 0, options: EXAMS }, { id: 'd', label: 'Days left before the exam', def: 21, max: 365 }, { id: 'p', label: 'Passes over each question', def: 2, max: 5 }],
    run: (v) => {
      const e = ex(v.e), x = examOf(e), days = Math.max(1, Math.round(v.d ?? 1)), passes = Math.max(1, Math.round(v.p ?? 1));
      const mocks = Math.max(1, Math.floor(days / 7));
      const perDay = Math.ceil((x.items * 1.3 * passes) / days);
      return { head: ['Questions a day', n0(perDay)], rows: [['Full mocks to plan', `${mocks}, one a week`], ['Mock length', `${n0(x.items)} questions, ${hm(x.minutes)}`]], note: 'Volume worked out from a pool about 1.3 times the mock length; keep the last two days for review of mistakes only.' };
    },
  }),
};

export function getSpec(kind: string, _lang = 'en'): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini spec: ${kind}`);
  return f();
}
export const SPEC_IDS = Object.keys(SPECS);
