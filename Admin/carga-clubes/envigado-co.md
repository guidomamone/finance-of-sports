# envigado — evidencia de carga

Lo que había como comentario en `data/co/envigado-co-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/co/envigado-co-data.js — Envigado Fútbol Club S.A. (Envigado, Colombia).
Segundo club colombiano cargado en finance-of-sports (junto con Once
Caldas, misma sesión). Ejercicio 2025 = REAL, único ejercicio cargado a
propósito: SIIS tiene 10 ejercicios consecutivos (2016-2025) disponibles
para este club (ver Admin/sourcing/Colombia/Envigado.md), pero el pedido
explícito de esta sesión fue "widen clubs, not deepen one club" — solo se
bajó y cargó 2025, los otros 9 años quedan pendientes a propósito para una
sesión futura.

FUENTE: `Clubes/Colombia/Envigado/estados-financieros-2025.pdf` (44
páginas, "Estados Financieros Individuales... Al 31 de diciembre de 2025",
membrete Grant Thornton, NIT 900.470.848). Es un PDF ESCANEADO sin capa de
texto (`pdftotext`/`pdffonts` no devuelven nada) — transcripto vía OCR
(Tesseract, `pdftoppm -r 300` + `tesseract -l spa --psm 6`, página por
página), transcripción completa en `estados-financieros-2025.md` en la
misma carpeta. Bajado vía SIIS, ver `Admin/sourcing/Colombia/Envigado.md`.

A DIFERENCIA de Once Caldas/Deportes Tolima, este PDF SÍ incluye el Estado
de Resultado Integral PRIMARIO completo (págs. 9-10 del documento), no
solo notas — esto permitió una reconciliación EXACTA sin ningún residuo/
plug (ver verificación abajo), la carga de mayor confianza de las 2
cargadas esta sesión.

Cifras del documento "Expresado en pesos colombianos" (PESOS COMPLETOS,
no miles) — confirmado por el propio encabezado de la tabla primaria.
Acá se guardan divididas por 1.000.000, en MILLONES de pesos colombianos
(COP), mismo criterio de unidad que usa el sitio para ARS.

ESTADO DE RESULTADO INTEGRAL PRIMARIO (pág. 10 del PDF, en pesos
colombianos completos, cifras 2025):
  Ingresos de actividades ordinarias ........... 36.888.980.382
  Costo de ventas ............................... (703.506.292)
  Ganancia bruta ................................ 36.185.474.090
  Otros ingresos ..................................  791.255.801
  Gasto equipo de fútbol ...................... (19.371.584.981)
  Gastos de administración ..................... (2.900.589.891)
  Otros gastos ..................................  (229.130.853)
  (Costos) Ingresos financieros neto ........... (2.317.382.801)
  Ganancia antes de impuestos ................... 12.158.041.365
  Gasto por impuestos a las ganancias ........... (4.404.913.000)
  Gasto por impuesto diferido ..................... (117.904.729)
  Ganancia neta del período ......................  7.635.223.636
Cada línea de arriba reconcilia EXACTA con la anterior (verificado con
node antes de cargar, ver el script de verificación de esta sesión) — a
diferencia de Once Caldas, acá NO hizo falta ningún residuo/plug: todos
los campos de fiscalYearMeta salen directo de líneas impresas.

REVENUE: Nota 20 "Ingresos de actividades ordinarias" (17 líneas + 1
deducción "Devoluciones, rebajas y descuentos", suma EXACTA a
$36.888,980382 M, el total impreso) + Nota 22 "Otros ingresos" (7 líneas,
$791,255801 M) — se suman ambas al campo `revenue` del sitio (ver mismo
criterio en Once Caldas). officialTotalRevenue = 36.888,980382 +
791,255801 = 37.680,236183 M.

EXPENSES: Nota 21 "Costo de ventas" ($703,506292 M), "Gasto equipo de
fútbol" (14 sub-totales por rubro, $19.371,584981 M impreso — bolsón
heterogéneo con sub-categoría real distinta entre sí, promovido a líneas
de primer nivel, ver club-data-mapping SKILL.md sección 1), "Gastos de
administración" (13 sub-totales, $2.900,589891 M impreso, mismo
tratamiento), Nota 22 "Otros gastos" ($229,130853 M).

netInterest = Nota 23: Ingresos financieros ($1.803,868791 M) - Costos
financieros ($4.121,251592 M) = -2.317,382801 M, EXACTO igual al
"(Costos) Ingresos financieros neto" impreso en el Estado de Resultado
Integral primario.

tax = Gasto por impuestos a las ganancias ($4.404,913 M, corriente) +
Gasto por impuesto diferido ($117,904729 M) = -4.522,817729 M, EXACTO
igual a los 2 renglones impresos en el Estado de Resultado Integral
primario (a diferencia de Once Caldas, acá SÍ están las 2 líneas de
impuesto impresas por separado, nada que despejar).
============================================================================
```

_de data/club-leagues/co.js:_

```text
Verificado el 13/9/2026 contra "2025 Categoría Primera A season" (Wikipedia).
```

_de data/club-leagues/co.js:_

```text
descendió al terminar 2025
```

## 2025

### Gastos

_antes de la fila 2 (`Gasto equipo de fútbol: Gastos de personal (plantel)`):_

```text
"Gasto equipo de fútbol" ($19.371,584981 M impreso), promovida por sub-categoría real (ver
comentario de cabecera):
```

_antes de la fila 7 (`Gastos de administración (personal, honorarios, impuestos, arrendamientos, contribuciones, servicios, legales, mantenimiento, adecuación, viajes, diversos)`):_

```text
"Gastos de administración" ($2.900,589891 M impreso), mismo criterio:
```

### Meta

```text
TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio
(mismo caso que Once Caldas, ver ese archivo), así que se usa la TRM de cierre oficial.
Nota 23: Ingresos financieros (1.803,868791) - Costos financieros (4.121,251592), EXACTO
igual al "(Costos) Ingresos financieros neto" impreso en el Estado de Resultado Integral.
Gasto por impuestos a las ganancias (-4.404,913, corriente) + Gasto por impuesto diferido
(-117,904729), EXACTO igual a los 2 renglones impresos por separado — sin ningún residuo,
a diferencia de Once Caldas.
grossDebt = Obligaciones financieras (Nota 12, todas corrientes según el Estado de Situación
Financiera, pág. 9 — no aparece una línea de obligaciones financieras no corrientes). cash =
Efectivo y equivalentes al efectivo (Nota 6, pág. 9).
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Óscar Armando Astudillo Palomino (2025-11-21 a hoy): Firma como representante legal los estados financieros 2025 (dictamen del 4/3/2026). Telemedellín lo presentó como nuevo presidente el 21/11/2025: se usó esa fecha (de presentación; la fuente no dice día de posesión). Dueño: fondo ProFútbol (55%, no persona), por eso presidente.
Duda: La fuente no dice a quién reemplazó (Ramiro Ruiz figuraba como presidente en 2024); Wikipedia en inglés aún lista a Manuel Valero. Fecha de posesión real sin confirmar.
```

## 2022

### Ingresos

```text
2022: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Envigado/siis-estado-2022.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Envigado/siis-estado-2022.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matrículas | pág. 1, precedente |
| 2 | Mensualidades | pág. 1, precedente |
| 3 | Taquilla | pág. 1, precedente |
| 4 | Abonados | pág. 1, precedente |
| 5 | Venta de derechos deportivos | pág. 1, precedente |
| 6 | Préstamo de derechos deportivo | pág. 1, precedente |
| 7 | Contribución de solidaridad | pág. 1, precedente |
| 8 | Publicidad y propaganda | pág. 1, precedente |
| 9 | Dimayor | pág. 1, precedente |
| 10 | Federación colombiana de futbol | pág. 1, precedente |
| 11 | Donaciones | pág. 1, Jev 1 |
| 12 | Patrocinio | pág. 1, precedente |
| 13 | Cuotas de sostenimiento | pág. 1, precedente |
| 14 | Arrendamientos | pág. 1, precedente |
| 15 | Venta de mercancías | pág. 1, precedente |
| 16 | Otras actividades de servicios | pág. 1, precedente |
| 17 | Devoluciones rebajas y descuentos | pág. 1, precedente |
| 18 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2022: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2021

### Ingresos

```text
2021: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Envigado/siis-estado-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Envigado/siis-estado-2021.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.96 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de administración | pág. 1, precedente |
| 3 | Otros gastos | pág. 1, precedente |

### Meta

```text
2021: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-28): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2016, 2017, 2018, 2019, 2020, 2022, 2025)
```

## 2020

### Ingresos

```text
2020: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Envigado/siis-estado-2020.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Envigado/siis-estado-2020.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Matriculas | pág. 1, precedente |
| 2 | Mensualidades | pág. 1, precedente |
| 3 | Taquilla | pág. 1, precedente |
| 4 | Abonados | pág. 1, precedente |
| 5 | Venta de derechos deportivos | pág. 1, precedente |
| 6 | Préstamo de derechos deportivo | pág. 1, precedente |
| 7 | Contribución de solidaridad | pág. 1, precedente |
| 8 | Publicidad y propaganda | pág. 1, precedente |
| 9 | Dimayor | pág. 1, precedente |
| 10 | Federación colombiana de futbol | pág. 1, precedente |
| 11 | Patrocinio | pág. 1, precedente |
| 12 | Cuotas de sostenimiento | pág. 1, precedente |
| 13 | Venta de mercancías | pág. 1, precedente |
| 14 | Otras actividades de servicios | pág. 1, precedente |
| 15 | Devoluciones rebajas y descuentos | pág. 1, precedente |
| 16 | Recuperaciones | pág. 1, Jev 1 |
| 17 | Aprovechamientos | pág. 1, Jev 0.94 |
| 18 | Subvenciones donaciones | pág. 1, Jev 0.99 |
| 19 | Ajuste al peso (Otros ingresos) | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Vienen… | pág. 1, Jev 0.98 |
| 4 | Aseo y vigilancia | pág. 1, Jev 1 |
| 5 | Asistencia técnica | pág. 1, Jev 0.92 |
| 6 | Acueducto y alcantarillado | pág. 1, Jev 1 |
| 7 | Energía eléctrica | pág. 1, Jev 1 |
| 8 | Teléfono | pág. 1, Jev 1 |
| 9 | Correo portes y telegramas | pág. 1, Jev 1 |
| 10 | Transporte fletes y acarreos | pág. 1, Jev 0.97 |
| 11 | Gas | pág. 1, Jev 1 |
| 12 | Notariales | pág. 1, Jev 1 |
| 13 | Registro mercantil | pág. 1, Jev 1 |
| 14 | Tramites y licencias | pág. 1, Jev 0.99 |
| 15 | Construcciones y edificaciones | pág. 1, ? 0.6 |
| 16 | Maquinaria y equipo (Gastos de administración) | pág. 1, Jev 0.95 |
| 17 | Equipo de oficina (Gastos de administración) | pág. 1, ? 0.65 |
| 18 | Equipo de computación y comuna | pág. 1, ? 0.65 |
| 19 | Instalaciones eléctricas | pág. 1, Jev 0.98 |
| 20 | Reparaciones locativas | pág. 1, Jev 1 |
| 21 | Alojamiento y manutención | pág. 1, Jev 0.97 |
| 22 | Pasajes aéreos | pág. 1, Jev 0.9 |
| 23 | Maquinaria y equipo (Gastos de administración) | pág. 1, Jev 0.95 |
| 24 | Equipo de oficina (Gastos de administración) | pág. 1, ? 0.65 |
| 25 | Equipo de computación | pág. 1, Jev 0.96 |
| 26 | Flota y equipo de transporte | pág. 1, precedente |
| 27 | Mejoras en propiedades ajenas | pág. 1, Jev 0.96 |
| 28 | Cargos diferidos | pág. 1, ? 0.55 |
| 29 | Gastos de representación | pág. 1, Jev 0.97 |
| 30 | Elementos de aseo y cafetería | pág. 1, Jev 1 |
| 31 | Útiles papelería y fotocopias | pág. 1, Jev 1 |
| 32 | Combustibles y lubricantes | pág. 1, Jev 0.99 |
| 33 | Taxis y buses | pág. 1, Jev 0.99 |
| 34 | Estampillas | pág. 1, Jev 1 |
| 35 | Casino y restaurante | pág. 1, Jev 0.98 |
| 36 | Parqueaderos y peajes | pág. 1, ? 0.75 |
| 37 | Gastos no deducibles | pág. 1, Jev 0.98 |
| 38 | Provisión cartera | pág. 1, Jev 0.96 |
| 39 | Costos y gastos de ejercicios | pág. 1, ? 0.75 |
| 40 | Impuestos asumidos | pág. 1, precedente |
| 41 | Multas sanciones y litigios | pág. 1, Claude 0.85 |
| 42 | Ajuste al peso (Otros gastos) | pág. 1, Jev 0.93 |

### Meta

```text
2020: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2019

### Ingresos

```text
2019: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Envigado/siis-estado-2019.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Envigado/siis-estado-2019.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Escuelas de fútbol | pág. 1, Jev 1 |
| 2 | Taquilla | pág. 1, precedente |
| 3 | Abonados | pág. 1, precedente |
| 4 | Venta de derechos deportivos | pág. 1, precedente |
| 5 | Préstamo de derechos deportivo | pág. 1, precedente |
| 6 | Contribución de solidaridad | pág. 1, precedente |
| 7 | Publicidad y propaganda | pág. 1, precedente |
| 8 | Derechos televisión internacional | pág. 1, Jev 1 |
| 9 | Derechos televisión abierta RCN | pág. 1, Jev 1 |
| 10 | Derechos televisión cerrada Win Sports | pág. 1, Jev 1 |
| 11 | Arbitraje | pág. 1, ? 0.7 |
| 12 | Federación colombiana de fútbol | pág. 1, precedente |
| 13 | Patrocinio | pág. 1, precedente |
| 14 | Cuotas de sostenimiento | pág. 1, precedente |
| 15 | Venta de mercancías | pág. 1, precedente |
| 16 | Entretenimiento y esparcimiento | pág. 1, precedente |
| 17 | Intereses | pág. 1, Jev 1 |
| 18 | Diferencia En Cambio | pág. 1, Jev 1 |
| 19 | Utilidad En Venta De Propiedad | pág. 1, Jev 0.98 |
| 20 | Reclamos A.R.L. | pág. 1, Claude 0.88 |
| 21 | Reintegro De Costos Y Gastos | pág. 1, Jev 1 |
| 22 | Aprovechamientos | pág. 1, Jev 0.94 |
| 23 | Ajuste Al Peso | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2019: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Envigado/siis-estado-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Envigado/siis-estado-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Escuelas de fútbol | pág. 1, Jev 1 |
| 2 | Taquilla | pág. 1, precedente |
| 3 | Abonados | pág. 1, precedente |
| 4 | Venta de derechos deportivos | pág. 1, precedente |
| 5 | Préstamo de derechos deportivo | pág. 1, precedente |
| 6 | Contribución de solidaridad | pág. 1, precedente |
| 7 | Publicidad y propaganda | pág. 1, precedente |
| 8 | Derechos televisión internacional | pág. 1, Jev 1 |
| 9 | Derechos televisión abierta RCN | pág. 1, Jev 1 |
| 10 | Derechos televisión cerrada Win Sports | pág. 1, Jev 1 |
| 11 | Arbitraje | pág. 1, ? 0.7 |
| 12 | Federación colombiana de fútbol | pág. 1, precedente |
| 13 | Patrocinio | pág. 1, precedente |
| 14 | Cuotas de sostenimiento | pág. 1, precedente |
| 15 | Venta de artículos deportivos | pág. 1, Jev 1 |
| 16 | Entretenimiento y esparcimiento | pág. 1, precedente |
| 17 | Intereses | pág. 1, Jev 1 |
| 18 | Diferencia en cambio | pág. 1, Jev 1 |
| 19 | Descuentos comerciales condicionales | pág. 1, Jev 0.95 |
| 20 | Arrendamientos | pág. 1, precedente |
| 21 | Recuperación gastos bancarios | pág. 1, Jev 1 |
| 22 | Reintegro de otros costos y gastos | pág. 1, Jev 1 |
| 23 | Por incapacidades | pág. 1, Jev 0.99 |
| 24 | Ajuste al peso | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |
| 4 | Otros gastos | pág. 1, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2017

### Ingresos

```text
2017: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Envigado/siis-estado-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Envigado/siis-estado-2017.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | TAQUILLA | pág. 1, precedente |
| 2 | ABONADOS | pág. 1, precedente |
| 3 | ESCUELAS DE FUTBOL | pág. 1, Jev 1 |
| 4 | VENTA DE DERECHOS DEPORTIVOS - | pág. 1, precedente |
| 5 | PRESTAMO DE DERECHOS DEPORTIVO | pág. 1, precedente |
| 6 | CONTRIBUCION DE SOLIDARIDAD | pág. 1, precedente |
| 7 | DERECHOS TELEVISION ABIERTA | pág. 1, Jev 1 |
| 8 | DERECHOS TELEVISION INTERNACIONAL | pág. 1, Jev 1 |
| 9 | DERECHOS TELEVISION ABIERT RCN | pág. 1, Jev 1 |
| 10 | DERECHOS TELEVISION CERRADA | pág. 1, Jev 1 |
| 11 | DERECHOS TELEVISION WIN SPORTS | pág. 1, Jev 1 |
| 12 | ARBITRAJE | pág. 1, ? 0.7 |
| 13 | FEDERACION COLOMBIANA DE FUTBOL | pág. 1, precedente |
| 14 | CUOTAS DE SOSTENIMIENTO | pág. 1, precedente |
| 15 | PARTICIPACION EN EVENTOS NACIONALES | pág. 1, Jev 1 |
| 16 | VENTA DE ARTICULOS DEPORTIVOS | pág. 1, Jev 1 |
| 17 | ENTRETENIMIENTO Y ESPARCIMIENTO | pág. 1, precedente |
| 18 | INTERES | pág. 1, Jev 1 |
| 19 | DESCTOS COMERCIALES CONDICIONA | pág. 1, Claude 0.85 |
| 20 | REINTEGRO DE OTROS COSTOS Y GASTOS | pág. 1, Jev 1 |
| 21 | POR INCUMPLIMIENTO DE CONTRATO | pág. 1, Jev 0.98 |
| 22 | POR INCAPACIDADES I.S.S. | pág. 1, Jev 0.98 |
| 23 | APROVECHAMIENTOS | pág. 1, Jev 0.94 |
| 24 | AJUSTE AL PESO | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2017: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-28) desde Clubes/Colombia/Envigado/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Envigado/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | 41050601 TAQUILLA | pág. 1, Jev 1 |
| 2 | 41050602 ABONADOS | pág. 1, Jev 1 |
| 3 | 410510 ESCUELAS DE FUTBOL | pág. 1, Jev 0.99 |
| 4 | 410515 VENTA DE DERECHOS DEPORTIVOS | pág. 1, Jev 1 |
| 5 | 410520 PRESTAMO DE DERECHOS DEPORTIVO | pág. 1, Jev 1 |
| 6 | 410522 CONTRIBUCION DE SOLIDARIDAD | pág. 1, Jev 0.98 |
| 7 | 41053001 DERECHOS TELEVISION ABIERTA | pág. 1, Jev 1 |
| 8 | 41053002 DERECHOS TELEVISION INTERNACIONAL | pág. 1, Jev 1 |
| 9 | 41053003 DERECHOS TELEVISION ABIERT RCN | pág. 1, Jev 1 |
| 10 | 41053004 DERECHOS TELEVISION CERRADA | pág. 1, Jev 1 |
| 11 | 41053005 ARBITRAJE | pág. 1, ? 0.7 |
| 12 | 410535 FEDERACION COLOMBIANA DE FUTBOL | pág. 1, Jev 0.99 |
| 13 | 410550 CUOTAS DE SOSTENIMIENTO | pág. 1, Jev 1 |
| 14 | 410555 PARTICIPACION EN EVENTOS NACIONALES | pág. 1, Jev 1 |
| 15 | 410560 VENTA DE ARTICULOS DEPORTIVOS | pág. 1, Jev 1 |
| 16 | 417040 ENTRENENIMIENTO Y ESPARCIMIENTO | pág. 1, precedente |
| 17 | OTRAS VENTAS | pág. 1, ? 0.75 |
| 18 | DESCTOS COMERCIALES CONDICIONA | pág. 1, Claude 0.85 |
| 19 | REINTEGRO DE OTROS COSTOS Y GA | pág. 1, Jev 1 |
| 20 | POR INCUMPLIMIENTO DE CONTRATO | pág. 1, Jev 0.98 |
| 21 | PARTICIPACION PARTIDOS DE EQUI | pág. 1, ? 0.55 |
| 22 | RECONOCIMIENTOS I.S.S. | pág. 1, Jev 0.94 |
| 23 | AJUSTE AL PESO | pág. 1, Jev 1 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, precedente |
| 3 | Gastos de administración | pág. 1, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-28): filas-a-mano. Claude 2026-10-28 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-28). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

## Fuentes

### envigado-co-estados-financieros-2025

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900.470.848). PDF escaneado sin capa de texto, transcripto vía OCR (Tesseract). Incluye el Estado de Resultado Integral primario completo (no solo notas) — cada línea reconcilia exacta, sin ningún residuo. SIIS tiene 10 ejercicios consecutivos (2016-2025) disponibles para este club; a propósito solo se cargó 2025 esta sesión (pedido explícito: ampliar clubes, no profundizar uno). Transcripción completa en Clubes/Colombia/Envigado/estados-financieros-2025.md.
```

### envigado-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Envigado/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### envigado-co-siis-estado-2017

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Envigado/siis-estado-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### envigado-co-siis-estado-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Envigado/siis-estado-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### envigado-co-siis-estado-2019

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Envigado/siis-estado-2019.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### envigado-co-siis-estado-2020

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Envigado/siis-estado-2020.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### envigado-co-siis-estado-2021

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Envigado/siis-estado-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### envigado-co-siis-estado-2022

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-28) desde la transcripción Clubes/Colombia/Envigado/siis-estado-2022.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### gestionesByClub.envigado

```text
gestionesByClub: mismo criterio que Once Caldas (ver comentario en data/co/oncecaldas-co-data.js) —
entrada genérica "Gestión actual" para que el selector "Por gestión" tenga al menos 1 opción, sin
atribuir un nombre propio que no se confirmó con confianza (la firma del Representante Legal en
el PDF escaneado salió parcialmente ilegible en la transcripción OCR de esta sesión).
```
