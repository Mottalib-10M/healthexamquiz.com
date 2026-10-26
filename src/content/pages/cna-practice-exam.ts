import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cna-practice-exam',
  group: 'cna',
  order: 11,
  tool: { kind: 'quiz', props: { exam: 'cna', mode: 'mock' } },
  mini: { kind: 'mini:readiness', props: { e: 0 } },
  related: ['cna-practice-test', 'cna-written-exam', 'cna-exam-difficulty', 'review-mistakes', 'study-plan'],
  sources: ['credentia_outline', 'credentia_written', 'prometric_tx', 'hdmaster_oh'],
  en: {
    slug: 'cna-practice-exam',
    nav: 'CNA practice exam',
    card: 'A full timed mock of the nurse aide written test, at the NNAAP length, marked at the end with a score by area.',
    title: 'CNA Practice Exam 2026: Full Timed Mock of the Written Test',
    description: 'CNA practice exam 2026: a full timed mock of the nurse aide written test at the NNAAP length and time, with a question map, flags and a score by exam area.',
    h1: 'CNA practice exam: the full timed mock',
    intro: 'One sitting, the real length, the real clock. The clock starts with your first answer and nothing is corrected until you finish.',
    resume: (h) => {
      const n = h.R.nnaap, x = h.X('cna');
      return `This mock reproduces the written part of the nurse aide competency exam in the National Nurse Aide Assessment Program (NNAAP) format, the format Credentia delivers in many states: ${n.writtenItems} multiple-choice questions to answer in ${h.hm(n.writtenMinutes)}. On the real form ${n.writtenItems - n.writtenScored} of those questions are unscored pretest items that look exactly like the others, so the mock keeps all ${n.writtenItems} and gives each the same weight. Questions are drawn from our pool in proportion to the nine areas of the content outline in force since ${h.date(n.outlineEffective)}, with basic nursing skills (${h.dom('cna', 'bns').items} questions) and activities of daily living (${h.dom('cna', 'adl').items} questions) the largest. The mock is marked at the end against a study target of ${h.pc(x.target)} set by this site. That target is not the official standard: ${x.passText.charAt(0).toLowerCase() + x.passText.slice(1)}. The questions are written by us from the outline topics and are not items from the real exam.`;
    },
    faqs: (h) => {
      const n = h.R.nnaap;
      return [
        { q: 'How long should a full CNA mock exam take me?', a: `You have ${h.hm(n.writtenMinutes)} for ${n.writtenItems} questions, a little under two minutes each. Most prepared candidates finish with time left, because many questions are short scenarios. If you run out of time on the mock, the cause is usually rereading options, not reading speed: answer, flag the doubtful ones and move on, then come back to the flags.` },
        { q: 'Why does the mock grade me against 80% and not the state pass mark?', a: `States set their own passing standard, and where a vendor publishes a percentage it sits between 70% and 75%. A mock is easier than test day because you are at home and calm, so we mark against ${h.pc(h.X('cna').target)}. Reaching it on two different mocks leaves a margin for nerves, unfamiliar wording and the pretest items.` },
        { q: `Why does the mock count all ${n.writtenItems} questions when only ${n.writtenScored} are scored?`, a: 'Because you cannot tell which ones are pretest items on the day. They are mixed in at random and written in the same style, so you spend the same time and effort on them. Counting all of them keeps your pace and your stamina realistic, and the score still reflects the share you answered correctly.' },
        { q: 'Should I time myself differently if my state uses Prometric or Headmaster?', a: 'Yes, adjust the clock. Prometric states test 60 questions in 90 minutes, and Headmaster forms run from 65 to 79 questions in 60 to 90 minutes depending on the state. The pace per question is close in every case. Take this mock as written for the knowledge, and keep an eye on the minutes your own handbook gives.' },
      ];
    },
    body: (h) => {
      const n = h.R.nnaap, x = h.X('cna');
      const perQ = n.writtenMinutes / n.writtenItems;
      const marks = [0.25, 0.5, 0.75].map((f) => {
        const min = Math.round(n.writtenMinutes * f);
        return [h.hm(min), `about question ${Math.floor(min / perQ)}`];
      });
      marks.push([h.hm(n.writtenMinutes), `all ${n.writtenItems} answered, flags reviewed`]);
      return `
<h2>Set up the sitting like test day</h2>
<p>A mock only tells you something if you take it under the same pressure as the real one. Clear ${h.hm(n.writtenMinutes)} in one block, put your phone in another room and close your notes. Sit at a table, not on a couch. On the real written test you cannot step out to check a fact, so treat any question you are unsure about the way you will on the day: pick the best option, flag it and continue.</p>
<p>The clock above starts when you answer the first question and the mock is marked when it reaches zero, even if questions are left blank. A blank counts as wrong, exactly as a missed item does on the real test, so never leave one empty when a minute remains.</p>
<h2>Pace checkpoints</h2>
<p>With ${n.writtenItems} questions in ${h.hm(n.writtenMinutes)} you have about ${h.num(perQ * 60)} seconds per item. Rather than watching the seconds, check the question number at four moments:</p>
${h.table(['Time used', 'Where you should be'], marks, 'Even pace across the whole form, keeping no time back for review.', ['l', 'l'])}
<p>If you are ahead at the first checkpoint, good: bank the time for the flagged questions at the end. If you are behind, you are probably reading every option twice. Read the last sentence of the question first, so you know what is being asked, then read the scenario once.</p>
<h2>Reading your result</h2>
<p>The result screen shows your share of correct answers and a line for each area of the outline. Look at the areas before the total. A total of ${h.pc(x.target)} built on a weak basic nursing skills line is fragile, because that area alone holds ${h.dom('cna', 'bns').items} of the ${n.writtenItems} questions. A weak line in spiritual and cultural needs, which counts for ${h.dom('cna', 'spi').items} question on a full form, matters far less.</p>
<p>Then open the question map. Green squares are right, red ones are wrong, and the amber ones you flagged show where your doubt was. Two patterns are worth separating:</p>
<ul>
<li><strong>Flagged and wrong.</strong> You knew you did not know. Learn the rule behind the answer and drill that area in the ${h.a('cna-practice-test', 'practice test by area')}.</li>
<li><strong>Not flagged and wrong.</strong> You felt sure and were mistaken. These are the dangerous ones: read the explanation twice and write the rule down in your own words.</li>
<li><strong>Flagged and right.</strong> Your doubt may have been a lucky guess. Read the explanation anyway, because luck is not a plan for test day.</li>
</ul>
<p>Compare the two halves of the form as well. If most of your errors come after question ${Math.round(n.writtenItems * 0.7)}, the problem is stamina rather than knowledge: you read less carefully when tired. The cure is simply more full-length sittings, with a short pause of a few seconds every twenty questions to reset your attention.</p>
<p>Every miss is saved in this browser and comes back on the ${h.a('review-mistakes', 'review page')} until you answer it right.</p>
<!--tool:mini:studyplan|{"e":0,"d":14}-->
<h2>How many mocks, and when</h2>
<p>One mock is a snapshot; three or four spread over the last weeks show a trend. A workable rhythm is one full mock a week, with practice by area on the days in between. Take the last one four or five days before the exam, not the night before, so there is time to fix what it reveals. Each new mock draws a fresh mix of questions, so a rising score reflects what you know rather than answers you remember.</p>
<p>When two mocks in a row clear ${h.pc(x.target)} with no area far behind, the written part is unlikely to be the problem. At that point your remaining study time is better spent on the skills checklist.</p>
<h2>What this mock does not test</h2>
<p>It covers the written test only. The skills demonstration is a separate part of the evaluation with its own pass or fail, and you prepare it with your hands, not with questions: the ${h.a('cna-skills-test', 'skills test guide')} explains how it runs. If you plan to take the oral version, the content is the same, but the questions are read to you and you cannot reread them at your own speed, so practise listening to scenarios as well. Finally, the length here follows the NNAAP. Prometric states such as Texas use a shorter form (${h.src('prometric_tx', 'Texas bulletin')}), and Headmaster forms differ again (${h.src('hdmaster_oh', 'Ohio handbook')}); the ${h.a('cna-state-exam', 'state guide')} lists them.</p>`;
    },
  },
});
