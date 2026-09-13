// ============================================================================
// data/oncecaldas-data.js — Once Caldas S.A. En Reorganización (Manizales,
// Colombia). Primer club colombiano cargado en finance-of-sports (junto con
// Envigado, misma sesión). Ejercicio 2025 = REAL, único ejercicio cargado a
// propósito (ver nota de alcance abajo).
//
// FUENTE: `Clubes/Colombia/Once Caldas/estados-financieros-2025.pdf` (34
// páginas, "ESTADOS FINANCIEROS Al 31 de diciembre de 2025 y 2024 e Informe
// del Revisor Fiscal", texto real vía pdftotext -layout, NIT 890.801.447-5),
// transcripción completa en `estados-financieros-2025.md` en la misma
// carpeta. Bajado vía SIIS (siis.ia.supersociedades.gov.co), ver
// `fuentes/Colombia/Once Caldas.md`.
//
// OJO — este PDF (a pesar del nombre "estados-financieros") son las NOTAS a
// los estados financieros (desglose rubro por rubro), NO incluye una tabla
// de Estado de Situación Financiera/Estado de Resultado Integral aparte como
// sí incluye el de Envigado (ver data/envigado-data.js). Esto afecta cómo se
// armó fiscalYearMeta[2025].tax, ver ese comentario.
//
// Cifras del documento en MILES de pesos colombianos (confirmado: pág. 7,
// "la información...se encuentra presentada en miles de pesos"; también
// verificado indirectamente: el Informe del Revisor Fiscal dice "generó
// utilidades por $9.138 millones", que coincide con dividir por 1.000 el
// $9.138.546 (miles) que trae la Nota 2). Acá se guardan ya divididas por
// 1.000, en MILLONES de pesos colombianos (COP), mismo criterio de unidad
// que usa el sitio para ARS (amountNative en millones nativos).
//
// REVENUE = Nota 20 "Ingresos de Actividades Ordinarias" (11 líneas, suma
// EXACTA a $58.810,323 M COP, el total impreso) + Nota 25 "Otros Ingresos"
// (4 líneas, $271,337 M) — se suman ambas al campo `revenue` del sitio
// porque acá no hay ninguna otra ubicación para "otros ingresos" que no sea
// financiero (ver criterio idéntico en Envigado). officialTotalRevenue por
// eso es 58.810,323 + 271,337 = 59.081,660 M, no el número que muestra la
// vista rápida de SIIS (que replica solo la Nota 20).
//
// EXPENSES: Nota 21 "Costo de Ventas" ($1.483,046 M), Nota 22 "Gastos de
// Administración" (13 líneas, $2.509,228 M impreso — la suma de mis líneas
// da $2.509,229 M, 1 milésima de diferencia por redondeo de la propia
// transcripción; se usa el TOTAL IMPRESO como amountNative del renglón
// consolidado, no mi propia suma, ver club-data-mapping SKILL.md sección 6),
// Nota 23 "Gastos de Ventas" (19 líneas, $40.862,125 M impreso) — estas 2
// últimas son bolsones heterogéneos (personal, derechos deportivos,
// logística, administración, depreciación...) que SÍ tienen sub-ítems con
// categoría real distinta entre sí (ver club-data-mapping SKILL.md sección
// 1), así que se promovieron a líneas de primer nivel agrupadas por
// categoría (no una única línea "Gastos de Ventas" con todo adentro). Nota
// 27 "Otros Gastos" ($360,154 M) se suma también, mismo criterio que Otros
// Ingresos.
//
// RESULTADO FINAL (PAT): confirmado TRIPLE, dentro del propio documento: (1)
// la tabla de indicadores de negocio en marcha de la Nota 2 dice
// literalmente "Año 2025: $9.138.546" como "resultado del ejercicio"; (2) el
// Informe del Revisor Fiscal narra "la Compañía generó utilidades por
// $9.138 millones"; (3) coincide con la cifra "Ganancia" que muestra la
// vista SIIS ($9.138.546 M, ver fuentes/Colombia/Once Caldas.md). officialPAT
// = 9.138,546 M COP, altísima confianza.
//
// PERO: sumando Ingresos - Costo Ventas - Gastos Admin - Gastos Ventas +
// Ingresos Financieros (Nota 24, $3.873,050 M) + Otros Ingresos - Gastos
// Financieros (Nota 26, $4.294,035 M) - Otros Gastos, el PRETAX que da esta
// cuenta ($13.446,121 M) NO reconcilia limpio contra el pretax que el propio
// documento llama "Utilidad contable" en su nota de conciliación fiscal
// (Nota 15, $9.846,710 M) — una diferencia de ~$3.599 M que este documento
// no explica (no hay una línea de "ganancia extraordinaria por acuerdo de
// reestructuración" ni similar en las notas descargadas). La Nota 15 SÍ da
// el impuesto de renta CORRIENTE exacto ($4.666,696 M), pero no alcanza para
// llegar de mi pretax al PAT confirmado, faltando el efecto de impuesto
// diferido (que la Nota 15 sí prueba que existe: activo por impuesto
// diferido reconocido de $232,682 M en 2025 vs. un pasivo de $195,091 M en
// 2024, un swing de ~$427,7 M, tampoco alcanza para cerrar toda la
// diferencia). Ante la imposibilidad de reconciliar el detalle completo con
// el documento descargado (que no trae el Estado de Resultados Integral
// primario, solo notas — ver fuentes/Colombia/Once Caldas.md para el
// pendiente de re-descargar el radicado correcto), se resolvió el ÚNICO
// campo sin fuente directa (`tax`, en fiscalYearMeta) como RESIDUO: pretax
// (calculado línea por línea desde las Notas 20-27, cada una con su propio
// número impreso) MENOS el PAT confirmado triple. Esto no es un número
// inventado a ciegas: es la única incógnita restante despejada de dos
// anclas 100% sourced (mi pretax línea por línea + el PAT confirmado). Ver
// dudas-por-club.md para la pregunta pendiente al club/SIIS sobre esta
// diferencia.
// ============================================================================

const oncecaldasRevenueLinesByYear = {
  2025: [
    { rawLabel:'Taquilla - Venta de boletería', normalizedCategory:'matchday_competition', amountNative:16372.622, disclosureLevel:'detailed' },
    { rawLabel:'Venta de derechos deportivos jugadores', normalizedCategory:'player_sales', amountNative:12277.477, disclosureLevel:'detailed' },
    { rawLabel:'Préstamos derechos deportivos jugadores', normalizedCategory:'player_sales', amountNative:50.000, disclosureLevel:'detailed' },
    { rawLabel:'Publicidad y propaganda', normalizedCategory:'sponsorship_commercial', amountNative:759.749, disclosureLevel:'detailed' },
    { rawLabel:'DIMAYOR', normalizedCategory:'broadcasting', amountNative:7652.866, disclosureLevel:'detailed' },
    { rawLabel:'Federación Nacional de Fútbol Colombiano', normalizedCategory:'competition_bonus', amountNative:721.400, disclosureLevel:'detailed' },
    { rawLabel:'Patrocinio', normalizedCategory:'sponsorship_commercial', amountNative:4159.546, disclosureLevel:'detailed' },
    { rawLabel:'Participaciones nacionales e internacionales', normalizedCategory:'competition_bonus', amountNative:13388.395, disclosureLevel:'detailed' },
    { rawLabel:'Venta de artículos deportivos', normalizedCategory:'sponsorship_commercial', amountNative:2235.906, disclosureLevel:'detailed' },
    { rawLabel:'Solidaridad', normalizedCategory:'player_sales', amountNative:19.913, disclosureLevel:'detailed' },
    { rawLabel:'Actividades conexas', normalizedCategory:'other_income', amountNative:1172.449, disclosureLevel:'detailed' },
    { rawLabel:'Otros ingresos (recuperaciones, indemnizaciones, arrendamientos, diversos)', normalizedCategory:'other_income', amountNative:271.337, disclosureLevel:'detailed', items:[
      ['Recuperaciones', 225.608], ['Indemnizaciones', 34.277], ['Arrendamientos', 2.731], ['Diversos', 8.721],
    ]},
  ],
};

const oncecaldasExpenseLinesByYear = {
  2025: [
    { rawLabel:'Costo de Ventas productos deportivos', normalizedCategory:'other_expenses', amountNative:-1483.046, disclosureLevel:'detailed' },
    // Nota 23 "Gastos de Ventas" ($40.862,125 M impreso), promovida por sub-categoría real (ver
    // comentario de cabecera):
    { rawLabel:'Gastos de Ventas: Gastos de personal (plantel)', normalizedCategory:'wages_squad', amountNative:-19303.075, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Derechos deportivos (costo transferencia de jugadores)', normalizedCategory:'player_amortisation', amountNative:-7681.212, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Organización y logística (viaje, arrendamientos, servicios, mantenimiento, adecuaciones)', normalizedCategory:'match_organisation_expense', amountNative:-9109.879, disclosureLevel:'detailed', items:[
      ['Logística y preparación evento', 3771.072], ['Gastos de viaje', 3258.787], ['Arrendamientos', 970.242], ['Servicios', 765.383], ['Mantenimiento y reparaciones', 339.246], ['Adecuación e instalación', 5.149],
    ]},
    { rawLabel:'Gastos de Ventas: Administración del plantel (impuestos, seguros, honorarios, contribuciones, legales, publicidad)', normalizedCategory:'admin_general_expense', amountNative:-2992.179, disclosureLevel:'detailed', items:[
      ['Impuestos', 2397.058], ['Publicidad', 531.304], ['Seguros', 23.844], ['Honorarios', 23.489], ['Contribuciones y afiliaciones', 14.281], ['Gastos legales', 2.203],
    ]},
    { rawLabel:'Gastos de Ventas: Diversos y provisiones', normalizedCategory:'other_expenses', amountNative:-1654.881, disclosureLevel:'detailed', items:[
      ['Provisiones', 774.126], ['Diversos área deportiva', 722.906], ['Diversos', 157.849],
    ]},
    { rawLabel:'Gastos de Ventas: Depreciación', normalizedCategory:'depreciation', amountNative:-108.072, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Ventas: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-12.827, disclosureLevel:'detailed' },
    // Nota 22 "Gastos de Administración" ($2.509,228 M impreso), mismo criterio:
    { rawLabel:'Gastos de Administración (personal, honorarios, diversos, viaje, arrendamientos, servicios, seguros, legales, mantenimiento, impuestos)', normalizedCategory:'admin_general_expense', amountNative:-2457.550, disclosureLevel:'detailed', items:[
      ['Gastos de personal', 1424.308], ['Honorarios', 635.150], ['Diversos', 160.553], ['Gastos de viaje', 72.927], ['Arrendamientos', 72.663], ['Servicios', 53.787], ['Seguros', 20.263], ['Gastos legales', 13.514], ['Mantenimiento y reparaciones', 4.386], ['Impuestos', 0], ['Adecuaciones instalaciones', 0],
    ]},
    { rawLabel:'Gastos de Administración: Depreciaciones', normalizedCategory:'depreciation', amountNative:-49.248, disclosureLevel:'detailed' },
    { rawLabel:'Gastos de Administración: Amortizaciones', normalizedCategory:'other_amortisation', amountNative:-2.430, disclosureLevel:'detailed' },
    { rawLabel:'Otros gastos (diversos, impuestos asumidos, pérdida en venta de bienes, seguridad social, ejercicios anteriores)', normalizedCategory:'other_expenses', amountNative:-360.154, disclosureLevel:'detailed', items:[
      ['Gastos diversos', 205.834], ['Impuestos asumidos', 102.931], ['Pérdida en venta y retiro de bienes', 20.800], ['Seguridad social asumida', 19.811], ['Costos y gastos de ejercicios anteriores', 8.227], ['Gastos no deducibles', 1.777], ['Otros', 0.757], ['Costas y procesos judiciales', 0.017],
    ]},
  ],
};

const oncecaldasFiscalYearMeta = {
  2025: {
    // TRM oficial (Superintendencia Financiera de Colombia / Banco de la República) al 31/12/2025,
    // cierre del ejercicio: $3.757,08 COP/USD. El documento NO declara su propio tipo de cambio (a
    // diferencia de los balances argentinos, este balance no tiene un Anexo de "activos y pasivos en
    // moneda extranjera"), así que se usa la TRM de cierre oficial, mismo criterio que ya aplica el
    // sitio cuando un balance argentino no declara su propio fx (ver club-data-mapping SKILL.md
    // sección 5, regla 1). Fuente: Superintendencia Financiera de Colombia
    // (superfinanciera.gov.co/powerbi/reportes/514/482/), cruzado contra dolar-colombia.com.
    currency:'COP', fx:3757.08,
    sourceId:'oncecaldas-estados-financieros-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Ingresos Financieros (Nota 24, $3.873,050 M) - Gastos Financieros (Nota 26, $4.294,035 M).
    netInterest:-420.985,
    // tax: RESIDUO, ver comentario de cabecera del archivo. pretax línea por línea (Notas 20-27,
    // cada línea con su propio número impreso) = 13.446,121 M. officialPAT confirmado triple =
    // 9.138,546 M. tax = 9.138,546 - 13.446,121 = -4.307,575 (gasto por impuesto a las ganancias,
    // corriente + diferido neto — la Nota 15 solo prueba el corriente, $4.666,696 M; el diferido neto
    // implícito de ~$359 M de beneficio no está separado explícito en las notas descargadas).
    tax:-4307.575,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:0, cash:0, // no se cargó (el documento no trae el Estado de Situación Financiera primario en este PDF, solo notas — ver fuentes/Colombia/Once Caldas.md)
    officialTotalRevenue:59081.660, officialTotalExpenses:45214.554, officialPAT:9138.546,
  },
};

const oncecaldasPresupuestoOverlayByYear = {};

// Mercado de pases / resultados deportivos / títulos: sin datos reales cargados todavía para este
// club (fuera de alcance de esta sesión, que se enfocó en Finanzas del Ejercicio 2025 — ver
// CHANGELOG.md). Arrays vacíos en vez de placeholders inventados.
const oncecaldasPasesData = [];
const oncecaldasResultadosData = {};
const oncecaldasTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA.oncecaldas = {
  revenueLinesByYear: oncecaldasRevenueLinesByYear, expenseLinesByYear: oncecaldasExpenseLinesByYear,
  fiscalYearMeta: oncecaldasFiscalYearMeta, pasesData: oncecaldasPasesData,
  resultadosData: oncecaldasResultadosData, titulosData: oncecaldasTitulosData,
  presupuestoOverlayByYear: oncecaldasPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'oncecaldas-estados-financieros-2025': {
      id:'oncecaldas-estados-financieros-2025', clubId:'oncecaldas',
      title:'Estados Financieros (Notas) e Informe del Revisor Fiscal, al 31 de diciembre de 2025 y 2024',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía SIIS (siis.ia.supersociedades.gov.co, NIT 890.801.447-5). El PDF trae las notas completas a los estados financieros (34 páginas, texto real) pero NO el Estado de Situación Financiera/Estado de Resultado Integral primario como tabla aparte — el resultado del ejercicio ($9.138,546 M COP) se confirma triple: tabla de indicadores de negocio en marcha (Nota 2), narrativa del Informe del Revisor Fiscal, y la vista SIIS. La compañía sigue en proceso de reorganización empresarial (Superintendencia de Sociedades, desde agosto de 2012), aunque el ejercicio 2025 dio utilidad. Transcripción completa en Clubes/Colombia/Once Caldas/estados-financieros-2025.md.',
    },
});

// gestionesByClub: no se pudo confirmar con confianza una "gestión"/presidencia en el sentido
// argentino del término (Once Caldas S.A. es una sociedad anónima con Representante Legal, no un
// club asociativo con presidente electo) — se agrega UNA entrada genérica "Gestión actual" (no un
// nombre propio, para no publicar una atribución que no se confirmó) solo para que el selector "Por
// gestión" de Finanzas tenga al menos 1 opción y no rompa (ver club-data-mapping SKILL.md sección 7:
// "mejor un año sin gestión asignada que una gestión inventada" — acá se optó por una etiqueta
// neutra en vez de dejar el objeto vacío, que sí rompía el selector para cualquier club sin ninguna
// entrada).
gestionesByClub.oncecaldas = {
  actual: { nombre:'Gestión actual', firstYear:2025, lastYear:2025 },
};

memberCountByClub.oncecaldas = null;
