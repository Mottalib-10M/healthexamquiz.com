import { definePage } from '../../lib/guide-types';
import { EXAM_IDS } from '../../lib/engine/exam';

export default definePage({
  id: 'which-certification',
  group: 'plan',
  order: 80,
  tool: { kind: 'finder', props: { goal: 0 } },
  mini: { kind: 'mini:fees', props: { e: 1 } },
  related: ['exam-fees-retakes', 'pharmacy-technician-certification', 'medical-assistant-practice-test', 'cna-exam', 'nremt-exam'],
  sources: ['ecfr_483_152', 'ptcb_guidebook', 'aama_elig', 'nremt_fee', 'nha_handbook', 'bls_occ'],
  demarche: true,
  en: {
    slug: 'which-certification',
    nav: 'Which certification?',
    card: 'From the job you want to the exam it needs: certifier, route to eligibility, official fee and renewal.',
    title: 'Which Healthcare Certification Is Right for You? 8 Exams',
    description: 'Which healthcare certification fits the job you want: CNA, pharmacy technician, medical assistant, phlebotomy, EKG or EMT, with exam, route, fee, renewal.',
    h1: 'Which health care certification do you need?',
    intro: 'Pick the job you are aiming at. The finder shows the exam behind it, who runs it, how you become eligible, the official fee and how often it is renewed.',
    resume: (h) => {
      const X = h.X;
      return `Eight exams cover most entry-level clinical support jobs in the United States, and each belongs to a different body. Nurse aides who work in nursing homes funded by Medicare or Medicaid must pass a state competency evaluation after at least ${h.R.cnaFederal.trainingHours} hours of approved training. Pharmacy technicians take the PTCE of the PTCB (${h.usd(X('ptce').fee)}) or the ExCPT of the NHA, and their state board of pharmacy decides which credential, if any, it requires. Medical assistants choose between the CCMA of the NHA, open to graduates of a training program or to experienced workers, and the CMA (AAMA), which in most cases requires an accredited program and costs ${h.usd(X('cma').fee)} for members. Phlebotomy and EKG technicians usually take the NHA's CPT and CET. EMTs pass the NREMT cognitive exam (${h.usd(X('emt').fee)} an attempt) and a state skills exam, then apply for a state license. Fees above were read on the certifiers' pages on ${h.read}; the NHA does not publish its fees on a public page.`;
    },
    faqs: (h) => [
      { q: 'Which certification is required by law and which only by employers?', a: 'The nurse aide competency evaluation is required by federal law for aides in nursing homes funded by Medicare or Medicaid, and EMTs need a state license. Pharmacy technician rules depend on the state board of pharmacy. For medical assistants, phlebotomists in most states and EKG technicians, certification is usually an employer requirement rather than a legal one.' },
      { q: 'Can I hold more than one of these certifications?', a: 'Yes, and it is common. Medical assistants often add phlebotomy or EKG, and the topics overlap: venipuncture and the order of draw appear on the CPT, the CCMA and the CMA, and lead placement on the CET and the medical assistant exams. Each credential has its own renewal cycle and continuing education, which you then need to track separately.' },
      { q: 'Which of these exams can I take without a training program?', a: `Several accept work experience instead. The PTCE accepts ${h.num(h.R.ptce.workHours)} hours of pharmacy technician work; the NHA exams accept supervised work experience, one year in the last three; the CNA and EMT routes require a state-approved course. The CMA (AAMA) mostly requires an accredited program. The finder shows the route for each.` },
      { q: 'Where can I find job outlook and pay figures for these jobs?', a: `The Occupational Outlook Handbook of the Bureau of Labor Statistics publishes pay, growth and the usual path into each of these occupations. This site does not repeat those figures, because they are revised every year and differ widely by state and setting; read them at the source.` },
    ],
    body: (h) => {
      const label: Record<string, string> = { cna: 'Nurse aide', ptce: 'Pharmacy technician', excpt: 'Pharmacy technician', ccma: 'Medical assistant', cma: 'Medical assistant', cpt: 'Phlebotomy technician', cet: 'EKG technician', emt: 'EMT' };
      const rows = EXAM_IDS.map((e) => { const x = h.X(e); return [label[e], x.label, x.owner, e === 'cna' ? 'Set by the state' : x.fee ? h.usd(x.fee) : 'Not published']; });
      return `
<h2>The eight exams at a glance</h2>
${h.table(['Job', 'Exam', 'Run by', 'Fee'], rows, `Fees read on the certifiers' pages on ${h.read}. NHA fees are shown in your account when you register.`, ['l', 'l', 'l', 'r'])}
<h2>Questions to ask before choosing</h2>
<h3>What does my state require?</h3>
<p>Start with the law where you will work. Nurse aides follow federal rules for nursing homes (${h.src('ecfr_483_152', '42 CFR 483.152')}) and the state registry rules on top. Pharmacy technicians depend on the state board of pharmacy: some require national certification, some only registration. EMTs need the state license, for which most states use the NREMT exam. A few states license phlebotomists themselves. For medical assistants, the scope of tasks such as injections is set by state law and often by the supervising provider.</p>
<h3>What do employers near me ask for?</h3>
<p>Where the law is silent, job postings decide. Read a dozen postings for the job in your area and note which credential they name. Medical assistant postings often accept the CCMA or the CMA; some hospitals name only one. Pharmacy postings usually say "CPhT", which either the PTCE or the ExCPT can give you.</p>
<h3>Which route can I take?</h3>
<p>Each certifier has its own route to eligibility. The ${h.src('ptcb_guidebook', 'PTCB guidebook')} accepts a recognized program or ${h.num(h.R.ptce.workHours)} hours of work. The ${h.src('aama_elig', 'AAMA')} asks, in most cases, for a CAAHEP or ABHES accredited medical assisting program. The NHA candidate handbook (archived copy) accepts a training program or supervised work experience for its four exams, with documented draws or tracings for the CPT and the CET. The NREMT requires a state-approved EMT course finished within ${h.R.emt.courseWithinYears} years (${h.src('nremt_fee', 'NREMT')}).</p>
<h2>Common combinations</h2>
<ul>
<li><strong>Medical assistant plus phlebotomy:</strong> the CCMA covers phlebotomy as part of clinical care, so the CPT adds a credential with modest extra study.</li>
<li><strong>Nurse aide to EMT or pharmacy:</strong> the CNA is often a first job in health care; the habits it builds, safety, infection control and reporting, carry into every other exam.</li>
<li><strong>EKG plus phlebotomy:</strong> a frequent pairing for hospital technician jobs; the CET and the CPT share the safety and patient care domains.</li>
</ul>
<h2>Cost of the whole path</h2>
<p>The exam fee is rarely the largest cost: training programs, background checks and state license fees usually add more, and many employers or programs pay the exam fee. The ${h.a('exam-fees-retakes', 'fees and retakes page')} sets out what each certifier publishes, including what a failed attempt costs and how long you must wait.</p>
<p>This site does not run any of these exams and does not recommend a school. When you have chosen, the practice pages for each exam start from the ${h.a('home', 'home page')}.</p>`;
    },
  },
});
