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

165. ALTAS DE CLUBES NUEVOS FUERA DE ITALIA (otra sesión; decisión de Guido, 2026-10-07). `alta-club.mjs` deja 68 clubes sin preguntas
    ("listo-para-alta" en Admin/altas-club.jsonl), ninguno con data/<id>-data.js: Brasil (avai, crb, criciuma, cuiaba, ferroviaria,
    paysandu, remo, vilanova), Colombia (aguilasdoradas, alianzafc, atleticobucaramanga, deportestolima, laequidad), Grecia (aekathens,
    asterastripolis, levadiakos, oficrete, panserraikos, volosnfc), Noruega (bodoglimt, brann, kfum, lillestrom, rosenborg, sandefjord,
    start, valerenga), Países Bajos (excelsior, fcvolendam, goaheadeagles, telstar), Portugal (alverca, estreladaamadora, famalicao,
    moreirense, nacional, vitoriaguimaraes), Chequia (bohemianspraha1905, duklapraha, jablonec, karvina, mladaboleslav, pardubice,
    slaviapraha, spartapraha), Rusia (baltikakaliningrad, dynamomakhachkala, kryliasovetovsamara, orenburg, parinizhnynovgorod, rostov,
    sochi), Turquía (alanyaspor, gaziantepfk, istanbulbasaksehir, trabzonspor), Ucrania (koloskovalivka, obolon, veres), Bélgica (ohleuven,
    raallalouviere), Corea (fcseoul, jeonbukhyundaimotors), Suiza (basel, thun), Austria (rapidwien), Croacia (vukovar1991).
    NO ESTÁN LISTOS: "listo-para-alta" sale de un barrido del 2026-09-30 (`alta-club.mjs --todos`, Versión 311: ensayo gratis que lee el
    .md más nuevo de cada club; 13 con preguntas resueltas por Claude por API) y solo dice que el ensayo del alta no dejó preguntas.
    Ninguno pasó por el pipeline nuevo: sus .md son de la transcripción en masa de ~2026-09-26 y lo que tienen en Generados/ es del
    proceso viejo (listas de rubros, no cuenta como avance). Falta todo: etapa 2 (validar la transcripción) y etapas 3-8; el alta se
    escribe recién en el commit del primer año. Ojo: el registro está desactualizado (lista como pendientes 16 clubes de Italia que ya tienen alta):
    recalcular con `node tools/alta-club.mjs --todos` antes de armar lotes. Proceso: skill club-or-year-onboarding (club nuevo:
    subagente Sonnet por club que propone; color, liga y perímetro según club-nuevo.md).

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

195. GESTIONES DE LOS CLUBES YA CARGADOS QUE NO LAS TIENEN (pedido de Guido, 2026-10-09). Medido ese día (clubes con gestión / clubes en el sitio): Países Bajos 0/4,
    Japón 0/10, Grecia 0/2, México 0/1, Perú 0/1, Croacia 1/8, Bélgica 2/14, España 1/19, Dinamarca 2/11, Chile 1/3, Colombia 4/12, Alemania 5/11, Brasil 16/34,
    Inglaterra 16/19 (unos 75 clubes). Un Sonnet por país, con fuente por cada fecha, mismo formato y regla que data/gestiones/ar.js (lo hecho con Juventus, to-do 194).


196. REINTENTO DE "CATEGORÍAS EN 0" QUE `lote.mjs --reintentar` NO LEVANTA (mejora de script, en análisis; Guido 2026-10-09: "sí"). `cargar.mjs` frena
    con "categorías en 0 que deberían tener número ... Reintento: lote.mjs --reintentar", pero el lote solo reintenta desgloses que no suman y dice "sin
    desgloses que reintentar". Casos: Vila Nova 2021-2024 (TV, bilheteria y sócio-torcedor dentro de "Receita com prestação de serviços", 24,5 M en 2023,
    abiertos en la nota 30.1) y Avaí 2021. Diseño con la escalera y un caso real antes del código.

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

203. LOS DOCUMENTOS DE MENOS DE 5 RENGLONES NUNCA SE CATEGORIZAN (mejora de script, frena carga). `verificar.mjs` (avisarRegistro) marca `sin-rubros` en vez
    de `listo-para-jev` si el documento tiene menos de 5 rubros, y `cargar.mjs` frena "todavía no se puede categorizar" para siempre. Casos: Remo dre-2019
    (2 rubros), dre-2023 y dre-2024 (3), relatorio-auditoria-2020 (4): DRE de una página con los ingresos y gastos en 1-2 renglones; sus categorías y
    los "posiblemente incluido en" ya están fijados a mano. Escalón posible: con la etapa 6 cerrada contra el resultado impreso, un documento de pocos
    renglones pasa a listo-para-jev.
