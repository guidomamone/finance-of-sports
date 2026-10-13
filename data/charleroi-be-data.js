const charleroiBeRevenueLinesByYear = {
  2025: [
    { rawLabel:"Chiffre d'affaires", normalizedCategory:'lump_football_operations', amountNative:24.786109, disclosureLevel:'aggregated' },
    { rawLabel:"Autres produits d'exploitation", normalizedCategory:'other_income', amountNative:5.018673, disclosureLevel:'aggregated' },
  ],
};

const charleroiBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Approvisionnements et marchandises', normalizedCategory:'other_expenses', amountNative:-0.210451, disclosureLevel:'aggregated' },
    { rawLabel:'Services et biens divers', normalizedCategory:'other_expenses', amountNative:-12.762354, disclosureLevel:'aggregated' },
    { rawLabel:'Rémunérations, charges sociales et pensions', normalizedCategory:'wages_squad', amountNative:-17.825907, disclosureLevel:'aggregated' },
    { rawLabel:'Amortissements — droits sur joueurs (immobilisations incorporelles)', normalizedCategory:'player_amortisation', amountNative:-1.635885, disclosureLevel:'detailed' },
    { rawLabel:'Amortissements — immobilisations corporelles', normalizedCategory:'depreciation', amountNative:-0.501149, disclosureLevel:'detailed' },
    { rawLabel:'Réductions de valeur sur stocks et créances commerciales', normalizedCategory:'other_expenses', amountNative:-0.003648, disclosureLevel:'aggregated' },
    { rawLabel:'Provisions pour risques et charges', normalizedCategory:'exceptional_items', amountNative:-0.419224, disclosureLevel:'aggregated' },
    { rawLabel:"Impôts et taxes relatifs à l'exploitation", normalizedCategory:'admin_general_expense', amountNative:-0.561662, disclosureLevel:'detailed' },
    { rawLabel:"Autres charges d'exploitation", normalizedCategory:'other_expenses', amountNative:-0.063697, disclosureLevel:'aggregated' },
    { rawLabel:'Prélèvement sur les réserves immunisées', normalizedCategory:'exceptional_items', amountNative:1.078606, disclosureLevel:'detailed' },
  ],
};

const charleroiBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'charleroi-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:-0.288820,
    tax:-0.113122,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:10.641030, cash:0.898948,
    officialTotalRevenue:29.804782, officialTotalExpenses:33.564753,  officialPAT:-3.502530,
  },
};

const charleroiBePresupuestoOverlayByYear = {};

const charleroiBePasesData = [];
const charleroiBeResultadosData = {};
const charleroiBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['charleroi-be'] = {
  revenueLinesByYear: charleroiBeRevenueLinesByYear, expenseLinesByYear: charleroiBeExpenseLinesByYear,
  fiscalYearMeta: charleroiBeFiscalYearMeta, pasesData: charleroiBePasesData,
  resultadosData: charleroiBeResultadosData, titulosData: charleroiBeTitulosData,
  presupuestoOverlayByYear: charleroiBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'charleroi-be-jaarrekening-2025': {
    id:'charleroi-be-jaarrekening-2025', clubId:'charleroi-be',
    title:"Comptes annuels de la SA Sporting du Pays de Charleroi pour l'exercice du 1/7/2024 au 30/6/2025",
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Banque Nationale de Belgique (BNB/NBB), esquema estatutario abreviado (Code des sociétés et des associations). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Charleroi/jaarrekening-2025-06-30-individual.md. La Nota C-cap 6.10 (desglose de Chiffre d\'affaires por categoría/mercado) no fue completada por el club en este filing; "Autres produits d\'exploitation" (17% del revenue) tampoco tiene desglose disponible.',
  },
});

memberCountByClub['charleroi-be'] = null;
