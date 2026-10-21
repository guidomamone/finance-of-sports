# Taxonomía genérica con subcategorías por deporte (to-do 248): plan

Estado: DISEÑO, sin tocar datos ni código. Falta el ok de Guido a las decisiones de la sección 5.

## 1. El problema, medido

Hoy cada línea de un club tiene una sola categoría (`category` en el JSON, `normalizedCategory` en el data file), con valores del fútbol:
`wages_squad`, `player_sales`, `lump_football_operations`… Son 26 valores, en un enum único para ingresos y gastos (`data/schema/club-v1.json`).
No son campos de primer nivel del JSON, pero para quien lea el dato abierto o una API son lo mismo: la única forma de agrupar un club es
con vocabulario del fútbol. Un club de básquet tendría que inventar `wages_squad` o una lista nueva incompatible.

Lo que hay hoy (medido con un `node -e` sobre `data/*/*.json`): 319 clubes, 1.296 ejercicios, 6 presupuestos superpuestos, ~36.000 líneas.
Hay 13 líneas de ingreso con categoría de gasto, ya aceptadas (`categoria-cruzada`, P2 silenciado): 11 `exceptional_items` (Racing 2009-2014,
decisión de Guido en `CONVENCIONES-DATOS.md`; Athletico Paranaense 2024-25) y 2 `admin_general_expense` (Atlético Mineiro 2024-25, costo del
manto vendido).

Tres cosas del código que fijan el diseño:

- **El motor no mira la taxonomía**: `computeYearGeneric()` (`js/finanzas-calc.js`) suma TODO `revenueLines` como ingreso, y de los gastos
  suma listas de categorías fijas escritas a mano: operativos (`wages_squad` + 6 más), no-efectivo (amortización de pases, deterioro,
  depreciación, otras amortizaciones) y `exceptional_items`. Una categoría de gasto que no esté en esas listas desaparece del resultado sin
  error (el comentario de la línea 332 lo avisa; `verifyTieOuts()` lo delata recién al no cerrar).
- **El Formato simplificado ya es casi una capa genérica**: `GENERIC_SIMPLIFIED_REVENUE/EXPENSE_BUCKETS` agrupan categorías en filas, y esa
  lista se sincroniza a mano con `category-map.js`.
- **Toda escritura del JSON pasa por un solo lugar**: `tools/json-datos.mjs` (`aJson`, `deJson`, `validar`, diccionario `LINEA`), usado por
  `club-json.mjs` (todas las tools de carga), `generar-data.mjs`, `ida-y-vuelta.mjs`, `exportar-paquete.mjs` y `generar-schema-json.mjs`. Las
  tools que categorizan (`cargar.mjs`, `categorizar-claude.mjs`, `jev-categorizar.mjs`, `caja-deuda.mjs`, `suggest-category-precedent.mjs`,
  `ajustes.mjs`, `bfo-rusia.mjs`, `nbb.mjs`) trabajan en memoria con `normalizedCategory` y no saben nada del JSON.

## 2. La idea

Dos niveles por línea:

- **`category` (genérica)**: igual para cualquier deporte. Cerrada, corta, pensada para una API y para comparar entre deportes.
- **`subcategory` (del deporte)**: la categoría de hoy, con el MISMO id (`wages_squad`, `player_sales`…). Es la que eligen el pipeline, Jev,
  Claude y la cola de Guido, y la que usa el motor.

**La genérica nunca se elige: se deriva** de un mapa fijo `(deporte, lado, subcategoría) → genérica`. Ninguna tool ni ninguna sesión decide
una genérica; por eso no se reabre ningún criterio de categoría (to-do 101) ni cambia ningún prompt, ningún `.categorias.json` ni
`Admin/registros/categorias-aprendidas.jsonl`.

Cada genérica pertenece además a un **bloque** de la cascada del resultado: `operating` (gasto operativo en efectivo), `non_cash`
(amortizaciones y depreciación), `exceptional`. Los ingresos son todos un bloque, `revenue`. Así el resultado se puede armar con la capa
genérica sola, sin conocer el fútbol: es exactamente la cuenta que ya hace `computeYearGeneric()`.

## 3. El mapa (fútbol)

### Ingresos

| Genérica (`category`) | Subcategorías de fútbol (`subcategory`) | Fila de Formato simplificado |
|---|---|---|
| `membership` | `member_dues` | Cuotas Sociales |
| `matchday` | `matchday_competition` | Estadio |
| `season_tickets` | `season_tickets` | Estadio (o Abonos, según `ABONOS_DENTRO_DE_ESTADIO`) |
| `venue` | `stadium_other` | Estadio |
| `media_rights` | `broadcasting` | Televisión |
| `prize_money` | `competition_bonus` | Premios por competencias |
| `commercial` | `sponsorship_commercial` | Comercial / Sponsors |
| `player_transfers` | `player_sales` | Venta de Jugadores |
| `other_sporting_sections` | `other_sports`, `youth_football`, `womens_football` | Otras secciones deportivas |
| `non_sporting_activities` | `education` | Educación |
| `other_revenue` | `other_income`; y las 2 cruzadas: `exceptional_items`, `admin_general_expense` (decisión 3) | Otros ingresos (catch-all) |
| `undisclosed` | `lump_football_operations` | Fútbol profesional (sin desglosar por la fuente) |

`season_tickets` queda como genérica propia (y no adentro de `matchday`) para que ninguna genérica quede partida entre dos filas si algún día
`ABONOS_DENTRO_DE_ESTADIO` pasa a `false`.

### Gastos

| Genérica (`category`) | Bloque | Subcategorías de fútbol | Fila de Formato simplificado |
|---|---|---|---|
| `first_team_staff` | operating | `wages_squad` | Salarios y primas |
| `match_operations` | operating | `match_organisation_expense` | Organización de partidos |
| `other_sporting_sections` | operating | `youth_other_sports_expense` | Otras secciones deportivas |
| `non_sporting_activities` | operating | `education_expense` | Educación |
| `admin_general` | operating | `admin_general_expense` | Administración y gastos generales |
| `other_operating_expenses` | operating | `other_expenses` | Otros gastos (catch-all) |
| `undisclosed` | operating | `lump_football_operations_expense` | Fútbol profesional (sin desglosar) |
| `player_registrations_amortisation` | non_cash | `player_amortisation` | Compra de jugadores |
| `player_registrations_impairment` | non_cash | `player_impairment` | Compra de jugadores |
| `depreciation` | non_cash | `depreciation` | Inversiones |
| `other_amortisation` | non_cash | `other_amortisation` | Inversiones |
| `exceptional` | exceptional | `exceptional_items` | Otros gastos (catch-all) |

Propiedades que el mapa cumple y que un chequeo tiene que vigilar (sección 4):

- Cada fila de Formato simplificado es una unión de genéricas enteras: ninguna genérica cae en dos filas.
- Cada bloque coincide con una lista del motor: `operating` = `wages` + `otherExpenses`, `non_cash` = `nonCash`, `exceptional` =
  `exceptionalItems`. Con eso, `ebitda = Σ ingresos + Σ operating`, `resultado operativo = ebitda + Σ exceptional + Σ non_cash`, y de ahí para
  abajo `financial` (sin cambios).
- `player_registrations_amortisation` lleva también la compra de jugadores en efectivo de un club que no capitaliza (Racing): es el criterio
  de hoy (`club-data-mapping`, sección 1) y el motor ya la trata como no-efectivo. No se cambia; la descripción pública de la genérica lo dice.

### Lo que NO cambia de nivel

- **Resultado, deuda y caja** ya son genéricos: `financial` (`net_interest`, `tax`, `profit_on_player_sales`, `asset_sales`, `gross_debt`,
  `cash`, `staff_cost`) y `official_totals`. Se quedan como están (decisión 4 sobre `profit_on_player_sales`).
- **`adjustments.included_in`, `no_breakdown`, `extra_rows`** hablan de subcategorías y filas de pantalla del fútbol: se quedan en
  subcategorías.

## 4. Cómo queda el JSON, cómo se migra y qué cambia

### JSON: `club-v2` (schema_version "2.0")

Ejemplo real (Racing, ejercicio 2027, recortado):

Una versión nueva, no una extensión de v1: el significado de `category` cambia, y una v1 "extendida" con un campo que significa otra cosa
engaña a quien la lea. Cambios, todos en las líneas y en `club`:

```json
"club": { "id": "racing-ar", "sport": "football", "taxonomy": "football-1", ... },
"revenue": [
  { "label": "Cobros por retransmisión y derechos de TV", "category": "media_rights", "subcategory": "broadcasting", "amount": 7003.015314, "disclosure": "detailed" }
],
"expenses": [
  { "label": "Pago de remuneraciones plantel profesional", "category": "first_team_staff", "subcategory": "wages_squad", "amount": -28190.431748, "disclosure": "detailed" }
]
```

- `subcategory` = el `category` de v1, sin tocar. `category` = la genérica del mapa.
- `club.taxonomy` dice con qué versión del mapa se derivó (`football-1`). Si el mapa cambia, sube el número y `validar` lo nota.
- `club.sport` pasa a inglés en el JSON (`"futbol"` → `"football"`), por diccionario en `json-datos.mjs`, como las claves libres; adentro del
  sitio sigue siendo `'futbol'` (decisión 5).
- `budget_overlay` lleva lo mismo en sus líneas.
- Nada más cambia: importes, orden, `items`, `financial`, `official_totals`, `adjustments`.

### Dónde vive el mapa

En `data/category-map.js`, que ya es la lista oficial (la leen el sitio, `audit.js`, `json-datos.mjs` y `generar-schema-json.mjs`):

- `GENERIC_REVENUE_CATEGORIES` / `GENERIC_EXPENSE_CATEGORIES`: id, bloque y rótulo (ES/EN).
- `SPORT_TAXONOMIES = { futbol: { version: 'football-1', revenue: { member_dues: 'membership', ... }, expense: { wages_squad: 'first_team_staff', ... } } }`,
  con las 2 cruzadas escritas a mano en `revenue` y su motivo al lado.
- `generar-schema-json.mjs` genera de ahí `data/schema/club-v2.json` (con el par `category`/`subcategory` validado por un `oneOf` por
  genérica, así un validador externo también lo exige) y `data/schema/taxonomy-football-1.json`, la tabla pública del mapa para quien use el
  dato abierto. `club-v1.json` se deja publicado y congelado (decisión 2).

### Qué cambia en `tools/`

| Archivo | Cambio |
|---|---|
| `tools/json-datos.mjs` | `SCHEMA_VERSION = '2.0'`; `LINEA`: `normalizedCategory ↔ subcategory`; `aJson` agrega `category` desde el mapa; `deJson` la ignora (el data file no la lleva); `validar` exige que el par coincida con el mapa (error `categoria-generica-no-coincide`) y que `club.taxonomy` sea la vigente; diccionario `sport`. |
| `tools/generar-schema-json.mjs` | escribe `club-v2.json` y `taxonomy-football-1.json`; dos definiciones de línea (ingreso y gasto) en vez de una. |
| `tools/exportar-paquete.mjs` | diccionario: `category` genérica, `subcategory` con `legacy_name: normalizedCategory`; la tabla del mapa como recurso del paquete; `$id` a v2. |
| `tools/audit.js` | (1) `taxonomia-incompleta` P1: una subcategoría de `category-map.js` sin genérica, o una genérica sin bloque. (2) La sonda de comportamiento de `checkCategorias` ya arma un club con una línea por categoría: que además compare en qué parte de la cascada la sumó el motor contra el bloque de su genérica (`bloque-motor-distinto`, P1). Es lo que hoy solo dice un comentario. (3) `fila-parte-generica` P2: una genérica repartida entre dos filas de Formato simplificado. (4) La referencia a `club-v1.json` pasa a `club-v2.json`. |
| `tools/migrar-v2.mjs` (nuevo, de una vez) | lee cada JSON v1, renombra `category` → `subcategory`, agrega la genérica, `taxonomy` y `sport`, y lo reescribe con `serializar` de `club-json.mjs`. Corre los chequeos de la sección de abajo y no escribe nada si alguno falla. Después se archiva en `tools/archivo/`. |
| `cargar.mjs`, `generar-data.mjs`, `club-json.mjs` y las de categorización | nada: siguen con `normalizedCategory`, que es la subcategoría. La genérica la pone `aJson` al escribir. |

### Qué cambia en la pantalla

**En esta migración, nada.** El data file generado no lleva la genérica, así que `index.html`, `js/` y los `-data.js` quedan byte por byte
iguales (es el chequeo principal). Una segunda etapa, aparte y opcional (decisión 6): que `computeYearGeneric()` arme sus listas por bloque y
`bucketize()` sus filas por genérica, leyendo el mapa en vez de tenerlo copiado. Deja de haber dos listas sincronizadas a mano, y una
subcategoría nueva no puede desaparecer del resultado. Mismos rótulos, mismo orden; se verifica igual que abajo.

### Qué garantiza que las sumas no cambian

La migración no toca un solo importe por construcción (renombra una clave y agrega otra), pero se verifica igual, antes de escribir y
después:

1. **El data file sale idéntico.** Tras migrar, `node tools/generar-data.mjs` regenera los `-data.js` y `git diff --exit-code -- 'data/*-data.js'`
   tiene que dar vacío. El sitio, `auditAll()`, los rankings y las páginas de club leen solo eso: si no cambió un byte, no cambió ningún número
   en pantalla.
2. **Huella de importes por club-ejercicio, antes y después.** `migrar-v2.mjs --huella` imprime, por club, ejercicio y lado, la suma de
   `amount` por subcategoría y la cantidad de líneas (también de `items` y de `budget_overlay`), y el total por lado. Se corre sobre el v1
   (antes) y sobre el v2 (después), a `Generados/`, y las dos salidas tienen que ser iguales línea por línea.
3. **La capa nueva cierra contra la vieja.** En el v2: para cada club-ejercicio, Σ por genérica = Σ de sus subcategorías, y Σ de todas las
   genéricas de un lado = el total de ese lado del v1. Además, armando la cascada con los bloques (sección 3) da el mismo `ebitda`,
   `operatingProfit` y `pat` que `computeYearGeneric()` para los 1.296 ejercicios (corrido sobre el motor real en Node, como
   `generate-rankings.js`, nunca con una fórmula aparte).
4. **Las tools de siempre, mismos resultados.** `node tools/ida-y-vuelta.mjs` (0 diferencias), `node tools/validar-esquema-json.mjs` (0
   errores contra v2), `node tools/audit.js` con los mismos conteos de P0 a P3 que antes salvo los hallazgos nuevos de esta tarea,
   `generate-rankings.js --check` y `generate-fuentes-page.js --check` al día, y `?audit=1` con los mismos "no cierran" y "warnings".

Si cualquiera falla, `migrar-v2.mjs` no escribe; si falla después, `git checkout -- data/` lo deshace (los JSON se trackean).

### Orden de trabajo (cuando Guido apruebe)

1. `category-map.js` con el mapa + `audit.js` (1)-(3), con los datos todavía en v1. Commit.
2. `json-datos.mjs`, `generar-schema-json.mjs`, `exportar-paquete.mjs` y `migrar-v2.mjs`; la migración con los 4 chequeos. Commit aparte, solo
   `data/*.json` y `data/schema/`.
3. Documentos: `Admin/mediciones/245-esquema.md` (el esquema pasa a v2), `Admin/CONVENCIONES-DATOS.md` (la regla «la genérica se deriva, no se
   elige»), `Admin/ARQUITECTURA.md`. La skill `club-data-mapping` (sección 0) necesita una frase: se le muestra el texto a Guido antes.
4. Opcional y aparte: la etapa de pantalla (decisión 6).

Se hace en una sesión sin lotes corriendo: un lote que escribe JSON en v1 a la mitad de la migración fallaría la validación (no rompe datos,
pero frena el lote).

## 5. Decisiones para Guido

1. **Los nombres de las genéricas** (sección 3). Recomiendo estos: siguen el vocabulario de UEFA y Deloitte (matchday, media rights,
   commercial) y sirven igual para básquet o rugby. Lo único con "player" es `player_transfers` y `player_registrations_*`, que vale para
   cualquier deporte de equipo.
2. **v1 publicado: ¿se congela o se sigue generando?** Recomiendo congelarlo: dejar `data/schema/club-v1.json` como referencia, sin seguir
   publicando datos v1. Hoy nadie consume el JSON afuera que sepamos y no hay API, así que es el momento más barato para cambiar. Generar los
   dos duplicaría los archivos publicados.
3. **Las 13 líneas de ingreso con categoría de gasto** (`exceptional_items` ×11, `admin_general_expense` ×2). Recomiendo mapearlas a la
   genérica `other_revenue`, sin tocar su subcategoría: es donde ya aparecen en pantalla (catch-all "Otros ingresos") y donde las suma el motor
   (como ingreso). No reabre la decisión de Racing ni el to-do 101. La alternativa (una genérica `exceptional` también en ingresos) es más
   exacta para Racing, pero para Atlético Mineiro sería igual de rara, y obligaría a cambiar el motor.
4. **`profit_on_player_sales`**: ¿se renombra? Recomiendo no: "player" sirve para cualquier deporte de equipo y renombrar un campo de
   `financial` no agrega nada a la capa genérica.
5. **`club.sport` en el JSON**: recomiendo `"football"` (en inglés, como el resto del esquema), con el diccionario en `json-datos.mjs`; los ids
   internos (`'futbol'`, `'basquet'`) no se tocan.
6. **La etapa de pantalla** (motor y Formato simplificado leyendo el mapa). Recomiendo hacerla, pero después y en su propio commit: no cambia
   nada visible y saca la última lista que hoy se sincroniza a mano. Sin ella, los chequeos (2) y (3) de `audit.js` ya cubren el riesgo.
7. **Subcategorías con prefijo de deporte** (`football.wages_squad`). Recomiendo que no en el JSON: el deporte ya está en `club.sport` y
   `club.taxonomy`, y el prefijo repetiría lo mismo en cada una de las ~36.000 líneas. Una API que mezcle deportes lo agrega al responder.
8. **Totales derivados en el JSON** (ebitda, resultado operativo, deuda neta). Recomiendo no guardarlos en el JSON fuente, porque se pueden
   desfasar del motor. Si se quieren en el dato abierto, que `exportar-paquete.mjs` los calcule con el motor real y los ponga solo en el paquete.

## 6. Riesgos

- **Un lote escribiendo durante la migración**: se corta con la validación (escribe v1, `validar` pide v2). Mitigación: migrar sin lotes
  corriendo y, en el mismo commit, las tools ya escriben v2.
- **Ramas de otros worktrees con JSON en v1**: al mergearlas después, sus JSON vuelven en v1 y `audit.js` (`json-no-valida`, P1) lo marca.
  Mitigación: que `migrar-v2.mjs` sea idempotente (un JSON ya en v2 queda igual) y se pueda volver a correr en la principal después de cada
  merge.
- **Diffs grandes**: cada línea de cada JSON cambia (~36.000). Va en un commit solo, sin otro cambio, para que se pueda revisar con
  `--word-diff` y revertir entero.
- **El mapa como nuevo lugar para equivocarse**: una subcategoría nueva sin genérica. Lo cubre `taxonomia-incompleta` (P1), y `validar` no
  deja escribir una línea sin genérica.
- **Una genérica mal elegida ahora**: el costo de cambiarla después es subir `taxonomy` a `football-2` y volver a correr `migrar-v2.mjs`, sin
  tocar importes ni subcategorías. Por eso la genérica se deriva y no se guarda como decisión de nadie.
