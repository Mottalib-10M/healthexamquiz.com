import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'emt-exam-questions',
  group: 'emt',
  order: 73,
  tool: { kind: 'bank', props: { exam: 'emt', domain: 'primary' } },
  related: ['nremt-practice-test', 'emt-practice-test', 'nremt-exam', 'apgar-score'],
  sources: ['nremt_exams', 'nremt_structure', 'nremt_cognitive'],
  en: {
    slug: 'emt-exam-questions',
    nav: 'EMT exam questions',
    card: 'Browse every EMT question of a domain with its answer, its explanation and the domain it trains.',
    title: 'EMT Exam Questions: Browse the Bank With Answers, by Domain',
    description: 'EMT exam questions with answers and explanations, sorted by NREMT domain: scene size-up, primary and secondary assessment, treatment and transport, operations.',
    h1: 'EMT exam questions with answers',
    intro: 'Pick a domain and read every question in it, with the right answer and the reasoning. Open an answer only after you have chosen yours.',
    resume: (h) => {
      const x = h.X('emt');
      return `This page lists our EMT questions domain by domain, each with its four options, the right answer, an explanation and the part of the NREMT exam it trains. It holds ${h.num(h.inPool('emt'))} questions written by Radif Partners for the five domains of the NREMT EMT cognitive exam in force since ${h.date(h.R.emt.launched)}: scene size-up and safety, primary assessment, secondary assessment, patient treatment and transport, and operations. The real exam draws its questions from a secret bank and adapts their difficulty to each candidate, between ${x.itemsMin} and ${x.items} questions; no public list can contain them, and any site that promises the real questions should be avoided. Reading a bank with answers is useful in two moments: after a practice set, to read the questions around the ones you missed, and in the last days before the exam, to review the rules you already know quickly. The quiz and the timed mock remain the better tools for learning, because choosing before seeing the answer is what builds recall.`;
    },
    faqs: (h) => [
      { q: 'Is it better to read questions with answers or to take quizzes?', a: 'Quizzes, for most of your study time. Trying to recall the answer before seeing it is what fixes it in memory, while reading an answer feels familiar without being learned. Use this bank to review the explanation behind a domain after a quiz, or for a fast pass over rules you already know in the final days.' },
      { q: 'How many questions are in each EMT domain here?', a: `The pool follows the weight of each domain on the NREMT exam, so primary assessment has the most, about ${h.inPool('emt', 'primary')} questions, and secondary assessment the fewest. The menu above the list shows each domain; questions also appear in the practice test and in the full mock, drawn from the same pool.` },
      { q: 'Why do some explanations mention what not to do?', a: 'Because NREMT scenarios often include an option that is a real EMT action but the wrong one at that moment, such as starting a detailed exam while the airway is still unsecured. Knowing why the tempting option is wrong is the skill that the exam measures, so many explanations name it and say what should come first.' },
    ],
    body: (h) => {
      const rows = h.X('emt').domains.map((d) => [d.name, h.inPool('emt', d.code)]);
      return `
<h2>What the bank contains</h2>
${h.table(['Domain', 'Questions in our bank'], rows, 'Counted from the question files when the site was built.', ['l', 'r'])}
<p>Each question states a situation, often a patient with a complaint, a mechanism and a few vital signs, and asks for the best action or the most likely problem. The explanation gives the rule behind the answer, and the label under the question names the domain. Pediatric and obstetric cases are spread through the domains, as on the real exam.</p>
<h2>How to read it without fooling yourself</h2>
<ol>
<li>Cover the answer. Read the stem and the four options and pick one before you open the answer.</li>
<li>When you were wrong, write the rule you missed in one sentence. If you were right for the wrong reason, count it as wrong.</li>
<li>After ten or fifteen questions, switch to the ${h.a('nremt-practice-test', 'practice test')} for the same domain and see whether the rules hold under a new draw.</li>
</ol>
<h2>The rules that come back most often</h2>
<p>Across the domains, a short list of priorities answers a large share of the questions. Scene safety and protective equipment come before contact. In the primary assessment, an open airway, adequate breathing and control of severe bleeding come before anything else, and a patient with a problem there is a priority for transport. Ventilation with a bag-valve mask is for inadequate breathing, while a nonrebreather mask needs adequate breathing to work. An unresponsive patient without a gag reflex can take an oral airway; a nasal airway is avoided with signs of a skull fracture or facial trauma. In treatment, every medication question checks indication, contraindication, dose route and scope: an EMT assists with a patient's own prescribed nitroglycerin or inhaler but does not give drugs outside the national scope. In operations, a competent adult may refuse care, and the refusal must be informed and documented.</p>
<h2>When the bank and the exam differ</h2>
<p>Our explanations follow the national EMT education level. Local protocols can differ on details such as spinal motion restriction criteria or oxygen targets, and the NREMT tests the national standard rather than local practice. When your course taught a local variant, learn both and answer the exam with the national one. The ${h.a('nremt-exam', 'exam guide')} explains the format and the rules; the ${h.a('emt-practice-test', 'full mock')} puts the whole bank under time pressure.</p>
<p>These questions are ours, written from the NREMT domains, and are not questions from the real exam. Their clinical content is exam knowledge, not medical advice.</p>`;
    },
  },
});
