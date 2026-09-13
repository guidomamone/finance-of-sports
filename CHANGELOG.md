# Changelog

Este archivo es la versión condensada del historial de `numeros-de-boca`, versión
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

- Primera vez con control de versiones (git) propio para `numeros-de-boca`.
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
