import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ccma-practice-test',
  group: 'ma',
  order: 50,
  tool: { kind: 'quiz', props: { exam: 'ccma', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:readiness', props: { e: 3 } },
  related: ['ccma-practice-exam', 'ccma-exam', 'cma-practice-test', 'order-of-draw', 'review-mistakes'],
  sources: ['nha_ccma_plan', 'nha_handbook', 'osha_bbp', 'cdc_hands'],
  en: {
    slug: 'ccma-practice-test',
    nav: 'CCMA practice test',
    card: 'Ten CCMA questions at a time from one of the twelve areas of the NHA test plan, each answer explained.',
    title: 'CCMA Practice Test 2026: Free Questions by Test Plan Area',
    description: 'CCMA practice test 2026: free questions on every area of the NHA test plan, from vital signs and infection control to billing and law, answers explained.',
    h1: 'CCMA practice test by test plan area',
    intro: 'Pick one area of the CCMA test plan and answer ten questions. Each answer is corrected at once, with the reason and the area it trains.',
    resume: (h) => {
      const x = h.X('ccma');
      const clin = x.domains.filter((d) => ['vitals', 'care', 'infect', 'poct', 'phleb', 'ekg'].includes(d.code)).reduce((s, d) => s + d.share, 0);
      return `The Certified Clinical Medical Assistant exam (CCMA) of the National Healthcareer Association is one of the two main national credentials for medical assistants. Its current version, in place since ${h.date(h.R.nha.ccmaLaunch)}, has ${x.scored} scored questions and ${x.items - x.scored} pretest questions in ${h.time('ccma')}. The test plan, read in an archived copy because the NHA site blocks automated reading, gives clinical patient care ${h.pc(clin)} of the scored questions, split into six areas: intake and vitals, general patient care, infection control, point-of-care testing and laboratory, phlebotomy, and EKG. Foundational knowledge, anatomy and physiology, care coordination and education, administrative assisting, communication and customer service, and medical law and ethics make up the rest. The score is scaled, ${x.passText.replace('Official pass: ', '')}. This practice test draws ten questions from the area you choose, so you can work on one area at a time; general patient care, the largest, deserves the most sets.`;
    },
    faqs: (h) => [
      { q: 'Which part of the CCMA exam is the largest?', a: `Clinical patient care, by far. Within it, general patient care alone is about ${h.pc(h.dom('ccma', 'care').share)} of the scored questions: preparing the exam room, positioning, assisting with procedures, giving injections and medications within scope, wound care and first aid. Infection control and intake and vitals follow. Administrative topics are a smaller share than on the CMA (AAMA).` },
      { q: 'Are phlebotomy and EKG questions on the CCMA the same as on the CPT and CET?', a: 'They cover the same core skills at a lighter depth. Expect the order of draw, site selection, patient identification and specimen handling for phlebotomy, and lead placement, artifacts and basic rhythm recognition for EKG. Questions on this site tagged for both exams train the shared core; the CPT and CET pages go further.' },
      { q: 'How should I split my practice between the twelve areas?', a: 'In proportion to the test plan, with extra sets where you score lowest. Start with general patient care, infection control and intake and vitals, which together carry close to half the exam. Then rotate through the smaller areas; medical law and ethics is short but its questions are easy to lose by guessing.' },
      { q: 'Does the CCMA test administrative work?', a: `Yes, in two areas: administrative assisting (about ${h.pc(h.dom('ccma', 'admin').share)}) and communication and customer service (about ${h.pc(h.dom('ccma', 'comm').share)}). Scheduling, records, insurance verification and basic billing concepts appear, but at a lighter level than on the CMA (AAMA), whose administrative category is a fifth of the exam.` },
    ],
    body: (h) => {
      const x = h.X('ccma');
      const rows = x.domains.map((d) => [d.name, h.pc(d.share), d.items, h.inPool('ccma', d.code)]);
      return `
<h2>The twelve areas of the CCMA test plan</h2>
${h.table(['Area', 'Share of scored questions', 'Questions in a full mock', 'Questions in our pool'], rows, 'NHA CCMA test plan (archived copy); pools include questions shared with the CPT, CET and CMA (AAMA).', ['l', 'r', 'r', 'r'])}
<p>The table shows the weight of each area and how our ${x.items}-question mock reflects it. Phlebotomy and EKG questions come partly from the pools we wrote for the NHA phlebotomy and EKG exams, tagged here when they fit the medical assistant level.</p>
<h2>What each clinical area asks</h2>
<p><strong>Intake and vitals:</strong> measuring blood pressure, pulse, respirations, temperature, height and weight, recording a chief complaint and a medication list. <strong>General patient care:</strong> rooming and positioning, assisting with exams and minor procedures, injection sites and needle choice, medication administration within the scope set by the provider and state law, wound care and dressings, responding to emergencies in the office. <strong>Infection control:</strong> hand hygiene as the ${h.src('cdc_hands', 'CDC')} describes it, protective equipment, cleaning, disinfection and sterilization, the ${h.src('osha_bbp', 'OSHA bloodborne pathogens standard')}. <strong>Point-of-care testing and laboratory:</strong> waived tests, urine and glucose testing, quality control, specimen labeling. <strong>Phlebotomy and EKG:</strong> the core techniques of each.</p>
<h2>Scenario questions and how to approach them</h2>
<p>Many CCMA questions describe a patient in the office and ask what the medical assistant should do. The right answer usually respects three limits: it keeps the patient safe, it stays within what a medical assistant may do without a provider's order, and it protects privacy. When an option involves diagnosing, interpreting a result for the patient or changing a medication, it is almost always wrong for a medical assistant, even if a provider would do it.</p>
<!--tool:quiz|{"exam":"ccma","domain":"infect","n":5}-->
<h2>From area sets to the full exam</h2>
<p>Work one area at a time until two sets in a row clear the study target, then mix. Missed questions are saved in this browser and return on the ${h.a('review-mistakes', 'review page')}. When the clinical areas are solid, take the ${h.a('ccma-practice-exam', 'full CCMA mock')}: ${x.items} questions in ${h.time('ccma')}, corrected at the end. If you are also weighing the other national credential, the ${h.a('cma-practice-test', 'CMA (AAMA) practice test')} shows how differently that exam is organized.</p>
<p>The questions are ours, written from the test plan topics, and are not questions from the real exam. Clinical content is exam knowledge and follows general practice; your office protocols and state law decide what you do at work.</p>`;
    },
  },
});
