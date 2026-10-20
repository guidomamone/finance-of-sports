# Auditoría 2026-10-20 — ejes `codigo` y `docs` (DOCS 1)

**Corrida:** 313 clubes, 1.197 ejercicios · `node tools/audit.js`: P0 0 · P1 1 · P2 337 · P3 867 (130 silenciados) · ejes de juicio: `codigo` y `docs`.
Antes: último reporte en `auditorias/` es `2026-10-13-escala.md` (otro eje); no hay uno anterior de estos dos ejes para comparar, así que no hay "resueltos desde".
Sin API (US$ 0). Rama `ligas`, al día con main (`5a0c08e2b0`, fase 1 del 245 incluida).

## Novedades desde 2026-10-13

- Entró la fase 1 del 245 (`tools/json-datos.mjs`, `exportar-json.mjs`, `validar-esquema-json.mjs`, `ida-y-vuelta.mjs`). Medido hoy:
  `node tools/ida-y-vuelta.mjs` → 313 de 313 idénticos, 0 que no validan, 0 sin exportar, **4 con avisos** (validan, pero con algo raro; el resumen no dice cuáles, ver H-8).
- Mismo `audit.js`: el único P1 es de datos derivados desactualizados, no de código.

## Hallazgos

Severidad según `auditoria-finance-of-sports` §2. Cada uno tiene archivo y línea.

### P1

**H-1. `faltantes-desfasado`** — `data/faltantes/` y `Admin/sourcing/pendientes.md` quedaron viejos (los generó `tools/faltantes-liga.mjs`; algo cambió en los clubes cargados desde la última corrida).
Arreglo: `node tools/faltantes-liga.mjs`. **No lo corro yo**: escribe en `data/` y la regla de esta sesión es no tocar `data/`. Va a la principal. No es un P0 (no hay un número publicado mal).

### P2

**H-2. `Admin/ARQUITECTURA.md` describía un `<head>` que ya no existe** (líneas 355–362 y 433, ya corregidas en esta rama).
Decía que la lista de `<script src>` del `<head>` trae `boca-data.js` "porque Boca es el club default" y que `loadClubData` arma `'data/' + clubId + '-data.js'`. Hoy `index.html` no trae ningún data file de club
(`grep boca-data index.html` da vacío), `currentClub` arranca en `null` (`js/principal.js:13`; `Admin/PANTALLA.md:896` lo confirma: ningún data file se baja al abrir) y la ruta lleva el país
(`js/principal.js:32`). Además `CLUB_DATA_SCRIPT_OVERRIDE` vive en `js/principal.js:20`, no en `index.html`. Es la receta que sigue un agente que suma un club, y el chequeo de Network que prescribía
("solo `clubs.js`/`category-map.js`/`boca-data.js`…") nunca iba a coincidir. **Corregido** en `Admin/ARQUITECTURA.md`.

**H-3. `ruta-muerta`** — `resultado-N.json` aparece en `Admin/dudas-por-club.md` y no existe. Según el mensaje del propio `audit.js`, o se renombró o se nombra para decir que no existe. No lo toqué:
`dudas-por-club.md` es la lista que Guido usa para escribirle a los clubes. Va a la principal, que decide si es una entrada para `tools/audit-ignore.json`.

**H-4. Chequeo automatizable que falta (loop de la skill §5).** Con el 245 la fuente de verdad será el JSON y hoy nada en `tools/audit.js` lo mira. Antes de la fase 2 conviene dos chequeos nuevos:
`json-no-valida` (P1: `validar-esquema-json.mjs` da error) y `json-js-desfasado` (P1: el JS generado ya no coincide con el JSON; es exactamente lo que mide `ida-y-vuelta.mjs`). Hoy la ida y vuelta
es una herramienta que alguien tiene que acordarse de correr, y "acordate" ya falló en este proyecto (`netlify.toml`). No lo agrego yo: es código de `tools/`.

### P3

**H-5. `Admin/ARQUITECTURA.md:90` y `:617` hablaban de comentarios en los data files.** La línea 90 decía que `river-data.js` y `racing-data.js` traen "comentarios explicando qué es real y qué es placeholder"; la 617
decía que un grupo de catch-all se verificó "contra el comentario de cabecera" de cada data file. Desde que los data files no llevan comentarios (`CONVENCIONES-DATOS.md:8`) esa evidencia está en
`Admin/carga-clubes/<club>.md`. **Corregido** en las dos líneas.

**H-6. `start-session-finance-of-sports-project/SKILL.md:172` tiene la ruta sin país:** "regenera, desde los propios `data/<club>-data.js`" (los archivos son `data/<país>/<club>-data.js`). Skill: texto propuesto abajo (S-1).

**H-7. `club-outreach/SKILL.md:170–203` mezcla un pendiente con fecha dentro de una skill.** El check-in del 2026-10-24 (cuatro días desde hoy) vive en las secciones 4, 5 y en "Cómo mantener este skill" con la fecha escrita seis veces.
La regla de la casa (memoria "docs de criterio sin historia ni contadores") dice que una skill dice cómo se hace, y que un pendiente va a `Admin/TODO.md`. Texto propuesto abajo (S-2). La "— 2026-09-23" de `club-sourcing/SKILL.md:302` **no** es un hallazgo: es el formato de la línea de ángulos, la fecha del último chequeo del club.

**H-8. La salida de `ida-y-vuelta.mjs` dice "con avisos: 4" sin decir cuáles** (el resumen suma `conAvisos++` y no los lista; con `--detalle` tampoco los muestra en la salida corta que corrí). Es una mejora de script → va como punto de `Admin/TODO.md`, sin aplicarla
(regla "Mejoras de script al TODO"). Propuesta de redacción para la principal: "ida-y-vuelta.mjs: listar los clubes que validan con avisos (hoy solo da el número) y el texto del aviso".

**H-9. `netlify.toml:27` dice "las 98 menciones a Guido de los 6 skills"**; hoy son 8 skills (`ls .claude/skills`). Es un comentario de historia, no cambia nada de lo que se publica. Texto propuesto: "…de las skills…" (sin número, por la regla de contadores). Es config: lo dejo para la principal.

**H-10. Tamaño de los documentos vivos** (`wc -c`): `PIPELINE.md` 115 KB, `PANTALLA.md` 90 KB, `ARQUITECTURA.md` 73 KB, `CONVENCIONES-DATOS.md` 42 KB, `HALLAZGOS-pipeline.md` 42 KB. Ninguno se puede leer en una sesión, pero no hay regla que los acote (la skill pide dos minutos de lectura para una skill, no para un Admin).
`CHANGELOG.md` (464 KB) ya figura en `audit.js` como `archivo-pesado` (umbral 400 KB) y `finance-of-sports-project.md` pesa 520 KB sin figurar: **su umbral no lo cubre porque el chequeo mira solo el CHANGELOG** (candidato: extender `archivo-pesado` a `Admin/*.md`). Informativo.

### Descartado (miré y está bien)

- **Rutas muertas en docs vivos:** 0. Rastreé todas las rutas `tools/`, `js/`, `Admin/`, `.claude/skills/` y `data/` nombradas en `CLAUDE.md`, las skills y los `Admin/*.md` vivos; las únicas que no existen son
  `js/comparar-clubes.js` (`ARQUITECTURA.md:109`, `PANTALLA.md:915`: dicen justamente que se borró, es historia a propósito) y `Admin/lotes/lote-NN.txt` (un patrón, no un archivo).
- **Generados al día:** `node tools/generate-club-index.js --check` → `Admin/ESTADO-clubes.md` y `data/club-index.js` al día (313).
- **`CLAUDE.md` contra `netlify.toml`:** la lista de carpetas que se borran del deploy coincide (`Admin/`, `CLAUDE.md`, `auditorias/`, `Prototyping/`, `tools/`, `Generados/`).
- **Skills con fechas/versiones:** solo las de H-7 y el formato de ángulos; el resto de las skills cumple la regla de no llevar historia.

## Eje de juicio: `codigo`

Hecho con el sitio levantado (`fos-local`, `?audit=1&cb=docs1`):

- `auditAll()`: **313 clubes · 3.406 checks cierran · 0 no cierran · 0 warnings de fx · 0 clubes que no cargaron → TODO OK.** Los 313 data files cargan sin excepción.
- Consola: sin errores del sitio. Los únicos dos son el CORS de `cloudflareinsights.com/cdn-cgi/rum` contra `localhost` (el beacon de Cloudflare solo acepta el dominio real) y el `ERR_FAILED` que lo acompaña: ruido de entorno local, no de producción.
- **No cubierto en esta corrida:** toggles combinados (moneda × formato × club × año), re-render sin duplicar listeners, destrucción de charts, y `loadClubData()` con un club que falla. Eso pide manejar la interfaz a mano un buen rato y
  no lo hice. Si la principal quiere ese eje completo, va a un punto aparte (no hay síntoma concreto que lo justifique hoy).
- Código nuevo de la fase 1 (`tools/json-datos.mjs` y las tres tools): `node tools/ida-y-vuelta.mjs` es una prueba mucho más fuerte que cualquier lectura mía (objeto por objeto en 313 clubes, `-0`/`null`/clave ausente distinguidos); no la repito leyendo código.

## Eje de juicio: `docs`

- **Dice dos veces lo mismo:** la receta de sumar un club existe en `ARQUITECTURA.md` (pasos 1–1c, 2, líneas ~320–440) y en `club-or-year-onboarding`/`Admin/PIPELINE.md` (que es la versión con herramientas). `ARQUITECTURA.md` conserva los pasos a mano
  (escribir el `Object.assign(sources…)` a mano, etc.) que las tools ya hacen; es la fuente del desfase H-2. Con la fase 2 esos pasos se reescriben de todos modos (ver inventario C2): aprovechar para dejarlos en una línea que remita a `PIPELINE.md`.
- **Se lee en cada sesión sin usarse:** `CLAUDE.md` pide leer `Admin/ESTADO.md` (30 KB) entero al arrancar; la mayor parte es el mapa por área. No lo toco: es una decisión de arranque de Guido. Informativo.
- **Desactualizado respecto de los datos:** nada que `generate-club-index.js --check` detecte; los desfases son de prosa (H-2, H-5, H-6).

## Texto propuesto para las skills (necesitan el ok de Guido; no edité ninguna)

**S-1. `start-session-finance-of-sports-project/SKILL.md:172`** — hoy:

> `- node tools/generate-club-index.js` — regenera, desde los propios `data/<club>-data.js`, la sección

Cambiar a:

> `- node tools/generate-club-index.js` — regenera, desde los propios `data/<país>/<club>-data.js`, la sección

**S-2. `club-outreach/SKILL.md`, secciones 4 y 5 y "Cómo mantener este skill"** — sacar las fechas y el pendiente de la skill. Reemplazos exactos:

- Sección 4, primer párrafo, hoy: "No se activan sin que Guido lo decida explícitamente, y no antes del check-in del 2026-10-24 (ver `Admin/outreach/checkin-2026-10-24.md`). Quedan documentadas acá para no tener que rediseñarlas cuando llegue el momento:"
  → "No se activan sin que Guido lo decida explícitamente, y no antes del check-in de los 30 días (ver `Admin/outreach/checkin-2026-10-24.md`). Quedan documentadas acá para no tener que rediseñarlas cuando llegue el momento:" (sin repetir la fecha; el archivo ya la lleva en el nombre).
- Sección 5 entera → borrarla y dejar el pendiente en `Admin/TODO.md` como punto nuevo: "Check-in de outreach a los 30 días (2026-10-24): evaluar lo que dice `Admin/outreach/checkin-2026-10-24.md`; hay una tarea programada que lo pregunta, el archivo es el respaldo."
- "Cómo mantener este skill", última oración, hoy: "Si el check-in del 2026-10-24 ya pasó, borrar la sección 5 (o reemplazarla por el resultado) y archivar `Admin/outreach/checkin-2026-10-24.md` en `Admin/Archive/`."
  → "Cuando se haga el check-in de los 30 días, archivar `Admin/outreach/checkin-2026-10-24.md` en `Admin/Archive/` con su resultado."

**S-3.** (De H-9, no es una skill: `netlify.toml:27`) cambiar "las 98 menciones a Guido de los 6 skills" por "las menciones a Guido de las skills".

## Qué se movió a Admin/TODO.md

Nada: `Admin/TODO.md` es de la principal. Para que lo agregue (números por asignar):

1. **H-4** — `tools/audit.js`: chequeos `json-no-valida` y `json-js-desfasado` (P1), a poner antes de la fase 2 del 245.
2. **H-8** — `tools/ida-y-vuelta.mjs`: listar cuáles son los clubes "con avisos" y el texto del aviso.
3. **H-7** — check-in de outreach del 2026-10-24 (ver S-2).
4. **H-10** — extender `archivo-pesado` de `tools/audit.js` a los demás `Admin/*.md` (hoy solo el CHANGELOG).
5. **H-1** — correr `node tools/faltantes-liga.mjs` (no es un punto de TODO; es una corrida a hacer).
