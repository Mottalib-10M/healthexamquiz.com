import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'excpt-practice-test',
  group: 'pharm',
  order: 36,
  tool: { kind: 'quiz', props: { exam: 'excpt', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:pace', props: { e: 2 } },
  related: ['pharmacy-technician-exam', 'ptcb-practice-test', 'days-supply', 'top-200-drugs-quiz', 'review-mistakes'],
  sources: ['nha_excpt_plan', 'nha_handbook', 'fda_ndc'],
  en: {
    slug: 'excpt-practice-test',
    nav: 'ExCPT practice test',
    card: 'Questions on the five domains of the NHA ExCPT, with the dispensing process given its full weight.',
    title: 'ExCPT Practice Test 2026: Free NHA Pharmacy Tech Questions',
    description: 'ExCPT practice test 2026: free questions on the five domains of the NHA pharmacy technician exam, with dispensing at its full weight, answers explained.',
    h1: 'ExCPT practice test for pharmacy technicians',
    intro: 'Pick a domain of the ExCPT test plan and answer ten questions, each explained at once. Your answers stay in this browser.',
    resume: (h) => {
      const x = h.X('excpt');
      return `The ExCPT, the Exam for the Certification of Pharmacy Technicians, is the National Healthcareer Association's route to a pharmacy technician credential, an alternative to the PTCB's exam that many state boards also accept. It has ${x.scored} scored questions and ${x.items - x.scored} pretest questions, ${x.items} in all, in ${h.time('excpt')}. Its test plan, based on a 2023 job analysis, puts the dispensing process first with ${h.pc(h.dom('excpt', 'disp').share)} of the scored questions: reading and entering prescriptions, calculations, selecting and packaging the product, labels and refills. The other four domains are the technician's role and general duties (${h.pc(h.dom('excpt', 'role').share)}), pharmacy law (${h.pc(h.dom('excpt', 'laws').share)}), medication and patient safety and quality assurance (${h.pc(h.dom('excpt', 'msqa').share)}) and drugs and drug therapy (${h.pc(h.dom('excpt', 'drugs').share)}). The score is scaled, ${x.passText.replace('Official pass: ', '').toLowerCase()}. This practice test serves ten questions at a time from the domain you choose.`;
    },
    faqs: (h) => [
      { q: 'Who can take the ExCPT?', a: `According to the NHA candidate handbook (archived copy), candidates need a high school diploma or equivalent and either a pharmacy technician training program completed within the last five years or ${h.num(h.R.nha.pharmHours)} hours of supervised pharmacy work in the last three years. State rules on technician registration apply on top; your state board decides what it accepts.` },
      { q: 'Why does dispensing take so much of the ExCPT?', a: `Because the NHA built the test plan from what technicians do most in a job analysis, and the dispensing process is the bulk of daily work: intake, data entry, calculations, product selection, packaging and labels. It is ${h.pc(h.dom('excpt', 'disp').share)} of the scored questions, so practice there pays off most.` },
      { q: 'Can I use PTCE practice for the ExCPT?', a: 'Largely, yes. The knowledge overlaps: drugs, federal law, safety, calculations. The weights differ, with the ExCPT stressing dispensing and the technician role, and some ExCPT questions focus on workflow, customer service and third party billing. On this site, each pharmacy question is tagged for both exams under the domain where each outline places it.' },
    ],
    body: (h) => {
      const x = h.X('excpt');
      const rows = x.domains.map((d) => [d.name, h.pc(d.share), d.items, h.inPool('excpt', d.code)]);
      return `
<h2>The five domains of the ExCPT</h2>
${h.table(['Domain', 'Share of scored questions', 'Questions in a full mock', 'Questions in our pool'], rows, `${h.src('nha_excpt_plan', 'NHA ExCPT test plan')}, 2023 job analysis.`, ['l', 'r', 'r', 'r'])}
<h2>What the ExCPT asks in each domain</h2>
<p><strong>Role, responsibilities and general duties</strong> covers what a technician may and may not do, customer service, inventory and ordering, third party billing basics, rejected claims and prior authorizations. <strong>Laws</strong> covers federal rules on controlled substances, privacy and the handling of prescriptions. <strong>Drugs and drug therapy</strong> covers names, classes, uses and common side effects. <strong>Dispensing process</strong> covers intake and verification of prescriptions, sig codes, calculations, product selection by ${h.src('fda_ndc', 'NDC')}, packaging and labeling, refills and transfers. <strong>Medication and patient safety and quality assurance</strong> covers error prevention, look-alike names, high-alert drugs and reporting.</p>
<h2>Dispensing scenarios</h2>
<p>Many ExCPT questions follow a prescription through the pharmacy: a patient drops off a prescription, the technician enters it, the claim is rejected, the product is selected and labeled, the pharmacist verifies. Each step has a typical trap: a prescription missing an element required for a controlled substance, a refill too soon, an NDC that does not match the package size, a label without the needed auxiliary sticker. Read the scenario for the step it is testing before looking at the options.</p>
<!--tool:quiz|{"exam":"excpt","domain":"disp","n":5}-->
<h2>Pacing</h2>
<p>With ${x.items} questions in ${h.time('excpt')} you have a little over a minute each. Calculations take longer; role and law questions should go faster. The calculator at the top shows the time per question if you keep a few minutes at the end.</p>
<h2>Next steps</h2>
<p>Practice each domain until two sets in a row clear the study target, starting with dispensing. The ${h.a('days-supply', 'days supply calculators')} and the ${h.a('top-200-drugs-quiz', 'drug quiz')} help with the two most common question types. Missed questions return on the ${h.a('review-mistakes', 'review page')}. The ${h.a('pharmacy-technician-exam', 'comparison of the ExCPT and the PTCE')} helps if you have not chosen yet. The NHA did not show its fee on a public page on ${h.read}.</p>
<p>The questions are ours, written from the test plan topics; they are not questions from the real exam.</p>`;
    },
  },
});
