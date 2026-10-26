import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ptce-practice-exam',
  group: 'pharm',
  order: 31,
  tool: { kind: 'quiz', props: { exam: 'ptce', mode: 'mock' } },
  mini: { kind: 'mini:pace', props: { e: 1 } },
  related: ['ptcb-practice-test', 'ptcb-exam', 'ptcb-exam-difficulty', 'study-plan'],
  sources: ['ptcb_outline', 'ptcb_cpht', 'ptcb_guidebook'],
  en: {
    slug: 'ptce-practice-exam',
    nav: 'PTCE practice exam (full mock)',
    card: 'A full 90-question PTCE mock in 1 hour 50 minutes, weighted like the 2026 outline and corrected at the end.',
    title: 'PTCE Practice Test 2026: Full 90-Question Timed Mock Exam',
    description: 'PTCE practice test 2026: a full 90-question timed mock in the 1 hour 50 minutes of the PTCB exam, weighted like the 2026 outline, with scores by domain.',
    h1: 'PTCE practice exam: the full 90 questions',
    intro: 'The length and testing time of the real PTCE, the four domains in their outline weights, a question map with flags, and corrections at the end.',
    resume: (h) => {
      const x = h.X('ptce');
      return `This mock follows the Pharmacy Technician Certification Exam at full size: ${x.items} questions in ${h.time('ptce')}, the testing time the PTCB gives, a little over a minute per question. The PTCB scores ${x.scored} of the questions and uses ${x.items - x.scored} to try out new items; they are mixed in, so the mock keeps all ${x.items}. The questions are split like the outline in force since ${h.date(h.R.ptce.outlineEffective)}: ${h.dom('ptce', 'med').items} on medications, ${h.dom('ptce', 'safe').items} on patient safety and quality assurance, ${h.dom('ptce', 'order').items} on order entry and processing and ${h.dom('ptce', 'fed').items} on federal requirements. Corrections appear only when you mark the test. The PTCB reports a scaled score between 1,000 and 1,600, and ${x.passText.replace('Official pass: ', '').toLowerCase()}; since no published table turns right answers into that scale, the mock reports your share of right answers against a study target of ${h.pc(x.target)} set by this site, and gives your result in each domain.`;
    },
    faqs: (h) => [
      { q: 'How many questions do I need right to pass the PTCE?', a: `The PTCB does not publish a number. It reports a scaled score, and ${h.X('ptce').passText.replace('Official pass: ', '').toLowerCase()}, with forms of different difficulty equated to the same scale. That is why our mock uses a study target of ${h.pc(h.X('ptce').target)}: comfortably above it on several mocks is a better sign than a guess at a cut score.` },
      { q: 'Can I bring my own calculator to the PTCE?', a: 'Personal items, phones and calculators included, stay out of the testing room; the PTCB guidebook describes what is provided during the session. Practice with a basic calculator rather than a phone app, and set up each problem before you compute: most calculation errors come from the setup, such as a unit left unconverted, not from the arithmetic.' },
      { q: 'What is a good score on this mock before booking?', a: `Aim for the ${h.pc(h.X('ptce').target)} study target on two or three full mocks taken on different days, with no domain far below the others. A weak federal requirements score is common and fixable in a few sessions; a weak medications score takes longer, since it rests on memorizing names and classes.` },
    ],
    body: (h) => {
      const x = h.X('ptce');
      return `
<h2>How the mock is drawn</h2>
<p>Each domain gets its share of the ${x.items} questions: ${x.domains.map((d) => `${d.short.toLowerCase()} ${d.items}`).join(', ')}. Inside a domain, questions are drawn from our pool and shuffled, and order entry includes calculation items in about the proportion the outline implies. Every new mock is a new draw; a shared link replays the same draw.</p>
<h2>Pacing the 110 minutes</h2>
<p>With ${h.time('ptce')} for ${x.items} questions you have about 73 seconds each. Recall questions on names, classes or schedules should take 20 to 40 seconds, which banks time for calculations. A useful checkpoint: question 45 by minute 55. The calculator above shows the time per question left if you keep a few minutes for flagged items at the end.</p>
<h2>Flags and the question map</h2>
<p>Answer every question on the first pass, even when unsure, and flag the ones worth a second look. Unanswered questions score nothing, and a first instinct is right more often than candidates expect. On your second pass, change an answer only when you find a concrete reason: a unit you misread, a word such as "except" you skipped.</p>
<h2>After the mock</h2>
<ol>
<li>Look at your score by domain before the total.</li>
<li>Read the explanation of every missed question and every lucky guess.</li>
<li>Note the rule or the drug you missed in one line, and work on that list with the ${h.a('ptcb-practice-test', 'domain practice sets')}.</li>
</ol>
<p>Missed questions are saved in this browser and return on the ${h.a('review-mistakes', 'review page')}. A ${h.a('study-plan', 'study plan')} spaces the next mocks.</p>
<h2>What the mock does not reproduce</h2>
<p>The PTCE appointment also includes a short tutorial and a survey around the testing time, which the ${h.src('ptcb_guidebook', 'PTCB guidebook')} describes. Our mock uses four-option questions throughout and keeps only the testing time. For registration, eligibility and retakes, see the ${h.a('ptcb-exam', 'PTCB exam guide')}.</p>
<p>The questions are ours, written from the outline topics; they are not questions from the real exam.</p>`;
    },
  },
});
