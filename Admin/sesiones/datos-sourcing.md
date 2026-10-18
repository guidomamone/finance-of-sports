# Cierre de la sesión datos-sourcing (rama `datos-sourcing`, worktree `../fos-datos`)

BORRADOR: se completa al cerrar. Lo pasa la sesión principal a TODO, CHANGELOG y ESTADO al mergear (skill de arranque, `worktree.md`).

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
