# Ligas por país: ee

Cómo se verificó en qué liga jugó cada club de Estonia en cada ejercicio (data/club-leagues/ee.js). Las reglas del formato están en
`data/club-leagues.js`; las notas de un club, en su `Admin/carga-clubes/<club>.md`. To-do 299 (rama onboarding, 2026-10-18).

- Temporada = año calendario (los ejercicios de los clubes estonios cierran el 31/12): el ejercicio 2025 es la Meistriliiga 2025.
- Ligas: `ee-meistriliiga` (Meistriliiga, primera, 10 equipos) y `ee-esiliiga` (Esiliiga, segunda).
- Fuente: las páginas de cada temporada en en.wikipedia ("2019 Meistriliiga" a "2025 Meistriliiga", tabla de equipos), consultadas el
  2026-10-18. FCI Levadia, Flora, Nõmme Kalju, Paide Linnameeskond, Narva Trans, Tammeka y Kuressaare están en las siete.
- Tallinna Kalev: Meistriliiga 2019, 2020 y 2022-2025; en 2021 jugó la Esiliiga ("2021 Esiliiga": 2.º, ascendió).
- Harju JK Laagri (club desde 2023): Meistriliiga 2023 (último), Esiliiga 2024 ("2024 Esiliiga": campeón, ascendió), Meistriliiga 2025.
- Tamaño de cada liga-temporada (LEAGUE_SIZE_BY_YEAR): Meistriliiga 10 equipos en 2019-2025 y Esiliiga 10 en 2021 y 2024, contados en la tabla de equipos de cada página (copia en tools/club-league-reference/ee.json).
