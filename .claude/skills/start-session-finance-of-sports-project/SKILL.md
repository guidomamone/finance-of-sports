---
name: start-session-finance-of-sports-project
description: Checklist de arranque y de cierre de CUALQUIER sesión de trabajo en finance-of-sports (el sitio financeofsports.com, "El deporte en Números"). Qué leer antes de tocar nada y en qué orden, qué NO hace falta leer, cómo levantar el sitio local, cómo verificar que no se rompió nada, qué documentar antes de terminar, y la regla de git del proyecto. Usar SIEMPRE al empezar una sesión acá, sea cual sea la tarea (datos, UI, docs, onboarding de un club). Si la tarea además toca datos financieros de un club, este skill te manda a los otros 3 (club-sourcing, club-data-mapping, club-or-year-onboarding) en el momento correcto.
---

# Arrancar (y cerrar) una sesión en finance-of-sports

Este skill existe porque el costo más repetido del proyecto es el arranque en frío: una sesión que no
sabe qué hay cargado ni qué criterios ya se decidieron, o que lee 600 KB de documentación para hacer
un cambio de 3 líneas. Esto es el piso mínimo y el orden correcto.

**Este skill no reemplaza a `CLAUDE.md`.** CLAUDE.md se carga solo, siempre, y tiene las reglas
permanentes. Esto es el procedimiento.

---

## 1. Leer, en este orden, y parar cuando alcance

**Si la tarea es onboardear clubes o tocar las tools del pipeline, el arranque es el del skill `club-or-year-onboarding`, no esta tabla.**

| # | Qué | Cuándo |
|---|---|---|
| 1 | `Admin/ESTADO.md`: qué hay armado hoy | **siempre** |
| 1b | `Admin/ESTADO-clubes.md`: qué hay cargado de cada club (generado, "QUÉ ES REAL POR CLUB") | si necesitás el detalle club por club |
| 2 | `Admin/CONVENCIONES.md`: reglas de proceso | cuando la skill de la tarea lo pide |
| 2b | `Admin/TODO.md`: qué falta hacer, en orden de prioridad | NO al arrancar: cuando hay que elegir qué sigue, cuando Guido lo pide, o para agregar/borrar un punto |
| 2c | `Admin/CONVENCIONES-DATOS.md`: reglas de datos | si cargás o corregís datos de un club |
| 3 | `Admin/ARQUITECTURA.md` | si tocás el motor de Finanzas o los scripts que escriben `data/` |
| 3b | `Admin/PANTALLA.md`: reglas de pantalla y código del sitio | si tocás `js/`, `index.html` o CSS |
| 4 | `.claude/skills/club-data-mapping` | si cargás o categorizás datos de un club A MANO, fuera del pipeline, o revisás la cola de categorías (el SKILL.md indica qué archivo de `referencia/` abrir) |
| 5 | `.claude/skills/club-or-year-onboarding` | si onboardeás clubes o tocás el pipeline (trae su propio arranque) |
| 6 | `.claude/skills/club-sourcing` | si BUSCÁS documentos de un club que no tiene nada todavía |
| 7 | `Admin/sourcing/README.md` (índice de países) → `Admin/sourcing/_indice/<País>.md` | antes de salir a buscar PDFs: mirá qué ya se probó. Leé SOLO el país que te toca |
| 8 | `worktree.md` (en esta carpeta) | si la sesión corre en un worktree (`git rev-parse --git-dir` no es `.git`) o Guido pide trabajar en paralelo |

**Lo que NO hace falta leer para trabajar**, y conviene no abrir por las dudas:

- `Admin/finance-of-sports-project.md` (el archivo más pesado del proyecto): es el diario narrativo. Contesta POR QUÉ se decidió algo viejo. Se
  consulta buscando una palabra puntual, nunca de corrido.
- `Admin/CHANGELOG.md` (muy pesado): contesta QUÉ cambió y CUÁNDO. Mismo criterio, consulta puntual.

Con el punto 1 ya podés trabajar. Todo lo demás es a demanda.

---

## 2. Antes de tocar nada: preguntar, no asumir

Las reglas «pedido explícito de Guido» de `Admin/CONVENCIONES.md` no se negocian sin preguntarle (ahí está también qué hacer si una decisión nueva contradice una).

Si al leer un documento fuente queda una pregunta genuina (algo que no se puede inferir con confianza
de la fuente ni de los criterios ya documentados), va a `Admin/dudas-por-club.md`, no a un comentario
perdido en el código ni a un criterio inventado. Esa es la lista que Guido usa para escribirle
directo a los clubes.

---

## 3. Levantar el sitio local

El sitio es estático (HTML + CSS + JS, sin build, sin backend). Usá `preview_start` con la config de
`.claude/launch.json`, nunca un server por Bash.

Si tocás `js/` o `data/` y el navegador te muestra lo viejo: subí `ASSET_V` (la constante y cada `?v=`) y navegá con `?cb=<algo nuevo>`. La regla y las trampas del navegador de preview: `Admin/PANTALLA.md`, «CACHE DE ASSETS» y «Trampas del navegador de preview».

---

## 4. Verificar antes de dar algo por bueno

**`auditAll()` es el chequeo real del proyecto.** Abrí `?audit=1` o corrélo en la consola: fuerza la
carga de TODOS los clubes y corre las 2 verificaciones (`verifyTieOuts()` compara la suma de los
rubros de cada ejercicio contra el total que ese balance imprime; `checkFxSanity()` revisa que cada
tipo de cambio caiga en un rango plausible).

Por qué importa: los clubes se cargan por demanda, así que una carga normal de la página audita SOLO
Boca. Sin `auditAll()`, un error en un club que nadie está mirando es invisible.

**Correlo siempre antes de dar por cerrado algo que toque datos.** El número de clubes y de checks sube con
cada sesión, así que no se compara contra un total: lo que importa es que los "no cierran" y los
"warnings" no crezcan sin explicación. Un "no cierra" nuevo que no tenga ya una nota en su
evidencia (`Admin/carga-clubes/<clubId>.md`, el título de ese ejercicio) es el que amerita parar.

**`node tools/audit.js` es el otro lado de lo mismo.** `auditAll()` verifica que cada
ejercicio CIERRE contra su propio documento; `audit.js` busca lo que cierra igual: ejercicios sin
ningún total contra qué compararse, categorías con typo o prestadas de la otra taxonomía, errores de
escala (un `fx` mal transcripto deja todos los tie-outs en verde y publica un número 1000 veces más
grande), desgloses que se contradicen con su propia fila, catch-all dominante, ramas por club.
Corre en menos de un segundo y sale con código 1 si hay P0 o P1. Lo que importa es que siga en 0 P0 y
0 P1; el conteo de P2 y P3 sube y baja con cada sesión. **También chequea que los 4 generadores estén
al día** (`checkGenerados()`, P1): rankings, `fuentes.html` y sus páginas de club, el índice de clubes
y el índice de `Admin/sourcing/README.md`.

Para una auditoría DE RUTINA (no la verificación de un cambio puntual: el chequeo periódico de que
el proyecto entero está sano y va a seguir estándolo) el procedimiento completo está en
`.claude/skills/auditoria-finance-of-sports/SKILL.md`. Cadencia sugerida: cada ~5 clubes nuevos,
antes de un cambio grande, o cuando algo se sienta raro sin un síntoma concreto que perseguir.

REGLA: cualquier verificación total tiene que pasar por `computeYearGeneric()`, el motor real. NUNCA
reimplementar la cascada del resultado por afuera — se probó, y una fórmula simplificada tiró 12
falsos positivos porque no contemplaba `nonCash`, `profitOnPlayerSales`, `assetSales` ni `tax`.

---

## 5. Antes de terminar: documentar

Con cualquier cambio real, sin que Guido lo pida: lo que dice `CLAUDE.md`, «Antes de terminar la sesión» (en un worktree, la nota `Admin/sesiones/<rama>.md` en lugar de tocar TODO, CHANGELOG y ESTADO: ver `worktree.md`). Si se decidió una regla nueva o se contradijo una vieja, va a `Admin/CONVENCIONES.md` (proceso), `Admin/CONVENCIONES-DATOS.md` (datos) o `Admin/PANTALLA.md` (pantalla y código).

**SI TOCASTE DATOS DE UN CLUB, HAY ARCHIVOS GENERADOS QUE REGENERAR** (`node tools/audit.js` lo
chequea como P1). `cargar.mjs --escribir`, `alta-club.mjs` y `lote.mjs --cargar` ya los corren solos
(`generate-club-index`, `generate-fuentes-page`, `generate-rankings`, `generate-como-corre-stats`), y
`cargar.mjs` sube `ASSET_V`: ahí no los repitas. Si cargaste o corregiste a mano:

```
node tools/generate-club-index.js      # la sección "QUÉ ES REAL POR CLUB" de Admin/ESTADO-clubes.md
node tools/generate-fuentes-page.js    # fuentes.html, las páginas de club y sitemap.xml
node tools/generate-rankings.js        # data/rankings/<liga>.js, lo que muestran Inicio y Ligas
```

**La fuente de un club es su JSON** (`data/<país>/<club>.json`): a mano, se edita ese archivo y se corre `node tools/generar-data.mjs`
(el `-data.js` se genera, no se toca); las tools de carga ya lo hacen solas. `audit.js` lo vigila (`json-js-desfasado`, `json-no-valida`, P1).

Y **si subiste `ASSET_V`** —aunque no hayas tocado un solo dato— hay que correr
`generate-fuentes-page.js` igual: ese generador LEE `ASSET_V` de `index.html` y lo escribe en todas las
páginas de club, así que sin eso el visitante recibe el JS nuevo en el sitio y el viejo de su caché en la
página de fuentes.

---

## 6. Git: la regla del proyecto

- **`git commit` local: libre.** Después de cada chunk verificado, sin preguntar.
- **`git push`: no se hace, no se pide y no se menciona.** El push a `main` es un deploy automático en Netlify y lo decide y lo hace Guido por su cuenta. Un commit sin publicar se dice «commiteado» y nada más.

---

## 7. Herramientas del repo

- `node tools/audit.js` — auditoría determinista del proyecto entero, agrupada en P0/P1/P2/P3.
  `--json` para la lista completa, `--quiet` para usarlo como gate antes de un push.
  `tools/audit-ignore.json` silencia un hallazgo YA verificado a mano contra el documento, con el
  motivo escrito — nunca uno sin verificar, que es justo el atajo que este proyecto no se puede dar.
  `--fx` no audita: LISTA. Imprime los tipos de cambio, uno por club-ejercicio,
  agrupados por moneda y ordenados por año, con de dónde salió cada uno (lo declara el balance, es
  la premisa de un presupuesto, es una cotización de mercado de `FX_CLOSE`, o todavía no se sabe).
  Es la respuesta a "¿de dónde salió este número?" sin abrir un solo archivo de club.
- `node tools/generate-fuentes-page.js`: regenera `fuentes.html`, el listado completo de documentos
  fuente del sitio (la página pública que linkean la ficha de Finanzas y la pestaña Fuentes), desde
  las fuentes (`sources[]`) y los ejercicios (`years[]`) del JSON de cada club. Corrélo después de cargar un club o de tocar una fuente.
  `--check` avisa si quedó vieja. NO editar `fuentes.html` a mano: se sobrescribe.
- `node tools/generate-club-index.js` — regenera, desde el JSON de cada club (`data/<país>/<club>.json`), la sección
  "QUÉ ES REAL POR CLUB" de `Admin/ESTADO-clubes.md`. Corrélo después de onboardear un club
  en vez de escribir el párrafo a mano. `--check` (sin escribir) avisa si la sección quedó
  desactualizada respecto de los datos.
- `node tools/generate-rankings.js` — precalcula el ranking de ingresos de cada
  liga-ejercicio en `data/rankings/<liga>.js`, uno por liga. Corrélo después de cargar un club o
  un ejercicio. `--check` avisa si quedó viejo (y `audit.js` lo corre solo, como P1), `--print`
  imprime los rankings para verificarlos contra la fuente. Es lo que alimenta la pestaña Ligas.
- `node tools/generate-fuentes-index.js` — regenera, desde los propios
  `Admin/sourcing/_indice/<País>.md`, la sección "Índice de países" de `Admin/sourcing/README.md`: la línea de
  cada país con sus 3 números (clubes trackeados, cuántos con documento, chequeo más antiguo) y el
  párrafo de totales. Corrélo después de CUALQUIER sesión de sourcing, en vez de actualizar la línea
  del país a mano. `--check` avisa si quedó vieja; `--debug` imprime la clasificación club por club.
  **Lo que hay que saber antes de usarlo**: "con documento encontrado" no es un campo, es prosa libre
  del agente de sourcing, así que se infiere con dos listas de regex (señales de SÍ / señales de NO).
  Cuando una línea matchea señales de los dos lados o de ninguno, el script ABORTA en vez de
  adivinar, y la decisión se toma a mano leyendo el `Admin/sourcing/<País>/<Club>.md` y se escribe en
  `OVERRIDES`, adentro del script, con el motivo de cada decisión. Si
  aborta, no es un bug: es el diseño.

---

## Cómo mantener este skill

Si aparece un paso de arranque, de verificación o de cierre que no está acá, proponele a Guido el texto exacto y esperá su ok.
Si un paso resultó innecesario, proponé sacarlo. Este archivo tiene que poder leerse entero en un
minuto: si crece mucho, es señal de que algo debería vivir en `Admin/CONVENCIONES.md` (una regla) o en
`Admin/ARQUITECTURA.md` (cómo funciona algo), no acá (qué hacer y en qué orden).
