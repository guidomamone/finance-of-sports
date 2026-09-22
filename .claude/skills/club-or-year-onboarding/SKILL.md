---
name: club-or-year-onboarding
description: Proceso y arquitectura para onboardear un club nuevo o un ejercicio nuevo de un club ya cargado en finance-of-sports, qué preguntar ANTES de tocar código, qué patrones de UI/arquitectura ya existen y hay que reusar (no reinventar por club), y errores reales ya encontrados al extender una feature pensada para un solo club (Boca) a los demás. Complementa a club-data-mapping (que es sobre CÓMO categorizar rubros/moneda de un documento puntual), este skill es sobre CÓMO encarar la sesión de trabajo en sí: qué confirmar con Guido antes de "correr", y qué ya se aprendió sobre el código del sitio al hacerlo. Usar SIEMPRE al arrancar una sesión de onboarding, y actualizar al terminar (ver "Cómo mantener este skill" al final).
---

# Onboarding de club o ejercicio nuevo, proceso y arquitectura

Este skill es la memoria de CÓMO se encaró la sesión de trabajo que llevó los toggles USD/ARS y
Formato del club/simplificado de Boca a Racing y River (Versión 32 de finance-of-sports), más el
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

**Si necesitás leer un PDF fuente** (texto nativo vs. escaneo/OCR, deskew de un escaneo torcido, la
trampa de la "fila acumulada", cómo pedirle a Guido que confirme algo ilegible): eso vive en
`club-data-mapping/SKILL.md` secciones 8-11 (movido ahí en la Versión 62 — antes estaba repartido
entre los dos skills sin ningún criterio, ahora todo lo de "cómo leer el documento fuente" está
junto).

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

**Lo de arriba es sobre decisiones de ALCANCE/ARQUITECTURA — no aplica al ritmo de carga de
documentos dentro de un mismo pedido ya aprobado.** Cuando Guido pide onboardear "todos los
documentos que falten de la carpeta de [club]" (o equivalente: "seguí con el resto del archivo"),
eso ya es la autorización — cargar un documento, verificar que cierra, pasar al siguiente, SIN
pausar entre cada uno a preguntar "¿querés que siga con el próximo?". Pedido real de Guido (sesión
de la Versión 66, después de que una sesión anterior cargó un solo documento y se detuvo a
resumir): "debería seguir onboardeando para Racing hasta que terminemos de onboardear todos los
archivos disponibles en la carpeta". Sí vale la pena un mensaje corto de progreso cada tanto (qué
se cargó, qué falta), pero no una pausa que espere confirmación — esa pausa ya fue una vez motivo
de queja explícita. Esto es distinto de la sección 11 de `club-data-mapping/SKILL.md` (preguntar
cuando un número puntual es genuinamente ilegible): esa sí amerita frenar y preguntar, porque ahí
la duda es sobre EL DATO, no sobre si seguir trabajando.

## 2. Arquitectura ya generalizada, no reinventar por club

**CORRECCIÓN IMPORTANTE (Versión 82, encontrada al onboardear Vélez Sarsfield, el primer club nuevo
desde que existe este motor genérico)**: "ya generalizado" acá significaba, en la práctica, "ya
escrito con un ternario de 2 ramas (`clubId === 'river' ? X : Y`)", NO "genérico para cualquier
`clubId`". Nadie lo había notado porque nunca se había agregado un 3er club real hasta ahora. Casi
una decena de funciones (`computeYearGeneric`, `yearMetaFor`, `reportTypeForYear`,
`allYearsRangeForClub`, `presupuestoOverlayFor` en `js/finanzas-calc.js`; `drawTrendChartGeneric`,
`populateFinanzasSelectors`, `renderDataQualityBannerForCurrentSelection` en
`js/finanzas-render.js`; `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub` en
`index.html`) tuvieron que pasar de 2 a 3 ramas antes de que Vélez funcionara. **Si agregás un club
nuevo al motor genérico, buscá TODAS las ocurrencias de `'river'` Y `'racing'` como string literal en
`js/finanzas-calc.js`/`js/finanzas-render.js`/`index.html` ANTES de asumir que "ya es genérico" —
esta lista de 9 funciones puede no ser exhaustiva la próxima vez tampoco, volvé a buscar en vez de
confiar en esta lista.**

Estas piezas de index.html YA están escritas para funcionar con cualquier club, no solo Boca.
Buscalas y reusalas antes de escribir un `if(clubId === 'racing')` nuevo:

- **`yearMetaFor(clubId, year)`**: el único lugar que decide en qué moneda está guardado un
  ejercicio y con qué tipo de cambio convertirlo, para CUALQUIER club. Internamente delega a
  `yearMeta(year)` para Boca y lee `riverFiscalYearMeta[year]`/`racingFiscalYearMeta[year]` (campos
  `currency`/`fx`) para los demás. Si necesitás convertir un valor a la moneda que se está
  mostrando, llamá a esto, nunca hardcodees `'USD'` ni asumas la moneda de un club.
- **`toDisplayValue(value, meta, targetCurrency)`**: conversión pura, ya genérica, no toca.
- **`simplifiedReportForGeneric(clubId, year)`** + `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
  `_EXPENSE_BUCKETS`: el "Formato simplificado" para CUALQUIER club (todos usan el motor genérico
  desde la Versión 102, Boca incluida), con `revenueLines`/`expenseLines` + `normalizedCategory`.
  Agrupa por `normalizedCategory` con un catch-all (hoy "Otros ingresos" / "Otros gastos"). NO hace falta escribir un
  `simplifiedReportFor<Club>` a mano para ningún club — ese patrón existió para Boca
  (`simplifiedReportForBoca`) hasta la Versión 102, cuando se borró junto con el resto de su motor
  Boca-only. Si un club nuevo necesita una categoría que no está en los buckets, agregala a la lista
  compartida (afecta a todos los clubes por igual, que es lo que se quiere, buckets consistentes
  entre clubes es el objetivo de "Formato simplificado").
- **Toggle de moneda [nativa/USD], visibilidad (Versión 103, generalizado desde `clubs[clubId].country
  === 'AR'`)**: `populateCurrencyToggle(clubId)` en `index.html` arma el toggle dinámicamente a
  partir de `clubs[clubId].reportingCurrency` — un club nuevo lo hereda automático con solo tener
  `reportingCurrency` seteado en `data/clubs.js` y sus datos en el formato correcto (ver bullet
  siguiente), no hace falta tocar `refreshAllForClub()`. Si `reportingCurrency` es `'USD'` (ej.
  Ecuador, dolarizado), el toggle se esconde entero, no hay nada que togglear. Ver el comentario de
  cabecera de `data/currency-map.js` para el modelo completo.
- **"Formato del club"/"Formato simplificado" (`simplifyToggleWrap`), visibilidad**: SIEMPRE visible
  para cualquier club desde la Versión 103 (antes compartía el gate de país con el toggle de
  moneda por error — no tiene nada que ver con la moneda, depende solo de que el club tenga
  `normalizedCategory` en sus líneas, que todos tienen desde que Boca se migró al motor genérico en
  la Versión 102).
- **Para que el toggle de moneda funcione de verdad, `amountNative` tiene que estar en la moneda
  NATIVA del club** (la que declara `reportingCurrency`), no pre-convertido a USD, ver
  `club-data-mapping` sección 5. Este es el cambio de fondo que habilitó todo lo demás en la Versión
  32, generalizado a cualquier moneda en la Versión 103.
- **`computeYearGeneric(clubId, year)`**: agnóstico de moneda a propósito, solo suma lo que hay en
  `amountNative`, sin convertir. La conversión pasa SIEMPRE en la capa de display (funciones que
  llaman a `yearMetaFor`), nunca acá. Si tocás esta función para sumarle algo, mantené esa
  separación (no le agregues un `toDisplayValue` adentro).

## 3. Arquitectura de archivos para un club nuevo (Versión 51, YA NO es negociable por sesión)

Hasta la Versión 51, index.html era un solo `<script>` de ~2700 líneas con datos de Boca, cálculo y
render mezclados, y River/Racing se bajaban siempre aunque el visitante solo mirara Boca. Guido pidió
una limpieza de arquitectura ANTES de seguir agregando clubes, justamente para que este reparto no
dependiera de que cada sesión se acuerde de hacerlo bien. Lo que sigue es la estructura VIGENTE desde
el día uno para cualquier club nuevo, no una limpieza de una sola vez:

- **Datos del club, en su propio `data/<club>-data.js`.** Mismo patrón que ya tienen
  `data/river-data.js`/`data/racing-data.js` (y, desde la Versión 51, `data/boca-data.js`):
  `<club>RevenueLinesByYear`, `<club>ExpenseLinesByYear`, `<club>FiscalYearMeta`, `<club>PasesData`,
  `<club>ResultadosData`, `<club>TitulosData`. NUNCA pegues los datos de un club nuevo inline en el
  `<script>` de index.html, ni en `js/finanzas-calc.js`/`js/finanzas-render.js` (esos dos archivos
  son solo funciones, cero datos de un club puntual).
- **Cálculo separado de render.** Si el club nuevo usa el motor genérico (`revenueLines`/
  `expenseLines` + `normalizedCategory`, ver sección 2 arriba), probablemente NO necesitás escribir
  ninguna función nueva: `computeYearGeneric`/`simplifiedReportForGeneric`/`nativeReportFor` (en
  `js/finanzas-calc.js`) y `renderNativePLTable`/`update*ByGestion/ByAnioGeneric` (en
  `js/finanzas-render.js`) ya son genéricas por `clubId`. Si de verdad hace falta una función nueva
  porque el club tiene algo que ningún club anterior tenía (ej. un tipo de card nuevo), preguntate
  primero si CALCULA algo (va a `finanzas-calc.js`, sin tocar el DOM) o si PINTA algo (va a
  `finanzas-render.js`), no la agregues suelta en el `<script>` principal de index.html — ese
  archivo es solo estado compartido (`currentClub`, `currentCurrency`, etc.) y orquestación
  (`refreshFinanzas`/`refreshAllForClub`/`verifyTieOuts`/event listeners), no lugar para lógica
  nueva de un club.
- **Nombres de campo: copiá `normalizedCategory` de `data/category-map.js`, no inventes uno
  nuevo sin mirar primero.** Ver `club-data-mapping` sección 1 para la tabla de mapeos ya usados.
  Si agregás una categoría nueva de verdad (no existía en ningún club anterior), sumala a
  `REVENUE_CATEGORIES`/`EXPENSE_CATEGORIES` y sus `_LABELS` en `category-map.js` EN LA MISMA
  sesión en la que la usás por primera vez, no lo dejes para después: la Versión 51 encontró y
  corrigió `player_sales` (usado en `racing-data.js` desde la Versión 15/16, pero nunca sumado a
  `category-map.js`, que en cambio tenía un `transfer_income_gross` que nadie usaba) — quedó así
  de desincronizado varias versiones simplemente porque nadie lo agregó en el momento. Si además
  agregás la categoría a `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS` (en
  `js/finanzas-calc.js`), usá el nombre nuevo directo, sin dejar un alias del nombre viejo/temporal
  que probaste primero.
- **Las filas de Ingresos cambiaron en la Versión 189, y eso cambia cómo se categoriza un club
  nuevo.** Son: Cuotas Sociales, Comercial / Sponsors, **Estadio** (una sola fila con
  `matchday_competition` + `season_tickets` + `stadium_other`; el acordeón los separa), Televisión,
  Premios por competencias, Venta de Jugadores, **Educación** (`education`), **Otras secciones
  deportivas** (`other_sports` + `youth_football` + `womens_football`), el bolsón sin desglosar, y
  el catch-all **"Otros ingresos"**. Al mapear un club nuevo: antes de mandar una línea de colegio,
  polideportivo o uso del estadio a `other_income` por descarte, mirá esas 3 categorías — el
  criterio de cuál va en cuál está en `club-data-mapping` sección 1 y sección 13. Y si vas a
  tocar la fusión de abonos, el interruptor es `ABONOS_DENTRO_DE_ESTADIO` en `js/finanzas-calc.js`,
  no los datos.
- **Lazy-loading: sumar el club a la carga bajo demanda, NUNCA al `<head>` fijo.** El archivo
  `data/<club>-data.js` NO va en la lista de `<script src>` del `<head>` de index.html (esa lista
  solo tiene `clubs.js`/`category-map.js`/`boca-data.js`/`js/finanzas-calc.js`/
  `js/finanzas-render.js`, porque Boca es el club default). En cambio:
  1. NADA que tocar en index.html para esto (Versión 112, reemplaza el mapa `CLUB_DATA_SCRIPT_SRC`
     que había que editar a mano en cada onboarding — con 1000 clubes de destino, un mapa así se
     vuelve un artefacto de cientos/miles de líneas y una fuente segura de typos/colisiones entre
     agentes en paralelo). `loadClubData(clubId)` construye el path directo:
     `'data/' + clubId + '-data.js'`. Con que tu archivo se llame así (que ya es la convención de
     TODOS los clubes cargados hasta ahora, sin excepción), alcanza — `loadClubData` ya sabe
     inyectar el `<script>` la primera vez que alguien elige ese club en `clubSelect`. Si alguna vez
     un club necesita un nombre de archivo distinto por algún motivo real, agregá una entrada a
     `CLUB_DATA_SCRIPT_OVERRIDE` (cerca de `loadClubData`, en index.html) en vez de volver al mapa
     completo.
  1b. Sumá la entrada de identidad del club a `clubs{}` en `data/clubs.js` (`id`/`name`/
     `displayName`/`country`/`reportingCurrency`/`fiscalYearStart`/`sport`/`brandColor`, copiá el
     shape de cualquier club ya cargado). `displayName` (Versión 101) es el nombre CORTO que se muestra en el
     dropdown del header — es OBLIGATORIO, `populateClubSelect()` (index.html) arma el `<option>`
     de cada club a partir de este campo y ordena alfabéticamente por él; si falta, tira
     `TypeError` al armar el dropdown para TODOS los clubes, no solo el nuevo. El dropdown en sí ya
     NO se edita a mano (antes sí, ver comentario de `#clubSelect` en index.html). ÚNICO campo que
     sigue siendo centralizado en `data/clubs.js` — hace falta ANTES de elegir ningún club (el
     dropdown se arma al cargar la página), así que no puede autoregistrarse desde un archivo que
     todavía no se pidió, a diferencia de todo lo del punto 1c.
     **`brandColor` se resuelve ACÁ, en el onboarding del club nuevo, no después (Versión 179).**
     Los primeros 41 se hicieron en una barrida de una sola sesión (Versión 178) y esa barrida no
     se repite: el club #42 entra con su color ya puesto. Un ejercicio nuevo de un club ya cargado
     NO necesita este paso — `clubs{}` solo se toca cuando el club es nuevo. Dos capas, EN ESTE
     ORDEN (invertirlo es la trampa del primer bullet de abajo):
     1. **Identidad primero: ¿de qué color es el club?** Infobox de Wikipedia en el idioma del
        país, preguntando por los colores ACTUALES *y* si hubo cambios históricos, en el mismo
        prompt (a `pt.wikipedia`, "¿cuáles son los colores del Mirassol?" contesta azul y blanco,
        que fue verdad entre 1964 y 1981); o el color que declare oficialmente la liga cuando
        existe — la `クラブカラー` de la J.League resolvió los 10 japoneses con un fetch cada uno y
        cero ambigüedad.
     2. **Recién después el hex**, y se acepta SOLO si cae en la familia que fijó la capa 1. Los
        dos intentos baratos, que fallan rápido: un `curl` al sitio oficial buscando `theme-color`
        (6 aciertos en 41 — el resto son apps JS que devuelven un shell vacío, sitios caídos o un
        WAF) y el wikitext de la plantilla de camiseta (`?action=raw` + `body1`, exacto cuando está
        lleno, hoy casi siempre vacío). Si no, agregadores: las tablas POR LIGA de footylogos
        (`/color-codes/<liga>`) resuelven media liga de una sola vez, logotyp.us y teamcolorcodes
        sirven por club. No gastes fetches en encycolorpedia ni brandfetch (403 los dos) ni en
        whatthelogo (devuelve tonos lavados: `#F27CB1` para el rosa de Cerezo). Los slugs de
        logotyp.us y teamcolorcodes son inestables (`f-marinos` anda, `yokohama-f-marinos` 404): si
        el slug 404ea, leé el hex del snippet de búsqueda en vez de seguir adivinando. footylogos
        no tiene J.League.

     Cuatro trampas ya pagadas en la barrida de los 41, que son de donde sale ese orden:
     - **El `theme-color`/CSS del sitio oficial sirve para PRECISAR un color que ya sabés cuál es,
       nunca para descubrirlo.** El CSS del Real Madrid declara `--rm-color-primary-default:
       #3E31FA`, un violeta de su design system; el del Sevilla es Bootstrap puro (`--bs-primary:
       #0d6efd`); el de Unión es el rojo default de WordPress; el de Boca son grises de Webflow. Si
       el hex del sitio no cae en la familia de la capa 1, se descarta el hex, no la fuente.
     - **Nunca tomes el primer color de la paleta de un agregador**: están ordenadas por el ESCUDO,
       y el color del club es el de la CAMISETA. logotyp.us lista a Kashima con el negro primero y
       el rojo tercero, y a Nagoya igual — de ahí salen unos Antlers negros.
     - **Bicolor en partes iguales** (San Lorenzo, Rosario Central, Gamba Osaka, FC Tokyo):
       desempatá en este orden — (a) el club o la liga declara una lista ORDENADA y gana el
       primero (el caso japonés, muy limpio); (b) Wikipedia dice explícitamente cuál predomina
       ("con predominancia del primero", Argentinos); (c) el `theme-color` propio (San Lorenzo,
       `#00325A`); (d) si el otro color es blanco, gana el que no es blanco (Estudiantes,
       Instituto, Unión). Si no aplica ninguno de los cuatro, es pregunta para Guido (Rosario
       Central).
     - **Camiseta blanca con un acento fuerte: no se resuelve buscando más, es decisión de
       producto.** Fueron 6 de los primeros 41 (River, Vélez, Sevilla, Real Madrid, Valencia, Once
       Caldas), o sea ~15% de los clubes. Mandala directo a Guido en vez de gastar fetches.

     **Si queda ambiguo, o el color que lo identifica es el blanco: `brandColor: null`, que es un
     RESULTADO CERRADO, no un pendiente.** `pintarCrest()` (`js/selector.js`) trata el `null` igual
     que el campo ausente (`if(!c)` → resetea y cae al azul del sitio), así que en pantalla no
     cambia nada: el `null` existe para distinguir un club QUE SE MIRÓ Y NO LLEVA COLOR de uno que
     nadie chequeó todavía, que es lo único que evita tener que rebarrer los 200 clubes de mañana
     para averiguar cuál es cuál. Ninguna sesión futura "completa" un `null` a ojo: un color
     equivocado se lee peor que ninguno (`Admin/CONVENCIONES.md`). Y en el otro sentido: **un
     `brandColor` no se oscurece ni se retoca para que pase el contraste del círculo** — para eso
     están `textoSobre()` (cambia el TEXTO, no el color del club) y el aro interno de los colores
     claros; si aun así no se lleva, va a `null`. Un club sin `brandColor` y sin `null` lo marca
     `node tools/audit.js` (`club-sin-color-ni-null`, P3).

     **La procedencia del color se anota en `fuentes/<País>/<Club>.md`, NO en `data/clubs.js`**:
     ese archivo es eager y se baja en CADA pageview (el comentario de cabecera de la Versión 178
     ya le costó ~2,5 KB), y `fuentes/` no se publica. Con una línea alcanza: `Color de marca:
     #XXXXXX — <fuente>, verificado AAAA-MM-DD`.

     **Cuánto presupuestar**: un club fácil son segundos; uno dudoso, 2 a 5 fetches y varios
     minutos (de los primeros 41, ~10 necesitaron más que el camino default, 5 terminaron en
     pregunta y 2 en `null`). Presupuestá el caso dudoso, no el fácil: la barrida de los 41 tuvo
     una economía de escala que un club suelto no tiene (una sola tabla de footylogos resolvió 11
     argentinos de una). Si el club #42 entra junto con otros de su misma liga, arrancá por la
     tabla de esa liga: salen 10 por el precio de 1. En cualquier caso es barato al lado de
     transcribir el PDF, que es el resto del onboarding.
  1c. `sources{}`/`gestionesByClub{}`/`memberCountByClub{}` (Versión 101) NO se tocan en
     `data/clubs.js` — se autoregistran al final de tu propio `data/<club>-data.js`, mismo momento
     que el registro en `CLUB_GENERIC_DATA` (punto 2 de abajo), copiando el patrón de cualquier
     club ya cargado como plantilla:
     ```js
     Object.assign(sources, { '<club>-fuente-1': {...}, '<club>-fuente-2': {...} });
     gestionesByClub.<club> = { <gestionId>: { nombre:'...', firstYear:..., lastYear:... } };
     memberCountByClub.<club> = <número o null>;
     ```
     Nunca redeclares estos 3 con `const` (ya existen, declarados una sola vez en `data/clubs.js`
     con Boca adentro) — solo asignales una propiedad nueva o hacé `Object.assign`. Esto es seguro
     porque los 3 solo se LEEN para el club actualmente elegido (después de que su propio archivo ya
     cargó), a diferencia de `clubs{}` (punto 1b), que hace falta para TODOS los clubes desde el
     arranque.

     `gestionesByClub.<club>` YA NO ES ESTRICTAMENTE NECESARIO agregarlo con contenido real
     (Versión 112: el toggle "Por gestión" de Finanzas está oculto — Guido, escalando a 1000
     clubes: "i dont care anymore about the Por Gestión toggle" — y `renderInicioStats()`/
     `currentGestionKey()` ya degradan solos a "Sin dato" si `gestionesByClub[clubId]` no existe o
     está vacío, en vez de tirar `TypeError` como pasaba antes de esa versión). Sigue siendo mejor
     agregar una entrada real cuando SE CONOCE la gestión/presidencia (clubes argentinos con
     historia conocida), pero para un club nuevo sin esa info confirmada (la mayoría de los clubes
     fuera de Argentina onboardeados hasta ahora) ya no hace falta inventar una entrada sintética
     "Gestión actual" solo para evitar un crash — podés dejarlo sin tocar directamente.
  2. `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub` (index.html) NO necesitan
     ningún cambio manual: leen `CLUB_GENERIC_DATA[clubId].pasesData` (etc.) directo, y tu
     `data/<club>-data.js` ya se autorregistra ahí (`window.CLUB_GENERIC_DATA.<club> = {...}`, ver
     el final de cualquier archivo de club ya cargado como plantilla) — con eso alcanza.
  3. `verifyTieOuts()` (Versión 101, refactor de escalabilidad) tampoco necesita ningún cambio
     manual: itera solo `Object.keys(window.CLUB_GENERIC_DATA)`, así que agregar tu club a ese
     registro (punto 2) ya alcanza para que se verifique. Lo único que hace falta es que cada año
     de tu `<club>FiscalYearMeta[year]` tenga `officialTotalRevenue`/`officialTotalExpenses`
     (ya hacía falta antes, para otras cuentas) y, si el ejercicio tiene un balance auditado real
     (no un presupuesto puro), también `officialPAT` (el "Superávit/Déficit del ejercicio" impreso)
     — sin ese 3er campo, ese año simplemente no suma el check de Resultado neto, mismo criterio
     que un presupuesto sin balance (ver Racing 2019/2026/2027 como ejemplo).
  4. Si el club nuevo pasa a ser el DEFAULT en vez de Boca (poco probable, pero por si acaso): recién
     ahí su `data/<club>-data.js` sí va al `<head>` como `<script src>` fijo, sacándolo de
     `CLUB_DATA_SCRIPT_SRC`, mismo criterio que hoy tiene Boca.
- **Regla nueva, sumada por el bug real de la Versión 51: nunca armes un objeto `{ river: X, racing:
  Y, <club>: Z }` de una sola vez para indexarlo después por `clubId`.** Un objeto así evalúa TODAS
  sus propiedades al crearse — con lazy-loading, eso lee la variable global del club que el
  visitante NO eligió, que puede no estar cargada todavía, y tira `ReferenceError` (pasó en
  `drawTrendChartGeneric`/`populateFinanzasSelectors`, con `{ river: riverFiscalYearMeta, racing:
  racingFiscalYearMeta }`). Usá siempre un ternario (`clubId === 'river' ? riverX : clubId ===
  'racing' ? racingX : <club>X`) o una función que reciba `clubId` y solo lea el global adentro
  (como `pasesDataForClub`, punto 2 arriba): las dos formas solo evalúan la rama que efectivamente
  hace falta, nunca las otras. Si al agregar un club nuevo encontrás un objeto de este tipo en el
  código (buscá `river:` seguido de `racing:` en la misma línea/bloque), convertilo ANTES de sumarle
  una tercera rama, no repliques el patrón viejo.
- **Verificación obligatoria en el navegador, no alcanza con que el código "se vea bien":** con
  Network abierto, cargar la página de cero y confirmar que `data/<club>-data.js` NO aparece en la
  lista (solo `clubs.js`/`category-map.js`/`boca-data.js`/los 2 `js/finanzas-*.js`); elegir el club
  nuevo y confirmar que ahí SÍ aparece un único GET 200; volver a Boca y de nuevo al club nuevo, y
  confirmar que esta vez NO se vuelve a pedir (debe quedar cacheado en `clubDataLoaded`). Un
  `window.addEventListener('error', ...)` propio durante ese ciclo (en vez de solo leer la consola
  acumulada) es más confiable para no dejar pasar un `ReferenceError` real, ver Versión 51 en
  `Admin/finance-of-sports-project.md` para el detalle de los 2 bugs que este chequeo habría agarrado.

## 4. Bug real encontrado en esta sesión, gastosTotal ya viene convertido

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

## 5. Bug real: un card/elemento nuevo "solo para el club X" necesita `display:none` en el HTML si X no es el club default

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

## 6. REGLA VIGENTE (Versión 42, reemplaza la regla vieja de este mismo punto): estos 4 cards se
ESCONDEN por completo cuando no hay presupuesto para ese ejercicio, no se muestran con un mensaje
de "no hay"

Regla actual, la que hay que seguir hoy: "Supuestos", "Presupuesto Financiero", "Presupuesto de
Inversiones" e "Ingresos y Egresos por Torneo" (los 4 cards de Finanzas que dependen de tener un
documento de PRESUPUESTO cargado, no un balance) se esconden enteros (`display:none` en el `.card`)
cuando el club/ejercicio seleccionado no tiene datos en el mapa correspondiente
(`presupuestoSupuestosByYear`/`presupuestoFinancieroByYear`/`presupuestoInversionesByYear` en el
`data/<club>-data.js` del club, y el `#torneosBoca2027` de los 3 cards de torneo). Nada de mensaje "no hay supuestos para este
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

## 7. REGLA (pedida por Guido: "lo detesto"): la fuente NUNCA va adentro de un card individual

Nunca le agregues un párrafo/frase "Fuente: ..." adentro de un card específico (Supuestos,
Presupuesto Financiero, Presupuesto de Inversiones, Estado de resultados, o cualquier card nuevo
que se agregue). La cita de fuente va en los lugares ya establecidos para eso, que están al final
del bloque de Finanzas o arriba, no repetida card por card:

- `#finanzasDataQualityBanner` (arriba de Finanzas, `renderDataQualityBannerForCurrentSelection()`):
  banner por ejercicio, con el título/URL/nota de `sources{}` (`data/clubs.js`) cuando el dato NO es
  oficial (prensa, réplica no oficial, placeholder). Para años oficiales se esconde (el propio
  ejercicio siendo "año a año" con reportType official ya implica fuente primaria).
- LA FICHA DE FUENTE al final del bloque de cards de Finanzas: el documento del ejercicio que se
  está mirando, con su link, tipo y nivel de fuente, el tipo de cambio usado CON su procedencia, y
  las salvedades que `sourceCaveats()` deriva de los datos.
  ESTE PUNTO DECÍA OTRA COSA Y YA NO ERA CIERTA: hablaba de `#finanzasClubSourceNote`,
  `finanzasClubSourceText[clubId]` y `renderClubSourceNote()` — un texto fijo escrito a mano con 3
  entradas (Boca, Racing, River), o sea que un club nuevo no mostraba nada. Lo reemplazó la ficha
  por ejercicio de la Versión 126/127, que sale de `sources{}` y no hay que escribirle una entrada
  a cada club.
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
(los 3 `presupuesto*ByYear` del club, que hasta la Versión 135 eran registros en el render), donde
quedaba contenido explicativo real más allá de la cita (ej. la nota de "base de caja" de Racing), se
renombró a `note` y se le sacó la frase "Fuente: ..." del principio, dejando solo la explicación.

## 8. Verificar en el browser de verdad, no solo revisar los números a mano

La cuenta a mano (verificar que `revenueLines`/`expenseLines` suman el total impreso del documento)
es necesaria pero NO alcanza, el bug de la sección 4 no se habría encontrado sin abrir el sitio y
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

Los 3 "gotcha" de tooling que vivían acá (caché del `<script src>` en el navegador de preview,
screenshot en blanco con la página scrolleada, `grep -oP` fallando cerca de acentos) se mudaron a
`CLAUDE.md` (sección "Gotchas de tooling", Versión 62): no son específicos de onboarding, aplican a
cualquier sesión que toque este sitio, y `CLAUDE.md` se lee siempre, a diferencia de este skill.

## 9. Onboardear un ejercicio nuevo del MISMO tipo de documento que uno ya cargado

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
5. Agregar `officialTotalRevenue`/`officialTotalExpenses`/`officialPAT` (si hay balance auditado
   real, no solo presupuesto) al `fiscalYearMeta[year]` del año nuevo, en el propio
   `data/<club>-data.js` (mismo criterio que los años ya cargados de ese club) — desde la Versión
   101, `verifyTieOuts()` ya NO se edita a mano: itera sola cualquier año que tenga estos campos,
   para cualquier club en `CLUB_GENERIC_DATA`.

## 10. El sufijo entre paréntesis del dropdown "Año": SOLO 4 palabras posibles, nunca una 5ta

REGLA PERMANENTE (Versión 56, pedido explícito de Guido: "en el menu dropdown de Anio, poneme
siempre entre parentesis si: Presupuesto, Presupuesto y Balance, Placeholder. No salgas de esas
opciones"; ACTUALIZADA en la Versión 61, ver abajo). El `<select id="anioSelect">` de Finanzas arma
el label de cada ejercicio con `anioDropdownSuffix(reportType)` (`js/finanzas-calc.js`), que
devuelve EXACTAMENTE uno de estos 4 resultados, nunca un texto libre inventado para un caso puntual:

| `reportType` | Sufijo en el dropdown |
|---|---|
| `official_balance_sheet` | `(Balance)` |
| `unofficial_mirror` (balance real conseguido en una réplica no oficial, ej. River 2024) | `(Balance)` |
| `official_budget` | `(Presupuesto)` |
| `official_budget_and_balance` (ejercicio con LAS DOS fuentes reales cargadas a la vez, ver más abajo) | `(Presupuesto y Balance)` |
| `pending_official` (ejercicio real que el club todavía no publicó, ver `reportTypeForYear`) | `(Placeholder)` |
| `placeholder` (números inventados a propósito para probar el diseño) | `(Placeholder)` |

**ACTUALIZADO Versión 61** (pedido explícito de Guido: "agregar Balance como opción, la cual aplica
para todos los años que tenés sin nada en paréntesis"): antes, `official_balance_sheet`/
`unofficial_mirror` devolvían `''` (sin paréntesis, la 4ta opción quedaba implícita: "si no dice
nada, es un balance real, lo normal"). Guido pidió que esa 4ta opción se anuncie explícita como
cualquier otra, así que el `return ''` por default de `anioDropdownSuffix()` pasó a `return '
(Balance)'`. Sigue siendo la MISMA regla de fondo (4 palabras posibles, nunca una 5ta inventada para
un caso puntual), solo cambió qué texto usa el caso default.

**También Versión 61: el `<select>` ya NO lleva el prefijo "Ejercicio " en sus opciones** (pedido de
Guido: "que no aparezca 'ejercicio 2020/2021' sino '2020/2021'. Ejercicio sino queda muy redundante
y agota la vista"). `populateFinanzasSelectors()` arma el label como `(year-1)+'/'+year+sufijo`, sin
prefijo — esto es un cambio DISTINTO del sufijo entre paréntesis de arriba, no lo reemplaza: el
prefijo "Ejercicio"/"Balance"/"Presupuesto" sigue existiendo en el header de la tabla "Estado de
resultados" (`ejercicioLabel()`), solo se sacó del propio `<select>`. **Ver sección 14 para el
mapeo `reportType` → prefijo de `ejercicioLabel()`, que SÍ cambió después de esta versión
(`official_balance_sheet` pasó a decir "Balance", no "Ejercicio").**

Antes de la Versión 56, cada club/año tenía su propio texto suelto para el sufijo, escrito por quien
cargó ese ejercicio en su momento: "(presupuestado)", "(esperando datos)", "(estimado)" en distintos
lugares del código, sin ningún criterio compartido. Si se agrega un club/ejercicio nuevo, o un
reportType nuevo, el sufijo tiene que salir de `anioDropdownSuffix()`, nunca escribirse a mano en el
array `years` de `populateFinanzasSelectors()` (`js/finanzas-render.js`) ni en el `<option>` estático
de `index.html` (ese `<option>` es solo un fallback visual por si el JS tarda en cargar, tiene que
decir lo mismo que calcularía `anioDropdownSuffix()` + el año sin prefijo, no un texto propio).

**`pending_official` y `placeholder` se ven IGUAL en el dropdown a propósito**: de cara al
visitante, un ejercicio "real pero todavía no publicado" y uno "inventado para probar el diseño" se
ven igual (todo en $0, sin fuente real todavía) y no hay una 5ta palabra permitida para separarlos
en el dropdown. La diferencia SÍ se explica en el banner de calidad de dato (dentro de Finanzas),
que lee `reportType` directo y sí distingue los dos casos con su propio texto.

**`official_budget_and_balance` no lo usa ningún ejercicio CARGADO todavía** (al escribir esta
regla, en la Versión 56, se revisó `racingFiscalYearMeta` completo y los 7 ejercicios de Racing
cargados en ese momento eran cada uno SOLO balance o SOLO presupuesto). CORRECCIÓN de la Versión 57:
Guido aclaró que el archivo público de Racing SÍ tiene, para varios ejercicios históricos, tanto el
Presupuesto (aprobado al empezar el año) como el Balance (auditado al cerrarlo) — el archivo de
`Clubes/Argentina/Racing/` ya tiene los PDFs de ambos para varios años, simplemente ninguno de esos
pares está onboardeado (transcripto + cargado) todavía. Ver sección 11 para el mecanismo completo
que se construyó para soportar esto (`racingPresupuestoOverlayByYear`, columna "Balance"/
"Presupuesto" en Estado de resultados) y el to-do de qué PDFs quedan pendientes.

## 11. Ejercicio con Presupuesto Y Balance reales a la vez: overlay + columna "Balance"

REGLA PERMANENTE (Versión 57, pedido explícito de Guido: "muchos años de racing tienen ambos
presupuesto y balance, porque racing tiene de todo en la pagina... para cuando un mismo año tenga
both presupuesto y balance, en estado de resultado agregá una columna que sea Balance").

**Decisión de arquitectura (confirmada con Guido antes de construir, vía `AskUserQuestion`)**:
- El **Balance real es SIEMPRE el dato primario** de un ejercicio dual: KPIs de arriba de Finanzas,
  Formato Simplificado, y los checks de `verifyTieOuts()` salen del balance, nunca del overlay de
  presupuesto. Mismo criterio que ya regía para cualquier ejercicio de balance real (sin sufijo en
  el dropdown = "lo normal").
- La columna "Ejercicio Anterior"/Var./Var. % que comparaba el año actual contra OTRO año se sacó
  del TODO (de los 3 clubes, los 2 modos Año a año/Por gestión) — Guido pensaba que ya no existía,
  y prefirió sacarla de verdad antes que mantenerla. Esa infraestructura (2da columna + Var./Var. %,
  `buildNativeSectionHtml`) se REUTILIZÓ para la comparación Presupuesto-vs-Balance del MISMO
  ejercicio, no se reconstruyó de cero.

**Cómo cargar un ejercicio dual, paso a paso:**
1. El balance real va en los lugares de siempre: `racing{Revenue,Expense}LinesByYear[year]` +
   `racingFiscalYearMeta[year]`, con `reportType:'official_budget_and_balance'` (no
   `'official_balance_sheet'`, ese reportType queda solo para ejercicios que NO tienen presupuesto
   propio cargado). Seguí `club-data-mapping/SKILL.md` para categorizar sus líneas, igual que
   cualquier balance.
2. El presupuesto de ESE MISMO ejercicio va en `racingPresupuestoOverlayByYear[year]` (declarado en
   `data/racing-data.js`, hoy vacío): `{ revenueLines, expenseLines, currency, fx, sourceId }`,
   mismo formato `{rawLabel, normalizedCategory, amountNative, items?}` que las líneas normales.
   `normalizedCategory` en el overlay no participa de ningún cálculo (no hay Formato Simplificado
   del overlay todavía, ver limitación abajo), pero cargalo igual por consistencia y por si se
   extiende a futuro.
3. NO hace falta tocar `js/finanzas-calc.js` ni `js/finanzas-render.js`: `presupuestoOverlayFor()`
   ya lee `racingPresupuestoOverlayByYear[year]` automáticamente en cuanto tiene una entrada, y
   `renderNativePLTable()`/`ejercicioLabel()`/`anioDropdownSuffix()` ya reaccionan solos al
   `reportType:'official_budget_and_balance'`.
4. Verificar en el navegador (no opcional, mismo criterio de siempre): la columna "Balance" pasa a
   mostrar el nombre correcto ("Balance AAAA/AAAA"), la columna "Presupuesto" aparece con los montos
   del overlay convertidos con SU PROPIO `fx` (no el del balance), el dropdown "Año" dice
   "(Presupuesto y Balance)", y los KPIs de arriba siguen dando los números del BALANCE (no una
   mezcla ni el overlay).

**RESUELTO en la Versión 59 (Guido, viendo el primer ejercicio real con overlay: "no quedó bien
racing. porque presupuesto tiene un 0 en todo salvo el total?")**: en "Formato Simplificado", el
overlay AHORA se agrupa con el mismo `bucketize()`/`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
`_EXPENSE_BUCKETS` que ya agrupa la columna primaria (`presupuestoOverlayReportFor()` chequea
`simplifyFormat` y bucketiza en vez de devolver `rawLabel`s crudos siempre). Como las dos columnas
usan los MISMOS labels de bucket ("Cuotas Sociales", "Compra de jugadores", etc.), el emparejamiento
por label ahora funciona fila por fila, no solo en el total de sección. `bucketize` se sacó de
adentro de `simplifiedReportForGeneric()` a una función compartida en `js/finanzas-calc.js` para
que las dos la puedan usar sin duplicar código.

**LIMITACIÓN QUE SIGUE VIGENTE, solo para "Formato del club"**: ahí el emparejamiento de filas
sigue siendo por `rawLabel` EXACTO (`buildNativeSectionHtml`/`findPrevVal`), porque en Formato del
club cada columna muestra las categorías TAL CUAL las reportó su propio documento (esa es la
gracia del toggle), y el balance y el presupuesto de un mismo ejercicio pueden nombrar lo mismo
distinto (ej. balance dice "Costo transferencia de jugadores", presupuesto dice "Pago por
adquisición de jugadores"). Ahí la fila no encuentra su par y muestra "—" en la columna
Presupuesto, aunque el TOTAL de la sección sí suma bien igual (no depende del matching por fila).
Esto es intencional, no un bug: forzar que Formato del club use nombres iguales entre los 2
documentos rompería la premisa de esa vista ("tal cual la fuente").

**Var./Var. % SE SACARON DE LA TABLA DEL TODO en la Versión 59** (Guido, mismo mensaje: "var y
var% deberian no estar ahi"): ya no existen ni en "Formato del club" ni en "Formato Simplificado",
para ningún club/ejercicio. La tabla quedó en 4 columnas siempre: Rubro, Actual, % del total, y la
4ta (Presupuesto/oculta) — ver `buildNativeSectionHtml()`/`syncPLTableColgroup()` en
`js/finanzas-render.js`.

**Verificación hecha al construir el mecanismo (Versión 57, sin datos reales todavía)**: se probó
con un overlay sintético inyectado por consola (Racing 2025, 3 líneas inventadas) para confirmar
que la columna aparece, los montos convierten con el fx propio del overlay, el header dice
"Balance"/"Presupuesto" correctamente, los KPIs de arriba siguen saliendo del balance real (no del
overlay) y `verifyTieOuts()` no se ve afectado. Ese overlay de prueba NUNCA se guardó en ningún
archivo, era solo en memoria del navegador para verificar el mecanismo. La Versión 58 cargó el
primer ejercicio real (Racing 2020) y la Versión 59 corrigió, con ese dato real puesto a prueba en
el navegador por Guido, los 2 problemas de arriba (Formato Simplificado en blanco, Var./Var.% de
más).

## 12. Reglas nuevas de la tabla "Estado de resultados" (Versión 60), para cualquier columna que se agregue a futuro

Tres pedidos de Guido sobre esta tabla en la misma sesión (Racing 2019/2020, revisando el mecanismo
de overlay de la sección 11) se convirtieron en reglas permanentes, no solo en fixes puntuales:

1. **Los números visibles TIENEN que reconciliar a simple vista.** Guido notó que Ingresos (32.9) -
   Gastos (39.8) no daba el Resultado Neto mostrado (-3.7) y preguntó, con razón, por qué ningún
   chequeo lo había detectado — el número final SIEMPRE fue correcto (`verifyTieOuts()` ya lo
   validaba), lo que estaba mal era que la fila que explica la diferencia (`extraRows`, ej.
   "Intereses netos") se sumaba al resultado pero no se mostraba en pantalla (una decisión de la
   Versión 54, para sacar copys redundantes). Fix: `renderNativePLTable()`
   (`js/finanzas-render.js`) volvió a mostrar las filas de `extraRows` cuando su valor no es cero
   (si es cero, no se agrega una fila sin sentido). REGLA: ninguna fila que participe en una suma
   mostrada en pantalla puede quedar oculta — si hace ruido visual para casos comunes, la solución es
   ocultarla CONDICIONALMENTE (valor no-cero), no ocultarla siempre. **EXCEPCIÓN agregada en la
   Versión 61, ver sección 13.3: "Intereses netos" específicamente dejó de ser condicional, se
   muestra siempre, incluso en $0** — esta regla de acá sigue siendo la de fondo para el resto de
   extraRows (Impuestos, Venta de activos, etc.), no se revirtió en general.
2. **Ninguna columna de la tabla puede forzar scroll horizontal en el card.** Guido: "desliza las
   columnas apenas a la izquierda para que no haya que scrollear. esto tambien deberia ser regla."
   Al agregar una columna nueva a `#finanzasPLTable` (`syncPLTableColgroup()` en
   `js/finanzas-render.js`, `<colgroup>`/`<thead>` en `index.html`), achicar los anchos de las
   columnas EXISTENTES en la misma medida que crece el total — nunca asumir que "hay lugar" sin
   verificar en el navegador con `element.scrollWidth` vs. `element.clientWidth` (tanto de la tabla
   completa como celda por celda: una columna angosta con `table-layout:fixed` no desborda la tabla,
   pero SÍ puede hacer que el CONTENIDO de una celda desborde si el texto no entra, lo que igual
   fuerza scroll — encontrado en esta misma sesión con el header en mayúsculas "PRESUPUESTO" en una
   columna de 78px). Verificar en al menos 2 anchos de viewport (desktop y `resize_window` a
   `tablet`), no solo el ancho por default del navegador.
3. **Ningún valor final debería quedar como "—" cuando hay datos reales para calcularlo.** Guido:
   "que resultado neto tenga un numero, no me lo dejes incompleto." Si una columna nueva (ej. el
   overlay de Presupuesto) tiene toda la información para calcular un total/resultado, calcularlo y
   mostrarlo, no dejar un placeholder solo porque la fila "principal" (Balance) es la que
   tradicionalmente se resalta — un "—" en un número que SÍ se puede calcular lee como un bug, no
   como una limitación real.

Al implementar el punto 3 en esta versión salió a la luz una ASIMETRÍA real en los datos del overlay
de Racing 2020 (`data/racing-data.js`, `racingPresupuestoOverlayByYear[2020]`): `revenueLines`
excluía a propósito su línea "extraordinaria" (`Cobros por venta de inversiones financieras`, 96 M)
mientras que `expenseLines` SÍ incluía su análoga (`Egresos extraordinarios`) como línea normal —
con ese criterio mixto, sumar `ingresos - gastos` del propio overlay no daba el superávit/déficit
presupuestado real. Se corrigió agregando la línea de ingreso faltante. Moraleja para cualquier
overlay futuro: las dos columnas (Balance y Presupuesto) tienen que usar el MISMO criterio sobre qué
cuenta como línea "normal" vs. "extraordinaria/financiera", si no el resultado propio de cada columna
no es comparable ni reconcilia con su propio total impreso.

## 13. Reglas nuevas de "Estado de resultados" y de los stats de arriba (Versión 61)

Guido, con captura de pantalla de un card ilegible, pidió 4 cosas en el mismo mensaje. Las 3
primeras son reglas permanentes que valen para cualquier club/año/columna futura, no solo el fix
puntual de esta sesión:

1. **Un header de tabla que no entra en una línea se parte en el punto elegido a mano, nunca se deja
   en manos de `overflow-wrap:break-word` solo.** El fix de la Versión 60 evitaba que un header
   desbordara su celda, pero no controlaba DÓNDE se partía la palabra — "PRESUPUESTO" en una columna
   angosta terminaba como "PRESUPU"/"ESTO", separando el diptongo "ue" a la mitad. `wrapHeaderLabel()`
   (`js/finanzas-calc.js`) fuerza el `<br>` a mano: prefijo + año en 2 líneas SIEMPRE (ver regla
   actualizada en la sección 14: NINGUNA palabra se parte nunca, ni siquiera "Presupuesto" que es más
   larga que "Balance"/"Ejercicio" — cada palabra se envuelve en un `<span style="white-space:nowrap">`
   para eso). La columna de overlay ("Presupuesto", `renderNativePLTable()` en
   `js/finanzas-render.js`) pasó por 3 correcciones seguidas en la misma sesión (sección 14): partida
   en "Presu"/"puesto" → entera pero sin año → entera CON año ("Presupuesto AAAA/AAAA", el mismo
   ejercicio que la columna principal, vía `ejercicioLabel(year, 'official_budget')`), que es el
   estado final — 2 líneas, igual formato que cualquier otra columna con prefijo+año. Si se agrega un
   header nuevo a esta tabla que tampoco entre en una línea, sumarle su propio caso a
   `wrapHeaderLabel()` (o a mano en el HTML si es un header estático como "% del total"), nunca
   confiar en que el wrap automático del browser va a partir la palabra en un lugar legible.
2. **Todas las columnas numéricas de una tabla comparan mejor con el MISMO ancho fijo**, no un ancho
   distinto por columna "porque el contenido es más corto" (antes 84px para valores, 54px para "%",
   alternado). Guido lo pidió explícito ("que todas las columnas tengan el mismo width") after ver
   que la asimetría de anchos hacía más difícil comparar Actual vs. Presupuesto a simple vista. El
   ancho elegido (100px en `#finanzasPLTable`) sale de medir en el navegador (un `<span>` de prueba
   con `getComputedStyle` del `<th>` real) cuál es el texto más ancho que puede aparecer en una sola
   línea con las reglas de wrap de arriba — no un número elegido a ojo.
3. **"Intereses netos" (y cualquier fila que exista precisamente para que la cuenta cierre) se
   muestra SIEMPRE, incluso en $0, para los 3 clubes por igual — no solo condicional a que su valor
   sea distinto de cero.** Guido: "me molesta que para Racing haya Intereses netos en el card y no
   para el resto... toca ponerlo para todos, aunque sea 0. Es decir, sumarlo al motor." Esto es una
   EXCEPCIÓN puntual a la regla de la Versión 60 ("ocultar extraRows en $0 para no generar ruido"),
   no una reversión de esa regla: el resto de extraRows (Impuestos, Venta de activos, Ganancia por
   venta de jugadores) siguen ocultas en $0, porque son casos genuinamente raros para la mayoría de
   los club/ejercicio — mostrarlas siempre volvería a ser el mismo ruido que la Versión 60 ya había
   evitado. La diferencia con "Intereses netos" es que su AUSENCIA (cuando un club la tiene y otro
   no) se leía como una inconsistencia entre clubes, no como limpieza visual. Si aparece OTRA fila
   con ese mismo problema a futuro (existe para reconciliar la cuenta, pero solo se ve para el club
   que la necesita), mismo criterio: sacarla de la lista condicional del motor
   (`nativeReportFor`/`simplifiedReportForGeneric`, `js/finanzas-calc.js`) y agregar su label a la
   excepción del filtro de `renderNativePLTable()` (`js/finanzas-render.js`), no ocultarla ni
   mostrarla para todas las extraRows por igual.

Relacionado, pero un stat DISTINTO (no de la tabla, de los cards de arriba de Finanzas,
`#finanzasStats`): Guido notó que Ingresos y Gastos ahí arriba no incluían nunca la plata de
`extraRows` (siempre fue así, no es un bug nuevo de esta versión), así que alguien mirando solo esos
2 números y "Resultado neto" podía pensar que el sitio no cierra la cuenta — el ejemplo real fue
literalmente el mismo de la sección 12.1 (Racing 2019/2020: 32,9 - 39,8 ≠ -3,7). Fix: nuevo stat
"Int." (entre "Gastos" y "Resultado neto"), alimentado por `extraTotal` — la MISMA suma de
`extraRows` que ya calculaba `renderNativePLTable()` para llegar al Resultado Neto de la tabla de
abajo, devuelta ahora también en su objeto de retorno. Si se agrega un stat nuevo a
`#finanzasStats` a futuro que dependa de un total ya calculado en otro lado, mismo criterio: devolver
ese total desde la función que ya lo calculó, no volver a sumarlo aparte (recalcularlo aparte es
cómo aparecieron los bugs de "3 cifras de Ingresos distintas" de la Versión 42).

La 4ta cosa que pidió Guido en el mismo mensaje (sacar el prefijo "Ejercicio " del `<select>` "Año"
y agregar "(Balance)" como 4ta palabra del sufijo) está documentada en la sección 10, no acá — es
sobre el dropdown, no sobre la tabla "Estado de resultados".

## 14. Header de "Estado de resultados": prefijo de `ejercicioLabel()` y regla de nunca partir una palabra

Dos pedidos de Guido en la misma sesión (mirando Boca 2026/2027 y 2024/2025), los dos generalizados
a REGLA PERMANENTE para cualquier club/ejercicio futuro, no solo el caso puntual que los disparó:

1. **`official_balance_sheet` pasa a usar el prefijo "Balance", no "Ejercicio".** Antes,
   `ejercicioLabel(year, reportType)` (`js/finanzas-calc.js`) solo devolvía "Balance" para
   `official_budget_and_balance` (el caso dual de la sección 11) y dejaba CUALQUIER otro reportType
   —incluido un balance real y solo— en el genérico "Ejercicio". Guido, viendo "EJERCICIO 2024/2025"
   para el balance de Boca (`reportType:'official_balance_sheet'`, un documento real, no un
   placeholder), pidió "Balance" ahí también. Mapeo actual completo:
   `official_budget` → "Presupuesto"; `official_budget_and_balance` U `official_balance_sheet` →
   "Balance"; cualquier otro (`placeholder`, `pending_official`, `unofficial_mirror`) → "Ejercicio"
   (genérico, sigue significando "no hay un documento oficial confirmado como balance o
   presupuesto todavía", igual que siempre). Si se agrega un reportType nuevo a futuro, decidir su
   prefijo con el mismo criterio: si el documento primario de ese ejercicio es un balance real
   (aunque llegue por una vía no 100% oficial, ver `unofficial_mirror` más abajo), usar "Balance"; si
   no hay documento real todavía, "Ejercicio".
   - `unofficial_mirror` (River 2024, balance real conseguido en una réplica no oficial) se dejó
     afuera A PROPÓSITO de este cambio, sigue diciendo "Ejercicio": es un balance real, pero la
     salvedad de fuente no oficial vive en su propio banner de calidad de dato (sección 10), no se
     revisó con Guido si esa salvedad también debería reflejarse en el prefijo de esta tabla — no
     asumir que aplica el mismo criterio sin confirmarlo primero si aparece el caso.
2. **Ninguna palabra del header se parte NUNCA, ni siquiera "Presupuesto" — con año al lado o sin
   él.** Contexto (2 rondas de la misma sesión): 1ra ronda, "Presupuesto 2026/2027" (Boca,
   `official_budget`) salía en 3 líneas ("Presu"/"puesto"/"2026/2027") porque `wrapHeaderLabel()`
   partía el prefijo en dos Y le sumaba la línea del año. Fix inicial: el prefijo con año al lado va
   COMPLETO en su propia línea. Guido, viendo el resultado, encontró la 2da ronda: la columna de
   overlay ("Presupuesto" SOLA, sin año — Racing 2019/2020, `official_budget_and_balance`) había
   quedado afuera del fix, seguía en "Presu"/"puesto" partida — "te quedó solamente PRESU-PUESTO,
   pero el cambio que dije antes aplica también." REGLA (`wrapHeaderLabel()`, `js/finanzas-calc.js`):
   nunca parte una palabra, la envuelve siempre en `<span style="white-space:nowrap">`, tenga o no un
   año al lado — sin excepción por longitud de palabra. Motivo técnico del `nowrap`: sin él, el propio
   `overflow-wrap:break-word` del `<th>` (que sigue haciendo falta como red de seguridad para un
   texto no previsto acá) parte la palabra sola en un punto feo tipo "PRESUPUES"/"TO", reintroduciendo
   el problema por la puerta de atrás — el `nowrap` fuerza esa palabra a un renglón único aunque
   desborde unos pocos px hacia la celda vecina (queda dentro del padding en blanco de esa celda,
   verificado en el navegador con `getBoundingClientRect()` que no pisa el texto "% del total" de al
   lado, con Boca/Racing en varios anchos).
3. **La columna de overlay ("Presupuesto") lleva el año al lado, igual que la columna principal.**
   3ra ronda, mismo pedido: con la 2da ronda ya corregida, la columna de overlay de Racing 2019/2020
   quedó en "Presupuesto" ENTERA pero SOLA, sin año — visualmente inconsistente con la columna
   principal de al lado, que sí dice "Balance 2019/2020". Guido: "solamente dice PRESUPUESTO, agregá
   el año también, como en el resto de los casos. Es una regla." Fix en `renderNativePLTable()`
   (`js/finanzas-render.js`): el header de la columna de overlay pasó de armar el string
   `'Presupuesto'` a mano a reusar `ejercicioLabel(year, 'official_budget')` (`js/finanzas-calc.js`)
   — el `year` es SIEMPRE el mismo ejercicio que la columna principal (el overlay nunca es de otro
   año, ver sección 11), así que no hace falta un año distinto, solo formatear "Presupuesto
   AAAA/AAAA" con el MISMO helper que arma cualquier otro prefijo+año del sitio, en vez de un string
   suelto. El resultado pasa por `wrapHeaderLabel()` igual que la columna principal, así que hereda
   la regla del punto 2 sin código nuevo: "Presupuesto"/"AAAA/AAAA", 2 líneas, prefijo entero con
   `nowrap`.

Verificado en el navegador (no opcional), las 3 rondas: Boca 2026/2027 ("Presupuesto"/"2026/2027",
2 líneas) y 2024/2025 ("Balance"/"2024/2025"), Racing 2024/2025 ("Balance"/"2024/2025"), Racing
2026/2027 ("Presupuesto"/"2026/2027", 2 líneas) y los 2 ejercicios duales de Racing —2019/2020 y
2017/2018— con columna primaria "Balance"/"AAAA/AAAA" + columna overlay "Presupuesto"/"AAAA/AAAA"
(mismo año en las 2, 2 líneas cada una) — ningún caso invade el texto de la columna "% del total"
de al lado.

## 15. REGLA (a pedido de Guido): un presupuesto en año CALENDARIO se reconstruye a temporada, nunca se carga tal cual

Motivo del pedido: Instituto ACC publicó su Presupuesto 2025 (y sus Premisas) en año calendario
(ene-25 a dic-25, con columna por mes), pero el sitio entero modela todo en TEMPORADA/ejercicio
económico (el mismo criterio que ya usa el balance auditado real de ese club, jul-jun) — cargar el
documento tal cual metería un `year` key que no es comparable con ningún otro del mismo club (un
"año" que arranca en enero, al lado de ejercicios que arrancan en julio).

**La regla, para cualquier club futuro que publique un presupuesto en año calendario**: nosotros
mismos reconstruimos la temporada, no lo subimos en año calendario. Si el documento tiene desglose
MENSUAL (columna por mes, no solo un total anual), se puede partir en 2 mitades de 6 meses y sumar
cada mitad con la mitad correspondiente de OTRO presupuesto calendario (el del año anterior o el
siguiente) para reconstruir una temporada completa (ene-jun de un año + jul-dic del año anterior =
temporada jul-jun). Si el documento NO tiene desglose mensual (solo un total del año calendario
entero), no hay forma de reconstruir ninguna temporada con un solo documento — hace falta el
documento del año calendario siguiente/anterior igual, para poder recortar cada uno a su mitad útil
antes de sumarlos.

**Caso real que disparó la regla, Instituto Presupuesto 2025**: SÍ tiene desglose mensual (12
columnas, ene-25 a dic-25 — ver `Clubes/Argentina/Instituto/presupuesto-2025.md`), así que en teoría
se podrían reconstruir 2 mitades de temporada: ene-jun 2025 (2da mitad del Ejercicio 2024/2025) y
jul-dic 2025 (1ra mitad del Ejercicio 2025/2026). Pero Instituto solo tiene ESTE presupuesto
descargado — no hay un Presupuesto 2024 (para completar la mitad jul-dic 2024 del Ejercicio
2024/2025) ni un Presupuesto 2026 (para completar la mitad ene-jun 2026 del Ejercicio 2025/2026) —
así que NINGUNA de las 2 temporadas queda completa con lo que tenemos hoy. Conclusión (regla
explícita de Guido: "para el caso en que tengamos solo la mitad de un año y sea irreconstruible,
mantengamos esa info pero no subamos info incompleta"): **no se cargó nada al sitio** para este
presupuesto — ni el año calendario tal cual (rompería el modelo de datos), ni una mitad de temporada
sola (sería un ejercicio incompleto, y el sitio no tiene forma de marcar "esto es solo 6 meses" sin
que se lea como un ejercicio completo raro). El documento y el hallazgo quedan documentados en
`fuentes/Argentina/Instituto.md` (ver el índice en `fuentes/_indice/Argentina.md`) para que si en el futuro aparece el Presupuesto 2024 o
2026 del mismo club, se pueda completar una de las 2 temporadas y recién ahí cargarla.

**Nota aparte encontrada en el mismo documento** (no una regla, un dato suelto para no perder): la
última columna mensual del PDF de Instituto dice "dic-24" en vez de "dic-25" — es un typo del propio
documento (todas las demás 11 columnas van ene-25 a nov-25, y el total anual solo cierra si esa
columna es diciembre del MISMO año 2025), no un error de transcripción.

## 17. AL TERMINAR: los 3 generados (Versión 184)

Cargar un club o un ejercicio deja **tres archivos generados desactualizados**, y los tres se
publican. No se editan a mano:

```
node tools/generate-club-index.js      # la sección "QUÉ ES REAL POR CLUB" de Admin/ESTADO.md
node tools/generate-fuentes-page.js    # fuentes.html, las 41 páginas de club y sitemap.xml
node tools/generate-rankings.js        # data/rankings/<liga>.js
```

El tercero es el más nuevo y el más fácil de olvidar porque **no se ve al mirar el club que acabás
de cargar**: alimenta el ranking de su liga en Inicio y en la pestaña Ligas, o sea otra pantalla.
Si no lo corrés, esa liga sigue mostrando el ranking sin el club nuevo — un número viejo, publicado,
con pinta de verificado. Por eso `node tools/audit.js` corre el `--check` de los tres y los reporta
como **P1** (`checkGenerados()`): no se puede pushear con uno desfasado.

**Y acordate de la fila de `data/club-leagues/<iso2>.js`**: sin ella el club no integra ninguna
liga, así que no aparece en ningún ranking aunque el generador haya corrido. La auditoría también
la cuenta (`liga-sin-verificar`, P3).

## Cómo mantener este skill

Igual que `club-data-mapping`: se actualiza SOLO al terminar una sesión de onboarding, sin pedirle
permiso a Guido, si:
- Apareció una pregunta que valió la pena hacer ANTES de construir y que no está en la sección 1 →
  agregala con el contexto de por qué importó.
- Se generalizó una pieza de arquitectura nueva (otra función `xxxFor(clubId, ...)`, otro punto de
  extensión) → sumarla a la sección 2, para que la próxima sesión la encuentre y la reuse en vez de
  reinventarla.
- Se encontró un bug real de la misma familia que el de la sección 4 (algo que se ve fácil de
  generalizar pero tiene un supuesto oculto sobre en qué unidad/moneda/formato ya viene un valor) →
  documentarlo ahí, con el síntoma exacto (para que sea reconocible la próxima vez) y el fix.
- El patrón de la sección 9 (ejercicio nuevo, mismo formato) no aplicó limpio a un caso nuevo (ej.
  un club que SÍ cambia de formato de un año a otro) → documentar la excepción, no forzar el
  patrón.

Lo que se aprenda sobre CÓMO leer un PDF fuente (trampas de escaneo, filas engañosas, cómo
consultarle a Guido) va en `club-data-mapping/SKILL.md` secciones 8-11 (movido ahí en la Versión 62,
ver sección 0 arriba), no acá.

## 16. RESUELTO en el motor (Versión 112): `gestionesByClub[clubId]` vacío/inexistente ya no rompe nada

Encontrado originalmente al cargar Once Caldas/Envigado (Versión 110, primeros clubes colombianos,
sociedades anónimas con Representante Legal en vez de un club asociativo con presidente electo — no
aplica el concepto de "gestión" en el sentido argentino). El fix de esa versión fue "del lado de los
datos" (agregar una entrada sintética `{ actual: {...} }` por club) — funcionaba, pero dependía de
que CADA sesión de onboarding futura se acordara de hacerlo, exactamente el tipo de convención que
no escala a 1000 clubes.

Versión 112 (Guido, evaluando qué hacía falta arreglar antes de seguir escalando: "either get rid
of it or hide it" sobre el toggle "Por gestión") lo resolvió de raíz en 2 pasos:
1. El toggle "Año a año"/"Por gestión" de Finanzas está OCULTO (`#viewToggle`,
   `style="display:none"` en index.html) — ya no es alcanzable por ningún visitante, mismo criterio
   que las pestañas Pases/Resultados/Comparar (Versión 56).
2. Más importante: se encontró que aun con el toggle oculto, `renderInicioStats()` (Inicio, la
   PRIMERA pantalla que ve cualquier visitante) seguía leyendo `gestionesByClub[currentClub][key]`
   sin guardas — un club onboardeado sin NINGUNA entrada real rompía Inicio igual. Se hizo
   defensivo en el motor: `currentGestionKey()` (`js/finanzas-calc.js`) y todo lector de
   `gestionesByClub[clubId]` en `js/finanzas-render.js` ahora usan `|| {}`, y `renderInicioStats()`
   degrada a "Sin dato" en los 4 stats si no hay ninguna gestión, en vez de tirar `TypeError`.

**Consecuencia práctica para onboarding futuro**: ya NO hace falta agregar la entrada sintética
`gestionesByClub.<club> = { actual: {...} }` solo para evitar un crash — podés dejarlo sin tocar. Si
se conoce la gestión/presidencia real de un club (clubes argentinos con historia confirmada), seguí
agregándola igual, esa parte del dato sigue siendo válida y útil; lo que cambió es que YA NO ES
OBLIGATORIO inventar un placeholder solo por robustez técnica.
