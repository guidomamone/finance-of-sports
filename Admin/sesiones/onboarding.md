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

## To-dos nuevos para pasar al TODO de la principal (2026-10-19; pedido de Guido: contenido para X e Instagram, todavía falta)

Para la principal: pegarlos al final de la lista del TODO con estos números (el más alto hoy es 310) y agregar al ORDEN, después de
"G. Orden de la casa", este bloque:

    **H. Contenido para X e Instagram y herramientas a probar (todavía falta; nada urgente, después de E2)**
    * 311: contenido para X e Instagram (con 257 y 259; el link dedicado, 241, va antes)
    * 312 y 313: probar Stirling PDF y Crawl4AI (los dos tocan el pipeline; van primero dentro de H)
    * 314, 315 y 316: detector de documentos nuevos; Supabase solo lectura; Open Notebook sobre las transcripciones
    * 317 al 320: probar I have ADHD, Browser Use, Higgsfield, Zapier y OmniRoute (sueltas, a demanda)

311. CONTENIDO PARA X E INSTAGRAM (pedido de Guido, 2026-10-19; todavía falta). La idea es promocionar el sitio con publicaciones propias.
    Ideas a diseñar cuando se retome, una por vez y con el ok de Guido:
    (a) la skill de contenido y difusión (ya es el 257): un año cargado → hilo o post con el dato verificado y el link a la fuente;
    (b) un script que proponga "dato del día" desde lo cargado (el ranking de una liga, el club que más cambió de deuda o de ingresos, un
        club que nunca figuró) y solo con años que pasaron `verifyTieOuts()`, para que cada post salga con cifra chequeada;
    (c) tarjetas de imagen con el mismo estilo del sitio (tamaños de X e Instagram; con Design antes) y, si ayuda, un video corto
        con Higgsfield (319);
    (d) un calendario: qué liga o club se publica cada semana, para no repetir;
    (e) enlaces a `/club/<id>` con tarjeta al compartir (241) y medir qué publicaciones traen visitas. Depende de 241 y 246.
312. PROBAR STIRLING PDF (idea, 2026-10-19). Levantarlo en Docker local y medirlo contra los PDFs que hoy dan más trabajo (escaneos, tablas
    rotadas, filas que no concilian), contra Tesseract y Mistral: una tabla "PDF difícil → motor → fidelidad contra los totales oficiales".
    No cambia nada del pipeline; si gana en algún caso, se diseña un escalón con el ok de Guido. Conectado con el costo de Mistral (298) y
    con los escaneos del 261.
313. PROBAR CRAWL4AI PARA SOURCING (idea, 2026-10-19). Que un script baje en Markdown la lista de documentos de un portal de regulador
    (empezar por uno ya conocido, el belga o el noruego) y la compare con `Admin/ESTADO-clubes.md`. Mide si reemplaza navegar con el Browser
    pane (menos tokens: va con la regla de scripts antes que sesión). Va con las notas de `club-sourcing`.
314. DETECTOR DE DOCUMENTOS NUEVOS (idea, 2026-10-19; optimiza el 252). Hoy `tools/ejercicios-nuevos.mjs` corre una vez por mes. Con Maxun o
    con 313 más una tarea programada, vigilar los portales que publican cada año y dejar los candidatos en `Admin/sourcing/README.md`,
    sin que Guido tenga que pasar los links. Después de 313.
315. SUPABASE COMO ESPEJO DE LECTURA (idea, 2026-10-19; con el 245 y el 258). Un experimento descartable: exportar los ejercicios de un solo
    país a tablas y correr las auditorías en SQL (rubros que no suman, años faltantes, outliers entre clubes) para comparar con
    `verifyTieOuts()`. Sirve de medida para decidir cuándo `data/*.js` deja de alcanzar (skill de escala). No es una migración. Sobre lo de
    "Supabase recuerda y Claude no": la memoria entre sesiones ya la dan CLAUDE.md, las skills y la carpeta de memoria; una base con
    pgvector solo agrega búsqueda semántica y hay que construir la recuperación encima.
316. OPEN NOTEBOOK SOBRE LAS TRANSCRIPCIONES (idea, 2026-10-19). Cargar las `Clubes/<País>/**/*.md` de un país y preguntarle cosas
    ("¿qué clubes reportan préstamos de accionistas?") para encontrar patrones y armar `Admin/dudas-por-club.md` y las referencias de
    `club-data-mapping` más rápido. Probar con un país antes de pensar en todo.
317. PROBAR I HAVE ADHD EN SESIONES DE LOTE (idea, 2026-10-19). Skill de Claude Code que pone la respuesta primero y saca el relleno
    (repo `ayghri/i-have-adhd`; verificar el dueño antes de instalar, hay copias con el mismo nombre). Probar un lote con y sin ella; en
    línea con "un mensaje, preguntas en orden".
318. PROBAR BROWSER USE (idea, 2026-10-19). Solo para portales con formularios de secuencia fija que hoy consumen mucho contexto del Browser
    pane. Esperar a que aparezca uno en un lote; hoy no es urgente.
319. HIGGSFIELD MCP (idea, 2026-10-19). Conector (`https://mcp.higgsfield.ai/mcp`) para generar imágenes y video corto con créditos de
    Higgsfield. Sirve para los visuales del 311 (c); verificar precio y condiciones en su sitio, las fuentes encontradas son blogs.
320. ZAPIER MCP Y OMNIROUTE (ideas, 2026-10-19; a demanda). Zapier: solo si el flujo de mails (51) o el de publicación (311) necesitan
    automatizar "respuesta → fila" o programar posts; exponer solo las acciones necesarias. OmniRoute: gateway local de modelos con
    fallback, para abaratar la API (no Haiku, ver la regla de modelos); concentra credenciales y prompts, así que se revisa el repo
    antes. Quedan sin ubicar OpenSEO (para el SEO del 241), Book to Skill y Open Generative AI: pedir los links a Guido.

### Entrada de CHANGELOG (para la principal)
* Diez to-dos nuevos (311-320): contenido para X e Instagram y la lista de herramientas a probar (Stirling PDF, Crawl4AI, Maxun,
  Supabase de lectura, Open Notebook, I have ADHD, Browser Use, Higgsfield, Zapier, OmniRoute). Sin código.
