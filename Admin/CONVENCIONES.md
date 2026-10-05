# Convenciones y gotchas vigentes

Reglas permanentes y trampas ya encontradas que una sesión nueva TIENE que
respetar. Antes vivían sueltas dentro del bloque "ESTADO ACTUAL" del comentario
de `index.html`, mezcladas con el historial de versiones: se movieron acá en la
Versión 114 porque son criterios VIGENTES, no historia: el historial se lee una
vez y se olvida, esto hay que tenerlo a mano cada vez que se toca el sitio.

Cada bullet conserva la versión en la que se decidió, para poder rastrear el
porqué completo en `Admin/CHANGELOG.md` (resumen) o `Admin/finance-of-sports-project.md` (narrativa).
Las que dicen "pedido explícito de Guido" no son negociables sin preguntarle.

Si una decisión nueva contradice algo de acá, actualizá ESTE archivo en la misma
sesión: si no, la próxima sesión va a seguir la regla vieja sin enterarse.

---
Este archivo tiene las reglas de proceso, que valen en cualquier sesión. Las de datos y las de pantalla viven aparte y se leen solo
cuando la tarea las toca: `Admin/CONVENCIONES-DATOS.md` (al cargar o corregir datos de un club) y `Admin/PANTALLA.md` (al tocar `js/`,
`index.html` o CSS). Al final está el índice de cada regla mudada, para que una búsqueda por su versión siga llegando.

- DOS SESIONES EN PARALELO: UNA EN `main`, LA OTRA EN UN WORKTREE (Versión 200, pedido de Guido para
  correr onboarding y sourcing al mismo tiempo). Dos sesiones sobre el MISMO working tree se pisan
  en silencio: no hay bloqueo de archivos, así que la segunda escritura gana y la primera se pierde
  sin que nada avise. Pasó el 2026-09-22 con tres sesiones de documentación. La separación es un
  worktree (`git worktree`), que convierte un clobber invisible en un conflicto de merge visible.
  - **El ONBOARDING va en `main`, el SOURCING en el worktree.** No es simétrico, y el motivo es
    `Clubes/`: hay 2881 PDFs y 10 GB ahí, y **ninguno está trackeado** (solo las transcripciones
    `.md`). Un worktree nace sin un solo PDF. El onboarding necesita el PDF del club que carga, que
    ya está en el árbol principal; el sourcing los crea. Además el onboarding necesita el preview
    para `auditAll()`, y `.claude/launch.json` tiene el puerto fijo con `autoPort:false`.
  - **Un PDF bajado en el worktree NO viaja al mergear**, porque `*.pdf` está en `.gitignore`. Si
    borrás el worktree, se perdió el documento fuente. Consolidalos con `rsync` al árbol principal
    ANTES de hacer `git worktree remove`, o simplemente no borres el worktree.
  - **El número de Versión se decide al MERGEAR, no al escribir.** Las dos ramas van a querer el
    mismo. El que mergea segundo renumera su entrada; el conflicto al final de `Admin/CHANGELOG.md`
    es esperable y mecánico.
  - **Un archivo GENERADO no se mergea a mano: se regenera.** Si hay conflicto en `fuentes/README.md`,
    `fuentes.html`, `sitemap.xml`, `data/club-index.js`, `data/rankings/*.js` o
    `Admin/ESTADO-clubes.md` (el bloque CLUB-INDEX, aparte de `Admin/ESTADO.md` desde la Versión 239),
    tomá cualquiera de los dos lados, mergeá, y corré el generador que
    corresponda. Resolverlos línea por línea es cómo se mete un dato que ningún documento respalda.
  - **Un país por sesión de sourcing.** `fuentes/_indice/<País>.md` y `fuentes/<País>/` son de un
    solo país a propósito (ver el porqué en `CLAUDE.md`): dos sesiones en países distintos no
    comparten un solo archivo y no pueden conflictuar.

- DÓNDE VA UN DOCUMENTO NUEVO, Y POR QUÉ NO ES UNA CUESTIÓN DE ORDEN (Versión 196, pedido de Guido:
  *"the entire project has too many files scattered. i want some order"*). **Todo documento interno
  va adentro de `Admin/`.** Interno = escrito para Guido o para una sesión futura: estado, reglas,
  pendientes, notas, planes, historia. Si lo dejás suelto en la raíz **se publica**: Netlify sirve
  la raíz del repo, y lo único que no sale es lo que `netlify.toml` borra del artefacto de deploy —
  que desde esta versión es `Admin/` entera, con un solo `rm -rf`, en vez de una lista de nombres a
  la que había que acordarse de sumar cada archivo nuevo. Esa lista ya se escapó tres veces, la
  última con `COMO-CORRE-EL-PROYECTO.html` servido en producción. `node tools/audit.js` lo caza
  (`doc-interno-no-excluido`, P2) si te olvidás.
  - **La extensión no dice nada sobre si un documento es interno.** El chequeo miraba solo `.md` y
    por eso no vio el `.html` durante semanas. Hoy mira las dos.
  - **`CLAUDE.md` es la única excepción y se queda en la raíz**, porque Claude Code lo carga por
    convención desde ahí. Tiene su propia línea en `netlify.toml`.
  - **Nunca agregues una regla por nombre suelto al `.gitignore` para "no publicar" algo.** Publicar
    y respaldar son dos problemas distintos (ver la cabecera de `netlify.toml`): el `.gitignore`
    resuelve el segundo al revés de como se quiere. Y un patrón sin barra matchea en CUALQUIER
    nivel, así que una regla `<NOMBRE>.md` también ignora `Admin/<NOMBRE>.md` — es exactamente la trampa que
    esta versión desarmó.

- LO QUE ESTÁ CERRADO SE ARCHIVA, NO SE BORRA NI SE APILA (Versión 196). `Admin/Archive/` es para
  documentos que cumplieron su función entera y pasaron a ser historia: un plan con todos sus puntos
  cerrados, una sección que ahora se genera desde los datos. **Antes de archivar algo, sacale lo que
  todavía sirve** y llevalo a donde se lee — un criterio vivo a este archivo o a la skill que
  corresponda, un pendiente a `Admin/TODO.md`. Si no queda nada que rescatar, probablemente había
  que borrarlo y no archivarlo. Lo archivado lleva un banner que dice de qué Versión es, porque sus
  rutas y sus números son los de ese día. Ver `Admin/Archive/README.md`.

- UNA PREMISA VENCIDA EN LA TO-DO SE ESCRIBE AL CERRAR EL PUNTO (auditoría del eje `tokens`,
  2026-09-20). Cuando una tarea se resuelve y el motivo por el que estaba trabada resultó FALSO, no
  alcanza con borrar el punto: hay que dejar escrito que la premisa estaba vencida, en la entrada de
  `Admin/CHANGELOG.md` y, si el punto sigue vivo en parte, en el propio `Admin/TODO.md`.
  POR QUÉ, con los casos que lo motivaron: la to-do 21(a) daba 5 tipos de cambio por irrecuperables
  con dos motivos y los dos estaban vencidos (los PDFs de San Lorenzo "nunca se transcribieron" —
  lo están desde el 2026-09-17; la transcripción de Vélez "no preservó la columna de cambio
  vigente" — su Anexo VI la tiene). Se resolvieron leyendo archivos que ya estaban en disco. La
  to-do 25 mandaba a revisar `renderFinanzasStatsFromComputed`, borrada en la Versión 102.
  Una premisa vencida no hace perder la tarea: **la hace parecer más cara de lo que es, y por eso
  queda al fondo de la lista para siempre.** Escribirlo es la única señal de que los OTROS puntos
  de la lista también pueden estar en la misma situación — fue así como, después del primer caso,
  se encontró el segundo.
- REGLA DE ESTILO (Versión 42, pedida por Guido: "los odio a los em dashes"): no usar el carácter
  em dash (—, U+2014) en ningún texto nuevo de este archivo, ni en comentarios ni en copy visible
  para el usuario. Usar punto y arrancar oración nueva, coma, dos puntos o paréntesis según
  corresponda. La ÚNICA excepción es el carácter "—" usado como símbolo de "sin dato"/"no aplica"
  en celdas de tabla (`fmtPctDisplay`/`fmtPctOfTotal`/varios `td` de
  `buildNativeSectionHtml`/`renderNativePLTable`/etc.): ese uso no es puntuación de una oración, es
  un símbolo de tabla, y se mantiene igual que siempre. Toda la prosa del archivo (este comentario
  incluido) y
  los 2 skills de `.claude/skills/` se limpiaron de em dashes en esta sesión.

## Índice de las reglas que viven en otro archivo

- DÓNDE PUEDE VIVIR UN DATO INVENTADO, Y DÓNDE NO (Versión 152, actualizada en la 155 cuando el → `Admin/CONVENCIONES-DATOS.md`
- QUÉ SE TRADUCE Y QUÉ NO (Versión 138, cierra la decisión que el to-do 19(c) dejaba abierta). → `Admin/PANTALLA.md`
- NO EXISTE NINGUNA ARISTA CLUB -> LIGA SIN AÑO (Versión 137, decisión de arquitectura que salió → `Admin/CONVENCIONES-DATOS.md`
- "SIN DATO" NO ES CERO (Versión 137 para la comparación, ampliado en la 152 a la ficha de → `Admin/CONVENCIONES-DATOS.md`
- INGRESO EXTRAORDINARIO: SE QUEDA EN `exceptional_items` (decisión de Guido, 2026-09-20, to-do → `Admin/CONVENCIONES-DATOS.md`
- "LA FUENTE REPORTA CERO" NO ES "LA FUENTE NO LO DESGLOSA" (to-do 20(h), Versión 172, decisión de → `Admin/CONVENCIONES-DATOS.md`
- NADA DE `alert()` EN UN CAMINO DE ERROR (Versión 137, bug real que costó una hora de sesión). Un → `Admin/PANTALLA.md`
- UNA PÁGINA FUERA DE LA RAÍZ TIENE QUE DECLARAR `window.I18N_BASE` (Versión 162, bug real de esta → `Admin/PANTALLA.md`
- TODO ARCHIVO DE `js/` QUE LLAME A `t()` VA EN LA LISTA DE `tools/audit.js` (Versión 137). El → `Admin/PANTALLA.md`
- LA LIGA DE UN EJERCICIO ES LA DEL CIERRE (Versión 132, decidido por Guido). Cuando un ejercicio → `Admin/CONVENCIONES-DATOS.md`
- EL `clubId` DE UN CLUB NUEVO LLEVA EL PAÍS AL FINAL (Versión 129, decidido antes del selector → `Admin/CONVENCIONES-DATOS.md`
- `note` ES INTERNA Y NO SE RENDERIZA NUNCA; LO QUE VE EL VISITANTE ES `publicNote` (Versión 127, → `Admin/CONVENCIONES-DATOS.md`
- PROCEDENCIA DEL TIPO DE CAMBIO: TODO `fx` DECLARA DE DÓNDE SALIÓ (Versión 125, a pedido de Guido: → `Admin/CONVENCIONES-DATOS.md`
- ASSET_V SE SUBE EN DOS LUGARES, NO EN UNO (Versión 125, bug real de esta sesión): `window.ASSET_V` → `Admin/PANTALLA.md`
- SEGUNDO EJERCICIO NUEVO DE SAN LORENZO + REGLA DE PRESUPUESTOS EN CAJA (Versión 97, Guido: "quiero → `Admin/CONVENCIONES-DATOS.md`
- 2 BUGS REALES CORREGIDOS + REGLA NUEVA DE ORDEN DEL DROPDOWN (Versión 96): (1) Boca (club default) → `Admin/PANTALLA.md`
- REGLA (Versión 50, Guido: "(presupuestado)" pegado al año se superponía con el header "% DEL → `Admin/PANTALLA.md`
- REGLA PERMANENTE (Versión 189, pedido explícito de Guido, REEMPLAZA a la regla de la Versión 49 → `Admin/CONVENCIONES-DATOS.md`
- REGLA PERMANENTE (Versión 189): Ingresos tiene 2 filas nuevas, **"Educación"** (`education`) y → `Admin/CONVENCIONES-DATOS.md`
- REGLA HISTÓRICA (Versión 49, pedido explícito de Guido en su momento, VIGENTE HASTA LA VERSIÓN → `Admin/Archive/convenciones-historia.md`
- REGLA REFORZADA (Versión 48, Guido: "urnifica, tienen que ser exactamente iguales los nombres"): → `Admin/PANTALLA.md`
- REGLA PERMANENTE (Versión 47, extiende la regla de la Versión 46, pedido explícito de Guido: "la → `Admin/PANTALLA.md`
- REGLA PERMANENTE (Versión 46, pedido explícito de Guido): "Formato simplificado" de CUALQUIER → `Admin/PANTALLA.md`
- REGLA (Versión 44, mismo pedido que la Versión 43 pero para "Gestión"): el → `Admin/PANTALLA.md`
- REGLA (Versión 43, bug real de UX reportado por Guido): el `<select id="anioSelect">` ("Año" de → `Admin/PANTALLA.md`
- REGLA VIGENTE (Versión 42, reemplaza la regla de las Versiones 34-35/41, ver bullet más abajo): → `Admin/PANTALLA.md`
- REGLA PARA EL FUTURO (Versión 40, pedido explícito de Guido: "es mi manera de hacerte un → `Admin/PANTALLA.md`
- REGLA (Versión 39, bug real de layout + una regresión propia corregida en la misma sesión): → `Admin/PANTALLA.md`
- REGLA (Versión 38, corrige un bug real de categorización): antes de meter algo adentro de → `Admin/CONVENCIONES-DATOS.md`
- REGLA (Versión 37, bug visual): el "$" del eje Y del gráfico de barras (card Gráficos) no → `Admin/PANTALLA.md`
- REGLA (Versión 36, pedida por Guido: "detesto que hagas eso"): la cita de fuente ("Fuente: ...") → `Admin/PANTALLA.md`
- REGLA (Versiones 34-35, pedida por Guido, no es opcional, "homologar lo que se pueda → `Admin/PANTALLA.md`
- OJO REGLA REFORZADA (bug real, Versión 30): NUNCA cargar datos al sitio → `Admin/CONVENCIONES-DATOS.md`
- OJO Ejercicio 2027 tiene categorías EXTRA en el Formato simplificado que → `Admin/CONVENCIONES-DATOS.md`
- OJO clase `bocaPresupuestoOficialCard`: pese al nombre, NO es "solo para → `Admin/PANTALLA.md`
- OJO `Object.keys()` sobre un objeto con claves que parecen enteros → `Admin/PANTALLA.md`
- OJO texto fijo dibujado a mano en un <canvas> de Chart.js: el "$" del eje Y → `Admin/PANTALLA.md`
- OJO alineación en `<summary>` de acordeón (`details.accordion>summary`): usa → `Admin/PANTALLA.md`
- OJO stats de arriba de Finanzas: el stat "Gastos" (`#finanzasStats`) SIEMPRE → `Admin/PANTALLA.md`
- REGLA DEL COLOR DE CADA CLUB (Versión 178, decisión de Guido al cerrar el to-do → `Admin/PANTALLA.md`
- OJO CON EL ESTADO DE UI A NIVEL DE MÓDULO EN `js/selector.js` (Versión 174). → `Admin/PANTALLA.md`
- OJO Chart.js: el script tag pinea la versión exacta de cdnjs → `Admin/PANTALLA.md`
- **YA NO ES CIERTO DESDE EL 2026-09-20: AHORA SÍ HAY `netlify.toml`.** Netlify sigue publicando la raíz, pero antes… → `Admin/Archive/convenciones-historia.md`
- REGLA (a pedido de Guido): un presupuesto en año CALENDARIO se reconstruye a temporada, nunca se carga tal cual (ex… → `Admin/CONVENCIONES-DATOS.md`
