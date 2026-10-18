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
- **To-do 273: guardado y compuerta.** `estadio-sponsor.mjs --escribir` escribe `data/contexto/<iso>.js` (18 países):
  `window.CLUB_CONTEXT[clubId][año] = { estadio, capacidad, sponsor, marca, temporada, fuente }`, `fuente` = permalink con `oldid`. Lo ya
  guardado no se vuelve a bajar (`--refrescar` sí). `tools/contexto-manual.json` (nuevo, vacío) gana campo por campo, con fuente
  obligatoria. Una tabla de kits "solo la actual" vale solo en la última temporada de la liga en la caché. Sobre 932 ejercicios: estadio
  79%, sponsor 85%, marca 87%; 238 sin estadio o sin sponsor (no se frenan: son ejercicios ya cargados).
  **Compuerta en `tools/cargar.mjs`** (`compuertaContexto()`, un solo punto antes de `escribir()`, acordado con fos-pipeline para que la
  del auditor del to-do 282 vaya al lado): corre `estadio-sponsor.mjs --escribir --club <id> --anio <año> --liga <liga> --cierre <MM-DD>`
  y no escribe si falta estadio o sponsor. `alta-club.mjs` no la necesita: da de alta el club sin ejercicios, y el primero pasa por
  `cargar.mjs`. También en `tools/bfo-rusia.mjs`, que escribe con `escribir()` sin pasar por el `main()` de cargar (aviso de fos-pipeline);
  ahí no frena un año ya cargado que solo se reescribe. Ojo: el estadio de Rusia no sale de Wikipedia (0 de 66), así que todo año ruso
  nuevo frena hasta completarlo a mano. ASSET_V 1255 (los archivos de `data/contexto/` todavía no los carga el sitio: los va a mostrar fos-pantallas en Finanzas).
- **To-do 273: índice de sponsors y marcas** (pedido de Guido: página por sponsor y por marca técnica, con su histórico y los equipos que
  sponsorea hoy; los equipos de toda la liga, los que el sitio no tiene en gris). `estadio-sponsor.mjs` ahora guarda una caché por liga-año
  con TODOS los equipos (`tools/club-league-reference/contexto/<iso>.json`; `--todas` para todas las listas, `--actuales` para la temporada
  en curso de cada liga; una página inexistente queda anotada). Lo guardado de cada club no cambió (932 de 932 iguales).
  `tools/generate-sponsors.js` (nuevo) → `data/sponsors.js`: 2402 sponsors y marcas (965 con algún club del sitio), 431 liga-años, "hoy" en
  52 ligas; ~650 KB. Un equipo se une a un club del sitio por nombre (un filial, "Benfica B", solo con su nombre exacto). Nombres unificados
  a mano en `tools/sponsor-alias.json` (17 variantes de espacio o ".com", y Fly Emirates = Emirates; las "X Group" no, sin verificar).
  `alias.json`: "Inter Milan" → inter-it y "Sporting de Braga" → braga-pt. Corre con los generadores de `cargar.mjs` y `alta-club.mjs`, y
  `audit.js` lo chequea (`sponsors-desfasado`, P1). ASSET_V 1256.
- **To-do 273: estadio de Rusia.** Las páginas rusas lo traen en una galería de fichas (sección "Venues"), no en tabla: lector nuevo
  `galeriaEstadios()` en `estadio-sponsor.mjs` (bloques club / estadio / capacidad, se acepta uno solo si las tres filas tienen las mismas
  celdas). Rusia: estadio de 0 a 55 de 66 ejercicios; total, estadio 82%. ASSET_V 1257.

## Qué queda (TODO)

- Borrar los to-dos 276 y 277 (resueltos; el 277 con la premisa vencida, ver arriba).
- 273 sigue abierto: completar a mano (`tools/contexto-manual.json`) los 238 ejercicios cargados sin estadio o sin sponsor
  (`node tools/estadio-sponsor.mjs --ensayo` los lista); mostrarlo en Finanzas (fos-pantallas); la página de cada sponsor (pedido de Guido:
  su histórico y qué equipos sponsorea hoy: los datos están en `data/sponsors.js`; falta la pantalla). Lo cargado a mano en
  `contexto-manual.json` todavía no entra al índice de sponsors (está por año de ejercicio, no por liga-temporada). `data/sponsors.js`
  pesa ~650 KB: si la pantalla lo carga entero, partirlo (por letra o por liga).
- Rusia: 13 ejercicios sin estadio (Krylia Sovetov 2021-2025, Spartak 2022-2023, Akron 2024-2025, Dynamo Makhachkala 2024-2025, Baltika
  2024, Sochi 2024): sus fichas están pegadas al mapa de la galería. Van a `contexto-manual.json` con una fuente que dé el nombre de cada
  temporada (los nombres comerciales cambian: Samara Arena / Solidarnost Samara Arena, Otkritie Arena / Lukoil Arena); premierliga.ru
  pide captcha.
- La skill `club-or-year-onboarding` y `Admin/PIPELINE.md` tienen que nombrar la compuerta nueva de `cargar.mjs` (la skill, con ok de Guido).

## Qué deja de ser cierto en ESTADO

- Nada de las listas: ESTADO no las nombra.
- La lista de compuertas de `cargar.mjs` en ESTADO ("Pipeline") suma una: estadio y sponsor del ejercicio (to-do 273).
