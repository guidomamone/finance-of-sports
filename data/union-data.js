// ============================================================================
// data/union-data.js — Club Atlético Unión (Santa Fe): 11vo club del motor genérico. 4 ejercicios
// cargados: 2022, 2023 (agregado a nivel de 4 categorías, ver más abajo), 2024, 2025. PDF +
// transcripción en Clubes/Argentina/Union/{memoria-y-balance-116,memoria-y-balance-117,
// estados-contables-118-2023-2024,memoria-y-balance-119}.{pdf,md}.
//
// 2025 (Ejercicio N°119, 1°/7/2024 al 30/6/2025): balance auditado real. Este PDF es MIXTO:
// páginas 1-35 (Memoria narrativa) tienen texto nativo, pero páginas 36-54 (los Estados Contables
// reales — Situación Patrimonial, Recursos y Gastos, Anexos) son un escaneo sin capa de texto,
// transcripto vía OCR (Tesseract, español, 300-600dpi). Varias páginas de Anexo (Bienes de Uso,
// Activos Intangibles, Situación Patrimonial) estaban rotadas 90° dentro del escaneo — se corrigió
// con PIL antes de re-OCRear, mismo criterio que club-data-mapping/SKILL.md sección 15. El Anexo V
// (moneda extranjera) no se pudo leer de forma confiable ni rotado ni a 600dpi (tabla multi-columna
// resistente al OCR) — se usó el dólar oficial vendedor BNA de cierre en su lugar (investigado
// externamente, ver fx abajo).
//
// Categorización del Anexo IV de 2025 ("Informe sobre el rubro Gastos y su aplicación"): a
// diferencia de Vélez/Instituto/Rosario Central/Estudiantes LP, este Anexo NO tiene una columna por
// sector limpiamente separable en el texto OCR de ESTE documento puntual (las columnas de
// departamento se mezclaron en la extracción). Se cargaron con CONFIANZA solo 3 desgloses que se
// pudieron verificar por checksum exacto contra el total de su categoría en el Estado de Recursos y
// Gastos: "Sueldos y Jornales de Futbol" (6.510,993333 M, dentro de "Gastos de fútbol") →
// wages_squad, y las 2 filas de "Amortizaciones" (Anexo I: 398,387133 M + Anexo II: 2.476,887829 M
// = 2.875,274962 M, cierra EXACTO contra "Amortizaciones de bienes de uso y activo intangibles" del
// estado principal) → depreciation / player_amortisation respectivamente. El RESTO de cada una de
// las 6 categorías del estado principal (Administración, Partidos y estadio, resto de Fútbol,
// Subcomisiones, Otros gastos) se cargó como una sola línea por categoría (usando el total ya
// verificado del propio Estado de Recursos y Gastos), en vez de forzar una asignación fila-por-fila
// que el OCR no permite confirmar con certeza — más fiel que adivinar a qué departamento pertenece
// cada fila ambigua.
//
// 2022 (Ejercicio N°116, "Rectificativo" — versión corregida presentada, firmada 4/3/2024) y 2023
// (Ejercicio N°117): a diferencia del documento de 2025, el Anexo IV ("Informe Sobre el Rubro
// Gastos y su Aplicación") de estos 2 balances SÍ tiene columnas por departamento razonablemente
// separables en el texto OCR (aunque el header de columnas quedó parcialmente cortado en la
// extracción) — se verificó fila por fila que la SUMA de todos los rubros del Anexo cierra EXACTO
// contra el "Total de Gastos Ordinarios" del Estado de Recursos y Gastos principal antes de cargar
// (2022: 23 rubros suman $2.067.493.328,46 vs. impreso $2.067.493.328,45, diferencia de 1 centavo
// por redondeo). Categorización por NATURALEZA del rubro (mismo criterio que Argentinos Juniors
// esta sesión), no por columna de departamento cuando el reparto exacto entre 2 departamentos no
// se pudo confirmar con certeza (ej. "Sueldos y Jornales de Maestranza", que el Anexo reparte entre
// 2 columnas, se cargó entero en admin_general_expense en vez de forzar el split).
// Ambos documentos declaran "expresado a moneda de cierre" — es la aplicación normal de la
// normativa de ajuste por inflación vigente en Argentina desde 2019 (no es el mismo problema
// encontrado en Argentinos Juniors esta sesión: ahí una presentación RESTATED HACIA ATRÁS convivía
// con balances individuales NO restated de los mismos años, dando cifras incompatibles entre sí.
// Acá cada balance de Unión declara su PROPIO ejercicio "a moneda de cierre" de ESE mismo ejercicio
// — es simplemente la cifra nominal de cierre del año, consistente con el resto del sitio) — pero
// por las dudas, se usó SIEMPRE la columna "del ejercicio actual" de cada balance (nunca la columna
// comparativa de un balance posterior, que si se restated hacia una fecha de cierre distinta no
// sería comparable).
// NINGUNO de los 2 archivos (116, 117) incluye una página de Estado de Situación Patrimonial
// completa en el escaneo disponible (se buscó explícitamente "TOTAL DEL ACTIVO"/"TOTAL ACTIVO" en
// todo el texto OCR de ambos archivos, sin encontrarlo) — grossDebt/cash quedaron SIN CARGAR para
// 2022 y 2023 (no inventados), a diferencia de 2024/2025 que sí lo tienen.
//
// 2024 (Ejercicio N°118, Estados Contables 2023-2024): ver comentario en su propio bloque de
// fiscalYearMeta más abajo — este documento SOLO da el Estado de Recursos y Gastos a nivel de las 4
// categorías agregadas (no tiene Anexo IV de detalle por rubro en el archivo descargado), se cargó
// con ese nivel de agregación honesta.
//
// grossDebt = "Deudas" corriente+no corriente, EXCLUYENDO "Previsiones" — mismo criterio que el
// resto de los clubes (cuando el balance lo permite calcular). cash = Caja y bancos.
//
// Gestión: Luis Jorge Spahn, presidente desde el 24/7/2009 (varias reelecciones, la más reciente en
// mayo de 2025, mandato hasta 2028) — cubre los 4 ejercicios cargados con confianza total.
// ============================================================================

const unionRevenueLinesByYear = {
  2022: [
    { rawLabel:'Carnet Socios', normalizedCategory:'member_dues', amountNative:5.205313, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:97.752524, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:334.042226, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisión', normalizedCategory:'broadcasting', amountNative:509.891458, disclosureLevel:'detailed' },
    { rawLabel:'Utilidad por préstamos y transferencias de jugadores', normalizedCategory:'player_sales', amountNative:682.109092, disclosureLevel:'detailed' },
    { rawLabel:'Otros recursos por derechos sobre jugadores', normalizedCategory:'player_sales', amountNative:35.226461, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por participación en competencias internacionales', normalizedCategory:'competition_bonus', amountNative:97.904054, disclosureLevel:'detailed' },
    { rawLabel:'Contribuciones de socios, ventas de palcos y plateas', normalizedCategory:'season_tickets', amountNative:98.568865, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por alquiler de instalaciones', normalizedCategory:'other_income', amountNative:12.066099, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por festivales y eventos culturales', normalizedCategory:'other_income', amountNative:4.780115, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:14.473168, disclosureLevel:'detailed' },
    { rawLabel:'Ventas Tatengue (tienda)', normalizedCategory:'other_income', amountNative:82.471085, disclosureLevel:'detailed' },
    { rawLabel:'Departamento para la Actividad Educativa', normalizedCategory:'other_income', amountNative:293.406843, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de Subcomisiones', normalizedCategory:'other_income', amountNative:23.552535, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Fútbol Amateur', normalizedCategory:'youth_football', amountNative:12.421668, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios', normalizedCategory:'other_income', amountNative:0.027653, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Carnet Socios', normalizedCategory:'member_dues', amountNative:6.231108, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:185.710851, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:924.688245, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisión', normalizedCategory:'broadcasting', amountNative:756.347267, disclosureLevel:'detailed' },
    { rawLabel:'Utilidad por préstamos y transferencias de jugadores', normalizedCategory:'player_sales', amountNative:1109.635677, disclosureLevel:'detailed' },
    { rawLabel:'Otros recursos por derechos sobre jugadores', normalizedCategory:'player_sales', amountNative:705.137488, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por participación en competencias internacionales', normalizedCategory:'competition_bonus', amountNative:116.009431, disclosureLevel:'detailed' },
    { rawLabel:'Contribuciones de socios, ventas de palcos y plateas', normalizedCategory:'season_tickets', amountNative:181.167376, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por alquiler de instalaciones', normalizedCategory:'other_income', amountNative:42.376737, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por festivales y eventos culturales', normalizedCategory:'other_income', amountNative:3.240270, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:23.861684, disclosureLevel:'detailed' },
    { rawLabel:'Ventas Tatengue (tienda)', normalizedCategory:'other_income', amountNative:196.034661, disclosureLevel:'detailed' },
    { rawLabel:'Departamento para la Actividad Educativa', normalizedCategory:'other_income', amountNative:677.011879, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de Subcomisiones', normalizedCategory:'other_income', amountNative:74.289110, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Fútbol Amateur', normalizedCategory:'youth_football', amountNative:43.217287, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios', normalizedCategory:'other_income', amountNative:42.915278, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Carnet Socios', normalizedCategory:'member_dues', amountNative:14.962775, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:363.810847, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:3481.876210, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisión', normalizedCategory:'broadcasting', amountNative:2377.983704, disclosureLevel:'detailed' },
    { rawLabel:'Utilidad por préstamos y transferencias de jugadores', normalizedCategory:'player_sales', amountNative:9752.394071, disclosureLevel:'detailed' },
    { rawLabel:'Otros recursos por derechos sobre jugadores', normalizedCategory:'player_sales', amountNative:262.289771, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por participación en competencias internacionales', normalizedCategory:'competition_bonus', amountNative:73.185909, disclosureLevel:'detailed' },
    { rawLabel:'Contribuciones de socios, ventas de palcos y plateas', normalizedCategory:'season_tickets', amountNative:478.750987, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por alquiler de instalaciones', normalizedCategory:'other_income', amountNative:103.430901, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por festivales y eventos culturales', normalizedCategory:'other_income', amountNative:1.497426, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:70.778628, disclosureLevel:'detailed' },
    { rawLabel:'Ventas Tatengue (tienda)', normalizedCategory:'other_income', amountNative:579.719352, disclosureLevel:'detailed' },
    { rawLabel:'Departamento para la Actividad Educativa', normalizedCategory:'other_income', amountNative:2278.670012, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de Subcomisiones', normalizedCategory:'other_income', amountNative:219.706856, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Fútbol Amateur', normalizedCategory:'youth_football', amountNative:140.332766, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios', normalizedCategory:'other_income', amountNative:83.909000, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Cuotas Sociales', normalizedCategory:'member_dues', amountNative:6052.384512, disclosureLevel:'detailed' },
    { rawLabel:'Carnet Socios', normalizedCategory:'member_dues', amountNative:11.437925, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1307.997083, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisión', normalizedCategory:'broadcasting', amountNative:3981.942789, disclosureLevel:'detailed' },
    { rawLabel:'Utilidad por préstamos y transferencias de jugadores', normalizedCategory:'player_sales', amountNative:5542.964907, disclosureLevel:'detailed' },
    { rawLabel:'Otros recursos por derechos sobre jugadores', normalizedCategory:'player_sales', amountNative:1461.354794, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por participación en competencias internacionales', normalizedCategory:'competition_bonus', amountNative:2472.148350, disclosureLevel:'detailed' },
    { rawLabel:'Contribuciones de socios, ventas de palcos y plateas', normalizedCategory:'season_tickets', amountNative:1535.760825, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por alquiler de instalaciones', normalizedCategory:'other_income', amountNative:207.810300, disclosureLevel:'detailed' },
    { rawLabel:'Recursos por festivales y eventos culturales', normalizedCategory:'other_income', amountNative:8.953031, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos', normalizedCategory:'other_income', amountNative:177.589377, disclosureLevel:'detailed' },
    { rawLabel:'Ventas Tatengue (tienda)', normalizedCategory:'other_income', amountNative:976.568883, disclosureLevel:'detailed' },
    { rawLabel:'Departamento para la Actividad Educativa', normalizedCategory:'other_income', amountNative:3152.395103, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de Subcomisiones', normalizedCategory:'other_income', amountNative:480.096085, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Fútbol Amateur', normalizedCategory:'youth_football', amountNative:183.019674, disclosureLevel:'detailed' },
    { rawLabel:'Subsidios', normalizedCategory:'other_income', amountNative:141.577709, disclosureLevel:'detailed' },
  ],
};

const unionExpenseLinesByYear = {
  2022: [
    { rawLabel:'Sueldos y Jornales de Futbol', normalizedCategory:'wages_squad', amountNative:-427.827998, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Soc. de Administración', normalizedCategory:'admin_general_expense', amountNative:-19.695935, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales de Maestranza', normalizedCategory:'admin_general_expense', amountNative:-164.082466, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales p/ Reunión', normalizedCategory:'match_organisation_expense', amountNative:-12.108472, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administrativos', normalizedCategory:'admin_general_expense', amountNative:-72.916605, disclosureLevel:'detailed' },
    { rawLabel:'Gastos del Estadio Cubierto', normalizedCategory:'match_organisation_expense', amountNative:-8.081729, disclosureLevel:'detailed' },
    { rawLabel:'Gastos del Estadio de Futbol', normalizedCategory:'match_organisation_expense', amountNative:-83.677843, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Futbol (sin desglosar por rubro)', normalizedCategory:'lump_football_operations_expense', amountNative:-440.912680, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos oficiales', normalizedCategory:'match_organisation_expense', amountNative:-38.168471, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Vigilancia', normalizedCategory:'match_organisation_expense', amountNative:-22.559588, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones y gtos bancarios', normalizedCategory:'admin_general_expense', amountNative:-37.391984, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones (Anexo I, bienes de uso)', normalizedCategory:'depreciation', amountNative:-23.630678, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-40.408645, disclosureLevel:'detailed' },
    { rawLabel:'Energía Eléctrica, Gas, Agua, Teléfonos', normalizedCategory:'admin_general_expense', amountNative:-21.167480, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por Préstamos y Ventas de Jugadores', normalizedCategory:'other_expenses', amountNative:-108.522944, disclosureLevel:'detailed' },
    { rawLabel:'Gastos del Complejo La Tatenguita', normalizedCategory:'youth_other_sports_expense', amountNative:-1.173244, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de Activos Intangibles (Anexo II)', normalizedCategory:'player_amortisation', amountNative:-118.881799, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-0.850479, disclosureLevel:'detailed' },
    { rawLabel:'Departamento para la Actividad Educativa', normalizedCategory:'youth_other_sports_expense', amountNative:-259.498997, disclosureLevel:'detailed' },
    { rawLabel:'Egresos de Subcomisiones', normalizedCategory:'youth_other_sports_expense', amountNative:-97.570398, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-6.307863, disclosureLevel:'detailed' },
    { rawLabel:'IVA no computable', normalizedCategory:'admin_general_expense', amountNative:-45.257030, disclosureLevel:'detailed' },
    { rawLabel:'Quebrantos por Incobrables y otras Contingencias', normalizedCategory:'other_expenses', amountNative:-16.800000, disclosureLevel:'detailed' },
  ],
  2023: [
    { rawLabel:'Sueldos y Jornales de Futbol', normalizedCategory:'wages_squad', amountNative:-861.715644, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Cargas Soc. de Administración', normalizedCategory:'admin_general_expense', amountNative:-45.084255, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales de Maestranza', normalizedCategory:'admin_general_expense', amountNative:-348.106652, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y Jornales p/ Reunión', normalizedCategory:'match_organisation_expense', amountNative:-38.212396, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administrativos', normalizedCategory:'admin_general_expense', amountNative:-293.509153, disclosureLevel:'detailed' },
    { rawLabel:'Gastos del Estadio Cubierto', normalizedCategory:'match_organisation_expense', amountNative:-16.754348, disclosureLevel:'detailed' },
    { rawLabel:'Gastos del Estadio de Futbol', normalizedCategory:'match_organisation_expense', amountNative:-96.505920, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Futbol (sin desglosar por rubro)', normalizedCategory:'lump_football_operations_expense', amountNative:-467.830796, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos oficiales', normalizedCategory:'match_organisation_expense', amountNative:-101.344374, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Vigilancia', normalizedCategory:'match_organisation_expense', amountNative:-49.702423, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones y gtos bancarios', normalizedCategory:'admin_general_expense', amountNative:-85.801541, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones (Anexo I, bienes de uso)', normalizedCategory:'depreciation', amountNative:-64.051993, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Mantenimiento', normalizedCategory:'admin_general_expense', amountNative:-83.771742, disclosureLevel:'detailed' },
    { rawLabel:'Energía Eléctrica, Gas, Agua, Teléfonos', normalizedCategory:'admin_general_expense', amountNative:-16.030300, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por Préstamos y Ventas de Jugadores', normalizedCategory:'other_expenses', amountNative:-289.924786, disclosureLevel:'detailed' },
    { rawLabel:'Gastos del Complejo La Tatenguita', normalizedCategory:'youth_other_sports_expense', amountNative:-5.210099, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de Activos Intangibles (Anexo II)', normalizedCategory:'player_amortisation', amountNative:-350.752855, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-5.689855, disclosureLevel:'detailed' },
    { rawLabel:'Departamento para la Actividad Educativa', normalizedCategory:'youth_other_sports_expense', amountNative:-601.884067, disclosureLevel:'detailed' },
    { rawLabel:'Egresos de Subcomisiones', normalizedCategory:'youth_other_sports_expense', amountNative:-249.548058, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales', normalizedCategory:'admin_general_expense', amountNative:-8.790816, disclosureLevel:'detailed' },
    { rawLabel:'IVA no computable', normalizedCategory:'admin_general_expense', amountNative:-88.694923, disclosureLevel:'detailed' },
    { rawLabel:'Quebrantos por Libertad de Acción de Jugadores Prof.', normalizedCategory:'other_expenses', amountNative:-170.295073, disclosureLevel:'detailed' },
  ],
  2024: [
    // Este archivo (Estados Contables 2023-2024) NO incluye el Anexo IV de detalle por rubro (a
    // diferencia de 116/117) — se cargó a nivel de las 6 categorías agregadas del Estado de
    // Recursos y Gastos principal, agregación honesta. Única excepción: "Amortizaciones de bienes
    // de uso y activo intangibles" SÍ se pudo partir en 2, cruzando contra el Anexo II (Activos
    // Intangibles) que declara "Amortización del Ejercicio" = $1.245.739.483 exacto — el resto
    // ($259.700.253) es la depreciación de bienes de uso.
    { rawLabel:'Gastos generales de administración y funcionamiento', normalizedCategory:'admin_general_expense', amountNative:-2512.306320, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos y estadio de futbol', normalizedCategory:'match_organisation_expense', amountNative:-2000.707871, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de futbol (sin desglosar por rubro)', normalizedCategory:'lump_football_operations_expense', amountNative:-9412.264760, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de subcomisiones', normalizedCategory:'youth_other_sports_expense', amountNative:-3225.874344, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-259.700253, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles (Anexo II)', normalizedCategory:'player_amortisation', amountNative:-1245.739483, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-396.298215, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Sueldos y Jornales de Fútbol', normalizedCategory:'wages_squad', amountNative:-6510.993333, disclosureLevel:'detailed' },
    { rawLabel:'Resto de Gastos de fútbol (sin desglosar por rubro)', normalizedCategory:'lump_football_operations_expense', amountNative:-8271.366449, disclosureLevel:'detailed' },
    { rawLabel:'Gastos generales de administración y funcionamiento', normalizedCategory:'admin_general_expense', amountNative:-4855.998124, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de partidos y estadio de fútbol', normalizedCategory:'match_organisation_expense', amountNative:-1917.032911, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de subcomisiones', normalizedCategory:'youth_other_sports_expense', amountNative:-4565.843198, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso (Anexo I)', normalizedCategory:'depreciation', amountNative:-398.387133, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles (Anexo II)', normalizedCategory:'player_amortisation', amountNative:-2476.887829, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-4.016103, disclosureLevel:'detailed' },
  ],
};

// LOS 4 TIPOS DE CAMBIO DE UNIÓN SON `document_close`, NO `market_close` (corregido en la
// Versión 140). Estaban etiquetados como cotización de mercado y no lo son: los 4 salen del
// ANEXO V del propio balance de Unión, lado Activo/Créditos, como dice la `note` de cada
// fuente en data/clubs.js. La etiqueta equivocada disparaba 2 hallazgos de la auditoría, y el
// más ruidoso era real pero mal diagnosticado: "Unión 2024 usa 890,50 pero la tabla de mercado
// dice 909 para esa fecha".
//
// LOS DOS NÚMEROS ESTÁN BIEN, Y ESTA ES LA PARTE QUE HAY QUE ENTENDER ANTES DE "CORREGIR"
// ALGUNO (lo planteó Guido: "puede ser porque tuvieron acceso a distinto FX, o porque al
// momento de cancelar o recibir tal plata, el fx era distinto"): un Anexo de moneda extranjera
// valúa los ACTIVOS (créditos, lo que le deben al club) al tipo COMPRADOR y los PASIVOS
// (deudas) al VENDEDOR. Son los dos lados del spread del mismo día. 890,50 es el comprador
// del 30/6/2024 y ~909 el mayorista/vendedor: no se contradicen, describen cosas distintas.
// Por eso la regla del proyecto dice que el `fx` que declara un documento va LITERAL en el
// archivo de ese club y nunca se mueve a FX_CLOSE ni se reemplaza por el de otro club.
const unionFiscalYearMeta = {
  2022: {
    // No se encontró página de Estado de Situación Patrimonial en el escaneo disponible de este
    // archivo (ver comentario de cabecera) — grossDebt/cash quedan sin cargar, no inventados.
    currency:'ARS', fx:124, fxSource:'document_close', sourceId:'union-memoria-y-balance-116',
    reportType:'official_balance_sheet', gestionId:'spahn',
    profitOnPlayerSales:0, assetSales:0, netInterest:-45.996916, tax:0,
    // SUPERÁVIT FINAL real: $190.408.914 ARS.
    officialTotalRevenue:2303.899158, officialTotalExpenses:2067.493328, officialPAT:190.408914,
  },
  2023: {
    // No se encontró página de Estado de Situación Patrimonial en el escaneo disponible de este
    // archivo (ver comentario de cabecera) — grossDebt/cash quedan sin cargar, no inventados.
    currency:'ARS', fx:255, fxSource:'document_close', sourceId:'union-memoria-y-balance-117',
    reportType:'official_balance_sheet', gestionId:'spahn',
    profitOnPlayerSales:0, assetSales:0, netInterest:145.239007, tax:0,
    // SUPERÁVIT FINAL real: $893.901.287 ARS.
    officialTotalRevenue:5087.874350, officialTotalExpenses:4339.212070, officialPAT:893.901287,
  },
  2024: {
    // No se encontró página de Estado de Situación Patrimonial en el escaneo disponible de este
    // archivo — grossDebt/cash quedan sin cargar, no inventados.
    currency:'ARS', fx:890.50, fxSource:'document_close', sourceId:'union-estados-contables-118-2023-24',
    reportType:'official_balance_sheet', gestionId:'spahn',
    profitOnPlayerSales:0, assetSales:0, netInterest:-64.084989, tax:0,
    // SUPERÁVIT FINAL real: $1.166.322.977 ARS.
    officialTotalRevenue:20283.299213, officialTotalExpenses:19052.891247, officialPAT:1166.322977,
  },
  2025: {
    // El propio balance no se pudo leer con confianza para su Anexo de moneda extranjera (ver
    // comentario de cabecera) — dólar oficial vendedor BNA de cierre 30/6/2025, investigado
    // externamente.
    currency:'ARS', fx:1217.87, fxSource:'document_close', sourceId:'union-memoria-y-balance-119',
    reportType:'official_balance_sheet', gestionId:'spahn',
    // grossDebt = Deudas corriente (8.619,653532) + no corriente (137,744168), sin Previsiones
    // (704,285792, contingencia). cash = Caja y bancos.
    grossDebt:8757.397700, cash:352.305154,
    profitOnPlayerSales:0, assetSales:0, netInterest:-2715.522000, tax:0,
    // officialTotalRevenue/Expenses = "Total de Recursos"/"Total de Gastos Ordinarios" impresos.
    // DÉFICIT FINAL real: $(4.022.045.732) ARS.
    officialTotalRevenue:27694.001347, officialTotalExpenses:29000.525079, officialPAT:-4022.045732,
  },
};

const unionPasesData = [];
const unionResultadosData = {};
const unionTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.union = {
  revenueLinesByYear: unionRevenueLinesByYear, expenseLinesByYear: unionExpenseLinesByYear,
  fiscalYearMeta: unionFiscalYearMeta, pasesData: unionPasesData,
  resultadosData: unionResultadosData, titulosData: unionTitulosData,
};


Object.assign(sources, {
  'union-memoria-y-balance-116': {
      id:'union-memoria-y-balance-116', clubId:'union',
      title:'Memoria y Balance (Rectificativo), Ejercicio N°116 (1°/7/2021 al 30/6/2022)',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (52 páginas, escaneado sin capa de texto, transcripto vía OCR). Versión "Rectificativa" (corregida), firmada 4/3/2024. SUPERÁVIT FINAL real: $190.408.914 ARS. El Anexo IV (Gastos) SÍ tiene columnas por departamento razonablemente separables — verificado que sus 23 rubros suman exacto contra el Total de Gastos Ordinarios antes de cargar. No se encontró página de Estado de Situación Patrimonial en este escaneo — grossDebt/cash sin cargar. Convertido a USD con $124 (Anexo V, lado Activo/Créditos). Ver data/union-data.js.',
    },
  'union-memoria-y-balance-117': {
      id:'union-memoria-y-balance-117', clubId:'union',
      title:'Memoria y Balance (Rectificativo), Ejercicio N°117 (1°/7/2022 al 30/6/2023)',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (63 páginas, escaneado sin capa de texto, transcripto vía OCR). Versión "Rectificativa" (corregida), firmada 4/3/2024. SUPERÁVIT FINAL real: $893.901.287 ARS. Anexo IV verificado (24 rubros suman exacto contra el Total de Gastos Ordinarios). No se encontró página de Estado de Situación Patrimonial — grossDebt/cash sin cargar. Convertido a USD con $255 (Anexo V, lado Activo/Créditos). Ver data/union-data.js.',
    },
  'union-estados-contables-118-2023-24': {
      id:'union-estados-contables-118-2023-24', clubId:'union',
      title:'Estados Contables, Ejercicio N°118 (1°/7/2023 al 30/6/2024)',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (53 páginas, escaneado sin capa de texto, transcripto vía OCR), firmado 31/10/2024. SUPERÁVIT FINAL real: $1.166.322.977 ARS. A diferencia de 116/117, este archivo NO incluye el Anexo IV de detalle de Gastos por rubro — se cargó a nivel de las 6 categorías agregadas del Estado de Recursos y Gastos, con la excepción de "Amortizaciones" que se pudo partir en 2 cruzando contra el Anexo II (Activos Intangibles). No se encontró página de Estado de Situación Patrimonial — grossDebt/cash sin cargar. Convertido a USD con $890,50 (Anexo V, lado Activo/Créditos). Ver data/union-data.js.',
    },
  'union-memoria-y-balance-119': {
      id:'union-memoria-y-balance-119', clubId:'union',
      title:'Memoria y Balance (estados contables auditados), Ejercicio N°119, 1°/7/2024 al 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (54 páginas) MIXTO: páginas 1-35 (Memoria) texto nativo, páginas 36-54 (Estados Contables reales) escaneadas sin capa de texto, transcriptas vía OCR (Tesseract, algunas páginas rotadas 90°). El Anexo V (moneda extranjera) no se pudo leer con confianza — se usó el dólar oficial vendedor BNA de cierre 30/6/2025 ($1.217,87), investigado externamente. Firmado por Luis Jorge Spahn como Presidente. DÉFICIT FINAL real: $(4.022.045.732) ARS. El Anexo IV (Gastos) no separaba limpiamente sus columnas de departamento en el OCR — se cargaron con confianza solo "Sueldos y Jornales de Fútbol" (wages_squad) y las 2 líneas de Amortizaciones (verificadas por checksum exacto), el resto de cada categoría se cargó a nivel agregado (ver comentario completo en data/union-data.js).',
    },
});

gestionesByClub.union = {
    // Confirmado por búsqueda (Versión 95): Luis Jorge Spahn presidente desde 24/7/2009, varias
    // reelecciones, la más reciente en mayo de 2025 (mandato hasta 2028).
    spahn: { nombre:'Spahn (2009-actual)', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.union = null; // no se encontró una cifra confiable en esta sesión

