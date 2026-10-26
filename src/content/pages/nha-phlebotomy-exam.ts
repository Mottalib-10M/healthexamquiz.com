import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'nha-phlebotomy-exam',
  group: 'lab',
  order: 61,
  tool: { kind: 'quiz', props: { exam: 'cpt', mode: 'mock' } },
  mini: { kind: 'mini:pace', props: { e: 5 } },
  related: ['phlebotomy-practice-test', 'order-of-draw', 'exam-fees-retakes', 'which-certification', 'cet-exam'],
  sources: ['nha_cpt_plan', 'nha_handbook', 'nha_renew', 'nha_news'],
  demarche: true,
  en: {
    slug: 'nha-phlebotomy-exam',
    nav: 'NHA phlebotomy exam',
    card: 'The CPT exam in full: a timed 120-question mock, eligibility, documented draws, scoring and retakes.',
    title: 'NHA Phlebotomy Exam 2026: Format, Mock Test and Retakes',
    description: 'NHA phlebotomy exam (CPT) 2026: a full timed mock at the published length, eligibility, 30 venipunctures and 10 capillary sticks, scoring and retake rules.',
    h1: 'NHA phlebotomy exam: full mock and rules',
    intro: 'A complete practice exam at the published length and time, corrected at the end, with a question map and flags as on test day.',
    resume: (h) => {
      const x = h.X('cpt'), R = h.R.nha;
      return `The NHA phlebotomy exam leads to the Certified Phlebotomy Technician credential (CPT). Since ${h.date(R.cptLaunch)} it follows a new test plan: ${x.items} questions, of which ${x.scored} are scored and the rest are pretest items, in ${h.time('cpt')}, at a test center or with live remote proctoring. To sit it, a candidate needs a high school diploma or equivalent and either a phlebotomy training program or supervised work experience, and must document ${R.cptVenipunctures} successful venipunctures and ${R.cptCapillary} capillary sticks performed on live people. The score is scaled: ${x.passText.replace('Official pass: ', '')}. After a failed attempt the candidate waits ${R.waitDays} days; after ${R.attempts} attempts the wait becomes a year. The credential is renewed every ${R.renewYears} years with ${R.renewCredits} continuing education credits. The mock above keeps the full length and time, mixes the five domains in their test plan weights and marks your share of right answers against a study target of ${h.pc(x.target)} chosen by this site.`;
    },
    faqs: (h) => [
      { q: 'How is the mock on this page marked compared with the real CPT exam?', a: `The real exam converts your answers to a scaled score between 200 and 500 through equating, and the NHA publishes no table from right answers to scale. Our mock therefore reports the share of right answers and compares it with a study target of ${h.pc(h.X('cpt').target)}, which is our own goal. Reaching it on several mocks is a sign you are ready, not a guarantee.` },
      { q: 'Do the 30 venipunctures have to be done before the exam?', a: `The NHA asks for ${h.R.nha.cptVenipunctures} successful venipunctures and ${h.R.nha.cptCapillary} capillary sticks on live individuals as part of eligibility, attested by a qualified person, usually through the training program or the employer. Without them the certification is not issued. Check the candidate handbook for the attestation form and the timing your route requires.` },
      { q: 'What happens if I fail the NHA phlebotomy exam?', a: `You can retake it after ${h.R.nha.waitDays} days. The NHA allows ${h.R.nha.attempts} attempts in that rhythm; after a third failure, each new attempt comes a year after the last. Each attempt is paid again. Use the wait to work on the domains where your score report shows weakness, then take a full mock before booking.` },
      { q: 'How much does the CPT exam cost?', a: `The NHA did not display its exam fees on a public page when we checked on ${h.read}; the amount appears in your NHA account when you register, and many schools include it in tuition. We do not repeat figures found on third party sites, because they are often out of date. The fees page lists what each certifier publishes.` },
    ],
    body: (h) => {
      const x = h.X('cpt'), R = h.R.nha;
      return `
<h2>How the mock is built</h2>
<p>The mock draws ${x.items} questions, the full length of the real form, because the pretest questions are mixed in and you cannot tell them apart. Each domain gets its share of the test plan: ${x.domains.map((d) => `${d.short.toLowerCase()} ${d.items}`).join(', ')}. You have ${h.time('cpt')}; the clock runs in your browser only. The question map shows answered and flagged questions, and you can move freely before marking the test. Corrections and explanations appear at the end, with your score by domain.</p>
<p>The mark is your share of right answers, set against a study target of ${h.pc(x.target)}. That target is ours, not the NHA's: the official standard is a scaled score, ${x.passText.replace('Official pass: ', '')}, which cannot be rebuilt from a count. A mock above the target in several attempts, on different draws, is a better sign than one high score.</p>
<h2>Eligibility in practice</h2>
<p>The NHA candidate handbook (archived copy of October 9, 2026, cited in the sources) sets two routes after a high school diploma or equivalent:</p>
<ul>
<li><strong>Training:</strong> completion of a phlebotomy training program within the last five years;</li>
<li><strong>Experience:</strong> supervised work as a phlebotomist, one year within the last three years or two years within the last five.</li>
</ul>
<p>Both routes add the documented draws: ${R.cptVenipunctures} venipunctures and ${R.cptCapillary} capillary sticks on live people. Some states license phlebotomists themselves and add their own requirements; California is the best known example. Check your state before you book.</p>
<h2>Booking, test day and results</h2>
<p>You register and pay in your NHA account, then choose a test center appointment or a remotely proctored session. Bring the identification the handbook lists; for remote testing, the room and computer checks come first. The score report shows your scaled score and your performance by domain, which tells you where to work if a retake is needed.</p>
<h2>Retakes and renewal</h2>
${h.table(['Rule', 'NHA policy'], [['Wait after a failed attempt', `${R.waitDays} days`], ['Attempts at that rhythm', `${R.attempts}`], ['After that', 'One attempt a year'], ['Renewal', `Every ${R.renewYears} years, ${R.renewCredits} continuing education credits`]], `NHA candidate handbook and renewal page, archived copies, read on ${h.read}.`, ['l', 'l'])}
<p>The ${h.a('exam-fees-retakes', 'fees and retakes page')} compares these rules with the other certifiers, and the retake calculator above works out the wait for any exam.</p>
<h2>What the test plan expects you to do</h2>
<p>The ${h.src('nha_cpt_plan', 'CPT test plan')} is written as tasks rather than topics: verify the requisition, identify the patient, choose the site and the equipment, perform the collection, label at the bedside, process and transport the specimen, and handle an exposure or a reaction. Read it once before your final week: every question on the exam traces back to one of those tasks, and the mock's domain report tells you which group of tasks needs work.</p>
<p>This site is not the NHA and has no role in registration, scoring or certification. The questions are written by us from the test plan topics and are not questions from the real exam.</p>`;
    },
  },
});
