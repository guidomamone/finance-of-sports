// GENERADO desde data/co/millonarios-co.json por tools/generar-data.mjs: no editar a mano (se edita el JSON).
const millonariosCoRevenueLinesByYear = {
  2025: [
    {"rawLabel":"Taquilla y venta de boletería","normalizedCategory":"matchday_competition","amountNative":32154.886,"disclosureLevel":"detailed"},
    {"rawLabel":"Venta de artículos deportivos","normalizedCategory":"sponsorship_commercial","amountNative":21656.762,"disclosureLevel":"detailed"},
    {"rawLabel":"Patrocinio y Publicidad","normalizedCategory":"sponsorship_commercial","amountNative":20817.584,"disclosureLevel":"detailed"},
    {"rawLabel":"Participación en eventos internacionales (Conmebol)","normalizedCategory":"competition_bonus","amountNative":1336.208,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros ingresos relacionados con derechos deportivos","normalizedCategory":"player_sales","amountNative":6213.451,"disclosureLevel":"detailed"},
    {"rawLabel":"Academias de fútbol","normalizedCategory":"youth_football","amountNative":8389.643,"disclosureLevel":"detailed"},
    {"rawLabel":"Derechos televisión","normalizedCategory":"broadcasting","amountNative":6686.078,"disclosureLevel":"detailed"},
    {"rawLabel":"Utilidad venta derechos deportivos","normalizedCategory":"player_sales","amountNative":4686.619,"disclosureLevel":"detailed"},
    {"rawLabel":"Regalías y otras actividades de estadio","normalizedCategory":"other_income","amountNative":1461.776,"disclosureLevel":"detailed"},
    {"rawLabel":"Aprovechamientos","normalizedCategory":"other_income","amountNative":1115.077,"disclosureLevel":"detailed"},
    {"rawLabel":"Reintegro de otros costos y gastos","normalizedCategory":"other_income","amountNative":1464.959,"disclosureLevel":"detailed"},
    {"rawLabel":"Otros (auxilios Federación Colombiana de Fútbol, descuentos en compras)","normalizedCategory":"other_income","amountNative":3009.14,"disclosureLevel":"detailed"},
  ],
};

const millonariosCoExpenseLinesByYear = {
  2025: [
    {"rawLabel":"Gasto de personal (plantel profesional + tiendas + academias, sin desglose disponible)","normalizedCategory":"wages_squad","amountNative":-45741.164,"disclosureLevel":"detailed"},
    {"rawLabel":"Costo Deportivo y de Ventas: organización de partidos","normalizedCategory":"match_organisation_expense","amountNative":-11625.263,"disclosureLevel":"detailed","items":[["Gastos del estadio",-9853.896],["Gastos de viaje",-1771.367]]},
    {"rawLabel":"Costo Deportivo y de Ventas: administración y estructura","normalizedCategory":"admin_general_expense","amountNative":-12637.328,"disclosureLevel":"detailed","items":[["Servicios",-3986.646],["Arrendamientos",-2915.817],["Contribuciones y afiliaciones",-2636.54],["Impuestos",-1911.663],["Honorarios",-871.05],["Mantenimiento, seguros y gastos legales",-315.612]]},
    {"rawLabel":"Gastos derechos deportivos y de formación (compra, préstamo e intermediación de jugadores)","normalizedCategory":"player_amortisation","amountNative":-4303.226,"disclosureLevel":"detailed"},
    {"rawLabel":"Costo Deportivo y de Ventas: costo de mercancías y otros","normalizedCategory":"other_expenses","amountNative":-17218.017,"disclosureLevel":"detailed","items":[["Costo de mercancías tiendas y academias",-14922.952],["Otros gastos",-2259.74],["Provisiones de inventario",-17.795],["Castigo deudores",-17.53]]},
    {"rawLabel":"Gastos de Administración","normalizedCategory":"admin_general_expense","amountNative":-8483.046,"disclosureLevel":"detailed","items":[["Gasto de personal y honorarios",-7040.596],["Servicios",-805.418],["Otros gastos",-271.328],["Arrendamientos",-210.665],["Gastos de viaje",-84.34],["Castigo deudores",-18.218],["Contribuciones y afiliaciones",-18.947],["Impuestos",-4.146],["Mantenimiento, seguros y gastos legales",-29.388]]},
    {"rawLabel":"Gravamen a los movimientos financieros (GMF)","normalizedCategory":"admin_general_expense","amountNative":-595.962,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos diversos","normalizedCategory":"other_expenses","amountNative":-344.413,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos extraordinarios (provisiones por contingencias laborales, exjugador Jorge Perlaza)","normalizedCategory":"exceptional_items","amountNative":-256.298,"disclosureLevel":"detailed"},
    {"rawLabel":"Gastos no deducibles","normalizedCategory":"other_expenses","amountNative":-571.403,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización de intangibles (derechos deportivos propios)","normalizedCategory":"player_amortisation","amountNative":-3071.905,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortización convenios deportivos (derechos deportivos en préstamo)","normalizedCategory":"player_amortisation","amountNative":-7078.545,"disclosureLevel":"detailed"},
    {"rawLabel":"Amortizaciones otros","normalizedCategory":"other_amortisation","amountNative":-956.801,"disclosureLevel":"detailed"},
    {"rawLabel":"Depreciación","normalizedCategory":"depreciation","amountNative":-1000.96,"disclosureLevel":"detailed"},
  ],
};

const millonariosCoFiscalYearMeta = {
  2025: {"currency":"COP","sourceId":"millonarios-co-estados-financieros-2025","reportType":"official_balance_sheet","gestionId":"actual","fx":3757.5,"fxSource":"document_close","profitOnPlayerSales":0,"assetSales":0,"netInterest":211.69,"tax":-9.654,"grossDebt":28.34,"cash":6465.046,"officialTotalRevenue":108992.183,"officialTotalExpenses":113628.033,"officialPAT":-4690.112,"baseIngreso":"full"},
};

const millonariosCoPresupuestoOverlayByYear = {};

const millonariosCoPasesData = [];
const millonariosCoResultadosData = {};
const millonariosCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA["millonarios-co"] = {
  revenueLinesByYear: millonariosCoRevenueLinesByYear, expenseLinesByYear: millonariosCoExpenseLinesByYear,
  fiscalYearMeta: millonariosCoFiscalYearMeta, pasesData: millonariosCoPasesData,
  resultadosData: millonariosCoResultadosData, titulosData: millonariosCoTitulosData,
  presupuestoOverlayByYear: millonariosCoPresupuestoOverlayByYear,
};

Object.assign(sources, {"millonarios-co-estados-financieros-2025":{"id":"millonarios-co-estados-financieros-2025","clubId":"millonarios-co","title":"Estados Financieros (auditados), al 31 de diciembre de 2025 y 2024","type":"official_balance_sheet","reliability":"primary","documento":"Clubes/Colombia/Millonarios/estados-financieros-2025.pdf"}});

gestionesByClub["millonarios-co"] = {"actual":{"nombre":"Gestión actual (sin confirmar)","firstYear":2025,"lastYear":2025}};

memberCountByClub["millonarios-co"] = null;
