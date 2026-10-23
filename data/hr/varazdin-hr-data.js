// GENERADO desde data/hr/varazdin-hr.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const varazdinHrRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Prihodi od ulaznica (Nacionalna natjecanja + UEFA klupska natjecanja)","normalizedCategory":"matchday_competition","amountNative":0.535202,"disclosureLevel":"detailed","items":[["Prihodi od ulaznica - Nacionalna natjecanja",0.507364],["Prihodi od ulaznica - UEFA klupska natjecanja",0.027838]]},
    {"rawLabel":"Prihodi od ulaznica - Godišnje ulaznice","normalizedCategory":"season_tickets","amountNative":0.019953,"disclosureLevel":"detailed"},
    {"rawLabel":"UKUPNO PRIHODI OD SPONZORSTVA I OGLAŠAVANJA","normalizedCategory":"sponsorship_commercial","amountNative":1.353004,"disclosureLevel":"detailed","items":[["Proizvođač opreme",0.299925],["Glavni sponzor",0.27536],["Reklamni panoi oko terena",0.777719]]},
    {"rawLabel":"UKUPNO PRIHODI OD PRAVA EMITIRANJA - Nacionalna natjecanja","normalizedCategory":"broadcasting","amountNative":1.0169,"disclosureLevel":"detailed"},
    {"rawLabel":"UKUPNO KOMERCIJALNI PRIHODI","normalizedCategory":"sponsorship_commercial","amountNative":0.106646,"disclosureLevel":"detailed","items":[["Prodaja proizvoda",0.041493],["Korištenje objekata",0.065153]]},
    {"rawLabel":"Uefina klupska natjecanja - solidarne uplate","normalizedCategory":"competition_bonus","amountNative":1.488194,"disclosureLevel":"detailed"},
    {"rawLabel":"UKUPNO OSTALI POSLOVNI PRIHODI","normalizedCategory":"other_income","amountNative":0.615367,"disclosureLevel":"detailed","items":[["Donacije i dotacije od nacionalnih nogometnih tijela",0.045],["Donacije i dotacije od države i lokalne samouprave",0.350721],["Donacije nepovezanih strana",0.002374],["Ostali nerazvrstani poslovni prihodi",0.217272]]},
  ],
};

const varazdinHrExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Troškovi prodaje/materijala + Trošak primanja ostalih zaposlenika + Troškovi sponzorstva + Troškovi imovine i objekata","normalizedCategory":"admin_general_expense","amountNative":-1.659066,"disclosureLevel":"detailed","items":[["UKUPNO TROŠKOVI PRODAJE / MATERIJALA",-0.167793],["UKUPNO TROŠKOVI PRIMANJA OSTALIH ZAPOSLENIKA",-1.022702],["Troškovi sponzorstva i oglašavanja",-0.089866],["Troškovi imovine i objekata",-0.378705]]},
    {"rawLabel":"Troškovi primanja igrača + Troškovi primanja stručnog stožera","normalizedCategory":"wages_squad","amountNative":-3.029599,"disclosureLevel":"detailed","items":[["UKUPNO TROŠKOVI PRIMANJA IGRAČA",-2.375838],["UKUPNO TROŠKOVI PRIMANJA STRUČNOG STOŽERA",-0.653761]]},
    {"rawLabel":"UKUPNO UMANJENJE VRIJEDNOSTI I AMORTIZACIJA","normalizedCategory":"depreciation","amountNative":-0.147343,"disclosureLevel":"aggregated"},
    {"rawLabel":"Troškovi održavanja utakmica","normalizedCategory":"match_organisation_expense","amountNative":-0.976424,"disclosureLevel":"detailed"},
    {"rawLabel":"Ostali nerazvrstani poslovni rashodi","normalizedCategory":"other_expenses","amountNative":-0.048032,"disclosureLevel":"detailed"},
  ],
};

const varazdinHrFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"varazdin-hr-financijsko-izvjesce-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-12-31","profitOnPlayerSales":2.104452,"assetSales":0,"netInterest":-0.013486,"tax":-0.160177,"grossDebt":0,"cash":2.079826,"officialTotalRevenue":5.135266,"officialTotalExpenses":5.860464,"officialPAT":1.205591},
};

const varazdinHrPresupuestoOverlayByYear = {};

const varazdinHrPasesData = [];
const varazdinHrResultadosData = {};
const varazdinHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["varazdin-hr"] = {
  revenueLinesByYear: varazdinHrRevenueLinesByYear, expenseLinesByYear: varazdinHrExpenseLinesByYear,
  fiscalYearMeta: varazdinHrFiscalYearMeta, pasesData: varazdinHrPasesData,
  resultadosData: varazdinHrResultadosData, titulosData: varazdinHrTitulosData,
  presupuestoOverlayByYear: varazdinHrPresupuestoOverlayByYear,
};

Object.assign(sources, {"varazdin-hr-financijsko-izvjesce-2025":{"id":"varazdin-hr-financijsko-izvjesce-2025","clubId":"varazdin-hr","title":"Financijski izvještaj Nogometnog kluba Varaždin s.d.d. za 2025. godinu, s revizijskim izvješćem","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Croacia/Varaždin/financijsko-izvjesce-2025.pdf"}});

memberCountByClub["varazdin-hr"] = null;
