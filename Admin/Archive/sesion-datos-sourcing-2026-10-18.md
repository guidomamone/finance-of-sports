> ARCHIVADO (Versión 714, 2026-10-18): cierre de la sesión datos-sourcing, ya pasado a TODO, CHANGELOG y ESTADO. Rutas y números de ese día.
> La sección "Para el worktree de pantallas" (formato de data/faltantes y data/estimados) la cita el to-do 275.

# Cierre de la sesión datos-sourcing (rama `datos-sourcing`, worktree `../fos-datos`)

Lo pasa la sesión principal a TODO, CHANGELOG y ESTADO al mergear (skill de arranque, `worktree.md`): `node tools/worktree.mjs mergear
datos-sourcing`. Auditoría de la rama: P0 0 / P1 0. Sin push.

## Qué cambió (para el CHANGELOG)

- **To-do 266, hecho.** `tools/faltantes-liga.mjs`: por liga y año, qué clubes jugaron (listas de Wikipedia) y en qué estado está cada
  uno (cargado / en-mano / buscado / rebuscar / sin-buscar / cerrado). Genera `data/faltantes/<liga>.js` (para Ligas) y
  `Admin/sourcing/pendientes.md` (la lista de sourcing, por país, liga más alta y año más reciente primero). El año de un club sale de su
  fecha de cierre (un 31/12 en liga de temporada partida es la temporada siguiente). Alias confirmados en
  `tools/club-league-reference/alias.json` (`--sugerir` lista candidatos; `--print`: la medición, 0 alias rotos, 0 alias que faltan).
  Medido hoy: 7187 club-años en 376 liga-años; cargado 860, en-mano 1452, buscado 2630, sin-buscar 2245 (882 clubes).
- **Se mantiene solo:** `cargar.mjs` corre `faltantes-liga.mjs` y `estimar.mjs` con los otros generadores; `audit.js` da P1
  `faltantes-desfasado` y `estimados-desfasado`; `worktree.mjs mergear` los trata como generados.
- **Listas de equipos:** 57 liga-años nuevos (Argentina 2009-2026 y Primera Nacional, Bundesliga, LaLiga, Dinamarca, Chile, Perú,
  Croacia, J1, Liga MX) con `tools/listas-lote.mjs` (compuerta: título con la temporada y la liga, tamaño conocido, todos los clubes del
  sitio adentro); posiciones finales guardadas en 272 liga-años. `fetch-club-league-reference.mjs` más firme: redirecciones, "Club
  information", tablas de posiciones en plantillas aparte y con `team_order`, códigos con tilde, `{{sort}}`, estadios y atributos de celda
  fuera, `--json`, User-Agent con el sitio. Medido contra las 320 listas guardadas (`--revalidar`, `--contra-cache`): 26 corregidas a
  mano, Perú 2020 sacada (traía ciudades).
- **To-do 270, hecho en lo que se decidió.** `tools/estimar.mjs`: regresión medida con validación cruzada (`--medir`). Un año que falta
  de un club que tenemos: regresión 22% = interpolar a mano 22%, así que se publica la interpolación simple (18% de error entre dos
  reales, 25% antes o después, con rango del 80%): `data/estimados/<liga>.js`, 439 club-años en 25 ligas. Club que nunca cargamos: 50%
  con la posición en la tabla (61% sin ella) contra 56% de la mediana de la liga; queda APAGADO hasta tener más datos (Guido).
  Lo real gana: nunca hay estimado para un año cargado, se regenera en cada carga, P1 si conviven (probado).
- **Datos:** `data/club-leagues/ru.js` sin las 58 claves repetidas y con Dynamo Makhachkala 2021 en tercera (`liga-no-catalogada`) y
  2022-2023 en la Primera Liga (estaba en la Premier); rankings rusos regenerados. Verificación en `Admin/ligas-por-pais/ru.md`.
- `tools/worktree.mjs preparar`: no enlaza los otros worktrees (`.claude/worktrees/` figura como ignorado en la principal y fallaba).

## Qué queda pendiente (para el TODO)

- **Pantallas:** mostrar `data/faltantes/` en Ligas y `data/estimados/` con el rótulo "estimado" (detalle abajo).
- **270, club nuevo:** volver a medir (`node tools/estimar.mjs --medir`) cuando haya más clubes cargados; prenderlo solo si le gana a la
  mediana de la liga con un error que Guido acepte. Otra variable a probar: partidos contra clubes con finanzas (no se midió).
- **Listas que no salen:** Primera B Metro (sin página con tabla), Pro League belga 2024-25 (el lector no la entiende), Serie C (3
  grupos por página), Perú 2020 (la tabla pone la ciudad primero). `node tools/listas-lote.mjs` las reintenta.
- **A revisar:** `data/club-leagues/` pone a Parma en la Serie C en 2018 y en 2017-18 jugó la Serie B.
- **Carpetas duplicadas en `Clubes/`:** Cardiff y Swansea en `Inglaterra/` y `Gales/`; `Suiza/FC St. Gallen` y `Suiza/St. Gallen`.
  `faltantes-liga` las lee juntas; no se tocó nada (los PDF no se borran sin chequear el pipeline).
- **Mejora de script:** `data/club-leagues/ru.js` acumulaba claves repetidas: la tool que lo escribe (probablemente `bfo-rusia.mjs` o
  `alta-club.mjs`) agrega sin mirar si ya está.
- Una sesión de sourcing ahora puede arrancar de `Admin/sourcing/pendientes.md` (sin-buscar y rebuscar), en vez de elegir a mano.

## Qué cambia en ESTADO

- Nuevo: por liga y año se sabe qué clubes faltan y en qué estado (`faltantes-liga.mjs`, generado en cada carga); la lista de pendientes
  de sourcing es `Admin/sourcing/pendientes.md` (generada, no se edita).
- Nuevo: estimaciones publicadas aparte de lo real, solo años que faltan de clubes que tenemos (`estimar.mjs`); club nuevo apagado.
- Las listas de Wikipedia (`tools/club-league-reference/`) cubren 376 liga-años y guardan la posición final donde la tabla está completa.

## Para el worktree de pantallas

### 1. Qué clubes le faltan a cada liga (to-do 266)

`data/faltantes/<liga>.js` (lo genera `tools/faltantes-liga.mjs`; se regenera solo en cada carga):

```js
window.LEAGUE_GAPS["gr-superleague"] = {
  2025: { size: 14, cargados: 12, faltan: [{ n: "Lamia", e: "sin-buscar" }, { n: "Athens Kallithea", id: "...", e: "buscado" }] },
  2026: { size: 14, cargados: 1, reciente: true, faltan: [...] },
};
```

- La clave del año es la TEMPORADA (la que termina ese año: 2025 = 2024-25), no el ejercicio. Para un club con cierre entre septiembre y
  diciembre en una liga de temporada partida, el ejercicio y es la temporada y+1 (`temporada()` en `tools/faltantes-liga.mjs`).
- `size`: equipos de la liga ese año (la lista de Wikipedia). `cargados`: cuántos de esos tienen el año en el sitio.
- `faltan[].e`: `en-mano` (hay PDF, falta cargarlo), `buscado` (se buscó y no está), `rebuscar`, `sin-buscar`, `cerrado`. `id` solo si
  el club ya está en el sitio con otros años.
- `reciente: true`: el ejercicio cerró hace menos de 9 meses; el balance todavía no puede estar.
- Idea para Ligas: "12 de 14 clubes con balance", y la lista de los que faltan con el motivo en palabras ("no publica", "pendiente de
  cargar", "todavía no se buscó"). Sin `reciente`, un año a medias se ve como un hueco nuestro.

### 2. Estimaciones (to-do 270): PRENDIDAS, solo años que faltan de clubes que tenemos

`data/estimados/<liga>.js` (lo genera `tools/estimar.mjs`; se regenera solo en cada carga). Decisión de Guido (2026-10-18): se publican
los años que le faltan a un club que ya tenemos, por interpolación simple entre sus años reales, a 2 años o menos de un real. El caso
"club que nunca cargamos" queda apagado hasta tener más datos.

```js
window.ESTIMADOS["gr-superleague"] = {
  2017: [{ id: "atromitos-gr", revenue: 5.221, lo: 3.518, hi: 7.905, caso: "entre", error: 18, de: [2016, 2019] }],
};
```

- Año = EJERCICIO (el mismo de `data/rankings/`). `revenue`, `lo`, `hi`: millones de USD del año (como los rankings). `lo`-`hi`: el
  rango donde cayó el real 8 de cada 10 veces al probarlo con años reales. `error`: error mediano medido, en % (18 entre dos reales,
  25 antes o después). `de`: los ejercicios reales de los que sale; `caso: "afuera"` = repite el año real más cercano.
- Pedido de Guido: que diga BIEN CLARO "estimado" en el sitio, siempre aparte de lo real (otro estilo, el rango, el error, y el por qué:
  "interpolado entre 2016 y 2019"). Nunca sumado a un total real sin decirlo.
- Lo real gana: nunca hay un estimado para un año cargado (el generador lo saltea, `cargar.mjs` lo regenera en cada carga y `audit.js`
  da P1 `estimados-desfasado` si alguna vez conviven). La pantalla no tiene que resolver choques.
