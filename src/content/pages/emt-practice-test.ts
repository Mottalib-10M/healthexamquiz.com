import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'emt-practice-test',
  group: 'emt',
  order: 71,
  tool: { kind: 'quiz', props: { exam: 'emt', mode: 'mock' } },
  mini: { kind: 'mini:pace', props: { e: 7 } },
  related: ['nremt-practice-test', 'nremt-exam', 'emt-exam-questions', 'study-plan'],
  sources: ['nremt_exams', 'nremt_structure', 'nremt_cognitive'],
  en: {
    slug: 'emt-practice-test',
    nav: 'EMT practice test (full mock)',
    card: 'A full 120-question timed EMT mock across the five NREMT domains, corrected at the end like the real exam.',
    title: 'EMT Practice Test 2026: Full 120-Question Timed Mock',
    description: 'EMT practice test 2026: a full 120-question timed mock in the two hours of the NREMT exam, spread over its five domains and corrected at the end by domain.',
    h1: 'EMT practice test: a full timed mock',
    intro: 'One hundred and twenty questions, two hours, no correction until you mark the test. Flag what you want to revisit and use the question map.',
    resume: (h) => {
      const x = h.X('emt');
      return `This EMT practice test reproduces the longest form the NREMT cognitive exam can take: ${x.items} questions in ${h.time('emt')}. The real exam is computer adaptive. It starts near the passing standard, picks each next question according to your previous answers, and stops between ${x.itemsMin} and ${x.items} questions, once it is 95% confident that your ability is above or below the standard, or when the questions or the time run out. A candidate who stops early has not necessarily failed or passed; the length only shows how quickly the exam reached a decision. Because the adaptive engine and its item bank cannot be reproduced, our mock is a fixed-length test with the domain weights the NREMT publishes, which trains the stamina and the pacing that a long sitting demands. Your share of right answers is compared with a study target of ${h.pc(x.target)} set by this site; the official result is ${x.passText.replace('Official pass: ', '').toLowerCase()}.`;
    },
    faqs: (h) => [
      { q: 'Why does the NREMT exam end at different lengths for different people?', a: `Because it is adaptive. After each answer the exam estimates your ability and stops as soon as it is 95% sure whether you are above or below the passing standard. Some candidates are decided after ${h.X('emt').itemsMin} questions, others need many more. Stopping early is not a sign of failure, and running to the end is not either.` },
      { q: 'Should I take the full 120 questions in one sitting?', a: 'Yes, at least twice before the exam. The point of a full mock is to learn your pace and how your attention holds late in the test. Sit somewhere quiet, keep your phone away, and do not pause the timer. Then review every wrong answer, which takes longer than the mock itself and is where most of the learning happens.' },
      { q: 'Can I go back to earlier questions on the real NREMT exam?', a: 'No. On the adaptive exam each answer is final, because the next question depends on it. Our mock lets you flag and revisit questions, which is useful for practice, but train yourself to commit: read the whole stem, find the priority, choose, and move on. Changing answers late is rarely an advantage.' },
      { q: 'What score on this mock means I am ready?', a: `No mock can promise a result. As a rule of thumb, aim to reach the ${h.pc(h.X('emt').target)} study target on two or three full mocks drawn on different days, with no domain far below the rest. A weak primary assessment score matters most, because that domain carries the largest share of the real exam.` },
    ],
    body: (h) => {
      const x = h.X('emt');
      return `
<h2>How this mock is built</h2>
<p>The ${x.items} questions are drawn from our EMT pool by domain, in proportion to the NREMT ranges: ${x.domains.map((d) => `${d.short.toLowerCase()} ${d.items}`).join(', ')}. Pediatric cases are mixed into every domain, as on the real exam. The order is shuffled, and the same draw comes back if you share the link, so a study partner can take the same test.</p>
<p>The timer counts down ${h.time('emt')} in your browser. Nothing is sent anywhere; your answers and score stay on this device, and the ${h.a('review-mistakes', 'review page')} brings back the questions you missed.</p>
<h2>Pacing over two hours</h2>
<p>Two hours for ${x.items} questions leaves one minute per question. Most questions take less; long scenarios with vital signs take more. A simple check: by the one-hour mark you should be around question 60. If you are well behind, you are rereading too much. The calculator above shows the seconds per question that remain if you keep some minutes for a final review, which on the real exam you will not have, since answers cannot be revisited.</p>
<h2>Reading your results</h2>
<p>After you mark the test, the result panel shows your share of right answers, the study target and your score in each domain. Look at the domains before the total:</p>
<ul>
<li>a primary assessment score well below your average is the first thing to fix, since it is ${h.dom('emt', 'primary').range} of the real exam;</li>
<li>a weak operations score is usually quick to raise with a few sets on consent, refusal and documentation;</li>
<li>a weak treatment score often hides a scope problem: choosing interventions beyond EMT level.</li>
</ul>
<p>Then go through every missed question and read the explanation. Write down the rule you missed in one line; a list of those lines is a better last-week review than rereading a textbook.</p>
<h2>Three mocks, spaced out</h2>
<p>A pattern that works for many students: one mock right after finishing the course, one a week later after targeted practice with the ${h.a('nremt-practice-test', 'domain sets')}, and a last one three or four days before the exam. Each mock draws new questions as long as the pool allows; the ${h.a('emt-exam-questions', 'question bank page')} lets you browse every question of a domain with its answer.</p>
<h2>What the mock cannot reproduce</h2>
<p>The adaptive engine, the exact item types the NREMT uses and its scoring scale belong to the NREMT and are not public. The psychomotor (skills) exam, organized under your state's authority, is separate and is not covered here. The ${h.a('nremt-exam', 'NREMT exam guide')} explains eligibility, the fee, the score and the retake rules.</p>
<p>These questions are written by us from the NREMT domains; they are not questions from the real exam, and their clinical content is exam knowledge rather than medical advice.</p>`;
    },
  },
});
