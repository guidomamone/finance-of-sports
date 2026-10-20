# To-do 255, fase 1: inventario de reglas repetidas o contradichas (DOCS 1, 2026-10-20)

Alcance: `CLAUDE.md`, las 8 skills de `.claude/skills/` (SKILL.md, `worktree.md`, `club-nuevo.md`), las 27 memorias, y `Admin/CONVENCIONES.md`, `CONVENCIONES-DATOS.md`,
`PANTALLA.md`, `PIPELINE.md` y `ARQUITECTURA.md`. Método: leí completos `CLAUDE.md`, `CONVENCIONES.md`, las memorias, `start-session`, `worktree.md` y `club-or-year-onboarding`;
el resto, por tema con grep (cada regla de abajo la abrí en sus copias). **No es exhaustivo:** `PIPELINE.md` (115 KB), `PANTALLA.md` (90 KB) y `CONVENCIONES-DATOS.md` (42 KB) tienen más
repeticiones internas que no cacé; está marcado en "Lo que no revisé".

## Resumen

| | Cantidad |
|---|---|
| Reglas dedupeadas y aplicadas en esta rama (solo `Admin/*.md`) | **5** reglas (7 ediciones, 4 archivos) |
| Propuestas de skill o memoria, con texto final de antes y de después (sección 2) | **27** (P-1 a P-27: 23 de skill, 4 de memoria) |
| Contradicciones reales (9 preguntas, contestadas por Guido; queda 1 nueva, R-1) | **9** (Q-1 a Q-9) |
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

`CLAUDE.md`: **no hizo falta tocarlo** (es la copia vigente en A-4 y A-5). En la fase 2 la principal aplicó además, a pedido de Guido, Q-1 y Q-9 en `CLAUDE.md` y Q-7 en `CONVENCIONES.md` (sección 3).

---

## 2. Texto final aprobado (Guido, 2026-10-20: «ok a todas»; P-23 opción A). APLICADO todo: P-1 a P-23 por Docs 1, P-22 por la principal, P-24 a P-27 (memorias) por la principal

Guido contestó las 9 preguntas (sección 3) y esta sección ya las incorpora. Cada propuesta dice archivo y línea de hoy, el texto de antes (literal) y el de después. Se lee de corrido y se contesta con
«ok» o «no» por número. Las líneas son las de la rama al día con main. De la primera versión de este inventario ya están aplicadas por la principal las rutas con país de `start-session` y la salida del check-in de
`club-outreach`; las saqué.

### 2.1 `start-session-finance-of-sports-project/SKILL.md`

**P-1. §1, tabla (líneas 25 y 42): `CONVENCIONES.md` deja de ser «siempre»** (Guido, Q-9: ESTADO siempre; CONVENCIONES cuando la skill de la tarea lo pide; coincide con `CLAUDE.md`).
Antes, fila 2: `| 2 | \`Admin/CONVENCIONES.md\`: reglas de proceso | **siempre** |`
Después: `| 2 | \`Admin/CONVENCIONES.md\`: reglas de proceso | cuando la skill de la tarea lo pide |`
Antes, línea 42: "Con los puntos 1 y 2 ya podés trabajar. Todo lo demás es a demanda."
Después: "Con el punto 1 ya podés trabajar. Todo lo demás es a demanda."

**P-2. §2, líneas 48–50: repite `CONVENCIONES.md`, líneas 12–15.**
Antes: "Las reglas de `Admin/CONVENCIONES.md` que dicen "pedido explícito de Guido" no se negocian sin preguntarle. Si una decisión de esta sesión contradice una de esas, preguntá primero y actualizá el archivo después, en la misma sesión."
Después: "Las reglas «pedido explícito de Guido» de `Admin/CONVENCIONES.md` no se negocian sin preguntarle (ahí está también qué hacer si una decisión nueva contradice una)."

**P-3. §3, líneas 64–68: `ASSET_V` incompleto (no dice que son dos lugares) y con un ejemplo viejo** (`118a`; hoy el valor es numérico).
Antes: "`window.ASSET_V` (arriba de los `<script src>` en `index.html`) es la versión de los assets propios. **Si tocás cualquier archivo de `js/` o `data/` y el navegador te sigue mostrando lo viejo, subí ASSET_V** a un valor que nunca se haya pedido antes (ej. `118a`), navegá, confirmá, y dejalo en un valor limpio al terminar. El caché de este entorno es agresivo y NO se rinde con reload, Cmd+Shift+R, pestaña nueva ni cambio de puerto: cambiar la URL exacta es lo único que funciona."
Después: "Si tocás `js/` o `data/` y el navegador te muestra lo viejo: subí `ASSET_V` (la constante y cada `?v=`) y navegá con `?cb=<algo nuevo>`. La regla y las trampas del navegador de preview: `Admin/PANTALLA.md`, «CACHE DE ASSETS» y «Trampas del navegador de preview»."

**P-4. §4, líneas 94–96: la misma frase está también en §5 (líneas 139–142).**
Antes: "Si tocaste `js/` o `data/` y subiste `ASSET_V`, hay que regenerar `fuentes.html` y sus páginas de club, porque ese generador LEE `ASSET_V` de `index.html`."
Después: borrar la oración (queda en §5).

**P-5. §5, líneas 109–126: repite «Antes de terminar la sesión» de `CLAUDE.md` y no dice nada del worktree** (Guido, Q-1: en un worktree la sesión deja su nota y la principal escribe TODO, CHANGELOG y ESTADO; `CLAUDE.md` ya lo dice).
Antes: los cinco puntos numerados (ESTADO, TODO, CHANGELOG, `finance-of-sports-project.md`, regla nueva) y el párrafo «No dupliques la to-do list…» (líneas 111–126).
Después:
> Con cualquier cambio real, sin que Guido lo pida: lo que dice `CLAUDE.md`, «Antes de terminar la sesión» (en un worktree, la nota `Admin/sesiones/<rama>.md` en lugar de tocar TODO, CHANGELOG y ESTADO: ver `worktree.md`). Si se decidió una regla nueva o se contradijo una vieja, va a `Admin/CONVENCIONES.md` (proceso), `Admin/CONVENCIONES-DATOS.md` (datos) o `Admin/PANTALLA.md` (pantalla y código).

La parte de archivos generados (líneas 128–142: «SI TOCASTE DATOS DE UN CLUB…») se queda: es de la skill.

**P-6. §6, líneas 146–154: el push no se pide ni se menciona** (Guido, Q-2; gana la memoria `no-recordar-push`). Además se saca el contador «~25 deploys/mes».
Antes:
> - **`git commit` local: libre.** Después de cada chunk verificado, sin preguntar.
> - **`git push`: SIEMPRE hay que pedirle permiso explícito a Guido, cada vez.** No importa cuánto trabajo se acumuló ni qué tan verificado esté. Un "dale" general o pasar a la tarea siguiente NO es autorización.
>
> Por qué: el repo está conectado a Netlify con deploy automático al pushear a `main`, y el plan es el free tier (~25 deploys/mes). Un commit local no dispara nada; un push sí.

Después:
> - **`git commit` local: libre.** Después de cada chunk verificado, sin preguntar.
> - **`git push`: no se hace, no se pide y no se menciona.** El push a `main` es un deploy automático en Netlify y lo decide y lo hace Guido por su cuenta. Un commit sin publicar se dice «commiteado» y nada más.

**P-7. §4, línea 82: «antes de pushear».**
Antes: "**Correlo siempre antes de pushear algo que toque datos.**"
Después: "**Correlo siempre antes de dar por cerrado algo que toque datos.**"

**P-8. «Cómo mantener este skill», líneas 196–197: da permiso para editar la skill** (Guido, Q-6: toda edición se le muestra antes).
Antes: "Si en una sesión aparece un paso de arranque, de verificación o de cierre que no está acá, agregalo. Si un paso de acá resultó innecesario, sacalo."
Después: "Si aparece un paso de arranque, de verificación o de cierre que no está acá, proponele a Guido el texto exacto y esperá su ok. Si un paso resultó innecesario, proponé sacarlo."

### 2.2 `club-or-year-onboarding/SKILL.md`

**P-9. «Guido corre los lotes» está vencido** (descripción, líneas 3, 16, 35–36, 47, 50, 60–61, 125). `CONVENCIONES.md`, «Cada sesión corre sus propios lotes y tiene un presupuesto», dice que la sesión larga sus lotes en su carpeta, en segundo plano, y ni Guido ni la principal los largan (Guido, Q-4: nadie le pasa comandos).

| Línea | Antes | Después |
|---|---|---|
| 3 | "…correr lotes que Guido ejecuta en su terminal, leer los resultados…" | "…correr lotes en segundo plano, leer los resultados…" |
| 16 | "- sin gastar tokens de sesión (todo en scripts que corre Guido en su terminal)," | "- sin gastar tokens de sesión (todo en scripts de `tools/` que la propia sesión corre en segundo plano)," |
| 35–36 | "…Guido corre lo mismo con `caffeinate -i` y `--ejecutar`." | "…la sesión corre lo mismo con `caffeinate -i` y `--ejecutar`, dentro de su presupuesto (`Admin/CONVENCIONES.md`)." |
| 47 | "5. Guido corre `caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar`, y con `--cargar` si…" | "5. La sesión corre `caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-NN.txt --ejecutar` en segundo plano, y con `--cargar` si…" |
| 50 | "6. Leer el resultado: el bloque final que pega Guido (no la terminal entera)…" | "6. Leer el resultado: la salida del lote (no la terminal entera)…" |
| 60–61 | "`--ejecutar --escribir` lo corre Guido, porque sus escalones 1b (Jev) y 2 (IA) usan API." | "`--ejecutar --escribir` lo corre la sesión si el ensayo gratis entra en el presupuesto; si no, se frena y se avisa a la principal." |
| 125 | "- `git status` se ensucia solo mientras Guido corre lotes (logs en…" | "- `git status` se ensucia solo mientras corre un lote (logs en…" |

Además, en la línea 46 («Decirle a Guido qué etapa toca, para qué sirve y cuánto cuesta») cambia «Guido» por «la principal»: el ensayo da el costo y, si no entra en el presupuesto, se frena.

**P-10. §5, líneas 115–116: redirige a `/tmp`**, que la memoria `comandos-sin-pedir-permiso` y los briefs prohíben.
Antes: `node tools/lote.mjs --lista Admin/lotes/prueba-completa.txt > /tmp/medir-antes.txt 2>&1     # antes del cambio` y la misma con `/tmp/medir-despues.txt`.
Después: la misma línea con la salida a un archivo de la carpeta de scratchpad de la sesión, con la ruta escrita entera (no `/tmp`, ni variables).

**P-11. §4, líneas 92–93: «gastar dólares está bien» sin el presupuesto.**
Antes: "Gastar dólares de API está bien; tokens de sesión, no."
Después: "Gastar dólares de API está bien, dentro del presupuesto de la sesión (`Admin/CONVENCIONES.md`); tokens de sesión, no."

**P-12. §4, línea 103: repite la memoria `un-mensaje-preguntas-en-orden`.**
Antes: "- **Sin la herramienta de preguntas:** las decisiones van numeradas en el mensaje."
Después: borrar la línea.

**P-13. §4, líneas 88–91: HALLAZGOS solo para lo que no frena nada** (Guido, Q-3; la memoria `mejoras-de-script-al-todo` ya no existe).
Antes: "- **No perseguir casos sin daño.** Si un defecto no afecta ningún dato cargado ni frena nada hoy, se mide su impacto y se anota en `Admin/HALLAZGOS-pipeline.md`, sección "Conocido, sin daño hoy", con la condición para retomarlo; no va al TODO y no se diseña un arreglo. Si la condición se cumple, vuelve al TODO. Una regla que "siempre incluye/excluye" algo es manta corta: va como escalón (probar lo que dijo la IA y, solo si la compuerta no cierra, probar lo otro)."
Después: "- **No perseguir casos sin daño.** `Admin/HALLAZGOS-pipeline.md`, sección "Conocido, sin daño hoy", es SOLO para un defecto que no afecta ningún dato cargado ni frena nada: se mide su impacto y se anota con la condición para retomarlo, y no se diseña un arreglo. Un defecto que frena una carga no va ahí: va a `Admin/registros/frenados-por-script.jsonl` (sección 3a, punto 7) y sigue el circuito de `Admin/CONVENCIONES.md` (Pipeline arregla, la Auditora aprueba). Si la condición de un caso de HALLAZGOS se cumple, pasa a ese circuito. Una regla que "siempre incluye/excluye" algo es manta corta: va como escalón (probar lo que dijo la IA y, solo si la compuerta no cierra, probar lo otro)."

**P-14. §8, líneas 148–154: repite el cierre y el push.**
Antes: «- Cambió una tool → `Admin/PIPELINE.md` al día… - Se midió algo y no entró → … - Pendiente nuevo o resuelto → `Admin/TODO.md` (lo resuelto se borra). - Una entrada en `Admin/CHANGELOG.md` por cada cambio real. - Git: commitear el código separado de los logs de los lotes. Sin push: cada push a `main` es un deploy y lo hace Guido.»
Después:
> - Cambió una tool → `Admin/PIPELINE.md` al día (ese texto no necesita el ok de Guido).
> - Se midió algo y no entró → una línea en `Admin/HALLAZGOS-pipeline.md`.
> - El resto del cierre (nota de sesión en un worktree, o TODO, CHANGELOG y ESTADO en la principal): `CLAUDE.md`, «Antes de terminar la sesión».
> - Commitear el código separado de los logs de los lotes.

### 2.3 `club-data-mapping/SKILL.md`

**P-15. Descripción, línea 3: manda «actualizar el skill al terminar»** (Guido, Q-6).
Antes: "…o aparece un caso que el skill no cubre, actualizar el skill al terminar (ver "Cómo mantener este skill" al final)."
Después: "…o aparece un caso que el skill no cubre, proponerle a Guido el cambio al terminar (ver "Cómo mantener este skill" al final)."

**P-16. «Cómo mantener este skill», líneas 225–236.**
Antes (primera línea y bullets): "Se lee UNA VEZ al empezar a mapear un balance/presupuesto nuevo, y se ACTUALIZA al terminar la sesión si:" / "- Apareció un rubro que no encajaba limpio en la tabla de la sección 1: agregalo con el criterio que usaste." / "- Tomaste una decisión que contradice algo de este skill: actualizá la sección y explicá por qué el caso nuevo justificaba desviarse…" y el cierre "No hace falta pedirle permiso a Guido para estas actualizaciones menores. Un cambio al texto de este skill se le muestra antes."
Después: "Se lee UNA VEZ al empezar a mapear un balance/presupuesto nuevo, y al terminar la sesión se le PROPONE a Guido un cambio (texto exacto, y espera su ok) si:" / "- Apareció un rubro que no encajaba limpio en la tabla de la sección 1: proponé agregarlo con el criterio que usaste." / "- Tomaste una decisión que contradice algo de este skill: proponé actualizar la sección y explicá por qué el caso nuevo justificaba desviarse…" y el cierre: "Todo cambio al texto de este skill, también los menores, se le muestra antes a Guido y espera su ok." El resto de los bullets (club con estructura distinta, cómo leer un PDF) sigue igual, con «proponé» en lugar de la orden de editar.

**P-17. §7, líneas 183–188, y `CONVENCIONES-DATOS.md` («una gestión sin fuente pública queda en null»): dos redacciones de la misma regla.**
Antes: "Si no podés confirmar con confianza quién presidía el club en ese ejercicio (Racing 2009-2011, época de fideicomiso/quiebra sin presidencia electa clara), dejá `gestionId: null` y NO agregues una entrada a `gestionesByClub`. El año sigue visible en "Año a año", solo no participa de "Por gestión"/"Comparar Gestiones". Mejor un año sin gestión que una gestión inventada."
Después: "Cuándo una gestión queda en `null` y cómo se busca: `Admin/CONVENCIONES-DATOS.md`, «una gestión (presidente) sin fuente pública queda en null». Con `null`, el año sigue visible en "Año a año", solo no participa de "Por gestión"/"Comparar Gestiones". Mejor un año sin gestión que una gestión inventada." (Se deja la primera oración de la sección, «`gestionId` y `gestionesByClub` son documentación, no algo que el motor use para filtrar», que es de mapeo.)

### 2.4 `auditoria-finance-of-sports/SKILL.md`

**P-18. Eje `datos`, línea 59: consistencia entre clubes solo en una carga nueva** (Guido, Q-5: la Auditora marca si el criterio de una carga nueva difiere de clubes parecidos; lo ya cargado no se reabre).
Antes: "¿El criterio contable es el mismo que en clubes parecidos del mismo país?"
Después: "En una carga nueva, ¿el criterio contable es el mismo que en clubes parecidos del mismo país? Si difiere, se marca para decidirlo (un criterio de datos va a Guido). Lo ya cargado no se reabre ni se recategoriza por consistencia entre clubes, salvo un error claro."

**P-19. «Cómo mantener este skill», líneas 189–192.**
Antes: "Si una auditoría encuentra una clase de problema que no está en ningún eje, agregá el eje o extendelo. Si un chequeo terminó siendo automatizable, movelo a `tools/audit.js` y sacalo de acá…"
Después: "Si una auditoría encuentra una clase de problema que no está en ningún eje, proponele a Guido agregar el eje o extenderlo (texto exacto, y espera su ok). Si un chequeo terminó siendo automatizable, el chequeo va a `tools/audit.js` y se propone sacarlo de acá…" (el resto de la oración sigue igual).

### 2.5 `escala-finance-of-sports/SKILL.md`

**P-20. Líneas 271–273 y «Cómo mantener», líneas 283–288.**
Antes (paso 5): "…y actualizá esta skill con lo que cambió en las reglas (no con los números ni con la historia: eso va al reporte y a `Admin/CHANGELOG.md`)."
Después: "…y proponele a Guido el cambio a esta skill con lo que cambió en las reglas (no con los números ni con la historia: eso va al reporte y a `Admin/CHANGELOG.md`)."
Antes: "- **Cuando aparece un cuello nuevo**, agregalo a la categoría que corresponda (A a I)…" y "- **Cuando un hallazgo de acá se vuelve chequeable en código**, movelo a `checkEscala()` en `tools/audit.js` y sacalo de esta lista…"
Después: "- **Cuando aparece un cuello nuevo**, proponé agregarlo a la categoría que corresponda (A a I)…" y "- **Cuando un hallazgo de acá se vuelve chequeable en código**, el chequeo va a `checkEscala()` en `tools/audit.js` y se propone sacarlo de esta lista…"

### 2.6 `club-sourcing/SKILL.md` y `club-sourcing/paises/*.md` (Q-6: los `paises/` también)

**P-21. «Cómo mantener este skill», líneas 434–445.**
Antes: "Actualizar el archivo del país correspondiente la primera vez que produzca un hallazgo real de metodología… Si un ángulo ya documentado ahí como "bloqueado" se destraba…, actualizar ese archivo en vez de dejarlo diciendo que sigue bloqueado." y "**País nuevo, sin canal documentado todavía**: crear `paises/<País>.md` (mismo formato…) y agregarle su línea al índice…"
Después: "Cuando un país produce un hallazgo real de metodología (un regulador que aplica a todos los clubes, un gotcha de navegación que costó descubrir), o un ángulo «bloqueado» se destraba, proponele a Guido el texto exacto del cambio al archivo del país y esperá su ok; mientras tanto el hallazgo se documenta en `Admin/sourcing/<País>/<Club>.md`. **País nuevo, sin canal documentado todavía**: proponer `paises/<País>.md` (mismo formato…) y su línea en el índice, con el mismo ok." Nota: la regla vale también para editar los `paises/*.md` a mano.

### 2.7 `club-outreach/SKILL.md`

**P-22. «Cómo mantener este skill», líneas 189–196.**
Antes: "Actualizar la sección 1 (flujo de Etapa 1) si cambia el formato del frontmatter del borrador o el comportamiento de `tools/outreach-send.js`… Actualizar la sección 4 (Etapas 2-4) recién cuando Guido decida activar alguna…"
Después: "Si cambia el formato del frontmatter del borrador o el comportamiento de `tools/outreach-send.js`, proponerle a Guido actualizar la sección 1 (tienen que quedar sincronizados: el script es la fuente de verdad de qué formato acepta). La sección 4 (Etapas 2-4) se actualiza recién cuando Guido decida activar alguna, también con su ok sobre el texto…"

### 2.8 Una regla repetida en cuatro skills (decisión de Guido; Q-8 no la resuelve)

**P-23. «Sin historia, sin contadores, sin "to-do N"»** está en la memoria `docs-de-criterio-sin-historia-ni-contadores`, `auditoria-finance-of-sports` («Cómo mantener», primer párrafo), `escala-finance-of-sports` («Cómo mantener», primer bullet) y `club-or-year-onboarding` §9. Opción A (consolidar): dejar la regla entera una vez, en `CLAUDE.md` («Al empezar»), y en cada skill una línea «Sin historia ni contadores: ver `CLAUDE.md`.»; la memoria queda como puntero. Opción B (no hacer nada): se toleran las cuatro copias. Recomiendo A, pero es la única de esta sección que agrega una línea a `CLAUDE.md`.

### 2.9 Memorias (no las toca la sesión)

**P-24. Borrar `rsync-worktree-sin-symlinks.md` y su línea de `MEMORY.md`.** Antes: la memoria entera (el `rsync -a --no-links` y el motivo están en `worktree.md`, líneas 14–16, y ahora también en `CONVENCIONES.md` por el dedupe A-2). Después: borrada. Si Guido prefiere que se cargue sin abrir la skill, no hacer nada.

**P-25. Reescribir `worktrees-en-modo-auto.md`** (se contradice a sí misma: el primer párrafo manda pasar `permission_mode: "auto"`; el cuarto dice que lo que funciona es no pasarlo). Después (vigente):
> Al arrancar una sesión de worktree: NO pasar `permission_mode` (hereda el auto de la principal); verificar con `get_session` que sea `auto`; si cayó a `acceptEdits`, subirla con `set_session_permission_mode`. Modelo: Sonnet (`claude-sonnet-5-5`). Las sesiones de worktree no usan EnterPlanMode/ExitPlanMode ni el panel Plan (aprobar un plan las pasa a acceptEdits); diseños y preguntas van en el chat. El brief lleva la regla de comandos sin `$(...)` ni variables.

**P-26. `no-endurecer-reglas-sin-preguntar.md`, párrafo «Cambio 2026-10-20»** repite el punto (1) a (4) de `CONVENCIONES.md`.
Después: "Quién aprueba un arreglo de script: `Admin/CONVENCIONES.md`, «ONBOARDING CARGA, PIPELINE ARREGLA, AUDITORA APRUEBA»; endurecer una compuerta o agregar un criterio de datos sigue yendo a Guido."

**P-27. Dos enlaces rotos por las memorias borradas.** `comando-en-el-mensaje-final.md` línea 18 y `comandos-y-disenos-en-el-texto-final.md` línea 20 terminan en «Relacionado: [[un-mensaje-preguntas-en-orden]], [[comandos-para-tiempo-ocioso]].» → «Relacionado: [[un-mensaje-preguntas-en-orden]].»

---

## 3. Respuestas de Guido a las 9 preguntas (2026-10-20) y qué quedó

| # | Pregunta | Respuesta | Qué se hizo |
|---|---|---|---|
| Q-1 | ¿Quién escribe ESTADO, TODO y CHANGELOG? | En un worktree, la sesión deja su nota y la principal escribe los tres. | **Aplicado:** `CLAUDE.md`, «Antes de terminar la sesión», lo aclara. Skill: P-5. |
| Q-2 | El push | No se pide ni se menciona; gana `no-recordar-push`. | Skill: P-6, P-7, P-14. |
| Q-3 | Qué se hace con una mejora de script | Manda el circuito frenados, Pipeline, Auditora. HALLAZGOS solo para un defecto que no frena nada. | Skill: P-13. (La principal borró `mejoras-de-script-al-todo`.) |
| Q-4 | Comandos para Guido | Nadie le pasa comandos; la principal borró `comandos-para-tiempo-ocioso`. | Skill: P-9, P-10; memoria: P-27. |
| Q-5 | Consistencia entre clubes | En una carga nueva, la Auditora marca si el criterio difiere; lo cargado no se reabre. | Skill: P-18. |
| Q-6 | Quién autoriza editar skills | Toda edición, incluidos los `paises/*.md`, se le muestra antes. Ya está en la memoria. | Skill: P-8, P-15, P-16, P-19, P-20, P-21, P-22. |
| Q-7 | Rayas largas | Solo para el texto visible del sitio. | **Aplicado:** `CONVENCIONES.md`, REGLA DE ESTILO. El chequeo C-12 pasa a mirar solo el texto del sitio. |
| Q-8 | «Versión N» en los documentos | Se tolera lo viejo y no se agrega más; no limpiar. | Nada. |
| Q-9 | ¿Se lee `CONVENCIONES.md` al arrancar? | `ESTADO` siempre; `CONVENCIONES` cuando la skill de la tarea lo pide. | **Aplicado:** `CLAUDE.md`, «Al empezar». Skill: P-1. |

**Pregunta que queda abierta, nueva (R-1):** una mejora de script que **no** es un defecto y no frena nada (una idea de un lote, por ejemplo) ya no tiene dónde ir: la memoria que la mandaba al TODO se borró, HALLAZGOS es solo para defectos sin daño y el circuito de frenados es para lo que frena. ¿Va igual a `Admin/HALLAZGOS-pipeline.md` («Conocido, sin daño hoy»), a `Admin/TODO.md`, o no se anota?

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
| C-7 | Frenar `git push` en una sesión de worktree (el push lo hace Guido solo) | hook PreToolUse (Bash) | `start-session` §6 (P-6) |
| C-8 | Frenar `Edit`/`Write` bajo `.claude/skills/`, incluidos los `paises/*.md` | hook PreToolUse | memoria `no-editar-skills-sin-avisar` (Q-6; `Admin/ESTADO.md` línea 128 dice que ya piden permiso, comprobar si es un hook o la configuración) |
| C-9 | `audit.js`: en `.claude/skills/**/*.md` y en `CLAUDE.md`, avisar (P3) por «Versión N», fechas `AAAA-MM-DD` fuera de ejemplos de formato, «to-do N» y números fijos de clubes/PDFs/checks | `tools/audit.js` | memoria `docs-de-criterio-sin-historia-ni-contadores` |
| C-10 | `audit.js`: rutas de archivos que un documento vivo nombra y no existen (extender `ruta-muerta` a skills y `CLAUDE.md`; hoy da 0 hallazgos reales, medido en la auditoría de hoy) | `tools/audit.js` | `CLAUDE.md`, «docs desactualizados» |
| C-11 | `audit.js`: **párrafos casi idénticos (≥ 200 caracteres, normalizados) repetidos entre `CLAUDE.md`, las skills y los `Admin/*.md` vivos**; es lo que evita que esta consolidación se vuelva a ensuciar. Los casos A-1 a A-5 son los que daría hoy | `tools/audit.js` | to-do 255 |
| C-12 | `audit.js`: raya larga (em dash) en el texto visible del sitio (`data/lang/*.js`, copy de `index.html` y de las páginas), salvo el símbolo de «sin dato» en celdas de tabla | `tools/audit.js` | `CONVENCIONES.md` (REGLA DE ESTILO, ahora solo texto visible) |

---

## 5. Lo que no revisé (para una segunda pasada)

- `PIPELINE.md`: tiene secciones por etapa que repiten reglas de `club-data-mapping` y `CONVENCIONES-DATOS.md` (perímetro: 29 menciones en `PIPELINE.md` y 12 en `CONVENCIONES-DATOS.md`; `incluidoEn`: 4 lugares). No comparé párrafo por párrafo.
- `PANTALLA.md`: rastreé `ASSET_V` (A-1); falta el resto de reglas de pantalla por si hay otra copia dentro del mismo archivo (la tuvo tres veces).
- `ESTADO.md` y `TODO.md` son de la principal: vi que `ESTADO.md` repite reglas (líneas ~128, ~216, ~256) pero no las toqué.
- `club-sourcing` y su carpeta `paises/` (30+ archivos): 52 rayas largas y varias frases iguales entre países; no las comparé.
- Las 27 memorias entre sí: solo cacé las repeticiones que sale a la vista (P-24 a P-27 y las preguntas Q-3 a Q-6).
