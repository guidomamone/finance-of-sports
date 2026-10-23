# tottenham-gb — evidencia de carga

Lo que había como comentario en `data/gb/tottenham-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/tottenham-gb-data.js — Tottenham Hotspur Limited (clubId 'tottenham-gb'), Ejercicios
2023/24 y 2024/25 (cerrados el 30 de junio, confirmado en la carátula de los dos documentos:
"Annual Report and Consolidated Financial Statements, 30 June 2024/2025" — OJO, el pedido
original de sourcing asumía 31 de mayo como Arsenal/Liverpool, pero Tottenham cierra 30/6, ya
confirmado antes de esta sesión en Admin/sourcing/Inglaterra/Tottenham Hotspur.md).

ENTIDAD LEGAL: "Tottenham Hotspur Limited" — confirmado LITERAL en la carátula de los dos PDF.
Company Registration No. 1706358 (Companies House, UK). Cuentas CONSOLIDADAS del grupo
("Consolidated income statement"/"Consolidated balance sheet"), no de una entidad individual.

OJO PLANTEL MIXTO: el propio "Strategic report" de los dos ejercicios aclara que "The principal
activities of the Group continue to be the operation of both a men's and a women's professional
football club in England" — las cifras de este archivo son del GRUPO combinado, masculino +
femenino, no solo del plantel masculino. Ídem Arsenal, mismo tipo de aclaración.

Fuente: transcripciones completas en Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-
group-accounts-2023-24.md y -2024-25.md (ya transcriptas antes de esta sesión, no se volvió a
tocar el PDF).

Cifras en GBP MILLONES nativos (el documento reporta en £'000, dividido por 1.000 al cargar).
GBP es moneda NUEVA en el sitio (no existe todavía en data/currency-map.js/FX_CLOSE) — no se tocó
ese archivo en esta sesión, a propósito (fuera de alcance, mismo criterio que arsenal-gb-data.js).
Los dos ejercicios usan `fxRef` ('GBP@2024-06-30'/'GBP@2025-06-30') en vez de un `fx` literal:
ninguno de los dos documentos declara un tipo de cambio propio GBP/USD de cierre para todo el
balance (la Nota de "Financial risk management"/"Financial instruments" solo habla de exposición
cualitativa a moneda extranjera por transferencias de jugadores, sin cotización de cierre), así
que no aplica la regla #0 de club-data-mapping/referencia/fx.md y corresponde `market_close`/`fxRef` en
vez de `fx` literal. El sitio va a tirar un console.warn hasta que se agreguen esas 2 entradas a
FX_CLOSE — esperado, no es trabajo de esta sesión.

----------------------------------------------------------------------------------------------
CATEGORIZACIÓN DE INGRESOS (Note 2 "Revenue and other income", 5 líneas idénticas en los dos
ejercicios):
  - "Match receipts" -> matchday_competition (recaudación de entradas de fútbol, EXCLUYE
    merchandising, según aclara el propio Strategic report: "Matchday receipts excluding
    merchandise from all competitions").
  - "UEFA Prize money" -> competition_bonus (premio por participación/avance en competencia
    europea, línea propia separada de la recaudación de entradas).
  - "TV and media" -> broadcasting.
  - "Commercial" -> sponsorship_commercial.
  - "Other income" -> other_income (no cumple la definición de Revenue de IFRS 15 según el
    propio documento; no tiene nota propia que explique de qué se compone más allá de la mención
    genérica en el Strategic report).
  DUDA GENUINA SIN RESOLVER, documentada en Admin/sourcing/Inglaterra/Tottenham Hotspur.md (no se pudo
  escribir en Admin/dudas-por-club.md en esta sesión: ese archivo está fuera de alcance del
  pedido): el Strategic report narra que "Commercial" (244,744 en 2024) incluye Sponsorship
  revenue (£144,5 M), Merchandising revenue (£36,2 M) y "Other revenue" (£64,0 M, "driven by
  hosting non-football events" — NFL, conciertos, F1 Drive, stadium tours, skywalk, conference &
  events, memberships, catering), y ese "Other revenue" es justo la porción NO futbolística del
  estadio que el pedido de esta tarea pedía evaluar para `stadium_other`. Pero la Nota 2
  ("Revenue comprises") NO desglosa esa porción como línea propia con cifra exacta en £000: el
  quiebre Sponsorship/Merchandising/Other revenue solo aparece en la prosa del Strategic report,
  redondeado a £0,1 M, y sus tres partes no reconcilian centavo a centavo contra el "Commercial"
  de la Nota 2 (244,5 vs. 244,744 en 2024). Por eso, siguiendo el criterio conservador de
  club-data-mapping sección 1 ("stadium_other solo si el rótulo nombra el estadio
  explícitamente"), NO se promovió "Other revenue" a `stadium_other`: el rótulo real de la Nota 2
  es "Commercial" a secas, sin nombrar el estadio, y no hay cifra exacta que separar. Se cargó
  "Commercial" como UNA sola línea (sponsorship_commercial) por su monto exacto de Nota 2. Si en
  el futuro se consigue el desglose exacto (ej. de una nota interna, o preguntándole al club), se
  puede promover la porción de eventos no futbolísticos a `stadium_other` sin tocar el resto.

CATEGORIZACIÓN DE GASTOS (Note 3 "Operating expenses"):
  - "Staff costs" (Note 5, un solo total agregado del grupo, sin desglose de costo por área —
    igual que Arsenal) -> wages_squad.
  - "Depreciation of property, plant and equipment" -> depreciation.
  - "Loss/(profit) on disposal of property, plant and equipment" (línea chica, dentro del cuerpo
    de "Operating expenses excluding football trading", no aparte) -> other_expenses.
  - "Exceptional items - Onerous employment contracts" (2024) / "Onerous employment contracts and
    other employment related payments" (2025): el propio documento la muestra como parte del
    cuerpo de "Operating expenses excluding football trading" (no aparte del resultado
    operativo, a diferencia del "Impairment of player registrations" de Arsenal 2024/25, que
    tampoco es aparte). Se cargó a `admin_general_expense`, NO a `exceptional_items`: la fórmula
    de officialTotalExpenses de este motor es `Math.abs(expenses+nonCash)`, que no suma
    `exceptional_items` (ver plantilla de la tarea) — cargarla ahí habría dejado esa plata fuera
    del total oficial impreso. Es la misma razón por la que Arsenal cargó su "Impairment of
    player registrations" en `player_impairment` (adentro de nonCash) y no en `exceptional_items`.
  - "Other operating costs" -> other_expenses (catch-all sin desglose adicional en las notas
    transcriptas: incluye costos de operación del estadio, organización de partidos, marketing,
    administración, etc. mezclados sin que ninguna nota los separe — a diferencia de Racing/
    Vélez, este documento no tiene una matriz costo×área ni un desglose por departamento).
  - "Amortisation, impairments and other net football trading income and expenditure" -> UNA sola
    línea a `player_amortisation` (135,583 en 2024; 146,720 en 2025), SIN separar amortización de
    deterioro. La Nota 4 ("Profit/(loss) from operations") sí da "Amortisation of intangible
    fixed assets" y "Impairment of intangible fixed assets" por separado (136,287 + 1,822 =
    138,109 en 2024), pero esa suma NO reconcilia contra el neto de 135,583 que imprime la Nota 3
    como parte de "Total operating expenses" (diferencia de 2,526, probablemente algún ítem chico
    de "football trading" no desglosado aparte, ej. comisiones de agentes u otro ajuste neto). Se
    preferyó cargar el número EXACTO de la Nota 3 (el que sí reconcilia contra "Total operating
    expenses" impreso) en una sola línea, en vez de forzar una separación amortización/deterioro
    que introduciría un residuo sin explicación. 2025 no tuvo impairment según Nota 4 (£Nil), así
    que para ese año la línea única es, en la práctica, pura amortización neta.

"netInterest" = Nota 7 "Finance income and costs" (Finance income − Finance costs, NETO), con
signo NEGATIVO en los dos ejercicios (costo neto). "tax" = Nota 8 "Total tax charge/(credit)",
con signo tal que pbt + tax = pat: -0,196 M en 2024 (cargo), +25,962 M en 2025 (crédito).
"profitOnPlayerSales" = Nota 6 "Profit on disposal of intangible fixed assets" (línea NETA
separada del cuerpo de Operating expenses en la Cuenta de resultados, igual criterio que
club-data-mapping sección 2/3). "assetSales" = 0: la ganancia/pérdida por venta de PPE ya está
adentro de "Operating expenses" (ver arriba), no es una línea aparte del cuerpo principal.

"grossDebt" = Nota 16 (2024) / Notas 15+16 (2025) "Interest-bearing loans and borrowings" (Bank
loans secured + Other loans secured — el refinanciamiento del estadio, bonos privados a
inversores de EE.UU. + préstamo de Bank of America Merrill Lynch), la línea angosta de deuda
FINANCIERA que el propio balance separa de "Trade and other payables"/"Deferred income"/
"Deferred tax liabilities"/"Provisions"/"FVTPL liabilities" (mismo criterio que Boca/Arsenal, ver
club-data-mapping/referencia/formato-simplificado.md). En 2024 es 100% no corriente (851,448); en 2025 aparece por
primera vez una porción CORRIENTE (3,986, Nota 15) además de la no corriente (847,666, Nota 16) —
grossDebt 2025 = 3,986+847,666 = 851,652. "cash" = "Cash and cash equivalents" (Balance Sheet).

VERIFICACIÓN (node -e, aritmética reproducible con los números de este archivo):
  2023/24 (año ended 30/6/2024): revenue 528,191 M + expenses (-384,830 M) + nonCash
    (-204,379 M) + profitOnPlayerSales (82,305 M) + netInterest (-47,317 M) + tax (-0,196 M) =
    -26,226 M = officialPAT EXACTO ("Loss for the year" impreso, Nota 21/Cuenta de resultados).
    officialTotalExpenses = |expenses+nonCash| = 589,209 M = "Total operating expenses" impreso
    EXACTO (Nota 3).
  2024/25 (año ended 30/6/2025): revenue 565,266 M + expenses (-464,561 M) + nonCash
    (-203,668 M) + profitOnPlayerSales (52,565 M) + netInterest (-70,230 M) + tax (25,962 M) =
    -94,666 M = officialPAT EXACTO ("Loss for the year" impreso). officialTotalExpenses =
    |expenses+nonCash| = 668,229 M = "Total operating expenses" impreso EXACTO (Nota 3).
Los dos cierran EXACTOS, sin residuo — no hizo falta forzar ningún número.
============================================================================
```

## 2025

### Meta

```text
grossDebt = porción corriente 3.986 (Nota 15, primera vez que aparece) + no corriente 847.666
(Nota 16) = 851.652.
```

## 2024

### Meta

```text
grossDebt = Bank loans (secured) 80.908 + Other loans (secured) 770.540 (Nota 16, refinancia-
miento del estadio), 100% no corriente en este ejercicio. cash = Cash and cash equivalents.
```

## Gestiones

_antes de Daniel Levy (data/gestiones/gb.js):_

```text
Levy: executive chairman desde febrero de 2001 (día aproximado, no verificado en la fuente citada).
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-20) desde Clubes/Inglaterra/Tottenham Hotspur/tottenham-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Tottenham Hotspur/tottenham-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match receipts | pág. 29, precedente |
| 2 | UEFA Prize money (before exceptional item) | pág. 29, precedente |
| 3 | TV and media | pág. 29, precedente |
| 4 | Commercial | pág. 29, precedente |
| 5 | Consideration | pág. 31, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Net book value of disposals | pág. 31, precedente |
| 2 | Salaries and bonuses | pág. 31, precedente |
| 3 | Social security costs | pág. 31, precedente |
| 4 | Other pension costs (see note 25) | pág. 31, precedente |
| 5 | Depreciation of property, plant and equipment | pág. 29, precedente |
| 6 | Profit on disposal of property, plant and equipment | pág. 29, precedente |
| 7 | - Onerous employment contracts | pág. 29, precedente |
| 8 | Other operating costs | pág. 29, precedente |
| 9 | Amortisation, impairments and other net football trading income and expenditure | pág. 29, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): estado = b3. El estado de resultados (Consolidated income statement, pág. 19 del visor, impreso 17) es el bloque b3; el lote lo dejaba 'sin estado de resultados'
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): cierre = 2023-06-30. Consolidated income statement 'for the year ended 30 June 2023' (pág. 19 del visor); el 2024-03-30 del registro es el sello de presentación
tools/cargar.mjs (2026-10-20). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 251.121 (compuerta: documento anterior): estructura de la nota (la suma cierra): tottenham-group-accounts-2022-23.md L1418 "(total sin rótulo: suma las filas de arriba)"
```

### Liga

```text
tools/cargar.mjs (2026-10-20): gb-premierleague, verificado contra roster cacheado de "2022–23 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Tottenham Hotspur".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Tottenham Hotspur/tottenham-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Tottenham Hotspur/tottenham-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: -; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match receipts | pág. 23, precedente |
| 2 | UEFA prize money (before exceptional item) | pág. 23, precedente |
| 3 | TV and media (before exceptional item) | pág. 23, precedente |
| 4 | Commercial | pág. 23, precedente |
| 5 | - UEFA COVID Deduction | pág. 23, precedente |
| 6 | Consideration | pág. 26, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Net book value of disposals | pág. 26, precedente |
| 2 | Salaries and bonuses | pág. 25, Jev 0.99 |
| 3 | Social security costs | pág. 25, Jev 0.97 |
| 4 | Other pension costs (see note 24) | pág. 25, Jev 0.91 |
| 5 | Depreciation of property, plant and equipment | pág. 24, precedente |
| 6 | - Onerous employment contracts | pág. 24, Claude 0.9 |
| 7 | Other operating costs | pág. 24, precedente |
| 8 | Amortisation, impairments and other net football trading income and expenditure | pág. 24, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 209.18 (compuerta: documento siguiente): estructura de la nota (la suma cierra): tottenham-group-accounts-2021-22.md L1282 "(total sin rótulo: suma las filas de arriba)"
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2021–22 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Tottenham Hotspur".
```

## Fuentes

### tottenham-gb-group-accounts-2024

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-group-accounts-2023-24.md. Cuentas consolidadas del grupo. No se encontró un tipo de cambio GBP/USD de cierre declarado por el documento para todo el balance (solo exposición cualitativa a moneda extranjera en transferencias de jugadores) — fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2024-06-30 (pendiente, fuera de alcance de esta sesión, mismo gotcha que arsenal-gb-data.js). Duda abierta sobre el desglose interno de "Commercial" (Sponsorship/Merchandising/Other revenue, este último con ingresos no futbolísticos del estadio) sin cifra exacta en la Nota 2 — ver comentario de cabecera de tottenham-gb-data.js.
```

### tottenham-gb-group-accounts-2025

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Tottenham Hotspur/tottenham-hotspur-group-accounts-2024-25.md. Cuentas consolidadas del grupo. Mismo gotcha de fx que el ejercicio 2024: fxRef apunta a FX_CLOSE, todavía sin entrada GBP@2025-06-30 (pendiente, fuera de alcance de esta sesión). Post balance sheet: el Executive Chairman Daniel Levy dejó el club el 4/9/2025, después del cierre de este ejercicio.
```

### tottenham-gb-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Tottenham Hotspur/tottenham-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### tottenham-gb-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Tottenham Hotspur/tottenham-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

## Otros

### tottenhamGbPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas, 2 ejercicios). Vacíos a propósito, mismo criterio que arsenal-gb-data.js.
```

### gestionesByClub['tottenham-gb']

```text
gestionId 'levy': los dos ejercicios cargados confirman a Daniel Levy como Executive Chairman
durante toda su duración ("Post year end the Executive Chairman, Daniel Levy, left the Club
after nearly 25 years", Strategic report 2024/25; Levy figura como Director ejecutivo saliente
el 4/9/2025 en el Directors' report). ENIC Sports Inc. (controlada por fideicomisos donde Levy y
su familia tienen una participación del 29,88%) es la controlante última confirmada en los dos
Directors' Reports. El rango firstYear/lastYear refleja SOLO los ejercicios efectivamente
cargados (2024-2025), no una fecha de inicio de gestión (dato no confirmado por estos documentos
puntuales). No se usa el nombre "Joe Lewis" acá: ninguno de los 2 documentos lo menciona por
nombre (la trama de propiedad última de ENIC más allá de la familia Levy no está confirmada con
solvencia por ESTA fuente).
```
