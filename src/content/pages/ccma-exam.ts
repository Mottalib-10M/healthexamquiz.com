import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ccma-exam',
  group: 'ma',
  order: 52,
  tool: { kind: 'mini:pace', props: { e: 3 } },
  mini: { kind: 'quiz', props: { exam: 'ccma', domain: 'care', n: 5 } },
  related: ['ccma-practice-test', 'ccma-practice-exam', 'medical-assistant-practice-test', 'exam-fees-retakes', 'which-certification'],
  sources: ['nha_ccma_plan', 'nha_handbook', 'nha_renew'],
  demarche: true,
  en: {
    slug: 'ccma-exam',
    nav: 'CCMA exam guide',
    card: 'The NHA medical assistant exam: format, eligibility routes, registration, scoring, retakes and renewal.',
    title: 'CCMA Exam 2026: Format, Eligibility, Scoring and Retakes',
    description: 'CCMA exam 2026, the NHA clinical medical assistant test: 180 questions in three hours, eligibility routes, scaled score of 390, retake waits and renewal.',
    h1: 'The CCMA exam, from eligibility to renewal',
    intro: 'What the NHA asks before you can sit the CCMA, how the exam runs and is scored, and what happens after a failed attempt or a pass.',
    resume: (h) => {
      const x = h.X('ccma'), R = h.R.nha;
      return `The CCMA is the certification exam for clinical medical assistants run by the National Healthcareer Association. It has ${x.items} questions, ${x.scored} scored, in ${h.time('ccma')}, taken at a test center or with live remote proctoring, and has followed its current test plan since ${h.date(R.ccmaLaunch)}. Candidates need a high school diploma or equivalent and either a medical assistant training program completed within the last five years or supervised work experience as a medical assistant, one year within the last three or two years within the last five, according to the NHA candidate handbook (archived copy). The result is a scaled score, ${x.passText.replace('Official pass: ', '').toLowerCase()}. After a failed attempt the wait is ${R.waitDays} days; after ${R.attempts} attempts it becomes one year between attempts. The credential is renewed every ${R.renewYears} years with ${R.renewCredits} continuing education credits. The NHA did not show the exam fee on a public page on ${h.read}; it appears in your account when you register.`;
    },
    faqs: (h) => [
      { q: 'Can I take the CCMA without going to school?', a: 'Yes, through the work experience route: supervised work as a medical assistant, one year within the last three years or two years within the last five, after a high school diploma or equivalent. The employer or supervisor attests the experience. Without either a program or that experience, the NHA does not accept the application.' },
      { q: 'What is the difference between the CCMA and the CMA (AAMA)?', a: `The CCMA is run by the NHA, has ${h.X('ccma').items} questions in ${h.time('ccma')} and accepts work experience. The CMA (AAMA) has ${h.X('cma').items} questions in four timed segments, mostly requires an accredited program, and gives administrative tasks a larger share. Employers often accept either; some name one. The medical assistant practice page compares them in detail.` },
      { q: 'When do I get my CCMA result?', a: 'The NHA reports results through your account after the exam, with a breakdown by area that helps if you need to retake. The certificate follows a pass once eligibility documents are complete. Exact timing depends on how you tested and whether documents are pending, so check your NHA account rather than counting on a fixed delay.' },
      { q: 'What does the CCMA renewal require?', a: `Every ${h.R.nha.renewYears} years, ${h.R.nha.renewCredits} continuing education credits completed during the cycle, and the renewal fee, according to the NHA renewal page (archived copy). Keep track of the expiry date in your account; a lapsed credential has its own reinstatement rules, which can include retesting.` },
    ],
    body: (h) => {
      const x = h.X('ccma'), R = h.R.nha;
      return `
<h2>The exam at a glance</h2>
${h.table(['Item', 'CCMA'], [['Questions', `${x.items} (${x.scored} scored)`], ['Time', h.time('ccma')], ['Delivery', 'Test center or live remote proctoring'], ['Score', x.passText.replace('Official pass: ', '')], ['Current test plan since', h.date(R.ccmaLaunch)]], `NHA test plan and candidate handbook, archived copies, read on ${h.read}.`, ['l', 'l'])}
<p>The timing calculator above shows what that means per question. The test plan's twelve areas are detailed on the ${h.a('ccma-practice-test', 'CCMA practice test')} page; clinical patient care makes up most of the exam.</p>
<h2>Eligibility routes</h2>
<p>After a high school diploma or equivalent, the NHA accepts two routes:</p>
<ul>
<li><strong>Training:</strong> a medical assistant training program completed within the last five years.</li>
<li><strong>Experience:</strong> supervised work as a medical assistant, one year within the last three years or two years within the last five.</li>
</ul>
<p>The NHA candidate handbook (archived copy, cited in the sources) gives the documents for each route. Because the NHA website blocks automated reading, we read its pages in dated archive copies; check the live handbook in your account before you apply.</p>
<h2>Registration and test day</h2>
<p>You create an NHA account, submit the eligibility information, pay and choose a test center or a remote session. For remote testing, the proctor checks your room, your identification and your computer before the exam starts. Bring the identification the handbook names; a mismatch between the name on your account and on your ID is a common reason to be turned away.</p>
<h2>After the exam</h2>
${h.table(['Situation', 'NHA rule'], [['Failed attempt', `Wait ${R.waitDays} days, then retake`], [`After ${R.attempts} attempts`, 'One attempt a year'], ['Pass', `Credential for ${R.renewYears} years`], ['Renewal', `${R.renewCredits} continuing education credits per cycle`]], 'NHA candidate handbook and renewal page, archived copies.', ['l', 'l'])}
<p>Each attempt is paid again. The ${h.a('exam-fees-retakes', 'fees and retakes page')} compares these rules with the AAMA, the PTCB and the NREMT.</p>
<h2>Is the CCMA the right credential for you?</h2>
<p>If you trained in a program that is not accredited by CAAHEP or ABHES, or you learned on the job, the CCMA is usually the open route, since the CMA (AAMA) mostly requires an accredited program. If your program is accredited, compare what employers near you ask for. The ${h.a('medical-assistant-practice-test', 'medical assistant practice page')} sets the two exams side by side, and the ${h.a('which-certification', 'certification finder')} covers the other jobs.</p>
<p>This site is not the NHA and has no role in eligibility, registration or results.</p>`;
    },
  },
});
