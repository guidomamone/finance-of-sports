// ============================================================================
// data/standardliege-be-data.js — Standard de Liège SA (Bélgica). Club nuevo,
// cargado en la 2da tanda de onboarding de la sesión 2026-09-25 (junto con
// Union Saint-Gilloise y Westerlo).
//
// FUENTE: `Clubes/Bélgica/Standard Liège/jaarrekening-2025-06-30-individual.md`
// (única versión disponible, no hay consolidado). Cierre 30/6/2025 (ejercicio
// 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto nativa. Depositado en
// la Banque Nationale de Belgique (BNB/NBB), esquema estatutario abreviado
// C-cap (Code des sociétés et des associations), en FRANCÉS (Standard es de
// Valonia, mismo esquema/idioma que Charleroi).
//
// FORMATO DEL DOCUMENTO: compte de résultats compacto, muy parecido a
// Charleroi. La Nota C-cap 6.10 ("Ventilation par catégorie d'activité" del
// Chiffre d'affaires) está presente pero SIN NINGÚN VALOR CARGADO — mismo caso
// que Charleroi/Anderlecht/Antwerp/Mechelen: "Chiffre d'affaires" se categoriza
// como lump_football_operations.
//
// INGRESOS (Compte de résultats, pág. 9, códigos NBB, EUR):
//   Chiffre d'affaires (código 70) — sin desglose numérico (Nota 6.10 vacía)
//                                                                20.453554 → lump_football_operations
//   En-cours de fabrication... (código 72) — línea atípica de contabilidad de
//     manufactura, sin explicación disponible en el documento              0.475908 → other_income
//   Autres produits d'exploitation (código 74) — la Nota 6.10 SÍ completa el
//     sub-detalle de subsidios estatales (código 740, 7.501605 de los
//     23.052000 totales), el resto (15.550395) sin desglose disponible; se
//     mantiene como una sola línea porque ambos componentes van a la misma
//     categoría de todos modos                                            23.052000 → other_income
//   Produits d'exploitation non récurrents (código 76A) — sin desglose
//     numérico disponible en el documento sobre a qué corresponde          0.587342 → other_income
// Total: 20.453554+0.475908+23.052000+0.587342 = 44.568804 ≈ 44.568.803 impreso (70/76A), diferencia
// de EUR 1 por redondeo.
//
// GASTOS (Compte de résultats pág. 9-10 + Nota C-cap 6.1 pág. 12 + Nota 6.2.3
// pág. 13 + Notas 6.3.1-6.3.6 pág. 14-19 + Nota C-cap 6.10 pág. 27-28):
//   Approvisionnements et marchandises (código 60, compras + variación de
//     stock, sin más desglose)                                           -0.881477 → other_expenses
//   Services et biens divers (código 61, sin más desglose)              -15.997812 → other_expenses
//   Rémunérations, charges sociales et pensions (código 62, todo el
//     personal, sin separar plantel/resto — Nota 6.10: 195 empleados/
//     178,9 FTE)                                                        -32.062651 → wages_squad
//     items: Rémunérations et avantages sociaux directs 25.703064 + Cotisations
//     patronales d'assurances sociales 3.870421 + Autres frais de personnel 2.489166
//   Amortissements (código 630, -5.220980 total) SE PROMOVIÓ a 3 líneas según
//   el Estado de movimiento de activos fijos (mismo criterio de
//   club-data-mapping sección 1): Nota 6.2.3 "Concessions, brevets... et
//   droits similaires" (droits sur joueurs, confirmado por el mismo criterio
//   que Charleroi/Mechelen/Antwerp) "Actés" (código 8072) = amortización de
//   pases; Notas 6.3.1/6.3.2/6.3.3/6.3.5 "Actés" sumadas = depreciación de
//   activos tangibles (terrenos+instalaciones+mobiliario+otras
//   inmovilizaciones, 0.177894+0.157199+0.210262+0.093207); Nota 6.1 "Etat
//   des frais de constitution" "Amortissements" (código 8003) = amortización
//   de gastos de constitución (residual chico, no relacionado a jugadores):
//     Amortización droits sur joueurs (intangibles, código 8072)          -4.192331 → player_amortisation
//     Depreciación activos tangibles (código 8271+8272+8273+8275)         -1.013961 → depreciation
//     Amortización frais de constitution (código 8003, residual chico)    -0.014688 → other_amortisation
//     (suma 5.220980, exacto contra el código 630 impreso)
//   Réductions de valeur sur stocks/créances commerciales (código 631/4)   -0.470536 → other_expenses
//   Provisions pour risques et charges: dotations (utilisations et
//     reprises) (código 635/8) — CRÉDITO NETO (reversión de previsión mayor
//     que la nueva dotación, Nota 6.8: previsión "Droits TV suite aux
//     années covid" bajó de 1.408018 a 0.435746)                          +0.972273 → exceptional_items
//   Autres charges d'exploitation (código 640/8, -1.268862 total) SE
//   PROMOVIÓ a 2 líneas según la Nota C-cap 6.10 (pág. 28), que desglosa
//   Impôts et taxes (640) vs. Autres (641/8) — Impuestos SIEMPRE a
//   admin_general_expense (club-data-mapping sección 17):
//     Impôts et taxes relatifs à l'exploitation                          -0.962229 → admin_general_expense
//     Autres                                                             -0.306633 → other_expenses
//     (suma 1.268862, exacto contra el código 640/8 impreso)
//   Charges d'exploitation non récurrentes (código 66A, chico)            -0.000203 → other_expenses
// Total expenseLines (incl. el crédito de exceptional_items): -54.930248, exacto contra 60/66A
// impreso (54.930.249, diferencia de EUR 1 por redondeo).
//
// RESULTADO FINANCIERO (netInterest): Produits financiers (75/76B, 0.015077) -
// Charges financières (65/66B, 2.849768) = -2.834691.
//
// TAX: Impôts sur le résultat (código 67/77) -0.146296.
//
// TIE-OUT (verificado, pág. 9-10 del documento, con los subtotales IMPRESOS):
//   Ventes/prestations 44.568803 - Coût des ventes 54.930249 = "Bénéfice
//   (Perte) d'exploitation" (código 9901) -10.361446, EXACTO. + Financiers
//   netos (-2.834691) = "Bénéfice avant impôts" (código 9903) -13.196137,
//   EXACTO. - Impôts (0.146296) = "Bénéfice de l'exercice"/"à affecter"
//   (códigos 9904/9905) -13.342433, EXACTO. officialPAT = -13.342433.
//
// officialTotalExpenses (55.902521) EXCLUYE la línea exceptional_items
// (+0.972273 crédito) del total de gastos, mismo criterio "Chelsea" que
// Charleroi/Antwerp: 54.930248 + 0.972273 = 55.902521. Este es el total que
// compara verifyTieOuts() (Math.abs(expenses+nonCash), que no suma
// exceptional_items).
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE, 0,8532).
//
// grossDebt: "DETTES" (total código 17/48, pág. 8) = 28.741980, EXCLUYENDO
// "Comptes de régularisation" (código 4928, 5.280279, ingresos diferidos —
// "Produits à Reporter" 5.012755 según el detalle de Nota 6.9, pág. 26) sumado
// adentro del total impreso, mismo criterio que Charleroi/Anderlecht/
// Mechelen/Antwerp: grossDebt = 28.741980 - 5.280279 = 23.461701. cash:
// "Valeurs disponibles" (código 54/58, 0.311835) — no se sumó ningún
// "Placements de trésorerie" (código 50/53, en blanco/0 este balance). Total
// activa = Total pasiva = 30.104030 (balance cuadra).
//
// GESTIÓN: el listado de administradores (pág. 2-3) muestra varios cambios de
// mandato dentro del propio ejercicio (Anson Andrew, Shaw David, Wander
// Joshua, Steele Keith, Pasko Steven — nombres angloamericanos, ligados al ex
// accionista 777 Partners — con mandatos que terminan/empiezan en
// 2024-09/2025-06, y Marc Wilmots/Nicolas Bloemen/Pierre François entrando
// recién el 2025-06/10, YA FUERA del ejercicio 01-07-2024/30-06-2025 en su
// mayoría) sin que el documento identifique con confianza un
// "actionnaire principal"/accionista de referencia único y estable para TODO
// el ejercicio → gestionId: null.
// ============================================================================

const standardliegeBeRevenueLinesByYear = {
  2025: [
    { rawLabel:"Chiffre d'affaires", normalizedCategory:'lump_football_operations', amountNative:20.453554, disclosureLevel:'aggregated' },
    { rawLabel:"En-cours de fabrication, produits finis et commandes en cours d'exécution", normalizedCategory:'other_income', amountNative:0.475908, disclosureLevel:'aggregated' },
    { rawLabel:"Autres produits d'exploitation", normalizedCategory:'other_income', amountNative:23.052000, disclosureLevel:'aggregated', items:[
      ['Subsides d’exploitation et montants compensatoires obtenus des pouvoirs publics (Nota 6.10)', 7.501605], ['Reste sans détail disponible', 15.550395],
    ]},
    { rawLabel:"Produits d'exploitation non récurrents", normalizedCategory:'other_income', amountNative:0.587342, disclosureLevel:'aggregated' },
  ],
};

const standardliegeBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Approvisionnements et marchandises', normalizedCategory:'other_expenses', amountNative:-0.881477, disclosureLevel:'aggregated' },
    { rawLabel:'Services et biens divers', normalizedCategory:'other_expenses', amountNative:-15.997812, disclosureLevel:'aggregated' },
    { rawLabel:'Rémunérations, charges sociales et pensions', normalizedCategory:'wages_squad', amountNative:-32.062651, disclosureLevel:'detailed', items:[
      ['Rémunérations et avantages sociaux directs', 25.703064], ['Cotisations patronales d’assurances sociales', 3.870421], ['Autres frais de personnel', 2.489166],
    ]},
    { rawLabel:'Amortissements — droits sur joueurs (immobilisations incorporelles)', normalizedCategory:'player_amortisation', amountNative:-4.192331, disclosureLevel:'detailed' },
    { rawLabel:'Amortissements — immobilisations corporelles', normalizedCategory:'depreciation', amountNative:-1.013961, disclosureLevel:'detailed' },
    { rawLabel:'Amortissements — frais de constitution', normalizedCategory:'other_amortisation', amountNative:-0.014688, disclosureLevel:'detailed' },
    { rawLabel:'Réductions de valeur sur stocks et créances commerciales', normalizedCategory:'other_expenses', amountNative:-0.470536, disclosureLevel:'aggregated' },
    { rawLabel:'Provisions pour risques et charges (reprise nette)', normalizedCategory:'exceptional_items', amountNative:0.972273, disclosureLevel:'detailed' },
    { rawLabel:"Impôts et taxes relatifs à l'exploitation", normalizedCategory:'admin_general_expense', amountNative:-0.962229, disclosureLevel:'detailed' },
    { rawLabel:"Autres charges d'exploitation", normalizedCategory:'other_expenses', amountNative:-0.306633, disclosureLevel:'detailed' },
    { rawLabel:"Charges d'exploitation non récurrentes", normalizedCategory:'other_expenses', amountNative:-0.000203, disclosureLevel:'aggregated' },
  ],
};

const standardliegeBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'standardliege-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    // Produits financiers (0.015077) - Charges financières (2.849768).
    netInterest:-2.834691,
    tax:-0.146296,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Dettes (17/48) EXCLUYENDO Comptes de régularisation (5.280279, ingresos
    // diferidos). cash = Valeurs disponibles.
    grossDebt:23.461701, cash:0.311835,
    officialTotalRevenue:44.568803, officialTotalExpenses:55.902521, /* excluye exceptional_items (+0.972273 crédito), ver criterio Chelsea */ officialPAT:-13.342433,
  },
};

const standardliegeBePresupuestoOverlayByYear = {};

const standardliegeBePasesData = [];
const standardliegeBeResultadosData = {};
const standardliegeBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['standardliege-be'] = {
  revenueLinesByYear: standardliegeBeRevenueLinesByYear, expenseLinesByYear: standardliegeBeExpenseLinesByYear,
  fiscalYearMeta: standardliegeBeFiscalYearMeta, pasesData: standardliegeBePasesData,
  resultadosData: standardliegeBeResultadosData, titulosData: standardliegeBeTitulosData,
  presupuestoOverlayByYear: standardliegeBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'standardliege-be-jaarrekening-2025': {
    id:'standardliege-be-jaarrekening-2025', clubId:'standardliege-be',
    title:"Comptes annuels du Standard de Liège SA pour l'exercice du 1/7/2024 au 30/6/2025",
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Banque Nationale de Belgique (BNB/NBB), esquema estatutario abreviado C-cap (Code des sociétés et des associations). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Standard Liège/jaarrekening-2025-06-30-individual.md. La Nota C-cap 6.10 (desglose de Chiffre d\'affaires por categoría/mercado) no fue completada por el club en este filing; "Autres produits d\'exploitation" solo desglosa el componente de subsidios estatales, el resto (67% de esa línea) queda sin especificar.',
  },
});

memberCountByClub['standardliege-be'] = null;
