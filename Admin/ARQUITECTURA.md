# Arquitectura: archivos del proyecto y modelo de datos

Referencia técnica de cómo está armado el sitio: qué hace cada archivo, y cómo
funciona el motor genérico que calcula Finanzas para todos los clubes.

Antes vivía dentro del comentario de `index.html`. Se movió acá en la Versión
114: es referencia que se consulta cuando hace falta (al tocar el motor, al
agregar un club), no contexto que haga falta leer para retomar el proyecto.

Para el estado del proyecto ver `Admin/ESTADO.md`, y para la to-do list `Admin/TODO.md`.
Para las reglas vigentes de UI/datos, ver `Admin/CONVENCIONES.md`.

---

ARCHIVOS DEL PROYECTO (todos en finance-of-sports/, salvo que se diga otra cosa)
- index.html: HTML y el <script> principal con toda la lógica de render. Desde
  la Versión 102, TODOS los datos de club (Boca incluida) viven en su propio
  data/<club>-data.js, ninguno inline acá. Desde la Versión 238, el CSS tampoco
  vive acá: está en js/styles.css, referenciado con un <link> que lleva el
  mismo `?v=` que los <script src> propios.
- ASSET_V (`window.ASSET_V`, declarado en un `<script>` inline en index.html
  justo antes de los `<script src>` propios, Versión 115): la versión de los
  assets propios, para invalidar el caché del navegador en cada deploy. Los
  `?v=` de los `<script src>` ESTÁTICOS (los de index.html y los que arma
  `tools/generate-fuentes-page.js`) son LITERALES, no leen la constante — hay
  que cambiar el número Y cada tag a mano. Solo 2 cargadores DINÁMICOS la leen
  de verdad: `loadClubData()` (el `data/<club>-data.js` que se inyecta al
  elegir un club) e `I18N.load()` (el `data/lang/<code>.js` del idioma
  elegido). Cambiar uno de los dos lugares sin el otro es PEOR que no cambiar
  ninguno: el navegador termina mezclando un archivo nuevo con otros viejos
  de su propio caché (pasó de verdad, ver CLAUDE.md, sección "Gotchas de
  tooling", para el bug real que costó). `node tools/audit.js` lo chequea
  como `asset-v-desfasado` (P1). Subir ASSET_V también desactualiza las 42
  páginas de `fuentes.html`/`fuentes/<clubId>.html` (ese generador LEE el
  ASSET_V de `index.html`), así que después de subirlo hay que correr
  `tools/generate-fuentes-page.js` de nuevo aunque no se haya tocado un solo
  dato de ningún club.
- data/clubs.js: identidad de cada club (clubs{}), de dónde sale cada
  número con su nivel de confiabilidad (sources{}: primary / secondary_press
  / placeholder), gestiones por club (gestionesByClub{}), socios por club
  (memberCountByClub{}).
- data/category-map.js: la taxonomía compartida de categorías de
  ingreso/gasto (REVENUE_CATEGORIES, EXPENSE_CATEGORIES), usada en vivo por
  TODOS los clubes (Boca incluida desde la Versión 102) vía `normalizedCategory`
  en cada línea de revenueLines/expenseLines. `categoryMapByClub.boca` (el
  mapeo campo-viejo -> categoría que se usó como referencia al migrar Boca) es
  documentación histórica, no se lee en vivo.
- data/currency-map.js: CURRENCY_META, la tabla de moneda nativa -> {scale,
  unitSuffix} que generaliza el toggle de moneda a cualquier país (Versión
  103). Leé el comentario de cabecera antes de onboardear un club con una
  moneda que no sea ARS/USD/BRL/CLP/COP/PEN/EUR.
- data/leagues.js: el CATÁLOGO de la taxonomía por la que navega el selector
  jerárquico (deportes, regiones, países, ligas). NO tiene membresía
  club→liga: esa vive en data/club-leagues.js, porque la regla del archivo es
  "no existe ninguna arista club → liga sin año" (un club puede cambiar de
  categoría de un ejercicio a otro, y comparar una liga entre años necesita
  saber quién la integraba CADA año, no hoy). Ver la cabecera del archivo,
  Versión 137.
- data/club-leagues.js + data/club-leagues/<iso2>.js: `CLUB_LEAGUE_BY_YEAR`,
  la tabla (club, ejercicio) -> liga que resuelve esa membresía.
  data/club-leagues.js (cargado eager en el `<head>`) tiene solo las reglas y
  los helpers (`clubsOfLeagueYear()` y los demás), sin un solo dato real; las
  filas viven en data/club-leagues/<iso2>.js, un archivo por país (Versión
  164), que se autoregistran con `Object.assign` en la misma tabla y se
  bajan LAZY, recién al abrir el selector (js/selector.js es su único
  consumidor). Se editan a mano, ningún generador los toca; `null` en una
  fila significa "todavía nadie lo verificó" y `node tools/audit.js` cuenta
  cuántas quedan así.
- data/rankings/<liga>.js: el ranking de ingresos de una liga en UN ejercicio
  (siempre (liga, ejercicio), nunca (liga) sola), precalculado por
  tools/generate-rankings.js con el motor real (`computeYearGeneric()` +
  `simplifiedReportForClub()`, nunca reimplementado) para no tener que bajar
  los data/<club>-data.js de toda una liga en vivo. Un archivo por liga
  (Versión 182), 1-3,4 KB gzip cada uno. Alimenta la pestaña Ligas
  (js/liga.js) y los rankings curados de Inicio (data/destacados.js).
  `node tools/generate-rankings.js --check` avisa si quedó viejo (y
  `tools/audit.js` lo corre solo, como P1); `--print` imprime los rankings
  para verificarlos contra la fuente.
- data/destacados.js: qué rankings de liga muestra Inicio. Lista CURADA A
  MANO (hasta 10, criterio editorial — un ranking de 1 club no cuenta, pero
  esa frontera no es una regla automática por cantidad de clubes cargados) —
  ningún generador la toca. `node tools/audit.js` sí chequea que cada entrada
  tenga su data/rankings/<liga>.js correspondiente (`destacado-sin-ranking`,
  P1), para que un club borrado o una membresía que cambia no deje un
  ranking de 1 en la portada sin avisar.
- data/river-data.js, data/racing-data.js: datos de esos dos clubes
  (ingresos/gastos por línea, mercado de pases, resultados deportivos,
  títulos), cada uno con comentarios explicando qué es real y qué es
  placeholder.
- js/selector.js: ELEGIR Y COMPARAR, que desde la Versión 152 son lo mismo y
  viven juntos (93 KB, el archivo más grande de `js/`). Tres cosas adentro:
  (1) el MODAL PASO A PASO que reemplazó al panel de 5 columnas — Deporte →
  Región → País → [¿qué querés medir?] → cuál(es) → año y agregador — más el
  buscador, que encuentra clubes Y ligas; (2) LOS DOS CARDS de la pestaña
  Comparar, donde cada card es un LADO y un lado es una SUMA DE BLOQUES
  (`{kind:'liga', league, years[], agg}` o `{kind:'clubes', pares[], agg}`),
  cada bloque con su propio agregador; (3) EL CÁLCULO de esos lados, que
  siempre pasa por `computeYearGeneric()` — la cascada del resultado no se
  reimplementa nunca por afuera. Se alimenta solo de `clubs.js` +
  `club-index.js` + `leagues.js` + `club-leagues/<iso2>.js` (estos últimos lazy,
  se bajan al abrir el modal): dibuja todos los clubes cargados (161 al
  2026-09-26) sin bajar un solo `data/<club>-data.js`, y recién baja los que
  hagan falta al apretar "Comparar". La explicación larga del modelo está en
  `Prototyping/Selector/MERGE-A-PRODUCCION.md`, secciones 0, 3 y 5.
  `js/comparar-clubes.js` (la bandeja de chips de la Versión 137) ya no existe:
  se borró en la Versión 152 y lo que hacía mejor está acá adentro.
- js/liga.js: la pestaña LIGAS — el ranking de ingresos de los clubes de una
  liga en UN ejercicio (la misma regla que data/club-leagues.js: nunca "la
  liga" sola), con su propio selector de ejercicio. El default NO es el año
  más reciente sino el que tiene MÁS clubes cargados, porque los balances
  tardan en publicarse y el ejercicio más nuevo es siempre el más flaco. Lee
  data/rankings/<liga>.js directo, no baja ningún data/<club>-data.js. Barras
  de un solo color y no apiladas (decisión de Guido, 2026-09-22: buena parte
  de cada barra sería "sin desglosar por la fuente", y algunos clubes reportan
  un segmento NEGATIVO), orden ascendente en el gráfico y descendente (por
  puesto) en la tabla — el orden es decisión de la vista, el dato guardado
  siempre está descendente. Versión 183, to-do 23(c).
- js/i18n.js + data/lang/<code>.js + data/lang/langs.js: el motor de
  traducción del sitio (Versión 115). El CASTELLANO NO TIENE ARCHIVO DE
  DICCIONARIO, a propósito: el HTML ya está escrito en castellano y `apply()`
  guarda ese texto como valor "es" la primera vez que corre, así que el
  castellano no se puede desincronizar del HTML (ES el HTML), y una clave que
  falta en otro idioma cae de vuelta al castellano en vez de mostrarse en
  blanco o cruda. Agregar un idioma nuevo son 2 pasos que no tocan este
  archivo ni index.html: crear data/lang/<code>.js (mismo patrón que
  data/lang/en.js) y sumar una entrada a `LANGS` en data/lang/langs.js — el
  archivo del idioma se inyecta por convención, igual que `loadClubData()`
  hace con los data files de club. Los rubros textuales de un balance
  (`rawLabel`, "Formato del club") NUNCA se traducen — sería inventar un dato
  que el documento no dice; los buckets de "Formato simplificado" (ver
  data/site-labels.js) sí, porque son categorías que inventó el sitio.
- fuentes/README.md: ÍNDICE DE PAÍSES (desde la sesión 2026-09-20; antes era
  una línea por club, y antes de la 2026-09-13 tenía todo el contenido inline —
  cada nivel dejó de escalar a su turno). Una línea por país con cuántos clubes
  trackea, cuántos tienen documento encontrado y la fecha del chequeo más viejo,
  linkeando a `fuentes/_indice/<País>.md`, que tiene una línea por club, que a su
  vez linkea a `fuentes/<País>/<Club>.md`, donde vive el contenido real (links a
  documentos oficiales, notas de prensa, qué se probó y qué falta). Revisar el
  índice del país antes de asumir que no hay fuentes nuevas para un club. El
  archivo por país es además lo que permite sourcear dos países en paralelo sin
  conflictos de merge. Su sección "Índice de países" (la línea de cada país
  con sus 3 números) la GENERA `node tools/generate-fuentes-index.js` desde
  los propios `fuentes/_indice/<País>.md` — no se edita a mano. "Cuántos
  clubes con documento encontrado" no es un campo estructurado, es prosa
  libre que escribe el agente de sourcing, así que el script la infiere con
  dos listas de regex (señales de sí / señales de no); si una línea matchea
  las dos listas o ninguna, el script ABORTA en vez de adivinar y la
  excepción se resuelve a mano y se anota en `OVERRIDES`, adentro del script,
  con el motivo. `--check` avisa si el índice quedó viejo, `--debug` imprime
  la clasificación club por club.
- fuentes.html + fuentes/<clubId>.html (41, una por club) + sitemap.xml: el
  listado PÚBLICO de documentos fuente del sitio (distinto de
  `fuentes/README.md`, que es el índice INTERNO de sourcing por país) —
  columnas País, Equipo, Fuente y Notas. En Notas va `publicNote` (escrita
  para un lector) más las salvedades que deriva `sourceCaveats()`; NUNCA
  `note`, que es la nota interna que una sesión le deja a la siguiente —
  se publicó por error hasta la Versión 126. Página propia y no una pestaña
  de index.html a propósito (decisión de Guido): es rankeable, el crawler no
  depende de JS para verla, e index.html no crece una fila por documento a
  medida que el sitio escala a cientos de clubes. GENERADOS por
  `node tools/generate-fuentes-page.js` desde `data/clubs.js` (`sources{}`)
  + `data/sources-view.js` — no se editan a mano. `--check` avisa si
  quedaron viejos (`checkGenerados()`, P1 en `tools/audit.js`), y el
  generador borra solas las páginas de club huérfanas (ningún club las
  reclama ya). Este es también el generador que hay que correr después de
  subir ASSET_V (ver arriba), porque lee esa constante de `index.html`.
- Admin/CHANGELOG.md: resumen corto (unas pocas líneas) de qué cambió en cada
  versión. Empezar acá para "¿cuándo se cargó/cambió tal cosa?".
- Admin/finance-of-sports-project.md (misma carpeta que este HTML): historia narrativa
  completa versión por versión, desde el MVP original de Boca — el "por
  qué" detrás de cualquier entrada de Admin/CHANGELOG.md que lo amerite.
  Lectura opcional para contexto profundo, no necesaria para retomar.
- Clubes/<País>/<Club>/: TODOS los PDFs fuente (balances, presupuestos,
  memorias) Y sus transcripciones a Markdown, juntos en la misma carpeta,
  hoy Clubes/Argentina/Boca/, Clubes/Argentina/River/ (con la subcarpeta
  estados-contables-leads/ para el PDF+extract de fuente no oficial, que desde
  el 2026-09-17 está en .gitignore: existe en la máquina, no viaja al repo,
  porque el repo se deploya entero y ese documento no es del dominio del club),
  Clubes/Argentina/Racing/. País y club van capitalizados (Argentina, Boca,
  River, Racing), a diferencia de los `clubId` del código (minúscula). Regla
  desde la Versión 28: reemplazó el esquema anterior de dos árboles
  paralelos, PDFs/<país>/<club>/ + pdf-extracts/<país>/<club>/ (ese esquema
  nació en la Versión 17, reemplazando a su vez las carpetas sueltas
  racing-pdfs/ y river-pdfs/). Guido pidió el PDF y su transcripción uno al
  lado del otro, no en dos carpetas separadas. Ver CLAUDE.md, sección
  "Estructura de carpetas de documentos fuente". Regla desde la Versión 14
  sigue vigente: todo PDF nuevo se transcribe a un .md ACÁ MISMO (junto al
  PDF) ANTES de extraer datos, ver CLAUDE.md, sección "Cada PDF nuevo:
  transcribirlo a Markdown ANTES de usarlo". Para iterar sobre
  formato/reclasificación de un documento ya cargado, usar el .md, no
  reabrir el PDF (son escaneos, salen caros en tokens leerlos de nuevo
  página por página).

MODELO DE DATOS: UN SOLO MOTOR GENÉRICO PARA TODOS LOS CLUBES (desde la Versión 102)
- CÁLCULO: TODOS los clubes, Boca incluida, pasan por computeYearGeneric(clubId,
  year) (buscar "MULTI-CLUB" en el <script>), sobre listas de líneas {rawLabel,
  normalizedCategory, amountNative, disclosureLevel} (revenueLinesByYear/
  expenseLinesByYear, ver data/<club>-data.js), porque cada club reporta una
  cantidad distinta de rubros reales. Boca ya NO tiene un yearsRaw{}/computeYear()
  propio (migración completa: ver comentario de cabecera de data/boca-data.js para
  el detalle de cómo se reconcilió su balance 2025, que hasta esa migración vivía
  en DOS estructuras paralelas sin cruzar entre sí). Estas funciones alimentan los
  KPIs de arriba de Finanzas, los gráficos, "Comparar Gestiones" y verifyTieOuts().
- DISPLAY: la tabla "Estado de resultados" usa una sola función,
  renderNativePLTable(clubId, year, curLabel, containerId), que llama a
  nativeReportFor(clubId, year) para armar {ingresos, gastos, extraRows,
  resultLabel} con las categorías REALES de ese club/ejercicio (no un set fijo de
  9) y las pinta como dos acordeones (Ingresos, Gastos) con subtotal cada uno +
  filas sueltas + resultado final. nativeReportFor() lee directo
  cur.revenueLines/cur.expenseLines (rawLabel tal cual la fuente), para
  CUALQUIER club — ya no hay ramas especiales por club. OJO bug ya encontrado y
  corregido: como "gastos" lista TODAS las expenseLines sin filtrar, no hay que
  sumarle además cur.nonCash ni cur.exceptionalItems (son sub-sumas de esas
  mismas líneas por normalizedCategory) — pasó con River, que categoriza líneas
  propias de amortización/depreciación, y sumaba doble. profitOnPlayerSales/
  assetSales/netInterest/tax sí vienen de otro lado (fiscalYearMeta) y no se
  duplican.
- yearMetaFor(clubId, year) / toDisplayValue(...): para CUALQUIER club. Cada
  ejercicio tiene una "moneda nativa" declarada en <club>FiscalYearMeta[year]
  (currency/fx) — placeholder en USD (FX_RATE=1450 placeholder) o ARS reales con
  el tipo de cambio que el propio documento declara (ej. Boca 2027: $1.660,
  promedio del propio presupuesto; Boca 2025: $1.203, tipo de cambio de CIERRE
  del ejercicio, no un promedio, ver comentario en bocaFiscalYearMeta sobre por
  qué). La conversión a la moneda que se muestra en pantalla pasa SIEMPRE en el
  momento de renderizar, nunca al cargar el dato. ERROR YA COMETIDO Y CORREGIDO
  UNA VEZ: no guardar un valor pre-convertido con un tipo de cambio y
  reconvertirlo después con otro.
- El toggle de moneda vive DENTRO del header (aplica a Inicio y Finanzas) y muestra
  [moneda nativa del club / USD] para CUALQUIER club (Versión 103, ver
  `populateCurrencyToggle()` en el <script> y el comentario de cabecera de
  `data/currency-map.js` para el modelo completo — `CURRENCY_META` por código ISO,
  USD siempre como pivote). Un club cuyo `reportingCurrency` ya es 'USD' (ej.
  Ecuador) no tiene nada que togglear, el toggle se esconde entero para ese caso.
  "Formato del club"/"Formato simplificado" (`simplifyToggleWrap`) es un toggle
  DISTINTO, ya desacoplado de la moneda/país (antes compartían el mismo gate por
  error): siempre visible para cualquier club, porque depende de `normalizedCategory`
  en las líneas, no de qué moneda reporta el club. El botón CTA de Premium
  (premiumCtaBtn) se SACÓ en la Versión 30, prometía como feature paga algo que el
  toggle "Formato simplificado" (Versión 29) ya hace gratis; Guido pidió sacarlo
  en vez de dejarlo diciendo algo falso.
- Verificación automática: verifyTieOuts() corre sola al cargar el sitio y
  compara, por consola del navegador, la suma de rubros contra el total oficial
  conocido de cada club-ejercicio. Un solo loop itera `window.CLUB_GENERIC_DATA`
  leyendo officialTotalRevenue/officialTotalExpenses/officialPAT de cada
  `fiscalYearMeta[year]` — agregar un club o ejercicio nuevo con total conocido
  significa sumar esos 3 campos en su propio data/<club>-data.js, no tocar esta
  función.


## Finanzas para cualquier club: arquitectura que escriben `cargar.mjs` y `alta-club.mjs`

Venía del skill `club-or-year-onboarding` (Versión 471), sin cambios de texto. Sirve al tocar el motor de Finanzas o los scripts de carga.

Las referencias "sección N" dentro del texto son a las secciones del skill viejo (buscá "ex §N"): §2, §3 y §11 están en `Admin/ARQUITECTURA.md`; §4-8, §10 y §12-14 en `Admin/PANTALLA.md`; color de marca, escudo y liga de un club nuevo en `.claude/skills/club-or-year-onboarding/club-nuevo.md`; §15 en `Admin/CONVENCIONES.md`; el skill viejo entero, en `Admin/Archive/club-or-year-onboarding-hasta-V470.md`.

### Arquitectura ya generalizada, no reinventar por club (ex §2)

**"Ya generalizado" no siempre significó "genérico para cualquier `clubId`"**: hasta que se
onboardeó el primer club nuevo desde que existe este motor genérico (Vélez Sarsfield), varias
funciones que parecían genéricas en realidad tenían un ternario de 2 ramas hardcodeado
(`clubId === 'river' ? X : Y`). Casi una decena de funciones (`computeYearGeneric`, `yearMetaFor`,
`reportTypeForYear`, `allYearsRangeForClub`, `presupuestoOverlayFor` en `js/finanzas-calc.js`;
`drawTrendChartGeneric`, `populateFinanzasSelectors`, `renderDataQualityBannerForCurrentSelection`
en `js/finanzas-render.js`; `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub` en
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
  `_EXPENSE_BUCKETS`: el "Formato simplificado" para CUALQUIER club (todos usan el motor genérico,
  Boca incluida), con `revenueLines`/`expenseLines` + `normalizedCategory`. Agrupa por
  `normalizedCategory` con un catch-all ("Otros ingresos" / "Otros gastos"). NO hace falta escribir
  un `simplifiedReportFor<Club>` a mano para ningún club — ese patrón existió solo para Boca
  (`simplifiedReportForBoca`) y se borró junto con el resto de su motor Boca-only. Si un club nuevo
  necesita una categoría que no está en los buckets, agregala a la lista compartida (afecta a todos
  los clubes por igual, que es lo que se quiere, buckets consistentes entre clubes es el objetivo de
  "Formato simplificado").
- **Toggle de moneda [nativa/USD], visibilidad**: `populateCurrencyToggle(clubId)` en `index.html`
  arma el toggle dinámicamente a partir de `clubs[clubId].reportingCurrency` — un club nuevo lo
  hereda automático con solo tener `reportingCurrency` seteado en `data/clubs.js` y sus datos en el
  formato correcto (ver bullet siguiente), no hace falta tocar `refreshAllForClub()`. Si
  `reportingCurrency` es `'USD'` (ej. Ecuador, dolarizado), el toggle se esconde entero, no hay nada
  que togglear. Ver el comentario de cabecera de `data/currency-map.js` para el modelo completo.
- **"Formato del club"/"Formato simplificado" (`simplifyToggleWrap`), visibilidad**: SIEMPRE
  visible para cualquier club, depende solo de que el club tenga `normalizedCategory` en sus líneas,
  que todos tienen desde que Boca se migró al motor genérico.
- **Para que el toggle de moneda funcione de verdad, `amountNative` tiene que estar en la moneda
  NATIVA del club** (la que declara `reportingCurrency`), no pre-convertido a USD, ver
  `club-data-mapping` sección 5. Este es el cambio de fondo que habilitó el toggle de moneda para
  cualquier club.
- **`computeYearGeneric(clubId, year)`**: agnóstico de moneda a propósito, solo suma lo que hay en
  `amountNative`, sin convertir. La conversión pasa SIEMPRE en la capa de display (funciones que
  llaman a `yearMetaFor`), nunca acá. Si tocás esta función para sumarle algo, mantené esa
  separación (no le agregues un `toDisplayValue` adentro).

### Arquitectura de archivos para un club nuevo, no negociable por sesión (ex §3)

Hasta que `index.html` se separó en archivos por club, todos los datos vivían mezclados en un único
`<script>` de miles de líneas, y River/Racing se bajaban siempre aunque el visitante solo mirara
Boca. Lo que sigue es la estructura VIGENTE desde el día uno para cualquier club nuevo, no una
limpieza de una sola vez:

- **Datos del club, en su propio `data/<club>-data.js`.** Mismo patrón que ya tienen
  `data/river-data.js`/`data/racing-data.js`/`data/boca-data.js`: `<club>RevenueLinesByYear`,
  `<club>ExpenseLinesByYear`, `<club>FiscalYearMeta`, `<club>PasesData`, `<club>ResultadosData`,
  `<club>TitulosData`. NUNCA pegues los datos de un club nuevo inline en el `<script>` de
  index.html, ni en `js/finanzas-calc.js`/`js/finanzas-render.js` (esos dos archivos son solo
  funciones, cero datos de un club puntual).
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
  sesión en la que la usás por primera vez, no lo dejes para después: `category-map.js` quedó
  desincronizado varias versiones porque nadie sumó a tiempo `player_sales` (usado en
  `racing-data.js` desde temprano) a `REVENUE_CATEGORIES`/`REVENUE_CATEGORY_LABELS` — simplemente
  nadie lo agregó en el momento. Si además agregás la categoría a
  `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS` (en `js/finanzas-calc.js`), usá el nombre
  nuevo directo, sin dejar un alias del nombre viejo/temporal que probaste primero.
- **Las filas de Ingresos, y cómo categorizar un club nuevo.** Son: Cuotas Sociales, Comercial /
  Sponsors, **Estadio** (una sola fila con `matchday_competition` + `season_tickets` +
  `stadium_other`; el acordeón los separa), Televisión, Premios por competencias, Venta de
  Jugadores, **Educación** (`education`), **Otras secciones deportivas** (`other_sports` +
  `youth_football` + `womens_football`), el bolsón sin desglosar, y el catch-all **"Otros
  ingresos"**. Al mapear un club nuevo: antes de mandar una línea de colegio, polideportivo o uso
  del estadio a `other_income` por descarte, mirá esas 3 categorías — el criterio de cuál va en cuál
  está en `club-data-mapping` sección 1 y sección 13. Y si vas a tocar la fusión de abonos, el
  interruptor es `ABONOS_DENTRO_DE_ESTADIO` en `js/finanzas-calc.js`, no los datos.
- **Lazy-loading: sumar el club a la carga bajo demanda, NUNCA al `<head>` fijo.** El archivo
  `data/<club>-data.js` NO va en la lista de `<script src>` del `<head>` de index.html (esa lista
  solo tiene `clubs.js`/`category-map.js`/`boca-data.js`/`js/finanzas-calc.js`/
  `js/finanzas-render.js`, porque Boca es el club default). En cambio:
  1. Nada que tocar en index.html para esto: `loadClubData(clubId)` construye el path directo,
     `'data/' + clubId + '-data.js'`, sin ningún mapa central que mantener a mano (con 1000 clubes
     de destino, un mapa así se vuelve un artefacto de cientos/miles de líneas y una fuente segura
     de typos/colisiones entre agentes en paralelo). Con que tu archivo se llame así (que ya es la
     convención de TODOS los clubes cargados hasta ahora, sin excepción), alcanza —
     `loadClubData` ya sabe inyectar el `<script>` la primera vez que alguien elige ese club en
     `clubSelect`. Si alguna vez un club necesita un nombre de archivo distinto por algún motivo
     real, agregá una entrada a `CLUB_DATA_SCRIPT_OVERRIDE` (cerca de `loadClubData`, en
     index.html) en vez de volver al mapa completo.
  1b. Sumá la entrada de identidad del club a `clubs{}` en `data/clubs.js` (`id`/`name`/
     `displayName`/`country`/`reportingCurrency`/`fiscalYearStart`/`sport`/`brandColor`, copiá el
     shape de cualquier club ya cargado). `displayName` es el nombre CORTO que se muestra en el
     dropdown del header — es OBLIGATORIO, `populateClubSelect()` (index.html) arma el `<option>`
     de cada club a partir de este campo y ordena alfabéticamente por él; si falta, tira
     `TypeError` al armar el dropdown para TODOS los clubes, no solo el nuevo. El dropdown en sí ya
     NO se edita a mano (antes sí, ver comentario de `#clubSelect` en index.html). ÚNICO campo que
     sigue siendo centralizado en `data/clubs.js` — hace falta ANTES de elegir ningún club (el
     dropdown se arma al cargar la página), así que no puede autoregistrarse desde un archivo que
     todavía no se pidió, a diferencia de todo lo del punto 1c.

     **`brandColor`**: el procedimiento para un club nuevo está en `.claude/skills/club-or-year-onboarding/club-nuevo.md` (ex §3, punto 1b).
  1c. `sources{}`/`gestionesByClub{}`/`memberCountByClub{}` NO se tocan en `data/clubs.js` — se
     autoregistran al final de tu propio `data/<club>-data.js`, mismo momento que el registro en
     `CLUB_GENERIC_DATA` (punto 2 de abajo), copiando el patrón de cualquier club ya cargado como
     plantilla:
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

     `gestionesByClub.<club>` YA NO ES ESTRICTAMENTE NECESARIO agregarlo con contenido real: el
     toggle "Por gestión" de Finanzas está oculto, y `renderInicioStats()`/`currentGestionKey()` ya
     degradan solos a "Sin dato" si `gestionesByClub[clubId]` no existe o está vacío, en vez de
     tirar `TypeError` como pasaba antes (ver sección 16 para el detalle completo de este fix).
     Sigue siendo mejor agregar una entrada real cuando SE CONOCE la gestión/presidencia (clubes
     argentinos con historia conocida), pero para un club nuevo sin esa info confirmada (la mayoría
     de los clubes fuera de Argentina onboardeados hasta ahora) ya no hace falta inventar una
     entrada sintética "Gestión actual" solo para evitar un crash — podés dejarlo sin tocar
     directamente.
  2. `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub` (index.html) NO necesitan
     ningún cambio manual: leen `CLUB_GENERIC_DATA[clubId].pasesData` (etc.) directo, y tu
     `data/<club>-data.js` ya se autorregistra ahí (`window.CLUB_GENERIC_DATA.<club> = {...}`, ver
     el final de cualquier archivo de club ya cargado como plantilla) — con eso alcanza.
  3. `verifyTieOuts()` tampoco necesita ningún cambio manual: itera solo
     `Object.keys(window.CLUB_GENERIC_DATA)`, así que agregar tu club a ese registro (punto 2) ya
     alcanza para que se verifique. Lo único que hace falta es que cada año de tu
     `<club>FiscalYearMeta[year]` tenga `officialTotalRevenue`/`officialTotalExpenses` (ya hacía
     falta antes, para otras cuentas) y, si el ejercicio tiene un balance auditado real (no un
     presupuesto puro), también `officialPAT` (el "Superávit/Déficit del ejercicio" impreso) — sin
     ese 3er campo, ese año simplemente no suma el check de Resultado neto, mismo criterio que un
     presupuesto sin balance (ver Racing 2019/2026/2027 como ejemplo).
  4. Si el club nuevo pasa a ser el DEFAULT en vez de Boca (poco probable, pero por si acaso): recién
     ahí su `data/<club>-data.js` sí va al `<head>` como `<script src>` fijo, sacándolo de
     `CLUB_DATA_SCRIPT_SRC`, mismo criterio que hoy tiene Boca.
- **Nunca armes un objeto `{ river: X, racing: Y, <club>: Z }` de una sola vez para indexarlo
  después por `clubId`.** Un objeto así evalúa TODAS sus propiedades al crearse — con lazy-loading,
  eso lee la variable global del club que el visitante NO eligió, que puede no estar cargada
  todavía, y tira `ReferenceError` (pasó en `drawTrendChartGeneric`/`populateFinanzasSelectors`, con
  `{ river: riverFiscalYearMeta, racing: racingFiscalYearMeta }`). Usá siempre un ternario
  (`clubId === 'river' ? riverX : clubId === 'racing' ? racingX : <club>X`) o una función que reciba
  `clubId` y solo lea el global adentro (como `pasesDataForClub`, punto 2 arriba): las dos formas
  solo evalúan la rama que efectivamente hace falta, nunca las otras. Si al agregar un club nuevo
  encontrás un objeto de este tipo en el código (buscá `river:` seguido de `racing:` en la misma
  línea/bloque), convertilo ANTES de sumarle una tercera rama, no repliques el patrón viejo.
- **Verificación obligatoria en el navegador, no alcanza con que el código "se vea bien":** con
  Network abierto, cargar la página de cero y confirmar que `data/<club>-data.js` NO aparece en la
  lista (solo `clubs.js`/`category-map.js`/`boca-data.js`/los 2 `js/finanzas-*.js`); elegir el club
  nuevo y confirmar que ahí SÍ aparece un único GET 200; volver a Boca y de nuevo al club nuevo, y
  confirmar que esta vez NO se vuelve a pedir (debe quedar cacheado en `clubDataLoaded`). Un
  `window.addEventListener('error', ...)` propio durante ese ciclo (en vez de solo leer la consola
  acumulada) es más confiable para no dejar pasar un `ReferenceError` real (ver
  `Admin/finance-of-sports-project.md` para el detalle de los 2 bugs reales que este chequeo agarró).

### Ejercicio con Presupuesto Y Balance reales a la vez: overlay + columna "Balance" (ex §11)

REGLA PERMANENTE, pedido explícito de Guido: "muchos años de racing tienen ambos presupuesto y
balance, porque racing tiene de todo en la pagina... para cuando un mismo año tenga both presupuesto
y balance, en estado de resultado agregá una columna que sea Balance".

**Decisión de arquitectura (confirmada con Guido antes de construir, vía `AskUserQuestion`)**:
- El **Balance real es SIEMPRE el dato primario** de un ejercicio dual: KPIs de arriba de Finanzas,
  Formato Simplificado, y los checks de `verifyTieOuts()` salen del balance, nunca del overlay de
  presupuesto. Mismo criterio que ya regía para cualquier ejercicio de balance real (sin sufijo en
  el dropdown = "lo normal").
- La columna "Ejercicio Anterior"/Var./Var. % que comparaba el año actual contra OTRO año se sacó
  del TODO (de los 3 clubes, los 2 modos Año a año/Por gestión). Esa infraestructura (2da columna +
  Var./Var. %, `buildNativeSectionHtml`) se REUTILIZÓ para la comparación Presupuesto-vs-Balance del
  MISMO ejercicio, no se reconstruyó de cero.

**Cómo cargar un ejercicio dual, paso a paso:**
1. El balance real va en los lugares de siempre: `racing{Revenue,Expense}LinesByYear[year]` +
   `racingFiscalYearMeta[year]`, con `reportType:'official_budget_and_balance'` (no
   `'official_balance_sheet'`, ese reportType queda solo para ejercicios que NO tienen presupuesto
   propio cargado). Seguí `club-data-mapping/SKILL.md` para categorizar sus líneas, igual que
   cualquier balance.
2. El presupuesto de ESE MISMO ejercicio va en `racingPresupuestoOverlayByYear[year]`: `{
   revenueLines, expenseLines, currency, fx, sourceId }`, mismo formato `{rawLabel,
   normalizedCategory, amountNative, items?}` que las líneas normales. `normalizedCategory` en el
   overlay no participa de ningún cálculo (no hay Formato Simplificado del overlay todavía, ver
   limitación abajo), pero cargalo igual por consistencia y por si se extiende a futuro.
3. NO hace falta tocar `js/finanzas-calc.js` ni `js/finanzas-render.js`: `presupuestoOverlayFor()`
   ya lee `racingPresupuestoOverlayByYear[year]` automáticamente en cuanto tiene una entrada, y
   `renderNativePLTable()`/`ejercicioLabel()`/`anioDropdownSuffix()` ya reaccionan solos al
   `reportType:'official_budget_and_balance'`.
4. Verificar en el navegador (no opcional, mismo criterio de siempre): la columna "Balance" pasa a
   mostrar el nombre correcto ("Balance AAAA/AAAA"), la columna "Presupuesto" aparece con los montos
   del overlay convertidos con SU PROPIO `fx` (no el del balance), el dropdown "Año" dice
   "(Presupuesto y Balance)", y los KPIs de arriba siguen dando los números del BALANCE (no una
   mezcla ni el overlay).

**En "Formato Simplificado", el overlay se agrupa con el mismo `bucketize()`/
`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS` que ya agrupa la columna primaria**
(`presupuestoOverlayReportFor()` chequea `simplifyFormat` y bucketiza en vez de devolver
`rawLabel`s crudos siempre) — sin esto, la primera carga real (Guido: "no quedó bien racing. porque
presupuesto tiene un 0 en todo salvo el total?") mostraba la columna Presupuesto en $0 fila por
fila, porque las dos columnas no usaban los mismos labels de bucket para emparejar filas. Como
ahora sí los usan, el emparejamiento por label funciona fila por fila, no solo en el total de
sección. `bucketize` vive en `js/finanzas-calc.js` como función compartida (no duplicada) para que
las dos columnas la usen igual.

**LIMITACIÓN QUE SIGUE VIGENTE, solo para "Formato del club"**: ahí el emparejamiento de filas
sigue siendo por `rawLabel` EXACTO (`buildNativeSectionHtml`/`findPrevVal`), porque en Formato del
club cada columna muestra las categorías TAL CUAL las reportó su propio documento (esa es la
gracia del toggle), y el balance y el presupuesto de un mismo ejercicio pueden nombrar lo mismo
distinto (ej. balance dice "Costo transferencia de jugadores", presupuesto dice "Pago por
adquisición de jugadores"). Ahí la fila no encuentra su par y muestra "—" en la columna
Presupuesto, aunque el TOTAL de la sección sí suma bien igual (no depende del matching por fila).
Esto es intencional, no un bug: forzar que Formato del club use nombres iguales entre los 2
documentos rompería la premisa de esa vista ("tal cual la fuente").

**Var./Var. % SE SACARON DE LA TABLA DEL TODO** (Guido: "var y var% deberian no estar ahi"): ya no
existen ni en "Formato del club" ni en "Formato Simplificado", para ningún club/ejercicio. La tabla
quedó en 4 columnas siempre: Rubro, Actual, % del total, y la 4ta (Presupuesto/oculta) — ver
`buildNativeSectionHtml()`/`syncPLTableColgroup()` en `js/finanzas-render.js`.

El mecanismo se verificó primero con un overlay sintético inyectado por consola (3 líneas
inventadas), antes de cargar ningún dato real: confirmó que la columna aparece, los montos
convierten con el fx propio del overlay, el header dice "Balance"/"Presupuesto" correctamente, los
KPIs de arriba siguen saliendo del balance real (no del overlay) y `verifyTieOuts()` no se ve
afectado. Ese overlay de prueba nunca se guardó en ningún archivo, era solo en memoria del navegador.


## El sitio por dentro: datos, motor y archivos (venía de `Admin/ESTADO.md`)

Texto movido sin cambios. Lo que se ve en cada pantalla está en `Admin/PANTALLA.md`.

- CONVENCIÓN DE ARCHIVOS: un club = un `data/<clubId>-data.js`, cargado bajo
  demanda por `loadClubData(clubId)` armando el path por convención. Onboardear un
  club NO requiere tocar `index.html`: alcanza con el `data/*.js` nuevo y su
  entrada en `data/clubs.js`, más correr `node tools/generate-club-index.js`.
  DESDE LA VERSIÓN 129, el `clubId` de un club NUEVO lleva el país al final
  (`nacional-uy`), porque el id nombra el archivo y prefija cada `sourceId`. Los
  41 de antes quedan como están hasta que alguno se vuelva ambiguo, y
  `tools/audit.js` avisa justo ese día. Ver `Admin/CONVENCIONES.md`.
- TAXONOMÍA DEL SELECTOR (Versión 137): `data/leagues.js` es el CATÁLOGO
  (6 deportes, 6 regiones, 8 países, 14 ligas con su escalón: los 2 segundos escalones de
  la Versión 201 (`es-segunda`, `de-2bundesliga`) más el 3° brasileño y el 2° colombiano
  de la Versión 217 (`br-serieC`, `co-primeraB`, onboarding de Volta Redonda/Unión
  Magdalena). NO tiene membresía
  a propósito, y esa es la regla de arquitectura más importante que salió de esta
  versión: NO EXISTE NINGUNA ARISTA CLUB -> LIGA SIN AÑO. La membresía vive solo
  en `data/club-leagues.js`, y sus 6 helpers de membresía son el único camino para
  preguntarla: `clubsOfLeagueYear()` para TODO agregado de liga, `leaguesOfClub()`
  para el árbol, más los de navegación. Un campo `clubs[id].league` con "la liga de
  hoy" habría sido una segunda verdad sobre el mismo hecho, y encima inútil para
  "cuánto generaba esta liga en 2022", que necesita saber quiénes la integraban ESE
  año (lo levantó Guido). En el árbol, un club aparece bajo CADA liga en la que
  tiene un ejercicio cargado: nada que actualizar por temporada, ningún campo que
  pueda mentir. `clubs{}` gana `sport`, que sí es intrínseco del club.
- LIGA POR EJERCICIO (Versión 132, partido por país en la 164):
  `data/club-leagues/<iso2>.js` dice en qué categoría
  jugó cada club en cada ejercicio, que es distinto de en cuál juega hoy
  (Mirassol 2024 es Série B y Mirassol 2025 Série A). Es un archivo aparte y no
  un campo adentro de cada club, decisión de Guido: junto se actualiza una vez
  por temporada mirando ascensos y descensos, repartido hay que acordarse de 41
  lugares. `null` significa "nadie lo verificó todavía", así que el archivo no
  puede afirmar una liga que nadie chequeó, y `node tools/audit.js` cuenta las
  que faltan. HOY: 173 de 178 verificadas, con la fuente anotada por bloque; las 5
  que faltan son 3 presupuestos (Boca 2027, Racing 2026 y 2027) y los 2 ejercicios de
  Ferro Carril Oeste (fuentes contradictorias sobre la categoría exacta, ver
  `data/club-leagues/ar.js`). CRITERIO cuando un
  ejercicio cruza dos torneos (decidido por Guido): vale la categoría al cierre,
  la misma regla que ya se usa para atribuir la gestión presidencial. Los ids del
  primer y segundo escalón argentino son `ar-primera` y `ar-primeranacional`, y
  NO el `ar-lpf` del prompt del selector: esa categoría cambió de organizador
  tres veces en el período cargado, y el id nombra el escalón, que no cambia.
  DESDE LA VERSIÓN 164 SON 6 ARCHIVOS, uno por país, cada uno autoregistrándose
  en la misma tabla, y `data/club-leagues.js` quedó con las reglas y los
  helpers, sin un dato. Dos motivos: el repaso anual de ascensos y descensos pasa
  a ser el de UN país, y las filas dejaron de bajarse en la primera visita (se
  cargan al abrir el selector, que es el único lugar del sitio que las usa).
  Hay UNA sola frontera async, `abrirModal()` de `js/selector.js`: los helpers
  siguen siendo síncronos a propósito, porque volverlos async obligaría a volver
  async cada función de render del modal.
- CUÁNTOS EQUIPOS TUVO LA LIGA (Versión 177, to-do 23(b)): `LEAGUE_SIZE_BY_YEAR`,
  (liga, ejercicio) -> número de equipos, se lee con `leagueSizeAt(liga, año)`.
  Viaja en los MISMOS `data/club-leagues/<iso2>.js` y en el mismo cargador, así
  que no agrega ni un pedido de red. Antes esto iba a ser `LEAGUES[].totalClubs`,
  un número suelto por liga: se ELIMINÓ el campo en vez de llenarlo, porque la
  cantidad de equipos cambia por temporada (la Primera argentina pasó de 20 a 30
  en el período cargado) y un solo número por liga es falso en casi todas. HOY
  hay 3 liga-temporadas verificadas contra Wikipedia, que son las 3 que habilitan
  un ranking: `jp-j1` 2025 = 20, `es-laliga` 2025 (temporada 2024/25) = 20,
  `ar-primera` 2024 = 28. El resto devuelve null y el sitio no afirma nada.
  TODAVÍA NO LA USA NINGUNA VISTA, a propósito: el consumidor (el "N de M clubes
  de esta liga tienen ejercicio cargado", o sea el aviso de sesgo del benchmark)
  es el to-do 23(c)/33. Con los datos de hoy daría 8 de 28, 9 de 20 y 10 de 20.
- ÍNDICE LIVIANO DE CLUBES (Versión 129, ampliado en la 146): `data/club-index.js`,
  GENERADO, con lo que hay que mostrar de un club ANTES de entrar a él (nombre,
  país, calidad del dato, cuántos ejercicios, el más reciente, y desde la Versión
  146 `yrs`: la LISTA de ejercicios con el reportType de cada uno). Existe porque
  eso vive adentro de `data/<club>-data.js`, que es justamente lo que no se carga
  hasta que el visitante elige ese club: con la página recién abierta, `clubs{}`
  tiene 92 entradas y `sources{}` tiene 3, todas de Boca. Son ~10 KB para los 92
  clubes (`data/club-index.js`) contra los ~25,8 KB de `clubs.js` completo (~420
  bytes/club). Su consumidor es el
  selector jerárquico, que desde la Versión 137 EXISTE: es de acá que salen el
  punto de calidad y el conteo de ejercicios de cada fila del panel, sin bajar un
  solo archivo de club. `yrs` se agregó para que el selector pueda además ofrecer
  un ejercicio puntual ("Balance 2024/2025") sin bajar nada.
- VERIFICACIÓN AUTOMÁTICA: `verifyTieOuts()` exige que cada ejercicio con total
  oficial conocido cierre contra el documento impreso, y `checkFxSanity()` que
  cada `fx` caiga en un rango plausible para su moneda. Hoy son 842 checks (3 no
  cierran, los mismos ±0,1 M€ de redondeo de Bayern Munich 2024/2025 ya documentados
  y silenciados, nada nuevo de esta tanda ni de la anterior), 0 warnings de fx (medido
  el 2026-09-25, Versión 227, tras la 2da tanda de 20 transcripts).
  COMPLEMENTO, DESDE LA VERSIÓN 122: `node tools/audit.js` audita en Node lo que un
  total correcto NO delata (ejercicios que no tienen ningún total contra qué
  compararse, categorías con typo o prestadas de la otra taxonomía, errores de
  escala, desgloses que no cierran contra su propia fila, catch-all dominante,
  ramas por club en el código), MÁS, desde la Versión 183, que los 4 generadores estén al
  día (`checkGenerados()`, P1): corre el `--check` de cada uno en 0,2 s. Salió de un
  problema real: `tools/generate-fuentes-page.js` LEE `ASSET_V` de `index.html`, así que
  subirlo desactualiza las 42 páginas de fuentes sin tocar un dato y sin que nada se vea
  roto. Carga `js/finanzas-calc.js` en un contexto de `vm`
  y llama al motor REAL, nunca reimplementa la cascada. Hoy: 0 P0, 0 P1, 1 P2 (intencional: 2
  ejercicios sin fila de liga porque jugaron un 2do escalón sin catálogo todavía, Zulte Waregem
  2025 y FC Fredericia 2019), 8 P3 y 114 silenciados con su motivo en `tools/audit-ignore.json`
  (medido el 2026-09-25, Versión 227, tras la 2da tanda de 20 transcripts — 14 hallazgos nuevos
  silenciados: 5 deducciones fiscales/variaciones de existencias verificadas y 9 catch-all
  dominante por límite real de la fuente; y 2 P0 reales encontrados y corregidos en la
  integración, ver `Admin/CHANGELOG.md`). ~40 de esos 114 son de las 4 sesiones de onboarding de
  PDF pendientes (Versiones 217/219/220/221) —
  categorizaciones legítimas verificadas contra el documento fuente, y un puñado de P0 reales
  encontrados y corregidos en la integración de cada tanda (típicamente `officialTotalExpenses`
  incluyendo por error un ítem `exceptional_items` que el motor excluye de ese check). El detalle
  club por club de qué se silenció y por qué está en `Admin/CHANGELOG.md`, entrada de cada versión,
  y en el propio `tools/audit-ignore.json`. Los 10
  `catch-all dominante` (P2) que había quedado sin revisar tras onboardear los 20 clubes de la
  Versión 201 (varios alemanes con "Sonstige betriebliche Aufwendungen" sin partir, y 2 españoles con
  "Ingresos accesorios y otros de gestión corriente" sin partir) se verificaron uno por uno contra el
  comentario de cabecera de cada `data/<club>-data.js` — no es un error de carga, es el techo real de
  lo que declara cada balance — y quedaron silenciados. El P1 `fuentes-indice-desfasado` de esa misma
  corrida (13 clubes que el generador no podía clasificar solo) se resolvió con `OVERRIDES` en
  `tools/generate-fuentes-index.js`. Desde la Versión 125 audita además la
  PROCEDENCIA de cada tipo de cambio, no solo que exista y sea plausible, y `node tools/audit.js --fx`
  imprime los tipos de cambio con su origen, agrupados por moneda.
  OJO CON LA COBERTURA: los clubes se cargan por demanda, y estas 2 funciones
  solo pueden revisar lo que está en memoria, así que una carga normal de la
  página audita SOLO Boca. Para auditar TODO hay que
  forzar la carga de los 92 clubes: abrí `?audit=1` o corré `auditAll()` en la
  consola. CORRELO ANTES DE CADA PUSH QUE TOQUE DATOS, es lo único que revisa
  los clubes que nadie está mirando. Desde la Versión 160 los carga en tandas
  paralelas de 25 y no de a uno, para que siga siendo viable correrlo cuando los
  clubes sean cientos.
- FUENTES (Versión 126, revisada en la 127): cada número cita su documento. Al
  final de Finanzas hay una ficha con el documento del ejercicio que se está
  mirando (link incluido), su tipo y nivel de fuente, el tipo de cambio usado CON
  su procedencia, y las salvedades; la pestaña Fuentes lista los documentos del
  club seleccionado; y afuera del sitio hay una PÁGINA ESTÁTICA POR CLUB,
  `fuentes/<clubId>.html`, con los documentos de ESE club (link, tipo y nivel de
  fuente, qué ejercicios respalda, tipo de cambio con su procedencia y
  salvedades), más `fuentes.html`, que desde la Versión 162 es el ÍNDICE: una fila
  por club con su conteo y el link a su página, sin contenido de fuentes adentro.
  Las 169 páginas, el índice y `sitemap.xml` los GENERA
  `node tools/generate-fuentes-page.js`: no se editan a mano, y el generador borra
  la página de un club que deje de existir (si no, Netlify la seguiría sirviendo).
  POR QUÉ POR CLUB Y NO POR PAÍS, que es lo que pedía el to-do viejo: el club es la
  unidad que el visitante busca y la única que puede rankear sola en un buscador.
  Hasta la 162 los 41 clubes compartían una URL de 86,5 KB; ahora el índice pesa
  14,5 KB y cada visitante se baja solo la página del club que mira.
  OJO CON QUÉ SE MUESTRA: `note` es INTERNA y no se renderiza nunca; lo que ve el
  visitante es `publicNote` (17 de 89 documentos) más las salvedades que
  `sourceCaveats()` deriva de los datos. Ver `Admin/CONVENCIONES.md` y
  `data/sources-view.js`, que además es donde viven las etiquetas de tipo y nivel
  compartidas entre el sitio y el generador. Antes de esto había
  una tabla de 6 filas y un párrafo escritos a mano que se habían quedado en los
  primeros clubes argentinos, y los 88 ejercicios REALES no mostraban su fuente
  en ningún lado (el único consumidor de `sources{}` era el banner de
  advertencia, que no aparece cuando el dato es oficial).
- PROCEDENCIA DEL TIPO DE CAMBIO (Versión 125): cada ejercicio declara de dónde
  salió su `fx`, `fxSource` con uno de los 6 valores de `FX_SOURCE`
  (`data/currency-map.js`), o `fxRef` apuntando a `FX_CLOSE`, la tabla de
  cotizaciones de mercado por moneda y fecha de cierre. La regla: lo que declara
  el documento va literal en el archivo del club; lo que es cotización pública se
  dice una vez en la tabla y se referencia. Antes esto vivía en prosa, con 10
  redacciones distintas, y 18 de los 89 valores no decían nada. Ver
  `Admin/CONVENCIONES.md` y `club-data-mapping/SKILL.md` sección 5.
## Dónde está cada cosa

**La raíz del repo es el SITIO; los documentos internos viven en `Admin/`** (Versión 196). Antes
estaban todos sueltos arriba, mezclados con `index.html`, y se publicaban salvo que alguien se
acordara de sumarlos a mano a la lista de `netlify.toml`.

```
finance-of-sports/
├── index.html  fuentes.html  sitemap.xml      el sitio
├── js/  data/  fuentes/  tools/  Clubes/
├── netlify.toml  .gitignore  .claude/         config
├── CLAUDE.md                                  se queda acá: Claude Code lo carga desde la raíz
├── Admin/                                     TODO lo interno. netlify.toml la saca del deploy entera
│   ├── ESTADO.md  TODO.md  CONVENCIONES.md  ARQUITECTURA.md
│   ├── CHANGELOG.md  finance-of-sports-project.md  dudas-por-club.md
│   ├── COMO-CORRE-EL-PROYECTO.html
│   ├── outreach/                               cola de mails a clubes, ver más abajo
│   └── Archive/                               cerrado y congelado, con banner de versión
├── auditorias/  Prototyping/                  internas también, con su propia línea en netlify.toml
└── fuentes/README.md                          el índice de países del sourcing (era fuentes-por-club.md)
```

**Un documento nuevo va en `Admin/` y listo** — no hay que tocar `netlify.toml` ni el `.gitignore`.
Si queda suelto en la raíz, `node tools/audit.js` lo caza como `doc-interno-no-excluido`. El criterio
completo está en `Admin/CONVENCIONES.md`.

- `js/i18n.js` + `data/lang/`: el motor de traducción y los diccionarios. Leé
  el comentario de cabecera de `js/i18n.js` antes de agregar un idioma o de
  meter un string nuevo en una vista.
- `.claude/skills/start-session-finance-of-sports-project/SKILL.md`: el checklist de arranque y de cierre de
  CUALQUIER sesión acá. Qué leer y en qué orden, qué NO leer, cómo verificar,
  qué documentar antes de terminar, y la regla de git. Empezá por ahí.
- `.claude/skills/auditoria-finance-of-sports/SKILL.md` + `auditorias/`: la auditoría de rutina
  (transversal y periódica, distinta de la verificación de onboarding y de `auditAll()`). El skill
  es el procedimiento; `auditorias/<fecha>.md` es el reporte de cada corrida, y cada uno diffea
  contra el anterior para no repetir la misma lista hasta que nadie la lea. Van 5 corridas y con
  ellas **se cerró la rotación completa** (`datos` → `escala` → `codigo` → `docs` → `tokens`):
  `2026-09-13` (`datos`), `2026-09-17-escala` (`escala`), y las 3 del 2026-09-20, `2026-09-20`
  (`codigo`), `2026-09-20-docs` (`docs`) y `2026-09-20-tokens` (`tokens`). **El próximo eje vuelve
  a `datos`.**
- `.claude/skills/escala-finance-of-sports/SKILL.md`: el mapa de puntos calientes de escala (qué
  se rompe entre 200 y 3000 clubes, y con qué número), separado de la auditoría de rutina porque
  es el contenido de UN eje (`escala`) y crece con cada sesión de sourcing/onboarding.
- `tools/audit.js`: auditoría determinista del proyecto entero (datos, escala,
  código, docs), agrupada en P0/P1/P2/P3. `--json` para la lista completa,
  `--quiet` para usarlo como gate antes de un push. `tools/audit-ignore.json`
  silencia lo YA verificado a mano contra el documento — nunca lo no verificado.
  Desde la Versión 198 incluye `ruta-muerta` (P2): rutas de archivo nombradas en los archivos
  VIVOS que ya no existen, entre backticks o como link Markdown. Los históricos
  (`Admin/CHANGELOG.md`, `Admin/finance-of-sports-project.md`, `Admin/Archive/`, `auditorias/`)
  quedan afuera a propósito: una ruta vieja ahí era verdad el día que se escribió.
- `.claude/skills/club-outreach/SKILL.md` + `Admin/outreach/` (Versión 216, to-do 51): el proceso
  para escribirle un mail de verdad a un club sin que cada envío pase por aprobación en el chat —
  Resend + subdominio propio en vez de Gmail. Etapa 1 en construcción, bloqueada en que Guido cree
  la cuenta de Resend y verifique el subdominio (ver el skill, sección 2). Check-in programado para
  el 2026-10-24 en `Admin/outreach/checkin-2026-10-24.md`.
- `tools/generate-club-index.js`: regenera la sección "QUÉ ES REAL POR CLUB" desde
  los propios datos. Corrélo después de onboardear un club, NO edites esa sección
  a mano. `--check` avisa si quedó desactualizada.
- `tools/generate-fuentes-index.js` (Versión 175): regenera la sección "Índice de
  países" de `fuentes/README.md` desde los `fuentes/_indice/<País>.md`. Corrélo
  después de una sesión de sourcing, NO edites esas líneas a mano. `--check` avisa
  si quedó vieja, `--debug` muestra la clasificación club por club. Cuando no puede
  decidir si un club tiene documento (la prosa matchea señales de los dos lados, o
  de ninguno) ABORTA en vez de adivinar: la decisión va a mano a `OVERRIDES`, adentro
  del script. Hoy hay 12, de la corrida original del 2026-09-20.
- `tools/generate-rankings.js` (Versión 182): precalcula el ranking de ingresos de cada
  liga-ejercicio en `data/rankings/<liga>.js`, uno por liga (8 archivos, 39 KB crudos / 5 KB
  gzip). Corrélo después de cargar un club o un ejercicio, NO edites esos archivos a mano.
  `--check` avisa si quedaron viejos y `--print` imprime los rankings en la terminal para
  verificarlos contra la fuente. POR QUÉ EXISTE: un ranking de liga necesita el ingreso de
  los N clubes de esa temporada, y calcularlo en vivo cuesta entre 18 KB (J1 2025, 10 clubes)
  y 101 KB gzip (Primera 2024, 8 clubes, porque Racing y Vélez traen 16 ejercicios cada uno y
  el ranking usa uno). Detrás de un click eso se paga; en Inicio, que lo ve todo visitante
  incluido el que rebota, no. **Es el único lugar del proyecto que guarda números de plata
  copiados de otro lado**, así que `node tools/audit.js` corre su `--check` como **P1**
  (`rankings-desfasado`): no se puede pushear con el ranking viejo.
- `data/destacados.js` (Versión 182): la lista CURADA A MANO de hasta 10 (liga, ejercicio)
  que Inicio muestra como vidriera. Es el único archivo de esta feature que se edita a mano;
  `audit.js` chequea que cada entrada tenga ranking precalculado (`destacado-sin-ranking`,
  P1) y avisa si alguna quedó con un solo club.
- `Prototyping/`: **28 KB y dos archivos `.md`, ningún prototipo.** Entre el
  2026-09-14 y el 15 se probaron cuatro formas de resolver la pantalla de elegir
  club; ganó el 4 y entre el 15 y el 17 se llevó a producción en seis etapas
  (Versiones 143-155). Terminado el merge se borraron los 4 `.html` generados, los
  4 generadores, los 4 `-selector.js` y los datos inventados: la historia está en
  git. Sobreviven `README.md` (la tabla de POR QUÉ PERDIERON los prototipos 1, 2 y
  3 — es lo que evita que alguien los vuelva a proponer) y
  `Selector/MERGE-A-PRODUCCION.md`, marcado como cerrado, que sigue siendo la mejor
  explicación escrita del modelo que hoy corre en `js/selector.js`.
  OJO, LO QUE SE APRENDIÓ AL BORRARLOS: esa carpeta SE DEPLOYA. No hay
  `netlify.toml` ni `_redirects`, y Netlify publica la raíz del repo, así que
  `financeofsports.com/Prototyping/...` servía los ejercicios inventados de 18
  clubes a cualquiera con la URL. Vale para cualquier cosa que se deje en el repo.
- `Admin/CONVENCIONES.md`: reglas permanentes de UI/datos y gotchas ya encontrados.
  LEELO antes de tocar el sitio: son criterios vigentes, varios pedidos
  explícitos de Guido que no se negocian sin preguntarle.
- `Admin/ARQUITECTURA.md`: qué hace cada archivo del proyecto y cómo funciona el motor
  genérico de Finanzas. Leelo cuando toques el motor o agregues un club.
- `Admin/CHANGELOG.md`: qué cambió en cada versión, condensado.
- `Admin/finance-of-sports-project.md`: la narrativa completa, con el razonamiento de cada
  decisión. Solo hace falta para entender el "por qué" de algo viejo.
- `CLAUDE.md`: instrucciones permanentes del proyecto (dónde guardar PDFs, qué
  skill leer antes de qué tarea, qué preguntarle a Guido antes de asumir).
- `.claude/skills/`: 6 skills propios (start-session-finance-of-sports-project,
  club-data-mapping, club-or-year-onboarding, club-sourcing,
  auditoria-finance-of-sports, escala-finance-of-sports). Se autodescubren cuando
  la sesión abre directo en `finance-of-sports/`; ver CLAUDE.md para el caso en
  que no.
- LAS NOTAS INTERNAS DE SOURCING (`fuentes/<País>/<Club>.md`, 610, y
  `fuentes/_indice/<País>.md`, 44) SÍ SE TRACKEAN — esta línea decía lo contrario hasta la
  Versión 204 y ya no era cierto: hubo una regla en `.gitignore` (`fuentes/**/*.md`) desde la
  Versión 167, pero Guido la revirtió 6 versiones después (Versión 173, "si pierdo la mac
  pierdo semanas de trabajo") junto con TODO el destrackeo, a favor del mecanismo único que
  sigue vigente hoy: todo se trackea (respaldo completo en GitHub) y `netlify.toml` saca lo
  interno del ARTEFACTO DE DEPLOY antes de publicar, ver más abajo en "Dónde está cada cosa".
  Los 131 `fuentes/<clubId>.html` generados son la excepción a propósito: SÍ son parte del
  sitio y siguen viajando en el deploy.
- `fuentes/README.md` (índice de países) → `fuentes/_indice/<País>.md` (una
  línea por club) → `fuentes/<País>/<Club>.md`: qué se buscó, qué se encontró y
  qué se descartó por club. Mirá ACÁ antes de salir a buscar un PDF. Hoy: 44
  países, 571 clubes trackeados, 370 con documento encontrado (de los cuales 131
  están cargados al sitio). Esos números y las 44 líneas de país NO se escriben a
  mano desde la Versión 175: los genera `node tools/generate-fuentes-index.js`.
- `Admin/ESTADO-clubes.md` (Versión 239): el bloque "QUÉ ES REAL POR CLUB", generado por
  `node tools/generate-club-index.js`, partido de este archivo cuando se acercaba al umbral de
  60 KB de `tools/audit.js`.
- `Admin/dudas-por-club.md`: preguntas genuinamente abiertas, sin criterio asumido.
- `Admin/inventario-pendiente.md` (Versión 228): foto completa de PDFs sin transcribir y
  transcripciones `.md` ya hechas pero sin cargar, país por país y club por club, con una sección de
  "por dónde empezar" y otra de descartados con motivo — para no tener que rehacer el barrido de
  `Clubes/` cada sesión. Es una FOTO puntual, no se regenera sola: borrar la línea de lo que se vaya
  onboardeando.
