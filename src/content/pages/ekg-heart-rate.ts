import { definePage } from '../../lib/guide-types';
import { rateFromBoxes, rateFromStrip, boxSeconds, SMALL_MM, LARGE_MM } from '../../lib/engine/ekg';

export default definePage({
  id: 'ekg-heart-rate',
  group: 'lab',
  order: 65,
  tool: { kind: 'mini:ekgrate' },
  mini: { kind: 'quiz', props: { exam: 'cet', domain: 'anal', n: 5 } },
  related: ['ekg-practice-test', 'cet-exam', 'cna-vital-signs', 'apgar-score'],
  sources: ['nha_cet_plan', 'medline_ekg', 'medline_pulse'],
  en: {
    slug: 'ekg-heart-rate',
    nav: 'EKG heart rate methods',
    card: 'Heart rate from a strip by small boxes, large boxes or a six-second count, at any paper speed.',
    title: 'EKG Heart Rate Calculation: 1500, 300 and 6-Second Methods',
    description: 'EKG heart rate calculation for the CET exam: the 1500 method with small boxes, the 300 method with large boxes and the six-second strip, at any paper speed.',
    h1: 'Heart rate from an EKG strip',
    intro: 'Count boxes or complexes, type the paper speed printed on the strip, and read the rate in beats per minute with the length of each box.',
    resume: (h) => {
      const s = h.P.ekg;
      return `Working out the heart rate from a printed EKG strip is one of the few calculations on the NHA CET exam, and it also appears on the medical assistant exams. The method rests on the grid: a small box is ${SMALL_MM} mm wide and a large box ${LARGE_MM} mm, so their duration is their width divided by the paper speed. At the usual speed of 25 mm per second a small box lasts ${h.num(boxSeconds(SMALL_MM, 25), 2)} seconds and a large box ${h.num(boxSeconds(LARGE_MM, 25), 1)} seconds. Three methods follow. For a regular rhythm, divide 1,500 by the number of small boxes between two R waves, or 300 by the number of large boxes. For an irregular rhythm, count the QRS complexes on a six-second strip and multiply by ten. A rate below ${s.adultRestMin} is called slow and above ${s.adultRestMax} fast for an adult at rest, the range MedlinePlus gives. The calculator above applies those rules at any paper speed, for exam practice only.`;
    },
    faqs: (h) => [
      { q: 'Why do the 1,500 and 300 rules work?', a: 'Because a minute holds 1,500 small boxes and 300 large boxes when the paper runs at 25 mm per second: 60 seconds times 25 mm is 1,500 mm. Dividing that total by the boxes between two beats gives the beats in a minute. If the paper runs at 50 mm per second, the totals double to 3,000 and 600, which is why the calculator asks for the speed.' },
      { q: 'Which method should I use for an irregular rhythm?', a: 'The six-second method. With an irregular rhythm the distance between R waves changes from beat to beat, so a box count between two beats describes only that pair. Counting all QRS complexes on a six-second strip and multiplying by ten averages them. Most strips mark three-second intervals on the edge, which helps you find six seconds quickly.' },
      { q: 'What does the large box method give when the R waves fall between lines?', a: 'An estimate. The 300 method is quick but only exact when the R waves land on the heavy lines; between them you read a range, for example between 100 and 75 if the gap is between three and four large boxes. Exam questions that want a precise figure give the count in small boxes, so use the 1,500 rule there.' },
      { q: 'Are rate ranges different for children on the exam?', a: `Yes, children have faster resting rates, and the younger the child the faster the rate. The adult range of ${h.P.ekg.adultRestMin} to ${h.P.ekg.adultRestMax} used by the calculator does not apply to them. CET questions focus on adults; if a pediatric question appears, it will give the expected range or ask only for the arithmetic.` },
    ],
    body: (h) => {
      const sm = [15, 20, 25, 30].map((b) => [`${b} small boxes`, `${h.num(rateFromBoxes(b, 'small', 25))} bpm`, `${h.num(rateFromBoxes(b, 'small', 50))} bpm`]);
      return `
<h2>The three methods side by side</h2>
<h3>Small boxes: the 1,500 rule</h3>
<p>Count the small boxes between two consecutive R waves and divide 1,500 by that number. Twenty small boxes give ${h.num(rateFromBoxes(20, 'small', 25))} beats a minute; fifteen give ${h.num(rateFromBoxes(15, 'small', 25))}. It is the most precise method for a regular rhythm, and the one exam questions use when they give a count.</p>
<h3>Large boxes: the 300 rule</h3>
<p>Divide 300 by the number of large boxes between two R waves. Four large boxes give ${h.num(rateFromBoxes(4, 'large', 25))}; three give ${h.num(rateFromBoxes(3, 'large', 25))}. Many technicians learn the sequence 300, 150, 100, 75, 60, 50 to read a rate at a glance: the R wave after one heavy line, then the next heavy lines.</p>
<h3>Six-second strip: count and multiply</h3>
<p>Count the QRS complexes in six seconds and multiply by ten. Seven complexes give ${h.num(rateFromStrip(7, 6))}; nine give ${h.num(rateFromStrip(9, 6))}. It is the method for irregular rhythms such as atrial fibrillation, and a quick check of the other two.</p>
<h2>When the paper speed is not 25 mm per second</h2>
<p>Some machines and some stress tests run the paper at 50 mm per second, which stretches every complex to twice its width. The boxes are the same size, but each one lasts half as long, so the same count means twice the rate. The table shows it.</p>
${h.table(['Between two R waves', 'Rate at 25 mm/s', 'Rate at 50 mm/s'], sm, 'Computed with the calculator on this page.', ['l', 'r', 'r'])}
<p>An exam question that mentions the speed is testing exactly this. Read the speed first, then count.</p>
<h2>Intervals use the same arithmetic</h2>
<p>The duration of a wave or interval is its number of small boxes times the duration of one box. At 25 mm per second, a PR interval of four small boxes lasts ${h.num(4 * boxSeconds(SMALL_MM, 25), 2)} seconds and a QRS of two small boxes ${h.num(2 * boxSeconds(SMALL_MM, 25), 2)} seconds. CET questions ask for that conversion and for the order of the waves (P, QRS, T); the normal limits of each interval are taught in your program and tested in context, so learn them from your course material.</p>
<h2>Common errors on rate questions</h2>
<ul>
<li>Counting the boxes from the start of the strip instead of between two R waves.</li>
<li>Using the 1,500 rule on an irregular rhythm and reporting a single beat-to-beat rate.</li>
<li>Forgetting a paper speed of 50 mm per second written in the question.</li>
<li>Counting the complexes in three seconds and multiplying by ten.</li>
</ul>
<p>The five questions above come from the analysis domain of the ${h.src('nha_cet_plan', 'CET test plan')}. For acquisition and safety, continue with the ${h.a('ekg-practice-test', 'EKG practice test')}, then the ${h.a('cet-exam', 'full CET mock')}. This page trains exam arithmetic; it is not a tool for reading a patient's EKG, which belongs to qualified clinicians (see ${h.src('medline_ekg', 'MedlinePlus on the electrocardiogram')}).</p>`;
    },
  },
});
