/** Apgar score (MedlinePlus): five signs scored 0, 1 or 2; read with the bands MedlinePlus gives. */
import P from '../../data/params-2026.json';
const A = P.apgar;
export const apgar = (vals: number[]) => vals.reduce((s, v) => s + Math.max(0, Math.min(2, Math.round(v))), 0);
export const apgarBand = (t: number) => (t >= A.normalMin ? 'normal' : 'attention');
