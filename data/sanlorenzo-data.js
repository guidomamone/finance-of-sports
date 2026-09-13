// ============================================================================
// data/sanlorenzo-data.js — Club Atlético San Lorenzo de Almagro: 10mo club del motor genérico. 4
// ejercicios consecutivos cargados: 2011, 2012, 2013, 2014 (30/6 de cada año), balances auditados
// reales, texto nativo (escaneado con calidad de OCR de imprenta vieja en 2013/2014 — pdftotext con
// typos; 2011/2012 vienen de un balance distinto, auditado por Deloitte, con mejor calidad de
// escaneo pero varias páginas de Anexo rotadas 90°, OCReadas con Tesseract tras rotar). PDF +
// transcripción en Clubes/Argentina/San Lorenzo/memoria-y-balance-{2011-2012,2012-2013,2013-2014}.
// {pdf,md} (la transcripción de 2011-2012 quedó pendiente de generar el .md, ver to-do).
//
// 2012 (Ejercicio cerrado 30/6/2012, auditado por Deloitte): tiene el desglose completo Anexo V
// (Recursos)/Anexo VI (Gastos) por rubro x departamento (Fútbol/Administración central/Ciudad
// deportiva/Subsedes), mismo mecanismo de columna-por-sector que Vélez/Instituto/2013 (Sueldos y
// cargas sociales, Primas y premios de jugadores → columna Fútbol = wages_squad, resto =
// youth_other_sports_expense). El Anexo VI está rotado 90° dentro del PDF (2 hojas) — se rotó con
// PIL antes de re-OCRear, mismo criterio que club-data-mapping/SKILL.md sección 15. Su fila
// "Transporte" es, otra vez, un subtotal "a transportar" de la Hoja 1 (no un gasto real) —
// excluida, mismo hallazgo que ya existía para 2013.
// 2011 (comparativo DENTRO del balance de 2012, no hay archivo propio descargado para este año):
// Anexo V (Recursos) da detalle completo por rubro para AMBOS años a la vez, así que 2011 tiene el
// mismo nivel de detalle de revenue que 2012. Anexo VI (Gastos), en cambio, solo desglosa por
// departamento el año "actual" (2012) — 2011 queda a nivel de las 7 categorías agregadas del
// Estado de Recursos y Gastos principal (Fútbol/Administración central/Ciudad deportiva/Subsedes/
// Depreciación/Amortización/Otros gastos), agregación honesta, no inventada.
// 2013 (Ejercicio cerrado 30/6/2013): tiene el desglose completo Anexo V (Recursos)/Anexo VI
// (Gastos) por rubro x departamento (Fútbol/Administración central/Ciudad deportiva/Subsedes),
// mismo mecanismo de columna-por-sector que Vélez/Instituto (Sueldos y cargas sociales, Primas y
// premios de jugadores → columna Fútbol = wages_squad, resto = youth_other_sports_expense).
// 2014 (Ejercicio cerrado 30/6/2014): ESTE documento específico (19 páginas) NO incluye los Anexos
// V/VI de detalle — solo el Estado de Recursos y Gastos con las 4 categorías agregadas (Fútbol/
// Administración central/Ciudad deportiva/Otros). Se cargó con ese nivel de agregación honesto
// (lump_football_operations para "Fútbol", member_dues para "Administración central" por analogía
// directa con el desglose real de 2013 del mismo club, donde esa categoría fue ~99,7% cuotas
// sociales), no se inventó un desglose que la fuente no da.
//
// Bug de transcripción encontrado y corregido en 2013: la fila "Préstamos"... no, en este caso fue
// la fila "Transporte" del Anexo VI (Hoja 2) — en realidad NO es una fila de gasto real, es un
// subtotal "a transportar" de la Hoja 1 (verificado: la suma de las 18 filas de la Hoja 1 da
// exactamente ese número, 113.639.649) — se excluyó de expenseLines para no duplicar gasto, se
// usaron solo las filas reales de Hoja 1 + Hoja 2.
//
// Varios números en el PDF fuente de 2013 usan COMA en vez de PUNTO como separador de miles (ej.
// "155.932,357" en vez de "155.932.357", "4,034.869" en vez de "4.034.869") — confirmado como
// error tipográfico del documento (no del OCR/transcripción) verificando que la suma de las partes
// da exacto el total impreso con el separador corregido a punto.
//
// grossDebt = "Deudas" corriente+no corriente, EXCLUYENDO "Previsiones" (contingencias, Anexo IV) —
// mismo criterio que el resto de los clubes. cash = Caja y bancos.
//
// FX: 2013 declara su propio Anexo (dos cotizaciones USD, $5,355 Activo / $5,388 Pasivo — se usó la
// de Activo/Caja, mismo criterio que Rosario Central/Estudiantes LP). 2014 NO declara tipo de
// cambio propio (documento más corto, sin Anexo de moneda extranjera) — se usó el dólar oficial
// vendedor BNA de cierre 30/6/2014 ($8,15, investigado externamente). 2012 declara su propio Anexo
// III (activos/pasivos en moneda extranjera, con VARIAS cotizaciones distintas por tipo de partida)
// — se usó la de Caja y bancos ($4,4870), mismo criterio de "lado Activo/Caja" que el resto del
// sitio. 2011 NO se pudo confirmar con la misma precisión (el Anexo III de 2012 no separa
// claramente su columna comparativa 2011 por tipo de cambio) — se usó $4,11, una aproximación
// externa del dólar oficial de mediados de 2011, MENOS confiable que el resto de los fx de este
// archivo, documentado así en vez de inventar precisión que no se tiene.
//
// Gestión: Carlos Abdo, presidente hasta su renuncia en agosto de 2012 (confirmado por búsqueda) —
// cubre los Ejercicios 2011 y 2012 (ambos cierran 30/6, ANTES de su renuncia). Matías Lammens,
// presidente provisional desde 1°/9/2012, electo formalmente 14/12/2013, reelecto 17/12/2016, hasta
// 2019 — cubre 2013/2014 con confianza (asumió a mitad del Ejercicio 2012/2013, mismo criterio que
// Berlanga/Belloso en otros clubes).
//
// 2024 (Ejercicio 1°/7/2023 al 30/6/2024): a diferencia de 2013/2014, esta NO es una carga de
// balance auditado — es el Presupuesto 2023-2024 (`Clubes/Argentina/San Lorenzo/
// presupuesto-2023-2024.md`), un presupuesto de CAJA mensual (12 columnas, jul-23 a jun-24) con
// texto nativo pero mal extraído por pdftotext -layout (números de filas anchas cayendo en líneas
// separadas) — se re-leyó directo de imágenes renderizadas de la página (300dpi) para reconstruir
// la tabla real. El documento separa una sección "Ordinaria" (operación normal) de una sección
// "Orígenes y Aplicaciones Extraordinarias" (aportes bancarios/dirigenciales y su cancelación,
// obras de capital, compra/venta de jugadores en términos de DESEMBOLSO de caja, cancelación de
// deuda vieja) — REGLA (ver `.claude/skills/club-data-mapping/SKILL.md` sección 16): se cargó SOLO
// la sección Ordinaria, la Extraordinaria es financiamiento/capital, no ingreso o gasto real del
// ejercicio. "Resultado Ordinario" (no "Saldo Final por Período", que sí mezcla con financiamiento)
// es el PAT del ejercicio. Pregunta anotada en dudas-por-club.md sobre por qué el club presupuesta
// así en vez de devengado, como sus propios balances auditados.
// "Impuestos/Moratoria/Cargas sociales" es UNA sola fila combinada en el documento (Pauta N°18) —
// no se puede separar, se cargó entera como admin_general_expense (ver SKILL.md sección 17 para el
// precedente completo de cómo se categoriza cada uno de esos 3 conceptos por separado en otros
// clubes). "Remuneraciones" excluye plantel profesional/cuerpo técnico/becas deportivas (Pauta N°8,
// eso va aparte en "Fútbol Profesional" → wages_squad) — es el resto de la estructura del club, va a
// admin_general_expense. Verificado con checksum antes de cargar: 7 categorías de Ingresos
// Ordinarios suman $19.416.976.393 (oficial $19.416.976.392, diff $1 redondeo); 11 categorías de
// Egresos Ordinarios suman $13.469.229.204 (oficial $13.469.229.203, diff $1); Ingresos−Egresos =
// $5.947.747.189 = Resultado Ordinario impreso, EXACTO.
// Gestión: Ejercicio a caballo entre 2 presidentes con una división casi exacta a la mitad —
// Marcelo Tinelli hasta el 26/12/2023, Marcelo Moretti desde entonces (electo 17/12/2023, asumió
// 26/12/2023) — se usó Moretti (a cargo al cierre 30/6/2024, mismo criterio que Berlanga/Belloso/
// Verón en otros clubes), pero por lo parejo de la división de meses queda anotado en
// dudas-por-club.md, mismo caso que Estudiantes LP 2024.
// FX: el presupuesto no declara tipo de cambio propio (es un documento en ARS puro, sin Anexo de
// moneda extranjera) — se usó el dólar mayorista de cierre 30/6/2024 ($909), el mismo ya
// investigado externamente y usado en Instituto/Independiente/Racing 2024 para la misma fecha.
// ============================================================================

const sanLorenzoRevenueLinesByYear = {
  2011: [
    { rawLabel:'Venta y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:4.269369, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'player_sales', amountNative:0.557425, disclosureLevel:'detailed' },
    { rawLabel:'Televisión', normalizedCategory:'broadcasting', amountNative:24.525111, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (fútbol)', normalizedCategory:'sponsorship_commercial', amountNative:8.679747, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones', normalizedCategory:'matchday_competition', amountNative:7.431914, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios (fútbol)', normalizedCategory:'other_income', amountNative:2.423194, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales y aranceles', normalizedCategory:'member_dues', amountNative:19.207283, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (administración central)', normalizedCategory:'other_income', amountNative:0.182725, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles (ciudad deportiva)', normalizedCategory:'other_income', amountNative:0.425028, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (ciudad deportiva)', normalizedCategory:'other_income', amountNative:0.067630, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (otros recursos)', normalizedCategory:'sponsorship_commercial', amountNative:1.467673, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento', normalizedCategory:'other_income', amountNative:1.691829, disclosureLevel:'detailed' },
    { rawLabel:'Eventos y agasajos', normalizedCategory:'other_income', amountNative:0.953750, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones', normalizedCategory:'other_income', amountNative:0.606835, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros recursos)', normalizedCategory:'other_income', amountNative:0.317443, disclosureLevel:'detailed' },
  ],
  2012: [
    { rawLabel:'Venta y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:10.004624, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'player_sales', amountNative:0.063512, disclosureLevel:'detailed' },
    { rawLabel:'Televisión', normalizedCategory:'broadcasting', amountNative:31.905066, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (fútbol)', normalizedCategory:'sponsorship_commercial', amountNative:11.035708, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones', normalizedCategory:'matchday_competition', amountNative:5.775652, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios (fútbol)', normalizedCategory:'other_income', amountNative:1.642862, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales y aranceles', normalizedCategory:'member_dues', amountNative:29.908323, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (administración central)', normalizedCategory:'other_income', amountNative:0.716000, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles (ciudad deportiva)', normalizedCategory:'other_income', amountNative:0.685998, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (ciudad deportiva)', normalizedCategory:'other_income', amountNative:0.093147, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (otros recursos)', normalizedCategory:'sponsorship_commercial', amountNative:1.357239, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento', normalizedCategory:'other_income', amountNative:2.436044, disclosureLevel:'detailed' },
    { rawLabel:'Eventos y agasajos', normalizedCategory:'other_income', amountNative:1.340000, disclosureLevel:'detailed' },
    { rawLabel:'Concesiones', normalizedCategory:'other_income', amountNative:0.503879, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros recursos)', normalizedCategory:'other_income', amountNative:0.766516, disclosureLevel:'detailed' },
  ],
  2017: [
    { rawLabel:'Ventas, derechos de formación y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:87.825511, disclosureLevel:'detailed' },
    { rawLabel:'Televisión', normalizedCategory:'broadcasting', amountNative:100.079329, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (fútbol)', normalizedCategory:'sponsorship_commercial', amountNative:54.797684, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones', normalizedCategory:'matchday_competition', amountNative:99.647854, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Copas Internacionales', normalizedCategory:'competition_bonus', amountNative:29.734615, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Copas Nacionales', normalizedCategory:'competition_bonus', amountNative:10.190562, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (fútbol)', normalizedCategory:'other_income', amountNative:0.485073, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios (fútbol)', normalizedCategory:'other_income', amountNative:13.063866, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales y carnets', normalizedCategory:'member_dues', amountNative:235.114275, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (administración central)', normalizedCategory:'other_income', amountNative:0.952068, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles (ciudad deportiva)', normalizedCategory:'other_income', amountNative:29.144349, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (otros recursos)', normalizedCategory:'sponsorship_commercial', amountNative:6.032126, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento', normalizedCategory:'other_income', amountNative:2.186405, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros recursos)', normalizedCategory:'other_income', amountNative:19.321746, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos y egresos', normalizedCategory:'other_income', amountNative:86.779016, disclosureLevel:'detailed' },
  ],
  2016: [
    { rawLabel:'Ventas, derechos de formación y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:83.271332, disclosureLevel:'detailed' },
    { rawLabel:'Televisión', normalizedCategory:'broadcasting', amountNative:55.572595, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (fútbol)', normalizedCategory:'sponsorship_commercial', amountNative:40.711756, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones', normalizedCategory:'matchday_competition', amountNative:64.221974, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Copas Internacionales', normalizedCategory:'competition_bonus', amountNative:26.303505, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Copas Nacionales', normalizedCategory:'competition_bonus', amountNative:4.337000, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (fútbol)', normalizedCategory:'other_income', amountNative:0.152088, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios (fútbol)', normalizedCategory:'other_income', amountNative:0.086433, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales y carnets', normalizedCategory:'member_dues', amountNative:139.994391, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (administración central)', normalizedCategory:'other_income', amountNative:1.091545, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles (ciudad deportiva)', normalizedCategory:'other_income', amountNative:16.086147, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (otros recursos)', normalizedCategory:'sponsorship_commercial', amountNative:4.195811, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento', normalizedCategory:'other_income', amountNative:2.787599, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros recursos)', normalizedCategory:'other_income', amountNative:1.655568, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos y egresos', normalizedCategory:'other_income', amountNative:2.296869, disclosureLevel:'detailed' },
  ],
  2015: [
    { rawLabel:'Ventas, derechos de formación y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:35.555167, disclosureLevel:'detailed' },
    { rawLabel:'Televisión', normalizedCategory:'broadcasting', amountNative:50.243565, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (fútbol)', normalizedCategory:'sponsorship_commercial', amountNative:61.928802, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones', normalizedCategory:'matchday_competition', amountNative:58.149640, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Copas Internacionales', normalizedCategory:'competition_bonus', amountNative:71.971230, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Copas Nacionales', normalizedCategory:'competition_bonus', amountNative:0.807000, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios (fútbol)', normalizedCategory:'other_income', amountNative:12.965950, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales y carnets', normalizedCategory:'member_dues', amountNative:100.760118, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (administración central)', normalizedCategory:'other_income', amountNative:0.466754, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles (ciudad deportiva)', normalizedCategory:'other_income', amountNative:6.470696, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (otros recursos)', normalizedCategory:'sponsorship_commercial', amountNative:1.643546, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento', normalizedCategory:'other_income', amountNative:2.182135, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros recursos)', normalizedCategory:'other_income', amountNative:26.264828, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos y egresos', normalizedCategory:'other_income', amountNative:9.356337, disclosureLevel:'detailed' },
  ],
  2013: [
    { rawLabel:'Venta y préstamos de jugadores', normalizedCategory:'player_sales', amountNative:3.460235, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de formación', normalizedCategory:'player_sales', amountNative:2.818298, disclosureLevel:'detailed' },
    { rawLabel:'Televisión', normalizedCategory:'broadcasting', amountNative:32.110467, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (fútbol)', normalizedCategory:'sponsorship_commercial', amountNative:15.526004, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones', normalizedCategory:'matchday_competition', amountNative:17.550135, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos varios (fútbol)', normalizedCategory:'other_income', amountNative:0.367772, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas sociales y aranceles', normalizedCategory:'member_dues', amountNative:49.325859, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (administración central)', normalizedCategory:'other_income', amountNative:0.160000, disclosureLevel:'detailed' },
    { rawLabel:'Aranceles (ciudad deportiva)', normalizedCategory:'other_income', amountNative:2.389118, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres (ciudad deportiva)', normalizedCategory:'other_income', amountNative:0.025949, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad (otros recursos)', normalizedCategory:'sponsorship_commercial', amountNative:8.083370, disclosureLevel:'detailed' },
    { rawLabel:'Estacionamiento', normalizedCategory:'other_income', amountNative:2.837608, disclosureLevel:'detailed' },
    { rawLabel:'Eventos y agasajos', normalizedCategory:'other_income', amountNative:0.711143, disclosureLevel:'detailed' },
    { rawLabel:'Diversos (otros recursos)', normalizedCategory:'other_income', amountNative:30.224279, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos y egresos', normalizedCategory:'other_income', amountNative:15.242433, disclosureLevel:'detailed' },
  ],
  2014: [
    { rawLabel:'Fútbol', normalizedCategory:'lump_football_operations', amountNative:124.988019, disclosureLevel:'detailed' },
    { rawLabel:'Administración central', normalizedCategory:'member_dues', amountNative:75.469370, disclosureLevel:'detailed' },
    { rawLabel:'Ciudad deportiva', normalizedCategory:'other_income', amountNative:5.328905, disclosureLevel:'detailed' },
    { rawLabel:'Otros recursos', normalizedCategory:'other_income', amountNative:27.368069, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos y egresos', normalizedCategory:'other_income', amountNative:39.067369, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Sociales', normalizedCategory:'member_dues', amountNative:9315.137807, disclosureLevel:'detailed' },
    { rawLabel:'Copas', normalizedCategory:'competition_bonus', amountNative:3612.215893, disclosureLevel:'detailed' },
    { rawLabel:'Recaudaciones Partidos', normalizedCategory:'matchday_competition', amountNative:1185.650690, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de TV (AFA)', normalizedCategory:'broadcasting', amountNative:1590.377826, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:3501.674995, disclosureLevel:'detailed' },
    { rawLabel:'Basquet', normalizedCategory:'other_sports', amountNative:27.126518, disclosureLevel:'detailed' },
    { rawLabel:'Otros Ingresos', normalizedCategory:'other_income', amountNative:184.792664, disclosureLevel:'detailed' },
  ],
};

const sanLorenzoExpenseLinesByYear = {
  2011: [
    { rawLabel:'Fútbol', normalizedCategory:'lump_football_operations_expense', amountNative:-57.973938, disclosureLevel:'detailed' },
    { rawLabel:'Administración central', normalizedCategory:'admin_general_expense', amountNative:-18.979011, disclosureLevel:'detailed' },
    { rawLabel:'Ciudad deportiva', normalizedCategory:'admin_general_expense', amountNative:-4.994057, disclosureLevel:'detailed' },
    { rawLabel:'Subsedes', normalizedCategory:'admin_general_expense', amountNative:-5.184812, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.347340, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-4.788329, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-2.113551, disclosureLevel:'detailed' },
  ],
  2012: [
    { rawLabel:'Sueldos y cargas sociales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-18.474793, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-18.902844, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores', normalizedCategory:'wages_squad', amountNative:-22.054485, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios', normalizedCategory:'admin_general_expense', amountNative:-2.702792, disclosureLevel:'detailed' },
    { rawLabel:'Rescisiones de contratos', normalizedCategory:'player_amortisation', amountNative:-1.147894, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-0.873030, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-1.558423, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-0.955242, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones por cobranzas', normalizedCategory:'admin_general_expense', amountNative:-1.752644, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de inscripción y afiliación', normalizedCategory:'match_organisation_expense', amountNative:-0.155660, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de arbitraje', normalizedCategory:'match_organisation_expense', amountNative:-0.122520, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de papelería y correo', normalizedCategory:'admin_general_expense', amountNative:-0.317934, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de representación', normalizedCategory:'admin_general_expense', amountNative:-0.223506, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de movilidad', normalizedCategory:'match_organisation_expense', amountNative:-0.607177, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing', normalizedCategory:'admin_general_expense', amountNative:-0.145513, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada', normalizedCategory:'match_organisation_expense', amountNative:-0.300028, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-0.299400, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-0.538499, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.445492, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-3.752031, disclosureLevel:'detailed' },
    { rawLabel:'Baja de activos intangibles', normalizedCategory:'player_impairment', amountNative:-5.328801, disclosureLevel:'detailed' },
    { rawLabel:'Juicios y contingencias', normalizedCategory:'other_expenses', amountNative:-16.481480, disclosureLevel:'detailed' },
    { rawLabel:'Acuerdos', normalizedCategory:'other_expenses', amountNative:-3.236035, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia', normalizedCategory:'other_expenses', amountNative:-2.800540, disclosureLevel:'detailed' },
    { rawLabel:'Créditos irrecuperables', normalizedCategory:'other_expenses', amountNative:-6.010528, disclosureLevel:'detailed' },
    { rawLabel:'Concurso de acreedores', normalizedCategory:'other_expenses', amountNative:-0.473630, disclosureLevel:'detailed' },
    { rawLabel:'Entrenamiento y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-1.559564, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de estadio', normalizedCategory:'match_organisation_expense', amountNative:-2.044653, disclosureLevel:'detailed' },
    { rawLabel:'Porcentaje A.F.A. y clubes', normalizedCategory:'match_organisation_expense', amountNative:-0.425879, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de jugadores', normalizedCategory:'player_amortisation', amountNative:-1.747130, disclosureLevel:'detailed' },
    { rawLabel:'Préstamos de jugadores', normalizedCategory:'other_expenses', amountNative:-2.303448, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad', normalizedCategory:'admin_general_expense', amountNative:-0.100376, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-4.584861, disclosureLevel:'detailed' },
  ],
  2017: [
    { rawLabel:'Sueldos y cargas sociales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-292.907954, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-120.125943, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores', normalizedCategory:'wages_squad', amountNative:-87.953802, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios', normalizedCategory:'admin_general_expense', amountNative:-17.874918, disclosureLevel:'detailed' },
    { rawLabel:'Rescisiones de contratos', normalizedCategory:'player_amortisation', amountNative:-8.154586, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-4.404567, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-4.192805, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-5.127728, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones por cobranzas', normalizedCategory:'admin_general_expense', amountNative:-10.718407, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de inscripción y afiliación', normalizedCategory:'match_organisation_expense', amountNative:-0.942569, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de arbitraje', normalizedCategory:'match_organisation_expense', amountNative:-0.806093, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de papelería y correo', normalizedCategory:'admin_general_expense', amountNative:-0.923449, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de representación', normalizedCategory:'admin_general_expense', amountNative:-9.311055, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de movilidad', normalizedCategory:'match_organisation_expense', amountNative:-22.631687, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing y publicidad', normalizedCategory:'admin_general_expense', amountNative:-7.982873, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada', normalizedCategory:'match_organisation_expense', amountNative:-12.445194, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-1.529417, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-9.070229, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-3.159770, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-52.197388, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación intangibles Básquet', normalizedCategory:'depreciation', amountNative:-0.900000, disclosureLevel:'detailed' },
    { rawLabel:'Juicios y contingencias', normalizedCategory:'other_expenses', amountNative:-19.580495, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia', normalizedCategory:'other_expenses', amountNative:-17.818116, disclosureLevel:'detailed' },
    { rawLabel:'Entrenamiento y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-2.953793, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de estadio', normalizedCategory:'match_organisation_expense', amountNative:-19.759148, disclosureLevel:'detailed' },
    { rawLabel:'Porcentaje A.F.A. y clubes', normalizedCategory:'match_organisation_expense', amountNative:-5.679157, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por transferencias y préstamos de jugadores', normalizedCategory:'other_expenses', amountNative:-38.720765, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-27.073115, disclosureLevel:'detailed' },
  ],
  2016: [
    { rawLabel:'Sueldos y cargas sociales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-135.850388, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-79.248241, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores', normalizedCategory:'wages_squad', amountNative:-58.388959, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios', normalizedCategory:'admin_general_expense', amountNative:-12.995996, disclosureLevel:'detailed' },
    { rawLabel:'Rescisiones de contratos', normalizedCategory:'player_amortisation', amountNative:-22.921218, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-2.542601, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-8.812556, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-2.919909, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones por cobranzas', normalizedCategory:'admin_general_expense', amountNative:-10.225782, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de inscripción y afiliación', normalizedCategory:'match_organisation_expense', amountNative:-1.404488, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de arbitraje', normalizedCategory:'match_organisation_expense', amountNative:-0.474758, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de papelería y correo', normalizedCategory:'admin_general_expense', amountNative:-0.529027, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de representación', normalizedCategory:'admin_general_expense', amountNative:-0.127094, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de movilidad', normalizedCategory:'match_organisation_expense', amountNative:-14.087634, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing y publicidad', normalizedCategory:'admin_general_expense', amountNative:-4.509091, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada', normalizedCategory:'match_organisation_expense', amountNative:-8.486255, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-0.950912, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-5.726732, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.961765, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-33.258091, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación intangibles Básquet', normalizedCategory:'depreciation', amountNative:-0.900000, disclosureLevel:'detailed' },
    { rawLabel:'Juicios y contingencias', normalizedCategory:'other_expenses', amountNative:-12.799605, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia', normalizedCategory:'other_expenses', amountNative:-15.737521, disclosureLevel:'detailed' },
    { rawLabel:'Entrenamiento y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-1.944539, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de estadio', normalizedCategory:'match_organisation_expense', amountNative:-17.781955, disclosureLevel:'detailed' },
    { rawLabel:'Porcentaje A.F.A. y clubes', normalizedCategory:'match_organisation_expense', amountNative:-1.445534, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por transferencias y préstamos de jugadores', normalizedCategory:'other_expenses', amountNative:-32.261029, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-13.523052, disclosureLevel:'detailed' },
  ],
  2015: [
    { rawLabel:'Sueldos y cargas sociales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-101.057002, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-45.876043, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores', normalizedCategory:'wages_squad', amountNative:-93.354239, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios', normalizedCategory:'admin_general_expense', amountNative:-9.205354, disclosureLevel:'detailed' },
    { rawLabel:'Rescisiones de contratos', normalizedCategory:'player_amortisation', amountNative:-7.976876, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-1.500789, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-1.891637, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-1.069241, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones por cobranzas', normalizedCategory:'admin_general_expense', amountNative:-7.784117, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de inscripción y afiliación', normalizedCategory:'match_organisation_expense', amountNative:-0.594234, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de arbitraje', normalizedCategory:'match_organisation_expense', amountNative:-0.381495, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de papelería y correo', normalizedCategory:'admin_general_expense', amountNative:-0.941609, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de representación', normalizedCategory:'admin_general_expense', amountNative:-0.253588, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de movilidad', normalizedCategory:'match_organisation_expense', amountNative:-11.538234, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing y publicidad', normalizedCategory:'admin_general_expense', amountNative:-0.027143, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada', normalizedCategory:'match_organisation_expense', amountNative:-5.493767, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-0.708529, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-4.160135, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.268067, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-25.820212, disclosureLevel:'detailed' },
    { rawLabel:'Juicios y contingencias', normalizedCategory:'other_expenses', amountNative:-6.221678, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia', normalizedCategory:'other_expenses', amountNative:-11.105443, disclosureLevel:'detailed' },
    { rawLabel:'Entrenamiento y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-2.330384, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de estadio', normalizedCategory:'match_organisation_expense', amountNative:-11.519353, disclosureLevel:'detailed' },
    { rawLabel:'Porcentaje A.F.A. y clubes', normalizedCategory:'match_organisation_expense', amountNative:-1.146113, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por transferencias y préstamos de jugadores', normalizedCategory:'other_expenses', amountNative:-3.309074, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-6.140979, disclosureLevel:'detailed' },
  ],
  2013: [
    { rawLabel:'Sueldos y cargas sociales (Fútbol)', normalizedCategory:'wages_squad', amountNative:-42.313910, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos y cargas sociales (resto de sectores)', normalizedCategory:'youth_other_sports_expense', amountNative:-22.090739, disclosureLevel:'detailed' },
    { rawLabel:'Primas y premios de jugadores', normalizedCategory:'wages_squad', amountNative:-24.025705, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios por servicios', normalizedCategory:'admin_general_expense', amountNative:-3.778984, disclosureLevel:'detailed' },
    { rawLabel:'Rescisiones de contratos', normalizedCategory:'player_amortisation', amountNative:-7.229148, disclosureLevel:'detailed' },
    { rawLabel:'Servicios públicos', normalizedCategory:'admin_general_expense', amountNative:-1.109312, disclosureLevel:'detailed' },
    { rawLabel:'Mantenimiento', normalizedCategory:'other_expenses', amountNative:-2.495720, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos y tasas', normalizedCategory:'admin_general_expense', amountNative:-0.142844, disclosureLevel:'detailed' },
    { rawLabel:'Comisiones por cobranzas', normalizedCategory:'admin_general_expense', amountNative:-2.477923, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de inscripción y afiliación', normalizedCategory:'match_organisation_expense', amountNative:-0.221492, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de arbitraje', normalizedCategory:'match_organisation_expense', amountNative:-0.235692, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de papelería y correo', normalizedCategory:'admin_general_expense', amountNative:-0.699383, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de representación', normalizedCategory:'admin_general_expense', amountNative:-0.040087, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de movilidad', normalizedCategory:'match_organisation_expense', amountNative:-1.569946, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de marketing y publicidad', normalizedCategory:'admin_general_expense', amountNative:-0.246643, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de temporada', normalizedCategory:'match_organisation_expense', amountNative:-0.724881, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'other_expenses', amountNative:-0.434573, disclosureLevel:'detailed' },
    { rawLabel:'Alquileres', normalizedCategory:'other_expenses', amountNative:-1.463155, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.339512, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-21.526365, disclosureLevel:'detailed' },
    { rawLabel:'Juicios y contingencias', normalizedCategory:'other_expenses', amountNative:-4.034869, disclosureLevel:'detailed' },
    { rawLabel:'Vigilancia', normalizedCategory:'other_expenses', amountNative:-4.483575, disclosureLevel:'detailed' },
    { rawLabel:'Concurso de acreedores', normalizedCategory:'other_expenses', amountNative:-1.008428, disclosureLevel:'detailed' },
    { rawLabel:'Entrenamiento y concentraciones', normalizedCategory:'match_organisation_expense', amountNative:-1.668061, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de estadio', normalizedCategory:'match_organisation_expense', amountNative:-4.422117, disclosureLevel:'detailed' },
    { rawLabel:'Porcentaje A.F.A. y clubes', normalizedCategory:'match_organisation_expense', amountNative:-0.625917, disclosureLevel:'detailed' },
    { rawLabel:'Transferencia de jugadores (gasto)', normalizedCategory:'player_amortisation', amountNative:-4.107342, disclosureLevel:'detailed' },
    { rawLabel:'Otros', normalizedCategory:'other_expenses', amountNative:-0.416034, disclosureLevel:'detailed' },
  ],
  2014: [
    { rawLabel:'Fútbol (gasto)', normalizedCategory:'lump_football_operations_expense', amountNative:-136.115811, disclosureLevel:'detailed' },
    { rawLabel:'Administración central (gasto)', normalizedCategory:'admin_general_expense', amountNative:-37.631270, disclosureLevel:'detailed' },
    { rawLabel:'Ciudad deportiva (gasto)', normalizedCategory:'other_expenses', amountNative:-15.830241, disclosureLevel:'detailed' },
    { rawLabel:'Subsedes', normalizedCategory:'other_expenses', amountNative:-9.033083, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación de bienes de uso', normalizedCategory:'depreciation', amountNative:-2.528849, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de activos intangibles', normalizedCategory:'player_amortisation', amountNative:-19.150669, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-0.411839, disclosureLevel:'detailed' },
  ],
  2024: [
    { rawLabel:'Remuneraciones (estructura, excl. plantel/cuerpo técnico)', normalizedCategory:'admin_general_expense', amountNative:-3454.425665, disclosureLevel:'detailed' },
    { rawLabel:'Fútbol Profesional', normalizedCategory:'wages_squad', amountNative:-6102.070794, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Estadio', normalizedCategory:'match_organisation_expense', amountNative:-1218.906175, disclosureLevel:'detailed' },
    { rawLabel:'Juveniles', normalizedCategory:'youth_other_sports_expense', amountNative:-109.304262, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Basquet', normalizedCategory:'youth_other_sports_expense', amountNative:-293.067214, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Administración', normalizedCategory:'admin_general_expense', amountNative:-571.846834, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Ciudad Deportiva', normalizedCategory:'admin_general_expense', amountNative:-165.320036, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Av. La Plata', normalizedCategory:'admin_general_expense', amountNative:-311.138446, disclosureLevel:'detailed' },
    { rawLabel:'Egresos Polideportivo', normalizedCategory:'admin_general_expense', amountNative:-13.318162, disclosureLevel:'detailed' },
    { rawLabel:'Egresos de Otros Deportes', normalizedCategory:'youth_other_sports_expense', amountNative:-366.780039, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos/Moratoria/Cargas sociales', normalizedCategory:'admin_general_expense', amountNative:-863.051577, disclosureLevel:'detailed' },
  ],
};

const sanLorenzoFiscalYearMeta = {
  2011: {
    // Comparativo dentro del balance 2011-2012 — no hay archivo propio descargado para este año.
    currency:'ARS', fx:4.11, sourceId:'sanlorenzo-memoria-y-balance-2011-12',
    reportType:'official_balance_sheet', gestionId:'abdo',
    grossDebt:187.458841, cash:3.574280,
    profitOnPlayerSales:0, assetSales:0, netInterest:-18.071405, tax:0,
    officialTotalRevenue:72.806956, officialTotalExpenses:96.381038, officialPAT:-41.645487,
  },
  2012: {
    currency:'ARS', fx:4.4870, sourceId:'sanlorenzo-memoria-y-balance-2011-12',
    reportType:'official_balance_sheet', gestionId:'abdo',
    grossDebt:192.833595, cash:0.562519,
    profitOnPlayerSales:0, assetSales:0, netInterest:-19.552079, tax:0,
    officialTotalRevenue:98.234570, officialTotalExpenses:124.426832, officialPAT:-45.744341,
  },
  2017: {
    currency:'ARS', fx:16.53, sourceId:'sanlorenzo-memoria-y-balance-2016-17',
    reportType:'official_balance_sheet', gestionId:'lammens',
    grossDebt:795.167813, cash:4.426903,
    profitOnPlayerSales:0, assetSales:0, netInterest:30.027161, tax:0,
    // officialTotalRevenue = RECURSOS ORDINARIOS (688.575463) + "Otros ingresos y egresos"
    // (86.779016), cargado como revenue line. SUPERÁVIT muy chico este ejercicio ($436.617,
    // prácticamente equilibrio) — verificado, no es un error.
    officialTotalRevenue:775.354479, officialTotalExpenses:804.945023, officialPAT:0.436617,
  },
  2016: {
    currency:'ARS', fx:14.94, sourceId:'sanlorenzo-memoria-y-balance-2015-16',
    reportType:'official_balance_sheet', gestionId:'lammens',
    grossDebt:295.282497, cash:0.516489,
    // Resultados financieros y por tenencia dio POSITIVO este ejercicio ($93.428.003) — no es un
    // error, el propio documento lo imprime así (ganancia financiera neta, no gasto).
    profitOnPlayerSales:0, assetSales:0, netInterest:93.428003, tax:0,
    // officialTotalRevenue = RECURSOS ORDINARIOS (440.467744) + "Otros ingresos y egresos"
    // (2.296869), cargado como revenue line.
    officialTotalRevenue:442.764613, officialTotalExpenses:502.814732, officialPAT:33.377884,
  },
  2015: {
    currency:'ARS', fx:8.9880, sourceId:'sanlorenzo-memoria-y-balance-2014-15',
    reportType:'official_balance_sheet', gestionId:'lammens',
    grossDebt:155.775046, cash:0.304329,
    profitOnPlayerSales:0, assetSales:0, netInterest:-33.122045, tax:0,
    // officialTotalRevenue = RECURSOS ORDINARIOS (429.409431) + "Otros ingresos y egresos"
    // (9.356337), cargado como revenue line.
    officialTotalRevenue:438.765768, officialTotalExpenses:363.675335, officialPAT:41.968388,
  },
  2013: {
    currency:'ARS', fx:5.3550, sourceId:'sanlorenzo-memoria-y-balance-2012-13',
    reportType:'official_balance_sheet', gestionId:'lammens',
    grossDebt:144.192315, cash:0.199171,
    profitOnPlayerSales:0, assetSales:0, netInterest:8.029385, tax:0,
    // officialTotalRevenue = RECURSOS ORDINARIOS (165.590237) + "Otros ingresos y egresos"
    // (15.242433), cargado como revenue line — ver comentario de cabecera.
    officialTotalRevenue:180.832670, officialTotalExpenses:155.932357, officialPAT:32.929698,
  },
  2014: {
    currency:'ARS', fx:8.15, sourceId:'sanlorenzo-memoria-y-balance-2013-14',
    reportType:'official_balance_sheet', gestionId:'lammens',
    grossDebt:156.616408, cash:0.331774,
    profitOnPlayerSales:0, assetSales:0, netInterest:25.108904, tax:0,
    // officialTotalRevenue = RECURSOS ORDINARIOS (233.154363) + "Otros ingresos y egresos"
    // (39.067369), cargado como revenue line.
    officialTotalRevenue:272.221732, officialTotalExpenses:220.701762, officialPAT:76.628874,
  },
  2024: {
    // Presupuesto (no balance auditado), sección Ordinaria únicamente — ver comentario de cabecera.
    currency:'ARS', fx:909, sourceId:'sanlorenzo-presupuesto-2023-24',
    reportType:'official_budget', gestionId:'moretti',
    // Presupuesto de caja: no incluye Estado de Situación Patrimonial, sin grossDebt/cash (mismo
    // motivo que Boca 2027/Racing 2026-2027).
    profitOnPlayerSales:0, assetSales:0, netInterest:0, tax:0,
    officialTotalRevenue:19416.976392, officialTotalExpenses:13469.229203, officialPAT:5947.747189,
  },
};

const sanLorenzoPasesData = [];
const sanLorenzoResultadosData = {};
const sanLorenzoTitulosData = [];

// Registro en CLUB_GENERIC_DATA (ver comentario completo en instituto-data.js, Versión 95).
window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.sanlorenzo = {
  revenueLinesByYear: sanLorenzoRevenueLinesByYear, expenseLinesByYear: sanLorenzoExpenseLinesByYear,
  fiscalYearMeta: sanLorenzoFiscalYearMeta, pasesData: sanLorenzoPasesData,
  resultadosData: sanLorenzoResultadosData, titulosData: sanLorenzoTitulosData,
};


Object.assign(sources, {
  'sanlorenzo-memoria-y-balance-2011-12': {
      id:'sanlorenzo-memoria-y-balance-2011-12', clubId:'sanlorenzo',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2011 al 30/6/2012',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (33 páginas, texto nativo, algunas páginas de Anexo rotadas 90°), auditado por Deloitte & Co. S.A. DÉFICIT real 2012: $(45.744.341) ARS. Da el Ejercicio 2012 con detalle completo de Anexo V (Recursos)/Anexo VI (Gastos, por rubro x departamento) y el Ejercicio 2011 como comparativo (revenue con detalle completo, gastos solo a las 7 categorías agregadas del Estado de Recursos y Gastos — el Anexo VI no desglosa el año comparativo). DÉFICIT real 2011: $(41.645.487) ARS. Convertido a USD con $4,4870 (2012, Anexo III, lado Caja y bancos) / $4,11 (2011, aproximación externa MENOS confiable, el Anexo III de este balance no separa claramente su columna comparativa por tipo de cambio). Ver data/sanlorenzo-data.js.',
    },
  'sanlorenzo-memoria-y-balance-2016-17': {
      id:'sanlorenzo-memoria-y-balance-2016-17', clubId:'sanlorenzo',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2016 al 30/6/2017',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (40 páginas, texto nativo con bastante ruido de OCR en esta copia, algunas páginas de Anexo rotadas 90°), auditado por Bertora & Asociados. SUPERÁVIT real: $436.617 ARS (ejercicio de resultado prácticamente en equilibrio, verificado). Detalle completo de Anexo V (Recursos)/Anexo VI (Gastos por rubro x departamento). Convertido a USD con $16,53 (Anexo III, Caja y bancos en USD). Ver data/sanlorenzo-data.js.',
    },
  'sanlorenzo-memoria-y-balance-2015-16': {
      id:'sanlorenzo-memoria-y-balance-2015-16', clubId:'sanlorenzo',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2015 al 30/6/2016',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (37 páginas, texto nativo, algunas páginas de Anexo rotadas 90°), auditado por Bertora & Asociados. SUPERÁVIT real: $33.377.884 ARS — este ejercicio tuvo un resultado financiero POSITIVO ($93.428.003, ganancia neta, no gasto). Detalle completo de Anexo V (Recursos)/Anexo VI (Gastos por rubro x departamento). Convertido a USD con $14,94 (Anexo III, Créditos del Activo Corriente en US$ — la Caja y bancos de este ejercicio solo tenía EUR, no USD). Ver data/sanlorenzo-data.js.',
    },
  'sanlorenzo-memoria-y-balance-2014-15': {
      id:'sanlorenzo-memoria-y-balance-2014-15', clubId:'sanlorenzo',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2014 al 30/6/2015',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (34 páginas, texto nativo, algunas páginas de Anexo rotadas 90°), auditado por Bertora & Asociados. SUPERÁVIT real: $41.968.388 ARS. Detalle completo de Anexo V (Recursos)/Anexo VI (Gastos por rubro x departamento). Convertido a USD con $8,988 (Anexo III, lado Activo/Caja — el Pasivo declara $9,088). Ver data/sanlorenzo-data.js.',
    },
  'sanlorenzo-memoria-y-balance-2012-13': {
      id:'sanlorenzo-memoria-y-balance-2012-13', clubId:'sanlorenzo',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2012 al 30/6/2013',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (34 páginas, texto nativo con bastantes typos de imprenta — comas en vez de puntos como separador de miles en varios números, verificado que es error tipográfico del propio documento sumando las partes contra el total impreso). Auditado por Bertora & Asociados, informe de fecha 20/12/2013, firmado por Matías Lammens como Presidente. SUPERÁVIT real: $32.929.698 ARS. Convertido a USD con $5,355 (lado Activo/Caja del Anexo de moneda extranjera — el Pasivo declara $5,388). Ver data/sanlorenzo-data.js para el detalle completo, incluye una fila "Transporte" del Anexo VI que en realidad es un subtotal de página, no un gasto real (se excluyó).',
    },
  'sanlorenzo-memoria-y-balance-2013-14': {
      id:'sanlorenzo-memoria-y-balance-2013-14', clubId:'sanlorenzo',
      title:'Memoria y Balance (estados contables auditados), Ejercicio 1°/7/2013 al 30/6/2014',
      type:'official_balance_sheet', reliability:'primary',
      note:'PDF oficial (19 páginas, texto nativo), auditado por Bertora & Asociados, informe de fecha 14/1/2015, firmado por Matías Lammens como Presidente. SUPERÁVIT real: $76.628.874 ARS. Este documento específico NO incluye los Anexos V/VI de detalle por rubro (solo el Estado de Recursos y Gastos con 4 categorías agregadas) — se cargó con ese nivel de agregación honesto, sin inventar desglose. Convertido a USD con $8,15 (dólar oficial vendedor BNA de cierre, investigado externamente — este documento no declara su propio tipo de cambio).',
    },
  'sanlorenzo-presupuesto-2023-24': {
      id:'sanlorenzo-presupuesto-2023-24', clubId:'sanlorenzo',
      title:'Presupuesto (caja mensual), Ejercicio 1°/7/2023 al 30/6/2024',
      type:'official_budget', reliability:'primary',
      note:'PDF oficial (1 página, texto nativo pero mal extraído por pdftotext -layout, re-leído de imágenes renderizadas de la página). Presupuesto de CAJA con sección Ordinaria (operación normal) y una sección Extraordinaria de financiamiento/capital que NO se cargó (ver data/sanlorenzo-data.js y `.claude/skills/club-data-mapping/SKILL.md` sección 16). Resultado Ordinario proyectado: $5.947.747.189 ARS. Convertido a USD con $909 (dólar mayorista de cierre 30/6/2024, investigado externamente, mismo valor usado en Instituto/Independiente/Racing para la misma fecha — este documento no declara tipo de cambio propio).',
    },
});

gestionesByClub.sanlorenzo = {
    // Confirmado por búsqueda (Versión 95): Matías Lammens presidente provisional desde 1°/9/2012,
    // electo formalmente 14/12/2013, reelecto 17/12/2016, hasta 2019 — cubre ambos ejercicios
    // cargados (2013, 2014).
    // Carlos Abdo, presidente hasta su renuncia en agosto de 2012 (confirmado por búsqueda) — cubre
    // los Ejercicios 2011 y 2012 (ambos cierran 30/6, antes de la renuncia).
    abdo: { nombre:'Abdo (hasta 2012)', firstYear:2011, lastYear:2012 },
    lammens: { nombre:'Lammens (2012-2019)', firstYear:2013, lastYear:2014 },
    // Tinelli sucedió a Lammens en 2019, presidió hasta el 26/12/2023 (derrotado en la elección de
    // dic-2023) — NO tiene entrada propia acá porque ningún ejercicio cargado queda atribuido
    // enteramente a su gestión (el único ejercicio de este rango, 2024, se atribuyó a Moretti, ver
    // abajo); agregar su entrada si en el futuro se carga un ejercicio 100% suyo (2020-2023).
    // Moretti electo 17/12/2023, asumió 26/12/2023. El Ejercicio 2023/2024 (jul-jun) quedó dividido
    // casi exactamente a la mitad entre Tinelli y Moretti — se usó Moretti (a cargo al cierre
    // 30/6/2024, mismo criterio que Berlanga/Belloso/Verón en otros clubes), con la duda anotada en
    // dudas-por-club.md por lo pareja que fue la división de meses.
    moretti: { nombre:'Moretti (2023-actual)', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.sanlorenzo = 89700; // ~89.717 socios (Wikipedia, 2026)

