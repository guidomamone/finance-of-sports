// ============================================================================
// data/godoycruz-ar-data.js — Club Deportivo Godoy Cruz Antonio Tomba (Mendoza,
// Asociación Civil). Club nuevo, primer ejercicio cargado: 2019/2020 (Ejercicio
// N° 72, 1°/7/2019 al 30/6/2020), balance real (Estados Contables auditados).
//
// FUENTE: Clubes/Argentina/Godoy Cruz/estados-contables-ejercicio-2019-20.md
// (transcripción OCR Tesseract -l spa --psm 6, páginas 3-4 rotadas 90° antes de
// OCRear, página 2 con --psm 4). "Estado de Recursos y Gastos" en pág. 5-6.
//
// CORRECCIÓN DE OCR (esta sesión): "INGRESO POR PARTIDO AMISTOSO" transcribía
// 13.229.545,00; re-renderizada la pág. 5 a 300dpi y leída a ojo, el valor real
// es 18.229.545,00 (dígito "1" leído como "3" por el OCR). Confirmado porque la
// diferencia (exactamente $5.000.000) cerraba el desajuste contra TOTAL INGRESOS
// impreso. El .md fuente ya se corrigió con el valor verificado.
//
// FILA "TRANSPORTE" (pág. 5-6 del Estado de Recursos y Gastos) NO ES UNA LÍNEA
// DE GASTO REAL: es un subtotal/corte de página mal etiquetado por el OCR (o por
// el layout original del documento). Su valor (271.720.429,49) reconcilia EXACTO
// con la suma de las 13 líneas de gasto que la preceden (GASTOS MANTENIMIENTO
// INST. DEPORTIVAS ... DESCUENTOS EN RECIBOS SOCIALES) — confirmado con cálculo
// exacto. Se excluyó de expenseLines (sumarla habría duplicado esas 13 líneas).
// Ver club-data-mapping SKILL.md sección 10 ("la fila acumulada").
//
// RESULTADOS FINANCIEROS: el documento NO separa "Recursos"/"Gastos" financieros
// en una nota aparte (a diferencia de Vélez/Estudiantes LP) — los presenta como
// líneas ORDINARIAS más, dentro del mismo Estado de Recursos y Gastos:
// "INGRESO POR INTERESES PLAZO FIJO", "INGRESOS FINANCIEROS" (ingreso) e
// "EGRESOS FINANCIEROS" (gasto). Las 3 se sacaron de revenueLines/expenseLines y
// se sumaron netas a fiscalYearMeta[2020].netInterest (club-data-mapping SKILL.md
// sección 2 — nunca como línea, sea cual sea la presentación del documento
// fuente). "INGRESOS FINANCIEROS" es un agregado grande (296,95 M en 2020 vs.
// 131,50 M en 2019) consistente con incluir RECPAM (el documento está en moneda
// homogénea RT6, Nota 1 — mismo criterio que netInterest de Vélez "incluye
// RECPAM").
// netInterest 2020 = 1.385.610,45 (intereses p/fijo) + 296.951.174,48 (ing.
// financieros) - 341.420.775,07 (eg. financieros) = -43.083.990,14.
//
// VERIFICACIÓN (revenueLines + expenseLines + netInterest = SUPERÁVIT DEL
// EJERCICIO impreso, $157.349.541,83): revenueLines suma exacto 614.668.613,84
// (= TOTAL INGRESOS 913.005.398,77 menos los 2 renglones financieros de arriba);
// expenseLines suma exacto 414.235.081,87 (= TOTAL GASTOS ORDINARIOS
// 755.655.856,94 menos EGRESOS FINANCIEROS, menos la fila TRANSPORTE excluida
// por ser subtotal). 614.668.613,84 - 414.235.081,87 - 43.083.990,14 =
// 157.349.541,83 ✓ EXACTO.
//
// CATEGORIZACIÓN — supuestos genuinamente ambiguos, anotados para
// Admin/dudas-por-club.md (no se resolvieron en esta sesión, ver reporte):
//  - "Ingresos Varios AFA" -> other_income (no queda claro si es TV, premios, u
//    otro concepto; ya existe "Ingreso por D° de TV y Transmisión" separado).
//  - "Ingreso Fútbol Amateur" / "Gastos Generales Administración Fútbol
//    Amateur" -> youth_football / youth_other_sports_expense (asumido como
//    categorías inferiores/no profesionales, no confirmado que sea la escuela
//    juvenil propiamente dicha).
//  - "Ingreso por Rescisión de Contrato" e "Ingreso por Derechos de Tanteo" ->
//    player_sales (asumidos como ingresos ligados a jugadores/pases; "derecho de
//    tanteo" es una figura específica del fútbol argentino sin equivalente claro
//    en otros clubes ya cargados).
//  - "Ingreso por Alquiler Instalaciones Deportivas" -> other_income (criterio
//    conservador de stadium_other, sección 1: no dice "estadio" explícitamente).
//  - "Cargas Sociales" (línea de Gastos standalone, sin desglose por sector) ->
//    wages_squad (asumido como cargas del plantel profesional, no confirmado).
//  - "Departamento Médico" -> wages_squad (costo no salarial del plantel
//    profesional, mismo criterio "CASO CONSULTADO" de club-data-mapping sección
//    13 y del precedente de Gimnasia y Esgrima LP, que agrupa médico dentro de
//    Fútbol Profesional -> wages_squad).
//  - "Ingreso Acuerdo Deuda Clubes" -> other_income (acuerdo de deuda entre
//    clubes, naturaleza puntual no confirmada).
//
// TIPO DE CAMBIO: no se encontró Anexo de moneda extranjera con TC de cierre
// propio. fxSource:'market_approx' — dólar oficial minorista/mayorista de
// referencia para el cierre 30/6/2020 no verificado con una fuente puntual del
// día exacto en esta sesión (fuera de alcance); se usó $70,46 (BNA vendedor,
// cotización de referencia pública para esa fecha). Documentado como
// aproximación, no como cifra exacta confirmada — revisar si aparece una fuente
// mejor.
//
// grossDebt/cash: del Estado de Situación Patrimonial (pág. 3). grossDebt =
// Total Pasivo (79.331.256,82 corriente + 1.205.874,85 no corriente =
// 80.537.131,67; el documento no separa "Deudas" de otras categorías de pasivo,
// es la única línea). cash = Caja y Bancos (161.039.723,56).
//
// GESTIÓN: "Mansur, José Eduardo — Presidente" firma el balance (pág. 3-6),
// fuente primaria directa (la propia firma del documento). Sin más info sobre
// el rango de su gestión en esta sesión, se cargó solo para este ejercicio.
// ============================================================================

const godoycruzRevenueLinesByYear = {
  2020: [
    { rawLabel:'Ingresos Varios AFA', normalizedCategory:'other_income', amountNative:16.060122, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Venta Jugadores', normalizedCategory:'player_sales', amountNative:132.526834, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Varios', normalizedCategory:'other_income', amountNative:0.006019, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso Fútbol Amateur', normalizedCategory:'youth_football', amountNative:3.652939, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por D° de TV y Transmisión', normalizedCategory:'broadcasting', amountNative:263.030344, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Publicidad y Sponsorización', normalizedCategory:'sponsorship_commercial', amountNative:30.279651, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso Cuota Sociales', normalizedCategory:'member_dues', amountNative:16.861385, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Cuota Socio Fútbol', normalizedCategory:'member_dues', amountNative:6.621607, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Plus de Actividades', normalizedCategory:'other_income', amountNative:1.954056, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Otras Actividades Club', normalizedCategory:'other_income', amountNative:6.689911, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso Cuotas Colegio', normalizedCategory:'education', amountNative:16.967374, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso Adicionales Instituto', normalizedCategory:'education', amountNative:3.479392, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Aporte DGE (Nota n°28)', normalizedCategory:'education', amountNative:11.611687, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Venta de Entradas', normalizedCategory:'matchday_competition', amountNative:7.697923, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Publicidad Revista', normalizedCategory:'sponsorship_commercial', amountNative:0.288106, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Descuentos Comerciales', normalizedCategory:'other_income', amountNative:0.058276, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Rescisión de Contrato', normalizedCategory:'player_sales', amountNative:2.351826, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Derecho de Formación / Mec. Solidaridad', normalizedCategory:'player_sales', amountNative:1.847878, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Subsidio', normalizedCategory:'other_income', amountNative:0.036858, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso Recupero ART - Seguros', normalizedCategory:'other_income', amountNative:1.453859, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Alquiler Instalaciones Deportivas', normalizedCategory:'other_income', amountNative:1.403526, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Partido Amistoso', normalizedCategory:'matchday_competition', amountNative:18.229545, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso por Derechos de Tanteo', normalizedCategory:'player_sales', amountNative:38.591521, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Ayuda ATP', normalizedCategory:'other_income', amountNative:0.155697, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso Acuerdo Deuda Clubes', normalizedCategory:'other_income', amountNative:32.812278, disclosureLevel:'detailed' },
  ],
};

const godoycruzExpenseLinesByYear = {
  2020: [
    { rawLabel:'Remuneración Plantel', normalizedCategory:'wages_squad', amountNative:-38.406060, disclosureLevel:'detailed' },
    { rawLabel:'Primas y Premios del Plantel', normalizedCategory:'wages_squad', amountNative:-127.472478, disclosureLevel:'detailed' },
    { rawLabel:'Cargas Sociales', normalizedCategory:'wages_squad', amountNative:-22.743992, disclosureLevel:'detailed' },
    { rawLabel:'Costo de Venta Jugadores', normalizedCategory:'player_amortisation', amountNative:-1.021288, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de Solidaridad', normalizedCategory:'player_amortisation', amountNative:-11.125044, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Específicos y de Organización', normalizedCategory:'match_organisation_expense', amountNative:-15.038198, disclosureLevel:'detailed' },
    { rawLabel:'Liga Mendocina de Fútbol', normalizedCategory:'match_organisation_expense', amountNative:-1.362001, disclosureLevel:'detailed' },
    { rawLabel:'AFA - Asociación del Fútbol Argentino', normalizedCategory:'match_organisation_expense', amountNative:-8.873756, disclosureLevel:'detailed' },
    { rawLabel:'FAA - Futbolistas Argentinos', normalizedCategory:'match_organisation_expense', amountNative:-0.134521, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Médico', normalizedCategory:'wages_squad', amountNative:-7.742766, disclosureLevel:'detailed' },
    { rawLabel:'Departamento de Actividades Deportivas', normalizedCategory:'youth_other_sports_expense', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Prestados por DT y PF Inferiores', normalizedCategory:'youth_other_sports_expense', amountNative:-5.823969, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Prestados por DT y PF Infantiles', normalizedCategory:'youth_other_sports_expense', amountNative:-1.718079, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales Administración Fútbol Amateur', normalizedCategory:'youth_other_sports_expense', amountNative:-0.091933, disclosureLevel:'detailed' },
    { rawLabel:'Viáticos Fútbol Amateur Inferiores', normalizedCategory:'youth_other_sports_expense', amountNative:-0.141920, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Prestados Reserva', normalizedCategory:'youth_other_sports_expense', amountNative:-0.645457, disclosureLevel:'detailed' },
    { rawLabel:'Temporada Pileta', normalizedCategory:'youth_other_sports_expense', amountNative:-2.376564, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales de Administración Colegio', normalizedCategory:'education_expense', amountNative:-0.932078, disclosureLevel:'detailed' },
    { rawLabel:'Servicios Prestados Personal Colegio', normalizedCategory:'education_expense', amountNative:-1.559956, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones y Cargas Sociales Colegio', normalizedCategory:'education_expense', amountNative:-22.206506, disclosureLevel:'detailed' },
    { rawLabel:'Deudores Incobrables Colegio', normalizedCategory:'education_expense', amountNative:-1.300694, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Mantenimiento Inst. Deportivas', normalizedCategory:'admin_general_expense', amountNative:-11.043285, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Generales de Administración Fútbol', normalizedCategory:'admin_general_expense', amountNative:-4.768357, disclosureLevel:'detailed' },
    { rawLabel:'Sistemas Informáticos', normalizedCategory:'admin_general_expense', amountNative:-3.395055, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Impositivos', normalizedCategory:'admin_general_expense', amountNative:-0.650512, disclosureLevel:'detailed' },
    { rawLabel:'Impuestos Internos', normalizedCategory:'admin_general_expense', amountNative:-0.144879, disclosureLevel:'detailed' },
    { rawLabel:'Seguros', normalizedCategory:'admin_general_expense', amountNative:-0.301116, disclosureLevel:'detailed' },
    { rawLabel:'Remuneraciones y Cargas Sociales Club', normalizedCategory:'admin_general_expense', amountNative:-30.909864, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Tarjeta de Crédito', normalizedCategory:'admin_general_expense', amountNative:-1.116866, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Varios Administración Club', normalizedCategory:'admin_general_expense', amountNative:-1.903483, disclosureLevel:'detailed' },
    { rawLabel:'Gastos por Juicios Laborales', normalizedCategory:'admin_general_expense', amountNative:-0.998830, disclosureLevel:'detailed' },
    { rawLabel:'Indemnización Empleados', normalizedCategory:'admin_general_expense', amountNative:-0.274431, disclosureLevel:'detailed' },
    { rawLabel:'Departamento Jurídico', normalizedCategory:'admin_general_expense', amountNative:-2.006516, disclosureLevel:'detailed' },
    { rawLabel:'Honorarios Profesionales Club', normalizedCategory:'admin_general_expense', amountNative:-0.340747, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida Retención - Percepción - Ganancia', normalizedCategory:'admin_general_expense', amountNative:-0.430507, disclosureLevel:'detailed' },
    { rawLabel:'Otras Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-7.312084, disclosureLevel:'detailed' },
    { rawLabel:'Otros Gastos Deportivos', normalizedCategory:'other_expenses', amountNative:-54.510741, disclosureLevel:'detailed' },
    { rawLabel:'Otros Gastos de Gestión', normalizedCategory:'other_expenses', amountNative:-10.774997, disclosureLevel:'detailed' },
    { rawLabel:'Descuentos en Recibos Sociales', normalizedCategory:'other_expenses', amountNative:-2.507718, disclosureLevel:'detailed' },
    { rawLabel:'Egreso Obra Club', normalizedCategory:'other_expenses', amountNative:-2.983704, disclosureLevel:'detailed' },
    { rawLabel:'Egreso por Disciplina', normalizedCategory:'other_expenses', amountNative:-4.494090, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Local Indumentaria', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Deudores Incobrables Club', normalizedCategory:'other_expenses', amountNative:-2.440506, disclosureLevel:'detailed' },
    { rawLabel:'Pérdida por Finalización de Contrato', normalizedCategory:'other_expenses', amountNative:-0.209535, disclosureLevel:'detailed' },
  ],
};

const godoycruzFiscalYearMeta = {
  2020: {
    currency:'ARS', fxRef:'ARS@2020-06-30', // ya existía en FX_CLOSE (data/currency-map.js), mismo valor 70.46
    sourceId:'godoycruz-ar-estados-contables-2019-20',
    reportType:'official_balance_sheet',
    gestionId:'mansur',
    netInterest:1.385610 + 296.951174 - 341.420775, // Interés plazo fijo + Ingresos financieros - Egresos financieros (incl. RECPAM, moneda homogénea RT6)
    tax:0, profitOnPlayerSales:0, assetSales:0,
    grossDebt:80.537132, cash:161.039724,
    officialTotalRevenue:614.668614, officialTotalExpenses:414.235082, officialPAT:157.349542,
  },
};

const godoycruzPresupuestoOverlayByYear = {};

const godoycruzPasesData = [];
const godoycruzResultadosData = {};
const godoycruzTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['godoycruz-ar'] = {
  revenueLinesByYear: godoycruzRevenueLinesByYear, expenseLinesByYear: godoycruzExpenseLinesByYear,
  fiscalYearMeta: godoycruzFiscalYearMeta, pasesData: godoycruzPasesData,
  resultadosData: godoycruzResultadosData, titulosData: godoycruzTitulosData,
  presupuestoOverlayByYear: godoycruzPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'godoycruz-ar-estados-contables-2019-20': {
      id:'godoycruz-ar-estados-contables-2019-20', clubId:'godoycruz-ar',
      title:'Estados Contables, Ejercicio N° 72 (1°/7/2019 al 30/6/2020), Club Deportivo Godoy Cruz Antonio Tomba',
      type:'official_balance_sheet', reliability:'primary',
      note:'Estados Contables auditados (legalizados por el CPCE Mendoza el 14/10/2020). Transcripción completa (OCR) en Clubes/Argentina/Godoy Cruz/estados-contables-ejercicio-2019-20.md. La fila "Transporte" del Estado de Recursos y Gastos es un subtotal de página mal etiquetado, no una línea de gasto real — ver comentario de cabecera de godoycruz-ar-data.js. Tipo de cambio aproximado (no declarado por el documento).',
    },
});

gestionesByClub['godoycruz-ar'] = {
  mansur: { nombre:'Mansur (firma el balance 2019/2020)', firstYear:2020, lastYear:2020 },
};

memberCountByClub['godoycruz-ar'] = null;
