# Onboarding: notas para la principal

## Onboarding 3

Rama `onboarding`, sin push. Último commit al escribir esto: ver `git log`.

### Qué cambió
- **Viking AS 2017-2024** transcriptos (to-do 285; ya mergeado).
- **Lote 93 (Países Bajos)**: 19 altas escritas (ya mergeado).
- **Fredrikstad (to-do 284)**: el club es el FLI (Fredrikstad Fotballklubb). Cargados 2013-2018 desde el lote 95 (`Admin/lotes/lote-95.txt`); 2012 queda fuera (ver abajo). La Årsmøte 2025 es el FLI 2024 (ya cargado) con 2023 solo como comparativo.
- **Sarpsborg 08 (to-do 284)**: transcriptos por el pipeline los PDFs del FLI (2008, 2012, 2014-2024 y dos `wf-`). La alta sobre el FLI NO se rehízo todavía.
- **Ligas noruegas**: `no-2divisjon` (tier 3) en `data/leagues.js`; `data/club-leagues/no.js` con Fredrikstad 2012-2018; listas de la 1. divisjon 2012-2018, Tippeligaen 2012 y 2. divisjon 2018 en `tools/club-league-reference/`.
- **Compuerta de estadio** (`tools/estadio-sponsor.mjs`): `SOLO_ESTADIO` ahora incluye `no-1divisjon` y `no-2divisjon` (decisión de Guido, 2026-10-19), además de `nl-eerstedivisie`. Alias `Eindhoven` -> `fceindhoven-nl` en `alias.json` y lista de la Eerste Divisie 2021-22.
- Fredrikstad 2018: estadio a mano en `tools/contexto-manual.json` con fuente (la página de la 2. divisjon no trae tabla de estadios).

### Qué queda
- **Fredrikstad 2012**: la cola está contestada (9 casos) pero la compuerta pide sponsor (Tippeligaen no tiene la excepción). Falta un sponsor con fuente en `contexto-manual.json`. Si se pone, correr de nuevo `lote.mjs --lista Admin/lotes/lote-95.txt --ejecutar --cargar`.
- **Sarpsborg 08**: rehacer el alta sobre el FLI (`Sarpsborg 08 Fotballforening`) con sus años ya transcriptos.
- **Vålerenga (to-do 283)**: 46 PDFs sin `.md`. Siete subagentes Sonnet cortaron por el límite de uso y algunos escribieron sin ver las imágenes. Los 40 `.md` que dejaron están SIN trackear y SIN verificar: pasarlos por `node tools/pipeline.mjs --lista Admin/lotes/transcribir-valerenga.txt --max-paginas 0 --ejecutar` (valida contra el PDF) antes de usarlos; o borrarlos y transcribir con Mistral.
- Lote de las altas de los países nuevos (165 c), Bélgica (lote 92) y los demás años de los clubes nuevos: sin empezar.

### Qué deja de ser cierto en ESTADO
- Fredrikstad ya no tiene solo 2024: tiene 2013-2018 (y 2024).
- La compuerta de estadio acepta sin sponsor la Eerste Divisie, la 1. y la 2. divisjon noruegas.

## Después del primer merge de Onboarding 3 (2026-10-19)

## Sarpsborg 08 (lote 96) y vålerenga, cierre parcial (2026-10-19)

### Qué cambió
- **Sarpsborg 08 (to-do 284)**: el alta ya estaba sobre el FLI (nombre legal y 2025 del FLI). Cargados los años del FLI 2012 y 2014-2022 (10 años) con el lote 96 (`Admin/lotes/lote-96.txt`). Ligas asignadas en `data/club-leagues/no.js` verificadas contra las listas (2012 en la 1. divisjon; 2014-2025 en la Eliteserien). 2008 queda afuera: la liga no se pudo confirmar (la lista de 2008 trae a "Sarpsborg Sparta").
- Perímetro individual por documento para 2022, 2023 y 2024 (ajustes `perimetro`), igual que el 2025: la controlada es Prozo AS (negocio comercial aparte). Sin eso el club-nivel `consolidado` hacía leer el consolidado.
- Cola de Sarpsborg contestada (37 casos) con subagentes Sonnet revisados.

### Qué queda
- **Sarpsborg 08 2023 y 2024** no se cargan todavía. Dos causas, la primera es del script:
  1. **Mejora de script (para fos-pipeline):** el escalón "nota del subtotal" REEMPLAZA los 8 renglones del estado individual (Billetinntekter, Medlemsinntekter, Reklame- og sponsorinntekter, Mediainntekter, Salg/utleie spillere, Andre salgsinntekter, Andre inntekter, Tilskudd) por los 2 de la Note 1 por área (Arrangement 69,1 M + Salg/utleie spillere 134,6 M en 2024) porque la nota suma el subtotal impreso. La nota es MÁS gruesa que el estado y pierde el desglose. Debería ganar el estado cuando abre más renglones. Caso: Sarpsborg 08 2024 (L116-124 y L1517-1523 del .md) y 2022 en el consolidado. Hoy, con la nota descartada (`no_es_rubro`), quedan 134,6 M de ingresos y no cierra. Opciones: aceptar "Arrangement" como `lump_football_operations` (cierra, pierde el detalle) o esperar la mejora.
  2. **2023**: la extracción sigue leyendo el consolidado (ingresos 166,5 M y no 146,5 M) aunque el documento tiene `perimetro` individual. Hay que ver por qué el bloque individual de 2023 no se elige (el 2024 sí lo toma bien: verificación de 203,7 M).
- **Fredrikstad 2012**: falta un sponsor con fuente (Tippeligaen).
- **Vålerenga**: los 40 `.md` de los Sonnets siguen sin verificar y sin trackear.
- Altas de los países nuevos (165 c), Bélgica (lote 92), y los demás años de los clubes nuevos: sin empezar.

### Qué deja de ser cierto en ESTADO
- Sarpsborg 08 tiene 2012 y 2014-2025 menos 2023 y 2024.

## Después del merge del lote 96 (2026-10-19)

## Bélgica, lote 92 (2026-10-19)

### Qué cambió
- Lote 92 (`Admin/lotes/lote-92.txt`): 21 años belgas escritos de Beerschot, Lierse SK, Lokeren-Temse, OH Leuven y Patro Eisden (corrida con `--cargar`; commit por año). Vålerenga: los 49 PDFs quedaron con `.md` validado por `pipeline.mjs` (los `.md` de los subagentes se rehicieron y validaron).

### Qué queda (para TODO)
1. **Círculo del registro de entidades (Lommel SK 2019-2024, 6 años listos para escribir).**
   - Síntoma: `lote.mjs --cargar` no escribe esos 6 años; dice "data/entidades/ ... quedó desactualizado. Corré: node tools/entidades.mjs" aunque `node tools/entidades.mjs --check` da 0 antes de escribir.
   - Causa: `Admin/registros/entidades.jsonl` tiene para `lommelsk-be` solo una línea `carga` (2025, entidad `lommel-sk`, porque el club tiene dueño: City Football Group). Al escribir 2019-2024, el club pasa a tener ejercicios cargados sin línea `carga` y `entidades.mjs --check` falla; la auditoría posterior a la escritura (P1 `entidades-desfasado`) revierte el año.
   - Lo contrario también falla: agregar las líneas `carga` ANTES de cargar da error "lommelsk-be no tiene cargado el ejercicio 2019..." y no escribe nada. Probado a mano.
   - Fix pedido: que `entidades.mjs` acepte (o deduzca) la línea `carga` de un club con una sola entidad `club` y perímetro individual para los ejercicios que no la traen; o que `cargar-lote.mjs` agregue la línea `carga` en el mismo commit que el año. Las citas a usar: `Naam : VOETBALCLUB LOMMEL SK` en la línea 9 de cada `jaarrekening-AAAA-06-30-individual.md` (2019 y 2020 en la línea 11, 2021 -correction en la 13).
2. **Estadio y sponsor en las ligas amateur belgas (Lokeren-Temse 2022, Patro Eisden 2013, 2014 y 2015).** `estadio-sponsor.mjs` dice "falta el estadio o el sponsor ... (compuerta del to-do 273)": faltan las listas de equipos de las ligas amateur belgas de esos años (la nota de Onboarding 2, mejora u, ya lo anotaba: Patro Eisden, Lokeren-Temse, Lierse SK, RWDM antes de ascender). Ya existe la excepción "amateur" para el sponsor; falta que el año tenga liga y el estadio con fuente.
3. **Cola belga**: 26 casos; contestados por subagentes Sonnet y aplicados en el commit siguiente (si no aparece, quedan en `casos-be` del scratchpad de esta sesión).

## Sarpsborg 08 2023-2024 (lote 100, 2026-10-19)

### Qué cambió
- Con las mejoras 298 ab y ac, `lote.mjs --rehacer` rehizo Sarpsborg 08 2024 (cargado) y 2023 (con ajuste, ver abajo). El reintento normal NO rehace la extracción de un año ya verificado: para recalcular después de una mejora hace falta `--rehacer`.
- La lista se llama `Admin/lotes/lote-100.txt` (la 97 era de otra rama).

### Qué queda (para TODO), mejora de script para Pipeline
- **Financiero con el mismo signo por una reversión negativa dentro de los costos (Sarpsborg 08 2023).**
  - Caso: `Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotballforening-fli-2023.md`, estado individual L136-145. "Sum finansinntekter" 1 321 530 (L141: Annen renteinntekt 180 908 + Annen finansinntekt 1 140 622) y "Sum finanskostnader" 1 313 085 (L144: Annen rentekostnad 1 449 287 + Annen finanskostnad -136 202, una reversión negativa). "Netto finans" impreso: 8 446 (L145). Resultado impreso: 18 981 564 (L158).
  - Defecto: la carga tomó netInterest = 2.634615 (= 1 321 530 + 1 313 085, los dos con el mismo signo) en vez de restar: 1 321 530 - 1 313 085 = 8 445. Por eso el resultado dio 21,6 M contra el impreso 18,98 M y el año frenaba por `tie-out-resultado`. Es el mismo defecto que la mejora t#5 (financiero sumando con el mismo signo), con un disparador nuevo: un renglón de costo con signo negativo (reversión) dentro de "Sum finanskostnader" invierte la lectura de su signo.
  - Ajuste puesto a mano: `resultado-final = 18.981564` para `aarsregnskap-fotballforening-fli-2023.pdf` (en `Admin/registros/ajustes-manuales.jsonl`, motivo y evidencia con las líneas de arriba). Si la mejora se hace, ese ajuste se puede sacar y comprobar que el netInterest da 0.008446.

## Lote 101: demás años de Basel, Luzern, St. Gallen y Go Ahead Eagles (2026-10-19, en curso)

### Qué cambió
- `Admin/lotes/lote-101.txt` (32 documentos). Go Ahead Eagles 2023-24 se transcribió con el pipeline (no tenía `.md`).
- Ajustes: cierre al 30 de junio para Luzern 2018-19 a 2023-24; perímetro `individual` para Basel 2010 y 2013-2020 (la AG sola; ningún informe trae consolidado).
- Cola contestada por subagentes Sonnet (50 casos). Escritos: Go Ahead Eagles 2023 y 2024.

### Qué queda (para TODO)
- **Basel 2005, 2009 y 2012 (defecto de script):** la fila "Total Ertrag" entra como rubro en los `.rubros.json` y los ingresos salen exactamente 2 veces el total impreso (2007 y 2011 no la incluyen). 9 casos de la cola quedaron sin contestar por eso (ids 9f74e77, 551fd1d, 7863fd9, 275ada4, a0806ed, f2c7e18, 731c315, 1929f7a, 29ab985). En 2009 y 2012 falta además decidir dónde entra la Verlustabdeckung de 9,721 M y la Gewinnüberführung de 14 M. En 2010, 2013, 2019 y 2020 la AG tiene partidas con la Holding o el Verein debajo del resultado operativo (la de 2019 es de 18,7 M).
- **Basel 2006:** se carga la FC Basel 1893 AG, no el Verein (el Verein le traspasó el fútbol profesional ese año).
- **St. Gallen: compensación intragrupo "Entschädigung von/an FCSG Event AG":** suma ingreso y gasto en la columna combinada. La carga la cuenta como ingreso en 2018-19, 2019-20, 2021-22 y 2023-24 (9.800 en 2021-22 y 9.975 en 2023-24 a sacar a mano si la recarga no lo hace). La serie usa las dos sociedades sumadas (FC St. Gallen AG + Event AG); si el perímetro fuera solo la AG, la compensación sería un ingreso real. Decisión de perímetro pendiente.
- **Mejoras de script (de los subagentes):** la columna del año anterior invierte el signo de "Ertragsminderungen" y de "Resultaat vergoedingsommen"; suma el subtotal "Erträge netto" cuando el documento lo imprime.
- **Go Ahead Eagles 2021 y 2022:** frenan por estadio/sponsor (compuerta 273); la Eerste Divisie ya alcanza el estadio, pero falta la liga de esos años en `data/club-leagues/nl.js` (Go Ahead Eagles estuvo en la Eerste Divisie 2020-21 y 2021-22).
- **Cola del lote 101:** 102 preguntas nuevas tras la segunda corrida (16 años en verificar, 11 en categorías); sin contestar.
