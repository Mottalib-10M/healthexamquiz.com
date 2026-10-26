#!/usr/bin/env python3
"""Builds src/data/drugs.json from scripts/data/drug-list.tsv (generic, brand we show, use in our words).

For each generic, reads the US National Library of Medicine APIs (public domain):
  - RxNorm: the ingredient's RXCUI and its brand names (tty BN) -> the brand we show must be one of them;
  - RxClass: the FDA Established Pharmacologic Class (EPC) from DailyMed labels (relaSource DAILYMED).
Usage: python3 scripts/build-drugs.py   (rejouable ; date de lecture écrite dans le JSON)
"""
import json, sys, time, urllib.parse, urllib.request, datetime, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
API = 'https://rxnav.nlm.nih.gov/REST'
def get(path):
    for i in range(4):
        try:
            with urllib.request.urlopen(API + path, timeout=30) as r: return json.load(r)
        except Exception as e:
            time.sleep(1 + i)
    raise SystemExit('API failed: ' + path)
# Decks of the flash cards: the common use mapped to a broad area (first match wins).
AREAS = [('Blood clots', r'clot|anticoag'), ('Heart and blood pressure', r'blood pressure|heart|angina|fluid|rhythm|edema'),
  ('Cholesterol', r'cholesterol|triglycer|lipid'), ('Diabetes and thyroid', r'diabet|thyroid|insulin'),
  ('Infections', r'infection|antibiot|herpes|influenza|hiv|fungal|parasit|worm|lice'),
  ('Mental health', r'depress|anxiety|schizo|bipolar|adhd|panic|psych|insomnia|sleep|smoking|alcohol|opioid use'),
  ('Brain and nerves', r'seizure|parkinson|dementia|alzheimer|migraine|nerve|restless|vertigo|neuropath|muscle spasm|spastic|multiple sclerosis'),
  ('Pain and inflammation', r'pain|arthritis|inflammation|gout|fever|opioid'), ('Lungs and allergy', r'asthma|copd|allerg|cough|nasal|congestion'),
  ('Stomach and bowel', r'stomach|acid|ulcer|nausea|constipation|bowel|diarrhea|reflux|crohn|colitis'),
  ('Urinary and prostate', r'bladder|prostate|urin|erectile'), ('Eyes and skin', r'glaucoma|eye|skin|acne|psoriasis|eczema')]
def area_of(use):
    import re
    return next((a for a, rx in AREAS if re.search(rx, use.lower())), 'Hormones, bones and supplements')
out, errs = [], []
for line in (ROOT / 'scripts/data/drug-list.tsv').read_text().splitlines():
    if not line.strip(): continue
    generic, brand, use = line.split('\t')
    ids = get('/rxcui.json?name=' + urllib.parse.quote(generic) + '&search=2').get('idGroup', {}).get('rxnormId', [])
    if not ids: errs.append(f'{generic}: no RXCUI'); continue
    rx = ids[0]
    # The brand shown must be a branded product of RxNorm whose name holds the generic (SBD "… [Brand]").
    sbd = [c['name'] for g in get('/drugs.json?name=' + urllib.parse.quote(brand)).get('drugGroup', {}).get('conceptGroup', []) or [] for c in g.get('conceptProperties', []) or []] if brand else []
    if brand and not any(generic.split()[0].lower() in n.lower() and f'[{brand.lower()}]' in n.lower() for n in sbd):
        errs.append(f'{generic}: brand {brand} not found as a branded product in RxNorm -> shown as generic only'); brand = ''
    cls = []
    for src in ('DAILYMED', 'FDASPL'):
        j = get('/rxclass/class/byDrugName.json?drugName=' + urllib.parse.quote(generic) + f'&relaSource={src}&relas=has_epc')
        for it in (j.get('rxclassDrugInfoList') or {}).get('rxclassDrugInfo', []):
            n = it['rxclassMinConceptItem']['className']
            if n not in cls: cls.append(n)
        if cls: break
    if not cls: errs.append(f'{generic}: no EPC in DailyMed or FDA SPL (class left empty)')
    out.append({'generic': generic, 'brand': brand, 'use': use, 'epc': cls[:2], 'rxcui': rx, 'area': area_of(use)})
    time.sleep(0.15)
data = {'retrieved_at': datetime.date.today().isoformat(), 'source': 'RxNorm and RxClass (DailyMed EPC), US National Library of Medicine', 'drugs': out}
(ROOT / 'src/data/drugs.json').write_text(json.dumps(data, indent=1, ensure_ascii=False) + '\n')
print(len(out), 'drugs'); print('\n'.join(errs))
