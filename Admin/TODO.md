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

231. EMPEZAR LA PRÓXIMA SESIÓN ACÁ: CERRAR GRECIA (lotes 71, 73 y 74). Estado al 2026-10-14:
    - Lote 71 (`Admin/lotes/lote-71.txt`: Aris, Atromitos, Kifisia, Panetolikos, PAOK, Athens Kallithea; Olympiacos se pasó al 74) CORRIDO
      con `--ejecutar --cargar` (~US$ 7,79): ningún año cargado, todos frenaron en la cola. La cola ya está CONTESTADA (71 respuestas de
      subagentes Sonnet, revisadas; commit 9f4fc79fc): Aris 2024 sin el detalle duplicado del Κέρδος (ajustes `fila` L496-L497), Kifisia
      2025 con la fila de transferencias de L421 (+60.000), Super League-ΕΠΟ de Atromitos como competition_bonus.
    - LO QUE FALTA, en este orden:
      1. GESTIONES de Aris, Atromitos, Panetolikos, PAOK y Kifisia (quién presidía cada ejercicio): no hay ninguna en `data/gestiones/gr.js`
         y los casos "cargar · gestion" de la cola frenan cada año. Armar una tanda con subagentes que buscan con fuente, como
         `Admin/gestiones-por-pais/tanda-2026-10-13/` (to-do 195), cargarla y responder esos casos.
      2. ATHENS KALLITHEA: `Clubes/Grecia/Athens Kallithea/Ισολογισμός-2020.pdf` es el balance del MUNICIPIO ("ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ", .md L4),
         no del club. Proponerle a Guido mandarlo a `Admin/registros/documentos-descartados.txt` (y destrackear su .md, CLAUDE.md: no es
         del dominio del club) y anotar en `Admin/sourcing/Grecia/` que falta el balance de la ΠΑΕ. Sus 4 casos de la cola siguen sin
         responder a propósito.
      3. Volver a correr el lote 71 (lo pagado está en caché, casi gratis): `caffeinate -i node tools/lote.mjs --lista
         Admin/lotes/lote-71.txt --ejecutar --cargar`. Contestar la cola nueva que aparezca (subagente por club) y revisar la ficha de cada
         alta (nombre legal, tipo de documento, cierre; skill club-or-year-onboarding, "Club nuevo").
      4. OLYMPIACOS (`Admin/lotes/lote-74.txt`, 10 documentos, ensayo ~US$ 3,93): perímetro ya fijado (ajuste del club individual: columnas
         Όμιλος/Εταιρεία, el grupo agrega a lo sumo 2,3%; criterio de OB). Preguntarle a Guido si ya corrió `caffeinate -i node
         tools/lote.mjs --lista Admin/lotes/lote-74.txt --ejecutar --cargar`; si no, que lo corra; después, la cola igual que el 71.
      5. Con los años cargados: caja y deuda (`node tools/caja-deuda.mjs --club <id>` ensayo; `--ejecutar --escribir` lo corre Guido),
         `node tools/audit.js` (mirar `sin-salarios`: Panetolikos tiene sueldos dentro de tres líneas por función, ver to-do 229) y
         `node tools/perimetro-senales.mjs --auditar-a2 <carpeta>` (to-do 227 hecho: revisar con un subagente lo que decidió A2 en Aris).
      6. AEK 2024 (`Admin/lotes/lote-73.txt`): sigue sin cargar. Su `Generados/Grecia/AEK Athens/AEK_FS_2024-06-30.verificacion.json` quedó
         modificado sin commitear desde la sesión del 2026-10-13 (re-verificación con la lectura nueva de verificar.mjs: la nota exacta y la
         'Diferencia de redondeo' de 1 euro). Correr `caffeinate -i node tools/lote.mjs --lista Admin/lotes/lote-73.txt --ejecutar --cargar`
         (etapa 7 para las filas nuevas de sus notas), contestar la cola y commitear ese .json con el resultado.
      6b. Documentos de Grecia transcriptos que no entraron a ningún lote (`node tools/estado.mjs --dir "Clubes/Grecia/<Club>"`, etapa 3
         "sin localizar"): Aris 2022 (`Aris_FS_audited_art47_2022-06-30`, formato art. 47 ΕΠΟ) y Atromitos 2017 (`Atromitos_audit_2016-17`,
         solo informe del auditor: ver si trae estados o va a descartados). Armar el lote siguiente con ellos.
      7. Archivar `lote-71.txt`, `lote-73.txt` y `lote-74.txt` en `Admin/Archive/lotes/` y pasar a la letra b) del to-do 165.

232. MEJORAS DE SCRIPT VISTAS ONBOARDEANDO GRECIA (pedido de Guido, 2026-10-14: anotar lo que se aprende en el onboarding griego). Cada
    letra es un escalón a diseñar con su ok (skill club-or-year-onboarding, sección 3.b), uno por vez.
    a) `alta-club.mjs` no mira `Admin/registros/documentos-descartados.txt`: `--todos` da a `athenskallithea-gr` como "listo para alta"
       aunque su único documento (el balance del municipio de Kallithea) está descartado. Un club cuyos documentos están todos descartados
       no tendría que figurar como alta.
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
    g) `lote-71.txt` siguió listando los 10 documentos de Olympiacos después de pasarlos al lote 74, y la segunda corrida los pagó de nuevo
       en el 71 (sin daño: el 74 queda en caché). Que `lote.mjs` avise cuando un documento de la lista está también en otra lista activa
       de `Admin/lotes/`.
    h) La categoría se decide por ETIQUETA, y en los estados griegos por función la misma etiqueta aparece en dos notas con sentido
       distinto: PAOK "Αποσβέσεις" en el cuadro del departamento de fútbol (91-96% amortización de pases, `player_amortisation`) y en los
       de administración y venta (bienes y software, 0,2-0,3 M por año, `depreciation`); Olympiacos 2025 "Εισφορές κοινωνικής ασφάλισης"
       en la nota de jugadores (L1105, `wages_squad`) y en la de otros empleados (L1119, `admin_general_expense`). La segunda hereda la
       categoría de la primera y no hay forma de corregir una sola fila (`cola.mjs --corregir-categoria` va por etiqueta). Escalón: la
       categoría por etiqueta + `detalla_a` (la fila del estado que desglosa) cuando la misma etiqueta cae bajo dos renglones distintos.
    i) `periodo.mjs` dio a Kifisia 2022 como ejercicio de 12 meses (confianza media, sin evidencia) y el documento dice "περιόδου
       9/8/2021 - 30/06/2022" en la portada (L47, L93, L261): primer ejercicio de la sociedad, unos 10,7 meses. Un período de menos de 12
       meses tiene que salir como parcial (Admin/registros/documentos-parciales.txt) o a la cola, no como anual.
    k) Una respuesta "no" de la cola a una duda de importe ("¿se carga X del estado y no Y de la nota?", Olympiacos 2023 caso 446850a)
       no cambia nada: la verificación siguió con el importe del estado y hubo que agregar un ajuste `fila` a mano. Que esa respuesta
       aplique sola el importe de la nota (es lo que la pregunta ofrece), con la misma compuerta de cierre.
    l) Desglose de un renglón NETO del estado: en Olympiacos el estado NIIF imprime solo "Κέρδη / (Ζημία) από πωλήσεις ποδοσφαιριστών" y
       la nota lo abre en venta bruta menos costos; extraer marcó los costos como `gasto` y la carga los puso como gasto en 2023 y como
       ingreso negativo en 2021, 2022, 2024 y 2025 (hubo que fijarlo con ajustes `categoria`). Si el renglón que la nota desglosa es de
       ingreso, sus filas de costo van como ingreso negativo, siempre.
    m) El chequeo contra el año vecino marca como error un cambio de presentación: Olympiacos 2020 da 82,46 M en su documento (bruto) y
       74,81 M en la columna anterior del de 2021 (neto); la diferencia son exactamente las filas de costo de la venta (7,65 M). Escalón:
       si la diferencia es igual a la suma de filas que el otro documento netea, es "presentación distinta", no un NO.
    n) Un ajuste `fila` que suma una fila fuera del total impreso (Kifisia 2025: 60.000 de transferencias, L421) deja el chequeo del total
       de ingresos en NO en cada corrida. El ajuste tendría que poder decir "fuera del total impreso" para que ese chequeo lo descuente.
    o) `alta-club.mjs` no encontró el nombre legal de ninguno de los 6 clubes griegos del lote 71 (puso el de la carpeta): los documentos
       lo dicen en "Επωνυμία: ..." o en la portada como "ΠΟΔΟΣΦΑΙΡΙΚΗ ΑΝΩΝΥΜΗ ΕΤΑΙΡΕΙΑ <nombre>". Escalón por esas frases, con la cita.
    p) Color y liga de un club griego nuevo: `lookup-brand-color.js` no tiene la liga griega cacheada y `data/club-leagues` (caché gr.json)
       solo traía 2023-24 para Kifisia. Cachear las dos ligas griegas (Super League y Super League 2) por temporada con las tools que ya
       existen (`fetch-brand-color-reference.mjs`, la de ligas) antes del próximo club griego.
    q) Documentos transcriptos que nunca entran a un lote: Aris 2022 y Atromitos 2017 quedaron afuera de `lote-71.txt` sin que nada avise.
       Que `lote.mjs` (o `antes-de-localizar.mjs`) avise cuando un club de la lista tiene otros documentos transcriptos sin localizar.
    r) Una respuesta de perfil (socios, otros deportes) se guarda para todos los años del club, pero los casos ya abiertos de los otros
       documentos del mismo club siguen abiertos: Olympiacos dejó 18 casos repetidos después de contestar el de 2025. Al responder uno,
       cerrar los iguales del mismo club.
    s) Sueldos escondidos en "Αμοιβές τρίτων" (PAOK: 42 M en el cuadro de fútbol contra 9,2 M de costo de personal en la nota 17). Un
       chequeo de `audit.js` que compare `wages_squad` con el total de la nota de personal y con la cantidad de futbolistas, para que
       un caso así aparezca solo y no dependa de que un subagente lo note (relacionado con el to-do 229).

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
    a) GRECIA: cargados Asteras 2019-2025, Levadiakos 2019-2025, OFI 2018-2025, AEK 2016-2023 y 2025, Panserraikos 2023 y 2025 (2024 no tiene
       estado de resultados), Volos 2019-2025. Lo que falta (AEK 2024, Aris, Atromitos, Kifisia, Panetolikos, PAOK, Olympiacos, Athens Kallithea):
       to-do 231. Conocido, sin tocar (histórico): Panathinaikos 2025 tiene "Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου" como
       competition_bonus; en AEK 2023 y 2025 va como other_income.
    b) Los demás países, uno por vez, con la misma receta que Grecia: armar el lote con solo los documentos que traen estado de resultados
       (`ls Admin/lotes/lote-*.txt Admin/Archive/lotes/lote-*.txt | xargs -n1 basename | sort -V | tail -1` para el número), `antes-de-localizar.mjs`, ensayo, Guido corre `lote.mjs --ejecutar
       --cargar`, y la cola se revisa con un Sonnet que recomienda respuestas con cita. Fichas listas para alta (`alta-club.mjs --todos`,
       2026-10-10): Noruega 8, Portugal 7, Rep. Checa 7, Colombia 4, Países Bajos 4, Turquía 4, Ucrania 3, Corea 2, Suiza 2, Bélgica,
       Croacia y Dinamarca 1. Ninguna tiene todavía un año verificado: "listo para alta" es solo la ficha del club.
    c) Perímetro en pregunta (decide el `name` ya registrado): Molde, Vålerenga, Go Ahead Eagles, Basel, Pardubice, Aalesund, Fredrikstad,
       Sarpsborg 08. Las preguntas de la revisión del alta siguen en Admin/registros/altas-revision.jsonl.
    d) Rusia: las tablas de otros ingresos y gastos que no suman el código del formulario (Krasnodar, Krylia 2021-2025, Rostov 2025, Rubin
       2022-2025: la nota en bruto, el formulario en neto). Sin daño hoy: esos años quedan con el renglón entero.
    Mejoras de script vistas en Grecia: to-dos 210-215.

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
    Atromitos, PAOK, Panetolikos tienen estado por función), mirar `sin-salarios` en `node tools/audit.js`.

230. AHORRAR EN LAS ETAPAS 3 A 5 (pedido de Guido, 2026-10-14: el lote 71 de Grecia estima ~US$ 17 para localizar y extraer 45 documentos).
    Mirar dónde se va la plata (`node tools/gasto.mjs` y `Admin/registros/api/claude-api.jsonl` por tarea y por documento: localizar,
    extraer, validar-bloques) y qué se puede bajar sin perder exactitud: documentos que no son estados (informes del auditor, memorias) que
    igual pasan por localizar; páginas de más en lo que recibe extraer; un modelo más barato o menos esfuerzo para lo que hoy hace Opus;
    caché entre años del mismo club. Medir antes y después con `Admin/lotes/prueba-completa.txt` (lo cargado idéntico) y el costo por
    documento.
