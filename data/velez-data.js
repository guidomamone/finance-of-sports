// ============================================================================
// data/velez-data.js — Club Atlético Vélez Sarsfield: primer club nuevo que se agrega desde que
// existe el motor genérico (antes solo River/Racing lo usaban — esto obligó a sumar una 3ra rama a
// varios ternarios de js/finanzas-calc.js/js/finanzas-render.js que estaban hardcodeados a
// river/racing, ver Versión 82 en el historial de index.html).
//
// TODOS los ejercicios con archivo oficial disponible están cargados (Versiones 82-93): 2025
// (N°115), 2024 (N°114), 2023 (N°113, OCR), 2022 (N°112), 2021 (N°111), 2020 (N°110), 2019 (N°109),
// 2018 (N°108), 2017 (N°107, OCR), 2016 (N°106, OCR) y 2015 (N°105, OCR) — rango COMPLETO y sin
// huecos, 11 ejercicios consecutivos 2014/2015 a 2024/2025. Copias locales de los PDF y sus
// transcripciones en
// Clubes/Argentina/Velez Sarsfield/balance-general-{2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015}.{pdf,md}.
// El club no tiene (hasta donde se relevó) ejercicios previos a 2015 cargados en su archivo
// institucional (velez.com.ar/elclubesdelossocios/memorias-estados-contables, ver
// fuentes-por-club.md) — si aparece uno nuevo ahí en el futuro, o se publica el Ejercicio 2026,
// ese sería el próximo candidato natural.
//
// SOBRE EL OCR DE 2023/2017/2016/2015 (Versiones 90-93): esos 4 PDF no tienen capa de texto
// (pdftotext devuelve vacío o casi vacío). Se instaló Tesseract vía Homebrew (`brew install
// tesseract tesseract-lang`, incluye español) y se generó cada transcripción con
// `pdftoppm -png -r 300` (450-900dpi para 2015/2016, páginas físicamente más chicas) +
// `tesseract <pagina> -l spa --psm 6` página por página. Mucho más barato en tokens que renderizar
// cada página como imagen con el Read tool (la alternativa que documentaba el gotcha viejo de
// CLAUDE.md). OJO: varias páginas con tablas anchas (Anexo II/III, 6+ columnas) vienen ROTADAS 90°
// en el PDF original — el OCR sale ilegible si no se rotan primero (`Image.rotate(-90,
// expand=True)` con PIL antes de correr tesseract en esas páginas puntuales); si eso tampoco
// alcanza (página muy chica), re-renderizar esa página puntual a mayor DPI (900+) antes de rotar y
// re-OCRear. Los NÚMEROS finales se verificaron fila por fila: para cada línea de gasto se usa el
// valor de la columna TOTAL <año> impreso (no se reconstruye sumando las 6 columnas de sector, que
// es donde el OCR tiene más ruido), y la suma de todas esas columnas TOTAL tiene que cerrar exacto
// contra el total impreso del Anexo (y contra GASTOS ORDINARIOS del Estado de Recursos y Gastos) —
// no alcanza con "el OCR dio un número". 2016 cerró exacto sin ruido; 2015 y 2017 cerraron con una
// diferencia de $40-50 mil sobre totales de cientos de millones (0,00001-0,00002%), irrelevante y
// muy por debajo de la tolerancia de verifyTieOuts(). Si se encuentran más ejercicios escaneados
// más adelante, reusar este mismo flujo.
//
// BUG REAL encontrado y corregido en esta sesión (Versión 93): al cargar 2015, `verifyTieOuts()`
// marcó una diferencia de ~$35M en "Expenses" que NO era ruido de OCR — era un bug en la fórmula
// del check mismo (`Math.abs(expenses) + Math.abs(nonCash)` en vez de
// `Math.abs(expenses + nonCash)`), que da un resultado distinto cuando `nonCash` neto es POSITIVO
// (pasa cuando el crédito de "reclasificación" de un ejercicio es más grande que su amortización
// real de plantel — le pasó a 2015 y 2017, nunca antes a ningún ejercicio de ningún club). Se
// corrigió la fórmula en TODOS los checks de `verifyTieOuts()` (no solo los de Vélez) — es
// matemáticamente equivalente para todo ejercicio donde nonCash ya era negativo (que es todos los
// demás), así que no rompió ningún check que ya cerraba.
//
// Convención de categorización (ver .claude/skills/club-data-mapping/SKILL.md antes de tocar esto):
// el Anexo III (Gastos específicos de sectores) de Vélez desglosa CADA rubro en 6 columnas por
// sector (Fútbol Profesional / Amateur / Complejo Polideportivo / Actividades de Enseñanza / Otras
// Actividades Culturales / Otros Deportes y Sectores) — a diferencia de Racing, que ya viene con una
// sola cifra por rubro. Para que "Salarios y primas (plantel y cuerpo técnico)" sea comparable
// entre clubes (solo el plantel profesional, no TODO el personal del club incluida la escuela),
// "Remuneraciones al personal" y "Cargas sociales" se separaron en 2 líneas cada una: la porción de
// la columna FÚTBOL PROFESIONAL (-> wages_squad) y el resto de las 5 columnas restantes (->
// youth_other_sports_expense, que ya cubre juvenil/otros deportes/polideportivo — acá también carga
// el personal de Enseñanza/Culturales, que Vélez no separa más fino). "Primas y premios de
// jugadores y cuerpo técnico" es casi 100% de la columna Fútbol Profesional (12.637,171532 de
// 12.639,230993 M), se cargó completa en wages_squad sin separar el resto (2,059461 M, 0,00002% del
// total) para no sumar una línea que redondea a $0.

const velezRevenueLinesByYear = {
  // Anexo II "Recursos ordinarios", columna "Totales 2025". Todo en ARS MILLONES (pesos oficiales /
  // 1.000.000), moneda homogénea (reexpresada según FACPCE, Nota 1.b del balance) — mismo criterio
  // que el resto del sitio, sin ninguna conversión adicional al cargar el dato.
  2015: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:70.543391, disclosureLevel:'detailed' },
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:12.537402, disclosureLevel:'detailed' },
    { rawLabel:'Por competencias deportivas', normalizedCategory:'matchday_competition', amountNative:9.392134, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:54.392400, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:22.816660, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:25.767471, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:30.885549, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:34.525329, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:19.132577, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:3.385100, disclosureLevel:'detailed' },
  ],
  2016: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:90.974353, disclosureLevel:'detailed' },
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:14.402471, disclosureLevel:'detailed' },
    { rawLabel:'Por competencias deportivas', normalizedCategory:'matchday_competition', amountNative:7.626400, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:54.231045, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:2.080860, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:30.538452, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:62.647502, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:46.122021, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:26.608439, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:25.375934, disclosureLevel:'detailed' },
  ],
  2017: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:115.047952, disclosureLevel:'detailed' },
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:17.346745, disclosureLevel:'detailed' },
    { rawLabel:'Por competencias deportivas', normalizedCategory:'matchday_competition', amountNative:9.745623, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:74.147900, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:9.450036, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:36.172285, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:54.162741, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:60.936738, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:35.032464, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:13.362909, disclosureLevel:'detailed' },
  ],
  2018: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:153.494530, disclosureLevel:'detailed' },
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:23.300408, disclosureLevel:'detailed' },
    { rawLabel:'Por competencias deportivas', normalizedCategory:'matchday_competition', amountNative:18.311724, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:101.563455, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:1.221845, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:46.207573, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:60.847435, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:74.142554, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:44.130538, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:2.457832, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones recibidas', normalizedCategory:'other_income', amountNative:1.035933, disclosureLevel:'detailed' },
  ],
  2019: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:257.456932, disclosureLevel:'detailed' },
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:41.374483, disclosureLevel:'detailed' },
    { rawLabel:'Por competencias deportivas', normalizedCategory:'matchday_competition', amountNative:67.855692, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:145.862012, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:20.542818, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:78.359237, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:45.141933, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:117.802168, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:75.661460, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:20.402751, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos', normalizedCategory:'other_income', amountNative:11.999658, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones recibidas', normalizedCategory:'other_income', amountNative:0.352516, disclosureLevel:'detailed' },
  ],
  2020: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:349.216139, disclosureLevel:'detailed' },
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:25.811163, disclosureLevel:'detailed' },
    { rawLabel:'Competencias deportivas', normalizedCategory:'matchday_competition', amountNative:39.492160, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:223.877988, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:180.500481, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:145.913247, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:43.217713, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:160.558025, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:106.288568, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:30.262049, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos', normalizedCategory:'other_income', amountNative:10.580707, disclosureLevel:'detailed' },
    // Segundo ejercicio con este subsidio COVID (mismo criterio que 2021).
    { rawLabel:'Subsidio A.T.P.', normalizedCategory:'other_income', amountNative:24.838569, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones recibidas', normalizedCategory:'other_income', amountNative:34.653372, disclosureLevel:'detailed' },
  ],
  2021: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:306.034127, disclosureLevel:'detailed' },
    // "Uso del estadio" no tiene línea propia este ejercicio (0 en 2021, sí hubo $38,768388 M en
    // 2020) — no se carga una línea en $0.
    { rawLabel:'Competencias deportivas', normalizedCategory:'matchday_competition', amountNative:591.405019, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:375.943159, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:129.338182, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:176.310993, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:229.077761, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:197.047963, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:145.790042, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:84.149417, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos', normalizedCategory:'other_income', amountNative:19.290314, disclosureLevel:'detailed' },
    // Subsidio estatal COVID (Programa de Asistencia de Emergencia al Trabajo y la Producción,
    // vigente 2020-2021) — no hay categoría propia para esto, mismo criterio que "Subsidios
    // estatales a la educación" -> other_income.
    { rawLabel:'Subsidio A.T.P.', normalizedCategory:'other_income', amountNative:91.966749, disclosureLevel:'detailed' },
  ],
  2022: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:884.057424, disclosureLevel:'detailed' },
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:54.491308, disclosureLevel:'detailed' },
    { rawLabel:'Competencias deportivas', normalizedCategory:'matchday_competition', amountNative:695.726847, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:542.096794, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:2135.055511, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:337.563287, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:8.940503, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:369.032741, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:236.161678, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:40.347905, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos', normalizedCategory:'other_income', amountNative:9.714572, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:2115.730470, disclosureLevel:'detailed' },
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:690.332862, disclosureLevel:'detailed' },
    { rawLabel:'Competencias deportivas', normalizedCategory:'matchday_competition', amountNative:1254.569271, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:900.864986, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:2935.421564, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:620.997922, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:296.588854, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:757.857966, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:513.318469, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:111.683227, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos', normalizedCategory:'other_income', amountNative:15.129878, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones recibidas', normalizedCategory:'other_income', amountNative:204.126110, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:6600.197302, disclosureLevel:'detailed' },
    // Mismo criterio que 2025 (ver comentario ahí y dudas-por-club.md): no hay categoría propia para
    // "estadio alquilado para recitales/eventos no deportivos", queda en other_income.
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:3204.326259, disclosureLevel:'detailed' },
    // A diferencia de 2025, el Anexo II de este ejercicio no separa "Competencias internacionales" de
    // "Competencias deportivas" — es una sola línea.
    { rawLabel:'Competencias deportivas', normalizedCategory:'matchday_competition', amountNative:1011.841339, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:2461.310641, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:23976.679312, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:1785.501184, disclosureLevel:'detailed' },
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:7.311804, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:2569.003983, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:2192.799366, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:806.039590, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos', normalizedCategory:'other_income', amountNative:659.914609, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones recibidas', normalizedCategory:'other_income', amountNative:1323.965100, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Cuotas de asociados', normalizedCategory:'member_dues', amountNative:13933.217517, disclosureLevel:'detailed' },
    // "Uso del estadio" es la línea más grande después de Cuotas/Transferencias, pero NO es
    // recaudación de entradas de los propios partidos de Vélez: el club alquila el José Amalfitani
    // para recitales y otros eventos no deportivos (ver Nota 6 del balance, "Recitales a devengar").
    // No hay ninguna categoría "matchday_competition" a la que esto pertenezca de verdad, así que
    // queda en other_income, mismo criterio que "específico del club" del skill.
    { rawLabel:'Uso del estadio', normalizedCategory:'other_income', amountNative:6442.533695, disclosureLevel:'detailed' },
    { rawLabel:'Competencias internacionales', normalizedCategory:'matchday_competition', amountNative:6077.709392, disclosureLevel:'detailed' },
    { rawLabel:'Competencias deportivas', normalizedCategory:'matchday_competition', amountNative:2992.815299, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisación', normalizedCategory:'broadcasting', amountNative:6768.819045, disclosureLevel:'detailed' },
    { rawLabel:'Transferencias de jugadores', normalizedCategory:'player_sales', amountNative:18725.506000, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y otras concesiones', normalizedCategory:'sponsorship_commercial', amountNative:3317.636940, disclosureLevel:'detailed' },
    // Incluye $3.061,680111 M de recupero de cargas sociales (decreto 510/2023, nota al pie del
    // propio Anexo II) — no es plata de hinchas/sponsors, pero el documento no lo separa en una
    // línea propia, así que queda en el catch-all tal cual lo reporta el club.
    { rawLabel:'Otros derechos de fútbol profesional', normalizedCategory:'other_income', amountNative:3096.485362, disclosureLevel:'detailed' },
    { rawLabel:'Por servicios de enseñanza', normalizedCategory:'other_income', amountNative:4492.414151, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios estatales a la educación', normalizedCategory:'other_income', amountNative:2943.636937, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'other_income', amountNative:1185.388266, disclosureLevel:'detailed' },
    { rawLabel:'Recuperos', normalizedCategory:'other_income', amountNative:198.781676, disclosureLevel:'detailed' },
    { rawLabel:'Donaciones recibidas', normalizedCategory:'other_income', amountNative:1294.058437, disclosureLevel:'detailed' },
    { rawLabel:'Ganancia reservada para obras de infraestructura', normalizedCategory:'other_income', amountNative:-549.202485, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por desafectación del Fondo de reserva', normalizedCategory:'other_income', amountNative:1011.739903, disclosureLevel:'detailed' },
  ],
};

const velezExpenseLinesByYear = {
  // Ejercicio 2015 (N°105): único cargado vía OCR de un PDF de baja resolución/tamaño reducido
  // (178x252pt) — varios valores de columna intermedia (Amateur/otros sectores) tuvieron ruido de
  // OCR de $500-5.000 en algunas filas, PERO el valor de columna Fútbol Profesional y el de TOTAL
  // <año> de cada fila (los 2 únicos que se usan acá) se verificaron con una suma fila-por-fila que
  // cierra EXACTO contra el total impreso del Anexo III ($210.685.807) — ver metodología completa
  // en el comentario de cabecera de este archivo.
  2015: [
    // --- Anexo III "Gastos específicos de sectores" ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-42.790758, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-5.243451, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-39.466278, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-87.880609, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-14.682638, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-1.048710, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-4.665285, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-12.038944, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-0.498315, disclosureLevel:'detailed' },
    // Línea propia de este ejercicio: en el resto de los años se llama "Pérdida por baja jugadores
    // profesionales", acá figura como "Pérdida por desvinculación jugadores profesionales" — mismo
    // concepto, mismo criterio -> player_impairment.
    { rawLabel:'Pérdida por desvinculación de jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-2.086361, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1.283076, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.807512, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.603637, disclosureLevel:'detailed' },
    // Línea nueva, no vista en otros ejercicios: gastos de invitaciones/hospitalidad para partidos,
    // mismo tipo de concepto que "Gastos partidos" -> match_organisation_expense.
    { rawLabel:'Invitaciones a partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.183980, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1.090410, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.003390, disclosureLevel:'detailed' },
    { rawLabel:'Subvención a otras entidades', normalizedCategory:'other_expenses', amountNative:-1.210542, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.296978, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-0.709089, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-3.254561, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.555941, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-12.824213, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.023134, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.432009, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-0.287102, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.500574, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-0.646098, disclosureLevel:'detailed' },
    { rawLabel:'Gastos varios', normalizedCategory:'other_expenses', amountNative:-7.299440, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-9.654217, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-4.116498, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-4.787330, disclosureLevel:'detailed' },
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:54.285273, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración y cobranzas)', normalizedCategory:'admin_general_expense', amountNative:-15.613167, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-3.498245, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.379722, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-8.327504, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.817886, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-2.164582, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.640075, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.832990, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.022433, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.579539, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.037059, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-34.033390, disclosureLevel:'detailed' },
    // Dos créditos de regularización distintos este ejercicio (de 2 ejercicios de origen distintos),
    // mismo tipo de ajuste retroactivo que en 2018-2020.
    { rawLabel:'Regularización valuación plantel profesional de fútbol (Ejercicio 2011)', normalizedCategory:'player_amortisation', amountNative:0.161787, disclosureLevel:'detailed' },
    { rawLabel:'Regularización valuación plantel profesional de fútbol (Ejercicio 2015)', normalizedCategory:'player_amortisation', amountNative:1.960300, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.680237, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2016 (N°106): también vía OCR. TODAS las filas del Anexo II/III/IV verificaron su
  // suma interna exacta contra el total impreso (sin ruido, a diferencia de 2015/2017) — el
  // "Total 2015" comparativo de este mismo balance además confirmó, de forma independiente, cada
  // valor ya cargado para el Ejercicio 2015.
  2016: [
    // --- Anexo III "Gastos específicos de sectores" ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-65.332641, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-6.869111, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-19.924868, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-115.093993, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-19.219088, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-1.110590, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-4.292273, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-15.333032, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-1.037897, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-9.300795, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.861285, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1.144854, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.707530, disclosureLevel:'detailed' },
    { rawLabel:'Invitaciones a partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.030635, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1.376292, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.215618, disclosureLevel:'detailed' },
    { rawLabel:'Subvención a otras entidades', normalizedCategory:'other_expenses', amountNative:-0.457472, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.368033, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-0.952457, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-3.422360, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.785872, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-12.406803, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.027288, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-5.222861, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-0.525649, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.588061, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-0.835009, disclosureLevel:'detailed' },
    { rawLabel:'Varios', normalizedCategory:'other_expenses', amountNative:-7.554037, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-10.902506, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-6.395263, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-3.306751, disclosureLevel:'detailed' },
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:53.309450, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-19.996485, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.470515, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.706692, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-14.598432, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.747136, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-25.715126, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.788250, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.112680, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.041669, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.615090, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-5.876633, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-44.614415, disclosureLevel:'detailed' },
    { rawLabel:'Regularización valuación plantel profesional de fútbol (Ejercicio 2015)', normalizedCategory:'player_amortisation', amountNative:3.619020, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.992647, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2017 (N°107): también vía OCR (mismo escaneo A4 estándar que 2018-2025, no el
  // tamaño reducido de 2015). Prácticamente todas las filas del Anexo III verificaron su suma
  // interna (columna FP + resto = Total impreso) exacta; el total del Anexo cierra con una
  // diferencia de $40 contra el impreso ($374.700.522), y el total de Gastos Ordinarios del
  // ejercicio con la misma diferencia de $40 — ruido de OCR irrelevante (0,00001% del total),
  // muy por debajo de la tolerancia de verifyTieOuts().
  2017: [
    // --- Anexo III "Gastos específicos de sectores" ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-102.107931, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-8.622378, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-24.270175, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-159.025916, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-26.399213, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-1.958250, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-6.752030, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-21.031909, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-1.286062, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-3.547479, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-4.950191, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.873050, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1.920703, disclosureLevel:'detailed' },
    { rawLabel:'Invitaciones a partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.250674, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.785730, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.151701, disclosureLevel:'detailed' },
    { rawLabel:'Subvención a otras entidades', normalizedCategory:'other_expenses', amountNative:-0.727745, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.681033, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-1.561826, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-5.985094, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.953909, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-17.586594, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.063822, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-8.222130, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-1.122585, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.681675, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-1.165025, disclosureLevel:'detailed' },
    { rawLabel:'Varios', normalizedCategory:'other_expenses', amountNative:-13.609159, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-16.887666, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-12.668604, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-1.519961, disclosureLevel:'detailed' },
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:76.669658, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-27.536487, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-5.961019, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.229969, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-11.624750, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.133045, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-6.633806, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.079600, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.429649, disclosureLevel:'detailed' },
    // "Seguridad y vigilancia" (administración) es $0 este ejercicio.
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.149535, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-7.263347, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-48.466850, disclosureLevel:'detailed' },
    { rawLabel:'Regularización valuación plantel profesional de fútbol (Ejercicio 2015)', normalizedCategory:'player_amortisation', amountNative:3.015849, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.989575, disclosureLevel:'detailed' },
  ],
  2018: [
    // --- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-132.513798, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-11.739808, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-35.359945, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-197.548330, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-32.931919, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-2.217326, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-8.330223, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-23.521979, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-1.575473, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-19.509095, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-6.720893, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.726516, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.854555, disclosureLevel:'detailed' },
    // "Invitaciones a partidos" es $0 este ejercicio (hubo $250.674 en 2017) — no se carga línea
    // en $0.
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-3.382561, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.004440, disclosureLevel:'detailed' },
    { rawLabel:'Subvención a otras entidades', normalizedCategory:'other_expenses', amountNative:-0.300100, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.984123, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-2.113102, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-10.774377, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.348453, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-19.012147, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.089752, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-6.002650, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-1.228452, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.782468, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-1.721014, disclosureLevel:'detailed' },
    { rawLabel:'Varios (sectores)', normalizedCategory:'other_expenses', amountNative:-13.185889, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-17.613906, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-15.960781, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-17.178926, disclosureLevel:'detailed' },
    // Crédito (positivo), mismo criterio que los otros ejercicios: compensa exacto la columna
    // Amateur del Anexo III.
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:86.751397, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-33.856605, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-7.528728, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.459825, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-0.140701, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.013838, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-14.684165, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.132433, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-3.396708, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.565269, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-9.524737, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-14.762614, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-78.634860, disclosureLevel:'detailed' },
    { rawLabel:'Regularización valuación plantel profesional de fútbol (Ejercicio 2015)', normalizedCategory:'player_amortisation', amountNative:2.035696, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-3.828780, disclosureLevel:'detailed' },
  ],
  2019: [
    // --- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-195.819930, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-18.188096, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-118.215389, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-338.326669, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-52.603347, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-3.432647, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-8.890461, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-38.871048, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-1.185977, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-5.725110, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-12.992219, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-5.856584, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-4.897635, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-6.055425, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.033743, disclosureLevel:'detailed' },
    // Línea nueva, no vista en los otros ejercicios: donaciones/subvenciones que el club le da a
    // OTRAS entidades (no ingreso, gasto) — monto ínfimo ($49.305), sin categoría propia, mismo
    // criterio catch-all que "Varios" -> other_expenses.
    { rawLabel:'Subvención a otras entidades', normalizedCategory:'other_expenses', amountNative:-0.049305, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-2.516708, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-3.320534, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-5.242781, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.920879, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-22.132724, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.138753, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-13.501432, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-3.564041, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2.678199, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-4.111038, disclosureLevel:'detailed' },
    { rawLabel:'Varios (sectores)', normalizedCategory:'other_expenses', amountNative:-22.078277, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-22.681365, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-27.567058, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-66.232912, disclosureLevel:'detailed' },
    // Crédito (positivo), mismo criterio que los otros ejercicios: compensa exacto la columna
    // Amateur del Anexo III.
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:127.396296, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-59.896095, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-12.895040, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-3.239472, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-50.956171, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.128361, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-25.802467, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.032194, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-6.173107, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.013798, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.187204, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (administración)', normalizedCategory:'admin_general_expense', amountNative:-5.926579, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'admin_general_expense', amountNative:-1.859405, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.612930, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-230.148555, disclosureLevel:'detailed' },
    { rawLabel:'Regularización valuación plantel profesional de fútbol (Ejercicio 2015)', normalizedCategory:'player_amortisation', amountNative:3.948609, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-29.152313, disclosureLevel:'detailed' },
  ],
  2020: [
    // --- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-338.816920, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-25.500407, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-283.488382, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-484.249431, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-72.490476, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-4.020166, disclosureLevel:'detailed' },
    { rawLabel:'Cargo por retenciones y percepciones Decreto 1212/2003', normalizedCategory:'admin_general_expense', amountNative:-7.766560, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-13.024145, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-47.522859, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-1.363393, disclosureLevel:'detailed' },
    // "Pérdida por baja jugadores profesionales" es $0 este ejercicio (sí hubo en 2019) — no se
    // carga una línea en $0.
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-15.891537, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-5.964183, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-5.406146, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-8.913621, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.159401, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-1.919713, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-4.876393, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-19.929901, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1.665865, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-26.880753, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.064177, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-19.941602, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-3.526962, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-3.315299, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-4.893827, disclosureLevel:'detailed' },
    { rawLabel:'Varios (sectores)', normalizedCategory:'other_expenses', amountNative:-15.833068, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-28.426881, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-34.644575, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-73.698837, disclosureLevel:'detailed' },
    // Crédito (positivo), mismo criterio que los otros ejercicios: compensa exacto la columna
    // Amateur del Anexo III.
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:164.690207, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-84.223567, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-16.371956, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-5.584991, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-50.367831, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.676145, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-8.253167, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-1.926271, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-7.726328, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.059039, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.443922, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (administración)', normalizedCategory:'admin_general_expense', amountNative:-13.829986, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'admin_general_expense', amountNative:-1.882462, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-6.580216, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-393.716980, disclosureLevel:'detailed' },
    // Crédito: regularización de una valuación del Ejercicio 2015 (Nota 2.g) — reduce el costo de
    // amortización de este ejercicio, no es una línea de ingreso.
    { rawLabel:'Regularización valuación plantel profesional de fútbol (Ejercicio 2015)', normalizedCategory:'player_amortisation', amountNative:0.768676, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-47.088687, disclosureLevel:'detailed' },
  ],
  2021: [
    // --- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-575.602633, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-21.766853, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-360.465639, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-609.572332, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-61.762160, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-1.020112, disclosureLevel:'detailed' },
    { rawLabel:'Cargo por retenciones y percepciones Decreto 1212/2003', normalizedCategory:'admin_general_expense', amountNative:-50.751324, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-28.251986, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-60.335858, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-8.387862, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-25.875887, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-10.689958, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-3.747389, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-15.930492, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-19.907539, disclosureLevel:'detailed' },
    // Línea propia de este ejercicio, distinta de "Publicidad y propaganda" del Anexo IV (esta es
    // parte del gasto por sector, aquella del Anexo IV es una columna única de administración) —
    // mismo criterio de todos modos: costo de marketing/difusión -> admin_general_expense.
    { rawLabel:'Publicidad (sectores)', normalizedCategory:'admin_general_expense', amountNative:-0.733934, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-0.275373, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-8.981899, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-28.181379, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-5.249043, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-32.207440, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.024273, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-31.560520, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-6.274330, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-4.545378, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-1.695650, disclosureLevel:'detailed' },
    { rawLabel:'Varios (sectores)', normalizedCategory:'other_expenses', amountNative:-18.279650, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-82.488419, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-36.124443, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-339.781239, disclosureLevel:'detailed' },
    // Crédito (positivo), mismo criterio que 2022/2024/2025: compensa exacto la columna Amateur.
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:229.712783, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-102.994522, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-9.538702, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-7.844038, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-62.436770, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-5.915742, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-17.067858, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.222126, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-8.405283, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.099527, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.474169, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (administración)', normalizedCategory:'admin_general_expense', amountNative:-26.490073, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'admin_general_expense', amountNative:-2.687139, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-11.274005, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-521.915452, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-71.618722, disclosureLevel:'detailed' },
  ],
  2022: [
    // --- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-963.591219, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-66.890737, disclosureLevel:'detailed' },
    // Primas y premios: 975,162776 de 975,772438 M (99,94%) ya es Fútbol Profesional, se carga
    // completa en wages_squad, mismo criterio que 2024/2025.
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-975.772438, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-1107.122229, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-160.931897, disclosureLevel:'detailed' },
    // Línea propia de este ejercicio (equivalente al "Decreto 510/2023" de 2024, pero con otro
    // decreto): mismo criterio, cargo tributario 100% Fútbol Profesional -> admin_general_expense.
    { rawLabel:'Cargo por retenciones y percepciones Decreto 1212/2003', normalizedCategory:'admin_general_expense', amountNative:-11.320903, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-124.744220, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-135.599544, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-21.727154, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-72.715335, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-39.014120, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-7.470058, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-25.444306, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-32.580491, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-43.543648, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-28.040655, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-53.671339, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-8.616743, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-85.753174, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-0.392998, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-71.382061, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-11.550360, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-14.177202, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-4.350216, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-13.273403, disclosureLevel:'detailed' },
    { rawLabel:'Varios (sectores)', normalizedCategory:'other_expenses', amountNative:-39.310222, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-164.918300, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-100.140934, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-341.920096, disclosureLevel:'detailed' },
    // Crédito (positivo): reclasificación de costos de desarrollo de jugadores propios ya
    // capitalizados como pase — mismo criterio que 2024/2025. Compensa exacto la columna Amateur
    // del Anexo III (confirmado con la suma, esa columna da $0 neto en el total impreso).
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:509.200985, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-213.645431, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-37.849560, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-28.751567, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-129.727905, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-12.485778, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-34.329775, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-5.229089, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-9.171572, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-0.017328, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.849909, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (administración)', normalizedCategory:'admin_general_expense', amountNative:-46.836316, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.171965, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (administración)', normalizedCategory:'admin_general_expense', amountNative:-2.606291, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-11.428552, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-815.059583, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-122.780075, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2023 (N°113): único cargado vía OCR (Tesseract), no texto nativo — ver comentario de
  // cabecera y Clubes/Argentina/Velez Sarsfield/balance-general-2023.md. Categorización idéntica al
  // resto: FÚTBOL PROFESIONAL vs. resto de columnas para Remuneraciones/Cargas sociales, Primas y
  // premios completo en wages_squad, "Costo de desarrollo" como crédito a player_amortisation.
  2023: [
    // --- Anexo III "Gastos específicos de sectores" ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-1931.941146, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-150.677661, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-2021.254237, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-2543.510520, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-416.084968, disclosureLevel:'detailed' },
    // "Cargo por retenciones y percepciones Decreto 1212/2003" es $0 este ejercicio (hubo
    // $24.405.634 en 2022) — no se carga línea en $0.
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-389.668282, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-377.779210, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-86.087142, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-313.924434, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-96.361507, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-17.574076, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-44.349830, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-69.463264, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-142.527048, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-101.644243, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-137.226933, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-23.542344, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-234.842863, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-3.839994, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-202.854968, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-38.881423, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-37.075201, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-11.517226, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-28.387114, disclosureLevel:'detailed' },
    { rawLabel:'Varios (sectores)', normalizedCategory:'other_expenses', amountNative:-71.538545, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-336.017258, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-258.268852, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-1072.708344, disclosureLevel:'detailed' },
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:745.679322, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-516.127264, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-113.801029, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-83.706410, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-291.206121, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-44.340754, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-365.956767, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-19.065587, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-21.395479, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-15.917020, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-11.727688, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (administración)', normalizedCategory:'admin_general_expense', amountNative:-102.174595, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (administración)', normalizedCategory:'admin_general_expense', amountNative:-4.506145, disclosureLevel:'detailed' },
    { rawLabel:'Internet', normalizedCategory:'admin_general_expense', amountNative:-25.179414, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-6.564854, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-3391.125836, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-320.866168, disclosureLevel:'detailed' },
  ],
  2024: [
    // --- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-6376.699390, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-663.401792, disclosureLevel:'detailed' },
    // Igual que 2025: "Primas y premios" es casi 100% Fútbol Profesional (5.606,247460 de 5.609,842912
    // M, 0,06% es Amateur), se carga completa en wages_squad sin separar el resto.
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-5609.842912, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-10025.956902, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-1883.175165, disclosureLevel:'detailed' },
    // Línea propia de este ejercicio (no existía en 2025): un cargo impositivo específico sobre
    // fútbol profesional, 100% columna Fútbol Profesional. Es un costo tributario, no salarial, mismo
    // criterio que "Impuestos (sectores)" más abajo -> admin_general_expense.
    { rawLabel:'Cargo por retenciones y percepciones Decreto 510/2023', normalizedCategory:'admin_general_expense', amountNative:-830.655312, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-723.249411, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1376.183361, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-363.565917, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-1703.106203, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-338.227046, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-90.949632, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-175.292021, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-215.153999, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-340.216845, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-314.855763, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-495.254968, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-63.537808, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1152.539418, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-9.751125, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-681.065038, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-151.924468, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-131.160217, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-44.973631, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-97.791365, disclosureLevel:'detailed' },
    { rawLabel:'Varios (sectores)', normalizedCategory:'other_expenses', amountNative:-228.244837, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-848.322036, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-957.679466, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-1160.324137, disclosureLevel:'detailed' },
    // Crédito (positivo): reclasificación de costos de desarrollo de jugadores propios ya
    // capitalizados como pase (Anexo I) — mismo criterio que 2025. Este ejercicio compensa EXACTO el
    // total de la columna Amateur del Anexo III (columna Amateur suma $0 neto en el total impreso),
    // confirmando que es la contrapartida de todo el gasto de desarrollo juvenil capitalizado.
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:5536.859420, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-1855.145518, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-383.882354, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-251.947998, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-1127.645042, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-195.596818, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-7145.989499, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-35.221033, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-38.861310, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-51.133835, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-42.094140, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (administración)', normalizedCategory:'admin_general_expense', amountNative:-261.413510, disclosureLevel:'detailed' },
    // Línea propia de este ejercicio (no existía en 2025): mismo criterio que el resto de Anexo IV.
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'admin_general_expense', amountNative:-10.038269, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (administración)', normalizedCategory:'admin_general_expense', amountNative:-7.240683, disclosureLevel:'detailed' },
    { rawLabel:'Internet', normalizedCategory:'admin_general_expense', amountNative:-45.586918, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-18.836741, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-18846.993974, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-1282.293294, disclosureLevel:'detailed' },
  ],
  2025: [
    // --- Anexo III "Gastos específicos de sectores", separado Fútbol Profesional del resto (ver
    // comentario de cabecera) ---
    { rawLabel:'Remuneraciones al personal (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-10145.483736, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (fútbol profesional)', normalizedCategory:'wages_squad', amountNative:-1118.792296, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores y cuerpo técnico', normalizedCategory:'wages_squad', amountNative:-12639.230993, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones al personal (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-14893.029464, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (amateur, polideportivo, enseñanza, culturales, otros deportes)', normalizedCategory:'youth_other_sports_expense', amountNative:-3205.689352, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-871.470236, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (sectores)', normalizedCategory:'admin_general_expense', amountNative:-2676.178628, disclosureLevel:'detailed' },
    { rawLabel:'Pretemporada y concentraciones', normalizedCategory:'admin_general_expense', amountNative:-370.951850, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por baja jugadores profesionales', normalizedCategory:'player_impairment', amountNative:-1539.989398, disclosureLevel:'detailed' },
    { rawLabel:'Energía eléctrica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-488.534296, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-452.328570, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (sectores)', normalizedCategory:'admin_general_expense', amountNative:-286.900083, disclosureLevel:'detailed' },
    { rawLabel:'Seguros (sectores)', normalizedCategory:'admin_general_expense', amountNative:-299.794109, disclosureLevel:'detailed' },
    { rawLabel:'Gastos partidos', normalizedCategory:'match_organisation_expense', amountNative:-521.901036, disclosureLevel:'detailed' },
    { rawLabel:'Útiles de deportes', normalizedCategory:'admin_general_expense', amountNative:-416.483324, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (sectores)', normalizedCategory:'admin_general_expense', amountNative:-810.943423, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (sectores)', normalizedCategory:'admin_general_expense', amountNative:-106.649143, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1347.423648, disclosureLevel:'detailed' },
    { rawLabel:'Fletes y acarreos', normalizedCategory:'admin_general_expense', amountNative:-4.275903, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones y mantenimiento (sectores)', normalizedCategory:'admin_general_expense', amountNative:-814.099684, disclosureLevel:'detailed' },
    { rawLabel:'Productos químicos, fertilizantes y semillas', normalizedCategory:'admin_general_expense', amountNative:-146.598544, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (sectores)', normalizedCategory:'admin_general_expense', amountNative:-214.252773, disclosureLevel:'detailed' },
    { rawLabel:'Becas', normalizedCategory:'youth_other_sports_expense', amountNative:-75.178901, disclosureLevel:'detailed' },
    { rawLabel:'Afiliaciones e inscripciones', normalizedCategory:'admin_general_expense', amountNative:-148.678771, disclosureLevel:'detailed' },
    { rawLabel:'Varios (sectores)', normalizedCategory:'other_expenses', amountNative:-361.058479, disclosureLevel:'detailed' },
    { rawLabel:'Traslados y estadías', normalizedCategory:'admin_general_expense', amountNative:-1198.220582, disclosureLevel:'detailed' },
    { rawLabel:'Servicios de limpieza (sectores)', normalizedCategory:'admin_general_expense', amountNative:-1264.507261, disclosureLevel:'detailed' },
    // Comisiones/gastos de compraventa de jugadores: mismo criterio que Racing (club-data-mapping
    // SKILL.md sección 1, Versión 52) — Boca tampoco separa esto dentro de "Compra de jugadores"
    // (solo amortización+deterioro), meterlo ahí sería MENOS fiel, no más homologado.
    { rawLabel:'Gastos y derechos de jugadores profesionales', normalizedCategory:'other_expenses', amountNative:-2103.472566, disclosureLevel:'detailed' },
    // Crédito (positivo): reclasificación de costos de desarrollo de jugadores propios ya
    // capitalizados como pase (ver Nota 3 del balance) — directamente relacionado a pases, no un
    // "otro gasto" genérico.
    { rawLabel:'Costo de desarrollo de jugadores propios (reclasificación)', normalizedCategory:'player_amortisation', amountNative:7133.277883, disclosureLevel:'detailed' },
    // --- Anexo IV "Gastos generales de administración" (columna única, sin desglose por sector) ---
    { rawLabel:'Remuneraciones al personal (administración)', normalizedCategory:'admin_general_expense', amountNative:-2936.644983, disclosureLevel:'detailed' },
    { rawLabel:'Cargas sociales (administración)', normalizedCategory:'admin_general_expense', amountNative:-755.854520, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios y retribuciones por servicios (administración)', normalizedCategory:'admin_general_expense', amountNative:-446.187425, disclosureLevel:'detailed' },
    { rawLabel:'Gastos y comisiones bancarias', normalizedCategory:'admin_general_expense', amountNative:-1701.968386, disclosureLevel:'detailed' },
    { rawLabel:'Papelería, impresiones y útiles de escritorio (administración)', normalizedCategory:'admin_general_expense', amountNative:-341.194694, disclosureLevel:'detailed' },
    { rawLabel:'Seguros, juicios y gastos relacionados', normalizedCategory:'admin_general_expense', amountNative:-2653.193692, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos, comidas y refrigerios (administración)', normalizedCategory:'admin_general_expense', amountNative:-64.916687, disclosureLevel:'detailed' },
    { rawLabel:'Reparaciones, mantenimiento y limpieza (administración)', normalizedCategory:'admin_general_expense', amountNative:-51.666101, disclosureLevel:'detailed' },
    { rawLabel:'Seguridad y vigilancia (administración)', normalizedCategory:'admin_general_expense', amountNative:-77.122567, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos (administración)', normalizedCategory:'admin_general_expense', amountNative:-80.390532, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos (administración)', normalizedCategory:'admin_general_expense', amountNative:-477.710989, disclosureLevel:'detailed' },
    { rawLabel:'Farmacia y asistencia médica (administración)', normalizedCategory:'admin_general_expense', amountNative:-10.487997, disclosureLevel:'detailed' },
    { rawLabel:'Internet', normalizedCategory:'admin_general_expense', amountNative:-61.768078, disclosureLevel:'detailed' },
    { rawLabel:'Varios (administración)', normalizedCategory:'admin_general_expense', amountNative:-22.471734, disclosureLevel:'detailed' },
    // --- Amortizaciones (línea propia del Estado de Recursos y Gastos, detalle en Nota 5.a) ---
    { rawLabel:'Amortización plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:-20744.833830, disclosureLevel:'detailed' },
    { rawLabel:'Regularización valuación plantel profesional de fútbol', normalizedCategory:'player_amortisation', amountNative:419.757946, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de bienes de uso', normalizedCategory:'depreciation', amountNative:-1862.785592, disclosureLevel:'detailed' },
  ],
};

const velezFiscalYearMeta = {
  // Ejercicio 2015 (N°105): único cargado vía OCR de un PDF de baja resolución — ver comentario en
  // velezExpenseLinesByYear.2015 y en la cabecera del archivo para la metodología de verificación.
  2015: {
    currency:'ARS', fx:8.988, fxSource:'unknown',
    sourceId:'velez-balance-2014-15',
    reportType:'official_balance_sheet',
    gestionId:'gamez',
    // grossDebt = "Deudas" corriente + no corriente (pág. 8: 149,036862 + 23,887407). cash = Caja y
    // bancos (pág. 7).
    grossDebt:172.924269, cash:1.068075,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b) — este ejercicio (2015) no
    // tiene línea de RECPAM, igual que 2018 (ambos anteriores al inicio de la reexpresión por
    // inflación en julio 2018).
    netInterest:-36.382769, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 9) — Expenses ya incluye Amortizaciones. DÉFICIT real: verificado igual a
    // Revenue - Expenses + netInterest = $(36.195.305) ARS.
    officialTotalRevenue:283.378013, officialTotalExpenses:283.190549, officialPAT:-36.195305,
  },
  // Ejercicio 2017 (N°107): también vía OCR. Anexo III/Gastos Ordinarios cierran con una
  // diferencia de $40 contra el impreso (ruido de OCR irrelevante, ver comentario en
  // velezExpenseLinesByYear.2017).
  // Ejercicio 2016 (N°106): también vía OCR, sin ruido detectado (todas las sumas cerraron exacto).
  2016: {
    currency:'ARS', fx:14.94, fxSource:'unknown',
    sourceId:'velez-balance-2015-16',
    reportType:'official_balance_sheet',
    gestionId:'gamez',
    // grossDebt = "Deudas" corriente + no corriente (pág. 8: 156,158679 + 24,036428). cash = Caja y
    // bancos (pág. 7).
    grossDebt:180.195107, cash:3.056183,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b) — sin RECPAM.
    netInterest:92.568336, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 9) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado igual
    // a Revenue - Expenses + netInterest = $66.227.589 ARS.
    officialTotalRevenue:360.607477, officialTotalExpenses:386.948224, officialPAT:66.227589,
  },
  2017: {
    currency:'ARS', fx:16.53, fxSource:'document_close',
    sourceId:'velez-balance-2016-17',
    reportType:'official_balance_sheet',
    gestionId:'gamez',
    // grossDebt = "Deudas" corriente + no corriente (pág. 8: 124,896100 + 42,575219). cash = Caja y
    // bancos (pág. 7).
    grossDebt:167.471319, cash:3.618660,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b) — sin RECPAM (anterior a
    // julio 2018).
    netInterest:-8.763815, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 9) — Expenses ya incluye Amortizaciones. DÉFICIT real: verificado (con
    // ~$40 de ruido de OCR) igual a Revenue - Expenses + netInterest = $(73.534.953) ARS.
    officialTotalRevenue:425.405393, officialTotalExpenses:490.176531, officialPAT:-73.534953,
  },
  2018: {
    currency:'ARS', fx:28.75, fxSource:'document_close',
    sourceId:'velez-balance-2017-18',
    reportType:'official_balance_sheet',
    gestionId:'rapisarda',
    // grossDebt = "Deudas" corriente + no corriente (pág. 7: 280,162071 + 59,037916), mismo criterio
    // que el resto. cash = Caja y bancos (pág. 6).
    grossDebt:339.199987, cash:13.577432,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b). Este ejercicio NO tiene
    // línea de RECPAM (cierra 30/6/2018, un día antes de la fecha desde la que la FACPCE consideró
    // a la Argentina economía de alta inflación — ver Nota 1.b del balance 2024) — no es un olvido
    // de carga, el propio balance no la incluye.
    netInterest:490.076992, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 8) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado igual
    // a Revenue - Expenses + netInterest = $342.815.648 ARS.
    officialTotalRevenue:526.713827, officialTotalExpenses:673.975171, officialPAT:342.815648,
  },
  2019: {
    currency:'ARS', fx:42.263, fxSource:'document_close',
    sourceId:'velez-balance-2018-19',
    reportType:'official_balance_sheet',
    gestionId:'rapisarda',
    // grossDebt = "Deudas" corriente + no corriente (pág. 7: 486,907381 + 33,132700), mismo criterio
    // que el resto. cash = Caja y bancos (pág. 6).
    grossDebt:520.040081, cash:6.986051,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b), incluye RECPAM.
    netInterest:802.716039, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 8) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado igual
    // a Revenue - Expenses + netInterest = $370.018.627 ARS.
    officialTotalRevenue:882.811660, officialTotalExpenses:1315.509072, officialPAT:370.018627,
  },
  2020: {
    currency:'ARS', fx:70.26, fxSource:'document_close',
    sourceId:'velez-balance-2019-20',
    reportType:'official_balance_sheet',
    gestionId:'rapisarda',
    // grossDebt = "Deudas" corriente + no corriente (pág. 7: 581,508235 + 12,201099), mismo criterio
    // que el resto. cash = Caja y bancos (pág. 6).
    grossDebt:593.709334, cash:23.225555,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b), incluye RECPAM.
    netInterest:513.238348, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 8) — Expenses ya incluye Amortizaciones. DÉFICIT real: verificado igual a
    // Revenue - Expenses + netInterest = $(145.019.616) ARS.
    officialTotalRevenue:1375.210181, officialTotalExpenses:2033.468145, officialPAT:-145.019616,
  },
  2021: {
    currency:'ARS', fx:95.52, fxSource:'document_close',
    sourceId:'velez-balance-2020-21',
    reportType:'official_balance_sheet',
    gestionId:'rapisarda',
    // grossDebt = "Deudas" corriente + no corriente (pág. 7: 993,999756 + 58,649519), mismo criterio
    // que el resto. cash = Caja y bancos (pág. 6).
    grossDebt:1052.649275, cash:44.959285,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b), incluye RECPAM.
    netInterest:-26.237259, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 8) — Expenses ya incluye Amortizaciones. DÉFICIT real: verificado igual a
    // Revenue - Expenses + netInterest = $(753.625.872) ARS.
    officialTotalRevenue:2346.353726, officialTotalExpenses:3073.742339, officialPAT:-753.625872,
  },
  2022: {
    currency:'ARS', fx:125.03, fxSource:'document_close',
    sourceId:'velez-balance-2021-22',
    reportType:'official_balance_sheet',
    gestionId:'rapisarda',
    // grossDebt = "Deudas" corriente + no corriente (pág. 9: 1.911,940047 + 438,371500), mismo
    // criterio que 2024/2025. cash = Caja y bancos (pág. 8).
    grossDebt:2350.311547, cash:41.858466,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b), mismo criterio que
    // 2024/2025: incluye RECPAM (la reexpresión por inflación ya se aplicaba en este ejercicio).
    netInterest:1595.187728, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 10) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado
    // igual a Revenue - Expenses + netInterest = +1.216.670.585 ARS.
    officialTotalRevenue:5313.188570, officialTotalExpenses:5691.705713, officialPAT:1216.670585,
  },
  // Ejercicio 2023 (N°113): único cargado vía OCR, no texto nativo. Firmado por el Vicepresidente
  // 1° (Lic. Diego González) en lugar de Rapisarda — Rapisarda se tomó licencia en julio 2023,
  // JUSTO después del cierre de este ejercicio (30/6/2023); el ejercicio en sí (1°/7/2022-30/6/2023)
  // transcurrió íntegro bajo su presidencia, por eso sigue siendo gestionId:'rapisarda'.
  2023: {
    currency:'ARS', fx:256.30, fxSource:'document_close',
    sourceId:'velez-balance-2022-23',
    reportType:'official_balance_sheet',
    gestionId:'rapisarda',
    // grossDebt = "Deudas" corriente + no corriente (pág. 9: 5.132,091055 + 175,241654). cash = Caja
    // y bancos (pág. 8).
    grossDebt:5307.332709, cash:75.679959,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b), incluye RECPAM.
    netInterest:5853.143001, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos (pág. 10) — Expenses ya incluye Amortizaciones. SUPERÁVIT real: verificado igual
    // a Revenue - Expenses + netInterest = $522.234.138 ARS. Verificado con 2 sumas independientes
    // del Anexo III (una desde el detalle línea por línea, otra desde el total de la fila Amateur
    // en $0 neto) — ambas dan exacto $10.413.869.311, el mismo total impreso.
    officialTotalRevenue:10416.621579, officialTotalExpenses:15747.530442, officialPAT:522.234138,
  },
  2024: {
    currency:'ARS', fx:909, fxSource:'document_close',
    sourceId:'velez-balance-2023-24',
    reportType:'official_balance_sheet',
    gestionId:'berlanga',
    // grossDebt = "Deudas" corriente + no corriente (Estado de situación patrimonial, pág. 8:
    // 15.085,097828 + 278,344545), mismo criterio que 2025 (SIN Ingresos anticipados/Previsiones).
    // cash = Caja y bancos (pág. 7, Activo corriente).
    grossDebt:15363.442373, cash:186.311280,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b, pág. 22), mismo criterio que
    // 2025: intereses, resultado por tenencia de jugadores propios, diferencias de cambio y RECPAM,
    // todo en una sola línea combinada.
    netInterest:15404.132114, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal cual
    // impresos (pág. 9) — Expenses ya incluye Amortizaciones. DÉFICIT DEL EJERCICIO real: verificado
    // igual a Revenue - Expenses + netInterest = -1.113.139.098 ARS (vs. Superávit +36.833.752 del
    // ejercicio 2025 recién anterior).
    officialTotalRevenue:46598.890489, officialTotalExpenses:63116.161701, officialPAT:-1113.139098,
  },
  2025: {
    currency:'ARS', fx:1196, fxSource:'document_close',
    sourceId:'velez-balance-2024-25',
    reportType:'official_balance_sheet',
    gestionId:'berlanga',
    // grossDebt = "Deudas" corriente + no corriente (Estado de situación patrimonial, pág. 6-7:
    // 32.313,540865 + 5.616,101955), SIN incluir "Ingresos anticipados" (plata ya cobrada mas no
    // devengada, no es deuda financiera) ni "Fondos con destino específico"/"Previsiones" — mismo
    // criterio que ya usa Boca (grossDebt = Total Deudas, no Total del Pasivo completo). cash = Caja
    // y bancos (pág. 6, Activo corriente).
    grossDebt:37929.642820, cash:372.966931,
    profitOnPlayerSales:0, assetSales:0,
    // netInterest = "Resultados financieros y por tenencia" (Nota 5.b, pág. 23): intereses ganados/
    // bancarios/deudas previsionales, resultado por tenencia de jugadores propios, diferencias de
    // cambio y RECPAM, todo junto en una sola línea combinada — mismo criterio que Boca/Racing/River
    // (nunca se separa este resultado financiero en revenueLines/expenseLines).
    netInterest:11363.572644, tax:0,
    // officialTotalRevenue/officialTotalExpenses = "RECURSOS ORDINARIOS"/"GASTOS ORDINARIOS" tal
    // cual impresos en el Estado de Recursos y Gastos (pág. 8) — Expenses YA incluye Amortizaciones
    // (que acá se cargaron como expenseLines, no como meta), ver verifyTieOuts.
    officialTotalRevenue:71931.540135, officialTotalExpenses:83258.279027, officialPAT:36.833752,
  },
};

// ---------------------------------------------------------------------------
// Mercado de pases / Resultados deportivos / Títulos: TODAVÍA NO onboardeados para Vélez (esta
// sesión se enfocó solo en Finanzas). Vacíos a propósito, no placeholder inventado — a diferencia
// de Boca/River/Racing (que arrancaron con movimientos/títulos de mentira tipo "Jugador A"), acá se
// prefirió dejarlo vacío hasta cargar datos reales, para no tener que salir a buscar y borrar
// placeholders más adelante. Las 3 pestañas (Mercado de Pases/Resultados/Comparar Gestiones) andan
// bien con esto vacío (ver pasesDataForClub/resultadosDataForClub/titulosDataForClub en index.html,
// ya devuelven `|| []`/manejan la ausencia de la gestión sin romper).
// ---------------------------------------------------------------------------
const velezPasesData = [];
const velezResultadosData = {};
const velezTitulosData = [];

// Versión 95: registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.velez = {
  revenueLinesByYear: velezRevenueLinesByYear, expenseLinesByYear: velezExpenseLinesByYear,
  fiscalYearMeta: velezFiscalYearMeta, pasesData: velezPasesData,
  resultadosData: velezResultadosData, titulosData: velezTitulosData,
};


Object.assign(sources, {
  'velez-balance-2024-25': {
      id:'velez-balance-2024-25', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°115, 1°/7/2024 al 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial (50 páginas, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 15/10/2025, firmado por Luis Fabián Berlanga como Presidente), descargado de la página institucional de balances del club (archivo completo, 2015-2025). Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2025.pdf. Cifras en moneda homogénea (reexpresadas según FACPCE, Nota 1.b). Convertido a USD con $1.196, el tipo de cambio de cierre que el propio balance declara en su Anexo VI (Activos y pasivos en moneda extranjera) para USD al 30/06/2025 — mismo valor que declaró el balance de Racing para la misma fecha de cierre. SUPERÁVIT real del ejercicio: $36.833.752 ARS (mucho más chico que el del ejercicio anterior, que fue déficit de $(1.551.939.880) ARS). "Salarios y primas (plantel y cuerpo técnico)" se separó de "Otras secciones deportivas" usando la columna "FÚTBOL PROFESIONAL" del Anexo III (el club desglosa gastos por sector: fútbol profesional/amateur/complejo polideportivo/enseñanza/culturales/otros deportes), no el total de sector — ver comentario completo en data/velez-data.js.',
    },
  'velez-balance-2023-24': {
      id:'velez-balance-2023-24', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°114, 1°/7/2023 al 30/6/2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial (48 páginas, texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 7/10/2024, firmado por Luis Fabián Berlanga como Presidente), mismo archivo institucional que el Ejercicio 2025. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2024.pdf. Convertido a USD con $909, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2024. DÉFICIT real del ejercicio: $(1.113.139.098) ARS. Mismo criterio de categorización que el Ejercicio 2025 (ver data/velez-data.js): "Primas y premios" se cargó completa en wages_squad (99,94% ya es columna Fútbol Profesional); "Costo de desarrollo de jugadores propios" es un crédito que compensa exacto la columna Amateur del Anexo III (confirmado: esa columna suma $0 neto en el total impreso).',
    },
  'velez-balance-2014-15': {
      id:'velez-balance-2014-15', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°105, 1°/7/2014 al 30/6/2015',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial ESCANEADO, de tamaño de página reducido (178x252pt), sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 450-900dpi según la página; algunas tablas anchas rotadas 90° en el escaneo original). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 28/9/2015, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017 — NO Rapisarda, que asumió recién en noviembre 2017). Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2015.pdf (transcripción en balance-general-2015.md). Convertido a USD con $8,988, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2015 (previo a la devaluación de diciembre 2015). DÉFICIT real del ejercicio: $(36.195.305) ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); varios valores de columnas intermedias del Anexo III tuvieron ruido de OCR de unos pocos miles de pesos, pero los valores usados (columna Fútbol Profesional y columna Total del año) se verificaron con una suma fila por fila que cierra EXACTO contra el total impreso.',
    },
  'velez-balance-2015-16': {
      id:'velez-balance-2015-16', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°106, 1°/7/2015 al 30/6/2016',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 450dpi; algunas tablas anchas rotadas 90°). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 26/9/2016, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017). Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2016.pdf (transcripción en balance-general-2016.md). Convertido a USD con $14,94, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2016. SUPERÁVIT real del ejercicio: $66.227.589 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); TODAS las sumas del Anexo II/III/IV cerraron exacto contra los totales impresos, sin ruido de OCR detectado — y la columna comparativa "2015" de este mismo balance confirmó, en forma independiente, cada cifra ya cargada para el Ejercicio 2015.',
    },
  'velez-balance-2016-17': {
      id:'velez-balance-2016-17', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°107, 1°/7/2016 al 30/6/2017',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 300dpi; algunas tablas anchas rotadas 90° en el escaneo original). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 25/9/2017, firmado por Raúl H. Gámez como Presidente (su 3ra gestión, 2014-2017). Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2017.pdf (transcripción en balance-general-2017.md). Convertido a USD con $16,53, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2017. DÉFICIT real del ejercicio: $(73.534.953) ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); casi todas las filas del Anexo III cerraron su checksum interno exacto, el total del Anexo/Gastos Ordinarios tiene una diferencia de $40 (ruido de OCR irrelevante) contra el impreso.',
    },
  'velez-balance-2017-18': {
      id:'velez-balance-2017-18', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°108, 1°/7/2017 al 30/6/2018',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 24/9/2018, firmado por Sergio D. Rapisarda como Presidente, su primera gestión), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2018.pdf. Convertido a USD con $28,75, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2018. SUPERÁVIT real del ejercicio: $342.815.648 ARS. Este ejercicio (cierre 30/6/2018) es el último ANTES de que la FACPCE empezara a considerar a la Argentina economía de alta inflación (desde el 1°/7/2018) — no tiene línea de RECPAM en Resultados financieros, a diferencia de todos los ejercicios posteriores. Mismo criterio de categorización que el resto (ver data/velez-data.js).',
    },
  'velez-balance-2018-19': {
      id:'velez-balance-2018-19', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°109, 1°/7/2018 al 30/6/2019',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 16/9/2019, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2019.pdf. Convertido a USD con $42,263, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2019. SUPERÁVIT real del ejercicio: $370.018.627 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); incluye una línea de crédito por "Regularización valuación plantel profesional de fútbol (Ejercicio 2015)" (mismo tipo de ajuste que aparece también en el Ejercicio 2020) y una línea nueva "Subvención a otras entidades" (donación del club a terceros, monto ínfimo, other_expenses).',
    },
  'velez-balance-2019-20': {
      id:'velez-balance-2019-20', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°110, 1°/7/2019 al 30/6/2020',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 13/11/2020, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2020.pdf. Convertido a USD con $70,26, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2020. DÉFICIT real del ejercicio: $(145.019.616) ARS. Ejercicio de pandemia (COVID-19): incluye el mismo subsidio estatal "Subsidio A.T.P." que el Ejercicio 2021. Mismo criterio de categorización que el resto (ver data/velez-data.js); incluye una línea de crédito por "Regularización valuación plantel profesional de fútbol (Ejercicio 2015)" que reduce el costo de amortización de este ejercicio en particular.',
    },
  'velez-balance-2020-21': {
      id:'velez-balance-2020-21', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°111, 1°/7/2020 al 30/6/2021',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 28/9/2021, firmado por Sergio D. Rapisarda como Presidente), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2021.pdf. Convertido a USD con $95,52, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2021. DÉFICIT real del ejercicio: $(753.625.872) ARS. Incluye un ingreso extraordinario COVID ("Subsidio A.T.P.", programa estatal de asistencia al trabajo y la producción) categorizado como other_income. Mismo criterio de categorización que 2022/2024/2025 (ver data/velez-data.js).',
    },
  'velez-balance-2021-22': {
      id:'velez-balance-2021-22', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°112, 1°/7/2021 al 30/6/2022',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial (texto nativo, con informe de auditoría de Bertora y Asociados S.R.L. sin salvedades, 30/9/2022, firmado por Sergio D. Rapisarda como Presidente, NO Berlanga — ejercicio anterior a su gestión), mismo archivo institucional. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2022.pdf. Convertido a USD con $125,03, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2022. SUPERÁVIT real del ejercicio: $1.216.670.585 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js).',
    },
  'velez-balance-2022-23': {
      id:'velez-balance-2022-23', clubId:'velez',
      title:'Estados Contables (Balance General auditado), Ejercicio N°113, 1°/7/2022 al 30/6/2023',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://velez.com.ar/elclubesdelossocios/memorias-estados-contables',
      note:'PDF oficial ESCANEADO, sin capa de texto (confirmado con pdffonts/pdftotext) — transcripto vía OCR (Tesseract 5, español, 300dpi; páginas con tablas anchas de 6 columnas rotadas 90° en el escaneo original se re-rotaron antes de correr el OCR para que saliera legible). Con auditoría de Bertora y Asociados S.R.L. sin salvedades, 25/9/2023, firmado por el Vicepresidente 1° (Lic. Diego González) en lugar de Rapisarda — Rapisarda se tomó licencia recién en julio 2023, después del cierre de este ejercicio, así que el ejercicio en sí transcurrió íntegro bajo su presidencia. Copia local en finance-of-sports/Clubes/Argentina/Velez Sarsfield/balance-general-2023.pdf (transcripción en balance-general-2023.md). Convertido a USD con $256,30, el tipo de cambio de cierre que el propio balance declara en su Anexo VI para USD al 30/06/2023. SUPERÁVIT real del ejercicio: $522.234.138 ARS. Mismo criterio de categorización que el resto (ver data/velez-data.js); los números se verificaron con 2 sumas independientes del Anexo III antes de cargarlos (ambas coinciden exacto con el total impreso), no solo con el OCR crudo.',
    },
});

gestionesByClub.velez = {
    // Confirmado (Versión 83): Fabián Berlanga fue electo presidente el 12/11/2023 (nota oficial
    // del club, velez.com.ar/club/notas/2023/11/12/220544_fabian-berlanga-presidente), mandato
    // 2023-2026. `nombre` ya refleja esa fecha real de asunción. firstYear/lastYear siguen siendo
    // el rango de EJERCICIOS REALES CARGADOS (no la fecha de asunción) — mismo criterio que
    // "milito"/"blanco" de Racing. Ampliado a 2024 en la Versión 84 (el Ejercicio 114, 1°/7/2023 al
    // 30/6/2024, cae bajo su gestión — asumió en noviembre 2023, a mitad de ese ejercicio).
    berlanga: { nombre:'Berlanga (2023-actual)', firstYear:2024, lastYear:2025 },
    // Confirmado (Versión 85): Sergio Rapisarda asumió por primera vez en noviembre 2017, fue
    // reelecto en marzo 2021, y se tomó licencia en julio 2023 tras la agresión de barras (dejando
    // paso, meses después, a la elección de Berlanga en noviembre 2023). Ampliado a 2018 en la
    // Versión 89 (el Ejercicio 108, 1°/7/2017 al 30/6/2018, también cae dentro de su primera
    // gestión — asumió en noviembre 2017, a mitad de este ejercicio).
    // Ampliado a 2023 en la Versión 90 (Ejercicio 113, 1°/7/2022 al 30/6/2023) — el ejercicio
    // transcurrió íntegro bajo su presidencia aunque el balance esté firmado por el Vicepresidente
    // (Rapisarda se tomó licencia recién en julio 2023, después del cierre de este ejercicio).
    rapisarda: { nombre:'Rapisarda (2017-2023)', firstYear:2018, lastYear:2023 },
    // Confirmado por búsqueda (Versión 91): Raúl H. Gámez fue presidente de Vélez en 3 mandatos no
    // consecutivos (1996-1999, 2002-2005, 2014-2017); el Ejercicio 2015 (1°/7/2014-30/6/2015) cae
    // en su 3er mandato, el único cargado hasta ahora bajo su gestión.
    // Ampliado a 2017 en la Versión 92 (Ejercicio 107, 1°/7/2016 al 30/6/2017, último de su 3ra
    // gestión antes de que asumiera Rapisarda en noviembre 2017).
    gamez: { nombre:'Gámez (2014-2017)', firstYear:2015, lastYear:2017 },
  };

memberCountByClub.velez = 72889;

