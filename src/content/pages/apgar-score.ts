import { definePage } from '../../lib/guide-types';
import { apgar } from '../../lib/engine/scores';

export default definePage({
  id: 'apgar-score',
  group: 'emt',
  order: 74,
  tool: { kind: 'mini:apgar' },
  mini: { kind: 'quiz', props: { exam: 'emt', domain: 'treat', n: 5 } },
  related: ['nremt-practice-test', 'emt-exam-questions', 'ekg-heart-rate', 'ccma-practice-test'],
  sources: ['medline_apgar', 'nremt_exams', 'medline_pulse'],
  en: {
    slug: 'apgar-score',
    nav: 'Apgar score',
    card: 'Score the five Apgar signs and see how newborn care questions are asked on the EMT exam.',
    title: 'Apgar Score Calculator and EMT Exam Newborn Care Questions',
    description: 'Apgar score calculator for exam practice: rate appearance, pulse, grimace, activity and respiration from 0 to 2, read the total, train on newborn questions.',
    h1: 'Apgar score: the five signs, scored',
    intro: 'Rate each sign 0, 1 or 2 and read the total out of 10, with the band MedlinePlus gives. A study aid for exam questions.',
    resume: (h) => `The Apgar score is a quick rating of a newborn's condition right after birth, given at one minute and again at five minutes. Five signs are each scored 0, 1 or 2: appearance (skin color), pulse (heart rate), grimace (reflex response), activity (muscle tone) and respiration (breathing effort), for a total out of 10. MedlinePlus describes a score of ${h.P.apgar.normalMin} or more as normal and a lower score as a sign that the baby needs more help or monitoring. EMTs meet it in childbirth and newborn care, part of patient treatment and transport on the NREMT exam, and medical assistants may meet it in obstetric content. Exam questions rarely ask only for the total: they ask what a given score means for the next step, or which sign drives the low score. The most important point for an EMT is that resuscitation of a newborn who is not breathing well starts at once and does not wait for the one-minute score. The calculator above adds the five signs as MedlinePlus defines them.`,
    faqs: (h) => [
      { q: 'What does each Apgar sign score 0, 1 or 2 for?', a: 'Appearance: blue or pale all over scores 0, blue hands and feet 1, pink all over 2. Pulse: absent 0, below 100 beats a minute 1, at least 100 scores 2. Grimace: no response 0, a grimace 1, a cry or active pull away 2. Activity: limp 0, some flexion 1, active motion 2. Respiration: absent 0, slow or irregular 1, a good cry 2.' },
      { q: 'Does an EMT wait for the one-minute Apgar before helping a newborn?', a: 'No. The score is a record of how the baby is doing, not a trigger. A newborn who is not breathing, or breathing poorly, needs drying, warming, stimulation, airway positioning and ventilation if required, started at once. The one and five minute scores are noted as care goes on, and reported to the receiving facility.' },
      { q: 'Why is the Apgar score taken again at five minutes?', a: `Because the change tells more than one number. A baby who scores low at one minute and ${h.P.apgar.normalMin} or more at five has responded to care or adapted on its own. A score that stays low calls for continued support and close monitoring. MedlinePlus notes that the score is not meant to predict the child's long term health.` },
    ],
    body: (h) => {
      const ex = [[1, 2, 2, 1, 2], [0, 1, 1, 1, 1], [2, 2, 2, 2, 2]];
      const rows = ex.map((v) => [v.join(', '), `${apgar(v)} of 10`]);
      return `
<h2>The five signs</h2>
${h.table(['Sign', 'Scores 0', 'Scores 1', 'Scores 2'], [['Appearance (color)', 'Blue or pale all over', 'Body pink, hands and feet blue', 'Pink all over'], ['Pulse', 'Absent', 'Below 100 a minute', '100 a minute or more'], ['Grimace (reflex)', 'No response', 'Grimace', 'Cry, cough or pulls away'], ['Activity (tone)', 'Limp', 'Some flexion', 'Active motion'], ['Respiration', 'Absent', 'Slow, irregular, weak cry', 'Good, strong cry']], `Signs as ${h.src('medline_apgar', 'MedlinePlus')} describes them.`, ['l', 'l', 'l', 'l'])}
<p>The name works as a memory aid: <strong>A</strong>ppearance, <strong>P</strong>ulse, <strong>G</strong>rimace, <strong>A</strong>ctivity, <strong>R</strong>espiration. On the exam, translate each description in the stem to its score before adding.</p>
<h2>Worked examples</h2>
${h.table(['Scores (A, P, G, A, R)', 'Total'], rows, 'Computed with the calculator on this page.', ['l', 'r'])}
<p>The first case is a very common one: a baby with blue hands and feet and some flexion, otherwise well, scores ${apgar(ex[0])}. It is within the normal range, and blue extremities in the first minutes are common. The second case, a slow heart rate and weak breathing, calls for immediate help regardless of the exact total.</p>
<h2>Where it sits on the EMT exam</h2>
<p>Childbirth and newborn care belong to patient treatment and transport, one of the five domains of the ${h.src('nremt_exams', 'NREMT EMT exam')}. Questions around the Apgar score typically test:</p>
<ul>
<li>the timing, one and five minutes after birth;</li>
<li>the first steps of newborn care: drying, warming, positioning the airway, stimulating, and suctioning only when needed;</li>
<li>when to ventilate: absent or poor breathing, or a heart rate below 100 a minute after the first steps;</li>
<li>keeping the newborn warm during transport, since newborns lose heat quickly.</li>
</ul>
<p>The five questions above come from our treatment and transport pool. More childbirth, newborn and pediatric questions are in the ${h.a('nremt-practice-test', 'NREMT practice test')} and the ${h.a('emt-exam-questions', 'question bank')}.</p>
<h2>A note on newborn heart rate</h2>
<p>The threshold of 100 beats a minute in the Apgar pulse sign is specific to newborns. It is not the adult range: for adults at rest, ${h.src('medline_pulse', 'MedlinePlus')} gives ${h.P.ekg.adultRestMin} to ${h.P.ekg.adultRestMax} beats a minute. Exam questions sometimes place the two side by side to check that you do not apply adult values to an infant.</p>
<p>This calculator is a study aid for exam questions. It is not a clinical tool, and real newborn care follows your protocols and medical direction.</p>`;
    },
  },
});
