<!-- md: reglas de pantalla y código del sitio | leer: al tocar js/, index.html o css; la sección de la pantalla -->
# Reglas de pantalla y código del sitio

Cómo se ve y cómo está hecho el sitio. Primero, Finanzas multi-año; después, las reglas de la vista de
un ejercicio, que sigue armándose escondida y es la que vuelve con `?multi=0`: cards, dropdown "Año", tabla "Estado de resultados",
stats de arriba y cómo verificarlo en el navegador (venía del skill `club-or-year-onboarding`). Al final, "Convenciones de pantalla y
código": traducciones, `alert()`, ASSET_V, Chart.js, selects, color de club (venían de `Admin/CONVENCIONES.md`). Se lee cuando se toca
`js/`, `index.html` o CSS, no en cada sesión. Los textos movidos no cambiaron.

Los colores de marca, el chequeo contra el escudo y la liga de cada temporada de un club nuevo están en `.claude/skills/club-or-year-onboarding/club-nuevo.md`, secciones "Color de marca", "Chequeo contra el escudo" y "Liga de cada temporada".

---

## Finanzas multi-año: cómo es y qué no romper

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
  elegido, nunca un presupuesto. Muestra el puesto a la vista: un selector con las ligas que tienen clubes cargados
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
- **Marca COVID** (`esCovid()` y `marcaCovidHtml()`, js/finanzas-calc.js; estilos `.covid`, css/styles.css; mockup aprobado:
  `Prototyping/Covid/mockup-covid.html`; guías: `.claude/skills/producto-y-pantalla-finance-of-sports/referencia/marca.md`). Un ejercicio (balance
  o presupuesto) cuyo cierre cae entre 2020-03-31 y 2021-12-31 lleva una etiqueta de estado «COVID» (el patrón de `.stat-tag`: mayúsculas de 10,5 px
  con espaciado, recuadro de 4 px, azul del sitio sobre azul muy claro; sin estallido, sin inclinación). Se deriva de `cierreEjercicio()`: no hay
  campo en los datos. Va en tres lugares: una línea dentro del card de cada ejercicio (la fila suma esa línea de alto), la cabecera de las columnas de la tabla multi-año y el
  número «Ingresos» de arriba (solo ese, para no repetirla en los cinco). Es un `role="img"` con `aria-label` y un globo de `js/info-tip.js`
  (`data-info-tip`): al pasar el puntero o tocar; dentro de un card, tocarla abre el globo y no elige el año; fuera, recibe foco con Tab y se
  abre con Enter o espacio. Los textos son `covid.aria` y `covid.tip`.
  Fuera de Finanzas (mockup aprobado: `Prototyping/Covid/mockup-2.html`): en **Comparar**, dentro de cada chip de ejercicio de la pandemia de los dos
  lados y arriba del nombre en la cabecera de la tabla cuando todos los ejercicios de ese lado caen en la ventana; en la **página de una liga**, debajo
  de la pastilla de cada temporada de la pandemia (fuera del botón: no cambia su ancho y recibe foco) y al final de la línea «Suma de los N clubes con
  balance AAAA»; en el paso **«Elegí el ejercicio»** del selector, como texto en la opción («2020/2021 · COVID», el desplegable nativo no admite una
  etiqueta) y como etiqueta al lado del desplegable cuando lo elegido es de la pandemia. Una temporada de liga o un lado de Comparar la llevan solo si
  TODOS sus pares club-ejercicio caen en la ventana (`esCovidPares()`); hoy ninguna temporada de liga mezcla clubes de adentro y de afuera.
- **Mi Cuenta** guarda `years` además de `year`; con un solo año la clave es la de siempre (las búsquedas viejas no se duplican).
- **Cómo verificar un cambio acá**: los totales de cada columna contra la tabla de un año, eligiendo los ejercicios de a uno
  CON CLICKS en los cards (`#finYears .fin-year`). Llamar `refreshFinanzas()` o `selectClub()` desde la consola no sirve:
  la consola no ve el `currentClub` del script de la página y deja el estado mezclado. Y un `<details>` cerrado tiene
  `innerText` vacío: para leer su contenido, `textContent`.

---

## Comparar con el diseño de Finanzas: cómo es y qué no romper

Mockup aprobado y el porqué de cada decisión (en el comentario del principio): `Prototyping/Comparar/mockup-23.html`. Todo vive en
`js/selector.js`; el CSS, en `css/styles.css` (bloques `cd-*`, más las clases de Finanzas que se reusan: `.fin-year*`, `.pl-multi`).

- **Los cards son el título.** No hay "A contra B" ni párrafo de reglas. Abajo del nombre, una línea dice cómo se arma el lado
  (`comoSeArma()`: país · promedio/suma de N ejercicios de M clubes · "incluye N presupuesto"). B lleva la letra en naranja
  (`.cd-letra.b`, `#d9822b`): es el color de B en el gráfico.
- **Chips de ejercicio** (`filaChips()`), el mismo componente que Finanzas: un CLUB elige uno o VARIOS ejercicios (Balance /
  Presupuesto punteado / "Sin publicar" rayado y no elegible, armado desde `CLUB_INDEX`, sin bajar el archivo del club); una LIGA
  elige temporadas. Con más de 5 ejercicios PUBLICADOS arranca corta con "+N más". No deja apagar el último. Un club recién elegido
  arranca en su último BALANCE. "Cómo se junta: Promedio | Suma" con más de un ejercicio. Un lado de varios clubes, varias ligas o
  una mezcla sigue con la fórmula y "Ejercicios: …" (se cambia desde el modal).
- **Sin botón "Comparar".** Con los dos lados llenos, `render()` llama a `aplicar()` y el resultado se rehace con cada chip. Fija el
  club activo SOLO si no había ninguno (antes lo pisaba con el primer club de A). Cada archivo de club se baja con un reintento; si
  igual falla, el resultado lo dice arriba con "Reintentar" (`cmpFallidos`), en vez de mostrar un promedio parcial como completo.
- **Barra** (`renderControles()`, `#cdControles`): formato fijo en Simplificado y "Valores: Nominales | Ajustados por inflación".
  El USD / ARS del header se esconde en esta pestaña (`body[data-section="vs"]`, que pone el handler del nav en index.html).
- **Inflación** (`cmpReal`, `facReal()`): estado PROPIO, no el de `FIN_REAL` (Comparar siempre es USD). Serie USD de
  `data/deflactores.js`, año base = el último de la serie, cada ejercicio por su año de cierre ANTES de sumar o promediar
  (`numerosDe`, `mezclaDe`, `gastosDe`); un ejercicio que cierra después del año base no se ajusta. Unidad "M USD de 2025".
- **Gráfico** (`bloqueGrafico()`, `graficoAB()`): UN solo gráfico, A y B en el mismo eje (pedido de Guido: separados pierden la
  comparación). Eje X lineal = año de cierre, con los años elegidos como marcas: un año sin elegir deja su hueco y el tramo va
  punteado; presupuesto = punto hueco. Modos Ingresos / Gastos / Resultado (barras lado a lado) / De qué vive (una barra apilada
  por lado, colores fijos por rubro de `INICIO_INGRESOS_BUCKETS`). Cada punto sale de `seriePorAnio()`: el lado restringido a ese
  año y pasado por `totalesDe()`, o sea las mismas reglas que el número del lado. Los Chart.js se destruyen en cada render
  (`cmpCharts`).
- **Tabla** (`tablaComparacion()`): las filas de Finanzas en formato simplificado (orden del reporte ENTERO, ceros incluidos; una
  fila en cero en los dos lados se esconde), "Intereses y otros resultados" para que cierre contra el resultado, deuda neta, y al
  final "Indicadores que solo tiene Comparar" (masa salarial / ingresos, ingreso por socio). Columnas A, B y B / A sin colores.
  "% del total": B / A pasa a diferencia en puntos. "12 de 14" = ejercicios que informan el dato (`tt.nEj`, no `tt.informan`, que
  cuenta bloques). Columna amarilla si el lado es todo presupuesto. Rubro desplegable = `graficoAB()` de ese rubro.
- **Avisos**: los de cada lado, en su card (`avisosDeLado()`, `.cd-avisos-lado`); abajo de la tabla, solo los generales.
  **Fuentes** (`bloqueFuentes()`): un renglón por ejercicio, agrupado por lado.
- **Cómo verificar un cambio acá**: armá la comparación con `CLUB_SELECTOR.reopenComparacion(a, b)` en la consola (con la pestaña
  Comparar ya abierta, o los chips no saben su ancho) y tocá chips de verdad. Par de control: liga AR 2020+2024 promedio contra
  Boca 22/23 + 24/25 + 26/27 = ingresos 47.4 / 148.0 nominal y 49.6 / 149.7 ajustado. El servidor local (`python3 -m
  http.server`) corta conexiones si se bajan muchos archivos de club a la vez: un "—" en un lado entero es eso, y desde la Versión
  559 lo dice el aviso de arriba.

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
(`currentClub = 'boca-ar'`), así que "visible por default" ya es el estado correcto para ellas. Pero
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
data file del club (en su JSON, `extras.budget_assumptions` / `budget_financial` / `budget_investments`; el generador los emite con esos nombres), y el `#torneosBoca2027` de los 3 cards de torneo). Nada de mensaje
"no hay supuestos para este ejercicio": si no hay dato, el card directamente no aparece.

Implementación de referencia (`renderSupuestosCard`/`renderPresupuestoFinancieroCard`/
`renderPresupuestoInversionesCard`/`renderTorneosCard` en index.html): cada función busca el dato en
su mapa `[clubId][year]` (o chequea `clubId==='boca-ar' && year===2027` para los 3 cards de Boca 2027
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

**Excepción (aprobada por Guido): la tarjeta Estructura y la página del grupo multiclub.** Cada entidad lleva un link "ver
en el balance" (o "ver en <dominio>" para una cita externa) a la transcripción, sin la palabra "Fuente:": la cita por entidad es el dato
que pide el periodista. No se extiende a otros cards.

## Verificar en el browser de verdad, no solo revisar los números a mano (ex §8)

Cómo se verifica una pantalla y las trampas del navegador de preview: skill `producto-y-pantalla-finance-of-sports`, `referencia/navegador-de-preview.md` (también cómo verlo como archivo).

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
(`data/ar/racing-ar-data.js`, `racingPresupuestoOverlayByYear[2020]`): `revenueLines` excluía a propósito
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

## Comentarios en lo que se publica (`index.html`, `js/`)

Todo comentario viaja al visitante. En el código queda solo el porqué técnico que hace falta para no romper algo al editarlo, en 1 a 3
líneas. No van nombres de personas, "Versión N", "to-do N", fechas, citas de pedidos ni contadores ("41 clubes"). La historia de un
cambio va al CHANGELOG. Una regla que vale para más de un lugar va acá, en PANTALLA, y el comentario apunta a la sección.
`node tools/audit.js` lo chequea (`comentario-interno-publicado`). Para limpiar comentarios sin tocar código:
`node tools/comparar-sin-comentarios.js <archivo>` compara el archivo contra `HEAD` con los comentarios sacados y tiene que dar igual.

## Convenciones de pantalla y código

Venían de `Admin/CONVENCIONES.md`, sin cambios de texto.

- REVERTIR LA FUSIÓN DE ABONOS EN ESTADIO: `ABONOS_DENTRO_DE_ESTADIO = false` en `js/finanzas-calc.js` y correr
  `node tools/generate-rankings.js` (los rankings hornean el nombre de cada fila; si no se corre, `audit.js` lo marca P1). Nada más:
  ningún dato cambia (`season_tickets` es la misma categoría en los dos escenarios), `INICIO_INGRESOS_BUCKETS` conserva los colores
  de "Abonos" y de las filas viejas, y `data/site-labels.js` / `data/lang/en.js` conservan sus claves i18n.
- DEUDA Y CAJA SIN DATO: sin dato es null en `data/` (el 0/0 de la convención vieja ya no queda; si aparece, se lee igual: no se
  cargó). Un dato null se muestra "—", nunca 0, y sin deuda O sin caja no hay deuda neta ("Sin dato"): `deudaNoDesglosada()` y
  `filaDeuda()` (`js/finanzas-render.js`), las usan la ficha, el KPI, el multiaño, Comparar gestiones y el selector. Un 0 IMPRESO de uno solo de los dos es real y se muestra (Sunderland
  2024, caja 0). `debtDisclosureNote()` (`js/finanzas-calc.js`) avisa debajo de la ficha de deuda; el placeholder no lo necesita
  porque ya tiene su propio banner. Un mensaje traducible que lleva datos adentro se arma con `{a}`/`{b}`
  sobre una sola clave de `t()`, nunca concatenando pedazos traducidos: eso congela el orden de palabras del castellano.

- UN TEXTO QUE ESCRIBE JS NO LLEVA `data-i18n`. `I18N.apply()` guarda como "castellano original" lo que
  el elemento tenga la PRIMERA vez que lo ve y lo vuelve a poner en cada cambio de idioma: si JS ya había escrito ahí (el nombre del club
  en el chip del header), ese texto viejo vuelve. Lo que arma JS se traduce con `t()` en su render, y ese render se llama desde
  `I18N.onChange` (en index.html). Al agregar un render nuevo, sumarlo ahí: `CLUB_SELECTOR.refresh()` no estaba, aunque su comentario
  decía que sí.
- UN SOLO BOCADILLO DE EXPLICACIÓN: `js/info-tip.js`. Hover en desktop, tap en mobile, un único `div.op-info-float`
  `position:fixed` colgado de `body` (esquiva el `overflow:hidden` de cards y del modal). Para algo pintado con innerHTML alcanza con
  `data-info-tip="texto"` (delegación); para un botón que no debe propagar el click, `INFO_TIP.enganchar(el, texto)` (el "?" del
  selector). No crear otro bocadillo propio en otro archivo: así terminó duplicado el del selector.
- "DENTRO DE OTRO RUBRO" (textos de Guido): una fila con `incluidoEn` dice solo "Dentro de otro rubro" / "Posiblemente
  dentro de otro rubro" (en la celda no entra el nombre del rubro: ocupaba seis renglones) y el rubro va en el bocadillo:
  "Está incluido en X: la fuente lo reporta junto con ese rubro." / "Sospecho que está dentro de X: no es un cero, pero la fuente no lo
  aclara o es confusa." (`window.FINANZAS_DENTRO_TIP`, en js/finanzas-render.js; lo usan también js/liga.js y js/selector.js). En
  Comparar, un lado de UN ejercicio lo muestra en la celda igual que Finanzas; uno de varios ejercicios no tiene una celda única que
  marcar, y lo dice en prosa en el card de ese lado, con el rubro nombrado ("está dentro de X").

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
- NADA DE `alert()` EN UN CAMINO DE ERROR. Un
  `alert()` nativo congela el hilo entero: timers, `onload` de los `<script>` que inyecta
  `loadClubData()`, y cualquier intento de leer el estado desde la consola para diagnosticar. Desde
  que el club elegido se guarda en `localStorage` y se carga solo al abrir el sitio, un club que
  falle con un alert deja la página congelada EN CADA VISITA, sin poder siquiera elegir otro. Los
  errores se cuentan por `console.error` y se muestran en un aviso dentro de la página.
- UNA PÁGINA FUERA DE LA RAÍZ TIENE QUE DECLARAR `window.I18N_BASE`. `I18N.load()` arma el src del diccionario como `data/lang/<code>.js`, y eso es relativo al
  DOCUMENTO, no a `js/i18n.js`. Las primeras páginas del proyecto que no viven en la raíz son las de
  fuentes por club (`fuentes/<clubId>.html`): pedían `fuentes/data/lang/en.js`, se comían un 404 y se
  quedaban en castellano aunque el visitante tuviera el sitio en inglés. Peor todavía, el `onerror`
  de `I18N.load()` degrada a castellano a propósito, así que no se veía rota, se veía en el idioma
  equivocado. Ahora el src lleva `window.I18N_BASE` adelante ('' en la raíz, '../' en `fuentes/`).
  Los `<script src>` estáticos NO alcanzan: esos ya llevaban su `../` y cargaban bien, el que fallaba
  era el inyectado en runtime. Mismo tipo de trampa que `loadClubData()`.
- TODO ARCHIVO DE `js/` QUE LLAME A `t()` VA EN LA LISTA DE `tools/audit.js`. El
  chequeo `i18n-incompleto` recorre una lista fija de archivos; cuando nació `js/selector.js` no
  estaba, así que sus claves nuevas eran invisibles y el chequeo pasaba en verde mientras el
  visitante de habla inglesa leía castellano. Y al revés: cuando un archivo de esa
  lista SE BORRA, hay que sacarlo, o el chequeo entero revienta con ENOENT y deja de correr.
  AMPLIADO: la regla no es solo para `js/`, es para TODO archivo que emita claves de
  i18n, incluido el que GENERA HTML. `tools/generate-fuentes-page.js` escribe `data-i18n` en
  `fuentes.html` y en las páginas por club, y no estaba en ningún escaneo: una clave nueva de esas
  páginas era invisible para el chequeo. Ya está en la lista.
  COROLARIO: las claves que quedan huérfanas al borrar una feature se borran de
  `data/lang/en.js` en el mismo movimiento — el merge del selector dejó 88. El audit no las detecta:
  cuenta las que FALTAN, no las que sobran.
- ASSET_V SE SUBE EN DOS LUGARES, NO EN UNO (la constante y cada `?v=`): la regla y el bug que la motivó están una sola vez, en "CACHE DE ASSETS" (más abajo).
- 2 BUGS REALES CORREGIDOS + REGLA NUEVA DE ORDEN DEL DROPDOWN: (1) Boca (club default)
  aparecía con TODOS los gráficos de Finanzas vacíos en la primera carga de la página, y solo se
  arreglaba solo después de cambiar de club y volver — causa: `pasesDataForClub`/
  `resultadosDataForClub`/`titulosDataForClub` (más abajo en el `<script>`) referencian
  `CLUB_GENERIC_DATA` SIN el prefijo `window.`, y ese objeto global solo se crea DENTRO de cada
  `data/<país>/<club>-data.js` lazy-loaded — en la carga inicial, antes del primer cambio de
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
- REGLA REFORZADA (Guido: "urnifica, tienen que ser exactamente iguales los nombres"):
  no alcanza con nombres PARECIDOS entre Boca y el motor genérico, tienen que ser IDÉNTICOS
  carácter por carácter. Bug real encontrado y corregido: Boca usa el label `'Televisión'` (fila
  del Ejercicio 2027), el motor genérico tenía `'Televisión / Derechos de TV'` para la misma
  categoría (`broadcasting`), corregido a `'Televisión'` exacto. Antes de dar por buena una
  cambio de labels, comparar carácter por carácter contra la lista de `js/finanzas-calc.js` y `data/site-labels.js`, no de
  memoria/aproximado.
- REGLA PERMANENTE: el ORDEN de las filas es el de `GENERIC_SIMPLIFIED_REVENUE_BUCKETS` / `_EXPENSE_BUCKETS` (`js/finanzas-calc.js`), igual para todos los clubes. Ingresos hoy:
  Cuotas Sociales, Comercial / Sponsors, Estadio, Televisión, Premios por competencias, Venta de Jugadores, Otras actividades (educación y otros deportes), Subsidios y
  donaciones, el bolsón «sin desglosar» y el catch-all «Otros ingresos» (con «Abonos» de vuelta en 6.ª posición si `ABONOS_DENTRO_DE_ESTADIO` se pone en `false`).
  Gastos: Compra de jugadores, Salarios y primas, Inversiones, Organización de partidos, Otras actividades, Administración y gastos generales, el bolsón y «Otros gastos».
  Una fila se agrega o fusiona con la medición `node tools/fos.mjs filas`. Estadio y Abonos son dos conceptos (partido por partido / temporada completa).
  El bolsón «Fútbol profesional (sin desglosar por la fuente)» lleva `hideIfZero:true` en su definición: no se pinta si ese club/año no tiene
  ninguna línea adentro (solo existe porque a veces el dato no desglosa más). Un bucket NORMAL en $0 (ej. Venta de Jugadores cuando no hubo ventas)
  se muestra igual; ninguna otra fila se oculta en cero. Ver `.claude/skills/club-data-mapping/referencia/formato-simplificado.md`.
- REGLA PERMANENTE: el Formato simplificado de CUALQUIER club usa las mismas filas, en el mismo orden y con los mismos nombres, definidas en un solo lugar
  (`GENERIC_SIMPLIFIED_REVENUE_BUCKETS` y `GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` de `js/finanzas-calc.js`); Boca es un club más. Si el documento de un club no
  permite categorizar así, el monto va al catch-all y se anota; cambiar las filas para todos se decide con `node tools/fos.mjs filas` (cuántos clubes la
  usan, cuánto pesa, en qué países). Detalle y cómo se agrega una fila: `.claude/skills/club-data-mapping/referencia/formato-simplificado.md`.
- REGLA: el
  `<select id="gestionSelect">` también tiene ancho fijo por CSS
  (`#gestionSelect{width:200px;max-width:100%;}`, justo después de `#anioSelect{...}`), mismo
  criterio y mismo motivo que el de "Año". 200px alcanza
  para la gestión más larga de los 3 clubes ("Riquelme (2023-actual)", Boca, ~188px medido en el
  navegador).
- REGLA (bug real de UX reportado por Guido): el `<select id="anioSelect">` ("Año" de
  Finanzas) tiene ancho fijo por CSS (`#anioSelect{width:300px;max-width:100%;}`, justo después de
  la regla genérica `select{...}`). Antes no tenía ancho propio, así que un `<select>` nativo se
  achica o agranda según el texto de la OPCIÓN seleccionada (no la más larga de la lista), y el
  box cambiaba de tamaño cada vez que cambiabas de club o de ejercicio dentro del mismo club, un
  detalle molesto que Guido notó. 300px alcanza para la etiqueta más larga de los 3 clubes
  ("Ejercicio 2025/2026 (esperando datos)", Boca, ~282.5px medido en el navegador con el ancho
  incluida la flecha nativa). REGLA PARA EL FUTURO: si se agrega un club/año con una etiqueta más
  larga que esa, medir de nuevo en el navegador (`selectEl.getBoundingClientRect().width` con esa
  opción seleccionada) antes de asumir que 300px sigue alcanzando, no agrandar el número a ojo.
- REGLA VIGENTE:
  los cards "Supuestos", "Presupuesto Financiero", "Presupuesto de Inversiones" e "Ingresos y
  Egresos por Torneo" ahora se ESCONDEN por completo cuando el club/ejercicio seleccionado no tiene
  presupuesto cargado, en vez de mostrar un mensaje de "no hay". Pedido explícito de Guido al ver
  los 4 cards vacíos para Boca 2024/2025 (que tiene balance, no presupuesto). La función
  `noDataMsg()` se borró (ya no la llama nadie). Detalle completo en
  `Admin/PANTALLA.md`, la regla de los 4 cards escondidos sin presupuesto.
- REGLA PARA EL FUTURO (pedido explícito de Guido: "es mi manera de hacerte un
  control"): toda fila de "Formato simplificado" tiene que llevar `items` con el desglose real de
  qué campo(s) nativo(s) se sumaron para llegar a ese número, nunca `items:null`. Implementado para
  Boca en la Versión 40 y para River/Racing en la Versión 42 (ver bullet más arriba), así que hoy
  ya cubre a los 3 clubes.
- REGLA:
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
- REGLA: el "$" del eje Y del gráfico de barras (card Gráficos) no
  colisiona más con el tick más alto, ver `layout:{padding:{top:26}}` en `drawTrendChart`/
  `drawTrendChartGeneric`.
- REGLA (pedida por Guido: "detesto que hagas eso"): la cita de fuente ("Fuente: ...")
  NUNCA va adentro de un card individual (Supuestos, Presupuesto Financiero, Presupuesto de
  Inversiones, ni ningún card nuevo). Va en `#finanzasDataQualityBanner` (por ejercicio),
  `#finanzasClubSourceNote` (por club, al final del bloque de cards) o la tarjeta Fuentes de Finanzas, nunca
  repetida card por card. Ver `Admin/PANTALLA.md`, la regla de la fuente fuera de los cards.
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
  juntos cada vez que cambia club/año/gestión. ACTUALIZADO: los datos de los 3
  viven en el data file de cada club (generado de su JSON: `extras.budget_assumptions` / `budget_financial` / `budget_investments`), en `presupuestoSupuestosByYear` /
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
  clase, si no queda visible con cualquier club.
- OJO `Object.keys()` sobre un objeto con claves que parecen enteros
  (riverFiscalYearMeta, racingFiscalYearMeta: "2024","2025"...): JS SIEMPRE
  las reordena ascendente al iterarlas, sin importar el orden del código
  fuente, no asumir que el orden de escritura se respeta. `populateFinanzasSelectors()` ya ordena a mano
  (`.sort((a,b)=>b-a)`) para que el selector de Año quede descendente, y
  preserva el ejercicio seleccionado (o el más cercano) al cambiar de club,
  cualquier `<select>` nuevo que liste ejercicios de estos objetos debe
  seguir el mismo criterio, no confiar en el orden de iteración.
- OJO texto fijo dibujado a mano en un <canvas> de Chart.js: el "$" del eje Y
  del gráfico de barras se dibujaba con `ctx.fillText` para
  esquivar la rotación automática del título nativo, pero salía con el glyph
  roto (reportado por Guido), no se pudo diagnosticar la causa
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
  pegado al borde derecho, space-between lo reparte entre los 3. Si se agrega un `<summary>` nuevo con label+monto, darle al
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
- EN EL CAMINO DE FINANZAS EL SELECTOR ELIGE UN SOLO CLUB (decisión de Guido). El paso de clubes (`PASO_CLUBES` en
  js/selector.js) es de elección única cuando `origen === 'finanzas'`: tocar un club avanza (`unico`, sin casillas ni "Elegir todos"). La multi-selección
  es solo de Comparar, donde un lado puede ser un conjunto. Antes se podían marcar varios y el card final decía "2 clubes", "suma(2 clubes)" y "Ver los
  números de AC Milan" a la vez. La fórmula ("suma(…)") tampoco se muestra fuera de Comparar.
- LA ETIQUETA DE UN EJERCICIO ("2021" O "23/24") Y SU GESTIÓN SALEN DE LA FECHA DE CIERRE DE ESE EJERCICIO, NO DEL CLUB (decisión de Guido). Se pregunta con `esEjercicioCalendario(clubId, y)` / `cierreEjercicio(clubId, y)` (js/finanzas-calc.js), nunca con
  `clubs[id].fiscalYearStart === '01-01'`: Parma, Atalanta, Milan, Genoa y Fiorentina cambiaron la fecha de cierre algunos años, y con la regla por
  club Parma 2018 se veía "2018" y se le asignaba Pizzarotti (es 17/18, de Jiang). Escalera: `cierre` del fiscalYearMeta, la fecha del `fxRef`, y si el
  data file no está cargado (Ligas, selector, Comparar) `CLUB_INDEX[id].ci` (lo genera tools/generate-club-index.js con el mismo criterio, desde
  tools/cierre-ejercicio.js, que también usa generate-fuentes-page.js); al final, la regla del club. Una serie puede quedar mezclada (Atalanta
  "2018 … 2021, 22/23 …"): es correcto, no se avisa aparte.
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
- OJO CON EL ESTADO DE UI A NIVEL DE MÓDULO EN `js/selector.js`.
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

- PRESUPUESTOS, POR CLUB: los 3 cards que solo aparecen para un
  ejercicio con presupuesto (Supuestos, Presupuesto Financiero, Presupuesto de
  Inversiones) sacan sus datos de `presupuestoSupuestosByYear` /
  `presupuestoFinancieroByYear` / `presupuestoInversionesByYear`, adentro del
  `data/<país>/<club>-data.js` de cada club. Antes vivían en 3 registros por club dentro
  de `js/finanzas-render.js`, y el contenido de Boca era HTML escrito a mano en
  ESTE archivo. Onboardear un presupuesto ya no toca ni el motor ni el HTML.
- PESTAÑAS: Finanzas es la única con datos reales y es donde está todo el
  trabajo. Resultados Deportivos / Títulos están vacías o con placeholder según el club. La pestaña
  Mercado de Pases se borró (decisión de Guido): mostraba datos inventados; `pasesData`
  queda como `[]` en cada club y nadie lo lee. "Mi Cuenta" DEJÓ DE SER
  UN STUB: login con Google vía Supabase y "Saved Searches" reales — cada club/comparación que se
  mira queda guardado solo (sin botón), con favoritos primero y el resto del historial después.
  No es un paywall (la decisión de ir todo gratis sigue en pie): es que quien se
  loguea puede volver a ver lo que ya miró. Pendiente antes de que sirva para un visitante real,
  no solo Guido: to-do 94 (publicar la pantalla de consentimiento OAuth de Google, que arranca en
  modo "Testing", y agregar el dominio de producción a los Redirect URLs de Supabase).
  Desde el 2026-10-30, una tabla NUEVA en el esquema `public` de Supabase necesita su `grant` explícito en la misma
  migración (aviso de Supabase del 2026-10-20); `saved_searches` ya existe y ya tiene el suyo (`tools/supabase/schema.sql`), así que no cambia nada.
- TARJETA "LAS CUENTAS DE LA LIGA" (Ligas; `cardLiga` en `js/auditoria.js`, datos en `data/auditoria/_ligas.js`, que genera
  `tools/auditoria.mjs`). Sale solo si la liga-año tiene ranking. Una liga cuya línea es `falta_transcripcion` NO se publica (se veía el
  código crudo y una frase falsa); queda en `--pendientes`. Con `alcance: federacion` (KNVB, HNS) la tarjeta dice que es la federación
  entera, no solo la liga, y lleva el chip "Cuentas de la federación entera".
- PESTAÑA LIGAS (mockup: artboards "Ligas" del artifact "Pantallas FoS"). El ranking de ingresos de los clubes de una liga
  en UN ejercicio. Vive en `js/liga.js` y lee `data/rankings/<liga>.js`, así que NO baja ningún `data/<país>/<club>-data.js`.
  ESTADO FRÍO (se llega por el nav): un buscador (liga o país); filtros de deporte (solo si hay más de un deporte con datos), región y
  «Con informes» (solo los informes propios de la liga, no el de toda Europa); y las ligas agrupadas por País (default: un país plegable por
  fila, con sus ligas por nivel; los dos primeros abiertos, o todos si se busca), por Deporte o por Nivel (una matriz país × nivel de UN
  deporte). Se ordena A–Z o por cantidad de ligas. La lista NO muestra cuánto hay cargado ni plata (pedido de Guido): solo nombre, nivel,
  país, deporte y la marca de informes. Los niveles se comparan solo dentro de un país y un deporte; los estaduales de Brasil no tienen
  nivel y quedan como están («—», al final de su país). Todo sale de `LEAGUES` y de `window.RANKINGS_INDICE` (en
  `data/rankings/_regiones.js`, generado), así que no baja los rankings. Deporte, región, agrupación, orden e informes viven en la
  URL (`?tab=liga&deporte=rugby&agrupar=nivel`). Las ligas sin datos van al final, plegadas y sin poder entrar. UNA LIGA: "← Todas las
  ligas", el nombre con su bandera, país · división · deporte, y los ejercicios como pastillas (solo el año). Abajo, dos columnas (una en el
  teléfono): a la izquierda el ranking con barras horizontales en el color de cada club y el total de los cargados (sin el documento
  de cada club en la fila: demasiado texto junto; está en su ficha, en Fuentes y, si es un presupuesto o una copia, en las
  salvedades); a la derecha "De dónde sale la plata" (una barra apilada por club, colores por peso en el ranking y el bolsón sin
  desglosar en beige, "Sin desglosar" en la leyenda; un tramo negativo o una fila "dentro de otro rubro" se nombran debajo) y el
  simulador. Las salvedades, en un párrafo chico al pie. TRES REGLAS QUE LA ORDENAN: el
  ejercicio está siempre escrito y es cambiable (un ranking es (liga, EJERCICIO), nunca (liga)); el default es el ejercicio con MÁS
  clubes y no el más reciente, porque los balances tardan en publicarse; y el "N de M" solo se escribe si `leagueSizeAt()` lo sabe.
  Las banderas (no los códigos de país) son las de `COUNTRIES[...].flag`, también en las tarjetas de Inicio.
  Las tarjetas de ranking de Inicio no llevan cuántos clubes hay cargados ni US$ por club (pedido de Guido): nombre, barra y el ejercicio.
- SIMULAR CLUBES (O LIGAS ENTERAS) EN UNA LIGA QUE NO ES LA SUYA — por
  ingresos, no predicción deportiva. DOS caminos, misma vista de resultado: (a) desde Finanzas, el card
  "<club> en otra liga", con el balance más nuevo elegido; (b) desde CUALQUIER liga, un buscador ("Sumar un
  club o una liga entera…") que acepta tanto un club suelto (se baja con `loadClubData()` antes de
  calcular, y su ejercicio queda editable con un dropdown inline) como una LIGA COMPLETA (inserta
  TODOS sus clubes de una, reusando `data/rankings/<liga>.js` ya calculado — no baja nada, por eso
  esos clubes no tienen dropdown de año). Cada club insertado se dibuja distinto (barra translúcida,
  fondo ámbar, badge "(simulado)") y NUNCA cuenta para los totales/cobertura reales de esa liga.
  Mientras hay algo simulado, un dropdown deja cambiar de liga sin perder los clubes, y "Volver a
  Ligas" reabre el picker con ellos en cola en vez de resetear todo. Se guarda solo en Mi Cuenta
  como `state.clubes` (siempre array, mismo caso con 1 club o con varios). El botón de
  Finanzas solo aparece en modo "Año a año" (no "Por gestión"): el motor real compara un ejercicio
  puntual, no un rango.
- UI: EL SELECTOR DE CLUB ES UN MODAL PASO A PASO. Una pregunta por vez, los pasos apilados: Deporte →
  Región → País → Clubes → Ejercicio de cada club. El resuelto se encoge a una
  línea con lo que elegiste y un "Cambiar"; ninguno es obligatorio ("Elegir más
  tarde" está en todos, por eso ninguno dice "opcional"). Arriba, el buscador:
  el que ya sabe qué quiere escribe "boca-ar" o "primera div" y llega en un paso —
  busca clubes Y ligas, agrupados. Se abre con Ctrl/Cmd+K, con "Buscar un club o
  una liga" del header, desde Inicio o desde "Cambiar de club" en Finanzas. Vive en `js/selector.js`
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
  botón de club del header, que hoy está escondido), siempre por la misma `pintarCrest()` de
  `js/selector.js`, que además decide el color de las INICIALES por contraste —
  blancas mientras lleguen a 4:1 contra el fondo, negras cuando no (el celeste de
  Racing, el amarillo de Club América) — y le pone un aro interno a los colores muy
  claros, que contra el fondo blanco de la fila se perderían. Son 39 de los 41: el
  campo es opcional a propósito y Real Madrid y Once Caldas llevan `brandColor:null`
 , porque el color que los identifica es el blanco y un círculo blanco
  no se ve; esos dos se quedan con el azul del sitio, que es el fallback. El `null`
  explícito es lo que distingue "se miró y no lleva color" de "nadie lo chequeó": el
  ausente lo marca `node tools/audit.js` (`club-sin-color-ni-null`, P3), y resolver el
  color es desde la Versión 179 un paso del onboarding de cada club nuevo
  (`club-or-year-onboarding/club-nuevo.md`, sección "Color de marca"), no una barrida que se repite. Desde la
  Versión 180 los 39 hexes tienen su PROCEDENCIA escrita, una línea por club en
  `Admin/sourcing/<País>/<Club>.md` ("Color de marca: `#XXXXXX` — <fuente>, verificado
  <fecha>"), el mismo formato con el que la anota un club nuevo: 5 del sitio oficial
  del club, 20 de la tabla por liga de footylogos, 9 de logotyp.us (los japoneses),
  2 de teamcolorcodes, 1 del infobox de ja.wikipedia (Cerezo), 1 sin re-verificar
  porque el sitio del club no responde (Ituano) y 1 que no salió de ninguna fuente
  externa (Boca, que usa el `--azul` histórico del sitio). Los escudos como IMAGEN siguen
  sin hacerse (derechos y hosting, el repo se deploya entero).
- EL HEADER EN EL TELÉFONO ES UNA SOLA FILA (hasta 700 px de ancho; mockup: artboards "Header en el teléfono" del artifact "Pantallas
  FoS — Inicio"). Logo, lupa (abre el selector; al elegir, a Finanzas) y un botón con el nombre de la sección actual que abre el menú.
  El menú es el MISMO `#mainNav` mostrado como panel debajo del header, más idioma y contacto (`.m-extra`, fuera del nav a propósito:
  todo `#mainNav button` se trata como pestaña). La moneda vive en el panel de Finanzas (también en escritorio) y el botón de club no se muestra en ningún ancho ("Buscar un club o una liga", la lupa en el teléfono, abre el mismo selector; el club se nombra en el título de Finanzas). Entre 701 y 900 px sigue el header de
  varias filas; en escritorio, nada cambió.
- EL ESTADO EN LA URL (`js/principal.js`, "EL ESTADO EN LA URL"). `?tab=finanzas&club=river-ar&anios=2021,2024`,
  `?tab=liga&liga=es-laliga&anio=2025`; Inicio no lleva nada. Un link copiado abre la misma pestaña, club, años, liga y ejercicio, y
  "atrás" vuelve a lo anterior: pestaña, club y liga suman una entrada al historial (`pushState`); los años y el ejercicio de una liga
  la reemplazan, para no llenar el historial con cada click. Al abrir, la URL le gana al club guardado; un club o una liga que no
  existen se ignoran. Se tocan solo esas cinco claves (`?multi=0`, `?audit=1` quedan). La moneda, la inflación, el formato y
  Comparar todavía no van en la URL. El índice de Finanzas salta sin escribir un #ancla.
  EL SCROLL sigue a la vista, en un solo lugar: `scrollDeVista()`, que corre en cada `escribirURL()`. Otra vista (pestaña, club, liga,
  grupo o sponsor) arranca arriba, o en el ancla si la URL trae una; el año, la moneda o un filtro no mueven nada. Atrás, adelante y
  recargar vuelven a la altura en que se dejó esa entrada (`history.scrollRestoration = 'manual'`; cada entrada lleva una clave `k`).
  Ninguna vista llama a `window.scrollTo(0, 0)` por su cuenta al navegar: si hace falta, falta pasar por `escribirURL()`.
  EL FOCO también sigue a la vista: `focoDeVista()` lo lleva al primer `h1`/`h2` visible de la sección nueva (o a la sección), con `tabindex="-1"` y la
  clase `.foco-vista` (sin contorno); al abrir la página no se mueve. El selector de club devuelve el foco al elemento que lo abrió (`quienAbrio`), salvo
  al buscador de Inicio, que al enfocarse lo vuelve a abrir.
- LIGAS EN EL TELÉFONO, 44 PX (`referencia/ux.md`, punto 4): a 560 px o menos cada fila del ranking mide 44 px y el botón del club la cubre entera con
  un `::after` (tocar la cifra o la barra abre el club); las pastillas de ejercicio miden 44 hasta 700 px; «← Todas las ligas», «Ver el informe original»,
  «Abrir todos / Cerrar todos» y cada país de la lista, 44; el buscador de la lista ocupa su caja; el plegable «ligas sin datos» se toca entero
  (márgenes negativos, sin cambiar cómo se ve). Los links dentro de un párrafo quedan exceptuados.
- 44 PX EN EL TELÉFONO, FUERA DE LIGAS (`css/styles.css`, bloque «ÁREAS DE TOQUE EN EL TELÉFONO», hasta 700 px): los botones y controles crecen
  a 44 (atajos y filas de los rankings de Inicio, «Ver la liga», «Elegí un club», «Cambiar de club», «Más opciones», presets y gestiones, «+N más», los
  segmentados, el índice de Finanzas, «Entrar con Google»; «Todos» y la × también a 44 de ancho). Los links dentro de un texto o de una celda agrandan su
  área sin mover nada (padding y margen negativo de 15 px); dos links solos en su renglón, uno debajo del otro (`.fin-fuentes-link`), ocupan los 44 de
  verdad, y un párrafo con más de un link queda afuera porque las áreas se pisarían (excepción decidida por Guido; texto original en `Admin/Archive/ux-excepcion-texto-corrido.md`).
  En la página de una liga el botón de cada club también mide 44 (padding y margen negativo), además del `::after` que cubre la fila.
- LA FILA DE CHIPS DE EJERCICIO EN EL TELÉFONO (Finanzas y Comparar, `mostrarElegidosEnFila()` en `js/finanzas-calc.js`): arranca en lo más
  nuevo, salvo que así no se vea ningún ejercicio elegido; ahí arranca con el más viejo de los elegidos contra el borde izquierdo.
- LO ABIERTO EN LA LISTA DE LIGAS: los países que el visitante abre o cierra a mano y el plegable de las ligas sin datos se guardan en memoria
  (`frio.pais`, `frio.sinDatos` en `js/liga.js`) y vuelven igual con atrás; «Abrir todos / Cerrar todos» los borra, y un cambio de filtro vuelve
  `abiertos` al de siempre.
- FINANZAS, LO DE ARRIBA (mockup: artboards "Finanzas" del artifact "Pantallas FoS"). El título es el club, con "Cambiar de
  club" al lado (en Finanzas el título ya dice qué club es). Debajo, una guía de una línea (qué se toca) que se cierra y no vuelve
  (`localStorage` `finGuiaCerrada`). La tarjeta de ejercicios termina con la vista en palabras ("Montos en USD, nominales, formato
  simplificado", leída de los botones activos, sin un estado propio) y "Más opciones", que abre el panel con la moneda (que ya
  no está en el header, en ningún ancho), nominal/inflación y el formato. Con `?multi=0` no hay tarjeta y el panel queda abierto.
  El aviso del documento va compacto. Debajo de los KPIs ("Intereses y otros", no "Int."), un índice fijo de la página (Evolución,
  Estado de resultados, Deuda, En otra liga, Fuentes) que marca la sección que se lee y salta sin escribir el #ancla en la URL.
  OJO: las reglas del menú del teléfono van con `#mainNav`, nunca con `nav` a secas: el índice también es un `<nav>`.
- INICIO (mockup: artifact de Design "Pantallas FoS"). Arriba, qué es el sitio (el conteo
  "N clubes · N países · N ejercicios" sale de `data/club-index.js`) y el BUSCADOR como acción principal: tocarlo abre el selector con
  lo tipeado (`CLUB_SELECTOR.open(q)`) y al elegir se cae en Finanzas; abajo del buscador, "Probá con" (el 1 del mundo, el 1 de América
  y la primera liga destacada: salen de los rankings, no están escritos a mano) y "Comparar dos clubes o ligas". Después, las tarjetas
  de ranking (`.vid-card`, `js/liga.js`, sin Chart.js): "Los que más facturan" (el mundo y América, top 10, de
  `data/rankings/_regiones.js`) y "Quién factura más en cada liga" (top 5 de cada entrada de `data/destacados.js`, con "N de M" y la
  pastilla de "sin desglosar" si pasa el 10%). Cada fila lleva a Finanzas de ese club. Al pie, tres reglas del dato.
  LOS RANKINGS POR REGIÓN: los escribe `tools/generate-rankings.js` (lo corren `cargar.mjs` y `alta-club.mjs`; `audit.js` lo chequea
  como P1), así que se actualizan con cada carga. Un solo ejercicio por ranking, nunca años mezclados (pedido de Guido): el de más
  clubes, y a igual cantidad el más reciente; un presupuesto solo no entra. La tarjeta es el lenguaje visual de Inicio, Ligas y
  Finanzas: blanco sobre `--bg`, borde fino, radio 14, barras horizontales con el punto del color de cada club (en el teléfono la
  barra baja a una segunda línea). Inicio se ve IGUAL haya club elegido o no, y NINGÚN `data/<país>/<club>-data.js` se carga para
  dibujarlo. Las cinco pestañas (Inicio, Comparar, Ligas, Finanzas, Mi Cuenta) se ven con club o sin club; la pestaña Fuentes no existe más (repetía la tarjeta Fuentes de Finanzas y la página pública `fuentes/<club>.html`). El club queda en
  `localStorage` y las visitas siguientes entran derecho a él.
- COMPARAR. **Dos cards, A y B, y cada uno es un
  LADO. Un lado es una SUMA DE BLOQUES**, y cada bloque tiene su propio agregador:

      { kind:'liga',   league:'ar-primera', years:[2025],             agg:'promedio'|'suma' }
      { kind:'clubes', pares:[['boca-ar',2025], ['river-ar',null]],         agg:'promedio'|'suma' }

  De ahí sale el caso que lo motivó, de Guido: "promedio de clubes colombianos +
  sumatoria de 6 clubes brasileros" contra Real Madrid. Los cards se llenan con el
  MISMO modal, que para este camino gana un paso 4 ("¿qué querés medir?": Ligas /
  Clubes / Mezcla — las dos primeras son atajos de un bloque, la mezcla es el
  modelo completo). `año === null` es "el ejercicio más reciente de ESE club"; en un
  bloque de liga el año NO puede ser null, define quiénes la integraban.
  Desde el to-do 23 la pantalla se lee como Finanzas: ver la sección
  "Comparar con el diseño de Finanzas" de arriba. Los números salen de
  `computeYearGeneric()`, el motor real. Vive todo en `js/selector.js`:
  `js/comparar-clubes.js` se borró en la Versión 152.
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
  OJO, SE SUBE EN DOS LUGARES: `window.ASSET_V` es una constante
  inline, pero los `?v=` de los `<script src>` estáticos son LITERALES y no salen
  de ella, solo los 2 cargadores dinámicos (`loadClubData()`, `I18N.load()`) la
  leen. Hay que cambiar la constante Y los tags. Subir uno solo es peor que no
  subir ninguno: mezcla archivos nuevos con archivos viejos de la caché, que es
  el estado en el que el sitio tira `ReferenceError` (pasó al migrar los `fx`: llegó un
  `currency-map.js` cacheado sin `fxMetaFor()` mientras `finanzas-calc.js` ya lo llamaba, y
  la página entera falló). Lo chequea `node tools/audit.js` (`asset-v-desfasado`, P1):
  compara la constante contra cada tag.
- BRANDING: RESUELTO en la Versión 117 (decisión de Guido). La marca es distinta
  por idioma, a propósito: "El deporte en Números" en castellano, "Finance of
  Sports" en inglés (clave `site.name`, `data/lang/en.js`), que es además el
  dominio. Antes decía "Tu club en números", que ya no era cierto: el sitio dejó
  de ser solo de fútbol de clubes argentinos hace rato. El mail del formulario de
  contacto dejó de ser el placeholder `contacto@bocaennumeros.example` en la
  Versión 167: hoy el mailto va a `guidomamone91@gmail.com`.


---

## Registro público de correcciones: cómo es y qué no romper

- **De dónde sale.** `node tools/generar-correcciones.mjs` lo escribe en `data/correcciones/` (`correcciones.json`, uno por país `<iso2>.json` aunque no
  tenga eventos, y `correcciones.csv`) desde el historial de git de los `-data.js`. Nunca a mano. Qué cuenta, el motivo (trailer `Corrige:` o línea de
  `Admin/registros/correcciones.jsonl`; sin ninguno, «Motivo no registrado», jamás un asunto de commit) y `registro_desde`: cabecera de la tool y
  `Admin/mediciones/247-plan.md`. La caché (`Generados/.cache-correcciones.json`, gitignoreada) se reconstruye sola en ~25 s.
- **Dónde se ve.** `correcciones.html` (página propia, filtros por club, país, tipo y ejercicio, `?club=<id>`, por defecto solo «desde el registro»;
  la casilla suma lo anterior, marcado «anterior al registro»); el bloque «Correcciones a estos números» en Finanzas, debajo de «Quién auditó» (los 5
  eventos más nuevos del club; nunca se esconde con un club elegido: sin eventos dice «Sin correcciones desde <fecha>», y solo se esconde si el archivo
  del país no cargó); y un punto dorado en la tarjeta de un ejercicio con correcciones (con su `title`; la tarjeta es un botón, así que no lleva link).
- **Un solo código.** `js/correcciones.js` (`FIN_CORRECCIONES`) arma el resumen, el detalle y los textos para la página y para Finanzas; la página
  solo trae los filtros. Los importes van en millones de la moneda del club; el sha es corto y sin link (el repo es privado). El motivo sale en el
  idioma de la página (`motivo_en` si existe, si no el español).
- **Antes de tocar:** una clave nueva de texto va en `data/lang/en.js` (`corr.*`). El generador va en `tools/generadores.mjs` y `audit.js` lo vigila como P2
  (`correcciones-desfasado`, `correccion-sin-motivo`): P2 y no P1 porque el commit que corrige un dato deja el registro un commit atrás hasta el próximo regenerado.

## Trampas del navegador de preview

Cómo se verifica una pantalla y las trampas del navegador de preview: skill `producto-y-pantalla-finance-of-sports`, `referencia/navegador-de-preview.md`.
