# Ligas por país: co

Lo que había como comentario en `data/club-leagues/co.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --resto-ligas`: cómo se verificó en qué liga jugó cada club. Las reglas del formato están en
`data/club-leagues.js`; las notas de UN club, en su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/club-leagues/co.js — en qué liga jugó cada club de Colombia en cada
ejercicio (cierre de ejercicio: 31/12).

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
```
