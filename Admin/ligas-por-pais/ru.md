# Ligas por país: ru

Lo que había como comentario en `data/club-leagues/ru.js` (data/ se publica: to-do 209), movido tal cual por
`tools/mover-comentarios-compartidos.mjs --resto-ligas`: cómo se verificó en qué liga jugó cada club. Las reglas del formato están en
`data/club-leagues.js`; las notas de UN club, en su `Admin/carga-clubes/<club>.md`.

```text
============================================================================
data/club-leagues/ru.js — en qué liga jugó cada club de Rusia en cada
ejercicio. Creado por tools/alta-club.mjs (2026-10-10) al dar de alta el primer club del país.

SE EDITA A MANO (o por alta-club.mjs), no lo genera ningún generador. Un archivo por
país (Versión 164). SE AUTOREGISTRA con Object.assign sobre la tabla que ya existe.

LAS REGLAS (qué significa `null`, el criterio de "la categoría al cierre", por qué los
ids de liga nombran el escalón) están UNA sola vez, en la cabecera de
`data/club-leagues.js`. No se copian acá.
============================================================================
```
