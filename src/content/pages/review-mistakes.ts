import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'review-mistakes',
  group: 'plan',
  order: 82,
  tool: { kind: 'quiz', props: { exam: 'cna', mode: 'review', pick: true, n: 10 } },
  mini: { kind: 'progress', props: { exam: 'cna' } },
  related: ['study-plan', 'cna-practice-test', 'ptcb-practice-test', 'nremt-practice-test', 'ccma-practice-test'],
  sources: ['nremt_cognitive', 'ptcb_outline', 'credentia_outline'],
  en: {
    slug: 'review-mistakes',
    nav: 'Review your mistakes',
    card: 'The questions you missed come back until you get them right, with your progress by outline domain.',
    title: 'Review Missed Practice Questions and Track Your Progress',
    description: 'Review missed practice questions on any of the eight exams until you get them right, and track your progress by outline domain. Saved only in this browser.',
    h1: 'Review the questions you missed',
    intro: 'Pick an exam: the questions you answered wrong last time come back first. Below, your progress by outline domain.',
    resume: (h) => `Every time you answer a question on this site, in a practice set or a mock, the answer is saved in this browser: which question, and whether your last answer was right. Nothing is sent to us or to anyone; there is no account, and the data lives in the browser's local storage until you erase it with the button in the progress panel. This page uses that record in two ways. The review quiz serves again the questions whose last answer was wrong, for the exam you choose, until you get each of them right; a question you then answer correctly leaves the review list. The progress panel shows, for each outline domain, how many questions of our pool you have seen, your share right on the last attempt, and your last full mocks. With ${h.num(h.count)} questions in the bank across eight exams, the record is what turns a pile of practice sets into a plan: it tells you which domain to work on next and which rules you keep missing. A private window or another browser starts empty.`,
    faqs: () => [
      { q: 'Why review missed questions instead of doing new ones?', a: 'Because a missed question marks a rule you have not yet fixed in memory, and getting it right later, after a delay, is what makes it stick. New questions are still useful to test whether the rule holds in another situation, so alternate: a review round, then a fresh set from the same domain, then review again.' },
      { q: 'Is my progress saved if I close the browser?', a: 'Yes, in the same browser on the same device, until you erase it or clear the site data. It does not follow you to your phone or to another computer, and a private window does not keep it. That is the price of keeping everything on your device: we never receive your answers, so we cannot restore them either.' },
      { q: 'How do I start over with a clean slate?', a: 'Use the erase button in the progress panel, which removes the saved answers and mock results for every exam at once. Clearing this site data in your browser settings does the same. There is nothing to delete on our side, because nothing was ever sent.' },
      { q: 'What does the share right per domain tell me?', a: 'It is the share of right answers on your last attempt at each question of that domain that you have seen. A domain with few questions seen can show a high or low share by chance, so look at both figures together. When a domain stays below the study target after many questions, that is where your next session should go.' },
    ],
    body: (h) => `
<h2>How the review list works</h2>
<p>For each question you answer, the site keeps the last result. The review quiz takes, for the exam you pick, every question whose last result is wrong, shuffles them and serves up to ten at a time. Answer one correctly and it drops off the list; miss it again and it stays. When the list is empty, the quiz says so and points you back to the practice sets. Questions shared between exams, for example venipuncture questions used for the CPT and the medical assistant exams, keep one record, so a question you fixed while preparing one exam stays fixed for the other.</p>
<h2>Reading the progress panel</h2>
<ul>
<li><strong>Seen:</strong> how many questions of the domain you have answered at least once, against the size of our pool for that domain.</li>
<li><strong>Right on the last attempt:</strong> your current state, not your history; a rule you have since learned counts as right.</li>
<li><strong>Weight:</strong> the share of the real exam the domain represents, so you can tell a weak small domain from a weak large one.</li>
<li><strong>Last mocks:</strong> your recent full mock exams with their score, to see the trend.</li>
</ul>
<h2>A weekly rhythm that works</h2>
<p>Practice sets during the week, one domain at a time; a review round at the end of each session; one full mock at the weekend, then a review of everything it caught. Before each new mock, the review list should be short. If it keeps growing, slow down on new questions and spend a session only on review and on the explanations. The ${h.a('study-plan', 'study plan calculator')} turns the days you have left into a number of questions a day.</p>
<h2>What is stored, exactly</h2>
<p>Two entries in your browser's local storage: one with, for each question id you answered, how many times you saw it, how many times you got it right and whether the last answer was right; one with the results of your last mocks. No name, no email, no answer text, nothing that identifies you. The site sets no cookie for this, and the data is never transmitted. The ${h.a('method', 'method page')} explains how the questions themselves are written.</p>
<h2>When you are ready</h2>
<p>A short review list, every domain at or above the study target and two full mocks above it on different days: that is a good moment to book. The official passing standards are scaled scores or state pass marks, not the study target; each exam page gives them, and the NREMT handbook, for example, explains how its ${h.src('nremt_cognitive', 'adaptive exam')} reaches a decision.</p>`,
  },
});
