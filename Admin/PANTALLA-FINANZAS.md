# Reglas de pantalla de Finanzas

Cómo se ve Finanzas para cualquier club: cards, dropdown "Año", tabla "Estado de resultados", stats de arriba, y cómo verificarlo en el
navegador. Leer cuando se toca cómo se muestra algo, no en cada sesión. Venía del skill `club-or-year-onboarding` (Versión 471), sin cambios de texto.

Las referencias "sección N" dentro del texto son a las secciones del skill viejo (buscá "ex §N"): §2, §3 y §11 están en `Admin/ARQUITECTURA.md`; §4-8, §10 y §12-14 en `Admin/PANTALLA-FINANZAS.md`; color de marca, escudo y liga de un club nuevo en `.claude/skills/club-or-year-onboarding/club-nuevo.md`; §15 en `Admin/CONVENCIONES.md`; el skill viejo entero, en `Admin/Archive/club-or-year-onboarding-hasta-V470.md`.

---

## Bug: `gastosTotal` ya viene convertido — no reconvertir (ex §4)

Al generalizar `renderFinanzasStatsGeneric(cur, gastosTotal)` para que respete el toggle de moneda,
se cometió (y se corrigió, gracias a probar en el browser) este error: `gastosTotal` es un
parámetro que YA llega convertido a la moneda que se está mostrando (lo devuelve
`renderNativePLTable` → `buildNativeSectionHtml`, que ya aplica `toDisplayValue` fila por fila
antes de sumar el total). Pasarlo de nuevo por `toDisplayValue` lo convierte DOS VECES, el bug se
manifestó como "Gastos: 0.1 M USD" en vez de ~76 M USD (dividiendo por el tipo de cambio dos veces).
El patrón correcto (ya lo tenía `renderFinanzasStatsFromComputed`, la versión de Boca, de la que
había que copiar el criterio, no reinventarlo): `Math.abs(gastosTotal)` directo, SIN conversión
adicional, cuando `gastosTotal !== undefined`.

**Regla general**: cualquier valor que venga como parámetro de una función que YA hizo el trabajo de
armar la tabla (`renderNativePLTable` y afines) probablemente ya está en la moneda de display,
verificar de dónde sale antes de asumir que hace falta convertirlo de nuevo.

## Bug: un card/elemento "solo para el club X" necesita `display:none` en el HTML si X no es el club default (ex §5)

Encontrado al agregar la card "Supuestos" de Racing: las cards `bocaPresupuestoOficialCard`
funcionan bien sin `style="display:none"` en el HTML porque Boca ES el club que carga por default
(`currentClub = 'boca'`), así que "visible por default" ya es el estado correcto para ellas. Pero
`refreshAllForClub()`, la función que esconde/muestra estas cards por club, NO se llama en el
`INIT` de la página (`refreshFinanzas()` sí, `refreshAllForClub()` no; ver el bloque
`// ---------- INIT ----------` al final del `<script>`), solo se llama cuando el usuario CAMBIA de
club (`clubSelect` `change` listener). Consecuencia: un elemento nuevo "solo para Racing" (o
cualquier club que NO sea el default) que no tenga `display:none` en su HTML se ve INCORRECTAMENTE
en la carga inicial (con Boca todavía seleccionado), hasta que el usuario cambie de club una vez.

**Regla**: cualquier card/elemento nuevo scopeado a un club que no sea el default necesita
`style="display:none"` en el HTML de entrada, no solo depender de la clase CSS + JS de
`refreshAllForClub()` para el estado inicial.

## REGLA VIGENTE: estos 4 cards se ESCONDEN por completo cuando no hay presupuesto para ese ejercicio, no se muestran con un mensaje de "no hay" (ex §6)

Regla actual, la que hay que seguir hoy: "Supuestos", "Presupuesto Financiero", "Presupuesto de
Inversiones" e "Ingresos y Egresos por Torneo" (los 4 cards de Finanzas que dependen de tener un
documento de PRESUPUESTO cargado, no un balance) se esconden enteros (`display:none` en el `.card`)
cuando el club/ejercicio seleccionado no tiene datos en el mapa correspondiente
(`presupuestoSupuestosByYear`/`presupuestoFinancieroByYear`/`presupuestoInversionesByYear` en el
`data/<club>-data.js` del club, y el `#torneosBoca2027` de los 3 cards de torneo). Nada de mensaje
"no hay supuestos para este ejercicio": si no hay dato, el card directamente no aparece.

Implementación de referencia (`renderSupuestosCard`/`renderPresupuestoFinancieroCard`/
`renderPresupuestoInversionesCard`/`renderTorneosCard` en index.html): cada función busca el dato en
su mapa `[clubId][year]` (o chequea `clubId==='boca' && year===2027` para los 3 cards de Boca 2027
con HTML estático); si no hay dato, pone `style.display='none'` en el `.card` y sale; si hay dato,
lo pone en `''` (visible) y pinta el contenido. No queda ninguna función `noDataMsg()` en el código:
se borró junto con este cambio, porque ya no la llama nadie.

**Por qué es la regla vigente y no la anterior** ("el card SIEMPRE tiene que estar, con un mensaje
explícito si no hay dato"): Guido la revirtió explícito al ver los 4 cards vacíos para un ejercicio
con balance auditado real (Boca, sin presupuesto) y pidió que, en vez de ocupar espacio con el
mensaje de "no hay", el card directamente no esté. Documentado acá para que quede claro que NO es un
descuido volver a esconder el card: es la regla vigente, pedida a propósito, y contradice a
propósito la regla anterior.

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

## REGLA (pedida por Guido: "lo detesto"): la fuente NUNCA va adentro de un card individual (ex §7)

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
  las salvedades que `sourceCaveats()` deriva de los datos. Sale de `sources{}`, no hay que
  escribirle una entrada a mano a cada club.
- La pestaña **Fuentes** (`#fuentes`, HTML estático): el detalle completo, documento por documento,
  para quien quiera profundizar.

Si un card nuevo necesita una aclaración sobre CÓMO leer el número (ej. "el presupuesto de Racing ya
está en base de caja, a diferencia del de Boca", una diferencia de estructura/metodología, no de
dónde salió el dato), esa aclaración SÍ puede ir en el card, pero sin la palabra "Fuente:" ni citar
el documento, eso ya lo cubre el banner/nota de arriba. Violación real ya corregida: se le agregó un
`sourceNote` con "Fuente: ..." a CADA card nuevo de Racing (Supuestos, Presupuesto Financiero,
Presupuesto de Inversiones), Guido lo rechazó explícitamente ("detesto que hagas eso"). El fix: se
sacó `sourceNote` de los 3 mapas de datos, donde quedaba contenido explicativo real más allá de la
cita (ej. la nota de "base de caja" de Racing), se renombró a `note` y se le sacó la frase "Fuente:
..." del principio, dejando solo la explicación.

## Verificar en el browser de verdad, no solo revisar los números a mano (ex §8)

La cuenta a mano (verificar que `revenueLines`/`expenseLines` suman el total impreso del documento)
es necesaria pero NO alcanza, el bug de la sección 4 no se habría encontrado sin abrir el sitio y
tocar el toggle. Después de tocar cualquier función de display/conversión: `preview_start`, cambiar
de club, tocar los dos toggles (USD/ARS y Formato del club/simplificado), y leer los números en
pantalla, no solo confiar en que `verifyTieOuts()` (consola) pasa, porque esa función corre en
moneda NATIVA (nunca pasa por el toggle) y no habría detectado este bug de doble conversión.

**Extendido:** que `verifyTieOuts()` pase, y que "Formato del club" se vea bien, TAMPOCO alcanza
para dar por buena la categorización de un ejercicio nuevo, hay que mirar **cada línea de "Formato
simplificado"** individualmente, no solo el total. El bug del `lump_football_operations` mal usado
(ver `club-data-mapping` sección 1, la regla sobre cuándo NO usar esa categoría) pasó los 16 checks
de `verifyTieOuts()` sin problema (el total de Ingresos/Gastos cerraba perfecto, porque
`lump_football_operations` sí suma al total igual que cualquier otra categoría) y "Formato del club"
se veía perfecto (el desglegable de `items` mostraba las líneas reales), el ÚNICO lugar donde el bug
era visible era abriendo "Formato simplificado" y mirando que "Televisión / Derechos de TV" decía $0
con una línea real de TV a la vista en el PDF. **Regla**: después de categorizar un ejercicio nuevo,
abrí "Formato simplificado" y confirmá que NINGÚN bucket que debería tener plata (según lo que viste
en el documento) esté en $0, un bucket en $0 sin explicación es la señal de que algo quedó enterrado
en `items` en vez de promovido a categoría propia.

Los gotchas de tooling que vivían acá (caché del `<script src>` en el navegador de preview,
screenshot en blanco con la página scrolleada, `grep -oP` fallando cerca de acentos) se mudaron a
`CLAUDE.md` (sección "Gotchas de tooling"): no son específicos de onboarding, aplican a cualquier
sesión que toque este sitio, y `CLAUDE.md` se lee siempre, a diferencia de este skill.

## El sufijo entre paréntesis del dropdown "Año": SOLO 4 palabras posibles, nunca una 5ta (ex §10)

REGLA PERMANENTE, pedido explícito de Guido: "en el menu dropdown de Anio, poneme siempre entre
parentesis si: Presupuesto, Presupuesto y Balance, Placeholder. No salgas de esas opciones". El
`<select id="anioSelect">` de Finanzas arma el label de cada ejercicio con
`anioDropdownSuffix(reportType)` (`js/finanzas-calc.js`), que devuelve EXACTAMENTE uno de estos 4
resultados, nunca un texto libre inventado para un caso puntual:

| `reportType` | Sufijo en el dropdown |
|---|---|
| `official_balance_sheet` | `(Balance)` |
| `unofficial_mirror` (balance real conseguido en una réplica no oficial, ej. River 2024) | `(Balance)` |
| `official_budget` | `(Presupuesto)` |
| `official_budget_and_balance` (ejercicio con LAS DOS fuentes reales cargadas a la vez, ver sección 11) | `(Presupuesto y Balance)` |
| `pending_official` (ejercicio real que el club todavía no publicó, ver `reportTypeForYear`) | `(Placeholder)` |
| `placeholder` (números inventados a propósito para probar el diseño) | `(Placeholder)` |

El caso "sin nada en paréntesis" (un balance real y normal) también pasa por esta función:
`anioDropdownSuffix()` devuelve `' (Balance)'` por default, para que esa opción se anuncie explícita
como cualquier otra, en vez de quedar implícita en un `''` mudo (pedido explícito de Guido: "agregar
Balance como opción, la cual aplica para todos los años que tenés sin nada en paréntesis").

El `<select>` tampoco lleva el prefijo "Ejercicio " en sus opciones (pedido de Guido: "que no
aparezca 'ejercicio 2020/2021' sino '2020/2021'. Ejercicio sino queda muy redundante y agota la
vista"). `populateFinanzasSelectors()` arma el label como `(year-1)+'/'+year+sufijo`, sin prefijo —
esto es un cambio DISTINTO del sufijo entre paréntesis de arriba, no lo reemplaza: el prefijo
"Ejercicio"/"Balance"/"Presupuesto" sigue existiendo en el header de la tabla "Estado de resultados"
(`ejercicioLabel()`), solo se sacó del propio `<select>`. Ver sección 14 para el mapeo `reportType` →
prefijo de `ejercicioLabel()`, que es distinto de este sufijo del dropdown.

Antes de esta regla, cada club/año tenía su propio texto suelto para el sufijo, escrito por quien
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

**`official_budget_and_balance` no lo usa ningún ejercicio CARGADO todavía al escribir esta regla**,
aunque el archivo público de Racing sí tiene, para varios ejercicios históricos, tanto el Presupuesto
(aprobado al empezar el año) como el Balance (auditado al cerrarlo) — simplemente ninguno de esos
pares estaba onboardeado (transcripto + cargado) en ese momento. Ver sección 11 para el mecanismo
completo que se construyó para soportar esto (`racingPresupuestoOverlayByYear`, columna "Balance"/
"Presupuesto" en Estado de resultados).

## Reglas de la tabla "Estado de resultados", para cualquier columna que se agregue a futuro (ex §12)

Tres reglas permanentes, nacidas de revisar en el navegador el mecanismo de overlay de la sección 11
con el primer ejercicio real (Racing 2019/2020):

1. **Los números visibles TIENEN que reconciliar a simple vista.** Si Ingresos menos Gastos no daba
   el Resultado Neto mostrado, no era un error de cálculo (`verifyTieOuts()` ya validaba el número
   final): era que la fila que explica la diferencia (`extraRows`, ej. "Intereses netos") se sumaba
   al resultado pero no se mostraba en pantalla. Fix: `renderNativePLTable()`
   (`js/finanzas-render.js`) muestra las filas de `extraRows` cuando su valor no es cero (si es
   cero, no se agrega una fila sin sentido). REGLA: ninguna fila que participe en una suma mostrada
   en pantalla puede quedar oculta — si hace ruido visual para casos comunes, la solución es
   ocultarla CONDICIONALMENTE (valor no-cero), no ocultarla siempre. **EXCEPCIÓN, ver sección
   13.3: "Intereses netos" específicamente dejó de ser condicional, se muestra siempre, incluso en
   $0** — esta regla de acá sigue siendo la de fondo para el resto de extraRows (Impuestos, Venta de
   activos, etc.), no se revirtió en general.
2. **Ninguna columna de la tabla puede forzar scroll horizontal en el card.** Al agregar una columna
   nueva a `#finanzasPLTable` (`syncPLTableColgroup()` en `js/finanzas-render.js`, `<colgroup>`/
   `<thead>` en `index.html`), achicar los anchos de las columnas EXISTENTES en la misma medida que
   crece el total — nunca asumir que "hay lugar" sin verificar en el navegador con
   `element.scrollWidth` vs. `element.clientWidth` (tanto de la tabla completa como celda por celda:
   una columna angosta con `table-layout:fixed` no desborda la tabla, pero SÍ puede hacer que el
   CONTENIDO de una celda desborde si el texto no entra, lo que igual fuerza scroll — encontrado
   real con el header en mayúsculas "PRESUPUESTO" en una columna de 78px). Verificar en al menos 2
   anchos de viewport (desktop y `resize_window` a `tablet`), no solo el ancho por default del
   navegador.
3. **Ningún valor final debería quedar como "—" cuando hay datos reales para calcularlo.** Si una
   columna nueva (ej. el overlay de Presupuesto) tiene toda la información para calcular un
   total/resultado, calcularlo y mostrarlo, no dejar un placeholder solo porque la fila "principal"
   (Balance) es la que tradicionalmente se resalta — un "—" en un número que SÍ se puede calcular
   lee como un bug, no como una limitación real.

Al implementar el punto 3 salió a la luz una ASIMETRÍA real en los datos del overlay de Racing 2020
(`data/racing-data.js`, `racingPresupuestoOverlayByYear[2020]`): `revenueLines` excluía a propósito
su línea "extraordinaria" (`Cobros por venta de inversiones financieras`, 96 M) mientras que
`expenseLines` SÍ incluía su análoga (`Egresos extraordinarios`) como línea normal — con ese
criterio mixto, sumar `ingresos - gastos` del propio overlay no daba el superávit/déficit
presupuestado real. Se corrigió agregando la línea de ingreso faltante. **Moraleja para cualquier
overlay futuro**: las dos columnas (Balance y Presupuesto) tienen que usar el MISMO criterio sobre
qué cuenta como línea "normal" vs. "extraordinaria/financiera", si no el resultado propio de cada
columna no es comparable ni reconcilia con su propio total impreso.

## Reglas de "Estado de resultados" y de los stats de arriba (ex §13)

Guido, con captura de pantalla de un card ilegible, pidió 4 cosas en el mismo mensaje. Las 3
primeras son reglas permanentes que valen para cualquier club/año/columna futura:

1. **Un header de tabla que no entra en una línea se parte en el punto elegido a mano, nunca se deja
   en manos de `overflow-wrap:break-word` solo.** `wrapHeaderLabel()` (`js/finanzas-calc.js`) fuerza
   el `<br>` a mano: prefijo + año en 2 líneas SIEMPRE, y ninguna palabra se parte nunca (ver la
   regla actualizada en la sección 14: cada palabra se envuelve en un `<span
   style="white-space:nowrap">` para eso). Si se agrega un header nuevo a esta tabla que tampoco
   entre en una línea, sumarle su propio caso a `wrapHeaderLabel()` (o a mano en el HTML si es un
   header estático como "% del total"), nunca confiar en que el wrap automático del browser va a
   partir la palabra en un lugar legible.
2. **Todas las columnas numéricas de una tabla comparan mejor con el MISMO ancho fijo**, no un ancho
   distinto por columna "porque el contenido es más corto" (antes 84px para valores, 54px para "%",
   alternado). Guido lo pidió explícito ("que todas las columnas tengan el mismo width") después de
   ver que la asimetría de anchos hacía más difícil comparar Actual vs. Presupuesto a simple vista.
   El ancho elegido (100px en `#finanzasPLTable`) sale de medir en el navegador (un `<span>` de
   prueba con `getComputedStyle` del `<th>` real) cuál es el texto más ancho que puede aparecer en
   una sola línea con las reglas de wrap de arriba — no un número elegido a ojo.
3. **"Intereses netos" (y cualquier fila que exista precisamente para que la cuenta cierre) se
   muestra SIEMPRE, incluso en $0, para los 3 clubes por igual — no solo condicional a que su valor
   sea distinto de cero.** Guido: "me molesta que para Racing haya Intereses netos en el card y no
   para el resto... toca ponerlo para todos, aunque sea 0. Es decir, sumarlo al motor." Esto es una
   EXCEPCIÓN puntual a la regla de la sección 12.1 ("ocultar extraRows en $0 para no generar
   ruido"), no una reversión de esa regla: el resto de extraRows (Impuestos, Venta de activos,
   Ganancia por venta de jugadores) siguen ocultas en $0, porque son casos genuinamente raros para la
   mayoría de los club/ejercicio — mostrarlas siempre volvería a ser el mismo ruido que esa regla ya
   había evitado. La diferencia con "Intereses netos" es que su AUSENCIA (cuando un club la tiene y
   otro no) se leía como una inconsistencia entre clubes, no como limpieza visual. Si aparece OTRA
   fila con ese mismo problema a futuro (existe para reconciliar la cuenta, pero solo se ve para el
   club que la necesita), mismo criterio: sacarla de la lista condicional del motor
   (`nativeReportFor`/`simplifiedReportForGeneric`, `js/finanzas-calc.js`) y agregar su label a la
   excepción del filtro de `renderNativePLTable()` (`js/finanzas-render.js`), no ocultarla ni
   mostrarla para todas las extraRows por igual.

Relacionado, pero un stat DISTINTO (no de la tabla, de los cards de arriba de Finanzas,
`#finanzasStats`): Ingresos y Gastos ahí arriba no incluían nunca la plata de `extraRows` (siempre
fue así, no es un bug nuevo), así que alguien mirando solo esos 2 números y "Resultado neto" podía
pensar que el sitio no cierra la cuenta (el ejemplo real fue literalmente el mismo de la sección
12.1: Racing 2019/2020, 32,9 - 39,8 ≠ -3,7). Fix: nuevo stat "Int." (entre "Gastos" y "Resultado
neto"), alimentado por `extraTotal` — la MISMA suma de `extraRows` que ya calculaba
`renderNativePLTable()` para llegar al Resultado Neto de la tabla de abajo, devuelta ahora también en
su objeto de retorno. Si se agrega un stat nuevo a `#finanzasStats` a futuro que dependa de un total
ya calculado en otro lado, mismo criterio: devolver ese total desde la función que ya lo calculó, no
volver a sumarlo aparte (recalcularlo aparte es cómo aparecieron bugs de "varias cifras de Ingresos
distintas" en el pasado).

La 4ta cosa que pidió Guido en el mismo mensaje (sacar el prefijo "Ejercicio " del `<select>` "Año"
y agregar "(Balance)" como 4ta palabra del sufijo) está documentada en la sección 10, no acá — es
sobre el dropdown, no sobre la tabla "Estado de resultados".

## Header de "Estado de resultados": prefijo de `ejercicioLabel()` y regla de nunca partir una palabra (ex §14)

Tres reglas permanentes, generalizadas a partir de un mismo pedido de Guido (mirando Boca 2026/2027
y 2024/2025, y el overlay dual de Racing 2019/2020):

1. **`official_balance_sheet` usa el prefijo "Balance", no "Ejercicio".** Antes,
   `ejercicioLabel(year, reportType)` (`js/finanzas-calc.js`) solo devolvía "Balance" para
   `official_budget_and_balance` (el caso dual de la sección 11) y dejaba cualquier otro reportType
   —incluido un balance real y solo— en el genérico "Ejercicio". Mapeo actual completo:
   `official_budget` → "Presupuesto"; `official_budget_and_balance` U `official_balance_sheet` →
   "Balance"; cualquier otro (`placeholder`, `pending_official`, `unofficial_mirror`) → "Ejercicio"
   (genérico, sigue significando "no hay un documento oficial confirmado como balance o presupuesto
   todavía"). Si se agrega un reportType nuevo, decidir su prefijo con el mismo criterio: si el
   documento primario de ese ejercicio es un balance real (aunque llegue por una vía no 100%
   oficial), usar "Balance"; si no hay documento real todavía, "Ejercicio".
   - `unofficial_mirror` (River 2024, balance real conseguido en una réplica no oficial) se dejó
     afuera A PROPÓSITO de este cambio, sigue diciendo "Ejercicio": es un balance real, pero la
     salvedad de fuente no oficial vive en su propio banner de calidad de dato (sección 10), no se
     revisó con Guido si esa salvedad también debería reflejarse en el prefijo de esta tabla — no
     asumir que aplica el mismo criterio sin confirmarlo primero si aparece el caso.
2. **Ninguna palabra del header se parte NUNCA, ni siquiera "Presupuesto" — con año al lado o sin
   él.** Esto salió de dos rondas del mismo pedido: primero, "Presupuesto 2026/2027" (Boca,
   `official_budget`) salía en 3 líneas porque `wrapHeaderLabel()` partía el prefijo en dos Y le
   sumaba la línea del año — se corrigió que el prefijo con año al lado vaya COMPLETO en su propia
   línea. Segunda ronda: la columna de overlay ("Presupuesto" SOLA, sin año — Racing 2019/2020,
   `official_budget_and_balance`) había quedado afuera del primer fix, seguía partida ("te quedó
   solamente PRESU-PUESTO, pero el cambio que dije antes aplica también", Guido). REGLA
   (`wrapHeaderLabel()`, `js/finanzas-calc.js`): nunca parte una palabra, la envuelve siempre en
   `<span style="white-space:nowrap">`, tenga o no un año al lado — sin excepción por longitud de
   palabra. Motivo técnico del `nowrap`: sin él, el propio `overflow-wrap:break-word` del `<th>`
   (que sigue haciendo falta como red de seguridad para un texto no previsto acá) parte la palabra
   sola en un punto feo, reintroduciendo el problema por la puerta de atrás — el `nowrap` fuerza esa
   palabra a un renglón único aunque desborde unos pocos px hacia la celda vecina (queda dentro del
   padding en blanco de esa celda, verificado en el navegador con `getBoundingClientRect()` que no
   pisa el texto "% del total" de al lado, con Boca/Racing en varios anchos).
3. **La columna de overlay ("Presupuesto") lleva el año al lado, igual que la columna principal.**
   Tercera ronda del mismo pedido: con la 2da ronda ya corregida, la columna de overlay de Racing
   2019/2020 quedó en "Presupuesto" ENTERA pero SOLA, sin año — visualmente inconsistente con la
   columna principal de al lado, que sí dice "Balance 2019/2020" ("solamente dice PRESUPUESTO,
   agregá el año también, como en el resto de los casos. Es una regla", Guido). Fix en
   `renderNativePLTable()` (`js/finanzas-render.js`): el header de la columna de overlay pasó de
   armar el string `'Presupuesto'` a mano a reusar `ejercicioLabel(year, 'official_budget')`
   (`js/finanzas-calc.js`) — el `year` es SIEMPRE el mismo ejercicio que la columna principal (el
   overlay nunca es de otro año, ver sección 11), así que no hace falta un año distinto, solo
   formatear "Presupuesto AAAA/AAAA" con el MISMO helper que arma cualquier otro prefijo+año del
   sitio, en vez de un string suelto. El resultado pasa por `wrapHeaderLabel()` igual que la columna
   principal, así que hereda la regla del punto 2 sin código nuevo: "Presupuesto"/"AAAA/AAAA", 2
   líneas, prefijo entero con `nowrap`.

Verificado en el navegador (no opcional), las 3 rondas: Boca 2026/2027 ("Presupuesto"/"2026/2027",
2 líneas) y 2024/2025 ("Balance"/"2024/2025"), Racing 2024/2025 ("Balance"/"2024/2025"), Racing
2026/2027 ("Presupuesto"/"2026/2027", 2 líneas) y los 2 ejercicios duales de Racing —2019/2020 y
2017/2018— con columna primaria "Balance"/"AAAA/AAAA" + columna overlay "Presupuesto"/"AAAA/AAAA"
(mismo año en las 2, 2 líneas cada una) — ningún caso invade el texto de la columna "% del total"
de al lado.
