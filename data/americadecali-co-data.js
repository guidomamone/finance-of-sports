// ============================================================================
// data/americadecali-co-data.js — América de Cali S.A. En Reorganización
// (Cali, Colombia). clubId lleva el país al final (`americadecali-co`, ver
// Admin/CONVENCIONES.md) porque "América" es un nombre que se repite entre
// países. Ejercicio 2025 = REAL, único ejercicio cargado a propósito (mismo
// criterio que Envigado/Once Caldas: ampliar clubes, no profundizar uno
// todavía).
//
// FUENTE: `Clubes/Colombia/America de Cali/estados-financieros-2025.pdf` (40
// páginas, "Asamblea Ordinaria de Accionistas 2025-2024", Estado Individual de
// Situación Financiera + Estado Individual de Resultados y Otros Resultados
// Integrales + notas), texto nativo vía pdftotext -layout, transcripción
// completa en `estados-financieros-2025.md` en la misma carpeta. Bajado vía
// SIIS (siis.ia.supersociedades.gov.co, NIT 890305773), ver
// `fuentes/Colombia/America de Cali.md`.
//
// OJO — el club está formalmente "en reorganización" (Ley 1116) desde
// 2014-2015. Esto no cambió la estructura del Estado de Resultados (sigue
// siendo un P&L ordinario, sin secciones de "Ordinario"/"Extraordinario" como
// el presupuesto de caja de San Lorenzo, ver club-data-mapping SKILL.md
// sección 16) — el único efecto visible es un pasivo "Pasivos acuerdo de
// Reorganizacion" en el Estado de Situación Financiera (no cargado, no es
// parte del P&L) y un patrimonio con "Adopción Por Primera Vez" negativo.
//
// Cifras del documento "Expresado en miles de pesos colombianos" (confirmado
// en el encabezado de las 3 tablas primarias). Acá se guardan divididas por
// 1.000, en MILLONES de pesos colombianos (COP), mismo criterio que el resto
// del sitio.
//
// TRANSCRIPCIÓN GARBLED: el PDF tiene un problema real de renderizado (texto
// duplicado y notas superpuestas visualmente, pdftotext -layout mezcla
// columnas de notas distintas en la misma zona de la página) — no es un
// escaneo, es texto nativo, pero con las tablas de Notas 19-25 renderizadas
// unas sobre otras. Se reconstruyó cada nota SUMANDO sus líneas y
// verificando contra el subtotal impreso en el Estado de Resultados (ver
// cifras exactas abajo), no leyendo la tabla de una sola pasada.
//
// ESTADO DE RESULTADOS (pág. 4 del PDF, miles de COP, cifras 2025):
//   Ingresos por Actividades Ordinarias ......... 96.390.192
//   Costos Deportivos ............................ (89.531.930)
//   Costo de Ventas .............................. (6.678.102)
//   Utilidad Bruta ................................ 180.160
//   Otros ingresos operacionales .................. 841.136
//   Gasto de administración ...................... (3.838.594)
//   Gasto de ventas .............................. (1.593.440)
//   Otros Gastos .................................. (2.679.146)
//   Utilidad Operacional .......................... (7.089.884)
//   Ingresos Financieros ........................... 212.166
//   Gastos Financieros ........................... (4.451.612)
//   Utilidad antes de impuestos .................. (11.329.330)
//   Impuesto de Renta Diferido ..................... 297.250 (gasto)
//   Impuesto de Renta .............................. 271.895 (gasto)
//   Beneficio después de impuestos / Resultado Neto (11.898.474)
// Reconciliado línea por línea con node antes de cargar: Revenue
// (Ingresos actividades ordinarias + Otros ingresos operacionales =
// 97.231.328) - Expenses (Costo Ventas + Costos Deportivos + Gasto admin +
// Gasto ventas + Otros Gastos = 104.321.212) = -7.089.884, EXACTO igual a
// Utilidad Operacional impresa. + netInterest (-4.239.446) = -11.329.330,
// EXACTO igual a Utilidad antes de impuestos impresa. - tax (569.145) =
// -11.898.475 ≈ -11.898.474 impreso (diferencia de $1 mil, redondeo del
// propio documento).
//
// REVENUE: Nota 19 "Ingresos de Actividades Ordinarias" (14 líneas incl.
// devoluciones, suma exacta salvo $1 mil de redondeo) + Nota 20 "Otros
// ingresos operacionales" (5 líneas, suma EXACTA a $841.136 M, verificado).
//
// EXPENSES: Nota 23 "Costos deportivos" (15 líneas, suma EXACTA a $89.531.930
// M impreso — promovida por sub-categoría real: Gastos de personal
// (wages_squad), Administración del plantel (admin_general_expense),
// Organización y logística (match_organisation_expense), Depreciaciones,
// Amortizaciones y Derechos deportivos (estos 2 últimos a player_amortisation:
// el documento explica que la amortización de derechos deportivos —pases— es
// lineal por la duración del convenio, y "Derechos deportivos" es el costo de
// adquisición/participación de terceros en transferencias — ver duda en el
// reporte de esta sesión), Diversos), Nota 21 "Gasto de administración"
// (agrupada, con Depreciaciones y Amortizaciones separadas, suma EXACTA a
// $3.838.594 M), Nota 22 "Gasto de ventas" (5 líneas confirmadas + 1 residuo
// de $346.071 M para 2025 que la transcripción garbled no permitió desglosar
// línea por línea — el TOTAL de la nota SÍ está confirmado exacto contra el
// Estado de Resultados, $1.593.440 M, ver duda en el reporte), Nota 24 "Otros
// Gastos" (5 líneas, suma EXACTA a $2.679.146 M), Costo de Ventas (línea
// única, $6.678.102 M, sin nota de desglose en el documento).
//
// netInterest = Nota 25 "Ingresos y costos financieros": Ingresos Financieros
// (Intereses+Rendimientos Financieros+Diferencia en Cambio+Otros = $212.166 M,
// EXACTO) - Gastos Financieros (Gastos bancarios+Comisiones+Comisiones
// Factoring+Intereses+Diferencia en cambio = $4.451.612 M, EXACTO) =
// -4.239.446 M, EXACTO igual al "Total Costos Financieros" impreso.
//
// tax = Impuesto de Renta Diferido (297.250) + Impuesto de Renta (271.895) =
// 569.145 (gasto), EXACTO igual a los 2 renglones impresos por separado.
// ============================================================================

const americadecalicoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingreso venta de boletería', normalizedCategory:'matchday_competition', amountNative:20397.872, disclosureLevel:'detailed' },
    { rawLabel:'Derechos Deportivos', normalizedCategory:'player_sales', amountNative:21564.695, disclosureLevel:'detailed' },
    { rawLabel:'Utilidad en venta Derechos Deportivos', normalizedCategory:'player_sales', amountNative:8687.472, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:15760.765, disclosureLevel:'detailed' },
    { rawLabel:'Derechos TV Dimayor', normalizedCategory:'broadcasting', amountNative:6192.158, disclosureLevel:'detailed' },
    { rawLabel:'Auxilios Dimayor', normalizedCategory:'broadcasting', amountNative:2808.468, disclosureLevel:'detailed' },
    { rawLabel:'Academias', normalizedCategory:'youth_football', amountNative:814.294, disclosureLevel:'detailed' },
    { rawLabel:'Transporte de mercancía', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Participación Eventos', normalizedCategory:'competition_bonus', amountNative:10530.040, disclosureLevel:'detailed' },
    { rawLabel:'Ventas Gravadas y Excluidas', normalizedCategory:'other_income', amountNative:10291.303, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Conexos', normalizedCategory:'other_income', amountNative:85.339, disclosureLevel:'detailed' },
    { rawLabel:'Auxilio de Infraestructura', normalizedCategory:'other_income', amountNative:62.940, disclosureLevel:'detailed' },
    { rawLabel:'Ingreso mecanismo de solidaridad', normalizedCategory:'player_sales', amountNative:257.227, disclosureLevel:'detailed' },
    { rawLabel:'Menos: Devoluciones', normalizedCategory:'other_income', amountNative:-1062.380, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos operacionales (servicios, utilidad en venta de PP&E, recuperaciones, devoluciones, diversos)', normalizedCategory:'other_income', amountNative:841.136, disclosureLevel:'detailed', items:[
      ['Servicios', 45.429], ['Utilidad en venta de propiedad, planta y equipo', 20.000], ['Recuperaciones costos y gastos', 477.085], ['Devoluciones', -1.879], ['Diversos', 300.501],
    ]},
  ],
};

const americadecalicoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Costo de Ventas', normalizedCategory:'other_expenses', amountNative:-6678.102, disclosureLevel:'detailed' },
    // Nota 23 "Costos deportivos" ($89.531.930 M impreso), promovida por sub-categoría real:
    { rawLabel:'Costos deportivos: Gastos de personal (plantel)', normalizedCategory:'wages_squad', amountNative:-33897.003, disclosureLevel:'detailed' },
    { rawLabel:'Costos deportivos: Administración del plantel (honorarios, impuestos, contribuciones, seguros, legales)', normalizedCategory:'admin_general_expense', amountNative:-4276.834, disclosureLevel:'detailed', items:[
      ['Honorarios', -189.462], ['Impuestos', -3436.829], ['Contribuciones y afiliaciones', -525.900], ['Seguros', -94.767], ['Gastos legales', -29.876],
    ]},
    { rawLabel:'Costos deportivos: Organización y logística (arrendamientos, servicios, mantenimiento, adecuación, viajes)', normalizedCategory:'match_organisation_expense', amountNative:-6532.411, disclosureLevel:'detailed', items:[
      ['Arrendamientos', -1145.596], ['Servicios', -1235.901], ['Mantenimiento y reparaciones', -198.667], ['Adecuación e instalación', -63.602], ['Gastos de viaje', -3888.645],
    ]},
    { rawLabel:'Costos deportivos: Depreciaciones', normalizedCategory:'depreciation', amountNative:-392.482, disclosureLevel:'detailed' },
    { rawLabel:'Costos deportivos: Amortizaciones (derechos deportivos)', normalizedCategory:'player_amortisation', amountNative:-16614.604, disclosureLevel:'detailed' },
    { rawLabel:'Costos deportivos: Derechos deportivos', normalizedCategory:'player_amortisation', amountNative:-19144.126, disclosureLevel:'detailed' },
    { rawLabel:'Costos deportivos: Diversos', normalizedCategory:'other_expenses', amountNative:-8674.470, disclosureLevel:'detailed' },
    // Nota 21 "Gasto de administración" ($3.838.594 M impreso):
    { rawLabel:'Gasto de administración (personal, honorarios, impuestos, arrendamientos, contribuciones, seguros, legales, servicios, mantenimiento, adecuación, viajes, diversos)', normalizedCategory:'admin_general_expense', amountNative:-3670.709, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de administración: Depreciaciones', normalizedCategory:'depreciation', amountNative:-149.035, disclosureLevel:'detailed' },
    { rawLabel:'Gasto de administración: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-18.850, disclosureLevel:'detailed' },
    // Nota 22 "Gasto de ventas" ($1.593.440 M impreso, total confirmado exacto; 5 de sus líneas
    // se pudieron confirmar individualmente en la transcripción garbled, el resto queda como
    // residuo — ver el reporte de esta sesión de onboarding):
    { rawLabel:'Gasto de ventas (personal, honorarios, impuestos, arrendamientos, contribuciones, y otros no desglosados individualmente en la transcripción)', normalizedCategory:'admin_general_expense', amountNative:-1593.440, disclosureLevel:'detailed', items:[
      ['Gastos de personal', -657.334], ['Honorarios', -58.500], ['Impuestos', -85.801], ['Arrendamientos', -445.262], ['Contribuciones y afiliaciones', -0.472], ['Otros gastos de ventas (deterioro, seguros, servicios, legales, mantenimiento, viajes, depreciaciones, amortizaciones, diversos — no desglosados individualmente por solapamiento de notas en la transcripción)', -346.071],
    ]},
    // Nota 24 "Otros Gastos" ($2.679.146 M impreso):
    { rawLabel:'Otros Gastos (pérdida en venta y retiro de bienes, gastos extraordinarios, gravamen movimiento financiero, gastos diversos, deterioro)', normalizedCategory:'other_expenses', amountNative:-2679.146, disclosureLevel:'detailed', items:[
      ['Perdida en venta y retiro de bienes', 0], ['Gastos Extraordinarios', -716.294], ['Gravamen movimiento financiero', -387.880], ['Gastos Diversos', -1487.151], ['Deterioro', -87.821],
    ]},
  ],
};

const americadecalicoFiscalYearMeta = {
  2025: {
    // TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
    // cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio
    // (sin Anexo de "activos y pasivos en moneda extranjera"), mismo caso que Envigado/Once Caldas.
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'americadecali-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Nota 25: Ingresos Financieros (212.166) - Gastos Financieros (4.451.612), EXACTO igual al
    // "Total Costos Financieros" impreso en el Estado de Resultados.
    netInterest:-4239.446,
    // Impuesto de Renta Diferido (297.250) + Impuesto de Renta (271.895), EXACTO igual a los 2
    // renglones impresos por separado en el Estado de Resultados.
    tax:-569.145,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Obligaciones Financieras corriente (4.755,842) + no corriente (7.080,129), del
    // Estado Individual de Situación Financiera. cash = Efectivo y equivalentes del efectivo.
    grossDebt:11835.971, cash:870.325,
    officialTotalRevenue:97231.328, officialTotalExpenses:104321.212, officialPAT:-11898.474,
  },
};

const americadecalicoPresupuestoOverlayByYear = {};

const americadecalicoPasesData = [];
const americadecalicoResultadosData = {};
const americadecalicoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['americadecali-co'] = {
  revenueLinesByYear: americadecalicoRevenueLinesByYear, expenseLinesByYear: americadecalicoExpenseLinesByYear,
  fiscalYearMeta: americadecalicoFiscalYearMeta, pasesData: americadecalicoPasesData,
  resultadosData: americadecalicoResultadosData, titulosData: americadecalicoTitulosData,
  presupuestoOverlayByYear: americadecalicoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'americadecali-co-estados-financieros-2025': {
      id:'americadecali-co-estados-financieros-2025', clubId:'americadecali-co',
      title:'Estado Individual de Situación Financiera y Estado Individual de Resultados y Otros Resultados Integrales, al 31 de diciembre de 2025 y 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890305773). Texto nativo (pdftotext -layout), pero las tablas de Notas 19-25 se renderizan superpuestas/duplicadas en el PDF (no es un escaneo, es un artefacto de layout) — se reconstruyó cada nota sumando sus líneas y verificando contra el subtotal impreso en el Estado de Resultados antes de cargar, ver comentario de cabecera de data/americadecali-co-data.js. El club está formalmente "en reorganización" (Ley 1116) desde 2014-2015, pero esto no altera la estructura del Estado de Resultados. Transcripción completa en Clubes/Colombia/America de Cali/estados-financieros-2025.md.',
    },
});

gestionesByClub['americadecali-co'] = {
  actual: { nombre:'Marcela Gómez Giraldo (Representante Legal)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['americadecali-co'] = null;
