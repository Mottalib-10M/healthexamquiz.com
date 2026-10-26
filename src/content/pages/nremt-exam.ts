import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'nremt-exam',
  group: 'emt',
  order: 72,
  tool: { kind: 'mini:pace', props: { e: 7 } },
  mini: { kind: 'quiz', props: { exam: 'emt', domain: 'primary', n: 5 } },
  related: ['nremt-practice-test', 'emt-practice-test', 'exam-fees-retakes', 'which-certification'],
  sources: ['nremt_exams', 'nremt_cognitive', 'nremt_fee', 'nremt_structure', 'nremt_recert'],
  demarche: true,
  en: {
    slug: 'nremt-exam',
    nav: 'NREMT exam guide',
    card: 'The EMT cognitive exam explained: adaptive length, score of 950, fee, eligibility, 15-day wait and six attempts.',
    title: 'NREMT Exam 2026: EMT Format, Score, Fee and Retake Rules',
    description: 'NREMT exam 2026 for EMTs: how the adaptive test works, the passing score of 950, the fee per attempt, eligibility, the 15-day wait and the six attempts allowed.',
    h1: 'The NREMT EMT exam, explained',
    intro: 'How long the adaptive test runs, what the score means, what it costs and what happens after a failed attempt, read on the NREMT handbook pages.',
    resume: (h) => {
      const x = h.X('emt'), R = h.R.emt;
      return `The NREMT EMT exam is the cognitive certification test of the National Registry of Emergency Medical Technicians, delivered by Pearson VUE at a test center or online. Since ${h.date(R.launched)} it follows a new exam design for basic life support with five domains led by primary assessment. It is computer adaptive: between ${x.itemsMin} and ${x.items} questions in up to ${h.time('emt')}, with results reported on a scale of 100 to 1,500 where 950 is the passing standard. Each attempt costs ${h.usd(x.fee)}. To apply, a candidate must have completed a state-approved EMT course within the last ${R.courseWithinYears} years and hold a passed state-approved psychomotor exam. After a failed attempt the candidate waits ${R.waitDays} days; after ${R.remedialAfter} failures remedial training is required, and ${R.attempts} attempts are allowed in all. Certification lasts ${R.renewYears} years. State licensure is a separate step granted by each state.`;
    },
    faqs: (h) => [
      { q: 'What does a score of 950 on the NREMT exam mean?', a: 'It is the passing point on the NREMT reporting scale, which runs from 100 to 1,500. The scale measures ability, not the share of right answers: because each candidate sees different questions of different difficulty, two people with the same number of right answers can end with different scores. That is why no count of correct answers equals a pass.' },
      { q: 'How soon can I retake the NREMT EMT exam?', a: `After ${h.R.emt.waitDays} days. Each attempt is paid again. After ${h.R.emt.remedialAfter} failed attempts the NREMT requires remedial training before the next one, and ${h.R.emt.attempts} attempts are allowed in total; after that, the candidate must complete a full EMT course again. Your eligibility also depends on finishing the course within the last ${h.R.emt.courseWithinYears} years.` },
      { q: 'Is the NREMT the same as a state EMT license?', a: 'No. The NREMT certifies that you passed a national standard; the state issues the license that lets you work. Most states use NREMT certification as a step toward their license, and some add their own requirements, such as a background check. Check your state EMS office before you register.' },
      { q: 'How is the NREMT certification renewed?', a: `Every ${h.R.emt.renewYears} years, with continuing education that follows the NREMT renewal model. The recertification fee goes to ${h.usd(h.R.emt.renewFee)} from ${h.date(h.R.emt.renewFeeFrom)}. Renewal is separate from state relicensure, which has its own dates, fees and continuing education rules, so keep track of both deadlines and start the hours early rather than in the last month.` },
    ],
    body: (h) => {
      const x = h.X('emt'), R = h.R.emt;
      return `
<h2>The adaptive design in plain words</h2>
<p>The exam starts with a question near the passing standard. A right answer brings a slightly harder question, a wrong one a slightly easier one. After each answer the computer updates its estimate of your ability. It stops as soon as it is 95% confident that you are above or below the standard, which can happen after ${x.itemsMin} questions, or it continues up to ${x.items} questions or the ${h.time('emt')} limit (${h.src('nremt_structure', 'NREMT exam structure')}). A small number of pilot questions are mixed in and do not count. Answers cannot be changed once submitted, since the next question depends on them.</p>
<p>Two consequences matter for preparation. First, the questions will feel hard, because the exam keeps you near the limit of your ability; that is normal. Second, a short exam is not a sign of failure. The pacing calculator above shows how much time each question gets in the longest case.</p>
<h2>The five domains</h2>
${h.outline('emt', `Ranges published by the ${h.src('nremt_exams', 'NREMT')}; our mock uses the middle of each range for 120 questions.`)}
<h2>Eligibility and registration</h2>
<ol>
<li>Complete a state-approved EMT course; it must be finished within the last ${R.courseWithinYears} years when you test.</li>
<li>Pass a state-approved psychomotor (skills) exam.</li>
<li>Create an NREMT account, apply, and pay ${h.usd(x.fee)} per attempt (${h.src('nremt_fee', 'NREMT fee page')}).</li>
<li>Once your course director verifies completion, schedule with Pearson VUE at a test center or online.</li>
</ol>
<p>Results appear in your NREMT account. A failed result comes with feedback by domain, which tells you where to focus.</p>
<h2>Retake rules</h2>
${h.table(['Rule', 'NREMT policy'], [['Wait after a failed attempt', `${R.waitDays} days`], ['Remedial training required after', `${R.remedialAfter} failed attempts`], ['Attempts allowed in all', `${R.attempts}`], ['Course must be completed within', `${R.courseWithinYears} years`]], `${h.src('nremt_cognitive', 'NREMT cognitive exam handbook')}, read on ${h.read}.`, ['l', 'l'])}
<h2>After you pass</h2>
<p>The certification is valid for ${R.renewYears} years and expires on March 31 of the renewal year. Renewal requires continuing education and a fee, which becomes ${h.usd(R.renewFee)} from ${h.date(R.renewFeeFrom)} (${h.src('nremt_recert', 'NREMT certification process')}). Separately, apply to your state for the license; most states accept NREMT certification as part of that process.</p>
<h2>Preparing efficiently</h2>
<p>Start with the ${h.a('nremt-practice-test', 'practice sets by domain')}, beginning with primary assessment, then sit the ${h.a('emt-practice-test', 'full timed mock')} at least twice. The ${h.a('exam-fees-retakes', 'fees and retakes page')} compares the NREMT rules with the other health certifications.</p>
<p>This site is independent of the NREMT and Pearson VUE and plays no part in applications, scheduling or results.</p>`;
    },
  },
});
