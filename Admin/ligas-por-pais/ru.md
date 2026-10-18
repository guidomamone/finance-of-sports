# Ligas por país: ru

Lo que había como comentario en `data/club-leagues/ru.js` (data/ se publica: to-do 209), movido tal cual por
`tools/archivo/mover-comentarios-compartidos.mjs --resto-ligas`: cómo se verificó en qué liga jugó cada club. Las reglas del formato están en
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

## Verificación 2026-10-17 (to-do 266)

Cruzado con las listas de Wikipedia de `tools/club-league-reference/ru.json` (ejercicio al 31/12 del año y = la temporada que arranca
ese año, la que termina en y+1). Coinciden todos los clubes salvo Dynamo Makhachkala, que estaba en la Premier 2021-2023 y no jugó ahí:
2021 en la FNL-2 (tercera, fuera del catálogo: `liga-no-catalogada`), 2022 y 2023 en la Primera Liga (está en las listas 2022-23 y
2023-24 de la FNL), 2024 y 2025 en la Premier (listas 2024-25 y 2025-26). El archivo tenía cada club repetido hasta 3 veces (58 claves
duplicadas; JavaScript se queda con la última, así que no cambiaba nada salvo Makhachkala): se reescribió sin repetidos.
