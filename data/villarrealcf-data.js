// ============================================================================
// data/villarrealcf-data.js — Villarreal C.F., S.A.D., Ejercicio 2023/2024 (1/7/2023 a 30/6/2024).
//
// Único ejercicio disponible en el archivo descargado (1 solo PDF, ver fuentes/España/Villarreal
// CF.md — la búsqueda de esta sesión solo confirmó este año, el 2021-22 quedó pendiente por caída
// temporal de Wayback Machine). Fuente: "Estados Financieros correspondientes al ejercicio anual
// terminado el 30 de junio de 2024", conseguido vía Wayback Machine (villarrealcf.es bloquea la
// descarga directa del PDF con 403) — ver
// Clubes/España/Villarreal CF/cuentas-anuales-2023-2024.pdf y su transcripción en
// cuentas-anuales-2023-2024-cuenta-resultados.md (misma carpeta).
//
// GOTCHA DE EXTRACCIÓN: PDF escaneado sin capa de texto — leído renderizando páginas a imagen
// (pdftoppm -r 150, re-verificado a -r 300 para confirmar signos negativos, ver .md: una primera
// lectura a menor resolución leyó mal el signo de "A.1) OPERACIONES CONTINUADAS", corregido antes de
// cargar).
//
// Cifras en EUR MILLONES nativos (documento en euros completos, dividido por 1.000.000 al cargar).
// Tipo de cambio EUR/USD 1,071 al 30/6/2024 (cotización de cierre BCE de esa fecha — DISTINTA de la
// del resto de los clubes de esta sesión, que cerraron el 30/6/2025). `fx` en fiscalYearMeta va
// INVERTIDO (0,9337 = 1/1,071, EUR por 1 USD, mismo sentido que ARS/COP/BRL/MXN/JPY en el resto del
// sitio) — ver comentario de cabecera de data/realmadrid-data.js para el detalle completo.
//
// DOS APROXIMACIONES ESPECÍFICAS DE ESTE CLUB (el documento tiene MENOS desglose que el resto de los
// clubes españoles cargados esta sesión):
// - La "Importe neto de la cifra de negocios" (119,721562 M) NO se desglosa por concepto (solo
//   "Ventas" vs. "Prestaciones de servicios", sin separar socios/retransmisión/comercial/competición)
//   -> se cargó como UNA sola línea `lump_football_operations` (bolsón sin desglosar, ver
//   club-data-mapping SKILL.md sección 1), no se fuerza una categoría más específica que el
//   documento no sostiene.
// - "Amortización del inmovilizado" (-27,897705 M) tampoco se separa entre jugadores y resto -> se
//   cargó ENTERA como `player_amortisation` (no `depreciation`, a diferencia de Athletic Club): juicio
//   específico de este club, ya que Villarreal es conocido por una actividad de compra/venta de
//   pases mucho más intensa que Athletic (que tiene una razón estructural real, cantera, para casi
//   no amortizar pases). Es una aproximación de bucket único, documentada, no una separación real.
// - "Gastos de personal" tampoco separa plantel deportivo de no deportivo (a diferencia de Atlético/
//   Athletic/Valencia/Sevilla) -> TODO a wages_squad.
//
// VERIFICACIÓN (ver .md para el detalle completo, incluye el ajuste de "Otros gastos de gestión
// corriente" como residuo contra el subtotal impreso por un dígito potencialmente mal leído en el
// escaneo): Revenue 128,285896 M - Expenses cash 141,885991 M - Non-cash 27,897705 M = Operating
// profit -41,497800 M; + profitOnPlayerSales 26,425834 M = -15,071966 M ≈ A.1) RESULTADO
// OPERACIONES CONTINUADAS impreso (-15.071.965,48) EXACTO; + netInterest -0,945099 M = -16,017065 M
// ≈ A.3) RESULTADO ANTES DE IMPUESTO impreso (-16.017.064,65) EXACTO; + tax +1,895827 M =
// -14,121238 M ≈ A.4/A.5) RESULTADO DEL EJERCICIO impreso (-14.121.237,28) EXACTO. Villarreal cerró
// el ejercicio 2023/24 con pérdida neta real de EUR 14,12 M.
// ============================================================================

const villarrealcfRevenueLinesByYear = {
  2024: [
    { rawLabel:'Importe neto de la cifra de negocios (ventas, sin desglosar por concepto)', normalizedCategory:'lump_football_operations', amountNative:119.721562, disclosureLevel:'summary' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:8.564334, disclosureLevel:'detailed' },
  ],
};

const villarrealcfExpenseLinesByYear = {
  2024: [
    { rawLabel:'Aprovisionamientos (consumo de mercaderías y materias primas)', normalizedCategory:'other_expenses', amountNative:-5.542115, disclosureLevel:'detailed' },
    { rawLabel:'Sueldos, salarios y asimilados + Cargas sociales (sin separar plantel deportivo/no deportivo)', normalizedCategory:'wages_squad', amountNative:-108.089071, disclosureLevel:'summary' },
    { rawLabel:'Servicios exteriores', normalizedCategory:'admin_general_expense', amountNative:-21.563438, disclosureLevel:'detailed' },
    { rawLabel:'Tributos', normalizedCategory:'admin_general_expense', amountNative:-0.242450, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-0.001407, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-6.447510, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del inmovilizado (sin separar jugadores del resto, ver comentario arriba)', normalizedCategory:'player_amortisation', amountNative:-27.897705, disclosureLevel:'summary' },
  ],
};

const villarrealcfFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'villarrealcf-estados-financieros-2023-24',
    reportType:'official_balance_sheet',
    gestionId: null,
    // grossDebt = "Deudas a corto plazo" TOTAL del balance (116,355224 M) — no se pudo confirmar con
    // certeza el subtotal solo-bancario en la calidad de escaneo disponible, probablemente
    // sobreestima la deuda puramente financiera. cash = Efectivo y otros activos líquidos
    // equivalentes (Tesorería).
    grossDebt:116.355224, cash:47.616789,
    profitOnPlayerSales:26.425834, assetSales:0, netInterest:-0.945099, tax:1.895827,
    officialTotalRevenue:128.285896, officialTotalExpenses:169.783696, officialPAT:-14.121238,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados (alcance de esta sesión fue
// solo Finanzas). Vacíos a propósito.
const villarrealcfPasesData = [];
const villarrealcfResultadosData = {};
const villarrealcfTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.villarrealcf = {
  revenueLinesByYear: villarrealcfRevenueLinesByYear, expenseLinesByYear: villarrealcfExpenseLinesByYear,
  fiscalYearMeta: villarrealcfFiscalYearMeta, pasesData: villarrealcfPasesData,
  resultadosData: villarrealcfResultadosData, titulosData: villarrealcfTitulosData,
};

Object.assign(sources, {
  'villarrealcf-estados-financieros-2023-24': {
      id:'villarrealcf-estados-financieros-2023-24', clubId:'villarrealcf',
      title:'Estados Financieros correspondientes al ejercicio anual terminado el 30 de junio de 2024',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://web.archive.org/web/2024/https://villarrealcf.es/wp-content/uploads/2.b.ii-CCAA-Villarreal-firmadas.pdf',
      note:'PDF oficial (auditado por Betea España Auditores, S.L.P.), escaneo sin capa de texto (leído renderizando a imagen, re-verificado a 300 DPI para confirmar signos negativos). Conseguido vía Wayback Machine porque el dominio del club bloquea la descarga directa del PDF (403). Único ejercicio disponible del club en esta sesión. Transcripción completa de la cuenta de resultados en Clubes/España/Villarreal CF/cuentas-anuales-2023-2024-cuenta-resultados.md.',
    },
});

gestionesByClub.villarrealcf = {
    ejercicio2024: { nombre:'Ejercicio 2023/24', firstYear:2024, lastYear:2024 },
  };

memberCountByClub.villarrealcf = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
