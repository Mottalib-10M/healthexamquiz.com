import { definePage } from '../../lib/guide-types';

type V = { vendor: string; written: number | null; skills: number | null; oral: number | null; retakeWritten: number | null; retakeSkills: number | null; bundle?: number; bundleOral?: number; retakeBundle?: number; source: string };

export default definePage({
  id: 'cna-exam-cost',
  group: 'cna',
  order: 17,
  tool: { kind: 'states', props: { state: 'tx' } },
  mini: { kind: 'mini:fees', props: { e: 0 } },
  related: ['cna-state-exam', 'cna-exam', 'exam-fees-retakes', 'cna-exam-difficulty'],
  sources: ['ecfr_483_152', 'ecfr_483_154', 'credentia_fees', 'prometric_tx', 'prometric_ny', 'siuc_il'],
  demarche: true,
  en: {
    slug: 'cna-exam-cost',
    nav: 'CNA exam cost',
    card: 'What the nurse aide exam costs in ten states, what a retake costs, and when federal rules say you cannot be charged.',
    title: 'CNA Exam Cost 2026: Fees by State, Retakes and Who Pays',
    description: 'CNA exam cost 2026: written, oral and skills fees in ten states, the price of a retake, and the federal rule that bars charging aides a nursing home has hired.',
    h1: 'What the CNA exam costs, and who pays',
    intro: 'Pick a state to see each fee and its source. Below: a ten-state comparison, the cost of a failed part, and your rights on payment.',
    resume: (h) => {
      const tx = h.state('tx').vendors[0] as V, mi = h.state('mi').vendors[0] as V, ga = h.state('ga').vendors[0] as V;
      return `The nurse aide exam has no national price: each state contracts with a testing vendor and the fee follows that contract. On the vendor pages read on ${h.read}, a first attempt at both parts costs ${h.usd((tx.written ?? 0) + (tx.skills ?? 0))} in Texas with Prometric (${h.usd(tx.written ?? 0)} written, ${h.usd(tx.skills ?? 0)} skills), ${h.usd(ga.bundle ?? 0)} in Georgia with Credentia and ${h.usd(mi.bundle ?? 0)} in Michigan with Headmaster. The skills part is almost always the more expensive one, because an evaluator and a room are needed for each candidate. A retake is paid again, usually only for the part that was failed, at the same price as the first attempt in most states. Federal rules limit who can be charged: under 42 CFR 483.152 and 483.154, an aide who is employed by a nursing facility, or has an offer from one, on the day the program or evaluation begins cannot be charged for any part of it, and a state must arrange pro rata reimbursement for an aide hired by a facility within 12 months of completing a training and competency evaluation program.`;
    },
    faqs: (h) => {
      const ca = h.state('ca').vendors[0] as V, oh = h.state('oh').vendors[0] as V;
      return [
        { q: 'Can a nursing home charge me for the CNA exam?', a: 'Not if it already employs you, or has offered you a job, on the date your evaluation begins. Federal rules forbid charging such an aide for any portion of the training and competency evaluation program, textbooks included. If a facility that hired you asks you to pay, ask the administrator in writing which rule they rely on, and contact your state nurse aide program if needed.' },
        { q: 'Can I get my exam fee back if I am hired after paying it?', a: 'Possibly. When someone who was not employed by a facility gets a job or an offer from one within 12 months of completing a training and competency evaluation program, federal rules require the state to provide for reimbursement of the costs, on a pro rata basis while the person works as an aide. Keep every receipt and ask your employer how the state handles it.' },
        { q: 'Does a CNA retake cost the same as the first attempt?', a: 'In most of the states we track, yes: the retake fee for each part equals the first fee. New York is the main exception, because its first attempt is sold as a bundle while each retake is priced by part. Illinois charges one fee per attempt for both parts together. Add a possible second attempt at the skills part when you budget.' },
        { q: 'Does the oral version cost more than the written test?', a: `Sometimes. In California the oral NNAAP costs ${h.usd(ca.oral ?? 0)} against ${h.usd(ca.written ?? 0)} for the written test, and Ohio's Headmaster oral is ${h.usd(oh.oral ?? 0)} against ${h.usd(oh.written ?? 0)}. In Texas, Florida and Georgia the two cost the same. The choice is yours under federal rules, so do not let a small fee difference push you toward the version that suits you less.` },
      ];
    },
    body: (h) => {
      const first = (v: V) => v.bundle ?? (v.written ?? 0) + (v.skills ?? 0);
      const retake = (v: V) => (v.retakeBundle ? `${h.usd(v.retakeBundle)} per attempt` : `${v.retakeWritten ? h.usd(v.retakeWritten) : 'n/a'} / ${v.retakeSkills ? h.usd(v.retakeSkills) : 'n/a'}`);
      const rows = h.P.cnaStates.map((s) => {
        const v = s.vendors[0] as V;
        return [s.name, v.vendor.replace(' (NNAAP)', '').replace('D&S Diversified Technologies ', ''), h.usd(first(v)), retake(v)];
      });
      const tx = h.state('tx').vendors[0] as V, ny = h.state('ny').vendors[0] as V, il = h.state('il').vendors[0] as V;
      const two = (tx.written ?? 0) + (tx.skills ?? 0) + (tx.retakeSkills ?? 0);
      return `
<h2>Ten states side by side</h2>
<p>The table gives the first vendor listed for each state. Where a state sells both parts together, the first attempt shows that bundle price. The last column gives the retake fee for the written part, then the skills part.</p>
${h.table(['State', 'Vendor', 'First attempt, both parts', 'Retake written / skills'], rows, `Vendor fee pages and handbooks read on ${h.read}. California also has two other vendors with their own fees, shown in the state tool above.`, ['l', 'l', 'r', 'r'])}
<p>The spread is wide, but the price says nothing about difficulty. It reflects each state's contract with its vendor, not the content of the test, and a few states sell both parts as one bundle.</p>
<h2>What a failed part adds</h2>
<p>Budget for the realistic case, not the best one. A candidate in Texas who passes the written test but must repeat the skills part pays ${h.usd(tx.written ?? 0)} plus ${h.usd(tx.skills ?? 0)}, then ${h.usd(tx.retakeSkills ?? 0)} again: ${h.usd(two)} in all (${h.src('prometric_tx', 'Prometric Texas bulletin')}). In New York the first attempt comes as a bundle of ${h.usd(ny.bundle ?? 0)}, or ${h.usd(ny.bundleOral ?? 0)} with the oral version, while retakes are priced by part: ${h.usd(ny.retakeWritten ?? 0)} for the written test and ${h.usd(ny.retakeSkills ?? 0)} for the skills (${h.src('prometric_ny', 'Prometric New York bulletin')}). In Illinois there is a single fee of ${h.usd(il.bundle ?? 0)} per attempt (${h.src('siuc_il', 'Illinois nurse aide testing')}).</p>
<p>Count time as well as money. A retake means a new appointment, seats at regional sites are not always available the next week, and your attempt window keeps running while you wait. Book the retake as soon as your result arrives, even if you plan to practise for a few weeks first.</p>
<p>The fee calculator near the top lets you add attempts to see the total. The cheapest exam is the one you pass the first time, and the skills part is where an extra attempt costs most, so the practice hours you put into the checklist are the best money you will save.</p>
<h2>Who is allowed to charge you</h2>
<p>Federal law protects aides who are already hired. Under ${h.src('ecfr_483_152', '42 CFR 483.152')}, a nurse aide who is employed by a facility, or has received an offer of employment from one, on the date the training and competency evaluation program begins may not be charged for any portion of it, including textbooks and required materials. ${h.src('ecfr_483_154', '42 CFR 483.154')} repeats the rule for the competency evaluation alone.</p>
<p>A second rule covers people who paid first and were hired later. If someone not employed by a facility gets a job or a job offer from one within 12 months of completing a training and competency evaluation program, the state must provide for reimbursement of the costs, on a pro rata basis during the period the person works as a nurse aide. How the refund is made differs by state, so ask your employer or the state program, and keep your receipts.</p>
<h2>Other costs to plan for</h2>
<ul>
<li><strong>Training.</strong> The program itself is a separate cost from the exam, and its price varies widely. A facility based program may cost an employed trainee nothing, under the rule above.</li>
<li><strong>Travel.</strong> Test sites are regional. Count transport, and possibly a missed shift.</li>
<li><strong>Rescheduling and no-shows.</strong> Vendors set deadlines to move a date; missing your appointment usually forfeits the fee. Read the policy in your handbook before you book.</li>
<li><strong>Registry renewal.</strong> Renewal rules, proof of paid work and any fee are set by each state registry. Check yours once you pass.</li>
</ul>
<h2>Paying the right body</h2>
<p>Fees go to the vendor named by your state, often through your training program, which may pay on your behalf. California candidates, for example, can test with Credentia (${h.src('credentia_fees', 'Credentia fee page')}) or another approved vendor. This site does not collect any fee and is not affiliated with any vendor or state. To find your vendor before paying, use the ${h.a('cna-state-exam', 'state guide')}; for every certification on this site, the ${h.a('exam-fees-retakes', 'fees and retakes page')} compares the costs.</p>`;
    },
  },
});
