// ============================================================================
// data/westerlo-be-data.js — KVC Westerlo BV (Bélgica). Club nuevo, cargado en
// la 2da tanda de onboarding de la sesión 2026-09-25 (junto con Standard
// Liège y Union Saint-Gilloise).
//
// FUENTE: `Clubes/Bélgica/Westerlo/jaarrekening-2025-06-30-individual.md`
// (única versión disponible, no hay consolidado). Cierre 30/6/2025 (ejercicio
// 1/7/2024-30/6/2025) → clave 2025. PDF con capa de texto nativa. Depositado
// en la Balanscentrale de la Nationale Bank van België (NBB), esquema
// estatutario abreviado VOL-inb (forma jurídica "Besloten vennootschap"/BV,
// Vlaanderen — mismo esquema que Mechelen/Antwerp, en NEERLANDÉS).
//
// FORMATO DEL DOCUMENTO: jaarrekening estatutario belga VOL-inb individual,
// poco desglosado. La Nota VOL-inb 6.10 ("Uitsplitsing per bedrijfscategorie")
// del Omzet está presente pero SIN NINGÚN VALOR CARGADO, y a diferencia de
// Mechelen/Antwerp tampoco completa el sub-detalle de subsidios dentro de
// "Andere bedrijfsopbrengsten" (código 740 en blanco este ejercicio) — mismo
// caso extremo que Charleroi. Patrimonio neto (Eigen vermogen) NEGATIVO:
// -1.853.936 EUR (mejoró desde -3.586.204 el ejercicio anterior, vía aumento
// de capital: "Inbreng"/Apport subió de 56.114.878 a 69.614.892).
//
// INGRESOS (Resultatenrekening, pág. 8, códigos NBB, EUR):
//   Omzet (código 70) — sin desglose numérico (Nota 6.10 vacía)          14.373418 → lump_football_operations
//   Andere bedrijfsopbrengsten (código 74) — SIN NINGÚN desglose
//     disponible, ni siquiera el componente de subsidios (código 740 en
//     blanco este ejercicio, a diferencia de Mechelen/Antwerp/Standard
//     Liège/Union SG que sí lo completan)                                16.309398 → other_income
//   Niet-recurrente bedrijfsopbrengsten (código 76A) — Nota 6.12: sin
//     sub-desglose por código (todos los sub-códigos 760/7620/7630/764/8
//     en blanco este ejercicio), monto chico                              0.046566 → other_income
// Total: 14.373418+16.309398+0.046566 = 30.729382, exacto contra 30.729.382 impreso (70/76A).
//
// GASTOS (Resultatenrekening pág. 8-9 + Nota VOL-inb 6.2.1 pág. 11 + Notas
// 6.3.1-6.3.5 pág. 12-15 + Nota VOL-inb 6.10 pág. 24-25 + Nota VOL-inb 6.12
// pág. 27):
//   Handelsgoederen, grond- en hulpstoffen (código 60, sin más desglose)   -3.495560 → other_expenses
//   Diensten en diverse goederen (código 61, sin más desglose)           -12.257662 → other_expenses
//   Bezoldigingen, sociale lasten en pensioenen (código 62, todo el
//     personal, sin separar plantel/resto — Nota 6.10: 134 empleados/
//     101,9 FTE)                                                        -17.858655 → wages_squad
//     items: Bezoldigingen en rechtstreekse sociale voordelen 14.675317 +
//     Werkgeversbijdragen voor sociale verzekeringen 2.250854 + Werkgeverspremies
//     voor bovenwettelijke verzekeringen 0.138962 + Andere personeelskosten 0.793522
//   Afschrijvingen (código 630, -8.001354 total) SE PROMOVIÓ a 3 líneas
//   según el Estado de movimiento de activos fijos (mismo criterio que el
//   resto de los clubes belgas): Nota 6.2.1 "STAAT VAN DE IMMATERIËLE VASTE
//   ACTIVA" (bajo el rótulo "KOSTEN VAN ONTWIKKELING", que aloja los
//   derechos de inscripción de jugadores) "Geboekt" (código 8071) =
//   amortización de pases; Notas 6.3.1/6.3.2/6.3.3/6.3.5 "Geboekt" sumadas
//   (0.540100+0.531659+0.112072+0.012487) = depreciación de activos
//   tangibles; el residuo de EUR 3.058 entre la suma de ambas notas
//   (7.998296) y el código 630 impreso (8.001354) no tiene explicación
//   identificable en el documento (no hay nota de "Oprichtingskosten"/gastos
//   de constitución en este filing, a diferencia de Standard Liège) — se
//   cargó como una línea de redondeo chica, mismo criterio que otras
//   diferencias de redondeo documentadas en este sitio (ver Cruzeiro):
//     Amortización spelersregistratierechten (immateriële activa, código
//       8071)                                                           -6.801978 → player_amortisation
//     Depreciación activos tangibles (código 8271+8272+8273+8275)        -1.196318 → depreciation
//     Residuo sin explicación identificable (redondeo, EUR 3.058)        -0.003058 → other_amortisation
//     (suma 8.001354, exacto contra el código 630 impreso)
//   Waardeverminderingen op voorraden (código 631/4, neto: Nota 6.10 código
//     9110 "Geboekt" 0.009531 menos 9111 "Teruggenomen" 0.005886)         -0.003645 → other_expenses
//   Andere bedrijfskosten (código 640/8, 0.307928 total) SE PROMOVIÓ a 2
//   líneas según la Nota 6.10 (que sí desglosa Bedrijfsbelastingen en
//   -taksen vs. Andere, aunque el orden exacto de los 2 valores en la
//   transcripción es tentativo, ver PREGUNTA ABIERTA):
//     Bedrijfsbelastingen en -taksen                                     -0.273750 → admin_general_expense
//     Andere                                                             -0.034178 → other_expenses
//     (suma 0.307928, exacto contra el código 640/8 impreso)
//   Niet-recurrente bedrijfskosten (código 66A, 0.201673 total) — Nota
//     6.12: 100% es "Minderwaarden bij de realisatie van immateriële en
//     materiële vaste activa" (código 6630, pérdida contable en la baja de
//     un pase/activo) — mismo concepto que Antwerp                       -0.201673 → player_impairment
// Total expenseLines: -42.126477, exacto contra 42.126.477 impreso (60/66A).
//
// PREGUNTA ABIERTA (para Admin/dudas-por-club.md, o re-lectura directa del
// PDF pág. 25): igual que Union Saint-Gilloise, el split exacto entre
// "Bedrijfsbelastingen en -taksen" (640) y "Andere" (641/8) dentro de
// "Andere bedrijfskosten" se infirió del ÚNICO par de valores de la Nota
// 6.10 que suma exacto contra el total impreso (0.273750+0.034178=0.307928),
// pero el orden código-valor no se pudo confirmar con certeza en la
// transcripción a Markdown. Monto chico (0,65% del total de gastos), no
// cambia el resultado.
//
// RESULTADO FINANCIERO (netInterest): Financiële opbrengsten (75/76B,
// 0.015311) - Financiële kosten (65/66B, 0.102800) = -0.087489.
//
// TAX: Belastingen op het resultaat (código 67/77) -0.283163.
//
// TIE-OUT (verificado, pág. 8-9 del documento, con los subtotales IMPRESOS):
//   Bedrijfsopbrengsten 30.729382 - Bedrijfskosten 42.126477 = "Bedrijfswinst
//   (Bedrijfsverlies)" (código 9901) -11.397095, EXACTO. + Financieel netto
//   (-0.087489) = "Winst (Verlies) vóór belasting" (código 9903) -11.484584,
//   EXACTO. - Belastingen (0.283163) = "Winst (Verlies) van het boekjaar"/"Te
//   bestemmen" (códigos 9904/9905) -11.767747, EXACTO. officialPAT =
//   -11.767747.
//
// MONEDA: EUR, fxRef 'EUR@2025-06-30' (ya existía en FX_CLOSE, 0,8532).
//
// grossDebt: "SCHULDEN" (total código 17/49, pág. 7) = 40.527718, EXCLUYENDO
// "Overlopende rekeningen" (código 492/3, 1.120386, ingresos diferidos/gastos
// devengados), mismo criterio que el resto de los clubes belgas: grossDebt =
// 40.527718 - 1.120386 = 39.407332. **Ojo con la fila "Vooruitbetalingen op
// bestellingen" (código 46, línea de pasivo corriente): el documento imprime
// UN SOLO valor "2.506.213" al lado de esa fila, sin acompañarlo de un 2do
// valor — se interpretó como el valor del EJERCICIO ANTERIOR (Vorig
// boekjaar), con el ejercicio actual en $0, porque solo así "Schulden op ten
// hoogste één jaar" (42/48) suma exacto el total impreso (15.027.920); si se
// incluyera 2.506.213 como valor del ejercicio actual, la suma de sus
// componentes daría 17.534.133, que NO reconcilia contra el total impreso.**
// cash: "Liquide middelen" (código 54/58, 0.135090) — no se sumó
// "Geldbeleggingen" (en blanco/0 este balance). Total activa = Total pasiva =
// 38.673781 (balance cuadra).
//
// GESTIÓN: el documento no identifica con confianza un accionista de
// referencia/"hoofdaandeelhouder" único y estable para todo el ejercicio →
// gestionId: null.
// ============================================================================

const westerloBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Omzet', normalizedCategory:'lump_football_operations', amountNative:14.373418, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:16.309398, disclosureLevel:'aggregated' },
    { rawLabel:'Niet-recurrente bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.046566, disclosureLevel:'aggregated' },
  ],
};

const westerloBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Handelsgoederen, grond- en hulpstoffen', normalizedCategory:'other_expenses', amountNative:-3.495560, disclosureLevel:'aggregated' },
    { rawLabel:'Diensten en diverse goederen', normalizedCategory:'other_expenses', amountNative:-12.257662, disclosureLevel:'aggregated' },
    { rawLabel:'Bezoldigingen, sociale lasten en pensioenen', normalizedCategory:'wages_squad', amountNative:-17.858655, disclosureLevel:'detailed', items:[
      ['Bezoldigingen en rechtstreekse sociale voordelen', 14.675317], ['Werkgeversbijdragen voor sociale verzekeringen', 2.250854], ['Werkgeverspremies voor bovenwettelijke verzekeringen', 0.138962], ['Andere personeelskosten', 0.793522],
    ]},
    { rawLabel:'Afschrijvingen op immateriële vaste activa (spelersregistratierechten)', normalizedCategory:'player_amortisation', amountNative:-6.801978, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen op materiële vaste activa', normalizedCategory:'depreciation', amountNative:-1.196318, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen — residuo no explicado entre Nota 6.2.1/6.3.x y el código 630 impreso (redondeo)', normalizedCategory:'other_amortisation', amountNative:-0.003058, disclosureLevel:'aggregated' },
    { rawLabel:'Waardeverminderingen op voorraden en bestellingen (netto)', normalizedCategory:'other_expenses', amountNative:-0.003645, disclosureLevel:'aggregated' },
    { rawLabel:'Andere bedrijfskosten — Bedrijfsbelastingen en -taksen', normalizedCategory:'admin_general_expense', amountNative:-0.273750, disclosureLevel:'detailed' },
    { rawLabel:'Andere bedrijfskosten — Andere', normalizedCategory:'other_expenses', amountNative:-0.034178, disclosureLevel:'detailed' },
    { rawLabel:'Niet-recurrente bedrijfskosten (minderwaarden bij realisatie van immateriële en materiële vaste activa)', normalizedCategory:'player_impairment', amountNative:-0.201673, disclosureLevel:'aggregated' },
  ],
};

const westerloBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'westerlo-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    // Financiële opbrengsten (0.015311) - Financiële kosten (0.102800).
    netInterest:-0.087489,
    tax:-0.283163,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Schulden (17/49) EXCLUYENDO Overlopende rekeningen (1.120386, ingresos
    // diferidos). cash = Liquide middelen.
    grossDebt:39.407332, cash:0.135090,
    officialTotalRevenue:30.729382, officialTotalExpenses:42.126477, officialPAT:-11.767747,
  },
};

const westerloBePresupuestoOverlayByYear = {};

const westerloBePasesData = [];
const westerloBeResultadosData = {};
const westerloBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['westerlo-be'] = {
  revenueLinesByYear: westerloBeRevenueLinesByYear, expenseLinesByYear: westerloBeExpenseLinesByYear,
  fiscalYearMeta: westerloBeFiscalYearMeta, pasesData: westerloBePasesData,
  resultadosData: westerloBeResultadosData, titulosData: westerloBeTitulosData,
  presupuestoOverlayByYear: westerloBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'westerlo-be-jaarrekening-2025': {
    id:'westerlo-be-jaarrekening-2025', clubId:'westerlo-be',
    title:'Jaarrekening van KVC Westerlo BV voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas INDIVIDUALES (no hay consolidado disponible para este club). Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Westerlo/jaarrekening-2025-06-30-individual.md. Nota 6.10 (desglose de Omzet y de subsidios dentro de Andere bedrijfsopbrengsten) no fue completada por el club en este filing. Patrimonio neto negativo al cierre (-EUR 1,85 M), mejorado desde -EUR 3,59 M el ejercicio anterior vía un aumento de capital (Inbreng de EUR 56,1 M a EUR 69,6 M).',
  },
});

memberCountByClub['westerlo-be'] = null;
