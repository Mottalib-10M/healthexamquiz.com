import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cet-exam',
  group: 'lab',
  order: 64,
  tool: { kind: 'quiz', props: { exam: 'cet', mode: 'mock' } },
  mini: { kind: 'mini:pace', props: { e: 6 } },
  related: ['ekg-practice-test', 'ekg-heart-rate', 'nha-phlebotomy-exam', 'exam-fees-retakes', 'which-certification'],
  sources: ['nha_cet_plan', 'nha_news', 'nha_handbook', 'nha_renew'],
  demarche: true,
  en: {
    slug: 'cet-exam',
    nav: 'CET exam',
    card: 'The NHA EKG technician exam: a timed full-length mock, eligibility, the ten documented EKGs and the coming new version.',
    title: 'CET Exam 2026: NHA EKG Technician Mock Test and Rules',
    description: 'CET exam 2026, the NHA EKG technician test: a full timed mock at the published length, eligibility, ten documented EKGs, scoring, retakes and the next version.',
    h1: 'CET exam: full mock and the rules around it',
    intro: 'A timed practice exam at the published length, corrected at the end with your result by domain, then everything you need before booking.',
    resume: (h) => {
      const x = h.X('cet'), R = h.R.nha;
      return `The CET exam is the certification test for EKG technicians run by the National Healthcareer Association. It has ${x.items} multiple-choice questions, ${x.scored} scored and ${x.items - x.scored} pretest, and lasts ${h.time('cet')}; it can be taken at a test center or online with a live proctor. Its test plan dates from a 2017 job analysis and weights EKG acquisition most heavily, ahead of safety and coordinated patient care and of analysis and interpretation. To be eligible, a candidate needs a high school diploma or equivalent and either an EKG training program or supervised work experience, plus ${R.cetEkgs} EKGs performed on live individuals and attested. The score is scaled, ${x.passText.replace('Official pass: ', '')}. After a failed attempt the wait is ${R.waitDays} days, and after ${R.attempts} attempts it becomes a year. The NHA has announced a new CET exam for ${R.cetNext}. The mock above uses the full length and time and compares your result with a study target of ${h.pc(x.target)} set by this site.`;
    },
    faqs: (h) => [
      { q: 'When does the new CET exam start, and should I wait for it?', a: `The NHA has announced a new CET exam for ${h.R.nha.cetNext} without, on ${h.read}, a published launch day or test plan. Waiting rarely makes sense: the duties of an EKG technician change slowly, so the knowledge carries over. Take the current exam when you are ready, and check the NHA announcements page before booking in case the date has been set.` },
      { q: 'How many EKGs do I need to document for the CET?', a: `The NHA asks for ${h.R.nha.cetEkgs} successful EKGs performed on live individuals, attested by a qualified person, usually your instructor or supervisor. They are part of eligibility, so the certification is not issued without them. Simulated tracings or manikins do not count; the candidate handbook gives the form and the details of the attestation.` },
      { q: 'Is the CET exam hard to pass?', a: 'It is narrower than the medical assistant exams and very practical. Candidates who struggle usually know rhythms but lose points on acquisition details: electrode landmarks, skin preparation, filter settings and artifacts. The NHA does not publish a current pass rate for the CET, so judge your readiness on full mocks taken on different draws.' },
      { q: 'How long does the CET certification last?', a: `It is renewed every ${h.R.nha.renewYears} years with ${h.R.nha.renewCredits} continuing education credits completed in that period, according to the NHA renewal page (archived copy). If the credential lapses, the NHA rules on reinstatement apply, which can include taking the exam again.` },
    ],
    body: (h) => {
      const x = h.X('cet'), R = h.R.nha;
      return `
<h2>How the mock is built and marked</h2>
<p>The mock has ${x.items} questions, the length of the real form, drawn across the three domains as the test plan weights them: ${x.domains.map((d) => `${d.short.toLowerCase()} ${d.items}`).join(', ')}. The timer gives you ${h.time('cet')}, which leaves about a minute per question. Use the flag on any question you want to revisit and the map to see what is left. At the end you get your share of right answers, the result in each domain and every explanation.</p>
<p>The NHA reports a scaled score built by equating forms, so no count of right answers equals a pass. This site sets a study target of ${h.pc(x.target)} and says so; the official standard, ${x.passText.replace('Official pass: ', '')}, is shown beside your result.</p>
<h2>Eligibility, step by step</h2>
<ol>
<li>High school diploma or equivalent.</li>
<li>Either an EKG technician training program completed within the last five years, or supervised work experience in the field (one year in the last three, or two in the last five).</li>
<li>${R.cetEkgs} EKGs on live individuals, attested.</li>
<li>Registration and payment in your NHA account, then a test center or remote appointment.</li>
</ol>
<p>The NHA did not show its exam fee on a public page on ${h.read}; the amount appears when you register, and training programs often include it.</p>
<h2>What the test plan covers</h2>
<p>The ${h.src('nha_cet_plan', 'CET test plan')} lists tasks in three domains. In <strong>safety, compliance and coordinated patient care</strong>: identify the patient, explain the procedure, protect privacy, follow infection control, respond to a patient who reports chest pain or faints, and pass on critical findings. In <strong>EKG acquisition</strong>: prepare the skin, place electrodes for a 12-lead or a rhythm strip, set the machine, check calibration and paper speed, recognize and correct artifacts, and handle Holter and stress test preparation. In <strong>analysis and interpretation</strong>: measure the rate, check regularity, identify the waves and intervals and recognize the rhythms that must be reported at once.</p>
<h2>Retakes and renewal</h2>
${h.table(['Rule', 'NHA policy'], [['Wait after a failed attempt', `${R.waitDays} days`], ['Attempts at that rhythm', `${R.attempts}`], ['After the third failure', 'One attempt a year'], ['Renewal cycle', `${R.renewYears} years, ${R.renewCredits} continuing education credits`]], `NHA candidate handbook and renewal page, archived copies, read on ${h.read}.`, ['l', 'l'])}
<h2>A plan for the last two weeks</h2>
<p>Take one full mock at the start to find your weakest domain. Spend the next week on short sets from the ${h.a('ekg-practice-test', 'EKG practice test')}, mostly in that domain, and on the arithmetic of the ${h.a('ekg-heart-rate', 'heart rate methods')}. Take a second full mock at the end of the week and review every wrong answer, then a third two or three days before the exam. Rest the day before.</p>
<p>This site is independent of the NHA; registration, scheduling, scoring and certificates are handled only by the NHA. Our questions are written from the test plan topics and are not questions from the real exam.</p>`;
    },
  },
});
