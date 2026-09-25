// ============================================================================
// data/varazdin-hr-data.js — Nogometni klub Varaždin sportsko dioničko društvo za
// obavljanje sportskih djelatnosti (Varaždin, Croacia), clubId 'varazdin-hr'.
// Ejercicio fiscal = año CALENDARIO (1/1-31/12/2025).
//
// Club chico, ÚNICO ejercicio disponible en `Clubes/Croacia/Varaždin/`: durante 2025
// el club se transformó de asociación deportiva ("športska udruga") a sociedad
// anónima deportiva ("sportsko dioničko društvo"), completado el 2/4/2025 — por eso
// los primeros 4 meses del ejercicio se llevaron bajo normas de contabilidad de
// entidades sin fines de lucro y el resto bajo el régimen de sociedades.
//
// FUENTES (2 documentos, mismo ejercicio): `financijsko-izvjesce-2025.md` (estados
// financieros) y `revizorsko-izvjesce-2025.md` (informe de auditoría — reemplaza una
// versión anterior fechada 27/3/2026, "Ostala pitanja" del informe: se ampliaron
// ciertas notas tras la emisión original, sin cambio de cifras). Los dos documentos
// contienen la MISMA Resultatopgørelse/Bilanca, con texto nativo limpio (PR-1 a PR-7,
// RA-1 a RA-7, cada subtotal reconcilia exacto contra la suma de sus líneas — sin
// necesidad de OCR ni de pdftotext -layout, el .md ya venía bien alineado). Opinión
// del auditor SIN salvedades ni párrafo de énfasis.
//
// INGRESOS (Račun dobiti i gubitka, 2025, EUR):
//   PR-1 (555.155): Nacionalna natjecanja (507.364) + UEFA klupska natjecanja
//     (27.838) → matchday_competition, 535.202; Godišnje ulaznice (19.953) →
//     season_tickets (Članarine y Ostali en 0).
//   PR-2 (1.353.004): Proizvođač opreme (299.925) + Glavni sponzor (275.360) +
//     Reklamni panoi oko terena (777.719) → sponsorship_commercial.
//   PR-3 (1.016.900): Nacionalna natjecanja → broadcasting.
//   PR-4 (106.646): Prodaja proizvoda (41.493) + Korištenje objekata (65.153) →
//     sponsorship_commercial (mismo criterio que istra-hr/osijek-hr para
//     "Komercijalni prihodi").
//   PR-5 (1.488.194): Uefina klupska natjecanja - solidarne uplate → competition_bonus.
//   PR-6 (615.367): Donacije nacionalnih nogometnih tijela (45.000) + Donacije
//     države/lokalne samouprave (350.721) + Donacije nepovezanih strana (2.374) +
//     Ostali nerazvrstani poslovni prihodi (217.272) → other_income.
//   UKUPNO PRIHODI (impreso, verificado exacto): 5.135.266.
//
// GASTOS:
//   admin_general_expense = RA-1 Troškovi prodaje/materijala (-167.793, costo de
//     mercadería) + RA-2c Trošak primanja ostalih zaposlenika (-1.022.702) + Troškovi
//     sponzorstva i oglašavanja (-89.866) + Troškovi imovine i objekata (-378.705) =
//     -1.659.066.
//   wages_squad = RA-2a Troškovi primanja igrača (-2.375.838) + RA-2b Troškovi
//     primanja stručnog stožera (-653.761) = -3.029.599.
//   depreciation = RA-3 Umanjenje vrijednosti/amortizacija (-147.343).
//   match_organisation_expense = Troškovi održavanja utakmica (-976.424, dentro de
//     RA-4).
//   other_expenses = Ostali nerazvrstani poslovni rashodi (-48.032, dentro de RA-4).
//   UKUPNO POSLOVNI RASHODI (BEZ REGISTRACIJE IGRAČA) impreso: -5.860.464, suma de
//     líneas de arriba EXACTA.
//
// TRANSFERENCIAS DE JUGADORES: Troškovi za stjecanje registracija igrača RA-5
//   (-253.899) + Prihodi od raspolaganja registracijama igrača PR-6[bis] (2.707.554) +
//   Nekapitalizirani troškovi za naknade agentima/posrednicima RA-6 (-349.203) = Neto
//   rezultat 2.104.452 (impreso exacto) → profitOnPlayerSales. OJO: el código "PR-6"
//   se reutiliza en el documento para dos líneas distintas (Ostali poslovni prihodi
//   arriba, y Prihodi od raspolaganja registracijama acá) — no es error de
//   transcripción, así lo numera el propio documento.
//
// RESULTADO FINANCIERO Y NO OPERATIVO: Dobit/(gubitak) od raspolaganja dugotrajnom
//   imovinom = 0. Financijski prihodi PR-7 (5.573) - Financijski rashodi RA-7
//   (-19.059) - Neto tečajne razlike (0) = Ukupno neto prihodi/rashodi od financiranja
//   (-13.486, impreso exacto) → netInterest. Ostali neposlovni prihodi/rashodi = 0 (a
//   diferencia de istra-hr, acá SÍ da 0, no hace falta ningún campo repurposed).
//   Porezni prihodi/(rashodi) PD = -160.177 → tax.
//
// TIE-OUT FINAL (verificado exacto): revenue 5.135.266 - expenses 5.860.464 +
//   profitOnPlayerSales 2.104.452 + assetSales 0 + netInterest (13.486) + tax
//   (160.177) = 1.205.591 = Dobit (gubitak) poslije oporezivanja DG-1 impreso, EXACTO
//   (coincide también con "Dobit I-XII 2025. godine" del Izvještaj o promjenama
//   kapitala).
//
// MONEDA: EUR. Sin Anexo de moneda extranjera propio → fxRef 'EUR@2025-12-31' (ya
// existía en data/currency-map.js).
//
// grossDebt: 0 (Zajmovi P-1 y Bankovni i drugi zajmovi en 0 al cierre 2025 — el club
//   se capitalizó vía "Uplata novca u s.d.d." de 1.975.000 EUR en el Izvještaj o
//   promjenama kapitala, no vía deuda). cash: Novac i novčani ekvivalenti = 2.079.826.
//
// GESTIÓN: Dražen Vitez (predsjednik Uprave) y Toni Dalić (član Uprave) firman los
// estados y son los representantes legales desde la transformación en sociedad
// (2/4/2025) — pero, igual que istra-hr, no hay concepto de "gestión" asociativa acá
// (sociedad anónima deportiva) → gestionId: null, sin entrada en gestionesByClub.
// ============================================================================

const varazdinHrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Prihodi od ulaznica (Nacionalna natjecanja + UEFA klupska natjecanja)', normalizedCategory:'matchday_competition', amountNative:0.535202, disclosureLevel:'detailed', items:[
      ['Prihodi od ulaznica - Nacionalna natjecanja', 0.507364], ['Prihodi od ulaznica - UEFA klupska natjecanja', 0.027838],
    ]},
    { rawLabel:'Prihodi od ulaznica - Godišnje ulaznice', normalizedCategory:'season_tickets', amountNative:0.019953, disclosureLevel:'detailed' },
    { rawLabel:'UKUPNO PRIHODI OD SPONZORSTVA I OGLAŠAVANJA', normalizedCategory:'sponsorship_commercial', amountNative:1.353004, disclosureLevel:'detailed', items:[
      ['Proizvođač opreme', 0.299925], ['Glavni sponzor', 0.275360], ['Reklamni panoi oko terena', 0.777719],
    ]},
    { rawLabel:'UKUPNO PRIHODI OD PRAVA EMITIRANJA - Nacionalna natjecanja', normalizedCategory:'broadcasting', amountNative:1.016900, disclosureLevel:'detailed' },
    { rawLabel:'UKUPNO KOMERCIJALNI PRIHODI', normalizedCategory:'sponsorship_commercial', amountNative:0.106646, disclosureLevel:'detailed', items:[
      ['Prodaja proizvoda', 0.041493], ['Korištenje objekata', 0.065153],
    ]},
    { rawLabel:'Uefina klupska natjecanja - solidarne uplate', normalizedCategory:'competition_bonus', amountNative:1.488194, disclosureLevel:'detailed' },
    { rawLabel:'UKUPNO OSTALI POSLOVNI PRIHODI', normalizedCategory:'other_income', amountNative:0.615367, disclosureLevel:'detailed', items:[
      ['Donacije i dotacije od nacionalnih nogometnih tijela', 0.045000], ['Donacije i dotacije od države i lokalne samouprave', 0.350721],
      ['Donacije nepovezanih strana', 0.002374], ['Ostali nerazvrstani poslovni prihodi', 0.217272],
    ]},
  ],
};

const varazdinHrExpenseLinesByYear = {
  2025: [
    { rawLabel:'Troškovi prodaje/materijala + Trošak primanja ostalih zaposlenika + Troškovi sponzorstva + Troškovi imovine i objekata', normalizedCategory:'admin_general_expense', amountNative:-1.659066, disclosureLevel:'detailed', items:[
      ['UKUPNO TROŠKOVI PRODAJE / MATERIJALA', -0.167793], ['UKUPNO TROŠKOVI PRIMANJA OSTALIH ZAPOSLENIKA', -1.022702],
      ['Troškovi sponzorstva i oglašavanja', -0.089866], ['Troškovi imovine i objekata', -0.378705],
    ]},
    { rawLabel:'Troškovi primanja igrača + Troškovi primanja stručnog stožera', normalizedCategory:'wages_squad', amountNative:-3.029599, disclosureLevel:'detailed', items:[
      ['UKUPNO TROŠKOVI PRIMANJA IGRAČA', -2.375838], ['UKUPNO TROŠKOVI PRIMANJA STRUČNOG STOŽERA', -0.653761],
    ]},
    { rawLabel:'UKUPNO UMANJENJE VRIJEDNOSTI I AMORTIZACIJA', normalizedCategory:'depreciation', amountNative:-0.147343, disclosureLevel:'aggregated' },
    { rawLabel:'Troškovi održavanja utakmica', normalizedCategory:'match_organisation_expense', amountNative:-0.976424, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-0.048032, disclosureLevel:'detailed' },
  ],
};

const varazdinHrFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'varazdin-hr-financijsko-izvjesce-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    // Troškovi za stjecanje registracija RA-5(-0.253899) + Prihodi od raspolaganja(2.707554)
    // + Nekapitalizirani troškovi RA-6(-0.349203) = 2.104452 (impreso "Neto rezultat").
    profitOnPlayerSales:2.104452,
    assetSales:0,
    // Financijski prihodi PR-7(0.005573) - Financijski rashodi RA-7(-0.019059).
    netInterest:-0.013486,
    // POREZNI PRIHODI (RASHODI) PD.
    tax:-0.160177,
    grossDebt:0, cash:2.079826,
    officialTotalRevenue:5.135266, officialTotalExpenses:5.860464, officialPAT:1.205591,
  },
};

const varazdinHrPresupuestoOverlayByYear = {};

const varazdinHrPasesData = [];
const varazdinHrResultadosData = {};
const varazdinHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['varazdin-hr'] = {
  revenueLinesByYear: varazdinHrRevenueLinesByYear, expenseLinesByYear: varazdinHrExpenseLinesByYear,
  fiscalYearMeta: varazdinHrFiscalYearMeta, pasesData: varazdinHrPasesData,
  resultadosData: varazdinHrResultadosData, titulosData: varazdinHrTitulosData,
  presupuestoOverlayByYear: varazdinHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'varazdin-hr-financijsko-izvjesce-2025': {
    id:'varazdin-hr-financijsko-izvjesce-2025', clubId:'varazdin-hr',
    title:'Financijski izvještaj Nogometnog kluba Varaždin s.d.d. za 2025. godinu, s revizijskim izvješćem',
    type:'official_balance_sheet', reliability:'primary',
    note:'Único ejercicio disponible para este club. Durante 2025 el club se transformó de asociación deportiva ("športska udruga") a sociedad anónima deportiva ("sportsko dioničko društvo", completado 2/4/2025). Auditor: DTTC Consulting i revizija d.o.o. Varaždin, opinión SIN salvedades. El informe de auditoría reemplaza una versión anterior del 27/3/2026 (se ampliaron notas, mismas cifras). PDF con capa de texto nativa, sin necesidad de OCR. Transcripción completa en Clubes/Croacia/Varaždin/financijsko-izvjesce-2025.md (y revizorsko-izvjesce-2025.md, mismo contenido financiero + informe de auditoría).',
  },
});

memberCountByClub['varazdin-hr'] = null;
