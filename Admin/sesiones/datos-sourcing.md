# Cierre de la rama datos-sourcing (worktree fos-datos)

Lo que la principal pasa a TODO, CHANGELOG y ESTADO al mergear. Se va completando mientras la sesión trabaja.

## Qué cambió (CHANGELOG)

- **To-do 277 cerrado, y la premisa estaba vencida:** `data/club-leagues/it.js` estaba bien. Entre 2016 y 2019 Parma cerró el 30/6
  (`club-index`, `ci`): su 2017 es la Serie C 2016-17 y su 2018 la Serie B 2017-18. El error estaba en `tools/listas-lote.mjs`, que calculaba
  la temporada con la regla del club (`fiscalYearStart: 01-01`, cierre 31/12) en vez del cierre de cada ejercicio, y por eso buscaba a Parma
  en la Serie C 2017-18. Ahora usa `CI[id].ci[y]`, como `faltantes-liga.mjs`. Medido con `--ensayo`: 6 → 5 liga-años pendientes.
- **To-do 276: las listas de equipos que no salían.** Cambios en el lector (`tools/fetch-club-league-reference.mjs`):
  - **Matrícula:** si la 1ª celda de una fila es solo un número, el club es la celda siguiente (Bélgica 2024-25 daba 16 números).
  - **Grupos:** con secciones "Group A/B/C" (o "Girone"), se toma la mejor tabla de cada grupo y se juntan, si la unión es más grande
    que lo que da la sección de equipos y la contiene. Solo con 2 grupos o más y al menos 8 equipos en cada uno. La Serie C 2016-17 sale
    igual a la lista armada a mano (60, sin diferencias).
  - En `tools/listas-lote.mjs`: tope de 40 equipos por grupo, y `OTRO_IDIOMA`, títulos en otro idioma para ligas sin página en inglés
    (hoy solo Primera B Metro: "Campeonato de Primera B 2019-20 (Argentina)", sección "Equipos participantes"), que se prueban solo si
    ningún título en inglés pasa la compuerta.
  - `alias.json`: "Union SG" → `unionsg-be` (clave `be` nueva).
  - Ensayo: 5 de 5 liga-años pasan la compuerta. `--contra-cache`: 15 de 376 listas guardadas difieren de lo que baja hoy, pero el
    lector viejo da lo mismo que el nuevo en las 15 (son cambios de Wikipedia o de reglas anteriores, no se tocaron).
  - Guardadas las 5 listas (`listas-lote.mjs`): Primera B Metro 2020 (18) y 2021 (17), Pro League 2024-25 (16, `be.json` nuevo),
    Serie C 2023-24 (60) y Liga 1 de Perú 2020 (19). `faltantes-liga.mjs` regenerado (`data/faltantes/` con `ar-primerab.js` y
    `be-proleague.js` nuevos, `Admin/sourcing/pendientes.md`), ASSET_V 1254, `fuentes/` regenerado. `--print`: 0 alias rotos, 0 que faltan.
- **To-do 273 (en curso): `tools/estadio-sponsor.mjs --ensayo`.** Mide, sin escribir nada, cuánto estadio, capacidad, sponsor de camiseta
  (frente) y marca técnica se puede leer de las páginas de temporada de Wikipedia que ya usan las listas, por ejercicio cargado.
  Campos y fuente decididos por Guido (2026-10-18): esos 4, sin monto, fuente = revisión exacta de la página. Cobertura medida sobre 891
  ejercicios con lista: estadio 83%, sponsor 89%, marca 91% (38 ejercicios sin liga en club-leagues y 3 sin lista quedan afuera).
  Huecos: estadio de Rusia (la página lo trae en un mapa, no en tabla), Brasil C/D y Paulistas, Liga 3 de Portugal, ascensos de
  Argentina y Colombia sin tabla de kits.

## Qué queda (TODO)

- Borrar los to-dos 276 y 277 (resueltos; el 277 con la premisa vencida, ver arriba).

## Qué deja de ser cierto en ESTADO

- Nada: ESTADO no nombra estas listas.
