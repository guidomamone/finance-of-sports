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

## Lote 101, segunda tanda (2026-10-19)

### Qué cambió
- Escritos: Luzern 2019 y 2022, Go Ahead Eagles 2021 (Eerste Divisie) y 2022 (Eredivisie; la liga de 2021-22 se verificó contra la lista, Go Ahead Eagles no estaba en la Eerste Divisie 2021-22). Ligas, listas, estadio y sponsor de esos dos años en `data/club-leagues/nl.js`, `data/contexto/nl.js` y la caché.
- La lista del lote se corrió SIN los documentos de Basel (`lote-101` filtrado en el scratchpad): ver abajo por qué. Cola de Luzern y St. Gallen contestada por Sonnets (15 casos).

### Qué queda (para TODO)
- **Basel: no cargar todavía.** Cinco años de la propuesta de carga tienen números equivocados, verificados contra los `.md`:
  - 2010: la carga leyó la tabla del Verein (L441-454) en vez de la de la AG (L719-754); ingresos 1,14 M cuando la AG da 57,54 M (igual que la columna 2010 del doc 2011). Lo mismo en 2006 (Verein pág. 14 del visor, AG pág. 20) y en 2018 (Verein L459-477 en vez de la AG L716-759: 2,63 M contra 97,72 M; la columna 2017 del doc 2018 también se leyó del Verein: 88,49 M).
  - 2016: los ingresos incluyen la "Korrektur Gewinnüberführung" de la Holding (5,27 M, L992); correcto 132,29 M. 2019: suman la Defizitgarantie de la Holding (18,7 M, L752); correcto 69,15 M.
  - 2017: los gastos salen duplicados (183,34 M; correcto 88,74 M); la fila Sonderabschreibungen es +2,93 M (L708).
  - 2014: faltan los gastos "Ausserordentliche Aufwendungen" (13,80 M, L1014).
  - 2009, 2012 y 2014 duplicaban "Total Ertrag" (corregido en la 298 ah).
  - **Decisión de Guido pendiente:** la Defizitgarantie (garantía de déficit con el Verein o la Holding) se carga como gasto dentro de Total Aufwand en 2015 y 2021 (`Admin/carga-clubes/basel-ch.md`, fila 9) pero no en 2013-2014, donde está debajo del resultado operativo. Con el mismo criterio en todos los años, el resultado de 2014 cierra exacto. Más la Verlustabdeckung de 9,721 M en 2009 y la Gewinnüberführung de 14 M en 2012.
  - Mejora de script: elegir siempre el estado de resultados de la FC Basel 1893 AG cuando el informe trae varios (Verein, AG, Stadiondienst AG); no sumar partidas de la Holding/Verein debajo del resultado operativo.
- **St. Gallen** (6 casos sin responder: "Erträge brutto" y "Direkte Kosten" 2018-19, 2021-22 y 2022-23): las cuentas individuales de FC St. Gallen AG y de la Event AG abren esos dos rubros y suman casi exacto la fila consolidada (descuadre de 4 mil en 2018-19 por el signo de las Wertberichtigungen). Pregunta: ¿se carga el desglose de las dos sociedades en vez de la fila consolidada? Fallback si no: `lump_football_operations` para ingresos y `other_expenses` para "Direkte Kosten". Compensación intragrupo "Entschädigung von/an FCSG Event AG": afuera; se sumó como ingreso en 2018-19, 2019-20, 2021-22 y 2023-24 (9.800 en 2021-22 y 9.975 en 2023-24).
- **Luzern 2018 y 2024**: frenan por estadio o sponsor (compuerta 273). **Luzern 2020 y 2023**: categorías en cola y tie-out de gastos en 2023.

## Lote 102 y Luzern (2026-10-19)

### Qué cambió
- **Lote 102 (Bélgica)**: escritos Lommel SK 2019-2024, Lierse SK 2020-2021 y Patro Eisden 2021 y 2023. Hizo falta una línea `carga-club` de `lommelsk-be` (desde 2018, hasta null, entidad `lommel-sk`, individual) en `Admin/registros/entidades.jsonl`, como indicó la principal.
- **Luzern**: escritos 2018, 2020 y 2024. Ligas `ch-superleague` para 2018, 2020, 2023 y 2024 en `data/club-leagues/ch.js` (verificadas con las listas de la Super League). Estadio y sponsor con fuente en `tools/contexto-manual.json`: 2020 sponsor Otto's (Geschäftsbericht 2019/20, "Hauptsponsor", pág. 59 del visor) y 2024 estadio Swissporarena (Geschäftsbericht 2023/24, L33; sin capacidad). Cola de Luzern 2019-20 contestada (4 casos).

### Qué queda (para TODO)
- **Luzern 2023 (2022-23)**: defecto de script con el guion largo como signo menos. El `.md` imprime los negativos con "–" (U+2013), por ejemplo "–3’102’345" (`geschaeftsbericht-2022-23.md` L1560 aprox., Unternehmenserfolg nach Minderheiten). El tie-out lee el resultado impreso como +3,102345 y la suma da –3,102346: frena por `tie-out-resultado` y por los gastos (las filas suman 31,28278 y el total impreso es 31,428929; la diferencia 0,146149 es el "Ausserordentlicher Aufwand" de la nota 34). No usar el ajuste `resultado-final`. Arreglo: tratar "–" y "−" como signo menos al leer cifras.
- **Patro Eisden 2022**: sigue frenado (ver el log del lote 102).
- **Lierse SK 2019**: frena por "periodo" (el documento cubre un período distinto de 12 meses).
- **Lokeren-Temse 2021-2022 y Patro Eisden 2013-2015**: faltan las listas de las ligas amateur belgas (298 ae/af de Pipeline).

## Onboarding 4 (2026-10-20)

### Qué cambió
- Reino Unido, lote 98: contesté los 25 casos de la cola (Leeds, Liverpool, Sunderland, Wolves) con los criterios ya decididos: "Staff costs" total va a `wages_squad` (convención ya cargada de cada club: Leeds, Liverpool, Sunderland y Wolves ya lo llevan así); las listas "stated after charging" no se cargan como desglose y los cuadros que la pregunta llama "dejar afuera" quedan afuera (Sunderland 2018-19, nota 6, duplica amortización y venta de jugadores).
- Ajuste `estado` (los escaneos sin estado de resultados): Man City 2021-22 = b2 (pág. 13 del visor) y Tottenham 2022-23 = b3 (pág. 19). Leeds 2020-21 y Liverpool 2022-23 ya se localizan en el ensayo. Falta correr con `--reintentar` (como Fulham: el lote no relocaliza solo).
- St. Gallen 2020, 2021 y 2024: "¿la TV está dentro de Diverse Erträge?": aceptar, con el precedente de 2025 (ajuste `incluye` = broadcasting, `other_income`, `--posible`), y los tres ajustes cargados. Los casos de gestión de St. Gallen no frenan (la tanda de gestiones los toma).

### Qué queda
- Corridas pedidas a la principal (comando y número de lote): lote-105 (Unión Magdalena 2025), lote-99 (alta de Celtic), Man City 2021-22 + Tottenham 2022-23 + Fulham 2021-22 con `--reintentar`, el resto del lote 98 (~US$ 4,20), y St. Gallen (2020, 2021, 2024 y los demás años) cuando haya número.
- Newcastle 2019-20 está transcripto y sin localizar: va al lote para que la cadena de cierres reconozca los 11 meses de 2020-21.

### Onboarding 4: avance (2026-10-20, tarde)
- Cargados: Unión Magdalena 2025; Celtic 2025 (alta, color #018749, liga `gb-scottishpremiership`); lote 108 del Reino Unido: Leeds 2019, 2020, 2022 y 2023, Liverpool 2022, Newcastle 2022 a 2024, Nottingham Forest 2022 y 2023, Sunderland 2019 a 2023, West Ham 2020 a 2024, Wolves 2020 a 2023 (22 años). Forest 2022 salió con el ajuste `fila` de "Other operating (expenses)/income" (-20, L423).
- Cola del lote 108 (66 casos en tres pasadas) contestada con los criterios ya decididos: Staff costs total a `wages_squad`, listas "stated after charging" afuera, cuadros de nota Turnover mal transcriptos (Leeds 2019-20) se cargan con el renglón del estado. Perfil de Leeds: sin socios y sin otros deportes.
- Frenados por script (`Admin/registros/frenados-por-script.jsonl`): Man City 2021-22, Tottenham 2022-23 y Fulham 2021-22 (298 v2, ya en main), y Newcastle 2019-20 (13 meses) y 2020-21 (11 meses) por 298 z2. Dejé ajustes `cierre` y `estado` para Man City, Tottenham, Leeds 2020-21 y Liverpool 2022-23: esperan el merge de v2.
- Gasto de la sesión: US$ 6,27 (934,18 − 927,91) de los US$ 15.
- Pendiente: St. Gallen (número de lote), otros años de Celtic, Silkeborg y Viborg 2025 (partir "Depreciation, amortisation and impairment"), Patro Eisden, Lokeren-Temse, Lierse 2019, Boyacá Chicó, Noruega (63 ejercicios) y el 238.

### Silkeborg 2025 y Viborg 2025: partición de amortización y depreciación (Onboarding 4, 2026-10-20)
- Pedido de la principal (votación 3 a 0): partir "Depreciation, amortisation and impairment" con los importes de las notas. Hecho con ajustes `fila` (una conserva el reemplazo del renglón total) y `--corregir-categoria` (player_amortisation y depreciation), `cargar.mjs --reemplazar --escribir`. Silkeborg: 12.670 = 6.502 (L602) + 6.168 (L616); Viborg: 18.375.737 = 15.751.691 (L1196) + 2.624.046 (L1225). Los totales no cambian. `cargar.mjs` pudo partir la fila: no hay frenado por script.
- Para recargar un año ya cargado con una categoría nueva, `lote.mjs` no sirve (no categoriza lo que ya está en el sitio); sirve la cola con `--corregir-categoria` y `cargar.mjs --desde-verificacion --reemplazar`.

### Onboarding 4: cierre (2026-10-20, noche)
- Cargado: Man City 2022, Tottenham 2023, Fulham 2022, Leeds 2021, Liverpool 2023 y Boyacá Chicó 2025 (lote 111); Celtic 2021 a 2024 (lote 112: estadio y sponsor en `contexto-manual.json`, liga `gb-scottishpremiership` verificada con las listas de 2020-21 a 2022-23, 2020-21 con ajustes `fila` y `resultado-final`); Newcastle 2019, 2020 (13 meses, z2) y 2021 (11 meses, con ajuste `cierre`; hizo falta transcribir 2018-19, US$ 0,23) (lote 114); Silkeborg y Viborg 2025 partidos; Viking AS 2017 a 2024 (lote 115, consolidado como el 2025); Sarpsborg 08 2008.
- Noruega, regla del club asociación y sociedad: descarté en `documentos-descartados.txt` los 8 documentos de Viking FLI 2017-2024 (la AS lleva el fútbol) y el de Sarpsborg Fotball Invest AS 2008 (la FLI lleva el fútbol: 14.930 mil NOK contra 71 mil). Los 10 `.md` de Viking que transcribió Pipeline 6 (FLI 2012, 2014, 2016, 2017, 2018, 2019, 2020, 2021, 2023 y 2024) quedaron sin usar: ninguno es de la AS. Viking FLI 2008-2016 (el club antes de la AS, un solo documento por ejercicio) no está en la lista de 63 y queda para decidir (regla punto 1: se cargaría).
- Gasto de sesión: unos US$ 12,8 de los US$ 15. No alcanza para Molde (17), Fredrikstad (10), Aalesund y Vålerenga; tampoco para el 238.
- Pendientes: Molde, Fredrikstad, Aalesund y Vålerenga (el 283); el 238 (antes, primer lote y costo a la principal); las gestiones de Viking 2017-2024, Celtic 2021 y 2022 y Sarpsborg siguen como casos de la cola (no frenan); línea del auditor de Celtic 2021-2025 y de Sarpsborg 2008 (`auditoria.mjs --pendientes`).

### Onboarding 4: Molde y Beşiktaş (2026-10-20, noche)
- Molde FLI (lote 116, la AS ya estaba descartada): cargados 2009, 2010, 2013 a 2015, 2017 a 2023. Frenados por script (anotados en `frenados-por-script.jsonl`): 2016 y 2024, "numero-no-confirmado" contestado con `corregir` (el PDF dice 7 565 164 en 2016 y 2 558 595 y 11 831 805 en 2024) pero la etapa 7 no arranca. Molde 2008 y 2011/2012 no entraron al sitio todavía: mirar `node tools/estado.mjs`. Medlemsinntekter/tilskudd (mixto, casi todo tilskudd) va a `other_income` cuando la nota no cierra; el perfil de Molde es con socios y sin otros deportes.
- Beşiktaş: la principal lo pasó a Onboarding 5; dejé solo el ajuste `fx` 1,5357 de 2006 y saqué mi `lote-117.txt` (el 117 es de ellos).
- Gasto de sesión: unos US$ 18 de los US$ 30.

### Onboarding 4: cierre final (2026-10-20)
- Molde FLI 2008 a 2023 y 2016, 2024 cargados (los 17 años con `.md`); Celtic 2021-2025: línea del auditor escrita (subagente Sonnet sin Bash, BDO LLP, sin salvedades, citas verificadas por `auditoria.mjs`). Reino Unido (261): todo lo que tenía `.md` está cargado o frenado por z2 (resuelto); Newcastle 2019-21 incluidos.
- Fredrikstad (120): no se arma lote. Después de 2018 la FLI dejó de depositar y los únicos documentos 2008-2011, 2019-2023 y 2025 son de Fredrikstad Fotballinvest AS, que "ingen ansatte" (no tiene empleados, `aarsregnskap-fotballinvest-as-2022.md` L329) y no es el club: ya estaba decidido en `Admin/carga-clubes/fredrikstad-no.md` y en `documentos-descartados.txt`.
- Viking FLI 2012, 2014, 2015, 2016 (121): no se cargan. El propio documento dice que el fútbol está en Viking Fotball ASA, que no consolida (2012 L224, 2014 L86, 2015 L85, 2016 L724): excepción 3 de la regla del club asociación y sociedad; a `documentos-descartados.txt` con cita. Viking 2008-2011 y 2013 no tienen `.md`: se dejan. Viking AS 2017-2024 ya está.
- Noruega que queda: Aalesund y Vålerenga (esperan el 283). Sarpsborg 2008 cargado.
- Gasto de sesión: unos US$ 19,5 de los US$ 30.

### Onboarding 4: el 238, solo lo gratis (2026-10-20, lote 124)
- Los 27 "Propuesta lista" de `estado.mjs` ya estaban todos en el sitio (el registro estaba viejo: los cargaron otras sesiones); no hubo nada que escribir. De los frenados: cargados OH Leuven 2020 (cola del perfil) y Rapid Wien 2024 (alta nueva: color #009150, liga `at-bundesliga` verificada con las listas 2023-24 y 2024-25, estadio y marca con fuente, sponsor `sin-fuente`, perímetro consolidado). Alianza FC, Bucaramanga, Llaneros y Lierse Kempenzonen ya estaban cargados.
- Sporting 2008-09 y 2009-10: frenados por script (el registro no se actualiza, anotado). Benfica 2014-15 pos-AG: no cierra (ingresos 180.799 de las líneas contra 101.974 impreso; resultado impreso 7.072): hay que mirarlo contra el PDF, es un caso de datos, no de script. Rapid Wien 2013 a 2023 y 2025 tienen `.md` y siguen sin cargar (un lote aparte, ~US$ 0,15 por documento).
- Gasto de la sesión: unos US$ 20 de los US$ 30.

### Onboarding 4: Rapid Wien (lote 125, 2026-10-20)
- Cargados 2013 a 2016, 2018 a 2023 y 2025 (11 años con el 2024 anterior). Estadio con fuente y sponsor `sin-fuente` en `contexto-manual.json` para todos los años (el sponsor de camiseta no tiene fuente pública en esos años); ajuste `anio` 2013 para el documento 2010-11 a 2012-13. Cola: perímetro consolidado (el informe 2022-23 dice "konsolidierte Betrachtung"), perfil sin cuotas ni otras secciones (son del Verein), categorías de la GuV de gestión.
- Rapid Wien 2017 (2016/17) frena: el resultado impreso no cierra con el cuadro (62.001 de diferencia, "Steuern aus Erträgen" +4,7 M); a `Admin/dudas-por-club.md`.
- Gasto de la sesión: unos US$ 22 de los US$ 30.

### Onboarding 4: Sporting y Vålerenga (2026-10-20, noche)
- Sporting CP 2009 y 2010 cargados (lote 126; resultado por transacciones de pases a `player_sales`).
- Vålerenga 2022 y 2023 cargados con la suma del AS y el Elite (283): los 4 documentos por el lote normal (localizar y extraer, ~US$ 0,8; los `.md` ya existían), `estado` b2 en el Elite y perímetro individual de los cuatro, ajuste `suma-con` en cada AS (transferencia 64 M en 2022 y 87,5 M en 2023, "Annen driftskostnad" del AS contra "Overføring fra samarbeidsselskap" del Elite), cuatro líneas `carga` con perímetro `suma` y su nota en `entidades.jsonl`, estadio con fuente y sponsor 2023 `sin-fuente`. Cuidado: la nota pública sale de la evidencia del ajuste; si dice ".md" el audit da P1 (`nota-publica-con-interno`): la evidencia va sin nombres de archivo.
- Aalesund: no se hizo. Hay 16 pares (AS 2008-2025 y FLI 2008-2024, sin 2018) con `.md`, pero no hay una fila de transferencia entre las dos (AS: Lønnskostnad 7,3 M; FLI 40,8 M en 2023) ni una cláusula de colaboración como la de Vålerenga: primero hay que decidir si corresponde sumar y cómo.
- Gasto de la sesión: unos US$ 24 de los US$ 30.

### Onboarding 4: Rapid Wien 2017 y Benfica 2014-15 (2026-10-20)
- Rapid Wien 2017 (2016/17) cargado: el Jahresergebnis impreso es 2.288.319 (L1556, balance L1367, texto L1733); la extracción había leído 2.226.318 (de ahí la "diferencia de 62.001"). Ajuste `resultado-final` 2288319; "Steuern aus Erträgen" (+4,72 M, impuesto diferido) va al impuesto. Sacada de `dudas-por-club.md`.
- Benfica 2014-15 pos-AG: no cierra con `fila` (la fila de gasto toma el valor absoluto, no admite reversión); frenado anotado para Pipeline.
- Gasto de la sesión: unos US$ 24 de los US$ 30.

### Onboarding 4: triage de la Auditora, 238 gratis (2026-10-20)
- Cola (`triage-cola-2026-10-20.md`, los (a)): 164 casos contestados con su nota (103 gestiones a `descartar`, AEK a wages_squad, De Graafschap a player_sales, Excelsior a netInterest, Dinamo Zagreb con "Članarine" a member_dues y el resto con la propuesta, nombres legales incluido "FC Thun AG" y "Harlequin Football Club Limited", perfiles, Porto, Tolima a `descartar`). Quedaron sin responder los que no tenían instrucción: Salernitana ×3, UC Chile ×1 y Benfica ×2. Lote 127 (los 9 documentos de esos casos): ya estaban en el sitio, nada que recargar.
- Dudas (`triage-dudas-2026-10-20.md`, los (a) firmes y los (a?) que pude confirmar contra data/): sacadas de `Admin/dudas-por-club.md` 69 preguntas en bullets (de 2.002 a unas 1.570 líneas): Argentina (cotizaciones, gestiones), Boyacá, Parma, Genoa, AEK, Inter, Olympique Lyonnais, Vålerenga, Guangzhou, los alquileres de 6 clubes, Colombia y Alemania/Inglaterra de la tanda del 2026-09-22, Brasil, Wolves (13 meses, ya cargado), Club América fx. NO toqué: los (b), los (c), los bullets mezclados, las tandas de párrafos (2026-09-25, "Tanda de 20 transcripts"), ni los (a?) que no pude confirmar.
- Gasto de la sesión: unos US$ 24 de los US$ 30.

### Onboarding 4: reglas de la Auditora, tanda 1, y Benfica 2014-15 (2026-10-20)
- Aplicado: AGF 2021 `grossDebt` 4.627 a 0 (ajuste `deuda` y `data/`); Fulham 2024 y Botafogo-SP 2024 se mantienen (la nota dice "unsecured loan" y "mútuo financeiro", evidencia en sus fichas); Mechelen 2025 "Concessies" a `depreciation` y el residuo a `other_income`; Westerlo y Antwerp sin cambio (el texto confirma que el intangible es de jugadores); tienda de Rosario Central a `sponsorship_commercial` (ajuste `categoria`; Talleres ya estaba). Leeds, Augsburg, Mallorca y las fichas de Fulham y Rosario salieron de `dudas-por-club.md`.
- Benfica 2014-15 pos-AG cargado (lote 128) con el arreglo de Pipeline, sin ajustes; el frenado anotado antes ya no aplica.
- Gasto de la sesión: unos US$ 24 de los US$ 30.

### Onboarding 4: cierre de la sesión (2026-10-20)
- **Quedó hecho:** Reino Unido (261) y Celtic 2021-25, Molde 2008-2024, Viking AS 2017-24, Sarpsborg 2008, Rapid Wien 2013-25 (con 2017), Newcastle 2019-21, Sporting 2009-10, Benfica 2015, Silkeborg y Viborg 2025 partidos, Vålerenga 2022-23 (suma AS + Elite), OH Leuven 2020, triage de la cola (164 casos) y de las dudas, y las reglas de la tanda 1 de la Auditora.
- **Queda (para una sesión nueva):** Aalesund (16 pares AS + FLI con `.md`: falta decidir si corresponde sumar, no hay fila de transferencia); Vålerenga 2008-2021 y 2024 (necesita `suma-con` por año); Fredrikstad (el AS no es el club, sin cambios); Viking FLI 2012-16 descartado; Salernitana ×3, UC Chile y Benfica sin contestar en la cola; la línea del auditor de Celtic 2021-25 está, falta la de Sarpsborg 2008, Rapid y Benfica 2015 (`node tools/auditoria.mjs --pendientes`); Godoy Cruz y Juventude siguen como párrafos en `dudas-por-club.md`; las tandas de párrafos de septiembre (los (a) que no toqué).
- **Gasto final:** unos US$ 24 de los US$ 30 (contador de `tools/gasto.mjs`: arrancó en 927,91).

### Onboarding 6: (a) que quedaban del triage (2026-10-20)
- Cola: 3 casos de AEK 2024 "Diferencia de redondeo" (0,000001 M) contestados `aceptar` (other_expenses). La cola queda en 0.
- Dudas sacadas de `dudas-por-club.md`: OH Leuven (las otras entidades NV/VZW no tienen turnover; la BV cargada es la del fútbol), Thun (el informe 2018 dice que el ejercicio pasó a año calendario en 2017: 2017 es un tramo corto 01.07-31.12 que solo existe como comparativo, no se carga) y Polissya (el EDRPOU del documento es 40372249).
- NO apliqué los demás (a?): Rosario Central (residuales a other_income/other_expenses, no a lump) y similares piden recategorizar datos cargados por consistencia (criterio cerrado); Independiente (estadio) y República Checa (pares duplicados) no se pueden confirmar sin abrir PDFs/hipótesis no confirmada. Siguen en sus secciones.
- Esperando la tanda 2 de la Auditora.

### Onboarding 6: tanda 2 de la Auditora (2026-10-20)
- Hoffenheim 2024 y 2025: `officialPAT` a la línea 14 (Konzernjahresüberschuss): +1,268 M y +1,100 M (antes -0,368 y -0,189); `tax` recalculado por diferencia (24,431 y 27,385) para que ingresos, gastos y PAT sigan cerrando. Ajustes `resultado-final` en los dos documentos (sin recarga: mismas filas).
- Gimnasia LP 2024 y 2025: `publicNote` en las dos fuentes diciendo que el documento no explica "Incremento Valor Jugadores FP" (sin decir no-cash); sigue en other_income (A GUIDO, 2 a 1). La duda queda en `dudas-por-club.md`.
- Sin cambios por voto o regla: Everton (assetSales), Pereira "Trayectoria deportiva" (wages_squad), Palmeiras, América de Cali, Botafogo nota 19, Eintracht "Transfer", Panserraikos, Groningen, Stichting (ya están como la regla dice). Rosario Central tienda: ya estaba en sponsorship_commercial.
- ASSET_V 1507. Falta la tanda 3 (Getafe y Godoy Cruz: cesión, rescisión y tanteo).
- Gasto: US$ 1,20 de 6.

### Onboarding 6: Stuttgart (2026-10-20)
- VfB Stuttgart 2023 y 2024: `officialPAT` a la línea 21 "Jahresüberschuss" (antes de los minoritarios), como Hoffenheim, Augsburg y Eintracht: 0,777 M (antes 0,679; konzernabschluss-2023.md L917) y 15,533 M (antes 15,443; 2024 L1149). `tax` recalculado por diferencia (-0,480 y -2,491). Ajustes `resultado-final` con la cita. ASSET_V 1510.
- Gimnasia LP: la `publicNote` de 2024 y 2025 ya había entrado (instrucción de la Auditora, tanda 2); la principal pide no tocarlo. Si Guido lo prefiere, se revierte quitando las dos líneas `publicNote` de `data/ar/gimnasiaesgrima-ar-data.js`.
- Gimnasia LP: `publicNote` de 2024 y 2025 sacada (pedido de la principal: el caso espera a Guido); datos como estaban. ASSET_V 1511.

### Onboarding 6: Estudiantes LP (2026-10-20)
- "Resultado por revaluación de jugadores" 2023 (291 M, Nota 16) y 2024 (4.053 M, Nota 13 = hechos posteriores: ventas pactadas tras el cierre, saldo en Jugadores destinados a la venta) pasó de `player_sales` a `other_income` (voto de la Auditora); ajustes `categoria` en los dos documentos; 2024-25 no repite la fila. `Admin/carga-clubes/estudianteslp.md` corregido. ASSET_V 1513.
- Gimnasia LP: `publicNote` repuesta en 2024 y 2025 (3 a 0, other_income como está; el documento no explica la fila). ASSET_V 1514. La "Nota 16" que cita la fila de Estudiantes 2023 no aparece como nota en el documento (solo la cita la propia fila).

### Onboarding 6: Godoy Cruz y cierre del 238 gratis (2026-10-20)
- Godoy Cruz 2020 "Ingreso por Derechos de Tanteo" (38,59 M) de `player_sales` a `other_income` (tanda 3 de la Auditora), ajuste `categoria` con cita (L164); el comparativo 2019 no está cargado. Las cesiones de Getafe no cambian nada. ASSET_V 1515.
- Cerrado el 238 en lo gratis: cola en 0 (AEK), dudas OH Leuven/Thun/Polissya fuera, tandas 2 y 3 aplicadas (Hoffenheim, Stuttgart, Estudiantes LP, Gimnasia LP, Godoy Cruz). Queda lo pagado/no aplicado: Rosario Central residuales y Independiente estadio (ver arriba), pares duplicados de Rep. Checa, Aalesund y Vålerenga 2008-21.
- Gasto: US$ 1,20 de 6, sin lote.

## Onboarding 7: to-do 337, paso 1 (medición, 2026-10-20; sin gasto)

Fuente: `node tools/faltantes-liga.mjs --print`, `data/faltantes/<liga>.js` y `Admin/registros/transcripciones-estado.jsonl`. El cruce año↔PDF
es por nombre de archivo (aprox.). Años = los de las listas de `tools/club-league-reference/`; el año 2026 (reciente) no cuenta.

### Cobertura hoy, últimas 5 temporadas (2021-2025): cargados / club-años · lo que falta por estado
| Liga | cargado | en-mano | buscado | sin-buscar | PDFs en-mano: con .md / sin .md |
|---|---|---|---|---|---|
| Premier | 74/100 | 21 | 5 | 0 | 0 / 23 |
| LaLiga (solo hay listas 2022, 2024, 2025) | 18/60 | 32 | 10 | 0 | 27 / 29 |
| Serie A | 72/100 | 1 | 27 | 0 | 0 / 2 |
| Bundesliga | 24/90 | 14 | 43 | 9 | 8 / 1 |
| Ligue 1 (SIN lista de referencia) | 0 | n/d | n/d | n/d | ver abajo |
| Brasileirão A | 46/100 | 51 | 3 | 0 | 62 / 58 |
| Primera argentina | 32/138 | 6 | 91 | 11 | 16 / 3 |
Los PDFs en-mano cuentan toda la historia de cada club en-mano, no solo 2021-25 (son los que habría que correr; hay solapes).

### Qué se ve
- Todo lo "en-mano" sin `.md` (Premier 23, LaLiga 29, Brasil 58, Argentina 3, Bundesliga 1, Serie A 2 = ~116 PDFs) es lo que gasta Mistral.
- Premier, Serie A y Brasil: casi todo lo faltante ya está bajado. Serie A, Bundesliga y Argentina: lo faltante es sobre todo "buscado" (se buscó y no apareció): ahí el techo lo pone el sourcing, no la plata.
- Ligue 1: ningún club cargado ni lista `fr.json`. Los 18 de 2025/26 salen de los DNCG "comptes individuels" (un PDF por temporada con todos los clubes, ya transcriptos a `.md` en `Clubes/Francia/_DNCG-Agregado-Liga/`) y OL tiene sus `.md`. Cargarlos pide un criterio (un agregado de liga como fuente oficial, y el perímetro): a la Auditora/Guido, antes de gastar.
- Las listas de equipos no cubren todos los años (LaLiga 2019-21 y 2023, Brasil 2011/16/19, Bundesliga antes de 2021): completarlas es de la sesión de pipeline (gratis).

### Umbral propuesto
«Bien cargada» = cada club de las últimas 5 temporadas completas (2021-2025) con balance cargado, y para los que no, una constancia de sourcing
`buscado`/`cerrado` con motivo (ej.: no publica). Meta numérica: ≥90% de los club-años de 2021-25 cargados o cerrados con motivo en Premier, LaLiga, Serie A, Bundesliga, Ligue 1 y Brasil; Argentina ≥60% (techo por falta de publicación). Alternativa: 80% de 10 temporadas (más caro: el sourcing de 2011-2020 es casi todo "buscado").

### Presupuesto propuesto (API; Mistral ~US$0,2 por PDF sin `.md`, localizar+extraer+categorizar ~US$0,3 por PDF; cifras de `estado.mjs`)
Premier ~25 · LaLiga ~30 · Serie A ~5 · Bundesliga ~10 · Brasil ~60 · Argentina ~10 · Ligue 1 ~20 (si se aprueba el criterio) = ~US$160, con margen. Primero los que ya tienen `.md` (más barato), ensayo gratis (`pipeline.mjs --max-paginas 0`) antes de cada corrida para fijar el costo exacto por liga.

## Pipeline 11: to-do 339, inventario (2026-10-20)

### Qué cambió
- `Admin/mediciones/339-inventario.md`: todo lo que asume fútbol en tools/, prompts, skills y audit.js (38 puntos), con archivo y línea, de dónde leería el deporte y cuánto trabajo es. Solo lectura: no se tocó ninguna tool.

### Qué queda
- Paso 2 del 339 (después de la migración del 248, Datos 4): `tools/deporte-club.mjs` + lista de categorías y ejemplos por deporte en Jev y `categorizar-claude.mjs`, luego las compuertas de `cargar.mjs`. Las condiciones nuevas (filtro de ejemplos, `CATEGORÍA (prompt, deporte)`, tabla de ceros por deporte, sin deporte = pregunta) se muestran a Guido antes de codear.
- Dudas para Datos 4 en la sección 6 del inventario (cómo leen las tools la taxonomía; descripciones de las subcategorías de rugby; si habrá bolsón).

### Qué deja de ser cierto
- Nada en ESTADO. En el TODO, el 339 queda con el paso 1 hecho.

## Pipeline 11: to-do 339, las 4 condiciones codeadas (2026-10-20)

### Qué cambió (para CHANGELOG)
- `tools/deporte-club.mjs` (nuevo): deporte del club, categorías de su taxonomía, tabla de ceros por deporte (`CEROS_POR_DEPORTE`, rugby `[]`); `node tools/deporte-club.mjs` la chequea.
- Jev y `categorizar-claude.mjs`: lista de categorías, texto del prompt y esquema por deporte; filtro de ejemplos contra la unión ingreso+gasto del deporte; ejemplos del mismo deporte antes que el país. `cargar.mjs`: `ladoDeCat` y la validación salen de la taxonomía del club; `cola.mjs --corregir-categoria` también.
- `CATEGORÍA (prompt, <deporte>)` en CONVENCIONES-DATOS (validador de deporte e ids en `reglas-categoria.mjs`); las reglas de la tienda y del CVC se reescribieron sin ids de otro deporte (el prompt de fútbol cambia en esas dos frases).
- Tabla de ceros única (`cargar.mjs`: aviso y reintento, preguntas de perfil, `cero-real`; `verificar.mjs`: `LADO_CERO`); `audit.js` `deporte-sin-tabla` (P2). Alta: deporte por ficha, liga, menciones; sin respuesta pregunta; `cargar.mjs` y `alta-club.mjs` ya no suponen fútbol.
- Medido en fútbol: pedidos a Jev (1.000 en dos configuraciones) y a Claude (80) byte por byte iguales; `medir-cargar` (334 docs) y `medir-verificar` (62) sin diferencias; `audit.js` P0 0 · P1 0; altas de 45 carpetas: 44 idénticas.

### Qué queda
- Las 31 carpetas sin mención de fútbol: no todas salen por la liga. De las que darían alta, 5 (All Boys, Toros de Córdoba, Athens Kallithea, RKC Waalwijk, Baník Ostrava) quedan en `pregunta` de deporte; las demás salen por la liga o por la ficha (Corea, Estonia, Chequia). Decide la principal/Auditora 4.
- Texto de los prompts de `localizar`, `extraer`, `perimetro-senales`, `caja-deuda`, `glosar-rubros` («clubes de fútbol»); `caja-deuda --personal --partir` crea `wages_squad`; `dentro-de-otro.mjs` (bolsón `lump_football`); `generate-club-pages.js` (JSON-LD `Soccer`); lista de deportes de `alta-claude.mjs`; `estadio-sponsor.mjs` para rugby; ligas de referencia de rugby. Skills: una frase en `club-data-mapping` (criterios del fútbol) con el texto a Guido antes.
- Criterios de rugby en `categorizar-claude.mjs` (CRITERIOS) y descripciones de las subcategorías de rugby: contenido de Datos 4 / Bath.
- Con Bath: `EJEMPLO-CATEGORÍA` de las dos reglas de Bath cuando `bath-gb` esté en `data/clubs.js`; el taxonomy `rugby-1` en `SPORT_TAXONOMIES` hace que `deporte-club.mjs` lo vea solo.

### Qué deja de ser cierto en ESTADO
- Nada del sitio. Las tools categorizan por el deporte del club (ver PIPELINE.md, «El pipeline sabe el deporte»).

## Pipeline 11: 339 (a) y (b), y (c) para la Auditora (2026-10-20)

### Qué cambió (para CHANGELOG)
- (a) Jev y `categorizar-claude.mjs` leen la lista con descripción de la taxonomía del deporte del club (`leerCategorias` de `tools/deporte-club.mjs`, de las listas que nombra `SPORT_TAXONOMIES[deporte].lists`): rugby ve las descripciones de `RUGBY_*`. Fútbol idéntico (500 pedidos a Jev, 80 a Claude).
- (b) El bolsón «sin desglosar» sale de `SPORT_TAXONOMIES[deporte].lump` (`cargar.mjs` `sinDesglose`, `dentro-de-otro.mjs`). `medir-cargar` (334) sin diferencias.

### Qué queda
- (c) Condición nueva de la coma decimal (`Admin/mediciones/339-condicion-coma.md`, medida: 4 filas en 3.677 `.md`, 2 de Bath y 2 de Everton): falta el veredicto de la Auditora antes de codear. Las 2 filas de Everton, a revisar con Datos 4.
- Lo de la lista anterior (textos de prompts de lectura, JSON-LD, `estadio-sponsor` de rugby, frase de la skill).

### Qué deja de ser cierto en ESTADO
- Nada.

## Pipeline 11: 339, cierre (2026-10-21)

### Qué cambió (para CHANGELOG)
- El pipeline sabe el deporte: `tools/deporte-club.mjs` (ficha, registro de altas, taxonomía, bolsón, sueldos, tabla de ceros). Sin deporte una tool se detiene; nunca categoriza como fútbol. `alta-club.mjs` guarda `sport` en `altas-club.jsonl`; `lote.mjs` corre alta-club (gratis) antes de Jev y Claude, también en `--sin-api`.
- Frenos de Bath: `verificar.mjs` prueba el ajuste `desglose` antes de `cerrarNota`; Jev `--desde-sesion` y `cargar.mjs` leen la taxonomía del deporte; `--personal --partir` usa la categoría de sueldos del deporte; `audit.js` por deporte (categorías, sonda de gastos, taxonomía, sueldos) y `pruebaDeDeporte` (club de muestra por deporte → P1 `deporte-muestra`).
- `audit.js` avisa `coma-comida` (P2) por la coma que el OCR se come en tablas en M; `alta-club` no duplica la línea de `club-leagues`; `worktree.mjs preparar` enlaza `tools/node_modules` (y `.gitignore` sin la barra final).
- `Admin/PIPELINE.md`: sección «Un deporte nuevo».

### Qué queda
- Después del merge: correr `node tools/alta-club.mjs --todos` en main y commitear `Admin/registros/altas-club.jsonl` (se regenera con `sport`).
- Textos de los prompts de lectura que dicen «clubes de fútbol» (`localizar`, `extraer`, `perimetro-senales`, `caja-deuda`, `glosar-rubros`), JSON-LD `Soccer` de `generate-club-pages.js`, `estadio-sponsor.mjs` para rugby, la frase de la skill `club-data-mapping` (el texto va a Guido antes).

### Qué deja de ser cierto en ESTADO
- Nada del sitio.

## Pipeline 11: frenos de Bath, cierre de la sesión (2026-10-21)

### Qué cambió (para CHANGELOG)
- Tanda 1, mergeada: #10 `lote --sin-api` valida si es gratis o frena diciendo el costo, y `validar-bloques --ejecutar` encadena `verificar --rubros` e inventario (`4cbc581329`); #15 `alta-club --deshacer <club> [--escribir]` (`b1039b4d0f`); #7 `mistral-ocr-transcribe --pagina N` (`879e1f9dc8`); #13 `tools/publicar.mjs` (`5acb97b07b`).
- Tanda 2, commiteada y aprobada por Auditora 4, falta el merge: #17 y #16 en `caja-deuda.mjs` (`a0a04213c9`: escalón 1b de `escalaDe`, y el total sin rótulo como candidata de `--personal`); #8 `armar-a-mano` con etiqueta sintética para un subtotal sin rótulo (`56e4bb26a4`); #9a `ajustes.mjs --etiqueta-diferencia` (`3c3ab4de47`); #12 `tools/fuente.mjs` (`51c9816819`).

### Qué falta
- **#9b** (que el pipeline proponga solo la fila de redondeo cuando una nota cierra por redondeo): no se hace en tool. Dónde va esa diferencia es un criterio de datos (Bath: `other_income`); si hace falta un aviso en `verificar.mjs`, se diseña aparte.
- **#14** (activar un deporte invalida reglas de fútbol): `reglas-categoria.mjs` y `audit.js` (`regla-categoria-invalida`) ya marcan las reglas con ids de otro deporte; lo que falta es el aviso en el momento de activar, que depende de #5.
- **#5** (el alta propone la liga y el deporte nuevos): `alta-club.mjs` solo pregunta. Hay que decidir de qué fuente salen el nombre, el nivel y el país de la liga (Wikipedia, el propio documento), qué se escribe en `data/leagues.js` (`SPORTS` active, `LEAGUES`) y en `data/club-leagues/<iso>.js`, y quién aprueba activar un deporte (es de producto). Con eso, el alta corre `reglas-categoria.mjs` con el deporte ya activo y lista las reglas que quedan inválidas (#14).
- **#11** (estadio y sponsor de rugby): `estadio-sponsor.mjs` solo lee infoboxes y páginas de temporada de fútbol (`FICHA_CLUB`, `SOLO_ESTADIO`). Para rugby hay que leer `Infobox rugby team` y la página de temporada de la liga de rugby; mientras, a mano en `tools/contexto-manual.json`, con fuente.
- Las anteriores del 339 siguen: textos de los prompts de lectura que dicen «clubes de fútbol» (`localizar`, `extraer`, `perimetro-senales`, `caja-deuda`, `glosar-rubros`), JSON-LD `Soccer` de `generate-club-pages.js`, la frase de `club-data-mapping`.

### Cómo se probó, y trampas
- Todo con el estado de Bath de main en un worktree descartable: `git worktree add --detach <carpeta> main`, `node tools/worktree.mjs preparar <carpeta>` y correr las tools de esa carpeta; después `git worktree remove --force`.
- `cargar.mjs` recorta `process.argv` al importarse: una tool que lo importa lee sus flags ANTES (import dinámico), como `publicar.mjs`. Un `--ensayo` mal ubicado publicó de verdad una vez (revertido).
- Sin ejercitar con un documento real: la rama «frena por costo» de `lote --sin-api` (#10); `alta-club --deshacer` con un país nuevo.

### Texto propuesto para la skill de arranque, sección 5 (Guido lo aprueba antes)
Reemplazar, en «SI TOCASTE DATOS DE UN CLUB, HAY ARCHIVOS GENERADOS QUE REGENERAR», el bloque de los cuatro generadores y el párrafo que sigue a «La fuente de un club es su JSON» por:

> Si cargaste o corregiste a mano: `node tools/publicar.mjs`. Genera el data file desde el JSON (`generar-data.mjs`), sube `ASSET_V` una vez, corre los generadores (índice de clubes, fuentes, rankings, páginas de club y liga) y `audit.js`; si `audit.js` da P0 o P1 revierte lo que hizo él, no tu edición a mano. `--ensayo` dice qué haría sin escribir. `cargar.mjs --escribir`, `alta-club.mjs` y `lote.mjs --cargar` ya lo hacen solos: ahí no lo repitas. Una fuente (título, url, nota pública) se edita con `node tools/fuente.mjs` y después se publica.

La frase «Y si subiste `ASSET_V` … hay que correr `generate-fuentes-page.js` y `generate-club-pages.js` igual» se reemplaza por: «`publicar.mjs` ya regenera las páginas de fuentes y `club/` con el `ASSET_V` nuevo».

### Qué deja de ser cierto en ESTADO
- Nada del sitio.

## Pipeline 12: to-do 341, #11, prompts por deporte, y diseño de #5 y #14 (2026-10-21)

### Qué cambió (para CHANGELOG)
- #11 `estadio-sponsor.mjs`: la tabla de camisetas de la página del club se acepta con la ficha de su deporte (`Infobox rugby team` para rugby; el fútbol sigue con la suya). La página de temporada de una liga de rugby ya daba estadio, capacidad y marca sin tocar el lector. El sponsor de rugby no sale de Wikipedia: sigue a mano.
- Los prompts de lectura (`localizar`, `extraer`, `perimetro-senales`, `caja-deuda`, `glosar-rubros`) dicen el deporte del club (`deporteDePdf`, `deporteEnFrase` en `deporte-club.mjs`). Con el fútbol, byte por byte igual.
- `lote.mjs` corre el alta gratis (que calcula el deporte de un club nuevo) antes de la primera lectura, no después; `olvidarDeportes()` refresca la caché del deporte en el mismo proceso. Pedido de la Auditora 4: sin esto, un club nuevo de fútbol leía con «club de deporte».
- `audit.js`: P1 `index-file-roto` (ninguna etiqueta `<base>` ni `src`/`href` propio con «/» en los .html de la raíz). Estado según el commit; ver abajo.

### Qué falta
- `SOLO_ESTADIO` para `gb-premiershiprugby`: la Auditora 4 recomienda NO sumarla (aflojaría la compuerta por un club de prueba cuyo sponsor ya va a mano con fuente). Para otra liga de rugby sin fuente del sponsor pasa lo mismo; lo decide Guido si aparece.
- «El negocio del fútbol del club» de las preguntas de perímetro (`perimetro-senales.mjs`, `PREGUNTA` y A3) quedó con «fútbol»: es el criterio de `CONVENCIONES-DATOS.md`; si se generaliza al deporte, lo decide la Auditora.
- #5 y #14: abajo, el diseño. Sin codear.

### Diseño de #5 y #14 (propuesta; Guido decide quién aprueba activar un deporte)

**Qué hace hoy el alta** (`alta-club.mjs`): propone la liga de un club solo si ya está en `LEAGUES` (`data/leagues.js`); si la caché de rosters la ubica en una liga que no está en el catálogo, la fila va en `null`, `pendiente`, con la pregunta «¿se agrega al catálogo?». El deporte sale de la ficha, de la liga o de las menciones del `.md`; si no, pregunta. Nada escribe `SPORTS` ni `LEAGUES`.

**Propuesta: un paso «catálogo» en el alta**, una sola vez por liga y por deporte, que PROPONE (no escribe sin ok) y deja la propuesta en la evidencia del club (`Admin/carga-clubes/<id>.md`) y en la cola:

1. De dónde sale cada dato de la liga (todo de Wikipedia en inglés, por la API, wikitext crudo, como `fetch-club-league-reference.mjs`; sin IA):
   - **Nombre (`name`, `full`)**: el título de la página de temporada sin la temporada y sin sponsor (Wikipedia titula sin sponsor: «2023–24 Premiership Rugby» da «Premiership Rugby»; el campo `name` del infobox de la liga confirma). Es el mismo título que ya guarda `fetch-club-league-reference.mjs` (`wikipediaPage`).
   - **País**: `countries`/`country` del infobox de la temporada o de la liga, mapeado a `COUNTRIES` (GB es «Inglaterra» en el catálogo). Si el país no está en `COUNTRIES`, ya existe el camino de país nuevo del alta.
   - **Nivel (`tier`)**: `level` del infobox de la liga cuando lo trae (rugby inglés: «Level 1»). El fútbol no lo trae: se deduce de la cadena `promotion` (sin `promotion` = 1; si no, 1 + el nivel de esa liga, en el mismo país). Si ninguno responde, o la cadena sale de la lista del país, **pregunta** (no se inventa un nivel).
   - **Deporte de la liga**: el campo `sport` del infobox de la liga o de la temporada («Rugby union» → `rugby`); si no es un deporte conocido de `SPORTS`, es la propuesta de deporte nuevo (punto 3).
   - **Id**: `<iso2>-<slug>` del escalón (regla de `ARQUITECTURA.md`), con el slug del nombre sin espacios.
2. Qué se escribe, en este orden, solo al aprobar:
   - `data/leagues.js`: la línea de `LEAGUES` (`{ name, full, country, sport, tier }`); si el deporte ya estaba, nada más.
   - `tools/club-league-reference/<iso2>.json`: las temporadas de la liga que usan los ejercicios del club (`fetch-club-league-reference.mjs`, ya existe). Es lo que hoy impide que `estadio-sponsor.mjs` y `faltantes-liga` encuentren la liga.
   - `data/club-leagues/<iso2>.js`: las filas (club, ejercicio) → liga que hoy quedan en `null` por `liga-no-catalogada`, ya con el criterio de cierre que usa `proponerLiga`.
   - `data/rankings/<id>.js` y las páginas `liga/` salen solas de `publicar.mjs`.
3. **Deporte nuevo** (`SPORTS` con `active:false` o ausente): además, `active:true`, y se exige antes que existan la taxonomía en `SPORT_TAXONOMIES` (con su bolsón), la clave en `CEROS_POR_DEPORTE` (`[]` vale) y un club de prueba cargado de punta a punta; es lo que chequea `node tools/deporte-club.mjs`. Sin eso el paso no propone activar: dice qué falta.
4. **Cuándo se avisan las reglas inválidas (#14)**: ANTES de escribir `active:true`, el paso corre `reglas-categoria.mjs` como si el deporte ya estuviera activo (la validación «todo id de la frase tiene que existir en cada deporte activo» con el deporte candidato agregado) y pone en la propuesta la lista exacta: cada regla `CATEGORÍA (prompt)` sin deporte que nombra una subcategoría que el deporte nuevo no tiene, con su línea de `CONVENCIONES-DATOS.md`. La salida de la propuesta lleva tres cosas: reglas válidas, reglas inválidas (hay que acotarlas con `CATEGORÍA (prompt, futbol)` o reescribirlas con ids genéricos) y reglas que solo mencionan genéricas. No se escribe `active:true` mientras haya una inválida; `audit.js` (`regla-categoria-invalida`) queda como red de seguridad si alguien activa a mano.
5. **Qué decide quién**: propongo que (a) agregar una **liga** a un deporte ya activo (datos de Wikipedia, reversible) lo apruebe la Auditora, con la propuesta de arriba, y (b) **activar un deporte** (aparece en el selector del sitio: es producto) lo apruebe Guido, con una hoja de una pantalla: el deporte, la liga, la taxonomía y su versión, los clubes de prueba cargados, y la lista de reglas inválidas del punto 4. Recomendación: sí a las dos; Guido solo ve (b), una vez por deporte.

**Lo que no se resuelve acá** (preguntas abiertas, para Guido): si un deporte nuevo sin ninguna liga en el catálogo puede activarse con la liga de un solo club; y si el `tier` de rugby sigue la pirámide inglesa de rugby (Level 1 = Premiership) o la comparabilidad entre deportes no se promete.

## Pipeline 12: to-do 341 codeado y 343 propuesta (2026-10-21)

### Qué cambió (para CHANGELOG)
- 341 (#5 y #14): `tools/catalogo-liga.mjs --liga <id>` propone la entrada de `LEAGUES` (nombre, país, deporte, escalón desde Wikipedia en inglés, sin IA) y, para un deporte nuevo, lo que falta para activarlo (taxonomía, `CEROS_POR_DEPORTE`, un club, reglas de categoría inválidas con el deporte ya activo: `validarReglasPrompt` en `reglas-categoria.mjs`). `--escribir` exige `--full` y `--name` dados por quien aprueba y una aprobación verificable (`--aprobado-ref` y, para activar un deporte, `--deporte-ref`: líneas de `Admin/registros/auditoria-proceso.jsonl`). Medido sobre las 63 ligas del catálogo con caché: deporte igual en 60, escalón en 59; las demás preguntan. `alta-club.mjs` apunta a la tool en la nota de la liga pendiente.
- `audit.js` `checkComaComida` no se cae con un enlace roto de worktree (5bec638265).
- 343: propuesta `Admin/propuestas/343-busqueda-sponsor.md` con los cambios de la Auditora 4 (legacy congelado en `tools/sponsor-legacy.json`, `archivo-web` cuenta). Sin codear: espera el ok de Guido al texto de la skill.

### Qué falta
- 343 codeado (compuerta, `sponsor-legacy.json`, `audit.js`) cuando Guido apruebe el texto.
- 237 al (anexo UEFA que abre las ventas).

### Qué deja de ser cierto en ESTADO
- Una liga o un deporte nuevo ya no se agrega a mano a `data/leagues.js`: `catalogo-liga.mjs`.

## Pipeline 12: 343 codeado y 237 al (2026-10-21)

### Qué cambió (para CHANGELOG)
- 343: la sección 0.5 de `club-sourcing` (buscar el sponsor con evidencia, texto aprobado por Guido); `tools/sponsor-busqueda.js` y la compuerta de `estadio-sponsor.mjs`: un sponsor sin fuente solo cuenta con el registro de búsqueda (tres clases sin contar Wikipedia) o `legacy` de `tools/sponsor-legacy.json` (26 años de 8 clubes, congelada); `audit.js` P1 `sponsor-sin-busqueda` y `sponsor-legacy-fuera-de-lista`, P3 `sponsor-sin-registro`. Medido: 0 años frenados fuera de legacy, `data/` igual.
- 237 al: `tools/cuadro-sobrante.mjs`, llamado por `extraer.mjs` tras la respuesta del modelo: un cuadro que localizar eligió y extraer no usó abre un renglón del estado cuando una sección suma exacto (≥ 3 filas, desde 1.000 unidades, reparto único, más fino, una sola columna). Solo extracciones nuevas; un año cargado se salta y dice qué habría reemplazado. Casos: Mafra 2023-24 (Vendas e serviços prestados en 6 filas), AS Roma 2009 (e) Altri proventi en 10). Control de falsos positivos: 0 de 15.826 ensayos (la primera versión dio 1 de 4.947 por una cifra chica y 1 de 15.826 por dos filas; de ahí los mínimos). `verificar.mjs` de Mafra sin los ajustes manuales: rubros de bilheteira, patrocínios, televisión, merchandising y UEFA; AS Roma 2009 igual (OK, mismos totales).

### Qué falta
- Que Guido vea la línea de la skill de arranque `club-or-year-onboarding` (sección 6, «Compuerta de estadio y sponsor»): sumar que el sponsor sin fuente pide el registro de `club-sourcing` 0.5.
- Sporting 2002-2007 (cuadro que redondea por fila) y Portimonense 2024-25 siguen a mano.

### Qué deja de ser cierto en ESTADO
- Un sponsor sin fuente ya no se resuelve con un texto: pide el registro de búsqueda.
- Un anexo con otra estructura puede abrir un renglón (Mafra) en extracciones nuevas.


## Traspaso del lote 130 a Onboarding 8 (2026-10-21, Pipeline 12)

Pedido de Guido: las cargas las hace Onboarding. El lote 130 (to-do 345, documentos en mano sin cargar de la cola del chequeo) corrió hasta el final con `--ejecutar --cargar` y quedó acá. Lista: `Admin/lotes/lote-130.txt` (y `lote-130-transcribir.txt`, la etapa 2). Gasto hasta ahora: US$ 1,25 de transcripción (Chapecoense 2019 fue el caro, US$ 0,92) + US$ 2,04 de localizar y extraer = US$ 3,29; la categorización no está contada (`node tools/gasto.mjs`). Con Girona el lote queda en unos US$ 5,50 (Guido aprobó pasar de US$ 5: «hacé Girona»).

### Qué quedó escrito
- **SønderjyskE 2024**: alta y año cargados (`50a03eecb`). El 2022-23 de transición (`aarsrapport-2022-2023-09-30-transicion`) quedó afuera a propósito (un alta lleva un solo ejercicio primero): va ahora, con la cola del 2024 contestada.

### Qué hay transcripto y qué falta
- Transcripto en este lote (etapa 2 hecha): Chapecoense 2019 (RESERVA: solo Claude validó las págs 28, 32, 37, 40 y 44: cerrar con la suma al onboardear), Sarpsborg 08 2009-2011, Omonia 29 Maiou 2024 (3 págs).
- Convertidos del XHTML danés con `tools/xhtml-aarsrapport.mjs` (`.md` + `.pdf` de ancla de Chrome, motor «xhtml-ixbrl (determinista)»): Fredericia 2025, FC København 2025, Nordsjælland 2025, Vejle 2025, Brøndby 2021, SønderjyskE 2022-23 (transición) y 2024. Los 47 XHTML de `Clubes/Dinamarca/` se convierten igual cuando alguien pida cargarlos: `node tools/xhtml-aarsrapport.mjs "<xhtml>|<carpeta>" --escribir`. Hvidovre 2025 no pasa la compuerta (hechos visibles sin su cifra) y el consolidado PSE de København 2025 tampoco (ubica el 12 % de las líneas: ver pendientes de Pipeline).
- **Falta transcribir**: Girona FC 2020-21, 2021-22 y 2022-23 (`Clubes/España/Girona FC/cuentas-anuales-AAAA-AAAA.pdf`, 150, 157 y 156 págs, ~US$ 4: `node tools/pipeline.mjs --lista <lista con los 3> --max-paginas 0 --limit 0 --ejecutar`, dentro del presupuesto que aprobó Guido) y re-transcribir las 2 páginas escaneadas de RAAL La Louvière 2020 (`jaarrekening-2020-06-30-individual.pdf`: `lote.mjs --reintentar` con una lista de solo ese documento).

### Dónde quedó cada documento (según la salida del lote)
- Sin estado de resultados («queda como fuente»): Fredrikstad 2021 y 2023, Sarpsborg 08 2009 y 2010. Miralos antes de insistir (¿el `.md` trae el resultado en otra parte, o el PDF es otro documento?).
- Cola de sumas (etapa 6, `node tools/cola.mjs`): Chapecoense 2019 (4 casos; el total de gastos suma 121.969 y el impreso dice 100.448), Emmen 2020-21 (1), Fredericia 2021 (1), 2022 (2), 2023 (3), 2024 (1) y 2025 (1), Fredrikstad 2019 (4) y 2022 (1), Vålerenga 2024 (3), Nordsjælland 2025 (1), Vejle 2025 (2).
- Cola de categorías o perfil (etapa 7): Emmen 2019-20 (1 fila), Omonia 2024 (11), Brøndby 2021 (6), Sarpsborg 2011 y København 2025 («Cuotas sociales» en 0, el perfil del club no dice si tiene socios).
- Reintento: Fredrikstad 2020 (salarios del plantel en 0).
- Sin verificar todavía (corren con el lote siguiente): Fredrikstad 2021 y 2023, Sarpsborg 2009 y 2010, RAAL 2020.
- Fredericia 2021-24 y Emmen 2019-20 y 2020-21: los cierres están fijados con cita del `.md` (`ajustes-manuales.jsonl`); Vålerenga 2024 tiene perímetro individual (el club es Vålerenga Fotball AS, como el 2025 cargado); los cinco XHTML daneses nuevos tienen su cierre.

### Lo que no entra y por qué
- **Genoa 2024** (`Genoa-bilancio-30.06.2024-individual.pdf`): está en `Admin/registros/documentos-parciales.txt` (cubre 01-01 a 30-06-2024; falta 01-07 a 31-12-2023 y el 2023 cargado es el año calendario completo, no sirve de tramo). No se carga sin el otro tramo.
- **Lierse Kempenzonen 2022** (`jaarrekening-2022-06-30-individual.pdf`): está en `Admin/registros/documentos-descartados.txt`.

### Pendiente de Pipeline (no de Onboarding)
- El consolidado PSE de København 2025 (`aarsrapport-2025-12-31-PSE-consolidado.xhtml`, y los PSE 2021-24) no pasa la compuerta (b) de `xhtml-aarsrapport.mjs`: 7.865 líneas, 164 páginas de PDF, 12 % de las líneas ubicadas (informe de diseño con texto en cajas). Si hace falta cargarlo, hay que mejorar la alineación de páginas.
- Hvidovre 2025 (cifras sin separadores): la compuerta (a) lo rechaza; si hace falta, mirar por qué esos 93 hechos no salen en el `.md`.
- Seguimiento posible (no condición, de la Auditora 4): usar los hechos iXBRL (valor, escala y signo estructurados) como total oficial independiente en el tie-out.

### Qué cambió (para CHANGELOG)
- `tools/xhtml-aarsrapport.mjs` (nuevo, aprobado por la Auditora 4), `inventario-transcripciones.mjs` lee el motor «xhtml-ixbrl (determinista)»; `Admin/PIPELINE.md`, sección «Dinamarca: los informes en XHTML».
- Lote 130: transcripciones, cierres, perímetro y un año cargado (SønderjyskE 2024).

### Qué deja de ser cierto en ESTADO
- Los XHTML daneses ya tienen camino de entrada (`xhtml-aarsrapport.mjs`); antes ninguna tool los leía.


## Lote 130, 131 y 132 (2026-10-21, Onboarding 8)

### Qué cambió (para CHANGELOG)
- **Cargados (un commit cada uno):** Brøndby 2021, FC København 2025, FC Fredericia 2021-25, FC Emmen 2020-21, Chapecoense 2019, Vålerenga 2024, Girona 2022 y 2023, FC Nordsjælland 2025, Vejle 2025 y Goiás 2020.
- **Transcripciones del lote 131** (US$ 5,93): Girona 2020-23, Goiás 2018-20, Novorizontino 2012, Fiorentina 2020 (período de 6 meses).
- **Ligas** (`data/club-leagues/`): Girona 2021-23, Fredericia 2021-24, Emmen 2020-21, Chapecoense 2019, Vålerenga 2024 (jugó la 1. divisjon, no la Eliteserien). **Burnley 2022 y 2023 estaban al revés** (2022 Premier League, 2023 Championship): commit `b31c982c59` con trailer `Corrige:`.
- Estadio y sponsor de esos años a mano en `tools/contexto-manual.json`, con la página de la temporada de Wikipedia como fuente.
- **Descartados** (`documentos-descartados.txt`, decisión de la Auditora 5, perímetro excepción 3): Fredrikstad Fotballinvest AS 2019-23 y Sarpsborg Fotball Invest AS 2009-11, tenedoras de derechos de jugadores, no el club.
- Nordsjælland 2025 y Vejle 2025: la línea de amortizaciones se partió por las notas con ajustes `fila` (Nordsjælland: 19.889.197 derechos, 2.320.184 materiales, 13.511.776 de baja de derechos en `other_amortisation`, como el residuo de su 2024).
- Girona 2022-23: «Resultados por enajenaciones y otras» entra como línea (`player_sales` si es positivo, gasto si es negativo), no en `financial.profit_on_player_sales` como Girona 2020 y 2025 (`cargar.mjs` deja ese campo en 0).

### Gasto
Unos US$ 12,3 en total contando los US$ 3,29 de Pipeline 12: pasé el tope de US$ 12 por unos centavos en el lote 132. No gasté más.

### Qué queda (para TODO)
- **Girona 2021** (`cuentas-anuales-2020-2021.pdf`): lista para cargar salvo el sponsor de camiseta de 2020-21 (la compuerta lo frena). Wikipedia no lo trae y el kit archive da 403: hace falta el registro de búsqueda (club-sourcing 0.5) o un dato con fuente. Hay una inconsistencia de serie para revisar: Girona 2020 y 2025 llevan el resultado por enajenaciones en `financial.profit_on_player_sales`; 2021-23 lo llevan como línea.
- **Goiás 2018 y 2019** (cola: «INSS direitos de transmissões» y «Amortização de custo de cessão de direitos») y reintento de 2018 (Otras secciones deportivas en 0); **Fiorentina 2020** (1 caso de suma); **Novorizontino 2012** y **RAAL 2020** (sin estado de resultados en la transcripción; RAAL pide re-transcribir 2 páginas). Lista: `Admin/lotes/lote-132.txt`.
- **Omonia 2024**: es un alta (`alta-club.mjs`); falta su reintento («Televisión» en 0) y la gestión en `data/gestiones/cy.js` (quién presidió el ALS Omonoia 29 Maiou entre 2023-06-01 y 2024-05-31; el documento no lo dice). Cola de categorías ya contestada.
- **SønderjyskE 2022-23** (transición) y **Hvidovre 2025** no se cargaron; FC København 2025 (individual) ya está. Los demás XHTML daneses no se tocaron.
- **Fuente de los años XHTML** (`node tools/fuente.mjs --url`, pedido de la Auditora): Fredericia, København, Nordsjælland, Vejle 2025 y Brøndby 2021. No encontré la url del depósito en el repo (el `dokumentUrl` de `regnskaber.virk.dk` no está guardado); hace falta decidir qué url va.
- **Líneas del auditor** de los años cargados: `node tools/auditoria.mjs --pendientes` (un subagente por año).
- **caja y deuda** de los años cargados (`caja-deuda.mjs --club <id>`): no corrí el ensayo.
- **Sarpsborg 08 2011 y Fredrikstad**: sus casos de la cola quedaron contestados como documentos descartados.
- To-do 351 (sueldos de los clubes británicos e Instituto 2025): no empezado.

### Segunda parte (to-dos 345 y 356, misma sesión)
- **356:** los 67 XHTML británicos están convertidos a `.md` y PDF de ancla `*-ixbrl` (gratis, el PDF oficial intacto); `Admin/lotes/lote-133.txt` los lista. Plymouth 2022-23 no convierte (defecto de script, Pipeline 13). Cargarlos con la tool actual cuesta unos US$ 17,8 (28 altas, ~US$ 0,37 por documento): la principal decidió no gastar hasta que Pipeline 13 mida si la extracción sale de las etiquetas iXBRL. 23 documentos piden fijar cierre o perímetro. `Admin/lotes/lote-134.txt` (7 altas, un año cada una) quedó sin correr.
- **345:** Fiorentina 2020 (6 meses, individual tras fusión) quedó en `documentos-parciales.txt`, como Genoa y Atalanta, **con el ok de Guido pendiente**. Novorizontino 2012: el OCR separó etiquetas y cifras; reordené el bloque a tabla en el `.md` (mismas cifras, nota al principio) y verifiqué contra el PDF. Goiás 2018-19, Novorizontino 2012 y RAAL 2020 están listos para escribir pero **`cargar.mjs` falla al escribir** (`e is not defined`, línea 1341, nota «Informe oficial en formato XHTML»): defecto pasado a la principal. Falta además liga, estadio y sponsor de Novorizontino 2012 y RAAL 2020 (Goiás ya los tiene). Girona 2021 quedó con el registro de búsqueda del sponsor.
- **Cargados tras el arreglo de `cargar.mjs`** (lote 136, US$ 0): Girona 2021, Goiás 2018 y 2019, RAAL La Louvière 2020 y Novorizontino 2012 (un commit cada uno). Novorizontino 2012: la «Televisión» en 0 va con un ajuste `cero-real` con cita; el ejercicio es su primer año competitivo (Segunda Divisão Paulista, fuera de las ligas del sitio: `data/club-leagues/br.js` 2012 en `null`).
- **RAAL 2020-21 (clave 2021) en `be-div2amateur`: está bien, no se toca.** La caché de listas lo mostraba en la National Division 1 como «La Louvière Centre», pero esa es otra sociedad (UR La Louvière Centre): la página del club en Wikipedia lo dice («not to be confused with... current UR La Louvière Centre, separate clubs from the same city»). `tools/lookup-club-league.js` empareja por nombre y da ese falso positivo para RAAL; hay que confirmar contra la página del club antes de usar sus resultados.
- **Fiorentina 2020** sigue en `documentos-parciales.txt` hasta el veredicto de la Auditora 5 (tramo enero-junio por cambio de cierre), sin ok de nadie.
- **Sin hacer** (frenado por la principal hasta nuevo aviso): los británicos del 356 (lote 133/134; el ensayo no avisa por documento que el freno de IA los pararía) y el 351; Omonia 2024 (reintento y gestión); líneas del auditor de los años cargados (`node tools/auditoria.mjs --pendientes`); caja y deuda de los años cargados.
- Gasto del 345 ~US$ 12,9 de US$ 17.

### Tercera parte: cierre del 345 (orden de Guido por la principal)
- **Líneas del auditor** (21, escritas por subagentes Sonnet y validadas con `tools/auditoria.mjs`): Brøndby 2021, København 2025, Fredericia 2021-25, Emmen 2020-21 (`falta_transcripcion`: el .md trae un resumen, no el informe), Chapecoense 2019 (con salvedades y continuidad true; el extracto no muestra el motivo de la ressalva, revisar), Vålerenga 2024 (BDO de Vålerenga Fotball AS; el extracto trae también los informes de Elite y del parent), Girona 2021-23, Nordsjælland 2025, Vejle 2025, Goiás 2018-20 (con salvedades; en 2018 el informe dice «24 de abril de 2018» pero habla de 2018: debería ser 2019), RAAL 2020 y Novorizontino 2012 (`sin_informe`).
- **Caja y deuda** (`caja-deuda.mjs --ejecutar --escribir`, un commit por club, ~US$ 0,25 de IA): Goiás, Brøndby, Nordsjælland, Vejle, Vålerenga, Chapecoense y RAAL. Sin datos que completar: Emmen, Fredericia, København, Girona y Novorizontino. Si falla `faltantes-liga.mjs` por un PDF faltante, es un enlace roto del worktree: `node tools/worktree.mjs preparar`.
- **Omonia 29is Maiou 2024:** es el alta de un club de un país sin ligas en el sitio (Chipre): su «Televisión» en 0 quedó como `cero-real` con cita y la gestión como «sin presidente con fuente fechada» (el documento no lo nombra; Wikipedia da a Anastasios Christodoulidis sin fecha y una nota de 2026 llama a Adamos Efstathiou jefe de la junta); queda sin cargar: falta elegir color (verde y blanco: verde por el desempate del blanco), la liga chipriota (la 2.ª división 2023-24, ascendió) y el alta completa (`Admin/lotes/lote-137.txt`).
- **Omonia 29is Maiou 2024 cargada** (alta `omonia29maiou-cy`, commit `3225e8256c`, con los alias «Omonia 29M» y «ALS Omonia 29th May» en `tools/club-league-reference/alias.json` y la liga `cy-seconddivision` 2024). Color `brandColor: null`, resultado cerrado (decisión de la principal): verde y blanco según el.wikipedia, pero el único hex hallado (#117143) es del escudo de AC Omonia, otro club; `Admin/PANTALLA.md` pide el del propio club (como Real Madrid y Once Caldas). Estadio Dimitris Hamatsos (divisiones inferiores, en.wikipedia); sponsor sin dato con el registro de búsqueda. Sin gestión (el documento no nombra presidente y ninguna fuente fechada lo da).
- **Tramos cortos (votación 2 a 1):** Fiorentina 2020 (enero a junio) cargada con su nota de transición (`fe73ca02b`); Atalanta 2022 recargada con `--reemplazar` y su nota pública puesta con `fuente.mjs` (`cargar.mjs` conserva la fuente existente y no la agrega: hace falta a mano; `Corrige:`); las dos y Genoa salieron de `documentos-parciales.txt`. **Genoa 2024 no está cargada**: el resultado no cierra (financiero y consolidato fiscal con el signo equivocado). Con los ajustes `fila` que probé (financiero a −854.043; el neto 4.788.914 en `--reemplaza-linea 397`) `verificar.mjs` sigue dando un financiero de 5,64 o 11,29 M en vez de 4,79: no entendí cómo suma las filas financieras con signo contrario. El impuesto sí cierra (2.253.415 con el provento de consolidato en −280.131). Saqué de `ajustes-manuales.jsonl` los cuatro ajustes de prueba del financiero de Genoa; dejé el del impuesto (`fila` consolidato fiscal −280.131 en L419, `--reemplaza-linea`), que sí cierra el impuesto en 2.253.415. Genoa queda para Pipeline 14. Análisis del subagente: el financiero neto impreso es 4.788.914 (L399) y el provento 854.043 (L394) se suma como costo; la pérdida de cambio (56, L398) se resta en vez de sumar.
- **Genoa 2024 cargada** (lote 139, `a5368dea3`; caja y deuda por `caja-deuda.mjs`): cerró con el código de main y solo el ajuste `fila` del impuesto (consolidato fiscale −280.131, L419); el financiero (−4.788.914) y el resultado (−38.831.182, el impreso) salieron solos. Los cuatro ajustes de prueba del financiero se sacaron.
- **Girona, serie (resuelto):** veredicto de la Auditora 5: se unifica 2021-23 con 2020 y 2025. Recargados con `--reemplazar` y ajustes: `fila --lado financiero --destino profit_on_player_sales` para «b) Resultados por enajenaciones y otras» (+8,50 / −0,297 / −0,76 M en `financial.profit_on_player_sales`, líneas de enajenaciones fuera) y la cifra de negocios en UNA línea `lump_football_operations`: ajuste `fila` con el total del renglón 1 que reemplaza «a) Ventas» y otro `fila` en 0 que saca «b) Prestaciones de servicios» (si no, verificar la cuenta dos veces). El resultado cierra con el impreso en los tres años y ningún otro club cambió. Commits con trailer `Corrige:` (093f11dd4a, c96cb44a10, e0447bd194).

### 345 cerrado: lo que queda, con flecha (para TODO)
- Británicos del 356 (68 `.xhtml` convertidos a `.md` `-ixbrl`, lote 133; lote 134 de 7 altas sin correr) → esperan el escalón de etiquetas iXBRL y el freno de IA (Pipeline 13/14); 23 documentos piden fijar cierre o perímetro (gratis); Plymouth 2022-23 no convierte.
- XHTML daneses (SønderjyskE 2022-23, Hvidovre 2025, Brøndby 2025, PSE de København) → esperan el mismo escalón de etiquetas.
- 351 (sueldos escondidos en 12 clubes británicos e Instituto 2025) → no empezado, frenado por la principal.
- Líneas del auditor de los años cargados en la segunda mitad (Omonia 2024, Fiorentina 2020, Atalanta 2022 recargada, Genoa 2024, Girona recargado) → `node tools/auditoria.mjs --pendientes` (un subagente por año).
- Chapecoense 2019 (con salvedades, motivo sin leer) y Goiás 2018 (informe fechado «24 de abril de 2018» para un ejercicio 2018) → revisar sus líneas del auditor.
- Emmen 2020-21 → `falta_transcripcion` del informe del auditor.
- Gestión de Omonia 2024 → sin presidente con fuente fechada; si aparece, `data/gestiones/cy.js` (país sin archivo todavía).
- Color de Omonia 29M → `null` hasta tener un hex verificado del propio club.
- Girona 2020 y 2025 → sin caja ni deuda (`gross_debt` y `cash` en null en 2021-23 también: nada que completar por `caja-deuda.mjs`).
- `tools/lookup-club-league.js` → empareja por nombre y da falsos positivos (RAAL vs La Louvière Centre): Pipeline.
- Ajuste `fila` para dejar un renglón con hijos en una línea (Girona 2021-23, dos `fila` por año) → HALLAZGOS-pipeline.md; al tercer caso de dos clubes, mejora general.
- Tramos cortos: al recargar un año ya cargado, `cargar.mjs` no agrega la nota de transición si la fuente existe (Atalanta 2022 se puso con `fuente.mjs`) → Pipeline.
- Fuente de los años XHTML daneses (`fuente.mjs --url` con la url del depósito `regnskaber.virk.dk`) → no está guardada en el repo; hace falta decidir qué url va.
- `RAAL 2021` en `be-div2amateur` → está bien, no se toca.
- Gasto del 345 → ~US$ 13,9 de US$ 17.

### Qué deja de ser cierto en ESTADO
- `Admin/registros/documentos-descartados.txt` tiene ocho documentos de tenedoras (Fredrikstad, Sarpsborg 08).
- Los clubes del lote 130 tienen años nuevos (ver arriba); `Admin/ESTADO-clubes.md` se regenera con `node tools/generate-club-index.js`.
- Chipre tiene un club (Omonia 29 Maiou) y sus ligas; Fiorentina 2020, Genoa 2024 y Atalanta 2022 son tramos de transición de 6 meses con nota; `documentos-parciales.txt` ya no los tiene.

## To-do 359 (2026-10-21, Onboarding 9)

### Qué cambió (para CHANGELOG)
- Verificaciones de la recarga de Girona 2021-23 commiteadas (las había dejado Onboarding 8), con `data/faltantes/` regenerado.
- **(a) Líneas del auditor** (subagente Sonnet por año, validadas con `tools/auditoria.mjs`): Fiorentina 2020 (PwC, limpia), Genoa 2024 (BDO, limpia, ÉNFASIS CONTINUIDAD sin incertidumbre material), Omonia 29M 2024 (`sin_informe`: el PDF son 3 páginas de estados firmados por la administración). Atalanta 2022 y Girona 2021-23 ya tenían su línea (el `.md` no cambió con la recarga). `data/auditoria/cy.js` es nuevo.
- **(b)** Chapecoense 2019: la nota ya trae el motivo de la ressalva (provisión del accidente aéreo subestimada y «Acordo Atletas» sin acuerdos firmados); el resto quedó igual. Goiás 2018: el «24 de abril de 2018» del pie es una errata. El informe es del ejercicio 2018 (opina a 31/12/2018 y cita al de 2017, que es del 16/04/2018). Cambió solo la nota.
- **(d)** Url del depósito (`dokumentUrl` de regnskaber.virk.dk, con `http://`) en 10 fuentes, con `fuente.mjs --url`: Fredericia 2021-25, København 2025, Nordsjælland 2025, Vejle 2025, Brøndby 2021 y SønderjyskE 2024-09-30. En Fredericia 2023 y Brøndby 2021, que tienen dos presentaciones idénticas, va la primera.

### Qué queda (para TODO)
- **(c) Emmen 2019-20 y 2020-21:** no se puede transcribir. El PDF F.04 tiene 7 páginas, todas en el `.md`, y no trae el informe del auditor: solo dice que la jaarrekening de FC Emmen B.V. lleva accountantsverklaring (`.md` L309 en 2020-21). Hace falta la jaarrekening completa (depósito de KvK, que es pago) → Sourcing. Las líneas `falta_transcripcion` están bien. → TODO 359 (pregunta al club, ya en `Admin/dudas-por-club.md`)
- **(d), el resto de las fuentes danesas sin url:** AGF 2020-21, Brøndby 2020, København 2024, Fredericia 2019 y 2020, Midtjylland 2019 y 2020, Nordsjælland 2024, Randers 2022-23, Silkeborg 2024 y 2025, SønderjyskE 2022, Vejle 2024 y Viborg 2024 y 2025. No están en la tabla de `datos.md` y no son XHTML del depósito → Sourcing, si se quiere la url (mismo método por CVR). → TODO 359

### Gasto
US$ 0 de API (los subagentes van con tokens de sesión).

## To-do 358 (2026-10-21, Onboarding 9)

### Qué cambió (para CHANGELOG)
- **Segunda fuente (RSSSF) escrita con `tools/segunda-fuente-liga.mjs`** en 26 liga-temporadas: pt-primeiraliga 2021-25, gr-superleague 2019-20 y 2022-25, at-bundesliga 2024-25, ch-superleague 2009, co-primeraA 2025, dk-superliga 2020 y 2026, gb-premierleague 2020-23, it-seriea 2014 y nl-eredivisie 2019 y 2025. Antes de escribir, en cada ensayo revisé que la tabla fuera la de esa liga, con todos sus equipos. `liga-fuentes-no-coinciden` da 0.
- **Alias de RSSSF** (`tools/club-league-reference/alias.json`, el mismo club con el nombre de RSSSF): GD Estoril Praia, Vitória SC (Guimarães), OFI Heraklion, SK Rapid Wien, FC Twente (Enschede), Fortaleza FC (Bogotá) y AC Chievo Verona.
- `liga-una-fuente` bajó de 17 a 10 ligas.
- Códigos de RSSSF que no se adivinan: Grecia `tablesg/grkAAAA`, Suiza `tablesz/zwitAAAA` (2009: `zwit09`), Dinamarca `tablesd/denAAAA`, Austria `tableso/oostAAAA`.

### Qué queda (para TODO)
- **Las 10 ligas que siguen con `liga-una-fuente` tienen tabla en RSSSF, pero la tool no la puede leer.** Son tres defectos de script, anotados en `Admin/registros/frenados-por-script.jsonl` → Pipeline. Cuando estén arreglados, se corren con las URLs ya cacheadas en `Generados/fuentes-liga/`.
  - El título cae en el índice del principio de la página, así que la tool solo puede leer la primera tabla. Frena be-challengerproleague 2018-24, pt-ligaportugal2 2022-25, pt-liga3 2023, gr-superleague2 2018 y 2025, gb-championship 2022 y nl-eerstedivisie 2025. Es el que importa: si las dos tablas tienen el mismo número de equipos, la compuerta deja pasar la tabla equivocada.
  - Las páginas en UTF-16 no se leen: gr-superleague 2021 y ru-premierliga 2022-23.
  - La fila pide dos espacios entre el nombre y los partidos jugados, y no admite rótulos entre filas: ch-superleague 2011-12 y ar-primera 2025 (la compuerta frena bien).
- Ninguna liga se quedó sin RSSSF, así que no hay líneas nuevas para HALLAZGOS.

### Gasto
US$ 0 (RSSSF es HTML, sin IA).

## To-do 356 y cierre (2026-10-21, Onboarding 9)

### Qué cambió (para CHANGELOG)
- **10 altas británicas cargadas** (lotes 140 y 141, un commit cada una): AFC Wimbledon, Barnsley, Burton Albion, Carlisle United, Chesterfield (CFC 2001 Ltd), Exeter City, Gillingham, Lincoln City y Shrewsbury Town 2025, y Wigan Athletic 2024. Color, liga, estadio y sponsor con fuente (`altas-revision.jsonl`, `contexto-manual.json`). La cola la contestaron subagentes Sonnet y yo revisé las correcciones grandes.
- Criterios aplicados: Cost of sales → `other_expenses`; distribución de la EFL → `broadcasting`; notas «stated after charging» y staff costs sin renglón → afuera; sueldos con `incluye wages_squad --posible` en `other_expenses` (se parten con `caja-deuda --personal`, to-do 351); Barnsley «Trading of intangible assets» abierto en tres filas (nota 7).
- Gratis antes de pagar: 16 cierres del XHTML y los perímetros (regla 1). Barnsley y Gillingham 2023-24 tienen 13 meses (transición larga). Fleetwood/Jaymel 2022-25 descartados (Auditora 6). 13 urls danesas más (359 d).
- Gasto del 356: ~US$ 1,9 de US$ 35.

### Qué queda
- 12 clubes cuyo `-ixbrl.md` no tiene tablas (Hibernian, Bolton, Bristol Rovers, Cambridge 2024-25, Crewe, Northampton, Oxford, Peterborough, Plymouth, Rotherham, Salford y Tranmere; Blackpool y Reading igual) → TODO 356: esperan el arreglo de `xhtml-aarsrapport.mjs` (frenados-por-script, Pipeline 15).
- Morecambe: el importe «(n )» con espacio se lee en unidades → frenados-por-script (Pipeline) → TODO 356.
- Ross County 2025: el aviso «registro no se actualizó, correr el lote» no cambia al correrlo → frenados (Pipeline); cola contestada → TODO 356.
- Falkirk 2025: listo salvo la liga (Scottish Championship no existe en `data/leagues.js`) → TODO 356: crear la liga (club-sourcing 0.4) y cargar con su publicNote y el EJEMPLO-CATEGORÍA de la Auditora 6 (`reglas-categoria.mjs --escribir`).
- Los otros años: 21 pagables (Ross County 2022-24, Wimbledon 2023-24, Barnsley 2022-24, Burton 2022-24, Cambridge 2022-24 —su alta puede entrar por 2023-24—, Chesterfield 2022-24, Exeter 2023-24, Gillingham 2022-24, Lincoln 2022-24, Shrewsbury 2022-24, Wigan 2022-23) → TODO 356, lote siguiente con las respuestas de este como precedente (~US$ 8); 17 esperan el conversor → TODO 356.
- Líneas del auditor de las 10 altas → `node tools/auditoria.mjs --pendientes` (TODO 356).
- Escudos sin mirar (`escudoOk` null) en las 10 altas; gestiones (presidentes) en la cola, no frenan → TODO 356.
- Perfil de socios en ingleses: la cuota que cobra el Trust dueño (Wimbledon, Exeter) se contestó «no» → TODO 356 (criterio a escribir en CONVENCIONES-DATOS).
- 358: 10 ligas esperan el arreglo de `segunda-fuente-liga.mjs` (sección To-do 358) → TODO 358 (el arreglo ya entró; queda correrlo).
- 351: sueldos de los británicos con `caja-deuda --personal` → TODO 351 (ahora con 10 clubes más).
- `perimetro-senales.mjs` votó «individual» en group accounts con s408 (Salford, Falkirk, Exeter; corregidos a mano) → frenados/Pipeline → TODO 356.

### Qué deja de ser cierto en ESTADO
- Inglaterra tiene 10 clubes nuevos de League One y League Two; `documentos-descartados.txt` suma los Jaymel de Fleetwood.
