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
  - Ensayo: 5 de 5 liga-años pasan la compuerta (Primera B 2020 y 2021, Pro League 2025, Serie C 2024, Perú 2020).

## Qué queda (TODO)

## Qué deja de ser cierto en ESTADO
