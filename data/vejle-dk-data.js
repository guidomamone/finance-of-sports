const vejledkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa explícitamente la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)', normalizedCategory:'lump_football_operations', amountNative:47.596, disclosureLevel:'aggregated' },
  ],
};

const vejledkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Personaleomkostninger (Lønninger + Pensioner + Andre omkostninger til social sikring)', normalizedCategory:'wages_squad', amountNative:-48.591, disclosureLevel:'detailed', items:[
      ['Lønninger', -45.433], ['Pensioner', -2.471], ['Andre omkostninger til social sikring', -0.687],
    ]},
    { rawLabel:'Andre driftsomkostninger (residual, sin nota propia)', normalizedCategory:'other_expenses', amountNative:-0.082, disclosureLevel:'aggregated' },
    { rawLabel:'Immaterielle anlægsaktiver — afskrivninger (amortisation for the year, registraciones de jugadores)', normalizedCategory:'player_amortisation', amountNative:-2.392, disclosureLevel:'detailed' },
    { rawLabel:'Materielle anlægsaktiver — afskrivninger (Andre anlæg, driftsmateriel og inventar + Indretning af lejede lokaler)', normalizedCategory:'depreciation', amountNative:-0.962, disclosureLevel:'detailed', items:[
      ['Andre anlæg, driftsmateriel og inventar', -0.828], ['Indretning af lejede lokaler', -0.134],
    ]},
  ],
};

const vejledkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-12-31',
    sourceId:'vejle-dk-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:0,
    netInterest:0.456,
    tax:0.310,
    grossDebt:24.128, cash:4.548,
    officialTotalRevenue:47.596, officialTotalExpenses:52.027, officialPAT:-3.665,
  },
};

const vejledkPresupuestoOverlayByYear = {};

const vejledkPasesData = [];
const vejledkResultadosData = {};
const vejledkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['vejle-dk'] = {
  revenueLinesByYear: vejledkRevenueLinesByYear, expenseLinesByYear: vejledkExpenseLinesByYear,
  fiscalYearMeta: vejledkFiscalYearMeta, pasesData: vejledkPasesData,
  resultadosData: vejledkResultadosData, titulosData: vejledkTitulosData,
  presupuestoOverlayByYear: vejledkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'vejle-dk-aarsrapport-2024': {
    id:'vejle-dk-aarsrapport-2024', clubId:'vejle-dk',
    title:'VB Alliancen A/S — Årsrapport 1. januar - 31. december 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Sociedad profesional del fútbol de Vejle Boldklub (CVR 31 08 51 79, distinta de la asociación "VEJLE BOLDKLUB" CVR 68 04 67 18), con 65% de VB Plus ApS por el método de la participación (grupos de networking empresarial, no fútbol). El estado de resultados usa explícitamente la exención del § 32 de la Årsregnskabsloven (solo "Bruttofortjeneste"/Gross profit neto) — todo el revenue se cargó sin desglosar. Patrimonio neto negativo al cierre (-19,936 M DKK). La transcripción tenía las tablas desalineadas y el signo negativo de varios números convertido en un "7" literal; se reconstruyó cruzando la aritmética interna y 2 anclas de texto del informe de gestión (ver comentario de cabecera de data/vejle-dk-data.js). Transcripción completa en Clubes/Dinamarca/Vejle/aarsrapport-2024-12-31.md.',
  },
});

memberCountByClub['vejle-dk'] = null;
