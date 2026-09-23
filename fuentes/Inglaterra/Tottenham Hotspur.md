# Tottenham Hotspur

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Tottenham Hotspur Limited — Companies House n° **01706358**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-13)

Cuentas **consolidadas** del grupo, ejercicio cerrado el 30 de junio.

- `Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-group-accounts-2024-25.pdf` — 65 páginas, cerrado 30/6/2025.
- `Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-group-accounts-2023-24.pdf` — cerrado 30/6/2024.

## Serie disponible sin bajar

**12 ejercicios**, de 30/6/2014 a 30/6/2025.

## Verificación hecha en esta sesión

OCR de la página 2 del PDF 2024/25: `Strategic report to the members of Tottenham Hotspur Limited
(...) for the year ended 30 June 2025`. El mismo párrafo aclara algo relevante para el mapeo: la
actividad del grupo es la operación de un club masculino **y uno femenino**, o sea que las cifras
vienen mezcladas, no son solo del plantel masculino.

- Último chequeo: 2026-09-13.

## CARGADO al sitio (2026-09-22)

Onboardeado a `data/tottenham-gb-data.js` (clubId `tottenham-gb`), motor genérico, 2 ejercicios:
Ejercicio 2024 (cerrado 30/6/2024, temporada 2023/24) y Ejercicio 2025 (cerrado 30/6/2025, temporada
2024/25). Fuente: los 2 `.md` ya transcriptos (ver arriba), cuentas consolidadas del grupo,
Companies House n° 01706358.

**Las cifras incluyen plantel MASCULINO y FEMENINO combinados**, tal como aclara el propio Strategic
report de los 2 ejercicios ("the operation of both a men's and a women's professional football
club") — no son solo del primer equipo masculino.

- FX: `GBP` es moneda nueva en el sitio, todavía sin entrada en `data/currency-map.js` (fuera de
  alcance de esta sesión, a propósito). Ninguno de los 2 documentos declara un tipo de cambio propio
  de cierre GBP/USD para todo el balance, así que se usó `fxRef:'GBP@2024-06-30'` / `GBP@2025-06-30`
  (mercado, pendientes de agregar a `FX_CLOSE`) en vez de un `fx` literal.
- Tie-out por año (verificado con `node -e`, cierra EXACTO, sin residuo en ninguno de los 2):
  - 2024: Revenue 528,191 M GBP, Total operating expenses 589,209 M GBP, Loss for the year
    -26,226 M GBP.
  - 2025: Revenue 565,266 M GBP, Total operating expenses 668,229 M GBP, Loss for the year
    -94,666 M GBP.
- Color de marca: `#000a3c` — `theme-color` del sitio oficial (tottenhamhotspur.com), verificado
  2026-09-22. Consistente con la familia "navy" que identifica al club (el infobox de Wikipedia en
  inglés no declara un campo `colours` explícito; el nickname "The Lilywhites" es por la camiseta
  blanca, pero el navy es el color de marca/identidad que usa el propio sitio oficial).
- Duda genuina sin resolver (no se pudo anotar en `Admin/dudas-por-club.md`, fuera de alcance de
  esta sesión puntual): el Strategic report narra que la línea "Commercial" de la Nota 2 incluye
  Sponsorship (£144,5 M en 2024), Merchandising (£36,2 M) y "Other revenue" (£64,0 M, ingresos NO
  futbolísticos del estadio: NFL, conciertos, F1 Drive, stadium tours, skywalk, memberships,
  catering), pero la Nota 2 en sí no desglosa esa cifra exacta — solo la prosa, redondeada a
  £0,1 M, que además no reconcilia centavo a centavo contra el total de "Commercial". Por eso no se
  promovió esa porción a `stadium_other` (criterio conservador: el rótulo real es "Commercial", no
  nombra el estadio). Ver el comentario de cabecera de `data/tottenham-gb-data.js` para el detalle
  completo.
- **Pendiente, no hecho en esta sesión a propósito** (la tarea lo excluyó explícitamente): el club
  todavía no tiene entrada en `data/clubs.js` (`clubs{}`, `displayName`, `reportingCurrency`,
  `fiscalYearStart`, `brandColor`), así que hoy no aparece seleccionable en el dropdown del sitio
  aunque sus datos ya estén cargados y verificados. `data/club-leagues/gb.js` ya tenía la fila de
  Premier League para `tottenham-gb` (2024/2025) desde antes de esta sesión.
