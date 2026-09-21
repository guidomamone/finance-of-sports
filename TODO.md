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
  en `fuentes/<País>/<Club>.md` y en el índice de su país `fuentes/_indice/<País>.md`, que es donde se mira antes
  de empezar; las preguntas abiertas que dejaron (el tipo de cambio doble de Ollamani, el PAT de
  Once Caldas, las 3 cifras de Deportes Tolima, el presupuesto por año calendario de Instituto)
  están en `dudas-por-club.md` y en el archivo de fuentes de cada club.
- **El dominio y el repo** (era 7). Ya está hecho: el repo de GitHub se llama
  `guidomamone/finance-of-sports` (el nombre viejo redirige) y los push siguen llegando, así que
  Netlify quedó bien linkeado. Lo único de ese punto que había que no perder — que la línea
  `finance-of-sports/` del `.gitignore` del sitio profesional es lo que mantiene separados los dos
  repos — se movió a `CLAUDE.md`, que se lee en cada sesión, que es donde sirve.
- **Los 3 cards de presupuesto en un tab propio** (era 10): era un "evaluar si vale la pena", y la
  respuesta es que no.
- **Adelgazar el payload eager de `data/`** (era 22(d)). Decisión de Guido del 2026-09-20, sobre
  mediciones: sacar `reportingCurrency`/`fiscalYearStart` de `clubs.js` ahorra **3,0 KB comprimidos
  a 1000 clubes**, y acortar los `reportType` de `club-index.js` ahorra **60 bytes**, contra un
  refactor que toca el selector para todos los visitantes. No rinde. Las mediciones completas y qué
  haría falta para reabrirlo están en las notas del punto 3 de `PLAN-REMEDIACION-ESCALA.md`. La
  mitad que SÍ rendía de ese punto (`club-leagues.js`) se hizo en la Versión 164.
- **El corte free/paid y el paywall** (eran 5 y 6). Decisión de Guido del 2026-09-14: **por ahora
  el sitio va todo gratis**. No hay corte que definir ni cuentas/suscripciones que construir, así
  que no son pendientes. El día que se revise, la arquitectura ya charlada está en
  `finance-of-sports-project.md` (sitio estático + capa mínima de backend: Supabase para auth y estado
  de suscripción, Netlify Functions para el webhook de pagos; no migrar a Next.js).

---

## Qué hay que hacer

34. LO QUE DEJÓ ABIERTO EL MERGE DEL SELECTOR (Versiones 143-155, terminado el
    2026-09-17). Ninguno es un bug: son decisiones que se tomaron a propósito y que
    conviene revisar cuando haya más datos o más uso.

    (a) **MÓVIL, más allá de que entre.** Los dos cards apilan y el modal funciona a
        375px —verificado, sin desborde horizontal— pero nadie diseñó la experiencia
        en un teléfono. Decisión de Guido durante el prototipado: primero desktop.
        Ojo que la to-do 26 (el `.header-right` a 375px) sigue abierta y es de antes.

    (b) **NO HAY GRUPOS GUARDADOS.** Armar "mis 6 brasileños" en el constructor de la
        mezcla se pierde al cerrar el modal. Si el caso aparece seguido, es lo primero
        que pide el modelo de bloques.

    (c) **UN BLOQUE DE CLUBES EN LA MEZCLA TIENE UN SOLO AÑO PARA TODO EL BLOQUE**
        ("el más reciente de cada uno", o un cierre puntual). El detalle
        ejercicio-por-club solo existe en la rama Clubes. Se hizo así para que cada
        fila del constructor no se volviera un formulario; si hace falta, es donde
        crece.

    (d) **EL APORTE DE CADA BLOQUE NO SE MUESTRA EN EL CONSTRUCTOR.** Dice "6
        ejercicios", no "489 M". Es a propósito: el aporte en plata obliga a bajar el
        `data/<club>-data.js` de cada club MIENTRAS elegís, que es justo lo que el
        selector evita (son 41 archivos y el sitio los carga por demanda). Hoy los
        baja recién al apretar "Comparar". Misma tensión que la to-do 33.

    (e) **UN LADO PUEDE SUMAR UN PROMEDIO CON UNA SUMATORIA.** Se avisa en pantalla,
        no se prohíbe. Decisión explícita de Guido: "suma peras con manzanas pero no
        es mi tema, yo tengo que dar la funcionalidad".

    (f) **LOS DATOS SON FLACOS PARA LO QUE LA INTERFAZ YA PERMITE.** 34 de los 41
        clubes tienen UN solo ejercicio cargado, y de las 8 ligas con temporadas, 4
        tienen una sola. Comparar la liga argentina contra la brasilera hoy es 5
        clubes contra 1 (Mirassol). La interfaz lo dice —los chips muestran cuántos
        equipos tiene cada temporada, y el resultado muestra la fórmula y el conteo—
        pero el número sigue siendo pobre hasta que haya más balances cargados.

33. QUÉ VA A MOSTRAR INICIO CUANDO HAYA DATA. Idea de Guido, 2026-09-16, contestando la pregunta
    que dejó abierta la etapa 2 del merge (¿Inicio es SOLO la bifurcación, como el prototipo, o
    lleva contenido abajo?): lleva contenido, pero no el que tiene hoy. La idea es que Inicio
    deje **rankings prearmados** — clubes por ingresos, los clubes de la Premier rankeados,
    cosas así — para que alguien que llega por primera vez vea de qué va el sitio sin tener que
    elegir nada primero. O sea: la bifurcación arriba (la pregunta), y abajo una vidriera del
    contenido, no los KPIs del club activo.

    POR QUÉ NO SE HACE YA: hace falta masa crítica de datos. Hoy 34 de los 41 clubes tienen UN
    solo ejercicio cargado, y de las 8 ligas con temporadas, 4 tienen una sola. Un "ranking de
    la Premier" no existe todavía: no hay ningún club inglés cargado.

    MIENTRAS TANTO, abajo de la bifurcación quedaron los KPIs y los 3 gráficos del club activo
    (`#inicioClub`, solo visible cuando hay club). No es lo que va a ir ahí, es lo que había y
    no se tiró. Ojo con una duplicación que ya existe y conviene resolver cuando se haga esto:
    "Ingresos por año" y "Gastos por año" de Inicio muestran casi lo mismo que el `trendChart`
    de Finanzas.

    OJO CON EL COSTO DE CARGA: un ranking obliga a bajar el `data/<club>-data.js` de cada club
    del ranking, y el sitio los carga por demanda justamente para no pagar 41 archivos por
    visita. Es la misma tensión que la sección 5.5 de `Prototyping/Selector/MERGE-A-PRODUCCION.md`
    anota para el constructor de la mezcla. Si el ranking se precalcula en build time (un
    `data/rankings.js` generado por una herramienta de `tools/`), el problema desaparece — pero
    entonces hay que acordarse de regenerarlo en cada onboarding, como ya pasa con
    `fuentes.html` y con la sección generada de `ESTADO.md`.

26. MOBILE, y es una REGRESIÓN del selector de la Versión 137. A 375px de ancho, `.header-right`
    mide 480px dentro de los 347px disponibles: el botón Comparar queda cortado y los de contacto
    e idioma quedan FUERA de la pantalla, con la página entera scrolleando de costado
    (`document.documentElement.scrollWidth` 494 contra 375, medido en el navegador). La causa es
    aritmética: el botón de club son 210px contra los ~104px del `<select>` que reemplazó, y con
    el select la fila entraba por 1px. `.header-inner` envuelve (eso se arregló en la 137) pero
    `.header-right` es `flex-wrap:nowrap` + `flex-shrink:0`, así que no cede.
    DECISIÓN DE GUIDO, por eso no se arregló solo: las dos salidas cuestan algo distinto.
    (a) Dejar que `.header-right` envuelva y darle al botón de club su propio renglón — probado en
        el navegador, `scrollWidth` vuelve a 375 y entra todo, pero el header es `sticky` y pasa
        de 138px a 181px, o sea 22% de la pantalla fija en un teléfono.
    (b) Achicar el botón en móvil escondiendo el "Estás viendo" (`.cb-eyebrow`) y el "Cambiar"
        (`.cb-change`), dejando escudo + nombre + caret. Menos alto, pero el botón pierde la
        instrucción de qué hace.

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
        columna Equipo; el prototipo de la Versión 137 (ya borrado) tenía además un "Ranking de
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

20. LO ÚNICO QUE QUEDA DE LOS HALLAZGOS DE AUDITORÍA (primera corrida, Versión 122-123). De los
    8 subpuntos originales quedó **medio**, y es una decisión que Guido difirió a propósito. Todo lo
    demás está cerrado; la historia está en `CHANGELOG.md`.

    (b) **VÉLEZ 2016 (49%) y 2017 (43%) de Ingresos, el catch-all.** Instituto ya salió de acá
        (Versión 172: su Anexo V sí tenía desglose por sector y bajó de 42% a 27%). Vélez no, y es
        otro problema: el 100% de su catch-all es `other_income` y son 5 líneas identificables las
        dos veces — "Por servicios de enseñanza" + "Subsidios estatales a la educación" (**Vélez
        tiene colegio**: 20,2% en 2016 y 22,5% en 2017, o sea la mitad del catch-all y un negocio
        real), "Otros derechos de fútbol profesional", "Derechos de formación" y "Uso del estadio".
        Ese desglose ya está MEDIDO, no hay que volver a calcularlo.
        DECISIÓN DE GUIDO (2026-09-20): **está de acuerdo en agregar una fila de estadio, pero
        quiere tratar el tema con profundidad en una sesión propia, así que NO se implementó.**
        DOS COSAS QUE HAY QUE RESOLVER EN ESA SESIÓN, y por eso no alcanzaba con agregarla y listo:
        · Guido la nombró **"Gastos de Estadio"**, que es una fila de GASTOS, y el problema de Vélez
          está del lado de los INGRESOS (su línea es "Uso del estadio", alquiler del estadio, un
          ingreso). Hay que aclarar si quiere las dos filas, solo la de ingresos, o si el tema es
          más amplio de lo que este punto cubre.
        · Y está el costo que hace que valga la pena pensarlo: por la regla de la Versión 53, las
          filas de Formato simplificado son SIEMPRE las mismas para todos los clubes, así que
          cualquier fila nueva aparece en los 41, la mayoría en $0. Rinde si el rubro se repite
          entre clubes; no rinde si es solo Vélez. Lo mismo para una fila de "Educación", que es la
          otra mitad del catch-all de Vélez.

21. TIPOS DE CAMBIO SIN PROCEDENCIA VERIFICADA. Queda UNO, y `node tools/audit.js` lo lista:
    (b) 5 cotizaciones de mercado escritas en el archivo de Argentinos Juniors en vez de `FX_CLOSE`
        (2015, 2016, 2017, 2018, 2019). Mientras las use un solo club no duplican nada; se mueven a
        la tabla al confirmar la fecha exacta de cierre de cada una. ANTES DE MOVERLAS hay que
        confirmar que de verdad sean de mercado y no del propio documento: los 4 de Unión estaban
        marcados así y resultaron salir de su Anexo V (ver Versión 140), o sea que el rótulo estaba
        mal, no el número.
    RESUELTO (a) en la Versión 169: los 5 ejercicios con `fxSource:'unknown'` (San Lorenzo
    2015/2016/2017, Vélez 2015/2016) resultaron los 5 `document_close`, verificados uno por uno
    contra el Anexo de moneda extranjera de su propio balance. **La to-do daba los 5 por
    bloqueados y los 2 motivos ya no eran ciertos**: decía que los PDFs de San Lorenzo "nunca se
    transcribieron" (están transcriptos desde el 2026-09-17) y que la transcripción de Vélez "no
    preservó la columna de cambio vigente" (su Anexo VI la tiene). La sospecha de una copia entre
    clubes también quedó descartada: los dos cierran el 30 de junio, así que les toca la misma
    cotización oficial y coincidir es lo esperado.

22. MAPA DE ESCALA (Versión 128, ampliado en la 159 — ver `.claude/skills/escala-finance-of-sports/`
    para el mapa completo con su metodología, y `auditorias/2026-09-17-escala.md` para el reporte
    de esta corrida). (a), (b), (c), (e), (f), (g), (h) e (i) resueltos y (d) descartado, se borran
    de acá. **Con esto quedan cerrados los 8 puntos de `PLAN-REMEDIACION-ESCALA.md`.** Lo que sigue
    abierto de escala:

35. NUEVO (sesión 2026-09-20, al partir `fuentes-por-club.md` en índice de países +
    `fuentes/_indice/<País>.md`): automatizar el mantenimiento de ese índice con
    `tools/generate-fuentes-index.js`, mismo patrón que `tools/generate-club-index.js`. Hoy los 3
    números de cada país (clubes trackeados, con documento, chequeo más viejo) se escribieron una
    vez con un script de un solo uso y se mantienen a mano. **El prompt completo y autocontenido
    para esa sesión está en `PROMPT-generador-indice-fuentes.md`**, con el criterio de clasificación
    ya decidido, las dos listas de regex, y los 12 casos que hubo que resolver a mano. No es
    urgente: el índice se toca una vez por sesión de sourcing y son 44 líneas.

38. NUEVO (sesión 2026-09-20, al ponerle tope a las grillas del selector). **La grilla de "elegir
    clubes" del constructor de mezcla necesita su propio buscador.** Hoy lista todos los clubes para
    marcar a ojo; desde la Versión 165 muestra 30 con "Mostrar más" y los ya marcados arriba, así
    que deja de hacer jank, pero eso NO arregla el problema de fondo: a 1000 clubes una grilla para
    elegir a ojo no sirve aunque sea rápida. Lo que necesita es un campo de filtro propio, como el
    del modal. Es una feature, no una optimización, por eso no entró en el punto 4 del plan de
    escala. Ver `js/selector.js`, la rama `else` de la grilla de mezcla.
