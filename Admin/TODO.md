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

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `fuentes/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

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

165. ALTAS DE CLUBES NUEVOS FUERA DE ITALIA (decisión de Guido, 2026-10-07; estado al 2026-10-09). Un país por vez, con el pipeline
    (skill club-or-year-onboarding; club nuevo: revisión del alta en Admin/altas-revision.jsonl, que ya tiene nombre, color, perímetro, cierres
    y ligas de los 56 "listo-para-alta" de ese día). `alta-club.mjs --todos` del 2026-10-09: 50 listos, 74 con preguntas, 35 ya en el sitio.
    HECHO: Brasil completo (8 clubes, 61 años, lotes 56-63) y Rusia desde el fisco (tools/bfo-rusia.mjs: 7 clubes, 34 años).
    FALTA, en este orden:
    a) Rusia: los 9 clubes restantes (Zenit, Spartak, CSKA, Lokomotiv, Dynamo Moscú, Rubin, Akhmat, Akron, Baltika): la revisión del alta
       (color, nombre, ligas) la está haciendo un subagente; después `node tools/bfo-rusia.mjs --club <Club> --escribir` (gratis).
    b) Rusia, escalón 2 (tools/bfo-rusia-notas.mjs): abrir 2110 / 2340 / 2350 y los costos con las tablas de las notas explicativas
       (24 notas, 48 tablas candidatas, ensayo ~US$ 1,60). Falta escribir la llamada, la compuerta (la suma da el código del formulario 2) y la
       reescritura del año en bfo-rusia.mjs. Las tablas estándar "Затраты на производство" (códigos 5610-5660, gastos por elemento: salarios
       5620 + cargas 5630) se pueden leer sin IA.
    c) Los demás países de los "listo-para-alta": Grecia 6, Rep. Checa 6, Colombia 5, Portugal 5, Países Bajos 4, Turquía 3, Ucrania 3,
       Bélgica 2, Corea 2, y Austria, Croacia, Dinamarca, Noruega y Suiza 1 cada uno. Ojo: muchos PDFs de Países Bajos, Portugal y Rep. Checa
       todavía no tienen .md (etapa 2 entera); las 12 preguntas de la revisión del alta (Rapid Wien 2024-25, OB, Sandefjord, Groningen, Rio Ave,
       Tondela, Pardubice, Gaziantep, Alanyaspor, Trabzonspor, La Equidad, nombres romanizados) están en Admin/altas-revision.jsonl.
    d) Las 16 preguntas de nombre legal de los clubes que bajaron a "con-preguntas" el 2026-10-09 (Noruega 7, Portugal 3, Chequia 2, Baltika,
       Basel, Go Ahead Eagles, Başakşehir): contestarlas con cita del documento las devuelve a "listo-para-alta".
    Herramientas de la sesión: `lote.mjs --cargar` (escribe solo lo que queda listo, un commit por año), inventario `--solo`, `--reintentar`
    con propuestas frescas, escalón de documentos de pocos renglones. Las mejoras de script vistas quedan en los to-dos 197-202.

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

195. GESTIONES DE LOS CLUBES YA CARGADOS QUE NO LAS TIENEN (pedido de Guido, 2026-10-09). Medido ese día (clubes con gestión / clubes en el sitio): Países Bajos 0/4,
    Japón 0/10, Grecia 0/2, México 0/1, Perú 0/1, Croacia 1/8, Bélgica 2/14, España 1/19, Dinamarca 2/11, Chile 1/3, Colombia 4/12, Alemania 5/11, Brasil 16/34,
    Inglaterra 16/19 (unos 75 clubes). Un Sonnet por país, con fuente por cada fecha, mismo formato y regla que data/gestiones/ar.js (lo hecho con Juventus, to-do 194).



197. EXTRAER CORTA POR EL TOPE DE SALIDA EN DOCUMENTOS LARGOS (mejora de script). `extraer.mjs` pide todas las filas en una respuesta (maxTokens 32.000): un
    libro contable de 9 páginas y ~580 cuentas (Ferroviária dre-2022) llegó cortado y se descartó (US$ 0,79 sin resultado). Partir en varias llamadas
    por bloque, o pedir solo los renglones de primer nivel cuando el bloque es un balancete. Ferroviária 2022 se cargó a mano mientras tanto.

198. SIGNO DEL RESULTADO EN DRE CON SALDOS D/C (mejora de script). Los balancetes imprimen la pérdida en positivo ("= Prejuízo 1.222.442,07 D") y la carga
    frena por tie-out hasta fijar `resultado-final` negativo a mano: Ferroviária 2013-b y 2014-b, Paysandu 2025 (este imprime todo el DRE con signos de
    balancete). Escalón posible: si el resultado solo cierra con el signo invertido y el documento marca D/C o trae los ingresos en negativo, proponerlo.

199. SUBTOTALES CONTADOS DOS VECES EN LA EXTRACCIÓN (optimización: el mayor gasto de tokens de sesión del lote 56). Subtotal y sus componentes juntos
    (Avaí 2021: ingresos 75,9 M contra 25,3 M reales; Remo 2019-2024; Ferroviária; Vila Nova 2015-2017): decenas de ajustes `fila` a mano para sacar
    el subtotal. Ver si verificar.mjs puede detectar "renglón = suma de los siguientes" y proponer sacarlo antes de la cola.

200. AJUSTE `fila` DEL LADO GASTO NO ACEPTA UN RENGLÓN QUE RESTA (mejora de script). verificar.mjs toma el valor absoluto, así que un crédito dentro de un
    subtotal de gastos (Criciúma 2022 "Outras receitas Operacionais" dentro de custos; Avaí 2021 "Transferência para o Imobilizado") obliga a sacar el
    subtotal y cargar los componentes. Aceptar el signo impreso en `fila`.

201. EL CHEQUEO DE AÑO VECINO SUMA DE MÁS EN ALGUNOS DOCUMENTOS (optimización: casos falsos en la cola). Remo dre-2024 da 76,58 M de ingresos 2024 (2 × 38,29)
    contra el documento 2025, y Ferroviária 2024 da 114,4 M para la columna 2023 (37,56 M real). Cada uno levanta un caso que hay que contestar a mano.

202. LAS ALTAS DE DRE DE UNA PÁGINA PREGUNTAN `reportType` (optimización). Remo dre-2019/2023/2024 y Ferroviária 2013-b a 2018: 8 ajustes iguales a mano
    ("es la DRE del ejercicio, el balance está en otro PDF"). Escalón: si el .md trae "Demonstração do Resultado" con el período completo del año, ok.

