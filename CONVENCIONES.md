# Convenciones y gotchas vigentes

Reglas permanentes y trampas ya encontradas que una sesión nueva TIENE que
respetar. Antes vivían sueltas dentro del bloque "ESTADO ACTUAL" del comentario
de `index.html`, mezcladas con el historial de versiones: se movieron acá en la
Versión 114 porque son criterios VIGENTES, no historia: el historial se lee una
vez y se olvida, esto hay que tenerlo a mano cada vez que se toca el sitio.

Cada bullet conserva la versión en la que se decidió, para poder rastrear el
porqué completo en `CHANGELOG.md` (resumen) o `finance-of-sports-project.md` (narrativa).
Las que dicen "pedido explícito de Guido" no son negociables sin preguntarle.

Si una decisión nueva contradice algo de acá, actualizá ESTE archivo en la misma
sesión: si no, la próxima sesión va a seguir la regla vieja sin enterarse.

---

- DÓNDE PUEDE VIVIR UN DATO INVENTADO, Y DÓNDE NO (Versión 152, actualizada en la 155 cuando el
  único que existía se borró). El proyecto existe porque sus números son verificables, así que un
  archivo de datos de mentira es lo más peligroso que se le puede agregar. **Hoy no hay ninguno.**
  Si vuelve a hacer falta uno para prototipar —el caso real fue Guido pidiendo "el tener datos
  incompletos me limita la creatividad", con la condición que él mismo puso: "documentar bien lo que
  estamos tocando para no arrastrar balances inventados"— se permite UNO, con estas 6 condiciones, y
  el día que se rompa cualquiera hay que borrarlo:
  (1) NO vive en `data/`, y lleva "inventados" en el nombre;
  (2) lo carga SOLO la página que lo necesita, que no está linkeada desde ningún lado, nunca
      `index.html`;
  (3) ninguna herramienta lo ve: `tools/audit.js` y `auditAll()` leen `data/*.js`, así que no puede
      ensuciar una verificación;
  (4) cada ejercicio inventado se declara solo — `inventado:true` en su meta, una entrada en
      `sources{}` con `type:'placeholder'`, cada rubro terminado en "(inventado)" y la marca
      "· INVENTADO" al lado del año en todos lados;
  (5) NO se copia a `data/` jamás: el día que ese club publique su balance real se carga leyendo el
      documento, no promoviendo el relleno;
  (6) **NO QUEDA EN EL REPO MÁS ALLÁ DE LA SESIÓN QUE LO NECESITA** (condición nueva, Versión 155,
      y la que faltaba). El repo SE DEPLOYA ENTERO: no hay `netlify.toml` ni `_redirects`, Netlify
      publica la raíz, así que cualquier archivo trackeado es alcanzable por URL en
      `financeofsports.com`. El relleno de los prototipos estuvo servido públicamente tres días sin
      que nadie se diera cuenta. Tenía su franja roja y nadie estaba linkeado a él, pero un sitio
      cuyo argumento entero es que sus números son verificables no puede servir números falsos desde
      su dominio. Vale para cualquier cosa que se deje en el repo "por las dudas".
- QUÉ SE TRADUCE Y QUÉ NO (Versión 138, cierra la decisión que el to-do 19(c) dejaba abierta).
  Se traduce el CHROME y toda etiqueta NUESTRA: nav, títulos, controles, headers de tabla, los
  buckets de "Formato simplificado", el tipo y el nivel de cada fuente, y la procedencia de cada
  tipo de cambio. NO se traduce nada que salga TEXTUAL de un documento o que sea un nombre propio:
  los rubros de "Formato del club" (`rawLabel`), el título de cada balance, los nombres de club y de
  liga, y los nombres de gestión de `gestionesByClub` (son apellidos de presidentes). El criterio es
  uno solo y ya estaba en la cabecera de `js/i18n.js`: traducir un rubro del balance de un club
  argentino sería inventar un dato que el documento no dice. Vale igual para `fuentes.html`, que
  desde esta versión se traduce sola con el mismo motor y el mismo diccionario que el sitio, en vez
  de generarse un archivo por idioma.
- NO EXISTE NINGUNA ARISTA CLUB -> LIGA SIN AÑO (Versión 137, decisión de arquitectura que salió
  de un pushback de Guido: "si el usuario quiere ver cuánto generaba una liga en 2025 y 2024, 2023,
  2022, tiene que tener en cuenta que los clubes fueron cambiando"). `data/leagues.js` es el
  CATÁLOGO de ligas (nombre, país, deporte, escalón) y no tiene una sola línea de membresía. La
  membresía es (club, ejercicio) -> liga y vive solo en `data/club-leagues.js`. Todo agregado de
  liga (promedio, mediana, ranking, "cuánto generaba la liga en 2022") pasa por
  `clubsOfLeagueYear(liga, ejercicio)`: si una función nueva necesita "los clubes de la liga L" sin
  año, está mal planteada. Para NAVEGAR sí existe `clubsOfLeague(L)` sin año, y su conteo significa
  "clubes con al menos un ejercicio cargado acá", que NO es "los clubes de la liga" y el sitio no
  puede afirmar lo segundo. Por lo mismo `LEAGUES[].totalClubs` está en null: ese número también
  cambia por temporada. Un campo `clubs[id].league` con "la liga de hoy" está prohibido: sería una
  segunda verdad sobre el mismo hecho. En el árbol del selector, un club aparece bajo cada liga en
  la que tiene un ejercicio cargado.
- "SIN DATO" NO ES CERO (Versión 137 para la comparación, ampliado en la 152 a la ficha de
  Finanzas). Un cero se lee como un dato, y este sitio no muestra datos que no tiene. Se muestra
  "sin dato" y no "0,0 M USD" cuando la fuente no informa: deuda (los dos campos en null, o los dos
  en CERO EXACTO, que es como lo escriben los presupuestos), masa salarial que el documento no
  desglosa, un club sin padrón de socios publicado, y GASTOS — los 10 clubes japoneses tienen
  `expenseLines: []` y `officialTotalExpenses: null` porque la J.League publica el ingreso de cada
  club y no su estructura de costos. El resultado del ejercicio cae con los gastos: es el final de
  una cascada que arranca ahí.
  LO QUE COSTÓ ENTENDER (to-do 31, abierto desde la Versión 137 y cerrado en la 152): esto no es un
  criterio de UNA vista. Mientras lo aplicó solo la comparación, la ficha de Finanzas de Cerezo
  Osaka decía "Gastos 0,0 M USD" y "Resultado neto +38,1 M USD" en el cuerpo de letra más grande de
  la página — ese club no ganó 38 millones, simplemente no sabemos qué gastó. Y arreglar solo los
  KPIs dejaba la tabla de abajo diciendo "Total Gastos 0,0" en la misma pantalla: media pantalla
  honesta es peor que ninguna, porque el visitante no sabe a cuál creerle. **Si aparece una vista
  nueva que muestre estos indicadores, aplica igual.**
  OJO, esto es un criterio de la VISTA: el dato sigue diciendo 0 en el archivo del club. El criterio
  general sigue abierto en la to-do 20(h).
  Y LA LECCIÓN DE MECANISMO (Versión 167, tercera vez que aparece el mismo bug: la 140 en Inicio, la
  152 en Gastos/Resultado, la 167 en Deuda neta): **el test de "la fuente no informa esto" va en UNA
  función compartida, no escrito adentro de cada función de render.** Las tres veces la causa fue la
  misma — una vista tenía el test y la de al lado no, así que la misma pantalla se contradecía sola:
  el KPI publicaba "Deuda neta · 0,0 M USD" y tres centímetros abajo el aviso decía que ese cero no
  significa nada. Hoy hay dos helpers y hay que usarlos: `informaDeuda(clubId, year)` para Inicio
  (trabaja sobre `fiscalYearMeta`) y `deudaNoDesglosada(c)` para Finanzas (trabaja sobre el objeto
  ya computado), los dos en `js/finanzas-render.js`. Una vista nueva que muestre deuda llama a uno
  de esos dos; si necesita un test que todavía no existe, se escribe como función aparte y la usan
  todas, nunca en línea.
- INGRESO EXTRAORDINARIO: SE QUEDA EN `exceptional_items` (decisión de Guido, 2026-09-20, to-do
  20(d) cerrado). Las 5 líneas de ingreso extraordinario de Racing (2009, 2010, 2012, 2014:
  desafectaciones de previsiones y condonaciones) usan `exceptional_items`, que es una categoría de
  la taxonomía de GASTOS. Se evaluó la alternativa —crear una categoría de ingreso extraordinario
  con fila propia en Formato simplificado, que eran 4 ediciones chicas y no movía ningún número— y
  Guido decidió dejarlo como está.
  LO QUE HAY QUE SABER ANTES DE "ARREGLARLO": la consecuencia está aceptada, no pasada por alto. En
  Formato simplificado esas líneas caen bajo "Otras secciones deportivas y otros ingresos"; el total
  del ejercicio cierra igual (el motor suma por monto, no por bucket) y Formato del club las muestra
  con su `rawLabel` textual, que dice "(extraordinario)". Los 5 hallazgos están silenciados en
  `tools/audit-ignore.json` con este motivo escrito. **No recategorizar sin volver a preguntarle.**
- UNA PREMISA VENCIDA EN LA TO-DO SE ESCRIBE AL CERRAR EL PUNTO (auditoría del eje `tokens`,
  2026-09-20). Cuando una tarea se resuelve y el motivo por el que estaba trabada resultó FALSO, no
  alcanza con borrar el punto: hay que dejar escrito que la premisa estaba vencida, en la entrada de
  `CHANGELOG.md` y, si el punto sigue vivo en parte, en el propio `TODO.md`.
  POR QUÉ, con los casos que lo motivaron: la to-do 21(a) daba 5 tipos de cambio por irrecuperables
  con dos motivos y los dos estaban vencidos (los PDFs de San Lorenzo "nunca se transcribieron" —
  lo están desde el 2026-09-17; la transcripción de Vélez "no preservó la columna de cambio
  vigente" — su Anexo VI la tiene). Se resolvieron leyendo archivos que ya estaban en disco. La
  to-do 25 mandaba a revisar `renderFinanzasStatsFromComputed`, borrada en la Versión 102.
  Una premisa vencida no hace perder la tarea: **la hace parecer más cara de lo que es, y por eso
  queda al fondo de la lista para siempre.** Escribirlo es la única señal de que los OTROS puntos
  de la lista también pueden estar en la misma situación — fue así como, después del primer caso,
  se encontró el segundo.
- "LA FUENTE REPORTA CERO" NO ES "LA FUENTE NO LO DESGLOSA" (to-do 20(h), Versión 172, decisión de
  Guido). Es la misma familia que "SIN DATO NO ES CERO" de más arriba, pero un nivel más abajo: no
  en los KPIs, sino en cada fila de Formato simplificado.
  LA REGLA, implementada en `bucketize()` (`js/finanzas-calc.js`): **si una sección tiene un bolsón
  "sin desglosar por la fuente" (`lump_football_operations`/`_expense`) CON PLATA ADENTRO, cualquier
  otra fila que dé cero se muestra "—", no $0.** Esa plata puede estar adentro del bolsón, así que
  el cero es un "no sabemos". Un club que SÍ desglosa todo y no vendió jugadores sigue mostrando
  "Venta de Jugadores $0", porque ahí el cero es real: sin bolsón no hay ambigüedad. El catch-all
  queda afuera de la marca a propósito — que dé cero significa que todas las líneas encontraron su
  fila, que es información buena.
  EL CASO QUE LO MOTIVÓ: Gamba Osaka mostraba "Televisión $0" con 5.074 de sus 8.817 M JPY en el
  bolsón, porque el informe de la J.League publica 3 líneas por club y el desglose existe solo a
  nivel división. Un periodista que comparaba Gamba con Real Madrid leía que un club de primera
  japonesa no cobra derechos de televisación.
  NO MUEVE NINGÚN NÚMERO: las filas marcadas valen 0, los totales son idénticos.
- NADA DE `alert()` EN UN CAMINO DE ERROR (Versión 137, bug real que costó una hora de sesión). Un
  `alert()` nativo congela el hilo entero: timers, `onload` de los `<script>` que inyecta
  `loadClubData()`, y cualquier intento de leer el estado desde la consola para diagnosticar. Desde
  que el club elegido se guarda en `localStorage` y se carga solo al abrir el sitio, un club que
  falle con un alert deja la página congelada EN CADA VISITA, sin poder siquiera elegir otro. Los
  errores se cuentan por `console.error` y se muestran en un aviso dentro de la página.
- UNA PÁGINA FUERA DE LA RAÍZ TIENE QUE DECLARAR `window.I18N_BASE` (Versión 162, bug real de esta
  sesión). `I18N.load()` arma el src del diccionario como `data/lang/<code>.js`, y eso es relativo al
  DOCUMENTO, no a `js/i18n.js`. Las primeras páginas del proyecto que no viven en la raíz son las de
  fuentes por club (`fuentes/<clubId>.html`): pedían `fuentes/data/lang/en.js`, se comían un 404 y se
  quedaban en castellano aunque el visitante tuviera el sitio en inglés. Peor todavía, el `onerror`
  de `I18N.load()` degrada a castellano a propósito, así que no se veía rota, se veía en el idioma
  equivocado. Ahora el src lleva `window.I18N_BASE` adelante ('' en la raíz, '../' en `fuentes/`).
  Los `<script src>` estáticos NO alcanzan: esos ya llevaban su `../` y cargaban bien, el que fallaba
  era el inyectado en runtime. Mismo tipo de trampa que `loadClubData()`.
- TODO ARCHIVO DE `js/` QUE LLAME A `t()` VA EN LA LISTA DE `tools/audit.js` (Versión 137). El
  chequeo `i18n-incompleto` recorre una lista fija de archivos; cuando nació `js/selector.js` no
  estaba, así que sus claves nuevas eran invisibles y el chequeo pasaba en verde mientras el
  visitante de habla inglesa leía castellano. Y al revés (Versión 155): cuando un archivo de esa
  lista SE BORRA, hay que sacarlo, o el chequeo entero revienta con ENOENT y deja de correr.
  AMPLIADO (Versión 162): la regla no es solo para `js/`, es para TODO archivo que emita claves de
  i18n, incluido el que GENERA HTML. `tools/generate-fuentes-page.js` escribe `data-i18n` en
  `fuentes.html` y en las 41 páginas por club, y no estaba en ningún escaneo: una clave nueva de esas
  páginas era invisible para el chequeo. Ya está en la lista.
  COROLARIO (Versión 155): las claves que quedan huérfanas al borrar una feature se borran de
  `data/lang/en.js` en el mismo movimiento — el merge del selector dejó 88. El audit no las detecta:
  cuenta las que FALTAN, no las que sobran.
- LA LIGA DE UN EJERCICIO ES LA DEL CIERRE (Versión 132, decidido por Guido). Cuando un ejercicio
  cruza dos torneos (los argentinos cierran el 30/6 y la temporada va de febrero a diciembre), en
  `data/club-leagues.js` se anota la división en la que estaba el club EL DÍA QUE CERRÓ EL BALANCE.
  Es la misma regla que el proyecto ya usa para atribuir la gestión presidencial, y por eso se
  eligió: una regla menos que explicar y que recordar. Ojo con lo que NO dice: no afirma que todos
  los ingresos del ejercicio se hayan generado en esa categoría, y cuando el club ascendió o
  descendió en el medio, la mitad de la plata viene de la otra. Si alguna vez eso importa para una
  comparación, se agrega el matiz en el aviso, no cambiando el criterio.
- EL `clubId` DE UN CLUB NUEVO LLEVA EL PAÍS AL FINAL (Versión 129, decidido antes del selector
  jerárquico). `racingsantander-es`, `nacional-uy`, `independiente-co`. Por qué: el `clubId` no es
  una clave más, nombra el archivo de datos (`data/<clubId>-data.js`, por convención de
  `loadClubData()`) y prefija cada `sourceId` (`racing-balance-2009`), así que una colisión se paga
  en tres lugares. Los nombres se repiten entre países mucho más de lo que parece: Racing
  (Argentina y Santander), Independiente (Argentina, del Valle, Medellín), Unión (Argentina,
  Española, Magdalena), Nacional (Uruguay, Paraguay, Colombia, Ecuador). Ya pasa en `fuentes/`, con
  un Olimpia de Honduras y otro de Paraguay, y ahí no choca solo porque el país es una carpeta.
  OJO CON LA SINTAXIS: un id con guion NO es una clave JS válida sin comillas, así que en
  `data/clubs.js` va `'racing-es': { id:'racing-es', ... }`, con la clave entre comillas. Se
  descubrió rompiendo el archivo al probar el chequeo.
  LOS 41 CLUBES DE ANTES NO SE MIGRAN AHORA, a propósito: renombrarlos toca sus archivos, sus
  sourceIds y el club guardado en el localStorage de cada visitante, y no arregla ninguna colisión
  real porque todavía no hay ninguna. `node tools/audit.js` avisa (`clubid-heredado-ambiguo`, P2)
  exactamente el día que un id heredado deja de ser inequívoco, o sea cuando entra un club de otro
  país con el mismo nombre base: ESE es el momento de renombrar el viejo, no antes.
- `note` ES INTERNA Y NO SE RENDERIZA NUNCA; LO QUE VE EL VISITANTE ES `publicNote` (Versión 127,
  después de que Guido revisara la primera versión de la pestaña Fuentes: "veo que en Salvedades a
  veces pones 'descargado por Guido' o direcciones que son de mi computadora. Eso no puede
  aparecerle al usuario"). `sources[].note` es la nota que una sesión le deja a la siguiente: dónde
  quedó la transcripción, cómo se leyó el PDF, qué falta. Las 91 entradas la tienen y 64 mencionan
  el nombre de Guido o rutas del repo. `sources[].publicNote` es la que se muestra: una o dos
  oraciones escritas para un lector, y SOLO donde hay una salvedad que no se puede deducir de los
  datos (hoy 17 de 91). Todo lo demás sale derivado por `sourceCaveats()` (`data/sources-view.js`)
  de los campos que ya existen: que el tipo de cambio sea de referencia, que el documento no publique
  el resultado del ejercicio, que no informe deuda ni caja. Un club nuevo trae esas salvedades bien
  sin que nadie escriba una línea. Lo vigila `node tools/audit.js`: `nota-publica-con-interno` (P1)
  si un `publicNote` menciona un nombre propio, una ruta o un detalle de transcripción, y
  `note-interna-renderizada` (P1) si alguien vuelve a interpolar `.note` dentro de HTML.
- PROCEDENCIA DEL TIPO DE CAMBIO: TODO `fx` DECLARA DE DÓNDE SALIÓ (Versión 125, a pedido de Guido:
  "si yo mañana quiero auditar los tipos de cambio usado para cada club para cada año y entender si
  salieron de internet o del club, ¿puedo hacerlo sin drama?", la respuesta era que no). Cada
  ejercicio lleva `fxSource` con uno de los 6 valores de `FX_SOURCE` (`data/currency-map.js`), o
  `fxRef` apuntando a `FX_CLOSE`. **La regla de cuál de las dos formas usar**: si el tipo de cambio
  lo declara el propio documento, el número va LITERAL en el archivo del club (`fx:909,
  fxSource:'document_close'`), porque es un dato de ESE club y dos clubes pueden declarar valores
  distintos para el mismo día; si el documento no declara nada y se usó una cotización pública, NO
  se escribe el número en el archivo del club, se referencia la entrada de `FX_CLOSE`
  (`fxRef:'EUR@2025-06-30'`), porque es un dato del mercado y antes se copiaba club por club (33
  copias de 9 valores). `document_assumption` (la premisa de un presupuesto) es una categoría
  aparte de `document_close` a propósito: un presupuesto declara un pronóstico que puede terminar
  equivocado, no un cierre ya ocurrido. Detalle completo y tabla de los 6 valores en
  `.claude/skills/club-data-mapping/SKILL.md` sección 5. Lo chequea `node tools/audit.js`: un `fx`
  sin procedencia sale listado, y una cotización de mercado que contradiga a la tabla para la misma
  fecha también.
- ASSET_V SE SUBE EN DOS LUGARES, NO EN UNO (Versión 125, bug real de esta sesión): `window.ASSET_V`
  es una constante inline, pero los `?v=` de los `<script src>` estáticos del final del `<body>` son
  LITERALES, no salen de ella (solo los 2 cargadores dinámicos, `loadClubData()` e `I18N.load()`,
  la leen de verdad). Subir la constante y olvidarse de los tags deja al navegador sirviendo los
  `js/data` viejos de su caché con el HTML nuevo: pasó al migrar los `fx`, llegó un
  `currency-map.js` cacheado sin `fxMetaFor()` mientras `finanzas-calc.js` ya lo llamaba, y la
  página entera tiró `ReferenceError`. Las notas del proyecto y `CLAUDE.md` decían que los
  tags llevaban la constante, que no era cierto. Ahora lo chequea `node tools/audit.js`
  (`asset-v-desfasado`, P1): compara la constante contra cada tag.
- SEGUNDO EJERCICIO NUEVO DE SAN LORENZO + REGLA DE PRESUPUESTOS EN CAJA (Versión 97, Guido: "quiero
  onboardear todos los pdf que tengamos"): 2 decisiones de arquitectura documentadas y 1 ejercicio
  nuevo cargado. (1) Instituto: el Presupuesto 2025 (año calendario, ya transcripto) NO se carga —
  regla nueva: un presupuesto calendario se reconstruye a temporada combinando 2 documentos
  calendario consecutivos, y con uno solo no hay forma de completar ninguna temporada, así que se
  mantiene la info transcripta sin subir nada incompleto (ver `.claude/skills/
  club-or-year-onboarding/SKILL.md` sección 15). (2) San Lorenzo: Presupuesto 2023/2024 cargado como
  3er ejercicio del club (antes solo 2013/2014) — la transcripción `.md` original salió mal
  alineada por un artefacto de `pdftotext -layout` (números de filas anchas cayendo en líneas
  separadas), así que se re-leyó directo de imágenes renderizadas de la página (300dpi, 3 crops) en
  vez de confiar en el texto extraído. El documento separa una sección "Ordinaria" de una
  "Extraordinaria" (financiamiento/capital) — regla nueva: solo se carga la Ordinaria (ver
  `club-data-mapping/SKILL.md` secciones 16-17), "Resultado Ordinario" es el PAT del ejercicio.
  Categorización verificada con Guido antes de cargar (ping-pong de preguntas concretas, no
  asumido). Gestión dividida casi a la mitad entre Tinelli y Moretti — se usó Moretti (a cargo al
  cierre), duda anotada. `verifyTieOuts()` da 243/243 checks, 0 errores, en los 11 clubes. Detalle completo en `finance-of-sports-project.md`.
- 2 BUGS REALES CORREGIDOS + REGLA NUEVA DE ORDEN DEL DROPDOWN (Versión 96): (1) Boca (club default)
  aparecía con TODOS los gráficos de Finanzas vacíos en la primera carga de la página, y solo se
  arreglaba solo después de cambiar de club y volver — causa: `pasesDataForClub`/
  `resultadosDataForClub`/`titulosDataForClub` (más abajo en el `<script>`) referencian
  `CLUB_GENERIC_DATA` SIN el prefijo `window.`, y ese objeto global solo se crea DENTRO de cada
  `data/<club>-data.js` lazy-loaded (Versión 95) — en la carga inicial, antes del primer cambio de
  club, ningún data-file de club genérico corrió todavía, así que el identificador bare
  `CLUB_GENERIC_DATA` no estaba declarado en ningún lado y tiraba `ReferenceError` (a diferencia de
  `window.CLUB_GENERIC_DATA`, que da `undefined` sin explotar) — eso frenaba en seco TODO el resto
  del bloque INIT synchronous. Fix: `window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};` al
  principio mismo del `<script>` principal, antes de que corra nada más. (2) REGLA NUEVA a pedido de
  Guido: el dropdown de clubes del header (`#clubSelect`) iba SIEMPRE en orden alfabético
  ASCENDENTE (A→Z) por nombre visible. OBSOLETA DESDE LA VERSIÓN 137: ese dropdown ya no
  existe, lo reemplazó el selector jerárquico (`js/selector.js`). El orden alfabético sigue
  vigente pero DENTRO de cada liga o país, que es el nivel donde comparar dos nombres significa
  algo; la lista completa de 41 clubes en una sola tira alfabética era justamente lo que dejó
  de servir. Lo que sigue es el registro del bug original — se reordenaron las 11 `<option>`, con Boca marcado
  `selected` explícito (no es la primera opción alfabética — esa es Argentinos Juniors—, pero
  sigue siendo el club default de la app). `verifyTieOuts()` sigue dando 240/240 checks, 0 errores,
  en los 11 clubes. Detalle completo en `finance-of-sports-project.md`.
- REGLA (Versión 50, Guido: "(presupuestado)" pegado al año se superponía con el header "% DEL
  TOTAL" de al lado, difícil de leer): `ejercicioLabel(year, isPresupuesto)` cambió de firma, antes
  el 2do parámetro era un `suffix` de texto libre agregado AL FINAL ("Ejercicio 2026/2027
  (presupuestado)"), ahora es un booleano que cambia el PREFIJO ("Presupuesto 2026/2027" en vez de
  "Ejercicio 2026/2027 (presupuestado)"), más corto. Esto es SOLO para el header de la tabla
  "Estado de resultados" (`finanzasPLTableCurLabel`/`finanzasDebtTableCurLabel`) y el stat "Último
  resultado" de Inicio, que usan `cur.yearLabel`. El dropdown "Año" (dato distinto, arrays propios
  en `populateFinanzasSelectors`, tanto para Boca como para River/Racing) sigue mostrando el
  estilo largo "Ejercicio AAAA/AAAA (presupuestado)" a propósito, no tiene el problema de espacio
  de la tabla y así el dropdown se ve igual en los 3 clubes.
- REGLA PERMANENTE (Versión 49, pedido explícito de Guido): "Estadio" y "Abonos" en Formato
  Simplificado son 2 conceptos DISTINTOS de venta de acceso al estadio, no un mismo concepto
  repartido en 2 filas. "Estadio: recaudación de partidos" = entradas que el club vende PARTIDO POR
  PARTIDO (Boca: `r.exhibicionEspectaculos`; River/Racing: categoría `matchday_competition`).
  "Abonos" (ahora sin la palabra "Entradas" adelante, la tenía antes y generaba la confusión de que
  había entradas repartidas entre las 2 filas) = abonos/season tickets pagados por adelantado para
  TODA la temporada (Boca: `r.abonos`; River/Racing: categoría `season_tickets`). Renombrado en
  `simplifiedReportForBoca()` y `GENERIC_SIMPLIFIED_REVENUE_BUCKETS` (mismo valor, solo cambió el
  label). Detalle completo en `.claude/skills/club-data-mapping/SKILL.md` sección 13 y en
  `finance-of-sports-project.md`.
- REGLA REFORZADA (Versión 48, Guido: "urnifica, tienen que ser exactamente iguales los nombres"):
  no alcanza con nombres PARECIDOS entre Boca y el motor genérico, tienen que ser IDÉNTICOS
  carácter por carácter. Bug real encontrado y corregido: Boca usa el label `'Televisión'` (fila
  del Ejercicio 2027), el motor genérico tenía `'Televisión / Derechos de TV'` para la misma
  categoría (`broadcasting`), corregido a `'Televisión'` exacto. Antes de dar por buena una
  homologación de labels, comparar carácter por carácter contra `simplifiedReportForBoca()`, no de
  memoria/aproximado.
- REGLA PERMANENTE (Versión 47, extiende la regla de la Versión 46, pedido explícito de Guido: "la
  tabla tiene que quedar exactamente igual ordenada tambien. el orden importa"): el ORDEN de
  `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS` (River/Racing) tiene que calzar con el
  orden real de `simplifiedReportForBoca()`, no solo los nombres. Orden de Ingresos: Cuotas
  Sociales, Comercial/Sponsors, Estadio, Televisión, Premios, Abonos, Venta de Jugadores,
  catch-all (label "Abonos" a secas desde la Versión 49, ver bullet más abajo, antes decía
  "Entradas / Abonos"). También: cualquier bucket que NO tenga equivalente en Boca (hoy: "Fútbol profesional
  (sin desglosar por la fuente)", solo existe para Racing/River porque a veces el dato no
  desglosa más) lleva `hideIfZero:true` en su definición, no se pinta la fila si ese club/año no
  tiene ninguna línea ahí adentro (Guido lo pidió viendo esa fila en $0 para Racing). Un bucket
  NORMAL en $0 (ej. Venta de Jugadores cuando no hubo ventas) se sigue mostrando igual que en Boca,
  la regla `hideIfZero` es solo para categorías-excepción sin equivalente Boca. Ver
  `.claude/skills/club-data-mapping/SKILL.md` sección 13 y `finance-of-sports-project.md`.
- REGLA PERMANENTE (Versión 46, pedido explícito de Guido): "Formato simplificado" de CUALQUIER
  club tiene que usar el mismo set de categorías y la misma lógica que ya usa Boca
  (`simplifiedReportForBoca()`), no un set separado diseñado para el motor genérico. Si el dato
  fuente de un club no permite categorizar así, consultar a Guido antes de decidir cómo resolverlo,
  nunca improvisar. Detalle completo en `.claude/skills/club-data-mapping/SKILL.md` sección 13 y en
  `finance-of-sports-project.md`. Esta sesión encontró 3 discrepancias reales, se las presentó a Guido con
  `AskUserQuestion` antes de tocar nada, y ya están resueltas: Racing separó "Estadio: recaudación
  de partidos" de un bucket nuevo "Premios por competencias" (el dato fuente ya los distinguía);
  River se dejó como estaba (su dato no permite separarlo hoy); Gastos se dejó con la
  categorización que ya tenía, solo renombrada para que coincida con el vocabulario de Boca (Compra
  de jugadores / Salarios y primas / Inversiones / Otros gastos).
- REGLA (Versión 44, mismo pedido que la Versión 43 pero para "Gestión"): el
  `<select id="gestionSelect">` también tiene ancho fijo por CSS
  (`#gestionSelect{width:200px;max-width:100%;}`, justo después de `#anioSelect{...}`), mismo
  criterio y mismo motivo que el de "Año" (ver bullet de la Versión 43 más abajo). 200px alcanza
  para la gestión más larga de los 3 clubes ("Riquelme (2023-actual)", Boca, ~188px medido en el
  navegador).
- REGLA (Versión 43, bug real de UX reportado por Guido): el `<select id="anioSelect">` ("Año" de
  Finanzas) tiene ancho fijo por CSS (`#anioSelect{width:300px;max-width:100%;}`, justo después de
  la regla genérica `select{...}`). Antes no tenía ancho propio, así que un `<select>` nativo se
  achica o agranda según el texto de la OPCIÓN seleccionada (no la más larga de la lista), y el
  box cambiaba de tamaño cada vez que cambiabas de club o de ejercicio dentro del mismo club, un
  detalle molesto que Guido notó. 300px alcanza para la etiqueta más larga de los 3 clubes
  ("Ejercicio 2025/2026 (esperando datos)", Boca, ~282.5px medido en el navegador con el ancho
  incluida la flecha nativa). REGLA PARA EL FUTURO: si se agrega un club/año con una etiqueta más
  larga que esa, medir de nuevo en el navegador (`selectEl.getBoundingClientRect().width` con esa
  opción seleccionada) antes de asumir que 300px sigue alcanzando, no agrandar el número a ojo.
- REGLA DE ESTILO (Versión 42, pedida por Guido: "los odio a los em dashes"): no usar el carácter
  em dash (—, U+2014) en ningún texto nuevo de este archivo, ni en comentarios ni en copy visible
  para el usuario. Usar punto y arrancar oración nueva, coma, dos puntos o paréntesis según
  corresponda. La ÚNICA excepción es el carácter "—" usado como símbolo de "sin dato"/"no aplica"
  en celdas de tabla (`fmtPctDisplay`/`fmtPctOfTotal`/varios `td` de
  `buildNativeSectionHtml`/`renderNativePLTable`/etc.): ese uso no es puntuación de una oración, es
  un símbolo de tabla, y se mantiene igual que siempre. Toda la prosa del archivo (este comentario
  incluido) y
  los 2 skills de `.claude/skills/` se limpiaron de em dashes en esta sesión.
- REGLA VIGENTE (Versión 42, reemplaza la regla de las Versiones 34-35/41, ver bullet más abajo):
  los cards "Supuestos", "Presupuesto Financiero", "Presupuesto de Inversiones" e "Ingresos y
  Egresos por Torneo" ahora se ESCONDEN por completo cuando el club/ejercicio seleccionado no tiene
  presupuesto cargado, en vez de mostrar un mensaje de "no hay". Pedido explícito de Guido al ver
  los 4 cards vacíos para Boca 2024/2025 (que tiene balance, no presupuesto). La función
  `noDataMsg()` se borró (ya no la llama nadie). Detalle completo en
  `.claude/skills/club-or-year-onboarding/SKILL.md` sección 6.
- REGLA PARA EL FUTURO (Versión 40, pedido explícito de Guido: "es mi manera de hacerte un
  control"): toda fila de "Formato simplificado" tiene que llevar `items` con el desglose real de
  qué campo(s) nativo(s) se sumaron para llegar a ese número, nunca `items:null`. Implementado para
  Boca en la Versión 40 y para River/Racing en la Versión 42 (ver bullet más arriba), así que hoy
  ya cubre a los 3 clubes.
- REGLA (Versión 39, bug real de layout + una regresión propia corregida en la misma sesión):
  `#finanzasPLTable` (card "Estado de resultados") tiene `table-layout:fixed` + un `<colgroup>` de 6
  `<col>`. Rubro es la única sin ancho fijo (se lleva el resto), las 5 numéricas tienen ancho fijo en
  píxeles. Antes de esto no tenía `table-layout:fixed`, así que el ancho de Rubro (y por lo tanto dónde
  arrancaban las columnas numéricas) se recalculaba solo según el rubro más largo de cada
  club/formato, y la columna del ejercicio terminaba en un % de ancho distinto según fuera Boca,
  Racing, Formato del club o Formato simplificado. La función `syncPLTableColgroup(hideCompare)`
  (justo antes de `renderNativePLTable` en el JS) reescribe ese `<colgroup>` cada vez que cambia el
  modo Año a año/Por gestión, en Año a año las columnas 4-6 quedan con ancho EXPLÍCITO `0` (no
  sacadas del colgroup: sacarlas rompe el reparto de espacio porque la fila de encabezado de sección
  sigue con `colspan="6"`, ver detalle en `finance-of-sports-project.md`) para que Rubro siga siendo la única columna sin
  ancho y se lleve TODO el espacio sobrante, así la tabla usa el 100% del ancho del card en los dos
  modos, sin la franja muerta que salió en un intento intermedio. Si se agrega una columna numérica
  nueva a esta tabla, TIENE que sumarse a los dos ramales de `syncPLTableColgroup` con su propio ancho
  fijo, dejarla sin ancho reintroduce el bug original. La tabla está envuelta en
  `<div class="table-scroll">` (`overflow-x:auto`, `min-width` distinto por modo: 600px en Por gestión,
  320px en Año a año) para que en mobile scrollee en vez de aplastar Rubro. Detalle completo, con las
  dos vueltas de debugging, en `finance-of-sports-project.md`.
- REGLA (Versión 38, corrige un bug real de categorización): antes de meter algo adentro de
  `items` (sub-ítems de desglose de un revenueLine/expenseLine), confirmar que esos sub-ítems NO
  tengan cada uno su propia categoría real distinta, si la tienen, van como líneas de PRIMER
  NIVEL con su propio `normalizedCategory`, no adentro de `items` de una línea `lump_football_
  operations(_expense)`. `items` nunca lo mira `sumCat()`/`computeYearGeneric()`, así que cualquier
  cálculo por categoría (incluido "Formato simplificado") ignora lo que quede ahí adentro. Bug real:
  Racing 2026/2027 tenía Televisión/Comercial/Venta de jugadores/Salarios del plantel en $0 en
  "Formato simplificado" porque esa plata estaba enterrada en `items` de una línea mal categorizada
  como bolsón sin desglosar, cuando el documento SÍ la desglosaba. Ver
  `.claude/skills/club-data-mapping/SKILL.md` sección 1 (regla completa) y
  `.claude/skills/club-or-year-onboarding/SKILL.md` sección 8 (cómo detectarlo probando en el
  navegador: mirar CADA bucket de "Formato simplificado", no solo el total).
- REGLA (Versión 37, bug visual): el "$" del eje Y del gráfico de barras (card Gráficos) no
  colisiona más con el tick más alto, ver `layout:{padding:{top:26}}` en `drawTrendChart`/
  `drawTrendChartGeneric`.
- REGLA (Versión 36, pedida por Guido: "detesto que hagas eso"): la cita de fuente ("Fuente: ...")
  NUNCA va adentro de un card individual (Supuestos, Presupuesto Financiero, Presupuesto de
  Inversiones, ni ningún card nuevo). Va en `#finanzasDataQualityBanner` (por ejercicio),
  `#finanzasClubSourceNote` (por club, al final del bloque de cards) o la pestaña Fuentes, nunca
  repetida card por card. Ver `.claude/skills/club-or-year-onboarding/SKILL.md`, sección 7.
- REGLA (Versiones 34-35, pedida por Guido, no es opcional, "homologar lo que se pueda
  homologar"): los 3 cards de presupuesto oficial de Finanzas: "Supuestos"
  (`#supuestosCard`/`renderSupuestosCard`), "Presupuesto Financiero"
  (`#presupuestoFinancieroCard`/`renderPresupuestoFinancieroCard`) y "Presupuesto de
  Inversiones" (`#presupuestoInversionesCard`/`renderPresupuestoInversionesCard`), son
  genéricos (un solo card cada uno, ya no uno por club) y SIEMPRE están presentes, para
  cualquier club/ejercicio seleccionado. Si ese ejercicio puntual tiene el dato (hoy: Boca
  2027 para los 3; Racing 2026 y 2027 para los 3 también, con menos desglose que Boca en
  Inversiones), lo muestra; si no (balances auditados, placeholders), dice explícito por qué
  no hay, en vez de esconder el card. (Ese texto lo arma hoy cada render de card: la función
  compartida `noDataMsg()` que hacía esto se borró, ver el punto de más arriba en este mismo
  archivo — este párrafo la seguía citando en presente.) Los 3 se repintan
  juntos cada vez que cambia club/año/gestión. ACTUALIZADO (Versión 135): los datos de los 3
  viven en el `data/<club>-data.js` de cada club, en `presupuestoSupuestosByYear` /
  `presupuestoFinancieroByYear` / `presupuestoInversionesByYear`, indexados por `[year]`. Antes
  eran 3 registros `[clubId][year]` adentro de `js/finanzas-render.js`, o sea datos de club en la
  capa de render: onboardear un presupuesto obligaba a editar el archivo del motor. Ahora no.
  Y el contenido de Boca 2027 para Presupuesto Financiero/Inversiones, que hasta la 135 era HTML
  estático adentro de `index.html` (133 líneas, envuelto en `#pfBoca2027`/`#piBoca2027` y
  mostrado con un `isBoca2027`), es dato como el de cualquier otro club: se extrajo parseando el
  propio HTML, no retipeando, y se verificó que las 6 cards renderizadas quedaran idénticas
  carácter por carácter. Las tablas con `formato:'ars-exacto'` se muestran en pesos enteros y no
  responden al toggle de moneda, igual que cuando eran HTML fijo.
- OJO REGLA REFORZADA (bug real, Versión 30): NUNCA cargar datos al sitio
  extrayendo un PDF directo, sin pasar antes por una transcripción completa
  a Markdown (CLAUDE.md ya lo decía, pero se saltó una vez con el
  presupuesto 2026/27 y se perdió detalle real. Guido lo notó comparando
  contra el PDF). Un "resumen para ahorrar tokens" en el momento de
  transcribir casi siempre implica volver a hacerlo dos veces cuando falta
  algo. Verificar SIEMPRE si existe el .md en `Clubes/<País>/<Club>/` antes
  de asumir que un dato no está desglosado en la fuente.
- OJO Ejercicio 2027 tiene categorías EXTRA en el Formato simplificado que
  los demás ejercicios no tienen (Televisión/Premios por competencias en
  Ingresos; Organización de partidos/Otras secciones deportivas/
  Administración y gastos generales en vez de un solo "Otros gastos"),
  es a propósito (Versión 30/31): ese es el único ejercicio con el
  desglose fino disponible (ver presupuesto-26-27.md), así que se usa donde
  hay dato real en vez de forzar una categoría vacía o aproximada en todos
  los ejercicios por igual. Si se carga un balance nuevo con este mismo
  nivel de detalle (ej. el resto de los años de Boca, to-do #2), evaluar si
  amerita el mismo tratamiento especial dentro de `simplifiedReportForBoca()`.
- OJO clase `bocaPresupuestoOficialCard`: pese al nombre, NO es "solo para
  `<div class="card">`", es el marcador genérico de "esto es Boca-only,
  ocultalo con otro club" que usa `refreshAllForClub()`. Cualquier elemento
  nuevo (card, `<p>`, lo que sea) que solo aplique a Boca necesita esta
  clase, si no queda visible con cualquier club (bug real, Versión 27, pasó
  con una nota de fuente suelta que no estaba dentro de ningún card).
- OJO `Object.keys()` sobre un objeto con claves que parecen enteros
  (riverFiscalYearMeta, racingFiscalYearMeta: "2024","2025"...): JS SIEMPRE
  las reordena ascendente al iterarlas, sin importar el orden del código
  fuente, no asumir que el orden de escritura se respeta (bug real,
  Versión 26). `populateFinanzasSelectors()` ya ordena a mano
  (`.sort((a,b)=>b-a)`) para que el selector de Año quede descendente, y
  preserva el ejercicio seleccionado (o el más cercano) al cambiar de club,
  cualquier `<select>` nuevo que liste ejercicios de estos objetos debe
  seguir el mismo criterio, no confiar en el orden de iteración.
- OJO texto fijo dibujado a mano en un <canvas> de Chart.js: el "$" del eje Y
  del gráfico de barras se dibujaba con `ctx.fillText` (Versión 22) para
  esquivar la rotación automática del título nativo, pero salía con el glyph
  roto (reportado por Guido, Versión 25), no se pudo diagnosticar la causa
  exacta (Chart.js no carga en el navegador de este entorno, ver más abajo).
  Reemplazado por un `<span>` de HTML normal superpuesto con
  `position:absolute` sobre `.chart-wrap`, mucho más simple y sin el riesgo
  de fuente/transform del canvas. Si hace falta texto FIJO (no dependiente de
  la geometría del gráfico) sobre un chart de nuevo, preferir esta vía
  (HTML+CSS) en vez de dibujarlo a mano en el canvas. El % de cada porción
  del pie/doughnut (`pctSliceLabelsPlugin`) SÍ sigue en canvas porque su
  posición es dinámica (depende del ángulo de cada porción), no tiene
  alternativa en HTML simple.
- OJO alineación en `<summary>` de acordeón (`details.accordion>summary`): usa
  `display:flex;justify-content:space-between`, pero el `::after` (+/−) cuenta
  como un 3er hijo flex, con solo 2 <span> (label + monto) el monto NO queda
  pegado al borde derecho, space-between lo reparte entre los 3 (bug real,
  Versión 24). Si se agrega un `<summary>` nuevo con label+monto, darle al
  monto `flex:0 0 <ancho fijo>;text-align:right` (ver
  `details.accordion.nested>summary>span:last-child`), no confiar en
  space-between solo.
- OJO stats de arriba de Finanzas: el stat "Gastos" (`#finanzasStats`) SIEMPRE
  tiene que salir de `plTotals.gastosTotal` (lo que devuelve
  `renderNativePLTable()`, mismo número que "Total Gastos" de la tabla), NUNCA
  de `cur.expenses` directo, `cur.expenses` (computeYear) es solo
  wages+otherExpenses, sin amortizaciones, y quedó desalineado con la tabla
  hasta la Versión 23 (bug real, no un tema de Inversiones/Obras como se
  sospechaba al principio). Si se agrega un nuevo lugar que muestre "Gastos"
  del ejercicio, usar ese mismo patrón (renderNativePLTable primero, después
  el stat con su total), no recalcular aparte.
- OJO Chart.js: el script tag pinea la versión exacta de cdnjs
  (`https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.5.1/chart.umd.min.js`).
  La Versión 22 corrigió un 404 real acá (la versión vieja, 4.4.4, nunca
  existió en cdnjs), si en el futuro se sube de versión, verificar SIEMPRE
  con `curl -I` contra la URL exacta antes de pinear un número de versión
  nuevo, no asumirlo.


**YA NO ES CIERTO DESDE EL 2026-09-20: AHORA SÍ HAY `netlify.toml`.** Netlify sigue publicando la raíz, pero antes de publicar corre un comando que BORRA DEL ARTEFACTO DE DEPLOY los documentos internos (`CLAUDE.md`, `finance-of-sports-project.md`, `dudas-por-club.md`, las 613 notas de `fuentes/**/*.md`, `auditorias/` y `Prototyping/`). O sea: todo se trackea —el respaldo en GitHub está completo— y lo interno no se publica. Las 41 páginas `fuentes/<clubId>.html` SÍ se publican, son parte del sitio. Ver `netlify.toml`, que explica por qué destrackear estaba mal y por qué hacer el repo privado no alcanzaba. **Si dejás un archivo nuevo en el repo, sigue publicándose salvo que lo agregues a esa lista.**