# TODO — finance-of-sports

Lo que falta hacer. **Esta es la única lista oficial de próximos pasos del proyecto.**
No la dupliques en `Admin/CHANGELOG.md` ni en `Admin/finance-of-sports-project.md`, que son historia,
ni en el comentario de ningún archivo de código.

## Cómo leer esta lista

- **Los números son IDENTIFICADORES, no prioridad.** Se conservan de la lista vieja (la
  que vivía en el comentario de `index.html`) porque los puntos se citan entre ellos y
  desde los skills: "ver to-do 20(h)" tiene que seguir apuntando a lo mismo. Por eso hay
  huecos: son los puntos que se resolvieron o se descartaron. Un punto nuevo toma el
  número siguiente al más alto, nunca uno libre.
- **La prioridad es el ORDEN en que están escritos**, de arriba hacia abajo.
- **Un punto resuelto se BORRA de acá.** Su historia ya queda en `Admin/CHANGELOG.md` y, si
  ameritaba el porqué, en `Admin/finance-of-sports-project.md`. Antes se dejaban marcados como
  "RESUELTO" y la lista terminó con la mitad de los puntos siendo cosas ya hechas.

Sacados el 2026-09-14 por decisión de Guido, para que quede el registro de que no se
perdieron sino que se descartaron:

- **Buscar y cargar ejercicios que faltan de un club** (Racing/River, y Boca): no es una tarea de
  lista, es trabajo normal de onboarding.
- **Mercado de Pases**: fuera de alcance por ahora.
- **Los 6 puntos de sourcing y onboarding por país** (eran 12 a 18: los PDFs argentinos ya
  descargados sin cargar, Ecuador, la pista de OMPIC en Marruecos, el ejercicio 2024 de Club
  América, los 5 brasileños con PDF listo, los años extra de España, y el barrido colombiano).
  Mismo criterio que el primer punto: buscar y cargar documentos es el trabajo del proyecto, no
  una lista de pendientes. **No se perdió nada**: qué hay descargado y qué falta de cada club vive
  en `fuentes/<País>/<Club>.md` y en el índice de su país `fuentes/_indice/<País>.md`, que es donde se mira antes
  de empezar; las preguntas abiertas que dejaron (el tipo de cambio doble de Ollamani, el PAT de
  Once Caldas, las 3 cifras de Deportes Tolima, el presupuesto por año calendario de Instituto)
  están en `Admin/dudas-por-club.md` y en el archivo de fuentes de cada club.
- **El dominio y el repo** (era 7). Ya está hecho: el repo de GitHub se llama
  `guidomamone/finance-of-sports` (el nombre viejo redirige) y los push siguen llegando, así que
  Netlify quedó bien linkeado. Lo único de ese punto que había que no perder — que la línea
  `finance-of-sports/` del `.gitignore` del sitio profesional es lo que mantiene separados los dos
  repos — se movió a `CLAUDE.md`, que se lee en cada sesión, que es donde sirve.
- **Los 3 cards de presupuesto en un tab propio** (era 10): era un "evaluar si vale la pena", y la
  respuesta es que no.
- **Adelgazar el payload eager de `data/`** (era 22(d)). Decisión de Guido del 2026-09-20, sobre
  mediciones: sacar `reportingCurrency`/`fiscalYearStart` de `clubs.js` ahorra **3,0 KB comprimidos
  a 1000 clubes**, y acortar los `reportType` de `club-index.js` ahorra **60 bytes**, contra un
  refactor que toca el selector para todos los visitantes. No rinde. Las mediciones completas y qué
  haría falta para reabrirlo están en las notas del punto 3 de `Admin/Archive/PLAN-REMEDIACION-ESCALA.md`. La
  mitad que SÍ rendía de ese punto (`club-leagues.js`) se hizo en la Versión 164.
- **El corte free/paid y el paywall** (eran 5 y 6). Decisión de Guido del 2026-09-14: **por ahora
  el sitio va todo gratis**. No hay corte que definir ni cuentas/suscripciones que construir, así
  que no son pendientes. El día que se revise, la arquitectura ya charlada está en
  `Admin/finance-of-sports-project.md` (sitio estático + capa mínima de backend: Supabase para auth y estado
  de suscripción, Netlify Functions para el webhook de pagos; no migrar a Next.js).

---

## Qué hay que hacer

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

101. CONFLICTOS DE CATEGORIZACIÓN REALES, ENCONTRADOS PROBANDO `tools/suggest-category-precedent.mjs`
    CONTRA LOS 162 CLUBES (2026-09-28, ver to-do 98). Mismo rubro, mismo lado (ingreso o gasto),
    categoría DISTINTA entre ejercicios del MISMO club — no es un bug de la tool (ya separa
    ingreso/gasto), es una inconsistencia real que quedó en los datos ya cargados. Revisar cada uno
    contra el documento fuente y unificar (o dejar documentado por qué el cambio de categoría entre
    años es correcto, si lo es):
    - **Argentinos Juniors** (gasto): "Estadio y predios" -> `match_organisation_expense` en 2015,
      `admin_general_expense` en 2019.
    - **Estudiantes LP** (gasto): "Reconocimientos y premios" -> `match_organisation_expense` en
      2022/2023/2024, `wages_squad` en 2025.
    - **San Lorenzo** (gasto): "Subsedes" -> `admin_general_expense` en 2011, `other_expenses` en
      2014.

    **Además, un FALSO positivo de la propia tool, no un conflicto real**: Mallorca marcó
    "Otros gastos de gestión corriente" (2025) en conflicto, pero son 2 rubros DISTINTOS del
    documento ("Otros gastos de gestión corriente" y "Otros (gastos de gestión corriente)") que
    `normalize()` colapsa al mismo texto por sacar los paréntesis — la categorización de Mallorca en
    sí está bien, es la tool la que los confunde. Si se repite este patrón, evaluar si `normalize()`
    necesita distinguir texto entre paréntesis en vez de descartarlo.

102. RIVER (Ejercicio 2024, YA PUBLICADO): "Fútbol Profesional" está entero en
    `lump_football_operations`, con sus 4 sub-ítems reales (Venta de jugadores, Televisión,
    Publicidad, Torneos) enterrados solo como `items` — encontrado 2026-09-28 onboardeando el
    Ejercicio 2021 del mismo club (misma estructura de documento, Anexo VII), NO corregido a
    pedido de Guido ("si es un error en producción, abrí un to-do para que se revise/evalúe/
    corrija en el futuro, no lo toques ahora"). Es el mismo patrón que SKILL.md sección 1 ya
    describe con el ejemplo de Racing (Versión 32): esos 4 conceptos tienen categoría REAL
    distinta entre sí (`player_sales`/`broadcasting`/`sponsorship_commercial`/`competition_bonus`),
    no son un bolsón sin desglosar — así que `sumCat()`/`computeYearGeneric()` hoy muestran
    Televisión/Publicidad/Venta de jugadores en $0 en Formato Simplificado para River, que es el
    club más visitado del sitio. Los montos exactos (ya verificados, listos para copiar si se
    decide corregir) están en el comentario de `riverRevenueLinesByYear[2024]`,
    `data/river-data.js` — los mismos 4 valores que hoy viven como `items` de la línea "Fútbol
    Profesional". El Ejercicio 2021 (cargado en esta misma sesión) usa el MISMO criterio que 2024
    (lump, no promovido) a propósito, para no quedar inconsistente entre años mientras esto no se
    decide — si se corrige 2024, corregir 2021 en el mismo movimiento.

106. EVALUAR SI CONVIENE CAMBIAR EL DEFAULT MISTRAL→GEMINI PARA ESCANEOS, CON UNA MUESTRA MÁS
    AMPLIA (sigue del to-do 103, cerrado 2026-09-28 con un resultado más grave de lo esperado).
    El caso puntual que disparó el 103 (River Ejercicio 2021, "Amortización de software") se corrió
    de punta a punta: Gemini transcribió la celda BIEN a la primera ($12.326.234, confirmado con
    zoom sobre el PDF y con `tools/sum-check.mjs` contra el subtotal de la fila — cierra EXACTO).
    Mistral la tuvo mal, pero **la corrección a mano de una sesión anterior también estaba mal**
    ($12.326.254, un segundo error de transcripción/lectura que nadie detectó porque el tie-out de
    esa sesión dio "$20 de diferencia residual" y se lo atribuyó al documento en vez de sospechar de
    la propia corrección) — ya arreglado en `data/river-data.js`, ver Versión 297 de
    `Admin/CHANGELOG.md`. Es una sola celda de un solo documento, no la comparación "en general"
    que pedía el 103 original: antes de cambiar el DEFAULT de `CLAUDE.md`/`club-data-mapping/SKILL.md`
    sección 15, correr el mismo head-to-head (Mistral ya cargado vs. `node tools/gemini-transcribe.mjs`
    corrido aparte) contra varios de los documentos que Mistral marcó como escaneados
    (`Admin/mistral/resultados.jsonl`, campo `scanned`), no solo uno.

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
       5. **TODAVÍA NO conectado a ningún skill** (a pedido explícito de Guido) -- ya se cubrió la
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

23. NUEVO (Versión 137, lo que dejó abierto el selector jerárquico + la comparación). ACTIVO,
    prioridad de Guido (2026-09-29: "me interesa, mantenelo abierto, no pausado"):
    (d) DEFLACTORES. El aviso de "ejercicios de años distintos" explica el problema (cada
        ejercicio se convierte a USD con el tipo de cambio de su propio documento, sin ajustar
        por inflación), pero no lo arregla. Arreglarlo de verdad es una serie de deflactores por
        moneda y año. Decisión de Guido si se abre.
    TECHO DEL MODELO, no tarea: la taxonomía es de fútbol (`player_sales`, `wages_squad`,
    `youth_football`) y las pestañas Pases/Resultados/Títulos y `gestionesByClub` también. Un club de
    otro deporte entra hoy con media taxonomía vacía y 3 pestañas sin sentido.

97. EL PIPELINE DE TRANSCRIPCIÓN (Mistral/Gemini) NO ACTUALIZA NINGÚN INVENTARIO — evaluar si
    conviene que lo haga (pregunta de Guido, 2026-09-28). Lo que hay hoy: `tools/mistral-ocr-
    transcribe.mjs` y `tools/gemini-transcribe.mjs` solo appendean a `Admin/{mistral,gemini}/
    resultados.jsonl` y `fallidos.jsonl` (qué PDF se transcribió, costo, tiempo) — ninguno de los 2
    toca `Admin/inventario-pendiente.md`, que es el archivo que responde "¿qué hay transcripto y
    todavía no cargado al sitio?". Y ese archivo lo dice él mismo en su cabecera: es **"una FOTO, no
    un archivo vivo"**, armado a mano el 2026-09-25 (barrido de filesystem + 2 agentes Explore) — hoy
    ya está desactualizado: desde entonces se sumaron Grecia, Italia, Noruega, México, Boyacá Chicó,
    Once Caldas y Estados Unidos, nada de eso reflejado ahí. EVALUAR (no construir todavía): ¿conviene
    que los 2 scripts actualicen el inventario (o un archivo más chico/estructurado) cada vez que
    escriben un `.md` nuevo, en vez de depender de un barrido manual que se desactualiza en días?
    CONTRA A PESAR: el archivo actual también cruza contra `Admin/ESTADO-clubes.md` y las cabeceras de
    `data/<clubId>-data.js` para saber qué YA está CARGADO (no solo qué está transcripto) — un update
    automático del lado de la transcripción sería solo la mitad de la foto.

96. EL CTA DE FINANZAS CON 2+ CLUBES ELEGIDOS SIGUE GENERANDO CONFUSIÓN, AUNQUE YA TIENE UNA
    ACLARACIÓN (reportado por Guido, 2026-09-28: *"el selector me deja seleccionar dos equipos o más
    pero al final dice 'ver los números de X'... es confuso, no queda claro si va a terminar viendo
    todos los clubes seleccionados o solo el que dice el botón"*). CHEQUEADO EN VIVO antes de anotar
    esto: `js/selector.js` línea ~1386 (Versión 106, 2026-09-16, commit `7450c93`) YA tiene, con 2+
    clubes y camino "Finanzas": un texto arriba del botón ("Finanzas muestra un club por vez, así que
    vas a ver el primero. Para verlos juntos está Comparar") Y el botón nombra el club exacto ("Ver
    los números de Almagro", no un "X" genérico) — confirmado en local, debería verse igual en
    producción. O sea, la ambigüedad LITERAL ya no existe tal cual — pero Guido la sintió de todos
    modos usando el sitio real, así que la aclaración no está funcionando en la práctica. Hipótesis a
    evaluar, sin asumir cuál es: (a) jerarquía visual invertida — el texto aclaratorio es chico/gris,
    el botón es grande/azul, y se lee el botón primero; (b) 2 botones de peso similar (uno primario
    para 1 club, uno secundario para "llevar los N a Comparar") no resuelve la pregunta real, que es
    ANTES de llegar a esta pantalla. ANTES DE TOCAR CÓDIGO: preguntarle a Guido en qué pantalla/
    dispositivo vio la confusión (para descartar mobile o una versión vieja en caché, ver CLAUDE.md
    gotchas de caché) y qué jerarquía visual preferiría.

95. EVALUAR UN ARCHIVO DE REFERENCIA CON QUÉ LIGA/TEMPORADA JUGÓ CADA CLUB CADA AÑO, EN VEZ DE
    BUSCARLO ONLINE CADA VEZ (pedido de Guido, 2026-09-28). Mismo patrón que el to-do 91 (FX/
    brandColor, ya cerrado y andando): hoy, para completar `data/club-leagues/<iso2>.js` (SE EDITA A
    MANO, ver su propia cabecera) el paso de onboarding busca online en qué liga/división jugó el
    club ese ejercicio — una búsqueda puntual por club-año que se repite cada vez, en vez de consultar
    un archivo local. Evaluar precargar esto para TODOS los clubes que ya tenemos en PDF (sourceados o
    cargados) desde una fuente pública (candidatos: RSSSF, tablas de temporada de Wikipedia, alguna
    API de datos de fútbol tipo TheSportsDB). Misma arquitectura que el 91: archivo de referencia
    FUERA de `data/` (no eager, no se sirve al visitante), consultado local antes de salir a buscar.
    EVALUAR ANTES DE EJECUTAR: cobertura real de la fuente elegida para ligas chicas/países con menos
    visibilidad (punto débil ya conocido de RSSSF/Wikipedia fuera de las ligas grandes), y que esto no
    reemplaza la verificación humana del ascenso/descenso al cierre exacto del ejercicio — solo evita
    la búsqueda repetida, mismo criterio que ya se estableció para el 91.

    **EVALUADO 2026-09-28, primera pasada equivocada — CORREGIDO el mismo día por Guido.** La primera
    evaluación miró la página del CLUB (sin tabla temporada-por-temporada para un club chico) y RSSSF
    (encoding roto, formato inconsistente) y concluyó que un scraper no alcanzaba. Estaba mirando las
    fuentes equivocadas: la página de la TEMPORADA en Wikipedia (ej.
    `2025–26 Premier League`, no la del club) SÍ tiene una tabla "Teams" en wikitext estándar de
    MediaWiki, consistente entre países — confirmado bajando el roster real de Colombia 2016 (20
    equipos, incluido Boyacá Chicó) y Noruega 2019 (16 equipos, incluido Lillestrøm).

    **SÍ SE CONSTRUYÓ, pipeline de 3 tools, probado de punta a punta**:
    1. `tools/resolve-wikipedia-season-page.mjs "<liga>" <año>` — encuentra el título exacto de la
       página de esa temporada (la convención varía por liga, sin fórmula única) vía la API de
       búsqueda de Wikipedia. No auto-elige el resultado #1: un nombre ambiguo (ej. "Premier League")
       trae también la canadiense, la rusa, la israelí — hay que confirmar cuál es.
    2. `tools/fetch-club-league-reference.mjs "<título>" <leagueId> <año> --pais <iso2>` — baja el
       wikitext (no HTML renderizado, no un resumen de modelo) y guarda el roster completo en
       `tools/club-league-reference/<iso2>.json`. Si no encuentra tabla parseable, no escribe nada.
    3. `tools/lookup-club-league.js "<club>" --pais <iso2>` — busca por NOMBRE (no por `clubId`: la
       mayoría de estos clubes todavía no están onboardeados) contra los rosters cacheados.

    Sigue sin ser fuente de verdad: `data/club-leagues/<iso2>.js` sigue a mano, con su nota de cómo se
    confirmó cada club-año. Esto solo evita repetir la búsqueda de una liga-temporada ya resuelta.
    Detalle completo en `tools/club-league-reference/README.md`.

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

82. EVALUAR SI EL FUNNEL DE SOURCING DEBERÍA TENER ARISTAS ESPECÍFICAS POR PAÍS, en vez de una
    escalera única para todos (pedido de Guido, 2026-09-27, generalizando la distinción que motivó
    separar los to-dos 80 y 81: Reddit rinde en países angloparlantes y no en LatAm, mismo patrón
    ya visible en la escalera de `.claude/skills/club-sourcing/SKILL.md` 0.1, donde la familia 2
    —regulador— ya varía radicalmente por país (CMF en Chile, SIIS en Colombia, IGJ bloqueada en
    Argentina, nada documentado en Perú). La pregunta a resolver: ¿conviene formalizar un mapa
    explícito país → ángulos-que-rinden (qué redes sociales, qué tipo de sitio de hinchas, qué
    idioma de búsqueda) en vez de que cada sesión lo redescubra sola? Es una pregunta de arquitectura
    del skill, no una herramienta puntual — pensarla junto con Guido antes de tocar
    `club-sourcing/SKILL.md` (mismo criterio ya establecido: no editar el skill sin avisar).

93. EVALUAR SI ARGENTINA AMERITA UN ARCHIVO PROPIO EN `paises/` (pedido de Guido, 2026-09-27, al
    notar que el piloto de Reddit del to-do 81 no tuvo dónde anotar el hallazgo para los clubes
    argentinos: `paises/Argentina.md` no existe, porque la sección 0 de `SKILL.md` dice que "fuera
    de Argentina, el criterio ya es distinto" y la deja afuera del esquema país-por-país. La
    pregunta a resolver: ¿ese criterio separado sigue siendo correcto ahora que Argentina también
    empieza a acumular hallazgos del tipo "qué ángulo rinde y cuál no" (Reddit, y potencialmente
    Twitter/X del to-do 80), o conviene darle su propio archivo igual que a los demás países para
    tener dónde guardarlos? Ligado al to-do 82 (arquitectura del funnel por país) pero es una
    pregunta más chica y puntual. Sin evaluar todavía.

100. RESTOS SIN CERRAR DEL EX TO-DO 73 (el núcleo — cargar los 2 balances de Boca vía Wayback CDX —
    se cerró en la Versión 289; esto es lo que quedó afuera de esa carga, separado a un número propio
    para no perderlo bajo un to-do que ya figura como resuelto). River: un balance del ejercicio
    cerrado 31/08/2016 (más viejo que cualquiera de los ya cargados) apareció en Scribd, detrás de
    una suscripción paga — decisión de Guido si vale pagarla, mismo criterio que el trámite de la IGJ
    ya documentado en `fuentes/Argentina/River.md`. Boca: quedan sin encontrar los ejercicios 2018,
    2019, 2021 y 2024 — no aparecieron ni en el barrido de dominio completo de Wayback CDX del
    2026-09-26. Detalle en `fuentes/Argentina/Boca.md`.

59. REVISAR ATLANTA, ALL BOYS Y OTROS DEAD-ENDS DEL BARRIDO POR SI CONVIENE UN RECLAMO DIRECTO AL
    CLUB (no es sourcing nuevo, es decidir si vale la pena escribirle a alguien — se beneficia del
    to-do 51, proceso de email a clubes). **El barrido de los 40 clubes tradicionales (Versión 246,
    2026-09-26) sumó ~20 candidatos más al mismo patrón** (documento confirmado por
    prensa o asamblea, nunca publicado) — el detalle de cada uno vive en su
    `fuentes/Argentina/<Club>.md`, no repetido acá. **EN PAUSA hasta 2026-09-30 (decisión de Guido, 2026-09-26)**:
    el pipeline (51) está probado de punta a punta pero todavía no se usó con ningún club real — no
    retomar antes de esa fecha. Casos concretos que salieron del barrido del 2026-09-22:
    Atlanta tenía 4 balances reales (2013-2016) en Drive, hoy con el compartir revocado — pedirle al
    club que los vuelva a compartir es gratis y rápido. Banfield tiene el 105° Ejercicio (2024-25)
    aprobado pero solo publicado en video de YouTube, nunca como PDF. Independiente tiene el
    Ejercicio N°121 (2024-25) aprobado en asamblea el 26/11/2025 (prensa reportó sus cifras) pero sin
    PDF propio publicado en ningún canal — solo existe como columna comparativa reexpresada dentro
    del documento del N°122 (2025-26, ya cargado, Versión 209), que Guido decidió no usar como fuente
    del 121 (ver `Admin/dudas-por-club.md`). Ver el detalle completo en `fuentes/Argentina/Atlanta.md`,
    `fuentes/Argentina/Banfield.md` y `fuentes/Argentina/Independiente.md`.

99. JEV PARA CATEGORIZAR RUBROS — FUSIÓN DE LOS EX TO-DOS 74 Y 36 (2026-09-29, a pedido de Guido:
    eran el mismo backtest escrito en 2 lugares — 36 traía el gate de integración por volumen, 74 el
    pedido de correrlo ya que la key está lista). PLAN DE ACCIÓN:

    **Por qué el backtest original (contra Boca/River/Racing ya categorizados) no alcanza**: son
    casos FÁCILES — vocabulario argentino de fútbol, ya resuelto, sin ambigüedad real. Mide si JEV
    puede REPETIR una decisión ya tomada, no cómo maneja el caso que el propio análisis original ya
    marcaba como el punto débil: "la primera vez que aparece un rubro nuevo o un club/país nuevo".

    **Idea de Guido que mejora el test, 2026-09-29**: en vez de (o además de) el backtest contra
    ejercicios ya cargados, onboardear 2-3 clubes REALES de la cola de sourcing, elegidos a propósito
    diversos — mínimo 2 países de fútbol distintos entre sí y de Argentina (vocabulario/régimen
    contable distinto: candidatos ya transcriptos, Grecia/Italia/Noruega/Boyacá Chicó), más 1 caso de
    OTRO DEPORTE si hay uno ya transcripto (Green Bay Packers, EE.UU. — con la salvedad de que
    `category-map.js` es taxonomía 100% de fútbol, ver to-do 23: acá el test mide algo extra y útil,
    si JEV devuelve confianza baja/honesta cuando el rubro no encaja en NINGUNA categoría existente,
    o si fuerza un match con confianza alta igual — ese segundo caso es el falso positivo peligroso).

    **Mecánica**: (1) elegir los 2-3 club-ejercicios; (2) correr JEV sobre la lista de rubros de cada
    uno (categoría + confianza) ANTES de que la sesión de `club-data-mapping` los categorice, sin que
    esa sesión vea el resultado de JEV primero (no contaminar el criterio humano con la sugerencia);
    (3) la sesión categoriza normal, como cualquier onboarding; (4) comparar rubro por rubro, JEV vs.
    categorización real, separado por nivel de confianza de JEV — la pregunta que importa es si algún
    caso de CONFIANZA ALTA salió mal, no el acierto promedio; (5) documentar en `Admin/test-jev.md`
    (mismo patrón que `test-costo-transcripcion.md`/`test-barridos.md`).

    **Lo que NO cambia**: el gate de integración real (conectar JEV al flujo de onboarding para que
    decida solo, sin que Claude revise cada rubro) sigue esperando a los **200 clubes cargados** (hoy
    162) — a este volumen, categorizar a mano sigue siendo más rápido que integrar y VALIDAR una API
    nueva. Este test es sobre VALIDAR la herramienta con datos reales, no sobre conectarla ya. Si el
    resultado es bueno, define de una vez el umbral de auto-aceptación para cuando se llegue a 200.

    Pipeline de 3 pisos si se integra más adelante (sin cambios respecto a la idea original): JEV
    clasifica cada rubro → confianza alta se acepta automático → confianza baja pasa a Sonnet con el
    contexto completo del club → si Sonnet tampoco está seguro, cae en `Admin/dudas-por-club.md` como
    ya pasa hoy.

51. PROCESO DE EMAIL A CLUBES — EN CONSTRUCCIÓN, ETAPA 1 (rediseñado 2026-09-24, decisión de Guido
    tras comparar alternativas: Gmail/MCP, APIs transaccionales, no-code, agentes dedicados). El
    diseño original de este punto ("Claude redacta, Guido aprueba en el chat, envío por Gmail")
    quedaba pegado para siempre a confirmar cada mail uno por uno — es una regla de la plataforma de
    chat, no de Gmail, y ningún scope de conector la evita. La salida es sacar el paso de ENVÍO
    (nada más) afuera de cualquier sesión de chat: Resend + subdominio propio + una cola de
    archivos que Guido revisa, con el envío disparado por Guido desde su propia terminal. Proceso
    completo documentado en `.claude/skills/club-outreach/SKILL.md` (skill nuevo). Arranca directo
    en la Etapa 1 de ese diseño (sin regla de disparo automática todavía, Guido sigue decidiendo
    cuándo escribir) — la Etapa 0 (statu quo manual) se salteó a pedido de Guido.

    **Infraestructura, estado real:** (a) ✅ cuenta en Resend creada 2026-09-24 (conectada con
    GitHub, sigue en free por ahora); (b) ✅ subdominio `outreach.financeofsports.com` verificado
    2026-09-24 (DNS en Netlify DNS — DKIM, SPF vía 2 CNAME, DMARC `p=none` en `_dmarc.outreach`, no
    en la raíz); (c) `Receiving` activado (MX agregado, propagación confirmada por `dig` desde 3
    resolvers distintos) — el dashboard de Resend tardó en reflejarlo como verificado pero la
    infraestructura ya estaba bien; (d) ✅ API key generada y en `Admin/outreach/.env`
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

50. LEADS DE SOURCING DE COLOMBIA Y MÉXICO. Resumen 2026-09-29: SIIS Colombia y León/Pachuca ya
    resueltos, Pumas/Tigres descartado por decisión de Guido, quedan 2 hilos de puro monitoreo, sin
    acción pendiente de nadie hasta que algo externo cambie:
    - ✅ **SIIS Colombia**: Boyacá Chicó suma 2021-2025 (8 ejercicios en total), Once Caldas suma
      2021-2024 (serie completa 2016-2025). Bucaramanga 2021 confirmado como hueco REAL de la fuente
      (la sociedad no depositó ese año), no throttling. Detalle en `fuentes/Colombia/<Club>.md`.
    - ✅ **León y Pachuca (México)**: resuelto por el to-do 75 (Firecrawl) — Pachuca sin nada
      financiero, blindado por el Art. 12 de LIGA MX; León confirmado bloqueo de IP/hosting (no WAF).
    - ❌ **Pumas y Tigres (México), descartado (decisión de Guido, 2026-09-29): "elijo no hacerlo, me
      da igual".** Las 2 solicitudes de transparencia (UNAM/UANL) estaban redactadas pero nadie las
      va a presentar. No retomar salvo que Guido cambie de opinión.
    - **León se está vendiendo, sin cerrar todavía** (último chequeo 2026-09-28): plazo hasta 2027,
      ~130 propuestas recibidas. Candidato a vigilar: si el comprador es un vehículo que cotiza en
      bolsa (ej. Apollo Global Management, NYSE `APO`), se abre la ventana Ollamani. Puro monitoreo,
      rechequear cuando cierre la operación — nada que hacer hoy.
    - **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos
      Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la
      Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón
      "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos.
      Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de
      alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene
      contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL,
      Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una
      decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno
      de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando
      sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta
      que Guido decida.

34. LO QUE DEJÓ ABIERTO EL MERGE DEL SELECTOR (Versiones 143-155, 2026-09-17). ACTUALIZADO
    2026-09-28 con lo que cambió desde entonces en features relacionadas (to-dos 70 y 83). Ninguno
    es un bug: son decisiones a propósito, revisadas ahora que hay más uso.

    (a) **MÓVIL, más allá de que entre.** Sin cambios: sigue sin diseñarse la experiencia en
        teléfono (solo verificado que no rompe a 375px). Decisión de Guido durante el
        prototipado: primero desktop.

    (b) **NO HAY GRUPOS GUARDADOS dentro del constructor de mezcla.** Sigue sin existir tal cual.
        Parcialmente mitigado por "Saved Searches" (to-do 70, cerrado): cualquier comparación
        TERMINADA se guarda sola y se puede reabrir desde la cuenta, así que no hace falta
        rearmar "mis 6 brasileños" si ya se armó una vez. Pero sigue faltando un grupo REUSABLE
        para mezclar en una comparación DISTINTA a la que se guardó — son cosas distintas.

    (c) **UN BLOQUE DE CLUBES EN LA MEZCLA TIENE UN SOLO AÑO PARA TODO EL BLOQUE.** Sigue igual
        en el constructor de Comparar. Dato nuevo: el patrón "año editable por club" SÍ se
        construyó, pero en otro lugar del sitio (Ligas, to-do 83, Versión 285) — al sumar un
        club suelto a un ranking de liga, su año es un dropdown editable. El mismo patrón
        podría portarse a Comparar si hiciera falta; no está hecho ahí todavía.

    (d) **EL APORTE DE CADA BLOQUE NO SE MUESTRA EN EL CONSTRUCTOR.** Sigue igual en Comparar.
        Confirmado en la práctica que reusar rankings precalculados (en vez de bajar cada club)
        SÍ es viable sin costo: to-do 83 lo implementó para "sumar una liga entera" en Ligas
        (Versión 285, inserta 10-20 clubes de una reusando `data/rankings/<liga>.js`). El mismo
        truco resolvería el aporte en plata de un bloque en Comparar sin bajar los 162 archivos
        de club — es el camino más barato si se retoma.

    (e) **UN LADO PUEDE SUMAR UN PROMEDIO CON UNA SUMATORIA.** Sin cambios. Decisión explícita
        de Guido: "suma peras con manzanas pero no es mi tema, yo tengo que dar la
        funcionalidad".

    (f) **LOS DATOS SIGUEN FLACOS PARA LO QUE LA INTERFAZ YA PERMITE, pero mejoró la proporción**
        (recalculado 2026-09-28 contra `Admin/ESTADO-clubes.md`): hoy 88 de 162 clubes (54%)
        tienen UN solo ejercicio cargado — mejor que el 34 de 41 (83%) de cuando se escribió
        esto. Las ligas con ranking precalculado pasaron de 8 a 22 (`data/rankings/`). Sigue
        siendo cierto que comparar 2 ligas específicas puede salir desparejo según cuántos
        ejercicios tenga cada una, pero el problema se va resolviendo solo a medida que crece
        el proyecto — no hace falta acción.


