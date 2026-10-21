# Tipos de cambio y monedas

Lo que hay que saber para convertir a USD un club que no es ARS, o una moneda o un `fx` que no están cargados todavía: qué tipo de
cambio usar, cómo se escribe su procedencia (`fxSource`/`fxRef`) y en qué sentido va. Leelo cuando el club no sea argentino, cuando aparezca una moneda nueva o cuando haya que fijar un `fx`.

## Conversión a USD: cualquier moneda nativa, no solo ARS (ver `data/currency-map.js`)

- **Todos los clubes tienen toggle [moneda nativa / USD] en vivo**, con CUALQUIER moneda (ARS, BRL, CLP, COP, PEN, EUR, etc.). 
  `Admin/ARQUITECTURA.md`, "Monedas y tipo de cambio", tiene el modelo completo y es lectura obligatoria antes de onboardear un club
  fuera de Argentina. Se guardan los montos en la moneda NATIVA del documento (`amount` en el JSON del club, en millones de esa moneda: `unit.scale = 1000000`, escrito en cada archivo; tal cual
  el balance/presupuesto), con `years[].currency` y `years[].fx` diciendo en qué moneda está y con qué tipo de cambio convertir.
  La conversión pasa al renderizar (`yearMetaFor(clubId, year)` + `toDisplayValue`, en `js/finanzas-calc.js`). Nunca guardes un
  valor ya convertido, para ningún club.
- **El toggle SIEMPRE es [moneda nativa del club] <-> USD, nunca entre 2 monedas no-USD** (ej. nunca ARS<->BRL en vivo). USD es el
  pivote universal, igual que "Comparar Gestiones" (siempre en USD). No agregues un 3er destino a `toDisplayValue()` sin releer
  `Admin/ARQUITECTURA.md`, "Monedas y tipo de cambio".
- **Moneda nueva** (sin entrada en `CURRENCY_META`, `data/currency-map.js`): agregale una entrada (`scale:1` si sus montos leen
  bien en millones, como BRL, PEN, EUR; `scale:1000` si el valor nominal es tan grande que conviene "miles de millones", como ARS,
  CLP, COP). Sin entrada, el fallback `DEFAULT_CURRENCY_META` no rompe, pero puede leer raro.
- **Excepción documentada**: si un ejercicio NO tiene tipo de cambio propio recuperable (ni declarado por el documento ni con una
  fuente externa confiable, ej. Racing 2009-2011, balances sin Anexo de moneda extranjera) y quedó cargado en USD ya convertido,
  está bien dejarlo (`currency:'USD'` con el fx usado, documentado en la evidencia del club, en el título de ese año) en vez de forzar una re-extracción. El
  toggle funciona, reconstruyendo un ARS aproximado.

### Qué tipo de cambio usar, en orden de preferencia

0. **REGLA #0, antes que cualquier otra: si el propio documento declara SU PROPIO tipo de cambio de cierre, usá ESE**, no una
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

Los 7 valores de `FX_SOURCE` (`data/currency-map.js`) mapean a las reglas de arriba:

| `fxSource` | Cuándo | Regla |
|---|---|---|
| `document_close` | el balance declara su TC de cierre en su Anexo de moneda extranjera | 0 |
| `document_assumption` | el presupuesto declara un TC como premisa (todavía no hay cierre) | 3 |
| `document_average` | el balance declara un TC promedio del período para convertir su estado de resultados, distinto del de cierre que usa para el balance | n/a (caso aparte, ver `data/currency-map.js`) |
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
aproximación (`fxSource:'market_approx'`) en la evidencia del club: el título de ese año Y la fuente en "## Fuentes" (`Admin/carga-clubes/<clubId>.md`): la próxima
sesión tiene que distinguir "esto es exacto" de "esto es una estimación razonable".
