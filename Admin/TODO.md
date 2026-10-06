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
- **Los pendientes de sourcing de un país no van acá**: viven en `fuentes/<País>/_notas-generales.md` (decisión de Guido, 2026-09-14, reafirmada el 2026-10-04). La lista de lo sacado el 2026-09-14 está en `Admin/Archive/todo-sacados-2026-09-14.md`.

---

## Qué hay que hacer

145. CAJA-DEUDA: CIFRA CHICA DEL AÑO EN UNA TABLA SIN COLUMNA DE NOTAS (conocido, sin daño hoy: ningún dato cargado distinto por esto en
    `caja-deuda.mjs --medir`). Lo que dejó el to-do 143 (Versión 513): sin una columna de notas inequívoca, el primer entero de 1-2 dígitos
    se sigue descartando como nota, y a veces es el importe del año. Casos: Novorizontino 2016 "| Caixa e Equivalentes de Caixa | 7 | 16 |"
    (balanco-2016.md L14, lee 16 = 2015), Midtjylland 2014 "| Likvide beholdninger | 90 | 2.170 |" (aarsrapport-2014-06-30.md L1306),
    La Equidad 2021 "Caja Dolares | 19 | 318", y Criciúma 2023 "| Empréstimos e Financiamentos | 13 - | 140.909 |" (nota y guion en la misma
    celda, relatorio-de-balanco-2023.md L193). Idea a medir, como escalón aparte: si la compuerta no cierra con la lectura de hoy, probar la
    otra lectura (sin descartar) con la MISMA compuerta. Guido, 2026-10-05: anotarlo, no hacerlo ahora.

139. DEFECTO D DEL PIPELINE, CONOCIDO Y SIN DAÑO HOY (diagnosticado el 2026-10-05; no perseguir sin un caso nuevo).
    `compararVecino` (verificar.mjs, chequeo 4b) relee los ingresos de los dos documentos SIN los ajustes `fila`. De los 160 chequeos de año
    vecino de las 88 verificaciones hay 7 "NO" (4 pares), y uno solo es este defecto: Juventus 2005 (229,914 en 2004-05 contra 259,083 en la
    columna anterior de 2005-06; la diferencia, 29,169, es el ajuste "a) Capital gains on disposals" 29.168.740 de 2004-05). Los otros son
    reales: Juventus 2006 (reexpresión IFRS, 2006-07 .md L1708), Juventus 2010 (reclasificación por la venta centralizada de la TV, 2010-11
    .md L1694) y UC 2009 (documento sin estado de resultados extraído, no cargado). Ningún dato cargado distinto y la cola está vacía.
    Lo que NO sirve (medido, `Admin/HALLAZGOS-pipeline.md`): tomar del lado del año en curso el total con el que el documento cerró; arregla
    2005 y rompe 2003 y 2004. Un arreglo de verdad tiene que aplicar los ajustes `fila` de cada documento también a SU columna del año
    anterior (por la fila que nombra `reemplaza`), y no hay forma de hacerlo con los desgloses que agregan filas sin `reemplaza`.

140. ESCALONES Y CHEQUEOS QUE LE FALTAN AL PROCESO DEL PIPELINE (no urgentes; venían del HANDOFF, Versión 470; las etapas están en
    `Admin/PIPELINE.md`). Cada uno, de a uno: diseño con su escalera, ok de Guido, y medir con los lotes de prueba.
    (b) Etapa 2, escalón 2: Gemini sobre escaneos enteros (hoy, si no hay estado, queda como fuente). SIN CASO HOY (medido el 2026-10-05:
        0 documentos en "sin estado de resultados" en el registro); no construir hasta que un escaneo quede como fuente.

147. FINANZAS MULTI-AÑO (pedido de Guido, 2026-10-05). Rediseño de la pestaña: ver cada rubro a lo largo de los años del club, lado a
    lado. Mockup aprobado: `Prototyping/Finanzas/mockup-147.html` (las notas rojas explican cada decisión). Se trabaja en el worktree
    `finanzas-147`. Hechos: paso 1 (el título es el club, Versión 531), paso 2 (otra liga como card, Versión 532) paso 3 (FIN_SEL, Versión 533) paso 4 (cards de ejercicios con `?multi=1`, Versión 534) y paso 5a (tabla con una columna por año, Versión 535).
    DECISIONES DE GUIDO (2026-10-05):
    - Un card por ejercicio, cada uno se prende y se apaga solo (sin rangos, sin checkbox). Default: los últimos 5 años CON BALANCE.
      Atajos: Últimos 5, Todos (tocarlo de nuevo saca todos → estado vacío) y Solo el último. Con más de 5 ejercicios la fila arranca
      corta (últimos 5 balances + lo elegido) y "+N más" va al principio de la misma fila. Orden: más viejo a la izquierda.
    - Años sin publicar en el medio: rayados, no elegibles, dicen "Sin publicar" (5ta palabra autorizada para los cards; el dropdown
      viejo sigue con sus 4).
    - Presupuesto y balance del mismo año: manda el balance; "Presupuesto al lado del balance" (apagado por default) abre presupuesto,
      balance y desvío (en el resultado neto, diferencia en plata, no %). Presupuesto = punto hueco y tramo punteado en todos los
      gráficos; si el último elegido es solo presupuesto, los KPIs van punteados y la deuda en "—".
    - Gestión: fila de botones (más vieja primero; con más de 4, "+N más" a la izquierda), acumulables: tocar suma sus años, tocar de
      nuevo los saca. Franjas por gestión en el gráfico y columnas agrupadas por presidente en la tabla. Solo gestiones confirmadas.
      Para empresas: el dueño solo si es una persona con nombre; SAF y sociedades anónimas sin botón. Un año con dos presidentes es
      de quien firmó el balance.
    - "Otra liga": usa el último balance elegido, nunca un presupuesto. El puesto ("9.º de 20") adentro del card es un paso aparte.
    - Al cambiar de club, la selección vuelve a los últimos 5 del club nuevo. Sparklines en SVG; Chart.js solo para el gráfico que se
      abre al tocar un rubro. El aviso "Viendo N ejercicios" solo aparece con 0 elegidos.
    - Valores ajustados por inflación (absorbe el 23(d)): deflactor del PBI de la moneda que se muestra (EE.UU./BEA para USD, zona
      euro/Eurostat para EUR), año base = el último ejercicio cerrado, por año de cierre (2024/25 usa 2025), los presupuestos
      posteriores al base no se ajustan. Serie en un archivo nuevo de data/ (deflactores, a crear en el paso 11), se actualiza una vez por año. Default: nominales.
    PASOS QUE FALTAN (cada uno con el ok de Guido; del 4 al 9 detrás de `?multi=1` hasta que estén todos):
    3. Estado de la selección: una lista de años + "el año que manda", reemplazando las ~10 lecturas directas de `anioSelect.value`.
    4. Cards de ejercicios + atajos + "+N más" + estado vacío (necesita 3).
    5. Estado de resultados con una columna por año, Δ, sparkline, rubro desplegable, % del total como switch, presupuesto al lado.
       En formato del club, filas = unión de etiquetas de los años, "—" donde falta. colspans y colgroup dinámicos.
    6. KPIs con Δ y sparkline (siguen saliendo de los totales de la tabla).
    7. Gráficos arriba de la tabla, siguen a la selección; la torta pasa a barras apiladas; sale la sección "Gráficos".
    8. Deuda con columnas por año.   9. Fuentes y banner de calidad por ejercicio elegido.
    10. Mi Cuenta: búsquedas guardadas con `years:[]`, leyendo las viejas con `year`.
    11. Valores ajustados por inflación (archivo nuevo de deflactores en data/).
    12. Gestión: G1 formato nuevo (`data/gestiones/<país>.js`: nombre, corto, cargo, desde, hasta, fuente, confirmada; los años se
        derivan de las fechas), G2 migrar Boca, Racing y los ~40 clubes con nombres reales (el relleno "Gestión actual" no se migra),
        G3 botón de gestión, G5 chequeos en audit.js. Después, G4 `tools/gestiones.mjs` (propone el firmante de cada balance desde su
        transcripción, a la cola solo si cambia o falta; `cargar.mjs` deja de escribir `gestionId`) y G6 retirar `gestionesByClub`.
    13. El puesto adentro del card "otra liga".   14. Cierre: en.js, celular, audit, docs (PANTALLA, ESTADO), borrar este punto.

148. EL CHEQUEO DE TIPO DE CAMBIO (`checkFxSanity()`, index.html) DA 6 FALSOS POSITIVOS DE AÑOS VIEJOS (visto el 2026-10-05 con
    `auditAll()`). UC 2010-2013 (CLP 468-525 por dólar, rango "plausible" desde 600) y Juventus 2008 y 2011 (EUR 0,634 y 0,692, rango desde
    0,70): los valores son los reales de esos años (el euro llegó a 1,58 dólares en 2008). Los rangos no contemplan la historia; ajustarlos
    por moneda (o por moneda y década) para que el chequeo vuelva a 0 avisos sin silenciar uno real.

109. ORDENAR LAS CARPETAS DEL PROYECTO (pedido de Guido, 2026-09-30: "hay muchos files dando vueltas que ya no tienen razón de ser"). No hay apuro, pero cada lote
    de pipeline suma archivos. Lo que ya se ve como desorden, para que la sesión que lo encare no arranque de cero:
    - Los archivos generados ya salieron de `Clubes/` (Versión 317, `Generados/`, `tools/rutas.mjs`).
    - **`Admin/`**: las listas de pilotos viejas ya están en `Admin/Archive/pilotos/` (2026-09-30). Quedan los informes de
      tests (`test-*.md`, `test-*.jsonl`) que conviene juntar en una carpeta, y documentos internos viejos que hay que archivar siguiendo la regla de `CLAUDE.md`
      (`Admin/Archive/`, sacándole antes lo que todavía sirve a `CONVENCIONES.md`/skills/`TODO.md`).
    - **Raíz y otras carpetas** (`Prototyping/`, `auditorias/`, archivos sueltos): revisar cuáles siguen vivos. Recordá que lo suelto en la raíz se PUBLICA (`netlify.toml`).
    - **Cuidado**: los registros (`Admin/transcripciones-*.jsonl`, `Admin/*/resultados.jsonl`) y muchas tools guardan RUTAS de archivos; mover algo obliga a actualizarlas. Proponer un script
      `tools/inventario-archivos.mjs` que liste por tipo, peso y antigüedad qué hay, y mostrarle el plan a Guido antes de mover nada. **Nunca borrar: archivar.** Cada movimiento
      lo aprueba Guido, y después correr `node tools/audit.js` (0 P0/P1).

101. CONFLICTOS DE CATEGORIZACIÓN REALES, ENCONTRADOS PROBANDO `tools/suggest-category-precedent.mjs`
    CONTRA LOS 162 CLUBES (2026-09-28, ver el ex to-do 98 en `Admin/Archive/todos-cerrados-onboarding-manual.md`). Mismo rubro, mismo lado (ingreso o gasto),
    categoría DISTINTA entre ejercicios del MISMO club — no es un bug de la tool (ya separa
    ingreso/gasto), es una inconsistencia real que quedó en los datos ya cargados. Revisar cada uno
    contra el documento fuente y unificar (o dejar documentado por qué el cambio de categoría entre
    años es correcto, si lo es):
    - **Más casos, del backtest de `tools/categorizar-claude.mjs` (2026-09-30, `Admin/tests/test-categorizar-claude.md`)**: los errores de
      Claude con confianza >= 0,80 son casi todos incoherencias de producción, no del modelo: "Seguros" fuera de `admin_general_expense` contra lo que dice el skill; cargas sociales
      de juveniles de Boca en `wages_squad` contra la regla del skill; "Interese perdidos" de Almagro como línea (los intereses van a
      `netInterest`); River "Educación" (gasto) fuera de `education_expense`; gastos de transferencias partidos 40 `other_expenses` / 31
      `player_amortisation`. Mientras sigan, parte del "error" medido de la categorización automática es la vara.

    **Además, un FALSO positivo de la propia tool, no un conflicto real**: Mallorca marcó
    "Otros gastos de gestión corriente" (2025) en conflicto, pero son 2 rubros DISTINTOS del
    documento ("Otros gastos de gestión corriente" y "Otros (gastos de gestión corriente)") que
    `normalize()` colapsa al mismo texto por sacar los paréntesis — la categorización de Mallorca en
    sí está bien, es la tool la que los confunde. Si se repite este patrón, evaluar si `normalize()`
    necesita distinguir texto entre paréntesis en vez de descartarlo.

23. NUEVO (Versión 137, lo que dejó abierto el selector jerárquico + la comparación). ACTIVO,
    prioridad de Guido (2026-09-29: "me interesa, mantenelo abierto, no pausado"):
    (d) DEFLACTORES. El aviso de "ejercicios de años distintos" explica el problema (cada
        ejercicio se convierte a USD con el tipo de cambio de su propio documento, sin ajustar
        por inflación), pero no lo arregla. Arreglarlo de verdad es una serie de deflactores por
        moneda y año. Decisión de Guido si se abre.
        PROPUESTA (2026-10-04, Guido la retoma más adelante: es un punto grande): convertir a USD con el tipo de cambio de cada
        cierre ya absorbe la inflación local; lo que queda es la inflación del dólar (~35% entre 2015 y 2025). Una sola serie
        oficial, el IPC de EE.UU. (CPI-U, BLS), para todos los clubes, y un selector "USD nominales / USD de <último año>".
        Y en Finanzas, que se pueda comparar el club contra sí mismo fácilmente (pedido de Guido): sus años lado a lado, en
        USD constantes. DECIDIDO 2026-10-05: se hace dentro del to-do 147 (paso 11), con el deflactor del PBI y no el IPC.
    TECHO DEL MODELO, no tarea: la taxonomía es de fútbol (`player_sales`, `wages_squad`,
    `youth_football`) y las pestañas Pases/Resultados/Títulos y `gestionesByClub` también. Un club de
    otro deporte entra hoy con media taxonomía vacía y 3 pestañas sin sentido.

96. EL CTA DE FINANZAS CON 2+ CLUBES ELEGIDOS SIGUE GENERANDO CONFUSIÓN, AUNQUE YA TIENE UNA
    ACLARACIÓN (reportado por Guido, 2026-09-28: *"el selector me deja seleccionar dos equipos o más
    pero al final dice 'ver los números de X'... es confuso, no queda claro si va a terminar viendo
    todos los clubes seleccionados o solo el que dice el botón"*). CHEQUEADO EN VIVO antes de anotar
    esto: `js/selector.js` línea ~1386 (Versión 106, 2026-09-16, commit `7450c93`) YA tiene, con 2+
    clubes y camino "Finanzas": un texto arriba del botón ("Finanzas muestra un club por vez, así que
    vas a ver el primero. Para verlos juntos está Comparar") Y el botón nombra el club exacto ("Ver
    los números de Almagro", no un "X" genérico) — confirmado en local, debería verse igual en
    producción. O sea, la ambigüedad LITERAL ya no existe tal cual — pero Guido la sintió de todos
    modos usando el sitio real, así que la aclaración no está funcionando en la práctica. Hipótesis a
    evaluar, sin asumir cuál es: (a) jerarquía visual invertida — el texto aclaratorio es chico/gris,
    el botón es grande/azul, y se lee el botón primero; (b) 2 botones de peso similar (uno primario
    para 1 club, uno secundario para "llevar los N a Comparar") no resuelve la pregunta real, que es
    ANTES de llegar a esta pantalla. ANTES DE TOCAR CÓDIGO: preguntarle a Guido en qué pantalla/
    dispositivo vio la confusión (para descartar mobile o una versión vieja en caché, ver CLAUDE.md
    gotchas de caché) y qué jerarquía visual preferiría.

130. OTROS DEPORTES Y CLUBES POLIDEPORTIVOS: ¿ENTRAN AL SITIO, Y CON QUÉ ESQUEMA? (Sudamérica y México). Minas Tênis Clube/Náutico,
    Paulistano, Praia Clube y Pinheiros publican un balance que consolida todos los deportes (cuotas,
    escuelas, Lei de Incentivo): no encaja con las categorías de fútbol. Colombia sumó béisbol (Caimanes,
    Toros) y básquet (Titanes) con balance propio de sociedad anónima. Decidir antes de transcribir.
    También el béisbol de México (ex to-dos 50 y 144): **`DIABLOS` en la BMV — explicado, 2026-09-29, decisión sigue pendiente de Guido**: Diablos Rojos del México es un equipo de BÉISBOL (Liga Mexicana de Béisbol, no fútbol) que cotiza en la Bolsa Mexicana de Valores desde diciembre 2024 y reporta trimestralmente — mismo patrón "Ollamani" (disclosure vía mercado de valores en vez de FOI) que ya rindió para otros casos. Por qué quedó pausado: abre LIGA nueva (LMB) Y DEPORTE nuevo (béisbol, no fútbol) — un cambio de alcance real, no una fuente más del mismo tipo de club. Dato para la decisión: el sitio YA tiene contenido de otro deporte en `Clubes/` sin cargar al sitio todavía (Green Bay Packers/NFL, Atlanta Braves/MLB, MSG Sports/NBA-NHL — piloto de prueba de Firecrawl, to-do 75, no una decisión de producto de sumar otros deportes). Si en algún momento se decide onboardear alguno de esos, DIABLOS encajaría en el mismo movimiento de alcance; si no, se puede seguir ignorando sin costo (no hay ninguna transcripción ni sourcing hecho todavía de DIABLOS). Sin acción hasta que Guido decida.
        (Aclaración 2026-10-04: desde el 2026-10-03 Diablos Rojos SÍ está sourceado, 4 ejercicios FY2022-FY2025: ver
        `fuentes/México/Diablos Rojos del México.md`. Lo que sigue pendiente es la decisión de abrir béisbol.)

82. EVALUAR SI EL FUNNEL DE SOURCING DEBERÍA TENER ARISTAS ESPECÍFICAS POR PAÍS, en vez de una
    escalera única para todos (pedido de Guido, 2026-09-27, generalizando la distinción que motivó
    separar los to-dos 80 y 81: Reddit rinde en países angloparlantes y no en LatAm, mismo patrón
    ya visible en la escalera de `.claude/skills/club-sourcing/SKILL.md` 0.1, donde la familia 2
    —regulador— ya varía radicalmente por país (CMF en Chile, SIIS en Colombia, IGJ bloqueada en
    Argentina, nada documentado en Perú). La pregunta a resolver: ¿conviene formalizar un mapa
    explícito país → ángulos-que-rinden (qué redes sociales, qué tipo de sitio de hinchas, qué
    idioma de búsqueda) en vez de que cada sesión lo redescubra sola? Es una pregunta de arquitectura
    del skill, no una herramienta puntual — pensarla junto con Guido antes de tocar
    `club-sourcing/SKILL.md` (mismo criterio ya establecido: no editar el skill sin avisar).

51. PROCESO DE EMAIL A CLUBES — EN CONSTRUCCIÓN, ETAPA 1 (rediseñado 2026-09-24, decisión de Guido
    tras comparar alternativas: Gmail/MCP, APIs transaccionales, no-code, agentes dedicados). El
    diseño original de este punto ("Claude redacta, Guido aprueba en el chat, envío por Gmail")
    quedaba pegado para siempre a confirmar cada mail uno por uno — es una regla de la plataforma de
    chat, no de Gmail, y ningún scope de conector la evita. La salida es sacar el paso de ENVÍO
    (nada más) afuera de cualquier sesión de chat: Resend + subdominio propio + una cola de
    archivos que Guido revisa, con el envío disparado por Guido desde su propia terminal. Proceso
    completo documentado en `.claude/skills/club-outreach/SKILL.md` (skill nuevo). Arranca directo
    en la Etapa 1 de ese diseño (sin regla de disparo automática todavía, Guido sigue decidiendo
    cuándo escribir) — la Etapa 0 (statu quo manual) se salteó a pedido de Guido.

    **Infraestructura, estado real:** (a) ✅ cuenta en Resend creada 2026-09-24 (conectada con
    GitHub, sigue en free por ahora); (b) ✅ subdominio `outreach.financeofsports.com` verificado
    2026-09-24 (DNS en Netlify DNS — DKIM, SPF vía 2 CNAME, DMARC `p=none` en `_dmarc.outreach`, no
    en la raíz); (c) `Receiving` activado (MX agregado, propagación confirmada por `dig` desde 3
    resolvers distintos) — el dashboard de Resend tardó en reflejarlo como verificado pero la
    infraestructura ya estaba bien; (d) ✅ API key generada y en `Admin/outreach/.env`
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

