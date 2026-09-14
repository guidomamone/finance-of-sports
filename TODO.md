# TODO — finance-of-sports

Lo que falta hacer. **Esta es la única lista oficial de próximos pasos del proyecto.**
No la dupliques en `CHANGELOG.md` ni en `finance-of-sports-project.md`, que son historia,
ni en el comentario de ningún archivo de código.

## Cómo leer esta lista

- **Los números son IDENTIFICADORES, no prioridad.** Se conservan de la lista vieja (la
  que vivía en el comentario de `index.html`) porque los puntos se citan entre ellos y
  desde los skills: "ver to-do 20(h)" tiene que seguir apuntando a lo mismo. Por eso hay
  huecos: son los puntos que se resolvieron o se descartaron. Un punto nuevo toma el
  número siguiente al más alto, nunca uno libre.
- **La prioridad es el ORDEN en que están escritos**, de arriba hacia abajo.
- **Un punto resuelto se BORRA de acá.** Su historia ya queda en `CHANGELOG.md` y, si
  ameritaba el porqué, en `finance-of-sports-project.md`. Antes se dejaban marcados como
  "RESUELTO" y la lista terminó con la mitad de los puntos siendo cosas ya hechas.

Sacados el 2026-09-14 por decisión de Guido, para que quede el registro de que no se
perdieron sino que se descartaron: buscar y cargar ejercicios que faltan de un club
(Racing/River, y Boca), que no es una tarea de lista sino trabajo normal de onboarding;
y Mercado de Pases, que queda fuera de alcance por ahora.

---

## Qué hay que hacer

23. NUEVO (Versión 137, lo que dejó abierto el selector jerárquico + la comparación):
    (a) RESUELTO (Versión 140). Inicio mostraba "DEUDA NETA ACTUAL: 0,0 M USD" para Boca y
        "Último resultado" con la cifra del PRESUPUESTO. Causa: `renderInicioStats()` usaba "el
        último ejercicio de la gestión actual" como sinónimo de "el estado actual del club". Ahora
        cada stat pide el último ejercicio QUE TENGA SU DATO (el último balance para el resultado,
        el último que informe deuda para la deuda) y escribe cuál es abajo del número, en vez de
        esconderlo en un tooltip. Los presupuestos siguen escribiendo `grossDebt:0, cash:0` en sus
        datos, pero ninguna vista los publica ya como si fueran un cero real.
    (b) `LEAGUES[].totalClubs` está en `null` en las 8 ligas, así que el aviso de sesgo del
        benchmark dice "sale de los 5 clubes cargados" y no puede decir "5 de 20". OJO al
        cargarlo: la cantidad de equipos de una liga TAMBIÉN cambia por temporada (Primera
        División de Argentina pasó de 20 a 30 en el período cargado), así que el dato va por
        año, no como un número suelto. Mismo problema que tenía la membresía.
    (c) LA VISTA DE LIGA (pedido de Guido, "podemos separarlo en sesiones pero guardámelo en un
        to-do gigante"). Elegir una liga o un país entero en el selector hoy solo filtra la
        columna Equipo; el prototipo (`prototipo-selector.html`) tiene además un "Ranking de
        ingresos" con una barra apilada por club. Lo que hay que resolver antes de dibujarlo, y
        es lo que lo hace una sesión propia: un ranking de liga es (liga, EJERCICIO), así que
        hay que elegir el año y decir cuántos de sus integrantes tienen ese ejercicio cargado;
        carga N clubes en paralelo; y mezclar el último ejercicio de cada uno (que es lo que
        hace el prototipo) compara años distintos sin avisarlo. La infraestructura ya está:
        `clubsOfLeagueYear()` contesta quiénes integraban la liga ese año, y los 4 avisos de la
        comparación son los mismos que necesita esta vista.
    (d) DEFLACTORES. El aviso de "ejercicios de años distintos" explica el problema (cada
        ejercicio se convierte a USD con el tipo de cambio de su propio documento, sin ajustar
        por inflación), pero no lo arregla. Arreglarlo de verdad es una serie de deflactores por
        moneda y año. Decisión de Guido si se abre.
    (e) ESCUDOS. Los 41 clubes se muestran con un círculo azul con sus iniciales. Los escudos
        reales, o al menos el color de cada club, harían el selector y las barras mucho más
        legibles; son 41 datos que hay que verificar uno por uno (un color equivocado se lee
        peor que ninguno) y, si son imágenes, hay que ver el tema de derechos.
    (f) El botón "Comparar" del header, sin club elegido, abre el panel para ELEGIR club en vez
        de para comparar. Es correcto (no se puede comparar contra nada), pero el botón no lo
        explica: podría estar deshabilitado con el motivo, o directamente escondido en la
        portada.

    TECHO DEL MODELO, no tarea: la taxonomía es de fútbol (`player_sales`, `wages_squad`,
    `youth_football`) y las pestañas Pases/Resultados/Títulos y `gestionesByClub` también. Un club de
    otro deporte entra hoy con media taxonomía vacía y 3 pestañas sin sentido.

20. NUEVO (Versión 122-123): los 59 hallazgos de la primera auditoría (`node tools/audit.js`).
    Ninguno es P0 ni P1 (los 222 tie-outs cierran), son todos riesgo o limpieza. El reporte completo,
    con el eje de juicio de esa corrida, está en `auditorias/2026-09-13.md`. Por grupo:
    (a) 11 balances REALES sin `officialPAT` (los 10 de Japón + Club América): tienen
        officialTotalRevenue/Expenses pero no el resultado del ejercicio, así que ese número no lo
        verifica nadie. Chequear si el documento lo trae impreso y cargarlo.
    (b) 11 ejercicios con el catch-all de Formato simplificado llevándose >40% del total (casi todos
        de Japón, del lado de Ingresos, más `river 2024` con 80% del lado de Gastos). La taxonomía
        no cubre cómo reporta la J.League: o se mapean mejor las líneas, o falta una categoría.
    (c) 16 líneas con el signo opuesto al de su sección y peso real (deducciones sobre la receita de
        los clubes brasileños, "Costo de desarrollo de jugadores propios (reclasificación)" de Vélez
        2015/2016/2017). Probablemente todas correctas: confirmar contra el documento y, recién ahí,
        silenciarlas en `tools/audit-ignore.json` con el motivo escrito.
    (d) 5 líneas de INGRESO de Racing (2009, 2010, 2012, 2014) categorizadas como `exceptional_items`,
        que es una categoría de la taxonomía de GASTOS. Suman bien al total, pero caen al catch-all.
        Decidir: ¿se agrega una categoría de ingreso extraordinario, o se reubican esas líneas?
    (e) Racing 2009/2010/2011: ejercicios reales sin ningún total oficial cargado. Son los 3 que se
        cargaron con el proceso viejo en USD ya convertido (ver to-do 1).
    (f) RESUELTO (Versión 140). `river 2024` tenía sus 8 líneas de gasto en `other_expenses`, o
        sea el 80% en el catch-all y "Salarios y primas" en $0. Su Anexo VIII desglosa POR DESTINO
        (qué área gastó) y no por naturaleza, así que los sueldos están adentro de cada área. Se
        mapeó cada destino al bucket de destino que ya existe, siguiendo línea por línea el
        precedente de Boca 2025: el catch-all quedó en 0% y el 53% que no se puede desglosar está
        en la fila "Fútbol profesional (sin desglosar por la fuente)", que lo dice. Ni un peso se
        movió. LO QUE FALTA es UNA celda: fila "Sueldos y cargas sociales" x columna "Fútbol
        profesional" del Anexo VIII (páginas 59-62 del PDF). El día que se lea y verifique, esa
        porción pasa a `wages_squad`.
    (g) RESUELTO EN SU MAYOR PARTE (Versión 135): de los 5 literales de `clubId` quedan 2, y los 2
        son a propósito. El Presupuesto Financiero y el de Inversiones de Boca 2026/27 estaban
        escritos a mano como HTML adentro de este archivo (133 líneas) con un `isBoca2027`
        decidiendo si se mostraban ellos o la versión genérica; ahora son datos en
        `data/boca-data.js` y los renderiza el mismo código que usa cualquier club. Los 2 que
        quedaban: `let currentClub = 'boca'`, que se fue con el cold start de la Versión 137
        (ahora nace en null y el club sale de localStorage), y el `isBoca2027` de los 3 cards de
        torneo, que Guido decidió dejar como está porque es una feature que hoy solo tiene Boca.
        O sea que queda UNO, y es a propósito.
    (h) LO MÁS IMPORTANTE, y es una decisión de Guido, no una corrección mecánica (sale del eje de
        juicio de `auditorias/2026-09-13.md`): el sitio hoy muestra IGUAL dos cosas distintas — "la
        fuente reporta cero" y "la fuente no lo desglosa". Un club japonés muestra Televisión = $0
        con la mitad de sus ingresos en el catch-all, porque el documento de la J.League solo publica
        3 líneas por club (sponsors, entradas y un bolsón que junta merchandising, distribución de
        liga, transferencias, academia y femenino; el desglose existe solo a nivel división). Un
        periodista que compare Gamba Osaka con Real Madrid lee que uno no cobra televisación. Mismo
        problema, distinto origen, en `river 2024`: sus 8 rubros de gasto están todos en
        `other_expenses` con etiquetas por SECTOR ("Fútbol profesional" = 78.835 M, el 80% de los
        gastos, con los sueldos adentro), la misma trampa de "costos por destino, no por naturaleza"
        ya documentada con Coritiba (club-data-mapping §1, regla de la Versión 38). Las 2 opciones
        que propone el reporte: usar `lump_football_operations`/`lump_football_operations_expense`
        (que ya existen y se muestran como "sin desglosar por la fuente") en vez del catch-all
        genérico, y mostrar "—" en vez de "$0" en los buckets que la fuente no reporta. Para River
        hay que chequear antes si su balance trae la nota de costos por naturaleza, que sería mejor
        que el bolsón. NINGUNO de los dos cambios mueve un número: cambian bajo qué fila se muestra.

21. TIPOS DE CAMBIO SIN PROCEDENCIA VERIFICADA. Los 2 que quedan salen listados por
    `node tools/audit.js`, no hace falta buscarlos a mano:
    (a) 5 ejercicios con `fxSource:'unknown'`: San Lorenzo 2015/2016/2017 y Vélez 2015/2016. Los de
        Vélez no se pudieron confirmar porque la transcripción de esos 2 escaneos no preservó la
        columna de cambio vigente (los otros 9 años de Vélez SÍ se verificaron uno por uno contra su
        Anexo VI). Los de San Lorenzo, porque sus PDFs 2014-15, 2015-16 y 2016-17 nunca se
        transcribieron a `.md`, contra la regla del proyecto: transcribirlos es el paso que además
        resuelve esto. OJO: San Lorenzo y Vélez tienen EXACTAMENTE los mismos valores en 2015
        (8,988) y 2016 (14,94), así que puede haber una copia entre clubes detrás.
    (b) 5 cotizaciones de mercado escritas en el archivo de Argentinos Juniors en vez de `FX_CLOSE`.
        Mientras las use un solo club no duplican nada; se mueven a la tabla al confirmar la fecha
        exacta de cierre de cada una. ANTES DE MOVERLAS hay que confirmar que de verdad sean de
        mercado y no del propio documento: los 4 de Unión estaban marcados así y resultaron salir de
        su Anexo V (ver Versión 140), o sea que el rótulo estaba mal, no el número.
    RESUELTO (Versión 140): Unión. Sus 4 tipos de cambio estaban etiquetados `market_close` y los 4
    salen del Anexo V de su propio balance, lado Activo/Créditos. Pasaron a `document_close`. El
    hallazgo "Unión 2024 usa 890,50 cuando la tabla dice 909" era real pero mal diagnosticado: un
    Anexo de moneda extranjera valúa activos al comprador y pasivos al vendedor, así que 890,50 y
    909 son los dos lados del spread del mismo día y los dos están bien.
22. NUEVO (Versión 128, auditoría de escala `auditorias/2026-09-13-escala.md`): los 6 cuellos que
    aparecen al crecer, en el orden en que aparecen. Cada uno con el número que lo dispara:
    (a) RESUELTO (Versión 129): `clubId` NO tenía país. Convención escrita en `CONVENCIONES.md`
        (club nuevo = id con país al final), los 41 viejos sin migrar a propósito, y
        `tools/audit.js` avisa (`clubid-heredado-ambiguo`) el día que un id heredado deja de ser
        inequívoco, que es el único momento en que renombrarlo vale lo que cuesta. Lo que sigue es
        el detalle de por qué, por si hace falta revisar la decisión: Los ids
        `racing`, `independiente`, `union`, `sanlorenzo` existen en varios países (Racing de
        Santander, Independiente del Valle y el de Medellín, Unión Española, Unión Magdalena). Ya
        pasa en `fuentes/`, donde conviven Honduras/Olimpia.md y Paraguay/Olimpia.md, y ahí no choca
        solo porque el país es una carpeta. El id además define el nombre del archivo de datos y el
        prefijo de cada sourceId, así que arreglar una colisión después es renombrar todo eso.
        DECIDIR ANTES DEL PRÓXIMO CLUB: id con país (`racing-ar`), más un chequeo en `tools/audit.js`
        que falle si dos clubes de países distintos comparten nombre base.
    (b) El comentario interno de ESTE archivo son 50 KB de los 140 KB de `index.html` (36%), y los
        baja CADA visitante en CADA pageview: la to-do list, qué club es placeholder, todo. Crece
        102 bytes por club, o sea ~150 KB a 1000 clubes. Mover el bloque a un `ESTADO.md` propio y
        dejar acá un puntero de 3 líneas.
    (c) `fuentes.html` es una sola página de 767 bytes por documento: 70 KB hoy con 91 documentos,
        ~1,7 MB y 2.200 filas a 1000 clubes. Partir por país arriba de ~300 documentos, con un
        índice. Es el mismo generador con un loop más, y le da una URL propia a cada país.
    (d) PARCIAL (Versión 129, y el selector de la 136 ya lo consume): existe
        `data/club-index.js`, el índice liviano generado (~76 bytes
        por club, ~74 KB a 1000 contra los ~366 KB de `clubs.js`), que es lo que el selector
        necesita. Lo que FALTA es la otra mitad: adelgazar `clubs.js`, moviendo a cada
        `data/<club>-data.js` los campos que solo importan una vez que el club está cargado
        (`reportingCurrency`, `fiscalYearStart`, `name` legal). Hoy los dos archivos viajan juntos,
        así que el payload todavía no bajó.
    (e) RESUELTO (Versión 137): el `<select>` plano de 41 opciones lo reemplazó el selector
        jerárquico (ver ESTADO ACTUAL). `prototipo-selector.html` y
        `PROMPT-selector-jerarquico.md` quedan como el registro de la UX que se decidió, no
        como trabajo pendiente.
    (f) `auditAll()` carga los clubes en SERIE (`for` con `await`): 114 ms con 41, pero ~30 s a 1000
        clubes con latencia real, y es lo que hay que correr antes de cada push de datos. Tandas
        paralelas con `Promise.all`.

12. ACTUALIZADO Versión 95 (Guido: "onboard all pdfs we have"): de los 11 clubes con al menos un
    balance/memoria real ya descargado que identificó la investigación de la Versión 75 (ver
    `fuentes-por-club.md`, sección "Otros clubes de Primera División"), TODOS fueron revisados a
    fondo en esta sesión. 6 tenían datos financieros reales usables y ya están cargados: Rosario
    Central, Independiente, Argentinos Juniors, Estudiantes de La Plata, San Lorenzo, Unión (sumados
    a Vélez e Instituto, ya cargados antes) — el sitio pasó de 5 a 11 clubes en una sola sesión. Los
    otros 3 (Gimnasia y Esgrima LP, Talleres, Belgrano) NO tienen datos cargables pese a nombres de
    archivo prometedores — son reportes narrativos/infográficos sin Estado de Recursos y Gastos real,
    confirmado revisando el contenido completo de cada uno, no solo el nombre.
    PENDIENTE (documentos ya identificados, quedaron sin procesar por alcance/tiempo de esta sesión,
    no por falta de fuente):
    - Argentinos Juniors: 3 balances escaneados (2015-16/2016-17/2017-18) sin OCR — hoy esos 3
      ejercicios están cargados a nivel agregado (4 categorías, desde una presentación de asamblea),
      el OCR de los balances completos daría más detalle por rubro.
    - Estudiantes de La Plata: Ejercicio 2024-25, escaneado, sin OCR.
    - San Lorenzo: 4 balances escaneados (2011-12/2014-15/2015-16/2016-17) sin OCR; Presupuesto/
      Pautas 2023-24 transcriptos pero no cargados (presupuesto de caja mensual, filas mal alineadas
      por el layout de pdftotext, necesita más trabajo de parsing).
    - Unión: Ejercicios 116/117/118 (estados contables), escaneados, sin OCR.
    - Instituto: Presupuesto 2025 + premisas transcriptos pero SIN cargar — presupuestan por año
      CALENDARIO (ene-dic) en vez de por ejercicio económico (jul-jun, el que usa el balance), no
      encaja en el mismo `year` key sin decidir antes cómo modelar un presupuesto de ejercicio
      calendario (¿un `year` propio tipo "cal-2025"? ¿mapearlo al ejercicio jul-jun que más se
      superpone?) — confirmar con Guido antes de forzar un criterio.
    Ver `dudas-por-club.md` para las preguntas genuinas que quedaron abiertas de esta sesión
    (atribución de gestión con cambio de presidente a mitad de ejercicio, cotizaciones de USD
    ambiguas, columnas de Anexo no separables por OCR) — no se asumió ningún criterio a ciegas.

13. NUEVO (Versión 104): Ecuador — evaluar si el "informe presidencial" de Deportivo Cuenca (caja:
    ingresos/egresos bancarios + pagos SRI/IESS, ver `fuentes/Ecuador/Deportivo Cuenca.md`) es
    cargable al sitio pese a no ser un estado contable devengado (sin balance/estado de resultados
    completo) — decidir con Guido antes de forzarlo al esquema existente, o anotar la duda en
    `dudas-por-club.md`. Aparte: re-chequear Ecuador en unos meses, cuando la prensa reporte que
    algún club de la lista completó su conversión a S.A.D.P./SAD (ver hallazgo de esta sesión: a
    sept-2026 ninguno lo hizo todavía) — recién ahí tendría sentido buscar en Supercias.

14. NUEVO (Versión 105): sourcing en África, 0 PDFs conseguidos pero una pista concreta sin cerrar
    en Marruecos. Wydad AC y Raja Club Athletic tienen SAS (sociedad anónima) reales que deberían
    depositar su bilan (balance) en el registro oficial marroquí OMPIC (`directinfo.ma`) — la
    búsqueda por nombre es gratis, pero descargar el documento es pago y requiere una cuenta que un
    agente no puede crear. Si Guido quiere pagarlo él mismo: entrar a `directinfo.ma`, buscar "RAJA
    CLUB ATHLETIC SOCIETE ANONYME RAJA" y "WYDAD ATHLETIC CLUB", confirmar primero (gratis) si
    figura un bilan depositado antes de pagar nada — ver `fuentes/Marruecos/_notas-generales.md`
    para el detalle completo. Sudáfrica, Egipto y Nigeria quedaron como dead-end estructural (ver
    `.claude/skills/club-sourcing/SKILL.md` sección 8), no vale la pena reintentarlos sin un dato
    nuevo.

15. NUEVO (Versión 107): Club América/Ollamani — decidir si vale la pena cargar el Ejercicio 2024
    (período inicial de 11 meses, 1/2/2024 a 31/12/2024, PDF ya descargado en
    `Clubes/México/Club América/reporte-financiero-ollamani-2024-auditado.pdf`) como 2do punto de
    la serie histórica, aun sin ser directamente comparable a un año completo. Aparte: preguntarle
    a Guido (o anotar en `dudas-por-club.md`) si vale la pena escribirle a Ollamani Investor
    Relations para resolver la discrepancia de tipo de cambio de cierre 31/12/2025 declarada en el
    mismo reporte ($18.0012 en la sección MD&A vs. $17.9528 en la Nota a los EEFF auditados, ver
    `data/clubamerica-data.js`). Por último: `fuentes/México/_notas-generales.md` señala que otros
    grupos matriz de Liga MX que ya cotizan en BMV por otro negocio (FEMSA-Monterrey/Tigres,
    CEMEX-Tigres) podrían desglosar fútbol como segmento en SUS PROPIOS reportes CNBV, igual que
    Ollamani — vale la pena chequear antes de asumir que el hallazgo de Club América es único en
    Liga MX. RESUELTO (al onboardear los primeros clubes de Brasil): `ejercicioLabel(year,
    reportType, clubId)` ahora recibe un 3er parámetro opcional `clubId`; si `isCalendarYearClub(clubId)`
    (lee `clubs[clubId].fiscalYearStart === '01-01'`) el label es el año suelto ("Balance 2025"), no
    el rango de temporada. Aplica automáticamente a Club América, Japón y cualquier club de año
    calendario futuro con solo declarar `fiscalYearStart:'01-01'` en `data/clubs.js`, sin tocar
    `js/finanzas-calc.js` de nuevo.

16. ACTUALIZADO (Versión 116): Brasil — de los 8 clubes con PDF ya descargado en `Clubes/Brasil/`
    que quedaban sin cargar, se cargaron 3 en la Versión 116 (Coritiba, Ituano, Mirassol). QUEDAN 5,
    todos con PDF ya descargado Y con texto extraíble confirmado (se midió `pdftotext` chars/página
    para los 8 antes de empezar: ninguno es escaneo, ninguno necesita OCR, así que son todos
    "fáciles" en el sentido de la Versión 116):
    - Athletico Paranaense (2 ejercicios: 2024 y 2025, no es SAF, 47 pág., ~2.346 char/pág.)
    - Bahia (2024 + 2025 de la SAF, más 2020-2021 de la associação — DECIDIR QUÉ ENTIDAD USAR antes
      de cargar, es el único de los 5 con esa pregunta abierta; 41 pág., ~3.143 char/pág.)
    - Botafogo-SP (3 PDFs, NO es el Botafogo carioca ya cargado, ojo de no confundirlos; 35 pág.,
      ~2.101 char/pág.)
    - Chapecoense (3 ejercicios: 2016, 2017 y 2020-2021, no es SAF; 40 pág., ~2.270 char/pág.)
    - Vasco da Gama (2 SAF + 1 associação, recuperado pese al bloqueo Cloudflare del dominio
      oficial; 54 pág., ~2.464 char/pág.)
    Para cada uno: 1 solo ejercicio, seguir el patrón de `data/coritiba-data.js` (el más completo de
    Brasil) o `data/gremio-data.js`. OJO con la trampa que apareció en Coritiba: si la DRE presenta
    los costos del fútbol en 2 líneas por DESTINO ("futebol profissional"/"categorias de base"),
    NO cargar esas 2, buscar la nota de "custos por natureza" y cargar ESA, o el bucket "Salarios y
    primas" de Formato Simplificado queda en cero para el club (ver la REGLA de la Versión 38 en
    club-data-mapping SKILL.md sección 1). Aparte: Deportes Tolima (Colombia) quedó sin
    cargar por una discrepancia real de 3 cifras de PAT distintas entre SIIS/el documento/la cuenta
    propia (ver `dudas-por-club.md`) — no forzar un número hasta resolver cuál es la correcta.

17. NUEVO (Versión 110): Once Caldas tiene `tax` como residuo documentado (no una línea impresa) por
    falta del estado primario en el PDF descargado (solo notas) — si en el futuro aparece el Estado
    de Resultado Integral primario, reemplazar el residuo por el dato real (ver `dudas-por-club.md`).
    Envigado tiene 9 ejercicios más (2016-2024) disponibles en SIIS sin cargar, a propósito (pedido
    explícito de ampliar clubes esta sesión, no profundizar uno). El resto del barrido colombiano
    (América de Cali, Atlético Nacional, Independiente Santa Fe, Junior de Barranquilla, Deportivo
    Cali, Deportivo Pereira, Millonarios) sigue sin cargar, solo sourcing — ver `fuentes-por-club.md`.

18. NUEVO (Versión 111): España — los 10 clubes cargados tienen MUCHOS más años disponibles sin
    cargar todavía en `Clubes/España/<Club>/` (Real Madrid y Barcelona: 22 años cada uno, 2003-2025;
    Atlético de Madrid: 12 años; Deportivo Alavés: 9 años; Real Betis/Celta de Vigo: con huecos;
    Villarreal/Valencia solo tienen 1-2 años reales en el archivo actual) — próxima extensión
    natural es sumar el ejercicio anterior de cada club para habilitar comparación año a año, o
    seguir sumando clubes nuevos: Real Sociedad (carpeta creada, sin PDFs encontrados todavía) y los
    5 candidatos de `fuentes/España/_notas-generales.md` (Getafe CF, RCD Mallorca, RC Deportivo, SD
    Ponferradina, Real Zaragoza, cada uno con página propia de "Ley de Transparencia" confirmada por
    búsqueda, sin explorar en profundidad). También pendiente: investigar `memberCountByClub` y
    `gestionesByClub` (presidentes reales) para los 10 clubes, ninguno investigado esta sesión.

5. Definir el corte free/paid: qué queda gratis y qué es contenido pago,
   antes de poder construir Mi Cuenta de verdad (ver to-do #3, están ligados).

6. Construir el paywall real: cuentas + suscripciones (Supabase para
   auth/estado de suscripción, no para los datos de los clubes, que siguen
   siendo archivos estáticos), Netlify Functions para el webhook de dLocal
   Go y para gatear el contenido pago, siguiendo la recomendación de
   arquitectura ya charlada (sitio estático + capa mínima de backend, no
   migrar a Next.js todavía).

7. DOMINIO: renombrar el repo en GitHub y re-linkearlo en Netlify. **Lo tiene que
   hacer Guido, no lo puede hacer un agente.** El dominio `financeofsports.com` ya está
   comprado y apuntando al sitio, y la carpeta local ya se llama `finance-of-sports`;
   falta solo el repo.
   (a) renombrar en GitHub: `guidomamone/numeros-de-boca` -> `guidomamone/finance-of-sports`;
   (b) INMEDIATAMENTE después, re-linkear en Netlify (Site configuration -> Build & deploy
       -> Continuous deployment -> Link to a different repository). Netlify guarda el repo
       como `owner/nombre`: al renombrar, ese string queda viejo y los deploys pueden dejar
       de dispararse. GitHub mantiene redirects, así que el `git remote` viejo sigue
       funcionando, pero conviene actualizarlo con
       `git remote set-url origin https://github.com/guidomamone/finance-of-sports.git`;
   (c) verificar que el deploy siguiente buildea (cuesta 1 deploy de los ~25 mensuales del
       free tier, conviene juntarlo con un push real de contenido).
   OJO, LO ÚNICO QUE ROMPE DE VERDAD si alguien vuelve a renombrar la CARPETA: la línea del
   `.gitignore` del sitio profesional (`../.gitignore`) que ignora esta carpeta. Sin ella,
   todo este proyecto se vuelve untracked dentro del repo `guidomamone-website` y se puede
   commitear o deployar por error al sitio profesional. Nada del código del sitio depende del
   nombre del repo: no hay netlify.toml, no hay CNAME, no hay build step.

8. Reemplazar el email placeholder del formulario de contacto
   (contacto@bocaennumeros.example) por uno real antes de publicar.

9. MOBILE: las tablas largas del presupuesto oficial de Boca en pantallas angostas.
   La otra mitad de este punto (el header, que abajo de 900px aplastaba el `nav` a 0px de
   ancho y hacía desaparecer las 4 pestañas) se resolvió en la Versión 137: el header
   envuelve y el nav se lleva su propia fila.

10. Los 3 cards de presupuesto (Supuestos / Presupuesto Financiero / Presupuesto de
    Inversiones) siguen al fondo de Finanzas y no en un tab propio. Evaluar si hace falta
    ese paso; hoy no está claro que lo valga.
