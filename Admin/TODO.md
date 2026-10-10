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
- **Los pendientes de sourcing de un país no van acá**: viven en `fuentes/<País>/_notas-generales.md` (decisión de Guido, 2026-09-14, reafirmada el 2026-10-04). La lista de lo sacado el 2026-09-14 está en `Admin/Archive/todo-sacados-2026-09-14.md`.

---

## Qué hay que hacer

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `fuentes/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

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

165. ALTAS DE CLUBES NUEVOS FUERA DE ITALIA (decisión de Guido, 2026-10-07; estado al 2026-10-09). Un país por vez, con el pipeline
    (skill club-or-year-onboarding; club nuevo: revisión del alta en Admin/altas-revision.jsonl, que ya tiene nombre, color, perímetro, cierres
    y ligas de los 56 "listo-para-alta" de ese día). `alta-club.mjs --todos` del 2026-10-09: 50 listos, 74 con preguntas, 35 ya en el sitio.
    HECHO: Brasil completo (8 clubes, 61 años, lotes 56-63) y Rusia desde el fisco (tools/bfo-rusia.mjs: 16 clubes, 78 años, con el formulario 6 en los 5 que
    lo usan; no entra Akhmat 2021, sin formulario 2). Escalón 2 sin IA aplicado: costos por elemento de Rostov 2021-2024 y Orenburg 2021-2023.
    FALTA, en este orden:
    b) Rusia, escalón 2 aplicado (tools/bfo-rusia-notas.mjs, US$ 0,72). Queda: las tablas de otros ingresos y gastos que no suman el código
       del formulario (Krasnodar, Krylia 2021-2025, Rostov 2025, Rubin 2022-2025: la nota los presenta en bruto, el formulario en neto);
       se podría probar la compuerta contra el total bruto de la nota más una fila de "diferencia de presentación". Sin daño hoy: esos años
       quedan con el renglón entero.
    c) Los demás países de los "listo-para-alta": Grecia 6, Rep. Checa 6, Colombia 5, Portugal 5, Países Bajos 4, Turquía 3, Ucrania 3,
       Bélgica 2, Corea 2, y Austria, Croacia, Dinamarca, Noruega y Suiza 1 cada uno. Ojo: muchos PDFs de Países Bajos, Portugal y Rep. Checa
       todavía no tienen .md (etapa 2 entera); las 12 preguntas de la revisión del alta (Rapid Wien 2024-25, OB, Sandefjord, Groningen, Rio Ave,
       Tondela, Pardubice, Gaziantep, Alanyaspor, Trabzonspor, La Equidad, nombres romanizados) están en Admin/altas-revision.jsonl.
    d) Las 16 preguntas de nombre legal de los clubes que bajaron a "con-preguntas" el 2026-10-09 (Noruega 7, Portugal 3, Chequia 2, Baltika,
       Basel, Go Ahead Eagles, Başakşehir): contestarlas con cita del documento las devuelve a "listo-para-alta".
    PRÓXIMOS: Grecia (lote 64, etapa 2 ~US$ 3,31) y Rep. Checa (lote 65, etapa 2 ~US$ 31: 129 documentos, casi todos sin .md).
    Herramientas de la sesión: `lote.mjs --cargar` (escribe solo lo que queda listo, un commit por año), inventario `--solo`, `--reintentar`
    con propuestas frescas, escalón de documentos de pocos renglones. Las mejoras de script vistas quedan en los to-dos 197-202.

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

195. GESTIONES DE LOS CLUBES YA CARGADOS QUE NO LAS TIENEN (pedido de Guido, 2026-10-09). Medido ese día (clubes con gestión / clubes en el sitio): Países Bajos 0/4,
    Japón 0/10, Grecia 0/2, México 0/1, Perú 0/1, Croacia 1/8, Bélgica 2/14, España 1/19, Dinamarca 2/11, Chile 1/3, Colombia 4/12, Alemania 5/11, Brasil 16/34,
    Inglaterra 16/19 (unos 75 clubes). Un Sonnet por país, con fuente por cada fecha, mismo formato y regla que data/gestiones/ar.js (lo hecho con Juventus, to-do 194).



197. EXTRAER: FALTA EL ENSAYO DE `prueba-completa` del escalón del tope de salida (después de la corrida del lote 66: el ensayo reescribe el
    registro). El escalón ya se probó de verdad (2026-10-10, Ferroviária dre-2022 con el tope del escalón 0 bajado a 1.500 en una copia:
    se cortó, reintentó por streaming y terminó; US$ 0,24). Dato de la prueba sin forzar: la misma extracción de dre-2022 esta vez trajo solo
    los 13 grupos en negrita del balancete (2.213 tokens, US$ 0,14) en vez de las ~580 cuentas, con la pregunta en dudas: en balancetes la
    IA no siempre elige el mismo nivel de detalle.

199. SUBTOTAL QUE INCLUYE FILAS DEL FINANCIERO (conocido, sin daño hoy). Patrones A y B resueltos. El C (Avaí 2021: "Receitas do Futebol
    Profesional" 25.303.151 = ingresos + "Receita Financeira" 27.397; en gastos, "Despesas financeiras" dentro de los costos) necesita dos
    escalones: no contar el subtotal que suma renglones de cualquier lado, y además el signo del financiero según el bloque que lo contiene
    (suma dentro de ingresos, resta dentro de gastos); con el primero solo el resultado no cierra (55 mil = 2 × 27.397). Medido el primero:
    cambia Ferroviária 2012 (una fila "Sócio torcedor" en 0 que pasaría a cargarse). Un solo caso y ya cargado a mano: no se hace. Remo 2020
    sigue en la cola sin sus ajustes (subtotales de gastos). Si aparecen más casos como Avaí, rediseñar con los dos escalones juntos.

206. CABECERA DE LOS AÑOS DE RUSIA EN data/ (cosmético). Los años escritos por tools/bfo-rusia.mjs llevan el comentario de cargar.mjs ("Filas:
    proponer-carga.mjs (ancla-listas); categorías: <md>.categorias.json"), que no es cierto para ellos (sale del JSON del fisco). `escribir()`
    podría recibir el texto de la cabecera en P.

207. ESCALA: REMEDIR "OTROS NEGOCIOS DEL CLUB" (revisión de la skill `escala-finance-of-sports`, sección I). La señal para evaluar un eje
    separado de otros negocios del club era "~300 clubes cargados" y la proporción (~10 %) se midió con 161 clubes; hoy hay más (ver
    `Admin/ESTADO-clubes.md`). Remedir la proporción en la próxima corrida del eje `escala` y, si cambió, actualizar ese punto de la skill
    (umbral y criterio).

208. COMENTARIOS EN LO QUE SE PUBLICA (`index.html` y `js/*.js`). Son ~43% de `index.html` (~46 KB de 107 KB) y ~2.300 líneas en `js/`, y
    viajan a cada visitante (se ven con "ver código fuente"). Opciones: (a) mover el porqué a `Admin/PANTALLA.md` y dejar en el código solo
    comentarios cortos; (b) que `netlify.toml` los saque en el deploy con un minificador (paso de build, hoy el proyecto no tiene ninguno).
    Recomendado: (a), en una sesión aparte. De paso: quedan cuatro "41 clubes" en comentarios de `index.html`.

