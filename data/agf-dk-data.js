const agfdkRevenueLinesByYear = {
  2021: [
    { rawLabel:'Entré- og tv-indtægter (entradas y TV combinadas, la fuente no las separa)', normalizedCategory:'broadcasting', amountNative:34.673, disclosureLevel:'detailed' },
    { rawLabel:'Indtægter fra samarbejdspartnere og sponsorer', normalizedCategory:'sponsorship_commercial', amountNative:66.973, disclosureLevel:'detailed' },
    { rawLabel:'Anden omsætning, varesalg (merchandising)', normalizedCategory:'sponsorship_commercial', amountNative:9.450, disclosureLevel:'detailed' },
    { rawLabel:'Udlejningsvirksomhed + Restaurations- og cateringvirksomhed + Arrangementer/billetsalg (Ceres Park & Arena, segmento Faciliteter)', normalizedCategory:'stadium_other', amountNative:19.154, disclosureLevel:'detailed', items:[
      ['Udlejningsvirksomhed', 7.148], ['Restaurations- og cateringvirksomhed', 8.385], ['Arrangementer, billetsalg', 3.621],
    ]},
    { rawLabel:'Anden omsætning, tjenesteydelser', normalizedCategory:'other_income', amountNative:13.524, disclosureLevel:'detailed' },
    { rawLabel:'Offentlige tilskud (subvenciones estatales COVID-19)', normalizedCategory:'other_income', amountNative:15.910, disclosureLevel:'detailed' },
    { rawLabel:'Nettotransferindtægter', normalizedCategory:'player_sales', amountNative:28.637, disclosureLevel:'detailed' },
  ],
};

const agfdkExpenseLinesByYear = {
  2021: [
    { rawLabel:'Kamp- og spilleromkostninger', normalizedCategory:'match_organisation_expense', amountNative:-20.730, disclosureLevel:'detailed' },
    { rawLabel:'Driftsomkostninger + Salgs- og markedsføringsomkostninger + Administrationsomkostninger', normalizedCategory:'admin_general_expense', amountNative:-35.944, disclosureLevel:'detailed', items:[
      ['Driftsomkostninger', -6.296], ['Salgs- og markedsføringsomkostninger', -16.783], ['Administrationsomkostninger', -12.865],
    ]},
    { rawLabel:'Vareforbrug i restaurations- og cateringvirksomhed + Andre omkostninger', normalizedCategory:'other_expenses', amountNative:-5.795, disclosureLevel:'detailed', items:[
      ['Vareforbrug i restaurations- og cateringvirksomhed', -5.161], ['Andre omkostninger', -0.634],
    ]},
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-86.507, disclosureLevel:'detailed' },
    { rawLabel:'Af- og nedskrivninger — Ombygning af lejede lokaler + Driftsmateriel og inventar + Leasingaktiver', normalizedCategory:'depreciation', amountNative:-7.903, disclosureLevel:'detailed', items:[
      ['Ombygning af lejede lokaler', -3.096], ['Driftsmateriel og inventar', -2.586], ['Leasingaktiver', -2.221],
    ]},
    { rawLabel:'Af- og nedskrivninger — Kontraktrettigheder + Nettotransferomkostninger', normalizedCategory:'player_amortisation', amountNative:-11.197, disclosureLevel:'detailed', items:[
      ['Amortisering af kontraktrettigheder', -10.841], ['Nettotransferomkostninger', -0.356],
    ]},
  ],
};

const agfdkFiscalYearMeta = {
  2021: {
    currency:'DKK', fxRef:'DKK@2021-06-30',
    sourceId:'agf-aarsrapport-2020-21',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:-0.292,
    netInterest:4.865,
    tax:0.500,
    grossDebt:4.627, cash:29.347,
    officialTotalRevenue:188.321, officialTotalExpenses:168.076, officialPAT:25.318,
  },
};

const agfdkPresupuestoOverlayByYear = {};

const agfdkPasesData = [];
const agfdkResultadosData = {};
const agfdkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['agf-dk'] = {
  revenueLinesByYear: agfdkRevenueLinesByYear, expenseLinesByYear: agfdkExpenseLinesByYear,
  fiscalYearMeta: agfdkFiscalYearMeta, pasesData: agfdkPasesData,
  resultadosData: agfdkResultadosData, titulosData: agfdkTitulosData,
  presupuestoOverlayByYear: agfdkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'agf-aarsrapport-2020-21': {
    id:'agf-aarsrapport-2020-21', clubId:'agf-dk',
    title:'AGF A/S — Årsrapport 2020/21 (1. juli 2020 - 30. juni 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cifras del Koncern (grupo consolidado: AGF A/S + AGF Esport ApS 57% + Atletion A/S/Ceres Park & Arena 100% + AGF Kvindefodbold ApS 80% + Stadion Fysioterapi ApS), no del Moderselskab (columna paralela que el documento también publica). No existe una entidad "solo fútbol" separada para AGF, a diferencia de F.C. København. Sin salvedades de auditoría. Transcripción completa en Clubes/Dinamarca/AGF/aarsrapport-2021-06-30.md.',
  },
});

memberCountByClub['agf-dk'] = null;
