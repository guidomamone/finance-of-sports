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

166. ITALIA: 17) SIN NÚMERO Y LOS QUE QUEDAN CON AJUSTE (verificar.mjs). CONOCIDO, SIN DAÑO HOY. La sección D (Versión 589) y el signo del
    17-bis (Versión 590, las sumas eligen) ya los lee el script: Inter 2021-22, Bologna 2019-20, Como 2024, Atalanta 2019 y Napoli 2023/2024
    dejaron sus ajustes (cargas idénticas). Siguen con ajustes, cargados bien: AC Milan 2017-18 y 2021-22 e Inter 2024-25 (el escalón de la
    D cierra con otra lectura, con notas y redondeos de 1-2 mil EUR), AC Milan 2023-24 (no cierra sin ajuste), Torino 2019 (L647 609.108: el
    17) sin el número se suma como ingreso) y Napoli 2022 (sin cargar; to-do 167). Informes: Admin/informes-etapa6-italia/informe-{A,B,C,D}.md.
    CUÁNDO HACERLO: si un documento nuevo con este patrón frena.

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

168. LOCALIZAR: EL ESTADO PARTIDO EN BLOQUES (localizar.mjs). CONOCIDO, SIN DAÑO HOY (medido 2026-10-08). Primera parte hecha (Versión 592): el
    resultado impreso en una tabla de una fila pegada al estado ya se lee (Napoli 2021 y 2022). Queda el estado INCOMPLETO cuando el .md lo
    parte en tablitas o en texto con layout: Inter 2019-20 (corta en L910; el resultado, "Perdita d'esercizio", en L912 y L918), Hellas Verona
    2023 (huecos: 11) L357, 12) L360 y la sección C L387-L395), Monza 2023 (tabla cortada en el salto de página, b39/b40). Los tres están
    cargados y en "ok" (Inter 2019-20: pérdida −102.393.789, igual al impreso). CUÁNDO HACERLO: un documento sin cargar con este patrón que frene.
    DISEÑO: extender el estado a los bloques consecutivos hasta el resultado del ejercicio; compuerta: con ellos, ingresos − gastos ± financiero
    ± impuesto = ese resultado exacto.

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

170. GESTIÓN DE JUGADORES BRUTA SIN LADO (verificar.mjs). CON DAÑO (lote 40, 2026-10-08): AS Roma 2012 a 2017 (6 documentos) frenan con el total de gastos que no cierra. Antes: sin daño (2026-10-08). En los estados IFRS de Roma, "Ricavi/Oneri da
    gestione dei diritti pluriennali" quedan sin lado y se pierden; Roma 2021 se cargó con 2 ajustes `fila` (L2148 36.125 ingreso, L2149
    (37.323) gasto): ingresos 226.539, igual a la columna 2021 del documento 2022 (226.537), y resultado a 4 mil EUR del impreso (notas en
    miles). Filas posteriores al resultado (EPS L2161, otro resultado integral L2163) pueden colarse en la lectura 6. CUÁNDO HACERLO: con otro
    documento de Roma (u otro IFRS) que frene por esto. DISEÑO (escalón): si ninguna lectura cierra, en la lectura 6 solo las filas "otro"
    entre el total de costos y "Risultato prima delle imposte"; compuerta: resultado impreso exacto y, si el año vecino imprime ingresos,
    que coincidan.

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

173. DUDAS QUE NO DEBERÍAN IR A LA COLA (extraer.mjs / verificar.mjs). CON DAÑO desde el lote 40 (2026-10-08): la cola pasó a 267 casos (Salernitana
    2022: 38, Inter 2024: 23, Genoa 2023: 19) y 15 documentos frenan solo por preguntas. Antes (lote 28): ~20 de 71. De los 71 casos de la etapa 6 del lote 28, ~20 eran dudas ya resueltas
    por un criterio decidido o por el propio cierre: cuadro de nota que repite el estado, desglose parcial (solo tesserati), dudas con la
    polaridad al revés ("¿se carga además…?" con propuesta sí y el porqué dice que duplica). Ejemplos: Atalanta 2019 a0304c3 (b9),
    Sassuolo 2024 6795125, Inter 2019-20 c672389 y 45d7976, Lazio 2018-19 476c85a, Lazio 2023-24 37997ee, Roma 2023 db1b8e4, Roma 2024
    8c734f1, Fiorentina 2168732, 2daea52, 0980fea, Sampdoria 9414130, 2f9021a, 075611c, Torino 2023 68dc65d. Y "primer año" o "escala"
    que se podrían aceptar solos si totales y resultado cierran exactos (Cremonese 2022 a3d272e, Atalanta 2025 939f93c; Milan 2021-22
    5a70fe0: la escala está impresa en L749, fuera de la ventana del bloque). DISEÑO: aplicar el criterio antes de crear la duda y dejarla
    como nota; compuerta: el chequeo del resultado que la toca cierra exacto.

177. CLUBES QUE CAMBIARON LA FECHA DE CIERRE: LA ETIQUETA DE LA TEMPORADA SE VE MAL (data/clubs.js fiscalYearStart, uno por club; js/finanzas-anios.js
    etiqueta()). CONOCIDO, SIN ARREGLO (decisión de Guido, 2026-10-08: es puntual, no se toca). Atalanta cerró el 31/12 hasta 2021 y el 30/06 desde
    2023 (fiscalYearStart 07-01: 2019-2021 se muestran como "2018/2019".."2020/2021"); Parma al revés (30/06 hasta 2019, 31/12 desde 2021,
    fiscalYearStart 01-01: 2018 se muestra "2018" y es 17/18). Un ejercicio de menos de 12 meses no se carga: Atalanta 2022 (1/1 al 30/6/2022) se
    sacó y Parma sep-dic 2020 (4 meses) no se carga; los dos en Admin/documentos-descartados.txt. DISEÑO si algún día se hace: la etiqueta sale de
    la fecha de cierre de cada ejercicio (31/12 = "2021", 30/6 = "23/24") y no del valor por club.

179. ITALIA, LOTE 40: QUÉ FRENA A CADA UNO (2026-10-08). 76 PDFs de fútbol llevados por las etapas 3 a 8: 10 cargados (Hellas Verona 2022 se cargó después, con su duda aceptada), 66 frenados. Años = año de cierre
    (2020 = 2019-20). Grupos:
    - Solo preguntas de la cola, totales y resultado cierran (15): AC Milan 2021, Bologna 2018 y 2023, Fiorentina 2019, Genoa 2025, Hellas Verona
      2024 y 2025, Inter 2018 y 2019, Napoli 2018 y 2020, Parma 2017, Sampdoria 2019, Torino 2020 y 2025. Se destraban con el to-do 173.
    - El resultado o el total de gastos no cierra (24): AC Milan 2008 a 2012 (el resultado falla en todos, causa sin diagnosticar); AS Roma 2007,
      2009, 2011 (consolidado), 2012 a 2017 (2012 a 2017: to-do 170); Bologna 2024 y 2025; Genoa 2023; Inter 2023 y 2024; Lazio 2005, 2011,
      2014, 2016 y 2021.
    - El resultado cierra pero falla el chequeo contra el año vecino (11): AC Milan 2019, AS Roma 2005, 2006, 2008, 2010, 2011 (separato) y 2020,
      Inter 2021, Lazio 2004 y 2006, Sampdoria 2020. Mirar uno por uno si es falsa alarma (to-do 172) o error real.
    - Falta el alta del club (6): Chievo Verona 2014 a 2016, Juve Stabia 2024, Salernitana 2022 y 2023. Después de la cola.
    - Lazio 1999, 2000 y 2001 en liras (ITL): el sitio no tiene una moneda "legado"; decisión de Guido pendiente (cargar en ITL, convertir a
      euros o dejarlos sin cargar). Lazio 2000 además tiene el cierre del nombre del archivo distinto del contenido.
    - Sassuolo 2018, 2019, 2020, 2022 y 2023: ajuste de cierre 31/12 ya puesto; falta correr el lote de nuevo (etapa 7).
    - Parma 2016 (reintento por "Televisión" en 0, ~US$ 0,50), AC Milan 2013 (la suma
      de gastos no coincide con el total impreso).
    - Aparte: Juve Stabia semestral y Catania 2011 (lote 41): solo transcripción, no se cargan.
