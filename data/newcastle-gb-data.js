// ============================================================================
// data/newcastle-gb-data.js — Newcastle United (Inglaterra, Premier League), clubId 'newcastle-gb'.
//
// Fuente: cuentas CONSOLIDADAS del grupo de Newcastle United Limited (Companies House n° 02529667),
// depositadas en Companies House UK. Ejercicio cerrado el 30 de junio de 2025 (temporada 2024/25),
// único ejercicio con transcripción disponible. Transcripción completa en
// Clubes/Inglaterra/Newcastle United/newcastle-united-group-accounts-2024-25.md.
//
// amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO, mismo criterio que
// river-data.js/racing-data.js/everton-gb-data.js.
//
// "Matchday": el propio documento (Nota 2.4, política contable) define este stream como "Season
// ticket and corporate hospitality revenue" + "Season and matchday tickets and corporate hospitality
// income" (Nota 4) — NO separa abonos/season tickets de entradas partido a partido ni de hospitality.
// Se carga entera a matchday_competition (criterio de "no forzar una separación que el dato no
// permite"). No afecta el total de la fila "Estadio" de Formato Simplificado (matchday_competition +
// season_tickets + stadium_other comparten esa fila).
//
// "UEFA" en $0: el club no participó en competencias UEFA en 2024-25 (pese a clasificar para la
// UCL 2025-26 por el 5° puesto). Se carga en $0 porque el documento la lista como stream propio de
// Turnover (Nota 4), igual que otros clubes muestran filas en $0 cuando no hubo esa actividad ese año.
//
// GANANCIA POR VENTA DE JUGADORES: "Profit on disposal of players' and staff registrations" es una
// línea NETA del P&L (no bruto ingreso/costo separado) — se suma al revenue total, mismo criterio
// que Everton/Arsenal.
//
// STAFF COSTS: "Staff costs" (Nota 7) es una cifra agregada sin desglose por departamento — toda la
// línea se carga a `wages_squad` completa, mismo criterio que el resto de los clubes ingleses.
//
// "Other operating expenses" NO tiene una línea impresa con este monto exacto en ningún lado del
// documento (el Strategic Report la redondea a £93.2m); se calculó como residuo exacto:
// 344.881 (Operating expenses before amortisation & impairment, P&L) - 243.477 (Staff costs) -
// 8.182 (Depreciation) = 93.222, que reconcilia EXACTO contra el "Total operating expenses" impreso.
//
// GROSSDEBT: "Term loan" (Nota 16/17, Borrowings: dentro de 1 año 58.314 + más de 1 año 0 = 58.314),
// EXCLUYE trade creditors/transfer fees payable/accruals — coincide EXACTO con la propia Nota "Net
// debt reconciliation" del documento. cash = "Cash at bank and in hand" (balance consolidado).
//
// ASSETSALES: 4.158 (Profit on disposal of subsidiary, Nota 14 — venta de Newcastle United Football
// Club Projects Ltd a PZ Holdings Ltd, subsidiaria hermana de la matriz inmediata PZ Newco Ltd) +
// 128.975 (Profit on disposal of tangible fixed assets, Nota 13 — sale-and-leaseback de mejoras del
// leasehold de St James' Park, TAMBIÉN a PZ Holdings Ltd). Las dos son reorganizaciones societarias
// intra-grupo (no venta de jugadores, no CAPEX), mismo criterio que Everton (venta de Everton FC
// Women/Goodison Park a la matriz Roundhouse). OJO: la Nota 3 del documento dice explícitamente que
// la valuación de mercado de la Premier League para el sale-and-leaseback (£172.1m) está sujeta a
// revisión, y que un ajuste retroactivo podría cambiar esta cifra en las cuentas 2025-26 — ver
// Admin/dudas-por-club.md.
//
// PROPIEDAD: el documento solo dice "the ultimate parent undertaking and ultimate controlling party
// is the Public Investment Fund" (inmediata: PZ Newco Limited), sin dar porcentajes. Amanda Staveley
// renunció al directorio y desinvirtió su participación en julio de 2024 (dentro de este ejercicio).
// Según prensa (no confirmado contra el registro PSC de Companies House, ver duda): PIF ~85%, Reuben
// Brothers (RB Sports & Media) ~15% tras esa salida.
// ============================================================================

const newcastleGbRevenueLinesByYear = {
  // Ejercicio 2025 (cerrado 30/6/2025). Fuente: Nota 4 "Turnover" + P&L account (Profit on disposal
  // of players' and staff registrations). Suma exacta a £355.197m (335.322 de Turnover + 19.875 de
  // profit on player trading).
  2025: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:51.560, disclosureLevel:'detailed' },
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:161.066, disclosureLevel:'detailed' },
    { rawLabel:'UEFA', normalizedCategory:'broadcasting', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Commercial', normalizedCategory:'sponsorship_commercial', amountNative:120.179, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:2.517, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' and staff registrations', normalizedCategory:'player_sales', amountNative:19.875, disclosureLevel:'detailed' },
  ],
};

const newcastleGbExpenseLinesByYear = {
  // Ejercicio 2025. Fuente: Nota 7 "Employees" (staff costs), Strategic Report "Financial overview"
  // y Nota 12/5 (Amortisation/Impairment of players' registrations). Suma exacta a -£444.749m =
  // officialTotalExpenses (sin exceptional_items, este ejercicio no tuvo ninguno).
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-243.477, disclosureLevel:'detailed' },
    { rawLabel:'Other operating expenses (residuo exacto, sin línea propia impresa)', normalizedCategory:'other_expenses', amountNative:-93.222, disclosureLevel:'estimated' },
    { rawLabel:'Depreciation', normalizedCategory:'depreciation', amountNative:-8.182, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of players\' registrations', normalizedCategory:'player_amortisation', amountNative:-99.502, disclosureLevel:'detailed' },
    { rawLabel:'Impairment of players\' registrations', normalizedCategory:'player_impairment', amountNative:-0.366, disclosureLevel:'detailed' },
  ],
};

const newcastleGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'newcastle-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'pifreuben',
    grossDebt:58.314, cash:12.701,
    profitOnPlayerSales:0, assetSales:133.133, netInterest:-8.853, tax:0,
    officialTotalRevenue:355.197, officialTotalExpenses:444.749, officialPAT:34.728,
  },
};

const newcastleGbPresupuestoOverlayByYear = {};
const newcastleGbPasesData = [];
const newcastleGbResultadosData = {};
const newcastleGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['newcastle-gb'] = {
  revenueLinesByYear: newcastleGbRevenueLinesByYear, expenseLinesByYear: newcastleGbExpenseLinesByYear,
  fiscalYearMeta: newcastleGbFiscalYearMeta, pasesData: newcastleGbPasesData,
  resultadosData: newcastleGbResultadosData, titulosData: newcastleGbTitulosData,
  presupuestoOverlayByYear: newcastleGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'newcastle-gb-group-accounts-2025': {
    id:'newcastle-gb-group-accounts-2025', clubId:'newcastle-gb',
    title:'Report and Financial Statements (Newcastle United Limited — cuentas consolidadas del grupo), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/02529667/filing-history',
    publicNote:'Cuentas consolidadas del grupo depositadas en Companies House (Reino Unido). Incluye 2 ganancias no operativas por reorganización societaria intra-grupo (venta de una subsidiaria y sale-and-leaseback de mejoras del estadio a una sociedad hermana), registradas aparte del resultado futbolístico.',
    note:'Transcripción completa en Clubes/Inglaterra/Newcastle United/newcastle-united-group-accounts-2024-25.md. Amanda Staveley renunció al directorio y desinvirtió su participación en julio de 2024. Ver comentario de cabecera de data/newcastle-gb-data.js para el detalle completo de categorización.',
  },
});

gestionesByClub['newcastle-gb'] = {
  pifreuben: { nombre:'Public Investment Fund / Reuben Brothers (tras salida de Staveley, jul-2024)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['newcastle-gb'] = null;
