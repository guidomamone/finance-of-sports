# liverpool-gb — evidencia de carga

Lo que había como comentario en `data/gb/liverpool-gb-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/gb/liverpool-gb-data.js — Liverpool FC (The Liverpool Football Club and
Athletic Grounds Limited, Companies House n° 00035668).

Fuente: "Annual report and consolidated financial statements" depositados en
Companies House UK, cuentas CONSOLIDADAS, ejercicio cerrado el 31 de mayo.
31/5/2024 = temporada 2023/24; 31/5/2025 = temporada 2024/25. Confirmado en la
carátula de cada documento (pág. 1: "31 May 2024"/"31 May 2025") y en el Group
Strategic Report ("...for the year ended 31 May 2024/2025"). Transcripciones
completas en Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2023-24.md
y liverpool-group-accounts-2024-25.md.

Cifras en LIBRAS ESTERLINAS (GBP) millones NATIVOS, con signo (revenue
positivo, expense negativo), mismo shape que data/ar/river-ar-data.js. GBP es
moneda NUEVA para el sitio (no existe todavía en data/currency-map.js): por
pedido explícito de esta sesión NO se agregó esa entrada ni se tocó ese
archivo, así que cada año usa fxRef ('GBP@2024-05-31'/'GBP@2025-05-31') en
vez de un fx literal — ninguno de los dos documentos declara un tipo de
cambio propio (no hay nota de moneda extranjera con un TC GBP declarado, ya
que GBP es la propia moneda de reporte del club), así que no aplica la regla
#0 de club-data-mapping/referencia/fx.md (no hay TC propio del documento
para usar). El día que alguien agregue GBP a currency-map.js, estas
referencias ya están listas para resolverse solas.

ESTRUCTURA DEL P&L (distinta de los balances argentinos ya cargados, ver
nota de cada año): Turnover (Media/Commercial/Match day) menos Cost of sales
da Gross profit; menos Administrative expenses más Profit on disposal of
registrations da el resultado operativo. "Cost of sales" y "Administrative
expenses" son las DOS líneas de costo operativo que imprime el documento —
ninguna de las dos se desglosa por departamento (fútbol/comercial/estadio),
a diferencia de Boca/River/Racing. officialTotalExpenses = Cost of sales +
Administrative expenses (ANTES de profit on disposal de pases, intereses y
impuestos), verificado exacto contra el impreso los 2 años (ver
verificación con node al pie de este comentario).

DECISIÓN DE MAPEO, LA MÁS IMPORTANTE DE ESTE ARCHIVO (duda genuina, no hay
consulta a Guido posible en esta sesión porque Admin/dudas-por-club.md está
fuera de alcance de esta tarea — dejar constancia acá): la Nota 4 "Staff
numbers and costs" da UN SOLO total de sueldos+cargas sociales+pensión para
TODO el personal del Grupo (1.011 empleados en 2024, de los cuales solo 229
son "Players, managers and coaches"; el resto son 713 de
"Administration, commercial and other" y 69 de "Ground and maintenance
staff"), SIN separar por departamento. No hay ninguna nota que permita
aislar la porción de sueldo que corresponde solo al plantel/cuerpo técnico
(a diferencia de Vélez, que sí tiene esa matriz por sector en su Anexo III).
Se cargó el TOTAL completo como wages_squad, no como catch-all, porque es la
convención estándar de la prensa/análisis de finanzas del fútbol inglés
(Deloitte Annual Review of Football Finance, Swiss Ramble, etc.): el "wage
bill" / "wages to turnover" de un club de Premier League SIEMPRE se cita
como el costo de personal TOTAL del grupo, no aislado a jugadores. La
alternativa (mandarlo a admin_general_expense o partirlo a ojo) hubiera
sido menos fiel a cómo se lee este número en cualquier fuente de prensa
sobre este club. wagesToTurnover para este club, con este dato, mide
"personal total / turnover", no "plantel / turnover" en sentido estricto —
dejarlo dicho acá para que una sesión futura no lo re-derive distinto sin
saber que ya se pensó.

Cost of sales (83,483 / 88,608 miles de GBP) no tiene NINGUNA nota que lo
desglose en ninguno de los 2 documentos (se buscó con grep "cost of sales"
en los dos .md, sin resultado adicional) — se cargó a other_expenses
(catch-all), no a admin_general_expense, porque el documento NO lo etiqueta
como "administrative", es una línea separada y distinta en el propio P&L.

"Administrative expenses" SÍ tiene una nota ("Included in administrative
expenses are the following") con algunos componentes (amortización y
deterioro de pases, depreciación y deterioro de bienes tangibles, alquileres
operativos, honorarios de auditoría, resultado por venta de bienes
tangibles) — los de pases/tangibles se promovieron a su categoría propia
(player_amortisation/player_impairment/depreciation, ver club-data-mapping
sección 1), y el resto de esos componentes menores (alquileres, auditoría,
venta de bienes tangibles) se dejó como `items` de una línea
admin_general_expense junto con el remanente NO desglosado por la fuente
(la mayor parte: operaciones de fútbol, estadio, comercial, gastos
generales — sin etiqueta propia en ninguna nota). Ver club-data-mapping
sección 4 (sub-ítems anidados: el remanente sin desglose se deja como un
ítem explícito, no se pierde ni se inventa en 0).

"Other operating income" (Nota, solo 2025: 12,892 miles GBP, "insurance
settlement relating to historic loss of earnings") se cargó a other_income:
no es turnover del negocio (el documento lo separa de Turnover en el propio
P&L) ni es venta de pases, es un ingreso extraordinario/no operativo puntual.

netInterest = Interest receivable and similar income (Nota 6) menos Interest
payable and similar charges (Nota 7), NETO, con su signo (ver club-data-
mapping sección 2). tax = el "Tax on loss/profit on ordinary activities" con
el signo tal que pbt+tax=pat (2024 fue un CRÉDITO que redujo la pérdida;
2025 fue un CARGO que redujo la ganancia).

grossDebt = deuda financiera de la Nota 15 "Interest-bearing loans and
borrowings" (Secured bank loans netos de costos de emisión diferidos +
Intercompany loan con la controlante FSG Football Group, LLC), NO el Total
de "Creditors" completo (que incluye deuda comercial, impuestos, ingresos
diferidos, etc. — mismo criterio de "línea más angosta" que Boca/Vélez, ver
club-data-mapping/referencia/formato-simplificado.md). Coincide exacto con la propia "Consolidated
Analysis of Net Debt" que imprime el Estado de Flujo de Efectivo de cada año.
cash = "Cash at bank and in hand" del Balance consolidado.

VERIFICACIÓN (node, hecha antes de cargar este archivo): para los 2 años,
suma de revenueLines == officialTotalRevenue exacto; Math.abs(suma de
expenseLines cash + suma de expenseLines no-cash) == officialTotalExpenses
exacto; revenue+expenses+nonCash+netInterest+tax == officialPAT exacto
(2024: -43.478 M GBP, la "Loss for the financial year" impresa; 2025:
+8.273 M GBP, el "Profit for the financial year" impreso). Sin residuo en
ningún año.
============================================================================
```

## 2025

### Ingresos

```text
Ejercicio 2024/25 (cerrado 31/5/2025). Fuente: Consolidated P&L pág. 14 +
Nota 2 "Turnover" (pág. 26). Turnover = 702.722 M GBP exacto
(263.659+323.472+115.591). "Other operating income" es línea nueva este
año (nil en 2024): 12.9 M GBP de un seguro por lucro cesante histórico.
```

### Gastos

```text
Ejercicio 2024/25. Mismo criterio. Cost of sales (88.608) + Administrative
expenses (656.513) = 745.121 M GBP.
```

### Meta

```text
grossDebt = Secured bank loans netos (67.340) + Intercompany loan
(217.916) = 285.256, exacto contra la Nota 15 y la "Consolidated
Analysis of Net Debt".
netInterest: 2.846-11.395. tax: cargo impositivo del ejercicio, signo tal
que pbt(15.212)+tax(-6.939)=pat(8.273).
```

## 2024

### Ingresos

```text
Ejercicio 2023/24 (cerrado 31/5/2024). Fuente: Consolidated P&L pág. 12 +
Nota 2 "Turnover" (pág. 26), Estado de Resultados. Turnover = 613.764 M GBP
exacto (203.705+308.398+101.661).
```

### Gastos

```text
Ejercicio 2023/24. Fuente: Consolidated P&L pág. 12 (Cost of sales,
Administrative expenses) + Nota 3 "Administrative expenses" (pág. 26,
componentes) + Nota 4 "Staff numbers and costs" (pág. 27, sueldos+cargas
sociales+pensión, sin desglose por departamento — ver comentario de
cabecera). Cost of sales (83.483) + Administrative expenses (599.956) =
683.439 M GBP, el total de costo operativo impreso (antes de profit on
disposal de pases/intereses/impuestos).
```

### Meta

```text
grossDebt = Nota 15 "Interest-bearing loans and borrowings": Secured bank
loans netos de costos diferidos (115.595) + Intercompany loan con FSG
Football Group, LLC (198.700) = 314.295, exacto contra la "Consolidated
Analysis of Net Debt" del Estado de Flujo de Efectivo. cash = "Cash at
bank and in hand" del Balance consolidado.
netInterest: Interest receivable (Nota 6, 3.162) menos Interest payable
(Nota 7, 12.608). tax: crédito impositivo del ejercicio (Nota 8), signo
tal que pbt(-57.104)+tax(+13.626)=pat(-43.478).
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Tom Werner (2010-12-01 a hoy): Chairman del club desde el 1/12/2010 (Wikipedia y prensa: anunciado el 25/11/2010, asumió el 1/12). El dueño es Fenway Sports Group (empresa), por eso se carga el Chairman. Sin salida encontrada: hasta null.
Duda: No verifiqué si sigue de chairman en octubre 2026 (ninguna fuente indica un cambio).
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2022-23.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Liverpool/liverpool-group-accounts-2022-23.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Media | pág. 26, precedente |
| 2 | Commercial | pág. 26, precedente |
| 3 | Match day | pág. 26, precedente |
| 4 | Profit on disposal of players' registrations | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 14, precedente |
| 2 | Administrative expenses (sin el costo de personal) | pág. 14, precedente |
| 3 | Staff costs (total de la nota de personal) | pág. 14, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): cierre = 2023-05-31. Consolidated Profit and Loss Account 'for the year ended 31 May 2023' (pág. 14 del visor); el 2024-02-29 del registro es el sello de presentación
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-20): estado = b3. El estado de resultados (Consolidated Profit and Loss Account and Other Comprehensive Income, pág. 14 del visor) es el bloque b3; el lote lo dejaba 'sin estado de resultados'
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 188.636,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, liverpool-group-accounts-2022-23.md L1063) está dentro de "Administrative expenses": queda 561.517,00 - 372.881,00
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 372.881,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, liverpool-group-accounts-2022-23.md L1063) está dentro de "Administrative expenses": el costo de personal va aparte
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, liverpool-group-accounts-2022-23.md L1063) está dentro de "Administrative expenses": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-22) desde Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Inglaterra/Liverpool/liverpool-group-accounts-2021-22.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Media | pág. 26, precedente |
| 2 | Commercial | pág. 26, precedente |
| 3 | Match day | pág. 26, precedente |
| 4 | Profit on disposal of players' registrations | pág. 14, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Cost of sales | pág. 14, precedente |
| 2 | Administrative expenses (sin el costo de personal) | pág. 14, precedente |
| 3 | Staff costs (total de la nota de personal) | pág. 14, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 178.949,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, liverpool-group-accounts-2021-22.md L1158) está dentro de "Administrative expenses": queda 545.041,00 - 366.092,00
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): fila = 366.092,00. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, liverpool-group-accounts-2021-22.md L1158) está dentro de "Administrative expenses": el costo de personal va aparte
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, caja-deuda --personal 2026-10-22): categoria = wages_squad. caja-deuda.mjs --personal --partir (to-do 229): el año no tiene wages_squad y el costo de personal confirmado (staffCost, liverpool-group-accounts-2021-22.md L1158) está dentro de "Administrative expenses": costo de personal -> wages_squad
tools/cargar.mjs (2026-10-22). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
```

## Fuentes

### liverpool-gb-group-accounts-2024

_note (data/):_

```text
Transcripción completa en Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2023-24.md (38 págs. escaneadas, con capa de texto vía pdftotext/OCR previo, ver Admin/sourcing/Inglaterra/Liverpool.md). Ejercicio cerrado el 31 de mayo (confirmado en carátula y Group Strategic Report). Auditor: Ernst & Young LLP. Controlante última: Fenway Sports Group, LLC (Nota 25).
```

### liverpool-gb-group-accounts-2025

_note (data/):_

```text
Transcripción completa en Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2024-25.md. Ejercicio cerrado el 31 de mayo. Controlante última: Fenway Sports Group, LLC (Nota 25). Incluye "Other operating income" (12,9 M GBP) por un seguro de lucro cesante, cargado a other_income.
```

### liverpool-gb-group-accounts-2021-22

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

### liverpool-gb-group-accounts-2022-23

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-20) desde la transcripción Clubes/Inglaterra/Liverpool/liverpool-group-accounts-2022-23.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.
```

## Otros

### Presupuesto al lado del balance (liverpoolGbPresupuestoOverlayByYear), en general

```text
liverpoolGbPresupuestoOverlayByYear: sin presupuesto cargado (los 2
documentos son balances auditados reales, no presupuestos), mismo criterio
que riverPresupuestoOverlayByYear/racingPresupuestoOverlayByYear.
```

### liverpoolGbPasesData

```text
Mercado de pases / Resultados deportivos / Títulos: sin datos cargados en
esta sesión (fuera de alcance de la tarea: onboardear los 2 ejercicios
financieros). Arrays vacíos, mismo patrón que un club recién onboardeado sin
esta info todavía (ver instituto-ar-data.js primer registro en
CLUB_GENERIC_DATA para el precedente de arrays vacíos).
```
