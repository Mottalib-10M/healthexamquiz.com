import { describe, it, expect } from 'vitest';
import { PAGES } from '../src/lib/guides';
import { helpers } from '../src/lib/helpers';
import { ROUTES } from '../src/i18n/routes';
import P from '../src/data/params-2026.json';

const h = helpers('en', true);
const words = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

describe('content pages', () => {
  it('stay under the 100-page budget', () => expect(ROUTES.length).toBeLessThanOrEqual(100));
  for (const p of PAGES) {
    it(`${p.id}: snippet lengths, summary, FAQ, links and sources`, () => {
      const t = p.en;
      expect(t.title.length).toBeGreaterThanOrEqual(50);
      expect(t.title.length).toBeLessThanOrEqual(60);
      expect(t.description.length).toBeGreaterThanOrEqual(150);
      expect(t.description.length).toBeLessThanOrEqual(160);
      expect(words(t.resume(h))).toBeGreaterThanOrEqual(120);
      const f = t.faqs(h);
      expect(f.length).toBeGreaterThanOrEqual(3);
      for (const x of f) { expect(words(x.a)).toBeGreaterThanOrEqual(40); expect(words(x.a)).toBeLessThanOrEqual(90); }
      expect(() => t.body(h)).not.toThrow();
      for (const k of p.sources) expect(k in P.sources, k).toBe(true);
      for (const r of p.related) expect(PAGES.some((x) => x.id === r), r).toBe(true);
      expect(p.tool).toBeDefined();
    });
  }
});
