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
