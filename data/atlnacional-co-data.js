// ============================================================================
// data/atlnacional-co-data.js — Atlético Nacional S.A. (Medellín, Colombia).
// clubId lleva el país al final (`atlnacional-co`) por la convención de
// Admin/CONVENCIONES.md. Ejercicio 2025 = REAL, único ejercicio cargado a
// propósito (mismo criterio que Envigado/Once Caldas).
//
// FUENTE: `Clubes/Colombia/Atletico Nacional/estados-financieros-2025.pdf`
// (57 páginas, "Notas a los estados financieros, 31 de diciembre de 2025 y
// 2024", auditado por Baker Tilly Colombia), texto nativo vía pdftotext
// -layout, transcripción completa en `estados-financieros-2025.md` en la
// misma carpeta. Bajado vía SIIS (siis.ia.supersociedades.gov.co, NIT
// 900464187), ver `fuentes/Colombia/Atletico Nacional.md`.
//
// OJO — este PDF (a diferencia de América de Cali) son solo las NOTAS a los
// estados financieros, no incluye el Estado de Resultado Integral primario
// como tabla aparte. Se reconstruyó igual con altísima confianza: la Nota 14
// (Impuestos a las ganancias, "Conciliación de la tasa efectiva") imprime
// LITERALMENTE "Utilidad (Pérdida) contable Antes de Impuestos: 7.162.607"
// para 2025 — EXACTO igual a la suma independiente Revenue-Expenses+
// netInterest calculada desde las notas de ingresos/gastos (ver abajo), lo
// que confirma la reconstrucción completa sin ningún residuo/plug.
//
// Cifras del documento "Expresado en miles de pesos colombianos" (confirmado
// en el encabezado). Acá se guardan divididas por 1.000, en MILLONES de
// pesos colombianos (COP).
//
// REVENUE = Nota 22 "Ingresos de actividades ordinarias" (9 líneas, suma
// EXACTA a $191.200.128 M, coincide con la vista SIIS) + el bloque "Otros
// ingresos" de la Nota "Costo financiero, neto" (7 líneas: Otros,
// Recuperación provisiones, Ingreso por aprovechamientos, Recuperación
// deterioro cartera, Recuperación deterioro inventario, Subvenciones,
// Recuperación provisión contingencia — suma EXACTA a $5.683.902 M). Estas 2
// notas de "resultado financiero/otros" (una con recuperaciones/multas no
// financieras, otra con Ingresos financieros/Gastos financieros propiamente
// dichos) aparecen en el documento bajo títulos de nota que no calzan 1:1 con
// su contenido (posible desplazamiento de encabezado entre páginas) — se
// identificaron por el CONTENIDO de cada tabla, no por el número de nota
// impreso. officialTotalRevenue = 191.200.128 + 5.683.902 = 196.884.030.
//
// EXPENSES: Nota 23 "Costo de ventas" ($16.759.263 M, costo de mercancía
// deportiva no producida por la Sociedad), Nota 24 "Costo de servicios"
// ($111.194.398 M, el bolsón más grande — costos del plantel/fútbol
// profesional, 17 líneas, promovida por sub-categoría real: Gastos por
// beneficios a empleados → wages_squad; Participación venta derechos
// deportivos + Intermediación transferencia jugadores + Prestamos jugadores +
// Mecanismo de solidaridad + Derechos deportivos de formación →
// player_amortisation; Gastos de viaje + Gastos para concentración + Gastos
// boletería y control estadio + Obligaciones disciplinarias + Participación
// en torneos + Árbitros y jueces + Implementos entreno y fisioterapia +
// Inscripciones y torneos + Ingreso y recarga de abonos →
// match_organisation_expense; Convenios deportivos → youth_other_sports_expense
// — suma EXACTA), Nota 25 "Gastos de ventas" ($43.507.060 M, con Depreciación
// Derechos de Uso + Depreciaciones separadas a depreciation, el resto
// admin_general_expense), Nota 26 "Gastos de administración" ($13.219.310 M,
// con Depreciaciones de equipo → depreciation y Amortización de intangibles →
// other_amortisation separadas, el resto admin_general_expense), y el bloque
// "Otros egresos" (Multas y sanciones, Donaciones, Retenciones asumidas,
// Pérdida en venta de equipo, Otros, Impuestos asumidos → other_expenses,
// suma EXACTA a $2.735.263 M). officialTotalExpenses = 16.759.263+111.194.398+
// 43.507.060+13.219.310+2.735.263 = 187.415.294.
//
// netInterest = "Ingresos financieros" (Diferencia en cambio+Otros+Intereses
// recibidos = $3.683.829 M) - "Gastos financieros" (Diferencia en cambio+
// Intereses+Gravamen+Comisiones+Gastos bancarios+Otros-Intereses Derechos de
// uso = $5.989.958 M) = -2.306.129 M, EXACTO igual al total impreso al final
// de esa tabla.
//
// tax: la Nota 14 confirma "Total gasto por impuesto a las ganancias:
// 186.910" (2025) = Gasto impuesto de renta corriente (182.452) + Gasto por
// impuesto diferido (4.458). PAT check: pretax (7.162.607) - tax (186.910) =
// 6.975.697, ≈ vista SIIS ($6.975.695 M, diferencia de $2 mil por redondeo
// del propio documento en distintas tablas) — se usa el valor de la vista
// SIIS como officialPAT por ser la referencia cruzada independiente.
// ============================================================================

const atlnacionalcoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Taquillas nacionales', normalizedCategory:'matchday_competition', amountNative:59883.937, disclosureLevel:'detailed' },
    { rawLabel:'Tiendas Verdes', normalizedCategory:'sponsorship_commercial', amountNative:26743.576, disclosureLevel:'detailed' },
    { rawLabel:'Participaciones (torneos nacionales e internacionales, principalmente Copa Conmebol Libertadores fase de octavos)', normalizedCategory:'competition_bonus', amountNative:25255.188, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y regalías', normalizedCategory:'sponsorship_commercial', amountNative:21529.956, disclosureLevel:'detailed' },
    { rawLabel:'Derechos deportivos (transferencias de jugadores a otros clubes)', normalizedCategory:'player_sales', amountNative:20325.979, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinios', normalizedCategory:'sponsorship_commercial', amountNative:16639.222, disclosureLevel:'detailed' },
    { rawLabel:'Taquillas internacionales', normalizedCategory:'matchday_competition', amountNative:12688.862, disclosureLevel:'detailed' },
    { rawLabel:'Televisión', normalizedCategory:'broadcasting', amountNative:6396.712, disclosureLevel:'detailed' },
    { rawLabel:'Escuela', normalizedCategory:'youth_football', amountNative:1736.696, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (reintegro costos y gastos Dimayor, recuperación provisiones, ingreso por aprovechamientos, recuperación deterioro cartera e inventario, subvenciones, recuperación provisión contingencia)', normalizedCategory:'other_income', amountNative:5683.902, disclosureLevel:'detailed', items:[
      ['Otros (reintegro de costos y gastos Dimayor)', 3319.423], ['Recuperación provisiones', 934.917], ['Ingreso por aprovechamientos', 642.502], ['Recuperación deterioro cartera', 537.421], ['Recuperación deterioro inventario', 171.546], ['Subvenciones', 78.093], ['Recuperación provisión contingencia', 0],
    ]},
  ],
};

const atlnacionalcoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Costo de ventas (artículos deportivos no producidos en la Sociedad)', normalizedCategory:'other_expenses', amountNative:-16759.263, disclosureLevel:'detailed' },
    // Nota 24 "Costo de servicios" ($111.194.398 M impreso), promovida por sub-categoría real:
    { rawLabel:'Costo de servicios: Gastos por beneficios a empleados', normalizedCategory:'wages_squad', amountNative:-62879.804, disclosureLevel:'detailed' },
    { rawLabel:'Costo de servicios: transferencias de jugadores (participación en negociaciones, intermediación, préstamos, mecanismo de solidaridad, derechos de formación)', normalizedCategory:'player_amortisation', amountNative:-31573.684, disclosureLevel:'detailed', items:[
      ['Participación venta derechos deportivos', -14279.869], ['Intermediación transferencia jugadores', -6853.749], ['Amortización Intangibles', -6073.556], ['Prestamos jugadores', -2742.270], ['Mecanismo de solidaridad', -1221.521], ['Derechos deportivos de formación', -402.719],
    ]},
    { rawLabel:'Costo de servicios: organización y logística (viajes, concentración, boletería y control estadio, obligaciones disciplinarias, participación en torneos, árbitros, implementos, inscripciones, abonos)', normalizedCategory:'match_organisation_expense', amountNative:-15436.630, disclosureLevel:'detailed', items:[
      ['Gastos de viaje', -4958.222], ['Gastos para concentración', -4758.206], ['Gastos boletería y control estadio', -2493.328], ['Obligaciones disciplinarias a torneos', -1042.624], ['Participación en torneos', -775.187], ['Árbitros y jueces', -501.653], ['Implementos entreno y fisioterapia', -227.150], ['Inscripciones y torneos', -129.209], ['Ingreso y recarga de abonos', -551.051],
    ]},
    { rawLabel:'Costo de servicios: Convenios deportivos (formación de jugadores con clubes formadores)', normalizedCategory:'youth_other_sports_expense', amountNative:-1304.280, disclosureLevel:'detailed' },
    // Nota 25 "Gastos de ventas" ($43.507.060 M impreso):
    { rawLabel:'Gastos de ventas (servicios, impuestos asumidos, arrendamientos, honorarios, seguros, taxis y buses, combustibles, fotografía, legales, contribuciones, adecuación, deterioro cartera, provisión inventarios, otros)', normalizedCategory:'admin_general_expense', amountNative:-40982.996, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de ventas: Depreciación Derechos de Uso y Depreciaciones', normalizedCategory:'depreciation', amountNative:-2524.064, disclosureLevel:'detailed' },
    // Nota 26 "Gastos de administración" ($13.219.310 M impreso):
    { rawLabel:'Gastos de administración (personal, honorarios, servicios, otros, impuestos, arrendamientos, mantenimiento, viajes, seguros, contribuciones, legales, adecuación, contingencias)', normalizedCategory:'admin_general_expense', amountNative:-12958.197, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración: Depreciaciones de equipo', normalizedCategory:'depreciation', amountNative:-170.016, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de administración: Amortización de intangibles', normalizedCategory:'other_amortisation', amountNative:-91.097, disclosureLevel:'detailed' },
    { rawLabel:'Otros egresos (multas y sanciones, donaciones, retenciones asumidas, pérdida en venta de equipo, impuestos asumidos, otros)', normalizedCategory:'other_expenses', amountNative:-2735.263, disclosureLevel:'detailed', items:[
      ['Multas y sanciones', -2327.218], ['Donaciones', -145.058], ['Retenciones asumidas', -125.015], ['Pérdida en venta de equipo', -77.381], ['Otros', -35.232], ['Impuestos asumidos', -25.359],
    ]},
  ],
};

const atlnacionalcoFiscalYearMeta = {
  2025: {
    // TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
    // cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio de
    // cierre para todo el balance (solo montos puntuales en USD dentro de notas narrativas, ej.
    // ingresos de Copa Libertadores), mismo caso que Envigado/Once Caldas.
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'atlnacional-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos financieros (3.683.829) - Gastos financieros (5.989.958), EXACTO igual al total
    // impreso al final de esa tabla (Diferencia en cambio+Intereses+Gravamen+Comisiones+Gastos
    // bancarios+Otros-Intereses Derechos de uso).
    netInterest:-2306.129,
    // Gasto impuesto de renta corriente (182.452) + Gasto por impuesto diferido (4.458), EXACTO
    // igual al "Total gasto por impuesto a las ganancias" impreso en la Nota 14.
    tax:-186.910,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = "Obligaciones financieras" (Nota 15, corriente 13.869,434 + no corriente
    // 2.078,851). cash = "La Sociedad mantenía efectivo y equivalentes al efectivo por
    // $17.130.558" (Nota, texto narrativo, no tabla).
    grossDebt:15948.285, cash:17130.558,
    officialTotalRevenue:196884.030, officialTotalExpenses:187415.294, officialPAT:6975.695,
  },
};

const atlnacionalcoPresupuestoOverlayByYear = {};

const atlnacionalcoPasesData = [];
const atlnacionalcoResultadosData = {};
const atlnacionalcoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['atlnacional-co'] = {
  revenueLinesByYear: atlnacionalcoRevenueLinesByYear, expenseLinesByYear: atlnacionalcoExpenseLinesByYear,
  fiscalYearMeta: atlnacionalcoFiscalYearMeta, pasesData: atlnacionalcoPasesData,
  resultadosData: atlnacionalcoResultadosData, titulosData: atlnacionalcoTitulosData,
  presupuestoOverlayByYear: atlnacionalcoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'atlnacional-co-estados-financieros-2025': {
      id:'atlnacional-co-estados-financieros-2025', clubId:'atlnacional-co',
      title:'Notas a los Estados Financieros, 31 de diciembre de 2025 y 2024 (auditado por Baker Tilly Colombia)',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900464187). El PDF trae solo las notas (texto nativo, sin tabla de Estado de Resultado Integral primaria aparte), pero la Nota 14 (Impuestos a las ganancias) imprime literalmente "Utilidad contable Antes de Impuestos: 7.162.607" para 2025, que reconcilia exacto contra la suma independiente Revenue-Expenses+netInterest calculada desde las notas de ingresos/gastos — sin ningún residuo. 11 registros distintos existen en SIIS bajo este NIT (probablemente un registro por ejercicio); solo se cargó el más reciente (2025) esta sesión. Transcripción completa en Clubes/Colombia/Atletico Nacional/estados-financieros-2025.md.',
    },
});

gestionesByClub['atlnacional-co'] = {
  actual: { nombre:'Sebastián Arango Botero (Representante Legal)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['atlnacional-co'] = null;
