# "Qué es real por club" — la versión escrita a mano (archivo histórico)

> **ARCHIVADO (Versión 196).** Ya estaba marcado como "no es la fuente de verdad y no se actualiza
> más" desde el 2026-09-13; la Versión 196 solo lo movió a `Admin/Archive/`. Sigue siendo la red de
> seguridad que describe abajo: si falta un dato en el `data/<club>-data.js` de un club, buscalo acá
> antes de darlo por perdido, y cuando lo encuentres movelo al archivo del club, no a este.
>
> **Las rutas de archivo que se nombran acá adentro son las de antes de la Versión 196**, cuando los
> documentos vivían en la raíz. Se dejaron como estaban a propósito: es historia, no instrucciones.

Esto es, textual, la sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" tal
como estaba escrita a mano en el comentario de `index.html` hasta la Versión
120, con 41 clubes cargados.

**Ya no es la fuente de verdad y no se actualiza más.** En `index.html` esa
sección ahora se GENERA desde los propios datos (`node tools/generate-club-index.js`),
así que no puede quedar desincronizada de lo que el sitio realmente muestra.

**Por qué se guarda esto igual**: la versión generada contesta QUÉ hay cargado de
cada club (cuántos ejercicios, de qué tipo, en qué moneda), que es lo único
derivable de los datos. Lo que estos párrafos tenían de más era el POR QUÉ: qué
supuesto se tomó, qué salvedad tiene una cifra, qué quedó sin cargar y por qué
razón. Ese contenido pertenece al comentario de cabecera de cada
`data/<club>-data.js`, que es el archivo que sí o sí se toca al cargar un club y
por lo tanto el único que no se puede desincronizar.

Para la mayoría de los clubes ese "por qué" YA está en su `data/<club>-data.js`,
con más detalle que acá (se verificó club por club al cargar cada uno). Este
archivo queda como red de seguridad: si alguna vez falta un dato en el archivo de
un club, buscalo acá antes de darlo por perdido, y cuando lo encuentres, movelo
al archivo del club, no a este.

---

QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB (esto es lo que más cambia entre
sesiones, revisar fuentes-por-club.md por si Guido ya subió algo nuevo)
- BOCA: Finanzas Ejercicio 2027 = REAL (presupuesto oficial). Finanzas
  Ejercicio 2025 = REAL (Memoria y Balance auditado al 30/06/2025, PDF de
  149 páginas bajado del Drive linkeado en bocajuniors.com.ar/club/presupuesto,
  ver sources['boca-balance-2024-25'] en data/clubs.js; copia local en
  finance-of-sports/Clubes/Argentina/Boca/Memoria y Balance 2024-25.pdf, fuera
  de git por el .gitignore de la carpeta). Ejercicio 2024 sigue en cero a propósito (no
  cargado todavía). Ejercicio 2026 (jul-2025 a jun-2026, el año entre los dos
  ya cargados), investigado en la Versión 32: no hay balance auditado real
  todavía (recién cerró jun-2026, y Boca aprueba el balance del ejercicio
  anterior en la asamblea de octubre siguiente, esa asamblea no había
  ocurrido a la fecha de esta sesión); SÍ hay un presupuesto aprobado en
  asamblea del 5/6/2025 con cifras de prensa (~$171.000 M ARS ingresos /
  ~$168.000 M egresos, superávit proyectado ~USD 2 M) pero sin PDF oficial
  encontrado, Detalle completo en `finance-of-sports-project.md`. DECIDIDO en la Versión 40
  (Guido contestó la pregunta abierta del to-do): NO cargar la cifra de prensa
  como `press_estimate`, se agregó el Ejercicio 2026 al selector en cero,
  con `reportType:'pending_official'` ("todavía no informado por el club",
  banner y cards explícitos), esperando el documento oficial real. Resto de
  Finanzas (2018,2019,2021,2022,2023) = placeholder.
  Resultados deportivos (títulos de Angelici, Ameal, Riquelme) = REAL,
  verificado por web search en agosto 2026. Mercado de Pases = placeholder
  (nunca tuvo datos reales, ni siquiera al principio).
- RACING: TODAS las finanzas de la era Blanco/Milito son reales (Versión
  16). Ejercicio 2023/2024 (última temporada de Blanco, balance auditado
  real, déficit de $(6.127.619.872) ARS), Ejercicio 2024/2025 (primer
  ejercicio completo de Milito, balance auditado real, déficit de
  $(178.451.821) ARS), Ejercicio 2025/2026 (Presupuesto Financiero de
  Ingresos y Egresos oficial) y, desde la Versión 32, Ejercicio 2026/2027
  (presupuesto oficial nuevo, ver detalle en `finance-of-sports-project.md`). Desde la
  Versión 32 estos 4 ejercicios tienen `amountNative` en ARS nativo (no
  USD ya-convertido) con el tipo de cambio que declara cada documento
  (Racing 2024/2025 corregidos de $912/$1.203 investigados a $909/$1.196
  declarados por el propio balance), esto habilita el toggle USD/ARS y
  Formato del club/simplificado, que ahora se muestran para Racing (y
  River) igual que para Boca. Además, desde la
  Versión 20, 3 ejercicios históricos PRE-Blanco también son reales:
  Ejercicio 2008/2009, 2009/2010 y 2010/2011 (Ejercicios N° 107/108/109,
  balances auditados oficiales), de una época en que Racing venía de una
  quiebra y no tenía la presidencia electa que tiene hoy; no se identificó
  con confianza quién presidía en esos 3 años puntuales, así que se
  cargaron solo en "Año a año", sin asignarles gestión (ver comentario
  extenso en data/racing-data.js). Fuente: archivo público completo de
  racingclub.com.ar/informes/ (~24 PDFs 2009-2027 en
  finance-of-sports/Clubes/Argentina/Racing/). ACTUALIZADO Versión 62: además de
  los 2 ejercicios pre-Blanco de arriba, YA están cargados y son reales
  Ejercicio 2019/2020 (Ejercicio N° 118, balance + su propio Presupuesto del
  mismo ejercicio, `official_budget_and_balance`, Versión 58) y Ejercicio
  2020/2021 (Ejercicio N° 119, irregular de 10 meses, balance sin presupuesto
  propio en el archivo, Versión 62). De los ~19 años que quedaban sin cargar
  al empezar este trabajo, se confirmó que 2012-2018 (7 balances) y 4
  presupuestos viejos (2013-14/2015-16/2018-19, más el de 2019-20 que sí tiene
  su balance ya cargado) son ESCANEOS sin texto extraíble, necesitan OCR con
  el Read tool sobre imágenes, mucho más caro en tokens; queda el presupuesto
  2017/2018 (extraíble) como el único histórico restante con texto extraíble
  todavía sin cargar (ver to-do). ACTUALIZADO Versión 66: también son reales
  Ejercicio 2017/2018 (Ejercicio N° 116, presupuesto + balance real, ambas
  fuentes, Versión 63/64) y Ejercicio 2018/2019 (presupuesto-only, sin
  balance real todavía, Versión 66) — de los presupuestos viejos que eran
  escaneos, solo quedan 2013-14 y 2015-16 sin cargar. Resultados deportivos de ambas gestiones
  modernas = REAL, verificado por web search en agosto 2026 (incluye la
  Copa Sudamericana 2024, ganada bajo Blanco, no bajo Milito, el título se
  ganó el 23/11/2024 y Milito asumió el 20/12/2024). Mercado de Pases =
  placeholder.
- RIVER: Finanzas Ejercicio 2024 (gestión Brito, 1°/9/2023-31/8/2024) = REAL
  (balance auditado real, aunque conseguido en una réplica de la comunidad
  tuRiver, no del dominio oficial, ver sources['river-estados-contables-2023-24']
  en data/clubs.js y el hallazgo importante documentado en data/river-data.js:
  el dominio oficial de River SOLO publica la Memoria narrativa, nunca el
  balance auditado, así que no tiene sentido seguir buscando ahí). Desde la
  Versión 32, este ejercicio tiene `amountNative` en ARS nativo (antes USD
  ya-convertido) con el tipo de cambio que declara el propio balance
  ($950,50, corregido de $953,50 investigado a mano), habilita el toggle
  USD/ARS y Formato del club/simplificado para River, igual que Boca y
  Racing. Ejercicio 2025 (Brito) y Ejercicio 2021 (última temporada de
  D'Onofrio) siguen placeholder. Resultados deportivos SÍ son reales (11
  títulos de D'Onofrio incluyendo 2 Libertadores, 2 títulos de Brito),
  verificado por web search en agosto 2026. Mercado de Pases = placeholder.
- VÉLEZ SARSFIELD (club nuevo, Versión 82; rango completo Versiones 84-93):
  Ejercicios 2015 a 2025 (N°105 a N°115, 11 ejercicios consecutivos, SIN
  ningún hueco) = REAL (todos balances auditados, Bertora y Asociados
  S.R.L., sin salvedades) — TODO el archivo institucional del club está
  cargado, no queda ningún ejercicio pendiente salvo uno futuro (2026) que
  todavía no se publicó. 2023/2017/2016/2015 se cargaron vía OCR (PDF
  escaneados sin texto nativo), el resto de texto nativo. amountNative en
  ARS nativo desde el día uno (mismo patrón que los otros 3 clubes, nunca
  se cargó pre-convertido a USD). Toggle USD/ARS y Formato del
  club/simplificado disponibles igual que los otros clubes argentinos.
  Mercado de Pases/Resultados deportivos/Títulos = vacíos (sin placeholder
  inventado, a diferencia de los otros 3 clubes) — sigue pendiente, esta
  sesión se enfocó solo en Finanzas.
- INSTITUTO ATLÉTICO CENTRAL CÓRDOBA (club nuevo, Versión 94): Ejercicio 2024
  (N°70, 1°/7/2023 a 30/6/2024) = REAL (balance auditado, texto nativo, sin
  necesidad de OCR). Es el único ejercicio cargado — el club no tiene (hasta
  donde se relevó) un archivo histórico público tan completo como Racing o
  Vélez, solo se encontraron los 4 PDFs de esta noticia puntual. Convertido a
  USD con $909 (dólar mayorista de cierre 30/6/2024, el documento no declara
  su propio tipo de cambio). Mercado de Pases/Resultados deportivos/Títulos
  = vacíos (mismo criterio que Vélez, sin placeholder inventado). Presupuesto
  2025 y sus premisas están transcriptos pero NO cargados (presupuestan por
  año calendario, no por ejercicio — ver to-do).
- ROSARIO CENTRAL (club nuevo, Versión 95): Ejercicio 2023 (1°/7/2022 a
  30/6/2023) = REAL (balance auditado, texto nativo). Único ejercicio
  cargado. Mercado de Pases/Resultados/Títulos = vacíos. Ver duda abierta en
  `dudas-por-club.md` sobre la doble cotización de USD del propio balance.
- INDEPENDIENTE (club nuevo, Versión 95): Ejercicio 2024 (1°/7/2023 a
  30/6/2024) = REAL (balance auditado, texto nativo). Único ejercicio
  cargado. Mercado de Pases/Resultados/Títulos = vacíos.
- ARGENTINOS JUNIORS (club nuevo, Versión 95): Ejercicios 2015 a 2019 (5
  consecutivos) = REAL pero a nivel AGREGADO (4 categorías de Recursos/
  Gastos, desde una presentación de asamblea comparativa, no un balance
  completo con Anexos) — ver `data/argentinosjuniors-data.js`. El Ejercicio
  2015 quedó sin gestión asignada (duda sobre fecha exacta de asunción de
  Malaspina, ver `dudas-por-club.md`). Mercado de Pases/Resultados/Títulos =
  vacíos.
- ESTUDIANTES DE LA PLATA (club nuevo, Versión 95): Ejercicios 2022, 2023 y
  2024 (3 consecutivos) = REAL (balances auditados, texto nativo, con Anexo
  V/VI de detalle completo). El Ejercicio 2024 tiene una duda abierta sobre
  atribución de gestión (Gorostegui vs. Verón, ver `dudas-por-club.md`).
  Mercado de Pases/Resultados/Títulos = vacíos.
- SAN LORENZO (club nuevo, Versión 95): Ejercicios 2013 y 2014 (2
  consecutivos) = REAL (balances auditados, texto nativo con algunos typos
  de imprenta del propio documento). El Ejercicio 2013 tiene detalle
  completo por Anexo, el 2014 solo el nivel agregado (ese PDF específico no
  incluye los Anexos). Mercado de Pases/Resultados/Títulos = vacíos.
- UNIÓN (club nuevo, Versión 95): Ejercicio 2025 (N°119, 1°/7/2024 a
  30/6/2025) = REAL, primer club/ejercicio de esta sesión cargado desde un
  PDF MIXTO (Memoria en texto nativo + Estados Contables reales escaneados
  dentro del mismo archivo, transcriptos vía OCR). Único ejercicio cargado,
  con parte del Anexo de Gastos a nivel agregado por limitación del OCR (ver
  `dudas-por-club.md`). Mercado de Pases/Resultados/Títulos = vacíos.
- BRASIL, 3 clubes nuevos (Versión 116), un solo ejercicio cada uno, todos 2024 y todos REAL:
  Coritiba (SAF desde jul-2023; PREJUÍZO de R$ 139,4 M sobre una receita líquida de R$ 87,0 M y
  patrimônio líquido NEGATIVO al cierre, el peor ejercicio de cualquier club del sitio; costos
  cargados desde el desglose por natureza de la Nota 22, no desde las 2 líneas por destino de la
  DRE, ver data/coritiba-data.js); Ituano (no es SAF; déficit de R$ 7,1 M; DRE desglosada que cierra
  exacto en sus 4 subtotales); Mirassol (no es SAF; superávit de R$ 4,1 M, pero la fuente es el
  informe NARRATIVO del auditor, no las demonstrações: 1 sola línea de ingresos y 2 de gastos, el
  club con menos desglose del sitio junto con los de Japón). Los 3 con Mercado de Pases/Resultados/
  Títulos vacíos, sin gestión confirmada, y sin memberCount.
- BRASIL, 4 clubes (Versión 109): Grêmio (2024, no es SAF), Botafogo (2024, SAF columna
  Controladora, déficit real pese al título de Libertadores+Brasileirão ese año, ver comentario de
  cabecera de `data/botafogo-data.js`), Cruzeiro (2025, SAF), Atlético Goianiense (2025, columna
  Consolidado). 1 ejercicio cada uno a propósito, ver ESTADO ACTUAL arriba. 8 clubes más de Brasil
  quedan con PDF descargado y sin cargar (to-do).
- ONCE CALDAS (club nuevo, Versión 110, primer club colombiano del sitio): Ejercicio 2025 (año
  calendario, estados financieros auditados reales vía SIIS) = REAL, único ejercicio cargado a
  propósito. El PDF descargado son las notas a los estados financieros (no el estado primario) — el
  PAT está confirmado triple dentro del documento, pero `tax` en `fiscalYearMeta` es un residuo
  documentado (no una línea impresa), ver `dudas-por-club.md`. `gestionesByClub` con una entrada
  genérica "Gestión actual" (no se conoce/aplica una atribución de presidencia como en los clubes
  argentinos). Mercado de Pases/Resultados/Títulos = vacíos.
- ENVIGADO (club nuevo, Versión 110): Ejercicio 2025 (año calendario, estados financieros auditados
  reales vía SIIS, transcripto por OCR) = REAL, único ejercicio cargado a propósito (SIIS tiene 10
  ejercicios consecutivos 2016-2025 disponibles para este club, pendiente para una sesión futura). El
  PDF SÍ trae el Estado de Resultado Integral primario completo — reconciliación exacta, sin ningún
  residuo. Mismas notas que Once Caldas sobre `gestionesByClub`. Mercado de Pases/Resultados/Títulos
  = vacíos.
- DEPORTES TOLIMA: investigado (PDFs descargados, transcripción completa en `Clubes/Colombia/
  Deportes Tolima/`) pero NO CARGADO — 3 cifras de resultado neto del Ejercicio 2025 en conflicto
  entre sí (SIIS, la tabla histórica del propio documento, y la suma línea por línea de las notas),
  sin poder reconciliar con el PDF disponible (solo notas, no el estado primario). Ver
  `dudas-por-club.md` para el detalle y la pregunta pendiente. Ingresos SÍ confirmados con alta
  confianza si se retoma.
- ESPAÑA, 10 CLUBES NUEVOS (Versión 111), un solo ejercicio cada uno, todos REAL (balance auditado):
  REAL MADRID Ejercicio 2024/25 (consolidado, 22 años disponibles en el archivo 2003-2025, solo se
  cargó el más reciente a propósito). FC BARCELONA Ejercicio 2024/25 (consolidado, 22 años
  disponibles 2003-2025). ATLÉTICO DE MADRID Ejercicio 2024/25 (individual, 12 años disponibles
  2013-2025). ATHLETIC CLUB Ejercicio 2024/25 (individual, 4 años disponibles 2021-2025;
  amortización cargada entera como depreciation, no player_amortisation, por la política de cantera
  del club, ver comentario en data/athleticclub-data.js). SEVILLA FC Ejercicio 2024/25 (individual,
  4 años disponibles 2021-2025; Patrimonio Neto NEGATIVO al cierre, pérdida de EUR 54 M). VALENCIA
  CF Ejercicio 2024/25 (individual, solo 2 ejercicios reales en el archivo). VILLARREAL CF Ejercicio
  2023/24 (ÚNICO ejercicio real disponible en el archivo; el documento no desglosa la cifra de
  negocios por concepto, ni separa amortización de jugadores del resto, ver aproximaciones
  documentadas en data/villarrealcf-data.js). REAL BETIS Ejercicio 2024/25 (individual, 5 ejercicios
  con huecos en el archivo). CELTA DE VIGO Ejercicio 2024/25 (individual, elegido sobre el
  consolidado disponible del mismo año, 4 ejercicios con huecos). DEPORTIVO ALAVÉS Ejercicio 2024/25
  (individual, 9 años consecutivos disponibles 2016-2025, sin deuda bancaria en el balance). Los 10
  clubes tienen `gestionesByClub` con una única entrada genérica (no se investigó presidencia real,
  fuera de alcance de esta sesión) y Mercado de Pases/Resultados/Títulos vacíos. Ver TO-DO para
  profundizar años o sumar clubes nuevos (Real Sociedad, Getafe, Mallorca, Deportivo, Ponferradina,
  Zaragoza).
- JAPÓN, 10 clubes nuevos vía J.League (Versión 108): Ejercicio 2025, solo Revenue real por club
  (Sponsor/Gate/Otros), sin costos por club disponibles en la fuente — ver ESTADO ACTUAL arriba.
- CLUB AMÉRICA (México, club nuevo, primer club no argentino, Versión 107): Ejercicio 2025 (año
  calendario completo) = REAL, pero a nivel de SEGMENTO de negocio de Ollamani, S.A.B. (Revenue +
  utilidad de segmento, sin balance patrimonial ni desglose de costos por rubro). Revenue mezcla
  Club América con Estadio Banorte (ver ESTADO ACTUAL arriba y comentario de cabecera de
  `data/clubamerica-data.js` para el detalle completo). `officialPAT` deliberadamente `null` (la
  utilidad de segmento no es un PAT comparable). Ejercicio 2024 (11 meses, período inicial de la
  compañía) NO se cargó a propósito (ver to-do). Mercado de Pases/Resultados/Títulos = vacíos.
