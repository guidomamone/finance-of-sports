# espanyol-es — evidencia de carga

Lo que había como comentario en `data/espanyol-es-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/espanyol-es-data.js — R.C.D. Espanyol de Barcelona, S.A.D. Ejercicios
2023/2024 (1/7/2023 a 30/6/2024, jugado en Segunda División) y 2024/2025
(1/7/2024 a 30/6/2025, jugado en LaLiga).

Fuente: `Clubes/España/RCD Espanyol/cuentas-anuales-gestion-auditoria-2023-2024.pdf`
(192 págs., texto nativo, sin OCR) y `cuentas-anuales-2024-2025.pdf` (199
págs., escaneo con bastante ruido de OCR en la cuenta de pérdidas y
ganancias transcripta a .md). Bajados de
rcdespanyol.com/es/transparencia-compliance-canaleticoycomunicaciones, ver
fuentes/España/RCD Espanyol.md.

GOTCHA DE VERIFICACIÓN (2024/2025): la transcripción .md de este ejercicio
tenía errores de OCR reales en varias cifras (algunos dígitos sueltos mal
leídos, ej. "65.908.539,94" en vez de "66.968.539,94" en Prestaciones de
servicios, o "8.722.640,49" en vez de "3.722.640,49" en Cargas sociales), y
la parte final de la cuenta (Impuestos/Resultado del ejercicio) salió
directamente ilegible en el .md ("ZBOIZASO", "22OBOUOTS"). Se re-renderizó
la página 12 del PDF a imagen (pdftoppm -r 300) y se leyó directo con el
Read tool para confirmar cada cifra — ver club-data-mapping/referencia/leer-pdf.md. Todos los números de abajo para el ejercicio 2025 salen de esa
lectura directa de imagen, no de la transcripción .md original (que sigue
teniendo las cifras viejas sin corregir, uso interno solamente).

Cifras en EUR MILLONES nativos. Tipo de cambio: `fxRef:'EUR@2024-06-30'` y
`fxRef:'EUR@2025-06-30'` (ambas ya en data/currency-map.js), el documento no
declara un tipo de cambio propio.

CATEGORIZACIÓN (misma estructura los 2 años):
- "Importe neto de la cifra de negocios" (Ventas + Prestaciones de
  servicios, sin desglosar por concepto) -> lump_football_operations, mismo
  criterio que Villarreal/Girona (documento de bajo desglose en este rubro).
- "Otros ingresos de explotación" ("Ingresos accesorios y otros de gestión
  corriente" + "Subvenciones de explotación") -> other_income.
- "Excesos de provisiones" -> other_income.
- "Deterioro y resultado por enajenaciones de inmovilizado" ("Resultados
  por enajenaciones y otras", ganancia neta por venta de jugadores) ->
  fiscalYearMeta.profitOnPlayerSales, NUNCA revenueLine.
- "Otros resultados" (negativo los 2 años) -> other_expenses.
- "Aprovisionamientos" (consumo de mercaderías/materias primas +/- deterioro)
  -> other_expenses.
- "Gastos de personal" (sin separar plantel deportivo/no deportivo, sueldos
  + cargas sociales) -> wages_squad entero.
- "Otros gastos de explotación": "Servicios exteriores"/"Tributos"/"Otros
  gastos de gestión corriente" -> admin_general_expense; "Pérdidas,
  deterioro y variación de provisiones por operaciones comerciales" ->
  other_expenses (categoría real distinta, promovida a línea propia).
- "Amortización del inmovilizado" (una sola cifra, sin separar jugadores del
  resto) -> player_amortisation, aproximación documentada (mismo criterio
  que Villarreal/Girona).

VERIFICACIÓN Ejercicio 2023/2024 (documento de texto nativo, sin ambigüedad):
Revenue 43,063621 M - Expenses cash 63,729789 M - Non-cash 13,940683 M =
-34,606851 M; + profitOnPlayerSales 17,856025 M = -16,750826 M ≈ RESULTADO
DE EXPLOTACIÓN impreso (-16.750.825,96) EXACTO; + netInterest -1,679707 M =
-18,430533 M ≈ RESULTADO ANTES DE IMPUESTOS impreso (-18.430.532,82)
EXACTO; + tax +4,669345 M = -13,761188 M ≈ RESULTADO DEL EJERCICIO impreso
(-13.761.188,15) EXACTO.

VERIFICACIÓN Ejercicio 2024/2025 (re-leído de imagen, ver gotcha arriba):
Revenue 71,996866 M - Expenses cash 78,027435 M - Non-cash 11,130548 M =
-17,161117 M; + profitOnPlayerSales 22,620529 M = 5,459412 M ≈ RESULTADO DE
EXPLOTACIÓN impreso (5.459.412,27) EXACTO; + netInterest -2,909888 M =
2,549524 M ≈ RESULTADO ANTES DE IMPUESTOS impreso (2.549.524,59) EXACTO;
+ tax -0,252534 M = 2,296990 M ≈ RESULTADO DEL EJERCICIO impreso
(2.296.990,73) EXACTO. Espanyol volvió a superávit en su primer ejercicio
de vuelta en LaLiga.
============================================================================
```

## 2024

### Meta

```text
grossDebt = "Deudas a largo plazo" (0,061700 M) + "Deudas a corto plazo" (0,364016 M) del
balance — muy baja porque Espanyol financia gran parte de su operación vía "deudas con
empresas del grupo y asociadas" (Rastar Group), una línea de pasivo distinta de "Deudas" que
no se incluye acá, mismo criterio que Boca/Vélez (solo "Deudas" financieras). cash = "Efectivo
y otros activos líquidos equivalentes / Tesorería" del balance.
```

## Gestiones

_antes de Chen Yansheng (data/gestiones/es.js):_

```text
Chen Yansheng (Rastar) tomó el control en enero de 2016 (nota del 19/1/2016) y relevó a Joan Collet.
```

## Otros

### memberCountByClub['espanyol-es']

```text
no investigado en esta sesión (alcance: solo Finanzas)
```
