# Rama `pantallas`

## Pantallas 3 (2026-10-19)

### Qué cambió (para CHANGELOG)

- 284: Fredrikstad 2012 con estadio, capacidad (13.300), sponsor (Stabburet, principal de FFK desde marzo de 2010 durante siete temporadas, hasta
  diciembre de 2016) y marca (Adidas, desde febrero de 2012) en `tools/contexto-manual.json`, con fuentes. La compuerta de estadio y sponsor lo acepta
  (`--club fredrikstad-no --anio 2012 --liga no-eliteserien --cierre 12-31`). Sarpsborg 08 no se tocó.
- 195: Fortaleza 2025 con el CEO Pedro Martins (decisión de Guido) en `data/gestiones/br.js`, desde 2025-12-28 (el club lo confirmó ese día) y `firmo: [2025]`
  porque una nota habla del 2026-01-03 como inicio formal; Barreira y Cals dejan de cargarse. Nota en `Admin/carga-clubes/fortaleza-br.md`. ASSET_V 1398.
- 273: la skill `club-or-year-onboarding` (sección 6) nombra la compuerta de estadio y sponsor, con el texto aprobado por Guido. Para `PIPELINE.md`
  no hubo cambio: lo vigente ya figura ahí. Falta (de 273): completar a mano los ejercicios sin estadio o sponsor y que `generate-sponsors.js` sume
  `contexto-manual.json`: siguen en el TODO.
- 309: `generate-rankings.js` usa `wiki.n` como `leagueSize` cuando no hay tamaño verificado (decisión de Guido, listas raras incluidas). 289 liga-años
  con "N de los M" (eran 4). Visto en el preview (Primera Nacional 2023: "2 of the 34 clubs of the season", "Missing 32 of the 34"). ASSET_V 1399.
- `node tools/gestiones-tanda.mjs --armar`: 0 casos de gestión pendientes en la cola, no se armó tanda.

### Qué queda (para TODO)

- 284: correr el lote 95 para cargar el FLI de Fredrikstad 2012 (comando abajo; la 2013-2018 ya están). Después borrar 284 de Fredrikstad del TODO.
- 195: borrar el punto de Fortaleza. Falta del club la fecha exacta de asunción de Martins (ya en la nota del club).
- 282: Hamburgo 2024 espera el PDF del Bestätigungsvermerk del ejercicio 2023/24 (captcha de Guido); después se transcribe y se carga la línea de
  `Admin/registros/auditoria.jsonl`. La (f) es de Pipeline 4.
- 309: borrar el punto. Si una lista cuenta mal (Chile 2021, Perú, Colombia B, Grecia 2), el tamaño sale mal: corregir en `LEAGUE_SIZE_BY_YEAR`, que manda.

### Qué deja de ser cierto en ESTADO

- Si ESTADO dice que el tamaño de la liga "no está verificado" en la mayoría de las liga-temporadas, ya no: sale de la lista de Wikipedia cuando no hay verificado.
- `ESTADO-clubes.md` se regenera solo cuando se cargue Fredrikstad 2012.

### Después del merge (2026-10-19)

- Lote 95 corrido por Guido: Fredrikstad 2012 (FLI) cargado, commit 84c92fd14d; cierra contra lo impreso y contra la columna del año anterior de 2013.
- Fotballinvest AS 2008-2011 (el aviso del lote 95, el de 2010) NO se carga: el club es el FLI; nota en `Admin/carga-clubes/fredrikstad-no.md`. Del TODO 284:
  Fredrikstad 2008-2011 queda sin cargar por esa razón; Sarpsborg 08 y Pardubice siguen como estaban.
- 282, Hamburgo 2024: el PDF público de hsv.de (`hsv_jahresabschluss_und_lagebericht_2023_24.pdf`, 36 págs.) es el mismo que ya tenemos y no trae el
  Bestätigungsvermerk; solo está en el Unternehmensregister o el Bundesanzeiger, detrás de captcha. No se resuelve el captcha con ninguna herramienta:
  sigue pendiente (o candidato a mail al club, que Guido no quiere por ahora).
