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

70. "SAVED SEARCHES" — GUARDAR LAS BÚSQUEDAS DE CADA USUARIO EN SU CUENTA (pedido de Guido,
    2026-09-26: *"me gusta que las búsquedas que hace alguien queden guardadas como Saved Searches.
    Para eso sirve lo de que se hagan cuenta. En su cuenta van a poder ver sus saved searches."*).
    Es la primera razón de PRODUCTO concreta para que exista una cuenta de usuario en el sitio — hasta
    ahora las cuentas solo se habían charlado como mecanismo del corte free/paid (ver la entrada
    descartada "El corte free/paid y el paywall" al principio de este archivo: **decisión de Guido,
    2026-09-14, el sitio va todo gratis, sin cuentas/suscripciones**). Esto es distinto: no es un
    paywall, es que el visitante pueda volver a ver búsquedas que ya hizo. Antes de tocar código hace
    falta resolver, con Guido:
    - **Qué es exactamente "una búsqueda" acá.** El selector (`js/selector.js`) no tiene un concepto
      de "búsqueda" como objeto — hoy es una secuencia de pasos (país → club → año, o el constructor
      de mezcla con varios bloques) que termina en una vista de Finanzas o una comparación. Guardar
      "la búsqueda" probablemente signifique guardar el estado final (qué club/ejercicio, o qué
      combinación de bloques de la mezcla) de forma que se pueda RE-ABRIR después, no un historial de
      texto tipeado en el buscador (eso ya se loggea agregado, sin identificar usuario, en el Worker
      de la Versión 216 — ver to-do 67, que es telemetría propia para Guido, no algo que el usuario
      vea en su cuenta).
    - **Qué proveedor de cuentas.** El proyecto ya evaluó Supabase para auth en la charla del corte
      free/paid (ver `Admin/finance-of-sports-project.md`) — sitio estático + capa mínima de backend
      (Supabase para auth y estado, Netlify Functions si hace falta un webhook). Esa arquitectura ya
      pensada probablemente sirva de base para esto también, aunque el motivo ahora sea otro (guardar
      búsquedas, no cortar acceso) — confirmar con Guido si sigue siendo la elección o si algo cambió
      desde esa charla.
    - **Alcance de la Versión 1**: ¿guardar automáticamente cada búsqueda, o un botón explícito
      "Guardar esta búsqueda"? ¿Hay un límite de cuántas guarda cada usuario? Ninguna de las dos
      preguntas está resuelta, preguntarle a Guido antes de diseñar la tabla de datos.
    EN PAUSA, sin fecha: es una idea de producto todavía sin priorizar contra el resto de esta lista,
    dejada acá para que no se pierda — no implica que el corte free/paid deba reabrirse, cuentas sin
    paywall es una combinación nueva que este proyecto no había considerado hasta ahora.

68. PESTAÑA LIGAS: TRES MEJORAS PEDIDAS POR GUIDO (2026-09-26, mismo día que se agregó el botón
    "Volver a Ligas" y las cards por continente de `estadoFrio()` — Versión 232). Las tres tocan
    `js/liga.js`, que es el módulo entero de la pestaña. Ninguna se implementó todavía, es solo el
    pedido con contexto para que quien lo agarre no tenga que redescubrir cómo funciona el módulo.

    (a) **BREAKDOWN DE INGRESOS POR CATEGORÍA DE FORMATO SIMPLIFICADO, NO OTRAS MÉTRICAS**
        (alcance confirmado por Guido, 2026-09-26: **solo ingresos** — nada de gastos, resultado
        neto ni deuda, esos quedan afuera de este punto). Es decir: la pestaña Ligas hoy rankea
        clubes por el TOTAL de ingresos de cada uno (ver la cabecera de `js/liga.js`, "LA REGLA QUE
        ORDENA TODO ESTE ARCHIVO"); lo que falta es abrir ESE total en las categorías de "Formato
        Simplificado" que ya existen para el club individual (TV, taquilla, sponsoring, venta de
        jugadores, etc. — ver `REVENUE_CATEGORY_LABELS` en `data/category-map.js`), para que se vea
        de qué está hecho el ingreso de cada club dentro de la liga, no solo el número total.

        POR QUÉ NO ES TRIVIAL: el dato de cada liga-ejercicio no se calcula en vivo, viene
        precalculado en `data/rankings/<liga>.js` por `tools/generate-rankings.js` (ver la cabecera
        de `js/liga.js`, "DE DÓNDE SALEN LOS NÚMEROS") — el generador hoy solo extrae el TOTAL
        `revenue` de `computeYearGeneric()` (`js/finanzas-calc.js`) para cada club de la liga, no el
        desglose por categoría que ese motor ya calcula (`computeYearGeneric()` devuelve
        `revenueLines`/el breakdown por categoría en Formato Simplificado, se puede confirmar
        mirando su return). Implica: extender `tools/generate-rankings.js` para guardar también ese
        desglose por categoría, por club-año; y en `js/liga.js`, alguna forma de mostrarlo por
        club dentro de la vista de liga (candidato obvio: expandir/expandir-al-click cada barra o
        fila de la tabla para revelar su propio desglose, en vez de un selector que reemplace la
        vista entera — a confirmar con Guido el patrón de interacción exacto cuando se agarre esto,
        no asumirlo).

    (b) **% DEL TOTAL EN EL GRÁFICO DE BARRAS DE CADA CLUB**. Guido: *"quisiera que en el gráfico
        de barras de revenue de cada club haya una leyenda con el % del total."* Hoy `grafico()` en
        `js/liga.js` ya dibuja un valor arriba de cada barra (plugin `ligaValueLabels`, el número
        en M/MM USD — ver la cabecera del archivo, "EL NÚMERO VA ESCRITO ARRIBA DE CADA BARRA").
        Agregar ahí (o al lado, a definir con Guido si reemplaza o acompaña al valor en USD — su
        pedido dice "leyenda con el %", que suena a ACOMPAÑAR, no reemplazar) qué porcentaje del
        total de esa liga-ejercicio representa el club de esa barra. El total ya se calcula en
        `tabla()` (variable `total`, sumando `r.clubs`) y en `salvedades()` (variable `tot`) — se
        puede reusar esa misma cuenta en vez de recalcularla una tercera vez.

        OJO: `grafico()` la usan DOS pantallas (la pestaña Ligas y la vidriera de Inicio,
        `bloqueDestacado()`) — un cambio en el plugin de etiquetas se ve en las dos automáticamente,
        no hace falta tocarlas por separado, pero sí hay que revisar que se vea bien en el tamaño
        chico de la vidriera (260px de alto, contra 360px de la pestaña — ver los dos `alto`
        distintos que le pasan a `grafico()`).

    (c) **ORDENAR LAS LIGAS DE UN MISMO PAÍS POR DIVISIÓN (1ª, 2ª, 3ª, 4ª), NO ALFABÉTICO POR
        NOMBRE, CUANDO HAY MÁS DE UNA CARGADA**. Esto es una corrección puntual sobre lo que se
        acaba de cambiar en la Versión 232 (mismo día): la grilla de `estadoFrio()` ahora agrupa
        las ligas por continente y, pedido explícito de esa sesión, ordena alfabéticamente país y
        LIGA dentro de cada card (`ligasDePaisAlfa()`, ordena por `ligaDe(a).name.localeCompare(...)`).
        Guido revisó el resultado y corrigió: *"que se ordenen las ligas según 1ra división, 2da,
        3ra, 4ta para los casos en los que tenemos datos de más de una división del mismo país. Ojo
        que no me refiero solo al nombre de la liga, me refiero a la categoría."* — el caso real que
        lo delata: Argentina hoy sale "Primera B Metropolitana (3ª), Primera División (1ª), Primera
        Nacional (2ª)" en ese orden porque alfabéticamente "B" < "D" < "N", que se lee raro para
        cualquiera que conozca el fútbol argentino.

        EL FIX: en `ligasDePaisAlfa()` (`js/liga.js`), cambiar el criterio de orden de
        `.name.localeCompare(...)` a `LEAGUES[lid].tier` ascendente (con el nombre como desempate
        si dos ligas del mismo país compartieran tier, caso hoy inexistente pero barato de cubrir).
        `tier` ya existe en `data/leagues.js` para cada liga (1 = primera división) y es EXACTAMENTE
        lo que usaba el criterio viejo de `estadoFrio()` antes de la Versión 232 (`(A.tier - B.tier)
        || A.name.localeCompare(...)`, ver el diff de esa versión si hace falta el criterio exacto).
        NO TOCAR lo demás de la Versión 232: el agrupado por continente y el orden alfabético de
        PAÍS dentro de cada continente quedan igual — Guido corrigió específicamente el orden de
        LIGA dentro de un país, no el resto de la reorganización.

67. EVALUAR MIXPANEL PARA TRACKEAR LA SECUENCIA COMPLETA DEL SELECTOR, DESDE QUE SE ABRE HASTA QUE
    SE ELIGE UN CLUB (pedido de Guido, 2026-09-26: *"me gustaría ver cómo interactúa la gente con el
    selector"*). Solo quedó charlado en una sesión de consejo, nada de código tocado todavía ni
    cuenta de Mixpanel creada.

    POR QUÉ NO ALCANZA LO QUE YA HAY: el logging propio de la Versión 216 (Worker + KV,
    `square-sky-ca25.guidomamone91.workers.dev`, hooks en `js/selector.js`) solo cuenta hits/miss de
    término buscado y pares elegidos en Comparar — son contadores sueltos, no la secuencia de
    interacción (abrir selector → tipear/navegar → elegir país → elegir club → [elegir año]) que
    Guido quiere ver ahora. Y Cloudflare Web Analytics (Versión 166) solo mide pageviews/referrers a
    nivel de página, tampoco sirve para esto.

    LA RECOMENDACIÓN DE LA SESIÓN DE CONSEJO: Mixpanel es la herramienta correcta para un funnel de
    eventos como este. Al volumen de tráfico de este sitio, instrumentando a mano solo los pasos del
    funnel (no el Autocapture de Mixpanel, que loguea cada click/scroll de la página entera y sí
    puede inflar el conteo sin darse cuenta), el free tier (1.000.000 eventos/mes gratis, después
    USD 0,00028/evento — ver `docs.mixpanel.com/docs/pricing`) alcanza de sobra. No hace falta migrar
    ni duplicar lo que ya da Cloudflare Web Analytics (pageviews/referrers agregados, cookieless, sin
    tope): la propuesta es mantener los dos — Cloudflare para tráfico agregado, Mixpanel solo para el
    funnel del selector — en vez de que Mixpanel reemplace a Cloudflare.

    LO QUE FALTA DECIDIR/HACER, para quien retome esto: (a) confirmar con Guido qué pasos exactos del
    funnel valen la pena loguear como evento (mirar `js/selector.js` primero, no asumir la secuencia
    desde acá — el selector es jerárquico país→club→año, ver to-do 34); (b) crear la cuenta de
    Mixpanel; (c) instrumentar esos eventos puntuales en `js/selector.js` (mismo lugar que ya tiene
    los 2 hooks de la Versión 216); (d) confirmar que el snippet/SDK de Mixpanel no choca con la
    convención de `ASSET_V`/`?v=` de scripts propios (ver CLAUDE.md, gotchas de caché) si se sirve
    como script propio en vez de vía CDN de Mixpanel.

66. TEST DE COSTO/CALIDAD DE TRANSCRIPCIÓN PDF→MD: SONNET vs HAIKU vs UNA API EXTERNA (pedido
    explícito de Guido, 2026-09-26: "quiero medir token usage punta a punta de 5 clubes con vos, 5
    con haiku y 5 con una api"). Motivación: transcribir un PDF a `.md` (ver CLAUDE.md, "Cada PDF
    nuevo") hoy corre siempre con el modelo por defecto de la sesión (Sonnet, pensado para prosa/
    decisiones, no para OCR mecánico) — la sospecha es que un modelo más barato, o una API
    especializada en documentos, hace lo mismo por menos costo/tiempo sin perder precisión. Con 2047
    PDFs pendientes en `Admin/inventario-pendiente.md`, el ahorro por documento importa multiplicado.

    QUÉ SE MIDE, por corrida: costo en USD (unidad común entre proveedores — los tokens de Sonnet/
    Haiku no son comparables 1:1 contra lo que cobre una API que factura por página o por imagen),
    tiempo de reloj, y CALIDAD bajo el mismo criterio para las 3 patas (ver abajo) — nunca declarar
    ganador solo por costo si no pasó el mismo control de calidad.

    LAS 3 PATAS:
    (a) **Sonnet, como hoy** — la sesión de Claude Code hace la transcripción directamente (vía Read
        tool sobre imágenes de página, o leyendo el output de Tesseract si ya corrió, igual que
        siempre).
    (b) **Haiku 4.5** — delegarlo a un subagente del `Agent` tool con `model: "haiku"`, mismo insumo y
        misma consigna que (a).
    (c) **Una API externa especializada** — candidato default: **Gemini (2.5 Flash o 2.0 Flash, API
        de Google AI Studio)**, multimodal y barato, capaz de tomar las páginas del PDF como imagen y
        devolver el `.md` en un solo paso. **BLOQUEANTE**: hace falta que Guido tenga una API key de
        Google AI Studio antes de correr esta pata — si no existe todavía cuando se agarre este
        to-do, pedírsela primero, no improvisar con otra cosa. Alternativa si Gemini rinde mal o
        Guido prefiere otra cosa: una API de OCR dedicada (Mistral OCR, Google Document AI, AWS
        Textract) — más específica pero factura por página y probablemente necesite un paso propio
        para armar el formato final (marcas de página, tablas Markdown) que Gemini haría de un tiro.

    MISMO INSUMO PARA LAS 3 PATAS, PARA QUE LA COMPARACIÓN SEA JUSTA: correr primero el paso gratis
    de siempre (pdftotext → si no da texto real, Tesseract vía `pdftoppm -png -r 300` + `tesseract -l
    spa --psm 6`, ver CLAUDE.md y `club-data-mapping` sección 15) — esto es igual para las 3 y no
    cuenta como costo de IA. Lo que se compara es específicamente el paso de "OCR crudo/imagen de
    página → `.md` final verificado", que es donde hoy se va el token spend.

    SELECCIÓN DE LOS 15 PDFs (5 por pata): sacarlos de la Sección 1 de `Admin/inventario-pendiente.md`
    (PDFs sin transcribir), elegidos para que las 3 patas no queden con dificultad despareja —
    ordenar los 15 candidatos por cantidad de páginas (o por lo que se vea a ojo de dificultad: texto
    real vs escaneado, tablas rotadas, idioma) y repartirlos round-robin entre las 3 patas (1º a
    Sonnet, 2º a Haiku, 3º a la API, 4º a Sonnet, ...) en vez de asignar al azar sin ese cuidado.
    Preferir un cluster parejo (ej. el trío certificación+dictamen+estados financieros de Colombia,
    misma sección, mismo patrón en los 10 clubes) sobre mezclar países muy distintos entre sí, para
    que la varianza de dificultad no tape la diferencia real entre modelos.

    CONTROL DE CALIDAD, IGUAL PARA LAS 3: elegir de antemano ~15-20 cifras numéricas repartidas por
    el documento y chequearlas a mano contra el PDF original (no contra el `.md` de otra pata) — si
    alguna sale mal, el costo de corregirla (re-correr o arreglar a mano) SE SUMA al costo de esa
    pata, no se descarta. "Punta a punta" significa que una pata barata pero que necesitó varias
    correcciones manuales no gana solo por el número de tokens de la primera pasada. Si el documento
    tiene un total conocido de prensa/oficial, correr también el chequeo de `verifyTieOuts()`.

    CÓMO REGISTRAR EL COSTO: para Sonnet y Haiku, aislar el uso de tokens de esa tarea puntual (no el
    de la sesión entera — por eso conviene correr cada PDF, en las 3 patas, como su propio subagente
    del `Agent` tool, para poder leer el reporte de uso que devuelve al terminar sin que se mezcle con
    otra cosa; `mcp__ccd_session_mgmt__get_usage` es la alternativa si hace falta más detalle). Para
    la API externa, lo que devuelva el response de uso, o el precio publicado del proveedor por
    página/imagen si no reporta tokens. Convertir todo a USD al final para poder comparar.

    DÓNDE DEJAR EL RESULTADO: un archivo nuevo, `Admin/test-costo-transcripcion.md` (adentro de
    `Admin/`, no en la raíz — ver CLAUDE.md "dónde poner un documento nuevo"), con una tabla de las 15
    corridas (PDF, páginas, pata, USD, tiempo, cifras chequeadas OK/mal) y un resumen de 3-4 líneas al
    final con el promedio por pata y la recomendación. Avisar explícitamente en ese resumen que n=5
    por pata es chico — el resultado es direccional, no estadísticamente robusto — para que no se
    sobre-interprete una diferencia chica como definitiva.

59. REVISAR ATLANTA, ALL BOYS Y OTROS DEAD-ENDS DEL BARRIDO POR SI CONVIENE UN RECLAMO DIRECTO AL
    CLUB (no es sourcing nuevo, es decidir si vale la pena escribirle a alguien — se beneficia del
    to-do 51, proceso de email a clubes). **EN PAUSA hasta 2026-09-30 (decisión de Guido, 2026-09-26)**:
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

50. LEADS DE SOURCING YA IDENTIFICADOS Y SIN EXPLOTAR, DE COLOMBIA Y MÉXICO (de la Versión 202).
    Todos tienen el camino escrito, solo falta ejecutarlos:
    - **Ejercicios disponibles en SIIS que quedaron sin bajar por throttling** (Colombia): Boyacá
      Chicó 2021-2025 es el de mayor margen, más Once Caldas 2021-2024 y Bucaramanga 2021. El
      límite real es 1-2 procesos en paralelo, más que eso devuelve HTML sin PDF en silencio.
    - **León y Pachuca (México) dieron HTTP 403** a `curl`, que es bloqueo de WAF y NO dead-end
      confirmado. Vale reintentarlos desde el Browser pane.
    - **Pumas y Tigres (México)**: solicitud por la Plataforma Nacional de Transparencia a la UNAM
      y a la UANL por lo que le transfieren al club. El INAI ya obligó a la UNAM una vez
      (resolución de enero 2022), así que el precedente existe.
    - **León se está vendiendo** (80% forzado por la regla anti-multipropiedad): si el comprador es
      un vehículo cotizante, se abre la ventana Ollamani. Rechequear cuando cierre la operación.
    - **`DIABLOS` en la BMV**: Diablos Rojos del México (béisbol) cotiza desde diciembre 2024 y
      reporta trimestralmente. Es el segundo caso mexicano del patrón Ollamani y el canal ya está
      probado, pero **abre liga y deporte nuevos**: es decisión de Guido, no se hace solo.
    EN PAUSA (decisión de Guido, 2026-09-23): no es prioridad ahora, retomar más adelante sin fecha
    fija.

34. LO QUE DEJÓ ABIERTO EL MERGE DEL SELECTOR (Versiones 143-155, terminado el
    2026-09-17). Ninguno es un bug: son decisiones que se tomaron a propósito y que
    conviene revisar cuando haya más datos o más uso.

    (a) **MÓVIL, más allá de que entre.** Los dos cards apilan y el modal funciona a
        375px —verificado, sin desborde horizontal— pero nadie diseñó la experiencia
        en un teléfono. Decisión de Guido durante el prototipado: primero desktop.
        La to-do 26 (el `.header-right` a 375px) ya se resolvió (Versión 188).

    (b) **NO HAY GRUPOS GUARDADOS.** Armar "mis 6 brasileños" en el constructor de la
        mezcla se pierde al cerrar el modal. Si el caso aparece seguido, es lo primero
        que pide el modelo de bloques.

    (c) **UN BLOQUE DE CLUBES EN LA MEZCLA TIENE UN SOLO AÑO PARA TODO EL BLOQUE**
        ("el más reciente de cada uno", o un cierre puntual). El detalle
        ejercicio-por-club solo existe en la rama Clubes. Se hizo así para que cada
        fila del constructor no se volviera un formulario; si hace falta, es donde
        crece.

    (d) **EL APORTE DE CADA BLOQUE NO SE MUESTRA EN EL CONSTRUCTOR.** Dice "6
        ejercicios", no "489 M". Es a propósito: el aporte en plata obliga a bajar el
        `data/<club>-data.js` de cada club MIENTRAS elegís, que es justo lo que el
        selector evita (son 41 archivos y el sitio los carga por demanda). Hoy los
        baja recién al apretar "Comparar". Es la misma tensión que resolvió el to-do 33
        (Versiones 182-184) precalculando `data/rankings/<liga>.js`: si el aporte de cada
        bloque hiciera falta, la salida probablemente sea la misma, no bajar los clubes.

    (e) **UN LADO PUEDE SUMAR UN PROMEDIO CON UNA SUMATORIA.** Se avisa en pantalla,
        no se prohíbe. Decisión explícita de Guido: "suma peras con manzanas pero no
        es mi tema, yo tengo que dar la funcionalidad".

    (f) **LOS DATOS SON FLACOS PARA LO QUE LA INTERFAZ YA PERMITE.** 34 de los 41
        clubes tienen UN solo ejercicio cargado, y de las 8 ligas con temporadas, 4
        tienen una sola. Comparar la liga argentina contra la brasilera hoy es 5
        clubes contra 1 (Mirassol). La interfaz lo dice —los chips muestran cuántos
        equipos tiene cada temporada, y el resultado muestra la fórmula y el conteo—
        pero el número sigue siendo pobre hasta que haya más balances cargados.

23. NUEVO (Versión 137, lo que dejó abierto el selector jerárquico + la comparación):
    (d) DEFLACTORES. El aviso de "ejercicios de años distintos" explica el problema (cada
        ejercicio se convierte a USD con el tipo de cambio de su propio documento, sin ajustar
        por inflación), pero no lo arregla. Arreglarlo de verdad es una serie de deflactores por
        moneda y año. Decisión de Guido si se abre.
    TECHO DEL MODELO, no tarea: la taxonomía es de fútbol (`player_sales`, `wages_squad`,
    `youth_football`) y las pestañas Pases/Resultados/Títulos y `gestionesByClub` también. Un club de
    otro deporte entra hoy con media taxonomía vacía y 3 pestañas sin sentido.

40. UN CMS PARA QUE GUIDO CAMBIE COSAS SIN CÓDIGO (pregunta suya en la sesión del 2026-09-22, al
    pedir que la fusión de abonos dentro de "Estadio" se pudiera revertir sin un lío: *"¿se podría
    hacer un backend así sin necesidad de código yo pueda hacer cambios?"*).
    LO QUE YA ESTÁ HECHO, y puede alcanzar: la decisión concreta que motivó la pregunta quedó en
    una constante con nombre (`ABONOS_DENTRO_DE_ESTADIO`, `js/finanzas-calc.js`), con el comentario
    de qué correr después. Revertirla es cambiar una palabra.
    LO QUE FALTARÍA, si la pregunta era más amplia: un CMS tipo Decap/Netlify CMS apuntado a un
    archivo de configuración del repo — le da a Guido una pantalla web con formularios que
    commitea sola, sin dejar de ser un sitio estático. Es una sesión de trabajo propia más resolver
    la autenticación.
    LO QUE NO: un backend con base de datos. Contradice la arquitectura (estática, sin build),
    cuesta plata, y haría que cada visitante pida la config antes de ver una tabla.
    ANTES DE ARRANCAR: preguntarle a Guido QUÉ querría editar desde ahí. Si es solo el orden y el
    nombre de las filas, el archivo de configuración solo ya alcanza y el CMS es de más.
    EN PAUSA (decisión de Guido, 2026-09-22): no retomar antes de ~un mes (fines de octubre 2026).

36. EVALUAR JEV (TypeSafe, modelo `jev-latest`, docs.typesafe.ai) PARA CATEGORIZAR RUBROS
    AUTOMÁTICAMENTE, cuando el proyecto llegue a **200 clubes cargados** (charlado con Guido el
    2026-09-21, sesión que descubrió esta API). Es el piso del rango de escala que ya usa
    `escala-finance-of-sports` (200-3000 clubes) — a ~5 ejercicios por club son ~1000 balances y,
    a un orden de 12 líneas de rubro por balance, unas 12.000 categorizaciones manuales.

    QUÉ ES: Jev es un modelo "System One" — no genera texto, evalúa un `state` (un texto) contra
    preguntas tipadas (`Choice`/`Score`/`Noul`) y devuelve una opción + probabilidades +
    confianza calibrada, todas las preguntas en paralelo, sin parsear nada. Encaja con
    `club-data-mapping` porque categorizar una línea de rubro YA ES una pregunta de `Choice`: el
    `state` es la línea (`rawLabel` + monto + nota del documento), el `criteria` son las mismas
    categorías que ya están en `REVENUE_CATEGORY_LABELS`/`EXPENSE_CATEGORY_LABELS`
    (`data/category-map.js`) — no hay que inventar taxonomía nueva.

    EL PLAN: las líneas que vuelven con confianza alta se cargan directo a
    `revenueLines`/`expenseLines`; las de confianza baja se anotan SOLAS en `Admin/dudas-por-club.md`
    en vez de perderse o quedar mal categorizadas sin que nadie lo note — que es justo lo que le
    pasó a Racing (ver ahí "Categorización interna inconsistente, Ejercicios 2009/2010/2012/2014":
    5 líneas de ingresos etiquetadas con una categoría de gasto, encontrado recién en una
    auditoría posterior).

    POR QUÉ NO AHORA: a 41 clubes, la mayoría con 1 solo ejercicio, categorizar a mano (leyendo el
    balance ya transcripto en una sesión de Claude) sigue siendo más rápido que integrar y
    VALIDAR una API nueva — el volumen no lo justifica todavía.

    ANTES DE INTEGRARLO EN SERIO (aunque ya se haya llegado a 200 clubes): correr un piloto contra
    balances YA cargados y verificados (Boca, River) y medir si la confianza que devuelve está
    bien calibrada en la práctica — no asumirlo de la documentación. Y esto no reemplaza el OCR:
    Jev necesita texto como `state`, así que el paso de `pdftoppm` + Tesseract (ver CLAUDE.md,
    "Cada PDF nuevo") sigue haciendo falta igual.

39. EVALUAR REEMPLAZAR EL CÍRCULO DE INICIALES CON COLOR DE MARCA (`brandColor`, Versiones
    178-180) por una ilustración de camiseta por club, como hace soccerassociation (mostrado por
    Guido: para Vélez blanca con V celeste/azul, para Boca azul con franja amarilla — planas, sin
    sponsor ni escudo). Pedido de Guido, 2026-09-22, al terminar el trabajo de color por club
    (to-dos 23(e)/37).
    RESEARCH YA HECHO, no repetirlo: `auditorias/2026-09-22-camiseta-vs-circulo-selector.md`. En
    síntesis — el argumento a favor es real (27 de 39 clubes compiten por dos familias de color
    hoy, el patrón los distinguiría donde el color solo no alcanza), pero quedan 2 cosas para
    Guido antes de tocar código: (a) confirmar que un generador PARAMÉTRICO (nunca réplica manual
    club por club, que ya fue el error que se corrigió una vez con los escudos) es el camino; (b)
    la pregunta de derechos — una ilustración plana sin sponsor ni escudo probablemente pesa
    distinto que una imagen oficial, pero el research no la puede cerrar solo. Si avanza, la
    recomendación es un PILOTO ACOTADO sobre esos ~27 clubes de los clusters de color repetido
    (no barrer los 41 de una), para probar legibilidad real a 24px antes de comprometerse.
    EN PAUSA (decisión de Guido, 2026-09-22): no retomar antes de ~un mes (fines de octubre 2026).
