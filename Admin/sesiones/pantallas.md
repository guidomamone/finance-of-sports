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
- 282: por decisión de Guido (2026-10-19) Hamburgo 2024 se publicó "sin informe de auditoría" (`sin_informe`, línea 310 de `auditoria.jsonl`), con nota; si aparece el Bestätigungsvermerk 2023/24, pasa a sin_salvedades. ASSET_V 1401.

## Pantallas 3, segunda tanda (2026-10-19)

### Qué cambió (para CHANGELOG)

- 252: `tools/ejercicios-nuevos.mjs` reconoce como "ya bajado" un PDF con una fecha `AAAA-MM-DD` del año esperado en el nombre (`cierre-2025-12-31`):
  River (cierre de agosto a diciembre) pasa de "a mano" a "ya en su carpeta". Probado con `--club river`.
- 252: lote 103 (`Admin/lotes/lote-103.txt`, 23 PDFs: el ejercicio siguiente de 21 clubes con el PDF ya en su carpeta; sin Bélgica, Noruega, Suiza, Países Bajos
  ni Reino Unido). Cierres fijados con `ajustes.mjs`: FC Fredericia 2020 (2020-12-31) y Hajduk Split 2025 (2025-12-31). Costo: unos US$ 5,37 de transcripción
  (15 sin `.md`, 2 sin tablas) más ~US$ 2,47 de lote; Colo-Colo y Universidad de Chile 2025 (más de 100 págs.) quedan fuera sin `--max-paginas 0`. Lo corrió Guido.
- 273: sin cambio de código. `generate-sponsors.js` ya suma lo de `contexto-manual.json` por `data/contexto/<iso>.js` (43 de 45 sponsors manuales ya están;
  los otros 2, Lierse 2020 y OH Leuven 2022, son años belgas no cargados). `--check` da "al día".

### Qué queda (para TODO)

- 252: River `estados-contables-cierre-2025-12-31.pdf` (sin `.md`) no está en el lote 103; falta para otro lote. Vasco da Gama 2024 quedó afuera: hay Associação y SAF y no sé cuál es el club.
  14 clubes (AGF, Brøndby, Chaves, Estrela da Amadora, København, Mirassol, Nordsjælland, Osasuna, Randers, SønderjyskE, Torreense, União de Leiria, Vejle,
  Villarreal) salen "ya en su carpeta" pero mi filtro por nombre no encontró el PDF del ejercicio siguiente: mirar si el script los marca de más.
- 273: borrar el resto del punto (el generador ya suma el contexto manual); los años viejos sin sponsor quedan en null por decisión de Guido.

### Qué deja de ser cierto en ESTADO

- Nada.

### Lote 103, después de la transcripción (2026-10-19)

- Transcripción y validación hechas (US$ 4,40). 0 años cargados todavía: 23 documentos frenados por la cola y por tres cierres.
- Cierres fijados: Viborg 2025 (2025-06-30), Silkeborg 2025 (2025-12-31), Dinamo Zagreb consolidado 2025 (2025-12-31).
- 23 casos de cola contestados por subagentes Sonnet (5 grupos por país) y revisados contra el .md los de Amazonas y Colo-Colo.
- Amazonas 2025 (`demonstracoes-contabeis-2025-faf-1.pdf`) es el balance de la Federação Amazonense de Futebol, no del club: respondido `descartar`; falta que Guido
  confirme si va a `Admin/registros/documentos-descartados.txt`, y buscar el balance 2025 de Amazonas FC.
- Dinamo Zagreb 2025: hay dos documentos del mismo año (consolidado e individual); el sitio tiene el 2024 desde el consolidado, así que el consolidado es el que entra.
  Rijeka: el 2024 cargado es combinado (HNK Rijeka + Stadion Kantrida) y el documento 2025 es individual: serie con perímetros mezclados (existe `financijsko-izvjesce-2024.md`, individual).
  Colo-Colo 2025: la nota 21 suma 117.232 más que el estado; causa sin explicar (candidata a `Admin/dudas-por-club.md`).
- El agente de Croacia usó Bash (solo para listar y buscar) aunque se le dijo que no.
- Botafogo-SP: nada de lo respondido sale de `demonstracoes-contabeis-2022-2023.pdf` (es de Botafogo S.A.).

### Lote 103, segunda corrida (2026-10-19)

- 0 años cargados otra vez. La corrida categorizó solo 2 documentos de Basel (de Pipeline 5, US$ 0,056) y ninguno del lote 103: el registro todavía los tenía sin "listo-para-jev". Basel no se tocó (no se escribió nada). El ensayo ahora cotiza ~US$ 0,66 de categorización para los 22.
- Unión Magdalena 2025: `[periodo]` frena con razón. El estado trae 2025 primero y el pipeline extrajo la segunda columna (2024) del documento 2025 (`.rubros.json` year 2024; la nota 24 toma 1.564.483, la columna 2024). Defecto de script, al TODO sin diseñar. Mi respuesta "aceptar" del caso 864aa95 estaba mal y la corregí con `corregir --valor no`. No cargar este año hasta resolverlo.
