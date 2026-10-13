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
    { rawLabel:'Costo de servicios: Gastos por beneficios a empleados', normalizedCategory:'wages_squad', amountNative:-62879.804, disclosureLevel:'detailed' },
    { rawLabel:'Costo de servicios: transferencias de jugadores (participación en negociaciones, intermediación, préstamos, mecanismo de solidaridad, derechos de formación)', normalizedCategory:'player_amortisation', amountNative:-31573.684, disclosureLevel:'detailed', items:[
      ['Participación venta derechos deportivos', -14279.869], ['Intermediación transferencia jugadores', -6853.749], ['Amortización Intangibles', -6073.556], ['Prestamos jugadores', -2742.270], ['Mecanismo de solidaridad', -1221.521], ['Derechos deportivos de formación', -402.719],
    ]},
    { rawLabel:'Costo de servicios: organización y logística (viajes, concentración, boletería y control estadio, obligaciones disciplinarias, participación en torneos, árbitros, implementos, inscripciones, abonos)', normalizedCategory:'match_organisation_expense', amountNative:-15436.630, disclosureLevel:'detailed', items:[
      ['Gastos de viaje', -4958.222], ['Gastos para concentración', -4758.206], ['Gastos boletería y control estadio', -2493.328], ['Obligaciones disciplinarias a torneos', -1042.624], ['Participación en torneos', -775.187], ['Árbitros y jueces', -501.653], ['Implementos entreno y fisioterapia', -227.150], ['Inscripciones y torneos', -129.209], ['Ingreso y recarga de abonos', -551.051],
    ]},
    { rawLabel:'Costo de servicios: Convenios deportivos (formación de jugadores con clubes formadores)', normalizedCategory:'youth_other_sports_expense', amountNative:-1304.280, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de ventas (servicios, impuestos asumidos, arrendamientos, honorarios, seguros, taxis y buses, combustibles, fotografía, legales, contribuciones, adecuación, deterioro cartera, provisión inventarios, otros)', normalizedCategory:'admin_general_expense', amountNative:-40982.996, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de ventas: Depreciación Derechos de Uso y Depreciaciones', normalizedCategory:'depreciation', amountNative:-2524.064, disclosureLevel:'detailed' },
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
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'atlnacional-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-2306.129,
    tax:-186.910,
    profitOnPlayerSales:0, assetSales:0,
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
