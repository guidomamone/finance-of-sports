# arsenal-gb — evidencia de carga

Lo que había como comentario en `data/gb/arsenal-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/arsenal-gb-data.js — Arsenal Holdings Limited (clubId 'arsenal-gb'), Ejercicios 2023/24 y
2024/25 (1° de junio a 31 de mayo — confirmado en la carátula de los dos documentos y en la nota
1(b) "Basis of preparation of Group financial statements": "made up to 31 May 2024/2025").

ENTIDAD LEGAL: "Arsenal Holdings Limited" — confirmado LITERAL en la carátula de los dos PDF
("ARSENAL HOLDINGS LIMITED"), no "plc" como decía el pedido original. Company Registration No.
4250459 (Companies House, UK). Es la HOLDING/matriz del grupo; la sociedad operativa del club en
sí es "The Arsenal Football Club Limited" (n° 00109244, cuentas individuales separadas, no
cargadas acá) — ya estaba anotado así en Admin/sourcing/Inglaterra/Arsenal.md antes de esta sesión.
Cuentas CONSOLIDADAS del grupo ("Group turnover"/"Consolidated Profit and Loss Account"), no
individuales.

Fuente: transcripciones completas en Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-
2023-24.md y -2024-25.md (ya transcriptas antes de esta sesión, no se volvió a tocar el PDF).

Cifras en GBP MILLONES nativos (el documento reporta en £'000, dividido por 1.000 al cargar).
GBP es moneda NUEVA en el sitio (no existe todavía en data/currency-map.js/FX_CLOSE) — no se tocó
ese archivo en esta sesión, a propósito (fuera de alcance). Los dos ejercicios usan `fxRef`
('GBP@2024-05-31'/'GBP@2025-05-31') en vez de un `fx` literal: ninguno de los dos documentos
declara un tipo de cambio propio a USD en su nota de moneda extranjera (Nota 17/18, "Foreign
currency management" — solo cuantifica exposición en EUR/USD/AUD de partidas puntuales, no un TC
de cierre GBP/USD para todo el balance), así que no aplica la regla #0 de club-data-mapping/referencia/fx.md (TC declarado por el documento) y corresponde `market_close`/`fxRef` en vez de un `fx`
literal con `fxSource:'document_close'`. El sitio va a tirar un console.warn hasta que se agregue
la entrada GBP@... a FX_CLOSE — esperado, no es trabajo de esta sesión.

----------------------------------------------------------------------------------------------
CATEGORIZACIÓN DE INGRESOS (Note 3 "Group turnover", 5 líneas en los dos ejercicios):
  - "Gate and other match day revenues" -> matchday_competition.
  - "Broadcasting" -> broadcasting.
  - "Commercial" -> sponsorship_commercial.
  - "Property development"/"Property" (segmento chico de desarrollo inmobiliario, ajeno al
    fútbol) -> other_income (catch-all: no hay categoría de "negocio inmobiliario" en la
    taxonomía y es un monto chico, <0,5% del total).
  - "Player trading" (dentro de Turnover: son fees de PRÉSTAMOS de jugadores recibidos, NO la
    ganancia por venta — ver el propio párrafo debajo de la Cuenta de P&L: "Player trading
    consists primarily of loan fees receivable...") -> player_sales, siguiendo el mapeo pedido
    ("Profit on disposal of players' registrations / player trading -> player_sales").
  - "Profit on disposal of player registrations": línea NETA separada, fuera del cuerpo de
    Turnover/Operating expenses (aparece después de "Operating profit/(loss)" en la Cuenta de
    P&L) -> UNA revenueLine con player_sales, siguiendo club-data-mapping sección 3 (el
    documento la presenta como línea neta separada, se refleja igual). meta.profitOnPlayerSales
    queda en 0 para NO duplicarla (ver comentario del template de la tarea).
  - "Share of joint venture operating loss" (participación en el resultado de Arsenal Broadband
    Limited, método de la participación — Nota 11): es una línea REAL del P&L, entre "Operating
    profit/(loss)" y "Profit on disposal of player registrations", que NINGÚN campo de
    fiscalYearMeta contempla (no es netInterest, tax, profitOnPlayerSales ni assetSales). Se
    cargó como revenueLine (other_income, negativa) para que la fórmula de PAT reconcilie EXACTO
    contra el "Loss for the financial year" impreso — sin esta línea, el PAT calculado quedaba
    £1,934 M / £1,690 M por encima del real en 2024/2025. Es la única categorización de esta
    sesión que no sale directo de la tabla del pedido; documentado para revisar si en el futuro
    se agrega un campo meta dedicado a "resultado de sociedades vinculadas".

CATEGORIZACIÓN DE GASTOS (Note 4 "Operating expenses"):
  - "Amortisation of player registrations" -> player_amortisation.
  - "Impairment of player registrations" (Nota 2, "Exceptional Items" en el propio documento,
    pero SIGUE sumando al total de "Operating expenses" de la Nota 4 — no es una partida aparte
    del resultado operativo) -> player_impairment (no exceptional_items: la fórmula de
    officialTotalExpenses de este motor es `Math.abs(expenses+nonCash)`, que necesita esta plata
    adentro de nonCash para cerrar contra el "Total operating expenses" impreso; exceptional_items
    no participa de esa fórmula). 2023/24 no tuvo impairment (£Nil); 2024/25 sí, £15,241 M.
  - "Depreciation and impairment charges (less amortisation of grants)" -> depreciation.
  - "Staff costs" (Note 6): el documento da la plantilla por ÁREA (Playing/Training/Commercial
    and Administrative/Ground staff) pero el COSTO ("Wages and salaries"+"Social security
    costs"+"Other pension costs") viene en UN solo número agregado, sin desglose de costo por
    área — a diferencia de Vélez (club-data-mapping/referencia/formato-simplificado.md), no hay una matriz costo×área
    que permita separar plantel profesional del resto del personal. Se cargó el total completo a
    wages_squad (mismo criterio ya usado en el proyecto cuando la fuente no separa costo de
    personal por sector, ver club-data-mapping/referencia/casos-por-pais-y-formato.md sobre "Fútbol profesional" de Racing).
  - "Other operating charges" (catch-all sin desglose adicional en las notas: incluye costo de
    mercadería de retail, tarifas profesionales, gastos de organización de partidos, etc.
    mezclados sin una nota que los separe) -> other_expenses.
  - "Cost of property sales" (solo existe como línea separada en el ejercicio 2023/24; en
    2024/25 el propio documento la funde dentro de "Other operating charges" — se ve comparando
    la columna 2024 de la Nota 4 de cada documento: 146,774+1,118 = 147,892, que es exactamente
    el comparativo "2024" que el documento de 2025 imprime ya fusionado) -> other_expenses.

"netInterest" = Nota 5 "Net finance charges" (NETO de "Total interest payable and similar
charges" menos "Interest receivable"), con signo NEGATIVO porque en los dos ejercicios es un
costo neto. "tax" = Nota 8 "Total tax charge/(credit) on loss", con signo tal que
pbt + tax = pat (0 en 2023/24, -0,029 M en 2024/25 — un cargo, no crédito).

"grossDebt" = Nota 21(b) "Analysis of changes in net debt", que el propio documento define
EXPLÍCITO como la suma de "Debentures" + "Balance due to parent undertaking" (esa nota calcula
"Net (debt)" = Cash - Debentures - Balance due to parent undertaking, y ese resultado coincide
EXACTO con el que da esta cuenta) — se preferyó esta línea angosta (deuda financiera real: las
debentures cotizadas + el préstamo del accionista controlante) en vez del Total de "Creditors"
completo (que mezcla acreedores comerciales, impuestos, anticipos de abonos, etc., ver criterio
de club-data-mapping/referencia/formato-simplificado.md). NO se incluyó el préstamo del Barclays de working capital
(£100 M) porque la Nota 17 aclara que estaba SIN USAR ("undrawn committed bank borrowing
facilities") en las dos fechas de cierre. "cash" = "Cash at bank and in hand" (Balance Sheet).

VERIFICACIÓN (node -e, ver detalle numérico en el historial de esta sesión — no se dejó un
archivo de verificación aparte, el cálculo es reproducible con los números de este archivo):
  2023/24: revenue 665,719 M + expenses (-475,714 M) + nonCash (-189,260 M) + netInterest
    (-18,432 M) = -17,687 M = officialPAT EXACTO ("(Loss) for the financial year" impreso).
    officialTotalExpenses = |expenses+nonCash| = 664,974 M = "Total operating expenses" impreso
    EXACTO (Nota 4).
  2024/25: revenue 770,545 M + expenses (-547,560 M) + nonCash (-206,646 M) + netInterest
    (-17,687 M) + tax (-0,029 M) = -1,377 M = officialPAT EXACTO ("(Loss) for the financial
    year" impreso). officialTotalExpenses = |expenses+nonCash| = 754,206 M = "Total operating
    expenses" impreso EXACTO (Nota 4).
Los dos cierran EXACTOS, sin residuo — no hizo falta forzar ningún número.
============================================================================
```

_de data/clubs.js:_

```text
Inglaterra (sesión 2026-09-22): PAÍS NUEVO, LIBRA ESTERLINA (GBP) MONEDA NUEVA, 5 clubes de
Premier League, 2 ejercicios cada uno (2023/24 y 2024/25). `fiscalYearStart` varía por club
(a diferencia de España/Alemania, cada club inglés cierra en una fecha distinta, confirmada
en su propio documento): Arsenal/Liverpool cierran 31 de mayo (`'06-01'`), Manchester
City/Everton/Tottenham cierran 30 de junio (`'07-01'`).
```

## 2024

### Meta

```text
grossDebt = Debentures (17.722) + Balance due to parent undertaking, KSE UK Inc. (324.062) —
ver comentario de cabecera. cash = Cash at bank and in hand.
```

## Gestiones

_antes de Stan Kroenke (data/gestiones/gb.js):_

```text
Kroenke pasó a ser accionista mayoritario el 11/4/2011 (62,89%); recién en 2018 compró el 100%. Dueño; el chairman operativo fue otra persona.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Turnover of the Group including its share of joint ventures | pág. 18, Jev 0.98 |
| 2 | Share of turnover of joint venture | pág. 18, precedente |
| 3 | Profit on disposal of player registrations | pág. 18, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Amortisation of player registrations | pág. 28, precedente |
| 2 | Impairment of player registrations (see note 2) | pág. 28, precedente |
| 3 | Depreciation and impairment charges (less amortisation of grants) | pág. 28, precedente |
| 4 | Wages and salaries | pág. 30, Claude 0.92 |
| 5 | Social security costs | pág. 30, Jev 0.91 |
| 6 | Other pension costs | pág. 30, Jev 0.91 |
| 7 | Cost of property sales | pág. 28, precedente |
| 8 | Other operating charges | pág. 28, precedente |
| 9 | Share of joint venture operating (loss) | pág. 18, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-19): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2024, 2025): Comercial / Sponsors, Estadio, Televisión
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 234.766 (compuerta: documento anterior): estructura de la nota (la suma cierra): arsenal-holdings-group-accounts-2022-23.md L1347 "(total sin rótulo: suma las filas de arriba)"
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2022–23 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Arsenal".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Turnover of the Group including its share of joint ventures | pág. 18, Jev 0.98 |
| 2 | Share of turnover of joint venture | pág. 18, precedente |
| 3 | Profit on disposal of player registrations | pág. 18, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Amortisation of player registrations | pág. 28, precedente |
| 2 | Impairment of player registrations | pág. 28, precedente |
| 3 | Depreciation and impairment charges (less amortisation of grants) | pág. 28, precedente |
| 4 | Wages and salaries | pág. 30, Claude 0.92 |
| 5 | Social security costs | pág. 30, Jev 0.91 |
| 6 | Other pension costs | pág. 30, Jev 0.91 |
| 7 | Cost of property sales | pág. 28, precedente |
| 8 | Other operating charges | pág. 28, precedente |
| 9 | Share of joint venture operating (loss) | pág. 18, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee.
```

```text
tools/dentro-de-otro.mjs (2026-10-19): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2024, 2025): Comercial / Sponsors, Estadio, Televisión
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 212.345 (compuerta: documento siguiente): estructura de la nota (la suma cierra): arsenal-holdings-group-accounts-2021-22.md L1347 "(total sin rótulo: suma las filas de arriba)"
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2021–22 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Arsenal".
```

## Fuentes

### arsenal-gb-group-accounts-2024

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2023-24.md. Cuentas consolidadas del grupo (no las individuales de The Arsenal Football Club Limited, n° 00109244). No se encontró un tipo de cambio GBP/USD propio declarado por el documento (Nota 17/18 solo cuantifica partidas puntuales en EUR/USD/AUD, no un TC de cierre para todo el balance) — fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2024-05-31 (pendiente, fuera de alcance de esta sesión).
```

### arsenal-gb-group-accounts-2025

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2024-25.md. Cuentas consolidadas del grupo. Mismo gotcha de fx que el ejercicio 2024: fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2025-05-31 (pendiente, fuera de alcance de esta sesión).
```

### arsenal-gb-holdings-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### arsenal-gb-holdings-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Arsenal/arsenal-holdings-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### arsenalGbPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas, 2 ejercicios). Vacíos a propósito, mismo criterio que otros clubes onboardeados
solo para Finanzas (ver data/es/valenciacf-es-data.js).
```

### gestionesByClub['arsenal-gb']

```text
gestionId 'kroenke': los dos ejercicios cargados confirman a E.S. Kroenke / KSE UK Inc. como
controlante último ("Funding is provided mainly by the ultimate parent company, KSE UK Inc....";
"The ultimate parent undertaking and controlling party is KSE UK Inc.... wholly-owned and
controlled by Mr E.S. Kroenke") en los dos Directors' Reports. El rango firstYear/lastYear
refleja SOLO los ejercicios efectivamente cargados (2024-2025), no se afirma acá desde cuándo
dura la gestión Kroenke en general (dato no confirmado por estos documentos).
```
