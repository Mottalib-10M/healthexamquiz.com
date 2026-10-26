import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'medical-assistant-practice-test',
  group: 'ma',
  order: 55,
  tool: { kind: 'quiz', props: { exam: 'ccma', mode: 'practice', pick: true, n: 10 } },
  mini: { kind: 'finder', props: { goal: 2 } },
  related: ['ccma-practice-test', 'cma-practice-test', 'ccma-exam', 'cma-practice-exam', 'which-certification'],
  sources: ['aama_cert', 'aama_elig', 'nha_handbook', 'nha_ccma_plan'],
  en: {
    slug: 'medical-assistant-practice-test',
    nav: 'Medical assistant practice test',
    card: 'Practice for either medical assistant exam, CCMA or CMA (AAMA), and see how the two credentials differ.',
    title: 'Medical Assistant Practice Test 2026: CCMA and CMA Questions',
    description: 'Medical assistant practice test 2026: free questions for the CCMA (NHA) and the CMA (AAMA), switch exams in one click and compare the two credentials.',
    h1: 'Medical assistant practice test: CCMA or CMA',
    intro: 'Switch between the CCMA and the CMA (AAMA) with the exam menu; ten questions a set, each explained. Below, how the two exams differ.',
    resume: (h) => {
      const a = h.X('ccma'), b = h.X('cma');
      return `Medical assistants in the United States usually certify through one of two national exams. The CCMA of the National Healthcareer Association has ${a.items} questions in ${h.time('ccma')}, organized in twelve test plan areas led by clinical patient care, and accepts either a training program or supervised work experience. The CMA (AAMA) of the American Association of Medical Assistants has ${b.items} questions in four 40-minute segments, organized in three categories, clinical competency, general and administrative, and in most cases requires a program accredited by CAAHEP or ABHES. Both report scaled scores: ${a.passText.replace('Official pass: ', '').toLowerCase()} for the CCMA, ${b.passText.replace('Official pass: ', '').toLowerCase()} for the CMA. The AAMA publishes its fee, ${h.usd(b.fee)} for members and recent graduates; the NHA did not show its fee on a public page on ${h.read}. Most of the knowledge is shared, which is why the practice above lets you switch exams: the same clinical questions train both.`;
    },
    faqs: (h) => [
      { q: 'Which is more respected, the CCMA or the CMA?', a: 'Neither is ranked by law; what counts is what employers near you ask for. Some employers and some states name the CMA (AAMA) in their policies, others accept either, and many postings say "certified medical assistant" without naming a body. Read a dozen local job postings before choosing: they answer this question better than any general rule.' },
      { q: 'Can I take both medical assistant exams?', a: 'Yes, if you meet both sets of eligibility rules. Few people need both, since most employers accept one. If you trained in an accredited program, you can sit either; if you trained on the job or in a program that is not accredited, the CCMA is usually the one open to you. Each has its own renewal cycle.' },
      { q: 'Do the same questions prepare for both exams?', a: `Mostly. Clinical topics, infection control, vital signs, procedures, phlebotomy and EKG basics, overlap almost entirely. The CMA (AAMA) asks more on administrative work, about ${h.pc(h.dom('cma', 'adm').share)} of the exam, and on general topics such as terminology and law. Our pool tags each question for both exams when it fits both, so practice on one counts for the other.` },
      { q: 'How long does it take to prepare for a medical assistant exam?', a: 'Most candidates prepare during their program and add a few weeks of focused review. Use the practice sets to find weak areas, then take two or three full mocks a week apart. The study plan page turns the days you have left into a daily number of questions.' },
    ],
    body: (h) => {
      const a = h.X('ccma'), b = h.X('cma');
      const rows = [
        ['Run by', a.owner, b.owner],
        ['Questions', `${a.items} (${a.scored} scored)`, `${b.items} (${b.scored} scored)`],
        ['Time', h.time('ccma'), `${h.time('cma')} in four segments`],
        ['Structure', '12 test plan areas', '3 content categories'],
        ['Score', a.passText.replace('Official pass: ', ''), b.passText.replace('Official pass: ', '')],
        ['Fee', 'Not published on a public page', `${h.usd(b.fee)} member, ${h.usd(b.feeNonMember ?? 0)} otherwise`],
      ];
      return `
<h2>The two exams side by side</h2>
${h.table(['', 'CCMA', 'CMA (AAMA)'], rows, `Read on the NHA (archived copies) and AAMA pages on ${h.read}.`, ['l', 'l', 'l'])}
<h2>Eligibility, the deciding difference</h2>
<p>For most candidates the choice is made by eligibility. The NHA accepts, after a high school diploma or equivalent, a medical assistant training program completed in the last five years or supervised work experience (one year in the last three, or two in the last five). The ${h.src('aama_elig', 'AAMA')} asks, in most cases, that you be a student or graduate of a medical assisting program accredited by CAAHEP or ABHES. If your program is not accredited, or you learned on the job, the CCMA is usually the realistic route.</p>
<h2>What the content difference means for your practice</h2>
<p>The CCMA puts most of its weight on clinical patient care, split into six areas from intake and vitals to EKG. The CMA (AAMA) gives clinical competency a little over half of the exam and keeps a fifth for administrative work: scheduling, records, insurance, claims and coding concepts. If you prepare for the CMA, add administrative sets every week. If you prepare for the CCMA, spend more time on the clinical areas, especially general patient care and infection control.</p>
<h2>Using the practice above</h2>
<p>The exam menu switches the quiz between the CCMA and the CMA. The domain menu then lists that exam's areas or categories. The questions shared between the two count once in your progress, so a rule you fixed for one exam stays fixed for the other. For a full timed test, use the ${h.a('ccma-practice-exam', 'CCMA mock')} or the ${h.a('cma-practice-exam', 'CMA mock')}; each keeps its exam's length and time.</p>
<h2>After certification</h2>
<p>The CCMA is renewed every ${h.R.nha.renewYears} years with continuing education; the CMA (AAMA) every ${h.R.cma.renewMonths} months, by continuing education or by retesting. Many medical assistants later add a phlebotomy or EKG credential: the ${h.a('which-certification', 'certification finder')} shows the routes.</p>
<p>The finder above shows both medical assistant exams with their routes, fees and renewal. This site is independent of the NHA and the AAMA, and recommends no school.</p>`;
    },
  },
});
