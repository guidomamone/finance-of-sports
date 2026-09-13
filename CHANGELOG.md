# Changelog

Este archivo es la versión condensada del historial de `finance-of-sports`, versión
por versión, desde la Versión 10 (cuando el sitio pasó de ser solo de Boca a
multi-club) hasta hoy. Son bullets terses de qué cambió, no el porqué completo.
Para el razonamiento narrativo detrás de cualquier entrada (qué se probó, qué se
descartó, cómo se encontró cada bug) ver `Proyecto Boca.md`. Para el estado
actual del proyecto (qué hay armado, qué es real vs. placeholder por club, y la
to-do list vigente) ver el comentario HTML al principio de `index.html`.

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
- Carpeta local renombrada `numeros-de-boca/` → `finance-of-sports/`. 58 referencias de PATH (`numeros-de-boca/...`) actualizadas en docs, skills, transcripciones de `Clubes/` y comentarios de cabecera de `data/*.js`; las referencias al NOMBRE viejo se actualizaron también, salvo 3 líneas de historial puro (CHANGELOG Versión ~50, `Proyecto Boca.md`) donde el nombre viejo es el dato correcto y se aclaró entre paréntesis.
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
