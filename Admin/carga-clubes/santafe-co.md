# santafe-co — evidencia de carga

Lo que había como comentario en `data/santafe-co-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/santafe-co-data.js — Independiente Santa Fe S.A. En Reorganización
(Bogotá, Colombia). clubId lleva el país al final (`santafe-co`) por la
convención de Admin/CONVENCIONES.md. Ejercicio 2025 = REAL, único
ejercicio cargado a propósito (mismo criterio que Envigado/Once Caldas).

FUENTE: `Clubes/Colombia/Independiente Santa Fe/estados-financieros-2025.pdf`
(42 páginas, "Estado de Resultados Integral Separado" + notas), texto
nativo vía pdftotext -layout, transcripción completa en
`estados-financieros-2025.md` en la misma carpeta. Bajado vía SIIS
(siis.ia.supersociedades.gov.co, NIT 860009807), ver
`Admin/sourcing/Colombia/Independiente Santa Fe.md`.

OJO — el club está "en reorganización" ante Supersociedades (Ley 1116).

Cifras del documento "Expresado en pesos colombianos" (PESOS COMPLETOS, no
miles — confirmado en el encabezado de la tabla primaria). Acá se guardan
divididas por 1.000.000, en MILLONES de pesos colombianos (COP).

ESTADO DE RESULTADOS INTEGRAL SEPARADO (pág. 3 del PDF, pesos completos,
cifras 2025):
  Ingresos de Actividades Ordinarias ........... 61.020.279.389
  Costo de ventas ................................ (448.505.443)
  UTILIDAD BRUTA ................................ 60.571.773.946
  Ingresos Financieros ............................ 446.464.327
  Gastos de Administración ..................... (4.709.542.551)
  Gastos de venta ............................. (59.524.159.842)
  Gastos Financieros ........................... (1.498.757.376)
  Otros Ingresos ................................ 6.635.226.012
  Otros Gastos .................................... (922.400.138)
  UTILIDAD OPERACIONAL ............................ 998.604.379
  Impuesto de Renta Corriente ..................... (144.061.286)
  Impuesto de Renta Diferido ..................... 1.116.790.273 (BENEFICIO,
    no gasto: la utilidad neta SUBE respecto a la operacional)
  UTILIDAD NETA DEL EJERCICIO .................... 1.971.333.366
Reconciliado con node antes de cargar: 998.604.379 - 144.061.286 +
1.116.790.273 = 1.971.333.366, EXACTO. El documento agrupa Ingresos/Gastos
Financieros junto con Administración/Venta/Otros en la misma cascada hacia
"Utilidad Operacional" — se separó el resultado financiero a netInterest,
como corresponde (ver club-data-mapping SKILL.md sección 2), y
officialTotalRevenue/officialTotalExpenses solo suman los rubros no
financieros: Revenue = Ingresos Actividades Ordinarias + Otros Ingresos =
67.655.505.401. Expenses = Costo de ventas + Gastos de Administración +
Gastos de venta + Otros Gastos = 65.604.607.974. netInterest = Ingresos
Financieros - Gastos Financieros = -1.052.293.049. Revenue-Expenses+
netInterest = 998.604.378 ≈ 998.604.379 impreso (redondeo de $1).
tax = -Impuesto Corriente + Impuesto Diferido = -144.061.286+1.116.790.273
= +972.728.987 (BENEFICIO neto, ver abajo). PAT = 998.604.379+972.728.987 =
1.971.333.366, EXACTO.
Todas las cifras de arriba están en PESOS COMPLETOS; en el archivo se
guardan ya divididas por 1.000.000 (ver valores abajo en millones).

REVENUE: Nota 21 "Ingresos de Actividades Ordinarias" (16 líneas incl.
devoluciones, suma EXACTA) + Nota 22 "Otros Ingresos" (9 líneas, suma
EXACTA a $6.635.226.012).

EXPENSES: Nota 24 "Gastos de Administración" (14 sub-notas — Personal,
Honorarios, Impuestos, Arrendamientos, Contribuciones, Seguros, Servicios,
Legales, Mantenimiento, Reparaciones Locativas, Viajes, Depreciación y
Amortización, Diversos, Provisiones y Litigios — suma EXACTA a
$4.709.542.551, confirmado con el "Total Gastos de Administración" impreso
al final de la nota), Nota 25 "Gastos de Venta" (14 sub-notas del plantel
profesional — Personal, Honorarios, Impuestos, Arrendamientos,
Contribuciones, Seguros, Servicios, Legales, Mantenimiento, Adecuación,
Viajes, Depreciaciones y Amortizaciones, Diversos — suma EXACTA a
$59.524.159.842), Nota 27 "Otros Gastos" (3 líneas, suma EXACTA a
$922.400.138), Nota 28 "Costo de venta" (mercancía + boletería, suma
EXACTA a $448.505.443). Ver el desglose por sub-nota en los `items` de cada
línea de abajo.

tax: Nota 29 (Impuesto de Renta) confirma la tarifa del 35% y el efecto de
"impuesto de renta diferido (Ingreso)" para 2025 — el beneficio neto de
impuesto diferido (mayor al gasto corriente) es consistente con el
reconocimiento de pérdidas fiscales/diferencias temporarias, mismo patrón
que Deportivo Cali (otra sociedad deportiva colombiana en reorganización).
============================================================================
```

## 2025

### Ingresos

_antes de la fila 17 (`Ajuste de reconciliación contra el total impreso de la Nota 21 (diferencia no explicada por ninguna línea visible en el documento)`):_

```text
AJUSTE DE RECONCILIACIÓN: la suma de las 16 líneas de arriba (Nota 21) da $63.314.830.050,
pero el propio documento imprime "Total Ingresos de Actividades Deportivas: 61.020.279.389"
— una diferencia de $2.294.550.661 que NO se explica por ninguna fila adicional visible en la
transcripción (verificado: cada línea reconcilia exacta contra su propia "Variación Absoluta"
2025-2024, y el % "Análisis Vertical" de cada línea es consistente con el TOTAL IMPRESO, no
con mi suma). Es un error de cuadre del propio documento (o de una reclasificación que no se
refleja en esta nota), no una omisión de esta transcripción. Se usa el TOTAL IMPRESO (más
fiel a lo que el club declaró) y se declara el ajuste como línea propia, en vez de esconderlo
prorrateado entre las demás líneas. Pregunta anotada para Admin/dudas-por-club.md.
```

### Gastos

_antes de la fila 1 (`Gastos de Administración (personal, honorarios, impuestos, arrendamientos, contribuciones, seguros, servicios, legales, mantenimiento, reparaciones locativas, viajes)`):_

```text
Nota 24 "Gastos de Administración" ($4.709.542.551 impreso), agrupada por sub-categoría:
```

_antes de la fila 4 (`Gastos de Venta: Gastos de Personal`):_

```text
Nota 25 "Gastos de Venta" ($59.524.159.842 impreso, el plantel profesional):
```

_antes de la fila 12 (`Otros Gastos (pérdidas método de participación, gastos extraordinarios, gastos diversos)`):_

```text
Nota 27 "Otros Gastos" ($922.400.138 impreso):
```

_antes de la fila 13 (`Costo de venta de mercancía para la venta`):_

```text
Nota 28 "Costo de venta" (mercancía + boletería, $448.505.443 impreso):
```

### Meta

```text
TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio de
cierre (los movimientos "Diferencia en cambio" de las notas financieras son de operaciones
puntuales en USD, no una cotización de cierre para todo el balance), mismo caso que
Envigado/Once Caldas.
Ingresos Financieros (446.464327) - Gastos Financieros (1.498757376), EXACTO igual a los 2
totales impresos en el Estado de Resultados.
-Impuesto de Renta Corriente (144.061286) + Impuesto de Renta Diferido (1.116790273, un
BENEFICIO neto de impuesto diferido, no un gasto — el documento lo suma directo en la
cascada hacia Utilidad Neta, ver comentario de cabecera). tax = +972.728987 (beneficio neto).
grossDebt = Obligaciones financieras a corto plazo (Nota 16, particulares+entidades+otras =
3.402593239) + la porción "Obligaciones Financieras" de los Pasivos Ley 1116 a largo plazo
(Nota 20, 1.242561656) — se excluye el resto de esa nota (Costos y Gastos Por Pagar,
Impuestos, Obligaciones Laborales, Fideicomiso, Litigios), que es pasivo de reorganización
no financiero, mismo criterio de "usar la línea de deuda financiera real" que ya aplica el
sitio (ver club-data-mapping/referencia/formato-simplificado.md). cash = Nota 5, Total efectivo y
equivalentes al efectivo.
```

## Gestiones

_antes de Luis Eduardo Méndez Bustos (data/gestiones/co.js):_

```text
Méndez: asumió en la asamblea extraordinaria del 1/8/2019 (reemplazó a Juan Andrés Carreño). Wikipedia lista a Diego Perdomo con el 85% de las acciones; se carga al presidente que conduce el club (criterio a confirmar por Guido).
```

## Fuentes

### santafe-co-estados-financieros-2025

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 860009807). Texto nativo, incluye el Estado de Resultados Integral primario completo. El club está en proceso de reorganización (Ley 1116) ante Supersociedades; 11 registros distintos existen en SIIS bajo este NIT, solo se cargó el ejercicio más reciente (2025) esta sesión. El impuesto de renta diferido de 2025 fue un BENEFICIO neto (mayor al gasto corriente), lo que hizo que la Utilidad Neta terminara por encima de la Utilidad Operacional — ver comentario de cabecera de data/santafe-co-data.js. Transcripción completa en Clubes/Colombia/Independiente Santa Fe/estados-financieros-2025.md.
```

## Otros

### gestionesByClub['santafe-co']

```text
gestionesByClub: el Representante Legal aparece en certificacion-ef-2025.md pero con una
transcripción OCR parcialmente ilegible ("LUIS ?DUARDO MENDEZ B.", sin poder confirmar con
confianza el nombre completo) — se usa una entrada genérica en vez de un nombre a medio
confirmar, mismo criterio que Once Caldas/Envigado cuando no hay firma legible.
```
