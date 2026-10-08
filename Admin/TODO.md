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

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `fuentes/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

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

154. COLUMNAS POR ENTIDAD (Como 2025). CONOCIDO, SIN DAÑO HOY (decisión de Guido, 2026-10-07). En un "Prospetto Pro-forma di
    Consolidamento" (columnas Como 1907 | Società del Gruppo | Eliminazioni | Pro-forma) `extraer.mjs` toma la columna pro-forma aunque el
    perímetro fijado sea individual: no recibe el perímetro ni una columna de entidad (solo columna_ejercicio/columna_anterior del
    .ubicacion.json); `localizar.mjs` usa el perímetro solo para elegir BLOQUES. Las respuestas a una duda de columna quedan como nota.
    Único caso: Como 2025, cargado bien con 23 ajustes `fila` de la columna 1 (Admin/ajustes-manuales.jsonl). Como 2024 NO lo necesita: se
    carga desde el bilancio individual (Como-fascicolo-bilancio-2024) y el pro-forma 2024 quedó en Admin/documentos-descartados.txt.
    CUÁNDO HACERLO: con un segundo documento con columnas por entidad y perímetro individual fijado. DISEÑO (como escalón): en extraer.mjs,
    con perímetro individual y una cabecera de 4+ columnas cuya primera columna de importes es la del club (con "Eliminazioni"/"Pro-forma"
    a la derecha), leer esa columna fila por fila; compuerta: su total impreso = la suma de sus filas; si no, la IA como hoy. Medir: Como
    2025 tiene que dar los 23 ajustes `fila`; en los demás .filas.json no dispara.

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

156. ITALIA: VARIACIÓN DE EXISTENCIAS Y SUBTOTALES REPETIDOS. CONOCIDO, SIN DAÑO HOY (decisión de Guido, 2026-10-07). El doble conteo
    de la "variazione delle rimanenze" solo existe en las lecturas 0-3 (valor absoluto); los documentos cierran bien en la 4 o la 5. El
    escalón B ya entró (Versión 581). Quedan dos escalones medidos por un subagente que NO corrigen ningún dato cargado:
    - A) `cerrarNota` firma las hojas con el signo de la SUMA (verificar.mjs ~L147): Napoli 2024, nota b72 (pág. 52, .md L2097-2107,
      795.012 − 3.704.825 + 2.816.272 − 5.917 = −99.458) queda +99.458, la lectura 4 falla por 198.916 y gana la 5 (cargado bien, 29 líneas,
      ninguna de nota). Como troubleshoot: si la 4 no cierra, repetirla con las hojas con el signo impreso del renglón; misma compuerta.
      Ganancia: solo detalle de Napoli 2024.
    - C) hecho como escalón del to-do 175 (Versión 586, "subtotal repetido").
    CUÁNDO HACERLO: si aparece un documento que con esto queda mal o frenado. Para arreglarlo a mano: un gasto con valor negativo NO resta
    (los gastos van en valor absoluto); una partida que reduce costos se muda al lado ingreso con el mismo valor (Roma 2018, "Variazione
    delle rimanenze (reduce costos)", 82); un total contado como línea se saca con `fila --valor "0" --reemplaza "<etiqueta>"`.

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

166. ITALIA: SECCIÓN D Y 17-BIS SIN SIGNO (verificar.mjs). Ya pasó lo que el to-do 155 esperaba ("CUÁNDO HACERLO"): documentos sin cargar
    que no cierran por el patrón. Los informes de los subagentes con el detalle de los to-dos
    166-173 (causa, ejemplo y escalón por caso): Admin/informes-etapa6-italia/informe-{A,B,C,D}.md. Casos, resueltos con ajustes `fila`:
    - 17-bis / "b) perdite su cambi" impreso en positivo que resta: Atalanta 2019 (L429, 923), Napoli 2022 (L294, 6.136), Napoli 2023
      (L280, 212; cargado).
    - D) rettifiche sin lado: AC Milan 2017-18 (L1016, svalutazioni 218: −125.801 vs −126.019 impreso), AC Milan 2021-22 (L835 +521,
      L840 (1.000)); hay 5 ajustes iguales de antes (Milan 2023-24 x2, Inter 2021-22 y 2024-25, Bologna 2019-20).
    - 17) sin la etiqueta "17)" se suma como ingreso: Torino 2019 (L647, 609.108).
    - D) "a) di partecipazioni (4.000)" entra como INGRESO por el signo y la tolerancia lo tapa: Atalanta 2025 (L251; resultado 8.000 € alto).
    DISEÑO (escalón, una compuerta): las filas entre "C)"/"D) RETTIFICHE" y "Risultato prima delle imposte" se leen como financiero con su
    signo (18) suma, 19) resta, perdite del 17-bis restan); compuerta: su suma = el Totale C/D impreso y el resultado cierra EXACTO.

167. LECTURA 0: EL TOTAL CONTADO COMO UNA LÍNEA MÁS (verificar.mjs). La lectura 0 (y la rama "filaTotal" del chequeo de totales) suma la
    fila TOTAL además de sus hojas, y toma los renglones entre paréntesis en valor absoluto. Cuando ninguna otra lectura cierra, el caso que
    llega a la cola trae números absurdos. Casos: Lazio 2007-08 (TOTALE RICAVI L3413 + sus 18 hojas: 204,96 = 2 × 102,48; el año anterior
    da 152,54 = 2 × 76,27), AC Milan 2017-18 (ingresos 511.716 vs 255.733), Napoli 2022 (gastos 483,2 vs 241,2), Atalanta 2019 (gastos 295,8
    vs 147,7), Lazio 2011-12. Napoli 2022 NO se cargó: con un ajuste `resultado-final` verificar deducía un impuesto de −254,9 M que
    absorbía el doble conteo (ajuste anulado). Variante: Lazio 2012-13 compara el "total de gastos" con TOTALE COSTI OPERATIVI, que en
    Italia deja las amortizaciones debajo (93,33 vs 114,57; las líneas están bien). DISEÑO: sacar la fila total de las hojas antes de sumar;
    compuerta: sin ella, la suma de las hojas = el total impreso.
    Intento con ajustes en Lazio 2007-08 (2026-10-08): con TOTALE RICAVI en 0 (L3413) y el financiero y el impuesto agregados (L3469,
    L3494), los ingresos dan bien (102.482.030) pero los gastos siguen en 462,2 M: el chequeo dice "TOTALE COSTI OPERATIVI 52.667.128
    cierra; además se suman 39 línea(s) fuera de ese total (409,6)", con las notas en miles b197/b204 sumadas como si fueran euros. Poner
    esas filas en 0 por ajuste empeora (29.047.461): no se arregla a mano. Las hojas del estado (L3415-L3454) suman 68.609.526 y con ellas
    cierra: 102.482.030 − 68.609.526 − 4.962.375 − 15.148.258 = 13.761.871 contra 13.761.874 impreso.
    Lazio 2011-12 tampoco se arregla con ajustes: la extracción omitió las ~40 sub-filas del estado en euros (L3551-L3650); hace falta
    volver a extraer ese documento (la respuesta "no" a 1896cce ya está).

168. LOCALIZAR: EL ESTADO PARTIDO EN BLOQUES (localizar.mjs). El estado de resultados queda incompleto cuando el .md lo parte en tablitas o
    en texto con layout: Napoli 2022 (el resultado L309 quedó en otro bloque, b15), Inter 2019-20 (corta en L910; el resultado está en L912 y
    L918), Hellas Verona 2023 (huecos: 11) L357, 12) L360 y la sección C L387-L395), Monza 2023 (tabla cortada en el salto de página,
    b39/b40). DISEÑO: extender el estado a los bloques consecutivos hasta "Utile (perdita) dell'esercizio"; compuerta: con ellos, ingresos −
    gastos ± financiero ± impuesto = ese resultado exacto. Además verificar.mjs (ANTES_RE) no reconoce "prima delle imposte" (Napoli 2022).

169. EXTRAER: ETIQUETAS SEPARADAS DE LOS IMPORTES Y SUB-FILAS OMITIDAS (extraer.mjs). Cuando la transcripción deja el estado como texto
    plano o con las etiquetas en una columna y los importes en otra, extraer solo lee tablas y el estado queda sin financiero ni impuesto:
    Genoa 2022 (pág. 10 del visor, L425-L497: financiero 0,158 e impuesto 0), Sampdoria 2018 (pág. 27, L1045-L1064), Torino 2019 (pág. 13).
    También omite las hojas del estado cuando una nota las repite y verificar cae a las notas en miles: Lazio 2011-12 (L3552-L3611), Lazio
    2012-13 (columnas corridas en pág. 99, L3635-L3661). Y cuenta filas hijo junto con su padre ya abierto por la nota: Fiorentina 2021-22
    (L970-971, 7.876.653 de más), 2023-24 (L854), 2024-25 (L912, L920-921, L960-961). DISEÑO por escalón: emparejar etiquetas e importes por
    orden solo si la aritmética del estado cierra con ese emparejamiento; sacar una fila cuyo importe = la suma de las filas que desglosan a
    su padre.

170. GESTIÓN DE JUGADORES BRUTA SIN LADO (verificar.mjs). En los estados IFRS de Roma, "Ricavi/Oneri da gestione dei diritti pluriennali"
    quedan sin lado y se pierden (Roma 2021: L2148 36.125 y L2149 (37.323); ingresos 190.414 vs 226.537 de la columna 2021 del documento
    2022), y filas posteriores al resultado (EPS L2161, otro resultado integral L2163) se cuelan en la lectura 6. DISEÑO: en la lectura 6,
    solo las filas "otro" entre el total de costos y "Risultato prima delle imposte"; compuerta: resultado impreso exacto y, si el año
    vecino imprime ingresos, que coincidan.

171. SIGNO DE UN COSTO NEGATIVO EN UN AJUSTE `fila` (verificar.mjs). CONOCIDO, SIN DAÑO HOY (medido 2026-10-08). Un ajuste `fila` de gasto
    con valor impreso negativo (variazione delle rimanenze a favor) solo resta en la lectura 4 (lleva el signo relativo a la mayoría de los
    ajustes de su lado, Versión 493); en las demás lecturas entra en valor absoluto. Los dos casos que lo abrieron cargan bien: Fiorentina
    2023-24 cierra exacto por la lectura 5 con la variación +87.751 a favor (.md L885, costos impresos en negativo); Hellas Verona 2023
    cierra por la lectura 4 con su ajuste (25.971) restando (a 618 EUR del impreso; con el signo al revés serían 51.942). Relacionado con
    el 156 (gastos en valor absoluto en las lecturas 0-3). CUÁNDO HACERLO: si un documento no cierra porque un ajuste de gasto negativo
    suma. DISEÑO (escalón, no regla): si ninguna lectura cerró el resultado EXACTO y hay ajustes `fila` de gasto con valor impreso
    negativo, repetir las lecturas con esos ajustes restando; compuerta: el resultado impreso exacto (y gana solo si con el signo de hoy
    no cierra exacto).

172. AÑO VECINO SIN LOS AJUSTES DEL OTRO DOCUMENTO (verificar.mjs). CONOCIDO, SIN DAÑO HOY (medido 2026-10-08). El chequeo "documento del
    año N" compara contra las filas crudas del otro documento, sin sus ajustes `fila`. El caso que lo abrió (Parma 2024 contra Parma 2023)
    ya no existe: Parma 2023 dejó su ajuste con el escalón "subtotal repetido" (Versión 586). Medido sobre todo Generados/: 222 chequeos de
    año vecino, 14 fallan; solo 2 son de este tipo y los dos coinciden contra el total VERIFICADO del otro documento (con sus ajustes): AS
    Roma 2019 contra 2018 (320.428 vs 320.509) y Juventus 2005-06 contra 2004-05 (259.082.991 vs 259.082.991). Ninguno frena: los dos están
    cargados, en "ok" y sin casos en la cola. CUÁNDO HACERLO: si una falsa alarma de este tipo frena un documento. DISEÑO (escalón): si el
    chequeo falla y usa la columna del ejercicio del OTRO documento (el anterior, dy=-1) y ese documento tiene ajustes `fila`, comparar
    contra su totales.ingresos del .verificacion.json; compuerta: la misma tolerancia del chequeo.

173. DUDAS QUE NO DEBERÍAN IR A LA COLA (extraer.mjs / verificar.mjs). De los 71 casos de la etapa 6 del lote 28, ~20 eran dudas ya resueltas
    por un criterio decidido o por el propio cierre: cuadro de nota que repite el estado, desglose parcial (solo tesserati), dudas con la
    polaridad al revés ("¿se carga además…?" con propuesta sí y el porqué dice que duplica). Ejemplos: Atalanta 2019 a0304c3 (b9),
    Sassuolo 2024 6795125, Inter 2019-20 c672389 y 45d7976, Lazio 2018-19 476c85a, Lazio 2023-24 37997ee, Roma 2023 db1b8e4, Roma 2024
    8c734f1, Fiorentina 2168732, 2daea52, 0980fea, Sampdoria 9414130, 2f9021a, 075611c, Torino 2023 68dc65d. Y "primer año" o "escala"
    que se podrían aceptar solos si totales y resultado cierran exactos (Cremonese 2022 a3d272e, Atalanta 2025 939f93c; Milan 2021-22
    5a70fe0: la escala está impresa en L749, fuera de la ventana del bloque). DISEÑO: aplicar el criterio antes de crear la duda y dejarla
    como nota; compuerta: el chequeo del resultado que la toca cierra exacto.

176. ETAPA 4 CON NÚMEROS SIN CONFIRMAR FRENA LA CATEGORIZACIÓN (lote.mjs / validar-bloques.mjs). Con la etapa 6 cerrada, la validación de
    los bloques contra el PDF dejó números sin confirmar y el lote no categoriza: AS Roma 2021 (13 números; la verificación cierra exacto,
    −185.573), Atalanta 2019 (12), Torino 2023 (1). Mirar en Generados/Italia/<Club>/<doc>.validacion.json qué números son y por qué
    validar-bloques no los encuentra en el texto del PDF; si la etapa 6 cierra exacto con ellos, que la compuerta de la etapa 6 los confirme.
