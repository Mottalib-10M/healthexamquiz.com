import { definePage } from '../../lib/guide-types';
import S from '../../data/cna-skills.json';

type Sk = { id: string; title: string; steps: string[]; measure?: boolean; state?: string };
const SK = S.skills as Sk[];
const t = (id: string) => SK.find((s) => s.id === id)!;
const GROUPS: Array<[string, string[], string]> = [
  ['Always on the test', ['hand-hygiene'], 'Run it until you can do every step without thinking, including the paper towel on the faucet.'],
  ['Measurement skills', ['radial-pulse', 'respirations', 'urinary-output', 'weight', 'bp-electronic', 'bp-manual'], 'Practise on several people, write each value down and have your partner check it.'],
  ['Moving and positioning', ['bed-to-wheelchair', 'ambulate-belt', 'positions-side', 'prom-shoulder', 'prom-knee-ankle'], 'Rehearse the safety steps aloud: brakes, belt, nonskid footwear, and asking about pain at every joint.'],
  ['Personal care', ['bed-bath', 'mouth-care', 'denture', 'foot-care', 'perineal-care', 'catheter-care', 'bedpan', 'dress-weak-arm', 'feed', 'elastic-stocking'], 'Focus on direction, clean to dirty, water temperature and covering the resident.'],
  ['Infection control', ['ppe'], 'Practise the removal order slowly: it is where contamination happens.'],
];

export default definePage({
  id: 'cna-skills-list',
  group: 'cna',
  order: 16,
  tool: { kind: 'skills', props: { skill: 'bed-to-wheelchair' } },
  mini: { kind: 'mini:io' },
  related: ['cna-skills-test', 'cna-vital-signs', 'cna-practice-test', 'cna-exam', 'cna-state-exam'],
  sources: ['credentia_outline', 'ecfr_483_154', 'cdc_hands', 'hdmaster_ca'],
  en: {
    slug: 'cna-skills-list',
    nav: 'CNA skills list',
    card: 'The nurse aide skills of the NNAAP listing, grouped by type, with a step checklist and a practice tip for each group.',
    title: 'CNA Skills List 2026: All NNAAP Skills With Step Checklists',
    description: 'CNA skills list 2026: every skill of the NNAAP listing grouped by type, which blood pressure skills are state specific, and a step checklist for each one.',
    h1: 'The CNA skills list, with a checklist for each',
    intro: 'Pick any skill in the checklist to see its steps, tick them as you practise, or draw a random five-skill test.',
    resume: (h) => {
      const n = h.R.nnaap;
      const measures = SK.filter((s) => s.measure);
      return `The National Nurse Aide Assessment Program, owned by Credentia, publishes a listing of ${SK.length} nurse aide skills from which the skills test is drawn; this page lists every title and gives a step checklist for each. Federal rules (42 CFR 483.154) require the skills to be selected at random from tasks nurse aides usually perform, and in the NNAAP a candidate performs ${n.skills} of them in ${n.skillsMinutes} minutes: hand hygiene every time, one of the ${measures.length} measurement skills and three others. Two of the measurement skills, ${t('bp-electronic').title.toLowerCase()} and ${t('bp-manual').title.toLowerCase()}, are state specific: they are tested only where the state handbook lists them. The steps shown here are written by Radif Partners in its own words from standard nurse aide practice. On test day the evaluator follows the checklist of your state's handbook, which is the reference if anything differs. Prometric and Headmaster states draw from their own lists of similar tasks.`;
    },
    faqs: () => [
      { q: 'Are the blood pressure skills tested in every state?', a: 'No. Both the electronic and the manual blood pressure skills are state specific in the NNAAP listing. Some states include one of them in the pool, others leave blood pressure out of the skills test. Your candidate handbook lists the skills your state can draw; if blood pressure is there, practise it as seriously as the others, since it can be your measurement skill.' },
      { q: 'Why does hand hygiene appear on every skills test?', a: 'Because hand hygiene is the single habit that prevents most infections passed from resident to resident, and the exam wants proof you can do it correctly before anything else. In the NNAAP it is one of the five skills on every test. Evaluators check the details: friction for long enough, fingertips down, and a clean towel to turn off the faucet.' },
      { q: 'Do I need to learn the skill steps word for word?', a: 'No, learn them in order and know why each one is there. Evaluators look for actions, not wording. What matters is that you do not skip a safety or infection control step and that the sequence makes sense, such as checking water temperature before washing. Knowing the reason behind each step keeps you from forgetting it under stress.' },
      { q: 'What are the steps that open and close almost every skill?', a: `Opening: knock and introduce yourself, check the resident's identity, perform hand hygiene, explain the procedure and provide privacy. Closing: leave the call light within reach, leave the bed low with wheels locked, perform hand hygiene and report changes to the nurse. Our checklist adds them to each skill except hand hygiene and putting on protective equipment.` },
    ],
    body: (h) => {
      const sections = GROUPS.map(([g, ids, tip]) => `<h3>${g}</h3>
<ul>
${ids.map((id) => `<li>${t(id).title}${t(id).state ? ` <em>(${t(id).state.toLowerCase()})</em>` : ''}</li>`).join('\n')}
</ul>
<p>${tip}</p>`).join('\n');
      const cup = h.P.pharmMath.cupMl, oz = h.P.pharmMath.flozMl;
      return `
<h2>All ${SK.length} skills, grouped by type</h2>
<p>The titles below are those of the NNAAP skills listing under the ${h.src('credentia_outline', '2024 outline')}. They are grouped by what the skill trains rather than in the order of the official list, so you can plan your practice in blocks.</p>
${sections}
<h2>Practising a skill from its checklist</h2>
<p>A checklist works best when you use it in three passes. First, read the steps aloud while doing them slowly, checklist in hand. Second, perform the skill with a partner who holds the checklist and ticks each step only when it is done. Third, perform it again with no help, and compare the ticks afterwards. If a step is missed twice, it goes on a sticky note on your mirror.</p>
<p>The checklist loaded above is the transfer from bed to wheelchair, a skill with several safety steps in a row. Notice where they fall: the wheelchair is placed at the side of the bed on the strong side, its brakes are locked, the resident wears nonskid footwear, the bed is low, the transfer belt is snug, and you count aloud before standing. Each of those protects the resident, and skipping any of them is the kind of error that fails a skill.</p>
<h2>Skills that hide a calculation</h2>
<p>Most skills have no numbers. Three do. In the pulse and respiration skills you convert a timed count into a rate per minute. In the urinary output skill you read a graduated container at eye level, on a flat surface, and record the result in milliliters. Feeding a resident can also bring an intake question on the written test: a full cup is ${cup} mL and a fluid ounce is ${oz} mL in the standard conversion, so a resident who drinks a cup of milk and a 4 ounce juice took in ${h.num(cup + 4 * oz)} mL. The intake calculator near the top of the page does this sum, and the ${h.a('cna-vital-signs', 'vital signs page')} works through every measurement.</p>
<h2>Building a weekly rotation</h2>
<p>With ${SK.length} skills you cannot rehearse all of them every day, and you do not need to. A simple rotation:</p>
<ol>
<li>Every session: hand hygiene once, done perfectly.</li>
<li>Every session: one measurement skill, rotating through the group.</li>
<li>Every session: two or three skills from the other groups, in order, so the whole list comes round within a week.</li>
<li>Twice a week: a random five-skill draw with the button in the checklist, timed, with a partner as evaluator.</li>
</ol>
<p>Keep a note of which skills felt slow. Speed comes from setting up supplies in the right order, not from rushing the steps.</p>
<h2>When your state uses another list</h2>
<p>Prometric and Headmaster states test similar tasks under their own titles and checklists (${h.src('hdmaster_ca', 'Headmaster California handbook')} for example). The care is the same, so this list still prepares you, but read your own handbook for the exact titles and steps. The ${h.a('cna-skills-test', 'skills test guide')} explains how each vendor draws and scores the tasks, and the ${h.a('cna-state-exam', 'state guide')} tells you which vendor tests in your state.</p>`;
    },
  },
});
