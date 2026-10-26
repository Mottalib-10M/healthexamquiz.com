import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'pharmacy-technician-exam',
  group: 'pharm',
  order: 37,
  tool: { kind: 'mini:pace', props: { e: 2 } },
  mini: { kind: 'quiz', props: { exam: 'excpt', domain: 'disp', n: 5 } },
  related: ['ptcb-exam', 'excpt-practice-test', 'pharmacy-technician-certification', 'pharmacy-tech-practice-test'],
  sources: ['ptcb_cpht', 'ptcb_outline', 'nha_excpt_plan', 'nha_handbook', 'ptcb_guidebook'],
  en: {
    slug: 'pharmacy-technician-exam',
    nav: 'Pharmacy technician exam',
    card: 'The PTCE and the ExCPT compared: length, time, domains, scoring, eligibility and retakes, side by side.',
    title: 'Pharmacy Technician Exam 2026: PTCE vs ExCPT Compared',
    description: 'Pharmacy technician exam 2026: the PTCE and the ExCPT side by side, questions, time, domains, scores, eligibility and retake waits, to choose the right one.',
    h1: 'Pharmacy technician exam: PTCE or ExCPT?',
    intro: 'Pick either exam in the calculator to see the time per question. Below, the two national exams compared point by point.',
    resume: (h) => {
      const a = h.X('ptce'), b = h.X('excpt');
      return `Two national exams certify pharmacy technicians. The PTCE, written by the Pharmacy Technician Certification Board, has ${a.items} questions (${a.scored} scored) in ${h.time('ptce')}, is delivered by Pearson VUE, costs ${h.usd(a.fee)} and is scored from 1,000 to 1,600 with ${a.passText.replace('Official pass: scaled score of ', '').replace(/ \(.*\)/, '')} to pass. The ExCPT, written by the National Healthcareer Association, has ${b.items} questions (${b.scored} scored) in ${h.time('excpt')}, is scored from 200 to 500 with 390 to pass, and its fee was not shown on a public NHA page on ${h.read}. Both lead to a certified pharmacy technician credential. The PTCE gives its largest domain to medications; the ExCPT to the dispensing process, at ${h.pc(b.domains.find((d) => d.code === 'disp')!.share)}. Eligibility differs: the PTCB accepts a recognized program or ${h.num(h.R.ptce.workHours)} hours of work; the NHA a program within five years or ${h.num(h.R.nha.pharmHours)} hours of supervised work in three years. Retakes differ too, from no wait at the PTCB to ${h.R.nha.waitDays} days at the NHA.`;
    },
    faqs: () => [
      { q: 'Do employers prefer the PTCE or the ExCPT?', a: 'Many employers accept either, since both lead to a certified pharmacy technician credential. Some hospital systems and some state boards name one or the other in their requirements. Read the technician page of your state board of pharmacy and a few local job postings: they settle the question for your situation better than any national rule.' },
      { q: 'Is one of the two exams shorter?', a: 'The PTCE is shorter: fewer questions and less time. The ExCPT has more questions but gives slightly more time per question. In practice both leave a little over a minute per question, so pacing advice is the same: move quickly through recall items to bank time for calculations and long scenarios.' },
      { q: 'Can I switch to the other exam after failing one?', a: 'Yes, nothing prevents you from applying to the other certifier if you meet its eligibility rules. Before switching, look at your score report by domain: if the weak areas are drug knowledge or calculations, they will weigh on the other exam as well. Switching helps most when the other exam weights your strong areas more.' },
    ],
    body: (h) => {
      const a = h.X('ptce'), b = h.X('excpt');
      const rows = [
        ['Certifier', a.owner, b.owner],
        ['Questions', `${a.items} (${a.scored} scored)`, `${b.items} (${b.scored} scored)`],
        ['Time', h.time('ptce'), h.time('excpt')],
        ['Score', a.passText.replace('Official pass: ', ''), b.passText.replace('Official pass: ', '')],
        ['Fee', h.usd(a.fee), 'Not published on a public page'],
        ['Wait after a failure', 'None for the 2nd and 3rd attempts', `${h.R.nha.waitDays} days`],
      ];
      return `
<h2>Side by side</h2>
${h.table(['', 'PTCE', 'ExCPT'], rows, `PTCB pages and NHA test plan and handbook (archived copy), read on ${h.read}.`, ['l', 'l', 'l'])}
<h2>How the content is weighted</h2>
<p>The ${h.src('ptcb_outline', 'PTCE outline')} has four domains: medications ${h.pc(a.domains[0].share)}, federal requirements ${h.pc(a.domains[1].share, 2)}, patient safety ${h.pc(a.domains[2].share, 2)} and order entry ${h.pc(a.domains[3].share, 1)}. The ${h.src('nha_excpt_plan', 'ExCPT test plan')} has five: dispensing ${h.pc(b.domains[3].share)}, role and duties ${h.pc(b.domains[0].share)}, laws ${h.pc(b.domains[1].share)}, safety ${h.pc(b.domains[4].share)} and drugs ${h.pc(b.domains[2].share)}. In short, the PTCE asks more about drugs, the ExCPT more about the workflow of dispensing and the technician's duties.</p>
<h2>Eligibility</h2>
<p>For the PTCE, the ${h.src('ptcb_guidebook', 'PTCB guidebook')} accepts a PTCB-recognized education or training program, or ${h.num(h.R.ptce.workHours)} hours of work as a technician. For the ExCPT, the NHA candidate handbook (archived copy) accepts, after a high school diploma or equivalent, a training program completed within five years or ${h.num(h.R.nha.pharmHours)} hours of supervised work in the last three years. If you trained in a program, check whether it is PTCB-recognized; if you trained on the job, compare the hours you have with each threshold.</p>
<h2>Retakes and renewal</h2>
<p>The PTCB lets you retake twice without waiting, then asks six months before a fourth attempt. The NHA asks ${h.R.nha.waitDays} days between attempts and a year after ${h.R.nha.attempts} attempts. Both credentials renew every two years with ${h.R.ptce.renewCE} hours of continuing education.</p>
<h2>Choosing</h2>
<ol>
<li>Check your state board of pharmacy: if it names one exam, the choice is made.</li>
<li>Check local postings and your employer.</li>
<li>If both are open, take a short practice set of each on the ${h.a('pharmacy-tech-practice-test', 'combined practice test')} and see which weighting suits you.</li>
</ol>
<p>The ${h.a('ptcb-exam', 'PTCB exam guide')} and the ${h.a('excpt-practice-test', 'ExCPT page')} go further on each.</p>`;
    },
  },
});
