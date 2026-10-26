/** Build-time access to the bank (never imported by a client component). */
import CNA from '../data/questions/cna.json';
import PHARM from '../data/questions/pharm.json';
import MA from '../data/questions/ma.json';
import PHLEB from '../data/questions/phleb.json';
import EKG from '../data/questions/ekg.json';
import EMT from '../data/questions/emt.json';
import type { Question } from './engine/exam';
export const BANK: Question[] = [CNA, PHARM, MA, PHLEB, EKG, EMT].flatMap((f) => (f as { questions: Question[] }).questions);
