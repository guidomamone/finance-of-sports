# ESTADO — finance-of-sports

**Qué hay armado hoy.** Este archivo es el snapshot del proyecto: qué existe, cómo
está organizado, y qué hay cargado de cada club. No es un log: si algo que dice acá
deja de ser cierto, se reemplaza, no se apila una línea nueva al lado de la vieja.

**Lo que NO está acá:**

- **Qué falta hacer** -> `TODO.md`.
- **Qué cambió y cuándo** -> `CHANGELOG.md`.
- **Por qué se decidió algo** -> `finance-of-sports-project.md`.
- **Reglas vigentes y trampas ya encontradas** -> `CONVENCIONES.md`. Leelo siempre.
- **Cómo funciona cada archivo del motor** -> `ARQUITECTURA.md`.

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
qué se decidió tal cosa?", NO está acá: está en `CHANGELOG.md` (resumen por
versión, 96 versiones) y en `finance-of-sports-project.md` (narrativa completa). Este bloque
se reescribe, no se acumula.

- SITIO: estático puro (HTML + CSS + JS, Chart.js por CDN), sin backend, sin
  build step, servido desde la raíz. Deploy continuo en Netlify al pushear a
  `main` del repo de GitHub. Dominio propio desde 2026-09-13:
  **financeofsports.com** (ver to-do 7: falta renombrar el repo en GitHub y
  re-linkearlo en Netlify, eso lo tiene que hacer Guido).
- ANALYTICS: Cloudflare Web Analytics desde la Versión 166 (snippet en el `<head>`
  de `index.html`) — visitas, pageviews, referrers y país, sin cookies ni banner de
  consentimiento. No mide funnel/eventos (para eso, Mixpanel queda como opción
  futura si hace falta).
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
- DATOS: 41 clubes cargados con al menos un ejercicio REAL (balance o presupuesto
  oficial), de 6 países: Argentina 11, Japón 10, España 10, Brasil 7, Colombia 2,
  México 1. Un solo motor genérico calcula Finanzas para todos (ver
  `ARQUITECTURA.md`); no queda ningún club con motor propio desde la Versión 102.
  El detalle club por club (qué ejercicio, qué fuente, qué es real y qué no) está
  más abajo en "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB", y con más detalle
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
  `tools/audit.js` avisa justo ese día. Ver `CONVENCIONES.md`.
- TAXONOMÍA DEL SELECTOR (Versión 137): `data/leagues.js` es el CATÁLOGO
  (6 deportes, 6 regiones, 6 países, 8 ligas con su escalón). NO tiene membresía
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
  que faltan. HOY: 82 de 85 verificadas, con la fuente anotada por bloque; las 3
  que faltan son presupuestos (Boca 2027, Racing 2026 y 2027). CRITERIO cuando un
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
  tiene 41 entradas y `sources{}` tiene 3, todas de Boca. Son 7 KB para los 41
  clubes contra los ~480 bytes POR CLUB de `clubs.js` (eran ~404 antes de que la
  Versión 178 le sumara `brandColor` y su comentario de cabecera). Su consumidor es el
  selector jerárquico, que desde la Versión 137 EXISTE: es de acá que salen el
  punto de calidad y el conteo de ejercicios de cada fila del panel, sin bajar un
  solo archivo de club. `yrs` se agregó para que el selector pueda además ofrecer
  un ejercicio puntual ("Balance 2024/2025") sin bajar nada.
- VERIFICACIÓN AUTOMÁTICA: `verifyTieOuts()` exige que cada ejercicio con total
  oficial conocido cierre contra el documento impreso, y `checkFxSanity()` que
  cada `fx` caiga en un rango plausible para su moneda. Hoy son 228 checks, 0
  mismatches, 0 warnings.
  COMPLEMENTO, DESDE LA VERSIÓN 122: `node tools/audit.js` audita en Node lo que un
  total correcto NO delata (ejercicios que no tienen ningún total contra qué
  compararse, categorías con typo o prestadas de la otra taxonomía, errores de
  escala, desgloses que no cierran contra su propia fila, catch-all dominante,
  ramas por club en el código). Carga `js/finanzas-calc.js` en un contexto de `vm`
  y llama al motor REAL, nunca reimplementa la cascada. Hoy: 0 P0, 0 P1, **2 P2**, 8 P3 y 23
  silenciados con su motivo en `tools/audit-ignore.json`. Los 2 que quedan son el mismo
  hallazgo (el catch-all de Vélez 2016 y 2017), diferido por Guido a una sesión propia
  (to-do 20(b)). Desde la Versión 125 audita además la PROCEDENCIA de cada
  tipo de cambio, no solo que exista y sea plausible, y `node tools/audit.js --fx`
  imprime los 89 tipos de cambio con su origen, agrupados por moneda.
  OJO CON LA COBERTURA: los clubes se cargan por demanda, y estas 2 funciones
  solo pueden revisar lo que está en memoria, así que una carga normal de la
  página audita SOLO Boca (6 de los 228 checks). Para auditar TODO hay que
  forzar la carga de los 41 clubes: abrí `?audit=1` o corré `auditAll()` en la
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
  Las 41 páginas, el índice y `sitemap.xml` los GENERA
  `node tools/generate-fuentes-page.js`: no se editan a mano, y el generador borra
  la página de un club que deje de existir (si no, Netlify la seguiría sirviendo).
  POR QUÉ POR CLUB Y NO POR PAÍS, que es lo que pedía el to-do viejo: el club es la
  unidad que el visitante busca y la única que puede rankear sola en un buscador.
  Hasta la 162 los 41 clubes compartían una URL de 86,5 KB; ahora el índice pesa
  14,5 KB y cada visitante se baja solo la página del club que mira.
  OJO CON QUÉ SE MUESTRA: `note` es INTERNA y no se renderiza nunca; lo que ve el
  visitante es `publicNote` (17 de 89 documentos) más las salvedades que
  `sourceCaveats()` deriva de los datos. Ver `CONVENCIONES.md` y
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
- LA PORTADA ES UNA PREGUNTA (Versión 144, reemplaza al `#coldHero` de la 137).
  Inicio abre con dos opciones grandes: "quiero ver un club en particular" (abre
  el selector y aterriza en Finanzas) o "quiero comparar dos clubes o ligas" (va
  a la pestaña Comparar). Abajo, si hay club, su resumen — los KPIs y los 3
  gráficos. Sin club elegido se ven Inicio, Comparar, Finanzas y Mi Cuenta;
  Fuentes aparece recién cuando hay uno. El club queda en `localStorage` y las
  visitas siguientes entran derecho a él. Ningún club se carga eager.
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
  es a propósito y ahora es una regla escrita en `CONVENCIONES.md`: los rubros de
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
  `CONVENCIONES.md` y `club-data-mapping/SKILL.md` sección 5.
- BRANDING: RESUELTO en la Versión 117 (decisión de Guido). La marca es distinta
  por idioma, a propósito: "El deporte en Números" en castellano, "Finance of
  Sports" en inglés (clave `site.name`, `data/lang/en.js`), que es además el
  dominio. Antes decía "Tu club en números", que ya no era cierto: el sitio dejó
  de ser solo de fútbol de clubes argentinos hace rato. El mail del formulario de
  contacto dejó de ser el placeholder `contacto@bocaennumeros.example` en la
  Versión 167: hoy el mailto va a `guidomamone91@gmail.com`.

---

## Dónde está cada cosa

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
- `tools/generate-club-index.js`: regenera la sección "QUÉ ES REAL POR CLUB" desde
  los propios datos. Corrélo después de onboardear un club, NO edites esa sección
  a mano. `--check` avisa si quedó desactualizada.
- `tools/generate-fuentes-index.js` (Versión 175): regenera la sección "Índice de
  países" de `fuentes-por-club.md` desde los `fuentes/_indice/<País>.md`. Corrélo
  después de una sesión de sourcing, NO edites esas líneas a mano. `--check` avisa
  si quedó vieja, `--debug` muestra la clasificación club por club. Cuando no puede
  decidir si un club tiene documento (la prosa matchea señales de los dos lados, o
  de ninguno) ABORTA en vez de adivinar: la decisión va a mano a `OVERRIDES`, adentro
  del script. Hoy hay 12, de la corrida original del 2026-09-20.
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
- `CONVENCIONES.md`: reglas permanentes de UI/datos y gotchas ya encontrados.
  LEELO antes de tocar el sitio: son criterios vigentes, varios pedidos
  explícitos de Guido que no se negocian sin preguntarle.
- `ARQUITECTURA.md`: qué hace cada archivo del proyecto y cómo funciona el motor
  genérico de Finanzas. Leelo cuando toques el motor o agregues un club.
- `CHANGELOG.md`: qué cambió en cada versión, condensado.
- `finance-of-sports-project.md`: la narrativa completa, con el razonamiento de cada
  decisión. Solo hace falta para entender el "por qué" de algo viejo.
- `CLAUDE.md`: instrucciones permanentes del proyecto (dónde guardar PDFs, qué
  skill leer antes de qué tarea, qué preguntarle a Guido antes de asumir).
- `.claude/skills/`: 6 skills propios (start-session-finance-of-sports-project,
  club-data-mapping, club-or-year-onboarding, club-sourcing,
  auditoria-finance-of-sports, escala-finance-of-sports). Se autodescubren cuando
  la sesión abre directo en `finance-of-sports/`; ver CLAUDE.md para el caso en
  que no.
- NO SE TRACKEAN, DESDE LA VERSIÓN 167, las notas internas de sourcing: los 613
  `fuentes/<País>/<Club>.md` y `fuentes/_indice/<País>.md` estaban servidos en
  `financeofsports.com/fuentes/<País>/<Club>.md` porque el repo se deploya entero, y
  37 de ellos mencionan a Guido por nombre. Regla en `.gitignore`: `fuentes/**/*.md`,
  que deja afuera a propósito los 41 `fuentes/<clubId>.html` generados, que SÍ son
  parte del sitio y siguen viajando. Los `.md` siguen en disco y se usan igual. OJO:
  los 12 `.md` de la RAÍZ (`TODO.md`, `CLAUDE.md`, `finance-of-sports-project.md`…)
  siguen publicados por el mismo motivo — es la to-do 39, y es decisión de Guido.
- `fuentes-por-club.md` (índice de países) → `fuentes/_indice/<País>.md` (una
  línea por club) → `fuentes/<País>/<Club>.md`: qué se buscó, qué se encontró y
  qué se descartó por club. Mirá ACÁ antes de salir a buscar un PDF. Hoy: 44
  países, 530 clubes trackeados, 339 con documento encontrado (de los cuales 41
  están cargados al sitio). Esos números y las 44 líneas de país NO se escriben a
  mano desde la Versión 175: los genera `node tools/generate-fuentes-index.js`.
- `dudas-por-club.md`: preguntas genuinamente abiertas, sin criterio asumido.

**YA NO ES CIERTO DESDE EL 2026-09-20: AHORA SÍ HAY `netlify.toml`.** Netlify sigue publicando la raíz, pero antes de publicar corre un comando que BORRA DEL ARTEFACTO DE DEPLOY los documentos internos (`CLAUDE.md`, `finance-of-sports-project.md`, `dudas-por-club.md`, las 613 notas de `fuentes/**/*.md`, `auditorias/` y `Prototyping/`). O sea: todo se trackea —el respaldo en GitHub está completo— y lo interno no se publica. Las 41 páginas `fuentes/<clubId>.html` SÍ se publican, son parte del sitio. Ver `netlify.toml`, que explica por qué destrackear estaba mal y por qué hacer el repo privado no alcanzaba. **Si dejás un archivo nuevo en el repo, sigue publicándose salvo que lo agregues a esa lista.**

---

===== CLUB-INDEX:START (generado por tools/generate-club-index.js, no editar a mano) =====
QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB
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

TOTAL: 41 clubes, 85 ejercicios, 6 países.

ARGENTINA (11)
  Argentinos Juniors       5 ejercicios (2014/2015 a 2018/2019), balance, ARS
  Boca Juniors             2 ejercicios (2024/2025, 2026/2027), balance + presupuesto, ARS
  Estudiantes de La Plata  4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Independiente            1 ejercicio (2023/2024), balance, ARS
  Instituto ACC            1 ejercicio (2023/2024), balance, ARS
  Racing Club              17 ejercicios (2008/2009, 2009/2010, 2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2017/2018, 2018/2019, 2019/2020, 2020/2021, 2023/2024, 2024/2025, 2025/2026, 2026/2027), balance + presupuesto y balance + presupuesto, USD/ARS
  River Plate              1 ejercicio (2023/2024), balance de réplica no oficial, ARS
  Rosario Central          1 ejercicio (2022/2023), balance, ARS
  San Lorenzo              8 ejercicios (2010/2011, 2011/2012, 2012/2013, 2013/2014, 2014/2015, 2015/2016, 2016/2017, 2023/2024), balance + presupuesto, ARS
  Unión                    4 ejercicios (2021/2022 a 2024/2025), balance, ARS
  Vélez Sarsfield          11 ejercicios (2014/2015 a 2024/2025), balance, ARS

BRASIL (7)
  Atlético Goianiense  1 ejercicio (2025), balance, BRL
  Botafogo             1 ejercicio (2024), balance, BRL
  Coritiba             1 ejercicio (2024), balance, BRL
  Cruzeiro             1 ejercicio (2025), balance, BRL
  Grêmio               1 ejercicio (2024), balance, BRL
  Ituano               1 ejercicio (2024), balance, BRL
  Mirassol             1 ejercicio (2024), balance, BRL, sin deuda/caja

COLOMBIA (2)
  Envigado FC  1 ejercicio (2025), balance, COP
  Once Caldas  1 ejercicio (2025), balance, COP, sin deuda/caja

ESPAÑA (10)
  Athletic Club       1 ejercicio (2024/2025), balance, EUR
  Atlético de Madrid  1 ejercicio (2024/2025), balance, EUR
  Celta de Vigo       1 ejercicio (2024/2025), balance, EUR
  Deportivo Alavés    1 ejercicio (2024/2025), balance, EUR
  FC Barcelona        1 ejercicio (2024/2025), balance, EUR
  Real Betis          1 ejercicio (2024/2025), balance, EUR
  Real Madrid         1 ejercicio (2024/2025), balance, EUR
  Sevilla FC          1 ejercicio (2024/2025), balance, EUR
  Valencia CF         1 ejercicio (2024/2025), balance, EUR
  Villarreal CF       1 ejercicio (2023/2024), balance, EUR

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
