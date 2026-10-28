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

## Otros

### gestionesByClub.envigado

```text
gestionesByClub: mismo criterio que Once Caldas (ver comentario en data/co/oncecaldas-co-data.js) —
entrada genérica "Gestión actual" para que el selector "Por gestión" tenga al menos 1 opción, sin
atribuir un nombre propio que no se confirmó con confianza (la firma del Representante Legal en
el PDF escaneado salió parcialmente ilegible en la transcripción OCR de esta sesión).
```
