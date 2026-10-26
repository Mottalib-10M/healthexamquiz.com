import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cna-exam-difficulty',
  group: 'cna',
  order: 19,
  tool: { kind: 'mini:readiness', props: { e: 0 } },
  mini: { kind: 'quiz', props: { exam: 'cna', mode: 'practice', domain: 'rights', n: 5 } },
  related: ['cna-practice-exam', 'cna-skills-test', 'cna-written-exam', 'study-plan', 'review-mistakes'],
  sources: ['ecfr_483_154', 'credentia_written', 'credentia_outline', 'hdmaster_mi'],
  en: {
    slug: 'cna-exam-difficulty',
    nav: 'How hard is the CNA exam',
    card: 'What actually makes the nurse aide exam hard, part by part, and five signals that tell you whether you are ready to book.',
    title: 'CNA Exam Difficulty: What Makes It Hard and How to Be Ready',
    description: 'CNA exam difficulty explained: why the skills part trips up prepared candidates, which written questions cause errors, and clear signs that you are ready.',
    h1: 'How hard is the CNA exam?',
    intro: 'Enter your practice score to see where you stand against our study target, then read what makes each part of the exam hard.',
    resume: (h) => {
      const n = h.R.nnaap, x = h.X('cna');
      return `The CNA exam is not hard in the way a nursing board exam is: the content is the daily work of a nurse aide, taught in a training program of at least ${h.R.cnaFederal.trainingHours} hours. It is hard in other ways. The skills part is passed or failed on a checklist, and in most handbooks missing a single critical step, such as locking the wheelchair brakes, fails that skill however well the rest went; in the NNAAP format you perform ${n.skills} skills in ${n.skillsMinutes} minutes with an evaluator watching. The written part, ${n.writtenItems} questions in ${h.hm(n.writtenMinutes)} in the NNAAP, asks for the best action among several reasonable ones and includes ${n.writtenItems - n.writtenScored} unscored pretest items you cannot spot. ${x.passText}. This site publishes no pass rate, because the national and state figures we could verify were not current enough to quote. What can be measured is your own readiness: practice scores by area, timed mocks and full skill runs without help.`;
    },
    faqs: () => [
      { q: 'Is the skills part harder than the written part?', a: 'For many candidates it is the more stressful part, because one forgotten safety step can fail a skill, the evaluator is watching, and there is no option list to jog your memory. The written part rewards steady reading. Which one is harder for you depends on how you prepared: candidates who practise skills only in class tend to find the skills test harder.' },
      { q: 'Why does this site not publish a CNA pass rate?', a: 'Because we could not find a current, comparable figure for each state and vendor that we could cite. A pass rate also says little about your own chances: it mixes candidates who trained well with those who did not. Your practice scores by area and your timed runs of the skills are far better predictors for you.' },
      { q: 'What should I do in the last week before the CNA exam?', a: 'Stop learning new material and consolidate. Run hand hygiene and one measurement skill every day, take one last timed mock early in the week, and spend the other days on the questions you missed. Prepare your identification and directions to the site two days ahead, and sleep normally the night before rather than studying late.' },
      { q: 'How can I keep nerves from ruining my skills demonstration?', a: 'Practise being watched. Ask someone to stand beside you with the checklist while you perform, silently, as an evaluator would. Talk through each step aloud to the resident; speaking keeps your sequence on track. If you blank, return to the opening steps: knock, introduce, hand hygiene, explain, privacy. Restarting the routine usually brings the next steps back.' },
    ],
    body: (h) => {
      const n = h.R.nnaap, x = h.X('cna');
      const perSkill = n.skillsMinutes / n.skills;
      return `
<h2>Where candidates lose points</h2>
<p>Difficulty is not spread evenly across the exam. It sits in a few predictable places, and most of them have nothing to do with how much you know.</p>
<h3>On the skills part</h3>
<ul>
<li><strong>A single forgotten step.</strong> The skill is scored on a checklist, and some steps decide it alone. Candidates who know the skill perfectly still fail it by forgetting to lock the bed, check the water temperature or leave the call light in reach.</li>
<li><strong>The clock.</strong> In the NNAAP you have ${n.skillsMinutes} minutes for ${n.skills} skills, about ${h.num(perSkill)} minutes each on average. A slow setup on the first skill steals time from the last one.</li>
<li><strong>The measurement.</strong> A pulse or urine reading outside the evaluator's tolerance fails the measurement skill, even if every step was right.</li>
<li><strong>Being watched.</strong> Performing for an evaluator feels nothing like performing in class with friends. Nerves make people skip steps they never skip at work.</li>
</ul>
<h3>On the written part</h3>
<ul>
<li><strong>Two good answers.</strong> Most questions offer more than one correct action and ask for the first or the best. Knowing the content is not enough; you must rank it.</li>
<li><strong>One small word.</strong> Not, except, first, most: missing one of them reverses the logic of the question.</li>
<li><strong>Reading load.</strong> ${n.writtenItems} scenarios in a row tire readers who are not used to long tests in English. The oral version exists for this reason, and federal rules let you choose it (${h.src('ecfr_483_154', '42 CFR 483.154')}).</li>
<li><strong>Neglected small areas.</strong> Spiritual and cultural needs, legal behavior and the care team carry few questions each, but together they can tip a close result.</li>
</ul>
<h2>Signals that you are ready</h2>
<p>Instead of a pass rate, use evidence from your own practice. The readiness gauge above compares your practice score with our study target of ${h.pc(x.target)}; that target is set by this site and is not the official standard, which is set by each state. The table lists the signals worth checking before you book.</p>
${h.table(['Signal', 'Ready', 'Not yet'], [
        ['Practice sets by area', `Every area at ${h.pc(x.target)} or more, twice`, 'One area well below the others'],
        ['Full timed mock', `Two mocks at ${h.pc(x.target)} or more`, 'Running out of time, or one mock only'],
        ['Hand hygiene', 'Ten clean runs, no step missed', 'Still checking the list'],
        ['Random five-skill draw', `Done in ${n.skillsMinutes} minutes with a partner ticking`, 'Skipped steps under the clock'],
        ['Measurements', 'Your values match a partner\'s', 'Counts that differ by several beats'],
      ], 'Study signals proposed by this site; they are not an official standard.', ['l', 'l', 'l'])}
<p>If three of the five lines are in the ready column, book a date about two to three weeks out and use that time to move the other two. If fewer are, set a study plan first.</p>
<!--tool:mini:studyplan|{"e":0,"d":21}-->
<h2>How the exam is made fair</h2>
<p>Some of what makes the exam feel hard is what makes it fair. Skills are drawn at random, so nobody can prepare for only a few tasks. The written forms carry pretest items so that new questions are checked on real candidates before they count (${h.src('credentia_written', 'Credentia')}). The content follows a published outline in force since ${h.date(n.outlineEffective)}, so nothing on the test falls outside the ${h.src('credentia_outline', 'listed areas')}. And federal rules require at least ${h.R.cnaFederal.minAttempts} chances to pass, which means a failed part is a delay, not the end.</p>
<h2>Does the vendor change the difficulty?</h2>
<p>The care content is the same everywhere, but forms are built differently. Headmaster states publish passing percentages, such as ${(h.state('mi').vendors[0].format.match(/\d+%/) ?? [''])[0]} in Michigan (${h.src('hdmaster_mi', 'Michigan handbook')}), while NNAAP states report pass or fail. Prometric forms are shorter, with fewer questions in less time. None of these makes one state easy and another hard. What changes your result is matching your practice to the format you will meet, which the ${h.a('cna-state-exam', 'state guide')} lays out.</p>
<h2>Client rights: a quick test of judgment</h2>
<p>The five questions loaded near the top of the page come from client rights, an area where the right answer often feels less helpful than a wrong one: letting a resident refuse, knocking and waiting, keeping information private. If you got them right, your judgment is tuned to how the exam thinks. If not, the ${h.a('cna-practice-test', 'practice sets by area')} and the ${h.a('cna-practice-exam', 'full mock')} are the next step.</p>`;
    },
  },
});
