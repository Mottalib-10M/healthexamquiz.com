import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cna-test-questions',
  group: 'cna',
  order: 14,
  tool: { kind: 'bank', props: { exam: 'cna', domain: 'adl' } },
  mini: { kind: 'quiz', props: { exam: 'cna', mode: 'practice', domain: 'team', n: 5 } },
  related: ['cna-practice-test', 'cna-written-exam', 'cna-practice-exam', 'review-mistakes'],
  sources: ['credentia_outline', 'credentia_written', 'ecfr_483_154'],
  en: {
    slug: 'cna-test-questions',
    nav: 'CNA test questions',
    card: 'Every nurse aide question in our bank, sorted by exam area, with the right answer and a short explanation.',
    title: 'CNA Test Questions With Answers: Browse the Bank by Area',
    description: 'CNA test questions with answers and explanations, sorted by the nine areas of the nurse aide written exam, from daily living and basic nursing skills to rights.',
    h1: 'CNA test questions, with answers, by area',
    intro: 'Choose an area of the written exam and scroll through its questions. Try each one in your head before you open the answer.',
    resume: (h) => {
      const n = h.R.nnaap;
      return `This page lists the nurse aide questions of our bank, ${h.num(h.inPool('cna'))} in all, sorted by the nine areas of the 2024 NNAAP content outline in force since ${h.date(n.outlineEffective)}. Each question shows its options, the correct answer, a one or two sentence explanation and the area it trains. The largest groups are basic nursing skills (${h.num(h.inPool('cna', 'bns'))} questions) and activities of daily living (${h.num(h.inPool('cna', 'adl'))}), matching their weight on the real written test, which in the NNAAP format has ${n.writtenItems} questions of which ${n.writtenScored} are scored. The questions were written by Radif Partners from the outline topics and standard nurse aide practice. They are not items from any real exam: Credentia, Prometric and Headmaster keep their item banks confidential and change forms regularly, so any list sold as the real questions should be treated with suspicion. Browsing with answers visible is a review method; the quiz modes on this site remain the better way to learn, because they make you commit to an answer first.`;
    },
    faqs: (h) => [
      { q: 'Are these the actual questions from the CNA state exam?', a: 'No, and no honest source can offer them. Testing vendors keep their item banks secret, retire questions and add new pretest items to every form. Our questions are written from the published outline topics and test the same knowledge, the same rules and the same kind of scenario, so they prepare you for the real items without copying them.' },
      { q: 'Why do so many CNA answers involve telling the nurse?', a: 'Because reporting is the core of the aide\'s role. An aide sees the resident more than anyone, so changes in skin, appetite, mood, breathing or urine are noticed first by the aide. The exam rewards observing and reporting accurately, and it penalizes options where the aide decides on treatment, gives medication or explains a diagnosis alone.' },
      { q: 'How many questions does each area of the bank hold?', a: `The bank follows the outline weights, so the menu above shows large differences: basic nursing skills holds ${h.num(h.inPool('cna', 'bns'))} questions and daily living ${h.num(h.inPool('cna', 'adl'))}, while spiritual and cultural needs holds ${h.num(h.inPool('cna', 'spi'))}. The counts are taken from the question files each time the site is built, so they grow as questions are added.` },
      { q: 'Should I memorize the answers in the bank?', a: 'Memorize rules, not answers. On test day the same rule appears in a different scenario with different options, and a remembered letter is useless. After each question, say aloud the rule that makes the answer right, such as lock the bed wheels before a transfer. If you can state the rule, you can answer any version of it.' },
    ],
    body: (h) => {
      const rows = h.X('cna').domains.map((d) => [d.name, h.inPool('cna', d.code), d.items]);
      return `
<h2>What is in the bank</h2>
${h.table(['Outline area', 'Questions in our bank', 'Questions in a full mock'], rows, 'Bank counts read from the question files at build time; mock counts scaled from the 2024 NNAAP outline.', ['l', 'r', 'r'])}
<p>The areas follow the ${h.src('credentia_outline', 'NNAAP content outline')} word for word, so you can match each one with a chapter of your training notes. Each question carries its area under the stem, which helps when you want to know whether a weak spot is a whole area or a single topic inside it.</p>
<h2>Three questions taken apart</h2>
<p>Reading an answer is only useful if you see why the other options are wrong. Here is the reasoning behind three typical items, one from each part of the outline.</p>
<p><strong>Daily living.</strong> A resident with a weak left side needs help putting on a shirt. Which arm goes into the sleeve first? The weak arm. Dressing starts with the affected side and undressing starts with the strong side, so the weak limb moves as little as possible. The tempting wrong option is the strong arm, because it feels natural to start with the arm that helps.</p>
<p><strong>Basic nursing skills.</strong> You find a resident on the floor. What do you do first? Stay with the resident and call for help with the call light or by voice. Do not lift the resident yourself, because an injury must be assessed by the nurse first. Options that involve moving the resident, even to make them comfortable, are wrong.</p>
<p><strong>Client rights.</strong> A resident refuses a shower today. What should the aide do? Respect the refusal, ask whether another time would suit, and report it to the nurse. Persuading the resident with pressure, or skipping it without telling anyone, are both wrong: the first ignores a right, the second ignores the duty to report.</p>
<h2>A method for browsing</h2>
<ol>
<li>Pick one area and read ten questions with the answer hidden. Decide on your option before opening it.</li>
<li>Mark each question in your notes as known, guessed or wrong. A correct guess counts as wrong.</li>
<li>For every wrong or guessed item, write the rule in one short line. Ten lines a day is a solid pace.</li>
<li>The next day, test those rules in a ${h.a('cna-practice-test', 'practice set')} on the same area. If the rule holds in a new question, it is learned.</li>
</ol>
<p>Avoid reading the whole bank in one evening. Familiarity grows fast when the answers are in front of you, and it feels like knowledge until a question is worded differently.</p>
<h2>Patterns worth knowing</h2>
<p>A few rules answer a large share of the bank. Safety comes first: lock wheels, lower the bed, keep the call light within reach. Privacy and dignity follow: knock, close the curtain, cover the resident. Infection control is constant: hand hygiene before and after contact, gloves when touching body fluids, and clean to dirty when washing. And the aide works within the care plan: anything new or abnormal goes to the nurse.</p>
<p>Communication questions have their own logic. The best reply is usually open, calm and focused on the resident's feelings, without false reassurance. Try the five communication questions below with that rule in mind.</p>
<!--tool:quiz|{"exam":"cna","domain":"com","n":5}-->
<p>Questions on confusion and dementia follow a pattern of their own. The right answer stays calm, keeps routines, uses short sentences and redirects the resident to something familiar rather than arguing about facts. Correcting a confused resident sharply, restraining without an order, or leaving a wandering resident alone are the typical wrong options. You will find these in the emotional and mental health area of the bank.</p>
<h2>Where the bank fits in your preparation</h2>
<p>Use it at two moments: right after a practice set, to read the neighbors of the questions you missed, and during the last days, as a fast review of rules you already know. For everything in between, answering beats reading. Once each area feels solid, sit the ${h.a('cna-practice-exam', 'full timed mock')}, and let the ${h.a('review-mistakes', 'review page')} bring back the questions you got wrong. The knowledge part itself is described on the ${h.a('cna-written-exam', 'written exam page')}.</p>`;
    },
  },
});
