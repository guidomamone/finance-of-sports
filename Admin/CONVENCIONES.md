<!-- md: reglas de proceso vigentes | leer: cuando la skill de la tarea lo pide -->
# Convenciones y gotchas vigentes

Reglas permanentes y trampas ya encontradas que una sesión nueva TIENE que respetar: criterios vigentes, sin historia. El porqué de cada
una y cuándo se decidió está en `Admin/CHANGELOG.md` (resumen) o `Admin/finance-of-sports-project.md` (narrativa).
Las que dicen "pedido explícito de Guido" no son negociables sin preguntarle.

Si una decisión nueva contradice algo de acá, actualizá ESTE archivo en la misma
sesión: si no, la próxima sesión va a seguir la regla vieja sin enterarse.

---
Este archivo tiene las reglas de proceso, que valen en cualquier sesión. Las de datos y las de pantalla viven aparte y se leen solo
cuando la tarea las toca: `Admin/CONVENCIONES-DATOS.md` (al cargar o corregir datos de un club) y `Admin/PANTALLA.md` (al tocar `js/`,
`index.html` o CSS). Al final está el índice de cada regla mudada: su título y el archivo donde vive.

- DOS SESIONES EN PARALELO: dos sesiones sobre el mismo working tree se pisan en silencio, así que cada sesión paralela va en su worktree (hoy se trabaja en una sola; cómo era: `Admin/Archive/modo-varias-sesiones.md`).
  - **Después de mergear una rama con JSON de club en el esquema viejo (1.0)**: `node tools/migrar-v2.mjs --escribir` en la principal
    (idempotente: con los chequeos de sumas en verde, solo escribe los que estaban en 1.0).

- ONBOARDING CARGA, PIPELINE ARREGLA, AUDITORA APRUEBA (pedido de Guido: "quitarme de en medio en los arreglos de script").
  Tres sesiones de worktree con un rol cada una; la principal mergea, corre los comandos y hace de correo. En el modo de una sola sesión
  (`CLAUDE.md`, «Modo de trabajo») la misma sesión toma un rol por vez y el circuito de abajo se colapsa; valen igual el registro de frenados,
  la medición antes del arreglo y los criterios de la Auditora.
  - **Onboarding solo carga.** No edita `tools/`. Si un documento frena por un defecto de script, lo anota en
    `Admin/registros/frenados-por-script.jsonl` (una línea: `{"pdf", "defecto", "detalle", "sesion", "fecha"}`; `defecto` es la letra del
    TODO si ya existe, o una descripción corta), lo deja y sigue con el resto. No le pregunta a Guido por eso.
    Si lo destraba a mano (edita un JSON, un ajuste, `club-leagues`, `contexto-manual` o corre un paso distinto), también lo anota ahí,
    con qué hizo y qué tendría que hacer la tool: un arreglo a mano que no se comparte se vuelve a pagar en la próxima carga (Guido).
  - **Antes de frenar un año, la Auditora** (Guido). Si un documento no cierra, queda con casos en la cola sin precedente o iría a
    `Admin/dudas-por-club.md`, Onboarding no lo deja parado: le manda el caso a la Auditora, que lo clasifica: (a) se resuelve con un ajuste
    con precedente (devuelve cuál, con la cita, y Onboarding lo carga); (b) es un criterio nuevo (votación, con la regla de materialidad);
    (c) de verdad necesita al club (recién entonces va a `dudas-por-club.md`). Un defecto de script sigue yendo a `frenados-por-script.jsonl`.
  - **Un frenado resuelto se marca en su misma línea** con `"resuelto": "<letra o commit> <fecha>"` (o `"no era defecto: <qué se hizo> <fecha>"`); la marca la pone Pipeline al destrabar. Sin `resuelto` = pendiente.
  - **Pipeline es la única que toca `tools/`, y va siempre después.** Toma los frenados en orden. Por cada defecto: diseño, medición
    gratis (`medir-verificar`, `medir-cargar` o la que corresponda) y un informe corto para la auditora. No commitea hasta el veredicto.
  - **La auditora aprueba o rechaza en lugar de Guido.** Solo lee y escribe su veredicto en `Admin/registros/auditoria-proceso.jsonl` (y la
    REGLA que sale de una votación, en `Admin/CONVENCIONES-DATOS.md`; skill `votacion-de-criterios`).
    Aprueba sola cuando se cumple todo: (1) la medición no cambia ningún año ya cargado; (2) el cambio no agrega un criterio de datos
    nuevo (perímetro, categoría, período, tratamiento de una partida); (3) cierra los casos que dice cerrar. Si falla (1) o (3), rechaza
    con el motivo. Si es (2), va a `votacion-de-criterios`. Una condición nueva en una tool (frenazo, aviso, filtro, pregunta, o un cambio en
    lo que asume) la decide ella con la sección 7 de `auditoria-finance-of-sports`; a Guido va solo si cambia ese criterio.
    También audita las cargas de onboarding con la skill `auditoria-finance-of-sports`: sumas, fuentes, nada cargado a mano sin evidencia.
  - **Cualquier sesión, no solo onboarding, pasa por la Auditora** cuando propone una condición nueva en una tool o un criterio de datos.
    Le escribe directo a la Auditora abierta (es la excepción a «solo a la principal»); si no hay ninguna, a la principal, que la abre.
    No se codea ni se commitea antes del veredicto.
  - **A Guido solo le llega lo que cambia un criterio**, junto en un mensaje numerado de la principal por día.
  - **El circuito:** frenado → pipeline (diseño y medición) → auditora → commit → la principal mergea y le devuelve a onboarding (o a una
    sesión nueva) la lista de documentos destrabados, que los carga o los vuelve a frenar.
  - **Cada sesión corre sus propios lotes y tiene un presupuesto** (Guido). La sesión larga sus lotes en su carpeta, en
    segundo plano (`caffeinate -i node tools/lote.mjs … --ejecutar`), y lee el resultado sola; ni Guido ni la principal largan lotes
    en la carpeta de otra. Guido fija un presupuesto total en US$ por sesión. Antes de cada corrida paga, el ensayo gratis da el costo:
    si entra en lo que queda, se corre sin preguntar; si no, se frena y se le avisa a la principal. La cuenta sale de `node tools/gasto.mjs --sesion <la carpeta del worktree>` (cada llamada nueva lleva su sesión; lo anterior figura «(sin marca)»)
    (lee los registros de la API) y va en la nota de la sesión. La auditora compara, en cada merge, lo gastado contra el presupuesto y
    los ensayos, y marca la plata tirada: lotes que no escribieron nada, reintentos repetidos, corridas dobles.
  - **Lo que ya viene estructurado no se paga con IA.** Si el documento trae las cifras etiquetadas o en un formato que se lee sin
    interpretar (iXBRL o XBRL, el XML o CSV del depósito, los códigos NBB), la carga sale de ahí; la IA entra solo para lo que esa
    lectura no cubre, y el ensayo lo dice documento por documento. Lo vigilan la skill de onboarding (sección 4), la de auditoría
    (sección 4) y el freno de `tools/lote.mjs`.
  - **Una regla que se tiene que cumplir va a un chequeo, no a la memoria de una sesión** (Guido: «son parches»). Primero `audit.js`
    (que el hook corre antes de cada commit: P0 y P1 frenan) o el hook de `tools/hooks/pre-tool.mjs`; si no se puede chequear, a
    estas convenciones, `PANTALLA.md`, `CONVENCIONES-DATOS.md` o la skill que corresponda. La memoria de una sesión no cuenta como arreglo.
  - **Las sesiones de worktree le escriben solo a la principal, corto** (Guido: lo que escribe una sesión es lo más
    caro en tokens, y Guido lee solo a la principal). Nada de explicaciones para Guido. El aviso de fin de turno va en 3 a 5 líneas
    (qué quedó, qué pide, cuánto gastó), y el detalle va en la nota de la sesión, no en el chat.
  - **Bath Rugby es un club de prueba** (la taxonomía por deporte): no abre el rugby ni otros deportes al sourcing ni a los lotes.
  - **Un documento que la localización ya marcó `sin_estado` no se vuelve a correr** con `--rehacer` ni `--reintentar`: el ensayo ya
    lo avisa a costo 0, y reintentar no hace aparecer una tabla que el `.md` no tiene (Auditora, 2026-10-20; Colombia corrió tres veces por eso).
  - **El número de lote lo da la principal.** Las listas de corrida (`Admin/registros/.lote-lista-actual.txt` y compañía) son de cada
    carpeta; dos lotes en carpetas distintas pueden correr a la vez, dos en la misma no.
  - **Un commit que corrige un dato publicado lleva el trailer `Corrige: <motivo>`**: una frase en español, para un hincha o un
    periodista, sin jerga ni números de to-do (opcional `Corrige-en:` en inglés). Corregir es cambiar un importe, una categoría, las filas,
    un total, la caja o la deuda, la moneda, el tipo de cambio, la fuente o el perímetro de un ejercicio que ya estaba en el sitio; un año
    o un club nuevo no lo es. Si el commit ya salió, una línea en `Admin/registros/correcciones.jsonl` (`commit`, `club`, `anio`,
    `motivo_es`, `motivo_en`, `fuente`). El motivo se publica en el registro de correcciones; `audit.js` da `correccion-sin-motivo` (P2).

- DÓNDE VA UN DOCUMENTO NUEVO, Y POR QUÉ NO ES UNA CUESTIÓN DE ORDEN (pedido de Guido:
  *"the entire project has too many files scattered. i want some order"*). La regla (todo documento
  interno va adentro de `Admin/`; la extensión no dice si es interno; `CLAUDE.md` es la única excepción)
  está en `CLAUDE.md`, "DÓNDE PONER UN DOCUMENTO NUEVO". Acá el porqué: Netlify sirve
  la raíz del repo, y lo único que no sale es lo que `netlify.toml` borra del artefacto de deploy —
  que desde esta versión es `Admin/` entera, con un solo `rm -rf`, en vez de una lista de nombres a
  la que había que acordarse de sumar cada archivo nuevo. Esa lista ya se escapó tres veces, la
  última con `COMO-CORRE-EL-PROYECTO.html` servido en producción. El chequeo `doc-interno-no-excluido`
  (P2 de `node tools/audit.js`) mira `.md` y `.html` (miraba solo `.md` y no vio el `.html` durante semanas).
  `CLAUDE.md` se queda en la raíz porque Claude Code lo carga por convención desde ahí; tiene su propia línea en `netlify.toml`.
  - **Nunca agregues una regla por nombre suelto al `.gitignore` para "no publicar" algo.** Publicar
    y respaldar son dos problemas distintos (ver la cabecera de `netlify.toml`): el `.gitignore`
    resuelve el segundo al revés de como se quiere. Y un patrón sin barra matchea en CUALQUIER
    nivel, así que una regla `<NOMBRE>.md` también ignora `Admin/<NOMBRE>.md` — es exactamente la trampa que
    esta versión desarmó.

- LO QUE ESTÁ CERRADO SE ARCHIVA, NO SE BORRA NI SE APILA. La regla (y qué se rescata antes
  de archivar) está en `CLAUDE.md`. `Admin/Archive/` es para
  documentos que cumplieron su función entera y pasaron a ser historia: un plan con todos sus puntos
  cerrados, una sección que ahora se genera desde los datos. Si no queda nada que rescatar,
  probablemente había que borrarlo y no archivarlo. Lo archivado lleva un banner que dice de qué Versión es, porque sus
  rutas y sus números son los de ese día. Ver `Admin/Archive/README.md`.

- Cerrar un punto del TODO con una premisa vencida: `CLAUDE.md`, «Modo de trabajo».
- UNA RAREZA DEL DOCUMENTO YA REVISADA SE REGISTRA UNA VEZ, DONDE LA LEEN LAS TOOLS: una errata (una fecha, un nombre o una cifra mal impresa)
  que alguien ya miró y explicó va a `Admin/registros/rarezas.jsonl` (documento, línea, texto, qué es, veredicto con cita, autor y fecha), con
  `node tools/rarezas.mjs`. Todo chequeo o tool que vuelve a encontrar algo raro en esa línea la da por vista y no la marca de nuevo. Una nota en
  texto libre (en `auditoria.jsonl` o en el motivo de un ajuste) sirve para el lector, pero no para la tool: no alcanza. Caso: Goiás 2018, el informe
  del auditor fechado «24 de abril de 2018» para el ejercicio 2018.
- UN PUNTO NUEVO DEL TODO ARRANCA CON «Terminado cuando:»: la lista cerrada de lo que entra (clubes, años, archivos, tools) y la prueba de que está hecho. Lo que aparece en el camino y no está en esa lista va a un punto nuevo; el punto se cierra cuando se cumple su lista, aunque haya salido trabajo nuevo.
- REGLA DE ESTILO (pedida por Guido: "los odio a los em dashes"): la regla vale SOLO para el
  texto visible del sitio (copy de la página, traducciones, notas públicas): no usar el carácter
  em dash (—, U+2014). Usar punto y arrancar oración nueva, coma, dos puntos o paréntesis según
  corresponda. En documentos internos, skills y comentarios de código no aplica (decisión de Guido). La ÚNICA excepción dentro del sitio es el carácter "—" usado como símbolo de "sin dato"/"no aplica"
  en celdas de tabla (`fmtPctDisplay`/`fmtPctOfTotal`/varios `td` de
  `buildNativeSectionHtml`/`renderNativePLTable`/etc.): ese uso no es puntuación de una oración, es
  un símbolo de tabla, y se mantiene igual que siempre.

- UNA FUENTE EXTERNA NUEVA SE ANOTA ANTES DE PUBLICAR (Guido). Antes de publicar datos que salgan de una fuente externa nueva
  (una cotización, un deflactor, una lista, Wikipedia…), se suma a `Admin/fuentes-externas.md` con sus términos leídos en su página: qué
  permite y si deja reventa. La licencia del sitio está en `terminos.html` ("Licencia y reuso").

- **LO QUE SE DECIDE O SE DESCUBRE SE ESCRIBE EN EL LUGAR DONDE SE VA A LEER, EN EL MISMO TURNO;** lo que una máquina puede vigilar lo vigila una máquina. Dónde queda cada tipo:

| Tipo | Hoy | Tiene que quedar en | Lo vigila |
|---|---|---|---|
| Decisión de Guido en el chat | memoria | `CONVENCIONES*.md` / skill (propuesta en `Admin/propuestas/`) | hook `memoria-no-es-regla` |
| Pregunta resuelta | dentro de la pregunta | `Admin/carga-clubes/<id>.md`; se borra de dudas | `audit.js` `duda-resuelta-en-dudas` |
| Pregunta abierta que frena una carga | solo `dudas-por-club.md` | también en `Admin/TODO.md` | convención de formato |
| Descarte medido | CHANGELOG (se archiva en 7 días) | una línea en `HALLAZGOS-pipeline.md` | `audit.js` `medicion-sin-destino` |
| «Retomar si…» | prosa | un número que una tool imprime (`gasto.mjs`, `estado.mjs`) | la tool |
| Medición paga | archivo crudo | HALLAZGOS + `Conclusión:`/`Destino:` arriba; el crudo a Archive | `audit.js` `medicion-sin-destino` |
| Pendiente de una nota de sesión | `Admin/sesiones/` y después `Archive/` | `TODO n` / regla / HALLAZGOS / descartado, con flecha | aviso en `worktree.mjs mergear` |
| Registro | `Admin/registros/` | con lector declarado en un README | `audit.js` `registro-sin-lector` |
| Historia en un doc de criterio | texto | `Admin/CHANGELOG.md` | `audit.js` `historia-en-doc-de-criterio` |

## Índice de las reglas que viven en otro archivo

- DÓNDE PUEDE VIVIR UN DATO INVENTADO, Y DÓNDE NO → `Admin/CONVENCIONES-DATOS.md`
- QUÉ SE TRADUCE Y QUÉ NO → `Admin/PANTALLA.md`
- NO EXISTE NINGUNA ARISTA CLUB -> LIGA SIN AÑO → `Admin/CONVENCIONES-DATOS.md`
- "SIN DATO" NO ES CERO → `Admin/CONVENCIONES-DATOS.md`
- INGRESO EXTRAORDINARIO: SE QUEDA EN `exceptional_items` → `Admin/CONVENCIONES-DATOS.md`
- "LA FUENTE REPORTA CERO" NO ES "LA FUENTE NO LO DESGLOSA" → `Admin/CONVENCIONES-DATOS.md`
- NADA DE `alert()` EN UN CAMINO DE ERROR → `Admin/PANTALLA.md`
- UNA PÁGINA FUERA DE LA RAÍZ TIENE QUE DECLARAR `window.I18N_BASE` → `Admin/PANTALLA.md`
- TODO ARCHIVO DE `js/` QUE LLAME A `t()` VA EN LA LISTA DE `tools/audit.js` → `Admin/PANTALLA.md`
- LA LIGA DE UN EJERCICIO ES LA DEL CIERRE → `Admin/CONVENCIONES-DATOS.md`
- EL `clubId` DE UN CLUB NUEVO LLEVA EL PAÍS AL FINAL → `Admin/CONVENCIONES-DATOS.md`
- `note` ES INTERNA Y NO SE RENDERIZA NUNCA; LO QUE VE EL VISITANTE ES `publicNote` → `Admin/CONVENCIONES-DATOS.md`
- PROCEDENCIA DEL TIPO DE CAMBIO: TODO `fx` DECLARA DE DÓNDE SALIÓ → `Admin/CONVENCIONES-DATOS.md`
- ASSET_V SE SUBE EN DOS LUGARES, NO EN UNO: `window.ASSET_V` → `Admin/PANTALLA.md`
- REGLA DE PRESUPUESTOS EN CAJA → `Admin/CONVENCIONES-DATOS.md`
- REGLA DE ORDEN DEL DROPDOWN → `Admin/PANTALLA.md`
- "(presupuestado)" pegado al año no se superpone con el header "% DEL TOTAL" → `Admin/PANTALLA.md`
- INGRESOS TIENE LAS FILAS "Educación" (`education`) Y "Otras secciones deportivas" → `Admin/CONVENCIONES-DATOS.md`
- "Formato simplificado" de CUALQUIER club → `Admin/PANTALLA.md`
- El `<select id="anioSelect">` ("Año" de Finanzas) → `Admin/PANTALLA.md`
- El "$" del eje Y del gráfico de barras (card Gráficos) → `Admin/PANTALLA.md`
- La cita de fuente ("Fuente: ...") → `Admin/PANTALLA.md`
- NUNCA cargar datos al sitio sin antes… → `Admin/CONVENCIONES-DATOS.md`
- Ejercicio 2027: categorías EXTRA en el Formato simplificado → `Admin/CONVENCIONES-DATOS.md`
- Clase `bocaPresupuestoOficialCard`: pese al nombre, NO es "solo para Boca" → `Admin/PANTALLA.md`
- `Object.keys()` sobre un objeto con claves que parecen enteros → `Admin/PANTALLA.md`
- Texto fijo dibujado a mano en un <canvas> de Chart.js: el "$" del eje Y → `Admin/PANTALLA.md`
- Alineación en `<summary>` de acordeón (`details.accordion>summary`) → `Admin/PANTALLA.md`
- El stat "Gastos" de arriba de Finanzas (`#finanzasStats`) → `Admin/PANTALLA.md`
- EL ESTADO DE UI A NIVEL DE MÓDULO EN `js/selector.js` → `Admin/PANTALLA.md`
- Chart.js: el script tag pinea la versión exacta de cdnjs → `Admin/PANTALLA.md`
- Hay `netlify.toml`: lo interno se borra del deploy → `Admin/Archive/convenciones-historia.md`
- UN PRESUPUESTO EN AÑO CALENDARIO SE RECONSTRUYE A TEMPORADA, NUNCA SE CARGA TAL CUAL → `Admin/CONVENCIONES-DATOS.md`
- Otras reglas de pantalla y de datos que ya no tienen título propio acá: `Admin/PANTALLA.md` y `Admin/CONVENCIONES-DATOS.md`, que se leen enteros cuando la tarea las toca.
