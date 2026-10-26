import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cma-practice-exam',
  group: 'ma',
  order: 54,
  tool: { kind: 'quiz', props: { exam: 'cma', mode: 'mock' } },
  mini: { kind: 'mini:pace', props: { e: 4 } },
  related: ['cma-practice-test', 'ccma-practice-exam', 'medical-assistant-practice-test', 'exam-fees-retakes'],
  sources: ['aama_cert', 'aama_outline', 'aama_outline_2027', 'aama_recert'],
  demarche: true,
  en: {
    slug: 'cma-practice-exam',
    nav: 'CMA (AAMA) practice exam',
    card: 'A full 200-question timed mock of the CMA (AAMA) exam, with the AAMA format, fee, retakes and recertification.',
    title: 'CMA Practice Exam 2026: Full 200-Question AAMA Mock',
    description: 'CMA practice exam 2026: a full 200-question timed mock of the CMA (AAMA) exam in 160 minutes, with its segments, the score of 405, its fees and retakes.',
    h1: 'CMA (AAMA) practice exam at full length',
    intro: 'Two hundred questions in the time the AAMA allows, the three categories in their outline weights, and corrections when you mark the test.',
    resume: (h) => {
      const x = h.X('cma'), R = h.R.cma;
      return `This practice exam follows the CMA (AAMA) at full length: ${x.items} questions in ${h.time('cma')}, the total of the four 40-minute segments of the real exam. The AAMA scores ${x.scored} of the questions and uses the rest as pretest items, which cannot be told apart, so the mock keeps all ${x.items}. The questions follow the current outline: ${h.dom('cma', 'clin').items} clinical competency, ${h.dom('cma', 'gen').items} general and ${h.dom('cma', 'adm').items} administrative. The real exam reports a scaled score from 200 to 800 and ${x.passText.replace('Official pass: ', '').toLowerCase()}; our mock compares your share of right answers with a study target of ${h.pc(x.target)} chosen by this site. The exam fee is ${h.usd(x.fee)} for AAMA members and recent graduates of accredited programs and ${h.usd(x.feeNonMember ?? 0)} for others, and up to ${R.attempts} attempts are allowed in ${R.withinMonths} months. From ${h.date(R.nextOutline)}, a new outline gives clinical competency a larger share; this mock will follow it from that date.`;
    },
    faqs: (h) => [
      { q: 'Why does the mock run 160 minutes in one block?', a: 'Because the browser cannot reproduce the breaks between segments the way a test center does. The total time matches the four 40-minute segments of the real exam. If you want to rehearse the segments, pause yourself after about every fifty questions and keep each pause short, as the real optional breaks are.' },
      { q: 'How long is the CMA (AAMA) credential valid?', a: `It must be recertified every ${h.R.cma.renewMonths} months, by continuing education (${h.R.cma.renewCEU} units with a required mix of categories) or by retaking the exam. The recertification fee is ${h.usd(h.R.cma.renewFeeMember)} for members and ${h.usd(h.R.cma.renewFeeNonMember)} for others, according to the AAMA recertification page.` },
      { q: 'Should I study for the July 2027 outline already?', a: `Only if you will test on or after ${h.date(h.R.cma.nextOutline)}. The topics stay those of medical assisting; what changes is the weight, with more clinical and fewer administrative questions. If your exam is before that date, the current outline applies. Our practice switches when the new outline takes effect.` },
    ],
    body: (h) => {
      const x = h.X('cma'), R = h.R.cma;
      return `
<h2>How the mock is drawn</h2>
<p>The ${x.items} questions follow the three categories of the current outline in their weights: ${x.domains.map((d) => `${d.name.toLowerCase()} ${d.items}`).join(', ')}. The clinical questions come from our medical assistant pool, which also feeds the CCMA practice, together with phlebotomy and EKG questions at the medical assistant level. Administrative questions include a set written only for the CMA, because its administrative category is broader than the CCMA's.</p>
<h2>Pacing over four segments</h2>
<p>The real exam gives 40 minutes per segment of about fifty questions, so 48 seconds per question. That is less than the one minute per question of the NHA exams, and it surprises candidates who practiced only untimed. The calculator above shows the seconds per question that remain if you keep a few minutes for review. On this mock, check that you reach question 50 by minute 40, 100 by minute 80, and so on.</p>
<h2>Reading the result</h2>
<p>After you mark the test, the panel gives your total, the study target and your score in each category. If the administrative category trails the other two, it is the quickest to raise: a few sessions on insurance terms, claims and coding concepts usually do it. If clinical competency trails, start from the areas where most questions sit: patient intake, procedures, infection control and pharmacology basics.</p>
<h2>Exam rules in brief</h2>
${h.table(['Rule', 'CMA (AAMA)'], [['Questions and time', `${x.items} in four 40-minute segments`], ['Score', x.passText.replace('Official pass: ', '')], ['Fee', `${h.usd(x.fee)} member or recent graduate, ${h.usd(x.feeNonMember ?? 0)} otherwise`], ['Attempts', `${R.attempts} within ${R.withinMonths} months`], ['Recertification', `Every ${R.renewMonths} months`]], `${h.src('aama_cert', 'AAMA certification pages')}, read on ${h.read}.`, ['l', 'l'])}
<p>The exam is taken at a Prometric test center after the AAMA approves your application. Eligibility is set out on the AAMA's pages; in most cases it requires a CAAHEP or ABHES accredited program. The ${h.a('exam-fees-retakes', 'fees and retakes page')} compares these rules with the other certifiers.</p>
<h2>Before the full mock</h2>
<p>Practice each category with the ${h.a('cma-practice-test', 'CMA practice test')} first, and keep the full mock for when every category is near the target. Missed questions return on the ${h.a('review-mistakes', 'review page')}. If you hesitate between the two medical assistant credentials, the ${h.a('medical-assistant-practice-test', 'comparison page')} sets them side by side.</p>
<p>This site is independent of the AAMA and Prometric. The questions are ours, written from the outline topics; they are not questions from the real exam.</p>`;
    },
  },
});
