import { definePage } from '../../lib/guide-types';
import { stateFirst } from '../../lib/mini-specs';

export default definePage({
  id: 'exam-fees-retakes',
  group: 'plan',
  order: 81,
  tool: { kind: 'mini:fees', props: { e: 1 } },
  mini: { kind: 'mini:retake', props: { e: 5 } },
  related: ['which-certification', 'ptcb-exam-cost', 'cna-exam-cost', 'nremt-exam', 'study-plan'],
  sources: ['ptcb_cpht', 'ptcb_guidebook', 'aama_elig', 'aama_cert', 'nremt_cognitive', 'nha_handbook'],
  demarche: true,
  en: {
    slug: 'exam-fees-retakes',
    nav: 'Exam fees and retakes',
    card: 'What each certification exam costs, what a failed attempt costs again, and how long you must wait.',
    title: 'Healthcare Certification Exam Fees and Retake Rules 2026',
    description: 'Healthcare certification exam fees and retake rules 2026: PTCE, CMA, NREMT, NHA and CNA fees, waits after a failed attempt, attempt limits, renewal costs.',
    h1: 'Exam fees, retakes and renewal, side by side',
    intro: 'Choose an exam to see the official fee and the cost of extra attempts; the second calculator gives the wait before the next attempt.',
    resume: (h) => {
      const X = h.X, R = h.R;
      const cna = h.P.cnaStates.map((s) => stateFirst(s.id)).filter((v) => v > 0);
      return `Fees and retake rules differ from one certifier to the next, and a failed attempt costs both money and weeks. On ${h.read}, the PTCB charged ${h.usd(X('ptce').fee)} for the PTCE, with no wait before a second or third attempt and six months before a fourth. The AAMA charged ${h.usd(X('cma').fee)} for the CMA (AAMA) to members and to recent graduates of accredited programs, and ${h.usd(X('cma').feeNonMember ?? 0)} to others, with up to ${R.cma.attempts} attempts in ${R.cma.withinMonths} months. The NREMT charged ${h.usd(X('emt').fee)} per attempt of its EMT exam, with ${R.emt.waitDays} days between attempts, remedial training after ${R.emt.remedialAfter} failures and ${R.emt.attempts} attempts in all. The NHA, which runs the ExCPT, CCMA, CPT and CET, did not show its fees on a public page; its handbook sets a ${R.nha.waitDays}-day wait and ${R.nha.attempts} attempts before a one-year wait. Nurse aide fees are set state by state, from ${h.usd(Math.min(...cna))} to ${h.usd(Math.max(...cna))} for a first attempt in the ten states covered here.`;
    },
    faqs: (h) => [
      { q: 'Which certification exam costs the least to retake?', a: `Among the published fees, the NREMT EMT exam at ${h.usd(h.X('emt').fee)} an attempt and the AAMA member rate of ${h.usd(h.X('cma').fee)} are the lowest, and the PTCE costs ${h.usd(h.X('ptce').fee)} each time. Nurse aide retakes are often cheaper because you retake only the part you failed, written or skills, at that part's fee.` },
      { q: 'Do I pay again in full when I retake an exam?', a: 'Yes for every certification exam on this site: each attempt is a new registration with its full fee. Some nurse aide programs charge only for the part you failed, which lowers the cost of a skills retake or a written retake. Check whether your training program or employer covers retakes as well as the first attempt.' },
      { q: 'Does the wait between attempts count from the exam day or the result?', a: 'Usually from the date of the failed attempt, as each certifier words it in its handbook. Read the exact rule in your score report or the handbook before booking. The calculator on this page gives the length of the wait; count it from your exam date unless your certifier says otherwise.' },
      { q: 'What does renewal cost after I pass?', a: `It depends on the credential. The PTCB renews every ${h.R.ptce.renewYears} years with ${h.R.ptce.renewCE} hours of continuing education for ${h.usd(h.R.ptce.renewFee)}. The AAMA renews every ${h.R.cma.renewMonths} months. The NREMT renews every ${h.R.emt.renewYears} years, with a fee of ${h.usd(h.R.emt.renewFee)} from ${h.date(h.R.emt.renewFeeFrom)}. The NHA renews every ${h.R.nha.renewYears} years.` },
    ],
    body: (h) => {
      const X = h.X, R = h.R;
      const rows = [
        ['PTCE (PTCB)', h.usd(X('ptce').fee), 'None before the 2nd and 3rd; 6 months before the 4th', 'Approved preparation after 4'],
        ['ExCPT, CCMA, CPT, CET (NHA)', 'Not published', `${R.nha.waitDays} days`, `${R.nha.attempts}, then one a year`],
        ['CMA (AAMA)', `${h.usd(X('cma').fee)} / ${h.usd(X('cma').feeNonMember ?? 0)}`, 'None required', `${R.cma.attempts} in ${R.cma.withinMonths} months`],
        ['NREMT EMT', h.usd(X('emt').fee), `${R.emt.waitDays} days`, `${R.emt.attempts}, remedial after ${R.emt.remedialAfter}`],
        ['CNA (state)', 'By state', 'Set by the state', `At least ${R.cnaFederal.minAttempts} (federal rule)`],
      ];
      return `
<h2>Fees and retake rules by exam</h2>
${h.table(['Exam', 'Fee per attempt', 'Wait after a failure', 'Attempts'], rows, `Read on ${h.read} on the PTCB, NHA (archived handbook), AAMA and NREMT pages and in 42 CFR 483.154.`, ['l', 'r', 'l', 'l'])}
<p>The CMA (AAMA) fee shows the member rate first; recent graduates of accredited programs pay the lower rate within a year of graduating (${h.src('aama_elig', 'AAMA eligibility page')}). The PTCB rules come from its ${h.src('ptcb_guidebook', 'certification guidebook')} and the NREMT rules from its ${h.src('nremt_cognitive', 'cognitive exam handbook')}.</p>
<h2>Nurse aide fees by state</h2>
<p>For nurse aides the state chooses the vendor and the vendor sets the fees, usually one fee for the written or oral test and another for the skills test. Retakes are charged per part. The ${h.a('cna-exam-cost', 'CNA cost page')} gives the fee of each part in ten states, with the vendor's handbook as source.</p>
<h2>Planning around the waiting periods</h2>
<p>A wait matters most when a job offer or a program deadline depends on the result. Three habits help:</p>
<ul>
<li>book the first attempt early enough that one retake would still fit before the deadline;</li>
<li>after a failure, use the score report by domain to choose what to study, rather than redoing everything;</li>
<li>take a full mock before rebooking, and rebook only when it clears the study target.</li>
</ul>
<p>The NHA's one-year wait after a third failure and the NREMT's remedial training after a third failure are the two thresholds that change a plan the most. Reaching either is a sign to step back and study differently, for example with a ${h.a('study-plan', 'study plan')} built around the weak domains.</p>
<h2>Who pays</h2>
<p>Many training programs include the first exam fee in tuition, and employers often pay for the exam they require. Nurse aides have a specific federal protection: a nursing facility may not charge an aide for training or competency evaluation while the aide works there or has an offer from it, and must reimburse a newly hired aide in some cases (${h.src('ecfr_483_152', '42 CFR 483.152')}). Ask before paying yourself.</p>
<p>This site does not take payments or registrations; every fee is paid on the certifier's or the vendor's own site.</p>`;
    },
  },
});
