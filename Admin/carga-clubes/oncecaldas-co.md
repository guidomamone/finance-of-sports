# oncecaldas — evidencia de carga

Lo que había como comentario en `data/co/oncecaldas-co-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/co/oncecaldas-co-data.js — Once Caldas S.A. En Reorganización (Manizales,
Colombia). Primer club colombiano cargado en finance-of-sports (junto con
Envigado, misma sesión). Ejercicios 2022, 2023, 2024 y 2025 = REALES.

EJERCICIO 2023 agregado el 2026-09-28 (5/5 de la misma ronda de
onboardings de prueba, sustituto de Ecuador/LDU Quito — ver to-do en
`Admin/sourcing/Ecuador/LDU Quito.md`, ya decidido en 2026-09-25: el único
documento de resultados de ese club consolida escuela y country club, CERO
líneas de fútbol, no se carga). `tools/suggest-category-precedent.mjs`
sugirió EXACTO los 11 rubros de ingreso consultados (11/11, con 3 años de
precedente ya cargado — la mejor demostración de tier-0 de toda esta
ronda). Ingresos ($24.591,311 M) y gastos ($20.950,362 M) reconciliados
exacto (con las mismas diferencias de redondeo de unas centenas de miles
de pesos, ~0,04%, que ya aparecen en Notas 22/23 de otros años de este
club — se usa el total impreso, no la propia suma, mismo criterio de
siempre). PAT confirmado (Cuenta de Patrimonio): -$1.287,531 M, una
PÉRDIDA (el único ejercicio con resultado negativo de los 4 cargados).
`tax` residuo, mismo método que 2023-2025 (la Nota 25/26/27 tampoco
reconcilia limpio este año). FX: TRM oficial al 31/12/2023
($3.822,05, coincide EXACTO con lo que el propio documento de 2024
mencionó en prosa como el cierre del año anterior — buena señal cruzada).

EJERCICIO 2022 agregado el 2026-09-28 (ronda de 5 onboardings de prueba
para los tools nuevos del to-do 98/95). FUENTE:
`Clubes/Colombia/Once Caldas/estados-financieros-2022.pdf`, transcripción
en `estados-financieros-2022.md`. Formato numérico EU (punto miles, coma
decimal) — DISTINTO del que usa el 2024 de este mismo club (formato US),
confirma que el separador decimal es por documento/plantilla, no por club
ni por país (ver `tools/extract-table-rows.mjs`). A diferencia de 2024,
esta Nota 25 SÍ reconcilia exacto: Gastos Extraordinarios ($746,016 M) +
Impuesto Diferido, Nota 26 ($610,063 M) + Impuesto de Renta, Nota 27
($2.712,140 M) suman EXACTO el residuo de `tax` (PAT confirmado menos
pretax línea por línea) — la Nota 25 de 2024/2025 no tenía esa suerte.
`tools/suggest-category-precedent.mjs` sugirió EXACTO 10 de 11 rubros de
ingreso y los 5 de gasto consultados (el único SIN_PRECEDENTE, "Ingresos
por solidaridad", se categorizó igual que "Solidaridad" de 2025 por
criterio, mismo concepto con texto distinto). FX: el documento no declara
el propio (a diferencia de 2024) — se usó `tools/lookup-fx-close.js`
(TRM oficial al 31/12/2022, agregada a `data/currency-map.js`).

EJERCICIO 2024 agregado el 2026-09-28 (to-do 98, validación real del
prototipo `tools/extract-table-rows.mjs`: usado para navegar el documento
en vez de leerlo entero, aunque una tabla partida por salto de página con
un separador Markdown mal puesto obligó a leer esa sección a mano — ver
`Admin/TODO.md` to-do 98 para el detalle del bug encontrado en el
prototipo, no en este documento). FUENTE:
`Clubes/Colombia/Once Caldas/estados-financieros-2024.pdf`, transcripción
en `estados-financieros-2024.md`, misma carpeta. Cifras en MILES de pesos
colombianos igual que 2025 (aunque este PDF no repite la aclaración
textual, el orden de magnitud y la consistencia contra el patrimonio de
2025 lo confirman) — acá también divididas por 1.000, en MILLONES COP.

REVENUE 2024 = "INGRESOS OPERATIVOS" (total impreso $26.814,332 M,
reconciliado EXACTO línea por línea con `tools/sum-check.mjs`) + la
porción no-financiera de "INGRESOS NO OPERACIONALES" ($156,708 M = total
impreso $4.783,272 M menos el componente FINANCIEROS $4.626,564 M, que va
a `netInterest` — mismo criterio que carveó Ingresos Financieros aparte en
2025). "Taquilla" se separó en sus 2 sub-componentes impresos (partidos
oficiales -> matchday_competition, venta de abonos -> season_tickets, ver
club-data-mapping/referencia/formato-simplificado.md: son 2 conceptos distintos) — 2025 no tenía este nivel
de desglose disponible en su documento, así que quedó como una sola línea
ese año; no es una inconsistencia entre ejercicios, es lo que cada
documento permitió separar.

EXPENSES 2024 = "COSTO DE VENTAS" ($1.276,105 M) + "GASTOS DE
ADMINISTRACION" ($1.633,521 M) + "GASTOS DE VENTAS" ($19.085,241 M), los 3
reconciliados EXACTO contra su propio total impreso. "Gastos de Ventas" se
promovió por sub-categoría real (personal del plantel, derechos
deportivos, organización/logística, administración del plantel,
depreciación, diversos y provisiones), mismo criterio que 2025.

`tax` 2024, RESIDUO (mismo método que 2025, documentado en su comentario):
la Nota 25 "Gastos No Operacionales" ($3.435,595 M impreso) NO reconcilia
contra la suma de sus propias líneas (Financieros + Extraordinarios +
Impuesto Diferido + Diversos + Impuesto de Renta da ~$3.729 M antes de
sumar el impuesto de renta, ya por encima del total impreso) — la propia
fila "IMPUESTO DE RENTA Y COMPLEMENTARIO" muestra **0** en negrita pero
**1.761.301** en la fila de detalle inmediatamente debajo, contradictorio.
No se fuerza una categorización sobre números que no cierran (SKILL.md
sección 6, punto 3: no confiar en un rótulo/número sin cruzarlo). En vez
de eso: PAT confirmado (Utilidad del Ejercicio, $4.112,260 M, de la
Cuenta de Patrimonio — único ejercicio SIN segunda fuente independiente
que lo repita: el dictamen del revisor fiscal 2024 no narra la cifra como
sí lo hace el de 2025, ver `Admin/sourcing/Colombia/Once Caldas.md`) menos
pretax calculado línea por línea (Ingresos - Costo Ventas - Gastos Admin
- Gastos Ventas + netInterest = $6.515,947 M) = tax -$2.403,687 M —
absorbe impuesto corriente + diferido + extraordinarios + diversos no
operacionales, sin separarlos (el documento no lo permite).

FX 2024: el documento SÍ declara su propio cierre, en prosa dentro de la
Nota 24 ("...terminando el año 2023 en $3.822,05 y en el año 2024 a
$4.409,15" -- diferencia en cambio) -- club-data-mapping/referencia/fx.md regla #0, se usa
ESE valor (fxSource:'document_close'), no una TRM externa como sí hizo
falta para 2025 (que no declaraba el propio).

EJERCICIO 2025 (comentario original, sin cambios):

FUENTE: `Clubes/Colombia/Once Caldas/estados-financieros-2025.pdf` (34
páginas, "ESTADOS FINANCIEROS Al 31 de diciembre de 2025 y 2024 e Informe
del Revisor Fiscal", texto real vía pdftotext -layout, NIT 890.801.447-5),
transcripción completa en `estados-financieros-2025.md` en la misma
carpeta. Bajado vía SIIS (siis.ia.supersociedades.gov.co), ver
`Admin/sourcing/Colombia/Once Caldas.md`.

OJO — este PDF (a pesar del nombre "estados-financieros") son las NOTAS a
los estados financieros (desglose rubro por rubro), NO incluye una tabla
de Estado de Situación Financiera/Estado de Resultado Integral aparte como
sí incluye el de Envigado (ver data/co/envigado-co-data.js). Esto afecta cómo se
armó fiscalYearMeta[2025].tax, ver ese comentario.

Cifras del documento en MILES de pesos colombianos (confirmado: pág. 7,
"la información...se encuentra presentada en miles de pesos"; también
verificado indirectamente: el Informe del Revisor Fiscal dice "generó
utilidades por $9.138 millones", que coincide con dividir por 1.000 el
$9.138.546 (miles) que trae la Nota 2). Acá se guardan ya divididas por
1.000, en MILLONES de pesos colombianos (COP), mismo criterio de unidad
que usa el sitio para ARS (amountNative en millones nativos).

REVENUE = Nota 20 "Ingresos de Actividades Ordinarias" (11 líneas, suma
EXACTA a $58.810,323 M COP, el total impreso) + Nota 25 "Otros Ingresos"
(4 líneas, $271,337 M) — se suman ambas al campo `revenue` del sitio
porque acá no hay ninguna otra ubicación para "otros ingresos" que no sea
financiero (ver criterio idéntico en Envigado). officialTotalRevenue por
eso es 58.810,323 + 271,337 = 59.081,660 M, no el número que muestra la
vista rápida de SIIS (que replica solo la Nota 20).

EXPENSES: Nota 21 "Costo de Ventas" ($1.483,046 M), Nota 22 "Gastos de
Administración" (13 líneas, $2.509,228 M impreso — la suma de mis líneas
da $2.509,229 M, 1 milésima de diferencia por redondeo de la propia
transcripción; se usa el TOTAL IMPRESO como amountNative del renglón
consolidado, no mi propia suma, ver club-data-mapping SKILL.md sección 6),
Nota 23 "Gastos de Ventas" (19 líneas, $40.862,125 M impreso) — estas 2
últimas son bolsones heterogéneos (personal, derechos deportivos,
logística, administración, depreciación...) que SÍ tienen sub-ítems con
categoría real distinta entre sí (ver club-data-mapping SKILL.md sección
1), así que se promovieron a líneas de primer nivel agrupadas por
categoría (no una única línea "Gastos de Ventas" con todo adentro). Nota
27 "Otros Gastos" ($360,154 M) se suma también, mismo criterio que Otros
Ingresos.

RESULTADO FINAL (PAT): confirmado TRIPLE, dentro del propio documento: (1)
la tabla de indicadores de negocio en marcha de la Nota 2 dice
literalmente "Año 2025: $9.138.546" como "resultado del ejercicio"; (2) el
Informe del Revisor Fiscal narra "la Compañía generó utilidades por
$9.138 millones"; (3) coincide con la cifra "Ganancia" que muestra la
vista SIIS ($9.138.546 M, ver Admin/sourcing/Colombia/Once Caldas.md). officialPAT
= 9.138,546 M COP, altísima confianza.

PERO: sumando Ingresos - Costo Ventas - Gastos Admin - Gastos Ventas +
Ingresos Financieros (Nota 24, $3.873,050 M) + Otros Ingresos - Gastos
Financieros (Nota 26, $4.294,035 M) - Otros Gastos, el PRETAX que da esta
cuenta ($13.446,121 M) NO reconcilia limpio contra el pretax que el propio
documento llama "Utilidad contable" en su nota de conciliación fiscal
(Nota 15, $9.846,710 M) — una diferencia de ~$3.599 M que este documento
no explica (no hay una línea de "ganancia extraordinaria por acuerdo de
reestructuración" ni similar en las notas descargadas). La Nota 15 SÍ da
el impuesto de renta CORRIENTE exacto ($4.666,696 M), pero no alcanza para
llegar de mi pretax al PAT confirmado, faltando el efecto de impuesto
diferido (que la Nota 15 sí prueba que existe: activo por impuesto
diferido reconocido de $232,682 M en 2025 vs. un pasivo de $195,091 M en
2024, un swing de ~$427,7 M, tampoco alcanza para cerrar toda la
diferencia). Ante la imposibilidad de reconciliar el detalle completo con
el documento descargado (que no trae el Estado de Resultados Integral
primario, solo notas — ver Admin/sourcing/Colombia/Once Caldas.md para el
pendiente de re-descargar el radicado correcto), se resolvió el ÚNICO
campo sin fuente directa (`tax`, en fiscalYearMeta) como RESIDUO: pretax
(calculado línea por línea desde las Notas 20-27, cada una con su propio
número impreso) MENOS el PAT confirmado triple. Esto no es un número
inventado a ciegas: es la única incógnita restante despejada de dos
anclas 100% sourced (mi pretax línea por línea + el PAT confirmado). Ver
Admin/dudas-por-club.md para la pregunta pendiente al club/SIIS sobre esta
diferencia.
============================================================================
```

_de data/clubs.js:_

```text
Colombia: ejercicio fiscal es año calendario (1-ene a 31-dic), moneda nativa COP (ver
data/currency-map.js y Admin/sourcing/Colombia/*.md sobre el tipo de cambio TRM usado).
`brandColor:null` (no ausente): se miró y NO lleva color, el que lo identifica es el blanco.
```

_de data/club-leagues/co.js:_

```text
2024 verificado el 2026-09-28 (to-do 95, pipeline nuevo de Wikipedia: tools/resolve-wikipedia-
season-page.mjs + tools/fetch-club-league-reference.mjs) contra "2024 Liga DIMAYOR" (título
vigente de la temporada 2024 en Wikipedia, cambió de sponsor respecto de años anteriores):
roster de 21 equipos de Primera A 2024, Once Caldas incluido. 2022 verificado el mismo día,
mismo pipeline, contra "2022 Liga DIMAYOR": roster de 20 equipos, Once Caldas incluido. 2023
verificado el mismo día contra "2023 Liga DIMAYOR": roster de 20 equipos, Once Caldas incluido.
```

## 2025

### Gastos

_antes de la fila 2 (`Gastos de Ventas: Gastos de personal (plantel)`):_

```text
Nota 23 "Gastos de Ventas" ($40.862,125 M impreso), promovida por sub-categoría real (ver
comentario de cabecera):
```

_antes de la fila 9 (`Gastos de Administración (personal, honorarios, diversos, viaje, arrendamientos, servicios, seguros, legales, mantenimiento, impuestos)`):_

```text
Nota 22 "Gastos de Administración" ($2.509,228 M impreso), mismo criterio:
```

### Meta

```text
TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
cierre del ejercicio: $3.757,08 COP/USD. El documento NO declara su propio tipo de cambio (a
diferencia de los balances argentinos, este balance no tiene un Anexo de "activos y pasivos en
moneda extranjera"), así que se usa la TRM de cierre oficial, mismo criterio que ya aplica el
sitio cuando un balance argentino no declara su propio fx (ver club-data-mapping/referencia/fx.md, regla 1). Fuente: Superintendencia Financiera de Colombia
(superfinanciera.gov.co/powerbi/reportes/514/482/), cruzado contra dolar-colombia.com.
Ingresos Financieros (Nota 24, $3.873,050 M) - Gastos Financieros (Nota 26, $4.294,035 M).
tax: RESIDUO, ver comentario de cabecera del archivo. pretax línea por línea (Notas 20-27,
cada línea con su propio número impreso) = 13.446,121 M. officialPAT confirmado triple =
9.138,546 M. tax = 9.138,546 - 13.446,121 = -4.307,575 (gasto por impuesto a las ganancias,
corriente + diferido neto — la Nota 15 solo prueba el corriente, $4.666,696 M; el diferido neto
implícito de ~$359 M de beneficio no está separado explícito en las notas descargadas).
```

_al lado del campo `grossDebt`:_

```text
no se cargó (el documento no trae el Estado de Situación Financiera primario en este PDF, solo notas — ver Admin/sourcing/Colombia/Once Caldas.md)
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Obligaciones financieras corriente 366.562 (Banco AV Villas vía Dimayor) + largo plazo 0 (Nota 13). Miles de pesos. La Nota 13 también agrupa 'CxP acuerdo reestructuración' 9.070.113 (pasivo concursal con acreedores de la reorganización, ver Nota 15): se excluyó por no ser deuda financiera; pregunta: ¿se incluye el acuerdo de reestructuración si hay deuda bancaria/fiscal dentro? (valor en la escala del documento, miles: el ajuste se multiplica por ella); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Efectivo y equivalentes 7.559.569 (miles) = caja 11.965 + caja ME 15.539 + bancos 694.823 + bancos ME 106.041 + derechos fiduciarios 6.731.201. Los CDT 11.241.891 (Nota 7 inversiones financieras) no son efectivo, no se suman. Págs = marca 'Página N de 34' del documento (el .md no trae marcadores 'pág.'). (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

## 2024

### Ingresos

_antes de la fila 12 (`Otros ingresos no operacionales (recuperaciones, indemnizaciones, diversos, subvenciones)`):_

```text
$156,708 M = total impreso de "Ingresos No Operacionales" ($4.783,272 M) menos el componente
"Financieros" ($4.626,564 M, va a netInterest) -- se usa el total impreso, no mi propia suma de
sub-ítems (que da $156,731 M, $23 M de diferencia sin explicación clara en el documento).
```

### Gastos

_antes de la fila 2 (`Gastos de Ventas: Gastos de personal (plantel)`):_

```text
Nota 23 "Gastos de Ventas" ($19.085,241 M impreso), promovida por sub-categoría real:
```

_antes de la fila 7 (`Gastos de Ventas: Diversos y provisiones`):_

```text
$2.394,150 M = Provisiones ($12,405 M) + total impreso de "Diversos" ($2.381,745 M, no mi
propia suma del detalle publicado, que da $2.380,103 M -- $1,642 M de diferencia sin explicar).
```

_antes de la fila 8 (`Gastos de Administración (personal, honorarios, diversos, viaje, arrendamientos, servicios, seguros, legales, mantenimiento)`):_

```text
Nota 22 "Gastos de Administración" ($1.633,521 M impreso), mismo criterio:
```

### Meta

```text
El documento declara su propio cierre, en prosa dentro de la Nota 24 ("...terminando el año
2023 en $3.822,05 y en el año 2024 a $4.409,15" -- diferencia en cambio). club-data-mapping/referencia/fx.md regla #0: se usa ESE valor, no una TRM externa.
Financieros (Nota 24, ingreso $4.626,564 M) - Gastos Financieros (dentro de Nota 25, $3.086,790 M).
tax: RESIDUO, ver comentario de cabecera del archivo -- la Nota 25 no reconcilia contra sus
propias líneas. pretax línea por línea = $6.515,947 M. officialPAT confirmado (Cuenta de
Patrimonio, "Utilidad o pérdida del ejercicio") = $4.112,260 M. tax = 4112.260 - 6515.947 =
-2403.687 (gasto neto: corriente + diferido + extraordinarios + diversos no operacionales,
sin poder separarlos con lo que declara este documento).
```

_al lado del campo `grossDebt`:_

```text
no verificado esta sesión (el foco fue validar tools/extract-table-rows.mjs, to-do 98) -- el documento sí trae Notas de deuda financiera (10, 16) que permitirían cargarlo en una sesión futura
```

```text
tools/caja-deuda.mjs (2026-10-16): grossDebt escalón 1 (compuerta: documento anterior): "TOTAL OBLIGACIONES FINANCIERAS A LARGO PLAZO" pág. 6
```

```text
tools/caja-deuda.mjs (2026-10-17): cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Efectivo y equivalentes de efectivo 4.580.663 (miles de pesos) = caja 9.325 + cajas menores 3.072 + bancos 2.659.618 + ahorro 312.521 + fiduciarios 1.596.127. Certificados (CDT) 6.683.247 van aparte (inversiones), no se suman. Mismo valor en la nota 6 del documento de 2025. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

## 2023

### Ingresos

_antes de la fila 11 (`Otros ingresos no operacionales (recuperaciones, indemnizaciones, diversos, subvenciones)`):_

```text
$1.269,498 M = total impreso de "Ingresos No Operacionales" ($4.825,342 M) menos el
componente "Financieros" ($3.555,844 M, va a netInterest).
```

### Gastos

_antes de la fila 7 (`Gastos de Ventas: Diversos y provisiones`):_

```text
$1.465,237 M = Provisiones ($11,165 M) + total impreso de "Diversos" ($1.454,072 M).
```

_antes de la fila 8 (`Gastos de Administración (personal, honorarios, diversos, viaje, arrendamientos, servicios, legales, mantenimiento)`):_

```text
Nota 22 "Gastos de Administración" ($1.345,945 M impreso; mi propia suma de sub-ítems da
$1.345,397 M, $548 M de diferencia sin explicar en el documento -- se usa el total impreso).
```

### Meta

```text
Financieros (Nota 24, ingreso $3.555,844 M) - Gastos Financieros (dentro de Nota 25, $8.762,141 M).
tax: RESIDUO (mismo método que 2024/2025 -- la Nota 25/26/27 tampoco reconcilia limpio este
año). pretax línea por línea = -$295,850 M. officialPAT confirmado (Cuenta de Patrimonio) =
-$1.287,531 M. tax = -1.287,531 - (-295,850) = -991,681.
```

_al lado del campo `grossDebt`:_

```text
no verificado esta sesión, mismo alcance que los demás onboardings de esta ronda
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Obligaciones financieras corto plazo 0 + largo plazo 0 (Nota 10 y obligaciones a largo plazo: 'A la fecha no hay obligaciones'). Solo notas, sin total de pasivo para confirmar que no hay otra fila financiera; notas dicen que el anticipo de Dimayor 137.188 (2022) ya fue cancelado. (valor en la escala del documento, miles: el ajuste se multiplica por ella); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Efectivo y equivalentes de efectivo 7.063.322 (miles de pesos). Coincide con la columna 2023 del documento de 2024. (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

## 2022

### Ingresos

_antes de la fila 13 (`Otros ingresos no operacionales (recuperaciones, indemnizaciones, diversos, subvenciones)`):_

```text
$214,305 M = total impreso de "Ingresos No Operacionales" ($6.112,155 M) menos el componente
"Financieros" ($5.897,850 M, va a netInterest).
```

### Gastos

_antes de la fila 7 (`Gastos de Ventas: Diversos y provisiones`):_

```text
$1.481,810 M = Provisiones ($30,574 M) + total impreso de "Diversos" ($1.451,236 M).
```

_antes de la fila 8 (`Gastos de Administración (personal, honorarios, diversos, viaje, arrendamientos, servicios, legales, mantenimiento)`):_

```text
Nota 22 "Gastos de Administración" ($2.309,739 M impreso; mi propia suma de sub-ítems da
$2.309,240 M, $499 M de diferencia sin explicar en el documento -- se usa el total impreso).
```

### Meta

```text
El documento NO declara su propio TC de cierre (a diferencia de 2024) -- TRM oficial al
31/12/2022 vía tools/lookup-fx-close.js, agregada a data/currency-map.js FX_CLOSE.
Financieros (Nota 24, ingreso $5.897,850 M) - Gastos Financieros (dentro de Nota 25, $1.188,649 M).
tax: RESIDUO (mismo método que 2024/2025) -- pero ACÁ reconcilia EXACTO contra los componentes
que el documento SÍ separa: Gastos Extraordinarios (Nota 25, $746,016 M) + Impuesto Diferido
(Nota 26, $610,063 M) + Impuesto de Renta (Nota 27, $2.712,140 M) = $4.068,219 M, coincide
centavo a centavo con el residuo (PAT confirmado $26.972,965 M menos pretax línea por línea
$31.041,184 M).
```

_al lado del campo `grossDebt`:_

```text
no verificado esta sesión, mismo alcance que 2024
```

```text
tools/caja-deuda.mjs (2026-10-17): grossDebt escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Obligaciones financieras corto plazo 137.188 (Nota 10, obligación vía Dimayor) + largo plazo 0. Miles de pesos; el documento son notas, no el balance. Las cuentas por pagar (derechos deportivos, participación en venta de jugadores 10.149.950) y fiscales no se cuentan. (valor en la escala del documento, miles: el ajuste se multiplica por ella); cash escalón 0 (compuerta: ajuste manual): ajuste manual (2026-10-17): Claude 2026-10-17 (leído en el balance por subagente Sonnet, criterio de deuda financiera): Efectivo y equivalentes 1.265.570 (miles de pesos) = caja general 47.675 + cajas menores 3.072 + bancos 403.457 + ahorro 295.089 + derechos fiduciarios 516.276. Cifras en miles de pesos (nota del documento). (valor en la escala del documento, miles: el ajuste se multiplica por ella)
```

## Gestiones

_investigado por un subagente (Sonnet) con fuente por gestión, 2026-10-13; to-do 195:_

```text
Tulio Mario Castrillón (2016-01-01 a 2024-10-01): Inicio: solo año, 2016 (La Patria citando una resolución de la SIC: presidente 'entre 2016 a octubre de 2024'; el club habla de 'los últimos ocho años'), por eso día/mes 01. Salida: Claro Sports 01/10/2024, renunció 'el día de hoy' ante la junta; consistente con el tuit de Pipe Sierra ('hasta este martes'). Firmó como Representante Legal las certificaciones de 2022 y 2023 (Clubes/Colombia/Once Caldas/).
SIN CONFIRMAR, no cargada: Daniel Jaramillo (2024-10-01 a hoy), https://www.lapatria.com/deportes/este-es-el-ejecutivo-que-asumira-la-presidencia-del-once-caldas-en-reemplazo-de-castrillon: La Patria (09/10/2024): reemplaza a Castrillón (yerno de Jaime Pineda, máximo accionista); no da el día de asunción efectiva, solo que 'es o será' el presidente. Se usa 2024-10-01 como aproximado (sin hueco con la salida de Castrillón): confirmada=false por eso. Firma como Representante Legal las certificaciones de 2024 y 2025 (Daniel Jaramillo Vélez). Sigue presidente en octubre 2026 (Publimetro, Infobae).
Duda: Fecha exacta de asunción de Jaramillo (entre 2024-10-01 y 2024-10-09).
Duda: Entre la renuncia y la llegada de Jaramillo la junta directiva decidía el día a día, según el comunicado del club.
```

_investigado por un subagente con fuente por gestión (Admin/gestiones-por-pais/tanda-2026-10-18/resultado-8.json, tools/gestiones-tanda.mjs, 2026-10-18):_

```text
Daniel Jaramillo Vélez (2024-10-01 a hoy): Reemplazó a Tulio Mario Castrillón, que renunció el 01/10/2024 (Claro Sports, ya cargado). La Patria (09/10/2024, https://www.lapatria.com/deportes/este-es-el-ejecutivo-que-asumira-la-presidencia-del-once-caldas-en-reemplazo-de-castrillon) anunció que 'es o será' el presidente; La Patria (21/10/2024, fuente de la gestión) ya dice que fue nombrado interinamente en reemplazo de Castrillón; La Veintitrés (09/10/2024) lo ubica al frente 'desde la próxima semana'. Ninguna fuente da el día exacto de la posesión: se usa día 01 del mes de la salida de Castrillón (sin hueco entre gestiones) y el dato solo es aproximado en el día; los cierres 2024-12-31 y 2025-12-31 caen igual dentro de su gestión con cualquier día de octubre de 2024. Sigue presidente en octubre de 2026 (Publimetro 15/10/2026). Los balances lo corroboran: firma como Representante Legal la certificación 2024 (Clubes/Colombia/Once Caldas/certificacion-ef-2024.md:17, fechada el 28/04/2025) y la 2025 (certificacion-ef-2025.md:38; opinión de BDO del 11/03/2026), y figura en estados-financieros-2024.md:481 y estados-financieros-2025.md:2144. Sin cambio de gestión entre cierre y aprobación.
Duda: Fecha exacta (día) de la asunción de Daniel Jaramillo en octubre de 2024: ninguna nota de prensa la da. Pregunta para el club: ¿en qué fecha tomó posesión como presidente y representante legal?
```

## 2018

### Ingresos

```text
2018: cargado por tools/cargar.mjs (2026-10-25) desde Clubes/Colombia/Once Caldas/estados-financieros-2018.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Once Caldas/estados-financieros-2018.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | INGRESOS OPERATIVOS: | pág. 17, Jev 0.99 |
| 2 | INGRESOS NO OPERACIONALES : | pág. 20, Jev 0.98 |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | COSTO DE VENTAS | pág. 18, Claude 0.8 |
| 2 | GASTOS DE PERSONAL | pág. 18, Claude 0.85 |
| 3 | HONORARIOS | pág. 18, Claude 0.85 |
| 4 | ARRENDAMIENTOS | pág. 18, Claude 0.8 |
| 5 | SERVICIOS | pág. 18, Jev 0.91 |
| 6 | GASTOS LEGALES | pág. 18, Jev 0.99 |
| 7 | MANTENIMIENTO Y REPARACIONES | pág. 18, Claude 0.8 |
| 8 | ADECUACION E INSTALACION | pág. 18, ? 0.75 |
| 9 | GASTOS DE VIAJE | pág. 18, Jev 1 |
| 10 | DEPRECIACIONES | pág. 18, Jev 1 |
| 11 | DIVERSOS | pág. 18, precedente |
| 12 | HONORARIOS | pág. 18, Claude 0.85 |
| 13 | IMPUESTOS | pág. 18, Jev 0.98 |
| 14 | ARRENDAMIENTOS | pág. 18, Claude 0.8 |
| 15 | CONTRIBUCIONES Y AFILIACIONES | pág. 18, Jev 0.96 |
| 16 | SEGUROS | pág. 18, Claude 0.85 |
| 17 | SERVICIOS | pág. 19, Jev 0.91 |
| 18 | GASTOS LEGALES | pág. 19, Jev 0.99 |
| 19 | MANTENIMIENTO Y REPARACIONES | pág. 19, Claude 0.8 |
| 20 | ADECUACION E INSTALACION | pág. 19, ? 0.75 |
| 21 | GASTOS DE VIAJE | pág. 19, Jev 1 |
| 22 | DEPRECIACIONES | pág. 19, Jev 1 |
| 23 | DERECHOS DEPORTIVOS | pág. 19, Jev 0.98 |
| 24 | DIVERSOS | pág. 19, precedente |
| 25 | PROVISIONES | pág. 19, ? 0.7 |
| 26 | GASTOS FINANCIEROS | pág. 20, Jev 0.95 |
| 27 | GASTOS EXTRAORDINARIOS | pág. 20, Jev 1 |
| 28 | GASTOS DIVERSOS | pág. 20, Jev 0.97 |
| 29 | GASTOS DE PERSONAL (gastos de ventas) | pág. ?, precedente |

### Meta

```text
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-25): perimetro = individual. El club carga individual (2022 a 2025); el .md de 2018 solo menciona los consolidados de pasada. Claude 2026-10-25 (sesion), prueba del 455
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-25): fila = 1744.104. Linea 702 del .md: impuesto diferido NIIF 1.744.104 (miles de pesos), impreso debajo de la tabla de gastos no operacionales y fuera de su total; sin esta fila el resultado no cierra con la utilidad impresa del patrimonio (24.603.263 - 16.617.122 - 895.818 - 1.744.104 = 5.346.219 contra 5.346.221)
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-25): fila = 6866.963. Linea 620 del .md: el GASTOS DE PERSONAL de la nota de gastos de ventas (6.866.963 miles) es la nomina de la actividad deportiva del club (el de administracion, 678.948, va aparte); se rotula distinto para categorizarlos distinto, como en Fortaleza 2023
2018: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-25): categoria = wages_squad. Nomina de la actividad deportiva en los gastos de ventas; la respuesta de la cola (188e0fe) dice que los salarios del plantel estan en esa linea y no hay cuadro que los abra
tools/cargar.mjs (2026-10-25). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2022, 2023, 2024, 2025)
```

## 2016

### Ingresos

```text
2016: cargado por tools/cargar.mjs (2026-10-26) desde Clubes/Colombia/Once Caldas/siis-estado-2016.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
Generados/Colombia/Once Caldas/siis-estado-2016.categorias.json (escalón de cada fila en la tabla). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
```

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Ingresos de actividades ordinarias | pág. 1, Jev 0.98 |
| 2 | Otros ingresos | pág. 1, precedente |

### Gastos

| Fila | Rubro | Nota |
|---|---|---|
| 1 | Costo de ventas | pág. 1, precedente |
| 2 | Gastos de ventas | pág. 1, Claude 0.8 |
| 3 | GASTOS DE PERSONAL | pág. 1, precedente |
| 4 | HONORARIOS | pág. 1, precedente |
| 5 | IMPUESTOS | pág. 1, Jev 0.98 |
| 6 | ARRENDAMIENTOS | pág. 1, precedente |
| 7 | SEGUROS | pág. 1, Claude 0.92 |
| 8 | SERVICIOS | pág. 1, precedente |
| 9 | GASTOS LEGALES | pág. 1, precedente |
| 10 | MANTENIMIENTO Y REPARACIONES | pág. 1, precedente |
| 11 | ADECUACION E INSTALACION | pág. 1, precedente |
| 12 | GASTOS DE VIAJE | pág. 1, precedente |
| 13 | DEPRECIACIONES | pág. 1, precedente |
| 14 | DIVERSOS | pág. 1, precedente |
| 15 | Otros gastos | pág. 1, precedente |

### Meta

```text
2016: AJUSTE MANUAL (Admin/registros/ajustes-manuales.jsonl, Claude 2026-10-26): filas-a-mano. Claude 2026-10-26 (tokens de sesión): ubicación y filas armadas a mano desde el .md con tools/armar-a-mano.mjs
tools/cargar.mjs (2026-10-26). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"), con su tipo; la página marca «s/d» en las categorías que esa línea esconde y explica el caso en «Notas sobre este club».
```

```text
tools/dentro-de-otro.mjs (2026-10-26): posiblemente dentro de otro rubro, por precedente del club (la fila tiene plata en sus balances desglosados 2018, 2022, 2023, 2024, 2025)
```

## Fuentes

### oncecaldas-co-estados-financieros-2023

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890.801.447-5). Único ejercicio con PÉRDIDA de los 4 cargados de este club (-$1.287,531 M). PAT confirmado en la Cuenta de Patrimonio ("Utilidad o pérdida del ejercicio"). Transcripción completa en Clubes/Colombia/Once Caldas/estados-financieros-2023.md.
```

### oncecaldas-co-estados-financieros-2022

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890.801.447-5). PAT confirmado en la Cuenta de Patrimonio ("Utilidad o pérdida del ejercicio"). Transcripción completa en Clubes/Colombia/Once Caldas/estados-financieros-2022.md.
```

### oncecaldas-co-estados-financieros-2024

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890.801.447-5). El dictamen del revisor fiscal 2024 es una opinión limpia sin narrar la cifra de resultado (a diferencia del de 2025) -- el PAT ($4.112,260 M COP) sale confirmado de una sola fuente (Cuenta de Patrimonio, fila "Utilidad o pérdida del ejercicio"), no triple como 2025. Transcripción completa en Clubes/Colombia/Once Caldas/estados-financieros-2024.md.
```

### oncecaldas-co-estados-financieros-2025

_note (data/):_

```text
Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890.801.447-5). El PDF trae las notas completas a los estados financieros (34 páginas, texto real) pero NO el Estado de Situación Financiera/Estado de Resultado Integral primario como tabla aparte — el resultado del ejercicio ($9.138,546 M COP) se confirma triple: tabla de indicadores de negocio en marcha (Nota 2), narrativa del Informe del Revisor Fiscal, y la vista SIIS. La compañía sigue en proceso de reorganización empresarial (Superintendencia de Sociedades, desde agosto de 2012), aunque el ejercicio 2025 dio utilidad. Transcripción completa en Clubes/Colombia/Once Caldas/estados-financieros-2025.md.
```

### oncecaldas-co-estados-financieros-2018

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-25) desde la transcripción Clubes/Colombia/Once Caldas/estados-financieros-2018.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

### oncecaldas-co-siis-estado-2016

_note (cargar.mjs):_

```text
Cargado por tools/cargar.mjs (2026-10-26) desde la transcripción Clubes/Colombia/Once Caldas/siis-estado-2016.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.
```

## Otros

### oncecaldasPasesData

```text
Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
club (fuera de alcance de esta sesión, que se enfocó en Finanzas del Ejercicio 2025 — ver
Admin/CHANGELOG.md). Arrays vacíos en vez de placeholders inventados.
```

### gestionesByClub.oncecaldas

```text
gestionesByClub: no se pudo confirmar con confianza una "gestión"/presidencia en el sentido
argentino del término (Once Caldas S.A. es una sociedad anónima con Representante Legal, no un
club asociativo con presidente electo) — se agrega UNA entrada genérica "Gestión actual" (no un
nombre propio, para no publicar una atribución que no se confirmó) solo para que el selector "Por
gestión" de Finanzas tenga al menos 1 opción y no rompa (ver club-data-mapping SKILL.md sección 7:
"mejor un año sin gestión asignada que una gestión inventada" — acá se optó por una etiqueta
neutra en vez de dejar el objeto vacío, que sí rompía el selector para cualquier club sin ninguna
entrada).
```

2026-10-15 (to-do 232 ab): 2023 (deuda y caja), 2022 (deuda y caja), 2024 (deuda y caja), 2025 (deuda y caja): de 0 a null. Estaban en 0 por la convención vieja ("0 = no se cargó"); sin dato no es cero. Los completa tools/caja-deuda.mjs si el documento los trae.
