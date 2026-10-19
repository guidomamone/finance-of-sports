# Cierre de la rama datos-sourcing (worktree fos-datos), sesión Datos 2

Lo anterior al merge del 2026-10-18 ya pasó a TODO y CHANGELOG (copia en `Admin/Archive/sesion-datos-sourcing-2026-10-18-f.md`).

## Después del merge del 2026-10-18 (Datos 2)

### Qué cambió (CHANGELOG)

- **273 (a): camisetas de la página del club, escritas** (ok de Guido a la muestra): `estadio-sponsor.mjs --escribir` desde la caché
  (`_clubes.json`), sponsor o marca en 46 ejercicios con su fuente en `club`. `data/sponsors.js` suma 73 entradas con fuente propia (de
  1001 ejercicios: sponsor 89%, marca 93%). Verificado con node que la fuente de cada campo resuelve a la página del club (Sporting CP
  2001, Almagro 2021, Alianza Lima 2022). ASSET_V 1309. No se pudo mirar en pantalla: el servidor local (puerto 8971) lo tenía otra sesión.
- **252: Gladbach y Stuttgart (ok de Guido para el formulario).** El Unternehmensregister y el Bundesanzeiger no respondieron hoy
  (timeout desde la terminal y "navigation failed" en el navegador). Una búsqueda web no encontró el Jahresabschluss 2024/25 de ninguno
  de los dos en sus sitios; VfB publica solo la nota con las cifras de la asamblea. Quedan "a revisar" para la próxima revisión mensual.

### Qué queda (TODO)

- 273 (a): ~110 ejercicios sin sponsor, a mano con fuente en `tools/contexto-manual.json` (lista: `node tools/estadio-sponsor.mjs
  --ensayo --detalle`).
- 252: Gladbach y Stuttgart en el Unternehmensregister cuando vuelva a responder.

### Qué deja de ser cierto en ESTADO

- "Estadio, capacidad, sponsor…": la página del club ya es la tercera fuente para sponsor y marca (`--camisetas`), escrita.

## Después del merge de las camisetas (2026-10-18)

### Qué cambió (CHANGELOG)

- **273 (a): 52 datos a mano con fuente** en `tools/contexto-manual.json` (pedido de Guido: que los busque Claude). Cinco subagentes
  Sonnet buscaron sponsor y estadio por temporada con cita; se revisó todo antes de cargar: lo que venía solo de un resumen de buscador
  de footballkitarchive (que pide verificación anti-bot) se confirmó con una segunda fuente o quedó afuera (Torreense 2022, Fortaleza
  CEIF 2023, Lierse 2025); AEL Larissa, verificado en el wikitext de su página (revisión 1380860630). "sin sponsor" (la convención del
  archivo) solo donde la fuente lo dice: Fortaleza CEIF 2017, Lazio 2020, Sochi 2021-2022, AEL 2017-2018, Harju 2025; no donde la tabla
  solo deja la celda en blanco (Kuressaare, Tammeka, Levadiakos 2019). Ejercicios sin estadio o sin sponsor: 110 → 80 (estadio 100%,
  sponsor 92%). ASSET_V 1312.
- **252: Gladbach y Stuttgart.** El ejercicio 2025 de los dos existe (cifras presentadas en las asambleas de 2026; prensa anotada en
  sus notas de sourcing solo como confirmación), pero el registro alemán publica a los ~13 meses del cierre (Gladbach 2024: 20/01/2026
  según North Data), así que todavía no está. `tools/ejercicios-nuevos.mjs` espera 13 meses para los clubes que van por el
  Unternehmensregister (antes los mandaba "a revisar" a los 4).

### Qué queda (TODO)

- 273 (a): 80 ejercicios sin sponsor, sin fuente que lo nombre (Ferroviária, Novorizontino, Goiás, Orenburg, Felgueiras, rusos y
  estonios de ascenso...); `node tools/estadio-sponsor.mjs --ensayo --detalle`. Akron 2022 (1xStavka) y Baltika 2024 (Rostec) tienen
  sponsor con fuente pero no entran: ya tienen entrada manual por el estadio con otra fuente, y una entrada lleva una sola. Mejora
  posible: fuente por campo en `contexto-manual.json`.
- 252: Gladbach y Stuttgart 2025, en el Unternehmensregister desde enero de 2027.

## Después del merge de los sponsors a mano (2026-10-18)

### Qué cambió (CHANGELOG)

- **273 para Bélgica (pedido de la principal: la compuerta frenaba 22 años del lote 92).** Los escalones automáticos no alcanzan
  (`--camisetas` necesita que la página de temporada enlace al club, y las listas de esas ligas no están guardadas; `--local` no tiene
  las ligas belgas). A mano con fuente en `tools/contexto-manual.json`: OH Leuven 2022-2024 (tabla de sponsors de su página en
  nl.wikipedia, revisión 72035336), Beerschot 2022 y 2024, Lierse SK 2023 y 2024, Lommel SK 2024 y RWDM 2024 (tablas de Eerste klasse
  A/B en nl.wikipedia, que traen estadio y hoofdsponsor), Lierse 2020 (lierse.com), Patro Eisden 2024 (Limburgnieuws), y estadio de
  Lierse 2019-2020, Lokeren-Temse 2023-2024 y Patro Eisden 2017-2024 (páginas de los clubes). El estadio va también donde la temporada lo
  daría, así la compuerta pasa con o sin lista de liga. Medido con la compuerta (`--club --anio`, sin escribir): de 23 años, 11 pasan.
- **`contexto-manual.json` acepta una fuente por campo** (`fuentes: { campo: url }` → `fuentesManual` en `data/contexto/`; la usan
  `js/contexto.js` y `generate-sponsors.js`). Entran Akron 2022 (1xStavka) y Baltika 2024 (Rostec), que tenían el estadio con otra
  fuente. Toda entrada manual lleva ahora `manual` y `fuenteManual` (antes, sin página de temporada, no: y `generate-sponsors.js` no la
  sumaba al índice). ASSET_V 1314.

### Qué queda (TODO)

- 273 Bélgica: 12 años de ligas amateur sin sponsor con fuente (Lierse SK 2019, Patro Eisden 2015 y 2017-2023, RWDM 2019,
  Lokeren-Temse 2023-2024; Patro 2015 y RWDM 2019 también sin estadio). Las páginas de esas ligas en Wikipedia no tienen columna de
  sponsor y no hay prensa que lo nombre. Decisión para Guido: dejarlos frenados, o que la compuerta acepte sin sponsor un año de liga
  amateur.
