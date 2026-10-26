import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'nremt-practice-test',
  group: 'emt',
  order: 70,
  tool: { kind: 'quiz', props: { exam: 'emt', mode: 'practice', n: 10 } },
  mini: { kind: 'mini:readiness', props: { e: 7 } },
  related: ['emt-practice-test', 'nremt-exam', 'emt-exam-questions', 'apgar-score', 'review-mistakes'],
  sources: ['nremt_exams', 'nremt_structure', 'nremt_cognitive'],
  en: {
    slug: 'nremt-practice-test',
    nav: 'NREMT practice test',
    card: 'Ten EMT questions at a time on one domain of the NREMT exam, from scene size-up to operations.',
    title: 'NREMT Practice Test 2026: Free EMT Questions by Domain',
    description: 'NREMT practice test 2026: free EMT questions on the five domains of the exam: scene safety, primary and secondary assessment, treatment and operations.',
    h1: 'NREMT practice test, domain by domain',
    intro: 'Choose a domain of the EMT exam and answer ten questions, each explained as soon as you pick. Answers stay in your browser.',
    resume: (h) => {
      const x = h.X('emt'), R = h.R.emt;
      return `The cognitive exam of the National Registry of Emergency Medical Technicians (NREMT) is the written test most states use to license EMTs. Since ${h.date(R.launched)} it follows a new design for basic life support: the questions are organized by what the EMT does on a call rather than by body system. Five domains make up the exam: scene size-up and safety (${h.dom('emt', 'scene').range}), primary assessment (${h.dom('emt', 'primary').range}), secondary assessment (${h.dom('emt', 'secondary').range}), patient treatment and transport (${h.dom('emt', 'treat').range}) and operations (${h.dom('emt', 'ops').range}), with pediatric patients spread through all of them. The exam is computer adaptive: it gives between ${x.itemsMin} and ${x.items} questions in up to ${h.time('emt')} and stops once it is confident your ability is above or below the passing standard. This practice test draws ten questions from the domain you choose, with an explanation after each answer.`;
    },
    faqs: (h) => [
      { q: 'Why is primary assessment such a large part of the NREMT exam?', a: `Because it is where an EMT's decisions matter most: the general impression, responsiveness, airway, breathing, circulation and the decision to transport at once. The NREMT gives it ${h.dom('emt', 'primary').range} of the exam, the largest domain by far. Many treatment questions, such as airway adjuncts, ventilation and bleeding control, are asked as part of it.` },
      { q: 'Are there pediatric questions on the EMT exam?', a: 'Yes, but not as a separate section. The new NREMT exam spreads pediatric patients across all domains, so a primary assessment question may be about an infant and a treatment question about a child in respiratory distress. Know the differences that change decisions: airway anatomy, normal rates by age, and how quickly children can decompensate.' },
      { q: 'Does this practice test adapt like the real exam?', a: 'No. Each set here is a fixed draw from one domain, which makes it easy to see your weak areas. The real exam picks each question according to your previous answers, which cannot be reproduced without the NREMT item bank. Use the full timed mock for stamina and these sets for targeted work.' },
      { q: 'What is the best order to study the five domains?', a: 'Start with primary assessment, which carries the most weight and underpins the rest. Then scene size-up, then treatment and transport. Secondary assessment and operations are smaller and quicker to cover, but operations questions on refusal, consent and documentation are easy points that candidates often neglect.' },
    ],
    body: (h) => {
      const x = h.X('emt');
      const rows = x.domains.map((d) => [d.name, (d as { range: string }).range, d.items, h.inPool('emt', d.code)]);
      return `
<h2>The five domains of the EMT exam</h2>
${h.table(['Domain', 'Share of the exam (NREMT)', 'Questions in our 120-question mock', 'Questions in our pool'], rows, `${h.src('nremt_exams', 'NREMT EMR and EMT examinations')}, BLS exam in force since ${h.date(h.R.emt.launched)}.`, ['l', 'r', 'r', 'r'])}
<p>The NREMT gives a range for each domain because an adaptive exam does not show every candidate the same number of questions. Our mock uses the middle of each range, scaled to 120 questions, the longest case.</p>
<h2>What each domain asks</h2>
<p><strong>Scene size-up and safety</strong> covers what happens before you touch the patient: hazards, protective equipment, the mechanism of injury or nature of illness, the number of patients and whether you need more help. <strong>Primary assessment</strong> is the rapid check for life threats: responsiveness, airway, breathing, circulation, major bleeding and the priority of the patient. <strong>Secondary assessment</strong> takes the history (SAMPLE, OPQRST), vital signs and the physical exam. <strong>Patient treatment and transport</strong> covers interventions within EMT scope, medications an EMT may give or assist with, splinting, childbirth, environmental emergencies and reassessment. <strong>Operations</strong> covers consent and refusal, documentation, communication, lifting and moving, and incidents with many patients.</p>
<h2>How the questions are written</h2>
<p>Most NREMT questions present a patient and ask what to do next, or what matters most. Several options are often correct actions; only one is right at that moment. Three habits help:</p>
<ul>
<li><strong>Safety, then life threats.</strong> An unsafe scene comes before any patient care, and an airway problem before a fractured arm.</li>
<li><strong>Treat what you find, in order.</strong> Do not jump to the secondary assessment while a primary problem is unsolved.</li>
<li><strong>Stay within EMT scope.</strong> An answer that requires an advanced skill is wrong for an EMT, however good it would be for a paramedic.</li>
</ul>
<!--tool:quiz|{"exam":"emt","domain":"scene","n":5}-->
<h2>From practice sets to the full exam</h2>
<p>Work domain by domain until each is above the 80% study target in two sets in a row. Wrong answers are saved in this browser and come back on the ${h.a('review-mistakes', 'review page')}. Then take the ${h.a('emt-practice-test', 'full timed EMT mock')}, ${x.items} questions in ${h.time('emt')}, to build stamina: the real exam can run to that length when your ability is close to the passing standard. The ${h.a('nremt-exam', 'exam guide')} explains the adaptive design, the score, the fee and the retake rules.</p>
<p>These questions are written by us from the NREMT domains and the national EMT education level; they are not questions from the real exam. Clinical content here is exam knowledge, not medical advice; follow your protocols and medical direction in the field.</p>`;
    },
  },
});
