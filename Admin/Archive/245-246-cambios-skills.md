# Datos 3: cambios propuestos a las skills (246 y 245 fase 2). NO aplicados.

Regla de todos los cambios: el motor del sitio y el data file generado conservan los nombres de siempre (`rawLabel`, `amountNative`, `fiscalYearMeta`…); lo que cambia es dónde se edita (el JSON) y cómo se llaman los campos AHÍ (`label`, `amount`, `financial.*`).

## start-session-finance-of-sports-project/SKILL.md
1. §4 y §7, línea 143 (`generate-fuentes-page.js`): «desde `sources{}` y los `fiscalYearMeta`» → «desde las fuentes (`sources[]`) y los ejercicios (`years[]`) del JSON de cada club».
2. Línea 145 (`generate-club-index.js`): «desde los propios `data/<país>/<club>-data.js`» → «desde el JSON de cada club (`data/<país>/<club>.json`)» (de paso la ruta ya lleva `<país>/`).
3. §5, después del bloque «SI TOCASTE DATOS DE UN CLUB, HAY ARCHIVOS GENERADOS QUE REGENERAR», una línea nueva: «**La fuente de un club es su JSON** (`data/<país>/<club>.json`): a mano, se edita ese archivo y se corre `node tools/generar-data.mjs` (el `-data.js` se genera, no se toca); las tools de carga ya lo hacen solas. `audit.js` lo vigila (`json-js-desfasado`, `json-no-valida`, P1).»
4. §1: sin cambio de fondo (se sigue leyendo ESTADO).

## club-data-mapping/SKILL.md
5. Línea 42 (forma de una línea): «`{ rawLabel, normalizedCategory, amountNative, disclosureLevel, items? }`» → agregar «En el JSON del club los campos se llaman `{ label, category, amount, disclosure, items? }` (`amount` en millones de la moneda del club, `unit.scale = 1000000`); el data file generado y el motor usan los nombres de siempre.»
6. Línea 56 (`suggest-category-precedent.mjs`): «nunca escribe en `data/<país>/<club>-data.js`» → «nunca escribe en `data/<país>/<club>.json`».
7. Líneas 109 y 113: «al campo `netInterest` de `fiscalYearMeta` del año» → «al campo `financial.net_interest` del año (en el JSON; `netInterest` de `fiscalYearMeta` en el data file generado)»; «van a `fiscalYearMeta`» → «van a `financial` del año».
8. Línea 122: «Boca 2025 (`bocaRevenueLinesByYear`/`bocaExpenseLinesByYear`)» → «Boca 2025 (`revenue`/`expenses` de `years[2025]` en `boca-ar.json`)».
9. Línea 145: «se guarda `amountNative`» → «se guarda `amount` (JSON) / `amountNative` (data file generado)».
10. Líneas 185-188 (gestiones): «`fiscalYearMeta[year].gestionId` y las entradas de `gestionesByClub`» → «`years[].management_id` y `management[]` del JSON (`gestionId` y `gestionesByClub` en el data file generado)».
11. Líneas 33-35: el ejemplo «mientras `racing-data.js` usaba `player_sales`» → «mientras un data file usaba `player_sales`» (no atar el ejemplo a un archivo que ya no se llama así).

## club-data-mapping/referencia/fx.md
12. Líneas 10-11: «(`amountNative`, en millones de esa moneda…) con `fiscalYearMeta[year].currency`/`fx`» → «(`amount`, en millones de esa moneda: `unit.scale = 1000000`, escrito en cada archivo) con `years[].currency` y `years[].fx`».

## club-data-mapping/referencia/formato-simplificado.md
13. Línea 61: `data/ar/boca-data.js` → `data/ar/boca-ar.json`.

## escala-finance-of-sports/SKILL.md
14. Líneas 170-177 (bloque «clubId sin país»): reemplazar por «**`clubId`**: todos los ids son `<slug>-<iso2>`; los viejos viven en `data/club-aliases.js` para siempre. `checkClubIds()` de `tools/audit.js` vigila el formato (`clubid-sin-pais`, P1) y el mapa (`alias-roto`, P1).»
15. Línea 128 (`fiscalYearStart` no se mueve al data file): agregar «El JSON lleva una copia en `club.fiscal_year_start`; la verdad sigue siendo `data/clubs.js`, que hace falta antes de elegir un club (`generar-data.mjs --identidad` la refresca).»
16. Líneas 36, 51, 66, 220, 227 (`data/<país>/<club>-data.js`, `ls data/*/*-data.js | wc -l`): siguen siendo ciertas (el sitio carga el JS generado). Agregar en la tabla del mapa una fila: «un club = dos archivos (`<id>.json` fuente + `<id>-data.js` generado), el visitante solo baja el JS».

## club-or-year-onboarding/SKILL.md y club-nuevo.md
17. Donde digan que `cargar.mjs --escribir` / `alta-club.mjs` «escriben el data file», decir que escriben el JSON del club y regeneran el data file (revisar con `grep -n "data file\|esqueleto"`). Hoy no nombran el formato.

## auditoria-finance-of-sports/SKILL.md
18. Eje `datos`: agregar «el JSON de cada club valida contra el esquema y cada `-data.js` es lo que sale de su JSON: lo vigila `audit.js` (P1)». En `tokens`, «la cabecera de su `data/*.js`» → «el JSON del club».

## Sin cambio
`club-sourcing`, `club-outreach`, `votacion-de-criterios`.
