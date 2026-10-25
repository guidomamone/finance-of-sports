// GENERADO desde data/gr/panathinaikos-gr.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const panathinaikosGrRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Έσοδα από εισιτήρια","normalizedCategory":"matchday_competition","amountNative":19.325224,"disclosureLevel":"detailed"},
    {"rawLabel":"Χορηγίες και διαφημίσεις","normalizedCategory":"sponsorship_commercial","amountNative":15.87489,"disclosureLevel":"detailed"},
    {"rawLabel":"Δικαιώματα αναμετάδοσης","normalizedCategory":"broadcasting","amountNative":5.39399,"disclosureLevel":"detailed"},
    {"rawLabel":"Εμπορικά","normalizedCategory":"sponsorship_commercial","amountNative":3.85567,"disclosureLevel":"detailed"},
    {"rawLabel":"Αλληλεγγύη UEFA και χρηματικά έπαθλα","normalizedCategory":"competition_bonus","amountNative":9.953051,"disclosureLevel":"detailed"},
    {"rawLabel":"Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου ή κυβέρνηση","normalizedCategory":"competition_bonus","amountNative":2.652279,"disclosureLevel":"detailed"},
    {"rawLabel":"Λοιπά λειτουργικά έσοδα","normalizedCategory":"other_income","amountNative":0.545929,"disclosureLevel":"detailed"},
  ],
};

const panathinaikosGrExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Κόστος πωλήσεων / υλικών","normalizedCategory":"other_expenses","amountNative":-0.337502,"disclosureLevel":"detailed"},
    {"rawLabel":"Συμβόλαια, πριμ και αποζημιώσεις ποδοσφαιριστών / προπονητών","normalizedCategory":"wages_squad","amountNative":-44.650101,"disclosureLevel":"detailed","items":[["Συμβόλαια ποδοσφαιριστών / προπονητών",44.018972],["Πριμ ποδοσφαιριστών / προπονητών",0.5345],["Αποζημιώσεις",0.096629]]},
    {"rawLabel":"Αμοιβές και μισθοί εργαζομένων, λοιπές παροχές και ασφάλιστρα","normalizedCategory":"admin_general_expense","amountNative":-6.436529,"disclosureLevel":"detailed","items":[["Αμοιβές και μισθοί εργαζομένων",4.693366],["Λοιπές Παροχές",1.579043],["Ασφάλιστρα και ιατροφαρμακευτική δαπάνη",0.16412]]},
    {"rawLabel":"Απομείωση και απαξίωση ενσώματων πάγιων στοιχείων","normalizedCategory":"depreciation","amountNative":-1.156489,"disclosureLevel":"detailed"},
    {"rawLabel":"Απομείωση και απαξίωση άλλων άυλων στοιχείων","normalizedCategory":"other_amortisation","amountNative":-0.05586,"disclosureLevel":"detailed"},
    {"rawLabel":"Λοιπά λειτουργικά έξοδα","normalizedCategory":"admin_general_expense","amountNative":-20.07627,"disclosureLevel":"detailed"},
  ],
};

const panathinaikosGrFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"panathinaikos-gr-annual-fr-2025","reportType":"official_balance_sheet","gestionId":"actual","fxRef":"EUR@2025-06-30","profitOnPlayerSales":-10.983661,"assetSales":-0.025836,"netInterest":-0.419796,"tax":0.045292,"grossDebt":0,"cash":1.474426,"officialTotalRevenue":57.601032,"officialTotalExpenses":72.71275,"officialPAT":-26.495719,"baseIngreso":"full"},
};

const panathinaikosGrPresupuestoOverlayByYear = {};

const panathinaikosGrPasesData = [];
const panathinaikosGrResultadosData = {};
const panathinaikosGrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["panathinaikos-gr"] = {
  revenueLinesByYear: panathinaikosGrRevenueLinesByYear, expenseLinesByYear: panathinaikosGrExpenseLinesByYear,
  fiscalYearMeta: panathinaikosGrFiscalYearMeta, pasesData: panathinaikosGrPasesData,
  resultadosData: panathinaikosGrResultadosData, titulosData: panathinaikosGrTitulosData,
  presupuestoOverlayByYear: panathinaikosGrPresupuestoOverlayByYear,
};

Object.assign(sources, {"panathinaikos-gr-annual-fr-2025":{"id":"panathinaikos-gr-annual-fr-2025","clubId":"panathinaikos-gr","title":"Ετήσιες Οικονομικές Καταστάσεις (Annual Financial Report, IFRS), περίοδος 01.07.2024–30.06.2025","type":"official_balance_sheet","reliability":"primary"}});

gestionesByClub["panathinaikos-gr"] = {"actual":{"nombre":"Gestión actual","firstYear":2025,"lastYear":2025}};

memberCountByClub["panathinaikos-gr"] = null;
