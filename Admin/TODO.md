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

154. UNA RESPUESTA A UNA DUDA DE COLUMNA NO CAMBIA LO EXTRAÍDO (2026-10-07). Caso: Como 2025 (`Como-gruppo-pro-forma-consolidamento-2025`),
    un "Prospetto Pro-forma di Consolidamento" (.md L354-409) con columnas Como 1907 | Società del Gruppo | Eliminazioni | Pro-forma.
    Guido decidió perímetro individual (Como 1907). Ni la respuesta "no" a la duda e4b24c1 ("¿solo la columna pro-forma?"), ni el ajuste
    de perímetro + `lote.mjs --rehacer` (lote 16, US$ 0,38) cambiaron la columna: `extraer.mjs` tomó otra vez el pro-forma (62,05 M).
    `verificar.mjs` ~L699-709 guarda las respuestas de duda-tema como NOTA, no actúan. Además `perimetro-senales.mjs` ve el pro-forma como
    "solo individual" (no reconoce "consolidamento" como perímetro: a propósito, ver su cabecera).
    CÓMO SE RESOLVIÓ A MANO: 23 ajustes `fila` (`--reemplaza <etiqueta extraída>` con el valor de la columna 1), generados con un script
    desde la tabla del .md (filas.json → línea → celda 1; "-" = 0; lado "otro" → financiero), más `resultado-final (105.065.627)`; y en la
    cola se aceptaron los "no-cierra" de los totales (comparan contra el total del pro-forma). Queda en `Admin/ajustes-manuales.jsonl`.
    Arreglo candidato: que `extraer.mjs`/`localizar.mjs` reciban la columna a usar cuando el bloque tiene columnas por entidad y el
    perímetro está fijado (escalón con compuerta: el total impreso de esa columna).
    INVESTIGADO (2026-10-07, subagente; conocido, 1 club, sin daño hoy): extraer.mjs no recibe el perímetro ni ninguna columna de entidad
    (solo columna_ejercicio/columna_anterior del .ubicacion.json, L116); localizar.mjs recibe el perímetro solo como frase para elegir
    BLOQUES (L80-84). Por eso el ajuste de perímetro + --rehacer no cambió nada. Escaneo de todos los .md: el layout "sociedad | grupo |
    eliminaciones | pro-forma" está solo en Como 2025 (L354) y Como 2024 (L306, sin cargar); Juventus 2021-25 ("Pro-forma adjustments"),
    AC Milan ("Rettifiche | Consolidato"), Lazio 2006-07 y Dortmund son ajustes del mismo perímetro, no entidades; Mercedes F1 (Group |
    Company) está en notas. CUÁNDO HACERLO: al cargar Como 2024 si sale con la columna equivocada, o con un segundo club. DISEÑO: escalón
    determinístico en extraer.mjs (entre armar `texto` L114-115 y llamarClaude L125; pasar perimetroClub desde lote.mjs L193): con perímetro
    individual y una cabecera de 4+ columnas cuya primera columna de importes es la del club (con "Eliminazioni"/"Pro-forma" a la derecha),
    leer esa columna fila por fila; compuerta: su total impreso = la suma de sus filas; si no, la IA como hoy. Medir: Como 2025 tiene que dar
    los 23 ajustes `fila` (después se anulan); en los demás .filas.json no dispara.

155. ITALIA: EL SIGNO DE "17) INTERESSI E ALTRI ONERI FINANZIARI" Y DE LAS IMPOSTE (medido 2026-10-07, lote 14). El formato del Codice
    Civile imprime los costos en positivo y los resta por posición ("TOTALE (C) (15+16-17)", "20) Imposte" como costo); la etapa 6
    (`verificar.mjs`, `conSigno(fin)`) toma el 17) con el signo impreso y lo SUMA. Casos y arreglos manuales (todos en
    `Admin/ajustes-manuales.jsonl`, 2026-10-07):
    - Torino 2018/2021/2024: `fila` "d) oneri diversi (17, costo)" con el valor entre paréntesis, `--reemplaza "d) oneri diversi"`
      (2024: 19,683 + 0,439 − 3,227 − 6,496 = 10,398, el impreso; los tres cierran al centavo).
    - Udinese 2021-22 y 2024-25: los renglones 16) y 17) se llaman los dos "altri", y `--reemplaza` saca TODAS las filas con esa etiqueta
      (`verificar.mjs` ~L479-480): se reemplazan los dos ("altri proventi finanziari (16)" positivo y "altri oneri finanziari (17,
      costo)" negativo); además las imposte con el signo al revés ("imposte correnti (costo)" negativo, "imposte differite e anticipate
      (ingreso)" positivo).
    - Napoli 2024 ("e) altri" y "b) perdite su cambi"), Napoli 2025 ("e) altri"), Cremonese 2025 y Parma 2023 ("altri" 16 y 17): igual.
    - Bologna 2019-20, 2020-21 y 2021-22 (Versión 568): un solo ajuste por año, el 17) con `--reemplaza-linea` (to-do 158, ya existe:
      los ajustes nuevos no necesitan reemplazar las dos filas homónimas). Ahí las imposte NO hacían falta: entraban netas. O sea, el signo
      de las imposte no es igual en todos los documentos; el del 17) sí (11 documentos).
    - Las dudas de la IA en la cola sobre escala/signo de estos documentos se respondieron en coherencia con los ajustes.
    Arreglo candidato: escalón con el total impreso de C (y el de impuestos) como compuerta: probar el signo leído y, si no cierra, los
    renglones bajo 17) restando (y las imposte como costo). Medir con los 11 documentos de arriba que hoy cierran por ajuste: anulando sus
    ajustes de financiero/impuesto (`ajustes.mjs --anular`, Versión 579) el script tiene que dar lo mismo que lo cargado.
    INVESTIGADO (2026-10-07, subagente; verificado a mano el caso de Cremonese):
    - Causa (tools/verificar.mjs): fin se arma con el signo IMPRESO (renglonesOTotal ~L469-472) y la compuerta del resultado prueba 4
      combinaciones (sf, si) con UN SOLO factor sf para todas las filas financieras (~L626-638): con 16) positivo y 17) a restar no hay
      combinación que sirva. En los 11 documentos "16) + 17-bis − 17) = C impreso" se cumple y el error es exactamente 2 × 17).
    - Matices: 17-bis va con su signo (neto utili/perdite); Napoli 2024 desglosa 17-bis y "b) perdite su cambi" 4.559 positivo resta; las
      hojas de nota del 17) (detalla_a) restan con él; Bologna 2019-20 tiene el mismo patrón en la sección D (19) svalutazioni resta).
    - Imposte NO necesitan escalón: `si` ya se prueba aparte; con el financiero bien cierra solo. Los 4 ajustes de imposte de Udinese serían
      redundantes (confirmarlo al medir). Torino imprime el efecto (si=+1); Napoli, Bologna, Cremonese, Udinese como costo (si=-1).
    - La etiqueta NO es compuerta: Atalanta 2021/2024, Sassuolo 2025, Monza 2022, Lazio 2019-20/2022-23 y Roma 2022 imprimen el 17) entre
      paréntesis y ya cierran: una regla "17) resta" los rompería. Va como escalón solo si la escalera no cierra.
    - DATOS MAL HOY por la compuerta floja (valor absoluto + 0,01 M de tolerancia; cierran invirtiendo TODO el financiero, sf=-1):
      Cremonese 2025 carga netInterest +0,004261 (data/cremonese-it-data.js L119) y el C impreso es (4.261) → −0,004261 (error 8,5 mil EUR);
      Hellas Verona 2020 −0,027588 contra (27.554) (34 EUR); Bologna 2018-19 (sin cargar) −0,552236 contra (556.520).
      Decisión de Guido (2026-10-07): Cremonese 2025 queda así hasta este escalón; se recarga cuando el script lo lea bien.
    - Diseño: después de la escalera 0-6, si no cierra (o cierra solo con sf=-1) y hay un renglón 17) y un C impreso: re-leer fin con
      15)/16) con su signo, 17) y sus hojas como −|valor|, 17-bis con su signo (perdite desglosadas restan), D: 19) resta y 18) suma; por
      posición/bloque, no por etiqueta. Compuerta ÚNICA: |ΣFIN − C impreso| ≤ media unidad impresa por fila (si no hay C impreso: el
      resultado impreso exacto, como la lectura 5). Después se prueban los 4 (sf, si) con fin ya firmado. Anotar "escalón 17) resta".
    - Medición: los 11 sin sus ajustes de financiero/impuesto (en una copia; no anular en el repo hasta medir) tienen que dar totales.financiero
      y lo cargado iguales (Torino 2024 −2,788248; Napoli 2024 +7,442873; Udinese 2021-22 −5,544096); los 57 de Italia: los que cierran sin
      ajuste no cambian, salvo Cremonese 2025, Bologna 2018-19 y Hellas Verona 2020, que tienen que pasar al signo correcto.

156. ITALIA: LOS GASTOS SALEN CASI EL DOBLE (medido 2026-10-07, lote 14; causa encontrada por un subagente). La "variazione delle
    rimanenze" es negativa (reduce costos) y entra a gastos en valor absoluto: la suma de renglones deja de coincidir con "TOTALE COSTI
    DELLA PRODUZIONE" por 2 x |variación|, más que la tolerancia de `cerca()` (0,05%), y `lineasDeLado.esSumaDe` no reconoce el total y
    lo cuenta como una línea más (después `ajuste()` lo acepta por la regla "total + líneas fuera de ese total", pensada para Nottingham
    Forest). Casos: Napoli 2024 (L255) y 2025 (L289), Cremonese 2025 (L179), Parma 2023 (L575), Roma 2018 (L1912, con costos entre
    paréntesis). Agravantes: Napoli 2024, `cerrarNota` deja las hojas de la nota de la variación normalizadas a positivo; Parma 2023, el
    renglón "altri" se cuenta además de su subtotal abierto por la nota b46. Se resolvieron con ajustes manuales (Admin/ajustes-manuales.jsonl,
    2026-10-07). Arreglo candidato: (1) `esSumaDe` compara también la suma CON signo; (2) las hojas de `cerrarNota` vuelven a tomar el signo
    impreso del renglón; (3) `ajuste()` nunca acepta el propio total entre las líneas sumadas.
    LO QUE SE APRENDIÓ AL ARREGLARLO A MANO (para no redescubrirlo):
    - Los gastos se toman en VALOR ABSOLUTO: un ajuste `fila` del lado gasto con valor negativo NO resta (Roma 2018: probado con "82",
      "(82)", "164" y "(164)", todos suman). Para una partida que reduce costos, el arreglo que funciona es mudarla al lado ingreso con el
      mismo valor (mismo efecto en el resultado): "Variazione delle rimanenze (reduce costos)", lado ingreso, 82.
    - Un total que se cuenta como línea se saca con `fila --valor "0" --reemplaza "<etiqueta del total>"` (Roma 2018, "Totale Costi di
      esercizio"); un renglón contado dos veces, igual (Parma 2023, "altri" de L557).
    - Roma 2018 tiene formato propio (conto economico "riclassificato" IFRS): "Totale Ricavi/Costi di esercizio" NO incluyen la "Gestione
      operativa netta calciatori" (+45.922, L1918, se cargó como ingreso) ni Ammortamenti (59.220) y Accantonamenti (546), impresos debajo
      del total; el resultado impreso es el del Gruppo (−25.498) y el consolidado incluye terzi (225, L1927, se cargó del lado
      financiero para no inflar ingresos). Los chequeos de total de ingresos/gastos no pueden cerrar ahí: se aceptaron en la cola.
    - Napoli 2024 cierra solo con los 2 ajustes de financiero (sin abrir notas); el subagente propuso un truco para que cierre en la
      "lectura 4" con las notas abiertas (`signoNormalDe('gasto')` invierte si la mayoría de los ajustes de gasto son negativos) y NO se usó.
    - Para medir el arreglo: los 5 documentos cierran hoy por ajuste; sacando los ajustes de variación/total, el script tiene que dar lo
      mismo. Y la prueba completa idéntica.

    INVESTIGADO (2026-10-07, subagente, medido en una copia sobre las 122 verificaciones con cada variante): el diagnóstico de arriba es
    parcial. Los ajustes de Napoli 2024/2025, Cremonese 2025 y Parma 2023 NO tocan la variación (son del financiero, to-do 155, y en Parma
    "altri" L557): con ellos cierran en la lectura 4 o 5 con los gastos bien. El doble conteo solo existe en las lecturas 0-3 (valor absoluto),
    y se veía porque cuando nada cierra se muestra la lectura 0. Solo Roma 2018 tiene ajustes de variación/total. Código (verificar.mjs):
    L312 abs de los renglones; L321 esSumaDe compara la suma con signo solo desde la lectura 3/4; L593-596 ajuste() da un falso ok (la "línea
    fuera del total" es el propio total); cerrarNota firma las hojas con el signo de la suma (L147: Napoli 2024, nota b72); el rescate de la
    Versión 409 (L338-356) mira todos los renglones de arriba (Parma: "altri" contado dos veces). Variantes medidas: F1 (esSumaDe firmado) no
    cierra nada y mueve Lazio 2014-15; F3 (sacar el total de las líneas) cambia 0. ESCALONES RECOMENDADOS (sin tocar las lecturas 0-3):
    A) cerrarNota conserva el signo impreso de las hojas si el renglón es de signo anómalo (compuerta: total de gastos en la lectura 4; solo
    cambia Napoli 2024); C) un subtotal igual al renglón INMEDIATO de arriba es ese renglón repetido (compuerta: total de ingresos; solo
    cambia Parma 2023, anular su ajuste "altri" L557). F3 como higiene opcional. Medir: ningún ok cambia de estado ni de totales; cambian
    solo Napoli 2024 (lectura 5 → 4) y Parma 2023. El escalón B (la lectura 5 con TODOS los ajustes de financiero) se midió el 2026-10-07 y
    no entra: rompe Roma 2018 (ver Admin/HALLAZGOS-pipeline.md).

157. ITALIA: AS ROMA 2025 NO CIERRA (investigado 2026-10-07 por un subagente). Los otros 3 del lote 14 se resolvieron con ajustes:
    Lazio 2014-15 y Sampdoria 2021 cargados; Inter 2024-25 cierra por la lectura 5 y espera 4 respuestas en la cola.
    AS Roma 2025: el conto economico (pág. 22 del visor, impreso 22, .md L805-1113) quedó como etiquetas y listas de números sueltas;
    texto-propio-a-md.mjs tampoco lo arma (pdftotext -layout sí lo lee limpio). Decisión de Guido (2026-10-07): re-transcribir esa página
    con Claude (la página sola, extraída con qpdf) y reemplazar ese tramo del .md; después lote --reintentar. Cifras 30/06/2025 verificadas:
    A 270.241.005, B 305.201.964, C (13.937.648), imposte (4.985.606), utile (53.884.213). Ojo 156: 11) variazione (1.548.221) reduce costos.
