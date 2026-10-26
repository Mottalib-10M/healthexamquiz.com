import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'pearson-vue-cna-practice-test',
  group: 'cna',
  order: 21,
  tool: { kind: 'quiz', props: { exam: 'cna', mode: 'practice', domain: 'self', n: 10 } },
  mini: { kind: 'mini:pace', props: { e: 0 } },
  related: ['cna-state-exam', 'cna-practice-test', 'cna-written-exam', 'cna-skills-list', 'cna-exam'],
  sources: ['ncsbn_nnaap', 'credentia_testtakers', 'credentia_outline', 'credentia_written', 'credentia_pa'],
  en: {
    slug: 'pearson-vue-cna-practice-test',
    nav: 'Pearson VUE CNA practice test',
    card: 'Why the CNA exam is still called the Pearson VUE test, who runs the NNAAP now, and how to make sure your materials are current.',
    title: 'Pearson VUE CNA Practice Test: NNAAP Now Run by Credentia',
    description: 'Pearson VUE CNA practice test: free NNAAP questions, why the exam once tied to Pearson VUE is now owned by Credentia, and what that changes for registering.',
    h1: 'Pearson VUE CNA practice test: what changed, what did not',
    intro: 'Ten questions on self-care and independence to start. Below: the short history of the NNAAP, and how to avoid studying from outdated material.',
    resume: (h) => {
      const n = h.R.nnaap;
      return `Many candidates still look for a Pearson VUE CNA test because, for years, the National Nurse Aide Assessment Program (NNAAP) was delivered by Pearson VUE on behalf of the National Council of State Boards of Nursing (NCSBN), which developed it. That arrangement has ended. The NCSBN now states that it no longer develops or owns the content of the NNAAP and of the medication aide exam (MACE), and it directs candidates to Credentia, which owns and delivers the NNAAP in the states that use it. For candidates, the exam itself is the same kind of test: a written part of ${n.writtenItems} questions in ${h.hm(n.writtenMinutes)}, ${n.writtenItems - n.writtenScored} of them pretest items, or an oral version, and a skills part of ${n.skills} skills in ${n.skillsMinutes} minutes. What changed is where you register, which handbook applies and, separately, the content outline, revised in ${h.date(n.outlineEffective)}. Practice material labeled Pearson VUE may predate that outline. The questions here follow the 2024 outline and are written by us, not taken from any vendor.`;
    },
    faqs: (h) => [
      { q: 'Does Pearson VUE still run the CNA exam?', a: 'Not the NNAAP. The NCSBN no longer owns or develops it, and Credentia now owns and delivers it in the states that use it. Some older handbooks, school documents and practice books still carry the Pearson VUE name. If a document tells you to register or pay through Pearson VUE for a nurse aide exam, check its date and your state\'s current vendor first.' },
      { q: 'Do older Pearson VUE practice books still match the NNAAP?', a: `Mostly for the care content, not always for the details. The NNAAP outline was revised and took effect in ${h.date(h.R.nnaap.outlineEffective)}, and the current skills listing goes with it. Older material can still teach the duties, but its skill titles, steps and fees may not match your current handbook. Check every skill against your current state handbook.` },
      { q: 'Where do I register for the NNAAP now?', a: 'Through Credentia, on the page for your state, usually with help from your training program. Credentia keeps one page per state with the handbook, fees, test sites and forms. Pennsylvania, Georgia and North Carolina, for example, each have their own quick reference. Use the page of the state where you trained, not a general search result or a forum link.' },
      { q: 'Did the content of my exam change when Credentia took over?', a: `The change of owner did not, by itself, change the content: the NNAAP kept its two parts and its format. What you must watch is the 2024 outline, in force since ${h.date(h.R.nnaap.outlineEffective)}, which applies whoever delivers the exam. So compare your material with the 2024 outline, not with the vendor name on its cover.` },
    ],
    body: (h) => {
      const n = h.R.nnaap;
      return `
<h2>Three names, one exam</h2>
<p>The confusion comes from three organizations being attached to the same test over time:</p>
${h.table(['Organization', 'Role in the NNAAP'], [
        ['NCSBN', 'Developed the NNAAP; no longer owns or develops its content'],
        ['Pearson VUE', 'Long delivered the NNAAP in many states for the NCSBN'],
        ['Credentia', 'Now owns the NNAAP and delivers it in the states that use it'],
      ], `NCSBN notice (${h.src('ncsbn_nnaap', 'NNAAP and MACE')}) and Credentia test taker pages, read on ${h.read}.`, ['l', 'l'])}
<p>The test candidates sit has kept its structure through these changes. A written test, with an oral alternative, and a skills demonstration, both required by federal rules for every state. So if a friend who tested years ago calls it the Pearson VUE exam and you are told it is the Credentia exam, you are talking about the same program.</p>
<h2>What changed for candidates</h2>
<p>Three things are different from the Pearson VUE years, and each matters on a practical level.</p>
<p><strong>Where you register.</strong> Applications, scheduling and fees now go through Credentia's state pages (${h.src('credentia_testtakers', 'Credentia test takers')}). Each NNAAP state has its own page with its own handbook. Bookmarks, emails and printed instructions from the old system can point to pages that no longer apply.</p>
<p><strong>The outline and skills listing.</strong> The ${h.src('credentia_outline', '2024 NNAAP content outline')} took effect in ${h.date(n.outlineEffective)}. It organizes the written test into nine areas under three roles and goes with the current skills listing. Material written before that date is not wrong about nurse aide work, but its area names, skill titles or step sequences may not match the current handbook.</p>
<p><strong>Fees.</strong> Old fee tables are unreliable. Pennsylvania, for example, now sells both parts as a bundle of ${h.usd(h.state('pa').vendors[0].bundle ?? 0)} on its ${h.src('credentia_pa', 'Credentia quick reference')}. Always pay the amount shown on your state's current page.</p>
<h2>What did not change</h2>
<p>The written form still has ${n.writtenItems} questions in ${h.hm(n.writtenMinutes)}, with ${n.writtenItems - n.writtenScored} pretest items that do not count (${h.src('credentia_written', 'Credentia written exam page')}). The oral version still has ${n.oralItems} questions and ${n.oralWordItems} word recognition items. The skills test still asks for ${n.skills} skills in ${n.skillsMinutes} minutes, with hand hygiene always included. And the kind of question is the same: a resident, a situation, and the best thing the aide should do.</p>
<h2>Checking your study material</h2>
<p>Before you rely on a book, an app or a printed handout, run four quick checks:</p>
<ol>
<li>Does it mention the 2024 outline, or is it dated after ${h.date(n.outlineEffective)}?</li>
<li>Do its area names match the nine areas of the current outline, such as self-care and independence or member of the health care team?</li>
<li>Do its skill titles match the current listing? Compare them with our ${h.a('cna-skills-list', 'skills list')}, taken from the 2024 listing.</li>
<li>Does it give fees or a registration address? If so, ignore them and use your state's current Credentia page.</li>
</ol>
<p>A source that fails the first three can still be useful for practice questions on daily care, but it should not be your guide to skill steps.</p>
<h2>Three questions for your training program</h2>
<p>Your program knows the current arrangements better than any old document. Ask which vendor and which handbook edition it prepares you for, whether it registers you or you register yourself, and which version of the skills checklist its instructors use in the lab. If the answers point to the current Credentia handbook and the 2024 listing, you can trust the program's practice sessions as a guide to test day.</p>
<h2>Not an NNAAP state?</h2>
<p>If you train in Texas, Florida or New York, you test with Prometric; in Ohio or Michigan, with Headmaster; in Illinois, through Southern Illinois University. None of these exams was ever the NNAAP, so neither Pearson VUE nor Credentia material describes their format exactly. The ${h.a('cna-state-exam', 'state guide')} tells you which one applies.</p>
<h2>About the questions above</h2>
<p>The ten questions loaded at the top come from self-care and independence, an area that tests whether you let residents do what they can for themselves: encouraging them to feed or dress themselves, offering choices, and giving time rather than taking over. It carries about ${h.dom('cna', 'self').items} questions on a full form. After it, move to the larger areas with the ${h.a('cna-practice-test', 'practice test by area')}. This site is not affiliated with Pearson VUE, Credentia or the NCSBN.</p>`;
    },
  },
});
