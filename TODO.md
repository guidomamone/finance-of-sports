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

> **HAY CONTEXTO EXTRA EN `info-adicional-todos-abiertos-borrar-luego.md`** (sesión 2026-09-20, a
> pedido de Guido). Ese archivo tiene, por punto, lo que una sesión futura va a necesitar y no está
> acá: la tabla de cuántos clubes tiene cargados cada liga-temporada (que desmentía la premisa del
> punto 33 — **ese punto ya se cerró en la Versión 184**, y la tabla quedó como el insumo con el que
> se armó `data/destacados.js`), qué campos tiene `clubs{}` para el tema de los
> escudos, dónde está la grilla de mezcla, y por qué el catch-all de Vélez es en realidad una
> pregunta sobre el techo del modelo. **Es temporal: Guido lo trabaja y lo borra**, y lo que
> sobreviva se muda al punto que corresponda o a un skill.


43. DOS HELPERS DEL MOTOR QUEDARON SIN CONSUMIDOR Y NO SE BORRARON, a propósito:
    `allYearsRangeForClub()` y `yearKindForClub()` (`js/finanzas-calc.js`). Los usaba el
    render de Inicio, que se borró en la Versión 184 con el to-do 33. No se fueron con él
    por dos motivos: son helpers GENÉRICOS del motor (el rango completo de ejercicios de un
    club, y de qué tipo es cada uno), no de esa pantalla; y `yearKindForClub()` es la única
    rama del código que distingue `placeholder` de `pending_official`, que `ESTADO.md`
    documenta como estados válidos aunque hoy no los use ningún club. Borrarlos es una
    decisión, no un efecto colateral. **Es de Guido**: si la respuesta es que no van a
    volver a hacer falta, son ~35 líneas menos.
    DE PASO, cuando se mire esto: `chart.nodata` y `selector.year.many` en `data/lang/en.js`
    no tienen ninguna referencia en el código y son ANTERIORES a esta sesión (las 13 que
    murieron con Inicio sí se borraron en la 184).

40. REVISAR LOS NOMBRES DE LAS PESTAÑAS DEL NAV, todas juntas. Pedido de Guido, 2026-09-22,
    al decidir que la pestaña nueva se llamara "Ligas" y que Finanzas quedara como Finanzas.
    Hoy el nav dice Inicio · Comparar · Ligas · Finanzas · Fuentes · Mi Cuenta, y el par
    Ligas/Finanzas no dice que uno es de ligas y el otro de clubes. En la charla salieron
    "Finanzas de liga" / "Finanzas de club", que se descartó por ahora porque renombrar toca
    el nav, `data/lang/en.js` y varios `data-i18n`. No es urgente: es una pasada de copy
    sobre las 6, no un arreglo de una.

44. OTRO TEXTO SIN TRADUCIR, MISMO PATRÓN QUE EL TO-DO 42 QUE SE CERRÓ EN ESTA SESIÓN
    (encontrado al verificar ese punto en el navegador, en inglés): `anioDropdownSuffix()`
    (`js/finanzas-calc.js`) arma el sufijo " (Presupuesto)" / " (Balance)" / " (Presupuesto
    y Balance)" / " (Placeholder)" del `<select>` de ejercicio de Finanzas, en castellano
    duro — no pasa por `ejercicioLabel()` (que ya traduce desde el to-do 42), es una función
    aparte con su propio texto. No se tocó en esa pasada porque no era uno de los 4 puntos
    que pidió Guido explícitamente.

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
        baja recién al apretar "Comparar". Es la misma tensión que resolvió el to-do 33
        (Versiones 182-184) precalculando `data/rankings/<liga>.js`: si el aporte de cada
        bloque hiciera falta, la salida probablemente sea la misma, no bajar los clubes.

    (e) **UN LADO PUEDE SUMAR UN PROMEDIO CON UNA SUMATORIA.** Se avisa en pantalla,
        no se prohíbe. Decisión explícita de Guido: "suma peras con manzanas pero no
        es mi tema, yo tengo que dar la funcionalidad".

    (f) **LOS DATOS SON FLACOS PARA LO QUE LA INTERFAZ YA PERMITE.** 34 de los 41
        clubes tienen UN solo ejercicio cargado, y de las 8 ligas con temporadas, 4
        tienen una sola. Comparar la liga argentina contra la brasilera hoy es 5
        clubes contra 1 (Mirassol). La interfaz lo dice —los chips muestran cuántos
        equipos tiene cada temporada, y el resultado muestra la fórmula y el conteo—
        pero el número sigue siendo pobre hasta que haya más balances cargados.

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
    (d) DEFLACTORES. El aviso de "ejercicios de años distintos" explica el problema (cada
        ejercicio se convierte a USD con el tipo de cambio de su propio documento, sin ajustar
        por inflación), pero no lo arregla. Arreglarlo de verdad es una serie de deflactores por
        moneda y año. Decisión de Guido si se abre.
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

22. MAPA DE ESCALA (Versión 128, ampliado en la 159 — ver `.claude/skills/escala-finance-of-sports/`
    para el mapa completo con su metodología, y `auditorias/2026-09-17-escala.md` para el reporte
    de esta corrida). (a), (b), (c), (e), (f), (g), (h) e (i) resueltos y (d) descartado, se borran
    de acá. **Con esto quedan cerrados los 8 puntos de `PLAN-REMEDIACION-ESCALA.md`.** Lo que sigue
    abierto de escala:

36. EVALUAR JEV (TypeSafe, modelo `jev-latest`, docs.typesafe.ai) PARA CATEGORIZAR RUBROS
    AUTOMÁTICAMENTE, cuando el proyecto llegue a **200 clubes cargados** (charlado con Guido el
    2026-09-21, sesión que descubrió esta API). Es el piso del rango de escala que ya usa
    `escala-finance-of-sports` (200-3000 clubes) — a ~5 ejercicios por club son ~1000 balances y,
    a un orden de 12 líneas de rubro por balance, unas 12.000 categorizaciones manuales.

    QUÉ ES: Jev es un modelo "System One" — no genera texto, evalúa un `state` (un texto) contra
    preguntas tipadas (`Choice`/`Score`/`Noul`) y devuelve una opción + probabilidades +
    confianza calibrada, todas las preguntas en paralelo, sin parsear nada. Encaja con
    `club-data-mapping` porque categorizar una línea de rubro YA ES una pregunta de `Choice`: el
    `state` es la línea (`rawLabel` + monto + nota del documento), el `criteria` son las mismas
    categorías que ya están en `REVENUE_CATEGORY_LABELS`/`EXPENSE_CATEGORY_LABELS`
    (`data/category-map.js`) — no hay que inventar taxonomía nueva.

    EL PLAN: las líneas que vuelven con confianza alta se cargan directo a
    `revenueLines`/`expenseLines`; las de confianza baja se anotan SOLAS en `dudas-por-club.md`
    en vez de perderse o quedar mal categorizadas sin que nadie lo note — que es justo lo que le
    pasó a Racing (ver ahí "Categorización interna inconsistente, Ejercicios 2009/2010/2012/2014":
    5 líneas de ingresos etiquetadas con una categoría de gasto, encontrado recién en una
    auditoría posterior).

    POR QUÉ NO AHORA: a 41 clubes, la mayoría con 1 solo ejercicio, categorizar a mano (leyendo el
    balance ya transcripto en una sesión de Claude) sigue siendo más rápido que integrar y
    VALIDAR una API nueva — el volumen no lo justifica todavía.

    ANTES DE INTEGRARLO EN SERIO (aunque ya se haya llegado a 200 clubes): correr un piloto contra
    balances YA cargados y verificados (Boca, River) y medir si la confianza que devuelve está
    bien calibrada en la práctica — no asumirlo de la documentación. Y esto no reemplaza el OCR:
    Jev necesita texto como `state`, así que el paso de `pdftoppm` + Tesseract (ver CLAUDE.md,
    "Cada PDF nuevo") sigue haciendo falta igual.

39. EVALUAR REEMPLAZAR EL CÍRCULO DE INICIALES CON COLOR DE MARCA (`brandColor`, Versiones
    178-180) por lo que hace soccerassociation con la identidad de cada club. Pedido de Guido,
    2026-09-22, al terminar el trabajo de color por club (to-dos 23(e)/37).
    ANTES DE DEFINIR ALCANCE: pedirle a Guido que muestre o linkee qué hace exactamente esa
    página — no asumirlo de memoria ni de nombre. Si termina siendo un escudo como imagen (no
    un color), esto vuelve a cruzarse con la pregunta de derechos y hosting que ya quedó
    anotada en el punto 23(e) original: el repo se deploya entero, así que una imagen se
    serviría desde el dominio propio, que es justo lo que un club puede objetar.
