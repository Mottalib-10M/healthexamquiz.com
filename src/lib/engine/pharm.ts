/**
 * Pharmacy math as it is tested on the PTCE and the ExCPT: unit conversions, days supply, dose by
 * weight, dilutions, alligation and IV flow rates. Pure functions; constants come from params-2026.json
 * (`pharmMath`), each with its source, never typed in a page.
 */
import P from '../../data/params-2026.json';
const C = P.pharmMath;

/** Mass and volume units, with their factor to the base unit (mg for mass, mL for volume). */
export const MASS: Record<string, number> = { mcg: 0.001, mg: 1, g: 1000, kg: 1_000_000, gr: C.grainMg, lb: C.lbKg * 1_000_000 };
export const VOLUME: Record<string, number> = { mL: 1, L: 1000, tsp: C.tspMl, tbsp: C.tbspMl, floz: C.flozMl, cup: C.cupMl };
export function convert(value: number, from: string, to: string): number | null {
  if (from in MASS && to in MASS) return (value * MASS[from]) / MASS[to];
  if (from in VOLUME && to in VOLUME) return (value * VOLUME[from]) / VOLUME[to];
  return null;
}
/** Whole days a supply lasts (pharmacies round down: a partial day is not a day of therapy). */
export function daysSupply(quantity: number, perDose: number, dosesPerDay: number): number {
  const daily = perDose * dosesPerDay;
  return daily > 0 ? Math.floor(quantity / daily + 1e-9) : 0;
}
/** Quantity to dispense for a number of days. */
export const quantityFor = (days: number, perDose: number, dosesPerDay: number) => Math.ceil(days * perDose * dosesPerDay - 1e-9);
/** Eye or ear drops: mL in the bottle × drops per mL (no federal standard: the visitor types the count the plan or the label uses) ÷ drops a day. */
export function dropsDays(ml: number, dropsPerMl: number, dropsPerDose: number, dosesPerDay: number, eyes = 1): number {
  return daysSupply(ml * dropsPerMl, dropsPerDose * eyes, dosesPerDay);
}
/** Insulin: units in the pen or vial ÷ units a day (vial volume × 100 units/mL for U-100). */
export function insulinDays(ml: number, unitsPerMl: number, unitsPerDay: number, primingPerDay = 0): number {
  return daysSupply(ml * unitsPerMl, unitsPerDay + primingPerDay, 1);
}
/** Dose from body weight: mg/kg × kg, and the volume to draw at a concentration in mg per mL. */
export function doseByWeight(mgPerKg: number, weight: number, unit: 'kg' | 'lb', mgPerMl: number) {
  const kg = unit === 'lb' ? weight / C.lbPerKg : weight;
  const mg = mgPerKg * kg;
  return { kg, mg, ml: mgPerMl > 0 ? mg / mgPerMl : 0 };
}
/** C1 × V1 = C2 × V2: volume of stock (V1) and of diluent to make V2 at C2. */
export function dilution(stockPct: number, finalPct: number, finalVolume: number) {
  if (stockPct <= 0 || finalPct > stockPct) return null;
  const v1 = (finalPct * finalVolume) / stockPct;
  return { stock: v1, diluent: finalVolume - v1 };
}
/** Alligation: parts of the stronger and the weaker product to reach a strength in between. */
export function alligation(high: number, low: number, want: number, total: number) {
  if (!(high > want && want > low)) return null;
  const pHigh = want - low, pLow = high - want, parts = pHigh + pLow;
  return { pHigh, pLow, high: (total * pHigh) / parts, low: (total * pLow) / parts };
}
/** IV infusion: mL per hour, and drops per minute with a set's drop factor (gtt/mL). */
export function ivRate(volumeMl: number, minutes: number, dropFactor: number) {
  if (minutes <= 0) return { mlHr: 0, gttMin: 0 };
  return { mlHr: (volumeMl * 60) / minutes, gttMin: (volumeMl * dropFactor) / minutes };
}
