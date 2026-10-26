import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cna-exam',
  group: 'cna',
  order: 12,
  tool: { kind: 'mini:pace', props: { e: 0 } },
  mini: { kind: 'quiz', props: { exam: 'cna', n: 5 } },
  related: ['cna-state-exam', 'cna-written-exam', 'cna-skills-test', 'cna-exam-cost', 'cna-practice-test'],
  sources: ['ecfr_483_154', 'ecfr_483_152', 'ncsbn_nnaap', 'credentia_testtakers', 'credentia_written'],
  demarche: true,
  en: {
    slug: 'cna-exam',
    nav: 'CNA exam guide',
    card: 'The whole nurse aide competency evaluation in order: training, the two parts, vendors, test day, results and the registry.',
    title: 'CNA Exam 2026: How the Nurse Aide Competency Test Works',
    description: 'CNA exam 2026: the federal rules behind the nurse aide competency test, the written or oral part, the skills part, who delivers it, results and the registry.',
    h1: 'The CNA exam from training to the registry',
    intro: 'What federal law requires, who runs the test in your state, how a test day unfolds and what happens once you pass or fail a part.',
    resume: (h) => {
      const n = h.R.nnaap, F = h.R.cnaFederal;
      return `The CNA exam is the nurse aide competency evaluation that federal rules require before someone can work as a nurse aide in a nursing facility certified for Medicare or Medicaid. Under 42 CFR 483.154 it has two parts: a knowledge test, written or oral at the aide's choice, and a demonstration of skills drawn at random from the tasks nurse aides perform, and each state must give at least ${F.minAttempts} chances to pass. Training comes first under 42 CFR 483.152: at least ${F.trainingHours} hours, including ${F.clinicalHours} hours of supervised practical work and ${F.preContactHours} hours before any direct contact with residents. Each state picks its vendor. Most use the National Nurse Aide Assessment Program, owned by Credentia, with ${n.writtenItems} written questions in ${h.hm(n.writtenMinutes)} and ${n.skills} skills in ${n.skillsMinutes} minutes; Texas, Florida and New York use Prometric, and Ohio, Michigan and part of California use Headmaster. Passing both parts places the aide on the state nurse aide registry.`;
    },
    faqs: (h) => {
      const F = h.R.cnaFederal;
      return [
        { q: 'How soon after passing will my name appear on the nurse aide registry?', a: 'Federal rules give the state 30 days to enter a person found competent on its registry, under 42 CFR 483.154. In practice many registries post results faster, sometimes within days of the vendor reporting them. Employers check the registry before letting you work as a nurse aide, so keep a copy of your score report until your entry shows up online.' },
        { q: 'What happens to my certification if I stop working as a nurse aide?', a: `If you go ${F.lapseMonths} consecutive months without providing nursing or nursing related services for pay, federal rules require a new training and competency evaluation program or a new competency evaluation before you work again. Keep proof of paid work, such as pay stubs, because some registries ask for it when you renew.` },
        { q: 'Do I retake both parts if I fail only one of them?', a: 'Usually not. The parts are scored separately, and most vendors let you register again only for the part you missed, paying that part\'s retake fee. Texas and New York count attempts at each part separately. Illinois is an exception with one fee per attempt. Your handbook says whether a pass on one part expires while you retake the other.' },
        { q: 'How much training is required before the CNA exam?', a: `The federal minimum is ${F.trainingHours} clock hours, of which at least ${F.clinicalHours} hours are supervised practical training with residents, and ${F.preContactHours} hours of topics such as communication, infection control and safety must come before any direct contact. Many states require more hours than this floor. The program must be approved by your state.` },
      ];
    },
    body: (h) => {
      const n = h.R.nnaap, F = h.R.cnaFederal;
      return `
<h2>Why there is a CNA exam at all</h2>
<p>The exam is not a private credential that employers happen to like. It comes from federal law on long term care facilities: nurse aides in a facility certified for Medicare or Medicaid must show their competence, and the federal rules define both the training and the evaluation that prove it (${h.src('ecfr_483_152', '42 CFR 483.152')} and ${h.src('ecfr_483_154', '42 CFR 483.154')}). The federal text sets the frame and each state fills it in: it chooses the vendor, sets the fee and decides how attempts are counted.</p>
<p>Three federal rules apply everywhere. The aide chooses between a written and an oral knowledge test. The skills are selected at random from a pool of tasks aides usually perform. The state must offer at least ${F.minAttempts} opportunities to complete the evaluation.</p>
<h2>The path, step by step</h2>
<ol>
<li><strong>Training.</strong> Finish a state approved program of at least ${F.trainingHours} hours, ${F.clinicalHours} of them supervised practical work.</li>
<li><strong>Application.</strong> Your program, or you, submits the application to the state's testing vendor, with proof of training and identity.</li>
<li><strong>Scheduling.</strong> You get a date at a regional test site, often a school or a college. Your handbook says whether both parts fall on the same day.</li>
<li><strong>Test day.</strong> Bring the identification your handbook requires, arrive early, and expect the skills part to take place in a room set up like a resident's room.</li>
<li><strong>Results.</strong> Each part is reported as pass or fail. A failed part is retaken within the window your state sets.</li>
<li><strong>Registry.</strong> Once you pass both parts, the state lists you on its nurse aide registry, which is what employers check.</li>
</ol>
<h2>Who writes and delivers the test</h2>
<p>The National Nurse Aide Assessment Program was created by the National Council of State Boards of Nursing and is now owned by Credentia (${h.src('ncsbn_nnaap', 'NCSBN notice')}). Credentia's ${h.src('credentia_testtakers', 'test taker pages')} list the NNAAP states, including Alaska, Alabama, California, Colorado, the District of Columbia, Georgia, Iowa, Maryland, North Carolina, Pennsylvania, Rhode Island, South Carolina, Tennessee, Virginia and Washington, plus several territories. Other states contract with another vendor and use their own forms. Here is how the main formats compare:</p>
${h.table(['Vendor', 'Written test', 'Skills test', 'Example states'], [
        ['Credentia (NNAAP)', `${n.writtenItems} questions, ${h.hm(n.writtenMinutes)}`, `${n.skills} skills, ${n.skillsMinutes} minutes`, 'Pennsylvania, Georgia, North Carolina'],
        ['Prometric', h.state('tx').vendors[0].format.split(';')[0], 'Five scored, incl. handwashing and indirect care', 'Texas, Florida, New York'],
        ['Headmaster', h.state('oh').vendors[0].format.split(';')[0], h.state('oh').vendors[0].format.split(';')[1].trim(), 'Ohio, Michigan, California'],
      ], 'Formats read in the vendor handbooks; the state guide gives all ten states we track.', ['l', 'l', 'l', 'l'])}
<p>The content is close everywhere because the duties are the same: personal care, safety, infection control, measurements, residents' rights and communication. What changes is the count, the time and the way skills are drawn. Check the ${h.a('cna-state-exam', 'state by state guide')} before you study a specific format.</p>
<h2>The two parts in short</h2>
<p>The <strong>knowledge test</strong> is a set of multiple-choice questions, mostly short scenarios about a resident. In the NNAAP it has ${n.writtenItems} questions, ${n.writtenItems - n.writtenScored} of which are unscored pretest items (${h.src('credentia_written', 'Credentia')}). The oral version replaces reading with listening and adds word recognition items; the ${h.a('cna-written-exam', 'written exam page')} details both.</p>
<p>The <strong>skills test</strong> asks you to perform a few tasks on a person acting as the resident while an evaluator follows a checklist. Hand hygiene is always included in the NNAAP, along with one task where you measure and record a value. The ${h.a('cna-skills-test', 'skills test guide')} explains how a step is scored.</p>
<h2>Reading a result</h2>
<p>Keep your score report until your registry entry appears. A pass on both parts needs no further step from you in most states, since the vendor reports to the registry. A fail on one part often comes with feedback, such as the areas of the written test or the skills where you fell short. Use it to target your practice before the retake rather than starting again from the beginning, and book the new attempt early enough to stay inside your state's window.</p>
<h2>After the exam</h2>
<p>Passing is not the end of the rules. If you go ${F.lapseMonths} consecutive months without paid nursing work, federal rules require new training or a new evaluation before you work as an aide again. Many states also set their own renewal cycle with proof of employment. For fees and who pays them, see the ${h.a('cna-exam-cost', 'cost page')}.</p>
<p>This site is independent: it is not affiliated with Credentia, Prometric, Headmaster or any state program, and it plays no part in applications, scheduling or results.</p>`;
    },
  },
});
