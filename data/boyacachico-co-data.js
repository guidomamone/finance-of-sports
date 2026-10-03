// ============================================================================
// data/boyacachico-co-data.js — Deportivo Boyacá Chicó Futbol Club S.A.
// (Tunja, Colombia). Club nuevo, agregado el 2026-09-28 (ronda de 5
// onboardings de prueba de los tools del to-do 98/95, 3/5). Ejercicio 2024 =
// REAL, único ejercicio cargado a propósito.
//
// FUENTE: `Clubes/Colombia/Boyaca Chico/estados-financieros-2024.pdf`,
// transcripción completa en `estados-financieros-2024.md`, misma carpeta.
// Bajado vía SIIS (siis.ia.supersociedades.gov.co), mismo canal que Once
// Caldas/Envigado. Cifras YA en pesos completos (no en miles como Once
// Caldas -- este documento no trae la aclaración "expresado en miles" y sus
// magnitudes (miles de millones de COP) solo tienen sentido como pesos
// completos, confirmado cruzando contra el patrimonio total: $6.414 millones
// de patrimonio para un club de Primera A es plausible en pesos completos,
// sería absurdamente chico en miles). Acá se guardan divididas por 1.000.000,
// en MILLONES de pesos colombianos (COP), mismo criterio de unidad que el
// resto del sitio.
//
// REVENUE = Nota 16 "Ingresos Operacionales" (total impreso $8.127,567123 M,
// reconciliado EXACTO con `tools/sum-check.mjs`) + la porción no-financiera
// de Nota 19 "Otros Ingresos No Operacionales" ($137,020364 M = total
// impreso $143,886002 M menos "Intereses Bancarios" $6,865639 M, que va a
// `netInterest`). Los 5 rubros de auxilio DIMAYOR (Hotelero/Transporte/
// Arbitraje/Logística/Mejoramientos) y "Fondo de Equipos" se categorizaron
// como `broadcasting`, mismo criterio que la sub-descomposición de "DIMAYOR"
// en `data/oncecaldas-data.js` (son la misma distribución de la liga, no
// ingreso propio del club). "Ingresos Abonados con Boyacá" -> `season_tickets`
// (abonos, mismo concepto que Once Caldas). "Menos: Devoluciones"
// (-$1.726,052997 M, 21% del ingreso bruto) NO se pudo atribuir con
// confianza a un rubro específico -- el documento no aclara de qué
// devolución se trata, se cargó como línea propia en `other_income`
// (negativa) y quedó la pregunta en `Admin/dudas-por-club.md`.
//
// EXPENSES = Nota 17 "Costos de Ventas y Prestación de Servicios" (íntegro
// nómina del plantel masculino este año, $4.303,480269 M -> `wages_squad`) +
// Nota 18 "Gastos de Administración" ($2.603,474912 M, con Amortizaciones y
// Depreciación separadas en sus propias líneas, mismo criterio que Once
// Caldas) + la porción no-financiera/no-tributaria de Nota 20 "Otros Egresos
// No Operacionales" ($11,266696 M, "Gastos diversos" -> `other_expenses`).
//
// `tax` = $381,268512 M, la "Provisión Impuesto sobre la Renta" -- CONFIRMADA
// DOBLE: aparece igual en Nota 20 ("Impuesto de Renta") y en Nota 21
// ("PROVISIÓN IMPUESTO SOBRE LA RENTA DEL AÑO GRAVABLE 2024"), y la propia
// Nota 21 confirma el PAT por una vía DISTINTA del Estado de Patrimonio:
// "UTILIDAD ANTES DE IMPUESTOS" ($1.089,338605 M) menos esa provisión da
// $708,070093 M, coincide (a 1 centavo, redondeo del propio documento) con
// "Resultado del Ejercicio" de la Nota 15 (Patrimonio). Doble confirmación,
// no residuo.
//
// FX: el documento NO declara su propio tipo de cambio de cierre -- TRM
// oficial al 31/12/2024 vía `tools/lookup-fx-close.js` (mismo valor,
// $4.409,15, que Once Caldas 2024 declaró como propio -- buena señal
// cruzada de que la TRM oficial de esa fecha es correcta).
// ============================================================================

const boyacachicocoRevenueLinesByYear = {
  2024: [
    { rawLabel:'Taquilla Venta Boletería Masculina', normalizedCategory:'matchday_competition', amountNative:460.308700, disclosureLevel:'detailed' },
    { rawLabel:'Taquilla Venta Boletería Femenina', normalizedCategory:'matchday_competition', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Derechos de Televisión', normalizedCategory:'broadcasting', amountNative:6463.513089, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auxilio Hotelero – Dimayor', normalizedCategory:'broadcasting', amountNative:416.434550, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auxilio de Transportes – Dimayor', normalizedCategory:'broadcasting', amountNative:85.470260, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por auxilio de Arbitraje – Dimayor', normalizedCategory:'broadcasting', amountNative:255.763849, disclosureLevel:'detailed' },
    { rawLabel:'Ventas por Auxilio de Logística – Dimayor', normalizedCategory:'broadcasting', amountNative:152.900000, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Auxilio de Mejoramientos – Dimayor', normalizedCategory:'broadcasting', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Fondo de Equipos', normalizedCategory:'broadcasting', amountNative:216.862481, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Auxilios – Federación Colombiana de Futbol', normalizedCategory:'competition_bonus', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Patrocinios recibidos de terceros', normalizedCategory:'sponsorship_commercial', amountNative:16.635000, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos por Servicios de Publicidad', normalizedCategory:'sponsorship_commercial', amountNative:1475.415287, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Videos Oficiales Apuestas 2024', normalizedCategory:'sponsorship_commercial', amountNative:84.434550, disclosureLevel:'detailed' },
    { rawLabel:'Ingresos Abonados con Boyacá', normalizedCategory:'season_tickets', amountNative:225.882354, disclosureLevel:'detailed' },
    // No se pudo atribuir a un rubro específico -- ver comentario de cabecera y
    // Admin/dudas-por-club.md.
    { rawLabel:'Menos: Devoluciones (sin atribuir)', normalizedCategory:'other_income', amountNative:-1726.052997, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos no operacionales (descuentos, pasarelas, indemnizaciones, diversos)', normalizedCategory:'other_income', amountNative:137.020364, disclosureLevel:'detailed', items:[
      ['Descuentos comerciales', 0.000001], ['Pasarelas', 2.489681], ['Indemnizaciones', 36.551426], ['Diversos', 97.979256],
    ]},
  ],
};

const boyacachicocoExpenseLinesByYear = {
  2024: [
    { rawLabel:'Costos Nóminas Jugadores Masculinos', normalizedCategory:'wages_squad', amountNative:-4303.480269, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración (personal, honorarios, arrendamientos, seguros, servicios, legales, mantenimiento, diversos)', normalizedCategory:'admin_general_expense', amountNative:-2056.497355, disclosureLevel:'detailed', items:[
      ['Gastos de personal', 1169.847444], ['Diversos', 558.297251], ['Honorarios', 202.789588], ['Gastos legales', 98.860419], ['Arrendamientos', 5.821140], ['Seguros', 2.044611], ['Servicios', 17.949902], ['Mantenimiento y reparaciones', 0.887000],
    ]},
    { rawLabel:'Gastos de Administración: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-458.451061, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración: Depreciación', normalizedCategory:'depreciation', amountNative:-88.526496, disclosureLevel:'detailed' },
    { rawLabel:'Otros egresos no operacionales: Gastos diversos', normalizedCategory:'other_expenses', amountNative:-11.266696, disclosureLevel:'detailed' },
  ],
};

const boyacachicocoFiscalYearMeta = {
  2024: {
    currency:'COP', fxRef:'COP@2024-12-31',
    sourceId:'boyacachico-co-estados-financieros-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Intereses Bancarios (Nota 19, $6,865639 M) - Financieros+Comisiones+Intereses (Nota 20,
    // $263,892643 M).
    netInterest:-257.027005,
    tax:-381.268512,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:0, cash:0, // no verificado esta sesión, mismo alcance que los demás onboardings de esta ronda
    officialTotalRevenue:8264.587487, officialTotalExpenses:6918.221877, officialPAT:708.070093,
  },
};

const boyacachicocoPresupuestoOverlayByYear = {};

const boyacachicocoPasesData = [];
const boyacachicocoResultadosData = {};
const boyacachicocoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['boyacachico-co'] = {
  revenueLinesByYear: boyacachicocoRevenueLinesByYear, expenseLinesByYear: boyacachicocoExpenseLinesByYear,
  fiscalYearMeta: boyacachicocoFiscalYearMeta, pasesData: boyacachicocoPasesData,
  resultadosData: boyacachicocoResultadosData, titulosData: boyacachicocoTitulosData,
  presupuestoOverlayByYear: boyacachicocoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'boyacachico-co-estados-financieros-2024': {
      id:'boyacachico-co-estados-financieros-2024', clubId:'boyacachico-co',
      title:'Estados Financieros (Notas), al 31 de diciembre de 2024 y 2023',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co). PAT confirmado doble: Nota 15 (Patrimonio, "Resultado del Ejercicio") y Nota 21 (Utilidad antes de impuestos menos provisión de renta), coinciden a 1 centavo. La línea "Menos: Devoluciones" (21% del ingreso bruto) no se pudo atribuir a un rubro específico -- ver Admin/dudas-por-club.md. Transcripción completa en Clubes/Colombia/Boyaca Chico/estados-financieros-2024.md.',
    },
});

gestionesByClub['boyacachico-co'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
};

memberCountByClub['boyacachico-co'] = null;
