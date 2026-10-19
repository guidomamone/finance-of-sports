## Finanzas 5

### Qué cambió (para CHANGELOG)
- To-do 295 (c), Primera Liga rusa (FNL) 2025: Ассоциация профессиональных футбольных клубов «Футбольная Национальная Лига» (ИНН 7705124551, GIR BO 1703426); dictamen de ООО «ТЕРРАФИНАНС» (27-04-2026), sin salvedades y sin párrafo de continuidad. PDF escaneado de 35 págs. (`Ligas/Rusia/FNL/`, el PDF sin trackear; copiarlo a la principal con `rsync --no-links`), `.md` con Tesseract rus+eng y la pág. 2 cotejada con la imagen. Línea `ru-premierliga`→ `ru-pervayaliga` en `Admin/registros/auditoria.jsonl`, nota `Admin/sourcing/Ligas/fnl-rusia.md`. Solo 2025 trae dictamen en el GIR BO. ASSET_V 1366. Commit 935818e15a.
- To-do 261 a: lista `Admin/lotes/reino-unido-validar.txt` (los 108 PDF del Reino Unido con `.md` de subagentes). Ensayo gratis de `pipeline.mjs --lista … --limit 0`: 106 documentos (1 de más de 100 págs. queda aparte), ~US$ 11,48; 3 están "sin tablas" y se rehacen con Mistral.

### Qué queda (para TODO)
- 261 a: correr la validación (cuesta ~US$ 11,48; comando abajo) y después el lote (etapa 3 en adelante). El ensayo avisa que Celtic 2020-21 (106 págs.) queda afuera salvo `--max-paginas 0`.
- 261 b y c: sin empezar (sociedad de cada documento y wf-* duplicados, según `hallazgos-por-documento.txt`).
- 261, seguir transcribiendo: preguntarle a Guido si sigue con subagentes o pasa a Mistral.
- 295: segundas divisiones sin buscar: Lega Pro (Serie C, Italia), Liga 3 portuguesa (FPF), Serie D (LND), federaciones paulistas. No tocar CBF, DFL, Serie A, Liga Portugal ni AFA. Mejora de script: `tools/auditoria.mjs --extractos` no lee informes en ruso (no se probó).

### Qué deja de ser cierto en ESTADO
- Balances de entidades de liga: suma la FNL 2025 (`ru-pervayaliga`); en la RPL, la nota ya no dice que la FNL no se buscó.

## Después del primer merge de Finanzas 5 (2026-10-19)
