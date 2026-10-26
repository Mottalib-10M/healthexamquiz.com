import { definePage } from '../../lib/guide-types';
import S from '../../data/cna-skills.json';

type Sk = { id: string; title: string; measure?: boolean; state?: string };
const SK = S.skills as Sk[];

export default definePage({
  id: 'cna-vital-signs',
  group: 'cna',
  order: 22,
  tool: { kind: 'mini:pulse' },
  mini: { kind: 'mini:io' },
  related: ['cna-skills-list', 'cna-skills-test', 'cna-written-exam', 'cna-practice-test'],
  sources: ['medline_pulse', 'cfr_101_9', 'nist_units', 'credentia_outline'],
  en: {
    slug: 'cna-vital-signs',
    nav: 'CNA vital signs',
    card: 'Pulse, respirations, blood pressure, weight, urine and fluid intake as the nurse aide exam measures them, with worked conversions.',
    title: 'CNA Vital Signs: Pulse, Breathing, Output and Intake Math',
    description: 'CNA vital signs for the exam: counting and converting pulse and respirations, blood pressure by state, weight, urinary output and intake in mL, with examples.',
    h1: 'Vital signs and measurements on the CNA exam',
    intro: 'Turn a timed pulse count into beats per minute above, and fluid amounts into milliliters just below. Then: each measurement the exam can ask for.',
    resume: (h) => {
      const measures = SK.filter((s) => s.measure);
      return `Measurements appear in both parts of the nurse aide exam. In the NNAAP skills test, one of the ${h.R.nnaap.skills} skills a candidate performs is always a measurement skill, drawn from the ${measures.length} skills of the listing where a value must be recorded: radial pulse, respirations, urinary output, weight of an ambulatory client, and two blood pressure skills, electronic and manual, that are state specific and tested only where the state handbook includes them. The recorded value is compared with the evaluator's, so the count must be accurate as well as the steps correct. On the written test, basic nursing skills, the heaviest area of the outline, includes measuring and recording vital signs and intake and output. The arithmetic is simple but must be exact: a count over 15 or 30 seconds is multiplied by 4 or 2 to give a rate per minute, and household fluid measures are converted with ${h.P.pharmMath.cupMl} mL for a cup and ${h.P.pharmMath.flozMl} mL for a fluid ounce, the federal labeling values. Adult resting pulse runs from 60 to 100 beats a minute according to MedlinePlus. All values here are exam content, not medical advice.`;
    },
    faqs: (h) => [
      { q: 'How do I convert a 30-second pulse count to beats per minute?', a: 'Multiply by two. Thirty-eight beats in 30 seconds give 76 beats per minute; a 15-second count is multiplied by four. On the skills test, follow the counting time your handbook asks for: some evaluators expect a full minute. A full minute is also the safer choice when the rhythm feels irregular, because a short count multiplies any error.' },
      { q: 'How many milliliters are in a cup or an ounce for intake questions?', a: `Use ${h.P.pharmMath.cupMl} mL for one cup and ${h.P.pharmMath.flozMl} mL for one fluid ounce, the values of the federal food labeling rules. Your facility or test site may print its own conversion card with container sizes, such as a carton or a bowl; if one is given, it is the reference. Always record intake in milliliters, never in cups.` },
      { q: 'Should the resident know I am counting their breathing?', a: 'No. People change their breathing when they know it is being watched, so the usual technique is to keep your fingers on the wrist after counting the pulse and count breaths while the resident thinks you are still taking the pulse. Count one rise and fall of the chest as one breath, and note anything unusual, such as noisy or labored breathing, for the nurse.' },
      { q: 'How do I read the urine level in a graduate correctly?', a: 'Place the graduate on a flat surface and bring your eyes level with the liquid before you read the mark; reading from above gives a wrong value. Wear gloves, pour the urine from the collection device into the graduate, record the amount in milliliters, then empty and rinse the equipment as your handbook describes. The evaluator checks your number against theirs.' },
    ],
    body: (h) => {
      const M = h.P.pharmMath;
      const ex = [
        ['Pulse', '19 beats in 15 seconds', '× 4', `${19 * 4} per minute`],
        ['Pulse', '41 beats in 30 seconds', '× 2', `${41 * 2} per minute`],
        ['Respirations', '9 breaths in 30 seconds', '× 2', `${9 * 2} per minute`],
        ['Respirations', '16 breaths in 60 seconds', '× 1', '16 per minute'],
      ];
      const lunch = { cupCoffee: 1, ozJuice: 4, halfCupSoup: 0.5 };
      const ml = lunch.cupCoffee * M.cupMl + lunch.ozJuice * M.flozMl + lunch.halfCupSoup * M.cupMl;
      const lb = 154, kg = lb * M.lbKg;
      const measures = SK.filter((s) => s.measure);
      return `
<h2>The measurement skills on the listing</h2>
<p>The NNAAP skills listing under the ${h.src('credentia_outline', '2024 outline')} has ${measures.length} skills where you record a number:</p>
<ul>
${measures.map((s) => `<li>${s.title}${s.state ? ` <em>(${s.state.toLowerCase()}: only where your handbook lists it)</em>` : ''}</li>`).join('\n')}
</ul>
<p>One of them is drawn on every NNAAP skills test. Which states test blood pressure, and with which device, is decided state by state, so look at the skills list in your own handbook before you spend time on it.</p>
<h2>Counting pulse and respirations</h2>
<p>A rate is always reported per minute. If you count for part of a minute, multiply to reach sixty seconds. The calculator at the top does it for the pulse; here are four worked counts.</p>
${h.table(['Measure', 'Your count', 'Multiply', 'Record'], ex, 'Count over the time your handbook requires; a full minute is the safest.', ['l', 'l', 'r', 'r'])}
<p>For the radial pulse, place two fingers, not your thumb, on the thumb side of the inner wrist, and count each beat. MedlinePlus gives 60 to 100 beats a minute as the normal range at rest for adults (${h.src('medline_pulse', 'MedlinePlus pulse')}). On the exam, any value outside the range you were taught, or any irregular rhythm, is reported to the nurse; you never interpret it to the resident.</p>
<p>Respirations are counted right after the pulse without telling the resident, because breathing changes when someone watches it. One breath is one rise and one fall of the chest.</p>
<h2>Blood pressure, where it is tested</h2>
<p>Two blood pressure skills are on the NNAAP listing, one with an electronic device and one manual with a cuff and stethoscope, and both are marked state specific. Where they are tested, the steps that matter most are the cuff size and position on the bare upper arm, the arm supported at heart level, and recording the value exactly as read, top number over bottom number. On the written test, a blood pressure question usually asks what to do with a reading, and the answer is to report an unusual value promptly rather than act on it.</p>
<h2>Weight and urinary output</h2>
<p>Weighing an ambulatory client starts with balancing or zeroing the scale, having the client remove shoes, and reading the value while the client stands still in the center. Record in the unit your form asks for. If a question mixes units, the factor is ${M.lbKg} kilograms per pound (${h.src('nist_units', 'NIST')}): a resident who weighs ${lb} pounds weighs about ${h.num(kg, 1)} kilograms, or roughly ${lb} divided by ${M.lbPerKg}.</p>
<!--tool:mini:convert|{"x":154,"f":5,"t":3}-->
<p>Urinary output is measured in a graduate, a container marked in milliliters. Put it on a flat surface, read at eye level, and record the amount in mL. Gloves go on before you touch the collection device, and come off before you write on the record.</p>
<h2>Intake: a worked example</h2>
<p>Intake questions give household measures and expect an answer in milliliters. Use the values of the federal labeling rules (${h.src('cfr_101_9', '21 CFR 101.9')}): one cup is ${M.cupMl} mL and one fluid ounce is ${M.flozMl} mL. Suppose a resident has a cup of coffee, a 4 ounce glass of juice and half a cup of soup at lunch:</p>
<ul>
<li>Coffee: 1 × ${M.cupMl} = ${M.cupMl} mL</li>
<li>Juice: 4 × ${M.flozMl} = ${4 * M.flozMl} mL</li>
<li>Soup: 0.5 × ${M.cupMl} = ${0.5 * M.cupMl} mL</li>
<li>Total intake: ${h.num(ml)} mL</li>
</ul>
<p>Soup and anything that is liquid at room temperature count as fluid intake; solid food does not. If the resident leaves part of a drink, subtract what remains. The intake calculator near the top adds cups, ounces and amounts already in milliliters for you.</p>
<h2>Practising the numbers</h2>
<p>Take a partner's pulse and respirations together, both of you counting, and compare. Measure water in a kitchen measuring cup and pour it into a marked container to see what ${M.cupMl} mL looks like. Then run the measurement skills on the ${h.a('cna-skills-list', 'skills checklist')} and the vital signs questions in the ${h.a('cna-practice-test', 'practice test')}, under basic nursing skills.</p>`;
    },
  },
});
