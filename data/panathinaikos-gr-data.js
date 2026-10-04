// ============================================================================
// data/panathinaikos-gr-data.js — Panathinaikos Athlitikos Omilos P.A.E.
// (Atenas, Grecia). Primer club griego cargado en finance-of-sports
// (2026-09-28, ronda de 5 onboardings de prueba de los tools del to-do
// 98/95, 4/5 — primer país 100% nuevo de esta ronda). Ejercicio 2025 = REAL,
// único ejercicio cargado a propósito.
//
// FUENTE: `Clubes/Grecia/Panathinaikos/Panathinaikos_annual_FR_2025-06-30.md`
// (informe anual completo, IFRS, período 01/07/2024-30/06/2025, 3284
// líneas). OJO: la carpeta también tiene un archivo
// "Panathinaikos_summary_IFRS_2025-06-30.md" (152 líneas) que NO se usó —
// su contenido corresponde al ejercicio 2020 (no 2025, a pesar del nombre
// del archivo) y tiene etiquetas de fila griegas sin sentido repetidas
// ("Αιγαίου"/"Ανεξίτημα" en filas de balance completamente distintas),
// señal clara de una transcripción fallida/mal hecha — se descartó sin
// usar, no se cargó ningún dato de ahí.
//
// TODAS las cifras son de la columna "Η ΕΤΑΙΡΕΙΑ" (la Compañía, standalone),
// NO "Ο ΟΜΙΛΟΣ" (el Grupo/consolidado) — mismo criterio que Boca/Racing:
// preferir la entidad individual sobre el consolidado, que puede incluir
// negocio de subsidiarias no futbolístico.
//
// REVENUE = "Λειτουργικά έσοδα" (Ingresos operativos, Κατάσταση Συνολικών
// Εσόδων / Estado de Resultado Integral, pág. 21), total impreso
// €57.601.032, reconciliado EXACTO línea por línea con
// `tools/sum-check.mjs`. Los 5 auxilios/subsidios de la Nota de ingresos
// (Alianza UEFA y premios, subvención de la federación/gobierno) se
// categorizaron como `competition_bonus` (dinero de la competencia/
// federación, no ingreso propio del club).
//
// EXPENSES = "Λειτουργικά έξοδα" (Gastos operativos), total impreso
// €72.712.750. "Αμοιβές εργαζομένων και λοιπές παροχές" (Compensación de
// empleados, €51.086.630, el 70% del gasto) se desglosa en la Nota 21 por
// CONCEPTO (no por departamento, a diferencia de River/Vélez) — "Συμβόλαια
// / Πριμ ποδοσφαιριστών-προπονητών" (Contratos/Primas de jugadores-cuerpo
// técnico, claramente `wages_squad`) vs. "Αμοιβές και μισθοί
// εργαζομένων"/"Λοιπές Παροχές"/"Ασφάλιστρα" (personal general/beneficios/
// seguros, sin mención a jugadores, `admin_general_expense`). "Αποζημιώσεις"
// (indemnizaciones, €96.629, chica) se sumó a `wages_squad` por aparecer
// entre los 2 conceptos de plantel en la Nota — juicio, no certeza.
//
// `profitOnPlayerSales` = "Κέρδη/ζημιές κατά τη διάθεση άυλων περιουσιακών
// στοιχείων - ποδοσφαιριστές" (resultado neto de venta de derechos de
// jugadores, -€10.983.661), un campo dedicado del IFRS griego que el
// Estado de Resultado Integral separa explícito del resto — no hace falta
// inferirlo, el documento ya lo aísla.
//
// PAT RECONCILIA EXACTO, SIN RESIDUO (caso limpio, a diferencia de Once
// Caldas 2023-2025): Λειτουργικά έσοδα - Λειτουργικά έξοδα (-€15.111.718,
// coincide con "Αποτελέσματα εκμετάλλευσης" impreso) + netInterest +
// profitOnPlayerSales + assetSales (-€26.541.011, coincide con "Κέρδη/
// (ζημιές) προ φόρων" impreso) + tax = -€26.495.719, coincide EXACTO con
// "Κέρδη / (ζημιές) χρήσης μετά φόρων" impreso.
//
// FX: EUR, `EUR@2025-06-30` (ya cacheado en data/currency-map.js desde
// antes de esta sesión, cierre BCE, sin fetch nuevo).
// ============================================================================

const panathinaikosgrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Έσοδα από εισιτήρια', normalizedCategory:'matchday_competition', amountNative:19.325224, disclosureLevel:'detailed' },
    { rawLabel:'Χορηγίες και διαφημίσεις', normalizedCategory:'sponsorship_commercial', amountNative:15.874890, disclosureLevel:'detailed' },
    { rawLabel:'Δικαιώματα αναμετάδοσης', normalizedCategory:'broadcasting', amountNative:5.393990, disclosureLevel:'detailed' },
    { rawLabel:'Εμπορικά', normalizedCategory:'sponsorship_commercial', amountNative:3.855670, disclosureLevel:'detailed' },
    { rawLabel:'Αλληλεγγύη UEFA και χρηματικά έπαθλα', normalizedCategory:'competition_bonus', amountNative:9.953051, disclosureLevel:'detailed' },
    { rawLabel:'Επιχορηγήσεις από εθνικό φορέα ποδοσφαίρου ή κυβέρνηση', normalizedCategory:'competition_bonus', amountNative:2.652279, disclosureLevel:'detailed' },
    { rawLabel:'Λοιπά λειτουργικά έσοδα', normalizedCategory:'other_income', amountNative:0.545929, disclosureLevel:'detailed' },
  ],
};

const panathinaikosgrExpenseLinesByYear = {
  2025: [
    { rawLabel:'Κόστος πωλήσεων / υλικών', normalizedCategory:'other_expenses', amountNative:-0.337502, disclosureLevel:'detailed' },
    { rawLabel:'Συμβόλαια, πριμ και αποζημιώσεις ποδοσφαιριστών / προπονητών', normalizedCategory:'wages_squad', amountNative:-44.650101, disclosureLevel:'detailed', items:[
      ['Συμβόλαια ποδοσφαιριστών / προπονητών', 44.018972], ['Πριμ ποδοσφαιριστών / προπονητών', 0.534500], ['Αποζημιώσεις', 0.096629],
    ]},
    { rawLabel:'Αμοιβές και μισθοί εργαζομένων, λοιπές παροχές και ασφάλιστρα', normalizedCategory:'admin_general_expense', amountNative:-6.436529, disclosureLevel:'detailed', items:[
      ['Αμοιβές και μισθοί εργαζομένων', 4.693366], ['Λοιπές Παροχές', 1.579043], ['Ασφάλιστρα και ιατροφαρμακευτική δαπάνη', 0.164120],
    ]},
    { rawLabel:'Απομείωση και απαξίωση ενσώματων πάγιων στοιχείων', normalizedCategory:'depreciation', amountNative:-1.156489, disclosureLevel:'detailed' },
    { rawLabel:'Απομείωση και απαξίωση άλλων άυλων στοιχείων', normalizedCategory:'other_amortisation', amountNative:-0.055860, disclosureLevel:'detailed' },
    { rawLabel:'Λοιπά λειτουργικά έξοδα', normalizedCategory:'admin_general_expense', amountNative:-20.076270, disclosureLevel:'detailed' },
  ],
};

const panathinaikosgrFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'panathinaikos-gr-annual-fr-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-0.419796,
    profitOnPlayerSales:-10.983661, assetSales:-0.025836,
    tax:0.045292,
    grossDebt:0, cash:1.474426,
    officialTotalRevenue:57.601032, officialTotalExpenses:72.712750, officialPAT:-26.495719,
  },
};

const panathinaikosgrPresupuestoOverlayByYear = {};

const panathinaikosgrPasesData = [];
const panathinaikosgrResultadosData = {};
const panathinaikosgrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['panathinaikos-gr'] = {
  revenueLinesByYear: panathinaikosgrRevenueLinesByYear, expenseLinesByYear: panathinaikosgrExpenseLinesByYear,
  fiscalYearMeta: panathinaikosgrFiscalYearMeta, pasesData: panathinaikosgrPasesData,
  resultadosData: panathinaikosgrResultadosData, titulosData: panathinaikosgrTitulosData,
  presupuestoOverlayByYear: panathinaikosgrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'panathinaikos-gr-annual-fr-2025': {
      id:'panathinaikos-gr-annual-fr-2025', clubId:'panathinaikos-gr',
      title:'Ετήσιες Οικονομικές Καταστάσεις (Annual Financial Report, IFRS), περίοδος 01.07.2024–30.06.2025',
      type:'official_balance_sheet', reliability:'primary',
      note:'Informe anual completo IFRS. PAT reconcilia EXACTO, sin residuo, línea por línea. La carpeta también tiene un "summary_IFRS_2025-06-30.md" que NO se usó -- corresponde en realidad al ejercicio 2020 (mal nombrado) y trae etiquetas de fila sin sentido, transcripción fallida descartada sin usar. Transcripción completa en Clubes/Grecia/Panathinaikos/Panathinaikos_annual_FR_2025-06-30.md.',
    },
});

gestionesByClub['panathinaikos-gr'] = {
  actual: { nombre:'Gestión actual', firstYear:2025, lastYear:2025 },
};

memberCountByClub['panathinaikos-gr'] = null;
