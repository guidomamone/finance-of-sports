// ============================================================================
// data/crystalpalace-gb-data.js — Crystal Palace (Inglaterra, Premier League), clubId
// 'crystalpalace-gb'.
//
// Fuente: cuentas CONSOLIDADAS del grupo de CPFC 2010 Limited (Companies House n° 07206409),
// auditadas por RSM UK Audit LLP, depositadas en Companies House UK. 2 ejercicios, ambos cerrados
// el 30 de junio:
//   2024: "...for the Year Ended 30 June 2024" (temporada 2023-24, terminó 10°).
//         Transcripción: Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2023-24.md
//   2025: "...for the Year Ended 30 June 2025" (temporada 2024-25, terminó 12°, ganó la FA Cup —
//         primer título mayor de la historia del club). Transcripción:
//         Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md
//
// amountNative en millones de GBP nativos. revenue positivo, expense NEGATIVO. El documento no
// declara ningún tipo de cambio propio (todo en GBP nativo) -> fxRef, no fx literal.
//
// "Gate receipts" mezcla ticket sales por partido + "membership income" + preseason tickets en una
// sola línea (misma redacción que Everton) — no hay forma de aislar un componente tipo
// `season_tickets`, se carga entera como `matchday_competition`.
//
// "Other income" 2025 incluye explícito £4.4m de prize money por FA Cup, mezclado con
// alquileres/comisiones comerciales sin línea propia — queda en `other_income` (no
// `competition_bonus`), criterio conservador de no forzar una separación que el dato no permite.
//
// "Staff costs" (Nota 6) es una cifra agregada sin desglose por departamento, se carga entera a
// `wages_squad`, mismo criterio que el resto de los clubes ingleses.
//
// PROPIEDAD: Steve Parish (Chairman) + David Blitzer/Josh Harris (minoritarios) + John Textor
// (Eagle Football Holdings, accionista mayoritario) en los 2 ejercicios. La venta de la
// participación de Textor a Woody Johnson se firmó el 23/6/2025 pero completó el 24/7/2025,
// DESPUÉS del cierre del ejercicio 2025 (30/6/2025) — los 2 ejercicios cargados quedan bajo el
// mismo grupo de control.
//
// brandColor: NO resuelto (ver Admin/dudas-por-club.md) — camiseta a franjas rojo/azul desde 1973,
// sin predominancia declarada por ninguna fuente consultada, mismo caso que Levante. `null` hasta
// que Guido decida.
// ============================================================================

const crystalpalaceGbRevenueLinesByYear = {
  // Ejercicio 2024. Fuente: Nota 3 "Turnover" + P&L (Profit on disposal of players' registrations).
  // Suma turnover (5 líneas) = 190.224 = Turnover impreso. Con player_sales = 191.565 = officialTotalRevenue.
  2024: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:145.451, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:16.104, disclosureLevel:'detailed' },
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:13.809, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:10.167, disclosureLevel:'detailed' },
    { rawLabel:'Other income', normalizedCategory:'other_income', amountNative:4.693, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:1.341, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2025. Suma turnover = 196.623. Con player_sales = 262.701 = officialTotalRevenue.
  2025: [
    { rawLabel:'Broadcasting', normalizedCategory:'broadcasting', amountNative:142.296, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and advertising', normalizedCategory:'sponsorship_commercial', amountNative:19.350, disclosureLevel:'detailed' },
    { rawLabel:'Gate receipts', normalizedCategory:'matchday_competition', amountNative:15.634, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'other_income', amountNative:11.369, disclosureLevel:'detailed' },
    { rawLabel:'Other income (incluye £4,4m de prize money FA Cup, sin línea propia)', normalizedCategory:'other_income', amountNative:7.974, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players\' registrations', normalizedCategory:'player_sales', amountNative:66.078, disclosureLevel:'detailed' },
  ],
};

const crystalpalaceGbExpenseLinesByYear = {
  // Ejercicio 2024. Fuente: Nota 4 "Operating expenses" + Nota 6 "Employees". Suma = -210.942 =
  // "Total operating expenses" impreso = officialTotalExpenses.
  2024: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-133.712, disclosureLevel:'detailed' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-28.038, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-45.951, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-3.241, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2025. Suma = -239.147 = officialTotalExpenses.
  2025: [
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-148.292, disclosureLevel:'detailed' },
    { rawLabel:'Other operating charges', normalizedCategory:'other_expenses', amountNative:-33.032, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of player registrations', normalizedCategory:'player_amortisation', amountNative:-54.147, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of tangible fixed assets', normalizedCategory:'depreciation', amountNative:-3.676, disclosureLevel:'detailed' },
  ],
};

const crystalpalaceGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'crystalpalace-gb-group-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'parish-blitzer-harris-textor',
    // grossDebt = Nota 2 "Analysis of changes in net debt": Finance leases 1.458 + Advances under
    // funding agreement 48.052 + Bank loans 31.879 + Loans from parent company 76.516 = 157.905
    // (coincide exacto con el "Total" debt de esa nota). cash = "Cash at bank and in hand".
    grossDebt:157.905, cash:9.036,
    // assetSales = "Profit on disposal of plant & machinery". netInterest = interest receivable
    // (0.593) - interest payable (14.606) + foreign exchange gains/(losses) (0.452).
    profitOnPlayerSales:0, assetSales:0.007, netInterest:-13.561, tax:0,
    officialTotalRevenue:191.565, officialTotalExpenses:210.942, officialPAT:-32.931,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'crystalpalace-gb-group-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'parish-blitzer-harris-textor',
    // grossDebt = Nota 2: Finance leases 1.795 + Advances under funding agreement 63.543 + Bank
    // loans 30.097 + Loans from parent company 26.483 = 121.918.
    grossDebt:121.918, cash:13.715,
    // 2025 tuvo PÉRDIDA en disposal de plant & machinery (no ganancia): -0.161. netInterest =
    // interest receivable (1.794) - interest payable (16.707) - foreign exchange losses (0.215).
    profitOnPlayerSales:0, assetSales:-0.161, netInterest:-15.128, tax:0,
    officialTotalRevenue:262.701, officialTotalExpenses:239.147, officialPAT:8.265,
  },
};

const crystalpalaceGbPresupuestoOverlayByYear = {};
const crystalpalaceGbPasesData = [];
const crystalpalaceGbResultadosData = {};
const crystalpalaceGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['crystalpalace-gb'] = {
  revenueLinesByYear: crystalpalaceGbRevenueLinesByYear, expenseLinesByYear: crystalpalaceGbExpenseLinesByYear,
  fiscalYearMeta: crystalpalaceGbFiscalYearMeta, pasesData: crystalpalaceGbPasesData,
  resultadosData: crystalpalaceGbResultadosData, titulosData: crystalpalaceGbTitulosData,
  presupuestoOverlayByYear: crystalpalaceGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'crystalpalace-gb-group-accounts-2024': {
    id:'crystalpalace-gb-group-accounts-2024', clubId:'crystalpalace-gb',
    title:'Group accounts (CPFC 2010 Limited), ejercicio cerrado 30/6/2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/07206409/filing-history',
    note:'Cuentas consolidadas del grupo, auditadas por RSM UK Audit LLP, depositadas en Companies House (Reino Unido). Transcripción completa en Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2023-24.md. Ver comentario de cabecera de data/crystalpalace-gb-data.js.',
  },
  'crystalpalace-gb-group-accounts-2025': {
    id:'crystalpalace-gb-group-accounts-2025', clubId:'crystalpalace-gb',
    title:'Group accounts (CPFC 2010 Limited), ejercicio cerrado 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/07206409/filing-history',
    publicNote:'Temporada de la primera FA Cup de la historia del club (2024-25).',
    note:'Transcripción completa en Clubes/Inglaterra/Crystal Palace/cpfc2010-group-accounts-2024-25.md. La venta de la participación mayoritaria de John Textor (Eagle Football Holdings) a Woody Johnson completó el 24/7/2025, después del cierre de este ejercicio.',
  },
});

gestionesByClub['crystalpalace-gb'] = {
  'parish-blitzer-harris-textor': { nombre:'Parish / Blitzer-Harris / Textor', firstYear:2024, lastYear:2025 },
};

memberCountByClub['crystalpalace-gb'] = null;
