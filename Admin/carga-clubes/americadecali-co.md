# americadecali-co — evidencia de carga

Lo que había como comentario en `data/co/americadecali-co-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/co/americadecali-co-data.js — América de Cali S.A. En Reorganización
(Cali, Colombia). clubId lleva el país al final (`americadecali-co`, ver
Admin/CONVENCIONES.md) porque "América" es un nombre que se repite entre
países. Ejercicio 2025 = REAL, único ejercicio cargado a propósito (mismo
criterio que Envigado/Once Caldas: ampliar clubes, no profundizar uno
todavía).

FUENTE: `Clubes/Colombia/America de Cali/estados-financieros-2025.pdf` (40
páginas, "Asamblea Ordinaria de Accionistas 2025-2024", Estado Individual de
Situación Financiera + Estado Individual de Resultados y Otros Resultados
Integrales + notas), texto nativo vía pdftotext -layout, transcripción
completa en `estados-financieros-2025.md` en la misma carpeta. Bajado vía
SIIS (siis.ia.supersociedades.gov.co, NIT 890305773), ver
`Admin/sourcing/Colombia/America de Cali.md`.

OJO — el club está formalmente "en reorganización" (Ley 1116) desde
2014-2015. Esto no cambió la estructura del Estado de Resultados (sigue
siendo un P&L ordinario, sin secciones de "Ordinario"/"Extraordinario" como
el presupuesto de caja de San Lorenzo, ver club-data-mapping/referencia/casos-por-pais-y-formato.md) — el único efecto visible es un pasivo "Pasivos acuerdo de
Reorganizacion" en el Estado de Situación Financiera (no cargado, no es
parte del P&L) y un patrimonio con "Adopción Por Primera Vez" negativo.

Cifras del documento "Expresado en miles de pesos colombianos" (confirmado
en el encabezado de las 3 tablas primarias). Acá se guardan divididas por
1.000, en MILLONES de pesos colombianos (COP), mismo criterio que el resto
del sitio.

TRANSCRIPCIÓN GARBLED: el PDF tiene un problema real de renderizado (texto
duplicado y notas superpuestas visualmente, pdftotext -layout mezcla
columnas de notas distintas en la misma zona de la página) — no es un
escaneo, es texto nativo, pero con las tablas de Notas 19-25 renderizadas
unas sobre otras. Se reconstruyó cada nota SUMANDO sus líneas y
verificando contra el subtotal impreso en el Estado de Resultados (ver
cifras exactas abajo), no leyendo la tabla de una sola pasada.

ESTADO DE RESULTADOS (pág. 4 del PDF, miles de COP, cifras 2025):
  Ingresos por Actividades Ordinarias ......... 96.390.192
  Costos Deportivos ............................ (89.531.930)
  Costo de Ventas .............................. (6.678.102)
  Utilidad Bruta ................................ 180.160
  Otros ingresos operacionales .................. 841.136
  Gasto de administración ...................... (3.838.594)
  Gasto de ventas .............................. (1.593.440)
  Otros Gastos .................................. (2.679.146)
  Utilidad Operacional .......................... (7.089.884)
  Ingresos Financieros ........................... 212.166
  Gastos Financieros ........................... (4.451.612)
  Utilidad antes de impuestos .................. (11.329.330)
  Impuesto de Renta Diferido ..................... 297.250 (gasto)
  Impuesto de Renta .............................. 271.895 (gasto)
  Beneficio después de impuestos / Resultado Neto (11.898.474)
Reconciliado línea por línea con node antes de cargar: Revenue
(Ingresos actividades ordinarias + Otros ingresos operacionales =
97.231.328) - Expenses (Costo Ventas + Costos Deportivos + Gasto admin +
Gasto ventas + Otros Gastos = 104.321.212) = -7.089.884, EXACTO igual a
Utilidad Operacional impresa. + netInterest (-4.239.446) = -11.329.330,
EXACTO igual a Utilidad antes de impuestos impresa. - tax (569.145) =
-11.898.475 ≈ -11.898.474 impreso (diferencia de $1 mil, redondeo del
propio documento).

REVENUE: Nota 19 "Ingresos de Actividades Ordinarias" (14 líneas incl.
devoluciones, suma exacta salvo $1 mil de redondeo) + Nota 20 "Otros
ingresos operacionales" (5 líneas, suma EXACTA a $841.136 M, verificado).

EXPENSES: Nota 23 "Costos deportivos" (15 líneas, suma EXACTA a $89.531.930
M impreso — promovida por sub-categoría real: Gastos de personal
(wages_squad), Administración del plantel (admin_general_expense),
Organización y logística (match_organisation_expense), Depreciaciones,
Amortizaciones y Derechos deportivos (estos 2 últimos a player_amortisation:
el documento explica que la amortización de derechos deportivos —pases— es
lineal por la duración del convenio, y "Derechos deportivos" es el costo de
adquisición/participación de terceros en transferencias — ver duda en el
reporte de esta sesión), Diversos), Nota 21 "Gasto de administración"
(agrupada, con Depreciaciones y Amortizaciones separadas, suma EXACTA a
$3.838.594 M), Nota 22 "Gasto de ventas" (5 líneas confirmadas + 1 residuo
de $346.071 M para 2025 que la transcripción garbled no permitió desglosar
línea por línea — el TOTAL de la nota SÍ está confirmado exacto contra el
Estado de Resultados, $1.593.440 M, ver duda en el reporte), Nota 24 "Otros
Gastos" (5 líneas, suma EXACTA a $2.679.146 M), Costo de Ventas (línea
única, $6.678.102 M, sin nota de desglose en el documento).

netInterest = Nota 25 "Ingresos y costos financieros": Ingresos Financieros
(Intereses+Rendimientos Financieros+Diferencia en Cambio+Otros = $212.166 M,
EXACTO) - Gastos Financieros (Gastos bancarios+Comisiones+Comisiones
Factoring+Intereses+Diferencia en cambio = $4.451.612 M, EXACTO) =
-4.239.446 M, EXACTO igual al "Total Costos Financieros" impreso.

tax = Impuesto de Renta Diferido (297.250) + Impuesto de Renta (271.895) =
569.145 (gasto), EXACTO igual a los 2 renglones impresos por separado.
============================================================================
```

_de data/clubs.js:_

```text
5 clubes colombianos nuevos (sesión 2026-09-22, Ejercicio 2025 cada uno), mismo criterio de
ejercicio/moneda que Envigado/Once Caldas de arriba.
```

_de data/club-leagues/co.js:_

```text
Verificado el 22/9/2026 contra "2025 Categoría Primera A season" (Wikipedia): los 5 jugaron
la temporada 2025 completa en Primera A (20 equipos participantes ese año).
```

## 2025

### Gastos

_antes de la fila 2 (`Costos deportivos: Gastos de personal (plantel)`):_

```text
Nota 23 "Costos deportivos" ($89.531.930 M impreso), promovida por sub-categoría real:
```

_antes de la fila 9 (`Gasto de administración (personal, honorarios, impuestos, arrendamientos, contribuciones, seguros, legales, servicios, mantenimiento, adecuación, viajes, diversos)`):_

```text
Nota 21 "Gasto de administración" ($3.838.594 M impreso):
```

_antes de la fila 12 (`Gasto de ventas (personal, honorarios, impuestos, arrendamientos, contribuciones, y otros no desglosados individualmente en la transcripción)`):_

```text
Nota 22 "Gasto de ventas" ($1.593.440 M impreso, total confirmado exacto; 5 de sus líneas
se pudieron confirmar individualmente en la transcripción garbled, el resto queda como
residuo — ver el reporte de esta sesión de onboarding):
```

_antes de la fila 13 (`Otros Gastos (pérdida en venta y retiro de bienes, gastos extraordinarios, gravamen movimiento financiero, gastos diversos, deterioro)`):_

```text
Nota 24 "Otros Gastos" ($2.679.146 M impreso):
```

### Meta

```text
TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio
(sin Anexo de "activos y pasivos en moneda extranjera"), mismo caso que Envigado/Once Caldas.
Nota 25: Ingresos Financieros (212.166) - Gastos Financieros (4.451.612), EXACTO igual al
"Total Costos Financieros" impreso en el Estado de Resultados.
Impuesto de Renta Diferido (297.250) + Impuesto de Renta (271.895), EXACTO igual a los 2
renglones impresos por separado en el Estado de Resultados.
grossDebt = Obligaciones Financieras corriente (4.755,842) + no corriente (7.080,129), del
Estado Individual de Situación Financiera. cash = Efectivo y equivalentes del efectivo.
```

## Gestiones

_antes de Marcela Gómez Giraldo (data/gestiones/co.js):_

```text
Marcela Gómez Giraldo (hija del accionista mayoritario Tulio Gómez) es la presidente y firma como representante legal; Tulio Gómez no ejerce el cargo.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-27) desde Clubes/Colombia/America de Cali/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/America de Cali/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-27): filas-a-mano. Claude 2026-10-27 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-27). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## Fuentes

### americadecali-co-estados-financieros-2025

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890305773). Texto nativo (pdftotext -layout), pero las tablas de Notas 19-25 se renderizan superpuestas/duplicadas en el PDF (no es un escaneo, es un artefacto de layout) — se reconstruyó cada nota sumando sus líneas y verificando contra el subtotal impreso en el Estado de Resultados antes de cargar, ver comentario de cabecera de data/co/americadecali-co-data.js. El club está formalmente "en reorganización" (Ley 1116) desde 2014-2015, pero esto no altera la estructura del Estado de Resultados. Transcripción completa en Clubes/Colombia/America de Cali/estados-financieros-2025.md.
```

### americadecali-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### americadecali-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### americadecali-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### americadecali-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### americadecali-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### americadecali-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### americadecali-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### americadecali-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### americadecali-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-27) desde la transcripción Clubes/Colombia/America de Cali/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
