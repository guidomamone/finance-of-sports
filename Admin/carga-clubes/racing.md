# racing — evidencia de carga

Lo que había como comentario en `data/ar/racing-data.js`, movido tal cual por `tools/archivo/mover-comentarios-data.mjs` (la regla:
`Admin/CONVENCIONES-DATOS.md`, "data/<país>/<club>-data.js NO LLEVA COMENTARIOS"). Una sección por ejercicio; adentro, ingresos, gastos y
meta. Las notas de cada fila van en una tabla con su número de fila (hay nombres de rubro repetidos en un mismo año).

## Cabecera

```text
============================================================================
data/ar/racing-data.js — Racing Club: Milito (2024-actual) y Blanco (2013-2024).

Ejercicios 2024, 2025, 2026 y 2027 = REALES, del archivo oficial completo de
racingclub.com.ar/informes/ (~24 PDFs 2009-2027, guardados en
finance-of-sports/Clubes/Argentina/Racing/). A diferencia de Boca y River, estos PDFs
tienen texto extraíble directo (no son escaneos) — se procesaron con
pdftotext + Python, sin necesidad del Read tool con imágenes.

- Ejercicio 2021 (Ejercicio Nro. 119, irregular de 10 meses, 1°/9/2020 al 30/6/2021, transición
  del cierre de agosto a junio) = balance auditado real, sin presupuesto propio en el archivo.
  SUPERÁVIT real, chico: $7.012.082 ARS.
- Ejercicio 2024 (Ejercicio Nro. 122, 1°/7/2023 al 30/6/2024, última
  temporada de Blanco) = balance auditado real. DÉFICIT del ejercicio
  real: $(6.127.619.872) ARS — muy distinto del viejo placeholder que
  mostraba un superávit inventado.
- Ejercicio 2025 (Ejercicio Nro. 123, 1°/7/2024 al 30/6/2025) = balance
  auditado real, firmado por Diego Milito como Presidente — la mayor
  parte del ejercicio cae bajo su gestión (asumió 20/12/2024) así que se
  asignó completo a "milito", mismo criterio que ya se usa para
  resultados deportivos por fecha exacta. DÉFICIT real, mucho más chico:
  $(178.451.821) ARS.
- Ejercicio 2026 (Presupuesto 2025-26, 1°/7/2025 al 30/6/2026) = presupuesto
  oficial real (un presupuesto financiero de ingresos/egresos mensual con
  ~50 líneas).
- Ejercicio 2027 (Presupuesto 2026-27, 1°/7/2026 al 30/6/2027) = presupuesto
  oficial real, mismo formato que 2026 (ver presupuesto2026-27.md), cargado
  en la Versión 32. Todavía vigente (no cerró) a la fecha de esta carga.

CONVERSIÓN A USD (Versión 32 — REESCRITO): hasta la Versión 31, este archivo
guardaba amountNative YA CONVERTIDO a USD para 2024/2025/2026, y River/Racing
no tenían toggle USD/ARS (siempre mostraban USD). A partir de la Versión 32,
Racing sigue el mismo patrón que Boca: amountNative se guarda en ARS
MILLONES NATIVOS (tal cual el balance/presupuesto), y la conversión a USD
pasa al momento de renderizar (yearMetaFor('racing', year) + toDisplayValue,
igual que yearMeta/toDisplayValue de Boca) — nunca se guarda un valor
pre-convertido. Esto es lo que permite el toggle USD/ARS en vivo para
Racing (antes solo existía para Boca).

Tipo de cambio por ejercicio — REGLA NUEVA (Versión 32, ver también
finance-of-sports/.claude/skills/club-data-mapping/referencia/fx.md):
para un ejercicio CERRADO, si el propio balance declara su tipo de cambio
de cierre (buscar "Activos y pasivos en moneda extranjera" / Anexo con
columna "Tipo de Cambio" cerca de Caja y bancos en moneda extranjera), se
usa ESE valor declarado por el club, no una cotización externa investigada
a mano. Se encontró y corrigió una diferencia real: el balance 2023-24
(Anexo VI, pág. 30) declara $909,00 al 30/6/2024 (antes se usaba $912,
una cotización de Rava Bursátil buscada a mano); el balance 2024-25 (Anexo
VI, pág. 31) declara $1.196,00 al 30/6/2025 (antes $1.203). La diferencia
es chica pero la regla es más fiel a la fuente y evita mezclar el criterio
del club con una investigación externa cuando el documento ya lo dice.
- 2021 (Ejercicio N° 119, irregular de 10 meses): $95,52 (declarado, Anexo V del balance 2021,
  pág. 30), usado sin excepciones en TODO el Anexo (a diferencia del Anexo V de 2020, que tenía
  una inconsistencia puntual de 3 líneas en $74,18 vs. $73,98 dominante).
- 2024: $909,00 (declarado, Anexo VI del balance 2023-24, pág. 30).
- 2025: $1.196,00 (declarado, Anexo VI del balance 2024-25, pág. 31).
- 2026 (presupuesto, sin cerrar todavía): $1.438 promedio, que el propio
  presupuesto declara como premisa ("Tipo de Cambio: Se prevé un tipo de
  cambio promedio de $1.438 por dólar estadounidense").
- 2027 (presupuesto, sin cerrar): el propio presupuesto declara DOS puntos
  ("$1.505 para Julio 2026 y $1.870 para Junio 2027"), no un promedio
  único — se promedian esos dos valores ($1.687,5), mismo criterio que usa
  Boca para su Presupuesto 2027 (promedio inicio/cierre declarado).

IMPORTANTE — de qué columna del balance sale cada número (Versión 32): un
balance en "moneda homogénea" (RT 6) REEXPRESA el ejercicio comparativo
(el anterior) a la fecha de cierre del ejercicio ACTUAL cada vez que se
imprime un balance nuevo — por eso la columna "2024" que aparece DENTRO
del balance 2024-25 (como comparativo) NO es igual a la columna "2024" que
aparece como año corriente DENTRO del balance 2023-24 (están reexpresadas
a fechas de cierre distintas, 30/6/2025 vs. 30/6/2024). Para cargar un
ejercicio, hay que usar SIEMPRE la columna "año corriente" del balance DE
ESE MISMO ejercicio (nunca la columna comparativa de un balance posterior)
— si no, se mezclan dos poderes adquisitivos distintos sin darse cuenta.
Ya pasó acá: la columna "2024" del balance 2024-25 imprime $92.529.945.669
de recursos ordinarios, muy distinto de los $66.367.712.489 que imprime el
balance 2023-24 (su propio año corriente) — la primera cifra está
reexpresada a 30/6/2025, la segunda a 30/6/2024. Se usó siempre la
columna de año corriente del balance del ejercicio que se está cargando.

Racing NO separa "Préstamos"/deuda financiera del resto del pasivo en su
balance (a diferencia de Boca y River, que sí tienen una línea "Deudas"
o "Préstamos" propia) — el balance de Racing solo tiene Deudas
comerciales/sociales/fiscales/otras + Previsiones, todas juntas. Por eso
grossDebt acá es el TOTAL DEL PASIVO completo (Estado de situación
patrimonial, no la Anexo de moneda extranjera), no una deuda financiera
aislada — es lo más parecido a "deuda" que el documento ofrece, pero
hay que leerlo como "todo lo que Racing debe", no como préstamos bancarios.

"Costo transferencia de jugadores" y "Transferencia de jugadores" NO se
netean entre sí (a diferencia de Boca, donde el balance sí las separa
pero el sitio las junta en "Ganancia por venta de jugadores"): acá van
como dos líneas ordinarias más, exactamente como las presenta el propio
Estado de Recursos y Gastos de Racing (no hay una línea "ganancia neta
por pases" en el documento — meterlas dentro de Ingresos/Gastos tal cual
es más fiel al original que forzar un neteo que el club no hace).

LOS RESULTADOS DEPORTIVOS (más abajo) SÍ SON REALES, a diferencia de las
finanzas de Blanco: buscados y verificados vía web search en agosto de
2026. Ojo con el límite de fechas: la Copa Sudamericana 2024 se ganó el
23/11/2024, todavía bajo la presidencia de Blanco — Milito asumió recién
el 20/12/2024, casi un mes después. Ese título queda contado en la
gestión de Blanco, no en la de Milito (mismo criterio que ya se usó para
separar a Riquelme de Ameal en Boca).
============================================================================
Ejercicios 2009, 2010, 2011 (Ejercicios N° 107, 108, 109 — ciclo noviembre a octubre, distinto
del ciclo julio-junio que usa Racing desde años más recientes) = REALES, de los balances
auditados oficiales bajados de racingclub.com.ar/informes/. A diferencia de los ejercicios 2024
en adelante, estos PDFs tienen texto extraíble nativo — no hizo falta OCR. Balances 2012-2018
(y los presupuestos 2013-14/2015-16/2018-19/2019-20), en cambio, SÍ son escaneos sin capa de
texto (confirmado con pdftotext: ~1 char/página) — quedan pendientes de una extracción con el
Read tool sobre imágenes de página, mucho más cara en tokens, para una sesión futura.

OJO (Versión 32): a diferencia de 2024/2025/2026/2027, estos 3 años NO se re-extrajeron a ARS
nativo — Guido decidió explícitamente no re-hacer esta extracción para 2009-2011 (documentos de
una época sin moneda homogénea, y el propio balance NO declara un tipo de cambio propio como sí
hacen los balances modernos — ver más abajo). amountNative acá sigue en USD YA CONVERTIDO (como
estaba desde la Versión 20), y racingFiscalYearMeta guarda el mismo tipo de cambio ya usado para
esa conversión (documentado abajo) para que el toggle USD/ARS de todas formas funcione: al pasar
a ARS para estos 3 años, el sitio hace la cuenta inversa (USD × fx) — una reconstrucción
aproximada, no el ARS nativo real, pero consistente con la nota de "estimado, no exacto" que ya
tenían estos 3 años. Si en el futuro se re-extrae el ARS nativo real de estos 3 balances, este
campo pasa a currency:'ARS' con amountNative en ARS, igual que 2024 en adelante.

Conversión a USD: estos balances son de una época SIN moneda homogénea/reexpresión por
inflación (eso es una práctica de RT 6 que se generalizó recién con la crisis inflacionaria de
los 2020), así que se convirtieron directo a USD con el dólar mayorista de CIERRE de cada
ejercicio: $3,82 al 31/10/2009, $3,98 al 31/10/2010, $4,27 al 31/10/2011. OJO: para 2010 y 2011
no se encontró la cotización exacta del día (las fuentes consultadas no exponían el dato diario
para fechas tan viejas) — se interpoló linealmente entre los valores de apertura y cierre de
cada año calendario publicados por cotizacion-dolar.com.ar (2010: $3,82 en enero a $4,01 en
diciembre; 2011: $4,01 en enero a $4,32 en diciembre). Es una aproximación, no una cotización
exacta — para 2009 sí se encontró una cotización de fecha cercana real ($3,8475 el 2/10 y
$3,819 el 2/11, ambas del mismo mes que el cierre del ejercicio).

Verificación: para cada año, la suma de revenueLines + expenseLines + netInterest (ver
racingFiscalYearMeta) da el RESULTADO FINAL que imprime el propio balance, con una diferencia
de centésimas de millón de USD (ruido de la aproximación de tipo de cambio, no un error de
carga): 2009 computado 0.704 vs impreso 0.703; 2010 computado -2.439 vs impreso -2.441; 2011
computado 0.063 vs impreso 0.063 (exacto). Por esta inconsistencia entre años en cómo el propio
documento agrupa "Amortizaciones" y "Resultados Financieros" dentro de sus totales de Ingresos y
Gastos (a veces adentro de la tabla de Recursos/Gastos, a veces afuera), NO se agregaron checks
de Revenue/Expenses por separado a verifyTieOuts() para estos 3 años — el check de PAT de arriba
ya es una verificación real y suficiente de que ningún renglón se perdió o se contó dos veces.

"Resultados Financieros" (intereses + diferencias de cambio, ganados y perdidos) NO se cargó
como revenueLine/expenseLine: se llevó neto a `netInterest` en racingFiscalYearMeta, mismo
criterio que ya usan 2024/2025/2026/2027 para profitOnPlayerSales/assetSales/netInterest/tax.

Gestión: estos 3 ejercicios son ANTERIORES a la presidencia de Víctor Blanco (asumió recién en
septiembre de 2013). Racing venía de una `quiebra` y un fideicomiso ("Blanquiceleste S.A.",
2000-2008) que se disolvió en 2008 por otra bancarrota — el propio balance de 2009 tiene una
línea "Resultado Extraordinario s/Quiebra" que lo confirma. No se identificó con confianza quién
presidía Racing específicamente en 2009-2011 (hubo varias administraciones cortas en ese tramo),
así que estos 3 años se cargan SOLO en el selector "Año a año" (vía Object.keys de
racingFiscalYearMeta, automático) — no se les asignó gestionId ni se agregaron a
gestionesByClub.racing, para no inventar una atribución de gestión que no se pudo verificar.
```

## 2027

### Ingresos

```text
Fuente: presupuesto2026-27.md (Versión 32, carga nueva), misma tabla y misma estructura de
rubros que 2026 (el presupuesto no cambió de formato de un año a otro). Suma exacta a
$143.118.482.343, el TOTAL INGRESOS DE FONDOS DEL PERÍODO impreso.
```

_antes de la fila 1 (`Cobranzas por venta de entradas`):_

```text
Mismo criterio que 2026 (ver comentario ahí) — desde la Versión 38, líneas de primer nivel en
vez de sub-ítems de un bolsón "lump_football_operations".
```

_antes de la fila 11 (`Cobranzas de otras actividades deportivas`):_

```text
(Versión 550, to-do 101) los dos sub-ítems de "Ingresos de otras secciones" como líneas: el colegio es `education`, como 2009-2025.
```

### Gastos

```text
Fuente: presupuesto2026-27.md. Desde la Versión 38, "Egresos generados por fútbol" (grupo A) se
carga como 9 líneas de primer nivel (mismo motivo que 2026 y que el lado de ingresos — el
documento SÍ las separa, no es un bolsón). La suma de estas 9 líneas da EXACTO $105.550.110.665,
el mismo subtotal que imprime el documento para ese grupo — CORRECCIÓN a lo que decía este mismo
comentario hasta la Versión 32: se había afirmado una diferencia de $10.000 entre la suma de los
9 ítems y el total impreso ("redondeo del propio documento"), pero esa diferencia era un error
de suma manual de esta sesión, no algo real del documento — al promover los 9 ítems a líneas de
primer nivel y dejar que `computeYearGeneric` los sume de verdad (en vez de sumarlos a mano),
`verifyTieOuts()` confirmó que cierran exacto contra el TOTAL DE EGRESOS DE FONDOS DEL PERÍODO
impreso ($142.071.747.998), sin necesidad de ningún chequeo especial.
```

_antes de la fila 10 (`Pago de remuneraciones otras actividades deportivas`):_

```text
(Versión 550, to-do 101) los cuatro sub-ítems de "Egresos de otras secciones" como líneas: el colegio es `education_expense`, como 2009-2018.
```

### Meta

```text
Nuevo en la Versión 32. fx = promedio de los dos puntos que declara el propio presupuesto
como premisa ("$1.505 para Julio 2026 y $1.870 para Junio 2027") = $1.687,5 — mismo criterio
que usa Boca para su Presupuesto 2027 (promedio inicio/cierre declarado por el documento).
```

## 2026

### Ingresos

```text
Fuente: racing-presupuesto-2025-26.md, tabla "PRESUPUESTO FINANCIERO DE INGRESOS Y EGRESOS"
(columna TOTAL PERÍODO). Suma exacta a $123.297.209.473, el TOTAL INGRESOS DE FONDOS DEL
PERÍODO impreso.
```

_antes de la fila 1 (`Cobranzas por venta de entradas`):_

```text
"Ingresos provenientes de fútbol" (encabezado de grupo A del documento) NO es un bolsón sin
desglosar — el propio presupuesto separa estas 9 líneas numeradas (1 a 9) con nombre y monto
propio cada una. Hasta la Versión 38 se cargaban como sub-ítems (`items`) de una única línea
`lump_football_operations`, lo que las escondía de cualquier cálculo por `normalizedCategory`
(incluida "Formato simplificado": Televisión/Comercial/Venta de jugadores daban 0 porque la
plata estaba enterrada adentro del bolsón — bug real reportado por Guido, que abrió el PDF y
vio la línea "COBROS POR RETRANSMISION Y DERECHOS DE TV" con monto propio). Se promovieron a
líneas de primer nivel, cada una con su categoría real — ver
`.claude/skills/club-data-mapping/SKILL.md`, sección 1, tabla de mapeos.
```

_antes de la fila 11 (`Cobranzas de otras actividades deportivas`):_

```text
(Versión 550, to-do 101) los dos sub-ítems de "Ingresos de otras secciones" como líneas: el colegio es `education`, como 2009-2025.
```

### Gastos

```text
Fuente: racing-presupuesto-2025-26.md, columna TOTAL PERÍODO. Suma exacta a
$(126.860.457.441), el TOTAL DE EGRESOS DE FONDOS DEL PERÍODO impreso.
```

_antes de la fila 1 (`Pago de gastos explotación del estadio`):_

```text
"Egresos generados por fútbol" (grupo A): mismo caso que el lado de ingresos — el documento
separa estas 9 líneas con nombre y monto propio, no es un bolsón sin desglosar. Desde la
Versión 38, líneas de primer nivel (antes eran sub-ítems de `lump_football_operations_expense`,
lo que dejaba "Salarios del plantel" en $0 en Formato simplificado — mismo bug que el de
ingresos, encontrado al revisar el reporte de Guido).
```

_antes de la fila 10 (`Pago de remuneraciones otras actividades deportivas`):_

```text
(Versión 550, to-do 101) los cuatro sub-ítems de "Egresos de otras secciones" como líneas: el colegio es `education_expense`, como 2009-2018.
```

### Presupuesto financiero

```text
Movido desde js/finanzas-render.js en la Versión 135: eran datos de un club viviendo en la
capa de render. El presupuesto de Racing YA está armado en base de caja desde el origen (sus
líneas dicen "Cobranzas por...", "Pago de..."), así que su waterfall es más simple que el de
Boca: no tiene las filas de créditos y deudas del ejercicio anterior, porque el documento no
tiene ese concepto para reconciliar. No es un descuido, es fiel a la fuente.
```

### Presupuesto de inversiones

```text
Ídem: movido desde el render. Racing agrupa todas sus inversiones en una sola línea de
egresos extraordinarios, sin desglosar por obra como sí hace Boca, así que acá no hay
`groups`: solo el total y la nota que explica por qué no hay más detalle.
```

### Supuestos del presupuesto

```text
Ídem Boca: movido desde js/finanzas-render.js en la Versión 135.
```

## 2025

### Ingresos

```text
Fuente: racing-balance-2024-25.md, Anexo III (columna "2025", año corriente de ESE balance,
pág. 29) — suma exacta a $87.399.617.009, el TOTAL DE RECURSOS ORDINARIOS impreso.
```

### Gastos

```text
Fuente: racing-balance-2024-25.md, Anexo IV (columna "2025", año corriente de ESE balance,
pág. 29) + Estado de recursos y gastos (pág. 3). Suma exacta a $(67.228.067.867) de gastos
ordinarios; con las dos líneas no-cash de abajo, cierra exacto contra el DÉFICIT DEL EJERCICIO
impreso ($(178.451.821)) — ver verifyTieOuts().
```

### Meta

```text
Mismo criterio que 2024: TOTAL DEL PASIVO / Caja y bancos del Estado de situación patrimonial
(pág. 2 del balance 2024-25, columna 30/06/2025); netInterest del Estado de recursos y gastos
(pág. 3, columna 2025).
```

## 2024

### Ingresos

```text
2024 en adelante: amountNative en ARS MILLONES NATIVOS (Versión 32 — ver comentario de cabecera).
Fuente: racing-balance-2023-24.md, Anexo III "Recursos ordinarios" (columna "2024", año
corriente de ESE balance, pág. 27) — suma exacta a $66.367.712.489, el TOTAL DE RECURSOS
ORDINARIOS impreso del Estado de recursos y gastos de ese mismo balance.
```

### Gastos

```text
Fuente: racing-balance-2023-24.md, Anexo IV "Gastos ordinarios" (columna "2024", año corriente
de ESE balance, pág. 28) + Estado de recursos y gastos (Depreciaciones/Previsiones, pág. 3).
Suma exacta a $(55.847.189.733) de gastos ordinarios; con las dos líneas no-cash de abajo,
cierra exacto contra el DÉFICIT DEL EJERCICIO impreso ($(6.127.619.872)) — ver verifyTieOuts().
```

### Meta

```text
grossDebt = TOTAL DEL PASIVO (Estado de situación patrimonial, pág. 2 del balance 2023-24,
columna 30/06/2024). cash = Caja y bancos (misma página). netInterest = "Resultados
Financieros y por tenencia (Incluyendo el R.E.C.P.A.M.)" del Estado de recursos y gastos,
columna 2024 (pág. 3).
officialTotalRevenue = TOTAL DE RECURSOS ORDINARIOS impreso ($66.367.712.489). officialTotalExpenses
= Total de Gastos Ordinarios impreso ($55.847.189.733) + Depreciaciones ($2.488.762.976) +
Previsiones/Amortizaciones intangibles ($20.832.011.983), porque esas dos últimas se cargaron
como líneas de expenseLines (no como meta) — ver verifyTieOuts. Todo en ARS millones (Versión 32).
```

## 2021

### Ingresos

```text
Ejercicio 2020/2021 (Ejercicio N° 119, irregular de 10 meses: 1°/9/2020 al 30/6/2021, gestión
Blanco) — ejercicio de transición para pasar el cierre de agosto a junio (ver comentario de
racingRevenueLinesByYear[2020] y racing-balance-2019-20.md, Nota 5). No tiene presupuesto propio
en el archivo de Racing (`balance2021.pdf` es el único documento de este ejercicio), así que
queda como `official_balance_sheet` simple, no `official_budget_and_balance`. Fuente:
racing-balance-2021.md, Anexo II "Recursos ordinarios" (columna "2021", año corriente de ESE
balance, pág. 27) — mismos rubros exactos que 2019/2020 (mismo formato de documento, ver
`club-or-year-onboarding/SKILL.md` sección 9), suma exacta a $3.335.562.848, el TOTAL DE
RECURSOS ORDINARIOS impreso. "Otros Torneos" se carga en $0 (el documento la lista con "-" este
ejercicio, a diferencia de 2020 que sí tuvo monto) — se mantiene la fila por fidelidad a la
fuente, no se omite un rubro real solo porque dio cero este año puntual.
```

### Gastos

```text
Ejercicio 2020/2021 (ver comentario completo junto a racingRevenueLinesByYear[2021] más arriba).
Fuente: racing-balance-2021.md, Anexo III "Detalle de gastos" (columna "2021", pág. 28) +
Estado de recursos y gastos (Depreciaciones/Previsiones, pág. 5). Suma exacta a
$(2.348.405.480) de gastos ordinarios; con las dos líneas no-cash de abajo, cierra exacto
($(3.404.446.864) + netInterest 75.896098 + revenue 3335.562848 = 7.012082, el SUPERÁVIT
impreso) — ver verifyTieOuts().
```

### Meta

```text
Ejercicio 2020/2021 (Ejercicio N° 119, irregular de 10 meses: 1°/9/2020 al 30/6/2021, gestión
Blanco, ver comentario completo junto a racingRevenueLinesByYear[2021]). fx = 95,52, declarado
en el Anexo V "Activos y pasivos en moneda extranjera" (pág. 30 del balance), tipo de cambio
USD al 30/06/2021, usado de forma consistente en TODO el Anexo (Caja, bancos, divisas en
custodia, créditos por venta de jugadores en USD), sin la inconsistencia puntual que sí tuvo el
Anexo V del ejercicio anterior. `official_balance_sheet` simple (no `official_budget_and_balance`
como 2020): el archivo de Racing no tiene un presupuesto propio de este ejercicio de transición.
grossDebt = TOTAL DEL PASIVO (Estado de situación patrimonial, pág. 4, columna 30/06/2021).
cash = Caja y bancos (misma página). netInterest = "Resultados Financieros y por tenencia
(Incluyendo el R.E.C.P.A.M.)" del Estado de recursos y gastos (pág. 5, columna 2021).
```

## 2020

### Ingresos

```text
Ejercicio 2019/2020 (Ejercicio N° 118, 1°/9/2019 al 31/8/2020, gestión Blanco) — cargado en la
Versión 58, primer paso del onboarding masivo del archivo de Racing (ver to-do). amountNative
en ARS MILLONES NATIVOS, mismo criterio que 2024 en adelante. Fuente:
racing-balance-2019-20.md, Anexo II "Recursos ordinarios" (columna "2020", año corriente de ESE
balance, pág. 27) — suma exacta a $2.436.102.976, el TOTAL DE RECURSOS ORDINARIOS impreso del
Estado de recursos y gastos de ese mismo balance. Es el ÚLTIMO ejercicio de Racing con cierre a
agosto (el 18/12/2019 la Asamblea aprobó pasar el cierre a 30 de junio, ver Nota 5 del balance;
el ejercicio siguiente, 2020/2021, es un ejercicio irregular de transición, balance2021.pdf).
```

### Gastos

```text
Ejercicio 2019/2020 (ver comentario completo junto a racingRevenueLinesByYear[2020] más arriba).
Fuente: racing-balance-2019-20.md, Anexo III "Detalle de gastos" (columna "2020", pág. 28) +
Estado de recursos y gastos (Depreciaciones/Previsiones, pág. 4). Suma exacta a
$(2.100.483.040) de gastos ordinarios; con las dos líneas no-cash de abajo, cierra exacto
($(2.940.733.186) + netInterest 227.570.638 + revenue 2436.102976 = -277.059572, el RESULTADO
(DÉFICIT) impreso) — ver verifyTieOuts().
```

### Meta

```text
Ejercicio 2019/2020 (Ejercicio N° 118, ver comentario completo junto a racingRevenueLinesByYear
[2020]). fx = 73,98, declarado en el Anexo V "Activos y pasivos en moneda extranjera" (pág. 30
del balance), tipo de cambio USD al 31/08/2020 (regla #1 del skill: usar el que declara el
propio documento). OJO: 3 líneas sueltas de "Otras deudas" (pasivo) en ese mismo Anexo V usan
$74,18 en vez de $73,98, una inconsistencia real del propio documento (¿fecha de registración
distinta?), no se investigó más porque son ~$2M ARS del total, se usó el tipo de cambio
dominante (73,98, usado en absolutamente todo el resto del Anexo).
reportType 'official_budget_and_balance' (Versión 58, primer ejercicio del sitio que lo usa):
este balance real convive con `racingPresupuestoOverlayByYear[2020]` (mismo ejercicio,
1°/9/2019 al 31/8/2020). El balance sigue siendo el dato PRIMARIO (KPIs/Formato Simplificado/
verifyTieOuts salen de acá, sin cambios); el presupuesto es la columna "Presupuesto" de
comparación en "Estado de resultados" (ver `.claude/skills/club-or-year-onboarding/SKILL.md`
sección 7).
grossDebt = TOTAL DEL PASIVO (Estado de situación patrimonial, pág. 3, columna 31/08/2020).
cash = Caja y bancos (misma página). netInterest = "Resultados financieros y por tenencia
(incluyendo el RECPAM)" del Estado de recursos y gastos (pág. 4, columna 2020).
assetSales = "Ingresos Terreno Tita Mattiussi" (Nota 10): $0 este ejercicio (fue un ingreso
único del ejercicio ANTERIOR, 2018/2019, todavía no cargado en el sitio), se deja el campo
documentado para cuando se cargue ese ejercicio (columna comparativa del balance: 738,941791
M, pero esa cifra pertenece al año 2019, no se puede usar acá sin re-extraer del balance de
ESE ejercicio, ver skill sección 6.5).
```

### Presupuesto al lado del balance

_dentro de revenueLines:_

```text
(Versión 550, to-do 101) los dos sub-ítems de "Ingresos de otras secciones" como líneas: el colegio es `education`, como 2009-2025.
```

```text
Suma de las 13 líneas de arriba = 3.127,619050 M = TOTAL INGRESOS DE FONDOS DEL PERÍODO
impreso EXACTO. Corregido en la Versión 60: hasta entonces esta línea (SUBTOTAL INGRESOS
EXTRAORDINARIOS, "Cobros por venta de inversiones financieras") se dejaba afuera a propósito
(mismo criterio que netInterest en el resto del sitio), pero eso generaba una ASIMETRÍA con
expenseLines de abajo, que SÍ incluye su análogo ("Egresos extraordinarios") como línea normal
— el resultado propio del overlay (ingresos - gastos) no cerraba contra el superávit/déficit
presupuestado real. Se cargó como línea normal (`other_income`) para que las 2 columnas usen
el mismo criterio y el Resultado Neto de la columna Presupuesto en "Estado de resultados"
(Versión 60) sea el número real, no un cálculo incompleto.
```

_dentro de expenseLines:_

```text
(Versión 550, to-do 101) los cuatro sub-ítems de "Egresos de otras secciones" como líneas: el colegio es `education_expense`, como 2009-2018.
```

```text
Suma de las 11 líneas de arriba = -2.977,502048 M = TOTAL DE EGRESOS DE FONDOS DEL PERÍODO
impreso EXACTO (a diferencia de Ingresos, acá no queda ningún resto: Egresos extraordinarios
sí se cargó como línea, ya que es CAPEX/pago de deuda real, no un resultado financiero neto).
"Pago por préstamos de jugadores" (línea 7 del documento) y "Pago de gastos fútbol amateur
(operativo)" (línea 9) dan $0 este ejercicio, no se cargaron como líneas propias (no hay nada
que perder documentando un cero real, pero se listan acá para que quede registrado que existen
en el documento por si un ejercicio futuro las usa con monto real): ambas irían a
`player_amortisation` y `youth_other_sports_expense` respectivamente, mismo criterio que sus
pares "activable"/"adquisición" ya cargadas.
```

## 2019

### Ingresos

```text
Ejercicio 2018/2019 (1°/9/2018 al 31/8/2019, gestión Blanco) — `presupuesto2018-19.pdf`,
PRESUPUESTO-ONLY (sin balance real cargado todavía para este ejercicio en el archivo de Racing,
`balance2018-19.pdf` no existe/no se encontró; `reportType:'official_budget'` simple en
`racingFiscalYearMeta[2019]`, no `official_budget_and_balance`). Escaneo puro (9 páginas, ~1
char/página), transcripto con el Read tool sobre imágenes de página — sin inclinación en
ninguna de las 9 (verificado renderizando cada una a 150 DPI antes de leer el resto), pero las
2 páginas de tabla (Ingresos/Egresos) están en landscape rotado 90° dentro de la página
portrait, hubo que rotar la imagen 90° (PIL) para leerlas en orientación normal. Mismo formato
de documento y mismos rubros que `racingPresupuestoOverlayByYear[2018]` (presupuesto
2017/2018, el ejercicio inmediato anterior) — mismo criterio de categorización, sin decisiones
nuevas. fx=40, la premisa macro que el propio documento declara ("Estimamos un TC de $ 40.- por
u$d 1.- en promedio para el período", pág. 2). Fuente completa:
`Clubes/Argentina/Racing/racing-presupuesto-2018-19.md`.

Suma exacta a $1.616.026.650, el "TOTAL DE INGRESOS DE FDOS" impreso (pese a su etiqueta
confusa "(I)+(II)+(III)": el total NO incluye el Saldo Inicial de Caja (I), solo Ordinarios
(II) + Extraordinarios (III) — mismo comentario ya documentado para
`racingPresupuestoOverlayByYear[2018]`). Filas en $0 del documento (f./g. "Otros Ingresos por
derechos de fútbol"/"Dep. Futbol Prof.", "Cobranzas de Subvenciones a la Explotación", c. "Otros
Ingresos de Gestión por Futbol", y a./b./c./e./f./h. de Ingresos Extraordinarios) no se cargaron
como líneas propias, mismo criterio que el resto del sitio para un valor real en cero.
```

### Gastos

```text
Ejercicio 2018/2019 (ver comentario completo junto a racingRevenueLinesByYear[2019] más arriba).
Fuente: `Clubes/Argentina/Racing/racing-presupuesto-2018-19.md`, página 9 (columna "Total del
Período"). Suma exacta a $(1.756.652.573), el "TOTAL DE EGRESOS DE FDOS (IV)+(V)" impreso.
"Pago por compra de Activos Intangibles" (-415.333.333, la compra de jugadores de este
ejercicio) va a `player_amortisation`, mismo criterio que "Pago por adquisición de jugadores"
en 2020 y "Cancelación Efectiva por Compra de Jugadores" en el overlay 2018 — no se excluye
como si fuera puro movimiento de balance. Filas en $0 del documento (d. "Participación en
Otras Comp. y Partidos Amistosos", b. "Subvenciones a Otras Entidades Deportivas", a. "Comisión
Directiva", 3. "Otros Pagos por egresos extraord.", b. "Devolución Aportes al Fondo Social") no
se cargaron como líneas propias, mismo criterio de siempre para un valor real en cero.
```

### Meta

```text
Ejercicio 2018/2019 (1°/9/2018 al 31/8/2019, ver comentario completo junto a
racingRevenueLinesByYear[2019]). PRESUPUESTO-ONLY, sin balance real cargado todavía para este
ejercicio (`reportType:'official_budget'` simple, no `official_budget_and_balance`) — a
diferencia de 2017/2018 y 2019/2020 (que sí tienen las 2 fuentes), este ejercicio queda con un
solo lado hasta que se cargue (si aparece) el balance auditado real. fx=40, declarado en las
Premisas Macro del propio presupuesto (pág. 2: "Estimamos un TC de $ 40.- por u$d 1.- en
promedio para el período"). Sin balance real, no hay grossDebt/cash/netInterest que declarar
(mismo criterio que 2026/2027, únicos otros `official_budget` simples del sitio): quedan en 0.
```

## 2018

### Ingresos

```text
Ejercicio 2017/2018 (Ejercicio N° 116, 1°/9/2017 al 31/8/2018, gestión Blanco) — balance real
cargado en la Versión 64 (OCR de `balance2018.pdf`, escaneo de 36 páginas sin inclinación, no
hizo falta deskew), completando el par Presupuesto+Balance de este ejercicio (el presupuesto ya
estaba cargado desde la Versión 63, ver `racingPresupuestoOverlayByYear[2018]` más abajo).
`reportType` pasó de `'official_budget'` a `'official_budget_and_balance'`, mismo mecanismo que
2019/2020 (`club-or-year-onboarding/SKILL.md` sección 11). Fuente: racing-balance-2018.md, Anexo
II "Recursos ordinarios" (columna TOTAL 2018, pág. 24) — mismos rubros exactos que 2019/2020 y
2020/2021 (mismo formato de documento), suma exacta a $1.789.819.233, el TOTAL DE RECURSOS
impreso del Estado de recursos y gastos (pág. 5).
```

### Gastos

```text
Ejercicio 2017/2018 (ver comentario completo junto a racingRevenueLinesByYear[2018] más arriba).
Fuente: racing-balance-2018.md, Anexo III "Detalle de gastos" (columna TOTAL 2018, pág. 25) +
Estado de recursos y gastos (Depreciaciones de bienes de uso, Anexo I, pág. 22-23). Los 10 rubros
de Anexo III suman exacto $1.093.025.917 (TOTAL DE GASTOS impreso, pág. 5); con Previsiones/
Amortizaciones intangibles (`other_amortisation`, parte del propio total de Anexo III,
$249.645.990) y Depreciaciones de bienes de uso (`depreciation`, de Anexo I, $7.775.936, NO
incluidas en el total de Anexo III) suma $1.350.447.843 — ver verifyTieOuts().
```

### Meta

```text
Ejercicio 2017/2018 (Ejercicio N° 116, ver comentario completo junto a
racingRevenueLinesByYear[2018]). fx = 36,65, declarado en el Anexo V "Activos y pasivos en
moneda extranjera" (pág. 27-29 de racing-balance-2018.md), tipo de cambio USD al 31/08/2018,
usado en todo el Anexo salvo una partida puntual de pasivo que declara 36,85 (inconsistencia
menor del propio documento, no investigada más, mismo criterio que la diferencia $73,98/$74,18
ya documentada para el Ejercicio 2019/2020). `reportType:'official_budget_and_balance'`: este
balance convive con `racingPresupuestoOverlayByYear[2018]` (mismo ejercicio, el presupuesto ya
cargado en la Versión 63) — el balance sigue siendo el dato PRIMARIO (KPIs/Formato
Simplificado/verifyTieOuts salen de acá).

netInterest = 177,149112 = "Intereses financieros" (28,953390) + "Diferencias de cambio"
(148,195722), las 2 líneas que el balance agrupa bajo "Resultados Financieros y por tenencia"
(pág. 5) — se combinan en un solo netInterest, mismo criterio que el resto de los balances de
Racing (que reportan esto como una sola línea "incluyendo el R.E.C.P.A.M."), aunque ESTE
documento puntual las separe en 2 sub-líneas.

Verificación (Versión 64): revenueLines suma exacto $1.789.819.233 (TOTAL DE RECURSOS impreso).
expenseLines suma exacto $(1.350.447.843) ($1.093.025.917 de Anexo III + $249.645.990 de
Previsiones/Amortizaciones intangibles + $7.775.936 de Depreciaciones de Anexo I). Resultado:
1.789.819.233 - 1.350.447.843 + 177.149.112 = 616.520.502, exacto contra "RESULTADO FINAL –
Superávit" impreso — ver verifyTieOuts().
```

### Presupuesto al lado del balance

```text
Ejercicio 2017/2018: `presupuesto2017-18.pdf`, cargado originalmente en la Versión 63 como el
dato PRIMARIO (único documento de ese ejercicio en ese momento, `official_budget` simple). En
la Versión 64 se cargó el balance real del mismo ejercicio (`balance2018.pdf`), que pasa a ser
el dato primario (ver `racingRevenueLinesByYear[2018]`/`racingFiscalYearMeta[2018]`,
`reportType:'official_budget_and_balance'`) — estas mismas líneas de presupuesto, sin tocar un
solo valor, se movieron acá como columna de comparación. Ver el comentario completo del
criterio de categorización (por qué "Cancelación Efva por Cpra de Jug." va a
`player_amortisation` en vez de excluirse, por qué los intereses/diferencias de cambio quedan
mezclados en el catch-all en vez de separarse a `netInterest`) en el historial de
`racingRevenueLinesByYear`/`racingExpenseLinesByYear` de versiones anteriores — mismo criterio,
sin cambios, solo cambió DÓNDE viven estos datos en el archivo.
Suma exacta a $1.137.120.000 (Ingresos Ordinarios $1.104.960.000 + Extraordinarios
$32.160.000), el "Total de Ingresos de Fdos" impreso pese a su etiqueta confusa "(I)+(II)+(III)".
Suma exacta a $(1.125.591.043), el "Total de Egresos de Fdos (IV)+(V)" impreso.
```

## 2017

### Ingresos

```text
Ejercicio N° 115 (1°/9/2016 al 31/8/2017, gestión Blanco) — `balance2017.pdf`, balance real
(`reportType:'official_balance_sheet'`, sin presupuesto propio en el archivo para este mismo
ejercicio — no existe `presupuesto2016-17.pdf`). Segundo ejercicio con auditoría externa
(Estudio Bertora y Asociados S.R.L.). A diferencia de `balance2016.pdf`, este Anexo II NO
incluye "Resultados Financieros" dentro del total de Recursos — el Estado de Recursos y
Gastos los muestra por separado (netInterest). fx=17,21, la tasa dominante que declara el
propio balance en su Anexo V (Moneda Extranjera). Escaneo puro (34 páginas), transcripto con
el Read tool sobre imágenes de página — sin inclinación diagonal, pero los Anexos I/II/III/V
estaban en landscape rotado dentro de la página portrait (`club-data-mapping/referencia/leer-pdf.md`). Fuente completa: `Clubes/Argentina/Racing/racing-balance-2017.md` — confirma que
la columna comparativa "31/08/2016" de este documento coincide EXACTO con
`racingRevenueLinesByYear[2016]` ya cargado (a diferencia de la transición 2015→2016, acá no
hubo reclasificación).

Suma exacta a $804.833.215, el "TOTAL DE RECURSOS" impreso — 11 líneas, ya es el total
completo sin sumar nada más (a diferencia de 2016).
```

### Gastos

```text
Ejercicio N° 115 (ver comentario completo junto a racingRevenueLinesByYear[2017] más arriba).
Fuente: `Clubes/Argentina/Racing/racing-balance-2017.md`, Anexo III "Detalle de Gastos"
(columna Total 2017) + Anexo I "Bienes de Uso" (Depreciación del Ejercicio). Los 10 rubros del
Anexo III suman exacto $(575.933.019) (SUBTOTAL impreso); con "Previsiones/Amortizaciones
intangibles" ($126.386.082, `other_amortisation`) y Depreciación ($6.073.853, `depreciation`,
Anexo I) suma $(708.392.954) — ver verifyTieOuts().
```

### Meta

```text
Ejercicio N° 115 (1°/9/2016 al 31/8/2017, ver comentario completo junto a
racingRevenueLinesByYear[2017]). Balance real (`reportType:'official_balance_sheet'`, sin
presupuesto propio en el archivo). fx=17,21, la tasa dominante que declara el propio balance
en su Anexo V. grossDebt = TOTAL DEL PASIVO. cash = Caja y Bancos. netInterest = Intereses
financieros + Diferencias de cambio del Estado de Recursos y Gastos (16.091.594+21.628.821 =
37.720.415).
```

## 2016

### Ingresos

```text
Ejercicio N° 114 (1°/9/2015 al 31/8/2016, gestión Blanco) — `balance2016.pdf`, balance real.
Este es el par del presupuesto 2015/2016 (`presupuesto2015-16.pdf`, cargado antes) — mismo
período exacto. `reportType` pasó de `'official_budget'` a `'official_budget_and_balance'`,
mismo mecanismo que 2014/2018/2020 (`club-or-year-onboarding/SKILL.md` sección 11) — el
balance es ahora el dato PRIMARIO, las líneas del presupuesto que ya estaban acá se movieron,
sin tocar un solo valor, a `racingPresupuestoOverlayByYear[2016]` más abajo. fx=14,83, la tasa
dominante que declara el propio balance en su Anexo V (Moneda Extranjera). Primer ejercicio
con auditoría externa (Estudio Bertora y Asociados S.R.L.) — formato de estados contables
distinto (Notas 1-8 + Anexos I-V), pero Anexo II/III mantienen la misma estructura de
columnas que los ejercicios anteriores. Escaneo puro (36 páginas), transcripto con el Read
tool sobre imágenes de página — sin inclinación diagonal, pero los Anexos II/III/V estaban en
landscape rotado dentro de la página portrait (`club-data-mapping/referencia/leer-pdf.md`). Fuente
completa: `Clubes/Argentina/Racing/racing-balance-2016.md` — incluye una nota importante sobre
por qué la columna comparativa "31/08/2015" de ESTE documento no coincide con
`racingRevenueLinesByYear[2015]` (reclasificación de exposición por el nuevo auditor externo,
no una corrección del resultado real — NO se tocaron los datos ya cargados de 2015).

Suma exacta a $611.968.373, el "TOTAL DE RECURSOS" impreso — 11 líneas, sin Recursos
Extraordinarios este ejercicio (a diferencia de 2012/2014, este Anexo II no tiene fila de
Desafectación de Previsiones).
```

### Gastos

```text
Ejercicio N° 114 (ver comentario completo junto a racingRevenueLinesByYear[2016] más
arriba). Fuente: `Clubes/Argentina/Racing/racing-balance-2016.md`, Anexo III "Detalle de
Gastos" (columna Total al 31/08/2016) + "Depreciación" del Estado de Recursos y Gastos. Los
10 rubros del Anexo III suman exacto $(353.474.696) (SUBTOTAL impreso); con "Previsiones /
Amortizaciones" ($86.210.139, `other_amortisation`) y Depreciación ($1.968.198,
`depreciation`) suma $(441.653.033) — ver verifyTieOuts().
```

### Meta

```text
Ejercicio N° 114 (1°/9/2015 al 31/8/2016, ver comentario completo junto a
racingRevenueLinesByYear[2016]). `reportType:'official_budget_and_balance'`: este balance
convive con `racingPresupuestoOverlayByYear[2016]` (el presupuesto 2015/2016, mismo ejercicio,
movido acá desde los slots principales) — el balance sigue siendo el dato PRIMARIO. fx=14,83,
la tasa dominante que declara el propio balance en su Anexo V (Moneda Extranjera). grossDebt =
TOTAL DEL PASIVO (Estado de Situación Patrimonial). cash = Caja y Bancos (misma página).
netInterest = Resultados Financieros y por tenencia del Anexo II (4.065.311+19.592.652 =
23.657.963 — este ejercicio no desglosa un lado "Egresos" financieros separado).
```

### Presupuesto al lado del balance

```text
Ejercicio N° 114 (2015/2016, 1°/9/2015 al 31/8/2016): `presupuesto2015-16.pdf`, cargado
originalmente como el dato PRIMARIO (único documento de este ejercicio en ese momento,
`official_budget` simple). Al cargar `balance2016.pdf` (el balance real del mismo ejercicio),
este pasa a ser el dato primario (ver `racingRevenueLinesByYear[2016]`/
`racingFiscalYearMeta[2016]`, `reportType:'official_budget_and_balance'`) — estas mismas
líneas de presupuesto, sin tocar un solo valor, se movieron acá como columna de comparación.
```

## 2015

### Ingresos

```text
Ejercicio N° 113 (1°/9/2014 al 31/8/2015, gestión Blanco) — `balance2015.pdf`, balance real
(`reportType:'official_balance_sheet'`, sin presupuesto propio en el archivo para este mismo
ejercicio — salta de `presupuesto2013-14.pdf` a `presupuesto2015-16.pdf`). Mismos rubros
"Generales/Específicos/Diversos" (Anexo II) que 2009-2012, sin decisiones nuevas. fx=9,20, el
dólar oficial de cierre de agosto de 2015 (tasa dominante del Anexo de Moneda Extranjera para
Caja y Bancos y la mayoría de "Otros Créditos" del período corriente — algunas líneas de
crédito heredadas mantienen tipos de cambio históricos congelados, no representativos del
ejercicio, no se usaron). Escaneo puro (25 páginas), transcripto con el Read tool sobre
imágenes de página — sin inclinación diagonal, pero los Anexos I/II/III y el de Moneda
Extranjera estaban en landscape rotado dentro de la página portrait
(`club-data-mapping/referencia/leer-pdf.md`). Fuente completa:
`Clubes/Argentina/Racing/racing-balance-2014-15.md`.

Suma exacta a $430.314.984 (redondeo de $1 contra el "TOTAL DE RECURSOS" impreso,
$430.314.983) — 11 líneas ordinarias, sin Recursos Extraordinarios este ejercicio (ambas
líneas del Anexo II en $0, no se cargaron).
```

### Gastos

```text
Ejercicio N° 113 (ver comentario completo junto a racingRevenueLinesByYear[2015] más arriba).
Fuente: `Clubes/Argentina/Racing/racing-balance-2014-15.md`, Anexo III "Detalle de Gastos"
(columna Total al 31/08/2015) + Anexo I "Bienes de Uso" (Amortización del Ejercicio). Los 10
rubros del Anexo III suman exacto $(310.039.072) (SUBTOTAL impreso); con "Cargos
Extraordinarios (Previsiones/Otras Amortizaciones)" ($19.931.642, `other_amortisation`) y
Amortizaciones de Bienes de Uso ($1.683.948, `depreciation`, Anexo I) suma $(331.654.662) —
ver verifyTieOuts().
```

### Meta

```text
Ejercicio N° 113 (1°/9/2014 al 31/8/2015, ver comentario completo junto a
racingRevenueLinesByYear[2015]). Balance real (`reportType:'official_balance_sheet'`, sin
presupuesto propio en el archivo para este mismo ejercicio). fx=9,20, el dólar oficial de
cierre de agosto de 2015 (tasa dominante del Anexo de Moneda Extranjera). grossDebt = TOTAL
DEL PASIVO (Estado de Situación Patrimonial). cash = Caja y Bancos (misma página). netInterest
= Resultados Financieros Ingresos−Egresos del Estado de Recursos y Gastos
(7.900.977−4.016.785 = 3.884.192).
```

## 2014

### Ingresos

```text
Ejercicio N° 112 (1°/11/2013 al 31/8/2014, irregular de 10 meses, gestión Blanco) —
`balance2014.pdf`, balance real. Este es el par del presupuesto 2013/2014
(`presupuesto2013-14.pdf`, cargado antes) — mismo ejercicio (cierra 31/8/2014 en los dos
documentos, aunque el período declarado no coincida exacto: el presupuesto asume 12 meses
desde septiembre, el balance real son 10 meses desde noviembre). `reportType` pasó de
`'official_budget'` a `'official_budget_and_balance'`, mismo mecanismo que 2017/2018 y
2019/2020 (`club-or-year-onboarding/SKILL.md` sección 11) — el balance es ahora el dato
PRIMARIO, las líneas del presupuesto que ya estaban acá se movieron, sin tocar un solo valor,
a `racingPresupuestoOverlayByYear[2014]` más abajo. fx=8,3070, la tasa dominante que declara
el propio balance en su Anexo de Moneda Extranjera. Escaneo puro (38 páginas), transcripto con
el Read tool sobre imágenes de página — sin inclinación diagonal, pero los Anexos II/III y el
de Moneda Extranjera estaban en landscape rotado dentro de la página portrait
(`club-data-mapping/referencia/leer-pdf.md`). Fuente completa:
`Clubes/Argentina/Racing/racing-balance-2014.md`.

Suma exacta a $301.631.868, el "TOTAL DE RECURSOS" impreso — 11 líneas ordinarias +
"Desafectación de Previsiones y Provisiones" (exceptional_items, $1.000.000).
```

### Gastos

```text
Ejercicio N° 112 (ver comentario completo junto a racingRevenueLinesByYear[2014] más arriba).
Fuente: `Clubes/Argentina/Racing/racing-balance-2014.md`, Anexo III "Detalle de Gastos"
(columna Total al 31/08/2014) + Anexo I "Bienes de Uso" (Amortización del Ejercicio). Los 10
rubros del Anexo III suman exacto $(190.132.485) (SUBTOTAL impreso); con "Cargos
Extraordinarios (Previsiones/Otras Amortizaciones)" ($26.435.662, `other_amortisation`) y
Amortizaciones de Bienes de Uso ($1.578.112, `depreciation`, Anexo I) suma $(218.146.259) —
ver verifyTieOuts().
```

### Meta

```text
Ejercicio N° 112 (1°/11/2013 al 31/8/2014, irregular de 10 meses, ver comentario completo
junto a racingRevenueLinesByYear[2014]). `reportType:'official_budget_and_balance'`: este
balance convive con `racingPresupuestoOverlayByYear[2014]` (el presupuesto 2013/2014, mismo
ejercicio, movido acá desde los slots principales) — el balance sigue siendo el dato PRIMARIO
(KPIs/Formato Simplificado/verifyTieOuts salen de acá). fx=8,3070, la tasa dominante que
declara el propio balance en su Anexo de Moneda Extranjera. grossDebt = TOTAL DEL PASIVO
(Estado de Situación Patrimonial). cash = Caja y Bancos (misma página). netInterest =
Resultados Financieros Ingresos−Egresos del Estado de Recursos y Gastos
(22.318.464−5.867.338 = 16.451.126).
```

### Presupuesto al lado del balance

```text
Ejercicio N° 112 (2013/2014, 1°/11/2013 al 31/8/2014): `presupuesto2013-14.pdf`, cargado
originalmente como el dato PRIMARIO (único documento de este ejercicio en ese momento,
`official_budget` simple). Al cargar `balance2014.pdf` (el balance real del mismo ejercicio,
Ejercicio N° 112, irregular de 10 meses), este pasa a ser el dato primario (ver
`racingRevenueLinesByYear[2014]`/`racingFiscalYearMeta[2014]`,
`reportType:'official_budget_and_balance'`) — estas mismas líneas de presupuesto, sin tocar un
solo valor, se movieron acá como columna de comparación. Mismo criterio de categorización que
tenían en los slots principales, sin cambios, solo cambió DÓNDE viven estos datos en el
archivo.
```

## 2013

### Ingresos

```text
Ejercicio N° 111 (1°/11/2012 al 31/10/2013) — `balance2013.pdf`, balance real
(`reportType:'official_balance_sheet'`). Presidencia INCIERTA para este ejercicio puntual
(ninguna página del balance muestra firma rotulada "Presidente", a diferencia de 2012/2015+) —
`gestionId:null` por inferencia de fecha (Memoria fechada 2/12/2013, probablemente antes de la
elección de Blanco ese mismo diciembre), no confirmado con certeza, ver nota completa en
`Clubes/Argentina/Racing/racing-balance-2013.md`. Mismos rubros "Generales/Específicos/
Diversos" (Anexo II) que 2009-2012, sin decisiones nuevas. fx=5,8720, la tasa dominante que
declara el propio balance en su Anexo de Moneda Extranjera. Escaneo puro (28 páginas, calidad
de escaneo más baja que otros años pero legible), transcripto con el Read tool sobre imágenes
de página — sin inclinación diagonal, pero los Anexos II/III y el de Moneda Extranjera estaban
en landscape rotado dentro de la página portrait (`club-data-mapping/referencia/leer-pdf.md`).

Suma exacta a $188.690.953, el "TOTAL DE RECURSOS" impreso — 11 líneas ordinarias, sin
Recursos Extraordinarios este ejercicio (ambas líneas del Anexo II en $0).
```

### Gastos

```text
Ejercicio N° 111 (ver comentario completo junto a racingRevenueLinesByYear[2013] más arriba).
Fuente: `Clubes/Argentina/Racing/racing-balance-2013.md`, Anexo III "Detalle de Gastos"
(columna Total al 31/10/2013) + Anexo I "Bienes de Uso" (Amortización del Ejercicio). Los 10
rubros del Anexo III suman exacto $(158.127.700) (redondeo de $1 contra el SUBTOTAL impreso,
$158.127.701); con "Cargos Extraordinarios (Previsiones/Otras Amortizaciones)" ($18.016.124,
`other_amortisation`) y Amortizaciones de Bienes de Uso ($1.486.409, `depreciation`, Anexo I)
suma $(177.630.233) — ver verifyTieOuts(). OJO al releer el PDF original: "Organización de
Partidos"/"Grales. Actividades Deportivas / Soc." tienen sus columnas Generales/Específicos
desalineadas del orden visual de filas (mismo tipo de trampa que las presupuestos 2013-14/
2015-16, pero acá en un balance) — ver la nota completa en el .md fuente antes de tocar estos
2 valores.
```

### Meta

```text
Ejercicio N° 111 (1°/11/2012 al 31/10/2013, ver comentario completo junto a
racingRevenueLinesByYear[2013]). Balance real (`reportType:'official_balance_sheet'`).
`gestionId:null` por inferencia de fecha, NO confirmado con certeza (ninguna página de este
balance puntual muestra firma de Presidente) — ver nota completa en
`Clubes/Argentina/Racing/racing-balance-2013.md`. fx=5,8720, la tasa dominante que declara el
propio balance en su Anexo de Moneda Extranjera. grossDebt = TOTAL DEL PASIVO (Estado de
Situación Patrimonial). cash = Caja y Bancos (misma página). netInterest = Resultados
Financieros Ingresos−Egresos del Estado de Recursos y Gastos (12.161.277−11.995.156 =
166.121).
```

## 2012

### Ingresos

```text
Ejercicio N° 110 (1°/11/2011 al 31/10/2012, PRE-Blanco, presidente Gastón Federico Cogorno,
`gestionId:null` mismo criterio que 2009/2010/2011) — `balance2012.pdf`, balance real
(`reportType:'official_balance_sheet'`). A diferencia de 2009-2011 (cargados en USD
ya-convertido), este ejercicio se cargó en ARS NATIVO (`currency:'ARS'`) con el fx que declara
el propio balance en su Anexo de Moneda Extranjera ($4,7260 por U$S, la tasa dominante del lado
Activo — el lado Pasivo usa $4,7660 para "Otros Pasivos", inconsistencia menor ya vista en
otros ejercicios de Racing, ej. 2019/2020). Mismos rubros "Generales/Específicos/Diversos"
(Anexo II) que 2009-2011, sin decisiones nuevas de categorización. Escaneo puro (25 páginas),
transcripto con el Read tool sobre imágenes de página — sin inclinación diagonal, pero los
Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página
portrait (`club-data-mapping/referencia/leer-pdf.md`). Fuente completa:
`Clubes/Argentina/Racing/racing-balance-2012.md`.

Suma exacta a $184.791.901 (11 líneas ordinarias + "Desafectación de Previsiones/Provisiones"
como `exceptional_items`, $1.000.000) = el total real de Recursos Ordinarios+Extraordinarios
del Anexo II, EXCLUYENDO "Resultados Financieros" (que va a `netInterest` en el meta, no acá,
mismo criterio que 2009-2011). "Condonaciones" ($0) no se cargó como línea propia.
```

### Gastos

```text
Ejercicio N° 110 (ver comentario completo junto a racingRevenueLinesByYear[2012] más arriba).
Fuente: `Clubes/Argentina/Racing/racing-balance-2012.md`, Anexo III "Detalle de Gastos"
(columna Total al 31/10/2012) + Anexo I "Bienes de Uso" (Amortizaciones del Ejercicio). Los 10
rubros del Anexo III suman exacto $(141.052.157) (SUBTOTAL impreso); con "Cargos
Extraordinarios (Previsiones/Otras Amortizaciones)" ($24.292.381, `other_amortisation`) y
Amortizaciones de Bienes de Uso ($1.442.073, `depreciation`, Anexo I, NO incluidas en el
subtotal de Anexo III) suma $(166.786.611) — ver verifyTieOuts().
```

### Meta

```text
Ejercicio N° 110 (1°/11/2011 al 31/10/2012, ver comentario completo junto a
racingRevenueLinesByYear[2012]). PRE-Blanco (`gestionId:null`, presidente Gastón Federico
Cogorno). A diferencia de 2009-2011 (USD ya-convertido), este ejercicio está en ARS NATIVO
(`currency:'ARS'`) con fx=4,7260, la tasa dominante que declara el propio balance en su Anexo
de Moneda Extranjera (lado Activo — el lado Pasivo usa $4,7660, inconsistencia menor del
propio documento). grossDebt = TOTAL DEL PASIVO (Estado de Situación Patrimonial). cash = Caja
y Bancos (misma página). netInterest = Resultados Financieros Ingresos−Egresos del Estado de
Recursos y Gastos (6.078.346−7.059.282 = −980.936).
```

## 2011

### Meta

```text
TOTALES OFICIALES CARGADOS EL 2026-09-20 (to-do 20(e)). Hasta acá estos 3 ejercicios eran
los únicos REALES del sitio sin ningún número de control: `verifyTieOuts()` no tenía contra
qué compararlos, así que un dígito mal transcripto en cualquiera de sus líneas no lo hubiera
detectado nadie, nunca.
EN QUÉ MONEDA VAN: estos 3 ejercicios están guardados en USD ya-convertido (ver el comentario
de cabecera y la excepción documentada en club-data-mapping/referencia/fx.md), así que los totales van
también en USD, dividiendo el número impreso en pesos por el MISMO fx con el que se
convirtió cada línea. Eso no vuelve circular el chequeo: como todas las líneas usan ese
mismo fx, la división es exacta y lo que se verifica sigue siendo lo que importa — que la
SUMA de las líneas transcriptas reproduzca el total que imprime el documento.
officialTotalExpenses QUEDA EN null A PROPÓSITO, no es un olvido: el "TOTAL DE GASTOS" que
imprime el Estado de Recursos y Gastos de estos balances NO tiene el mismo alcance que
`expenses + nonCash` del sitio (deja afuera amortizaciones y cargos extraordinarios, y no lo
hace igual en los 3 años). Es exactamente el caso que club-data-mapping §6.4 manda NO forzar:
un check automático contra un número que significa otra cosa se ve como "no cierra" por una
diferencia de definición, no de datos. La verificación se hizo por el camino fuerte, que es
el PAT — un solo número inambiguo que no depende de cómo agrupe el documento.
Recursos: "TOTAL DE RECURSOS" $108.779.778, sin extraordinarios este ejercicio (el Estado
imprime "Total Recursos Extraordinarios" $0). PAT: $267.202. Verificado: 0,063000 contra
0,062577, o sea $1.808 ARS.
OJO CON EL RÓTULO, ES EL CASO QUE club-data-mapping §6.3 usa de ejemplo Y ES ESTE EJERCICIO:
el Estado dice "RESULTADO FINAL (Pérdida)" y el número es POSITIVO (+$267.202); el Estado de
Evolución del Patrimonio Neto, en el mismo balance, lo llama "(Superavit)". El rótulo quedó
de la plantilla del año anterior (2010 sí fue pérdida). Manda el número, no el rótulo.
Mismo caso que el Anexo de 2010: el Anexo dice "Total Recursos Ordinarios" $109.729.244
contra los $108.779.778 del Estado. Las líneas reproducen el del Estado.
```

## 2010

### Meta

```text
TOTALES OFICIALES CARGADOS EL 2026-09-20 (to-do 20(e)). Hasta acá estos 3 ejercicios eran
los únicos REALES del sitio sin ningún número de control: `verifyTieOuts()` no tenía contra
qué compararlos, así que un dígito mal transcripto en cualquiera de sus líneas no lo hubiera
detectado nadie, nunca.
EN QUÉ MONEDA VAN: estos 3 ejercicios están guardados en USD ya-convertido (ver el comentario
de cabecera y la excepción documentada en club-data-mapping/referencia/fx.md), así que los totales van
también en USD, dividiendo el número impreso en pesos por el MISMO fx con el que se
convirtió cada línea. Eso no vuelve circular el chequeo: como todas las líneas usan ese
mismo fx, la división es exacta y lo que se verifica sigue siendo lo que importa — que la
SUMA de las líneas transcriptas reproduzca el total que imprime el documento.
officialTotalExpenses QUEDA EN null A PROPÓSITO, no es un olvido: el "TOTAL DE GASTOS" que
imprime el Estado de Recursos y Gastos de estos balances NO tiene el mismo alcance que
`expenses + nonCash` del sitio (deja afuera amortizaciones y cargos extraordinarios, y no lo
hace igual en los 3 años). Es exactamente el caso que club-data-mapping §6.4 manda NO forzar:
un check automático contra un número que significa otra cosa se ve como "no cierra" por una
diferencia de definición, no de datos. La verificación se hizo por el camino fuerte, que es
el PAT — un solo número inambiguo que no depende de cómo agrupe el documento.
Recursos: "TOTAL DE RECURSOS" $72.936.813 + Extraordinarios $370.152 = $73.306.965. PAT:
"RESULTADO FINAL (Pérdida)" -$9.714.118. Verificado: PAT -2,439000 contra -2,440733, $6.898 ARS.
OJO, DIFERENCIA INTERNA DEL PROPIO DOCUMENTO: el Anexo imprime "Total Recursos Ordinarios"
$74.533.299, que NO es el "TOTAL DE RECURSOS" $72.936.813 del Estado de Recursos y Gastos.
Las líneas cargadas reproducen el del ESTADO, que es el número del cuerpo principal.
```

## 2009

### Meta

_al lado del campo `gestionId`:_

```text
pre-Blanco (asumió 2013), presidencia no verificada — ver comentario arriba
```

```text
TOTALES OFICIALES CARGADOS EL 2026-09-20 (to-do 20(e)). Hasta acá estos 3 ejercicios eran
los únicos REALES del sitio sin ningún número de control: `verifyTieOuts()` no tenía contra
qué compararlos, así que un dígito mal transcripto en cualquiera de sus líneas no lo hubiera
detectado nadie, nunca.
EN QUÉ MONEDA VAN: estos 3 ejercicios están guardados en USD ya-convertido (ver el comentario
de cabecera y la excepción documentada en club-data-mapping/referencia/fx.md), así que los totales van
también en USD, dividiendo el número impreso en pesos por el MISMO fx con el que se
convirtió cada línea. Eso no vuelve circular el chequeo: como todas las líneas usan ese
mismo fx, la división es exacta y lo que se verifica sigue siendo lo que importa — que la
SUMA de las líneas transcriptas reproduzca el total que imprime el documento.
officialTotalExpenses QUEDA EN null A PROPÓSITO, no es un olvido: el "TOTAL DE GASTOS" que
imprime el Estado de Recursos y Gastos de estos balances NO tiene el mismo alcance que
`expenses + nonCash` del sitio (deja afuera amortizaciones y cargos extraordinarios, y no lo
hace igual en los 3 años). Es exactamente el caso que club-data-mapping §6.4 manda NO forzar:
un check automático contra un número que significa otra cosa se ve como "no cierra" por una
diferencia de definición, no de datos. La verificación se hizo por el camino fuerte, que es
el PAT — un solo número inambiguo que no depende de cómo agrupe el documento.
Recursos: "TOTAL DE RECURSOS" $78.209.061 + "Total Recursos Extraordinarios" $9.195.840
(el Estado los imprime separados) = $87.404.901. PAT: "RESULTADO FINAL (Ganancia)" $2.687.137.
Verificado con computeYearGeneric(): PAT calculado 0,704000 contra 0,703439 impreso, o sea
$2.143 ARS sobre $87 millones — es el redondeo de guardar las líneas con 3 decimales de M USD.
```

## Fuentes

### racing-presupuesto-2025-26-prensa

_note (data/):_

```text
Hilo de X con el resumen presentado en asamblea, no el documento oficial del club. Los rubros vienen agrupados de forma más gruesa que los de Boca — por ejemplo "fútbol profesional" junto en vez de separado por TV/matchday/pases. Donde la prensa no desglosaba un monto, se dejó como línea residual "no desglosado" en vez de inventar categorías.
```

### racing-placeholder

_note (data/):_

```text
Todas las finanzas de Racing que estaban cargadas con esta fuente (Blanco placeholder puro, Milito con dato de prensa) se reemplazaron por documentos oficiales reales en la Versión 15/16. Queda esta entrada solo por si algún dato viejo la sigue referenciando.
```

### racing-balance-2009

_note (data/):_

```text
PDF oficial (22 páginas, con texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. Ejercicio anterior a la presidencia de Víctor Blanco (asumió en 2013) — no se identificó con confianza quién presidía el club en este ejercicio específico, ver comentario en data/ar/racing-data.js. El balance en sí documenta que Racing venía de una quiebra (línea "Resultado Extraordinario s/Quiebra"). GANANCIA real del ejercicio de $2.687.137 ARS. Cifras en pesos históricos, SIN reexpresión por inflación (la práctica de moneda homogénea/RT6 llegó recién con la crisis de los 2020) — convertido a USD con el dólar mayorista de cierre estimado en $3,82 al 31/10/2009 (no se encontró la cotización exacta de ese día puntual, se usó la cotización más cercana disponible, ver comentario en racing-data.js). Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2009.pdf.
```

### racing-balance-2010

_note (data/):_

```text
PDF oficial (25 páginas, texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. PÉRDIDA real del ejercicio de $(9.714.118) ARS. Convertido a USD con el dólar mayorista interpolado linealmente entre los valores de apertura ($3,82) y cierre ($4,01) de 2010 publicados por cotizacion-dolar.com.ar (no se encontró la cotización exacta del 31/10/2010) — estimado en $3,98. Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2010.pdf.
```

### racing-balance-2011

_note (data/):_

```text
PDF oficial (23 páginas, texto extraíble nativo) bajado directo de racingclub.com.ar/informes/. GANANCIA real del ejercicio de $267.202 ARS (el propio documento imprime la fila como "RESULTADO FINAL (Pérdida)" pese a ser positiva — verificado por aritmética propia antes de cargar, es un rótulo de plantilla mal actualizado del documento original, no un error de este sitio). Convertido a USD con el dólar mayorista interpolado entre apertura ($4,01) y cierre ($4,32) de 2011 — estimado en $4,27, mismo criterio y misma limitación de fuente que el Ejercicio 2010. Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2011.pdf.
```

### racing-balance-2012

_note (data/):_

```text
PDF oficial (25 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Presidente Gastón Federico Cogorno (PRE-Blanco). BENEFICIO real del ejercicio de $17.024.354 ARS. A diferencia de 2009-2011 (cargados en USD ya-convertido con un dólar mayorista investigado externamente), este ejercicio se cargó en ARS NATIVO con $4,7260 por dólar, el tipo de cambio que el propio balance declara en su Anexo de Moneda Extranjera (lado Activo — el lado Pasivo usa $4,7660, inconsistencia menor). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2012.pdf + racing-balance-2012.md).
```

### racing-balance-2013

_note (data/):_

```text
PDF oficial (28 páginas, 110° aniversario del club), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal, aunque de calidad de escaneo más baja que otros años; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). BENEFICIO real del ejercicio de $11.226.840 ARS. Presidencia de este ejercicio puntual INCIERTA (ninguna página del balance muestra firma rotulada "Presidente"; cargado como gestionId:null por inferencia de fecha, no confirmado — ver nota en racing-balance-2013.md). Convertido a USD con $5,8720 por dólar, la tasa dominante que declara el propio balance en su Anexo de Moneda Extranjera. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2013.pdf + racing-balance-2013.md).
```

### racing-balance-2014

_note (data/):_

```text
PDF oficial (38 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Ejercicio irregular de 10 meses, de transición del cierre de octubre al de agosto. Presidente Víctor Blanco Rodríguez. BENEFICIO real del ejercicio de $100.936.735 ARS. Mismo ejercicio que `racing-presupuesto-2013-14` (cargado antes como dato primario, ahora columna "Presupuesto" de comparación) — con este balance el ejercicio pasa a `reportType:'official_budget_and_balance'`. Convertido a USD con $8,3070 por dólar, la tasa dominante que el propio balance declara en su Anexo de Moneda Extranjera. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2014.pdf + racing-balance-2014.md).
```

### racing-presupuesto-2013-14

_note (data/):_

```text
PDF oficial (10 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; las 3 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotaron para leerlas). Primer presupuesto de la gestión Blanco cargado al sitio (firmado por Víctor Blanco Rodríguez como Presidente). Mismo ejercicio que `racing-balance-2014` (el balance real, dato primario desde que se cargó — este presupuesto pasó a ser la columna "Presupuesto" de comparación en "Estado de resultados"). Convertido a USD con $6,00 por dólar, promedio de los 2 puntos que el propio presupuesto declara como premisa ($5,80 al 31/12/13, $6,20 para el semestre siguiente). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2013-14.pdf + racing-presupuesto-2013-14.md).
```

### racing-balance-2014-15

_note (data/):_

```text
PDF oficial (25 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos I/II/III y el de Moneda Extranjera estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). BENEFICIO real del ejercicio de $102.544.513 ARS. Sin presupuesto propio en el archivo para este mismo ejercicio (salta de presupuesto2013-14 a presupuesto2015-16). Convertido a USD con $9,20 por dólar, el dólar oficial de cierre de agosto de 2015, la tasa dominante que declara el propio balance en su Anexo de Moneda Extranjera (algunas líneas de crédito heredadas mantienen tipos de cambio históricos congelados de ejercicios anteriores, no representativos, no se usaron). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2015.pdf + racing-balance-2014-15.md).
```

### racing-balance-2017

_note (data/):_

```text
PDF oficial (34 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos I/II/III/V estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Segundo ejercicio con auditoría externa (Estudio Bertora y Asociados S.R.L.). Presidente Víctor Blanco Rodríguez. SUPERÁVIT real del ejercicio de $134.160.676 ARS. Sin presupuesto propio en el archivo (no existe presupuesto2016-17.pdf). La columna comparativa "31/08/2016" de este documento coincide exacto con racing-balance-2016 (a diferencia de la transición 2015→2016, acá no hubo reclasificación del auditor). Convertido a USD con $17,21 por dólar, la tasa dominante que el propio balance declara en su Anexo V. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2017.pdf + racing-balance-2017.md).
```

### racing-balance-2016

_note (data/):_

```text
PDF oficial (36 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; los Anexos II/III/V estaban en landscape rotado dentro de la página portrait, se rotaron para leerlos). Primer ejercicio con auditoría externa (Estudio Bertora y Asociados S.R.L.). Presidente Víctor Blanco Rodríguez. BENEFICIO real del ejercicio de $193.973.303 ARS. Mismo ejercicio que `racing-presupuesto-2015-16` (cargado antes como dato primario, ahora columna "Presupuesto" de comparación) — con este balance el ejercicio pasa a `reportType:'official_budget_and_balance'`. OJO: la columna comparativa "31/08/2015" de este documento fue reclasificada por el nuevo auditor (Nota 1.c del propio documento) y NO coincide con `racing-balance-2014-15` — no se tocaron los datos ya cargados de ese ejercicio, ver nota completa en racing-balance-2016.md. Convertido a USD con $14,83 por dólar, la tasa dominante que el propio balance declara en su Anexo V. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2016.pdf + racing-balance-2016.md).
```

### racing-presupuesto-2015-16

_note (data/):_

```text
PDF oficial (11 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal; las 3 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotaron para leerlas). Mismo formato que `racing-presupuesto-2013-14`, con premisas macro que ya reflejan la devaluación de diciembre de 2015 (2 tipos de cambio declarados, dólar y euro). Mismo ejercicio que `racing-balance-2016` (el balance real, dato primario desde que se cargó — este presupuesto pasó a ser la columna "Presupuesto" de comparación). Convertido a USD con $11,80 por dólar, promedio de los 2 puntos que el propio presupuesto declara como premisa ($10,10 al 31/12/15, $13,5 para el semestre siguiente). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2015-16.pdf + racing-presupuesto-2015-16.md).
```

### racing-presupuesto-2017-18

_note (data/):_

```text
PDF oficial (11 páginas, texto extraíble nativo) del archivo de racingclub.com.ar/informes/. Presupuesto de Recursos y Gastos en base de CAJA (cash-flow mensual, 12 columnas), no el formato acumulado/accrual de los presupuestos 2025-26/2026-27. Mismo ejercicio que `racing-balance-2018` (el balance real, dato primario desde la Versión 64) — este presupuesto es la columna "Presupuesto" de comparación en "Estado de resultados". Convertido a USD con $20 por dólar, el tipo de cambio único que el propio presupuesto declara como premisa ("Premisas Macro"), distinto al $36,65 del balance. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2017-18.pdf + racing-presupuesto-2017-18.md).
```

### racing-presupuesto-2018-19

_note (data/):_

```text
PDF oficial (9 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal en ninguna página; las 2 páginas de tabla estaban en landscape rotado 90° dentro de la página portrait, se rotó la imagen para leerlas en orientación normal). Sin balance real cargado todavía para este mismo ejercicio (`reportType:'official_budget'` simple) — es un ejercicio PRESUPUESTO-ONLY por ahora, mismo estado en el que estuvo `racing-presupuesto-2017-18` hasta que se cargó su balance. Convertido a USD con $40 por dólar, el tipo de cambio único que el propio presupuesto declara como premisa ("Premisas Macro"). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2018-19.pdf + racing-presupuesto-2018-19.md).
```

### racing-balance-2018

_note (data/):_

```text
PDF oficial (36 páginas), ESCANEO puro sin capa de texto, transcripto con el Read tool sobre imágenes de página (sin inclinación diagonal, no hizo falta deskew). SUPERÁVIT real: $616.520.502 ARS. Mismo ejercicio que `racing-presupuesto-2017-18` (cargado antes, en la Versión 63) — con este balance el ejercicio pasa a `reportType:'official_budget_and_balance'`. Convertido a USD con $36,65, el tipo de cambio de cierre que el propio balance declara en su Anexo V. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2018.pdf + racing-balance-2018.md).
```

### racing-balance-2019-20

_note (data/):_

```text
PDF oficial (33 páginas, texto extraíble nativo) bajado de racingclub.com.ar/informes/. Último ejercicio con cierre a agosto (la Asamblea del 18/12/2019 aprobó pasar el cierre a 30 de junio desde el ejercicio siguiente). Tiene también su propio Presupuesto real cargado como overlay de comparación, ver `racing-presupuesto-2019-20`. Convertido a USD con $73,98, el tipo de cambio de cierre que el propio balance declara en su Anexo V. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2019-20.pdf + racing-balance-2019-20.md).
```

### racing-presupuesto-2019-20

_note (data/):_

```text
PDF oficial (8 páginas), a diferencia de la mayoría de los presupuestos de este archivo es un ESCANEO puro (sin texto extraíble), transcripto con el Read tool sobre imágenes de página, corrigiendo primero una inclinación diagonal real del escaneo (~0,78°, ver `.claude/skills/club-data-mapping/referencia/leer-pdf.md` para la receta de deskew). Mismo ejercicio que `racing-balance-2019-20` (el balance real, dato primario) — este presupuesto es la columna "Presupuesto" de comparación en "Estado de resultados". Convertido a USD con $70, el tipo de cambio que el propio presupuesto declara como premisa (distinto al $73,98 del balance). Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (presupuesto2019-20.pdf + racing-presupuesto-2019-20.md).
```

### racing-balance-2021

_note (data/):_

```text
PDF oficial (35 páginas, texto extraíble nativo) bajado de racingclub.com.ar/informes/. Ejercicio irregular de 10 meses, de transición del cierre de agosto al de junio (ver `racing-balance-2019-20`). SUPERÁVIT real chico: $7.012.082 ARS. Sin presupuesto propio en el archivo para este mismo ejercicio (`presupuesto2020-21.pdf` no existe). Convertido a USD con $95,52, el tipo de cambio de cierre que el propio balance declara en su Anexo V, usado sin excepciones en todo el anexo. Copia local y transcripción completa en finance-of-sports/Clubes/Argentina/Racing/ (balance2021.pdf + racing-balance-2021.md).
```

### racing-balance-2023-24

_note (data/):_

```text
PDF oficial (40 páginas, con informe de auditoría de Bertora y Asociados S.R.L., firmado por Víctor Blanco Rodríguez como Presidente), bajado directo de racingclub.com.ar/informes/ — a diferencia de Boca y River, este PDF tiene texto extraíble (no es un escaneo). Última temporada de la gestión Blanco: DÉFICIT real del ejercicio de $(6.127.619.872) ARS. Cifras en moneda homogénea al 30/06/2024 (RT 6). Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2024.pdf. Convertido a USD con $909, el tipo de cambio de cierre que el PROPIO balance declara en su Anexo VI (Versión 32; antes se usaba $912, una cotización externa).
```

### racing-balance-2024-25

_note (data/):_

```text
PDF oficial (43 páginas, con informe de auditoría de Bertora y Asociados S.R.L., firmado por Diego Alberto Milito como Presidente), bajado directo de racingclub.com.ar/informes/. Primer ejercicio completo de la gestión Milito (asumió 20/12/2024, a mitad de este ejercicio, pero el balance está firmado y presentado bajo su gestión): déficit real del ejercicio de $(178.451.821) ARS, mucho menor al de la gestión anterior. Cifras en moneda homogénea al 30/06/2025 (RT 6). Copia local en finance-of-sports/Clubes/Argentina/Racing/balance2025.pdf. Convertido a USD con $1.196, el tipo de cambio de cierre que el PROPIO balance declara en su Anexo VI (Versión 32; antes se usaba $1.203, una cotización externa).
```

### racing-presupuesto-2025-26

_note (data/):_

```text
PDF oficial (8 páginas) bajado directo de racingclub.com.ar/informes/ — reemplaza a racing-presupuesto-2025-26-prensa (un hilo de X), ahora con el documento real: un presupuesto financiero mensual (12 columnas, jul-25 a jun-26) mucho más detallado que la cobertura de prensa. Convertido a USD con el tipo de cambio promedio que el propio presupuesto declara como premisa ($1.438), no con un tipo de cambio de cierre (todavía no cerró este ejercicio). Copia local en finance-of-sports/Clubes/Argentina/Racing/presupuesto2025-26.pdf.
```

### racing-presupuesto-2026-27

_note (data/):_

```text
PDF oficial (8 páginas, texto nativo) bajado directo de racingclub.com.ar/informes/, mismo formato que racing-presupuesto-2025-26 (presupuesto financiero mensual, 12 columnas jul-26 a jun-27). Transcripción completa en Clubes/Argentina/Racing/presupuesto2026-27.md (Versión 32). Convertido a USD con el promedio de los dos tipos de cambio que el propio presupuesto declara como premisa ($1.505 para julio 2026 y $1.870 para junio 2027) = $1.687,5 — mismo criterio que usa Boca para su Presupuesto 2027.
```

## Otros

### Gastos (racingExpenseLinesByYear), en general

```text
HOMOLOGACIÓN DE GASTOS CON BOCA (Versión 52, pedido explícito de Guido: "homologar egresos en
racing a como lo tiene Boca"). Hasta la Versión 51, "Costo transferencia de jugadores" (2009,
2010, 2011, 2024, 2025) y "Pago por adquisición de jugadores" (2026, 2027) estaban en
`other_expenses`, así que el bucket "Compra de jugadores" de Formato Simplificado (ver
GENERIC_SIMPLIFIED_EXPENSE_BUCKETS en js/finanzas-calc.js: cats:['player_amortisation',
'player_impairment']) daba SIEMPRE $0 para Racing, aunque el club gastó plata real comprando
jugadores todos estos años, esa plata estaba escondida dentro de "Otros gastos". Se reetiquetaron
esas 7 líneas a `player_amortisation` (no se tocó ningún monto, solo la categoría). Racing no
separa amortización de deterioro de pases como sí puede hacer Boca, así que todo entra a
`player_amortisation`, que junto con `player_impairment` (sin uso en Racing hoy) arma el mismo
bucket.

DOS CASOS QUE QUEDAN A PROPÓSITO EN `other_expenses` (consultados a Guido con AskUserQuestion
antes de decidir, ver también .claude/skills/club-data-mapping/SKILL.md sección 1 y .claude/skills/club-data-mapping/referencia/leer-pdf.md):
- "Pago de gastos por compraventa de jugadores" (2026, 2027): son comisiones/intermediación de
  la operación, no el costo del pase en sí. Boca no desglosa este tipo de comisión dentro de su
  bucket "Compra de jugadores" (que es solo amortización + deterioro de pases), así que meterlo
  ahí sería MENOS fiel a cómo Boca arma esa fila, no más homologado. Guido confirmó: dejarlo en
  el catch-all.
- "Egresos extraordinarios (compra de bienes de uso y mejoras, principalmente)" (2026, 2027): es
  CAPEX (plata de caja para comprar activos), un concepto distinto de "Inversiones (amortizaciones
  y depreciación)" de Boca, que es un cargo contable NO-CASH. Mezclar CAPEX con D&A rompería la
  comparabilidad que busca esta homologación, no la mejoraría. Guido confirmó: dejarlo en el
  catch-all.

SEGUNDA RONDA DE HOMOLOGACIÓN (Versión 53, pedido explícito de Guido: "las rows tienen que ser
siempre iguales entre clubes, aunque alguna tenga un cero" + "no puede ser que otros gastos tenga
64% del total... mirando los rows de Boca, podes crear nuevos y reducir ese 64%"). Se agregaron 3
categorías nuevas (`match_organisation_expense`/`youth_other_sports_expense`/
`admin_general_expense`, ver data/category-map.js), las mismas 3 filas que Boca ya usa en su
Ejercicio 2027 (`otrosGastos2027` en js/finanzas-calc.js: "Organización de partidos"/"Otras
secciones deportivas"/"Administración y gastos generales"), y se re-etiquetaron TODAS las líneas
de `other_expenses` que tenían un rubro identificable (antes: 100% de "Otros gastos" era
`other_expenses` sin distinción), dejando en el catch-all SOLO las 4 líneas ya consultadas con
Guido en la Versión 52 (compraventa de jugadores y CAPEX, ver arriba).
- `match_organisation_expense`: "Organización de partidos" (2009-2011/2024/2025) y "Pago de
  gastos por participación" (2026/2027, costo de participar en competencias: viajes,
  concentración). Mismo concepto que "Organización de Espectáculos" de Boca.
- `youth_other_sports_expense`: "Actividades deportivas y sociales" (2009-2011/2024/2025), "Pago
  de gastos fútbol amateur (activable)" y los dos sub-ítems de otras actividades deportivas de
  "Egresos de otras secciones" (2026/2027; los de instituciones educativas van a `education_expense`
  desde la Versión 550, to-do 101). Mismo concepto que
  "Fútbol Juvenil"+"Otros Deportes"+"Basket" de Boca.
- `admin_general_expense`: "Televisión AFA"/"Honorarios órgano fiduciario"/"Honorarios y otras
  contribuciones"/"Mantenimiento"/"Sellados, multas y gastos bancarios"/"Sede Villa del
  Parque" (2009-2011/2024/2025), "Pago de gastos explotación del estadio"/"Pago de gastos de
  comercialización"/"Otros egresos" (2026/2027, incluye sub-ítems de administración/impuestos/
  gastos financieros). Mismo concepto que "Administración"+"Gastos Generales"+"Comerciales"+
  "Socios"+"Eventuales" de Boca. "Colegio" (2009-2018, ver abajo) SALIÓ de esta lista en la
  Versión 194 (to-do 42): pasó a `education_expense`, que no existía todavía en la Versión 53.
- CASO CONSULTADO (Guido eligió la 1ra opción vía AskUserQuestion): "Fútbol profesional"
  (2009-2011/2024/2025) y "Pago de otros gastos deportivos fútbol profesional" (2026/2027) son
  costos NO salariales del plantel profesional (médico, indumentaria, viajes, pretemporada), la
  línea más grande de todo el catch-all (hasta ~30% de "Otros gastos" en algunos años). Se
  re-etiquetaron a `wages_squad`, NO a una categoría nueva: Boca ya mezcla este mismo tipo de
  costo dentro de su propio campo "wages" para el Ejercicio 2027 (ver
  `expenseSubBreakdown[2027]['Fútbol Profesional']` en data/ar/boca-data.js: "Gerencia de Fútbol
  Profesional" incluye Farmacia/Pretemporada/Vigilancia/Canjes/Indumentaria junto con
  Remuneraciones y Primas, y ESE total completo es lo que alimenta `r.wages` para "Salarios y
  primas" en `simplifiedReportForBoca()`), así que sumarlo a `wages_squad` en Racing sigue el
  mismo criterio que ya usa Boca, no uno inventado para esta sesión. OJO (documentado para no
  repetir la investigación): esto es distinto de cómo Boca arma su Ejercicio 2025 (balance
  auditado real), donde `wages` es una cifra de remuneraciones MÁS estricta (excluye
  médico/indumentaria/viajes, ver comentario de `yearsRaw[2025]` en data/ar/boca-data.js) — los dos
  ejercicios reales de Boca NO son 100% consistentes entre sí en este punto específico, y esta
  homologación de Racing sigue el criterio del Ejercicio 2027 (la referencia "canónica" que ya usa
  el resto de este skill/sitio para el orden y los nombres de fila).

Boca 2025 (balance auditado real) NO recibió el mismo desglose de 3 filas en esta sesión: su
dato nativo (`nativeFinancialsBoca[2025]`) SÍ tiene detalle, pero varias líneas mezclan sueldos y
gastos operativos DENTRO del mismo renglón sin desglose propio (ej. "Estadio" trae "Remuneraciones
y cargas sociales" y gastos de mantenimiento juntos) — separar esa mezcla a mano, sin un balance
de verificación automatizado como pide CLAUDE.md ("Precisión antes que velocidad"), es un riesgo
real de ensuciar un balance auditado real. Un intento de reconstrucción a mano en esta sesión dio
una diferencia de ~$4.500 M contra `otherExpenses` (-71.553,845458 M), señal de que faltaba
reconciliar algo, así que NO se cargó. Queda como to-do explícito (ver comentario en
`js/finanzas-calc.js`, función `simplifiedReportForBoca`, sección `otrosGastosDefault`): Boca 2025
muestra las 3 filas nuevas en $0 y el monto completo en "Otros gastos", igual que antes de esta
versión, hasta que alguien re-verifique la separación línea por línea contra el balance.
```

### Meta (racingFiscalYearMeta), en general

```text
currency/fx (Versión 32): ver comentario de cabecera. 2009-2011 quedan en 'USD' (amountNative ya
convertido, no re-extraído) con el mismo fx ya documentado arriba (usado para reconstruir un ARS
aproximado si se togglea a ARS). 2024 en adelante están en 'ARS' (amountNative nativo) con el fx
declarado por el propio documento (balance o presupuesto), no una cotización externa.
```

### Presupuesto al lado del balance (racingPresupuestoOverlayByYear), en general

```text
racingPresupuestoOverlayByYear (Versión 57): para un ejercicio con `reportType:
'official_budget_and_balance'` arriba (el balance real es el dato primario de ese año), acá va
el Presupuesto de ESE MISMO ejercicio, usado solo para la columna "Presupuesto" de comparación en
"Estado de resultados" (ver `presupuestoOverlayFor()`/`presupuestoOverlayReportFor()` en
js/finanzas-calc.js). Formato: mismo shape que racingRevenueLinesByYear/racingExpenseLinesByYear
(rawLabel/normalizedCategory/amountNative/items), más su propio currency/fx (puede declarar un
tipo de cambio distinto al del balance del mismo ejercicio, ver club-data-mapping/referencia/fx.md).

Ejercicio 2020 (Versión 58): primer overlay real cargado, `presupuesto2019-20.pdf` (mismo
ejercicio 1°/9/2019 al 31/8/2020 que el balance real ya cargado en racingRevenueLinesByYear
[2020]/racingExpenseLinesByYear[2020]). Es un ESCANEO (8 páginas, ~1 char/página, sin texto
nativo), transcripto con el Read tool sobre imágenes de página, corrigiendo primero un desvío
diagonal real del escaneo (~0,78°, medido maximizando la nitidez de las líneas horizontales de
la grilla con PIL antes de recortar filas) — sin esa corrección, leer una columna angosta (ej. la
de "TOTAL PERÍODO", la más a la derecha) hace que el valor de una fila "se lea" desplazado a la
fila de arriba o abajo cuanto más lejos está del borde izquierdo, un efecto acumulativo de la
inclinación. Encontrado así en esta sesión (y corregido con ayuda de Guido, que confirmó los
valores correctos mirando el PDF él mismo): antes de deskewar, la fila "9.- Cobros de otros
recursos de gestión por fútbol" parecía mostrar el mismo valor que "B. Ingresos Sociales" de la
fila de abajo (634,152 M), cuando el valor real de la fila 9 es 18 M.

CASO DE CRITERIO real encontrado en "2.- Cobranzas por participación" (Ingresos, pág. 7): el
documento imprime 606,734 M en esa fila, pero sus propios sub-ítems (d+e+f: Competiciones
oficiales S.A.F./internacionales/A.F.A.) solo suman 274,780 M. Guido explicó, mirando el PDF,
que esa cifra impresa (606,734 M) es un ACUMULADO que además incluye las filas "3.- Cobranzas
por venta de abonos" (123,154 M) y "4.- Cobros por retransmisión y derechos de TV" (208,800 M):
274,780 + 123,154 + 208,800 = 606,734 M exacto. Como el sitio carga 3 y 4 como líneas PROPIAS
separadas, usar el 606,734 M impreso para "Cobranzas por participación" duplicaría esa plata.
Se cargó acá el valor NO acumulado (274,780 M, la suma real de d+e+f), que es el que hace cerrar
"A. Ingresos provenientes de fútbol" (2.242,767 M) y el total general contra los subtotales
impresos (verificado exacto, ver comentario de verifyTieOuts en index.html).

fx = 70 (ARS por USD), la premisa macro que el propio presupuesto declara ("Estimamos un TC de
$70.- por u$d1.- en promedio para el período", pág. 2) — distinto del fx que declara el BALANCE
real de este mismo ejercicio (73,98, del Anexo V), exactamente el caso que anticipaba el
comentario de arriba: el presupuesto puede declarar su propio tipo de cambio, no hay que forzar
el mismo que el balance.
```

### racingPasesData

```text
---------------------------------------------------------------------------
Mercado de pases — placeholder, mismo estilo que los movimientos inventados
que ya tenía Boca (Jugador A, Jugador B...) desde el primer MVP.
---------------------------------------------------------------------------
```

### racingResultadosData

```text
---------------------------------------------------------------------------
Resultados deportivos — estos SÍ son reales (a diferencia de las finanzas):
buscados y verificados vía web search en agosto de 2026 (ESPN, Infobae,
La Nación, Wikipedia, sitio oficial de Racing). A cruzar contra el sitio
oficial del club antes de publicar.
---------------------------------------------------------------------------
```

### Presupuesto financiero (racingPresupuestoFinancieroByYear), en general

```text
Versión 95: registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js).
```

### gestionesByClub.racing

```text
milito.firstYear=2025 es su primer ejercicio REAL completo (balance auditado, Ejercicio
N°123); lastYear=2027 es el presupuesto vigente (Ejercicio 2026-27, todavía no cerró — el
Ejercicio 2025-26 sí cerró en jun-2026 pero el balance auditado real todavía no se publicó,
ver to-do en index.html; se actualizó de 2026 a 2027 en la Versión 32 al cargar el nuevo
presupuesto).
blanco.firstYear: mismo criterio siempre, "el ejercicio REAL más antiguo cargado de esta
gestión", no la fecha exacta en que asumió (2013). Pasó de 2024 a 2020 en la Versión 58
(balance2019-20.pdf), de 2020 a 2018 en la Versión 63 (presupuesto2017-18.pdf), y de 2018 a
2014 en la Versión 67 (presupuesto2013-14.pdf, su primer presupuesto como Presidente).
```
