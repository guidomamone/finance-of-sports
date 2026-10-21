# Cierre de la rama `pipeline` (Pipeline 8: to-do 333, lo no bloqueante de la revisión del 245 y el 246)

Se completa mientras se trabaja. La sesión principal lo pasa a TODO, CHANGELOG y ESTADO al mergear.

## Qué cambió (para CHANGELOG)

- `tools/generar-data.mjs --check`: además de recorrer los JSON, da error por un `data/<iso>/*-data.js` sin su JSON y por un id de `data/clubs.js` sin `<id>.json` (audit.js lo recoge como P1 `json-js-desfasado`).
- `tools/worktree.mjs mergear`: un `data/<iso>/*-data.js` en conflicto ya no es "conflicto real": gana el JSON mergeado y después del merge corre `generar-data.mjs` (y lo agrega al commit). Un conflicto en el JSON sigue frenando.
- `tools/renombrar-ids.mjs --verificar`: ignora la línea de ejemplo de `CLAUDE.md` con `boca`; da 0 problemas.
- Racing: título de la fuente `racing-ar-placeholder` reescrito en el JSON (el -data.js se regeneró).
- `js/cuenta.js`: `stateKey` normaliza el id de club con `window.CLUB_ALIASES` (club, pares de Comparar, clubes de ligaSim); las claves de ids ya nuevos no cambian. ASSET_V 1521 -> 1522 (por eso se regeneran fuentes/*.html y sitemap).

## Medición (gratis)

- `generar-data --check`: 319 clubes, 0 desfases; `renombrar-ids --verificar`: 0 problemas; `audit.js`: P0 0 · P1 0.
- Ningún año cargado cambia: el único diff de datos es el título de la fuente de Racing.
- Probado: `stateKey` con `boca` y `boca-ar` da la misma clave (finanzas, Comparar). No probado en vivo: el merge de worktree con un conflicto real en un -data.js.

## Qué queda (para TODO)

- Las filas ya guardadas en `saved_searches` con el id viejo conservan su `state_hash` viejo; reabrir y guardar una da una fila nueva (arreglarlo del todo pide una migración SQL en Supabase).
- Borrar el 333 de TODO.

## 334 (Pipeline 9)

- `tools/suma-entidades.mjs`: `combinar()` pone «AS · » / «Elite · » en cada etiqueta (renglones y financiero; el impuesto no, como está publicado). El nombre corto sale de los nombres de los dos PDFs del ajuste (`nombresCortos()`).
- Medido: `cargar.mjs --reemplazar --escribir` sobre Vålerenga AS 2022 y 2023 deja `data/no/valerenga-no.json` byte a byte igual. Ålesund no tiene ningún `suma-con` cargado (no cambia nada); si se carga, sus nombres saldrían «Aalesund Fotball AS» y «Fotballklubb FLI» (sin tramos en común).
- Deja de ser cierto: el TODO 334 (borrarlo).

## 270 (Pipeline 9)

- `tools/estimar.mjs`: `PAISES_SIN_ESTIMAR` (hoy `ee`) es el único lugar donde se declara un país sin estimados; el bucle de estimaciones lo saltea (club nuevo y año que falta). Sus años reales siguen entrando al ajuste del resto: ningún otro estimado cambia.
- Regenerado: desaparecen `data/estimados/ee-esiliiga.js` y `ee-meistriliiga.js`; las otras 49 ligas quedan idénticas. ASSET_V 1526 -> 1527.
- Deja de ser cierto: Estonia ya salió del punto (3) del TODO 270 (Países Bajos sigue sin decidir). Para volver a prenderla: sacar `ee` de la lista y `node tools/estimar.mjs --escribir`.

## 241, la parte de Pipeline (Pipeline 9)

- `tools/generate-club-pages.js` (nuevo): `club/<id>.html` (319), `liga/<id>.html` (52), `og/club|liga/<id>.png` (1200×630, ~30 KB cada una, 14 MB en total, tope 300 KB) y `sitemap.xml` (ahora solo lo escribe este; `generate-fuentes-page.js` lo soltó). Plantilla: `index.html`. Los números salen del motor del sitio. Ruta para la app: `window.FOS_RUTA`; el bloque de texto sin JS es `#pagina-estatica` y se oculta con la clase `js` de `<html>` (la pone el propio `<head>`; Pantallas 6 no tiene que tocarlo).
- Entra en `GENERADORES` (`generadores.mjs`, después de rankings) y en `audit.js` como `club-pages-desfasado` (P1; también chequea topes de 60 y 155, canonical, og:image y el peso de las imágenes). `cargar.mjs` y `alta-club.mjs` suman `club/`, `liga/` y `og/` al snapshot (para revertir); `rutas.mjs` (`TOCA_UNA_CARGA.SITIO`), `bfo-rusia.mjs` y `worktree.mjs` también.
- `netlify.toml`: rewrites 200 `/club/:id` y `/liga/:id`, cabecera de caché para `/og/*` y 301 `/club/<viejo>` → `/club/<nuevo>` (en el bloque `ids-alias`; `renombrar-ids.mjs` los escribe igual).
- Dependencia nueva: `@resvg/resvg-js` en `tools/package.json` (no en la raíz: Netlify corre `npm install` si hay `package.json` en la raíz). **La principal tiene que correr `cd tools && npm install` una vez**; un worktree lo enlaza solo de la principal. Fuente Inter (OFL) en `tools/fonts/`.
- Se hizo primero la muestra del 10% (`--muestra`: 32 clubes y 15 ligas), se miró a ojo, y después todo.
- Medido: `audit.js` P0 0 · P1 0; `generar-data --check` verde; `generate-club-pages.js --check` verde. No probado: el rewrite de Netlify (el servidor local no lo tiene: se abre `/club/<id>.html`, y carga bien con `<base href="/">`), ni el depurador de Facebook ni los resultados enriquecidos de Google (piden la URL pública, paso 4 del plan).
- Cambió de lo que dice el plan: la descripción y la tabla hablan de ingresos y resultado neto (no de gastos: `expenses` del motor es solo el gasto operativo y no cierra con el resultado). El título de liga dice «N clubes» (no sugiere la liga entera). Peso: cada ASSET_V que sube reescribe las 371 páginas (~22 MB), como ya pasa con fuentes/.
- Texto propuesto para la skill de arranque (sección 5, necesita el ok de Guido): sumar `generate-club-pages` a la lista de generadores de `cargar`/`alta-club`/`lote --cargar` y decir que subir ASSET_V obliga a regenerar `club/` y `liga/` (hoy ya lo hace `publicarCambios`).
- Pantallas 6 (paso 2): `js/principal.js` lee `FOS_RUTA` y escribe `/club/<id>`; ver `Admin/mediciones/241-plan.md`. Después de que entre, el TODO 241 pide el paso 4 (depurador de Facebook, resultados enriquecidos) con la URL pública.

## 327 (Pipeline 10): chequeos que dejó el 255

Tabla de los 12 con lo medido: `pipeline-327-paso1.md` en la carpeta de notas compartidas. Ya existían C-7 (`push-con-ok`) y C-8 (`skills-con-ok`, es un hook).

Hecho (audit.js, un commit por chequeo; funciones nuevas junto a `checkRutasMuertas`, llamadas en `main()` justo después de `checkRutasMuertas()`):
- C-10: `ruta-muerta` mira todos los `.md` de `.claude/skills/` (`mdsDeSkills()`), no solo cada `SKILL.md`. Hallazgos nuevos: 0.
- C-9: P3 `historia-en-doc-de-criterio`: «Versión N», fechas AAAA-MM-DD y «to-do N» en skills, `CLAUDE.md` y PIPELINE/CONVENCIONES*/PANTALLA. Hoy 3 hallazgos (191 Versión, 99 fechas, 177 to-do). Sin contadores fijos (no medidos).
- C-11: P3 `parrafo-repetido` entre `CLAUDE.md`, skills y `Admin/*.md` de primer nivel (≥200 caracteres, 80% de ventanas de 6 palabras). Hoy: 1 par (ARQUITECTURA ~ PANTALLA, los colores de marca). Cuesta ~0,6 s.
- C-12: P2 `raya-larga-visible` en `data/lang`, `js/`, html de la raíz, `club/` y `liga/`; permite «—» entre comillas, en `>—<` y como leyenda `— =`. No mira `data/<país>/*.js` (rawLabel literal de los documentos). Daba 13 líneas; arregladas (terminos, privacidad, metodologia, `js/liga.js`, `js/cuenta.js`, `data/lang/en.js`). ASSET_V 1534 -> 1535, fuentes, `club/` y `liga/` regeneradas.

Al mergear: si Pantallas 7 también subió ASSET_V, queda un conflicto trivial en `index.html` y en las páginas generadas: tomar el mayor +1 y correr `generate-fuentes-page.js` y `generate-club-pages.js`.

(Los hooks C-1 a C-6 quedaron hechos: ver abajo.)

Deja de ser cierto: nada en ESTADO. Cambia el conteo de P3 de `audit.js` (+4).

### 327: hooks (ok de Guido: «327 do it»)

En `tools/hooks/pre-tool.mjs`, un commit por freno (C-3 y C-4 juntos: comparten `estaEnWorktree()`), cada uno probado con un caso que frena y otro que pasa:
- C-1 `comandos-simples` (deny): `/tmp` suelto, `cd … &&`/`;`, `$(…)`, `${…}`, `$VAR` fuera de comillas simples. Pasan el scratchpad (`/private/tmp/claude-501/`), el mensaje de `git commit -m "…"` y el heredoc `$(cat <<'EOF' … EOF)`.
- C-2 `subagente-con-regla` (deny): `Agent`/`Task` cuyo prompt no diga «Bash» y «sin variables»; el mensaje trae la frase para pegar.
- C-3 `plan-en-worktree` (deny): solo `EnterPlanMode` en un worktree; el Exit pasa.
- C-4 `merge-en-worktree` (deny): `git merge`/`pull` en un worktree; pasan `merge-tree`, `merge-base` y `--abort`.
- C-5 `no-importar-tools` (deny): import()/require() de `tools/` en `node`, salvo `data-clubes.js` y `rutas.mjs`.
- C-6: `rsync -a` sin `--no-links` (deny); `mv` sobre `Clubes/` entra en `pdfs-con-ok` (ask, como `rm`, no deny: mover PDFs es parte del onboarding).
- `.claude/settings.json`: el matcher suma `Agent|Task|EnterPlanMode`.

Medido, reproduciendo el hook sobre una muestra de 1.477 de los 32.489 comandos Bash y 358 de los 1.432 Agent de las sesiones del proyecto (histórico, incluye sesiones anteriores a las reglas): Bash frenados ~37% (`$`/`${` 253, `cd &&` 223, `/tmp` 20, merge/pull 21 si fuera worktree, import de tools 12, rsync 2); Agent frenados 357 de 358 (casi ningún prompt viejo traía la frase). No se silenció ninguno. Revisadas a ojo 13 denegaciones de `$`/`cd`: todas legítimas.

Deja de ser cierto: nada en ESTADO. Borrar el 327 de TODO. `Admin/PIPELINE.md` no describe el hook (su cabecera sí): sin cambios.

## Pruebas 1 (bloque C: 317, 318, 319)

- 317: medido en `Admin/mediciones/317-supabase.md`. Conclusión: no sirve para decidir cuándo `data/*.js` deja de alcanzar; no migrar. Supabase real no se probó (falta el token de la cuenta para crear un proyecto); se midió en Postgres 17 local. SQL encuentra dos chequeos que `audit.js` no tiene (años faltantes, atraso del último ejercicio): condición nueva, pendiente de la Auditora 4. `audit.js` tarda ~15 s, no <1 s como dice la skill de arranque.
- 318: cerrado como «no probado» (`Admin/mediciones/318-open-notebook.md`; se reabre si Guido instala Docker). Open Notebook (`lfnovo/open-notebook`, MIT, dueño usuario `lfnovo`, repo de 2024-10) se instala con Docker, que esta máquina no tiene, y pide además un modelo de embeddings (Anthropic no los da).
- 319: `ayghri/i-have-adhd` es de la cuenta personal `ayghri` (tipo User, no es fork, MIT, creado 2026-05-13, 58 mil estrellas, último push 2026-10-19). Es una skill (`skills/i-have-adhd/SKILL.md`, `disable-model-invocation: true`, se invoca con `/i-have-adhd` y queda activa hasta «stop adhd mode»): pone la próxima acción primero, pasos numerados, un solo paso siguiente, sin tangentes, estimaciones en minutos, listas de hasta 5. Trae además un hook `SessionStart` que solo inyecta las reglas si existe el archivo `~/.claude/.i-have-adhd-always`; sin ese archivo no hace nada. No se instaló. Las copias con el mismo nombre no se enumeraron: al instalar, usar exactamente `ayghri/i-have-adhd`.
- 320, 321 y 322: no se tocaron (esperan portal, 313 y 335).
