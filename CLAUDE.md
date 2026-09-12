# numeros-de-boca — instrucciones permanentes

Este es un proyecto SEPARADO del sitio profesional de Guido (el resto de
"Website propio"). No mezclar contenido, código, ni decisiones de deploy
entre los dos.

## Al empezar a trabajar acá

Leé primero el comentario HTML al principio de `index.html` (antes de
`<html lang="es">`). Ese bloque es la fuente única de verdad del estado
actual del proyecto: qué hay armado, qué dato es real vs. placeholder por
club, y una to-do list en orden de prioridad. Leelo vos solo, sin que Guido
tenga que pedirlo o resumirlo.

Revisá también si hay algo nuevo pegado en `fuentes-por-club.md` — es donde
Guido deja links a documentos oficiales o notas de prensa antes de que se
carguen al sitio. Si hay algo ahí que el comentario de `index.html` todavía
no menciona como cargado, es trabajo pendiente.

Si al leer un documento fuente queda una pregunta genuina sin respuesta (algo
que no se puede inferir con confianza de la fuente ni de los criterios ya
documentados en los skills), anotala en `dudas-por-club.md` (Versión 81, a
pedido de Guido: "la idea es hacer reach out a clubes y preguntarles") en vez
de asumir un criterio o dejarla perdida en un comentario de código — es la
lista que Guido usa para escribirles directo a los clubes.

**Si la tarea toca datos financieros de un club** (cargar un balance/presupuesto
nuevo, recategorizar un rubro, tocar el tipo de cambio de un ejercicio, agregar
un club nuevo): leé ANTES de tocar nada `.claude/skills/club-data-mapping/SKILL.md`
(cómo mapear el documento del club al esquema del sitio) y
`.claude/skills/club-or-year-onboarding/SKILL.md` (cómo encarar la sesión y qué
arquitectura ya existe para reusar). Esto es necesario decirlo explícito acá
porque `numeros-de-boca` es un repo Git separado anidado dentro de este
workspace — el descubrimiento automático de skills de Claude Code no llega
hasta `numeros-de-boca/.claude/skills/`, así que esos dos archivos NO aparecen
solos en la lista de skills disponibles de una sesión, hay que leerlos a mano
con el Read tool. Sin este párrafo, una sesión puede categorizar un rubro o
convertir una moneda contradiciendo un criterio ya decidido, sin enterarse de
que existía (pasó de verdad, ver "Cómo mantener este skill" al final de cada
uno de los dos archivos para el criterio de cuándo actualizarlos).

## Antes de terminar la sesión

Si se hizo algún cambio real al sitio (datos, features, estructura, copy,
lo que sea), actualizá el comentario HTML de `index.html` para que siga
siendo verdad, SIN que Guido tenga que pedirlo explícitamente:

- **ESTADO ACTUAL**: reflejar lo que cambió.
- **QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB**: actualizar si se cargó,
  reemplazó o verificó algún dato.
- **TO-DO LIST**: sacar o tachar lo que ya se resolvió, reordenar si
  cambió la prioridad, agregar lo nuevo que haya quedado pendiente.
- Agregar una entrada nueva **"VERSIÓN N"** al bloque de historial (el que
  sigue después del separador `===`), con qué se hizo y por qué — mismo
  formato que las entradas anteriores (V10, V11, V12...).

No dupliques la to-do list en `Proyecto Boca.md`. Ese archivo es la
historia narrativa completa, para consulta opcional — la lista oficial de
próximos pasos vive solo en `index.html`, para que no haya dos listas que
se puedan desincronizar. Si el cambio es lo bastante grande como para
merecer contexto narrativo (el "por qué", no solo el "qué"), ahí sí vale
agregarle una entrada corta a `Proyecto Boca.md` también, en el mismo
estilo que las versiones anteriores.

## Estructura de carpetas de documentos fuente: Clubes/<País>/<Club>/ (PDF y transcripción juntos)

Todos los PDFs fuente Y sus transcripciones a Markdown viven JUNTOS, en la
misma carpeta: `numeros-de-boca/Clubes/<País>/<Club>/` — NO carpetas sueltas
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
nueva al nivel raíz de `numeros-de-boca/` por club o por país.

Dentro de la carpeta de cada club podés tener subcarpetas propias si hace
falta separar por tipo o por procedencia del documento (ej.
`Clubes/Argentina/River/estados-contables-leads/` para el PDF de fuente no
oficial — Y su transcripción, juntos ahí también, mismo criterio) — eso sí
está bien, lo que no escala es una carpeta nueva por club al nivel raíz del
proyecto.

## Cada PDF nuevo: transcribirlo a Markdown ANTES de usarlo

Cuando se descarga o recibe un PDF nuevo para este proyecto (balance, presupuesto,
lo que sea), lo primero que se hace con él — antes de extraer datos, antes de
cargar nada al sitio — es transcribir el contenido COMPLETO a un archivo
`.md`, en LA MISMA carpeta que el PDF: `numeros-de-boca/Clubes/<País>/<Club>/`
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
los datos que se vayan a cargar a `yearsRaw`/`nativeFinancialsBoca`/etc., y
para cualquier experimentación de formato que pida Guido más adelante sobre
ese mismo documento.

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
  código. `location.reload()`, `Cmd+Shift+R` y hasta parar/re-lanzar
  `preview_start` en el mismo puerto pueden NO alcanzar. Lo que funcionó:
  agregar un query string cache-buster a la URL del `navigate()`
  (`http://localhost:PUERTO/index.html?nocache=<número cualquiera>`), abrir
  una pestaña nueva (`tabs_create`), o, si eso tampoco alcanza, cambiar el
  puerto del server en `.claude/launch.json` (nuevo puerto = origen nuevo =
  caché nueva garantizada) y devolverlo después. Confirmalo ejecutando
  `Object.keys(algunaConstDeEseArchivo)` o
  `document.querySelector('style').textContent.includes('tu regla nueva')`
  con `javascript_tool` ANTES de concluir que el cambio "no funciona".
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
