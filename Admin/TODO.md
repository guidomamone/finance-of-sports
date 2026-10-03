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

95. SOURCING CANADÁ, LO QUE QUEDÓ (sesión Norteamérica, 2026-10-03; ver `fuentes/Canadá/_notas-generales.md`).
    Los clubes comunitarios de la CFL publican informe anual con auditor (Winnipeg 5 ejercicios, Saskatchewan 4, Edmonton 6 con
    resumen). Falta: (a) Roughriders FY2022 y anteriores (los posts de AGM de `riderville.com` de 2022/2023, abrirlos con un browser
    real); (b) Edmonton: bajar 2019 y confirmar si los PDFs de 2020-21 y 2023 traen estados (posible OCR, `tesseract -l eng`);
    (c) Blue Bombers: informes 2020 y anteriores (`bluebombers.com/news/2016-annual-report/`, dan 403 a `WebFetch`);
    (d) probar los otros seis clubes de la CFL y los de la CPL (sitio oficial y `static.cfl.ca/wp-content/uploads/sites/<n>/`);
    (e) SEDAR+ nunca se intentó; (f) Toronto Blue Jays: leer el MD&A/40-F de Rogers, el cierre es provisorio.
96. SOURCING EE.UU. Y MÉXICO, LO QUE QUEDÓ (misma sesión). (a) Reg CF / Form C-AR en EDGAR es un canal nuevo para clubes chicos
    (Detroit City FC 5 ejercicios, Oakland Ballers 3): faltan nombres de clubes USL/NISA/ligas menores y de otros deportes que
    hayan hecho crowdfunding; (b) Packers FY2023-FY2026 siguen sin PDF (pedir a `shareholderservices@packers.com` o probar
    `materials.proxyvote.com`); (c) deuda municipal en EMMA de arenas/estadios de NBA/NFL/MLB/NHL no se hizo en esta sesión;
    (d) Liberty Media: bajados los 10-K FY2019 y FY2022 con el "Braves Group" pero sin leer qué tablas traen; (e) Club América:
    decidir si los ingresos 2019-2023 de "Eventos de fútbol y otros espectáculos" de Televisa (mezclan fútbol y otros eventos) alcanzan
    para cargarse; (f) Diablos Rojos del México: reconciliar ingresos 2024 ($573,3 M del semestral vs $559,9 M de prensa) y revisar el perímetro
    (equipo vs estadio/otros negocios) al mapear; (g) TKO/Endeavor/Formula One Group no son clubes: decisión de Guido si el sitio las quiere.

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

83. VER CÓMO QUEDARÍA UN CLUB CON SU PRESUPUESTO EN OTRA LIGA (pedido de Guido, 2026-09-27: ejemplo,
    ver cómo quedaría Boca con su presupuesto en la liga española). Es una simulación cruzada: tomar
    el valor ya cargado de un club e insertarlo en el ranking de OTRA liga para mostrar en qué
    posición quedaría. Reusa la infraestructura de rankings pre-calculados que ya existe (Versiones
    182-184, y la mejora de Ligas del to-do 68, Versión 243) — no hace falta bajar clubes de la otra
    liga en vivo. Preguntas a resolver antes de tocar código: (a) qué métrica se usa (ingresos totales
    parece el candidato obvio dado que 68 ya los muestra por categoría, confirmar con Guido); (b) qué
    pasa si el club de origen y la liga destino no comparten moneda/año — mismo problema de fondo que
    el to-do 23(d) (deflactores) y el aviso ya existente de "ejercicios de años distintos"; (c) UI:
    ¿selector nuevo ("elegí un club, elegí una liga") o un botón dentro de la ficha de cada club
    ("¿cómo le iría en...")? Sin evaluar todavía.

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

73. CARGAR LOS 2 BALANCES DE BOCA ENCONTRADOS VÍA WAYBACK CDX (Versión 247, 2026-09-26): Ejercicio
    118 (cerrado 30/06/2022) y Ejercicio 119 (cerrado 30/06/2023, firmado). **Transcriptos ya
    (2026-09-26, Mistral OCR, 101 y 128 páginas):** `Clubes/Argentina/Boca/eecc-30525418835-2022.md`
    y `Clubes/Argentina/Boca/balance-01-07-22-al-30-06-23-firmado.md`. LISTO PARA MAPEO: no falta
    nada de Guido, solo una sesión normal de `club-data-mapping` que categorice los rubros y cargue
    los 2 ejercicios al sitio. Quedan sin encontrar 2018, 2019, 2021 y 2024 — no aparecieron ni en
    este barrido de dominio completo. Detalle en `fuentes/Argentina/Boca.md`.
    Aparte, para River: un balance del ejercicio cerrado 31/08/2016 (más viejo que cualquiera de los
    8 ya cargados) apareció en Scribd, detrás de una suscripción paga — decisión de Guido si vale
    pagarla, mismo criterio que el trámite de la IGJ ya documentado en `fuentes/Argentina/River.md`.

74. EVALUAR JEV (TypeSafe AI) PARA CATEGORIZAR RUBROS DE INGRESOS/GASTOS EN ONBOARDING (idea de
    Guido, 2026-09-26, a raíz de la nota de lanzamiento de TypeSafe del 2026-09-15). Motivación: Jev
    es un modelo "System One" — no genera texto libre, solo clasifica/tipa una entrada no
    estructurada contra un set fijo de etiquetas, rápido y barato, con probabilidad calibrada por
    respuesta. Encaja mejor con "a qué categoría de `data/category-map.js` pertenece este rubro" que
    con sourcing (necesita navegar con libertad) o transcripción (Jev no genera strings, no puede
    hacer OCR — por eso ese paso se queda en Mistral).

    OJO: la nota es marketing propio de una empresa recién salida de stealth (early access, benchmark
    contra un promedio que ellos mismos eligieron) — no tomar las cifras de la nota como validadas,
    probarlo contra el propio criterio del proyecto antes de confiarle nada.

    CÓMO ENCARARLO, si se retoma:
    - **Backtest primero, sin tocar nada del sitio**: correr Jev sobre rubros de ejercicios YA
      categorizados a mano (Boca, River, Racing tienen varios años hechos) y comparar contra la
      categorización real — barato, y valida el producto contra ground truth propio en vez de
      creerle el benchmark a la nota de lanzamiento.
    - **Dónde SÍ encaja bien**: rubros que un club ya usó antes (cargar el ejercicio N+1 de un club
      ya onboardeado, mismo vocabulario de rubros que en N) — clasificación repetitiva de un set
      cerrado y conocido.
    - **Dónde NO encaja**: la primera vez que aparece un rubro nuevo o un club/país nuevo — ahí la
      categorización es una decisión de criterio (ej. la unificación de "derechos de
      formación"/"mecanismo de solidaridad" del to-do 43), no clasificación mecánica. Sigue siendo
      trabajo de `club-data-mapping` con Sonnet o de Guido.
    - **Pipeline de 3 pisos, aprovechando la confianza calibrada** (si de verdad es calibrada):
      Jev clasifica cada rubro → confianza alta (umbral a definir) se acepta automático → confianza
      baja pasa a Sonnet con el contexto completo del club → si Sonnet tampoco está seguro, cae en
      `Admin/dudas-por-club.md` como ya pasa hoy.

94. ANTES DE QUE "SAVED SEARCHES" (to-do 70, cerrado) SEA USABLE POR VISITANTES DE VERDAD, 2
    CHEQUEOS DE CONFIGURACIÓN EXTERNA que no se pueden resolver escribiendo código, y que
    nadie más que Guido puede hacer (paneles de Google/Supabase):

    - **Pantalla de consentimiento OAuth de Google, probablemente en modo "Testing".** Un
      proyecto nuevo en Google Cloud arranca así por default, y en ese modo SOLO pueden loguearse
      las cuentas que se agreguen a mano como "test users" en el proyecto — cualquier otro
      visitante real va a ver una pantalla de error de Google, no el login. Hay que publicarla
      ("Publish app") en Google Cloud → APIs & Services → OAuth consent screen antes de que esto
      sirva para alguien que no sea Guido. Con los scopes que usa este login (email, profile) no
      debería exigir el proceso de verificación largo de Google (eso es para scopes sensibles).
    - **Redirect URLs de Supabase, hoy solo tiene el `localhost` de desarrollo.** Supabase
      rechaza el regreso del login de Google a cualquier URL que no esté en su lista blanca
      (Authentication → URL Configuration → Redirect URLs). Antes de deployar, agregar ahí
      `https://financeofsports.com/*` (y el dominio viejo que redirige, si corresponde).
    Sin estos dos pasos, el botón de login funciona perfecto en local (probado por Guido,
    2026-09-27) pero falla para cualquier visitante real del sitio en producción.

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

50. LEADS DE SOURCING DE COLOMBIA Y MÉXICO — 2 de 5 puntos ejecutados el 2026-09-28, quedan 3 que
    necesitan una acción o decisión de Guido:
    - ✅ **SIIS Colombia**: Boyacá Chicó suma 2021-2025 (8 ejercicios en total), Once Caldas suma
      2021-2024 (serie completa 2016-2025) — la nota anterior de "resuelto" para Once Caldas estaba
      incompleta, corregido. Bucaramanga 2021 se investigó a fondo (endpoint + Vista 360 en browser
      real) y se confirmó que es un hueco REAL de la fuente (la sociedad no depositó ese año), no
      throttling como se creía. Detalle en `fuentes/Colombia/<Club>.md` de cada uno. **Pendiente el
      paso de transcripción de los PDFs nuevos** (pipeline Mistral, `CLAUDE.md` "Cada PDF nuevo") —
      sourcing y transcripción son pasos separados.
    - ✅ **León y Pachuca (México)**: ya resuelto por el to-do 75 (evaluación de Firecrawl,
      2026-09-27) — Pachuca se destrabó (sin nada financiero, blindado por el Art. 12 de LIGA MX);
      León resistió Firecrawl, `/v1/map` Y un Browser pane real, confirmando que es un bloqueo de
      IP/hosting, no un WAF con challenge. Ver `fuentes/México/León.md` y `Pachuca.md`.
    - **Pumas y Tigres (México)**: texto de las 2 solicitudes de transparencia (UNAM y UANL) ya
      redactado — ver el chat de la sesión 2026-09-28 o pedirlo de nuevo. Falta que Guido las
      presente desde su propia cuenta en la Plataforma Nacional de Transparencia (crear cuenta y
      presentar la solicitud no es algo que una sesión pueda hacer sola).
    - **León se está vendiendo, sin cerrar todavía** (rechequeado 2026-09-28): plazo hasta 2027,
      ~130 propuestas recibidas, ~25 acuerdos de confidencialidad firmados. Candidatos que suenan:
      "Apollo Group" (si es Apollo Global Management, NYSE `APO`, abriría la ventana Ollamani) y
      Arturo Lomelí (Clase Azul, privado). Rechequear cuando cierre la operación.
    - **`DIABLOS` en la BMV**: sigue igual, es decisión de Guido (abre liga y deporte nuevos), no
      se toca sin su OK.

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
