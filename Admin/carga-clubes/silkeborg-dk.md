# silkeborg-dk — evidencia de carga

Lo que había como comentario en `data/dk/silkeborg-dk-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/dk/silkeborg-dk-data.js — Silkeborg IF A/S (clubId 'silkeborg-dk'), Dinamarca.
Ejercicio fiscal 2024 (año CALENDARIO, 1° de enero a 31 de diciembre de 2024,
`fiscalYearStart:'01-01'`, mismo criterio que fckobenhavn-dk).

ENTIDAD: Silkeborg IF A/S (CVR 26397731), entidad única, sin subsidiarias
consolidadas — el propio documento describe la actividad como "operation of football
activities... including contract football, investing in sales rights related to
professional athletes... talent development" MÁS "food and beverage activities" y "the
operational tasks associated with managing the pitch and building complex at JYSK
Park" (el club gestiona su propio estadio, sin una sociedad separada tipo Atletion de
AGF). Auditor: BDO Statsautoriseret revisionsaktieselskab, sin salvedades. Informe
anual en INGLÉS (Silkeborg lo publica bilingüe/en inglés directamente, no hubo que
traducir del danés).

OJO — CAMBIO DE CONTROL A FIN DE EJERCICIO: el 18/12/2024 Trivela Group V ApS compró
el 80% del capital (antes 100% de Papirfabrikken Invest A/S, ex-Silkeborg IF Invest
A/S) — no afecta la carga del ejercicio 2024 en sí, pero explica el dividendo
extraordinario de DKK 34,1M distribuido ese mismo ejercicio (nota 9/17).

Fuente: transcripción completa en "Clubes/Dinamarca/Silkeborg IF/aarsrapport-2024-12-31.md".

Cifras en DKK MILLONES nativos (documento en DKK'000, dividido por 1.000 al cargar,
mismo criterio que fckobenhavn-dk/brondby-dk/midtjylland-dk/agf-dk).
`fxRef:'DKK@2024-12-31'` — ENTRADA YA EXISTENTE en data/currency-map.js (fx=7,1786,
cierre BCE 31/12/2024), no hizo falta agregar nada nuevo (a diferencia de agf-dk/
osijek-hr/slavenbelupo-hr).

CATEGORIZACIÓN DE INGRESOS (Note 2 "Revenue", 2024 = 93.516, verificado exacto):
  - "Entrance fees" 9.756 → matchday_competition.
  - "TV revenue" 25.150 → broadcasting.
  - "Sponsorship and collaboration agreements" 28.640 → sponsorship_commercial.
  - "Sale of merchandise" 531 → sponsorship_commercial (mismo criterio que
    merchandising de fckobenhavn-dk/agf-dk).
  - "Compensation (FIFA/UEFA/DBU)" 6.188 + "Prize income" 6.711 → competition_bonus,
    12.899 combinado (los dos son pagos ligados a competencias/formación de UEFA-FIFA-
    DBU, no recaudación de boletería).
  - "Food & beverage JYSK PARK" 6.454 → stadium_other (mismo criterio que fckobenhavn-
    dk/agf-dk: concesiones del estadio fuera del partido).
  - "Other revenue" 10.086 → other_income.
  Note 3 "Other operating income" (61.614):
  - "Transfer income" 61.343 → player_sales. La nota de política contable ("Balance
    sheet — Intellectual property rights etc") aclara que "Profits and losses on the
    disposal of contractual rights are calculated as the difference between the sales
    price less sales costs and the carrying amount at the time of sale" — o sea que
    este monto YA es un resultado neto de disposición (ingreso bruto menos valor
    libro), igual que "Andre driftsindtægter" de fckobenhavn-dk/agf-dk, no un ingreso
    bruto de venta con un costo separado en otro lado. Se carga como línea ordinaria
    player_sales (mismo criterio que esos 2 clubes), profitOnPlayerSales:0.
  - "Salary refunds" 271 → other_income (reembolsos de sueldo, ej. por licencia/subsidio).
  - "Public subsidies" 0 y "Sale of property, plant and equipment" 0 este ejercicio, no
    se cargan líneas (monto cero).

CATEGORIZACIÓN DE GASTOS:
  Note 4 "Other external expenses" (35.414, desglosada solo en TEXTO, no en tabla, pero
  con 3 cifras exactas): "match and player expenses" 19.980 → match_organisation_expense;
  "sales and administrative expenses" 14.315 → admin_general_expense; "other staff
  costs" 1.119 → admin_general_expense (costo de personal RESIDUAL, distinto de la línea
  "Staff costs" del cuerpo del income statement — el propio texto de la nota los separa).
  19.980+14.315+1.119=35.414 ✓ exacto.
  Note 5 "Staff costs" (46.801, SIN desglose entre plantel profesional y resto del
  personal — "Average number of full-time employees 66... includes 30 contract
  players", mismo caso que fckobenhavn-dk/agf-dk) → wages_squad, la cifra completa
  (Wages and salaries 44.259 + Pension costs 1.954 + Other social security costs 588).
  "Depreciation, amortisation and impairment losses" (12.444, del cuerpo del income
  statement) SÍ se puede separar cruzando las notas 10 y 11: Note 10 "Amortisation for
  the year" de "Acquired intangible assets" (contractual rights = registraciones de
  jugadores, según la política contable "Intellectual property rights etc") = 4.371 →
  player_amortisation. Note 11 "Depreciation for the year" de "Other fixtures and
  fittings, tools and equipment" (4.023) + "Leasehold improvements" (4.050) = 8.073 →
  depreciation. 4.371+8.073=12.444 ✓ exacto contra el income statement.

RESULTADOS FINANCIEROS: "Other financial income" (Note 6: Financial income from group
enterprises 1.136 + Other interest income 442 = 1.578) - "Other financial expenses"
(Note 7: Other interest expenses 209) = netInterest 1.369 (fiscalYearMeta, coincide
EXACTO con "Net financials 1,369" de la tabla de 5 años de la Management commentary).

IMPUESTO: "Tax on profit/loss for the year" = 13.600 (GASTO, Note 8: Current tax
14.397 + cambio en deferred tax -797) → tax:-13.600.

VERIFICACIÓN (regla #1 de CLAUDE.md, "precisión antes que velocidad"):
  revenueLines suman 155.130 (93.516 Revenue + 61.614 Other operating income) =
  officialTotalRevenue.
  expenseLines suman 94.659 (35.414 Other external expenses + 46.801 Staff costs +
  12.444 Depreciation/amortisation) = officialTotalExpenses.
  155.130 - 94.659 = 60.471, EXACTO igual a "Operating profit/loss" impreso.
  60.471 + netInterest(1.369) = 61.840, EXACTO igual a "Profit/loss before tax" impreso.
  61.840 + tax(-13.600) = 48.240, EXACTO igual a "Profit/loss for the year"
  (officialPAT) impreso. Cierre perfecto en tres pasos, cada uno contra un subtotal
  impreso del documento.

grossDebt: no hay ninguna línea de préstamo bancario en el balance — los pasivos son
  "Prepayments received from customers" (ingresos diferidos, no deuda), "Trade
  payables", "Payables to shareholders and management" (14.048, un pasivo con partes
  relacionadas, no un préstamo bancario etiquetado como tal), "Joint taxation
  contribution payable" y "Other payables". Se cargó grossDebt:0 (aproximación — ver
  reporte de carga, "Payables to shareholders and management" podría discutirse como
  deuda relacionada pero el documento no lo etiqueta como préstamo). cash: "Cash" = 20.522.
============================================================================
```

## 2024

### Meta

_al lado del campo `profitOnPlayerSales`:_

```text
ya capturado íntegro en player_sales (Transfer income, resultado neto de disposición)
```

```text
Other financial income(1.578) - Other financial expenses(209).
Tax on profit/loss for the year: Current tax(14.397) + cambio en deferred tax(-797).
```

## Gestiones

_antes de Kent Madsen (data/gestiones/dk.js):_

```text
2012 a 2015: Kent Madsen firma como Bestyrelsesformand; 2024: Benjamin Albert Boycott figura como chairman y Lyhne como deputy chairman.
```

## Fuentes

### silkeborg-aarsrapport-2024

_note (data/):_

```text
Entidad única (CVR 26397731), sin subsidiarias consolidadas. Auditor: BDO Statsautoriseret revisionsaktieselskab, sin salvedades. Cambio de control societario el 18/12/2024 (Trivela Group V ApS compró 80% del capital), no afecta las cifras del ejercicio 2024. Transcripción completa en Clubes/Dinamarca/Silkeborg IF/aarsrapport-2024-12-31.md.
```
