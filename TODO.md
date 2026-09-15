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
- **El dominio y el repo** (era 7). Ya está hecho: el repo de GitHub se llama
  `guidomamone/finance-of-sports` (el nombre viejo redirige) y los push siguen llegando, así que
  Netlify quedó bien linkeado. Lo único de ese punto que había que no perder — que la línea
  `finance-of-sports/` del `.gitignore` del sitio profesional es lo que mantiene separados los dos
  repos — se movió a `CLAUDE.md`, que se lee en cada sesión, que es donde sirve.
- **Los 3 cards de presupuesto en un tab propio** (era 10): era un "evaluar si vale la pena", y la
  respuesta es que no.
- **El corte free/paid y el paywall** (eran 5 y 6). Decisión de Guido del 2026-09-14: **por ahora
  el sitio va todo gratis**. No hay corte que definir ni cuentas/suscripciones que construir, así
  que no son pendientes. El día que se revise, la arquitectura ya charlada está en
  `finance-of-sports-project.md` (sitio estático + capa mínima de backend: Supabase para auth y estado
  de suscripción, Netlify Functions para el webhook de pagos; no migrar a Next.js).

---

## Qué hay que hacer

28. DECIDIR QUÉ SELECTOR VA AL SITIO. Hay TRES prototipos andando con los datos reales, todos en
    `Prototyping/` (que tiene su propio README con cómo abrirlos y regenerarlos). Hay que elegir
    entre ellos, o entre partes de cada uno; no es un sí/no:

    **A. `Prototyping/prototipo-inicio-selector.html`** — el selector de columnas de hoy, metido en la
    portada. Muestra la forma de los datos de una sola mirada (que hay 6 países, que Japón tiene
    10 clubes) sin tocar nada, y deja volver un nivel sin perder el resto. Su costo es el que
    levantó Guido: ~67 opciones y 5 decisiones simultáneas en la primera pantalla.

    **B. `Prototyping/prototipo-pasos.html`** (Versiones 148-153) — un card por paso, apilados, una decisión
    por vez, con el card resuelto encogido a una línea. Cada paso es multi-selección (casillas) y
    cada paso se puede ignorar con "Elegir más tarde"; si se ignoran todos, el sitio elige y lo
    dice (Boca contra River); si queda un solo club, el card final ofrece contra quién compararlo.
    Entra en un teléfono sin media queries y sin el punto de calidad ni su leyenda (los sacó
    Guido). Su costo es el inverso al de A: esconde la forma de los datos hasta que llegás al
    nivel, y son más clicks para el que quiere mirar.
    B TRAE ADEMÁS UNA FEATURE QUE EL SITIO NO TIENE, y que habría que construir de verdad si se
    aprueba: GRUPOS. Un lado es un conjunto de clubes que se mide como uno solo ("Primera División
    contra LaLiga"), sumando. Hoy `js/comparar-clubes.js` compara hasta 5 sujetos sueltos y su
    benchmark de liga es un PROMEDIO, no un total: son dos preguntas distintas y el sitio solo
    contesta una. El prototipo suma llamando a `computeYearGeneric()` club por club, con las tres
    salvedades a la vista (clubes sin ese ejercicio, indicadores que la fuente no informa,
    presupuestos mezclados con balances).

    **C. `Prototyping/prototipo-duelo.html`** (Versiones 154-155) — dos columnas, Equipo A contra
    Equipo B, con un toggle arriba ("quiero comparar dos" / "solo quiero ver uno"). Nace de una
    crítica de Guido al B: comparar obligaba a pasar por el selector dos veces, y eso generaba
    casuística que nadie quería contestar. Con las dos columnas a la vista, comparar deja de ser un
    estado en el que entrás y salís.
    CADA COLUMNA TIENE EL ÁRBOL ENTERO (Versión 155, pedido de Guido: la primera versión del C lo
    había cambiado por dos pestañas planas y una lista alfabética de 41 filas). Es el mismo árbol
    de `js/selector.js` — Deporte › Región › País › Liga › Equipo — servido de a UN nivel por vez,
    con breadcrumb clickeable arriba, porque media pantalla no da para 5 columnas y son dos
    árboles. El buscador queda por encima y sigue siendo transversal.
    Y SUMA ALGO QUE EL SITIO NO TIENE, igual que el B pero por otro camino: el lado puede ser un
    club, una liga, un PAÍS o una REGIÓN entera (⊕ en cada fila de conjunto), medidos por promedio
    por club o por todo sumado. Es el mismo agregado que el B llama "grupos", pero armado desde el
    árbol en vez de con una bandeja aparte: no deja armar un grupo a mano ("Boca + River + Racing"),
    solo conjuntos que ya existen en la taxonomía. Si se aprueba C, esa es la diferencia a decidir.
    Es el más nuevo y el menos probado.

    PENDIENTES DEL PROTOTIPO B, de la última sesión de pruebas de Guido, sin implementar porque
    pidió congelarlo y pasar al C: el promedio y la sumatoria deberían dejar ELEGIR qué años entran
    (hoy toman todos); el botón "Compararlo contra un grupo que arme yo" debería llamarse "otra
    cosa" y avisar que te lleva arriba a elegir; el paso 7 reaparece después de armar el rival y se
    lee como un loop; y el paso 6 debería ofrecer promedio/sumatoria para el que no quiere comparar
    sino ver ese dato. El prototipo C evita los dos del medio POR DISEÑO, no los resuelve.

    Lo que sigue describe al prototipo A, que es el que tiene más iteraciones encima:
    (a) El selector desplegado EN la página en vez de atrás de un click, y que SE QUEDA ahí
        después de elegir, encima de los datos del club: minimizarlo lo deja en una barra de
        53px. Las pestañas del header se ven desde la primera visita, apagadas hasta que haya
        club.
    (b) Un dropdown "Ver" por fila de club, que junta el ejercicio ("Balance 2024/2025", y cae
        derecho en la ficha de Finanzas de ese ejercicio) con las dos acciones: "El club entero"
        y "Ver y elegir otro", que deja el selector abierto y en modo comparar para sumar un
        segundo club o el promedio de una liga. Reemplaza al "+" de la fila de club.
    El prototipo corre con los 41 clubes y el motor reales, así que lo único que falta decidir es
    si convence.
    SI SE APRUEBA, la implementación real NO es copiar los archivos del prototipo:
    - El markup del panel se mueve adentro de `#coldHero` y la mudanza la hace `applyClubMode()`
      (que ya es la única función que decide portada vs. club), sin el `MutationObserver` que usa
      el prototipo para no tocar el sitio.
    - HECHO en la Versión 146, ya está en el sitio: `data/club-index.js` lista los ejercicios de
      cada club (`yrs`), así el dropdown no necesita bajar ningún `data/<club>-data.js`. El
      prototipo ya lee de ahí y su tabla propia se borró.
    - Los 3 cambios a `js/selector.js` están en `Prototyping/prototipo-inicio-selector.js`: diffealo contra
      `js/selector.js` y tenés el parche. Los textos nuevos (los de la portada y los 2 del
      select) pasan por `t()` con su clave en `data/lang/`, como pide `CONVENCIONES.md`.
    - Subir `ASSET_V` en los dos lugares (la constante y los tags).
    - Los textos que el prototipo tiene en castellano a mano necesitan su gemelo en
      `data/lang/en.js`. Dos ya existen y hay que CORREGIRLOS, no solo traducirlos: `hero.sub`
      todavía dice "and transfers" (mercado de pases, que no está cargado) y
      `selector.search.ph` tiene los ejemplos en minúscula ("boca", "laliga", "japan").
    MÓVIL NO SE TOCÓ TODAVÍA, por decisión de Guido (2026-09-14): primero se termina el selector
    en desktop y recién ahí se acomoda para teléfono. Las reglas de móvil que tiene hoy el
    prototipo son las heredadas del sitio, no un diseño pensado.
    Preguntas que el prototipo deja abiertas y conviene mirar en pantalla: si al elegir un club
    conviene que el selector quede ABIERTO (como está hoy, con la página bajando sola hasta los
    datos) o que se minimice solo; si el estado minimizado tiene que recordarse entre visitas; y
    si esconder los ejercicios adentro del dropdown "Ver" no los hace demasiado invisibles, ahora
    que el subtítulo de la fila ya no dice cuántos hay.

30. BORRAR LOS DATOS INVENTADOS cuando se decida el punto 28. `Prototyping/prototipo-pasos-datos-inventados.js`
    (Versión 152) rellena de mentira los ejercicios 2016-2025 de los 18 clubes de Argentina y
    Brasil, con ascensos y descensos inventados, para poder probar la interfaz. Existe con 5
    condiciones escritas en `CONVENCIONES.md`, y la última es que NUNCA se copia a `data/`: si
    mañana uno de esos clubes publica su balance de 2019, se carga leyendo el documento, no
    promoviendo este relleno. El día que el selector se apruebe (o se descarte), este archivo y su
    `<script>` en los generadores de `Prototyping/` se borran en el mismo movimiento. Mientras
    exista, cualquier captura de los prototipos 2 y 3 tiene números falsos: la franja roja de
    arriba lo dice, pero conviene no pegar esas capturas en ningún lado sin la franja.

31. BUG DEL SITIO PUBLICADO, encontrado el 2026-09-14 trabajando en el prototipo 3 y arreglado SOLO
    ahí. LOS 10 CLUBES JAPONESES MUESTRAN UN RESULTADO FALSO, no un dato faltante. La J.League
    publica el ingreso de cada club pero no su estructura de costos, así que los 10
    `data/<club>-data.js` tienen `expenseLines: []` y `officialTotalExpenses: null`. La ficha de
    Finanzas de Cerezo Osaka dice, en el cuerpo de letra más grande de la página, "Gastos 0,0 M
    USD" y "Resultado neto +38,1 M USD": ese club no ganó 38 millones, simplemente no sabemos qué
    gastó. La TABLA de abajo ya lo hace bien (muestra guiones), así que el criterio existe en el
    proyecto y son los KPIs de arriba los que no lo aplican.
    Mismo problema, y por la misma línea de código, en `js/comparar-clubes.js:339`
    (`expenses: Math.abs(usd(c.expenses + c.nonCash))`, sin el test de "la fuente no informa"), que
    es el gemelo del test `sinDeuda` que esa misma función ya hace tres líneas más abajo para la
    deuda. Comparar un club japonés contra cualquier otro publica los dos números falsos.
    El arreglo ya escrito y probado está en `Prototyping/prototipo-duelo-selector.js`, función
    `numerosDe()`: si no hay líneas de gasto, ni total oficial de gastos, ni `expenses`, ni
    `nonCash`, entonces gastos va en `null` y el resultado del ejercicio también (es el final de
    una cascada que arranca en los gastos). Llevarlo a `js/comparar-clubes.js` y a los KPIs de la
    ficha de Finanzas, subir `ASSET_V` en los dos lugares, y correr `auditAll()`.
    OJO CON `tools/audit.js`: hoy no lo detecta. Un ejercicio sin gastos cierra perfecto contra su
    propio total de ingresos, que es exactamente el tipo de error que `audit.js` existe para
    encontrar. Vale un chequeo nuevo ahí también.

29. BUG DEL SITIO PUBLICADO, encontrado por Guido el 2026-09-14 probando el prototipo, y arreglado
    SOLO en la copia del prototipo (`Prototyping/prototipo-inicio-selector.js`, patch (d) del generador). En
    `renderCols()` (js/selector.js:~290), la columna LIGA lista `Object.keys(LEAGUES)` filtrado
    solo por DEPORTE cuando no hay país elegido, así que al elegir una región siguen apareciendo
    las ligas de los otros continentes: elegís Europa › España, volvés a cambiar la región a Asia,
    y LaLiga sigue en la columna. La selección sí se limpia; la lista no se filtra. El arreglo es
    una línea (`regionOfCountry(lg.country) === sel.region`) y se puede llevar a `js/selector.js`
    independientemente de qué se decida con el punto 28.

25. BUG, encontrado el 2026-09-14 probando el punto 9. La ficha de Finanzas se contradice a sí
    misma en un ejercicio de presupuesto. Para Boca 2026/27 el KPI de arriba dice "Deuda neta ·
    0,0 M USD" en el cuerpo de letra más grande de la página, y unos centímetros más abajo el
    aviso dice "el documento no desglosa deuda ni caja en su resumen, el $0 que ves NO significa
    que la deuda sea cero". Un presupuesto no trae estado de situación patrimonial, así que ese
    cero no existe en ningún documento. Es el MISMO bug que la Versión 140 arregló en Inicio, en
    la otra pestaña: la TABLA de deuda (`renderDebtBlockGeneric`, js/finanzas-render.js:361) ya
    tiene la lógica de "0/0 oficial = dato no desglosado" y por eso escribe el aviso; el KPI
    (`renderFinanzasStatsGeneric`, misma línea 396) no la tiene y publica el 0,0 igual. Chequear
    también la rama de Boca (`renderFinanzasStatsFromComputed`), que es un camino aparte.
    El precedente exacto de cómo se resolvió en Inicio: `informaDeuda()` + el stat "Sin dato",
    js/finanzas-render.js:1012 y 1096.

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

27. i18n: `debtDisclosureNote()` (js/finanzas-calc.js:411) arma sus 3 mensajes como texto plano en
    castellano, sin pasar por `t()`, así que con el sitio en inglés el aviso de deuda sale en
    castellano. Son 3 líneas hermanas y hay que sumar sus keys a `data/lang/en.js`. Se barrió el
    resto de `js/` con dos patrones distintos (literales con acentos, y strings que van a
    textContent/innerHTML sin `t()`): es el único lugar que quedó, no hay más. OJO para el día que
    se agregue otro idioma: el scan de i18n de `tools/audit.js` mira atributos `data-i18n` y
    llamadas a `t()`, así que un template literal armado en JS no lo detecta — esto lo encontró
    una mirada a la pantalla, no la herramienta.

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
        `PROMPT-selector-jerarquico.md` —el mock y el prompt con los que se diseñó— los borró
        Guido, y la borrada se registró en la Versión 154: lo que decidieron ya está construido y
        vive en `js/selector.js`. Los prototipos vivos son otros, y están en `Prototyping/`.
    (f) `auditAll()` carga los clubes en SERIE (`for` con `await`): 114 ms con 41, pero ~30 s a 1000
        clubes con latencia real, y es lo que hay que correr antes de cada push de datos. Tandas
        paralelas con `Promise.all`.

8. Reemplazar el email placeholder del formulario de contacto
   (contacto@bocaennumeros.example) por uno real antes de publicar.

9. MOBILE: las tablas largas del presupuesto oficial de Boca en pantallas angostas.
   La otra mitad de este punto (el header, que abajo de 900px aplastaba el `nav` a 0px de
   ancho y hacía desaparecer las 4 pestañas) se resolvió en la Versión 137: el header
   envuelve y el nav se lleva su propia fila.
   OJO ANTES DE EMPEZAR (medido el 2026-09-14): esto YA NO SE REPRODUCE como está escrito. Con
   Boca 2026/27 a 375px y todos los acordeones del Presupuesto de Inversiones abiertos, NINGÚN
   elemento de `#finanzas` supera el ancho de la pantalla — el wrapper `.table-scroll` que se
   agregó después cubre estas tablas. El problema de móvil que sí se reproduce hoy es el header,
   y es el punto 26. Este punto se puede cerrar; quedó porque Guido todavía no lo miró.
