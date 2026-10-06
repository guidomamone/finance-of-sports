# Reglas de pantalla y código del sitio

Cómo se ve y cómo está hecho el sitio. Primero, Finanzas multi-año (la vista de hoy, to-do 147); después, las reglas de la vista de
un ejercicio, que sigue armándose escondida y es la que vuelve con `?multi=0`: cards, dropdown "Año", tabla "Estado de resultados",
stats de arriba y cómo verificarlo en el navegador (venía del skill `club-or-year-onboarding`). Al final, "Convenciones de pantalla y
código": traducciones, `alert()`, ASSET_V, Chart.js, selects, color de club (venían de `Admin/CONVENCIONES.md`). Se lee cuando se toca
`js/`, `index.html` o CSS, no en cada sesión. Los textos movidos no cambiaron.

Las referencias "sección N" dentro del texto son a las secciones del skill viejo (buscá "ex §N"): §2, §3 y §11 están en `Admin/ARQUITECTURA.md`; §4-8, §10 y §12-14 en `Admin/PANTALLA.md`; color de marca, escudo y liga de un club nuevo en `.claude/skills/club-or-year-onboarding/club-nuevo.md`; §15 en `Admin/CONVENCIONES.md`; el skill viejo entero, en `Admin/Archive/club-or-year-onboarding-hasta-V470.md`.

---

## Finanzas multi-año (to-do 147, Versiones 531-548): cómo es y qué no romper

Desde la Versión 542 es la vista por default; `?multi=0` vuelve a la vieja de un ejercicio con el dropdown "Año" (salida de
emergencia, no para visitantes). Mockup aprobado y el porqué de cada decisión: `Prototyping/Finanzas/mockup-147.html`.

- **Encabezado.** El H1 es el club y la bajada dice liga · país · cuántos balances y presupuestos, de qué ejercicio a cuál
  (`finSubtitle()`, js/selector.js, desde `CLUB_INDEX`). El club se cambia SOLO desde el chip del header: el card "Cambiar de
  club" se muestra únicamente sin club elegido.
- **Selección.** `FIN_SEL` (js/finanzas-render.js) guarda la lista de ejercicios elegidos; nadie lee `#anioSelect`.
  `primary()` = el más nuevo (KPIs, tabla de un año escondida); `lastBalance()` = el balance más nuevo (otra liga).
- **Cards de ejercicios** (`FIN_ANIOS`, js/finanzas-anios.js): uno por año, se prende y se apaga solo, sin rangos ni checkbox.
  Default y al cambiar de club: los últimos 5 CON BALANCE; al cambiar idioma o moneda, se conserva. Todos (otra vez = ninguno,
  estado vacío), Solo el último. Con más de 5, la fila arranca corta y "+N más" va al principio. Dicen Balance / Presupuesto /
  Presupuesto y Balance / Sin publicar: "Sin publicar" es la 5ta palabra, autorizada SOLO para los cards (un año vacío entre el
  primero y el último cargado, rayado y no elegible). El dropdown viejo sigue con sus 4 (sección de abajo).
- **Manda el balance.** En un año con presupuesto y balance, todo muestra el balance; el presupuesto aparece solo con
  "Presupuesto al lado del balance" (apagado por default). Presupuesto = amarillo y cursiva en tablas, punto hueco y tramo
  punteado en gráficos y sparklines, card punteado con "Presupuesto" en los KPIs. Un salto en la selección = columna "…" y
  tramo punteado: nunca se dibuja lo que pasó en los años no elegidos.
- **Tabla de una columna por año** (`FIN_MULTI_PL`, js/finanzas-multi.js), con más de un ejercicio. Es una tabla APARTE
  (`#finanzasPLMulti`), no una generalización de `renderNativePLTable()`, que se sigue armando escondida porque sus totales son
  los de los KPIs. Filas = unión de las filas de los años elegidos ("—" donde un año no la tiene); una etiqueta repetida en la
  misma sección de un año se SUMA (`filaDe()`: Juventus 2002/03 tiene dos "- from others"). Δ del primero al último: en gastos
  compara tamaño (más gasto = rojo); resultado y deuda neta en plata, nunca en % (cambian de signo). Rubro desplegable con su
  gráfico (Chart.js, se destruye en cada re-render) y "% del total" (el resultado, como margen sobre ingresos).
- **KPIs** (`FIN_MULTI_KPIS`): el número grande sigue saliendo de `renderFinanzasStatsGeneric()`; se le suma el año, la
  comparación contra el primero elegido y una sparkline. Los cards llevan `data-k` (ing, gas, extra, pat, nd).
- **Gráfico arriba de la tabla** (`FIN_MULTI_CHART`, `#finTrendCard`): Totales / De qué vive el club (barras apiladas, siempre
  en formato simplificado). La sección "Gráficos" vieja (`#finChartsCard`) se esconde por CSS.
- **Deuda** (`FIN_MULTI_DEBT`): "—" y no "0.0" en un año cuyo documento no la informa o que es solo presupuesto.
- **Fuentes, aviso de calidad y cards de presupuesto**: un renglón por ejercicio; el aviso cubre a todos los elegidos; los cards
  de presupuesto son los del presupuesto más nuevo elegido, con el año en un `<span class="fin-card-yr">` aparte del texto
  traducible (si va adentro del mismo elemento con `data-i18n`, `I18N.apply()` lo pisa).
- **"<club> en otra liga"** es un card entre Deuda y los cards de presupuesto, no un botón en la barra: usa el balance más nuevo
  elegido, nunca un presupuesto. Muestra el puesto a la vista (Versión 547): un selector con las ligas que tienen clubes cargados
  ESE ejercicio (por `leagueAt` sobre `CLUB_INDEX`, sin bajar rankings; default, la de más clubes), y el puesto calculado con
  `LIGA_VIEW.filaSimulada` contra `data/rankings/<liga>.js`, el mismo motor que la simulación de Ligas. El texto dice ENTRE CUÁNTOS
  clubes cargados (los rankings no tienen la liga entera), nunca "de 20" a secas. "Ver el ranking completo" abre Ligas con el club
  simulado.
- **Valores ajustados por inflación** (`FIN_REAL`, `FIN_REAL_UI`, `data/deflactores.js`): toggle "Nominales | Ajustados por
  inflación" en la barra, solo en USD o EUR (las monedas con serie). Todo monto de la vista multi-año se multiplica por
  `FIN_REAL.fac(año)`; un cociente (% del total, desvío, salarios / ingresos) no, porque el factor se cancela. Prendido, la tabla
  multi-año se usa aunque haya UN solo ejercicio (la de un año no sabe ajustar) y el número grande de los KPIs se reescribe.
  La unidad pasa a "M USD de 2024/25" en todos lados, cada columna dice su factor (×1.26) y una franja verde explica la serie
  con un ejemplo. Los años posteriores al base (presupuestos futuros) no se ajustan, y la franja lo dice.
- **Gestión** (`FIN_GESTION`, js/finanzas-anios.js; datos en `data/gestiones/<país>.js`, se cargan al elegir un club de ese
  país): fila de botones arriba de los cards, uno por gestión CONFIRMADA con algún ejercicio cargado, de la más vieja a la más
  nueva (con más de 4, "+N más" a la izquierda). Tocar uno suma sus ejercicios; de nuevo, los saca; dos a la vez se comparan. Los
  ejercicios de cada gestión NO se escriben: se derivan (quien estaba en el cargo al cierre; `firmo` para la excepción, ver el
  encabezado de `data/gestiones/ar.js`). El gráfico pinta una franja por gestión (plugin `franjasGestion`) y la tabla agrupa las
  columnas por presidente. Un país nuevo se suma a `PAISES` en `FIN_GESTION`; `tools/audit.js` (`checkGestiones`) controla
  fuentes, fechas, superposiciones y que la lista coincida con los archivos.
- **Mi Cuenta** guarda `years` además de `year`; con un solo año la clave es la de siempre (las búsquedas viejas no se duplican).
- **Cómo verificar un cambio acá**: los totales de cada columna contra la tabla de un año, eligiendo los ejercicios de a uno
  CON CLICKS en los cards (`#finYears .fin-year`). Llamar `refreshFinanzas()` o `selectClub()` desde la consola no sirve:
  la consola no ve el `currentClub` del script de la página y deja el estado mezclado. Y un `<details>` cerrado tiene
  `innerText` vacío: para leer su contenido, `textContent`.

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


---

## Convenciones de pantalla y código

Venían de `Admin/CONVENCIONES.md`, sin cambios de texto.

- UN TEXTO QUE ESCRIBE JS NO LLEVA `data-i18n` (Versión 530, bug real: to-do 146). `I18N.apply()` guarda como "castellano original" lo que
  el elemento tenga la PRIMERA vez que lo ve y lo vuelve a poner en cada cambio de idioma: si JS ya había escrito ahí (el nombre del club
  en el chip del header), ese texto viejo vuelve. Lo que arma JS se traduce con `t()` en su render, y ese render se llama desde
  `I18N.onChange` (en index.html). Al agregar un render nuevo, sumarlo ahí: `CLUB_SELECTOR.refresh()` no estaba, aunque su comentario
  decía que sí.
- UN SOLO BOCADILLO DE EXPLICACIÓN: `js/info-tip.js` (Versión 515). Hover en desktop, tap en mobile, un único `div.op-info-float`
  `position:fixed` colgado de `body` (esquiva el `overflow:hidden` de cards y del modal). Para algo pintado con innerHTML alcanza con
  `data-info-tip="texto"` (delegación); para un botón que no debe propagar el click, `INFO_TIP.enganchar(el, texto)` (el "?" del
  selector). No crear otro bocadillo propio en otro archivo: así terminó duplicado el del selector.
- "DENTRO DE OTRO RUBRO" (Versión 515, textos de Guido): una fila con `incluidoEn` dice solo "Dentro de otro rubro" / "Posiblemente
  dentro de otro rubro" (en la celda no entra el nombre del rubro: ocupaba seis renglones) y el rubro va en el bocadillo:
  "Está incluido en X: la fuente lo reporta junto con ese rubro." / "Sospecho que está dentro de X: no es un cero, pero la fuente no lo
  aclara o es confusa." (`window.FINANZAS_DENTRO_TIP`, en js/finanzas-render.js; lo usa también js/liga.js). En Comparar, que es prosa,
  el rubro va nombrado ("está dentro de X").

- QUÉ SE TRADUCE Y QUÉ NO (Versión 138, cierra la decisión que el to-do 19(c) dejaba abierta).
  Se traduce el CHROME y toda etiqueta NUESTRA: nav, títulos, controles, headers de tabla, los
  buckets de "Formato simplificado", el tipo y el nivel de cada fuente, y la procedencia de cada
  tipo de cambio. NO se traduce nada que salga TEXTUAL de un documento o que sea un nombre propio:
  los rubros de "Formato del club" (`rawLabel`), el título de cada balance, los nombres de club y de
  liga, y los nombres de gestión de `gestionesByClub` (son apellidos de presidentes). El criterio es
  uno solo y ya estaba en la cabecera de `js/i18n.js`: traducir un rubro del balance de un club
  argentino sería inventar un dato que el documento no dice. Vale igual para `fuentes.html`, que
  desde esta versión se traduce sola con el mismo motor y el mismo diccionario que el sitio, en vez
  de generarse un archivo por idioma.
- NADA DE `alert()` EN UN CAMINO DE ERROR (Versión 137, bug real que costó una hora de sesión). Un
  `alert()` nativo congela el hilo entero: timers, `onload` de los `<script>` que inyecta
  `loadClubData()`, y cualquier intento de leer el estado desde la consola para diagnosticar. Desde
  que el club elegido se guarda en `localStorage` y se carga solo al abrir el sitio, un club que
  falle con un alert deja la página congelada EN CADA VISITA, sin poder siquiera elegir otro. Los
  errores se cuentan por `console.error` y se muestran en un aviso dentro de la página.
- UNA PÁGINA FUERA DE LA RAÍZ TIENE QUE DECLARAR `window.I18N_BASE` (Versión 162, bug real de esta
  sesión). `I18N.load()` arma el src del diccionario como `data/lang/<code>.js`, y eso es relativo al
  DOCUMENTO, no a `js/i18n.js`. Las primeras páginas del proyecto que no viven en la raíz son las de
  fuentes por club (`fuentes/<clubId>.html`): pedían `fuentes/data/lang/en.js`, se comían un 404 y se
  quedaban en castellano aunque el visitante tuviera el sitio en inglés. Peor todavía, el `onerror`
  de `I18N.load()` degrada a castellano a propósito, así que no se veía rota, se veía en el idioma
  equivocado. Ahora el src lleva `window.I18N_BASE` adelante ('' en la raíz, '../' en `fuentes/`).
  Los `<script src>` estáticos NO alcanzan: esos ya llevaban su `../` y cargaban bien, el que fallaba
  era el inyectado en runtime. Mismo tipo de trampa que `loadClubData()`.
- TODO ARCHIVO DE `js/` QUE LLAME A `t()` VA EN LA LISTA DE `tools/audit.js` (Versión 137). El
  chequeo `i18n-incompleto` recorre una lista fija de archivos; cuando nació `js/selector.js` no
  estaba, así que sus claves nuevas eran invisibles y el chequeo pasaba en verde mientras el
  visitante de habla inglesa leía castellano. Y al revés (Versión 155): cuando un archivo de esa
  lista SE BORRA, hay que sacarlo, o el chequeo entero revienta con ENOENT y deja de correr.
  AMPLIADO (Versión 162): la regla no es solo para `js/`, es para TODO archivo que emita claves de
  i18n, incluido el que GENERA HTML. `tools/generate-fuentes-page.js` escribe `data-i18n` en
  `fuentes.html` y en las 41 páginas por club, y no estaba en ningún escaneo: una clave nueva de esas
  páginas era invisible para el chequeo. Ya está en la lista.
  COROLARIO (Versión 155): las claves que quedan huérfanas al borrar una feature se borran de
  `data/lang/en.js` en el mismo movimiento — el merge del selector dejó 88. El audit no las detecta:
  cuenta las que FALTAN, no las que sobran.
- ASSET_V SE SUBE EN DOS LUGARES, NO EN UNO (Versión 125, bug real de esta sesión): `window.ASSET_V`
  es una constante inline, pero los `?v=` de los `<script src>` estáticos del final del `<body>` son
  LITERALES, no salen de ella (solo los 2 cargadores dinámicos, `loadClubData()` e `I18N.load()`,
  la leen de verdad). Subir la constante y olvidarse de los tags deja al navegador sirviendo los
  `js/data` viejos de su caché con el HTML nuevo: pasó al migrar los `fx`, llegó un
  `currency-map.js` cacheado sin `fxMetaFor()` mientras `finanzas-calc.js` ya lo llamaba, y la
  página entera tiró `ReferenceError`. Las notas del proyecto y `CLAUDE.md` decían que los
  tags llevaban la constante, que no era cierto. Ahora lo chequea `node tools/audit.js`
  (`asset-v-desfasado`, P1): compara la constante contra cada tag.
- 2 BUGS REALES CORREGIDOS + REGLA NUEVA DE ORDEN DEL DROPDOWN (Versión 96): (1) Boca (club default)
  aparecía con TODOS los gráficos de Finanzas vacíos en la primera carga de la página, y solo se
  arreglaba solo después de cambiar de club y volver — causa: `pasesDataForClub`/
  `resultadosDataForClub`/`titulosDataForClub` (más abajo en el `<script>`) referencian
  `CLUB_GENERIC_DATA` SIN el prefijo `window.`, y ese objeto global solo se crea DENTRO de cada
  `data/<club>-data.js` lazy-loaded (Versión 95) — en la carga inicial, antes del primer cambio de
  club, ningún data-file de club genérico corrió todavía, así que el identificador bare
  `CLUB_GENERIC_DATA` no estaba declarado en ningún lado y tiraba `ReferenceError` (a diferencia de
  `window.CLUB_GENERIC_DATA`, que da `undefined` sin explotar) — eso frenaba en seco TODO el resto
  del bloque INIT synchronous. Fix: `window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};` al
  principio mismo del `<script>` principal, antes de que corra nada más. (2) REGLA NUEVA a pedido de
  Guido: el dropdown de clubes del header (`#clubSelect`) iba SIEMPRE en orden alfabético
  ASCENDENTE (A→Z) por nombre visible. OBSOLETA DESDE LA VERSIÓN 137: ese dropdown ya no
  existe, lo reemplazó el selector jerárquico (`js/selector.js`). El orden alfabético sigue
  vigente pero DENTRO de cada liga o país, que es el nivel donde comparar dos nombres significa
  algo; la lista completa de 41 clubes en una sola tira alfabética era justamente lo que dejó
  de servir. Lo que sigue es el registro del bug original — se reordenaron las 11 `<option>`, con Boca marcado
  `selected` explícito (no es la primera opción alfabética — esa es Argentinos Juniors—, pero
  sigue siendo el club default de la app). `verifyTieOuts()` sigue dando 240/240 checks, 0 errores,
  en los 11 clubes. Detalle completo en `Admin/finance-of-sports-project.md`.
- REGLA (Versión 50, Guido: "(presupuestado)" pegado al año se superponía con el header "% DEL
  TOTAL" de al lado, difícil de leer): `ejercicioLabel(year, isPresupuesto)` cambió de firma, antes
  el 2do parámetro era un `suffix` de texto libre agregado AL FINAL ("Ejercicio 2026/2027
  (presupuestado)"), ahora es un booleano que cambia el PREFIJO ("Presupuesto 2026/2027" en vez de
  "Ejercicio 2026/2027 (presupuestado)"), más corto. Esto es SOLO para el header de la tabla
  "Estado de resultados" (`finanzasPLTableCurLabel`/`finanzasDebtTableCurLabel`) y el stat "Último
  resultado" de Inicio, que usan `cur.yearLabel`. El dropdown "Año" (dato distinto, arrays propios
  en `populateFinanzasSelectors`, tanto para Boca como para River/Racing) sigue mostrando el
  estilo largo "Ejercicio AAAA/AAAA (presupuestado)" a propósito, no tiene el problema de espacio
  de la tabla y así el dropdown se ve igual en los 3 clubes.
- REGLA REFORZADA (Versión 48, Guido: "urnifica, tienen que ser exactamente iguales los nombres"):
  no alcanza con nombres PARECIDOS entre Boca y el motor genérico, tienen que ser IDÉNTICOS
  carácter por carácter. Bug real encontrado y corregido: Boca usa el label `'Televisión'` (fila
  del Ejercicio 2027), el motor genérico tenía `'Televisión / Derechos de TV'` para la misma
  categoría (`broadcasting`), corregido a `'Televisión'` exacto. Antes de dar por buena una
  homologación de labels, comparar carácter por carácter contra `simplifiedReportForBoca()`, no de
  memoria/aproximado.
- REGLA PERMANENTE (Versión 47, extiende la regla de la Versión 46, pedido explícito de Guido: "la
  tabla tiene que quedar exactamente igual ordenada tambien. el orden importa"): el ORDEN de
  `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS` (River/Racing) tiene que calzar con el
  orden real de `simplifiedReportForBoca()`, no solo los nombres. ORDEN VIGENTE DESDE LA VERSIÓN
  189: Cuotas Sociales, Comercial/Sponsors, Estadio, Televisión, Premios, Venta de Jugadores,
  Educación, Otras secciones deportivas, catch-all "Otros ingresos" (con "Abonos" de vuelta en 6ta
  posición si `ABONOS_DENTRO_DE_ESTADIO` se pone en `false`). Orden anterior, hasta la 188: Cuotas
  Sociales, Comercial/Sponsors, Estadio, Televisión, Premios, Abonos, Venta de Jugadores,
  catch-all (label "Abonos" a secas desde la Versión 49, ver bullet más abajo, antes decía
  "Entradas / Abonos"). También: cualquier bucket que NO tenga equivalente en Boca (hoy: "Fútbol profesional
  (sin desglosar por la fuente)", solo existe para Racing/River porque a veces el dato no
  desglosa más) lleva `hideIfZero:true` en su definición, no se pinta la fila si ese club/año no
  tiene ninguna línea ahí adentro (Guido lo pidió viendo esa fila en $0 para Racing). Un bucket
  NORMAL en $0 (ej. Venta de Jugadores cuando no hubo ventas) se sigue mostrando igual que en Boca,
  la regla `hideIfZero` es solo para categorías-excepción sin equivalente Boca. Ver
  `.claude/skills/club-data-mapping/SKILL.md` sección 13 y `Admin/finance-of-sports-project.md`.
- REGLA PERMANENTE (Versión 46, pedido explícito de Guido): "Formato simplificado" de CUALQUIER
  club tiene que usar el mismo set de categorías y la misma lógica que ya usa Boca
  (`simplifiedReportForBoca()`), no un set separado diseñado para el motor genérico. Si el dato
  fuente de un club no permite categorizar así, consultar a Guido antes de decidir cómo resolverlo,
  nunca improvisar. Detalle completo en `.claude/skills/club-data-mapping/SKILL.md` sección 13 y en
  `Admin/finance-of-sports-project.md`. Esta sesión encontró 3 discrepancias reales, se las presentó a Guido con
  `AskUserQuestion` antes de tocar nada, y ya están resueltas: Racing separó "Estadio: recaudación
  de partidos" de un bucket nuevo "Premios por competencias" (el dato fuente ya los distinguía);
  River se dejó como estaba (su dato no permite separarlo hoy); Gastos se dejó con la
  categorización que ya tenía, solo renombrada para que coincida con el vocabulario de Boca (Compra
  de jugadores / Salarios y primas / Inversiones / Otros gastos).
- REGLA (Versión 44, mismo pedido que la Versión 43 pero para "Gestión"): el
  `<select id="gestionSelect">` también tiene ancho fijo por CSS
  (`#gestionSelect{width:200px;max-width:100%;}`, justo después de `#anioSelect{...}`), mismo
  criterio y mismo motivo que el de "Año" (ver bullet de la Versión 43 más abajo). 200px alcanza
  para la gestión más larga de los 3 clubes ("Riquelme (2023-actual)", Boca, ~188px medido en el
  navegador).
- REGLA (Versión 43, bug real de UX reportado por Guido): el `<select id="anioSelect">` ("Año" de
  Finanzas) tiene ancho fijo por CSS (`#anioSelect{width:300px;max-width:100%;}`, justo después de
  la regla genérica `select{...}`). Antes no tenía ancho propio, así que un `<select>` nativo se
  achica o agranda según el texto de la OPCIÓN seleccionada (no la más larga de la lista), y el
  box cambiaba de tamaño cada vez que cambiabas de club o de ejercicio dentro del mismo club, un
  detalle molesto que Guido notó. 300px alcanza para la etiqueta más larga de los 3 clubes
  ("Ejercicio 2025/2026 (esperando datos)", Boca, ~282.5px medido en el navegador con el ancho
  incluida la flecha nativa). REGLA PARA EL FUTURO: si se agrega un club/año con una etiqueta más
  larga que esa, medir de nuevo en el navegador (`selectEl.getBoundingClientRect().width` con esa
  opción seleccionada) antes de asumir que 300px sigue alcanzando, no agrandar el número a ojo.
- REGLA VIGENTE (Versión 42, reemplaza la regla de las Versiones 34-35/41, ver bullet más abajo):
  los cards "Supuestos", "Presupuesto Financiero", "Presupuesto de Inversiones" e "Ingresos y
  Egresos por Torneo" ahora se ESCONDEN por completo cuando el club/ejercicio seleccionado no tiene
  presupuesto cargado, en vez de mostrar un mensaje de "no hay". Pedido explícito de Guido al ver
  los 4 cards vacíos para Boca 2024/2025 (que tiene balance, no presupuesto). La función
  `noDataMsg()` se borró (ya no la llama nadie). Detalle completo en
  `Admin/PANTALLA.md`, ex §6.
- REGLA PARA EL FUTURO (Versión 40, pedido explícito de Guido: "es mi manera de hacerte un
  control"): toda fila de "Formato simplificado" tiene que llevar `items` con el desglose real de
  qué campo(s) nativo(s) se sumaron para llegar a ese número, nunca `items:null`. Implementado para
  Boca en la Versión 40 y para River/Racing en la Versión 42 (ver bullet más arriba), así que hoy
  ya cubre a los 3 clubes.
- REGLA (Versión 39, bug real de layout + una regresión propia corregida en la misma sesión):
  `#finanzasPLTable` (card "Estado de resultados") tiene `table-layout:fixed` + un `<colgroup>` de 6
  `<col>`. Rubro es la única sin ancho fijo (se lleva el resto), las 5 numéricas tienen ancho fijo en
  píxeles. Antes de esto no tenía `table-layout:fixed`, así que el ancho de Rubro (y por lo tanto dónde
  arrancaban las columnas numéricas) se recalculaba solo según el rubro más largo de cada
  club/formato, y la columna del ejercicio terminaba en un % de ancho distinto según fuera Boca,
  Racing, Formato del club o Formato simplificado. La función `syncPLTableColgroup(hideCompare)`
  (justo antes de `renderNativePLTable` en el JS) reescribe ese `<colgroup>` cada vez que cambia el
  modo Año a año/Por gestión, en Año a año las columnas 4-6 quedan con ancho EXPLÍCITO `0` (no
  sacadas del colgroup: sacarlas rompe el reparto de espacio porque la fila de encabezado de sección
  sigue con `colspan="6"`, ver detalle en `Admin/finance-of-sports-project.md`) para que Rubro siga siendo la única columna sin
  ancho y se lleve TODO el espacio sobrante, así la tabla usa el 100% del ancho del card en los dos
  modos, sin la franja muerta que salió en un intento intermedio. Si se agrega una columna numérica
  nueva a esta tabla, TIENE que sumarse a los dos ramales de `syncPLTableColgroup` con su propio ancho
  fijo, dejarla sin ancho reintroduce el bug original. La tabla está envuelta en
  `<div class="table-scroll">` (`overflow-x:auto`, `min-width` distinto por modo: 600px en Por gestión,
  320px en Año a año) para que en mobile scrollee en vez de aplastar Rubro. Detalle completo, con las
  dos vueltas de debugging, en `Admin/finance-of-sports-project.md`.
- REGLA (Versión 37, bug visual): el "$" del eje Y del gráfico de barras (card Gráficos) no
  colisiona más con el tick más alto, ver `layout:{padding:{top:26}}` en `drawTrendChart`/
  `drawTrendChartGeneric`.
- REGLA (Versión 36, pedida por Guido: "detesto que hagas eso"): la cita de fuente ("Fuente: ...")
  NUNCA va adentro de un card individual (Supuestos, Presupuesto Financiero, Presupuesto de
  Inversiones, ni ningún card nuevo). Va en `#finanzasDataQualityBanner` (por ejercicio),
  `#finanzasClubSourceNote` (por club, al final del bloque de cards) o la pestaña Fuentes, nunca
  repetida card por card. Ver `Admin/PANTALLA.md`, ex §7.
- REGLA (Versiones 34-35, pedida por Guido, no es opcional, "homologar lo que se pueda
  homologar"): los 3 cards de presupuesto oficial de Finanzas: "Supuestos"
  (`#supuestosCard`/`renderSupuestosCard`), "Presupuesto Financiero"
  (`#presupuestoFinancieroCard`/`renderPresupuestoFinancieroCard`) y "Presupuesto de
  Inversiones" (`#presupuestoInversionesCard`/`renderPresupuestoInversionesCard`), son
  genéricos (un solo card cada uno, ya no uno por club) y SIEMPRE están presentes, para
  cualquier club/ejercicio seleccionado. Si ese ejercicio puntual tiene el dato (hoy: Boca
  2027 para los 3; Racing 2026 y 2027 para los 3 también, con menos desglose que Boca en
  Inversiones), lo muestra; si no (balances auditados, placeholders), dice explícito por qué
  no hay, en vez de esconder el card. (Ese texto lo arma hoy cada render de card: la función
  compartida `noDataMsg()` que hacía esto se borró, ver el punto de más arriba en este mismo
  archivo — este párrafo la seguía citando en presente.) Los 3 se repintan
  juntos cada vez que cambia club/año/gestión. ACTUALIZADO (Versión 135): los datos de los 3
  viven en el `data/<club>-data.js` de cada club, en `presupuestoSupuestosByYear` /
  `presupuestoFinancieroByYear` / `presupuestoInversionesByYear`, indexados por `[year]`. Antes
  eran 3 registros `[clubId][year]` adentro de `js/finanzas-render.js`, o sea datos de club en la
  capa de render: onboardear un presupuesto obligaba a editar el archivo del motor. Ahora no.
  Y el contenido de Boca 2027 para Presupuesto Financiero/Inversiones, que hasta la 135 era HTML
  estático adentro de `index.html` (133 líneas, envuelto en `#pfBoca2027`/`#piBoca2027` y
  mostrado con un `isBoca2027`), es dato como el de cualquier otro club: se extrajo parseando el
  propio HTML, no retipeando, y se verificó que las 6 cards renderizadas quedaran idénticas
  carácter por carácter. Las tablas con `formato:'ars-exacto'` se muestran en pesos enteros y no
  responden al toggle de moneda, igual que cuando eran HTML fijo.
- OJO clase `bocaPresupuestoOficialCard`: pese al nombre, NO es "solo para
  `<div class="card">`", es el marcador genérico de "esto es Boca-only,
  ocultalo con otro club" que usa `refreshAllForClub()`. Cualquier elemento
  nuevo (card, `<p>`, lo que sea) que solo aplique a Boca necesita esta
  clase, si no queda visible con cualquier club (bug real, Versión 27, pasó
  con una nota de fuente suelta que no estaba dentro de ningún card).
- OJO `Object.keys()` sobre un objeto con claves que parecen enteros
  (riverFiscalYearMeta, racingFiscalYearMeta: "2024","2025"...): JS SIEMPRE
  las reordena ascendente al iterarlas, sin importar el orden del código
  fuente, no asumir que el orden de escritura se respeta (bug real,
  Versión 26). `populateFinanzasSelectors()` ya ordena a mano
  (`.sort((a,b)=>b-a)`) para que el selector de Año quede descendente, y
  preserva el ejercicio seleccionado (o el más cercano) al cambiar de club,
  cualquier `<select>` nuevo que liste ejercicios de estos objetos debe
  seguir el mismo criterio, no confiar en el orden de iteración.
- OJO texto fijo dibujado a mano en un <canvas> de Chart.js: el "$" del eje Y
  del gráfico de barras se dibujaba con `ctx.fillText` (Versión 22) para
  esquivar la rotación automática del título nativo, pero salía con el glyph
  roto (reportado por Guido, Versión 25), no se pudo diagnosticar la causa
  exacta (Chart.js no carga en el navegador de este entorno, ver más abajo).
  Reemplazado por un `<span>` de HTML normal superpuesto con
  `position:absolute` sobre `.chart-wrap`, mucho más simple y sin el riesgo
  de fuente/transform del canvas. Si hace falta texto FIJO (no dependiente de
  la geometría del gráfico) sobre un chart de nuevo, preferir esta vía
  (HTML+CSS) en vez de dibujarlo a mano en el canvas. El % de cada porción
  del pie/doughnut (`pctSliceLabelsPlugin`) SÍ sigue en canvas porque su
  posición es dinámica (depende del ángulo de cada porción), no tiene
  alternativa en HTML simple.
- OJO alineación en `<summary>` de acordeón (`details.accordion>summary`): usa
  `display:flex;justify-content:space-between`, pero el `::after` (+/−) cuenta
  como un 3er hijo flex, con solo 2 <span> (label + monto) el monto NO queda
  pegado al borde derecho, space-between lo reparte entre los 3 (bug real,
  Versión 24). Si se agrega un `<summary>` nuevo con label+monto, darle al
  monto `flex:0 0 <ancho fijo>;text-align:right` (ver
  `details.accordion.nested>summary>span:last-child`), no confiar en
  space-between solo.
- OJO stats de arriba de Finanzas: el stat "Gastos" (`#finanzasStats`) SIEMPRE
  tiene que salir de `plTotals.gastosTotal` (lo que devuelve
  `renderNativePLTable()`, mismo número que "Total Gastos" de la tabla), NUNCA
  de `cur.expenses` directo, `cur.expenses` (computeYear) es solo
  wages+otherExpenses, sin amortizaciones, y quedó desalineado con la tabla
  hasta la Versión 23 (bug real, no un tema de Inversiones/Obras como se
  sospechaba al principio). Si se agrega un nuevo lugar que muestre "Gastos"
  del ejercicio, usar ese mismo patrón (renderNativePLTable primero, después
  el stat con su total), no recalcular aparte.
- REGLA DEL COLOR DE CADA CLUB (Versión 178, decisión de Guido al cerrar el to-do
  23(e)): `clubs[id].brandColor` es el color del club en el círculo de iniciales, y
  **es opcional a propósito — un club sin un color primario claro y sin ambigüedad se
  queda SIN el campo, con el azul del sitio, y eso no es un pendiente.** Un color
  equivocado se lee peor que ninguno. Lo mismo vale al agregar un club nuevo: si no
  se pudo verificar su color contra una fuente propia (sitio oficial, infobox de
  Wikipedia del país, o el color oficial que declare su liga), se deja sin `brandColor`
  en vez de copiar el de otro club del mismo país o elegir a ojo. Hoy los 2 sin color
  son Real Madrid y Once Caldas, los dos porque el color que los identifica es el
  blanco y un círculo blanco no se ve contra el fondo blanco del modal. Dos cosas que
  NO se hacen acá: guardar el color de las iniciales (lo calcula `textoSobre()` por
  contraste) y usar escudos como imagen (derechos y hosting: el repo se deploya entero,
  así que la imagen se serviría desde el dominio propio).
  VERSIÓN 179, dos precisiones que hacen que la barrida de los 41 no haya que repetirla:
  (1) esa decisión se ESCRIBE, no se deja en blanco — `brandColor:null` es el resultado
  CERRADO "se miró y no lleva color" y ninguna sesión futura lo completa a ojo, mientras
  que el campo AUSENTE significa que nadie lo chequeó y lo marca `node tools/audit.js`
  (`club-sin-color-ni-null`, P3); en pantalla son idénticos, `pintarCrest()` hace `if(!c)`.
  (2) En el otro sentido: **un `brandColor` no se oscurece ni se retoca para que pase el
  contraste del círculo** — para eso están `textoSobre()` (cambia el TEXTO, no el color del
  club) y el aro interno de los colores claros; si aun así no se lleva, va a `null`. El dato
  del club no se toca, que es justamente lo que el campo promete. El procedimiento para
  resolver el color de un club NUEVO vive en `.claude/skills/club-or-year-onboarding/club-nuevo.md`.
- OJO CON EL ESTADO DE UI A NIVEL DE MÓDULO EN `js/selector.js` (Versión 174).
  `grillaConTope()` la usan varias grillas distintas, y su `mostrarTodos` es una
  variable de módulo: si una grilla nueva la prende, "Mostrar más" queda apretado
  también en las otras sin que nadie lo haya pedido. Una grilla nueva trae su
  PROPIO estado y se lo pasa como `estado` (`{ver, expandir}`) — así lo hace la
  grilla de "elegir clubes" del constructor de Mezcla, con `mezclaTodos`. Mismo
  criterio para el texto de cualquier buscador nuevo: propio del panel donde vive,
  nunca compartido con el `#modalQ` del modal principal.
- OJO Chart.js: el script tag pinea la versión exacta de cdnjs
  (`https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.5.1/chart.umd.min.js`).
  La Versión 22 corrigió un 404 real acá (la versión vieja, 4.4.4, nunca
  existió en cdnjs), si en el futuro se sube de versión, verificar SIEMPRE
  con `curl -I` contra la URL exacta antes de pinear un número de versión
  nuevo, no asumirlo.


---

## Cómo funciona cada pantalla (venía de `Admin/ESTADO.md`)

Texto movido sin cambios.

- PRESUPUESTOS, POR CLUB (Versión 135): los 3 cards que solo aparecen para un
  ejercicio con presupuesto (Supuestos, Presupuesto Financiero, Presupuesto de
  Inversiones) sacan sus datos de `presupuestoSupuestosByYear` /
  `presupuestoFinancieroByYear` / `presupuestoInversionesByYear`, adentro del
  `data/<club>-data.js` de cada club. Antes vivían en 3 registros por club dentro
  de `js/finanzas-render.js`, y el contenido de Boca era HTML escrito a mano en
  ESTE archivo. Onboardear un presupuesto ya no toca ni el motor ni el HTML.
- PESTAÑAS: Finanzas es la única con datos reales y es donde está todo el
  trabajo. Mercado de Pases / Resultados Deportivos / Títulos están vacías o con
  placeholder según el club. "Mi Cuenta" (to-do 70, Versiones 271-272, 2026-09-27) DEJÓ DE SER
  UN STUB: login con Google vía Supabase y "Saved Searches" reales — cada club/comparación que se
  mira queda guardado solo (sin botón), con favoritos primero y el resto del historial después.
  No es un paywall (la decisión de ir todo gratis del 2026-09-14 sigue en pie): es que quien se
  loguea puede volver a ver lo que ya miró. Pendiente antes de que sirva para un visitante real,
  no solo Guido: to-do 94 (publicar la pantalla de consentimiento OAuth de Google, que arranca en
  modo "Testing", y agregar el dominio de producción a los Redirect URLs de Supabase).
- PESTAÑA LIGAS (Versión 183, to-do 23(c); ampliada en la Versión 243, to-do 68):
  el ranking de ingresos de los clubes de una liga en UN ejercicio. Vive en
  `js/liga.js` y lee `data/rankings/<liga>.js`, así que NO baja ningún
  `data/<club>-data.js` (1 a 3,4 KB gzip por liga, contra 18-101 KB que costaría en
  vivo). Barras verticales ascendentes en el `brandColor` de cada club, con el
  valor en M/MM USD y, debajo, el % que esa barra representa del total de la
  liga-ejercicio (Versión 243) escritos arriba de cada barra; tabla con
  puesto/club/ingresos/ejercicio/documento; DEBAJO DE LA TABLA, un desglose de
  ingresos por categoría de Formato simplificado de cada club (Versión 243, el
  dato ya estaba precalculado en `mix` desde la Versión 182 — solo se usaba para
  el aviso del bolsón sin desglosar), SIEMPRE VISIBLE y sin toggle: pedido
  explícito de Guido, "que se halle scrolleando"; y salvedades derivadas del dato.
  TRES REGLAS QUE LA ORDENAN: el ejercicio está siempre escrito y es cambiable
  (un ranking es (liga, EJERCICIO), nunca (liga)); el default es el ejercicio con
  MÁS clubes y no el más reciente, porque los balances tardan en publicarse; y el
  "N de M" solo se escribe si `leagueSizeAt()` lo sabe. Se llega por el nav
  (estado frío: la grilla de ligas agrupadas por continente — Versión 232 — con
  país y liga alfabéticos y, cuando un país tiene más de una liga cargada, la
  liga ordenada por DIVISIÓN, `tier` ascendente, no alfabético por nombre —
  Versión 243) o eligiendo una liga en el selector, que hasta acá terminaba en
  Finanzas del primer club de esa liga por orden alfabético. No necesita club
  activo.
- SIMULAR CLUBES (O LIGAS ENTERAS) EN UNA LIGA QUE NO ES LA SUYA (Versiones 281-285, to-do 83) — por
  ingresos, no predicción deportiva. DOS caminos, misma vista de resultado: (a) desde Finanzas, el card
  "<club> en otra liga" (Versión 532; hasta ahí era un botón en la barra de controles), con el balance más nuevo elegido; (b) desde CUALQUIER liga, un buscador ("Sumar un
  club o una liga entera…") que acepta tanto un club suelto (se baja con `loadClubData()` antes de
  calcular, y su ejercicio queda editable con un dropdown inline) como una LIGA COMPLETA (inserta
  TODOS sus clubes de una, reusando `data/rankings/<liga>.js` ya calculado — no baja nada, por eso
  esos clubes no tienen dropdown de año). Cada club insertado se dibuja distinto (barra translúcida,
  fondo ámbar, badge "(simulado)") y NUNCA cuenta para los totales/cobertura reales de esa liga.
  Mientras hay algo simulado, un dropdown deja cambiar de liga sin perder los clubes, y "Volver a
  Ligas" reabre el picker con ellos en cola en vez de resetear todo. Se guarda solo en Mi Cuenta
  (to-do 70) como `state.clubes` (siempre array, mismo caso con 1 club o con varios). El botón de
  Finanzas solo aparece en modo "Año a año" (no "Por gestión"): el motor real compara un ejercicio
  puntual, no un rango.
- UI: EL SELECTOR DE CLUB ES UN MODAL PASO A PASO (Versión 146, reemplaza al panel
  de 5 columnas de la Versión 137, que a su vez había reemplazado a un `<select>`
  plano de 41 opciones). Una pregunta por vez, los pasos apilados: Deporte →
  Región → País → Clubes → Ejercicio de cada club. El resuelto se encoge a una
  línea con lo que elegiste y un "Cambiar"; ninguno es obligatorio ("Elegir más
  tarde" está en todos, por eso ninguno dice "opcional"). Arriba, el buscador:
  el que ya sabe qué quiere escribe "boca" o "primera div" y llega en un paso —
  busca clubes Y ligas, agrupados. Se abre con Ctrl/Cmd+K, con el botón de club
  del header, desde Inicio o desde el card de Finanzas. Vive en `js/selector.js`
  y se alimenta de `clubs.js` + `club-index.js` + `leagues.js` +
  `club-leagues/<iso2>.js`, sin bajar ningún archivo de club. Esos últimos NO son
  eager desde la Versión 164: se bajan al abrir el modal, que es el único lugar
  que los usa, detrás de una sola frontera async en `abrirModal()`.
  DESDE LA VERSIÓN 165 el buscador tiene debounce de 160 ms (en el listener, no
  en `renderBusqueda()`, que también se llama a sí misma y tiene que correr en el
  acto), tope de 30 resultados con "Mostrar más" y el conteo real, y una caché del
  texto buscable de cada club. La grilla de "elegir clubes" del constructor de
  mezcla lleva el mismo tope, con los ya marcados siempre primero, y DESDE LA
  VERSIÓN 174 su propio campo de filtro: mismo look que el buscador de arriba,
  pero busca sólo por nombre de club + país (no por liga, que en esa grilla no se
  imprime en ninguna parte), no toca nunca a los ya marcados, y lleva su propio
  estado de texto y de "Mostrar más", separado del buscador del modal.
  DESDE LA VERSIÓN 178 el círculo de iniciales de cada club va en SU color, no en el
  azul del sitio: `clubs[id].brandColor` (`data/clubs.js`), un hex verificado club
  por club contra su propia fuente. Pinta en los 4 lugares donde ese círculo existe
  (la fila del modal, el paso de "ejercicio de cada club", el card de Comparar y el
  botón de club del header), siempre por la misma `pintarCrest()` de
  `js/selector.js`, que además decide el color de las INICIALES por contraste —
  blancas mientras lleguen a 4:1 contra el fondo, negras cuando no (el celeste de
  Racing, el amarillo de Club América) — y le pone un aro interno a los colores muy
  claros, que contra el fondo blanco de la fila se perderían. Son 39 de los 41: el
  campo es opcional a propósito y Real Madrid y Once Caldas llevan `brandColor:null`
  (Versión 179), porque el color que los identifica es el blanco y un círculo blanco
  no se ve; esos dos se quedan con el azul del sitio, que es el fallback. El `null`
  explícito es lo que distingue "se miró y no lleva color" de "nadie lo chequeó": el
  ausente lo marca `node tools/audit.js` (`club-sin-color-ni-null`, P3), y resolver el
  color es desde la Versión 179 un paso del onboarding de cada club nuevo
  (`club-or-year-onboarding` §3 punto 1b), no una barrida que se repite. Desde la
  Versión 180 los 39 hexes tienen su PROCEDENCIA escrita, una línea por club en
  `fuentes/<País>/<Club>.md` ("Color de marca: `#XXXXXX` — <fuente>, verificado
  <fecha>"), el mismo formato con el que la anota un club nuevo: 5 del sitio oficial
  del club, 20 de la tabla por liga de footylogos, 9 de logotyp.us (los japoneses),
  2 de teamcolorcodes, 1 del infobox de ja.wikipedia (Cerezo), 1 sin re-verificar
  porque el sitio del club no responde (Ituano) y 1 que no salió de ninguna fuente
  externa (Boca, que usa el `--azul` histórico del sitio). Los escudos como IMAGEN siguen
  sin hacerse (derechos y hosting, el repo se deploya entero).
- LA PORTADA ES UNA PREGUNTA Y UNA VIDRIERA (Versión 144, reescrita en la 184 con
  el to-do 33). Inicio abre con dos opciones grandes: "quiero ver un club en
  particular" (abre el selector y aterriza en Finanzas) o "quiero comparar dos
  clubes o ligas" (va a la pestaña Comparar). ABAJO, LOS RANKINGS DE LIGA, hasta
  10, uno por entrada de `data/destacados.js`: cada uno con su "N de M", su
  gráfico, el aviso de cuánto no está desglosado y un "Ver la liga ›". HASTA LA
  VERSIÓN 184 abajo iba el resumen del club activo (4 KPIs y 3 gráficos,
  `#inicioClub`): se BORRÓ, por decisión de Guido — "en Inicio quedan las ligas
  que dejamos predeterminadas como para mostrar de qué es capaz y qué tiene la
  página, nada más". Dos de esos 3 gráficos encima duplicaban el `trendChart` de
  Finanzas. Inicio se ve IGUAL haya club elegido o no. Sin club se ven Inicio,
  Comparar, Ligas, Finanzas y Mi Cuenta; Fuentes aparece recién cuando hay uno. El
  club queda en `localStorage` y las visitas siguientes entran derecho a él.
  NINGÚN `data/<club>-data.js` SE CARGA EAGER, ni siquiera para la vidriera: los
  rankings salen de `data/rankings/<liga>.js`, ~6,5 KB gzip por los 4 bloques de
  hoy, contra ~150 KB que costaría calcularlos desde los archivos de club.
- COMPARAR (Versión 148-154, pestaña `#vs`, no confundir con "Comparar Gestiones",
  que compara 2 presidencias del mismo club). **Dos cards, A y B, y cada uno es un
  LADO. Un lado es una SUMA DE BLOQUES**, y cada bloque tiene su propio agregador:

      { kind:'liga',   league:'ar-primera', years:[2025],             agg:'promedio'|'suma' }
      { kind:'clubes', pares:[['boca',2025], ['river',null]],         agg:'promedio'|'suma' }

  De ahí sale el caso que lo motivó, de Guido: "promedio de clubes colombianos +
  sumatoria de 6 clubes brasileros" contra Real Madrid. Los cards se llenan con el
  MISMO modal, que para este camino gana un paso 4 ("¿qué querés medir?": Ligas /
  Clubes / Mezcla — las dos primeras son atajos de un bloque, la mezcla es el
  modelo completo). Por eso el card no tiene toggle Promedio/Sumatoria: muestra la
  FÓRMULA. `año === null` es "el ejercicio más reciente de ESE club"; en un bloque
  de liga el año NO puede ser null, define quiénes la integraban.
  El resultado son 6 indicadores, una fila cada uno con su barra a escala DENTRO
  de su indicador, más la composición de ingresos al 100% y las salvedades. Fuerza
  USD y Formato simplificado, y lo dice en pantalla. Muestra "sin dato" (no 0)
  cuando la fuente no informa. Los números salen de `computeYearGeneric()`, el
  motor real. Vive todo en `js/selector.js`: `js/comparar-clubes.js` (la bandeja de
  chips de la Versión 137) se borró en la Versión 152.
- Toggle de moneda nativa/USD y toggle "Formato del club"/"Formato simplificado"
  (este último es el default). El toggle "Año a año"/"Por gestión" está OCULTO
  desde la Versión 112 (pedido de Guido), código y datos intactos.
- IDIOMAS: el sitio tiene selector de idioma (globo, arriba a la derecha) desde
  la Versión 115. Castellano (idioma fuente, ES EL HTML mismo, sin archivo de
  diccionario) e inglés (`data/lang/en.js`, ~105 claves). Detecta el idioma del
  navegador en la primera visita y recuerda la elección en localStorage.
  AGREGAR UN IDIOMA = crear `data/lang/<code>.js` + una línea en
  `data/lang/langs.js`. Nada más: ni el HTML ni `js/i18n.js` se tocan.
  TRADUCCIÓN COMPLETA desde la Versión 138: las 204 claves que el sitio usa están
  las 204 en `en.js`, y `fuentes.html` también se traduce sola, con el mismo motor
  y el mismo diccionario (no se genera un archivo por idioma). Lo que NO se traduce
  es a propósito y ahora es una regla escrita en `Admin/CONVENCIONES.md`: los rubros de
  "Formato del club", el título de cada documento, y los nombres de club, de liga y
  de gestión, que salen textuales de la fuente o son nombres propios.
- CACHE DE ASSETS: todos los `<script src>` propios llevan `?v=`. SUBIR ESE
  NÚMERO al cambiar cualquier archivo de `js/` o `data/`, si no un visitante que
  ya entró antes se puede quedar con el JS viejo cacheado y el HTML nuevo.
  OJO, SE SUBE EN DOS LUGARES (corregido en la Versión 125, hasta acá este
  párrafo decía algo que no era cierto): `window.ASSET_V` es una constante
  inline, pero los `?v=` de los `<script src>` estáticos son LITERALES y no salen
  de ella, solo los 2 cargadores dinámicos (`loadClubData()`, `I18N.load()`) la
  leen. Hay que cambiar la constante Y los tags. Subir uno solo es peor que no
  subir ninguno: mezcla archivos nuevos con archivos viejos de la caché, que es
  el estado en el que el sitio tira `ReferenceError`. Lo chequea
  `node tools/audit.js` (`asset-v-desfasado`, P1).
- BRANDING: RESUELTO en la Versión 117 (decisión de Guido). La marca es distinta
  por idioma, a propósito: "El deporte en Números" en castellano, "Finance of
  Sports" en inglés (clave `site.name`, `data/lang/en.js`), que es además el
  dominio. Antes decía "Tu club en números", que ya no era cierto: el sitio dejó
  de ser solo de fútbol de clubes argentinos hace rato. El mail del formulario de
  contacto dejó de ser el placeholder `contacto@bocaennumeros.example` en la
  Versión 167: hoy el mailto va a `guidomamone91@gmail.com`.


---

## Trampas del navegador de preview (venía de `CLAUDE.md`, "Gotchas de tooling")

Texto movido sin cambios.

- **Caché de `<script src="data/....js">` o del propio `index.html` en el
  navegador de preview**: si después de editar un archivo (`data/*.js` o
  `index.html`) los números/estilos en pantalla siguen mostrando el valor
  VIEJO, aunque `curl`/`fetch` al mismo archivo ya muestre el nuevo,
  sospechá de caché del navegador ANTES de asumir que hay un bug real en el
  código. `location.reload()`, `Cmd+Shift+R`, parar/re-lanzar `preview_start`
  en el mismo puerto, abrir una pestaña nueva (`tabs_create`), Y cambiar el
  puerto en `.claude/launch.json` — ESTOS 5 CONFIRMADOS QUE NO ALCANZAN en
  este entorno (probado dos veces en la Versión 101: el puerto externo que
  ve el navegador queda igual aunque cambies el puerto interno del server,
  y la caché persiste incluso en una pestaña recién creada — el caché HTTP
  de este entorno parece compartirse por origen entre pestañas, no por
  pestaña). Lo único que funcionó de forma confiable: cambiar la URL exacta
  del `<script src="...">` con un query string.
  **ACTUALIZADO (Versión 115): esto ya NO es un truco temporal, ahora es una
  convención del proyecto.** Todos los `<script src>` propios llevan un `?v=`,
  y `window.ASSET_V` está declarado en un `<script>` inline justo antes de ellos.
  **CORRECCIÓN IMPORTANTE (Versión 125, este párrafo decía algo que no era
  cierto y costó un bug): los `?v=` de los `<script src>` estáticos son
  LITERALES, NO salen de `ASSET_V`.** Solo los 2 cargadores dinámicos
  (`loadClubData()` e `I18N.load()`) leen la constante de verdad. O sea que hay
  que cambiar la constante Y los tags, y cambiar uno solo es PEOR que no cambiar
  ninguno: el navegador mezcla archivos nuevos con archivos viejos de su caché
  (pasó al migrar los `fx`: llegó un `currency-map.js` cacheado sin
  `fxMetaFor()` mientras `finanzas-calc.js` ya lo llamaba, `ReferenceError` en
  toda la página). Lo chequea `node tools/audit.js` (`asset-v-desfasado`, P1),
  que compara la constante contra cada tag. Para forzar recarga durante una
  sesión de desarrollo: subí ASSET_V (y los tags) a un valor que nunca se pidió
  antes (ej. `115a`), navegá, confirmá, y dejalo en un valor limpio al terminar. Sirve
  igual en producción: sin esto, un visitante que ya entró antes se puede
  quedar con un `js/*.js` viejo cacheado mientras el HTML es nuevo. Confirmalo ejecutando `Object.keys(algunaConstDeEseArchivo)` o
  `document.querySelector('style').textContent.includes('tu regla nueva')`
  con `javascript_tool` ANTES de concluir que el cambio "no funciona" — y
  ANTES de concluir que SÍ funciona, ya que un error viejo puede seguir
  apareciendo en `read_console_messages` de una pestaña reusada aunque el
  problema ya esté arreglado (el historial de consola no se limpia solo
  entre navegaciones); si el error es sospechosamente el mismo que uno ya
  arreglado, volvé a chequear el estado real en vez de confiar en la lectura
  de consola.
  **NUEVO (auditoría de código, Versión 231→232, 2026-09-26): el propio `index.html` se puede quedar
  cacheado ENTERO, no solo sus `<script src>`.** Encontrado auditando en vivo justo cuando otra
  sesión pisó `ASSET_V` de 228 a 231: una pestaña nueva (`tabs_create`) seguía leyendo
  `window.ASSET_V === '228'` — o sea, ni siquiera pedía el HTML de nuevo, cache de la respuesta a
  `/` misma. La única forma que funcionó de forzar un fetch real del documento: navegar con un query
  string en la URL de nivel superior, no en un `<script src>` (`http://localhost:8971/?cb=<lo que
  sea>`). Confirmalo con `window.ASSET_V` (o cualquier otro global reciente) antes y después de
  agregar el query string si sospechás que estás mirando un `index.html` viejo pese a haber abierto
  pestaña nueva.
- **Un diálogo nativo abierto (`alert`/`confirm`) congela TAMBIÉN las herramientas
  de debug** (sesión 2026-09-13, Versión 137, costó una hora). Si `javascript_tool`
  empieza a dar timeout, si un `setTimeout` de 300 ms no resuelve, o si un
  `loadClubData()` queda "pendiente para siempre" aunque su request haya devuelto
  200, sospechá de un `alert()` abierto ANTES de buscar un bug de concurrencia: un
  diálogo nativo bloquea el hilo entero, así que ni los timers ni el `onload` de un
  `<script>` inyectado ni tu propia sonda desde la consola llegan a correr. Se
  destraba navegando con `force:true`. Y la moraleja para el sitio quedó como regla
  en `Admin/CONVENCIONES.md`: ningún camino de error usa `alert()`.
- **`computer` screenshot da BLANCO si la página está scrolleada**: en este
  entorno, `computer{action:"screenshot"}` devuelve una imagen en blanco
  cada vez que `window.scrollY > 0` en el momento de la captura, no importa
  cómo se llegó ahí (`window.scrollTo`, `scrollIntoView`, el `scroll_to` del
  tool `computer`, que sí mueve el scroll de verdad). Con `scrollY === 0`
  sale bien siempre. La vuelta que funcionó: `resize_window` con un
  `height` custom bien grande (2500-3000px) para que todo el contenido
  relevante entre sin scrollear, capturar ahí, y después
  `resize_window({preset:'desktop'})` para volver al tamaño normal. `zoom`
  con `region` (crop) tampoco está soportado en este entorno, devuelve la
  imagen completa igual. Esto es una limitación del TOOLING de esta sesión,
  no algo que haya que "arreglar" en el sitio.
