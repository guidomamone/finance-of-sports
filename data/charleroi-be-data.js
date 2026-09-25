// ============================================================================
// data/charleroi-be-data.js — R. Charleroi S.C. (SA Sporting du Pays de
// Charleroi, Bélgica). Cargado en paralelo con otros 3 clubes nuevos (sesión
// de batch de onboarding).
//
// FUENTE: `Clubes/Bélgica/Charleroi/jaarrekening-2025-06-30-individual.md`
// (única versión disponible para este club, cuentas INDIVIDUALES, no hay
// consolidado). Cierre 30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025.
// PDF con capa de texto nativa. A diferencia de Anderlecht/Club Brugge/Genk/
// Gent (Flandes, neerlandés), Charleroi es de Valonia y el documento está en
// FRANCÉS: "SA Sporting du Pays de Charleroi", esquema estatutario belga
// abreviado ("C-cap", Code des Sociétés et des Associations).
//
// FORMATO DEL DOCUMENTO: compte de résultats MUY compacto (menos desglosado
// incluso que el VOL-kap de Anderlecht): el "Chiffre d'affaires" no tiene
// ninguna "Ventilation par catégorie d'activité" completada (Nota C-cap 6.10,
// código 740 en blanco) — mismo caso que Anderlecht, se categoriza como
// lump_football_operations. La propia Nota 12 de "Règles d'évaluation" (pág.
// 39) SÍ lista en prosa los componentes del Chiffre d'affaires: abonnements y
// tickets match-por-match, derechos de TV, publicidad/sponsoring, Horeca
// (business seats/buvettes), merchandising, loyers/concesiones del estadio, y
// ventas/préstamos de jugadores — todo mezclado sin monto individual, así que
// no se puede separar (confirma que el neteo de venta de jugadores DENTRO de
// "Chiffre d'affaires" es explícito del propio club, no una omisión de esta
// carga).
//
// INGRESOS (Compte de résultats, pág. 9, EUR):
//   Chiffre d'affaires (código 70) — sin desglose numérico (Nota 6.10
//     vacía)                                                   24.786109 → lump_football_operations
//   Autres produits d'exploitation (código 74) — sin desglose numérico
//     disponible en ningún lado del documento (17% del revenue, sin
//     explicación identificable)                                5.018673 → other_income
// Total: 29.804782, exacto contra "70/76A" impreso (29.804.782).
//
// PREGUNTA ABIERTA (anotada en Admin/dudas-por-club.md): a qué corresponde
// "Autres produits d'exploitation" (5,0 M€, 17% del revenue) — el documento no
// lo explica en ningún lado (ni la Nota 6.10 ni el rapport de gestion).
//
// GASTOS (Compte de résultats pág. 9 + Nota C-cap 6.2.3/6.3.x de movimiento de
// activos fijos, pág. 12-17, + Nota C-cap 6.10 pág. 27-28):
//   Approvisionnements et marchandises (código 60, compras + variación de
//     stock)                                                    -0.210451 → other_expenses
//   Services et biens divers (código 61, sin más desglose)      -12.762354 → other_expenses
//   Rémunérations, charges sociales et pensions (código 62, todo el
//     personal, sin separar plantel/resto — no hay Anexo tipo Vélez que
//     separe por sector)                                        -17.825907 → wages_squad
//   Amortissements (código 630, -2.137034 total) SE PROMOVIÓ a 2 líneas según
//   el Estado de movimiento de activos fijos (mismo criterio de
//   club-data-mapping sección 1, sub-ítems con categoría real distinta se
//   promueven): "Concessions, brevets... et droits similaires" (pág. 12) son
//   los DROITS SUR JOUEURS (confirmado por la Nota de reglas de evaluación
//   punto 3, "droits sur joueurs...portés en immobilisations incorporelles"),
//   su amortización del ejercicio (código 8072) es la línea de pases; el
//   resto es depreciación de activos tangibles (terrenos+instalaciones+
//   mobiliario+otras inmovilizaciones corporales, códigos 8271/8272/8273/8275):
//     Amortización droits sur joueurs (intangibles)             -1.635885 → player_amortisation
//     Depreciación activos tangibles (65.718+38.878+185.303+211.249)
//                                                                 -0.501149 → depreciation
//     (suma 2.137034, exacto contra el código 630 impreso)
//   Réductions de valeur sur stocks/créances commerciales (código 631/4,
//     mismo código que Anderlecht, mismo criterio)                -0.003648 → other_expenses
//   Provisions pour risques et charges: dotations (código 635/8)  -0.419224 → exceptional_items
//   Autres charges d'exploitation (código 640/8, -0.625359 total) SE PROMOVIÓ
//   a 2 líneas según la Nota C-cap 6.10 (pág. 28), que sí desglosa este
//   código en Impôts et taxes (640) vs. Autres (641/8) — Impuestos va SIEMPRE
//   a admin_general_expense (club-data-mapping sección 17):
//     Impôts et taxes relatifs à l'exploitation                  -0.561662 → admin_general_expense
//     Autres                                                     -0.063697 → other_expenses
//     (suma 0.625359, exacto contra el código 640/8 impreso)
//   Prélèvement sur les réserves immunisées (código 789, pág. 11 "Affectations
//     et prélèvements") — desafectación de una reserva no imponible del
//     patrimonio neto, aumenta el resultado por debajo de la línea de
//     impuestos. Mismo criterio que la tabla de club-data-mapping sección 1
//     ("Desafectación de previsiones/provisiones... → exceptional_items"),
//     mismo patrón que el crédito no-efectivo de Club Brugge (+0.335,
//     Overige niet-kaskosten → exceptional_items)                +1.078606 → exceptional_items
// Total expenseLines (incl. el crédito de reserva): -32.905371.
//
// RESULTADO FINANCIERO (netInterest): Produits financiers (0.063273) -
// Charges financières (0.352093) = -0.288820 (= "9903-9901" implícito, no hay
// línea "Financieel resultaat" resumida como en Club Brugge, se calculó de
// las 2 líneas del compte de résultats, pág. 9-10).
//
// TAX: Impôts sur le résultat (código 670/3) -0.113122.
//
// TIE-OUT (verificado, pág. 9-11 del documento):
//   Revenue 29.804782 - Expenses (excl. exceptional) 33.564753 = -3.759971
//   (bénéfice d'exploitation -4.179194, cuadra con nonCash/exceptional aparte)
//   Ingresos+Gastos+exceptional_items(-0.419224+1.078606=+0.659382)+
//   netInterest(-0.288820)+tax(-0.113122) = -3.502531 vs. "Bénéfice (Perte)
//   de l'exercice à affecter" impreso en pág. 11 (código 8905): -3.502.530 —
//   diferencia de EUR 1, redondeo acumulado (mismo orden de magnitud que
//   Anderlecht/Club Brugge). El propio compte de résultats (pág. 9-10) imprime
//   el código "9905" como -8.502.530, que es una errata de OCR/transcripción
//   de "-3" leído como "-8" — el número correcto es -3.502.530, confirmado
//   por reconciliar exacto contra el código 8905 de la sección de
//   Affectations (pág. 11) y contra el propio rapport de gestion (pág. 42:
//   "une perte de l'exercice (après impôts) de 4.581.136 €" = el resultado
//   ANTES del prélèvement de reservas, 9904, que si coincide sin ambigüedad).
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE).
//
// grossDebt: "DETTES" (total código 17/48, pág. 8) = 11.197825, que incluye
// "Comptes de régularisation" (código 4928, 0.556795, ingresos diferidos/
// producto a reportar de la temporada 2025-26 según el rapport de gestión
// pág. 43) SUMADO adentro del total impreso (2.337496 dettes>1año +
// 8.303534 dettes<=1año + 0.556795 comptes de régularisation = 11.197825
// exacto) — se excluye esa porción por ser diferido, no deuda real, mismo
// criterio que "Overlopende rekeningen" de Anderlecht/Club Brugge:
// grossDebt = 11.197825 - 0.556795 = 10.641030. "Provisions et impôts
// différés" (código 16, 1.245730) es una línea de pasivo SEPARADA de
// "Dettes", ya no está incluida en el total de arriba, no hace falta
// restarla de nuevo. cash: "Valeurs disponibles" (código 54/58, 0.898948) —
// NO se sumó "Placements de trésorerie" (código 50/53, 1.600833, que el
// rapport de gestión sí trata en conjunto como "trésorerie", pág. 42) para
// mantener el mismo criterio estricto ("solo la línea de caja/equivalentes
// más angosta") que usaron Anderlecht/Club Brugge/Genk/Gent en esta misma
// sesión. Total activa = Total pasiva = 21.196284 (balance cuadra).
//
// GESTIÓN: el listado de administradores (pág. 2-3) no identifica con
// confianza un Président du Conseil d'Administration único para todo el
// ejercicio (5 administradores/sociedades listados, sin un cargo de
// "Président" marcado en el documento) → gestionId: null.
// ============================================================================

const charleroiBeRevenueLinesByYear = {
  2025: [
    { rawLabel:"Chiffre d'affaires", normalizedCategory:'lump_football_operations', amountNative:24.786109, disclosureLevel:'aggregated' },
    { rawLabel:"Autres produits d'exploitation", normalizedCategory:'other_income', amountNative:5.018673, disclosureLevel:'aggregated' },
  ],
};

const charleroiBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Approvisionnements et marchandises', normalizedCategory:'other_expenses', amountNative:-0.210451, disclosureLevel:'aggregated' },
    { rawLabel:'Services et biens divers', normalizedCategory:'other_expenses', amountNative:-12.762354, disclosureLevel:'aggregated' },
    { rawLabel:'Rémunérations, charges sociales et pensions', normalizedCategory:'wages_squad', amountNative:-17.825907, disclosureLevel:'aggregated' },
    { rawLabel:'Amortissements — droits sur joueurs (immobilisations incorporelles)', normalizedCategory:'player_amortisation', amountNative:-1.635885, disclosureLevel:'detailed' },
    { rawLabel:'Amortissements — immobilisations corporelles', normalizedCategory:'depreciation', amountNative:-0.501149, disclosureLevel:'detailed' },
    { rawLabel:'Réductions de valeur sur stocks et créances commerciales', normalizedCategory:'other_expenses', amountNative:-0.003648, disclosureLevel:'aggregated' },
    { rawLabel:'Provisions pour risques et charges', normalizedCategory:'exceptional_items', amountNative:-0.419224, disclosureLevel:'aggregated' },
    { rawLabel:"Impôts et taxes relatifs à l'exploitation", normalizedCategory:'admin_general_expense', amountNative:-0.561662, disclosureLevel:'detailed' },
    { rawLabel:"Autres charges d'exploitation", normalizedCategory:'other_expenses', amountNative:-0.063697, disclosureLevel:'aggregated' },
    { rawLabel:'Prélèvement sur les réserves immunisées', normalizedCategory:'exceptional_items', amountNative:1.078606, disclosureLevel:'detailed' },
  ],
};

const charleroiBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'charleroi-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:-0.288820,
    tax:-0.113122,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Dettes (17/48) EXCLUYENDO Comptes de régularisation (0.556795, ingresos
    // diferidos). cash = Valeurs disponibles (no incluye Placements de trésorerie, 1.600833).
    grossDebt:10.641030, cash:0.898948,
    officialTotalRevenue:29.804782, officialTotalExpenses:33.564753, /* excluye exceptional_items netos +0.659382, mismo criterio que Chelsea */ officialPAT:-3.502530,
  },
};

const charleroiBePresupuestoOverlayByYear = {};

const charleroiBePasesData = [];
const charleroiBeResultadosData = {};
const charleroiBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['charleroi-be'] = {
  revenueLinesByYear: charleroiBeRevenueLinesByYear, expenseLinesByYear: charleroiBeExpenseLinesByYear,
  fiscalYearMeta: charleroiBeFiscalYearMeta, pasesData: charleroiBePasesData,
  resultadosData: charleroiBeResultadosData, titulosData: charleroiBeTitulosData,
  presupuestoOverlayByYear: charleroiBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'charleroi-be-jaarrekening-2025': {
    id:'charleroi-be-jaarrekening-2025', clubId:'charleroi-be',
    title:"Comptes annuels de la SA Sporting du Pays de Charleroi pour l'exercice du 1/7/2024 au 30/6/2025",
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Banque Nationale de Belgique (BNB/NBB), esquema estatutario abreviado (Code des sociétés et des associations). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Charleroi/jaarrekening-2025-06-30-individual.md. La Nota C-cap 6.10 (desglose de Chiffre d\'affaires por categoría/mercado) no fue completada por el club en este filing; "Autres produits d\'exploitation" (17% del revenue) tampoco tiene desglose disponible.',
  },
});

memberCountByClub['charleroi-be'] = null;
