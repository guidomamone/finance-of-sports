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

232. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO GRECIA (pedido de Guido, 2026-10-14: anotar lo que se aprende en el onboarding griego). Cada
    letra es un escalón a diseñar con su ok (skill club-or-year-onboarding, sección 3.b), uno por vez.
    b) Gestiones de un club nuevo: cada año frena con un caso "cargar · gestion" y la tanda de subagentes se arma a mano
       (`Admin/gestiones-por-pais/tanda-2026-10-14/lote-N.json` con clubId y cierres). Un script que arme los `lote-N.json` desde los casos
       `gestion` pendientes de la cola, y que cargue el `resultado-N.json` validado y conteste esos casos, ahorra el armado en cada país.
    c) Perfil (socios / otros deportes) por club: en Grecia todas las ΠΑΕ (sociedades anónimas de fútbol) dieron "no" y "no", y la cola lo
       volvió a preguntar club por club (Kifisia, Panetolikos, PAOK, Olympiacos). Escalón por forma jurídica: si el documento dice ΠΑΕ /
       Ποδοσφαιρική Ανώνυμη Εταιρεία (con la línea citada), proponer "no" y "no"; la compuerta es la cita, y lo que no la tiene sigue a la cola.
    d) La cola pregunta la MISMA etiqueta una vez por año: PAOK dejó 78 casos de categoría para 8 ejercicios, casi todos repetidos
       ("Αμοιβές τρίτων", "Παροχές τρίτων"...). Agrupar por club + etiqueta: una respuesta vale para los años en que la fila es la misma
       (mismo lado, misma nota), y un año distinto vuelve a preguntar.
    e) `perimetro-a2` le pasa a la IA hasta ~42.000 tokens de entrada para contestar ~130 (Olympiacos 2018: US$ 0,17 por llamada); en
       Grecia fue el 20% del gasto de API. Mirar qué texto le hace falta de verdad (to-do 230 lo deja como tercer cambio).
    f) Un club nuevo frena con "[club] carpetas-clubes.mjs dice paok-gr y quien.mjs --quien dice paok": para un club que todavía no tiene
       data file, `quien.mjs` cae al nombre de la carpeta sin el sufijo de país. Es ruido mientras el alta no se hace, pero suma un motivo
       falso a cada año frenado.
       Código: `tools/quien.mjs` `quien()` (L70-L81: sin cita en un data file, `clubId = normalize(folder)`); la comparación que frena
       está en `tools/cargar.mjs` (L345, "carpetas-clubes.mjs dice ... y quien.mjs --quien dice ..."). Para un club sin data file, usar el
       id que propone `carpetas-clubes.mjs` / el registro de altas (con el sufijo de país) en vez del nombre de la carpeta.
    g) `lote-71.txt` siguió listando los 10 documentos de Olympiacos después de pasarlos al lote 74, y la segunda corrida los pagó de nuevo
       en el 71 (sin daño: el 74 queda en caché). Que `lote.mjs` avise cuando un documento de la lista está también en otra lista activa
       de `Admin/lotes/`.
    h) La categoría se decide por ETIQUETA, y en los estados griegos por función la misma etiqueta aparece en dos notas con sentido
       distinto: PAOK "Αποσβέσεις" en el cuadro del departamento de fútbol (91-96% amortización de pases, `player_amortisation`) y en los
       de administración y venta (bienes y software, 0,2-0,3 M por año, `depreciation`); Olympiacos 2025 "Εισφορές κοινωνικής ασφάλισης"
       en la nota de jugadores (L1105, `wages_squad`) y en la de otros empleados (L1119, `admin_general_expense`). La segunda hereda la
       categoría de la primera y no hay forma de corregir una sola fila (`cola.mjs --corregir-categoria` va por etiqueta). Escalón: la
       categoría por etiqueta + `detalla_a` (la fila del estado que desglosa) cuando la misma etiqueta cae bajo dos renglones distintos.
       Dónde: los rubros por etiqueta salen de `verificar.mjs --rubros` (`<md>.rubros.json`, con `section`) y la categoría de cada fila la
       elige `cargar.mjs` ("CATEGORÍA DE CADA FILA", cabecera L31) desde `.categorias.json` por `label`. Medir con
       `node tools/lote.mjs --lista Admin/lotes/prueba-completa.txt` antes y después (lo cargado de los otros clubes, idéntico) y ver PAOK
       y Olympiacos 2025: hoy `audit.js` marca `linea-duplicada` P3 en esas filas (92 hallazgos en los griegos nuevos).
    i) `periodo.mjs` dio a Kifisia 2022 como ejercicio de 12 meses (confianza media, sin evidencia) y el documento dice "περιόδου
       9/8/2021 - 30/06/2022" en la portada (L47, L93, L261): primer ejercicio de la sociedad, unos 10,7 meses. Un período de menos de 12
       meses tiene que salir como parcial (Admin/registros/documentos-parciales.txt) o a la cola, no como anual.
       Código: `tools/periodo.mjs` (tipo y meses del período; "12 para anual por defecto") y el `periodo` que guarda en
       `Admin/registros/transcripciones-estado.jsonl` (Kifisia 2022 quedó `{"tipo":"anual","meses":12,"evidencia":null,"confianza":"media"}`).
       Caso para medir: el título "περιόδου 9/8/2021 - 30/06/2022" tiene las dos fechas; un período con fecha de inicio que no es el día
       siguiente al cierre anterior es corto.
    k) Una respuesta "no" de la cola a una duda de importe ("¿se carga X del estado y no Y de la nota?", Olympiacos 2023 caso 446850a)
       no cambia nada: la verificación siguió con el importe del estado y hubo que agregar un ajuste `fila` a mano. Que esa respuesta
       aplique sola el importe de la nota (es lo que la pregunta ofrece), con la misma compuerta de cierre.
       Dónde: las respuestas las lee `verificar.mjs` con `respuestaDe(pdf, 'verificar', motivo, detalle)` (L190, L1360); el caso es
       `duda-tema` de extraer. El ajuste que se puso a mano: `fila` de Olympiacos 2023 L237 en `Admin/registros/ajustes-manuales.jsonl`.
    l) Desglose de un renglón NETO del estado: en Olympiacos el estado NIIF imprime solo "Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών" y
       la nota lo abre en venta bruta menos costos; extraer marcó los costos como `gasto` y la carga los puso como gasto en 2023 y como
       ingreso negativo en 2021, 2022, 2024 y 2025 (hubo que fijarlo con ajustes `categoria`). Si el renglón que la nota desglosa es de
       ingreso, sus filas de costo van como ingreso negativo, siempre.
       Los ajustes que lo fijaron: `categoria` player_sales en Olympiacos 2021-2025 (`Admin/registros/ajustes-manuales.jsonl`); el
       criterio es el de la skill `club-data-mapping` sección 3 ("reflejá cómo lo presenta cada club": 2016-2020 el estado imprime bruto).
       Ojo: el escalón tiene que respetar eso (si el ESTADO imprime ingreso y gasto por separado, quedan separados).
    m) El chequeo contra el año vecino marca como error un cambio de presentación: Olympiacos 2020 da 82,46 M en su documento (bruto) y
       74,81 M en la columna anterior del de 2021 (neto); la diferencia son exactamente las filas de costo de la venta (7,65 M). Escalón:
       si la diferencia es igual a la suma de filas que el otro documento netea, es "presentación distinta", no un NO.
    n) Un ajuste `fila` que suma una fila fuera del total impreso (Kifisia 2025: 60.000 de transferencias, L421) deja el chequeo del total
       de ingresos en NO en cada corrida. El ajuste tendría que poder decir "fuera del total impreso" para que ese chequeo lo descuente.
       El ajuste está en `Admin/registros/ajustes-manuales.jsonl` (Kifisia_notes_2025, campo `fila`); el chequeo es el "total de ingresos"
       de `verificar.mjs`.
    o) `alta-club.mjs` no encontró el nombre legal de ninguno de los 6 clubes griegos del lote 71 (puso el de la carpeta): los documentos
       lo dicen en "Επωνυμία: ..." o en la portada como "ΠΟΔΟΣΦΑΙΡΙΚΗ ΑΝΩΝΥΜΗ ΕΤΑΙΡΕΙΑ <nombre>". Escalón por esas frases, con la cita.
       Código: `nombreLegal(md, displayName)` en `tools/alta-club.mjs` (L726). Las respuestas correctas para medir están en los ajustes
       `name` del 2026-10-14 (Olympiacos L484, PAOK L5-7, Aris L137, Atromitos L280, Panetolikos L5, Kifisia L496 de sus .md más nuevos) y
       en AEK, Asteras, Levadiakos, OFI, Panserraikos y Volos (ajustes `name` anteriores).
    p) Color y liga de un club griego nuevo: `lookup-brand-color.js` no tiene la liga griega cacheada y `data/club-leagues` (caché gr.json)
       solo traía 2023-24 para Kifisia. Cachear las dos ligas griegas (Super League y Super League 2) por temporada con las tools que ya
       existen (`fetch-brand-color-reference.mjs`, la de ligas) antes del próximo club griego.
    q) Documentos transcriptos que nunca entran a un lote: Aris 2022 y Atromitos 2017 quedaron afuera de `lote-71.txt` sin que nada avise.
       Que `lote.mjs` (o `antes-de-localizar.mjs`) avise cuando un club de la lista tiene otros documentos transcriptos sin localizar.
       `node tools/estado.mjs --dir "Clubes/<País>/<Club>"` ya lo muestra (etapa 3, "Transcripción validada, sin localizar"): el aviso
       puede salir de ahí.
    r) Una respuesta de perfil (socios, otros deportes) se guarda para todos los años del club, pero los casos ya abiertos de los otros
       documentos del mismo club siguen abiertos: Olympiacos dejó 18 casos repetidos después de contestar el de 2025. Al responder uno,
       cerrar los iguales del mismo club.
    s) Sueldos escondidos en "Αμοιβές τρίτων" (PAOK: 42 M en el cuadro de fútbol contra 9,2 M de costo de personal en la nota 17). Un
       chequeo de `audit.js` que compare `wages_squad` con el total de la nota de personal y con la cantidad de futbolistas, para que
       un caso así aparezca solo y no dependa de que un subagente lo note (relacionado con el to-do 229).
    t) Caja y deuda en Grecia: `tools/vocabulario.mjs` (CAJA / DEUDA_FINANCIERA, escalón 1 de `caja-deuda.mjs`) no tiene ningún término
       griego, así que en los 6 clubes nuevos del lote 71 (43 años, 86 datos) los escalones 0 y 1 no proponen nada y todo cae al escalón 2
       (IA, ~US$ 1,23). Agregar "Ταμειακά διαθέσιμα και ισοδύναμα" (caja) y "Δάνεια" / "Τραπεζικά δάνεια" / "Βραχυπρόθεσμα / Μακροπρόθεσμα
       δάνεια" (deuda), medido con `caja-deuda.mjs --medir` en los griegos ya cargados antes de entrar.
       Antes que el vocabulario por idioma (pedido de Guido, 2026-10-14): ver si este escalón lo puede hacer Jev (typesafe.ai, ~US$ 42 por
       MIL MILLONES de tokens de entrada, la IA barata que ya usa la etapa 7), así no hace falta griego ni ningún otro idioma: a Jev se le
       pasan las filas del balance y elige cuál es caja y cuáles son deuda financiera; la compuerta es la misma de hoy (el número tiene que
       estar impreso en esa línea). Medir con `caja-deuda.mjs --medir` sobre los años ya cargados, errores con confianza alta primero.
    w) `caja-deuda.mjs` lee la PRIMERA cifra de la fila aunque el balance traiga columnas de grupo y de sociedad en la misma tabla:
       Olympiacos (perímetro individual) "| Ταμειακά διαθέσιμα | 24 | Όμιλος año | Όμιλος anterior | Εταιρεία año | Εταιρεία anterior |"
       publicó la caja del grupo en 2022-2025 (16.552.985 contra 16.455.274 de la sociedad en 2022), y la compuerta la confirmó porque el
       documento vecino tiene la misma estructura. Se corrigió con ajustes `caja` de la columna Εταιρεία (los 10 años). Escalón: cuando el
       encabezado de la tabla nombra los dos perímetros (Όμιλος / Εταιρεία, Group / Company, Consolidado / Individual), leer las columnas
       del perímetro del club (el mismo criterio que usa localizar para el estado de resultados). La deuda de Olympiacos sigue vacía.
       Hoy el perímetro en `caja-deuda.mjs` es POR PÁGINA (L331, "PERÍMETRO DE CADA PÁGINA DEL BALANCE"), no por columna. Medir con
       `node tools/caja-deuda.mjs --medir` (todos los clubes: tiene que dar idéntico; la base del 2026-10-14 es caja 132 iguales / 3
       distintos, deuda 50 / 7) y con los 10 ajustes `caja` de Olympiacos como respuesta esperada.
    x) AEK 2024 (lote 73), dos cosas que salieron cargándolo a mano: (1) `cargar.mjs` dejó AFUERA EN SILENCIO una fila sin categoría
       ("Έσοδα από διεθνείς διοργανώσεις", 1.872.488, L1428: la verificación nueva abrió las entradas en su nota y el `.categorias.json` era
       del día anterior); el único aviso fue el tie-out del resultado. Una fila verificada sin categoría tiene que frenar con su nombre (o
       marcar el `.categorias.json` como desactualizado), no desaparecer. (2) `caja-deuda.mjs` escalón 0 leyó la caja como 0,000007 en
       "| Ταμειακά διαθέσιμα και ισοδύναμα | 6.9 | 6.320.395 | 7.725.899 |" (L430): la nota "6.9" de un solo nivel, que la lectura B
       tendría que sacar. Se cargó con un ajuste `caja`. Ver por qué la lectura B no entró en esta fila.
       Código: (1) `cargar.mjs` L306-L308 (sin `.categorias.json` o desactualizado frena; una fila nueva sin rubro no) y
       `tools/huellas.mjs` `categoriasAlDia` (L45). (2) `caja-deuda.mjs` `columnasConFormaDeNota` (L146) y la lectura B en `filasDelMd`;
       medir con `--medir --club aekathens-gr --detalle`.
    y) Una carga A MANO (`cargar.mjs "<pdf>" --desde-verificacion --escribir`) también escribe `Admin/sourcing/<País>/<Club>.md` ("Cargado en
       el sitio por tools/cargar.mjs ...") y la sesión del 2026-10-14 no lo incluyó en los commits de 8 años (se commiteó después). Que
       `cargar.mjs --escribir` imprima al final la lista de archivos que tocó (la misma que commitea `cargar-lote.mjs`: SITIO + ADMIN), para
       pegarla en el `git add`.

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

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `Admin/sourcing/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

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
       datos de los clubes del lote 71; el resto espera a los to-dos 232 w y 232 t. Conocido, sin tocar (histórico): Panathinaikos 2025 tiene
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

183. ITALIA FUERA DEL FÚTBOL. Hay PDFs sin transcribir de rugby (FIR, Zebre Parma), tenis (FITP, FITP Business & Media, Mario Belardinelli) y entes (Sport e Salute, Sportcast, Circolo Canottieri
    Aniene) en Clubes/Italia. Guido dijo que las federaciones entran al sitio, pero el esquema de otros deportes no está decidido (to-do 130). No se tocaron en el lote 40, que fue solo fútbol.

195. GESTIONES SIN FUENTE (lo que quedó de las tandas 1 y 2, ambas cargadas: solo entran las `confirmada: true`). Otra tanda si Guido
    quiere, con el mismo armado de `Admin/gestiones-por-pais/tanda-2026-10-13/` (`validar.js <N>` dice qué cierre queda sin gestión). Cierres
    sin cubrir: Fortaleza, Novorizontino, Cuiabá (fecha del cambio Alessandro -> Cristiano Dresch), Ituano, Ceará 2024-2025 y Amazonas 2024
    (ninguna confirmada); Goiás 2008-2013, 2017 y 2023-2025; Cruzeiro 2024-2025 (Pedro Lourenço sin fecha de cierre de la compra); Criciúma
    2012-2014 y 2021; CRB 2020; Pari NN 2021-2022; Once Caldas 2024-2025; Mönchengladbach 2023 (Rolf Königs). Las dudas de cada club, en
    "## Gestiones" de su `Admin/carga-clubes/<club>.md`; los casos `firmo` (la gestión cambió entre el cierre y la aprobación del balance),
    ahí mismo, sin cargar.




229. SUELDOS DESDE LA NOTA DE PERSONAL (conocido, sin daño hoy). Un estado por función ("Έξοδα διοίκησης" único gasto operativo) no separa
    los sueldos y la nota de personal sí ("Σύνολο κόστους μισθοδοσίας περιόδου"): Volos 2021-2025 los tenía dentro de admin_general_expense
    (corregidos con ajustes `fila` y `categoria`). Medido el 2026-10-13: ningún otro año cargado está así (`audit.js` no marca `sin-salarios`
    fuera de Novorizontino 2010, que es un cero real). Se diseña el escalón cuando aparezcan casos reales: después del lote 71 (Aris,
    Atromitos, PAOK, Panetolikos tienen estado por función), mirar `sin-salarios` en `node tools/audit.js`. CASO REAL (lote 71, 2026-10-14):
    Panetolikos 2017-2025 tiene los sueldos dentro de "Κόστος πωλήσεων" (`lump_football_operations_expense`), así que `sin-salarios` no lo
    marca, pero la nota de personal da el total de cada año ("Σύνολο", Παροχές σε εργαζόμενους): 2022 1.566.222,00 (L1470), 2023
    1.716.651,78 (L1159), 2024 1.850.317,43 (L1073), 2025 1.959.575,41 (L1086), 2021 1.288.534,97 (L1436). Ya se puede diseñar el escalón.
    Para diseñarlo: los .md son `Clubes/Grecia/Panetolikos/Panetolikos_FS_<año>.md` (2017, 2018 y 2020 todavía sin la línea de la nota:
    buscar "Παροχές σε εργαζόμενους" o "Σύνολο"); la fila global es "Κόστος πωλήσεων" del estado. Escalera posible: si el club no tiene
    `wages_squad` y la nota de personal da un total que cabe dentro de una fila global de gasto, partir esa fila en `wages_squad` (el total
    de la nota) + el resto en su categoría, con la compuerta de que el resto no quede negativo. Mirar antes cómo se resolvió Volos
    (ajustes `fila` y `categoria` en `Admin/registros/ajustes-manuales.jsonl`) y el criterio de `club-data-mapping` para filas mixtas.

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
