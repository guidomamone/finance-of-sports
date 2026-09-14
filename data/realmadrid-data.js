// ============================================================================
// data/realmadrid-data.js — Real Madrid C.F., Ejercicio 2024/2025 (1/7/2024 a 30/6/2025).
//
// Primer club español cargado al motor genérico. Fuente: "Informe Económico Real Madrid 2024-2025"
// (Cuentas Anuales CONSOLIDADAS, informe de auditoría incluido), descargado de
// realmadrid.com/es-ES/el-club/transparencia/informes-economicos — ver
// Clubes/España/Real Madrid/informe-economico-2024-2025.pdf y su transcripción parcial
// (cuenta de pérdidas y ganancias + Nota 4 de amortización de jugadores + deuda/caja) en
// Clubes/España/Real Madrid/informe-economico-2024-2025-cuenta-resultados.md.
//
// REGLA DE ALCANCE DE ESTA SESIÓN (pedido explícito de Guido): un solo ejercicio por club español
// (el más reciente/completo, 2024/25), NO una serie histórica — aunque el archivo fuente tiene 22
// años disponibles (2003-04 a 2024-25), acá solo se carga 2024/25. "Ancho, no profundo": prioridad
// es sumar los 10 clubes españoles, no profundizar en uno solo.
//
// Cifras en EUR MILLONES nativos, "escala 1" (no "miles de millones" como ARS): el propio documento
// reporta en "miles €", así que el número impreso (con puntos como separador de miles, ej.
// "326.092") YA equivale al valor en millones de EUR al leerlo como decimal (326,092 miles de € =
// EUR 326,092 M) — ver el .md de arriba para el detalle línea por línea. Conversión a USD vía
// yearMetaFor/toDisplayValue, que necesitó una extensión mínima en js/finanzas-calc.js (ver
// comentario ahí) para soportar currency:'EUR', primera vez que el motor ve una moneda que no es
// ARS/USD.
//
// Tipo de cambio: 1 EUR = 1,172 USD al 30/6/2025 (cotización de cierre BCE, investigada vía web
// search — el documento de Real Madrid NO declara su propio tipo de cambio, a diferencia de los
// balances argentinos con Anexo de moneda extranjera, porque el Grupo no reporta partidas
// materiales en USD). Es una tasa de referencia solo para el toggle de display (EUR es la moneda de
// reporte real, USD es una conversión de exhibición), no para ningún cálculo que necesite
// reconciliar en USD. OJO con el SENTIDO de `fx` en fiscalYearMeta: el resto del sitio (ARS, COP,
// BRL, MXN, JPY) guarda `fx` como "moneda nativa por 1 USD" (ver toDisplayValue,
// js/finanzas-calc.js: `value / meta.fx` para nativa->USD), no "USD por 1 nativa" — para EUR/USD
// 1,172 (USD por 1 EUR), el valor que va en `fx` es el INVERSO, 1/1,172 = 0,8532 (EUR por 1 USD).
//
// Categorización de Ingresos: el documento reporta "Importe neto de la cifra de negocios" en 4
// líneas (socios y estadios / amistosos y competiciones / retransmisión / marketing) — más
// desglosado que Boca en instituciones pero SIN separar cuotas sociales de recaudación de
// estadio/museo/tour (van juntas en "Ingresos de socios y estadios"). Mapeo:
// - "Ingresos de socios y estadios" -> matchday_competition (aproximación: mezcla cuotas sociales +
//   recaudación de estadio/tour/museo/parking, el documento no las separa; se eligió esta categoría
//   porque el componente de estadio es mayoritario para un club con 90.000 socios pero estadio de
//   más de 80.000 localidades).
// - "Ingresos de amistosos y competiciones" -> competition_bonus (ingresos de partidos amistosos +
//   premios/participación en competiciones, distinto de los derechos de TV que van en "retransmisión").
// - "Ingresos de retransmisión" -> broadcasting.
// - "Ingresos de marketing" -> sponsorship_commercial.
// - "Otros ingresos de explotación" + "Trabajos realizados por la empresa para su activo" +
//   "Imputación de subvenciones de inmovilizado" + "Excesos de provisiones" -> other_income (ítems
//   operativos menores/no recurrentes, ninguno con categoría propia en el esquema del sitio).
//
// Categorización de Gastos:
// - "Gastos de personal deportivo y no deportivo" -> wages_squad (el documento NO separa plantel
//   profesional de personal no deportivo, se carga el total, mismo criterio que ya usa el sitio
//   para Racing/Boca cuando la fuente no permite el desglose).
// - "Otros gastos de gestión corriente" -> admin_general_expense.
// - "Consumo de materias primas" + "Pérdidas/deterioro por operaciones comerciales" -> other_expenses.
// - Amortización del inmovilizado (167,798 M total): SEPARADA en dos líneas usando la Nota 4 del
//   informe (movimiento de "Inmovilizado intangible deportivo", que son los derechos de traspaso de
//   jugadores): la "dotación" del ejercicio 2024/25 para fútbol masculino+femenino+baloncesto suma
//   115,841 M (líneas "Altas y dotaciones" de la tabla de Amortización acumulada) -> player_amortisation.
//   El resto (167,798 - 115,841 = 51,957 M, inmovilizado intangible no deportivo + material) ->
//   depreciation. Ver el .md de transcripción para el detalle exacto de la Nota 4.
//
// "Deterioro, resultado por enajenaciones del inmovilizado y otros excepcionales" (34,647 M, suma
// de "Deterioros y pérdidas" 2,190 + "Resultados por enajenaciones y otras" 32,457): NO va como
// revenueLine (ver club-data-mapping SKILL.md sección 2), va a fiscalYearMeta.profitOnPlayerSales —
// el propio informe de gestión confirma que este resultado "se deriva en su casi totalidad de
// traspasos de jugadores" (comentario sobre el presupuesto 2025/26 en el mismo documento).
//
// VERIFICACIÓN (hecha a mano, ver .md para el detalle): Revenue (suma revenueLines) 1.184,687 M +
// Expenses cash (wages+otherExpenses) -976,393 M + Non-cash (amortización) -167,798 M =
// Operating profit 40,496 M; + profitOnPlayerSales 34,647 M = 75,143 M = RESULTADO DE EXPLOTACIÓN
// impreso EXACTO; + netInterest -43,790 M = 31,353 M = RESULTADO ANTES DE IMPUESTOS impreso EXACTO;
// + tax -7,033 M = 24,320 M = RESULTADO DEL EJERCICIO impreso EXACTO. Cierra perfecto en las 3
// instancias, no solo en el resultado final.
// ============================================================================

const realmadridRevenueLinesByYear = {
  2025: [
    { rawLabel:'Ingresos de socios y estadios', normalizedCategory:'matchday_competition', amountNative:326.092, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de amistosos y competiciones', normalizedCategory:'competition_bonus', amountNative:189.566, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de retransmisión', normalizedCategory:'broadcasting', amountNative:162.086, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos de marketing', normalizedCategory:'sponsorship_commercial', amountNative:481.164, disclosureLevel:'detailed' },
    { rawLabel:'Trabajos realizados por la empresa para su activo', normalizedCategory:'other_income', amountNative:0.272, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos de explotación', normalizedCategory:'other_income', amountNative:2.114, disclosureLevel:'detailed' },
    { rawLabel:'Imputación de subvenciones de inmovilizado no financiero y otras', normalizedCategory:'other_income', amountNative:0.192, disclosureLevel:'detailed' },
    { rawLabel:'Excesos de provisiones', normalizedCategory:'other_income', amountNative:23.201, disclosureLevel:'detailed' },
  ],
};

const realmadridExpenseLinesByYear = {
  2025: [
    { rawLabel:'Consumo de materias primas y otras materias consumibles', normalizedCategory:'other_expenses', amountNative:-87.697, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de personal deportivo y no deportivo', normalizedCategory:'wages_squad', amountNative:-514.230, disclosureLevel:'detailed' },
    { rawLabel:'Pérdidas, deterioro y variación de provisiones por operaciones comerciales', normalizedCategory:'other_expenses', amountNative:-2.947, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos de gestión corriente', normalizedCategory:'admin_general_expense', amountNative:-371.519, disclosureLevel:'detailed' },
    { rawLabel:'Amortización de derechos de traspaso de jugadores (Nota 4, fútbol+baloncesto)', normalizedCategory:'player_amortisation', amountNative:-115.841, disclosureLevel:'detailed' },
    { rawLabel:'Amortización del resto del inmovilizado (intangible no deportivo + material)', normalizedCategory:'depreciation', amountNative:-51.957, disclosureLevel:'detailed' },
  ],
};

const realmadridFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'realmadrid-informe-economico-2024-25',
    reportType:'official_balance_sheet',
    gestionId: null,
    // grossDebt = Deudas con entidades de crédito, largo + corto plazo (74,904+66,110 M). cash =
    // Efectivo y otros activos líquidos equivalentes (Nota 10). Ambos en EUR M.
    grossDebt:141.014, cash:175.827,
    profitOnPlayerSales:34.647, assetSales:0, netInterest:-43.790, tax:-7.033,
    officialTotalRevenue:1184.687, officialTotalExpenses:1144.191, officialPAT:24.320,
  },
};

// Mercado de pases / Resultados deportivos / Títulos: NO onboardeados en esta sesión (alcance fue
// solo Finanzas, un ejercicio por club). Vacíos a propósito, mismo criterio que Vélez/Instituto (ver
// comentario en data/velez-data.js) — `pasesDataForClub`/`resultadosDataForClub`/`titulosDataForClub`
// en index.html ya manejan la ausencia de datos con `|| []`/`|| {}` sin romper.
const realmadridPasesData = [];
const realmadridResultadosData = {};
const realmadridTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.realmadrid = {
  revenueLinesByYear: realmadridRevenueLinesByYear, expenseLinesByYear: realmadridExpenseLinesByYear,
  fiscalYearMeta: realmadridFiscalYearMeta, pasesData: realmadridPasesData,
  resultadosData: realmadridResultadosData, titulosData: realmadridTitulosData,
};

Object.assign(sources, {
  'realmadrid-informe-economico-2024-25': {
      id:'realmadrid-informe-economico-2024-25', clubId:'realmadrid',
      title:'Informe Económico Real Madrid 2024-2025 (Cuentas Anuales Consolidadas + Informe de Auditoría), Ejercicio 1/7/2024 a 30/6/2025',
      type:'official_balance_sheet', reliability:'primary',
      url:'https://www.realmadrid.com/es-ES/el-club/transparencia/informes-economicos',
      note:'PDF oficial de 94 páginas, texto nativo (sin necesidad de OCR), publicado en la sección de transparencia del club. Cuentas anuales CONSOLIDADAS (Grupo Real Madrid, incluye Real Madrid Estadio S.L.U. y Aparcamientos del Santiago Bernabéu S.L.). Transcripción de la cuenta de pérdidas y ganancias + Nota 4 (amortización de jugadores) + deuda/caja en Clubes/España/Real Madrid/informe-economico-2024-2025-cuenta-resultados.md.',
    },
});

gestionesByClub.realmadrid = {
    ejercicio2025: { nombre:'Ejercicio 2024/25', firstYear:2025, lastYear:2025 },
  };

memberCountByClub.realmadrid = null; // no investigado en esta sesión (fuera de alcance: solo Finanzas)
