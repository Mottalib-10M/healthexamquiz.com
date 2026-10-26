import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'top-200-drugs-quiz',
  group: 'pharm',
  order: 40,
  tool: { kind: 'drugs', props: { mode: 'quiz' } },
  mini: { kind: 'quiz', props: { exam: 'excpt', domain: 'drugs', n: 5 } },
  related: ['top-200-drugs', 'drug-suffixes', 'excpt-practice-test', 'ptcb-practice-test'],
  sources: ['rxnorm', 'dailymed', 'nha_excpt_plan'],
  en: {
    slug: 'top-200-drugs-quiz',
    nav: 'Top 200 drugs quiz',
    card: 'Ten random questions on 200 common drugs: brand of a generic, generic of a brand, class of a generic.',
    title: 'Top 200 Drugs Quiz: Brand, Generic and Class Questions',
    description: 'Top 200 drugs quiz: ten random questions at a time on brand and generic names and FDA classes of common drugs, corrected at once, with a new set a click away.',
    h1: 'Top 200 drugs quiz',
    intro: 'Ten questions drawn at random from the list, each with four options. Your answer is marked at once; a new set of ten is one click away.',
    resume: (h) => `This drug quiz tests the three links a pharmacy technician exam asks about most: the brand name of a generic, the generic name behind a brand, and the class a generic belongs to. Each set draws ten questions at random from our list of ${h.drugs.length} commonly dispensed drugs, so no two sets are alike, and the wrong options come from the same list, which makes them plausible rather than absurd. Brand names are those listed for each generic in RxNorm, the drug vocabulary of the US National Library of Medicine, and classes are the FDA Established Pharmacologic Classes printed on DailyMed labels; both sources are public domain. The quiz is a recall drill: the PTCE and the ExCPT also ask about uses, side effects and cautions, which the five exam-style questions under it cover for the drugs and drug therapy domain of the ExCPT. A good benchmark is three sets in a row at nine or ten right before you consider a deck learned.`,
    faqs: () => [
      { q: 'Are the drug quiz questions like those on the real exam?', a: 'They are simpler. The real exams ask for names and classes, but also wrap them in scenarios: a look-alike name on a prescription, a drug that needs an auxiliary label, a class with a known interaction. This quiz builds the recall that those questions rely on; the exam-style questions under it practice the scenarios.' },
      { q: 'Why does the quiz show a class I have never heard of?', a: 'The classes are the official FDA names, which are more technical than the ones in textbooks. Proton pump inhibitor is the same in both, but a textbook calls the statins statins while the FDA class reads HMG-CoA reductase inhibitor. Learn both forms: exam writers use either one.' },
      { q: 'How can I keep track of the drugs I miss?', a: 'Write down each drug you miss and look for a pattern: a deck, a class or a name ending. Then go back to the flash cards for that deck before the next set. The quiz keeps no record, by design, so that nothing you do leaves your browser; a paper list does the job well.' },
    ],
    body: (h) => {
      const withBrand = h.drugs.filter((d) => d.brand).length;
      const withClass = h.drugs.filter((d) => d.epc.length).length;
      const classes = new Set(h.drugs.flatMap((d) => d.epc)).size;
      return `
<h2>How each set is built</h2>
${h.table(['Question type', 'Drawn from', 'What it trains'], [['Brand of a generic', `${withBrand} drugs with a brand listed`, 'Reading a prescription written by brand'], ['Generic of a brand', `${withBrand} drugs with a brand listed`, 'Finding the product on the shelf'], ['Class of a generic', `${withClass} drugs with an FDA class, ${classes} classes in all`, 'Uses, cautions and look-alike names']], `Counts from our list, built with ${h.src('rxnorm', 'RxNorm')} and ${h.src('dailymed', 'DailyMed')} classes.`, ['l', 'l', 'l'])}
<p>Drugs without a brand listed, or without an FDA class in their labels, are left out of the question types that need one. That is why the counts differ.</p>
<h2>Reading the options</h2>
<p>The wrong options are real drugs from the same list. For class questions they are often from neighboring classes: a beta blocker against a calcium channel blocker, a statin against another lipid drug. Before choosing, recall the class from the name stem if it has one, then check the use. When two options look alike, as with hydroxyzine and hydralazine, slow down: those pairs are exactly what the safety domain of both exams tests.</p>
<h2>From recall to exam questions</h2>
<p>The ${h.src('nha_excpt_plan', 'ExCPT test plan')} asks about drugs in context: their class, their use, common side effects, and the advice the pharmacist gives. Once the quiz is easy, move to the exam-style questions under it, then to full practice on the ${h.a('excpt-practice-test', 'ExCPT')} or the ${h.a('ptcb-practice-test', 'PTCE')}. To learn the names first, use the ${h.a('top-200-drugs', 'flash cards')}; to use name endings as a shortcut, the ${h.a('drug-suffixes', 'suffix page')}.</p>
<p>The quiz is a memory drill for exam practice, not a guide to using any medicine.</p>`;
    },
  },
});
