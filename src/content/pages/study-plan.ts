import { definePage } from '../../lib/guide-types';
import { EXAM_IDS } from '../../lib/engine/exam';

export default definePage({
  id: 'study-plan',
  group: 'plan',
  order: 83,
  tool: { kind: 'mini:studyplan', props: { e: 1, d: 28 } },
  mini: { kind: 'mini:readiness', props: { e: 1 } },
  related: ['review-mistakes', 'exam-fees-retakes', 'ptce-practice-exam', 'cna-practice-exam', 'emt-practice-test'],
  sources: ['ptcb_outline', 'nremt_exams', 'credentia_outline', 'aama_outline'],
  en: {
    slug: 'study-plan',
    nav: 'Study plan',
    card: 'Turn the days left before your exam into questions a day and a schedule of full mocks.',
    title: 'Study Plan for a Health Certification Exam: Days to Score',
    description: 'Study plan for a health certification exam: turn the days left into questions a day and a schedule of timed mocks, then check if your practice score is ready.',
    h1: 'A study plan from the days you have left',
    intro: 'Choose your exam, the days left and how many times you want to see each question: the calculator gives a daily volume and the number of full mocks to fit in.',
    resume: (h) => `A study plan for a certification exam comes down to three numbers: how many days are left, how many questions you need to see, and how many full mocks you can fit in. The calculator above takes a pool about 1.3 times the length of the real exam, multiplies it by the number of passes you want, and spreads it over the days left; it also plans one full timed mock a week. For the PTCE, ${h.X('ptce').items} questions in ${h.time('ptce')}, four weeks and two passes give about ${Math.ceil((h.X('ptce').items * 1.3 * 2) / 28)} questions a day. The figures are a frame, not a rule: what matters is that every outline domain gets practice in proportion to its weight, that missed questions come back until they are right, and that the last days are kept for review rather than new material. The second calculator estimates, from your practice rate, the chance of reaching the site's ${h.pc(h.X('ptce').target)} study target on a full mock, a model that helps you decide when to book.`,
    faqs: () => [
      { q: 'How many practice questions a day is enough?', a: 'Enough to cover every domain at least twice before the exam, with time left to review mistakes. For most candidates that means 30 to 60 questions a day over three to six weeks. Fewer questions with careful reading of the explanations beats a high volume answered quickly, because the explanation is where a missed rule gets fixed.' },
      { q: 'When should I take my first full mock?', a: 'Early, once you have practiced each domain at least once. A first mock shows your pace and your weak domains while there is still time to act on them. Then take one a week and a last one three or four days before the exam, so that the final days go to reviewing what that mock revealed.' },
      { q: 'Should I study the heaviest domain first?', a: 'Usually yes, because it moves the score most and its knowledge supports other domains: basic nursing skills for the CNA, medications for the PTCE, clinical patient care for the CCMA, primary assessment for the EMT. Small domains are still worth a session each, since their questions are often quick points.' },
      { q: 'What should I do the day before the exam?', a: 'Little. A short review of your list of missed rules, the logistics of the test day (identification, address or remote testing setup, start time) and sleep. Starting new material or a full mock the day before tends to raise anxiety without adding points. The work is done in the weeks before.' },
    ],
    body: (h) => {
      const rows = EXAM_IDS.map((e) => { const x = h.X(e); const heavy = [...x.domains].sort((a, b) => b.share - a.share)[0]; return [x.label, `${e === 'emt' ? `${x.itemsMin} to ${x.items}` : h.num(x.items)} in ${h.hm(x.minutes)}`, heavy.name]; });
      return `
<h2>Start from the exam's shape</h2>
${h.table(['Exam', 'Questions and time', 'Heaviest domain'], rows, `From the outlines and test plans read on ${h.read}.`, ['l', 'l', 'l'])}
<p>The heaviest domain is where your plan should start and where it should keep returning. On the PTCE it is medications, on the ${h.src('nremt_exams', 'NREMT EMT exam')} primary assessment, on the nurse aide written test basic nursing skills. A plan that spreads time evenly across domains under-prepares the heavy one.</p>
<h2>A four-week template</h2>
<ol>
<li><strong>Week 1:</strong> one practice set in every domain to map your level, then a first full mock at the weekend.</li>
<li><strong>Week 2:</strong> daily sets in the two weakest domains, with a review round at the end of each session; second mock.</li>
<li><strong>Week 3:</strong> the remaining domains, still with daily review; third mock.</li>
<li><strong>Week 4:</strong> review of mistakes only, short mixed sets, a last mock three or four days before, then rest.</li>
</ol>
<p>For a shorter runway, compress weeks 2 and 3; for a longer one, add a second pass over every domain before the last week. The ${h.a('review-mistakes', 'review page')} keeps the list of questions to see again.</p>
<h2>How to judge readiness</h2>
<p>None of these exams publishes a count of right answers that equals a pass: they use scaled scores or state pass marks. This site sets a study target of ${h.pc(h.X('ptce').target)} on its mocks and says so. A practical sign of readiness is two full mocks above the target, on different days and different draws, with no domain far below the rest. The readiness calculator above gives a rough probability of reaching the target on a full mock from your practice rate; treat it as a model, not a forecast of the real result.</p>
<h2>Fitting study around work and training</h2>
<p>Most candidates prepare while finishing a program or working. Short daily sessions hold up better than long weekend ones: ten questions on the bus, a review round at lunch, a mock on a day off. Practice sets are ten questions for that reason. Your progress stays in the browser you use, so use the same device for most sessions, or accept that a second device starts empty.</p>
<p>For the cost side of planning, including what a retake costs and how long you must wait, see the ${h.a('exam-fees-retakes', 'fees and retakes page')}.</p>`;
    },
  },
});
