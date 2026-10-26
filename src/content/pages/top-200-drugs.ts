import { definePage } from '../../lib/guide-types';

const PICK = ['atorvastatin', 'lisinopril', 'metformin', 'amlodipine', 'metoprolol', 'omeprazole', 'losartan', 'sertraline', 'montelukast', 'furosemide', 'clopidogrel', 'warfarin', 'alprazolam', 'tamsulosin'];

export default definePage({
  id: 'top-200-drugs',
  group: 'pharm',
  order: 39,
  tool: { kind: 'drugs', props: { mode: 'cards' } },
  mini: { kind: 'quiz', props: { exam: 'ptce', domain: 'med', n: 5 } },
  related: ['top-200-drugs-quiz', 'drug-suffixes', 'ptcb-practice-test', 'excpt-practice-test'],
  sources: ['rxnorm', 'dailymed', 'ptcb_outline', 'nha_excpt_plan'],
  en: {
    slug: 'top-200-drugs',
    nav: 'Top 200 drugs',
    card: 'Flash cards for 200 commonly dispensed drugs: generic, brand, FDA class and use, in decks by body system.',
    title: 'Top 200 Drugs Flash Cards: Generic, Brand, Class and Use',
    description: 'Top 200 drugs flash cards for pharmacy technicians: generic and brand names, FDA class and common use, in decks by body system, names checked in RxNorm.',
    h1: 'Top 200 drugs: flash cards by body system',
    intro: 'Choose a deck, read the generic name, try to recall the brand, class and use, then turn the card. Nothing you do here leaves this browser.',
    resume: (h) => `The "top 200 drugs" is the list of medicines a pharmacy technician meets most often at the counter, and knowing them is the core of the medications domain of both national exams: the PTCE outline asks for generic and brand names, therapeutic classes and indications, and the ExCPT test plan has a domain on drugs and drug therapy. There is no official top 200: each list is a selection of commonly dispensed outpatient drugs. Ours has ${h.drugs.length} generics chosen by us, grouped into decks by body system, from heart and blood pressure to mental health and infections. For each generic, the brand name shown is one that the US National Library of Medicine's RxNorm database lists for it, and the class is the FDA Established Pharmacologic Class found in DailyMed labels through RxClass, both public domain and read on ${h.read}. The common use is written by us in a few words. The cards train recall; the quiz below them and the separate drug quiz test it.`,
    faqs: () => [
      { q: 'Is there an official top 200 drugs list for the PTCB exam?', a: 'No. Neither the PTCB nor the NHA publishes a list of drugs to learn. Their outlines name the kinds of knowledge tested, such as names, classes, indications and side effects, and the exam draws on commonly used medicines. Lists called top 200 are selections based on prescription volume; ours is one such selection, built for practice.' },
      { q: 'Should I learn brand names or generic names first?', a: 'Start from the generic name and its class, since the class tells you the use and the main cautions for several drugs at once. Then attach the brand name. Exam items go both ways, brand to generic and generic to brand, so once a deck feels easy, test yourself in the other direction with the quiz.' },
      { q: 'Why do some cards show no brand name?', a: 'For a few generics, such as amoxicillin or albuterol, the brand we would have shown is no longer listed in RxNorm, often because it left the market while the generic remained. Rather than print a name we could not check against the database, the card leaves the brand out. Those drugs are mostly dispensed as generics anyway.' },
      { q: 'How many drugs a day should I learn?', a: 'Small daily sets work better than long sessions. Ten to fifteen new cards a day, plus a quick pass over the ones already seen, covers the whole list in a few weeks. Decks by body system help, because drugs in the same deck often share a class and a name stem.' },
    ],
    body: (h) => {
      const rows = PICK.map((g) => h.drugs.find((d) => d.generic === g)!).map((d) => [d.generic, d.brand || '–', d.epc[0] ?? '–', d.use]);
      const decks = [...new Set(h.drugs.map((d) => d.area))].map((a) => [a, h.drugs.filter((d) => d.area === a).length] as [string, number]).sort((x, y) => y[1] - x[1]);
      return `
<h2>Fourteen drugs you will see again and again</h2>
${h.table(['Generic', 'Brand', 'FDA class', 'Common use'], rows, `Names from ${h.src('rxnorm', 'RxNorm')}, classes from FDA labels in ${h.src('dailymed', 'DailyMed')}; use written by us.`, ['l', 'l', 'l', 'l'])}
<p>These come from the most crowded decks: blood pressure, cholesterol, diabetes, stomach acid and mood. Several share a class, and the class often shows in the name: the statins end in -vastatin, the ACE inhibitors in -pril, the angiotensin receptor blockers in -sartan. The ${h.a('drug-suffixes', 'drug suffix page')} works on those stems.</p>
<h2>The decks</h2>
${h.table(['Deck', 'Drugs'], decks, 'Our grouping, by the common use of each drug.', ['l', 'r'])}
<p>Mental health and heart drugs make up about a third of the list, which matches what technicians fill most often. Start with them, then move to the smaller decks.</p>
<h2>A method that works</h2>
<ol>
<li><strong>One deck at a time.</strong> Choose a deck in the menu and go through it once just reading.</li>
<li><strong>Recall before you turn.</strong> On the second pass, say the brand, class and use aloud before turning the card.</li>
<li><strong>Group by class.</strong> When two drugs share a class, learn them together: what one does, the other does too.</li>
<li><strong>Test the other way.</strong> Once a deck is easy, use the ${h.a('top-200-drugs-quiz', 'drug quiz')}, which also asks generic from brand.</li>
</ol>
<h2>What the exams ask about drugs</h2>
<p>The ${h.src('ptcb_outline', 'PTCE outline')} puts generic and brand names, classes and indications in its medications domain, along with side effects, interactions, narrow therapeutic index drugs and storage. The ${h.src('nha_excpt_plan', 'ExCPT test plan')} covers drugs and drug therapy in a smaller domain. The five questions under the cards come from our pool for the medications domain of the PTCE.</p>
<p>The cards are a memory aid for exam practice. They are not a reference for treating anyone: the FDA label in DailyMed and the pharmacist remain the sources for a real prescription.</p>`;
    },
  },
});
