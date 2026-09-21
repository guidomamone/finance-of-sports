---
name: club-data-mapping
description: Supuestos y patrones para mapear el balance/presupuesto NATIVO de un club de fútbol (categorías propias del documento, ej. "Generales/Específicos/Diversos" de Racing, o las 5 categorías de River) al esquema compartido del sitio finance-of-sports (normalizedCategory de data/category-map.js, revenueLines/expenseLines, meta fields). Usar SIEMPRE que se cargue un balance o presupuesto nuevo, de un club ya existente (un ejercicio que faltaba) o de un club completamente nuevo, antes de decidir cómo categorizar cada línea o cómo convertir a USD. El objetivo es no reinventar estos criterios cada vez: si una decisión de esta sesión contradice lo que dice este skill, o aparece un caso que el skill no cubre, actualizar el skill al terminar (ver "Cómo mantener este skill" al final).
---

# Mapeo de formato-club a formato-sitio

Este skill es la memoria de las decisiones de categorización que ya se tomaron al cargar
balances/presupuestos reales de Boca, River y Racing en `finance-of-sports`. No es una guía teórica:
cada regla de acá salió de un caso real, y dice de dónde salió. Leelo ANTES de mapear un documento
nuevo, te ahorra volver a decidir lo mismo, y evita que dos ejercicios del mismo club (o de clubes
distintos) queden categorizados con criterios diferentes sin querer.

## 0. Ubicate primero

- La taxonomía compartida ya existe en `data/category-map.js` (`REVENUE_CATEGORIES`,
  `EXPENSE_CATEGORIES`). Léela antes de inventar una categoría nueva, probablemente ya está.
  REGLA (desde la Versión 51, ya NO es "to-do pendiente"): `category-map.js` tiene que reflejar
  EXACTAMENTE los `normalizedCategory` que de verdad usan `river-data.js`/`racing-data.js`/el club
  nuevo que estés cargando, sin excepción y sin dejarlo para después. Se encontró y corrigió en la
  Versión 51 que `category-map.js` documentaba `transfer_income_gross` (categoría que NINGÚN dato
  real usaba) mientras que `racing-data.js` usaba `player_sales` desde la Versión 15/16 sin que
  nadie lo hubiera sumado a `REVENUE_CATEGORIES`/`REVENUE_CATEGORY_LABELS` — quedó desincronizado
  varias versiones porque "no bloqueaba nada" (el motor genérico igual funcionaba). Cuando agregues
  o uses una `normalizedCategory` nueva, actualizá `category-map.js` EN LA MISMA sesión, no lo
  anotes como pendiente. El motor genérico del sitio (`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
  `_EXPENSE_BUCKETS`, ahora en `js/finanzas-calc.js` desde la Versión 51, antes en index.html)
  tampoco lee `category-map.js` en vivo, tiene su propia lista de buckets hardcodeada: si tocás uno,
  sincronizá el otro a mano, para que no queden dos fuentes de verdad divergentes (ver
  `club-or-year-onboarding` sección 3 para el detalle de dónde vive cada archivo desde la
  Versión 51).
- `normalizedCategory` es una clave INTERNA, usada solo por `computeYearGeneric()` /
  `sumCat()` para armar los KPIs de arriba de Finanzas, los gráficos y `wagesToTurnover`. NUNCA se
  muestra al usuario. Lo que el usuario ve es `rawLabel`, tal cual lo escribe el club, no lo
  traduzcas ni lo "prolijes".
- El motor genérico (`computeYearGeneric`, para cualquier club que no sea Boca) espera
  `revenueLines`/`expenseLines`: arrays de `{ rawLabel, normalizedCategory, amountNative,
  disclosureLevel, items? }`. `items` (opcional) es el desglose recursivo del renglón, ver sección 4.

## 1. Elegir `normalizedCategory`: cuándo darle una propia y cuándo mandarlo a "other"

Patrón observado en los 3 clubes cargados: los rubros que son estructuralmente iguales entre
clubes de fútbol (cuotas sociales, TV, entradas/campeonatos, sponsors, sueldos del plantel,
transferencias de jugadores, depreciación) tienen su propia categoría. Todo lo demás,
específico de CADA club (ej. "Ingresos Colegio" y "Sede Villa del Parque" de Racing, que son cosas
que Racing tiene y otros clubes no), va a `other_income`/`other_expenses`. No fuerces una
categoría nueva solo porque un club tiene un rubro con nombre distinto; primero preguntate si es
conceptualmente lo mismo que ya existe (ej. "Televisión AFA" es `broadcasting`, aunque el nombre no
diga "televisación").

Mapeos ya usados (no son la lista completa de `category-map.js`, son los que ya salieron en la
práctica, agregá los que falten cuando aparezcan):

| Rubro tal cual lo reporta el club | normalizedCategory |
|---|---|
| Cuotas Sociales / Ingresos Sociales | `member_dues` |
| Televisación, Televisión AFA, derechos de TV | `broadcasting` |
| Campeonatos Oficiales, Otros Torneos, recaudación de entradas (cuando el club NO separa premios de recaudación) | `matchday_competition` |
| Cobranzas por participación, premios por avance de ronda/campeonato (SOLO si el documento fuente la reporta como línea propia, separada de la recaudación de entradas: ver regla de la sección 13, agregada Versión 46) | `competition_bonus` |
| Publicidad, sponsors, canjes comerciales | `sponsorship_commercial` |
| Transferencia de Jugadores / Cobros por venta de jugadores (ingreso) | `player_sales` (si el club NO las netea, van así, ver sección 3) |
| Costo Transferencia de Jugadores / Pago por adquisición de jugadores (gasto) | `player_amortisation` (Versión 52, ver detalle abajo: reusa la categoría de "amortización de pases" de Boca como el bucket "Compra de jugadores" aunque Racing no capitaliza/amortiza, expensa el costo completo al momento de la operación; es la aproximación más fiel disponible para que esa plata aparezca en el bucket correcto de Formato Simplificado, en vez de perderse en el catch-all) |
| Sueldos del Personal, Cargas Sociales, remuneraciones del plantel | `wages_squad` |
| Amortización/Depreciación de bienes de uso tangibles | `depreciation` |
| Previsiones, amortizaciones intangibles, cargos extraordinarios de fin de ejercicio | `other_amortisation` |
| Desafectación de previsiones/provisiones, condonaciones, resultado por quiebra | `exceptional_items` |
| Todo lo demás específico del club (colegio, sede social, alquileres, actividades varias) | `other_income` / `other_expenses` |
| Un club que agrupa gruesamente ("fútbol profesional" sin desglosar), ver regla nueva abajo antes de usar esta categoría | `lump_football_operations` (ingreso) / `lump_football_operations_expense` (gasto) |

### REGLA (agregada Versión 38, corrige un error real): antes de usar `lump_football_operations`, fijate si el documento REALMENTE no desglosa

`lump_football_operations`/`_expense` es para cuando el club de verdad no separa un rubro (ej.
"fútbol profesional" como una sola cifra, sin ningún desglose disponible en ningún lado del
documento). NO es para un renglón que el documento presenta como encabezado de grupo con líneas
numeradas debajo (ej. Racing: "A. INGRESOS PROVENIENTES DE FUTBOL" con 9 líneas "1.- COBRANZAS POR
VENTA DE ENTRADAS" a "9.- COBROS DE OTROS RECURSOS..." cada una con nombre y monto propio), eso NO
es un bolsón, es una tabla con jerarquía de dos niveles, y cada línea de abajo tiene una categoría
real identificable (entradas → `matchday_competition`, TV → `broadcasting`, marketing →
`sponsorship_commercial`, etc.).

Error real cometido y corregido: al cargar Racing 2025/26 y 2026/27 (Versión 32), estas 9 líneas se
guardaron como `items` (sub-ítems de desglose, ver sección 4) DENTRO de una única línea de primer
nivel categorizada `lump_football_operations`, visualmente correcto en "Formato del club" (el
desglegable mostraba las 9 líneas igual), pero funcionalmente roto para cualquier cálculo por
`normalizedCategory`: "Formato simplificado" mostraba Televisión/Comercial/Venta de jugadores en
$0, porque esa plata estaba **enterrada adentro de `items`**, un campo que `sumCat()` /
`computeYearGeneric()` NUNCA mira (solo suma por `normalizedCategory` de las líneas de PRIMER
NIVEL). Guido lo encontró abriendo el PDF y viendo la línea "COBROS POR RETRANSMISION Y DERECHOS DE
TV" con monto propio, cuando el sitio mostraba $0 en Televisión.

**Regla concreta**: si vas a meter algo adentro de `items` (en vez de como línea de primer nivel),
preguntate primero si esos sub-ítems tienen cada uno una categoría REAL distinta entre sí. Si la
respuesta es sí (como en el caso de Racing), promovelos a líneas de primer nivel, cada una con su
propio `normalizedCategory`, no importa que el documento los agrupe visualmente bajo un
encabezado común, lo que importa es si CADA línea tiene un concepto identificable. `items` (sub-ítems
sin categoría propia, solo agregados al padre) es para el caso contrario: cuando los sub-ítems son
todos la MISMA categoría que el padre, y se desglosan solo para mostrar más detalle sin que haga
falta que cada uno compute distinto (ej. "Torneo Oficial" de Boca, con Derechos de TV/Recaudaciones/
Premio adentro, las 3 son `matchday_competition`, desglosarlas es solo transparencia, no cambia a
qué categoría van). Si tenés dudas, la pregunta rápida es: "¿estos sub-ítems, si los sumo cada uno
a su categoría real, dan resultados de Formato Simplificado distintos a si los dejo todos en la
categoría del padre?", si sí, promovelos.

## 2. Resultados financieros (intereses, diferencias de cambio). NUNCA una línea

Intereses ganados/perdidos y diferencias de cambio NO van como `revenueLine`/`expenseLine`, ni
siquiera si el documento fuente los muestra como una línea más de "Recursos". Van netos (ingresos
menos egresos financieros) al campo `netInterest` del objeto `fiscalYearMeta` del año, igual que ya
hacen 2024/2025/2026. Motivo: es una categoría conceptualmente distinta (resultado financiero, no
operativo) y el motor ya tiene un lugar dedicado para eso, meterlo en `revenueLines` lo cuenta como
si fuera "revenue del club" cuando no lo es.

Mismo criterio para `profitOnPlayerSales`, `assetSales` y `tax`: si el documento los muestra
aparte del cuerpo principal de Recursos/Gastos, van a `fiscalYearMeta`, no a las líneas.

## 3. Transferencias de jugadores: reflejá cómo LO PRESENTA CADA CLUB, no una regla fija

Esto varió entre clubes ya cargados, y es intencional, no es una inconsistencia a corregir:

- **Racing**: el balance reporta "Transferencia de Jugadores" (ingreso) y "Costo Transferencia de
  Jugadores" (gasto) como dos líneas ordinarias separadas, sin netear. El sitio las carga IGUAL,
  separadas, no hay una línea "ganancia neta por pases" en el documento, así que inventar un
  neteo sería menos fiel que dejarlas como están.
- **Boca 2025** (`bocaRevenueLinesByYear`/`bocaExpenseLinesByYear`, motor genérico desde la Versión
  102): el balance auditado reporta las líneas brutas de transferencias/rescisión (ingreso) y sus
  costos asociados (gasto) como líneas ordinarias de `revenueLines`/`expenseLines`
  (`normalizedCategory:'player_sales'` para las de ingreso), SIN netear — mismo criterio que Racing,
  reflejando que la pág. 76 del balance las trata como Recursos/Gastos ordinarios, no aparte. Hasta
  la Versión 102 el sitio SÍ las neteaba a mano en "Ganancia por venta de jugadores"
  (`meta.profitOnPlayerSales`), con un comentario que decía que esa era "la convención del resto del
  sitio" — resultó ser incorrecto (ningún otro club migrado hace ese neteo), se corrigió.

Regla general: mirá primero si el DOCUMENTO FUENTE neteo o no. Si no neteo, no netees vos tampoco,
replicar la estructura real del club es más importante que uniformar entre clubes (para eso
existe, a futuro, la vista Premium normalizada, el free tier es "tal cual lo reporta el club").

## 4. Sub-ítems anidados: no aplanar, usar el formato recursivo

Si el documento tiene sub-grupos dentro de una categoría (ej. Racing: "Gerencia de Fútbol
Profesional" con sub-grupos "Depto Medico" y "Canjes" adentro, cada uno con sus propias líneas),
usá el formato recursivo `[label, value, items?]` en vez de aplanar todo a un solo nivel. El
renderer (`renderBreakdownRows` en `index.html`, agregado en la Versión 19) soporta profundidad
arbitraria, un item puede tener `items`, que a su vez tienen `items`. "No perder información en la
migración/carga" es un principio general del proyecto, no algo que solo aplica cuando Guido lo pide
explícitamente para un caso puntual.

Cuando un sub-grupo del documento no tiene un total propio impreso (ej. "Canjes" es solo un
subtítulo dentro de una tabla plana, sin fila de total), calculá su `value` como la suma de sus
`items`, no lo dejes en 0 ni inventes un número.

## 5. Conversión a USD: cualquier moneda nativa, no solo ARS (ver data/currency-map.js)

- **Todos los clubes tienen toggle [moneda nativa / USD] en vivo** (desde la Versión 32 de
  finance-of-sports para ARS; desde la Versión 103, CUALQUIER moneda — BRL, CLP, COP, PEN, EUR, etc.
  Ver el comentario de cabecera de `data/currency-map.js` para el modelo completo, es lectura
  obligatoria antes de onboardear un club fuera de Argentina): se guardan los montos en la moneda
  NATIVA del documento (`amountNative` de `revenueLines`/`expenseLines`, mismo campo para todos), y
  la conversión pasa en el momento de renderizar (`toDisplayValue` + `yearMetaFor`). Nunca guardes un
  valor ya convertido, para ningún club.
- **El toggle SIEMPRE es [moneda nativa del club] <-> USD, nunca entre 2 monedas no-USD
  directamente** (ej. nunca ARS<->BRL en vivo) — USD es el pivote universal, mismo criterio que
  "Comparar Gestiones" (que siempre muestra USD, sin importar el toggle). No agregues un 3er destino
  a `toDisplayValue()` sin releer el comentario de cabecera de `data/currency-map.js` primero.
- **Onboardeando un club con una moneda nueva** (que todavía no tiene entrada en
  `CURRENCY_META`, `data/currency-map.js`): agregale una entrada (`scale:1` si sus montos leen bien
  en millones — BRL, PEN, EUR — o `scale:1000` si el valor nominal es tan grande que conviene
  mostrarlo en "miles de millones" — ARS, CLP, COP). Sin esa entrada, el fallback
  `DEFAULT_CURRENCY_META` (`scale:1`, unidad "M `<código>`") nunca rompe, pero puede leer raro para
  una moneda de valor nominal grande — agregar la entrada real es preferible a dejar el fallback.

Qué tipo de cambio usar, en orden de preferencia:
0. **REGLA #1, ANTES que cualquier otra (agregada Versión 32 de finance-of-sports, sesión de carga
   de Racing): si el propio documento declara SU PROPIO tipo de cambio de cierre, usá ESE, no una
   cotización externa investigada a mano.** Buscá un Anexo tipo "Activos y pasivos en moneda
   extranjera" (Racing: Anexo VI; River: Anexo V), suele tener una columna "Tipo de Cambio" o
   "Cambio vigente al cierre" al lado de Caja y bancos en moneda extranjera. Ese es el tipo de
   cambio que el propio club usó para convertir sus partidas en USD/EUR a pesos en ESE balance,
   usarlo es más fiel a la fuente que buscar una cotización de mercado por tu cuenta, y evita que
   dos números del mismo documento (el que vos calculás con tu fx vs. el que el club ya convirtió
   con el suyo) no coincidan. Encontrado real: Racing balance 2023-24 declaraba $909 al 30/6/2024
   (se venía usando $912, una cotización externa de Rava Bursátil); Racing balance 2024-25
   declaraba $1.196 al 30/6/2025 (se venía usando $1.203); River balance 2023-24 declaraba $950,50
   al 31/8/2024 (se venía usando $953,50). Diferencias chicas (~0,3-0,6%) pero la fuente primaria
   gana. Si el documento declara varios tipos de cambio por MONEDA (ej. River: USD $950,50, EUR
   $1.049,54, CHF $1.122,36), usá el de USD — el toggle de cualquier club sigue siendo SIEMPRE
   [moneda nativa <-> USD] (ver sección 5 y `data/currency-map.js`), nunca modela multi-moneda por
   partida ni un 3er destino directo. Solo caé a las reglas 1-3 de abajo si el documento NO declara ningún tipo de cambio
   propio (ej. Racing 2009-2011, de una época sin este tipo de Anexo). **IMPORTANTE (reforzado
   Versión 103, pedido explícito de Guido: "not every usd is exactly the same")**: este `fx` es
   SIEMPRE el tipo de cambio que ESE documento puntual declaró para ESE cierre puntual — nunca lo
   reuses para otro ejercicio del mismo club, ni para otro club, ni asumas que es comparable a una
   cotización de mercado externa. "El USD de Boca 2025" y "el USD de River 2024" son 2 tipos de
   cambio de cierre distintos, cada uno el que ese documento imprimió.
1. **Ejercicio cerrado, en "moneda homogénea"/RT6** (reexpresado por inflación a una fecha
   puntual, práctica que se generalizó con la crisis de los 2020): dólar mayorista de **CIERRE**
   del ejercicio, no un promedio. Promediar mezclaría poder adquisitivo de fechas distintas cuando
   el documento ya está expresado en pesos de un solo momento.
2. **Ejercicio cerrado, ANTERIOR a esa práctica** (pesos nominales, sin reexpresar, ej. Racing
   2009-2011): igual, dólar mayorista de cierre del ejercicio, pero create tiempo extra para
   buscar la cotización histórica exacta, no siempre está disponible online con precisión diaria
   para fechas viejas (ver "Cuándo la cotización exacta no aparece" abajo).
3. **Presupuesto/proyección todavía sin cerrar**: el promedio que el PROPIO documento declara como
   premisa (buscá "tipo de cambio de referencia" o similar en el presupuesto), no un promedio
   inventado por vos. No hay "cierre" real todavía para reexpresar. Si el presupuesto declara DOS
   puntos (ej. Racing 2026-27: "$1.505 para julio 2026 y $1.870 para junio 2027") en vez de un
   promedio único, promedialos vos (mismo criterio que ya usa Boca 2027: inicio+cierre / 2).

### Cómo se ESCRIBE esa procedencia en el archivo (Versión 125): `fxSource` y `fxRef`

Las 4 reglas de arriba ya no se cuentan en un comentario: cada ejercicio declara de dónde salió su
tipo de cambio en un campo, y `node tools/audit.js` lo lee. **Un `fx` nuevo sin `fxSource` (o sin
`fxRef`) sale listado como pendiente en la auditoría**, así que esto no es opcional al cargar un
club.

Los 6 valores posibles (definidos en `FX_SOURCE`, `data/currency-map.js`) mapean uno a uno con las
reglas de arriba:

| `fxSource` | Cuándo | Regla |
|---|---|---|
| `document_close` | el balance declara su TC de cierre en su Anexo de moneda extranjera | 0 |
| `document_assumption` | el presupuesto declara un TC como premisa (todavía no hay cierre) | 3 |
| `market_close` | el documento no declara ninguno, se usó la cotización oficial de la fecha de cierre | 1 y 2 |
| `market_approx` | no se consiguió la cotización exacta: interpolada o de fecha cercana | "Cuándo la cotización exacta no aparece" |
| `placeholder` | no sale de ninguna fuente, existe para que el toggle funcione | — |
| `unknown` | cargado antes de que existiera el campo, sin rastro | — (es un to-do, no un destino) |

**`document_assumption` es una categoría propia y no un `document_close` más** (pedido explícito de
Guido: "para Presupuesto, los clubes toman assumption de FX siempre"). Un presupuesto declara un
pronóstico, que puede terminar equivocado; un balance declara un cierre ya ocurrido. Comparar un
presupuesto en USD contra un balance en USD mezcla las dos cosas, y el sitio necesita poder decirlo.

**Cómo se escribe, y por qué hay dos formas:**

```js
// El documento lo declara → el número va literal, en el archivo del club.
2024: { currency:'ARS', fx:909, fxSource:'document_close', ... }

// El documento no declara nada y se usó una cotización pública → NO se escribe el
// número acá: se referencia la entrada de FX_CLOSE (data/currency-map.js).
2025: { currency:'EUR', fxRef:'EUR@2025-06-30', ... }
```

La diferencia no es estilística, es la regla #0 otra vez: **el TC declarado por un documento es un
dato de ESE club** (dos clubes pueden declarar valores distintos para el mismo día y los dos están
bien, por eso nunca se comparte), mientras que **una cotización de mercado es un dato del mercado**,
no del club, se dice una vez en `FX_CLOSE` y la referencian todos los que la usen. Antes de la
Versión 125 las cotizaciones se copiaban club por club: el cierre del real al 31/12/2024 estaba
escrito a mano en 5 archivos, el euro al 30/6/2025 en 9 y el ¥150 de la J.League en 10.

**Si la moneda y fecha que necesitás no está en `FX_CLOSE`, agregala ahí** (con su `label`: qué
cotización es y de qué organismo, PTAX, BCRA, BNA, BCE, TRM), no en el archivo del club. Excepción:
una `market_approx` se queda como literal en el archivo del club, para que nadie la reuse desde la
tabla creyendo que es un cierre oficial.

**Lo que este campo ya encontró** (para que se entienda qué tipo de error atrapa): Unión 2024 usa
890,50 ARS/USD como cotización de mercado para el 30/6/2024, cuando Racing, Vélez y Estudiantes
declaran 909 para ese mismo cierre y el propio comentario de Unión dice "dólar BNA vendedor", que
ese día era ~912. Lo reporta `node tools/audit.js` como `fx-mercado-discrepante`.

### Guardar amountNative en la moneda nativa del club, no pre-convertido a USD (regla desde la Versión 32)

Hasta la Versión 31 de finance-of-sports, River y Racing guardaban `amountNative` YA CONVERTIDO a
USD (sin toggle de moneda), la sección 5 de este skill decía explícitamente "seguí este mismo
patrón" para clubes nuevos. Esa recomendación quedó OBSOLETA: a partir de la Versión 32, todos los
clubes cargados guardan `amountNative` en millones de su moneda NATIVA (tal cual el
balance/presupuesto — ARS, BRL, CLP, COP, PEN, EUR, lo que corresponda), con
`fiscalYearMeta[year].currency`/`fx` diciendo en qué moneda está y con qué tipo de cambio convertir,
la conversión pasa siempre al momento de renderizar (`yearMetaFor(clubId, year)` + `toDisplayValue`,
ambas en `js/finanzas-calc.js`), nunca al cargar el dato. Esto es lo que habilita el toggle
[nativa/USD] en vivo (ver `data/currency-map.js` desde la Versión 103 para el detalle de cómo se
muestra cada moneda). Si se agrega un club de un país nuevo, seguí ESTE patrón (moneda nativa + fx
en meta), no el viejo de "siempre USD, sin toggle", el toggle de moneda + Formato del
club/simplificado hoy se muestran para cualquier club con `clubs[clubId].country === 'AR'` (ver
`data/clubs.js`); si el club nuevo no es argentino, evaluar si tiene sentido un toggle análogo a su
propia moneda antes de forzar el mismo mecanismo.

Excepción documentada: si un ejercicio NO tiene tipo de cambio propio recuperable (ni declarado por
el documento, ni con una fuente externa confiable, ej. Racing 2009-2011, balances viejos sin el
Anexo de moneda extranjera) y ya se había cargado en USD ya-convertido antes de esta regla, está
bien dejarlo así (`currency:'USD'` con el fx ya usado, documentado) en vez de forzar una
re-extracción, el toggle igual funciona (reconstruye un ARS aproximado multiplicando de vuelta),
solo que es una aproximación, no el ARS nativo real. Documentalo en el comentario del año, como se
hizo con Racing 2009-2011.

### El sentido de `fx` SIEMPRE es "moneda nativa por 1 USD" — nunca al revés

**Error real, encontrado en la sesión de onboarding de España (Versión 111)**: los 10 archivos de
club guardaron `fx` como "cuántos USD vale 1 EUR" (ej. `1.172`, la cifra que cualquier buscador
devuelve para "EUR USD exchange rate") — el sentido INVERSO al que espera `toDisplayValue()`
(`js/finanzas-calc.js`), que siempre asume "unidades de moneda nativa por 1 USD" (mismo sentido que
ARS, COP, BRL, MXN, JPY: ej. ARS ~1000 por USD, no "0,001 USD por 1 ARS"). Con el sentido invertido,
el toggle a USD habría mostrado un valor ~37% más alto que el real para los 10 clubes — se encontró
y corrigió recién al mergear, releyendo cada archivo a mano.

**Por qué es fácil de cometer**: para monedas fuertes (EUR, GBP) la forma "natural" de buscar y
pensar el tipo de cambio es "1 EUR = X USD" (EUR es la moneda "grande"), lo opuesto a monedas como
ARS/COP/BRL donde "X moneda local = 1 USD" es la forma obvia. El campo `fx` de este sitio SIEMPRE
va en el segundo sentido, sin excepción por moneda.

**Chequeo automático (Versión 112)**: `checkFxSanity()` (`data/currency-map.js`, corre junto a
`verifyTieOuts()` al cargar el sitio) compara cada `fx` contra `FX_PLAUSIBLE_RANGE` (rango
plausible por moneda, ej. EUR: 0,7-1,15) y tira un `console.warn` si algo parece invertido o con el
orden de magnitud equivocado. No reemplaza la verificación manual (`verifyTieOuts()` sigue siendo el
chequeo real de que los TOTALES cierran), pero hubiera marcado el bug de España de inmediato en vez
de necesitar una relectura completa al mergear. Si onboardeás una moneda nueva sin entrada en
`FX_PLAUSIBLE_RANGE`, agregala (mismo criterio que `CURRENCY_META`) — un rango ausente simplemente
no se chequea, no rompe nada.

### Cuándo la cotización exacta no aparece

Para fechas viejas (años 2009-2011 en este proyecto) las fuentes web no siempre tienen la
cotización de un día puntual. Ahí se usó: (a) la cotización real más cercana en fecha si se
encuentra una (ej. una nota de diario de esa semana), o (b) interpolación LINEAL entre los valores
de apertura y cierre de año calendario publicados por sitios de cotización histórica. Sea cual sea,
DOCUMENTALO como aproximación (no como cifra exacta) en el comentario del código Y en el `note` de
`sources{}` en `data/clubs.js`, la próxima sesión (o Guido) tiene que poder distinguir "esto es
exacto" de "esto es una estimación razonable".

## 6. Verificación antes de cargar (no es opcional)

1. Sumá tus propias `revenueLines`/`expenseLines` y confirmá que cierran contra el subtotal que
   imprime el DOCUMENTO fuente para esa misma categoría, no confíes en tu propia suma sin
   cruzarla contra algo externo.
2. Sumá `revenue + expenses + netInterest` (+ otros meta fields que correspondan) y confirmá que
   da el RESULTADO FINAL / Superávit / Déficit que imprime el balance. Este es el check más fuerte
   porque es un solo número inambiguo, no depende de cómo categorizaste cada línea individual.
3. Si el documento etiqueta algo como "(Pérdida)" o "(Ganancia)", NO asumas que el signo/rótulo es
   correcto, sumá vos y confirmá. Ya pasó (Racing 2011) que el documento arrastraba un rótulo de
   plantilla del año anterior sin actualizar, con el número real de signo contrario al rótulo.
4. Si el propio documento agrupa categorías distinto según el año (ej. a veces incluye
   Amortizaciones en el total de Gastos impreso, a veces no, pasó en varios balances viejos de
   Racing), NO fuerces un check automático de `verifyTieOuts()` comparando tu total contra un
   número que en realidad significa algo distinto de un año a otro. Preferí documentar la
   verificación a mano en un comentario, explicando la inconsistencia, antes que agregar un check
   automatizado frágil que puede parecer que "no cierra" por una diferencia de definición, no de
   datos.
5. **Usá SIEMPRE la columna "año corriente" del balance DE ESE MISMO ejercicio, nunca la columna
   comparativa de un balance posterior** (encontrado real, Versión 32: Racing). Un balance en
   "moneda homogénea"/RT6 REEXPRESA el ejercicio anterior (la columna comparativa) al poder
   adquisitivo de la fecha de cierre del balance ACTUAL, cada vez que se imprime un balance nuevo,
   por eso la columna "2024" que aparece DENTRO del balance de 2025 (como comparativo) NO es el
   mismo número que la columna "2024" que aparece como año corriente DENTRO del balance de 2024
   (están reexpresadas a fechas de cierre distintas). Ejemplo real: el balance 2024-25 de Racing
   imprime $92.529.945.669 de recursos ordinarios en su columna comparativa "2024"; el balance
   2023-24 (el de ESE ejercicio) imprime $66.367.712.489 como su propio año corriente, son el
   mismo concepto pero reexpresado a dos fechas distintas, mezclarlos sería inflar o falsear el
   ejercicio 2024. Regla: para cargar el ejercicio N, andá siempre al balance/presupuesto CUYO año
   corriente ES N, nunca a la columna comparativa de un balance de N+1.

## 7. Atribución de gestión: solo si estás seguro

`fiscalYearMeta[year].gestionId` y las entradas de `gestionesByClub` son documentación, no algo
que el motor use para filtrar el selector "Año a año" (ese selector lee directo
`Object.keys(fiscalYearMeta)`, cualquier año ahí aparece automáticamente sin necesitar gestión).
Por eso: si no podés confirmar con confianza quién presidía el club en ese ejercicio puntual (pasó
con Racing 2009-2011, época de fideicomiso/quiebra sin presidencia electa clara), dejá
`gestionId: null` y NO agregues una entrada a `gestionesByClub`. El año sigue cargado y visible en
"Año a año", solo no participa de "Por gestión"/"Comparar Gestiones" hasta que alguien confirme la
atribución. Mejor un año sin gestión asignada que una gestión inventada.

## 8. Antes de asumir que un PDF es fácil de extraer, medilo

No asumas que "los PDFs de este club tienen texto extraíble" solo porque fue cierto para los años
que ya se cargaron, verificalo por año/documento con `pdftotext archivo.pdf - | wc -c` dividido
por la cantidad de páginas (`pdfinfo archivo.pdf`). Si da ~1 char/página, es un escaneo sin capa de
texto, necesita el Read tool sobre imágenes de página (mucho más caro en tokens), no
`pdftotext`+Python. Ya pasó que una nota de sesión anterior decía "todos estos PDFs tienen texto
extraíble" y era cierto solo para 3 de los 24 documentos del archivo, quedó corregido, pero
volvé a medir en vez de confiar en una nota vieja sin re-verificar contra el archivo real.

## 9. Leer un PDF fuente: texto nativo vs. OCR con el Read tool, y cómo destranquear (deskew) un escaneo torcido

(Movida acá desde `club-or-year-onboarding/SKILL.md` en la Versión 62, junto con las secciones 10 y
11: son sobre CÓMO leer un documento fuente correctamente, el mismo tema que la sección 8 de arriba,
no sobre el proceso de la sesión — vivían separadas de esta sección por casualidad de cuándo se
escribió cada una, no por diseño.)

Antes de abrir un PDF nuevo con el Read tool, probar `pdftotext -layout archivo.pdf -` primero: si
devuelve texto real (no basura ni vacío), es MUCHO más barato en tokens que renderizar página por
página como imagen. Si `pdftotext` da vacío o basura, el PDF es un escaneo puro y hay que usar el
Read tool sobre las páginas como imágenes — ver el registro por documento de qué tipo es cada uno en
`fuentes/Argentina/Racing.md` (ver el índice en `fuentes/_indice/Argentina.md`), ya tiene el resultado de
probar los ~24 documentos del archivo oficial de Racing.

**Si el escaneo aparece torcido (inclinado en diagonal)**: leer así arrastra error acumulado hacia
los bordes de la página — una fila puede leerse como si perteneciera a la fila de arriba o de abajo
cuanto más lejos está del punto de referencia, y el error crece hacia la columna de totales (el
borde derecho), justo donde más importa que el número sea exacto. Esto pasó de verdad en la Versión
58 con `Clubes/Argentina/Racing/presupuesto2019-20.pdf`: se leyó inicialmente la fila "9.- Cobros de
otros recursos de gestión por fútbol" como 634.152.050 cuando el valor real (confirmado por Guido)
era 18.000.000 — en realidad se estaba leyendo la fila de ABAJO ("B. Ingresos Sociales") por el
corrimiento diagonal acumulado.

Receta de corrección (deskew), la que se usó y funcionó:
1. Renderizar la página a alta resolución: `pdftoppm -r 300 -f N -l N archivo.pdf pagina` (300 DPI,
   página N).
2. Con Python/PIL, probar un rango de ángulos de rotación pequeños (ej. -2° a +2° en pasos de
   0.1°-0.2°) sobre la imagen, y para cada ángulo calcular la VARIANZA de los promedios de brillo por
   fila de píxeles (`np.array(img.convert('L')).mean(axis=1)`, luego `.var()` de esa serie).
3. El ángulo que da la varianza MÁS ALTA es el que mejor alinea las líneas horizontales de la grilla
   del documento (más nítidas = filas mejor separadas = mejor lectura). Para
   `presupuesto2019-20.pdf` dio ~0.78°.
4. Rotar la imagen ese ángulo exacto (`img.rotate(angle, expand=True, fillcolor='white')`) y volver a
   leerla con el Read tool. Con la corrección aplicada, todas las lecturas posteriores coincidieron
   exacto con lo que confirmó Guido.

Este script se arma una vez por documento torcido (no hay una herramienta ya armada en el repo, es
un script de Python ad-hoc en el momento) — si un PDF futuro aparece igual de inclinado, repetir esta
misma receta en vez de intentar leerlo a ojo o pedirle a Guido que lo enderece él.

**Caso DISTINTO, no confundir con el deskew de arriba: una tabla escaneada en landscape "acostada"
dentro de una página portrait.** Encontrado en `presupuesto2018-19.pdf` (páginas 8-9, las tablas de
Ingresos/Egresos): la imagen NO está inclinada en diagonal (el deskew de arriba no aplica, un ángulo
de -2°/+2° no la arregla), está rotada 90° entera — el documento original era una planilla ancha
(rubros + 12 meses + Total) impresa en horizontal, y el escaneo la guardó como una página vertical
más. Se lee "técnicamente" sin rotar (el texto no sale espejado ni al revés), pero en un orden RARO:
la fila "Total"/"Subtotal" de cada bloque aparece ANTES que su propio desglose (columnas del
documento original leídas como si fueran filas), lo que hace mucho más lento y propenso a error
mapear cada número a su rubro correcto. Señal de alerta: si una tabla escaneada se lee de arriba
hacia abajo con el TOTAL primero y el detalle debajo (en vez del orden natural rubro→detalle→total),
sospechar de esto antes de transcribir a mano en ese orden confuso.

Arreglo (no es deskew, es una rotación de 90° exacta, mucho más simple):
1. Renderizar la página completa (`pdftoppm -r 300 -f N -l N archivo.pdf pagina`, misma herramienta
   que el deskew, pero sin necesidad de probar ángulos).
2. Con Python/PIL, `img.rotate(90, expand=True)` (o `-90`, probar los dos: el que da la tabla más
   larga que ancha, VS. más ancha que larga, con los rubros leyéndose de arriba hacia abajo en la
   columna izquierda y los meses como columnas hacia la derecha, es el correcto — si el resultado
   sale al revés/espejado, es el ángulo contrario).
3. Leer la imagen rotada con el Read tool: ahora el rubro está a la izquierda, los meses (sep-XX a
   ago-XX) son columnas hacia la derecha, y "Total del Período" es la última columna — el orden
   natural de cualquier planilla, mucho más fácil de auditar contra el PDF que la versión sin rotar.

No hace falta combinar esto con el deskew de arriba salvo que la tabla ADEMÁS esté inclinada en
diagonal (no fue el caso en `presupuesto2018-19.pdf`, pero si aparece, rotar primero 90° y recién
después medir el ángulo de deskew sobre la imagen ya rotada).

## 10. La "fila acumulada": un subtotal impreso puede incluir OTRAS líneas separadas, no solo sus hijos visuales

Trampa real encontrada en la Versión 58 (`Clubes/Argentina/Racing/racing-presupuesto-2019-20.pdf`,
fila "2.- Cobranzas por participación"): el documento imprimía 606.734.000 para esa fila, pero sus
propios sub-ítems visibles (d+e+f, indentados debajo de ella) sumaban solo 274.780.000 — una
diferencia de 331.954.000 que en un primer momento pareció un error del documento o una duda sobre
qué número cargar.

La explicación real, que dio Guido: la fila no es un subtotal de sus hijos visuales nomás, es un
ACUMULADO que TAMBIÉN suma otras 2 líneas que el documento lista por separado más abajo ("3.-
Cobranzas por abonos estadio" y "4.- Cobros por retransmisión"): 274.780.000 + 123.154.000 +
208.800.000 = 606.734.000, exacto. Cargar el número acumulado (606.734.000) como si fuera el valor
propio de esa fila hubiera significado CONTAR DOS VECES los ítems 3 y 4, que ya se cargan como sus
propias líneas independientes — el criterio correcto fue cargar el valor NO acumulado (274.780.000,
la suma real de sus propios hijos) para esa fila puntual.

Señal de alerta genérica (no específica a este documento): si una fila con sub-ítems visibles no
reconcilia contra la suma de esos sub-ítems, Y la diferencia coincide (exacta o casi) con el valor de
alguna OTRA fila del mismo documento, es señal de que se trata de un acumulado que incluye esa otra
fila, no un error de transcripción ni un dato a elegir a criterio propio. Antes de cargar cualquier
fila con esta pinta: sumar sus hijos visibles, compararlo contra el valor impreso de la fila, y si no
cierra, buscar qué otra(s) fila(s) del documento explican la diferencia antes de asumir nada — y si
no se encuentra una explicación clara, preguntarle a Guido con la especificidad de la sección 11, no
elegir un criterio unilateralmente.

## 11. Pedir ayuda a Guido para leer algo ilegible: siempre página + fila + columna exactos

**Esto NO es una pausa preventiva por "el PDF se ve difícil".** Un escaneo denso, muchas páginas,
una tabla en landscape rotado, una inclinación diagonal — ninguno de esos es motivo para frenar y
preguntar antes de empezar. El default de este skill es seguir adelante solo: renderizar a más DPI,
rotar, deskewar (sección 9), cruzar contra los subtotales impresos (sección 6) para confirmar que
la lectura cierra. Preguntarle a Guido es el ÚLTIMO recurso, para UN número puntual concreto que
sigue sin poder confirmarse con certeza después de intentar todo lo de arriba (o que no reconcilia
y ninguna fila del documento explica la diferencia, sección 10) — nunca una pregunta abierta tipo
"¿podés ayudarme con este PDF, está complicado?" antes de siquiera intentar leerlo.

Lección de la Versión 58: una pregunta genérica sobre una discrepancia de lectura ("no me cierra tal
cosa, ¿podés revisar?") no es útil — Guido respondió literal *"no entiendo exactamente que querés
que revise. sé más especifico. que numero, que fila, que pagina en el pdf"*. La pregunta específica
que sí funcionó fue, literal: "página 7, fila '9.- Cobros de otros recursos de gestión por fútbol',
columna B (o la que corresponda) — leo 634.152.050, ¿es correcto?", con captura de pantalla de esa
zona puntual del PDF si hace falta.

REGLA para cualquier sesión futura: cuando algo de un PDF (escaneado o no) no se lee con certeza o no
reconcilia, la pregunta a Guido SIEMPRE tiene que incluir: (1) el número exacto de página del PDF,
(2) el nombre exacto de la fila/rubro tal cual está impreso, (3) qué columna (si el documento tiene
más de una), y (4) el número que se está leyendo (aunque se sospeche que está mal), para que Guido
pueda confirmar o corregir sin tener que adivinar de qué parte del documento se está hablando. Nunca
preguntar "¿esto está bien?" sin esas 4 cosas.

## 12. "Formato simplificado": cada fila tiene que ser un acordeón, nunca `items:null`

REGLA (agregada Versión 40 de finance-of-sports, pedido explícito de Guido: "es mi manera de hacerte
un control"): a diferencia de "Formato del club" (que siempre mostró el desglose real vía `items`),
"Formato simplificado" arrancó con TODAS sus filas en `items:null`, se veía el número ya
reclasificado, pero no había forma de auditar de qué campo(s) nativo(s) salió esa reclasificación
sin cambiar de toggle y buscar a mano. Guido lo pidió como su forma de controlar el trabajo de
categorización: cada fila de Formato Simplificado tiene que poder abrirse y mostrar la cuenta.

**CORRECCIÓN (esta sesión, encontrado auditando el skill contra el código real): esto YA ESTÁ
implementado también para River/Racing, no está pendiente.** Esta sección decía "implementado por
ahora SOLO para Boca... River/Racing siguen con `items:null`, pendiente" durante ~20 versiones
después de que dejó de ser cierto — `bucketize()` (`js/finanzas-calc.js`) arma `items` para cada
bucket desde la Versión 42 (el comentario del propio código, justo arriba de `bucketize()`, dice
"ACORDEÓN DE CONTROL (Versión 42, extiende a River/Racing la regla de la Versión 40, ver
club-data-mapping SKILL.md sección 12)" — un session pasado hizo el trabajo y dejó un puntero de
vuelta a ESTA sección, pero nadie actualizó la sección en sí). Regla para el futuro: cuando un
comentario de código diga "ver SKILL.md sección N" para marcar que resolvió algo que esa sección
tenía como pendiente, ESE es el momento de volver acá y sacar el "pendiente" — no alcanza con que el
código lo diga, alguien tiene que cerrar el loop en el skill también. El criterio de acordeón que
sigue abajo ya aplica hoy a los 3 clubes:

- Un bucket que agrupa una sola `normalizedCategory` con una sola línea real: `items` = esa línea
  con su propio desglose (`line.items`) si lo tiene, o una fila `[line.rawLabel, line.amountNative]`
  si no, igual que ya hace `revenueDetailOrLeaf()` para Boca (nunca dejar el bucket sin nada que
  mostrar al abrirlo, aunque sea solo la confirmación de qué línea es).
- Un bucket que suma VARIAS `revenueLines`/`expenseLines` (mismo `normalizedCategory` repetido, o el
  catch-all "Otros"/"Otras secciones..."): `items` = una tupla `[rawLabel, amountNative, line.items
  || null]` por cada línea que aporta a la suma, mismo patrón que `revenueComponentTuple()`.
- Nunca inventar un número nuevo para armar el desglose: reusar por referencia los mismos
  `revenueLines`/`expenseLines`/`items` que ya alimentan "Formato del club", el desglose de Formato
  Simplificado tiene que ser trazable 1:1 a esos datos, no una aproximación ni un resumen.
- Si un año/ejercicio no tiene más nivel de detalle disponible que el campo nativo ya sumado (la
  mayoría de los ejercicios viejos de Boca, por ejemplo), la fila igual lleva `items` con una sola
  fila que confirma de qué campo salió, la ausencia de MÁS desglose no es excusa para volver a
  `items:null`, es simplemente un acordeón de un solo renglón.

Verificación (no opcional, mismo criterio que la sección 6 de arriba): después de agregar `items` a
Formato Simplificado, abrir CADA fila en el navegador y confirmar que la suma de sus sub-ítems
cierra exacto contra el `value` de la fila padre, no alcanza con que el código "se vea bien", ya
pasó (sección 1 de este skill, Versión 38) que un desglose mal armado puede pasar
`verifyTieOuts()` sin problema y aun así estar mostrando datos incorrectos en pantalla.

## 13. REGLA PERMANENTE (Versión 46, pedido explícito de Guido): "Formato Simplificado" de
CUALQUIER club tiene que usar el mismo set de categorías y la misma lógica que ya usa Boca, nunca
un set diseñado por separado para el motor genérico

El objetivo de "Formato simplificado" es poder comparar clubes entre sí con las MISMAS categorías.
Guido pidió explícito: "utiliza para todos los Formato Simplificado el formato que tiene Boca y la
logica." Esto es la fuente de verdad de ese pedido, para cualquier club nuevo o cambio futuro a
`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS`.

**ACTUALIZADO Versión 102**: hasta esa versión, Boca tenía su PROPIA función
`simplifiedReportForBoca()`, hand-coded para reproducir a mano estas mismas categorías/orden (porque
Boca todavía no tenía `normalizedCategory` en sus datos). Esa función se borró: Boca ahora lee
`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` en vivo, igual que
cualquier otro club — ya no hay 2 fuentes de verdad que mantener sincronizadas a mano. El resto de
esta sección (investigación de la Versión 46, reglas 47-49) sigue siendo la razón histórica de POR
QUÉ estos buckets tienen los nombres/orden que tienen; leerla igual antes de tocar los buckets.

**Categorías/lógica de referencia (las que ya usaban `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
`_EXPENSE_BUCKETS`, calcadas en su momento de la función Boca-only que existía hasta la Versión
101):**
- Ingresos: Cuotas Sociales, Comercial / Sponsors, Estadio (recaudación de partidos + Televisión +
  Premios por competencias, combinados en una sola fila "Estadio (TV y premios incluidos)" cuando
  el documento fuente no separa esos 3 conceptos, o como 3 filas propias cuando sí los separa),
  Abonos, Venta de Jugadores, Otras secciones deportivas y otros ingresos (catch-all).
- Gastos: Compra de jugadores (amortización + deterioro de pases), Salarios y primas (plantel y
  cuerpo técnico), Inversiones (amortizaciones y depreciación), Otros gastos (catch-all).

**REGLA NO OPCIONAL: si el documento/dato fuente de un club NO permite separar/categorizar de esta
misma manera, NO decidas solo cómo resolverlo (inventar una categoría nueva, dejarlo en un
catch-all sin avisar, forzar una aproximación). Consultale a Guido primero, mostrando exactamente
qué discrepancia encontraste (con datos concretos, no en abstracto) y qué opciones hay.**

**Investigación real hecha en la Versión 46 (evita repetir esta investigación de cero la próxima
vez que se toque esto), comparando la categorización de Boca contra los datos reales YA cargados
de River/Racing:**
- River (único año real hoy: 2024): el 66,7% del revenue vive en UNA sola línea sin desglosar
  ("Fútbol Profesional", `lump_football_operations`): la plata de recaudación de entradas,
  Televisión y premios está mezclada ahí adentro, sin `rawLabel`s propios que permitan separarla
  como hace Boca. La línea etiquetada `matchday_competition` ("Estadio") en realidad son
  Concesiones/Museo/Alquileres/Estacionamiento, NO recaudación de entradas. `season_tickets` no se
  usa para River 2024 en absoluto ("Abonos y aranceles varios" está enterrado como sub-ítem de
  otra categoría). El catch-all de Gastos ("Otros gastos") es ~80% del total.
- Racing: en `matchday_competition` conviven ventas de entradas y "cobranzas por participación"
  (premios/bonos por competencia). En los presupuestos 2026/27 el documento fuente SÍ las separa
  en 2 líneas propias ("Cobranzas por venta de entradas" vs. "Cobranzas por participación"), pero
  hoy las 2 quedan bajo el mismo bucket. `season_tickets` solo existe (y mapea limpio a "Abonos")
  en los presupuestos 2026/27, no en los balances cerrados. El catch-all de Gastos ronda 53-77%
  según el ejercicio (solo `wages_squad` está cubierto con categoría propia; compra de jugadores,
  gastos de comercialización, administración/impuestos/financieros e inversiones caen todos en
  "Otros gastos").
- Conclusión: emparejar Ingresos con la lógica de Boca es factible para Racing (los datos ya
  separan recaudación de premios en los presupuestos, solo falta re-etiquetar/nueva categoría) pero
  NO para River con los datos actuales (la fuente real no tiene ese desglose disponible salvo que
  se vuelva a leer el balance original a buscarlo). Emparejar Gastos con la lógica de Boca (4
  categorías chicas + catch-all chico) requiere re-categorizar bastantes líneas de
  `data/racing-data.js`/`data/river-data.js` que hoy están en `other_expenses`/`other_income`
  genérico, en vez de una categoría específica, es un trabajo real de re-mapeo, no un cambio
  cosmético de buckets.
- **Decisión de Guido (Versión 46, presentada con `AskUserQuestion` antes de tocar nada, ver
  entrada Versión 46 en `finance-of-sports-project.md` para el detalle completo)**: Ingresos de Racing,
  SÍ separar (ya implementado: categoría `competition_bonus` nueva, líneas de
  `data/racing-data.js` re-etiquetadas, bucket "Premios por competencias" agregado a
  `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`). Ingresos de River, dejarlo como está por ahora (no se
  reextrajo el balance). Gastos de los 2 clubes, por ahora no re-categorizar (solo se renombraron
  los buckets existentes para que coincidan con el vocabulario de Boca: "Compra de jugadores",
  "Salarios y primas (plantel y cuerpo técnico)", "Inversiones (amortizaciones y depreciación)").

**EXTENDIDO Versión 47 (Guido: "la tabla tiene que quedar exactamente igual ordenada tambien. el
orden importa")**: no alcanza con que los nombres coincidan, el ORDEN de las filas también tiene
que calzar con Boca. Orden de referencia de Ingresos (el que arma `simplifiedReportForBoca()` para
el Ejercicio 2027, el único con el desglose completo): Cuotas Sociales, Comercial / Sponsors,
Estadio, Televisión, Premios, Abonos, Venta de Jugadores, catch-all. Orden de Gastos:
Compra de jugadores, Salarios y primas, Inversiones, catch-all. Cualquier categoría que agregues a
`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS` a futuro tiene que insertarse en la
posición que le correspondería si Boca tuviera esa misma fila, no al final por comodidad.

**Categorías-excepción sin equivalente en Boca (hoy: "Fútbol profesional (sin desglosar por la
fuente)") llevan `hideIfZero:true`**: Guido pidió sacar esa fila de Racing porque estaba en $0 (ver
Versión 47 en `finance-of-sports-project.md`). Como esa categoría no existe en el vocabulario de Boca,
mostrarla en $0 para un club/año que sí tiene todo bien desglosado (como pasa con Racing desde el
fix de la Versión 38) era una fila extra que rompía la promesa de "exactamente igual que Boca". La
regla NO es "esconder cualquier fila en $0" (eso rompería la transparencia de mostrar $0 real
cuando corresponde, ej. "Venta de Jugadores" de un club que no vendió a nadie ese año, que Boca
también muestra en $0): es específica de las categorías que NO tienen equivalente en Boca. Cuando
ese bucket sí tiene plata real (ej. River 2024, 67% del revenue en "Fútbol Profesional" sin
desglosar), la fila se sigue mostrando igual que siempre.

**REFORZADO Versión 48 (Guido: "urnifica, tienen que ser exactamente iguales los nombres.
homologar")**: "parecido" no alcanza, tiene que ser IDÉNTICO carácter por carácter contra
`simplifiedReportForBoca()`. Bug real encontrado: `'Televisión'` (Boca) vs. `'Televisión / Derechos
de TV'` (motor genérico) para la misma categoría (`broadcasting`): sobrevivió 3 versiones (44-47)
sin corregirse porque nunca se comparó letra por letra, solo "se parece". Antes de dar por
homologado un label, copiarlo LITERAL del código de Boca (copy-paste del string, no reescribirlo de
memoria), o comparar los dos arrays lado a lado explícitamente.

**REGLA PERMANENTE Versión 49 (Guido: "el row Estadio y el row Entradas/Abonos conceptualmente son
parecidos. Yo quiero que en Estadio esten las entradas que vende el club, y en Abonos los
Abonos/Season tickets")**: son dos conceptos DISTINTOS de venta de acceso al estadio, no un mismo
concepto repartido en dos filas, y el label de cada fila tiene que dejarlo claro:
- **"Estadio: recaudación de partidos"** (o "Estadio (TV y premios incluidos)" en años sin el
  desglose fino): entradas que el club vende PARTIDO POR PARTIDO (walk-up / single-match tickets),
  sea el canal de venta que sea. En Boca es `r.exhibicionEspectaculos` (o su desglose 2027). En
  River/Racing es la categoría `matchday_competition`.
- **"Abonos"** (a secas, SIN la palabra "Entradas" adelante, sacada en esta versión justamente
  porque generaba la confusión de que había entradas repartidas entre las dos filas): abonos/season
  tickets, la plata de quien paga por adelantado un asiento fijo para TODA la temporada (palcos,
  plateas, cocheras en el caso de Boca), no partido por partido. En Boca es `r.abonos`. En
  River/Racing es la categoría `season_tickets`.

Si en el futuro se carga un club/ejercicio nuevo, mapeá cada rubro de venta de acceso al estadio a
UNA de estas dos categorías según esa misma pregunta ("¿esto se paga por partido o por temporada
completa?"), nunca a un label combinado tipo "Entradas / Abonos" que sugiera que la distinción no
importa.

**HOMOLOGACIÓN DE GASTOS DE RACING, HECHA EN LA VERSIÓN 52 (pedido explícito de Guido: "homologar
egresos en racing a como lo tiene Boca")**: hasta la Versión 51, esta sección decía que el lado de
Gastos se había dejado "solo renombrado" (ver párrafo "Decisión de Guido" arriba, todavía vigente
para el resto del detalle), sin re-categorizar ninguna línea real. Eso cambió en la Versión 52, solo
para el bucket "Compra de jugadores" (`player_amortisation`/`player_impairment`):

- Reetiquetadas a `player_amortisation` (antes `other_expenses`, ver comentario completo en
  `data/racing-data.js` justo antes de `racingExpenseLinesByYear`): "Costo transferencia de
  jugadores" (2009, 2010, 2011, 2024, 2025) y "Pago por adquisición de jugadores" (2026, 2027). Sin
  esto, "Compra de jugadores" daba $0 para Racing en TODOS los años, aunque el club gastó plata real
  comprando jugadores, esa plata estaba enterrada en el catch-all "Otros gastos".
- Dos casos quedaron a propósito SIN re-categorizar, consultados con `AskUserQuestion` antes de
  decidir (mismo criterio que exige la REGLA NO OPCIONAL de esta sección): "Pago de gastos por
  compraventa de jugadores" (comisiones/intermediación, 2026/27) y "Egresos extraordinarios (compra
  de bienes de uso y mejoras, principalmente)" (CAPEX, 2026/27). Guido confirmó dejar los dos en
  `other_expenses`: el primero porque Boca tampoco separa comisiones de compraventa dentro de su
  bucket "Compra de jugadores" (que es solo amortización + deterioro de pases), meterlo ahí sería
  MENOS fiel a Boca, no más homologado; el segundo porque es CAPEX (plata de caja para comprar
  activos), un concepto distinto de "Inversiones" de Boca (amortización + depreciación, un cargo
  contable NO-CASH), mezclarlos rompería la comparabilidad en vez de mejorarla.
- Los buckets "Salarios y primas" e "Inversiones" de Racing ya estaban bien categorizados desde
  antes de la Versión 52 (`wages_squad`, `depreciation`, `other_amortisation`), no se tocaron.
- Nota de fondo para cualquier categorización futura de "Compra de jugadores" en un club nuevo:
  Boca SÍ distingue amortización (cargo contable por capitalizar y depreciar el pase a lo largo del
  contrato) de deterioro (`playerImpairment`, un cargo por pérdida de valor). Racing no capitaliza,
  expensa el costo completo de la operación al momento en que ocurre, así que no hay una
  amortización/deterioro real que separar, todo entra a `player_amortisation` sola. Es una
  aproximación (mismo espíritu que el resto de este skill: "no siempre hay un mapeo perfecto,
  documentar la aproximación es mejor que forzar una separación que el dato no tiene").

**SEGUNDA RONDA, VERSIÓN 53 (Guido: "en 'formato simplificado', las rows tienen que ser siempre
iguales entre clubes, aunque alguna tenga un cero" + "no puede ser que otros gastos tenga 64% del
total... mirando los rows de Boca, podes crear nuevos y reducir ese 64%")**: la Versión 52 solo
había resuelto "Compra de jugadores". El resto de "Otros gastos" de Racing seguía siendo, según el
ejercicio, entre 39% y 64% del total, muy por encima de lo que Boca 2027 (la referencia) muestra en
su propio catch-all (0%, ver más abajo). Se agregaron 3 categorías nuevas a
`EXPENSE_CATEGORIES`/`EXPENSE_CATEGORY_LABELS` (`data/category-map.js`), las MISMAS 3 filas que
Boca ya arma a mano en `otrosGastos2027` (`js/finanzas-calc.js`): `match_organisation_expense`
("Organización de partidos"), `youth_other_sports_expense` ("Otras secciones deportivas (juvenil,
otros deportes, básquet)") y `admin_general_expense` ("Administración y gastos generales"). Se
agregaron como 3 filas nuevas a `GENERIC_SIMPLIFIED_EXPENSE_BUCKETS`, en el mismo orden que usa
Boca, y se re-etiquetaron TODAS las líneas de `data/racing-data.js` que tenían un rubro
identificable (ver el comentario extenso en ese archivo, justo antes de `racingExpenseLinesByYear`,
para el mapeo línea por línea completo). Resultado: el catch-all de Racing bajó a 18% (Presupuesto
2026/27) y 0% (Ejercicio 2024/25, donde SÍ había rubro identificable para el 100% de lo que antes
era "Otros gastos").

**REGLA PERMANENTE agregada en esta ronda**: las filas de "Formato Simplificado" de Gastos son
SIEMPRE las mismas 7 (Compra de jugadores / Salarios y primas / Inversiones / Organización de
partidos / Otras secciones deportivas / Administración y gastos generales / Otros gastos) para
CUALQUIER club/año que NO tenga el desglose de 3 filas disponible: esos años muestran las 3 filas
nombradas en $0 y el monto real completo en "Otros gastos", en vez de directamente no mostrar la
fila (la fila en $0 no es "esconder", es "no tenemos cómo separar esto todavía", mismo espíritu que
otras zonas del sitio que muestran $0 con una nota cuando el dato real no está disponible, ej.
`debtDisclosureNote`). Desde la Versión 102 (Boca migrada al motor genérico) hay UN SOLO lugar donde
agregar un bucket nuevo, `GENERIC_SIMPLIFIED_EXPENSE_BUCKETS`, usado por todos los clubes por igual
— ya no hace falta mantener 2 motores en paridad.

**CASO CONSULTADO, Guido eligió sumarlo a "Salarios y primas"**: "Fútbol profesional"
(2009-2011/2024/2025 de Racing) y "Pago de otros gastos deportivos fútbol profesional" (2026/27),
costos NO salariales del plantel profesional (médico, indumentaria, viajes, pretemporada), la línea
más grande de todo el catch-all viejo. Se re-etiquetaron a `wages_squad`, no a una categoría nueva,
porque Boca YA mezcla este mismo tipo de costo dentro de su propio total `wages_squad` para el
Ejercicio 2027 (`bocaExpenseLinesByYear[2027]` en `data/boca-data.js`, línea "Fútbol Profesional —
Remuneraciones y primas", incluye Farmacia/Pretemporada/Vigilancia/Canjes junto con
Remuneraciones/Primas dentro de sus propios `items`, y ESE total completo alimenta `wages_squad`).
OJO, matiz importante para no repetir la investigación: esto es distinto de Boca 2025 (balance
auditado real, migrado al motor genérico en la Versión 102), donde cada departamento se partió en 2
líneas (Remuneraciones / Otros gastos operativos) — ahí `wages_squad` SÍ es una cifra de
remuneraciones estricta que excluye esos costos operativos (quedan en `admin_general_expense`/
`youth_other_sports_expense`, ver comentario de cabecera de `data/boca-data.js`) — los 2 ejercicios
reales de Boca no son 100% consistentes entre sí en este punto puntual, y esta homologación de
Racing sigue el criterio del Ejercicio 2027 por ser la referencia canónica que ya usa el resto de
este skill para nombres/orden.

**BUG REAL encontrado al implementar esto, corregido en la misma sesión**: `computeYearGeneric()`
(`js/finanzas-calc.js`) calculaba `otherExpenses` (que alimenta `expenses`/`ebitda`/`pat`, no solo
"Formato Simplificado") sumando SOLO `['other_expenses','lump_football_operations_expense']`. Al
crear las 3 categorías nuevas y re-etiquetar líneas hacia ellas, esa plata quedó AFUERA de
`otherExpenses` (no solo del catch-all visual, del cálculo real), y Racing pasó a mostrar SUPERÁVIT
en ejercicios que en realidad tuvieron déficit real (`verifyTieOuts()` lo detectó: Revenue seguía
cerrando pero Expenses y PAT dejaron de cerrar, con diferencias de $11-52 mil millones ARS según el
año). Fix: `otherExpenses` ahora suma las 3 categorías nuevas también (son gasto operativo en
EFECTIVO, igual que `other_expenses`, no no-efectivo como `depreciation`/`player_amortisation`).
REGLA PARA EL FUTURO: cualquier categoría nueva de gasto que se agregue a `EXPENSE_CATEGORIES` tiene
que sumarse explícitamente O BIEN a `otherExpenses` (si es gasto operativo en efectivo) O BIEN al
cálculo de `nonCash` (si es no-efectivo) dentro de `computeYearGeneric()` — agregarla solo a
`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` no alcanza, ese array solo controla CÓMO SE MUESTRA la plata en
Formato Simplificado, no si esa plata efectivamente CUENTA para `expenses`/`ebitda`/`pat`. Verificar
siempre con `verifyTieOuts()` en el navegador (no alcanza con `node --check`, que solo valida
sintaxis) después de agregar una categoría nueva.

**TAMBIÉN encontrado en esta sesión, nada que ver con la categorización pero real**: `read_console_messages`
del navegador puede devolver una MEZCLA de mensajes de una versión vieja del script (cacheada por el
navegador) con la nueva, incluso navegando a una URL "fresca" en una tab nueva, si el servidor local
ya sirvió esa URL antes en la misma sesión del navegador. Señal de alerta: los números de
`verifyTieOuts()` no cambian nada después de editar código que debería cambiarlos. Se confirmó
comparando `computeYearGeneric.toString()` en la consola contra el archivo real en disco (server
`curl`), y se resolvió abriendo un servidor en un PUERTO nuevo (no solo una tab nueva) para forzar un
origen sin caché.

**Boca 2025 NO recibió el desglose de 3 filas en esta ronda** (quedó como to-do explícito, RESUELTO
en la Versión 102): en su momento, un intento de reconstrucción a mano (separar la porción salarial
de cada línea mixta de `nativeFinancialsBoca[2025].gastos`) dio una diferencia de ~$4.500 M ARS
contra `otherExpenses` real, señal de un error de reconciliación no resuelto — se descartó por el
riesgo de ensuciar un balance auditado real sin un chequeo automatizado que lo confirme. La Versión
102 (migración de Boca al motor genérico) sí lo resolvió, volviendo a los anexos ORIGINALES del
balance (`Clubes/Argentina/Boca/memoria-y-balance-2024-25.md`, Anexos IX y XI-XVIII) en vez de
intentar re-derivar la separación desde `nativeFinancialsBoca` (que ya venía sin ese nivel de
detalle) o desde `yearsRaw[2025].wages` (el total agregado, sin desglose por departamento). Cada
departamento (Fútbol profesional, Estadio, Educación física, Fútbol juvenil, Básquet, Casa Amarilla,
Médico, y las 11 gerencias de "Gastos de estructura operativa") tiene su PROPIA línea "Remuneraciones
y cargas sociales" separada del resto en el `.md` transcripto — sumar esas 9 líneas de sueldo dio
EXACTO el mismo total ($67.869,732365 M) que el sitio ya usaba, confirmando la reconciliación sin
inventar ningún número. Ver `data/boca-data.js` (`bocaExpenseLinesByYear[2025]`, cada departamento
partido en 2 líneas top-level "X — Remuneraciones y cargas sociales" / "X — Otros gastos
operativos") y el comentario de cabecera de ese archivo para el detalle completo. Lección para el
próximo caso similar: cuando una estructura "nativa" de display no alcanza para categorizar
correctamente, la solución no es forzar la categorización sobre esa estructura ni colapsarla a algo
más genérico — es volver al documento fuente transcripto y buscar el nivel de detalle que sí
distinga lo que hace falta, antes de asumir que no existe.

## 14. `grossDebt`: el criterio de qué línea usar es POR CLUB, no universal — y un balance que
desglosa gastos por sector/departamento se puede (y conviene) separar por columna, no solo por fila

Encontrado onboardeando Vélez Sarsfield (Versión 82, primer club nuevo del motor genérico desde que
existe). Dos lecciones nuevas, ninguna specific de fútbol, aplican a cualquier club futuro:

**`grossDebt` no tiene un único campo "correcto" a copiar entre balances.** Racing usa el TOTAL DEL
PASIVO completo (Estado de Situación Patrimonial entero). Boca usa solo la línea "Deudas"
(corriente+no corriente), EXCLUYENDO "Obligaciones de hacer"/Previsiones. Vélez siguió el criterio de
Boca (su balance también separa "Deudas" de "Ingresos anticipados"/"Fondos con destino
específico"/"Previsiones" como líneas de pasivo distintas), no el de Racing. Antes de copiar
`grossDebt = Total del Pasivo` de un club a otro sin mirar, revisar si el Estado de Situación
Patrimonial del documento nuevo separa "Deudas" de otras categorías de pasivo — si las separa, usar
esa línea más angosta (deuda financiera real), no el total completo, mismo criterio de "más fiel a
lo que el club reporta" que ya rige para todo lo demás en este skill.

**Un balance que desglosa un rubro de gasto por SECTOR/DEPARTAMENTO (no solo por concepto) permite
separar "Salarios y primas (plantel y cuerpo técnico)" del resto del personal del club, sin
inventar nada.** El Anexo III de Vélez tiene una tabla con "Remuneraciones al personal"/"Cargas
sociales" como FILAS y Fútbol Profesional/Amateur/Complejo Polideportivo/Enseñanza/Culturales/Otros
Deportes como COLUMNAS, con un total por fila y por columna. Racing (y hasta ahora Boca/River) solo
tienen una cifra por rubro, sin este 2do eje — por eso `wages_squad` en esos clubes ya incluye
"todo el personal reportado en ese rubro". Cuando el documento SÍ tiene este 2do eje, conviene
partir la línea en 2: la porción de la columna "Fútbol Profesional" (-> `wages_squad`, comparable de
verdad entre clubes) y el resto de las columnas sumadas (-> `youth_other_sports_expense`, cubre
amateur/juvenil/otros deportes Y, si el club no separa más fino, también personal de escuela/cultura
no deportiva — documentarlo así en el comentario, no forzar una categoría que no existe). Verificar
siempre que las 2 líneas nuevas sumen EXACTO el total de fila que imprime el documento (mismo
criterio de la sección 6) antes de dar por buena la separación.

## 15. PDF escaneado sin capa de texto: OCR con Tesseract es mucho más barato que renderizar
páginas como imágenes con el Read tool — pero verificar fila por fila, no confiar en el OCR crudo

Encontrado cargando Vélez Sarsfield hacia atrás hasta agotar su archivo completo (Versiones 90-93):
4 de los 11 ejercicios cargados (2023, 2017, 2016, 2015) resultaron ser PDF escaneados sin capa de
texto (`pdftotext` devuelve vacío o casi vacío, confirmar con `pdffonts`/`pdftotext` ANTES de asumir
que hay que usar el Read tool sobre imágenes — ver el gotcha viejo de CLAUDE.md, que databa de
antes de que esta alternativa se probara).

**Flujo que funcionó, mucho más barato en tokens que renderizar página por página con el Read
tool:**
1. Instalar Tesseract si no está: `brew install tesseract tesseract-lang` (el segundo paquete trae
   los idiomas, incluido español — sin él, Tesseract solo reconoce inglés).
2. Renderizar cada página a imagen: `pdftoppm -png -r 300 archivo.pdf page` (300dpi alcanza para
   PDF de tamaño A4 normal; si el PDF tiene páginas físicamente más chicas —ej. la mitad de A4—,
   subir a 450-900dpi para esa página puntual, o el OCR sale con más ruido).
3. OCRear cada imagen: `tesseract page-NN.png out -l spa --psm 3` (actualizado en la transcripción
   masiva de la Versión 156: `--psm 3`, segmentación automática de página, salió MEJOR que
   `--psm 6` en la práctica sobre ~5.000 páginas de prueba — misma velocidad en una página normal
   de balance, pero en tablas con más de una columna de totales `--psm 6` se comía filas enteras
   de "Total" que `--psm 3` sí capturó, y en páginas de layout complejo —balances publicados como
   aviso legal dentro de una página de diario, varias columnas de texto no relacionado alrededor
   de la tabla— `--psm 6` mezclaba texto de columnas distintas en la misma línea mientras `--psm 3`
   las separó correctamente. `--psm 6` sigue siendo la opción a probar si una página puntual sale
   peor con `--psm 3`, no al revés).
4. Armar el `.md` de transcripción igual que con `pdftotext` (con separadores `--- pág. N ---`),
   pero con una nota en el encabezado aclarando que es OCR, no texto nativo, y que los números se
   verifican aparte antes de cargar — igual de obligatorio transcribir ANTES de extraer datos (ver
   CLAUDE.md), el OCR no exime de esa regla.

**Tablas anchas (6+ columnas, como el Anexo III de Vélez) muchas veces vienen ROTADAS 90° dentro
del PDF escaneado** (para que quepan más columnas en el ancho de una hoja). El OCR de esas páginas
sale ilegible (texto basura, sin estructura) si no se corrige la rotación primero: detectarlo por
la salida garbled, y antes de re-OCRear, rotar con PIL —
`Image.open('page-NN.png').rotate(-90, expand=True).save('page-NN-rot.png')` (probar `90` si `-90`
no alcanza) — y correr Tesseract sobre la imagen ya rotada. Si además la página es de tamaño
reducido, puede hacer falta subir el DPI del render ANTES de rotar (900dpi en vez de 300-450) para
que el texto tenga suficiente resolución tras la rotación.

**Mejor que adivinar `90` vs `-90` a mano: Tesseract mismo detecta el ángulo (OSD, "Orientation and
Script Detection"), rápido (menos de 1 segundo por página) y confiable en la práctica sobre ~5.000
páginas de la transcripción masiva de la Versión 156** — `tesseract page-NN.png - --psm 0` devuelve
una línea `Rotate: N` (0/90/180/270, el ángulo horario para enderezarla) más una confianza. Rotar
con `Image.open('page-NN.png').rotate(-N, expand=True, fillcolor='white').save(...)` (el signo
negativo porque PIL rota antihorario) y recién ahí correr el OCR normal. Esto se puede correr
SIEMPRE antes de OCRear cada página (no solo cuando ya se sospecha una tabla rotada): un `Rotate: 0`
con confianza alta no cuesta nada, y detecta rotaciones que a simple vista no siempre se notan.

**Verificación: usar la columna "Total <año>" impresa de cada fila, no reconstruir sumando las
columnas de sector.** El OCR tiene más ruido en las columnas angostas intermedias (dígitos sueltos
mal leídos, ej. "1.088.197" en vez de "7.088.197") que en la columna ancha de fútbol profesional o
en el total de fila. El criterio que funcionó: para cada línea de gasto, tomar SOLO la columna
Fútbol Profesional (para separar `wages_squad`) y la columna Total del año (para todo lo demás) —
nunca reconstruir un valor sumando las 6 columnas de sector una por una. Después, la SUMA de todas
las columnas "Total <año>" de un Anexo tiene que cerrar EXACTO contra el total impreso de ese
Anexo (mismo total que aparece en el Estado de Recursos y Gastos) — si no cierra, hay un dígito mal
leído en alguna fila, recorrer las filas ajustando hasta que la suma cierre exacto (no alcanza con
"cada fila individual se ve razonable"). En la práctica: 2016 cerró exacto sin ningún ajuste; 2015 y
2017 cerraron con una diferencia de $40-50 mil sobre un total de cientos de millones (~0,00001%),
ruido irrelevante muy por debajo de la tolerancia de `verifyTieOuts()` — aceptable, no hace falta
perseguir cada peso si la magnitud del error ya es insignificante frente al total.

**Bug real (no de OCR) que este proceso destapó en `verifyTieOuts()` mismo**: el check de
"Expenses" comparaba `Math.abs(expenses) + Math.abs(nonCash)` contra el oficial. Esa fórmula solo
es correcta cuando `expenses` y `nonCash` tienen el mismo signo (siempre había pasado, en todo club
y ejercicio, hasta 2015 de Vélez) — si el crédito de "reclasificación" de un ejercicio (Costo de
desarrollo de jugadores propios) es MÁS GRANDE que la amortización real de plantel de ese mismo
ejercicio, `nonCash` neto da positivo, y `Math.abs(a)+Math.abs(b) ≠ Math.abs(a+b)`. La fórmula
correcta es `Math.abs(expenses + nonCash)` (combinar primero, después el valor absoluto) —
matemáticamente equivalente a la vieja fórmula en todos los casos donde ya cerraba, así que corregir
esto en `index.html` no rompió ningún check anterior. Si un ejercicio nuevo no cierra en "Expenses"
por una diferencia grande y sospechosamente redonda, revisar primero si `nonCash` neto se volvió
positivo antes de asumir que el dato de carga está mal.

## 16. REGLA (a pedido de Guido): un presupuesto de CAJA con sección "Extraordinaria" (financiamiento) se carga SOLO en su parte Ordinaria

Encontrado con el Presupuesto 2023-2024 de San Lorenzo (`Clubes/Argentina/San Lorenzo/
presupuesto-2023-2024.md`): a diferencia de un Estado de Recursos y Gastos devengado (el que usan
todos los balances auditados ya cargados), este documento es un presupuesto de CAJA mensual con 2
secciones separadas: "Ordinario" (Ingresos/Egresos de la operación normal del club — sociales,
copas, TV, sueldos, gastos de estadio, etc.) y "Orígenes y Aplicaciones Extraordinarias" (Ingresos
Extraordinarios = aportes bancarios/financieros/dirigenciales recibidos; Egresos Extraordinarios =
cancelación de esos mismos aportes; Propiedades y obras = obras de capital; Compra/Venta Jugadores
= el DESEMBOLSO de caja del pase, no su amortización contable; Cancelación Deuda = pago de deuda
vieja).

**Regla: cargar SOLO la sección Ordinaria.** La sección Extraordinaria es financiamiento (deuda
tomada/pagada) y movimientos de capital/caja, no ingreso o gasto real de la operación del ejercicio
— cargarla como revenue/expense normal mezclaría financiamiento con operación, e inflaría/desinflaría
el resultado del club de forma engañosa (ej. "Compra Jugadores" en términos de caja no es lo mismo
que su amortización en varios ejercicios, que es como el resto del sitio trata los pases). El
"Resultado Ordinario" impreso por el propio documento (Total Ingresos Ordinarios − Total Egresos
Ordinarios) es el número que se usa como PAT del ejercicio — NO el "Saldo Final por Período", que
mezcla la operación con el financiamiento.

Guido, con esta misma sesión: "documentar esta decisión. inclusive anotalo como duda para
preguntarle la lógica de esto a San Lorenzo. o sea, por qué lo hacen así? parecería que no saben
devengar" — la pregunta ("¿por qué presupuestan en caja separando ordinario/extraordinario en vez
de un presupuesto económico devengado, como sí tienen sus propios balances auditados?") quedó
anotada en `dudas-por-club.md`, sección San Lorenzo.

Si aparece un presupuesto de OTRO club con esta misma estructura (Ordinario + Extraordinario/
financiamiento en secciones separadas), aplicar el mismo criterio: solo la parte Ordinaria entra al
sitio.

## 17. Impuestos/Cargas sociales/Moratoria: el mapeo YA ESTÁ establecido, no es caso por caso

Guido preguntó en esta sesión si "Impuestos" se carga alguna vez (pensaba que no), si "Moratoria"
debería ir a intereses, y confirmó que "Cargas sociales" siempre va como remuneración — respuesta
completa, con el precedente real ya en el sitio (revisado con grep sobre `data/*.js` antes de
responder, no de memoria):

- **Impuestos (tasas, impuestos municipales, ART, seguros)** → SIEMPRE `admin_general_expense`. Sí
  se carga, en casi todos los clubes: Vélez ("Impuestos (sectores)"/"Impuestos (administración)",
  los 11 ejercicios), San Lorenzo 2013 ("Impuestos y tasas"), Rosario Central ("Impuestos, tasas y
  contribuciones") — todos a `admin_general_expense`. La idea de que "no lo cargamos para ningún
  club" era incorrecta, es justo lo contrario: es uno de los mapeos MÁS consistentes del sitio.
- **Cargas sociales** → NUNCA es su propia categoría. Se pega SIEMPRE a la categoría del sueldo al
  que corresponde, separando por sector si el documento lo permite: la porción de plantel
  profesional/cuerpo técnico va a `wages_squad` (junto con "Sueldos y primas" del mismo sector), el
  resto de sectores (amateur, polideportivo, administración, otros deportes) va a
  `youth_other_sports_expense` o `admin_general_expense` según a qué sector pertenezca esa porción
  — mismo patrón en Vélez, Estudiantes LP, Rosario Central, Racing, San Lorenzo. Confirmado correcto.
- **Moratoria** (plan de pago de deuda impositiva/de facilidades) → el precedente real está DIVIDIDO:
  Racing la cargó como `admin_general_expense` en 2 ejercicios ("Pago de Moratoria") y como
  `other_expenses` en un tercero ("Pago de Otros Gastos Extraordinarios - Moratoria", porque en ESE
  balance el propio documento la agrupaba bajo "Gastos Extraordinarios"). Nunca se cargó como
  interés (`netInterest`) en ningún club — no hay precedente para eso, y conceptualmente una
  moratoria impositiva no es interés de deuda financiera, es un plan de pago de tasas/impuestos
  atrasados. Cuando el documento fuente la separa como línea propia, seguir el criterio de "dónde la
  agrupa el propio balance" (Extraordinario → `other_expenses`; Ordinario/administración →
  `admin_general_expense`) en vez de una regla fija.
- **Caso del Presupuesto 2023-24 de San Lorenzo específicamente**: el documento junta los 3
  conceptos en UNA sola fila ("Impuestos/Moratoria/Cargas sociales", un solo número por mes/Total,
  ver Pauta N°18) — no hay forma de separarlos, así que no aplica ninguna de las 3 reglas de arriba
  por separado. Se cargó la fila entera como una única línea `admin_general_expense` (coherente con
  que impuestos y moratoria van ahí en la mayoría de los precedentes, y es la única opción posible
  dado que el documento no discrimina cargas sociales de fútbol vs. resto en esta fila combinada).

## 18. Una fuente que publica INGRESOS y no gastos: qué se carga, qué queda en `null`, y qué NO se inventa

Aparece cada vez que la fuente no es el club sino su liga o su controladora, y ya pasó con dos
formas distintas. Es un caso de mapeo, no un hueco de carga: **un `null` acá es el dato correcto.**

**Caso A — la liga publica un renglón por club (los 10 de la J.League).** El informe de gestión de
la J.League da el INGRESO de cada club y 3 líneas de desglose, y su estructura de costos solo
existe a nivel división. Entonces: `officialTotalRevenue` con el número, y
`officialTotalExpenses: null` + `officialPAT: null`. **Sin gastos publicados no hay resultado que
cargar**, y pedirle el PAT a estos ejercicios es pedir un número que no existe en ninguna fuente.
Ya se re-verificó con 3 fuentes independientes que el desglose por club no está publicado en ningún
lado (`fuentes/Japón/_notas-generales.md`); lo que queda son 2 preguntas abiertas en
`dudas-por-club.md`, una a la liga y otra a los clubes, no trabajo de mapeo.

**Caso B — la controladora reporta un SEGMENTO, no el club (Club América dentro de Ollamani).** Un
segmento IFRS 8 informa "utilidad del segmento", que **no es el resultado neto**: no le imputa
costos financieros ni impuestos, y además puede agrupar al club con otro negocio (acá, el Estadio
Banorte). Entonces: los totales que SON una identidad aritmética del segmento se cargan
(`officialTotalRevenue`, `officialTotalExpenses`), y `officialPAT` queda en `null`. Cargar la
utilidad del segmento como PAT publicaría un "Resultado neto" que ningún documento afirma.

**Consecuencia en la vista, que es la parte que se olvida:** un ejercicio así muestra "Sin dato" en
Gastos y en Resultado neto, no `$0` — ver la regla "SIN DATO NO ES CERO" en `CONVENCIONES.md`. La
cascada arranca en los gastos y se lleva el resultado con ella.

**Y en la auditoría:** `tools/audit.js` ya no reporta `balance-sin-pat` cuando
`officialTotalExpenses` es `null`, justamente porque ese caso no es accionable (se arregló el
2026-09-20, to-do 20(a): el chequeo tiraba 11 hallazgos y 10 eran este caso). Si cargás un club de
una liga que publica solo ingresos, no hace falta silenciar nada: el script ya lo entiende.

---

## Cómo mantener este skill

Este skill se lee UNA VEZ al empezar a mapear un balance/presupuesto nuevo, y se ACTUALIZA al
terminar esa sesión si:
- Apareció un rubro que no encajaba limpio en ninguna fila de la tabla de la sección 1 → agregalo
  a la tabla con el criterio que usaste.
- Tomaste una decisión que contradice algo que dice este skill → actualizá la sección
  correspondiente y explicá por qué el caso nuevo justificaba desviarse (no borres el criterio
  viejo sin más, a menos que haya quedado obsoleto).
- Encontraste un club con una estructura genuinamente distinta a Boca/River/Racing (ej. un club de
  otro país, con otro tipo de moneda o régimen contable) → considerá si necesita su propia sección
  acá o si amerita un skill separado.
- Se aprendió algo nuevo sobre CÓMO leer un PDF fuente (otra trampa de escaneo, otro tipo de fila
  engañosa, otra razón real para consultarle a Guido sobre algo ilegible) → va en las secciones 8-11
  (todo lo de "leer el documento fuente correctamente" vive junto acá desde la Versión 62, no en
  `club-or-year-onboarding`), con el documento/página exacto donde se encontró.

No hace falta pedirle permiso a Guido para estas actualizaciones menores, es información viva que
debería quedar al día sola, igual que la sección generada de `ESTADO.md`.
