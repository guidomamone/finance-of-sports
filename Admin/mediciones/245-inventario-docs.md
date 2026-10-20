# To-do 245, fase 2: inventario de documentos y comentarios que cambian (DOCS 1, 2026-10-20)

Qué es: la lista de cambios que se aplica **el día de la fase 2** (el JSON pasa a ser la fuente y el `data/<país>/<id>-data.js` se genera desde ahí).
Hoy NO se aplica nada: describiría algo que no existe. Las skills no se editan sin el ok de Guido; los `Admin/*.md` los aplica quien haga la fase 2.
Se midió con grep sobre `CLAUDE.md`, `.claude/skills/**`, `Admin/*.md` vivos y los comentarios de `tools/` y `js/`. No entran `Admin/CHANGELOG.md`,
`Admin/finance-of-sports-project.md`, `Admin/dudas-por-club.md` ni `Admin/Archive/`: son historia (lo que decían entonces), no se reescriben.

## Decisiones de la fase 2 que este inventario da por tomadas (si Guido decide otra cosa, cambia el texto)

- **D1. Dónde vive el JSON fuente.** Abajo se escribe `<ruta-json>` (propuesta: `data/<país>/<id>.json`, al lado del JS generado; `Generados/datos-json/` es solo la
  salida de la fase 1 y no se publica). Hay que fijarla antes de tocar los textos.
- **D2. El `-data.js` queda como archivo GENERADO** que el sitio sigue cargando igual (`loadClubData()` no cambia). Por eso las notas de `js/` y de `ARQUITECTURA.md`
  sobre carga bajo demanda, `?v=` y `CLUB_GENERIC_DATA` NO cambian. Si en cambio el sitio pasara a leer el JSON directo, se suman las filas marcadas **[si el sitio lee JSON]**.
- **D3. El JSON no admite comentarios**: la regla "el data file no lleva comentarios" (`CONVENCIONES-DATOS.md:8`) pasa a valer para el JSON y el JS generado lleva solo una
  cabecera fija ("GENERADO desde <ruta-json>, no editar").
- **D4. Los nombres de campo cambian** (diccionario de `tools/json-datos.mjs`): en lo que se EDITA (JSON) se habla en inglés snake_case; en lo que describe el
  motor del sitio (`js/`, mientras el JS generado conserve los nombres de hoy) se mantienen los de hoy. Cada fila dice cuál va.

Diccionario resumido (el completo está en `tools/json-datos.mjs`): `rawLabel`→`label`, `normalizedCategory`→`category`, `amountNative`→`amount`, `disclosureLevel`→`disclosure`,
`fiscalYearMeta[y]`→`years[].…`, `sourceId`→`source_id`, `reportType`→`report_type`, `gestionId`→`management_id`, `fxRef/fx/fxSource`→`fx.{ref,rate,source}`,
`netInterest/tax/profitOnPlayerSales/assetSales/grossDebt/cash/staffCost`→`financial.*`, `officialTotalRevenue/Expenses/PAT`→`official_totals.{revenue,expenses,net_result}`,
`sinDesglose/extraRows/incluidoEn`→`adjustments.{no_breakdown,extra_rows,included_in}`, `gestionesByClub[id]`→`management[]`, `memberCountByClub[id]`→`members`,
`presupuestoOverlayByYear`→`budget_overlay`, `pasesData/resultadosData/titulosData`→`squad_transfers/results/titles` (los tres últimos van en `legacy_extras`).
La **unidad** deja de ser implícita: `unit: {scale: 1000000, label: "millions of currency"}` en cada archivo.

---

## A. `CLAUDE.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 7 | Sobre qué se publica: no nombra el formato de los datos. | **Sin cambio de fondo.** Si el JSON fuente vive en `data/` y se publica entero, aclarar una frase: "el JSON fuente de cada club se publica a propósito (es el dato abierto); `Generados/` sigue sin publicarse". Si D1 lo deja en otra carpeta interna, nada. |

Nada más en `CLAUDE.md` nombra `-data.js`, los nombres de variable ni la unidad. (La regla "Precisión antes que velocidad" nombra `verifyTieOuts()` y `auditAll()`, que no cambian.)

## B. Skills (`.claude/skills/`) — necesitan el ok de Guido

### B1. `club-data-mapping/SKILL.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 35 | Ejemplo de por qué la categoría la fija `category-map.js`: "…`racing-data.js` usaba `player_sales`". | Es historia de un caso; se puede dejar. Opcional: "…un data file usaba…" para no atar el ejemplo al nombre del archivo. |
| 42 | Forma de una línea: `{ rawLabel, normalizedCategory, amountNative, disclosureLevel, items? }`. | `{ label, category, amount, disclosure, items? }`; `amount` en millones de la moneda del club (la `unit` del archivo). Agregar: "el JSON usa estos nombres; el JS generado sigue con los de hoy" **(D4)**. |
| 56 | `suggest-category-precedent.mjs`: "nunca escribe en `data/<país>/<club>-data.js`". | "…nunca escribe en `<ruta-json>`". |
| 109, 113 | Intereses netos → campo `netInterest` "de `fiscalYearMeta` del año"; impuestos "van a `fiscalYearMeta`". | "…campo `financial.net_interest` del año en el JSON" / "…van a `financial` del año, no a las líneas". |
| 122 | "Boca 2025 (`bocaRevenueLinesByYear`/`bocaExpenseLinesByYear`)". | "Boca 2025 (`revenue`/`expenses` de `years[2025]` en `boca.json`)". Los nombres `boca…ByYear` ya no existen en la fuente. |
| 145 | "Nunca se guarda un valor ya convertido: se guarda `amountNative` y la conversión pasa al renderizar." | "…se guarda `amount` (en la moneda del documento, millones) y la conversión pasa al renderizar." **El principio no cambia; solo el nombre.** |
| 185–188 | `fiscalYearMeta[year].gestionId` y las entradas de `gestionesByClub` son documentación; el selector lee `Object.keys(fiscalYearMeta)`. | `years[].management_id` y `management[]` son documentación; el selector sigue leyendo los ejercicios del motor (`Object.keys(fiscalYearMeta)` en el JS generado). Reemplazar "no agregues entrada a `gestionesByClub`" por "no agregues entrada a `management[]`". |
| 212, 215 | Buckets de pantalla: fila `[line.rawLabel, line.amountNative]` y tupla `[rawLabel, amountNative, line.items || null]`. | Es código del motor (JS generado conserva los nombres): **sin cambio** salvo que D2 cambie; si el motor pasa a leer el JSON, `[line.label, line.amount, …]`. |

### B2. `club-data-mapping/referencia/fx.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 10–11 | "Se guardan los montos en la moneda NATIVA (`amountNative`, en millones de esa moneda…), con `fiscalYearMeta[year].currency`/`fx` diciendo en qué moneda está y con qué tipo de cambio". | "…(`amount`, en millones de esa moneda: `unit.scale` = 1000000, escrito en el archivo)…, con `years[].currency` y `years[].fx` diciendo…". Es el lugar donde hoy se afirma la unidad implícita: tiene que remitir a `unit`. |

### B3. `club-data-mapping/referencia/formato-simplificado.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 61 | Cita `data/ar/boca-data.js`, línea "Fútbol Profesional — Remuneraciones y primas". | `boca.json`, misma línea. Es una referencia a ejemplo. |
| (resto) | Habla de `grossDebt` en general. | `financial.gross_debt` en el JSON. Revisar que no diga "fiscalYearMeta.grossDebt" (el grep no lo encontró; confirmar al aplicar). |

### B4. `club-sourcing/SKILL.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 79 | `club-data-mapping/referencia/formato-simplificado.md, "grossDebt"`: "ambas asumen implícitamente el criterio…". | La palabra "implícitamente" acá habla de otro criterio (no de la unidad). **Sin cambio.** Se lista solo porque el grep la encontró. |

### B5. `start-session-finance-of-sports-project/SKILL.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 170 | `tools/audit.js` chequea "`sources{}` y los `fiscalYearMeta`". | "…las fuentes (`sources[]`) y los ejercicios (`years[]`) del JSON" (según lo que haga `audit.js` con el JSON). |
| 172 | `generate-club-index.js` "regenera, desde los propios `data/<club>-data.js`, la sección…". | "…desde el JSON de cada club (`<ruta-json>`)…". Y arreglar de paso la ruta: falta el `<país>/` (ver hallazgo del informe). |
| §4 (verificación) | Habla de `auditAll()` y `?audit=1`: no nombra el formato. | **Sin cambio.** Agregar una línea nueva al flujo de carga: "después de editar el JSON, corré `node tools/<generador>` para regenerar el JS y `node tools/ida-y-vuelta.mjs`". |

### B6. `escala-finance-of-sports/SKILL.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 36, 51, 220, 227 | "Un `data/<país>/<club>-data.js` se carga bajo demanda…", "ya es 1 archivo por club". | Sigue siendo cierto mientras el sitio cargue el JS generado (D2). Agregar: "el JSON fuente pesa ~ lo mismo y no lo baja el visitante". **[si el sitio lee JSON]**: el peso por visita pasa a ser el del JSON. |
| 66, 174, 227 | Comandos de conteo: `ls data/*/*-data.js \| wc -l`, `ls data/*/*-data.js \| sed …`. | Contar los JSON: `ls <ruta-json>/*/*.json \| wc -l` (el sed de la línea 174 que saca el sufijo `-data.js` pasa a sacar `.json`). Si el JS generado se sigue publicando, los comandos de hoy siguen dando lo mismo. |
| 128 | `fiscalYearStart` no se mueve al data file "porque obliga a bajar todos". | `club.fiscal_year_start` está en el JSON (esquema) pero el motor lo sigue leyendo de `clubs.js`. Aclarar que la copia del JSON es de solo documentación/exportación y que la fuente de verdad de la etiqueta sigue siendo `clubs.js` — **dos copias del mismo dato**: decidir cuál manda (ver hallazgo del informe). |
| 167 | "ningún `data/<país>/<club>-data.js` loguea nada al ejecutarse". | Con el JS generado: el generador no emite `console.*`. Agregar al `validar-esquema-json` esa regla, o dejar la nota. |
| 212, 236 | `gestionesByClub{}` (nombre de variable). | `management[]` si se habla del JSON; en el JS generado sigue `gestionesByClub`. Aclarar cuál. |
| Falta | No hay un punto nuevo. | Sumar a la tabla del mapa: "313 archivos JSON + 313 JS generados = doble cantidad de archivos por club" (si se trackean los dos) — medir con el comando que corresponda. |

### B7. `club-or-year-onboarding/SKILL.md` y `club-nuevo.md`

El grep **no** encontró nombres de variable en estos archivos, pero describen el flujo `cargar.mjs --escribir` ("inserta el año en las tres estructuras del data file"). Al aplicar:
revisar que digan que `cargar.mjs`/`alta-club.mjs` escriben el **JSON** y regeneran el JS (no editan el JS). Buscar con `grep -n "escribir\|esqueleto" ` en ambos y en `Admin/PIPELINE.md`.

### B8. `auditoria-finance-of-sports/SKILL.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 132 (eje `docs`) y la tabla de ejes | Sin nombres de formato. | Agregar al eje `datos`: "el JSON de cada club valida contra el esquema (`node tools/validar-esquema-json.mjs`) y `node tools/ida-y-vuelta.mjs` da todo idéntico". Es un chequeo automatizable: mejor como chequeo de `tools/audit.js` (ver hallazgo del informe), y la skill solo dice que existe. |
| §4 (`tokens`) | "Duplicación de documentación: el mismo dato de un club puede vivir en… la cabecera de su `data/*.js`…". | "…en el JSON del club…". Y la cabecera del JS generado ya no es una copia a mano. |

### B9. `votacion-de-criterios`, `club-outreach`

Sin referencias al formato (el grep no encontró nada).

## C. `Admin/*.md`

### C1. `Admin/CONVENCIONES-DATOS.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 8 | "**`data/<país>/<club>-data.js` NO LLEVA COMENTARIOS.** Ese archivo se publica entero…" | "**El JSON de un club (`<ruta-json>`) no lleva comentarios** (JSON no los admite) **y el `-data.js` es GENERADO: no se edita a mano.** La evidencia va a `Admin/carga-clubes/<club>.md`." |
| 16 | "`gestionesByClub{}` y `memberCountByClub{}` se autoregistran desde el `data/<país>/<club>-data.js`." | "…`management[]` y `members` están en el JSON del club; el generador los emite como `gestionesByClub`/`memberCountByClub` en el JS". |
| 91 | `(trabaja sobre fiscalYearMeta)` y `deudaNoDesglosada(c)`. | Es código del motor: sin cambio mientras el JS conserve los nombres. |
| 131 | "…nombra el archivo de datos (`data/<país>/<clubId>-data.js`, por convención de…". | "…(el JSON `<ruta-json>/<id>.json`; el JS se genera con el mismo nombre)". |
| 306 | `fiscalYearMeta` del año se agrega `incluidoEn: {…}`. | "…al año del JSON se agrega `adjustments.included_in: { <categoría en 0>: '<donde está>' }`". |
| (nuevo) | La unidad no está escrita en ningún lado. | Nueva regla: "Los importes del JSON están en millones de la moneda del club (`unit.scale = 1000000`). No se pre-convierten. `amount` negativo en `expenses`, como hoy." |

### C2. `Admin/ARQUITECTURA.md` (el más afectado; 46 líneas)

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 19–22 | "TODOS los datos de club viven en su propio `data/<país>/<club>-data.js`… un archivo por club…" | Agregar: "…ese archivo es GENERADO desde `<ruta-json>/<id>.json` (la fuente editable)". |
| 31, 44–45 | `loadClubData()` inyecta el `data/<país>/<club>-data.js`; "gestiones por club (`gestionesByClub{}`), socios por club (`memberCountByClub{}`)". | Sin cambio en el motor; aclarar que esos globals los emite el generador desde `management[]` y `members`. |
| 77, 106, 116 | "los `data/<país>/<club>-data.js` de toda una liga en vivo"; "sin bajar un solo `…-data.js`". | Sin cambio (D2). |
| 90 | "data/ar/river-data.js, data/ar/racing-data.js: datos de esos dos clubes… con comentarios explicando qué es real". | **Ya está desactualizado hoy** (los data files no llevan comentarios; ver hallazgo del informe). Con el JSON: "datos de esos dos clubes (ver `ar/river.json`)". |
| 201–202 | "{rawLabel, normalizedCategory, amountNative, disclosureLevel} (revenueLinesByYear/expenseLinesByYear, ver data/<país>/<club>-data.js)". | Dar las dos formas: JSON `{label, category, amount, disclosure}` en `years[].revenue/expenses`; JS generado con los nombres de hoy. |
| 220, 249–250 | `assetSales/netInterest/tax … (fiscalYearMeta)`; "sumar esos 3 campos en su propio data/<país>/<club>-data.js". | "…`financial.*` / `official_totals.{revenue,expenses,net_result}` del año en el JSON del club". |
| 269–271 | Lista de funciones del motor (`presupuestoOverlayFor`, `pasesDataForClub`…). | Sin cambio (motor). |
| 305, 310 | "`amountNative` tiene que estar en la moneda NATIVA… sin convertir". | "`amount`… (JSON) / `amountNative` (JS generado)". Cita la unidad: millones. |
| 321–322 | "Datos del club, en su propio `data/<país>/<club>-data.js`… `<club>RevenueLinesByYear`,…" | "Datos del club, en su `<ruta-json>/<id>.json` (esquema: `Admin/mediciones/245-esquema.md`)". Los nombres `<club>RevenueLinesByYear` pasan a ser del generador. |
| 355–362, 433 | Lazy-loading: "el archivo NO va en la lista de `<script src>` del `<head>`… solo tiene `clubs.js`/`category-map.js`/`boca-data.js`/…". | **Ya está desactualizado hoy** (ver hallazgo del informe: el `<head>` no tiene `boca-data.js` y la ruta lleva `<país>/`). Corregirlo en la misma pasada. |
| 382–389 | Paso 1c: al final del data file se escribe `Object.assign(sources, {…})`, `gestionesByClub.<club> = {…}`, `memberCountByClub.<club> = …`. | Reemplazar el paso por "en el JSON del club completar `sources[]`, `management[]` y `members`; el generador emite las tres asignaciones". Los ejemplos de código del bloque se borran o pasan a "lo que emite el generador". |
| 397–399, 664 | `gestionesByClub[clubId]` "degradan solos a 'Sin dato'". | Sin cambio en el motor; "management[] vacío" en el JSON. |
| 406–408 | `CLUB_GENERIC_DATA[clubId].resultadosData` se autorregistra en el data file. | El generador emite `window.CLUB_GENERIC_DATA.<club> = {…}`; en el JSON esos datos viven en `legacy_extras`. |
| 464, 467, 479 | Presupuesto: líneas `{… amountNative, items?}`; `presupuestoOverlayFor()`. | `budget_overlay` en el JSON (mismas líneas con los nombres nuevos). |
| 513 | "CONVENCIÓN DE ARCHIVOS: un club = un `data/<país>/<clubId>-data.js`, cargado bajo…". | "un club = un `<ruta-json>/<id>.json` fuente + su `-data.js` generado, cargado bajo…". |
| 578, 617 | "lo que vive adentro de `data/<país>/<club>-data.js`, que es justamente lo que no se carga"; "comentario de cabecera de cada data file". | La cabecera del JS ya no es un comentario escrito a mano (D3). Reescribir 617 si habla del techo medido en cabeceras. |
| 731 | "`fx` (en cada `fiscalYearMeta[year]`) es el tipo de cambio que declara ESE documento". | "`years[].fx` (`fx.rate`/`fx.source`)…". |

### C3. `Admin/PIPELINE.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 597 | La entrada de la fase 1 (exportar / validar / ida y vuelta). | Pasarla de "solo lectura, fase 1" a la descripción de la fase 2: el flujo de carga escribe el JSON y regenera el JS. |
| 681 | "`data/<país>/<club>-data.js` no lleva comentarios (se publica). `cargar.mjs --escribir` deja en…" | "…el JSON no lleva comentarios; `cargar.mjs --escribir` escribe en el JSON y deja la evidencia en…". |
| 801 | "`cargar.mjs` la escribe en `fiscalYearMeta.incluidoEn`". | "…en `adjustments.included_in` del año (JSON)". |
| 1098–1099 | "los datos que se vayan a cargar a `<club>RevenueLinesByYear`/`<club>ExpenseLinesByYear`/etc. (ver `data/ar/river-data.js` para el shape…)". | "…a `years[].revenue`/`expenses` del JSON (ver `ar/river.json`)…". |
| 312, 477 | "residuo implícito" / "respuesta implícita". | Otro sentido de "implícito"; sin cambio. |
| Toda sección de "etapa 8, cargar" | Describe `cargar.mjs --escribir` como "inserta el año en las tres estructuras del data file". | Revisar la sección completa al aplicar (el grep no la capta con estas palabras). |

### C4. `Admin/PANTALLA.md`

| Línea | Dice hoy | Tendría que decir |
|---|---|---|
| 152, 534, 775, 793, 896 | "`data/<país>/<club>-data.js` del club", "lazy-loaded", "NO baja ningún `data/<país>/<club>-data.js`". | Sin cambio (D2: el sitio sigue cargando el JS). |
| 323 | `data/ar/racing-data.js`, `racingPresupuestoOverlayByYear[2020]`. | Ejemplo histórico; "ver `ar/racing.json`, `budget_overlay[2020]`". |
| 488 | `gestionesByClub` (apellidos de presidentes). | `management[]` en el JSON. |
| 531–532 | `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub`. | Motor: sin cambio. |
| 660 | "viven en el `data/<país>/<club>-data.js` de cada club, en `presupuestoSupuestosByYear`…". | "…en el JSON de cada club, en `legacy_extras.presupuestoSupuestosByYear` (y los otros dos), que conservan los nombres de hoy sin traducir (`json-datos.mjs`, `EXTRAS`). |
| 722 | "Escalera: `cierre` del fiscalYearMeta, la fecha del `fxRef`…". | El cierre ahora es `period_end` explícito por ejercicio (decisión 4 del esquema). **Cambio de fondo**: la escalera de `cierreDelClub` se calcula una vez al exportar y queda escrita; ya no se recalcula en cada lectura. |
| 780 | "`pasesData`" (Mercado de Pases se borró, to-do 303). | `squad_transfers` ya no tiene uso: ver hallazgo del informe (candidato a no migrar). |

### C5. Otros `Admin/*.md`

| Archivo:línea | Dice hoy | Tendría que decir |
|---|---|---|
| `Admin/fuentes-externas.md:23` | Tabla: Pases → `data/ar/*-data.js`, `pasesData`. | Se borró Mercado de Pases: fila obsoleta hoy; con el JSON, `squad_transfers`. |
| `Admin/fx-cotizaciones.md:10, 28, 94` | "vivían escritas a mano en data/ar/argentinosjuniors-data.js"; "fx literal + fxSource:'document_close' en data/pe/alianzalima-pe-data.js". | Historia: "…en el JSON del club (`fx.rate`, `fx.source`)". Los nombres `fx`/`fxSource` → `fx.rate`/`fx.source`. |
| `Admin/ESTADO.md:216, 256–258` | `gestionesByClub`; "`data/`: lo que el sitio carga. Un archivo por club en `data/<país>/<clubId>-data.js`". | **De la principal.** Con el JSON: agregar "la fuente editable es `<ruta-json>/<id>.json`; `data/<país>/<id>-data.js` es generado". |
| `Admin/TODO.md:171–175` | El 245 (con la fase 2 pendiente). | **De la principal.** Se borra al cerrar la fase 2 (regla: lo resuelto no se marca). |
| `Admin/ESTADO-clubes.md` | Generado por `generate-club-index.js`. | Se regenera solo; no se toca a mano. |

## D. Comentarios de `tools/` y `js/`

Los comentarios de las tools que dicen "escribe en el `data/<país>/<club>-data.js`" son la mayoría. Si la fase 2 hace que el JSON sea la fuente, cada tool que **escribe** en el
data file cambia de código (no solo de comentario). Esas son las únicas que importan para el comentario, porque el comentario cambia con el código. Las que **solo leen**
el data file con `vm` (la mayoría) pueden seguir leyendo el JS generado y su comentario sigue siendo cierto.

### D1. Tools que ESCRIBEN el data file (el código y el comentario cambian juntos)

| Archivo:línea | Dice hoy | Tendría que decir |
|---|---|---|
| `tools/cargar.mjs:27, 37, 55, 62, 723, 770, 1063, 1073` | Escribe en las tres estructuras del data file; `netInterest`/`tax` al `fiscalYearMeta`; `fiscalYearMeta.incluidoEn`; `sinDesglose`. | Escribe en el JSON (`years[].revenue/expenses`, `financial.*`, `adjustments.*`) y regenera el JS. |
| `tools/alta-club.mjs:182–184, 1422` | "`data/<país>/<id>-data.js`: el ESQUELETO, sin comentarios… el `fiscalYearMeta` propuesto". | El esqueleto es el JSON (`club`, `unit`, `schema_version`, `years: []`). |
| `tools/caja-deuda.mjs:3, 62, 1230` | Escribe `fiscalYearMeta.cash`/`.grossDebt`/`.staffCost` en el data file. | `financial.cash`/`gross_debt`/`staff_cost` en el JSON. |
| `tools/dentro-de-otro.mjs:4, 35, 129–130` | Escribe `incluidoEn` en el bloque del año de `<club>FiscalYearMeta`, y "saca todas las marcas que escribió esta tool (y su comentario)". | Escribe `adjustments.included_in`; el "y su comentario" desaparece (JSON sin comentarios). |
| `tools/ajustes.mjs:47, 188` | "cargar.mjs lo escribe en `fiscalYearMeta.incluidoEn`". | "…en `adjustments.included_in`". |
| `tools/archivo/mover-comentarios-data.mjs` | Herramienta archivada (mueve comentarios del data file a la evidencia). | Queda archivada; sin cambio. |

### D2. Tools que LEEN el data file (solo comentario; siguen válidos mientras se lea el JS generado)

`tools/data-clubes.js:4–14` (arma la ruta `data/<país>/<id>-data.js`: es el lugar donde cambia la ruta si se agrega `<ruta-json>`, con una función `rutaJson(clubId)` al lado de
`rutaData`), `tools/generate-club-index.js:16–41, 208, 239–242`, `tools/generate-rankings.js:8, 23, 195`, `tools/generate-fuentes-page.js:202`, `tools/audit.js:575, 905, 968, 1142, 1268`,
`tools/chequeos-gratis.mjs:37–39`, `tools/padres-filas.mjs:6`, `tools/paginas-con-numeros.mjs:15`, `tools/memoria-categorias.mjs:7, 69`, `tools/perfil-clubes.mjs:58`,
`tools/suggest-category-precedent.mjs:8`, `tools/evidencia-club.mjs:4`, `tools/cola.mjs:198`, `tools/altas-registro.mjs:25, 97`, `tools/carpetas-clubes.mjs:15, 26`, `tools/quien.mjs:9, 76`,
`tools/lote.mjs:245`, `tools/cierre-ejercicio.js:5`, `tools/vocabulario.mjs:579, 703–704`.
Para estas: **decidir en la fase 2 si leen el JSON (más limpio: sin `vm`) o el JS generado.** Si pasan al JSON, el comentario cambia a "el JSON del club" y el código se simplifica.
Si se quedan con el JS, el comentario no cambia, pero hay que agregar a `tools/audit.js` el chequeo de que el JS generado coincide con el JSON (ver informe).
`tools/cierre-ejercicio.js:5` merece mención aparte: su comentario dice que la escalera empieza por "el campo `cierre` de su fiscalYearMeta". Con `period_end` explícito en el JSON,
la tool pasa a ser quien lo calcula al exportar, y la escalera se vuelve una nota histórica.

### D3. `tools/json-datos.mjs`, `exportar-json.mjs`, `ida-y-vuelta.mjs`

Su cabecera dice "SOLO LECTURA. No toca data/ ni js/" y "La fase 2 NO está hecha; `generarJs()` es el prototipo". Al aplicar la fase 2: sacar "SOLO LECTURA", cambiar
"prototipo" por "generador", y `exportar-json` pasa a ser una herramienta de migración de una sola vez (se corre una vez y se archiva en `tools/archivo/`).

### D4. `js/` (comentarios del motor)

`js/principal.js:1, 17, 391, 838`, `js/i18n.js:10`, `js/finanzas-calc.js:11, 28, 93, 208, 256`, `js/finanzas-render.js:171, 480, 653, 680`, `js/finanzas-anios.js:27`,
`js/liga.js:9, 177, 874`, `js/selector.js:1573`: describen el JS que el sitio carga. **Sin cambio** si D2 (el sitio sigue cargando el JS generado).
Dos matices: `js/principal.js:17` ("el archivo de CUALQUIER club es SIEMPRE `data/<país>/<clubId>-data.js`") sigue cierto; `js/finanzas-calc.js:93` ("`cierre` en su fiscalYearMeta (a mano)")
cambia si `period_end` pasa a ser un campo emitido por el generador.
**[si el sitio lee JSON]**: todas estas filas cambian a los nombres nuevos y `loadClubData()` pasa de inyectar un `<script>` a hacer `fetch`; es un cambio de código grande (afecta `CLUB_GENERIC_DATA`
y todos los globals), no solo de comentario.

## E. Lo que se agrega (no existe hoy)

1. `Admin/CONVENCIONES-DATOS.md`: regla de la unidad (ver C1).
2. `Admin/PIPELINE.md`: sección "Datos como JSON" con el flujo editar JSON → generar JS → ida y vuelta → `auditAll()`.
3. `Admin/ARQUITECTURA.md`: sección del esquema (o un puntero a `Admin/mediciones/245-esquema.md`, que pasaría de `mediciones/` a `Admin/` propiamente dicho al quedar vigente).
4. `tools/audit.js`: chequeo `json-js-desfasado` (el JS generado no coincide con el JSON) y `json-no-valida` (P1).
5. `start-session` §1/§4: una línea en el arranque que diga cuál es la fuente.
