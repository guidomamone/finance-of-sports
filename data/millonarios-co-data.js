// ============================================================================
// data/millonarios-co-data.js — Azul & Blanco Millonarios FC S.A. (Bogotá,
// Colombia). Tercer club colombiano cargado en finance-of-sports (junto con
// Envigado/Once Caldas). Un único ejercicio cargado a propósito: 2025.
//
// FUENTE: `Clubes/Colombia/Millonarios/estados-financieros-2025.md` (documento
// principal, 46 páginas del PDF, "Estados Financieros" con Notas 1-32, vía SIIS
// siis.ia.supersociedades.gov.co, NIT 900430878, comparativo 2025/2024). PDF
// ESCANEADO sin capa de texto, transcripto vía OCR (Tesseract `-l spa --psm 6`).
// `certificacion-ef-2025.md` y `dictamen-revisor-fiscal-2025.md` en la misma
// carpeta son de contexto/cruce (carátula y dictamen del revisor fiscal, sin
// salvedades) — no aportan línea de detalle propia.
//
// A DIFERENCIA de Envigado, este documento NO trae un Estado de Resultado
// Integral PRIMARIO consolidado en una sola tabla: solo las notas explicativas
// (Nota 22 "Ingresos de Actividades Ordinarias", Nota 23 "Costo Deportivo y de
// Ventas", Nota 24 "Gastos de Administración", Nota 25 "Otros Ingresos", Nota 26
// "Otros Gastos", Nota 27 "Otros Ingresos (Gastos) Financieros", Nota 28
// "Depreciaciones y Amortizaciones"). El único resultado final impreso es
// "Resultado del ejercicio" dentro de la Nota 20 (Patrimonio, pág. 44 del .md):
// $(4.690.112) para 2025 — mismo criterio que Once Caldas (notas, sin primario),
// pero acá la reconciliación cerró EXACTA igual (ver abajo).
//
// ESCALA: el documento declara explícitamente "US$ miles de pesos" (pág. 21 del
// .md) — está en MILES de pesos colombianos, NO en pesos completos (a diferencia
// de Envigado). Para guardar en MILLONES de COP (criterio del sitio), cada cifra
// impresa se divide por 1.000 (no por 1.000.000).
//
// FX: el documento SÍ declara su propio tipo de cambio de cierre (pág. 3 del
// .md, "Las tasas tomadas para estos estados financieros son"): TRM USD al
// 31/12/2025 = $3.757,50 — LIGERAMENTE distinto de la TRM oficial genérica ya
// cargada en FX_CLOSE (COP@2025-12-31 = 3757,08). Por la Regla 0 de
// club-data-mapping/SKILL.md sección 5 (el tipo de cambio que el propio
// documento declara gana siempre sobre una cotización externa), se usa el
// literal 3757,50 con fxSource:'document_close', NO fxRef.
//
// REVENUE: Nota 22 (9 líneas, suma EXACTA $103.403.007 miles = $103.403,007 M,
// el total impreso) + Nota 25 "Otros Ingresos" (3 líneas, $5.589,176 M) — mismo
// criterio que Envigado, se suman ambas al campo `revenue`. officialTotalRevenue
// = 103.403,007 + 5.589,176 = 108.992,183 M.
//
// EXPENSES: Nota 23 "Costo Deportivo y de Ventas" ($91.524,998 M impreso — nota
// que MEZCLA costos de fútbol profesional CON costo de ventas de tiendas/
// academias, ver caveat de "Gasto de personal" abajo) + Nota 24 "Gastos de
// Administración" ($8.483,046 M) + Nota 26 "Otros Gastos" ($1.768,076 M) + Nota
// 28 "Depreciaciones y Amortizaciones" ($12.108,211 M). officialTotalExpenses =
// 91.524,998 + 8.483,046 + 1.768,076 + 12.108,211 = 113.884,331 M.
//
// CAVEAT IMPORTANTE — "Gasto de personal" de la Nota 23 ($45.741,164 M, el 40%
// de todo el gasto del club): la Nota 23 se llama "COSTO DEPORTIVO Y DE VENTAS",
// o sea agrupa en una sola cifra de personal TANTO al plantel profesional COMO
// al personal de las 5 tiendas y 7 sedes de academias (que tienen su propio
// costo de mercancías separado en la misma nota, pero NO un costo de personal
// separado). El documento no permite separar cuánto de esos $45.741,164 M es
// sueldo de jugadores/cuerpo técnico vs. personal de tiendas/academias. Se
// cargó TODO a `wages_squad` (criterio: "Costo Deportivo" es el concepto
// principal de la nota, y el plantel profesional es estructuralmente el rubro
// de personal más grande de cualquier club ya cargado) — es una aproximación
// que probablemente sobrestima levemente el salario del plantel real. Anotado
// en Admin/dudas-por-club.md para eventual aclaración con el club.
//
// netInterest = Nota 27: Ingresos financieros ($4.806,939 M: intereses +
// diferencia en cambio) − Gastos financieros ($4.595,249 M: diferencia en
// cambio + intereses pasivos por derechos de uso + gastos bancarios +
// intereses) = +211,690 M.
//
// tax = Nota 21.5 "Total impuesto sobre la renta reconocido en el período" =
// $(9,654) M (impuesto corriente $0 por pérdida fiscal + efecto de impuesto
// diferido $(42,999) + ganancia ocasional $52,653 = -9,654 neto, impreso).
//
// VERIFICACIÓN (node, antes de cargar): revenue (108.992,183) − expenses
// (113.884,331) + netInterest (211,690) = −4.680,458 M, EXACTO igual a
// "Beneficio (pérdida) antes de impuestos" impreso (Nota 21.5, pág. 37-38 del
// .md). Sumándole tax (−9,654): −4.690,112 M, EXACTO igual a "Resultado del
// ejercicio" impreso en la Nota 20 (Patrimonio). Reconciliación exacta, sin
// ningún residuo/plug — incluso sin Estado de Resultado Integral primario.
//
// grossDebt = Nota 14 "Obligaciones Financieras" ($28,340 M: saldos de tarjetas
// de crédito corporativas Bancolombia/Av Villas, la única línea de deuda
// FINANCIERA que separa el documento de las cuentas por pagar comerciales/
// impositivas de la Nota 15). cash = Nota 6 "Efectivo y Equivalentes de
// Efectivo" ($6.465,046 M).
// ============================================================================

const millonariosCoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Taquilla y venta de boletería', normalizedCategory:'matchday_competition', amountNative:32154.886, disclosureLevel:'detailed' },
    { rawLabel:'Venta de artículos deportivos', normalizedCategory:'sponsorship_commercial', amountNative:21656.762, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio y Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:20817.584, disclosureLevel:'detailed' },
    { rawLabel:'Participación en eventos internacionales (Conmebol)', normalizedCategory:'competition_bonus', amountNative:1336.208, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos relacionados con derechos deportivos', normalizedCategory:'player_sales', amountNative:6213.451, disclosureLevel:'detailed' },
    { rawLabel:'Academias de fútbol', normalizedCategory:'youth_football', amountNative:8389.643, disclosureLevel:'detailed' },
    { rawLabel:'Derechos televisión', normalizedCategory:'broadcasting', amountNative:6686.078, disclosureLevel:'detailed' },
    { rawLabel:'Utilidad venta derechos deportivos', normalizedCategory:'player_sales', amountNative:4686.619, disclosureLevel:'detailed' },
    { rawLabel:'Regalías y otras actividades de estadio', normalizedCategory:'other_income', amountNative:1461.776, disclosureLevel:'detailed' },
    // Nota 25 "Otros Ingresos" (no forman parte de "Ingresos de Actividades Ordinarias", Nota 22,
    // pero se suman al revenue del sitio, mismo criterio que Envigado):
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:1115.077, disclosureLevel:'detailed' },
    { rawLabel:'Reintegro de otros costos y gastos', normalizedCategory:'other_income', amountNative:1464.959, disclosureLevel:'detailed' },
    { rawLabel:'Otros (auxilios Federación Colombiana de Fútbol, descuentos en compras)', normalizedCategory:'other_income', amountNative:3009.140, disclosureLevel:'detailed' },
  ],
};

const millonariosCoExpenseLinesByYear = {
  2025: [
    // Nota 23 "Costo Deportivo y de Ventas" ($91.524,998 M impreso), agrupada por categoría real
    // (ver caveat de "Gasto de personal" en el comentario de cabecera):
    { rawLabel:'Gasto de personal (plantel profesional + tiendas + academias, sin desglose disponible)', normalizedCategory:'wages_squad', amountNative:-45741.164, disclosureLevel:'detailed' },
    { rawLabel:'Costo Deportivo y de Ventas: organización de partidos', normalizedCategory:'match_organisation_expense', amountNative:-11625.263, disclosureLevel:'detailed', items:[
      ['Gastos del estadio', -9853.896], ['Gastos de viaje', -1771.367],
    ]},
    { rawLabel:'Costo Deportivo y de Ventas: administración y estructura', normalizedCategory:'admin_general_expense', amountNative:-12637.328, disclosureLevel:'detailed', items:[
      ['Servicios', -3986.646], ['Arrendamientos', -2915.817], ['Contribuciones y afiliaciones', -2636.540], ['Impuestos', -1911.663], ['Honorarios', -871.050], ['Mantenimiento, seguros y gastos legales', -315.612],
    ]},
    { rawLabel:'Gastos derechos deportivos y de formación (compra, préstamo e intermediación de jugadores)', normalizedCategory:'player_amortisation', amountNative:-4303.226, disclosureLevel:'detailed' },
    { rawLabel:'Costo Deportivo y de Ventas: costo de mercancías y otros', normalizedCategory:'other_expenses', amountNative:-17218.017, disclosureLevel:'detailed', items:[
      ['Costo de mercancías tiendas y academias', -14922.952], ['Otros gastos', -2259.740], ['Provisiones de inventario', -17.795], ['Castigo deudores', -17.530],
    ]},
    // Nota 24 "Gastos de Administración" ($8.483,046 M impreso):
    { rawLabel:'Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-8483.046, disclosureLevel:'detailed', items:[
      ['Gasto de personal y honorarios', -7040.596], ['Servicios', -805.418], ['Otros gastos', -271.328], ['Arrendamientos', -210.665], ['Gastos de viaje', -84.340], ['Castigo deudores', -18.218], ['Contribuciones y afiliaciones', -18.947], ['Impuestos', -4.146], ['Mantenimiento, seguros y gastos legales', -29.388],
    ]},
    // Nota 26 "Otros Gastos" ($1.768,076 M impreso):
    { rawLabel:'Gravamen a los movimientos financieros (GMF)', normalizedCategory:'admin_general_expense', amountNative:-595.962, disclosureLevel:'detailed' },
    { rawLabel:'Gastos diversos', normalizedCategory:'other_expenses', amountNative:-344.413, disclosureLevel:'detailed' },
    { rawLabel:'Gastos extraordinarios (provisiones por contingencias laborales, exjugador Jorge Perlaza)', normalizedCategory:'exceptional_items', amountNative:-256.298, disclosureLevel:'detailed' },
    { rawLabel:'Gastos no deducibles', normalizedCategory:'other_expenses', amountNative:-571.403, disclosureLevel:'detailed' },
    // Nota 28 "Depreciaciones y Amortizaciones" ($12.108,211 M impreso):
    { rawLabel:'Amortización de intangibles (derechos deportivos propios)', normalizedCategory:'player_amortisation', amountNative:-3071.905, disclosureLevel:'detailed' },
    { rawLabel:'Amortización convenios deportivos (derechos deportivos en préstamo)', normalizedCategory:'player_amortisation', amountNative:-7078.545, disclosureLevel:'detailed' },
    { rawLabel:'Amortizaciones otros', normalizedCategory:'other_amortisation', amountNative:-956.801, disclosureLevel:'detailed' },
    { rawLabel:'Depreciación', normalizedCategory:'depreciation', amountNative:-1000.960, disclosureLevel:'detailed' },
  ],
};

const millonariosCoFiscalYearMeta = {
  2025: {
    // El documento declara su propio TRM de cierre (pág. 3 del .md): $3.757,50 al 31/12/2025 —
    // literal, no fxRef (ver comentario de cabecera, Regla 0 de club-data-mapping sección 5).
    currency:'COP', fx:3757.50, fxSource:'document_close',
    sourceId:'millonarios-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:211.690,
    tax:-9.654,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:28.340, cash:6465.046,
    // officialTotalExpenses EXCLUYE "Gastos extraordinarios (provisiones por contingencias
    // laborales, exjugador Jorge Perlaza)" (-256,298, exceptional_items) — mismo criterio que
    // Botafogo/Atlético Mineiro: verifyTieOuts()/tools/audit.js comparan "Expenses" contra gasto
    // ordinario + no-efectivo solamente, exceptional_items no participa de ese check (sí de
    // officialPAT). 113884,331 (impreso, incluye el extraordinario) - 256,298 = 113628,033.
    officialTotalRevenue:108992.183, officialTotalExpenses:113628.033, officialPAT:-4690.112,
  },
};

const millonariosCoPresupuestoOverlayByYear = {};
const millonariosCoPasesData = [];
const millonariosCoResultadosData = {};
const millonariosCoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['millonarios-co'] = {
  revenueLinesByYear: millonariosCoRevenueLinesByYear, expenseLinesByYear: millonariosCoExpenseLinesByYear,
  fiscalYearMeta: millonariosCoFiscalYearMeta, pasesData: millonariosCoPasesData,
  resultadosData: millonariosCoResultadosData, titulosData: millonariosCoTitulosData,
  presupuestoOverlayByYear: millonariosCoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'millonarios-co-estados-financieros-2025': {
    id:'millonarios-co-estados-financieros-2025', clubId:'millonarios-co',
    title:'Estados Financieros (auditados), al 31 de diciembre de 2025 y 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900430878). PDF escaneado sin capa de texto, transcripto vía OCR (Tesseract). Cifras del documento expresadas en MILES de pesos colombianos (no pesos completos, a diferencia de Envigado) — reconvertido a millones para el sitio. Sin Estado de Resultado Integral primario consolidado, solo notas (22 a 28) — la reconciliación contra "Resultado del ejercicio" (Nota 20, Patrimonio) cerró exacta de todas formas. TRM de cierre declarada por el propio documento: $3.757,50 (31/12/2025). Transcripción completa en Clubes/Colombia/Millonarios/estados-financieros-2025.md.',
  },
});

gestionesByClub['millonarios-co'] = {
  // No se confirmó con certeza una "gestión"/presidencia en el sentido usado para clubes
  // argentinos (Millonarios es una S.A., el firmante de los EEFF es el Representante Legal, Jorge
  // Enrique Camacho Matamoros, no necesariamente equivalente a una presidencia electa) — entrada
  // genérica sin confirmar, mismo criterio que Envigado/Once Caldas.
  actual: { nombre: 'Gestión actual (sin confirmar)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['millonarios-co'] = null;
