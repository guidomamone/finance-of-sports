// GENERADO desde data/nl/helmondsport-nl.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const helmondsportNlRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Omzet","normalizedCategory":"lump_football_operations","amountNative":5.135616,"disclosureLevel":"aggregated"},
    {"rawLabel":"Resultaat vergoedingssommen","normalizedCategory":"player_sales","amountNative":0.196967,"disclosureLevel":"aggregated"},
  ],
};

const helmondsportNlExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Afschrijvingen","normalizedCategory":"depreciation","amountNative":-0.056242,"disclosureLevel":"aggregated"},
    {"rawLabel":"Overige kosten","normalizedCategory":"lump_football_operations_expense","amountNative":-7.426289,"disclosureLevel":"aggregated"},
  ],
};

const helmondsportNlFiscalYearMeta = {
  2025: {"currency":"EUR","sourceId":"helmondsport-nl-wf-2024-2025-4ef6ca45","reportType":"official_balance_sheet","gestionId":null,"fxRef":"EUR@2025-06-30","profitOnPlayerSales":0,"assetSales":0,"netInterest":-0.079618,"tax":0,"grossDebt":null,"cash":null,"officialTotalRevenue":5.332583,"officialTotalExpenses":7.482531,"officialPAT":-2.229566,"extraRows":[{"label":"Financiële baten en lasten","value":-0.079618},{"label":"Belastingen","value":null}],"sinDesglose":[{"renglon":"Omzet","lado":"revenue","importe":5.135616,"motivo":"el documento no desglosa este renglón"},{"renglon":"Overige kosten","lado":"expense","importe":7.426289,"motivo":"Claude 2026-10-18 (subagente Sonnet): 'Overige kosten' 7.426.289 NO es un 'otros gastos' comun: el estado reducido de la KvK (Omzet, Afschrijvingen, Overige kosten) lo usa para TODOS los costos operativos salvo la depreciacion (5.135.616 - 56.242 - 7.426.289 = -2.346.915), o sea que incluye sueldos del plantel, staff, estadio y administracion, sin desglose. Dejarlo en other_expenses haria desaparecer los sueldos del club (wagesToTurnover en 0). Corresponde el bolsón lump_football_operations_expense (monto real que la fuente no separa; no se inventa un desglose). Alternativa si Guido prefiere no usar el bolsón: other_expenses, pero con el rawLabel 'Overige kosten' igual. Es una decision de criterio (la regla pide consultarlo a Guido cuando el documento no permite categorizar como Boca). Entidad: Stichting Helmond Sport. [Overige kosten € 7.426.289 (L31); Omzet € 5.135.616 (L29); Bedrijfsr"}]},
};

const helmondsportNlPresupuestoOverlayByYear = {};

const helmondsportNlPasesData = [];
const helmondsportNlResultadosData = {};
const helmondsportNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["helmondsport-nl"] = {
  revenueLinesByYear: helmondsportNlRevenueLinesByYear, expenseLinesByYear: helmondsportNlExpenseLinesByYear,
  fiscalYearMeta: helmondsportNlFiscalYearMeta, pasesData: helmondsportNlPasesData,
  resultadosData: helmondsportNlResultadosData, titulosData: helmondsportNlTitulosData,
  presupuestoOverlayByYear: helmondsportNlPresupuestoOverlayByYear,
};

Object.assign(sources, {"helmondsport-nl-wf-2024-2025-4ef6ca45":{"id":"helmondsport-nl-wf-2024-2025-4ef6ca45","clubId":"helmondsport-nl","title":"Helmond Sport — wf-2024-2025-4ef6ca45 (ejercicio 2025)","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Países Bajos/Helmond Sport/wf-2024-2025-4ef6ca45.pdf"}});

memberCountByClub["helmondsport-nl"] = null;
