// ============================================================================
// data/silkeborg-dk-data.js — Silkeborg IF A/S (clubId 'silkeborg-dk'), Dinamarca.
// Ejercicio fiscal 2024 (año CALENDARIO, 1° de enero a 31 de diciembre de 2024,
// `fiscalYearStart:'01-01'`, mismo criterio que fckobenhavn-dk).
//
// ENTIDAD: Silkeborg IF A/S (CVR 26397731), entidad única, sin subsidiarias
// consolidadas — el propio documento describe la actividad como "operation of football
// activities... including contract football, investing in sales rights related to
// professional athletes... talent development" MÁS "food and beverage activities" y "the
// operational tasks associated with managing the pitch and building complex at JYSK
// Park" (el club gestiona su propio estadio, sin una sociedad separada tipo Atletion de
// AGF). Auditor: BDO Statsautoriseret revisionsaktieselskab, sin salvedades. Informe
// anual en INGLÉS (Silkeborg lo publica bilingüe/en inglés directamente, no hubo que
// traducir del danés).
//
// OJO — CAMBIO DE CONTROL A FIN DE EJERCICIO: el 18/12/2024 Trivela Group V ApS compró
// el 80% del capital (antes 100% de Papirfabrikken Invest A/S, ex-Silkeborg IF Invest
// A/S) — no afecta la carga del ejercicio 2024 en sí, pero explica el dividendo
// extraordinario de DKK 34,1M distribuido ese mismo ejercicio (nota 9/17).
//
// Fuente: transcripción completa en "Clubes/Dinamarca/Silkeborg IF/aarsrapport-2024-12-31.md".
//
// Cifras en DKK MILLONES nativos (documento en DKK'000, dividido por 1.000 al cargar,
// mismo criterio que fckobenhavn-dk/brondby-dk/midtjylland-dk/agf-dk).
// `fxRef:'DKK@2024-12-31'` — ENTRADA YA EXISTENTE en data/currency-map.js (fx=7,1786,
// cierre BCE 31/12/2024), no hizo falta agregar nada nuevo (a diferencia de agf-dk/
// osijek-hr/slavenbelupo-hr).
//
// CATEGORIZACIÓN DE INGRESOS (Note 2 "Revenue", 2024 = 93.516, verificado exacto):
//   - "Entrance fees" 9.756 → matchday_competition.
//   - "TV revenue" 25.150 → broadcasting.
//   - "Sponsorship and collaboration agreements" 28.640 → sponsorship_commercial.
//   - "Sale of merchandise" 531 → sponsorship_commercial (mismo criterio que
//     merchandising de fckobenhavn-dk/agf-dk).
//   - "Compensation (FIFA/UEFA/DBU)" 6.188 + "Prize income" 6.711 → competition_bonus,
//     12.899 combinado (los dos son pagos ligados a competencias/formación de UEFA-FIFA-
//     DBU, no recaudación de boletería).
//   - "Food & beverage JYSK PARK" 6.454 → stadium_other (mismo criterio que fckobenhavn-
//     dk/agf-dk: concesiones del estadio fuera del partido).
//   - "Other revenue" 10.086 → other_income.
//   Note 3 "Other operating income" (61.614):
//   - "Transfer income" 61.343 → player_sales. La nota de política contable ("Balance
//     sheet — Intellectual property rights etc") aclara que "Profits and losses on the
//     disposal of contractual rights are calculated as the difference between the sales
//     price less sales costs and the carrying amount at the time of sale" — o sea que
//     este monto YA es un resultado neto de disposición (ingreso bruto menos valor
//     libro), igual que "Andre driftsindtægter" de fckobenhavn-dk/agf-dk, no un ingreso
//     bruto de venta con un costo separado en otro lado. Se carga como línea ordinaria
//     player_sales (mismo criterio que esos 2 clubes), profitOnPlayerSales:0.
//   - "Salary refunds" 271 → other_income (reembolsos de sueldo, ej. por licencia/subsidio).
//   - "Public subsidies" 0 y "Sale of property, plant and equipment" 0 este ejercicio, no
//     se cargan líneas (monto cero).
//
// CATEGORIZACIÓN DE GASTOS:
//   Note 4 "Other external expenses" (35.414, desglosada solo en TEXTO, no en tabla, pero
//   con 3 cifras exactas): "match and player expenses" 19.980 → match_organisation_expense;
//   "sales and administrative expenses" 14.315 → admin_general_expense; "other staff
//   costs" 1.119 → admin_general_expense (costo de personal RESIDUAL, distinto de la línea
//   "Staff costs" del cuerpo del income statement — el propio texto de la nota los separa).
//   19.980+14.315+1.119=35.414 ✓ exacto.
//   Note 5 "Staff costs" (46.801, SIN desglose entre plantel profesional y resto del
//   personal — "Average number of full-time employees 66... includes 30 contract
//   players", mismo caso que fckobenhavn-dk/agf-dk) → wages_squad, la cifra completa
//   (Wages and salaries 44.259 + Pension costs 1.954 + Other social security costs 588).
//   "Depreciation, amortisation and impairment losses" (12.444, del cuerpo del income
//   statement) SÍ se puede separar cruzando las notas 10 y 11: Note 10 "Amortisation for
//   the year" de "Acquired intangible assets" (contractual rights = registraciones de
//   jugadores, según la política contable "Intellectual property rights etc") = 4.371 →
//   player_amortisation. Note 11 "Depreciation for the year" de "Other fixtures and
//   fittings, tools and equipment" (4.023) + "Leasehold improvements" (4.050) = 8.073 →
//   depreciation. 4.371+8.073=12.444 ✓ exacto contra el income statement.
//
// RESULTADOS FINANCIEROS: "Other financial income" (Note 6: Financial income from group
// enterprises 1.136 + Other interest income 442 = 1.578) - "Other financial expenses"
// (Note 7: Other interest expenses 209) = netInterest 1.369 (fiscalYearMeta, coincide
// EXACTO con "Net financials 1,369" de la tabla de 5 años de la Management commentary).
//
// IMPUESTO: "Tax on profit/loss for the year" = 13.600 (GASTO, Note 8: Current tax
// 14.397 + cambio en deferred tax -797) → tax:-13.600.
//
// VERIFICACIÓN (regla #1 de CLAUDE.md, "precisión antes que velocidad"):
//   revenueLines suman 155.130 (93.516 Revenue + 61.614 Other operating income) =
//   officialTotalRevenue.
//   expenseLines suman 94.659 (35.414 Other external expenses + 46.801 Staff costs +
//   12.444 Depreciation/amortisation) = officialTotalExpenses.
//   155.130 - 94.659 = 60.471, EXACTO igual a "Operating profit/loss" impreso.
//   60.471 + netInterest(1.369) = 61.840, EXACTO igual a "Profit/loss before tax" impreso.
//   61.840 + tax(-13.600) = 48.240, EXACTO igual a "Profit/loss for the year"
//   (officialPAT) impreso. Cierre perfecto en tres pasos, cada uno contra un subtotal
//   impreso del documento.
//
// grossDebt: no hay ninguna línea de préstamo bancario en el balance — los pasivos son
//   "Prepayments received from customers" (ingresos diferidos, no deuda), "Trade
//   payables", "Payables to shareholders and management" (14.048, un pasivo con partes
//   relacionadas, no un préstamo bancario etiquetado como tal), "Joint taxation
//   contribution payable" y "Other payables". Se cargó grossDebt:0 (aproximación — ver
//   reporte de carga, "Payables to shareholders and management" podría discutirse como
//   deuda relacionada pero el documento no lo etiqueta como préstamo). cash: "Cash" = 20.522.
// ============================================================================

const silkeborgdkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Entrance fees', normalizedCategory:'matchday_competition', amountNative:9.756, disclosureLevel:'detailed' },
    { rawLabel:'TV revenue', normalizedCategory:'broadcasting', amountNative:25.150, disclosureLevel:'detailed' },
    { rawLabel:'Sponsorship and collaboration agreements', normalizedCategory:'sponsorship_commercial', amountNative:28.640, disclosureLevel:'detailed' },
    { rawLabel:'Sale of merchandise', normalizedCategory:'sponsorship_commercial', amountNative:0.531, disclosureLevel:'detailed' },
    { rawLabel:'Compensation (FIFA/UEFA/DBU) + Prize income', normalizedCategory:'competition_bonus', amountNative:12.899, disclosureLevel:'detailed', items:[
      ['Compensation (FIFA/UEFA/DBU)', 6.188], ['Prize income', 6.711],
    ]},
    { rawLabel:'Food & beverage JYSK PARK', normalizedCategory:'stadium_other', amountNative:6.454, disclosureLevel:'detailed' },
    { rawLabel:'Other revenue', normalizedCategory:'other_income', amountNative:10.086, disclosureLevel:'detailed' },
    { rawLabel:'Salary refunds', normalizedCategory:'other_income', amountNative:0.271, disclosureLevel:'detailed' },
    { rawLabel:'Transfer income', normalizedCategory:'player_sales', amountNative:61.343, disclosureLevel:'detailed' },
  ],
};

const silkeborgdkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Other external expenses — match and player expenses', normalizedCategory:'match_organisation_expense', amountNative:-19.980, disclosureLevel:'detailed' },
    { rawLabel:'Other external expenses — sales and administrative expenses + other staff costs', normalizedCategory:'admin_general_expense', amountNative:-15.434, disclosureLevel:'detailed', items:[
      ['Sales and administrative expenses', -14.315], ['Other staff costs', -1.119],
    ]},
    { rawLabel:'Staff costs', normalizedCategory:'wages_squad', amountNative:-46.801, disclosureLevel:'detailed', items:[
      ['Wages and salaries', -44.259], ['Pension costs', -1.954], ['Other social security costs', -0.588],
    ]},
    { rawLabel:'Depreciation, amortisation and impairment losses — property, plant and equipment', normalizedCategory:'depreciation', amountNative:-8.073, disclosureLevel:'detailed', items:[
      ['Other fixtures and fittings, tools and equipment', -4.023], ['Leasehold improvements', -4.050],
    ]},
    { rawLabel:'Depreciation, amortisation and impairment losses — acquired intangible assets (contractual rights)', normalizedCategory:'player_amortisation', amountNative:-4.371, disclosureLevel:'detailed' },
  ],
};

const silkeborgdkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-12-31',
    sourceId:'silkeborg-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, // ya capturado íntegro en player_sales (Transfer income, resultado neto de disposición)
    assetSales:0,
    // Other financial income(1.578) - Other financial expenses(209).
    netInterest:1.369,
    // Tax on profit/loss for the year: Current tax(14.397) + cambio en deferred tax(-797).
    tax:-13.600,
    grossDebt:0, cash:20.522,
    officialTotalRevenue:155.130, officialTotalExpenses:94.659, officialPAT:48.240,
  },
};

const silkeborgdkPresupuestoOverlayByYear = {};

const silkeborgdkPasesData = [];
const silkeborgdkResultadosData = {};
const silkeborgdkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['silkeborg-dk'] = {
  revenueLinesByYear: silkeborgdkRevenueLinesByYear, expenseLinesByYear: silkeborgdkExpenseLinesByYear,
  fiscalYearMeta: silkeborgdkFiscalYearMeta, pasesData: silkeborgdkPasesData,
  resultadosData: silkeborgdkResultadosData, titulosData: silkeborgdkTitulosData,
  presupuestoOverlayByYear: silkeborgdkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'silkeborg-aarsrapport-2024': {
    id:'silkeborg-aarsrapport-2024', clubId:'silkeborg-dk',
    title:'Silkeborg IF A/S — Annual report 2024 (01.01.2024 - 31.12.2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Entidad única (CVR 26397731), sin subsidiarias consolidadas. Auditor: BDO Statsautoriseret revisionsaktieselskab, sin salvedades. Cambio de control societario el 18/12/2024 (Trivela Group V ApS compró 80% del capital), no afecta las cifras del ejercicio 2024. Transcripción completa en Clubes/Dinamarca/Silkeborg IF/aarsrapport-2024-12-31.md.',
  },
});

memberCountByClub['silkeborg-dk'] = null;
