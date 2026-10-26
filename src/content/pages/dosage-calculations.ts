import { definePage } from '../../lib/guide-types';
import { doseByWeight, dilution, alligation, ivRate } from '../../lib/engine/pharm';

export default definePage({
  id: 'dosage-calculations',
  group: 'pharm',
  order: 44,
  tool: { kind: 'mini:dose' },
  related: ['pharmacy-math', 'days-supply', 'ptcb-practice-test', 'ptce-practice-exam'],
  sources: ['ptcb_outline', 'nha_excpt_plan', 'nist_units'],
  en: {
    slug: 'dosage-calculations',
    nav: 'Dosage calculations',
    card: 'Dose by weight, dilutions, alligation and IV flow rates: four calculators with the formulas and worked examples.',
    title: 'Dosage Calculations: Weight, Dilution, Alligation, IV Rate',
    description: 'Dosage calculations for pharmacy technician exams: dose by weight, dilutions with C1V1 = C2V2, alligation and IV flow rates, with four free calculators.',
    h1: 'Dosage calculations: four calculators with the formulas',
    intro: 'Enter an order in mg per kg, the weight and the strength of the product: the dose and the volume appear at once. The other three calculators are further down.',
    resume: (h) => `Dosage calculations on the pharmacy technician exams fall into four families. Dose by body weight multiplies an order in mg per kg by the patient's weight in kilograms, after converting pounds at ${h.P.pharmMath.lbPerKg} per kilogram, then turns the dose into a volume with the strength of the product. Dilution uses the relation C1 × V1 = C2 × V2: the stock strength times the stock volume equals the final strength times the final volume, which gives how much stock to measure and how much diluent to add. Alligation finds how many parts of a stronger and a weaker product to mix to reach a strength in between; the parts are the differences between the strengths, read crosswise. IV flow rates turn a volume and a time into mL per hour, for a pump, or into drops per minute, using the drop factor printed on the tubing set. Each family has a calculator on this page with a worked example, and the formulas are the same ones the exams expect you to set up by hand.`,
    faqs: () => [
      { q: 'What is the drop factor of an IV set?', a: 'It is the number of drops that make 1 mL with that tubing, printed on the package. Macrodrip sets commonly deliver 10, 15 or 20 drops per mL; microdrip sets deliver 60. The same infusion runs at very different drops per minute depending on the set, so an exam question always gives the drop factor, and the answer depends on it.' },
      { q: 'When do I use alligation instead of C1V1 = C2V2?', a: 'Use C1V1 = C2V2 when you dilute one product with a diluent that has no drug in it, such as water or plain base. Use alligation when you mix two products that both contain the drug at different strengths, such as a 10% and a 2% ointment. A diluent can be treated as 0% in alligation, which gives the same answer as C1V1 = C2V2.' },
      { q: 'Should I round the weight in kilograms before calculating the dose?', a: 'Follow the question: some say to round the weight to one decimal or to the nearest kilogram, and the options are built on that rounding. If nothing is said, keep the weight unrounded and round only the final answer, to the precision of the measuring device: tenths of a mL for an oral syringe, for example.' },
    ],
    body: (h) => {
      const w = doseByWeight(15, 22, 'kg', 40);
      const d = dilution(95, 70, 200), a = alligation(10, 2, 5, 240), iv = ivRate(1000, 8 * 60, 15), iv2 = ivRate(100, 30, 60);
      return `
<h2>Dose by body weight</h2>
<p>Dose (mg) = mg/kg × weight (kg); volume (mL) = dose ÷ strength (mg/mL). Example: an order of 15 mg/kg for a 22 kg child, with a liquid of 40 mg/mL, gives ${h.num(w.mg)} mg, or ${h.num(w.ml, 2)} mL. When the order is per day and divided into several doses, divide the daily dose by the number of doses before converting to mL.</p>
<h2>Dilutions: C1 × V1 = C2 × V2</h2>
<p>To make 200 mL of 70% alcohol from a 95% stock: V1 = 70 × 200 ÷ 95 = ${h.num(d?.stock ?? 0, 1)} mL of stock, made up to 200 mL with ${h.num(d?.diluent ?? 0, 1)} mL of water. The final strength must be lower than the stock; if a question asks for a stronger product from a weaker one, the answer is that it cannot be done by dilution.</p>
<!--tool:mini:dilution-->
<h2>Alligation</h2>
<p>Write the higher strength top left, the lower one bottom left, the wanted strength in the middle. Subtract crosswise: wanted minus lower gives the parts of the higher product, higher minus wanted gives the parts of the lower one. Example: 240 g of a 5% ointment from 10% and 2%. Parts of 10%: 5 − 2 = ${a?.pHigh}; parts of 2%: 10 − 5 = ${a?.pLow}; total ${(a?.pHigh ?? 0) + (a?.pLow ?? 0)} parts. So ${h.num(a?.high ?? 0)} g of the 10% and ${h.num(a?.low ?? 0)} g of the 2%.</p>
<!--tool:mini:alligation-->
<h2>IV flow rates</h2>
<p>mL per hour = volume ÷ hours. Drops per minute = volume × drop factor ÷ minutes. Example: 1,000 mL over 8 hours runs at ${h.num(iv.mlHr)} mL per hour; with a 15 drops per mL set, that is ${h.num(iv.gttMin, 1)} drops per minute, which in practice is rounded to a whole drop. With a microdrip set of 60 drops per mL, drops per minute equal mL per hour: 100 mL over 30 minutes is ${h.num(iv2.mlHr)} mL per hour and ${h.num(iv2.gttMin)} drops per minute.</p>
<!--tool:mini:ivrate-->
<h2>Checking an answer</h2>
<ol>
<li><strong>Units.</strong> Write the unit beside every number; the units that cancel should leave the unit asked for.</li>
<li><strong>Size.</strong> Estimate before computing: a child's dose in mL is rarely more than a few teaspoons, an IV rate over 500 mL per hour is unusual outside a bolus.</li>
<li><strong>Rounding.</strong> Round once, at the end, to what can be measured.</li>
</ol>
<p>The ${h.src('ptcb_outline', 'PTCE outline')} lists these calculations under order entry and processing, the ${h.src('nha_excpt_plan', 'ExCPT test plan')} under the dispensing process. Unit factors follow ${h.src('nist_units', 'NIST Handbook 44')}. The ${h.a('pharmacy-math', 'pharmacy math page')} covers conversions and percent strength, the ${h.a('days-supply', 'days supply page')} the most frequent calculation of all.</p>
<p>All examples are exam arithmetic, not dosing guidance: real doses are ordered by a prescriber and verified by a pharmacist.</p>`;
    },
  },
});
