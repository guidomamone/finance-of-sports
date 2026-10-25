// GENERADO desde data/hr/gorica-hr.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const goricaHrRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Prihodi od ulaznica - Nacionalna natjecanja","normalizedCategory":"matchday_competition","amountNative":0.203327,"disclosureLevel":"detailed"},
    {"rawLabel":"Prihodi od ulaznica - Članarine","normalizedCategory":"member_dues","amountNative":0.116731,"disclosureLevel":"detailed"},
    {"rawLabel":"Prihod od sponzorstva i oglašavanja - Ukupno + Komercijalni prihodi - Ukupno","normalizedCategory":"sponsorship_commercial","amountNative":0.431833,"disclosureLevel":"detailed","items":[["Prihod od sponzorstva i oglašavanja - Ukupno",0.352675],["Komercijalni prihodi - Ukupno (incl. 10.000 EUR no atribuible con certeza, ver comentario de cabecera)",0.079158]]},
    {"rawLabel":"Prihodi od prava emitiranja - Ukupno","normalizedCategory":"broadcasting","amountNative":0.701,"disclosureLevel":"detailed"},
    {"rawLabel":"Uefine nagrade i solidarne uplate - Ukupno","normalizedCategory":"competition_bonus","amountNative":0.963194,"disclosureLevel":"detailed"},
    {"rawLabel":"Ostali poslovni prihodi - Ukupno (donacije + prihodi od nenogometnih djelatnosti + ostalo)","normalizedCategory":"other_income","amountNative":1.138074,"disclosureLevel":"detailed","items":[["Donacije od države i lokalne samouprave",0.453275],["Donacije nepovezanih strana",0.664587],["Prihodi od nenogometnih djelatnosti",0.00455],["Ostali nerazvrstani poslovni prihodi",0.015662]]},
    {"rawLabel":"Prihod od raspolaganja registracijama igrača (uključujući prihode od ustupanja, solidarnih doprinosa i naknada za treniranje)","normalizedCategory":"player_sales","amountNative":0.48946,"disclosureLevel":"detailed"},
  ],
};

const goricaHrExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Troškovi primanja igrača + Troškovi primanja stručnog stožera","normalizedCategory":"wages_squad","amountNative":-3.315864,"disclosureLevel":"detailed","items":[["Plaće igrača",-2.329005],["Porezi i doprinosi - igrači",-0.217999],["Ostali nerazvrstani troškovi primanja igrača",-0.05555],["Plaće stručnog stožera",-0.669121],["Porezi i doprinosi - stručni stožer",-0.039161],["Ostali nerazvrstani troškovi primanja stručnog stožera",-0.005028]]},
    {"rawLabel":"Trošak primanja ostalih zaposlenika + Troškovi primanja zaposlenika (ostali/nerazvrstani) + Troškovi imovine i objekata","normalizedCategory":"admin_general_expense","amountNative":-1.844115,"disclosureLevel":"detailed","items":[["Plaće ostalih zaposlenika",-1.179051],["Porezi i doprinosi - ostali zaposlenici",-0.290452],["Ostali nerazvrstani troškovi za primanja ostalih zaposlenika",-0.122426],["Troškovi primanja zaposlenika - ostali/nerazvrstani",-0.114905],["Troškovi imovine i objekata",-0.137281]]},
    {"rawLabel":"Amortizacija dugotrajne materijalne imovine","normalizedCategory":"depreciation","amountNative":-0.055781,"disclosureLevel":"detailed"},
    {"rawLabel":"Umanjenje vrijednosti ostale nematerijalne imovine (bez registracija igrača)","normalizedCategory":"other_amortisation","amountNative":-0.008355,"disclosureLevel":"detailed"},
    {"rawLabel":"Troškovi utakmica","normalizedCategory":"match_organisation_expense","amountNative":-0.312462,"disclosureLevel":"detailed"},
    {"rawLabel":"Ostali nerazvrstani poslovni rashodi (Bilješka X) + Nekapitalizirani troškovi za naknade agentima/posrednicima","normalizedCategory":"other_expenses","amountNative":-1.346301,"disclosureLevel":"detailed","items":[["Ostali nerazvrstani poslovni rashodi",-1.198051],["Nekapitalizirani troškovi za naknade agentima/posrednicima",-0.14825]]},
    {"rawLabel":"Troškovi stjecanja registracija igrača (uključujući troškove ustupanja, solidarne doprinose i naknade za treniranje)","normalizedCategory":"player_amortisation","amountNative":-0.089429,"disclosureLevel":"detailed"},
  ],
};

const goricaHrFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"gorica-hr-financijsko-izvjesce-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-12-31","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.028251,"tax":0,"grossDebt":0.12651,"cash":0.002263,"officialTotalRevenue":4.043619,"officialTotalExpenses":6.972307,"officialPAT":-2.956939,"baseIngreso":"full"},
};

const goricaHrPresupuestoOverlayByYear = {};

const goricaHrPasesData = [];
const goricaHrResultadosData = {};
const goricaHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["gorica-hr"] = {
  revenueLinesByYear: goricaHrRevenueLinesByYear, expenseLinesByYear: goricaHrExpenseLinesByYear,
  fiscalYearMeta: goricaHrFiscalYearMeta, pasesData: goricaHrPasesData,
  resultadosData: goricaHrResultadosData, titulosData: goricaHrTitulosData,
  presupuestoOverlayByYear: goricaHrPresupuestoOverlayByYear,
};

Object.assign(sources, {"gorica-hr-financijsko-izvjesce-2025":{"id":"gorica-hr-financijsko-izvjesce-2025","clubId":"gorica-hr","title":"Revidirani godišnji financijski izvještaji za 2025. godinu — HNK Gorica s.d.d.","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Croacia/Gorica/financijsko-izvjesce-2025.pdf"}});

gestionesByClub["gorica-hr"] = {"actual":{"nombre":"Gestión actual (Ilija Karamatić, Predsjednik kluba)","firstYear":2025,"lastYear":2025}};

memberCountByClub["gorica-hr"] = null;
