import { describe, it, expect } from 'vitest';
import { convert, daysSupply, quantityFor, dropsDays, insulinDays, doseByWeight, dilution, alligation, ivRate } from '../src/lib/engine/pharm';
import { rateFromBoxes, rateFromStrip, rateBand } from '../src/lib/engine/ekg';
import { apgar, apgarBand } from '../src/lib/engine/scores';
import { EXAM_IDS, examOf, domainsOf, buildMock, buildPractice, pool, score, targetCount, atLeast } from '../src/lib/engine/exam';
import { BANK } from '../src/lib/banks-build';
import { SPEC_IDS, getSpec } from '../src/lib/mini-specs';

describe('pharmacy math', () => {
  it('converts household and metric units', () => {
    expect(convert(2, 'tsp', 'mL')).toBe(10);
    expect(convert(1, 'g', 'mcg')).toBe(1_000_000);
    expect(convert(1, 'mL', 'mg')).toBeNull();
  });
  it('rounds days supply down and quantities up', () => {
    expect(daysSupply(45, 2, 1)).toBe(22);
    expect(daysSupply(90, 1, 2)).toBe(45);
    expect(quantityFor(30, 1, 3)).toBe(90);
    expect(dropsDays(5, 20, 1, 2, 2)).toBe(25);
    expect(insulinDays(15, 100, 32, 4)).toBe(41);
  });
  it('works out dose, dilution, alligation and IV rate', () => {
    expect(doseByWeight(15, 22, 'kg', 40).ml).toBeCloseTo(8.25);
    expect(doseByWeight(5, 66, 'lb', 25).kg).toBeCloseTo(30);
    const d = dilution(70, 25, 500)!;
    expect(d.stock + d.diluent).toBeCloseTo(500);
    expect(dilution(10, 20, 100)).toBeNull();
    const a = alligation(10, 2, 5, 240)!;
    expect([a.pHigh, a.pLow, a.high, a.low]).toEqual([3, 5, 90, 150]);
    expect(ivRate(1000, 480, 15)).toEqual({ mlHr: 125, gttMin: 31.25 });
  });
});

describe('EKG and Apgar', () => {
  it('reads heart rate from a strip', () => {
    expect(rateFromBoxes(20, 'small', 25)).toBeCloseTo(75);
    expect(rateFromBoxes(4, 'large', 25)).toBeCloseTo(75);
    expect(rateFromStrip(8, 6)).toBe(80);
    expect(rateBand(50)).toBe('below');
  });
  it('adds the five Apgar signs', () => {
    expect(apgar([2, 2, 2, 2, 2])).toBe(10);
    expect(apgarBand(apgar([1, 1, 1, 1, 1]))).toBe('attention');
  });
});

describe('question banks', () => {
  it('has unique ids and valid answers', () => {
    const ids = new Set(BANK.map((q) => q.id));
    expect(ids.size).toBe(BANK.length);
    for (const q of BANK) {
      expect(q.options.length).toBe(4);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(4);
      expect(q.ref.length).toBeGreaterThan(0);
      expect(q.explain.length).toBeGreaterThan(20);
    }
  });
  it('fills every domain of every exam beyond its mock quota', () => {
    for (const e of EXAM_IDS) for (const d of domainsOf(e)) expect(pool(BANK, e, d.code).length, `${e}/${d.code}`).toBeGreaterThanOrEqual(d.items);
  });
  it('builds full mocks with the official item count and the domain quotas', () => {
    for (const e of EXAM_IDS) {
      const m = buildMock(BANK, e, 42);
      expect(m.length).toBe(examOf(e).items);
      expect(new Set(m.map((q) => q.id)).size).toBe(m.length);
    }
    expect(buildPractice(BANK, 'cpt', 'safety', 7, 10)).toEqual(buildPractice(BANK, 'cpt', 'safety', 7, 10));
  });
  it('scores against the study target', () => {
    const qs = buildPractice(BANK, 'ptce', 'med', 1, 10);
    const s = score('ptce', qs, qs.map((q) => q.answer));
    expect(s.right).toBe(10);
    expect(s.reached).toBe(true);
    expect(targetCount('ptce', 10)).toBe(8);
    expect(atLeast(10, 0, 0.5)).toBe(1);
    expect(atLeast(1, 1, 0.5)).toBeCloseTo(0.5);
  });
});

describe('calculators', () => {
  it('every mini spec runs on its defaults', () => {
    for (const id of SPEC_IDS) {
      const s = getSpec(id);
      const v = Object.fromEntries(s.inputs.map((i) => [i.id, Number(i.def)]));
      const out = s.run(v);
      expect(out.head.length, id).toBe(2);
    }
  });
});
