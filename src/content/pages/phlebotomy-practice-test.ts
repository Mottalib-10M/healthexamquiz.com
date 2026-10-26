import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'phlebotomy-practice-test',
  group: 'lab',
  order: 60,
  tool: { kind: 'quiz', props: { exam: 'cpt', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:readiness', props: { e: 5 } },
  related: ['nha-phlebotomy-exam', 'order-of-draw', 'ekg-practice-test', 'review-mistakes', 'which-certification'],
  sources: ['nha_cpt_plan', 'clsi_order', 'osha_bbp', 'nha_handbook'],
  en: {
    slug: 'phlebotomy-practice-test',
    nav: 'Phlebotomy practice test',
    card: 'Ten questions at a time on one domain of the NHA phlebotomy exam, from safety to specimen processing.',
    title: 'Phlebotomy Practice Test 2026: Free NHA CPT Questions',
    description: 'Phlebotomy practice test 2026: free questions on the five domains of the NHA CPT exam, from safety and patient ID to order of draw and specimen processing.',
    h1: 'Phlebotomy practice test for the NHA CPT exam',
    intro: 'Choose a domain of the test plan, answer ten questions and see the reason behind each answer. Nothing you answer leaves this browser.',
    resume: (h) => {
      const x = h.X('cpt');
      return `The Certified Phlebotomy Technician exam of the National Healthcareer Association (NHA) is the most common national credential for people who draw blood in clinics, hospitals and laboratories. The NHA launched a new version of the exam on ${h.date(h.R.nha.cptLaunch)}, built on a fresh job analysis: ${x.scored} scored questions and ${x.items - x.scored} unscored pretest questions, to answer in ${h.time('cpt')}. The test plan splits the scored questions into five domains: safety and compliance (${h.pc(h.dom('cpt', 'safety').share)}), patient preparation (${h.pc(h.dom('cpt', 'prep').share)}), routine blood collections (${h.pc(h.dom('cpt', 'routine').share)}), special collections (${h.pc(h.dom('cpt', 'special').share)}) and processing (${h.pc(h.dom('cpt', 'process').share)}). ${x.passText}. Candidates also document ${h.R.nha.cptVenipunctures} successful venipunctures and ${h.R.nha.cptCapillary} capillary sticks on live people. This practice test draws ten questions from the domain you pick and explains every answer.`;
    },
    faqs: (h) => [
      { q: 'What changed in the NHA phlebotomy exam in 2026?', a: `The NHA replaced the CPT exam on ${h.date(h.R.nha.cptLaunch)} after a new job analysis. The test plan now has five domains, with routine blood collections the largest and safety and compliance close behind. The length stayed at ${h.X('cpt').scored} scored questions plus pretest items. Study material written for the older plan still covers most topics, but check its domain names against the new test plan.` },
      { q: 'How many questions are on the phlebotomy exam, and how long is it?', a: `The NHA CPT exam has ${h.X('cpt').items} questions, ${h.X('cpt').scored} of which count toward the score, and you have ${h.time('cpt')}. The unscored questions are new items being tried out; they look like the others, so answer every question with the same care. The full mock on this site keeps that length and that time.` },
      { q: 'Is order of draw a big part of the CPT exam?', a: 'It sits inside routine blood collections, the heaviest domain, and it shows up again in special collections when blood cultures or coagulation tests are involved. Expect a few direct questions on the sequence and more scenarios where a wrong order would spoil a result. The order of draw trainer on this site drills it tube by tube.' },
      { q: 'Do I need to know OSHA rules for the phlebotomy exam?', a: 'Yes, at the level of daily practice. Safety and compliance covers standard precautions, sharps disposal, what to do after a needlestick and why safety devices must be activated at once. These come from the federal bloodborne pathogens standard. You are not asked for section numbers, but you are asked what the rule requires a phlebotomist to do.' },
    ],
    body: (h) => {
      const x = h.X('cpt');
      const rows = x.domains.map((d) => [d.name, h.pc(d.share), d.items, h.inPool('cpt', d.code)]);
      return `
<h2>The five domains of the CPT test plan</h2>
<p>The NHA publishes its ${h.src('nha_cpt_plan', 'CPT test plan')} with the share of scored questions in each domain and the tasks behind them. The table shows those shares, the number of questions each domain gets in our ${x.items}-question mock and the size of our pool.</p>
${h.table(['Domain', 'Share of scored questions', 'Questions in a full mock', 'Questions in our pool'], rows, `NHA CPT test plan, exam launched ${h.date(h.R.nha.cptLaunch)}.`, ['l', 'r', 'r', 'r'])}
<p>Routine blood collections and safety together make up more than half of the exam. Routine collections covers the venipuncture itself: assembling equipment, applying and releasing the tourniquet, choosing the vein, the angle of insertion, filling tubes in the right order and mixing them. Safety covers infection control, protective equipment, sharps, exposure incidents and patient identification. Patient preparation is about the requisition, fasting and timing instructions, positioning, and sites you must avoid. Special collections and processing are smaller but precise: blood cultures, timed tests, chain of custody, centrifuging, labeling and transport conditions.</p>
<h2>How to practice with this test</h2>
<p>Start with routine collections, because its questions reuse knowledge from every other domain. When a set goes well, move to the domain where you made the most errors rather than following the list. Each wrong answer is saved in this browser and comes back on the ${h.a('review-mistakes', 'review page')}. When every domain is above the 80% target in two sets in a row, take the ${h.a('nha-phlebotomy-exam', 'full timed exam')}.</p>
<p>Read the explanation even when you were right. Many CPT questions have two options that are both acceptable in daily practice, and only one that is right for the scenario given, often because of patient identification or specimen integrity. The explanation says which detail decides.</p>
<h2>Five topics that decide many questions</h2>
<ul>
<li><strong>Two identifiers.</strong> The patient states the full name and date of birth, and you match them to the requisition and the wristband before anything else. Asking "Are you Mrs. Lee?" is the classic wrong answer.</li>
<li><strong>Tourniquet time.</strong> The tourniquet stays on for no more than one minute; longer changes some results through hemoconcentration.</li>
<li><strong>Sites to avoid.</strong> The arm on the side of a mastectomy, an arm with an IV running, a fistula, scarred or bruised areas.</li>
<li><strong>Order of draw.</strong> Blood culture first, then light blue citrate, serum, heparin, EDTA and gray, as ${h.src('clsi_order', 'CLSI summarizes its GP41 standard')}. The ${h.a('order-of-draw', 'order of draw trainer')} drills it.</li>
<li><strong>Hemolysis.</strong> A needle too small, forcing blood through a syringe, shaking tubes or drawing through a hematoma all break red cells and can spoil the specimen.</li>
</ul>
<!--tool:quiz|{"exam":"cpt","domain":"safety","n":5}-->
<h2>Safety questions: the federal background</h2>
<p>Several safety questions follow the ${h.src('osha_bbp', 'OSHA bloodborne pathogens standard')}: treat all blood as potentially infectious, use engineered safety devices, never recap a used needle by hand, discard sharps at once in a closable, puncture-resistant container, and report an exposure right away so that follow-up can begin. On the exam, the right answer is the one that protects you and the patient without delay; washing the site and reporting comes before finishing the paperwork.</p>
<h2>Before you book the exam</h2>
<p>The CPT exam can be taken at a test center or with live remote proctoring, and you need a training program or work experience plus the documented draws. The ${h.a('nha-phlebotomy-exam', 'exam guide')} covers eligibility, scoring and retakes. The NHA did not show its exam fee on a public page on ${h.read}; schools often pay it, and your NHA account shows the current amount.</p>
<p>These practice questions are written by us from the test plan topics. They are not questions from the real exam.</p>`;
    },
  },
});
