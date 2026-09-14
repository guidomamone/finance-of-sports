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
perdieron sino que se descartaron:

- **Buscar y cargar ejercicios que faltan de un club** (Racing/River, y Boca): no es una tarea de
  lista, es trabajo normal de onboarding.
- **Mercado de Pases**: fuera de alcance por ahora.
- **Los 6 puntos de sourcing y onboarding por país** (eran 12 a 18: los PDFs argentinos ya
  descargados sin cargar, Ecuador, la pista de OMPIC en Marruecos, el ejercicio 2024 de Club
  América, los 5 brasileños con PDF listo, los años extra de España, y el barrido colombiano).
  Mismo criterio que el primer punto: buscar y cargar documentos es el trabajo del proyecto, no
  una lista de pendientes. **No se perdió nada**: qué hay descargado y qué falta de cada club vive
  en `fuentes/<País>/<Club>.md` y en el índice `fuentes-por-club.md`, que es donde se mira antes
  de empezar; las preguntas abiertas que dejaron (el tipo de cambio doble de Ollamani, el PAT de
  Once Caldas, las 3 cifras de Deportes Tolima, el presupuesto por año calendario de Instituto)
  están en `dudas-por-club.md` y en el archivo de fuentes de cada club.
- **El corte free/paid y el paywall** (eran 5 y 6). Decisión de Guido del 2026-09-14: **por ahora
  el sitio va todo gratis**. No hay corte que definir ni cuentas/suscripciones que construir, así
  que no son pendientes. El día que se revise, la arquitectura ya charlada está en
  `finance-of-sports-project.md` (sitio estático + capa mínima de backend: Supabase para auth y estado
  de suscripción, Netlify Functions para el webhook de pagos; no migrar a Next.js).

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
    (b) RESUELTO EN SU MAYOR PARTE (Versión 141). Eran 11 ejercicios con el catch-all arriba del
        40%; quedan 3 (instituto 2024 Gastos 42%, velez 2016 y 2017 Ingresos 49% y 43%). Los 8 que
        se fueron eran el mismo problema con dos caras: la fuente no desglosa, y el sitio lo
        mostraba en una fila que sugería que sí sabíamos qué era. Los 7 japoneses y `river 2024`
        pasaron al bucket "sin desglosar por la fuente", que lo dice. Para Japón se re-verificó
        antes (3 fuentes independientes) que el desglose por club NO existe en ningún lado: ver
        `fuentes/Japón/_notas-generales.md`. Lo que queda de Japón ya no es una tarea de código
        sino dos preguntas, una a la liga y otra a los clubes, anotadas en `dudas-por-club.md`. Los 3 que quedan son de clubes cuyo documento SÍ podría
        tener más detalle, hay que ir al documento.
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
