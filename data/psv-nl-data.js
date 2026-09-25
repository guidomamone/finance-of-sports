// ============================================================================
// data/psv-nl-data.js — PSV N.V. (Eindhoven, Países Bajos).
// Uno de 4 clubes holandeses cargados en la sesión de onboarding de Países Bajos
// como país nuevo (Eredivisie). Ver data/ajax-nl-data.js para el contexto
// compartido de la tanda (país/liga nuevos, convención de clubId).
//
// FUENTE: `Clubes/Países Bajos/PSV/jaarverslag-2024-25.md` y
// `jaarverslag-2023-24.md` (transcripciones completas vía `pdftotext -layout`,
// PDF con capa de texto nativa, sin necesidad de OCR). Se cargaron los 2
// ejercicios MÁS RECIENTES de los 9 disponibles en el archivo de PSV (serie
// completa 2016/17-2024/25).
//
// Ejercicio 2023/2024 (cierra 30/6/2024) → clave 2024. Ejercicio 2024/2025
// (cierra 30/6/2025) → clave 2025. Valores de 2023/2024 tomados de la columna
// comparativa del jaarverslag 2024/2025, verificados EXACTOS contra el propio
// jaarverslag 2023/2024 (netto-omzet 152.128, Bedrijfsresultaat 13.909, Resultaat
// na belastingen 9.651 en los 2 documentos — cuentas holandesas a costo
// histórico nominal, sin reexpresión).
//
// FORMATO DEL DOCUMENTO: Geconsolideerde winst- en verliesrekening, esquema por
// naturaleza. A DIFERENCIA de Ajax, PSV SÍ desglosa el resultado de
// transferencias en sus 3 componentes brutos: "Vergoedingssommen" (ingreso bruto
// por venta/traspaso de jugadores), "Afschrijving op vergoedingssommen"
// (amortización del valor en libros de los pases) y "Bijzondere
// waardeverminderingen" (deterioro de pases) — por eso acá SÍ se cargan como
// revenueLine/expenseLine propias (player_sales/player_amortisation/
// player_impairment), no como profitOnPlayerSales neto en meta (club-data-mapping
// SKILL.md sección 1: promover a líneas de primer nivel cuando el documento
// SÍ separa los componentes).
//
// NETTO-OMZET por categoría (Toelichting nota 20, EUR miles), reconcilia exacto:
//                                                 2024/2025   2023/2024
//   Recettes competitie en KNVB beker                4.398       4.099   → matchday_competition
//   Recettes Europees voetbal                        8.778       7.833   → matchday_competition
//   Seizoen Club Cards (inclusief All-in)            13.676      11.396   → season_tickets
//   Premies Europees voetbal                        65.085      51.286   → competition_bonus
//   Overige wedstrijdopbrengsten                      1.194       1.367   → stadium_other
//   Partnerships                                     41.012      38.157   → sponsorship_commercial
//   Merchandising                                    11.274      10.342   → sponsorship_commercial
//   Media                                            15.039      11.034   → broadcasting
//   Stadionexploitatie                                5.155       9.030   → stadium_other
//   Overige opbrengsten                               5.231       7.584   → other_income
//
// GASTOS: Lonen, salarissen en sociale lasten (nota 21) NO separa por sector
// (a diferencia de Ajax) — toda la masa salarial va a wages_squad. Overige
// bedrijfskosten (nota 22) SÍ se desglosa: Overige personeelskosten +
// Huisvestingskosten + Beheerskosten → admin_general_expense; Wedstrijdkosten →
// match_organisation_expense propio. Kostprijs van de omzet → other_expenses.
// Afschrijvingen op materiële vaste activa → depreciation.
//
// RESULTADO FINANCIERO (netInterest): Renteresultaat (nota 23) = Rentebaten -
// Rentelasten. 2024/2025: 2.259 - 3.168 = -909. 2023/2024: 2.379 - 3.118 = -739.
//
// tax: Belastingen (nota 24). ATENCIÓN: en la transcripción por `pdftotext
// -layout` del bloque "Resultaat uit gewone bedrijfsuitoefening voor
// belastingen"/"Belastingen" las 2 columnas salieron en orden INVERTIDO (un
// artefacto de layout de esa página puntual, columnas numéricas muy pegadas) —
// se confirmó el valor real de cada año recalculando PBT = Bedrijfsresultaat +
// Renteresultaat y PAT = PBT + tax contra los totales impresos (Resultaat na
// belastingen 7.548/9.651), y cruzando además contra el detalle de nota 24
// ("Feitelijke belastinglast -2.554 25,3%" 2024/2025, "-3.519 26,7%" 2023/2024).
// tax 2024/2025 = -2.554; tax 2023/2024 = -3.519.
//
// TIE-OUT (verificado exacto contra los totales impresos):
//   2024/2025: revenue (170,842 netto-omzet + 23,676 vergoedingssommen) =
//     194,518; expenses -183,507; operatingProfit 11,011 = Bedrijfsresultaat
//     impreso exacto; + netInterest -0,909 = 10,102 = Resultaat uit gewone
//     bedrijfsuitoefening vóór belastingen impreso exacto; + tax -2,554 = 7,548 =
//     Resultaat na belastingen impreso exacto.
//   2023/2024: revenue (152,128 + 31,250) = 183,378; expenses -169,469;
//     operatingProfit 13,909 = impreso exacto; + netInterest -0,739 = 13,170 =
//     impreso exacto; + tax -3,519 = 9,651 = impreso exacto.
//
// MONEDA: EUR ambos años, fxRef a FX_CLOSE (mismas 2 fechas ya usadas por Ajax).
//
// grossDebt (balance CONSOLIDADO, no el enkelvoudig/standalone): Achtergestelde
// leningen (préstamo subordinado, deuda financiera real) + Schulden uit hoofde
// van transfers (deudas por traspasos) + Overige schulden (LT+CT) + Belastingen
// en premies sociale verzekeringen (LT+CT) + Aflossingsverplichting langlopende
// schulden + Crediteuren, EXCLUYENDO Voorzieningen (previsiones) y Overlopende
// passiva (pasivo devengado/diferido) — mismo criterio angosto que Ajax/Köln.
// cash: Liquide middelen (balance consolidado).
// ============================================================================

const psvNlRevenueLinesByYear = {
  2024: [
    { rawLabel:'Recettes competitie en KNVB beker', normalizedCategory:'matchday_competition', amountNative:4.099, disclosureLevel:'detailed' },
    { rawLabel:'Recettes Europees voetbal', normalizedCategory:'matchday_competition', amountNative:7.833, disclosureLevel:'detailed' },
    { rawLabel:'Seizoen Club Cards (inclusief All-in)', normalizedCategory:'season_tickets', amountNative:11.396, disclosureLevel:'detailed' },
    { rawLabel:'Premies Europees voetbal', normalizedCategory:'competition_bonus', amountNative:51.286, disclosureLevel:'detailed' },
    { rawLabel:'Overige wedstrijdopbrengsten', normalizedCategory:'stadium_other', amountNative:1.367, disclosureLevel:'detailed' },
    { rawLabel:'Partnerships', normalizedCategory:'sponsorship_commercial', amountNative:38.157, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:10.342, disclosureLevel:'detailed' },
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:11.034, disclosureLevel:'detailed' },
    { rawLabel:'Stadionexploitatie', normalizedCategory:'stadium_other', amountNative:9.030, disclosureLevel:'detailed' },
    { rawLabel:'Overige opbrengsten', normalizedCategory:'other_income', amountNative:7.584, disclosureLevel:'detailed' },
    { rawLabel:'Vergoedingssommen (transferopbrengsten)', normalizedCategory:'player_sales', amountNative:31.250, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Recettes competitie en KNVB beker', normalizedCategory:'matchday_competition', amountNative:4.398, disclosureLevel:'detailed' },
    { rawLabel:'Recettes Europees voetbal', normalizedCategory:'matchday_competition', amountNative:8.778, disclosureLevel:'detailed' },
    { rawLabel:'Seizoen Club Cards (inclusief All-in)', normalizedCategory:'season_tickets', amountNative:13.676, disclosureLevel:'detailed' },
    { rawLabel:'Premies Europees voetbal', normalizedCategory:'competition_bonus', amountNative:65.085, disclosureLevel:'detailed' },
    { rawLabel:'Overige wedstrijdopbrengsten', normalizedCategory:'stadium_other', amountNative:1.194, disclosureLevel:'detailed' },
    { rawLabel:'Partnerships', normalizedCategory:'sponsorship_commercial', amountNative:41.012, disclosureLevel:'detailed' },
    { rawLabel:'Merchandising', normalizedCategory:'sponsorship_commercial', amountNative:11.274, disclosureLevel:'detailed' },
    { rawLabel:'Media', normalizedCategory:'broadcasting', amountNative:15.039, disclosureLevel:'detailed' },
    { rawLabel:'Stadionexploitatie', normalizedCategory:'stadium_other', amountNative:5.155, disclosureLevel:'detailed' },
    { rawLabel:'Overige opbrengsten', normalizedCategory:'other_income', amountNative:5.231, disclosureLevel:'detailed' },
    { rawLabel:'Vergoedingssommen (transferopbrengsten)', normalizedCategory:'player_sales', amountNative:23.676, disclosureLevel:'detailed' },
  ],
};

const psvNlExpenseLinesByYear = {
  2024: [
    { rawLabel:'Kostprijs van de omzet', normalizedCategory:'other_expenses', amountNative:-9.598, disclosureLevel:'detailed' },
    { rawLabel:'Lonen, salarissen en sociale lasten', normalizedCategory:'wages_squad', amountNative:-77.193, disclosureLevel:'detailed', items:[
      ['Lonen en salarissen', 72.416], ['Sociale lasten', 3.596], ['Pensioenlasten', 1.181],
    ]},
    // admin_general_expense = Overige personeelskosten(5.082) + Huisvestingskosten(12.234) +
    // Beheerskosten(20.347) = 37.663.
    { rawLabel:'Overige personeelskosten + Huisvestingskosten + Beheerskosten', normalizedCategory:'admin_general_expense', amountNative:-37.663, disclosureLevel:'detailed', items:[
      ['Overige personeelskosten', 5.082], ['Huisvestingskosten', 12.234], ['Beheerskosten', 20.347],
    ]},
    { rawLabel:'Wedstrijdkosten', normalizedCategory:'match_organisation_expense', amountNative:-9.424, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen op materiële vaste activa', normalizedCategory:'depreciation', amountNative:-7.110, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijving op vergoedingssommen', normalizedCategory:'player_amortisation', amountNative:-25.734, disclosureLevel:'detailed' },
    { rawLabel:'Bijzondere waardeverminderingen (vergoedingssommen)', normalizedCategory:'player_impairment', amountNative:-2.747, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Kostprijs van de omzet', normalizedCategory:'other_expenses', amountNative:-7.886, disclosureLevel:'detailed' },
    { rawLabel:'Lonen, salarissen en sociale lasten', normalizedCategory:'wages_squad', amountNative:-84.264, disclosureLevel:'detailed', items:[
      ['Lonen en salarissen', 78.988], ['Sociale lasten', 4.100], ['Pensioenlasten', 1.176],
    ]},
    // admin_general_expense = Overige personeelskosten(5.555) + Huisvestingskosten(12.267) +
    // Beheerskosten(20.464) = 38.286.
    { rawLabel:'Overige personeelskosten + Huisvestingskosten + Beheerskosten', normalizedCategory:'admin_general_expense', amountNative:-38.286, disclosureLevel:'detailed', items:[
      ['Overige personeelskosten', 5.555], ['Huisvestingskosten', 12.267], ['Beheerskosten', 20.464],
    ]},
    { rawLabel:'Wedstrijdkosten', normalizedCategory:'match_organisation_expense', amountNative:-12.536, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen op materiële vaste activa', normalizedCategory:'depreciation', amountNative:-7.358, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijving op vergoedingssommen', normalizedCategory:'player_amortisation', amountNative:-33.177, disclosureLevel:'detailed' },
    { rawLabel:'Bijzondere waardeverminderingen (vergoedingssommen)', normalizedCategory:'player_impairment', amountNative:0, disclosureLevel:'detailed' },
  ],
};

const psvNlFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'psv-nl-jaarverslag-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-0.739, tax:-3.519,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt (balance consolidado) = Achtergestelde leningen(45.100) + Schulden uit hoofde van
    // transfers(31.760) + Overige schulden(404+35.000) + Belastingen en premies(12.820+12.902) +
    // Aflossingsverplichting(202) + Crediteuren(25.203), EXCLUYE Voorzieningen(6.006) y
    // Overlopende passiva(28.182). cash = Liquide middelen (consolidado).
    grossDebt:163.391, cash:21.859,
    officialTotalRevenue:183.378, officialTotalExpenses:169.469, officialPAT:9.651,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'psv-nl-jaarverslag-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:-0.909, tax:-2.554,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Achtergestelde leningen(45.000) + Schulden uit hoofde van transfers(21.368) +
    // Overige schulden(296+32.750) + Belastingen en premies(0+6.964) + Aflossingsverplichting(207)
    // + Crediteuren(34.242), EXCLUYE Voorzieningen(6.250) y Overlopende passiva(22.770).
    grossDebt:140.827, cash:9.155,
    officialTotalRevenue:194.518, officialTotalExpenses:183.507, officialPAT:7.548,
  },
};

const psvNlPresupuestoOverlayByYear = {};

const psvNlPasesData = [];
const psvNlResultadosData = {};
const psvNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['psv-nl'] = {
  revenueLinesByYear: psvNlRevenueLinesByYear, expenseLinesByYear: psvNlExpenseLinesByYear,
  fiscalYearMeta: psvNlFiscalYearMeta, pasesData: psvNlPasesData,
  resultadosData: psvNlResultadosData, titulosData: psvNlTitulosData,
  presupuestoOverlayByYear: psvNlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'psv-nl-jaarverslag-2024': {
    id:'psv-nl-jaarverslag-2024', clubId:'psv-nl',
    title:'Jaarverslag PSV N.V. boekjaar 2023-2024 (1 juli 2023 - 30 juni 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jaarverslag oficial consolidado de PSV N.V., descargado del canal público de la KNVB (licencia F.04). PDF con capa de texto nativa. Transcripción completa en Clubes/Países Bajos/PSV/jaarverslag-2023-24.md.',
  },
  'psv-nl-jaarverslag-2025': {
    id:'psv-nl-jaarverslag-2025', clubId:'psv-nl',
    title:'Jaarverslag PSV N.V. boekjaar 2024-2025 (1 juli 2024 - 30 juni 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jaarverslag oficial consolidado de PSV N.V., descargado del canal público de la KNVB (licencia F.04). PDF con capa de texto nativa. Transcripción completa en Clubes/Países Bajos/PSV/jaarverslag-2024-25.md.',
  },
});

gestionesByClub['psv-nl'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['psv-nl'] = null;
