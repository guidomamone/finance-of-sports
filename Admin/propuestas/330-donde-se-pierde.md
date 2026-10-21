# 330 — Dónde se pierde lo que se decide o se descubre

Propuesta, sin aplicar nada. Sesión Orden 1 (rama `proyecto`). Cada caso tiene archivo y línea; los números salen de `grep` y `ls` de esta sesión, no de una auditoría completa.
Lo que cambia una tool o un chequeo (`audit.js`, `tools/hooks/pre-tool.mjs`, `worktree.mjs`) lo aprueba la Auditora 4 antes de codearse (CONVENCIONES, sección 7 de su skill); acá solo está dicho qué y por qué.

## El patrón de fondo

Una cosa que se descubre o se decide termina en uno de seis lugares. Solo tres se vuelven a leer solos: una regla en una skill o convención (la lee quien arranca), un chequeo (corre sin que nadie se acuerde) y el TODO (se abre al elegir qué sigue). Los otros tres se pierden: la memoria de una sesión, una nota de sesión archivada, un archivo de medición que ningún documento cita.

La regla que propongo para todo: **lo que se decide o se descubre se escribe en el lugar donde se va a leer, en el mismo turno, y lo que una máquina puede vigilar lo vigila una máquina.** Lo demás es un caso de abajo.

## Tipo 1 — Decisiones de Guido que solo quedaron en la memoria

Hoy hay 27 memorias en `~/.claude/projects/…/memory/`. Varias son una decisión de Guido que no está escrita en el repo, así que una sesión sin esa memoria la contradice (el motivo del 257). Ejemplos verificados con `grep` en el repo:

| Decisión | Dónde vive hoy | Falta en |
|---|---|---|
| Un club extinto o refundado vale si sus balances siguen publicados (`clubes-desaparecidos-si-valen.md`) | solo la memoria; `club-sourcing/SKILL.md` no lo dice | skill `club-sourcing`, sección 0 |
| Una carga no se frena por la pregunta de socios u otros deportes: se googlea y se contesta (`no-frenar-carga-por-socios.md`) | solo la memoria; `Admin/PIPELINE.md:720-770` habla de los dos datos por club pero no de googlear | `Admin/PIPELINE.md`, «La cola» de `club-or-year-onboarding` |
| La mejora «que el gate `perfil-en-cola` de `cargar.mjs` nunca frene», que la memoria marca «al TODO» | solo la memoria: `Admin/TODO.md` no tiene `perfil-en-cola` | `Admin/TODO.md` (lo escribe la principal) |
| No proponer recategorizar lo ya cargado por consistencia entre clubes (`no-reabrir-criterios-categoria.md`) | `Admin/CONVENCIONES-DATOS.md:119` y `:410` lo dicen para dos casos concretos, no como regla general | `Admin/CONVENCIONES-DATOS.md`, una línea general |

Proponer: cada memoria de trabajo se mueve a su lugar (tabla completa en `257-skills.md`, parte 1) y la memoria se borra. Para que no vuelva a pasar, el chequeo del tipo 1 de abajo.

**Chequeo propuesto `memoria-no-es-regla` (hook, `tools/hooks/pre-tool.mjs`, deny).** Un Write o Edit sobre `~/.claude/projects/*/memory/*.md` con `type: feedback` o `type: project` se rechaza con el motivo: «una regla de trabajo no vive en la memoria: escribila en `Admin/CONVENCIONES.md`, en una skill (propuesta en `Admin/propuestas/`) o proponé un chequeo». Pasan `type: user` y `type: reference` (quién es Guido, dónde están los links). Es un cambio de condición de tool: va a la Auditora.

## Tipo 2 — Preguntas resueltas que siguen en la lista de preguntas abiertas

`Admin/dudas-por-club.md` tiene 1513 líneas y 105 secciones. Cinco respuestas están escritas adentro de la pregunta en vez de sacar la pregunta: `dudas-por-club.md:356`, `:371`, `:592`, `:600` («RESUELTA») y `:750`; y `:1416` («Gestión resuelta por Guido el 2026-10-09 … Sin preguntas pendientes para el club»), una sección entera que ya no pregunta nada. Con 25 secciones tituladas «no bloqueó nada, solo sin cerrar» (la primera, `:377`), Guido que usa la lista para escribirle a un club tiene que leer 1500 líneas para saber cuáles siguen abiertas.

En el sentido contrario, hay una abierta que no llegó a ningún lado: `dudas-por-club.md:201` (Deportes Tolima: tres cifras de resultado 2025 sin reconciliar, «NO se cargó al sitio»). `data/co/` no tiene a Tolima (sí a Once Caldas), o sea que la pregunta sigue sin respuesta y sin carga. Nadie la vuelve a mirar: no hay disparador.

Proponer:
- Una pregunta resuelta se **mueve** a la evidencia del club (`Admin/carga-clubes/<clubId>.md`, donde ya van las decisiones de carga) y se **borra** de `dudas-por-club.md`; el criterio que salió de la respuesta, si sirve para otros clubes, va a `CONVENCIONES-DATOS.md`.
- Chequeo `duda-resuelta-en-dudas` (`audit.js`, P3): líneas de `dudas-por-club.md` con `RESUELT` o «Sin preguntas pendientes». Hoy da 6.
- Una sola frase en el encabezado de `dudas-por-club.md`: cada sección lleva `Abierta desde: AAAA-MM-DD`; una abierta que bloquea una carga (Tolima) se lista en `Admin/TODO.md`, no solo acá. (Es una convención de formato: no necesita chequeo.)

## Tipo 3 — Hallazgos que nadie vuelve a leer

`Admin/HALLAZGOS-pipeline.md` (41 KB) existe «para no volver a probarlas». Funciona cuando alguien lo abre; hay dos agujeros medibles.

a) **Un descarte medido que no llegó a HALLAZGOS.** La skill `club-or-year-onboarding` dice «Se midió algo y no entró → una línea en HALLAZGOS» (`SKILL.md:164`). Dos mediciones del 2026-10-20 no la tienen: Stirling PDF contra Mistral (to-do 314; conclusión en `Admin/mediciones/stirling-vs-tesseract-vs-mistral.md:30`, «No propongo el escalón») y la voz local con Tesseract (298 x2, `Admin/mediciones/x2-voz-local-escaneos.md`). Las dos viven hoy en `Admin/CHANGELOG.md:437-441` y `:428-429`, y el CHANGELOG guarda solo la última semana (to-do 256): al archivarse, el «ya lo probamos» se va a `Archive/CHANGELOG-v300-v672.md`, que nadie lee. Una sesión que proponga Stirling de nuevo paga la medición otra vez.

b) **Un «Retomar si…» sin disparador.** La sección «Conocido, sin daño hoy» (`HALLAZGOS-pipeline.md:135`) escribe la condición de retomar, pero nadie la mira: «Retomar si A2 pasa del 15% del gasto de API» (`:152`), «Retomar si se carga otro año de Milan» (`:147`). Son condiciones que una tool puede evaluar.

Proponer:
- Línea faltante en HALLAZGOS para 314 y 298 x2 (la escribe quien aplique esta propuesta; no la escribo yo: es un documento de criterio de la principal).
- Chequeo `medicion-sin-destino` (`audit.js`, P3): cada archivo de `Admin/mediciones/` tiene que estar citado desde `HALLAZGOS-pipeline.md`, `PIPELINE.md`, `CONVENCIONES*.md`, `ARQUITECTURA.md` o una skill. Hoy no los cita ninguno de esos documentos, ni ninguna tool, para al menos: `caja-deuda-ia-sonnet.txt` (157 KB), `extraer-opus.txt`, `extraer-sonnet.txt`, `localizar-sonnet.txt` (46 KB), `prueba-batch.txt`, `test-mistral-gemini-escaneos.md`, `informe-260-caja-deuda-sin-documento-nuevo.md`, `stirling-vs-tesseract-vs-mistral.md`, `x2-voz-local-escaneos.md`, `339-inventario.md`. (Pueden estar citados en TODO o CHANGELOG, que no conté.)
- Disparador de HALLAZGOS: a lo que sea contable (gasto de A2, cantidad de pares `-correction`) lo evalúa `tools/gasto.mjs` o `estado.mjs` y lo imprime; lo que no sea contable queda como está, sin pretender que alguien lo mira. Primero, el A2: ya hay un registro (`Admin/registros/api/claude-api.jsonl`), falta que `gasto.mjs` compare contra 15%. Es una tool: va a Pipeline y a la Auditora.

## Tipo 4 — Mediciones que no cambiaron nada

`Admin/mediciones/` tiene unos 1,1 MB de salidas crudas. Muchas cumplieron su función (una conclusión en HALLAZGOS) y el crudo quedó al lado, como si se fuera a releer: `caja-deuda-ia-sonnet.txt` pesa 157 KB, `extraer-verificar-cargado-vs-sonnet.txt` 138 KB. Las que costaron plata y terminaron en «no entra» están bien escritas (la de A2 con Sonnet, US$ 13,82, en `HALLAZGOS-pipeline.md:57-61`); el problema es doble:

- No hay una frase antes de medir que diga **qué decisión cambia el resultado**. Una medición sin decisión asociada es gasto sin retorno posible.
- El crudo y la conclusión viven mezclados: un lector que abre la carpeta no distingue cuál de los 60 archivos importa.

Proponer:
- Regla de proceso, una línea en `club-or-year-onboarding` (texto en `257-skills.md`): antes de una medición paga, el ensayo gratis dice el costo y **una frase dice qué decisión cambia** el resultado (qué se aplica si da bien, qué se descarta si da mal); sin esa frase no se corre.
- Convención de formato: cada archivo de `Admin/mediciones/` empieza con `Conclusión:` y `Destino:` (la regla o el HALLAZGO donde quedó). El crudo que ya cumplió se mueve a `Admin/Archive/mediciones/` cuando su conclusión está en HALLAZGOS; en `mediciones/` queda solo lo que un script usa (los `*-verdad.tsv`, `245-esquema.md`, `248-plan.md`).

## Tipo 5 — Pendientes de una nota de sesión que no llegan al TODO

La nota de cierre de una rama se pasa a TODO/CHANGELOG/ESTADO y se archiva. Si un punto de «Qué queda» no se pasa, queda enterrado en `Admin/Archive/`: hay 118 archivos `sesion-*` (README de Archive los lista uno por uno, 18 líneas solo de `sesion-`), que nadie abre.

Caso verificado: `Admin/Archive/sesion-pipeline-3-2026-10-19-o.md:25-29`. «Qué queda (para TODO)» dice que Patro Eisden 2025 y Lommel SK 2025 quedaron cargados con errores chicos y «Decidir con Guido si se corrigen y cómo». `Admin/TODO.md` no menciona ni a Patro Eisden 2025 ni a Lommel SK 2018 (`grep` sin resultados). O se resolvió sin dejar rastro, o se perdió: con lo que hay no se puede saber, y esa es la prueba de que el pendiente no tiene dónde quedar.

Aparte, las notas crecen sin podarse: `Admin/sesiones/onboarding.md` pesa 53 KB con unos 45 títulos, de los cuales los de 10-19 ya están mergeados; `Admin/sesiones/proyecto.md` arrastra 177 líneas de dos tareas ya cerradas (248, 246/245).

Proponer:
- Al mergear (la principal), cada bullet de «Qué queda» termina con una flecha: `→ TODO n`, `→ regla (archivo)`, `→ HALLAZGOS` o `→ descartado: motivo`. Es un paso de `worktree.md` («En la principal, para mergear»), texto en `257-skills.md`.
- `tools/worktree.mjs mergear` imprime los bullets de «Qué queda» que no tienen flecha antes de archivar y se detiene si hay alguno. Cambio de tool: Pipeline + Auditora.
- Una nota de rama no se acumula: al mergear, la principal la mueve a Archive entera (ya es lo que dice `worktree.md`); la sesión que sigue escribe una nota nueva, no debajo de la vieja. (Contradice `merge-trampas.md`, que dice «que escriba al final»: esa memoria era un parche a que las notas no se archiven; con el archivado completo deja de hacer falta.)
- `Admin/Archive/README.md` lista cada archivo de sesión: reemplazar la lista por una línea por rango («`sesion-*-2026-10-18*` a `-20`: cierres de sesión ya pasados a TODO, CHANGELOG y ESTADO; no se leen»). Nadie busca ahí por nombre.

## Tipo 6 — Registros sin lector

`grep` de cada nombre contra `tools/`, `PIPELINE.md`, `CONVENCIONES*.md` y `.claude/` (ESTADO no cuenta como lector). Sin ninguna referencia: `Admin/registros/caja-deuda-resto.log`, `altas-borrador-portugal.jsonl`, `triage-cola-2026-10-20.md`, `triage-dudas-2026-10-20.md`. `cola-borradores/` solo lo cita `ESTADO.md`. Las demás (`auditoria-proceso.jsonl`, `cargar-ultimo.jsonl`, `categorias-aprendidas.jsonl`, `frenados-por-script.jsonl`, `mudanzas-carpetas.json`, `perfil-clubes.jsonl`, `transcripciones-verificaciones.jsonl`) tienen lector.

Proponer: `Admin/registros/README.md` con una línea por archivo (qué lo escribe, qué lo lee, quién lo borra y cuándo); lo sin lector se archiva. Chequeo `registro-sin-lector` (P3) si la Auditora lo quiere: cada archivo de `registros/` aparece citado por una tool o un documento de criterio.

## Un caso aparte: documentos de criterio con historia

La regla de Guido («sin historia, sin contadores, sin to-do N») no está chequeada, y se rompe: `Admin/CONVENCIONES.md` tiene 40 líneas con «Versión N» (el «Índice de las reglas que viven en otro archivo», desde `:156`), `Admin/ESTADO.md` tiene 6 «to-do N» y una skill tiene 1. La memoria `docs-de-criterio-sin-historia-ni-contadores.md` pedía que lo recordara cada sesión.

Proponer: chequeo `doc-de-criterio-con-historia` (`audit.js`, P3 al principio): en `.claude/skills/*/SKILL.md` y `Admin/ESTADO.md` (no en CONVENCIONES hasta limpiarla), `Versión \d+` y `to-do \d+` fuera de un bloque de código. Es lo que hoy hace de memoria una sesión; con la skill de arranque diciéndolo, la memoria se borra.

## Resumen: dónde tiene que quedar cada tipo

| Tipo | Hoy | Tiene que quedar en | Lo vigila |
|---|---|---|---|
| Decisión de Guido en el chat | memoria | `CONVENCIONES*.md` / skill (propuesta en `Admin/propuestas/`) | hook `memoria-no-es-regla` |
| Pregunta resuelta | dentro de la pregunta | `Admin/carga-clubes/<id>.md`; se borra de dudas | `audit.js` `duda-resuelta-en-dudas` |
| Pregunta abierta que frena una carga | solo `dudas-por-club.md` | también en `Admin/TODO.md` | convención de formato |
| Descarte medido | CHANGELOG (se archiva en 7 días) | una línea en `HALLAZGOS-pipeline.md` | `audit.js` `medicion-sin-destino` |
| «Retomar si…» | prosa | un número que una tool imprime (`gasto.mjs`, `estado.mjs`) | la tool |
| Medición paga | archivo crudo | HALLAZGOS + `Conclusión:`/`Destino:` arriba; el crudo a Archive | `audit.js` `medicion-sin-destino` |
| Pendiente de una nota de sesión | `Admin/sesiones/` y después `Archive/` | `TODO n` / regla / HALLAZGOS / descartado, con flecha | `worktree.mjs mergear` frena sin flecha |
| Registro | `Admin/registros/` | con lector declarado en un README | `audit.js` `registro-sin-lector` (opcional) |
| Historia en un doc de criterio | texto | `Admin/CHANGELOG.md` | `audit.js` `doc-de-criterio-con-historia` |

## Qué falta mirar (no lo cubrí)

Los chats de las sesiones (el 330 los nombra): no los leí; `mcp__ccd_session_mgmt__search_session_transcripts` serviría para buscar decisiones de Guido dichas en el chat que no están en el repo ni en la memoria. Las 118 notas de `Archive/sesion-*` las muestreé (dos), no las leí todas. Si Guido quiere completar el tipo 5, una pasada con subagentes (Read, Grep y Write) sobre las notas archivadas buscando «Qué queda» sin su punto en TODO da la lista real.
