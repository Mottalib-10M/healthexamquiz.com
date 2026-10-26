import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cna-practice-test',
  group: 'cna',
  order: 10,
  tool: { kind: 'quiz', props: { exam: 'cna', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:pace', props: { e: 0 } },
  related: ['cna-practice-exam', 'cna-skills-list', 'cna-exam', 'cna-test-questions', 'review-mistakes'],
  sources: ['credentia_outline', 'credentia_written', 'ecfr_483_154', 'ncsbn_nnaap'],
  en: {
    slug: 'cna-practice-test',
    nav: 'CNA practice test',
    card: 'Ten questions at a time on one area of the nurse aide written exam, each answer explained at once.',
    title: 'CNA Practice Test 2026: Free Questions by Exam Area',
    description: 'CNA practice test 2026: free nurse aide questions by area of the written exam (daily living, basic nursing skills, rights), each answer corrected and explained.',
    h1: 'CNA practice test, one exam area at a time',
    intro: 'Pick an area of the written exam, answer ten questions and read why each answer is right. Your answers stay in this browser.',
    resume: (h) => {
      const n = h.R.nnaap;
      return `The nurse aide competency exam has two parts that every candidate must pass: a written test, which can be taken as an oral test read aloud instead, and a skills test performed in front of an evaluator. Federal rules (42 CFR 483.154) let each state choose its exam and its vendor, so formats vary, but most states build on the National Nurse Aide Assessment Program, now owned by Credentia. In the NNAAP format the written test has ${n.writtenItems} multiple-choice questions, ${n.writtenItems - n.writtenScored} of them unscored pretest items, to answer in ${h.hm(n.writtenMinutes)}. The questions follow a content outline in force since ${h.date(n.outlineEffective)} with nine areas, from activities of daily living and basic nursing skills, the two heaviest, to client rights, communication and the role of the aide in the care team. This practice test draws ten questions from one area at a time; each answer is corrected at once, with the outline area it trains and a short explanation.`;
    },
    faqs: (h) => [
      { q: 'How many questions can I miss on the CNA written exam?', a: 'There is no single national figure. Each state program sets its own passing standard, and the NNAAP reports a pass or a fail rather than a count of right answers. Where a vendor prints a percentage, it is usually between 70% and 75%. Aim well above that in practice, because the pretest items you cannot spot still take time.' },
      { q: 'Is the oral version of the written test easier?', a: `It covers the same content. In the NNAAP format the oral version has ${h.R.nnaap.oralItems} questions read aloud and ${h.R.nnaap.oralWordItems} word recognition items, and it suits candidates who read English slowly. Federal rules let the aide choose the oral form. You request it when you register, and the fee can differ from the written test.` },
      { q: 'Which areas of the written exam carry the most questions?', a: `Basic nursing skills and activities of daily living. In a full ${h.R.nnaap.writtenItems}-question form they account for about ${h.dom('cna', 'bns').items} and ${h.dom('cna', 'adl').items} questions, more than half of the test between them. Safety, infection control, measuring vital signs and helping with eating, bathing and toileting sit there. Client rights and emotional needs come next.` },
      { q: 'Does this practice test work for Prometric and Headmaster states?', a: 'Yes for the knowledge, with a different count. Texas, Florida and New York use Prometric with 60 questions in 90 minutes, and Ohio and Michigan use Headmaster forms of 79 and 65 questions. The topics are the same nurse aide duties, so practice by area applies; the full mock follows the NNAAP length.' },
    ],
    body: (h) => {
      const n = h.R.nnaap;
      const rows = h.X('cna').domains.map((d) => [d.name, d.items, h.inPool('cna', d.code)]);
      return `
<h2>The nine areas of the written exam</h2>
<p>The NNAAP outline sorts the questions into three broad roles, physical care skills, psychosocial care skills and the role of the nurse aide, then into nine areas. The table gives the number of questions each area takes in our full mock, scaled from the outline to the ${n.writtenItems} questions of the real form, and the size of our pool for that area.</p>
${h.table(['Area', 'Questions in a full mock', 'Questions in our pool'], rows, `NNAAP content outline (${h.src('credentia_outline', 'Credentia')}), in force since ${h.date(n.outlineEffective)}.`, ['l', 'r', 'r'])}
<p>The two heavy areas deserve most of your time. Basic nursing skills covers infection control, safety and emergencies, measuring and recording vital signs, intake and output, and reporting what you observe. Activities of daily living covers hygiene, dressing, eating and drinking, elimination, rest and comfort. The smaller areas are quick to master and often decide a borderline result, because their questions are close to common sense once you know the rule behind them, such as a client's right to refuse care.</p>
<h2>How to use the practice test</h2>
<p>Start with the area you feel least sure about rather than the first one in the list. Answer the ten questions without looking anything up; the correction and the explanation appear as soon as you choose. When a set is done, draw another one from the same area until two sets in a row are above 80%, then move on. The site keeps, in this browser only, the questions you missed, and the ${h.a('review-mistakes', 'review page')} serves them again until you get them right.</p>
<p>Once each area is above that line, switch to a ${h.a('cna-practice-exam', 'full timed mock')}: ${n.writtenItems} questions in ${h.hm(n.writtenMinutes)}, spread across the areas as the outline weights them. The mock shows a question map, lets you flag questions to come back to, and corrects everything at the end, as on test day.</p>
<!--tool:mini:studyplan|{"e":0}-->
<h2>What the questions test</h2>
<p>Most questions describe a short situation with a resident and ask what the nurse aide should do, or do first. The right answer is the one that keeps the resident safe, respects the resident's choices and stays within the aide's role. Three habits help with almost every scenario:</p>
<ul>
<li><strong>Safety first.</strong> When two options both help, the one that prevents a fall, an infection or a burn comes first.</li>
<li><strong>Report, do not diagnose.</strong> An aide observes and tells the nurse; changing a treatment, giving medication or explaining a diagnosis belongs to the nurse.</li>
<li><strong>The resident decides.</strong> Privacy, dignity and the right to refuse appear in many questions, even outside the client rights area.</li>
</ul>
<h2>Written test, oral test and skills test</h2>
<p>Federal rules require both a knowledge part and a skills part, and a state must offer at least ${h.R.cnaFederal.minAttempts} chances to pass (${h.src('ecfr_483_154', '42 CFR 483.154')}). The knowledge part is the written test or, at the candidate's choice, the oral version. The skills part asks you to perform ${n.skills} skills in ${n.skillsMinutes} minutes in the NNAAP format, hand hygiene always among them; the ${h.a('cna-skills-list', 'skills checklist')} lists them step by step, and the ${h.a('cna-exam', 'exam guide')} explains how the two parts are scheduled and scored.</p>
<p>These questions are written by us from the outline topics. They are not questions from the real exam, and no site can honestly promise those: the vendors keep their item banks secret and change them regularly.</p>`;
    },
  },
});
