// ============================================================================
// data/gent-be-data.js — K.A.A. Gent NV (Bélgica). Uno de 4 clubes belgas de la
// Pro League cargados en esta sesión (onboarding de Bélgica como país nuevo):
// Club Brugge, Anderlecht, Genk, Gent.
//
// FUENTE: `Clubes/Bélgica/Gent/jaarrekening-2025-06-30-individual.md`. Gent SÍ
// tiene años con `-consolidado` disponibles (2017-2022), pero NO para 2023,
// 2024 ni 2025 — el ejercicio más reciente disponible (criterio de la tarea:
// "elegí el más reciente") solo existe en versión individual. Cierre
// 30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto
// nativa.
//
// FORMATO DEL DOCUMENTO: NV, esquema estatutario "VOL-kap", igual que
// Anderlecht — pero a diferencia de Anderlecht/Genk, Gent SÍ incluye un
// "Jaarverslag" (informe de gestión) con comentario cuantitativo específico
// por línea del P&L (pág. 42 del PDF), lo que permite una categorización más
// fundamentada que en los otros 2 individuales.
//
// INGRESOS (Resultatenrekening + comentario del Jaarverslag, pág. 42):
//   Omzet — el Jaarverslag dice explícito: "De omzet uit ticketing, sponsoring
//     en publiciteit bedraagt €37.503k" (ticketing + sponsors + publicidad,
//     sin desglosar cuánto es cada uno)                          37.503463 → lump_football_operations
//   Andere bedrijfsopbrengsten — el Jaarverslag dice explícito: "voornamelijk
//     gerealiseerd... door uitgaande transfers en recuperatie
//     bedrijfsvoorheffing" (mayormente por transferencias salientes/ventas de
//     jugadores + recupero de retención impositiva sobre sueldos)  43.656204 → player_sales
// Total: 81.159667 vs 81.159.667 impreso (exacto).
//
// PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md): separar ticketing de
// sponsoring/publicidad dentro de Omzet, y separar la plusvalía de pases del
// recupero impositivo dentro de Andere bedrijfsopbrengsten.
//
// GASTOS (Resultatenrekening + Jaarverslag):
//   Handelsgoederen, grond- en hulpstoffen                       -0.357352 → other_expenses
//   Diensten en diverse goederen (el Jaarverslag la suma junto con
//     Bezoldigingen sin separar más, "€57.141k" combinado — sin desglose
//     propio disponible)                                        -22.217207 → other_expenses
//   Bezoldigingen, sociale lasten en pensioenen                  -34.923563 → wages_squad
//   Afschrijvingen (código 630) — el Jaarverslag solo dice "werden in
//     continuïteit toegepast" (se aplicaron en continuidad respecto al año
//     anterior), sin desglosar players vs. PP&E — se asume dominancia de
//     pases por ANALOGÍA con Club Brugge (donde la Nota IFRS SÍ confirma
//     ~84% del cargo es de pases) y con el propio negocio de Gent (venta
//     recurrente de jugadores formados) — ES UNA INFERENCIA, no una
//     confirmación explícita del documento, a diferencia de Anderlecht/Genk
//     donde el club SÍ lo dijo con esas palabras                 -13.616725 → player_amortisation
//   Voorzieningen voor risico's en kosten (código 635/8) — REVERSIÓN neta de
//     +0.349285 este ejercicio ("saldo van terugneming voorziening risico's
//     en kosten van €349k", confirmado por el Jaarverslag)         0.349285 → exceptional_items
//   Andere bedrijfskosten — el Jaarverslag dice que incluye "onder meer"
//     (entre otras cosas) impuesto inmobiliario (onroerende voorheffing) Y
//     comisiones/sell-on fees de compraventa de jugadores — mezcla de al
//     menos 2 tipos de gasto sin monto propio para cada uno         -6.717525 → other_expenses
//   Niet-recurrente bedrijfskosten — el Jaarverslag dice que son
//     "voornamelijk" (mayormente) costos de un acuerdo/dading y el cierre de
//     un arbitraje CEPANI (litigio)                                -0.988421 → exceptional_items
// Total: -78.471508 vs -78.471.508 impreso (exacto). (Nota: el código 631/4
// del propio documento, "58.344", quedó identificado como el valor del
// ejercicio ANTERIOR — 2024 — mal alineado en la columna de transcripción; no
// aporta al ejercicio 2025, que reconciliation confirma en 0 para esa línea.)
//
// RESULTADO FINANCIERO (netInterest): Financiële opbrengsten 0.138518 -
// Financiële kosten 0.812459 = -0.673941. El Jaarverslag confirma que son
// "in hoofdzaak" intereses de créditos bancarios corrientes.
//
// TAX: Belastingen op het resultaat -0.118355.
//
// TIE-OUT (verificado): 81.159667 - 78.471508 - 0.673941 - 0.118355 =
// 1.895863, exacto igual a "Winst (verlies) van het boekjaar" impreso
// (1.895863). Sin movimientos de reservas libres de impuesto/impuesto
// diferido este ejercicio (a diferencia de Genk), así que no hay ninguna
// distinción entre "winst van het boekjaar" y "te bestemmen winst" para este
// club/año.
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE).
//
// grossDebt: "Schulden op meer dan één jaar" (40.892966, incluye €17,68M de
// leasingschulden por el opstalrecht/derecho de superficie del estadio) +
// "Schulden op ten hoogste één jaar" (29.518840) = 70.411806, EXCLUYENDO
// "Voorzieningen voor risico's en kosten" (1.072769) y "Overlopende
// rekeningen" (9.216400, ingresos diferidos — el Jaarverslag confirma que son
// mayormente ingresos de ventas de junio 2025 correspondientes a la temporada
// siguiente). cash: "Liquide middelen" (9.057614). Total activa = Total
// pasiva = 106.163479.
//
// GESTIÓN: no se identificó con confianza un presidente/responsable único
// verificado para todo el ejercicio → gestionId: null.
// ============================================================================

const gentBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet (ticketing, sponsoring en publiciteit)', normalizedCategory:'lump_football_operations', amountNative:37.503463, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'player_sales', amountNative:43.656204, disclosureLevel:'aggregated' },
  ],
};

const gentBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-0.357352, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-22.217207, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-34.923563, disclosureLevel:'aggregated' },
    { rawLabel:'Afschrijvingen en waardeverminderingen op oprichtingskosten, op immateriële en materiële vaste activa', normalizedCategory:'player_amortisation', amountNative:-13.616725, disclosureLevel:'aggregated' },
    { rawLabel:"Voorzieningen voor risico's en kosten (terugneming/reversión)", normalizedCategory:'exceptional_items', amountNative:0.349285, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten (onroerende voorheffing en sell-on fees op transfers)', normalizedCategory:'other_expenses', amountNative:-6.717525, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfskosten (dading en afhandeling CEPANI)', normalizedCategory:'exceptional_items', amountNative:-0.988421, disclosureLevel:'aggregated' },
  ],
};

const gentBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'gent-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:-0.673941,
    tax:-0.118355,
    profitOnPlayerSales:0, assetSales:0,
    grossDebt:70.411806, cash:9.057614,
    officialTotalRevenue:81.159667, officialTotalExpenses:77.832372, /* excluye exceptional_items netos -0.639136, mismo criterio que Chelsea */ officialPAT:1.895863,
  },
};

const gentBePresupuestoOverlayByYear = {};

const gentBePasesData = [];
const gentBeResultadosData = {};
const gentBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['gent-be'] = {
  revenueLinesByYear: gentBeRevenueLinesByYear, expenseLinesByYear: gentBeExpenseLinesByYear,
  fiscalYearMeta: gentBeFiscalYearMeta, pasesData: gentBePasesData,
  resultadosData: gentBeResultadosData, titulosData: gentBeTitulosData,
  presupuestoOverlayByYear: gentBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'gent-be-jaarrekening-2025': {
    id:'gent-be-jaarrekening-2025', clubId:'gent-be',
    title:'Jaarrekening van K.A.A. Gent NV voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES — no hay consolidado disponible para 2023/2024/2025 (sí para 2017-2022). Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Gent/jaarrekening-2025-06-30-individual.md.',
  },
});

memberCountByClub['gent-be'] = null;
