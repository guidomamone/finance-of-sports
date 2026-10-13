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

## Fuentes

### astonvilla-gb-full-accounts-2025

_note (data/):_

```text
PDF con texto nativo (no escaneo), transcripción completa en Clubes/Inglaterra/Aston Villa/aston-villa-full-accounts-2024-25.md. Entidad individual, no consolidada — NO reporta activos intangibles ni compraventa de jugadores en absoluto, ver limitación documentada en el comentario de cabecera de data/gb/astonvilla-gb-data.js y en Admin/dudas-por-club.md. El ejercicio anterior (13 meses, no comparable) no se cargó. fxRef apunta a FX_CLOSE (GBP@2025-06-30).
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
