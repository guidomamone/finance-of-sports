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

112. PENDIENTES DEL ALTA DE CLUBES NUEVOS POR SCRIPT (`tools/alta-club.mjs`), decisiones de Guido y datos que faltan:
    - Revisar 5 perímetros que Claude resolvió como CONSOLIDADO (criterio aplicado, no dato leído): Inter, Atalanta, Go Ahead Eagles,
      Başakşehir, Trabzonspor (ninguno cargado todavía). Y las 11 preguntas de `node tools/alta-club.mjs --dudas` (todas de perímetro).
    - Series de tipo de cambio que faltan en `tools/fx-reference/` para las monedas de clubes nuevos: SEK, PLN, y las que aparezcan (PEN,
      MXN, JPY...). Hoy hay 14: ARS, BRL, CHF, CLP, COP, CZK, DKK, EUR, GBP, KRW, NOK, RUB, TRY, UAH. Sin serie, la carga frena.
    - `FX_PLAUSIBLE_RANGE` de `data/currency-map.js`: COP [2500, 5000] -> [1600, 5500] (la serie llegó a 5.061 en 2022) y BRL [3, 7] -> [1,4; 7,5]
      antes de cargar años brasileños anteriores a 2015 (tocar data/ obliga a subir ASSET_V y regenerar).
    - Preguntar a Claude los 91 documentos que faltan: `node tools/alta-club.mjs --todos --claude --tope-usd 3` (lo corre Guido; el ensayo
      sin `--claude` dice el costo).

138. VER LOS TEMAS DE AUDITORÍA PENDIENTES. Hallazgos de las auditorías de datos que todavía no se arreglaron ni se
    descartaron; cada archivo trae el caso, la evidencia y el arreglo propuesto. Hoy: `auditorias/2026-10-04-clubes-pipeline.md`
    (los 6 clubes del pipeline nuevo: 12 hallazgos, los pendientes de caja y deuda, y la nota visible del quiebre de serie de
    Juventus 2006 → 2007).

139. DEFECTO D DEL PIPELINE, CONOCIDO Y SIN DAÑO HOY (no perseguir sin un caso nuevo; venía del HANDOFF, Versión 470).
    `compararVecino` (verificar.mjs) compara con el año vecino las filas extraídas ANTES de los ajustes `fila`; Juventus 2005 y 2006 dan
    "NO" en el chequeo de año vecino (2005: 229,9 contra 259,1; puede ser esto o la reexpresión italiano → IFRS) pero verifican ok y están
    cargados. Retomar si un club nuevo con ajustes `fila` de ingresos frena por eso. (Los defectos B, textos, quedaron en las Versiones
    465-466.)

140. ESCALONES Y CHEQUEOS QUE LE FALTAN AL PROCESO DEL PIPELINE (no urgentes; venían del HANDOFF, Versión 470; las etapas están en
    `Admin/PIPELINE.md`). Cada uno, de a uno: diseño con su escalera, ok de Guido, y medir con los lotes de prueba.
    (a) Escalones automáticos para lo que hoy son ajustes (año del nombre del archivo; resultado final que repite el documento siguiente;
        costos financieros mal rotulados).
    (b) Etapa 2, escalón 2: Gemini sobre escaneos enteros (hoy, si no hay estado, queda como fuente).
    (c) Etapa 1: duplicados de PDF por huella (el mismo documento bajado dos veces con nombres distintos).
    (d) Etapa 1: reabrir solo el sourcing de un PDF roto.
    (e) Falso positivo del inventario con números que no son cifras contables (firmas digitales).
    (f) Etapa 6: número citado en el texto del documento como segundo chequeo.
    (g) Chequeo de coherencia entre años (prototipado, no construido).
    (h) Etapas 4 y 8: registrar en qué escalón salió cada dato.
    (i) Marcar "no desglosado" distinto de `cero-real`, y que la página lea `fiscalYearMeta.sinDesglose` y muestre "No declarado" (ya lo
        usan 8 años cargados).
    (j) Perfil de clubes fuera de Sudamérica (cuando aparezcan documentos de esos clubes).
    (k) Que las diferencias por grupo de países (`logica` de `tools/grupos-pais.mjs`, lo que muestra `node tools/estado.mjs --logica`)
        pasen a ser configuración que las tools lean, grupo por grupo.
    (l) Que el pipeline cubra presupuestos: hoy `localizar.mjs` no los elige y se cargan a mano (`Admin/ARQUITECTURA.md` ex §11,
        presupuesto y balance del mismo año; `Admin/CONVENCIONES.md` ex §15, presupuesto en año calendario).

141. LA COLA HUMANA DEL PIPELINE (`tools/cola.mjs`; venía del HANDOFF, Versión 470).
    (a) Cerrar casos obsoletos de la cola automáticamente (hoy hay 11 de Juventus 2003, 2004 y 2016, años ya cargados).
    (b) Ordenar la cola por impacto.
    (c) Que una respuesta de la cola se vuelva regla (una convención de un grupo de países en `tools/grupos-pais.mjs`). Las respuestas de
        categoría ya quedan como precedente del club (`Admin/categorias-aprendidas.jsonl`); las demás no.
    (d) ¿Dónde ver la cola? Hoy es un archivo que se lee con `cola.mjs`. Decisión de Guido, a tomar con casos reales.

142. DECISIONES PENDIENTES DE GUIDO SOBRE EL PIPELINE, a tomar con casos reales (venían del HANDOFF, Versión 470).
    (a) ¿El primer año automático de cada club pasa siempre por la cola?
    (b) Perímetro: se hereda del año cargado más cercano; si no se puede, pregunta en la cola.
    (c) Retirar el proceso viejo de las etapas 3 a 5 (~10 tools): cuando el proceso nuevo haya cargado bien algunos documentos.
        Relacionado: el ex to-do 108 (validar el inventario con `pipeline.mjs`), en `Admin/Archive/todos-cerrados-onboarding-manual.md`.

109. ORDENAR LAS CARPETAS DEL PROYECTO (pedido de Guido, 2026-09-30: "hay muchos files dando vueltas que ya no tienen razón de ser"). No hay apuro, pero cada lote
    de pipeline suma archivos. Lo que ya se ve como desorden, para que la sesión que lo encare no arranque de cero:
    - Los archivos generados ya salieron de `Clubes/` (Versión 317, `Generados/`, `tools/rutas.mjs`).
    - **`Admin/`**: las listas de pilotos viejas ya están en `Admin/Archive/pilotos/` (2026-09-30). Quedan los informes de
      tests (`test-*.md`, `test-*.jsonl`) que conviene juntar en una carpeta, y documentos internos viejos que hay que archivar siguiendo la regla de `CLAUDE.md`
      (`Admin/Archive/`, sacándole antes lo que todavía sirve a `CONVENCIONES.md`/skills/`TODO.md`).
    - **Raíz y otras carpetas** (`Prototyping/`, `auditorias/`, archivos sueltos): revisar cuáles siguen vivos. Recordá que lo suelto en la raíz se PUBLICA (`netlify.toml`).
    - **Cuidado**: los registros (`Admin/transcripciones-*.jsonl`, `Admin/*/resultados.jsonl`) y muchas tools guardan RUTAS de archivos; mover algo obliga a actualizarlas. Proponer un script
      `tools/inventario-archivos.mjs` que liste por tipo, peso y antigüedad qué hay, y mostrarle el plan a Guido antes de mover nada. **Nunca borrar: archivar.** Cada movimiento
      lo aprueba Guido, y después correr `node tools/audit.js` (0 P0/P1).

143. PARTIR LOS DOCUMENTOS QUE SE LEEN EN CADA SESIÓN (estudio del 2026-10-04, pedido de Guido: "cosas que no hacen
    falta que sean en cada sesión, no tienen que leerse"). Hoy se leen ≈225 KB (≈65.000 tokens) antes de empezar; con 4
    particiones bajan a ≈85-90 KB: CONVENCIONES en general/datos/UI (≈44 KB), TODO sin el sourcing por país ni el detalle
    de 98/105 (≈40 KB), ESTADO sin la descripción de la pantalla (≈35 KB), CLAUDE.md a ≈10 KB (≈20 KB, y se paga también
    en cada subagente). Las 2 últimas esperan a que cierre la mudanza de PIPELINE/ARQUITECTURA; sacar los gotchas del
    navegador de CLAUDE.md y tocar los skills necesita el ok de Guido. Detalle y riesgos: `auditorias/2026-10-04-partir-archivos.md`.

101. CONFLICTOS DE CATEGORIZACIÓN REALES, ENCONTRADOS PROBANDO `tools/suggest-category-precedent.mjs`
    CONTRA LOS 162 CLUBES (2026-09-28, ver el ex to-do 98 en `Admin/Archive/todos-cerrados-onboarding-manual.md`). Mismo rubro, mismo lado (ingreso o gasto),
    categoría DISTINTA entre ejercicios del MISMO club — no es un bug de la tool (ya separa
    ingreso/gasto), es una inconsistencia real que quedó en los datos ya cargados. Revisar cada uno
    contra el documento fuente y unificar (o dejar documentado por qué el cambio de categoría entre
    años es correcto, si lo es):
    - **Más casos, del backtest de `tools/categorizar-claude.mjs` (2026-09-30, `Admin/tests/test-categorizar-claude.md`)**: los errores de
      Claude con confianza >= 0,80 son casi todos incoherencias de producción, no del modelo: San Lorenzo "Ciudad deportiva" y "Ciudad
      deportiva (gasto)" en categorías distintas; "Seguros" fuera de `admin_general_expense` contra lo que dice el skill; cargas sociales
      de juveniles de Boca en `wages_squad` contra la regla del skill; "Interese perdidos" de Almagro como línea (los intereses van a
      `netInterest`); River "Educación" (gasto) fuera de `education_expense`; gastos de transferencias partidos 40 `other_expenses` / 31
      `player_amortisation`. Mientras sigan, parte del "error" medido de la categorización automática es la vara.
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

126. SOURCING CANADÁ, LO QUE QUEDÓ (sesión Norteamérica, 2026-10-03; ver `fuentes/Canadá/_notas-generales.md`).
    Los clubes comunitarios de la CFL publican informe anual con auditor (Winnipeg 5 ejercicios, Saskatchewan 4, Edmonton 6 con
    resumen). Falta: (a) Roughriders FY2022 y anteriores (los posts de AGM de `riderville.com` de 2022/2023, abrirlos con un browser
    real); (b) Edmonton: bajar 2019 y confirmar si los PDFs de 2020-21 y 2023 traen estados (posible OCR, `tesseract -l eng`);
    (c) Blue Bombers: informes 2020 y anteriores (`bluebombers.com/news/2016-annual-report/`, dan 403 a `WebFetch`);
    (d) probar los otros seis clubes de la CFL y los de la CPL (sitio oficial y `static.cfl.ca/wp-content/uploads/sites/<n>/`);
    (e) SEDAR+ nunca se intentó; (f) Toronto Blue Jays: leer el MD&A/40-F de Rogers, el cierre es provisorio.
127. SOURCING EE.UU. Y MÉXICO, LO QUE QUEDÓ (misma sesión). (a) Reg CF / Form C-AR en EDGAR es un canal nuevo para clubes chicos
    (Detroit City FC 5 ejercicios, Oakland Ballers 3): faltan nombres de clubes USL/NISA/ligas menores y de otros deportes que
    hayan hecho crowdfunding; (b) Packers FY2023-FY2026 siguen sin PDF (pedir a `shareholderservices@packers.com` o probar
    `materials.proxyvote.com`); (c) deuda municipal en EMMA de arenas/estadios de NBA/NFL/MLB/NHL no se hizo en esta sesión;
    (d) Liberty Media: bajados los 10-K FY2019 y FY2022 con el "Braves Group" pero sin leer qué tablas traen; (e) Club América:
    decidir si los ingresos 2019-2023 de "Eventos de fútbol y otros espectáculos" de Televisa (mezclan fútbol y otros eventos) alcanzan
    para cargarse; (f) Diablos Rojos del México: reconciliar ingresos 2024 ($573,3 M del semestral vs $559,9 M de prensa) y revisar el perímetro
    (equipo vs estadio/otros negocios) al mapear; (g) TKO/Endeavor/Formula One Group no son clubes: decisión de Guido si el sitio las quiere.

129. SUDAMÉRICA, 2026-10-03: GESTIONES QUE LE TOCAN A GUIDO (candidatos a mail o acción de persona, no
    se escribió ningún mail). Peñarol 2019-2025 (login de socios `crm2.montevideo.com.uy/areasocio`, o
    pedido de acceso a información pública a la AIN); Sportivo Luqueño EEFF auditados (los ofrece por
    WhatsApp 595981001921); Athletic Club SAF 2022 (primer ejercicio completo); Amazonas 2019-2021 y 2025
    (también LAI a SEJEL-AM); Barcelona SC 2019-2024, Emelec 2019-2022 y 2024, Universitario dictámenes BDO
    2021-2023, Deportivo Cuenca 2021-2025 (todos se reparten a socios); Palestino 2010-2016 (CMF con
    clics reales o avisos en prensa); Pinheiros Vol.1 2018-2025 (reintentar desde la red de Guido:
    `ecp.org.br/institucional/o-clube/governanca/documentos_gerais_<año>/`); Paulistano 2023+ (API
    `cms.paulistano.org.br` o browser); Vasco SAF 2024-25 (`media.vasco.com.br` bloqueado por Cloudflare);
    SUNARP/SUNAT (de pago) para Sporting Cristal, UCV y Los Chankas; Drive de la Memoria IDV 2023.

130. SUDAMÉRICA: DECIDIR EL ESQUEMA PARA CLUBES POLIESPORTIVOS Y OTROS DEPORTES. Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.

131. SUDAMÉRICA: LO QUE QUEDÓ EN DISCO SIN TRANSCRIBIR. 17 clubes nuevos de Colombia (Primera B), Palestino
    2017-2024 (con texto), Peñarol 2018 (escaneo), Emelec 2023 y Barcelona 2018 (escaneos), Santos 2017-2023,
    Guarani 2017-19, Operário 2020-23, Juventude 2017/19/20/21/24, Náutico 2017-18, Paulistano 2013 y 2019,
    Praia 2019 y 2021 (escaneos: Mistral/Gemini + verificación). Corsarios (4) y Leones FC (SIIS no tiene
    2021/2023+) no llegan a 5 ejercicios. Verificar entidad y ejercicio de cada PDF de Colombia al
    transcribir: solo se contó el índice de SIIS.

132. SUDAMÉRICA: APLICAR LOS TEXTOS PROPUESTOS A LAS SKILLS (con el ok de Guido): ver
    `Admin/propuestas-skills-sudamerica.md`; borrarlo al aplicar.

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
    caso de CONFIANZA ALTA salió mal, no el acierto promedio; (5) documentar en `Admin/tests/test-jev.md`
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

128. SOURCING ITALIA — LO QUE QUEDÓ ABIERTO (2026-10-03). Fútbol: (a) Sampdoria, faltan 2020 y 2022-2025 (los fascicoli viven en `sampdoria.it/wp-content/uploads/` pero el sitio actual no los linkea: mirarlo con navegador o mail); (b) Verona 2024; (c) Udinese 2022/23-2023/24 y Bologna 2023/24-2024/25: solo mail al club (Udinese existe truncado en Wayback); (d) Cagliari (2018 Issuu y 2021 Drive de solo lectura) y Fiorentina 2018: decisión de Guido sobre mail; (e) Lazio: serie completa 2006/07-2024/25, solo faltaría el histórico bursátil 1998-2006, que el sitio no publica; (f) Torino 2021-2024 y varios más son escaneos, y los 3 Fiorentina de Issuu son imágenes: pasan por Mistral/Gemini, y Fiorentina marcar "reconstruido desde Issuu" al transcribir; (g) Serie C: NO barrer salvo clubes con señal (Serie B dio 2 de 18). Pendiente de 2ª tanda: rugby (Top10, Benetton, Zebre), vóley (SuperLega, A1 femenina) y básquet (LBA), sin empezar; pregunta útil: qué obligación de publicar tiene cada forma jurídica (S.r.l., S.S.D. a r.l., asociación).

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

113. SOURCING ESPAÑA/FRANCIA — LO QUE QUEDÓ ABIERTO (sesión 2026-10-03, worktree
    `sourcing-espana-francia`; detalle por club en `fuentes/España/<Club>.md`). (a) Llegar a 5
    ejercicios: faltan 1 en Elche, Rayo y Villarreal; 2 en Oviedo y Espanyol; Levante y Osasuna
    tienen 3 con cuentas (Mallorca y Sevilla ya llegaron a 5+ tras re-barrer con archive.org de vuelta). (b) Francia: el agregado DNCG ya da 20+
    temporadas para los 18 clubes de L1/L2, pero falta 2023/24 (no está en
    `www.sta.lfp.fr/reports-dncg`, que ahora tiene `www.` — el host sin `www` ya no resuelve) y
    2015/16 (solo rapport). (c) Clubes nuevos (resto de LaLiga/LaLiga 2/RFEF y de Ligue 1/Ligue 2) no
    arrancados. (d) Real Sociedad sigue en 0 (cuentas gateadas a accionistas / Registro Mercantil
    de pago): gestión de Guido. (e) Proponer, con texto exacto y OK de Guido antes de tocar ningún
    skill, un `paises/España.md` con la técnica del prefijo del CMS de LaLiga en Wayback
    (ver `fuentes/España/_notas-generales.md`, sesión 2026-10-03).

114. OCEANÍA — HUECOS DEL PRIMER BARRIDO (2026-10-03, ver `fuentes/Australia/` y `fuentes/Nueva Zelanda/`). Gestión de Guido: (a) abrir en navegador normal las páginas de publicaciones (Vercel) de Brumbies/Waratahs/Reds/Force/Rugby Australia para 2022-25 (los PDFs cuelgan de `d26phqdbpt0w91.cloudfront.net/NonVideo/<GUID>.pdf`; idea: clasificar por carátula los ~1.758 PDFs de ese CloudFront); (b) Issuu: Cricket Australia FY24-25 y Parramatta Leagues 2021-24; (c) ASIC por documento (A$20/A$50 según resúmenes de búsqueda, NO verificado en el portal) para los 5 clubes AFL sin publicación propia (FY2025) y los NRL privados (Manly, Titans, Dolphins, Dragons Pty, Souths SSDRLFC, Storm, Raiders); (d) candidatos a mail: Carlton 2018/2020, Fremantle 2021, Adelaide 2010/2012, Knights, Cowboys (informe completo), franquicias NZ, Phoenix, Auckland FC, A-League, NBL.

115. OCEANÍA — DECIDIR EL ESTATUS DE LAS COPIAS NO OFICIALES. Sydney, West Coast, Port Adelaide, Gold Coast y GWS (AFL) están cubiertos solo por el espejo footyindustry.com (copias de ASIC Form 388, muchas escaneadas); también partes de Fremantle, Adelaide, North Melbourne, Western Bulldogs y Richmond 2012-17. Los PDFs están guardados pero no se trackean (`.gitignore`). Antes de onboardear alguno: decidir si una copia ASIC de un espejo cuenta como fuente (reliability `secondary_mirror`) o hay que pedir el original. Richmond y Cowboys publican solo un "concise financial report": decidir si alcanza.

116. OCEANÍA — VERIFICACIONES PENDIENTES ANTES DE CARGAR: Western Bulldogs 2013 (pesa exactamente 2.097.152 bytes, posible truncado), Cricket NSW (¿FS completos?) y Cricket Victoria 2024-25 (¿resumido?), NZ Cricket (estados resumidos con ISA 810), Collingwood 2011 (escaneo), Penrith (el club NRL PDRLFC no consolida; el consolidado es el leagues club PRLC), Souths (el Member Co no consolida al club NRL).

117. ASEC MIMOSAS (Costa de Marfil): 15 PDFs en disco, SIN TRANSCRIBIR NI CARGAR (sourcing de África,
    2026-10-03). Carpeta `Clubes/Costa de Marfil/ASEC Mimosas/`, detalle y tabla de ejercicios en
    `fuentes/Costa de Marfil/ASEC Mimosas.md`. Son 2009-2010 y 2012-2024, en FCFA, un compte d'exploitation
    + bilan por año (2009 es escaneo, el resto tiene texto). Es la primera fuente africana cargable y la de
    más años de todo el continente. Falta: (a) ejercicio 2011 (aviso en `asec.ci/fr/2011/02/16/`, el PDF no
    apareció en el CDX) y 2025 (AG del 23/08/2026; el sitio vivo da 500 en `/document/compte-exploitation`,
    reintentar o esperar captura de Wayback); (b) decidir antes de onboardear si se carga la asociación sola
    o el grupo consolidado (el club publica los dos resultados); (c) pasarlos por la escalera de
    transcripción y por `club-data-mapping` — es una ASOCIACIÓN con recetas de transferencias y subvenciones
    de la FIF/sponsors, categorías propias.

118. OMPIC/directinfo.ma — RAJA CLUB ATHLETIC S.A. (Marruecos): GESTIÓN DE GUIDO. La ficha gratuita lista
    "Etats de synthèse 2025" por 75 MAD (unos 8 USD), RC 467977, depositado. Requiere cuenta OMPIC + pago, un
    agente no puede. Un solo ejercicio (la S.A. no tiene depositados años anteriores), así que no alcanza
    por sí solo para 5. Wydad NO vale la pena: su S.A. (RC 398831) no tiene ningún bilan depositado.
    Ver `fuentes/Marruecos/_notas-generales.md`.

119. TARAJI HOLDING / ESPÉRANCE DE TÚNEZ: revisar cada tanto si el CMF dio el visa y se publicó el prospecto
    (`cmf.tn/?q=prospectus-vis-s-par-le-cmf`, `?q=visas-capital`, `?q=documents-de-r-f-rences-enregistr-s-aupr-s-du-cmf`).
    Hoy (2026-10-03) el expediente lleva más de un año sin visa. Cuando salga trae ~3 ejercicios consolidados
    auditados. Sin fecha fija. Ver `fuentes/Túnez/Espérance de Túnez.md`.

120. SUDÁFRICA, PAIA (decisión de Guido): el manual PAIA de Orlando Pirates (leído 2026-10-03) confirma que los
    AFS existen y se piden por solicitud formal al Information Officer (Darryl Joselowsky,
    darrylj@orlandopiratesfc.co.za), pero la ley (art. 50) pide justificar un derecho propio y el club puede
    negarse. Probabilidad baja. Candidato a una solicitud de prueba, mismo mecanismo en Chiefs y Sundowns.
    Antes de mandar nada, `club-outreach`. Ver `fuentes/Sudáfrica/Orlando Pirates.md`.

121. ÁFRICA, FALTA LA ESCALERA COMPLETA en: Argelia (comptes sociaux en el CNRC: verificar si un tercero puede
    consultarlos y a qué costo), Kenia/Tanzania/Ghana/Senegal/Camerún/Zambia/Zimbabue/Angola/Mozambique/RD Congo/
    Etiopía/Libia/Mauricio (solo 1 búsqueda web cada uno en el mejor caso, sin canal), y otros clubes
    de Costa de Marfil (Africa Sports, Stade d'Abidjan, SOA). Lección del barrido: el hallazgo de ASEC vino de
    un barrido CDX de dominio completo filtrando PDF, no de la búsqueda web; replicarlo en los sitios
    oficiales de los clubes grandes de cada país antes de dar el país por vacío.



122. EL SALVADOR: CERTIFICACIÓN DE BALANCE PARTICULAR DEL CNR (gestión de Guido, sourcing Centroamérica,
    2026-10-03). El Registro de Comercio del CNR (cnr.gob.sv) recibe el balance anual auditado de toda
    sociedad mercantil y entrega copia fiel por US$ 6 + US$ 0,25 por hoja (solicitud con denominación
    y año + recibo de pago; ver `fuentes/El Salvador/_notas-generales.md`). Los agentes no pueden
    pagar ni identificarse. ANTES de pagar: confirmar que el club sea una SOCIEDAD (Alianza y Águila
    parecen asociaciones con junta directiva, en cuyo caso el CNR no tiene nada que certificar; FAS
    pertenecería a SSports Inc., entidad foránea) y su denominación exacta. Sitio oficial y Wayback
    de los 3 ya agotados (ver notas). Siguiente escalón: licencia de clubes de la FESFUT.

123. COSTA RICA: MAIL A SAPRISSA Y ALAJUELENSE (candidatos a mail, 0.3, 2026-10-03). Documento confirmado
    por prensa y no público: Saprissa EEFF consolidados 2023-2024 auditados por Grant Thornton
    (accionistas, asamblea de julio); Alajuelense Informe de Tesorería a socios 2023 y 2025. Proceso
    de envío en `club-outreach`; no se redactó nada. Guido dijo que NO por ahora (2026-10-03): queda
    como candidato, no mandar sin que lo pida.

124. PANAMÁ: CONSEGUIR EL REGLAMENTO DE LICENCIAMIENTO MASCULINO DE LA FPF (2026-10-03). Las URLs de
    2024/2025 dan 404 (el sitio solo muestra el femenino JUL 2026): buscar en Wayback
    (`fepafut.com/wp-content/uploads/2025/*`) y leer si tiene cláusula de confidencialidad como el
    art. 12 de Costa Rica. Misma pregunta para la FENAFUTH (Honduras) y la FEDEFUT de Guatemala.

125. REGIÓN CENTROAMÉRICA/CARIBE SIN BARRER (2026-10-03): Nicaragua, Belice, Trinidad y Tobago (la
    búsqueda secundaria dice que el Companies Registry exige cuenta con PIN y que las privadas no
    presentan cuentas auditadas: verificar en la ley), República Dominicana (Registro Mercantil de las
    Cámaras de Comercio, Ley 479-08), Haití, Cuba, Puerto Rico, Curazao, Surinam y los otros deportes
    (béisbol dominicano/boricua, cricket de Jamaica/Caribe: Cricket West Indies publica como
    federación). La WebSearch devuelve casi solo Wikipedia: para un barrido serio de estos países
    usar Firecrawl (`/map` y `/scrape`) y Exa (las keys sí existen en `Admin/*/.env`, archivos ocultos).

133. **Gestiones de Guido que desbloquean varios países de Europa del Este** (sesión 2026-10-03; ninguna es tarea de sourcing, cada una exige IP, cuenta, captcha o pago de una persona): (a) **IP polaca/UE** para el repositorio RDF/KRS (`rdf-przegladarka.ms.gov.pl`, bloquea EE.UU.): completa huecos de Polonia (Górnik 2024, Śląsk 2021/2023, Cracovia 2021, Zagłębie 2020, Motor 2024, Arka 2022/23+) y otros deportes; (b) **IP serbia o VPN** para `apr.gov.rs` (Crvena zvezda, Novi Pazar, Radnik y los años faltantes de Partizan/Vojvodina/Čukarički; gratis solo 3 años); (c) captcha de `e-beszamolo.im.gov.hu` (Hungría: Fehérvár y huecos de Paks 2020, MTK 2019) y de AJPES JOLP (Eslovenia: Maribor, Celje, Mura, Radomlje, Primorje); (d) Lituania `registrucentras.lt` (Cloudflare Turnstile) y `data.gov.lt` desde IP europea; (e) Georgia `reportal.ge` (cuenta gratis, Dinamo Tbilisi 2017-2025 y otros 14 clubes); (f) Letonia Lursoft (~11 EUR por informe: Liepāja, Jelgava, Tukums, Valmiera); (g) Armenia `ffa.am/en/licensing` y Azerbaiyán AFFA 2014; (h) Montenegro CRPS, Kosovo ARBK, Albania QKB, Macedonia CRM desde otra IP.

134. **Reintentar capturas de Wayback truncadas a 1.048.576 bytes** cuando aparezca otra captura: Oleksandriya 2018, Kolos Kovalivka 2019-2020, Varaždin 2019, Partizan 2019-2021, Napredak 2018, Śląsk 2023, Widzew 2018, Arka 2022/23, Valmiera 2020, Dinamo Tbilisi 2018/2020. Tampoco están probados: Rukh Lviv y Kudrivka años previos, Dynamo Kyiv 2021-2024 (la página `fcdynamo.com/pages/40` reemplaza el año anterior), Zorya y Kryvbas (dominios `fczorya.com`, sin capturas de PDF), Rumanía Farul/UTA/Argeș/Slobozia en el Browser pane, Skalica/Dukla Banská Bystrica/Košice (Eslovaquia), Vardar y Struga (Macedonia).

135. **Candidatos a mail (existencia confirmada o muy probable, no escritos; Guido decide y aprueba cada envío, proceso en `club-outreach`)**: Fehérvár (`titkarsag@vidi.hu`, estados 2020-2025), Celje/Mura/Radomlje/Primorje (estados revisados para la licencia NZS), Universitatea Cluj (2020-2022 publicados como imagen), Vojvodina, Čukarički, Mladost Lučani, Sarajevo, Napredak, Partizan 2019-2022, Tirana 2022, Novi Pazar y Radnik Surdulica (todo), Górnik, Śląsk, Cracovia, Zagłębie, Motor, Arka, FK Panevėžys, Kauno Žalgiris, Valmiera, Liepāja, Noah, Urartu, Ararat FC, Dinamo Tbilisi 2018/2020, Qarabağ, Astana y Kairat (no están en el DFO), Vukovar 2020-2024.

136. **Texto propuesto para `paises/*.md` pendiente de aprobar** (no se editó ningún skill): Polonia, Rumania, Hungría, Eslovaquia, Eslovenia, Serbia, Bulgaria, Bosnia, Macedonia del Norte, Estonia, Letonia, Lituania, Georgia, Armenia, Azerbaiyán, Kazajistán, Bielorrusia y la actualización de Rusia (endpoints `details` y `XLS`), Croacia (Wayback, Slaven y Varaždin), Ucrania (Dynamo Kyiv, Shakhtar y Oleksandriya, corrigiendo el "dead-end"). Cada texto está al final de `fuentes/<País>/_notas-generales.md` (sección "Texto propuesto" o equivalente) y hay que mostrarlo antes de crear el archivo y su línea en el índice del `SKILL.md`. Regla general nueva a agregar a `club-sourcing` 0.1: Wayback por `https://`, una captura de 1.048.576 bytes exactos está truncada, y la licencia nacional de la federación (PZPN F.01, HNS, FSS, LFF, ...) suele ser el canal.

