import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cna-written-exam',
  group: 'cna',
  order: 13,
  tool: { kind: 'quiz', props: { exam: 'cna', mode: 'practice', domain: 'bns', n: 10 } },
  mini: { kind: 'mini:pace', props: { e: 0 } },
  related: ['cna-practice-exam', 'cna-test-questions', 'cna-practice-test', 'cna-exam', 'prometric-cna-practice-test'],
  sources: ['credentia_written', 'credentia_outline', 'ecfr_483_154', 'prometric_fl'],
  en: {
    slug: 'cna-written-exam',
    nav: 'CNA written exam',
    card: 'The knowledge part of the nurse aide exam in detail: questions, pretest items, the oral version and how scenarios are built.',
    title: 'CNA Written Exam 2026: Questions, Oral Option and Outline',
    description: 'CNA written exam 2026: how many questions, how many are pretest items, how the oral version and its word recognition work, and the nine outline areas tested.',
    h1: 'The CNA written exam, and its oral version',
    intro: 'Ten questions on basic nursing skills to start with, then everything about the knowledge part: its length, its scoring and the way questions are worded.',
    resume: (h) => {
      const n = h.R.nnaap;
      return `The written exam is the knowledge part of the nurse aide competency evaluation. In the National Nurse Aide Assessment Program, owned by Credentia and used by many states, it has ${n.writtenItems} multiple-choice questions to answer in ${h.hm(n.writtenMinutes)}; ${n.writtenScored} are scored and ${n.writtenItems - n.writtenScored} are pretest items that do not count and cannot be told apart. Federal rules (42 CFR 483.154) let every candidate choose an oral version instead. In the NNAAP it has ${n.oralItems} questions read aloud and ${n.oralWordItems} word recognition items that check the candidate can read job-related words. Questions follow the 2024 content outline, in force since ${h.date(n.outlineEffective)}, grouped in three roles and nine areas; basic nursing skills alone weighs about ${h.pc(h.dom('cna', 'bns').share)} of a form. Each option set has one best answer, and the written part is reported as a pass or a fail, separately from the skills test. Prometric and Headmaster states use their own forms with different counts.`;
    },
    faqs: (h) => {
      const n = h.R.nnaap;
      return [
        { q: 'Can I ask for the CNA knowledge test to be read aloud?', a: 'Yes. Federal rules require that the aide be allowed to choose between a written and an oral examination, so every state offers an oral form. You must ask for it when you register, not on test day, and the fee may differ: in California, for example, the oral NNAAP costs more than the written one. Reading difficulty is a valid reason; no proof is required.' },
        { q: 'What is the word recognition part of the oral version?', a: `It is a short separate section, ${n.oralWordItems} items in the NNAAP, where you hear a word and pick it from a list of printed words. It checks that you can read the words you will meet on care plans and signs at work, such as those for common tasks and body parts. It is scored together with the ${n.oralItems} spoken questions.` },
        { q: 'Can I tell which written questions are pretest items?', a: `No. The ${n.writtenItems - n.writtenScored} pretest items are spread through the form and written in the same style as the scored ones. The vendor uses your answers to check whether new questions work before scoring them on later forms. The only sound strategy is to give every question your full attention and not spend time guessing which ones count.` },
        { q: 'Is the CNA written exam offered in Spanish?', a: `In some states. The Florida bulletin from Prometric states that its written test is given in English or Spanish. Other states and vendors set their own language options, and some offer only the oral version in another language. Check the candidate handbook of your state before registering, since the language is chosen with your application.` },
      ];
    },
    body: (h) => {
      const n = h.R.nnaap;
      const groups = [
        ['Physical care skills', ['adl', 'bns']],
        ['Psychosocial care skills', ['emo', 'spi']],
        ['Role of the nurse aide', ['self', 'com', 'rights', 'legal', 'team']],
      ] as const;
      const rows = groups.map(([g, codes]) => [g, codes.map((c) => h.dom('cna', c).name).join(', '), codes.reduce((s, c) => s + h.dom('cna', c).items, 0)]);
      return `
<h2>What a written form contains</h2>
<p>The NNAAP written test is one block of ${n.writtenItems} multiple-choice questions, each with one best answer (${h.src('credentia_written', 'Credentia, the NNAAP written examination')}). You have ${h.hm(n.writtenMinutes)}. Of the ${n.writtenItems} questions, ${n.writtenScored} decide your result and ${n.writtenItems - n.writtenScored} are being tried out for future forms. Your result is reported as pass or fail. There is no penalty for a wrong answer, so a blank is always worse than a guess.</p>
<p>The ${h.src('credentia_outline', '2024 content outline')}, in force since ${h.date(n.outlineEffective)}, groups the areas under three roles. The count below is our scaled estimate for a full form:</p>
${h.table(['Role', 'Areas', 'Questions'], rows, 'Area weights from the 2024 NNAAP outline, scaled to a full form.', ['l', 'l', 'r'])}
<p>Physical care carries the bulk of the test. The role of the nurse aide, spread across five small areas, adds up to more than many candidates expect, and its questions are often the easiest to secure once you know the rules on rights, ethics and reporting.</p>
<h2>How the questions are built</h2>
<p>Very few questions ask for a bare definition. Most give you a resident, a situation and a task, then ask what the aide should do, do first, or say. Three kinds come back often:</p>
<ul>
<li><strong>The priority question.</strong> Several options are correct actions, but only one comes first. A resident who is sliding out of a chair needs to be made safe before anyone is called.</li>
<li><strong>The scope question.</strong> One option belongs to the nurse, such as changing a diet or giving an opinion on a diagnosis. The aide observes, reports and follows the care plan.</li>
<li><strong>The words question.</strong> A resident says something, and you choose the reply that listens rather than argues, reassures falsely or changes the subject.</li>
</ul>
<p>Watch for words such as first, best, most important and except. A question that asks what the aide should not do flips the logic of the options, and missing that one word is a frequent reason for a wrong answer that the candidate actually knew.</p>
<p>When you cannot decide, eliminate before you choose. Cross out options that are unsafe, that go beyond the aide's role, or that ignore what the resident wants. Two options usually remain. Between those, prefer the one that acts on the resident's need now over one that postpones it, and the one that reports a change over one that keeps it to yourself.</p>
<h2>The oral version in practice</h2>
<p>Federal rules leave the choice of a written or an oral test to the aide (${h.src('ecfr_483_154', '42 CFR 483.154')}). In the NNAAP the oral form has ${n.oralItems} questions that you hear from a recording, followed by ${n.oralWordItems} word recognition items. The content is the same as the written test. What changes is the rhythm: you follow the recording rather than your own reading speed, and you may be able to replay a question, depending on how your site delivers it.</p>
<p>Choose the oral version if reading English slows you down, not as a shortcut. Practise by having someone read scenarios to you, or read them aloud yourself and answer without looking back at the text.</p>
<h2>Other vendors, other counts</h2>
<p>States that do not use the NNAAP write their own forms. Prometric forms in Texas, Florida and New York have 60 questions in 90 minutes, and Florida offers them in English or Spanish (${h.src('prometric_fl', 'Florida bulletin')}). Headmaster forms run 65 questions in Michigan, 75 in California and 79 in Ohio. The pacing tool above lets you check the time per question in each case; the ${h.a('prometric-cna-practice-test', 'Prometric page')} covers those three states in detail.</p>
<h2>Training for the written part</h2>
<p>Work in short sets by area, starting with basic nursing skills, which is the set loaded above. When your sets are steady, move to the ${h.a('cna-practice-exam', 'full timed mock')} to train stamina. To read questions with their answers rather than answer them, the ${h.a('cna-test-questions', 'question bank')} lists them by area. All questions on this site are written by us from the outline; none come from a real form.</p>
<!--tool:quiz|{"exam":"cna","domain":"legal","n":5}-->
<p>The five questions above come from legal and ethical behavior, a small area that rewards a single evening of focused review.</p>`;
    },
  },
});
