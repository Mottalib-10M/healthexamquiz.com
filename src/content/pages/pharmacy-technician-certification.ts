import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'pharmacy-technician-certification',
  group: 'pharm',
  order: 38,
  tool: { kind: 'finder', props: { goal: 1 } },
  mini: { kind: 'mini:fees', props: { e: 1 } },
  related: ['pharmacy-technician-exam', 'ptcb-exam', 'ptcb-exam-cost', 'which-certification'],
  sources: ['ptcb_cpht', 'ptcb_guidebook', 'ptcb_renewal', 'nha_handbook', 'bls_occ'],
  demarche: true,
  en: {
    slug: 'pharmacy-technician-certification',
    nav: 'Pharmacy technician certification',
    card: 'How to become a certified pharmacy technician: the two credentials, the routes to them, state rules and renewal.',
    title: 'Pharmacy Technician Certification 2026: Routes and Renewal',
    description: 'Pharmacy technician certification 2026: earning the CPhT through the PTCB or the NHA, training or work routes, state board rules, exam fee and renewal.',
    h1: 'Becoming a certified pharmacy technician',
    intro: 'The finder shows both national exams with their routes, fees and renewal. Below, the path from first job to certificate, and where state law comes in.',
    resume: (h) => `Pharmacy technician certification is a national credential, the CPhT, that tells a state board and an employer that a technician has passed an exam on medications, pharmacy law, safety and dispensing. Two bodies award it: the Pharmacy Technician Certification Board, through the PTCE (${h.usd(h.X('ptce').fee)} per attempt), and the National Healthcareer Association, through the ExCPT. Each sets its own route to eligibility. The PTCB accepts completion of a recognized education or training program, or ${h.num(h.R.ptce.workHours)} hours of work as a technician; the NHA accepts a program finished within five years or ${h.num(h.R.nha.pharmHours)} hours of supervised work within three. Certification is separate from the state: most states require technicians to register with or be licensed by the board of pharmacy, and some of them require national certification as a condition, sometimes within a set time after hire. The CPhT from the PTCB is renewed every ${h.R.ptce.renewYears} years with ${h.R.ptce.renewCE} hours of continuing education and a ${h.usd(h.R.ptce.renewFee)} fee.`,
    faqs: (h) => [
      { q: 'Do I need certification to work as a pharmacy technician?', a: 'It depends on the state and the employer. Some state boards require national certification, sometimes within a period after you start; others require only a state registration or license; a few have almost no requirement. Many employers ask for certification even where the state does not. Your state board of pharmacy publishes the current rule for technicians.' },
      { q: 'Can I get certified while I am still in training?', a: 'On the PTCB route, candidates in a recognized program can apply when they are due to complete it within 60 days. On the NHA route, the program must be completed, or the work hours reached, under the conditions of its handbook. Many students plan the exam for the weeks right after their program ends, while the material is fresh.' },
      { q: 'What does a pharmacy technician earn, and is certification worth it?', a: `Pay and job outlook vary by state and setting; the Bureau of Labor Statistics publishes, in its Occupational Outlook Handbook, current figures. Certification is often a condition of hiring or of moving to tasks such as compounding or hospital work, which is where its value usually shows. This site does not repeat pay figures, which change every year.` },
      { q: 'How long does it take to become a certified pharmacy technician?', a: `On the work route, the time to reach ${h.num(h.R.ptce.workHours)} hours, about three months full time, plus preparation. On the training route, the length of the program, from a few months to a year or more. Then the exam itself, which you can book soon after you are approved.` },
    ],
    body: (h) => `
<h2>The path, in four steps</h2>
<ol>
<li><strong>Check your state.</strong> Read the technician page of your state board of pharmacy: registration, license, age, background check, and whether national certification is required and by when.</li>
<li><strong>Choose a route.</strong> A training program (for the PTCB, one it recognizes) or work experience. On the job, keep a record of your hours and of the supervisor who can attest them.</li>
<li><strong>Choose an exam.</strong> The PTCE or the ExCPT; the ${h.a('pharmacy-technician-exam', 'comparison page')} sets them side by side.</li>
<li><strong>Apply, prepare, pass, renew.</strong> Apply to the certifier, prepare with practice sets and full mocks, sit the exam, and keep up continuing education for renewal.</li>
</ol>
<h2>Certification and state registration are different things</h2>
<p>The PTCB and the NHA certify; the state board registers or licenses. A technician may need both: certification to satisfy the board's condition or the employer, registration to work legally in the state. Each has its own fee and its own renewal date. When you move to another state, the national certification goes with you, but the state registration does not: you apply again in the new state.</p>
<h2>Renewal and continuing education</h2>
<p>The PTCB's CPhT runs for ${h.R.ptce.renewYears} years. Renewal requires ${h.R.ptce.renewCE} hours of continuing education, at least one in pharmacy law and one in patient safety, and the ${h.usd(h.R.ptce.renewFee)} fee (${h.src('ptcb_renewal', 'PTCB renewal requirements')}). The NHA renews its pharmacy credential on a two-year cycle with ${h.R.nha.pharmRenewCE} hours of continuing education. Keep certificates of completion; both certifiers can audit them.</p>
<h2>Beyond the CPhT</h2>
<p>The PTCB also offers advanced credentials and assessment-based certificates for technicians who specialize, for example in sterile compounding. They come after the CPhT and have their own eligibility rules; the ${h.src('ptcb_cpht', 'PTCB site')} lists them. They are outside the scope of this site, which covers the entry-level exams.</p>
<h2>Where to start practicing</h2>
<p>Whichever exam you choose, the knowledge is largely shared. Begin with the ${h.a('pharmacy-tech-practice-test', 'combined practice test')}, then move to the ${h.a('ptcb-practice-test', 'PTCE')} or ${h.a('excpt-practice-test', 'ExCPT')} sets. The ${h.a('ptcb-exam-cost', 'cost page')} and the fee calculator above help plan the budget.</p>
<p>This site is independent of the PTCB, the NHA and the state boards; it handles no application or payment.</p>`,
  },
});
