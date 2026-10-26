import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cma-practice-test',
  group: 'ma',
  order: 53,
  tool: { kind: 'quiz', props: { exam: 'cma', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:readiness', props: { e: 4 } },
  related: ['cma-practice-exam', 'ccma-practice-test', 'medical-assistant-practice-test', 'review-mistakes'],
  sources: ['aama_cert', 'aama_outline', 'aama_outline_2027', 'aama_elig'],
  en: {
    slug: 'cma-practice-test',
    nav: 'CMA (AAMA) practice test',
    card: 'Practice the three content categories of the CMA (AAMA) exam, clinical, general and administrative.',
    title: 'CMA Practice Test 2026: Free AAMA Questions by Category',
    description: 'CMA practice test 2026: free questions for the CMA (AAMA) exam in its three categories, clinical, general and administrative, each with its explanation.',
    h1: 'CMA (AAMA) practice test by content category',
    intro: 'Pick clinical, general or administrative and answer ten questions. Every answer comes with its explanation, and missed ones are kept for review.',
    resume: (h) => {
      const x = h.X('cma');
      return `The CMA (AAMA) exam is the certification test of the American Association of Medical Assistants, delivered at Prometric test centers. It has ${x.items} multiple-choice questions, ${x.scored} scored and ${x.items - x.scored} pretest, taken in four segments of 40 minutes, ${h.time('cma')} in all. The content outline sorts the scored questions into three categories: clinical competency (${h.pc(h.dom('cma', 'clin').share)}), general (${h.pc(h.dom('cma', 'gen').share)}), which covers medical terminology, communication, law and ethics, and administrative (${h.pc(h.dom('cma', 'adm').share)}), which covers scheduling, records, insurance, billing and coding concepts. Scores are scaled from 200 to 800 and ${x.passText.replace('Official pass: ', '').toLowerCase()}. The AAMA has published a new outline that applies from ${h.date(h.R.cma.nextOutline)}, with clinical competency rising to ${h.pc(h.R.cma.nextShares.clin)} and administrative falling to ${h.pc(h.R.cma.nextShares.adm)}. This practice test draws ten questions at a time from the category you choose.`;
    },
    faqs: (h) => [
      { q: 'What changes in the CMA (AAMA) outline in July 2027?', a: `From ${h.date(h.R.cma.nextOutline)} the AAMA moves weight toward clinical work: clinical competency goes to about ${h.pc(h.R.cma.nextShares.clin)} of the scored questions, general stays near ${h.pc(h.R.cma.nextShares.gen)}, and administrative drops to about ${h.pc(h.R.cma.nextShares.adm)}. If you test before that date, the current outline applies; the practice here follows it until then.` },
      { q: 'Is the administrative part of the CMA harder than on the CCMA?', a: 'It is larger and more detailed: a fifth of the scored questions, with insurance terms, claims, coding concepts, bookkeeping and records management. Candidates from clinical backgrounds often find it the least familiar part. A few targeted sets on the administrative category usually raise the score faster than more clinical practice.' },
      { q: 'How are the four CMA segments timed?', a: 'The exam runs in four segments of 40 minutes, with three optional breaks between them totaling 20 minutes, according to the AAMA. An optional tutorial of up to five minutes comes first and is not counted in the test time. The full mock on this site keeps the total time; practice an even pace of about fifty questions per segment.' },
      { q: 'What does a scaled score of 405 mean on the CMA exam?', a: 'It is the minimum passing score on the AAMA scale of 200 to 800. Because the AAMA equates different forms of the exam, the number of right answers needed varies slightly from one form to another, and the AAMA does not publish a fixed count. Our practice reports your share of right answers against a study target instead.' },
    ],
    body: (h) => {
      const x = h.X('cma');
      const rows = x.domains.map((d) => [d.name, h.pc(d.share), h.pc((h.R.cma.nextShares as Record<string, number>)[d.code]), h.inPool('cma', d.code)]);
      return `
<h2>The three categories, now and from July 2027</h2>
${h.table(['Category', 'Current outline', `From ${h.date(h.R.cma.nextOutline)}`, 'Questions in our pool'], rows, `${h.src('aama_outline', 'Current CMA (AAMA) outline')} and ${h.src('aama_outline_2027', 'outline effective July 2027')}.`, ['l', 'r', 'r', 'r'])}
<p>Our pool for the CMA combines questions written for its own categories with medical assistant questions shared with the CCMA, each tagged with the CMA category the AAMA outline gives that topic. Clinical competency takes in anatomy and physiology, infection control, patient intake, procedures, pharmacology, phlebotomy and EKG basics. General covers terminology, psychology of communication, professionalism, law and ethics, safety. Administrative covers scheduling, records, insurance and claims, coding concepts and practice finances.</p>
<h2>How to use the categories</h2>
<p>Clinical competency is more than half of the exam, so most of your sets belong there. But the general and administrative categories are where candidates from clinical programs lose points they could have kept. A balanced week might be three clinical sets for every general and every administrative one, adjusted to your scores. The progress panel on the ${h.a('review-mistakes', 'review page')} shows your share right in each category.</p>
<h2>Typical administrative traps</h2>
<ul>
<li>Mixing up the code sets: ICD-10-CM codes describe diagnoses, CPT and HCPCS codes describe procedures, services and supplies.</li>
<li>Deductible, copayment and coinsurance: what the patient pays first, a fixed amount per visit, a share after the deductible.</li>
<li>Releasing records without the right authorization, or to a family member who is not the patient's representative.</li>
<li>Scheduling systems: wave, modified wave and stream scheduling, and when each fits.</li>
</ul>
<!--tool:quiz|{"exam":"cma","domain":"adm","n":5}-->
<h2>Who can sit the CMA (AAMA)</h2>
<p>In most cases, students and graduates of a medical assisting program accredited by CAAHEP or ABHES (${h.src('aama_elig', 'AAMA eligibility page')}). The fee is ${h.usd(x.fee)} for AAMA members and recent graduates of accredited programs, ${h.usd(x.feeNonMember ?? 0)} for others. Up to ${h.R.cma.attempts} attempts are allowed in ${h.R.cma.withinMonths} months, with no required wait. The ${h.a('cma-practice-exam', 'full CMA mock')} covers the format; the ${h.a('ccma-practice-test', 'CCMA practice test')} covers the NHA's alternative.</p>
<p>The questions are ours, written from the outline topics; they are not questions from the real exam.</p>`;
    },
  },
});
