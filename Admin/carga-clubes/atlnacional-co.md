# atlnacional-co — evidencia de carga

Lo que había como comentario en `data/co/atlnacional-co-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/co/atlnacional-co-data.js — Atlético Nacional S.A. (Medellín, Colombia).
clubId lleva el país al final (`atlnacional-co`) por la convención de
Admin/CONVENCIONES.md. Ejercicio 2025 = REAL, único ejercicio cargado a
propósito (mismo criterio que Envigado/Once Caldas).

FUENTE: `Clubes/Colombia/Atletico Nacional/estados-financieros-2025.pdf`
(57 páginas, "Notas a los estados financieros, 31 de diciembre de 2025 y
2024", auditado por Baker Tilly Colombia), texto nativo vía pdftotext
-layout, transcripción completa en `estados-financieros-2025.md` en la
misma carpeta. Bajado vía SIIS (siis.ia.supersociedades.gov.co, NIT
900464187), ver `Admin/sourcing/Colombia/Atletico Nacional.md`.

OJO — este PDF (a diferencia de América de Cali) son solo las NOTAS a los
estados financieros, no incluye el Estado de Resultado Integral primario
como tabla aparte. Se reconstruyó igual con altísima confianza: la Nota 14
(Impuestos a las ganancias, "Conciliación de la tasa efectiva") imprime
LITERALMENTE "Utilidad (Pérdida) contable Antes de Impuestos: 7.162.607"
para 2025 — EXACTO igual a la suma independiente Revenue-Expenses+
netInterest calculada desde las notas de ingresos/gastos (ver abajo), lo
que confirma la reconstrucción completa sin ningún residuo/plug.

Cifras del documento "Expresado en miles de pesos colombianos" (confirmado
en el encabezado). Acá se guardan divididas por 1.000, en MILLONES de
pesos colombianos (COP).

REVENUE = Nota 22 "Ingresos de actividades ordinarias" (9 líneas, suma
EXACTA a $191.200.128 M, coincide con la vista SIIS) + el bloque "Otros
ingresos" de la Nota "Costo financiero, neto" (7 líneas: Otros,
Recuperación provisiones, Ingreso por aprovechamientos, Recuperación
deterioro cartera, Recuperación deterioro inventario, Subvenciones,
Recuperación provisión contingencia — suma EXACTA a $5.683.902 M). Estas 2
notas de "resultado financiero/otros" (una con recuperaciones/multas no
financieras, otra con Ingresos financieros/Gastos financieros propiamente
dichos) aparecen en el documento bajo títulos de nota que no calzan 1:1 con
su contenido (posible desplazamiento de encabezado entre páginas) — se
identificaron por el CONTENIDO de cada tabla, no por el número de nota
impreso. officialTotalRevenue = 191.200.128 + 5.683.902 = 196.884.030.

EXPENSES: Nota 23 "Costo de ventas" ($16.759.263 M, costo de mercancía
deportiva no producida por la Sociedad), Nota 24 "Costo de servicios"
($111.194.398 M, el bolsón más grande — costos del plantel/fútbol
profesional, 17 líneas, promovida por sub-categoría real: Gastos por
beneficios a empleados → wages_squad; Participación venta derechos
deportivos + Intermediación transferencia jugadores + Prestamos jugadores +
Mecanismo de solidaridad + Derechos deportivos de formación →
player_amortisation; Gastos de viaje + Gastos para concentración + Gastos
boletería y control estadio + Obligaciones disciplinarias + Participación
en torneos + Árbitros y jueces + Implementos entreno y fisioterapia +
Inscripciones y torneos + Ingreso y recarga de abonos →
match_organisation_expense; Convenios deportivos → youth_other_sports_expense
— suma EXACTA), Nota 25 "Gastos de ventas" ($43.507.060 M, con Depreciación
Derechos de Uso + Depreciaciones separadas a depreciation, el resto
admin_general_expense), Nota 26 "Gastos de administración" ($13.219.310 M,
con Depreciaciones de equipo → depreciation y Amortización de intangibles →
other_amortisation separadas, el resto admin_general_expense), y el bloque
"Otros egresos" (Multas y sanciones, Donaciones, Retenciones asumidas,
Pérdida en venta de equipo, Otros, Impuestos asumidos → other_expenses,
suma EXACTA a $2.735.263 M). officialTotalExpenses = 16.759.263+111.194.398+
43.507.060+13.219.310+2.735.263 = 187.415.294.

netInterest = "Ingresos financieros" (Diferencia en cambio+Otros+Intereses
recibidos = $3.683.829 M) - "Gastos financieros" (Diferencia en cambio+
Intereses+Gravamen+Comisiones+Gastos bancarios+Otros-Intereses Derechos de
uso = $5.989.958 M) = -2.306.129 M, EXACTO igual al total impreso al final
de esa tabla.

tax: la Nota 14 confirma "Total gasto por impuesto a las ganancias:
186.910" (2025) = Gasto impuesto de renta corriente (182.452) + Gasto por
impuesto diferido (4.458). PAT check: pretax (7.162.607) - tax (186.910) =
6.975.697, ≈ vista SIIS ($6.975.695 M, diferencia de $2 mil por redondeo
del propio documento en distintas tablas) — se usa el valor de la vista
SIIS como officialPAT por ser la referencia cruzada independiente.
============================================================================
```

## 2025

### Gastos

_antes de la fila 2 (`Costo de servicios: Gastos por beneficios a empleados`):_

```text
Nota 24 "Costo de servicios" ($111.194.398 M impreso), promovida por sub-categoría real:
```

_antes de la fila 6 (`Gastos de ventas (servicios, impuestos asumidos, arrendamientos, honorarios, seguros, taxis y buses, combustibles, fotografía, legales, contribuciones, adecuación, deterioro cartera, provisión inventarios, otros)`):_

```text
Nota 25 "Gastos de ventas" ($43.507.060 M impreso):
```

_antes de la fila 8 (`Gastos de administración (personal, honorarios, servicios, otros, impuestos, arrendamientos, mantenimiento, viajes, seguros, contribuciones, legales, adecuación, contingencias)`):_

```text
Nota 26 "Gastos de administración" ($13.219.310 M impreso):
```

### Meta

```text
TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio de
cierre para todo el balance (solo montos puntuales en USD dentro de notas narrativas, ej.
ingresos de Copa Libertadores), mismo caso que Envigado/Once Caldas.
Ingresos financieros (3.683.829) - Gastos financieros (5.989.958), EXACTO igual al total
impreso al final de esa tabla (Diferencia en cambio+Intereses+Gravamen+Comisiones+Gastos
bancarios+Otros-Intereses Derechos de uso).
Gasto impuesto de renta corriente (182.452) + Gasto por impuesto diferido (4.458), EXACTO
igual al "Total gasto por impuesto a las ganancias" impreso en la Nota 14.
grossDebt = "Obligaciones financieras" (Nota 15, corriente 13.869,434 + no corriente
2.078,851). cash = "La Sociedad mantenía efectivo y equivalentes al efectivo por
$17.130.558" (Nota, texto narrativo, no tabla).
```

## Gestiones

_antes de Sebastián Arango Botero (data/gestiones/co.js):_

```text
Cargo: Presidente (representante legal). El dueño es la Organización Ardila Lulle, una sociedad sin dueño persona: no se carga como gestión.
```

## 2024

### Ingresos

```text
2024: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2024.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2024.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2024: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2024.json, miles de COP): otros pasivos financieros corrientes 11497684 + no corrientes 5351982; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2024.json, miles de COP): efectivo y equivalentes = 5244897
```

## 2023

### Ingresos

```text
2023: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2023.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2023.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |
| 3 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.99 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.75 |

### Meta

```text
2023: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): otros pasivos financieros corrientes 14128673 + no corrientes 5369768; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2023.json, miles de COP): efectivo y equivalentes = 23900646
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.99 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.75 |
| 6 | Otras ganancias (pérdidas) | pág. 1, Jev 0.99 |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2022.json, miles de COP): otros pasivos financieros corrientes 22082329 + no corrientes 10171543; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2022.json, miles de COP): efectivo y equivalentes = 781278
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |
| 3 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.75 |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2021.json, miles de COP): otros pasivos financieros corrientes 10625308 + no corrientes 19570824; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2021.json, miles de COP): efectivo y equivalentes = 3243610
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otras ganancias (pérdidas) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): otros pasivos financieros corrientes 10481623 + no corrientes 22218410; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2019.json, miles de COP): efectivo y equivalentes = 4526055
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): otros pasivos financieros corrientes 10622772 + no corrientes 13714672; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2018.json, miles de COP): efectivo y equivalentes = 3428154
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): otros pasivos financieros corrientes 235788 + no corrientes 367374; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2017.json, miles de COP): efectivo y equivalentes = 3421441
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.99 |
| 5 | Deterioro de valor de ganancias y reversión de pérdidas por deterioro de valor (pérdidas por deterioro de valor) determinado de acuerdo con la NIIF 9 | pág. 1, ? 0.75 |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): otros pasivos financieros corrientes 84468 + no corrientes 48802; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2016.json, miles de COP): efectivo y equivalentes = 6537048
```

## 2015

### Ingresos

```text
2015: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Atletico Nacional/siis-estado-2015.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Atletico Nacional/siis-estado-2015.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.97 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, Jev 0.99 |

### Meta

```text
2015: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/caja-deuda.mjs (2026-10-28): grossDebt escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2015.json, miles de COP): otros pasivos financieros corrientes 1771893 + no corrientes 5028743; cash escalón S (compuerta: balance de SIIS cuadra y la comparativa del año siguiente de SIIS coincide): balance de SIIS (siis-estado-2015.json, miles de COP): efectivo y equivalentes = 6288981
```

## Fuentes

### atlnacional-co-estados-financieros-2025

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900464187). El PDF trae solo las notas (texto nativo, sin tabla de Estado de Resultado Integral primaria aparte), pero la Nota 14 (Impuestos a las ganancias) imprime literalmente "Utilidad contable Antes de Impuestos: 7.162.607" para 2025, que reconcilia exacto contra la suma independiente Revenue-Expenses+netInterest calculada desde las notas de ingresos/gastos — sin ningún residuo. 11 registros distintos existen en SIIS bajo este NIT (probablemente un registro por ejercicio); solo se cargó el más reciente (2025) esta sesión. Transcripción completa en Clubes/Colombia/Atletico Nacional/estados-financieros-2025.md.
```

### atlnacional-co-siis-estado-2015

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2015.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2023

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2023.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### atlnacional-co-siis-estado-2024

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Atletico Nacional/siis-estado-2024.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```
