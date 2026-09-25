// ============================================================================
// data/slavenbelupo-hr-data.js — Nogometni klub Slaven Belupo, Koprivnica (Croacia).
// clubId 'slavenbelupo-hr' (sufijo de país, misma convención que osijek-hr/
// dinamozagreb-hr/hajduksplit-hr/rijeka-hr).
//
// FUENTE: `Clubes/Croacia/Slaven Belupo/financijsko-izvjesce-2025.md` (transcripción
// completa, texto limpio y bien alineado — a diferencia de Osijek, este documento no
// necesitó re-verificación contra imágenes del PDF, las tablas del .md reconciliaron
// exacto contra sus propios subtotales impresos en la primera pasada). Estados
// financieros individuales (no combinados/consolidados, el club no tiene subsidiarias),
// auditados por RSM Croatia d.o.o., sin salvedades. Ejercicio fiscal = año CALENDARIO
// (1/1-31/12/2025). El Klub es una asociación deportiva sin fines de lucro ("neprofitna
// pravna osoba"), sin capital social propiamente dicho (nota 10).
//
// PRIHODI (ingresos) 2025, EUR exactos:
//   Prihodi od ulaznica (nota 11: "Nacionalno prvenstvo te godišnje ulaznice", entradas de
//     liga Y abonos anuales COMBINADOS sin separar) 303.770 → matchday_competition (no se
//     pudo separar la porción de abonos, ver duda en el reporte de carga).
//   Prihod od sponzorstva i oglašavanja (Glavni sponzor 1.210.000 + Ostali sponzori
//     609.373) → sponsorship_commercial, 1.819.373 combinado.
//   Prihodi od prava emitiranja - Nacionalna natjecanja 942.000 → broadcasting.
//   Komercijalni prihodi od članstva 41.777 → member_dues (rótulo ambiguo, "ingreso
//     comercial DE la membresía" — es la línea más cercana a una cuota social que tiene
//     este club, que no reporta ninguna "Članarine" separada como sí hacen Osijek/Dinamo
//     Zagreb; ver duda genuina en el reporte de carga).
//   UEFA klupska natjecanja (nota 14: "Prihodi od UEFE") 1.873.750 → competition_bonus.
//   Ostali poslovni prihodi (Donacije od nacionalnih nogometnih tijela 68.298 + Donacije/
//     dotacije države i lokalne samouprave 232.224 + Donacije nepovezanih strana 5.645 +
//     Ostali nerazvrstani 179.766) → other_income, 485.933 combinado.
//   Prihodi od raspolaganja registracijama igrača (nota 18, método prihoda i rashoda —
//     el club NO capitaliza/amortiza pases, los expensa al costo completo, igual que
//     Racing) 221.147 → player_sales, línea ordinaria SIN netear (mismo criterio que
//     Racing en club-data-mapping SKILL.md sección 3, distinto del neteo que sí se aplicó
//     a Dinamo Zagreb/Osijek porque esos clubes SÍ dan un desglose limpio de disposición).
//   Ukupno - Prihodi (impreso, verificado exacto): 5.466.603 (cuerpo principal, sin la
//     línea de registraciones) + 221.147 (registraciones) = 5.687.750 total cargado.
//
// RASHODI (gastos) 2025, EUR exactos:
//   Troškovi prodaje/materijala - Ukupno 574.354 → other_expenses.
//   Troškovi primanja igrača - ukupno (Plaće 2.345.051 + Ostali nerazvrstani 314.351) →
//     wages_squad, 2.659.402 combinado. (Este club NO separa "stručni stožer"/cuerpo
//     técnico como línea propia — a diferencia de Osijek/Dinamo, solo reporta "igrača"
//     vs. "ostalih zaposlenika"; el cuerpo técnico queda implícito en una de las dos.)
//   Trošak primanja ostalih zaposlenika - Ukupno (Plaće 923.111 + Porezi/doprinosi
//     293.454 + Ostali nerazvrstani 72.832) → admin_general_expense, 1.289.397.
//   Amortizacija nematerijalne imovine (bez registracija igrača) 43.876 →
//     other_amortisation.
//   Amortizacija materijalne ili ostale nematerijalne imovine 36.672 → depreciation.
//   Troškovi održavanja utakmica 127.641 → match_organisation_expense.
//   Troškovi imovine i objekta 235.711 → admin_general_expense.
//   Troškovi za ne-nogometne djelatnosti 566.675 → admin_general_expense (mismo criterio
//     que Osijek: "costos NO deportivos" es la definición de admin_general_expense).
//   Troškovi komercijalnih aktivnosti 113.975 → admin_general_expense. OJO: la Nota 17
//     ("Ostali poslovni rashodi") trae un desglose ALTERNATIVO del MISMO total 1.581.908
//     (Prehrana/Pripreme/Kazne igrača/Organizacija utakmica/Najamnine/Troškovi
//     komercijalnih aktivnosti 145.779/Troškovi za nenogometne djelatnosti 298.076/
//     Intelektualne usluge/Ostali), que usa un "Troškovi komercijalnih aktivnosti" DE
//     VALOR DISTINTO (145.779 vs. 113.975 en el cuerpo del Račun dobiti i gubitka) — son
//     dos vistas (por función vs. por naturaleza) del mismo subtotal 1.581.908, NO un
//     error de transcripción (los dos desgloses reconcilian exacto por separado). Se
//     usó el desglose del CUERPO del Račun dobiti i gubitka (con nombres de línea que sí
//     mapean a categorías reconocibles), no el de la Nota 17.
//   Izvanredni troškovi 0 (2025; 2024 sí tuvo 42.600) → no se carga línea (monto cero).
//   Ostali nerazvrstani poslovni rashodi 537.906 → other_expenses.
//   Ukupno - poslovni rashodi (bez registracija igrača) impreso: 6.185.609, suma de
//     líneas de arriba verificada EXACTA.
//   Troškovi za stjecanje registracija igrača (nota 18, costo BRUTO de adquisición de
//     pases, sin capitalizar) 101.836 → player_amortisation (mismo criterio que "Costo
//     Transferencia de Jugadores" de Racing: el club expensa el costo completo, no
//     amortiza, así que esta es la aproximación más fiel al bucket "Compra de
//     jugadores"). Troškovi agenata/posrednika 140.345 → other_expenses (mismo criterio
//     que Racing: comisiones de compraventa NO entran al bucket player_amortisation,
//     porque Boca tampoco las separa ahí — club-data-mapping SKILL.md sección 13).
//   Ukupno cargado (bez registracija + registracija): 6.185.609 + 101.836 + 140.345 =
//     6.427.790.
//
// RESULTADO FINANCIERO (netInterest): Financijski prihodi 715 - Financijski rashodi
//   48.722 = -48.007 (impreso exacto: "Ukupni neto prihod/rashod od financiranja").
// tax: Porezni prihod/rashod — no impreso ningún valor para 2025 (fila vacía en el
//   Račun dobiti i gubitka, a diferencia de 2024 que tampoco muestra valor) → tax:0.
//
// TIE-OUT FINAL (verificado exacto): revenue 5.687.750 - expenses 6.427.790 +
//   netInterest -48.007 + tax 0 = -788.047 = Dobit/(gubitak) razdoblja impreso EXACTO
//   (mostrado como "(788.047)").
//
// MONEDA: EUR. El documento no declara tipo de cambio propio — fxRef a FX_CLOSE
// 'EUR@2025-12-31' (fx=0.8511, cierre BCE 31/12/2025, 1 EUR = 1,1750 USD — ENTRADA
// NUEVA, todavía no existe en data/currency-map.js, ver reporte de carga; la misma
// entrada la usa también osijek-hr, mismo ejercicio).
//
// grossDebt: Obveze za revolving kredit - POBA (nota 8, la única línea de deuda
// financiera real dentro de "Kratkoročne obveze"; el resto —dobavljači, zaposlenici,
// porezi, ostale— son pasivos operativos, no deuda) = 1.179.036. No hay deuda de largo
// plazo (el club no reporta "Dugoročne obveze" en su bilanca). cash: Novac i novčani
// ekvivalenti (Žiro računi) = 26.003.
//
// GESTIÓN: Uprava listada (Robert Markulin, presidente, + 6 vicepresidentes + 6
// miembros) sin fecha de asunción declarada en el documento — no se puede confirmar con
// certeza que cubrió TODO el ejercicio 2025. gestionId: null, sin entrada en
// gestionesByClub (ya no es obligatorio, ver club-or-year-onboarding SKILL.md
// sección 16).
// ============================================================================

const slavenbelupoHrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Prihodi od ulaznica (Nacionalno prvenstvo te godišnje ulaznice, combinados)', normalizedCategory:'matchday_competition', amountNative:0.303770, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja — Glavni sponzor + Ostali sponzori', normalizedCategory:'sponsorship_commercial', amountNative:1.819373, disclosureLevel:'detailed', items:[
      ['Glavni sponzor', 1.210000], ['Ostali sponzori', 0.609373],
    ]},
    { rawLabel:'Prihodi od prava emitiranja - Nacionalna natjecanja', normalizedCategory:'broadcasting', amountNative:0.942000, disclosureLevel:'detailed' },
    { rawLabel:'Komercijalni prihodi od članstva', normalizedCategory:'member_dues', amountNative:0.041777, disclosureLevel:'detailed' },
    { rawLabel:'UEFA klupska natjecanja (Prihodi od UEFE)', normalizedCategory:'competition_bonus', amountNative:1.873750, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi — donacije', normalizedCategory:'other_income', amountNative:0.485933, disclosureLevel:'detailed', items:[
      ['Donacije od nacionalnih nogometnih tijela', 0.068298], ['Donacije i dotacije od države i lokalne samouprave', 0.232224],
      ['Donacije - ostale', 0.005645], ['Ostali poslovni prihodi', 0.179766],
    ]},
    { rawLabel:'Prihodi od raspolaganja registracijama igrača', normalizedCategory:'player_sales', amountNative:0.221147, disclosureLevel:'detailed' },
  ],
};

const slavenbelupoHrExpenseLinesByYear = {
  2025: [
    { rawLabel:'Troškovi prodaje/materijala - Ukupno', normalizedCategory:'other_expenses', amountNative:-0.574354, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi primanja igrača - ukupno', normalizedCategory:'wages_squad', amountNative:-2.659402, disclosureLevel:'detailed', items:[
      ['Plaće igrača', -2.345051], ['Ostali nerazvrstani troškovi primanja igrača', -0.314351],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika - Ukupno', normalizedCategory:'admin_general_expense', amountNative:-1.289397, disclosureLevel:'detailed', items:[
      ['Plaće ostalih zaposlenika', -0.923111], ['Porezi i doprinosi - ostali zaposlenici', -0.293454],
      ['Ostali nerazvrstani troškovi za primanja ostalih zaposlenika', -0.072832],
    ]},
    { rawLabel:'Amortizacija nematerijalne imovine (bez registracija igrača)', normalizedCategory:'other_amortisation', amountNative:-0.043876, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija materijalne ili ostale nematerijalne imovine', normalizedCategory:'depreciation', amountNative:-0.036672, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi održavanja utakmica', normalizedCategory:'match_organisation_expense', amountNative:-0.127641, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi imovine i objekta', normalizedCategory:'admin_general_expense', amountNative:-0.235711, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi za ne-nogometne djelatnosti', normalizedCategory:'admin_general_expense', amountNative:-0.566675, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi komercijalnih aktivnosti', normalizedCategory:'admin_general_expense', amountNative:-0.113975, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-0.537906, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi za stjecanje registracija igrača', normalizedCategory:'player_amortisation', amountNative:-0.101836, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi agenata / posrednika', normalizedCategory:'other_expenses', amountNative:-0.140345, disclosureLevel:'detailed' },
  ],
};

const slavenbelupoHrFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'slavenbelupo-hr-financijsko-izvjesce-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, // ya capturado íntegro en player_sales/player_amortisation, ver comentario de cabecera
    assetSales:0,
    // Financijski prihodi(715) - Financijski rashodi(48.722).
    netInterest:-0.048007,
    tax:0,
    // grossDebt = Obveze za revolving kredit - POBA (Nota 8). cash = Žiro računi (Nota 3).
    grossDebt:1.179036, cash:0.026003,
    officialTotalRevenue:5.687750, officialTotalExpenses:6.427790, officialPAT:-0.788047,
  },
};

const slavenbelupoHrPresupuestoOverlayByYear = {};

const slavenbelupoHrPasesData = [];
const slavenbelupoHrResultadosData = {};
const slavenbelupoHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['slavenbelupo-hr'] = {
  revenueLinesByYear: slavenbelupoHrRevenueLinesByYear, expenseLinesByYear: slavenbelupoHrExpenseLinesByYear,
  fiscalYearMeta: slavenbelupoHrFiscalYearMeta, pasesData: slavenbelupoHrPasesData,
  resultadosData: slavenbelupoHrResultadosData, titulosData: slavenbelupoHrTitulosData,
  presupuestoOverlayByYear: slavenbelupoHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'slavenbelupo-hr-financijsko-izvjesce-2025': {
    id:'slavenbelupo-hr-financijsko-izvjesce-2025', clubId:'slavenbelupo-hr',
    title:'NK Slaven Belupo, Koprivnica — Godišnji financijski izvještaji za 2025. godinu',
    type:'official_balance_sheet', reliability:'primary',
    note:'Balance auditado individual (el club no tiene subsidiarias), preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova (HNS, 11/2025). Auditor: RSM Croatia d.o.o., sin salvedades. Transcripción completa en Clubes/Croacia/Slaven Belupo/financijsko-izvjesce-2025.md.',
  },
});

memberCountByClub['slavenbelupo-hr'] = null;
