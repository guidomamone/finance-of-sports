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
- **Los pendientes de sourcing de un país no van acá**: viven en `fuentes/<País>/_notas-generales.md` (decisión de Guido, 2026-09-14, reafirmada el 2026-10-04). La lista de lo sacado el 2026-09-14 está en `Admin/Archive/todo-sacados-2026-09-14.md`.

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
    (m) `estado.mjs` estima la etapa 2 con un costo fijo por documento (US$ 0,20) y subestima los PDFs largos: Lazio, 19 PDFs de 151-208
        páginas, da ~US$ 4 contra US$ 25,60 del ensayo de `pipeline.mjs`, que cuenta páginas. Que estime por páginas, como el ensayo.
    (n) `pipeline.mjs` imprime "Etapas 1-2: transcribir y validar" (numeración del proceso viejo) para lo que en `Admin/PIPELINE.md` es la
        etapa 2. Que use la numeración de `PIPELINE.md`.

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
    particiones bajan a ≈85-90 KB: CONVENCIONES ya está partido (proceso / `CONVENCIONES-DATOS.md` / `PANTALLA.md`); faltan TODO sin el sourcing por país ni el detalle
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

130. SUDAMÉRICA: DECIDIR EL ESQUEMA PARA CLUBES POLIESPORTIVOS Y OTROS DEPORTES. Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.

144. QUÉ ENTRA AL SITIO: DOS DECISIONES DE PRODUCTO QUE ESTABAN EN LAS NOTAS DE SOURCING (2026-10-04; relacionado: el 130,
    clubes polideportivos y otros deportes).
    (a) Estados Unidos (ex to-do 127 g): TKO/Endeavor/Formula One Group no son clubes: decisión de Guido si el sitio las quiere.
    (b) México (ex to-do 50): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `fuentes/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

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

136. **Texto propuesto para `paises/*.md` pendiente de aprobar** (no se editó ningún skill): Polonia, Rumania, Hungría, Eslovaquia, Eslovenia, Serbia, Bulgaria, Bosnia, Macedonia del Norte, Estonia, Letonia, Lituania, Georgia, Armenia, Azerbaiyán, Kazajistán, Bielorrusia y la actualización de Rusia (endpoints `details` y `XLS`), Croacia (Wayback, Slaven y Varaždin), Ucrania (Dynamo Kyiv, Shakhtar y Oleksandriya, corrigiendo el "dead-end"). Cada texto está al final de `fuentes/<País>/_notas-generales.md` (sección "Texto propuesto" o equivalente) y hay que mostrarlo antes de crear el archivo y su línea en el índice del `SKILL.md`. Regla general nueva a agregar a `club-sourcing` 0.1: Wayback por `https://`, una captura de 1.048.576 bytes exactos está truncada, y la licencia nacional de la federación (PZPN F.01, HNS, FSS, LFF, ...) suele ser el canal.

