---
name: club-data-mapping
description: Supuestos y patrones para mapear el balance/presupuesto NATIVO de un club de fútbol (categorías propias del documento, ej. "Generales/Específicos/Diversos" de Racing, o las 5 categorías de River) al esquema compartido del sitio numeros-de-boca (normalizedCategory de data/category-map.js, revenueLines/expenseLines, meta fields). Usar SIEMPRE que se cargue un balance o presupuesto nuevo, de un club ya existente (un ejercicio que faltaba) o de un club completamente nuevo, antes de decidir cómo categorizar cada línea o cómo convertir a USD. El objetivo es no reinventar estos criterios cada vez: si una decisión de esta sesión contradice lo que dice este skill, o aparece un caso que el skill no cubre, actualizar el skill al terminar (ver "Cómo mantener este skill" al final).
---

# Mapeo de formato-club a formato-sitio

Este skill es la memoria de las decisiones de categorización que ya se tomaron al cargar
balances/presupuestos reales de Boca, River y Racing en `numeros-de-boca`. No es una guía teórica:
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
  `club-or-year-onboarding` sección 2a para el detalle de dónde vive cada archivo desde la
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
| Cobranzas por participación, premios por avance de ronda/campeonato (SOLO si el documento fuente la reporta como línea propia, separada de la recaudación de entradas: ver regla de la sección 10, agregada Versión 46) | `competition_bonus` |
| Publicidad, sponsors, canjes comerciales | `sponsorship_commercial` |
| Transferencia de Jugadores (ingreso), Costo Transferencia de Jugadores (gasto) | `player_sales` (si el club NO las netea, van así, ver sección 3) |
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
- **Boca** (`nativeFinancialsBoca`, no el motor genérico): el balance auditado SÍ reporta 5 líneas
  brutas de transferencias (altas, bajas, rescisiones, etc.) que el sitio neteo a mano en
  "Ganancia por venta de jugadores", porque ahí el objetivo era reconstruir la cadena
  Revenue→EBITDA→EBIT del estilo SwissRamble, y esas 5 líneas brutas no tienen equivalente en esa
  cadena si se dejan sueltas.

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

## 5. Conversión a USD: depende de si el club tiene toggle de moneda o no

- **Los 3 clubes cargados (Boca, River, Racing) tienen toggle USD/ARS en vivo** (desde la Versión
  32 de numeros-de-boca, antes River/Racing no lo tenían, ver más abajo "Guardar amountNative en
  ARS nativo"): se guardan los montos en ARS nativos (`yearsRaw`/`nativeFinancialsBoca` para Boca;
  `amountNative` de `revenueLines`/`expenseLines` para River/Racing), y la conversión pasa en el
  momento de renderizar (`toDisplayValue` + `yearMeta`/`yearMetaFor`). Nunca guardes un valor ya
  convertido, ni para Boca ni para un club nuevo.

Qué tipo de cambio usar, en orden de preferencia:
0. **REGLA #1, ANTES que cualquier otra (agregada Versión 32 de numeros-de-boca, sesión de carga
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
   $1.049,54, CHF $1.122,36), usá el de USD, el sitio no modela multi-moneda por partida, solo
   ARS<->USD. Solo caé a las reglas 1-3 de abajo si el documento NO declara ningún tipo de cambio
   propio (ej. Racing 2009-2011, de una época sin este tipo de Anexo).
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

### Guardar amountNative en ARS nativo, no pre-convertido a USD (regla desde la Versión 32)

Hasta la Versión 31 de numeros-de-boca, River y Racing guardaban `amountNative` YA CONVERTIDO a
USD (sin toggle de moneda), la sección 5 de este skill decía explícitamente "seguí este mismo
patrón" para clubes nuevos. Esa recomendación quedó OBSOLETA: a partir de la Versión 32, los 3
clubes cargados (Boca, River, Racing) guardan `amountNative` en ARS millones NATIVOS (tal cual el
balance/presupuesto), con `fiscalYearMeta[year].currency`/`fx` diciendo en qué moneda está y con
qué tipo de cambio convertir, la conversión pasa siempre al momento de renderizar
(`yearMetaFor(clubId, year)` + `toDisplayValue`, ambas en `js/finanzas-calc.js` desde la Versión 51), nunca al cargar el dato. Esto es
lo que habilita el toggle USD/ARS en vivo. Si se agrega un club argentino nuevo (u otro país con
moneda propia y clubes que declaren su balance en esa moneda), seguí ESTE patrón (ARS/moneda
nativa + fx en meta), no el viejo de "siempre USD, sin toggle", el toggle USD/ARS + Formato del
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

## 9. "Formato simplificado": cada fila tiene que ser un acordeón, nunca `items:null`

REGLA (agregada Versión 40 de numeros-de-boca, pedido explícito de Guido: "es mi manera de hacerte
un control"): a diferencia de "Formato del club" (que siempre mostró el desglose real vía `items`),
"Formato simplificado" arrancó con TODAS sus filas en `items:null`, se veía el número ya
reclasificado, pero no había forma de auditar de qué campo(s) nativo(s) salió esa reclasificación
sin cambiar de toggle y buscar a mano. Guido lo pidió como su forma de controlar el trabajo de
categorización: cada fila de Formato Simplificado tiene que poder abrirse y mostrar la cuenta.

Implementado por ahora SOLO para Boca (`simplifiedReportForBoca()`, en `js/finanzas-calc.js` desde la Versión 51). River/Racing
(`simplifiedReportForGeneric()`/`bucketize()`) siguen con `items:null` en cada bucket, pendiente.
Cuando se toque ese motor genérico, aplicar el mismo criterio:

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

## 10. REGLA PERMANENTE (Versión 46, pedido explícito de Guido): "Formato Simplificado" de
CUALQUIER club tiene que usar el mismo set de categorías y la misma lógica que ya usa Boca, nunca
un set diseñado por separado para el motor genérico

El objetivo de "Formato simplificado" es poder comparar clubes entre sí con las MISMAS categorías.
Guido pidió explícito: "utiliza para todos los Formato Simplificado el formato que tiene Boca y la
logica." Esto es la fuente de verdad de ese pedido, para cualquier club nuevo o cambio futuro a
`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` (el motor de River/Racing).

**Categorías/lógica de referencia, la de Boca (`simplifiedReportForBoca()`, en `js/finanzas-calc.js`), no la
que ya tenía el motor genérico:**
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
  entrada VERSIÓN 46 del historial de index.html para el detalle completo)**: Ingresos de Racing,
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
Versión 47 del historial de index.html). Como esa categoría no existe en el vocabulario de Boca,
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

No hace falta pedirle permiso a Guido para estas actualizaciones menores, es información viva que
debería quedar al día sola, igual que el comentario de `index.html`.
