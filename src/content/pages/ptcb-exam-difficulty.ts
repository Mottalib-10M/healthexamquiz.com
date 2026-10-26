import { definePage } from '../../lib/guide-types';
import { daysSupply, dilution } from '../../lib/engine/pharm';

export default definePage({
  id: 'ptcb-exam-difficulty',
  group: 'pharm',
  order: 34,
  tool: { kind: 'mini:readiness', props: { e: 1, p: 72 } },
  mini: { kind: 'quiz', props: { exam: 'ptce', domain: 'order', n: 5 } },
  related: ['ptce-practice-exam', 'ptcb-practice-test', 'pharmacy-math', 'top-200-drugs', 'study-plan'],
  sources: ['ptcb_outline', 'ptcb_cpht', 'dea_schedules'],
  en: {
    slug: 'ptcb-exam-difficulty',
    nav: 'How hard is the PTCB exam?',
    card: 'Where PTCE candidates lose points, and a way to judge from your practice rate whether you are ready.',
    title: 'PTCB Exam Difficulty: Where PTCE Candidates Lose Points',
    description: 'PTCB exam difficulty: the parts of the PTCE where candidates lose points, drug names, federal law and calculations, and a forecast from your practice rate.',
    h1: 'How hard is the PTCB exam?',
    intro: 'Type the share of practice questions you get right: the calculator estimates your chance of clearing the study target on a full mock. Below, what makes the PTCE hard.',
    resume: (h) => {
      const x = h.X('ptce');
      return `The PTCE is a broad exam rather than a deep one. Its ${x.items} questions in ${h.time('ptce')} cover four domains, and each asks for a different kind of preparation: medications rely on memorizing names, classes and uses of many drugs; federal requirements on precise rules about controlled substances and restricted programs; patient safety on judgment about errors and what to refer to the pharmacist; order entry on reading prescriptions and doing calculations quickly and without slips. Candidates rarely fail because a single topic is beyond them; they fail because one domain was left thin. The PTCB does not publish a current pass rate on its exam page, so no honest figure can be given here. A better measure of difficulty for you is your own practice: the calculator above turns your share of right answers into an estimated chance of reaching the ${h.pc(x.target)} study target on a full ${x.items}-question mock, a model built on the binomial distribution.`;
    },
    faqs: (h) => [
      { q: 'Is the PTCE harder than the ExCPT?', a: 'They are built differently rather than one being harder. The PTCE gives more weight to medications, while the ExCPT gives the dispensing process the largest share. Candidates who work in retail pharmacy often find the ExCPT familiar; those strong on drug knowledge may prefer the PTCE. Check which one your state board and employer accept before comparing.' },
      { q: 'Which PTCE topics do most candidates find hardest?', a: 'Three come up again and again: the large number of drug names and classes, the details of federal controlled substance rules such as which DEA form serves which purpose, and calculations under time pressure. Each responds to steady practice: flash cards for drugs, a one-page summary of DEA forms and schedules, and daily calculation sets.' },
      { q: 'How long should I study for the PTCB exam?', a: 'It depends on your starting point. Candidates finishing a recognized program often need a few weeks of focused review; those on the work experience pathway may need longer on the domains their job does not cover, often federal law and calculations. Use the practice sets to find gaps and plan from there.' },
      { q: 'Can I pass the PTCE with work experience alone?', a: `Many candidates qualify through ${h.num(h.R.ptce.workHours)} hours of work and pass, but daily work covers the exam unevenly. A retail technician meets order entry and many drug names every day, yet may rarely handle DEA paperwork, hazardous drug rules or compounding beyond-use dates. Target those gaps deliberately.` },
    ],
    body: (h) => {
      const ds = daysSupply(120, 1, 3), dl = dilution(70, 30, 350);
      return `
<h2>Where the points go</h2>
${h.outline('ptce', 'PTCE outline weights; a thin domain costs in proportion to its weight.')}
<p>Medications is the largest domain and the slowest to build, because it rests on memory. Federal requirements is the smallest but the most exact: an option that is nearly right is wrong. Order entry mixes reading skills with calculations.</p>
<h2>Drug knowledge: volume is the difficulty</h2>
<p>The outline expects you to know common drugs by generic and brand name, with their class, main use and key cautions. There is no shortcut around the volume, but there are aids: learning by class, using name stems (the ${h.a('drug-suffixes', 'suffix page')} lists them), and short daily sessions with the ${h.a('top-200-drugs', 'drug cards')} rather than long weekly ones.</p>
<h2>Federal law: precision is the difficulty</h2>
<p>Questions turn on details: which schedule a drug is in (${h.src('dea_schedules', 'DEA schedules')}), which form orders schedule II drugs, which reports a theft, how partial fills and transfers work. Candidates who know the gist but not the detail lose points here. A one-page table of forms and schedules, reviewed every few days, fixes it.</p>
<h2>Calculations: setup is the difficulty</h2>
<p>The arithmetic is simple; the setup is where errors happen. Two examples. A prescription for 120 tablets taken three times a day lasts ${ds} days, since days supply is rounded down. To make 350 mL of a 30% solution from a 70% stock, you need ${h.num(dl?.stock ?? 0)} mL of stock and ${h.num(dl?.diluent ?? 0)} mL of diluent, from C1 × V1 = C2 × V2. Write the formula, put units on every number, then compute. The ${h.a('pharmacy-math', 'pharmacy math page')} has more.</p>
<h2>Judging your own readiness</h2>
<p>Use full mocks rather than short sets to judge readiness, since short sets are drawn from one domain and overstate a balanced level. If your share of right answers on mocks sits a few points above the study target, with no domain far behind, you are in a good position. If it sits below, the calculator above shows how much a few more points of practice rate change the outlook; often the gain from fixing one weak domain is larger than expected.</p>
<p>The ${h.a('ptce-practice-exam', 'full PTCE mock')} and a ${h.a('study-plan', 'study plan')} turn this into a schedule.</p>`;
    },
  },
});
