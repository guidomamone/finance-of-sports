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

## Después del merge de la validación de los 12 (2026-10-19)

### Qué cambió (para CHANGELOG)
- To-do 295 (c), segundas divisiones restantes, solo notas de sourcing: `Admin/sourcing/Ligas/lega-pro-serie-c.md` (Lega Serie C: `legaseriec.it` no responde desde acá y las búsquedas no traen su bilancio; candidato a mail, sin armar; la Serie D es de la LND y no se buscó) y `fpf-liga-3-portugal.md` (la FPF publica sus contas consolidadas con Certificação Legal: 2023/24 en `fpf.pt/DownloadDocument.ashx?id=29317`; `fpf.pt` da 403 a `curl`, así que el PDF lo baja Guido y entra con `alcance: federacion`).

### Qué queda (para TODO)
- 295: la FPF (Liga 3): Guido baja el PDF 2024/25 (o el 2023/24 del link) desde su navegador; después transcribir y cargar la línea. Lega Serie C: candidato a mail. Federaciones paulistas (A1-A3) sin buscar.

### Qué deja de ser cierto en ESTADO
- Nada nuevo.

### Federaciones paulistas (295 c)
- Federação Paulista de Futebol 2024 para `br-paulistaA1`, `A2` y `A3` (`alcance: federacion`): demonstrações financeiras y informe de RSM Brasil Auditores Independentes (23-01-2025), sin ressalvas, con un párrafo de ênfase (COFINS sobre receitas financeiras y comparativo 2023 reapresentado, auditado por otra firma); receitas operacionais 115.574 mil reales. El PDF (2 págs., digital) es la copia de `static.poder360.com.br`; el original en el sitio de la FPF no se encontró (queda anotado en `Admin/sourcing/Ligas/fpf-sp-paulista.md`). PDF copiado a la carpeta principal con `rsync --no-links`. ASSET_V 1368.
- Queda: el ejercicio 2025 de la FPF-SP; Lega Serie C y FPF (Liga 3) como antes.

### 261 b (decisión de Guido, 2026-10-19: la recomendación)
- En los 7 pares (Aston Villa 2022-23 y 2023-24, Brighton, Fulham y Sunderland 2022-23, West Ham y Wolves 2023-24) entra el documento de la sociedad del club y el `wf-*` de la otra sociedad (NSWE Sports, Holdings, Football Leisure, Sunderland Ltd, WH Holding, W.W. 1990) va a `documentos-descartados.txt`. Criterio: coherencia de perímetro con la serie publicada (para CONVENCIONES-DATOS: cuando hay dos sociedades del mismo club y ejercicio, entra la que ya publica el sitio). Corregí `sociedad-por-documento.md`: Wolves y West Ham 2023-24 también eran pares.
- El 295 queda cerrado por pedido de Guido; el 261 b, resuelto.

### Qué queda (para TODO)
- 261: el lote (etapa 3 en adelante); nada más de mi lado.

## Lote 97 del Reino Unido (fútbol inglés), 2026-10-19

### Qué cambió (para CHANGELOG)
- To-do 261 a, etapa 3 en adelante: lotes 97 (62 documentos en dos tandas: `lote-97.txt` y `lote-98.txt`; `lote-97-todos.txt` es la lista completa del Reino Unido, con Celtic y los otros deportes, que se dejaron afuera). Costo de API: ~US$ 4 (re-transcripciones con Mistral de 5 escaneos y reintentos de 9 documentos). Cola: 83 casos del fútbol inglés contestados por subagentes Sonnet (sin Bash) revisados por Claude: las listas "stated after charging" y los honorarios del auditor no se cargan como desglose; "Staff costs" total va a `wages_squad` en Brighton y Brentford (convención ya cargada) y en Aston Villa no (la sociedad no emplea a los jugadores); un estado de resultados que solo trae consolidado se carga con ese; perfil de los clubes ingleses: sin cuotas de socios ni otros deportes (0 real).
- Escritos en el sitio (un commit por año, `por el pipeline`): Aston Villa 2019, 2020, 2021, 2022 (2023 ya estaba), Arsenal 2022-23, Brentford 2022-23, Brighton 2020-23, Crystal Palace 2022-23, Fulham 2021 y 2023.
- Chelsea 2021-22: la extracción omitía "Fair value gain/(loss) on investment properties" (45 en £000): ajuste `fila` (L722); sin él el resultado daba -121.327 contra -121.282 impreso.
- Gestiones: Maxim Demin (Bournemouth, dueño desde 2011 hasta 2022-12-13; el año es el de Wikipedia, `desde` 2011-01-01) y Roman Abramovich (Chelsea, dueño 2003-07-01 a 2022-05-30; el día de inicio sale de "late Tuesday" del Daily Star) en `data/gestiones/gb.js`; porqué en `Admin/carga-clubes/bournemouth-gb.md` y `chelsea-gb.md`.
- Listas de equipos (`tools/club-league-reference/gb.json`) de la Premier, Championship y League One 2019 a 2022 (la League One con `--section Stadiums`: la tabla de `Team changes` no se lee) y de la Scottish Premiership 2024 y 2025; `data/leagues.js` suma `gb-scottishpremiership` (informe: investigación de un subagente). Fulham 2021-22: ajuste `cierre` 2022-06-30 (el 28/03/2023 es el sello de Companies House). Burnley 2022-23: contexto de estadio y sponsor con las listas ya cargadas (las filas viejas tenían las ligas cruzadas). `be.json` de la Challenger Pro League lo dejó sin commitear el lote 96 (se commiteó acá).
- 6 transcripciones por subagentes más (Red Bull 2020, Chelsea 2019-21, Leeds 2018-21; ya mergeadas) y la validación de los 12 (ya mergeada).

### Qué queda (para TODO)
- Defecto de script (a pipeline): `tools/generadores.mjs` no corre `tools/entidades.mjs`; un año nuevo de un club de un grupo multiclub cambia los ingresos del grupo (salen de `data/rankings/`) y `audit.js` da `entidades-desfasado`: `cargar.mjs` revierte. Frena Bournemouth 2022-23, Chelsea 2020-24 y Everton 2022-23 (10 años). Agregar `tools/entidades.mjs` a GENERADORES.
- Aston Villa 2023-24 (13 meses por cambio de cierre de mayo a junio): precedente Wolves 2025; la compuerta de transición de `cargar.mjs` (L347, `per.meses < 12`) no lo reconoce. Va con la z2 (Westerlo, 18 meses). El documento tiene año 2024, cierre 2024-06-30, ingresos 268.192 y resultado -49.425 (la propuesta del lote dice cierre 2024-05-31: está mal).
- Lote 100 (Fulham 2021-22: se localiza de nuevo con el cierre fijado) y lote 99 (alta de Celtic 2024-25, ~US$ 0,41; después color de marca y estadio y sponsor, a mano en `tools/contexto-manual.json` con fuente, y la liga `gb-scottishpremiership` en `data/club-leagues/gb.js` de Celtic).
- Celtic 2020-21 a 2023-24 (cuando el alta esté), los 5 documentos de `Escocia/` con `.md` no cargados; y los clubes de otros deportes (F1, cricket, rugby: to-do aparte, Guido).
- Brighton 2019-20: la "(Loss)/profit on player trading (599)" quedó en `other_expenses` (gasto 0,599); en 2020-21 y después el "Profit on player trading" va a `player_sales` (ingreso): consistente en el resultado, no en el rubro.
- Mejoras de script ya pasadas a main (para pipeline): costo del ensayo de `--reintentar`, filtro de `cola.mjs` por lista, escalón para las notas "after charging", redacción de las preguntas de la cola, perímetro que ya decide la regla, nombre legal en altas de otro deporte.

### Qué deja de ser cierto en ESTADO
- Reino Unido: Aston Villa, Arsenal, Brentford, Brighton, Crystal Palace y Fulham ya tienen más años en el sitio (el detalle: `Admin/ESTADO-clubes.md`).

### Aston Villa 2024 (13 meses), cargado (commit c3b9bfb491)
- Cargado como año 2024 (cierre 2024-06-30, fxRef GBP@2024-06-30) con el criterio de Wolves 2025 y la compuerta del período salteada a mano esa sola vez, con las condiciones de la principal: ensayo sin otros frenos, parche TEMPORAL de `tools/cargar.mjs` (la condición de 13 meses y la cadena de cierres 2023-05-31, 2024-06-30, 2025-06-30, porque el registro tiene el cierre del documento 2024-25 en null), `git checkout tools/cargar.mjs` apenas escribió, y ninguna línea de `tools/` en el commit. 2023 (al 31-05-2023) y 2025 no cambiaron (el diff de `data/gb/astonvilla-gb-data.js` es solo agregados); `publicNote`: "Ejercicio de transición por cambio de fecha de cierre (de mayo a junio): del 01/06/2023 al 30/06/2024 (13 meses)."; ajuste `cierre` 2024-06-30 al PDF; evidencia en `Admin/carga-clubes/astonvilla-gb.md`.
- Para el TODO: que `cargar.mjs` reconozca 13 meses (y que la cadena de cierres no dependa del cierre de los documentos vecinos del registro, que puede estar en null) va con la z2 (Westerlo, 18 meses).

## Cierre de Finanzas 5 (2026-10-20): por dónde seguir con el Reino Unido

### Qué cambió desde la nota anterior (para CHANGELOG)
- Lotes 97 a 99 y 106 del Reino Unido: Burnley 2022 y 2023, Manchester City 2021 y 2023 y Tottenham 2022 entraron al sitio (un commit por año, `por el pipeline`), sumados a Bournemouth 2022-23, Chelsea 2020-24 y Everton 2022-23 (lote 97) y a los 22 de la tanda anterior. Colas contestadas en total: 77 casos de los lotes 97 y 98 más 29 de los 99 y 106 (subagentes Sonnet sin Bash, revisados): reglas aplicadas en la nota de arriba. West Ham 2020-21 a 2023-24: la fila "Exceptional items" (ya incluida en Administrative expenses / Operating costs) sale con un ajuste `fila` en 0 (mejora de script 298 r2).
- Gestiones en `data/gestiones/gb.js`: Demin (Bournemouth), Abramovich (Chelsea), Radrizzani (Leeds), Ashley (Newcastle), Donald (Sunderland) y Lawwell (Celtic, entrada nueva de `celtic-gb`), con la fuente y los matices en la ficha de cada club; Celtic todavía no tiene ficha (la crea el alta): falta anotar ahí la de Lawwell (2023-01-01 a 2025-12-31, RNS "Board Change", fin según Wikipedia).
- Ajustes: Fulham 2021-22 `cierre` 2022-06-30 y `estado` b2 (el estado de resultados está en la pág. 14); Burnley `perimetro` consolidado; Chelsea 2021-22 fila omitida; Aston Villa 2023-24 `cierre` 2024-06-30. Estadio y sponsor manuales en `tools/contexto-manual.json` (Celtic 2025 con fuente por campo, Burnley 2022 y 2023). Listas de equipos de la Premier, Championship, League One 2019-2022 y de la Scottish Premiership 2024-25 en `tools/club-league-reference/gb.json`.

### Por dónde seguir (para TODO)
- **Reintentos del lote 106** (corrió, dejó 25 casos nuevos de verificación sin contestar en la cola: Leeds ×3, Liverpool 2021-22, Sunderland ×5 y Wolves ×4, "duda-de-extraer", "duda-de-localizar" y "duda-tema"; casi todos son las notas "stated after charging" y "Staff costs" ya resueltas por criterio: ver la nota anterior). Contestarlos con el mismo criterio y volver a correr `lote-98.txt` (`--ejecutar --cargar`).
- **Lote 98, lo que falta** (Leeds 2018-23, Liverpool 2021-23, Man City 2021-22, Newcastle 2020-24, Forest 2022-23, Sunderland 2019-23, Tottenham 2023, West Ham 2020-24, Wolves 2020-23): tiene filas verificadas y espera la cola de arriba; Leeds 2020-21, Liverpool 2022-23, Man City 2021-22 y Tottenham 2022-23 siguen "sin estado de resultados (queda como fuente)" tras el reintento: son escaneos de más de 28 páginas; mirar el `.md` re-transcripto y fijar el bloque con el ajuste `estado`, como se hizo con Fulham.
- **Newcastle 2020-21** (11 meses al 2021-06-30, regla de 11 meses de CONVENCIONES-DATOS): necesita la `.md` de Newcastle 2019-20 para que la cadena de cierres lo reconozca (se pidió `pipeline.mjs --lista Admin/lotes/transcribir-newcastle-2019-20.txt`); si el lote lo vuelve a frenar, falta que esa transcripción esté validada.
- **Fulham 2021-22** (lote 104): con el ajuste `estado` b2 y el `cierre` ya debería localizarse; falta correr `lote-104.txt` con `--ejecutar --reintentar --cargar` (el defecto de fondo, que `--reintentar` no relocaliza, es el 298 v2).
- **Celtic** (lote 99, alta de un club nuevo con 2024-25): el lote deja 3 casos sin contestar de categorías (Stadium operations, Operating expenses), perfil y reintento de "Salarios del plantel"; después de la alta faltan el color de marca (`club-nuevo.md`), la liga `gb-scottishpremiership` de Celtic en `data/club-leagues/gb.js` y la ficha de gestión. Los otros años de Celtic (2020-21 a 2023-24 tienen `.md`) van en un lote siguiente.
- F1, cricket y rugby: to-do aparte (decisión de Guido). Aston Villa 2023-24 (13 meses) ya está cargado a mano: reconocerlo en `cargar.mjs` va con la z2 (298 z2).
- Mejoras de script ya anotadas por main para Pipeline: n2, o2, r2, s2, v2, z2.

### Qué deja de ser cierto en ESTADO
- Reino Unido: más años de Aston Villa, Arsenal, Bournemouth, Brentford, Brighton, Burnley, Chelsea, Crystal Palace, Everton, Fulham, Manchester City y Tottenham en el sitio (el detalle: `Admin/ESTADO-clubes.md`, generado); la Scottish Premiership está en `data/leagues.js` (sin clubes cargados todavía).
