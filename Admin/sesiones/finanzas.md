## Finanzas 5 (sigue)

(Lo anterior de Finanzas 5 ya está en main y archivado.)

### Qué cambió (para CHANGELOG)
- To-do 261, transcripción por subagentes Sonnet, segunda tanda (bloques 75 a 77 de la cola; `pos.txt` = 77 de 1531): 6 `.md` nuevos, con 0 P1 / 0 P2 de `check-transcripcion-fidelidad.js` y P&L y balance que cierran: Red Bull Racing 2020, Chelsea Holdings 2019-20 y 2020-21, Leeds United 2018-19, 2019-20 y 2020-21. Los PDF ya estaban en la carpeta principal. Con esto, 12 transcripciones por subagentes en esta sesión (114 + 6 = 120 `.md` del Reino Unido).
- Decisión de Guido: no transcribir más con subagentes; el resto de la cola (1454 bloques) sigue por otro camino (Mistral, con el ensayo de `pipeline.mjs`).
- Cosas a mirar antes de cargar: Leeds 2019-20 cubre 13 meses (1-07-2019 a 31-07-2020) y Leeds 2020-21 es la versión "AMENDED" de 11 meses (1-08-2020 a 30-06-2021); Red Bull 2020: el turnover de la pág. 4 (230.087) no coincide con el estado (229.754: usar el estado); Chelsea 2020-21, pág. 18 trae "2020 | 2020" en las dos columnas (error del original).
- Las notas que no se miraron contra la imagen se cerraron por sumas: Chelsea (págs. 32, 35, 39 y, en 2019-20, 19 y 28), Leeds (notas 26-28, 30 y 32 de 2020-21; 12-14 de 2019-20; estados y notas de 2018-19) y Red Bull (págs. 1-13 y 17-19).

### Qué queda (para TODO)
- 261: validar los 12 `.md` de subagentes de esta sesión (los 6 de la primera tanda y los 6 nuevos) con `pipeline.mjs --lista` (ensayo gratis primero).
- 261 b: decidir cuál sociedad entra en cada par de `Admin/transcripcion-subagentes/sociedad-por-documento.md`.
- 295: segundas divisiones sin buscar (Lega Pro, Liga 3 portuguesa, Serie D, federaciones paulistas).

### Qué deja de ser cierto en ESTADO
- "van 71 de 1531 bloques" (261): van 77.

## Después del merge de la segunda tanda (2026-10-19)

### Qué cambió (para CHANGELOG)
- To-do 261: validación de los 12 `.md` de subagentes (`Admin/lotes/reino-unido-validar-2.txt`, `pipeline.mjs --ejecutar`, lo corrió Guido): 12 listos, ~US$ 1,3. Aston Villa 2019-20 y 2020-21 se rehicieron con Mistral por el control "sin tablas". Los 11 `.md` que la corrida tocó pasan 0 P1 / 0 P2 de fidelidad y no rompen citas de `entidades.jsonl`.

### Qué queda (para TODO)
- 261: el lote (etapa 3 en adelante) de los 12 + los 106 ya validados; no se transcribe más con subagentes (Guido).
- 261 b y 295 como antes.

### Qué deja de ser cierto en ESTADO
- Nada nuevo.
