// GENERADO desde data/gr/panserraikos-gr.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const panserraikosGrRevenueLinesByYear = {
  2023: [
    {"rawLabel":"Έσοδα από εισιτήρια","normalizedCategory":"matchday_competition","amountNative":0.173084,"disclosureLevel":"aggregated"},
    {"rawLabel":"Χορηγίες και διαφημίσεις","normalizedCategory":"sponsorship_commercial","amountNative":0.387016,"disclosureLevel":"aggregated"},
    {"rawLabel":"Δικαιώματα αναμετάδοσης","normalizedCategory":"broadcasting","amountNative":0.077492,"disclosureLevel":"aggregated"},
    {"rawLabel":"Άλλα λειτουργικά έσοδα","normalizedCategory":"other_income","amountNative":0.043795,"disclosureLevel":"aggregated"},
    {"rawLabel":"Αποζημίωση ειδικού σκοπού COVID","normalizedCategory":"grants_donations","amountNative":0.005336,"disclosureLevel":"aggregated"},
    {"rawLabel":"Κέρδη/ζημίες από τη διάθεση (μετεγγραφών) και αποχώρηση ποδοσφαιριστών","normalizedCategory":"player_sales","amountNative":0.186319,"disclosureLevel":"aggregated"},
    {"rawLabel":"Λοιπά έσοδα/έξοδα μετεγγραφών","normalizedCategory":"player_sales","amountNative":0.1,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"Κύκλος εργασιών","normalizedCategory":"lump_football_operations","amountNative":4.700403,"disclosureLevel":"aggregated"},
    {"rawLabel":"(+) Λοιπά συνήθη έσοδα","normalizedCategory":"other_income","amountNative":1.501129,"disclosureLevel":"aggregated"},
    {"rawLabel":"Κέρδη από διάθεση μη κυκλοφορούντων","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
    {"rawLabel":"Λοιπά έσοδα και κέρδη","normalizedCategory":"other_income","amountNative":0,"disclosureLevel":"aggregated"},
  ],
};

const panserraikosGrExpenseLinesByYear = {
  2023: [
    {"rawLabel":"Δαπάνη παροχών προς εργαζομένους (ποδοσφαιριστών και λοιπών εργαζομένων )","normalizedCategory":"wages_squad","amountNative":-0.514544,"disclosureLevel":"aggregated"},
    {"rawLabel":"Απόσβεση και απομείωση ενσωματών παγίων στοιχείων ενεργητικού","normalizedCategory":"depreciation","amountNative":-0.002435,"disclosureLevel":"aggregated"},
    {"rawLabel":"Άλλα λειτουργικά έξοδα","normalizedCategory":"other_expenses","amountNative":-0.495685,"disclosureLevel":"aggregated"},
    {"rawLabel":"Απόσβεση εγγραφών ποδοσφαιριστών και απομείωση εγγραφών ποδοσφαιριστών","normalizedCategory":"player_amortisation","amountNative":-0.63656,"disclosureLevel":"aggregated"},
    {"rawLabel":"Μη λειτουργικά έσοδα / έξοδα","normalizedCategory":"other_expenses","amountNative":-0.102569,"disclosureLevel":"aggregated"},
  ],
  2025: [
    {"rawLabel":"(-) Κόστος πωλήσεων","normalizedCategory":"lump_football_operations_expense","amountNative":-2.407198,"disclosureLevel":"aggregated"},
    {"rawLabel":"Έξοδα διοίκησης","normalizedCategory":"admin_general_expense","amountNative":-2.153245,"disclosureLevel":"aggregated"},
    {"rawLabel":"Έξοδα διάθεσης","normalizedCategory":"admin_general_expense","amountNative":-1.741122,"disclosureLevel":"aggregated"},
    {"rawLabel":"Λοιπά έξοδα και ζημιές","normalizedCategory":"other_expenses","amountNative":-0.120579,"disclosureLevel":"aggregated"},
  ],
};

const panserraikosGrFiscalYearMeta = {
  2023: {"currency":"EUR","sourceId":"panserraikos-gr-income-stmt-2023-06-30","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2023-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.00318,"tax":0,"grossDebt":0,"cash":0.118978,"officialTotalRevenue":0.973043,"officialTotalExpenses":1.751793,"officialPAT":-0.78193,"extraRows":[{"label":"Χρηματοοικονομικά έσοδα και έξοδα","value":-0.00318},{"label":"Φορολογικά έσοδα / δαπάνες","value":0}],"baseIngreso":"full"},
  2025: {"currency":"EUR","sourceId":"panserraikos-gr-income-stmt-2025-06-30","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.011172,"tax":0,"grossDebt":0.009,"cash":0.203968,"officialTotalRevenue":6.201533,"officialTotalExpenses":6.422144,"officialPAT":-0.231783,"extraRows":[{"label":"Χρεωστικοί τόκοι και συναφή έξοδα","value":-0.011172},{"label":"(-) Πιστωτικοί τόκοι και συναφή έσοδα","value":0},{"label":"Μείον: Φόροι εισοδήματος","value":0}],"sinDesglose":[{"renglon":"Κύκλος εργασιών","lado":"revenue","importe":4.700403,"motivo":"el documento no desglosa este renglón","tipo":"net_sales"},{"renglon":"(-) Κόστος πωλήσεων","lado":"expense","importe":2.407198,"motivo":"Claude 2026-10-13 (subagente Sonnet): Precedente griego exacto y aceptado por Guido: 'Κόστος πωλήσεων' sin nota que lo abra -> lump_football_operations_expense en AEL (3 años), Levadiakos, OFI y Asteras (data/gr/aellarissa-gr-data.js L103-L115, levadiakos L40-L76). Es el caso real de 'el documento no desglosa' (§1, lump) y no un encabezado con líneas debajo. Matiz a tener presente: costo de ventas, gastos de administración y de venta suben exactamente igual (+52,56 %), señal de que el club repartió su gasto total entre funciones por porcentajes fijos, o sea que 'Κόστος πωλήσεων' no es solo fútbol puro; igual no hay con qué abrirlo y los otros dos renglones ya son admin_general_expense. Cita: Clubes/Grecia/Panserraikos/Panserraikos_income_stmt_2025-06-30.md L16: '(-) Κόστος πωλήσεων | 2.407.197,70 | 1.577.842,26' = 'costo de ventas', estado 'por función' (Κατάσταση αποτελεσμάτων κατά λειτουργία, L8). Sin desglose por naturaleza en notes_2025 (anexo de micro-entidad) ni en audit/board_minutes 2025 (Panserraikos_board_minutes_2025-06-30.md L72 solo repite el total).","tipo":"cost_of_sales"}],"baseIngreso":"full"},
};

const panserraikosGrPresupuestoOverlayByYear = {};

const panserraikosGrPasesData = [];
const panserraikosGrResultadosData = {};
const panserraikosGrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["panserraikos-gr"] = {
  revenueLinesByYear: panserraikosGrRevenueLinesByYear, expenseLinesByYear: panserraikosGrExpenseLinesByYear,
  fiscalYearMeta: panserraikosGrFiscalYearMeta, pasesData: panserraikosGrPasesData,
  resultadosData: panserraikosGrResultadosData, titulosData: panserraikosGrTitulosData,
  presupuestoOverlayByYear: panserraikosGrPresupuestoOverlayByYear,
};

Object.assign(sources, {"panserraikos-gr-income-stmt-2023-06-30":{"id":"panserraikos-gr-income-stmt-2023-06-30","clubId":"panserraikos-gr","title":"Mousikogymnastikos Syllogos Panserraikos P.A.E. — Panserraikos_income_stmt_2023-06-30 (ejercicio 2023)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Grecia/Panserraikos/Panserraikos_income_stmt_2023-06-30.pdf"},"panserraikos-gr-income-stmt-2025-06-30":{"id":"panserraikos-gr-income-stmt-2025-06-30","clubId":"panserraikos-gr","title":"Mousikogymnastikos Syllogos Panserraikos P.A.E. — Panserraikos_income_stmt_2025-06-30 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Grecia/Panserraikos/Panserraikos_income_stmt_2025-06-30.pdf"}});

memberCountByClub["panserraikos-gr"] = null;
