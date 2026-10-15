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

ORDEN (2026-10-15): primero el script que limpia la cola (232 aa), las altas
de países nuevos (165 b y c) y las gestiones (195); al final el ahorro de API (232 e, 233, 230) y lo que espera una decisión de Guido (130,
183, 51). Las letras del 232 marcadas "conocido, sin daño hoy" (k, l, n, o, z) no se trabajan salvo que algo cambie.

232. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO GRECIA (pedido de Guido, 2026-10-14: anotar lo que se aprende en el onboarding griego). Cada
    letra es un escalón a diseñar con su ok (skill club-or-year-onboarding, sección 3.b), uno por vez.
    aa) Casos de perfil que nadie va a contestar ni cerrar: OFI Crete (10), Levadiakos (2) y Paysandu (2) son de años YA cargados con el
       ingreso como renglón sin desglosar (lump_), donde `cargar.mjs` ya no hace la pregunta; `cola.mjs` `cerrarCargados()` no cierra
       'cargar · perfil' a propósito (sirve para los años que vienen). Quedan en la cola como pendientes. Escalón posible: un caso de perfil
       cuya etapa ya no lo levanta (el año cargado y la última corrida de cargar sin ese caso) pasa a obsoleto, igual que los de verificar.
    e) `perimetro-a2` le pasa a la IA hasta ~42.000 tokens de entrada para contestar ~130 (Olympiacos 2018: US$ 0,17 por llamada); en
       Grecia fue el 20% del gasto de API. Mirar qué texto le hace falta de verdad (to-do 230 lo deja como tercer cambio).
       PROBADO Y DESCARTADO (2026-10-14): recortar los textos debajo de los títulos sin tabla pierde 7 decisiones y mete 2 errores
       (Admin/HALLAZGOS-pipeline.md). Lo que queda por probar: que Jev haga una primera pasada barata (to-do 233) o achicar solo la parte
       de las notas que viene DESPUÉS del estado de resultados.
    k) Una respuesta "no" de la cola a una duda de importe ("¿se carga X del estado y no Y de la nota?", Olympiacos 2023 caso 446850a)
       no cambia nada: la verificación siguió con el importe del estado y hubo que agregar un ajuste `fila` a mano. Que esa respuesta
       aplique sola el importe de la nota (es lo que la pregunta ofrece), con la misma compuerta de cierre.
       Dónde: las respuestas las lee `verificar.mjs` con `respuestaDe(pdf, 'verificar', motivo, detalle)` (L190, L1360); el caso es
       `duda-tema` de extraer. El ajuste que se puso a mano: `fila` de Olympiacos 2023 L237 en `Admin/registros/ajustes-manuales.jsonl`.
       CONOCIDO, SIN DAÑO HOY (Guido, 2026-10-14): en toda la cola, de 17 dudas "¿se carga X y no Y?", 4 contestadas "no" y solo esta es
       de importe (las otras tres son de qué cuadro cargar); entró con el ajuste. Aplicarla sola pide que la duda traiga los dos importes con
       su línea en forma estructurada, o sea cambiar el prompt pago de extraer (y su caché). Se retoma si se repite.
    l) Desglose de un renglón NETO del estado: en Olympiacos el estado NIIF imprime solo "Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών" y
       la nota lo abre en venta bruta menos costos; extraer marcó los costos como `gasto` y la carga los puso como gasto en 2023 y como
       ingreso negativo en 2021, 2022, 2024 y 2025 (hubo que fijarlo con ajustes `categoria`). Si el renglón que la nota desglosa es de
       ingreso, sus filas de costo van como ingreso negativo, siempre.
       Los ajustes que lo fijaron: `categoria` player_sales en Olympiacos 2021-2025 (`Admin/registros/ajustes-manuales.jsonl`); el
       criterio es el de la skill `club-data-mapping` sección 3 ("reflejá cómo lo presenta cada club": 2016-2020 el estado imprime bruto).
       Ojo: el escalón tiene que respetar eso (si el ESTADO imprime ingreso y gasto por separado, quedan separados).
       CONOCIDO, SIN DAÑO HOY (Guido, 2026-10-14): verificar.mjs ya pone del lado del ingreso las hijas de un renglón de ingreso (1.683 de
       1.685 en todos los documentos, 67 en negativo) y cargar.mjs pregunta si la categoría contradice ese lado. Única excepción hoy: Ceará
       2025 "Perdas na venda de ativos" (0,356 M) como gasto bajo "Outras receitas, líquidas" (el neto es el mismo).
    n) Un ajuste `fila` que suma una fila fuera del total impreso (Kifisia 2025: 60.000 de transferencias, L421) deja el chequeo del total
       de ingresos en NO en cada corrida. El ajuste tendría que poder decir "fuera del total impreso" para que ese chequeo lo descuente.
       El ajuste está en `Admin/registros/ajustes-manuales.jsonl` (Kifisia_notes_2025, campo `fila`); el chequeo es el "total de ingresos"
       de `verificar.mjs`.
       CONOCIDO, SIN DAÑO HOY (medido el 2026-10-14): de 103 documentos con ajuste `fila` y verificación, 7 tienen un total en NO (Kifisia
       2025, Aris 2024, Criciúma 2022, Lazio 2007-08, AS Roma 2012 y 2018, Como 2025); ninguno frena (estado ok o año ya cargado). Se
       retoma si uno frena una carga.
    o) `alta-club.mjs` no encontró el nombre legal de ninguno de los 6 clubes griegos del lote 71 (puso el de la carpeta): los documentos
       lo dicen en "Επωνυμία: ..." o en la portada como "ΠΟΔΟΣΦΑΙΡΙΚΗ ΑΝΩΝΥΜΗ ΕΤΑΙΡΕΙΑ <nombre>". Escalón por esas frases, con la cita.
       Código: `nombreLegal(md, displayName)` en `tools/alta-club.mjs` (L726). Las respuestas correctas para medir están en los ajustes
       `name` del 2026-10-14 (Olympiacos L484, PAOK L5-7, Aris L137, Atromitos L280, Panetolikos L5, Kifisia L496 de sus .md más nuevos) y
       en AEK, Asteras, Levadiakos, OFI, Panserraikos y Volos (ajustes `name` anteriores).
       CONOCIDO, SIN DAÑO HOY (Guido, 2026-10-14): el nombre pendiente no frena el alta y la revisión del alta (subagente) lo resuelve con
       cita. Pasa con CUALQUIER alfabeto no latino, no solo griego: nombreLegal() busca tokens latinos del displayName y FORMAS solo trae
       formas latinas (falta ООО / АО / ПАО / 株式会社...). Carpetas afectadas: Ucrania, Bulgaria, Serbia (en parte), Kazajistán, Macedonia
       del Norte, Armenia, Georgia, Japón, Corea, China y Chipre (Rusia no pasa por alta-club.mjs). Los nombres se transliteran a mano
       ("Olympiakos Syndesmos Filathlon Peiraios P.A.E."): un escalón por script no daría idéntico.
    z) "Diferencia de redondeo" DENTRO de una nota se pierde: `verificar.mjs` (L1049) la agrega como hoja sin página y sin categoría, y
       `cargar.mjs` la deja como "sin categoría" (aviso, no se carga). AEK 2024: tres filas de 1 euro (Κόστος πωλήσεων, Αμοιβές
       ποδοσφαιρικού, Απομείωση παγίων). Conocido, sin daño hoy (el tie-out tolera la unidad); el redondeo de los TOTALES sí se carga
       (`cargar.mjs` L774, other_income / other_expenses). Si se arregla: la misma categoría por lado que el de los totales.

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
    b) SIGUIENTE. Los demás países, uno por vez, con la misma receta que Grecia: armar el lote con solo los documentos que traen estado de resultados
       (`ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -1` para el número), `antes-de-localizar.mjs`, ensayo, Guido corre `lote.mjs --ejecutar
       --cargar`, y la cola se revisa con un Sonnet que recomienda respuestas con cita. Fichas listas para alta (`alta-club.mjs --todos`,
       2026-10-10): Noruega 8, Portugal 7, Rep. Checa 7, Colombia 4, Países Bajos 4, Turquía 4, Ucrania 3, Corea 2, Suiza 2, Bélgica,
       Croacia y Dinamarca 1. Ninguna tiene todavía un año verificado: "listo para alta" es solo la ficha del club.
    c) Perímetro en pregunta (decide el `name` ya registrado): Molde, Vålerenga, Go Ahead Eagles, Basel, Pardubice, Aalesund, Fredrikstad,
       Sarpsborg 08. Las preguntas de la revisión del alta siguen en Admin/registros/altas-revision.jsonl.
    d) Rusia: las tablas de otros ingresos y gastos que no suman el código del formulario (Krasnodar, Krylia 2021-2025, Rostov 2025, Rubin
       2022-2025: la nota en bruto, el formulario en neto). Sin daño hoy: esos años quedan con el renglón entero.
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
