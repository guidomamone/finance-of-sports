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
- **Los pendientes de sourcing de un país no van acá**: viven en `Admin/sourcing/<País>/_notas-generales.md` (decisión de Guido, 2026-09-14, reafirmada el 2026-10-04). La lista de lo sacado el 2026-09-14 está en `Admin/Archive/todo-sacados-2026-09-14.md`.

---

## Qué hay que hacer

ORDEN (2026-10-15): primero las altas
de países nuevos (165 b y c) y las gestiones (195); al final el ahorro de API (232 e, 233, 230) y lo que espera una decisión de Guido (130,
183, 51).

237. MEJORAS DE SCRIPT VISTAS EN EL LOTE 76 (Portugal, 2026-10-15; cada letra es un escalón a diseñar con el ok de Guido).
    a) `periodo.mjs` tomó la FECHA DE FIRMA como cierre: Alverca 2022-23 quedó con cierre 2023-09-29 ("Alverca, 29 de Setembro de 2023",
       relatorio-contas-2022-23.md L75 y L108) cuando el documento dice "Período findo em 30 de Junho de 2023" (L87) y las columnas
       "30/06/2023 | 30/06/2022" (L93). Se resolvió con un ajuste `cierre`. Escalón posible: una fecha precedida por un nombre de lugar
       ("<Ciudad>, <día> de <mes> de <año>") es la firma, no el cierre; y el "período findo em" o la fecha de las columnas del estado manda.
    b) Un renglón del estado que JUNTA amortización de pases y depreciación ("Gastos/reversões de depreciação e amortização", notas 4 y 5)
       va entero a una sola categoría. Moreirense 2022: pases 1.031.142,16 (L720) + depreciación 89.555,61 (L691) = 1.120.697,77 (L498);
       2025: 612.126 (L944) + 291.735 (L895) = 903.861 (L530). Se cargó entero como player_amortisation (la parte mayor, como PAOK).
       Escalón posible: si las notas que el renglón cita dan cada parte y suman exacto el renglón, abrirlo en dos filas con su categoría.
    c) El perfil (socios, otros deportes) es por club, pero un mismo club publica como entidades distintas: Rio Ave 2014-15 es el club
       asociación (cuotas 217.671,75 y futsal), 2015-16 a 2022-23 la SDUQ y 2023-24 en adelante la SAD. Se contestó "no" (SDUQ/SAD); no
       cambia nada hoy porque 2014-15 trae las cifras. Pensar si el perfil va por entidad o por ejercicio.
    d) `cargar-lote.mjs`: cuando un año de un club nuevo no se escribe y el alta se revierte, quedan los archivos NUEVOS del alta sin
       borrar (Alverca: data/pt/alverca-pt-data.js y data/club-leagues/pt.js, sin trackear). El alta siguiente de la misma corrida (Rio Ave
       2018, que estaba listo) frena por "cambios sin commitear en el sitio" y también se revierte. Se borraron a mano y Rio Ave 2018 entró.
       El revertir tiene que borrar lo que el alta creó, no solo restaurar lo que existía.
    e) La banda de `audit.js` (ingresos entre 0,2 y 2.000 M USD, P0 `escala-implausible`) frena a un club real de tercera división:
       Alverca 2022, 152.299,54 € (≈ US$ 0,16 M), verificado y silenciado en audit-ignore.json. Escalón posible: que la banda tenga en
       cuenta la liga del año (data/club-leagues) o que, con el resultado impreso cerrando, baje a aviso.
    f) Una respuesta de la cola con una categoría del OTRO lado cambia el signo de la fila en vez de mudarla sin cambiar su efecto (como hace
       el ajuste `categoria`): Nacional 2024, "Correções relativas a períodos anteriores" (ingreso 229.792, L793) contestada
       exceptional_items quedó como gasto −0,229792 y el resultado no cerraba por 0,459584 (el doble). Se arregló con un ajuste `categoria`.
    g) El aviso "Estadio en 0" pide que las TRES categorías del estadio (matchday_competition, stadium_other, season_tickets) tengan
       ajuste `incluye`; con la de entradas alcanza para decir que el estadio está dentro de otra línea. Moreirense 2022 y 2025 llevan los
       tres ajustes.
    h) Formato portugués (SNC): la venta de jugadores viene en "Outros rendimentos" como "Rendimentos em investimentos não financeiros", con
       una nota al pie que lo dice ("Inclui ... alienação de direitos desportivos de jogadores"). La categorización la puso en other_income
       con confianza alta y no fue a la cola: Moreirense 2022 (4,10 M) y 2025 (8,00 M) se publicaron mal y se corrigieron con ajustes
       `categoria`. Además, el ajuste compara la etiqueta con el asterisco de la nota ("...financeiros*") aunque la carga lo muestra sin él.
       Escalón posible: leer la nota al pie de la fila (como "la nota de la fila" de caja-deuda) antes de categorizar.
    i) En la lectura 5 de `verificar.mjs`, un ajuste `fila` con `reemplaza` no alcanza una fila que entra DESPUÉS, al abrir un renglón con
       su nota ("nota exacta en la lectura 5"); y los ajustes `fila` sin `reemplaza` no entran. Vitória 2022 SAD: las cinco sub-rubricas de
       "Prestação de serviços" (nota 16, L1905-1909) no llegaban a la carga (TV 6,92 M en 0) y, con `reemplaza "Prestação de serviços"`, la
       fila madre no salía (ingresos 34,02 contra 23,49). Se resolvió reemplazando el renglón del ESTADO ("Vendas e serviços prestados", L590)
       por sus seis partes. Escalón posible: aplicar `reemplaza` también a las filas que abre la nota, y avisar cuando un ajuste no entra.
    j) Un ajuste `fila` que corrige el OCR de un renglón del estado (Alverca 2024, "Outros rendimentos" 522.591,60 -> 622.591,65) deja de
       abrirse con su nota: la venta de jugadores (581.500, nota 17.2.3) quedaba en other_income dentro del renglón. Se resolvió con una
       fila por línea de la nota. Escalón posible: que el renglón corregido por ajuste siga pasando por la apertura con su nota.
    k) Cuando el .md pierde TODOS los signos de una tabla escaneada (Rio Ave 2024, pág. 14), los intereses obtenidos se suman como costo
       (financiero 0,317495 en vez del neto −0,085703) y las reversiones de imparidad sin "-" quedan como gasto. Se resolvió con ajustes
       `fila` mirando la imagen. Escalón posible: que la lectura con signos pruebe el financiero por etiqueta ("obtidos"/"suportados").
    l) `cargar.mjs` toma el valor ABSOLUTO de un ajuste `fila` de gasto con valor negativo (una reversión), aunque `verificar.mjs` cierra con
       el signo: Rio Ave 2024, reversiones de imparidad −4,89 y −2.500,00 como gasto; verificar cerraba y la carga quedaba 5.011 € arriba en
       gastos (tie-out). Se pasaron al lado del ingreso con valor positivo (mismo efecto). Escalón posible: que cargar respete el signo del
       ajuste como lo hace la lectura "signo del documento" (to-do 200). Además, el chequeo del año vecino compara con documentos que están en
       documentos-descartados.txt (Vitória 2021 contra el 2021-22 de la asociación; Rio Ave 2016 contra el 2014-15): tendría que saltearlos.
    m) `alta-club.mjs` (perímetro, "dos entidades distintas" en la carpeta) cuenta como hermanos los .md de documentos que están en
       documentos-descartados.txt: Tondela 2021 frena el alta ("con-preguntas") porque ve relatorio-contas-clube-2021.md (la asociación,
       descartada con ok de Guido) aunque el perímetro esté fijado con un ajuste. El ajuste solo gana si el NOMBRE del archivo dice el
       perímetro (caso Parma). Escalón propuesto: sacar de `hermanos` los documentos descartados (la misma lista que ya saltea lote.mjs).

232. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO GRECIA (pedido de Guido, 2026-10-14: anotar lo que se aprende en el onboarding griego). Cada
    letra es un escalón a diseñar con su ok (skill club-or-year-onboarding, sección 3.b), uno por vez.
    e) `perimetro-a2` le pasa a la IA hasta ~42.000 tokens de entrada para contestar ~130 (Olympiacos 2018: US$ 0,17 por llamada); en
       Grecia fue el 20% del gasto de API. Mirar qué texto le hace falta de verdad (to-do 230 lo deja como tercer cambio).
       PROBADO Y DESCARTADO (2026-10-14): recortar los textos debajo de los títulos sin tabla pierde 7 decisiones y mete 2 errores
       (Admin/HALLAZGOS-pipeline.md). Lo que queda por probar: que Jev haga una primera pasada barata (to-do 233) o achicar solo la parte
       de las notas que viene DESPUÉS del estado de resultados.

165. ALTAS DE CLUBES NUEVOS FUERA DE ITALIA (decisión de Guido, 2026-10-07; estado al 2026-10-10). Un país por vez, con el pipeline
    (skill club-or-year-onboarding; club nuevo: revisión del alta en Admin/registros/altas-revision.jsonl: nombre, color, perímetro, cierres y ligas).
    HECHO: Brasil completo (lotes 56-63) y Rusia desde el fisco (tools/bfo-rusia.mjs, 16 clubes). Etapa 2 (transcribir) de los 14 países
    del (c) hecha: lote 66 (468 documentos). Nombres legales de las altas: 24 contestados con cita (ajustes `name`). Gestiones de los clubes
    nuevos de Grecia, Rep. Checa, Portugal, Noruega, Países Bajos y Turquía cargadas (to-do 195).
    FALTA, en este orden:
    a) GRECIA: HECHA (lotes 66-75, cerrada el 2026-10-14). En el sitio: Olympiacos y AEK 2016-2025, PAOK 2017 y 2019-2025, Atromitos 2016 y
       2019-2025, Panetolikos 2017-2018 y 2020-2025, Aris 2019 y 2021-2025, Kifisia 2023-2025, Asteras, Levadiakos y Volos 2019-2025, OFI
       2018-2025, Panserraikos 2023 y 2025, AEL y Panathinaikos. Sin documento: Athens Kallithea (el PDF era del municipio), PAOK 2018,
       Atromitos 2017-2018, Panetolikos 2019, Aris 2020 (fichas de `Admin/sourcing/Grecia/`). Kifisia 2022 es parcial. Caja y deuda: 50 de 86
       datos de los clubes del lote 71 al cerrar Grecia; después, con las columnas por perímetro y Jev en caja-deuda.mjs, se sumaron
       Olympiacos (caja 2016-2025), AEK 2025 (caja), PAOK 2021 y Panetolikos 2022 (deuda). Conocido, sin tocar (histórico): Panathinaikos 2025 tiene
       "Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου" como competition_bonus; en AEK 2023 y 2025 va como other_income.
    b0) PORTUGAL, EN CURSO (lote 76, 2026-10-15). En el sitio: Rio Ave 2017-2020, 2022, 2023, 2025; Alverca 2022-2023; Nacional 2024;
       Moreirense 2022 y 2025. Falta del lote 76: Famalicão 2022 y Vitória Guimarães 2022 SAD (cola contestada y ajustes nuevos: hace
       falta correr el lote otra vez); Vitória Guimarães 2025 (cola contestada; falta el color en la revisión del alta, y mirar la venta de
       jugadores en "Rendimentos e ganhos em investimentos", formato SNC); los que no cierran en la etapa 6: Alverca 2024-2025, Moreirense
       2023-2024, Rio Ave 2015 (es del club asociación, 2014-15, y pide rearmar la transcripción con --reintentar), 2016 y 2024, Vitória
       Guimarães 2021, 2022 y 2024 (dos entidades: los relatorio-contas-* y el de la SAD no coinciden); Tondela 2020-2021 (decisión de
       Guido: cargar la SAD y descartar el relatório del club asociación). Sin transcribir: el resto de Portugal (Benfica, Porto,
       Sporting, Braga, Marítimo y más, ~200 PDFs): `pipeline.mjs --dir "Clubes/Portugal"`. Mejoras de script vistas: to-do 237.
    b) SIGUIENTE. Los demás países, uno por vez, con la misma receta que Grecia: armar el lote con solo los documentos que traen estado de resultados
       (`ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -1` para el número), `antes-de-localizar.mjs`, ensayo, Guido corre `lote.mjs --ejecutar
       --cargar`, y la cola se revisa con un Sonnet que recomienda respuestas con cita. Fichas listas para alta (`alta-club.mjs --todos`,
       2026-10-10): Noruega 8, Portugal 7, Rep. Checa 7, Colombia 4, Países Bajos 4, Turquía 4, Ucrania 3, Corea 2, Suiza 2, Bélgica,
       Croacia y Dinamarca 1. Ninguna tiene todavía un año verificado: "listo para alta" es solo la ficha del club.
    c) Perímetro en pregunta (decide el `name` ya registrado): Molde, Vålerenga, Go Ahead Eagles, Basel, Pardubice, Aalesund, Fredrikstad,
       Sarpsborg 08. Las preguntas de la revisión del alta siguen en Admin/registros/altas-revision.jsonl.
    Mejoras de script vistas en Grecia: to-do 232.

195. GESTIONES SIN FUENTE (solo entran las `confirmada: true`). Una tanda nueva se arma sola desde los casos de la cola con
    `node tools/gestiones-tanda.mjs --armar --escribir` (la última, tanda-2026-10-14-2, cargó 12). Siguen sin cubrir:
    - con caso en la cola y la pregunta en `Admin/dudas-por-club.md` ("Gestiones sin fecha confirmada"): CRB 2020, Cuiabá 2022-2025, Vila
      Nova 2014, Ferroviária 2010-2013 y 2023 (además, criterio de SAF: presidente del consejo o director-presidente), Goiás 2010-2013 y
      2017, OFI 2018 (administración judicial: sin gestión, decisión de Guido);
    - de las tandas 1 y 2, sin caso abierto en la cola (no los toma --armar): Fortaleza, Novorizontino, Ituano, Ceará 2024-2025, Amazonas
      2024, Cruzeiro 2024-2025 (Pedro Lourenço sin fecha de cierre de la compra), Pari NN 2021-2022, Once Caldas 2024-2025,
      Mönchengladbach 2023 (Rolf Königs). Para investigarlos con la herramienta hay que armarles un lote (--club no los encuentra sin caso).
    Las dudas de cada club, en "## Gestiones" de su `Admin/carga-clubes/<club>.md`; los casos `firmo` (la gestión cambió entre el cierre y
    la aprobación del balance), ahí mismo, sin cargar.

233. JEV EN OTRAS ETAPAS DEL PIPELINE (pedido de Guido, 2026-10-14). Jev (typesafe.ai, `tools/jev-categorizar.mjs`) cuesta ~US$ 42 por MIL
    MILLONES de tokens de entrada y hoy solo categoriza (etapa 7). Ver, etapa por etapa, si puede hacer lo que hoy hace Claude Opus o un
    escalón de reglas por idioma, como escalón barato antes de la IA cara (nunca reemplazando una compuerta): caja y deuda (232 t),
    `perimetro-a2` (le pasa hasta ~42.000 tokens a Opus para una respuesta corta, 20% del gasto de API en Grecia), localizar (elegir los
    bloques del estado y las notas del índice de bloques), el período y el cierre (232 i), el nombre legal del alta (232 o), las preguntas
    de perfil (socios / otros deportes, 232 c) y una primera mirada a los casos de la cola. Cada una se mide como Jev en la etapa 7
    (`--backtest`): contra lo ya decidido, contando los errores con confianza ALTA, antes de entrar como escalón.
    Cómo se usa Jev hoy: `tools/jev-categorizar.mjs` (la clave y el cliente están ahí; resultados de backtests en
    `Admin/mediciones/backtests/jev/` y `Admin/mediciones/test-jev-resultados.md`). Jev devuelve una categoría y probabilidades por
    categoría: sirve para elegir entre opciones cerradas (qué fila es caja, si es grupo o sociedad, si hay socios). Empezar por la etapa
    con respuesta cerrada y verdad conocida: caja y deuda (los años ya cargados de `caja-deuda.mjs --medir`) o el perímetro (los ajustes
    `perimetro` ya decididos y auditados, ver `--auditar-a2`).
    HECHO: caja y deuda (escalón 1b de caja-deuda.mjs, 2026-10-14). Lo que enseñó la medición: Jev elige bien la fila, pero destapó dos
    agujeros de la compuerta que también afectaban a los otros escalones (la trampa del cero y las cifras con forma imposible del OCR), y
    errores del sitio (Colo-Colo 0/0, PAOK 2021, Panetolikos 2022: 232 ab). También hecho: el dato "personal" (staffCost, caja-deuda.mjs --personal). Siguen: perimetro-a2,
    localizar, período y cierre, nombre legal, perfil y la primera mirada a la cola.

230. AHORRAR EN LAS ETAPAS 3 A 5 (pedido de Guido, 2026-10-14: el lote 71 de Grecia estima ~US$ 17 para localizar y extraer 45 documentos).
    Mirar dónde se va la plata (`node tools/gasto.mjs` y `Admin/registros/api/claude-api.jsonl` por tarea y por documento: localizar,
    extraer, validar-bloques) y qué se puede bajar sin perder exactitud: documentos que no son estados (informes del auditor, memorias) que
    igual pasan por localizar; páginas de más en lo que recibe extraer; un modelo más barato o menos esfuerzo para lo que hoy hace Opus;
    caché entre años del mismo club. Medir antes y después con `Admin/lotes/prueba-completa.txt` (lo cargado idéntico) y el costo por
    documento.
    HECHO el 2026-10-14: el desglose del gasto (Grecia, lotes 71 y 74: extraer 47%, perimetro-a2 20%, localizar 22%) y la "salida corta" de
    extraer, medida y DESCARTADA (Admin/HALLAZGOS-pipeline.md: −17% de costo pero 17 de 34 documentos cargaban distinto). Lo que queda:
    perimetro-a2 (232 e) y Jev (233). CÓMO MEDIR un cambio de extraer: rehacerlo cuesta ~US$ 6 por corrida sobre `prueba-mediana.txt`
    (34 documentos) y la IA no responde igual dos veces (6 de 34 documentos y el 3,5% de las etiquetas cambian con el MISMO código), así
    que hay que correr también el "antes" y comparar contra ese piso. El comparador usado (propuesta de `cargar.mjs --lista <x> --salida
    <x.jsonl>`, línea por línea: etiqueta, categoría, importe y totales) vivía en el scratch de la sesión: subirlo a `tools/` como
    `comparar-cargas.mjs` si se vuelve a medir. Restaurar después `Generados/` de los clubes de prueba y la cola con `git checkout`.

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `Admin/sourcing/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

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
    infraestructura ya estaba bien; (d) ✅ API key generada y en `Admin/api-keys/outreach.env`
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
