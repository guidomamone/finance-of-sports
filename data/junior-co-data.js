// ============================================================================
// data/junior-co-data.js — Club Deportivo Popular Junior F.C. S.A.
// (Barranquilla, Colombia). clubId lleva el país al final (`junior-co`) por
// la convención de Admin/CONVENCIONES.md — "Junior" es un nombre que se
// repite entre países/clubes. Ejercicio 2025 = REAL, único ejercicio cargado
// a propósito (mismo criterio que Envigado/Once Caldas).
//
// FUENTE: `Clubes/Colombia/Junior de Barranquilla/estados-financieros-2025.pdf`
// (38 páginas, "Notas a los Estados Financieros por los años terminados el
// 31 de diciembre de 2025 y 2024"), texto nativo vía pdftotext -layout,
// transcripción completa en `estados-financieros-2025.md` en la misma
// carpeta. Bajado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900456729),
// ver `fuentes/Colombia/Junior de Barranquilla.md`.
//
// Cifras del documento "expresadas en miles de pesos colombianos" (confirmado
// en el encabezado de página). Acá se guardan divididas por 1.000, en
// MILLONES de pesos colombianos (COP).
//
// REVENUE = Nota 17 "Ingresos Operacionales" (10 líneas, suma EXACTA a
// $50.430.085 M, coincide con la vista SIIS) + el bloque "Otros ingresos no
// operacionales" de la Nota 21 (9 líneas, suma EXACTA a $43.833.994 M — la
// línea "Diferencia en cambio, neto" de esta nota da $0 en 2025, así que no
// hay nada que mover a netInterest del lado de ingresos este ejercicio).
// officialTotalRevenue = 50.430.085 + 43.833.994 = 94.264.079.
//
// EXPENSES: Nota 18 "Costo de Venta" ($2.623.441 M, mercadeo/publicidad +
// artículos deportivos + abonados + boletería), Nota 19 "Gastos
// Operacionales" (sección "De Administración" $2.735.138 M + sección "De
// Ventas" $80.878.340 M = $83.613.478 M, el plantel profesional vive en "De
// Ventas"), y el bloque "Otros gastos no operacionales" de la Nota 21 SIN su
// línea "Diferencia en cambio, neto" ($633.987 M de $3.334.214 M impresos —
// los $2.700.227 M de diferencia en cambio se movieron a netInterest, ver
// abajo). officialTotalExpenses = 2.623.441+83.613.478+633.987 = 86.870.906.
//
// netInterest = Nota 20 "Ingresos (Gastos) Financieros, neto" (Ingresos por
// intereses 36.011 - Gastos por intereses 877.273 = -841.262, EXACTO igual al
// total impreso) + la línea "Diferencia en cambio, neto" del bloque "Otros
// gastos no operacionales" de la Nota 21 (-2.700.227, movida acá siguiendo la
// regla de club-data-mapping SKILL.md sección 2: diferencias de cambio NUNCA
// van como línea de ingreso/gasto, van netas a este campo, aunque el
// documento las muestre en una nota distinta de la de "financieros"). Total
// netInterest = -841.262 + -2.700.227 = -3.541.489. Esto no mueve el
// resultado final (solo reclasifica de dónde sale la plata dentro del
// pretax): Revenue-Expenses+netInterest = 94.264.079-86.870.906-3.541.489 =
// 3.851.684, EXACTO igual a la "Utilidad (Pérdida) antes de provisión para
// impuesto sobre la renta" que imprime la Nota de Impuesto de Renta.
//
// tax: la Nota de "Provisión para el impuesto sobre la renta" imprime
// LITERALMENTE "Impuesto sobre la renta corriente: 244.906" + "Impuesto sobre
// la renta diferido: 2.390.585" = "2.635.491" (gasto total) para 2025, y la
// misma nota confirma "Utilidad (Pérdida) antes de provisión para impuesto
// sobre la renta: 3.851.683" — EXACTO igual a la reconciliación de arriba
// (diferencia de $1 mil por redondeo). PAT = 3.851.683 - 2.635.491 = 1.216.192
// ≈ vista SIIS ($1.216.193 M, se usa este último como officialPAT).
// ============================================================================

const juniorcoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:16993.152, disclosureLevel:'detailed' },
    { rawLabel:'Venta de boletería', normalizedCategory:'matchday_competition', amountNative:12894.660, disclosureLevel:'detailed' },
    { rawLabel:'Derechos de televisión (Dimayor)', normalizedCategory:'broadcasting', amountNative:6192.158, disclosureLevel:'detailed' },
    { rawLabel:'Vallas publicitarias', normalizedCategory:'sponsorship_commercial', amountNative:5229.969, disclosureLevel:'detailed' },
    { rawLabel:'Venta de abonos o palcos', normalizedCategory:'season_tickets', amountNative:4433.978, disclosureLevel:'detailed' },
    { rawLabel:'Dimayor', normalizedCategory:'broadcasting', amountNative:1508.183, disclosureLevel:'detailed' },
    { rawLabel:'Venta de artículos deportivos y misceláneos', normalizedCategory:'sponsorship_commercial', amountNative:1133.172, disclosureLevel:'detailed' },
    { rawLabel:'Participación en eventos nacionales e internacionales (Copa Conmebol Sudamericana)', normalizedCategory:'competition_bonus', amountNative:942.237, disclosureLevel:'detailed' },
    { rawLabel:'Federación Colombiana de Fútbol', normalizedCategory:'competition_bonus', amountNative:644.862, disclosureLevel:'detailed' },
    { rawLabel:'Mecanismo de solidaridad', normalizedCategory:'player_sales', amountNative:457.714, disclosureLevel:'detailed' },
    // Promovida a línea propia (Versión de esta sesión, corrigiendo un hallazgo de
    // node tools/audit.js: catch-all dominante): "Utilidad en venta derechos deportivos, neto" es
    // categoría real distinta (player_sales) del resto del catch-all "Otros ingresos no
    // operacionales", ver club-data-mapping SKILL.md sección 1.
    { rawLabel:'Utilidad en venta de derechos deportivos, neto', normalizedCategory:'player_sales', amountNative:36749.925, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos no operacionales (premios, aprovechamientos, reintegro de costos, uso de marca, bonificaciones, recuperación de deterioro y provisión, sobrante en caja)', normalizedCategory:'other_income', amountNative:7084.069, disclosureLevel:'detailed', items:[
      ['Premios', 2928.540], ['Aprovechamientos', 2211.149], ['Reintegro de otros costos y gastos', 1014.616], ['Uso de marca', 653.021], ['Bonificaciones', 226.728], ['Recuperación de deterioro de cartera', 34.744], ['Recuperación provisión cálculo actuarial', 15.254], ['Sobrante en caja', 0.017],
    ]},
  ],
};

const juniorcoExpenseLinesByYear = {
  2025: [
    { rawLabel:'Costo de Venta (mercadeo y publicidad, artículos deportivos y misceláneos, abonados, boletería)', normalizedCategory:'other_expenses', amountNative:-2623.441, disclosureLevel:'detailed', items:[
      ['Mercadeo y publicidad', -1316.357], ['Venta de artículos deportivos y misceláneos', -1199.525], ['Abonados', -95.464], ['Boletería', -12.095],
    ]},
    // Nota 19 "Gastos Operacionales: De Administración" ($2.735.138 M impreso):
    { rawLabel:'Gastos Operacionales de Administración (personal, impuestos, honorarios, servicios, mantenimiento, viajes, legales, contribuciones, seguros)', normalizedCategory:'admin_general_expense', amountNative:-2618.652, disclosureLevel:'detailed', items:[
      ['Gastos de personal', -1617.176], ['Impuestos', -374.305], ['Honorarios', -285.250], ['Servicios', -249.253], ['Mantenimiento y reparaciones', -56.282], ['Gastos de viaje', -20.143], ['Gastos legales', -11.886], ['Contribuciones y afiliaciones', -3.904], ['Seguros', -0.453],
    ]},
    { rawLabel:'Gastos Operacionales de Administración: Diversos', normalizedCategory:'other_expenses', amountNative:-101.592, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Operacionales de Administración: Depreciaciones', normalizedCategory:'depreciation', amountNative:-14.894, disclosureLevel:'detailed' },
    // Nota 19 "Gastos Operacionales: De Ventas" ($80.878.340 M impreso, el plantel profesional):
    { rawLabel:'Gastos Operacionales de Ventas: Gastos de personal (plantel)', normalizedCategory:'wages_squad', amountNative:-43702.197, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Operacionales de Ventas: transferencias de jugadores (amortizaciones, intermediación de agentes, derechos deportivos, amortización de transferencias temporales)', normalizedCategory:'player_amortisation', amountNative:-27516.470, disclosureLevel:'detailed', items:[
      ['Amortizaciones', -11937.407], ['Diversos (intermediación de agentes deportivos en venta y compra de jugadores)', -8980.529], ['Derechos deportivos (participaciones de terceros y mecanismo de solidaridad)', -4819.975], ['Arrendamientos (porción de amortización de transferencias temporales de jugadores, per Nota 19(3))', -1778.559],
    ]},
    { rawLabel:'Gastos Operacionales de Ventas: organización y logística (arrendamientos restantes, viajes, impuestos, mantenimiento, servicios, contribuciones)', normalizedCategory:'match_organisation_expense', amountNative:-8424.647, disclosureLevel:'detailed', items:[
      ['Arrendamientos (resto)', -1550.599], ['Gastos de viaje', -2476.821], ['Impuestos', -2200.883], ['Mantenimiento y reparaciones', -979.098], ['Servicios', -898.610], ['Contribuciones y afiliaciones', -318.636],
    ]},
    { rawLabel:'Gastos Operacionales de Ventas: Deterioro de cartera', normalizedCategory:'other_expenses', amountNative:-597.972, disclosureLevel:'detailed' },
    { rawLabel:'Gastos Operacionales de Ventas: Honorarios, Gastos legales y Seguros', normalizedCategory:'admin_general_expense', amountNative:-394.628, disclosureLevel:'detailed', items:[
      ['Honorarios', -308.232], ['Gastos legales', -52.441], ['Seguros', -33.955],
    ]},
    { rawLabel:'Gastos Operacionales de Ventas: Depreciaciones', normalizedCategory:'depreciation', amountNative:-242.426, disclosureLevel:'detailed' },
    // Nota 21 "Otros gastos no operacionales", SIN la línea "Diferencia en cambio, neto" (movida
    // a netInterest, ver comentario de cabecera):
    { rawLabel:'Otros gastos no operacionales (GMF, impuestos asumidos, multas, descuentos comerciales, diversos, gastos bancarios, ejercicios anteriores, comisiones)', normalizedCategory:'other_expenses', amountNative:-633.987, disclosureLevel:'detailed', items:[
      ['GMF', -253.073], ['Impuestos asumidos', -140.053], ['Multas, Sanciones y litigios', -137.640], ['Descuentos comerciales', -50.000], ['Diversos', -30.000], ['Gastos bancarios', -10.443], ['Costos y gastos de ejercicios anteriores', -7.620], ['Comisiones', -5.158],
    ]},
  ],
};

const juniorcoFiscalYearMeta = {
  2025: {
    // TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
    // cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio de
    // cierre para todo el balance (mantiene una cuenta bancaria en Panamá para operaciones en el
    // exterior, pero no un Anexo de cierre en moneda extranjera), mismo caso que Envigado/Once
    // Caldas.
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'junior-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Nota 20 (Ingresos por intereses 36.011 - Gastos por intereses 877.273 = -841.262) + la
    // línea "Diferencia en cambio, neto" de la Nota 21 (-2.700.227, movida acá por regla de
    // club-data-mapping SKILL.md sección 2). Total = -3.541.489.
    netInterest:-3541.489,
    // Impuesto sobre la renta corriente (244.906) + Impuesto sobre la renta diferido (2.390.585),
    // EXACTO igual al "2.635.491" impreso como total en la Nota de Impuesto de Renta.
    tax:-2635.491,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = "Total obligaciones financieras" (Nota 12). cash = Nota 6, Efectivo y
    // equivalentes de efectivo (Bancos moneda extranjera+nacionales+Caja general+Fideicomisos+
    // Caja menor).
    grossDebt:8213.691, cash:9012.064,
    officialTotalRevenue:94264.079, officialTotalExpenses:86870.906, officialPAT:1216.193,
  },
};

const juniorcoPresupuestoOverlayByYear = {};

const juniorcoPasesData = [];
const juniorcoResultadosData = {};
const juniorcoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['junior-co'] = {
  revenueLinesByYear: juniorcoRevenueLinesByYear, expenseLinesByYear: juniorcoExpenseLinesByYear,
  fiscalYearMeta: juniorcoFiscalYearMeta, pasesData: juniorcoPasesData,
  resultadosData: juniorcoResultadosData, titulosData: juniorcoTitulosData,
  presupuestoOverlayByYear: juniorcoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'junior-co-estados-financieros-2025': {
      id:'junior-co-estados-financieros-2025', clubId:'junior-co',
      title:'Notas a los Estados Financieros por los años terminados el 31 de diciembre de 2025 y 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 900456729). Texto nativo, notas limpias con subtotales que reconcilian exacto en cada una. La Nota de Impuesto de Renta confirma la "Utilidad antes de provisión para impuesto sobre la renta" como cifra propia, lo que permitió verificar la reconstrucción completa sin ningún residuo. Transcripción completa en Clubes/Colombia/Junior de Barranquilla/estados-financieros-2025.md.',
    },
});

gestionesByClub['junior-co'] = {
  actual: { nombre:'Antonio Char Chaljub (Presidente)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['junior-co'] = null;
