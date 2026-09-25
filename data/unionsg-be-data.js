// ============================================================================
// data/unionsg-be-data.js — Royale Union Saint-Gilloise SRL (Bélgica). Club
// nuevo, cargado en la 2da tanda de onboarding de la sesión 2026-09-25 (junto
// con Standard Liège y Westerlo).
//
// FUENTE: `Clubes/Bélgica/Union Saint-Gilloise/jaarrekening-2025-06-30-individual.md`
// (única versión disponible, no hay consolidado). Cierre 30/6/2025 (ejercicio
// 1/7/2024-30/6/2025 — el ejercicio en que Union SG ganó el título de la
// Pro League 2024/25, su primer título desde 1934/35) → clave 2025. PDF con
// capa de texto nativa. Depositado en la Banque Nationale de Belgique
// (BNB/NBB), esquema estatutario abreviado C-app (forma jurídica "Société à
// responsabilité limitée"/SRL, no SA — por eso "C-app" y no "C-cap" como
// Standard Liège/Charleroi), en FRANCÉS.
//
// FORMATO DEL DOCUMENTO: compte de résultats compacto, misma estructura que
// Standard Liège/Charleroi. La Nota C-app 6.10 ("Ventilation par catégorie
// d'activité" del Chiffre d'affaires) está presente pero SIN NINGÚN VALOR
// CARGADO — mismo caso que el resto de los clubes belgas cargados hasta
// ahora: "Chiffre d'affaires" se categoriza como lump_football_operations.
// A diferencia del resto, este club SÍ tuvo resultado POSITIVO (Lucro de
// EUR 1.803.374).
//
// INGRESOS (Compte de résultats, pág. 8, códigos NBB, EUR + Nota C-app 6.10
// pág. 24 + Nota C-app 6.12 pág. 26):
//   Chiffre d'affaires (código 70) — sin desglose numérico (Nota 6.10 vacía)
//                                                                15.029834 → lump_football_operations
//   Autres produits d'exploitation (código 74, 22.925706 total) — la Nota
//     6.10 completa el sub-detalle de subsidios/compensaciones estatales
//     (código 740), inusualmente grande para este tipo de línea; el resto
//     sin desglose disponible (ver PREGUNTA ABIERTA abajo):
//     - Subsides d'exploitation et montants compensatoires (740)         10.074391 → other_income
//     - Reste sans détail disponible (22.925706-10.074391)               12.851315 → other_income
//   Produits d'exploitation non récurrents (código 76A, 20.812573 total) —
//     Nota 6.12 SÍ desglosa: 99,5% es plusvalía por venta de derechos
//     económicos de jugadores (código 7630), consistente con las ventas de
//     plantel del club durante esta temporada de título:
//     - Plus-values sur réalisation d'immobilisations incorporelles (7630)  20.715719 → player_sales
//     - Autres produits d'exploitation non récurrents (764/8)                0.096854 → other_income
// Total: 15.029834+22.925706+20.812573 = 58.768113, exacto contra 58.768.113 impreso (70/76A).
//
// PREGUNTA ABIERTA (para Admin/dudas-por-club.md): el componente "Subsides
// d'exploitation et montants compensatoires obtenus des pouvoirs publics"
// (código 740, Nota C-app 6.10) es de EUR 10,07 M, un monto grande e inusual
// para una línea de subsidios/compensaciones estatales en un club de fútbol
// (en Standard Liège la misma línea fue EUR 7,5 M sobre un revenue total
// mayor, en Mechelen EUR 4,1 M, en Antwerp EUR 11,7 M — todos con negocio
// mucho más grande). Confirmar con el club a qué corresponde exactamente
// (¿compensaciones UEFA/solidaridad de la Champions/Europa League tratadas
// contablemente bajo este código en vez de bajo Chiffre d'affaires?, ¿subsidio
// de infraestructura del Stade Joseph Marien?). El resto sin desglosar de
// "Autres produits d'exploitation" (EUR 12,85 M) es la 2da pregunta.
//
// GASTOS (Compte de résultats pág. 8 + Nota C-app 6.2.3 pág. 6-7 + Notas
// 6.3.1-6.3.5 pág. 7-8 + Nota C-app 6.10 pág. 24-25):
//   Approvisionnements et marchandises (código 60, sin más desglose)      -0.963428 → other_expenses
//   Services et biens divers (código 61, sin más desglose)              -18.078026 → other_expenses
//   Rémunérations, charges sociales et pensions (código 62, todo el
//     personal, sin separar plantel/resto — Nota 6.10: 94 empleados/89,9
//     FTE)                                                              -22.150441 → wages_squad
//     items: Rémunérations et avantages sociaux directs 20.445031 + Cotisations
//     patronales d'assurances sociales 1.174342 + Autres frais de personnel 0.531068
//   Amortissements (código 630, -10.564918 total) SE PROMOVIÓ a 2 líneas
//   según el Estado de movimiento de activos fijos (mismo criterio que
//   Standard Liège/Charleroi/Mechelen/Antwerp): Nota 6.2.3 "Concessions,
//   brevets... et droits similaires" (droits sur joueurs) "Actés" (código
//   8072) = amortización de pases; Notas 6.3.1/6.3.2/6.3.3/6.3.5 "Actés"
//   sumadas (0.021615+0.096004+0.048813+0.283221) = depreciación de activos
//   tangibles:
//     Amortización droits sur joueurs (intangibles, código 8072)        -10.115265 → player_amortisation
//     Depreciación activos tangibles (código 8271+8272+8273+8275)        -0.449653 → depreciation
//     (suma 10.564918, exacto contra el código 630 impreso)
//   Réductions de valeur sur créances commerciales: dotations netas
//     (código 631/4 — Nota 6.10 código 9112 "Actées" 4.141942 menos código
//     9113 "Reprises" 0.035858)                                          -4.106085 → other_expenses
//   Autres charges d'exploitation (código 640/8, 0.266065 total) — la Nota
//     6.10 desglosa Impôts et taxes (640) vs. Autres (641/8), pero el
//     orden de los 2 valores en la transcripción OCR es ambiguo (146.868 y
//     119.197, suma exacta 266.065 contra el total impreso, sin certeza
//     de cuál corresponde a cada código) — se mantuvo como UNA sola línea
//     en vez de forzar una separación no confirmada, ver PREGUNTA ABIERTA
//                                                                          -0.266065 → admin_general_expense
// Total expenseLines: -56.128962, exacto contra 56.128.962 impreso (60/66A).
//
// PREGUNTA ABIERTA (para Admin/dudas-por-club.md, o simplemente re-lectura
// directa del PDF original en vez del .md transcripto): confirmar el split
// exacto de "Autres charges d'exploitation" (código 640/8, EUR 266.065) entre
// "Impôts et taxes relatifs à l'exploitation" (640) y "Autres" (641/8) — la
// transcripción a Markdown perdió el alineamiento código-valor de la Nota
// 6.10 en esta sección puntual (página 25 del PDF). Es un monto chico (0,45%
// del total de gastos), no cambia el resultado, pero para separar
// correctamente admin_general_expense de other_expenses convendría re-mirar
// la página 25 del PDF directamente.
//
// RESULTADO FINANCIERO (netInterest): Produits financiers (75/76B, 0.007086) -
// Charges financières (65/66B, 0.506461) = -0.499375.
//
// TAX: Impôts sur le résultat (código 67/77) -0.336402 (Impôts 0.340599 -
// Régularisation/reprise de provisions fiscales 0.004197).
//
// TIE-OUT (verificado, pág. 8-9 del documento, con los subtotales IMPRESOS):
//   Ventes/prestations 58.768113 - Coût des ventes 56.128962 = "Bénéfice
//   d'exploitation" (código 9901) 2.639151, EXACTO. + Financiers netos
//   (-0.499375) = "Bénéfice avant impôts" (código 9903) 2.139776, EXACTO. -
//   Impôts (0.336402) = "Bénéfice de l'exercice"/"à affecter" (códigos
//   9904/9905) 1.803374, EXACTO. officialPAT = 1.803374 (LUCRO real).
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE, 0,8532).
//
// grossDebt: "DETTES" (total código 17/49, pág. 7) = 32.792275, EXCLUYENDO
// "Comptes de régularisation" (código 4923, 1.131688, ingresos diferidos),
// mismo criterio que el resto de los clubes belgas cargados: grossDebt =
// 32.792275 - 1.131688 = 31.660587. cash: "Valeurs disponibles" (código
// 54/58, 1.275320) — no se sumó "Placements de trésorerie" (en blanco/0 este
// balance). Total activa = Total pasiva = 54.939328 (balance cuadra).
//
// GESTIÓN: el listado de administradores no identifica con confianza en el
// documento mismo un "actionnaire principal"/accionista de referencia con
// fecha de inicio confirmada dentro de este ejercicio puntual (el propietario
// real del club, Tony Bloom, es de conocimiento público externo al documento,
// pero club-data-mapping exige que la atribución salga del documento mismo
// con confianza) → gestionId: null.
// ============================================================================

const unionsgBeRevenueLinesByYear = {
  2025: [
    { rawLabel:"Chiffre d'affaires", normalizedCategory:'lump_football_operations', amountNative:15.029834, disclosureLevel:'aggregated' },
    { rawLabel:"Autres produits d'exploitation", normalizedCategory:'other_income', amountNative:22.925706, disclosureLevel:'aggregated', items:[
      ['Subsides d’exploitation et montants compensatoires obtenus des pouvoirs publics (Nota 6.10)', 10.074391], ['Reste sans détail disponible', 12.851315],
    ]},
    { rawLabel:"Produits d'exploitation non récurrents — Plus-values sur réalisation d'immobilisations incorporelles (droits sur joueurs)", normalizedCategory:'player_sales', amountNative:20.715719, disclosureLevel:'detailed' },
    { rawLabel:"Produits d'exploitation non récurrents — Autres", normalizedCategory:'other_income', amountNative:0.096854, disclosureLevel:'detailed' },
  ],
};

const unionsgBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Approvisionnements et marchandises', normalizedCategory:'other_expenses', amountNative:-0.963428, disclosureLevel:'aggregated' },
    { rawLabel:'Services et biens divers', normalizedCategory:'other_expenses', amountNative:-18.078026, disclosureLevel:'aggregated' },
    { rawLabel:'Rémunérations, charges sociales et pensions', normalizedCategory:'wages_squad', amountNative:-22.150441, disclosureLevel:'detailed', items:[
      ['Rémunérations et avantages sociaux directs', 20.445031], ['Cotisations patronales d’assurances sociales', 1.174342], ['Autres frais de personnel', 0.531068],
    ]},
    { rawLabel:'Amortissements — droits sur joueurs (immobilisations incorporelles)', normalizedCategory:'player_amortisation', amountNative:-10.115265, disclosureLevel:'detailed' },
    { rawLabel:'Amortissements — immobilisations corporelles', normalizedCategory:'depreciation', amountNative:-0.449653, disclosureLevel:'detailed' },
    { rawLabel:'Réductions de valeur sur créances commerciales (dotations nettes)', normalizedCategory:'other_expenses', amountNative:-4.106085, disclosureLevel:'aggregated' },
    { rawLabel:"Autres charges d'exploitation (impôts et taxes + autres, sin desglose confiable en la transcripción)", normalizedCategory:'admin_general_expense', amountNative:-0.266065, disclosureLevel:'aggregated' },
  ],
};

const unionsgBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'unionsg-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    // Produits financiers (0.007086) - Charges financières (0.506461).
    netInterest:-0.499375,
    tax:-0.336402,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Dettes (17/49) EXCLUYENDO Comptes de régularisation (1.131688, ingresos
    // diferidos). cash = Valeurs disponibles.
    grossDebt:31.660587, cash:1.275320,
    officialTotalRevenue:58.768113, officialTotalExpenses:56.128962, officialPAT:1.803374,
  },
};

const unionsgBePresupuestoOverlayByYear = {};

const unionsgBePasesData = [];
const unionsgBeResultadosData = {};
const unionsgBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['unionsg-be'] = {
  revenueLinesByYear: unionsgBeRevenueLinesByYear, expenseLinesByYear: unionsgBeExpenseLinesByYear,
  fiscalYearMeta: unionsgBeFiscalYearMeta, pasesData: unionsgBePasesData,
  resultadosData: unionsgBeResultadosData, titulosData: unionsgBeTitulosData,
  presupuestoOverlayByYear: unionsgBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'unionsg-be-jaarrekening-2025': {
    id:'unionsg-be-jaarrekening-2025', clubId:'unionsg-be',
    title:"Comptes annuels de la Royale Union Saint-Gilloise SRL pour l'exercice du 1/7/2024 au 30/6/2025",
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Banque Nationale de Belgique (BNB/NBB), esquema estatutario abreviado C-app (forma jurídica SRL). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Union Saint-Gilloise/jaarrekening-2025-06-30-individual.md. Ejercicio en el que el club ganó su primer título de Pro League desde 1934/35. Dos componentes de "Autres produits d\'exploitation" y el desglose fino de "Autres charges d\'exploitation" quedaron sin poder confirmarse con certeza en esta transcripción — ver comentario de cabecera de data/unionsg-be-data.js y Admin/dudas-por-club.md.',
  },
});

memberCountByClub['unionsg-be'] = null;
