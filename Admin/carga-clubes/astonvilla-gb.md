# astonvilla-gb — evidencia de carga

Lo que había como comentario en `data/gb/astonvilla-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/astonvilla-gb-data.js — Aston Villa Football Club Limited (clubId 'astonvilla-gb'), UN SOLO
ejercicio: 2024/25 (año ended 30 junio 2025). NO se cargó 2023/24: la única transcripción
disponible (aston-villa-full-accounts-2024-25.md) trae el ejercicio ANTERIOR como un período de
13 MESES (1 junio 2023 a 30 junio 2024, cambio de fecha de cierre), no comparable año a año con
ningún otro ejercicio del sitio — cargar solo el año corriente (12 meses, 1 julio 2024 a 30 junio
2025), que sí es un ejercicio normal.

ENTIDAD LEGAL: "Aston Villa Football Club Limited", Companies House n° 03375789. Cuentas de la
SOCIEDAD individual (`Full accounts`), no consolidadas — el documento aclara que el grupo mayor
que consolida es NSWE UK Limited y el menor NSWE Sports Limited (ninguno de los dos deposita en
Companies House un balance separado del club). fiscalYearStart '07-01' (mismo criterio que Man
City/Everton/Tottenham/Bournemouth/Brentford/Brighton, todos cierre 30/6).

**OJO, LIMITACIÓN GENUINA DE ESTE DOCUMENTO (anotada en Admin/dudas-por-club.md)**: a diferencia
de TODOS los demás clubes ingleses cargados, esta entidad NO tiene ningún activo intangible en su
balance (no hay línea "Intangible assets"/"Player registrations" en el Statement of Financial
Position) y su P&L no reporta ninguna línea de amortización de pases, deterioro de pases, ni
"profit on disposal of players' registrations" — cero mención de compraventa de jugadores en todo
el documento. Los costos de plantel profesional y los pases de jugadores casi con certeza viven en
OTRA entidad del grupo NSWE (no depositada en Companies House como cuentas separadas, o
consolidada solo a nivel NSWE UK Limited/NSWE Sports Limited), no en esta. El "Operating expenses"
de este documento (línea única del P&L, £433,407k en 2025) es genuinamente un LUMP: la nota
"Operating loss is stated after charging" solo desglosa Depreciation (£8,737k) y Staff costs
(£20,578k) — apenas 6,8% del total —, el 93,2% restante (£404,092k) no tiene ningún desglose en
ningún lado del documento. Esto es consistente con que el plantel profesional (su costo salarial,
que normalmente ronda 50-70% del turnover de un club de Premier League) no está en esta entidad:
"Staff costs" de solo £20,578k es demasiado bajo para incluir sueldos de jugadores de un plantel
de Premier League, y el propio detalle de headcount (Directors/Commercial/Maintenance/Matchday,
SIN ninguna categoría de "Playing staff") lo confirma. Se cargó tal cual lo reporta el documento
(ver mapeo abajo), sin inventar una separación que la fuente no permite, pero con esta limitación
documentada: los KPIs de este club van a mostrar Ingresos reales pero "Compra de jugadores"/
"Salarios y primas" con muy poca representación real en Formato Simplificado.

Fuente: transcripción completa en Clubes/Inglaterra/Aston Villa/aston-villa-full-accounts-2024-
25.md (ya transcripta antes de esta sesión).

Cifras en GBP MILLONES nativos (documento en £'000, /1.000 al cargar). fx: el documento no
declara un tipo de cambio propio a USD -> fxRef 'GBP@2025-06-30' (FX_CLOSE, ya existente).

----------------------------------------------------------------------------------------------
CATEGORIZACIÓN DE INGRESOS (nota "Turnover", 5 líneas, análisis por "class of business"):
  - "Gate receipts" ("Revenues generated from the sale of match tickets") -> matchday_competition.
  - "Broadcasting" ("Distributions from the FA Premier League and English Football League
    broadcasting agreements, including the merit award, cup competition broadcasting rights and
    local radio broadcasting") -> broadcasting.
  - "Sponsorship" ("Major sponsorship contracts and club partnership agreements") ->
    sponsorship_commercial.
  - "Commercial" ("Merchandising, royalties, conference and banqueting and all other revenue
    sources") -> sponsorship_commercial, mismo criterio que el bucket "Commercial" de
    Arsenal/Liverpool/Everton.
  - "UEFA" ("Distributions from UEFA including the merit award and cup competition broadcasting
    rights") -> broadcasting, NO competition_bonus: el propio documento define "Broadcasting"
    (doméstico) con la MISMA fórmula ("...including the merit award...") que "UEFA"
    (internacional) — el club trata el merit award como parte de Broadcasting en los dos casos,
    no como una categoría de premios separada (a diferencia de Tottenham, que sí separa "UEFA
    Prize money" de "TV and media" como 2 líneas propias distintas).
  - "Other operating income" (Insurance claims receivable + V Sports recharge): AMBAS líneas en
    £Nil para el ejercicio 2024/25 (solo tuvieron valor en el comparativo de 13 meses) -> no se
    carga ninguna línea, monto real es cero.

CATEGORIZACIÓN DE GASTOS (P&L: una sola línea "Operating expenses" £433,407k, ver limitación
arriba):
  - "Staff costs" (única cifra disclosed dentro de la nota "Operating loss is stated after
    charging", £20,578k) -> wages_squad.
  - "Depreciation of tangible assets" (misma nota, £8,737k) -> depreciation.
  - Resto de "Operating expenses" sin desglosar (£433,407k - £20,578k - £8,737k = £404,092k) ->
    lump_football_operations_expense (caso genuino de la regla de club-data-mapping sección 1: el
    documento de verdad no separa nada más, no hay ningún encabezado de grupo con líneas
    numeradas debajo que promover).
  - "Loss on disposal of tangible assets" (£84k, línea separada después de operating loss, activos
    FIJOS no jugadores) -> meta.assetSales (NEGATIVO, es una pérdida), no revenueLine/expenseLine.

"netInterest" = "Interest payable and similar expenses" (Bank interest payable, £262k) — no hay
ninguna línea de interés A FAVOR en este ejercicio. "tax" = "Taxation" (Note 10), CRÉDITO de
£1,171k (positivo).

"grossDebt" = Note 15 "Creditors: amounts falling due after more than one year" / nota "Loans":
Bank loans (revolving facility con Goldman Sachs, £78,071k drawn) + Other loans (factored
receivable loan con Goldman Sachs, £32,500k) = £110,571k, TODO no corriente (no hay porción
corriente de préstamos en la Nota 14). "cash" = "Cash at bank and in hand" (Statement of Financial
Position, £6,299k).

VERIFICACIÓN (a mano, sumando cada línea contra los totales impresos — reconciliación EXACTA):
  2024/25: revenue 359,277 M (38,452+170,717+28,646+51,230+70,232, exacto contra Turnover
    impreso) + expenses (wages -20,578 + lump_football_operations_expense -404,092 = -424,670) +
    nonCash (depreciation -8,737) = -74,130 = "Operating loss" impreso EXACTO. + assetSales
    (-0,084) + netInterest (-0,262) = -74,476 = "Loss before tax" impreso EXACTO. + tax (1,171) =
    -73,305 = officialPAT EXACTO ("Loss for the financial year" impreso). officialTotalExpenses =
    |expenses+nonCash| = 433,407 M = "Operating expenses" impreso EXACTO.
============================================================================
```

_de data/clubs.js:_

```text
4 clubes ingleses más (onboarding 2026-09-25, mismo pool de PDF transcriptos). brandColor
verificado contra footylogos.com.
```

_de data/club-leagues/gb.js:_

```text
4 clubes ingleses más: Aston Villa (solo 2025 cargado), Bournemouth y Brentford jugaron Premier
League en todos sus ejercicios cargados (confirmado en el propio documento de cada uno, no
asumido). Burnley es la excepción: 2024 Premier League (recién ascendido, descendió 19°), 2025
Championship (recién descendido, ascendió de nuevo terminando 2°) — confirmado también en el
propio documento ("Turnover has decreased... due to the Club competing in the Championship,
compared to the Premier League").
```

## 2025

### Meta

```text
grossDebt = Bank loans (78.071) + Other loans/factored receivable (32.500), Note 15, todo no
corriente. cash = Cash at bank and in hand.
```

## Gestiones

_antes de Nassef Sawiris (data/gestiones/gb.js):_

```text
NSWE compró el control el 20-21/7/2018 (fecha aproximada: anuncio del club). Xia siguió de co-chairman hasta agosto de 2019; Sawiris quedó como chairman.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Aston Villa/astonvilla-full-accounts-2023-24.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 23, precedente |
| 2 | Broadcasting | pág. 23, precedente |
| 3 | Sponsorship | pág. 23, precedente |
| 4 | Commercial | pág. 23, precedente |
| 5 | UEFA | pág. 23, precedente |
| 6 | Insurance claims receivable | pág. 23, Jev 1 |
| 7 | V Sports recharge | pág. 23, Jev 0.92 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Depreciation of tangible assets (see note 11) | pág. 24, precedente |
| 2 | Wages and salaries | pág. 24, Claude 0.93 |
| 3 | Social security costs | pág. 24, Jev 0.91 |
| 4 | Other pension costs | pág. 24, Jev 0.95 |
| 5 | Other operating charges | pág. 24, Jev 1 |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2023–24 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Aston Villa".
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-19) desde Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Aston Villa/astonvilla-full-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 21, precedente |
| 2 | Broadcasting | pág. 21, precedente |
| 3 | Sponsorship | pág. 21, precedente |
| 4 | Commercial | pág. 21, precedente |
| 5 | Other operating income | pág. 13, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Depreciation of tangible assets | pág. 22, precedente |
| 2 | Wages and salaries | pág. 22, Claude 0.88 |
| 3 | Social security costs | pág. 22, Jev 0.91 |
| 4 | Other pension costs | pág. 22, Claude 0.85 |
| 5 | Other operating charges (including exceptional costs) | pág. 22, precedente |

### Meta

```text
tools/cargar.mjs (2026-10-19). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

### Liga

```text
tools/cargar.mjs (2026-10-19): gb-premierleague, verificado contra roster cacheado de "2022–23 Premier League" (tools/club-league-reference/gb.json), coincidencia exacta "Aston Villa".
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Aston Villa/astonvilla-full-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate Receipts | pág. 20, precedente |
| 2 | Broadcasting | pág. 20, precedente |
| 3 | Sponsorship | pág. 20, precedente |
| 4 | Commercial | pág. 20, precedente |
| 5 | Other operating income | pág. 12, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses | pág. 12, Jev 1 |
| 2 | Exceptional administrative expenses | pág. 12, Claude 0.8 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): incluye = wages_squad. Aston Villa 2022 (a pedido de Guido): igual que 2020, «Administrative expenses» sin desglose y nota de personal de la sociedad sin el plantel (L768-L771)
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2020-21.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Aston Villa/astonvilla-full-accounts-2020-21.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate Receipts | pág. 20, precedente |
| 2 | Broadcasting | pág. 20, precedente |
| 3 | Sponsorship | pág. 20, precedente |
| 4 | Commercial | pág. 20, precedente |
| 5 | Other operating income | pág. 12, Jev 0.99 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses | pág. 12, Jev 1 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): incluye = wages_squad. Aston Villa 2021 (a pedido de Guido): igual que 2020, «Administrative expenses» sin desglose y nota de personal de la sociedad sin el plantel (L707)
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2019-20.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Aston Villa/astonvilla-full-accounts-2019-20.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 20, precedente |
| 2 | Broadcasting | pág. 20, precedente |
| 3 | Sponsorship | pág. 20, precedente |
| 4 | Commercial | pág. 20, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses | pág. 12, Jev 1 |
| 2 | Loss on sale of tangible assets | pág. 12, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): incluye = wages_squad. Aston Villa 2020 (a pedido de Guido): una sola línea de gasto, «Administrative expenses» 203 M£ sin desglose (L394); la nota de personal (L731-L739, 8,3 M£) no incluye al plantel; los sueldos del plantel están posiblemente dentro de esa línea
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-23) desde Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2018-19.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Aston Villa/astonvilla-full-accounts-2018-19.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Gate receipts | pág. 17, precedente |
| 2 | Broadcasting | pág. 17, precedente |
| 3 | Sponsorship. | pág. 17, precedente |
| 4 | Commercial | pág. 17, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Administrative expenses | pág. 10, Jev 1 |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): resultado-final = (111,776,896). El estado de resultados imprime 'Loss for the financial year (111,776,896)' (en texto, sin tabla) y la extracción no lo localizó: officialPAT quedaba vacío (TODO 370, balance-sin-pat)
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-23): incluye = wages_squad. Aston Villa 2019 (a pedido de Guido): el documento imprime una sola línea de gasto, «Administrative expenses», sin desglose, y la nota de personal de la sociedad (8 M£) no incluye al plantel; los sueldos del plantel están posiblemente dentro de esa línea
tools/cargar.mjs (2026-10-23). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
incluidoEn: ajuste manual `incluye`: el documento junta estas categorías con otra línea.
```

## Fuentes

### astonvilla-gb-full-accounts-2025

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Aston Villa/aston-villa-full-accounts-2024-25.md. Entidad individual, no consolidada — NO reporta activos intangibles ni compraventa de jugadores en absoluto, ver limitación documentada en el comentario de cabecera de data/gb/astonvilla-gb-data.js y en Admin/dudas-por-club.md. El ejercicio anterior (13 meses, no comparable) no se cargó. fxRef apunta a FX_CLOSE (GBP@2025-06-30).
```

### astonvilla-gb-full-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### astonvilla-gb-full-accounts-2018-19

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2018-19.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### astonvilla-gb-full-accounts-2020-21

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2020-21.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### astonvilla-gb-full-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### astonvilla-gb-full-accounts-2019-20

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2019-20.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### astonvilla-gb-full-accounts-2023-24

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-19) desde la transcripción Clubes/Inglaterra/Aston Villa/astonvilla-full-accounts-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### astonvillaGbPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
solo Finanzas, 1 ejercicio). Vacíos a propósito, mismo criterio que otros clubes onboardeados
solo para Finanzas.
```

### gestionesByClub['astonvilla-gb']

```text
gestionId 'nswe': "V Sports S.C.S." (Luxemburgo) es la controlante última confirmada en la Nota
"Controlling party" — el grupo mayor que consolida es NSWE UK Limited (Nassef Sawiris / Wes
Edens). firstYear/lastYear reflejan el único ejercicio cargado.
```

## 2024: ejercicio de 13 meses (Finanzas 5, 2026-10-19)

El documento `astonvilla-full-accounts-2023-24` cubre "THE 13 MONTH PERIOD ENDED 30 JUNE 2024": la sociedad cambió el cierre del 31 de mayo al 30 de junio (1-06-2023 al 30-06-2024). Se cargó como el año 2024, con los importes tal cual y sin prorratear, con el criterio de Wolves 2025 (`Admin/carga-clubes/wolves-gb.md`): el período contiene la temporada entera y no hay otro tramo que buscar; la cadena de cierres es 2023-05-31, 2024-06-30 y 2025-06-30. fxRef `GBP@2024-06-30` (ajuste `cierre` 2024-06-30 al PDF). La compuerta de transición de `cargar.mjs` (11 meses) no reconoce 13: se salteó a mano esa sola vez, con un parche temporal que no se commiteó (el archivo quedó como estaba); reconocer 13 meses va con la z2. Las comparaciones año a año 2023 (12 meses) contra 2024 (13 meses) sobreestiman el crecimiento: un mes de más. Ingresos 268,192 M £ (turnover 263,079 + otros 5,113) y resultado -49,425 M £, iguales a lo impreso.
