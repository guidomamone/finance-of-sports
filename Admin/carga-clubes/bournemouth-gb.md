# bournemouth-gb — evidencia de carga

Lo que había como comentario en `data/gb/bournemouth-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/bournemouth-gb-data.js — AFC Bournemouth Limited (clubId 'bournemouth-gb'), Ejercicios
2023/24 (año ended 30 junio 2024) y 2024/25 (año ended 30 junio 2025).

ENTIDAD LEGAL: "AFC Bournemouth Limited", Companies House n° 06632170 — cuentas de la SOCIEDAD
individual (`Full accounts`), no hay grupo consolidado separado (a diferencia de Arsenal/Burnley).
Ejercicio 1° de julio a 30 de junio (fiscalYearStart '07-01' en data/clubs.js, mismo criterio que
Man City/Everton/Tottenham).

Fuente: transcripciones completas en Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-
2023-24.md y -2024-25.md (ya transcriptas antes de esta sesión).

Cifras en GBP MILLONES nativos (documento en £'000, /1.000 al cargar). fx: ninguno de los 2
documentos declara un tipo de cambio propio a USD -> fxRef a FX_CLOSE (GBP@2024-06-30/
GBP@2025-06-30, ya existentes, mismas fechas que Man City/Everton/Tottenham).

REGLA DE CLUB-DATA-MAPPING SECCIÓN 6.5 aplicada: el ejercicio 2024 se cargó de SU PROPIA
presentación (el documento `bournemouth-full-accounts-2023-24.md`, formato FRS 102 "clásico"), NO
de la columna comparativa "2024" que aparece DENTRO del documento `-2024-25.md` — ese documento
adoptó una presentación nueva (con "Right-of-use assets"/leases, ver Nota de arrendamientos) que
restata levemente el 2024 comparativo (ej. depreciación pasa de 1.896 a 2.391 al sumarle
amortización de right-of-use assets). Los dos son el mismo hecho económico, presentado distinto:
se usa siempre la presentación PROPIA del ejercicio, nunca la comparativa de un documento
posterior.

----------------------------------------------------------------------------------------------
CATEGORIZACIÓN DE INGRESOS (Note 4 "Turnover"/Note 5 "Revenue", 6 líneas de "class of business" +
Note 5/6 "Other operating income" + la línea neta de venta de jugadores):
  - "Match and season ticket income" (línea COMBINADA, el documento no separa taquilla partido a
    partido de abonos de temporada) -> matchday_competition, mismo criterio que Talleres (cuando
    el documento no reporta una línea de abonos separada, todo va a matchday_competition, no se
    inventa una separación que la fuente no da).
  - "Premier League income" (distribuciones centrales de la liga: TV, facility fees, mérito,
    solidaridad — el propio Strategic Report lo describe como "central distributions") ->
    broadcasting.
  - "Sponsorship and advertising" -> sponsorship_commercial.
  - "Shop merchandise" -> sponsorship_commercial (merchandising, mismo criterio que Eintracht
    Frankfurt/Köln).
  - "Hospitality and events" -> other_income (NO stadium_other: el rótulo no nombra el estadio,
    criterio conservador de club-data-mapping sección 1 — mismo tratamiento que le dio Everton
    a su línea "hospitality, catering, events").
  - "Other income" (Note 4/5, catch-all explícito) -> other_income.
  - "Other operating income": el documento NO la separa en columnas como Burnley, pero SÍ
    desglosa en una nota que "£X de £Y corresponde a lo recibido por jugadores a préstamo en
    otros clubes" — se partió en 2 líneas para reflejar esa nota (loan fees -> player_sales, resto
    sin especificar -> other_income), en vez de cargar el monto entero bajo una sola categoría:
    2024 (£8,825k total): £8,257k loan fees -> player_sales, £568k resto -> other_income.
    2025 (£17,398k total): £15,199k loan fees -> player_sales, £2,199k resto -> other_income.
  - "Profit on disposal of players' registrations" -> player_sales, línea neta separada después
    de operating profit, mismo criterio que Arsenal/Everton/Burnley. meta.profitOnPlayerSales
    queda en 0 para no duplicarla.

CATEGORIZACIÓN DE GASTOS:
  - "Staff costs" (Note 9): headcount por área (Playing/Academy/Matchday) pero costo agregado sin
    desglose por área -> wages_squad completa, mismo criterio que el resto de los clubes ingleses.
  - "Depreciation of tangible assets" (2024) / "Depreciation of tangible assets and right-of-use
    assets" (2025, ya incluye la amortización de los right-of-use del nuevo estándar de leases) ->
    depreciation.
  - "Amortisation of intangibles" (Note 14/párrafo de intangibles: player registration costs +
    website/software, ~99,9% jugadores en los 2 ejercicios — el residuo de website/software es
    £39k de £61.616k en 2024, no separable de forma material) -> player_amortisation, el monto
    completo (la porción de software es <0,1%, ver Nota de intangibles para el detalle: 2024
    61.577 jugadores + 39 website = 61.616; cifra equivalente en 2025 no se desglosó por ser
    igual de inmaterial).
  - "Other operating expenses" (línea del P&L sin ninguna nota que la desglose en ningún lado del
    documento) -> other_expenses.
  - "Exceptional other operating income" (2023 solamente, £71.444k por la extinción de deuda de
    accionista previa al cambio de control a Black Knight/Cannae — Nota 6): NO se carga, es
    comparativo del ejercicio 2022/23, fuera del alcance de esta sesión (solo 2024 y 2025).

"netInterest" = "Interest receivable and similar income"/"Investment income" menos "Interest
payable and similar expenses"/"Finance costs", NEGATIVO en los 2 ejercicios. "tax" = 0 en los 2
ejercicios (Note 13, "Total tax charge for the financial year" = £Nil los 2 años — el Club no
tiene ganancias imponibles, arrastra pérdidas fiscales sin reconocer el activo por impuesto
diferido).

"grossDebt": el propio documento define "Borrowings" (Nota 18 del `-2024-25.md`, que da el
desglose EXACTO también para el comparativo 2024) como Bank loans + Loans from fellow group
undertakings (el préstamo interest-free del accionista controlante, Black Knight Football Club UK
Limited) — se siguió esa clasificación PROPIA del documento (no separar el préstamo de accionista
como si no fuera deuda), a diferencia de tratarlo como una cuenta a pagar más: 2024 = Bank loans
33,000 (3,000 corriente + 30,000 no corriente, ver Note 19/20 del `-2023-24.md`) + Loans from
fellow group undertakings 89,779 = 122,779. 2025 = Bank loans 48,905 solamente (el préstamo de
accionista se convirtió íntegro a acciones A Ordinarias durante el ejercicio — Nota 18/25 del
`-2024-25.md`, "following the conversion of shareholder loans to A ordinary shares"). "cash" =
"Cash at bank and in hand" (Statement of Financial Position).

VERIFICACIÓN (a mano, sumando cada línea contra los totales impresos — los 2 ejercicios
reconcilian EXACTOS, sin residuo):
  2023/24: revenue 169,868 M (6,531+135,631+12,120+3,226+1,542+1,742+8,257+0,568+0,251) +
    expenses (wages -136,170 + other_expenses -26,026 = -162,196) + nonCash (depreciation -1,896
    + player_amortisation -61,616 = -63,512) = -55,840 = "Operating (loss)/profit" impreso EXACTO.
    + netInterest (191-10,502=-10,311) = -66,151 = "(Loss)/profit before taxation" impreso EXACTO.
    + tax (0) = -66,151 = officialPAT EXACTO ("(Loss)/profit for the financial year" impreso).
  2024/25: revenue 290,131 M (6,738+147,999+18,107+4,672+1,868+2,332+15,199+2,199+91,017) +
    expenses (wages -158,422 + other_expenses -31,281 = -189,703) + nonCash (depreciation -2,989
    + player_amortisation -69,165 = -72,154) = 28,274 = "Operating profit/(loss)" impreso EXACTO.
    + netInterest (5,312-18,699=-13,387) = 14,887 = "Profit/(loss) before tax" impreso EXACTO. +
    tax (0) = 14,887 = officialPAT EXACTO ("Profit/(loss) for the financial year" impreso).
Los dos cierran EXACTOS, sin residuo.
============================================================================
```

## 2025

### Meta

```text
grossDebt = "Borrowings", Bank loans solamente (48.905): el préstamo de accionista se
convirtió íntegro a acciones durante el ejercicio.
```

## 2024

### Meta

```text
grossDebt = "Borrowings" (Bank loans 33.000 + Loans from fellow group undertakings 89.779,
clasificación propia del documento, ver comentario de cabecera). cash = Cash at bank and in
hand.
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match and season ticket income | pág. 28, precedente |
| 2 | English football league and FA Cup income | pág. 28, precedente |
| 3 | Premier League income | pág. 28, precedente |
| 4 | Sponsorship and advertising | pág. 28, precedente |
| 5 | Hospitality and events | pág. 28, precedente |
| 6 | Shop merchandise | pág. 28, precedente |
| 7 | Other income | pág. 28, precedente |
| 8 | Other operating income | pág. 17, Jev 1 |
| 9 | Exceptional other operating income | pág. 17, Jev 0.99 |
| 10 | Profit on disposal of players' registrations | pág. 17, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wages and salaries | pág. 29, Claude 0.9 |
| 2 | Social security costs | pág. 29, Jev 0.93 |
| 3 | Other pension costs | pág. 29, Jev 0.92 |
| 4 | Depreciation of tangible assets | pág. 29, precedente |
| 5 | Amortisation of intangibles | pág. 29, precedente |
| 6 | Other operating expenses | pág. 17, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2022–23 Premier League" (tools/club-league-reference/gb.json), coincidencia única por palabras "Bournemouth" = "AFC Bournemouth".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Match and season ticket income | pág. 27, precedente |
| 2 | English football league and FA Cup income | pág. 27, precedente |
| 3 | Premier League income | pág. 27, precedente |
| 4 | Sponsorship and advertising | pág. 27, precedente |
| 5 | Hospitality and events | pág. 27, precedente |
| 6 | Shop merchandise | pág. 27, precedente |
| 7 | Other income | pág. 27, precedente |
| 8 | Other operating income | pág. 15, Jev 1 |
| 9 | Profit on disposal of players' registrations | pág. 15, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Wages and salaries | pág. 28, Claude 0.9 |
| 2 | Social security costs | pág. 28, Jev 0.93 |
| 3 | Other pension costs | pág. 28, Jev 0.92 |
| 4 | Depreciation of tangible assets | pág. 27, precedente |
| 5 | Amortisation of intangibles | pág. 27, precedente |
| 6 | Other operating expenses | pág. 15, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

```text
tools/caja-deuda.mjs --personal (2026-10-23): staffCost 61.381 (compuerta: estructura de la nota): estructura de la nota (la suma cierra): bournemouth-full-accounts-2021-22.md L1101 "(total sin rótulo: suma las filas de arriba)"
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-championship, verificado contra roster cacheado de "2021–22 EFL Championship" (tools/club-league-reference/gb.json), coincidencia única por palabras "Bournemouth" = "AFC Bournemouth".
```

## Fuentes

### bournemouth-gb-full-accounts-2024

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2023-24.md. No se encontró un tipo de cambio GBP/USD propio declarado por el documento — fxRef apunta a FX_CLOSE (GBP@2024-06-30).
```

### bournemouth-gb-full-accounts-2025

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2024-25.md. Adopta una presentación nueva (leases/right-of-use assets) que restata levemente el comparativo 2024 — se usó SIEMPRE la presentación propia de cada ejercicio, nunca la comparativa del documento del año siguiente (ver comentario de cabecera de data/gb/bournemouth-gb-data.js). fxRef apunta a FX_CLOSE (GBP@2025-06-30).
```

### bournemouth-gb-full-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### bournemouth-gb-full-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/AFC Bournemouth/bournemouth-full-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### bournemouthGbPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas, 2 ejercicios). Vacíos a propósito, mismo criterio que otros clubes onboardeados
solo para Finanzas.
```

### gestionesByClub['bournemouth-gb']

```text
gestionId 'foley': los dos ejercicios confirman a Black Knight Football Club UK Limited
(controlado por Cannae Holdings Inc y William P. Foley II) como matriz/controlante último desde
diciembre de 2022 ("Ultimate parent undertaking and controlling party... William P. Foley II").
El rango firstYear/lastYear refleja SOLO los ejercicios efectivamente cargados (2024-2025).
```

## Gestiones (Finanzas 5, 2026-10-19)

- Maxim Demin, Dueño, desde 2011 (solo el año: Wikipedia "In 2011, Demin became co-owner", `desde` 2011-01-01) hasta 2022-12-13, cuando Black Knight Football Club (Bill Foley) compró el 100 %. Cubre el cierre 2022-06-30. Jeff Mostyn fue Chairman (compró en 2007) y dejó el cargo con la venta a Foley; las fuentes no coinciden en sus fechas, y el sitio registra al dueño.
