import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ptcb-exam',
  group: 'pharm',
  order: 32,
  tool: { kind: 'mini:pace', props: { e: 1 } },
  mini: { kind: 'quiz', props: { exam: 'ptce', domain: 'med', n: 5 } },
  related: ['ptcb-practice-test', 'ptce-practice-exam', 'ptcb-exam-cost', 'pharmacy-technician-certification', 'excpt-practice-test'],
  sources: ['ptcb_cpht', 'ptcb_outline', 'ptcb_guidebook', 'ptcb_renewal'],
  demarche: true,
  en: {
    slug: 'ptcb-exam',
    nav: 'PTCB exam guide',
    card: 'The PTCE from eligibility to renewal: outline, length, scaled score, Pearson VUE booking and the CPhT.',
    title: 'PTCB Exam 2026: PTCE Format, Eligibility, Score and Renewal',
    description: 'PTCB exam 2026: the PTCE format of 90 questions in 1 hour 50 minutes, the 2026 outline, both eligibility pathways, the passing score of 1,400 and renewal.',
    h1: 'The PTCB exam, step by step',
    intro: 'Who can sit the PTCE, what the exam looks like since the January 2026 outline, how it is scored, and what keeping the CPhT requires.',
    resume: (h) => {
      const x = h.X('ptce'), R = h.R.ptce;
      return `The PTCB exam, officially the Pharmacy Technician Certification Exam or PTCE, is the test that leads to the CPhT credential of the Pharmacy Technician Certification Board. Candidates qualify through one of two pathways: completing a PTCB-recognized education or training program, or at least ${h.num(R.workHours)} hours of work experience as a pharmacy technician. The exam has ${x.items} questions, ${x.scored} of them scored, with ${h.time('ptce')} of testing time, and follows a content outline in force since ${h.date(R.outlineEffective)} with four domains led by medications. Scores are scaled from 1,000 to 1,600; ${x.passText.replace('Official pass: ', '').toLowerCase()}. The fee is ${h.usd(x.fee)} per attempt. There is no wait before a second or third attempt, six months before a fourth, and approved preparation is required after four. The CPhT is renewed every ${R.renewYears} years with ${R.renewCE} hours of continuing education, including one hour of pharmacy law and one of patient safety, for ${h.usd(R.renewFee)}.`;
    },
    faqs: (h) => [
      { q: 'What are the two PTCB eligibility pathways?', a: `Pathway one is a PTCB-recognized pharmacy technician education or training program, completed, or due to be completed within 60 days of applying. Pathway two is at least ${h.num(h.R.ptce.workHours)} hours of work experience as a pharmacy technician, attested by a supervisor. Both also require full disclosure of criminal and licensing actions and compliance with PTCB policies.` },
      { q: 'Is the PTCB exam the same as the PTCE?', a: 'Yes. PTCB is the board, PTCE is its exam, and CPhT is the credential you earn when you pass and meet the other requirements. People search for "PTCB exam" more often, but the documents of the board call it the PTCE. The ExCPT of the NHA is a different exam that leads to a CPhT credential of its own.' },
      { q: 'Does my state require the PTCB certification?', a: 'It depends on the state. Some state boards of pharmacy require national certification for technicians, some accept either the PTCE or the ExCPT, and some require only registration or a license with their own conditions. Your state board of pharmacy is the authority; check its technician page before you apply.' },
      { q: 'How long does the PTCB take to send results?', a: 'The result is posted in your PTCB account, and the guidebook sets out when unofficial and official results are released. If any eligibility document is still pending, certification waits until it is complete. Rely on the timing in the PTCB guidebook rather than on forum reports, which often describe older procedures or a different testing format.' },
    ],
    body: (h) => {
      const x = h.X('ptce'), R = h.R.ptce;
      return `
<h2>The PTCE in figures</h2>
${h.table(['Item', 'PTCE'], [['Questions', `${x.items} (${x.scored} scored, ${x.items - x.scored} unscored)`], ['Testing time', h.time('ptce')], ['Score scale', '1,000 to 1,600'], ['Passing score', x.passText.replace('Official pass: ', '')], ['Fee', h.usd(x.fee)], ['Outline in force since', h.date(R.outlineEffective)]], `${h.src('ptcb_cpht', 'PTCB CPhT page')} and ${h.src('ptcb_outline', 'PTCE content outline')}, read on ${h.read}.`, ['l', 'l'])}
<h2>The 2026 outline</h2>
${h.outline('ptce', 'Weights of the scored questions in the outline; our full mock scales them to 90 questions.')}
<p>The outline lists the knowledge statements under each domain. Reading it once, end to end, is the best way to see the scope; then use the ${h.a('ptcb-practice-test', 'practice sets by domain')} to test each part.</p>
<h2>From application to certificate</h2>
<ol>
<li>Create a PTCB account and apply under pathway one or two, with the attestation or program details.</li>
<li>Pay the fee; once approved, you get an authorization to schedule with Pearson VUE.</li>
<li>Take the exam at a Pearson VUE appointment.</li>
<li>Once the official result and any pending documents are in, the CPhT is issued in your account.</li>
</ol>
<p>The ${h.src('ptcb_guidebook', 'PTCB certification guidebook')} sets out each step, the identification required and the rules of the test session.</p>
<h2>Retakes</h2>
<p>A failed attempt can be retaken without waiting the second and third times. Before a fourth attempt the PTCB requires six months, and after four attempts it requires proof of approved preparation before allowing more. Each attempt costs the full ${h.usd(x.fee)}. The ${h.a('ptcb-exam-cost', 'cost page')} puts the numbers together, including renewal.</p>
<h2>Keeping the CPhT</h2>
<p>The credential runs for ${R.renewYears} years. Renewal requires ${R.renewCE} hours of continuing education in the cycle, with at least one hour on pharmacy law and one on patient safety, and the renewal fee of ${h.usd(R.renewFee)} (${h.src('ptcb_renewal', 'PTCB renewal requirements')}). State registration or licensing, where it exists, has its own renewal.</p>
<p>This site is independent of the PTCB and Pearson VUE. To practice under exam conditions, take the ${h.a('ptce-practice-exam', 'full PTCE mock')}.</p>`;
    },
  },
});
