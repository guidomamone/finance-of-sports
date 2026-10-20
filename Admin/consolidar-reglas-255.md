# To-do 255, fase 1: inventario de reglas repetidas o contradichas (DOCS 1, 2026-10-20)

Alcance: `CLAUDE.md`, las 8 skills de `.claude/skills/` (SKILL.md, `worktree.md`, `club-nuevo.md`), las 27 memorias, y `Admin/CONVENCIONES.md`, `CONVENCIONES-DATOS.md`,
`PANTALLA.md`, `PIPELINE.md` y `ARQUITECTURA.md`. Método: leí completos `CLAUDE.md`, `CONVENCIONES.md`, las memorias, `start-session`, `worktree.md` y `club-or-year-onboarding`;
el resto, por tema con grep (cada regla de abajo la abrí en sus copias). **No es exhaustivo:** `PIPELINE.md` (115 KB), `PANTALLA.md` (90 KB) y `CONVENCIONES-DATOS.md` (42 KB) tienen más
repeticiones internas que no cacé; está marcado en "Lo que no revisé".

## Resumen

| | Cantidad |
|---|---|
| Reglas dedupeadas y aplicadas en esta rama (solo `Admin/*.md`) | **5** reglas (7 ediciones, 4 archivos) |
| Propuestas de skill, `CLAUDE.md` o memoria, con texto de antes y de después | **19**: 16 de skill y `CLAUDE.md` (S-1 a S-16) y 3 de memoria (S-17, M-1, M-2) |
| Contradicciones reales, como pregunta para Guido | **9** (Q-1 a Q-9) |
| Chequeos que se podrían automatizar (solo listados) | **12** (C-1 a C-12) |

---

## 1. Dedupes APLICADOS (sin cambiar el sentido de ninguna regla)

Vigente = la copia que dice lo último. Las demás pasaron a ser un puntero.

| # | Regla | Copias que había | Quedó en | Se tocó |
|---|---|---|---|---|
| A-1 | **Subir `ASSET_V` = la constante Y cada `?v=`** | `CLAUDE.md` (gotchas), `PANTALLA.md` ×3 (bullet "ASSET_V SE SUBE EN DOS LUGARES", "CACHE DE ASSETS", y el bloque de "Trampas del navegador" con "ACTUALIZADO/CORRECCIÓN IMPORTANTE"), `ARQUITECTURA.md` (bloque de `ASSET_V`), `CONVENCIONES.md` (índice, ya era puntero), `start-session` §3 (versión incompleta, ver S-1) | `PANTALLA.md`, "CACHE DE ASSETS" (ahí también quedó el caso del `ReferenceError` de `currency-map.js`) | `PANTALLA.md` (2 ediciones), `ARQUITECTURA.md` (1: ahora remite a PANTALLA y deja solo lo que es de arquitectura, los 2 cargadores dinámicos y el regenerar `fuentes`; además se sacó el "42 páginas" y un puntero roto: mandaba a `CLAUDE.md` por un bug que `CLAUDE.md` ya no cuenta) |
| A-2 | **Pasar los PDF del worktree a la principal** | `worktree.md` (con `rsync -a --no-links`), memoria `rsync-worktree-sin-symlinks`, `CONVENCIONES.md` (decía `rsync` a secas, que es justo lo que rompe: copia los symlinks encima del archivo real) | `worktree.md` | `CONVENCIONES.md` (1: puntero. **Corrige** la instrucción vieja; es el único cambio de contenido, y va en el sentido de lo que Guido ya dejó en la memoria) |
| A-3 | **El data file no lleva comentarios** | `CONVENCIONES-DATOS.md` (la regla), `PIPELINE.md` (la repetía) | `CONVENCIONES-DATOS.md` | `PIPELINE.md` (1) |
| A-4 | **Un documento interno nuevo va en `Admin/`; la extensión no dice si es interno; `CLAUDE.md` es la excepción** | `CLAUDE.md` y `CONVENCIONES.md` (la regla entera en las dos, más los tres sub-bullets) | `CLAUDE.md` (la regla). `CONVENCIONES.md` se queda con el porqué y el detalle del chequeo | `CONVENCIONES.md` (1) |
| A-5 | **Lo cerrado se archiva en `Admin/Archive/`, sacándole antes lo que sirve** | `CLAUDE.md` y `CONVENCIONES.md` (casi textual) | `CLAUDE.md` | `CONVENCIONES.md` (1) |

`CLAUDE.md`: **no hizo falta tocarlo** (es la copia vigente en A-4 y A-5). Ver S-14 para lo único que le propongo agregar.

---

## 2. Propuestas para skills, `CLAUDE.md` y memorias (NO aplicadas; texto exacto para que Guido apruebe)

Cada una dice archivo y línea de hoy, texto de antes y texto de después. Las líneas son de la rama al día con main.

### start-session-finance-of-sports-project/SKILL.md

**S-1. §3, `ASSET_V` incompleto y con un ejemplo viejo** (líneas 64–68; copia de A-1, y lo dice a medias: no menciona los tags).
Antes:
> `window.ASSET_V` (arriba de los `<script src>` en `index.html`) es la versión de los assets propios.
> **Si tocás cualquier archivo de `js/` o `data/` y el navegador te sigue mostrando lo viejo, subí ASSET_V** a un valor que nunca se haya pedido antes (ej. `118a`), navegá, confirmá, y dejalo en un valor limpio al terminar. El caché de este entorno es agresivo y NO se rinde con reload, Cmd+Shift+R, pestaña nueva ni cambio de puerto: cambiar la URL exacta es lo único que funciona.

Después:
> Si tocás `js/` o `data/` y el navegador te muestra lo viejo: subí `ASSET_V` (la constante y cada `?v=`) y navegá con `?cb=<algo nuevo>`. La regla y las trampas del navegador de preview: `Admin/PANTALLA.md`, "CACHE DE ASSETS" y "Trampas del navegador de preview".

**S-2. §4, líneas 94–96: la misma frase está dos veces en la skill** (la otra, §5 líneas 139–142).
Antes (§4): "Si tocaste `js/` o `data/` y subiste `ASSET_V`, hay que regenerar `fuentes.html` y sus páginas de club, porque ese generador LEE `ASSET_V` de `index.html`."
Después: borrar la oración; queda en §5.

**S-3. §5 (líneas 109–126) repite "Antes de terminar la sesión" de `CLAUDE.md`, y le falta el caso del worktree.**
Antes: los 5 puntos (ESTADO, TODO, CHANGELOG, `finance-of-sports-project.md`, regla nueva) más "No dupliques la to-do list…".
Después:
> Con cualquier cambio real, sin que Guido lo pida: lo que dice `CLAUDE.md`, "Antes de terminar la sesión". **En un worktree no se editan `Admin/TODO.md`, `CHANGELOG.md` ni `ESTADO.md`:** se escribe `Admin/sesiones/<rama>.md` (ver `worktree.md`). Si se decidió una regla nueva o se contradijo una vieja, va a `Admin/CONVENCIONES.md` (proceso), `Admin/CONVENCIONES-DATOS.md` (datos) o `Admin/PANTALLA.md` (pantalla y código).
(Hoy `CLAUDE.md` y la skill mandan a tocar los tres documentos sin distinguir; `worktree.md` lo prohíbe. Ver Q-1.) Se conserva la parte de los archivos generados (líneas 128–142), que es de la skill.

**S-4. §6, líneas 146–154: la regla del push está acá, en la skill de onboarding (§8) y en una memoria; y lleva un contador fijo** ("~25 deploys/mes").
Antes: "…el plan es el free tier (~25 deploys/mes). Un commit local no dispara nada; un push sí."
Después: "…deploy automático al pushear a `main`. Un commit local no dispara nada; un push sí." (La skill es el lugar de la regla; ver S-8 para la copia de onboarding y Q-2 para la tensión con la memoria.)

**S-5. §2, líneas 48–50, repite `CONVENCIONES.md`, líneas 12–15.**
Antes: "Las reglas de `Admin/CONVENCIONES.md` que dicen «pedido explícito de Guido» no se negocian sin preguntarle. Si una decisión de esta sesión contradice una de esas, preguntá primero y actualizá el archivo después, en la misma sesión."
Después: "Las reglas «pedido explícito de Guido» de `Admin/CONVENCIONES.md` no se negocian sin preguntarle (ahí está también qué hacer si una decisión nueva contradice una)."

**S-6. §7, línea 172: ruta sin país.** Antes: "…desde los propios `data/<club>-data.js`…". Después: "…desde los propios `data/<país>/<club>-data.js`…". (Ya estaba en el informe de la auditoría como S-1; se repite acá para que quede todo en un solo lugar.)

**S-7. "Cómo mantener este skill" (líneas 194–199): da permiso para editar la skill.**
Antes: "Si en una sesión aparece un paso de arranque, de verificación o de cierre que no está acá, agregalo. Si un paso de acá resultó innecesario, sacalo."
Después: "…proponé agregarlo (con el texto exacto) y esperá el ok de Guido. Si un paso resultó innecesario, proponé sacarlo." (Depende de Q-6.)

### club-or-year-onboarding/SKILL.md

**S-8. "Guido corre los lotes" está vencido** (descripción línea 3; líneas 16, 35–36, 47, 60–61, 125): `CONVENCIONES.md` ("Cada sesión corre sus propios lotes y tiene un presupuesto") ya dice que **la sesión larga sus lotes en su carpeta, en segundo plano, y Guido y la principal no**. Es la contradicción de skill contra documento más clara que encontré. Textos:

| Línea | Antes | Después |
|---|---|---|
| 3 | "…correr lotes que Guido ejecuta en su terminal, leer los resultados…" | "…correr lotes en segundo plano, leer los resultados…" |
| 16 | "…(todo en scripts que corre Guido en su terminal)," | "…(todo en scripts de `tools/` que corre la propia sesión en segundo plano)," |
| 35–36 | "…Guido corre lo mismo con `caffeinate -i` y `--ejecutar`." | "…la sesión corre lo mismo con `caffeinate -i` y `--ejecutar`, dentro de su presupuesto (`Admin/CONVENCIONES.md`)." |
| 47 | "5. Guido corre `caffeinate -i node tools/lote.mjs … --ejecutar`, y con `--cargar` …" | "5. La sesión corre `caffeinate -i node tools/lote.mjs … --ejecutar` en segundo plano, y con `--cargar` …" |
| 50 | "Leer el resultado: el bloque final que pega Guido (no la terminal entera)…" | "Leer el resultado: la salida del lote (no la terminal entera)…" |
| 60–61 | "`--ejecutar --escribir` lo corre Guido, porque sus escalones 1b (Jev) y 2 (IA) usan API." | "`--ejecutar --escribir` lo corre la sesión si el ensayo gratis entra en el presupuesto; si no, se frena y se avisa a la principal." |
| 125 | "…mientras Guido corre lotes…" | "…mientras corre un lote…" |

Depende de que Guido confirme que ese cambio de rol vale para todo (Q-4 mira la memoria que lo contradice).

**S-9. §5, líneas 115–116: redirige a `/tmp/…`**, que `comandos-sin-pedir-permiso` (memoria) y los briefs prohíben.
Antes: `node tools/lote.mjs --lista Admin/lotes/prueba-completa.txt > /tmp/medir-antes.txt 2>&1     # antes del cambio` (y la de `medir-despues`).
Después: salida a un archivo del scratchpad de la sesión, con la ruta escrita entera (no variable ni `/tmp`); por ejemplo `> <scratchpad>/medir-antes.txt 2>&1`.

**S-10. §4, líneas 92–93: "Gastar dólares de API está bien" no menciona el presupuesto** que `CONVENCIONES.md` fija por sesión.
Antes: "Gastar dólares de API está bien; tokens de sesión, no."
Después: "Gastar dólares de API está bien, dentro del presupuesto de la sesión (`Admin/CONVENCIONES.md`); tokens de sesión, no."

**S-11. §4, línea 103: repite la memoria `un-mensaje-preguntas-en-orden`.**
Antes: "- **Sin la herramienta de preguntas:** las decisiones van numeradas en el mensaje."
Después: borrarla (la regla vive en la memoria, que se carga siempre).

**S-12. §8 (líneas 148–154): repite el cierre, y no distingue el worktree.**
Antes: "Pendiente nuevo o resuelto → `Admin/TODO.md`… Una entrada en `Admin/CHANGELOG.md`… Git: … Sin push: cada push a `main` es un deploy y lo hace Guido."
Después: "Cambió una tool → `Admin/PIPELINE.md` al día (no necesita el ok de Guido). Se midió algo y no entró → una línea en `Admin/HALLAZGOS-pipeline.md`. El resto del cierre y el push: `start-session`, §5 y §6, y `worktree.md`. Commitear el código separado de los logs de los lotes."

### club-data-mapping/SKILL.md

**S-13. §7, líneas 183–188, y `CONVENCIONES-DATOS.md`, "una gestión sin fuente pública queda en null" (línea ~433).** Dos redacciones de la misma regla, con matices distintos.
Antes (skill): "Si no podés confirmar con confianza quién presidía el club… dejá `gestionId: null` y NO agregues una entrada a `gestionesByClub`… Mejor un año sin gestión que una gestión inventada."
Después: dejar solo lo de la skill que es de mapeo ("`gestionId` y `gestionesByClub` son documentación, no los usa el motor para filtrar") y agregar "Cuándo es `null` y cómo se busca la gestión: `Admin/CONVENCIONES-DATOS.md`, «una gestión (presidente) sin fuente pública queda en null»."

**S-14. "Cómo mantener este skill" (líneas ~225–235): "No hace falta pedirle permiso a Guido para estas actualizaciones menores. Un cambio al texto de este skill se le muestra antes."** Se contradice a sí misma y con la memoria `no-editar-skills-sin-avisar` ("aunque el Cómo mantener diga otra cosa").
Antes: la oración completa.
Después: "Todo cambio al texto de este skill se le muestra antes a Guido." Y, si Guido está de acuerdo, una línea en `CLAUDE.md` ("Al empezar") que valga para todas las skills: *"Las skills no se editan sin mostrarle a Guido el texto exacto y esperar su ok, aunque su «Cómo mantener» diga otra cosa."* — con eso se sacan las instrucciones de editar de las otras 4 skills (S-7, S-15).

### Otras skills

**S-15. "Cómo mantener" de `auditoria-finance-of-sports` (línea ~183), `escala-finance-of-sports` (~277), `club-sourcing` (~434)**: las tres mandan a «agregá el eje / agregalo a la categoría / actualizar el archivo del país» sin decir que primero se le muestra a Guido. Texto de después en cada una: anteponer "Proponé (con el texto exacto) y esperá el ok de Guido:". Ver Q-6 sobre si el ok vale también para `club-sourcing/paises/*.md`.

**S-16. La regla «sin historia, sin contadores, sin "to-do N"» está en 4 lugares:** memoria `docs-de-criterio-sin-historia-ni-contadores`, `auditoria-finance-of-sports` "Cómo mantener", `escala-finance-of-sports` "Cómo mantener" y `club-or-year-onboarding` §9. Propuesta: dejar la regla entera una sola vez (la memoria, que carga siempre) y en cada skill una línea: "Sin historia ni contadores: ver `CLAUDE.md`." — para eso la regla tendría que pasar también a `CLAUDE.md` (una línea). Es la decisión más grande de la lista: dejo las dos opciones (mover a `CLAUDE.md` o dejar las 4 copias).

### Memorias (la sesión no las toca; se proponen)

**S-17. `rsync-worktree-sin-symlinks` es copia de `worktree.md`.** Antes: la memoria entera (el `rsync -a --no-links` y el motivo ya están en `worktree.md` líneas 14–16). Después: borrar la memoria y su línea de `MEMORY.md`. **Mantener** el aviso solo si Guido quiere que se cargue sin abrir la skill. (Depende de que los worktrees lean `worktree.md`: el brief de esta sesión lo hace.)

**M-1. `worktrees-en-modo-auto` se contradice a sí misma** (es la memoria más larga y la única que dice una cosa y la opuesta en párrafos distintos): el primero manda pasar `permission_mode: "auto"` y verificar; el cuarto dice que lo que funciona es **no** pasarlo. Además repite la regla de no usar plan mode (también en la regla que da cada brief) y la del modelo Sonnet.
Después (vigente):
> Al arrancar una sesión de worktree: NO pasar `permission_mode` (hereda el auto de la principal); verificar con `get_session` que sea `auto`; si cayó a `acceptEdits`, subirla con `set_session_permission_mode`. Modelo: Sonnet (`claude-sonnet-5-5`). Las sesiones de worktree no usan EnterPlanMode/ExitPlanMode ni el panel Plan (aprobar un plan las pasa a acceptEdits); diseños y preguntas van en el chat. El brief lleva la regla de comandos sin `$(...)` ni variables.

**M-2. `no-endurecer-reglas-sin-preguntar`, párrafo «Cambio 2026-10-20»**, repite la regla (1) a (4) de `CONVENCIONES.md`. Después: "Quién aprueba un arreglo de script: ver `Admin/CONVENCIONES.md`, «ONBOARDING CARGA, PIPELINE ARREGLA, AUDITORA APRUEBA»; endurecer una compuerta o agregar un criterio sigue yendo a Guido."

---

## 3. Contradicciones reales (preguntas para Guido; no elegí)

**Q-1. ¿Quién actualiza ESTADO, TODO y CHANGELOG?** `CLAUDE.md` ("Antes de terminar la sesión") y `start-session` §5 dicen que cada sesión los deja al día, sin que Guido lo pida. `worktree.md` y el hook de commit dicen que en un worktree **no** se tocan: los escribe solo la principal, y la sesión deja `Admin/sesiones/<rama>.md`. ¿`CLAUDE.md` debería aclarar «en un worktree, la nota de sesión»? (Se resuelve con S-3 si la respuesta es sí.)

**Q-2. El push.** `start-session` §6: «SIEMPRE hay que pedirle permiso explícito a Guido, cada vez». Memoria `no-recordar-push`: no mencionarlo ni pedirlo; se commitea y no se vuelve a sacar el tema. ¿Qué hace una sesión cuando tiene commits listos en `main`: pedir el push una vez o callarse? (Hoy las sesiones de worktree no pushean, así que el caso es la principal.)

**Q-3. Qué se hace con una mejora de script que muestra un lote.** (a) Memoria `mejoras-de-script-al-todo`: va a `Admin/TODO.md` y «no se diseña ni se aplica sin el ok de Guido». (b) `CONVENCIONES.md` (tres roles): va a `Admin/registros/frenados-por-script.jsonl`, la arregla Pipeline y la aprueba la auditora, y a Guido solo llega lo que cambia un criterio. (c) `club-or-year-onboarding` §4: un defecto sin daño hoy va a `HALLAZGOS-pipeline.md`, **no** al TODO. ¿Cuál manda cuando el defecto frena una carga, cuando no frena nada, y cuando es una mejora y no un defecto? (La memoria `no-endurecer-reglas-sin-preguntar` ya se actualizó al método de tres roles; esta no.)

**Q-4. «Pasale el comando a Guido» contra «cada sesión corre sus lotes».** Memoria `comandos-para-tiempo-ocioso` (pasar ya el comando encadenado del paso siguiente, con su ensayo y costo, para que Guido lo corra) contra `CONVENCIONES.md` y la memoria `principal-filtra-y-corre` (cada sesión corre los suyos; la principal no le muestra comandos a Guido). ¿Sigue vigente `comandos-para-tiempo-ocioso`? Si no, se borra; si sí, la excepción tiene que decir cuándo.

**Q-5. Consistencia entre clubes.** La skill `auditoria-finance-of-sports`, eje `datos`, pide: «¿El criterio contable es el mismo que en clubes parecidos del mismo país?». La memoria `no-reabrir-criterios-categoria` (to-do 101 cerrado) dice: no proponer recategorizar datos cargados por consistencia entre clubes. ¿La auditora marca la diferencia y la deja, o ni la marca?

**Q-6. Quién autoriza editar skills.** Memoria `no-editar-skills-sin-avisar`: texto exacto a Guido y su ok, «aunque el Cómo mantener diga otra cosa». Pero `club-data-mapping` (Cómo mantener) dice «No hace falta pedirle permiso… para estas actualizaciones menores»; `auditoria`, `escala`, `club-sourcing` y `start-session` mandan «agregalo». Y `club-sourcing/paises/*.md` están dentro de `.claude/skills/`: ¿cuentan como skill? La memoria dice «lo nuevo se documenta libre en `Admin/sourcing/`»; `club-sourcing` manda actualizar los `paises/*.md`. (Ver S-7, S-14, S-15.)

**Q-7. Rayas largas (em dash).** `CONVENCIONES.md` (REGLA DE ESTILO): ningún em dash en texto nuevo de ese archivo ni de las skills («los 2 skills», hoy son 8). La práctica: `club-sourcing/SKILL.md` tiene decenas, `CONVENCIONES-DATOS.md` 18 y `CONVENCIONES.md` 8. ¿La regla sigue, se limita al copy visible del sitio, o se saca?

**Q-8. «Versión N» en los documentos de criterio.** `CONVENCIONES.md`, líneas 9–11, dice que sus bullets todavía llevan número de versión, «un resto… no algo a imitar»; la memoria `docs-de-criterio-sin-historia-ni-contadores` lo prohíbe para `PIPELINE.md`, `CONVENCIONES…` y las skills. ¿Se limpia (tarea grande, toca ~46 líneas de índice y muchos bullets) o se tolera el resto? Mientras tanto, el «Índice de las reglas que viven en otro archivo» (líneas 131–176, 46 punteros con versión) sirve para que una búsqueda por versión llegue: no lo toqué.

**Q-9. ¿`CONVENCIONES.md` se lee siempre al arrancar?** `start-session` §1 (filas 1 y 2): `ESTADO.md` **y** `CONVENCIONES.md` son «siempre» («con los puntos 1 y 2 ya podés trabajar»). `CLAUDE.md` ("Al empezar") solo manda leer `ESTADO.md`. La skill de onboarding tiene su propio arranque (sin `CONVENCIONES.md`, aunque la usa). ¿Cuál es la lista?

---

## 4. Lo que se podría chequear con un script (solo listado; no toqué `tools/` ni hooks)

Son los candidatos para el to-do 250 (hooks) o `tools/audit.js`. Cada uno nombra la regla y de dónde sale.

| # | Chequeo | Dónde | Regla de origen |
|---|---|---|---|
| C-1 | Frenar un `Bash` con `/tmp`, `$(…)`, `$VAR` en una ruta, `cd … &&` o `;` encadenados | hook PreToolUse (Bash) | memoria `comandos-sin-pedir-permiso` |
| C-2 | Frenar un `Agent` cuyo prompt no traiga la instrucción «Read y Write, Bash solo grep simple sin variables» | hook PreToolUse (Agent) | memoria `subagentes-sin-bash` |
| C-3 | Frenar `EnterPlanMode`/`ExitPlanMode` en una sesión de worktree | hook PreToolUse | memoria `worktrees-en-modo-auto` |
| C-4 | Frenar `git merge` / `git pull` dentro de un worktree | hook PreToolUse (Bash) | memoria `el-merge-lo-hace-main` |
| C-5 | Frenar `node -e "import(…tools/…)"` o `require('./tools/…')` (salvo `data-clubes.js`, `rutas.mjs`) | hook PreToolUse (Bash) | memoria `tools-no-importar-para-chequear` |
| C-6 | Frenar `rm`/`mv` sobre `Clubes/` y `rsync -a` sin `--no-links` | hook PreToolUse (Bash) | memorias `no-borrar-pdfs-de-clubes`, `rsync-worktree-sin-symlinks` |
| C-7 | Frenar `git push` sin un «dale» de Guido en el turno | hook PreToolUse (Bash) | `start-session` §6 |
| C-8 | Frenar `Edit`/`Write` bajo `.claude/skills/` | hook PreToolUse | memoria `no-editar-skills-sin-avisar` (ver Q-6; `Admin/ESTADO.md` línea 128 dice que ya piden permiso, comprobar si es un hook o la configuración) |
| C-9 | `audit.js`: en `.claude/skills/**/*.md` y en `CLAUDE.md`, avisar (P3) por «Versión N», fechas `AAAA-MM-DD` fuera de ejemplos de formato, «to-do N» y números fijos de clubes/PDFs/checks | `tools/audit.js` | memoria `docs-de-criterio-sin-historia-ni-contadores` |
| C-10 | `audit.js`: rutas de archivos que un documento vivo nombra y no existen (extender `ruta-muerta` a skills y `CLAUDE.md`; hoy da 0 hallazgos reales, medido en la auditoría de hoy) | `tools/audit.js` | `CLAUDE.md`, «docs desactualizados» |
| C-11 | `audit.js`: **párrafos casi idénticos (≥ 200 caracteres, normalizados) repetidos entre `CLAUDE.md`, las skills y los `Admin/*.md` vivos**; es lo que evita que esta consolidación se vuelva a ensuciar. Los casos A-1 a A-5 son los que daría hoy | `tools/audit.js` | to-do 255 |
| C-12 | `audit.js`: raya larga (em dash) en líneas **nuevas** de `CONVENCIONES*.md` y skills (solo si Q-7 la deja vigente) | hook de commit o `audit.js` | `CONVENCIONES.md` (REGLA DE ESTILO) |

---

## 5. Lo que no revisé (para una segunda pasada)

- `PIPELINE.md`: tiene secciones por etapa que repiten reglas de `club-data-mapping` y `CONVENCIONES-DATOS.md` (perímetro: 29 menciones en `PIPELINE.md` y 12 en `CONVENCIONES-DATOS.md`; `incluidoEn`: 4 lugares). No comparé párrafo por párrafo.
- `PANTALLA.md`: rastreé `ASSET_V` (A-1); falta el resto de reglas de pantalla por si hay otra copia dentro del mismo archivo (la tuvo tres veces).
- `ESTADO.md` y `TODO.md` son de la principal: vi que `ESTADO.md` repite reglas (líneas ~128, ~216, ~256) pero no las toqué.
- `club-sourcing` y su carpeta `paises/` (30+ archivos): 52 rayas largas y varias frases iguales entre países; no las comparé.
- Las 27 memorias entre sí: solo cacé las repeticiones que sale a la vista (S-17, M-1, M-2, Q-3 a Q-6).
