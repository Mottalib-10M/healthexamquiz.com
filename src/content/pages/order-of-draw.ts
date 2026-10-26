import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'order-of-draw',
  group: 'lab',
  order: 62,
  tool: { kind: 'draw' },
  mini: { kind: 'quiz', props: { exam: 'cpt', domain: 'routine', n: 5 } },
  related: ['phlebotomy-practice-test', 'nha-phlebotomy-exam', 'ccma-practice-test', 'cma-practice-test'],
  sources: ['clsi_order', 'nha_cpt_plan', 'nha_ccma_plan', 'aama_outline'],
  en: {
    slug: 'order-of-draw',
    nav: 'Order of draw',
    card: 'Tap the blood tubes in the CLSI order, see why each one comes where it does, then test yourself.',
    title: 'Order of Draw: Tube Colors and Sequence, Practice Drill',
    description: 'Order of draw for blood tubes as CLSI sets it: blood culture, light blue, red and gold, green, lavender, gray. Drill the sequence and learn the reasons.',
    h1: 'Order of draw: drill the tube sequence',
    intro: 'The tubes are shuffled: tap them in the order you would fill them. Each wrong tap tells you which rule you broke.',
    resume: () => 'The order of draw is the sequence in which blood collection tubes are filled during a venipuncture, so that the additive of one tube cannot reach the next and change its results. It is set by the Clinical and Laboratory Standards Institute in its venipuncture standard, GP41, and summarized publicly by CLSI: blood culture bottles or tubes first, then the sodium citrate tube for coagulation tests, then serum tubes with or without clot activator or gel, then heparin tubes, then EDTA tubes, and last the sodium fluoride and potassium oxalate tubes used for glucose. The closures most laboratories use follow the same order: light blue, red or gold, green, lavender or pink, gray. The sequence is tested on the NHA phlebotomy exam, in routine and special collections, and appears again on the medical assistant exams, the CCMA and the CMA (AAMA). The drill above shuffles the six groups; tapping them in order until you make no mistake is the quickest way to make the sequence automatic.',
    faqs: () => [
      { q: 'Why do blood cultures come first in the order of draw?', a: 'Because the culture must stay sterile. Drawing it before any other tube means the needle and the holder have not touched an additive or a stopper that could carry bacteria into the bottle. A contaminated culture can show bacteria that were never in the patient, which leads to repeat draws or unneeded treatment, so the exam treats sterility as the first rule.' },
      { q: 'What happens if EDTA is drawn before a chemistry tube?', a: 'EDTA can be carried over into the next tube on the needle. It binds calcium and the usual EDTA salt contains potassium, so a serum or heparin tube drawn after it can show a falsely low calcium and a falsely high potassium. That is why the lavender tube comes after the serum and heparin tubes in the sequence, and why exam scenarios with odd potassium results often point to this error.' },
      { q: 'Does the order of draw change with a syringe or a butterfly?', a: 'The sequence of the additives stays the same. With a winged collection set, a discard tube is often drawn first when the first tube is a light blue citrate tube, so that the air in the tubing does not leave the citrate tube underfilled. Exam questions on this point ask about the reason, the ratio of blood to citrate, rather than the device.' },
      { q: 'Are tube colors the same in every laboratory?', a: 'The additive decides the order, not the color. Most manufacturers use the same closure colors, but some differ for specialty tubes, and a laboratory may add tubes such as trace element or blood bank tubes with their own place. On the exam, read the additive named in the question; when only a color is given, the common convention applies.' },
    ],
    body: (h) => {
      const rows = [
        ['1', 'Blood culture', 'Bottles or tubes', 'Sterile sample for bacteria and fungi'],
        ['2', 'Sodium citrate', 'Light blue', 'Coagulation tests; the blood to citrate ratio matters'],
        ['3', 'Serum, with or without clot activator or gel', 'Red, gold', 'Chemistry, serology'],
        ['4', 'Heparin, with or without gel', 'Green', 'Chemistry on plasma'],
        ['5', 'EDTA', 'Lavender, pink', 'Complete blood count, blood bank'],
        ['6', 'Sodium fluoride / potassium oxalate', 'Gray', 'Glucose, lactate'],
      ];
      return `
<h2>The sequence and the reason for each place</h2>
${h.table(['Order', 'Tube', 'Usual closure', 'Typical use'], rows, `Order as ${h.src('clsi_order', 'CLSI summarizes standard GP41')}; uses are the common ones taught for the exams.`, ['r', 'l', 'l', 'l'])}
<p>Every step of the order protects a result. The culture goes first for sterility. Citrate goes next because coagulation tests react to the smallest trace of clot activator or heparin. Serum tubes come before heparin because heparin carried into a serum tube would stop it from clotting. EDTA comes late because it binds calcium and adds potassium. Fluoride and oxalate come last because they also change several chemistry results and damage red cells. When you know the reason, you do not need a rhyme: you can rebuild the order from the harm each additive would do to the tube after it.</p>
<h2>How the exams ask about it</h2>
<p>The ${h.src('nha_cpt_plan', 'NHA CPT test plan')} places the order of draw in routine blood collections, the largest domain of the exam, and blood cultures in special collections. The CCMA test plan (archived copy) puts phlebotomy inside clinical patient care, and the ${h.src('aama_outline', 'CMA (AAMA) outline')} lists specimen collection in its clinical competency section. Expect three kinds of questions:</p>
<ul>
<li>direct ones: which tube is filled third, or which tube comes right after the light blue;</li>
<li>error ones: a potassium result is too high and the EDTA tube was drawn first, what went wrong;</li>
<li>scenario ones: an order lists a blood culture, a coagulation panel, a CBC and a glucose, in what order do you fill the tubes.</li>
</ul>
<p>The five questions above come from our routine collections pool; the ${h.a('phlebotomy-practice-test', 'phlebotomy practice test')} covers the other domains.</p>
<h2>Underfilled tubes and mixing</h2>
<p>Two related topics travel with the order of draw. The light blue tube must be filled to its mark, because the test assumes a fixed ratio of blood to citrate; an underfilled tube gives falsely prolonged clotting times and is rejected. Tubes with additives must be mixed by gentle inversion right after filling, never shaken: shaking can break red cells and hemolysis changes potassium and other results. Exam answers that mention shaking a tube "to mix it well" are wrong for that reason.</p>
<h2>A worked scenario</h2>
<p>A requisition asks for blood cultures, a prothrombin time, a basic metabolic panel in a gold gel tube, a CBC and a fasting glucose in a gray tube. You identify the patient with two identifiers, clean the culture bottle tops and the site, and fill in this order: culture bottles, light blue, gold, lavender, gray. There is no heparin tube in this order, so that place is simply skipped; the others keep their relative order. If the order also asked for an ammonia in a green tube, it would go between the gold and the lavender.</p>
<h2>Practice until it is automatic</h2>
<p>Use the drill at the top of the page until you place all six groups with no wrong tap, then shuffle again. A good check is to say the reason for each tube out loud as you tap it. When the sequence feels automatic, move on to the ${h.a('nha-phlebotomy-exam', 'full CPT mock exam')}, where the order of draw appears among questions on safety, patient preparation and processing.</p>`;
    },
  },
});
