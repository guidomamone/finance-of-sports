const viborgdkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Nettoomsætning (recaudación de entradas, TV y comercial combinados, sin desglose numérico en la fuente)', normalizedCategory:'lump_football_operations', amountNative:75.989957, disclosureLevel:'aggregated' },
    { rawLabel:'Andre driftsindtægter (resultado neto de transferencias — ingresos de transfer menos costos de transfer — más ganancia/pérdida neta por venta de activos fijos; venta de Anton Gaaei, Elias Achouri, Alassana Jatta, Jacob Friis, entre otros)', normalizedCategory:'player_sales', amountNative:56.705954, disclosureLevel:'aggregated' },
  ],
};

const viborgdkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Vareforbrug (costo de mercadería + costos de cesión/préstamo de jugadores, mezclados sin separar)', normalizedCategory:'other_expenses', amountNative:-32.365378, disclosureLevel:'aggregated' },
    { rawLabel:'Andre eksterne omkostninger (ventas, vehículos, locales, administración, deudores incobrables)', normalizedCategory:'admin_general_expense', amountNative:-7.242746, disclosureLevel:'aggregated' },
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-52.095551, disclosureLevel:'detailed', items:[
      ['Lønninger', 44.094465], ['Pensioner', 4.048080], ['Andre omkostninger til social sikring', 0.300549], ['Andre personaleomkostninger', 3.652457],
    ]},
    { rawLabel:'Afskrivninger af erhvervede rettigheder (amortización de pases, Note 5)', normalizedCategory:'player_amortisation', amountNative:-9.911410, disclosureLevel:'detailed' },
    { rawLabel:'Afskrivninger på materielle anlægsaktiver (bienes de uso: terrenos/edificios, mejoras a locales alquilados, equipamiento, Note 6)', normalizedCategory:'depreciation', amountNative:-2.147957, disclosureLevel:'detailed', items:[
      ['Afskrivning på grunde og bygninger', 0.010732], ['Afskrivning på indretning af lejede lokaler', 1.183333], ['Afskrivning på andre anlæg, driftsmateriel og inventar', 0.953892],
    ]},
    { rawLabel:'Andre driftsomkostninger (sin monto propio identificable para separar de other_expenses)', normalizedCategory:'other_expenses', amountNative:-1.263649, disclosureLevel:'aggregated' },
  ],
};

const viborgdkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-06-30',
    sourceId:'viborg-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:1.514793,
    tax:-6.420082,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:29.385639, cash:30.026932,
    officialTotalRevenue:132.695911, officialTotalExpenses:105.026691, officialPAT:22.763931,
  },
};

const viborgdkPresupuestoOverlayByYear = {};

const viborgdkPasesData = [];
const viborgdkResultadosData = {};
const viborgdkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['viborg-dk'] = {
  revenueLinesByYear: viborgdkRevenueLinesByYear, expenseLinesByYear: viborgdkExpenseLinesByYear,
  fiscalYearMeta: viborgdkFiscalYearMeta, pasesData: viborgdkPasesData,
  resultadosData: viborgdkResultadosData, titulosData: viborgdkTitulosData,
  presupuestoOverlayByYear: viborgdkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'viborg-aarsrapport-2024': {
      id:'viborg-aarsrapport-2024', clubId:'viborg-dk',
      title:'Viborg F.F. Prof. Fodbold A/S — Årsrapport for regnskabsåret 01.07.23 - 30.06.24',
      type:'official_balance_sheet', reliability:'primary',
      note:'Auditado por Beierholm (Statsautoriseret Revisionspartnerselskab), sin salvedades. CVR 83 07 37 13. Tipo de cambio DKK/USD del cierre (6,9664) es una aproximación de mercado (cruce BCE EUR/DKK × EUR/USD del 28/6/2024, viernes hábil más cercano al 30/6), no declarada por el propio documento ni centralizada todavía en FX_CLOSE. Transcripción completa en "Clubes/Dinamarca/Viborg FF/aarsrapport-2024-06-30.md".',
    },
});

memberCountByClub['viborg-dk'] = null;
