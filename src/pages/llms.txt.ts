/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';

const words = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Free practice for eight US allied health certification exams: CNA (nurse aide written exam, NNAAP format, and skills), PTCE (PTCB) and ExCPT (NHA) for pharmacy technicians, CCMA (NHA) and CMA (AAMA) for medical assistants, CPT (NHA phlebotomy), CET (NHA EKG) and the NREMT EMT cognitive exam. Questions written by Radif Partners from the public content outlines (outline text not reproduced), practice by outline domain with explanations, timed mock exams with the published item counts and time limits, review of missed questions kept in the browser, a CNA skills checklist, top 200 drug cards from RxNorm, pharmacy math and dosage calculators, exam fees and retake rules, and nurse aide exam fees for ten states. Independent: not affiliated with the PTCB, the NHA, the AAMA, the NREMT, Credentia, Prometric or Pearson VUE. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Exam formats, fees and rules read on the certifiers', vendors' and state agencies' pages, retrieved ${words(params.retrieved_at)}.`,
    '- Practice questions: written by Radif Partners; they are not questions from the real exams.',
    '',
    `- [All eight exams](${SITE_URL}${route('home', 'en')}): practice hub, formats compared, certification finder`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
