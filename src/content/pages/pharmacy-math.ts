import { definePage } from '../../lib/guide-types';
import { convert, doseByWeight } from '../../lib/engine/pharm';

export default definePage({
  id: 'pharmacy-math',
  group: 'pharm',
  order: 42,
  tool: { kind: 'mini:convert' },
  mini: { kind: 'quiz', props: { exam: 'ptce', domain: 'order', n: 5 } },
  related: ['days-supply', 'dosage-calculations', 'ptcb-practice-test', 'ptcb-exam-difficulty'],
  sources: ['cfr_101_9', 'nist_units', 'ptcb_outline', 'nha_excpt_plan'],
  en: {
    slug: 'pharmacy-math',
    nav: 'Pharmacy math',
    card: 'Unit conversions, ratios and percent strength for the pharmacy technician exams, with a converter and worked examples.',
    title: 'Pharmacy Math: Conversions, Ratios and Percent Strength',
    description: 'Pharmacy math for the PTCE and ExCPT: metric and household conversions, ratio and proportion, percent and ratio strength, with a converter and examples.',
    h1: 'Pharmacy math for technician exams',
    intro: 'Type an amount and choose two units: the converter gives the result with the factors used. Below, the four kinds of pharmacy arithmetic, each with a worked example.',
    resume: (h) => {
      const M = h.P.pharmMath;
      return `Pharmacy math on the technician exams rests on four skills: converting units, setting up a proportion, reading a strength written as a percent or a ratio, and applying them to a prescription. Conversions come first, because almost every calculation starts with one. The metric system is exact: 1 g is 1,000 mg and 1 mg is 1,000 mcg. Household measures are not, so the exams use the values that federal labeling rules set for them: a teaspoon is ${M.tspMl} mL, a tablespoon ${M.tbspMl} mL, a fluid ounce ${M.flozMl} mL and a cup ${M.cupMl} mL. For weight, a kilogram is ${M.lbPerKg} pounds in most exam questions, while the exact factor is ${M.lbKg} kg per pound. A proportion turns one known ratio into the unknown one; percent strength is grams of drug in 100 mL or 100 g; ratio strength writes the same idea as 1 part in so many. The converter above handles the units; the rest of the page shows each skill on a short worked example.`;
    },
    faqs: () => [
      { q: 'Is a calculator allowed on the pharmacy technician exams?', a: 'The certifiers describe the testing tools in their candidate handbooks, and the rules can change with the delivery mode. Read the current handbook of your exam before test day. Either way, practice by hand as well: setting up the problem correctly matters more than the arithmetic, and knowing roughly what answer to expect catches slips.' },
      { q: 'Why does the exam use 2.2 pounds per kilogram?', a: 'Because it is the rounded factor used in practice and in most textbooks. The exact value is 0.45359237 kg per pound, which gives 2.2046 pounds per kilogram. The difference matters only in the third digit; if a question gives a factor, always use the one it gives, and if the options differ only in rounding, check which factor they assume.' },
      { q: 'What is the difference between percent strength w/v and w/w?', a: 'Weight in volume (w/v) means grams of drug in 100 mL of solution: a 5% w/v solution has 5 g in 100 mL. Weight in weight (w/w) means grams in 100 g of product, used for creams and ointments. Volume in volume (v/v) means mL in 100 mL, used for liquids mixed with liquids such as alcohol.' },
      { q: 'How do I avoid errors with decimal points?', a: 'Follow the two rules used on labels and orders: always write a zero before a decimal point (0.5 mg, never .5 mg) and never write a trailing zero (5 mg, never 5.0 mg). A missed decimal point makes a tenfold error. Then check the size of your answer: a tablet count of 40 for one dose should make you stop and look again.' },
    ],
    body: (h) => {
      const M = h.P.pharmMath;
      const tbsp = convert(1.5, 'tbsp', 'mL') ?? 0, gr = convert(5, 'gr', 'mg') ?? 0, mcg = convert(0.25, 'mg', 'mcg') ?? 0;
      const w = doseByWeight(5, 66, 'lb', 25);
      return `
<h2>Conversions to know by heart</h2>
${h.table(['Unit', 'Equals', 'Basis'], [['1 kg', '1,000 g', 'Metric, exact'], ['1 g', '1,000 mg', 'Metric, exact'], ['1 mg', '1,000 mcg', 'Metric, exact'], ['1 L', '1,000 mL', 'Metric, exact'], ['1 teaspoon', `${M.tspMl} mL`, 'Labeling rule'], ['1 tablespoon', `${M.tbspMl} mL`, 'Labeling rule'], ['1 fluid ounce', `${M.flozMl} mL`, 'Labeling rule'], ['1 cup', `${M.cupMl} mL`, 'Labeling rule'], ['1 kg', `${M.lbPerKg} lb`, 'Rounded factor'], ['1 grain', `${h.num(M.grainMg, 2)} mg`, 'Exact; labels often round to 65']], `Household measures from ${h.src('cfr_101_9', '21 CFR 101.9')}; the grain and the pound from ${h.src('nist_units', 'NIST Handbook 44')}.`, ['l', 'r', 'l'])}
<p>Three quick examples with the converter: 1.5 tablespoons is ${h.num(tbsp)} mL; 5 grains is ${h.num(gr, 1)} mg; 0.25 mg is ${h.num(mcg)} mcg. To go from a larger unit to a smaller one, multiply; from smaller to larger, divide.</p>
<h2>Ratio and proportion</h2>
<p>Most pharmacy problems are a proportion: a known pair of quantities, and a second pair with one unknown. Write both with the same units in the same places, then cross-multiply. Example: an oral suspension has 250 mg in 5 mL, and the order is 400 mg. Set 250 mg / 5 mL = 400 mg / x mL; x = 400 × 5 ÷ 250 = ${h.num((400 * 5) / 250)} mL. Checking the size helps: 400 mg is a bit more than 250 mg, so the volume must be a bit more than 5 mL.</p>
<h2>Dose by body weight</h2>
<p>When an order is in mg per kg, convert the weight to kilograms first. Example: 5 mg/kg for a child of 66 lb, with a liquid of 25 mg/mL. The child weighs 66 ÷ ${M.lbPerKg} = ${h.num(w.kg)} kg, so the dose is ${h.num(w.mg)} mg, which is ${h.num(w.ml, 1)} mL of the liquid. The ${h.a('dosage-calculations', 'dosage calculations page')} has a calculator for this.</p>
<h2>Percent strength and ratio strength</h2>
${h.table(['Written as', 'Means', 'Example'], [['% w/v', 'g of drug in 100 mL', '0.9% sodium chloride: 0.9 g in 100 mL, so 9 g per liter'], ['% w/w', 'g of drug in 100 g', '1% hydrocortisone cream: 1 g in 100 g, so 0.3 g in a 30 g tube'], ['% v/v', 'mL in 100 mL', '70% isopropyl alcohol: 70 mL in 100 mL'], ['Ratio 1:x', '1 g in x mL (or 1 g in x g)', '1:1,000 is 1 g in 1,000 mL, so 1 mg per mL and 0.1%']], 'Percent and ratio strength as the exams use them.', ['l', 'l', 'l'])}
<p>To convert a ratio strength to a percent, divide 100 by the second number: 1:1,000 is 100 ÷ 1,000 = 0.1%. To go the other way, divide 100 by the percent: 0.1% is 1:1,000.</p>
<h2>Where the rest of the math lives</h2>
<p>Days supply, the most frequent calculation in a pharmacy, has its own ${h.a('days-supply', 'page with four calculators')}: tablets, liquids, insulin and eye drops. Dilutions, alligation and IV flow rates are on the ${h.a('dosage-calculations', 'dosage calculations page')}. The ${h.src('ptcb_outline', 'PTCE outline')} places calculations in order entry and processing; the ${h.src('nha_excpt_plan', 'ExCPT test plan')} in the dispensing process.</p>
<p>The examples are exam arithmetic. Real doses are set by the prescriber and checked by the pharmacist.</p>`;
    },
  },
});
