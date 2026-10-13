# banfield-ar — evidencia de carga

Lo que había como comentario en `data/ar/banfield-ar-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/banfield-ar-data.js — Club Atlético Banfield (Sociedad Civil). Primer ejercicio cargado:
2020 (116° Ejercicio Económico, 1°/7/2019 al 30/6/2020). PDF + transcripción completa en
Clubes/Argentina/Banfield/memoria-y-balance-2019-2020.{pdf,md} (58 páginas, texto nativo,
confirmado con pdftotext -layout, sin OCR). Ver Admin/sourcing/Argentina/Banfield.md para cómo se
encontró el documento (Wayback Machine, la URL oficial del club da 404 hoy).

ESTRUCTURA DEL DOCUMENTO: a diferencia de Racing/River/Unión, Banfield NO reporta un "Estado de
Recursos y Gastos" por naturaleza de gasto con Anexo de detalle por rubro transversal — reporta
por SECTOR/DEPARTAMENTO (Anexos IV a X, cada uno un centro de costos: Fútbol Profesional, Fútbol
Amateur, Estadio, Administración Sede Social, Predio, Departamento Deportes, Instituto CAB), más
2 Anexos transversales (XI: Impositivos y Financieros: XII: Generales). Cada Anexo de sector se
abrió línea por línea (pág. 43-50 del .md) y se categorizó por NATURALEZA del gasto dentro de
cada sector, no por el sector completo en bloque, salvo cuando todas sus líneas comparten
categoría real (Predio, Instituto CAB).

ANEXO IV (Sector Fútbol Profesional, 204.927.334,97): igual criterio que Racing/Boca 2027 (ver
club-data-mapping/referencia/formato-simplificado.md, "CASO CONSULTADO"): los costos NO salariales del plantel
profesional (médico, indumentaria, pretemporada, proveduría/comida, seguro y viáticos,
concentraciones) se cargan junto con "Sueldos y Cargas Sociales"/"Primas Anuales" en
`wages_squad`, porque ESE es el criterio que ya usa Boca 2027 para el mismo tipo de línea mixta.
Excepciones: "Costo y Custodia Espectáculo" (organización/seguridad del partido) ->
`match_organisation_expense`, y "Prop. Mant. Administración y Gastos Generales" (asignación de
costos de administración al sector) -> `admin_general_expense`. Suma de las 10 líneas del Anexo =
204.927.335,00 vs. impreso 204.927.334,97 (diferencia de 3 centavos, redondeo).

ANEXO V (Sector Fútbol Amateur, 120.335.465,08): SE CAPITALIZA ENTERO como Bienes Intangibles
(Nota 4, pág. 37 del .md: "incluye... el costo prorrateado incurrido en el fútbol amateur,
destinado a la formación de jugadores... en la medida que dichos valores tengan capacidad futura
de generar ingresos"), y el propio Estado de Recursos y Gastos lo revierte con una línea
"Apropiación de Costos Fútbol Amateur (Nota 4)" por el mismo importe exacto — el Estado de Flujo
de Efectivo confirma la capitalización ("Aumento Bienes Intangibles" = exactamente 120.335.465,08,
pág. 34-35 del .md). Efecto neto en el Estado de Recursos y Gastos: CERO (ver el subtotal
"GASTOS ESPECIFICOS" de 405.110.315,86, que ya no incluye este importe). Se cargaron AMBAS líneas
(el gasto del sector y su reversión), categoría `youth_other_sports_expense` las dos (NO
`youth_football`: esa categoría solo existe del lado de Ingresos, ver ANEXO IX abajo), en vez de
omitirlas — más fiel a la fuente y muestra el mecanismo de capitalización real en "Formato del
club".

ANEXO VI (Sector Estadio, 20.695.882,83) -> `match_organisation_expense` completo (mantenimiento,
servicios y sueldos de la operación del estadio, no de la organización de UN partido puntual pero
mismo espíritu de costo de infraestructura de juego que Union/Racing).

ANEXO VII (Sector Administración Sede Social, 36.532.338,72) -> `admin_general_expense` completo.
Incluye "Gastos e Intereses Bancarios" (978.271,91): a diferencia del Anexo XI (ver abajo), esta
línea mezcla comisiones/gastos bancarios con una porción menor de intereses sin desglosar y es
~2,7% del sector — se dejó en admin_general_expense en vez de separarla a netInterest, por su
tamaño marginal y porque el propio documento la agrupa con "gastos" administrativos, no con el
bloque financiero dedicado (Anexo XI).

ANEXO VIII (Sector Predio, 69.869.856,52) -> `youth_other_sports_expense` completo. "Predio" es
la contracara de gasto de los ingresos de Predio en Recursos (Anexo III: Pileta Natación,
Estacionamiento, Colonia, Acceso a Predio, Alquiler -> `other_sports`/`other_income`), un
complejo recreativo/deportivo del socio, no el plantel profesional. Incluye "Proyecto formación
de Jugadores Extranjeros" (6.364.599,79): pese al nombre, está dentro del Anexo del Predio (no del
Anexo IV de Fútbol Profesional ni del Anexo V de Fútbol Amateur), así que se mantuvo en la misma
categoría que el resto del sector en vez de separarla.

ANEXO IX (Departamento Deportes, 33.551.356,71) -> `youth_other_sports_expense` completo
(Escuela de Fútbol, Fútbol femenino, Hockey, Futsal, Vóley, Tenis, Handball, Liga de fútbol,
Patín, Gimnasia Deportiva, Taekwondo, Acondicionamiento Físico, Ajedrez, Colonia Vacaciones,
Gastos Departamento de Deportes). Del lado de Ingresos (Anexo III) estas mismas actividades SÍ
se separaron en `youth_football`/`womens_football`/`other_sports` (categorías que existen para
Ingresos), pero `category-map.js` no tiene ese mismo detalle del lado de Gastos: el único
espejo-gasto de las 3 es `youth_other_sports_expense` ("fútbol juvenil, femenino, otros
deportes, básquet, actividades sociales", ver su comentario en category-map.js) — se probó
primero separarlas igual que en Ingresos y `youth_football`/`womens_football` quedaron AFUERA
de `otherExpenses` en computeYearGeneric() (esas 2 categorías no existen en EXPENSE_CATEGORIES,
así que la plata desaparecía del PAT sin ningún error visible), encontrado corriendo el motor
real contra este archivo antes de cargarlo — ver verificación en el reporte de la sesión.

ANEXO X (Instituto CAB, 39.533.546,11) -> `education_expense` completo, espejo de "Arancel
Enseñanza" (Anexo III) -> `education` del lado de Recursos. Instituto CAB es el colegio del club.

ANEXO XI (Gastos Impositivos y Financieros, 49.803.210,63) — NO SE CARGÓ COMO expenseLine.
Las 3 líneas del Anexo ("AFIP Intereses y Otros", "Dif. Cambio, Financiación y Otros", "Intereses
e Impuestos Bancarios") son intereses/diferencias de cambio por definición — club-data-mapping
sección 2 es explícita: van a `netInterest`, "ni siquiera si el documento fuente los muestra como
una línea más" del cuerpo de Gastos (que es exactamente este caso: Banfield los suma DENTRO de
"Total Gastos", a diferencia de Racing/Boca/River, que ya los muestran aparte). Se sacaron los
49.803.210,63 del cuerpo de Gastos y se sumaron, en negativo, a `netInterest`.

ANEXO XII (Gastos Generales, 240.372.992,58): SE PROMOVIERON 2 líneas del Anexo con categoría
real propia distinta del resto: "Depreciaciones" (113.965.732,45) -> `depreciation`, y
"Objetivos" (25.469.312,28, premios por objetivos deportivos al plantel/cuerpo técnico) ->
`wages_squad` (mismo criterio que Racing con "Fútbol profesional", club-data-mapping/referencia/formato-simplificado.md).
El resto (Abonos/Mantenimiento, Honorarios, Insumos Generales, Juicios, Socios/Comunicación) ->
`admin_general_expense`. "Juicios" (73.552.707,54, litigios/contingencias legales) es la línea más
grande del resto — no hay categoría más específica en el sitio para litigios, se cargó como
gasto administrativo general, mismo criterio que clubes previos sin bucket de "contingencias".

R.E.C.P.A.M. (Resultado por Exposición al Cambio del Poder Adquisitivo de la Moneda,
+69.665.680,54): el propio Estado de Recursos y Gastos lo separa DEBAJO del "Total Gastos", antes
del "Resultado Final del Ejercicio" (pág. 32 del .md) — es el resultado monetario por la
reexpresión por inflación (RT6/RT48), mismo concepto que "Resultados financieros y por tenencia
(incl. RECPAM)" que ya se carga a `netInterest` para Boca/River/Racing/Vélez/Estudiantes LP/
Rosario Central/Instituto/Independiente (ver esos archivos). Se sumó a `netInterest` junto con el
Anexo XI (arriba): netInterest = RECPAM (69.665.680,54) − Anexo XI (49.803.210,63) =
+19.862.469,91.

VERIFICACIÓN (node, ver detalle en el reporte de la sesión): revenueLines suman EXACTO
705.794.414,61 = Total Recursos impreso. expenseLines (sin Anexo XI, reclasificado a netInterest)
suman EXACTO 645.483.308,44 = Total Gastos impreso (695.286.519,07) MENOS Anexo XI
(49.803.210,63) — por eso `officialTotalExpenses` de este archivo (645,483308 M) es MENOR que el
"Total Gastos" que imprime el balance (695,286519 M): la diferencia es exactamente el Anexo XI,
reclasificado. revenue + expenses + netInterest = 705.794.414,61 − 645.483.308,44 + 19.862.469,91
= 80.173.576,08 = "Resultado Final del Ejercicio" impreso, EXACTO. Total del Activo también
verificado: $1.253.147.745,78 (30/6/2020) = impreso.

grossDebt: el Estado de Situación Patrimonial separa "Deudas Generales" + "Deudas Bancarias y
Financieras" + "Deudas Sociales y Fiscales" (corriente + no corriente) de "Contingencias"
(corriente + no corriente, una previsión/provisión, no deuda financiera) — se usó la línea más
angosta (Deudas, sin Contingencias): 246.057.621,72 = 31.821.621,75 + 73.288.918,83 +
91.698.579,86 + 49.248.501,28. Sumada a Contingencias (65.178.281,09) da el Total del Pasivo
exacto (311.235.902,81), confirmando el corte. cash = Caja y Bancos (Nota 2): 8.578.019,85.

FX: el documento NO declara un tipo de cambio de cierre propio (no hay Anexo de "Activos y
pasivos en moneda extranjera" — se buscó explícitamente en las 58 páginas, ausente; la única
mención a dólares es en la Memoria, cláusulas de préstamo/rescisión de jugadores, no una
valuación contable). fx = mercado (BCRA mayorista o BNA vendedor) al 30/6/2020, referenciado a
FX_CLOSE (data/currency-map.js) como 'ARS@2020-06-30' — ESA entrada todavía no existe en
FX_CLOSE, queda pendiente de que se agregue centralizado (ver reporte de la sesión).

Gestión: Lucía Barbuto, Presidenta, electa en acto del 06/10/2018 (lista única), mandato hasta
octubre de 2021 (pág. 2 del .md) — cubre el ejercicio 2019/2020 cargado con confianza total.
No se encontró una cifra de cantidad de socios en este documento.
============================================================================
```

## 2020

### Gastos

_antes de la fila 1 (`Concentraciones, Entrenamientos y Alquileres`):_

```text
Anexo IV — Sector Fútbol Profesional (ver comentario de cabecera)
```

_antes de la fila 11 (`Sector Fútbol Amateur (formación de jugadores, capitalizado — Nota 4)`):_

```text
Anexo V — Sector Fútbol Amateur, capitalizado como Bienes Intangibles (Nota 4) y revertido.
normalizedCategory: `youth_other_sports_expense` (NO `youth_football`, que solo existe del
lado de Ingresos — el espejo de gasto para fútbol juvenil/femenino/otros deportes es
`youth_other_sports_expense`, ver data/category-map.js).
```

_antes de la fila 13 (`Sector Estadio (mantenimiento, servicios y personal)`):_

```text
Anexo VI — Sector Estadio
```

_antes de la fila 14 (`Sector Administración Sede Social`):_

```text
Anexo VII — Sector Administración Sede Social
```

_antes de la fila 15 (`Sector Predio`):_

```text
Anexo VIII — Sector Predio
```

_antes de la fila 16 (`Escuela de Fútbol (Departamento Deportes, gasto)`):_

```text
Anexo IX — Departamento Deportes. TODO el sector -> `youth_other_sports_expense` (no hay
`other_sports` del lado de Gastos, esa categoría solo existe para Ingresos — ver
data/category-map.js: el espejo de gasto para fútbol juvenil/femenino/otros deportes es
siempre `youth_other_sports_expense`, sin distinguir sub-tipo del lado de Gastos).
```

_antes de la fila 19 (`Instituto CAB (Gastos Varios + Remuneraciones y Cargas Sociales)`):_

```text
Anexo X — Instituto CAB
```

_antes de la fila 20 (`Depreciaciones (Gastos Generales)`):_

```text
Anexo XII — Gastos Generales (Depreciaciones y Objetivos promovidas, resto admin_general_expense)
```

_al final de las filas:_

```text
Anexo XI (Gastos Impositivos y Financieros) NO se carga acá: reclasificado íntegro a
netInterest junto con el R.E.C.P.A.M. — ver comentario de cabecera.
```

### Meta

```text
netInterest = R.E.C.P.A.M. (+69.665.680,54, pág. 32 del .md) menos Anexo XI "Gastos
Impositivos y Financieros" (-49.803.210,63, reclasificado desde Gastos, ver cabecera).
grossDebt = Deudas Generales + Deudas Bancarias y Financieras + Deudas Sociales y Fiscales
(corriente + no corriente), EXCLUYENDO Contingencias (previsión, no deuda financiera).
cash = Caja y Bancos (Nota 2).
officialTotalRevenue = "Total Recursos" impreso (Estado de Recursos y Gastos).
officialTotalExpenses = "Total Gastos" impreso (695,286519 M) MENOS Anexo XI (49,803211 M),
reclasificado a netInterest — ver comentario de cabecera para la reconciliación completa.
officialPAT = "Resultado Final del Ejercicio" impreso. Verificado: revenue + expenses +
netInterest = 80,173576 M exacto.
```

## Gestiones

_antes de Lucía Barbuto (data/gestiones/ar.js):_

```text
Barbuto: elegida el 6/10/2018 (lista única), asumió el 8/10/2018; el mandato terminó en octubre de 2021 (hasta aproximado, dia 08).
```

## Fuentes

### banfield-ar-memoria-y-balance-2019-2020

_note (data/):_

```text
PDF oficial (58 páginas, texto nativo, sin OCR), informe del auditor (Juan Pablo Régoli, C.P.C.E.P.B.A.) del 30/9/2020, sin salvedades. URL oficial del club (clubabanfield.org/inicio/balance/CAB-MemoriaBalance2020.pdf) da 404 hoy — recuperado del snapshot de Wayback Machine de esa misma URL (ver Admin/sourcing/Argentina/Banfield.md). RESULTADO FINAL real: $80.173.576,08 ARS (superávit). Total del Activo al cierre: $1.253.147.745,78. Reporta por SECTOR/DEPARTAMENTO (Fútbol Profesional, Fútbol Amateur, Estadio, Administración Sede Social, Predio, Departamento Deportes, Instituto CAB) más 2 Anexos transversales (Impositivos y Financieros, Generales), a diferencia del desglose por naturaleza de gasto de otros clubes. No declara tipo de cambio de cierre propio (sin Anexo de moneda extranjera) — convertido con cotización de mercado (ARS@2020-06-30, FX_CLOSE). Ver data/ar/banfield-ar-data.js para el detalle completo de categorización.
```

## Otros

### window.CLUB_GENERIC_DATA

```text
Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
```

### gestionesByClub['banfield-ar']

```text
Lucía Barbuto, Presidenta, electa en acto eleccionario (lista única) del 6/10/2018,
mandato de 3 años (hasta octubre de 2021) — confirmado en la propia Memoria, pág. 2 del .md.
```

### memberCountByClub['banfield-ar']

```text
no se encontró una cifra de socios en este documento
```
