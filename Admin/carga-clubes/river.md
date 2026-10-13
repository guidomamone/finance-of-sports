# river — evidencia de carga

Lo que había como comentario en `data/river-data.js`, movido tal cual por `tools/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/river-data.js — River Plate: Brito (2021-actual) y D'Onofrio (2013-2021).

Ejercicios 2021 y 2024 = REALES. Ejercicio 2025 SIGUE SIENDO PLACEHOLDER: no hay documento
oficial cargado todavía (ver fuentes/Argentina/River.md).

Ejercicio 2024 (gestión Brito): balance auditado real vía réplica de tuRiver.com — ver
comentario largo antes de riverRevenueLinesByYear[2024] más abajo.

Ejercicio 2021 (última temporada de D'Onofrio) agregado el 2026-09-28 (ronda de 5 onboardings
de prueba de los tools nuevos), REEMPLAZANDO el placeholder de números redondos inventados que
tenía desde la Versión 138 — fuente real: PDF individual vía CNV (ver comentario largo antes de
riverRevenueLinesByYear[2021] más abajo).

LOS RESULTADOS DEPORTIVOS (más abajo) SÍ SON REALES, a diferencia de las
finanzas: buscados y verificados vía web search en agosto de 2026.
============================================================================
Ejercicio 2024 (1° de septiembre de 2023 al 31 de agosto de 2024, Ejercicio N°123 según la
propia numeración de River) = REAL, del balance auditado (Estado de Recursos y Gastos + Anexo
VII de Ingresos + Anexo VIII de Gastos). Fuente: ver sources['river-estados-contables-2023-24']
en data/clubs.js — el PDF se consiguió en una réplica de la comunidad tuRiver (turiver.com), NO
del dominio oficial de River, aunque el documento en sí es el balance auditado real (informe de
auditoría independiente incluido, sellos CPCECABA). Transcripción completa en
Clubes/Argentina/River/estados-contables-leads/river-estados-contables-2023-24.md,
que existe EN LA MÁQUINA pero NO en el repo: esa carpeta está en .gitignore desde
el 2026-09-17, porque el repo entero se deploya y republicar desde el dominio
propio la transcripción de un PDF que se consiguió en una réplica de hinchas es
distinto de linkear el documento. Ver el comentario en .gitignore.

Cifras en PESOS COMPLETOS / millones ARS NATIVOS (Versión 32 — REESCRITO). Hasta la Versión 31,
este archivo guardaba amountNative ya convertido a USD (una sola conversión, sin capa de
re-conversión como Boca). Desde la Versión 32, River sigue el mismo patrón que Boca y Racing:
amountNative se guarda en ARS millones nativos, y la conversión a USD pasa al renderizar
(yearMetaFor('river', year) + toDisplayValue) — esto es lo que habilita el toggle USD/ARS en vivo.

Tipo de cambio: $950,50 al 31/08/2024 — NO es una cotización externa investigada a mano, es el
valor que el PROPIO balance declara en su Anexo V ("Activos en Moneda Extranjera", pág. 55,
columna "Cambio vigente al cierre") para convertir sus partidas en USD a pesos. Antes se usaba
$953,50 (Rava Bursátil/BCRA, investigado externamente) — se corrigió en la Versión 32 siguiendo
la misma regla nueva que Racing (preferir el tipo de cambio que declara el propio documento antes
que uno externo, ver finance-of-sports/.claude/skills/club-data-mapping/referencia/fx.md). La
diferencia es chica (~0,3%) pero la fuente primaria es más fiel. El balance también declara tipos
de cambio propios para EUR ($1.049,5421) y CHF ($1.122,36) en el mismo Anexo — no se usan acá
porque el sitio solo modela una moneda de reporte (ARS) y una de display (USD), no multi-moneda
por partida.

Revenue = 5 categorías reales del Anexo VII (Fútbol Profesional, Estadio, Educación, Deportes y
otras actividades, Socios), cada una con sus sub-ítems reales — la suma de las 5 da EXACTO
$207.077.217.738, el "Total recursos ordinarios" impreso. Expenses = 8 áreas reales del Anexo
VIII (Fútbol profesional, Educación, Deportes, Administración, Mantenimiento e intendencia,
Servicio médico y asistencial, Socios, Museo) + 3 ítems no-efectivo (Depreciación, Amortización
de plantel, Amortización de software) — la suma da EXACTO $(149.674.797.729), el "Total gastos
ordinarios" impreso. NO se cargó el desglose interno de Gastos por concepto (Anexo VIII tiene una
matriz concepto×área que el agente de extracción no pudo transcribir con confianza suficiente por
la calidad del escaneo) — se prefirió omitir esas celdas en vez de arriesgar una cifra incorrecta,
documentado en el .md de arriba.

OJO — discrepancia encontrada y resuelta durante la carga: la transcripción original traía DOS
valores distintos para "Depreciación de bienes de uso" ($5.984.158.778 en la tabla principal del
Estado de Recursos y Gastos vs. $5.594.158.778 citado en una nota de cruce del Anexo II). Se
verificó por aritmética propia (sumando categorías conocidas hasta llegar al Total de Gastos
Ordinarios ya confirmado) que el valor correcto es $5.984.158.778 — el de la nota del Anexo II
tiene una transposición de dígitos. Se usó el valor verificado, no el de la nota.
```

## 2024

### Ingresos

```text
ARS millones nativos (Versión 32 — antes USD ya convertido). Fuente: Anexo VII, pág. 58,
columna 31/08/2024. Suma exacta a $207.077.217.738. "Fútbol Profesional" abierto en sus 4 renglones (decisión de Guido,
2026-10-04): "Ingresos torneos" es taquilla (`matchday_competition`), ver la nota de 2021.
```

### Gastos

```text
ARS millones nativos (Versión 32). Fuente: Anexo VIII, pág. 59-62, fila "Totales al
31/08/2024" por área + Estado de Recursos y Gastos (Depreciación/Amortización, pág. 11). Suma
exacta a $(149.674.797.729), el "Total gastos ordinarios" impreso.
CATEGORIZACIÓN POR DESTINO (Versión 140, a pedido de Guido: "river 2024: arreglalo").
Hasta acá las 8 líneas de arriba estaban las 8 en `other_expenses`, o sea el 80% de los
gastos de River caía al catch-all "Otros gastos" de Formato simplificado, y la fila
"Salarios y primas" mostraba $0. Un club de primera división no gasta cero en sueldos: lo
que pasa es que el Anexo VIII de River desglosa sus gastos POR DESTINO (qué área del club
los gastó) y no POR NATURALEZA (en qué se gastaron), así que los sueldos están adentro de
cada área, sin una línea propia.

QUÉ SE HIZO: mapear cada destino al bucket de destino que el sitio ya tiene, siguiendo
LÍNEA POR LÍNEA el precedente de Boca 2025 (`data/boca-data.js`), que es la referencia
canónica de Formato simplificado. No se movió ni un peso: los montos son los mismos y el
total sigue cerrando contra los $149.674.797.729 impresos.
  - "Fútbol profesional" -> `lump_football_operations_expense`, que es exactamente lo que
    es: un bolsón que la fuente no desglosa. Se muestra en la fila "Fútbol profesional (sin
    desglosar por la fuente)", que lo dice, en vez de perderse en "Otros gastos".
  - "Deportes" -> `youth_other_sports_expense` (Boca manda ahí su Departamento de educación
    física, Fútbol juvenil, Básquet y Fútbol femenino). "Educación" -> `education_expense`
    (Versión 550, to-do 101: la fila espejo del ingreso "Educación" existe desde la Versión 194 y
    River había quedado afuera de esa recategorización. Sin ajuste manual: el ajuste `categoria` va
    por etiqueta y movería también el INGRESO "Educación"; River se carga a mano, no por el pipeline).
  - "Administración", "Mantenimiento e intendencia", "Servicio médico y asistencial",
    "Socios" y "Museo" -> `admin_general_expense` (Boca manda ahí "Gastos generales",
    "Gastos de estructura operativa — Otros", "Departamento médico — Otros gastos
    operativos" y "Departamento de cultura", que es el análogo del Museo).

LO QUE SIGUE SIN SABERSE, Y DÓNDE ESTÁ: cuánto de esos $78.835 M es sueldo del plantel.
El Anexo VIII tiene la matriz completa (30 conceptos x 8 áreas, páginas 59-62 del PDF,
impresas 51-54), con "Sueldos y cargas sociales" como una de sus filas. NO se transcribió:
la sesión que leyó el documento encontró diferencias no explicadas al sumar celdas
individuales de esa matriz escaneada y decidió no publicar cifras posiblemente incorrectas
(ver el final de `Clubes/Argentina/River/estados-contables-leads/river-estados-contables-2023-24.md`,
que está en la máquina pero no en el repo — ver .gitignore).
La celda que hace falta es UNA: fila "Sueldos y cargas sociales" x columna "Fútbol
profesional". El día que se lea y verifique, esa porción sale de acá y pasa a `wages_squad`.
```

_antes de la fila 1 (`Fútbol profesional — Sueldos y cargas sociales`):_

```text
SUELDOS SEPARADOS DEL BOLSÓN (to-do 20(f), cerrado el 2026-09-20). La columna "Fútbol
profesional" del Anexo VIII eran $78.835,612406 M en una sola línea "sin desglosar por la
fuente". Su fila "Sueldos y cargas sociales" se recuperó del PDF y son $12.889.436.305, o
sea el 16,3% de esa columna: pasa a `wages_squad` y el resto sigue en el bolsón.
CÓMO SE RECUPERÓ, que es lo que la sesión anterior no pudo: las 4 páginas del Anexo (59-62)
están ROTADAS 90° en el escaneo — es la tabla ancha impresa en horizontal que describe
club-data-mapping/referencia/leer-pdf.md. OCRearlas sin enderezar mezcla columnas, y eso explica las
"diferencias no explicadas al sumar celdas individuales" que hicieron abortar el intento
anterior. `tesseract --psm 0` las detecta (Rotate: 90 las cuatro); rotando con PIL y
OCReando con `-l spa --psm 3` las filas salen limpias.
VERIFICADO POR TRES CAMINOS antes de cargar, ninguno opcional:
  1. La fila "Sueldos y cargas sociales" suma sus 8 columnas EXACTO contra su total impreso
     ($34.379.825.390): 12.889.436.305 + 3.405.232.275 + 4.234.845.701 + 5.736.749.179 +
     4.243.771.322 + 796.893.287 + 2.962.006.039 + 110.891.282.
  2. La fila "Totales al 31/08/2024" del Anexo coincide EXACTO con los 8 valores por área
     que este archivo ya tenía cargados desde la Versión 140 — o sea que el orden de
     columnas del OCR es el correcto y la primera ES "Fútbol profesional".
  3. Una segunda fila al azar ("Transporte") también cierra exacto contra su total impreso.
```

### Meta

```text
Ejercicio 2024: no se pudo separar "Salarios" del resto de los gastos operativos por área (el
Anexo VIII sí tiene ese desglose por concepto, pero la matriz no se pudo transcribir con
confianza suficiente — ver comentario arriba). Por eso wages queda en 0 acá (todo cae en
"Otros gastos" vía normalizedCategory) y el stat "Salarios / Ingresos" no es representativo
para este ejercicio — no es un error, es una limitación de la fuente transcripta.
currency/fx (Versión 32): 'ARS' con fx:950.50, el tipo de cambio que el propio balance declara
en su Anexo V (ver comentario de cabecera) — no una cotización externa. grossDebt/cash/extraRows
están en ARS millones nativos ahora (antes USD ya convertido).
grossDebt = "Préstamos" (Nota 2.f, corriente $19.987.059.205 + no corriente $7.500.000.000),
NO el Total del Pasivo completo (que incluye cuentas por pagar, cargas fiscales, etc. — mismo
criterio que Boca/Racing: grossDebt es deuda financiera, no todo lo que el club debe). cash =
Caja y bancos (pág. 10, Estado de situación patrimonial).
extraRows: el documento separa "Resultados financieros y por tenencia (incl. RECPAM)" de
"Otros egresos (Nota 2.k)" como dos líneas distintas — se muestran así en la tabla, aunque
netInterest de arriba lleva el NETO de ambas ($1.543,098828 M ARS) para que el cálculo de
PAT/KPIs cierre.
officialTotalExpenses = Total de Gastos Ordinarios IMPRESO (incluye los 3 ítems no-efectivo,
a diferencia de cur.expenses que solo suma wages+otherExpenses) — el chequeo en verifyTieOuts
compara contra Math.abs(expenses)+Math.abs(nonCash), no contra expenses solo. Todo en ARS
millones (Versión 32).
```

## 2021

### Ingresos

```text
Ejercicio 2021 (ronda de 5 onboardings de prueba de los tools nuevos, 2026-09-28) —
REEMPLAZA el placeholder inventado de la Versión 138. Fuente: PDF individual (no consolidado,
mismo criterio que Boca/Racing) vía CNV, `Clubes/Argentina/River/
estados-contables-2020-2021.pdf`, transcripto HOY con Mistral OCR (documento ESCANEADO —
cifras verificadas a mano contra el PDF, no solo que el tie-out cierre, ver SKILL.md sección
6 punto 6). "Fútbol Profesional" del Anexo VII se carga abierto en sus 4 renglones, cada uno con su
categoría (decisión de Guido, 2026-10-04, igual que 2024): "Ingresos torneos nacionales e internacionales" es
taquilla, no premios (`matchday_competition`): en este año sin público dio $2,3 M contra $1.290,9 M del año
anterior, y el renglón Estadio no tiene entradas. Suma exacta a $9.065.549.461 (moneda nativa, "Total recursos ordinarios"
impreso).
```

### Gastos

```text
Ejercicio 2021: mismo criterio de destino que 2024 (ver comentario largo de 2024 más abajo).
A diferencia de 2024 (que necesitó recuperar una tabla rotada 90° para separar sueldos), acá
la fila "Sueldos y cargas sociales" del Anexo VIII se leyó directo, sin rotar, con su columna
"Fútbol profesional" ($524.701710 M) reconciliando exacto contra el total de esa fila.
ERROR DE OCR ENCONTRADO Y CORREGIDO DOS VECES (SKILL.md sección 6.6, to-do 103): Mistral
transcribió "Amortización de software" como $12.336.254. Una corrección a mano anterior lo
cambió a $12.326.254 (arregló el "326 vs 336" pero introdujo un segundo error propio, "254" en
vez de "234", que quedó sin detectar porque el tie-out de esa sesión dio "$20 de diferencia
residual" y se lo atribuyó al documento en vez de sospechar de la propia corrección).
RE-VERIFICADO 2026-09-28 (to-do 103, comparación Mistral vs. Gemini): el valor real, impreso en
el PDF (pág. 8 impresa/3 real, confirmado con zoom sobre la celda Y con `tools/sum-check.mjs`
contra el subtotal de la fila), es $12.326.234 -- Gemini lo transcribió bien a la primera,
Mistral lo tuvo mal en las 2 pasadas (Estado de Recursos y Gastos Y Anexo III.b). Con este valor
la suma cierra EXACTO contra "Subtotal amortizaciones y depreciaciones" ($1.814.445.567), sin
ningún residual -- el "$20 del documento" de la nota anterior no era del documento, era de esta
misma corrección.
```

### Meta

```text
Ejercicio 2021 (última temporada de D'Onofrio, gestión donofrio): fx = $97,54/USD, el que el
propio balance declara en su Anexo V ("Cambio vigente al cierre", pág. ~45) para USD -- mismo
criterio que 2024. tax:0 (River es asociación civil sin fines de lucro, sin impuesto a las
ganancias como línea propia -- mismo criterio que 2024). netInterest lleva el NETO de
"Resultados financieros y por tenencia (incl. RECPAM)" ($226,920637 M) y "Otros egresos" (Nota
2.1, -$117,705245 M), mostrados por separado en `extraRows` -- RESULTADO OPERATIVO
($147,712988 M) + ese neto reconcilia EXACTO contra el "SUPERÁVIT DEL EJERCICIO" impreso.
grossDebt = "Préstamos" (Nota 2.f, Pasivo Corriente, único renglón ese año). cash = Caja y
bancos.
```

## Otros

### Presupuesto al lado del balance (riverPresupuestoOverlayByYear), en general

```text
riverPresupuestoOverlayByYear (Versión 57): mismo mecanismo que racingPresupuestoOverlayByYear
(ver data/racing-data.js), vacío hoy, para el día que aparezca un ejercicio de River con
Presupuesto Y Balance reales cargados a la vez.
```

### riverPasesData

```text
---------------------------------------------------------------------------
Mercado de pases — placeholder, mismo estilo que los movimientos inventados
que ya tenía Boca (Jugador A, Jugador B...) desde el primer MVP: esa
sección nunca tuvo datos reales para ningún club todavía (pendiente
Transfermarkt, ver Admin/finance-of-sports-project.md).
---------------------------------------------------------------------------
```

### riverResultadosData

```text
---------------------------------------------------------------------------
Resultados deportivos — estos SÍ son reales (a diferencia de las finanzas):
buscados y verificados vía web search en agosto de 2026 (ESPN, Infobae,
La Nación, Wikipedia). Igual que con Boca, a cruzar contra el sitio
oficial del club antes de publicar.
---------------------------------------------------------------------------
```

### window.CLUB_GENERIC_DATA

```text
Versión 95: registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, la
primera vez que se agrega este registro) — reemplaza los ternarios `clubId === 'river' ? ... :
clubId === 'racing' ? ... : ...` que había que extender a mano en finanzas-calc.js/
finanzas-render.js/index.html cada vez que se sumaba un club nuevo.
```

### gestionesByClub.river

```text
Versión 138: los ejercicios 2021 y 2025 de River eran placeholder puro (existían solo para
que "Comparar Gestiones" tuviera dos períodos que poner lado a lado) y se borraron. El
Ejercicio 2021 volvió a cargarse REAL el 2026-09-28 (ronda de onboardings de prueba) — el
rango de `donofrio` ya estaba puesto en 2021-2021 desde la Versión 138 (dejado ahí solo para
que Mercado de Pases/Resultados Deportivos tuvieran fila propia, sin ejercicio financiero
real detrás todavía), así que no hizo falta tocarlo, coincide con el ejercicio real que se
agregó.
```
