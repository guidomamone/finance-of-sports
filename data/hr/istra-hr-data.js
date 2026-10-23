// GENERADO desde data/hr/istra-hr.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const istraHrRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Prihodi od ulaznica (Nacionalna natjecanja + Ostali nerazvrstani)","normalizedCategory":"matchday_competition","amountNative":0.43299,"disclosureLevel":"detailed","items":[["Prihodi od ulaznica - Nacionalna natjecanja",0.410161],["Ostali nerazvrstani prihodi od ulaznica",0.022829]]},
    {"rawLabel":"Prihodi od ulaznica - Godišnje ulaznice","normalizedCategory":"season_tickets","amountNative":0.073124,"disclosureLevel":"detailed"},
    {"rawLabel":"Prihod od sponzorstva i oglašavanja - Ukupno","normalizedCategory":"sponsorship_commercial","amountNative":0.510171,"disclosureLevel":"detailed","items":[["Glavni sponzor na opremi",0.065664],["Reklamiranje na panoima oko terena za igru",0.0023],["Ostali nerazvrstani prihodi od sponzorstva i oglašavanja",0.442207]]},
    {"rawLabel":"Prihodi od prava emitiranja - Nacionalna natjecanja","normalizedCategory":"broadcasting","amountNative":0.8958,"disclosureLevel":"detailed"},
    {"rawLabel":"Komercijalni prihodi - Ukupno","normalizedCategory":"sponsorship_commercial","amountNative":0.199546,"disclosureLevel":"detailed","items":[["Komercijalni prihodi - Nacionalna natjecanja",0.00149],["Komercijalni prihodi - Prodaja proizvoda",0.198056]]},
    {"rawLabel":"Uefina klupska natjecanja - solidarne uplate","normalizedCategory":"competition_bonus","amountNative":1.87375,"disclosureLevel":"detailed"},
    {"rawLabel":"Ostali poslovni prihodi - Ukupno","normalizedCategory":"other_income","amountNative":0.341239,"disclosureLevel":"detailed","items":[["Donacije i dotacije od nacionalnih nogometnih tijela",0.071671],["Donacije i dotacije od države i lokalne samouprave",0.119171],["Donacije nepovezanih strana",0.035954],["Ostali nerazvrstani poslovni prihodi",0.114443]]},
  ],
};

const istraHrExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Troškovi primanja igrača + Troškovi primanja stručnog stožera","normalizedCategory":"wages_squad","amountNative":-5.611605,"disclosureLevel":"detailed","items":[["Troškovi primanja igrača - ukupno",-3.615261],["Troškovi primanja stručnog stožera - ukupno",-1.996344]]},
    {"rawLabel":"Troškovi prodaje/materijala + Trošak primanja ostalih zaposlenika + Troškovi sponzorstva + Troškovi imovine i objekata","normalizedCategory":"admin_general_expense","amountNative":-0.692704,"disclosureLevel":"detailed","items":[["Troškovi prodaje/materijala - Ukupno",-0.309314],["Trošak primanja ostalih zaposlenika - Ukupno",-0.268151],["Troškovi sponzorstva i oglašavanja",-0.051479],["Troškovi imovine i objekata",-0.06376]]},
    {"rawLabel":"Amortizacija i umanjenje vrijednosti - Ukupno (bez registracija igrača)","normalizedCategory":"depreciation","amountNative":-0.259618,"disclosureLevel":"detailed","items":[["Amortizacija dugotrajne materijalne imovine",-0.071042],["Amortizacija ostale nematerijalne imovine (bez registracija igrača)",-0.188576]]},
    {"rawLabel":"Troškovi utakmica","normalizedCategory":"match_organisation_expense","amountNative":-0.847995,"disclosureLevel":"detailed"},
    {"rawLabel":"Izvanredni troškovi + Ostali nerazvrstani poslovni rashodi","normalizedCategory":"other_expenses","amountNative":-1.653346,"disclosureLevel":"detailed","items":[["Izvanredni troškovi",-0.010233],["Ostali nerazvrstani poslovni rashodi",-1.643113]]},
  ],
};

const istraHrFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"istra-hr-financijsko-izvjesce-2025","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-12-31","profitOnPlayerSales":1.707844,"assetSales":0.438955,"netInterest":-0.087805,"tax":0,"grossDebt":2.521332,"cash":0.114452,"officialTotalRevenue":4.32662,"officialTotalExpenses":9.065268,"officialPAT":-2.679654,"extraRows":[{"label":"Ganancia por venta de jugadores","value":1.707844},{"label":"Intereses netos","value":-0.087805},{"label":"Otros ingresos/egresos no operativos","value":0.438955}]},
};

const istraHrPresupuestoOverlayByYear = {};

const istraHrPasesData = [];
const istraHrResultadosData = {};
const istraHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["istra-hr"] = {
  revenueLinesByYear: istraHrRevenueLinesByYear, expenseLinesByYear: istraHrExpenseLinesByYear,
  fiscalYearMeta: istraHrFiscalYearMeta, pasesData: istraHrPasesData,
  resultadosData: istraHrResultadosData, titulosData: istraHrTitulosData,
  presupuestoOverlayByYear: istraHrPresupuestoOverlayByYear,
};

Object.assign(sources, {"istra-hr-financijsko-izvjesce-2025":{"id":"istra-hr-financijsko-izvjesce-2025","clubId":"istra-hr","title":"Financijski izvještaji na dan 31. prosinca 2025. godine s izvješćem revizora (Pravilnik o licenciranju i financijskoj održivosti klubova HNS-a)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Croacia/Istra 1961/financijsko-izvjesce-2025.pdf"}});

memberCountByClub["istra-hr"] = null;
