/** Calendar helpers on whole days (UTC), used by the retake and study-plan tools. */
export const dayNum = (iso: string) => Math.floor(Date.parse(`${iso}T00:00:00Z`) / 86_400_000);
export const isoOf = (n: number) => new Date(n * 86_400_000).toISOString().slice(0, 10);
export const addDays = (iso: string, d: number) => isoOf(dayNum(iso) + d);
/** Earliest new attempt: the day after the waiting period (a wait of N days lets you test on day N). */
export const retakeOn = (failedIso: string, waitDays: number) => addDays(failedIso, waitDays);
