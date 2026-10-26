import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ekg-practice-test',
  group: 'lab',
  order: 63,
  tool: { kind: 'quiz', props: { exam: 'cet', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:ekgrate' },
  related: ['cet-exam', 'ekg-heart-rate', 'phlebotomy-practice-test', 'review-mistakes'],
  sources: ['nha_cet_plan', 'nha_news', 'medline_ekg', 'medline_pulse'],
  en: {
    slug: 'ekg-practice-test',
    nav: 'EKG practice test',
    card: 'Questions on the three domains of the NHA CET exam: safety and patient care, acquisition, analysis.',
    title: 'EKG Practice Test 2026: Free CET Questions by Domain',
    description: 'EKG practice test 2026: free questions on the NHA CET exam domains, lead placement, artifacts, rhythm basics and patient care, with each answer explained.',
    h1: 'EKG practice test for the NHA CET exam',
    intro: 'Pick a domain, answer ten questions on EKG work and read why each answer is right. Your answers are kept in this browser only.',
    resume: (h) => {
      const x = h.X('cet');
      return `The Certified EKG Technician exam (CET) of the National Healthcareer Association is the national credential most employers ask of technicians who record electrocardiograms in hospitals, cardiology offices and clinics. It has ${x.items} questions, ${x.scored} of them scored, to answer in ${h.time('cet')}. The current test plan, based on a 2017 job analysis, puts ${h.pc(h.dom('cet', 'acq').share)} of the scored questions on EKG acquisition: preparing the patient and the skin, placing the ten electrodes of a 12-lead tracing, running the machine and recognizing artifacts. Safety, compliance and coordinated patient care take ${h.pc(h.dom('cet', 'safety').share)}, and analysis and interpretation, the basic reading of rate and rhythm, ${h.pc(h.dom('cet', 'anal').share)}. Candidates also document ${h.R.nha.cetEkgs} EKGs on live people. The NHA has announced a new version of the exam for ${h.R.nha.cetNext}. This practice test serves ten questions at a time from the domain you choose, each with its explanation.`;
    },
    faqs: (h) => [
      { q: 'How much rhythm interpretation is on the CET exam?', a: `Less than many candidates fear. Analysis and interpretation is about ${h.pc(h.dom('cet', 'anal').share)} of the scored questions, and it stays at the level of a technician: measuring the rate, recognizing a regular or irregular rhythm, spotting common arrhythmias that must be reported at once, and telling artifact from a real change. Acquisition, getting a clean and correct tracing, carries the largest share.` },
      { q: 'Is a new CET exam coming?', a: `Yes. The NHA has announced a new CET exam for ${h.R.nha.cetNext}, after a new job analysis. Until it goes live, the 2017 test plan described on this page applies. When the new plan is published, this site will update the domains and the mock; check the date at the bottom of the page before you study.` },
      { q: 'Do I need to memorize where every chest electrode goes?', a: 'Yes. Placement of V1 to V6 and of the four limb electrodes is among the most tested points of acquisition, because a misplaced electrode changes the tracing. Learn the landmarks: the fourth intercostal space on each side of the sternum for V1 and V2, the fifth space at the midclavicular line for V4, and V3, V5 and V6 placed from those.' },
      { q: 'What kinds of artifact questions should I expect?', a: 'Scenarios describing a tracing with a wandering baseline, fine regular waves, or jagged irregular spikes, and asking for the likely cause or the fix. Typical causes are patient movement or shivering, loose or dried electrodes, cables pulling on the electrodes and electrical interference. The right answer usually fixes the cause before recording again, rather than reporting an arrhythmia.' },
    ],
    body: (h) => {
      const x = h.X('cet');
      const rows = x.domains.map((d) => [d.name, h.pc(d.share), d.items, h.inPool('cet', d.code)]);
      return `
<h2>The three domains of the CET test plan</h2>
${h.table(['Domain', 'Share of scored questions', 'Questions in a full mock', 'Questions in our pool'], rows, `${h.src('nha_cet_plan', 'NHA CET test plan')}, 2017 job analysis, in force on ${h.read}.`, ['l', 'r', 'r', 'r'])}
<p>Acquisition is the heart of the exam: patient identification and preparation, skin preparation, electrode placement for a 12-lead EKG and for rhythm strips, machine settings, checking the tracing for quality and handing it to the right person. Safety and coordinated care adds infection control, privacy, communication with the patient and the care team, and responding to a patient who becomes unwell during the test. Analysis covers the paper grid, the waves and intervals, heart rate, and the rhythms a technician must recognize and report.</p>
<h2>Electrode placement, the most tested skill</h2>
<p>A standard 12-lead EKG uses ten electrodes: four on the limbs and six on the chest. The chest positions are taught from the sternal angle down to the intercostal spaces:</p>
<ul>
<li><strong>V1:</strong> fourth intercostal space, right edge of the sternum.</li>
<li><strong>V2:</strong> fourth intercostal space, left edge of the sternum.</li>
<li><strong>V4:</strong> fifth intercostal space, left midclavicular line.</li>
<li><strong>V3:</strong> halfway between V2 and V4.</li>
<li><strong>V5:</strong> anterior axillary line, level with V4.</li>
<li><strong>V6:</strong> midaxillary line, level with V4 and V5.</li>
</ul>
<p>Questions often describe a tracing that looks wrong and ask what was misplaced, or ask where to place V4 on a patient with large breasts (under the breast tissue, at the fifth space). Limb electrodes go on the arms and legs, away from bone and large muscle when possible, at the same level on each side.</p>
<h2>Reading the strip: the arithmetic</h2>
<p>The grid is physical. A small box is 1 mm wide and a large box 5 mm; at the usual paper speed of 25 mm per second, a small box lasts 0.04 seconds and a large box 0.2 seconds. The heart rate follows: 1,500 divided by the small boxes between two R waves, 300 divided by the large boxes, or the number of complexes on a six-second strip times ten for irregular rhythms. The calculator above does that arithmetic for any paper speed, and the ${h.a('ekg-heart-rate', 'heart rate page')} explains each method with worked examples.</p>
<!--tool:quiz|{"exam":"cet","domain":"acq","n":5}-->
<h2>How to practice</h2>
<p>Work through acquisition first, since it carries the most questions and the most practical rules. Then alternate safety and analysis sets. Every wrong answer is kept in this browser and served again on the ${h.a('review-mistakes', 'review page')}. When each domain is above the 80% study target in two sets in a row, take the ${h.a('cet-exam', 'full CET mock')}: ${x.items} questions in ${h.time('cet')}, corrected at the end.</p>
<p>These questions are written by us from the test plan topics; they are not questions from the real exam. The rates and ranges they use are exam knowledge; for adults at rest, ${h.src('medline_pulse', 'MedlinePlus')} gives ${h.P.ekg.adultRestMin} to ${h.P.ekg.adultRestMax} beats a minute. Nothing here is a way to read a real patient's tracing.</p>`;
    },
  },
});
