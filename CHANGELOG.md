# Changelog

Este archivo es la versión condensada del historial de `finance-of-sports`, versión
por versión, desde la Versión 10 (cuando el sitio pasó de ser solo de Boca a
multi-club) hasta hoy. Son bullets terses de qué cambió, no el porqué completo.
Para el razonamiento narrativo detrás de cualquier entrada (qué se probó, qué se
descartó, cómo se encontró cada bug) ver `finance-of-sports-project.md`. Para el estado
actual del proyecto (qué hay armado, qué es real vs. placeholder por club) ver
`ESTADO.md`, y para la to-do list vigente, `TODO.md` — hasta la Versión 137 las
dos cosas vivían en un comentario HTML al principio de `index.html`.

---

## Versión 10 — El sitio empezó a ser multi-club (River y Racing agregados)

- Sitio pasa de ser solo de Boca a multi-club: se agregan River Plate y Racing con un esquema de datos normalizado (`data/clubs.js`, `category-map.js`, `river-data.js`, `racing-data.js`).
- Boca no se tocó (sigue con su motor propio); River/Racing usan un motor genérico nuevo.
- Racing usa datos reales de prensa (agrupados en 2 rubros grandes); River queda 100% placeholder, sin fuente confiable todavía. Banner amarillo para datos no oficiales.
- `verifyTieOuts()` nuevo: verifica automáticamente que los rubros cierren contra el total oficial conocido.
- Selector de club nuevo; toggle USD/ARS oculto para River/Racing (sin cotización propia todavía).

## Versión 11 — Todas las pestañas son multi-club, y se agregó el stub de Mi Cuenta

- Selector de club movido al header, ahora aplica a las 6 pestañas (no solo Finanzas).
- River y Racing suman una segunda gestión cada uno (D'Onofrio, Blanco), con resultados deportivos reales pero finanzas placeholder.
- Pestaña nueva "Mi Cuenta", stub vacío para futuro paywall.
- Copy de Inicio/Resultados/Fuentes generalizado para no sonar Boca-only.

## Versión 12 — Rename a "Tu club en números" y ajuste de header

- Rename del sitio de "Boca en Números" a "Tu club en números" (title, logo, mailto).
- Header comprimido (paddings/fonts) para mantener una sola fila con más elementos.
- Bloque de estado de `index.html` reescrito para reflejar el sitio multi-club.

## Versión 13 — Ejercicio 2025 de Boca pasó de placeholder a balance oficial auditado

- Se cargó el primer balance real auditado de Boca (Ejercicio 2025, Memoria y Balance N°121), extraído de un PDF escaneado de 149 páginas.
- Tabla completa Revenue→EBITDA→Resultado reconstruida con números reales, cierre exacto verificado contra el documento impreso.
- Tipo de cambio: dólar mayorista de cierre del ejercicio ($1.203), no promedio.

## Versión 14 — Free tier muestra cada club "tal cual lo reporta", y CTA de Premium

- Finanzas deja de normalizar los números a una estructura compartida; cada club/ejercicio se muestra con sus categorías reales, en acordeones.
- 4 funciones de render viejas se reemplazan por una sola genérica para los 3 clubes.
- Bug real corregido: en River/Racing la amortización/depreciación se contaba dos veces.
- CTA de Premium agregado (teaser, sin paywall real; eliminado en V30).
- Regla nueva: todo PDF se transcribe completo a Markdown antes de extraer datos.

## Versión 15 — Primer balance real de River (Ejercicio 2024), y hallazgo clave para Racing

- Primer balance real de River cargado (Ejercicio 2024), obtenido de una réplica no oficial (tuRiver), ya que River nunca publica sus estados contables en su propio dominio.
- Categorías reales de River cargadas tal cual, sin normalizar a Boca; "Salarios/Ingresos" da 0% por límite de la fuente.
- Discrepancia real entre dos valores de "Depreciación" en el mismo documento, resuelta por aritmética antes de cargar.
- Racing: 3 documentos extraídos pero no cargados todavía. Hallazgo: los 2 ejercicios reales de Racing dan déficit, muy distinto del placeholder anterior (que mostraba superávit).

## Versión 16 — Los 3 datos reales de Racing quedaron cargados al sitio

- Se cargaron los 3 documentos extraídos en la V15: Ejercicio 2024 y 2025 (balances auditados reales) y Presupuesto 2026 (reemplazando el dato de prensa).
- Conversión a USD con tipo de cambio de cierre de cada ejercicio (balances) o promedio declarado (presupuesto).
- `grossDebt` de Racing = Total del Pasivo completo (no separa deuda financiera aparte), documentado como criterio propio del club.

## Versión 17 — Reorganización de carpetas de PDFs, ya no escalaba una por club

- Carpetas sueltas por club (`racing-pdfs/`, `river-pdfs/`) reemplazadas por `PDFs/<país>/<club>/` y `pdf-extracts/<país>/<club>/` (reemplazado de nuevo en V28).
- Solo reorganización de archivos, ningún dato cambió.

## Versión 18 — Ejercicios en formato AAAA/AAAA, espaciado de Finanzas, y acordeones redundantes fuera

- Ejercicios pasan a mostrarse como "Ejercicio AAAA/AAAA" en vez de solo el año de cierre.
- Espaciado vertical de Finanzas unificado (18/20px → 24px parejo).
- 2 acordeones redundantes del Presupuesto 2026/2027 de Boca eliminados (su info ya estaba disponible en la tabla principal).

## Versión 19 — Toggle Año-a-año por defecto, más espacio todavía, y "Apertura de Gastos" migró al detalle

- Toggle de Finanzas invertido: "Año a año" pasa a ser el default.
- Espaciado subido de 24px a 32px, más aire entre título y contenido de cada card.
- El acordeón "Apertura de Gastos" (jerarquía de hasta 4 niveles, ~434 líneas) se migró a la tabla principal, con desglose recursivo nuevo y conversión a USD/ARS en cualquier nivel.

## Versión 20 — 3 ejercicios históricos de Racing pre-Blanco (2008/09, 2009/10, 2010/11)

- Se cargaron los 3 ejercicios más antiguos y simples de Racing (pre-Blanco), con categorías reales de Recursos y Gastos.
- Se corrigió una asunción previa: no todos los PDFs de Racing tienen texto extraíble (buena parte del archivo son escaneos).
- Conversión a USD parcialmente interpolada por falta de cotización exacta de esos años.
- Gestión de esos 3 años no atribuida (presidencia incierta, Racing venía de una quiebra).

## Versión 21 — Card "Presupuesto 2026/2027" dividido en 3, y trendChart ya no inventa datos

- El card único de presupuesto de Boca se dividió en 3 (Supuestos, Presupuesto Financiero, Presupuesto de Inversiones).
- El gráfico de evolución deja de graficar valores placeholder inventados; esos años quedan con barra vacía.
- Aclarado que solo el Ejercicio 2025 de Boca tiene deuda real cargada; el resto (incl. 2027) da 0 por falta de desglose, no porque la deuda sea cero.

## Versión 22 — Bug real en el CDN de Chart.js (nunca se veían los gráficos), y 8 ajustes de UX en Finanzas

- Bug real corregido: la versión de Chart.js pineada (4.4.4) nunca existió en el CDN, así que los gráficos nunca cargaban para ningún visitante; corregido a 4.5.1.
- 8 ajustes de UX: columnas de comparación ocultas cuando no aplican, fuente duplicada consolidada, aviso nuevo cuando "Deuda=Caja=0" es por falta de desglose (no deuda real cero), waterfall de flujo de caja, alineación de montos en tablas.

## Versión 23 — Bug real de "Gastos" descalzado con la tabla, y 5 ajustes más de copy/UX en Finanzas

- Bug real corregido: el stat "Gastos" de arriba no incluía amortización de pases/depreciación mientras la tabla de abajo sí, dando dos números distintos; ahora comparten una sola fuente de verdad.
- Ajustes de copy y gráficos: fix del título "$" rotado en el eje Y, leyenda del pie/doughnut con %, waterfall del Presupuesto Financiero responde al toggle USD/ARS.

## Versión 24 — Bug real de alineación en los acordeones de Inversiones, y % de vuelta al gráfico (no a la leyenda)

- Bug real corregido: los montos de los acordeones de Presupuesto de Inversiones no alineaban entre sí (problema de flexbox con 3 hijos).
- El % de cada porción del gráfico de torta pasa a dibujarse encima de la porción; leyenda reordenada a una columna alineada.

## Versión 25 — El "$" dibujado a mano en el canvas salía roto, reemplazado por un `<span>` de HTML normal

- El símbolo "$" del eje Y (dibujado a mano en canvas) se veía roto; reemplazado por un `<span>` de HTML normal.

## Versión 26 — Bug real de orden en el selector de Año (River/Racing), y fuente dinámica por club

- Bug real corregido: el selector de año de River/Racing arrancaba siempre en el ejercicio más viejo; ahora ordena descendente y recuerda el año más cercano al cambiar de club.
- Nota de fuente de "Estado de resultados" pasa a ser dinámica por club (antes citaba siempre a Boca).

## Versión 27 — Bug real, la fuente de "Supuestos/Presupuesto Financiero/Inversiones" quedaba visible en Racing/River

- Bug real corregido: una nota de fuente 100% de Boca quedaba visible con cualquier club seleccionado, por no estar incluida en la clase de show/hide por club.

## Versión 28 — PDFs/ y pdf-extracts/ se unificaron en Clubes/<País>/<Club>/ (el PDF y su transcripción, juntos)

- Los dos árboles de carpetas se unificaron en `Clubes/<País>/<Club>/`, con el PDF y su transcripción juntos; nombres de carpeta capitalizados.
- Solo movimiento de archivos, ningún dato cambió.

## Versión 29 — Toggle "Formato simplificado" en Estado de resultados (solo Boca por ahora)

- Toggle nuevo "Formato del club / Formato simplificado" para Boca: reclasifica los datos ya verificados a categorías uniformes, sin inventar ni recalcular nada.
- No se pudo separar "Salarios de jugadores" de "cuerpo técnico"/"primas" para todos los ejercicios (solo 2027 tiene ese detalle).
- Tensión de producto sin resolver: el CTA de Premium seguía prometiendo esta funcionalidad, ahora gratis (resuelto en V30).

## Versión 30 — Bug real de proceso, se había cargado un resumen del PDF 2027 en vez de transcribirlo antes, y se perdió detalle real. También: se sacó el botón Premium

- Bug real de proceso: al cargar el presupuesto 2027 de Boca se saltó el paso de transcribir el PDF completo, y "Torneo Oficial" quedó resumido, perdiendo el desglose real de TV/Recaudación/Premio.
- Corregido de raíz: PDF transcripto completo, desglose real restaurado sin cambiar ningún total.
- Botón CTA Premium eliminado (el toggle "Formato simplificado" queda gratis, decisión de producto de Guido).

## Versión 31 — Menos ruido en "Formato simplificado" (ingresos unidos, gastos desagregados), y columna "% del total" en las dos vistas

- Ingresos: dos categorías chicas se unieron en una ("Otras secciones deportivas y otros ingresos").
- Gastos: "Otros gastos" (Ejercicio 2027) se desagregó en 3 categorías más chicas y legibles.
- Columna nueva "% del total" agregada en toda la tabla, calculada contra el total de su propia sección.

## Versión 32 — Toggle USD/ARS y Formato del club/simplificado para Racing y River (antes solo Boca), más el Presupuesto 2026/27 de Racing

- Los toggles USD/ARS y Formato del club/simplificado se extienden a Racing y River.
- Datos de River/Racing reescritos para guardar montos en ARS nativo en vez de ya-convertidos a USD; se usa siempre el tipo de cambio que declara el propio documento.
- Bug real corregido: el stat "Gastos" de Racing/River se convertía dos veces a USD.
- Presupuesto 2026/27 de Racing cargado; investigado (sin cargar) el ejercicio 2025/26 de Boca, que todavía no tiene balance oficial.

## Versión 33 — Card "Supuestos" para Racing (premisas del Presupuesto 2026/27), inspirada en la de Boca

- Card nueva con las premisas macroeconómicas y políticas de ingresos/gastos del presupuesto de Racing, mismo patrón que la de Boca.
- Bug real corregido: la card aparecía visible con Boca seleccionado en la carga inicial (el show/hide por club solo corría al cambiar de club).

## Versión 34 — El card "Supuestos" pasa a ser un solo card genérico, siempre presente para cualquier club/ejercicio, regla nueva no opcional

- Los 2 cards estáticos de Supuestos (Boca, Racing) se unifican en uno genérico, siempre visible, con mensaje explícito si no hay premisas declaradas.
- Regla nueva: el card de Supuestos siempre tiene que estar presente.

## Versión 35 — Misma regla para "Presupuesto Financiero" y "Presupuesto de Inversiones", siempre presentes, genéricos, explícitos si no hay dato

- Mismo patrón que V34 aplicado a Presupuesto Financiero y Presupuesto de Inversiones: pasan a ser genéricos y siempre visibles.
- Racing recibe datos reales para ambos cards (waterfall de caja simple, e inversiones sin desglose por obra).

## Versión 36 — Regla nueva, la fuente nunca va adentro de un card individual

- Se sacó la cita de fuente que había quedado repetida dentro de cada card individual; la fuente vive solo en 3 lugares fijos del sitio.

## Versión 37 — Bug visual real, el "$" del eje Y del gráfico de barras quedaba tapado por el tick más alto

- Bug real corregido: el símbolo "$" del eje Y se superponía con el tick más alto de Chart.js; se agregó padding superior al área de trazado.

## Versión 38 — Bug real de categorización, Racing 26/27 tenía TV, marketing y salarios "enterrados" adentro de items, en $0 en Formato simplificado

- Bug real corregido: 9 líneas reales de fútbol de Racing (TV, marketing, salarios, etc.) estaban cargadas como sub-ítems anidados en vez de líneas de primer nivel, así que "Formato simplificado" las mostraba en $0 pese a tener plata real.
- Promovidas a líneas de primer nivel; regla nueva: siempre revisar "Formato simplificado" tras categorizar un ejercicio nuevo, para detectar buckets en $0 con plata real escondida.

## Versión 39 — Bug real de layout, la columna del ejercicio en "Estado de resultados" se corría de lugar según club/formato

- Bug real corregido: la columna del ejercicio no arrancaba siempre en el mismo lugar horizontal; se agregó ancho fijo por columna.
- Regresión encontrada y corregida en la misma sesión: el fix dejaba una franja muerta a la derecha en modo "Año a año"; resuelto reescribiendo el ancho de columnas dinámicamente según el modo.

## Versión 40 — Acordeón de control en "Formato simplificado" (Boca) + Ejercicio 2025/2026 agregado al selector, en espera

- "Formato simplificado" de Boca ahora es expandible fila por fila, mostrando de qué campos nativos sale cada número reclasificado.
- Ejercicio 2025/2026 de Boca agregado al selector, en cero, con mensaje explícito de "esperando que Boca lo publique" (no se cargó la cifra de prensa).

## Versión 41 — Tooltip de glosario en filas de desglose + 3 cards "Ingresos y Egresos por Torneo" (Boca 2027)

- Tooltip de glosario agregado a filas técnicas del desglose (ej. amortización de pases "Compras" vs. "Inferiores").
- 3 cards nuevos para Boca 2027: Ingresos y Egresos por torneo (Copa Libertadores, Liga Profesional, Copa Argentina), con instancia presupuestada de cada uno; aclarado que "Gastos" ahí es solo logística, no sueldos del plantel.

## Versión 42 — Sin em dashes de acá en adelante, bug real de "Ingresos" en Boca 2024/2025, acordeón para River/Racing, y los 4 cards de presupuesto ahora se esconden en vez de mostrar "no hay"

- Se eliminaron las 550 apariciones del em dash del sitio (regla nueva: no usarlo más).
- Bug real corregido: el stat "Ingresos" de arriba de Finanzas no coincidía con ninguno de los 2 números de la tabla de abajo (Boca 2025); ahora usa el mismo total ya calculado por la tabla.
- Acordeón de control (V40) extendido a River/Racing.
- Regla invertida: los 4 cards de presupuesto ahora se esconden si no hay dato, en vez de mostrar un mensaje.

## Versión 43 — Ancho fijo para el select de "Año" (cambiaba de tamaño según club/ejercicio)

- Bug real corregido: el ancho del selector de Año cambiaba según club/ejercicio; se fijó a 300px.

## Versión 44 — Ancho fijo también para "Gestión", y nuevo orden de Comercial/Abonos en Formato simplificado (River/Racing)

- Mismo fix de ancho fijo aplicado al selector de Gestión (200px).
- Orden de filas de "Formato simplificado" (River/Racing) reordenado: Comercial y Abonos suben a 2da y 3ra posición.

## Versión 45 — "Partidos y competencias" (River/Racing) renombrado a "Estadio: recaudación de partidos", mismo nombre que Boca, sube a la 3ra fila

- Fila renombrada para usar el mismo vocabulario que Boca, sin cambiar categoría ni cifras.

## Versión 46 — Regla permanente, "Formato simplificado" usa la categorización de Boca para todos los clubes; discrepancias reales encontradas, consultadas a Guido, y resueltas

- Regla permanente: "Formato simplificado" de cualquier club usa la misma categorización/vocabulario que Boca; discrepancias se consultan antes de resolver.
- 3 discrepancias reales encontradas: River deja sin desglosar 66,7% del revenue (sin tocar, a criterio de Guido); Racing separa "Premios por competencias" en categoría nueva; catch-all de gastos se deja igual por ahora (solo renombrado).

## Versión 47 — El orden de "Formato simplificado" (River/Racing) también tiene que calzar con Boca, y se esconde "Fútbol profesional (sin desglosar)" cuando está en $0

- Orden de buckets de Ingresos reordenado para calzar exacto con el de Boca.
- La fila catch-all "Fútbol profesional (sin desglosar)" se esconde cuando da $0.

## Versión 48 — Los labels tienen que ser idénticos, no solo parecidos ("Televisión" vs. "Televisión / Derechos de TV"), y gotcha de verificación con grep

- Bug real corregido: el label "Televisión / Derechos de TV" del motor genérico no era idéntico al "Televisión" de Boca; unificado.
- Gotcha de testing documentado: un patrón de grep con cuantificador de caracteres fallaba en silencio cerca de acentos, dejando pasar em dashes sin detectar.

## Versión 49 — "Estadio" y "Abonos" son 2 conceptos distintos, no el mismo repartido en 2 filas

- Distinción aclarada: "Estadio" = venta partido por partido, "Abonos" = pago de temporada completa. Se sacó "Entradas /" del label de Abonos (mismo valor, solo nombre).

## Versión 50 — "(Presupuestado)" ya no se superpone con "% del total" en el header de la tabla

- El sufijo "(presupuestado)" cambió a prefijo "Presupuesto" (más corto), evitando que el texto invada la columna de al lado.

## Versión 51 — Limpieza de arquitectura antes de seguir agregando clubes (fix de category-map.js, separación cálculo/render, y lazy-loading de River/Racing)

- Primera vez con control de versiones (git) propio para el repo (entonces llamado `numeros-de-boca`, renombrado a `finance-of-sports` en 2026-09-13).
- Fix de nombre de categoría inconsistente (`player_sales`).
- ~2530 líneas separadas del script principal en 3 archivos nuevos (`data/boca-data.js`, `js/finanzas-calc.js`, `js/finanzas-render.js`), sin cambiar código.
- River/Racing pasan a lazy-load (ya no se bajan siempre); 2 bugs reales de referencia a variables no definidas encontrados y corregidos en el proceso.

## Versión 52 — Homologación de "Compra de jugadores" de Racing con Boca en Formato simplificado

- Líneas reales de costo de transferencias de Racing (hasta ahora en el catch-all "Otros gastos") re-categorizadas a "Compra de jugadores", mismo vocabulario que Boca.
- Bug real corregido: `verifyTieOuts()` de Racing 2026/2027 no sumaba la categoría nueva, dando un desvío.

## Versión 53 — Filas de gastos siempre iguales entre clubes + 3 categorías nuevas para bajar el catch-all "Otros gastos" de Racing (de 64% a 18%/0%)

- 3 categorías nuevas de gasto agregadas para que las filas de "Formato simplificado" sean siempre las mismas entre clubes.
- Catch-all "Otros gastos" de Racing bajó de 64% a 18%/0% según ejercicio.
- Bug real más serio corregido: `computeYearGeneric()` no sumaba las 3 categorías nuevas al total de gastos, haciendo que Racing mostrara superávit en ejercicios con déficit real.

## Versión 54 — Sacar "Intereses netos"/"Impuestos" del card "Estado de resultados", igual para los 3 clubes y cualquier año

- Filas sueltas de "Intereses netos"/"Impuestos" (inconsistentes entre clubes/años) se sacaron de la tabla; el monto se sigue sumando al resultado final, solo deja de mostrarse como fila (revertido parcialmente en V60-61).

## Versión 55 — Sin ningún copy después de la tabla en "Estado de resultados"

- Se sacaron los 2 párrafos de nota (unidad de moneda, tipo de cambio) que quedaban después de la tabla; esa info ya vive en el card Supuestos y en Fuentes.

## Versión 56 — Dropdown "Año" con sufijo estandarizado (3 palabras, no más) + tabs de Pases/Resultados/Comparar ocultos por ahora

- Sufijo del dropdown "Año" estandarizado a exactamente 4 variantes posibles.
- Bug real corregido: Boca (club default) mostraba sufijos viejos en la carga inicial hasta el primer cambio de club.
- Tabs de Mercado de Pases, Resultados y Comparar Gestiones ocultados del nav (reversible, contenido no borrado).

## Versión 57 — Columna "Balance" para ejercicios con Presupuesto y Balance a la vez, se saca la comparación año-contra-año

- Se sacó la comparación "Ejercicio Anterior"/Var./Var.% entre años distintos.
- Mecanismo nuevo (overlay) para mostrar Balance vs. Presupuesto del MISMO ejercicio como 2da columna, reusando esa infraestructura.

## Versión 58 — Primer ejercicio real con Presupuesto y Balance a la vez (Racing, Ejercicio 2019/2020)

- Primer caso real del mecanismo de overlay: Racing 2019/2020 cargado con balance real y presupuesto real del mismo ejercicio.
- Bug real de proceso corregido: un escaneo con inclinación diagonal desplazaba columnas al leerlas; corregido con deskew automático.
- Caso de criterio consultado con Guido: una fila del presupuesto era un acumulado de 3 líneas, no un valor propio.

## Versión 59 — Formato simplificado del overlay compara categoría por categoría, se sacan Var./Var.%

- Bug real corregido: la columna Presupuesto en Formato Simplificado quedaba vacía fila por fila; ahora bucketiza igual que la columna primaria.
- Columnas Var./Var.% eliminadas del todo de la tabla.

## Versión 60 — "Estado de resultados" reconcilia a simple vista + sin scroll + % y Resultado Neto propios de Presupuesto

- Bug de presentación corregido: Ingresos-Gastos no reconciliaba a simple vista contra Resultado Neto porque la fila de "Intereses netos" se había sacado en V54; se restaura cuando no es cero.
- Anchos de columna angostados para eliminar el scroll horizontal.
- Columna Presupuesto ahora tiene su propio % del total y Resultado Neto calculado (antes "—").

## Versión 61 — Headers legibles en 2-3 líneas a propósito, "Intereses netos"/"Int." siempre visibles, dropdown "Año" sin "Ejercicio " y con "(Balance)"

- Headers de tabla parten en el punto correcto (nunca mitad de palabra), 4 columnas numéricas con el mismo ancho.
- "Intereses netos" pasa a mostrarse siempre (aunque sea $0).
- Stat nuevo "Int." en los cards de arriba de Finanzas, para que Ingresos+Gastos+Int.=Resultado neto reconcilie a simple vista.
- Dropdown "Año" pierde el prefijo "Ejercicio" y suma "(Balance)" como 4ta opción explícita.

## Versión 62 — Nuevo ejercicio real de Racing, 2020/2021 (Ejercicio N° 119, irregular de 10 meses)

- Se cargó el balance real de Racing 2020/2021 (ejercicio irregular de 10 meses, transición de cierre agosto→junio).

## Versión 63 — Nuevo ejercicio real de Racing, 2017/2018 (presupuesto-only, último documento con texto extraíble del archivo)

- Se cargó el presupuesto de Racing 2017/2018 (sin balance todavía); criterio confirmado: cargar presupuesto-only está bien, no hace falta esperar el balance.
- Bug real corregido: 3 `sourceId` ya en uso desde versiones anteriores nunca tuvieron su entrada correspondiente en `clubs.js`.

## Versión 64 — Ejercicio 2017/2018 de Racing pasa a ser Presupuesto+Balance (segundo par del sitio, después de 2019/2020)

- Se cargó el balance real de Racing 2017/2018, completando el par con el presupuesto ya cargado (mecanismo de overlay, segundo caso real).

## Versión 65 — Header "Estado de resultados" nunca parte una palabra, y "Balance" para cualquier `official_balance_sheet`

- Regla permanente: ninguna palabra del header de la tabla se parte nunca, la columna overlay siempre lleva el año.
- Cualquier ejercicio `official_balance_sheet` (no solo Boca) pasa a mostrar el prefijo "Balance" en vez de "Ejercicio".

## Versión 66 — Nuevo ejercicio real de Racing, 2018/2019 (presupuesto-only, escaneo con tablas en landscape)

- Se cargó el presupuesto de Racing 2018/2019 (presupuesto-only), con OCR de tablas escaneadas en landscape (rotadas 90°).

## Versión 67-75 — Archivo completo de Racing cargado — todos los balances y presupuestos de Clubes/Argentina/Racing/ (Ejercicios 111 a 117)

- Se cargó el resto del archivo histórico de Racing (2012-2017): 2 presupuestos y 6 balances reales, completando el 100% del archivo oficial de racingclub.com.ar/informes/ (~24 documentos, 2009-2027).
- 2 ejercicios (2014, 2016) pasaron a ser Presupuesto+Balance (overlay).
- Hallazgo real: un cambio de auditor externo en 2016 reclasificó la exposición de 2015 en su comparativo (solo presentación, no un error); se dejó sin tocar el dato ya cargado.
- Presidencia de un ejercicio (2012/2013) quedó incierta, sin firma; gestión no atribuida a propósito.
- 20 checks nuevos de `verifyTieOuts()`, todos cierran exacto.

## Versión 76 — Inicio sin "MVP · datos de ejemplo", 3 gráficos de evolución (Ingresos/Gastos/Deuda), todos los ejercicios sin saltear ninguno

- Badge "MVP · datos de ejemplo" sacado de Inicio.
- 3 gráficos nuevos en Inicio (Ingresos, Gastos, Deuda neta por ejercicio), con el rango completo y continuo de años del club, en blanco los años sin dato real (sin saltear ninguno).

## Versión 77 — Los 4 stats de Inicio en español y en una línea, gráficos apilados por "Formato simplificado", clic lleva a Finanzas, sin "Cómo usar este sitio"

- Stats de Inicio traducidos/acortados para entrar en una línea.
- Los años con Presupuesto (sin balance) se muestran en color atenuado en los gráficos, aclarado en el tooltip.
- Clic en una barra del gráfico lleva directo a Finanzas con ese año seleccionado.
- Se sacó el card "Cómo usar este sitio".
- Ingresos y Gastos pasan a graficarse apilados por categoría de "Formato Simplificado".

## Versión 78 — Total y % arriba/adentro de cada barra, orden dinámico por magnitud, "No informado por el club" en las columnas vacías, período en 2 líneas, leyenda HTML alineada

- Total del año y % de cada categoría dibujados directo sobre las barras.
- Orden de categorías (y leyenda) ahora dinámico, de mayor a menor según el último ejercicio disponible.
- Columnas sin dato muestran un texto vertical "No informado por el club" en vez de quedar vacías sin explicación.
- Leyendas de los 2 gráficos apilados con HTML propio, alineadas entre sí.

## Versión 79 — Toggle USD/ARS universal (header), ya no solo dentro de Finanzas

- El toggle de moneda se mueve al header (al lado del selector de club), aplicando también a Inicio, no solo a Finanzas.

## Versión 80 — "Formato simplificado" pasa a ser el default de Finanzas

- Cambio de un solo estado inicial: Finanzas arranca en "Formato simplificado" en vez de "Formato del club".

## Versión 81 — Boca, se sacaron los años placeholder de Finanzas

- Los años placeholder de Boca (2018/2019/2021/2022/2023) se sacaron del selector de Finanzas (quedan 2024-2027); no se tocó Comparar Gestiones/Pases/Resultados, que siguen usando esos años.
- Documentado por qué Boca 2027 y Racing en transición a presupuesto no tienen deuda cargada (estructural: los presupuestos no traen balance patrimonial).
- Archivo nuevo `dudas-por-club.md` para preguntas pendientes por club, a modo de reach-out futuro.

## Versión 82 — Cuarto club del sitio, Vélez Sarsfield (Ejercicio 2025)

- Vélez Sarsfield se agrega como 4to club, con el Ejercicio 2025 (balance real auditado).
- Hallazgo estructural: el motor genérico tenía ternarios hardcodeados a solo river/racing; generalizado a 3 ramas para soportar un 3er club real.
- Mercado de Pases/Resultados/Títulos quedan vacíos a propósito (fuera de alcance de esta sesión).

## Versión 83 — Copy de Inicio, gestión de Berlanga confirmada, y criterio nuevo en dudas-por-club.md

- Se sacó ", sin opinión" del título/subtítulo de Inicio.
- Gestión de Berlanga (Vélez) confirmada por búsqueda (2023-2026), corregida en el sitio.
- Regla nueva: antes de anotar una pregunta en `dudas-por-club.md`, buscar primero si es un dato público fácilmente verificable.

## Versión 84 — Vélez Sarsfield, segundo ejercicio (2023/2024)

- Se cargó el Ejercicio 2023/2024 de Vélez (déficit real), mismo criterio de categorización que 2025.

## Versión 85 — Vélez Sarsfield, tercer ejercicio (2021/2022), y un año salteado a propósito

- Se cargó el Ejercicio 2021/2022 de Vélez; el 2022/2023 (escaneo, más caro de procesar) quedó documentado como pendiente, no cargado en silencio.
- Cambio de gestión detectado: este ejercicio es de Rapisarda, no de Berlanga.

## Versión 86 — Vélez Sarsfield, cuarto ejercicio (2020/2021)

- Se cargó el Ejercicio 2020/2021 de Vélez (déficit real, incluye subsidio ATP por pandemia).
- Bug real encontrado por `verifyTieOuts()`: faltaba una línea de gasto (Becas); corregido.

## Versión 87 — Vélez Sarsfield, quinto ejercicio (2019/2020, ejercicio de pandemia)

- Se cargó el Ejercicio 2019/2020 de Vélez (déficit real, en plena pandemia).

## Versión 88 — Vélez Sarsfield, sexto ejercicio (2018/2019)

- Se cargó el Ejercicio 2018/2019 de Vélez (superávit real).

## Versión 89 — Vélez Sarsfield, séptimo ejercicio (2017/2018)

- Se cargó el Ejercicio 2017/2018 de Vélez (superávit real); último ejercicio antes de que Argentina se considerara economía de alta inflación (sin RECPAM).

## Versión 90 — Vélez Sarsfield, octavo ejercicio (2022/2023), cargado vía OCR

- Se cargó el Ejercicio 2022/2023 de Vélez, el único escaneado, vía OCR con Tesseract (más barato que leer imagen por imagen con el Read tool).
- Verificado con 2 sumas manuales independientes antes de cargar.

## Versión 91 — Vélez Sarsfield, noveno ejercicio (2014/2015), vía OCR

- Se cargó el Ejercicio 2014/2015 de Vélez vía OCR; gestión de Raúl Gámez identificada.
- Bug real corregido en `verifyTieOuts()`: la fórmula de verificación fallaba cuando el "nonCash" neto era positivo (caso nunca visto antes); corregido en todos los checks del sitio.

## Versión 92 — Vélez Sarsfield, décimo ejercicio (2016/2017), vía OCR

- Se cargó el Ejercicio 2016/2017 de Vélez (déficit real), último ejercicio de la gestión de Gámez.

## Versión 93 — Vélez Sarsfield, undécimo ejercicio (2015/2016), vía OCR, rango completo sin huecos

- Se cargó el Ejercicio 2015/2016 de Vélez, completando 11 ejercicios consecutivos sin huecos (2014/2015 a 2024/2025).

## Versión 94 — Quinto club del sitio, Instituto Atlético Central Córdoba

- Instituto se agrega como 5to club, con el Ejercicio 2023/2024 (superávit real), 100% texto nativo sin necesidad de OCR.
- Pestaña Fuentes actualizada para reflejar los 5 clubes ya cargados.

## Versión 95 — Onboarding masivo, 6 clubes nuevos, de 5 a 11 clubes del sitio

- 6 clubes nuevos cargados con datos reales: Rosario Central, Independiente, Argentinos Juniors, Estudiantes de La Plata, San Lorenzo, Unión.
- 3 clubes revisados y descartados por no tener datos contables reales (Gimnasia y Esgrima LP, Talleres, Belgrano).
- Refactor de arquitectura: registro genérico (`CLUB_GENERIC_DATA`) reemplaza los ternarios hardcodeados por club, para que agregar un club nuevo no requiera tocar el motor.
- 2 bugs reales corregidos: una categoría de gasto mal etiquetada (existía solo como categoría de ingreso) hacía desaparecer plata del total en 2 clubes.
- Varias preguntas abiertas anotadas en `dudas-por-club.md` sin resolver a criterio propio (atribución de gestión, tipos de cambio ambiguos).

## Versión 96 — Bug de Boca vacío en la primera carga + regla de orden del dropdown de clubes

- Bug real corregido: Boca aparecía vacío en la primera carga de la página (`ReferenceError` por falta de `window.` en una variable global compartida entre clubes).
- Bug colateral corregido: el dropdown de clubes quedaba desincronizado del club realmente cargado.
- Regla nueva: el dropdown de clubes va siempre en orden alfabético ascendente.

## Versión 97 — Segundo ejercicio de San Lorenzo + 2 reglas nuevas de arquitectura (presupuestos)

- Se cargó el Presupuesto 2023/2024 de San Lorenzo (3er ejercicio del club).
- Regla nueva: el sitio reconstruye balances por temporada (jul-jun), nunca por año calendario; si un documento no permite reconstruir la temporada completa, no se carga (aplicado al presupuesto de Instituto, que quedó sin cargar).
- Regla nueva: secciones "extraordinarias" (financiamiento/capital) no se cargan como ingreso/gasto operativo.
- Precedente de categorización de Impuestos/Cargas sociales/Moratoria documentado para no re-investigar cada vez.

## Versión 98 — Bug grave encontrado y corregido, Argentinos Juniors estaba en pesos restated

- Bug grave encontrado: los 5 ejercicios de Argentinos Juniors (cargados en V95) venían de un documento en pesos ajustados por inflación (restated), no nominales, a diferencia de todos los demás clubes del sitio.
- Corregido: 3 balances reales (2015/16, 2016/17, 2017/18) OCReados y cargados con cifras nominales reales; 2015 reconstruido desde el comparativo.
- 1 discrepancia aritmética real del propio documento (2016) documentada y ajustada.

## Versión 99 — Backlog de OCR completo, San Lorenzo/Unión/Estudiantes LP al día

- San Lorenzo: de 3 a 8 ejercicios (2011-2017 consecutivos + 2024).
- Unión: de 1 a 4 ejercicios (2022-2025); `grossDebt`/`cash` sin cargar en 3 años por falta de balance patrimonial en el archivo disponible.
- Estudiantes de La Plata: se sumó el Ejercicio 2025 (primer déficit del club en los ejercicios cargados).
- `verifyTieOuts()` llega a 270 checks, todos cierran.

## Versión 100 — Dos barridos de sourcing en background, Primera Nacional y Sudamérica

- 2 agentes en background relevaron PDFs de clubes todavía no cargados: 4 de Primera Nacional (Los Andes con 13 balances, Ferro, Godoy Cruz, Temperley) y clubes de Chile/Brasil/Colombia/Perú.
- Tarea puramente de sourcing: PDFs descargados y documentados en `fuentes-por-club.md`, nada cargado a `data/*.js` todavía.

## Versión 101 — Segunda ronda de sourcing Sudamérica, 3 agentes en paralelo, mismo repo

- 3 clubes chilenos (Universidad Católica, Universidad de Chile, Colo-Colo) pasan a tener series casi completas (16-17 ejercicios cada uno).
- Brasil: Vasco recuperado pese a bloqueo del sitio oficial; 7 clubes nuevos con hits reales; bug de atribución corregido (un PDF de "Botafogo" era en realidad de un club homónimo distinto).
- Colombia se dispara de 1 a 7 clubes vía el portal de Supersociedades.
- Regla nueva: documentar también los intentos fallidos de sourcing (dónde se buscó y por qué no hubo resultado), no solo los éxitos.
- Sigue siendo sourcing puro, nada cargado al sitio todavía.

## Versión 109 — Primeros 4 clubes de Brasil cargados (Grêmio, Botafogo, Cruzeiro, Atlético Goianiense)

- Cuarto país con datos reales en el sitio: Grêmio (2024), Botafogo SAF (2024), Cruzeiro SAF (2025) y Atlético Goianiense (2025), 1 ejercicio cada uno — 8 clubes brasileños más quedan sourceados pero sin cargar, como to-do explícito (prioridad ancho-sobre-profundo: mejor 4 verificados a fondo que 12 apurados).
- `ejercicioLabel()`/`populateFinanzasSelectors()`/`inicioTooltipTitle()`/`inicioPeriodLabels()` generalizados con `isCalendarYearClub(clubId)` (nueva función en `js/finanzas-calc.js`, lee `clubs[clubId].fiscalYearStart`) para no mostrarle a un club de ejercicio calendario (Brasil: ene-dic, igual que México/Japón ya cargados) un rango de temporada estilo "2023/2024" que sería falso — resuelve el to-do que habían dejado abierto las cargas de Club América y Japón.
- Bug de datos encontrado al generalizar lo de arriba: `clubs.river.fiscalYearStart` decía `'01-01'` desde siempre (inofensivo mientras nada leía el campo) — corregido a `'09-01'` (el ejercicio real de River es sep-ago), verificado que no rompe el label de River.
- `BRL` ya estaba en `CURRENCY_META` desde la Versión 103 (el toggle de moneda genérico funciona para Brasil sin tocar `toDisplayValue()`).
- `verifyTieOuts()` pasa para los 4 clubes nuevos, sin regresiones en los clubes ya cargados (Argentina, México, Japón).

## Versión 102 — Boca migrada al motor genérico (mismo engine que el resto de los clubes)

- `data/boca-data.js` reescrito: `yearsRaw`/`computeYear()`/`simplifiedReportForBoca()`/`nativeFinancialsBoca`/`revenueBreakdown`/`expenseBreakdown`/`expenseSubBreakdown` se borraron; Boca ahora vive en `bocaRevenueLinesByYear`/`bocaExpenseLinesByYear`/`bocaFiscalYearMeta`, registrada en `CLUB_GENERIC_DATA.boca` igual que River/Racing/etc.
- Decisión confirmada con Guido: el "Revenue" de Boca ahora incluye ingresos por transferencias de pases (antes se excluían). Revenue 2025 pasa de $152.899,9M a $237.614,6M (Total de Recursos que el propio balance imprime en pág. 76) — un comentario viejo decía que excluirlas era "la convención del resto del sitio", lo cual era falso: los 8 clubes ya migrados suman su venta de jugadores a Revenue.
- Gastos 2025 reconstruidos departamento por departamento desde los anexos originales del balance (Clubes/Argentina/Boca/memoria-y-balance-2024-25.md) para separar "Remuneraciones y cargas sociales" del resto de cada área — el total de sueldos aislado así ($67.869,7M) coincide exacto con el que ya usaba el sitio.
- `finanzasYears`/`finanzasGestiones` (campos nuevos, opcionales, en `CLUB_GENERIC_DATA`): preservan el recorte de la Versión 81 (Finanzas de Boca solo muestra 2024-2027 y Riquelme) sin reintroducir código Boca-only en `finanzas-render.js`.
- `js/finanzas-calc.js`/`js/finanzas-render.js`: se borró todo el código Boca-only en paralelo (`yearMeta`, `bocaYearIsReal`, `computeYear`, `simplifiedReportForBoca`, `drawTrendChart`/`drawBreakdownChart`/`renderDebtBlock`/`renderFinanzasStatsFromComputed`/`updateFinanzasByGestion`/`updateFinanzasByAnio`), Boca pasa por las mismas funciones `...Generic` que todos los demás clubes.
- `verifyTieOuts()`: los 3 checks de Boca (Revenue 2027/2025, PAT 2025) ya no están hardcodeados, salen del mismo loop genérico que el resto — todos los officialTotalRevenue/officialTotalExpenses/officialPAT re-verificados exactos antes y después de la migración con un script Node.

## Versión 103 — Moneda generalizada a cualquier país (fundación para onboardear 90 clubes fuera de Argentina)

- `data/currency-map.js` (nuevo): `CURRENCY_META` por código ISO ({scale, unitSuffix}), reemplaza el hardcode binario 'ARS'/'USD' de `toDisplayValue()`/`fmtAmount()`/`fmtAmountPlain()` en `js/finanzas-calc.js`. Bug real corregido: antes de esto, cualquier moneda que no fuera literalmente 'ARS' pasaba SIN CONVERTIR y se etiquetaba "M USD" — habría mostrado números mal escalados con la unidad incorrecta para el primer club no-argentino/no-USD.
- El toggle de moneda del header (`#currencyToggleGlobal`) dejó de ser HTML estático — `populateCurrencyToggle(clubId)` lo arma en runtime desde `clubs[clubId].reportingCurrency` (campo que ya existía pero estaba inerte). Invariante documentado: el toggle de cualquier club es siempre [moneda nativa <-> USD], nunca 2 monedas no-USD directas — USD es el pivote universal.
- `fx` (en `fiscalYearMeta[year]`) reforzado como SIEMPRE el tipo de cambio que el documento declaró para ese cierre puntual, nunca reusable entre clubes/ejercicios ni comparable a una cotización externa — documentado explícitamente en `data/currency-map.js` y `club-data-mapping/SKILL.md`.
- "Formato del club"/"Formato simplificado" (`simplifyToggleWrap`) se desacopló del gate de moneda/país (compartía el mismo `isArgentineClub` por una conflación accidental desde la Versión 32) — siempre visible para cualquier club.
- Límite conocido documentado, a propósito no construido sin un caso real: un documento puede reportar algunas líneas ya en USD mientras el resto está en moneda local; el modelo de hoy solo soporta una moneda por ejercicio entero, no por línea.

## Versión 104 — Sourcing Ecuador: hallazgo de que ningún club es todavía S.A.D.P./SAD

- Barrido de sourcing sobre 13 clubes candidato ecuatorianos (Barcelona SC, Emelec, LDU Quito, Independiente del Valle, Aucas, Delfín SC, Universidad Católica, El Nacional, Macará, Deportivo Cuenca, Mushuc Runa, Técnico Universitario, Orense SC).
- Hallazgo estructural clave: a septiembre 2026 NINGÚN club ecuatoriano es una S.A.D.P./SAD todavía — la reforma legal que lo habilita recién se publicó feb-2026 y el reglamento operativo jun-2026; a agosto de 2026 solo un club de categoría inferior (9 de Octubre) había iniciado el trámite. Corrige una asunción errónea de la sesión anterior (que ya daba por hecho que LDU Quito tenía una S.A.D.P. separada sin encontrar todavía).
- Único hallazgo de PDF real esta sesión: Deportivo Cuenca, informe presidencial de caja (movimientos bancarios + pagos SRI/IESS 2021-2026), publicado voluntariamente por el club en ago-2026 — no es un estado contable devengado tradicional.
- Los otros 12 clubes quedaron en dead-end documentado (sin sección de transparencia en su sitio oficial, o el sitio no respondió).
- `.claude/skills/club-sourcing/SKILL.md` sección 5 (Ecuador) corregida con esta cronología y la explicación de por qué Supercias no aplica todavía a estos clubes.
- Sigue siendo sourcing puro, nada cargado a `data/*.js`.

## Versión 105 — Primer barrido de sourcing en África: 4 países investigados a fondo, 0 PDFs reales conseguidos

- Sudáfrica, Egipto, Marruecos y Nigeria investigados con metodología propia por país (ver `.claude/skills/club-sourcing/SKILL.md` sección 8). Sudáfrica y Egipto: dead-end estructural confirmado (clubes privados exceptuados de publicar ante el CIPC sudafricano; asociaciones sin regulador en Egipto). Nigeria: dead-end a nivel de liga completa (NPFL, clubes estatales sin registro CAC). Marruecos: hallazgo real pero bloqueado — sus clubes en transformación a SAS (Wydad, Raja) depositan bilans en el registro oficial OMPIC (`directinfo.ma`), pero descargarlos es un servicio pago que un agente no puede completar; queda documentada la pista exacta para retomar.
- 10 clubes de la PSL sudafricana, 2 de Egipto y 2 de Marruecos documentados individualmente en `fuentes/<País>/<Club>.md`; Nigeria documentada a nivel de liga en `fuentes/Nigeria/_notas-generales.md`.
- Sourcing puro, 0 PDFs descargados, nada cargado al sitio.

## Versión 106 — Primer barrido de sourcing para España, sección nueva en el índice

- España nunca sourceada antes: 10 de 11 clubes candidatos (Real Madrid, FC Barcelona, Atlético de Madrid, Athletic Club, Sevilla FC, Valencia CF, Villarreal CF, Real Betis, Celta de Vigo, Deportivo Alavés) terminaron con documentos reales; Real Sociedad quedó como dead-end documentado (cuentas gateadas a accionistas, sin sección de transparencia pública).
- Series destacadas: Real Madrid (22 ejercicios, 2003-2025, sin huecos), FC Barcelona (22 ejercicios, 2003-2025, con serie 1978-2003 identificada y sin bajar todavía), Atlético de Madrid (12 ejercicios, 2013-2025, sin huecos) y Deportivo Alavés (9 ejercicios, 2016-2025, sin huecos — sorpresa de la sesión, mejor cobertura de lo esperado para un club chico).
- PDFs a `Clubes/España/<Club>/` (gitignorados), documentación a `fuentes/España/<Club>.md` nuevo, sección `### España` nueva en el índice de `fuentes-por-club.md`.
- Sigue siendo sourcing puro: nada transcripto a Markdown, nada cargado a `data/*.js` todavía.

## Versión 107 — Club América (México), primer club no argentino cargado con datos reales

- `data/clubamerica-data.js` (nuevo): Ejercicio 2025 (año calendario completo) del Club de Fútbol América, vía el "Segmento de Fútbol" que reporta Ollamani, S.A.B. de C.V. (la compañía bursátil, clave BMV `AGUILAS`, en la que Grupo Televisa escindió su negocio de fútbol + Estadio Azteca/Banorte el 31/01/2024). Club América no publica balance propio; el dato sale de la Nota de Segmentos IFRS 8 auditada de Ollamani.
- Caveat central, documentado en rawLabel + comentario de cabecera del archivo: el "Segmento de Fútbol" MEZCLA Club América con el Estadio Banorte (revenue $2,795.643 M MXN, 2025), sin desglose posible entre los dos. No hay balance por segmento (solo activos/pasivos totales, no deuda financiera separada de caja) — `grossDebt`/`cash` quedan en 0/0, con `debtDisclosureNote()` (mecanismo ya existente) avisando que es dato no disponible, no deuda cero real.
- `officialPAT` deliberadamente `null`: la "utilidad de segmento" que imprime el documento ($43.911 M MXN) está definida por la propia nota como ANTES de depreciación/amortización y "otros ingresos o gastos, neto" — no es un Resultado Neto/PAT comparable. `officialTotalExpenses` (2,751.732 M) sí se cargó, pero es una identidad aritmética (Ingresos − Utilidad de segmento), no una cifra impresa con ese nombre.
- Tipo de cambio: el documento declara DOS cifras de cierre distintas para el 31/12/2025 ($18.0012 en la sección MD&A vs. $17.9528 en la Nota a los EEFF auditados) — se usó la de la Nota (más autorizada), discrepancia documentada en vez de promediada o descartada en silencio.
- `data/currency-map.js`: entrada `MXN` nueva (`scale:1`, igual que BRL/PEN/EUR).
- `data/clubs.js`: entrada `clubamerica` nueva (`country:'MX'`, `reportingCurrency:'MXN'`, `fiscalYearStart:'01-01'`).
- Sin gestión/presidencia tradicional (sociedad bursátil, no asociación civil): entrada sintética única en `gestionesByClub.clubamerica` para no romper las funciones genéricas que asumen ≥1 gestión por club (`populateFinanzasSelectors`/`populateResultadosSelector`/`populateCompararSelectors`).
- Mercado de Pases/Resultados deportivos/Títulos quedaron vacíos (alcance de esta carga: solo datos financieros).
- Transcripción de las páginas relevantes del PDF en `Clubes/México/Club América/segmento-futbol-2025.md`. Verificado en el navegador: `verifyTieOuts()` corre sin errores para `clubamerica`, Revenue y Expenses cierran exacto (2 checks; PAT sin check, a propósito).

## Versión 108 — 10 clubes de Japón (J.League), Ejercicio 2025 — segundo país no argentino

- 10 clubes nuevos (Kashima Antlers, Urawa Red Diamonds, Yokohama F. Marinos, Kawasaki Frontale, Vissel Kobe, Gamba Osaka, Cerezo Osaka, FC Tokyo, Sanfrecce Hiroshima, Nagoya Grampus): sitio pasa de 12 a 22 clubes, de 2 a 3 países.
- Fuente: documento anual consolidado de la J.League (`club_doc-2025.pdf`), cubre los 60 clubes de J1/J2/J3.
- Corrección de un hallazgo previo de sourcing: el documento SOLO da 3 cifras reales por club (Ingreso Total, Sponsor, Gate) — el resto de categorías de ingreso y TODOS los costos solo se publican a nivel de división, no por club.
- `revenueLines` de 3 líneas por club (Sponsor/Gate/Otros residual), reconcilian exacto contra el Ingreso Total impreso. `expenseLinesByYear` vacío a propósito (sin dato real de costo por club en esta fuente) — `officialTotalExpenses`/`officialPAT` en `null`, `verifyTieOuts()` solo corre el check de Revenue para estos 10 clubes.
- `JPY` agregado a `CURRENCY_META` (`data/currency-map.js`, scale:1) — la tabla genérica ya soportaba cualquier moneda desde la Versión 103, así que no hizo falta tocar `toDisplayValue()`. fx:150 JPY/USD es placeholder, no declarado por el documento.
- Verificado en el navegador: los 10 clubes aparecen en el dropdown, `verifyTieOuts()` da el check de Revenue OK para los 10, 0 errores de consola.
- Limitación cosmética conocida, no corregida: el header de "Estado de resultados" muestra "2024/2025" en vez de "2025" para estos clubes (función compartida `ejercicioLabel()` asume siempre temporada partida) — mismo to-do ya anotado para Club América.

## Versión 110 — Primeros 2 clubes de Colombia cargados (Once Caldas, Envigado)

- Once Caldas S.A. En Reorganización y Envigado Fútbol Club S.A. cargados con su Ejercicio 2025 (estados financieros auditados reales, vía SIIS/Supersociedades). Envigado reconcilia exacto (el PDF trae el Estado de Resultado Integral primario); Once Caldas usa un residuo documentado para `tax` (el PDF descargado solo trae las notas, no el estado primario, ver `dudas-por-club.md`).
- Deportes Tolima investigado pero NO cargado: 3 cifras de resultado neto en conflicto para el mismo ejercicio, sin poder reconciliar (ver `dudas-por-club.md`).
- `COP` ya estaba en `CURRENCY_META` desde la Versión 103 (el toggle de moneda genérico funciona para Colombia sin tocar `toDisplayValue()`).
- fx usado para los 2 clubes cargados: TRM oficial de Colombia al 31/12/2025 ($3.757,08 COP/USD) — ninguno de los 2 documentos declara su propio tipo de cambio.
- A propósito solo se cargó UN ejercicio por club (2025), pese a que Envigado tiene 10 años consecutivos disponibles en SIIS — pedido explícito de Guido: ampliar clubes, no profundizar uno.
- `gestionesByClub` de estos 2 clubes lleva una entrada genérica "Gestión actual" (no un nombre propio): un club con `gestionesByClub[clubId]` vacío rompe el selector "Por gestión" (primer caso real de un club sin ninguna gestión conocida, ni siquiera parcial).

## Versión 111 — Primeros 10 clubes españoles onboardeados, un ejercicio cada uno

- Real Madrid, FC Barcelona, Atlético de Madrid, Athletic Club, Sevilla FC, Valencia CF, Villarreal CF, Real Betis, Celta de Vigo y Deportivo Alavés, cada uno con el Ejercicio 2024/25 (2023/24 para Villarreal, único año real en su archivo) — decisión explícita de alcance: sumar clubes en vez de profundizar años. Sexto país del sitio con datos reales.
- `EUR` ya estaba en `CURRENCY_META` desde la Versión 103 (el toggle de moneda genérico funciona para España sin tocar `toDisplayValue()`).
- Bug real de fx encontrado y corregido al mergear: los 10 archivos guardaban `fx` como "USD por 1 EUR" (ej. 1,172), el sentido INVERSO al que usa `toDisplayValue()` para el resto de las monedas (ARS/COP/BRL/MXN/JPY, todas "moneda nativa por 1 USD") — se invirtió a "EUR por 1 USD" (0,8532 para el cierre 30/6/2025, 0,9337 para el cierre 30/6/2024 de Villarreal) en los 10 archivos, documentado en cada comentario de cabecera.
- Los 10 clubes reconcilian EXACTO contra Revenue/Expenses/PAT impresos de su propio documento (`verifyTieOuts()`, 30 checks nuevos, 0 errores), verificado en el navegador.
- Gotcha nuevo encontrado: FC Barcelona tiene el texto de sus páginas de balance/PyG deliberadamente ofuscado (ToUnicode reordenado), leído renderizando esas páginas a imagen en vez de `pdftotext`.
- Mercado de Pases/Resultados/Títulos vacíos a propósito en los 10 clubes (alcance de esta sesión fue solo Finanzas).

## Versión 112 — Ajustes de arquitectura para escalar a 1000 clubes (pedido explícito: revisar qué no escalaba antes de seguir onboardeando)

- `CLUB_DATA_SCRIPT_SRC` (mapa a mano en index.html, un onboarding = una edición manual) reemplazado por convención: `loadClubData(clubId)` arma `data/<clubId>-data.js` directo. `CLUB_DATA_SCRIPT_OVERRIDE` (vacío hoy) para el caso excepcional de un nombre de archivo distinto.
- Toggle "Año a año"/"Por gestión" de Finanzas OCULTO (Guido: "i dont care anymore about the Por Gestión toggle. either get rid of it or hide it") — mismo criterio que las pestañas Pases/Resultados/Comparar (Versión 56), UI oculta, código y datos intactos.
- Bug real encontrado al revisar esto: aun con el toggle oculto, `renderInicioStats()` seguía leyendo `gestionesByClub[currentClub][key]` sin guardas — un club onboardeado sin NINGUNA entrada de gestión rompía Inicio (la primera pantalla que ve cualquier visitante), no solo el toggle escondido. Se hizo defensivo en el motor (`currentGestionKey()` y todo lector de `gestionesByClub` en js/finanzas-render.js con `|| {}`, `renderInicioStats()` degrada a "Sin dato"). Ya NO hace falta que un club nuevo agregue una entrada sintética de gestión solo para evitar un crash.
- `checkFxSanity()` nuevo (`data/currency-map.js`, corre junto a `verifyTieOuts()` al cargar el sitio): compara cada `fx` contra un rango plausible por moneda (`FX_PLAUSIBLE_RANGE`) y avisa por `console.warn` si algo parece invertido o con el orden de magnitud equivocado — habría marcado el bug de fx invertido de España (Versión 111) de inmediato. 0 warnings en los 38 clubes actuales tras ajustar el rango de ARS (el histórico real va de ~$4 a ~$1900 por USD).
- Regresión completa verificada en el navegador tras los 3 cambios: 38 clubes, 213 checks de `verifyTieOuts()`, 0 mismatches, 0 warnings de `checkFxSanity()`, 0 errores de consola.

## Versión 113: Dominio propio (financeofsports.com) y rename del proyecto a `finance-of-sports`

- Guido compró **financeofsports.com** y el dominio ya sirve el sitio desde Netlify (verificado: `www.financeofsports.com` → 301 a `financeofsports.com`, `server: Netlify`, devuelve este `index.html`). Resuelve la mitad del to-do 7, que venía abierto desde el principio del proyecto.
- Carpeta local renombrada `numeros-de-boca/` → `finance-of-sports/`. 58 referencias de PATH (`numeros-de-boca/...`) actualizadas en docs, skills, transcripciones de `Clubes/` y comentarios de cabecera de `data/*.js`; las referencias al NOMBRE viejo se actualizaron también, salvo 3 líneas de historial puro (CHANGELOG Versión ~50, `finance-of-sports-project.md`) donde el nombre viejo es el dato correcto y se aclaró entre paréntesis.
- **`.gitignore` del sitio profesional (`../.gitignore`) actualizado**: la línea `numeros-de-boca/` pasó a `finance-of-sports/`. Esto es lo único que rompía de verdad con el rename: sin esa línea, todo este proyecto se vuelve untracked dentro del repo `guidomamone-website` y se puede commitear/deployar por error al sitio profesional de Guido. Verificado con `git check-ignore -v`.
- Nada del código del sitio depende del nombre de la carpeta: todos los assets se cargan con paths relativos (`data/*.js`, `js/*.js`) y `loadClubData()` arma el path por convención desde la Versión 112. Verificado que las 6 referencias locales de `<script src>` resuelven a archivos existentes.
- PENDIENTE, necesita a Guido (un agente no puede): renombrar el repo en GitHub y re-linkear el repo en Netlify. Ver to-do 7 en `index.html` para el paso a paso y el porqué del re-link.
- Nota de branding abierta: el sitio sigue llamándose "Tu club en números" (castellano) con un dominio en inglés, y el mail de contacto sigue siendo el placeholder `contacto@bocaennumeros.example` (to-do 8), que además referencia un nombre de marca ya abandonado.

## Versión 114 — Refactor de escalabilidad de documentación: el comentario de index.html pasó de 139 KB a 46 KB

- Hallazgo que cambió el plan: la sección "ESTADO ACTUAL" no era estado, era historial. 1.008 de las ~1.650 líneas del comentario (91 KB de los 139 KB) eran entradas de versión en orden cronológico inverso, de la Versión 112 para atrás, duplicando `CHANGELOG.md` a pesar de que el propio archivo declaraba desde la Versión 101 que "ya no acumula historial". La duplicación por club (el problema que el to-do 0 señalaba) es real pero es 14 KB, siete veces más chica.
- Verificado antes de borrar nada: las 73 versiones referenciadas dentro de "ESTADO ACTUAL" tienen todas su entrada propia en `CHANGELOG.md` (que va de la 10 a la 113, superset estricto), y se compararon 3 entradas al azar (76, 83, 98) para confirmar que el contenido está cubierto, no solo el número de versión.
- `CONVENCIONES.md` nuevo: los 25 bullets de REGLA/OJO que estaban sueltos dentro del historial y que son criterios VIGENTES (varios "pedido explícito de Guido"), no historia. Son lo que una sesión nueva tiene que leer antes de tocar el sitio. Se movieron textuales, sin reescribir.
- `ARQUITECTURA.md` nuevo: "ARCHIVOS DEL PROYECTO" + "MODELO DE DATOS" (referencia técnica que se consulta cuando hace falta, no contexto de arranque).
- "ESTADO ACTUAL" reescrito de cero como estado real, 40 líneas: qué es el sitio, cuántos clubes/países, la convención de archivos, la verificación automática, el estado de cada pestaña, y el desajuste de branding abierto. Bloque nuevo "DÓNDE ESTÁ CADA COSA" con el mapa de los 8 archivos de documentación.
- La sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" quedó intacta a propósito (decisión de Guido: hacer primero el corte barato por propósito, y dejar el de-duplicado por club para una sesión propia, que necesita 38 diffs a mano contra cada `data/<club>-data.js`).
- Regresión verificada en el navegador: 38 clubes, todos los assets 200, `verifyTieOuts()`/`checkFxSanity()` sin errores, 0 errores de consola.

## Versión 115 — Selector de idioma (castellano/inglés), motor i18n que escala a N idiomas, y versionado de assets

- Selector de idioma nuevo en el header, arriba a la derecha: un botón de globo con menú desplegable. Se eligió globo + menú en vez de una tira de botones por idioma porque el nav ya se recorta abajo de ~850px (to-do 9) y el costo de ancho tiene que ser constante, no crecer con cada idioma que se sume.
- `js/i18n.js` nuevo, el motor. AGREGAR UN IDIOMA = crear `data/lang/<code>.js` + una línea en `data/lang/langs.js`; no se toca ni el HTML ni el motor. El archivo del idioma se inyecta por convención (`data/lang/<code>.js`), mismo criterio que `loadClubData()` desde la Versión 112 y que `populateClubSelect()` desde la Versión 101.
- El castellano NO tiene archivo de diccionario, a propósito: el HTML ya está escrito en castellano, así que `apply()` guarda el texto original de cada elemento la primera vez y lo usa como valor "es". Consecuencia buscada: traducir mal un idioma nuevo no puede romper el castellano, y una clave que falte degrada al castellano en vez de mostrar la clave cruda o un hueco.
- `data/lang/en.js` nuevo, ~105 claves: nav, títulos, subtítulos, controles, headers de tabla, footer, modal de contacto, los stats de Inicio y de Finanzas, y los buckets de "Formato simplificado".
- `data/site-labels.js` nuevo: la lista de etiquetas que SON del sitio y por lo tanto se traducen. `tLabel()` traduce solo si la etiqueta está en ese mapa; cualquier otra pasa intacta. Así los rubros de "Formato del club" (que salen textuales del balance de cada club) NO se traducen nunca, que es la promesa del sitio: mostrar cada club tal cual lo reporta. Traducir "Ingresos por Cuota Social" de un balance argentino sería poner en el documento algo que el documento no dice.
- La traducción se aplica al DIBUJAR, no sobre el dato: los `label` en castellano siguen siendo las claves con las que matchea `findPrevVal()` y el overlay de presupuesto, así que cambiar de idioma no puede romper la comparación entre ejercicios.
- Detecta el idioma del navegador en la primera visita y recuerda la elección en `localStorage` (envuelto en try/catch: en modo privado no persiste, pero no rompe). Actualiza `<html lang>` al cambiar.
- `window.ASSET_V` nuevo + `?v=` en todos los `<script src>` propios (los 2 cargadores dinámicos leen la misma constante). Esto convierte en convención permanente lo que `CLAUDE.md` documentaba como truco temporal de verificación: sin esto, un visitante que ya entró antes se queda con el JS viejo cacheado mientras el HTML es nuevo. Pasó de verdad en esta sesión: el HTML nuevo pedía traducciones a una versión vieja del render que no las tenía.
- Verificado en el navegador: ida y vuelta ES/EN completa, cambio de club con lazy-load en inglés, `verifyTieOuts()`/`checkFxSanity()` sin errores, todos los assets 200/304, 0 errores de consola.

## Versión 116 — 3 clubes nuevos de Brasil (Coritiba, Ituano, Mirassol), de 38 a 41 clubes

- Se midió primero `pdftotext` chars/página de los 8 PDFs de Brasil pendientes: los 8 tienen texto nativo extraíble, ninguno es escaneo. Se cargaron 3 en esta sesión, quedan 5 igual de "fáciles" (ver to-do 16).
- **Coritiba SAF, Ejercicio 2024**: PREJUÍZO de R$ 139.402.626 sobre una receita líquida de R$ 87.002.707 (gastó 2,5 veces lo que ingresó), con patrimônio líquido NEGATIVO de R$ (29.915.096) al cierre. Es el peor ejercicio de cualquier club cargado en el sitio.
- Trampa encontrada y evitada en Coritiba: la DRE presenta los costos del fútbol en 2 líneas por DESTINO ("Futebol profissional" / "Futebol das categorias de base"), que son un bolsón sin categoría real. Cargarlas así habría dejado el bucket "Salarios y primas" de Formato Simplificado en CERO para el club, que es exactamente el bug que la REGLA de la Versión 38 existe para evitar. Se cargaron en cambio las 9 líneas POR NATUREZA de la Nota 22 (pessoal, direito de imagem, jogos, viagens, etc.), más las 13 líneas de la Nota 23 en vez de la única línea agregada de Despesas administrativas de la DRE.
- Discrepancia real de la fuente documentada (Coritiba): la Nota 22 suma R$ 98.539.079, exacto contra su propio total impreso, pero las 2 líneas de la DRE para el MISMO concepto suman R$ 98.538.080. R$ 999 de diferencia sin explicación en el documento. `officialTotalExpenses`/`officialPAT` guardan los números IMPRESOS; la diferencia resultante (0,001 M) cae dentro de la tolerancia de `verifyTieOuts()` (0,01 M), y está documentada en el código en vez de esconderse ajustando una línea para que cierre exacto.
- **Ituano, Ejercicio 2024**: déficit de R$ 7.063.131,20. No es SAF. DRE desglosada línea por línea cuyos 4 subtotales y resultado final cierran EXACTO; ninguna inconsistencia en el documento.
- **Mirassol, Ejercicio 2024**: superávit de R$ 4.143.614,12. No es SAF. Es el club con menos desglose del sitio junto con los de Japón, y la razón es la fuente: el PDF no son las demonstrações contábeis sino el informe NARRATIVO del auditor sobre ellas, sin un solo rubro desglosado. 1 línea de ingresos (`lump_football_operations`) y 2 de gastos.
- El monto de "Custos" de Mirassol no está impreso en ningún lado: se despeja de las otras 3 cifras (R$ 36.105.741,22) y queda confirmado por una vía independiente, el propio documento publica custos/receita = 60,84610193746302 % y el valor despejado da 60,84610193746304 %. No es un residuo a ciegas.
- Dudas nuevas anotadas en `dudas-por-club.md` (Mirassol): el Patrimônio Líquido del informe no cierra consigo mismo (saldo inicial + superávit = R$ 31.416.601,08, pero imprime R$ 30.267.600,99, R$ 1.149.000,09 sin explicar), por lo que NO se cargó ningún dato patrimonial; más varios errores de redacción del documento (cifras cuya versión en letras no coincide con el número, porcentajes que en realidad son coeficientes).
- Los 3 clubes usan el mismo PTAX BCB de cierre 31/12/2024 (R$6,1923) que ya usaban Grêmio y Botafogo para esa misma fecha. Ninguno de los 3 documentos declara tipo de cambio propio.
- Verificado en el navegador: 41 clubes, `verifyTieOuts()`/`checkFxSanity()` sin ninguna falla, 0 errores de consola, Coritiba renderizado y revisado a ojo en Finanzas.

## Versión 117 — El sitio pasa a llamarse "El deporte en Números" en castellano

- Rename de marca pedido por Guido: "Tu club en números" -> "El deporte en Números". Cambia el `<title>`, el logo del header y el asunto del mail del formulario de contacto. Historia completa del nombre: "Boca en Números" (inicio) -> "Tu club en números" (Versión 12) -> "El deporte en Números" (esta).
- La marca es DISTINTA POR IDIOMA a propósito, y eso queda resuelto como decisión, no como deuda: "El deporte en Números" en castellano, "Finance of Sports" en inglés (clave `site.name` de `data/lang/en.js`), que además es el dominio. Cierra la duda abierta que había dejado la Versión 115.
- `git remote` local actualizado a `https://github.com/guidomamone/finance-of-sports.git` (Guido ya renombró el repo en GitHub).

## Versión 118 — `auditAll()`: la auditoría deja de mirar solo el club que está abierto

- Problema que resuelve: `verifyTieOuts()`/`checkFxSanity()` solo pueden revisar clubes cargados en memoria, y los clubes se cargan por demanda desde la Versión 112. Como el único `data/<club>-data.js` que entra por `<script src>` es el de Boca, una carga normal de la página corría **6 de los 222 checks que existen**. Los otros 216 solo corrían si un visitante elegía justo ese club. Un error de datos en el club N° 37 era invisible hasta que alguien lo miraba a mano.
- `auditAll()` nuevo: fuerza `loadClubData()` sobre los 41 clubes, corre las 2 verificaciones y devuelve (además de imprimir) un resumen con checks que cierran, checks que no, warnings de fx y clubes que no cargaron. Se dispara con `?audit=1` en la URL o llamándolo desde la consola.
- La carga por demanda NO se tocó: verificado que una carga normal sigue teniendo 1 solo club en memoria. El visitante que solo quiere ver Boca sigue sin bajar 41 archivos de datos.
- Regla nueva documentada en el código: cualquier verificación total tiene que pasar por `computeYearGeneric()`, nunca reimplementar la cascada. Al escribir esto se probó primero un verificador aparte en Node que recalculaba el PAT por su cuenta y tiró 12 FALSOS POSITIVOS, porque el motor real suma cosas que esa fórmula no tenía (nonCash, profitOnPlayerSales, assetSales, tax).
- Resultado de la primera corrida completa: 41 clubes, 222 checks cierran, 0 que no cierran, 0 warnings de fx, 0 clubes que no cargan.

## Versión 119 — El origen del proyecto entra al repo: `finance-of-sports-project.md` deja de estar partido en dos

- Guido notó que había un `finance-of-sports-project.md` fuera de la carpeta del proyecto. Al compararlos NO eran duplicados: el de afuera (68 KB, sin tocar desde el 11/9) es el VOLUMEN 0 del proyecto, y tenía material que el de adentro nunca cubrió — el planteo original (Objetivo, quién hace algo parecido, la lista de qué analizar, dónde buscar la información, la recomendación de enfoque), las Versiones 1 a 9 del MVP, las notas de deploy y una to-do list vieja. El de adentro arranca en la Versión 10.
- Se fusionó: el bloque único se agregó al final de `finance-of-sports-project.md` como "VOLUMEN 0 — ORIGEN DEL PROYECTO", textual, sin editar una palabra (incluidas las rutas viejas `numeros-de-boca/`, que se dejaron a propósito: es un documento histórico y corregirlo sería perder el registro de cómo se pensaba el proyecto al principio). También entró la sección del barrido de fuentes de los 27 clubes restantes de Primera División, que tampoco estaba.
- Las Versiones 10-20 y 81-82 del archivo viejo NO se copiaron: ya están en este archivo, con más detalle.
- La copia vieja pasó a `_to_delete/` (fuera de git) en vez de borrarse de una. La línea `finance-of-sports-project.md` del `.gitignore` del sitio profesional se sacó, ya no hace falta.
- Efecto real: el origen del proyecto pasa a estar versionado en git por primera vez. Hasta ahora vivía en un archivo suelto e ignorado, a un `rm` de distancia de perderse.

## Versión 120 — "Qué es real por club" se GENERA desde los datos, y skill de arranque de sesión

- `tools/generate-club-index.js` nuevo: la sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR CLUB" del comentario de `index.html` deja de escribirse a mano y pasa a generarse desde `data/clubs.js` + los `fiscalYearMeta` de cada club. Deja de ser prosa paralela y pasa a ser una VISTA de los datos: no puede desincronizarse, porque no hay nada que sincronizar. `--check` sale con código 1 si quedó desactualizada, para chequear antes de un push.
- Esto resuelve la "fuga 1" del mapa de procesos: esa sección decía lo mismo que el comentario de cabecera de cada `data/<club>-data.js` ya decía, y era la copia que se desactualizaba. Onboardear un club pasa de tocar 6 archivos de documentación a tocar 2.
- La división de responsabilidades quedó explícita: el índice generado contesta QUÉ hay cargado (cuántos ejercicios, de qué tipo, en qué moneda); el comentario de cabecera del `data/<club>-data.js` contesta POR QUÉ (qué supuesto se tomó, qué salvedad tiene una cifra, qué quedó sin cargar). Lo segundo no es derivable de los datos y por eso no se intentó generar.
- La prosa vieja NO se perdió: quedó textual en `QUE-ES-REAL-historico.md`, marcada como archivo histórico que ya no se actualiza, como red de seguridad por si algún dato no estuviera en el archivo de su club.
- BUG REAL cometido y corregido en la misma sesión: los marcadores de la sección generada se pusieron primero como comentarios HTML (`<!-- CLUB-INDEX:START -->`). Como esa sección vive DENTRO del comentario grande de `index.html`, el `-->` anidado CERRÓ el comentario exterior antes de tiempo y todas las notas internas (la TO-DO list incluida) pasaron a renderizarse como texto visible en el sitio, arriba del header. Se detectó revisando el navegador. Los marcadores pasaron a ser texto plano (`===== CLUB-INDEX:START =====`) y quedó la advertencia escrita en el script.
- `.claude/skills/start-session-finance-of-sports-project/SKILL.md` nuevo: el checklist de arranque y cierre de cualquier sesión (qué leer y en qué orden, qué NO leer, cómo levantar el sitio, `auditAll()` antes de pushear, qué documentar al terminar, la regla de git). Guido va a empezar a abrir las sesiones directamente en `finance-of-sports/` en vez de la carpeta de arriba, lo que hace que los 4 skills del proyecto se autodescubran en vez de haber que abrirlos a mano.
- Efecto medido: el comentario de `index.html` pasó de 51 KB a 40 KB, y la parte que crecía linealmente con cada club ahora es generada.

## Versión 121 — El motor deja de tener una lista de clubes escrita a mano, y 2 renames

- `presupuestoOverlayFor()` (js/finanzas-calc.js) era un `if` que sólo conocía a `racing` y `river`: onboardear un club con presupuesto Y balance del mismo ejercicio obligaba a editar el motor. Era el último lugar donde sobrevivía el patrón "agregar un club = tocar el código", que el resto del proyecto ya había eliminado (`loadClubData()` Versión 112, `populateClubSelect()` Versión 101). Ahora sale por convención: alcanza con que el `window.CLUB_GENERIC_DATA.<club>` del archivo del club registre `presupuestoOverlayByYear`.
- Los 22 archivos de club que declaraban `<club>PresupuestoOverlayByYear` sin registrarlo (código muerto) ahora lo registran. Un club sin overlay devuelve null igual que antes.
- Verificado que no fue una regresión: Racing sigue mostrando las columnas "Balance 2019/2020" y "Presupuesto 2019/2020" en el mismo ejercicio, y `auditAll()` da 41 clubes / 222 checks / 0 fallas.
- `Proyecto Boca.md` renombrado a **`finance-of-sports-project.md`**. El nombre venía de cuando el sitio era solo de Boca; hoy son 41 clubes de 6 países. Actualizadas las ~40 referencias en `index.html`, `CLAUDE.md`, `CONVENCIONES.md`, `ARQUITECTURA.md`, los 4 skills, `data/river-data.js`, `fuentes/` y el propio encabezado del archivo (que deja constancia del nombre viejo).
- Skill `start-session` renombrado a **`start-session-finance-of-sports-project`**, para que el nombre diga a qué proyecto pertenece cuando aparezca en una lista de skills junto con los de otros proyectos.

## Versión 122 — `tools/audit.js`: auditoría determinista de lo que un total correcto no delata

- `tools/audit.js` nuevo: audita el proyecto entero en Node y agrupa los hallazgos en P0 (un número publicado puede estar mal) / P1 (algo roto que el visitante ve) / P2 (riesgo) / P3 (limpieza). `--json` para la lista completa, `--quiet` para usarlo de gate, código de salida 1 si hay P0 o P1.
- Complementa a `auditAll()`, no lo reemplaza: `auditAll()` verifica que cada ejercicio CIERRE contra el total que su documento imprime. Esto busca lo que cierra igual — ejercicios sin ningún total contra qué compararse, categorías con typo o prestadas de la otra taxonomía, categorías que el motor no suma, errores de escala, desgloses que se contradicen con su propia fila, catch-all dominante, ramas por club en el código.
- Respeta la regla heredada de `auditAll()`: carga `js/finanzas-calc.js` en un contexto de `vm` y llama a `computeYearGeneric()`/`toDisplayValue()`/`bucketize()` reales. No reimplementa la cascada en ningún lado.
- Detalle de carga que difiere de `tools/generate-club-index.js`: ahí el sandbox usa `window: {}` y alcanza porque solo lee datos; acá el objeto global del contexto TIENE que ser su propio `window`, porque el motor lee `CLUB_GENERIC_DATA` sin el prefijo `window.`.
- La sonda de categorías huérfanas no es análisis estático: arma un club sintético con una línea de cada categoría declarada y le pregunta al motor cuánto sumó. Encuentra siempre el bug de la Versión 53 (una categoría en `EXPENSE_CATEGORIES` que `computeYearGeneric()` no toca hace desaparecer plata de todo el sitio), que aquella vez se encontró de casualidad.
- Probado inyectando errores a propósito en una copia desechable: un rubro alterado (rompe el tie-out), un typo de categoría, una categoría declarada que el motor no suma, un desglose que no cierra, y un `fx` mal transcripto (3757,08 → 3,75708). Los cinco se detectan; el último es el que más importa, porque deja TODOS los tie-outs en verde y publica un número 1000 veces más grande.
- 4 falsos positivos de la primera versión, corregidos: `fx: null` no rompe la conversión (`yearMetaFor()` sustituye el `FX_RATE` global, así que el toggle muestra un número aproximado, no `$0`); los `items` de un gasto se guardan en positivo y la línea en negativo, así que hay que comparar magnitudes; un ingreso negativo o un gasto positivo casi siempre es una deducción legítima, así que solo se reporta si pesa más del 2% de su sección; y un ejercicio placeholder tiene sus líneas en cero, no le "faltan" los sueldos.
- `tools/audit-ignore.json` nuevo: silencia hallazgos YA verificados a mano contra el documento fuente, con el motivo escrito. Sin esto, una auditoría de rutina repite los mismos hallazgos hasta que nadie la lee. Con la regla explícita de que no se agrega una entrada sin mirar la fuente.
- Primera corrida sobre los 41 clubes: 0 P0, 0 P1, 52 P2, 7 P3. El detalle agrupado quedó como to-do 20 en `index.html`.

## Versión 123 — Skill de auditoría de rutina, y el primer reporte

- `.claude/skills/auditoria-finance-of-sports/SKILL.md` nuevo: el procedimiento de la auditoría de rutina, que es una tercera cosa distinta de las dos verificaciones que ya existían. El onboarding audita lo que se acaba de tocar; `auditAll()` audita que los totales sigan cerrando; esto audita lo que nadie tocó hace meses, que es donde nadie mira.
- Tres capas, de lo más determinista a lo más caro, cada una acotando a la siguiente: `node tools/audit.js` (5 segundos, 0 juicio) → lectura dirigida SOLO de lo que el script marcó → un eje de juicio por corrida, rotando entre `datos`, `escala`, `codigo`, `docs` y `tokens`. Es lo que hace que una auditoría no cueste leer el repo entero.
- Cada corrida deja `auditorias/<fecha>.md` y **diffea contra el reporte anterior**. Sin eso, la cuarta auditoría repite los mismos 52 hallazgos y nadie la lee. Los P0/P1/P2 que sobreviven van a la to-do de `index.html`, que sigue siendo la única lista oficial de próximos pasos: el reporte no es una segunda to-do.
- El eje `tokens` viene con la lista de recortes PROHIBIDOS escrita (verificar el OCR fila por fila, re-sumar las líneas en vez de confiar en el total impreso, resumir una transcripción, saltear un tie-out, pre-convertir moneda, silenciar un hallazgo sin mirar la fuente), para que una sesión futura no "optimice" la exactitud creyendo que ahorra.
- Regla que hace que las auditorías se terminen: cuando un hallazgo se repite en más de un club, el arreglo no es arreglar los datos sino escribir la regla en el skill que corresponde, para que el club siguiente no nazca mal.
- `auditorias/2026-09-13.md`: primer reporte, línea de base. 0 P0, 0 P1, 52 P2, 7 P3, eje de juicio `datos`.
- Hallazgo principal de ese eje, que el script marcaba pero no podía interpretar: **el sitio muestra igual "la fuente reporta cero" y "la fuente no lo desglosa"**. Los 10 clubes de Japón tienen 3 líneas de ingreso porque es todo lo que publica la J.League por club, así que muestran Televisión = $0 con la mitad de sus ingresos en un catch-all rotulado "Otras secciones deportivas y otros ingresos", que afirma algo que la fuente no dice. `river 2024` tiene el mismo efecto por otra causa: sus 8 rubros de gasto están en `other_expenses` con etiquetas por sector, con los sueldos adentro de "Fútbol profesional" (80% de los gastos) — la trampa de "costos por destino, no por naturaleza" ya documentada con Coritiba. Quedó como to-do 20 (h), con las 2 opciones propuestas; ninguna mueve un número.

## Versión 124 — `CLAUDE.md` deja de decir que los skills del proyecto no se autodescubren

- El párrafo de `CLAUDE.md` que manda a leer los skills afirmaba que el descubrimiento automático no llega a `finance-of-sports/.claude/skills/` y que había que abrirlos a mano con el Read tool. Dejó de ser cierto en la Versión 120, cuando Guido empezó a abrir las sesiones directamente en `finance-of-sports/` en vez de la carpeta de arriba: desde ahí aparecen solos en la lista y se invocan por nombre. Verificado en esta sesión.
- Reescrito como las 2 situaciones reales (sesión abierta en `finance-of-sports/` → aparecen solos; sesión abierta en `Website propio/` → puede que no, leerlos a mano), dejando explícito que la obligación de leerlos no cambia en ninguno de los dos casos, que es la razón por la que el párrafo existe.
- Aprovechado para que la lista sea completa: eran 3 skills enumerados de 5. Faltaban `start-session-finance-of-sports-project` (que es por dónde hay que empezar) y `auditoria-finance-of-sports` (Versión 123).


## Versión 125: Cada tipo de cambio dice de dónde salió, y las cotizaciones de mercado se dicen una sola vez

- `fxSource` nuevo en cada ejercicio: `document_close` (lo declara el balance), `document_assumption` (la premisa de un presupuesto), `market_close`, `market_approx`, `placeholder`, `unknown`. Son las 4 reglas de `club-data-mapping` §5 hechas campo, más el estado "todavía no se sabe".
- `document_assumption` es una categoría propia a pedido de Guido ("para Presupuesto, los clubes toman assumption de FX siempre"): un presupuesto declara un pronóstico que puede terminar equivocado, no un cierre ya ocurrido. Boca 2027 usa 1660, el promedio entre el dólar de inicio ($1.480) y el de cierre ($1.840) que asume el propio documento.
- `FX_CLOSE` nuevo (`data/currency-map.js`): las cotizaciones de mercado, una sola vez, por moneda y fecha de cierre. 33 copias de 9 valores pasaron a 9 entradas + `fxRef`. El cierre del real al 31/12/2024 estaba escrito a mano en 5 archivos, el euro al 30/6/2025 en 9, el ¥150 de la J.League en 10.
- La regla que hace que la tabla no contradiga "nunca reuses el fx de un club para otro": lo que declara un documento va literal en el archivo del club (dos clubes pueden declarar valores distintos para el mismo día y los dos están bien); lo que es cotización pública no es un dato del club y se dice una vez en la tabla.
- `fxMetaFor()` resuelve `fxRef` en un solo lugar; `yearMetaFor()`, `presupuestoOverlayMetaFor()`, `checkFxSanity()` y `tools/audit.js` pasan por ahí en vez de leer `meta.fx` crudo.
- Los 89 `fx` migrados con evidencia archivo por archivo: 30 declarados por un balance, 32 cotización de mercado, 8 premisa de presupuesto, 4 aproximación, 10 placeholder, 5 sin determinar. Antes, 18 de los 89 no tenían ningún rastro de su procedencia y el resto lo contaba en prosa con ~10 redacciones distintas.
- Verificado de paso contra las transcripciones: los 9 fx de Vélez 2017-2025 SÍ salen de su propio Anexo VI (columna Activo), que nadie había documentado; el de Instituto 2024 no está en su documento.
- `tools/audit.js` suma la procedencia: `fx-sin-procedencia`, `fx-mercado-discrepante` (una cotización de club que contradice a la tabla para la misma fecha) y `fx-ref-rota`. Primer hallazgo real: Unión 2024 usa 890,50 donde Racing, Vélez y Estudiantes declaran 909 para el mismo cierre.
- `node tools/audit.js --fx` nuevo: no audita, LISTA. Los 89 tipos de cambio, uno por club-ejercicio (los 4 overlays de presupuesto de Racing incluidos), agrupados por moneda y ordenados por año, con su origen al lado. Contesta "¿de dónde salió este número?" sin abrir un archivo de club, que era la pregunta que abrió la sesión.
- BUG REAL, encontrado al migrar: los `?v=` de los `<script src>` estáticos son literales y NO salen de `window.ASSET_V`, contra lo que decían `index.html` y `CLAUDE.md`. Subir solo la constante dejó al navegador sirviendo un `currency-map.js` cacheado sin `fxMetaFor()` con un `finanzas-calc.js` nuevo que ya lo llamaba: `ReferenceError` en toda la página. Corregida la documentación y agregado el chequeo `asset-v-desfasado` (P1) que compara la constante contra cada tag.
- `auditAll()`: 41 clubes, 222 checks, 0 mismatches, 0 warnings. `node tools/audit.js`: 0 P0, 0 P1.

## Versión 126: Cada número cita su documento: ficha de Fuentes en Finanzas y `fuentes.html`

- Card "Fuentes" al final de Finanzas, por ejercicio: documento (con link), nivel de fuente, tipo de cambio usado CON su procedencia, y las salvedades. Si el ejercicio tiene balance y presupuesto, muestra los DOS tipos de cambio (Racing 2020: el balance declara 73,98, el presupuesto asumió 70).
- Reemplaza a `finanzasClubSourceText`, un objeto escrito a mano con 3 entradas (Boca, Racing, River) que dejaba a los otros 38 clubes sin citar nada.
- Arreglo de fondo: `sources{}` tenía 91 entradas con 61 URLs y se consumía en UN solo lugar, el banner de advertencia, que hace `return` temprano cuando el ejercicio es oficial, o sea que los 88 ejercicios REALES no mostraban su fuente en ningún lado mientras el sitio prometía "todo dato cita su origen". El banner ahora solo advierte y no repite el documento.
- Pestaña Fuentes: se borraron la tabla de 6 filas escritas a mano (IGJ, INDEC, actas de Boca) y el párrafo de ~450 palabras que nombraba club por club y se había quedado en 12 clubes argentinos. En su lugar, los documentos del club seleccionado, generados de los datos. Escala por construcción: nunca lista más de un club.
- `fuentes.html` nuevo, generado por `tools/generate-fuentes-page.js`: el listado completo del sitio, 91 documentos de 41 clubes de 6 países, 61 con link al original, cada uno con qué ejercicios respalda, con qué tipo de cambio se convirtió y qué salvedades tiene. Página propia y estática (URL rankeable, sin depender de JS para el crawler) en vez de más filas dentro de `index.html`. `--check` avisa si quedó vieja.
- Las etiquetas nuestras (nivel de fuente, procedencia del fx) pasan por `t()` y están traducidas al inglés; el título y las salvedades de cada documento quedan en su idioma original a propósito, mismo criterio que los rubros de "Formato del club".
- BUG en el chequeo de i18n de `tools/audit.js`: buscaba las claves definidas entre comillas simples y `data/lang/en.js` las escribe entre dobles, así que el conjunto de definidas quedaba VACÍO y reportaba como sin traducir TODAS las claves usadas. De ahí las "88 claves" de la primera auditoría, que nunca fueron el número real. Con el regex arreglado (y salteando los prefijos de clave dinámica) el faltante real es 0.
- `auditAll()`: 222 checks, 0 mismatches, 0 warnings. `node tools/audit.js`: 0 P0, 0 P1.

## Versión 127: la pestaña Fuentes revisada, y la nota interna deja de publicarse

- BUG DE PRIVACIDAD, encontrado por Guido al revisar la Versión 126: `sources[].note` es la nota que una sesión le deja a la siguiente, y 64 de las 91 mencionan su nombre o rutas de su disco ("PDF subido directamente por Guido", "Transcripción completa en Clubes/España/..."). Se publicaban tal cual en la pestaña Fuentes y en la ficha de Finanzas.
- `note` pasa a ser explícitamente interna y no se renderiza en ningún lado. Lo que ve el visitante es `publicNote`, nueva: una o dos oraciones escritas para un lector, solo donde hay una salvedad que no se deduce de los datos. La tienen 17 de 91 documentos (River, Club América, los 10 de Japón, Argentinos, la cobertura de prensa de Racing y los 3 placeholders).
- `sourceCaveats()` nueva (`data/sources-view.js`): el resto de las salvedades se deriva de los campos que ya existen (tipo de cambio de referencia o aproximado, balance que no publica el resultado del ejercicio, ejercicio sin deuda ni caja). Un club nuevo las trae bien sin que nadie escriba una línea.
- `data/sources-view.js` nuevo: las etiquetas de tipo y nivel de documento estaban duplicadas entre `js/finanzas-render.js` y `tools/generate-fuentes-page.js`, o sea que el sitio y la página podían describir distinto el mismo documento. Ahora salen de un archivo que cargan los dos.
- `fuentes.html` pasa de una lista de cards a una tabla de País, Equipo, Fuente y Notas, a ancho completo (1600px en vez de 900px). Las notas largas se pliegan en un `<details>` con "Ver más", sin JavaScript, así que un crawler las lee igual.
- La pestaña Fuentes pierde el card "Sobre mí" (pedido de Guido) y muestra el tipo de documento además del nivel. Las 6 claves de tipo se tradujeron al inglés.
- 15 títulos de documento tenían un em dash y se limpiaron, más 38 líneas de texto escritas en esta sesión: la regla está en `CONVENCIONES.md` desde la Versión 42 y la había violado sistemáticamente.
- `tools/audit.js` suma 2 guardarraíles: `nota-publica-con-interno` (P1) si un `publicNote` menciona un nombre propio, una ruta del repo o un detalle de transcripción, y `note-interna-renderizada` (P1) si alguien vuelve a interpolar `.note` dentro de HTML. Probado inyectando la fuga a propósito.
- `auditAll()`: 222 checks, 0 mismatches, 0 warnings. `node tools/audit.js`: 0 P0, 0 P1.

## Versión 128: auditoría de escala, y la página de fuentes deja de ser huérfana

- Segunda auditoría del día, eje `escala` (pedida por Guido antes de un cambio grande): `auditorias/2026-09-13-escala.md`.
- P1 encontrado y arreglado: `fuentes.html` era una página huérfana. Se hizo para que la indexen buscadores y sus únicos links los armaba el JS en runtime, así que un crawler que no ejecuta JavaScript nunca llegaba (los 3 `fuentes.html` de `index.html` estaban los tres dentro de comentarios). Ahora hay un `<a>` estático en el footer, verificado con `curl` sobre el HTML servido.
- 6 cuellos de escala medidos, con el número en el que aparece cada uno, a la to-do 22: `clubId` sin país (ya hay un Olimpia en Honduras y otro en Paraguay), los 50 KB de comentario interno que baja cada visitante y crecen 102 bytes por club, `fuentes.html` como página única de 767 bytes por documento, `clubs.js` entero en cada visita, el `<select>` plano de clubes, y `auditAll()` cargando en serie.
- Anotado el techo del modelo: la taxonomía y 3 pestañas asumen fútbol.

## Versión 129: los dos prerrequisitos del selector jerárquico

- `data/club-index.js` nuevo, GENERADO por `tools/generate-club-index.js` (que ahora emite dos artefactos y los chequea con `--check`): nombre, país, calidad del dato, cuántos ejercicios y el más reciente, por club. ~76 bytes por club contra los ~366 de `clubs.js`.
- Por qué existía el problema: el panel jerárquico tiene que mostrar el punto de calidad y el conteo de ejercicios de cada club SIN cargar ninguno, y las dos cosas viven adentro de `data/<club>-data.js`. Verificado en el navegador con la página recién abierta: `clubs{}` 41 entradas, `sources{}` 3, todas de Boca.
- `clubQuality()` nueva en `data/sources-view.js`, al lado de `sourceLevel()`. Sus 4 estados NO son los 4 valores de `reliability`: la regla "verde si todos son primary, gris si ninguno lo es" deja a River en "solo placeholder", y River tiene un balance auditado real conseguido en una réplica de hinchas. La pregunta es "¿hay algún documento REAL?", no "¿hay algún primary?".
- Convención nueva en `CONVENCIONES.md`: el `clubId` de un club NUEVO lleva el país al final (`nacional-uy`). El id nombra el archivo de datos y prefija cada `sourceId`, así que una colisión se paga en tres lugares, y los nombres se repiten entre países más de lo que parece (Racing, Independiente, Unión, Nacional). Los 41 de antes no se migran.
- `tools/audit.js` suma `clubid-heredado-ambiguo` (P2), que no prohíbe la convivencia de `racing` con `racing-es`: avisa el día que un id heredado deja de ser inequívoco, que es el único momento en que renombrarlo vale lo que cuesta. Probado agregando un Racing Santander de mentira.
- Falso positivo corregido en `clubid-hardcodeado`: buscaba ids entre comillas en `index.html` sin saltear los comentarios HTML, así que cada mención de un club en la prosa del comentario de cabecera (50 KB) se reportaba como una rama por club. Ahora los comentarios se blanquean antes de buscar, conservando los números de línea, y no se miran backticks, que en prosa son markdown.
- Documentado, porque rompió el archivo al probarlo: un `clubId` con guion NO es clave JS válida sin comillas (`'racing-es': { ... }`).
- `auditAll()`: 222 checks, 0 mismatches, 0 warnings. `node tools/audit.js`: 0 P0, 0 P1.

## Versión 130: dos cargas simultáneas del mismo club dejan de pisarse

- BUG REAL, encontrado buscando qué más hace falta antes del selector jerárquico: `loadClubData()` marca el club como cargado recién en el `onload`, así que dos llamadas SIMULTÁNEAS al mismo club inyectaban dos `<script>` del mismo archivo. El segundo tira `SyntaxError: Identifier 'velezRevenueLinesByYear' has already been declared`, porque los `const` de un data file viven en el scope global. Los datos quedaban bien (gana el primero), pero la consola se llenaba de errores.
- No pasaba hasta ahora porque el sitio carga un club por vez. La comparación multi-club lo va a hacer todo el tiempo: 5 sujetos en paralelo, el mismo club en dos ejercicios, o el promedio de una liga que incluye al club activo.
- Arreglado cacheando la promesa en vuelo, y borrándola también al fallar para que un reintento después de un error de red vuelva a intentar de verdad. Verificado con 3 llamadas simultáneas en pestaña limpia: 1 solo `<script>`, 0 errores.

## Versión 131: el sitio tolera no tener club elegido

- Prerrequisito del cold start del selector jerárquico (§3.0a de `PROMPT-selector-jerarquico.md`), decidido con Guido: el hero sin club es `currentClub` en null DE VERDAD, no un club por debajo tapado por una capa.
- Se midió en vez de suponer: con `currentClub = null`, 9 de los 15 puntos de entrada de render tiraban TypeError (`populateFinanzasSelectors`, `populateCurrencyToggle`, `refreshFinanzas`, `populatePasesSelectors`, `applyPasesFilters`, `renderResultados`, `renderTitulosTable`, `renderInicioCharts`, `refreshAllForClub`). Ahora son 0.
- El arreglo va en los ACCESORES, no en cada punto de entrada: `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub` devuelven null, `yearMetaFor`/`reportTypeForYear`/`allYearsRangeForClub`/`computeYearGeneric` toleran que el club no esté cargado, y `populateFinanzasSelectors` deja los `<select>` vacíos. Un solo lugar por dato en vez de quince.
- `clubCargado(clubId)` nueva en `index.html`: el único lugar que contesta "¿hay datos de este club acá y ahora?", que distingue los dos estados nuevos ("todavía no se eligió" y "se eligió pero su archivo no bajó").
- `computeYearGeneric()` devuelve `null` sin club, y sus 2 orquestadores cortan ahí en vez de pintar ceros: un cero se lee como un dato, y este sitio no muestra datos que no tiene.
- Verificado en las dos direcciones: los 15 puntos de entrada con `currentClub = null` sin una sola excepción, y el camino normal intacto (`auditAll()` 222 checks, 0 mismatches, 0 warnings, cambio de club a Racing y Finanzas pintando).

## Versión 132: en qué liga jugó cada club, cada ejercicio

- `data/club-leagues.js` nuevo, a pedido de Guido: la liga de cada club en cada ejercicio, en UN archivo que se actualiza una vez por temporada, en vez de un campo `league` repartido en los 41 `data/<club>-data.js` como proponía el prompt del selector.
- Nace con las 85 filas en `null`, y `null` significa "nadie lo verificó todavía". No se rellena de memoria ni por deducción: se mira la temporada en la fuente y recién ahí se escribe. El archivo ES la lista de pendientes.
- `leagueAt(clubId, year)` devuelve null cuando no se verificó, a propósito, en vez de caer a "la liga de hoy": un ejercicio de hace diez años puede ser de otra categoría, y contestar con la actual sería inventar justo el dato que este archivo existe para no inventar.
- `tools/audit.js` suma `liga-sin-fila` (P2, un ejercicio real que ni siquiera tiene su fila) y `liga-sin-verificar` (P3, cuántas filas siguen en null). Hoy: 0 y 85 de 85.
- Pregunta abierta que bloquea las 55 filas argentinas: un ejercicio que cierra el 30/6 (o el 31/8 de Racing hasta 2021) cruza dos torneos del calendario argentino. Hay que fijar el criterio una vez. España, México y los de año calendario (Brasil, Japón, Colombia) no tienen esa ambigüedad.

## Versión 133: criterio de liga por ejercicio, y las primeras 30 filas verificadas

- CRITERIO decidido por Guido, escrito en `CONVENCIONES.md` y en el archivo: cuando un ejercicio cruza dos torneos, vale LA CATEGORÍA AL CIERRE. Es la misma regla que el proyecto ya usa para atribuir la gestión presidencial, así que es una regla menos que recordar. No afirma que todos los ingresos del ejercicio se hayan generado en esa categoría; si alguna vez eso importa, el matiz va en el aviso de la comparación, no en el criterio.
- 30 de las 85 filas de `data/club-leagues.js` verificadas contra las páginas de temporada de Wikipedia, con la fuente anotada por bloque: Japón (10 clubes, J1 2025), España (9 en LaLiga 2024/25 más Villarreal en 2023/24), Brasil (7, repartidos entre Série A y B), Colombia (2, Primera A) y México (1, Liga MX).
- Dos de esas 7 filas brasileñas corrigen la suposición del prototipo: Coritiba e Ituano jugaron la Série B 2024, y Atlético Goianiense la Série B 2025 (había descendido de la Série A 2024). Mirassol 2024 también es Série B, y ascendió para 2025, que es justo el caso que el prototipo usaba de ejemplo.
- Faltan las 55 argentinas, que necesitan la historia año por año de cada club.

## Versión 134: Argentina cargada, 82 de 85 filas de liga verificadas

- Las 55 filas argentinas de `data/club-leagues.js`, con su fuente. Vélez, San Lorenzo y Racing en todos sus años con balance: confirmado por Guido. El resto contra las páginas de Wikipedia de las temporadas 2022, 2023, 2024 y 2025 de Primera División, que cubren Estudiantes, Unión, Rosario Central, Independiente, Instituto, River y Boca de una.
- Argentinos Juniors es el único de los 11 que cambió de categoría en el período cargado: descendió al terminar el torneo de transición 2016 y jugó la B Nacional 2016-17, que ganó. Verificado contra la página de esa temporada.
- SUB-REGLA de "la categoría al cierre", que hizo falta exactamente una vez: vale la categoría de la temporada EN CURSO o recién terminada a la fecha de cierre. El ejercicio jul-2015/jun-2016 de Argentinos se jugó entero en Primera (el descenso se definió en mayo de 2016), así que ese ejercicio es Primera aunque al 30/6/2016 el club ya estuviera descendido para el torneo siguiente. Leerlo al revés etiquetaría como "B Nacional" un año cuyos ingresos son 100% de Primera.
- Los ids del primer y segundo escalón argentino son `ar-primera` y `ar-primeranacional`, NO el `ar-lpf` que propone `PROMPT-selector-jerarquico.md`: en el período cargado esa categoría cambió de organizador y de nombre tres veces (Primera de AFA, Superliga 2017-2019, Liga Profesional desde 2020), así que un id atado al organizador de hoy leería mal en un ejercicio de 2009. El id nombra el escalón, que no cambia.
- Quedan 3 filas en null, las tres presupuestos: Boca 2027 y Racing 2027 cierran en el futuro, y Racing 2026 no se chequeó contra la temporada.

## Versión 135: Boca deja de ser un caso especial en el código

- Los dos documentos de Boca que estaban escritos a mano como HTML adentro de `index.html` (Presupuesto Financiero y Presupuesto de Inversiones 2026/27, 133 líneas entre los dos) pasaron a ser datos en `data/boca-data.js`. Un `isBoca2027` decidía si se mostraban ellos o la versión genérica; ahora hay un solo render para todos.
- La forma genérica CRECIÓ para no perder nada: antes guardaba 4 números para el financiero y 1 para inversiones, así que mergear hacia ella habría borrado el desglose obra por obra de Boca (4 grupos, ~40 ítems). Ahora soporta `steps` (waterfall), `tabla` con filas tipadas (subhead/subtotal/total) y `groups` con ítems anidados; el club que tiene menos detalle declara menos.
- Los datos se extrajeron PARSEANDO el HTML existente, no retipeándolos, así que no hay riesgo de error de transcripción. De paso salió un tie-out gratis: los 4 grupos de inversiones suman exactamente el total impreso (41.767.058.000).
- Los presupuestos de Racing (Supuestos, Financiero, Inversiones) vivían en 3 registros `[clubId][year]` adentro de `js/finanzas-render.js`, o sea datos de club en la capa de render: onboardear un presupuesto obligaba a editar el motor. Se movieron a `data/racing-data.js` como `presupuesto*ByYear`, y el de Supuestos de Boca también.
- VERIFICACIÓN: se capturó el texto renderizado de las 6 cards (Boca 2027, Racing 2026, Racing 2027) ANTES del cambio, con los acordeones abiertos, y se comparó después. Los 6 hashes son idénticos, carácter por carácter. Un club sin presupuesto (Vélez) sigue escondiendo las 3 cards.
- Las tablas de Boca se muestran en pesos enteros y no responden al toggle de moneda, igual que cuando eran HTML fijo (`formato:'ars-exacto'`). Cambiar eso es una decisión aparte, no algo para colar en una mudanza.
- Los literales de `clubId` en el código bajaron de 5 a 2, y los 2 que quedan son a propósito: el club por defecto (desaparece con el cold start del selector) y los 3 cards de torneo de Boca, que Guido decidió dejar.

## Versión 136: primer sourcing fuera del fútbol — Reino Unido y EE.UU., 27 entidades de 7 deportes

*(Sesión de SOURCING solamente: no se cargó ningún club al sitio, no se tocó ni `index.html` ni
ningún archivo de `data/` ni de `js/`. Todo lo de abajo son documentos encontrados, descargados y
documentados, listos para una sesión de onboarding futura.)*

- **Companies House (Reino Unido) es el mejor canal encontrado hasta ahora, y no depende del
  deporte**: toda sociedad limitada británica deposita cuentas auditadas y el registro las publica
  gratis, sin login y sin API key. De un solo barrido salieron 4 deportes: fútbol, rugby union,
  cricket y Fórmula 1.
- Descargados y verificados uno por uno (entidad y período confirmados por OCR de la portada, no
  asumidos): **10 clubes de fútbol** (Arsenal, Tottenham, Liverpool, Manchester City, Everton,
  Chelsea, Newcastle, Aston Villa, West Ham y Celtic en Escocia), **4 de rugby** (Leicester Tigers,
  Northampton Saints, Bath, Harlequins), **4 condados de cricket** (Surrey, Lancashire, Yorkshire,
  Warwickshire) y **5 escuderías de F1** (McLaren, Williams, Aston Martin, Mercedes, Red Bull).
- Los clubes de cricket NO están en Companies House: son *registered societies* y depositan en el
  **Mutuals Public Register de la FCA**, que resultó mejor todavía — esos PDF sí tienen capa de texto
  (no hace falta OCR) y el histórico es mucho más profundo. Warwickshire tiene **37 memorias anuales
  desde 1993** y Surrey **35 desde 1994**: la serie más larga de todo el proyecto.
- **La SEC también es un canal, para los deportes de EE.UU. que no son fútbol.** El dead-end de la
  MLS (single-entity) era solo de la MLS: New York Knicks (NBA) y New York Rangers (NHL) publican vía
  Madison Square Garden Sports Corp., y los Atlanta Braves (MLB) vía Atlanta Braves Holdings. Los
  filings son HTML con texto real, cero OCR.
- Manchester United entra por los dos canales a la vez (20-F en la SEC + Companies House) y es el
  único club inglés del lote que no hay que OCRear. Ingresos 2024/25 ya verificados contra el propio
  documento: £666,5 M (Commercial 333.274 + Broadcasting 172.977 + Matchday 160.263).
- Cifras de control ya leídas de los documentos, listas como tie-out: Bath £23,3 M, Surrey £60,3 M,
  Lancashire £64,0 M, Warwickshire £40,4 M, Yorkshire £18,9 M, MSG Sports USD 1.154 M, Braves
  USD 732,5 M.
- Documentación nueva: `fuentes/Inglaterra/` (18 fichas + notas generales con el procedimiento
  completo), `fuentes/Escocia/`, 3 fichas nuevas en `fuentes/Estados Unidos/`, secciones 9, 10 y 11
  del skill `club-sourcing`, y 4 decisiones de criterio abiertas en `dudas-por-club.md` (qué país es
  el de una escudería de F1, qué hacer con un documento que cubre dos clubes de dos deportes, si un
  equipo de F1 entra en el esquema club-temporada-liga).
- CONVENCIÓN, decidida por Guido: las carpetas siguen ordenadas por PAÍS y el deporte se declara
  adentro del archivo de cada club (regla 3 de `fuentes-por-club.md`). No se migró nada de lo
  existente.
- `.gitignore`: se agregaron `Clubes/**/*.htm` y `Clubes/**/*.html` para que los filings de la SEC
  (2-4 MB de HTML cada uno) queden locales igual que los PDF. El patrón está limitado a `Clubes/**`
  a propósito, porque `index.html` y `fuentes.html` viven en la raíz y sí son parte del sitio.

## Versión 137: el selector jerárquico de club, el cold start y la comparación entre clubes

- `data/leagues.js` nuevo: el CATÁLOGO de la taxonomía del selector (6 deportes, 6 regiones, 6
  países, 8 ligas con su escalón). NO tiene membresía a propósito. REGLA DE ARQUITECTURA: no existe
  ninguna arista club → liga sin año; la membresía vive solo en `data/club-leagues.js`, que gana 6
  helpers (`clubsOfLeagueYear` para todo agregado, `leaguesOfClub` para el árbol, y los de
  navegación y cobertura). `clubs{}` gana `sport`, que sí es intrínseco del club.
- `js/selector.js` nuevo: el selector jerárquico Deporte › Región › País › Liga › Equipo, con
  búsqueda insensible a acentos, recientes en localStorage, punto de calidad del dato por club, dos
  salidas visibles y Ctrl/Cmd+K. Reemplaza al `<select id="clubSelect">` y a `populateClubSelect()`,
  las dos borradas. En el árbol, un club aparece bajo cada liga en la que tiene un ejercicio.
- COLD START: el sitio ya no abre en Boca. Sin club elegido muestra una portada con buscador grande,
  los 8 clubes con más ejercicios y un chip por liga, con el nav y las secciones escondidos. El club
  elegido queda en localStorage y la visita siguiente entra por el mismo camino que un click en el
  selector. Se vuelve con "Ver la portada" arriba del panel. `data/boca-data.js` deja de cargarse
  eager (78 KB menos en la primera carga) y no queda ningún club por default en el código.
- `js/comparar-clubes.js` nuevo: comparación entre clubes distintos (no confundir con "Comparar
  Gestiones"). La unidad comparable es (club, ejercicio), así que cada barra lleva su año y el mismo
  club en dos años son dos sujetos. Un solo modelo cubre 1 vs 1, N clubes y club contra el promedio o
  la mediana de su liga; el modo se deduce de la lista. Unicidad del par, forzada en los 4 caminos.
  Tope de 4 rivales + el club activo.
- Vista de comparación: barras horizontales por indicador (escala por indicador), "Composición de
  ingresos" al 100%, y la tabla detrás de un toggle. Fuerza USD y Formato simplificado, y lo dice en
  pantalla. Muestra "sin dato" en vez de 0 cuando la fuente no informa deuda, masa salarial o socios.
  4 avisos: sesgo del benchmark, ejercicios de años distintos, divisiones distintas, y presupuesto
  contra balance (este cuarto salió de probar, no del plan).
- Bugs reales corregidos: `hidden` perdía contra `display:flex/grid` (la franja de recientes aparecía
  vacía); el botón del selector aplastaba el `nav` a 0px abajo de 900 y las 4 pestañas desaparecían
  (to-do 9, ahora el nav tiene su propia fila); el `alert()` de error de carga congelaba la página
  entera, timers y `onload` incluidos, así que un club guardado que fallara dejaba el sitio
  congelado en cada visita (reemplazado por un aviso dentro de la portada); el toggle de moneda
  mostraba "undefined" sin club; la grilla de indicadores desbordaba en un teléfono de 375px.
- `data/lang/en.js`: 95 claves nuevas. `tools/audit.js` ahora busca claves `t()` también en
  `js/selector.js` y `js/comparar-clubes.js`, que antes no miraba (el chequeo pasaba mientras el
  visitante leía castellano).
- Verificación: `auditAll()` 41 clubes, 222 checks, 0 que no cierran, 0 warnings de fx. `node
  tools/audit.js` 0 P0, 0 P1. Cada cifra de la comparación verificada contra `computeYearGeneric()`
  + `toDisplayValue()`.

## Versión 138: el estado y la to-do list salen de index.html, y se van los ejercicios placeholder

- `ESTADO.md` y `TODO.md` nuevos. Hasta acá el estado del proyecto, la lista de qué es real por club
  y la to-do list entera vivían en un comentario HTML de 830 líneas al principio de `index.html`:
  80 KB de los 183 KB del archivo, que además bajaba cada visitante en cada pageview. Pedido
  explícito de Guido ("Index NO es el archivo para tener to do. Eso era al inicio"). En `index.html`
  queda un puntero de 15 líneas y el archivo baja a 122 KB, fuera de la lista de archivos pesados de
  la auditoría.
- `tools/generate-club-index.js` ahora escribe la sección "QUÉ ES REAL Y QUÉ ES PLACEHOLDER, POR
  CLUB" en `ESTADO.md` en vez de en `index.html`.
- TO-DO: se borraron 4 puntos por decisión de Guido en vez de marcarlos resueltos (buscar los
  ejercicios que faltan de Racing/River y de Boca, el toggle de Formato simplificado ya resuelto, y
  Mercado de Pases, fuera de alcance). La mitad que seguía abierta del viejo punto 0 (partir
  `CHANGELOG.md` y la narrativa) vuelve como punto 24. Los números pasan a ser identificadores
  estables, no prioridad: los puntos se citan entre ellos y desde los skills.
- SE BORRARON LOS 9 EJERCICIOS PLACEHOLDER que quedaban, 7 de Boca (2018, 2019, 2021, 2022, 2023,
  2024, 2026) y 2 de River (2021, 2025), junto con sus 2 entradas de `sources`. Cinco eran
  placeholder puro con rubros inventados; cuatro eran ejercicios reales sin publicar, cargados en
  cero. Todo ejercicio que muestra el sitio tiene ahora un documento detrás.
- Consecuencias: 85 ejercicios en vez de 94, 89 documentos en vez de 91, Boca pasa de calidad
  "mixta" a "oficial" en el selector, los gráficos de Inicio pierden las columnas vacías, y el
  `<select>` de Año de Boca queda con sus 2 ejercicios reales. `gestionesByClub` se ajustó: el rango
  de Riquelme arranca en 2025 y el de Brito es 2024; `ameal`, `angelici` y `donofrio` se quedan sin
  ejercicio pero siguen declaradas, porque Mercado de Pases y Resultados agrupan por gestión.
- Verificación: `auditAll()` 41 clubes, 222 checks, 0 que no cierran, 0 warnings de fx (los mismos
  222: ningún ejercicio borrado tenía total oficial contra qué cerrar). `node tools/audit.js` 0 P0,
  0 P1.

## Versión 139: la traducción al inglés queda completa, `fuentes.html` incluida

- Los 3 cards de torneo del presupuesto de Boca 2026/27 (Copa Libertadores, Campeonato Liga
  Profesional, Copa Argentina) eran el último HTML del sitio sin `data-i18n`. Ahora su chrome se
  traduce; los rubros de sus tablas ("Premios Grupales", "Remuneraciones BICA, S.A.C.", "Policía
  Adicional") NO, porque salen textuales del presupuesto.
- `fuentes.html` se traduce sola. Carga `js/i18n.js` y el mismo diccionario que el sitio, y respeta
  el idioma que el visitante ya eligió. Se descartó generar un `fuentes-en.html` aparte: dos
  archivos por idioma se multiplican por cada idioma nuevo, y esta página además va a tener que
  partirse por país arriba de ~300 documentos (to-do 22c). Se traducen el chrome, el tipo y el nivel
  de cada fuente, y la procedencia de cada tipo de cambio (etiquetas nuestras); el título de cada
  documento queda en su idioma original.
- El generador de `fuentes.html` lee el `ASSET_V` de `index.html` en vez de tener el suyo, para que
  las dos páginas no puedan pedir versiones distintas del mismo `js/i18n.js`.
- REGLA NUEVA en `CONVENCIONES.md`, que cierra la decisión que el to-do 19(c) dejaba abierta: se
  traduce el chrome y toda etiqueta nuestra; no se traduce nada que salga textual de un documento ni
  ningún nombre propio (club, liga, y los nombres de gestión, que son apellidos de presidentes).
- 30 claves nuevas en `data/lang/en.js`. Cobertura: 204 de 204 claves usadas, y 28 de 28 en
  `fuentes.html`. To-do 19 borrado.

## Versión 140: la home dejó de publicar el presupuesto como si fuera el último balance

- INICIO mostraba, para Boca, "Último resultado: +2,0 M USD" y "Deuda neta actual: 0,0 M USD". Los
  dos salían del PRESUPUESTO 2026/27, porque `renderInicioStats()` usaba "el último ejercicio de la
  gestión actual" como sinónimo de "el estado actual del club". El de deuda era el peor: un
  presupuesto proyecta ingresos y egresos, no un balance, y escribe deuda y caja en cero, así que la
  home decía que Boca no debe nada. Ahora cada stat pide el último ejercicio QUE TENGA SU DATO (el
  último balance para el resultado, el último que informe deuda para la deuda), y escribe cuál es
  abajo del número en vez de esconderlo en un tooltip. Boca pasó a mostrar +29,6 M USD y 26,6 M USD,
  los dos del Balance 2024/25. Verificado en los 41 clubes, ninguno con NaN ni "undefined".
- RIVER 2024: sus 8 líneas de gasto estaban las 8 en `other_expenses` (80% en el catch-all,
  "Salarios y primas" en $0). Su Anexo VIII desglosa por DESTINO y no por naturaleza, así que se
  mapeó cada destino al bucket que ya existe, siguiendo línea por línea el precedente de Boca 2025.
  El catch-all quedó en 0% y el 53% que la fuente no desglosa está en la fila "Fútbol profesional
  (sin desglosar por la fuente)". Ni un peso se movió: el total sigue cerrando exacto.
- TIPOS DE CAMBIO: `FX_SOURCE` gana `document_average`, el caso que faltaba (un balance convierte su
  estado de resultados a un promedio del período y su balance al cierre; sin esta categoría habría
  que etiquetarlo `document_close`, que sería falso).
- UNIÓN: sus 4 tipos de cambio estaban marcados `market_close` y los 4 salen del Anexo V de su
  propio balance. Pasaron a `document_close`. El hallazgo "Unión 2024 usa 890,50 cuando la tabla dice
  909" era real pero mal diagnosticado: un Anexo de moneda extranjera valúa activos al comprador y
  pasivos al vendedor, así que los dos son el mismo día y los dos están bien. `fx-mercado-discrepante`
  quedó en 0 y `fx-mercado-fuera-de-tabla` bajó de 8 a 5.
- `tools/audit.js`: los umbrales de tamaño de archivo pasan a depender de CÓMO se lee cada uno. Los
  que se leen enteros (`index.html`, `ESTADO.md`, `TODO.md`) quedan apretados; `CHANGELOG.md` y
  `finance-of-sports-project.md` son de consulta puntual (se entra con grep, se lee un bloque) y su
  umbral sube. El to-do de partirlos se borró: partirlos tendría un costo real (hoy "dónde está la
  historia" tiene una respuesta de una palabra) y no resolvería ningún problema que exista.
- Auditoría: 0 P0, 0 P1, 51 P2 (eran 54), 8 P3 (eran 12). `auditAll()` 222 checks, 0 que no cierran.

## Versión 141: lo que la fuente no desglosa ahora lo dice, en vez de disfrazarse de otra cosa

- JAPÓN: se salió a buscar si el desglose de ingresos por club existe en algún lado (pedido de
  Guido). No existe, y quedó verificado con 3 evidencias independientes: la tabla por club del
  propio disclosure (exactamente 3 filas: total, sponsors, entradas), la "Ｊリーグ クラブ経営ガイド
  2025" (documento oficial distinto, que sí tiene las 8 categorías pero solo como promedio de J1/J2/
  J3), y el portal de terceros, que solo muestra el total por club. Anotado en
  `fuentes/Japón/_notas-generales.md`, incluida la advertencia sobre notas de análisis japonesas que
  circulan con un desglose de 4 líneas cuya cifra de 物販 no está en ninguna edición del documento.
- Los 10 clubes japoneses pasaron su línea residual de `other_income` a
  `lump_football_operations`: el número es el mismo, pero la fila dice "Fútbol profesional (sin
  desglosar por la fuente)" en vez de "Otras secciones deportivas y otros ingresos", que sugería que
  sabíamos qué era esa plata.
- `catchall-dominante` bajó de 11 a 3 (quedan instituto 2024 y velez 2016/2017, cuyos documentos sí
  podrían tener más detalle). P2 total: 44, eran 54 al empezar el día.
- `auditAll()`: 41 clubes, 222 checks, 0 que no cierran. Ningún total se movió.

## Versión 142: la to-do list pasó de 18 puntos a 8, y Japón pasó de tarea a pregunta

- Sacados de `TODO.md` por decisión de Guido, con el motivo escrito en el propio archivo para que
  quede el registro: los 6 puntos de sourcing y onboarding por país (eran 12 a 18 — Argentina,
  Ecuador, Marruecos, Club América, Brasil, España, Colombia), que son trabajo normal del proyecto y
  no una lista de pendientes; y el corte free/paid y el paywall (eran 5 y 6).
- DECISIÓN: el sitio va **todo gratis por ahora**. `ESTADO.md` lo dice, se borró el CSS muerto de
  `.premium-cta` (2 reglas que ya no usaba ningún markup), y queda anotado que "Mi Cuenta" es lo
  único que todavía le anuncia al visitante un plan pago.
- JAPÓN: la pregunta que quedó abierta tras la Versión 141 se anotó en `dudas-por-club.md`, en dos
  mitades — a la liga (¿existe el desglose por club del lado de la J.League, que es quien arma los
  promedios divisionales, y hay algún corte de GASTOS por club?) y a cada club (¿publican su propio
  決算公告 / 事業報告 completo?), cada una con su canal de contacto verificado.
- Cerrados también 7 (dominio y repo: ya estaba hecho, el repo se llama `guidomamone/finance-of-sports`
  y los push llegan) y 10 (los 3 cards de presupuesto en un tab propio: era un "evaluar si vale la
  pena", y no vale). Lo único del 7 que no había que perder — que la línea `finance-of-sports/` del
  `.gitignore` del sitio profesional es lo que mantiene separados los dos repos anidados — se movió
  a `CLAUDE.md`, que se lee en cada sesión.
- Anotados 3 hallazgos nuevos que salieron de PROBAR el punto 9 en un teléfono, ninguno en ninguna
  lista antes (25, 26, 27): el KPI "Deuda neta" de Finanzas publica 0,0 en un ejercicio de
  presupuesto mientras el aviso de abajo dice que ese 0 no es una deuda de cero (el mismo bug que
  la 140 arregló en Inicio, en la otra pestaña); `.header-right` desborda a 375px y deja el botón
  de idioma fuera de la pantalla, regresión del selector de la 137; y `debtDisclosureNote()` no
  pasa por `t()`, así que su aviso sale en castellano con el sitio en inglés.
- El punto 9 quedó anotado con su medición: ya no se reproduce (ningún elemento de `#finanzas`
  excede los 375px), pero se deja abierto hasta que Guido lo mire.
- Nada de esto mueve un número: `auditAll()` sigue en 41 clubes, 222 checks, 0 que no cierran.

## Versión 143: prototipo de un Inicio en frío donde el selector ES la portada

- NUEVO `prototipo-inicio-selector.html` (no se deploya, no lo linkea ninguna página): la primera
  visita, en vez del card con buscador chico, abre con el **selector jerárquico desplegado en la
  portada**, con copy antes (qué es el sitio) y después (qué pasa cuando elegís + los 8 clubes de
  acceso rápido + el conteo). Pedido de Guido.
- El selector se puede **minimizar**: colapsa a una línea con el buscador de hoy y recuerda el
  estado en `localStorage` (`fos_proto_selector_min`). Buscar desde ahí lo vuelve a abrir, porque
  los resultados se dibujan adentro del panel.
- El panel NO se duplica: es el mismo `#clubPanel`, que el prototipo MUDA adentro de la portada
  mientras no hay club elegido y devuelve al `<body>` (modal de siempre) apenas hay uno. La mudanza
  la dispara un `MutationObserver` sobre el `hidden` de `#coldHero`, así el prototipo no parchea
  `applyClubMode()` ni `js/selector.js`.
- En frío se esconde el botón de club del header: repetía la misma acción a 2 cm del selector, y
  "Cambiar" sin club elegido no significa nada. Vuelve con el club.
- NUEVO `tools/build-prototipo-inicio.js`: genera el prototipo desde `index.html` (falla si un
  ancla no está, en vez de escribir un archivo a medias). El prototipo anterior era un mock con
  taxonomía embebida y números inventados; este corre con los 41 clubes y el motor reales, porque
  lo único nuevo a decidir es el layout.
- Nada del sitio cambió: `index.html` intacto, `node tools/audit.js` igual (0 P0, 0 P1).

## Versión 144: el prototipo de portada suma el ejercicio al selector

- En la columna EQUIPO cada club trae ahora un `<select>` con sus ejercicios, del más reciente al
  más viejo ("Presupuesto 2026/2027", "Balance 2024/2025", y año suelto para los clubes de
  ejercicio calendario: el label sale de `ejercicioLabel()`, no de un formato nuevo). Elegir uno
  carga el club Y cae en su ficha de Finanzas de ESE ejercicio, reusando `goToFinanzasYear()`.
  Pedido de Guido. Clickear la fila sigue llevando al club entero, sin tocar el dropdown.
- Anda igual en el árbol y en los resultados de búsqueda (las dos ramas dibujan la misma
  `clubRow()`), y en el panel embebido de la portada igual que en el modal del header.
- NUEVO `prototipo-inicio-ejercicios.js` (generado): por club, la lista de `[año, reportType]`.
  Es lo que hoy le falta a `data/club-index.js` — que trae el CONTEO de ejercicios y el último,
  no la lista — para que el panel pueda ofrecer el ejercicio sin bajar el `data/<club>-data.js`
  de cada club (41 clubes en pantalla, 0 archivos de datos bajados, y eso no se negocia).
- NUEVO `prototipo-inicio-selector.js` (generado): copia PARCHEADA de `js/selector.js` con los 3
  cambios que esto necesita (la fila pasa sus ejercicios, `pick()` acepta un año, `mkRow()` dibuja
  el select). El diff contra `js/selector.js` ES la propuesta de implementación.
- En móvil el dropdown baja a su propio renglón: al lado del nombre le comía 128px de 312px y
  partía el nombre del club ("Argentinos Juni…", medido a 390px).
- `js/selector.js` y el resto del sitio siguen intactos; `node tools/audit.js` sin cambios.

## Versión 145: 5 correcciones al prototipo de portada, una de ellas es un bug del sitio

- BUG DEL SITIO PUBLICADO, encontrado por Guido probando el prototipo: al elegir una REGIÓN, la
  columna Liga seguía listando las ligas de todos los países, así que después de cambiar de región
  quedaban a la vista las ligas de la anterior. La selección sí se limpiaba (`sel.league = null`);
  lo que no se filtraba era la lista. Arreglado en la copia del prototipo; `js/selector.js` sigue
  con el bug hasta que se decida el resto (to-do 28).
- La fila de club suma dos botones con texto, **Ver** y **Ver y elegir otro**. El segundo muestra
  el club pero NO cierra el panel y lo deja en modo comparar, así el siguiente que toques se suma
  en vez de reemplazar (pedido de Guido: "permanecer en el selector y elegir un segundo equipo,
  liga, etc"). Reemplazan al "+" de la fila de club: el mismo camino que antes había que descubrir.
  El primer club tiene que pasar a ser el activo porque el modelo de comparación lo tiene como
  sujeto 0; del segundo en adelante entran como rivales.
- El dropdown de ejercicio y los dos botones van en un segundo renglón de la fila, alineados bajo
  el nombre: los 3 controles en línea le dejaban ~110px al nombre del club y lo partían. El panel
  embebido pasó de 520 a 620px de alto para compensar filas más altas.
- COPY: la bajada de la portada pierde "y mercado de pases" (el sitio todavía no lo tiene cargado)
  y deja de cortarse a los 600px, que le metía un salto de línea en la mitad de la frase con medio
  card vacío al lado. Los ejemplos del buscador van con mayúscula ("Boca", "LaLiga", "Japón"): la
  búsqueda ignora mayúsculas y acentos, así que escribirlos bien no le cuesta nada al que busca.
  Los dos cambios tienen su gemelo pendiente en `data/lang/en.js` (`hero.sub`, `selector.search.ph`).
- "O empezá por uno de estos" pasó de 8 clubes a 3.

## Versión 146: el índice liviano ahora lista los ejercicios, y la portada se queda en la página

CAMBIO REAL DEL SITIO (lo único de esta sesión que sale del prototipo):

- `data/club-index.js` gana `yrs`: la LISTA de ejercicios de cada club con su reportType, del más
  reciente al más viejo, además del conteo (`y`) que ya tenía. Lo genera
  `tools/generate-club-index.js` desde los mismos `fiscalYearMeta`, así que no se puede
  desincronizar. Es lo que le faltaba al selector para poder ofrecer un ejercicio puntual
  ("Balance 2024/2025") sin bajar los 41 `data/<club>-data.js`. El archivo pasó de 4,4 a 7 KB;
  se guarda el reportType completo y no un código de una letra porque son 7 strings repetidos
  miles de veces, o sea justo lo que gzip aplasta, y un código propio costaría una tabla de
  traducción para ahorrar bytes que el transporte ya ahorra.
- `ASSET_V` a 142, en la constante y en los 13 tags (`data/club-index.js` cambió y sin esto un
  visitante que ya entró se queda con el viejo cacheado).
- `auditAll()`: 41 clubes, 222 checks, 0 que no cierran, 0 warnings. Ningún número se movió.

PROTOTIPO (`prototipo-inicio-selector.html`), 7 pedidos de Guido:

- EL SELECTOR SE QUEDA EN LA PÁGINA con el club ya elegido, encima de sus datos, y ahí sí se
  minimiza (bar de 53px). Antes desaparecía al elegir y había que ir al header para cambiar de
  club. La portada dejó de ser una pantalla aparte: es el mismo bloque en dos modos, y eso lo
  decide `applyClubMode()`, que ya era la única función que decidía portada vs. club.
- El botón Minimizar se fue de la portada en frío: ahí abajo no hay nada que descubrir.
- Las pestañas del header se ven desde la primera visita, apagadas e inertes hasta que haya club.
- La fila de club quedó en UNA línea (43px, eran 70): se fue el subtítulo "N ejercicios · Liga"
  (los ejercicios están en el dropdown de la misma fila; la liga es la columna de al lado) y los
  dos botones se juntaron con el dropdown de ejercicio en un solo control, "Ver", con las
  opciones agrupadas. Los resultados de búsqueda SÍ conservan el subtítulo: ahí no hay columnas
  que den ese contexto.
- Los 3 clubes de acceso rápido se mudaron al lado derecho del buscador, que ocupaba todo el
  ancho con la mitad vacía.
- Se fueron los dos copys que sobraban: el "Elegí tu club / Escribí el nombre..." de arriba del
  selector y el párrafo de abajo.
- Y se esconde "Ver la portada con todos los clubes": la portada ya no es otra pantalla.

## Versión 147: el prototipo se puede volver a la primera visita

- Botón "Volver a la primera visita" en la franja roja del prototipo (pedido de Guido). Borra las
  4 claves que el sitio guarda en el navegador — el club elegido, los recientes, el cartelito del
  selector y el estado minimizado — y recarga arriba de todo, con `history.scrollRestoration` en
  manual para que no vuelva al scroll anterior. El idioma NO se toca: resetearlo mandaría la
  página a inglés según el navegador, y lo que se prueba acá es el selector.
- Vive en la franja del prototipo y no en el sitio a propósito: no es una feature, es el banco de
  pruebas. El sitio no tiene backend, así que "primera visita" son exactamente esas claves.

## Versión 148: un segundo prototipo de selector, de a un paso por vez

- NUEVO `prototipo-pasos.html` + `prototipo-pasos-selector.js` + `tools/build-prototipo-pasos.js`.
  El prototipo 1 (`prototipo-inicio-*`) queda intacto: son dos visualizaciones para comparar, no
  una encima de la otra.
- QUÉ CAMBIA (Guido: "siento que con el actual le estamos poniendo una cantidad de información
  impresionante al usuario ni bien se loguea"). El panel de columnas muestra a la vez 6 deportes,
  6 regiones, 6 países, 8 ligas y 41 clubes: ~67 opciones y 5 decisiones simultáneas. Acá se elige
  de a una: un card por paso (Deporte › Región › País › Liga › Club), apilados, el siguiente se
  abre cuando el anterior se resolvió y el resuelto se encoge a una línea con lo elegido y un
  "Cambiar". Un 6to card, opcional, elige el ejercicio.
- Como los cards van apilados, la misma pantalla entra en un teléfono SIN una sola regla de media
  query: verificado a 390px, sin scroll horizontal.
- FUERA, a pedido de Guido: el punto de color de calidad del dato y su leyenda (Balance oficial /
  Parcial / Placeholder / Sin datos).
- "Cambiar" en un paso borra ESE y todos los de abajo, así que el bug de la to-do 29 (la liga de
  la región anterior seguía a la vista) no puede existir acá: el estado es el CAMINO, no una
  selección suelta por columna.
- Se mantiene lo que el prototipo 1 dejó aprobado: el selector vive en la página y se queda
  (plegado a una línea) con el club ya elegido, las pestañas se ven desde la primera visita, y hay
  un buscador de una línea como atajo para quien ya sabe qué club quiere.
- El selector nuevo NO es un parche de `js/selector.js`: es otro componente, con la MISMA API
  pública (init/open/close/refresh/renderButton/goHome/savedClub), así `index.html` y
  `js/comparar-clubes.js` no se enteran de cuál está cargado.
- Apoyado en dos libros de `Business Books/`: la segunda ley de Krug (`dont_make_me_think.md`) —
  muchos clicks obvios le ganan a uno que obliga a pensar — y la divulgación progresiva de
  Higgins (`better_onboarding.md`).

## Versión 149: el prototipo 2 pasa a multi-selección, todo paso se puede ignorar, y comparar deja de ser opcional

Cuatro reglas nuevas de Guido, todas dentro de `prototipo-pasos.html` (el sitio no se tocó):

- **Todo paso se puede ignorar**, con un botón que dice **"Elegir más tarde"**. Es lo mismo que un
  "ver todos" pero dicho como lo piensa el visitante: no es que quiera ver todo, es que todavía no
  quiere decidir eso. Consecuencia directa: el paso del ejercicio dejó de estar marcado como
  "opcional", porque ahora lo son los seis y marcar uno solo decía algo falso de los otros cinco.
- **Cada paso es multi-selección**, con casilla en vez de botón: "Argentina y Brasil" es una
  respuesta tan válida como "Argentina". Por eso cada paso necesita un "Continuar" explícito (que
  además dice cuántos llevás elegidos): con casillas, el primer click ya no puede avanzar solo sin
  romper la posibilidad de marcar una segunda.
- **Si ignora todo, elegimos nosotros y se lo decimos**: "No elegiste nada, así que elegimos por
  vos: Boca Juniors contra River Plate", y la comparación queda cargada abajo. Si un filtro
  anterior deja afuera a alguno de los dos, la regla se generaliza sola a los dos clubes con más
  ejercicios de lo que quedó.
- **Un club solo no es el destino**: "la gracia de todo esto es comparar, no analizar un club en
  solitario" (Guido). Cuando la selección termina con uno, el card final no felicita a nadie:
  explica por qué un número solo no dice nada y ofrece 3 rivales de su propia liga a un click. El
  mismo club en 2 ejercicios también cuenta como comparación, y ahí el card no insiste.
- Los ejercicios elegidos se aplican sobre los chips de la bandeja (`.chip-year`), que es el
  control que ya sabe qué años son válidos para cada sujeto. Se reintenta 4 veces porque ese
  redibujo es asíncrono y pisaba el primer intento (el segundo chip se quedaba con el año
  automático).
- `Business Books/` agregado al `.gitignore`: este repo es público y deploya a Netlify, así que
  commitear esos resúmenes los publicaría en internet.

## Versión 150: grupos en el prototipo 2 — sumar clubes y ligas y medirlos contra otro grupo

Tres pedidos de Guido, todos dentro de `prototipo-pasos.html` (el sitio no se tocó):

- **"Elegir todos" en el paso del club**, que arma un grupo entero (una liga, un país, o lo que
  hayas filtrado) en un click en vez de tildar 11 casillas.
- **LADOS (grupos)**: la selección terminada se guarda como un lado, y el card final ofrece
  "Comparar contra otro grupo", que reinicia los pasos manteniendo lo ya armado. La barra de arriba
  muestra `A: Primera División (11) · B: LaLiga (10)`. Es la funcionalidad que faltaba: hasta acá
  `js/comparar-clubes.js` compara SUJETOS sueltos (hasta 5) y su "promedio de liga" es un promedio,
  no un total; un lado SUMA. Probado con el ejemplo de Guido: Primera División contra LaLiga.
- El corte entre las dos vistas no es un gusto: hasta 5 clubes se usa la comparación que el sitio
  ya tiene (una barra por club), que es el MAX de sujetos de `comparar-clubes`; de ahí para arriba
  el grupo se suma y se muestra como un lado.
- **El paso del ejercicio dejó de ser confuso** (Guido: "el usuario no tiene claro de quién es cada
  ejercicio"). Con UN club se listan SUS ejercicios con la etiqueta real ("Balance 2024/2025"); con
  varios, un ejercicio no es de nadie en particular, así que se listan los AÑOS DE CIERRE
  ("Cierre 2025") y cada uno dice a cuántos de los clubes elegidos les corresponde. El texto de
  ayuda explica por qué el año es el del cierre y que sin elegir nada se usa el más reciente de
  cada uno.
- LAS 3 REGLAS DE HONESTIDAD DEL TOTAL DE UN GRUPO, que es lo que hace que la vista sirva: un club
  sin el ejercicio pedido queda AFUERA del total y se cuenta aparte (no suma cero); un indicador que
  la fuente no informa se cuenta aparte ("8 de 11 lo informan"); y los números salen de
  `computeYearGeneric()` + `toDisplayValue()`, el motor real, sumando lo que ya calculó club por
  club. Además el card avisa cuando los ejercicios sumados abarcan más de 2 años y cuántos de ellos
  son presupuestos (proyecciones) y no balances.
- BUG DE TOOLING corregido en los DOS generadores: los `<script>` de los prototipos no llevaban
  `?v=`, así que el navegador servía el JS viejo de su caché con el HTML nuevo y se depuraba un bug
  ya arreglado (la trampa que documenta `CLAUDE.md`). Ahora llevan la fecha de modificación.
