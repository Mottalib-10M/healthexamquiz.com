import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ptcb-exam-cost',
  group: 'pharm',
  order: 33,
  tool: { kind: 'mini:fees', props: { e: 1, k: 1 } },
  mini: { kind: 'mini:retake', props: { e: 1 } },
  related: ['ptcb-exam', 'exam-fees-retakes', 'pharmacy-technician-certification', 'ptcb-exam-difficulty'],
  sources: ['ptcb_cpht', 'ptcb_guidebook', 'ptcb_renewal'],
  demarche: true,
  en: {
    slug: 'ptcb-exam-cost',
    nav: 'PTCB exam cost',
    card: 'The PTCE fee, the cost of each retake and the waits between them, and what renewal costs every two years.',
    title: 'PTCB Exam Cost 2026: PTCE Fee, Retakes and Renewal Price',
    description: 'PTCB exam cost 2026: the PTCE fee per attempt, what retakes add, the wait before a fourth attempt and the two-year CPhT renewal fee, read on the PTCB site.',
    h1: 'What the PTCB exam costs, retakes included',
    intro: 'Set the number of attempts you want to budget for: the calculator multiplies the official fee. The second one gives the wait before your next attempt.',
    resume: (h) => {
      const x = h.X('ptce'), R = h.R.ptce;
      return `The PTCE, the exam of the Pharmacy Technician Certification Board, costs ${h.usd(x.fee)} per attempt, paid to the PTCB when you apply, as read on the PTCB site on ${h.read}. The fee covers one sitting with Pearson VUE; a failed attempt is paid again in full. Two attempts therefore cost ${h.usd(x.fee * 2)} and three ${h.usd(x.fee * 3)}. The PTCB lets you retake the exam without waiting for a second and a third attempt, then requires six months before a fourth, and after four attempts asks for proof of approved preparation. Once certified, you renew the CPhT every ${R.renewYears} years for ${h.usd(R.renewFee)}, with ${R.renewCE} hours of continuing education, some of which you may have to pay for. Training programs and employers often pay the exam fee: ask before you pay it yourself. Changing or missing an appointment can also cost money under the rules of the guidebook, so read them before you schedule.`;
    },
    faqs: (h) => [
      { q: 'Does my employer have to pay for the PTCB exam?', a: 'No law requires it in general, but many pharmacy chains, hospitals and training programs pay the fee, either upfront or by reimbursement after you pass. Ask your manager or program before you register. If they reimburse only a pass, keep your receipt and your result, and check whether a failed attempt is also covered.' },
      { q: 'What if I miss my PTCE appointment?', a: 'Missing an appointment or changing it too late usually forfeits the fee or adds a charge, under the rules in the PTCB guidebook and Pearson VUE scheduling. Read the deadlines for rescheduling and cancelling when you book, and change the appointment through the proper channel early if your plans move. Emergencies have their own procedure.' },
      { q: 'How much does PTCB renewal cost over time?', a: `The renewal fee is ${h.usd(h.R.ptce.renewFee)} every ${h.R.ptce.renewYears} years, so about ${h.usd(h.R.ptce.renewFee / h.R.ptce.renewYears)} a year, plus the cost of ${h.R.ptce.renewCE} hours of continuing education per cycle. Many employers and pharmacy associations offer free or low cost continuing education, which brings the total down.` },
    ],
    body: (h) => {
      const x = h.X('ptce'), R = h.R.ptce;
      const rows = [1, 2, 3, 4].map((k) => [`${k} attempt${k > 1 ? 's' : ''}`, h.usd(x.fee * k), k === 1 ? 'None' : k <= 3 ? 'None' : 'Six months before this attempt']);
      return `
<h2>The fee and what retakes add</h2>
${h.table(['Attempts', 'Total exam fees', 'Wait before the attempt'], rows, `PTCE fee of ${h.usd(x.fee)} per attempt and retake rules from the ${h.src('ptcb_guidebook', 'PTCB guidebook')}, read on ${h.read}.`, ['l', 'r', 'l'])}
<p>After the fourth attempt the PTCB asks for evidence of approved preparation before any further attempt. In practice, a candidate who fails twice gains more from changing how they study than from booking again quickly: the free retakes are a chance, not a plan.</p>
<h2>Costs around the exam</h2>
<ul>
<li><strong>Preparation:</strong> a PTCB-recognized program has its own tuition, which is the largest cost on pathway one; on pathway two, the cost is the time to reach ${h.num(R.workHours)} hours of work.</li>
<li><strong>State registration:</strong> many state boards of pharmacy charge their own fee for a technician registration or license, separate from the PTCB.</li>
<li><strong>Renewal:</strong> ${h.usd(R.renewFee)} every ${R.renewYears} years and ${R.renewCE} hours of continuing education (${h.src('ptcb_renewal', 'PTCB renewal requirements')}).</li>
</ul>
<h2>Keeping the bill to one attempt</h2>
<p>The cheapest exam is the one you pass the first time. Three steps make that more likely: work through every domain of the ${h.a('ptcb-practice-test', 'practice test')}; take two or three ${h.a('ptce-practice-exam', 'full mocks')} and reach the study target on them; then book a date close enough to keep the material fresh. The ${h.a('ptcb-exam-difficulty', 'difficulty page')} explains where candidates lose points.</p>
<h2>Comparing with the ExCPT</h2>
<p>The NHA's ExCPT is the other national pharmacy technician exam. The NHA did not show its exam fee on a public page on ${h.read}, so a direct price comparison is not possible from public sources. Compare instead what your state board accepts and what your employer asks for; the ${h.a('pharmacy-technician-certification', 'certification page')} covers that choice.</p>
<p>All payments are made to the PTCB; this site does not take payments, and its figures come from the PTCB pages linked in the sources.</p>`;
    },
  },
});
