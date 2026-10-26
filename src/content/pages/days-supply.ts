import { definePage } from '../../lib/guide-types';
import { daysSupply, quantityFor, insulinDays, dropsDays, convert } from '../../lib/engine/pharm';

export default definePage({
  id: 'days-supply',
  group: 'pharm',
  order: 43,
  tool: { kind: 'mini:dayssupply' },
  related: ['pharmacy-math', 'dosage-calculations', 'excpt-practice-test', 'pharmacy-tech-practice-test'],
  sources: ['cfr_101_9', 'ptcb_outline', 'nha_excpt_plan', 'fda_ndc'],
  en: {
    slug: 'days-supply',
    nav: 'Days supply',
    card: 'Four days supply calculators, for tablets, oral liquids, insulin and eye drops, with the rounding rule explained.',
    title: 'Days Supply Calculator: Tablets, Liquids, Insulin, Drops',
    description: 'Days supply calculator for pharmacy technicians: tablets, oral liquids, insulin pens and eye drops, with the formulas, the rounding rule and examples.',
    h1: 'Days supply calculators for pharmacy technicians',
    intro: 'Enter the quantity, the units per dose and the doses a day: the days supply appears at once, rounded down. Liquids, insulin and eye drops have their own calculator further down.',
    resume: () => `Days supply is the number of days a prescription will last if the patient takes it exactly as directed. Pharmacy technicians work it out on almost every prescription, because insurance claims require it and refills are allowed only when most of the previous supply is used. The formula is always the same: the total quantity dispensed divided by the quantity used each day. What changes from one dosage form to another is how the quantity is counted. For tablets and capsules it is a count; for oral liquids, a volume in mL, so the dose has to be in mL as well, a teaspoon being 5 mL under labeling rules; for insulin, units, found by multiplying the mL dispensed by the strength, 100 units per mL for U-100; for eye drops, an estimated number of drops per mL, since bottles are sold by volume. The result is rounded down to whole days. The calculator above handles tablets; the three below handle liquids, insulin and drops.`,
    faqs: () => [
      { q: 'Why is days supply rounded down?', a: 'A partial day is not a full day of therapy: if 45 tablets at two a day last 22.5 days, the patient runs out during day 23. Rounding down gives the number of complete days covered. Plans can set their own rules, for example for packages that cannot be split, so the plan rejection message is the final word on a claim.' },
      { q: 'How do I calculate days supply for "as needed" prescriptions?', a: 'Use the maximum daily dose the prescription allows. For "one tablet every 6 hours as needed", the maximum is four a day, so 30 tablets is a 7-day supply. Using the maximum avoids a claim that shows more days than the patient could need at the highest use, which plans would query.' },
      { q: 'How many drops are in a mL of eye drops?', a: 'There is no single answer: drop size depends on the bottle tip and the liquid, and published estimates commonly range from about 15 to 20 drops per mL. Many plans and pharmacies set a count to use. The calculator asks for the count so that you can enter the figure your plan, your pharmacy or the question gives.' },
      { q: 'What if the prescription gives a dose range?', a: 'For a range such as "one to two tablets twice a day", use the highest dose to compute days supply, here four tablets a day. The same logic applies to frequencies: "every 4 to 6 hours" is calculated at every 4 hours. This keeps the claim consistent with the largest use the prescriber allowed.' },
    ],
    body: (h) => {
      const t = daysSupply(45, 2, 1), q = quantityFor(30, 1, 3);
      const liq = daysSupply(150, convert(2, 'tsp', 'mL') ?? 0, 3);
      const ins = insulinDays(15, 100, 36, 0), insP = insulinDays(15, 100, 32, 4);
      const dr = dropsDays(5, 20, 1, 2, 2);
      return `
<h2>Tablets and capsules</h2>
<p>Days supply = quantity ÷ (units per dose × doses per day). Two examples: 45 tablets at two a day give ${t} days; for a 30-day supply of a capsule taken three times a day, dispense ${q}. The reverse question, quantity for a number of days, is asked as often as the forward one.</p>
<h2>Oral liquids</h2>
<p>Convert the dose to mL first, using the values federal labeling rules set (${h.src('cfr_101_9', '21 CFR 101.9')}): a teaspoon is 5 mL, a tablespoon 15 mL. Example: 150 mL of an antibiotic suspension at 2 teaspoons three times a day uses 30 mL a day, so it lasts ${liq} days. If the prescription is for 10 days and the bottle covers only 5, the claim and the quantity must reflect that: two bottles, not one.</p>
<!--tool:mini:liquid-->
<h2>Insulin</h2>
<p>Insulin is counted in units. Multiply the mL dispensed by the strength: a box of five 3 mL pens of U-100 insulin holds 15 mL, or 1,500 units. At 36 units a day that box lasts ${ins} days. Pens also need a small priming dose before each injection, given on the pen's label; with 32 units a day plus 4 units of priming, the same box lasts ${insP} days. Because pens and vials cannot be split, a box often covers more than the days written, and the claim shows the days the whole package lasts.</p>
<!--tool:mini:insulin-->
<h2>Eye drops</h2>
<p>Eye drop bottles are sold by volume, but doses are in drops, so an estimated number of drops per mL links the two. With 20 drops per mL, a 5 mL bottle holds about 100 drops; at one drop in each eye twice a day, that is four drops a day and ${dr} days. Change the drops per mL to the figure your plan or the question uses, and remember to count both eyes when the sig says "OU".</p>
<!--tool:mini:drops-->
<h2>Common traps on exam questions</h2>
<ul>
<li><strong>Units that do not match.</strong> A dose in teaspoons and a bottle in mL: convert before dividing.</li>
<li><strong>Both eyes.</strong> "OU" means both eyes, which doubles the drops used.</li>
<li><strong>Ranges and "as needed".</strong> Use the highest dose and the shortest interval allowed.</li>
<li><strong>Packages that cannot be split.</strong> Inhalers, insulin pens and creams: the days supply is how long the package lasts at the directed use.</li>
<li><strong>Rounding.</strong> Round days supply down, quantities to dispense up.</li>
</ul>
<p>Days supply sits in order entry and processing on the ${h.src('ptcb_outline', 'PTCE outline')} and in the dispensing process on the ${h.src('nha_excpt_plan', 'ExCPT test plan')}. For conversions and percent strength, see ${h.a('pharmacy-math', 'pharmacy math')}; for dose by weight, dilutions and IV rates, ${h.a('dosage-calculations', 'dosage calculations')}.</p>
<p>These calculators do exam arithmetic; they do not replace the label, the plan's rules or the pharmacist's check.</p>`;
    },
  },
});
