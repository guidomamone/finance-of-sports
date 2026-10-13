# getafe-es — evidencia de carga

Lo que había como comentario en `data/getafe-es-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/getafe-es-data.js — Getafe Club de Fútbol, S.A.D. Ejercicios 2023/2024
(1/7/2023 a 30/6/2024) y 2024/2025 (1/7/2024 a 30/6/2025).

Fuente: "Informe Auditoría de Cuentas Anuales", Grupo Pél Auditores, S.L.P.
(`Clubes/España/Getafe CF/cuentas-anuales-informe-auditoria-2023-2024.pdf` y
`-2024-2025.pdf`, 56-57 págs. cada uno, ambos escaneos sin capa de texto —
transcriptos con pdftotext/OCR, ver los .md homónimos en la misma carpeta).
Bajados de `getafecf.com/ley-de-transparencia-sad`, ver fuentes/España/Getafe CF.md.

Cifras en EUR MILLONES nativos (documento en euros completos, dividido por
1.000.000 al cargar). Tipos de cambio: EUR/USD cierre BCE 30/6/2024 y
30/6/2025 (`EUR@2024-06-30`/`EUR@2025-06-30`, ya en data/currency-map.js,
`fxSource:'market_close'` porque el documento no declara un tipo de cambio
propio — no tiene partidas en moneda extranjera).

GOTCHA DE TRANSCRIPCIÓN: las dos cuentas de pérdidas y ganancias vienen con
las etiquetas de fila separadas de su columna de números (la tabla se leyó
en dos bloques por el OCR/extracción del escaneo), así que cada número se
re-asoció a su fila contando la posición en la lista y verificando contra
los subtotales impresos en CADA nivel (rubro -> sub-total -> A.1/A.2/A.3/
A.4/A.5) antes de cargar nada — ver club-data-mapping SKILL.md sección 6.
Los dos ejercicios reconciliaron EXACTOS en todos los niveles una vez
reordenados: Revenue, Expenses (cash+no-cash), profitOnPlayerSales,
netInterest, tax y PAT, contra el Estado de Cambios en el Patrimonio Neto
(fila "Resultado del ejercicio").

CATEGORIZACIÓN (misma estructura los 2 años, rubros idénticos):
- "Ingresos por competiciones" -> competition_bonus (Liga/Copa/UEFA/amistosos).
- "Ingresos por abonados y socios" -> season_tickets.
- "Ingresos por retransmisión" -> broadcasting.
- "Ingresos de comercialización" + "Ingresos por publicidad" -> sponsorship_commercial
  (2 líneas separadas, mismo criterio que Celta de Vigo).
- "Otros ingresos de explotación": "Cesiones" (préstamo de jugadores, ingreso
  por cesión) se promovió a línea propia `player_sales` (categoría real
  distinta del resto, ver club-data-mapping sección 1); "Ingresos LNFP" +
  "Subvenciones a la explotación" + "Otros" -> other_income.
- "Imputación de subvenciones de inmov no financiero" + "Exceso de
  provisiones" -> other_income.
- "Deterioro y result. por enajenac. del inmov." (venta de jugadores, neto
  de beneficios y pérdidas) -> fiscalYearMeta.profitOnPlayerSales, NUNCA
  revenueLine (club-data-mapping sección 2).
- "Otros Resultados" (positivo o negativo según el año) -> other_income si
  positivo, other_expenses si negativo (2024: gasto -72,5K; 2025: gasto
  -873,1K, ambos años negativos en la práctica).
- "Gastos de personal no deportivo" -> admin_general_expense. "Gastos
  plantilla deportiva" (7.1 inscribible + 7.2 no inscribible, sueldos +
  indemnizaciones + SS + primas, todo el plantel) -> wages_squad.
- "Otros gastos de explotación": sub-ítems con categoría real distinta
  promovidos a líneas de primer nivel (sección 1 del skill) — "Servicios
  exteriores"/"Tributos"/"Otros gastos de gestión corriente" ->
  admin_general_expense; "Desplazamientos" -> match_organisation_expense;
  "Gastos de adquisición y cesión de jugadores" (comisiones/intermediación,
  inscribibles + no inscribibles, adquisición + cesión, las 4 sub-líneas
  combinadas en 1) -> other_expenses (mismo criterio que Racing: Boca
  tampoco separa comisiones dentro de "Compra de jugadores").
- "Amortización del inmovilizado": el documento SÍ separa "Amortización de
  dchos adquisición de jugadores" (inscribible+no inscribible, combinadas)
  -> player_amortisation, de "Amortización otro inmov. inmaterial" ->
  other_amortisation, y "Amortización inmovilizado material" -> depreciation.

VERIFICACIÓN Ejercicio 2023/2024 (ver .md pág. 10-11 para el detalle):
Revenue 64,451092 M - Expenses cash 73,517467 M - Non-cash 14,859485 M =
-23,925860 M; + profitOnPlayerSales 16,561975 M = -7,363885 M ≈ A.1)
RESULTADOS DE EXPLOTACIÓN impreso (-7.363.884,68) EXACTO; + netInterest
-2,992409 M = -10,356294 M ≈ A.3) RESULTADO ANTES DE IMPUESTOS impreso
(-10.356.294,00) EXACTO; + tax +1,783799 M = -8,572495 M ≈ A.5) RESULTADO
DEL EJERCICIO impreso (-8.572.495,42) EXACTO, y coincide con "VII.
Resultado del ejercicio" del balance.

VERIFICACIÓN Ejercicio 2024/2025: Revenue 60,709312 M - Expenses cash
64,033517 M - Non-cash 11,590234 M = -14,914439 M; + profitOnPlayerSales
19,132289 M = 4,217850 M ≈ A.1 impreso (4.217.850,90) EXACTO; + netInterest
-5,100524 M = -0,882673 M ≈ A.3 impreso (-882.672,64) EXACTO; + tax
-0,808042 M = -1,690715 M ≈ A.5 impreso (-1.690.714,78) EXACTO, coincide con
"VII. Resultado del ejercicio" del balance 24/25.
============================================================================
```

## 2024

### Meta

```text
grossDebt = "Deudas a largo plazo" (56,125741 M) + "Deudas a corto plazo" (21,808984 M) del
balance, sumando las columnas con etiqueta clara (crédito+préstamos participativos+entidades
deportivas para LP; crédito+préstamos participativos+entidades deportivas+otros pasivos
financieros para CP) — mismo criterio que Boca/Vélez (solo "Deudas", sin Provisiones ni
Periodificaciones). cash = "VII. Efect. y otros act. líquidos equivalentes" del balance,
coincide exacto con el cierre del Estado de Flujos de Efectivo.
```

## Otros

### memberCountByClub['getafe-es']

```text
no investigado en esta sesión (alcance: solo Finanzas)
```
