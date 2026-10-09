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

155. ITALIA: EL SIGNO DEL 17) Y DEL 17-BIS. CONOCIDO, SIN DAÑO HOY (escalones 1 y 2 hechos, Versiones 582 y 583). El escalón "17) resta"
    de verificar.mjs lee el 17) restando por posición y reemplazó los ajustes manuales de 14 documentos (Torino 2018/2021/2024, Udinese
    2021-22/2024-25, Napoli 2025, Cremonese 2025, Parma 2023, Bologna 2020-21/2021-22, Juventus 2002-03 a 2005-06). Quedan dos que
    siguen cerrando con sus ajustes (cargados bien):
    - Napoli 2024: el 17-bis desglosa "b) perdite su cambi" 4.559 impreso en positivo, que resta. El escalón deja el 17-bis con su signo.
    - Bologna 2019-20: además del 17), la sección D trae "19) svalutazioni di partecipazioni" (1.868.716) en positivo, que resta; el escalón
      solo mira la sección C.
    CUÁNDO HACERLO: si aparece un documento sin cargar con ese patrón (17-bis desglosado o la D con importes) y no cierra. Diseño: el mismo
    escalón extendido (perdite del 17-bis restan; en la D, 18) suma y 19) resta), con la compuerta del total impreso de esa sección.
    Bologna 2018-19 (sin cargar) ya lee bien: financiero (556.520), el C impreso.
    COMPROBADO 2026-10-09 (Sonnet): la lista "quedan dos" estaba vieja. Napoli 2024 y Bologna 2019-20 ya no tienen ajuste. Hoy sin su ajuste caen a cola Bologna 2023-24 y 2024-25, Genoa 2023, Torino 2019, Milan 2023-24 y Hellas Verona 2023 (en los cuatro primeros el financiero cambia de signo). Con ajuste solo cambia el detalle en Milan 2017-18 y 2021-22 e Inter 2024-25. Quedarían en "ok" con números mal repartidos (si se quitara el ajuste): Inter 2020-21 (1,973 M de la D pasan al impuesto), Roma 2005 (0,547 M) y Atalanta 2025 (4 mil). El total C impreso coincide con lo publicado en los 83 documentos que se pudieron parsear. Fusionar con 166 y 188; hacerlo si entra un documento con este patrón. Sin daño en datos.

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

166. ITALIA: 17) SIN NÚMERO Y LOS QUE QUEDAN CON AJUSTE (verificar.mjs). CONOCIDO, SIN DAÑO HOY. La sección D (Versión 589) y el signo del
    17-bis (Versión 590, las sumas eligen) ya los lee el script: Inter 2021-22, Bologna 2019-20, Como 2024, Atalanta 2019 y Napoli 2023/2024
    dejaron sus ajustes (cargas idénticas). Siguen con ajustes, cargados bien: AC Milan 2017-18 y 2021-22 e Inter 2024-25 (el escalón de la
    D cierra con otra lectura, con notas y redondeos de 1-2 mil EUR), AC Milan 2023-24 (no cierra sin ajuste), Torino 2019 (L647 609.108: el
    17) sin el número se suma como ingreso) y Napoli 2022 (sin cargar; to-do 167). Informes: Admin/informes-etapa6-italia/informe-{A,B,C,D}.md.
    CUÁNDO HACERLO: si un documento nuevo con este patrón frena.
    COMPROBADO 2026-10-09 (Sonnet): Inter 2021-22, Bologna 2019-20, Como 2024, Atalanta 2019 y Napoli 2023 y 2024 ya no tienen ajuste y las cargas son idénticas. Milan 2023-24 y Torino 2019 necesitan el suyo (sin él, cola; Torino 2019 daría financiero +1,110 en vez de −0,108); Milan 2017-18 y 2021-22 e Inter 2024-25 cierran igual con 1-2 mil EUR de diferencia. Napoli 2022 ya está cargado. Sin daño.

167. LECTURA 0: EL TOTAL CONTADO COMO UNA LÍNEA MÁS (verificar.mjs). La lectura 0 (y la rama "filaTotal" del chequeo de totales) suma la
    fila TOTAL además de sus hojas, y toma los renglones entre paréntesis en valor absoluto. Lazio 2007-08 y 2011-12 se resolvieron A MANO
    (decisión de Guido, 2026-10-08: documentos viejos, no justifican cambiar el script): ajustes que sacan TOTALE RICAVI / TOTALE COSTI
    OPERATIVI, y en 2011-12 las filas del estado armadas desde el .md con tools/estado-desde-md.mjs; los dos cargados. Lazio 2012-13 está cargado bien (solo
    falla el chequeo del total de gastos: en Italia TOTALE COSTI OPERATIVI deja las amortizaciones debajo).
    Napoli 2021 y 2022 ya están cargados (Versiones 593 y 594) gracias a la 168.
    DEFECTO DE FONDO, sin resolver: la rama filaTotal de ajuste() acepta como "líneas fuera de ese total" las filas de una nota (Napoli 2022
    sin resultado: gastos 483,2 M, el doble). Hoy se destapa solo si falta el resultado impreso. DISEÑOS posibles (de a uno, como escalón,
    midiendo los 163): (a) un "ok" sin resultado impreso no es "ok" si hay un resultado en el .md fuera del alcance del escalón 2; (b) la rama
    filaTotal no acepta líneas fuera del total que vienen de una nota; (c) sacar la fila total de las hojas antes de sumar.

169. EXTRAER: ETIQUETAS SEPARADAS DE LOS IMPORTES Y SUB-FILAS OMITIDAS (extraer.mjs). CONOCIDO, SIN DAÑO HOY (medido 2026-10-08): todos los
    documentos de abajo ya están cargados y cierran con sus ajustes (Genoa 2022, Sampdoria 2018, Torino 2019, Lazio 2011-12 y 2012-13,
    Fiorentina 2021-22, 2023-24 y 2024-25); ninguno frena. CUÁNDO HACERLO: un documento sin cargar con este patrón que frene. Cuando la transcripción deja el estado como texto
    plano o con las etiquetas en una columna y los importes en otra, extraer solo lee tablas y el estado queda sin financiero ni impuesto:
    Genoa 2022 (pág. 10 del visor, L425-L497: financiero 0,158 e impuesto 0), Sampdoria 2018 (pág. 27, L1045-L1064), Torino 2019 (pág. 13).
    También omite las hojas del estado cuando una nota las repite y verificar cae a las notas en miles: Lazio 2011-12 (L3552-L3611), Lazio
    2012-13 (columnas corridas en pág. 99, L3635-L3661). Y cuenta filas hijo junto con su padre ya abierto por la nota: Fiorentina 2021-22
    (L970-971, 7.876.653 de más), 2023-24 (L854), 2024-25 (L912, L920-921, L960-961). DISEÑO por escalón: emparejar etiquetas e importes por
    orden solo si la aritmética del estado cierra con ese emparejamiento; sacar una fila cuyo importe = la suma de las filas que desglosan a
    su padre.
    COMPROBADO 2026-10-09 (Sonnet): los datos coinciden con el .md (Genoa 2022, Sampdoria 2018, Torino 2019, Lazio 2011-12 y 2012-13, Fiorentina 2021-22, 2023-24 y 2024-25). Fiorentina 2024-25 (hijos contados: 28.844.321 y 14.283.626 en la columna 2024) daba una alarma falsa de año vecino; desde la Versión 625 la resuelve el escalón 1 del año vecino y queda en "ok". Sin sus ajustes Genoa 2022 y Sampdoria 2018 quedarían en "ok" con el financiero y el impuesto mal repartidos, porque un `resultado-final` o una respuesta vieja de la cola tapa la alarma (ver 191).

170. GESTIÓN DE JUGADORES SIN LADO (verificar.mjs). Hecho el escalón "gestión de jugadores neta" (Versión 601): AS Roma 2013 a 2017 cierran el resultado
    exacto y 2016 y 2017 pasan a "ok"; 2013 a 2015 solo conservan preguntas de tema en la cola. QUEDA: (a) Roma 2012 (la tabla reclasificada trae los
    costos de otra forma: el total de gastos 141.732 no cierra con las líneas 172.731); (b) Roma 2005 a 2011, con otras causas (2005 en unidades sin
    escala, 2007 y 2009 con el resultado, el año vecino en casi todos); (c) el caso viejo de Roma 2021, que se cargó con 2 ajustes `fila` (L2148
    36.125 ingreso, L2149 (37.323) gasto): "Ricavi/Oneri da gestione dei diritti pluriennali" BRUTOS en los estados IFRS quedan sin lado y se pierden;
    filas posteriores al resultado (EPS L2161, otro resultado integral L2163) pueden colarse en la lectura 6. CUÁNDO HACERLO (c): con otro documento
    IFRS de Roma que frene. DISEÑO (c) (escalón): si ninguna lectura cierra, en la lectura 6 solo las filas "otro" entre el total de costos y
    "Risultato prima delle imposte" (la misma ventana del escalón ya hecho); compuerta: resultado impreso exacto.
    Nota de cómo se compara el año vecino: un documento que cuenta la gestión de jugadores NETA como ingreso (Roma 2017: 254.076) no se compara con
    uno que no la cuenta (la columna 2017 del documento 2018: 175.000); "otro régimen", sin falsa alarma.

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

188. COSTOS FINANCIEROS DEL CODICE CIVILE: LO QUE EL ESCALÓN "17) RESTA" NO RESUELVE. CONOCIDO, SIN DAÑO HOY. Los peldaños A (17) por el nombre de la fila y
    subtotales anteriores, Versión 621) y B (la D que quedó en el financiero, Versión 623) ya están; Torino 2019 se recargó sin su ajuste. Siguen con ajustes,
    cargados bien: Milan 2017-18 y 2021-22 e Inter 2024-25 (cierran con la lectura 4 en vez de la 5, mismos totales y distinto detalle), Milan 2023-24 (el
    documento dice "19 rivalutazioni" en vez de svalutazioni: el signo debería elegirse por las sumas), Inter 2020-21 (la fila de la D no entró) y Roma 2005.
    CUÁNDO HACERLO: si un documento nuevo con este patrón frena. Cuidado: no probar una guarda genérica "si la propuesta es idéntica no propone nada": rompe Atalanta 2025.
    NO ANULAR los 4 ajustes del financiero de Bologna 2023-24 y 2024-25 (17) y D 19)) aunque el escalón ya cierre sin ellos (decisión de Guido, 2026-10-09):
    sin ellos el 17) y los otros proventi se llaman los dos "altri" y Finanzas multi-año (`filaDe`, js/finanzas-multi.js) los suma en una fila (+5,25 y −6,45 M
    se ven como −1,20 M). Los ajustes solo les dan nombres distintos.

