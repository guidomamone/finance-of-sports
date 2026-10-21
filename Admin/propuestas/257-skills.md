# 257 — Skills que faltan, memorias a su lugar y el candado de las skills

Propuesta, sin aplicar nada: no toqué `.claude/skills/` ni la memoria. Sesión Orden 1 (rama `proyecto`).
Los bloques «Texto exacto» son lo que se pegaría, palabra por palabra, si Guido da el ok. Cada cambio a una skill existente dice archivo y sección; la línea exacta la fija quien lo aplique, con Edit, después del ok.
Lo que es un chequeo nuevo (`tools/hooks/pre-tool.mjs`, `tools/audit.js`) lo aprueba la Auditora 4 antes de codearse (CONVENCIONES, sección 7 de su skill). Se lo mandé aparte; abajo, «Chequeos».

Contenido:
1. Qué hacer con cada memoria (27)
2. Skills nuevas: producto/pantalla, contenido y difusión, contrato de datos, deploy/release, y una quinta que las memorias piden: la sesión principal
3. Cambios a skills y documentos existentes
4. Chequeos (hooks y `audit.js`)
5. El candado: que un cambio de skill no se aplique sin que Guido haya visto el texto
6. Orden para aplicarlo

---

## 1. Cada memoria: dónde va

Criterio: una regla de trabajo no vive en la memoria (Guido: «son parches»). Lo que una máquina puede vigilar va a un chequeo; lo que es criterio va a una convención o skill; lo que ya está cubierto se borra. `MEMORY.md` queda vacío cuando se muevan todas.

Estado: **ya cubierta** = el repo ya la hace cumplir o la dice (verificado con `grep` en esta sesión); borrar la memoria no pierde nada.

| # | Memoria | Va a | Detalle |
|---|---|---|---|
| 1 | `base-seria-dale` | skill principal (2.5) | qué decide la principal sin preguntar y qué va a Guido |
| 2 | `clubes-desaparecidos-si-valen` | `club-sourcing`, sección 0 | texto en 3.1 |
| 3 | `comando-en-el-mensaje-final` | skill principal | formato de cierre de turno |
| 4 | `comandos-sin-pedir-permiso` | **ya cubierta**: hook `comandos-simples` (deny de `/tmp`, `cd … &&`, `$(…)`, `$VAR`) | lo que no cubre el hook (editar con Edit/Write y no con `sed -i`/python; Read y Bash simple en vez de heredocs) va en 4.5 |
| 5 | `comandos-y-disenos-en-el-texto-final` | skill principal | formato de cierre |
| 6 | `docs-de-criterio-sin-historia-ni-contadores` | chequeo `doc-de-criterio-con-historia` + una línea en la skill de arranque | 3.2 y 4.2 |
| 7 | `el-merge-lo-hace-main` | **ya cubierta**: hook `merge-en-worktree` y `worktree.md`; falta una línea (`git merge-tree` para anticipar conflictos) | 3.4 |
| 8 | `merge-trampas` | skill principal (trampas) y dos arreglos de `worktree.mjs` | 2.5 y 4.6 |
| 9 | `no-archivar-sin-preguntar` | hook `archivar-con-ok` (ask) + skill principal | 4.3 |
| 10 | `no-asignar-mails-sin-pedido` | `club-outreach`, sección «cuándo» | 3.3 (ya lo dice el TODO 335, pero el TODO se borra) |
| 11 | `no-borrar-pdfs-de-clubes` | **ya cubierta**: hook `pdfs-con-ok` | borrar |
| 12 | `no-editar-skills-sin-avisar` | el candado de la parte 5 | borrar cuando el candado esté |
| 13 | `no-endurecer-reglas-sin-preguntar` | **ya cubierta**: CONVENCIONES «ONBOARDING CARGA, PIPELINE ARREGLA, AUDITORA APRUEBA» y sección 7 de la skill de auditoría | borrar |
| 14 | `no-frenar-carga-por-socios` | `club-or-year-onboarding`, «La cola» + un punto en el TODO (que `perfil-en-cola` nunca frene) | 3.5 |
| 15 | `no-haiku-sonnet-batch` | `club-or-year-onboarding`, sección de costos | 3.5. `club-sourcing` ya dice Haiku afuera (0.1b) |
| 16 | `no-reabrir-criterios-categoria` | `CONVENCIONES-DATOS.md`, una línea general | 3.6 |
| 17 | `no-recordar-push` | **ya cubierta**: skill de arranque, sección 6 («no se hace, no se pide y no se menciona») | borrar |
| 18 | `notificar-al-esperar-input` | skill principal | formato de cierre |
| 19 | `opus-solo-avisando` | hook `modelo-opus-con-ok` (ask) + skill principal | 4.4 |
| 20 | `paso-a-paso-juntos` | skill de arranque («Cómo se trabaja con Guido») + skill principal | 3.2 |
| 21 | `plan-en-panel-plan` | skill principal | plan vivo |
| 22 | `principal-filtra-y-corre` | skill principal | avisos y formato fijo |
| 23 | `scripts-y-api-antes-que-tokens` | **ya cubierta**: `club-or-year-onboarding/SKILL.md` (dólares de API sí, tokens de sesión no, dentro del presupuesto) | borrar |
| 24 | `subagentes-sin-bash` | **ya cubierta**: hook `subagente-con-regla` | borrar |
| 25 | `tools-no-importar-para-chequear` | **ya cubierta**: hook `no-importar-tools` | borrar |
| 26 | `un-mensaje-preguntas-en-orden` | skill principal + skill de arranque | 3.2 |
| 27 | `worktrees-en-modo-auto` | hook `worktree-sin-permission-mode` (deny) + skill principal | 4.4 |

Resultado: 8 se borran sin más (4, 11, 13, 17, 23, 24, 25 y, con una línea, 7); 6 son un chequeo nuevo (6, 9, 12, 19, 27 y parte de 8); el resto va a una skill o convención. Ninguna se queda como memoria.

---

## 2. Skills nuevas

Formato: igual que las existentes (frontmatter `name` y `description`, cuerpo corto, sin historia, sin contadores, sin «to-do N»). Cada una termina con «Cómo mantener esta skill» como las demás.

### 2.1 `producto-y-pantalla-finance-of-sports`

Por qué: hoy el proceso de una pantalla (mockup, ok, construir, verificar en celular) vive repartido en `Admin/PANTALLA.md` (reglas de código), `Prototyping/README.md` y la memoria. `PANTALLA.md` tiene 980 líneas de reglas y trampas; falta el orden de trabajo.

**Texto exacto:**

```markdown
---
name: producto-y-pantalla-finance-of-sports
description: Cómo se diseña y se construye una pantalla o un cambio visible del sitio finance-of-sports, del pedido a la verificación en celular. Usar siempre que Guido pida una pantalla, un card, un cambio de diseño o un texto visible, antes de tocar `index.html`, `js/` o `css/`. Las reglas de código y las trampas están en `Admin/PANTALLA.md`; esto es el orden.
---

# Una pantalla, de punta a punta

1. **Leer** `Admin/ESTADO.md` y, de `Admin/PANTALLA.md`, solo la sección de la pantalla que se toca («Cómo funciona cada pantalla») y «Convenciones de pantalla y código».
2. **Mockup antes de código.** Un cambio que se ve (un card, una tabla, un flujo) se dibuja primero en `Prototyping/<Tema>/mockup-N.html` con números reales del motor, o en el artifact de Design «Pantallas FoS». Guido lo ve y dice sí o no. Sin su ok no se construye. Si dice no, se rehace el mockup, no el código.
3. **Construir** lo aprobado y nada más. Cada texto visible pasa por `t()` (español e inglés). Un archivo de `js/` que llame a `t()` va en la lista de `tools/audit.js`. Lo que se escribe en `index.html` o `js/` viaja al visitante: sin comentarios internos.
4. **Verificar, siempre, sin pedirle a Guido que mire:**
   - `preview_start` y recarga con `?cb=<nuevo>` (subí `ASSET_V` si tocaste `js/` o `data/`).
   - `?audit=1` en la consola: no crecen los «no cierran» ni los warnings.
   - Escritorio y 375 px (`resize_window` preset `mobile`), en español y en inglés, sin scroll horizontal ni texto cortado a la mitad de una palabra.
   - `read_console_messages`: sin errores nuevos.
   - `node tools/audit.js`: 0 P0 y 0 P1.
5. **Dejar escrito:** lo que la pantalla hace hoy, en `Admin/PANTALLA.md` («Cómo funciona cada pantalla»); si se decidió una regla, en «Convenciones de pantalla y código». El mockup aprobado se conserva en `Prototyping/` con una nota arriba que diga qué decisiones explica y que sus números son de relleno.
6. Commit local. Nada de push.

## Cómo mantener esta skill

Si aparece un paso que no está acá, proponele a Guido el texto exacto y esperá su ok.
```

### 2.2 `contenido-y-difusion-finance-of-sports`

Por qué: el 313 (X e Instagram) y el 257 piden convertir un año cargado en una publicación con un dato verificado y su fuente. Hoy no hay criterio de qué se puede publicar.

**Texto exacto:**

```markdown
---
name: contenido-y-difusion-finance-of-sports
description: Cómo armar una publicación (hilo, post, tarjeta, informe) con un dato de finance-of-sports para difundir el sitio. Usar cuando Guido pida contenido para X, Instagram, LinkedIn, un deck o un informe por liga. Es lo que se escribe afuera del sitio; el dato sale de lo cargado y verificado.
---

# Un dato cargado, una publicación

- **El dato sale del sitio, no de la memoria.** Solo años que pasan `verifyTieOuts()` (`?audit=1`, 0 «no cierran»). Para un ranking o una comparación, `node tools/generate-rankings.js --print`. Cada cifra lleva moneda, ejercicio y si es balance o presupuesto; un estimado (`(estimado)*`) no se publica como dato.
- **Cada publicación lleva la fuente.** Link a `https://financeofsports.com/club/<id>` (o `/liga/<id>`) y a la página de fuentes del club (`fuentes/<id>`). Sin link a la fuente no sale.
- **Licencia.** El Formato simplificado es CC BY-NC 4.0: citar es libre, con la atribución. Los documentos de los clubes no llevan esa licencia; no se republica un PDF. Lo de Wikipedia, CC BY-SA 4.0.
- **Un club solo se compara con lo que el sitio compara** (mismo formato, ejercicio y moneda). Si dos clubes tienen perímetros distintos, el borrador lo dice.
- **El texto lo escribe la skill `anti-ai-writing-and-guido`** (voz de Guido). Una afirmación sobre una persona (presidente, gestión) se verifica en `data/gestiones/`; sin cita, no sale.
- **Nada se publica solo.** Un borrador va a `Admin/difusion/<fecha>-<tema>.md` con las cifras, el link y qué ejercicio las respalda. Guido lo aprueba y lo publica él. Una publicación, un mail a un club o un comentario público es una acción hacia afuera: confirmar siempre.
- **Qué publicar primero** (sin cambiar el alcance del sitio): un año cargado nuevo, un ranking de una liga ya completa, un cambio fuerte de deuda o ingresos entre dos ejercicios con balance. Una vez por club hasta agotar la lista (calendario en `Admin/difusion/calendario.md`).
- Tarjetas de imagen con el estilo del sitio: primero un diseño (artifact de Design) aprobado por Guido; después se generan.

## Cómo mantener esta skill

Si aparece un criterio de qué se publica o cómo, proponele a Guido el texto exacto y esperá su ok.
```

(Depende de 313 b y d si se hacen: el script de «dato del día» y el calendario. La skill vale sin ellos.)

### 2.3 `contrato-de-datos-finance-of-sports`

Por qué: el JSON de cada club ya es un dato abierto con esquema (`data/schema/club-v2.json`), un paquete de datos (`tools/exportar-paquete.mjs`) y una licencia. Falta decir qué lo rompe. `Admin/mediciones/245-esquema.md` describe el esquema; no dice cuándo hay que subir la versión.

**Texto exacto:**

```markdown
---
name: contrato-de-datos-finance-of-sports
description: Qué es público de los datos de finance-of-sports (el JSON de cada club, su esquema, la taxonomía, los ids) y qué cambio lo rompe. Usar antes de renombrar, quitar o cambiar el significado de un campo, de cambiar una categoría genérica, un id de club o una unidad, o de tocar `data/schema/`, `tools/json-datos.mjs`, `tools/generar-schema-json.mjs` o `tools/exportar-paquete.mjs`.
---

# El contrato

**Qué es público.** `data/<país>/<id>.json` (esquema `data/schema/club-v2.json`, taxonomía `data/schema/taxonomy-<deporte>-<n>.json`), el paquete que arma `tools/exportar-paquete.mjs`, `data/correcciones/`, los ids (`<slug>-<iso2>`; los viejos viven en `data/club-aliases.js` y `fuentes/` redirige con 301 desde `netlify.toml`) y los permalinks `/club/<id>` y `/liga/<id>`. Quien lo usa no avisa: hay que tratarlo como API.

**Qué NO rompe (se hace sin permiso):** agregar un campo opcional; agregar una subcategoría o un deporte nuevo con taxonomía propia; cargar clubes y años.

**Qué rompe (hay que decidirlo con Guido y subir `schema_version`):**
- renombrar, mover o quitar un campo;
- cambiar la unidad (millones de la moneda del club, escrita en `unit`);
- cambiar el significado de un valor (sin dato es `null`, nunca 0);
- cambiar la categoría genérica de una línea ya publicada o la tabla de la taxonomía;
- cambiar o quitar un `id` sin dejar el alias;
- cambiar la licencia o lo que el paquete incluye (solo lo financiero).

**Cómo se cambia lo que rompe:** el esquema nuevo es un archivo nuevo (`club-v3.json`); el anterior queda congelado y publicado. Una migración es una tool que corre con `--ensayo`, y va con los chequeos de `audit.js` (`json-no-valida`, `json-js-desfasado`, `taxonomia-incompleta`) en verde. El motor y el data file generado conservan sus nombres; lo que cambia es el JSON.

**Siempre:** la fuente es el JSON y el `-data.js` se genera (`node tools/generar-data.mjs`); después de editar a mano, `node tools/publicar.mjs`. El esquema vigente y sus decisiones: `Admin/mediciones/245-esquema.md`; reglas de datos: `Admin/CONVENCIONES-DATOS.md`.

## Cómo mantener esta skill

Si aparece un cambio de esquema que esta lista no clasifica, proponele a Guido el texto exacto y esperá su ok.
```

### 2.4 `deploy-y-release-finance-of-sports`

Por qué: el push a `main` es el deploy (Netlify, plan gratis, unos 25 deploys por mes: comentario de `tools/hooks/pre-tool.mjs`), lo hace Guido, y no hay una lista de qué mirar antes ni cómo verificar producción. Las piezas existen (`audit.js --quiet`, `publicar.mjs`, `netlify.toml`, el hook de push) sin un orden.

**Texto exacto:**

```markdown
---
name: deploy-y-release-finance-of-sports
description: Qué chequear antes de que Guido haga push a `main` (que despliega financeofsports.com en Netlify) y cómo verificar producción después. Usar cuando Guido diga que va a publicar, cuando pregunte si algo está listo para subir, o cuando haya que confirmar que algo ya salió. Las sesiones no hacen push ni lo mencionan; esto es para cuando él lo decide.
---

# Antes del push (lo corre la sesión que le diga a Guido «listo para subir»)

1. `git status` limpio, sin archivos sin trackear que no sean a propósito (un `git add -A` levanta lo de la carpeta principal).
2. `node tools/audit.js --quiet`: 0 P0 y 0 P1. Incluye que los generadores estén al día y que ningún documento interno haya quedado en la raíz (`doc-interno-no-excluido`).
3. `?audit=1` en el preview: ningún «no cierra» nuevo.
4. `ASSET_V` subido una vez respecto de `origin/main` si cambió algo de `js/`, `css/` o `data/` (`node tools/publicar.mjs --ensayo` lo dice).
5. Si cambió `netlify.toml` o el `_redirects` equivalente, mirar los redirects 301 de `fuentes/` y que lo interno siga borrándose del artefacto (`Admin/`, `CLAUDE.md`, `auditorias/`, `Prototyping/`, `tools/`, `Generados/`).
6. **Un push junta todos los commits que haya.** El plan gratis limita los deploys: no se hace un push por commit; se acumulan y se pushea cuando Guido decide.

# Después del push (cuando Guido avise que subió)

Con `curl -I` contra la URL exacta (no `fetch` del navegador, que cachea):

- `https://financeofsports.com/` y `/club/boca-ar` devuelven 200.
- `https://financeofsports.com/CLAUDE.md`, `/Admin/` y `/tools/` devuelven 404. Si alguno da 200, es lo más urgente del proyecto: Netlify publica algo interno.
- Una URL vieja de `fuentes/<id-viejo>` redirige con 301 al id nuevo.
- Cargar el sitio con `?cb=<nuevo>` y mirar la consola: sin errores. En el hostname de producción corren Cloudflare Analytics, Mixpanel y el Worker de búsquedas; en local no.
- El estado del deploy: el conector de Netlify, si está disponible; si no, el panel de Netlify (lo mira Guido).

# Qué no se hace

Push, abrir un PR a `main`, ni recordar que hay commits sin publicar: «commiteado» y nada más.

## Cómo mantener esta skill

Si aparece un paso de antes o después del deploy que no está acá, proponele a Guido el texto exacto y esperá su ok.
```

(Hechos que no verifiqué contra producción y que quien aplique tiene que confirmar antes de pegar el texto: que `/club/boca-ar` existe con ese id exacto, y si `netlify.toml` usa `_redirects` o reglas propias para los 301 de `fuentes/`. La skill dice «`_redirects` equivalente» por eso.)

### 2.5 `principal-finance-of-sports` (la quinta, que piden las memorias)

Por qué: una docena de las 27 memorias son reglas de la sesión principal (cómo abrir sesiones, mergear, hablarle a Guido, cerrar un turno). No tienen skill: viven solo en la memoria de esa sesión, así que otra principal (o la misma tras un `/clear`) no las tiene. Esta skill se invoca al arrancar en la carpeta principal, no en un worktree.

**Texto exacto:**

```markdown
---
name: principal-finance-of-sports
description: El rol de la sesión principal de finance-of-sports (la de la carpeta principal): cómo abre y cierra sesiones de worktree, cómo mergea, qué le dice a Guido y en qué formato. Usar siempre al arrancar una sesión en la carpeta principal, después de la skill de arranque. Una sesión de worktree no la usa.
---

# La principal

La principal mergea, escribe `Admin/TODO.md`, `Admin/CHANGELOG.md` y `Admin/ESTADO.md` y es la única que habla con Guido de todo el proyecto. Las otras sesiones corren en su worktree y su rama.

## Hablarle a Guido

- **Un mensaje por paso, con las decisiones numeradas y la recomendación al lado.** Sin AskUserQuestion. No partir un resultado en pedazos mientras corren tools.
- **Un paso por vez, con un ejemplo real** (un antes y después, una línea de salida) antes de hacerlo; tareas chicas y cerradas: terminar y commitear una antes de abrir la siguiente. Si una medición va a tardar más de un par de minutos, decirlo y achicar el alcance.
- **Los avisos de las sesiones los absorbe la principal.** Mergea, corre lo barato, reenvía. A Guido solo un cuadro fijo, corto: **Te toca a vos** (numerado, una línea con la sesión) o «nada»; **Corriendo**: un bullet por worktree con carpeta, sesión, número de to-do y status de una línea. Si algo contradice un mensaje anterior, decirlo («cambia lo de antes: …»).
- **Cierre de turno.** Lo que Guido tiene que correr, aprobar o decidir va completo en el ÚLTIMO mensaje del turno: el comando en un bloque bash, el diseño, las preguntas numeradas. Nada importante antes del cuadro de `wrap_up`; si hay un comando o un diseño, `wrap_up` va sin `ask` y todo va en el texto final. El cuadro con botones es solo para un sí o no sin nada más que leer. Si el turno termina esperando algo de Guido, también una notificación push corta con lo que falta.
- **El plan vivo** va al panel Plan (modo plan, archivo, `ExitPlanMode`, `show_pane` «plan»): solo lo pendiente, corto, en su idioma, sin lo hecho; arranca en la tanda A del bloque ORDEN de `Admin/TODO.md`, con una línea en blanco entre puntos. Editar el archivo no refresca el panel: hay que volver a pasar por `EnterPlanMode` y `ExitPlanMode`.

## Qué decide la principal y qué va a Guido

- **Decide y cuenta en el resumen:** estructura y calidad de datos (ids, esquema, alias, redirects, consistencia, reglas de criterio objetivas) que hagan al sitio una base más seria.
- **Va a Guido:** el texto de una skill (candado, `Admin/propuestas/`), gastar fuera del presupuesto, push y deploy, un cambio de alcance (otros deportes, contenido nuevo), un mail a un club (solo si Guido lo pidió con sus palabras; que una sesión lo proponga no alcanza), archivar una sesión (se propone en «Te toca a vos»; con su sí, y la Auditora queda abierta para que le escriban).
- **A la Auditora:** una condición nueva en una tool (sección 7 de su skill), un criterio de datos (`votacion-de-criterios`).

## Abrir sesiones

- Sesión nueva en Sonnet, sin consultar. **Opus solo con el ok de Guido**; se lo recomienda cuando el cambio es difícil de diseñar, toca mucho del repo y no tiene reglas escritas (un cambio de esquema), o cuando una sesión Sonnet se traba con bugs propios en algo así. Onboarding, pipeline, auditoría y votaciones van en Sonnet.
- Worktree: sin `permission_mode` (hereda el auto); verificar con `get_session` que sea `auto`; si cayó a `acceptEdits`, `set_session_permission_mode`. Una sesión de worktree no usa el panel Plan (aprobar un plan la baja a `acceptEdits`). El brief lleva la regla de comandos sin `$(…)`, sin variables, sin `cd … &&` y sin `/tmp`.
- Cada sesión corre sus lotes en su carpeta, dentro de un presupuesto en US$ que fija Guido. La principal no larga lotes en otra carpeta.
- Número de lote: lo da la principal; mirar el más alto en todas las ramas (`git ls-tree -r --name-only <rama> -- Admin/lotes Admin/Archive/lotes`).

## Mergear

`node tools/worktree.mjs mergear <rama>` (ver `worktree.md`). Después pasar la nota `Admin/sesiones/<rama>.md` a TODO, CHANGELOG y ESTADO (cada punto de «Qué queda» con su flecha: `→ TODO n`, `→ regla`, `→ HALLAZGOS` o `→ descartado: motivo`) y archivarla entera. Trampas:
- Después de adelantar una rama con `git merge --ff-only main`, confirmar con `git rev-list --count <HEAD de la rama>..main` que da 0; nunca cortar la salida con `tail -1`.
- La carpeta de `fos-pantallas` tiene `.claude/launch.json` con skip-worktree: para adelantarla, copiarlo al scratchpad, `update-index --no-skip-worktree`, `checkout --`, ff, volver a copiarlo y `update-index --skip-worktree`.
- Un `git add -A` en un merge levanta lo sin trackear de la carpeta principal: mirar `git status` antes.
- No archivar con `git mv` la nota de una sesión que sigue viva.
- Para anticipar conflictos, `git merge-tree` (no toca nada).
- Dos lotes en worktrees distintos: sus listas de corrida (`Admin/registros/.lote-lista-actual.txt` y las otras) tienen que ser archivos propios, no enlaces a la principal (`ls -la`).

## Cómo mantener esta skill

Si aparece una regla de la principal que no está acá, proponele a Guido el texto exacto y esperá su ok.
```

---

## 3. Cambios a skills y documentos existentes

Todo con el candado de la parte 5: el texto sale de este archivo, ya commiteado.

**3.1 `club-sourcing/SKILL.md`, sección 0** (donde dice qué clubes entran), agregar:

> **Un club extinto o refundado vale** si sus balances siguen publicados: se bajan y se documentan como los de cualquier otro.

**3.2 `start-session-finance-of-sports-project/SKILL.md`:**
- Sección 2 («Antes de tocar nada: preguntar, no asumir»), agregar al final:

> **Cómo se trabaja con Guido:** un paso por vez, con un ejemplo real antes de hacerlo; tareas chicas, cerradas y commiteadas antes de abrir la siguiente; un mensaje por paso con las decisiones numeradas y la recomendación al lado. Las skills, `Admin/ESTADO.md` y los documentos de criterio dicen cómo es hoy: sin versiones, fechas de decisión, contadores fijos ni «to-do N» (`node tools/audit.js` avisa: `doc-de-criterio-con-historia`).

- Tabla de la sección 1: una fila nueva, «`.claude/skills/principal-finance-of-sports` | si la sesión corre en la carpeta principal (no en un worktree)»; y las filas de las skills nuevas con su cuándo (pantalla, contenido, contrato de datos, deploy).
- «Cómo mantener este skill»: agregar «El texto exacto va a `Admin/propuestas/<tema>.md`, commiteado, antes del cambio.»

**3.3 `club-outreach/SKILL.md`**, donde dice cuándo se escribe a un club, agregar:

> Nadie redacta ni asigna un mail a un club sin que Guido lo haya pedido con sus palabras. Una sesión que lo propone, o una nota que dice «candidato a mail», queda anotada en el to-do de origen sin sesión propia hasta que Guido pida el outreach.

**3.4 `start-session…/worktree.md`**, «En la principal, para mergear»: agregar «Para anticipar conflictos, `git merge-tree` (no toca nada). Cada punto de «Qué queda» de la nota termina con una flecha (`→ TODO n`, `→ regla`, `→ HALLAZGOS`, `→ descartado: motivo`) antes de archivarla.» Y «Al cerrar»: «La nota es de esta tanda: una sesión que sigue después del merge empieza una nota nueva.»

**3.5 `club-or-year-onboarding/SKILL.md`:**
- «La cola»: agregar «Un caso de perfil (socios que pagan cuota, otros deportes) nunca frena una carga: se googlea el club (programa de socios, modalidades), se contesta con esa fuente y, si no hay nada, la respuesta es "no" con la nota y la duda va a `Admin/dudas-por-club.md`.»
- Sección de costos (donde está el presupuesto de la sesión): «Para bajar el gasto de API: la Batch API (mismo modelo, mitad de precio) y pasar una tarea de Opus a Sonnet, de a una y medida contra lo cargado. Nunca Haiku. Antes de una medición paga, además del costo del ensayo, una frase que diga qué decisión cambia el resultado; sin esa frase no se corre. Cada archivo de `Admin/mediciones/` abre con `Conclusión:` y `Destino:`.»

**3.6 `Admin/CONVENCIONES-DATOS.md`**, junto a las dos reglas de «no recategorizar» (`:119`, `:410`): «No se recategorizan líneas ya cargadas para unificar criterios entre clubes; solo un error claro (un rubro del lado o la categoría evidentemente equivocados). Una inconsistencia entre clubes no abre un to-do.»

**3.7 `Admin/CONVENCIONES.md`:** la regla «lo que se decide o se descubre se escribe en el lugar donde se va a leer, en el mismo turno» (de 330) y la tabla resumen. Y sacar de «Índice de las reglas que viven en otro archivo» (`:156`) los «(Versión N, …)» de las 40 líneas: dejar solo el título y el destino.

---

## 4. Chequeos

Todos van a la Auditora 4 (sección 7: qué dato lo motiva, cuánto cuesta, si ya existe uno parecido, medido). Ninguno bloquea trabajo hoy: los de `audit.js` empiezan en P3.

**4.1 `memoria-no-es-regla`** (hook, deny): ver 330, tipo 1.

**4.2 `doc-de-criterio-con-historia`** (`audit.js`, P3): en `.claude/skills/*/SKILL.md` y `Admin/ESTADO.md`, `Versión \d+` y `to-do \d+` fuera de un bloque de código. Hoy da 6 en ESTADO y 1 en una skill (`grep` de esta sesión).

**4.3 `archivar-con-ok`** (hook, ask): `mcp__ccd_session_mgmt__archive_session` pide permiso a Guido con «¿Guido dijo sí a archivar esta sesión?». Requiere agregar el matcher a `.claude/settings.json`. Hoy la memoria 9 existe porque se archivaron las Auditoras 3 y 4 sin su sí.

**4.4 `modelo-opus-con-ok` (ask) y `worktree-sin-permission-mode` (deny)** (hook): `mcp__ccd_session__start_session` y `mcp__ccd_session__set_session_model` con `model` que contenga `opus` piden permiso; `start_session` con `permission_mode` distinto de `auto` se rechaza («un worktree hereda el auto; con `acceptEdits` pide permiso para todo»). Mismo archivo de settings.

**4.5 `comandos-simples`, ampliación** (hook, deny): `sed -i`, `perl -i` y `python3 - <<` / `python3 -c` que escriben, con el motivo «editá con Edit/Write». Es parte de la memoria 4 que el hook no cubre (el regex `ESCRIBE` del hook ya los reconoce para skills y docs de la principal; falta usarlo en general). Riesgo: puede frenar un uso legítimo; empezar en `ask`.

**4.6 `worktree.mjs`**: `adelantar` (si existe, o el paso que hace `merge --ff-only main`) verifica solo con `git rev-list --count` que quedó en 0 y falla si no; `mergear` frena si un «Qué queda» no tiene flecha (330, tipo 5). Es una tool: Pipeline + Auditora.

---

## 5. El candado: un cambio de skill no se aplica sin que Guido vea el texto

**Qué pasó:** el 2026-10-20 el texto de un cambio de skill quedó detrás del cuadro de pregunta tres veces. Hoy el hook `skills-con-ok` pide permiso (ask) cada vez que se escribe en `.claude/skills/`, pero Guido aprueba una ventana de permiso sin que la sesión haya dejado el texto en ningún lado que él pueda leer después. El ok es sobre una pregunta, no sobre un texto.

**Propuesta (hook `skills-con-ok`, versión nueva):** escribir en `.claude/skills/` se permite solo si **el texto que se escribe ya existe en un archivo de `Admin/propuestas/` que está commiteado**. Esto es lo que hace la verificación:

1. **Edit:** `new_string`, con los espacios normalizados, tiene que aparecer como texto en algún `Admin/propuestas/**/*.md` de `HEAD` (`git ls-tree -r HEAD --name-only -- Admin/propuestas` y `git show HEAD:<ruta>`; no cuenta el árbol de trabajo sin commitear). **Write:** cada línea no vacía del contenido tiene que aparecer en alguno. **Bash** que escribe en `.claude/skills/`: deny, «usá Edit».
2. Si el texto no está: **deny** con «escribí el texto exacto en `Admin/propuestas/<tema>.md`, commitealo (la propuesta es un commit de documentos: no corre `audit.js`), mostráselo a Guido en el texto final del turno y volvé con su ok».
3. Si el texto está: **ask**, con el archivo y la línea donde está en el motivo: «Esto escribe en .claude/skills/. El texto está en `Admin/propuestas/257-skills.md:NNN` (commit abc123). ¿Guido lo vio y dijo que sí?». El ok de Guido sigue siendo un permiso de la herramienta; ahora la ventana dice dónde está el texto que aprueba.
4. **Excepción de Guido:** «hacelo sin resumirme» para un paso concreto no se puede expresar en el hook, y no hace falta: la sesión escribe el texto en `Admin/propuestas/` igual (cuesta una escritura) y sigue.

**Qué garantiza y qué no.** Garantiza que no hay cambio de skill sin un texto exacto, commiteado, con su ruta en la ventana de permiso, y que el cambio aplicado es literalmente el propuesto (no una variación de último momento). No garantiza que Guido lo haya leído: eso es suyo. Si en algún momento quiere que el ok quede escrito, la variante es una línea `Ok de Guido: AAAA-MM-DD` en el archivo de propuesta, que escribe la principal solo después de un sí en el chat; el hook la exigiría, a costa de que una sesión podría escribirla sola sin que nadie lo vea (la skill principal lo prohíbe, pero no es un chequeo). No la recomiendo: da una seguridad falsa.

**Costo.** Un git por intento de escritura en skills (hoy el hook ya corre git en otros chequeos; las skills se escriben pocas veces). Una excepción: los cambios de las propias propuestas (este archivo) viven en `Admin/propuestas/` y no pasan por el candado. `Admin/propuestas/` no se publica: `netlify.toml` borra `Admin/` entero del deploy.

**Sobre este mismo archivo.** Los bloques «Texto exacto» de la parte 2 y los textos de la 3 son lo que el hook buscaría. Para que el candado los reconozca, quien los aplique pega el texto sin cambiarle una palabra.

---

## 6. Orden para aplicarlo

1. Guido lee este archivo y dice qué skills nuevas y qué cambios aprueba (por número: 2.1 a 2.5, 3.1 a 3.7).
2. La Auditora 4 contesta por los chequeos de la parte 4 (y los de `330-donde-se-pierde.md`).
3. Lo aprobado se pega con Edit en `.claude/skills/` y los documentos; el hook de hoy pide el ok de Guido en cada escritura, y con el candado de la parte 5 ya instalado, lo exige commiteado.
4. Con cada memoria ya cubierta se borra el archivo; `MEMORY.md` queda sin líneas.
5. Primero el candado (parte 5, el chequeo más chico y el que protege el resto), después las skills.

## Veredicto de la Auditora 4 (2026-10-21, detalle en `Admin/registros/auditoria-proceso.jsonl`)

- **Aprobados:** `duda-resuelta-en-dudas` (P3; son 5 líneas, no 6), `registro-sin-lector` (P3), `doc-de-criterio-con-historia` (P3; 6 en ESTADO y 1 en club-sourcing), que `gasto.mjs` imprima el 15% de A2, `archivar-con-ok` (ask), `modelo-opus-con-ok` (ask).
- **Con cambio:** `memoria-no-es-regla` es ask, no deny (una preferencia de trato con Guido es una memoria legítima); `medicion-sin-destino` cuenta como citado lo que una tool o `js/` nombra, y son 35 de 51 archivos de `Admin/mediciones/` sin citar: el commit que lo agregue los resuelve o los lista; `worktree-sin-permission-mode` es ask; `comandos-simples` ampliado es solo ask, midiendo cuántas veces dispara antes de pensar en deny.
- **Candado de skills, con tres cambios:** coincidencia contigua (Edit: el `new_string` entero en un solo archivo de propuesta; Write: cada párrafo, con los de menos de 40 caracteres exentos); git exento de la regla de Bash (merge, checkout, restore, rebase, cherry-pick); medirlo antes con `git log -p` sobre los últimos cambios a `.claude/skills`.
- **Rechazados:** que `mergear` frene sin flecha (ninguna nota existente la lleva: frenaría todos los merges; va como aviso, y primero el texto de `worktree.md` con el ok de Guido) y el paso de adelantar en `worktree.mjs` (no existe: el ff lo hace la principal a mano con git; la verificación `rev-list` queda en la skill principal).
- Los matchers de `.claude/settings.json` los agrega la principal; Pipeline codea lo aprobado después.

---

## 7. ¿Qué de las convenciones debería ser una skill?

Criterio: una **skill** es un procedimiento para una tarea (pasos, en orden, que se siguen mientras se hace algo). Una **convención** es una regla que se consulta (si la tarea toca X, X se hace así). Revisé `Admin/CONVENCIONES.md` entero y los títulos de `CONVENCIONES-DATOS.md`, `PANTALLA.md` y `PIPELINE.md`. Resultado: casi todo es regla y se queda; hay cuatro procedimientos que están escondidos adentro de convenciones, y un texto vencido que hay que borrar.

### Se queda (reglas que se consultan)

- `Admin/CONVENCIONES-DATOS.md` entero: cada sección es «si pasa X, se carga así» (una regla por caso: perímetro, deuda, categorías, fx). Se consulta con la tarea ya empezada; las skills `club-data-mapping` y `club-or-year-onboarding` ya la apuntan.
- `Admin/PANTALLA.md`, «Convenciones de pantalla y código» y «Cómo funciona cada pantalla»: referencia de qué no romper. El orden de trabajo ya va a la skill 2.1.
- `Admin/PIPELINE.md`, las etapas 1 a 9: es el manual de cada tool (opciones, qué escribe, qué chequea). La skill `club-or-year-onboarding` es el procedimiento y lo apunta. «Un deporte nuevo» se queda: la skill ya trae el procedimiento (carga de prueba, frenos a `frenados-por-script.jsonl`) y apunta ahí por lo que cada tool hace.
- `Admin/CONVENCIONES.md`: «ONBOARDING CARGA, PIPELINE ARREGLA, AUDITORA APRUEBA» (quién puede qué), el presupuesto de la sesión, el trailer `Corrige:`, el estilo de texto visible, «Una fuente externa nueva se anota antes de publicar», «DÓNDE VA UN DOCUMENTO NUEVO» y «LO QUE ESTÁ CERRADO SE ARCHIVA»: son reglas de qué se puede hacer, y `audit.js` o el hook vigilan varias.

### Se mueve a una skill (cuatro procedimientos)

**7.1 `PANTALLA.md`, «Verificar en el browser de verdad, no solo revisar los números a mano» y «Trampas del navegador de preview» → archivo nuevo `producto-y-pantalla-finance-of-sports/referencia/navegador-de-preview.md`.** Es el «cómo verifico» de la skill 2.1 (su punto 4): pasos que se siguen al probar una pantalla. En `PANTALLA.md` cada sección queda reemplazada por una línea: «Cómo se verifica una pantalla y las trampas del navegador de preview: skill `producto-y-pantalla-finance-of-sports`, `referencia/navegador-de-preview.md`.» El texto de hoy de las dos secciones tiene historia pegada («Versión 101», «Texto movido sin cambios», «NUEVO (auditoría de código…)»); al mudarlo se limpia. Texto exacto del archivo nuevo:

```markdown
# Verificar una pantalla en el navegador

## Qué se prueba, siempre

**El sitio anda de dos maneras y se prueban las dos antes de pedir el merge:** servido (el preview de `launch.json`, y `/club/<id>` y `/liga/<id>` directos y navegando desde la portada) y abierto como archivo (`file:///…/index.html`). Por eso `index.html` no lleva `<base>` fijo ni rutas que empiecen con `/`: con `file://` la raíz es la del disco y la página sale sin estilos ni scripts. Las cargas dinámicas y los links que arma el JS pasan por `fosUrl()` de `js/i18n.js`. Solo las páginas generadas de `club/` y `liga/` llevan `<base>`. `audit.js` lo chequea (`index-file-roto`).

**La cuenta a mano no alcanza.** Verificar que `revenueLines` y `expenseLines` suman el total impreso es necesario, pero un bug de display no aparece sin abrir el sitio. Después de tocar una función de display o de conversión: `preview_start`, cambiar de club, tocar los dos toggles (moneda y Formato del club o simplificado) y leer los números en pantalla. `verifyTieOuts()` corre en moneda nativa, nunca pasa por el toggle y no detecta una doble conversión.

**Un ejercicio recién categorizado se mira línea por línea.** Que `verifyTieOuts()` pase y que «Formato del club» se vea bien no alcanza: abrir «Formato simplificado» y confirmar que ningún bucket que debería tener plata (según el documento) está en $0. Un bucket en $0 sin explicación es la señal de que algo quedó enterrado en `items` en vez de promovido a su categoría (por ejemplo una línea real de televisión bajo `lump_football_operations`: el total cierra igual).

## Trampas del navegador de preview

- **Caché de `data/*.js`, `js/*.js` o del propio `index.html`.** Si después de editar los números o estilos siguen viejos aunque `curl` ya muestre el archivo nuevo, es caché antes que un bug. No alcanzan: `location.reload()`, `Cmd+Shift+R`, relanzar `preview_start`, abrir una pestaña nueva, cambiar el puerto de `.claude/launch.json` (la caché HTTP se comparte por origen entre pestañas). Lo que funciona: cambiar la URL. Para los scripts, subir `ASSET_V` (la constante y cada `?v=`, regla en `Admin/PANTALLA.md`, «CACHE DE ASSETS») a un valor que nunca se pidió, navegar, confirmar y dejarlo limpio. Para el `index.html` mismo, navegar con `?cb=<algo nuevo>` en la URL de nivel superior; confirmar con `window.ASSET_V` antes y después.
- **Confirmar antes de concluir.** Con `javascript_tool` (`Object.keys(algunaConstDeEseArchivo)`, `document.querySelector('style').textContent.includes('tu regla')`) tanto antes de concluir que algo no funciona como antes de concluir que sí: `read_console_messages` de una pestaña reusada puede mostrar un error ya arreglado. Si el error es sospechosamente el mismo, volver a chequear el estado real.
- **Un diálogo nativo abierto (`alert`, `confirm`) congela también las herramientas.** Si `javascript_tool` da timeout, un `setTimeout` corto no resuelve o un `loadClubData()` queda pendiente con su request en 200, es un `alert()` abierto: bloquea el hilo entero. Se destraba navegando con `force:true`. Ningún camino de error del sitio usa `alert()`.
- **El screenshot sale en blanco si la página está scrolleada** (`window.scrollY > 0`, sin importar cómo se llegó). Con `scrollY === 0` sale bien. Para capturar algo largo: `resize_window` con un `height` grande (2500-3000), capturar, y volver con `resize_window({preset:'desktop'})`. `zoom` con `region` devuelve la imagen completa. Es una limitación de la herramienta, no del sitio.
```

La skill 2.1 gana una línea al final de su punto 4: «El detalle de qué se prueba y las trampas del navegador: `referencia/navegador-de-preview.md`.»

**7.2 `CONVENCIONES.md`, «DOS SESIONES EN PARALELO» (`:22-52`) → `start-session-finance-of-sports-project/worktree.md`.** Cinco de sus bullets son pasos de trabajo de una sesión en un worktree o de la principal al mergear, y `worktree.md` es donde se leen. Se mudan (la convención queda con la primera frase: «Dos sesiones sobre el mismo working tree se pisan en silencio: cada sesión paralela va en su worktree; el procedimiento está en la skill de arranque, `worktree.md`»). Texto exacto para agregar a `worktree.md`, al final:

```markdown
**Después de `preparar`:** si `audit.js` da `faltantes-desfasado` (P1; `data/faltantes/` depende de PDFs que git ignora y que la principal bajó después), se arregla volviendo a correr `node tools/worktree.mjs preparar <carpeta>`.

**Un archivo generado no se mergea a mano: se regenera.** Si hay conflicto en `Admin/sourcing/README.md`, `fuentes.html`, `sitemap.xml`, `data/club-index.js`, `data/rankings/*.js`, `data/sponsors.js` o `Admin/ESTADO-clubes.md` (el bloque CLUB-INDEX), tomá cualquiera de los dos lados, mergeá y corré el generador que corresponde. Resolverlos línea por línea es cómo se mete un dato que ningún documento respalda.

**El hook de los documentos de la principal lee el texto del comando:** un Bash que solo nombra `TODO.md`, `CHANGELOG.md` o `ESTADO.md` junto a una escritura también se frena. Escribir la nota de la sesión con Edit o Write.

**El número de Versión de `Admin/CHANGELOG.md` se decide al mergear, no al escribir:** dos ramas van a querer el mismo; el que mergea segundo renumera su entrada.

**Un país por sesión de sourcing:** `Admin/sourcing/_indice/<País>.md` y `Admin/sourcing/<País>/` son de un solo país, así dos sesiones en países distintos no comparten un archivo.
```

Y se borra de `CONVENCIONES.md`, por vencido, el bullet «El ONBOARDING va en `main`, el SOURCING en el worktree» (`:27-31`): contradice el resto del mismo archivo («Tres sesiones de worktree con un rol cada una», `:54`) y `Admin/ESTADO.md` («Sesiones en paralelo: cada una en su worktree»). También los dos que dicen cómo pasar un PDF bajado en el worktree (`:32-35`): ya están en `worktree.md` (rsync con `--no-links`) y su regla («no borres el worktree antes») se agrega en una frase a esa línea de `worktree.md`: «Un PDF bajado en la copia no viaja al mergear (`*.pdf` está en `.gitignore`): pasalo a la principal antes de borrar el worktree.» Queda por revisar el bullet de `migrar-v2.mjs --escribir` después de mergear una rama con JSON en esquema 1.0 (`:43-44`): mientras haya ramas viejas sirve; si no, se borra. Lo decide quien mergea.

**7.3 `CONVENCIONES.md`, «UNA PREMISA VENCIDA EN LA TO-DO SE ESCRIBE AL CERRAR EL PUNTO» (`:130-142`) → skill `principal-finance-of-sports` (2.5), sección nueva.** Es un paso al cerrar un punto del TODO, y lo hace la principal; el texto de hoy son 13 líneas de casos de septiembre. Texto exacto, a agregar a la skill 2.5 antes de «Cómo mantener esta skill»:

```markdown
## Cerrar un punto del TODO

Se borra lo resuelto. Si el motivo por el que estaba trabado resultó falso (la transcripción que «nunca se hizo» ya estaba en disco, la función que había que revisar ya no existe), además queda escrito en la entrada de `Admin/CHANGELOG.md` que la premisa estaba vencida y, si el punto sigue vivo en parte, en el propio `Admin/TODO.md`. Una premisa vencida hace parecer la tarea más cara de lo que es y la deja al fondo de la lista: escribirlo avisa que otros puntos pueden estar igual.
```

En `CONVENCIONES.md` el bullet se reemplaza por una línea: «Cerrar un punto del TODO con una premisa vencida: skill `principal-finance-of-sports`.»

**7.4 `CONVENCIONES.md`, el circuito «Onboarding solo carga / Antes de frenar un año, la Auditora» (`:56-80`).** No se mueve: es un reparto de permisos (quién puede tocar `tools/`, quién aprueba), o sea una regla que se consulta cuando una sesión duda de si puede hacer algo. El procedimiento de Onboarding (cómo anotar un frenado) ya está en `club-or-year-onboarding` (`:54`, `:83`, `:99`).

### Qué NO es una skill ni vale mudar

`CONVENCIONES.md`, «Índice de las reglas que viven en otro archivo» (`:156-201`): son 40 líneas de punteros con «Versión N»; no es ni regla ni procedimiento. Va a lo que dice 3.7 (dejar solo título y destino) o se borra entero: ninguna sesión llega a una regla por su número de versión.

Parte 7 aprobada por Guido el 2026-10-21: «ok a la parte 7 del 257, con sponsors.js agregado».

## 8. Regla de redacción de todo texto que va a una skill

Los bloques «Texto exacto» de las partes 2, 3 y 7 describen cómo se trabaja hoy: sin fechas, sin versiones, sin números de to-do, sin «antes era», sin «ya no», sin «(decisión de Guido, …)». Un caso real que ilustra una regla se queda, sin la fecha ni la versión (por ejemplo «una línea real de televisión bajo `lump_football_operations`»). El chequeo `doc-de-criterio-con-historia` (aprobado, P3) lo vigila en `.claude/skills/*/SKILL.md` y `Admin/ESTADO.md`; se amplía a los bloques de `Admin/propuestas/` solo si la Auditora lo pide.
