---
name: club-or-year-onboarding
description: Proceso y arquitectura para onboardear un club nuevo o un ejercicio nuevo de un club ya cargado en numeros-de-boca, qué preguntar ANTES de tocar código, qué patrones de UI/arquitectura ya existen y hay que reusar (no reinventar por club), y errores reales ya encontrados al extender una feature pensada para un solo club (Boca) a los demás. Complementa a club-data-mapping (que es sobre CÓMO categorizar rubros/moneda de un documento puntual), este skill es sobre CÓMO encarar la sesión de trabajo en sí: qué confirmar con Guido antes de "correr", y qué ya se aprendió sobre el código del sitio al hacerlo. Usar SIEMPRE al arrancar una sesión de onboarding, y actualizar al terminar (ver "Cómo mantener este skill" al final).
---

# Onboarding de club o ejercicio nuevo, proceso y arquitectura

Este skill es la memoria de CÓMO se encaró la sesión de trabajo que llevó los toggles USD/ARS y
Formato del club/simplificado de Boca a Racing y River (Versión 32 de numeros-de-boca), más el
onboarding del presupuesto 2026/27 de Racing en la misma sesión. No es sobre categorización de
rubros (para eso está `club-data-mapping`), es sobre el PROCESO: qué preguntar antes de construir,
qué piezas de arquitectura ya existen y hay que reusar, y qué bugs reales ya salieron al extender
algo pensado para un club a los demás.

## 0. Por qué existe un skill separado de `club-data-mapping`

`club-data-mapping` responde "¿en qué categoría va este rubro? ¿qué tipo de cambio uso?",
decisiones sobre UN documento puntual. Este skill responde "¿cómo estructuro la sesión completa de
onboarding?", decisiones sobre el PROCESO y sobre CÓDIGO compartido entre clubes (funciones de
index.html, no solo datos). Si estás cargando un balance/presupuesto nuevo, probablemente necesites
LOS DOS skills: este para el proceso y la arquitectura, `club-data-mapping` para el detalle de cómo
mapear cada rubro.

## 1. Antes de construir: hacer las preguntas, no asumir

Guido pidió explícitamente (sesión de la Versión 32) que antes de "correr" extendiendo una feature
de un club a otro se le pregunte, en vez de decidir solo. Las preguntas que importaron esa vez (y
el tipo de pregunta que vale la pena repetir):

- **¿A qué alcance exactamente?** "Agregá el toggle para Racing" puede significar SOLO Racing, o
  "todo lo que aplique el mismo criterio" (en ese caso, River también, porque es igual de
  argentino). No asumas el alcance más chico ni el más grande, preguntá. Ver también el bullet de
  `gestionesByClub`/`clubs[clubId].country` más abajo: una vez que la pregunta se contesta, la
  respuesta debería poder expresarse como una condición genérica en el código (`country === 'AR'`),
  no como una lista de ids hardcodeada, para que la PRÓXIMA vez que se agregue un club con el mismo
  criterio no haga falta tocar código de nuevo.
- **¿Corregir datos ya cargados y verificados, o solo aplicar la regla nueva de acá en adelante?**
  Si encontrás que el tipo de cambio que se venía usando no es el que declara el propio documento
  (ver `club-data-mapping` sección 5, regla 0), eso es una CORRECCIÓN de un ejercicio que ya pasó
  por `verifyTieOuts()`, preguntá si se corrige (más fiel a la fuente, pero cambia un número que
  Guido puede haber citado ya en otro lado) o si se deja como estaba y la regla nueva solo aplica
  para adelante.
- **¿Cuánto trabajo de re-extracción vale la pena?** Migrar un club de "amountNative ya convertido
  a USD" a "amountNative nativo con toggle" implica volver a leer los documentos fuente ejercicio
  por ejercicio. Si hay años viejos sin mucho valor incremental (ej. balances de una era sin
  gestión asignada, como Racing 2009-2011), preguntá si vale la pena re-extraerlos TODOS o solo los
  ejercicios recientes/con gestión, no asumas que "consistencia total" es lo que Guido quiere si
  el costo es alto y el beneficio marginal.
- **¿Hay una idea de card/feature nueva que el documento fuente sugiere?** Si el PDF nuevo tiene una
  sección que el sitio no muestra todavía para ningún club (ej. "Premisas Macroeconómicas" de los
  presupuestos de Racing, que Boca ya muestra como card "Supuestos"), proponelo, pero como
  pregunta u opción, no como algo que ya se construyó sin avisar.

## 2. Arquitectura ya generalizada, no reinventar por club

Estas piezas de index.html YA están escritas para funcionar con cualquier club, no solo Boca.
Buscalas y reusalas antes de escribir un `if(clubId === 'racing')` nuevo:

- **`yearMetaFor(clubId, year)`**: el único lugar que decide en qué moneda está guardado un
  ejercicio y con qué tipo de cambio convertirlo, para CUALQUIER club. Internamente delega a
  `yearMeta(year)` para Boca y lee `riverFiscalYearMeta[year]`/`racingFiscalYearMeta[year]` (campos
  `currency`/`fx`) para los demás. Si necesitás convertir un valor a la moneda que se está
  mostrando, llamá a esto, nunca hardcodees `'USD'` ni asumas la moneda de un club.
- **`toDisplayValue(value, meta, targetCurrency)`**: conversión pura, ya genérica, no toca.
- **`simplifiedReportForGeneric(clubId, year)`** + `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
  `_EXPENSE_BUCKETS`: el "Formato simplificado" para cualquier club que use el motor genérico
  (River/Racing, con `revenueLines`/`expenseLines` + `normalizedCategory`). Agrupa por
  `normalizedCategory` con un catch-all "Otros". NO hace falta escribir un
  `simplifiedReportForRiver`/`simplifiedReportForRacing` a mano como si fuera Boca
  (`simplifiedReportForBoca`, que SÍ es a mano porque Boca no tiene `normalizedCategory` en sus
  datos). Si un club nuevo necesita una categoría que no está en los buckets, agregala a la lista
  compartida (afecta a todos los clubes del motor genérico, que es lo que se quiere, buckets
  consistentes entre clubes es el objetivo de "Formato simplificado").
- **Toggle USD/ARS y Formato del club/simplificado, visibilidad**: gateada por
  `clubs[currentClub].country === 'AR'` (`refreshAllForClub()`), no por una lista de ids. Un club
  nuevo argentino hereda el toggle automáticamente con solo tener sus datos en el formato correcto
  (ver bullet siguiente), no hace falta tocar `refreshAllForClub()`.
- **Para que el toggle funcione de verdad, `amountNative` tiene que estar en la moneda NATIVA del
  club** (ARS, para los 3 clubes argentinos de hoy), no pre-convertido a USD, ver
  `club-data-mapping` sección "Guardar amountNative en ARS nativo". Este es el cambio de fondo que
  habilitó todo lo demás en la Versión 32.
- **`computeYearGeneric(clubId, year)`**: agnóstico de moneda a propósito, solo suma lo que hay en
  `amountNative`, sin convertir. La conversión pasa SIEMPRE en la capa de display (funciones que
  llaman a `yearMetaFor`), nunca acá. Si tocás esta función para sumarle algo, mantené esa
  separación (no le agregues un `toDisplayValue` adentro).

## 3. Bug real encontrado en esta sesión, gastosTotal ya viene convertido

Al generalizar `renderFinanzasStatsGeneric(cur, gastosTotal)` para que respete el toggle de moneda,
se cometió (y se corrigió, gracias a probar en el browser) este error: `gastosTotal` es un
parámetro que YA llega convertido a la moneda que se está mostrando (lo devuelve
`renderNativePLTable` → `buildNativeSectionHtml`, que ya aplica `toDisplayValue` fila por fila
antes de sumar el total). Pasarlo de nuevo por `toDisplayValue` lo convierte DOS VECES, el bug se
manifestó como "Gastos: 0.1 M USD" en vez de ~76 M USD (dividiendo por el tipo de cambio dos veces).
El patrón correcto (ya lo tenía `renderFinanzasStatsFromComputed`, la versión de Boca, de la que
había que copiar el criterio, no reinventarlo): `Math.abs(gastosTotal)` directo, SIN conversión
adicional, cuando `gastosTotal !== undefined`. Regla general: cualquier valor que venga como
parámetro de una función que YA hizo el trabajo de armar la tabla (`renderNativePLTable` y afines)
probablemente ya está en la moneda de display, verificar de dónde sale antes de asumir que hace
falta convertirlo de nuevo.

## 3b. Bug real: un card/elemento nuevo "solo para el club X" necesita `display:none` en el HTML si X no es el club default

Encontrado al agregar la card "Supuestos" de Racing (Versión 33): las cards `bocaPresupuestoOficialCard`
funcionan bien sin `style="display:none"` en el HTML porque Boca ES el club que carga por default
(`currentClub = 'boca'`), así que "visible por default" ya es el estado correcto para ellas. Pero
`refreshAllForClub()`, la función que esconde/muestra estas cards por club. NO se llama en el
`INIT` de la página (`refreshFinanzas()` sí, `refreshAllForClub()` no; ver el bloque
`// ---------- INIT ----------` al final del `<script>`), solo se llama cuando el usuario CAMBIA de
club (`clubSelect` `change` listener). Consecuencia: un elemento nuevo "solo para Racing" (o
cualquier club que NO sea el default) que no tenga `display:none` en su HTML se ve INCORRECTAMENTE
en la carga inicial (con Boca todavía seleccionado), hasta que el usuario cambie de club una vez.
Regla: cualquier card/elemento nuevo scopeado a un club que no sea el default necesita
`style="display:none"` en el HTML de entrada, no solo depender de la clase CSS + JS de
`refreshAllForClub()` para el estado inicial.

## 3c. REGLA VIGENTE (Versión 42, reemplaza la regla vieja de este mismo punto): estos 4 cards se
ESCONDEN por completo cuando no hay presupuesto para ese ejercicio, no se muestran con un mensaje
de "no hay"

Regla actual, la que hay que seguir hoy: "Supuestos", "Presupuesto Financiero", "Presupuesto de
Inversiones" e "Ingresos y Egresos por Torneo" (los 4 cards de Finanzas que dependen de tener un
documento de PRESUPUESTO cargado, no un balance) se esconden enteros (`display:none` en el `.card`)
cuando el club/ejercicio seleccionado no tiene datos en el mapa correspondiente
(`presupuestoSupuestosByClub`/`presupuestoFinancieroByClub`/`presupuestoInversionesByClub`, y el
`#torneosBoca2027` de los 3 cards de torneo). Nada de mensaje "no hay supuestos para este
ejercicio": si no hay dato, el card directamente no aparece.

Implementación de referencia (`renderSupuestosCard`/`renderPresupuestoFinancieroCard`/
`renderPresupuestoInversionesCard`/`renderTorneosCard` en index.html): cada función busca el dato en
su mapa `[clubId][year]` (o chequea `clubId==='boca' && year===2027` para los 3 cards de Boca 2027
con HTML estático); si no hay dato, pone `style.display='none'` en el `.card` y sale; si hay dato,
lo pone en `''` (visible) y pinta el contenido. No queda ninguna función `noDataMsg()` en el código:
se borró junto con este cambio, porque ya no la llama nadie.

Por qué cambió (para no perderlo de vista si en el futuro alguien propone volver a la regla vieja):
la versión anterior de esta regla (Versiones 34-35, "el card SIEMPRE tiene que estar, con un
mensaje explícito si no hay dato") fue un pedido explícito de Guido en su momento. En esta sesión
(Versión 42) Guido la REVIRTIÓ, también explícito: vio los 4 cards vacíos para el Ejercicio
2024/2025 de Boca (que tiene balance auditado, no presupuesto) y pidió que en vez de ocupar espacio
con el mensaje de "no hay", el card directamente no esté. Documentado acá para que quede claro que
NO es un descuido volver a esconder el card: es la regla vigente, pedida a propósito, y contradice
a propósito la regla anterior de este mismo documento.

Nota sobre paridad de contenido, que sigue vigente sin cambios: la regla (en cualquiera de sus dos
versiones) siempre fue sobre la PRESENCIA del card, no sobre que todos los clubes muestren el mismo
NIVEL de detalle. El documento de cada club sigue mandando. Ejemplo real: el Presupuesto Financiero
de Racing es un waterfall más simple que el de Boca (sin las filas de "créditos a cobrar"/"deudas a
pagar del ejercicio anterior") porque el presupuesto de Racing ya está armado en base de caja desde
el origen, no porque falte cargar algo. El Presupuesto de Inversiones de Racing muestra un solo
total sin desglosar por obra, porque el documento de Racing no llega a ese nivel de detalle (a
diferencia de Boca, que sí nombra cada proyecto); eso se dice explícito en la nota del card, no se
disimula. "Homologar" sigue siendo la ESTRUCTURA (mismo tipo de card, mismo criterio de cuándo
mostrarlo), no forzar que todos los clubes tengan la misma cantidad de filas.

## 3d. REGLA (pedida por Guido: "lo detesto"): la fuente NUNCA va adentro de un card individual

Nunca le agregues un párrafo/frase "Fuente: ..." adentro de un card específico (Supuestos,
Presupuesto Financiero, Presupuesto de Inversiones, Estado de resultados, o cualquier card nuevo
que se agregue). La cita de fuente va en los lugares ya establecidos para eso, que están al final
del bloque de Finanzas o arriba, no repetida card por card:

- `#finanzasDataQualityBanner` (arriba de Finanzas, `renderDataQualityBannerForCurrentSelection()`):
  banner por ejercicio, con el título/URL/nota de `sources{}` (`data/clubs.js`) cuando el dato NO es
  oficial (prensa, réplica no oficial, placeholder). Para años oficiales se esconde (el propio
  ejercicio siendo "año a año" con reportType official ya implica fuente primaria).
- `#finanzasClubSourceNote` (al final del bloque de cards de Finanzas,
  `finanzasClubSourceText[clubId]` + `renderClubSourceNote()`): UN resumen por club, no por card,
  de dónde salen los datos de ESE club en general.
- La pestaña **Fuentes** (`#fuentes`, HTML estático): el detalle completo, documento por documento,
  para quien quiera profundizar.

Si un card nuevo necesita una aclaración sobre CÓMO leer el número (ej. "el presupuesto de Racing ya
está en base de caja, a diferencia del de Boca", una diferencia de estructura/metodología, no de
dónde salió el dato), esa aclaración SÍ puede ir en el card, pero sin la palabra "Fuente:" ni citar
el documento, eso ya lo cubre el banner/nota de arriba. Error real cometido en la Versión 35 (y
corregido en la Versión 36): se le agregó un `sourceNote` con "Fuente: Presupuesto Financiero de
Ingresos y Egresos, Ejercicio..., documento oficial de Racing Club..." a CADA card nuevo de
Racing (Supuestos, Presupuesto Financiero, Presupuesto de Inversiones). Guido lo rechazó
explícitamente ("detesto que hagas eso"). El fix: se sacó `sourceNote` de los 3 mapas de datos
(`presupuestoSupuestosByClub`/`presupuestoFinancieroByClub`/`presupuestoInversionesByClub`), donde
quedaba contenido explicativo real más allá de la cita (ej. la nota de "base de caja" de Racing), se
renombró a `note` y se le sacó la frase "Fuente: ..." del principio, dejando solo la explicación.

## 4. Verificar en el browser de verdad, no solo revisar los números a mano

La cuenta a mano (verificar que `revenueLines`/`expenseLines` suman el total impreso del documento)
es necesaria pero NO alcanza, el bug de la sección 3 no se habría encontrado sin abrir el sitio y
tocar el toggle. Después de tocar cualquier función de display/conversión: `preview_start`, cambiar
de club, tocar los dos toggles (USD/ARS y Formato del club/simplificado), y leer los números en
pantalla, no solo confiar en que `verifyTieOuts()` (consola) pasa, porque esa función corre en
moneda NATIVA (nunca pasa por el toggle) y no habría detectado este bug de doble conversión.

**Extendido (Versión 38):** que `verifyTieOuts()` pase, y que "Formato del club" se vea bien, TAMPOCO
alcanza para dar por buena la categorización de un ejercicio nuevo, hay que mirar **cada línea de
"Formato simplificado"** individualmente, no solo el total. El bug del `lump_football_operations`
mal usado (ver `club-data-mapping` sección 1, la regla nueva sobre cuándo NO usar esa categoría)
pasó los 16 checks de `verifyTieOuts()` sin problema (el total de Ingresos/Gastos cerraba perfecto,
porque `lump_football_operations` sí suma al total igual que cualquier otra categoría) y "Formato
del club" se veía perfecto (el desglegable de `items` mostraba las 9 líneas reales), el ÚNICO lugar
donde el bug era visible era abriendo "Formato simplificado" y mirando que "Televisión / Derechos de
TV" decía $0 con una línea real de TV a la vista en el PDF. Regla: después de categorizar un
ejercicio nuevo, abrí "Formato simplificado" y confirmá que NINGÚN bucket que debería tener plata
(según lo que viste en el documento) esté en $0, un bucket en $0 sin explicación es la señal de que
algo quedó enterrado en `items` en vez de promovido a categoría propia.

### Gotcha de testing: caché de `<script src>` en el browser de preview

Si después de editar un archivo `data/*.js` los números en pantalla siguen viendo el valor VIEJO
(ej. un año que agregaste no aparece en `Object.keys(...)` a pesar de que `curl`/`fetch` al mismo
archivo sí lo muestra), sospechá de caché del browser para el `<script src="data/....js">`, no de
un error de código. `location.reload()`, `Cmd+Shift+R` y hasta parar/re-lanzar el mismo
`preview_start` (mismo puerto) pueden NO alcanzar, la forma que funcionó en esta sesión fue
cambiar el puerto del server en `.claude/launch.json` (nuevo puerto = nueva URL = caché nueva,
garantizado), probar, y después devolver el puerto a su valor original. Confirmalo ejecutando
`Object.keys(algunaConstDeEseArchivo)` con `javascript_tool` ANTES de asumir que hay un bug real en
los datos, si el conteo de años/claves no coincide con lo que vos escribiste en el archivo, es
caché, no tu código.

EXTENDIDO (Versión 43): el mismo problema de caché puede afectar al PROPIO `index.html`, no solo a
los `data/*.js`. Encontrado agregando una regla CSS nueva (`#anioSelect{width:300px;...}`): `curl`
al servidor la mostraba, pero `document.querySelector('style').textContent` en el navegador NO la
tenía después de un `navigate()` normal a la misma URL, ni `styleSheets[0].cssRules` la incluía. La
forma que funcionó, más simple que cambiar de puerto: agregar un query string cache-buster a la
URL del `navigate()` (`http://localhost:PUERTO/index.html?nocache=<numero cualquiera>`), o abrir
una pestaña nueva del navegador (`tabs_create`). Confirmalo con
`document.querySelector('style').textContent.includes('tu regla nueva')` (o el equivalente para JS
nuevo) ANTES de concluir que un cambio de CSS/JS "no funciona" en el navegador.

### Gotcha de testing: `computer` screenshot da BLANCO si la página está scrolleada

Encontrado al verificar un fix visual (Versión 37, el "$" tapado del gráfico de Finanzas): en este
entorno, `computer{action:"screenshot"}` devuelve una imagen en blanco cada vez que `window.scrollY
> 0` en el momento de la captura, no importa cómo se llegó ahí (`window.scrollTo`,
`scrollIntoView`, ni el `scroll_to` del `computer` tool, que sí mueve el scroll de verdad, confirmado
leyendo `window.scrollY` después). Con `scrollY === 0` la captura sale bien siempre. La vuelta que
funcionó: `resize_window` con un `height` custom bien grande (ej. 2500-3000px) para que TODO el
contenido relevante entre sin necesidad de scrollear, tomar el screenshot ahí (sale correcto), y
después `resize_window({preset:'desktop'})` para volver al tamaño normal. `zoom` con `region` (crop)
tampoco está soportado en este entorno ("region crop not yet supported"), devuelve la imagen
completa igual, así que para inspeccionar un detalle chico conviene el truco del viewport alto en
vez de tratar de recortar. Esto es una limitación del TOOLING de testing de esta sesión, no algo que
haya que "arreglar" en el sitio, no confundir una imagen en blanco con "la página no renderiza".

### Gotcha de verificación: `grep -oP '.{20}—.{20}'` (u otro cuantificador de caracteres alrededor
de un carácter especial) puede fallar en silencio cerca de acentos

Encontrado en la Versión 48, repasando la limpieza de em dashes de versiones anteriores: el patrón
`grep -noP '.{20}—.{20}'`, usado para listar contexto alrededor de cada em dash restante, no
siempre cuenta bien 20 caracteres cuando hay varias vocales acentuadas (más, línea, categoría, año)
cerca del carácter buscado, el cuantificador `.{20}` con `-P` (PCRE) en este entorno no maneja
consistente el UTF-8 multi-byte. Resultado real: 3 em dashes quedaron sin corregir en las Versiones
46-47 porque esas líneas específicas (con "más"/"línea" cerca) simplemente no aparecían en el
resultado del grep, dando una falsa sensación de "ya está todo limpio". El chequeo confiable: `grep
-n 'CARACTER' archivo` (sin capturar contexto con un cuantificador de caracteres, solo el número de
línea) y revisar cada línea completa a mano, no confiar en un patrón que recorta contexto alrededor
de texto en español con acentos.

## 5. Onboardear un ejercicio nuevo del MISMO tipo de documento que uno ya cargado

Cuando el club ya tiene un ejercicio cargado con el mismo formato de documento (ej. Racing ya tenía
el Presupuesto 2025/26 cargado, y llega el Presupuesto 2026/27 con la MISMA estructura de tabla), el
camino más rápido y menos propenso a error:

1. `pdftotext -layout` del PDF nuevo, transcribirlo completo a `.md` en la carpeta del club (ver
   CLAUDE.md, "Cada PDF nuevo: transcribirlo a Markdown ANTES de usarlo"), no saltear este paso
   aunque el formato ya sea conocido.
2. Comparar los ENCABEZADOS de rubro contra el ejercicio ya cargado, si son idénticos palabra por
   palabra (pasó con Racing 2026→2027), la categorización (`normalizedCategory` por línea) ya está
   resuelta: es la misma que el ejercicio anterior, rubro por rubro. Si un rubro nuevo aparece o uno
   viejo desaparece, ahí sí hay que decidir categoría nueva (ver `club-data-mapping` sección 1).
3. Sumar tu propia extracción y cruzarla contra los SUBTOTALES IMPRESOS del documento nuevo (no
   contra el ejercicio anterior), ver `club-data-mapping` sección 6. Un desajuste de centavos
   contra el subtotal impreso (encontrado real: Racing 2026/27, diferencia de $10.000 en un total de
   $105.550 millones) es redondeo del propio documento, usá el total impreso, no tu propia suma, y
   documentalo con el tamaño exacto de la diferencia para que quede claro que no es un error de
   carga.
4. Agregar el año nuevo a `gestionesByClub[club][gestion].lastYear` si corresponde (el ejercicio
   nuevo pasa a ser el más reciente de esa gestión), fácil de olvidar, y sin esto "Por gestión" no
   recoge el año nuevo aunque "Año a año" sí lo muestre.
5. Sumar el año nuevo a `verifyTieOuts()` (Revenue y Expenses contra los totales oficiales impresos)
  , mismo criterio que los años ya cargados de ese club.

## Cómo mantener este skill

Igual que `club-data-mapping`: se actualiza SOLO al terminar una sesión de onboarding, sin pedirle
permiso a Guido, si:
- Apareció una pregunta que valió la pena hacer ANTES de construir y que no está en la sección 1 →
  agregala con el contexto de por qué importó.
- Se generalizó una pieza de arquitectura nueva (otra función `xxxFor(clubId, ...)`, otro punto de
  extensión) → sumarla a la sección 2, para que la próxima sesión la encuentre y la reuse en vez de
  reinventarla.
- Se encontró un bug real de la misma familia que el de la sección 3 (algo que se ve fácil de
  generalizar pero tiene un supuesto oculto sobre en qué unidad/moneda/formato ya viene un valor) →
  documentarlo ahí, con el síntoma exacto (para que sea reconocible la próxima vez) y el fix.
- El patrón de la sección 5 (ejercicio nuevo, mismo formato) no aplicó limpio a un caso nuevo (ej.
  un club que SÍ cambia de formato de un año a otro) → documentar la excepción, no forzar el
  patrón.
