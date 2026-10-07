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

150. ¿LA ETAPA 4 REBOTA NÚMEROS QUE LA ETAPA 2 YA VALIDÓ? MEDIRLO (Guido, 2026-10-06). Si casi no hay o son reales, queda como está;
    si hay falsos positivos, se arregla.
    QUÉ SE SABE:
    - Las dos etapas comparan contra la MISMA fuente en un PDF digital (el texto propio, `pdftotext -f N -l N`), pero la etapa 2
      (`pipeline.mjs` → `resolver-inventario.mjs` + `chequeos-gratis.mjs`) además mira sumas de tabla, columna del año anterior y manda
      lo dudoso a Claude, y DECIDE; la etapa 4 (`validar-bloques.mjs`, Versión 324, anterior a la validación de la etapa 2) solo busca
      cada número en el texto de su página, marca `noConfirmados` en `<doc>.validacion.json` y deja decidir a la etapa 6 (sumas). La
      etapa 4 no lee nada de lo que resolvió la etapa 2 (registro `Admin/transcripciones-estado.jsonl`, historial
      `Admin/transcripciones-verificaciones.jsonl`).
    - El daño no es la marca: es que `paginasARearmar()` (`tools/texto-propio-a-md.mjs` ~L235-275) usa esos `noConfirmados` para
      disparar el escalón 1b (rearmar la página CON el texto propio) cuando no hay `.verificacion.json` con estado ok (L263). Si el
      texto propio es el que está mal, el rearmado EMPEORA la página.
    - Caso: Milan 2022-23, pág. 84 del visor (impreso 84), .md L2527, "Minusvalenze da cessione diritti pluriennali": el .md
      (42 | 2.456 | -2.414) está bien (imagen de la página; las columnas suman 18.566 y 22.232); el texto propio no trae 42 ni 2.456
      (celda partida en varias líneas; `pdftotext -layout` y `-raw` igual). La etapa 2 la había dejado pasar ("5 dudas respaldadas por
      los chequeos gratis: 61, 84, 104, 163, 173"). El disparo fue además efecto de un corte: la 1.ª corrida del lote 14 murió antes de
      la etapa 6, y la 2.ª vio "no confirmado + sin verificación". En una corrida sin cortes la etapa 6 lo habría cerrado.
    CÓMO MEDIR (gratis, script de solo lectura): para los documentos de Admin/lote-14.txt y lote-19.txt, cruzar cada `noConfirmados` de
    `Generados/**/<doc>.validacion.json` con el estado de su página en la etapa 2 y con si la etapa 6 cerró (`.verificacion.json`).
    Arreglo candidato si hace falta: escalón 0 de la etapa 4 = "página validada en la etapa 2" (o que el 1b no se dispare sin etapa 6).

152. LAS RESPUESTAS DE LA COLA NO SE REUSAN ENTRE AÑOS NI ENTRE CLUBES (Guido, 2026-10-07: "por qué pasar por Jev de nuevo si ya sabemos
    las categorías").
    QUÉ SE SABE:
    - Las respuestas de categoría se aplican en `cargar.mjs` (gratis, sin lote ni Jev): el flujo que funcionó fue responder en
      `tools/cola.mjs --responder <id> aceptar|corregir --valor <categoría>` y correr `node tools/verificar.mjs "<pdf>"` +
      `node tools/cargar.mjs "<pdf>" --desde-verificacion` (ensayo) / `--escribir`. El lote solo hace falta cuando el documento nunca se
      categorizó (quedó frenado en la etapa 6).
    - Atalanta 2024 volvió a preguntar "Oneri sociali", "F.A.F.I.C. - T.F.R.", "costi per acquisizione temporanea" y "minusvalenze" ya
      decididos en Atalanta 2021 con etiquetas casi iguales ("b) oneri sociali"): el precedente del club compara la etiqueta EXACTA.
      Y entre clubes no hay reuso: cada club italiano nuevo volvió a preguntar lo mismo (Atalanta 30, Verona 21, Sassuolo 13, Monza 28,
      Roma 2022 5, Lazio 26 filas).
    - Las decisiones de Guido para Italia (2026-10-06/07), útiles como semilla: oneri sociali y TFR → wages_squad; "costi per
      tesserati" → wages_squad; minusvalenze de jugadores → exceptional_items (como "Capital losses on disposals" de Juventus); costos de
      préstamo de jugadores ("acquisizione temporanea") → other_expenses; ingresos por préstamo → player_sales; premios a otros clubes
      por formación ("valorizzazione", "premi di preparazione", "Contributo Solidarietà Fifa", "premi ex art. 103 NOIF") →
      player_amortisation; alquileres ("godimento di beni di terzi") → admin_general_expense; contribuciones a la Lega, costi specifici
      tecnici, attività sportiva, % de TV al visitante → match_organisation_expense; provisiones → other_amortisation; amortización de
      intangibles → player_amortisation; "da L.N.P." y "Mutualità" → broadcasting; "Proventi non audiovisivi" → sponsorship_commercial;
      abbonamenti → season_tickets. Socios y otras secciones deportivas: "no" en todas las S.p.A. Están en `Admin/cola-revision.jsonl`
      (líneas `tipo: respuesta`) y en `Admin/categorias-aprendidas.jsonl`.
    Arreglo candidato (escalón, medido antes/después): normalizar la etiqueta (sin "a)", "b)", numeración, mayúsculas) al buscar el
    precedente y las respuestas del mismo club; después, evaluar un precedente por país para etiquetas idénticas. Lo cargado tiene que dar
    idéntico (prueba completa).

153. UNA PREGUNTA YA RESPONDIDA VUELVE CON OTRO ID (Guido, 2026-10-07). Casos: Hellas Verona 2020 (escala de las notas: 372b04d →
    e7639f2), Lazio 2008-09 (escala del consolidado: 7ce3412 → 19e8b00), Lazio 2022-23 (dejar afuera resultado integral y EPS:
    70e0974 → 38436d9). Mismo texto de pregunta, id nuevo al re-verificar después de responder otras cosas, y la respuesta vieja no se
    aplica (hubo que re-responder). El id es un hash de pdf|etapa|motivo|detalle (`tools/cola.mjs`, función que agrega casos ~L70-80; los
    casos de la IA llevan la pregunta en el detalle, y la IA la redacta distinto entre corridas o cambian las líneas citadas). Ya existe
    `respuestaPorDetalle()` en `verificar.mjs` (~L699) para "duda ya contestada para el club": mirar por qué no los atrapó. La respuesta
    tiene que quedar atada a algo estable (como los ajustes: pdf + campo/tema + renglón).

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
    - Las dudas de la IA en la cola sobre escala/signo de estos documentos se respondieron en coherencia con los ajustes.
    Arreglo candidato: escalón con el total impreso de C (y el de impuestos) como compuerta: probar el signo leído y, si no cierra, los
    renglones bajo 17) restando (y las imposte como costo). Medir con los 8 documentos de arriba que hoy cierran por ajuste: sacando los
    ajustes, el script tiene que dar lo mismo.

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

157. ITALIA: 7 DOCUMENTOS QUE TODAVÍA NO CIERRAN NI CON AJUSTES (2026-10-07; un subagente encontró las causas, ver abajo). Ya cierran con
    ajustes (cargables): Milan 2023-24 (rettifiche D sin lado: `fila` 672 y (800) del lado financiero), Inter 2021-22 (D 521.197),
    Lazio 2021-22 (era un chequeo de año vecino desactualizado: se arregló re-verificando). Los que faltan:
    - Bologna 2019-20, 2020-21 y 2021-22: el 17) (`altri`, impreso positivo) y las imposte (impresas como costo en positivo, con el
      crédito de años anteriores entre paréntesis) entran con el signo al revés; 2019-20 además tiene D "19) svalutazioni" 1.868.716
      sin lado. NO se puede arreglar con `--reemplaza "altri"`: un renglón de INGRESOS de 79,9 M también se llama "altri" (L833 en
      2020-21) y el reemplazo por etiqueta lo saca (se probó y se revirtió). Hace falta un `reemplaza` por línea (no existe hoy:
      `verificar.mjs` ~L479 compara solo la etiqueta). Ajustes que cerrarían (calculados por el subagente, al euro): 2019-20 16) 1.931
      (L948), 17) (670.894) (L952), D (1.868.716) (L958), imposte (591.876) / 94.384 / (1.424) (L976-978) → −39,518066; 2020-21 16)
      217.766 (L871), 17) (1.297.992) (L875), imposte (905.396) / 94.050 / (1.424) (L886-888) → −30,846228; 2021-22 16) 4.561 (L231),
      17) (1.384.360) (L235), imposte (779.656) / 50.676 / (1.424) (L241-243) → −46,694141.
    - Inter 2024-25: D 780.928 (L976) ya cargado como ajuste; falta que el "12) Accantonamenti per rischi" (19.420) entre restando
      (es un rilascio). Solo la lectura 5 cerraría; hoy gana otra.
    - Lazio 2014-15 (formato riclassificato): ajustes de impuestos ya cargados (imposte correnti (3.432.429) que no se había extraído;
      differite/anticipate corridas de columna). Falta que "TOTALE COSTI OPERATIVI" (85,997) no se compare contra líneas que incluyen
      ammortamenti (14,519) y accantonamenti; "Accantonamenti per rischi" +137.780 es un crédito. Solo la lectura 5 cerraría.
    - Sampdoria 2021: renglones "di cui" contados además de su padre (6 ajustes `--valor 0` ya cargados) y la lectura 0 acepta los
      totales como una fila más; con las hojas la cuenta da −24,414987 contra −24,414986, pero no gana la lectura 5.
    - AS Roma 2025: el año estaba mal (se leyó 2024-06-30; ajuste `cierre` 2025-06-30 ya cargado) y el conto economico consolidato de la
      pág. 22 (.md L805-1115) quedó transcripto como dos listas sueltas, no como tabla: hay que re-transcribir esa página (o escribirla
      a mano) y después localizar/extraer/verificar. Datos: A 270.241.005, B 305.201.964, C (13.937.648), impuestos (4.985.606),
      resultado (53.884.213) (L725 y L1122, en tabla bien formada).
    Relacionado: to-dos 155 y 156 (mismas familias de causa) y la elección de lectura en `verificar.mjs` (`ajuste()`).

