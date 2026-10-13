const brondbydkRevenueLinesByYear = {
  2020: [
    { rawLabel:'Entré-, TV- og præmieindtægter (recaudación de entradas, TV y premios combinados — 2020, año de público muy restringido por COVID-19)', normalizedCategory:'broadcasting', amountNative:35.128, disclosureLevel:'detailed' },
    { rawLabel:'Indtægter fra partnere og sponsorer', normalizedCategory:'sponsorship_commercial', amountNative:41.805, disclosureLevel:'detailed' },
    { rawLabel:'F&B og arrangementer m.v.', normalizedCategory:'stadium_other', amountNative:3.792, disclosureLevel:'detailed' },
    { rawLabel:'Merchandise m.v.', normalizedCategory:'sponsorship_commercial', amountNative:26.799, disclosureLevel:'detailed' },
    { rawLabel:'Udlejning erhvervsejendom m.v.', normalizedCategory:'other_income', amountNative:2.333, disclosureLevel:'detailed' },
    { rawLabel:'Anden nettoomsætning', normalizedCategory:'other_income', amountNative:3.405, disclosureLevel:'detailed' },
    { rawLabel:'Andre driftsindtægter (compensación estatal COVID-19 + donación)', normalizedCategory:'other_income', amountNative:45.209, disclosureLevel:'detailed', items:[
      ['Kompensation fra Staten', 42.029], ['Donation', 3.181],
    ]},
  ],
};

const brondbydkExpenseLinesByYear = {
  2020: [
    { rawLabel:'Kamp- og spilleromkostninger', normalizedCategory:'match_organisation_expense', amountNative:-11.145, disclosureLevel:'detailed' },
    { rawLabel:'Salgs- og markedsføringsomkostninger', normalizedCategory:'admin_general_expense', amountNative:-4.377, disclosureLevel:'detailed' },
    { rawLabel:'F&B og arrangementer m.v. (costo)', normalizedCategory:'admin_general_expense', amountNative:-4.138, disclosureLevel:'detailed' },
    { rawLabel:'Driftsomkostninger ejendomme', normalizedCategory:'admin_general_expense', amountNative:-8.189, disclosureLevel:'detailed' },
    { rawLabel:'Vareforbrug m.v. merchandise', normalizedCategory:'other_expenses', amountNative:-12.859, disclosureLevel:'detailed' },
    { rawLabel:'Administrationsomkostninger', normalizedCategory:'admin_general_expense', amountNative:-19.596, disclosureLevel:'detailed' },
    { rawLabel:'Løn til bestyrelse og direktion', normalizedCategory:'admin_general_expense', amountNative:-5.042, disclosureLevel:'detailed', items:[
      ['Vederlag mm. til direktionen', -4.543], ['Bestyrelseshonorar', -0.499],
    ]},
    { rawLabel:'Personaleomkostninger (plantel, staff y resto del personal, excluye directorio/gerencia)', normalizedCategory:'wages_squad', amountNative:-97.407, disclosureLevel:'detailed', items:[
      ['Gager og lønninger til medarbejdere', -84.040], ['Pensionsordninger, bidragsbaserede', -5.815], ['Andre omkostninger til social sikring', -1.285], ['Øvrige personaleomkostninger', -6.267],
    ]},
    { rawLabel:'Af- og nedskrivninger (bygninger, driftsmateriel og inventar)', normalizedCategory:'depreciation', amountNative:-10.658, disclosureLevel:'detailed', items:[
      ['Bygninger m.v.', -6.624], ['Driftsmateriel og inventar', -4.034],
    ]},
    { rawLabel:'Tab ved salg/afgang af anlægsaktiver', normalizedCategory:'other_expenses', amountNative:-0.108, disclosureLevel:'detailed' },
  ],
};

const brondbydkFiscalYearMeta = {
  2020: {
    currency:'DKK', fxRef:'DKK@2020-12-31',
    sourceId:'brondby-aarsrapport-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:-2.749,
    profitOnPlayerSales:-8.057,
    assetSales:0,
    tax:0,
    grossDebt:0, cash:0,
    officialTotalRevenue:158.471, officialTotalExpenses:173.518, officialPAT:-25.853,
  },
};

const brondbydkPresupuestoOverlayByYear = {};

const brondbydkPasesData = [];
const brondbydkResultadosData = {};
const brondbydkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['brondby-dk'] = {
  revenueLinesByYear: brondbydkRevenueLinesByYear, expenseLinesByYear: brondbydkExpenseLinesByYear,
  fiscalYearMeta: brondbydkFiscalYearMeta, pasesData: brondbydkPasesData,
  resultadosData: brondbydkResultadosData, titulosData: brondbydkTitulosData,
  presupuestoOverlayByYear: brondbydkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'brondby-aarsrapport-2020': {
      id:'brondby-aarsrapport-2020', clubId:'brondby-dk',
      title:'Brøndbyernes I.F. Fodbold A/S — Årsrapport 2020 (1. januar - 31. december 2020)',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía distribution.virk.dk (Erhvervsstyrelsen, CVR 83 93 34 10). Año afectado por COVID-19 (compensación estatal por pérdidas de organizador y nómina durante los cierres, ver Nota 6). Reporta bajo NIIF/IFRS, formato Totalindkomstopgørelse (distinto del formato clásico "årsregnskabsloven" de FC København/FC Midtjylland). Transcripción completa en Clubes/Dinamarca/Brøndby/aarsrapport-2020-12-31.md. No hay ejercicios más nuevos transcriptos todavía para este club.',
    },
});

memberCountByClub['brondby-dk'] = null;
