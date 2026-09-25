// ============================================================================
// data/az-nl-data.js — AZ Holding B.V. (Alkmaar, Países Bajos).
// Uno de 4 clubes holandeses cargados en la sesión de onboarding de Países Bajos
// como país nuevo (Eredivisie). Ver data/ajax-nl-data.js para el contexto
// compartido de la tanda. `clubId` 'az-nl': la sigla del club ya lleva el
// sufijo de país igual que el resto de esta tanda, para que quede unívoco
// (a diferencia de la carpeta de fuentes, que es solo "AZ").
//
// FUENTE: `Clubes/Países Bajos/AZ/jaarrekening-2024-25.md` y
// `jaarrekening-2023-24.md` (transcripciones completas vía `pdftotext -layout`,
// PDF con capa de texto nativa). Se cargaron los 2 ejercicios MÁS RECIENTES de
// los 7 disponibles en el archivo de AZ (serie completa 2018/19-2024/25). A
// diferencia de Ajax/PSV/Feyenoord (que publican "Jaarverslag", memoria +
// estados contables), el documento de AZ es una "Jaarrekening" (solo estados
// contables) — mismo contenido financiero relevante, sin la parte narrativa.
//
// Ejercicio 2023/2024 (cierra 30/6/2024) → clave 2024. Ejercicio 2024/2025
// (cierra 30/6/2025) → clave 2025. Valores de 2023/2024 tomados de la columna
// comparativa de la jaarrekening 2024/2025, verificados EXACTOS contra la propia
// jaarrekening 2023/2024 (Bedrijfsresultaat 20.200, Resultaat na belastingen
// 12.589 en los 2 documentos — cuentas holandesas a costo histórico nominal).
//
// FORMATO DEL DOCUMENTO: Geconsolideerde winst- en verliesrekening, con
// "Netto-omzet" (ingresos operativos de fútbol/comerciales) y "Overige
// bedrijfsopbrengsten" (nota 10) como 2 bloques de ingreso SEPARADOS que suman
// el "Bruto bedrijfsresultaat". La nota 10 aclara que "Vergoedingssommen
// spelers" (29.498/44.223) ya está declarada NETA por el propio club ("de
// vergoedingssommen spelers zijn netto vergoedingssommen... bruto
// vergoedingssommen na aftrek van directe kosten" — bruto 37,9M/64,5M menos
// costos directos 8,4M/20,3M) — se cargó tal cual la declara el club (neta,
// como revenueLine player_sales), sin desagregar el bruto/costo que el propio
// club ya netea en la fuente (mismo criterio de "reflejá cómo lo presenta cada
// club" que Ajax, club-data-mapping SKILL.md sección 3).
//
// NETTO-OMZET por categoría (Toelichting nota 9, EUR miles), reconcilia exacto:
//                                                      2024/2025   2023/2024
//   Wedstrijdbaten                                       24.535      11.499   → matchday_competition (incluye recaudación + premios de competencia, sin separar)
//   Sponsoropbrengsten                                   16.324      15.097   → sponsorship_commercial
//   Opbrengst Televisiegelden                             9.965       8.284   → broadcasting
//   Opbrengst Merchandising, magazines en internet        1.392       1.131   → sponsorship_commercial
//   Opbrengst Horeca                                      6.380       5.253   → stadium_other (catering/hostelería del día de partido)
//   Verhuur spelers en detachering personeel                698         687   → other_income (línea mixta chica: cesión de jugadores + secondment de personal, sin desglose)
//
// OVERIGE BEDRIJFSOPBRENGSTEN (nota 10):
//   Vergoedingssommen spelers (NETO)                     29.498      44.223   → player_sales
//   Overige bedrijfsopbrengsten                           2.411       2.047   → other_income
//
// GASTOS: Lonen en salarissen + Sociale lasten + Pensioenlasten → wages_squad
// (sin separación por sector, aunque la nota de personal SÍ desglosa headcount
// por área —Spelers/Staf/Back office/Horeca/Overig—, no hay monto en EUR por
// área, solo cantidad de FTE, así que no hay base para partir el monto).
// Afschrijvingen immateriële vaste activa (nota 12, "afschrijving boekwaarde
// spelers en overige immateriële vaste activa") → player_amortisation.
// Afschrijvingen materiële vaste activa (nota 13) → depreciation. De
// "Som der kosten" restante (Overige personeelskosten, Huisvestingskosten,
// Verkoopkosten, Autokosten, Kantoorkosten, Algemene kosten) → admin_general_expense;
// Wedstrijd- en trainingkosten → match_organisation_expense propio; Overige
// lasten (catch-all chico) → other_expenses.
//
// RESULTADO FINANCIERO (netInterest): Rentebaten en soortgelijke opbrengsten +
// Rentelasten en soortgelijke kosten (ya el propio documento imprime "Som der
// financiële baten en lasten"). 2024/2025: 2.358 - 1.307 = 1.051. 2023/2024:
// 1.673 - 4.642 = -2.969.
//
// tax: Belastingen. 2024/2025: -3.936. 2023/2024: -4.642.
//
// TIE-OUT (verificado, diferencia de EUR 1 mil por redondeo de componentes en
// 2024/2025, irrelevante frente al total):
//   2024/2025: revenue (59,293 netto-omzet + 29,498 + 2,411) = 91,202; expenses
//     -77,914; operatingProfit 13,288 vs Bedrijfsresultaat impreso 13,287
//     (redondeo, EUR 1 mil); se usó el Bedrijfsresultaat IMPRESO (13,287) + Som
//     der financiële baten en lasten 1,051 = 14,338 = Resultaat voor
//     belastingen impreso exacto; + tax -3,936 = 10,402 = Resultaat na
//     belastingen impreso exacto.
//   2023/2024: revenue (41,950 + 44,223 + 2,047) = 88,220; expenses -68,020;
//     operatingProfit 20,200 = Bedrijfsresultaat impreso exacto; + netInterest
//     -2,969 = 17,231 = Resultaat voor belastingen impreso exacto; + tax -4,642
//     = 12,589 = Resultaat na belastingen impreso exacto.
//
// MONEDA: EUR ambos años, fxRef a FX_CLOSE (mismas 2 fechas ya usadas por el
// resto de la tanda holandesa).
//
// grossDebt: Geconsolideerde balans — Schulden aan kredietinstellingen (LT) +
// Overige schulden (LT+CT) + Handelscrediteuren + Belastingen en premies sociale
// verzekeringen (CT), EXCLUYENDO Voorzieningen (Belastingvoorzieningen + Overige
// voorzieningen) y Overlopende passiva (LT+CT) — mismo criterio angosto que el
// resto de la tanda. cash: Liquide middelen.
// ============================================================================

const azNlRevenueLinesByYear = {
  2024: [
    { rawLabel:'Wedstrijdbaten', normalizedCategory:'matchday_competition', amountNative:11.499, disclosureLevel:'detailed' },
    { rawLabel:'Sponsoropbrengsten', normalizedCategory:'sponsorship_commercial', amountNative:15.097, disclosureLevel:'detailed' },
    { rawLabel:'Opbrengst Televisiegelden', normalizedCategory:'broadcasting', amountNative:8.284, disclosureLevel:'detailed' },
    { rawLabel:'Opbrengst Merchandising, magazines en internet', normalizedCategory:'sponsorship_commercial', amountNative:1.131, disclosureLevel:'detailed' },
    { rawLabel:'Opbrengst Horeca', normalizedCategory:'stadium_other', amountNative:5.253, disclosureLevel:'detailed' },
    { rawLabel:'Verhuur spelers en detachering personeel', normalizedCategory:'other_income', amountNative:0.687, disclosureLevel:'detailed' },
    { rawLabel:'Vergoedingssommen spelers (netto, overige bedrijfsopbrengsten)', normalizedCategory:'player_sales', amountNative:44.223, disclosureLevel:'detailed' },
    { rawLabel:'Overige bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:2.047, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Wedstrijdbaten', normalizedCategory:'matchday_competition', amountNative:24.535, disclosureLevel:'detailed' },
    { rawLabel:'Sponsoropbrengsten', normalizedCategory:'sponsorship_commercial', amountNative:16.324, disclosureLevel:'detailed' },
    { rawLabel:'Opbrengst Televisiegelden', normalizedCategory:'broadcasting', amountNative:9.965, disclosureLevel:'detailed' },
    { rawLabel:'Opbrengst Merchandising, magazines en internet', normalizedCategory:'sponsorship_commercial', amountNative:1.392, disclosureLevel:'detailed' },
    { rawLabel:'Opbrengst Horeca', normalizedCategory:'stadium_other', amountNative:6.380, disclosureLevel:'detailed' },
    { rawLabel:'Verhuur spelers en detachering personeel', normalizedCategory:'other_income', amountNative:0.698, disclosureLevel:'detailed' },
    { rawLabel:'Vergoedingssommen spelers (netto, overige bedrijfsopbrengsten)', normalizedCategory:'player_sales', amountNative:29.498, disclosureLevel:'detailed' },
    { rawLabel:'Overige bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:2.411, disclosureLevel:'detailed' },
  ],
};

const azNlExpenseLinesByYear = {
  2024: [
    { rawLabel:'Lonen en salarissen, sociale lasten en pensioenlasten', normalizedCategory:'wages_squad', amountNative:-32.588, disclosureLevel:'detailed', items:[
      ['Lonen en salarissen', 29.652], ['Sociale lasten', 2.501], ['Pensioenlasten', 0.435],
    ]},
    { rawLabel:'Afschrijvingen immateriële vaste activa (boekwaarde spelers)', normalizedCategory:'player_amortisation', amountNative:-12.064, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen materiële vaste activa', normalizedCategory:'depreciation', amountNative:-2.552, disclosureLevel:'detailed' },
    // admin_general_expense = Overige personeelskosten(2.572) + Huisvestingskosten(4.952) +
    // Verkoopkosten(4.741) + Autokosten(1.315) + Kantoorkosten(0.691) + Algemene kosten(0.387) = 14.658.
    { rawLabel:'Overige personeelskosten + Huisvestingskosten + Verkoopkosten + Autokosten + Kantoorkosten + Algemene kosten', normalizedCategory:'admin_general_expense', amountNative:-14.658, disclosureLevel:'detailed', items:[
      ['Overige personeelskosten', 2.572], ['Huisvestingskosten', 4.952], ['Verkoopkosten', 4.741],
      ['Autokosten', 1.315], ['Kantoorkosten', 0.691], ['Algemene kosten', 0.387],
    ]},
    { rawLabel:'Wedstrijd- en trainingkosten', normalizedCategory:'match_organisation_expense', amountNative:-5.707, disclosureLevel:'detailed' },
    { rawLabel:'Overige lasten', normalizedCategory:'other_expenses', amountNative:-0.451, disclosureLevel:'detailed' },
  ],
  2025: [
    { rawLabel:'Lonen en salarissen, sociale lasten en pensioenlasten', normalizedCategory:'wages_squad', amountNative:-37.794, disclosureLevel:'detailed', items:[
      ['Lonen en salarissen', 34.461], ['Sociale lasten', 2.856], ['Pensioenlasten', 0.477],
    ]},
    { rawLabel:'Afschrijvingen immateriële vaste activa (boekwaarde spelers)', normalizedCategory:'player_amortisation', amountNative:-9.514, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen materiële vaste activa', normalizedCategory:'depreciation', amountNative:-2.830, disclosureLevel:'detailed' },
    // admin_general_expense = Overige personeelskosten(4.280) + Huisvestingskosten(6.221) +
    // Verkoopkosten(5.859) + Autokosten(1.395) + Kantoorkosten(0.830) + Algemene kosten(0.622) = 19.207.
    { rawLabel:'Overige personeelskosten + Huisvestingskosten + Verkoopkosten + Autokosten + Kantoorkosten + Algemene kosten', normalizedCategory:'admin_general_expense', amountNative:-19.207, disclosureLevel:'detailed', items:[
      ['Overige personeelskosten', 4.280], ['Huisvestingskosten', 6.221], ['Verkoopkosten', 5.859],
      ['Autokosten', 1.395], ['Kantoorkosten', 0.830], ['Algemene kosten', 0.622],
    ]},
    { rawLabel:'Wedstrijd- en trainingkosten', normalizedCategory:'match_organisation_expense', amountNative:-7.765, disclosureLevel:'detailed' },
    { rawLabel:'Overige lasten', normalizedCategory:'other_expenses', amountNative:-0.804, disclosureLevel:'detailed' },
  ],
};

const azNlFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'az-nl-jaarrekening-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:1.673-4.642, tax:-4.642,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Schulden aan kredietinstellingen(7.333) + Overige schulden(10.523+8.630) +
    // Handelscrediteuren(9.414) + Belastingen en premies sociale verzekeringen(3.375), EXCLUYE
    // Voorzieningen(13.918) y Overlopende passiva(1.934+3.960). cash = Liquide middelen.
    grossDebt:39.275, cash:14.012,
    officialTotalRevenue:88.220, officialTotalExpenses:68.020, officialPAT:12.589,
  },
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'az-nl-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    netInterest:1.051, tax:-3.936,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Schulden aan kredietinstellingen(6.667) + Overige schulden(9.899+8.496) +
    // Handelscrediteuren(9.048) + Belastingen en premies sociale verzekeringen(3.468), EXCLUYE
    // Voorzieningen(16.577) y Overlopende passiva(1.813+4.776).
    grossDebt:37.578, cash:8.877,
    officialTotalRevenue:91.202, officialTotalExpenses:77.914, officialPAT:10.402,
  },
};

const azNlPresupuestoOverlayByYear = {};

const azNlPasesData = [];
const azNlResultadosData = {};
const azNlTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['az-nl'] = {
  revenueLinesByYear: azNlRevenueLinesByYear, expenseLinesByYear: azNlExpenseLinesByYear,
  fiscalYearMeta: azNlFiscalYearMeta, pasesData: azNlPasesData,
  resultadosData: azNlResultadosData, titulosData: azNlTitulosData,
  presupuestoOverlayByYear: azNlPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'az-nl-jaarrekening-2024': {
    id:'az-nl-jaarrekening-2024', clubId:'az-nl',
    title:'Jaarrekening AZ Holding B.V. boekjaar 2023-2024 (1 juli 2023 - 30 juni 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jaarrekening oficial consolidada de AZ Holding B.V., descargada del canal público de la KNVB (licencia F.04). Solo estados contables (sin memoria narrativa, a diferencia de Ajax/PSV/Feyenoord). PDF con capa de texto nativa. Transcripción completa en Clubes/Países Bajos/AZ/jaarrekening-2023-24.md.',
  },
  'az-nl-jaarrekening-2025': {
    id:'az-nl-jaarrekening-2025', clubId:'az-nl',
    title:'Jaarrekening AZ Holding B.V. boekjaar 2024-2025 (1 juli 2024 - 30 juni 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Jaarrekening oficial consolidada de AZ Holding B.V., descargada del canal público de la KNVB (licencia F.04). PDF con capa de texto nativa. Transcripción completa en Clubes/Países Bajos/AZ/jaarrekening-2024-25.md.',
  },
});

gestionesByClub['az-nl'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2025 },
};

memberCountByClub['az-nl'] = null;
