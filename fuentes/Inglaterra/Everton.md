# Everton

- **Deporte**: Fútbol
- **Liga / competencia**: Premier League (Inglaterra, 1ª división)
- **Entidad legal**: Everton Football Club Company, Limited — Companies House n° **00036624**
- **Canal**: Companies House (Reino Unido). Procedimiento completo, gotchas y por qué este canal es
  el mejor del proyecto: `fuentes/Inglaterra/_notas-generales.md`.

## Qué se bajó (sesión 2026-09-13)

Cuentas **consolidadas** del grupo, ejercicio cerrado el 30 de junio.

- `Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.pdf` — 44 páginas, cerrado 30/6/2025.
- `Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.pdf` — cerrado 30/6/2024.

## Serie disponible sin bajar

**6 ejercicios**, de 30/6/2020 a 30/6/2025 — la serie más corta de los clubes ingleses grandes
chequeados.

## Verificación hecha en esta sesión

OCR de la página 2 del PDF 2024/25: la portada es el escudo del club sobre fondo de imagen, así que
el OCR sale sucio, pero se lee `REPORT AND ACCOUNTS 2024/25`. Es la única portada del lote donde el
OCR no es limpio de entrada — el cuerpo del documento sí lo es.

- Último chequeo: 2026-09-13.

## CARGADO al sitio (2026-09-22)

Cargados los 2 ejercicios ya bajados, en `data/everton-gb-data.js` (clubId `everton-gb`). Entidad
legal confirmada en la carátula de los 2 documentos: "Everton Football Club Company, Limited"
(Companies House n° 00036624), cuentas CONSOLIDADAS del grupo. Ejercicio cerrado el 30 de junio,
confirmado en la carátula y en el propio cuerpo de los 2 balances ("FOR THE YEAR ENDED 30 JUNE
2024"/"...2025").

- **Ejercicio 2024** (30/6/2024, temporada 2023/24): balance auditado real (Crowe U.K. LLP).
  Tie-out EXACTO: revenueLines suman £235,447 M = officialTotalRevenue; Math.abs(expenses+nonCash)
  = £269,219 M = officialTotalExpenses; fórmula de PAT = -£53,222 M = officialPAT (pérdida). Sin
  residuo.
- **Ejercicio 2025** (30/6/2025, temporada 2024/25): balance auditado real (Crowe U.K. LLP).
  Tie-out EXACTO: revenueLines suman £228,022 M = officialTotalRevenue; Math.abs(expenses+nonCash)
  = £261,415 M = officialTotalExpenses; fórmula de PAT = -£8,609 M = officialPAT (pérdida). Sin
  residuo.
- **FX**: GBP es moneda nueva, todavía sin entrada en `FX_CLOSE` (`data/currency-map.js`) — se usó
  `fxRef:'GBP@2024-06-30'` y `fxRef:'GBP@2025-06-30'`, sin `fx` literal (ninguno de los 2 documentos
  declara un tipo de cambio propio a USD). Pendiente de otra sesión agregar esas 2 entradas a
  `FX_CLOSE` (mismo gotcha ya documentado en `data/arsenal-gb-data.js`, el otro club inglés cargado).
- **Ganancia por venta de jugadores**: el P&L solo reporta un renglón NETO "Profit on player
  trading" (no desglosa ingreso/costo bruto), cargado como línea de `revenueLines`
  (`normalizedCategory:'player_sales'`).
- **CAPEX excluido a propósito**: el capital cost del nuevo estadio (Bramley-Moore Dock / Hill
  Dickinson Stadium — £312.7 M en 2024, £114.3 M en 2025) NO se cargó como gasto operativo: el
  propio documento lo separa como activo en construcción, no como "Operating expenses". Tampoco se
  cargó su financiamiento (préstamos, la colocación privada de £350 M con JPMorgan).
- **Duda documentada**: la ganancia de £49.161 M en 2025 por la venta de 2 subsidiarias (Everton FC
  Women Ltd y Goodison Park Stadium Ltd) a la matriz Roundhouse se cargó en el campo `assetSales`
  (junto al "Profit on disposal of tangible fixed assets"), a falta de una categoría dedicada a
  "ganancia por reestructuración societaria/desconsolidación" distinta de "venta de activos
  tangibles". No es un dato que falte, es una aproximación de categorización — ver el comentario de
  cabecera de `data/everton-gb-data.js` para el detalle completo.
- **Gestión**: `gestionesByClub['everton-gb']` tiene 2 entradas separadas — `moshiri` (Ejercicio
  2024, controlaba el club en toda su extensión, la venta a Friedkin se firmó el 22/9/2024 y se
  completó el 18/12/2024, ambas posteriores al cierre) y `friedkin` (Ejercicio 2025, el cambio de
  control se completó el 18/12/2024, DENTRO de ese ejercicio; al cierre del 30/6/2025 el dueño es
  Roundhouse Capital Holdings Limited, 99.5%, controlada por Dan Friedkin).
- **No se tocó `data/clubs.js`** (fuera de alcance de esta tarea, igual que pasó con
  `arsenal-gb-data.js`): el club todavía no tiene entrada en `clubs{}`, así que no aparece en el
  selector del sitio hasta que otra sesión agregue esa entrada (id/name/displayName/country/
  reportingCurrency/fiscalYearStart/sport/brandColor).

Color de marca: `#003399` — teamcolorcodes.com (azul primario "Everton Blue", Pantone 661 C),
cruzado contra la identidad "royal blue" del infobox de Wikipedia (en.wikipedia.org/wiki/Everton_F.C.),
verificado 2026-09-22.
