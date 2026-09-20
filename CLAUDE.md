# finance-of-sports — instrucciones permanentes

Este es un proyecto SEPARADO del sitio profesional de Guido (`Guidomamone-pm`,
repo `guidomamone-website`). No mezclar contenido, código, ni decisiones de
deploy entre los dos.

**Desde el 2026-09-15 esta carpeta vive como hermana de la del sitio
profesional** (`Claude/Projects/finance-of-sports/` y `Claude/Projects/
Guidomamone-pm/`, ambas debajo de `Claude/Projects/`), no anidada adentro
como antes. Cada una es su propio repo Git con su propio remoto
(`guidomamone/finance-of-sports` acá, `guidomamone/guidomamone-website` el
otro) — no hay un working tree compartido, así que no existe el riesgo de
que un `git add`/commit en un repo arrastre archivos del otro. Por eso ya
no hace falta ninguna línea de `.gitignore` sosteniendo la separación (la
que existía cuando este repo estaba anidado, `finance-of-sports/` en el
`.gitignore` del sitio profesional, se borró en el mismo movimiento y no
hay que recrearla). El riesgo que SÍ sigue existiendo, y que ningún
acomodo de carpetas elimina, es el humano: abrir una sesión de Claude Code
en el directorio equivocado y editar o commitear el proyecto que no era —
conviene chequear el `pwd`/remote al arrancar si hay dudas.

Nada del código depende del nombre de esta carpeta ni de dónde esté
ubicada: no hay `netlify.toml`, ni `CNAME`, ni build step que lo requiera.
El repo de GitHub es `guidomamone/finance-of-sports` y el dominio
`financeofsports.com`; el nombre viejo (`numeros-de-boca`) sigue
redirigiendo.

## Al empezar a trabajar acá

Leé primero `ESTADO.md` (qué hay armado hoy, y qué hay cargado de cada club) y
`TODO.md` (qué falta hacer, en orden de prioridad). Leelos vos solo, sin que Guido
tenga que pedirlo o resumirlo.

Hasta la Versión 137 las dos cosas vivían adentro de un comentario HTML al
principio de `index.html`. Se movieron a archivos propios el 2026-09-14, a pedido
explícito de Guido ("Index NO es el archivo para tener to do. Eso era al inicio"):
eran 80 KB de los 183 KB de `index.html`, que además se bajaba cada visitante en
cada pageview. En `index.html` quedó un puntero de 15 líneas.

Revisá también si hay algo nuevo pegado en `fuentes-por-club.md` — es donde
Guido deja links a documentos oficiales o notas de prensa antes de que se
carguen al sitio. Si hay algo ahí que `ESTADO.md` todavía no menciona como
cargado, es trabajo pendiente.

El sourcing está partido en TRES niveles, cada uno porque el anterior dejó de
escalar al sumarse decenas de clubes y después decenas de países:

1. `fuentes-por-club.md` — índice de PAÍSES y nada más (una línea por país:
   cuántos clubes trackeados, cuántos con documento encontrado, fecha del
   chequeo más viejo). Se partió así en la sesión 2026-09-20, cuando tenía 570
   líneas-club y ~97 KB.
2. `fuentes/_indice/<País>.md` — una línea por club de ese país, con estado
   resumido + fecha de último chequeo. Es lo que hasta el 2026-09-20 vivía
   adentro de `fuentes-por-club.md`.
3. `fuentes/<País>/<Club>.md` — el contenido real de cada club (links, qué se
   probó, qué falta). Se partió así en la sesión 2026-09-13. Un
   `fuentes/<País>/_notas-generales.md` por país junta notas que no son de un
   club específico (metodología del barrido, contexto regulatorio, etc.).

Al agregar una fuente nueva para un club: si ya tiene archivo en `fuentes/`,
editar ESE archivo (y actualizar su línea en `fuentes/_indice/<País>.md` si
cambió el estado/fecha); si es un club nuevo sin archivo todavía, crear
`fuentes/<País>/<Club>.md` y agregar su línea al índice de su país. La línea del
país en `fuentes-por-club.md` se toca solo si cambió alguno de sus números.

**Un archivo por país es también lo que evita que dos sesiones se pisen**: dos
agentes sourceando países distintos al mismo tiempo no comparten ningún archivo.
Con el índice único eso ya causó conflictos de merge reales.

Si al leer un documento fuente queda una pregunta genuina sin respuesta (algo
que no se puede inferir con confianza de la fuente ni de los criterios ya
documentados en los skills), anotala en `dudas-por-club.md` (Versión 81, a
pedido de Guido: "la idea es hacer reach out a clubes y preguntarles") en vez
de asumir un criterio o dejarla perdida en un comentario de código — es la
lista que Guido usa para escribirles directo a los clubes.

Este proyecto tiene 6 skills en `.claude/skills/`. Según la tarea, leerlos es
OBLIGATORIO, no opcional:

- `start-session-finance-of-sports-project`: el checklist de arranque y de cierre
  de CUALQUIER sesión acá (qué leer y en qué orden, cómo verificar, qué
  documentar, la regla de git). **Empezá por este, sea cual sea la tarea.**
- `club-data-mapping`: **si la tarea toca datos financieros de un club** (cargar
  un balance/presupuesto nuevo, recategorizar un rubro, tocar el tipo de cambio de
  un ejercicio, agregar un club nuevo) — cómo mapear el documento del club al
  esquema del sitio. Antes de tocar nada.
- `club-or-year-onboarding`: en esa misma tarea — cómo encarar la sesión y qué
  arquitectura ya existe para reusar, en vez de reinventarla por club.
- `club-sourcing`: **si la tarea es BUSCAR/encontrar PDFs de un club o país que
  todavía no tiene nada cargado**, antes de que exista ningún documento para
  mapear (qué regulador o canal público chequear según el país, gotchas de
  portales específicos ya descubiertos).
- `auditoria-finance-of-sports`: si la tarea es una auditoría de rutina del
  proyecto entero (Versión 123).
- `escala-finance-of-sports`: **si la tarea es un chequeo de escala/capacidad** (qué se rompe
  cuando el proyecto pasa de 50 a 200-3000 clubes cargados) — pedido explícito de Guido antes de
  un cambio grande, o como contenido del eje `escala` al correr `auditoria-finance-of-sports`
  (Versión 159). Distinto de una auditoría de datos: no mira si un número está bien, mira si el
  archivo/estructura que lo guarda o lo muestra va a aguantar el volumen.

CÓMO LLEGAR A ELLOS. Esto depende de dónde se abrió la sesión, y lo que decía acá
antes dejó de ser cierto (corregido en la Versión 124):

- **Sesión abierta directamente en `finance-of-sports/`**, que es lo normal desde
  la Versión 120: los 6 aparecen solos en la lista de skills disponibles y se
  invocan por nombre. NO hace falta abrirlos con el Read tool.
- **Sesión abierta en la carpeta de arriba (`Website propio/`)**: este es un repo
  Git separado anidado ahí, y el descubrimiento automático puede no llegar hasta
  `finance-of-sports/.claude/skills/`. Si no los ves en la lista, leelos a mano
  con el Read tool.

La obligación de leerlos no cambia en ninguno de los dos casos, y por eso este
párrafo sigue existiendo: sin él, una sesión puede categorizar un rubro, convertir
una moneda, o repetir una búsqueda ya descartada, contradiciendo un criterio ya
decidido sin enterarse de que existía (pasó de verdad, ver "Cómo mantener este
skill" al final de cada archivo para el criterio de cuándo actualizarlos).

## Antes de terminar la sesión

Si se hizo algún cambio real al sitio (datos, features, estructura, copy,
lo que sea), actualizá estos dos archivos para que sigan siendo verdad, SIN que
Guido tenga que pedirlo explícitamente:

- **`ESTADO.md`**: reflejar lo que cambió. Es un snapshot, no un log: si algo que
  decía ahí ya no es cierto, se reemplaza o se borra, no se apila una línea nueva
  al lado de la vieja. Su sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" NO
  se escribe a mano: se regenera con `node tools/generate-club-index.js`.
- **`TODO.md`**: BORRAR lo que se resolvió (no marcarlo como "RESUELTO" y dejarlo
  ahí, que es como la lista vieja terminó con la mitad de los puntos siendo cosas
  ya hechas: la historia queda en `CHANGELOG.md`), reordenar si cambió la
  prioridad, y agregar lo nuevo que haya quedado pendiente. Los números son
  identificadores estables, no prioridad: un punto nuevo toma el siguiente al más
  alto, nunca un hueco libre.

**El historial de versiones no vive con el estado** (hasta la Versión 101 sí,
estaba adentro del mismo bloque, y dejó de escalar). En cambio:

- Agregar SIEMPRE una entrada nueva a `CHANGELOG.md` (misma carpeta): unas
  pocas líneas (Keep a Changelog style — qué cambió, no por qué), no un
  párrafo largo. Esto es obligatorio para cualquier cambio real, chico o
  grande.
- Agregar además una entrada a `finance-of-sports-project.md` SOLO si el cambio amerita
  contexto narrativo completo (el "por qué", el proceso de investigación, un
  bug real con su causa raíz) — no todos los cambios lo ameritan, un ajuste
  chico de UI puede quedar solo en `CHANGELOG.md`. Cuando sí amerita, el
  mismo número de versión de `CHANGELOG.md` identifica la entrada
  correspondiente en `finance-of-sports-project.md`.

No dupliques la to-do list en `finance-of-sports-project.md` ni en `CHANGELOG.md`. La
lista oficial de próximos pasos vive solo en `TODO.md`, para que no haya dos
listas que se puedan desincronizar.

## Estructura de carpetas de documentos fuente: Clubes/<País>/<Club>/ (PDF y transcripción juntos)

Todos los PDFs fuente Y sus transcripciones a Markdown viven JUNTOS, en la
misma carpeta: `finance-of-sports/Clubes/<País>/<Club>/` — NO carpetas sueltas
tipo `racing-pdfs/`, `river-pdfs/` al nivel raíz (eso fue un error temprano,
corregido en la Versión 17), y NO dos árboles paralelos separados para PDFs
y para transcripciones (eso fue el esquema `PDFs/` + `pdf-extracts/` de la
Versión 17, reemplazado en la Versión 28 a pedido de Guido: quería el PDF y
su transcripción uno al lado del otro, no en dos carpetas distintas que hay
que mantener sincronizadas).

Ejemplo actual: `Clubes/Argentina/Boca/`, `Clubes/Argentina/River/`,
`Clubes/Argentina/Racing/`. País y club van CAPITALIZADOS (`Argentina`,
`Boca`, `River`, `Racing` — no `argentina`/`boca` en minúscula). Ojo: esto es
distinto del criterio que sigue usando el CÓDIGO del sitio para los
`clubId` (`boca`, `river`, `racing`, siempre en minúscula) — son dos
convenciones separadas a propósito, una para carpetas (legible para Guido en
Finder), otra para identificadores internos (consistente con el resto del
código). Si en el futuro se agrega un club de otro país (ej. Flamengo,
Brasil), la carpeta nueva es `Clubes/Brasil/Flamengo/` — NUNCA una carpeta
nueva al nivel raíz de `finance-of-sports/` por club o por país.

Dentro de la carpeta de cada club podés tener subcarpetas propias si hace
falta separar por tipo o por procedencia del documento (ej.
`Clubes/Argentina/River/estados-contables-leads/` para el PDF de fuente no
oficial — Y su transcripción, juntos ahí también, mismo criterio) — eso sí
está bien, lo que no escala es una carpeta nueva por club al nivel raíz del
proyecto.

**OJO CON LO QUE SE TRACKEA, que no es lo mismo que lo que se guarda (2026-09-17).**
El repo entero se deploya: no hay `netlify.toml` ni `_redirects`, Netlify publica
la raíz, así que CUALQUIER archivo trackeado queda servido en
`financeofsports.com/<su ruta>`. Los PDFs no viajan (`*.pdf` está en `.gitignore`),
pero las transcripciones `.md` sí, y son 106 MB de los 110 MB del repo. Para un
balance oficial eso está bien y hasta es coherente con el proyecto. Para un
documento que NO es del dominio del club, no: la carpeta
`Clubes/Argentina/River/estados-contables-leads/` está en `.gitignore` por eso —
el PDF se consiguió en una réplica de la comunidad tuRiver. Los archivos siguen en
la máquina y se usan igual; lo único que cambia es que no se publican. **Si
aparece otra fuente no oficial, mismo criterio: se guarda, no se trackea.**

## Cada PDF nuevo: transcribirlo a Markdown ANTES de usarlo

Cuando se descarga o recibe un PDF nuevo para este proyecto (balance, presupuesto,
lo que sea), lo primero que se hace con él — antes de extraer datos, antes de
cargar nada al sitio — es transcribir el contenido COMPLETO a un archivo
`.md`, en LA MISMA carpeta que el PDF: `finance-of-sports/Clubes/<País>/<Club>/`
(crear las carpetas si no existen), con el mismo nombre base que el PDF (ej.
`Memoria y Balance al 30-06-2025.pdf` → `memoria-y-balance-2024-25.md`, los
dos juntos en `Clubes/Argentina/Boca/`).

Por qué: estos PDFs suelen ser escaneos sin capa de texto (pdftotext no sirve),
así que leerlos implica OCR o (si no hay más remedio) renderizar página por
página como imágenes con el Read tool — caro en tokens. Guido quiere poder
iterar sobre CÓMO se muestra un número (probar formatos, reclasificaciones,
layouts) sin que cada prueba implique volver a abrir el PDF de página en
página. Con el `.md` ya transcripto, esas iteraciones futuras leen texto
plano — rápido y barato.

Actualizado (Versión 90 de `index.html`, onboarding de Vélez Sarsfield): para
un PDF escaneado sin capa de texto, antes de recurrir al Read tool sobre
imágenes, instalar Tesseract (`brew install tesseract tesseract-lang`) y
generar la transcripción con `pdftoppm -png -r 300` + `tesseract -l spa
--psm 6` página por página — mucho más barato en tokens, y el OCR de tablas
numéricas resultó muy confiable en la práctica. Ver
`.claude/skills/club-data-mapping/SKILL.md` sección 15 para el flujo
completo (incluye qué hacer con tablas anchas rotadas 90° en el escaneo, y
cómo verificar los números del OCR fila por fila antes de cargarlos).

Qué transcribir: TODO el documento, página por página, en el mismo orden,
incluyendo tablas (como tablas Markdown o listas alineadas, lo que se lea
mejor), números exactos tal cual figuran impresos (sin redondear, sin
reclasificar a ninguna categoría del sitio todavía — eso es un paso aparte,
después), y una marca de página (ej. `--- pág. 76 ---`) antes de cada una para
poder citar la fuente exacta más adelante. Es una transcripción fiel, no un
resumen: si se resume o se salta contenido "poco relevante", se pierde
justamente el dato suelto que capaz hace falta en una sesión futura.

Una vez que el `.md` está armado, se usa ESE archivo (no el PDF) para extraer
los datos que se vayan a cargar a `<club>RevenueLinesByYear`/
`<club>ExpenseLinesByYear`/etc. (ver `data/river-data.js` para el shape, el
mismo que usan todos los clubes incluida Boca desde la Versión 102), y para
cualquier experimentación de formato que pida Guido más adelante sobre ese
mismo documento.

## Precisión antes que velocidad

Este sitio es para uso público de hinchas y periodistas reales. Antes de
dar por buena una carga de datos financieros, correr una verificación de
que los rubros suman el total oficial o de prensa conocido (ver
`verifyTieOuts()` en `index.html`, y sumarle el chequeo nuevo si agregás un
club-ejercicio con un total conocido contra qué comparar).

## Gotchas de tooling (aplican a CUALQUIER sesión, no solo onboarding de datos)

Trampas del entorno de testing de este proyecto, no del sitio en sí — se
mudaron acá (antes vivían dentro de `club-or-year-onboarding/SKILL.md`) porque
son igual de relevantes para una sesión que solo toca CSS o una función de
render que para una que carga un balance nuevo, y este archivo (a diferencia
de los skills de `.claude/skills/`) se lee siempre, sea cual sea la tarea.

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
- **Un diálogo nativo abierto (`alert`/`confirm`) congela TAMBIÉN las herramientas
  de debug** (sesión 2026-09-13, Versión 137, costó una hora). Si `javascript_tool`
  empieza a dar timeout, si un `setTimeout` de 300 ms no resuelve, o si un
  `loadClubData()` queda "pendiente para siempre" aunque su request haya devuelto
  200, sospechá de un `alert()` abierto ANTES de buscar un bug de concurrencia: un
  diálogo nativo bloquea el hilo entero, así que ni los timers ni el `onload` de un
  `<script>` inyectado ni tu propia sonda desde la consola llegan a correr. Se
  destraba navegando con `force:true`. Y la moraleja para el sitio quedó como regla
  en `CONVENCIONES.md`: ningún camino de error usa `alert()`.
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
- **`grep -oP '.{20}CARACTER.{20}'` (u otro cuantificador de caracteres
  alrededor de un carácter especial) puede fallar en silencio cerca de
  acentos**: el cuantificador `.{N}` con `-P` (PCRE) en este entorno no
  cuenta bien caracteres cuando hay vocales acentuadas cerca (más, línea,
  categoría, año) del texto en español, así que una línea real puede
  simplemente no aparecer en el resultado, dando una falsa sensación de "ya
  no queda ninguna". El chequeo confiable: `grep -n 'CARACTER' archivo` (sin
  capturar contexto con un cuantificador de caracteres, solo el número de
  línea) y revisar cada línea completa a mano.
- **`pdfinfo archivo.pdf | grep "^Pages:"` puede devolver VACÍO en silencio
  si el PDF trae bytes NUL en sus metadatos** (encontrado en la transcripción
  masiva de la Versión 156/157, con PDF de clubes chinos generados por
  PDFsharp: el campo `Producer` arrastra restos de un string UTF-16 de
  Windows sin convertir, con bytes `\0` de por medio). `grep` detecta esos
  bytes NUL, decide que el stream es binario, y deja de hacer matching línea
  por línea — así que la línea `Pages:` (que viene DESPUÉS de `Producer` en
  la salida de `pdfinfo`) nunca aparece, aunque `pdfinfo` sin pipear muestre
  todo bien. Síntoma típico: una variable de cantidad de páginas que queda
  vacía y rompe el comando siguiente (`seq 1 ""` → "invalid floating point
  argument"), no un error de `pdfinfo` en sí. El fix es `grep -a` (fuerza a
  tratar el input como texto pase lo que pase) en vez de `grep` a secas,
  cualquier vez que se parsee la salida de `pdfinfo` (o de cualquier otra
  herramienta que pueda traer metadata binaria) con grep.
- **Varios agentes de sourcing en paralelo (subagentes del `Agent` tool) pueden compartir el mismo
  Browser pane** (sesión 2026-09-16, barrido de LaLiga en simultáneo con Brasil): una pestaña se
  navegó sola a un sitio de otro agente en medio de la búsqueda. No es un bug del portal que se
  estaba investigando. La vuelta que funcionó: cada agente abre su propia pestaña con `tabs_create`
  al arrancar y fija ese `tabId` explícito en cada llamada del Browser tool, en vez de operar sobre
  "la pestaña activa" por defecto. Si se lanzan sourcing agents en paralelo que usan el browser,
  decírselo en el prompt.
