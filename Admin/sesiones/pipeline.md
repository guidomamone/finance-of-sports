# Cierre de la rama `pipeline` (Pipeline 8: to-do 333, lo no bloqueante de la revisión del 245 y el 246)

Se completa mientras se trabaja. La sesión principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- `tools/generar-data.mjs --check`: además de recorrer los JSON, da error por un `data/<iso>/*-data.js` sin su JSON y por un id de `data/clubs.js` sin `<id>.json` (audit.js lo recoge como P1 `json-js-desfasado`).
- `tools/worktree.mjs mergear`: un `data/<iso>/*-data.js` en conflicto ya no es "conflicto real": gana el JSON mergeado y después del merge corre `generar-data.mjs` (y lo agrega al commit). Un conflicto en el JSON sigue frenando.
- `tools/renombrar-ids.mjs --verificar`: ignora la línea de ejemplo de `CLAUDE.md` con `boca`; da 0 problemas.
- Racing: título de la fuente `racing-ar-placeholder` reescrito en el JSON (el -data.js se regeneró).
- `js/cuenta.js`: `stateKey` normaliza el id de club con `window.CLUB_ALIASES` (club, pares de Comparar, clubes de ligaSim); las claves de ids ya nuevos no cambian. ASSET_V 1521 -> 1522 (por eso se regeneran fuentes/*.html y sitemap).

## Medición (gratis)

- `generar-data --check`: 319 clubes, 0 desfases; `renombrar-ids --verificar`: 0 problemas; `audit.js`: P0 0 · P1 0.
- Ningún año cargado cambia: el único diff de datos es el título de la fuente de Racing.
- Probado: `stateKey` con `boca` y `boca-ar` da la misma clave (finanzas, Comparar). No probado en vivo: el merge de worktree con un conflicto real en un -data.js.

## Qué queda (para TODO)

- Las filas ya guardadas en `saved_searches` con el id viejo conservan su `state_hash` viejo; reabrir y guardar una da una fila nueva (arreglarlo del todo pide una migración SQL en Supabase).
- Borrar el 333 de TODO.

## 334 (Pipeline 9)

- `tools/suma-entidades.mjs`: `combinar()` pone «AS · » / «Elite · » en cada etiqueta (renglones y financiero; el impuesto no, como está publicado). El nombre corto sale de los nombres de los dos PDFs del ajuste (`nombresCortos()`).
- Medido: `cargar.mjs --reemplazar --escribir` sobre Vålerenga AS 2022 y 2023 deja `data/no/valerenga-no.json` byte a byte igual. Ålesund no tiene ningún `suma-con` cargado (no cambia nada); si se carga, sus nombres saldrían «Aalesund Fotball AS» y «Fotballklubb FLI» (sin tramos en común).
- Deja de ser cierto: el TODO 334 (borrarlo).
