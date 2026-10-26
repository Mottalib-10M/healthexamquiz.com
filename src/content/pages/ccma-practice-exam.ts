import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ccma-practice-exam',
  group: 'ma',
  order: 51,
  tool: { kind: 'quiz', props: { exam: 'ccma', mode: 'mock' } },
  mini: { kind: 'mini:pace', props: { e: 3 } },
  related: ['ccma-practice-test', 'ccma-exam', 'cma-practice-exam', 'study-plan'],
  sources: ['nha_ccma_plan', 'nha_handbook'],
  en: {
    slug: 'ccma-practice-exam',
    nav: 'CCMA practice exam (full mock)',
    card: 'A full 180-question timed CCMA mock over three hours, spread across the twelve test plan areas.',
    title: 'CCMA Practice Exam 2026: Full 180-Question Timed Mock',
    description: 'CCMA practice exam 2026: a full 180-question timed mock over the three hours of the NHA exam, across the twelve test plan areas, with results by area.',
    h1: 'CCMA practice exam: the full three hours',
    intro: 'The length and time of the real CCMA: one hundred and eighty questions, a question map with flags, and the corrections only when you mark the test.',
    resume: (h) => {
      const x = h.X('ccma');
      return `This practice exam reproduces the CCMA at full length: ${x.items} questions in ${h.time('ccma')}, one minute per question. The real exam counts ${x.scored} of them and uses the other ${x.items - x.scored} to try out new items; they are mixed in and look the same, so the mock includes the full number. Questions are drawn from each of the twelve areas of the NHA test plan in proportion to their weight, from general patient care, the largest with ${h.dom('ccma', 'care').items} questions in the mock, to medical law and ethics with ${h.dom('ccma', 'law').items}. Answers are not shown until you mark the test, as on test day. The result panel gives your share of right answers, the study target of ${h.pc(x.target)} set by this site and your score in each area. The NHA reports a scaled score instead, ${x.passText.replace('Official pass: ', '').toLowerCase()}, obtained by equating test forms; no number of right answers converts to it, which is why the mock uses a study target and says so.`;
    },
    faqs: (h) => [
      { q: 'Is three hours enough for the CCMA?', a: `It is one minute per question, which is enough for most candidates if they do not get stuck. Long scenario questions take more, short terminology questions less. On this mock, check at the ninety-minute mark that you are near question 90. If you are well behind, flag the hard questions and come back to them rather than solving each one in order.` },
      { q: 'What should I do right after the mock?', a: 'Look at the area scores before the total. Then read every explanation for the questions you missed and for those you guessed right. Write the rule behind each mistake in one line. That list is the most useful review material you will have in the last week, more than rereading a textbook chapter.' },
      { q: 'How many full mocks should I take before the CCMA?', a: `Two or three, spaced a week apart, is a common rhythm. More is not better if you do not review in between. Aim to reach the ${h.pc(h.X('ccma').target)} study target on at least two of them, on different draws, with no area far below the others; a weak general patient care score matters most.` },
    ],
    body: (h) => {
      const x = h.X('ccma');
      const clin = x.domains.filter((d) => ['vitals', 'care', 'infect', 'poct', 'phleb', 'ekg'].includes(d.code));
      return `
<h2>How the mock is drawn</h2>
<p>Each area receives its number of questions from the test plan scaled to ${x.items}: ${x.domains.map((d) => `${d.short.toLowerCase()} ${d.items}`).join(', ')}. The six clinical areas together take ${clin.reduce((s, d) => s + d.items, 0)} questions. Within an area the questions are shuffled from our pool, so each new mock is a new draw; a shared link replays the same draw for a study partner.</p>
<h2>Using the question map and flags</h2>
<p>The grid next to the questions shows which ones you have answered and which you have flagged. A good habit for a long exam: answer every question on the first pass, even when unsure, and flag the ones you want to revisit. With time left at the end, go back to the flags only.</p>
<h2>Reading the result</h2>
<p>The result panel shows the total and the score in each area. Read it in three steps:</p>
<ol>
<li><strong>Clinical areas first.</strong> They make up most of the exam; a low score in general patient care or infection control costs the most.</li>
<li><strong>Then the areas with few questions.</strong> With only ${h.dom('ccma', 'law').items} law and ethics questions, one or two misses swing the area score a lot; look at what you missed rather than the percentage.</li>
<li><strong>Then the total</strong> against the study target, remembering that the NHA's scaled score is computed differently.</li>
</ol>
<h2>Before and after</h2>
<p>Before the first mock, practice each area at least once with the ${h.a('ccma-practice-test', 'CCMA practice test')}, which corrects every answer at once. After each mock, the missed questions are saved in this browser for the ${h.a('review-mistakes', 'review page')}. For eligibility, registration and retakes, see the ${h.a('ccma-exam', 'CCMA exam guide')}; for the AAMA's credential, the ${h.a('cma-practice-exam', 'CMA (AAMA) mock')} has a different length and timing.</p>
<p>The questions are ours, written from the topics of the NHA test plan; they are not questions from the real exam.</p>`;
    },
  },
});
