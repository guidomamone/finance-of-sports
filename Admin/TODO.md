# TODO — finance-of-sports

Lo que falta hacer. **Esta es la única lista oficial de próximos pasos del proyecto.**
No la dupliques en `Admin/CHANGELOG.md` ni en `Admin/finance-of-sports-project.md`, que son historia,
ni en el comentario de ningún archivo de código.

## Cómo leer esta lista

- **Los números son IDENTIFICADORES, no prioridad.** Se conservan de la lista vieja (la
  que vivía en el comentario de `index.html`) porque los puntos se citan entre ellos:
  "ver to-do 20(h)" tiene que seguir apuntando a lo mismo. Por eso hay
  huecos: son los puntos que se resolvieron o se descartaron. Un punto nuevo toma el
  número siguiente al más alto, nunca uno libre.
- **La prioridad es el ORDEN en que están escritos**, de arriba hacia abajo.
- **Un punto resuelto se BORRA de acá.** Su historia ya queda en `Admin/CHANGELOG.md` y, si
  ameritaba el porqué, en `Admin/finance-of-sports-project.md`. Antes se dejaban marcados como
  "RESUELTO" y la lista terminó con la mitad de los puntos siendo cosas ya hechas.
- **Los pendientes de sourcing de un país no van acá**: viven en `Admin/sourcing/<País>/_notas-generales.md` (decisión de Guido, 2026-09-14, reafirmada el 2026-10-04). La lista de lo sacado el 2026-09-14 está en `Admin/Archive/todo-sacados-2026-09-14.md`.

---

## Qué hay que hacer

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `Admin/sourcing/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

51. PROCESO DE EMAIL A CLUBES — EN CONSTRUCCIÓN, ETAPA 1. El envío queda afuera de cualquier sesión
    de chat: Resend + subdominio propio + una cola de archivos que Guido revisa, con el envío
    disparado por Guido desde su propia terminal. Proceso completo en
    `.claude/skills/club-outreach/SKILL.md`. Sin regla de disparo automática todavía: Guido decide
    cuándo escribir.

    **Infraestructura, estado real:** (a) ✅ cuenta en Resend creada 2026-09-24 (conectada con
    GitHub, sigue en free por ahora); (b) ✅ subdominio `outreach.financeofsports.com` verificado
    2026-09-24 (DNS en Netlify DNS — DKIM, SPF vía 2 CNAME, DMARC `p=none` en `_dmarc.outreach`, no
    en la raíz); (c) `Receiving` activado (MX agregado, propagación confirmada por `dig` desde 3
    resolvers distintos) — el dashboard de Resend tardó en reflejarlo como verificado pero la
    infraestructura ya estaba bien; (d) ✅ API key generada y en `Admin/api-keys/outreach.env`
    (gitignoreado), `from` = `info@outreach.financeofsports.com`.

    **✅ PIPELINE PROBADO DE PUNTA A PUNTA, 2026-09-25**: mail de prueba escrito directo en
    `Admin/outreach/aprobados/`, Guido corrió `tools/outreach-send.js` desde su terminal, llegó a su
    Gmail, y el archivo se archivó solo en `Admin/outreach/enviados/`. La Etapa 1 está lista para
    usarse con clubes de verdad — ver `club-outreach/SKILL.md` sección 1 para el flujo completo
    (candidatos → redactar en `cola/` → Guido aprueba moviendo a `aprobados/` → Guido corre el
    script).

    **Check-in programado para 2026-10-24** (30 días desde que arrancó la Etapa 1): evaluar si
    conviene prender la Etapa 2 (regla de disparo automática — 3 preguntas acumuladas O 90 días — y
    cadencia de follow-up/cooldown, documentadas pero no activas todavía en el skill). Ver
    `Admin/outreach/checkin-2026-10-24.md` para qué mirar exactamente. Hay una tarea programada
    (`club-outreach-checkin`) que va a preguntarlo esa fecha, más el archivo como respaldo.

    **El criterio de CUÁNDO un club amerita un mail sigue siendo el mismo, sin cambios** (to-do 52,
    `club-sourcing/SKILL.md` sección 0.3): documento CONFIRMADO que existe pero no descargable
    (prensa con cifras, video en vez de PDF, compartir revocado — ver Independiente/Banfield/Atlanta)
    sí amerita mail; un dead-end sin ninguna señal de que el documento exista, o un bloqueo
    regulatorio estructural, no. Ese criterio y este proceso son cosas separadas a propósito.

165. ALTAS DE CLUBES NUEVOS FUERA DE ITALIA (decisión de Guido, 2026-10-07; estado al 2026-10-10). Un país por vez, con el pipeline
    (skill club-or-year-onboarding; club nuevo: revisión del alta en Admin/registros/altas-revision.jsonl: nombre, color, perímetro, cierres y ligas).
    HECHO: Brasil completo (lotes 56-63) y Rusia desde el fisco (tools/bfo-rusia.mjs, 16 clubes). Etapa 2 (transcribir) de los 14 países
    del (c) hecha: lote 66 (468 documentos). Nombres legales de las altas: 24 contestados con cita (ajustes `name`). Gestiones de los clubes
    nuevos de Grecia, Rep. Checa, Portugal, Noruega, Países Bajos y Turquía cargadas (to-do 195).
    FALTA, en este orden:
    a) GRECIA (lote 67, 42 documentos con estado de resultados; los otros 87 de las carpetas son balances, notas, informes del directorio y
       del auditor, y actas: no entran). Cola contestada (81 respuestas), intereses de Volos 2021-2025 con signo (ajustes `fila`), 41
       verificaciones OK. Falta la etapa 7 (categorizar, ~US$ 1) y la carga, que corre Guido:
       `caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-67.txt --ejecutar --cargar` (alta de AEK, Asteras, Levadiakos, OFI y
       Panserraikos con sus años; Volos ya tiene la verificación lista). Después: leer el resultado, la cola nueva y lo que quede.
       AEK 2025 (AEK_NOTES_IFRS_2025-06-30_a): la etapa 4 dejó 3 números sin confirmar contra el PDF. Panserraikos 2024 no pasó por verificar.
    b) Los demás países, uno por vez, con la misma receta que Grecia: armar el lote con solo los documentos que traen estado de resultados
       (`ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -1` para el número), `antes-de-localizar.mjs`, ensayo, Guido corre `lote.mjs --ejecutar
       --cargar`, y la cola se revisa con un Sonnet que recomienda respuestas con cita. Fichas listas para alta (`alta-club.mjs --todos`,
       2026-10-10): Noruega 8, Portugal 7, Rep. Checa 7, Colombia 4, Países Bajos 4, Turquía 4, Ucrania 3, Corea 2, Suiza 2, Bélgica,
       Croacia y Dinamarca 1. Ninguna tiene todavía un año verificado: "listo para alta" es solo la ficha del club.
    c) Perímetro en pregunta (decide el `name` ya registrado): Molde, Vålerenga, Go Ahead Eagles, Basel, Pardubice, Aalesund, Fredrikstad,
       Sarpsborg 08. Las preguntas de la revisión del alta siguen en Admin/registros/altas-revision.jsonl.
    d) Rusia: las tablas de otros ingresos y gastos que no suman el código del formulario (Krasnodar, Krylia 2021-2025, Rostov 2025, Rubin
       2022-2025: la nota en bruto, el formulario en neto). Sin daño hoy: esos años quedan con el renglón entero.
    Mejoras de script vistas en Grecia: to-dos 210-215.

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

195. GESTIONES DE LOS CLUBES YA CARGADOS QUE NO LAS TIENEN (pedido de Guido). HECHO 2026-10-13 (tanda 1): 6 subagentes Sonnet investigaron
    los 74 clubes que faltaban; se cargaron las 67 gestiones CONFIRMADAS de 48 clubes (`data/gestiones/ru.js` y `jp.js` nuevos). Lo no
    confirmado y las dudas, en "## Gestiones" de cada `Admin/carga-clubes/<club>.md`.
    TANDA 2, INVESTIGADA Y SIN CARGAR (todo en `Admin/gestiones-por-pais/tanda-2026-10-13/`: los `lote-<N>.json` = lo pedido, los `resultado-<N>.json`
    = lo que encontró cada subagente con fuente, `instrucciones.md`, `validar.js` y `cargar-gestiones.mjs`). Decisiones de Guido ya tomadas,
    que estos resultados aplican:
      - Brasil SAF: el EJECUTIVO (CEO o diretor-presidente), como Atlético Mineiro y Bahia (lote 7: América-MG, Coritiba, Vasco, Fortaleza,
        RB Bragantino, Novorizontino, Cuiabá, Ferroviária, Goiás, Cruzeiro).
      - Rusia: el DIRECTOR GENERAL donde no hay presidente (lote 8: Lokomotiv, Dynamo Moscú, Baltika, Pari NN; Rostov 2025 = Goncharov).
      - Club América: Emilio Azcárraga Jean como Dueño (lote 8; la fecha quedó sin confirmar).
      - Alianza Lima: UNA gestión "Concurso de Acreedores" desde el 2012-03-27 (Res. 2152-2012/CCO-INDECOPI), hasta null (lote 8).
      - Alemania: el PRESIDENTE DE LA ASOCIACIÓN (e.V.) donde la sociedad no tuvo presidente ni portavoz (lote 10: Köln = Werner Wolf, HSV =
        Marcell Jansen y Henrik Köncke, RB Leipzig = Mintzlaff y Plenge, Gladbach = Rolf Königs y Rainer Bonhof). Los 4 cubiertos.
      - Lote 9: confirmar fechas de Brasil (Vila Nova, Remo, Paysandu, Ituano, Ceará, Atlético Goianiense, Amazonas, Criciúma, CRB).
    CÓMO CARGARLA: validar: correr desde esa carpeta (rutas relativas:
    `cd` ahí y `node validar.js 7`); ensayo de la carga: `node Admin/gestiones-por-pais/tanda-2026-10-13/cargar-gestiones.mjs
    Admin/gestiones-por-pais/tanda-2026-10-13 --lotes 7,8,9,10`. FRENA a propósito si un club ya tiene gestiones en su archivo (Goiás,
    Criciúma, CRB, Vila Nova, Remo, Paysandu, Cruzeiro... de la tanda 1): para esos hay que REEMPLAZAR su entrada de `data/gestiones/br.js`
    con la de la tanda 2 (que trae también las ya confirmadas), no agregar. Solo se cargan las `confirmada: true`; mirar el resumen de cada
    subagente en cada `resultado-<N>.json` (`dudas`) antes. Los archivos de país nuevos (mx, pe) van en `PAISES` de `js/finanzas-anios.js`, y su
    criterio en `Admin/gestiones-por-pais/<iso>.md`; después ASSET_V, `generate-fuentes-page.js`, `audit.js` y ver la fila de gestión en el sitio.
    QUEDA SIN FUENTE (otra tanda si Guido quiere): Goiás 2010-2013 y Ferroviária 2012-2013 (solo la firma del balance), Novorizontino,
    Cuiabá (fecha del cambio Alessandro -> Cristiano Dresch), Pari NN 2021-2022, Once Caldas 2024-2025, Club América (fecha), Osijek ya resuelto.
    Casos `firmo` (cambio de gestión entre el cierre y la aprobación del balance): en las `dudas` de cada resultado.



214. EL PRIMER AÑO DE UN CLUB NUEVO YA NO LO REVISA GUIDO (decisión de Guido, 2026-10-13: "no quiero revisar yo el primer año del club,
    ya podemos cambiar eso"). Hoy `verificar.mjs` levanta el caso "primer-anio" (cola humana) para todo club nuevo sin año anterior cargado;
    en Grecia los 7 coincidían exacto con lo impreso. Diseñar como escalón (método de la skill club-or-year-onboarding: caso real, escalera,
    ejemplo por escalón, ok de Guido, medir con `prueba-completa` y la cola de Grecia): el caso deja de ir a la cola cuando ingresos, gastos y
    resultado cierran EXACTO contra totales impresos (no solo el resultado) y el alta no tiene preguntas; si algo no cierra exacto o falta un
    total impreso, sigue la cola. Medir cuántos "primer-anio" de la cola se habrían cerrado y que ninguno de esos tuviera una corrección de Guido.

215. PRECEDENTE DE CATEGORÍA DE UN SOLO CLUB DEL PAÍS (optimización, cola). El escalón B de categorías pide 2 clubes del país con la misma
    respuesta; en Grecia solo estaba AEL Larissa, así que Asteras, Levadiakos y OFI volvieron a preguntar "Κόστος πωλήσεων", "Έξοδα διάθεσης",
    "Αμοιβές και έξοδα προσωπικού" (21 casos). Evaluar un escalón con 1 club y mismo contexto exacto (misma nota/renglón título), que proponga
    con cita del precedente y que la compuerta de lado y de sumas decida; medir aciertos contra las respuestas de hoy.

216. PRIMER ALTA DE CLUB CON LA EVIDENCIA FUERA DE `data/` (probar en vivo). Ningún lote dio todavía de alta un club nuevo Y cargó su primer
    año con los scripts que escriben la evidencia en `Admin/carga-clubes/<clubId>.md` en vez de comentarios en `data/`. La primera vez, mirar:
    el `.md` nuevo del club, que `data/<país>/<club>-data.js` salga sin comentarios (`node tools/audit.js` lo avisa como `comentario-en-data-club`)
    y el commit de cada año. Si algo sale mal, el lugar es `tools/evidencia-club.mjs` y `Admin/PIPELINE.md`, "Dónde queda la evidencia" (etapa 8).

218. SACAR LAS ETAPAS VIEJAS DE `tools/onboard.mjs` Y ARCHIVAR `tools/prepare-onboarding.mjs` (limpieza de código). `onboard.mjs` era el comando
    único del pipeline anterior a `lote.mjs`; hoy solo viven dos funciones suyas: `--quien` (qué club y año es un PDF; lo llaman
    `cargar.mjs`, `chequeos-gratis.mjs` -desde la etapa 2- y `proponer-carga.mjs`) y `--all --dry-run` (qué está cargado; lo llama
    `inventario-transcripciones.mjs`). Las etapas transcribir / comparar con Gemini / onboardear (`--transcribe-only`, `--check-only`, la
    etapa `onboard`) ya no las usa nadie. `prepare-onboarding.mjs` todavía tiene dos usuarios además de esas etapas: `briefingFor()` de
    `proponer-carga.mjs` (lo usa `cargar.mjs` solo SIN `--desde-verificacion`, que el lote y `cargar-lote` siempre pasan; y `--backtest` /
    `--pdf`) y `tieScore()` de `resolver-inventario.mjs`, que ya nadie llama (código muerto). Orden: (a) borrar `tieScore()`; (b) decidir
    con Guido si el camino de `cargar.mjs` sin `--desde-verificacion` y el backtest de `proponer-carga.mjs` siguen haciendo falta, y si no,
    sacarlos; (c) separar `--quien` y `--all --dry-run` (en `onboard.mjs` o en una tool chica nueva) y borrar las etapas viejas; (d) archivar
    `prepare-onboarding.mjs` en `tools/archivo/`. Medir antes y después: `node tools/estado.mjs --actualizar` y `diff` de
    `Admin/registros/transcripciones-estado.jsonl`; ensayos de `cargar-lote.mjs` y de `lote.mjs --lista Admin/lotes/prueba-completa.txt`.
    `suggest-category-precedent.mjs`, `sum-check.mjs`, `extract-table-rows.mjs` y `compare-transcripts.mjs` NO se archivan: las usan la skill
    `club-data-mapping` e `inventario-transcripciones.mjs`.
