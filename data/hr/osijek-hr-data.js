// GENERADO desde data/hr/osijek-hr.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const osijekHrRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Prihodi od ulaznica - Nacionalna natjecanja","normalizedCategory":"matchday_competition","amountNative":1.134206,"disclosureLevel":"detailed"},
    {"rawLabel":"Prihodi od ulaznica - Godišnje ulaznice","normalizedCategory":"season_tickets","amountNative":0.003667,"disclosureLevel":"detailed"},
    {"rawLabel":"Prihodi od ulaznica - Članarine","normalizedCategory":"member_dues","amountNative":0.032818,"disclosureLevel":"detailed"},
    {"rawLabel":"Prihod od sponzorstva i oglašavanja — Glavni sponzor na opremi + Sponzor za stadion","normalizedCategory":"sponsorship_commercial","amountNative":9.104688,"disclosureLevel":"detailed","items":[["Glavni sponzor na opremi",8.756],["Sponzor za stadion",0.348688]]},
    {"rawLabel":"Prihodi od prava emitiranja - Nacionalna natjecanja","normalizedCategory":"broadcasting","amountNative":0.8556,"disclosureLevel":"detailed"},
    {"rawLabel":"Komercijalni prihodi — Prodaja proizvoda + Ostali nerazvrstani","normalizedCategory":"sponsorship_commercial","amountNative":1.203004,"disclosureLevel":"detailed","items":[["Komercijalni prihodi - Prodaja proizvoda",0.459111],["Ostali nerazvrstani komercijalni prihodi",0.743893]]},
    {"rawLabel":"Uefina klupska natjecanja - solidarne uplate","normalizedCategory":"competition_bonus","amountNative":1.982354,"disclosureLevel":"detailed"},
    {"rawLabel":"Ostali poslovni prihodi — donacije i izvanredni prihodi","normalizedCategory":"other_income","amountNative":4.493684,"disclosureLevel":"detailed","items":[["Donacije nepovezanih strana",3.349012],["Donacije i doprinosi povezanih strana",0.102782],["Izvanredni prihodi",0.083374],["Ostali nerazvrstani poslovni prihodi (Bjelica nagodba 0,618518 + Donacije 0,168000 + Ostali 0,171998)",0.958516]]},
  ],
};

const osijekHrExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Troškovi primanja igrača + Troškovi primanja stručnog stožera","normalizedCategory":"wages_squad","amountNative":-6.020068,"disclosureLevel":"detailed","items":[["Troškovi primanja igrača (Plaće 5,184527 + Ostali nerazvrstani 0,361003)",-5.54553],["Troškovi primanja stručnog stožera (Plaće)",-0.474538]]},
    {"rawLabel":"Trošak primanja ostalih zaposlenika + Troškovi sponzorstva/komercijalnih aktivnosti/imovine i objekata/nenogometnih djelatnosti","normalizedCategory":"admin_general_expense","amountNative":-8.473839,"disclosureLevel":"detailed","items":[["Trošak primanja ostalih zaposlenika (Plaće 3,032037 + Porezi i doprinosi 1,678020 + Ostali 0,158601)",-4.868658],["Troškovi sponzorstva i oglašavanja",-0.288719],["Troškovi komercijalnih aktivnosti",-1.190487],["Troškovi imovine i objekata",-0.35664],["Troškovi za nenogometne djelatnosti",-1.769335]]},
    {"rawLabel":"Amortizacija dugotrajne materijalne imovine","normalizedCategory":"depreciation","amountNative":-1.145578,"disclosureLevel":"detailed"},
    {"rawLabel":"Troškovi održavanja utakmica","normalizedCategory":"match_organisation_expense","amountNative":-1.085017,"disclosureLevel":"detailed"},
    {"rawLabel":"Ostali nerazvrstani poslovni rashodi","normalizedCategory":"other_expenses","amountNative":-2.264797,"disclosureLevel":"detailed","items":[["Troškovi dugoročnog rezerviranja sudskih sporova",-1.168733],["Članarine udrugama (HNS, ŽNS..)",-0.118519],["Darovanja",-0.094283],["Ugostiteljski troškovi",-0.276373],["Prostojbe HNS (Odluke)",-0.052835],["Troškovi platnog prometa",-0.052742],["Ostalo",-0.501312]]},
  ],
};

const osijekHrFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"osijek-hr-financijsko-izvjesce-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-12-31","profitOnPlayerSales":-0.335134,"assetSales":0,"netInterest":-0.403355,"tax":0,"grossDebt":11.470126,"cash":1.585818,"officialTotalRevenue":18.810021,"officialTotalExpenses":18.989299,"officialPAT":-0.917767},
};

const osijekHrPresupuestoOverlayByYear = {};

const osijekHrPasesData = [];
const osijekHrResultadosData = {};
const osijekHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["osijek-hr"] = {
  revenueLinesByYear: osijekHrRevenueLinesByYear, expenseLinesByYear: osijekHrExpenseLinesByYear,
  fiscalYearMeta: osijekHrFiscalYearMeta, pasesData: osijekHrPasesData,
  resultadosData: osijekHrResultadosData, titulosData: osijekHrTitulosData,
  presupuestoOverlayByYear: osijekHrPresupuestoOverlayByYear,
};

Object.assign(sources, {"osijek-hr-financijsko-izvjesce-2025":{"id":"osijek-hr-financijsko-izvjesce-2025","clubId":"osijek-hr","title":"Revidirani godišnji kombinirani financijski izvještaji za posebne namjene za 2025. godinu","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Croacia/Osijek/financijsko-izvjesce-2025.pdf"}});

memberCountByClub["osijek-hr"] = null;
