// ============================================================================
// data/clubbrugge-be-data.js — Club Brugge KV (Bélgica). Uno de 4 clubes belgas
// de la Pro League cargados en esta sesión (onboarding de Bélgica como país
// nuevo): Club Brugge, Anderlecht, Genk, Gent.
//
// FUENTE: `Clubes/Bélgica/Club Brugge/jaarrekening-2025-06-30-consolidado.md`
// (transcripción del jaarrekening GECONSOLIDEERD — cuentas de GRUPO, en IFRS —
// preferida sobre la versión `-individual` disponible para el mismo año, según
// el criterio de la tarea: preferir siempre consolidado cuando exista). Cierre
// 30/6/2025 (ejercicio 1/7/2024-30/6/2025) → clave 2025. El PDF tiene capa de
// texto nativa.
//
// FORMATO DEL DOCUMENTO: a diferencia de Anderlecht/Genk/Gent (que solo
// tuvieron individual, formato estatutario belga VOL-kap/VOL-VZW con "codes"),
// las cuentas consolidadas de Club Brugge están en IFRS puro, con un P&L
// (Geconsolideerde resultatenrekening, pág. 10) MUCHO más desglosado — Nota 20
// separa explícitamente Wedstrijdopbrengsten/Mediarechten/Commerciële/Overige,
// y notas 21-24 desglosan cada línea de gasto. Esto la hace la fuente más rica
// de las 4 y la plantilla natural para las otras 3.
//
// INGRESOS (P&L pág. 10, en €'000, reproducidos acá tal cual — ej. "27.588"
// del documento = 27.588 millones EUR):
//   Wedstrijdopbrengsten (matchday)                         27.588 → matchday_competition
//   Opbrengsten uit mediarechten (media rights)              74.117 → broadcasting
//     Nota 20.2: Binnenlands (doméstico) 12.968 + Europees (UCL/UEL) 61.149
//   Commerciële opbrengsten (comercial/sponsors)             18.784 → sponsorship_commercial
//   Overige opbrengsten (Nota 20.4: honorarios de selecciones
//     nacionales a jugadores cedidos + canon de Cercle Brugge
//     por compartir el Jan Breydel — mezclado, no se puede separar)  1.778 → other_income
//   Meerwaarde bij de overdracht van spelersregistratierechten
//     (ganancia BRUTA por venta de pases, sin netear contra la
//     pérdida del lado de gastos — igual criterio que Boca/Racing)  31.658 → player_sales
//   Overige bedrijfsopbrengsten (Nota 21: Lidgeld/cuotas 0.044 +
//     Giften/donaciones 0.030 + Overige 0.198)                       0.272 → other_income
// Total: 154.197 vs 154.196 impreso (diferencia de 1.000 EUR, redondeo).
//
// GASTOS (P&L pág. 10 + Nota 22 "Overige bedrijfskosten", pág. 56):
//   Aankoop van materialen (compra de materiales/insumos)    -4.985 → other_expenses
//   "Overige bedrijfskosten" (-29.319 en el P&L) se PROMOVIÓ a 2 líneas de
//   primer nivel según la Nota 22 (mismo criterio de club-data-mapping SKILL.md
//   sección 1: sub-ítems con categoría real distinta se promueven, no se
//   entierran en `items`):
//     Organización/viajes/hoteles (Organisatie+Reiskosten+Hotels)  -13.693 → match_organisation_expense
//     Administración/alquiler/consulting/interim/impuestos        -15.625 → admin_general_expense
//     (suma 29.318 vs 29.319 impreso, redondeo de 1.000 EUR)
//   Lonen van spelers en kosten van technische staf (plantel+CT) -48.075 → wages_squad
//     (Nota 23 tiene un desglose de sub-ítems que NO reconcilia exacto contra
//     el total — diferencia de ~99.000 EUR, probablemente un dígito mal
//     transcripto en "Overige kosten" de la nota — se usa el total del P&L
//     principal, que es el dato auditado confiable, sin desglosar en `items`)
//   Overige personeelskosten (personal NO deportivo: administración,
//     backoffice — Nota 24)                                 -10.060 → admin_general_expense
//   Minderwaarde bij de overdracht van spelersregistratierechten
//     (pérdida por venta de pases por debajo del valor libro)  -9.024 → player_impairment
//   Afschrijvingen van spelersregistratierechten (amortización
//     lineal de pases)                                       -26.844 → player_amortisation
//   Afschrijvingen van overige immateriële/materiële activa   -3.293 → depreciation
//   Afschrijvingen van recht-op-gebruik activa (IFRS16,
//     depreciación de derechos de uso — leases)                -1.731 → depreciation
//   Overige niet-kaskosten (crédito no-efectivo, reversión)     +0.335 → exceptional_items
// Total: -132.995 vs -132.996 impreso (diferencia de 1.000 EUR, redondeo).
//
// RESULTADO FINANCIERO (netInterest): Financiële opbrengsten 3.082 -
// Financiële kosten 1.327 = 1.755 (= "Financieel resultaat" impreso exacto).
//
// TAX: Actuele belastingen -7.522 + Uitgestelde belastingen 0.631 = -6.891
// (= "Totaal inkomstenbelastingen" impreso exacto).
//
// TIE-OUT (verificado): 154.196 (revenue oficial) - 132.996 (expenses oficial)
// + 1.755 (netInterest) - 6.891 (tax) = 16.064, exacto igual a "Winst (verlies)
// voor de periode" impreso (16.064). Toerekenbaar 100% a los accionistas de
// Club Brugge NV (minderheidsbelangen = 0, no hay minoritarios).
//
// MONEDA: EUR. El documento no declara un tipo de cambio propio a USD (no aplica,
// es un club de la Eurozona) → fxRef a FX_CLOSE, que YA tenía 'EUR@2025-06-30'
// (0,8532) antes de esta carga.
//
// grossDebt: se usó Total langlopende verplichtingen (50.424) + Total
// kortlopende verplichtingen (49.635) - Voorzieningen (1.314, la única línea de
// tipo "previsión" del pasivo) = 98.745. Mismo criterio de exclusión que
// Köln/Boca (deuda financiera+comercial+leases+pases a pagar, EXCLUYENDO
// previsiones). cash: Geldmiddelen en kasequivalenten (21.401).
//
// Total activa = Total pasiva = 199.141 (balance cuadra).
//
// GESTIÓN: Voorzitter Raad van Bestuur = Bart Verhaeghe (accionista mayoritario
// y presidente desde 2012) — se usa como identificador de la gestión actual,
// sin fecha de inicio verificada con precisión para este ejercicio puntual.
// ============================================================================

const clubBruggeBeRevenueLinesByYear = {
  2025: [
    { rawLabel:'Wedstrijdopbrengsten', normalizedCategory:'matchday_competition', amountNative:27.588000, disclosureLevel:'detailed' },
    { rawLabel:'Opbrengsten uit mediarechten', normalizedCategory:'broadcasting', amountNative:74.117000, disclosureLevel:'detailed', items:[
      ['Binnenlands', 12.968], ['Europees', 61.149],
    ]},
    { rawLabel:'Commerciële opbrengsten', normalizedCategory:'sponsorship_commercial', amountNative:18.784000, disclosureLevel:'detailed' },
    { rawLabel:'Overige opbrengsten', normalizedCategory:'other_income', amountNative:1.778000, disclosureLevel:'aggregated' },
    { rawLabel:'Meerwaarde bij de overdracht van spelersregistratierechten', normalizedCategory:'player_sales', amountNative:31.658000, disclosureLevel:'detailed' },
    { rawLabel:'Overige bedrijfsopbrengsten', normalizedCategory:'other_income', amountNative:0.272000, disclosureLevel:'detailed', items:[
      ['Lidgeld', 0.044], ['Giften', 0.030], ['Overige', 0.198],
    ]},
  ],
};

const clubBruggeBeExpenseLinesByYear = {
  2025: [
    { rawLabel:'Aankoop van materialen, benodigdheden en overige verbruiksgoederen', normalizedCategory:'other_expenses', amountNative:-4.985000, disclosureLevel:'detailed' },
    { rawLabel:'Overige bedrijfskosten — organisatie, apparatuur, beveiliging, reizen, hotels', normalizedCategory:'match_organisation_expense', amountNative:-13.693000, disclosureLevel:'detailed', items:[
      ['Organisatie, apparatuur en beveiliging', 8.636], ['Reiskosten', 2.174], ['Hotels, restaurants en recepties', 2.883],
    ]},
    { rawLabel:'Overige bedrijfskosten — administratie, huur, nutsvoorzieningen, consulting, interim, belastingen', normalizedCategory:'admin_general_expense', amountNative:-15.625000, disclosureLevel:'detailed', items:[
      ['Algemene administratie', 6.749], ['Huur en andere diensten', 2.708], ['Nutsvoorzieningen, onderhoud en reparatie', 3.332],
      ['Consulting- en andere advieskosten', 1.115], ['Interim', 0.513], ['Overige belastingen', 1.208],
    ]},
    { rawLabel:'Lonen van spelers en kosten van technische staf', normalizedCategory:'wages_squad', amountNative:-48.075000, disclosureLevel:'aggregated' },
    { rawLabel:'Overige personeelskosten', normalizedCategory:'admin_general_expense', amountNative:-10.060000, disclosureLevel:'detailed', items:[
      ['Overige personeelskosten', 7.716], ['Op aandelen gebaseerde betalingen', 0.078], ['Socialezekerheidsbijdragen', 1.980],
      ['Toegezegde-pensioenregelingskosten', 0.305], ['Overige kosten', -0.019],
    ]},
    { rawLabel:'Minderwaarde bij de overdracht van spelersregistratierechten', normalizedCategory:'player_impairment', amountNative:-9.024000, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen en waardeverminderingen van spelersregistratierechten', normalizedCategory:'player_amortisation', amountNative:-26.844000, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen en waardeverminderingen van overige immateriële activa en materiële vaste activa', normalizedCategory:'depreciation', amountNative:-3.293000, disclosureLevel:'detailed' },
    { rawLabel:'Afschrijvingen en waardevermindering van een recht-op-gebruik activa', normalizedCategory:'depreciation', amountNative:-1.731000, disclosureLevel:'detailed' },
    { rawLabel:'Overige niet-kaskosten', normalizedCategory:'exceptional_items', amountNative:0.335000, disclosureLevel:'aggregated' },
  ],
};

const clubBruggeBeFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'clubbrugge-be-jaarrekening-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Financiële opbrengsten (3.082) - Financiële kosten (1.327).
    netInterest:1.755000,
    // Actuele belastingen (-7.522) + Uitgestelde belastingen (0.631).
    tax:-6.891000,
    profitOnPlayerSales:0, assetSales:0,
    // grossDebt = Total langlopende verplichtingen (50.424) + Total kortlopende verplichtingen
    // (49.635) - Voorzieningen (1.314). cash = Geldmiddelen en kasequivalenten.
    grossDebt:98.745000, cash:21.401000,
    officialTotalRevenue:154.196000, officialTotalExpenses:133.331000, /* excluye exceptional_items (+0.335 crédito), mismo criterio que Chelsea */ officialPAT:16.064000,
  },
};

const clubBruggeBePresupuestoOverlayByYear = {};

const clubBruggeBePasesData = [];
const clubBruggeBeResultadosData = {};
const clubBruggeBeTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['clubbrugge-be'] = {
  revenueLinesByYear: clubBruggeBeRevenueLinesByYear, expenseLinesByYear: clubBruggeBeExpenseLinesByYear,
  fiscalYearMeta: clubBruggeBeFiscalYearMeta, pasesData: clubBruggeBePasesData,
  resultadosData: clubBruggeBeResultadosData, titulosData: clubBruggeBeTitulosData,
  presupuestoOverlayByYear: clubBruggeBePresupuestoOverlayByYear,
};

Object.assign(sources, {
  'clubbrugge-be-jaarrekening-2025': {
    id:'clubbrugge-be-jaarrekening-2025', clubId:'clubbrugge-be',
    title:'Geconsolideerde jaarrekening van Club Brugge NV voor het boekjaar van 1/7/2024 tot 30/6/2025',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cuentas CONSOLIDADAS (grupo, IFRS), preferidas sobre la versión individual disponible para el mismo año. Depositado en la Balanscentrale de la Nationale Bank van België (NBB). PDF con capa de texto nativa. Transcripción completa en Clubes/Bélgica/Club Brugge/jaarrekening-2025-06-30-consolidado.md.',
  },
});

gestionesByClub['clubbrugge-be'] = {
  actual: { nombre:'Bart Verhaeghe (Voorzitter Raad van Bestuur)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['clubbrugge-be'] = null;
