import { definePage } from '../../lib/guide-types';
import S from '../../data/cna-skills.json';

export default definePage({
  id: 'cna-skills-test',
  group: 'cna',
  order: 15,
  tool: { kind: 'skills', props: { skill: 'hand-hygiene' } },
  mini: { kind: 'mini:pulse' },
  related: ['cna-skills-list', 'cna-vital-signs', 'cna-exam', 'cna-exam-difficulty', 'prometric-cna-practice-test'],
  sources: ['ecfr_483_154', 'credentia_outline', 'prometric_fl', 'hdmaster_ca', 'cdc_hands'],
  en: {
    slug: 'cna-skills-test',
    nav: 'CNA skills test',
    card: 'How the hands-on part of the nurse aide exam runs: how skills are drawn, timed and scored, and how to avoid a failed step.',
    title: 'CNA Skills Test 2026: How the Hands-On Exam Is Scored',
    description: 'CNA skills test 2026: how your tasks are drawn, how much time you get, how each step is scored, and what NNAAP, Prometric and Headmaster states do differently.',
    h1: 'How the CNA skills test runs',
    intro: 'Hand hygiene opens every NNAAP skills test, so the checklist starts there. Below: what happens in the room, minute by minute.',
    resume: (h) => {
      const n = h.R.nnaap;
      const measures = S.skills.filter((s) => (s as { measure?: boolean }).measure).length;
      return `The skills test is the hands-on part of the nurse aide competency evaluation. Federal rules (42 CFR 483.154) require it to use skills selected at random from a pool of tasks nurse aides usually perform, and it is passed or failed separately from the written test. In the National Nurse Aide Assessment Program, owned by Credentia, a candidate performs ${n.skills} skills in ${n.skillsMinutes} minutes in front of a nurse evaluator. Hand hygiene is always one of them, and one is a measurement skill, chosen among the ${measures} skills where a value must be recorded, such as a pulse or urinary output. The other skills come from the list of ${S.skills.length} titles in the NNAAP skills listing. Prometric states (Texas, Florida, New York) score five items: three assigned tasks plus handwashing and indirect care. Headmaster states (Ohio, Michigan, part of California) give three or four tasks. Each skill is scored step by step against a checklist, and some steps decide the skill on their own.`;
    },
    faqs: () => [
      { q: 'What happens if I miss a step during the CNA skills test?', a: 'It depends on the step. Handbooks mark certain steps as critical or key: missing one of those fails the whole skill, whatever else you did well. Missing an ordinary step costs points, and you can still pass the skill if you stay above the threshold. Since you rarely know which steps are critical, practise every step every time.' },
      { q: 'Can I correct a step I did wrong during the skills test?', a: 'Most handbooks allow it if you tell the evaluator and correct the step before you move on to the next skill. Say clearly what you are fixing, for example that you forgot to lock the wheels, then do it. Read your own handbook on this point, because the exact rule and the moment you can no longer go back differ by vendor.' },
      { q: 'Do I talk to the evaluator or to the resident during the test?', a: 'Talk to the resident, who may be a volunteer or another candidate playing the part. Introduce yourself, explain each step and ask about comfort as you would at work: the evaluator scores communication. Speak to the evaluator only to announce something they cannot see, such as a measured value, or to request a correction.' },
      { q: 'How is the measurement skill checked?', a: 'You record your value on a form, and the evaluator compares it with their own reading taken at the same time or on the same equipment. Your number must fall within a tolerance set by the vendor. Counting carefully matters more than speed: a pulse counted for a full minute is safer than a rushed count multiplied, if your handbook allows the time.' },
    ],
    body: (h) => {
      const n = h.R.nnaap;
      const fl = h.state('fl').vendors[0], ca = h.state('ca').vendors[1], oh = h.state('oh').vendors[0];
      return `
<h2>Three ways states run it</h2>
<p>The federal frame is short: a demonstration of skills drawn at random, administered in a setting comparable to a resident's room and evaluated by a registered nurse with experience caring for elderly or chronically ill people (${h.src('ecfr_483_154', '42 CFR 483.154')}). The vendor decides the rest.</p>
${h.table(['Vendor', 'Skills part as published'], [
        ['Credentia (NNAAP)', `${n.skills} skills in ${n.skillsMinutes} minutes: hand hygiene, one measurement skill, three others`],
        ['Prometric (Florida)', fl.format.split(';')[1].replace('skills: ', '').trim()],
        ['Headmaster (California)', ca.format.split(';')[1].trim()],
        ['Headmaster (Ohio)', oh.format.split(';')[1].trim()],
      ], `NNAAP outline and vendor handbooks (${h.src('prometric_fl', 'Prometric')}, ${h.src('hdmaster_ca', 'Headmaster')}).`, ['l', 'l'])}
<p>In the NNAAP pattern, hand hygiene is a skill of its own, scored on its own steps. Prometric scores handwashing and indirect care as separate items: indirect care covers habits that run through every task, such as privacy, communication, safety and infection control, so a sloppy habit can cost you on every task at once.</p>
<h2>Inside the testing room</h2>
<p>The room is set up like a resident's room: a bed, a chair or wheelchair, a sink, supplies on a table. A person plays the resident. The evaluator gives you the tasks and then watches, holding a checklist for each one.</p>
<ol>
<li>Listen to the full scenario before you touch anything. If something is unclear, ask before you begin.</li>
<li>Gather what you need for the task. Walking back and forth to the supply table wastes minutes.</li>
<li>Do the opening steps: knock, introduce yourself, check identity, wash or sanitize hands, explain, provide privacy.</li>
<li>Perform the task, speaking to the resident as you go.</li>
<li>Do the closing steps: call light within reach, bed low with wheels locked, hand hygiene, report.</li>
<li>Tell the evaluator when you have finished that skill, then move to the next.</li>
</ol>
<p>Opening and closing steps are where many candidates lose a skill they otherwise did well. Our checklist adds them automatically to each skill; tick them as seriously as the task itself.</p>
<h2>How a step is scored</h2>
<p>Each skill is broken into steps on the evaluator's checklist. Some steps protect the resident directly, such as locking wheels before a transfer, checking water temperature, or keeping a catheter bag below the bladder. These are the ones handbooks treat as critical, and missing one fails the skill. Other steps, such as folding a towel a certain way, carry less weight.</p>
<p>The measurement skill is scored differently: besides the steps, your recorded number is compared with the evaluator's. A pulse rounded carelessly or a urine level read from above the graduate can fail a skill performed perfectly otherwise. The pulse calculator above shows how a timed count becomes beats per minute; the ${h.a('cna-vital-signs', 'vital signs page')} covers every measurement.</p>
<h2>Hand hygiene, done the way it is scored</h2>
<p>Because it is on every NNAAP test, hand hygiene deserves twenty practice runs, not two. The scoring follows the same principles as public health guidance (${h.src('cdc_hands', 'CDC hand hygiene')}): wet, soap, lather all surfaces with friction for at least 20 seconds, fingertips pointing down, rinse, dry with a clean towel, and turn off the faucet with a towel, not with your clean hands. Leaning against the sink or touching the inside of the basin means starting again.</p>
<h2>What to bring and wear</h2>
<p>Your handbook lists what you must bring, and identification is always on it; read the exact requirement, because a name that does not match your registration can cost you the appointment. Some handbooks ask candidates to bring a watch with a second hand for the measurement skills. Wear clothing you can bend and lift in and closed shoes, as you would on a shift. Arrive early: late candidates are often not admitted.</p>
<h2>Practising at home</h2>
<p>Practise with a partner who reads your steps aloud from the checklist and ticks them, then switch roles. Draw five skills at random with the button in the checklist, set a timer for ${n.skillsMinutes} minutes and run them in order without stopping. Say every step aloud; on the day, talking keeps you from skipping. The full list is on the ${h.a('cna-skills-list', 'skills list page')}, one skill per line, and the ${h.a('cna-exam-difficulty', 'difficulty page')} explains how to judge whether you are ready.</p>`;
    },
  },
});
