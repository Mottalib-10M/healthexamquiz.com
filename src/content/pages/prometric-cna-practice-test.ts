import { definePage } from '../../lib/guide-types';

type V = { vendor: string; written: number | null; skills: number | null; oral: number | null; retakeWritten: number | null; retakeSkills: number | null; bundle?: number; bundleOral?: number; format: string };

export default definePage({
  id: 'prometric-cna-practice-test',
  group: 'cna',
  order: 20,
  tool: { kind: 'quiz', props: { exam: 'cna', mode: 'practice', domain: 'adl', n: 10 } },
  mini: { kind: 'mini:pace', props: { e: 0 } },
  related: ['cna-state-exam', 'cna-skills-test', 'cna-written-exam', 'cna-exam-cost', 'cna-practice-test'],
  sources: ['prometric_tx', 'prometric_fl', 'prometric_ny', 'hhsc_natcep', 'fl_bon', 'nys_registry'],
  en: {
    slug: 'prometric-cna-practice-test',
    nav: 'Prometric CNA practice test',
    card: 'Practice for the Prometric nurse aide exam used in Texas, Florida and New York, with each state\'s format, fees and attempts.',
    title: 'Prometric CNA Practice Test 2026: Texas, Florida, New York',
    description: 'Prometric CNA practice test 2026 for Texas, Florida and New York: free daily living questions, the 60-question form, indirect care in the skills part, fees.',
    h1: 'Prometric CNA practice test for Texas, Florida and New York',
    intro: 'Ten questions on activities of daily living to start. Below: how the Prometric nurse aide exam differs from the NNAAP, state by state.',
    resume: (h) => {
      const tx = h.state('tx').vendors[0] as V, fl = h.state('fl').vendors[0] as V, ny = h.state('ny').vendors[0] as V;
      return `Prometric delivers the nurse aide competency exam in Texas, Florida and New York, under contracts with the Texas Health and Human Services Commission, the Florida Board of Nursing and the New York State Department of Health. Its written test is shorter than the NNAAP form used in many other states: 60 questions in 90 minutes according to the Prometric bulletins, offered in English or Spanish in Florida. The skills part scores five items, three assigned tasks plus handwashing and indirect care, the latter covering habits such as privacy, communication and safety observed throughout. On the bulletins read on ${h.read}, a first attempt at both parts costs ${h.usd((tx.written ?? 0) + (tx.skills ?? 0))} in Texas and ${h.usd((fl.written ?? 0) + (fl.skills ?? 0))} in Florida, while New York sells the first attempt as a bundle of ${h.usd(ny.bundle ?? 0)}. Texas allows three attempts at each part within 24 months; Florida requires retraining after three failed attempts. The practice questions here are written by us from nurse aide duties and are not Prometric items.`;
    },
    faqs: (h) => {
      const ny = h.state('ny').vendors[0] as V;
      return [
        { q: 'Why is the Prometric nurse aide exam shorter than the NNAAP?', a: 'Because each state writes its own contract and its own form. Prometric forms for Texas, Florida and New York use 60 questions in 90 minutes, while NNAAP states use a longer form with a two hour limit. The content covers the same nurse aide duties, so practice questions work for both; only your pacing needs adjusting.' },
        { q: 'What does indirect care mean on the Prometric skills test?', a: 'It is a scored item that covers what you do around every task rather than a task itself: knocking, introducing yourself, explaining, protecting privacy, keeping the resident safe, and leaving the call light within reach. Because it runs through all your tasks, one habit you neglect can cost you on each of them. Treat the opening and closing steps as part of every skill.' },
        { q: 'How are New York nurse aide exam fees structured?', a: `New York sells the first attempt as a bundle that covers both parts: ${h.usd(ny.bundle ?? 0)}, or ${h.usd(ny.bundleOral ?? 0)} with the oral version of the knowledge test. Retakes are then priced by part, ${h.usd(ny.retakeWritten ?? 0)} for the written test and ${h.usd(ny.retakeSkills ?? 0)} for the skills. Training programs often handle the registration, so ask yours before paying anything yourself.` },
        { q: 'Can I take the Florida CNA exam in Spanish?', a: 'Yes. The Florida bulletin states that the written test is offered in English or Spanish, and you choose the language when you apply. The skills part is a demonstration, scored on what you do. Texas and New York set their own language options in their bulletins, so check yours if you need a version other than English.' },
      ];
    },
    body: (h) => {
      const st = ['tx', 'fl', 'ny'].map((id) => ({ s: h.state(id), v: h.state(id).vendors[0] as V }));
      const fee = (x: number | null | undefined) => (x == null ? 'bundle' : h.usd(x));
      const rows = st.map(({ s, v }) => [s.name, v.bundle ? `${h.usd(v.bundle)} (both parts)` : fee(v.written), v.bundle ? 'included' : fee(v.skills), `${fee(v.retakeWritten)} / ${fee(v.retakeSkills)}`]);
      return `
<h2>Prometric in three states</h2>
<p>The three Prometric states share a common design but keep their own fees, agencies and attempt rules. The bulletins (${h.src('prometric_tx', 'Texas')}, ${h.src('prometric_fl', 'Florida')}, ${h.src('prometric_ny', 'New York')}) give the following:</p>
${h.table(['State', 'Written', 'Skills', 'Retake written / skills'], rows, `Prometric candidate bulletins, read on ${h.read}.`, ['l', 'r', 'r', 'r'])}
<p>Each state also has its own agency, which keeps the registry and sets the attempt window: ${st.map(({ s }) => `${s.name}, ${s.agency}`).join('; ')}.</p>
<h2>The written test, Prometric style</h2>
<p>In all three states the knowledge test runs 60 questions in 90 minutes, according to the Prometric bulletins. That is about ninety seconds a question, a little tighter than the NNAAP pace; the pacing tool above shows the comparison. The topics are those of any nurse aide program: personal care, safety, infection control, measurements, residents' rights, communication and the aide's role. The ten questions loaded at the top come from activities of daily living, the area most tied to the tasks you also perform in the skills part.</p>
<p>Texas candidates should rely on the Prometric bulletin for the count, 60 questions, rather than older figures found elsewhere. Florida offers the written test in English or Spanish. If reading slows you down, each state offers an oral version; ask for it when you apply.</p>
<h2>The skills part: five scored items</h2>
<p>Where the NNAAP draws five skills, Prometric scores five items of a different kind: three tasks assigned to you, plus handwashing and indirect care as items of their own. In Florida and New York, the bulletins give 31 to 40 minutes for the set, depending on the tasks drawn.</p>
<p>Indirect care is what catches candidates off guard. It is not a task you perform once; it is how you behave during every task. An evaluator scores whether you introduced yourself, explained, gave privacy, kept the resident safe and comfortable, and left the call light within reach. A candidate who rushes from one task to the next without these habits can perform every task step and still lose the indirect care item. Make the opening and closing steps automatic, so they happen even when you are concentrating on the task itself. The ${h.a('cna-skills-test', 'skills test guide')} explains how steps are scored.</p>
<h2>State details worth knowing</h2>
<ul>
<li><strong>Texas.</strong> Three attempts at each part within 24 months, under the ${h.src('hhsc_natcep', 'Texas HHSC nurse aide program')}. Written and skills fees are listed separately, and a retake is charged at the same price as the first attempt.</li>
<li><strong>Florida.</strong> After three failed attempts the candidate must retrain, as section 464.203(2) of the Florida Statutes requires; the ${h.src('fl_bon', 'Florida Board of Nursing')} keeps the registry. Its skills fee is the highest of the three bulletins.</li>
<li><strong>New York.</strong> The first attempt is a bundle, retakes are priced by part, and three attempts at each part are allowed within two years. The ${h.src('nys_registry', 'state registry page')} explains how employers check your listing.</li>
</ul>
<p>The oral version does not change the bill much. In Texas it costs ${h.usd(st[0].v.oral ?? 0)} and in Florida ${h.usd(st[1].v.oral ?? 0)}, the same as the written test in each state, while in New York it raises the first attempt bundle from ${h.usd(st[2].v.bundle ?? 0)} to ${h.usd(st[2].v.bundleOral ?? 0)}. Choose the version that suits your reading, not the cheaper one.</p>
<h2>A practice plan for Prometric candidates</h2>
<ol>
<li>Practise by area with ten-question sets until each is solid.</li>
<li>Take the ${h.a('cna-practice-exam', 'full mock')} on this site at least twice and note the question you reach at the 90 minute mark: you should be past question 60.</li>
<li>Rehearse handwashing until it is perfect; it is scored as an item on its own.</li>
<li>For indirect care, practise each task with a partner who ticks only the opening and closing steps.</li>
<li>Read your state's bulletin once from start to finish, including the test day rules and the list of tasks that can be assigned, so nothing on the day is a surprise. Then compare its task list with the steps you practised in class.</li>
</ol>
<p>This site is independent of Prometric and of the state programs. Questions here are written by us, and fees should always be checked in your state's current bulletin before you pay. For the other vendors, see the ${h.a('cna-state-exam', 'state guide')}.</p>`;
    },
  },
});
