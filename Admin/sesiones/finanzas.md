## Finanzas 5

### Qué cambió (para CHANGELOG)
- To-do 295 (c), Primera Liga rusa (FNL) 2025: Ассоциация профессиональных футбольных клубов «Футбольная Национальная Лига» (ИНН 7705124551, GIR BO 1703426); dictamen de ООО «ТЕРРАФИНАНС» (27-04-2026), sin salvedades y sin párrafo de continuidad. PDF escaneado de 35 págs. (`Ligas/Rusia/FNL/`, el PDF sin trackear; copiarlo a la principal con `rsync --no-links`), `.md` con Tesseract rus+eng y la pág. 2 cotejada con la imagen. Línea `ru-premierliga`→ `ru-pervayaliga` en `Admin/registros/auditoria.jsonl`, nota `Admin/sourcing/Ligas/fnl-rusia.md`. Solo 2025 trae dictamen en el GIR BO. ASSET_V 1366. Commit 935818e15a.
- To-do 261 a: lista `Admin/lotes/reino-unido-validar.txt` (los 108 PDF del Reino Unido con `.md` de subagentes). Ensayo gratis de `pipeline.mjs --lista … --limit 0`: 106 documentos (1 de más de 100 págs. queda aparte), ~US$ 11,48; 3 están "sin tablas" y se rehacen con Mistral.

- To-do 261 b y c: `Admin/transcripcion-subagentes/sociedad-por-documento.md` (cinco clubes con dos sociedades en el mismo ejercicio: Aston Villa 2022-23 y 2023-24, Brighton, Fulham y Sunderland 2022-23; West Ham y Wolves `wf-2022-2023-*` son del ejercicio 2024). Los 3 duplicados exactos (Celtic 2022-23 y 2023-24, Man City 2022-23) pasan a `documentos-descartados.txt`. Commit 8d0af5fffa.

### Qué queda (para TODO)
- 261 a: correr la validación (cuesta ~US$ 11,48; comando abajo) y después el lote (etapa 3 en adelante). El ensayo avisa que Celtic 2020-21 (106 págs.) queda afuera salvo `--max-paginas 0`.
- 261 b: decidir cuál sociedad entra en cada uno de los 5 pares de `sociedad-por-documento.md` (regla de entidad) y mandar el otro a descartados; Wolves 2023-24 solo tiene W.W. (1990).
- 261, seguir transcribiendo: preguntarle a Guido si sigue con subagentes o pasa a Mistral.
- 295: segundas divisiones sin buscar: Lega Pro (Serie C, Italia), Liga 3 portuguesa (FPF), Serie D (LND), federaciones paulistas. No tocar CBF, DFL, Serie A, Liga Portugal ni AFA. Mejora de script: `tools/auditoria.mjs --extractos` no lee informes en ruso (no se probó).

### Qué deja de ser cierto en ESTADO
- Balances de entidades de liga: suma la FNL 2025 (`ru-pervayaliga`); en la RPL, la nota ya no dice que la FNL no se buscó.

## Después del primer merge de Finanzas 5 (2026-10-19)

### Qué cambió (para CHANGELOG)
- To-do 261 b y c: `Admin/transcripcion-subagentes/sociedad-por-documento.md` (cinco pares con dos sociedades en el mismo ejercicio: Aston Villa 2022-23 y 2023-24, Brighton, Fulham y Sunderland 2022-23; los `wf-2022-2023-*` de West Ham y Wolves son del ejercicio 2024) y los 3 duplicados exactos (Celtic 2022-23 y 2023-24, Man City 2022-23) a `documentos-descartados.txt`. Commit 8d0af5fffa.
- To-do 261, transcripción con subagentes Sonnet (decisión de Guido: seguir con subagentes): 6 `.md` nuevos, con 0 P1 / 0 P2 de `check-transcripcion-fidelidad.js` y P&L y balance que cierran: Wolves 2019-20, Aston Villa 2018-19, 2019-20 y 2020-21, West Ham 2019-20 y 2020-21. Bloques 72 a 74 de la cola (`pos.txt` = 74 de 1531). Los PDF ya estaban en la carpeta principal (los `.md` se escribieron en el worktree). Commit c41c488b8f. Se corrió con copias de `claim.sh`, `ocr.sh` e `INSTRUCCIONES.md` apuntadas a esta carpeta (los originales tienen la ruta de la principal).
  Las notas de West Ham 2020-21 (salvo 34, 35, 37 y 39) y 2019-20 (salvo 24, 40 y 38) y parte de las de Aston Villa quedaron cerradas por sumas, no contra la imagen: mirarlas antes de cargar caja y deuda.

### Qué queda (para TODO)
- 261: seguir la cola desde el bloque 75 (`claim.sh` con la ruta de la carpeta donde se corra). La validación con `pipeline.mjs --lista Admin/lotes/reino-unido-validar.txt --limit 0` (~US$ 11,48) sigue sin correrse; los 6 `.md` nuevos de arriba no están en esa lista.
- 261 b: decidir cuál sociedad entra en cada par y mandar el otro a descartados.
- 295: segundas divisiones sin buscar: Lega Pro, Liga 3 portuguesa (FPF), Serie D (LND), federaciones paulistas.

### Qué deja de ser cierto en ESTADO
- "van 71 de 1531 bloques" (to-do 261): van 74. En el 261, "108 .md hechos" pasa a 114.
