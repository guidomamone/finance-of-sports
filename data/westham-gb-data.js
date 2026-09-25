// ============================================================================
// data/westham-gb-data.js — West Ham United Football Club Limited (clubId 'westham-gb'),
// Ejercicio 2024/25 único (1° de junio de 2024 a 31 de mayo de 2025, confirmado en la carátula:
// "For the year ended 31 May 2025"). Solo hay UNA transcripción disponible para este club (a
// diferencia de Forest/Sunderland/Wolves, que tienen 2 ejercicios).
//
// ENTIDAD LEGAL: "West Ham United Football Club Limited", Company Registration No. 66516
// (Companies House, UK). Cuentas INDIVIDUALES (exenta de consolidar bajo Section 400 del Companies
// Act 2006; subsidiaria de WH Holding Limited, que sí publica consolidadas, no cargadas acá).
//
// Fuente: transcripción completa en Clubes/Inglaterra/West Ham United/west-ham-united-full-
// accounts-2024-25.md.
//
// Cifras en GBP MILLONES nativos (documento en £'000, dividido por 1.000 al cargar). `fxRef`
// ('GBP@2025-05-31', ya en FX_CLOSE desde la sesión de Arsenal/Wolves) porque el documento no
// declara un tipo de cambio propio a USD.
//
// ----------------------------------------------------------------------------------------------
// FORMATO DEL DOCUMENTO: el "Statement of Comprehensive Income" de West Ham separa 2 columnas todo
// el estado de resultados ("Operations excluding player trading" / "Player trading"), no solo el
// resultado neto de pases como Everton/Forest — la amortización de pases y el profit on disposal
// están en la columna "Player trading" del inicio a fin. Se cargó igual al resto de los clubes
// (revenueLines/expenseLines planas, sin separar por columna), el shape del sitio no necesita esa
// distinción.
//
// CATEGORIZACIÓN DE INGRESOS (Nota 2 "Turnover by class of business", 4 líneas, + "Other operating
// income" y "Profit on disposal of players" como líneas separadas del cuerpo del Statement):
//   - "Match receipts and related football activities" -> matchday_competition.
//   - "Broadcast and central sponsorship distributions" -> broadcasting.
//   - "Commercial activities" -> sponsorship_commercial.
//   - "Retail and merchandising" -> sponsorship_commercial.
//   - "Other operating income" (Nota 4: "non-trading income... government and other grant income
//     and insurance claims" — insurance claims £1.6m, FIFA Distributions £1.0m, Academy grant
//     Premier League £1.2m, release de grant £0.1m, otros £0.1m) -> other_income (mismo criterio que
//     Everton: no es sponsorship ni recaudación, es no-trading).
//   - "Profit on disposal of players" (Nota 6, línea NETA en la columna "Player trading", después de
//     "Operating (loss)") -> revenueLine con player_sales, mismo criterio que Forest/Sunderland/
//     Everton/Arsenal (meta.profitOnPlayerSales queda en 0 para no duplicar).
//
// CATEGORIZACIÓN DE GASTOS (Nota 4 "Operating (Loss)/profit is stated after charging/(crediting)" +
// Nota 5 "Staff Costs"): "Operating costs" (columna "Operations excluding player trading",
// £240.016m) es un total que NO se desglosa por naturaleza más allá de lo que la Nota 4 revela
// (Employment costs, Amortisation —que en realidad va en la columna Player trading, no acá—,
// Depreciation, auditor's fees, operating leases; los créditos de la nota —PL Youth Academy grant,
// FX gain, insurance claims— son los MISMOS que ya se cargaron como "Other operating income" arriba,
// no una resta adicional).
//   - "Employment costs" (Nota 5: Wages and salaries + Social security + Other pension costs) ->
//     wages_squad (agregado único, mismo gotcha que el resto de los clubes ingleses: no separa
//     plantel del resto del personal, solo da headcount por área en la Nota 5, no costo).
//   - "Amortisation of intangible fixed assets" (columna Player trading) -> player_amortisation.
//   - "Depreciation on tangible fixed assets" -> depreciation.
//   - Residual ("Operating costs" £240.016m − Employment costs − Depreciation, que incluye fees de
//     auditoría, operating leases, y todo el resto de costos operativos/administrativos/de partido
//     sin nombre propio en el documento) -> other_expenses.
//   - "Exceptional items" (Nota 3): £0 en 2025 (solo £562k en 2024, comparativo) — no se cargó
//     ninguna línea para este ejercicio.
//
// "netInterest" = Interest receivable (Nota 7: bank interest + interest implícito por descuento de
// cuentas por cobrar de pases a largo plazo) − Interest payable (Nota 8). "tax" = +0.581 (CRÉDITO
// impositivo, Nota 9 — señal correcta: "(Loss) before taxation (108.842) + Tax 0.581 = (Loss) after
// taxation (108.261)"). "assetSales"/"profitOnPlayerSales" = 0 (ya en revenueLines).
//
// GROSSDEBT: se excluyeron "Amounts owed to Group undertakings" (36.354) y "Amount owed to parent
// company" (176.306) — financiamiento intra-grupo, mismo criterio que Forest/Sunderland — y
// "Creditors arising from player transfers" (deuda comercial por compra de pases, no financiera). Se
// cargó la deuda financiera real (Nota 15/16/17): Bank overdraft (16.311, dentro de 1 año) + Bank
// loan/secured loan (1.621 dentro de 1 año + 2.256 después de 1 año, préstamo Barclays para Rush
// Green, repagado en su totalidad el 29/8/2025, evento posterior al cierre) + Debenture loans (0.611,
// "Hammers Bond Scheme" 1991-92, no genera interés pero es una obligación financiera formal) = 20.799.
// cash = "Cash at bank and in hand" del balance (0.422).
//
// VERIFICACIÓN (a mano, contra los totales impresos): revenueLines suman 249.908 =
// officialTotalRevenue (Turnover 226.058 + Other operating income 3.896 + Profit on disposal
// 19.954). expenses(wages+other_expenses) + nonCash(amortisation+depreciation) = -237.414 +
// (-102.010) = -339.424 = officialTotalExpenses EXACTO (Operating costs 240.016 + Amortisation
// 99.408 impreso, columna "Total"). + netInterest (-19.326) + tax (0.581) = -108.261 = officialPAT
// EXACTO ("(Loss) / profit after taxation" impreso). Cierra exacto, sin residuo.
// ============================================================================

const westhamGbRevenueLinesByYear = {
  2025: [
    { rawLabel:'Match receipts and related football activities', normalizedCategory:'matchday_competition', amountNative:38.573, disclosureLevel:'detailed' },
    { rawLabel:'Broadcast and central sponsorship distributions', normalizedCategory:'broadcasting', amountNative:132.382, disclosureLevel:'detailed' },
    { rawLabel:'Commercial activities', normalizedCategory:'sponsorship_commercial', amountNative:41.437, disclosureLevel:'detailed' },
    { rawLabel:'Retail and merchandising', normalizedCategory:'sponsorship_commercial', amountNative:13.666, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:3.896, disclosureLevel:'detailed' },
    { rawLabel:'Profit on disposal of players', normalizedCategory:'player_sales', amountNative:19.954, disclosureLevel:'detailed' },
  ],
};

const westhamGbExpenseLinesByYear = {
  2025: [
    { rawLabel:'Employment costs', normalizedCategory:'wages_squad', amountNative:-173.335, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation of intangible fixed assets', normalizedCategory:'player_amortisation', amountNative:-99.408, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation on tangible fixed assets', normalizedCategory:'depreciation', amountNative:-2.602, disclosureLevel:'detailed' },
    { rawLabel:'Otros costos operativos (Operating costs no desglosados por naturaleza, neto de employment costs/depreciación)', normalizedCategory:'other_expenses', amountNative:-64.079, disclosureLevel:'aggregated' },
  ],
};

const westhamGbFiscalYearMeta = {
  2025: {
    currency:'GBP', fxRef:'GBP@2025-05-31',
    sourceId:'westham-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'sullivan',
    // grossDebt = Bank overdraft (16.311) + Secured loan (1.621+2.256) + Debenture loans (0.611),
    // ver comentario de cabecera. cash = "Cash at bank and in hand".
    grossDebt:20.799, cash:0.422,
    profitOnPlayerSales:0, assetSales:0, netInterest:-19.326, tax:0.581,
    officialTotalRevenue:249.908, officialTotalExpenses:339.424, officialPAT:-108.261,
  },
};

const westhamGbPresupuestoOverlayByYear = {};

const westhamGbPasesData = [];
const westhamGbResultadosData = {};
const westhamGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['westham-gb'] = {
  revenueLinesByYear: westhamGbRevenueLinesByYear, expenseLinesByYear: westhamGbExpenseLinesByYear,
  fiscalYearMeta: westhamGbFiscalYearMeta, pasesData: westhamGbPasesData,
  resultadosData: westhamGbResultadosData, titulosData: westhamGbTitulosData,
  presupuestoOverlayByYear: westhamGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'westham-gb-full-accounts-2025': {
    id:'westham-gb-full-accounts-2025', clubId:'westham-gb',
    title:'West Ham United Football Club Limited — Annual Report and Financial Statements, year ended 31 May 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00066516/filing-history',
    publicNote:'Cuentas individuales auditadas de West Ham United Football Club Limited, depositadas en Companies House (Reino Unido). Ejercicio cerrado el 31 de mayo de 2025 (temporada 2024/25, 14° en la Premier League).',
    note:'PDF con texto nativo, transcripción completa en Clubes/Inglaterra/West Ham United/west-ham-united-full-accounts-2024-25.md. Cuentas individuales, subsidiaria de WH Holding Limited (no consolida, exenta bajo Section 400). No declara tipo de cambio propio (fxRef apunta a FX_CLOSE). Único ejercicio disponible (a diferencia de otros clubes ingleses de esta sesión, no había un 2do PDF transcripto).',
  },
});

// gestionId 'sullivan': propiedad fragmentada del holding controlante (WH Holding Limited) al cierre
// del ejercicio — David Sullivan 38.8% (accionista individual más grande), Daniel Kretinsky 27.0%,
// Estate of David Gold 25.1% (Nota "Ultimate controlling party"). Se usa 'sullivan' como etiqueta
// porque es el mayor accionista individual, sin que eso implique control mayoritario único.
gestionesByClub['westham-gb'] = { sullivan: { nombre:'Sullivan / Kretinsky / Estate of Gold', firstYear:2025, lastYear:2025 } };

memberCountByClub['westham-gb'] = null;
