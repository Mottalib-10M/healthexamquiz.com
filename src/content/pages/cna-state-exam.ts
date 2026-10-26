import { definePage } from '../../lib/guide-types';
import type { SourceKey } from '../../lib/helpers';

export default definePage({
  id: 'cna-state-exam',
  group: 'cna',
  order: 18,
  tool: { kind: 'states', props: { state: 'ca' } },
  mini: { kind: 'mini:retake', props: { e: 0 } },
  related: ['cna-exam', 'cna-exam-cost', 'prometric-cna-practice-test', 'pearson-vue-cna-practice-test', 'cna-skills-test'],
  sources: ['credentia_testtakers', 'cdph_cna', 'ecfr_483_154', 'hhsc_natcep', 'idph_cna', 'nc_registry'],
  demarche: true,
  en: {
    slug: 'cna-state-exam',
    nav: 'CNA state exam',
    card: 'Which vendor gives the nurse aide exam in your state, in what format, and how many attempts you get in what window.',
    title: 'CNA State Exam 2026: Vendor, Format and Attempts by State',
    description: 'CNA state exam 2026: the testing vendor of each state, the NNAAP states listed by Credentia, format and attempt window in ten states, and moving to a new state.',
    h1: 'The CNA exam, state by state',
    intro: 'Choose your state to see its vendor, fees, format and attempt rule, each with its source. The table below compares ten states at once.',
    resume: (h) => {
      const F = h.R.cnaFederal;
      return `There is no single national CNA exam. Federal rules (42 CFR 483.154) require every state to evaluate nurse aides with a knowledge test and a skills demonstration and to allow at least ${F.minAttempts} attempts, but the state chooses the vendor, the form and the window for those attempts. According to Credentia's test taker pages, the National Nurse Aide Assessment Program is used in Alaska, Alabama, California, Colorado, the District of Columbia, Georgia, Iowa, Maryland, North Carolina, Pennsylvania, Rhode Island, South Carolina, Tennessee, Virginia and Washington, plus several territories. Texas, Florida and New York use Prometric; Ohio and Michigan use D&S Diversified Technologies (Headmaster); Illinois uses Southern Illinois University Carbondale. California is unusual, approving three vendors at once. The attempt window also varies: one year after training in Georgia, 12 months in Illinois, two years in California, Pennsylvania and New York, 24 months in Texas and Michigan. This page compares ten states, each fact linked to the vendor or state page it was read on.`;
    },
    faqs: (h) => [
      { q: 'How do I find out which vendor tests nurse aides in my state?', a: 'Ask your training program first: it registers most candidates and knows the vendor. Otherwise, the state agency that runs the nurse aide registry, usually the health department or the board of nursing, names its vendor on its website. Credentia also lists the states where it delivers the NNAAP. Always download the candidate handbook from the vendor page for your state, not another state.' },
      { q: 'Can I move my CNA certification to another state?', a: 'Usually, through the new state\'s registry rather than a new exam. Most states accept an aide who is active and in good standing on another state\'s registry, a process often called reciprocity or endorsement, and some add their own conditions such as a background check or proof of recent work. Contact the registry of the state you are moving to before you leave.' },
      { q: 'Why does California have three CNA testing vendors?', a: 'The California Department of Public Health approves more than one vendor, so programs and candidates can test with Credentia, with Headmaster or with the Regional Testing Center at Golden West College. Their formats differ: question count, time and the number of skill tasks are not the same. Find out which one your program uses before you practise for a specific format.' },
      { q: 'What does the attempt window mean in my state?', a: `It is the period, counted from the end of your training, within which you must pass. Federal rules require at least ${h.R.cnaFederal.minAttempts} attempts, and states add a deadline: a year in Georgia, two years in North Carolina unless three attempts come first. When the window closes or the attempts run out, you must retrain before testing again.` },
    ],
    body: (h) => {
      const rows = h.P.cnaStates.map((s) => [
        h.src(s.stateSource as SourceKey, s.name),
        s.vendors.map((v) => v.vendor.replace('D&S Diversified Technologies ', '')).join('; '),
        s.attempts,
      ]);
      const fmt = (id: string, i = 0) => h.state(id).vendors[i].format;
      return `
<h2>Ten states compared</h2>
<p>Each state name links to the state agency or registry page; vendor fees and formats come from the vendor's own handbook or fee page.</p>
${h.table(['State', 'Vendor', 'Attempt rule'], rows, `Read on ${h.read}. Fees for each state are compared on the cost page.`, ['l', 'l', 'l'])}
<p>Three groups emerge. The NNAAP states share one format and one outline. The Prometric states use shorter written forms and score indirect care. The Headmaster states use their own lists of tasks and their own passing percentages. Illinois stands apart with a university run program.</p>
<h2>The NNAAP group</h2>
<p>The NNAAP was built by the National Council of State Boards of Nursing and is now owned by Credentia, which lists its states on its ${h.src('credentia_testtakers', 'test taker pages')}. In Pennsylvania, Georgia and North Carolina, for example, the format reads: ${fmt('pa')}. Because the form is the same, an NNAAP candidate in Georgia and one in Pennsylvania prepare for the same outline. What differs is the fee, the registry and the attempt window: North Carolina's runs within two years of training or until three attempts are used, whichever comes first (${h.src('nc_registry', 'North Carolina registry')}).</p>
<h2>Prometric, Headmaster and the rest</h2>
<p>Texas, Florida and New York test with Prometric. The written form there is shorter, and the skills part scores five items, three tasks plus handwashing and indirect care. Texas sets three attempts at each part within 24 months (${h.src('hhsc_natcep', 'Texas HHSC')}). The ${h.a('prometric-cna-practice-test', 'Prometric page')} covers these three states in detail.</p>
<p>Headmaster forms vary by state. Ohio: ${fmt('oh')}. Michigan: ${fmt('mi')}.</p>
<p>Illinois tests through Southern Illinois University Carbondale: ${fmt('il').charAt(0).toLowerCase() + fmt('il').slice(1)}. The state program allows three attempts within 12 months of completing the training (${h.src('idph_cna', 'Illinois Department of Public Health')}), the shortest window in our table.</p>
<h2>California, the three-vendor state</h2>
<p>The ${h.src('cdph_cna', 'California Department of Public Health')} approves three vendors. Your training program usually decides which one you take, and the formats are not the same:</p>
<ul>
<li><strong>Credentia:</strong> ${fmt('ca', 0)}.</li>
<li><strong>Headmaster:</strong> ${fmt('ca', 1)}.</li>
<li><strong>Regional Testing Center:</strong> ${fmt('ca', 2)}.</li>
</ul>
<p>All three allow three attempts within two years of completing training. Practise on the format of the vendor your program uses; the content overlaps almost entirely.</p>
<h2>Attempts, and what happens after the last one</h2>
<p>The federal floor is ${h.R.cnaFederal.minAttempts} opportunities (${h.src('ecfr_483_154', '42 CFR 483.154')}). States then add a deadline counted from the end of training, and some count attempts per part. When the attempts or the window run out, the usual path is to complete a new approved training program before testing again; Florida writes this into its statutes. The retake tool above shows where you stand after a failed attempt.</p>
<h2>Moving between states</h2>
<p>If you are already on a registry and move, you normally apply to the new state's registry rather than test again, as long as your listing is active and in good standing. Each state sets its own conditions, and some may ask you to test if your work history has a gap: federal rules require new training or a new evaluation after ${h.R.cnaFederal.lapseMonths} consecutive months without paid nursing work. If you are still in training, plan to test in the state where your program is approved. For the steps of the exam itself, read the ${h.a('cna-exam', 'exam guide')}; for prices, the ${h.a('cna-exam-cost', 'cost page')}.</p>`;
    },
  },
});
