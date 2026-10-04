> **ARCHIVADO el 2026-10-04 (Versión 475).** Cinco to-dos del onboarding manual, cerrados por el pipeline (`Admin/PIPELINE.md`, skill
> `club-or-year-onboarding`). Quedan acá, tal cual estaban, porque varios archivos de `tools/`, `data/` y `fuentes/` los citan como "to-do 98" o "to-do 108".
> 98: los pasos mecánicos del onboarding ya son scripts. 105: el plan de ritmo usaba las tools del proceso manual. 85: el recorrido del
> onboarding es el que armó el pipeline. 89: `localizar.mjs` + `extraer.mjs` leen solo los bloques elegidos. 108: la validación del
> inventario pasa documento por documento dentro del lote.

98. BAJAR EL COSTO EN TOKENS DE CLAUDE DEL ONBOARDING DE UN EJERCICIO NUEVO (candidato del to-do 85,
    pedido de Guido 2026-09-28: *"sería factible un enfoque en el que se utilicen más scripts que
    corren en mi computadora y vos solo pienses cuando haga falta?"*). Mismo principio que ya se usó
    para la transcripción (Mistral/Gemini, CLAUDE.md "Cada PDF nuevo": 0 tokens de Claude corriendo
    desde la terminal de Guido) — sacar de Claude todo paso MECÁNICO del resto del pipeline, dejarle
    solo lo que es genuinamente ambiguo. Pensado sobre todo para el caso más común de acá en
    adelante: un ejercicio NUEVO de un club que YA tiene años cargados (Boca, River, Racing, etc.) —
    el proyecto va a crecer más por años-de-clubes-existentes que por clubes nuevos.

    **Tabla completa del pipeline: quién hace cada paso HOY, qué podría bajarlo a script/API, y el
    fallback cuando la opción barata no alcanza.**

    | # | Paso | Quién lo hace HOY | Podría bajarse a (barato/gratis) | Fallback si no alcanza |
    |---|---|---|---|---|
    | 1 | Sourcing: encontrar el PDF del club | Claude (Sonnet, a veces escala a Exa/Firecrawl/Opus) | No — necesita criterio para elegir qué mirar, descartar sitios falsos y homónimos (ver to-do 76) | Es la propia escalera de `club-sourcing/SKILL.md` 0.1b: Sonnet → gate de señal → Exa → Opus → Sonnet |
    | 2 | Descargar el PDF ya encontrado | Ya es mecánico (`curl`, `tools/wayback-verify-download.mjs`) | — (ya es script) | Firecrawl si el sitio bloquea `curl`/WAF |
    | 3 | Transcribir el PDF a `.md` | Ya es mecánico desde CLAUDE.md Versiones 244-248: Mistral OCR / Gemini, 0 tokens, Guido lo corre desde su terminal | — (ya es script/API) | Un subagente de Claude con Tesseract, solo si Gemini rechaza por `RECITATION` |
    | 4 | Sacar del `.md` transcripto la lista de rubros con su monto (hoy: Claude lee el documento ENTERO, miles de líneas, para encontrar la tabla de Recursos/Gastos entre actas, firmas y dictámenes que no aportan ningún dato) | Claude | **Propuesta nueva**: un script que parsea las tablas Markdown del `.md` (Mistral las arma bastante regulares) y arma un JSON compacto `{sección, rawLabel, monto, página}`. Claude lee el JSON, no el documento entero | Si el documento tiene una tabla con formato irregular (rotada, mezclada con texto — ver `club-data-mapping` sección 9), el script no arma nada limpio y Claude sigue leyendo el `.md` como hoy |
    | 5 | Decidir a qué `normalizedCategory` del sitio va cada rubro | Claude, para TODOS los rubros, cada vez | **Tier 0 (script, gratis)**: si el rubro YA apareció con ese texto exacto en un año anterior del MISMO club, copiar la categoría que ya se usó — matchea contra `data/<club>-data.js` ya cargado. **Tier 1 (Jev, cuando se sume, to-do 99)**: rubro nuevo en ese club, pero parecido semánticamente a una categoría ya usada en CUALQUIER club | **Tier 2 (Claude)**: rubro genuinamente nuevo, ambiguo, o **la primera categorización de un club/país sin ningún precedente** (ver la explicación larga más abajo, es el caso que de verdad no se puede sacar de Claude) |
    | 6 | Elegir el tipo de cambio a USD | Claude, leyendo el Anexo de moneda extranjera del balance | El tipo de cambio DECLARADO por el propio documento (la regla preferida siempre, `club-data-mapping` sección 5 regla 0) lo sigue leyendo Claude a mano — es un número puntual en una tabla chica, no vale la pena un script para esto todavía | Si el documento NO declara su propio fx, ya existe `tools/lookup-fx-close.js` (cotización de mercado, local, sin fetch) |
    | 7 | Verificar que todo cierra (sumas de `items`, escala plausible, salto contra años anteriores) | Hoy: a mano/ad-hoc, cada sesión reinventa el chequeo | **Ya existe y no se estaba usando primero**: `node tools/audit.js` (gratis) — `items-no-cierran`, `escala-implausible`, `salto-interanual` y el resto de los checks. Ver la nota agregada el 2026-09-28 en `club-data-mapping/SKILL.md` sección 6: correrlo ANTES de cualquier verificación a mano | Si `audit.js` marca algo raro, Claude vuelve al documento para esa línea puntual, no para todo el balance |
    | 8 | Color de marca (`brandColor`), SOLO para un club nuevo, no un año más | Claude, siguiendo `club-or-year-onboarding` sección 3 | Ya existe `tools/lookup-brand-color.js` (busca local contra ligas ya cacheadas) | Si la liga no está cacheada, Claude sale a buscar (Wikipedia/sitio oficial/agregadores), como hoy |
    | 9 | Publicar (3 generadores + `audit.js`) | Ya es mecánico | — (ya son scripts) | — |

    **Qué significa "la primera categorización de un club/país sin ningún precedente" (paso 5,
    tier 2) — la parte que de verdad no se puede sacar de Claude, explicada con contexto porque no
    es obvia:** cada línea de texto de un balance (ej. "Cuotas sociales", "Departamento de fútbol
    juvenil") tiene que mapearse a una de las ~20 categorías fijas que usa el sitio para poder sumar
    y comparar clubes entre sí (`normalizedCategory`, la lista completa está en
    `data/category-map.js`: cosas como `member_dues`, `player_sales`, `wages_squad`). Cuando un club
    YA tiene años cargados, el año nuevo casi siempre repite las MISMAS palabras que ya se usaron
    para ESE club — ahí un script puede copiar la decisión vieja sin pensar (el tier 0 de arriba).
    Pero la PRIMERA vez que aparece un club nuevo — y sobre todo un PAÍS nuevo, con su propio régimen
    contable, que puede ser bien distinto del argentino — no hay ningún precedente en el sitio para
    copiar. Ejemplo real, ya documentado en `club-data-mapping` sección 20: los balances daneses
    pueden usar una exención legal (§ 32 de su ley de balances) que permite mostrar el ingreso ya
    neteado en un solo número ("Bruttofortjeneste"), sin desglosar nada — no hay forma de que un
    script adivine eso, hay que LEER la nota de política contable del balance y entender qué está
    pasando. Ahí Claude tiene que: (a) leer el documento completo y entender la estructura PROPIA de
    ese club/país (que puede no separar nada, o separar distinto a como separa Argentina); (b)
    decidir con criterio a qué categoría del sitio corresponde cada rubro, usando de guía la tabla de
    precedentes de OTROS clubes pero sin que haya un match exacto; (c) si la estructura es rara de
    verdad, inventar un criterio nuevo y dejarlo ESCRITO en `club-data-mapping/SKILL.md` para que la
    PRÓXIMA vez que aparezca algo parecido (mismo país, u otro con el mismo problema) ya exista el
    precedente y ese caso pase a ser tier 0 o tier 1. Por esto un club/país nuevo sale más caro en
    tokens que un año más de un club conocido, y por esto Jev tampoco alcanza acá todavía: Jev
    clasifica ENTRE categorías que ya existen, pero la pregunta en este caso es "¿esto necesita una
    categoría nueva, o encaja en una que ya existe con otro nombre?" — eso es una decisión de DISEÑO
    del esquema del sitio, no una clasificación entre opciones fijas.

    **PROTOTIPO PROBADO 2026-09-28 (paso 4)**: `tools/extract-table-rows.mjs` (sin integrar a ningún
    flujo todavía) saca las tablas Markdown de un `.md` transcripto a JSON compacto
    `{page, section, columns, rows}`, sin convertir los números a float (quedan como string tal cual
    están impresos — la interpretación numérica sigue siendo de Claude, distintos documentos usan ","
    o "." como decimal de forma distinta). Probado contra 6 documentos de países/formatos distintos
    (Argentina x2, Italia, Noruega, Colombia, Estados Unidos): reducción de 26% a 96% según cuánta
    prosa tiene el documento, y en el caso de Green Bay Packers conservó la tabla real de revenue
    descartando 350+ líneas de prosa institucional. También detecta AUTOMÁTICAMENTE el separador
    decimal del documento (2+ grupos de miles = señal inequívoca) — un mapeo por país se habría
    equivocado: Almagro (Argentina) usa formato "21,597,931.54" mientras River y Boca, mismo país,
    usan "334.420.749". Marca tablas "likelyRelevant" por palabras clave multi-idioma sin descartar
    las demás (para no perder datos si el idioma de un país nuevo no está en la lista). Siguiente
    paso: correr un onboarding real con el JSON en vez del `.md` completo y comparar el resultado.

    El paso 4 (extracción de tablas) es el de mayor repago inmediato: no depende de sumar Jev ni de
    rediseñar nada, achica directo cuánto documento tiene que leer Claude en CUALQUIER onboarding, no
    solo en los repetidos.

    **ONBOARDING REAL DE PRUEBA HECHO, 2026-09-28: Once Caldas Ejercicio 2024** (club existente, país
    existente, precedente de categorización ya establecido — el caso "más común de acá en adelante"
    que describe la intro de este punto). Resultado: 0 P0/P1 en `node tools/audit.js`, ingresos
    ($26.814,332 M) y gastos ($21.994,867 M) reconciliados EXACTO contra los totales impresos del
    documento. Sin embargo, encontró un BUG REAL en `extract-table-rows.mjs` (no en Mistral/Gemini,
    que transcriben fiel página por página a propósito, ver CLAUDE.md): cuando una tabla se corta por
    un salto de página, a veces la transcripción pega un separador Markdown (`| --- | --- |`) a la
    fila de CONTINUACIÓN como si fuera un encabezado nuevo — un intento de arreglarlo con una
    heurística ("sin separador = continuación") resolvió un caso pero no el otro (el "separador
    fantasma"). NO se va a seguir persiguiendo con más regex: la red de seguridad real es el tie-out
    obligatorio contra el total impreso (SKILL.md sección 6), que atrapó esto sin problema. **Paso 4
    queda así: una ayuda real para NAVEGAR el documento (ahorra leer páginas de firmas/dictamen/actas
    que no aportan nada), no algo para confiar a ciegas en una tabla que cruza un salto de página —
    ahí conviene leer esa sección puntual a mano, igual que cualquier verificación de tie-out.**

    **Pedido de Guido en el camino: sacar la ARITMÉTICA del tie-out de Claude también** (mismo
    principio, un nivel más abajo) — `tools/sum-check.mjs`, suma una lista de números (con o sin
    separador de miles) y compara contra un total, reemplazando la suma mental que antes hacía Claude
    para cada Nota. Lo que sigue siendo de Claude: decidir QUÉ filas entran en la suma (el bold de
    Mistral para marcar subtotales salió inconsistente en este mismo documento, sin patrón fijo, así
    que un script no puede inferir la jerarquía solo). Usado y probado en el onboarding de arriba.

    **Paso 5, tier 0 construido y probado, 2026-09-28: `tools/suggest-category-precedent.mjs`** — si
    un rubro nuevo tiene el mismo texto que uno ya categorizado en un año anterior del MISMO club, lo
    sugiere (EXACTO/PARECIDO/SIN_PRECEDENTE, separado por ingreso/gasto). Sin fallos en un barrido de
    los 162 clubes; encontró 3 conflictos de categorización REALES entre años (no de la tool, ver
    to-do 101) y 1 falso positivo de la propia tool (colisión de normalización, mismo to-do).
    Documentado en `club-data-mapping/SKILL.md` sección 1. Sigue esperando: tier 1 (JEV, cross-club,
    to-do 99) y tier 2 (categorización sin precedente, siempre Claude).

105. PLAN PARA SUBIR EL RITMO DE ONBOARDING RUMBO A 2000 PDFs ANTES DE FIN DE AÑO (pregunta de
    Guido, 2026-09-28, después de los 5 onboardings de prueba del to-do 98: *"necesito velocidad
    para subir onboardings y de alta calidad. a este ritmo no subo 2000 pdfs antes de fin de año.
    O crees que con JEV ya esta bien?"*). Respuesta corta: **JEV solo NO alcanza** — resuelve una
    sola cosa (categorizar un rubro nuevo comparándolo contra clubes YA cargados, to-do 99) y ni
    siquiera está prendido todavía (el gate de integración espera a 200 clubes, hoy 164). El cuello
    de botella real para volumen es el SOURCING de clubes 100% nuevos (paso 1 del pipeline, to-do
    98), que sigue siendo 100% criterio de Claude — JEV no lo toca.

    **Dato a favor, para calibrar la fecha**: la ronda de 5 onboardings de hoy anduvo lenta A
    PROPÓSITO, porque además de cargar datos estaba probando y depurando tools nuevas — encontró y
    corrigió 5 bugs reales en el camino (mezcla ingreso/gasto en `suggest-category-precedent.mjs`,
    error de índices en su flag `--side`, 2 casos del fetcher de ligas que toma la tabla
    equivocada — to-do 104 —, y un dígito transpuesto real de Mistral en River). Ese costo de
    "pagar la deuda de bugs" ya está pagado una vez; el onboarding #6 en adelante, con las tools ya
    probadas, debería salir más rápido que cualquiera de los 5 de hoy.

    **Recomendaciones concretas, en orden de impacto:**
    1. **`tools/prepare-onboarding.mjs <club> <año> <archivo.md>`, CONSTRUIDO Y PROBADO 2026-09-28**:
       corre de una sola vez extract-table-rows + sum-check (por SEGMENTO, no por tabla entera:
       una tabla real tiene varios "Total"/"Subtotal" en cascada) + suggest-category-precedent (si
       el club ya tiene data) + lookup-club-league (si el club ya tiene entrada en `clubs{}`), y deja
       UN `<archivo>.briefing.json` al lado del `.md` (gitignoreado, se regenera en segundos).
       Pensado para correr desde la TERMINAL DE GUIDO, antes de abrir la sesión de Claude — mismo
       criterio que la transcripción. Probado a fondo contra 5 documentos reales y diversos (River
       2021 ARS, Once Caldas 2024 COP, Rosenborg 2012 noruego, Corinthians 2024-25 portugués/BRL, AC
       Milan 2022-23 italiano/EUR), encontrando y arreglando 8 bugs reales en el camino (commits
       `99f47bd` y el de la ronda portugués/EUR): un crash de proceso hijo sin capturar, el tie-out
       por tabla entera que no chequeaba nada, un Anexo con encabezado de 2 niveles rompiendo
       sum-check, un heading en negrita que dejaba la tabla MÁS IMPORTANTE de River marcada
       `likelyRelevant:false`, `sum-check.mjs`/`isTotalLabel` sin soporte para el formato escandinavo,
       **0 tablas detectadas en documentos de texto plano sin "|"** (Corinthians -- Mistral a veces
       transcribe un PDF con capa de texto muy limpia como texto corrido, no como tabla Markdown; se
       agregó un segundo parser para este formato), una sub-nota tipo "24.1" confundida con un valor
       real (agrupa de a 1 dígito, no de a 3 como un separador de miles de verdad), y un heading
       fuerte repetido en CADA página (membrete) que bloqueaba PARA SIEMPRE el uso del heading débil
       real -- arreglado reseteando el trail de headings por página y ensanchando la ventana de 2 a
       5.

       **`tools/onboard.mjs`, CONSTRUIDO 2026-09-28**: el comando único que pidió Guido -- encadena
       `mistral-ocr-transcribe.mjs` → `gemini-transcribe.mjs --redo-mistral-scanned` →
       `prepare-onboarding.mjs`, sin tocar las 2 primeras. `--club` se adivina por nombre de carpeta
       contra `data/clubs.js` solo si hay 1 coincidencia clara (probado con un caso real ambiguo,
       "Racing" -> Racing Club + Genk, se niega a adivinar); `--year` se adivina siempre del nombre
       del archivo. Probado con `--dry-run` contra 4 casos reales, sin tocar ninguna API. `--all` de
       punta a punta (con llamadas reales a Mistral/Gemini) queda para que Guido lo corra desde su
       terminal -- el paso de Gemini barre TODO el proyecto, no solo el `--dir` pedido.

       **TODAVÍA NO conectado a ningún skill** (a pedido explícito de Guido) -- ya se cubrió la
       diversidad de idioma/moneda/formato que hacía falta probar, así que lo que sigue es sumarlo a
       `club-or-year-onboarding/SKILL.md` y `club-data-mapping/SKILL.md` cuando Guido lo confirme.
    2. **Agrupar varios años del MISMO club en una sola sesión**, no uno por sesión — el precedente
       de `suggest-category-precedent.mjs` mejora con cada año que se suma (Once Caldas pasó de
       10/11 EXACTO en su 2do año cargado a 11/11 en el 4to), y se evita pagar el arranque en frío
       de leer los skills/entender el club de nuevo cada vez.
    3. **Paralelizar clubes DISTINTOS con subagentes** (Agent tool) — no baja tokens totales, pero sí
       baja tiempo de reloj, que es la métrica que más importa para la fecha límite.
    4. **Nunca cortar el tie-out** (`sum-check.mjs`/`node tools/audit.js`) para ganar velocidad — es
       el paso más barato de todo el pipeline y es el que atrapó los 2 errores reales de hoy (el
       dígito transpuesto de River, la línea sin atribuir de Boyacá Chicó). Cortarlo es exactamente
       donde se pierde "alta calidad" a cambio de velocidad.
    5. **Antes de prometer una fecha, cuantificar la mezcla real de los 2000 PDFs**: ¿cuántos son
       AÑOS NUEVOS de clubes que ya están en el sitio (rápido, tier 0 ya cubre la mayoría) vs.
       CLUBES/PAÍSES 100% nuevos (lento, sourcing sigue siendo 100% Claude, ninguna tool de hoy lo
       resuelve)? La respuesta cambia la estrategia entera — no evaluado todavía.

85. RECORRER EL PROCESO DE ONBOARDING PUNTO POR PUNTO Y VER QUÉ SE PUEDE HACER MÁS EFICIENTE Y/O
    DELEGAR A OTRA IA (pedido de Guido, 2026-09-27: *"ya sé que hay uno o dos puntos de JEV, ponelo
    como otro punto"* — distinto de 36 y 74, que son específicos a categorizar rubros con JEV). Esto
    es más amplio: repasar CADA paso de la cadena completa — sourcing → descarga → transcripción
    (Mistral/Gemini/Tesseract/Claude, ver CLAUDE.md "Cada PDF nuevo") → mapeo a categorías
    (`club-data-mapping`) → verificación de tie-outs → publicación — y para cada uno preguntarse: ¿ya
    está en su costo/velocidad óptima?, ¿hay una herramienta o modelo más barato/rápido que lo que se
    usa hoy (no solo JEV, cualquier API o modelo especializado)?, ¿es un paso que de verdad necesita
    criterio humano/Sonnet o es mecánico? `Admin/COMO-CORRE-EL-PROYECTO.html` (recién reordenado en
    la Versión 251) documenta el flujo completo tal cual corre hoy y es el punto de partida natural.
    Resultado esperado: no un cambio de código, sino una lista de candidatos a to-do nuevos (uno por
    paso que valga la pena optimizar), para que Guido priorice cuáles perseguir.

89. LEER EL DOCUMENTO FUENTE COMPLETO ES CARO, PERO ABARATARLO TIENE UN RIESGO YA CONFIRMADO
    (candidato del to-do 85, 2026-09-27). Los 6 balances de Almagro (~170 KB) se leyeron completos
    para extraer ~15-20 líneas de rubros por año — la mayor parte de cada documento (nómina de
    comisión directiva, dictamen de auditoría, certificación literal) no aporta ningún dato a
    cargar. Explorar si un recorte previo (anclas tipo "ESTADO DE RESULTADO"/"ANEXO II/III/IV/V")
    puede ahorrar ese contexto sin perder nada. **OJO CON EL RIESGO, ya se vio en esta misma
    sesión**: los totales que se armaron con un `grep` rápido (en vez de leer completo) para
    2021-2023 de Almagro resultaron ser el número EQUIVOCADO ("RESULTADO DEL EJERCICIO" operativo en
    vez de "RESULTADO FINAL" post-financiero) — el error se detectó solo porque el agente de todos
    modos tuvo que leer el documento completo para categorizar las líneas. Cualquier recorte que se
    explore tiene que conservar ese mismo nivel de verificación (ej. un chequeo posterior más barato
    que confirme que el recorte no se comió una fila que cambia el resultado final), no ahorrar
    tokens a costa de volver a exponerse a ese error.

108. TERMINAR DE VALIDAR TODO EL INVENTARIO DE `.md` LEGADO (pedido de Guido 2026-09-29: "TODO ES TODO lo
    legado", sin orden de prioridad por club). Estado tras los 2 pilotos (21 docs, todos `listo`): quedan ~1.436
    documentos entre `revisar` y `pendiente-segunda-voz` (ver `node tools/inventario-transcripciones.mjs`).
    1. Correr `node tools/pipeline.mjs --ejecutar` (50 documentos por corrida; `--limit N`, `--limit 0` = todos), mirar el resumen, y
       seguir en tandas (se puede cortar y retomar). Costo REAL del piloto de 44 documentos: $13,99 (~$0,32 por documento, el doble de
       lo estimado): para el inventario completo esperar del orden de $450, no $350. Medir en qué camino se va la plata antes de correr todo.
    2. Regenerar el registro después de cada tanda (`node tools/inventario-transcripciones.mjs`) y mirar los
       `revisar` que queden (sin consenso entre voces: resolver contra el PDF) y los `reserva`.
    3. INTEGRAR al onboarding: `tools/onboard.mjs` hoy valida con `compare-transcripts` (rubro por rubro); el
       resolver valida por página y por número con mucho menos Claude. Unificar en un módulo compartido para que
       un PDF nuevo pase por el mismo criterio que el inventario. Después actualizar `CLAUDE.md` ("Cada PDF
       nuevo") y proponerle a Guido el texto para `club-or-year-onboarding` y `club-data-mapping` (no editar
       skills sin su ok).
    3b. **Etapa 5 (cargar el ejercicio al sitio por script), decisiones de Guido 2026-09-30**: la idea completa del pipeline es empezar en un PDF y
       terminar con el club cargado. Empezar por un modo "propuesta" (arma qué escribiría, sin tocar nada) para el caso fácil: club que YA tiene
       `data/<club>-data.js`, año nuevo. Se aplica solo si: el chequeo de sumas cierra exacto contra los totales impresos; cada rubro tiene
       categoría por precedente exacto, o por Jev con confianza >= 0,90 (aceptado por Guido); el tipo de cambio sale del documento o de una
       cotización conocida; y después de escribir pasan los generadores, `node tools/audit.js` (0 P0/P1) y `auditAll()` (si algo falla, se revierte).
       Lo dudoso pasa a Claude por API (dólares, no tokens de sesión) y, si sigue dudoso, a `Admin/dudas-por-club.md`. Commit local; el push es de Guido.
       **Medición 2026-09-30 (`node tools/proponer-carga.mjs --backtest --mistral-fresco`, Admin/tests/test-proponer-carga.md)**: sobre 40 ejercicios ya cargados, con un
       `.md` de Mistral con tablas: arma propuesta 88%; total de ingresos oficial detectado 14%; resultado del ejercicio 17%; dinero bien ubicado por categoría (solo Jev >= 0,90)
       67% ingresos / 60% gastos. La carga sola todavía NO es viable. Lo que sigue: detectar los totales impresos por el chequeo de sumas de cada tabla (no por
       palabras de la etiqueta), elegir la tabla y la columna del ejercicio con más cuidado, y medir de nuevo; recién con el 90% de totales detectados vale la pena dejarla escribir.
       **Se acepta subir un club-año con solo el total de ingresos** (es mejor que nada), aunque no tenga desglose. Los documentos `sin-rubros`
       tienen el `.md` validado y siguen disponibles como fuente; falta detectar cuáles traen un total usable.
    3c. **REEMPLAZADO POR "EL PROCESO NUEVO" (Versión 324, 2026-10-01)**: la selección de filas por palabras de 3b reproduce 7-11% de lo
       cargado; se diseñó con Guido y se construyó localizar -> validar -> extraer -> verificar con cola humana (`tools/lote.mjs`,
       `tools/cola.mjs`). Detalle, riesgos y lo que falta construir: `Admin/PIPELINE.md`. Siguiente paso: el
       lote 01 (`node tools/lote.mjs --lista Admin/lote-01.txt`, ~US$ 0,8), refinando en lotes de 5.
    4. Los 1.192 PDFs SIN ningún `.md` son otro trabajo (`node tools/onboard.mjs --all`), no entran acá.
    5. Nota: los `.md` viejos re-hechos quedan con su original en `<nombre>.previo-<motor>.md` (gitignoreado).
