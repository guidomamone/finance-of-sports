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
    COMPROBADO 2026-10-09 (informe de un Sonnet, aritmética sin revalidar): único documento Como 2025; sus 23 ajustes `fila` coinciden con la columna "Como 1907" (.md L356-L409) y el resultado publicado es el impreso. Sin ellos cargaría la pro-forma (ingresos 62,05 M y gastos 192,35 M contra 55,40 M y 158,61 M). Los otros "Eliminazioni" de `Clubes/**/*.md` son tablas de segmentos. Italia está cerrada: no crece. Re-medir solo si aparece un Como 2026 u otro documento con columnas por entidad.

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
    COMPROBADO 2026-10-09 (Sonnet): Napoli 2024 cierra con la lectura 5 (29 líneas del estado, variación −0,099458; nota b72 .md L2097-L2107) y el signo de las 90 líneas de existencias de Italia coincide con lo impreso. Solo Roma 2007 y 2018 llevan un ajuste que mueve la variación al lado ingreso (+238 y +82), por convención, sin efecto en el resultado. Sin daño.

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

168. LOCALIZAR: EL ESTADO PARTIDO EN BLOQUES (localizar.mjs). CONOCIDO, SIN DAÑO HOY (medido 2026-10-08). Primera parte hecha (Versión 592): el
    resultado impreso en una tabla de una fila pegada al estado ya se lee (Napoli 2021 y 2022). Queda el estado INCOMPLETO cuando el .md lo
    parte en tablitas o en texto con layout: Inter 2019-20 (corta en L910; el resultado, "Perdita d'esercizio", en L912 y L918), Hellas Verona
    2023 (huecos: 11) L357, 12) L360 y la sección C L387-L395), Monza 2023 (tabla cortada en el salto de página, b39/b40). Los tres están
    cargados y en "ok" (Inter 2019-20: pérdida −102.393.789, igual al impreso). CUÁNDO HACERLO: un documento sin cargar con este patrón que frene.
    DISEÑO: extender el estado a los bloques consecutivos hasta el resultado del ejercicio; compuerta: con ellos, ingresos − gastos ± financiero
    ± impuesto = ese resultado exacto.
    COMPROBADO 2026-10-09 (Sonnet): sin daño en datos, pero dependen de ajustes manuales Inter 2019-20 (`resultado-final` −102.393.789, .md L912 y L918, y una pregunta pendiente que no es de este defecto), Inter 2020-21 (`resultado-final` 245.579.264 más un ajuste de la sección D) y Hellas Verona 2023 (5 `fila` en L357, L360 y L387-L395; sin ellos cae a cola). Monza 2023 cierra solo. Italia está cerrada: no crece.

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
    COMPROBADO 2026-10-09 (Sonnet): los datos coinciden con el .md (Genoa 2022, Sampdoria 2018, Torino 2019, Lazio 2011-12 y 2012-13, Fiorentina 2021-22, 2023-24 y 2024-25). "Ninguno frena" no era cierto para Fiorentina 2024-25: los hijos contados (28.844.321 y 14.283.626 en la columna 2024) dan una alarma falsa de año vecino y un caso de cola pendiente (49a0476). Sin sus ajustes Genoa 2022 y Sampdoria 2018 quedarían en "ok" con el financiero y el impuesto mal repartidos, porque un `resultado-final` o una respuesta vieja de la cola tapa la alarma. Ver 189.

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

171. SIGNO DE UN COSTO NEGATIVO EN UN AJUSTE `fila` (verificar.mjs). CONOCIDO, SIN DAÑO HOY (medido 2026-10-08). Un ajuste `fila` de gasto
    con valor impreso negativo (variazione delle rimanenze a favor) solo resta en la lectura 4 (lleva el signo relativo a la mayoría de los
    ajustes de su lado, Versión 493); en las demás lecturas entra en valor absoluto. Los dos casos que lo abrieron cargan bien: Fiorentina
    2023-24 cierra exacto por la lectura 5 con la variación +87.751 a favor (.md L885, costos impresos en negativo); Hellas Verona 2023
    cierra por la lectura 4 con su ajuste (25.971) restando (a 618 EUR del impreso; con el signo al revés serían 51.942). Relacionado con
    el 156 (gastos en valor absoluto en las lecturas 0-3). CUÁNDO HACERLO: si un documento no cierra porque un ajuste de gasto negativo
    suma. DISEÑO (escalón, no regla): si ninguna lectura cerró el resultado EXACTO y hay ajustes `fila` de gasto con valor impreso
    negativo, repetir las lecturas con esos ajustes restando; compuerta: el resultado impreso exacto (y gana solo si con el signo de hoy
    no cierra exacto).
    COMPROBADO 2026-10-09 (Sonnet): un solo caso real, Hellas Verona 2023 (25.971), que cierra por la lectura 4 a 618 EUR del impreso (con el signo al revés daría 51.942 más). Los otros 19 ajustes de gasto con valor negativo (Goiás 2012 y 2013, Roma 2018 y 2021) son costos impresos con paréntesis. Sin daño.

172. AÑO VECINO SIN LOS AJUSTES DEL OTRO DOCUMENTO (verificar.mjs). CONOCIDO, SIN DAÑO HOY (medido 2026-10-08). El chequeo "documento del
    año N" compara contra las filas crudas del otro documento, sin sus ajustes `fila`. El caso que lo abrió (Parma 2024 contra Parma 2023)
    ya no existe: Parma 2023 dejó su ajuste con el escalón "subtotal repetido" (Versión 586). Medido sobre todo Generados/: 222 chequeos de
    año vecino, 14 fallan; solo 2 son de este tipo y los dos coinciden contra el total VERIFICADO del otro documento (con sus ajustes): AS
    Roma 2019 contra 2018 (320.428 vs 320.509) y Juventus 2005-06 contra 2004-05 (259.082.991 vs 259.082.991). Ninguno frena: los dos están
    cargados, en "ok" y sin casos en la cola. CUÁNDO HACERLO: si una falsa alarma de este tipo frena un documento. DISEÑO (escalón): si el
    chequeo falla y usa la columna del ejercicio del OTRO documento (el anterior, dy=-1) y ese documento tiene ajustes `fila`, comparar
    contra su totales.ingresos del .verificacion.json; compuerta: la misma tolerancia del chequeo.
    REFUTADO 2026-10-09 (Sonnet, ya no es "sin daño" en la cola): hoy son 5 pares donde el documento anterior tiene ajustes `fila` (Juve 2004-05/2005-06, Roma 2007/2008, Roma 2018/2019, Lazio 2007-08/2008-09, Fiorentina 2023-24/2024-25); el diseño de este punto arregla 3. Lazio 2008-09 tiene 2 casos pendientes. Arreglo en 189.

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
    REFUTADO 2026-10-09 (Sonnet, leyendo y replicando el código; no visto en pantalla): ya no es "puntual". Son 17 ejercicios de 5 clubes (AC Milan 2008-2013, Atalanta 2018-2021, Fiorentina 2019, Genoa 2022-2023, Parma 2016-2019). Además de la etiqueta, `cierre()` de `js/finanzas-anios.js` asigna mal la gestión de Parma 2016 (sin gestión) y 2018 (Pizzarotti en vez de Jiang). Arreglo mínimo: tomar la fecha de cierre del `fxRef` de cada ejercicio (p. ej. `EUR@2018-06-30`) en `etiqueta()` y `cierre()` y dejar de usar `fiscalYearStart` por club. Necesita decisión de Guido (había dicho que no se tocaba) y medir de nuevo con cada club que cambie el cierre.

179. ITALIA: EL FÚTBOL ESTÁ CERRADO (2026-10-09). 175 ejercicios cargados (Juventus 23 y 152 de los otros 21 clubes; `node tools/tablas-sesion.mjs --italia`). Años = año de cierre (2020 = 2019-20). No queda nada de fútbol por cargar: Catania 2011 (un artículo de prensa, transcripto) y el Juve Stabia semestral (6 meses) están en `Admin/documentos-descartados.txt`. Quedaron resueltas: las gestiones de Roma (Sensi, Cappelli, DiBenedetto, Pallotta, con fechas de prensa y de la relazione) y de Inter (Thohir) en `data/gestiones/it.js`; Juve Stabia
    (Langella hasta junio de 2026, Guerri desde ahí); las altas nuevas de Chievo Verona, Salernitana y Juve Stabia (liga `it-seriec`, Serie C, tier 3); el ajuste manual `estado` (Roma 2005: b107-b112 en vez de la tabla de una controlada); y el ajuste `filas-a-mano` (Torino 2020 y 2025, Inter 2017-18, Lazio 2021 y Salernitana 2022: `localizar` y `extraer` no los pisan ni con `--rehacer`; para rehacerlos hay que agregar el ajuste con `--valor no`).

180. LIRAS (ITL) Y EL RESTO DE LAS MONEDAS LEGADO. Hecho (Versión 607) para Lazio 1998-99, 1999-00 y 2000-01: ajuste manual `moneda` (tools/ajustes.mjs), ITL en CURRENCY_META con
    `euroFijo` 1936.27, ITL@AAAA-06-30 en FX_CLOSE y una excepción en `toDisplayValue` (js/finanzas-calc.js) para mostrarlas en EUR. Falta: (a) cualquier otro club o país con ejercicios
    anteriores a 2002 (Italia: Roma y Milan tienen PDFs viejos? Juventus ya llega a 2003; otros países europeos: DEM, ESP, FRF, NLG, PTE...) necesita su entrada `euroFijo` y su FX_CLOSE
    del cierre, y un ajuste `moneda` en cada documento; (b) en las comparaciones y rankings de ligas de 1999 a 2001 conviene mirar que las liras se conviertan bien (se probó la pestaña
    Finanzas, no Comparar ni Ligas).

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

185. COLA HUMANA: 26 CASOS EN 14 DOCUMENTOS (2026-10-09). Son de documentos ya cargados cuyas respuestas quedaron como notas. Las gestiones de Roma y de Inter ya están completas.

186. PUSH A PRODUCCIÓN. Se subieron 103 commits el 2026-10-08 (`60103db83`) sin mirar el sitio en el navegador; hay unos 25 commits locales más desde entonces. Cada push es un deploy de Netlify y lo hace Guido. Antes de
    subir: `node tools/audit.js --quiet` (hoy P0 0 y P1 0) y abrir el sitio local para mirar Lazio (años en liras y Serie A 2005 a 2021), Roma, Milan, Torino, Bologna 2024-25 (individual), Chievo, Salernitana y Juve Stabia (liga Serie C en la pestaña Ligas).

188. COSTOS FINANCIEROS DEL CODICE CIVILE QUE SUMAN EN VEZ DE RESTAR (verificar.mjs). El 17) "interessi ed altri oneri finanziari" y el D 19) se imprimen en positivo y se restan por posición; el
    script los suma. Se arregló a mano con ajustes `fila` en Bologna 2019-20, 2020-21, 2024 y 2025 y Genoa 2023 (y Chievo lo resuelve el escalón de la sección E). Diseño pendiente: restarlos si el total
    C impreso solo cierra así, con la compuerta de siempre (el total de la sección impreso). Sin probar; ningún agente lo midió.
    DIAGNÓSTICO 2026-10-09 (un Sonnet midió en una copia, 242 documentos con verificación; propuesta lista en `Admin/propuestas/188-costos-financieros-codice-civile.diff`, NO aplicada): vale la pena. La lista de arriba está
    vieja: con el código de hoy ya cierran sin ajuste Bologna 2019-20, 2020-21 y 2021-22, Genoa 2023, Torino 2018, 2021 y 2024, Udinese 2021-22 y 2024-25, Como 2024 e Inter 2021-22 (esos ajustes son redundantes). Solo
    tres documentos con costo positivo necesitan el escalón: Torino 2019, Bologna 2023-24 y 2024-25. Causas: en Bologna la extracción dejó la sección D (L1279, "a) di partecipazioni 259.314", bajo "19) svalutazioni") como
    financiero y la compuerta del escalón 17 la suma contra el total de C; en Torino 2019 la tabla llegó sin etiquetas (sin "17)" en el .md) y el total de C no es el último subtotal. Diseño, dentro del escalón "17) resta"
    existente y sin escalón nuevo: (1) si el .md no trae el 17), tomarlo del nombre del renglón ("interessi e(d) altri oneri finanziari" o la versión en inglés de Juventus); (2) probar los subtotales del financiero del último
    al primero y quedarse con el primero cuya suma, con el 17) restando, da EXACTO el total impreso de C; (3) la D que quedó en el financiero: después del total de C el 19) resta y el 18) suma, solo si da exacto el último subtotal
    de D. Medición: con todos los ajustes puestos, 0 diferencias en las 87 de prueba-completa, en los 177 de Italia y en los 242; sin su ajuste, Torino 2019, Bologna 2023-24 y 2024-25 pasan de cola a ok con la carga idéntica.
    No resuelve (sus ajustes siguen haciendo falta): Milan 2017-18 y 2021-22 e Inter 2024-25 (cierran con la lectura 4 en vez de la 5, mismos totales y distinto detalle), Milan 2023-24 (el documento dice "19 rivalutazioni"
    en vez de svalutazioni: el signo debería elegirse por las sumas), Inter 2020-21 (la fila de la D no entró) y Roma 2005. Recomendación: hacerla; después, en otro paso, anular los ajustes redundantes. Cuidado: no probar una
    guarda genérica "si la propuesta es idéntica no propone nada": rompe Atalanta 2025.

189. EL CHEQUEO DEL AÑO VECINO NO USA LOS AJUSTES `fila` (verificar.mjs, `compararVecino` y `vecinoDe`). Lee el `.filas.json` crudo de los dos documentos, sin los ajustes, y un ajuste `fila` solo trae la
    columna ACTUAL, así que no hay cómo corregir la columna del año anterior. Casos (todos ya aceptados por la cola, sin daño en datos): Roma 2007 contra 2008 (157.589 contra 162.017: 2007 ya lleva
    la gestión neta por ajuste), Sampdoria 2020 contra 2021 (el ajuste que saca 10,63 M no llega a la columna anterior de 2021 y falta la fila Incrementi 1.779.291, L888), Inter 2021 (faltan 2 filas de
    taquilla de 2020: L640 27.574.094 y L642 16.802.772). Diseño pendiente: en la columna actual del documento propio y del vecino usar sus ajustes (reemplazar y agregar con la escala de cada uno) y
    permitir un valor para la columna anterior en un ajuste `fila`. Conocido, sin daño hoy: no se diseña hasta que aparezca un caso que la cola no pueda aceptar.
    REFUTADO 2026-10-09 (Sonnet, ya no es "sin daño" en la cola; datos publicados correctos, alarmas falsas explicadas al EUR): de 15 pares que fallan, 9 se deben a ajustes que el chequeo no lee (Juve 2003-04 a 2005-06, Roma 2006 a 2008 y 2018/2019, Lazio 2006-07 a 2008-09, Fiorentina 2023-25, Inter 2019-21, Sampdoria 2020/2021). Dejaron ~35 casos de cola contestados a mano y 8 de los 21 pendientes. Arreglo mínimo propuesto en `tools/verificar.mjs` (`compararVecino` y "año anterior cargado"): si el documento cuya columna anterior se lee tiene ajustes `fila` vigentes, `ok:null` (no comparable) cuando falla; si no, comparar contra `totales.ingresos` del `.verificacion.json` del otro con la tolerancia del 2%. Silencia 9 de los 15 pares y no crea falsos ok. Falta medirlo (otro Sonnet lo está diseñando; ver su informe).
    DIAGNÓSTICO 2026-10-09 (un Sonnet midió en una copia, 654 chequeos de 242 documentos; propuesta en `Admin/propuestas/189-ano-vecino-con-ajustes.diff`, NO aplicada): hacerla en dos pasos. Hoy hay 28 chequeos "documento del
    año N" y 14 "año anterior cargado" en falso (25 documentos), todos aceptados por la cola; la carga no cambia con el arreglo. PASO 1: (a) `compararVecino` y `vecinoDe` usan, para la columna ACTUAL de cada documento, sus
    ajustes `fila` (reemplazar y agregar, con la escala de ese documento y el signo firmado en la lectura 4); (OR) el chequeo da ok si coincide CON ajustes o SIN ellos; (b1) un ajuste `fila` que solo saca una fila (valor 0 con
    reemplaza) también la saca de la columna anterior (aplicar toda remoción rompe Goiás, Bologna y Chievo: 11 empeoran). Medido: 12 chequeos mejoran, 0 empeoran, sin ajustes nuevos (Roma 2007/2008 y 2018/2019, Lazio 2006-07 a
    2008-09, Fiorentina 2023-25, Juve 2004-05/2005-06). NO hacer (a) sola: empeora 4 (Juve 2002-03 a 2004-05). PASO 2 (solo si Guido quiere cerrar Sampdoria 2020-21 e Inter 2019-21): campo nuevo `fila-anterior` en
    tools/ajustes.mjs (--agregar <pdf> fila-anterior --etiqueta --lado ingreso --valor --linea) que inserta la fila con M = NaN y A = valor solo en la copia que lee el chequeo, no en lo que se carga (3 registros a mano:
    Sampdoria L888 1.779.291; Inter L640 27.574.094 y L642 16.802.772): 16 y con "año anterior cargado" 20 mejoran, 0 empeoran. Si no, descartar `fila-anterior` como conocido sin daño. Quedan 12 "documento del año" falsos
    por reexpresiones reales (UC 2009, Lazio 2006-08, Milan 2009-10, Juventus 2003-04, 2006-07 y 2009-11, Roma 2006-07, 2011-12 y 2018). Riesgo: el OR quita sensibilidad si dos documentos coinciden en crudo y ambos sin una
    fila que sus ajustes sí agregan. Nota: el diff toca `tools/ajustes.mjs`, que esta sesión también cambió (`filas-a-mano` y `estado`): revisar el conflicto antes de aplicar.

190. UN TERCER ESTADO PARA LOS BALANCES PARCIALES: "BALANCE DE MENOS DE 12 MESES" (pedido de Guido, 2026-10-09). Hoy un documento de menos de 12 meses va a `Admin/documentos-descartados.txt` junto con los que no sirven
    (informes del auditor, artículos de prensa), y no se distingue del resto: si algún día aparece el otro tramo del ejercicio, nada lo avisa. Pasaría a ser un estado propio, "parcial", con el período
    cubierto (desde, hasta) y qué falta. Los casos de hoy: Genoa 01/01 al 30/06/2024 (Genoa-bilancio-30.06.2024-individual, falta 01/07/2023 al 31/12/2023), Atalanta 01/01 al 30/06/2022
    (Atalanta-bilancio-consolidato-2022, falta 01/07/2021 al 31/12/2021), Parma 01/09 al 31/12/2020 (individual y consolidado, 4 meses; falta 01/01 al 30/06/2020... a confirmar con su cierre anterior) y
    Juve Stabia 01/07 al 31/12/2024 (Juve Stabia-semestral-2024-12-31-SEC-6K, es un semestre del ejercicio 2025). DISEÑO A PENSAR (con el ok de Guido antes de escribir código): (a) un archivo
    aparte, p. ej. `Admin/documentos-parciales.txt` (ruta # período # qué falta), que `lote.mjs` saltea igual que los descartados pero que `tablas-sesion.mjs` y `estado.mjs` muestran como "parcial, falta
    el otro tramo" y no como descartado; (b) la regla para juntar dos tramos que suman 12 meses (suma de ingresos y gastos, el balance de cierre del segundo, un solo ejercicio con su `cierre` y una nota
    pública que diga de dónde sale cada mitad) y para cuando dos parciales no se pueden unir (tipo de cambio de cierre, perímetro distinto, el primero cerrado con otra moneda); (c) que el tramo se
    busque en sourcing (`fuentes/Italia/<club>.md`): anotar en la ficha del club qué tramo falta. Mientras tanto no se carga ningún parcial: ver `Admin/CONVENCIONES-DATOS.md`, la regla de los 12 meses.

191. LOS DOS HALLAZGOS DE HIGIENE (verificado 2026-10-09 por un Sonnet). (a) Una respuesta vieja de la cola puede tapar una alarma real: Sampdoria 2018 sin sus ajustes queda en "ok" con "resultado del ejercicio"
    fallando. (b) Hay 8 ajustes `fila` redundantes (el script ya lee esos documentos solo): Roma 2021 (2), Juve 2018-19, 2020-21, 2022-23 y 2023-24 (la ganancia por acción, 1 cada uno), Lazio 2015-16 (1) y
    Napoli 2022 (1); y el to-do 188 nombra Bologna 2019-20 y 2020-21 como arreglados a mano cuando ya no tienen ajuste. No es daño: limpiar a mano y revisar al cerrar cada país. Y sin investigar: Lazio 2000-01
    (liras) publica ingresos 334.514 contra 245.757 en su `.verificacion.json`, con el resultado igual (to-do 180).

