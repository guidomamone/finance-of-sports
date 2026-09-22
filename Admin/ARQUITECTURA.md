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
- index.html: HTML, CSS, y el <script> principal con toda la lógica de
  render. Desde la Versión 102, TODOS los datos de club (Boca incluida)
  viven en su propio data/<club>-data.js, ninguno inline acá.
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
  se bajan al abrir el modal): dibuja los 41 clubes sin
  bajar un solo `data/<club>-data.js`, y recién baja los que hagan falta al
  apretar "Comparar". La explicación larga del modelo está en
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
