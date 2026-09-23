// ============================================================================
// data/depcali-co-data.js — Club Profesional Deportivo Cali S.A. (Cali,
// Colombia). clubId lleva el país al final (`depcali-co`) por la convención
// de Admin/CONVENCIONES.md. Ejercicio 2025 = REAL, único ejercicio cargado a
// propósito (mismo criterio que Envigado/Once Caldas).
//
// FUENTE: `Clubes/Colombia/Deportivo Cali/estados-financieros-2025.pdf` (63
// páginas, "Notas a los Estados Financieros, al 31 de diciembre de 2025 y
// 2024"), texto nativo vía pdftotext -layout, transcripción completa en
// `estados-financieros-2025.md` en la misma carpeta. Bajado vía SIIS
// (siis.ia.supersociedades.gov.co, NIT 890301160 — el mismo NIT de la
// histórica "Asociación Deportivo Cali"), ver
// `fuentes/Colombia/Deportivo Cali.md`.
//
// OJO — CONVERSIÓN SOCIETARIA: el club pasó de "Asociación Deportivo Cali"
// (entidad sin ánimo de lucro, régimen tributario especial al 20%) a "Club
// Profesional Deportivo Cali S.A." (sociedad anónima, tarifa 35% sobre
// utilidad fiscal) en 2024-2025, con IDC Network quedando con el 85% de las
// acciones. Esto es LA explicación de por qué el resultado neto es una
// PÉRDIDA GRANDE (-$6.954.741 M) a pesar de que el resultado operativo antes
// de impuestos fue una ganancia moderada ($1.120.608 M, ver reconciliación
// abajo): la conversión disparó un cargo de impuesto diferido muy grande
// (Nota 25: "Cargo al resultado" de -$7.491.887 M por reconocimiento de
// diferencias temporarias, principalmente ligado a la nueva base fiscal de
// los activos/pasivos bajo el régimen S.A.). El documento NO imprime un
// "Impuesto de renta corriente" ni una "Utilidad antes de impuestos" como
// cifra aparte fuera de esta nota — el tax de este archivo es un RESIDUO,
// documentado abajo, mismo criterio que Once Caldas.
//
// Cifras del documento "expresadas en miles de pesos" — el propio documento
// no repite la aclaración en cada tabla, pero es consistente con el orden de
// magnitud de la vista SIIS (Ingresos $28.233.253 M = exactamente el total de
// la Nota 18 en las cifras del PDF, sin dividir). Acá se guardan divididas
// por 1.000, en MILLONES de pesos colombianos (COP).
//
// REVENUE = Nota 18 "Ingresos por actividades ordinarias" (11 líneas, suma
// EXACTA a $28.233.253 M, coincide con la vista SIIS) + Nota 21 "Otros
// Ingresos" (14 líneas incl. recuperaciones y venta de derechos deportivos,
// suma EXACTA a $29.154.002 M). officialTotalRevenue = 57.387.255.
//
// EXPENSES: Nota 19 "Gastos de Administración" ($8.066.723 M, con
// Depreciaciones separadas), Nota 20 "Gastos de Ventas" ($45.744.581 M, el
// bolsón más grande — incluye el plantel profesional, gastos de personal de
// ventas $28.602.139 M según Nota 20(1), con Depreciaciones separadas), Nota
// 22 "Otros Gastos" ($1.413.724 M). officialTotalExpenses = 55.225.028.
// No hay una nota de "Costo de Ventas" separada para este club (no vende
// mercancía deportiva por fuera del rubro comercial de la Nota 18).
//
// netInterest = Nota 23 "Ingresos y Gastos Financieros": Ingresos Financieros
// (Diferencia En Cambio + Intereses = $1.720.160 M) - Costos Financieros
// (Diferencia En Cambio + Comisiones + Intereses por Mora y Sobregiro +
// Intereses + Otros (Gmf, descuentos) + Gastos Bancarios = $2.761.779 M) =
// -1.041.619 M, EXACTO igual a los 2 totales impresos por separado.
//
// tax = RESIDUO (mismo criterio que Once Caldas, ver comentario en
// data/oncecaldas-data.js): pretax calculado línea por línea desde las Notas
// 18-23 = Revenue(57.387.255) - Expenses(55.225.028) + netInterest(-1.041.619)
// = 1.120.608. officialPAT confirmado por la vista SIIS = -6.954.741 (pérdida).
// tax = officialPAT - pretax = -6.954.741 - 1.120.608 = -8.075.349. Esto NO es
// un número inventado a ciegas: la Nota 25 (Impuesto a las ganancias) prueba
// que existe un cargo de impuesto diferido de gran magnitud (-7.491.887, por
// el "movimiento del impuesto diferido" que trae la conversión societaria),
// consistente en orden de magnitud con el residuo. La pregunta pendiente
// (por qué el documento no imprime el desglose completo corriente/diferido
// como cifra única final) queda para Admin/dudas-por-club.md.
// ============================================================================

const depcalicoRevenueLinesByYear = {
  2025: [
    { rawLabel:'Taquilla-venta De Boletería', normalizedCategory:'matchday_competition', amountNative:11076.301, disclosureLevel:'detailed' },
    { rawLabel:'Dimayor', normalizedCategory:'broadcasting', amountNative:6157.191, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:5655.623, disclosureLevel:'detailed' },
    { rawLabel:'Participación Eventos Internacionales (equipo femenino en Copa Libertadores)', normalizedCategory:'competition_bonus', amountNative:2676.792, disclosureLevel:'detailed' },
    { rawLabel:'Auxilios', normalizedCategory:'broadcasting', amountNative:1899.627, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad Y Propaganda', normalizedCategory:'sponsorship_commercial', amountNative:666.689, disclosureLevel:'detailed' },
    { rawLabel:'Participación Eventos Nacionales', normalizedCategory:'competition_bonus', amountNative:351.030, disclosureLevel:'detailed' },
    { rawLabel:'Venta Artículos Deportivos', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Venta de Revistas', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Venta de Implementos Deportivos', normalizedCategory:'sponsorship_commercial', amountNative:0, disclosureLevel:'detailed' },
    { rawLabel:'Devolución En Servicios', normalizedCategory:'other_income', amountNative:-250.000, disclosureLevel:'detailed' },
    // Promovidas a líneas propias (Versión de esta sesión, corrigiendo un hallazgo de
    // node tools/audit.js: catch-all dominante) las 3 categorías reales distintas que venían
    // adentro del catch-all "Otros Ingresos" — ver club-data-mapping SKILL.md sección 1.
    { rawLabel:'Venta y préstamo de derechos deportivos, mecanismo de solidaridad', normalizedCategory:'player_sales', amountNative:3087.347, disclosureLevel:'detailed', items:[
      ['Venta De Derechos Deportivos', 1664.506], ['Mecanismo De Solidaridad', 1422.841], ['Variable-venta de derechos', 0], ['Préstamo Derechos Deportivos', 0],
    ]},
    { rawLabel:'Escuela de Fútbol', normalizedCategory:'youth_football', amountNative:1295.883, disclosureLevel:'detailed' },
    { rawLabel:'Cuotas de sostenimiento (asociados y beneficiarios)', normalizedCategory:'member_dues', amountNative:98.456, disclosureLevel:'detailed', items:[
      ['Cuotas De Sostenimiento', 80.691], ['Cuota Extraordinaria Asociados', 12.332], ['Cuotas De Sostenimiento-Beneficiarios', 5.433],
    ]},
    { rawLabel:'Otros Ingresos (recuperaciones, diversos, indemnizaciones, servicios, arrendamientos, donaciones, participaciones en concesiones)', normalizedCategory:'other_income', amountNative:24672.316, disclosureLevel:'detailed', items:[
      ['Recuperaciones', 22375.172], ['Diversos', 1507.840], ['Indemnizaciones', 385.262], ['Servicios', 194.970], ['Arrendamientos', 147.261], ['Donaciones', 32.304], ['Participaciones En Concesiones', 29.507],
    ]},
  ],
};

const depcalicoExpenseLinesByYear = {
  2025: [
    // Nota 19 "Gastos de Administración" ($8.066.723 M impreso):
    { rawLabel:'Gastos de Administración (honorarios, personal, servicios, legales, diversos, seguros, arrendamientos, viajes, mantenimiento, adecuación)', normalizedCategory:'admin_general_expense', amountNative:-8060.453, disclosureLevel:'detailed', items:[
      ['Honorarios', -5914.876], ['Gastos De Personal', -1405.778], ['Servicios', -295.671], ['Gastos Legales', -145.289], ['Diversos', -106.578], ['Seguros', -71.638], ['Arrendamientos', -57.560], ['Gastos De Viaje', -49.477], ['Mantenimiento y Reparaciones', -11.581], ['Adecuación E Instalación', -2.005],
    ]},
    { rawLabel:'Gastos de Administración: Depreciaciones', normalizedCategory:'depreciation', amountNative:-6.270, disclosureLevel:'detailed' },
    // Nota 20 "Gastos de Ventas" ($45.744.581 M impreso, el plantel profesional):
    { rawLabel:'Gastos de Ventas: Gastos de personal (plantel)', normalizedCategory:'wages_squad', amountNative:-28602.139, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Derechos deportivos (participaciones de terceros en transferencias, mecanismo de solidaridad) y Amortizaciones', normalizedCategory:'player_amortisation', amountNative:-2488.607, disclosureLevel:'detailed', items:[
      ['Derechos Deportivos', -1728.020], ['Amortizaciones', -760.587],
    ]},
    { rawLabel:'Gastos de Ventas: organización y logística (diversos, impuestos, servicios, viajes, arrendamientos, mantenimiento, deterioro de cartera, adecuación e instalación)', normalizedCategory:'match_organisation_expense', amountNative:-11843.193, disclosureLevel:'detailed', items:[
      ['Diversos', -5327.231], ['Impuestos', -1792.910], ['Servicios', -1753.391], ['Gastos De Viaje', -1428.260], ['Arrendamientos', -569.494], ['Mtto y Reparaciones', -518.465], ['Deterioro', -394.751], ['Adecuación e Instalación', -58.691],
    ]},
    { rawLabel:'Gastos de Ventas: Honorarios, Contribuciones y Afiliaciones, Seguros, Gastos Legales', normalizedCategory:'admin_general_expense', amountNative:-1548.845, disclosureLevel:'detailed', items:[
      ['Honorarios', -845.477], ['Contribuciones y Afiliaciones', -575.792], ['Seguros', -84.553], ['Gastos Legales', -43.023],
    ]},
    { rawLabel:'Gastos de Ventas: Depreciaciones', normalizedCategory:'depreciation', amountNative:-1261.797, disclosureLevel:'detailed' },
    // Nota 22 "Otros Gastos" ($1.413.724 M impreso):
    { rawLabel:'Otros Gastos (gastos diversos por demandas y multas, gastos extraordinarios, pérdida en venta y retiro de bienes)', normalizedCategory:'other_expenses', amountNative:-1413.724, disclosureLevel:'detailed', items:[
      ['Gastos Diversos (demandas, multas)', -1273.705], ['Gastos Extraordinarios', -111.584], ['Perdida En Venta y Retiro de Bienes', -28.435],
    ]},
  ],
};

const depcalicoFiscalYearMeta = {
  2025: {
    // TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
    // cierre del ejercicio: $3.757,08 COP/USD. El documento no declara su propio tipo de cambio de
    // cierre (sin Anexo de moneda extranjera), mismo caso que Envigado/Once Caldas.
    currency:'COP', fxRef:'COP@2025-12-31',
    sourceId:'depcali-co-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Nota 23: Ingresos Financieros (1.720.160) - Costos Financieros (2.761.779), EXACTO igual a
    // los 2 totales impresos por separado.
    netInterest:-1041.619,
    // RESIDUO: pretax línea por línea (Notas 18-23) = 1.120.608. officialPAT confirmado por SIIS =
    // -6.954.741. tax = -6.954.741 - 1.120.608 = -8.075.349. La Nota 25 (Impuesto a las ganancias)
    // prueba que existe un cargo de impuesto DIFERIDO de gran magnitud (-7.491.887) por la
    // conversión societaria de Asociación a S.A. en 2024-2025, consistente en orden de magnitud
    // con este residuo — ver comentario de cabecera. Duda pendiente sobre el desglose exacto
    // corriente/diferido anotada en el reporte de esta sesión.
    tax:-8075.349,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Obligaciones Financieras (Nota 12) corriente (357,812) + no corriente
    // (40.281,740). cash = Nota 5, Bancos+Cajas+Derechos fiduciarios.
    grossDebt:40639.552, cash:21158.174,
    officialTotalRevenue:57387.255, officialTotalExpenses:55225.028, officialPAT:-6954.741,
  },
};

const depcalicoPresupuestoOverlayByYear = {};

const depcalicoPasesData = [];
const depcalicoResultadosData = {};
const depcalicoTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['depcali-co'] = {
  revenueLinesByYear: depcalicoRevenueLinesByYear, expenseLinesByYear: depcalicoExpenseLinesByYear,
  fiscalYearMeta: depcalicoFiscalYearMeta, pasesData: depcalicoPasesData,
  resultadosData: depcalicoResultadosData, titulosData: depcalicoTitulosData,
  presupuestoOverlayByYear: depcalicoPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'depcali-co-estados-financieros-2025': {
      id:'depcali-co-estados-financieros-2025', clubId:'depcali-co',
      title:'Notas a los Estados Financieros, al 31 de diciembre de 2025 y 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890301160 — el mismo NIT de la histórica Asociación Deportivo Cali). El PDF trae solo las notas (texto nativo, sin tabla de Estado de Resultados primaria aparte ni impuesto de renta corriente como cifra única), así que el campo tax de este ejercicio es un residuo (pretax línea por línea menos el resultado neto confirmado por la vista SIIS) — ver comentario de cabecera de data/depcali-co-data.js. El club convirtió su forma jurídica de Asociación (sin ánimo de lucro) a S.A. en 2024-2025 (IDC Network con 85% de las acciones), lo que explica el cargo grande de impuesto diferido detrás de esa pérdida neta. Transcripción completa en Clubes/Colombia/Deportivo Cali/estados-financieros-2025.md.',
    },
});

gestionesByClub['depcali-co'] = {
  actual: { nombre:'Rafael Ignacio Tinoco Kipps (Representante Legal)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['depcali-co'] = null;
