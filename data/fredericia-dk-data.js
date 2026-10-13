const fredericiadkRevenueLinesByYear = {
  2019: [
    { rawLabel:'Nettoomsætning', normalizedCategory:'lump_football_operations', amountNative:13.783959, disclosureLevel:'aggregated' },
  ],
};

const fredericiadkExpenseLinesByYear = {
  2019: [
    { rawLabel:'Omkostninger til råvarer og hjælpematerialer', normalizedCategory:'other_expenses', amountNative:-0.427011, disclosureLevel:'aggregated' },
    { rawLabel:'Andre eksterne omkostninger', normalizedCategory:'other_expenses', amountNative:-4.686890, disclosureLevel:'aggregated' },
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-9.875023, disclosureLevel:'aggregated' },
    { rawLabel:'Af- og nedskrivninger af materielle anlægsaktiver', normalizedCategory:'depreciation', amountNative:-0.039377, disclosureLevel:'aggregated' },
  ],
};

const fredericiadkFiscalYearMeta = {
  2019: {
    currency:'DKK',
    fxRef:'DKK@2019-12-31',
    sourceId:'fredericia-dk-aarsrapport-2019',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-0.149297,
    tax:0,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:4.905334, cash:1.182138,
    officialTotalRevenue:13.783959, officialTotalExpenses:15.028301, officialPAT:-1.393639,
  },
};

const fredericiadkPresupuestoOverlayByYear = {};

const fredericiadkPasesData = [];
const fredericiadkResultadosData = {};
const fredericiadkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fredericia-dk'] = {
  revenueLinesByYear: fredericiadkRevenueLinesByYear, expenseLinesByYear: fredericiadkExpenseLinesByYear,
  fiscalYearMeta: fredericiadkFiscalYearMeta, pasesData: fredericiadkPasesData,
  resultadosData: fredericiadkResultadosData, titulosData: fredericiadkTitulosData,
  presupuestoOverlayByYear: fredericiadkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'fredericia-dk-aarsrapport-2019': {
    id:'fredericia-dk-aarsrapport-2019', clubId:'fredericia-dk',
    title:'Fodbold Club Fredericia 1991 ApS — Årsrapport 2019 (1.1.2019-31.12.2019)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Depositado en Erhvervsstyrelsen (registro mercantil danés). Auditor: PricewaterhouseCoopers, sin salvedades. Transcripción completa en Clubes/Dinamarca/FC Fredericia/aarsrapport-2019-12-31.md. Se eligió este ejercicio (no el 2024 originalmente sugerido) porque los ejercicios 2020 en adelante reportan desde "Bruttofortjeneste" sin desglosar Nettoomsætning — ver comentario de cabecera de data/fredericia-dk-data.js. El club jugó en la 1. Division (2da categoría danesa, "Nordic Bet Ligaen" ese año), no en Superliga; recién ascendió a Superliga para la temporada 2025/26. Patrimonio neto negativo al cierre, con nota de going concern resuelta con un préstamo subordinado de DKK 2,0 M recibido en el propio ejercicio.',
  },
});

gestionesByClub['fredericia-dk'] = {
  actual: { nombre:'Morten Rahbek Hansen (formand)', firstYear:2019, lastYear:2019 },
};

memberCountByClub['fredericia-dk'] = null;
