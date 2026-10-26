# Ajouter une page

1. Créer `src/content/pages/<id>.ts` avec `definePage` (voir `src/lib/guide-types.ts`) : `group`, `order`, `tool` (outil du premier écran), `mini` facultatif, `related`, `sources` (clés de `src/data/params-2026.json`).
2. Texte anglais (en-US) seulement : titre 50-60 caractères et description 150-160, terme-clé en tête ; `resume` d'au moins 120 mots ; 3 à 5 FAQ (6 à 8 au-delà de 1 200 mots), réponses de 40 à 90 mots, en texte simple (sans lien).
3. Aucun chiffre tapé à la main : formats, frais, règles via `h.X`, `h.R`, `h.dom`, `h.state`, `h.P` ; liens internes par `h.a(id, texte)`, sources par `h.src(clé, texte)`.
4. Questions : `src/data/questions/*.json`, écrites par nous depuis les plans publics, chacune avec `ref` et `explain` ; `node scripts/lint-bank.mjs` doit finir à 0 défaut.
5. Liste des médicaments : `python3 scripts/build-drugs.py` (RxNorm/RxClass, domaine public).
6. `npm run check` (sous le verrou Playwright) doit finir à 0 défaut.
