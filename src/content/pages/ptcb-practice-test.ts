import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ptcb-practice-test',
  group: 'pharm',
  order: 30,
  tool: { kind: 'quiz', props: { exam: 'ptce', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:readiness', props: { e: 1 } },
  related: ['ptce-practice-exam', 'ptcb-exam', 'top-200-drugs', 'pharmacy-math', 'review-mistakes'],
  sources: ['ptcb_outline', 'ptcb_cpht', 'dea_schedules', 'fda_ndc'],
  en: {
    slug: 'ptcb-practice-test',
    nav: 'PTCB practice test',
    card: 'Ten PTCE questions at a time from one of the four domains of the 2026 PTCB outline, each explained.',
    title: 'PTCB Practice Test 2026: Free PTCE Questions by Domain',
    description: 'PTCB practice test 2026: free PTCE questions on the four domains of the January 2026 outline, medications, federal law, patient safety and order entry.',
    h1: 'PTCB practice test, one domain at a time',
    intro: 'Pick a domain of the PTCE outline and answer ten questions. Each answer is corrected at once with its reason; missed ones come back later.',
    resume: (h) => {
      const x = h.X('ptce');
      return `The Pharmacy Technician Certification Exam (PTCE) of the Pharmacy Technician Certification Board (PTCB) leads to the Certified Pharmacy Technician credential, CPhT. Since ${h.date(h.R.ptce.outlineEffective)} it follows a revised content outline with four domains: medications (${h.pc(h.dom('ptce', 'med').share, 2)} of the scored questions), federal requirements (${h.pc(h.dom('ptce', 'fed').share, 2)}), patient safety and quality assurance (${h.pc(h.dom('ptce', 'safe').share, 2)}) and order entry and processing (${h.pc(h.dom('ptce', 'order').share, 2)}). The exam has ${x.items} multiple-choice questions, ${x.scored} scored and ${x.items - x.scored} unscored, in ${h.time('ptce')} of testing time, delivered by Pearson VUE. Results use a scale of 1,000 to 1,600, and ${x.passText.replace('Official pass: ', '').toLowerCase()}. The fee is ${h.usd(x.fee)}. This practice test draws ten questions from the domain you choose; order entry includes the pharmacy calculations that many candidates find hardest.`;
    },
    faqs: (h) => [
      { q: 'What changed in the PTCE outline in January 2026?', a: `The PTCB revised the outline after a job analysis, with the new version in force from ${h.date(h.R.ptce.outlineEffective)}. Four domains remain, and medications is still the largest at ${h.pc(h.dom('ptce', 'med').share, 0)} of the scored questions. Check the domain list of any older study material against the current outline before you rely on it.` },
      { q: 'How much math is on the PTCB exam?', a: 'Calculations sit mostly in order entry and processing: days supply, quantity to dispense, conversions between units, dilutions and alligation, dose by weight and IV rates. Expect a steady handful rather than a whole section. Each one is worth the same as a recall question, so practice until the usual setups take under a minute.' },
      { q: 'Are drug brand names tested on the PTCE?', a: 'Yes. Matching generic and brand names, knowing the class and the main use of common drugs, and spotting look-alike names are all part of the medications domain. A list of the most dispensed drugs is the usual way to learn them; this site has flash cards and a quiz built from the National Library of Medicine data.' },
      { q: 'Do PTCE questions use state pharmacy law?', a: 'No. The federal requirements domain covers federal law only: controlled substance schedules and DEA forms, restricted drug programs, recalls, hazardous drug handling and the like. State rules on technician ratios or duties vary too much to test nationally. Learn your state rules separately for your job and your state registration.' },
    ],
    body: (h) => {
      const x = h.X('ptce');
      const rows = x.domains.map((d) => [d.name, h.pc(d.share, 2), d.items, h.inPool('ptce', d.code)]);
      return `
<h2>The four domains of the PTCE</h2>
${h.table(['Domain', 'Share of scored questions', 'Questions in a full mock', 'Questions in our pool'], rows, `${h.src('ptcb_outline', 'PTCE content outline')}, in force since ${h.date(h.R.ptce.outlineEffective)}.`, ['l', 'r', 'r', 'r'])}
<p>Our full mock scales the shares to the ${x.items} questions of the real form. Each question in our pool is also tagged for the ExCPT of the NHA where the topic appears there, so practice for one exam counts for the other.</p>
<h2>What each domain asks</h2>
<p><strong>Medications</strong> covers generic and brand names, therapeutic classes, indications, common side effects and interactions, dosage forms, storage, narrow therapeutic index drugs and look-alike or sound-alike names. <strong>Federal requirements</strong> covers the ${h.src('dea_schedules', 'controlled substance schedules')}, the DEA forms for ordering, loss and destruction, restricted distribution programs, recalls and hazardous drug handling. <strong>Patient safety and quality assurance</strong> covers error prevention, high-alert drugs, error-prone abbreviations, tall man lettering, event reporting and when a question goes to the pharmacist. <strong>Order entry and processing</strong> covers reading prescriptions and sig codes, calculations, the ${h.src('fda_ndc', 'National Drug Code')} structure, packaging, beyond-use dates and nonsterile compounding basics.</p>
<h2>Three rules that answer many questions</h2>
<ul>
<li><strong>Clinical judgment belongs to the pharmacist.</strong> Counseling, therapy changes and anything that needs judgment about a patient go to the pharmacist; options that have the technician decide are usually wrong.</li>
<li><strong>Federal law sets the floor.</strong> When a question asks about a rule "under federal law", ignore stricter state rules you know from work.</li>
<li><strong>Round days supply down.</strong> A partial day is not a day of therapy; ninety tablets at four a day last 22 days, not 22.5.</li>
</ul>
<!--tool:quiz|{"exam":"ptce","domain":"fed","n":5}-->
<h2>From domain sets to the full exam</h2>
<p>Begin with medications, the largest domain, and order entry, where calculations hide. Keep a list of the drugs you miss; the ${h.a('top-200-drugs', 'top 200 drug cards')} help with names and classes, and the ${h.a('pharmacy-math', 'pharmacy math page')} with conversions. Wrong answers come back on the ${h.a('review-mistakes', 'review page')}. When each domain is above the study target twice in a row, take the ${h.a('ptce-practice-exam', 'full PTCE mock')}.</p>
<p>These questions are ours, written from the outline topics. They are not questions from the real exam, and no one can honestly offer those.</p>`;
    },
  },
});
