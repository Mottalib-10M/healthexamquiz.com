/**
 * EKG strip arithmetic tested on the CET. The grid is physical: a small box is 1 mm and a large box
 * 5 mm, so their duration follows from the paper speed printed on the strip (time = mm ÷ speed).
 * Heart rate = 60 s ÷ seconds between two R waves; six-second strip = complexes × 10. The adult
 * resting range used for the "slow / normal / fast" label is MedlinePlus's (params-2026.json `ekg`).
 */
import P from '../../data/params-2026.json';
const E = P.ekg;
export const SMALL_MM = 1;
export const LARGE_MM = 5;
export const boxSeconds = (mm: number, speed: number) => (speed > 0 ? mm / speed : 0);
/** Rate from the number of small (1 mm) or large (5 mm) boxes between two R waves. */
export function rateFromBoxes(boxes: number, kind: 'small' | 'large', speed: number) {
  const s = boxes * boxSeconds(kind === 'small' ? SMALL_MM : LARGE_MM, speed);
  return s > 0 ? 60 / s : 0;
}
/** Complexes counted on a strip of a given length in seconds, scaled to one minute. */
export const rateFromStrip = (complexes: number, stripSeconds: number) => (stripSeconds > 0 ? (complexes * 60) / stripSeconds : 0);
export const intervalSeconds = (smallBoxes: number, speed: number) => smallBoxes * boxSeconds(SMALL_MM, speed);
export type Band = 'below' | 'within' | 'above';
export const rateBand = (bpm: number): Band => (bpm < E.adultRestMin ? 'below' : bpm > E.adultRestMax ? 'above' : 'within');
