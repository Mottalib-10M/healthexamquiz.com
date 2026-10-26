import { definePage } from '../../lib/guide-types';
import { daysSupply, convert } from '../../lib/engine/pharm';

export default definePage({
  id: 'pharmacy-tech-practice-test',
  group: 'pharm',
  order: 35,
  tool: { kind: 'quiz', props: { exam: 'excpt', mode: 'practice', pick: true, n: 10 } },
  mini: { kind: 'mini:dayssupply' },
  related: ['ptcb-practice-test', 'excpt-practice-test', 'pharmacy-technician-exam', 'pharmacy-math', 'top-200-drugs'],
  sources: ['ptcb_outline', 'nha_excpt_plan', 'cfr_101_9', 'dea_schedules'],
  en: {
    slug: 'pharmacy-tech-practice-test',
    nav: 'Pharmacy tech practice test',
    card: 'One practice test for both pharmacy technician exams: switch between the ExCPT and the PTCE in one click.',
    title: 'Pharmacy Tech Practice Test 2026: PTCE and ExCPT Questions',
    description: 'Pharmacy tech practice test 2026: free questions for the PTCE and the ExCPT, by domain, with recall, scenario and calculation items explained one by one.',
    h1: 'Pharmacy tech practice test for either exam',
    intro: 'Choose the ExCPT or the PTCE in the exam menu, then a domain. Ten questions a set, each corrected at once with the reason.',
    resume: (h) => `Pharmacy technicians in the United States certify through one of two national exams: the PTCE of the Pharmacy Technician Certification Board, ${h.X('ptce').items} questions in ${h.time('ptce')}, or the ExCPT of the National Healthcareer Association, ${h.X('excpt').items} questions in ${h.time('excpt')}. Both cover the same job, drugs and their classes, federal pharmacy law, patient safety and the dispensing of prescriptions, but they weight it differently and name their domains differently. This practice test works for both: every question in our pool of ${h.num(h.inPool('ptce'))} pharmacy questions is tagged with its PTCE domain and its ExCPT domain, and the exam menu switches the quiz between the two outlines. Three kinds of questions make up both exams: recall items on names, classes and rules; scenarios that follow a prescription through the pharmacy; and calculations, from days supply to dilutions. The days supply calculator under the quiz checks the most frequent calculation of all, the one pharmacies make on every claim.`,
    faqs: () => [
      { q: 'Should I practice for the PTCE or the ExCPT?', a: 'Start from what your state board of pharmacy and your employer accept. If both are accepted, compare the format and the weights: the PTCE gives medications the largest share, the ExCPT the dispensing process. Since most of the knowledge is shared, practice here counts for both, and you can switch the exam menu at any time.' },
      { q: 'What kinds of calculations come up on pharmacy technician exams?', a: 'Days supply and quantity to dispense, conversions between metric and household units, dose by weight, percentage strength and ratio problems, dilutions with C1 × V1 = C2 × V2, alligation, and IV flow rates. Days supply and conversions are the most frequent. Each has a calculator on this site, with worked examples on the pharmacy math page.' },
      { q: 'How do I get better at prescription scenarios?', a: 'Follow the prescription in order: is it complete and valid, is it entered correctly, is the claim accepted, is the right product selected, is the label complete, who verifies. Each scenario question tests one of those steps. Find the step first, then the rule. Questions that put the technician in charge of a clinical decision are usually testing scope.' },
    ],
    body: (h) => {
      const tsp = convert(2, 'tsp', 'mL') ?? 0, ds = daysSupply(60, 2, 1);
      return `
<h2>The three kinds of questions</h2>
<h3>Recall</h3>
<p>Short questions on facts: the brand name of a generic, the class of a drug, the schedule of a controlled substance (${h.src('dea_schedules', 'DEA schedules')}), the meaning of a sig code. They are fast to answer if you know them and impossible to reason out if you do not. Flash cards and daily repetition work best; the ${h.a('top-200-drugs', 'top 200 drugs page')} has both.</p>
<h3>Scenarios</h3>
<p>A situation at the counter or the computer, and the next step. The answer depends on the step of the dispensing process being tested and on scope: technicians gather information, enter, fill and label; pharmacists verify, counsel and decide. When two options seem right, the one that refers a clinical question to the pharmacist is usually the answer.</p>
<h3>Calculations</h3>
<p>Numbers with units. Two quick examples: a dose of 2 teaspoons is ${h.num(tsp)} mL, using the 5 mL teaspoon of federal labeling rules (${h.src('cfr_101_9', '21 CFR 101.9')}); 60 tablets at 2 a day last ${ds} days. Write each step with its unit, and check that the answer has the unit the question asks for.</p>
<h2>How the two outlines name the same topics</h2>
${h.table(['Topic', 'PTCE domain', 'ExCPT domain'], [['Drug names, classes, uses', 'Medications', 'Drugs and drug therapy'], ['Controlled substances, DEA forms', 'Federal requirements', 'Laws'], ['Error prevention, high-alert drugs', 'Patient safety and QA', 'Medication and patient safety and QA'], ['Prescription entry, calculations, labels', 'Order entry and processing', 'Dispensing process'], ['Billing, inventory, customer service', 'Order entry and processing', 'Role, responsibilities and general duties']], `From the ${h.src('ptcb_outline', 'PTCE outline')} and the ${h.src('nha_excpt_plan', 'ExCPT test plan')}.`, ['l', 'l', 'l'])}
<p>When you switch the exam menu, the domain menu changes to that exam's names and the same question may appear under a different heading.</p>
<h2>A balanced practice week</h2>
<p>Alternate the three kinds: recall sets on drugs on most days, scenario sets on law and safety twice a week, a calculation session every other day. At the end of the week, take a full mock for the exam you chose: the ${h.a('ptce-practice-exam', 'PTCE mock')} or the ExCPT format described on the ${h.a('excpt-practice-test', 'ExCPT page')}. The ${h.a('pharmacy-technician-exam', 'exam comparison')} lays out both formats.</p>
<p>The questions are ours, written from the public outlines; they are not questions from either real exam.</p>`;
    },
  },
});
