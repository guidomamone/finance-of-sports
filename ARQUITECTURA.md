# Arquitectura: archivos del proyecto y modelo de datos

Referencia técnica de cómo está armado el sitio: qué hace cada archivo, y cómo
funciona el motor genérico que calcula Finanzas para todos los clubes.

Antes vivía dentro del comentario de `index.html`. Se movió acá en la Versión
114: es referencia que se consulta cuando hace falta (al tocar el motor, al
agregar un club), no contexto que haga falta leer para retomar el proyecto.

Para el estado del proyecto ver `ESTADO.md`, y para la to-do list `TODO.md`.
Para las reglas vigentes de UI/datos, ver `CONVENCIONES.md`.

---

ARCHIVOS DEL PROYECTO (todos en finance-of-sports/, salvo que se diga otra cosa)
- index.html: HTML, CSS, y el <script> principal con toda la lógica de
  render. Desde la Versión 102, TODOS los datos de club (Boca incluida)
  viven en su propio data/<club>-data.js, ninguno inline acá.
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
  `club-index.js` + `leagues.js` + `club-leagues.js`: dibuja los 41 clubes sin
  bajar un solo `data/<club>-data.js`, y recién baja los que hagan falta al
  apretar "Comparar". La explicación larga del modelo está en
  `Prototyping/Selector/MERGE-A-PRODUCCION.md`, secciones 0, 3 y 5.
  `js/comparar-clubes.js` (la bandeja de chips de la Versión 137) ya no existe:
  se borró en la Versión 152 y lo que hacía mejor está acá adentro.
- fuentes-por-club.md: ÍNDICE DE PAÍSES (desde la sesión 2026-09-20; antes era
  una línea por club, y antes de la 2026-09-13 tenía todo el contenido inline —
  cada nivel dejó de escalar a su turno). Una línea por país con cuántos clubes
  trackea, cuántos tienen documento encontrado y la fecha del chequeo más viejo,
  linkeando a `fuentes/_indice/<País>.md`, que tiene una línea por club, que a su
  vez linkea a `fuentes/<País>/<Club>.md`, donde vive el contenido real (links a
  documentos oficiales, notas de prensa, qué se probó y qué falta). Revisar el
  índice del país antes de asumir que no hay fuentes nuevas para un club. El
  archivo por país es además lo que permite sourcear dos países en paralelo sin
  conflictos de merge.
- CHANGELOG.md: resumen corto (unas pocas líneas) de qué cambió en cada
  versión. Empezar acá para "¿cuándo se cargó/cambió tal cosa?".
- finance-of-sports-project.md (misma carpeta que este HTML): historia narrativa
  completa versión por versión, desde el MVP original de Boca — el "por
  qué" detrás de cualquier entrada de CHANGELOG.md que lo amerite.
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
