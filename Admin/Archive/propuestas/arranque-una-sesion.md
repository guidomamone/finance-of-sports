---
name: start-session-finance-of-sports-project
description: Checklist de arranque y de cierre de CUALQUIER sesión de trabajo en finance-of-sports (el sitio financeofsports.com, "El deporte en Números"). Qué leer antes de tocar nada y en qué orden, qué NO hace falta leer, cómo levantar el sitio local, cómo verificar que no se rompió nada, qué documentar antes de terminar y la regla de git. Usar SIEMPRE al empezar una sesión acá, sea cual sea la tarea (datos, UI, docs, onboarding). Si la tarea toca datos financieros de un club, manda a las skills de sourcing, mapeo y onboarding en el momento correcto.
---

# Arrancar (y cerrar) una sesión en finance-of-sports

El costo más repetido del proyecto es el arranque en frío: una sesión que no sabe qué hay cargado ni qué criterios ya se decidieron, o que
lee 600 KB de documentación para un cambio de 3 líneas. Esto es el piso mínimo y el orden. No reemplaza a `CLAUDE.md` (se carga solo y
trae el modo de trabajo: una sola sesión, un rol por vez).

## 1. Leer, y parar cuando alcance

**Si la tarea es onboardear clubes o tocar las tools del pipeline, el arranque es el de la skill `club-or-year-onboarding`.**

| Qué | Cuándo |
|---|---|
| `Admin/ESTADO.md`: qué hay armado hoy | **siempre** |
| `Admin/ESTADO-clubes.md`: qué hay cargado de cada club (generado) | si necesitás el detalle club por club |
| `Admin/TODO.md`: qué falta, en orden | NO al arrancar: para elegir qué sigue, si Guido lo pide, o para agregar o borrar un punto |
| `Admin/CONVENCIONES.md`: reglas de proceso | cuando la skill de la tarea lo pide |
| `Admin/CONVENCIONES-DATOS.md`: reglas de datos | si cargás o corregís datos de un club |
| `Admin/ARQUITECTURA.md` | si tocás el motor de Finanzas o los scripts que escriben `data/` |
| `Admin/PANTALLA.md`: pantalla y código del sitio | si tocás `js/`, `index.html` o CSS (la sección de la pantalla, no entero) |
| `Admin/PIPELINE.md`: el pipeline etapa por etapa | solo la etapa que se toca |
| skill `club-data-mapping` | si cargás o categorizás a mano, o revisás la cola de categorías (su SKILL.md dice qué archivo de `referencia/` abrir) |
| skill `club-sourcing` + `Admin/sourcing/README.md` y `_indice/<País>.md` | si BUSCÁS documentos: mirá qué ya se probó, solo el país que te toca |
| skill `producto-y-pantalla-finance-of-sports` | una pantalla, un card, un cambio de diseño o un texto visible |
| skill `contenido-y-difusion-finance-of-sports` | una publicación, un hilo, una tarjeta o un informe |
| skill `contrato-de-datos-finance-of-sports` | antes de renombrar, quitar o cambiar el significado de un campo, una categoría genérica, un id o una unidad |
| skill `deploy-y-release-finance-of-sports` | cuando Guido va a publicar, pregunta si algo está listo o hay que confirmar que salió |

**No abrir por las dudas:** `Admin/finance-of-sports-project.md` (diario narrativo: contesta POR QUÉ se decidió algo viejo) y
`Admin/CHANGELOG.md` (QUÉ cambió y CUÁNDO). Se consultan buscando una palabra puntual, nunca de corrido.

## 2. Antes de tocar nada: preguntar, no asumir

Las reglas «pedido explícito de Guido» de `Admin/CONVENCIONES.md` no se negocian sin preguntarle. Una pregunta genuina sobre un documento,
que no se responde con la fuente ni con los criterios ya escritos, va a `Admin/dudas-por-club.md` (la lista con la que Guido les escribe a
los clubes), no a un comentario perdido ni a un criterio inventado.

Cómo se trabaja con Guido: `CLAUDE.md`, «Modo de trabajo».

## 3. Levantar el sitio local

El sitio es estático (HTML + CSS + JS, sin build ni backend). `preview_start` con la config de `.claude/launch.json`, nunca un server por
Bash. Si tocás `js/` o `data/` y el navegador muestra lo viejo: subí `ASSET_V` (la constante y cada `?v=`) y navegá con `?cb=<algo nuevo>`
(`Admin/PANTALLA.md`, «CACHE DE ASSETS» y «Trampas del navegador de preview»).

## 4. Verificar antes de dar algo por bueno

- **`auditAll()`** (`?audit=1` o la consola): carga TODOS los clubes y corre `verifyTieOuts()` (la suma de los rubros de cada ejercicio contra
  el total que ese balance imprime) y `checkFxSanity()` (cada tipo de cambio en un rango plausible). Una carga normal audita solo Boca, así que
  un error en un club que nadie mira es invisible. Correlo siempre que se toquen datos: lo que importa es que los «no cierran» y los warnings no
  crezcan; un «no cierra» nuevo sin nota en `Admin/carga-clubes/<clubId>.md` es el que amerita parar.
- **`node tools/audit.js`**: lo que cierra igual pero está mal (ejercicios sin total contra qué compararse, categorías con typo, errores de
  escala, desgloses que se contradicen, catch-all dominante) y que los generadores estén al día. Sale con código 1 si hay P0 o P1; lo que
  importa es 0 P0 y 0 P1. `--json` da la lista, `--quiet` sirve de gate, `--fx` lista los tipos de cambio y su procedencia.
  `tools/audit-ignore.json` silencia solo lo verificado a mano contra el documento, con el motivo.
- Cualquier verificación total pasa por `computeYearGeneric()`, el motor real; nunca reimplementar la cascada del resultado por afuera.
- Una auditoría de rutina (el chequeo periódico, cada ~5 clubes nuevos o antes de un cambio grande): skill `auditoria-finance-of-sports`.

## 5. Antes de terminar

Lo que dice `CLAUDE.md`, «Antes de terminar la sesión». Si tocaste datos de un club hay archivos generados que regenerar (`audit.js` lo
chequea como P1): `cargar.mjs --escribir`, `alta-club.mjs` y `lote.mjs --cargar` ya los corren solos; si cargaste o corregiste a mano,
`node tools/publicar.mjs` (genera el data file desde el JSON, sube `ASSET_V`, corre los generadores y `audit.js`, y revierte lo suyo si
da P0 o P1; `--ensayo` dice qué haría). La fuente de un club es su JSON (`data/<país>/<club>.json`); el `-data.js` se genera. Una fuente
(título, url, nota pública) se edita con `node tools/fuente.mjs` y después se publica.

Generadores: `generate-fuentes-page.js` (`fuentes.html`), `generate-club-index.js` (`Admin/ESTADO-clubes.md`), `generate-rankings.js`
(`data/rankings/`), `generate-fuentes-index.js` (índice de `Admin/sourcing/README.md`; si aborta es por diseño: decidir a mano con
`OVERRIDES`). Todos aceptan `--check`. Ninguno de sus archivos se edita a mano.

## 6. Git

- `git commit` local: libre, después de cada chunk verificado, sin preguntar.
- `git push`: no se hace, no se pide y no se menciona. El push a `main` es un deploy en Netlify y lo decide Guido. Un commit sin publicar
  se dice «commiteado» y nada más.

## Cómo mantener esta skill

Si aparece un paso de arranque, de verificación o de cierre que no está acá, proponele a Guido el texto exacto en
`Admin/propuestas/<tema>.md`, commiteado, y esperá su ok. Si un paso resultó innecesario, proponé sacarlo. Esta skill tiene que poder
leerse entera en un minuto: lo que crece va a `Admin/CONVENCIONES.md` (una regla) o a `Admin/ARQUITECTURA.md` (cómo funciona algo).
