// ============================================================================
// data/fortalezaceif-co-data.js — FORTALEZA FUTBOL CLUB S.A. (Colombia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-02), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Colombia/Fortaleza CEIF/estados-financieros-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "fortalezaceif-co" — slug de "Fortaleza CEIF" + '-co' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "FORTALEZA FUTBOL CLUB S.A." — el .md, 31 veces (nombre del club + forma societaria)
//   displayName        ok        "Fortaleza CEIF" — nombre de la carpeta del club en Clubes/
//   country            ok        "CO" — carpeta de país "Colombia" (tabla PAISES)
//   reportingCurrency  ok        "COP" — moneda de curso legal de Colombia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (87 de 87 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 51 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [colombia] fortaleza ceif: #16233D dark navy, #FFFFFF white, #BC183D crimson red
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (contenido del .md (87 de 87 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (2 menciones de "consolidado")
//   currency           ok        "COP" — moneda de curso legal de Colombia (tabla PAISES de alta-club.mjs)
//   fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 1 línea(s), pero ninguno es una cotización plausible (descartadas por traer en su frase otra fec
//   fxRef              ok        "COP@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene COP@2025-12-31 = 3757.08 (TRM oficial (Superintendencia Financiera de Colombia) al 31/12/202
//   sourceId           ok        "fortalezaceif-co-estados-financieros-2025" — clubId + nombre del archivo en slug
//   liga               ok        "co-primeraA" — roster cacheado de "2025 Liga DIMAYOR" (tools/club-league-reference/co.json), coincidencia única por palabras "Fortaleza" = "Fortaleza CEIF"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"COP","fxRef":"COP@2025-12-31","sourceId":"fortalezaceif-co-estados-financieros-2025"}
// ============================================================================

const fortalezaceifcoRevenueLinesByYear = {
  // 2017: cargado por tools/cargar.mjs (2026-10-02) desde Clubes/Colombia/Fortaleza CEIF/estados-financieros-2017.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Colombia/Fortaleza CEIF/estados-financieros-2017.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2017: [
    { rawLabel:'Actividades Deportivas', normalizedCategory:'lump_football_operations', amountNative:4220.658, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'Otros Ingresos', normalizedCategory:'other_income', amountNative:1027.45, disclosureLevel:'aggregated' }, // pág. 14, Jev 0.95
    { rawLabel:'Venta de Productos', normalizedCategory:'sponsorship_commercial', amountNative:70.183, disclosureLevel:'aggregated' }, // pág. 14, precedente
    { rawLabel:'Casa Hogar', normalizedCategory:'other_income', amountNative:1.6, disclosureLevel:'aggregated' }, // pág. 14, Jev 0.95
    { rawLabel:'Aprovechamientos', normalizedCategory:'other_income', amountNative:0.001, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.99
    { rawLabel:'Ajuste al Peso', normalizedCategory:'other_income', amountNative:0.005, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
  ],
};
const fortalezaceifcoExpenseLinesByYear = {
  2017: [ // tools/cargar.mjs (2026-10-02)
    { rawLabel:'Costos de Ventas', normalizedCategory:'other_expenses', amountNative:-127.783, disclosureLevel:'aggregated' }, // pág. 15, precedente
    { rawLabel:'Costos Extraordinarios', normalizedCategory:'exceptional_items', amountNative:-49.494, disclosureLevel:'aggregated' }, // pág. 15, Jev 1
    { rawLabel:'Total Gastos de Administración', normalizedCategory:'admin_general_expense', amountNative:-2478.598, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Total Gastos de Ventas', normalizedCategory:'admin_general_expense', amountNative:-979.969, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Otros gastos', normalizedCategory:'other_expenses', amountNative:-41.78, disclosureLevel:'aggregated' }, // pág. 19, Jev 1
  ],
};
const fortalezaceifcoFiscalYearMeta = {
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): fila = 41,780. Nota 23 partida por un salto de página: las filas quedaron en la pág. 18 y el total solo en la 19; extraer la dejó afuera. (1.468) + 36.151 + 4.658 + 1 + 1.615 + 823 = 41.780.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): fila = (3,581). El PDF rotula 'Total Otros Ingresos' el total de la nota 25 COSTOS FINANCIEROS (gastos bancarios 389 + comisiones 1.944 + intereses 1.249): es un costo.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): resultado-final = 1,347,094. El documento no imprime el impuesto en ningún lado (sin estado de resultados, sin nota de impuesto, sin conciliación fiscal); el resultado final está en la nota de patrimonio y lo repiten 2018-2020. El impuesto se deduce.
  // 2017: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-02): sin-dudas. Guido 2026-10-02: el año cierra (resultado contra lo impreso); las dudas de localizar y extraer las contesta la aritmética o los ajustes del año. No vuelven a la cola.
  2017: { // tools/cargar.mjs (2026-10-02). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'COP', fxRef:'COP@2017-12-31',
    sourceId:'fortalezaceif-co-estados-financieros-2017',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-3.581, tax:-291.598,
    extraRows: [
      {label:'Costos financieros', value:-3.581},
      {label:'Impuesto (deducido: antes de impuestos − resultado final, por ajuste manual)', value:-291.598},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Actividades Deportivas', lado:'revenue', importe:4220.658, motivo:'Guido 2026-10-02: tabla de categorías de Fortaleza aprobada (la propuesta de la IA).'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:5319.897, officialTotalExpenses:3628.13, officialPAT:1347.094,
  },
};
const fortalezaceifcoPresupuestoOverlayByYear = {};

const fortalezaceifcoPasesData = [];
const fortalezaceifcoResultadosData = {};
const fortalezaceifcoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['fortalezaceif-co'] = {
  revenueLinesByYear: fortalezaceifcoRevenueLinesByYear, expenseLinesByYear: fortalezaceifcoExpenseLinesByYear,
  fiscalYearMeta: fortalezaceifcoFiscalYearMeta, pasesData: fortalezaceifcoPasesData,
  resultadosData: fortalezaceifcoResultadosData, titulosData: fortalezaceifcoTitulosData,
  presupuestoOverlayByYear: fortalezaceifcoPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (agregado por la Versión 379: el esqueleto del alta no lo traía).
Object.assign(sources, {
  'fortalezaceif-co-estados-financieros-2017': {
    id:'fortalezaceif-co-estados-financieros-2017', clubId:'fortalezaceif-co',
    title:'FORTALEZA FUTBOL CLUB S.A. — estados-financieros-2017 (ejercicio 2017)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-02) desde la transcripción Clubes/Colombia/Fortaleza CEIF/estados-financieros-2017.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['fortalezaceif-co'] = null;
