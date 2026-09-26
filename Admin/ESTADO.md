# ESTADO — finance-of-sports

**Qué hay armado hoy.** Este archivo es el snapshot del proyecto: qué existe, cómo
está organizado, y qué hay cargado de cada club. No es un log: si algo que dice acá
deja de ser cierto, se reemplaza, no se apila una línea nueva al lado de la vieja.

**Lo que NO está acá:**

- **Qué falta hacer** -> `Admin/TODO.md`.
- **Qué cambió y cuándo** -> `Admin/CHANGELOG.md`.
- **Por qué se decidió algo** -> `Admin/finance-of-sports-project.md`.
- **Reglas vigentes y trampas ya encontradas** -> `Admin/CONVENCIONES.md`. Leelo siempre.
- **Cómo funciona cada archivo del motor** -> `Admin/ARQUITECTURA.md`.

**Por qué es un archivo y ya no el comentario de `index.html`** (sesión 2026-09-14,
Versión 138, pedido explícito de Guido: *"Index NO es el archivo para tener to do.
Eso era al inicio"*): hasta acá el estado y la to-do list vivían adentro de un
comentario HTML al principio de `index.html`, que llegó a pesar 80 KB de los 183 KB
del archivo. Eso tenía dos costos. Uno para el visitante, que se bajaba los 80 KB en
cada pageview sin verlos nunca. Y otro peor para el proyecto: un `index.html` de
6.000 líneas donde las primeras 830 no son el sitio hace que cualquier búsqueda de
código tenga que saltearlas, y hacía que la to-do list y el HTML se editaran en el
mismo archivo, con conflictos entre sesiones que no tenían nada que ver entre sí.

---

## Objetivo del proyecto

Arrancó como un sitio solo para hinchas de Boca antes de una elección de
presidente. Ahora es más ambicioso: un sitio de finanzas de clubes de fútbol
en general (multi-club), pensado para periodistas y creadores de contenido.
**Todo el sitio es gratis, y por ahora se queda así** (decisión de Guido,
2026-09-14: no hay corte free/paid que definir ni paywall que construir; los
dos puntos que había en la to-do se sacaron). La idea de un plan pago
(analítica avanzada + tweets pre-armados, suscripciones vía dLocal Go) queda
como posibilidad, no como trabajo pendiente. Presupuesto casi cero,
sigue siendo un proyecto hobby de Guido, no gastar en infraestructura que
no haga falta todavía. Nombre del sitio: "El deporte en Números" en castellano y
"Finance of Sports" en inglés (clave `site.name`, ver data/lang/en.js). Historia
del nombre: "Boca en Números" -> "Tu club en números" (Versión 12) -> "El deporte
en Números" (Versión 117, pedido de Guido). Cada rename fue solo de branding: el
<title>, el logo del header y el asunto del mail de contacto. DESDE 2026-09-13 el
dominio es **financeofsports.com** y la carpeta/repo se llama
`finance-of-sports`.

---

## Estado actual

Esto es el ESTADO, no el historial. Si buscás "¿cuándo se hizo tal cosa?" o "¿por
qué se decidió tal cosa?", NO está acá: está en `Admin/CHANGELOG.md` (resumen por
versión, 96 versiones) y en `Admin/finance-of-sports-project.md` (narrativa completa). Este bloque
se reescribe, no se acumula.

- SITIO: estático puro (HTML + CSS + JS, Chart.js por CDN), sin backend, sin
  build step, servido desde la raíz. Deploy continuo en Netlify al pushear a
  `main` del repo de GitHub. Dominio propio desde 2026-09-13:
  **financeofsports.com** (ver to-do 7: falta renombrar el repo en GitHub y
  re-linkearlo en Netlify, eso lo tiene que hacer Guido).
- ANALYTICS: Cloudflare Web Analytics desde la Versión 166 (snippet en el `<head>`
  de `index.html`) — visitas, pageviews, referrers y país, sin cookies ni banner de
  consentimiento. No mide funnel/eventos (para eso, Mixpanel queda como opción
  futura si hace falta). Desde la Versión 216, además, un Worker + KV propios
  (`square-sky-ca25.guidomamone91.workers.dev` → KV namespace `FOS_LOGS`, cuenta de
  Cloudflare de Guido, free tier) loggean texto libre que Web Analytics no puede: qué
  se tipea en el buscador (con o sin resultado) y qué par de clubes se elige en
  Comparar. Se lee directo del dashboard de Cloudflare (KV Pairs), sin reporte propio.
  Gateado por hostname en `js/selector.js`: solo manda datos si `location.hostname ===
  'financeofsports.com'`, así que probar el sitio en preview local no ensucia las
  cuentas reales.
- YA NO HAY EJERCICIOS PLACEHOLDER (Versión 138, pedido de Guido: "quita los
  ejercicios que sean placeholder, antes tenían sentido, hoy no"). Se borraron los 9
  que quedaban, todos de Boca (7) y River (2): cinco eran placeholder puro con rubros
  inventados, de cuando el sitio era un MVP y necesitaba algo que dibujar, y cuatro
  eran ejercicios reales sin publicar todavía, cargados en cero. Los dos de River
  existían solo para que "Comparar Gestiones" tuviera dos períodos que comparar. TODO
  ejercicio que muestra el sitio tiene ahora un documento detrás. Consecuencia: 85
  ejercicios en vez de 94, Boca pasó de calidad "mixta" a "oficial" en el selector, y
  los gráficos de Inicio dejaron de tener columnas vacías. `reportType:'placeholder'`
  y `'pending_official'` siguen existiendo en el código, con su rama en
  `yearKindForClub()`/`anioDropdownSuffix()`: son estados válidos, simplemente hoy no
  los usa ningún club.
- DATOS: 161 clubes cargados con al menos un ejercicio REAL (balance o presupuesto
  oficial), de 14 países: Argentina 18, España 19, Japón 10, Brasil 32, Colombia 10,
  Alemania 11, Inglaterra 19, México 1, Chile 3, Perú 1, Países Bajos 4, Croacia 8,
  Bélgica 14, Dinamarca 11. La Versión 227 (2026-09-25) siguió el mismo pedido de Guido
  ("20 más") con una 2da tanda: esta vez los 20 candidatos salieron de PAÍSES YA CARGADOS
  (Bélgica/Dinamarca/Croacia) con series históricas completas ya transcriptas y sin cargar
  — 15 clubes nuevos (Standard Liège, Union Saint-Gilloise, Westerlo, Zulte Waregem,
  Sint-Truiden, Cercle Brugge, Dender EH — Bélgica; FC Fredericia, FC Nordsjælland,
  Randers FC, Vejle, SønderjyskE — Dinamarca; Istra 1961, Varaždin, Gorica — Croacia) más
  7 ejercicios nuevos de 4 clubes ya cargados (Los Andes 2019/20, RB Leipzig 2021/22,
  Bayern Munich 2022/23, Botafogo(Río) 2023+2025, Cruzeiro 2022+2023). SIN dead-ends esta
  vez (los 20 cerraron los 20, con 2 P0 reales encontrados y corregidos en la integración —
  detalle en `Admin/CHANGELOG.md`). La Versión 226 (mismo día) onboardeó 20 transcripts ya hechos y
  sin cargar, elegidos SIN prioridad de país (pedido de Guido: "20 transcripts que no hayan
  sido onboardeados, no me importa un orden específico"), en 5 agentes paralelos + 1 de
  reemplazo: 15 clubes NUEVOS (Osijek, Slaven Belupo — Croacia; AGF, Silkeborg IF, Viborg
  FF — Dinamarca; Charleroi, Mechelen, Antwerp — Bélgica; Ceará, Sport Recife, Amazonas,
  Juventude, Botafogo-SP — Brasil, este último distinto del Botafogo de Río ya cargado;
  Godoy Cruz, Los Andes — Argentina) más 5 ejercicios nuevos de clubes ya cargados
  (Cruzeiro 2024, Coritiba 2023, Chapecoense 2017, Bayern Munich 2020/21, RB Leipzig
  2022/23). De los 20 candidatos elegidos al azar, 3 resultaron dead-ends sin estados
  contables reales (Temperley y Belgrano: solo "Memoria" narrativa institucional, sin
  Estado de Recursos y Gastos; Palestino: solo un estado financiero intermedio de 6 meses,
  sin P&L del ejercicio anual 2018) y se reemplazaron por Botafogo-SP/Juventude/Amazonas —
  el detalle completo, club por club, está en `Admin/CHANGELOG.md`. 69 de los 131 clubes
  previos se habían sumado en 8 sesiones de onboarding en paralelo de PDF transcriptos
  pendientes (Versiones 217, 219, 220, 221, 222, 223, 224 y 225, 2026-09-24/25), el detalle
  club por club de cada tanda está en `Admin/CHANGELOG.md` (no se repite acá para que esta
  sección no crezca sin límite). La Versión 225, con Sudamérica/España/Inglaterra ya
  agotados, abrió 3 países europeos más
  a pedido de Guido ("de donde sea"): Croacia (Dinamo Zagreb/Hajduk Split/Rijeka, ejercicio
  2024, ya en euros), Bélgica (Club Brugge/Anderlecht/Genk/Gent) y Dinamarca (FC København/
  Brøndby/FC Midtjylland, DKK moneda nueva). La Versión 224 agotó Sudamérica/España/Inglaterra
  y siguió en Europa continental: Países Bajos país nuevo (Ajax, PSV, Feyenoord, AZ —
  las transcripciones no existían todavía, se generaron en la misma sesión vía
  `pdftotext`, ver el comentario de esa versión en `Admin/CHANGELOG.md`) y 6 clubes
  alemanes grandes más (Bayern Munich, Borussia Dortmund, RB Leipzig, TSG Hoffenheim,
  Hamburger SV, Borussia Mönchengladbach — Alemania ya estaba cargada, sin país nuevo).
  La Versión 223 fue casi toda Inglaterra (14 clubes nuevos: Aston
  Villa, Bournemouth, Brentford, Brighton, Burnley, Chelsea, Crystal Palace, Fulham,
  Leeds United, Newcastle United, Nottingham Forest, Sunderland, West Ham, Wolves) más
  Levante UD (España) — ningún país nuevo, Inglaterra y España ya estaban cargados.
  Chile y Perú son países nuevos desde la Versión 222 (Colo-Colo, Universidad de Chile,
  Universidad Católica y Alianza Lima) — Ecuador se evaluó en la misma sesión y se
  descartó a propósito, ningún documento disponible llega al estándar de calidad (ver
  `Admin/dudas-por-club.md`). Desde la Versión 217 los clubes nuevos nacen con el país
  en el `clubId` (ej. `americamineiro-br`, `corinthians-br`, `millonarios-co`),
  convención de la Versión 129 que hasta ahí no se venía aplicando a los clubes que se
  agregaban (`tools/audit.js` lo empezó a chequear recién en la Versión 217,
  `clubid-sin-pais`). Rosario Central e Independiente, ya cargados, sumaron un 2do
  ejercicio cada uno (2024-25 y N°122/2025-26 respectivamente, Versión 209) — con esto
  se cierra el to-do 58 completo (los 6 ejercicios que el barrido del 2026-09-22
  encontró y descargó). Alemania e Inglaterra son países nuevos desde la Versión 201
  (sesión 2026-09-22, GBP moneda nueva). Un solo motor genérico calcula Finanzas para
  todos (ver `Admin/ARQUITECTURA.md`); no queda ningún club con motor propio desde la
  Versión 102.
  El detalle club por club (qué ejercicio, qué fuente, qué es real y qué no) está
  más abajo en "QUÉ ES REAL POR CLUB", y con más detalle
  todavía en el comentario de cabecera de cada `data/<club>-data.js`.
- PRESUPUESTOS, POR CLUB (Versión 135): los 3 cards que solo aparecen para un
  ejercicio con presupuesto (Supuestos, Presupuesto Financiero, Presupuesto de
  Inversiones) sacan sus datos de `presupuestoSupuestosByYear` /
  `presupuestoFinancieroByYear` / `presupuestoInversionesByYear`, adentro del
  `data/<club>-data.js` de cada club. Antes vivían en 3 registros por club dentro
  de `js/finanzas-render.js`, y el contenido de Boca era HTML escrito a mano en
  ESTE archivo. Onboardear un presupuesto ya no toca ni el motor ni el HTML.
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
  Las 131 páginas, el índice y `sitemap.xml` los GENERA
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
- PESTAÑAS: Finanzas es la única con datos reales y es donde está todo el
  trabajo. Mercado de Pases / Resultados Deportivos / Títulos están vacías o con
  placeholder según el club. "Mi Cuenta" es un stub sin
  funcionalidad: es la única parte del sitio que todavía le anuncia al visitante
  un plan pago ("próximamente"), y con la decisión de ir todo gratis ya no está
  esperando nada. Pendiente de decidir con Guido si se saca la pestaña o se
  reescribe el texto.
- PESTAÑA LIGAS (Versión 183, to-do 23(c)): el ranking de ingresos de los clubes de
  una liga en UN ejercicio. Vive en `js/liga.js` y lee `data/rankings/<liga>.js`, así
  que NO baja ningún `data/<club>-data.js` (1 a 3,4 KB gzip por liga, contra 18-101 KB
  que costaría en vivo). Barras verticales ascendentes en el `brandColor` de cada club
  con el número escrito arriba, tabla con puesto/club/ingresos/ejercicio/documento, y
  salvedades derivadas del dato. TRES REGLAS QUE LA ORDENAN: el ejercicio está siempre
  escrito y es cambiable (un ranking es (liga, EJERCICIO), nunca (liga)); el default es
  el ejercicio con MÁS clubes y no el más reciente, porque los balances tardan en
  publicarse; y el "N de M" solo se escribe si `leagueSizeAt()` lo sabe, que hoy es en
  3 de 27 liga-temporadas. Se llega por el nav (estado frío: la grilla de las 8 ligas)
  o eligiendo una liga en el selector, que hasta acá terminaba en Finanzas del primer
  club de esa liga por orden alfabético. No necesita club activo.
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
- PROCEDENCIA DEL TIPO DE CAMBIO (Versión 125): cada ejercicio declara de dónde
  salió su `fx`, `fxSource` con uno de los 6 valores de `FX_SOURCE`
  (`data/currency-map.js`), o `fxRef` apuntando a `FX_CLOSE`, la tabla de
  cotizaciones de mercado por moneda y fecha de cierre. La regla: lo que declara
  el documento va literal en el archivo del club; lo que es cotización pública se
  dice una vez en la tabla y se referencia. Antes esto vivía en prosa, con 10
  redacciones distintas, y 18 de los 89 valores no decían nada. Ver
  `Admin/CONVENCIONES.md` y `club-data-mapping/SKILL.md` sección 5.
- BRANDING: RESUELTO en la Versión 117 (decisión de Guido). La marca es distinta
  por idioma, a propósito: "El deporte en Números" en castellano, "Finance of
  Sports" en inglés (clave `site.name`, `data/lang/en.js`), que es además el
  dominio. Antes decía "Tu club en números", que ya no era cierto: el sitio dejó
  de ser solo de fútbol de clubes argentinos hace rato. El mail del formulario de
  contacto dejó de ser el placeholder `contacto@bocaennumeros.example` en la
  Versión 167: hoy el mailto va a `guidomamone91@gmail.com`.

---

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
  países, 571 clubes trackeados, 368 con documento encontrado (de los cuales 131
  están cargados al sitio). Esos números y las 44 líneas de país NO se escriben a
  mano desde la Versión 175: los genera `node tools/generate-fuentes-index.js`.
- `Admin/dudas-por-club.md`: preguntas genuinamente abiertas, sin criterio asumido.
- `Admin/inventario-pendiente.md` (Versión 228): foto completa de PDFs sin transcribir y
  transcripciones `.md` ya hechas pero sin cargar, país por país y club por club, con una sección de
  "por dónde empezar" y otra de descartados con motivo — para no tener que rehacer el barrido de
  `Clubes/` cada sesión. Es una FOTO puntual, no se regenera sola: borrar la línea de lo que se vaya
  onboardeando.

**YA NO ES CIERTO DESDE EL 2026-09-20: AHORA SÍ HAY `netlify.toml`.** Netlify sigue publicando la raíz, pero antes de publicar corre un comando que BORRA DEL ARTEFACTO DE DEPLOY los documentos internos (`CLAUDE.md`, `Admin/finance-of-sports-project.md`, `Admin/dudas-por-club.md`, las 613 notas de `fuentes/**/*.md`, `auditorias/` y `Prototyping/`). O sea: todo se trackea —el respaldo en GitHub está completo— y lo interno no se publica. Las 131 páginas `fuentes/<clubId>.html` SÍ se publican, son parte del sitio. Ver `netlify.toml`, que explica por qué destrackear estaba mal y por qué hacer el repo privado no alcanzaba. **Si dejás un archivo nuevo en el repo, sigue publicándose salvo que lo agregues a esa lista.**

---

===== CLUB-INDEX:START (generado por tools/generate-club-index.js, no editar a mano) =====
QUÉ ES REAL POR CLUB
GENERADO AUTOMÁTICAMENTE — no editar a mano. Se regenera con:
    node tools/generate-club-index.js

Esta lista contesta QUÉ hay cargado de cada club. El POR QUÉ (qué supuesto se tomó,
qué salvedad tiene una cifra, qué quedó sin cargar y por qué) NO está acá y no puede
estarlo: vive en el comentario de cabecera de cada `data/<club>-data.js`, que es el
archivo que sí o sí se toca al cargar un club y por lo tanto el único que no se puede
desincronizar. Si querés entender un club, abrí SU archivo.

Todo ejercicio listado acá es REAL (sale de un documento oficial del club) y cierra
contra el total impreso de su propio documento — eso lo garantiza `auditAll()`, no
esta lista. Un club sin datos reales no aparece.

TOTAL: 161 clubes, 291 ejercicios, 14 países.

ARGENTINA (18)
  Argentinos Juniors             5 ejercicios (2014/2015 a 2018/2019), balance, ARS
  Banfield                       1 ejercicio (2019/2020), balance, ARS
  Boca Juniors                   2 ejercicios (2024/2025, 2026/2027), balance + presupuesto, ARS
  Estudiantes de La Plata        4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Ferro Carril Oeste             2 ejercicios (2021/2022 a 2022/2023), balance, ARS
  Gimnasia y Esgrima (La Plata)  4 ejercicios (2022/2023 a 2025/2026), balance + presupuesto y balance + presupuesto, ARS
  Godoy Cruz                     1 ejercicio (2019/2020), balance, ARS
  Independiente                  2 ejercicios (2023/2024, 2025/2026), balance, ARS
  Instituto ACC                  1 ejercicio (2023/2024), balance, ARS
  Los Andes                      2 ejercicios (2019/2020 a 2020/2021), balance, ARS
  Newell's Old Boys              1 ejercicio (2018/2019), balance, ARS
  Racing Club                    17 ejercicios (2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2023/2024, 2024/2025, 2025/2026, 2026/2027), balance + presupuesto y balance + presupuesto, USD/ARS
  River Plate                    1 ejercicio (2023/2024), balance de réplica no oficial, ARS
  Rosario Central                2 ejercicios (2022/2023, 2024/2025), balance, ARS
  San Lorenzo                    8 ejercicios (2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2023/2024), balance + presupuesto, ARS
  Talleres                       2 ejercicios (2024 a 2025), balance, ARS
  Unión                          4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Vélez Sarsfield                11 ejercicios (2014/2015 a 2024/2025), balance, ARS

BE (14)
  Anderlecht            1 ejercicio (2024/2025), balance, EUR
  Antwerp               1 ejercicio (2024/2025), balance, EUR
  Cercle Brugge         1 ejercicio (2024/2025), balance, EUR
  Charleroi             1 ejercicio (2024/2025), balance, EUR
  Club Brugge           1 ejercicio (2024/2025), balance, EUR
  Dender EH             1 ejercicio (2024/2025), balance, EUR
  Genk                  1 ejercicio (2024/2025), balance, EUR
  Gent                  1 ejercicio (2024/2025), balance, EUR
  Mechelen              1 ejercicio (2024/2025), balance, EUR
  Sint-Truiden          1 ejercicio (2024/2025), balance, EUR
  Standard Liège        1 ejercicio (2024/2025), balance, EUR
  Union Saint-Gilloise  1 ejercicio (2024/2025), balance, EUR
  Westerlo              1 ejercicio (2024/2025), balance, EUR
  Zulte Waregem         1 ejercicio (2024/2025), balance, EUR

BRASIL (32)
  Amazonas              1 ejercicio (2024), balance, BRL
  América Mineiro       3 ejercicios (2023 a 2025), balance, BRL
  Athletico Paranaense  2 ejercicios (2024 a 2025), balance, BRL
  Atlético Goianiense   1 ejercicio (2025), balance, BRL
  Atlético Mineiro      3 ejercicios (2023 a 2025), balance, BRL
  Bahia                 2 ejercicios (2024 a 2025), balance, BRL
  Botafogo              3 ejercicios (2023 a 2025), balance, BRL
  Botafogo-SP           1 ejercicio (2024), balance, BRL
  Ceará                 2 ejercicios (2024 a 2025), balance, BRL
  Chapecoense           2 ejercicios (2017, 2021), balance, BRL
  Corinthians           2 ejercicios (2024 a 2025), balance, BRL
  Coritiba              2 ejercicios (2023 a 2024), balance, BRL
  Cruzeiro              4 ejercicios (2022 a 2025), balance, BRL
  Flamengo              2 ejercicios (2024 a 2025), balance, BRL
  Fluminense            2 ejercicios (2024 a 2025), balance, BRL
  Fortaleza             1 ejercicio (2025), balance, BRL
  Grêmio                1 ejercicio (2024), balance, BRL
  Guarani               2 ejercicios (2024 a 2025), balance, BRL
  Internacional         2 ejercicios (2024 a 2025), balance, BRL
  Ituano                1 ejercicio (2024), balance, BRL
  Juventude             1 ejercicio (2020), balance, BRL
  Mirassol              1 ejercicio (2024), balance, BRL, sin deuda/caja
  Operário Ferroviário  2 ejercicios (2024 a 2025), balance, BRL
  Palmeiras             2 ejercicios (2024 a 2025), balance, BRL
  Ponte Preta           3 ejercicios (2022 a 2024), balance, BRL
  RB Bragantino         2 ejercicios (2019, 2024), balance, BRL
  Santos                2 ejercicios (2024 a 2025), balance, BRL
  São Paulo             2 ejercicios (2023 a 2024), balance, BRL
  Sport Recife          1 ejercicio (2025), balance, BRL
  Vasco da Gama         1 ejercicio (2023), balance, BRL
  Vitória               1 ejercicio (2025), balance, BRL
  Volta Redonda         2 ejercicios (2024 a 2025), balance, BRL

CHILE (3)
  Colo-Colo             3 ejercicios (2022 a 2024), balance, CLP, sin deuda/caja
  Universidad Católica  3 ejercicios (2022 a 2024), balance, CLP
  Universidad de Chile  3 ejercicios (2022 a 2024), balance, CLP

COLOMBIA (10)
  América de Cali         1 ejercicio (2025), balance, COP
  Atlético Nacional       1 ejercicio (2025), balance, COP
  Deportivo Cali          1 ejercicio (2025), balance, COP
  Deportivo Pereira       1 ejercicio (2025), balance, COP
  Envigado FC             1 ejercicio (2025), balance, COP
  Independiente Santa Fe  1 ejercicio (2025), balance, COP
  Junior de Barranquilla  1 ejercicio (2025), balance, COP
  Millonarios             1 ejercicio (2025), balance, COP
  Once Caldas             1 ejercicio (2025), balance, COP, sin deuda/caja
  Unión Magdalena         1 ejercicio (2018), balance, COP

ALEMANIA (11)
  1. FC Köln                2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Bayern Munich             4 ejercicios (2020/2021, 2022/2023, 2023/2024, 2024/2025), balance, EUR, sin deuda/caja
  Borussia Dortmund         2 ejercicios (2023/2024 a 2024/2025), balance, EUR, sin deuda/caja
  Borussia Mönchengladbach  2 ejercicios (2023 a 2024), balance, EUR
  Eintracht Frankfurt       2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  FC Augsburg               2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Hamburger SV              2 ejercicios (2023/2024 a 2024/2025), balance, EUR, sin deuda/caja
  RB Leipzig                4 ejercicios (2021/2022 a 2024/2025), balance, EUR, sin deuda/caja
  TSG Hoffenheim            2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  VfB Stuttgart             2 ejercicios (2023 a 2024), balance, EUR
  Werder Bremen             3 ejercicios (2022/2023 a 2024/2025), balance, EUR, sin deuda/caja

DK (11)
  AGF              1 ejercicio (2020/2021), balance, DKK
  Brøndby          1 ejercicio (2020), balance, DKK, sin deuda/caja
  FC Fredericia    1 ejercicio (2019), balance, DKK
  FC København     1 ejercicio (2024), balance, DKK, sin deuda/caja
  FC Midtjylland   1 ejercicio (2018/2019), balance, DKK, sin deuda/caja
  FC Nordsjælland  1 ejercicio (2024), balance, DKK
  Randers FC       1 ejercicio (2022/2023), balance, DKK
  Silkeborg IF     1 ejercicio (2024), balance, DKK
  SønderjyskE      1 ejercicio (2021/2022), balance, DKK
  Vejle            1 ejercicio (2024), balance, DKK
  Viborg FF        1 ejercicio (2023/2024), balance, DKK

ESPAÑA (19)
  Athletic Club       1 ejercicio (2024/2025), balance, EUR
  Atlético de Madrid  1 ejercicio (2024/2025), balance, EUR
  CA Osasuna          2 ejercicios (2021/2022, 2023/2024), balance, EUR
  Celta de Vigo       1 ejercicio (2024/2025), balance, EUR
  Deportivo Alavés    1 ejercicio (2024/2025), balance, EUR
  Elche CF            2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  FC Barcelona        1 ejercicio (2024/2025), balance, EUR
  Getafe CF           2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Girona FC           2 ejercicios (2019/2020, 2024/2025), balance, EUR
  Levante UD          1 ejercicio (2024/2025), balance, EUR
  Rayo Vallecano      1 ejercicio (2024/2025), balance, EUR
  RCD Espanyol        2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  RCD Mallorca        1 ejercicio (2024/2025), balance, EUR
  Real Betis          1 ejercicio (2024/2025), balance, EUR
  Real Madrid         1 ejercicio (2024/2025), balance, EUR
  Real Oviedo         1 ejercicio (2024/2025), balance, EUR
  Sevilla FC          1 ejercicio (2024/2025), balance, EUR
  Valencia CF         1 ejercicio (2024/2025), balance, EUR
  Villarreal CF       1 ejercicio (2023/2024), balance, EUR

INGLATERRA (19)
  AFC Bournemouth          2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Arsenal                  2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Aston Villa              1 ejercicio (2024/2025), balance, GBP
  Brentford                2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Brighton                 2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Burnley                  2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Chelsea                  1 ejercicio (2024/2025), balance, GBP
  Crystal Palace           2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Everton                  2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Fulham                   2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Leeds United             2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Liverpool                2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Manchester City          2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Newcastle United         1 ejercicio (2024/2025), balance, GBP
  Nottingham Forest        2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Sunderland               2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  Tottenham Hotspur        2 ejercicios (2023/2024 a 2024/2025), balance, GBP
  West Ham United          1 ejercicio (2024/2025), balance, GBP
  Wolverhampton Wanderers  2 ejercicios (2023/2024 a 2024/2025), balance, GBP

HR (8)
  Dinamo Zagreb  1 ejercicio (2024), balance, EUR
  Gorica         1 ejercicio (2025), balance, EUR
  Hajduk Split   1 ejercicio (2024), balance, EUR
  Istra 1961     1 ejercicio (2025), balance, EUR, sin deuda/caja
  Osijek         1 ejercicio (2025), balance, EUR
  Rijeka         1 ejercicio (2024), balance, EUR
  Slaven Belupo  1 ejercicio (2025), balance, EUR
  Varaždin       1 ejercicio (2025), balance, EUR

JAPÓN (10)
  Cerezo Osaka         1 ejercicio (2025), balance, JPY, sin deuda/caja
  FC Tokyo             1 ejercicio (2025), balance, JPY, sin deuda/caja
  Gamba Osaka          1 ejercicio (2025), balance, JPY, sin deuda/caja
  Kashima Antlers      1 ejercicio (2025), balance, JPY, sin deuda/caja
  Kawasaki Frontale    1 ejercicio (2025), balance, JPY, sin deuda/caja
  Nagoya Grampus       1 ejercicio (2025), balance, JPY, sin deuda/caja
  Sanfrecce Hiroshima  1 ejercicio (2025), balance, JPY, sin deuda/caja
  Urawa Red Diamonds   1 ejercicio (2025), balance, JPY, sin deuda/caja
  Vissel Kobe          1 ejercicio (2025), balance, JPY, sin deuda/caja
  Yokohama F. Marinos  1 ejercicio (2025), balance, JPY, sin deuda/caja

MÉXICO (1)
  Club América  1 ejercicio (2025), balance, MXN, sin deuda/caja

NL (4)
  Ajax       2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  AZ         2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  Feyenoord  2 ejercicios (2023/2024 a 2024/2025), balance, EUR
  PSV        2 ejercicios (2023/2024 a 2024/2025), balance, EUR

PERÚ (1)
  Alianza Lima  6 ejercicios (2019 a 2024), balance, PEN

===== CLUB-INDEX:END =====

---

## Si algo no cierra (números, totales)

Antes de tocar nada, correr una verificación aritmética simple (sumar las
categorías de Revenue del club/ejercicio en cuestión y comparar contra el
total oficial o de prensa conocido) antes de dar por buena una edición. Ya
pasó una vez (con Boca) que un redondeo de conversión de moneda hizo que el
total no cerrara; Guido lo notó enseguida. verifyTieOuts() automatiza esto
para los club-ejercicios que tienen un total conocido, mirá la consola del
navegador al cargar el sitio. Este archivo es para uso público de hinchas y
periodistas reales: la precisión importa más que la velocidad acá.
