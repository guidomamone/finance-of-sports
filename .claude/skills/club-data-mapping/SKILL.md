---
name: club-data-mapping
description: Supuestos y patrones para mapear el balance/presupuesto NATIVO de un club de fútbol (categorías propias del documento, ej. "Generales/Específicos/Diversos" de Racing, o las 5 categorías de River) al esquema compartido del sitio finance-of-sports (normalizedCategory de data/category-map.js, revenueLines/expenseLines, meta fields). Usar SIEMPRE que se cargue un balance o presupuesto nuevo, de un club ya existente (un ejercicio que faltaba) o de un club completamente nuevo, antes de decidir cómo categorizar cada línea o cómo convertir a USD. El objetivo es no reinventar estos criterios cada vez: si una decisión de esta sesión contradice lo que dice este skill, o aparece un caso que el skill no cubre, actualizar el skill al terminar (ver "Cómo mantener este skill" al final).
---

# Mapeo de formato-club a formato-sitio

Este skill es la memoria de los criterios de categorización y conversión con los que se cargan los balances/presupuestos de los
clubes en `finance-of-sports`. Cada regla salió de un caso real y, cuando ayuda, el caso va como ejemplo. Leelo ANTES de mapear un
documento nuevo: evita que dos ejercicios del mismo club (o de clubes distintos) queden categorizados con criterios diferentes sin querer.

En el pipeline la categorización la hacen los scripts (etapa 7 de `Admin/PIPELINE.md`: precedente del club, Jev, Claude por API,
cola para Guido), así que este skill es el criterio que esos scripts aplican y que vos usás para revisar la cola, cargar a mano fuera
del pipeline o decidir un rubro que nadie categorizó.

## 0. Ubicate primero

- La taxonomía compartida está en `data/category-map.js` (`REVENUE_CATEGORIES`, `EXPENSE_CATEGORIES`). Leela antes de inventar una
  categoría nueva: probablemente ya está.
  REGLA: `category-map.js` tiene que reflejar EXACTAMENTE los `normalizedCategory` que usan los datos reales. Al agregar o usar una
  `normalizedCategory` nueva, actualizá `category-map.js` EN LA MISMA sesión, sin dejarlo como pendiente (ejemplo de lo que pasa si
  no: `category-map.js` documentaba `transfer_income_gross`, que ningún dato usaba, mientras `racing-data.js` usaba `player_sales`
  sin que figurara en `REVENUE_CATEGORIES`; el motor funcionaba igual y por eso nadie lo corrigió). Los buckets del motor genérico
  (`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS`, en `js/finanzas-calc.js`) no leen `category-map.js` en vivo, tienen su
  propia lista: si tocás uno, sincronizá el otro a mano (dónde vive cada archivo: `club-or-year-onboarding`, sección 3).
- `normalizedCategory` es una clave INTERNA: la usan `computeYearGeneric()` y `sumCat()` para los KPIs de Finanzas, los gráficos y
  `wagesToTurnover`. NUNCA se muestra. Lo que ve el usuario es `rawLabel`, tal cual lo escribe el club: no lo traduzcas ni lo prolijes.
- El motor genérico (`computeYearGeneric`, para todos los clubes) espera `revenueLines`/`expenseLines`: arrays de
  `{ rawLabel, normalizedCategory, amountNative, disclosureLevel, items? }`. `items` es el desglose recursivo del renglón (sección 4).

## 1. Elegir `normalizedCategory`: cuándo darle una propia y cuándo mandarlo a "other"

Los rubros que son estructuralmente iguales entre clubes (cuotas sociales, TV, entradas/campeonatos, sponsors, sueldos del plantel,
transferencias de jugadores, depreciación) tienen su propia categoría. Todo lo demás, específico de CADA club (ej. "Ingresos Colegio"
y "Sede Villa del Parque" de Racing), va a `other_income`/`other_expenses`. No fuerces una categoría nueva porque un club nombre
distinto un rubro: primero preguntate si es conceptualmente lo mismo que ya existe (ej. "Televisión AFA" es `broadcasting`).

**Primer paso, antes de decidir a mano: `node tools/suggest-category-precedent.mjs <clubDataFile> "<rubro>" ["<rubro2>" ...] --side revenue|expense`.**
Busca el texto exacto (o parecido) contra lo YA categorizado en otros años del MISMO club, separado por ingreso/gasto (el mismo
rubro puede significar cosas distintas según el lado: Boca, "Futbol Femenino" ingreso vs. "Fútbol femenino" gasto). Resultados:
`EXACTO` (misma categoría entre años: usarla), `PARECIDO` (candidato a revisar, no aceptar sin más), `SIN_PRECEDENTE` (criterio de
esta sección, de cero), `CONFLICTO` (el mismo texto tuvo 2 categorías en años distintos: revisar a mano cuál es correcta). Es una
consulta, nunca escribe en `data/<club>-data.js`. `--list` vuelca todo el precedente cargado de un club.

Mapeos usados en la práctica (no es la lista completa de `category-map.js`):

| Rubro tal cual lo reporta el club | normalizedCategory |
|---|---|
| Cuotas Sociales / Ingresos Sociales | `member_dues` |
| Televisación, Televisión AFA, derechos de TV | `broadcasting` |
| Campeonatos Oficiales, Otros Torneos, recaudación de entradas (cuando el club NO separa premios de recaudación) | `matchday_competition` |
| Cobranzas por participación, premios por avance de ronda/campeonato (SOLO si el documento la reporta como línea propia, separada de la recaudación de entradas) | `competition_bonus` |
| Publicidad, sponsors, canjes comerciales | `sponsorship_commercial` |
| Transferencia de Jugadores / Cobros por venta de jugadores (ingreso) | `player_sales` (si el club NO las netea, van así, ver sección 3) |
| Costo Transferencia de Jugadores / Pago por adquisición de jugadores (gasto) | `player_amortisation`: reusa la categoría de "amortización de pases" de Boca como el bucket "Compra de jugadores", aunque Racing no capitalice/amortice y expense el costo completo al momento de la operación; es la aproximación más fiel para que esa plata aparezca en el bucket correcto de Formato simplificado en vez de perderse en el catch-all |
| Sueldos del Personal, Cargas Sociales, remuneraciones del plantel | `wages_squad` |
| Amortización/Depreciación de bienes de uso tangibles | `depreciation` |
| Previsiones, amortizaciones intangibles, cargos extraordinarios de fin de ejercicio | `other_amortisation` |
| Desafectación de previsiones/provisiones, condonaciones, resultado por quiebra (también cuando son un INGRESO: ver `Admin/CONVENCIONES-DATOS.md`) | `exceptional_items` |
| Colegio/escuela del club: aranceles de enseñanza, subsidios estatales a la educación (fila propia "Educación" en Formato simplificado). NO una escuela/academia de FÚTBOL (eso es `youth_football`) ni un departamento de educación física (eso es `other_sports`) | `education` (ingreso) |
| Uso del estadio fuera del partido: alquiler para recitales/eventos, concesiones del estadio, licitación de palcos. Comparte la fila "Estadio" con `matchday_competition` y `season_tickets`, pero se guarda aparte. **CRITERIO CONSERVADOR**: solo si el rótulo nombra el estadio o una parte de él; un "Alquileres"/"Arrendamientos" genérico NO entra, va a `other_income` y la pregunta a `Admin/dudas-por-club.md` | `stadium_other` (ingreso) |
| Secciones y actividades deportivo-recreativas del socio: básquet, tenis, polideportivo, ciudad deportiva, pileta, náutica, colonia de vacaciones, subcomisiones (fila propia "Otras secciones deportivas", espejo de `youth_other_sports_expense`) | `other_sports` (ingreso) |
| Todo lo demás específico del club (sede social, alquileres genéricos, eventos y salones, hotelería, estacionamiento, actividades varias) | `other_income` / `other_expenses` |
| Un club que agrupa gruesamente ("fútbol profesional" sin desglosar): ver la regla de abajo antes de usar esta categoría | `lump_football_operations` (ingreso) / `lump_football_operations_expense` (gasto) |

### Antes de usar `lump_football_operations`, fijate si el documento REALMENTE no desglosa

`lump_football_operations`/`_expense` es para cuando el club de verdad no separa un rubro (ej. "fútbol profesional" como una sola
cifra, sin ningún desglose disponible en ningún lado del documento). NO es para un renglón que el documento presenta como encabezado
de grupo con líneas numeradas debajo (ej. Racing: "A. INGRESOS PROVENIENTES DE FUTBOL" con 9 líneas "1.- COBRANZAS POR VENTA DE
ENTRADAS" a "9.- COBROS DE OTROS RECURSOS...", cada una con nombre y monto propio): eso es una tabla con jerarquía de dos niveles y
cada línea de abajo tiene una categoría real (entradas → `matchday_competition`, TV → `broadcasting`, marketing →
`sponsorship_commercial`, etc.).

**Ejemplo del error** (Racing 2025/26 y 2026/27): esas 9 líneas se guardaron como `items` DENTRO de una única línea de primer nivel
`lump_football_operations`. Visualmente correcto en "Formato del club", pero roto para cualquier cálculo por `normalizedCategory`:
"Formato simplificado" mostraba Televisión/Comercial/Venta de jugadores en $0, porque esa plata estaba **enterrada adentro de
`items`**, un campo que `sumCat()`/`computeYearGeneric()` NUNCA mira (solo suman por `normalizedCategory` de las líneas de PRIMER NIVEL).

**Regla concreta**: si vas a meter algo adentro de `items`, preguntate si esos sub-ítems tienen cada uno una categoría REAL distinta.
Si sí, promovelos a líneas de primer nivel con su propio `normalizedCategory`, aunque el documento los agrupe bajo un encabezado
común. `items` es para el caso contrario: sub-ítems que son todos la MISMA categoría que el padre y se desglosan solo para mostrar
más detalle (ej. "Torneo Oficial" de Boca, con Derechos de TV/Recaudaciones/Premio adentro, las 3 `matchday_competition`).
Pregunta rápida: "¿estos sub-ítems, sumados cada uno a su categoría real, dan un Formato simplificado distinto a dejarlos todos en la
categoría del padre?". Si sí, promovelos.

## 2. Resultados financieros (intereses, diferencias de cambio): NUNCA una línea

Intereses ganados/perdidos y diferencias de cambio NO van como `revenueLine`/`expenseLine`, ni siquiera si el documento los muestra
como una línea más de "Recursos". Van netos (ingresos menos egresos financieros) al campo `netInterest` de `fiscalYearMeta` del año.
Motivo: es un resultado financiero, no operativo, y meterlo en `revenueLines` lo cuenta como revenue del club.

Mismo criterio para `profitOnPlayerSales`, `assetSales` y `tax`: si el documento los muestra aparte del cuerpo principal de
Recursos/Gastos, van a `fiscalYearMeta`, no a las líneas.

## 3. Transferencias de jugadores: reflejá cómo LO PRESENTA CADA CLUB, no una regla fija

Varía entre clubes y es intencional:

- **Racing**: el balance reporta "Transferencia de Jugadores" (ingreso) y "Costo Transferencia de Jugadores" (gasto) como dos
  líneas ordinarias separadas, sin netear. El sitio las carga IGUAL, separadas: no hay una línea "ganancia neta por pases" en el
  documento, así que inventar un neteo sería menos fiel.
- **Boca 2025** (`bocaRevenueLinesByYear`/`bocaExpenseLinesByYear`): el balance auditado reporta las líneas brutas de
  transferencias/rescisión (ingreso, `player_sales`) y sus costos asociados (gasto) como líneas ordinarias, SIN netear (pág. 76 del
  balance). Boca no netea a mano en `meta.profitOnPlayerSales`, igual que ningún otro club migrado.

Regla general: mirá primero si el DOCUMENTO FUENTE neteó o no. Si no neteó, no netees vos: replicar la estructura real del club
importa más que uniformar entre clubes (el free tier es "tal cual lo reporta el club").

## 4. Sub-ítems anidados: no aplanar, usar el formato recursivo

Si el documento tiene sub-grupos dentro de una categoría (ej. Racing: "Gerencia de Fútbol Profesional" con sub-grupos "Depto
Medico" y "Canjes" adentro, cada uno con sus líneas), usá el formato recursivo `[label, value, items?]` en vez de aplanar. El
renderer (`renderBreakdownRows` en `index.html`) soporta profundidad arbitraria. "No perder información en la carga" es un principio
general del proyecto.

Cuando un sub-grupo no tiene un total propio impreso (ej. "Canjes" es solo un subtítulo en una tabla plana), calculá su `value`
como la suma de sus `items`: no lo dejes en 0 ni inventes un número.

## 5. Conversión a USD: cualquier moneda nativa, no solo ARS (ver `data/currency-map.js`)

- **Todos los clubes tienen toggle [moneda nativa / USD] en vivo**, con CUALQUIER moneda (ARS, BRL, CLP, COP, PEN, EUR, etc.). El
  comentario de cabecera de `data/currency-map.js` tiene el modelo completo y es lectura obligatoria antes de onboardear un club
  fuera de Argentina. Se guardan los montos en la moneda NATIVA del documento (`amountNative`, en millones de esa moneda, tal cual
  el balance/presupuesto), con `fiscalYearMeta[year].currency`/`fx` diciendo en qué moneda está y con qué tipo de cambio convertir.
  La conversión pasa al renderizar (`yearMetaFor(clubId, year)` + `toDisplayValue`, en `js/finanzas-calc.js`). Nunca guardes un
  valor ya convertido, para ningún club.
- **El toggle SIEMPRE es [moneda nativa del club] <-> USD, nunca entre 2 monedas no-USD** (ej. nunca ARS<->BRL en vivo). USD es el
  pivote universal, igual que "Comparar Gestiones" (siempre en USD). No agregues un 3er destino a `toDisplayValue()` sin releer el
  comentario de cabecera de `data/currency-map.js`.
- **Moneda nueva** (sin entrada en `CURRENCY_META`, `data/currency-map.js`): agregale una entrada (`scale:1` si sus montos leen
  bien en millones, como BRL, PEN, EUR; `scale:1000` si el valor nominal es tan grande que conviene "miles de millones", como ARS,
  CLP, COP). Sin entrada, el fallback `DEFAULT_CURRENCY_META` no rompe, pero puede leer raro.
- **Excepción documentada**: si un ejercicio NO tiene tipo de cambio propio recuperable (ni declarado por el documento ni con una
  fuente externa confiable, ej. Racing 2009-2011, balances sin Anexo de moneda extranjera) y quedó cargado en USD ya convertido,
  está bien dejarlo (`currency:'USD'` con el fx usado, documentado en el comentario del año) en vez de forzar una re-extracción. El
  toggle funciona, reconstruyendo un ARS aproximado.

### Qué tipo de cambio usar, en orden de preferencia

0. **REGLA #1, antes que cualquier otra: si el propio documento declara SU PROPIO tipo de cambio de cierre, usá ESE**, no una
   cotización externa. Buscá un Anexo tipo "Activos y pasivos en moneda extranjera" (Racing: Anexo VI; River: Anexo V), con una
   columna "Tipo de Cambio" o "Cambio vigente al cierre" junto a Caja y bancos en moneda extranjera. Es el que el club usó para
   convertir sus partidas en ese balance, y evita que dos números del mismo documento no coincidan. Tamaño de la diferencia: Racing
   2023-24 declaraba $909 al 30/6/2024 contra $912 de una cotización externa (Rava Bursátil); River 2023-24 declaraba $950,50
   contra $953,50 (~0,3-0,6%, pero la fuente primaria gana siempre). Si el documento declara varios tipos por MONEDA (ej. River:
   USD $950,50, EUR $1.049,54, CHF $1.122,36), usá el de USD: el toggle nunca modela multi-moneda por partida. Este `fx` es
   SIEMPRE el que ESE documento declaró para ESE cierre: nunca lo reuses para otro ejercicio ni otro club, ni lo asumas comparable
   a una cotización de mercado. "El USD de Boca 2025" y "el USD de River 2024" son dos tipos de cambio de cierre distintos. Solo si
   el documento NO declara ninguno (ej. Racing 2009-2011) caés a las reglas 1-3.
1. **Ejercicio cerrado, en "moneda homogénea"/RT6** (reexpresado por inflación a una fecha puntual): dólar mayorista de **CIERRE**
   del ejercicio, no un promedio. Promediar mezclaría poder adquisitivo de fechas distintas cuando el documento ya está expresado
   en pesos de un solo momento.
2. **Ejercicio cerrado, ANTERIOR a esa práctica** (pesos nominales sin reexpresar, ej. Racing 2009-2011): también dólar mayorista
   de cierre, pero con más tiempo para buscar la cotización histórica exacta (ver "Cuándo la cotización exacta no aparece").
3. **Presupuesto/proyección sin cerrar**: el promedio que el PROPIO documento declara como premisa ("tipo de cambio de referencia"
   o similar), no uno inventado por vos. Si declara DOS puntos (ej. Racing 2026-27: "$1.505 para julio 2026 y $1.870 para junio
   2027"), promedialos vos (inicio+cierre / 2, como Boca 2027).

**Antes de buscar en la web una cotización de mercado (reglas 1 y 2): `node tools/lookup-fx-close.js <fecha> --currency <MON>`**
(`--list-monedas` dice cuáles hay). Busca LOCAL contra series ya bajadas de la fuente oficial (`tools/fx-reference/`) y devuelve el
`fx`/`fxSource`/`label` listos para pegar en `FX_CLOSE`, sin fetch. Si la moneda no está o la fecha cae fuera del rango bajado, lo
dice explícito y lo anota en `tools/fx-reference/misses.jsonl`: avisale a Guido (él corre `tools/fetch-fx-reference.mjs`) en vez de
salir a buscar en la web.

### Cómo se ESCRIBE la procedencia: `fxSource` y `fxRef`

Cada ejercicio declara de dónde salió su tipo de cambio en un campo, y `node tools/audit.js` lo lee. **Un `fx` nuevo sin `fxSource`
(o sin `fxRef`) sale listado como pendiente en la auditoría**: no es opcional.

Los 6 valores de `FX_SOURCE` (`data/currency-map.js`) mapean a las reglas de arriba:

| `fxSource` | Cuándo | Regla |
|---|---|---|
| `document_close` | el balance declara su TC de cierre en su Anexo de moneda extranjera | 0 |
| `document_assumption` | el presupuesto declara un TC como premisa (todavía no hay cierre) | 3 |
| `market_close` | el documento no declara ninguno, se usó la cotización oficial de la fecha de cierre | 1 y 2 |
| `market_approx` | no se consiguió la cotización exacta: interpolada o de fecha cercana | "Cuándo la cotización exacta no aparece" |
| `placeholder` | no sale de ninguna fuente, existe para que el toggle funcione | n/a |
| `unknown` | cargado sin rastro de procedencia | n/a (es un pendiente, no un destino) |

**`document_assumption` es una categoría propia y no un `document_close` más**: un presupuesto declara un pronóstico, que puede
terminar equivocado; un balance declara un cierre ya ocurrido. Comparar un presupuesto en USD contra un balance en USD mezcla las
dos cosas, y el sitio necesita poder decirlo.

**Dos formas de escribirlo:**

```js
// El documento lo declara → el número va literal, en el archivo del club.
2024: { currency:'ARS', fx:909, fxSource:'document_close', ... }

// El documento no declara nada y se usó una cotización pública → NO se escribe el
// número acá: se referencia la entrada de FX_CLOSE (data/currency-map.js).
2025: { currency:'EUR', fxRef:'EUR@2025-06-30', ... }
```

La diferencia es la regla #0 otra vez: **el TC declarado por un documento es un dato de ESE club** (dos clubes pueden declarar
valores distintos para el mismo día y los dos están bien, por eso nunca se comparte), mientras que **una cotización de mercado es
un dato del mercado**: se dice una vez en `FX_CLOSE` y la referencian todos los que la usen.

**Si la moneda y fecha que necesitás no está en `FX_CLOSE`, agregala ahí** (con su `label`: qué cotización es y de qué organismo:
PTAX, BCRA, BNA, BCE, TRM), no en el archivo del club. Excepción: una `market_approx` se queda como literal en el archivo del club,
para que nadie la reuse desde la tabla creyendo que es un cierre oficial.

Qué tipo de error atrapa `fxSource`: Unión 2024 usaba 890,50 ARS/USD como cotización de mercado para el 30/6/2024, cuando Racing,
Vélez y Estudiantes declaran 909 para ese cierre y el comentario de Unión decía "dólar BNA vendedor", que ese día era ~912.
`node tools/audit.js` lo reporta como `fx-mercado-discrepante`.

### El sentido de `fx` SIEMPRE es "moneda nativa por 1 USD", nunca al revés

`toDisplayValue()` (`js/finanzas-calc.js`) asume "unidades de moneda nativa por 1 USD", el mismo sentido que ARS, COP, BRL, MXN, JPY
(ARS ~1000 por USD, no "0,001 USD por 1 ARS"). Para monedas fuertes (EUR, GBP) la forma natural de buscarlo es "1 EUR = X USD" (ej.
`1.172`), el sentido inverso: con `fx` invertido el toggle a USD muestra un valor ~37% más alto que el real (pasó con 10 clubes de
España). Para EUR el `fx` correcto es ~0,85. El sentido es el mismo para todas las monedas, sin excepción.

`checkFxSanity()` (`data/currency-map.js`, corre junto a `verifyTieOuts()` al cargar el sitio) compara cada `fx` contra
`FX_PLAUSIBLE_RANGE` (ej. EUR: 0,7-1,15) y tira un `console.warn` si algo parece invertido o con el orden de magnitud equivocado.
No reemplaza la verificación manual. Si onboardeás una moneda sin entrada en `FX_PLAUSIBLE_RANGE`, agregala (un rango ausente no
se chequea, no rompe nada).

### Cuándo la cotización exacta no aparece

Para fechas viejas (2009-2011 en este proyecto) las fuentes web no siempre tienen la cotización de un día puntual. Se usa (a) la
cotización real más cercana en fecha si se encuentra (ej. una nota de diario de esa semana), o (b) interpolación LINEAL entre los
valores de apertura y cierre de año calendario publicados por sitios de cotización histórica. Sea cual sea, DOCUMENTALO como
aproximación (`fxSource:'market_approx'`) en el comentario del código Y en el `note` de `sources{}` en `data/clubs.js`: la próxima
sesión tiene que distinguir "esto es exacto" de "esto es una estimación razonable".

## 6. Verificación antes de cargar (no es opcional)

**Primer paso: `node tools/audit.js`** (gratis, sin tokens). Ya chequea solo, para cualquier club: que cada `items` sume exacto
contra su línea padre (`items-no-cierran`), que la escala en USD sea plausible (`escala-implausible`) y que no haya un salto
implausible contra los años anteriores del mismo club (`salto-interanual`), que agarra justo el bug de cargar en pesos en vez de
millones (Boca 2022/2023: un bug de suma y uno de escala, detectables así en vez de a mano). Los puntos 1-6 de abajo cubren lo que
`audit.js` NO ve: que la categorización sea la CORRECTA, no solo que sume.

**Para encontrar las tablas de Recursos/Gastos sin leer el documento entero: `node tools/extract-table-rows.mjs <archivo.md>`.**
Saca solo las tablas del `.md` transcripto a JSON compacto (página, sección, filas), descartando actas/firmas/dictamen. Detecta el
separador decimal (coma/punto) y NUNCA convierte los montos a número (quedan como string tal cual impresos). Límite: una tabla
cortada por un salto de página puede perderse o desarmarse; si una tabla del JSON no tiene sentido, leé esa sección del `.md` a
mano. `--relevant` filtra a las tablas con palabra clave (una ayuda de dónde mirar, no un filtro definitivo).

1. Sumá tus `revenueLines`/`expenseLines` y confirmá que cierran contra el subtotal que imprime el DOCUMENTO fuente para esa
   categoría; no confíes en tu propia suma sin cruzarla contra algo externo. La aritmética se saca de tokens:
   `node tools/sum-check.mjs <num1> <num2> ... --target <total>` suma una lista (separador de miles "," o "." auto-detectado,
   negativos entre paréntesis) y dice si cierra y por cuánto. Qué filas entran sigue siendo criterio tuyo.
2. Sumá `revenue + expenses + netInterest` (+ otros meta fields que correspondan) y confirmá que da el RESULTADO FINAL / Superávit /
   Déficit impreso. Es el check más fuerte: un solo número inambiguo que no depende de cómo categorizaste cada línea.
3. Si el documento etiqueta algo como "(Pérdida)" o "(Ganancia)", NO asumas que el rótulo es correcto: sumá y confirmá (Racing 2011
   arrastraba un rótulo de plantilla del año anterior, con el número real de signo contrario).
4. Si el documento agrupa categorías distinto según el año (ej. a veces incluye Amortizaciones en el total de Gastos impreso, a
   veces no, en varios balances viejos de Racing), NO fuerces un check automático de `verifyTieOuts()` contra un número que
   significa algo distinto de un año a otro. Documentá la verificación a mano en un comentario explicando la inconsistencia, antes
   que agregar un check frágil que parezca "no cerrar" por una diferencia de definición y no de datos.
5. **Usá SIEMPRE la columna "año corriente" del balance DE ESE MISMO ejercicio, nunca la comparativa de un balance posterior.**
   Un balance en "moneda homogénea"/RT6 REEXPRESA el ejercicio anterior al poder adquisitivo de la fecha de cierre del balance
   ACTUAL. Ejemplo: el balance 2024-25 de Racing imprime $92.529.945.669 de recursos ordinarios en su columna comparativa "2024";
   el balance 2023-24 imprime $66.367.712.489 como su propio año corriente. Mismo concepto, dos fechas de reexpresión. Para cargar
   el ejercicio N, andá al documento CUYO año corriente ES N.
6. **Si el `.md` empieza con la advertencia "ESCANEADO, TRANSCRIPTO CON MISTRAL OCR"**, el chequeo 1-5 NO alcanza solo: verificá a
   mano contra el PDF cada cifra que vayas a cargar. En una celda dañada o tapada por sombreado, Mistral devuelve un TOTAL mal leído
   con la misma confianza que uno bien leído, sin marcarlo `[ilegible]` (Llaneros 2016). Si el tie-out contra un total de otra
   fuente independiente cierra, confiá; si el "total conocido" sale del mismo documento, que cierre solo no alcanza. Borrá la
   advertencia del `.md` una vez verificado.

## 7. Atribución de gestión: solo si estás seguro

`fiscalYearMeta[year].gestionId` y las entradas de `gestionesByClub` son documentación, no algo que el motor use para filtrar el
selector "Año a año" (lee directo `Object.keys(fiscalYearMeta)`). Si no podés confirmar con confianza quién presidía el club en ese
ejercicio (Racing 2009-2011, época de fideicomiso/quiebra sin presidencia electa clara), dejá `gestionId: null` y NO agregues una
entrada a `gestionesByClub`. El año sigue visible en "Año a año", solo no participa de "Por gestión"/"Comparar Gestiones". Mejor un
año sin gestión que una gestión inventada.

## 8. Antes de asumir que un PDF es fácil de extraer, medilo

No asumas que los PDFs de un club tienen texto extraíble porque fue cierto para los años ya cargados: verificalo por documento con
`pdftotext archivo.pdf - | wc -c` dividido por la cantidad de páginas (`pdfinfo archivo.pdf`). Si da ~1 char/página es un escaneo
sin capa de texto (una nota decía "todos estos PDFs tienen texto extraíble" y era cierto para 3 de 24 documentos). Re-verificá
siempre contra el archivo real.

## 9. Leer un PDF fuente: texto nativo vs. imagen, y cómo enderezar un escaneo torcido

Probá `pdftotext -layout archivo.pdf -` primero: si devuelve texto real, es MUCHO más barato que renderizar páginas como imagen. Si
da vacío o basura, es un escaneo puro (el registro por documento de Racing está en `fuentes/Argentina/Racing.md`, índice en
`fuentes/_indice/Argentina.md`). En volumen el default no arranca acá: es `tools/mistral-ocr-transcribe.mjs` y
`tools/gemini-transcribe.mjs` desde la terminal de Guido (ver `Admin/PIPELINE.md`, "Documentos fuente"). Lo de esta sección y de la
15 es para cuando una página puntual cae en una sesión.

**Escaneo inclinado en diagonal**: leer así arrastra error hacia los bordes, y crece hacia la columna de totales (el borde
derecho), donde más importa. Ejemplo: en `Clubes/Argentina/Racing/presupuesto2019-20.pdf` la fila "9.- Cobros de otros recursos de
gestión por fútbol" se leyó como 634.152.050 cuando el valor real (confirmado por Guido) era 18.000.000: se estaba leyendo la fila
de ABAJO ("B. Ingresos Sociales") por el corrimiento acumulado.

Receta (deskew), no hay herramienta armada en el repo, es un script ad-hoc de Python por documento:
1. Renderizar a alta resolución: `pdftoppm -r 300 -f N -l N archivo.pdf pagina`.
2. Con Python/PIL, probar ángulos pequeños (-2° a +2°, pasos de 0.1°-0.2°) y para cada uno calcular la VARIANZA de los promedios de
   brillo por fila de píxeles (`np.array(img.convert('L')).mean(axis=1).var()`).
3. El ángulo con la varianza MÁS ALTA es el que mejor alinea las líneas horizontales (para `presupuesto2019-20.pdf`, ~0.78°).
4. Rotar ese ángulo (`img.rotate(angle, expand=True, fillcolor='white')`) y releer con el Read tool.

**Caso DISTINTO: tabla escaneada en landscape "acostada" dentro de una página portrait** (`presupuesto2018-19.pdf`, págs. 8-9,
Ingresos/Egresos). La imagen no está inclinada: está rotada 90° entera (una planilla ancha con rubros + 12 meses + Total, guardada
como página vertical). Se lee en un orden RARO: la fila "Total"/"Subtotal" de cada bloque aparece ANTES que su desglose. Señal de
alerta: una tabla escaneada que se lee con el TOTAL primero y el detalle debajo. Arreglo: renderizar la página y rotar 90° exactos
con `img.rotate(90, expand=True)` (o `-90`; el correcto deja los rubros leyéndose de arriba hacia abajo a la izquierda y los meses
como columnas hacia la derecha, con "Total del Período" al final). Si además está inclinada, rotar primero 90° y recién después
medir el ángulo de deskew.

## 10. La "fila acumulada": un subtotal impreso puede incluir OTRAS líneas separadas, no solo sus hijos visuales

Ejemplo (`Clubes/Argentina/Racing/racing-presupuesto-2019-20.pdf`, fila "2.- Cobranzas por participación"): el documento imprimía
606.734.000, pero sus sub-ítems visibles (d+e+f, indentados debajo) sumaban 274.780.000, con una diferencia de 331.954.000. La fila
no era un subtotal de sus hijos visuales sino un ACUMULADO que TAMBIÉN suma otras 2 líneas listadas por separado más abajo ("3.-
Cobranzas por abonos estadio" y "4.- Cobros por retransmisión"): 274.780.000 + 123.154.000 + 208.800.000 = 606.734.000, exacto.
Cargar 606.734.000 como valor propio de la fila hubiera CONTADO DOS VECES los ítems 3 y 4, que ya se cargan como líneas
independientes. Criterio correcto: cargar el valor NO acumulado (274.780.000, la suma de sus propios hijos).

Señal de alerta genérica: si una fila con sub-ítems visibles no reconcilia contra la suma de esos sub-ítems, Y la diferencia
coincide (exacta o casi) con el valor de OTRA fila del mismo documento, es un acumulado que incluye esa fila, no un error de
transcripción ni un dato a elegir. Antes de cargar una fila así: sumar sus hijos visibles, compararlos con el valor impreso y, si no
cierra, buscar qué otras filas explican la diferencia. Si no hay explicación clara, preguntarle a Guido con la especificidad de la
sección 11, sin elegir un criterio unilateralmente.

## 11. Pedir ayuda a Guido para leer algo ilegible: siempre página + fila + columna exactos

**Esto NO es una pausa preventiva por "el PDF se ve difícil".** Un escaneo denso, muchas páginas, una tabla en landscape o una
inclinación diagonal no son motivo para frenar y preguntar. El default es seguir solo: renderizar a más DPI, rotar, enderezar
(sección 9), cruzar contra los subtotales impresos (sección 6). Preguntarle a Guido es el ÚLTIMO recurso, para UN número puntual que
sigue sin confirmarse después de intentar todo eso (o que no reconcilia y ninguna fila del documento explica la diferencia, sección
10). Nunca una pregunta abierta tipo "¿podés ayudarme con este PDF?".

La pregunta tiene que incluir siempre: (1) el número exacto de página del PDF, (2) el nombre exacto de la fila/rubro tal cual está
impreso, (3) qué columna (si hay más de una), (4) el número que se está leyendo (aunque se sospeche que está mal). Una pregunta
genérica ("no me cierra tal cosa, ¿podés revisar?") no sirve; la que funcionó fue: "página 7, fila '9.- Cobros de otros recursos
de gestión por fútbol', columna B (o la que corresponda), leo 634.152.050, ¿es correcto?", con captura de esa zona del PDF si hace
falta. Nunca preguntar "¿esto está bien?" sin esas 4 cosas.

## 12. "Formato simplificado": cada fila tiene que ser un acordeón, nunca `items:null`

Cada fila de Formato simplificado tiene que poder abrirse y mostrar la cuenta: es la forma en que Guido controla el trabajo de
categorización (ver de qué campo(s) nativo(s) salió cada número reclasificado). Aplica a todos los clubes por igual: `bucketize()`
(`js/finanzas-calc.js`) arma `items` para cada bucket. Criterio:

- Un bucket que agrupa una sola `normalizedCategory` con una sola línea real: `items` = esa línea con su propio desglose
  (`line.items`) si lo tiene, o una fila `[line.rawLabel, line.amountNative]` si no. Nunca dejar el bucket sin nada que mostrar al
  abrirlo.
- Un bucket que suma VARIAS líneas (mismo `normalizedCategory` repetido, o el catch-all "Otros ingresos"/"Otros gastos"): `items` =
  una tupla `[rawLabel, amountNative, line.items || null]` por cada línea que aporta a la suma.
- Nunca inventar un número nuevo para armar el desglose: reusar por referencia los mismos `revenueLines`/`expenseLines`/`items` que
  alimentan "Formato del club". El desglose tiene que ser trazable 1:1 a esos datos.
- Si un ejercicio no tiene más detalle que el campo nativo ya sumado (la mayoría de los ejercicios viejos de Boca), la fila igual
  lleva `items` con una sola fila que confirma de qué campo salió. La falta de más desglose no es excusa para volver a `items:null`.

Verificación (mismo criterio que la sección 6): abrir CADA fila en el navegador y confirmar que la suma de sus sub-ítems cierra
exacto contra el `value` de la fila padre. Un desglose mal armado puede pasar `verifyTieOuts()` y aun así mostrar datos incorrectos
(es el caso de Racing de la sección 1).

## 13. "Formato Simplificado" de CUALQUIER club usa el mismo set de categorías, el mismo orden y los mismos nombres que Boca

El objetivo es poder comparar clubes con las MISMAS categorías. Boca lee `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` (`js/finanzas-calc.js`) en vivo igual que cualquier otro club: un bucket nuevo se agrega en UN
SOLO lugar y afecta a todos.

**Filas de referencia, en este orden exacto (el de Boca Ejercicio 2027, la referencia canónica):**
- **Ingresos**: Cuotas Sociales, Comercial / Sponsors, **Estadio** (`matchday_competition` + `season_tickets` + `stadium_other`
  combinadas en una fila; el acordeón las separa por `rawLabel`; el interruptor `ABONOS_DENTRO_DE_ESTADIO` en
  `js/finanzas-calc.js` puede devolver `season_tickets` a su propia fila "Abonos" sin tocar ningún dato), Televisión, Premios por
  competencias, Venta de Jugadores, Educación, Otras secciones deportivas, Fútbol profesional (sin desglosar por la fuente,
  `hideIfZero:true`), catch-all **"Otros ingresos"**.
- **Gastos**: Compra de jugadores, Salarios y primas (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación),
  Organización de partidos, Otras secciones deportivas (juvenil/otros deportes/básquet), Administración y gastos generales,
  catch-all **"Otros gastos"**. **Estas 7 filas son SIEMPRE las mismas para cualquier club/año**, aunque el documento no permita
  separar las 3 del medio (Organización de partidos / Otras secciones / Administración): en ese caso esas 3 muestran $0 y el monto
  completo cae en "Otros gastos". Mostrar la fila en $0 no es "esconder", es "no hay cómo separar esto". Una categoría que se
  agregue a futuro va en la posición que le correspondería si Boca tuviera esa fila, no al final por comodidad.

**REGLA NO OPCIONAL: si el documento de un club NO permite categorizar de esta misma manera, no decidas solo cómo resolverlo
(categoría inventada, catch-all sin avisar, aproximación forzada). Consultale a Guido primero, con la discrepancia concreta y las
opciones, no en abstracto.**

**Los nombres tienen que ser IDÉNTICOS carácter por carácter contra Boca**, "parecido" no alcanza. Ejemplo del bug: `'Televisión'`
(Boca) vs. `'Televisión / Derechos de TV'` (motor genérico) para `broadcasting`. Copiá el label LITERAL del código de Boca, no lo
reescribas de memoria.

**`hideIfZero:true` es SOLO para categorías sin equivalente en Boca** ("Fútbol profesional, sin desglosar por la fuente" es la única):
mostrar esa fila en $0 para un club bien desglosado sería una fila extra rompiendo la promesa de "igual que Boca". No es una regla
de esconder cualquier $0: "Venta de Jugadores" en $0 (un club que no vendió a nadie) se muestra igual que en Boca. Cuando el bucket
sin desglosar SÍ tiene plata (ej. River 2024, 67% del revenue ahí), la fila se muestra normal.

**Por qué combinar categorías esconde errores (Athletic Club)**: al fusionar "Estadio", Athletic pasó a mostrar 97% de sus ingresos
ahí. La causa no era la fusión: su línea "Ingresos deportivos" (139,5 M€, 82% del club) estaba entera como `matchday_competition`,
cuando la Nota 21.4 de sus cuentas la abre en 5 conceptos, el más grande 72,7 M€ de TELEVISIÓN (el sitio mostraba "Televisión 0,0").
**Moraleja: una fila con un porcentaje absurdo del total es señal de sospechar de la línea más grande, no del bucket.**

**Estadio vs. Abonos son dos conceptos DISTINTOS de venta de acceso, nunca un label combinado tipo "Entradas / Abonos"**: "Estadio" es
lo que el club vende PARTIDO POR PARTIDO (`matchday_competition`, `r.exhibicionEspectaculos` en Boca); "Abonos" es season tickets,
pago adelantado por toda la temporada (`season_tickets`, `r.abonos` en Boca). Mapeá cada rubro con la pregunta "¿esto se paga por
partido o por temporada completa?".

**Educación/Otras secciones deportivas no son una rareza de 2 clubes**: `auditorias/2026-09-22-catchall-no-futbol.md` midió que los
11 clubes argentinos cargados tienen negocio no futbolístico (colegio, polideportivo, otros deportes) contra 0 de los 10 españoles y
0 de los 10 japoneses. El corte es por forma jurídica (asociación civil multideportiva vs. sociedad anónima deportiva), no por
país. Antes de mandar una línea de colegio/polideportivo/alquiler de estadio a `other_income` por descarte, revisá si encaja en
`education`/`other_sports`/`stadium_other` (criterio conservador para esta última, tabla de la sección 1).

**Precedentes de categorización de Gastos de Racing, para cualquier club nuevo con la misma ambigüedad:**
- "Costo transferencia de jugadores"/"Pago por adquisición de jugadores" → `player_amortisation` (Racing no capitaliza/amortiza como
  Boca, expensa el costo completo al momento de la operación; no hay amortización real que separar).
- Comisiones de compraventa de jugadores y CAPEX (compra de bienes de uso) → se quedan en `other_expenses`, NO en
  `player_amortisation`/`Inversiones`: Boca tampoco separa comisiones dentro de "Compra de jugadores", y CAPEX es plata de caja para
  comprar activos, distinta de "Inversiones" (amortización + depreciación, cargo contable no-cash). Mezclarlos rompe la
  comparabilidad.
- "Fútbol profesional"/"Otros gastos deportivos fútbol profesional" (costos NO salariales del plantel: médico, indumentaria, viajes,
  pretemporada) → `wages_squad`, no una categoría nueva, porque Boca Ejercicio 2027 mezcla ese tipo de costo en su `wages_squad`
  (`data/boca-data.js`, línea "Fútbol Profesional — Remuneraciones y primas"). OJO: Boca 2025 (balance auditado) SÍ separa esto en 2
  líneas (Remuneraciones / Otros gastos operativos), así que `wages_squad` significa algo un poco distinto según el ejercicio de
  Boca que se tome; el criterio de Racing sigue al Ejercicio 2027 por ser la referencia de nombres/orden.

**REGLA DE INGENIERÍA, fácil de pisar al agregar una categoría nueva**: `computeYearGeneric()` (`js/finanzas-calc.js`) calcula
`otherExpenses` (que alimenta `expenses`/`ebitda`/`pat`, no solo lo que se muestra) sumando una lista explícita de categorías.
Agregar una categoría SOLO a `GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` no alcanza: hay que sumarla también a `otherExpenses` (gasto
operativo en efectivo) o al cálculo de `nonCash` (no-efectivo) dentro de `computeYearGeneric()`, si no esa plata desaparece del
cálculo real aunque la tabla se vea bien. Caso real: al crear 3 categorías sin sumarlas a `otherExpenses`, Racing mostró SUPERÁVIT en
ejercicios con déficit real ($11-52 mil millones ARS de diferencia en Expenses/PAT, detectado por `verifyTieOuts()`). Verificá con
`verifyTieOuts()` en el navegador (`node --check` solo valida sintaxis) después de agregar una categoría.

**Cuando una estructura nativa de display no alcanza para categorizar bien, no fuerces la categorización sobre esa estructura:
volvé al documento fuente transcripto y buscá el nivel de detalle que sí distinga lo que hace falta.** Ejemplo (Boca 2025): separar
a mano la porción salarial de una línea mixta dio ~$4.500 M ARS de diferencia contra `otherExpenses` real y se descartó; se resolvió
releyendo los Anexos ORIGINALES (`Clubes/Argentina/Boca/memoria-y-balance-2024-25.md`, Anexos IX y XI-XVIII), donde cada
departamento tiene su propia línea "Remuneraciones y cargas sociales"; sumar esas 9 líneas dio EXACTO el total ya usado.

## 14. `grossDebt` es POR CLUB, y un gasto desglosado por sector se puede separar por columna

**`grossDebt` no tiene un único campo "correcto" a copiar entre balances.** Racing usa el TOTAL DEL PASIVO completo. Boca usa solo la
línea "Deudas" (corriente + no corriente), EXCLUYENDO "Obligaciones de hacer"/Previsiones. Vélez sigue el criterio de Boca (su
balance también separa "Deudas" de "Ingresos anticipados"/"Fondos con destino específico"/"Previsiones"). Antes de copiar
`grossDebt = Total del Pasivo` de un club a otro, revisá si el Estado de Situación Patrimonial separa "Deudas" de otros pasivos: si
las separa, usá esa línea más angosta (deuda financiera real). `tools/caja-deuda.mjs` completa `cash` y `grossDebt` donde el sitio
tiene null (ver `Admin/PIPELINE.md`); este criterio es el que hay que revisar en lo que propone.

**Un balance que desglosa un rubro de gasto por SECTOR/DEPARTAMENTO permite separar "Salarios y primas (plantel y cuerpo técnico)"
del resto del personal sin inventar nada.** El Anexo III de Vélez tiene "Remuneraciones al personal"/"Cargas sociales" como FILAS y
Fútbol Profesional/Amateur/Complejo Polideportivo/Enseñanza/Culturales/Otros Deportes como COLUMNAS, con total por fila y por
columna. Racing, Boca y River solo tienen una cifra por rubro, así que su `wages_squad` incluye "todo el personal reportado en ese
rubro". Cuando el documento SÍ tiene el 2do eje, partí la línea en 2: la columna "Fútbol Profesional" (→ `wages_squad`, comparable
entre clubes) y el resto de las columnas sumadas (→ `youth_other_sports_expense`, que cubre amateur/juvenil/otros deportes y, si el
club no separa más fino, personal de escuela/cultura no deportiva; documentarlo en el comentario). Verificá que las 2 líneas nuevas
sumen EXACTO el total de fila impreso (sección 6).

## 15. PDF escaneado sin capa de texto: OCR con Tesseract y cómo verificarlo fila por fila

Este es el flujo para cuando una transcripción cae en un subagente (por ejemplo, Gemini rechaza el documento por `RECITATION`). El
default en volumen son las APIs externas (sección 9). Confirmá primero con `pdffonts`/`pdftotext` que no hay capa de texto, antes de
renderizar imágenes con el Read tool (mucho más caro).

1. Instalar Tesseract si no está: `brew install tesseract tesseract-lang` (el segundo trae los idiomas; sin él solo reconoce inglés).
2. Renderizar: `pdftoppm -png -r 300 archivo.pdf page` (300 dpi alcanza para A4; con páginas físicamente más chicas, subir a
   450-900 dpi, o el OCR sale con ruido).
3. OCR: `tesseract page-NN.png out -l spa --psm 3`. `--psm 3` (segmentación automática) salió mejor que `--psm 6` sobre ~5.000
   páginas: en tablas con más de una columna de totales `--psm 6` se comía filas "Total", y en layouts complejos (balances
   publicados como aviso legal dentro de una página de diario) mezclaba columnas. `--psm 6` es la opción a probar si una página
   puntual sale peor con `--psm 3`.
4. Armar el `.md` como con `pdftotext` (separadores `--- pág. N ---`), con una nota en el encabezado aclarando que es OCR y que los
   números se verifican aparte. Transcribir ANTES de extraer datos sigue siendo obligatorio.

**Tablas anchas (6+ columnas, como el Anexo III de Vélez) muchas veces vienen ROTADAS 90° dentro del PDF escaneado.** El OCR sale
ilegible (basura sin estructura) si no se corrige primero. **Tesseract detecta el ángulo solo** (OSD, menos de 1 segundo por página,
confiable sobre ~5.000 páginas): `tesseract page-NN.png - --psm 0` devuelve `Rotate: N` (0/90/180/270, ángulo horario para
enderezarla) más una confianza. Rotá con `Image.open('page-NN.png').rotate(-N, expand=True, fillcolor='white').save(...)` (negativo
porque PIL rota antihorario) y recién ahí corré el OCR normal. Conviene correrlo SIEMPRE antes de OCRear cada página: un `Rotate: 0`
con confianza alta no cuesta nada y detecta rotaciones que a simple vista no se notan. Si la página es de tamaño reducido, subir el
DPI (900 en vez de 300-450) ANTES de rotar.

**Caso real de lo que cuesta no chequear la rotación (River 2024, Anexo VIII, matriz de 30 conceptos x 8 áreas, páginas 59-62).**
Una sesión encontró "diferencias no explicadas al sumar celdas individuales" y dejó sin transcribir la matriz (la decisión de no
publicar cifras dudosas fue correcta; el diagnóstico no). Las 4 páginas estaban rotadas 90°; `--psm 0` lo muestra en 3 segundos
(`Rotate: 90`) y, rotando y re-OCReando, las filas salen limpias y **reconcilian exacto** contra su total impreso. **Si las celdas
de una tabla escaneada no reconcilian, chequeá la rotación ANTES de concluir que el OCR no sirve**: una matriz que no cierra por
rotación se ve igual que una que no cierra por mala calidad de escaneo.

**Verificación: usá la columna "Total <año>" impresa de cada fila, no reconstruyas sumando las columnas de sector.** El OCR tiene
más ruido en las columnas angostas intermedias (ej. "1.088.197" en vez de "7.088.197") que en la columna ancha de fútbol
profesional o en el total de fila. Para cada línea de gasto, tomá SOLO la columna Fútbol Profesional (para separar `wages_squad`) y
la columna Total del año (para todo lo demás). Después, la SUMA de las columnas "Total <año>" de un Anexo tiene que cerrar EXACTO
contra el total impreso de ese Anexo (el mismo del Estado de Recursos y Gastos): si no cierra, hay un dígito mal leído en alguna
fila; recorrelas hasta que cierre. En la práctica, Vélez 2016 cerró exacto sin ajustes; 2015 y 2017 cerraron con $40-50 mil de
diferencia sobre cientos de millones (~0,00001%), muy por debajo de la tolerancia de `verifyTieOuts()`: aceptable.

**Pista sobre `verifyTieOuts()`**: el check de "Expenses" compara `Math.abs(computed.expenses + computed.nonCash)` contra el oficial
(combina primero y después el valor absoluto). Si el crédito de "reclasificación" de un ejercicio (Costo de desarrollo de jugadores
propios) es MÁS GRANDE que la amortización real de plantel, `nonCash` neto da positivo. Si un ejercicio nuevo no cierra en
"Expenses" por una diferencia grande y sospechosamente redonda, revisá primero si `nonCash` neto se volvió positivo antes de
asumir que el dato de carga está mal.

## 16. Un presupuesto de CAJA con sección "Extraordinaria" (financiamiento) se carga SOLO en su parte Ordinaria

Ejemplo: Presupuesto 2023-2024 de San Lorenzo (`Clubes/Argentina/San Lorenzo/presupuesto-2023-2024.md`). A diferencia de un Estado
de Recursos y Gastos devengado, es un presupuesto de CAJA mensual con 2 secciones: "Ordinario" (Ingresos/Egresos de la operación
normal: sociales, copas, TV, sueldos, gastos de estadio, etc.) y "Orígenes y Aplicaciones Extraordinarias" (Ingresos Extraordinarios
= aportes bancarios/financieros/dirigenciales; Egresos Extraordinarios = cancelación de esos aportes; Propiedades y obras = obras
de capital; Compra/Venta Jugadores = el DESEMBOLSO de caja del pase, no su amortización; Cancelación Deuda = pago de deuda vieja).

**Regla: cargar SOLO la sección Ordinaria.** La Extraordinaria es financiamiento y movimientos de capital/caja, no ingreso o gasto
de la operación del ejercicio: cargarla mezclaría financiamiento con operación e inflaría o desinflaría el resultado (ej. "Compra
Jugadores" en caja no es lo mismo que su amortización en varios ejercicios, que es como el sitio trata los pases). El "Resultado
Ordinario" impreso por el documento (Total Ingresos Ordinarios menos Total Egresos Ordinarios) es el PAT del ejercicio; NO el "Saldo
Final por Período", que mezcla operación con financiamiento. La pregunta de por qué San Lorenzo presupuesta en caja y no devengado
quedó en `Admin/dudas-por-club.md`, sección San Lorenzo.

Si aparece un presupuesto de OTRO club con esta estructura (Ordinario + Extraordinario/financiamiento en secciones separadas),
mismo criterio: solo la parte Ordinaria entra al sitio.

## 17. Impuestos / Cargas sociales / Moratoria: el mapeo ya está establecido

Revisado con grep sobre `data/*.js`, no de memoria:

- **Impuestos (tasas, impuestos municipales, ART, seguros)** → SIEMPRE `admin_general_expense`. Se cargan en casi todos los clubes:
  Vélez ("Impuestos (sectores)"/"Impuestos (administración)", los 11 ejercicios), San Lorenzo 2013 ("Impuestos y tasas"), Rosario
  Central ("Impuestos, tasas y contribuciones"). Es uno de los mapeos MÁS consistentes del sitio.
- **Cargas sociales** → NUNCA es su propia categoría. Se pega SIEMPRE a la categoría del sueldo al que corresponde, separando por
  sector si el documento lo permite: la porción de plantel profesional/cuerpo técnico va a `wages_squad` (junto con "Sueldos y
  primas" del mismo sector); el resto (amateur, polideportivo, administración, otros deportes) va a `youth_other_sports_expense` o
  `admin_general_expense` según el sector. Mismo patrón en Vélez, Estudiantes LP, Rosario Central, Racing, San Lorenzo.
- **Moratoria** (plan de pago de deuda impositiva) → el precedente está DIVIDIDO: Racing la cargó como `admin_general_expense` en 2
  ejercicios ("Pago de Moratoria") y como `other_expenses` en un tercero ("Pago de Otros Gastos Extraordinarios - Moratoria",
  porque ese balance la agrupaba bajo "Gastos Extraordinarios"). Nunca como interés (`netInterest`): una moratoria impositiva es un
  plan de pago de tasas/impuestos atrasados, no interés de deuda financiera. Cuando el documento la separa como línea propia, seguí
  dónde la agrupa el propio balance (Extraordinario → `other_expenses`; Ordinario/administración → `admin_general_expense`).
- **Fila combinada**: el Presupuesto 2023-24 de San Lorenzo junta los 3 conceptos en UNA fila ("Impuestos/Moratoria/Cargas
  sociales", un solo número por mes/Total); no hay forma de separarlos, así que se cargó entera como una única línea
  `admin_general_expense` (la única opción posible, y coherente con que impuestos y moratoria van ahí en la mayoría de los
  precedentes).

## 18. Una fuente que publica INGRESOS y no gastos: qué se carga, qué queda en `null`, qué NO se inventa

Aparece cuando la fuente no es el club sino su liga o su controladora. Es un caso de mapeo, no un hueco de carga: **un `null` acá es
el dato correcto.**

**Caso A: la liga publica un renglón por club (los 10 de la J.League).** El informe de gestión da el INGRESO de cada club y 3
líneas de desglose; su estructura de costos solo existe a nivel división. Entonces: `officialTotalRevenue` con el número y
`officialTotalExpenses: null` + `officialPAT: null`. Sin gastos publicados no hay resultado que cargar, y pedirle el PAT a estos
ejercicios es pedir un número que no existe en ninguna fuente (`fuentes/Japón/_notas-generales.md` documenta que el desglose por
club no está publicado en ningún lado; lo que queda son 2 preguntas abiertas en `Admin/dudas-por-club.md`, no trabajo de mapeo).

**Caso B: la controladora reporta un SEGMENTO, no el club (Club América dentro de Ollamani).** Un segmento IFRS 8 informa
"utilidad del segmento", que **no es el resultado neto** (no le imputa costos financieros ni impuestos) y puede agrupar al club con
otro negocio (acá, el Estadio Banorte). Entonces: los totales que SON una identidad aritmética del segmento se cargan
(`officialTotalRevenue`, `officialTotalExpenses`) y `officialPAT` queda en `null`. Cargar la utilidad del segmento como PAT
publicaría un "Resultado neto" que ningún documento afirma.

**En la vista**: un ejercicio así muestra "Sin dato" en Gastos y en Resultado neto, no `$0` (regla "SIN DATO NO ES CERO" en
`Admin/CONVENCIONES-DATOS.md`; la cascada arranca en los gastos y se lleva el resultado). **En la auditoría**: `tools/audit.js` no
reporta `balance-sin-pat` cuando `officialTotalExpenses` es `null`, porque no es accionable; no hace falta silenciar nada.

## 19. Rubros NIIF de Perú (Alianza Lima): academias, franquicias, concesionarios

Rubros que ningún club argentino tenía y que no encajaban limpio en la tabla de la sección 1:

- **"Ingresos por derechos de formación y transferencias"** → `player_sales` (igual que "Transferencia de Jugadores" de Racing).
- **"Franquicias de academias"** (franquiciar la marca/metodología "Academia [Club]" a un tercero que la opera, cobrando un canon;
  Nota NIIF15) → `youth_football`: es negocio de fútbol juvenil, aunque el ingreso sea un canon y no una cuota de alumno.
- **"Academias de fútbol Y vóley"** (operación propia, mixta con OTRO deporte, sin poder separar cada porción) → `other_sports`:
  no forzar una separación que el dato no permite.
- **"Ingresos por participación en torneos internacionales/nacionales"**, cuando el club los reporta como línea propia SEPARADA de la
  taquilla → `competition_bonus` (plata de la federación/confederación por participar, no de boletería).
- **"Concesionarios" (del estadio, fuera del día de partido)** → `stadium_other`.
- **"Servicios" dentro de "Gastos deportivos"** (bloque grande, S/ 9-15M/año, sin más desglose en la Nota) → se categorizó como
  `match_organisation_expense` por falta de otra opción mejor ("mejor aproximación disponible, no una certeza"); quedó como pregunta
  abierta en `Admin/dudas-por-club.md` porque el tamaño lo amerita.

## 20. Balance danés con la exención § 32 (Bruttofortjeneste, sin Revenue desglosado): todo a `lump_football_operations`

La Årsregnskabsloven danesa (§ 32) permite reportar el estado de resultados mostrando solo **"Bruttofortjeneste"** (Gross profit),
un número YA NETO de Nettoomsætning (revenue) + otros ingresos operativos - costos externos, sin desglosar ninguno de esos 3
componentes en ningún lado (ni en el cuerpo, ni en una nota, ni en la política contable, que solo explica QUÉ compone el neto).
Ejemplos: FC Nordsjælland, Randers FC, Vejle. A diferencia de fckobenhavn-dk, silkeborg-dk y agf-dk (que sí tienen Nota 2 "Revenue"
con entradas/TV/sponsors/merchandising), estos balances no dejan vía para separar el revenue.

**Regla**: cuando el balance usa esta exención (la política contable cita "årsregnskabslovens § 32" o describe el Gross profit como
neto de costos externos), TODO el revenue va como una única línea `lump_football_operations` por el valor de "Bruttofortjeneste".
Es el caso más extremo de la regla de la sección 1: ni siquiera hay un encabezado con líneas debajo, es un solo número. Los Gastos
sí se pueden seguir desglosando: Personaleomkostninger (Staff costs) y Af-/nedskrivninger (D&A) SIEMPRE se reportan aparte, y las
notas de roll-forward de activos permiten separar `player_amortisation` de `depreciation` cruzando "Transferrettigheder"/
"Kontraktrettigheder" contra el de PP&E.

**Efecto en "Formato simplificado"**: la fila "Fútbol profesional (sin desglosar por la fuente)" va a tener prácticamente el 100%
del revenue. Es el comportamiento CORRECTO acá, no un error de carga. Documentalo en el comentario de cabecera del archivo (con la
cita textual de la nota de política contable que confirma el § 32) y anotalo como pregunta en `Admin/dudas-por-club.md`, por si
existe una versión más desglosada del informe (uso interno del club).

**"Indtægter/Resultat af kapitalandele i tilknyttede virksomheder" (resultado de subsidiarias por el método de la participación) →
`netInterest`, no revenue.** randers-dk (un centro de empleo, un parque de negocios, un colegio deportivo) y vejle-dk (VB Plus ApS,
grupos de networking) la presentan ENTRE el resultado operativo y "Finansielle indtægter"/"Finansielle omkostninger", como una
línea más del bloque financiero. No es interés en sentido literal, pero es resultado no-operativo de inversiones, y sigue el
criterio de la sección 2. Documentá en el comentario que ese neto incluye este concepto.

---

## Cómo mantener este skill

Se lee UNA VEZ al empezar a mapear un balance/presupuesto nuevo, y se ACTUALIZA al terminar la sesión si:
- Apareció un rubro que no encajaba limpio en la tabla de la sección 1: agregalo con el criterio que usaste.
- Tomaste una decisión que contradice algo de este skill: actualizá la sección y explicá por qué el caso nuevo justificaba
  desviarse (no borres el criterio viejo sin más, salvo que haya quedado obsoleto).
- Encontraste un club con una estructura genuinamente distinta (otro país, otra moneda, otro régimen contable): evaluá si necesita su
  propia sección o un skill separado.
- Aprendiste algo nuevo sobre CÓMO leer un PDF fuente (otra trampa de escaneo, otra fila engañosa): va en las secciones 8-11, con el
  documento/página exacto donde se encontró.

No hace falta pedirle permiso a Guido para estas actualizaciones menores. Un cambio al texto de este skill se le muestra antes.

**Este es un skill de criterio, no un changelog.** Al agregar o editar una sección:

- **Se queda**: la regla de categorización/conversión, el árbol de decisión para un rubro o un `fx` ambiguo, y un ejemplo concreto
  (club, año, fila, importe) cuando ilustra CÓMO aplicar la regla.
- **No se escribe**: números de versión, fechas de decisión, "antes se hacía X", "ya no", cómo se llegó a la regla, contadores
  fijos ("hoy son N clubes") ni números de to-do. Eso va a `Admin/CHANGELOG.md`; los pendientes viven solo en `Admin/TODO.md`.
- **Antes de archivar algo** de acá, sacale lo que todavía sirve como criterio: la regla permanente que dejó, no el debugging.
