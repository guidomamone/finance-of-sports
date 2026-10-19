# Escocia: cómo agregar la Scottish Premiership (informe de investigación)

## (a) Entrada propuesta para data/leagues.js

Mismo formato que las vecinas `gb-premierleague` / `gb-championship` (línea ~84). Va junto a ellas:

```js
  'gb-scottishpremiership': { name:'Premiership',       full:'Scottish Premiership',                country:'GB', sport:'futbol', tier:1 },
```

Notas:
- `name` va sin sponsor (regla de ARQUITECTURA). "Premiership" solo puede confundirse con la rugby Premiership en el futuro, pero como `name` se muestra bajo el país/deporte no choca; alternativa más explícita: `name:'Scottish Premiership'`.
- Escocia NO tiene entrada propia en COUNTRIES: `GB` es `{ name:'Inglaterra', flag:'🏴' }`. Celtic cae en GB junto a Inglaterra (decisión ya tomada al dar de alta a Celtic). Ojo: el nombre del país en el selector dirá "Inglaterra" para una liga escocesa; si se quiere separar habría que crear un país nuevo (p. ej. `SCT`), que rompe la convención iso2 de `<iso2>-<slug>`, de `data/club-leagues/<iso2>.js` y de `tools/club-league-reference/<iso2>.json`. No lo recomiendo salvo que Guido lo pida.
- `data/rankings/_regiones.js` es GENERADO por `tools/generate-rankings.js` (no se edita a mano): la liga nueva aparece en `RANKINGS_INDICE` sola al regenerar.
- Membresía de Celtic: `data/club-leagues/gb.js` (`window.CLUB_LEAGUE_BY_YEAR`, formato `'celtic-gb': { 2025: 'gb-scottishpremiership' }`, clave de año = año de cierre de la temporada; confirmar el id real de Celtic en el sitio). No se editó nada.

## (b) Títulos exactos en en.wikipedia.org

Todos verificados con la API (`action=query&titles=...&redirects=1`): existen, sin redirección. Convención: `<aaaa>–<aa> Scottish Premiership` con raya en (en dash, U+2013), NO guion. (La "Scottish Premier League" terminó en 2012-13; las temporadas pedidas son todas Premiership.)

| Temporada | Título exacto | Año (clave en caché) |
|---|---|---|
| 2018-19 | `2018–19 Scottish Premiership` | 2019 |
| 2019-20 | `2019–20 Scottish Premiership` | 2020 |
| 2020-21 | `2020–21 Scottish Premiership` | 2021 |
| 2021-22 | `2021–22 Scottish Premiership` | 2022 |
| 2022-23 | `2022–23 Scottish Premiership` | 2023 |
| 2023-24 | `2023–24 Scottish Premiership` | 2024 |
| 2024-25 | `2024–25 Scottish Premiership` | 2025 |
| 2025-26 | `2025–26 Scottish Premiership` | 2026 |

Tabla de equipos: en 2018-19 y 2025-26 la sección `Teams` existe y su subsección `Stadia and locations` (nombre británico, no "Stadiums") trae un wikitable de 12 clubes (2018-19: Aberdeen, Celtic, Dundee, Hamilton Academical, Heart of Midlothian, Hibernian, Kilmarnock, Livingston, Motherwell, Rangers, St Johnstone, St Mirren). `fetch-club-league-reference.mjs` corta la sección `Teams` en el próximo `==` de nivel 2, así que la subsección `===` entra y el parser debería leerla (primera celda de cada fila = club). Solo se vio la estructura de 2018-19 y 2025-26; las demás no se abrieron (mismo layout esperado, pero la compuerta `--json` lo confirmará). Ojo: en 2018-19 la tabla usa filas con 4 cabeceras tipo "header row" (encabezados repetidos por bloque); si el parser devolviera filas de cabecera o menos de 12 nombres, mirar ahí primero.

Convención de la clave de año del repo (confirmada con `gb.json`): la temporada 2022–23 se guarda como año `2023`.

## (c) Comandos (formato del README / cabecera de la tool)

```
node tools/fetch-club-league-reference.mjs "2018–19 Scottish Premiership" gb-scottishpremiership 2019 --pais gb
node tools/fetch-club-league-reference.mjs "2019–20 Scottish Premiership" gb-scottishpremiership 2020 --pais gb
node tools/fetch-club-league-reference.mjs "2020–21 Scottish Premiership" gb-scottishpremiership 2021 --pais gb
node tools/fetch-club-league-reference.mjs "2021–22 Scottish Premiership" gb-scottishpremiership 2022 --pais gb
node tools/fetch-club-league-reference.mjs "2022–23 Scottish Premiership" gb-scottishpremiership 2023 --pais gb
node tools/fetch-club-league-reference.mjs "2023–24 Scottish Premiership" gb-scottishpremiership 2024 --pais gb
node tools/fetch-club-league-reference.mjs "2024–25 Scottish Premiership" gb-scottishpremiership 2025 --pais gb
node tools/fetch-club-league-reference.mjs "2025–26 Scottish Premiership" gb-scottishpremiership 2026 --pais gb
```

Con `--json` al final cada uno imprime `{ teams, seccion }` sin escribir (para chequear primero). Si Guido da de alta solo el ejercicio de Celtic, alcanza con la temporada correspondiente (la tool/`tools/listas-lote.mjs` puede pedir además la liga en `data/leagues.js` ANTES de correr el fetch, así que agregar la entrada de (a) primero). Resultado: `tools/club-league-reference/gb.json` (mismo archivo que las ligas inglesas, nueva clave `leagues["gb-scottishpremiership"]`).

## (d) Cosas raras

1. **Escocia comparte `GB`**: no hay país propio; la bandera/nombre del país en el selector es la de Inglaterra (🏴 "Inglaterra").
2. **La clave de país del roster es `gb`** (`--pais gb`): `gb.json` y `data/club-leagues/gb.js` mezclan ligas inglesas y escocesa; `tools/lookup-club-league.js "<club>" --pais gb` buscará en todas, así que un club con nombre repetido (p. ej. "Rangers"/"Dundee" no chocan con los ingleses, pero "Hamilton", "Kilmarnock"... no hay problema hoy) conviene confirmarlo viendo el leagueId devuelto.
3. Título con en dash (`–`), no `-`: copiar tal cual del informe, si no la API da "¿título exacto?".
4. 2025-26 usa estructura de secciones distinta a 2018-19 (menos subsecciones, igual `Teams` + `Stadia and locations`), no debería afectar.
5. Wikipedia usa "Stadia" en lugar de "Stadiums"; no está en `DEFAULT_SECTION_NAMES` pero no hace falta porque entra como subsección de `Teams`.
6. Fuera de alcance: Scottish Premier League (hasta 2012-13) tiene otro título (`2012–13 Scottish Premier League`), no se necesita.
