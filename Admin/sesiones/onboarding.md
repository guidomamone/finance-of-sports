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
