import { definePage } from '../../lib/guide-types';
import ST from '../../data/stems.json';

type D = { generic: string; brand: string; epc: string[]; use: string };
const hit = (stem: string, g: string) => stem.split('/').map((p) => p.trim()).some((p) => {
  const core = p.replace(/-/g, '');
  return p.startsWith('-') ? g.split(' ')[0].endsWith(core) : p.endsWith('-') ? g.startsWith(core) : false;
});
const fits = (match: string, d: D) => !match || d.epc.some((e) => e.toLowerCase().includes(match.toLowerCase()));

export default definePage({
  id: 'drug-suffixes',
  group: 'pharm',
  order: 41,
  tool: { kind: 'drugs', props: { mode: 'suffix' } },
  mini: { kind: 'quiz', props: { exam: 'ptce', domain: 'safe', n: 5 } },
  related: ['top-200-drugs', 'top-200-drugs-quiz', 'ptcb-practice-test', 'pharmacy-tech-practice-test'],
  sources: ['rxnorm', 'dailymed', 'ptcb_outline'],
  en: {
    slug: 'drug-suffixes',
    nav: 'Drug suffixes',
    card: 'Name stems such as -olol, -pril and -sartan, the class each one signals, and the look-alike names that break the rule.',
    title: 'Drug Suffixes: Name Stems, Drug Classes and Look-Alikes',
    description: 'Drug suffixes for pharmacy technicians: what -olol, -pril, -sartan, -prazole and twenty more stems signal, with drugs from our list and their look-alikes.',
    h1: 'Drug suffixes and the classes they signal',
    intro: 'Choose a name stem: the tool shows the class it signals, the drugs of the top 200 list that carry it, and any name that ends the same way but belongs elsewhere.',
    resume: (h) => `Generic drug names in the United States are not random. Most are built by the United States Adopted Names Council, run with the American Medical Association, from a stem that signals how the drug works: a name ending in -olol is a beta blocker, -pril an ACE inhibitor, -sartan an angiotensin receptor blocker, -prazole a proton pump inhibitor. Learning about ${ST.stems.length} common stems turns hundreds of names into a handful of families, which is why stems are the fastest route through the medications domain of the pharmacy technician exams. The rule has limits. Older drugs were named before stems were set, some stems are shared by two classes, and a few names end like a stem by chance: aripiprazole ends in -prazole but is an antipsychotic, and nystatin sounds like a statin but treats fungal infections. The tool above lists, for each stem, the drugs of our list of ${h.drugs.length} that carry it, checked against their FDA class, and flags the look-alikes.`,
    faqs: () => [
      { q: 'Who decides drug name stems?', a: 'In the United States, generic names are adopted by the USAN Council, which the American Medical Association runs with the United States Pharmacopeia and the American Pharmacists Association. The council keeps a list of approved stems and works with the World Health Organization, so most stems are the same in international names. A stem describes a group of drugs, usually by mechanism.' },
      { q: 'Can I always trust a suffix to give the class?', a: 'Not always. A stem is a strong hint, not a guarantee: names coined before the stem system, brand-like names and chance endings break the pattern. On an exam, a suffix helps you eliminate options quickly, but check that the use fits too. When a name ends like a stem and the use does not match, you have probably found a look-alike.' },
      { q: 'Are look-alike names really tested?', a: 'Yes. Patient safety is a full domain of the PTCE and part of the safety domain of the ExCPT, and look-alike, sound-alike names are one of its main topics: hydroxyzine and hydralazine, clonidine and clonazepam. Questions ask how to prevent mix-ups, for example with tall man lettering on shelves and screens, or by checking the use on the prescription.' },
      { q: 'What is tall man lettering?', a: 'It is a way of writing look-alike names with the differing letters in capitals, such as hydrOXYzine and hydrALAZINE, so the eye catches the difference on a label, a shelf tag or a computer screen. The FDA and the Institute for Safe Medication Practices publish lists of name pairs for which they recommend it.' },
    ],
    body: (h) => {
      const D = h.drugs as D[];
      const rows = ST.stems.map((s) => {
        const ok = D.filter((d) => hit(s.stem, d.generic) && fits(s.match, d));
        return [`<strong>${s.stem}</strong>`, s.cls, ok.length ? ok.slice(0, 4).map((d) => d.generic).join(', ') : '–'];
      });
      const traps = ST.stems.flatMap((s) => D.filter((d) => hit(s.stem, d.generic) && !fits(s.match, d)).map((d) => [d.generic, s.stem, s.cls, d.epc[0] ?? d.use]));
      return `
<h2>The stems in our list</h2>
${h.table(['Stem', 'Class it signals', 'Examples from the top 200'], rows, `Examples checked against the FDA class in ${h.src('dailymed', 'DailyMed')} labels, through ${h.src('rxnorm', 'RxClass')}.`, ['l', 'l', 'l'])}
<p>Some families are large: four statins, four ACE inhibitors, four angiotensin receptor blockers and four proton pump inhibitors appear in the list. Learning the stem first and the members second halves the effort for those decks.</p>
<h2>Names that end like a stem but belong elsewhere</h2>
${traps.length ? h.table(['Drug', 'Ends like', 'Which signals', 'Its actual FDA class'], traps, 'Found automatically in our list: the name carries the stem, the FDA class does not match.', ['l', 'l', 'l', 'l']) : ''}
<p>Two classic traps need no table. Nystatin ends in -statin but is an antifungal, which is why our stem for the cholesterol drugs is -vastatin. And -vir alone only says "antiviral": valacyclovir works on herpes viruses, oseltamivir on influenza. When a stem is broad, the use on the prescription settles it.</p>
<h2>Look-alike, sound-alike names</h2>
<p>Stems also explain why some names are easy to confuse: they share most of their letters. The safety domain of the ${h.src('ptcb_outline', 'PTCE outline')} lists look-alike, sound-alike medications, high-alert drugs and error prevention strategies. Typical exam pairs mix two classes, such as hydroxyzine (an antihistamine) and hydralazine (a blood pressure drug), or clonidine and clonazepam. Tall man lettering, separate shelf locations and a check of the use on the prescription are the usual answers to how such errors are prevented.</p>
<h2>Using stems in practice</h2>
<ol>
<li>Learn the ten largest families first: -olol, -pril, -sartan, -vastatin, -prazole, -dipine, the benzodiazepines, the corticosteroids, -floxacin and -cillin.</li>
<li>For each, recall one member, its brand and its use, using the ${h.a('top-200-drugs', 'flash cards')}.</li>
<li>Test with the ${h.a('top-200-drugs-quiz', 'drug quiz')}: class questions are where stems pay off.</li>
</ol>
<p>The five questions under the tool come from our pool for the patient safety domain of the PTCE.</p>`;
    },
  },
});
