# everton-gb — evidencia de carga

Lo que había como comentario en `data/gb/everton-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/everton-gb-data.js — Everton (Inglaterra, Premier League), clubId 'everton-gb'.

Fuente: "Report and Accounts" (cuentas CONSOLIDADAS del grupo) de Everton Football Club
Company, Limited (Companies House n° 00036624), depositadas en Companies House UK. Ejercicio
cerrado el 30 de junio, en inglés, en libras esterlinas (GBP). Los 2 ejercicios cargados:

  2024: Annual Report & Accounts 2024, ejercicio cerrado 30/6/2024 (temporada 2023/24).
        Transcripción: Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md
  2025: Report and Accounts 2025, ejercicio cerrado 30/6/2025 (temporada 2024/25).
        Transcripción: Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.md

Ambos son balances auditados reales (Crowe U.K. LLP), no presupuestos.

amountNative en millones de GBP nativos (moneda NUEVA para el sitio, GBP no existe todavía en
data/currency-map.js — no se agrega acá, es tarea de otra sesión/otro archivo). revenue positivo,
expense NEGATIVO, mismo criterio que river-data.js/racing-data.js.

GANANCIA POR VENTA DE JUGADORES: el P&L de Everton (Consolidated Profit and Loss Account) NO
desglosa ingreso bruto por transferencias y costo bruto por separado, solo reporta un renglón
NETO "Profit on player trading" (£48.545m en 2024, £31.325m en 2025), como línea propia, debajo
del resultado operativo, antes de intereses e impuestos. Por eso se carga como línea de
revenueLines con normalizedCategory:'player_sales' (ver club-data-mapping SKILL.md, "Profit/
(loss) on disposal of players' registrations"), NO en el campo meta profitOnPlayerSales (que
quedaría en 0 para no duplicar: revenue ya suma esa línea, ver computeYearGeneric en
js/finanzas-calc.js).

STAFF COSTS: el documento reporta headcount por departamento (Nota 7) pero el COSTO agregado
("Staff costs", Nota 3) es una sola cifra sin desglosar por departamento (a diferencia de Vélez,
que sí separa el costo salarial por sector). No hay forma de aislar cuánto de ese total es plantel
profesional vs. resto del personal, así que toda la línea "Staff costs" se carga a `wages_squad`
completa (convención estándar de las cuentas Companies House de clubes ingleses: la línea "Staff
costs" es la remuneración total del club, plantel incluido, sin desglose fino disponible).

"OTHER COMMERCIAL ACTIVITIES" (turnover, nota 2): el documento la define como "hospitality,
catering, events and all other revenue sources" — no nombra el estadio ni tampoco es sponsorship
específico, así que va a `other_income` (catch-all), no a `stadium_other` (criterio conservador de
club-data-mapping sección 1: `stadium_other` solo si el rótulo nombra el estadio o una parte).

EXCEPCIONALES (`exceptional_items`, ninguno es CAPEX de estadio): 2024 = "Refinancing and legal
costs" (£10.371m, relacionados a la refinanciación previa al cambio de dueño y a la defensa ante
el Profit and Sustainability de la Premier League — NO son costo de construcción del estadio, el
documento los separa explícitamente de los £312.7m de capital cost de Bramley-Moore Dock, que NO
se cargan al sitio, ver más abajo). 2025 = 4 líneas (amounts payable a ex-empleados por cambio de
cuerpo técnico, amounts payable a otros ex-empleados, revaluación del esquema de pensión de la
Football League, y refinancing/legal costs por el cambio de control), tampoco relacionadas al
CAPEX del estadio.

CAPEX DEL ESTADIO — EXCLUIDO A PROPÓSITO: Everton incurrió £312.7m (2024) y £114.3m (2025) de
"capital cost" en la construcción del nuevo estadio (Bramley-Moore Dock / Hill Dickinson Stadium).
Esto NO aparece como revenueLine/expenseLine ni como ningún campo de fiscalYearMeta: es CAPEX
(inversión de capital, activo bajo construcción en el balance — "Assets in the course of
construction", Notas 11), no un gasto operativo del ejercicio, y el propio documento lo separa de
"Operating expenses" en toda su Strategic Report. El financiamiento de esa obra (préstamos, la
colocación privada de £350m con JPMorgan para Hill Dickinson Stadium) tampoco se carga: es
financiamiento/capital, mismo criterio que club-data-mapping/referencia/casos-por-pais-y-formato.md.

PROFIT ON DISPOSAL OF INVESTMENTS (2025 solamente, £49.161m): ganancia por la venta de Everton
Football Club Women Limited y Goodison Park Stadium Limited (subsidiarias) a Roundhouse Capital
Holdings Limited (matriz última del grupo), el 27/6/2025 — una reestructuración societaria
intra-grupo (desconsolidación), no una venta de jugadores ni un ingreso operativo del club. Se
cargó en el campo meta `assetSales` (junto al "Profit on disposal of tangible fixed assets" de
£0.004m, inmaterial, presente en los 2 años) en vez de como revenueLine, porque no es turnover ni
resultado de la operación futbolística — es la aproximación más fiel disponible al concepto
"ganancia por venta de activos" que ya usa el motor para este tipo de línea no operativa. Duda
genuina: no hay una categoría dedicada a "ganancia por reestructuración societaria/venta de
subsidiaria" distinta de "venta de activos tangibles", documentado en el reporte de esta sesión.

GROSSDEBT: se usa la cifra de "Other loans" (Nota 16, Borrowings — deuda financiera pura, excluye
trade creditors/accruals), la misma que el propio documento usa en su Nota "Net Debt
Reconciliation" (Nota 26 en 2024, Nota 25 en 2025) para calcular el "net debt" que cita la
Strategic Report (£567.3m en 2024, no citado literal en texto para 2025 pero £389.401m según la
Nota de Net Debt Reconciliation). cash = "Cash at bank and in hand" (balance consolidado).
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2025 (30/6/2025). Fuente: Nota 2 "Turnover" (pág. 26) + P&L account (Profit on player
trading, pág. 17). Suma exacta a £228.022m (196.697 de Turnover + 31.325 de Profit on player
trading).
```

### Gastos

```text
Ejercicio 2025. Fuente: Nota 3 (pág. 27) + su desglose de exceptional costs (4 líneas). Suma sin
exceptional_items = -£261.415m = officialTotalExpenses. Con exceptional_items (-11.215) el
"Total operating expenses" impreso da -£272.630m.
```

### Meta

```text
grossDebt = "Other loans" (Nota 16, Borrowings: dentro de 1 año 127.571 + más de 5 años
340.971 = 468.542), coincide EXACTO con la Nota 25 "Net Debt Reconciliation" del documento.
cash = "Cash at bank and in hand" (balance consolidado, pág. 18).
assetSales = 0.004 (Profit on disposal of tangible fixed assets) + 49.161 (Profit on disposal
of investments — venta de Everton FC Women Ltd y Goodison Park Stadium Ltd a la matriz
Roundhouse, ver comentario de cabecera). netInterest = 1.471 (interest receivable, Nota 5) -
14.637 (interest payable, Nota 6).
```

## 2024

### Ingresos

```text
Ejercicio 2024 (30/6/2024). Fuente: Nota 2 "Turnover" (pág. 22-23 del PDF) + P&L account
(Profit on player trading, pág. 14). Suma exacta a £235.447m (186.902 de Turnover + 48.545 de
Profit on player trading).
```

### Gastos

```text
Ejercicio 2024. Fuente: Nota 3 "Operating expenses" (pág. 23) + su desglose de exceptional
costs. Suma de todas las líneas de abajo (sin exceptional_items) = -£269.219m = officialTotal-
Expenses. Con exceptional_items (-10.371) el "Total operating expenses" impreso da -£279.590m.
```

### Meta

```text
grossDebt = "Other loans" (Nota 16, Borrowings: dentro de 1 año 229.736 + entre 1-5 años
364.036 = 593.772), NO el total de "Creditors" (que incluye trade creditors/accruals) — mismo
criterio que Boca/Vélez (club-data-mapping/referencia/formato-simplificado.md). Coincide EXACTO con la propia Nota 26
"Net Debt Reconciliation" del documento. cash = "Cash at bank and in hand" (balance
consolidado, pág. 15).
```

## Gestiones

_antes de Farhad Moshiri (data/gestiones/gb.js):_

```text
Moshiri: compra del 49,9% confirmada el 27/2/2016 (la Premier la ratificó dos semanas después).
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Everton/everton-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Everton/everton-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Broadcasting | pág. 22, precedente |
| 2 | Gate Receipts | pág. 22, precedente |
| 3 | Sponsorship, advertising and merchandising | pág. 22, precedente |
| 4 | Other commercial activities | pág. 22, precedente |
| 5 | Profit on player trading | pág. 13, Jev 0.99 |
| 6 | Profit on disposal of tangible fixed assets | pág. 13, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Amortisation of players' registrations | pág. 22, precedente |
| 2 | Wages and salaries | pág. 24, Claude 0.9 |
| 3 | Social security costs | pág. 24, Claude 0.88 |
| 4 | Other pension costs | pág. 24, Claude 0.87 |
| 5 | Depreciation | pág. 22, precedente |
| 6 | Other operating costs | pág. 22, precedente |
| 7 | Operating expenses - exceptional costs | pág. 13, Claude 0.88 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2022–23 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Everton".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Everton/everton-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Everton/everton-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Broadcasting | pág. 24, precedente |
| 2 | Gate Receipts | pág. 24, precedente |
| 3 | Sponsorship, advertising and merchandising | pág. 24, precedente |
| 4 | Other commercial activities | pág. 24, precedente |
| 5 | Profit on player trading | pág. 15, Jev 0.99 |
| 6 | Profit on disposal of tangible fixed assets | pág. 15, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Amortisation of players' registrations | pág. 24, precedente |
| 2 | Wages and salaries | pág. 26, Claude 0.9 |
| 3 | Social security costs | pág. 26, Claude 0.88 |
| 4 | Other pension costs | pág. 26, Claude 0.87 |
| 5 | Depreciation | pág. 24, precedente |
| 6 | Other operating costs | pág. 24, precedente |
| 7 | Operating expenses - exceptional costs | pág. 15, Claude 0.88 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2021–22 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Everton".
```

## Fuentes

### everton-gb-group-accounts-2024

_note (data/):_

```text
PDF de 37 páginas, "Report and accounts" depositado en Companies House, entidad Everton Football Club Company, Limited n° 00036624. Transcripción completa en Clubes/Inglaterra/Everton/everton-group-accounts-2023-24.md. Ver el comentario de cabecera de data/gb/everton-gb-data.js para el detalle completo de categorización (staff costs sin desglose por departamento, profit on player trading como línea neta, CAPEX del estadio excluido a propósito).
```

### everton-gb-group-accounts-2025

_note (data/):_

```text
PDF de 44 páginas, "Report and accounts" depositado en Companies House, entidad Everton Football Club Company, Limited n° 00036624. Transcripción completa en Clubes/Inglaterra/Everton/everton-group-accounts-2024-25.md. Cambio de control societario (Moshiri -> Friedkin/Roundhouse Capital Holdings, completado 18/12/2024) ocurrido DENTRO de este ejercicio. Ver el comentario de cabecera de data/gb/everton-gb-data.js para el detalle completo de categorización.
```

### everton-gb-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Everton/everton-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### everton-gb-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Everton/everton-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

## Otros

### Presupuesto al lado del balance (evertonGbPresupuestoOverlayByYear), en general

```text
evertonGbPresupuestoOverlayByYear: vacío, no hay presupuesto oficial cargado para ningún
ejercicio de Everton, solo balances auditados reales.
```

### evertonGbPasesData

```text
Sin datos reales de mercado de pases/resultados deportivos/títulos para Everton todavía (fuera
de alcance de esta carga, que es solo financiera) — mismo criterio que otros clubes recién
onboardeados sin este desglose: arrays vacíos, no placeholders inventados.
```

### gestionesByClub['everton-gb']

```text
Ejercicio 2024 (cerrado 30/6/2024): Farhad Moshiri controlaba el club en toda su extensión (vía
Blue Horizon Investments Limited, 94.1%) — el acuerdo de venta a The Friedkin Group se firmó el
22/9/2024 (posterior al cierre) y se completó el 18/12/2024 (posterior también, evento
subsecuente al balance de este ejercicio, ver Nota 21 "Post balance sheet events").
Ejercicio 2025 (cerrado 30/6/2025): el cambio de control se completó el 18/12/2024, DENTRO de
este ejercicio (jul-2024 a jun-2025) — al cierre del 30/6/2025 el dueño es Roundhouse Capital
Holdings Limited (99.5%), controlada por Dan Friedkin.
```
