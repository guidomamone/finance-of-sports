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
  están en `Admin/dudas-por-club.md` y en el archivo de fuentes de cada club.
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
  haría falta para reabrirlo están en las notas del punto 3 de `Admin/Archive/PLAN-REMEDIACION-ESCALA.md`. La
  mitad que SÍ rendía de ese punto (`club-leagues.js`) se hizo en la Versión 164.
- **El corte free/paid y el paywall** (eran 5 y 6). Decisión de Guido del 2026-09-14: **por ahora
  el sitio va todo gratis**. No hay corte que definir ni cuentas/suscripciones que construir, así
  que no son pendientes. El día que se revise, la arquitectura ya charlada está en
  `Admin/finance-of-sports-project.md` (sitio estático + capa mínima de backend: Supabase para auth y estado
  de suscripción, Netlify Functions para el webhook de pagos; no migrar a Next.js).

---

## Qué hay que hacer

47. EXPLICARLE AL VISITANTE POR QUÉ MÉXICO NO MUESTRA CASI NADA (pedido de Guido, 2026-09-22:
    *"estoy seguro de que muchos usuarios van a querer ver méxico en detalle y hay que explicar
    por qué no se muestra nada"*). **No es una tarea de sourcing: el sourcing ya está hecho y dio
    lo que podía dar.** Los 18 clubes de Liga MX están trackeados uno por uno y el país quedó
    documentado como RESUELTO, no como pendiente — el detalle club por club está en
    `fuentes/_indice/México.md` y en cada `fuentes/México/<Club>.md`.

    LA RAZÓN DE FONDO, que es lo que hay que poder decir en pantalla: el Reglamento de Control
    Económico de la Liga MX **exige** estados financieros dictaminados (art. 26) y en el mismo
    texto **los declara confidenciales** (art. 12), vía el sistema SICE. O sea que los balances
    existen, están auditados, y la liga decide no publicarlos. No es que el proyecto no los
    encontró: es que nadie fuera de la liga puede verlos. Se suma que en México no hay registro
    mercantil útil (el RPC inscribe actos, no balances; los estados financieros van al SAT y son
    reservados) y que en el listado completo de emisoras de la BMV hay un solo club de fútbol.

    LO QUE SÍ SE PUDO, y conviene mostrar como excepción y no como regla: Club América vía el
    segmento "Fútbol" de Ollamani S.A.B. (cotiza en la BMV), Atlas vía el desglose de operación
    discontinua IFRS 5 en el Reporte Anual 2019 de TV Azteca, y Atlético San Luis vía la nota de
    empresas del grupo de las cuentas anuales del Atlético de Madrid. Los dos últimos son cifras
    parciales, no balances completos.

    LA TAREA, entonces, es de PRODUCTO: dónde y cómo se le dice esto al visitante que entra
    buscando su club. Un club trackeado-sin-documento hoy simplemente no existe en el sitio, así
    que el que busca Chivas no encuentra ni el club ni el motivo. Hay que decidir si eso se
    resuelve con una vista de liga que liste los clubes sin datos con su razón, con una ficha
    mínima por club, o con una nota de cobertura por país. **Es la primera vez que el proyecto
    necesita mostrar una AUSENCIA explicada, y no va a ser la última**: el mismo problema vuelve
    con cualquier liga cuyo regulador exige y no publica. Conviene resolverlo genérico.

    OJO CON UN EFECTO LATERAL: hoy el sitio es "los clubes que tienen datos". Si se listan clubes
    sin datos, hay que cuidar que no parezcan cargados ni que ensucien rankings, comparaciones o
    el selector.


59. REVISAR ATLANTA, ALL BOYS Y OTROS DEAD-ENDS DEL BARRIDO POR SI CONVIENE UN RECLAMO DIRECTO AL
    CLUB (no es sourcing nuevo, es decidir si vale la pena escribirle a alguien — se beneficia del
    to-do 51, proceso de email a clubes). Casos concretos que salieron del barrido del 2026-09-22:
    Atlanta tenía 4 balances reales (2013-2016) en Drive, hoy con el compartir revocado — pedirle al
    club que los vuelva a compartir es gratis y rápido. Banfield tiene el 105° Ejercicio (2024-25)
    aprobado pero solo publicado en video de YouTube, nunca como PDF. Independiente tiene el
    Ejercicio N°121 (2024-25) aprobado en asamblea el 26/11/2025 (prensa reportó sus cifras) pero sin
    PDF propio publicado en ningún canal — solo existe como columna comparativa reexpresada dentro
    del documento del N°122 (2025-26, ya cargado, Versión 209), que Guido decidió no usar como fuente
    del 121 (ver `Admin/dudas-por-club.md`). Ver el detalle completo en `fuentes/Argentina/Atlanta.md`,
    `fuentes/Argentina/Banfield.md` y `fuentes/Argentina/Independiente.md`.

57. REORDENAR LOS 6 SKILLS: DEJARON DE SER SKILL, SON CHANGELOG (pedido de Guido, 2026-09-23).
    `club-sourcing` (1415 líneas, tras el to-do 52), `club-data-mapping` (1049) y
    `club-or-year-onboarding` (885) mezclan criterio vigente con anécdotas versionadas ("Versión X,
    sesión tal fecha..."). Separar: lo que sigue siendo criterio activo se queda en el skill, lo que ya
    es historia (una decisión tomada una vez, un bug ya resuelto que no repite patrón) se resume fuerte
    o se manda a `Admin/CHANGELOG.md`/`Admin/Archive/`. El to-do 52 (sección 0.1-0.3 de
    `club-sourcing`, metodología de ángulos y escalada) YA ESTÁ HECHO y no hace falta reabrirlo — este
    to-do reordena las 29 secciones de país existentes, no la sección 0. Candidato a partirse en 2-3
    sesiones, una por skill grande, para no volarse el contexto de arranque de una sola.

51. PROCESO DE EMAIL A CLUBES (pedido de Guido, 2026-09-23). Hoy `Admin/dudas-por-club.md` junta
    preguntas abiertas por club pero no hay ningún paso de "convertir esto en un mail". Diseñar: (1)
    criterio de cuándo una duda amerita mail (no todas — algunas se resuelven solas con más sourcing);
    (2) Claude redacta el borrador; (3) Guido hace QA sobre el borrador antes de que salga; (4) envío —
    NO puede ser desatendido, cada envío necesita confirmación explícita de Guido en el momento (regla
    de la plataforma, no negociable, no es algo que se pueda aprobar de antemano para todo un lote).
    **El criterio de CUÁNDO disparar un mail por sourcing difícil ya está definido** (to-do 52,
    `club-sourcing/SKILL.md` sección 0.3): documento CONFIRMADO que existe pero no descargable (prensa
    con cifras, video en vez de PDF, compartir revocado — ver Independiente/Banfield/Atlanta) sí
    amerita mail; un dead-end sin ninguna señal de que el documento exista, o un bloqueo regulatorio
    estructural, no. Esta sesión diseña el PROCESO del envío en sí (redacción, QA, confirmación), no el
    criterio de disparo, que ya está resuelto.

56. EVALUAR PARTIR EL EJE "DATOS" DE LA AUDITORÍA POR PAÍS (pedido de Guido, 2026-09-23). El eje
    `datos` de `auditoria-finance-of-sports` (uno de los 5 que rotan, ver skill sección "Capa 3") lee
    club por club buscando lo que un total correcto no delata — crece linealmente con la cantidad de
    clubes cargados (hoy 61, el to-do 36 ya proyecta 200-3000). Evaluar si partirlo por país (una
    corrida por país en vez de una corrida de todo el proyecto) evita que una auditoría se vuelva
    demasiado larga para terminar en una sesión. No urgente a 61 clubes; conviene resolverlo antes de
    que sí lo sea, no cuando ya esté rota.

50. LEADS DE SOURCING YA IDENTIFICADOS Y SIN EXPLOTAR, DE COLOMBIA Y MÉXICO (de la Versión 202).
    Todos tienen el camino escrito, solo falta ejecutarlos:
    - **Ejercicios disponibles en SIIS que quedaron sin bajar por throttling** (Colombia): Boyacá
      Chicó 2021-2025 es el de mayor margen, más Once Caldas 2021-2024 y Bucaramanga 2021. El
      límite real es 1-2 procesos en paralelo, más que eso devuelve HTML sin PDF en silencio.
    - **León y Pachuca (México) dieron HTTP 403** a `curl`, que es bloqueo de WAF y NO dead-end
      confirmado. Vale reintentarlos desde el Browser pane.
    - **Pumas y Tigres (México)**: solicitud por la Plataforma Nacional de Transparencia a la UNAM
      y a la UANL por lo que le transfieren al club. El INAI ya obligó a la UNAM una vez
      (resolución de enero 2022), así que el precedente existe.
    - **León se está vendiendo** (80% forzado por la regla anti-multipropiedad): si el comprador es
      un vehículo cotizante, se abre la ventana Ollamani. Rechequear cuando cierre la operación.
    - **`DIABLOS` en la BMV**: Diablos Rojos del México (béisbol) cotiza desde diciembre 2024 y
      reporta trimestralmente. Es el segundo caso mexicano del patrón Ollamani y el canal ya está
      probado, pero **abre liga y deporte nuevos**: es decisión de Guido, no se hace solo.
    EN PAUSA (decisión de Guido, 2026-09-23): no es prioridad ahora, retomar más adelante sin fecha
    fija.

34. LO QUE DEJÓ ABIERTO EL MERGE DEL SELECTOR (Versiones 143-155, terminado el
    2026-09-17). Ninguno es un bug: son decisiones que se tomaron a propósito y que
    conviene revisar cuando haya más datos o más uso.

    (a) **MÓVIL, más allá de que entre.** Los dos cards apilan y el modal funciona a
        375px —verificado, sin desborde horizontal— pero nadie diseñó la experiencia
        en un teléfono. Decisión de Guido durante el prototipado: primero desktop.
        La to-do 26 (el `.header-right` a 375px) ya se resolvió (Versión 188).

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
    TECHO DEL MODELO, no tarea: la taxonomía es de fútbol (`player_sales`, `wages_squad`,
    `youth_football`) y las pestañas Pases/Resultados/Títulos y `gestionesByClub` también. Un club de
    otro deporte entra hoy con media taxonomía vacía y 3 pestañas sin sentido.

40. UN CMS PARA QUE GUIDO CAMBIE COSAS SIN CÓDIGO (pregunta suya en la sesión del 2026-09-22, al
    pedir que la fusión de abonos dentro de "Estadio" se pudiera revertir sin un lío: *"¿se podría
    hacer un backend así sin necesidad de código yo pueda hacer cambios?"*).
    LO QUE YA ESTÁ HECHO, y puede alcanzar: la decisión concreta que motivó la pregunta quedó en
    una constante con nombre (`ABONOS_DENTRO_DE_ESTADIO`, `js/finanzas-calc.js`), con el comentario
    de qué correr después. Revertirla es cambiar una palabra.
    LO QUE FALTARÍA, si la pregunta era más amplia: un CMS tipo Decap/Netlify CMS apuntado a un
    archivo de configuración del repo — le da a Guido una pantalla web con formularios que
    commitea sola, sin dejar de ser un sitio estático. Es una sesión de trabajo propia más resolver
    la autenticación.
    LO QUE NO: un backend con base de datos. Contradice la arquitectura (estática, sin build),
    cuesta plata, y haría que cada visitante pida la config antes de ver una tabla.
    ANTES DE ARRANCAR: preguntarle a Guido QUÉ querría editar desde ahí. Si es solo el orden y el
    nombre de las filas, el archivo de configuración solo ya alcanza y el CMS es de más.
    EN PAUSA (decisión de Guido, 2026-09-22): no retomar antes de ~un mes (fines de octubre 2026).

43. "DERECHOS DE FORMACIÓN / MECANISMO DE SOLIDARIDAD" ESTÁ CATEGORIZADO DISTINTO SEGÚN EL CLUB,
    sin que haya una decisión de diseño detrás — es una inconsistencia pura (hallazgo lateral del
    relevamiento de la Versión 189, `auditorias/2026-09-22-catchall-no-futbol.md` sección 4-i).
    Mismo concepto económico, dos destinos: visible en `player_sales` ("Venta de Jugadores") para
    Argentinos, Boca, Envigado, Independiente, Once Caldas, Rosario Central y San Lorenzo; invisible
    en el catch-all (`youth_football`/`other_income`) para Botafogo, Cruzeiro, Estudiantes, Grêmio,
    Racing, Unión y Vélez (7,0% de sus ingresos en 2016). Unificarlo a `player_sales` en los 7 del
    segundo grupo le baja el catch-all a Vélez y a los otros 6 sin tocar ningún total. No es
    urgente y no depende de ninguna otra decisión.

22. MAPA DE ESCALA (Versión 128, ampliado en la 159 — ver `.claude/skills/escala-finance-of-sports/`
    para el mapa completo con su metodología, y `auditorias/2026-09-17-escala.md` para el reporte
    de esta corrida). (a), (b), (c), (e), (f), (g), (h) e (i) resueltos y (d) descartado, se borran
    de acá. **Con esto quedan cerrados los 8 puntos de `Admin/Archive/PLAN-REMEDIACION-ESCALA.md`.** Lo que sigue
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
    `revenueLines`/`expenseLines`; las de confianza baja se anotan SOLAS en `Admin/dudas-por-club.md`
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
    178-180) por una ilustración de camiseta por club, como hace soccerassociation (mostrado por
    Guido: para Vélez blanca con V celeste/azul, para Boca azul con franja amarilla — planas, sin
    sponsor ni escudo). Pedido de Guido, 2026-09-22, al terminar el trabajo de color por club
    (to-dos 23(e)/37).
    RESEARCH YA HECHO, no repetirlo: `auditorias/2026-09-22-camiseta-vs-circulo-selector.md`. En
    síntesis — el argumento a favor es real (27 de 39 clubes compiten por dos familias de color
    hoy, el patrón los distinguiría donde el color solo no alcanza), pero quedan 2 cosas para
    Guido antes de tocar código: (a) confirmar que un generador PARAMÉTRICO (nunca réplica manual
    club por club, que ya fue el error que se corrigió una vez con los escudos) es el camino; (b)
    la pregunta de derechos — una ilustración plana sin sponsor ni escudo probablemente pesa
    distinto que una imagen oficial, pero el research no la puede cerrar solo. Si avanza, la
    recomendación es un PILOTO ACOTADO sobre esos ~27 clubes de los clusters de color repetido
    (no barrer los 41 de una), para probar legibilidad real a 24px antes de comprometerse.
    EN PAUSA (decisión de Guido, 2026-09-22): no retomar antes de ~un mes (fines de octubre 2026).
