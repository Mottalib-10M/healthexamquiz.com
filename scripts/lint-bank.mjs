#!/usr/bin/env node
/**
 * Checks the question banks (src/data/questions/*.json): schema, domain codes known to
 * params-2026.json, unique ids and stems, four distinct options, explanation length, no
 * "all/none of the above", no dash punctuation, balanced answer positions, no "longest option
 * is the answer" bias, and pool size per exam domain at least the mock quota (x1.15).
 * Usage: node scripts/lint-bank.mjs [bank ...]   (exit 1 on any defect)
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const P = JSON.parse(fs.readFileSync(path.join(root, 'src/data/params-2026.json'), 'utf8'));
const dir = path.join(root, 'src/data/questions');
const only = process.argv.slice(2);
const banks = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''));
const errs = [];
const all = [];
const ids = new Set();
const stems = new Map();
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

for (const b of banks) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, `${b}.json`), 'utf8'));
  const qs = data.questions ?? [];
  const pos = [0, 0, 0, 0];
  let longest = 0;
  for (const q of qs) {
    const where = `${b}:${q.id ?? '?'}`;
    all.push(q);
    if (!q.id || ids.has(q.id)) errs.push(`${where} id missing or duplicated`);
    ids.add(q.id);
    const ex = P.exams[q.exam];
    if (!ex) { errs.push(`${where} unknown exam ${q.exam}`); continue; }
    if (!ex.domains.some((d) => d.code === q.domain)) errs.push(`${where} unknown domain ${q.exam}/${q.domain}`);
    for (const t of q.also ?? []) {
      if (!P.exams[t.exam]?.domains.some((d) => d.code === t.domain)) errs.push(`${where} bad also tag ${t.exam}/${t.domain}`);
      if (t.exam === q.exam) errs.push(`${where} also tag repeats its own exam`);
    }
    if (typeof q.ref !== 'string' || q.ref.length < 3) errs.push(`${where} ref missing`);
    if (typeof q.q !== 'string' || words(q.q) < 5) errs.push(`${where} stem too short`);
    if (!Array.isArray(q.options) || q.options.length !== 4) { errs.push(`${where} needs 4 options`); continue; }
    if (new Set(q.options.map(norm)).size !== 4) errs.push(`${where} options not distinct`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errs.push(`${where} bad answer index`);
    else pos[q.answer]++;
    const w = words(q.explain ?? '');
    if (w < 15 || w > 95) errs.push(`${where} explanation ${w} words (15 to 95)`);
    const text = [q.q, ...q.options, q.explain].join(' ');
    if (/\b(all|none|both) of the above\b/i.test(text)) errs.push(`${where} "of the above" option`);
    if (/[–—]|\s-\s|--/.test(text)) errs.push(`${where} dash punctuation`);
    if (/real (exam )?questions|actual exam questions/i.test(text)) errs.push(`${where} claims real exam questions`);
    const st = norm(q.q);
    if (stems.has(st)) errs.push(`${where} same stem as ${stems.get(st)}`);
    stems.set(st, q.id);
    const lens = q.options.map((o) => o.length);
    const max = Math.max(...lens);
    if (lens[q.answer] === max && lens.filter((l) => l === max).length === 1 && max > 1.6 * Math.min(...lens)) longest++;
  }
  if (qs.length) {
    const share = pos.map((n) => n / qs.length);
    if (share.some((s) => s < 0.15 || s > 0.35)) errs.push(`${b}: answer positions unbalanced ${pos.join('/')}`);
    if (longest / qs.length > 0.3) errs.push(`${b}: correct option is clearly the longest in ${longest} of ${qs.length}`);
  }
  console.log(`${b}: ${qs.length} questions, answer positions ${pos.join('/')}`);
}

const pool = (exam, code) => all.filter((q) => (q.exam === exam && q.domain === code) || q.also?.some((t) => t.exam === exam && t.domain === code)).length;
for (const [exam, ex] of Object.entries(P.exams)) {
  const line = ex.domains.map((d) => {
    const n = pool(exam, d.code);
    const need = Math.ceil(d.items * 1.15);
    const bankKnown = only.length === 0 || all.some((q) => q.exam === exam || q.also?.some((t) => t.exam === exam));
    if (n < need && bankKnown && all.length) errs.push(`${exam}/${d.code}: pool ${n} < ${need} (quota ${d.items} x 1.15)`);
    return `${d.code} ${n}/${d.items}`;
  });
  console.log(`${exam}: ${line.join(', ')}`);
}

const shown = only.length ? errs.filter((e) => only.some((b) => e.startsWith(`${b}:`) || e.includes('/'))) : errs;
if (shown.length) { console.log(`\n${shown.length} defect(s):`); shown.slice(0, 200).forEach((e) => console.log(`  ${e}`)); process.exit(1); }
console.log('\nlint-bank: 0 defects');
