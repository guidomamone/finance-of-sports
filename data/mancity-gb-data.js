// ============================================================================
// data/mancity-gb-data.js — Manchester City. Companies House n.° 00040946.
//
// OJO, LA SALVEDAD MÁS IMPORTANTE DE ESTE CLUB: a diferencia de los otros clubes ingleses ya
// sourceados (Arsenal, Liverpool, etc.), estas cuentas NO son consolidadas. Son las de la
// sociedad "Manchester City Football Club Limited" SOLA — el perímetro CLUB, no el perímetro
// GRUPO. La controlante es City Football Group Limited (dueña además de New York City FC,
// Melbourne City FC, Girona FC y otros clubes en EE.UU., España, Japón, etc.), que consolida a
// Manchester City junto con esas otras sociedades en SU PROPIO balance, publicado aparte y NO
// cargado acá. Las propias cuentas lo dicen explícito en la nota 2 ("Basis of consolidation"):
// "The Company is exempt under section 400 of the Companies Act 2006 from the requirement to
// prepare consolidated financial statements as it and its subsidiary undertakings are included
// by full consolidation in the consolidated financial statements of City Football Group
// Limited". Esto se repite en publicNote de las 2 fuentes más abajo para que quede visible al
// visitante, no solo en este comentario interno.
//
// Ejercicio cerrado el 30 de junio (confirmado en la carátula de los 2 PDF: "For the year ended
// 30 June 2024" / "...2025"). 2024 = temporada 2023/24. 2025 = temporada 2024/25.
//
// Fuente: Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2023-24.md (37 págs.,
// balance auditado por BDO LLP) y manchester-city-full-accounts-2024-25.md (39 págs., mismo
// auditor). Los dos PDF están depositados en Companies House ("Full accounts"), firmados por
// DocuSign y escaneados después de firmar (de ahí el sello "Docusign Envelope ID" en cada
// página), pero con capa de texto nativa (no hizo falta OCR).
//
// FX: GBP es moneda nueva en este proyecto (no existe todavía en data/currency-map.js, y no es
// tarea de esta sesión agregarla). No hay tipo de cambio propio declarado por el documento (a
// diferencia de los balances argentinos, que sí declaran su TC de cierre en un Anexo de moneda
// extranjera) — GBP es la moneda de reporte, no hay nada que convertir a peso local. Se referencia
// fxRef:'GBP@2024-06-30' / 'GBP@2025-06-30' (FX_CLOSE, data/currency-map.js) en vez de un fx
// literal, siguiendo la Versión 125: esas dos claves TODAVÍA NO EXISTEN en FX_CLOSE, quedan
// pendientes de agregar cuando alguien las necesite en vivo (el toggle nativa/USD no rompe sin
// ellas, fxMetaFor() cae a un fallback; ver data/currency-map.js).
//
// CATEGORIZACIÓN (revenueLines/expenseLines, ver .claude/skills/club-data-mapping/SKILL.md):
//   - Matchday -> matchday_competition. Broadcasting - UEFA / Broadcasting - All Other -> las
//     dos a broadcasting (el documento las presenta como 2 líneas paralelas de la misma nota,
//     no anidadas, así que quedan como 2 líneas de primer nivel con la misma categoría en vez de
//     items de una sola). Other commercial activities -> sponsorship_commercial. Other operating
//     income -> other_income (nota separada, "compensación de UEFA/FIFA por ceder jugadores a
//     selecciones" + EPPP, no es parte de las 3 líneas de Revenue pero sí de la utilidad
//     operativa, así que entra a revenueLines igual).
//   - Employee costs (Note 7) -> ENTERO a wages_squad. El documento NO separa el costo de
//     personal por área (solo da la cabeza de conteo: "Football staff - including players" vs.
//     "Commercial/administration staff", sin desglosar el COSTO por esas 2 columnas). Repartir el
//     costo a prorrata de cabezas sería inventar un dato que el documento no da. Se prefirió
//     cargar el total a wages_squad en vez de other_expenses/admin_general_expense, porque la
//     propia Memoria usa "Employee costs/revenue" (58%/59%) como el KPI financiero central del
//     club — el documento mismo trata a la masa salarial completa como una sola cifra relevante
//     para el negocio del fútbol, no como un gasto administrativo genérico.
//   - Direct cost of sales and consumables + Remuneration of Auditors (audit fees) ->
//     admin_general_expense (costos comerciales/administrativos no deportivos, ver la categoría
//     en category-map.js).
//   - Other external charges -> other_expenses. Es el catch-all real: la Nota 5 no lo desglosa
//     más (probablemente incluye viajes, seguridad, marketing, mantenimiento, honorarios
//     profesionales, etc., pero el documento no lo separa).
//   - Amortisation and impairment of intangible assets (Note 12) -> player_amortisation ENTERO.
//     La nota junta amortización Y deterioro de pases en una sola línea ("Amortisation AND
//     impairment"), sin separar cuánto es cada uno — y el desglose de "Other intangibles" (Note
//     12) muestra $0 de cargo en los 2 ejercicios, así que el 100% de esta línea es de pases.
//     No hay player_impairment propio por la misma razón: el documento no lo separa.
//   - Depreciation of property, plant and equipment (Owned + Leased, Notes 13/14) -> depreciation.
//
// "(Profit)/loss on disposal of property, plant and equipment" (Nota 5) — LA FILA MÁS DIFÍCIL DE
// RECONCILIAR DE LOS 2 DOCUMENTOS. En el ejercicio 2023-24 el OCR/transcripción la muestra como
// "16" seguido de "1,236" en la misma línea, con un "." en la columna 2023 — a primera vista
// parece "£1.236m de profit, sin comparativo". PERO esa lectura NO reconcilia: sumando el resto
// de las líneas de la Nota 5 (2024) da £779.955k, contra un total impreso de £779.971k (falta
// £16k), y sumando el resto de 2023 da £752.626k contra un total impreso de £753.862k (falta
// EXACTO £1.236k). Es decir: "16" es el valor de 2024 y "1.236" es el valor de 2023 — el OCR juntó
// las 2 columnas en una sola celda. Confirmado sin ambigüedad con el ejercicio 2024-25 (que
// transcribió bien las 2 columnas): "(Profit)/loss on disposal of property, plant and equipment
// (80) 16" — el comparativo 2024 ahí SÍ dice "16" solo, limpio. Cargado como: 2024 = pérdida de
// £16k (expense positivo, sube el total), 2025 = ganancia de £80k (expense negativo, baja el
// total) — los 2 casos reconcilian EXACTO contra el total impreso de su propia Nota 5. Categorizado
// other_expenses (venta de activos fijos, no de jugadores — no es profitOnPlayerSales).
//
// "Profit on disposal of players' registrations" (£139,009k en 2024, £95,210k en 2025) NO es una
// revenueLine: el propio Statement of Profit or Loss la muestra DEBAJO de "Operating profit/(loss)",
// aparte del cuerpo de Revenue/Operating expenses (mismo criterio que netInterest, ver
// club-data-mapping SKILL.md sección 2-3) — va a fiscalYearMeta.profitOnPlayerSales.
//
// netInterest: se usó SIEMPRE el número que aparece en el Statement of Profit or Loss primario
// ("Interest receivable and similar income" / "Interest payable and similar charges" tal cual
// figuran en el estado principal), NO el total de las Notas 9/10, que en los 2 ejercicios
// incluye partidas (ganancias/pérdidas por diferencia de cambio, derivados) que evidentemente NO
// llegan a esas 2 líneas del estado principal — el estado principal reconcilia EXACTO contra el
// resultado antes de impuestos impreso ("Profit/(loss) on ordinary activities before taxation");
// la nota, no. Ejemplo 2024: Nota 9 total = £3.583k, pero el P&L usa solo £1.098k (el resto,
// £2.485k de "Foreign exchange gains", no impacta esa línea del estado principal); Nota 10 total
// = £11.132k, el P&L usa solo £5.853k (la diferencia, £5.279k, es la "Loss on derivatives" que en
// 2024 quedó como pasivo de balance sin pasar por esta línea — recién en 2025 aparece una reserva
// de cobertura, "Hedging reserve" £3.114k en el Estado de Cambios en el Patrimonio, señal de que
// el club adoptó cash-flow hedge accounting ese año, diferido a OCI en vez de P&L). No se investigó
// más a fondo el porqué contable exacto de la nota vs. el estado principal — se usó el estado
// principal porque es el que reconcilia EXACTO, que es el criterio que manda.
//
// tax = 0 en los 2 ejercicios (Nota 11: "Total tax charge" en blanco/0, y el propio documento
// confirma que "Profit/(loss) on ordinary activities before taxation" y "...after taxation" son
// el mismo número en los 2 años — la compañía tiene pérdidas impositivas acumuladas de más de
// £500m que absorben cualquier ganancia gravable, ver Nota 11(c)).
//
// grossDebt = 0 en los 2 ejercicios, y es un CERO REAL, no "sin dato": el Balance Sheet de ESTA
// sociedad no tiene ninguna línea de "Loans"/"Borrowings" propia — todo el pasivo es Trade and
// other payables, Deferred income, Lease liabilities (dentro de Trade and other payables) y
// Derivative financial instruments. Los "$650m term loan" (jul-2021) y "$270m term loan"
// (jun-2024) que menciona la Nota "Going Concern" están tomados a nivel City Football Group, NO
// en el balance de Manchester City Football Club Limited (mismo patrón que el perímetro de
// consolidación: la deuda del grupo no es deuda de esta sociedad). No se contaron los lease
// liabilities (£63,344k en 2024 / no recalculado para 2025 dentro de este alcance) como grossDebt,
// mismo criterio que Boca/Racing (grossDebt = deuda financiera bancaria, no leases ni pasivo
// comercial). cash = "Cash at bank and in hand" del Balance Sheet.
//
// VERIFICACIÓN (node -e, ver sesión de carga): revenueLines suma EXACTO
// officialTotalRevenue; Math.abs(expenses+nonCash) da EXACTO officialTotalExpenses; la fórmula
// completa de PAT da EXACTO officialPAT, para los 2 ejercicios. Sin residuo.
// ============================================================================

const mancityGbRevenueLinesByYear = {
  // Ejercicio 2023-24 (cerrado 30/6/2024). Fuente: Nota 4 "Revenue" + Nota 5 "Operating loss"
  // (Other operating income), pág. 19/26 del PDF. Suma exacta a £719.474 M GBP.
  2024: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:75.607, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting - UEFA', normalizedCategory:'broadcasting', amountNative:104.599, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting - All Other', normalizedCategory:'broadcasting', amountNative:190.132, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'sponsorship_commercial', amountNative:344.681, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:4.455, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2024-25 (cerrado 30/6/2025). Fuente: Nota 4 "Revenue" + Nota 5, pág. 27/29 del PDF.
  // Suma exacta a £696.929 M GBP.
  2025: [
    { rawLabel:'Matchday', normalizedCategory:'matchday_competition', amountNative:75.084, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting - UEFA', normalizedCategory:'broadcasting', amountNative:70.651, disclosureLevel:'detailed' },
    { rawLabel:'Broadcasting - All Other', normalizedCategory:'broadcasting', amountNative:207.976, disclosureLevel:'detailed' },
    { rawLabel:'Other commercial activities', normalizedCategory:'sponsorship_commercial', amountNative:340.383, disclosureLevel:'detailed' },
    { rawLabel:'Other operating income', normalizedCategory:'other_income', amountNative:2.835, disclosureLevel:'detailed' },
  ],
};

const mancityGbExpenseLinesByYear = {
  // Ejercicio 2023-24. Fuente: Nota 5 "Operating loss" (Operating expenses), pág. 26 del PDF.
  // Ver comentario de cabecera para la reconstrucción de "(Profit)/loss on disposal of PP&E"
  // (16, no 1.236 — el 1.236 es el comparativo 2023). Suma de expenses+nonCash exacta a
  // £(779.971) M GBP en valor absoluto.
  2024: [
    { rawLabel:'Employee costs', normalizedCategory:'wages_squad', amountNative:-412.573, disclosureLevel:'detailed' },
    { rawLabel:'Direct cost of sales and consumables', normalizedCategory:'admin_general_expense', amountNative:-17.186, disclosureLevel:'detailed' },
    { rawLabel:'Remuneration of Auditors (audit fees)', normalizedCategory:'admin_general_expense', amountNative:-0.080, disclosureLevel:'detailed' },
    { rawLabel:'Other external charges', normalizedCategory:'other_expenses', amountNative:-172.391, disclosureLevel:'not_disclosed' },
    { rawLabel:'(Profit)/loss on disposal of property, plant and equipment', normalizedCategory:'other_expenses', amountNative:-0.016, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation and impairment of intangible assets (players\' registrations)', normalizedCategory:'player_amortisation', amountNative:-165.094, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment — Owned', normalizedCategory:'depreciation', amountNative:-11.179, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment — Leased', normalizedCategory:'depreciation', amountNative:-1.452, disclosureLevel:'detailed' },
  ],
  // Ejercicio 2024-25. Fuente: Nota 5, pág. 29 del PDF. Suma de expenses+nonCash exacta a
  // £(790.231) M GBP en valor absoluto.
  2025: [
    { rawLabel:'Employee costs', normalizedCategory:'wages_squad', amountNative:-408.403, disclosureLevel:'detailed' },
    { rawLabel:'Direct cost of sales and consumables', normalizedCategory:'admin_general_expense', amountNative:-9.307, disclosureLevel:'detailed' },
    { rawLabel:'Remuneration of Auditors (audit fees)', normalizedCategory:'admin_general_expense', amountNative:-0.090, disclosureLevel:'detailed' },
    { rawLabel:'Other external charges', normalizedCategory:'other_expenses', amountNative:-187.753, disclosureLevel:'not_disclosed' },
    { rawLabel:'(Profit)/loss on disposal of property, plant and equipment', normalizedCategory:'other_expenses', amountNative:0.080, disclosureLevel:'detailed' },
    { rawLabel:'Amortisation and impairment of intangible assets (players\' registrations)', normalizedCategory:'player_amortisation', amountNative:-169.546, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment — Owned', normalizedCategory:'depreciation', amountNative:-11.901, disclosureLevel:'detailed' },
    { rawLabel:'Depreciation of property, plant and equipment — Leased', normalizedCategory:'depreciation', amountNative:-3.311, disclosureLevel:'detailed' },
  ],
};

const mancityGbFiscalYearMeta = {
  2024: {
    currency:'GBP', fxRef:'GBP@2024-06-30',
    sourceId:'mancity-gb-full-accounts-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // grossDebt=0: ver comentario de cabecera (no hay línea de Loans/Borrowings propia en el
    // balance de esta sociedad, la deuda del term loan está a nivel City Football Group).
    grossDebt:0, cash:53.767,
    profitOnPlayerSales:139.009, assetSales:0,
    // netInterest = Interest receivable (Statement of P&L, £1.098M) - Interest payable
    // (Statement of P&L, £5.853M). Ver comentario de cabecera sobre por qué NO se usó el total
    // de las Notas 9/10 (£3.583M / £11.132M), que no reconcilia contra el resultado impreso.
    netInterest:-4.755, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:1.098},
      {label:'Interest payable and similar charges', value:-5.853},
    ],
    officialTotalRevenue:719.474, officialTotalExpenses:779.971, officialPAT:73.757,
  },
  2025: {
    currency:'GBP', fxRef:'GBP@2025-06-30',
    sourceId:'mancity-gb-full-accounts-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    grossDebt:0, cash:173.724,
    profitOnPlayerSales:95.210, assetSales:0,
    netInterest:-11.824, tax:0,
    extraRows: [
      {label:'Interest receivable and similar income', value:7.768},
      {label:'Interest payable and similar charges', value:-19.592},
    ],
    officialTotalRevenue:696.929, officialTotalExpenses:790.231, officialPAT:-9.916,
  },
};

// mancityGbPresupuestoOverlayByYear: sin presupuesto oficial cargado (solo hay balances
// auditados), vacío por ahora, mismo mecanismo que el resto de los clubes (ver data/river-data.js).
const mancityGbPresupuestoOverlayByYear = {};

// Mercado de pases / resultados deportivos: sin cargar en esta sesión (fuera de alcance del
// pedido — onboardear solo los datos financieros de los 2 ejercicios). Arrays vacíos, no
// placeholders inventados.
const mancityGbPasesData = [];
const mancityGbResultadosData = {};
const mancityGbTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['mancity-gb'] = {
  revenueLinesByYear: mancityGbRevenueLinesByYear, expenseLinesByYear: mancityGbExpenseLinesByYear,
  fiscalYearMeta: mancityGbFiscalYearMeta, pasesData: mancityGbPasesData,
  resultadosData: mancityGbResultadosData, titulosData: mancityGbTitulosData,
  presupuestoOverlayByYear: mancityGbPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'mancity-gb-full-accounts-2024': {
    id:'mancity-gb-full-accounts-2024', clubId:'mancity-gb',
    title:'Manchester City Football Club Limited — Full Accounts (Companies House n.° 00040946), ejercicio cerrado el 30 de junio de 2024',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00040946/filing-history',
    publicNote:'Cuentas de la sociedad del club (Manchester City Football Club Limited) sola, NO las cuentas consolidadas de City Football Group, que además controla otros clubes (Nueva York, Melbourne, Girona, entre otros) y publica su propio balance por separado.',
    note:'PDF de 37 páginas depositado en Companies House ("Full accounts"), firmado por DocuSign y escaneado después de firmar, con capa de texto nativa (sin necesidad de OCR). Transcripción completa en Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2023-24.md. Auditor: BDO LLP. Ver el comentario de cabecera de este archivo para el detalle de la reconciliación de la fila "(Profit)/loss on disposal of property, plant and equipment" (ambigua en este ejercicio, resuelta cruzando contra el ejercicio 2024-25).',
  },
  'mancity-gb-full-accounts-2025': {
    id:'mancity-gb-full-accounts-2025', clubId:'mancity-gb',
    title:'Manchester City Football Club Limited — Full Accounts (Companies House n.° 00040946), ejercicio cerrado el 30 de junio de 2025',
    type:'official_balance_sheet', reliability:'primary',
    url:'https://find-and-update.company-information.service.gov.uk/company/00040946/filing-history',
    publicNote:'Cuentas de la sociedad del club (Manchester City Football Club Limited) sola, NO las cuentas consolidadas de City Football Group, que además controla otros clubes (Nueva York, Melbourne, Girona, entre otros) y publica su propio balance por separado.',
    note:'PDF de 39 páginas depositado en Companies House ("Full accounts"), mismo formato y auditor (BDO LLP) que el ejercicio 2023-24. Transcripción completa en Clubes/Inglaterra/Manchester City/manchester-city-full-accounts-2024-25.md.',
  },
});

// gestionesByClub: no hay un concepto de "presidencia electa" en esta sociedad (accionista de
// control desde jul-2021: "Newton Investment & Development - Sole Proprietorship L.L.C.", según
// la propia nota de partes relacionadas de las cuentas). Lo que el documento SÍ confirma con
// solvencia, en las 2 carátulas de Directors and Company Information, es que Khaldoon Al Mubarak
// es Chairman desde septiembre de 2008 y sigue siéndolo en los 2 ejercicios cargados.
gestionesByClub['mancity-gb'] = { actual: { nombre:'Khaldoon Al Mubarak (Chairman, 2008-actual)', firstYear:2024, lastYear:2025 } };

memberCountByClub['mancity-gb'] = null;
