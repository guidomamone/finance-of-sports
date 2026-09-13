# Proyecto Boca — historia narrativa completa

Este archivo es la historia narrativa completa de `finance-of-sports`, versión
por versión, desde la Versión 10 (cuando el sitio pasó de ser solo de Boca a
multi-club) hasta hoy. El planteo original del proyecto y las Versiones 1 a 9
del MVP están al FINAL del archivo, en el "VOLUMEN 0 — ORIGEN DEL PROYECTO"
(estaban en un archivo suelto fuera del repo hasta la Versión 119). Vive en texto plano, sin necesidad de abrir
`index.html`, para consulta OPCIONAL: acá está el razonamiento detallado de
por qué se tomó cada decisión, qué se probó y descartó, qué bugs reales
aparecieron y cómo se encontraron.

**No hace falta leer este archivo para retomar el proyecto.** Para eso alcanza
con el bloque de arriba de `index.html` (CÓMO RETOMAR / ESTADO ACTUAL / QUÉ ES
REAL Y QUÉ ES PLACEHOLDER / TO-DO LIST), que es un resumen autosuficiente y
siempre al día. Para un resumen más corto que este pero más largo que el de
`index.html` — qué cambió en cada versión, sin el detalle completo del
"por qué" — ver `CHANGELOG.md`.

Este archivo se actualiza agregando una entrada nueva al final cuando el
cambio de una sesión amerita contexto narrativo completo (no todos lo
ameritan — un cambio chico puede quedar solo en `CHANGELOG.md`). Ver
`CLAUDE.md` para el criterio completo de cuándo escribir acá vs. solo en
`CHANGELOG.md`.

Nota histórica (2026-09-12): este archivo se creó recién en esta sesión,
reconstruido a partir del historial de versiones que hasta ahora vivía
directo en el comentario HTML de `index.html` (Versión 10 a 101). Antes de
esta sesión, `index.html` se había vuelto el único lugar con el historial
completo — este archivo existía solo como referencia en el texto, nunca se
había creado de verdad. A partir de acá, el historial narrativo vive acá, y
`index.html` solo mantiene el estado actual.

---

## Versión 10 — EL SITIO EMPEZÓ A SER MULTI-CLUB (River y Racing agregados)

Guido quiere evolucionar esto de "sitio de Boca" a "sitio de finanzas de
varios clubes", para periodistas y creadores de contenido, con un plan
gratis/pago (dLocal Go). Antes de escribir código se diseñó un esquema de
datos normalizado (ver mensajes de esa conversación) y se probó contra
River Plate y Racing, porque cada club reporta sus categorías distinto y
había que confirmar eso con datos reales, no supuestos.

- Carpeta nueva `data/`: `clubs.js` (clubes, gestiones por club, y Source,
  de dónde sale cada número, con un nivel de confiabilidad: primary /
  secondary_press / placeholder), `category-map.js` (taxonomía compartida de
  categorías de ingreso/gasto + tabla que traduce las categorías reales de
  Boca a esa taxonomía), `river-data.js` y `racing-data.js` (datos de esos
  dos clubes).
- Boca NO SE TOCÓ: yearsRaw, revenueBreakdown, expenseBreakdown,
  computeYear, plRows, renderPLTable siguen exactamente igual que antes,
  intencionalmente, para no arriesgar nada que ya estaba verificado. Boca
  sigue sin pasar por el motor genérico nuevo.
- River y Racing usan un motor más chico y genérico (computeYearGeneric /
  plRowsGeneric / renderPLTableGeneric, todo en el <script> principal,
  buscar "MULTI-CLUB") que arma el mismo tipo de cálculo (EBITDA, resultado
  operativo, etc.) a partir de listas de líneas (revenueLines/expenseLines)
  en vez de campos fijos con nombre, porque cada club tiene una cantidad
  distinta de rubros reales.
- Racing usa datos reales pero de PRENSA (no el documento oficial del
  club): un hilo de X que resume lo que Racing presentó en asamblea. La
  prensa agrupó los ingresos en solo 2 rubros grandes ("fútbol profesional"
  y "cuotas sociales"), mucho más grueso que las 9 categorías de Boca. Se
  agregó una categoría normalizada nueva, `lump_football_operations`, como
  lugar honesto para un monto real que la fuente no separó más, en vez de
  inventar cómo se dividiría entre matchday/TV/pases. Donde el total oficial
  reportado no coincidía con la suma de rubros conocidos, se agregó una
  línea residual "no desglosado en la cobertura de prensa" con el resto,
  para que el total siga siendo exacto sin fingir precisión que no existe.
- River NO TIENE NINGUNA FUENTE TODAVÍA: la cobertura de prensa encontrada
  tenía cifras ambiguas entre sí (cuota social + abonos combinados en una
  nota, un número de "entradas y abonos" del estadio en otra, sin quedar
  claro si se superponían). En vez de forzar eso a una categoría, los
  números de River son placeholder puro (redondos, obviamente inventados),
  igual que fueron los primeros años de Boca. El sitio muestra un banner
  amarillo grande cada vez que se está mirando un dato que no es oficial
  (placeholder o prensa), no hace falta leer un comentario para darse
  cuenta.
- Verificación automática nueva: `verifyTieOuts()` corre sola al cargar el
  sitio y compara, por consola, la suma de rubros contra el total oficial
  conocido de cada club-ejercicio (hoy: Boca 2027 y Racing 2026). Si algo
  no cierra, tira un error en la consola en vez de depender de que alguien
  se acuerde de sumar a mano.
- Selector de club nuevo en Finanzas (arriba de todo, al lado de "Por
  gestión / Año a año"). El toggle USD/ARS se esconde para River/Racing
  porque no hay una cotización propia cargada para esos clubes todavía,
  Boca sigue siendo el único con esa conversión.
- Archivo nuevo `fuentes-por-club.md` (misma carpeta que este HTML): un
  lugar en texto plano, sin código, donde Guido pega links a documentos
  oficiales o notas de prensa por club a medida que los va encontrando.
- LO QUE TODAVÍA NO SE TOCÓ EN ESTA PASADA (a propósito, para no hacer todo
  en un solo paso): Inicio, Mercado de Pases, Resultados, Comparar Gestiones
  y Fuentes seguían siendo 100% Boca, sin selector de club. Esto se resolvió
  en la Versión 11 (ver más abajo).


## Versión 11 — TODAS LAS PESTAÑAS SON MULTI-CLUB, Y SE AGREGÓ EL STUB DE MI CUENTA

Continuación directa de la Versión 10: se generalizaron las cinco pestañas
que habían quedado Boca-only, y se agregó una pestaña "Mi Cuenta" vacía
como lugar reservado para el futuro paywall.

- Selector de club MOVIDO al header (arriba a la derecha, al lado del botón
  de contacto): ahora es global, aplica a las 6 pestañas del sitio, no solo
  a Finanzas. Se sacó el selector duplicado que había quedado dentro de
  Finanzas en la Versión 10.
- Diccionarios nuevos en el <script> principal (buscar "MULTI-CLUB: diccionarios
  por club"): `pasesDataByClub`, `resultadosDataByClub`, `titulosDataByClub`.
  Son solo el índice que mapea cada club a sus datos. Boca sigue usando
  pasesData/resultadosData/titulosData/gestionesInfo tal cual estaban, sin
  tocar.
- `computeYearForClub(clubId, year)` y `displayFinancialsForClub(clubId,
  computed)`: helpers nuevos que le permiten a Comparar Gestiones e Inicio
  pedir "las finanzas de este club en este ejercicio" sin les importar si es
  Boca (computeYear original) o River/Racing (computeYearGeneric).
- River y Racing ahora tienen DOS gestiones cada uno (antes tenían una sola,
  lo cual dejaba "Comparar Gestiones" sin sentido, comparando un período
  contra sí mismo). Se agregó D'Onofrio (2013-2021) para River y Blanco
  (2013-2024) para Racing, en data/river-data.js y data/racing-data.js.
  Igual que antes: las FINANZAS de estas gestiones nuevas son placeholder
  puro (números redondos, sin fuente). Pero los RESULTADOS DEPORTIVOS sí son
  reales: se buscaron y verificaron vía web search en agosto de 2026 (ESPN,
  Infobae, La Nación, Wikipedia, sitio oficial de Racing).
- OJO CON UN LÍMITE DE FECHA YA RESUELTO: Racing ganó la Copa Sudamericana
  el 23/11/2024, todavía bajo la presidencia de Víctor Blanco. Milito
  recién asumió el 20/12/2024. Ese título quedó cargado en la gestión de
  Blanco, no en la de Milito, con el mismo criterio que ya se usaba para
  separar a Riquelme de Ameal en Boca (el título va con quien era
  presidente el día que se ganó, no con quien empezó el torneo).
- Mercado de Pases de River/Racing: placeholder, mismo criterio que Boca
  (esa sección nunca tuvo datos reales para ningún club, pendiente
  Transfermarkt).
- `memberCountByClub` en data/clubs.js: Boca usa el número que ya tenía el
  sitio (365.000), Racing usa un número real encontrado en la cobertura de
  prensa de su presupuesto (86.529 socios), River queda en null a
  propósito, no se encontró una cifra confiable para River en esta sesión,
  y el stat de Inicio muestra "Sin dato" en vez de inventar un número.
- Pestaña nueva "Mi Cuenta": stub sin funcionalidad, solo texto explicando
  que ahí va a vivir el plan pago (dLocal Go) cuando se construya. No tiene
  formularios ni botones que parezcan funcionar sin serlo.
- Copy de Inicio, Resultados y Fuentes suavizado para no sonar Boca-only
  cuando hay otro club seleccionado (se sacó "antes de votar", las
  referencias a Riquelme específicamente en el texto fijo de Resultados,
  etc., los datos reales de cada club siguen mostrando esa clase de
  detalle, solo se generalizó el texto estático de alrededor).
- Probado en navegador pestaña por pestaña para los 3 clubes: sin errores
  de consola, y Boca da exactamente los mismos números que antes de este
  cambio (ver Finanzas y Comparar Gestiones con Riquelme/Ameal).


## Versión 12 — RENAME A "TU CLUB EN NÚMEROS" Y AJUSTE DE HEADER

Guido pidió cambiar el nombre del sitio de "Boca en Números" a "Tu club en
números" (reflejando que ya no es solo de Boca) y pidió explícitamente que
el header siguiera entrando en una sola fila.

- Rename aplicado en 3 lugares: <title>, el logo del header, y el asunto
  del mailto: del formulario de contacto. NO se tocó el nombre de la
  carpeta (finance-of-sports/) ni ninguna referencia a "boca" en el código o
  en nombres de archivo, ver to-do #6 más arriba, es una decisión
  pendiente, no un olvido.
- Header: se achicaron paddings, gaps y font-sizes de nav/logo/selector de
  club, y se pasó .header-inner de flex-wrap:wrap a flex-wrap:nowrap (antes
  con 7 botones de nav + selector de club + ícono de contacto, wrap
  empezaba a partir a la navbar en dos líneas en vez de mantenerla en una).
  Probado en el navegador en 1280px, 1024px, 900px y 850px de ancho: se
  mantiene en una sola fila hasta ~900px. Por debajo de ~850px "Mi Cuenta"
  empieza a recortarse (ver to-do #8), no se rediseñó el nav para mobile,
  solo se comprimió lo que se pudo sin verse demasiado apretado a los
  anchos de escritorio normales.
- Esta misma sesión, después de este cambio, Guido pidió consolidar todo el
  contexto del proyecto en un solo lugar para poder retomarlo con "leé
  index.html y sigamos" en vez de tener que re-explicar todo. Por eso el
  bloque de arriba (CÓMO RETOMAR / ESTADO ACTUAL / MODELO DE DATOS / QUÉ ES
  REAL Y QUÉ ES PLACEHOLDER / TO-DO LIST) se reescribió entero para estar al
  día, antes decía "v9" y no mencionaba nada de multi-club. Este bloque de
  historial (Versión 10 en adelante) se mantiene como estaba, solo se le
  agregó esta entrada.


## Versión 13 — EJERCICIO 2025 DE BOCA PASÓ DE PLACEHOLDER A BALANCE OFICIAL AUDITADO

Retomando el to-do #1/#2 de la sesión anterior, se revisó bocajuniors.com.ar/club/presupuesto
y esta vez, además del Presupuesto 2026/27 (ya cargado), la página linkeaba un
documento nuevo: la Memoria y Balance auditada al 30/06/2025 (Ejercicio N°121),
en Google Drive. Con permiso explícito de Guido se bajó el PDF (149 páginas,
36MB, sin capa de texto, es un escaneo, no un PDF nativo) y se cargó como el
primer balance real de Boca del sitio (antes solo el Ejercicio 2027, que es un
PRESUPUESTO/proyección, tenía datos reales).

- Proceso de extracción: como el PDF es un escaneo, pdftotext no sirve (devolvía
  0 líneas); se instaló poppler (brew install poppler) para que el Read tool
  pudiera renderizar páginas como imágenes. Un subagente en background leyó las
  149 páginas para ubicar el Estado de Recursos y Gastos (pág. 76) y sus 18
  anexos de detalle (pp. 88-139); después se leyeron a mano las páginas 132-139
  (anexos XII-XVII) para sacar el desglose de "Remuneraciones y cargas
  sociales" por departamento, dato que el subagente no había extraído completo
  y que hacía falta para no tener que inventar el split Salarios/Otros gastos.
- Decisión de diseño clave: el balance auditado usa categorías distintas a las
  9 del Presupuesto (11 líneas de Revenue, 17 de Gastos, sin el mismo
  agrupamiento). En vez de copiar el patrón del Ejercicio 2027 (mostrar una
  tabla plana de categorías oficiales y cortar antes de EBITDA/EBIT/Resultado,
  porque el presupuesto no desglosa esos rubros), acá SÍ se pudo reconstruir la
  tabla completa estilo SwissRamble con números 100% reales: el balance sí
  reporta amortización de pases, depreciación, resultado financiero y
  resultado neto por separado, solo que agrupados distinto. Se recalculó cada
  campo de yearsRaw[2025] a partir de líneas reales del PDF (ver comentario
  extenso ahí mismo con cada cuenta y su página de origen), incluyendo separar
  "Abonos" de "Exhibición de Espectáculos" usando la sub-línea real del anexo
  VI (el balance los junta, el Presupuesto los separa), y calcular
  "Ganancia por venta de jugadores" como neto real (ingresos de transferencias
  + rescisiones, menos gastos de transferencias/tanteo) porque el balance
  reporta esas 5 líneas por separado, no como un neto.
- Toda la cadena Revenue -> EBITDA -> Resultado Operativo -> EBIT -> PBT -> PAT
  da EXACTO (no aproximado) el "Resultado antes del efecto financiero"
  ($34.869,724928 M) y el "Superávit del ejercicio" ($35.581,462204 M)
  impresos en la página 76, se verificó sumando manualmente antes de cargar,
  y después con dos checks nuevos en verifyTieOuts(). Único hallazgo: un
  desvío de $30 (sobre ~$203 mil millones, irrelevante) entre la suma de las
  6 líneas del anexo XIII (Fútbol Juvenil) y el total que el propio anexo
  imprime, es un error de redondeo del documento original, no algo para
  corregir de este lado; se dejó documentado en vez de forzarlo a cerrar.
- Tipo de cambio: se agregó yearMeta(2025) con el dólar mayorista de CIERRE
  del ejercicio ($1.203 al 30/06/2025, fuente Rava Bursátil/BCRA), no un
  promedio del año como en 2027, porque el balance está en "moneda
  homogénea" (Nota 2.2, RT 6/17), ya reexpresado a poder adquisitivo del
  30/06/2025, así que un promedio de todo el año mezclaría poder adquisitivo
  de fechas distintas.
- Banner de "dato placeholder": renderDataQualityBannerForCurrentSelection()
  tenía el reportType de Boca hardcodeado a `year === 2027 ? official_budget :
  placeholder`, se le agregó la rama `year === 2025 ? official_balance_sheet`
  para que el banner amarillo deje de mostrarse en este ejercicio. Se agregó
  la fuente nueva 'boca-balance-2024-25' en data/clubs.js (reliability:primary).
- Copia local del PDF guardada en finance-of-sports/Clubes/Argentina/Boca/Memoria y Balance 2024-25.pdf
  (la carpeta entera está en .gitignore, así que no pesa en git). fuentes-por-club.md
  actualizado para reflejar que ya se cargó.
- Quedó pendiente (no se tocó esta sesión): el resto de los ejercicios de Boca
  (2018, 2019, 2021-2024) siguen placeholder, ver to-do #2 actualizado con el
  mismo proceso como plantilla para repetir cuando aparezcan esos documentos.


## Versión 14 — FREE TIER MUESTRA CADA CLUB "TAL CUAL LO REPORTA", Y CTA DE PREMIUM

Guido pidió, en la misma sesión que cargó el balance real de Boca 2025 (V13),
un cambio de producto: en Finanzas, el free tier ya no debía normalizar los
números de cada club a una estructura compartida, debía mostrar cada
club/ejercicio con SUS categorías reales, con acordeones y subtotales para que
se pudiera leer bien, pero sin forzar comparabilidad. Y un botón placeholder al
lado del toggle de moneda vendiendo que Premium sí va a ofrecer un formato
simple/comparable ("jugá con la copy, no la tomes literal").

- Esto resolvía, de pura casualidad de timing, una tensión que había quedado
  abierta en la V13: el balance auditado 2025 usa 11 categorías de Revenue y
  17 de Gastos, genuinamente distintas a las 9/11 del Presupuesto 2027, la
  V13 las había reclasificado a la fuerza dentro de las 9 categorías de
  siempre (con supuestos como separar "Abonos" de "Exhibición" a mano). La
  V14 revirtió esa reclasificación: ahora Boca 2025 se muestra con sus 11/17
  categorías REALES, cada una con sus propios sub-ítems donde el balance los
  desglosa (nativeFinancialsBoca[2025] en index.html, con cada número citado
  a su página/anexo de origen en el comentario).
- Se sacaron 4 funciones (plRows, renderPLTable, plRowsGeneric,
  renderPLTableGeneric) y se reemplazaron por una sola:
  renderNativePLTable(clubId, curYear, prevYear, ...) + nativeReportFor(),
  que arma {ingresos, gastos, extraRows, resultLabel} para CUALQUIER club
  (Boca, River, Racing) y lo pinta como acordeón. Para River/Racing esto fue
  casi gratis: el motor genérico YA guardaba revenueLines/expenseLines con
  rawLabel tal cual la fuente, sin forzar categorías, solo hubo que dejar
  de agregarle encima la cadena EBITDA/Resultado Operativo/EBIT de siempre.
  computeYear/computeYearGeneric (KPIs, gráficos, verifyTieOuts) NO se
  tocaron, la Versión 14 solo cambió qué se pinta en la tabla de detalle.
- Bug real encontrado y corregido en el camino: al principio, para
  River/Racing, se sumaba cur.nonCash (amortización+depreciación) como fila
  aparte DESPUÉS de ya listar todas las expenseLines, pero esas líneas ya
  estaban adentro de la lista de Gastos, así que se contaban dos veces. Se
  notó probando River en el navegador (Resultado neto daba -3.0 en vez del
  +10.0 correcto) y se corrigió sacando esa fila redundante. Buen recordatorio
  de por qué probar cada club/ejercicio en el navegador antes de dar por
  terminado un cambio de este tipo, no solo Boca.
- CTA de Premium: botón #premiumCtaBtn en el mismo div que el toggle
  USD/ARS, siempre visible (no solo para Boca). Copy final: "🔒 Formato
  difícil de comparar · Premium lo simplifica" (tooltip con la explicación
  completa). Click lleva a la pestaña Mi Cuenta (stub), no hay paywall
  real ni vista Premium construida todavía, es puro teaser. Ver to-do #3.
- Regla nueva para sesiones futuras (agregada a CLAUDE.md): todo PDF nuevo
  se transcribe COMPLETO a `pdf-extracts/<país>/<club>/<nombre>.md` antes de
  extraer datos, para que iterar sobre formato no implique releer el PDF
  (son escaneos sin capa de texto, cada relectura sale cara en tokens). Se
  aplicó retroactivamente al balance 2025:
  Clubes/Argentina/Boca/memoria-y-balance-2024-25.md
  cubre completa la sección de Estados Contables (pp. 74-139); la Memoria
  narrativa (pp. 5-73) y el informe de auditores (140-149) quedaron sin
  transcribir, marcado explícitamente como pendiente en el propio archivo.


## Versión 15 — PRIMER BALANCE REAL DE RIVER (EJERCICIO 2024), Y HALLAZGO CLAVE PARA RACING

Guido pidió retomar el to-do #1: buscar y cargar los balances reales de
River y Racing (además de los ejercicios de Boca que faltan). Se buscaron
los archivos oficiales de los 3 clubes; River y Racing resultaron tener
archivos históricos mucho más grandes de lo esperado, así que esta sesión
se concentró en River primero (a pedido explícito de Guido) y dejó Racing
extraído pero sin cargar todavía, para la próxima.

- RIVER, hallazgo importante: el dominio oficial (riverplate.com,
  antes cariverplate.com.ar) publica un PDF "memoria-AAAA-AAAA.pdf" por
  ejercicio, pero es SOLO el reporte narrativo de gestión (fútbol,
  infraestructura, redes, RSE). NUNCA incluye los estados contables. Se
  confirmó esto verificando 2 años completos (2018-19 y 2019-20) con
  búsqueda exhaustiva de palabras clave y lectura visual antes de asumir
  el patrón para los otros 5 años sin gastar el mismo esfuerzo de vuelta,
  los 3 agentes en background que estaban procesando esos otros años se
  frenaron ni bien se confirmó el patrón, para no desperdiciar presupuesto
  confirmando lo mismo 5 veces más. El balance auditado real de River
  circula por otra vía: se encontró una copia en una réplica de la
  comunidad de hinchas tuRiver (turiver.com, vía Backblaze/S3), con informe
  de auditoría independiente real y sellos de legalización, contenido
  genuino, pero canal de distribución no-oficial. Se cargó como Ejercicio
  2024 (1°/9/2023 al 31/8/2024, Ejercicio N°123 según la numeración propia
  de River) con reportType nuevo `unofficial_mirror` (banner propio,
  distinto al de "dato de prensa" y al de "placeholder").
- Los 7 PDFs de "memoria" (2018-19 a 2025) igual quedaron guardados en
  finance-of-sports/Clubes/Argentina/River/ por si sirven de contexto narrativo más
  adelante, aunque no tienen datos financieros.
- Categorías reales de River: 5 de Revenue (Fútbol Profesional, Estadio,
  Educación, Deportes y otras actividades, Socios, cada una con sub-ítems
  reales del Anexo VII) y 8 áreas de Gastos (Fútbol profesional, Educación,
  Deportes, Administración, Mantenimiento e intendencia, Servicio médico y
  asistencial, Socios, Museo, del Anexo VIII) + 3 ítems no-efectivo
  (Depreciación, Amortización de plantel, Amortización de software). Todo
  tal cual lo reporta el club, nada normalizado a las categorías de Boca.
  El desglose interno de Gastos por concepto (sueldos vs. resto) no se
  cargó porque el agente de extracción no pudo transcribir esa matriz con
  confianza suficiente por la calidad del escaneo, se prefirió omitir en
  vez de arriesgar una cifra incorrecta (documentado en el .md y en el
  código). Por eso el stat "Salarios/Ingresos" de River 2024 da 0%, no es
  un error, es una limitación de la fuente.
- Discrepancia real encontrada y resuelta antes de cargar: la transcripción
  traía dos valores distintos para "Depreciación de bienes de uso"
  ($5.984.158.778 vs $5.594.158.778 en dos lugares del mismo documento). Se
  verificó por aritmética propia (sumar categorías conocidas hasta llegar
  al Total de Gastos Ordinarios ya confirmado) cuál de los dos era el
  correcto (el primero) antes de cargar nada, la extracción de un agente
  no es garantía de exactitud, hay que cruzarla igual.
- Cambio de código chico pero real en `nativeReportFor()` (buscar "MULTI-CLUB"):
  ahora los clubes del motor genérico (River/Racing) también pueden tener
  sub-ítems reales en el acordeón (antes solo Boca podía, vía items:null
  hardcodeado), alcanza con agregar `items:[...]` directo en la línea de
  revenueLines/expenseLines. También se agregó `meta.extraRows` como
  mecanismo opcional para clubes que necesitan más de una fila propia
  debajo de Gastos con etiquetas custom (River 2024 tiene "Resultados
  financieros" Y "Otros egresos" como dos líneas separadas, no una sola),
  si no se define, el comportamiento viejo (una fila por cada campo de
  meta: profitOnPlayerSales/assetSales/netInterest/tax) sigue igual, así
  que Racing no se vio afectado.
- RACING, extraído pero NO cargado todavía (queda para la próxima sesión,
  ver to-do #1): Presupuesto 2025-26 oficial (upgrade real del dato de
  prensa actual), Balance FY2023/24 (gestión Blanco, DÉFICIT real de
  $6.127.619.872 ARS) y Balance FY2024/25 (gestión Milito, déficit real de
  $178.451.821 ARS), los tres PDFs de Racing, a diferencia de Boca y
  River, tienen texto extraíble directo con pdftotext (no son escaneos),
  así que la extracción salió mucho más barata en tokens. El hallazgo más
  importante: los dos ejercicios reales de Racing dieron DÉFICIT, muy
  distinto del placeholder actual que muestra un superávit inventado para
  la gestión Blanco.
- Se descargaron y guardaron los ~24 PDFs oficiales completos del archivo
  de racingclub.com.ar/informes/ (2009 a 2027) en finance-of-sports/Clubes/Argentina/Racing/,
  a pedido de Guido de tener todo guardado para poder chequear a mano.


## Versión 16 — LOS 3 DATOS REALES DE RACING QUEDARON CARGADOS AL SITIO

Continuación directa de la Versión 15, misma sesión: Guido pidió cargar lo
que había quedado extraído de Racing (Ejercicio 2024, Ejercicio 2025 y el
Presupuesto 2026), ver el detalle completo de las cifras y el hallazgo del
déficit real en la Versión 15, este bloque es solo el "cómo se cargó".

- racing-data.js: Ejercicio 2024 (Blanco, balance auditado real, 9
  categorías de Revenue + 8 de Gastos del Anexo III/IV) y Ejercicio 2025
  (Milito, balance auditado real, 10 categorías de Revenue + 9 de Gastos,
  un rubro nuevo, "Sede Villa del Parque", que 2024 no tenía) reemplazaron
  los placeholders anteriores. Ejercicio 2026 (Presupuesto Financiero de
  Ingresos y Egresos oficial, con sub-ítems reales por categoría) reemplazó
  el dato de prensa. Todo tal cual lo reporta el club, sin normalizar entre
  ejercicios ni forzarlo a las categorías de Boca: "Costo transferencia de
  jugadores" y "Transferencia de jugadores" quedan como dos líneas
  ordinarias separadas (no netas), porque así las presenta el propio
  Estado de Recursos y Gastos de Racing.
- Conversión a USD: los balances 2024/2025 con el dólar mayorista de CIERRE
  de cada ejercicio ($912 al 28/6/2024, $1.203 al 30/6/2025, mismo
  criterio que Boca 2025 y River 2024, moneda homogénea reexpresada a una
  fecha puntual). El Presupuesto 2026, al ser una proyección futura sin
  cierre real, se convirtió con el tipo de cambio PROMEDIO que el propio
  presupuesto declara como premisa ($1.438), mismo criterio que Boca 2027.
- Racing no separa una línea de "deuda financiera" del resto del pasivo en
  su balance (a diferencia de Boca y River): grossDebt de Racing es el
  TOTAL DEL PASIVO completo, documentado así en el código para que no se
  confunda con préstamos bancarios aislados.
- gestionesByClub.racing.milito pasó de {firstYear:2026, lastYear:2026} a
  {firstYear:2025, lastYear:2026}: ahora "Por gestión" compara el primer
  ejercicio real completo de Milito (2025) contra el presupuesto vigente
  (2026), en vez de comparar el presupuesto contra sí mismo.
- verifyTieOuts() sumó 6 checks nuevos (Revenue/Expenses/PAT para 2024 y
  2025 de Racing), los de Expenses comparan contra el total que INCLUYE
  Depreciaciones/Previsiones (porque esas dos se cargaron como líneas de
  expenseLines, no como meta, a diferencia del presupuesto 2026 donde todo
  cae en wages/otherExpenses sin nonCash aparte). Los 14 checks totales del
  sitio (Boca+Racing+River) pasan.
- pdf-extracts/ sumó 3 archivos nuevos (racing-presupuesto-2025-26.md,
  racing-balance-2023-24.md, racing-balance-2024-25.md), mucho más
  simples que los de Boca/River porque estos PDFs ya tienen texto nativo,
  alcanzó con guardar el output de pdftotext -layout con un encabezado.
- Probado en navegador: los 3 ejercicios de Racing, "Comparar Gestiones"
  Milito vs. Blanco, y una pasada de regresión rápida de Boca 2025 y River
  2024 para confirmar que no se rompió nada compartido (renderNativePLTable
  es una sola función para los 3 clubes desde la Versión 14).


## Versión 17 — REORGANIZACIÓN DE CARPETAS DE PDFs. YA NO ESCALABA UNA POR CLUB

Guido notó que cada club nuevo estaba generando su propia carpeta suelta al
nivel raíz (racing-pdfs/, river-pdfs/) y pidió una estructura que escale a
más clubes sin repetir el patrón. Solo reorganización de archivos y
documentación, ningún dato ni número cambió.

- Carpeta nueva `PDFs/<país>/<club>/` reemplaza a las carpetas sueltas
  `racing-pdfs/` y `river-pdfs/` (y a los dos PDFs de Boca que vivían
  sueltos en la raíz del proyecto). Hoy: `PDFs/argentina/boca/`,
  `PDFs/argentina/river/` (con su subcarpeta `estados-contables-leads/`
  intacta), `PDFs/argentina/racing/`. Mismo criterio para
  `pdf-extracts/<país>/<club>/` (antes todo junto y plano en
  `pdf-extracts/`), hoy `pdf-extracts/argentina/boca/`,
  `pdf-extracts/argentina/river/`, `pdf-extracts/argentina/racing/`.
  [NOTA: esta estructura PDFs/ + pdf-extracts/ en paralelo se reemplazó de
  nuevo en la Versión 28, ver esa entrada. Se deja esta descripción tal
  cual estaba escrita en su momento, como registro histórico de lo que era
  cierto en la Versión 17, no de la estructura actual.]
- El país va en minúscula sin tildes (`argentina`), mismo criterio que los
  `clubId` que ya usa el sitio. Regla documentada en CLAUDE.md, sección
  "Estructura de carpetas de PDFs", el próximo club (de cualquier país)
  sigue este mismo patrón, nunca una carpeta nueva al nivel raíz.
- Todas las referencias de texto a las rutas viejas (comentarios de este
  bloque, `data/clubs.js`, `data/river-data.js`, `data/racing-data.js`,
  `fuentes-por-club.md`, `CLAUDE.md`) se actualizaron a las rutas nuevas.
  Ningún path viejo queda referenciado en el proyecto salvo dentro de esta
  misma entrada de changelog, a propósito, para dejar constancia de qué se
  renombró.
- No se tocó ningún nombre de archivo individual (los .pdf y .md mantienen
  el mismo nombre de siempre, ej. `racing-balance-2024-25.md` sigue
  llamándose así aunque ahora viva en `pdf-extracts/argentina/racing/`),
  cambió solo dónde viven, no cómo se llaman.


## Versión 18 — EJERCICIOS EN FORMATO AAAA/AAAA, ESPACIADO DE FINANZAS, Y ACORDEONES REDUNDANTES FUERA

Guido pidió tres ajustes de UI en Finanzas después de revisar capturas del sitio: el
espacio entre la fila de stats (Ingresos/Gastos/Resultado Neto/Deuda Neta) y la tarjeta
"Estado de resultados" se veía inconsistente con el resto del espaciado del sitio; los
"ejercicios" del fútbol argentino cruzan dos años calendario (Boca/Racing: julio a junio;
River: septiembre a agosto) y mostrar solo el año de cierre ("Ejercicio 2027") no es como
lo lee un hincha, están acostumbrados al formato "2026/2027"; y dentro del acordeón
"Presupuesto 2026/2027 (oficial)" de Boca, dos de las seis secciones quedaron redundantes
con la tarjeta de stats de arriba.

- Espaciado: `.card`, `.controls` y `.grid` tenían margin-bottom de 18px/20px/20px
  respectivamente, visualmente parecido pero no idéntico, y el salto entre la fila de
  stats y la siguiente tarjeta se sentía más chico que el resto. Los tres quedaron en
  24px parejo, así que todo el ritmo vertical del sitio (no solo Finanzas) es consistente.
- Formato de ejercicio: se agregó un helper nuevo, `ejercicioLabel(year, suffix)` (buscar
  "ejercicioLabel" en el `<script>`), que devuelve `Ejercicio {year-1}/{year}`, ambos
  clubes con ejercicio julio-junio (Boca, Racing) y el de septiembre-agosto (River) se
  identifican por el año en que TERMINAN, así que restar 1 al year siempre da el año de
  inicio correcto sin importar el mes exacto de corte. Reemplazó los `'Ejercicio '+year`
  sueltos en `computeYear()` y `computeYearGeneric()`, el generador de opciones del
  selector "Año a año" (antes hardcodeado por club, ahora también usa el helper para
  River/Racing agregando "(presupuestado)" cuando `meta.reportType === 'official_budget'`,
  igual que ya hacía Boca para 2027), y las notas/tooltips sueltas de Finanzas y Fuentes
  que mencionaban el año de Boca a secas. `yearsRaw`/`computeYear(year)`/las opciones
  `value="2027"` etc. NO se tocaron, son claves internas, no texto para mostrar; el
  helper solo cambia lo que se pinta en pantalla.
- Acordeones redundantes: dentro de "Presupuesto 2026/2027 (oficial)" de Boca, se
  sacaron "Presupuesto Económico (resumen)" (tabla plana de categorías/totales, ya
  cubierta por la tarjeta de 4 stats de arriba del acordeón) y "Apertura de Ingresos"
  (desglose anidado por categoría de Revenue, resulta que YA está disponible sin
  duplicar nada: `nativeReportFor()` arma la fila de Ingresos del Ejercicio 2027 con
  `items:(rb&&rb[k])` desde `revenueBreakdown[2027]`, que es el mismo objeto de datos
  que alimentaba este acordeón, así que la tabla "Estado de resultados" de más arriba en
  Finanzas ya muestra ese desglose al hacer click en cada rubro ▸). Se preguntó
  explícitamente si "Apertura de Gastos" corría la misma suerte, y la respuesta fue no:
  para gastos, `nativeReportFor()` hardcodea `items:null` (ver rama `year===2027` en la
  función), el detalle por sub-ítem (ej. sueldos por área) NO está en ningún otro lado
  del sitio, así que ese acordeón se mantuvo. Quedaron 4 de los 6 acordeones originales:
  Premisas de presupuestación, Apertura de Gastos, Presupuesto Financiero, Presupuesto
  de Inversiones, los dos últimos también se mantuvieron porque tienen datos propios
  (flujo de caja con créditos/deudas del ejercicio anterior; desglose de obras) que no
  aparecen en ningún otro lugar de la página.
- Ningún número cambió: los tres ajustes son de presentación (CSS, texto de labels,
  qué acordeón se muestra), no de datos. `verifyTieOuts()` sigue pasando los 14 checks
  después del cambio (se probó en el navegador con los 3 clubes).


## Versión 19 — TOGGLE AÑO-A-AÑO POR DEFECTO, MÁS ESPACIO TODAVÍA, Y "APERTURA DE GASTOS" MIGRÓ AL DETALLE

Guido pidió tres cambios más sobre Finanzas después de otra ronda de capturas: invertir el
toggle Por gestión/Año a año (Año a año a la izquierda y por defecto), más aire porque el
ajuste de la Versión 18 (20px→24px) seguía sin sentirse como un corte real entre secciones, y
mover el contenido del acordeón "Apertura de Gastos" (dentro de "Presupuesto 2026/2027
(oficial)") a la tabla principal "Estado de resultados", con la instrucción explícita de que
NINGÚN dato se podía perder en la migración, incluyendo que los sub-ítems se convirtieran a
USD con el mismo tipo de cambio que ya usa toda la tabla.

- Toggle invertido: en el HTML, el botón "Año a año" ahora va primero y con `class="active"`;
  "Por gestión" quedó segundo, sin la clase. `gestionSelectWrap` pasó a `display:none` por
  defecto y `anioSelectWrap` quedó visible (antes era al revés). La función `refreshFinanzas()`
  ya leía el botón con `class="active"` del DOM para decidir gestión-vs-año (no había ningún
  booleano separado que sincronizar a mano), así que alcanzó con este swap en el HTML. Se
  aprovechó para arreglar un cabo suelto: el `INIT` al final del script llamaba directo a
  `updateFinanzasByGestion()`, ignorando el toggle, se cambió a `refreshFinanzas()` para que el
  arranque del sitio siempre siga lo que diga el HTML, y no haga falta tocar dos lugares si el
  default vuelve a cambiar en el futuro.
- Espaciado: el ajuste de la V18 (18/20px → 24px parejo) no alcanzó. Guido lo marcó "todavía
  sin espacio" con una captura donde el corte entre la fila de stats y la tarjeta de abajo seguía
  sin leerse como un corte real. Se subió `.card`/`.controls`/`.grid` de 24px a 32px, Y se le dio
  más aire al dupla título-de-tarjeta → contenido (antes casi pegados: `h2{margin:0 0 4px}`,
  ahora `margin:0 0 16px`), ese segundo ajuste fue nuevo en esta versión, la V18 no lo había
  tocado. Medido en el navegador con getBoundingClientRect(): 32px entre la grilla de stats y la
  tarjeta siguiente, 16px entre cualquier `<h2>` y lo que sigue.
- "Apertura de Gastos" migró a la tabla principal: la Versión 18 había dejado ese acordeón
  porque `nativeReportFor()` hardcodeaba `items:null` para Gastos del Ejercicio 2027 (a
  diferencia de Ingresos, que sí lee sub-ítems de `revenueBreakdown[2027]`). El acordeón de
  Gastos era una jerarquía real de HASTA 4 NIVELES (categoría → sub-gerencia/área → sub-grupo
  tipo "Canjes"/"Depto Medico" → línea de gasto, no un desglose plano de un solo nivel como el
  de Ingresos), así que no alcanzaba con copiar el patrón de Ingresos tal cual: hubo que extender
  el mecanismo de sub-ítems para que sea recursivo.
  - Para no transcribir a mano ~434 líneas de gasto (con alto riesgo de error de tipeo en un
    trabajo así de repetitivo), se extrajo el HTML del acordeón viejo a un archivo aparte y se
    parseó programáticamente con un script Python (BeautifulSoup) que reconstruye la jerarquía
    completa, calculando el subtotal de los sub-grupos sin total propio impreso (ej. "Canjes")
    como la suma de sus líneas. Antes de tocar el sitio, se verificó en el propio script que
    CADA nodo, en TODOS los niveles, cierra exacto contra la suma de sus hijos (0 mismatches en
    434 líneas), y que las 11 categorías de gasto siguen sumando exacto los mismos
    $235.989.861.000 de siempre.
  - Nueva estructura `expenseSubBreakdown[2027]` en el `<script>` (al lado de
    `expenseBreakdown`): un objeto por categoría (mismas claves que usa
    `expenseBreakdown[2027].expenses`, ej. `'Fútbol Profesional'`), cada uno con arrays
    recursivos `[label, value, items?]`, el tercer elemento opcional es otro array del mismo
    formato, así que un nodo puede tener sub-ítems que a su vez tengan sub-ítems, sin límite de
    profundidad. `nativeReportFor()` ahora arma `gastos` cruzando cada categoría con
    `expenseSubBreakdown[2027][label]` (antes: `items:null` fijo).
  - `buildNativeSectionHtml()`/`renderNativePLTable()` (que ya sabían pintar UN nivel de
    sub-ítems, reusado tal cual para Ingresos) se separaron en una función nueva,
    `renderBreakdownRows()`, recursiva: si un item tiene sub-ítems propios, se pinta como su
    propio acordeón anidado (flecha + `onclick` propio), indentado un poco más que su padre.
    `toggleRevenueBreakdown()` se completó con `collapseBreakdownGroup()`: al cerrar un grupo,
    cierra en cascada cualquier sub-grupo que hubiera quedado abierto adentro (y resetea sus
    flechas), sin esto, cerrar un nivel padre podía dejar filas nietas visibles y huérfanas.
    Cada sub-ítem pasa por `nativeDisplayVal()` igual que las categorías de primer nivel, así que
    la conversión a USD (o el toggle a ARS) alcanza también a las líneas más profundas del
    desglose, sin código nuevo para eso, era justamente lo que pedía Guido con "do also the USD
    number exchange rate".
  - Se probó en el navegador expandiendo 4 niveles de profundidad (Fútbol Profesional → Gerencia
    de Fútbol Profesional → Depto Medico → las 2 líneas de gasto médico) y confirmando que
    colapsar el nivel de arriba cierra todo en cascada sin dejar filas sueltas.
  - El acordeón "Apertura de Gastos" completo (995-1779 antes de este cambio) se borró de
    "Presupuesto 2026/2027 (oficial)", que ahora tiene 3 acordeones (Premisas de
    presupuestación, Presupuesto Financiero, Presupuesto de Inversiones) en vez de 4, el
    contenido no se perdió, vive en `expenseSubBreakdown[2027]` y se ve expandiendo cualquier
    categoría de Gastos en "Estado de resultados".
- Los dos labels de categoría que en el acordeón viejo llevaban un sufijo aclaratorio
  ("Otros Deportes (gastos)", "Comerciales (gasto)", para no confundirse con las categorías de
  Ingresos homónimas que convivían en ESE acordeón) se remapearon a los nombres sin sufijo que
  usa `expenseBreakdown[2027].expenses` ("Otros Deportes", "Comerciales"), que es la clave que
  `nativeReportFor()` usa para buscar el desglose. Sin este remap, esas dos categorías
  específicas se hubieran quedado sin flecha/sub-ítems por un simple desencuentro de nombres.
- `verifyTieOuts()` sigue pasando los 14 checks después del cambio, no se tocó ningún total,
  sólo se agregó detalle nuevo debajo de categorías que antes solo mostraban un número plano.


## Versión 20 — 3 EJERCICIOS HISTÓRICOS DE RACING PRE-BLANCO (2008/09, 2009/10, 2010/11)

Guido pidió usar el resto del presupuesto semanal en algo que sumara valor real al sitio antes de
que se reseteara. Se retomó el to-do #1 (Racing): de los ~19 años históricos que quedaban sin
cargar, se procesaron los 3 más viejos y más simples.

- Primero se auditó la afirmación de sesiones anteriores de que "todos los PDFs de Racing tienen
  texto extraíble", resultó ser FALSA para buena parte del archivo. Se corrió pdftotext sobre los
  24 PDFs y se midió chars-extraídos/página: 2009, 2010, 2011, 2019-20 y 2021 (balances) más
  presupuesto2017-18 SÍ tienen texto nativo (2.000-3.500 chars/página); balance2012 a balance2018
  (7 años) y 4 presupuestos viejos (2013-14/2015-16/2018-19/2019-20) son ESCANEOS puros (~1
  char/página, prácticamente nada), necesitarían el Read tool sobre imágenes de página, mucho más
  caro en tokens (mismo proceso que se usó para el balance de Boca 2025). Esta corrección quedó
  documentada en el to-do y en el comentario de `data/racing-data.js`, para que una sesión futura
  no vuelva a asumir que pdftotext alcanza para esos años.
- Se cargaron los Ejercicios N° 107, 108 y 109 (1°/11/2008-31/10/2009, 1°/11/2009-31/10/2010,
  1°/11/2010-31/10/2011. Racing todavía usaba un ciclo noviembre-octubre en esta época, distinto
  del julio-junio de los ejercicios más recientes). Categorías reales de Recursos y Gastos
  (Cuotas Sociales, Televisación, Campeonatos Oficiales, Transferencia de Jugadores, Sueldos,
  Fútbol Profesional, etc., via Anexo II/III de cada balance), con `Resultados Financieros`
  llevado neto a `netInterest` (mismo criterio que 2024-2026) en vez de como línea de
  ingreso/gasto.
- Conversión a USD: estos balances son de antes de la práctica de "moneda homogénea"/RT6 (que se
  generalizó recién con la inflación de los 2020), así que se convirtieron directo con el dólar
  mayorista de CIERRE de cada ejercicio: $3,82 (31/10/09, cotización real de fecha cercana
  encontrada por web search), y $3,98/$4,27 (31/10/10 y 31/10/11, INTERPOLADOS linealmente entre
  los valores de apertura/cierre de cada año calendario, no se encontró la cotización exacta del
  día puntual en las fuentes consultadas). Esto es una aproximación, documentada como tal en
  `data/clubs.js` y `data/racing-data.js`, no una cotización exacta como la de los ejercicios
  2024+.
- Verificación: en vez de agregar checks de Revenue/Expenses por separado a `verifyTieOuts()` (el
  propio documento agrupa "Amortizaciones" y "Resultados Financieros" de forma distinta según el
  año dentro de sus propios totales impresos, así que un check automático año por año hubiera sido
  frágil), se verificó a mano que Revenue + Expenses + netInterest da el RESULTADO FINAL impreso en
  cada balance, con un desvío de centésimas de millón de USD (ruido de la interpolación de tipo de
  cambio, no un error de carga): 2009 computado 0.704 vs impreso 0.703; 2010 -2.439 vs -2.441; 2011
  0.063 vs 0.063 (exacto). Se encontró y corrigió un hallazgo real en el camino: el balance 2011
  imprime su resultado como "RESULTADO FINAL (Pérdida)" pese a que el valor es POSITIVO
  ($267.202), un rótulo de plantilla del año anterior mal actualizado en el documento original,
  detectado sumando a mano antes de cargar nada (no se tomó el rótulo del PDF como verdad sin
  verificar la aritmética).
- Gestión: estos 3 ejercicios son anteriores a la presidencia de Blanco (asumió en 2013). Racing
  venía de una quiebra (el propio balance 2009 tiene una línea "Resultado Extraordinario s/Quiebra")
  y no se pudo identificar con confianza quién presidía el club específicamente en 2009-2011. Se
  decidió NO inventar una atribución de gestión: estos años se cargaron solo en el selector "Año a
  año" (automático via `Object.keys(racingFiscalYearMeta)`), sin `gestionId` ni entrada en
  `gestionesByClub.racing`.
- Transcripción a Markdown (regla de CLAUDE.md): se transcribieron `Clubes/Argentina/Racing/
  racing-balance-{2009,2010,2011}.md`, pero PARCIAL, solo las tablas de Estado de Recursos y
  Gastos + Anexo II/III + Balance General que se usaron para cargar el sitio, no la Memoria
  narrativa completa (por presupuesto de tiempo). Cada archivo lo dice explícitamente en su
  primera línea, siguiendo el mismo criterio que ya se usó para el balance de Boca 2025 cuando
  quedó algo sin transcribir.
- Nuevas fuentes en `data/clubs.js`: `racing-balance-2009`, `racing-balance-2010`,
  `racing-balance-2011` (reliability:primary, type:official_balance_sheet).
- Se probó en el navegador: los 3 años nuevos aparecen en el selector "Año a año" de Racing con el
  label correcto (`Ejercicio 2008/2009`, etc.), la tabla "Estado de resultados" desglosa cada
  categoría con sus sub-ítems, el banner de "dato placeholder" queda oculto (correctamente, son
  balances reales), y los 14 checks de `verifyTieOuts()` existentes siguen pasando sin
  modificación, no se tocó ningún dato de los años ya cargados.


## Versión 21 — CARD "PRESUPUESTO 2026/2027" DIVIDIDO EN 3, Y trendChart YA NO INVENTA DATOS

Guido pidió 3 cosas sobre la tab Finanzas (Boca): de dónde sale el dato del card Deuda (pregunta,
sin cambio de código), un gráfico de barras nuevo en el card Gráficos, y dividir el card
"Presupuesto 2026/2027 (oficial)" en varios cards. Antes de tocar el gráfico se le preguntó a
Guido qué quería graficar exactamente (la pregunta era ambigua: ¿un gráfico nuevo de Deuda, o
arreglar el trendChart de Ingresos/Gastos que ya existía?), eligió lo segundo.

- Respuesta sobre el card Deuda (sin cambio de código): los valores salen de `grossDebt`/`cash`
  dentro de `yearsRaw[year]` (Boca) o `racingFiscalYearMeta`/`riverFiscalYearMeta` (River/Racing),
  vía `computeYear`/`computeYearGeneric` (`netDebt = grossDebt - cash`) y
  `renderDebtBlock`/`renderDebtBlockGeneric`. Para Boca, SOLO el Ejercicio 2025 tiene deuda real
  (grossDebt = Total Deudas corrientes+no corrientes, nota 6.1 del balance auditado, pág. 75/104;
  cash = Caja y bancos, nota 5.1, pág. 75/101, ver comentario junto a `yearsRaw[2025]`). El
  Ejercicio 2027 (presupuesto) tiene grossDebt=cash=0 porque el documento no desglosa deuda en su
  resumen económico, NO porque la deuda real sea cero. El resto de los ejercicios de Boca
  (2018/2019/2021/2022/2023/2024) son placeholder puro, números inventados.
- trendChart (Ingresos/Gastos por ejercicio, card Gráficos) ya NO grafica el número placeholder
  inventado para los ejercicios sin balance/presupuesto real, esos ejercicios quedan con la barra
  vacía (dataset en `null`, Chart.js no dibuja nada ahí) hasta que se cargue un dato real. Nuevo
  helper `bocaYearIsReal(year)` (junto a `yearMeta`) centraliza el criterio para Boca (año 2027 o
  2025); River/Racing usan el `reportType` que ya tenían en riverFiscalYearMeta/racingFiscalYearMeta
  (placeholder → barra vacía; official_budget/official_balance_sheet/press_estimate/
  unofficial_mirror → se grafican, son cifras reportadas aunque no siempre primarias). Se
  aprovechó para agregar título a los ejes ($ en Y, Ejercicio en X) en ambas variantes del gráfico
  (drawTrendChart y drawTrendChartGeneric, esta última ahora recibe clubId como primer argumento).
- Card "Presupuesto 2026/2027 (oficial)" dividido en 3 cards independientes, mismo contenido, sin
  perder ningún dato: "Supuestos" (id `bocaSupuestosCard`, stats del presupuesto + lo que antes era
  el acordeón colapsable "Premisas de presupuestación", ahora mostrado directo sin acordeón, tal
  como pidió Guido), "Presupuesto Financiero" (id `bocaPresupuestoFinancieroCard`, la tabla de
  saldo inicial/ingresos/gastos/saldo al cierre) y "Presupuesto de Inversiones" (id
  `bocaPresupuestoInversionesCard`, mantiene los 4 acordeones anidados A-D, son largos y sí ameritan
  quedar colapsables). Las 3 comparten la clase `.bocaPresupuestoOficialCard` para el show/hide por
  club (antes era un solo id), `refreshAllForClub()` ahora hace
  `document.querySelectorAll('.bocaPresupuestoOficialCard').forEach(...)` en vez de
  `getElementById`.
- Probado en el navegador: los 3 cards nuevos aparecen con su contenido completo para Boca y se
  ocultan los 3 al cambiar a River/Racing (antes solo había un id que ocultar); sin errores de
  consola; los 14 checks de `verifyTieOuts()` siguen pasando (no se tocó `yearsRaw` ni
  `computeYear`, solo el HTML del card y las funciones de gráfico).


## Versión 22 — BUG REAL EN EL CDN DE CHART.JS (nunca se veían los gráficos), Y 8 AJUSTES DE UX EN FINANZAS

Guido reportó 9 cosas puntuales sobre la tab Finanzas (Boca, "Año a año"). La más importante: "no
veo el gráfico", resultó ser un bug real, no una limitación del entorno de preview: la versión de
Chart.js pineada (`4.4.4`) NUNCA existió en cdnjs (se confirmó con `curl` contra `api.cdnjs.com`:
las versiones publicadas van de 3.x a 4.5.1, sin ningún 4.4.4), así que el `<script src>` daba 404 y
`Chart` quedaba `undefined` para TODOS los visitantes reales, no solo en el sandbox de esta sesión.
`drawTrendChart`/`drawBreakdownChart` tienen un `if(typeof Chart === 'undefined') return;` que
hacía fallar el gráfico en silencio, sin error visible. Corregido a `4.5.1` (la última versión real
que sí publica `chart.umd.min.js`, confirmado con `curl -I` devolviendo 200 y contenido UMD, no
ESM). Documentado por si un futuro `npm audit`/upgrade toca este script tag: verificar SIEMPRE con
`curl -I` contra la URL exacta antes de pinear una versión de una librería por CDN, no asumir que el
número de versión existe.

Los otros 8 pedidos, todos en Finanzas (Boca, card por card):
- Estado de resultados: en "Año a año" las columnas Anterior/Var./Var. % quedaban siempre vacías
  (no hay ejercicio anterior comparable: o no existe, o sus categorías no coinciden con las del
  ejercicio actual). Se ocultan ahora solo en ese modo (clase nueva `pl-hide-compare` en
  `#finanzasPLTable`, toggleada en `updateFinanzasByAnio`/`updateFinanzasByAnioGeneric` vs.
  `updateFinanzasByGestion`/`...Generic`, que SÍ las muestran, ahí una gestión con 2 ejercicios reales
  cargados sí puede tener una comparación real). El espacio libre se usa alineando la columna de
  montos a la derecha (mismo criterio visual que un estado de resultados de verdad).
- Fuente duplicada 3 veces (Supuestos/Presupuesto Financiero/Presupuesto de Inversiones, texto
  idéntico): se dejó una sola vez, al fondo de todo (después de Presupuesto de Inversiones),
  reformulada para aclarar que aplica a los 3 cards de arriba.
- Se sacó la nota FX de "Año a año" para el Ejercicio 2027 (pedido explícito de Guido, quedaba
  repetitiva/con demasiado detalle) y se le sacó a la nota equivalente de "Por gestión" la frase "No
  incluye deuda...", esa aclaración ahora vive en el lugar correcto (ver punto siguiente), no
  dispersa en una nota de conversión de moneda.
- REGLA GENERAL NUEVA (no solo Boca 2027): cuando un documento OFICIAL (no placeholder, ya tiene su
  propio aviso vía el banner de arriba) reporta Deuda bruta = Caja = 0, eso case-seguro significa que
  el documento no desglosa deuda/caja en su resumen, no que la deuda sea cero real. Nuevo helper
  `debtDisclosureNote()` + elemento `#finanzasDebtNote` (dentro del card Deuda) que muestra un
  aviso ⚠️ explícito cuando pasa esto, para Boca (`renderDebtBlock`, via `bocaYearIsReal`) y para
  River/Racing (`renderDebtBlockGeneric`, via `meta.reportType !== 'placeholder'`), probado en vivo:
  Boca Ejercicio 2027 y Racing Ejercicio 2025/2026 (ambos presupuestos oficiales sin desglose de
  deuda) muestran el aviso correctamente.
- Card Deuda y card Gráficos: agregado un `<p class="subtitle">` explicando en criollo qué es cada
  cifra y para qué sirve (mismo criterio para Estado de resultados, Supuestos, Presupuesto
  Financiero y Presupuesto de Inversiones), pensado para un hincha común, no alguien que ya sabe
  leer un balance.
- Card Supuestos: se sacaron los 4 stats (Total Ingresos, Total Gastos, Resultado Económico, Tipo
  de cambio) que habían quedado ahí desde el split de la Versión 21, no son "supuestos", son
  resultados; quedó solo el contenido real de premisas de presupuestación.
- Card Presupuesto Financiero: arriba de la tabla se agregó una fila de bloques tipo "cascada"
  (`.waterfall-row`) mostrando Saldo Inicial + Créditos a cobrar + Ingresos − Deudas a pagar −
  Gastos − Inversiones Obras = Saldo al Cierre, verificado a mano que suma exacto
  (6.045.520.000 + 8.170.900.000 + 239.226.960.000 − 12.601.624.000 − 194.009.816.000 −
  41.767.058.000 = 5.064.882.000) antes de cargarlo, para que un hincha entienda de un vistazo cómo
  se llega al resultado antes de bajar a la tabla con el detalle rubro por rubro.
- Card Presupuesto de Inversiones (y de paso, Presupuesto Financiero): los montos de las 4 tablas
  anidadas (A/B/C/D) no alineaban entre sí, cada `<table class="mini-table">` calculaba el ancho de
  su columna de monto según el contenido de esa tabla sola. Se agregó `table-layout:fixed` +
  `<colgroup><col><col style="width:130px"></colgroup>` a las 6 tablas `.mini-table` del card
  (antes solo se había puesto `width:130px` por CSS en `td.amount`, pero con `table-layout:fixed` el
  algoritmo de columnas SOLO mira la primera fila de cada tabla para fijar anchos, las tablas B y C
  arrancan con una fila `subhead` de `colspan="2"`, así que ese `width` se ignoraba ahí; con
  `<colgroup>` el ancho queda fijo sin depender de qué fila viene primero). Verificado con JS en
  consola: las 92 celdas `.amount` del sitio miden exactamente 130px, sin excepciones.
- Probado en el navegador para Boca y Racing, "Año a año" y "Por gestión": sin errores de consola,
  los 14 checks de `verifyTieOuts()` siguen pasando, el toggle de columnas y el aviso de deuda no
  desglosada cambian correctamente al cambiar de club/ejercicio/vista.


## Versión 23 — BUG REAL DE "GASTOS" DESCALZADO CON LA TABLA, Y 5 AJUSTES MÁS DE COPY/UX EN FINANZAS

Guido volvió a pasar 6 pedidos puntuales sobre Finanzas. El más importante: "¿por qué Gastos arriba
da menos que el Total Gastos de la tabla?", resultó ser otro bug real (Guido sospechaba de
Inversiones/Obras, pero no era eso):

- BUG: el stat "Gastos" de arriba de Finanzas (`renderFinanzasStatsFromComputed`/`...Generic`) salía
  de `cur.expenses` (computeYear), que es SOLO wages+otherExpenses, no incluye amortización de
  pases ni depreciación (`cur.nonCash`). La tabla "Estado de resultados" de abajo, en cambio, para
  los ejercicios con documento real (Boca 2025/2027 vía `nativeFinancialsBoca`/`expenseBreakdown`)
  SÍ lista esas amortizaciones como categorías propias dentro de "Total Gastos", por eso el stat de
  arriba (111.1 M USD) daba menos que la tabla (142.2 M USD): el stat ignoraba una categoría real de
  gasto que la tabla sí mostraba, no un tema de Inversiones/Obras (esas ya estaban excluidas de
  ambos números, correctamente, en los dos lugares). Corregido de raíz en vez de parcheado: ahora
  `renderNativePLTable()` DEVUELVE `{ingresosTotal, gastosTotal, resultado}` (los mismos totales que
  ya pinta en la tabla) y los 4 `update*()` de Finanzas pasan ese `gastosTotal` al stat de arriba,
  una sola fuente de verdad, no dos cálculos separados que puedan desalinearse en el futuro.
  Verificado en vivo: Gastos arriba ahora da 142.2 M USD, igual que "Total Gastos" de la tabla.
- Estado de resultados: subtitle simplificado ("En ingresos ves... y en gastos ves...", antes hablaba
  de "superávit o déficit" de más). Su nota de fuente (bocajuniors.com.ar/...) se sacó del card y
  pasó a una línea sola al final de TODA la sección Finanzas (no dentro de ningún card Boca-only,
  para que se siga viendo con River/Racing seleccionados, ya que esa tabla también aplica a esos
  clubes).
- Card Deuda: se sacó "el número que mejor resume si las cuentas están sanas o complicadas" del
  subtítulo (quedaba redundante, y el subtítulo empezaba con un em dash que se sacó también).
- Card Gráficos: 2 fixes de Chart.js. (1) el título "$" del eje Y salía siempre rotado 90°
  ("acostado"). Chart.js no tiene una opción para evitarlo en el título nativo del eje, así que se
  armó un plugin chico (`dollarAxisLabelPlugin`, `afterDraw`) que lo dibuja aparte, derecho, arriba
  del eje, con `scales.y.title.display:false` para no duplicar. (2) En el pie/doughnut: las
  referencias (leyenda) ahora muestran el % de cada porción (`legendLabelsWithPct`, un
  `generateLabels` custom. Chart.js no lo trae de fábrica) y quedan alineadas entre sí
  (`align:'start'`, todas arrancan del mismo borde en vez de centradas con largos dispares). La
  categoría combinada de Boca "Otros (deportes+basket+juvenil+fem.)" pasó a decir solo "Otros".
- Card Supuestos: sacados los em dashes y la frase "Es el presupuesto real presentado por el club,
  no un placeholder" (redundante con el resto del texto).
- Card Presupuesto Financiero: los bloques en cascada (Versión 22) eran HTML estático en ARS fijo,
  ahora se arman en JS (`presupuestoFinanciero2027[]` + `renderPresupuestoFinancieroWaterfall()`,
  llamada desde `refreshFinanzas()`) usando `toDisplayValue`/`fmtAmountPlain`, así que responden al
  toggle USD/ARS igual que el resto de Finanzas, con los montos abreviados (ej. "$6.0 mil M ARS" en
  vez del peso completo). Se sacó "ej. anterior" de las etiquetas ("Créditos a cobrar", "Deudas a
  pagar" a secas) por pedido de Guido, se sobreentiende.
- Probado en el navegador: Gastos (arriba) = Total Gastos (tabla) en USD y ARS; el bloque en cascada
  cambia de $6.045.520.000 (ARS) a $3.6 M (USD) y viceversa al tocar el toggle, sin perder precisión
  en el redondeo esperable; sin errores de consola; los 14 checks de `verifyTieOuts()` siguen
  pasando (no se tocó ningún dato de `yearsRaw`/`computeYear`, solo qué stat lee cada `render*`).


## Versión 24 — BUG REAL DE ALINEACIÓN EN LOS ACORDEONES DE INVERSIONES, Y % DE VUELTA AL GRÁFICO (NO A LA LEYENDA)

Guido mandó una captura de pantalla mostrando los montos de A/B/C/D en Presupuesto de Inversiones
claramente desalineados entre sí, más 2 pedidos de ajuste sobre lo hecho en la Versión 23.

- BUG real encontrado con la captura: `details.accordion>summary` usa
  `display:flex;justify-content:space-between`, pero el summary tiene 3 hijos flex, no 2, el
  `::after` (el "+"/"−" de abrir/cerrar) cuenta como un 3er hijo. Con `space-between` entre 3 items,
  el monto (2do hijo) queda flotando a una distancia del borde derecho que depende de cuánto mide el
  label de al lado, no pegado al borde, por eso "2.818.718.000", "19.606.500.000", "12.325.200.000"
  y "7.016.640.000" terminaban en 4 posiciones horizontales distintas (476px, 414px, 433px, 427px,
  medido con getBoundingClientRect). Corregido dándole al label `flex:1 1 auto` (crece/achica) y al
  monto `flex:0 0 130px;text-align:right` (ancho SIEMPRE fijo, mismo criterio que las tablas
  `.mini-table` de la Versión 23), verificado que las 4 filas ahora terminan exactas en el mismo
  píxel (603.79px).
- Card Presupuesto de Inversiones: la nota de fuente que había quedado adentro del card (Versión 23,
  "Fuente de los 3 cards de arriba...") se sacó de ahí. Guido la señaló en la captura como algo que
  seguía "atrapado" dentro del card en vez de vivir afuera con el resto de las fuentes de Finanzas.
  Se fusionó con la nota de fuente de "Estado de resultados" que ya estaba al fondo de la sección
  (fuera de cualquier card): ahora son 2 líneas `<p class="source-note">` seguidas, las dos AFUERA de
  todos los cards, al final de toda la pestaña Finanzas.
- Card Gráficos (pie/doughnut "Composición de ingresos"): Guido pidió que el % de cada porción vaya
  DIBUJADO ENCIMA de la porción, no como texto en la leyenda (lo que se había hecho en la Versión
  23), y que la leyenda en sí quede alineada. Se sacó `legendLabelsWithPct` (ya no se usa) y se
  agregó `pctSliceLabelsPlugin` (`afterDraw`, toma `startAngle`/`endAngle`/radios de cada arco vía
  `arc.getProps(...)` y dibuja el % en el punto medio, con contorno oscuro + relleno blanco para que
  se lea sobre cualquier color; las porciones menores a 5% no muestran texto, se superpondrían). La
  leyenda volvió a texto simple (sin %) y pasó de `position:'bottom'` (envolvía en filas de largo
  dispar, se veía desalineada) a `position:'right'` (una sola columna vertical, alineada por
  construcción, no depende de cuánto mida cada label).
- Probado en el navegador: las 4 filas de Presupuesto de Inversiones miden exactamente el mismo
  `right` en px; el plugin de % se probó con un Chart.js simulado (afterDraw no tira error); sin
  errores de consola; los 14 checks de `verifyTieOuts()` siguen pasando.


## Versión 25 — EL "$" DIBUJADO A MANO EN EL CANVAS SALÍA ROTO. REEMPLAZADO POR UN <span> DE HTML NORMAL

Guido mandó una captura: el "$" del eje Y del gráfico de barras (Versión 22, `dollarAxisLabelPlugin`,
dibujado a mano con `ctx.fillText` para evitar que Chart.js lo rotara 90°) se veía como un símbolo
irreconocible, no como un signo pesos. No se pudo reproducir/diagnosticar la causa exacta acá (Chart.js
no carga en el navegador de este entorno, bloqueo de red externa, ver Versión 22, así que no hay
forma de ver el canvas renderizado desde esta sesión), pero tampoco hacía falta: dibujar un solo
carácter fijo a mano en un `<canvas>` (con todo lo que implica manejar font/transform/DPI a mano) era
una solución más frágil de lo que el problema pedía.

- Se sacó `dollarAxisLabelPlugin` (y su registro en `plugins:[...]` de `drawTrendChart` y
  `drawTrendChartGeneric`) por completo, código muerto ahora, borrado en vez de dejado comentado.
- En su lugar, un `<span class="chart-axis-dollar">$</span>` de HTML normal, posicionado con
  `position:absolute` arriba a la izquierda de `.chart-wrap` (que ya tenía `position:relative`),
  mismo lugar visual que antes, pero es texto real del DOM, con el mismo motor de fuentes que el
  resto de la página (nunca puede salir "roto" como en un canvas). `scales.y.title` se deja igual que
  en la Versión 22 (`display:false`, para que Chart.js no dibuje además su título nativo rotado).
- El plugin de % en las porciones del pie/doughnut (`pctSliceLabelsPlugin`, Versión 24) SÍ sigue
  siendo canvas-dibujado a mano, ese no tiene alternativa en HTML porque la posición de cada % es
  dinámica (depende del ángulo de cada porción), a diferencia del "$" que era un solo carácter en una
  posición fija. Si en el futuro se reporta el mismo tipo de glyph roto ahí, revisar primero si hay
  alguna forma de sacarlo del canvas también, antes de asumir que es el mismo bug.
- Probado en el navegador: el `<span>` existe en el DOM con `textContent:"$"`, tamaño y posición
  razonables (`getBoundingClientRect` ≈ 8×14px, arriba a la izquierda del área del gráfico); sin
  errores de consola.


## Versión 26 — BUG REAL DE ORDEN EN EL SELECTOR DE AÑO (River/Racing), Y FUENTE DINÁMICA POR CLUB

Guido pidió sacar 2 frases de copy fijo, y reportó que al cambiar a Racing o River el selector de
Año arrancaba siempre en el ejercicio más viejo (lejos de la actualidad), pidió que se ordene
descendente como Boca, y que el default sea el mismo ejercicio en el que se estaba mirando antes de
cambiar de club (o el más cercano en el tiempo si ese ejercicio puntual no existe para el club
nuevo). De paso, la nota de fuente de "Estado de resultados" seguía citando bocajuniors.com.ar
incluso mirando Racing, pidió que sea dinámica por club.

- Copy sacado: el subtítulo fijo de Finanzas ("...Fuente: balances oficiales presentados en asamblea
  (placeholder)") y "Formato inspirado en los reportes de @SwissRamble" (quedaba al final de la nota
  de fuente).
- BUG real encontrado en el selector de Año: `populateFinanzasSelectors()` armaba las opciones de
  River/Racing con `Object.keys(riverFiscalYearMeta)` / `Object.keys(racingFiscalYearMeta)`, pero
  JS reordena SIEMPRE las claves de objeto que parecen enteros ("2024", "2025"...) en orden
  ASCENDENTE al iterarlas (`Object.keys`/`for...in`), sin importar el orden en que se escribieron en
  el código fuente. Por eso la lista salía más-viejo-primero y el `<select>` arrancaba ahí (primera
  `<option>` = seleccionada por default). Corregido ordenando a mano, descendente
  (`Object.keys(meta).map(Number).sort((a,b) => b-a)`), mismo criterio que la lista fija de Boca.
- `populateFinanzasSelectors()` ahora también guarda el año seleccionado ANTES de reconstruir el
  `<select>` (`previousYear`) y, después de armar las opciones del club nuevo, lo restaura si existe
  exacto, o si no, selecciona el más cercano en el tiempo (mínima diferencia absoluta), antes
  siempre volvía a la primera opción sin importar qué se estaba mirando.
- Nota de fuente dinámica: `<p id="finanzasClubSourceNote">` (antes texto fijo citando
  bocajuniors.com.ar) ahora se llena vía `renderClubSourceNote()` según `currentClub`, con un texto
  distinto por club (Boca: bocajuniors.com.ar · Racing: racingclub.com.ar/informes, todos los
  ejercicios cargados son oficiales reales · River: balance real del Ejercicio 2023/2024 vía réplica
  de tuRiver, resto placeholder), llamada desde `refreshFinanzas()`, igual que
  `renderPresupuestoFinancieroWaterfall()`.
- Probado en el navegador: Boca sigue arrancando en 2027; seleccioné 2025 en Boca y cambié a Racing
  → Racing quedó en 2025 (existe exacto); puse Boca en 2018 y cambié a Racing (sin 2018) → quedó en
  2024 (el más cercano, diff=6, verificado a mano); las opciones de Racing y River salen
  descendentes; la nota de fuente cambia texto correctamente por club; sin errores de consola.


## Versión 27 — BUG REAL. LA FUENTE DE "SUPUESTOS/PRESUPUESTO FINANCIERO/INVERSIONES" QUEDABA VISIBLE EN RACING/RIVER

Guido reportó ver, mirando Racing, la nota "Fuente de 'Supuestos', 'Presupuesto Financiero' y
'Presupuesto de Inversiones': ...documento oficial del Club Atlético Boca Juniors...", un texto
100% de Boca, mostrado con cualquier club seleccionado.

- Causa: esa nota (agregada en la Versión 21 al fondo de Finanzas) es un `<p class="source-note">`
  suelto, NO envuelto en ninguno de los 3 cards `bocaPresupuestoOficialCard`, el show/hide por club
  (`refreshAllForClub()`, `document.querySelectorAll('.bocaPresupuestoOficialCard').forEach(...)`)
  nunca la tocaba, así que quedaba visible siempre, para los 3 clubes.
- Corregido agregándole la clase `bocaPresupuestoOficialCard` al `<p>` (no solo a los `<div class="card">`, la clase ya no es "solo para cards", es "solo para Boca", cualquier elemento nuevo que sea
  Boca-only tiene que llevarla).
- Probado en el navegador: con Racing o River seleccionados, el texto ya no aparece en la página
  (`document.body.innerText` no lo contiene); con Boca sí sigue apareciendo; sin errores de consola.


## Versión 28 — PDFs/ Y pdf-extracts/ SE UNIFICARON EN Clubes/<País>/<Club>/ (EL PDF Y SU TRANSCRIPCIÓN, JUNTOS)

Guido pidió juntar los dos árboles de carpetas que había hasta ahora. PDFs/<país>/<club>/ para los
PDFs fuente, pdf-extracts/<país>/<club>/ para sus transcripciones a Markdown, en uno solo, con el
PDF y su .md en la misma carpeta. También pidió capitalizar los nombres de carpeta (Clubes,
Argentina, Boca/River/Racing en vez de minúscula).

- Movimiento de archivos puro, ningún dato ni número cambió: `Clubes/Argentina/Boca/` (2 PDFs + 1
  .md), `Clubes/Argentina/River/` (7 PDFs de memoria + 3 .md en la raíz del club, más la subcarpeta
  `estados-contables-leads/` con su PDF y su .md, el único caso donde antes el PDF vivía en una
  subcarpeta pero su transcripción NO, quedaba desparejado; ahora los dos están juntos ahí adentro),
  `Clubes/Argentina/Racing/` (24 PDFs + 6 .md, todos sueltos en la misma carpeta). `PDFs/` y
  `pdf-extracts/` (y sus subcarpetas `argentina/`) quedaron vacías y se borraron.
- País y club van CAPITALIZADOS en el nombre de carpeta (`Argentina`, `Boca`, `River`, `Racing`),
  distinto del criterio que sigue usando el código para los `clubId` (`boca`, `river`, `racing`,
  minúscula): son dos convenciones separadas a propósito, una pensada para que Guido navegue en
  Finder, otra para consistencia interna del código. Ver CLAUDE.md, sección reescrita "Estructura de
  carpetas de documentos fuente".
- Todas las referencias de texto a las rutas viejas se actualizaron a las nuevas: `index.html`
  (bloque de estado actual. NO las entradas de changelog viejas que describen el reorden anterior
  como hecho histórico, esas quedaron tal cual estaban, con una aclaración agregada en la Versión
  17 de que ese esquema ya no es el actual), `CLAUDE.md`, `fuentes-por-club.md`, `data/clubs.js`,
  `data/river-data.js`, `data/racing-data.js`, y los 3 `.md` de Racing que se citaban a sí mismos.
  De paso se corrigió un typo pre-existente en `data/clubs.js` (citaba
  `presupuesto-2025-26.pdf` con guion, el archivo real es `presupuesto2025-26.pdf` sin guion,
  no relacionado con este movimiento, pero se encontró de pasada).
- OJO aprendizaje de esta sesión, ya documentado en el bloque de arriba: un `sed` global sobre TODO
  `index.html` reescribe también las entradas de changelog viejas que citan las rutas como parte de
  describir un cambio histórico (pasó con la Versión 17, que quedó diciendo "hoy: Clubes/..." en una
  entrada que describía la ÉPOCA en que se llamaba PDFs/, quedó revertida a mano). Antes de un
  find-and-replace masivo sobre este archivo, revisar primero si alguna coincidencia cae dentro de
  una entrada de VERSIÓN vieja (después del primer separador `===`) que esté describiendo esa ruta
  como parte de su propio relato histórico, no como una referencia viva.
- Probado: `find Clubes -type f` lista los 45 archivos esperados (34 PDFs + 11 .md); cada ruta citada
  en `data/clubs.js`/`data/racing-data.js`/`data/river-data.js` se verificó contra el filesystem real
  (`[ -f "$p" ]`), las 7 probadas existen; sin errores de consola; los 14 checks de
  `verifyTieOuts()` siguen pasando (no se tocó ningún dato, solo comentarios/notas de texto).


## Versión 29 — TOGGLE "FORMATO SIMPLIFICADO" EN ESTADO DE RESULTADOS (SOLO BOCA POR AHORA)

Guido pidió un toggle en el card "Estado de resultados" para reclasificar los números de Boca (que
hoy se muestran tal cual el club los reportó, 9-17 categorías según el ejercicio) a un formato
uniforme, el mismo tipo de normalización que el botón premiumCtaBtn viene prometiendo como feature
paga desde la Versión 10 ("🔒 Formato difícil de comparar · Premium lo simplifica"), pero ahora
construida de verdad y expuesta gratis, sin paywall. Dio una lista de categorías de partida
("Venta de Jugadores, Estadio, Entradas/Abonos, Television, Premios" para ingresos; "Compra de
jugadores, inversiones, primas, salarios de jugadores, salarios de cuerpo técnico, salarios
administrativos" para gastos) con permiso explícito de ajustar lo que hiciera falta "para que quede
lógico".

- Toggle nuevo "Formato del club" / "Formato simplificado" (`#simplifyToggle`, mismo estilo
  `.segmented` que USD/ARS), al lado del toggle de moneda, visible SOLO para Boca (se esconde y se
  fuerza a "Formato del club" al cambiar a River/Racing, mismo criterio que `currencyToggleFin`).
- Función nueva `simplifiedReportForBoca(year)`: NO inventa ni recalcula nada, reclasifica los
  MISMOS campos de `yearsRaw[year]` que ya alimentan `computeYear()`/PAT (ya verificados por
  `verifyTieOuts()`) a 7 categorías de Ingresos y 4 de Gastos. `nativeReportFor()` la usa en vez de
  las 3 ramas de siempre cuando `simplifyFormat` está prendido, el resto del pipeline de render
  (`renderNativePLTable`, conversión de moneda, el stat "Gastos" de arriba) no se tocó, así que
  hereda gratis todo lo que ya funcionaba (toggle USD/ARS, el fix de la Versión 23, etc.).
- Categorías de Ingresos: Cuotas Sociales, Comercial/Sponsors, Estadio (TV y premios incluidos),
  Entradas/Abonos, Venta de Jugadores, Otras secciones deportivas (básquet+juvenil+femenino+otros
  deportes), Otros ingresos. Boca SÍ separa "Exhibición de Espectáculos" (partidos+TV+premios, todo
  junto) de "Abonos" en sus propios documentos, así que esas dos quedaron separadas tal cual,
  "Televisión" y "Premios" NO se pueden separar más que eso (Boca los reporta fusionados, ej. el
  presupuesto 2027 literalmente etiqueta una línea "Torneo Oficial (TV + recaudación + premio)"), así
  que quedaron mencionados en el label de "Estadio" en vez de como categorías propias vacías.
  **[CORRECCIÓN, VERSIÓN 30: ESTO ERA FALSO.]** El PDF del presupuesto 2026/27 SÍ desglosa Derechos
  de Televisión, Recaudaciones y Premio como líneas separadas (pág. 12), el bundle de arriba
  ("Torneo Oficial (TV + recaudación + premio)") era un resumen de más que se había metido al cargar
  `revenueBreakdown[2027]` la primera vez, sin haber transcripto antes el PDF completo (violación de
  la propia regla de CLAUDE.md). Guido lo notó comparando contra el PDF y mandó la captura, ver
  Versión 30 para la corrección real y la transcripción completa en presupuesto-26-27.md.
- Categorías de Gastos: Compra de jugadores (amortización de pases + deterioro), Salarios y primas
  (plantel y cuerpo técnico), Inversiones (amortizaciones y depreciación), Otros gastos. NO se pudo
  separar "salarios de jugadores" de "cuerpo técnico" de "primas" de "salarios administrativos" como
  pedía Guido originalmente: Boca junta remuneraciones + primas del plantel en una sola línea en
  TODOS sus documentos (balance 2025: "Remuneraciones plantel profesional, primas"; presupuesto
  2027: dentro de "Fútbol Profesional"), el presupuesto 2027 SÍ tiene ese desglose línea por línea
  en su detalle interno (`expenseSubBreakdown[2027]`: Remuneraciones Plantel $8.819,925 M,
  Remuneraciones Cuerpo Técnico $2.970,34 M, Prima Jugadores $45.538,138 M, Prima cuerpo técnico
  $2.698,975 M), pero NINGÚN otro ejercicio tiene ese mismo nivel de detalle, se prefirió una sola
  categoría consistente en TODOS los ejercicios antes que una más fina solo para 2027 y aproximada
  para el resto. Si en algún momento se quiere ese desglose más fino, la data para 2027 ya está
  extraída y verificada (ver este párrafo), solo falta decidir qué hacer con los ejercicios sin ese
  nivel de detalle.
- Verificado a mano, categoría por categoría, antes de cargar nada: Ingresos 2027 simplificado suma
  exacto $239.392,104 M (mismo total oficial que ya chequea `verifyTieOuts`); Resultado neto 2025
  simplificado da exacto $35.581,462204 M (mismo Superávit del ejercicio oficial). Ningún peso se
  pierde ni se duplica al reclasificar, la suma total (Ingresos + Gastos + extraRows) es
  matemáticamente idéntica a la del formato nativo, para cualquier ejercicio, porque usa los mismos
  campos ya sumados en `computeYear()`.
- OJO tensión de producto sin resolver, para que Guido decida: el botón `premiumCtaBtn` ("🔒 Formato
  difícil de comparar · Premium lo simplifica") sigue diciendo que esta normalización "todavía no
  existe" y es la feature paga, ahora es literalmente falso para Boca, el toggle de al lado hace
  exactamente eso, gratis. Queda para una próxima sesión decidir: ¿el toggle sigue gratis y se
  actualiza/saca el CTA, o esto pasa a ser lo que el CTA paywall termina gateando (y el toggle debería
  vivir detrás de esa lógica en vez de libre)? No se tocó `premiumCtaBtn` esta sesión, a propósito,
  para no tomar esa decisión de producto sin que Guido la confirme.
- Probado en el navegador: Boca 2027 y 2025 simplificado reconcilian exacto contra los totales ya
  verificados (ver arriba); el stat "Gastos" de arriba sigue matcheando "Total Gastos" de la tabla en
  ambos modos; cambiar a Racing esconde el toggle y lo resetea a "Formato del club"; Racing muestra
  sus categorías nativas sin tocar; volver a Boca no reactiva el simplificado solo; sin errores de
  consola; los 14 checks de `verifyTieOuts()` siguen pasando.


## Versión 30 — BUG REAL DE PROCESO. SE HABÍA CARGADO UN RESUMEN DEL PDF 2027 EN VEZ DE TRANSCRIBIRLO ANTES, Y SE PERDIÓ DETALLE REAL. TAMBIÉN: SE SACÓ EL BOTÓN PREMIUM.

Guido mandó una captura de la página 12 del PDF del presupuesto 2026/27 ("Exhibición de Espectáculos
Deportivos") mostrando que el documento SÍ desglosa Derechos de Televisión, Recaudaciones y Premio
como líneas separadas, contradiciendo directamente lo que la Versión 29 acababa de afirmar ("Boca
no separa Televisión ni Premios"). Tenía razón: era un error real, no una limitación del club.

- CAUSA RAÍZ: cuando se cargó `revenueBreakdown[2027]` (sesión de la Versión 14, mucho antes de
  este toggle), se saltó el paso obligatorio de CLAUDE.md ("Cada PDF nuevo: transcribirlo a Markdown
  ANTES de usarlo"), nunca existió un `pdf-extracts/argentina/boca/presupuesto-*.md` (ni ahora un
  `Clubes/Argentina/Boca/presupuesto-*.md`) para este documento, a diferencia del balance 2025 que
  sí lo tiene. Sin la transcripción de por medio, la extracción de datos se hizo directo sobre el PDF
  y alguien (una sesión anterior) resumió "Torneo Oficial" a un solo número en vez de sus 3 líneas
  reales (Derechos de TV, Recaudaciones, Premio), el resumen no estaba mal calculado (el TOTAL
  16.807.870.000 es exacto), pero perdió el desglose interno. Guido: "cuando extraes un resumen para
  ahorrar tokens, luego terminás haciéndolo incompleto e implica volver a hacerlo dos veces", pasó
  exactamente eso acá.
- CORREGIDO DE RAÍZ, no parcheado: se corrió `pdftotext -layout` página por página sobre las 37
  páginas del PDF (tiene texto nativo, no es un escaneo, se confirmó con `pdfinfo` antes de asumir
  que hacía falta el Read tool sobre imágenes) y se transcribió TODO el documento, palabra por
  palabra, a `Clubes/Argentina/Boca/presupuesto-26-27.md`. Premisas de Presupuestación, Presupuesto
  Económico, Apertura de Ingresos completa, Apertura de Gastos completa (las ~40 gerencias/
  departamentos, línea por línea), Presupuesto Financiero, Presupuesto de Inversiones. Cada subtotal
  transcripto se verificó a mano sumando sus líneas (ver las notas "(= ... + ...)" dentro del
  archivo), incluida la fila "Activación Fútbol Juvenil" (-14.838.999.000), un crédito que resta del
  gasto neto del departamento, no un gasto aparte. Este archivo es ahora la fuente de verdad para
  cualquier re-extracción futura de este documento, no hace falta reabrir el PDF.
- `revenueBreakdown[2027].exhibicionEspectaculos` corregido: pasó de 4 líneas ya sub-totalizadas
  (`'Torneo Oficial (TV + recaudación + premio)'`, etc.) a la jerarquía real de 2 niveles (Torneo
  Oficial / Copa Argentina / Giras y Amistosos / Copa Libertadores, cada una con sus líneas reales de
  Derechos de Televisión / Recaudaciones / Premio / Bonos adentro), mismos 4 subtotales y mismo
  total (43.085.830.000), cero pérdida ni duplicación, solo se dejó de esconder el desglose que el
  PDF sí tiene. Se ve expandiendo "Exhibición de Espectáculos Deportivos" → "Torneo Oficial" (o
  cualquiera de las otras 3) en la tabla nativa.
- `simplifiedReportForBoca()` (Versión 29) corregido: para el Ejercicio 2027 (el único con este nivel
  de detalle hoy), "Televisión" y "Premios por competencias" ahora son categorías propias en el
  Formato simplificado, separadas de "Estadio: recaudación de partidos", para el resto de los
  ejercicios (sin ese desglose disponible) sigue la categoría única "Estadio (TV y premios
  incluidos)" de antes. El comentario que afirmaba (mal) que esto no se podía separar quedó corregido
  con una nota de corrección, no borrado, mismo criterio que ya se usó con la Versión 17.
- Botón `premiumCtaBtn` ("🔒 Formato difícil de comparar · Premium lo simplifica") ELIMINADO. Guido
  decidió la tensión de producto que había quedado abierta en la Versión 29 (el toggle "Formato
  simplificado" sigue gratis, sin paywall). Se sacó el `<button>` del HTML y su listener de click en
  el JS; no queda ninguna referencia rota.
- Probado en el navegador: expandiendo "Exhibición de Espectáculos Deportivos" → "Torneo Oficial" en
  la tabla nativa aparecen Derechos de Televisión/Recaudaciones/Premio por Campeonato con sus montos
  reales; el Formato simplificado de 2027 muestra "Televisión" ($11,6 M USD) y "Premios por
  competencias" ($2,5 M USD) como filas propias, Total Ingresos sigue en 144,2 M USD exacto;
  `document.getElementById('premiumCtaBtn')` da `null`; sin errores de consola; los 14 checks de
  `verifyTieOuts()` siguen pasando (no se tocó ningún total, solo se abrió el desglose interno que
  ya sumaba correcto).


## Versión 31 — MENOS RUIDO EN "FORMATO SIMPLIFICADO" (INGRESOS UNIDOS, GASTOS DESAGREGADOS), Y COLUMNA "% DEL TOTAL" EN LAS DOS VISTAS

Guido pidió 3 ajustes sobre lo hecho en las Versiones 29/30, todos en el card "Estado de resultados":
unir dos categorías chicas de Ingresos que quedaban como "ruido", desagregar una categoría de Gastos
que había quedado demasiado grande y poco informativa, y agregar una columna de % en toda la tabla
(Formato del club Y Formato simplificado, no solo uno de los dos).

- Ingresos: "Otras secciones deportivas" y "Otros ingresos" (dos filas chicas por separado) se
  unieron en una sola, "Otras secciones deportivas y otros ingresos", mismos campos de siempre
  (otrosDeportes+basketProfesional+futbolJuvenil+futbolFemenino+diversos+assetSales), ahora sumados
  en un solo `{label,value}` en vez de dos.
- Gastos: "Otros gastos" (Compra de jugadores + Salarios + Inversiones + TODO lo demás en un solo
  número, $67,4 M USD para 2027, más grande que "Salarios y primas") se desagregó, pero SOLO para el
  Ejercicio 2027: es el único año donde `expenseBreakdown[2027]` tiene categorías reales debajo de
  ese bolsón (Administración, Organización de Espectáculos, Gastos Generales, Fútbol Juvenil, Otros
  Deportes, Basket, Comerciales, Socios, Eventuales, 9 categorías reales que sumaban exacto ese
  número, verificado a mano: 36.332,931+33.730,855+14.386,410+7.918,490+6.769,002+6.217,767+
  3.250,608+2.393,117+847,000 = 111.846,180 M, el mismo `otherExpenses` de yearsRaw[2027]). Se
  reagruparon en 3 categorías más chicas y legibles: "Organización de partidos" (Organización de
  Espectáculos sola, es grande y reconocible), "Otras secciones deportivas" (juvenil+otros
  deportes+básquet, mismo concepto que en Ingresos), "Administración y gastos generales"
  (Administración+Gastos Generales+Comerciales+Socios+Eventuales, todo overhead/back-office). El
  resto de los ejercicios sigue con el "Otros gastos" único de antes, no tienen ese desglose
  disponible en yearsRaw.
- Columna "% del total" nueva (`fmtPctOfTotal(val, total)`), entre "Actual" y "Anterior", el % de
  cada fila se calcula contra el Total de SU PROPIA sección (Ingresos o Gastos), no un total general;
  mismo criterio para sub-ítems si se expande una categoría (contra el mismo total de sección, no el
  de la categoría padre), así se puede ver de un vistazo qué rubro pesa más sin tener que calcular a
  mano. Requirió reordenar `buildNativeSectionHtml()`: antes el total se acumulaba fila por fila EN EL
  MISMO paso en que se generaba el HTML de cada fila, así que ninguna fila conocía el total final
  todavía, se separó en dos pasos (primero un `reduce()` para el total completo, después el `map()`
  de filas usando ese total ya cerrado). La columna se agregó SIEMPRE visible (a diferencia de
  Anterior/Var./Var.%, que solo se ven en "Por gestión"), la clase `pl-hide-compare` pasó de ocultar
  `nth-child(n+3)` a `nth-child(n+4)` para dejarla afuera del corte.
- Probado en el navegador: Ingresos y Gastos simplificados de 2027 siguen sumando 144.2/(142.2) exacto
  después de la reagrupación; "Organización de partidos" 20%, "Otras secciones deportivas" 9%,
  "Administración y gastos generales" 24% (suman el 53% que antes era un solo "Otros gastos" al 47%,
  ligera diferencia por redondeo de enteros, no por error de suma); expandiendo una categoría con
  sub-ítems en Formato del club, cada sub-ítem muestra su propio % correcto contra el total de la
  sección; "Por gestión" sigue mostrando las 6 columnas (Rubro/Actual/%/Anterior/Var./Var.%); River y
  Racing (motor genérico, misma función compartida) también muestran la columna % sin tocar código
  aparte; sin errores de consola; los 14 checks de `verifyTieOuts()` siguen pasando.


## Versión 32 — TOGGLE USD/ARS Y FORMATO DEL CLUB/SIMPLIFICADO PARA RACING Y RIVER (ANTES SOLO BOCA), MÁS EL PRESUPUESTO 2026/27 DE RACING

Guido pidió 3 cosas en la misma sesión: (1) dónde buscar el ejercicio 2025/26 de Boca que falta
entre el balance 2024/25 y el presupuesto 2026/27 ya cargados; (2) el toggle USD/ARS y Formato del
club/simplificado para Racing, "siempre para equipos argentinos"; (3) onboardear el presupuesto
2026/27 de Racing. Pidió explícitamente que se le preguntara antes de "correr" extendiendo algo
pensado para Boca a los demás clubes, y que se documentaran las decisiones en un skill nuevo, ver
`.claude/skills/club-or-year-onboarding/SKILL.md` (nuevo) y las secciones agregadas a
`.claude/skills/club-data-mapping/SKILL.md`.

- Antes de construir nada, 4 preguntas concretas (AskUserQuestion) confirmaron: (a) buscar el
  ejercicio 2025/26 de Boca YA en esta sesión (no solo dar pointers); (b) corregir el tipo de
  cambio de Racing 2024/2025 al que declara el PROPIO balance ($909/$1.196) en vez del investigado
  externamente ($912/$1.203) que se venía usando; (c) re-extraer ARS nativo solo para Racing
  2024/2025/2026(+2027 nuevo). NO para 2009-2011, que se quedan en USD ya-convertido (sin
  re-extracción); (d) extender el toggle a River TAMBIÉN en esta sesión, no solo Racing.
- Hallazgo real durante la investigación: los balances de Racing (Anexo VI, "Activos y pasivos en
  moneda extranjera") y de River (Anexo V) declaran su PROPIO tipo de cambio de cierre, no hacía
  falta investigar una cotización externa. Esto pasó a ser una regla nueva y más general en
  `club-data-mapping` (sección 5, regla 0): preferir siempre el tipo de cambio que declara el
  documento sobre uno buscado a mano.
- REESCRITO `data/racing-data.js` y `data/river-data.js`: `amountNative` de River/Racing pasó de
  "ya convertido a USD" a ARS MILLONES NATIVOS (Racing: 2024/2025/2026/2027; River: 2024, los años
  placeholder de River y 2009-2011 de Racing quedan como estaban, ver skill nuevo sección "Guardar
  amountNative en ARS nativo"). Cada línea se re-extrajo de los `.md` ya transcriptos (o del nuevo,
  para 2027) y se verificó a mano que suma EXACTO contra el subtotal impreso del documento, los 16
  checks de `verifyTieOuts()` (antes 14) pasan exactos, incluyendo los 2 nuevos de Racing 2027.
  OJO encontrado en el camino: la columna comparativa de un balance NO es la misma cifra que la
  columna "año corriente" de ESE mismo ejercicio en su propio balance (moneda homogénea reexpresa
  el comparativo a la fecha de cierre del balance nuevo), se usó siempre la columna de año
  corriente del balance de CADA ejercicio, nunca la comparativa de uno posterior (ver
  `club-data-mapping` sección 6, punto nuevo 5).
- `index.html`: función nueva `yearMetaFor(clubId, year)` generaliza `yearMeta(year)` (antes
  Boca-only) a cualquier club, lee `currency`/`fx` de `riverFiscalYearMeta`/`racingFiscalYearMeta`.
  Función nueva `simplifiedReportForGeneric(clubId, year)` (+ `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
  `_EXPENSE_BUCKETS`) da "Formato simplificado" a River/Racing agrupando por `normalizedCategory`,
  a diferencia de `simplifiedReportForBoca` (a mano, porque Boca no tiene `normalizedCategory`),
  esta es una única función compartida entre los dos clubes del motor genérico. `renderDebtBlockGeneric`,
  `renderFinanzasStatsGeneric`, `drawTrendChartGeneric`, `drawBreakdownChartGeneric` y
  `displayFinancialsForClub` ahora convierten moneda con `yearMetaFor` (antes mostraban todo en USD
  hardcodeado, sin conversión). Visibilidad de los dos toggles pasó de `currentClub === 'boca'` a
  `clubs[currentClub].country === 'AR'` (hoy los 3 clubes cargados son argentinos, así que el
  cambio práctico es que ahora siempre se ven, pero la condición ya es genérica para cuando se
  agregue un club de otro país).
- BUG REAL encontrado probando en el navegador (no se habría visto solo revisando números a mano):
  `renderFinanzasStatsGeneric` convertía `gastosTotal` DOS VECES (ya venía convertido desde
  `renderNativePLTable`), mostraba "Gastos: 0.1 M USD" en vez de ~76 M USD para Racing 2025.
  Corregido siguiendo el mismo patrón que ya tenía `renderFinanzasStatsFromComputed` (Boca):
  `Math.abs(gastosTotal)` directo, sin re-convertir. Documentado en el skill nuevo (sección 3) para
  no repetir el mismo error con otro club.
- Racing 2026/27 (Ejercicio 2027, presupuesto oficial, jul-2026 a jun-2027): transcripción completa
  en `Clubes/Argentina/Racing/presupuesto2026-27.md` (nueva), misma estructura que el presupuesto
  2025/26 ya cargado (mismos rubros palabra por palabra, así que la categorización fue directa, sin
  ambigüedad nueva). `racingFiscalYearMeta[2027].fx` = promedio de los dos tipos de cambio que el
  propio presupuesto declara como premisa ($1.505 julio-2026 / $1.870 junio-2027) = $1.687,5, mismo
  criterio que usa Boca para su Presupuesto 2027. `gestionesByClub.racing.milito.lastYear` pasó de
  2026 a 2027 (el nuevo ejercicio más reciente de la gestión). Nueva entrada en `sources{}`
  (`racing-presupuesto-2026-27`) en `data/clubs.js`.
- Boca 2025/26 (Ejercicio 2026, el año que falta entre el balance 2024/25 y el presupuesto 2026/27
  ya cargados): investigado con WebSearch/WebFetch. NO hay balance auditado real todavía (el
  ejercicio cerró jun-2026, pero Boca aprueba el balance del ejercicio anterior recién en la
  asamblea de octubre, a la fecha de esta sesión, 1-sep-2026, esa asamblea todavía no ocurrió). SÍ
  se encontró que Boca aprobó un presupuesto para este ejercicio en asamblea del 5-jun-2025 (nota
  oficial: bocajuniors.com.ar/noticias/aprobado, "Más obras y superávit"), con cifras de prensa
  (~$171.000 M ingresos / ~$168.000 M egresos / superávit proyectado ~USD 2 M) pero SIN un PDF
  oficial descargable. Wayback Machine no fue accesible desde este entorno para buscar capturas
  viejas de la página de presupuestos. Guido todavía no decidió si cargar esas cifras de prensa
  como `press_estimate` (mejor que nada, pero no el documento oficial) o esperar al balance real en
  oct/nov-2026, ver to-do #1.


## Versión 33 — CARD "SUPUESTOS" PARA RACING (PREMISAS DEL PRESUPUESTO 2026/27), INSPIRADA EN LA DE BOCA

Guido pidió una card con las premisas/supuestos del presupuesto de Racing, "inspirate en el que ya
tenemos para Boca", la card `bocaSupuestosCard` (Ingresos ordinarios, tipo de cambio, inflación,
políticas de ingresos/gastos, ver Versión 21).

- Card nueva `racingSupuestosCard` (clase `racingPresupuestoOficialCard`, visible solo con Racing
  seleccionado), ubicada después de la card "Gráficos" y antes de la nota de fuente general de
  Finanzas, mismo lugar relativo que las 3 cards de Boca. Contenido: las 4 premisas
  macroeconómicas que declara el propio Presupuesto 2026/27 (PBI, tipo de cambio, inflación,
  incremento salarial, ya usadas para el fx del ejercicio en `racingFiscalYearMeta[2027]`, ver
  Versión 32) más dos listas condensadas de "Políticas de ingresos" y "Política de gastos",
  resumiendo en una línea por rubro los párrafos descriptivos que trae el PDF (Campeonatos
  Oficiales, Retransmisión y TV, Marketing y Publicidad, etc. del lado de ingresos; Plantel
  Profesional, Cuerpo Técnico, Fútbol Amateur, Administración, etc. del lado de gastos), mismo
  espíritu que la lista de Boca, aunque el documento de Racing es más corto (no tiene el mismo
  nivel de desglose por rubro que el de Boca). La card muestra las premisas del ejercicio MÁS
  RECIENTE (2026/27, el presupuesto vigente hoy), no las del 2025/26 también cargado, mismo
  criterio que Boca (su card de Supuestos tampoco cambia según qué ejercicio esté seleccionado en
  "Año a año", siempre muestra las del Presupuesto 2026/27 vigente).
- BUG REAL encontrado probando en el navegador (documentado en el skill nuevo
  `club-or-year-onboarding`, sección 3b): la card apareció visible en la carga inicial de la
  página CON BOCA TODAVÍA SELECCIONADO (el club default). Causa: `refreshAllForClub()`, la
  función que esconde/muestra estas cards por club vía la clase CSS, solo se llama cuando el
  usuario CAMBIA de club (evento `change` de `clubSelect`), no en el `INIT` de la página (que
  llama a `refreshFinanzas()`, una función distinta, sin esa lógica). Las 3 cards de Boca nunca
  mostraron este bug porque Boca YA es el club default, así que "visible sin tocar nada" ya era el
  estado correcto para ellas, el bug estaba oculto hasta que se agregó la primera card
  "solo-Racing". Arreglado agregando `style="display:none"` directo en el HTML de la card y de su
  nota de fuente (no se tocó `refreshAllForClub()`, más simple y con menos riesgo que cambiar la
  secuencia de INIT).
- Probado en el navegador (browser fresco, sin caché, ver nota de la Versión 32 sobre el gotcha de
  caché de `<script src>` en este entorno de testing): carga inicial con Boca esconde la card de
  Racing correctamente; cambiar a Racing la muestra y esconde las 3 de Boca; volver a Boca la
  esconde de nuevo. Los 16 checks de `verifyTieOuts()` siguen pasando, sin errores de consola.


## Versión 34 — EL CARD "SUPUESTOS" PASA A SER UN SOLO CARD GENÉRICO, SIEMPRE PRESENTE PARA CUALQUIER CLUB/EJERCICIO. REGLA NUEVA, NO OPCIONAL

Guido, después de ver el card de Racing (Versión 33, estático, solo Ejercicio 2026/27): "siempre
quiero que esté el card de assumptions. si llegar a no haber assumptions en el documento, entonces
dejamos aclarado que no hay. pero esto tiene que ser una regla." Le pregunté si el card debía
seguir al ejercicio seleccionado (dinámico) o quedarse fijo por club con la regla siendo solo de
proceso, eligió dinámico.

- Se sacaron los 2 cards estáticos separados (`bocaSupuestosCard` con la clase
  `bocaPresupuestoOficialCard`, `racingSupuestosCard` con `racingPresupuestoOficialCard`) y se
  reemplazaron por UN card genérico (`#supuestosCard`, sin clase de show/hide por club. SIEMPRE
  visible) con un `<div id="supuestosBody">` que se repinta con `renderSupuestosCard(clubId, year)`.
  Los otros 2 cards de Boca (Presupuesto Financiero, Presupuesto de Inversiones) siguen Boca-only,
  sin tocar.
- Datos nuevos: `presupuestoSupuestosByClub[clubId][year]`, mapa con las secciones de supuestos
  (mismo formato de antes: heading + lista de bullets) para cada ejercicio que SÍ los declara.
  Hoy tiene 3 entradas: `boca[2027]` (migrada tal cual del card viejo, sin cambios de contenido),
  `racing[2026]` (nueva, condensada de racing-presupuesto-2025-26.md, no existía como card antes)
  y `racing[2027]` (migrada del card de la Versión 33).
- Función nueva `reportTypeForYear(clubId, year)`: para saber qué mensaje mostrar cuando un
  ejercicio NO está en `presupuestoSupuestosByClub`, distingue "es un balance auditado, no un
  presupuesto" (`official_balance_sheet`/`unofficial_mirror`) de "todavía no hay documento real
  cargado" (`placeholder`), en vez de un mensaje genérico único.
- `renderSupuestosCard(clubId, year)` se llama desde las 4 funciones que arman Finanzas
  (`updateFinanzasByGestion`, `updateFinanzasByAnio` para Boca; `updateFinanzasByGestionGeneric`,
  `updateFinanzasByAnioGeneric` para River/Racing), así responde a los 3 selectores (club,
  Año a año / Por gestión, y el año/gestión puntual dentro de cada uno), no solo al club.
- Probado en el navegador (puerto nuevo, sin caché) los 9 casos relevantes: Boca 2027 (premisas
  reales), Boca 2025 y 2018 ("es un balance"/"no hay documento", respectivamente), Racing 2027 y
  2026 (premisas reales de cada uno. DISTINTAS entre sí, no la misma repetida), Racing 2025 y 2009
  ("es un balance"), River 2024 ("es un balance") y River 2025 ("no hay documento"). También
  "Por gestión" de Racing: Milito (lastYear 2027) muestra las premisas de 2027, Blanco (lastYear
  2024, un balance) muestra el mensaje de "no hay". Los 16 checks de `verifyTieOuts()` siguen
  pasando, sin errores de consola.


## Versión 35 — MISMA REGLA PARA "PRESUPUESTO FINANCIERO" Y "PRESUPUESTO DE INVERSIONES". SIEMPRE PRESENTES, GENÉRICOS, EXPLÍCITOS SI NO HAY DATO

Guido: "lo mismo con los cards de Presupuesto de Inversiones / Presupuesto Financiero, básicamente,
estoy tratando de homologar lo que se pueda homologar." Mismo patrón que la Versión 34 (Supuestos),
aplicado a los otros 2 cards que todavía eran Boca-only.

- `#presupuestoFinancieroCard` y `#presupuestoInversionesCard` (antes `bocaPresupuestoFinancieroCard`/
  `bocaPresupuestoInversionesCard`, clase `bocaPresupuestoOficialCard`) pasan a ser genéricos y
  SIEMPRE visibles, sin importar el club. El contenido de Boca 2027 (waterfall + tabla completa de
  "Presupuesto Financiero"; los 4 acordeones A-D de "Presupuesto de Inversiones") se dejó TAL CUAL
  estaba, como HTML estático, no se reescribió a datos+plantilla (riesgo innecesario para contenido
  ya verificado y muy anidado, en especial los acordeones de Inversiones), solo se envolvió en
  `<div id="pfBoca2027">`/`<div id="piBoca2027">`, que ahora se muestra/esconde con
  `display:none/block` en vez de por la clase CSS vieja.
- Para cualquier club/ejercicio que NO sea Boca 2027, un `<div>` hermano (`presupuestoFinancieroBody`/
  `presupuestoInversionesBody`) se repinta con `renderPresupuestoFinancieroCard(clubId, year)` /
  `renderPresupuestoInversionesCard(clubId, year)`, mismo patrón que `renderSupuestosCard`: si hay
  datos en `presupuestoFinancieroByClub`/`presupuestoInversionesByClub` los muestra, si no arma un
  mensaje explícito con `noDataMsg()` (función nueva, compartida por los 3 cards ahora, antes
  `renderSupuestosCard` armaba su propio mensaje a mano, se refactorizó para no repetir la lógica).
- Racing 2026 y 2027 SÍ tienen datos reales para los dos cards nuevos:
  - Presupuesto Financiero: un waterfall más simple que el de Boca (Saldo Inicial + Ingresos −
    Egresos = Saldo al Cierre, SIN las filas de "Créditos a cobrar"/"Deudas a pagar del ejercicio
    anterior" que tiene Boca), no es un descuido, es fiel a que el presupuesto de Racing ya está
    armado en base de caja desde el origen (sus líneas dicen "Cobranzas por...", "Pago de...", no
    hay devengado que reconciliar contra percibido). Cifras: SALDO INICIAL DE CAJA Y BANCOS (I) de
    julio + TOTAL INGRESOS/EGRESOS DE FONDOS DEL PERÍODO + el valor de junio de FLUIR DE FONDOS DEL
    PERÍODO, de los mismos `.md` ya usados para revenueLines/expenseLines, verificado a mano que
    saldoInicial + ingresos − egresos = saldoFinal, exacto, para los dos ejercicios.
  - Presupuesto de Inversiones: Racing agrupa sus inversiones en UNA sola línea de egresos
    extraordinarios (ya cargada en `racingExpenseLinesByYear` como "Egresos extraordinarios..."),
    sin desglosar por obra individual como sí hace Boca, se muestra ese total real con una nota
    explícita de que el documento no llega a ese nivel de desglose (no es "no hay dato", es "el
    documento no lo desglosa").
- `renderWaterfallSteps(containerId, steps, meta)`: generalización de la vieja
  `renderPresupuestoFinancieroWaterfall()` (hardcodeada a Boca 2027), ahora recibe el container, los
  steps y el meta como parámetros, y la usan tanto Boca 2027 (steps fijos de
  `presupuestoFinanciero2027`, sin cambios) como el waterfall genérico de Racing (steps armados al
  vuelo desde `presupuestoFinancieroByClub`).
- `refreshAllForClub()`: se sacó el `querySelectorAll('.bocaPresupuestoOficialCard')` (ya no queda
  ningún elemento con esa clase en el HTML, los 3 cards que la usaban ya son genéricos).
- Probado en el navegador (puerto nuevo, sin caché): Boca 2027 sigue mostrando su contenido original
  sin cambios (waterfall $3,6M/$4,9M/$144,1M/$7,6M/$116,9M/$25,2M/$3,1M en USD, verificado dígito a
  dígito); Boca 2025 muestra "es un balance" en los dos cards nuevos; Racing 2026 y 2027 muestran
  waterfalls DISTINTOS entre sí con cifras reales (verificadas a mano: 6.5+85.7−88.2=4.0 M USD para
  2026; 3.2+84.8−84.2=3.8 M USD para 2027) y su Presupuesto de Inversiones con el total real (4.9 M
  USD / 6.2 M USD) más la nota de "sin desglosar"; Racing 2025 y River 2024 muestran "es un balance".
  Los 16 checks de `verifyTieOuts()` siguen pasando, sin errores de consola.


## Versión 36 — REGLA NUEVA. LA FUENTE NUNCA VA ADENTRO DE UN CARD INDIVIDUAL

Guido, después de ver los cards nuevos de Racing (Versión 35): "en los nuevos cards que hiciste de
racing pusiste fuente. detesto que hagas eso. la fuente va al final del documento, no en cada card.
ponelo como regla." Error real: al armar `presupuestoSupuestosByClub`/`presupuestoFinancieroByClub`
en la Versión 34/35 se les agregó un campo `sourceNote` con una frase "Fuente: ..." que se
renderizaba DENTRO de cada card, repetido en Supuestos, Presupuesto Financiero y (agregado de
cero, no existía antes) Presupuesto de Inversiones de Boca también.

- Se sacó el campo `sourceNote` (y su render) de los 3 mapas de datos
  (`presupuestoSupuestosByClub`, `presupuestoFinancieroByClub`, `presupuestoInversionesByClub`).
  Donde tenía contenido explicativo real además de la cita (el caso de Racing en Presupuesto
  Financiero: "a diferencia de Boca, el presupuesto de Racing ya está en base de caja..."), se
  renombró a `note` y se le sacó la frase "Fuente: ... documento oficial de Racing Club" del
  principio, dejando solo la explicación de metodología (que no es una cita de fuente, es una
  aclaración de cómo leer el número).
- Se sacó también la frase "Fuente: Presupuesto Económico, Financiero y de Inversiones..." que se
  le había agregado al HTML estático de Boca en "Presupuesto Financiero" (Versión 35, apéndice a un
  párrafo que ya existía) y en "Presupuesto de Inversiones" (Versión 35, un párrafo nuevo que NO
  existía antes de esa versión, se eliminó por completo, no solo la frase).
- REGLA agregada a `.claude/skills/club-or-year-onboarding/SKILL.md` (sección 3d): la cita de fuente
  va en los 3 lugares ya establecidos para eso, `#finanzasDataQualityBanner` (por ejercicio, arriba
  de Finanzas), `#finanzasClubSourceNote` (un resumen por club, al final del bloque de cards de
  Finanzas) y la pestaña Fuentes (el detalle completo), nunca repetida adentro de un card
  individual. Un card puede tener una aclaración de METODOLOGÍA (cómo leer el número) sin que sea
  una cita de fuente.
- Probado en el navegador (puerto nuevo, sin caché): ningún card (Supuestos, Presupuesto Financiero,
  Presupuesto de Inversiones) contiene la palabra "Fuente:" en Boca 2027, Racing 2026 ni Racing
  2027, verificado programáticamente, no solo a simple vista. Las notas explicativas de metodología
  de Racing (base de caja, sin desglosar por obra) siguen visibles, sin la frase de cita. Los 16
  checks de `verifyTieOuts()` siguen pasando, sin errores de consola.


## Versión 37 — BUG VISUAL REAL. EL "$" DEL EJE Y DEL GRÁFICO DE BARRAS QUEDABA TAPADO POR EL TICK MÁS ALTO

Guido mandó una captura de pantalla: en la card "Gráficos" (Finanzas), el "$" que debería verse
arriba del eje Y del gráfico de barras (Ingresos vs. Gastos) aparecía tapado/ilegible, mezclado con
el número del tick más alto (ej. "90"). Confirmado que pasaba para cualquier club (Boca, Racing, y
por construcción también River, ya que los 3 comparten el mismo `<canvas id="trendChart">` y el
mismo CSS).

- Causa: el "$" es un `<span class="chart-axis-dollar">` posicionado con `position:absolute;
  top:2px;left:6px` sobre `.chart-wrap` (ver Versión 22/25, se eligió HTML+CSS en vez de dibujarlo
  a mano en el canvas, por un bug de glyph roto que tenía la versión anterior). El problema real:
  Chart.js dibuja su tick más alto del eje Y prácticamente en la esquina superior izquierda del área
  de trazado por default (sin padding extra), casi exactamente en el mismo píxel donde estaba
  parado el "$". Medido con `chart.scales.y.top` antes del fix: ~10px desde arriba del canvas, con
  el tick de texto centrado ahí mismo, se superponía de lleno con el "$" (que ocupa de 2px a 16px).
- Fix: `layout:{padding:{top:26}}` agregado a las options de Chart.js en `drawTrendChart()` (Boca) y
  `drawTrendChartGeneric()` (River/Racing), mismo cambio en las dos, un solo `replace_all` porque
  el bloque de options era idéntico. Esto empuja todo el área de trazado 26px hacia abajo, dejando
  un margen limpio arriba reservado para el "$", sin tocar el CSS del span (se queda en
  `top:2px;left:6px`, ya no colisiona con nada). Verificado con `chart.scales.y.top` después del fix:
  el gap entre el borde inferior del "$" y el centro del tick más alto pasó de negativo (superposición)
  a ~10px.
- Probado en el navegador: capturas de pantalla (con un viewport alto para evitar el bug de scroll +
  screenshot de este entorno de testing, ver nota en Versión 32/34) confirmaron visualmente que el
  eje Y ahora lee limpio, "$" en su propia línea arriba de "160"/"80"/etc., para Boca 2027 (tope 160)
  y Racing 2025 (tope 80), antes ambos mostraban el mismo problema de superposición. Sin errores de
  consola.


## Versión 38 — BUG REAL DE CATEGORIZACIÓN. RACING 26/27 TENÍA TV, MARKETING Y SALARIOS "ENTERRADOS" ADENTRO DE items, EN $0 EN FORMATO SIMPLIFICADO

Guido abrió el PDF del presupuesto de Racing, vio la línea "COBROS POR RETRANSMISION Y DERECHOS DE
TV" con un monto real, y notó que "Formato simplificado" mostraba $0 en "Televisión / Derechos de
TV" para Racing 26/27. Pidió trabajarlo juntos ("tal vez sea por alguna simplificación o error en
el skill que usaste").

- Causa encontrada: al cargar Racing 2025/26 y 2026/27 (Versión 32), las 9 líneas reales que trae
  el documento bajo el encabezado "A. INGRESOS PROVENIENTES DE FUTBOL" (Cobranzas por entradas,
  Cobros por TV, Cobros por marketing, Cobros por ventas de jugadores, etc., cada una con su propio
  nombre y monto impreso) se cargaron como `items` (sub-ítems de desglose) de una única línea de
  primer nivel categorizada `lump_football_operations`. Visualmente esto no se notaba en "Formato
  del club" (el desplegable mostraba las 9 líneas igual) pero rompía cualquier cálculo por
  `normalizedCategory`: `sumCat()`/sumar por categoría NUNCA mira adentro de `items`, solo las
  líneas de primer nivel, toda la plata de fútbol (Ingresos, ~90-93 mil M ARS por ejercicio) quedaba
  categorizada como "sin desglosar", y los buckets de "Formato simplificado" que deberían haberla
  recibido (Televisión, Comercial, Venta de Jugadores del lado de ingresos; Salarios del plantel del
  lado de gastos, mismo problema con "Egresos generados por fútbol") daban $0. Mismo bug, dos lados
  (ingresos y gastos), 4 ejercicios afectados (Racing 2026 y 2027, revenue y expense cada uno).
- Fix en `data/racing-data.js`: las 9 líneas de ingresos y las 9 de gastos de "fútbol" (2026 y 2027)
  pasaron de `items` anidados a líneas de PRIMER NIVEL, cada una con su `normalizedCategory` real
  (entradas/participación → `matchday_competition`, abonos estadio → `season_tickets`, TV →
  `broadcasting`, marketing → `sponsorship_commercial`, venta/préstamo de jugadores → `player_sales`,
  derechos de formación → `youth_football`, otros recursos → `other_income`; remuneraciones plantel y
  cuerpo técnico → `wages_squad`, el resto de gastos de fútbol → `other_expenses`, mismo criterio ya
  usado para Racing 2024/2025). `normalizedCategory:'lump_football_operations(_expense)'` queda sin
  uso real en el sitio hoy (se mantiene disponible para un club futuro que sí reporte un bolsón sin
  desglosar de verdad).
- Auto-corrección real durante el fix: al recalcular a mano el chequeo de `verifyTieOuts()` para
  Racing 2027 Expenses con las 9 líneas nuevas, esta sesión primero CREYÓ encontrar una diferencia de
  $10.000 contra el total impreso del documento (ya había una nota parecida, de la Versión 32, sobre
  esa supuesta diferencia) y estuvo a punto de "corregir" el chequeo con un valor especial, pero al
  probar en el navegador, `computeYearGeneric()` sumó las 9 líneas de verdad y dio EXACTO el total
  impreso, sin ninguna diferencia: la "diferencia de $10.000" nunca existió, fue un error de suma a
  mano de esta sesión (arrastrado desde la Versión 32). Se corrigió el comentario en
  `racing-data.js` que afirmaba esa diferencia falsa, quede como recordatorio de por qué el paso
  "probar en el navegador" (sección 4 del skill `club-or-year-onboarding`) no es opcional ni siquiera
  para verificar los propios chequeos de verificación.
- Regla nueva agregada a `.claude/skills/club-data-mapping/SKILL.md` (sección 1): antes de usar
  `lump_football_operations`, confirmar que el documento REALMENTE no desglosa, un encabezado de
  grupo con líneas numeradas debajo (como Racing) NO es lo mismo que un bolsón sin desglosar. Regla
  nueva agregada a `.claude/skills/club-or-year-onboarding/SKILL.md` (sección 4): después de
  categorizar un ejercicio nuevo, abrir "Formato simplificado" y confirmar que ningún bucket con
  plata real quede en $0, ni `verifyTieOuts()` ni "Formato del club" detectan este tipo de bug,
  solo se ve mirando "Formato simplificado" línea por línea.
- Probado en el navegador (puerto nuevo, sin caché): "Formato del club" de Racing 2026/2027 ahora
  muestra las 9 líneas de fútbol como filas planas (con sus montos reales, ej. "Cobros por
  retransmisión y derechos de TV" $4,1 M USD en 2027) en vez de un desplegable; "Formato
  simplificado" de los mismos dos ejercicios ahora muestra Televisión/Comercial/Venta de
  Jugadores/Salarios del plantel con sus valores reales (verificados a mano: Televisión $4,1 M USD
  2027 y $5,2 M USD 2026; Salarios del plantel $(19,2) M USD 2027 y $(22,7) M USD 2026); "Fútbol
  profesional (sin desglosar por la fuente)" da $0 en los dos lados, correctamente (ya no queda nada
  genuinamente sin categorizar). Los 16 checks de `verifyTieOuts()` pasan exactos, sin errores de
  consola, en una carga completamente fresca.


## Versión 39 — BUG REAL DE LAYOUT. LA COLUMNA DEL EJERCICIO EN "ESTADO DE RESULTADOS" SE CORRÍA DE LUGAR SEGÚN CLUB/FORMATO

Guido notó, con dos capturas de pantalla (Racing en dos formatos distintos), que la columna del
ejercicio en el card "Estado de resultados" (`#finanzasPLTable`) no arrancaba siempre en el mismo
lugar horizontal, pidió que quedara "fija en el mismo lado" como regla, incluso si en el futuro se
agregan más columnas.

- Causa encontrada (medida en el navegador con `getBoundingClientRect()`, no a ojo): la tabla no
  tenía `table-layout:fixed`, así que el ancho de la columna "Rubro" (col. 1) se recalculaba solo en
  cada render, según el largo del rubro más largo de ESA tabla puntual, que cambia según club
  (Boca/Racing/River), formato (`simplifiedReportForBoca`/`simplifiedReportForGeneric` vs.
  `nativeReportFor` sin simplificar) y modo (Año a año vs. Por gestión). Medido: la columna del
  ejercicio arrancaba al 41% del ancho de la tabla en "Formato del club" de Boca vs. al 47% en
  "Formato simplificado" del mismo ejercicio, mismo bug para cualquier combinación club/formato,
  porque las 4 fuentes de datos (`nativeReportFor`, `simplifiedReportForBoca`,
  `simplifiedReportForGeneric`, río abajo todas terminan en el mismo `buildNativeSectionHtml`) generan
  listas de rubros de largo distinto.
- Fix en `index.html`: se agregó un `<colgroup>` a `#finanzasPLTable` con ancho fijo en píxeles para
  las 5 columnas numéricas (Actual/Anterior/Var. en 100/100/90px, % del total/Var. % en 65px cada
  una) y sin ancho para Rubro (se lleva el espacio restante) + `table-layout:fixed`, mismo patrón ya
  usado en las tablas `.mini-table` de Presupuesto de Inversiones (Versión 22). Con esto, las columnas
  numéricas SIEMPRE tienen el mismo ancho en píxeles sin importar el club/formato/modo, así que
  arrancan siempre en el mismo lugar. Se sacó la regla vieja que solo alineaba a la derecha la col. 2
  en modo "Año a año" (`pl-hide-compare`) y se unificó: TODAS las columnas numéricas (2 a 6) van
  siempre alineadas a la derecha, en los dos modos (antes "Por gestión" las dejaba a la izquierda,
  inconsistencia de paso que no se había notado).
- Como el ancho fijo de las 5 columnas numéricas (420px) no entra cómodo en pantallas angostas junto
  con Rubro, se envolvió la tabla en un `<div class="table-scroll">` (`overflow-x:auto`) y se le dio
  `min-width:600px` a la tabla, en mobile scrollea horizontal en vez de aplastar Rubro a casi 0px
  (probado en el navegador a 375px de ancho: la tabla mantiene sus 600px y scrollea, no se rompe el
  layout). Antes de este cambio la tabla ya no tenía ningún manejo de mobile (ni scroll ni ajuste), así
  que este wrapper es una mejora, no una regresión.
- REGLA NUEVA (documentada también en el comentario CSS de `#finanzasPLTable`, para que no se pierda
  si se edita solo el CSS sin leer este historial): toda columna numérica nueva que se agregue a esta
  tabla en el futuro TIENE que sumarse al `<colgroup>` con su propio ancho fijo en píxeles, nunca
  dejarla sin ancho, porque eso reintroduce el mismo bug (una columna sin ancho fijo vuelve a hacer que
  Rubro, la única otra columna sin ancho, absorba el resto y las columnas numéricas se corran según el
  contenido).
- Probado en el navegador (server local en `finance-of-sports/`, no `file://`, para que carguen
  `data/river-data.js`/`data/racing-data.js`): medido con JS en consola que la columna del ejercicio
  arranca en el mismo píxel exacto (658px sobre una tabla de 1078px) en las 8 combinaciones Boca/Racing
  × Formato del club/Formato simplificado × Año a año/Por gestión. `verifyTieOuts()` sigue pasando
  sin errores de consola.

REGRESIÓN REAL ENCONTRADA POR GUIDO EN LA MISMA SESIÓN ("quedó horrible, me gusta menos que antes,
antes se usaba todo el ancho del card, recuperá eso"): el fix de arriba resolvía que la columna del
ejercicio no se corriera, pero a costa de que en modo "Año a año" quedara una franja MUERTA a la
derecha de "% del total", la tabla ya no llenaba el card como antes. Se debugueó con
`getBoundingClientRect` en el navegador, en dos vueltas, hasta encontrar la causa real:
- Vuelta 1 (descartada): pensar que un `<col>` de las columnas 4-6 con `display:none` liberaría su
  ancho para que Rubro lo absorbiera, medido y CONFIRMADO que no: Rubro seguía midiendo lo mismo con
  o sin esa regla.
- Vuelta 2 (descartada): sacar directamente esos `<col>` del `<colgroup>` (dejarlo con 3 en vez de 6
  en modo "Año a año"), medido y CONFIRMADO que tampoco alcanza, y por una razón no obvia: la fila de
  encabezado de sección de `buildNativeSectionHtml` (`<tr class="pl-section-head"><td colspan="6">`)
  sigue escribiendo `colspan="6"` sin importar el modo, así que el navegador sigue viendo 6 columnas
  reales en la tabla (por esa fila) aunque el `<colgroup>` solo describa 3. Con Rubro Y las 3 columnas
  "de más" todas sin ancho explícito, el motor de tablas reparte el espacio sobrante en partes IGUALES
  entre las 4. Rubro se quedaba con ~108px de 596 (un cuarto del espacio libre) en vez de los ~431px
  que le tocarían si fuera la única sin ancho. Confirmado midiendo antes/después de sacar los `<col>`:
  ningún cambio en el ancho de Rubro.
- Fix real: función nueva `syncPLTableColgroup(hideCompare)` (JS, justo antes de `renderNativePLTable`)
  que reescribe el `<colgroup>` completo cada vez que cambia el modo. SIEMPRE con 6 `<col>` (para
  calzar con el `colspan="6"` de la fila de sección y las 6 celdas reales de cada fila de datos), pero
  en "Año a año" las columnas 4-6 llevan un ancho EXPLÍCITO de `0` (`width:0`) en vez de no tener
  ancho, así son las ÚNICAS columnas con ancho fijo salvo Rubro, que sigue siendo la única sin ancho
  y se lleva TODO el espacio sobrante ella sola, sin repartirlo con nadie. Se llama junto a cada
  `classList.add/remove('pl-hide-compare')` de esta tabla (los mismos 4 call sites de antes). Se sacó
  la regla CSS `col:nth-child(n+4){display:none}` de la vuelta 1 (no hacía nada, quedaba como ruido).
- Verificado con JS en consola, server local, las 8 combinaciones de nuevo: en "Año a año" Rubro mide
  431px de una tabla de 596px (antes de este segundo fix medía 108px) y la suma de anchos de columnas
  VISIBLES da exacto el ancho total de la tabla en los dos modos (0px de espacio muerto), confirmado
  para Año a año (596=596) y Por gestión (600=600). La posición de la columna del ejercicio se
  mantiene fija en las 8 combinaciones, ahora sin sacrificar el uso completo del ancho del card.
  `verifyTieOuts()` sigue pasando, sin errores de consola.


## Versión 40 — ACORDEÓN DE CONTROL EN "FORMATO SIMPLIFICADO" (BOCA) + EJERCICIO 2025/2026 AGREGADO AL SELECTOR, EN ESPERA

Dos pedidos de Guido en la misma sesión.

1. ACORDEÓN DE CONTROL en "Formato simplificado"
Guido pidió explícitamente: "hacé que las filas sean un acordeón para poder leer el breakdown de
cómo llegaste a cada número. Es mi manera de hacerte un control.", antes, "Formato simplificado"
(a diferencia de "Formato del club") tenía TODAS sus filas con `items:null`: se veía el número
reclasificado, pero no había forma de verificar, sin cambiar de toggle, de qué campo(s) nativo(s)
salió esa reclasificación.

- Empezó y quedó implementado SOLO para Boca (`simplifiedReportForBoca()`), como pidió Guido.
  Queda como REGLA PARA EL FUTURO (ver ESTADO ACTUAL arriba y `.claude/skills/club-data-mapping/
  SKILL.md` sección 9): cuando se toque `simplifiedReportForGeneric()`/`bucketize()` (River/Racing),
  aplicar el mismo criterio, ningún bucket de Formato simplificado puede quedar con `items:null`.
- Dos helpers chiquitos, `revenueDetailOrLeaf(year, key, label, value)` y
  `revenueComponentTuple(year, key, label, value)`, arman el `items` de cada fila REUSANDO datos que
  ya existían (`revenueBreakdown[year]`, con entradas para 2025 y 2027), nunca inventan un desglose
  nuevo, mismo principio que ya regía para el resto de `simplifiedReportForBoca()` ("ni un peso
  nuevo, ni un cálculo nuevo").
  - Fila que es UN solo campo nativo (ej. Cuotas Sociales): `revenueDetailOrLeaf` devuelve el
    desglose real de `revenueBreakdown[year]` si existe para ese año (el mismo que ya se ve en
    "Formato del club"); si no, arma una única fila `[label, value]` que igual confirma de qué
    campo salió, así CUALQUIER fila es un acordeón, aunque para años sin más detalle no haya nada
    más que mostrar que esa confirmación.
  - Fila que combina varios campos (ej. "Otras secciones deportivas y otros ingresos", 6 campos
    sumados): `revenueComponentTuple` arma una tupla `[label, value, subItems?]` por componente,
    anidando su propio `revenueBreakdown[year]` cuando existe.
- Para el Ejercicio 2027 (Gastos), se reusó `expenseSubBreakdown[2027]` POR REFERENCIA para las
  filas que combinan varias categorías nativas de ESE ejercicio, encontrado y verificado a mano,
  campo por campo, que cada combinación cierra EXACTO contra el `value` ya existente de la fila
  (ningún número nuevo, solo se armó el detalle):
  - "Compra de jugadores" 2027 = `expenseSubBreakdown[2027]['Fútbol Profesional'][2]` ("Amortización
    Plantel", -47.726,249) + "Deterioro de pases" (0).
  - "Salarios y primas" 2027 = `expenseSubBreakdown[2027]['Fútbol Profesional'][0]` ("Gerencia de
    Fútbol Profesional", -68.458,578) + `[1]` ("Futbol Femenino", -4.173,53), suma exacta
    -72.632,108 = `r.wages` del Ejercicio 2027.
  - "Inversiones (amortizaciones y depreciación)" 2027 = `expenseSubBreakdown[2027]['Otras
    Amortizaciones']` (-3.785,324, que corresponde a `r.depreciation` pese al nombre "Otras
    Amortizaciones" del propio presupuesto, se documentó la aclaración en el label de la fila para
    que no se lea como una inconsistencia) + "Otras amortizaciones (intangibles)" (0).
  - Las 3 filas de "Otros gastos" 2027 (Organización de partidos / Otras secciones deportivas /
    Administración y gastos generales) ya combinaban varias categorías de `expenseBreakdown[2027]`
    desde la Versión 30/31, se les agregó `items` citando esas mismas categorías, cada una anidando
    su propio `expenseSubBreakdown[2027][categoría]` cuando existe (ej. "Eventuales" no tiene
    desglose propio en el documento, así que queda como fila plana sin flecha).
  - Las 3 filas de "Estadio" 2027 (recaudación / Televisión / Premios), que cruzan sub-líneas de
    Torneo Oficial/Copa Argentina/Giras y Amistosos/Copa Libertadores por CONCEPTO en vez de por
    competencia, llevan `items` con esas mismas sub-líneas literales de
    `revenueBreakdown[2027].exhibicionEspectaculos` (no hay más nivel debajo de esas, son las hojas).
- Probado en el navegador (server local, no `file://`): se abrieron los acordeones de TODAS las
  filas de Ingresos y Gastos del Ejercicio 2027 y del Ejercicio 2025 en Formato simplificado, cada
  suma de sub-ítems cierra exacto contra el valor de la fila padre (confirmado leyendo el DOM, no
  solo revisando el código a mano). `verifyTieOuts()` sigue pasando sin errores de consola en una
  pestaña nueva (sin historial de consola de sesiones de prueba previas).

2. EJERCICIO 2025/2026 AGREGADO AL SELECTOR "AÑO A AÑO", EN ESPERA
El to-do #2 tenía una pregunta abierta pendiente desde la Versión 32: "¿cargar el Ejercicio 2026
como `press_estimate` (cifras de prensa del presupuesto aprobado en asamblea) o dejarlo en cero
hasta tener el documento oficial?". Guido la contestó esta sesión: agregar la opción al selector
("Ejercicio 2025/2026") y dejarla en blanco/cero, dejando claro en el sitio que se está esperando
que Boca lo informe, no cargar la cifra de prensa.

- `yearsRaw[2026]` nuevo: mismo patrón que el Ejercicio 2024 (todo en cero, comentario explicando
  por qué). Se agregó a los DOS lugares que arman el `<select>` de años, el HTML estático
  (`#anioSelect`, por si el JS tarda en correr) y, el que realmente importa,
  `populateFinanzasSelectors('boca')` (el array `years` en JS que reconstruye el `<select>` en cada
  load/cambio de club, encontrado probando en el navegador que el HTML estático por sí solo NO
  alcanza, `populateFinanzasSelectors` lo pisa siempre).
- Nuevo `reportType:'pending_official'` en `reportTypeForYear('boca', year)` para year===2024 Y
  year===2026, se extendió también al Ejercicio 2024 (no solo al 2026 pedido) porque es exactamente
  el mismo caso (ejercicio real, en cero a propósito, esperando carga/publicación), y dejarlo con el
  mensaje genérico de `'placeholder'` ("número inventado para probar el diseño del sitio") al lado
  de un Ejercicio 2026 correctamente etiquetado hubiera sido una inconsistencia obvia de mensaje
  para dos casos idénticos. `renderDataQualityBannerForCurrentSelection()` y `noDataMsg()` (cards
  Supuestos/Presupuesto Financiero/Presupuesto de Inversiones) tienen su rama nueva para este
  `reportType`, con el mensaje "Ejercicio todavía no informado por el club, ... se está esperando
  que Boca lo publique" en vez del genérico de placeholder inventado.
- Probado en el navegador: el selector muestra "Ejercicio 2025/2026 (esperando datos)" en su
  posición cronológica (entre 2027 y 2025); al seleccionarlo, Ingresos/Gastos/Resultado/Deuda dan
  0.0 en los 4 stats, la tabla "Estado de resultados" se pinta sin errores (todas las filas en 0), y
  el banner + los 3 cards de presupuesto muestran el mensaje de "esperando" en vez del de
  placeholder inventado.
- Nota de proceso: apareció un error de consola ("Cannot read properties of undefined (reading
  'cuotasSociales')") durante el debugging de este cambio, investigado a fondo (11+ herramientas
  de diagnóstico) y descartado como bug real: era un artefacto de una prueba manual propia (asignar
  `anioSelect.value = '2026'` ANTES de haber agregado esa opción al array de `populateFinanzasSelectors`,
  lo que dejaba el `<select>` en `value=''` y `parseInt('')` en `NaN`), que había quedado pegado en
  el historial de consola acumulado de esa pestaña del navegador. Confirmado limpio abriendo una
  pestaña nueva del navegador y recargando: cero errores de consola, con el sitio completo (Boca,
  River, Racing, los 3 ejercicios de prueba) funcionando normal.


## Versión 41 — TOOLTIP DE GLOSARIO EN FILAS DE DESGLOSE + 3 CARDS "INGRESOS Y EGRESOS POR TORNEO" (BOCA 2027)

Dos pedidos de Guido en la misma sesión, los dos sobre el card "Estado de resultados"/Finanzas de Boca.

1. TOOLTIP DE GLOSARIO
Guido preguntó qué significan "Amortizacion Plantel Futbol Profesional - Compras" y
"- Inferiores" (dos sub-líneas dentro de "Amortización Plantel" en Gastos, Ejercicio 2027, visibles
al expandir el acordeón de "Compra de jugadores" en Formato simplificado o "Fútbol Profesional" en
Formato del club).

- Explicación (para que quede documentada acá y no solo en el tooltip): "Compras" es la amortización
  del costo de los pases de jugadores COMPRADOS a otros clubes, se capitaliza como activo intangible
  al firmar al jugador y se lleva a resultados en cuotas iguales a lo largo del contrato, no todo de
  una vez. "Inferiores" es lo mismo pero para jugadores surgidos de las Inferiores del propio club:
  aunque no hubo "compra" a otro club, igual se capitaliza un costo asociado a esos jugadores al
  firmarles el primer contrato profesional, y se amortiza de la misma manera.
- Implementación: diccionario `rowGlossary` (label exacto → texto) + helper `labelWithGlossary(label)`,
  usado en `renderBreakdownRows()`, la función COMPARTIDA que pinta cualquier fila de desglose
  (Formato del club Y Formato simplificado, para cualquier club). Por eso alcanza con una entrada en
  el diccionario para que el tooltip aparezca en TODOS los lugares donde ese label se pinte, sin
  duplicar lógica. Se ve como `title=` nativo del navegador (line punteada debajo del texto,
  `cursor:help`), no se armó un componente de tooltip nuevo, se usó el mecanismo nativo del browser
  por simpleza, ya que alcanza para el caso de uso.
- Extensible: agregar una entrada nueva a `rowGlossary` (clave = label EXACTO tal cual aparece en el
  desglose) alcanza para explicar cualquier otro término de jerga contable que Guido pida a futuro.

2. CARDS "INGRESOS Y EGRESOS POR TORNEO" (Copa Libertadores / Campeonato Liga Profesional / Copa
Argentina), SOLO BOCA EJERCICIO 2027
Guido pidió, para Boca: 3 cards, uno por Copa Libertadores, uno por el campeonato local, uno por
Copa Argentina, mostrando cuánto entra y cuánto sale de CADA torneo por separado, y hasta qué
instancia está presupuestado llegar en cada uno.

- Fuente: Clubes/Argentina/Boca/presupuesto-26-27.md, pág. 12 (Ingresos por competencia. Torneo
  Oficial/Copa Argentina/Copa Libertadores YA venían desglosados por torneo desde la Versión 30) y
  pág. 22-23 (Gastos de "Organización de Espectáculos" por competencia. Campeonato Liga
  Profesional/Copa Argentina/Partidos Amistosos/Copa Libertadores, dato que YA estaba cargado en
  `expenseSubBreakdown[2027]['Organización de Espectáculos']` pero nunca se había mostrado agrupado
  por torneo en ningún card, solo enterrado dentro del acordeón de "Organización de partidos" de
  Formato simplificado). No se extrajo ni inventó ningún número nuevo, se re-presentaron números ya
  cargados y verificados, agrupados de una forma nueva.
- LÍMITE REAL DE LOS DATOS (aclarado explícito en cada uno de los 3 cards, no solo acá, es fácil de
  malinterpretar): "Gastos" en estos cards es SOLO el costo de organización/logística de los partidos
  de ESE torneo (seguridad, viajes, concentración, premios grupales por resultado, cuota AFA, etc.).
  El presupuesto NO desglosa los sueldos/primas del plantel (Prima Jugadores, Remuneraciones Plantel,
  etc.) por torneo, es una única cifra para todo el plantel profesional, sin importar en qué
  competencia jugó cada partido. Por eso cada card muestra una fila "Diferencia (Ingresos − Gastos de
  organización)" en vez de un "Resultado" o "Ganancia/Pérdida": llamarlo resultado hubiera sido
  engañoso, porque falta el costo más grande (sueldos). La Diferencia de la Liga da NEGATIVA
  ($(1.939.207.000)), se aclaró explícito en el card que esto NO significa que el club "pierde
  plata" jugando el campeonato local, solo que ese costado del gasto (sueldos) no está en esta cuenta.
- Instancia presupuestada por torneo (texto tomado literal del presupuesto, pág. 5, sección "3.2
  Eventos Deportivos y Competencias"):
  - Copa Libertadores: edición 2026 hasta Cuartos de Final, edición 2027 hasta Fase de Grupos (este
    ejercicio, jul-2026 a jun-2027, abarca el cierre de una edición y el arranque de la otra).
  - Copa Argentina: edición 2026 hasta Cuartos de Final, edición 2027 hasta Primera Ronda (mismo
    criterio de dos ediciones dentro de un ejercicio).
  - Campeonato Liga Profesional: sin instancia final que proyectar, son las 2 competencias de la
    Liga Profesional del período, formato todos-contra-todos, no hay fase eliminatoria.
- Cifras verificadas a mano contra los TOTALES IMPRESOS del documento (no una suma propia sin
  cruzar): Liga 18.747.077.000 (24 líneas), Copa Argentina 170.200.000 (4 líneas), Copa Libertadores
  13.833.167.000 (19 líneas), las 3 sumas de gastos cierran exacto. Ingresos: Liga 16.807.870.000,
  Copa Argentina 340.417.000, Copa Libertadores 24.362.479.000, ya venían verificados desde la
  Versión 30.
- Arquitectura: mismo patrón "always visible" que Supuestos/Presupuesto Financiero/Presupuesto de
  Inversiones (Versiones 34-35). HTML estático `#torneosBoca2027` (3 `.card`, visible solo para
  clubId==='boca' && year===2027) + `#torneosFallbackCard` (1 card compartido con
  `noDataMsg(clubId, year, 'un desglose por torneo')` para cualquier otro caso), togleados juntos por
  `renderTorneosCard(clubId, year)`, llamada desde las mismas 4 funciones que ya llaman a
  `renderSupuestosCard`/`renderPresupuestoFinancieroCard`/`renderPresupuestoInversionesCard`
  (`updateFinanzasByGestion`/`updateFinanzasByAnio`/`updateFinanzasByGestionGeneric`/
  `updateFinanzasByAnioGeneric`). A diferencia de esos 3 cards (1 card cada uno, con o sin dato), acá
  Guido pidió específicamente 3 cards separados, se mantuvo esa estructura (3 `.card` reales) en vez
  de forzarlo a 1 solo card con 3 secciones, y se agrupan bajo un wrapper `<div>` (no un `.card` en sí
  mismo) solo para poder togglear los 3 juntos de una.
- Los gastos de cada torneo, adentro de un `<details class="accordion nested">` colapsado por
  default (mismo componente ya usado en Presupuesto de Inversiones) para no alargar demasiado la
  card con 19-24 líneas. Ingresos, en cambio, se muestra siempre expandido (son 1 a 3 líneas nomás).
- Probado en el navegador: los 3 cards muestran los totales correctos para Boca 2027; al cambiar a
  cualquier otro ejercicio (probado con 2025) se esconden y aparece el card de fallback con el
  mensaje de "no hay desglose por torneo, es un balance auditado" (vía `noDataMsg`); el tooltip de
  glosario aparece en las 2 filas esperadas dentro de "Estado de resultados"; el acordeón de "Formato
  simplificado" (Versión 40) sigue funcionando sin cambios. Cero errores de consola en una pestaña
  nueva del navegador.


## Versión 42 — SIN EM DASHES DE ACÁ EN ADELANTE, BUG REAL DE "INGRESOS" EN BOCA 2024/2025, ACORDEÓN PARA RIVER/RACING, Y LOS 4 CARDS DE PRESUPUESTO AHORA SE ESCONDEN EN VEZ DE MOSTRAR "NO HAY"

Cuatro pedidos de Guido en la misma sesión, sobre lo construido en las Versiones 40-41.

1. SIN EM DASHES
Guido: "elimina los em dashes que usaste en el archivo, los odio a los em dashes". Se limpiaron
las 550 apariciones del carácter em dash (—, U+2014) que había en index.html (y, por consistencia,
las de los 2 skills en .claude/skills/), reemplazando cada uso de puntuación por punto y oración
nueva, coma o dos puntos según el caso, sin perder ningún matiz de la explicación original.

- Distinción importante encontrada al hacer esto: el sitio usa el mismo carácter "—" en un lugar
  completamente distinto, como símbolo de "sin dato"/"no aplica" en celdas de tabla (`fmtPctDisplay`,
  `fmtPctOfTotal`, varias filas de `buildNativeSectionHtml`/`renderNativePLTable`, el campo
  `mejorResultadoLibertadores` de Comparar Gestiones, etc.). ESE uso se dejó igual: no es un em
  dash de puntuación en una oración, es un símbolo de tabla (la misma convención que usan los
  balances/presupuestos de Boca y prácticamente cualquier publicación financiera), y cambiarlo
  hubiera sido un cambio de diseño no pedido, no una limpieza de estilo de escritura.
- Reemplazo hecho con un script (Python, vía Bash) en vez de 500+ ediciones manuales: se separaron
  los casos "— seguido de mayúscula" (→ punto y oración nueva) de "— seguido de minúscula o
  puntuación" (→ coma), con casos especiales para dash-antes-de-comilla (→ dos puntos, para
  introducir una cita) y dash-al-final-de-línea-de-comentario (→ coma, para no tener que
  recapitalizar la palabra que sigue en la línea siguiente). Se verificó a mano que no quedó
  ninguna puntuación duplicada (". ." o ", ,") como artefacto del reemplazo, y se revisó a mano
  cada texto VISIBLE para el usuario (subtítulos de card, notas de fuente, el tooltip de glosario,
  las 3 cards de torneo) para que la lectura quedara natural, no solo mecánicamente correcta.
- REGLA PARA EL FUTURO, documentada arriba en ESTADO ACTUAL: no usar em dash en texto nuevo de acá
  en adelante, en ningún archivo de este proyecto.

2. BUG REAL: "INGRESOS" DABA UN NÚMERO DISTINTO SEGÚN DÓNDE LO MIRARAS (BOCA EJERCICIO 2024/2025)
Guido: "hay un error en boca 2024-2025. ingresos en un lado te suma un numero y en otro, otro."

- Causa encontrada: el stat "Ingresos" de arriba de Finanzas (`renderFinanzasStatsFromComputed`
  para Boca, `renderFinanzasStatsGeneric` para River/Racing) mostraba SIEMPRE `cur.revenue`
  (calculado por `computeYear`/`computeYearGeneric`, que para Boca EXCLUYE la venta de jugadores
  por diseño, va a `profitOnPlayerSales`/PAT en vez de a "revenue"), sin importar qué tabla se
  estuviera mirando abajo. El fix análogo para "Gastos" (usar el total YA calculado por la tabla,
  no un cálculo aparte) ya existía desde antes, pero nunca se había aplicado a "Ingresos".
- Para el Ejercicio 2025 de Boca esto se notaba fuerte porque hay 3 fuentes de "Ingresos" que
  legítimamente difieren por diseño: el stat de arriba (152.899,94 M ARS, sin transferencias),
  "Formato del club" (237.614,57 M ARS, incluye las transferencias BRUTAS como líneas propias,
  tal cual las reporta `nativeFinancialsBoca`) y "Formato simplificado" (218.319,23 M ARS, incluye
  la ganancia NETA por venta de jugadores como fila "Venta de Jugadores"). El problema no era que
  existieran 3 números con criterios distintos (eso es intencional, cada uno documentado), sino que
  el stat de ARRIBA no coincidía con NINGUNO de los dos de la tabla de ABAJO al mismo tiempo.
- Fix: `renderFinanzasStatsFromComputed`/`renderFinanzasStatsGeneric` ahora reciben un tercer
  parámetro `ingresosTotal` (= `plTotals.ingresosTotal`, ya calculado por `renderNativePLTable`
  para la tabla que se está mostrando) y lo usan en vez de `cur.revenue` cuando viene definido.
  Mismo patrón que ya regía para `gastosTotal`. Aplicado a los 2 clubes (Boca y el motor genérico
  de River/Racing) aunque hoy solo Boca tenía el bug real (River/Racing usan una sola fuente de
  líneas compartida entre los dos formatos, así que sus 2 totales ya coincidían), para que los dos
  stats de arriba sigan el mismo criterio y no se desincronicen si el motor genérico cambia a
  futuro.
- Verificado en el navegador: Boca Ejercicio 2025, alternando el toggle Formato del club/Formato
  simplificado, el stat "Ingresos" de arriba pasa de 197.5 M USD a 181.5 M USD exactamente cuando
  cambia el total de la tabla de abajo, en vez de quedarse fijo en 127.1 M USD como antes.

3. ACORDEÓN DE CONTROL PARA RIVER/RACING (completa el to-do de la Versión 40)
Guido: "haceme los acordeones para racing". Como River y Racing comparten el mismo motor genérico
(`simplifiedReportForGeneric`/`bucketize`), extender el acordeón a Racing lo extiende también a
River sin trabajo adicional: se hizo para los dos.

- `bucketize()` ahora arma, para cada bucket, la lista real de `revenueLines`/`expenseLines` que
  matchearon esa categoría (`[rawLabel, amountNative, line.items || null]` por línea), en vez de
  `items:null` fijo. Mismo criterio que Boca (Versión 40): no se inventa ningún desglose nuevo, se
  reusan por referencia las mismas líneas que ya alimentan "Formato del club".
- Probado en el navegador: Racing Formato simplificado, "Cuotas Sociales" se abre y muestra
  "Ingresos sociales" (la única línea real detrás de esa categoría) con el mismo monto que el
  bucket. River Formato simplificado, las 9 filas del cuadro tienen flecha y abren su desglose real.
  Documentado como regla vigente en `.claude/skills/club-data-mapping/SKILL.md` sección 9
  (actualizada: ya no dice "pendiente para River/Racing").

4. LOS 4 CARDS DE PRESUPUESTO (SUPUESTOS/FINANCIERO/INVERSIONES/TORNEOS) AHORA SE ESCONDEN SI NO
HAY PRESUPUESTO, EN VEZ DE MOSTRAR UN MENSAJE
Guido, viendo los 4 cards vacíos en el Ejercicio 2024/2025 de Boca (que tiene balance auditado, no
presupuesto): "en vez [de] poner todo esto que ocupa espacio, mejor si lo que haces es que los
cards no esten si no [h]ay un presupeusto para el anio. dejalo como regla a esto."

- Esto INVIERTE la regla de las Versiones 34-35/41 ("el card SIEMPRE tiene que estar, con un
  mensaje explícito si no hay dato"), que en su momento también fue un pedido explícito de Guido.
  Documentado en ambos lugares (acá y en el skill) que el cambio es intencional, no un descuido
  que reintroduce la regla vieja sin querer.
- `renderSupuestosCard`/`renderPresupuestoFinancieroCard`/`renderPresupuestoInversionesCard`/
  `renderTorneosCard`: cada uno ahora pone `display:none` en su `.card` cuando no hay datos en el
  mapa correspondiente para ese `[clubId][year]`, en vez de pintar un mensaje de "no hay". Se borró
  `noDataMsg()` (ya no la llama nadie) y el card `#torneosFallbackCard` (dead code, ya no hace
  falta). También se actualizaron los 3 subtítulos de Supuestos/Presupuesto Financiero/Inversiones,
  que todavía decían "te lo decimos acá tal cual, en vez de sacar el card": ahora dicen "solo
  aparece para los ejercicios que tienen [el dato] cargado", que es lo que el sitio hace de verdad.
- Probado en el navegador: Boca Ejercicio 2024/2025, los 4 cards (`#supuestosCard`,
  `#presupuestoFinancieroCard`, `#presupuestoInversionesCard`, `#torneosBoca2027`) dan
  `display:none`; Boca Ejercicio 2026/2027, los 4 vuelven a `display:block` con su contenido real.
  Cero errores de consola en una pestaña nueva del navegador, y `verifyTieOuts()` sigue pasando.


## Versión 43 — ANCHO FIJO PARA EL SELECT DE "AÑO" (CAMBIABA DE TAMAÑO SEGÚN CLUB/EJERCICIO)

Guido: "i noticed the width of the Año box changes for each club. it should always be the same
widht, lenght for consistency. fix it, make a rule, all the good usual stuff."

- Causa: `#anioSelect` no tenía ancho propio en CSS, solo la regla genérica `select{padding:8px
  10px;...}` sin `width`. Un `<select>` nativo, sin ancho explícito, mide su caja por el texto de
  la OPCIÓN ACTUALMENTE SELECCIONADA, no por la opción más larga de toda la lista. Como Boca, River
  y Racing tienen listas de años con textos de largo distinto ("Ejercicio 2025/2026 (esperando
  datos)" en Boca vs. "Ejercicio 2024/2025" en River, por ejemplo), el box cambiaba de ancho al
  cambiar de club, Y TAMBIÉN al cambiar de ejercicio dentro del mismo club (ej. Boca 2027 con
  "(presupuestado)" vs. Boca 2024 sin sufijo).
- Fix: `#anioSelect{width:300px;max-width:100%;}` en el CSS, justo después de la regla genérica
  `select{...}`. 300px se determinó MIDIENDO en el navegador (no a ojo): se armó un `canvas` con
  `ctx.measureText()` usando la fuente computada real del `<select>`, y se confirmó seleccionando
  cada opción de los 3 clubes y leyendo `getBoundingClientRect().width` antes del fix. La etiqueta
  más larga de las 3 listas es la de Boca ("Ejercicio 2025/2026 (esperando datos)"), que medía
  ~282.5px de ancho natural (con la flecha nativa del `<select>` incluida); 300px deja margen.
- Verificado en el navegador, iterando programáticamente las 3 listas de opciones (Boca: 9 años,
  River: 3, Racing: 7): las 19 combinaciones club-ejercicio dan exactamente 300px de ancho, sin
  ninguna variación (antes del fix daban 282.5px/165px/271px según club, cambiando además dentro
  de cada club según el ejercicio elegido). Sin truncar la etiqueta más larga (confirmado con
  captura de pantalla). `#gestionSelect` tiene el mismo problema de fondo (Racing "Milito
  (2024-actual)" vs. River "Brito (2021-actual)" son largos distintos) pero Guido pidió
  específicamente el de "Año", no se tocó el de Gestión, queda a criterio de Guido si quiere el
  mismo tratamiento ahí.
- Gotcha de testing encontrado en esta sesión, sumado a la lista de gotchas de
  `.claude/skills/club-or-year-onboarding/SKILL.md`: en este entorno de preview, el HTML principal
  (`index.html`, no solo los `<script src="data/....js">` ya documentados) puede quedar cacheado
  por el navegador incluso después de `navigate()` a la misma URL, mostrando una regla CSS nueva
  como si no existiera (`styleSheets[0].cssRules` no la incluía, aunque `curl` al mismo archivo SÍ
  la mostraba). Se confirmó agregando un query string cache-buster a la URL
  (`?nocache=<numero>`): con eso, la regla aparecía. Antes de asumir que una regla CSS/JS nueva "no
  funciona", probar con un cache-buster en la URL o una pestaña nueva del navegador.


## Versión 44 — ANCHO FIJO TAMBIÉN PARA "GESTIÓN", Y NUEVO ORDEN DE COMERCIAL/ABONOS EN FORMATO SIMPLIFICADO (RIVER/RACING)

Dos pedidos de Guido, sobre lo hecho en la Versión 43 y en el motor genérico de River/Racing.

1. ANCHO FIJO PARA "GESTIÓN"
Guido: "do the same for gestion." (mismo problema que "Año" en la Versión 43: el
`<select id="gestionSelect">` no tenía ancho propio, así que cambiaba de tamaño según el club
elegido).

- Medido en el navegador antes del fix (el ancho natural de un `<select>` sigue a la opción MÁS
  LARGA de su lista actual, no a la seleccionada, mismo hallazgo que la Versión 43): Boca 188px
  (más larga: "Riquelme (2023-actual)"), River 181px (más larga: "D'Onofrio (2013-2021)"), Racing
  165px (más larga: "Milito (2024-actual)").
- Fix: `#gestionSelect{width:200px;max-width:100%;}` en el CSS, junto a `#anioSelect{...}`.
- Verificado en el navegador iterando las 3 listas de gestiones (Boca 3, River 2, Racing 2): las 7
  combinaciones dan exactamente 200px, sin variación. Cero errores de consola.

2. NUEVO ORDEN EN "FORMATO SIMPLIFICADO" DE RIVER/RACING: COMERCIAL Y ABONOS SUBEN A 2DA Y 3RA FILA
Guido: "for racing Formato simplificado, move Comercial/abonos 2nd in the table." Antes el orden de
Ingresos era Cuotas Sociales, Abonos, Partidos y competencias, Televisión, Comercial / Sponsors,
Venta de Jugadores, Fútbol profesional (sin desglosar).

- `GENERIC_SIMPLIFIED_REVENUE_BUCKETS` reordenado: Cuotas Sociales, **Comercial / Sponsors**,
  **Abonos**, Partidos y competencias, Televisión / Derechos de TV, Venta de Jugadores, Fútbol
  profesional (sin desglosar). Como este array es compartido por el motor genérico, el cambio
  afecta a River Y Racing por igual (verificado en el navegador para los dos), no solo a Racing.
- Si Guido en realidad quería el orden Abonos-luego-Comercial (en vez de Comercial-luego-Abonos,
  que es lo que se implementó, leyendo "Comercial/abonos" en ese orden literal), es un cambio de
  una sola línea (invertir esas dos entradas del array), avisar en la próxima sesión si hace falta
  corregir.
- Verificado en el navegador: Racing y River, Formato simplificado, las primeras 3 filas de
  Ingresos dan Cuotas Sociales / Comercial / Sponsors / Abonos en ese orden, para los dos clubes.


## Versión 45 — "PARTIDOS Y COMPETENCIAS" (RIVER/RACING) RENOMBRADO A "ESTADIO: RECAUDACIÓN DE PARTIDOS", MISMO NOMBRE QUE BOCA, SUBE A LA 3RA FILA

Guido: "para racing, 3ro en formato simplifcado pone Estadio:recaudacion de partidos, como tenemos
en boca. ahi van las ventas de ticket." Pidió esto viendo que Boca, en su Formato simplificado, ya
tiene una fila "Estadio: recaudación de partidos" (`simplifiedReportForBoca`, Ejercicio 2027) y
quería el mismo vocabulario para River/Racing.

- El bucket ya existía con la categoría correcta (`cats:['matchday_competition']`, que es
  exactamente "recaudación de entradas/tickets" según la tabla de mapeo de
  `.claude/skills/club-data-mapping/SKILL.md` sección 1), solo tenía un label distinto ("Partidos y
  competencias") y estaba 4to en vez de 3ro. Se renombró el label y se movió a la posición 3
  (Abonos, que estaba 3ra, baja a 4ta). Ningún cambio de categoría ni de cifras, solo nombre y
  orden.
- Como `GENERIC_SIMPLIFIED_REVENUE_BUCKETS` es compartido, el cambio quedó igual para River Y
  Racing (Guido pidió "para racing" puntualmente, pero separar el label por club hubiera roto la
  premisa de "Formato simplificado": buckets consistentes entre los clubes del motor genérico).
- Verificado en el navegador: Racing y River, Formato simplificado, la fila 3 de Ingresos dice
  "Estadio: recaudación de partidos" en los dos, con el mismo monto que antes tenía "Partidos y
  competencias" (no cambió el número, solo el nombre y la posición). Cero errores de consola.


## Versión 46 — REGLA PERMANENTE, "FORMATO SIMPLIFICADO" USA LA CATEGORIZACIÓN DE BOCA PARA TODOS LOS CLUBES; DISCREPANCIAS REALES ENCONTRADAS, CONSULTADAS A GUIDO, Y RESUELTAS

Guido, después de pedir el cambio puntual de la Versión 45 (Estadio: recaudación de partidos):
"utiliza para todos los Formato Simplificado el formato que tiene Boca y la logica. Si hay
discrepancias o algo que no permite usar esa categorizacion, consultame antes. anotalo esto para
regla parasiempre."

**Regla anotada** en `.claude/skills/club-data-mapping/SKILL.md` sección 10 (leer ahí el detalle
completo). Resumen: Ingresos de Boca son Cuotas Sociales, Comercial/Sponsors, Estadio (recaudación
+ TV + premios, combinados o separados según el detalle disponible), Entradas/Abonos, Venta de
Jugadores, Otras secciones deportivas y otros ingresos. Gastos son Compra de jugadores, Salarios y
primas, Inversiones, Otros gastos. Esas categorías (nombres, agrupación, catch-all curado en vez de
residual) son la referencia para CUALQUIER club de acá en adelante.

**Investigación hecha (agente Explore, leyendo `data/river-data.js`/`data/racing-data.js` línea por
línea) antes de tocar código**, 3 discrepancias reales encontradas y presentadas a Guido con
`AskUserQuestion` (no se resolvieron solas ni se improvisó nada):

1. River (único ejercicio real hoy, 2024): 66,7% del revenue está en UNA sola línea sin desglosar
   ("Fútbol Profesional"), con la plata de entradas/TV/premios mezclada adentro, sin `rawLabel`s
   propios para separarla. **Decisión de Guido: dejarlo como está por ahora** (recomendado por
   Claude): el catch-all sigue absorbiendo esa plata, documentado como límite de la fuente. No se
   tocó River en esta versión.
2. Racing: `matchday_competition` mezclaba ventas de entradas con "cobranzas por participación"
   (premios), aunque el documento fuente de los presupuestos 2026/27 SÍ las reporta como 2 líneas
   propias. **Decisión de Guido: separarlas** (recomendado por Claude). Implementado: categoría
   nueva `competition_bonus` en `data/category-map.js` (+ label "Premios por competencias"), las 2
   líneas reales "Cobranzas por participación" de `data/racing-data.js` (2026 y 2027) re-etiquetadas
   de `matchday_competition` a `competition_bonus` (mismo monto, no se inventó nada), y bucket nuevo
   "Premios por competencias" agregado a `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`.
3. Gastos: catch-all "Otros gastos" enorme en los 2 clubes (River ~80%, Racing 53-77%) porque los
   datos ya cargados categorizan la mayoría de líneas como `other_expenses` genérico. **Decisión de
   Guido: por ahora no** (recomendado por Claude): re-categorizar esto es trabajo real de re-mapeo
   en los 2 archivos de datos, no un ajuste cosmético. Solo se renombraron los 3 buckets de gastos
   que YA existían para que coincidan con el vocabulario de Boca (ver abajo), sin tocar qué línea
   cae en cuál categoría.

**Cambios de nombre/orden aplicados** (no cambian ningún número, solo vocabulario y agrupación,
para que las dos vistas del motor genérico lean igual que Boca):
- `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`: "Abonos" → "Entradas / Abonos"; nuevo bucket "Premios por
  competencias" (`cats:['competition_bonus']`) agregado después de Televisión. Catch-all "Otras
  secciones y otros ingresos" → "Otras secciones deportivas y otros ingresos".
- `GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` reordenado y renombrado para calzar con el orden de Boca:
  "Amortización / Deterioro de pases" → "Compra de jugadores" (ahora 1ro); "Salarios del plantel" →
  "Salarios y primas (plantel y cuerpo técnico)" (2do); "Depreciación y otras amortizaciones" →
  "Inversiones (amortizaciones y depreciación)" (3ro). "Fútbol profesional (sin desglosar por la
  fuente)" queda igual (no tiene equivalente en Boca, es un caso que solo existe en el dato de
  Racing).
- `data/category-map.js`: de paso se agregó `broadcasting` a `REVENUE_CATEGORIES`/
  `REVENUE_CATEGORY_LABELS` (categoría real que Racing ya usaba en la práctica pero le faltaba en
  esta lista de referencia, to-do viejo del skill, sección 0).
- `.claude/skills/club-data-mapping/SKILL.md` sección 1 (tabla de mapeos): fila nueva para
  "Cobranzas por participación" → `competition_bonus`, con la aclaración de que esta categoría
  SOLO aplica cuando el documento fuente separa premios de recaudación como líneas propias.

**Verificado en el navegador**: Racing 2026/2027, Formato simplificado, "Estadio: recaudación de
partidos" y "Premios por competencias" aparecen como filas separadas con sus montos reales (ej.
2027: 2.6 M USD y 1.6 M USD respectivamente, que suman los mismos 4.2 M USD que antes tenía la fila
combinada, no se perdió ni se duplicó nada). River, Formato simplificado, todos los labels de
Gastos ahora dicen "Compra de jugadores"/"Salarios y primas..."/"Inversiones..." igual que Boca.
`verifyTieOuts()` sigue pasando para los 3 clubes, cero errores de consola.

Gotcha de testing repetido en esta sesión (ya documentado en
`.claude/skills/club-or-year-onboarding/SKILL.md`): después de editar `data/racing-data.js`, ni
`navigate()` con cache-buster en la URL ni una pestaña nueva alcanzaron para ver el cambio, el
`<script src="data/racing-data.js">` seguía sirviendo la versión vieja. Lo que sí funcionó: cambiar
el puerto del server en `.claude/launch.json` (8951 a 8952), confirmar el fix, y devolver el
puerto a 8951 al terminar. Confirmado con `curl` al servidor (mostraba el archivo correcto) contra
`racingRevenueLinesByYear[2027]` en la consola del navegador (mostraba el valor viejo) ANTES de
concluir que hacía falta cambiar de puerto.


## Versión 47 — EL ORDEN DE "FORMATO SIMPLIFICADO" (RIVER/RACING) TAMBIÉN TIENE QUE CALZAR CON BOCA, Y SE ESCONDE "FÚTBOL PROFESIONAL (SIN DESGLOSAR)" CUANDO ESTÁ EN $0

Guido, mirando el resultado de la Versión 46: "la tabla de Formato simplificado tiene que quedar
exactamente igual ordenada tambien. el orden importa. y en racing pusiste 'Fútbol profesional (sin
desglosar por la fuente)' y esta en cero, sacalo."

1. ORDEN: la Versión 46 igualó nombres/agrupación pero no reordenó del todo. `GENERIC_SIMPLIFIED_
REVENUE_BUCKETS` pasó de [Cuotas, Comercial, Estadio, **Entradas/Abonos**, Televisión, Premios,
Venta, Fútbol-lump] a [Cuotas, Comercial, Estadio, **Televisión, Premios**, Entradas/Abonos, Venta,
Fútbol-lump]: el mismo orden que arma `simplifiedReportForBoca()` para el Ejercicio 2027 (Estadio
→ Televisión → Premios → Entradas/Abonos, no Entradas/Abonos metido en el medio). `GENERIC_
SIMPLIFIED_EXPENSE_BUCKETS` ya tenía el orden correcto desde la Versión 46 (Compra de jugadores,
Salarios y primas, Inversiones), no hizo falta tocarlo.

2. "FÚTBOL PROFESIONAL (SIN DESGLOSAR POR LA FUENTE)" EN $0: esta categoría no tiene equivalente en
Boca (existe solo porque a veces el dato de Racing/River no separa más), así que mostrarla en $0
para un club/año que sí tiene todo desglosado (como Racing 2024-2027, desde el fix de la Versión 38
que promovió sus sub-ítems a categorías reales) rompía la promesa de "exactamente igual" con Boca:
era una fila extra, vacía, que Boca ni siquiera podría tener.

- Fix: los 2 buckets "Fútbol profesional (sin desglosar por la fuente)" (Ingresos y Gastos) suman
  `hideIfZero:true` a su definición. `bucketize()` ahora filtra (`.filter(row =>
  !(row.hideIfZero && row.value === 0))`) esas filas específicas cuando dan exactamente 0, antes de
  pintarlas. Los demás buckets (incluidos los que también pueden dar $0, como "Venta de Jugadores"
  cuando un club no vendió a nadie ese año) se siguen mostrando siempre, igual que ya hace Boca,
  para no perder la transparencia de "$0 real, no un dato faltante" que rige en el resto del sitio.
- Verificado en el navegador: Racing (2024-2027, todos los ejercicios con este bucket en $0) ya no
  muestra la fila. River 2024 (el único caso real con esta categoría en un monto grande, 67% del
  revenue, "Fútbol Profesional" sin desglosar) SIGUE mostrando la fila con su monto real, la regla
  distingue por valor, no por club. `verifyTieOuts()` sigue pasando para los 3 clubes, cero errores
  de consola.
- Mismo gotcha de caché de `data/racing-data.js` que la Versión 46 (ver ahí), esta vez se evitó
  directamente probando en un puerto nuevo (8953) en vez de perder tiempo con cache-busters que ya
  se sabía que no alcanzaban para este archivo puntual.


## Versión 48 — LOS LABELS TIENEN QUE SER IDÉNTICOS, NO SOLO PARECIDOS ("TELEVISIÓN" VS. "TELEVISIÓN / DERECHOS DE TV"), Y GOTCHA DE VERIFICACIÓN CON GREP

Guido, dos preguntas/pedidos después de la Versión 47: "hiciste que mantener el orden feura una
regla para futuro tambien?" (sí, ver REGLA de la Versión 47 arriba y sección 10 del skill) y "en
Boca psusite Television y en racing psuiste Television / Derechos de TV. Urnifica, tienen que ser
exactamente iguales los nombres. homologar."

- Bug real: Boca usa el label `'Televisión'` (fila del Ejercicio 2027, `estadioRows2027` en
  `simplifiedReportForBoca()`). El motor genérico (`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`) tenía
  `'Televisión / Derechos de TV'` para la categoría `broadcasting`: un nombre PARECIDO pero no
  idéntico, sobrevivió a las Versiones 44-47 (que ya habían homologado otros labels) porque nunca
  se comparó carácter por carácter contra `simplifiedReportForBoca()`, solo a ojo. Corregido a
  `'Televisión'` exacto. Se revisaron los demás labels de `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/
  `_EXPENSE_BUCKETS` uno por uno contra los de `simplifiedReportForBoca()` (Cuotas Sociales,
  Comercial / Sponsors, Estadio: recaudación de partidos, Premios por competencias, Entradas /
  Abonos, Venta de Jugadores, Compra de jugadores, Salarios y primas (plantel y cuerpo técnico),
  Inversiones (amortizaciones y depreciación), catch-alls "Otras secciones deportivas y otros
  ingresos"/"Otros gastos") y todos ya coincidían exacto, no había más discrepancias.
- REGLA REFORZADA documentada arriba en ESTADO ACTUAL y en el skill: homologar un label significa
  copiarlo literal de `simplifiedReportForBoca()`, no aproximarlo.
- Gotcha de verificación encontrado en esta misma sesión (repasando el propio trabajo de
  limpieza de em dashes de versiones anteriores): el patrón `grep -noP '.{20}—.{20}'` usado para
  listar el contexto alrededor de cada em dash restante FALLABA SILENCIOSAMENTE en líneas con
  varios caracteres acentuados cerca del guion (más, línea, categoría, etc.). El cuantificador
  `.{20}` con `-P` no siempre cuenta bien caracteres multi-byte UTF-8 en este entorno, así que esas
  líneas simplemente no aparecían en el resultado, dando una falsa sensación de "está todo limpio".
  Se encontraron 3 em dashes reales que habían quedado sin corregir en las Versiones 46-47 por
  confiar en ese patrón. El chequeo confiable, usado de acá en adelante: `grep -n '—' archivo`
  (sin capturar contexto con cuantificador de caracteres), revisando cada línea a mano.


## Versión 49 — "ESTADIO" Y "ABONOS" SON 2 CONCEPTOS DISTINTOS, NO EL MISMO REPARTIDO EN 2 FILAS

Guido: "en Formato Simplificado hay un tema a resolver aun. el row Estadio y el row Entradas/Abonos
conceptualmente son parecidos. Yo quiero que en Estadio esten las entradas que vende el club, y en
Abonos los Abonos/Season tickets. resolvelo y que quede de regla."

- Causa de la confusión: la fila de abonos se llamaba `'Entradas / Abonos'` (en
  `simplifiedReportForBoca()` Y en `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`), como si las entradas por
  partido individual estuvieran repartidas entre esa fila y "Estadio: recaudación de partidos". No
  es así: "Estadio" YA es 100% entradas por partido (Boca: `r.exhibicionEspectaculos`, que en el
  desglose 2027 son las "Recaudaciones" de Torneo Oficial/Copa Libertadores/Amistosos, ningún
  abono ahí adentro), y la otra fila (Boca: `r.abonos`, "Abonos a palcos, plateas y cocheras" del
  balance) SIEMPRE fue pura plata de abono de temporada, nunca tuvo entradas sueltas mezcladas. El
  bug no era de datos, era de LABEL: decir "Entradas / Abonos" hacía pensar que sí había mezcla,
  cuando en realidad la fila ya era abonos puros.
- Fix: se sacó la palabra "Entradas /" del label en los 2 lugares (`simplifiedReportForBoca()` y
  `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`), queda simplemente `'Abonos'`. Mismo valor, ningún número
  cambió, solo el nombre. Afecta a Boca, River y Racing por igual.
- Regla de distinción documentada en el comentario de `simplifiedReportForBoca()` (arriba del array
  `estadioRows2027`) y en `.claude/skills/club-data-mapping/SKILL.md` sección 10: "Estadio" = venta
  PARTIDO POR PARTIDO (walk-up/single-match), "Abonos" = pago por adelantado de TODA la temporada.
  Cualquier rubro nuevo de venta de acceso al estadio, de cualquier club futuro, se mapea a una de
  estas dos categorías con esa pregunta ("¿por partido o por temporada completa?"), nunca a un
  label combinado.
- Se actualizaron también las 2 referencias "vivas" que quedaban con el label viejo (ESTADO ACTUAL
  de este mismo archivo y el comentario arriba de `GENERIC_SIMPLIFIED_REVENUE_BUCKETS`, más las 2
  menciones equivalentes en el skill). Las entradas de historial de versiones anteriores (44-48)
  se dejaron tal cual, son registro histórico de lo que decía el código en su momento, no hace falta
  reescribirlas.
- Verificado en el navegador: Boca, River y Racing, Formato simplificado, la fila antes llamada
  "Entradas / Abonos" ahora dice "Abonos" en los 3 clubes, con el mismo monto de antes.
  `verifyTieOuts()` sigue pasando, cero errores de consola.


## Versión 50 — "(PRESUPUESTADO)" YA NO SE SUPERPONE CON "% DEL TOTAL" EN EL HEADER DE LA TABLA

Guido: "el '(PRESUPUESTADO)' en la columna se superpone y dificulta la lecutra de '% DEL TOTAL'.
estaria bueno que pusiera Presupuesto 2026/2027, lo cual ahorra letras y permite que entre."

- `ejercicioLabel(year, suffix)` cambió de firma a `ejercicioLabel(year, isPresupuesto)`: antes
  agregaba `' (presupuestado)'` AL FINAL del texto ("Ejercicio 2026/2027 (presupuestado)", 36
  caracteres, se word-wrappea a 2 líneas en la columna angosta del header y la 2da línea invade el
  espacio de la columna "% del total" de al lado). Ahora, si `isPresupuesto` es `true`, cambia el
  PREFIJO de "Ejercicio" a "Presupuesto" y no agrega nada más ("Presupuesto 2026/2027", 22
  caracteres, entra en una sola línea).
- Alcance del cambio: SOLO el header de la tabla "Estado de resultados"
  (`finanzasPLTableCurLabel`/`finanzasPLTablePrevLabel`), el header de la tabla "Deuda"
  (`finanzasDebtTableCurLabel`), y el stat "Último resultado (...)" de Inicio, todos alimentados por
  `cur.yearLabel` (`computeYear`/`computeYearGeneric`). El dropdown "Año" (`#anioSelect`) NO se tocó
  a propósito, sigue mostrando "Ejercicio AAAA/AAAA (presupuestado)" en los 3 clubes: no tiene el
  problema de espacio de la tabla (el dropdown ya tiene ancho fijo de la Versión 43), y así se ve
  consistente entre Boca (arrays hardcodeados en `populateFinanzasSelectors`) y River/Racing (arma
  el label con el mismo patrón viejo a mano, ya no vía `ejercicioLabel`, para no heredar el cambio
  de estilo sin querer).
- Verificado en el navegador, con captura de pantalla: Boca Ejercicio 2026/2027, el header de la
  tabla ahora dice "PRESUPUESTO 2026/2027" en una sola línea, sin invadir "% DEL TOTAL". Cero
  errores de consola.

## Versión 51 — LIMPIEZA DE ARQUITECTURA ANTES DE SEGUIR AGREGANDO CLUBES (LOS 3 PASOS: FIX DE

CATEGORY-MAP.JS, SEPARACIÓN CÁLCULO/RENDER, Y LAZY-LOADING DE RIVER/RACING)
Guido pidió una auditoría de arquitectura antes de seguir cargando clubes nuevos (sin cambiar nada
visible), un plan concreto, y recién con su OK, implementarlo en 3 commits de git separados para
tener puntos de vuelta atrás claros. Primera vez que el repo (entonces `numeros-de-boca`) tiene control de versiones:
no tenía `.git` propio (está gitignored en el repo padre "Website propio", ver CLAUDE.md, "proyecto
separado"), se inicializó un repo nuevo ACÁ ADENTRO con un commit baseline del estado previo a
esta sesión, y de ahí en adelante los 3 commits pedidos.

Auditoría (resumen, informada a Guido antes de tocar nada):
- Cálculo vs. render en index.html: ya bastante separado a nivel de qué devuelve cada función
  (`computeYear`/`computeYearGeneric`/`simplifiedReportForBoca`/`simplifiedReportForGeneric`/
  `nativeReportFor`/`toDisplayValue`/`yearMetaFor` devuelven números u objetos, no HTML), pero un
  puñado de funciones puente (`buildNativeSectionHtml`, `renderFinanzasStats*Generic`,
  `update*ByGestion/ByAnio*Generic`) calculan un derivado chico (% del total, crecimiento) EN el
  mismo paso en que arman el `<tr>`.
- River/Racing SÍ se bajan siempre (`<script src>` fijo en el `<head>`), aunque el visitante solo
  mire Boca, porque el sitio es una SPA de una sola página (`index.html`, el selector de club
  cambia `currentClub` en el cliente, sin navegación) — cualquier lazy-loading real tiene que ser
  carga dinámica de `<script>` al cambiar de club, no "una página por club".
- Consistencia de nombres entre `clubs.js`/`category-map.js`/`river-data.js`/`racing-data.js`:
  100% consistente en `fiscalYearMeta` (mismos campos en los 3 clubes), `disclosureLevel`,
  `sourceId`/`reportType`, formato de `items`. Encontrada UNA inconsistencia real:
  `category-map.js` documentaba `transfer_income_gross` para venta de jugadores, pero
  `racing-data.js` (9 líneas) y el motor real (`GENERIC_SIMPLIFIED_REVENUE_BUCKETS` en index.html)
  ya usaban `player_sales` en la práctica (aceptando el otro nombre solo como alias muerto);
  `player_sales` no tenía entrada en `REVENUE_CATEGORIES`/`REVENUE_CATEGORY_LABELS`. Esto
  actualiza al día el to-do que ya tenía anotado `club-data-mapping/SKILL.md` sección 0 (decía que
  faltaban `broadcasting` Y `player_sales`; `broadcasting` ya se había agregado en algún momento
  sin actualizar esa nota, solo `player_sales` seguía realmente pendiente).
- Nota de contexto (no es inconsistencia a corregir, ya documentada a propósito en los skills):
  los datos de Boca (`yearsRaw`) usan una forma completamente distinta a `revenueLines`/
  `expenseLines` con `normalizedCategory` de River/Racing (Boca no usa el motor genérico). Esto
  importa para el lazy-loading: Boca no tenía archivo de datos propio para poder diferirlo.

Commit 1 (`fix: unify player_sales category name in category-map.js`): `transfer_income_gross` ->
`player_sales` en `REVENUE_CATEGORIES`/`REVENUE_CATEGORY_LABELS` de `category-map.js`, y se sacó el
alias muerto de `GENERIC_SIMPLIFIED_REVENUE_BUCKETS` en index.html (quedó `cats:['player_sales']`
solo). Verificado en el navegador: Racing 2024, fila "Venta de Jugadores" del Formato simplificado
sigue en 30.5 M USD, igual que antes del cambio.

Commit 2 (`refactor: separate finanzas calc/render into their own files`): ~2530 líneas se movieron
del `<script>` principal a 3 archivos nuevos, SIN cambiar una sola línea de código (extracción
mecánica con un script que garantiza, por construcción, que cada línea original queda en exactamente
un lugar nuevo, ni se pierde ni se duplica nada — verificado además con `node --check` en los 4
archivos resultantes):
- `data/boca-data.js`: `yearsRaw`, `revenueBreakdown`, `expenseBreakdown`, `expenseSubBreakdown`,
  `nativeFinancialsBoca`, `gestionesInfo`, `pasesData`, `resultadosData`, `titulosData` (9 consts).
- `js/finanzas-calc.js`: 29 funciones/consts de cálculo puro (`yearMeta`, `yearMetaFor`,
  `toDisplayValue`, `computeYear`, `computeYearGeneric`, `simplifiedReportForBoca`,
  `simplifiedReportForGeneric`, `nativeReportFor`, `sumCat`, `fmtDisplay`/`fmtAmount`/etc.,
  `debtDisclosureNote`, `genericFxNote`, `computeYearForClub`, `displayFinancialsForClub`,
  `currentGestionKey`, `pasesNetSpend`, `reportTypeForYear`, `GENERIC_SIMPLIFIED_*_BUCKETS`, entre
  otras). Ninguna toca el DOM.
- `js/finanzas-render.js`: 44 funciones/consts de render (`buildNativeSectionHtml`,
  `renderBreakdownRows`, `renderNativePLTable`, `drawTrendChart*`/`drawBreakdownChart*`,
  `renderFinanzasStats*`, `update*ByGestion/ByAnio*`, todos los `render*Card`, `renderResultados`,
  `renderComparar`, `renderInicioStats`, `populateFinanzasSelectors`/`populatePasesSelectors`/etc.,
  y los datos de contenido de cards `presupuestoSupuestosByClub`/`presupuestoFinancieroByClub`/
  `presupuestoInversionesByClub`/`finanzasClubSourceText`).
- Decisión de alcance documentada en el header de `finanzas-render.js`: las funciones puente
  (`buildNativeSectionHtml`, `renderFinanzasStats*Generic`, `update*Generic`) se movieron TAL CUAL,
  sin partir a mano el cálculo del render que hacen internamente. Separar eso a mano exigía tocar
  el cuerpo interno de funciones financieras ya verificadas, con historial real de bugs sutiles de
  doble conversión al generalizarlas (ver `club-data-mapping/SKILL.md`); el riesgo no se justificaba
  solo para mover archivos. Queda como candidato a un pase futuro más quirúrgico, no como deuda
  silenciosa.
- Lo que quedó en index.html a propósito (no es "cálculo" ni "render", es estado/orquestación):
  `FX_RATE`/`currentCurrency`/`simplifyFormat`/`currentClub` (estado mutable compartido),
  `refreshFinanzas`/`refreshAllForClub` (orquestan, llaman a las funciones movidas en el orden
  correcto), `verifyTieOuts` (corre las verificaciones), y el bloque `INIT`/event listeners.
- Orden de carga en el `<head>` después de este commit: `data/clubs.js` → `data/category-map.js` →
  `data/river-data.js` → `data/racing-data.js` → `data/boca-data.js` → `js/finanzas-calc.js` →
  `js/finanzas-render.js` → `<script>` principal (el Commit 3, más abajo, saca River/Racing de
  acá).
- Verificado extensamente en el navegador (no solo `verifyTieOuts()`): los 3 clubes, las 2 vistas
  de Finanzas (Año a año / Por gestión), los dos toggles (USD/ARS, Formato del club/simplificado)
  probados juntos y por separado, las pestañas Mercado de Pases/Resultados/Comparar Gestiones/
  Inicio, con captura de pantalla en cada caso. Las 16 verificaciones de `verifyTieOuts()` siguen
  cerrando exacto igual que antes del refactor. Cero errores de consola. Los 3 archivos nuevos
  cargan 200 (o 304 en la recarga siguiente), no 404.

Guido revisó el sitio con los Pasos 1-2 ya hechos ("veo todo bien") y dio el OK para el Paso 3.

Commit 3 (`perf: lazy-load river/racing data files on club switch`): `data/river-data.js`
(~17 KB) y `data/racing-data.js` (~46 KB) ya NO están en el `<head>` como `<script src>` fijo, se
inyectan bajo demanda con una función nueva en index.html, `loadClubData(clubId)` (crea un
`<script>`, lo agrega a `<head>`, resuelve una Promise en su `onload`), cacheando en
`clubDataLoaded{}` qué club ya se bajó para no volver a pedir el archivo si el visitante va y
vuelve entre clubes. El listener de `clubSelect` ahora es async: espera a `loadClubData(newClub)`
antes de setear `currentClub`/llamar a `refreshAllForClub()`; si la carga falla (red caída), revierte
el `<select>` al club anterior y avisa con un `alert()`, en vez de dejar la pantalla a medio
actualizar. Boca sigue siendo el único club que carga siempre (`data/boca-data.js` en el `<head>`,
sin cambios), es el club default.
- 2 bugs reales encontrados y corregidos AL PROBAR EN EL NAVEGADOR (no se habrían visto revisando
  el código a mano ni con `node --check`, que solo valida sintaxis): 3 lugares del código (2 en
  `finanzas-render.js`: `drawTrendChartGeneric`/`populateFinanzasSelectors`; y los 3 diccionarios
  `pasesDataByClub`/`resultadosDataByClub`/`titulosDataByClub` que antes vivían en index.html)
  armaban un objeto `{ river: riverFiscalYearMeta, racing: racingFiscalYearMeta }` (o el
  equivalente con pasesData/resultadosData/titulosData) para después indexarlo por `clubId`. Un
  objeto así evalúa SUS DOS propiedades al crearse, así que con lazy-loading tira
  `ReferenceError: racingFiscalYearMeta is not defined` en cuanto el visitante elige River (el
  archivo de Racing todavía no se bajó, pero el objeto igual intenta leer esa variable global para
  poder armar la propiedad `racing:` del objeto, aunque después nunca se use esa rama). Fix: los 2
  lugares de `finanzas-render.js` pasaron a un ternario (`clubId === 'river' ? riverX : racingX`,
  que solo evalúa la rama que hace falta); los 3 diccionarios pasaron de `const` armados una sola
  vez a funciones (`pasesDataForClub(clubId)`/`resultadosDataForClub(clubId)`/
  `titulosDataForClub(clubId)`, mismo ternario adentro), porque solo una función difiere la lectura
  del global hasta el momento en que efectivamente se LLAMA (que siempre pasa después de que
  `loadClubData` ya resolvió). Regla general para el futuro (sumada a `club-or-year-onboarding`):
  con lazy-loading, cualquier `{ river: X, racing: Y }` armado de una vez es sospechoso, hay que
  revisar si se puede reemplazar por un ternario o una función.
- `verifyTieOuts()` ahora acepta un `onlyClub` opcional, con los bloques de checks de Racing/River
  gateados por `typeof racingFiscalYearMeta !== 'undefined'`/`typeof riverFiscalYearMeta !==
  'undefined'`: al abrir la página (INIT) solo corren los 3 checks de Boca (único club cargado en
  ese momento); el listener de `clubSelect` llama a `verifyTieOuts(newClub)` de nuevo apenas
  `loadClubData` resuelve, así el club recién cargado también se verifica, solo que DIFERIDO al
  momento en que su dato realmente llega, en vez de perderse la verificación por completo.
- Alcance deliberado, NO movido en este commit: las cards "Supuestos"/"Presupuesto
  Financiero"/"Presupuesto de Inversiones" de Racing (`presupuestoSupuestosByClub.racing` y
  afines, en `js/finanzas-render.js`, agregadas en el Commit 2) siguen cargando siempre, no se
  movieron a `data/racing-data.js`. Es contenido de card (unos pocos KB de texto), no la data
  financiera pesada (`revenueLines`/`expenseLines`/`fiscalYearMeta`, que sí son el ~46 KB/~17 KB
  que efectivamente se estaban bajando de más) — mover esto también habría exigido que
  `racing-data.js` mute un objeto ya declarado en `finanzas-render.js` (un acoplamiento entre
  archivos más frágil), por un ahorro chico. Documentado como decisión de alcance, no como deuda
  silenciosa: si se vuelve un problema real de peso, es un cambio acotado a esos 3 diccionarios.
- Verificado extensamente en el navegador: carga fresca (Network confirma que `river-data.js`/
  `racing-data.js` NO se piden hasta elegir ese club), switch racing→river→boca→racing→river con
  un listener de `window.addEventListener('error', ...)` propio (más confiable que leer la consola
  acumulada de sesiones de prueba previas) sin ningún error, re-selección del mismo club sin volver
  a pedir el archivo (confirmado en Network, un solo GET 200 por archivo en toda la sesión), los 3
  clubes con los 2 toggles y las 6 pestañas, y las verificaciones de `verifyTieOuts()` (Boca +
  Racing + River) cerrando igual que en los Commits 1-2.

Con los 3 pasos confirmados funcionando, se actualizan a continuación los skills
`club-or-year-onboarding` y `club-data-mapping` para que esta arquitectura (data file propio del
club cargado bajo demanda, cálculo separado de render, nombres de campo consistentes con
`category-map.js`) sea el punto de partida del próximo club, no una limpieza única que se pueda
perder de vista.

## Versión 52 — HOMOLOGACIÓN DE "COMPRA DE JUGADORES" DE RACING CON BOCA EN FORMATO SIMPLIFICADO

Guido pidió, como próximo paso explícito: "homologar egresos en racing a como lo tiene Boca".

Contexto (ver también `.claude/skills/club-data-mapping/SKILL.md` sección 10, "Investigación real
hecha en la Versión 46"): esa versión había renombrado los buckets de Gastos del motor genérico
(`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS`) para usar el mismo vocabulario que Boca ("Compra de
jugadores" / "Salarios y primas" / "Inversiones" / catch-all), pero había dejado explícitamente SIN
re-categorizar ninguna línea real de `data/racing-data.js`, así que aunque el NOMBRE del bucket
coincidía con Boca, el bucket "Compra de jugadores" (`cats:['player_amortisation',
'player_impairment']`) daba $0 para Racing en absolutamente todos los años cargados, porque ninguna
línea real de Racing usaba esas dos categorías todavía. Esa plata (real, no chica: entre ~$1,5 M y
~$28 M USD según el año) estaba enterrada dentro del catch-all "Otros gastos".

Trabajo hecho: se revisaron las ~60 líneas de `racingExpenseLinesByYear` (los 7 ejercicios
cargados, 2009-2011 y 2024-2027) buscando cuáles correspondían conceptualmente a plata gastada en
comprar/transferir jugadores. Se identificaron 4 rótulos candidatos:
- "Costo transferencia de jugadores" (2009, 2010, 2011, 2024, 2025): el costo de fichajes tal cual
  lo reporta el Estado de Recursos y Gastos de cada balance auditado.
- "Pago por adquisición de jugadores" (2026, 2027): el equivalente en los presupuestos financieros
  (cash-flow), mismo concepto.
- "Pago de gastos por compraventa de jugadores" (2026, 2027): comisiones/intermediación de la
  operación, no el costo del pase en sí.
- "Egresos extraordinarios (compra de bienes de uso y mejoras, principalmente)" (2026, 2027): CAPEX,
  plata de caja para comprar activos fijos, no tiene que ver con jugadores pero se revisó igual por
  aparecer bajo el mismo bucket "Inversiones" candidato.

Antes de tocar nada, se le presentaron a Guido con `AskUserQuestion` los 2 casos con criterio
ambiguo (siguiendo la REGLA NO OPCIONAL de `club-data-mapping/SKILL.md` sección 10: "si el
documento/dato fuente de un club NO permite separar/categorizar de esta misma manera... consultale
a Guido primero, mostrando exactamente qué discrepancia encontraste"):
1. "Pago de gastos por compraventa de jugadores": ¿sumarlo a "Compra de jugadores" (toda la plata
   vinculada a comprar/vender jugadores junta) o dejarlo en "Otros gastos" (porque Boca tampoco
   desglosa comisiones dentro de su bucket, que es solo amortización + deterioro de pases)? Guido
   eligió dejarlo en "Otros gastos", y pidió explícitamente documentar el criterio (este bloque +
   el skill).
2. "Egresos extraordinarios (compra de bienes de uso y mejoras)": ¿sumarlo a "Inversiones" (por el
   nombre, activos fijos) o dejarlo en "Otros gastos" (porque es CAPEX, un concepto de caja, y
   "Inversiones" en Boca es específicamente amortización+depreciación, un cargo contable no-cash)?
   Misma respuesta de Guido: dejarlo en "Otros gastos", documentado.

Cambio real aplicado (`data/racing-data.js`): las 7 líneas de "Costo transferencia de jugadores" /
"Pago por adquisición de jugadores" pasaron su `normalizedCategory` de `other_expenses` a
`player_amortisation`, SIN cambiar ningún `amountNative`. Racing no distingue amortización de
deterioro de pases como puede hacer Boca (no capitaliza, expensa el costo completo de la operación
al momento en que ocurre), así que toda esa plata entra a `player_amortisation` sola, sin uso de
`player_impairment` para Racing todavía. Se agregó un comentario extenso en `data/racing-data.js`,
justo antes de `racingExpenseLinesByYear`, documentando esta decisión y los 2 casos que quedaron sin
tocar, para que una sesión futura no vuelva a evaluar lo mismo de cero.

BUG REAL encontrado al verificar (CORRECCIÓN a lo que decía este mismo párrafo al principio de esta
versión: se había asumido "0 riesgo de romper verifyTieOuts(), esos checks suman por monto, no por
categoría", ASUNCIÓN INCORRECTA): los checks de Racing 2026/2027 en `verifyTieOuts()` sumaban
`racing2026.expenses` SOLO (sin `nonCash`), algo que nunca había importado porque esos presupuestos
nunca tuvieron plata en categorías no-efectivo hasta este cambio. Al mover "Pago por adquisición de
jugadores" a `player_amortisation` (una categoría no-efectivo en `computeYearGeneric()`), esa plata
pasó a `nonCash` y el check dejó de verla ($19.010 M / $19.318 M de diferencia). Fix: los 2 checks
de 2026/2027 ahora suman `expenses + nonCash`, mismo criterio que ya usaban 2024/2025. Lección para
la Versión 53 (ver más abajo): re-categorizar SÍ puede romper cálculos que no dependen directamente
del bucket de "Formato Simplificado", hay que correr `verifyTieOuts()` en el navegador después de
cualquier cambio de `normalizedCategory`, no asumir que es inofensivo.

Verificado en el navegador: Formato Simplificado de Racing, los 7 ejercicios (2009-2011,
2024-2027), fila "Compra de jugadores" ahora muestra el monto real (antes $0 en los 7), fila "Otros
gastos" bajó exactamente esa misma plata (el `Total de Gastos` de cada ejercicio no cambió), y las
16 verificaciones de `verifyTieOuts()` cierran (tras el fix de arriba).

Actualizado `.claude/skills/club-data-mapping/SKILL.md`: la tabla de la sección 1 (separada la fila
de ingreso/gasto de transferencias, que antes mapeaba mal las dos al mismo `player_sales`) y la
sección 10 (agregado un párrafo describiendo este trabajo, para que quede claro que "Compra de
jugadores" de Racing ya no es un bucket vacío, con la salvedad de los 2 casos que se dejaron en el
catch-all a propósito).

## Versión 53 — FILAS DE GASTOS SIEMPRE IGUALES ENTRE CLUBES + 3 CATEGORÍAS NUEVAS PARA BAJAR EL

CATCH-ALL "OTROS GASTOS" DE RACING (DE 64% A 18%/0%)
Guido, sobre el trabajo de la Versión 52: "en 'formato simplificado', las rows tienen que ser
siempre iguales entre clubes, aunque alguna tenga un cero. y no puede ser que otros gastos tenga
64% del total. seguro que mirando los rows de boca, podes crear nuevos y reducir ese 64%".

Diagnóstico: la Versión 52 solo había resuelto "Compra de jugadores". El resto de "Otros gastos" de
Racing seguía siendo el 4to bucket genérico de siempre (`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` solo
tenía Compra de jugadores/Salarios y primas/Inversiones/catch-all), mientras que Boca, para su
Ejercicio 2027, YA arma 3 filas más chicas (`otrosGastos2027` en `js/finanzas-calc.js`):
"Organización de partidos", "Otras secciones deportivas (juvenil, otros deportes, básquet)" y
"Administración y gastos generales". Racing nunca tuvo esas 3 filas, así que aunque los NOMBRES de
los 4 buckets coincidieran con Boca, las FILAS mostradas eran distintas entre los dos clubes (Boca
2027: 7 filas de Gastos; Racing: siempre 4), y el catch-all de Racing (39%-64% según el ejercicio)
era mucho más grande que el de Boca 2027 (0%, todo repartido en las 6 filas nombradas).

Trabajo hecho:
1. `data/category-map.js`: 3 categorías nuevas en `EXPENSE_CATEGORIES`/`EXPENSE_CATEGORY_LABELS`:
   `match_organisation_expense` ("Organización de partidos"), `youth_other_sports_expense` ("Otras
   secciones deportivas (juvenil, otros deportes, básquet)"), `admin_general_expense`
   ("Administración y gastos generales"). Mismos labels, carácter por carácter, que ya usa
   `otrosGastos2027` de Boca (regla de la Versión 48, "urnifica, tienen que ser exactamente iguales
   los nombres").
2. `js/finanzas-calc.js`, `GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` (River/Racing): se agregaron las 3
   filas nuevas, en el mismo orden que Boca (después de Inversiones, antes del catch-all).
3. `js/finanzas-calc.js`, `simplifiedReportForBoca()`: `otrosGastos2027` y `otrosGastosDefault` se
   reescribieron para que las DOS ramas devuelvan el mismo set de 4 filas (las 3 nombradas + "Otros
   gastos"), no un set distinto según el año. Antes, un año sin el desglose de 2027 mostraba SOLO
   una fila "Otros gastos"; ahora muestra las 3 nombradas en $0 y el monto real completo en "Otros
   gastos" (mismo dato de siempre, solo que ahora conviviendo con las 3 filas en $0 en vez de estar
   solas). Verificado que para 2027 la suma de las 3 filas nombradas da EXACTO `r.otherExpenses`
   (-111846.180), así que "Otros gastos" da $0 para ese ejercicio, ningún peso se perdió.
4. `data/racing-data.js`: se revisaron TODAS las líneas que seguían en `other_expenses` (unas 40,
   entre los 7 ejercicios) y se re-etiquetaron según su rubro real (ver el comentario extenso, nuevo
   en esta versión, justo antes de `racingExpenseLinesByYear`, con el mapeo línea por línea
   completo). Resumen:
   - `match_organisation_expense`: "Organización de partidos" (años de balance) y "Pago de gastos
     por participación" (presupuestos).
   - `youth_other_sports_expense`: "Actividades deportivas y sociales" (balances), "Pago de gastos
     fútbol amateur (activable)" y "Egresos de otras secciones" (presupuestos).
   - `admin_general_expense`: "Televisión AFA"/"Honorarios..."/"Mantenimiento"/"Sellados, multas y
     gastos bancarios"/"Colegio"/"Sede Villa del Parque" (balances), "Pago de gastos explotación del
     estadio"/"Pago de gastos de comercialización"/"Otros egresos" (presupuestos).
   - `wages_squad` (caso consultado con `AskUserQuestion` antes de decidir, ver detalle completo en
     `.claude/skills/club-data-mapping/SKILL.md` sección 10): "Fútbol profesional" (balances) y
     "Pago de otros gastos deportivos fútbol profesional" (presupuestos), la línea más grande de
     todo el catch-all viejo (hasta ~30% de "Otros gastos" en algunos años), son costos NO
     salariales del plantel profesional (médico, indumentaria, viajes, pretemporada). Guido eligió
     sumarlos a "Salarios y primas" en vez de a una categoría nueva o dejarlos en el catch-all,
     siguiendo el mismo criterio que YA usa Boca 2027 (que mezcla este mismo tipo de costo dentro de
     su propio campo `wages`, ver detalle en el skill).
   - Quedaron en `other_expenses` (catch-all), sin tocar: los 4 casos ya consultados en la Versión
     52 ("Pago de gastos por compraventa de jugadores" y "Egresos extraordinarios", 2026/27).

BUG REAL encontrado y corregido en la misma sesión (más serio que el de la Versión 52, porque no
era solo un check de verificación, era el cálculo real del sitio): `computeYearGeneric()` armaba
`otherExpenses` (que alimenta `expenses`/`ebitda`/`operatingProfit`/`pat`, no solo "Formato
Simplificado") sumando SOLO `['other_expenses','lump_football_operations_expense']`. Al crear las 3
categorías nuevas y re-etiquetar ~40 líneas hacia ellas, esa plata quedó AFUERA de `otherExpenses`
por completo: Racing pasó a mostrar SUPERÁVIT en ejercicios con déficit real (ej. 2024: "Resultado
neto" pasó de -$6.127 M real a +$5.218 M calculado). `verifyTieOuts()` lo detectó de inmediato
(Revenue seguía cerrando, Expenses y PAT dejaron de cerrar en los 5 ejercicios con líneas
re-etiquetadas, con diferencias de $11-52 mil millones ARS). Fix: `otherExpenses` ahora suma las 3
categorías nuevas también, documentado con una REGLA PARA EL FUTURO en el comentario del código y
en el skill: cualquier categoría de gasto nueva tiene que sumarse explícitamente a `otherExpenses`
(si es efectivo) o a `nonCash` (si no lo es) dentro de `computeYearGeneric()`, agregarla solo a
`GENERIC_SIMPLIFIED_EXPENSE_BUCKETS` no alcanza (ese array solo controla la VISTA, no el cálculo).

Complicación aparte durante la verificación en el navegador (documentada en el skill para no perder
tiempo la próxima vez que pase): después del fix de arriba, `verifyTieOuts()` seguía mostrando los
mismos errores viejos en la consola. Se confirmó con `computeYearGeneric.toString()` en la consola
del navegador que la página seguía corriendo una versión VIEJA del script, cacheada por el navegador
a pesar de navegar a la misma URL en una tab nueva (el servidor sí devolvía el archivo actualizado,
confirmado con `curl` y con `fetch(..., {cache:'no-store'})` desde la consola). Se resolvió abriendo
el servidor local en un PUERTO nuevo (no alcanzaba con una tab nueva) para forzar un origen sin
caché del navegador.

Verificado en el navegador (servidor local, origen fresco): las 16 verificaciones de
`verifyTieOuts()` (Boca + Racing + River) cierran. Racing Presupuesto 2026/2027: "Otros gastos" bajó
de 64% a 18% del Total de Gastos ($84.2 M USD, sin cambios). Racing Ejercicio 2024/2025: "Otros
gastos" bajó de 39% a 0% (el 100% de lo que antes era catch-all tenía un rubro identificable ese
año). Boca Ejercicio 2027: sigue en 0% (ya lo estaba). Boca Ejercicio 2024/2025 (balance real, sin
el desglose de 3 filas todavía): muestra las 3 filas nuevas en $0 y "Otros gastos" en 39%, mismo
monto de siempre, ahora con las 7 filas visibles en vez de 4. River: sin re-categorizar (fuera de
alcance de este pedido), muestra las 3 filas nuevas en $0, consistente con que su dato fuente no
permite separarlas hoy (ver Versión 46). Cero errores de consola en los 3 clubes, "Comparar
Gestiones" sigue funcionando.

Boca 2025 NO recibió el desglose de 3 filas en esta sesión (to-do explícito, ver detalle completo en
el skill): su dato nativo SÍ tiene el detalle, pero varias líneas mezclan sueldos y gastos
operativos en el MISMO renglón sin desglose propio, y un intento de separarlas a mano dio una
diferencia de ~$4.500 M ARS contra el total real, sin forma de confirmar dónde estaba el error, así
que se descartó por el riesgo de ensuciar un balance auditado real (CLAUDE.md, "Precisión antes que
velocidad"). Boca 2025 sigue mostrando el monto completo en "Otros gastos" (39%), como cualquier año
sin el desglose disponible.

Actualizado `.claude/skills/club-data-mapping/SKILL.md` sección 10 (agregado el detalle completo de
esta ronda, el bug de `computeYearGeneric()`, la regla nueva sobre categorías de gasto futuras, y el
to-do de Boca 2025) y corregida una afirmación incorrecta que había quedado en el bloque de la
Versión 52 (decía que re-categorizar no podía romper `verifyTieOuts()`, esta sesión encontró que sí).

## Versión 54 — SACAR "INTERESES NETOS"/"IMPUESTOS" DEL CARD "ESTADO DE RESULTADOS", IGUAL PARA LOS

3 CLUBES Y CUALQUIER AÑO
Guido, mirando el card "Estado de resultados" de Boca: "ponés 'intereses netos, impuestos' y un
copy abajo. quitalo, y quede igual para todos los clubes, todos los años".

Contexto: `renderNativePLTable()` (`js/finanzas-render.js`) pintaba, después de la fila "Total
Gastos" y antes de "Resultado neto"/"Superávit"/"Resultado económico", una fila suelta por cada
elemento de `curReport.extraRows` (armado en `js/finanzas-calc.js`: `simplifiedReportForBoca()` y
`simplifiedReportForGeneric()` arman `[{label:'Intereses netos', ...}, {label:'Impuestos', ...}]`
cuando el valor no es cero; `nativeFinancialsBoca[2025]` trae su propio `extraRows` con un label
distinto, "Resultados financieros y por tenencia (incluye RECPAM)"). Esto hacía que el pie de la
tabla se viera distinto según club/año/toggle: a veces 2 filas, a veces 1 fila con un label largo, a
veces ninguna (Boca 2027 vía `expenseBreakdown` no trae `extraRows` en absoluto).

Cambio real: se sacó la línea que arma `extraHtml` (el HTML de esas filas sueltas) del `innerHTML`
final del `tbody` en `renderNativePLTable()`, así ninguna fila de intereses/impuestos/resultados
financieros se pinta más, para ningún club ni año. `extraTotal` (la suma de esos mismos valores) se
SIGUE sumando al `resultado` final que se muestra en "Resultado neto"/"Superávit"/"Resultado
económico": sacar la fila visual no podía significar perder esa plata del número final, que tiene
que seguir siendo el resultado real del ejercicio. Como `renderNativePLTable()` es una única función
que usan los 3 clubes y los 2 toggles (Formato del club/Formato simplificado, Año a año/Por gestión),
el cambio salió automáticamente igual para todos, sin nada condicional por club que mantener
sincronizado a mano.

Verificado en el navegador (servidor local, origen fresco por el problema de caché ya documentado en
la Versión 53): Boca 2027 y 2025 (los 2 toggles), Racing 2025 (netInterest real distinto de cero, el
caso que más podía revelar un error de cálculo) y River, en Formato del club y Formato simplificado:
ninguna fila de intereses/impuestos/resultados financieros se pinta, la tabla pasa directo de "Total
Gastos" a la fila de resultado final, y el NÚMERO del resultado final no cambió en ningún caso
(comparado contra los valores ya verificados en versiones anteriores). Cero errores de consola en
los 3 clubes.

## Versión 55 — SIN NINGÚN COPY DESPUÉS DE LA TABLA EN "ESTADO DE RESULTADOS"

Guido, sobre el trabajo de la Versión 54: "en racing aun tenes el copy 'Convertido a USD con
$1.196, el tipo de cambio que declara el propio documento de este ejercicio (ver pestaña
Fuentes).'" y, sobre Boca, un párrafo largo de metodología ("Ejercicio 2024/2025 = Memoria y
Balance oficial auditado al 30/06/2025..."). "no quiero ningun copy luego de la tabla. estos copies
son redundantes con el card Assumptions [Supuestos]. el engine deberia dejar en blanco o terminar
el card luego de la row de 'resultado neto'".

Diagnóstico: la Versión 54 solo había sacado las FILAS sueltas de la tabla (Intereses netos/
Impuestos), pero el card "Estado de resultados" seguía terminando, después de la tabla, en 2
párrafos `<p class="source-note">`:
- `#finanzasUnitNote`: "Cifras en millones de USD (estimado)" (o su versión ARS), armado por
  `plUnitLabel()` en `js/finanzas-calc.js`.
- `#finanzasFxNote`: para Racing/River, la nota de tipo de cambio armada por `genericFxNote()`
  ("Convertido a USD con $X, el tipo de cambio que declara..."); para Boca, un texto fijo por año
  hardcodeado directo en `updateFinanzasByGestion()`/`updateFinanzasByAnio()`
  (`js/finanzas-render.js`): un párrafo corto para el Ejercicio 2027 (gestión) y uno largo de
  metodología para el Ejercicio 2025 (año a año).

Cambio real:
1. `index.html`: se sacaron los 2 `<p>` (`#finanzasUnitNote`/`#finanzasFxNote`) del card "Estado de
   resultados", justo después de `</table></div>`.
2. `js/finanzas-render.js`: se sacaron las 4 líneas que llenaban esos 2 `<p>` (una por cada función
   que renderiza este card: `updateFinanzasByGestion`, `updateFinanzasByAnio`, para Boca; y
   `updateFinanzasByGestionGeneric`, `updateFinanzasByAnioGeneric`, para Racing/River), incluido el
   párrafo largo de metodología de Boca 2025 y el párrafo corto de Boca 2027, que vivían hardcodeados
   ahí mismo (no en una función aparte).
3. `js/finanzas-calc.js`: se borraron `plUnitLabel()` y `genericFxNote()`, las 2 funciones que
   armaban el texto de esos `<p>`, verificado que no las llama nadie más en todo el sitio.

Nada de esta información se pierde de verdad: el tipo de cambio y las premisas de cada presupuesto
siguen documentadas en el card "Supuestos" (solo aparece para ejercicios con presupuesto cargado,
que es justamente donde más importa el tipo de cambio proyectado), y la fuente/metodología completa
de cada ejercicio sigue en `fuentes-por-club.md` y la pestaña Fuentes del sitio. Lo que se sacó es
la DUPLICACIÓN de esa misma información como texto suelto abajo de una tabla que ya la usa
(convierte los números) sin explicarla dos veces.

Verificado en el navegador (servidor local, origen fresco): Boca (2027 y 2025, Año a año y Por
gestión), Racing (2025, Año a año y Por gestión) y River, en los 2 toggles de formato: el card
"Estado de resultados" termina siempre en `</table></div></div>`, sin ningún `<p>` de nota después
de la fila de resultado final. Cero errores de consola en los 4 caminos de código tocados
(`updateFinanzasByGestion`/`updateFinanzasByAnio`/`updateFinanzasByGestionGeneric`/
`updateFinanzasByAnioGeneric`), confirmando que sacar las 2 llamadas a `getElementById(...).textContent`
no dejó ninguna referencia colgada a un elemento que ya no existe.

## Versión 56 — DROPDOWN "AÑO" CON SUFIJO ESTANDARIZADO (3 PALABRAS, NO MÁS) + TABS DE PASES/

RESULTADOS/COMPARAR OCULTOS POR AHORA
Guido, dos pedidos en el mismo mensaje:
1. "en el menu dropdown de Anio, poneme siempre entre parentesis si: Presupuesto, Presupuesto y
   Balance, Placeholder. No salgas de esas opciones. documentá las opciones en Onboarding. creo que
   solo para racing tenemos un anio con Presupuesto y Balance."
2. "por ahora, quita los tabs de Mercado de Pases, Resultados y comprara gestiones"

PARTE 1 — Dropdown "Año":

Diagnóstico: el sufijo entre paréntesis del `<select id="anioSelect">` lo escribía a mano, suelto,
quien cargó cada ejercicio, sin ningún criterio compartido: "(presupuestado)" (Boca 2027, Racing/
River vía `meta[y].reportType === 'official_budget'`), "(esperando datos)" (Boca 2026, texto fijo
en el array hardcodeado de `populateFinanzasSelectors`), sin sufijo para el resto. 3 variantes
distintas para ideas parecidas, y ninguna reflejaba `pending_official` vs. `placeholder` como
categorías separadas en el dropdown (aunque sí lo hacen en el banner de calidad de dato).

Cambio real: función nueva `anioDropdownSuffix(reportType)` en `js/finanzas-calc.js`, devuelve
EXACTAMENTE uno de 4 resultados (documentados en detalle en
`.claude/skills/club-or-year-onboarding/SKILL.md` sección 6, tabla completa):
- `official_balance_sheet` / `unofficial_mirror` → sin sufijo (un balance real es el caso "normal").
- `official_budget` → `(Presupuesto)`.
- `official_budget_and_balance` → `(Presupuesto y Balance)` (ver más abajo, no lo usa nadie hoy).
- `pending_official` / `placeholder` → `(Placeholder)` (se ven igual en el dropdown a propósito, la
  diferencia sigue explicada en el banner de calidad de dato, que sí lee `reportType` directo).

`populateFinanzasSelectors()` (`js/finanzas-render.js`) ahora arma el array `years` de Boca con un
`.map()` sobre `[2027,2026,2025,2024,2023,2022,2021,2019,2018]` llamando a
`anioDropdownSuffix(reportTypeForYear('boca', value))`, en vez de 9 strings escritos a mano; River/
Racing usan la misma función sobre `meta[y].reportType`.

Sobre "creo que solo para racing tenemos un año con Presupuesto y Balance": se revisó
`racingFiscalYearMeta` completo (los 7 ejercicios cargados: 2009-2011, 2024-2027) y CADA UNO es
`official_balance_sheet` O `official_budget`, nunca los dos a la vez. Tampoco Boca ni River tienen
un caso así hoy. `official_budget_and_balance` queda como una opción real en `anioDropdownSuffix()`
pero sin ningún ejercicio que la dispare todavía, lista para el día que se cargue un ejercicio con
las dos fuentes reales sin que una reemplace a la otra.

BUG REAL encontrado y corregido en la misma sesión, no relacionado con la lógica de arriba: el
`<select id="anioSelect">` tiene, además del array que arma `populateFinanzasSelectors()`, una lista
de `<option>` ESTÁTICA escrita directo en el HTML de `index.html` (un fallback visual "por si el JS
tarda en correr", ver comentario de la Versión 26). `populateFinanzasSelectors()` solo se llama
desde `refreshAllForClub()`, que a su vez SOLO corre cuando el visitante CAMBIA de club — nunca en
la carga inicial de la página (el INIT llama `refreshFinanzas()`, no `refreshAllForClub()`). Efecto
real: Boca, el club default, se quedaba mostrando el HTML estático (con los sufijos VIEJOS,
"presupuestado"/"esperando datos") hasta el primer cambio de club, mientras que cualquier otro club
mostraba los sufijos nuevos correctamente desde que se lo elegía. Encontrado probando en el
navegador (no se habría visto revisando solo el código de `anioDropdownSuffix`, que estaba bien).
Fix de 2 partes: se agregó `populateFinanzasSelectors(currentClub)` al bloque INIT (antes de
`refreshFinanzas()`), y se actualizó el HTML estático de `#anioSelect` para que diga los mismos 3
sufijos nuevos, así el fallback pre-JS también queda consistente.

Verificado en el navegador (servidor local, origen fresco): carga inicial con Boca sin tocar nada
(antes mostraba sufijos viejos, ahora "(Presupuesto)"/"(Placeholder)" correctos desde el primer
render), cambio a Racing (2026/2027 "(Presupuesto)", 2024/2025/2009-2011 sin sufijo) y a River
(2024 sin sufijo, 2025 y 2021 "(Placeholder)"), y vuelta a Boca. Cero errores de consola en los 3
clubes.

PARTE 2 — Tabs ocultos:

Cambio real: se sacaron 3 `<button data-section="...">` de `#mainNav` en `index.html` (Mercado de
Pases/Resultados/Comparar Gestiones), quedan solo Inicio/Finanzas/Fuentes/Mi Cuenta. Las
`<section>` correspondientes NO se borraron (siguen enteras en el HTML, con todo su contenido y
JS), solo dejaron de ser alcanzables desde la navegación — "por ahora" (palabra de Guido) sugiere
que es reversible: recuperar los 3 tabs es agregar de vuelta esas 3 líneas de `<button>`, nada más.
El listener de navegación (`#mainNav button`, arma `navButtons`/`sections` con querySelectorAll)
no tiene ninguna lógica que dependa de una cantidad fija de botones, así que sacar 3 no rompió nada.
Se actualizó también el párrafo "Cómo usar este sitio" de Inicio, que mencionaba las 3 secciones
por nombre ("Entrá a Mercado de Pases para...", "Entrá a Resultados para...", "Usá Comparar
Gestiones para...") — habría quedado como una referencia rota (invitar a un lugar sin forma de
llegar), se sacaron esas 3 frases, quedó solo la mención a Finanzas y Fuentes.

Verificado en el navegador: el nav tiene 4 botones, "Inicio" muestra el copy corregido sin mención
a los 3 tabs sacados, y no hay ningún error de consola al cargar ni al navegar entre Inicio/
Finanzas/Fuentes/Mi Cuenta para los 3 clubes.

Actualizado `.claude/skills/club-or-year-onboarding/SKILL.md`: nueva sección 6 con la tabla completa
de `reportType` → sufijo del dropdown, y la aclaración de que `official_budget_and_balance` no lo
usa nadie todavía.

## Versión 57 — COLUMNA "BALANCE" PARA EJERCICIOS CON PRESUPUESTO Y BALANCE A LA VEZ, SE SACA LA

COMPARACIÓN AÑO-CONTRA-AÑO
Guido: "ahora continuemos onboardeando los pdf y md que tengo de racing. muchos anios de racing
tienen ambos presupuesto y balance, porque racing tiene de todo en la pagina. una mina de oro. para
cuando apra un mismo anio tenga both presupuesto y blanace, en estado de resultado agregá una
columna que sea Balance".

Antes de tocar código, 2 preguntas reales de arquitectura, presentadas con `AskUserQuestion`:
1. Para un ejercicio dual, ¿cuál de las 2 fuentes manda los KPIs/Formato Simplificado/
   verifyTieOuts? Guido: Balance (el resultado real y final, mismo criterio que ya usa el sitio
   para cualquier balance real).
2. La 2da pregunta reveló un malentendido real: se le preguntó si la columna "Balance" nueva debía
   reemplazar la columna de comparación "Ejercicio Anterior" (Var./Var. %) que sigue en el código,
   oculta por CSS en "Año a año" y visible en "Por gestión". Guido: "no existe la columna de
   comparación. me confundiste con eso. tengo entendido que la habiamos eliminado hace rato" —
   pensaba que ya no existía. Se le mostró que SÍ segu​ía en el código (grep real, no de memoria) y,
   con esa información correcta, se le volvió a preguntar qué hacer: sacarla del todo (elegido) o
   dejarla y agregar Balance aparte.

Trabajo hecho:

1. **Se sacó "Ejercicio Anterior"/Var./Var. % del todo**, de los 3 clubes y los 2 modos (Año a año/
   Por gestión). Esa comparación (año actual contra otro año distinto) ya no existe en ningún lado.

2. **Esa misma infraestructura de 2 columnas se REUTILIZÓ**, no se reconstruyó, para comparar
   DENTRO del mismo ejercicio: Balance (dato primario) vs. Presupuesto (columna de referencia). Esto
   fue una decisión deliberada de eficiencia: `buildNativeSectionHtml()` ya sabía pintar una 2da
   columna con Var./Var. % emparejando filas por `rawLabel`, exactamente lo que hacía falta para
   Presupuesto-vs-Balance, solo que ahora comparando la MISMA fecha de cierre contra la MISMA fecha
   de apertura del mismo ejercicio, no dos ejercicios distintos.

3. **`renderNativePLTable(clubId, curYear, prevYear, curLabel, prevLabel, containerId)`** perdió los
   parámetros `prevYear`/`prevLabel`: ahora es `renderNativePLTable(clubId, year, curLabel,
   containerId)`, y calcula sola si hay overlay (`presupuestoOverlayReportFor(clubId, year)`,
   `js/finanzas-calc.js`) para decidir si pinta la 2da columna (`pl-hide-compare`/
   `syncPLTableColgroup` ahora dependen de si HAY overlay, no de si la vista es "Por gestión"). Los
   4 call sites (`updateFinanzasByGestion`/`updateFinanzasByAnio`/`updateFinanzasByGestionGeneric`/
   `updateFinanzasByAnioGeneric`, `js/finanzas-render.js`) se actualizaron para la firma nueva; el
   `prev`/`g.firstYear` que cada uno seguía calculando NO se tocó donde todavía hace falta para OTRA
   cosa (`renderDebtBlock(cur, prev, ...)`, el card "Deuda" sigue comparando gestión-inicio vs.
   gestión-fin, eso no era parte de este pedido).

4. **Overlay nuevo**: `racingPresupuestoOverlayByYear` (`data/racing-data.js`, vacío hoy) y su
   equivalente `riverPresupuestoOverlayByYear` (`data/river-data.js`, vacío, para el día que
   corresponda). Mismo formato que `revenueLines`/`expenseLines` (`rawLabel`/`normalizedCategory`/
   `amountNative`/`items`), más su propio `currency`/`fx` (el presupuesto de un ejercicio puede
   declarar un tipo de cambio distinto al del balance del mismo ejercicio). `presupuestoOverlayFor`/
   `presupuestoOverlayReportFor`/`presupuestoOverlayMetaFor` (`js/finanzas-calc.js`) leen esto; NO
   participa de `computeYearGeneric()` (KPIs/PAT/Formato Simplificado no lo ven).

5. **`ejercicioLabel(year, isPresupuesto)` cambió de firma** a `ejercicioLabel(year, reportType)`:
   recibe el `reportType` completo en vez de un booleano, para poder devolver el prefijo "Balance"
   cuando `reportType === 'official_budget_and_balance'` (antes solo distinguía "Presupuesto" vs.
   "Ejercicio"). `computeYear()` (Boca) ahora saca su `reportType` de `reportTypeForYear('boca',
   year)` en vez de un `year === 2027 ? ... : ...` hardcodeado, mismo resultado para Boca (que no
   tiene ningún ejercicio dual hoy) pero ya preparado si algún día lo tiene.

6. **Dropdown "Año"**: `anioDropdownSuffix('official_budget_and_balance')` ya devolvía
   "(Presupuesto y Balance)" desde la Versión 56 (se había construido la opción sin tener un caso
   real que la disparara), no hizo falta tocarlo.

Verificado en el navegador (servidor local, origen fresco):
- Regresión: los 3 clubes, los 2 modos, ambos toggles de formato, SIN ningún overlay cargado (el
  estado real de hoy): la 2da columna nunca aparece, `verifyTieOuts()` cierra igual que antes
  (16 verificaciones, sin cambios), 0 errores de consola.
- Mecanismo nuevo, con un overlay SINTÉTICO inyectado por consola del navegador para Racing 2025
  (3 líneas inventadas, nunca guardado en ningún archivo, solo para probar el motor): la 2da
  columna aparece sola (`pl-hide-compare` se saca), el header dice "Balance 2024/2025" /
  "Presupuesto", los montos del overlay convierten con SU PROPIO fx (no el del balance), el
  dropdown "Año" pasa a decir "(Presupuesto y Balance)", los KPIs de arriba (Ingresos/Gastos) siguen
  saliendo del balance real sin que el overlay los toque, y "Formato Simplificado" no rompe con el
  overlay presente (las filas de bucket no encuentran match contra los `rawLabel`s crudos del
  overlay y muestran "—", comportamiento esperado y documentado, no un bug).

Investigación adicional pedida por Guido ("continuemos onboardeando... una mina de oro"): se
re-midió con `pdftotext` (chars/página) el archivo completo de `Clubes/Argentina/Racing/` buscando
un par Presupuesto+Balance del MISMO ejercicio con las 2 fuentes extraíbles a la vez, para probar
el motor nuevo con datos reales en vez de sintéticos. Resultado (detalle completo en el to-do #1 de
este mismo comentario, más arriba): ningún par tiene las 2 fuentes extraíbles hoy, siempre al menos
un lado es escaneo puro. El candidato más barato es el Ejercicio 2019/2020 (balance ya extraíble,
33 págs.; presupuesto es un escaneo de solo 8 páginas, el más chico de OCRear de los 3 pendientes).
Queda como próximo paso sugerido, no se hizo en esta sesión (el foco de esta versión fue construir
el motor, no cargar datos reales todavía).

Actualizado `.claude/skills/club-or-year-onboarding/SKILL.md`: nueva sección 7 con el mecanismo
completo (cómo cargar un ejercicio dual paso a paso, la limitación conocida del emparejamiento por
`rawLabel`, y la corrección a la Versión 56 sobre por qué Guido tenía razón en creer que Racing
publica ambas fuentes, solo que todavía no están onboardeadas).

## Versión 58 — PRIMER EJERCICIO REAL CON PRESUPUESTO Y BALANCE A LA VEZ (RACING, EJERCICIO 2019/2020)

Guido: "me da igual por donde arranques. para los que son dificiles de leer, siempre podes
consultarme si algo no esta legible. nos vamos ayudando" — arrancando el onboarding masivo del
archivo de Racing por el candidato más barato identificado en la Versión 57: el Ejercicio
2019/2020, que tiene balance real (texto nativo) Y presupuesto real (escaneo de solo 8 páginas)
para el MISMO ejercicio.

**Balance (`balance2019-20.pdf`, Ejercicio N°118, 1°/9/2019 al 31/8/2020, gestión Blanco)**: texto
nativo, extracción directa con `pdftotext`. Transcripto completo a `racing-balance-2019-20.md`.
Mismas 9 categorías de Gastos y 11 de Ingresos que ya usa Racing en sus otros ejercicios (misma
categorización exacta, sin decisiones nuevas). Cargado en `racingRevenueLinesByYear[2020]`/
`racingExpenseLinesByYear[2020]`/`racingFiscalYearMeta[2020]`, fx=73,98 (declarado, Anexo V).
Los 3 checks nuevos de `verifyTieOuts()` (Revenue/Expenses/PAT) cierran EXACTO contra el balance
impreso: déficit real $(277.059.572) ARS.

Es el ÚLTIMO ejercicio de Racing con cierre a agosto: la Asamblea del 18/12/2019 aprobó pasar el
cierre a 30 de junio desde el ejercicio siguiente (Nota 5 del balance) — el próximo ejercicio
histórico a cargar (`balance2021.pdf`) va a ser un período de transición irregular de 10 meses.

Se actualizó `gestionesByClub.racing.blanco.firstYear` de 2024 a 2020 (mismo criterio que
`milito.firstYear`: "el ejercicio real más antiguo cargado de esta gestión"), lo que además hace
que el card "Deuda" en "Por gestión" ahora compare de verdad 2019/2020 vs. 2023/2024 (antes
firstYear=lastYear=2024, no había nada que comparar).

**Presupuesto (`presupuesto2019-20.pdf`, mismo ejercicio)**: ESCANEO puro (8 páginas, ~1
char/página, confirmado con `pdftotext`), transcripto con el Read tool sobre imágenes de página.

BUG REAL de proceso encontrado y corregido en esta sesión: el escaneo tiene una inclinación
diagonal real (no detectada a simple vista en la imagen completa). Sin corregirla, leer una
columna angosta lejos del margen izquierdo (la de "TOTAL PERÍODO", la más a la derecha) hace que
el valor de una fila se lea desplazado hacia la fila de arriba o abajo, un efecto que se acumula
cuanto más lejos del borde izquierdo está la columna. Encontrado así: la fila "9.- Cobros de otros
recursos de gestión por fútbol" parecía mostrar el mismo valor que "B. Ingresos Sociales" (la fila
de abajo, una categoría totalmente distinta) — Guido lo confirmó mirando el PDF él mismo
(fila 9 real: 18.000.000, no 634.152.050). Se corrigió con un script chico (Python + PIL): probar
un rango de ángulos de rotación y quedarse con el que maximiza la nitidez de las líneas
horizontales de la grilla (varianza del promedio de brillo por fila), midió ~0,78°. Con la imagen
corregida, todos los recortes de fila alinearon correctamente.

CASO DE CRITERIO REAL, consultado con Guido dos veces (primero de forma imprecisa, corregido
cuando pidió ser más específico con página/fila/columna exactas): la fila "2.- Cobranzas por
participación" imprime 606.734.000, pero sus propios sub-ítems (d+e+f: Competiciones oficiales
S.A.F./internacionales/A.F.A., que suman 274.780.000) no cierran contra ese número, y la misma
diferencia exacta (331.954.000) aparecía en el subtotal general de Ingresos. Guido explicó, mirando
el PDF, que 606.734.000 es un ACUMULADO que además incluye "3.- Cobranzas por venta de abonos
estadio" (123.154.000) y "4.- Cobros por retransmisión y derechos de TV" (208.800.000):
274.780.000 + 123.154.000 + 208.800.000 = 606.734.000 exacto. Como el sitio carga 3 y 4 como
líneas propias separadas, se cargó "Cobranzas por participación" con el valor NO acumulado
(274.780.000), documentado en detalle en `racing-presupuesto-2019-20.md` y en el comentario de
`data/racing-data.js` junto a `racingPresupuestoOverlayByYear`.

Con esa corrección, TODO cierra exacto: Ingresos A+B+C+D = 3.031.619.050 = SUBTOTAL INGRESOS
ORDINARIOS impreso; + extraordinarios (96.000.000) = 3.127.619.050 = TOTAL impreso. Egresos
A+B+C = 2.892.242.048 = SUBTOTAL EGRESOS ORDINARIOS impreso; + extraordinarios (85.260.000) =
2.977.502.048 = TOTAL impreso. Cargado en `racingPresupuestoOverlayByYear[2020]`, fx=70 (la
premisa macro que el propio presupuesto declara, "$70.- por u$d1.- en promedio"), distinto al
fx=73,98 del balance del mismo ejercicio (esperado: son 2 documentos distintos, cada uno con su
propio tipo de cambio, ver `club-data-mapping/SKILL.md` sección 5).

`racingFiscalYearMeta[2020].reportType` pasó de `'official_balance_sheet'` a
`'official_budget_and_balance'`, el primer ejercicio del sitio en usar este valor (construido en
la Versión 57 sin ningún caso real todavía que lo disparara).

BUG REAL encontrado y corregido, del mecanismo de la Versión 57 (no de los datos de este
ejercicio): `renderDataQualityBannerForCurrentSelection()` (`js/finanzas-render.js`) solo ocultaba
el banner de advertencia para `reportType === 'official_budget'` u `'official_balance_sheet'`;
`'official_budget_and_balance'` no estaba en esa lista, así que caía al `else` final del ternario
("Dato placeholder, número inventado para probar el diseño del sitio, no es real") — un mensaje
FALSO para un ejercicio 100% real (con MÁS fuente que la mayoría, no menos). Se agregó
`'official_budget_and_balance'` a esa condición.

Verificado en el navegador (servidor local, origen fresco): las 3 verificaciones nuevas de
`verifyTieOuts()` para 2020 cierran exacto; dropdown "Año" dice "Ejercicio 2019/2020 (Presupuesto
y Balance)"; el header de "Estado de resultados" dice "Balance 2019/2020" / "Presupuesto" (no
"Ejercicio 2019/2020" genérico); columna "Presupuesto" aparece con los montos convertidos a su
propio fx; Total Ingresos 32.9 M USD (balance) vs. 43.3 M USD (presupuesto), Total Gastos (39.8)
vs. (42.5) M USD; los KPIs de arriba y Formato Simplificado siguen saliendo del balance real, sin
ningún cambio; sin banner de placeholder; "Por gestión" (Blanco) ahora compara Deuda 2019/2020 vs.
2023/2024; 0 errores de consola en Formato del club y Formato Simplificado.

Actualizado `fuentes-por-club.md` (2 fuentes nuevas de Racing) y
`.claude/skills/club-or-year-onboarding/SKILL.md` sección 6 (comentario del to-do de Racing) — la
sección 7 (mecanismo del overlay) ya se había escrito en la Versión 57, no hizo falta reescribirla,
solo queda como referencia el ejemplo real de esta versión.

## Versión 59 — FORMATO SIMPLIFICADO DEL OVERLAY COMPARA CATEGORÍA POR CATEGORÍA, SE SACAN VAR./VAR.%

Guido, mirando el Ejercicio 2019/2020 de Racing recién cargado en Formato Simplificado (con
captura de pantalla): "no quedó bien racing. porque presupuesto tiene un 0 en todo salvo el
total? var y var% dberian no estar ahi".

**Problema 1 — columna "Presupuesto" vacía fila por fila en Formato Simplificado**: diagnóstico:
`presupuestoOverlayReportFor()` (agregada en la Versión 57) siempre devolvía las líneas del overlay
con su `rawLabel` NATIVO (ej. "Ingresos sociales", "Pago por adquisición de jugadores"), sin
importar si `simplifyFormat` estaba activo. La columna primaria, en cambio, SÍ pasa por
`simplifiedReportForGeneric()`/`bucketize()` cuando `simplifyFormat` está activo, así que sus filas
quedan con los labels de bucket ("Cuotas Sociales", "Compra de jugadores"). `findPrevVal()`
(`buildNativeSectionHtml`) empareja por `label` EXACTO, así que ninguna fila nativa del overlay
coincidía con ningún bucket de la columna primaria — solo el TOTAL de cada sección se mostraba
bien (se calcula sumando el `prevList` completo, no depende del matching fila por fila).

Fix: se extrajo `bucketize()` de adentro de `simplifiedReportForGeneric()` a una función
compartida, top-level, en `js/finanzas-calc.js` (antes se redeclaraba en cada llamada, sin usarse
en ningún otro lado). `presupuestoOverlayReportFor()` ahora chequea el flag global `simplifyFormat`
y, si está activo, bucketiza el overlay con esa misma función y los mismos
`GENERIC_SIMPLIFIED_REVENUE_BUCKETS`/`_EXPENSE_BUCKETS` que ya agrupan la columna primaria — mismos
labels de los dos lados, así que ahora SÍ emparejan fila por fila. En "Formato del club" (donde
cada columna sigue mostrando las categorías tal cual las reportó SU propio documento, la gracia de
ese toggle) el comportamiento no cambió: el overlay sigue devolviendo `rawLabel`s nativos, y sigue
pudiendo mostrar "—" si el balance y el presupuesto nombran lo mismo distinto (documentado como
limitación conocida, no un bug, en `club-or-year-onboarding/SKILL.md` sección 7).

**Problema 2 — Var./Var. % sobraban**: se sacaron de la tabla del TODO, no solo se ocultan. Cambios:
- `index.html`: el `<thead>`/`<colgroup>` de `#finanzasPLTable` pasaron de 6 columnas a 4 (Rubro,
  Actual, % del total, Presupuesto/Anterior). Se sacaron los `<th>Var.</th><th>Var. %</th>`.
- `js/finanzas-render.js`: `buildNativeSectionHtml()` ya no calcula `growth`/`fmtPctDisplay` ni
  pinta esas 2 celdas por fila (ni en la fila normal, ni en la fila con acordeón, ni en el total de
  sección); `renderBreakdownRows()` (los sub-ítems del acordeón) pasó de 3 `<td>` vacíos de más a
  1 solo; `syncPLTableColgroup()` pasó de generar 6 `<col>` a 4; el `colspan` de la fila de
  encabezado de sección y de los spacers pasó de 6 a 4; el `resultRow` final pasó de 4 celdas "—" a
  2.

Verificado en el navegador (servidor local, origen fresco): Racing Ejercicio 2019/2020, Formato
Simplificado — el header dice "RUBRO | BALANCE 2019/2020 | % DEL TOTAL | PRESUPUESTO" (4 columnas,
sin Var./Var. %), y CADA fila de Ingresos y Gastos muestra un valor real de Presupuesto (ej.
"Cuotas Sociales: 6.6 vs. 9.1", "Compra de jugadores: (2.3) vs. (11.7)"), no solo el total. Los
totales no cambiaron (32.9/43.3 Ingresos, 39.8/42.5 Gastos, igual que antes del fix). El acordeón
de una fila (▾Cuotas Sociales) se probó y expande bien, sin celdas rotas. Boca (sin overlay,
salta a Ejercicio 2020/2021 porque 2020 no existe para ese club) y River, ambos formatos: la tabla
queda en 3 columnas visibles (Rubro/Actual/%), sin Presupuesto ni Var./Var. %, igual que antes de
esta versión. Cero errores de consola en los 3 clubes.

Actualizado `.claude/skills/club-or-year-onboarding/SKILL.md` sección 7: marcada como RESUELTA la
limitación de Formato Simplificado, aclarado que la de Formato del club sigue vigente a propósito,
y documentado que Var./Var. % ya no existen en la tabla.


## Versión 60 — "ESTADO DE RESULTADOS" RECONCILIA A SIMPLE VISTA + SIN SCROLL + % Y RESULTADO NETO PROPIOS DE PRESUPUESTO

Guido, revisando Racing Ejercicio 2019/2020 (el overlay cargado en la Versión 58, corregido en la
59), encontró 3 problemas reales en el mismo card "Estado de resultados", los 3 sobre
`renderNativePLTable()`/`buildNativeSectionHtml()`/`syncPLTableColgroup()` en `js/finanzas-render.js`.

**Problema 1 — Ingresos/Gastos/Resultado Neto no reconciliaban a simple vista**: Guido, textual:
"ingresos da 32.9 y gastos 39.8. Resultado neto da 3.7m negativo solamente. no da la cuenta. qué
pasa? por qué esto no saltó en ningún chequeo tuyo? es elemental." El número final SIEMPRE fue
correcto: -277,059572 ARS M / 73,98 (fx del balance) = -3,746 ≈ -3,7, ya validado por
`verifyTieOuts()` antes de esta sesión. Lo que estaba mal era la PRESENTACIÓN: `extraRows`
(Intereses netos ≈ +3,08 M USD para este ejercicio) se sumaba a `resultado` pero nunca se pintaba
como fila — decisión de la Versión 54 ("no quiero ningún copy luego de la tabla"), que resultó
demasiado agresiva: sacó también la ÚNICA fila que explicaba por qué Ingresos - Gastos no cerraba
solo. Fix: `renderNativePLTable()` vuelve a pintar las filas de `extraRows`, pero SOLO cuando su
valor (ya convertido a la moneda mostrada) no es cero — así un club/año sin esta fila (la mayoría)
no gana una fila "Intereses netos: 0" sin sentido, y ningún año pierde la explicación de su propio
resultado.

**Problema 2 — scroll horizontal para ver Presupuesto**: Guido: "para leer 'presupuesto' de forma
entera, tengo que scrollear a la derecha. desliza las columnas apenas a la izquierda para que no
haya que scrollear. esto tambien deberia ser regla." Se combinó con el Problema 3 (agregar una
columna nueva), así que había que angostar TODAS las columnas numéricas para que la tabla, ahora de
5 columnas en vez de 4, siga entrando en el ancho del card. Primer intento (78px valor / 40px %) no
alcanzó: verificado en el navegador con `scrollWidth`/`clientWidth`, el header en mayúsculas
"PRESUPUESTO" (11 letras, `text-transform:uppercase` del CSS general de `<th>`) y "100%" desbordaban
esas celdas angostas — la tabla en sí no excedía el contenedor (`table-layout:fixed` + `<colgroup>`
funcionan bien para eso), pero el CONTENIDO de una celda angosta sí puede desbordarla, forzando
scroll igual. Fix final: anchos 84px (valor) / 54px (%) — alcanza para "100%" y para que
"PRESUPUESTO" quepa en 2 líneas — más `overflow-wrap:break-word` en `#finanzasPLTable th` como red de
seguridad genérica (si un header futuro es más largo todavía, se parte en 2 líneas en vez de
desbordar). Verificado en desktop (1280px) y `resize_window` a `tablet` (768px): `scrollWidth` ==
`clientWidth` en los dos casos, para Racing con overlay (el caso más ancho, 5 columnas).

**Problema 3 — Presupuesto sin su propio % ni Resultado Neto**: Guido: "para presupuesto, dame
tambien % del total. O sea, dos columnas que sean % del total. y que resultado neto tenga un numero,
no me lo dejes incompleto." Cambios:
- `buildNativeSectionHtml()`: calcula `totalPrev` ANTES de generar las filas (mismo criterio que ya
  se usaba para `total`), agrega una 2da celda de % por fila (`fmtPctOfTotal(prevVal, totalPrev)`) y
  la devuelve en el objeto de retorno (`{ html, total, totalPrev }`, antes solo `{ html, total }`).
- `renderNativePLTable()`: calcula `resultadoOverlay = ing.totalPrev + gas.totalPrev` (SIN sumarle
  ningún `extraTotal` — el overlay no tiene su propio concepto de `extraRows` separado, ver abajo) y
  lo muestra en la celda de Resultado Neto de la columna Presupuesto, en vez del "—" fijo de antes.
- `index.html`: `<colgroup>`/`<thead>` de `#finanzasPLTable` pasaron de 4 a 5 columnas (Rubro,
  Actual, % del total, Presupuesto, % del total); todos los `colspan` (headers de sección, spacers)
  pasaron de 4 a 5.
- `js/finanzas-render.js`: `renderBreakdownRows()` (sub-ítems del acordeón) pasó de 1 `<td></td>`
  vacío de más a 2, para alinear con las 5 columnas.

Al implementar el cálculo de `resultadoOverlay`, salió a la luz una ASIMETRÍA real en los datos
cargados en la Versión 58: `racingPresupuestoOverlayByYear[2020].revenueLines` excluía a propósito
su línea "extraordinaria" (`Cobros por venta de inversiones financieras`, 96 M — documentado en su
momento como "mismo criterio que netInterest, no se carga"), mientras que `expenseLines` SÍ incluía
su análoga (`Egresos extraordinarios`, -85,26 M) como línea normal. Con ese criterio mixto,
`ing.totalPrev + gas.totalPrev` daba un número que NO reconciliaba contra el superávit presupuestado
real del documento. Fix en `data/racing-data.js`: se agregó la línea de ingreso faltante como línea
normal (`other_income`), para que las 2 columnas usen el mismo criterio — ahora
`resultadoOverlay` = (3.127,619050 - 2.977,502048) / 70 = 2,14 ≈ 2,1 M USD, coincide con el superávit
presupuestado real del documento. Este bug NO afectaba a `verifyTieOuts()` (esos chequeos comparan
el BALANCE, el dato primario, contra sus propios totales oficiales — el overlay nunca se valida ahí,
ver gap conocido documentado en la sección de arquitectura) ni a ningún otro club/año.

Verificado en el navegador (servidor local, origen fresco, pestaña nueva por el artefacto de consola
ya documentado en la Versión 41): Racing Ejercicio 2019/2020, Formato del club Y Formato
Simplificado — header "RUBRO | BALANCE 2019/2020 | % DEL TOTAL | PRESUPUESTO | % DEL TOTAL" (5
columnas), fila "Intereses netos: 3.1" visible antes de "Resultado neto", Resultado Neto Presupuesto
= 2.1 (no "—"), sin scroll horizontal en desktop ni tablet, 0 errores de consola reales. Boca y River
(sin overlay): la tabla vuelve a 3 columnas visibles vía `pl-hide-compare` (que sigue funcionando
igual, `nth-child(n+4)` oculta "la 4ta en adelante" sin importar cuántas sean), sin regresión.
`verifyTieOuts()` sigue cerrando exacto para los 3 clubes, Racing 2020 incluido (el fix del overlay
no toca los datos del balance, que son los que se validan ahí).

Se incorporaron al skill `.claude/skills/club-or-year-onboarding/SKILL.md` 4 secciones nuevas (8-11)
con lecciones generales de esta sesión, para que no queden atadas a esta versión puntual: cómo leer
un PDF nuevo (texto nativo vs. OCR, deskew de un escaneo torcido con el paso a paso completo), la
trampa de la "fila acumulada" en documentos financieros escaneados, la regla de pedir siempre
página/fila/columna exactos al consultarle a Guido sobre algo ilegible, y las 3 reglas nuevas de esta
versión sobre la tabla "Estado de resultados" (reconciliación visible, sin scroll horizontal,
ningún total en "—" si se puede calcular).


## Versión 61 — HEADERS LEGIBLES EN 2-3 LÍNEAS A PROPÓSITO, "INTERESES NETOS"/"INT." SIEMPRE VISIBLES, DROPDOWN "AÑO" SIN "EJERCICIO " Y CON "(BALANCE)"

Guido, con captura de pantalla del card "Estado de resultados" de Racing: "las columnas se leen
horrible. son un chorizo vertical ilegible." Pidió 4 cosas en el mismo mensaje.

**1. Headers de tabla partidos en el punto correcto, no letra por letra.** El fix de la Versión 60
(`overflow-wrap:break-word` en `#finanzasPLTable th`) evitaba que un header desbordara su celda,
pero no controlaba DÓNDE se partía la palabra: en columnas de 84/54px, "PRESUPUESTO" partía como
"PRESUPU"/"ESTO" (el diptongo "ue" quedaba separado, una mitad en cada línea) y "BALANCE 2019/2020"
terminaba en 4 líneas ilegibles. Fix: `wrapHeaderLabel(text)` nueva (`js/finanzas-calc.js`), un
helper chico que fuerza el `<br>` en el punto elegido a mano en vez de dejarlo al motor de wrap del
browser:
- "Balance 2019/2020"/"Ejercicio 2020/2021" (prefijo corto + año): se parte en el primer espacio,
  2 líneas ("Balance" / "2019/2020").
- "Presupuesto" (sola, la columna del overlay sin año al lado, O como prefijo de "Presupuesto
  2026/2027"): "Presu"/"puesto", manteniendo el diptongo "ue" junto en la 2da línea — es la palabra
  más larga de las 3 posibles, no entra en una sola línea en el mismo ancho que "Balance"/
  "Ejercicio" sí entran. Con año al lado queda en 3 líneas ("Presu"/"puesto"/"2026/2027"), la regla
  es partir cada palabra que no entre, no forzar un número fijo de líneas.
`renderNativePLTable()` pasó de `.textContent` a `.innerHTML` para poder inyectar el `<br>`. El
header estático "% del total" (las 2 columnas de porcentaje) se cambió directo en el HTML a "% del
<br>total". Las 4 columnas numéricas de `#finanzasPLTable` pasaron a compartir el MISMO ancho, 100px
(antes alternaban 84px/54px según fuera valor o %) — "todas las columnas [con] el mismo width" fue
pedido explícito de Guido. 100px sale de medir en el navegador (un `<span>` de prueba con
`getComputedStyle` del `<th>` real) el texto más ancho que puede aparecer en una sola línea con el
wrap de arriba: un rango de años tipo "2026/2027" mide ~69px + 24px de padding del `<th>` ≈ 93px,
"Presu"/"puesto"/"Balance"/"Ejercicio" miden menos. Verificado en el navegador (Racing 2019/2020,
el caso más ancho con overlay: 5 columnas) con `scrollWidth`/`clientWidth` en desktop (1078px) Y
`resize_window` a `tablet` (768px): sin overflow en ningún `<th>`, sin scroll horizontal forzado en
ninguno de los 2 anchos.

**2. "Intereses netos" ya no es condicional a ser distinto de cero.** Guido: "me molesta que para
Racing haya Intereses netos en el card y no para el resto. Había dicho yo en primera instancia de
quitarlo para todos, pero visto y considerando que para Racing fue necesario para hacer que la
cuenta cerrara, toca ponerlo para todos, aunque sea 0. Es decir, sumarlo al motor." Antes,
`nativeReportFor()`/`simplifiedReportForGeneric()` (motor genérico de River/Racing) solo agregaban
la fila "Intereses netos" a `extraRows` si `cur.netInterest` era distinto de cero
(`...(cur.netInterest ? [...] : [])`); el caso especial de Boca 2027 (`extraRows: []` fijo) no la
agregaba nunca. Con eso, Racing (que tiene `netInterest` real no-cero en varios ejercicios) mostraba
la fila seguido, mientras que Boca/River la mostraban rara vez, dando la falsa impresión de ser una
particularidad de Racing. Fix: las 2 funciones del motor genérico ahora agregan
`{label:'Intereses netos', value:cur.netInterest||0}` SIEMPRE (sin condicional), y el caso especial
de Boca 2027 ahora agrega esa misma fila con `r.netInterest||0` en vez de `extraRows: []`. En
`renderNativePLTable()` (`js/finanzas-render.js`), la regla de la Versión 60 ("ocultar extraRows en
$0 para no generar ruido") ahora tiene una única excepción explícita: `e.label !== 'Intereses
netos'` en el filtro, así "Intereses netos: 0.0" SÍ se pinta cuando corresponde, pero "Impuestos"/
"Venta de activos"/"Ganancia por venta de jugadores" en $0 se siguen ocultando igual que antes (son
casos genuinamente raros, mostrarlos siempre volvería a ser el mismo ruido que la Versión 60 ya
había evitado). Los años con un desglose real y propio de "resultado financiero" (Boca 2025:
"Resultados financieros y por tenencia (incluye RECPAM)"; River 2024: 2 líneas separadas del
documento) no se tocaron: ya mostraban una fila no-cero equivalente, tal cual la nombra cada fuente,
mismo criterio de siempre ("Formato del club" = tal cual la reportó el club).

**3. Nuevo stat "Int." en los cards de arriba de Finanzas.** Guido: "agregar Int en los cards del
inicio [de Finanzas] en los cuales se hace un breve resumen. Pasa que cualquiera que vea Racing y
vea Ingresos y egresos de 2019/2020 y vea que no cuadra con el resultado neto, va a pensar que es
poco seria la página" — el ejemplo real es exactamente el bug que ya documentaba la Versión 60
sección 11.1 (Racing 2019/2020: 32,9 - 39,8 ≠ -3,7 a simple vista), pero esos 2 números arriba de
"Estado de resultados" (`#finanzasStats`, los cards "Ingresos"/"Gastos"/"Resultado neto"/"Deuda
neta") seguían sin mostrar la fila que explica la diferencia, aunque la tabla de abajo ya la
mostrara desde la Versión 60. Fix: `renderNativePLTable()` ahora devuelve también `extraTotal` (la
suma de TODAS las extraRows del ejercicio, el mismo número que ya se sumaba para llegar a
"Resultado neto"), y `renderFinanzasStatsFromComputed()`/`renderFinanzasStatsGeneric()`
(`js/finanzas-render.js`) reciben ese `extraTotal` como 4to parámetro y pintan un stat nuevo "Int."
entre "Gastos" y "Resultado neto" cuando viene definido. Con esto, Ingresos + Gastos + Int. =
Resultado neto siempre reconcilia a simple vista en los 5 cards de arriba, para los 3 clubes.
Verificado en el navegador: Racing 2019/2020 muestra "Int.: +3,1 M USD" (32,9 - 39,8 + 3,1 = -3,7,
¡cierra!), Boca/Racing 2026-2027 (presupuestos sin interés real) muestran "Int.: 0,0 M USD" en vez
de no mostrar el stat, River 2024 (extraRows con nombres propios del documento) muestra "Int.: +1,6
M USD" (la suma neta de sus 2 líneas), sin romper ningún `verifyTieOuts()`.

**4. Dropdown "Año" sin "Ejercicio " y con "(Balance)" explícito.** Dos pedidos cortos de Guido: "el
dropdown de Año tiene opciones que es Placeholder, Presupuesto y Presupuesto y Balance. Agregar
Balance como opción, la cual aplica para todos los años que tenés sin nada en paréntesis" + "que no
aparezca 'ejercicio 2020/2021' sino '2020/2021'. Ejercicio sino queda muy redundante y agota la
vista." Dos cambios chicos, ambos en `anioDropdownSuffix()`/`populateFinanzasSelectors()`
(`js/finanzas-calc.js`/`js/finanzas-render.js`) más el `<option>` estático de fallback en
`index.html`:
- `anioDropdownSuffix()`: el `return ''` por default (para `official_balance_sheet`/
  `unofficial_mirror`, la 4ta opción que antes era "sin paréntesis" implícita) ahora devuelve
  `' (Balance)'` explícito. Sigue siendo EXACTAMENTE 4 palabras posibles, nunca una 5ta (la regla de
  la Versión 56 sigue vigente, solo cambia qué palabra usa la 4ta rama).
- `populateFinanzasSelectors()` (las 2 ramas, Boca y River/Racing): el label de cada `<option>` pasó
  de `'Ejercicio '+(year-1)+'/'+year+sufijo` a `(year-1)+'/'+year+sufijo`, sin el prefijo. El
  prefijo "Ejercicio"/"Balance"/"Presupuesto" sigue vivo en OTRO lugar (el header de la tabla
  "Estado de resultados", `ejercicioLabel()`, sin cambios) — esto solo afecta el texto del propio
  `<select>`.
Verificado en el navegador: `#anioSelect` de Boca/Racing/River muestra "2026/2027 (Presupuesto)",
"2024/2025 (Balance)", "2019/2020 (Presupuesto y Balance)", "2025/2026 (Placeholder)", nunca
"Ejercicio ...".

Verificado en el navegador de punta a punta (servidor local, los 3 clubes, Formato del club Y
Formato simplificado, `resize_window` a `tablet`): 0 errores de consola, 0 scroll horizontal
forzado, los 16 checks de `verifyTieOuts()` siguen cerrando exacto (ninguno de estos 4 cambios toca
un número, solo cómo se presenta). No se tocó el skill `club-or-year-onboarding/SKILL.md` sección 6
(dropdown, sigue con las mismas 4 palabras, solo cambió cuál corresponde al caso default) más allá
de anotar la 4ta palabra nueva.


## Versión 62 — NUEVO EJERCICIO REAL DE RACING, 2020/2021 (EJERCICIO N° 119, IRREGULAR DE 10 MESES)

Guido: "lets work on another year for racing. pick one and run with it". Se eligió
`balance2021.pdf` del to-do de Racing (sección 1 del bloque de arriba): es el candidato más barato
de los que quedaban sin cargar — texto nativo (no escaneo, no hace falta Read tool con imágenes ni
deskew), y no tiene un `presupuesto2020-21.pdf` en el archivo (no existe ese documento, así que no
hay overlay de Presupuesto que armar, a diferencia del Ejercicio 2019/2020 de la Versión 58).

**Transcripción** (CLAUDE.md, "Cada PDF nuevo: transcribirlo a Markdown ANTES de usarlo"):
`pdftotext -layout balance2021.pdf` a `Clubes/Argentina/Racing/racing-balance-2021.md` (35 páginas,
texto limpio, mismo criterio que `racing-balance-2019-20.md`: transcripción completa dentro de un
bloque de código, sin resumir nada).

**Qué dice el documento**: Ejercicio N° 119, irregular de 10 meses (1°/9/2020 al 30/6/2021) — el
ejercicio de transición para pasar el cierre de agosto (vigente hasta el Ejercicio 118, cargado en
la Versión 58) a junio, aprobado por Asamblea el 18/12/2019 (Nota 5 del balance anterior). Mismo
formato EXACTO de tabla que el Ejercicio 2019/2020 ya cargado: los mismos 11 rubros de "Recursos
ordinarios" (Anexo II) y los mismos 9 de "Detalle de gastos" (Anexo III), palabra por palabra — la
categorización (`normalizedCategory`) ya estaba resuelta, rubro por rubro (ver
`club-or-year-onboarding/SKILL.md` sección 5, "onboardear un ejercicio del mismo tipo de documento").
Única diferencia real: "Otros Torneos" da $0 este ejercicio (el documento la imprime con "-"), se
cargó igual con `amountNative:0` en vez de omitir la fila, por fidelidad al documento (el rubro
existe, solo que no tuvo movimiento).

**Tipo de cambio**: $95,52 por USD al 30/06/2021, declarado en el Anexo V ("Activos y pasivos en
moneda extranjera") del propio balance y usado sin excepciones en TODO el anexo (Caja, bancos,
divisas en custodia, créditos por venta de jugadores en USD) — a diferencia del Anexo V del
Ejercicio 2019/2020, que tenía una inconsistencia puntual de 3 líneas en $74,18 contra el $73,98
dominante, acá no hizo falta elegir entre 2 valores.

**Verificación de cierre** (`club-data-mapping/SKILL.md` sección 6, sumar la propia extracción contra
los subtotales IMPRESOS): Revenue $3.335.562.848 (TOTAL DE RECURSOS ORDINARIOS impreso), Expenses
$3.404.446.864 ($2.348.405.480 de gastos ordinarios + $152.718.471 de depreciaciones + $903.322.913
de previsiones/amortizaciones intangibles, ambas también impresas), Resultado neto = 3335,562848 -
3404,446864 + 75,896098 (netInterest, "Resultados Financieros y por tenencia incl. RECPAM") =
7,012082, exacto contra el SUPERÁVIT DEL EJERCICIO impreso ($7.012.082) — cierra a los 6 decimales,
sin ajuste ni redondeo.

**Cambios de archivo**:
- `data/racing-data.js`: nueva entrada `2021` en `racingRevenueLinesByYear`, `racingExpenseLinesByYear`
  y `racingFiscalYearMeta` (`reportType:'official_balance_sheet'`, `gestionId:'blanco'`), más 2
  bullets nuevos en el comentario de cabecera (lista de ejercicios reales + tabla de tipos de cambio
  declarados). No hizo falta tocar `gestionesByClub.racing.blanco` (`firstYear:2020, lastYear:2024`
  ya cubre 2021, no es ni el más viejo ni el más nuevo de esa gestión).
- `index.html`: nuevo bloque en `verifyTieOuts()` (Revenue/Expenses/Resultado neto vs. Superávit),
  mismo patrón que los bloques ya existentes de 2020/2024/2025 — único cambio real de patrón: el
  label dice "vs. Superávit del ejercicio" (no "Déficit"), porque este es el primer ejercicio de
  Racing cargado con resultado positivo.
- `Clubes/Argentina/Racing/racing-balance-2021.md`: transcripción nueva (no existía).

Verificado en el navegador (servidor local, Racing 2020/2021, Formato del club Y Formato
simplificado, "Año a año" Y "Por gestión" con Blanco): los 3 stats de arriba reconcilian (34,9 - 35,6
+ 0,8 = 0,1 M USD), la fila "Intereses netos: 0,8" aparece en la tabla (regla de la Versión 61: se
muestra siempre, este caso además es no-cero), el dropdown "Año" muestra "2020/2021 (Balance)" sin
prefijo "Ejercicio " (reglas de la Versión 61), el header de la tabla parte en "Ejercicio"/
"2020/2021" (2 líneas, `wrapHeaderLabel()`), y los 19 checks de `verifyTieOuts()` (16 previos + 3
nuevos) cierran exacto, 0 errores de consola. El to-do de Racing (bloque de arriba, sección 1) se
actualizó: queda `balance2021.pdf` sacado de la lista de pendientes, el siguiente candidato más
barato es re-onboardear a ARS nativo los 3 años pre-Blanco (2009-2011, hoy siguen en USD
pre-convertido, ver to-do) o encarar los documentos que son escaneos puros (2012-2018,
presupuestos 2013-14/2015-16/2018-19).


## Versión 63 — NUEVO EJERCICIO REAL DE RACING, 2017/2018 (PRESUPUESTO-ONLY, ÚLTIMO DOCUMENTO CON TEXTO EXTRAÍBLE DEL ARCHIVO)

Guido: "now onboard another year of racing. tell me your process, ask me if questions". Antes de
tocar nada se midió el archivo completo de Racing con `pdftotext` (chars/página): de los ~10 años
que quedaban sin cargar (2012-2019, 2022-2023), 2022/2023 no tienen NINGÚN documento en el archivo
(nada que cargar), y de los 8 restantes (7 balances + 3 presupuestos) `presupuesto2017-18.pdf` es
el ÚNICO con texto extraíble (2.644 char/pág.) — el resto son escaneos puros (~1 char/pág.).

Se presentaron 2 opciones (`AskUserQuestion` implícito en la conversación, no la herramienta):
cargar el presupuesto solo (barato, sin balance para verificar) o hacer OCR de `balance2018.pdf`
(caro, pero real y verificable, y potencialmente arma un par Presupuesto+Balance como el de
2019/2020). Guido eligió el presupuesto solo, aclarando el criterio general para el futuro: "whats
the problem of not having Balance yet? when you have only Presupuesto, you build presupuesto only.
then once you get balance, you have both" — no hace falta esperar a tener las 2 fuentes a la vez
para cargar una, el mecanismo de overlay (sección 11) ya soporta sumar la 2da más adelante sin
tocar código.

**Transcripción** (CLAUDE.md): `pdftotext -layout presupuesto2017-18.pdf` a
`Clubes/Argentina/Racing/racing-presupuesto-2017-18.md` (11 páginas). El header del documento
declara el período de 2 formas distintas ("01/09/2017 al 31/08/2018" y, más abajo, "01/07/2017 al
30/06/2018") y las columnas mensuales de las tablas se leen en un orden raro (sep-17...jun-18,
jul-17, ago-17 — estos últimos 2 son cronológicamente ANTERIORES a sep-17, no pueden ser correctos
tal cual). Verificado con aritmética (`$6.500.000 × 12 = $78.000.000`, el total impreso de
"Derechos de Retransmisión") que son 12 columnas reales, así que "jul-17"/"ago-17" son casi
seguro "jul-18"/"ago-18" mal etiquetados en el documento original — no investigado más a fondo
porque el sitio solo muestra el TOTAL anual por rubro, nunca el desglose mensual, así que la
ambigüedad no afecta ningún dato cargado (documentado en el `.md` por si hace falta releer el
documento a nivel mensual en el futuro).

**Categorización — cambio de plan a mitad de camino, importante para la próxima vez.** El plan
inicial era excluir la sección "Egresos Extraordinarios" del documento (CAPEX + cancelación de
deuda + colocaciones financieras) por no ser gasto operativo en sentido contable estricto. Antes de
escribir el código se revisó cómo Racing YA categoriza sus otros 2 presupuestos de caja
(2025-26/2026-27, `racingExpenseLinesByYear[2026]`/`[2027]`) y el precedente es exactamente lo
contrario: "Pago por adquisición de jugadores" → `player_amortisation` (no excluido) y "Egresos
extraordinarios (compra de bienes de uso y mejoras...)" → `other_expenses` (no excluido). Mismo
patrón para los ingresos/gastos financieros: 2026/2027 los mezclan dentro de sus catch-alls
("Cobros de rentas financieras" → `other_income`, "Pago de gastos financieros" → dentro de
`admin_general_expense`), en vez de separarlos a `netInterest` como pide la regla general de
`club-data-mapping/SKILL.md` sección 2. Se siguió ESE precedente (ya establecido, no una decisión
nueva) en vez de la regla general de intereses, documentado explícitamente en el comentario de
`racingExpenseLinesByYear[2018]` como una excepción deliberada — cargar TODO el cash-flow del
documento sin excluir nada. Resultado: revenueLines suma EXACTO $1.137.120.000 (el "Total de
Ingresos de Fdos" impreso, sin necesidad de excluir ni derivar nada) y expenseLines suma EXACTO
$(1.125.591.043) (el "Total de Egresos de Fdos (IV)+(V)" impreso) — ambos totales GRANDES del
documento, no subtotales parciales, lo que confirma que el criterio de "cargar todo, sin excluir"
es el correcto para este tipo de documento.

**Verificación adicional** (más allá de que las 2 sumas cierren contra los totales impresos): una
reconciliación de caja independiente — Saldo Inicial de Caja ($182.562.547, la fila "(I)", UNA sola
vez) + Ingresos ($1.137.120.000) - Egresos ($1.125.591.043) = $194.091.504, exacto contra "Saldo
Fondo Financiero" final impreso — confirma que la transcripción de las 41 líneas es fiel, no solo
que 2 subtotales grandes cierran.

**Cambios de archivo**:
- `data/racing-data.js`: nueva entrada `2018` en `racingRevenueLinesByYear` (14 líneas),
  `racingExpenseLinesByYear` (24 líneas) y `racingFiscalYearMeta` (`reportType:'official_budget'`,
  `netInterest:0` a propósito, ver arriba). fx=20, el único tipo de cambio que declara el propio
  presupuesto como premisa (sin un 2do punto para promediar, a diferencia de 2026/2027).
- `data/clubs.js`: nueva entrada `sources['racing-presupuesto-2017-18']`. De paso, se encontraron y
  corrigieron 3 `sourceId` que YA estaban en uso en `racing-data.js` desde las Versiones 58/62
  (`racing-balance-2019-20`, `racing-presupuesto-2019-20`, `racing-balance-2021`) pero NUNCA habían
  tenido su entrada correspondiente en `sources{}` — un gap real que viene de varias versiones
  atrás (incluida la sesión de la Versión 62, que agregó `racing-balance-2021` como sourceId sin
  notar que le faltaba el registro en `clubs.js`). Bug real: sin esa entrada, la pestaña Fuentes y
  el banner de calidad de dato no tienen de dónde sacar el título/URL/nota completa de esos 3
  ejercicios. REGLA para el futuro: cuando se agregue un `sourceId` nuevo en `*-data.js`, verificar
  en el mismo momento que existe su entrada en `data/clubs.js` `sources{}` — los dos archivos se
  desincronizaron 3 veces seguidas simplemente porque nadie lo cruzó.
- `data/clubs.js`: `gestionesByClub.racing.blanco.firstYear` de 2020 a 2018 (mismo criterio de
  siempre, "el ejercicio real más antiguo cargado de esta gestión").
- `index.html`: nuevo bloque en `verifyTieOuts()` (Revenue + Expenses solamente, sin check de
  Resultado neto — el documento no tiene un "Superávit del ejercicio" impreso, es cash-flow).
- `Clubes/Argentina/Racing/racing-presupuesto-2017-18.md`: transcripción nueva.

Verificado en el navegador (servidor local, Racing 2017/2018, Formato del club Y Formato
simplificado, "Año a año" Y "Por gestión" con Blanco): Ingresos 56,9 - Gastos 56,3 + Int. 0,0 = 0,6
M USD (reconcilia), dropdown "Año" muestra "2017/2018 (Presupuesto)", "Por gestión" con Blanco
(`firstYear` nuevo) sin errores, 21 checks de `verifyTieOuts()` (19 previos + 2 nuevos) cierran
exacto, 0 errores de consola. El to-do de Racing (bloque de arriba, sección 1) se actualizó: ya no
queda ningún documento con texto extraíble sin cargar en el archivo de Racing — lo único que queda
son 7 balances (2012-2018, sin 2017/2018 real balance) y 3 presupuestos (2013-14/2015-16/2018-19)
que son escaneos puros, necesitan OCR con el Read tool.


## Versión 64 — EJERCICIO 2017/2018 DE RACING PASA A SER PRESUPUESTO+BALANCE (SEGUNDO PAR DE LA SITE, DESPUÉS DE 2019/2020)

Guido: "continue the onboarding with another year of racing". Se eligió `balance2018.pdf`: el más
barato de los 7 balances-escaneo que quedaban en el archivo (36 páginas), y el único que además
completa un par Presupuesto+Balance ya empezado (el presupuesto de ese mismo ejercicio,
2017/2018, se había cargado en la Versión 63 sin su balance, que era un escaneo puro).

**Verificación de skew antes de comprometerse a leer 36 páginas**: se renderizó la página 3
(`pdftoppm -r 150`) y se inspeccionó visualmente antes de leer el resto — sin inclinación
(columnas y texto rectos), así que no hizo falta el script de deskew de la sección 9 de
`club-data-mapping/SKILL.md`. El Read tool leyó el PDF directo por rangos de páginas (1-10, 11-20,
20-30, 30-36), sin necesidad de `pdftoppm` manual para el resto del documento.

**Transcripción** (CLAUDE.md): las 36 páginas a `Clubes/Argentina/Racing/racing-balance-2018.md`,
condensando las páginas 100% narrativas/legales (notas de criterios contables sin números, informe
de auditoría, certificaciones) pero transcribiendo COMPLETO cualquier tabla con cifras. Encontrado
un typo real del documento original: la página del Estado de Flujo de Efectivo imprime "Ejercicio
Nro. 115" mientras TODAS las demás páginas dicen "116" — se usó 116 (documentado en el `.md`, no es
un error de esta transcripción).

**Categorización — mismo rubro por rubro que 2019/2020 y 2020/2021** (mismo formato de documento,
Anexo II "Recursos ordinarios" / Anexo III "Detalle de gastos" / Anexo V "moneda extranjera",
`club-or-year-onboarding/SKILL.md` sección 9), sin decisiones nuevas. Único detalle a resolver:
este balance separa "Resultados Financieros y por tenencia" en 2 sub-líneas ("Intereses
financieros" + "Diferencias de cambio") en vez de una sola línea combinada como los demás balances
de Racing — se sumaron las 2 en un único `netInterest` (177,149112 M), mismo criterio de fondo (un
solo campo de resultado financiero neto), documentado en el comentario de
`racingFiscalYearMeta[2018]` para que quede explícito por qué 2 líneas del documento se combinan en
1 campo del sitio.

**Mecánica del par Presupuesto+Balance** (sección 11 del skill, 2do caso real después de
2019/2020): el balance nuevo reemplazó al presupuesto en los slots principales
(`racingRevenueLinesByYear[2018]`/`racingExpenseLinesByYear[2018]`/`racingFiscalYearMeta[2018]`,
`reportType` de `'official_budget'` a `'official_budget_and_balance'`), y las líneas del presupuesto
que ya estaban ahí (cargadas en la Versión 63) se movieron, SIN TOCAR UN SOLO VALOR, a
`racingPresupuestoOverlayByYear[2018]` — es un corte-y-pega de datos ya verificados, no una
re-extracción. `gestionesByClub.racing.blanco.firstYear` no necesitó cambiar (ya estaba en 2018
desde la Versión 63).

**Verificación** (`club-data-mapping/SKILL.md` sección 6): revenueLines (11 líneas) suma exacto
$1.789.819.233 (TOTAL DE RECURSOS impreso, pág. 5 y Anexo II, pág. 24). expenseLines (12 líneas:
los 10 rubros de Anexo III + Depreciaciones de Anexo I + Previsiones/Amortizaciones de Anexo III)
suma exacto $(1.350.447.843). Resultado: 1.789.819.233 - 1.350.447.843 + 177.149.112 = 616.520.502,
exacto contra "RESULTADO FINAL – Superávit" impreso (pág. 5) — cierra a los 6 decimales.

**Cambios de archivo**:
- `data/racing-data.js`: `racingRevenueLinesByYear[2018]`/`racingExpenseLinesByYear[2018]`
  reemplazados con los datos del balance; `racingFiscalYearMeta[2018]` actualizado
  (`reportType:'official_budget_and_balance'`, fx=36,65 declarado en Anexo V, grossDebt/cash reales
  del Estado de situación patrimonial). Nueva entrada `racingPresupuestoOverlayByYear[2018]` con las
  líneas del presupuesto (movidas, no re-extraídas).
- `data/clubs.js`: nueva entrada `sources['racing-balance-2018']`; actualizada la nota de
  `sources['racing-presupuesto-2017-18']` (ya no dice "presupuesto-only", ahora cita al balance como
  par).
- `index.html`: bloque de `verifyTieOuts()` de racing 2018 pasó de 2 checks (Revenue/Expenses) a 3
  (+ Resultado neto vs. Superávit), mismo patrón que 2019/2020/2020/2021.
- `Clubes/Argentina/Racing/racing-balance-2018.md`: transcripción nueva.

Verificado en el navegador (servidor local, Racing 2017/2018, Formato del club Y Formato
simplificado, "Año a año" Y "Por gestión" con Blanco): dropdown "Año" dice "2017/2018 (Presupuesto y
Balance)", header de tabla "Balance/2017/2018" y "Presu/puesto" (2 líneas cada uno), Ingresos 48,8 -
Gastos 36,8 + Int. 4,8 = 16,8 M USD (reconcilia con Resultado neto), columna Presupuesto muestra sus
propios montos convertidos con SU fx (20, distinto al 36,65 del balance), Formato Simplificado
empareja las 2 columnas categoría por categoría (mecanismo de la Versión 59), "Por gestión" (Blanco)
sin errores, 22 checks de `verifyTieOuts()` (19 previos + 3 nuevos, reemplazando los 2 viejos del
presupuesto-only) cierran exacto, 0 errores de consola. El to-do de Racing se actualizó: quedan 6
balances (2012-2017, sin contar 2018 que ya está) y 3 presupuestos (2013-14/2015-16/2018-19), todos
escaneos puros.

## Versión 65 — HEADER "ESTADO DE RESULTADOS" NUNCA PARTE UNA PALABRA, Y "BALANCE" PARA CUALQUIER `official_balance_sheet`

Guido, mirando Boca 2026/2027 y 2024/2025, pidió 2 cosas sobre el header de `#finanzasPLTable`
("Estado de resultados"), las 2 como REGLA PERMANENTE para cualquier club/ejercicio, no solo el
caso puntual: "esto es una regla para todos los demás años y clubes, tiene que estar en el motor y
en el skill" (dicho literal en el 2do pedido, aplicado también al 1ro). El punto 1 se resolvió en 3
rondas dentro de la misma sesión: cada una dejó afuera un caso que Guido encontró mirando la
siguiente pantalla, hasta llegar a la regla final.

1. **Ninguna palabra del header se parte nunca, y la columna de overlay lleva año igual que la
   principal.** Ronda 1: "Presupuesto 2026/2027" (Boca, `official_budget`) salía en 3 líneas
   ("Presu"/"puesto"/"2026/2027", el mismo corte silábico que usa la columna de overlay se reusaba
   también para el caso con año al lado, sumando una línea de más) — se corrigió para que el prefijo
   fuera completo en su propia línea, 2 líneas en vez de 3. Ronda 2, mismo día: Guido, mirando Racing
   2019/2020 (`official_budget_and_balance`, con columna "Balance" + columna overlay "Presupuesto"),
   notó que la columna de overlay había quedado AFUERA de ese fix, seguía en "Presu"/"puesto"
   partida — "te quedó solamente PRESU-PUESTO, pero el cambio que dije antes aplica también" — se
   corrigió para que tampoco se partiera, quedando "Presupuesto" entera pero SOLA, sin año. Ronda 3,
   mismo día: Guido notó la inconsistencia que dejó la ronda 2 — la columna de overlay decía solo
   "Presupuesto" mientras la principal de al lado decía "Balance 2019/2020" — "agregá el año también,
   como en el resto de los casos. Es una regla." REGLA FINAL (la que rige hoy):
   `wrapHeaderLabel()` (`js/finanzas-calc.js`) nunca parte una palabra, la envuelve siempre en
   `<span style="white-space:nowrap">`; y el header de la columna de overlay
   (`renderNativePLTable()`, `js/finanzas-render.js`) arma su texto con
   `ejercicioLabel(year, 'official_budget')` en vez de un string `'Presupuesto'` suelto — el `year`
   es siempre el mismo ejercicio que la columna principal (el overlay nunca es de otro año), así que
   el resultado es "Presupuesto AAAA/AAAA", con el MISMO formato de 2 líneas (prefijo íntegro +
   año) que cualquier otra columna con prefijo+año del sitio. El `nowrap` sigue haciendo falta porque,
   sin él, el propio `overflow-wrap:break-word` del `<th>` (necesario como red de seguridad para un
   texto no previsto) parte la palabra sola en un punto feo tipo "PRESUPUES"/"TO", reintroduciendo el
   problema por la puerta de atrás — fuerza un renglón único aunque desborde unos pocos px hacia la
   celda vecina (queda dentro de su padding en blanco, verificado con `getBoundingClientRect()` que
   no pisa el texto "% del total").
2. **`official_balance_sheet` pasa a usar el prefijo "Balance", no "Ejercicio".** Boca 2024/2025
   (`reportType:'official_balance_sheet'`, un balance real) mostraba "EJERCICIO 2024/2025" en el
   header, mismo genérico que un placeholder o un ejercicio todavía no publicado — no distinguía que
   ahí SÍ hay un documento oficial real. Fix en `ejercicioLabel()` (`js/finanzas-calc.js`):
   `official_balance_sheet` se suma a `official_budget_and_balance` en la rama que devuelve
   "Balance", junto al año. Mapeo completo ahora: `official_budget` → "Presupuesto";
   `official_budget_and_balance` U `official_balance_sheet` → "Balance"; cualquier otro
   (`placeholder`, `pending_official`, `unofficial_mirror`) → "Ejercicio". Afecta a TODOS los
   ejercicios `official_balance_sheet` ya cargados, no solo Boca 2024/2025: los balances reales de
   Racing (2008/09 a 2023/24, 2020/21) pasan de "Ejercicio AAAA/AAAA" a "Balance AAAA/AAAA" también,
   verificado en el navegador con Racing 2024/2025. `unofficial_mirror` (River 2024) se dejó afuera a
   propósito de este cambio, sigue diciendo "Ejercicio" — no se consultó con Guido si aplica el mismo
   criterio ahí, no asumir sin confirmarlo si aparece el caso.

**Cambios de archivo**:
- `js/finanzas-calc.js`: `ejercicioLabel()` (nueva condición para `official_balance_sheet`) y
  `wrapHeaderLabel()` (ninguna palabra se parte más, siempre `white-space:nowrap`, tenga o no un año
  al lado — reemplaza el caso especial viejo de "Presu"/"puesto").
- `js/finanzas-render.js`: `renderNativePLTable()`, header de la columna de overlay pasó de armar
  `'Presupuesto'` a mano a reusar `ejercicioLabel(year, 'official_budget')`, para que lleve el año.
- `.claude/skills/club-or-year-onboarding/SKILL.md`: sección 14 nueva (mapeo `reportType` → prefijo
  de `ejercicioLabel()`, y la regla de "nunca partir una palabra" + "el overlay lleva año", con las
  3 rondas documentadas), sección 13.1 actualizada (ya no describe la columna de overlay como
  partida a mano ni sin año), sección 10 con una nota apuntando a la sección 14.

Verificado en el navegador (servidor local), las 3 rondas: Boca 2026/2027 ("Presupuesto"/"2026/2027",
2 líneas), Boca 2024/2025 ("Balance"/"2024/2025"), Racing 2024/2025 ("Balance"/"2024/2025"), Racing
2026/2027 ("Presupuesto"/"2026/2027", 2 líneas) y los 2 ejercicios duales de Racing (2019/2020 y
2017/2018): columna primaria "Balance"/"AAAA/AAAA" + columna overlay "Presupuesto"/"AAAA/AAAA"
(mismo año en las 2, 2 líneas cada una) — ningún caso invade el texto de la columna "% del total"
de al lado.

## Versión 66 — NUEVO EJERCICIO REAL DE RACING, 2018/2019 (PRESUPUESTO-ONLY, ESCANEO CON TABLAS EN LANDSCAPE)

Guido: "onboard another year for racing, pick whatever". Se eligió `presupuesto2018-19.pdf`: el
más barato de los documentos pendientes del archivo de Racing (9 páginas, contra 10-38 del resto),
medido con `pdfinfo`/`pdftotext` antes de comprometerse a leerlo (confirmado escaneo puro, ~1
char/página, igual que el resto de los presupuestos viejos).

**Verificación de skew antes de leer**: las 9 páginas renderizadas a 150 DPI no mostraban ninguna
inclinación diagonal (columnas y texto rectos en las 7 páginas de texto narrativo), así que no
hizo falta el script de deskew de `club-data-mapping/SKILL.md` sección 9. Sí apareció un problema
DISTINTO en las 2 páginas de tabla (Ingresos/Egresos, páginas 8-9): el documento original era una
planilla ancha (landscape) escaneada "acostada" dentro de la página portrait — se leía técnicamente
bien (texto no espejado) pero con las filas "Total"/"Subtotal" impresas ANTES que su propio
desglose, un orden confuso para auditar. Se rotó cada imagen 90° con Python/PIL
(`img.rotate(90, expand=True)`) antes de leerla, quedando en orientación normal (rubro a la
izquierda, meses sep-18 a ago-19 como columnas, "Total del Período" a la derecha) — nueva sección
agregada a `club-data-mapping/SKILL.md` (sección 9) para este caso, distinto del deskew diagonal
que ya estaba documentado ahí.

**Transcripción** (CLAUDE.md): las 9 páginas a
`Clubes/Argentina/Racing/racing-presupuesto-2018-19.md`, con las tablas de Ingresos/Egresos en
formato Markdown (columna "Total del Período" únicamente, mismo criterio que
`racing-presupuesto-2019-20.md` — el desglose mes a mes no se usa para cargar el sitio).

**Categorización — mismo formato de documento y mismos rubros que `presupuesto2017-18.pdf`**
(el ejercicio inmediato anterior, cargado en la Versión 63 como `racingPresupuestoOverlayByYear[2018]`),
sin decisiones nuevas: "Pago por compra de Activos Intangibles" (la compra de jugadores del
ejercicio, $415,333333 M, el gasto individual más grande del documento) va a `player_amortisation`,
mismo criterio que "Pago por adquisición de jugadores"/"Cancelación Efectiva por Compra de
Jugadores" en los demás ejercicios de Racing — no se excluye como si fuera puro movimiento de
balance.

**Sin balance real todavía para este ejercicio** (`reportType:'official_budget'` simple, no
`official_budget_and_balance` — a diferencia de 2017/2018 y 2019/2020, que sí tienen las 2
fuentes): el archivo oficial de Racing no tiene un `balance2018-19.pdf` ni equivalente, este
ejercicio queda PRESUPUESTO-ONLY hasta que aparezca (si aparece) un balance auditado real.
fx=40, la premisa macro que el propio presupuesto declara ("Estimamos un TC de $ 40.- por u$d 1.-
en promedio para el período", pág. 2).

**Verificación** (`club-data-mapping/SKILL.md` sección 6): revenueLines (13 líneas) suma exacto
$1.616.026.650 (el "TOTAL DE INGRESOS DE FDOS" impreso, pese a su etiqueta confusa "(I)+(II)+(III)":
el total NO incluye el Saldo Inicial de Caja (I), solo Ordinarios (II) + Extraordinarios (III), mismo
comentario que ya tenía `racingPresupuestoOverlayByYear[2018]` sobre esta misma etiqueta). expenseLines
(17 líneas) suma exacto $(1.756.652.573) ("TOTAL DE EGRESOS DE FDOS (IV)+(V)" impreso). Déficit real:
1.616.026.650 - 1.756.652.573 = -140.625.923, que reconcilia contra "Fluir de Fondos del Período" vía
Saldo Inicial (447.142.476) + Ingresos - Egresos = 306.516.553 (Saldo Final impreso), exacto.

**Cambios de archivo**:
- `data/racing-data.js`: nueva entrada `2019` en `racingRevenueLinesByYear` (13 líneas),
  `racingExpenseLinesByYear` (17 líneas) y `racingFiscalYearMeta` (`reportType:'official_budget'`,
  fx=40, `officialTotalRevenue`/`officialTotalExpenses`).
- `data/clubs.js`: nueva entrada `sources['racing-presupuesto-2018-19']`.
- `index.html`: 2 checks nuevos de Racing 2019 en `verifyTieOuts()` (Revenue, Expenses incl.
  no-efectivo — sin 3er check de Resultado neto, mismo criterio que 2026/2027: un presupuesto
  simple no tiene un "Superávit/Déficit del ejercicio" auditado impreso contra qué comparar).
- `.claude/skills/club-data-mapping/SKILL.md`: sección 9, nota nueva sobre tablas escaneadas en
  landscape "acostadas" en una página portrait (rotación de 90°, distinto del deskew diagonal que
  ya estaba documentado ahí).
- `Clubes/Argentina/Racing/racing-presupuesto-2018-19.md`: transcripción nueva.
- `fuentes-por-club.md`: actualizado el estado de Racing (presupuesto2018-19 pasa de "pendiente" a
  "cargado").
- `gestionesByClub.racing.blanco.firstYear`/`lastYear` NO cambiaron (2019 ya caía dentro del rango
  2018-2024 ya cubierto).
- NO se agregó entrada en `presupuestoSupuestosByClub`/`presupuestoFinancieroByClub`/
  `presupuestoInversionesByClub` para este ejercicio, mismo criterio que los otros presupuestos
  viejos de Racing ya onboardeados (2018, 2020 como overlay): esas 3 tablas extra son opcionales
  (el card se esconde solo si no hay entrada, `js/finanzas-render.js`) y hasta ahora solo se
  cargaron para el presupuesto VIGENTE de cada momento (hoy 2026/2027), no para cada ejercicio
  histórico — no se rompió ese patrón sin consultarlo con Guido primero.

Verificado en el navegador: dropdown "Año" dice "2018/2019 (Presupuesto)", header de tabla dice
"Presupuesto/2018/2019" (2 líneas), "Formato del club" Y "Formato simplificado" reconcilian
(Ingresos 40,4 - Gastos 43,9 + Int. 0,0 = -3,5 M USD), ningún bucket de Formato Simplificado vacío,
"Por gestión" (Blanco) sin errores con el año nuevo dentro del rango, 2 checks nuevos de
`verifyTieOuts()` cierran exacto, 0 errores de consola.

## Versión 67-75 — ARCHIVO COMPLETO DE RACING CARGADO — TODOS LOS BALANCES Y PRESUPUESTOS DE finance-of-sports/Clubes/Argentina/Racing/ (Ejercicios 111 a 117)

Guido, después de la Versión 66: "debería seguir onboardeando para Racing hasta que terminemos de
onboardear todos los archivos disponibles en la carpeta" — sesión larga, sin pausar entre
documento y documento, cargando los 8 documentos que quedaban pendientes del archivo histórico de
Racing (2012-2017). Con esto, el archivo completo de racingclub.com.ar/informes/ (~24 documentos,
2009 a 2027) queda 100% transcripto y cargado — ver detalle documento por documento abajo.

**Presupuestos (2 documentos, ambos PRESUPUESTO-ONLY al momento de cargarlos)**:
- Ejercicio 2013/2014 (`presupuesto2013-14.pdf`, 10 páginas, escaneo). Encontrado un caso nuevo de
  columna "Total del Período" desalineada de sus propias columnas mensuales (filas "Premios
  Plantel Deportivo"/"Préstamos Plantel Deportivo"/"Pretemporada") — corregido por aritmética
  contra los 12 meses de cada fila, documentado en `club-data-mapping/SKILL.md` sección 9.
- Ejercicio 2015/2016 (`presupuesto2015-16.pdf`, 11 páginas, escaneo). Mismo tipo de desalineación
  en "Pretemporada".

**Balances reales, 6 documentos**:
- Ejercicio N° 110 / 2011-2012 (`balance2012.pdf`, 25 páginas, PRE-Blanco). Primer ejercicio de
  esta sesión cargado en ARS nativo (no USD ya-convertido como 2009-2011) con el fx que declara el
  propio balance.
- Ejercicio N° 111 / 2012-2013 (`balance2013.pdf`, 28 páginas). Presidencia de este ejercicio
  puntual quedó INCIERTA (ninguna página muestra firma de Presidente) — `gestionId:null` por
  inferencia de fecha, documentado para revisión futura.
- Ejercicio N° 112 / 2013-2014 (`balance2014.pdf`, 38 páginas, irregular de 10 meses). Resultó ser
  el balance real del MISMO ejercicio que el presupuesto 2013/2014 ya cargado — el ejercicio pasó
  de `official_budget` a `official_budget_and_balance`, mismo mecanismo que 2017/2018 y
  2019/2020 (`club-or-year-onboarding/SKILL.md` sección 11): el presupuesto se movió a
  `racingPresupuestoOverlayByYear[2014]` sin tocar un valor.
- Ejercicio N° 113 / 2014-2015 (`balance2015.pdf`, 25 páginas). Sin presupuesto propio en el
  archivo (salta de 2013-14 a 2015-16), balance real simple.
- Ejercicio N° 114 / 2015-2016 (`balance2016.pdf`, 36 páginas). PRIMER EJERCICIO CON AUDITORÍA
  EXTERNA (Estudio Bertora y Asociados S.R.L.) — formato de estados contables nuevo. Mismo
  mecanismo dual que 2014: pasó de `official_budget` a `official_budget_and_balance` con el
  presupuesto 2015/2016 ya cargado. HALLAZGO IMPORTANTE: la columna comparativa "31/08/2015" de
  este documento NO coincide con `racingRevenueLinesByYear[2015]` ya cargado (TOTAL DE RECURSOS
  $426,9M vs. $430,3M, RESULTADO FINAL $58,5M vs. $102,5M) — el propio documento lo explica en su
  Nota 1.c): el nuevo auditor reclasificó la EXPOSICIÓN de los rubros del ejercicio anterior para
  hacerlo comparable, "no implica cambios en las decisiones tomadas en base a ella". Confirmado que
  es solo presentación (no un error): el Estado de Flujo de Efectivo de este mismo documento
  coincide EXACTO, línea por línea, con `racing-balance-2014-15.md` ya cargado. Se dejaron los
  datos de 2015 SIN TOCAR (siguen reflejando el balance original de ese ejercicio) — decisión
  documentada, no aplicada unilateralmente, para que Guido la revise si quiere reclasificar
  retroactivamente (ver nota completa en `racing-balance-2016.md`).
- Ejercicio N° 115 / 2016-2017 (`balance2017.pdf`, 34 páginas). Segundo ejercicio con auditoría
  externa, sin presupuesto propio en el archivo. La comparativa "31/08/2016" de ESTE documento SÍ
  coincide exacto con lo cargado en la Versión anterior — confirma que 2016 quedó estable, la
  reclasificación fue puntual a la transición 2015→2016.

**Patrón nuevo encontrado, documentado en `club-data-mapping/SKILL.md` sección 9**: 2 balances
(2013, 2014) tuvieron la misma trampa de "columna Total desalineada de sus filas" que ya afectaba
a los presupuestos — mismo criterio de corrección (aritmética contra los sub-totales impresos)
documentado ahí para la próxima vez.

**Cambios de archivo** (resumen, cada documento tiene su propio comentario detallado en
`data/racing-data.js`/`data/clubs.js`):
- `data/racing-data.js`: nuevas entradas en `racingRevenueLinesByYear`/`racingExpenseLinesByYear`/
  `racingFiscalYearMeta` para 2012, 2013, 2016 (reemplazando 2016), 2017; entradas MIGRADAS
  (presupuesto→balance primario, presupuesto movido a overlay) para 2014 y 2016;
  `racingPresupuestoOverlayByYear[2014]`/`[2016]` nuevos.
- `data/clubs.js`: 8 entradas nuevas en `sources{}` (`racing-presupuesto-2013-14`,
  `racing-presupuesto-2015-16`, `racing-balance-2012`, `racing-balance-2013`, `racing-balance-2014`,
  `racing-balance-2014-15`, `racing-balance-2016`, `racing-balance-2017`);
  `gestionesByClub.racing.blanco.firstYear` de 2018 a 2014 (el ejercicio real más antiguo de su
  gestión ahora cargado).
- `index.html`: 20 checks nuevos en `verifyTieOuts()` (2-3 por ejercicio según si es presupuesto-only
  o balance real), TODOS cierran exacto — 0 discrepancias en las 8 cargas.
- `.claude/skills/club-data-mapping/SKILL.md`: sección 9, nota nueva sobre columnas "Total del
  Período" desalineadas de sus filas (encontrado en 4 documentos distintos de esta sesión); sección
  11, aclarado que pedir ayuda a Guido es el ÚLTIMO recurso, no una pausa preventiva por "el PDF se
  ve difícil".
- `.claude/skills/club-or-year-onboarding/SKILL.md`: nota nueva en la sección 1, aclarando que "seguí
  onboardeando sin pausar entre documentos" es la lectura correcta de un pedido de ese tipo, distinto
  de las preguntas de alcance/arquitectura que sí ameritan frenar y preguntar.
- 8 transcripciones nuevas en `Clubes/Argentina/Racing/` (una por documento, cada una con su propia
  sección de Verificación mostrando la aritmética exacta contra los totales impresos).

Verificado en el navegador para los 8 documentos, uno por uno, y con una pasada final de
`verifyTieOuts()` completo (81 checks totales para Racing, boca y river incluidos sin
contarlos aparte): TODOS cierran exacto, dropdown "Año" y header de "Estado de resultados"
correctos para cada ejercicio nuevo, "Formato simplificado" sin buckets vacíos, 0 errores de
consola. `gestionesByClub.racing.blanco.firstYear` verificado en "Por gestión" (Blanco) sin
errores con el rango ampliado a 2014.

Pendiente, NO parte de este archivo: 3 PDFs "Informe de Gestión" (2021, y los 2 semestres de 2025)
en la misma carpeta — son reportes institucionales narrativos (fútbol, infraestructura, marca),
NO balances/presupuestos con Anexos de Recursos/Gastos, así que quedan fuera del alcance de esta
tanda. Si a futuro se quiere extraer contenido narrativo de esos, es un trabajo distinto (no
financiero).


## Versión 76 — INICIO SIN "MVP · DATOS DE EJEMPLO", 3 GRÁFICOS DE EVOLUCIÓN (INGRESOS/GASTOS/DEUDA), TODOS LOS EJERCICIOS SIN SALTEAR NINGUNO

Guido pidió 2 cosas en Inicio: (1) sacar el badge "MVP · datos de ejemplo"; (2) un card con un
gráfico Ingresos ($ en Y, año en X) con TODOS los años en orden cronológico, en blanco el que no
tenga dato (pero sin saltear ningún año de la secuencia), que cambie según el club elegido — "idem
para gastos y deuda" (mismo pedido, 3 métricas).

- Badge: se sacó el `<span class="placeholder-badge">` de Inicio y, al quedar sin ningún otro uso
  en todo el archivo, también la regla CSS `.placeholder-badge` (no se dejó código muerto). El
  badge distinto del footer ("MVP · datos placeholder · versión de prueba") no se tocó, Guido pidió
  específicamente "en Inicio".
- Arquitectura, capa de CÁLCULO (`js/finanzas-calc.js`, 3 funciones nuevas): `allYearsRangeForClub(clubId)`
  arma el rango COMPLETO y continuo de años del club (del mínimo al máximo que exista en cualquier
  lugar de sus datos — `yearsRaw` para Boca, `riverFiscalYearMeta`/`racingFiscalYearMeta` para los
  otros dos, por ternario, no por objeto armado de una sola vez, mismo motivo que ya documenta
  `yearMetaFor`/`drawTrendChartGeneric` sobre lazy-loading), sin saltear ningún año del medio aunque
  no tenga ninguna clave cargada (ej. Boca no tiene NINGUNA entrada para 2020, ni siquiera
  placeholder: igual aparece en el rango, en blanco). `yearHasRealDataForClub(clubId, year)` decide
  si ese año se dibuja o queda en blanco, mismo criterio que ya usaban `drawTrendChart`
  (`bocaYearIsReal`) y `drawTrendChartGeneric` (su ternario inline por `reportType`), generalizado a
  los 3 clubes. `inicioSeriesForClub(clubId)` arma las 3 series (Ingresos/Gastos/Deuda neta, en USD,
  mismo criterio que ya usa `displayFinancialsForClub` para "Comparar Gestiones") recorriendo ese
  rango, con `null` en cualquier año sin dato real.
- Arquitectura, capa de RENDER (`js/finanzas-render.js`): `drawInicioMetricChart(canvasId, prevInst,
  years, values, label, color)` dibuja un gráfico de barras de una sola serie (reusa el patrón de
  `drawTrendChart`: `layout.padding.top:26` para el "$" superpuesto, eje X con título "Ejercicio"),
  sin leyenda (una sola serie por card, la leyenda sería redundante con el título del card).
  `renderInicioCharts()` la llama 3 veces (Ingresos #0a2b5c, Gastos #b5372b, Deuda neta #6b6b6b,
  mismos colores que ya usa el resto del sitio para esas 2 primeras categorías), guardando cada
  instancia de Chart.js en su propia variable (`inicioIngresosChartInst`/`inicioGastosChartInst`/
  `inicioDeudaChartInst`) para destruirla antes de redibujar, igual que `trendChartInst`.
- `index.html`: 3 `<div class="card">` nuevos en `#inicio` (antes de "Cómo usar este sitio"), cada
  uno con `<canvas>` propio dentro de `.chart-wrap`+`.chart-axis-dollar` (mismas clases CSS que ya
  usa el card "Gráficos" de Finanzas, sin CSS nuevo). `renderInicioCharts()` se llama junto con
  `renderInicioStats()` en los 2 mismos lugares que ya la llamaban: INIT y `refreshAllForClub()`
  (cambio de club), así que el gráfico se redibuja solo al elegir otro club, sin tocar ningún otro
  event listener.
- Verificado en el navegador, los 3 clubes: Boca muestra 2018-2027 (10 años, sin saltear el 2020
  que no tiene ninguna clave en `yearsRaw`), con barra solo en 2025 y 2027 (los únicos reales) en
  Ingresos/Gastos, y solo 2025 en Deuda neta (2027 es presupuesto, sin desglose de deuda, mismo
  criterio de "en blanco si no hay dato" — no es un bug, el balance de 2027 simplemente no existe
  todavía). Racing muestra 2009-2027 (19 años) con 2022 y 2023 en blanco (el propio archivo oficial
  de Racing salta esos 2 años, no es que falte cargar algo, ver `fuentes-por-club.md`) y el resto
  con barra. River muestra 2021-2025 (5 años) con barra solo en 2024 (el único ejercicio real). 0
  errores de consola en los 3 casos, todos los checks de `verifyTieOuts()` (Boca+Racing+River)
  siguen cerrando exacto, la pestaña Finanzas (que comparte `trendChartInst`/`Chart` global pero
  usa canvases e instancias propias, no las nuevas) sin cambios visuales ni de comportamiento.


## Versión 77 — LOS 4 STATS DE INICIO EN ESPAÑOL Y EN UNA LÍNEA, GRÁFICOS APILADOS POR "FORMATO SIMPLIFICADO", CLIC LLEVA A FINANZAS, SIN "CÓMO USAR ESTE SITIO"

Sobre lo que se armó en la Versión 76 (mismo día), Guido pidió 5 ajustes en un solo mensaje: (1) los
4 stats de arriba de Inicio mezclaban español e inglés y no entraban en una línea; (2) el card de
Ingresos pasa a llamarse "Ingresos por año" (con eñe), y los 3 gráficos siempre tienen que preferir
Balance por sobre Presupuesto si un ejercicio tiene los 2, marcando de otro color y aclarando
"Presupuesto" cuando NO hay balance real todavía; (3) clic en una barra tiene que llevar a la pestaña
Finanzas de ese año; (4) sacar el card "Cómo usar este sitio"; (5) los cards de Ingresos y Gastos
necesitan sub-colores mostrando cuánto aporta cada categoría de "Formato Simplificado" al total.

- Stats de Inicio (`renderInicioStats()`, `js/finanzas-render.js`): "Net spend histórico (gestión
  actual)" (mezcla real con inglés) pasó a "Gasto neto en pases", y "Último resultado (${yearLabel})"
  perdió el año del texto visible — los 2 eran los únicos que no entraban en una sola línea dentro
  del ancho de `.stat` (200px mínimo, ver `.grid`), rompiendo la alineación de la fila de 4 cards. El
  detalle que se sacó del texto (el ejercicio de "Último resultado", "gestión actual" de pases) no
  se perdió, se movió a `title` (tooltip nativo al pasar el mouse), mismo patrón que ya usa el
  toggle "Formato del club/simplificado" para su propia aclaración.
- Balance-siempre-antes-que-Presupuesto: ya estaba bien resuelto desde la Versión 76 sin querer
  (`computeYearForClub`/`simplifiedReportForClub` leen SIEMPRE `revenueLines`/`expenseLines`, el dato
  primario — el Presupuesto de un ejercicio dual vive aparte, en
  `racingPresupuestoOverlayByYear`, que estas funciones nunca tocan), pero no había ninguna manera de
  VER esa distinción en el gráfico. Se agregó `yearKindForClub(clubId, year)`
  (`js/finanzas-calc.js`): 'blank' (nada cargado), 'balance' (`official_balance_sheet`/
  `unofficial_mirror`/`official_budget_and_balance` — el balance manda incluso si además hay
  presupuesto) o 'presupuesto' (`official_budget` sin balance todavía), delegando a
  `reportTypeForYear()` (ya existía, unifica los 3 clubes) en vez de reimplementar ese mapeo.
- Color distinto para "Presupuesto" + aclararlo: en vez de una 2da paleta de colores en paralelo,
  cada dataset/serie usa el MISMO color de siempre pero atenuado (alpha 0.45 en vez de 1) en los años
  'presupuesto' (`hexToRgba()`, nuevo helper en `js/finanzas-render.js`, un color por índice de año
  vía `backgroundColor: kinds.map(...)`). El título del tooltip (`inicioTooltipTitle()`) dice
  "AAAA (Presupuesto)" en esos años, "AAAA" solo en el resto — así queda clarísimo con solo pasar el
  mouse, sin recargar el gráfico de texto.
- Clic en una barra -> Finanzas de ese año: `interaction:{mode:'index', intersect:false}` en las 3
  charts (permite clickear cualquier parte de la columna de ese año, no solo el pixel exacto de la
  barra) + `onClick` (`inicioChartOnClick()`) que resuelve el año por `elements[0].index` y llama a
  `goToFinanzasYear(clubId, year)` (nuevo en `js/finanzas-render.js`): hace clic en el botón de nav
  "Finanzas" (`#mainNav button[data-section="finanzas"]`, se hace ANTES de tocar nada más para que
  Chart.js dibuje con el canvas ya visible, no oculto), fija `#anioSelect` a ese año, pasa a "Año a
  año" si hacía falta (ese click ya dispara `refreshFinanzas()` con el año ya seteado; si ya estaba
  en "Año a año" se llama a mano, para no duplicar el redibujado) y hace scroll suave al principio de
  la página. Si el año no tiene ningún dato real (`reportTypeForYear` placeholder/pending_official,
  mismo criterio que ya lo deja en blanco en el propio gráfico) no navega — no tiene sentido llevar a
  un año sin nada que mostrar, aunque el `<select>` de Finanzas tenga una opción para él (river
  2021/2025, placeholder pero con entrada en `riverFiscalYearMeta`).
- Se sacó el card "Cómo usar este sitio" de Inicio (era el único elemento después de los 3 gráficos
  nuevos, sin ninguna dependencia de otro código).
- Ingresos/Gastos apilados por "Formato Simplificado": `inicioStackedSeriesForClub(clubId, buckets,
  sectionKey)` (`js/finanzas-calc.js`) arma un dataset de Chart.js por categoría, llamando a
  `simplifiedReportForClub(clubId, year)` (ternario a `simplifiedReportForBoca`/
  `simplifiedReportForGeneric`, YA existían, no se reimplementó ninguna lógica de categorización) año
  por año del rango completo. `INICIO_INGRESOS_BUCKETS`/`INICIO_GASTOS_BUCKETS` (mismo archivo) fijan
  el orden y color de cada categoría — MISMOS labels que ya usa el resto del sitio (ver
  `club-data-mapping/SKILL.md` sección 13, "REGLA PERMANENTE... labels idénticos entre clubes"), con
  un color de más agregado (9no para Ingresos) para tener uno por categoría. `drawInicioStackedChart()`
  (`js/finanzas-render.js`) las dibuja con `scales:{x:{stacked:true}, y:{stacked:true}}` y leyenda
  abajo (hasta 9 entradas, por eso `.chart-wrap-tall` — 360px en vez de 270px, solo para estos 2
  cards, Deuda neta se queda con la altura normal al no tener leyenda). Deuda neta NO se tocó en este
  punto (sigue siendo una sola serie, `drawInicioMetricChart()`): la deuda no es un concepto de
  "Formato Simplificado", no hay "categorías de deuda" que desglosar.
- Verificado en el navegador, los 3 clubes: Boca (2025 apilado en 6 categorías con plata real,
  2027 con las mismas categorías en tono atenuado — es Presupuesto — y suma igual a como se veía en
  la Versión 76 sin apilar), Racing (2019 atenuado —presupuesto-only— entre 2018 y 2020 que salen en
  color pleno —tienen balance real, aunque 2018/2020 también tengan overlay de presupuesto—, 2026/
  2027 atenuados al final), River (2024 con "Fútbol profesional" dominando Ingresos y "Otros gastos"
  dominando Gastos, coherente con la limitación de fuente ya documentada en `river-data.js`). Clic en
  una barra de Balance (Boca 2025) y en una de Presupuesto (Boca 2027, Racing 2017/2018 dual) llevan
  a Finanzas con el año correcto seleccionado y el dropdown mostrando el sufijo correcto
  ("Balance"/"Presupuesto y Balance"). 0 errores de consola en los 3 clubes, todos los checks de
  `verifyTieOuts()` siguen cerrando exacto (no se tocó ninguna función de cálculo real, solo lectura).


## Versión 78 — TOTAL Y % ARRIBA/ADENTRO DE CADA BARRA, ORDEN DINÁMICO POR MAGNITUD, "NO INFORMADO POR EL CLUB" EN LAS COLUMNAS VACÍAS, PERÍODO EN 2 LÍNEAS, LEYENDA HTML ALINEADA

Sobre lo armado en las Versiones 76-77 (mismo día), Guido pidió 6 ajustes más en un solo mensaje: (1)
sacar el copy "Nada de bajada de línea." de la bajada de Inicio; (2) sacar el párrafo explicativo
debajo del título de cada uno de los 3 cards nuevos; (3) un número total arriba de cada barra; (4) en
cada columna sin dato, un texto vertical (rotado) que diga "No informado por el club"; (5) que las
leyendas de los 2 gráficos apilados queden alineadas entre sí; (6) porcentajes adentro de cada
segmento, y el orden de los segmentos (y de la leyenda) de mayor a menor según el ÚLTIMO ejercicio
disponible, no un orden fijo; y de paso, en el eje X, el período completo ("2026"/"2027") en 2 líneas
en vez de un solo año suelto, para no ensanchar cada columna.

- Copys sacados: la oración final de la bajada de Inicio, y el `<p class="subtitle">` de los 3 cards
  de gráficos (Ingresos/Gastos/Deuda) — quedan solo el `<h2>` y el gráfico.
- Orden dinámico (`js/finanzas-calc.js`): nueva `lastAvailableYearForClub(clubId)` (el año más
  reciente del rango completo con `yearKindForClub !== 'blank'`, sea Balance o Presupuesto).
  `inicioStackedSeriesForClub()` ahora ordena su propia copia de `buckets` (`.slice().sort(...)`) por
  el valor ABSOLUTO de cada categoría en ESE año, descendente, ANTES de armar los datasets — el mismo
  orden se usa para TODOS los años del gráfico (no se reordena año a año), así el segmento más grande
  hoy queda siempre abajo de la pila. El color de cada categoría sigue atado al `label`, no a la
  posición, para que no cambie de significado al cambiar de club/orden.
- Total y % (`js/finanzas-render.js`, plugins de Chart.js nuevos, mismo patrón que ya usaba
  `pctSliceLabelsPlugin` del doughnut): `stackedValueLabelsPlugin` (Ingresos/Gastos) lee la geometría
  real de cada `BarElement` ya dibujado (`getProps(['x','y','base'])`) para calcular el alto en
  píxeles de cada segmento y dibujar su % centrado adentro (se omite si da <5% o el segmento mide
  menos de 14px, mismo criterio que el doughnut para no amontonar texto), y el total del año (suma de
  los buckets) en negrita arriba de toda la pila. `singleBarTotalPlugin` (Deuda) es la versión sin %
  para una sola serie — usa `Math.min(y, base)` en vez de asumir signo, porque una deuda neta
  NEGATIVA (más caja que deuda) dibuja la barra hacia abajo del cero, así que "arriba de la barra"
  puede ser cualquiera de los 2 extremos según el signo. `layout.padding.top` subió de 26 a 34 en los
  3 gráficos para que el total no quede pegado/cortado contra el borde superior del canvas.
- "No informado por el club" (`blankColumnLabelsPlugin(kinds)`, mismo archivo): por cada índice de
  año con `kinds[i] === 'blank'`, un texto rotado -90° (vertical), centrado en esa columna
  (`xScale.getPixelForTick(i)`, verticalmente centrado en `chartArea`). Se pasa como plugin de
  instancia (no registrado global) a los 3 gráficos, cerrado sobre el `kinds` de CADA canvas (son 3
  arrays de blancos distintos, uno por gráfico/club).
- Período en 2 líneas (`inicioPeriodLabels(years)`): en vez de `years.map(String)`, cada label pasa a
  ser un array `[String(year-1), String(year)]` — Chart.js ya sabe renderizar un array de strings
  como label multilínea, no hizo falta ningún plugin para esto. El título nativo del eje X
  (`title:{display:true,text:'Año'}`) se sacó de los 3 gráficos: con el período ya en el propio tick,
  quedaba redundante y le restaba alto disponible al área de trazado. El título del tooltip
  (`inicioTooltipTitle`) también pasó a mostrar el período completo ("2026/2027 (Presupuesto)" en vez
  de solo "2027 (Presupuesto)"), por la misma consistencia.
- Leyenda HTML propia (`renderInicioLegend()`, nuevo `<div class="inicio-legend">` debajo de cada
  `.chart-wrap` de Ingresos/Gastos en `index.html`, con su propio CSS Grid en vez de la leyenda
  nativa de Chart.js —que se apagó, `legend:{display:false}`—): como los 2 `.inicio-legend` tienen el
  mismo `grid-template-columns` y el mismo ancho de card, sus columnas arrancan en el mismo x en las
  2 — "alineadas entre sí" sin tener que sincronizar manualmente el ancho de cada fila (que es lo que
  no garantiza la leyenda nativa, con flex-wrap centrado y texto de largo distinto por fila). De
  paso, la leyenda pasó de una sola línea con `text-overflow:ellipsis` (cortaba nombres largos como
  "Estadio: recaudación de partidos") a text wrap normal, ya no se pierde texto. Al mover la leyenda a
  HTML fuera del `<canvas>`, `.chart-wrap-tall` (360px, agregado en la Versión 77 para dejarle lugar a
  la leyenda nativa DENTRO del canvas) quedó sin uso — se sacó esa clase y las 2 cards volvieron al
  `.chart-wrap` normal (270px), la leyenda ahora vive en el flujo HTML normal debajo, con la altura
  que necesite.
- Verificado en el navegador, los 3 clubes: Boca (2025 real con 4 categorías con %, 2027 en tono
  atenuado con las suyas, ambos con su total arriba; 2020 y los años placeholder muestran "No
  informado por el club" en vertical), Racing (19 columnas, 2022/2023 en blanco con el texto
  vertical, el resto con total+%+período de 2 líneas, orden de la leyenda encabezado por "Venta de
  Jugadores"/"Salarios y primas" —las categorías más grandes en 2026/2027, su último ejercicio—),
  River (2021/2022/2023/2025 en blanco, 2024 con "Fútbol profesional" al 67% arriba de la pila en
  Ingresos, coherente con ser la categoría más grande de ESE único año real). Clic en una barra
  (Racing 2016/2017) sigue llevando a Finanzas con el año correcto. 0 errores de consola en los 3
  clubes, todos los checks de `verifyTieOuts()` siguen cerrando exacto (no se tocó ninguna función de
  cálculo real, solo la capa de render y el orden de los buckets).


## Versión 79 — TOGGLE USD/ARS UNIVERSAL (HEADER), YA NO SOLO DENTRO DE FINANZAS

Guido: "necesito poder ver en USD los valores en Inicio. el toggle ARS/USD tiene que ser universal
entonces, al lado de selector de club" — Inicio mostraba sus stats y sus 3 gráficos de evolución
siempre en USD, sin ninguna forma de pasarlos a ARS, porque el toggle de moneda solo existía adentro
de los controles de Finanzas (`#currencyToggleFin`).

- HTML (`index.html`): el `<div class="segmented" id="currencyToggleFin">` se sacó de los controles
  de Finanzas y se movió al header, adentro de `.header-right`, justo ANTES del `<select
  id="clubSelect">` ("al lado del selector de club", como pidió Guido) — nuevo id
  `#currencyToggleGlobal`. Estilo propio (`.header-currency-toggle`, nueva regla CSS): mismo
  `.segmented` de siempre pero con los colores del header (fondo transparente + texto blanco en vez
  de fondo blanco + azul, pensado para cards sobre fondo claro) y el mismo dorado (`var(--oro)`) que
  ya usa `nav button.active` para su propio estado activo — consistente con el resto del header, no
  el estilo de `.segmented` que se usa dentro de las cards.
- JS (`index.html`, dentro del `<script>` principal): el listener de click se movió con el HTML
  (mismo mecanismo: togglear `.active`, fijar `currentCurrency` — variable global de siempre, no
  cambió), pero ahora además de `refreshFinanzas()` llama a `renderInicioStats()` y
  `renderInicioCharts()`, para que Inicio se redibuje también. `refreshAllForClub()` (se dispara al
  cambiar de club) actualiza la referencia de `#currencyToggleFin` a `#currencyToggleGlobal` para
  esconder/mostrar el toggle según `clubs[clubId].country === 'AR'` (mismo criterio que ya regía),
  y ahora también resetea visualmente el botón activo a "USD" si el toggle se esconde con "ARS"
  activo (mismo patrón que ya usa `simplifyToggle` unas líneas más abajo, para no dejar un estado
  visual inconsistente con `currentCurrency` cuando se vuelve a mostrar).
- Cálculo (`js/finanzas-calc.js`): `inicioStackedSeriesForClub()` e `inicioDeudaSeriesForClub()`
  convertían SIEMPRE a `'USD'` hardcodeado — pasaron a usar `currentCurrency`.
  `inicioDeudaSeriesForClub()` dejó de llamar a `displayFinancialsForClub()` (esa función fuerza USD
  a propósito, la usa "Comparar Gestiones", que por diseño ignora el toggle — ver su propio
  comentario) y arma el valor directo con `toDisplayValue(..., yearMetaFor(...), currentCurrency)`.
- Render (`js/finanzas-render.js`): `renderInicioStats()` dejó de usar `displayFinancialsForClub()`
  por el mismo motivo (fuerza USD) — arma `patDisp`/`netDebtDisp` directo con `toDisplayValue(...,
  yearMetaFor(currentClub, cur.year), currentCurrency)`. "Gasto neto en pases" es la EXCEPCIÓN
  deliberada: se deja siempre en USD (`fmtAmount(netSpend, 'USD')`, sin cambios) porque son valores
  de mercado de pases sin ningún `fx`/`yearMeta` propio del que convertir — el mercado de pases se
  cotiza en USD por convención, no tiene un "ARS nativo" del que partir.
- Verificado en el navegador: con Boca, tocar ARS en el header cambia al toque los 2 stats de Inicio
  que sí convierten (Último resultado, Deuda neta actual — "Gasto neto en pases" se queda en USD,
  como corresponde) y los 3 gráficos (Ingresos 2025 pasa de 152.1 a 183.0, mismo período/colores/%,
  solo cambia la unidad); yendo a Finanzas con ARS ya activo, la pestaña abre directo en ARS (ya no
  hay 2 estados de moneda para desincronizar, es el mismo `currentCurrency`), y los controles de
  Finanzas ya NO tienen su propio toggle (se sacó, quedaba redundante). Racing y River en ARS:
  mismo comportamiento, sin errores. 0 errores de consola en los 3 clubes, todos los checks de
  `verifyTieOuts()` siguen cerrando exacto (esa función siempre corrió en moneda nativa, nunca pasó
  por ningún toggle, no se tocó).


## Versión 80 — "FORMATO SIMPLIFICADO" PASA A SER EL DEFAULT DE FINANZAS

Guido: "en finanzas, que formato simplificado sea el default". Pedido puntual, un solo cambio de
estado inicial, sin tocar ningún cálculo.

- `index.html`: `let simplifyFormat = false;` pasó a `let simplifyFormat = true;` (variable global
  de siempre, ver "MODELO DE PRODUCTO FREE/PREMIUM" más abajo en este mismo comentario). El botón
  `class="active"` del HTML estático de `#simplifyToggle` se movió de `data-simplify="0"` ("Formato
  del club") a `data-simplify="1"` ("Formato simplificado"), mismo criterio que ya se sigue para
  cualquier `<option>`/botón estático del sitio: el HTML de entrada tiene que decir lo mismo que el
  estado inicial real del JS, no quedar desincronizado hasta el primer click (mismo tipo de bug que
  ya se había encontrado y corregido para el `<select id="anioSelect">` en la Versión 56).
- No hizo falta tocar nada más: `nativeReportFor()` ya leía `simplifyFormat` en su ternario para
  decidir entre `simplifiedReportForBoca()`/`simplifiedReportForGeneric()` y la rama nativa, y el
  toggle (`#simplifyToggle button` click listener) ya alternaba el valor y llamaba a
  `refreshFinanzas()` igual que siempre — el ÚNICO cambio real es de qué valor arranca.
- El reset a "Formato del club" para un futuro club no-argentino (`refreshAllForClub()`, si
  `!isArgentineClub && simplifyFormat`) sigue funcionando igual, ahora simplemente parte de `true`
  en vez de `false` la primera vez que corre.
- Verificado en el navegador: recarga de cero (Boca, club default) abre Finanzas directo en
  "Formato simplificado" (botón activo correcto, tabla con las categorías homologadas de siempre:
  Cuotas Sociales/Comercial/Estadio/Televisión/Premios/Abonos/Venta de Jugadores/catch-all), tocar
  "Formato del club" sigue llevando a las categorías nativas tal cual el documento (Racing:
  "Cobranzas por venta de entradas", etc.), y volver a alternar entre los 2 sigue funcionando para
  los 3 clubes. 0 errores de consola.


## Versión 81 — BOCA — SE SACARON LOS AÑOS PLACEHOLDER DE FINANZAS

Guido: "en boca, quita los anios palceholders de Fiannzas". En la misma sesión, Guido también hizo 2
preguntas sobre por qué la Deuda neta de Inicio se ve "rara" para Boca 2027 y para Racing en su
transición a Presupuesto — ver el detalle de esa investigación (sin cambios de código, solo lectura
de los documentos fuente) al principio de esta entrada, antes de la parte de Finanzas.

- **Por qué Boca no tiene Deuda en el Ejercicio 2027**: se leyó `Clubes/Argentina/Boca/presupuesto-26-27.md`
  (la transcripción ya existente) buscando "deuda"/"pasivo"/"patrimonial" — el Presupuesto Financiero
  (pág. 33-34) tiene una sola línea "DEUDAS A PAGAR EJERCICIO ANTERIOR" ($12.601.624.000, un dato de
  flujo de caja, no un balance patrimonial), pero el documento NO tiene ningún "Estado de Situación
  Patrimonial" con el desglose de Total Deudas + Caja y bancos que el sitio necesita para `grossDebt`/
  `cash` (eso solo existe en un balance auditado real, no en un presupuesto/proyección). Es
  estructural: cualquier presupuesto de cualquier club tendrá el mismo hueco, no es un dato que falte
  cargar, así que NO se agregó a `dudas-por-club.md` (no hay nada que preguntarle al club).
- **Por qué la Deuda de Racing "cae a 0" después de 2025**: se confirmó en `data/racing-data.js` que
  el Ejercicio 2026 (Presupuesto 2025/26) tiene `grossDebt:0, cash:0` a propósito, mismo motivo que
  Boca arriba (el documento de Racing para ese ejercicio también es un presupuesto, sin balance).
  32,2 M USD (2024/2025, balance real) -> 0,0 M USD (2025/2026, presupuesto) no es una caída real de
  deuda, es que ya no hay balance real para ese ejercicio todavía.
- **`dudas-por-club.md`, archivo nuevo**: a pedido de Guido ("la idea es hacer reach out a clubes y
  preguntarles, asi que tal vez por club deberiamos empezar a hacer una lista con dudas"), una lista
  de preguntas abiertas por club para escribirle directo al club — separada de `fuentes-por-club.md`
  (que es sobre DÓNDE está cada documento, no sobre qué preguntar). Documentado en `CLAUDE.md` para
  que la lea cualquier sesión futura. Vacía para Boca/Racing (las 2 dudas de esta sesión se
  resolvieron leyendo el documento, no hacía falta preguntarle a nadie).
- Boca, años placeholder: se sacaron 2018/2019/2021/2022/2023 de 3 lugares, TODOS específicos de
  Finanzas (`gestionesInfo` en `data/boca-data.js`, el array `years`/`gestionSelect.innerHTML` de
  `populateFinanzasSelectors` y el `allYears` de `updateFinanzasByAnio`, los 3 en
  `js/finanzas-render.js`) más el HTML estático de `#anioSelect`/`#gestionSelect`. `yearsRaw`
  (`data/boca-data.js`) NO se tocó — sigue con los 5 años completos. Motivo real encontrado
  PROBANDO EN EL NAVEGADOR (no evidente de antemano): `gestionesByClub.boca` (`data/clubs.js`), que
  alimenta Mercado de Pases/Resultados/Comparar Gestiones, todavía apunta a esos años para las
  gestiones "ameal"/"angelici" (`firstYear`/`lastYear` 2018-2023) — borrarlos de `yearsRaw` tiraba
  `TypeError: Cannot read properties of undefined (reading 'cuotasSociales')` en
  `computeYear()` apenas se abría "Comparar Gestiones". Como el pedido de Guido fue "de Finanzas"
  (no de todo el sitio), la solución quedó acotada: los 3 arrays de Finanzas pasaron a listas
  explícitas `[2024,2025,2026,2027]` (no `Object.keys(yearsRaw)`, que volvería a traer los 5 años
  placeholder ya que ese objeto los sigue teniendo), y `gestionesByClub.boca` quedó intacto para las
  otras 3 pestañas.
- Verificado en el navegador: `#anioSelect` de Finanzas para Boca muestra solo 4 opciones
  (2024-2027), `#gestionSelect` solo "Riquelme", "Comparar Gestiones"/Mercado de Pases/Resultados
  siguen mostrando las 3 gestiones de siempre sin errores, `verifyTieOuts()` sigue cerrando para
  Boca 2025/2027. 0 errores de consola.


## Versión 82 — CUARTO CLUB DEL SITIO — VÉLEZ SARSFIELD (EJERCICIO 2025)

Guido: "arranca hacer onboarding de un club que quieras". De los clubes ya investigados en la sesión
de `fuentes-por-club.md`, se eligió Vélez Sarsfield: el archivo más completo de los 27 investigados
(21 PDFs reales, balances 2015-2025 casi sin huecos) y con texto nativo extraíble en el ejercicio más
reciente (a diferencia de Boca/muchos años de Racing, que son escaneos).

- Fuente: `balance-general-2025.pdf` (Ejercicio N°115, 1°/7/2024 al 30/6/2025, 50 páginas, texto
  nativo, sin necesidad de OCR), descargado de velez.com.ar/elclubesdelossocios/memorias-estados-contables.
  Transcripción completa ANTES de extraer nada (ver CLAUDE.md) en
  `Clubes/Argentina/Velez Sarsfield/balance-general-2025.md`. SUPERÁVIT real: $36.833.752 ARS (vs.
  déficit de $(1.551.939.880) del ejercicio anterior). fx = $1.196 (declarado en el Anexo VI, mismo
  valor que declaró Racing para la misma fecha de cierre 30/06/2025).
- **Hallazgo estructural importante, no específico de Vélez**: el motor genérico (`computeYearGeneric`
  y varias funciones alrededor, pensadas originalmente "para cualquier club que no sea Boca") en
  realidad tenía ternarios hardcodeados a EXACTAMENTE `river`/`racing`, nunca se había probado con un
  3er club real. Se generalizaron a 3 ramas (`clubId === 'river' ? ... : clubId === 'racing' ? ... :
  velez...`) en: `yearMetaFor`, `presupuestoOverlayFor`, `computeYearGeneric`, `reportTypeForYear`,
  `allYearsRangeForClub` (`js/finanzas-calc.js`); `drawTrendChartGeneric` (ahora reusa
  `reportTypeForYear` en vez de repetir la lógica), `populateFinanzasSelectors`,
  `renderDataQualityBannerForCurrentSelection` (`js/finanzas-render.js`); `pasesDataForClub`/
  `resultadosDataForClub`/`titulosDataForClub` (`index.html`). Si se agrega un 5to club al motor
  genérico más adelante, revisar esta misma lista de funciones otra vez (probablemente haga falta
  otra ronda, no hay garantía de que esta haya sido exhaustiva la primera vez que un 3er club real
  las ejercitó).
- Categorización (`data/velez-data.js`, ver comentario de cabecera completo ahí): el Anexo III de
  Vélez desglosa CADA rubro de gasto en 6 columnas por sector (Fútbol Profesional / Amateur /
  Complejo Polideportivo / Enseñanza / Culturales / Otros Deportes) — a diferencia de Racing, que ya
  viene con una sola cifra por rubro. Para que "Salarios y primas (plantel y cuerpo técnico)" sea
  comparable con los otros clubes (solo el plantel profesional, no TODO el personal incluida la
  escuela del club), "Remuneraciones al personal" y "Cargas sociales" se separaron en 2 líneas cada
  una (columna Fútbol Profesional -> `wages_squad`; el resto de las 5 columnas ->
  `youth_other_sports_expense`). `grossDebt` = "Deudas" corriente+no corriente (NO "Total del
  Pasivo" completo, que incluye Ingresos anticipados/Previsiones) — mismo criterio que ya usa Boca,
  no el de Racing (que sí usa Total del Pasivo completo); cada club puede necesitar un criterio
  distinto según cómo estructura su propio balance, ver `.claude/skills/club-data-mapping/SKILL.md`.
- `data/clubs.js`: entrada nueva en `clubs{}` (country:'AR', mismo criterio que los otros 3),
  `sources{}` (`velez-balance-2024-25`), `gestionesByClub.velez` (una sola gestión, "Berlanga
  (2025-actual)" — NO se confirmó desde qué año exacto preside, ver `dudas-por-club.md`),
  `memberCountByClub.velez` (72.889, de Wikipedia). Lazy-loading: `CLUB_DATA_SCRIPT_SRC` +
  `<option value="velez">` nuevos en `index.html`, mismo mecanismo de siempre (Boca sigue siendo el
  único club cargado en el `<head>`).
- Mercado de Pases/Resultados deportivos/Títulos: `velezPasesData`/`velezResultadosData`/
  `velezTitulosData` quedaron VACÍOS a propósito (`[]`/`{}`/`[]`), no con placeholder inventado tipo
  "Jugador A" (a diferencia de cómo arrancaron Boca/River/Racing) — esta sesión se enfocó solo en
  Finanzas, y no tenía sentido inventar movimientos de pases falsos para un club que recién se
  agrega. Las 3 pestañas (+Comparar Gestiones) andan bien con esto vacío, verificado en el navegador.
- Verificado en el navegador: `verifyTieOuts()` nuevo (3 checks: Revenue, Expenses incl. no-efectivo,
  Resultado neto vs. Superávit) cierra exacto para Vélez 2025; Finanzas muestra Formato
  Simplificado/Formato del club correctos en USD y ARS; Inicio (Ingresos/Gastos apilados, Deuda) se
  ve igual que los otros 3 clubes, con la leyenda ordenada por magnitud del único ejercicio
  disponible; volver a Boca/Racing/River y de nuevo a Vélez no reintroduce ningún error; Comparar
  Gestiones/Mercado de Pases/Resultados de Boca (afectados de refilón por la Versión 81, ver esa
  entrada) siguen funcionando. 0 errores de consola en los 4 clubes.


## Versión 83 — COPY DE INICIO, GESTIÓN DE BERLANGA CONFIRMADA, Y CRITERIO NUEVO EN dudas-por-club.md

- Guido: quitar ", sin opinión" del título y subtítulo de Inicio. `<h1>` pasó de "Datos del club,
  sin opinión" a "Datos del club"; el `<p class="subtitle">` perdió la misma coletilla en las 2
  apariciones que tenía.
- Guido marcó que la pregunta "¿desde cuándo preside Berlanga?" (anotada en `dudas-por-club.md`
  durante el onboarding de Vélez, Versión 82) no ameritaba reach-out al club: se resuelve con una
  búsqueda simple. Confirmado: Fabián Berlanga fue electo el 12/11/2023 (nota oficial del club),
  mandato 2023-2026. `gestionesByClub.velez.berlanga.nombre` en `data/clubs.js` corregido de
  "Berlanga (2025-actual)" a "Berlanga (2023-actual)" — `firstYear`/`lastYear` sin cambios (siguen
  siendo el rango de EJERCICIOS CARGADOS, no la fecha de asunción; ver comentario actualizado ahí).
  `dudas-por-club.md` actualizado: la pregunta de gestión se sacó de "pendiente" (quedó una nota
  corta de cómo se resolvió), la de "Uso del estadio" sigue abierta sin cambios.
- Criterio nuevo agregado a la intro de `dudas-por-club.md` (a pedido de Guido, para que quede
  documentado y no se repita el mismo caso): antes de anotar una pregunta ahí, buscar primero si es
  un dato público fácilmente verificable (Wikipedia, nota de prensa del club) — eso NO es material
  para reach-out directo al club. Se evaluó armar un skill nuevo para esto y se descartó: el
  criterio vive mejor como una regla corta en la intro del propio archivo que gobierna, no como un
  documento separado que hay que mantener sincronizado con este. Guido aclaró que el costo de
  sobre-anotar preguntas ahí es bajo (prefiere descartar él una de más a perder una real), así que
  la regla nueva es solo "buscar antes de anotar", no "anotar menos".


## Versión 84 — VÉLEZ SARSFIELD — SEGUNDO EJERCICIO (2023/2024)

Guido: "continua con otro anio de velez". Se eligió el ejercicio inmediato anterior al ya cargado
(N°114, 1°/7/2023 al 30/6/2024) — el archivo público del club tiene PDFs de 2015 a 2024 (ver
`fuentes-por-club.md`), así que se sigue hacia atrás en orden.

- Fuente: `balance-general-2024.pdf` (48 páginas, texto nativo, sin OCR), mismo archivo
  institucional que el Ejercicio 2025. Transcripción completa ANTES de extraer nada (ver
  CLAUDE.md) en `Clubes/Argentina/Velez Sarsfield/balance-general-2024.md`. DÉFICIT real:
  $(1.113.139.098) ARS (vs. superávit de $36.833.752 del ejercicio siguiente). fx = $909
  (declarado en el Anexo VI para USD al 30/06/2024).
- Categorización (`data/velez-data.js`): mismo criterio que 2025 en todo — Anexo III se separa por
  columna Fútbol Profesional (`wages_squad`) vs. el resto (`youth_other_sports_expense`) para
  Remuneraciones/Cargas sociales; "Primas y premios" se carga completa en `wages_squad` (99,94% ya
  es Fútbol Profesional); Anexo IV completo a `admin_general_expense`; "Costo de desarrollo de
  jugadores propios" es un crédito a `player_amortisation` que compensa EXACTO la columna Amateur
  del Anexo III (confirmado con la suma: la columna Amateur da $0 neto en el total impreso de este
  ejercicio). Dos líneas nuevas que no existían en el Anexo III/IV de 2025 ("Cargo por retenciones
  y percepciones Decreto 510/2023", "Publicidad y propaganda") se categorizaron a
  `admin_general_expense` por ser cargos tributarios/administrativos, no salariales — mismo
  criterio que el resto de sus respectivos anexos.
- `data/clubs.js`: nueva entrada en `sources{}` (`velez-balance-2023-24`);
  `gestionesByClub.velez.berlanga.firstYear` ampliado de 2025 a 2024 (el ejercicio cae bajo la
  gestión de Berlanga, que asumió en noviembre 2023, a mitad de este ejercicio).
- Verificado en el navegador: `verifyTieOuts()` ampliado con 3 checks nuevos para 2024 (Revenue,
  Expenses incl. no-efectivo, Resultado neto vs. Déficit) — los 6 checks de Vélez (2024+2025)
  cierran exacto. Finanzas muestra "2023/2024 (Balance)" en el selector de año, Formato
  Simplificado/Formato del club correctos en USD y ARS. Inicio (Ingresos/Gastos apilados, Deuda)
  ahora muestra 2 columnas reales para Vélez en vez de 1. Cero errores de consola ciclando por los
  4 clubes (racing→river→boca→velez).


## Versión 85 — VÉLEZ SARSFIELD — TERCER EJERCICIO (2021/2022), Y UN AÑO SALTEADO A PROPÓSITO

Guido: "continua con otro anio de velez". El ejercicio inmediato anterior (N°113, 2022/2023) resultó
ser un PDF ESCANEADO sin capa de texto (`pdffonts`/`pdftotext` vacíos) — a diferencia de 2024/2025,
transcribirlo requiere renderizar 48 páginas como imágenes con el Read tool (caro en tokens, gotcha
ya documentado en CLAUDE.md). Antes de asumir ese costo se chequeó el resto del archivo: 2018-2022
tienen texto nativo, 2015-2017 y 2023 son escaneos. Se decidió seguir con el año de texto nativo más
reciente disponible (2022, Ejercicio N°112) y dejar 2023 documentado como pendiente en
`fuentes-por-club.md`/comentario de `data/velez-data.js`, en vez de saltarlo en silencio.

- Fuente: `balance-general-2022.pdf` (48 páginas, texto nativo, sin OCR). Transcripción completa
  ANTES de extraer nada (ver CLAUDE.md) en `Clubes/Argentina/Velez Sarsfield/balance-general-2022.md`.
  SUPERÁVIT real: $1.216.670.585 ARS. fx = $125,03 (declarado en el Anexo VI para USD al 30/06/2022).
- Cambio de gestión: este ejercicio NO es de Berlanga — el balance está firmado por "Sr. Sergio D.
  Rapisarda, Presidente". Confirmado por búsqueda: Rapisarda asumió por primera vez en noviembre
  2017, fue reelecto en marzo 2021, y se tomó licencia en julio 2023 tras la agresión de barras bravas
  (dando paso, meses después, a la elección de Berlanga en noviembre 2023). Nueva entrada
  `gestionesByClub.velez.rapisarda` (`data/clubs.js`), `nombre:'Rapisarda (2017-2023)'`.
- Categorización (`data/velez-data.js`): mismo criterio que 2024/2025 en todo — Anexo III separado
  por columna Fútbol Profesional vs. el resto para Remuneraciones/Cargas sociales; "Primas y
  premios" completa en `wages_squad` (99,94% ya es Fútbol Profesional); "Costo de desarrollo de
  jugadores propios" es el crédito de siempre a `player_amortisation`, compensa exacto la columna
  Amateur del Anexo III (confirmado con la suma). Una línea con nombre distinto al de 2024/2025
  ("Cargo por retenciones y percepciones Decreto 1212/2003" en vez de "Decreto 510/2023") pero
  mismo criterio: cargo tributario 100% Fútbol Profesional -> `admin_general_expense`. Este balance
  también tiene RECPAM en Resultados financieros y por tenencia (Nota 5.b) — confirma que la
  reexpresión por inflación ya se aplicaba en este ejercicio, no es algo nuevo de 2024/2025.
- `data/clubs.js`: nueva entrada en `sources{}` (`velez-balance-2021-22`), que además documenta el
  hallazgo del PDF escaneado de 2023 para que quede registrado ahí también, no solo en
  `fuentes-por-club.md`.
- Verificado en el navegador: `verifyTieOuts()` ampliado con 3 checks nuevos para 2022 — los 9
  checks de Vélez (2022+2024+2025) cierran exacto. Finanzas muestra "2021/2022 (Balance)" y las 2
  gestiones ("Berlanga (2023-actual)", "Rapisarda (2017-2023)") en sus selectores. Inicio muestra 3
  columnas reales (2022, 2024, 2025) con 2023 en blanco con el texto diagonal "No informado por el
  club" en el medio, sin saltear el año — comportamiento esperado para un hueco real en los datos.
  Cero errores de consola ciclando por los 4 clubes (racing→river→boca→velez).


## Versión 86 — VÉLEZ SARSFIELD — CUARTO EJERCICIO (2020/2021)

Guido: "continua con otro anio de velez" (mismo pedido, tercera vez). Se siguió hacia atrás desde
2022: el Ejercicio N°111 (1°/7/2020 al 30/6/2021) también tiene texto nativo (confirmado antes de
transcribir, mismo chequeo preventivo de la Versión 85).

- Fuente: `balance-general-2021.pdf` (46 páginas, texto nativo, sin OCR). Transcripción completa
  ANTES de extraer nada (ver CLAUDE.md) en `Clubes/Argentina/Velez Sarsfield/balance-general-2021.md`.
  DÉFICIT real: $(753.625.872) ARS. fx = $95,52 (declarado en el Anexo VI para USD al 30/06/2021).
  Sigue siendo la gestión de Sergio Rapisarda (mismo presidente que el Ejercicio 2022) —
  `gestionesByClub.velez.rapisarda.firstYear` ampliado de 2022 a 2021.
- Categorización (`data/velez-data.js`): mismo criterio que los 3 ejercicios anteriores en todo.
  Una particularidad de este ejercicio: incluye "Subsidio A.T.P." ($91.966.749 M) en Anexo II — un
  subsidio estatal COVID (Programa de Asistencia de Emergencia al Trabajo y la Producción, vigente
  2020-2021), categorizado como `other_income` (mismo criterio que "Subsidios estatales a la
  educación", no hay categoría específica para esto). También tiene una línea "Publicidad
  (sectores)" en el Anexo III que no existe en ningún otro ejercicio ya cargado — distinta de
  "Publicidad y propaganda" del Anexo IV (esa es de administración, esta es gasto por sector) — pero
  mismo criterio de fondo: costo de marketing -> `admin_general_expense`. RECPAM presente de nuevo en
  Resultados financieros y por tenencia (Nota 5.b), confirma que la reexpresión por inflación no es
  algo que empezara en 2022.
- Bug encontrado y corregido ANTES de dar por buena la carga: la primera versión de
  `expenseLinesByYear[2021]` omitía la línea "Becas" (youth_other_sports_expense, $1.020.112 M) que
  sí estaba contemplada en el cálculo manual de verificación — el olvido lo detectó
  `verifyTieOuts()` con una diferencia de exactamente $1,02 M en Expenses/Resultado neto. Corregido
  agregando la línea faltante; volvió a cerrar exacto. Se documenta acá porque es el tipo de error
  que `verifyTieOuts()` está para atrapar (y lo atrapó), no para esconder que pasó.
- `data/clubs.js`: nueva entrada en `sources{}` (`velez-balance-2020-21`).
- Verificado en el navegador: `verifyTieOuts()` ampliado con 3 checks nuevos para 2021 — los 12
  checks de Vélez (2021+2022+2024+2025) cierran exacto. Finanzas muestra "2020/2021 (Balance)".
  Inicio muestra 4 columnas reales (2021, 2022, 2024, 2025) con 2023 en blanco en el medio, sin
  saltear ningún año. Cero errores de consola ciclando por los 4 clubes (racing→river→boca→velez).


## Versión 87 — VÉLEZ SARSFIELD — QUINTO EJERCICIO (2019/2020, EJERCICIO DE PANDEMIA)

Guido: "continua con otro anio de velez" (cuarta vez). Se siguió hacia atrás desde 2021: el
Ejercicio N°110 (1°/7/2019 al 30/6/2020) también tiene texto nativo.

- Fuente: `balance-general-2020.pdf` (45 páginas, texto nativo, sin OCR). Transcripción completa
  ANTES de extraer nada (ver CLAUDE.md) en `Clubes/Argentina/Velez Sarsfield/balance-general-2020.md`.
  DÉFICIT real: $(145.019.616) ARS. fx = $70,26 (declarado en el Anexo VI para USD al 30/06/2020).
  Sigue siendo la gestión de Rapisarda — `gestionesByClub.velez.rapisarda.firstYear` ampliado de
  2021 a 2020.
- Categorización (`data/velez-data.js`): mismo criterio que los 4 ejercicios anteriores. Este
  ejercicio (cierre 30/6/2020, en plena pandemia) también tiene "Subsidio A.T.P." en Anexo II
  (mismo criterio que 2021: `other_income`). Particularidad propia: la Nota 5.a (Amortizaciones)
  trae una línea de crédito "Regularización valuación Plantel Profesional de fútbol ejercicio 2015"
  ($768.676, reduce el costo de amortización de plantel de ESTE ejercicio) — se cargó como una
  segunda línea `player_amortisation` en positivo, separada de la amortización real, en vez de
  netearla contra esta para no perder el detalle de qué es costo real y qué es un ajuste retroactivo.
  "Pérdida por baja jugadores profesionales" es $0 este ejercicio (hubo en 2019) — no se cargó línea
  en $0, mismo criterio que "Uso del estadio" en 2021 (no cargar líneas en cero).
- `data/clubs.js`: nueva entrada en `sources{}` (`velez-balance-2019-20`).
- Verificado en el navegador: `verifyTieOuts()` ampliado con 3 checks nuevos para 2020 — los 15
  checks de Vélez (2020+2021+2022+2024+2025) cerraron exacto en el primer intento (sin el bug de
  Becas de la Versión 86, esta vez el cálculo manual y la carga coincidieron desde el principio).
  Finanzas muestra "2019/2020 (Balance)". Inicio muestra 5 columnas reales (2020-2022, 2024-2025)
  con 2023 como único hueco en blanco, sin saltear ningún año. Cero errores de consola ciclando por
  los 4 clubes (racing→river→boca→velez).


## Versión 88 — VÉLEZ SARSFIELD — SEXTO EJERCICIO (2018/2019)

Guido: "continua con otro anio de velez" (quinta vez). Se siguió hacia atrás desde 2020: el
Ejercicio N°109 (1°/7/2018 al 30/6/2019) también tiene texto nativo.

- Fuente: `balance-general-2019.pdf` (42 páginas, texto nativo, sin OCR). Transcripción completa
  ANTES de extraer nada (ver CLAUDE.md) en `Clubes/Argentina/Velez Sarsfield/balance-general-2019.md`.
  SUPERÁVIT real: $370.018.627 ARS. fx = $42,263 (declarado en el Anexo VI para USD al 30/06/2019).
  Este ejercicio cae dentro de la PRIMERA gestión de Rapisarda (asumió noviembre 2017) —
  `gestionesByClub.velez.rapisarda.firstYear` ampliado de 2020 a 2019.
- Categorización (`data/velez-data.js`): mismo criterio que los 5 ejercicios anteriores. Dos
  líneas nuevas no vistas en ejercicios posteriores: "Subvención a otras entidades" (donación del
  club a terceros, Anexo III, monto ínfimo $49.305) -> `other_expenses`, mismo criterio catch-all
  que "Varios"; y otra "Regularización valuación Plantel Profesional de fútbol ejercicio 2015" en
  Amortizaciones (crédito +$3.948.609, mismo tipo de ajuste retroactivo que apareció en 2020) ->
  `player_amortisation`, separada de la amortización real.
- `data/clubs.js`: nueva entrada en `sources{}` (`velez-balance-2018-19`).
- Verificado en el navegador: `verifyTieOuts()` ampliado con 3 checks nuevos para 2019 — los 18
  checks de Vélez (2019-2022+2024-2025) cierran exacto. Finanzas muestra "2018/2019 (Balance)".
  Inicio muestra 6 columnas reales (2018-2022, 2024-2025) con 2023 como único hueco en blanco, sin
  saltear ningún año. Cero errores de consola ciclando por los 4 clubes (racing→river→boca→velez).
  Próximo candidato natural para una sesión futura: Ejercicio 2018 (N°108), ya confirmado con texto
  nativo (~137.000 caracteres vía pdftotext) pero todavía sin transcribir ni cargar.


## Versión 89 — VÉLEZ SARSFIELD — SÉPTIMO EJERCICIO (2017/2018)

Guido: "continua con otro anio de velez" (sexta vez). Ejercicio N°108 (1°/7/2017 al 30/6/2018),
texto nativo, mismo flujo que los anteriores.

- Fuente: `balance-general-2018.pdf` (42 páginas). Transcripción completa en
  `Clubes/Argentina/Velez Sarsfield/balance-general-2018.md`. SUPERÁVIT real: $342.815.648 ARS. fx
  = $28,75. Cae en la primera gestión de Rapisarda (asumió noviembre 2017, a mitad de este
  ejercicio) — `gestionesByClub.velez.rapisarda.firstYear` ampliado de 2019 a 2018.
- Particularidad: este es el ÚLTIMO ejercicio antes de que la FACPCE empezara a considerar a la
  Argentina economía de alta inflación (desde el 1°/7/2018) — no tiene línea de RECPAM en
  Resultados financieros, a diferencia de todos los ejercicios posteriores. No es un olvido de
  carga, el propio balance no la incluye. Dos líneas nuevas puntuales: "Subvención a otras
  entidades" (Anexo III, other_expenses) e "Invitaciones a partidos" ($0 este ejercicio, no
  cargada).
- `data/clubs.js`: nueva entrada `velez-balance-2017-18`.
- Verificado: `verifyTieOuts()` con 3 checks nuevos para 2018, los 21 checks de Vélez cierran
  exacto. Cero errores de consola.


## Versión 90 — VÉLEZ SARSFIELD — OCTAVO EJERCICIO (2022/2023), CARGADO VÍA OCR

Guido: "haz todos los anios de velez que quedan" — pedido explícito de completar TODO lo que
faltaba, no solo el siguiente año de texto nativo. El único año que quedaba entre los ya cargados
era el N°113 (2022/2023), que resultó ser un PDF escaneado sin capa de texto.

- En vez de renderizar 48 páginas como imágenes con el Read tool (el único método que documentaba
  el gotcha de CLAUDE.md, caro en tokens), se instaló Tesseract vía Homebrew
  (`brew install tesseract tesseract-lang`, incluye español) y se generó una transcripción completa
  con `pdftoppm -png -r 300` + `tesseract --psm 6 -l spa` página por página. Una prueba puntual en
  una página nativa confirmó que el OCR de tablas numéricas es muy confiable (la tabla salió
  prácticamente perfecta) — mucho más barato que el enfoque de imagen-por-imagen. Varias páginas
  con tablas anchas (Anexo II/III, 6+ columnas) venían ROTADAS 90° en el escaneo original y salían
  ilegibles sin corregir la rotación antes del OCR — se detectó al ver texto basura en esas páginas
  puntuales, se re-rotaron con PIL (`rotate(-90, expand=True)`) y el OCR salió limpio.
  Transcripción completa en `Clubes/Argentina/Velez Sarsfield/balance-general-2023.md` (con nota
  aclarando que es OCR, no transcripción de texto nativo, y que los números se verifican aparte).
- Fuente: `balance-general-2023.pdf` (48 páginas). SUPERÁVIT real: $522.234.138 ARS. fx = $256,30.
  Firmado por el Vicepresidente 1° (no Rapisarda, que recién se tomó licencia en julio 2023,
  después del cierre de este ejercicio) — el ejercicio en sí transcurrió íntegro bajo su
  presidencia, `gestionesByClub.velez.rapisarda.lastYear` ampliado de 2022 a 2023.
- Precisión: los números categorizados se verificaron con 2 sumas manuales independientes del
  Anexo III (detalle línea por línea, y por separado el cruce con la columna Amateur = $0 neto)
  antes de cargarlos — no alcanza con "así lo leyó el OCR", mismo estándar que cualquier otro
  ejercicio (ver CLAUDE.md). Ambas dieron exacto el total impreso ($10.413.869.311).
- `data/clubs.js`: nueva entrada `velez-balance-2022-23`, con nota explicando el método OCR.
- Verificado en el navegador: `verifyTieOuts()` con 3 checks nuevos para 2023 — los 24 checks de
  Vélez (2018-2022, 2024-2025 completos consecutivos) cierran exacto. Finanzas muestra
  "2022/2023 (Balance)". Inicio muestra 8 columnas reales SEGUIDAS (2017/2018 a 2024/2025), sin
  ningún hueco — primera vez que Vélez no tiene ni un año en blanco en el rango cargado. Cero
  errores de consola ciclando por los 4 clubes.
- Pendiente real ahora: solo 2015-2017 (confirmado escaneos también, mismo flujo OCR que 2023 —
  render + OCR de las 3 PDFs ya está en curso al momento de escribir esto).


## Versión 91 — VÉLEZ SARSFIELD — NOVENO EJERCICIO (2014/2015), VÍA OCR

Ejercicio N°105 (1°/7/2014 al 30/6/2015), primero de los 3 restantes (2015-2017). PDF de tamaño de
página reducido (178x252pt, la mitad de A4 aprox.) — el OCR a 450dpi salió con más ruido que 2023
en varias filas del Anexo III (columnas intermedias con dígitos sueltos mal leídos), pero el
FLUJO DE VERIFICACIÓN cambió para compensarlo: en vez de reconstruir cada línea sumando sus 6
columnas de sector, se usa directamente el valor impreso de la columna "Total <año>" de cada fila
(mucho más legible que las columnas angostas intermedias), y se exige que la SUMA de esas columnas
Total cierre exacta contra el total impreso del Anexo — no alcanza con que una fila suelta "se vea
razonable". Encontró y corrigió varios dígitos mal leídos en el camino (ej. "Seguridad y
vigilancia" FP leído como 1.088.197, corregido a 7.088.197 al no cerrar el checksum de esa fila).

- Fuente: `balance-general-2015.pdf` (37 páginas). Transcripción en
  `Clubes/Argentina/Velez Sarsfield/balance-general-2015.md`. DÉFICIT real: $(36.195.305) ARS. fx =
  $8,988 (Anexo VI, previo a la devaluación de diciembre 2015).
- Gestión: NO es Rapisarda ni Berlanga — el balance está firmado por Raúl H. Gámez, presidente en 3
  mandatos no consecutivos (1996-1999, 2002-2005, 2014-2017 según búsqueda); este ejercicio cae en
  su 3er mandato. Nueva entrada `gestionesByClub.velez.gamez`.
- **Bug real encontrado (no de OCR)**: al cargar este ejercicio, `verifyTieOuts()` marcó una
  diferencia de ~$35M en el check de "Expenses" que no cerraba ajustando ningún dato. Investigado:
  el propio check (`Math.abs(expenses) + Math.abs(nonCash)`) da un resultado distinto de
  `Math.abs(expenses + nonCash)` cuando `nonCash` neto es POSITIVO — y en 2015, la amortización real
  de plantel ($34,0M) es MENOR al crédito de "reclasificación" de ese ejercicio ($54,3M) más los 2
  créditos de regularización, algo que nunca había pasado en ningún club/ejercicio cargado. Corregida
  la fórmula (matemáticamente equivalente cuando nonCash ya era negativo, así que no rompió ningún
  check previo) en TODOS los checks de `verifyTieOuts()`, no solo Vélez — ver también la corrección
  aplicada retroactivamente a 2017 en la Versión 92.
- `data/clubs.js`: nueva entrada `velez-balance-2014-15`, con nota sobre el tamaño de página
  reducido y el criterio de verificación fila-por-fila.
- Verificado: los 27 checks de Vélez (2015+2018-2025) cierran exacto tras la corrección de fórmula.


## Versión 92 — VÉLEZ SARSFIELD — DÉCIMO EJERCICIO (2016/2017), VÍA OCR

Ejercicio N°107 (1°/7/2016 al 30/6/2017), PDF A4 estándar (mismo tamaño que 2023). Casi todas las
filas del Anexo II/III/IV cerraron su checksum interno exacto contra el total impreso; el total
del Anexo III y de GASTOS ORDINARIOS del ejercicio cerraron con una diferencia de $40 (0,00001% del
total) — ruido de OCR irrelevante, muy por debajo de la tolerancia de `verifyTieOuts()`.

- Fuente: `balance-general-2017.pdf` (37 páginas). Transcripción en
  `Clubes/Argentina/Velez Sarsfield/balance-general-2017.md`. DÉFICIT real: $(73.534.953) ARS
  (fx = $16,53). Sigue siendo la 3ra gestión de Gámez (2014-2017), su último ejercicio antes de que
  asumiera Rapisarda en noviembre 2017 — `gestionesByClub.velez.gamez.lastYear` ampliado a 2017.
- `data/clubs.js`: nueva entrada `velez-balance-2016-17`.
- Verificado: los 30 checks de Vélez (2015+2017-2025) cierran exacto (con la fórmula de
  `verifyTieOuts()` ya corregida en la Versión 91).


## Versión 93 — VÉLEZ SARSFIELD — UNDÉCIMO EJERCICIO (2015/2016), VÍA OCR — RANGO COMPLETO SIN HUECOS

Ejercicio N°106 (1°/7/2015 al 30/6/2016), el único que quedaba entre 2015 y 2018. TODAS las filas
del Anexo II/III/IV cerraron su checksum interno EXACTO contra el total impreso, sin ruido — y como
bonus, la columna comparativa "2015" de este mismo balance confirmó, de forma completamente
independiente, cada cifra ya cargada para el Ejercicio 2015 en la Versión 91 (mismo Total 2015 en
Cuotas de asociados, Remuneraciones, Primas y premios, Anexo IV completo, etc. — ninguna diferencia).

- Fuente: `balance-general-2016.pdf` (40 páginas). Transcripción en
  `Clubes/Argentina/Velez Sarsfield/balance-general-2016.md`. SUPERÁVIT real: $66.227.589 ARS
  (fx = $14,94). Última gestión de Gámez cargada (2014-2017).
- `data/clubs.js`: nueva entrada `velez-balance-2015-16`.
- **RESULTADO FINAL DE ESTA SESIÓN PARA VÉLEZ**: 11 ejercicios consecutivos cargados sin ningún
  hueco, 2014/2015 a 2024/2025 (2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025).
  Verificado en el navegador: `verifyTieOuts()` da 78 checks totales entre los 4 clubes (33 de
  Vélez, 11 años × 3), 0 errores. Finanzas muestra los 11 años en el selector, las 3 gestiones
  (Gámez 2014-2017, Rapisarda 2017-2023, Berlanga 2023-actual) en el selector de gestión. Inicio
  muestra las 11 columnas reales seguidas, sin ningún hueco en blanco por primera vez desde que
  Vélez se agregó al sitio. Cero errores de consola ciclando por los 4 clubes.


## Versión 94 — QUINTO CLUB DEL SITIO — INSTITUTO ATLÉTICO CENTRAL CÓRDOBA

Guido: "do more onboarding of clubs or years. also, update the Tab Fuente" — primer club nuevo
agregado desde Vélez (Versión 82). Se leyó `fuentes-por-club.md` y se comparó contra
`data/*-data.js`: de los 11 clubes con al menos un balance/memoria real ya descargado (investigación
de la Versión 75), solo Boca/River/Racing/Vélez estaban cargados. Se eligió Instituto como el
siguiente candidato: es el archivo más chico y 100% texto nativo (17+3+4+6=30 páginas en 4 PDFs,
ninguno escaneado), permitiendo onboardear un club completo con datos reales de punta a punta en
una sola sesión sin necesitar OCR.

- Fuente: `balance-general-2023-2024.pdf` (17 páginas, texto nativo), Ejercicio N°70 (1°/7/2023 al
  30/6/2024). Transcripción completa en `Clubes/Argentina/Instituto/balance-general-2023-2024.md`
  (pdftotext -layout + Python, página por página). SUPERÁVIT FINAL real: $1.830.503.804 ARS.
- Categorización (`data/instituto-data.js`, ver comentario de cabecera completo ahí): el Anexo V
  ("Gastos Específicos de Sectores") desglosa la fila "Remuneraciones y cargas" por 6 columnas de
  sector (Fútbol/Básquet/La Agustina/Sede/Colegio/Tienda) — mismo mecanismo de columna-por-sector
  que el Anexo III de Vélez (club-data-mapping/SKILL.md sección 14): columna Fútbol Profesional
  (2.501,512775 M) → `wages_squad`, resto de columnas sumadas (1.435,840818 M) →
  `youth_other_sports_expense`. El resto de filas del Anexo V (Honorarios, Diversos, Mantenimiento,
  etc.) no tienen desglose salarial, se cargaron con su columna Total, categorizadas por naturaleza.
  "Comisiones y acuerdos de rescisión" (rubro de pases, 3.284,765346 M) se dejó en `other_expenses`,
  no en `player_amortisation`, siguiendo el precedente de Racing (Boca tampoco mezcla comisiones de
  compraventa en "Compra de jugadores"). Todas las categorías usadas ya existían en
  `category-map.js`, no hizo falta agregar ninguna nueva.
- No hay Anexo de moneda extranjera en este balance (a diferencia de Boca/Racing/Vélez, que sí
  declaran su propio tipo de cambio de cierre): se usó $909, el dólar mayorista de cierre al
  30/6/2024 ya confirmado en esta misma sesión de trabajo (Racing y Vélez 2023/24 cierran la misma
  fecha y declaran ese mismo valor en su propio Anexo VI).
- `grossDebt`: el Estado de Situación Patrimonial de Instituto no separa una línea "Deudas" limpia
  de otro pasivo (a diferencia de Boca/Vélez), pero sí tiene una "Previsión juicios" (pasivo
  contingente por causas judiciales) que no es deuda financiera real — se excluyó del cálculo, mismo
  espíritu que excluir Previsiones en Boca/Vélez: grossDebt = Total del Pasivo (3.336,889854) -
  Previsión juicios (572,519961) = 2.764,369893 M.
- Gestión: Juan Manuel Cavagliatto ("Juntos por Instituto"), electo 4/5/2021 y reelecto para el
  período 2022-2025 (confirmado por búsqueda, institutoacc.com.ar), cubre la totalidad del ejercicio
  cargado. 30.000 socios (institutoacc.com.ar/index.php/somos-30-mil-socios-y-socias/).
- Arquitectura: mismo patrón que Vélez, un club nuevo obliga a sumar una rama más a los mismos
  ternarios (`yearMetaFor`, `computeYearGeneric` ×3, `reportTypeForYear`, `allYearsRangeForClub` en
  `js/finanzas-calc.js`; `drawTrendChartGeneric`, `populateFinanzasSelectors` en
  `js/finanzas-render.js`; `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub` en
  `index.html`) — se hizo un grep de todo `'velez'` en los 3 archivos para no dejar ninguno afuera
  (mismo criterio que documenta `club-or-year-onboarding/SKILL.md` sección 2), no se encontró
  ninguno nuevo que el skill no hubiera anticipado ya.
- `data/clubs.js`: nueva entrada en `clubs{}`, `sources{}` (`instituto-balance-2023-24`),
  `gestionesByClub.instituto` (`cavagliatto`), `memberCountByClub.instituto` (30000).
- Mercado de Pases/Resultados deportivos/Títulos quedaron vacíos a propósito (mismo criterio que
  Vélez), esta sesión se enfocó solo en Finanzas.
- El archivo del club también trae un Presupuesto 2025 + premisas (transcriptos a
  `Clubes/Argentina/Instituto/presupuesto-2025.md`/`presupuesto-2025-premisas.md`), pero
  presupuestan por AÑO CALENDARIO (ene-25 a dic-25, cash-flow mensual para AFA/LPF) en vez de por
  ejercicio económico (jul-jun) — NO se cargó, queda como to-do explícito decidir el modelo de datos
  antes de forzarlo al mismo esquema `year` que usa el balance.
- Verificado en el navegador: `verifyTieOuts()` da 3 checks nuevos de Instituto (Revenue, Expenses
  incl. no-efectivo, PAT vs. Superávit final), 0 errores — y una corrida completa ciclando por los 5
  clubes (racing→river→boca→velez→instituto) da 81 checks totales, 0 errores, sin regresiones.
  "Formato del club" y "Formato simplificado" verificados visualmente en el navegador (screenshot),
  ningún bucket en $0 inesperado.
- Pestaña Fuentes (`#fuentes`): el párrafo "Calidad de dato por club" estaba desactualizado desde
  que se agregó Vélez (todavía decía "el sitio cubre más de un club" mencionando solo Boca/Racing/
  River) — reescrito para reflejar el estado real de los 5 clubes, con Vélez e Instituto incluidos.
- `fuentes-por-club.md`: sección de Instituto actualizada para decir explícitamente qué está
  cargado (antes solo listaba los 4 PDFs sin aclarar que el balance ya estaba en el sitio).


## Versión 95 — ONBOARDING MASIVO — 6 CLUBES NUEVOS, DE 5 A 11 CLUBES DEL SITIO

Guido: "i want to onboard all pdfs we have, and then we address all your questions. take note of
all questions. after you finish with all available pdfs, ill ask you 'what open questions do we
have?'" — pedido explícito de exhaustividad total, con la instrucción específica de NO pausar a
preguntar cada duda puntual sino anotarla y seguir. Se revisó CADA PDF de los 9 clubes que tenían
archivo descargado sin cargar (identificados en la Versión 75, ver `fuentes-por-club.md`).

RESULTADO: 6 de los 9 clubes tenían datos financieros reales usables, todos cargados:

- **Rosario Central** (6to club): Ejercicio 2023, balance auditado texto nativo, Anexo V/VI muy
  granular (19x8 filas/columnas en Recursos, 38x13 en Gastos). Se encontró y corrigió un error de
  lectura de $201.178.171 (fila "Préstamos" desalineada por el layout de pdftotext en una tabla muy
  ancha) verificando la suma contra el total impreso — ver club-data-mapping/SKILL.md sección 6.
- **Independiente** (7mo club): Ejercicio 2024, balance auditado texto nativo, Anexo D (Fútbol
  Profesional) desglosado por naturaleza del rubro, Anexo V por departamento para el resto.
- **Argentinos Juniors** (8vo club): 5 ejercicios (2015-2019) desde una presentación de asamblea de
  2 páginas con el comparativo de los 5 a la vez — el archivo "balance-2018-2019.pdf" del club,
  pese al nombre, resultó ser la Memoria narrativa completa sin una sola cifra contable. Cargado a
  nivel agregado (4 categorías), no el detalle por rubro que tendría un balance completo con Anexos.
  FX de cada año investigado externamente (datos.gob.ar/series, dólar BNA vendedor de cierre).
- **Estudiantes de La Plata** (9no club): 3 ejercicios consecutivos (2022-2024), balances auditados
  texto nativo, Anexo V/VI con columna-por-sector (acá el fútbol se separa en "Plantel profesional"
  vs. "Exhibición y espectáculos", distinto nombre que Vélez/Instituto pero mismo criterio de fondo).
  Ejercicio 2024 con salto grande (SUPERÁVIT $9.565.538.179 ARS) por una venta de pases importante.
- **San Lorenzo** (10mo club): 2 ejercicios consecutivos (2013-2014), balances auditados texto
  nativo con bastantes typos de imprenta del propio documento (comas en vez de puntos como separador
  de miles) — confirmado como error tipográfico, no de transcripción, verificando que la suma de las
  partes da el total impreso con el separador corregido. Encontrada y descartada una fila
  ("Transporte") que en realidad era un subtotal de página, no un gasto real.
- **Unión** (11vo club): Ejercicio 2025 (N°119), el primer PDF de esta sesión genuinamente MIXTO —
  páginas 1-35 (Memoria) con texto nativo, páginas 36-54 (Estados Contables reales) escaneadas sin
  capa de texto dentro del MISMO archivo. Se detectó con un script que mide caracteres extraídos por
  página (0 en pág. 36-54), se transcribió esa porción vía OCR (Tesseract, varias páginas rotadas
  90°) y se fusionó con la porción nativa en un único .md. El Anexo de Gastos no separaba limpiamente
  sus columnas de departamento en el OCR — se cargó con desglose confiable solo lo verificable por
  checksum exacto (Sueldos de fútbol, Amortizaciones), el resto a nivel agregado.

Los otros 3 clubes se revisaron a fondo y NO tienen datos cargables, confirmado por el CONTENIDO
completo (no solo el nombre del archivo):
- **Gimnasia y Esgrima LP**: 4 documentos, 2 de ellos literalmente llamados "memoria-y-balance", los
  4 son reportes narrativos/institucionales (106-135 páginas) sin una sola fila de Estado de
  Recursos y Gastos ni de Situación Patrimonial.
- **Talleres**: 1 documento, reporte infográfico (porcentajes de composición + gráficos de barras
  acumulados multi-año), no un Estado de Recursos y Gastos de un ejercicio puntual con cifras
  absolutas — reconstruir valores desde los porcentajes hubiera sido inventar, no transcribir.
- **Belgrano**: 2 documentos, "Memoria Anual" puramente narrativa (socios, filiales, deportivo), sin
  ninguna cifra contable ni siquiera resumida.

REFACTOR DE ARQUITECTURA (Guido no lo pidió explícitamente, pero se volvió necesario a mitad de
sesión): con 6 clubes nuevos sumándose en la misma sesión, extender a mano los ternarios `clubId ===
'river' ? ... : clubId === 'racing' ? ... : ...` en 8 lugares (`js/finanzas-calc.js` x5,
`js/finanzas-render.js` x2, `index.html` x3) por cada club nuevo dejó de escalar — alto riesgo de
olvidarse un lugar (exactamente lo que ya advertía club-or-year-onboarding/SKILL.md sección 2, Versión
82). Se reemplazó por un registro (`window.CLUB_GENERIC_DATA[clubId] = {...}`, cada
`data/<club>-data.js` se anota a sí mismo al final del archivo) — agregar un club nuevo de acá en más
solo toca su propio archivo de datos, nunca más `js/finanzas-calc.js`/`js/finanzas-render.js`/
`index.html` para esto. Documentado en detalle en `data/instituto-data.js` (el primer archivo al que
se le agregó el bloque de registro).

2 BUGS REALES ENCONTRADOS Y CORREGIDOS (el mismo tipo de bug, en 2 clubes distintos): una línea de
GASTO ("Costos de comercialización" en Rosario Central, "Gastos de marketing y comunicación" en
Estudiantes LP x3 años) quedó categorizada con `sponsorship_commercial`, que es una categoría que
SOLO existe en `REVENUE_CATEGORIES`, no en `EXPENSE_CATEGORIES` — `computeYearGeneric()` no la suma
a ningún total de gasto, así que esa plata desaparecía silenciosamente del total (no de
`revenueLines`/`expenseLines` en sí, del CÁLCULO). `verifyTieOuts()` lo detectó en los 2 casos
(diferencia exacta = el monto de esa línea). Se corrigió recategorizando a `admin_general_expense` en
ambos casos. Se armó un script de auditoría rápido (correr en la consola del navegador:
`REVENUE_CATEGORIES`/`EXPENSE_CATEGORIES` vs. cada línea de `CLUB_GENERIC_DATA[clubId]`) que además
encontró un caso preexistente similar en Racing (5 líneas de revenue 2009-2014 etiquetadas
`exceptional_items`, categoría solo de expense) — ese no rompe ningún total (revenue se suma sin
filtrar por categoría) así que se dejó como to-do de limpieza, no se tocó en esta sesión.

PREGUNTAS ABIERTAS (anotadas en `dudas-por-club.md`, NO resueltas a criterio propio, per pedido
explícito de Guido de anotar y seguir en vez de pausar):
- Atribución de gestión cuando el presidente cambia a mitad de un ejercicio y la mayoría de los
  meses fueron de OTRO presidente (Estudiantes LP 2024: Gorostegui presidió casi todo el ejercicio,
  pero Verón firma el balance).
- Cotizaciones de USD ambiguas: 3 balances distintos (Rosario Central 2023, Estudiantes LP 2022, San
  Lorenzo 2013) declaran DOS tipos de cambio de USD en el mismo documento (uno para Activo, otro
  para Pasivo) — se usó siempre el de Activo/Caja, pero no está confirmado que sea el criterio que
  el club preferiría.
- Mes exacto de la primera asunción de Malaspina en Argentinos Juniors (afecta si el Ejercicio 2015
  cae bajo su gestión o no).
- Columnas de departamento del Anexo de Gastos de Unión, no separables con confianza por el OCR.

Verificado en el navegador: `verifyTieOuts()` da 240 checks totales entre los 11 clubes, 0 errores,
ciclando por todos (racing→river→boca→velez→instituto→rosariocentral→independiente→
argentinosjuniors→estudianteslp→sanlorenzo→union). "Formato simplificado" revisado visualmente para
Independiente (Instituto y los demás ya se habían verificado en versiones anteriores), sin buckets
en $0 inesperados.


## Versión 96 — BUG DE BOCA VACÍO EN LA PRIMERA CARGA + REGLA DE ORDEN DEL DROPDOWN DE CLUBES

Guido reportó 2 cosas puntuales, sin pedir más contexto:
"cuando cargo por primera vez la pagina, boca aparece vacio. luego si selecciono otro club y luego
vuelvo a boca, carga bien. why?" y "el menu dropdown de clubes tiene que estar en orden alfabetico
descediente. es una regla".

BUG 1 — Boca vacío en la primera carga (encontrado y confirmado en el navegador, no solo por
lectura de código): con un server nuevo (sin caché previa) y una pestaña nueva, la carga inicial de
`index.html` tiraba `Uncaught ReferenceError: CLUB_GENERIC_DATA is not defined` durante el bloque
INIT (línea con `renderInicioStats()`), y como es JS sincrónico sin try/catch, ESE throw cortaba en
seco todas las líneas siguientes del mismo `<script>` — `populateFinanzasSelectors`,
`refreshFinanzas`, `verifyTieOuts`, `applyPasesFilters`, `renderResultados`, `renderTitulosTable`,
`renderComparar` nunca llegaban a correr, dejando Ingresos/Gastos/Deuda/Pases/Resultados vacíos.
Causa raíz: `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub` (agregadas en la Versión
95 junto con el registro `CLUB_GENERIC_DATA`) referencian el identificador `CLUB_GENERIC_DATA` SIN
el prefijo `window.`. Ese objeto global solo se crea DENTRO de cada `data/<club>-data.js`
lazy-loaded — Boca (el único que carga siempre, vía `<script>` en el `<head>`) nunca lo toca, porque
Boca no usa el motor genérico. En la carga inicial de la página, antes de que el visitante cambie de
club por primera vez, NINGÚN `data/<club>-data.js` genérico había corrido todavía, así que
`CLUB_GENERIC_DATA` como identificador bare no estaba declarado en ningún lado del programa —a
diferencia de `window.CLUB_GENERIC_DATA`, que es un simple acceso a propiedad y da `undefined` sin
tirar error— y JavaScript tira `ReferenceError` al referenciar un identificador global que nunca fue
asignado. Recién al cambiar de club por primera vez se dispara `loadClubData()`, que inyecta el
`<script>` del club elegido, y ESE archivo es el que ejecuta `window.CLUB_GENERIC_DATA =
window.CLUB_GENERIC_DATA || {}` por primera vez en toda la sesión del visitante — por eso "cambiar
de club y volver a Boca" arreglaba todo: no es que Boca se cargara distinto, es que para entonces ya
existía el objeto global y las 3 funciones dejaban de explotar.
FIX: una sola línea nueva, `window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};`, agregada al
principio mismo del `<script>` principal (antes de `const FX_RATE`), con comentario explicando el
bug para que no se reintroduzca. Se dejó tal cual el resto de referencias sin `window.` en
`js/finanzas-calc.js`/`js/finanzas-render.js`/`index.html` (`pasesDataForClub` y las de
`computeYearGeneric`/etc.) porque ya no hace falta tocarlas: al existir el objeto global desde el
arranque, el identificador bare `CLUB_GENERIC_DATA` se resuelve bien en todos lados.

BUG 2 (efecto colateral encontrado al arreglar el Bug 1, no reportado por Guido): al reordenar las
`<option>` del `<select id="clubSelect">` para la regla de abajo, Boca dejó de ser la PRIMERA opción
de la lista — y un `<select>` sin ningún `<option selected>` explícito preselecciona la primera
opción del HTML en el navegador. Eso hacía que el dropdown mostrara otro club seleccionado
visualmente mientras la app en realidad tenía cargado y mostrado el club Boca (`currentClub = 'boca'`
sigue hardcodeado así en el `<script>`), un dropdown desincronizado del contenido real de la página.
Fix: `<option value="boca" selected>` explícito, cualquiera sea el orden final de la lista.

REGLA NUEVA (a pedido de Guido, con "es una regla" — o sea, aplica para siempre, no solo para hoy):
el dropdown `#clubSelect` va SIEMPRE en orden alfabético ASCENDENTE (A→Z) por el texto visible de
cada `<option>`, sin importar el orden en que se onboardearon los clubes. Nota: el primer intento de
esta versión lo armó DESCENDENTE (Z→A) por una lectura literal de "descendente" en el pedido
original de Guido — corregido en la misma sesión apenas Guido aclaró que quería decir A→Z. Orden
final, las 11 opciones: Argentinos Juniors, Boca, Estudiantes de La Plata, Independiente, Instituto,
Racing, River, Rosario Central, San Lorenzo, Unión, Vélez. Documentado con un comentario HTML arriba
del `<select>` para que la próxima sesión que agregue un club nuevo lo inserte en la posición
alfabética correcta, no al final de la lista.

Verificado en el navegador (2 formas): (1) en un tab nuevo con server nuevo (sin caché previa, para
no repetir el bug real encontrado durante el testing de esta versión — ver más abajo), la carga
inicial de Boca ya muestra los 3 gráficos de Finanzas con datos, 0 errores de consola. (2) Se cicló
programáticamente por los 11 clubes del dropdown: los 11 cambios de club resolvieron bien
(`currentClub` y el valor del `<select>` siempre coinciden, sin reversiones), y `verifyTieOuts()`
corrió sus 240 checks sin errores en todos. Nota de testing (no es un bug del sitio): durante la
primera prueba de cambio de club en ESTA sesión, la pestaña reusada del navegador de preview tenía
cacheada una copia VIEJA de `data/river-data.js` (previa a la Versión 95, sin el registro
`CLUB_GENERIC_DATA.river`) — el mismo gotcha ya documentado en `CLAUDE.md` ("Caché de
`<script src="data/....js">`"). Se resolvió abriendo un server en un puerto nuevo (origen nuevo =
caché nueva garantizada); no era un bug de código.


## Versión 97 — SEGUNDO EJERCICIO DE SAN LORENZO + 2 REGLAS NUEVAS DE ARQUITECTURA (PRESUPUESTOS)

Guido: "me gustaria onboardear todos los PDF que tengamos (o el md extraido del pdf) y luego recien
hacer cambios en las visualizaciones. que queda onboardear?" — pedido de inventario completo del
backlog de PDFs descargados sin cargar. Se armó la lista completa (Argentinos Juniors 3 balances sin
OCR, Estudiantes LP 2024-25 sin OCR, San Lorenzo 4 balances sin OCR + Presupuesto 2023-24 ya
transcripto, Unión 3 ejercicios sin OCR, Instituto Presupuesto 2025 ya transcripto) y, dado que
Guido pidió acotar el trabajo a ~25% de su límite de sesión de 5hs (ya estaba al 68%), se priorizó
resolver primero los 2 documentos YA transcriptos (rápidos, sin OCR) antes de arrancar cualquier OCR
nuevo — quedó explícitamente pendiente para una sesión futura.

**Instituto — Presupuesto 2025 (año calendario): NO se carga.** El documento (`presupuesto-2025.md`,
transcripto en una sesión anterior) presupuesta por año CALENDARIO (12 columnas mensuales, ene-25 a
dic-25), pero el sitio modela todo en TEMPORADA (jul-jun, igual que el balance auditado real de este
mismo club). Guido: "hagamos una regla que sea que nosotros mismos vamos a reconstruir los balances
siguiendo la normalidad, que es temporada, no año calendario. Para el caso en el que tengamos solo
la mitad de un año y sea irreconstruible, mantengamos esa info pero no subamos info incompleta."
Con el desglose mensual del documento, en teoría se pueden armar 2 mitades de temporada (ene-jun
2025 = 2da mitad del Ejercicio 2024/2025; jul-dic 2025 = 1ra mitad del Ejercicio 2025/2026), pero
harían falta los Presupuestos 2024 o 2026 (que no tenemos) para completar cualquiera de las 2 — así
que, por la regla nueva, NO se cargó nada. Regla documentada en `.claude/skills/
club-or-year-onboarding/SKILL.md` sección 15, decisión específica en `fuentes-por-club.md`.

**San Lorenzo — Presupuesto 2023/2024 cargado, 3er ejercicio del club.** La transcripción original
(`presupuesto-2023-2024.md`, de una sesión anterior) tenía la tabla mal alineada — no por el
documento en sí (que resultó estar prolijo, "bastante bien alineado" como dijo Guido), sino por un
artefacto de `pdftotext -layout` con filas anchas: números de meses posteriores cayendo en líneas
separadas en vez de la misma fila. Se re-renderizó la página como imagen (300dpi, 3 recortes
verticales con superposición) y se releyó la tabla completa directo del PDF, no del texto extraído.
Verificado con checksums antes de cargar: 7 categorías de Ingresos Ordinarios suman
$19.416.976.393 (oficial $19.416.976.392, diferencia de $1 por redondeo); 11 categorías de Egresos
Ordinarios suman $13.469.229.204 (oficial $13.469.229.203); Ingresos − Egresos = $5.947.747.189,
exacto contra el "Resultado Ordinario" impreso.

El documento separa una sección "Ordinaria" de una "Orígenes y Aplicaciones Extraordinarias"
(aportes bancarios/dirigenciales y su cancelación, obras de capital, compra/venta de jugadores en
términos de desembolso de caja, cancelación de deuda vieja). Guido confirmó la propuesta de NO
cargar la sección Extraordinaria (es financiamiento/capital, no ingreso o gasto real de la
operación) y pidió documentar la decisión + anotarla como pregunta genuina para el club ("por qué lo
hacen así? parecería que no saben devengar") — hecho en `club-data-mapping/SKILL.md` sección 16 y
`dudas-por-club.md`.

Categorización de la sección Ordinaria, confirmada con Guido antes de cargar (no asumida): las 7
categorías de Ingresos mapean directo (Sociales→member_dues, Copas→competition_bonus, Recaudaciones
Partidos→matchday_competition, Derechos de TV→broadcasting, Publicidad→sponsorship_commercial,
Básquet→other_sports, Otros Ingresos→other_income). De los 11 rubros de Egresos, 4 eran ambiguos
(Egresos Ciudad Deportiva/Av. La Plata/Polideportivo, y Remuneraciones sin plantel) — Guido los puso
todos en `admin_general_expense`. Punto aparte: Guido preguntó si "Impuestos" se carga alguna vez
(pensaba que no) y si "Moratoria" debería ir a intereses — se revisó el precedente real con grep
sobre `data/*.js` (no de memoria) antes de responder: Impuestos SÍ se carga siempre, como
`admin_general_expense` (Vélez, San Lorenzo 2013, Rosario Central); Cargas sociales nunca es su
propia categoría, se pega al sueldo de su sector; Moratoria está dividida en el precedente real
(2/3 `admin_general_expense`, 1/3 `other_expenses`, nunca intereses). Como el Presupuesto 2023-24
junta los 3 conceptos en UNA sola fila (no se pueden separar), se cargó entera como
`admin_general_expense`. Todo el precedente completo quedó documentado en `club-data-mapping/
SKILL.md` sección 17, para no tener que volver a investigarlo grepeando cada vez.

Gestión: el ejercicio (jul-2023 a jun-2024) quedó dividido casi exactamente a la mitad entre Marcelo
Tinelli (hasta 26/12/2023) y Marcelo Moretti (desde entonces, electo 17/12/2023) — se usó Moretti
(a cargo al cierre, mismo criterio que Berlanga/Belloso/Verón), con la duda anotada en
`dudas-por-club.md` por lo pareja que fue la división de meses (mismo tipo de caso que Estudiantes
LP 2024). FX: $909 (dólar mayorista de cierre 30/6/2024, el documento no declara tipo de cambio
propio) — mismo valor ya investigado y usado para Instituto/Independiente/Racing en la misma fecha,
no se volvió a investigar de cero.

Verificado en el navegador (server nuevo, sin caché previa): los 3 checks del Ejercicio 2024 de San
Lorenzo cierran exactos (Revenue, Expenses, PAT), "Formato simplificado" revisado visualmente sin
buckets en $0 inesperados (los $0 que aparecen — Abonos, Venta de Jugadores, Compra de jugadores,
Inversiones, Otros gastos — son genuinamente cero, no hay una línea real cargada bajo esas
categorías para este ejercicio). Se cicló por los 11 clubes sin errores de consola.
`verifyTieOuts()` da **243 checks totales, 0 errores** (240 + 3 nuevos de San Lorenzo 2024).

Pendiente (explícitamente acotado por presupuesto de tiempo de esta sesión, no arrancado): el OCR
de Argentinos Juniors (3 balances, 115 páginas), San Lorenzo (4 balances viejos, 144 páginas),
Unión (3 ejercicios, 168 páginas) y Estudiantes LP 2024-25 (127 páginas) — ~554 páginas de OCR en
total, para una sesión futura.


## Versión 98 — BUG GRAVE ENCONTRADO Y CORREGIDO — ARGENTINOS JUNIORS ESTABA EN PESOS RESTATED

Guido, con más presupuesto de sesión disponible: "im at 79% session limit. keep pushing, lets try
to hit 95%" — se retomó el backlog pendiente de la Versión 97, empezando por el ítem más chico
(Argentinos Juniors, 3 balances, 115 páginas de OCR).

HALLAZGO (no se estaba buscando esto, apareció al verificar el primer balance OCReado): los 5
ejercicios de Argentinos Juniors (2015-2019, cargados en la Versión 95) venían de
`presentacion-asamblea-2018-2019.pdf`, un documento de 2 páginas con el comparativo de los 5 años
a la vez. Ese documento dice, en el título de sus propios cuadros: "ESTADOS DE RESULTADOS
COMPARATIVOS (CIFRAS EN PESOS AJUSTADAS POR INFLACIÓN)" — son pesos RESTATED (ajuste por
inflación, RT 6/17), no nominales, a diferencia de TODOS los demás clubes/ejercicios del sitio, que
usan siempre la cifra tal cual la imprime el balance auditado de cada año. Confirmado al OCRear
`balance-2017-2018.pdf` (el balance auditado REAL de ese ejercicio, no un resumen): imprime "TOTAL
DE RECURSOS 610.699.504" para 2018, muy distinto del "951.176.055" que decía la presentación para
el mismo año — y la Nota 1.2 de ese balance aclara que la Institución NO aplicó ajuste por
inflación al ejercicio 2017/2018 (solo ajustes históricos de la hiperinflación de 1989-1995 y la
crisis de 2002-2003, per normativa vieja), confirmando que el balance real SÍ es nominal.

FIX: se OCRearon (Tesseract, 300dpi) los 3 balances escaneados del club — `balance-2015-2016.pdf`
(Ejercicio N°112, 39 págs.), `balance-2016-2017.pdf` (Ejercicio N°113, 45 págs.), y
`balance-2017-2018.pdf` (Ejercicio N°114, 31 págs., el primero en OCRearse) — y se reemplazaron
los ejercicios 2015 a 2018 con sus cifras REALES. Cada balance da su propio año con detalle
COMPLETO de Anexo IV (Recursos por rubro: Fútbol profesional/Actividades deportivas y
culturales/Socios/Diversos) y Anexo V (Gastos, tabla cruzada rubro x departamento), y el año
anterior como comparativo (Anexo IV siempre da el comparativo con el mismo detalle; Anexo V solo
da el comparativo a nivel de las 4 categorías agregadas, sin desglose por departamento). Como los 3
balances se solapan un año cada uno, se pudo cruzar y confirmar cifras entre archivos distintos —
ej. el Total del Pasivo de 2017 sale idéntico calculado desde el balance de 2017 (año "actual") y
desde la columna comparativa del balance de 2018, dando confianza extra sin depender de un solo
documento. 2015 (el año más viejo, sin balance propio descargado) se cargó desde la columna
comparativa del balance 2015-2016, con el mismo criterio de "agregación honesta" que ya usa San
Lorenzo 2014: revenue con detalle completo (Anexo IV lo da), gastos solo a las 4 categorías
agregadas (Anexo V no desglosa el comparativo).

Categorización (mismo criterio en los 3 años con detalle completo): rubros de Anexo IV
categorizados por NATURALEZA real del ingreso/gasto (Derechos de televisación->broadcasting,
Esponsorización->sponsorship_commercial, Venta neta de jugadores/Valorización del plantel
profesional/Derechos de formación->player_sales, etc.), no por departamento — "Actividades
deportivas y culturales" agrupa ~15 disciplinas (Básquet, Boxeo, Natación...) que todas mapean a
`other_sports`, cargadas como una sola línea agregada por año. Del Anexo V (gastos), la mayoría de
los rubros están concentrados en un solo departamento (una línea, una categoría); "Sueldos y cargas
sociales" y "Viajes" SÍ se reparten entre varios departamentos en los 3 años — se cargaron
separadas por departamento (Fútbol->wages_squad, Actividades->youth_other_sports_expense,
Administración->admin_general_expense, Estadio->match_organisation_expense), mismo mecanismo de
columna-por-sector que Vélez/Instituto/Rosario Central/Estudiantes LP/San Lorenzo.

GROSSDEBT/CASH también se recalcularon desde los balances reales (antes venían de la misma
presentación restated — el Pasivo/Patrimonio Neto SÍ está en la misma unidad de pesos que el
Estado de Recursos y Gastos de cada documento, así que tenía el mismo problema). Regla aplicada:
Pasivo corriente + no corriente, EXCLUYENDO Previsiones cuando el balance de ESE año las desglosa
por separado (2017 y 2018 sí; 2016 y 2015, en sus propias presentaciones, no separan Previsiones de
"Otras deudas", así que se usó el Total del Pasivo tal cual lo imprime el documento, sin restar
algo que la fuente no desglosa).

1 discrepancia real encontrada y documentada, NO inventada: el Anexo IV del balance 2015-2016 tiene
un error aritmético propio — sus 10 líneas de "Fútbol profesional" (2016) suman $77.570.507
(verificado 2 veces, incluida una relectura visual de la imagen renderizada de la página para
descartar error de OCR), pero el documento imprime "Total 77.550.507" (mismo número repetido en el
Estado de Recursos y Gastos principal) — una diferencia de $20.000 (0,03%) no atribuible a ninguna
línea específica mal impresa. Se usó la suma VERIFICADA de las líneas reales como
`officialTotalRevenue` de 2016 (no el total impreso por el documento), con el ajuste correspondiente
también en el PAT de verifyTieOuts — documentado en el comentario de cabecera de
`data/argentinosjuniors-data.js` para que quede claro que no es un error de esta transcripción.

El Ejercicio 2019 NO se tocó: no hay balance auditado real de ese año descargado
(`balance-2018-2019.pdf`, pese al nombre, es la Memoria narrativa, ya documentado desde la Versión
95) — sigue viniendo de la presentación de asamblea, con la incertidumbre de si su columna 2019 es
~nominal (probable, al ser el año más reciente de la restatement) documentada en
`dudas-por-club.md` en vez de asumida silenciosamente.

Verificado en el navegador (server nuevo, sin caché previa): los 15 checks de Argentinos Juniors
(5 ejercicios x 3) cierran exactos, incluido el ajuste de $20.000 de 2016. "Formato simplificado"
revisado visualmente para el Ejercicio 2018 (el de mayor movimiento de pases), sin buckets en $0
inesperados. Se cicló por los 11 clubes sin errores de consola. `verifyTieOuts()` da **243 checks
totales, 0 errores** (sin cambio en la cantidad, se corrigieron valores de ejercicios ya existentes,
no se agregó ninguno nuevo).

Pendiente (sigue sin arrancar, para una sesión futura): San Lorenzo (4 balances viejos, 144
páginas), Unión (3 ejercicios, 168 páginas) y Estudiantes LP 2024-25 (127 páginas) — ~439 páginas de
OCR. Dado el hallazgo de esta versión, vale la pena — al onboardear cualquiera de estos con más
detalle, RE-VERIFICAR contra el documento primario real si la fuente ya cargada dice algo distinto,
en vez de asumir que un dato ya cargado es necesariamente correcto solo por estar en el sitio.


## Versión 99 — BACKLOG DE OCR COMPLETO — SAN LORENZO/UNIÓN/ESTUDIANTES LP AL DÍA

Guido: "keep pushing. do pdfs. if you hit judgement question that need me, then move forward
looking for PDFs for teams we have not looked for yet... im fine if you consume 50% of the 5 hour
limit in just this prompt" — se terminó todo el backlog de OCR pendiente de la Versión 97/98 (San
Lorenzo, Unión, Estudiantes LP), y se lanzó en paralelo un agente en background para buscar PDFs de
clubes de Primera Nacional todavía no relevados (reporta aparte cuando termine).

**San Lorenzo: de 3 a 8 ejercicios (2011-2017 consecutivos + 2024).** Se OCRearon los 4 balances
viejos pendientes: 2011-12 (auditado por Deloitte, da 2012 con detalle completo de Anexo V/VI +
2011 como comparativo con revenue detallado pero gastos solo a nivel agregado — no hay balance
propio de 2011 descargado) y 2014-15/2015-16/2016-17 (auditados por Bertora y Asociados, los 3 con
detalle completo). Gestión: se agregó Carlos Abdo (presidente hasta su renuncia en agosto de 2012),
cubre 2011 y 2012. En el Anexo VI de 2016 y 2017, la primera pasada de OCR se saltó 1 fila cada vez
("Honorarios por servicios" en 2016, "Gastos de marketing y publicidad" y "Entrenamiento y
concentraciones"/"Juicios y contingencias" en 2017) — se detectó porque la suma de filas no cerraba
contra el "Transporte" (subtotal a transportar) impreso, y se corrigió releyendo la imagen de la
página a 300dpi en vez de confiar en el texto OCR crudo. Resultados reales: DÉFICIT 2011
$(41.645.487) / DÉFICIT 2012 $(45.744.341) / SUPERÁVIT 2015 $41.968.388 / SUPERÁVIT 2016
$33.377.884 / SUPERÁVIT 2017 $436.617 (ejercicio prácticamente en equilibrio, verificado, no es un
error). FX de 2011 quedó como la única aproximación menos confiable del club (el Anexo de moneda
extranjera de 2012 no separa claramente una cotización para su columna comparativa 2011) —
documentado en `dudas-por-club.md`.

**Unión: de 1 a 4 ejercicios (2022-2025).** Se OCRearon los Ejercicios 116 (2021-22) y 117 (2022-23)
— a diferencia del Ejercicio 119 ya cargado (Versión 95), estos 2 SÍ tienen el Anexo IV de Gastos
con columnas por departamento razonablemente separables, se cargaron con detalle completo por
rubro, verificado que cada uno suma exacto contra el Total de Gastos Ordinarios (117: 24 rubros,
$4.339.212.069,62 vs. impreso $4.339.212.069,62). El Ejercicio 118 (2023-24) SÍ tiene el Estado de
Recursos y Gastos pero el archivo descargado NO incluye su Anexo IV — se cargó a nivel de las 6
categorías agregadas, con la excepción de separar Depreciación de bienes de uso vs. Amortización de
activos intangibles cruzando contra el Anexo II (Activos Intangibles), que declara "Amortización
del Ejercicio" = $1.245.739.483 exacto. NINGUNO de los 3 archivos (116/117/118) incluye una página
de Estado de Situación Patrimonial en el escaneo disponible — se buscó explícitamente "TOTAL DEL
ACTIVO" en el texto completo de los 3, sin encontrarlo — grossDebt/cash quedaron SIN CARGAR para
esos 3 años (no inventados), a diferencia de 2025 que sí los tiene. Resultados reales: SUPERÁVIT
2022 $190.408.914 / SUPERÁVIT 2023 $893.901.287 / SUPERÁVIT 2024 $1.166.322.977. Pregunta anotada
en `dudas-por-club.md` sobre conseguir una copia completa con el Balance General de esos 3 años.

**Estudiantes de La Plata: de 3 a 4 ejercicios (sumó 2025).** A diferencia de los 3 ejercicios ya
cargados (texto nativo), este documento (127 páginas) es un escaneo sin capa de texto — se OCReó
con Tesseract, y dado que el texto OCR de sus 2 Anexos clave salía particularmente ruidoso, se
verificaron visualmente las 2 tablas completas contra la imagen renderizada de cada página antes de
cargar (no solo el texto crudo). Estructura nueva este ejercicio: "Fútbol - Plantel profesional"
aparece como columna separada de "Fútbol - Exhibición y espectáculos" (antes toda la economía de
pases vivía dentro de esa 2da columna) — el club separó explícitamente transferencias/revaluación
de jugadores de la operación de partidos. DÉFICIT real: $(14.277.112.789) ARS — primer déficit del
club en los 4 ejercicios cargados.

Verificado en el navegador (server nuevo, sin caché previa): los 27 checks nuevos (San Lorenzo x15,
Unión x9, Estudiantes LP x3) cierran exactos. Se cicló por los 11 clubes sin errores de consola.
`verifyTieOuts()` da **270 checks totales, 0 errores** (243 + 27 nuevos).

Pendiente (para una sesión futura, ninguno arrancado): completar Argentinos Juniors 2019 con un
balance auditado real si aparece; conseguir el Balance General de Unión 116/117/118.


## Versión 100 — DOS BARRIDOS DE SOURCING EN BACKGROUND — PRIMERA NACIONAL Y SUDAMÉRICA

Guido: "keep pushing... look for PDFs for teams we have not looked for yet. can be second division
or other teams in south america" — 2 agentes en background (worktree aislado cada uno) barrieron
clubes todavía no relevados por el sitio. Tarea puramente de SOURCING: bajar PDFs y documentar en
`fuentes-por-club.md`, nada cargado a `data/*.js` ni a `index.html` en ninguno de los 2 casos.

**Agente 1 — 36 clubes de Primera Nacional (Argentina, 2da división).** 4 clubes con PDFs reales
usables: **Los Andes** (el hallazgo grande — 13 balances consecutivos, Ejercicios 93 a 105,
2008/09 a 2020/21, bajados directo del sitio del club), Ferro Carril Oeste (2 balances auditados,
Ejercicios 118 y 119), Godoy Cruz (1 balance, Ejercicio cierre 30/6/2020), y Temperley (3 PDFs
bajados pero confirmados solo Memoria narrativa, sin cifras). Los otros 32 clubes, sin nada
encontrable por canales oficiales. PDFs en `Clubes/Argentina/<Club>/`, sección nueva en
`fuentes-por-club.md` con fecha de último chequeo por club.

**Agente 2 — clubes de Sudamérica fuera de Argentina.** Priorizó países con obligación legal de
publicar estados contables (Chile por la CMF, Brasil por conversión a SAF, algo similar hallado en
Colombia). Hits reales: **Chile** — Universidad Católica/Cruzados (4 años, 2021+2023-2025),
Universidad de Chile/Azul Azul (4 años consecutivos, 2022-2025), Colo-Colo/Blanco y Negro (3 años
consecutivos, 2022-2024), Palestino (2018). **Brasil** — Botafogo (4 años consecutivos,
2022-2025, la mejor cobertura), Cruzeiro (2024-2025), Bahia (2024-2025), Coritiba (2024).
**Colombia** — hallazgo inesperado: los clubes S.A. deben presentar un "Informe Periódico Fin de
Ejercicio" con estados financieros completos; Millonarios tiene 2 años (2022-2024). **Perú** —
Alianza Lima (2019 y 2022, de su propia página de transparencia). Uruguay (Peñarol/Nacional) tiene
balances reales pero detrás de login de socios, no descargables; Paraguay, Ecuador y Bolivia sin
hits. 27 PDFs nuevos en `Clubes/<País>/<Club>/` (Brasil, Chile, Colombia, Peru — carpetas nuevas al
mismo nivel que `Clubes/Argentina/`), sección nueva en `fuentes-por-club.md` con fecha de último
chequeo por club/país.

Ambos merges de worktree se hicieron a mano (extracción de rango de líneas + concatenación), no
sobrescritura directa, porque cada agente arrancó de un commit anterior a ediciones posteriores
mías sobre el mismo `fuentes-por-club.md` — verificado con `grep` que ninguna sección pre-existente
se perdió.

Pendiente (para una sesión futura, ninguno arrancado): decidir si/cuáles de estos clubes nuevos
(Argentina 2da división y Sudamérica) onboardear de verdad al sitio — dado el volumen (Los Andes
con 13 años, más otros 7 clubes con PDFs reales entre Chile/Brasil/Colombia/Perú), conviene que
Guido priorice antes de arrancar. Ninguno tiene todavía transcripción `.md` (paso previo obligatorio
antes de cargar cualquier dato, ver más arriba en este comentario).


## Versión 101 — SEGUNDA RONDA DE SOURCING SUDAMÉRICA — 3 AGENTES EN PARALELO, MISMO REPO

Guido: "5 hour limit was reset again. spend at least 50% of this season looking for more pdfs for
clubs in south america" — 3 agentes en background (cada uno en su propio worktree aislado)
profundizaron sobre lo encontrado en la Versión 100. Sigue siendo sourcing puro: nada cargado a
`data/*.js` ni a `index.html`, solo PDFs nuevos y `fuentes-por-club.md` actualizado.

**Agente Chile — de 11 a 53 PDFs, 3 clubes con series casi completas.** Universidad Católica
(Cruzados): de 4 a **17 ejercicios, 2009-2025 sin huecos**, encontrados en `cruzados.cl/inversionistas/`
directo (no CMF) — URLs estáticas predecibles por trimestre. Universidad de Chile (Azul Azul): de 4
a **16 ejercicios, 2010-2025 completo** (2010 es el primer año que este emisor reporta ante la CMF).
Colo-Colo (Blanco y Negro): de 3 a **17 ejercicios, 2009-2025 completo**. Confirmado que Cobreloa,
Huachipato, Ñublense y otros 9 clubes chilenos (Unión Española, O'Higgins, Everton, Audax Italiano,
Deportes Iquique, Coquimbo Unido, Unión La Calera, Deportes La Serena, Curicó Unido) son un dead-end
ESTRUCTURAL, no solo "bloqueado": están registrados ante la CMF como "OTODP", una categoría que
nunca tiene pestaña de Información Financiera/EEFF (solo los emisores RVEMI como Cruzados/Azul
Azul/Colo-Colo la tienen) — su "Memoria Anual" es puramente narrativa (verificado, cero totales de
balance en el texto).

**Agente Brasil — de 9 a 31 PDFs, Vasco recuperado, 7 clubes nuevos.** Más años para los 4 clubes ya
cargados (Botafogo, Cruzeiro, Bahia, Coritiba). Vasco da Gama recuperado pese al bloqueo Cloudflare
del dominio oficial, encontrando los mismos PDFs espejados en otros dominios (netvasco.com.br,
crvascodagama.com). 7 clubes nuevos con hits reales: Botafogo-SP, Atlético Goianiense, Athletico
Paranaense, Grêmio, Mirassol, Ituano, Chapecoense. **Bug de atribución encontrado y corregido**: un
PDF cargado en la Versión 100 como `Clubes/Brasil/Botafogo/demonstracoes-financeiras-2019-2020.pdf`
en realidad era de **Botafogo Futebol S.A. (Ribeirão Preto-SP)**, un club homónimo, NO el Botafogo de
Río de Janeiro — el propio documento lo aclara en su nota de contexto operacional. Movido a
`Clubes/Brasil/Botafogo-SP/`. Ningún dato de `data/*.js` se vio afectado (Brasil no está cargado
todavía), pero queda documentado por si alguna sesión futura asumía que ese archivo era del Botafogo
carioca.

**Agente resto de Sudamérica — Colombia se dispara de 1 a 7 clubes vía Supersociedades.** Encontrado
el mecanismo real del portal SIIS de la Superintendencia de Sociedades (buscar por NIT, no por
nombre, entrar a "Vista 360" → "Ver otros documentos adicionales") — 6 clubes nuevos con paquete
completo de Estados Financieros + Dictamen del Revisor Fiscal + Certificación: América de Cali,
Atlético Nacional, Independiente Santa Fe, Junior de Barranquilla, Deportivo Cali, Deportivo
Pereira (varios en procesos de reorganización/insolvencia, que es justamente por qué aparecen en
Supersociedades) — más un año nuevo (2025) para Millonarios. Perú: Alianza Lima pasó de 2 a **6
ejercicios consecutivos, 2019-2024**. Uruguay: reintentado con 3 ángulos nuevos (página propia de
Transparencia de Peñarol, la AIN, prensa reciente), los 3 confirman el mismo bloqueo de login de
socios — documentado para no reintentar de la misma forma. Ecuador: PDFs reales encontrados para LDU
Quito pero son del club CIVIL/social, no de la S.A.D.P. de fútbol — guardados con prefijo
`CUIDADO-club-civil-no-SADP-` para que no se confundan nunca con datos de fútbol. Venezuela
revisado por primera vez, sin hits.

**Regla nueva agregada a `fuentes-por-club.md`** (a pedido de Guido, que preguntó si se estaba
guardando dónde ya se había buscado sin éxito, para que una sesión futura no repita el mismo intento
obvio): REGLA 2, que exige documentar CADA intento fallido con el detalle de qué se probó, la URL/
portal exacto, y por qué falló — no alcanza con "no se encontró". Ver `### Uruguay` en
`fuentes-por-club.md` como ejemplo del nivel de detalle esperado.

Los merges de worktree se hicieron con el mismo criterio que en la Versión 100 (extracción de rango
de líneas por sección país, no sobrescritura directa) para preservar el trabajo de los 3 agentes en
paralelo sin que se pisaran entre sí ni perdieran las secciones ya escritas por sesiones anteriores.

Pendiente (para una sesión futura, ninguno arrancado): igual que en la Versión 100 — decidir qué
onboardear de verdad (ahora con series MUY largas disponibles para 3 clubes chilenos, más Los Andes
en Argentina); ninguno tiene transcripción `.md` todavía.

## Versión 110 — Primeros clubes de Colombia cargados: Once Caldas y Envigado

Pedido explícito de Guido: pasar de "tenemos los PDFs" a "el número se ve en el sitio, verificado" —
cargar los clubes colombianos que la ronda de sourcing previa había descargado (Once Caldas,
Deportes Tolima, Envigado), un solo ejercicio (2025) por club, sin ir a buscar más años aunque
Envigado tenga 10 disponibles en SIIS ("dont focus on multiple years of a club, focus on widening
clubs"). Este onboarding corrió en un worktree en paralelo a otras cargas de la misma sesión (México,
Japón, Brasil) y a la generalización de moneda (Versión 103) — para cuando se mergeó a la rama
principal, `data/currency-map.js`/`toDisplayValue()`/`fmtAmount()` ya soportaban COP de forma
genérica desde esa Versión 103, así que no hizo falta portar ni tocar nada de `js/finanzas-calc.js`
para estos 2 clubes.

**Bug real encontrado antes de cargar ningún club**: `gestionesByClub[clubId]` vacío (`{}`) rompe el
selector "Por gestión" (`TypeError: Cannot read properties of undefined (reading 'lastYear')`) —
ningún club cargado hasta ahora había tenido CERO gestiones conocidas (Once Caldas/Envigado son
sociedades anónimas con Representante Legal, no un club asociativo con presidente electo, así que no
aplica el concepto de "gestión" en el sentido argentino). Fix del lado de los datos, no del motor: una
entrada genérica `{ actual: { nombre:'Gestión actual', firstYear, lastYear } }` por club, sin inventar
un nombre propio que no se confirmó.

**Cómo se resolvió cada club, en orden de confianza:**
- **Envigado** (el más limpio de los 3): el PDF (44 páginas, escaneado sin capa de texto — OCR con
  Tesseract, `pdftoppm -r 300` + `tesseract -l spa --psm 6`) SÍ incluye el Estado de Resultado
  Integral primario completo (no solo notas), y cada línea reconcilia EXACTA contra la siguiente
  (Ingresos - Costo de ventas = Ganancia bruta + Otros ingresos - Gasto equipo de fútbol - Gastos de
  administración - Otros gastos +/- Financiero neto = Ganancia antes de impuestos - impuestos
  corriente y diferido = Ganancia neta, verificado con un script de Node antes de escribir el archivo
  de datos). Un solo dígito de OCR salió garbled ("Total Servicios" del Anexo de Gasto equipo de
  fútbol) — se reconstruyó como residuo exacto contra el total impreso y la suma de sus propios
  sub-ítems, ambos coincidiendo. `officialTotalRevenue`/`officialTotalExpenses`/`officialPAT` (y por
  lo tanto los 3 checks de `verifyTieOuts()`) salen 100% de líneas impresas, cero residuos.
- **Once Caldas**: el PDF descargado (34 páginas, texto nativo) resultó ser SOLO las notas a los
  estados financieros — sin el Estado de Situación Financiera/Estado de Resultado Integral primario
  como tabla aparte (a diferencia de lo que sugería `fuentes/Colombia/_notas-generales.md`, que decía
  que "NOTAS EF" es el paquete completo). El resultado del ejercicio ($9.138,546 M COP) sí está
  confirmado TRIPLE dentro del propio documento (una tabla de indicadores de negocio en marcha en la
  Nota 2, la narrativa del Informe del Revisor Fiscal, y la vista rápida de SIIS) — pero sumando
  línea por línea las Notas 20-27 (Ingresos, Costo de Ventas, Gastos de Administración, Gastos de
  Ventas, Financieros, Otros) el PRETAX no coincide con lo que el propio documento llama "Utilidad
  contable" en su nota de conciliación fiscal, una diferencia de ~$3.599 M sin explicación
  disponible (la compañía sigue en un acuerdo de reestructuración de pasivos desde 2012, lo que
  sugiere que podría haber una ganancia extraordinaria no desglosada en las notas descargadas). Se
  cargó el club de todos modos, usando el PAT triple-confirmado como ancla y despejando el único
  campo sin fuente directa (`tax`, en `fiscalYearMeta`) como residuo — documentado explícito en el
  código y en `dudas-por-club.md` como una aproximación, no un número impreso.
- **Deportes Tolima**: NO se cargó. El mismo problema que Once Caldas (PDF de solo notas, sin estado
  primario), pero acá el resultado neto del ejercicio tiene **3 cifras distintas** que difieren en un
  orden de magnitud entre sí (la vista SIIS: $359,205 M; una tabla histórica dentro del propio
  documento, Nota 18(3): $914,330454 M; la suma línea por línea de las notas: ~$3.184,975 M) — sin
  ninguna corroboración cruzada como la que sí tenía Once Caldas. Ante 3 candidatos sin forma de
  elegir uno con confianza, se prefirió no cargar nada antes que forzar un número de baja confianza
  (documentado completo en `dudas-por-club.md` y `fuentes/Colombia/Deportes Tolima.md`, con la
  transcripción completa guardada para retomar rápido si se consigue el documento correcto).

**Tipo de cambio**: ninguno de los 2 documentos cargados declara su propio tipo de cambio (a
diferencia de los balances argentinos, que sí suelen traer un Anexo de moneda extranjera) — se usó
la TRM oficial de Colombia (Superintendencia Financiera/Banco de la República) al 31/12/2025,
$3.757,08 COP/USD, verificada cruzando 2 fuentes independientes (actualicese.com y
dolar-colombia.com). El toggle de moneda (USD/COP) funciona para estos 2 clubes igual que para
cualquier otro club desde la Versión 103 — no hay ningún gateo por país, el toggle se arma de forma
genérica a partir de `clubs[clubId].reportingCurrency`.

Verificado en el navegador: los 2 clubes cargados, Finanzas renderiza números reales sin errores de
consola, `verifyTieOuts()` pasa los 3 checks para Envigado y (con el residuo de `tax` documentado)
para Once Caldas.

## Versión 102 — Boca migrada al motor genérico ("mismo engine que el resto")

Guido, retomando después de compactar la sesión anterior: "for boca, you can put boca ne the same
engine than the rest now" (dicho unas cuantas sesiones atrás, cuando se dividió `data/clubs.js` en
el registro por club) y, al retomar, simplemente: "lets migrate boca" / "vamos a migrar boca".

**Por qué esto no era un simple copy-paste de estructura.** Boca era el único club que todavía
corría por su propio motor (`yearsRaw{}` de 9 campos fijos + `computeYear()`), mientras River/
Racing/Vélez/Instituto/Rosario Central/Independiente/Argentinos/Estudiantes/San Lorenzo/Unión (9
clubes) ya usaban el motor genérico (`revenueLinesByYear`/`expenseLinesByYear` + `computeYearGeneric`).
Al leer `data/boca-data.js` completo antes de tocar nada, aparecieron dos problemas de fondo que
no eran solo "convertir el formato":

**Problema 1 — Boca tenía DOS estructuras de datos paralelas para el Ejercicio 2025, que nunca se
habían reconciliado entre sí.** `yearsRaw[2025]` guardaba el balance auditado reclasificado por
función (Salarios/Amortización/Depreciación/Otros gastos), la fuente de TODOS los KPIs, PAT y
`verifyTieOuts()` de siempre. `nativeFinancialsBoca[2025]` guardaba el MISMO balance pero
reclasificado por departamento (Fútbol profesional, Estadio, Educación física...), usado SOLO para
pintar la tabla "Formato del club". Cada departamento de esta segunda estructura mezclaba sueldos +
amortización + gastos operativos en una sola línea — imposible de tagear con un solo
`normalizedCategory` sin romper el cálculo de sueldos/amortización que el motor genérico necesita
aislados por separado.

Antes de decidir cómo resolver esto, se le preguntó a Guido directamente (con `AskUserQuestion`,
dado que era una decisión de producto real, no solo de código): ¿colapsar la tabla nativa de 2025 a
~4 filas funcionales (perdiendo el desglose por departamento), mantener un caso especial Boca-only
para esa tabla (reintroduciendo lo que se estaba tratando de eliminar), o volver al PDF fuente y
reconciliar ambas estructuras de verdad? Guido: "no entiendo. the formato de club has to preserve
for every club what originally the club reported. why is the engine not allowing that for boca but
it does for the rest?" — una pregunta justa que exigía volver a los anexos del balance
(`Clubes/Argentina/Boca/memoria-y-balance-2024-25.md`, Anexos IX y XI-XVIII) en vez de aceptar la
pérdida de detalle. Ahí se encontró que CADA departamento (Fútbol profesional, Estadio, Educación
física, Fútbol juvenil, Básquet, Casa Amarilla, Médico, y las 11 gerencias de "Gastos de estructura
operativa") tiene su PROPIA línea "Remuneraciones y cargas sociales" (o subtotal equivalente)
separada del resto de sus gastos operativos, a nivel de detalle que `nativeFinancialsBoca` no
exponía pero el `.md` transcripto sí. Sumando esas líneas de sueldo de las 9 fuentes: **exacto
$67.869,732365 M**, el mismo total de sueldos que el sitio ya usaba desde antes — cero números
inventados. Cada departamento se dividió en 2 líneas top-level ("X — Remuneraciones y cargas
sociales" / "X — Otros gastos operativos"), preservando el nombre del departamento en ambas y el
100% del detalle de sub-ítems, en vez de colapsar a categorías funcionales genéricas.

**Problema 2 — "Revenue" de Boca excluía ingresos por transferencias de pases, con un comentario
que afirmaba (incorrectamente) que esa era la convención del resto del sitio.** Al construir la
reconciliación de arriba, apareció que la línea "Ingresos por transferencias de jugadores" +
"Ingresos por rescisión onerosa de contrato" ($84.714,628094 M en conjunto) se excluía del cálculo
de Revenue de Boca (se llevaba, neta de sus costos asociados, a un campo separado
`profitOnPlayerSales`, estilo "SwissRamble" según el comentario del código). Se verificó
explícitamente si los 8 clubes ya migrados al motor genérico seguían la misma convención — NO: 8 de
ellos (Estudiantes, Argentinos, Instituto, Rosario Central, Unión, Independiente, Vélez, San
Lorenzo) ya suman su propia línea de venta de jugadores (`normalizedCategory:'player_sales'`)
directo a `revenueLines`, contribuyendo a Revenue como cualquier otra línea — el comentario de Boca
sobre "la convención del resto del sitio" describía algo que en realidad no era cierto en ningún
otro lado. Se le presentó el hallazgo a Guido (de nuevo con `AskUserQuestion`, porque cambiaba el
número de Revenue más visible del sitio): "Include transfers, match the balance + other clubs
(Recommended)" — Revenue 2025 de Boca pasa de $152.899,938548 M (excluyendo transferencias) a
$237.614,566642 M (el Total de Recursos que el propio balance imprime en la pág. 76, transferencias
incluidas, igual que el documento las trata).

**Verificación.** Antes de tocar ningún archivo de motor (`finanzas-calc.js`/`finanzas-render.js`),
se escribió un script Node que carga `bocaRevenueLinesByYear`/`bocaExpenseLinesByYear`/
`bocaFiscalYearMeta` y recalcula revenue/expenses/PAT con la MISMA fórmula que `computeYearGeneric`,
comparando contra los 3 checks oficiales de siempre (Revenue 2027 $239.392,104 M, Revenue 2025
$237.614,566642 M —ya con transferencias incluidas—, PAT 2025 $35.581,462204 M) — los 9 ejercicios
(incluidos los 5 placeholder de gestiones Ameal/Angelici, migrados sin cambiar ni un número) cierran
exacto. Recién ahí se migró el motor de cálculo: se borraron `yearMeta`/`bocaYearIsReal`/
`computeYear`/`simplifiedReportForBoca`/`revenueDetailOrLeaf`/`revenueComponentTuple` de
`finanzas-calc.js`, y `drawTrendChart`/`drawBreakdownChart`/`renderDebtBlock`/
`renderFinanzasStatsFromComputed`/`updateFinanzasByGestion`/`updateFinanzasByAnio` de
`finanzas-render.js` (el "cuarteto" Boca-only que coexistía con sus 6 equivalentes `...Generic`
desde que el motor genérico existe). `verifyTieOuts()` dejó de tener los 3 checks de Boca
hardcodeados: Boca entró al mismo loop genérico que ya usaban los otros 10 clubes, leyendo
`officialTotalRevenue`/`officialTotalExpenses`/`officialPAT` de `bocaFiscalYearMeta`.

**`finanzasYears`/`finanzasGestiones` (mecanismo nuevo, no específico de Boca).** La Versión 81
había recortado el `<select>` de Año/Gestión de Finanzas a solo 2024-2027 y Riquelme (los años/
gestiones placeholder de Ameal/Angelici siguen alimentando Mercado de Pases/Resultados/Comparar
Gestiones sin ningún recorte). Migrar Boca al motor genérico puro habría hecho reaparecer los 5 años
y las 2 gestiones viejas en Finanzas (el motor genérico, por defecto, muestra TODO lo que hay en
`fiscalYearMeta`/`gestionesByClub`). Se agregaron 2 campos opcionales a `CLUB_GENERIC_DATA[clubId]`
(`finanzasYears: [2027,2026,2025,2024]`, `finanzasGestiones: ['riquelme']` para Boca; ausentes para
cualquier otro club, que sigue mostrando todo) y se generalizó `populateFinanzasSelectors()` para
leerlos — un mecanismo reusable, no un `if(clubId === 'boca')` nuevo.

**Verificación en navegador.** Con el dev server local (mismo método de cache-busting con query
string en los `<script src>`, documentado en `CLAUDE.md`), se confirmaron en vivo los 6 checks de
`verifyTieOuts()` (Boca 2025/2027, Revenue/Expenses/PAT), la tabla "Formato del club" para 2025
(mostrando los departamentos divididos en Remuneraciones/Otros gastos, exactamente lo diseñado) y
2027 (Fútbol Profesional dividido en Remuneraciones/Amortización de plantel), "Formato simplificado"
para ambos años, "Comparar Gestiones" (Riquelme vs. Ameal, con los números placeholder de Ameal
sin cambiar), Mercado de Pases y Títulos. De paso se encontró y descartó una falsa alarma: al
cambiar de club (River, luego Racing) apareció un error real en consola
("`Cannot convert undefined or null to object`") — no era un bug de la migración, sino el navegador
sirviendo una copia cacheada VIEJA de `river-data.js`/`racing-data.js` (sin cache-busting en
`CLUB_DATA_SCRIPT_SRC`, a diferencia de los 5 scripts editados esta sesión) de antes del refactor de
`gestionesByClub`/`sources` self-registration de la Versión 101 — se confirmó agregando
cache-busting temporal también ahí, y no era necesario ningún cambio de código.

## Versión 103 — Moneda generalizada: la fundación para onboardear clubes fuera de Argentina

Guido, después de migrar Boca al motor genérico: "1) if now the website is scalable to 1000 clubs,
continue to next bullet. if not, make me questions with ideas to make it scalable. 2) the goal now
is to have 10 teams onboarded from Argentina, 10 from brasil, 10 from chile, 10 from colombia, 10
from ecuador, 10 from peru, 10 from spain, 10 from any african nation, 10 from any asian nation, 10
from any CONCACAF teams."

**Auditoría de escalabilidad, delegada a un agente Explore, no supuesta.** En vez de asumir que el
sitio ya estaba listo para 1000 clubes multi-país, se despachó un agente a leer el código real
(`toDisplayValue`, `fmtAmount`/`fmtAmountPlain`, el toggle `#currencyToggleGlobal`, el gate
`isArgentineClub` de `refreshAllForClub()`, `finanzasClubSourceText`, y el campo `reportingCurrency`
de `data/clubs.js`) y reportar, con file:line concretos, qué se rompería con un club chileno o
brasileño. Encontró el gap real: la capa de moneda entera estaba hardcodeada a un par binario
ARS/USD — un club con `fiscalYearMeta.currency` distinto de esos 2 códigos no explotaba, pasaba SIN
CONVERTIR (silencioso) y se etiquetaba "M USD" sin importar cuál fuera su moneda real.
`reportingCurrency` (ya existía por club en `data/clubs.js`) resultó estar completamente inerte —
ningún código lo leía.

**Se le presentó el hallazgo a Guido con `AskUserQuestion`** antes de tocar nada: ¿arreglar solo la
corrección de conversión a USD (bajo esfuerzo, mantiene el toggle nativo solo para Argentina) o
construir el toggle nativo completo para cualquier club (más esfuerzo, mejor para visitantes
locales de cada país)? Guido: "i like the idea of full native currency toggle for every club because
i rather do heavy work now." Agregó 2 matices importantes que cambiaron el diseño:

1. **"we might add clubs from other sports than soccer"** — la taxonomía de categorías
   (`data/category-map.js`) y el modelo de moneda tienen que seguir siendo agnósticos de deporte;
   no se tocó nada de category-map.js en esta ronda (ya es lo bastante genérico: catch-alls
   disponibles para cualquier categoría que un deporte nuevo no tenga), pero quedó como principio de
   diseño a tener en cuenta en cualquier cambio futuro al modelo de datos.
2. **"every club has its own USD mentioned in its pdf, specially from presupuesto pdfs... so not
   every usd is exactly the same"** — el `fx` de un balance/presupuesto NUNCA es una cotización de
   mercado universal, es el tipo de cambio que ESE documento puntual declaró para ESE cierre
   puntual (esto ya era la práctica real del sitio — Boca 2025 usa $1.203, Boca 2027 usa $1.660,
   River usa $950,50, cada uno el propio del documento — pero no estaba elevado a un principio
   documentado explícito). Se reforzó esto como regla permanente en el comentario de cabecera de
   `data/currency-map.js` y en `club-data-mapping/SKILL.md` sección 5, con la frase textual "el USD
   de Boca 2025 no es el USD de River 2024" para que quede imposible de leer mal.
3. **"we have to document these things very well because the logic will be changed while scaling,
   so the foundation has to be agile"** — se documentó un límite conocido y explícitamente NO
   resuelto todavía: un documento puede reportar algunas líneas YA en USD (ej. una cláusula de
   transferencia) mientras el resto del presupuesto está en moneda local — el modelo de hoy solo
   soporta una moneda por EJERCICIO ENTERO (`fiscalYearMeta[year].currency`), no por línea. Se
   decidió NO construir un override por línea de antemano (violaría "no premature abstraction" de
   CLAUDE.md sin un caso real que lo pida), pero se dejó documentada la extensión más simple
   (`nativeCurrencyOverride` opcional en una línea de `revenueLines`/`expenseLines`) para el día que
   aparezca un club real que lo necesite.

**Implementación.** `data/currency-map.js` (nuevo): `CURRENCY_META` por código ISO, cada uno con
`scale` (1000 para monedas de valor nominal grande como ARS/CLP/COP, que se muestran en "miles de
millones"; 1 para BRL/PEN/EUR/USD, que se muestran en millones directo) y `unitSuffix`. Un código sin
entrada cae a `DEFAULT_CURRENCY_META` (scale 1, "M `<código>`"), nunca rompe. `toDisplayValue()`
(`js/finanzas-calc.js`) se reescribió con el invariante explícito de que el toggle de cualquier club
es SIEMPRE [moneda nativa <-> USD] — USD como pivote universal, nunca 2 monedas no-USD directas (ej.
nunca ARS<->BRL en vivo), mismo criterio que ya usaba "Comparar Gestiones". `fmtAmount`/
`fmtAmountPlain` pasaron del ternario binario a `currencyMetaFor(currency).unitSuffix`.

El toggle del header (`#currencyToggleGlobal`) dejó de ser HTML estático con 2 `<button>` fijos:
`populateCurrencyToggle(clubId)` (nuevo, en `index.html`) lo arma en runtime desde
`clubs[clubId].reportingCurrency`, mismo patrón que `populateClubSelect()`. Un club cuyo
`reportingCurrency` YA es 'USD' (ej. Ecuador, oficialmente dolarizado) esconde el toggle entero — no
hay nada que togglear. El listener de click se movió de "enganchado a cada botón" (que ya no existen
de forma fija) a delegado en el contenedor `#currencyToggleGlobal`. `currentCurrency` se conserva al
cambiar entre 2 clubes de la MISMA moneda nativa (ej. 2 clubes argentinos), y se resetea a USD solo
si la moneda elegida no tiene sentido para el club nuevo.

**Se encontró y corrigió de paso**: "Formato del club"/"Formato simplificado" (`simplifyToggleWrap`)
compartía el mismo gate `isArgentineClub` que la moneda desde la Versión 32 — una conflación
accidental, ese toggle no depende de la moneda en absoluto (depende de si el club tiene
`normalizedCategory` en sus líneas, que TODOS tienen desde la migración de Boca en la Versión 102).
Se desacopló: ahora siempre visible, para cualquier club.

**Verificación.** Con el dev server local (cache-busting temporal, mismo método de siempre), se
confirmó `verifyTieOuts()` sin cambios de comportamiento para los clubes ARS existentes (Boca/River
con los mismos números exactos que antes), y se armó un club de prueba en memoria vía
`javascript_tool` (moneda BRL, `fx:5.2`) para ejercitar el código nuevo sin tocar datos reales:
conversión nativa->USD->nativa dio ida y vuelta exacta, `fmtAmountPlain` mostró "100.0 M BRL" y
"19.2 M USD" (antes de esta versión, habría mostrado "100.0 M USD" para el valor nativo, la unidad
incorrecta). Un club de prueba con `reportingCurrency:'USD'` confirmó que el toggle se esconde
entero, como se diseñó.

## Versión 107 — Club América (México): primer club no argentino, y primer caso de "dato real pero a nivel de segmento de negocio, no de balance del club"

Onboarding de un solo club/ejercicio (pedido explícito: "load exactly ONE fiscal year — use 2025"),
pero el primero que pone a prueba de verdad la infraestructura de moneda genérica de la Versión 103
con un caso real, y el primero donde la fuente no es un balance del club en sí, sino una NOTA DE
SEGMENTOS de una compañía bursátil que lo controla. Vale un registro narrativo completo porque casi
todas las decisiones de esta sesión fueron de criterio (qué cargar, qué NO cargar, cómo etiquetarlo)
más que de extracción mecánica de números.

**Contexto societario.** Club América dejó de ser una subsidiaria interna de Grupo Televisa el
31/01/2024: Televisa escindió ("spin-off") su negocio de fútbol + Estadio Azteca (rebautizado
Estadio Banorte) + editoriales + juegos y sorteos en una compañía nueva, Ollamani, S.A.B. de C.V.,
que cotiza en la BMV (clave `AGUILAS`) desde el 20/02/2024. Al ser una emisora regulada por la CNBV,
Ollamani publica Estados Financieros Consolidados auditados bajo IFRS — de ahí sale el dato. Club
América, como entidad deportiva dentro del grupo, no publica balance propio. Se transcribieron las
páginas relevantes de `reporte-financiero-ollamani-2025-auditado.pdf` (113 páginas, texto nativo) a
`Clubes/México/Club América/segmento-futbol-2025.md`.

**Decisión 1 — cargar el "Segmento de Fútbol" tal cual, con el disclaimer al frente, no buscar un
desglose que no existe.** Ollamani reporta 3 segmentos bajo IFRS 8: Fútbol, Juegos (Play City) y
Editoriales y Distribuidoras. El segmento "Fútbol" se define en el propio documento (MD&A, pág. 6, y
Nota de Segmentos, pág. 108) como Club América MÁS el Estadio Banorte — sin ninguna forma de separar
cuánto del ingreso ($2,795.643 M MXN, 2025) es "el club" y cuánto es "el estadio como negocio de
eventos". Se decidió cargarlo igual (en vez de descartar el club por esta ambigüedad), siguiendo el
mismo espíritu que ya tiene el sitio para casos parecidos (Racing/River: `lump_football_operations`
para un bolsón real sin desglosar, documentado como tal). La diferencia con Racing/River es que ahí
el bolsón es "el club no separa este ingreso por concepto"; acá el bolsón es "el reporte no separa
esta ENTIDAD LEGAL de otra distinta (el estadio)" — una categoría de caveat un escalón más seria, así
que se decidió ponerlo en 3 lugares a la vez, no solo en un comentario de código: (a) el propio
`rawLabel` de la línea de revenue ("incluye Estadio Banorte..."), visible en "Estado de resultados"
sin abrir ningún acordeón; (b) el comentario de cabecera extenso de `data/clubamerica-data.js`; (c)
`Clubes/México/Club América/segmento-futbol-2025.md`, con las tablas fuente completas.

**Decisión 2 — `officialPAT` queda en `null`, aunque el documento SÍ imprime una "utilidad de
segmento".** Esta fue la decisión más delicada de la sesión. La Nota de Segmentos imprime, para
Fútbol 2025: Ingresos $2,795,643 miles, "(Pérdida) utilidad por segmento" $43,911 miles. A primera
vista, cargar $43.911 M como `officialPAT` (como haría cualquier otro club con un "Resultado del
ejercicio" impreso) parecía lo obvio. Pero la propia tabla trae un footnote (2): "Utilidad de los
segmentos operativos se define como la utilidad de operación ANTES de depreciación y amortización y
otros ingresos o gastos, neto." Es decir: NO es un resultado neto después de impuestos, ni siquiera
después de D&A — es un EBITDA segmentado. A nivel CONSOLIDADO (los 3 segmentos juntos), Ollamani tuvo
D&A de -$820,345 miles y una PÉRDIDA de operación de -$288,225 miles en 2025 (misma nota), así que es
enteramente posible que el resultado final del segmento Fútbol, después de D&A/financieros/impuestos,
sea negativo, aunque su utilidad operativa pre-D&A haya sido positiva. Cargar $43.911 M como
`officialPAT` habría hecho que `verifyTieOuts()` lo validara como si fuera un PAT real, y que el sitio
mostrara "+43.9 M MXN" bajo el label fijo "Resultado neto" (que `js/finanzas-calc.js` no permite
personalizar por club sin tocar ese archivo, fuera de alcance de esta tarea) — exactamente el tipo de
imprecisión que "Precisión antes que velocidad" (CLAUDE.md) existe para evitar. Se decidió: cargar el
número igual (como una línea de gasto ÚNICA, derivada por diferencia: Ingresos − Utilidad de segmento
= $2,751.732 M), para que "Estado de resultados" no muestre "Gastos: 0" (peor error todavía, mostraría
el revenue entero como ganancia neta), pero dejar `officialPAT` en `null` y documentar extensamente
por qué el "Resultado neto" que el sitio calcule para este ejercicio hay que leerlo como utilidad
operativa pre-D&A, no como una ganancia neta después de impuestos. `officialTotalExpenses` sí se
cargó ($2,751.732 M) porque es una identidad aritmética exacta a partir de 2 cifras impresas, no una
aproximación — sirve para confirmar que la resta no tiene un error de tipeo, no para afirmar que el
documento imprime una cifra de "Gastos" con ese nombre.

**Decisión 3 — sin balance por segmento, `grossDebt`/`cash` en 0/0 (mecanismo ya existente, sin
código nuevo).** La Nota de Segmentos SÍ trae "Activos por segmento" ($9,863.633 M, Fútbol 2025) y
"Pasivos por segmento" ($3,013.763 M) — pero son TOTALES (incluyen cuentas por cobrar/pagar,
arrendamientos, provisiones, todo lo que el segmento tiene y debe), no una cifra de deuda financiera
separada de caja como necesita el sitio (mismo criterio que ya usa Boca/River/Racing: `grossDebt` es
deuda financiera pura). La única cifra de deuda financiera que el reporte SÍ desglosa (deuda a largo
plazo + pasivos por arrendamiento, pág. 10) es CONSOLIDADA de los 3 segmentos, sin split. Se dejó
`grossDebt:0, cash:0`, documentado — `debtDisclosureNote()` (`js/finanzas-calc.js`, mecanismo genérico
ya existente desde antes de esta sesión) ya avisa solo, para cualquier año oficial con 0/0, que es un
dato no disponible, no deuda cero real. No se tocó ni `js/finanzas-calc.js` ni `js/finanzas-render.js`
en toda esta sesión.

**Decisión 4 — tipo de cambio: el documento se contradice a sí mismo, se documenta en vez de
promediar.** Buscando el `fx` MXN/USD al cierre 31/12/2025 (regla #1 de `club-data-mapping/SKILL.md`
sección 5: preferir el que declara el propio documento), aparecieron DOS cifras distintas dentro del
MISMO PDF: $18.0012 en la sección MD&A/narrativa (pág. 7, comentario de "Gastos financieros, neto")
y $17.9528 en la Nota a los estados financieros auditados (pág. 104, footnote de la misma partida). No
se encontró una 3ra cifra que reconcilie las dos, ni una nota que explique la diferencia (~0,27%). Se
usó $17.9528 por estar dentro de la sección de Notas a los EEFF auditados (la misma sección formal
donde vive la Nota de Segmentos usada para revenue/utilidad), en vez de promediar las dos cifras o
elegir a ciego — la discrepancia queda documentada en el comentario de cabecera de
`data/clubamerica-data.js` y en el to-do de `index.html`, por si Guido quiere consultarle a Ollamani
Investor Relations cuál es la "oficial".

**Decisión 5 — sin gestión real, entrada sintética para no romper el motor genérico.** Ollamani no
tiene presidente de comisión directiva ni elecciones (es una sociedad anónima bursátil). Varias
funciones del motor genérico (`populateFinanzasSelectors`/`populateResultadosSelector`/
`populateCompararSelectors`, en `index.html`/`js/finanzas-render.js`) leen
`Object.keys(gestionesByClub[clubId])` sin chequeo defensivo — si esa entrada faltara para
`clubamerica`, el sitio tiraría `TypeError` apenas alguien eligiera el club (encontrado revisando el
código ANTES de escribir los datos, no en el navegador). Se creó una entrada sintética única
(`gestionesByClub.clubamerica.ollamani`, "post-escisión de Televisa, 2024-actual", `firstYear:2025,
lastYear:2025`) — documentado que "Comparar Gestiones" hoy compara el único ejercicio contra sí mismo
sin sentido práctico, hasta que se cargue un 2do ejercicio real.

**Alcance deliberadamente NO cargado.** El PDF de 2024 (`reporte-financiero-ollamani-2024-auditado.pdf`,
ya descargado en la misma carpeta) cubre un período inicial de 11 meses (1/2/2024 a 31/12/2024, el
spin-off ocurrió a fin de enero), no un año completo — se dejó fuera de esta carga a pedido explícito
("2 fiscal years... use 2025, the most recent, full-year one; 2024 was a partial year"), documentado
como to-do para una sesión futura que decida si vale la pena sumarlo pese a no ser directamente
comparable. Mercado de Pases/Resultados deportivos/Títulos quedaron vacíos (alcance de esta sesión:
solo datos financieros).

**Verificación.** `data/clubamerica-data.js` se armó ANTES de tocar el navegador, sumando a mano
`revenueLines`/`expenseLines` contra los 2 totales impresos (Ingresos, y la identidad Ingresos −
Utilidad = Gastos derivados) — cierre exacto, sin redondeo, cruzado 2 veces contra la tabla de
"Desagregación de ingresos totales" de la misma Nota (que reconcilia exacto: $2,726,632 nacional +
$69,011 exportación = $2,795,643, igual a la fila "Fútbol" de la tabla de segmentos). En el
navegador (`preview_start`, selector de club a Club América): "Estado de resultados" muestra la línea
de Ingresos y la de Gastos derivados con sus `rawLabel` completos (caveat incluido, visible sin
abrir ningún acordeón); el toggle de moneda muestra "USD"/"MXN" (antes de esta sesión, `MXN` no
existía en `CURRENCY_META`, habría caído al `DEFAULT_CURRENCY_META` sin unidad correcta, pero
igualmente sin romper); "Deuda bruta"/"Caja" muestran $0 con el aviso automático de
`debtDisclosureNote()` de que es dato no disponible; `verifyTieOuts()` en consola muestra 2 checks
para `clubamerica` (Revenue, Expenses), ambos "OK, cierra", sin ningún error de consola nuevo para
ningún otro club. "Comparar Gestiones"/"Mercado de Pases"/"Resultados" no rompen con el club vacío
(gestión única comparándose contra sí misma, tablas vacías), confirmado a mano en cada pestaña.

## Versión 109 — PRIMEROS 4 CLUBES DE BRASIL CARGADOS, Y 2 BUGS REALES DEL MOTOR GENÉRICO ENCONTRADOS AL HACERLO

Pedido: cargar tantos clubes de Brasil como se pudiera onboardear bien, priorizando ANCHO (más
clubes) sobre profundidad (más años de un mismo club) — "dont focus on multiple years of a club,
focus on widening clubs". De los 12 candidatos con PDFs ya descargados (`fuentes/Brasil/`), se
cargaron 4, uno cada uno: **Grêmio** (2024, no es SAF, associação tradicional), **Botafogo** (2024,
SAF, columna Controladora), **Cruzeiro** (2025, SAF, columna única sin split Controladora/
Consolidado) y **Atlético Goianiense** (2025, columna Consolidado — ver más abajo por qué esta vez
al revés que Botafogo). Los 8 restantes (Athletico Paranaense, Bahia, Botafogo-SP, Chapecoense,
Coritiba, Ituano, Mirassol, Vasco da Gama) quedan con PDF descargado y transcripción pendiente para
una sesión futura, documentado en el to-do de `index.html`.

**Por qué Botafogo usa Controladora y Atlético Goianiense usa Consolidado, mismo tipo de columna
doble, decisión opuesta.** Ambos balances separan una columna "Controladora" (la entidad legal sola)
de una "Consolidado" (sumando subsidiarias). En Botafogo, Consolidado solo agrega una subsidiaria
menor — Controladora YA es una representación fiel y casi completa del negocio de fútbol real. En
Atlético Goianiense pasa lo contrario: durante 2025 el club transfirió su Departamento de Fútbol
Profesional de la Associação (Controladora) a su propia SAF, así que la columna Controladora quedó
con cifras ridículamente chicas (Receitas líquidas: apenas R$20,5 M) mientras el negocio real de
fútbol vive en el perímetro Consolidado (R$77,1 M) — usar Controladora ahí habría representado el
club como un negocio 4 veces más chico de lo que realmente es. Regla para el futuro: no asumir que
"Controladora" es siempre la columna correcta solo porque lo fue la última vez, mirar SIEMPRE cuál
de las 2 columnas refleja mejor el tamaño real de la operación de fútbol de ESE club puntual.

**"Bug real #1" (en el fork de este agente) — ya resuelto de fondo por la Versión 103, no hizo falta
repetir el fix.** Este worktree se creó ANTES de que existiera `data/currency-map.js` (nada de este
trabajo está commiteado todavía, ver Versión 103), así que vio la versión VIEJA de `toDisplayValue()`
(solo ARS/USD hardcodeado) y diagnosticó correctamente el mismo bug de fondo que motivó esa
generalización: un club con `meta.currency` distinto de 'ARS'/'USD' pasaba sin convertir, etiquetado
"M USD". Su fix local (una rama `if(meta.currency === 'BRL' ...)`) NO se aplicó al mergear — habría
sido un paso atrás, reintroduciendo el patrón de branches hardcodeados que la Versión 103 ya
reemplazó por `CURRENCY_META` (tabla genérica por código ISO). BRL ya estaba en esa tabla desde la
Versión 103; el toggle de moneda funcionó para Grêmio/Botafogo/Cruzeiro/Atlético Goianiense sin tocar
`toDisplayValue()` en absoluto. Queda documentado igual como evidencia independiente de que ese
bug era real y que la generalización de la Versión 103 estaba bien justificada.

**Bug real #2 (más sutil, encontrado DESPUÉS de arreglar el #1): el motor asumía que TODO club tiene
ejercicio de temporada partida (jul-jun o similar), nunca año calendario.** `ejercicioLabel()`,
`populateFinanzasSelectors()`, `inicioTooltipTitle()` e `inicioPeriodLabels()` armaban el label de
cualquier año como `(year-1)+'/'+year` ("2023/2024") sin excepción — correcto para los 11 clubes
argentinos (todos jul-jun o sep-ago), pero directamente FALSO para un club de ejercicio calendario
como los de Brasil (ene-dic): un balance de Grêmio 2024 (1°/1 al 31/12/2024 completo) se hubiera
mostrado como "Balance 2023/2024", una fecha inventada que no corresponde a ningún período real del
documento. Se agregó `isCalendarYearClub(clubId)` (js/finanzas-calc.js), que lee
`clubs[clubId].fiscalYearStart` — si es `'01-01'`, el label es solo el año suelto ("Balance 2024"),
si no, se mantiene el rango de temporada de siempre. Retrocompatible: las 4 funciones tocadas
reciben `clubId` como parámetro opcional (o leen `currentClub`, la global ya existente, en los 2
casos de Inicio), ningún call site viejo de Boca/River/Racing/etc. se vio afectado.

**Efecto secundario real, encontrado probando el fix #2 en el navegador**: `clubs.river.
fiscalYearStart` decía `'01-01'` desde que existe ese campo — un dato incorrecto (el ejercicio real
de River es 1°/9 a 31/8, documentado explícito en el propio `data/river-data.js`) pero totalmente
INOFENSIVO hasta ahora, porque ningún código leía `fiscalYearStart` (era un campo de documentación
pura). Al generalizar `isCalendarYearClub()` para leerlo de verdad, ese dato viejo y nunca verificado
pasó a tener efecto: River hubiera empezado a mostrar "2024" suelto en vez de "2023/2024" en el
dropdown "Año" y en Estado de Resultados, una regresión real a un club que no tiene nada que ver con
Brasil. Corregido a `'09-01'`. Lección para el futuro: un campo de datos "solo documentación, nadie
lo lee todavía" puede tener valores nunca verificados con el mismo rigor que un campo que sí importa
— generalizar una función para que empiece a leer ese campo es el momento de auditar TODOS los
valores existentes, no solo agregar el nuevo.

**Metodología de extracción (igual para los 4 clubes, generalizable a los 8 que faltan)**: los PDFs
de Brasil vienen en "milhares de reais" (miles de reales) — se convirtió cada línea a millones de
BRL (mismo criterio de escala que ya usa el sitio para ARS) dividiendo por 1.000, sin excepción
incluso para montos chicos sin separador de miles en el texto original (una trampa real: un número
como "11" impreso sin punto se lee fácil como si ya estuviera en millones, cuando en realidad son
R$11 mil = R$0,011 M — hay que aplicar la MISMA conversión a TODOS los montos de la tabla, tengan o
no separador visible). Tipo de cambio: PTAX del Banco Central do Brasil de cierre del ejercicio
(31/12), investigado externamente en los 4 casos (ningún documento brasileño declaró su propio tipo
de cambio, a diferencia de los balances argentinos que sí suelen tener un Anexo de moneda
extranjera). Gestión/presidencia: en los 3 clubes SAF (Botafogo/Cruzeiro/Atlético Goianiense) no se
confirmó con la profundidad que exige `club-data-mapping/SKILL.md` sección 7 quién preside cada SAF
puntual — se cargó una entrada mínima "gestión no confirmada" en vez de inventar un nombre, mismo
criterio que ya usaba el sitio para Racing 2009-2011.

`verifyTieOuts()` pasa los 3 checks (Revenue/Expenses/PAT) para los 4 clubes nuevos, verificado en el
navegador (no solo en Node) junto con Boca/River/Racing/Vélez para confirmar cero regresiones. El
entorno de preview de esta sesión tenía un problema propio (el servidor de `preview_start` resolvía
a un directorio de otra sesión concurrente, sirviendo un `numeros-de-boca` (nombre de entonces) distinto al de este
worktree) — se resolvió lanzando un `python3 -m http.server` propio apuntado explícito a este
worktree y navegando directo a ese puerto, un gotcha de TOOLING de esta sesión, no del sitio.

## Versión 112 — Parar a arreglar lo que no escala antes de seguir onboardeando

Después de mergear España (Versión 111) y ver el patrón repetirse una tercera vez (currency
branches hardcodeados reinventados por agentes en fork viejo, ahora un bug de `fx` invertido en los
10 archivos), Guido pidió explícito: mirar hacia atrás en la sesión, identificar qué NO escala a
1000 clubes, y arreglarlo antes de seguir sumando países. Se plantearon 4 judgment calls con
`AskUserQuestion`, cada uno con una recomendación y su alternativa (mantener el status quo):

**1. `CLUB_DATA_SCRIPT_SRC` → convención, no mapa.** Elegido: convención. Antes de este cambio, CADA
onboarding requería agregar una línea a un objeto `{ clubId: 'data/clubId-data.js', ... }` que ya
llevaba ~35 entradas repartidas en 4 líneas de index.html — exactamente el tipo de artefacto que en
este mismo día tuve que editar 3 veces a mano (Colombia, España, y el propio merge de este cambio).
Se confirmó primero (con un script de Node) que los 35 clubes cargados hasta ahora seguían la
convención `data/<clubId>-data.js` sin ninguna excepción, así que la migración fue segura: ahora
`loadClubData(clubId)` arma el path directo, sin ningún registro que mantener. Se dejó
`CLUB_DATA_SCRIPT_OVERRIDE` (vacío) como escape hatch documentado por si algún club real necesita
algún día un nombre de archivo distinto — no volver al mapa completo por un caso hipotético.

**2. El toggle "Por gestión" → ocultarlo (Guido: "i dont care anymore ... either get rid of it or
hide it").** Se hizo la opción reversible (ocultar, no borrar código/datos), mismo criterio que ya
existía para Pases/Resultados/Comparar desde la Versión 56. Pero al investigar CÓMO ocultarlo bien,
apareció un hallazgo más importante que la pregunta original: **incluso con el toggle escondido,
`renderInicioStats()` (la función que arma los 4 stats de Inicio, la primera pantalla que ve
cualquier visitante) seguía leyendo `gestionesByClub[currentClub][gestionKey]` sin ninguna guarda.**
Si un futuro club se onboardeaba sin agregar NINGUNA entrada a `gestionesByClub` — el mismo olvido
que ya había pasado una vez con Colombia, y que el toggle escondido no prevenía en absoluto, porque
Inicio no depende del toggle — el sitio rompía en la pantalla que ve TODO el mundo, no solo para
quien buscara "Por gestión". Se rastreó la cadena completa: `currentGestionKey()` con
`gestionesByClub[clubId]` vacío hace `Object.keys({}).reduce(..., null)` → devuelve `null` (no
`undefined`, un detalle que casi hace descartar la hipótesis al probarla) → `gestionesByClub[club]
[null]` es `undefined` → `.lastYear` tira `TypeError`. Fix: `currentGestionKey()` y los ~8 lectores
de `gestionesByClub[clubId]` en `js/finanzas-render.js` ahora usan `|| {}`, y `renderInicioStats()`
detecta la ausencia y muestra "Sin dato" en los 4 stats en vez de crashear — mismo patrón que ya
usaba "Socios activos" para un club sin ese dato. Verificado inyectando un club de prueba SIN
`gestionesByClub` en absoluto vía `javascript_tool`: Inicio y Finanzas renderizan sin errores de
consola. Consecuencia práctica: onboardear un club nuevo ya NO requiere agregar la entrada sintética
"Gestión actual" que se había vuelto la convención después de Colombia — el motor ya no depende de
que ese paso se recuerde.

**3. `fx` invertido → chequeo automático de rango plausible.** Se agregó `FX_PLAUSIBLE_RANGE` +
`checkFxSanity()` (`data/currency-map.js`), corriendo junto a `verifyTieOuts()` en cada carga del
sitio. Primer intento de rango para ARS (`[50, 3000]`) disparó 25 falsos positivos reales al
probarlo contra los datos ya cargados (Racing/San Lorenzo/Argentinos/Vélez tienen ejercicios de
2011-2019, con el peso en $4-$40 por dólar en esos años — un rango histórico real, no un bug) — se
corrigió a `[3, 3000]` después de confirmar el valor mínimo real entre los clubes cargados. Quedó
como recordatorio de que un rango "plausible" para una moneda con historial inflacionario tiene que
mirar TODO el rango histórico de los datos ya cargados, no solo el valor de hoy. Confirmado con una
prueba directa que el chequeo SÍ atrapa el bug real de España (`fx:1.172` para EUR cae fuera de
`[0.7, 1.15]`, warning inmediato).

**4. Commits locales sin push.** Guido aceptó, con la salvedad de que Netlify solo debería
disparar con push al remoto (no con un commit local), y reiterando que el push en sí sigue
necesitando un pedido explícito cada vez — esto no cambia esa regla, solo evita que la próxima
tanda de agentes en paralelo forkee de un estado desactualizado y redescubra/reinvente lo que esta
sesión ya arregló (pasó 3 veces con la generalización de moneda, sesión completa).

Regresión completa verificada en el navegador después de los 3 cambios de código: 38 clubes, 213
checks de `verifyTieOuts()`, 0 mismatches, 0 warnings de `checkFxSanity()`, 0 errores de consola.

## Investigación de fuentes de los 27 clubes restantes de Primera División (sin tocar el sitio)

Guido pidió un barrido explícitamente separado de cualquier cambio al sitio: solo buscar, descargar y documentar fuentes financieras oficiales de los 27 clubes de Primera División que todavía no tienen nada cargado (Boca/River/Racing son los únicos con datos reales hoy), sin tocar `index.html` ni `data/`. El objetivo declarado no era cargar nada todavía, sino saber qué pedirle a cada club y a quién, para escribirles directamente pidiendo lo que falta.

Se confirmó primero el roster vigente de 30 equipos para la temporada 2026 (Wikipedia): Godoy Cruz y San Martín de San Juan descendieron a fin de 2025, reemplazados por Gimnasia y Esgrima de Mendoza y Estudiantes de Río Cuarto. Después se lanzaron 5 agentes en paralelo, cada uno con ~5-6 clubes, con la regla de que solo cuenta como fuente un PDF alojado en el dominio oficial del club (o un link que el propio club comparta directo, ej. un Drive embebido en una noticia oficial) — nada de prensa, foros ni PDFs de terceros como si fueran la fuente real, mismo criterio que ya regía para Boca/River/Racing.

Los 5 agentes se quedaron sin cuota de sesión a mitad de tarea (rate limit del plan) y hubo que reanudarlos con `SendMessage` en vez de relanzarlos de cero — cada uno retomó desde el estado real en disco (se verificó qué PDFs ya había cada carpeta antes de reanudar) en lugar de repetir trabajo ya hecho. Terminaron los 5: 65 PDFs reales descargados en `Clubes/Argentina/<Club>/` para 11 de los 27 clubes (Vélez es el hallazgo más grande, con un archivo oficial que cubre casi todos los ejercicios 2015-2025; también salieron bien Argentinos Juniors, San Lorenzo, Unión, Estudiantes LP y Gimnasia y Esgrima LP, entre otros). Los otros 16 clubes no tienen ningún balance/presupuesto público en su dominio oficial — varios lo aprueban en asamblea todos los años según sus propias noticias, pero lo distribuyen solo en papel o detrás de un login de socio, nunca como PDF público.

Una verificación final con `pdfinfo` sobre las 65 descargas encontró una corrupta: el Balance del Ejercicio 114 de Unión se cortaba siempre en exactamente 1.048.576 bytes (1 MB) tanto pidiéndolo directo al dominio oficial (caído en ese momento) como a distintos snapshots de Wayback Machine — se descartó el archivo y quedó documentado como pendiente en vez de dejar un PDF ilegible en la carpeta. Todo el detalle club por club (qué se descargó, qué falta, y el contacto — mail, teléfono, WhatsApp o red social — para pedirlo) quedó en `fuentes-por-club.md`, no acá, siguiendo el mismo criterio de siempre: esa lista vive en un solo lugar para que no se desincronice.

---

# VOLUMEN 0 — ORIGEN DEL PROYECTO (antes de la Versión 10)

Todo lo que sigue en este Volumen 0 estuvo, hasta hoy, en un archivo suelto
`Proyecto Boca.md` en la carpeta de ARRIBA (el sitio profesional de Guido), fuera
del repo del proyecto y por lo tanto fuera de git. Se movió acá en la Versión 119
sin editar una palabra: es el planteo original del proyecto y las Versiones 1 a 9
del MVP, que la historia narrativa de este archivo (que arranca en la Versión 10)
nunca había cubierto.

Ojo al leerlo: es de agosto/septiembre de 2026, cuando el sitio era solo de Boca
y se llamaba así. Las rutas que menciona (`numeros-de-boca/`) ya no existen, y
varias decisiones de acá fueron reemplazadas después. No se corrigió nada a
propósito: es un documento histórico, y reescribirlo para que "quede bien" sería
justamente perder el registro de cómo se pensaba el proyecto al principio.

---

## Objetivo

Sitio para que hinchas de Boca Juniors puedan informarse antes de votar por presidente. Solo datos, sin opinión ni bajada de línea. Análisis profesional, tipo empresa: revenue, gastos, deuda, patrimonio, no solo "cuántos títulos ganó cada uno".

## Quién está haciendo algo similar

No existe un sitio exactamente equivalente (neutral, solo datos, orientado a elección de presidente, con análisis tipo empresa) para Boca ni para otros clubes grandes (Manchester City, Arsenal, Emelec). Lo más cercano:

- **Swiss Ramble** (swissramble.substack.com): el referente. Analiza finanzas de clubes europeos con rigor de equity research, sin bajar línea, dejando que el lector saque conclusiones. Modelo de tono a imitar.
- **Kieran Maguire / Price of Football**, **Game State**, **The Athletic ("The BookKeeper")**, **Valuball**: cubren ingresos, gastos, deudas, net spend, wages-to-turnover, PSR/FFP. No están pensados como herramienta electoral de socios.
- **Liebre Capital** (liebrecapital.com.ar) y notas puntuales como "River vs Boca 2025, comparación financiera rubro por rubro" (El Editor Platense): en Argentina ya hay medios comparando finanzas de clubes, pero de forma puntual, no como sitio dedicado a una elección.
- **Supporters Direct Scotland**, **Football Supporters' Association (UK)**: iniciativas de hinchas con índices de gobernanza y ownership, más lobby que plataforma de datos para votar.
- **INFUT** (Índice de Transparencia de Clubes de Fútbol, Transparencia Internacional España): mide 17 indicadores contables, de ingresos/gastos y endeudamiento. Promedio de clubes españoles: 44.2/100. Buen antecedente de metodología a adaptar.
- **bocajuniors.com.ar/club/presupuesto**: el propio club publica presupuesto y balances. Hay cobertura periodística de asambleas (superávits, obras), pero no un sitio independiente y estructurado para comparar candidaturas con datos duros.
- Emelec y otros clubes ecuatorianos tienen elecciones con cobertura noticiosa (deuda de USD 35.88M expuesta en asamblea 2026), pero no análisis financiero neutral dedicado.

En clubes de socios (Boca, River, Barcelona, Real Madrid, Bayern) la lógica de "analizar como empresa" es especialmente útil porque el "accionista" es el socio que vota. En clubes de propiedad privada o estatal el foco suele ser otro (dueños, fair play financiero).

**Conclusión: el hueco existe.** Nadie está armando algo enfocado puntualmente en dar contexto financiero e institucional antes de que los socios voten.

## Lista extensiva de qué analizar

Tratar al club como una empresa (o asociación civil con actividad empresarial) cuyos "accionistas" son los socios. Separar siempre datos históricos verificables, proyecciones y promesas de campaña. Evitar cualquier relato de "ganó X títulos" como eje central.

### 1. Estados financieros y resultados (el core)

- Ingresos totales y desglose: cuotas sociales/abonos, matchday (entradas + hospitalidad), derechos de TV y premios de competiciones, comercial (sponsors, merchandising, licensing, naming rights), transferencias de jugadores (neto), otros (basket, otros deportes, eventos, alquileres).
- Gastos: masa salarial del plantel profesional + cuerpo técnico (con cargas sociales y variables), costos de organización de espectáculos, administración, marketing, fútbol juvenil/cantera, otros deportes, amortizaciones, gastos financieros.
- Resultado operativo vs. resultado neto (superávit/déficit). EBITDA o equivalente aproximado.
- Evolución año a año (últimos 5 a 8 ejercicios) y vs. presupuesto aprobado.

### 2. Balance y liquidez

- Activo (corriente y no corriente): caja e inversiones, créditos (incluyendo por transferencias a cobrar), valor en libros del plantel vs. valor de mercado estimado, inmuebles (Bombonera, Casa Amarilla, Ezeiza), otros.
- Pasivo: deudas comerciales, deudas financieras (bancos, préstamos, bonos), deudas con jugadores/agentes, provisiones, deudas tributarias y previsionales.
- Patrimonio neto y su evolución.
- Liquidez (current ratio o similar), solvencia, endeudamiento (pasivo/activo, deuda neta).
- Flujo de fondos si se publica o se puede reconstruir: generación operativa vs. inversión y financiamiento.

### 3. Transferencias y "activo humano"

- Net spend histórico (compras menos ventas) por ventana y acumulado.
- Amortizaciones de pases vs. plusvalías por ventas.
- Valor de mercado estimado del plantel (Transfermarkt u otras fuentes) vs. valor en libros.
- Cláusulas, porcentajes de reventa residuales, jugadores a préstamo.
- Costo de la cantera vs. ingresos por ventas de formados.
- Ratio wages/revenue (masa salarial sobre ingresos totales).

### 4. Infraestructura e inversiones de capital

- Capex histórico y proyectado (ampliación de Bombonera, predio, Casa Amarilla, hotel, microestadio, etc.).
- ROI potencial: mayor capacidad, hospitalidad, eventos no futbolísticos, naming rights.
- Financiamiento de las obras: caja propia, deuda, sponsors, preventa.
- Estado real de avance vs. anuncios de campaña.

### 5. Modelo de negocio y diversificación

- Dependencia de cuotas sociales vs. ingresos comerciales y deportivos.
- Crecimiento de la base societaria (activos, adherentes, interior, exterior) y precio de cuotas vs. inflación.
- Ocupación de estadio, precios de entradas/abonos, ingresos por hospitalidad/VIP.
- Contratos de sponsors principales: duración, montos, exclusividades.
- Otros deportes y actividades sociales: si generan o consumen recursos.
- Exposición a riesgo cambiario e inflación, especialmente relevante en Argentina.

### 6. Gobernanza y control

- Composición de la Comisión Directiva, comisiones, gerencias profesionales.
- Transparencia: oportunidad y detalle de publicación de balances, presupuestos, actas y contratos relevantes.
- Mecanismos de control: Comisión Fiscalizadora, auditorías externas, asambleas.
- Requisitos estatutarios para candidaturas (antigüedad de socio, garantías patrimoniales) y reglas de reelección.
- Conflictos de interés, contratos con partes relacionadas, uso de fundaciones o sociedades vinculadas.
- Cumplimiento de regulaciones (AFA, Conmebol, eventual fair play).

### 7. Desempeño operativo no deportivo pero medible

- Eficiencia administrativa (gastos de administración sobre ingresos).
- Costo por punto o por partido (aproximaciones).
- Indicadores de cantera: jugadores promovidos a Primera, minutos jugados, ventas netas.
- Asistencia promedio, porcentaje de socios que asisten, rotación de abonos.
- Engagement digital y comercial, si hay datos públicos.

### 8. Comparables y benchmarks

- Vs. River, Racing, Independiente, San Lorenzo: mismos modelos de socios y contexto argentino.
- Vs. clubes de socios europeos (Barcelona, Real Madrid, Bayern, Athletic) en estructura de ingresos y ratios.
- Evolución propia vs. inflación, tipo de cambio y crecimiento del fútbol argentino/sudamericano.
- Deloitte Football Money League y reportes similares como referencia de escala global.

### 9. Riesgos y escenarios

- Sensibilidad a no clasificar a Libertadores o Sudamericana.
- Riesgo de inflación, devaluación y regulación de precios de cuotas.
- Concentración de ingresos en pocos sponsors o en la masa societaria.
- Contingencias legales, laborales o de infraestructura.
- Capacidad de absorber un ciclo deportivo malo sin descapitalizarse.

### 10. Información electoral específica

- Plataformas de las listas: lo que prometen en números (obras, plantel, cuotas, transparencia).
- Historial de cumplimiento de promesas de gestiones anteriores, cuando haya datos.
- Padrón: cantidad de socios habilitados, participación histórica, categorías.
- Costos de campaña y financiamiento, si se transparenta.

## Dónde encontrar la información

- Oficial: bocajuniors.com.ar (presupuesto, balances, estatuto, asambleas).
- Actas y documentos de asambleas de representantes.
- IGJ (Inspección General de Justicia): balances de asociaciones civiles y reglas electorales.
- AFIP/BCRA/INDEC: datos impositivos, tipo de cambio, inflación para deflactar cifras.
- Medios especializados argentinos que desglosan números de asambleas (verificar cruzando fuentes): Infobae, El Economista, Doble Amarilla, Líbero.
- Liebre Capital y notas comparativas similares como fuente secundaria ya procesada.
- Comparables europeos: Companies House (Inglaterra), registros mercantiles, sitios oficiales de los clubes, Swiss Ramble, Kieran Maguire, Deloitte Money League, reportes de UEFA.
- Transferencias: Transfermarkt + reportes de clubes + periodismo de investigación.

## Recomendación de enfoque para el sitio

Series temporales, tablas y gráficos claros (ingresos vs. gastos, evolución del patrimonio, net spend, ratios clave). Separar siempre "lo que dice el balance" de "estimaciones de mercado" y de "promesas de campaña". Permitir filtrar por período y comparar gestiones. Incluir siempre fuente y fecha del dato. Evitar cualquier lenguaje valorativo ("buena gestión", "desastre", etc.).

## MVP: primer HTML

Archivo: `numeros-de-boca/index.html`. Navegación probada: Inicio, Finanzas, Mercado de Pases, Resultados, Comparar Gestiones, Fuentes. Adentro de Finanzas hay un toggle "Por gestión" vs. "Año a año", tal como se pensó. Todos los números son placeholder.

## Versión 2 del MVP (iteración con feedback)

Cambios agregados sobre la primera versión:

1. **Mercado de Pases**: ahora tiene filtros combinables por gestión, año, ventana de pases (Verano/Invierno) y tipo (Jugador/DT). Se agregaron movimientos de cuerpo técnico (DTs) como registros propios, sin impacto monetario en esta demo (en la versión final, si se consigue el dato del contrato del DT, se puede sumar como gasto).
2. **Tab "Resultados"**: nueva sección con títulos, participaciones internacionales, posición promedio y goles a favor/en contra por gestión, más una tabla histórica de títulos por año. Se agregó también un resumen deportivo (títulos, participaciones en Libertadores, posición promedio) dentro de la tabla de Comparar Gestiones, al lado de los indicadores financieros.
3. **Selector de moneda (USD/ARS)**: arriba a la derecha del header. Convierte todos los montos del sitio usando una cotización de referencia placeholder (1 USD = 1450 ARS, hay que reemplazarla por la real y decidir si se actualiza a mano o vía API). En ARS los montos se expresan en "miles de millones" para mantener números legibles.
4. **Sección Fuentes**: ahora arranca con "Sobre mí", anónimo, una sola idea: "soy hincha de Boca, nada más", sin relación con listas ni candidaturas.
5. **Gráficos en Finanzas**: debajo de la tabla de resultados hay dos gráficos (Chart.js vía CDN): barras de ingresos vs. gastos de los últimos ejercicios, y dona con la composición de ingresos (Matchday / Broadcasting / Comercial) del ejercicio seleccionado.
6. **Formato tipo Swiss Ramble**: la tabla de Finanzas se rehizo como estado de resultados (Matchday, Broadcasting, Comercial, Revenue, Salarios, Expenses, EBITDA, ítems no-cash, Resultado Operativo, ganancia por venta de jugadores, EBIT, intereses, PBT, impuestos, PAT, salarios/ingresos, deuda bruta/caja/deuda neta), con subtotales resaltados, negativos en rojo entre paréntesis, y columnas de variación y variación %, replicando la lógica del ejemplo de @SwissRamble para Chelsea. No se replicaron los íconos de refresh/expandir ni el coloreado condicional fila por fila (verde si ganancia, rojo si pérdida) del original, quedó simplificado a un resaltado neutro. Se puede sumar en una iteración futura.
7. **Ícono de contacto**: arriba a la derecha, abre un formulario modal (nombre opcional, email opcional, tipo de mensaje, mensaje) que arma un mailto: con lo cargado. El email de destino es un placeholder (`contacto@bocaennumeros.example`), hay que reemplazarlo por un email real antes de publicar.

Nota técnica: los datos de Finanzas ahora están armados como un P&L completo por ejercicio (2018, 2019, 2021 a 2025, con Angelici en 2018-2019, Ameal en 2021-2023 y Riquelme en 2024-2025), calculado con una función a partir de rubros crudos, para que ingresos, EBITDA, resultado operativo, EBIT y resultado neto sean siempre internamente consistentes entre sí.

## Versión 3 del MVP (correcciones)

1. **Se sacó el header de disclaimer** ("Sitio independiente, sin afiliación...") que estaba arriba de todo.
2. **El toggle USD/ARS ahora vive dentro de la sección Finanzas**, no en el header. Antes era global y afectaba Pases, Comparar e Inicio también, lo cual no correspondía porque esos montos igual siguen en USD. Ahora el resto del sitio siempre muestra USD.
3. **Transfermarkt**: no lo puedo scrapear directamente. El dominio está bloqueado para el tool de fetch de este entorno (política de la plataforma, no una limitación técnica de acceso a internet en general), y no está permitido esquivar ese bloqueo con otras herramientas. Alternativas: (a) copiás y pegás los datos de la página de pases del club en Transfermarkt y yo los proceso, (b) si conectás la extensión de Chrome puedo navegar páginas en vivo con vos mirando, con tu aprobación en cada sitio, pero igual sería manual página por página, no un scrape masivo automático.
4. **Resultados Deportivos, corregido**: saqué el card de "goles a favor/en contra" (no lo tenía verificado, era inventado). Reemplacé todos los datos de la sección por títulos realmente ganados en cada gestión, buscados y verificados:
   - Angelici (2011-2019): 6 títulos locales (Copa Argentina 2012, Campeonato 2015, Copa Argentina 2015, Primera División 2016/17, Primera División 2017/18, Supercopa Argentina 2018), 0 internacionales. Finalista de Libertadores en 2012 y 2018.
   - Ameal (2019-2023): 6 títulos locales (Superliga 2019/20, Copa de la Liga 2020, Copa Argentina 2019/20, Copa de la Liga 2022, Primera División 2022, Supercopa Argentina 2023), 0 internacionales. Semifinalista de Libertadores en 2020.
   - Riquelme como presidente (desde el 21/12/2023 hasta agosto de 2026): **0 títulos**. En 2025 Boca fue eliminado en fase preliminar de la Copa Libertadores, la primera vez en 19 participaciones consecutivas. Aclaración importante que quedó en el sitio: los títulos que Riquelme ganó como vicepresidente entre 2019 y 2023 quedan contados en la gestión de Ameal, no en la suya como presidente.
   - Ojo: estos números salen de cobertura de prensa (Infobae, La Nación, Wikipedia) buscada en agosto de 2026, no de un balance oficial. Hay que cruzarlos con el sitio oficial del club antes de publicar el sitio en serio.
   - También se corrigió Comparar Gestiones, que antes citaba "participaciones en Libertadores" y "posición promedio" inventadas: ahora compara títulos totales (número real) y mejor resultado en Libertadores (texto, sin inventar promedios de posición en la tabla).

## Versión 4 del MVP: presupuesto oficial 2026/27 incorporado

Guido subió el "Presupuesto Económico, Financiero y de Inversiones" oficial del club para el Ejercicio N° 123 (1° de julio de 2026 al 30 de junio de 2027). A diferencia de todo lo demás en el sitio, esto no es placeholder: es el documento real presentado por la gestión de Riquelme, con desglose exhaustivo por gerencia y departamento.

Se incorporó como una card nueva arriba de todo en la sección Finanzas ("Presupuesto 2026/27 (oficial)"), con acordeones anidados (HTML `<details>/<summary>` nativo, sin JS) siguiendo exactamente la agrupación del documento:

- Premisas de presupuestación (moneda constante abril 2026, tipo de cambio $1.480 a $1.840 por USD, inflación 21%, políticas de ingresos y gastos).
- Presupuesto Económico (resumen de ingresos y gastos por gran rubro, resultado +$3.402.243.000).
- Apertura de Ingresos: acordeón por rubro (Cuotas Sociales, Comerciales + Canjes, Exhibición de Espectáculos Deportivos con sub-desgloses por Torneo Oficial/Copa Argentina/Amistosos/Libertadores, Abonos, Diversos, Otros Deportes con Deportes Amateurs/Futsal/Hockey, Basket Profesional, Fútbol Juvenil, Fútbol Femenino).
- Apertura de Gastos: el bloque más grande, con acordeones anidados en dos niveles siguiendo cada gerencia y departamento del club (Fútbol Profesional, Administración con sus 17 gerencias/departamentos, Organización de Espectáculos, Gastos Generales, Fútbol Juvenil con la activación negativa explicada, Otros Deportes con sus 12 disciplinas, Basket, Otras Amortizaciones, Comerciales, Socios con sus 5 áreas, Eventuales).
- Presupuesto Financiero (saldo inicial, créditos y deudas del ejercicio anterior, ingresos y gastos por lo percibido, inversiones en obras, saldo al cierre).
- Presupuesto de Inversiones (Sistemas y Control de Acceso, Estadio con el plan de ampliación, Casa Amarilla con el microestadio, Predio Ezeiza con el hotel de reserva).

Cada acordeón muestra el total del rubro en el propio título, para poder escanear sin abrir todo. Se agregaron stat cards arriba con Total Ingresos, Total Gastos, Resultado Económico y el tipo de cambio de referencia.

Nota técnica: esta sección queda en pesos argentinos, tal como está en el documento oficial, y no está conectada al toggle USD/ARS de la sección Finanzas (ese toggle sigue aplicando solo al P&L histórico placeholder). Si más adelante se quiere convertir este presupuesto a USD, están los tipos de cambio de referencia del propio documento ($1.480 julio 2026, $1.840 junio 2027) para hacerlo a mano o programarlo.

Pendiente: verificar que las tablas rindan bien en mobile (son tablas anchas por la cantidad de conceptos), y decidir si conviene mover este bloque a su propio tab en vez de vivir dentro de Finanzas, dado el volumen de contenido.

Actualización: se movió la card "Presupuesto 2026/27 (oficial)" al fondo de la sección Finanzas, después de los gráficos. El estado de resultados (P&L) con el toggle gestión/año volvió a quedar primero, como estaba antes.

## Versión 5 del MVP: el presupuesto 2026/27 ahora también alimenta el Revenue del estado de resultados

El acordeón de Apertura de Ingresos ya no vive aislado: sus totales quedaron reflejados como un ejercicio real dentro del estado de resultados de Finanzas (Ejercicio 2027, seleccionable en "Año a año" y como último año de la gestión Riquelme en "Por gestión").

Mapeo de las categorías oficiales a las filas del P&L (verificado para que sume exacto contra los totales del documento):

- Cuotas Sociales (84.600.271.000 ARS): se agregó como fila nueva en el Revenue, porque es el mayor rubro de ingresos del club (35% del total) y el modelo simplificado de años anteriores no la tenía separada. Esta fila ahora existe para todos los ejercicios, pero solo tiene valor real en el 2027; en los años placeholder queda en 0.
- Broadcasting: derechos de TV de Torneo Oficial + Copa Libertadores (19.237.871.000 ARS).
- Matchday: recaudaciones + premios + amistosos + bonos de la Exhibición de Espectáculos Deportivos, más Abonos (64.487.517.000 ARS).
- Comercial: total de Ingresos Comerciales + Canjes Comerciales (53.477.864.000 ARS).
- Otros ingresos operativos: Diversos + Otros Deportes + Basket Profesional + Fútbol Juvenil + Fútbol Femenino (17.588.581.000 ARS).

Para los gastos se hizo el mismo ejercicio con Apertura de Gastos, separando lo que es amortización de plantel (pases) de lo que es sueldo/operación, para que EBITDA y resultado operativo tengan sentido:

- Salarios: Fútbol Profesional sin la Amortización de Plantel (Gerencia de Fútbol Profesional + Fútbol Femenino, 72.632.108.000 ARS). Es una aproximación: ese bloque incluye primas y sueldos pero también algunos gastos operativos menores del área.
- Amortización de pases: Amortización Plantel dentro de Fútbol Profesional (47.726.249.000 ARS).
- Depreciación: Otras Amortizaciones (inmuebles, instalaciones, varias) (3.785.324.000 ARS).
- Otros gastos: todo el resto (Administración, Organización de Espectáculos, Gastos Generales, Fútbol Juvenil, Otros Deportes, Basket, Comerciales, Socios, Eventuales) (111.846.180.000 ARS).

No se incluyó deuda (gross debt / caja) para este ejercicio porque el resumen económico del presupuesto no la desglosa; queda en 0 con una nota aclaratoria visible en el sitio. Tampoco hay intereses ni impuestos por separado (ya están adentro de "Otros gastos"). El resultado que da esta reconstrucción (~$3.420 millones ARS) coincide con el Resultado Económico oficial ($3.402.243.000), lo que confirma que el mapeo no perdió ni duplicó ningún rubro.

**Conversión a USD**: se usó el promedio entre el dólar de inicio y cierre del ejercicio que trae el propio presupuesto: ($1.480 + $1.840) / 2 = $1.660 por USD. Esto es distinto del FX_RATE placeholder (1.450) que usa el resto del sitio para el toggle USD/ARS, porque ese toggle convierte números ya en USD hacia ARS, mientras que acá había que convertir un dato real en ARS hacia USD antes de cargarlo al modelo. Quedó documentado en el propio código y en un aviso que aparece en el sitio cuando se mira el Ejercicio 2027.

**Limitación importante a tener en cuenta**: comparar el Ejercicio 2027 (real, del presupuesto oficial) contra ejercicios anteriores (2018-2025, todos placeholder) mezcla un dato real con datos inventados. Las columnas de variación y variación % que aparecen al comparar van a reflejar esa mezcla, no una comparación real año contra año. Esto se resuelve del todo recién cuando se carguen los balances reales de los ejercicios anteriores (pendiente, ver to-do de conseguir balances oficiales en bocajuniors.com.ar/club/presupuesto).

## Versión 6 del MVP: Revenue del estado de resultados con acordeones, y Ejercicio 2024 en cero

Dos cambios en la sección Finanzas, dentro de la card "Estado de resultados" (P&L):

1. **Las 4 líneas de Revenue son clickeables**: Cuotas Sociales, Matchday, Broadcasting y Comercial. Cada una tiene una flechita: al hacer clic se despliega, debajo de esa fila, el desglose de cómo se compone ese número (por ejemplo, Cuotas Sociales se abre en Socios Activos, Adherente AMBA, Socios Interior, etc.). La fila "Revenue" (el subtotal en negrita) no es clickeable, queda como total fijo.
   - Para el **Ejercicio 2027** (Presupuesto oficial 2026/27) el desglose es real, sacado del acordeón de Apertura de Ingresos y convertido a USD con el mismo promedio $1.660 que se usó para los totales.
   - Para cualquier otro ejercicio (todos placeholder), al abrir la fila aparece el aviso "Sin desglose disponible para este ejercicio (dato placeholder, pendiente de cargar)", para dejar en claro que falta cargar el dato real, no que no existe la funcionalidad.
   - Técnicamente esto se hizo con JS (`toggleRevenueBreakdown`), no con `<details>` nativo, porque el desglose vive dentro de una tabla y `<details>` no es válido como fila de tabla.

2. **Ejercicio 2024 puesto en cero a propósito**: todos los rubros de `yearsRaw[2024]` (matchday, broadcasting, comercial, salarios, deuda, todo) están en 0. La idea es que salte a la vista que ese ejercicio está pendiente de cargar con datos reales, en vez de tener un número placeholder que se pueda confundir con dato real. Esto afecta a "Año a año" (Ejercicio 2024) y a la comparación dentro de la gestión Riquelme si se usa 2024 como año base.

## Versión 7 del MVP: Revenue reestructurado con las 9 categorías oficiales

Guido pidió reemplazar el esquema de Revenue (que hasta la v6 era Cuotas Sociales + Matchday + Broadcasting + Comercial, con Matchday/Broadcasting inventados combinando varias cosas) por la estructura exacta que usa el club en el Presupuesto Económico: Cuotas Sociales, Comerciales, Exhibición de Espectáculos Deportivos, Abonos, Diversos, Otros deportes, Basket Profesional, Futbol Juvenil, Futbol Femenino, sumando a Revenue/Total Ingresos. Instrucción explícita: no gastar tiempo tratando de encajar esto contra el esquema anterior.

Cómo quedó:

- **Ejercicio 2027** (Presupuesto oficial 2026/27): las 9 categorías tienen sus valores reales, convertidos a USD con el mismo promedio $1.660. Cada categoría es clickeable y su desglose real (sacado de Apertura de Ingresos) aparece al abrir. Por ejemplo, "Exhibición de Espectáculos Deportivos" se abre en Torneo Oficial, Copa Libertadores, Giras y Amistosos, Copa Argentina.
- **Resto de los ejercicios (todos placeholder)**: no se inventó categoría por categoría. Se reusó lo que ya existía: el viejo "commercial" pasó a ser "Comerciales", el viejo "matchday + broadcasting" combinados pasaron a ser "Exhibición de Espectáculos Deportivos" (aproximación, porque conceptualmente ambos son "plata de jugar partidos"), el viejo "otherOperatingIncome" pasó a ser "Diversos". Abonos, Otros deportes, Basket Profesional, Futbol Juvenil y Futbol Femenino quedaron en 0 para esos ejercicios porque no había con qué llenarlos sin inventar. Al abrir esas filas en años placeholder, sigue apareciendo el aviso de "sin desglose disponible, pendiente de cargar".
- Se sacó la fila separada "Otros ingresos operativos" que existía entre Revenue y Salarios: ese concepto ahora está adentro de Revenue como la categoría "Diversos", así que el Revenue total ya incluye todo lo que antes se sumaba después. El resultado final (EBITDA, resultado operativo, etc.) no cambió en magnitud, solo se reorganizó dónde vive cada número.
- El gráfico de dona "Composición de ingresos" también se actualizó para mostrar las 9 categorías (agrupando Otros deportes + Basket + Juvenil + Femenino en una sola porción "Otros" para que no quede ilegible).

## Versión 8 del MVP: corrección de fondo, los números del Ejercicio 2027 ahora coinciden exacto con el documento oficial

Guido detectó que ni el total cerraba. La causa raíz: en la v7, los valores del Ejercicio 2027 se guardaban ya convertidos a USD (con redondeo a 2 decimales en cada categoría), y el toggle USD/ARS del sitio los reconvertía a ARS con el tipo de cambio placeholder del resto del sitio ($1.450), que no es el mismo que se usó para convertirlos a USD la primera vez ($1.660). Ida y vuelta con dos tipos de cambio distintos = números que no cierran.

Arreglo de fondo:

- El Ejercicio 2027 ahora se guarda en `yearsRaw` en **ARS millones exactos**, calculados directo como pesos oficiales ÷ 1.000.000, sin ninguna conversión al cargar el dato. Cada categoría de Revenue y cada rubro de gasto es el número literal del documento oficial.
- Se agregó un concepto de "moneda nativa por ejercicio" (`yearMeta`): los ejercicios placeholder siguen en USD (con el tipo de cambio placeholder $1.450 para pasarlos a ARS, como siempre), pero el Ejercicio 2027 está en ARS con su propio tipo de cambio promedio $1.660 para pasarlo a USD.
- La conversión a la moneda que el usuario elige ver (`toDisplayValue`) pasa a hacerse en pantalla, en el momento de renderizar, nunca al cargar el dato. Si la moneda nativa del ejercicio coincide con la elegida, no hay conversión: se muestra el número tal cual, así que en ARS el Ejercicio 2027 siempre va a coincidir centavo a centavo con el Presupuesto Económico oficial.
- Esto también corrigió el desglose de cada categoría al hacer clic (antes también estaba pre-convertido a USD con redondeo; ahora son los montos exactos en ARS del acordeón de Apertura de Ingresos), el gráfico de tendencia, el gráfico de composición, las stat cards de Finanzas, y Comparar Gestiones (que compara la gestión Riquelme, cuyo último ejercicio ahora es el 2027, contra Ameal/Angelici, que siguen en USD placeholder).

Verificación hecha antes de subir el cambio: la suma de las 9 categorías de Revenue da $239.392.104.000 exacto (coincide con TOTAL INGRESOS del documento), y el resultado reconstruido (Revenue - Gastos - Amortizaciones) da $3.402.243.000 exacto (coincide con el Resultado Económico oficial).

## Versión 9 del MVP: alineación del desglose

Los números dentro de cada acordeón de Revenue quedaban muy corridos a la derecha, porque el desglose se armaba como una tabla nueva metida adentro de una sola celda (colspan 5), y esa tabla anidada repartía su propio ancho sin relación con las columnas de la tabla principal. Se cambió para que cada línea del desglose sea una fila más de la misma tabla del estado de resultados (usando `data-group` en vez de un id único, para poder mostrar/ocultar varias filas a la vez), así el navegador calcula el ancho de columnas una sola vez y el número de cada rubro queda exactamente debajo del subtotal.

Alternativas de nombres de navegación consideradas:

1. **Elegida en el MVP**: Inicio / Finanzas / Mercado de Pases / Comparar Gestiones / Fuentes. Separa el análisis financiero general del de pases, que es el tema que más engancha a los hinchas y merece su propia sección.
2. **Alternativa por audiencia**: Inicio / Números del Club / Plantel y Pases / Gestiones / Metodología. Más informal, "Números del Club" en vez de "Finanzas" baja la barrera de entrada para quien no lee balances.
3. **Alternativa por tiempo**: Inicio / Año a Año / Por Gestión / Pases / Fuentes. En vez de separar por tema (finanzas vs. pases), separa directamente por cómo se quiere mirar el tiempo, y el filtro de tema queda adentro de cada vista. Más simple de navegar pero mezcla temas distintos en una sola pantalla.

Recomendación: quedarse con la opción 1 para el MVP porque separa claramente "plata del club" de "mercado de pases" (dos preguntas distintas que hace un hincha), y usar el toggle interno para resolver gestión vs. año a año sin multiplicar botones de nav.

## Deploy: notas para no generar conflicto entre los dos sitios

Con repos separados en GitHub, Netlify no genera ningún conflicto entre este sitio y el profesional: cada repo se conecta como un "site" distinto en la cuenta, con su propio build, su propio subdominio `*.netlify.app` y su propio dominio custom si se agrega uno. No hace falta hacer nada especial ahora.

Sí conviene, antes del primer deploy real:

- Crear el repo de este proyecto como repo nuevo y separado (no como carpeta dentro del repo del sitio profesional), para que cada deploy dispare solo sobre su propio sitio.
- Si en algún momento se quiere un dominio propio tipo bocaennumeros.com, comprarlo aparte y no reusar el dominio del sitio profesional ni sus DNS.
- Nombrar el site en Netlify con algo distinguible (ej. "numeros-de-boca") para no confundirlo en el dashboard con el sitio profesional.
- No compartir variables de entorno ni build hooks entre ambos sites, aunque estén en la misma cuenta.

## To-dos para Guido

1. Mirar 2-3 análisis de Swiss Ramble de un club comparable, para ver cómo estructuran visualmente una serie de ingresos/gastos y qué gráficos usan. Sirve como referencia de diseño y de rigor, no para copiar contenido.
   - [Chelsea Finances 2024/25](https://swissramble.substack.com/p/chelsea-finances-202425)
   - [Paris Saint-Germain Finances 2024/25](https://swissramble.substack.com/p/paris-saint-germain-finances-202425)
   - [Club Overviews Premier League 2022/23 (10 años de data)](https://swissramble.substack.com/p/club-overviews-premier-league-202223)
2. Conseguir los balances oficiales de Boca de los últimos 8 ejercicios (y actas de asamblea si están disponibles), para reemplazar los placeholders del MVP con datos reales.
   - [Presupuesto y balances oficiales de Boca](https://www.bocajuniors.com.ar/club/presupuesto)
3. Definir la lista final de 10-15 métricas para el MVP y escribir su definición y unidad de medida, para mantener el sitio consistente y neutral desde el día uno.
   - Sin link externo. Usar la sección "Lista extensiva de qué analizar" de este mismo documento.
