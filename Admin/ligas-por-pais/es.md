# Ligas por país: es

Lo que había como comentario en `data/club-leagues/es.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --resto-ligas`: cómo se verificó en qué liga jugó cada club. Las reglas del formato están en
`data/club-leagues.js`; las notas de UN club, en su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/club-leagues/es.js — en qué liga jugó cada club de España en cada
ejercicio (cierre de ejercicio: 30/6).

SE EDITA A MANO, no lo genera ninguna herramienta. Un archivo por país
(Versión 164) para que el repaso anual de ascensos y descensos sea el de UN
país y no el de una tabla con todos adentro.

SE AUTOREGISTRA, igual que `sources{}` y `gestionesByClub{}` desde la Versión
101: no redeclara nada, le agrega sus clubes a la tabla que ya existe. El orden
en que se carguen los países no importa.

LAS REGLAS (qué significa `null`, el criterio de "la categoría al cierre", por
qué los ids de liga nombran el escalón y no al organizador) están UNA sola vez,
en la cabecera de `data/club-leagues.js`. No se copian acá.
============================================================================
---------------------------------------------------------------------------
CUÁNTOS EQUIPOS TUVO LA LIGA cada ejercicio (ver la cabecera de
`data/club-leagues.js`, sección "EL TAMAÑO DE LA LIGA", para qué significa y
cómo se edita). El ejercicio español cierra el 30/6 y coincide con la
temporada, así que la clave 2025 es la temporada 2024/25.

Verificado el 21/9/2026 contra "2024-25 La Liga" (Wikipedia, en.wikipedia.org),
que lo dice con todas las letras: "A total of twenty teams contest the league,
including seventeen sides from the 2023-24 season and three promoted from the
2023-24 Segunda División". El infobox declara 380 partidos, consistente con 20
equipos ida y vuelta (20 x 19).

OJO AL AGREGAR 2024: el ejercicio 2024 (temporada 2023/24, que hoy usa
villarrealcf) todavía NO está acá. Son 20 también, pero no se escribe hasta
verificarlo contra "2023-24 La Liga": la regla del archivo es que un número sin
chequear no entra, aunque parezca obvio.
---------------------------------------------------------------------------
```
