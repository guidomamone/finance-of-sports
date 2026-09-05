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
así que leerlos implica renderizar página por página como imágenes con el Read
tool — caro en tokens. Guido quiere poder iterar sobre CÓMO se muestra un
número (probar formatos, reclasificaciones, layouts) sin que cada prueba
implique volver a abrir el PDF de página en página. Con el `.md` ya
transcripto, esas iteraciones futuras leen texto plano — rápido y barato.

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
