// ============================================================================
// data/osijek-hr-data.js — Nogometni klub Osijek, sportsko dioničko društvo (Osijek,
// Croacia). clubId 'osijek-hr' (sufijo de país, misma convención que dinamozagreb-hr/
// hajduksplit-hr/rijeka-hr).
//
// FUENTE: `Clubes/Croacia/Osijek/financijsko-izvjesce-2025.md` (transcripción OCR del
// PDF — el PDF es un escaneo SIN capa de texto, `pdftotext`/`pdffonts` confirmaron 0
// fuentes embebidas; la transcripción es OCR, no `pdftotext`). Es el informe COMBINADO
// ("Revidirani godišnji kombinirani financijski izvještaji za posebne namjene") que
// integra NK Osijek s.d.d. (la sociedad) con FM 20 d.o.o. (20% del estadio Opus Arena) y
// Škola nogometa NK Osijek (50% del estadio, la escuela de fútbol). Auditor: Werkmann
// d.o.o., sin salvedades. Ejercicio fiscal = año CALENDARIO (1/1-31/12/2025).
//
// OJO — LA TRANSCRIPCIÓN .md TIENE LAS TABLAS DE GASTOS Y BALANCE DESALINEADAS (el OCR
// separó la columna de labels de la columna de números en bloques distintos, perdiendo
// el orden fila-a-fila). Se re-verificó CADA número de este archivo contra imágenes
// renderizadas directamente del PDF (`pdftoppm -r 300`, páginas 7 a 11) antes de cargar
// nada — no se confió en el orden de líneas del .md para la tabla de Rashodi (pág. 8 del
// documento) ni para la Bilanca (pág. 9-10). La tabla de Prihodi (pág. 7) y las notas 3-9
// sí estaban bien alineadas en el .md y se usaron tal cual.
//
// PRIHODI (ingresos) 2025, EUR exactos:
//   Prihodi od ulaznica - Nacionalna natjecanja 1.134.206 (UEFA=0) → matchday_competition.
//   Prihodi od ulaznica - Godišnje ulaznice 3.667 → season_tickets.
//   Prihodi od ulaznica - Članarine 32.818 → member_dues.
//   Prihod od sponzorstva i oglašavanja (Glavni sponzor na opremi 8.756.000 + Sponzor za
//     stadion 348.688) → sponsorship_commercial, 9.104.688 combinado.
//   Prihodi od prava emitiranja - Nacionalna natjecanja 855.600 → broadcasting.
//   Komercijalni prihodi (Prodaja proizvoda 459.111 + Ostali nerazvrstani 743.893) →
//     sponsorship_commercial, 1.203.004 combinado (mismo criterio que Dinamo Zagreb).
//   Uefina klupska natjecanja - solidarne uplate 1.982.354 → competition_bonus (sin
//     participación europea este ejercicio, solo pagos de solidaridad/no-participación).
//   Ostali poslovni prihodi (Donacije nepovezanih strana 3.349.012 + Donacije/doprinosi
//     povezanih strana 102.782 + Izvanredni prihodi 83.374 + Ostali nerazvrstani 958.516,
//     este último desglosado en Nota 3: Bjelica nagodba 618.518 + Donacije 168.000 +
//     Ostali 171.998) → other_income, 4.493.684 combinado.
//   Ukupno - Prihodi (impreso, verificado exacto contra imagen del PDF pág. 7): 18.810.021.
//
// RASHODI (gastos) 2025, verificados fila por fila contra la imagen renderizada de la
// pág. 8 del PDF (el orden real es: Troškovi prodaje materijala=0 ambos años; Plaće
// igrača 5.184.527 + Ostali 361.003 = Troškovi primanja igrača 5.545.530; Plaće
// stručnog stožera 474.538; Plaće ostalih zaposlenika 3.032.037 + Porezi/doprinosi
// 1.678.020 + Ostali 158.601 = Trošak primanja ostalih zaposlenika 4.868.658;
// Amortizacija dugotrajne materijalne imovine 1.145.578 (amortizacija nematerijalne
// bez registracija = 0); Trošak imovine s pravom korištenja = 0 (2025); Troškovi
// održavanja utakmica 1.085.017; Troškovi sponzorstva i oglašavanja 288.719; Troškovi
// komercijalnih aktivnosti 1.190.487; Troškovi imovine i objekata 356.640; Troškovi za
// nenogometne djelatnosti 1.769.335; Ostali nerazvrstani poslovni rashodi 2.264.797
// (desglosado en Nota 4). Ukupno - poslovni rashodi (bez registracija) impreso:
// 18.989.299, suma de líneas de arriba verificada EXACTA.
//   wages_squad = Troškovi primanja igrača + stručnog stožera = 6.020.068 (mismo criterio
//     que dinamozagreb-hr: plantel + cuerpo técnico combinados).
//   admin_general_expense = Trošak primanja ostalih zaposlenika (4.868.658, resto del
//     personal no futbolístico) + Troškovi sponzorstva i oglašavanja (288.719) +
//     Troškovi komercijalnih aktivnosti (1.190.487) + Troškovi imovine i objekata
//     (356.640) + Troškovi za nenogometne djelatnosti (1.769.335) = 8.473.839 combinado.
//     "Troškovi za nenogometne djelatnosti" (costos de actividades NO futbolísticas,
//     probablemente ligadas a FM 20 d.o.o./el estadio) se mapeó acá por descarte —
//     ninguna categoría específica encaja mejor y "costos NO deportivos" es exactamente
//     la definición de admin_general_expense — ver duda en el reporte de carga.
//   depreciation = Amortizacija dugotrajne materijalne imovine = 1.145.578 (la intangible
//     sin registraciones fue 0 este año, no hay other_amortisation que cargar).
//   match_organisation_expense = Troškovi održavanja utakmica = 1.085.017.
//   other_expenses = Ostali nerazvrstani poslovni rashodi = 2.264.797 (Nota 4: Troškovi
//     dugoročnog rezerviranja sudskih sporova 1.168.733 + Članarine udrugama 118.519 +
//     Darovanja 94.283 + Ugostiteljski troškovi 276.373 + Prostojbe HNS 52.835 +
//     Troškovi platnog prometa 52.742 + Ostalo 501.312).
//
// SECCIÓN DE TRANSFERENCIAS DE JUGADORES (pág. 9 del PDF, "Ispunjava samo izvještajni
// subjekt koji primjenjuje metodu kapitalizacije i amortizacije registracija igrača"):
// Osijek NO amortiza pases este ejercicio (la fila de amortización queda en blanco, a
// diferencia de Dinamo Zagreb que sí capitaliza/amortiza) — solo reporta resultado de
// DISPOSICIÓN: Dobit od raspolaganja +1.517.889, Gubitak od raspolaganja -1.381.230,
// Nekapitalizirani troškovi za naknade agentima/posrednicima -471.793. Netos en
// `fiscalYearMeta.profitOnPlayerSales` = 1.517.889-1.381.230-0.471.793 = -0.335.134 (un
// resultado NEGATIVO, mismo criterio que Dinamo Zagreb: el documento no da un ingreso
// bruto de venta separado del costo, así que no hay línea limpia que promover).
//
// RESULTADO FINANCIERO (netInterest): Financijski prihodi 357 - Financijski rashodi
//   403.712 = -403.355 (impreso exacto: "Ukupno neto prihod/rashod od financiranja").
// tax: Porezni prihod/(rashod) = 0 este ejercicio (2024 sí tuvo -40.754).
//
// TIE-OUT FINAL (verificado exacto contra pág. 9 del PDF): revenue 18.810.021 - expenses
//   18.989.299 + profitOnPlayerSales -335.134 + netInterest -403.355 + tax 0 = -917.767 =
//   Dobit/(gubitak) poslije oporezivanja impreso EXACTO (mostrado como "(917.767)").
//
// MONEDA: EUR. El documento no declara tipo de cambio propio (no hay Anexo de moneda
// extranjera) — fxRef a FX_CLOSE 'EUR@2025-12-31' (fx=0.8511, cierre BCE 31/12/2025,
// 1 EUR = 1,1750 USD — ENTRADA NUEVA, todavía no existe en data/currency-map.js, ver
// reporte de carga). La misma entrada la usa también slavenbelupo-hr (mismo ejercicio).
//
// grossDebt: Bankovni i drugi zajmovi, corriente 0 (2025) + no corriente 11.470.126
//   (Nota 9) = 11.470.126. cash: Novac i novčani ekvivalenti = 1.585.818. Ambos
//   verificados contra la imagen del PDF (pág. 9-10), NO contra el orden del .md.
//
// GESTIÓN: la Uprava vigente al firmar (Alexandra Vegh, desde 20.02.2026) asumió DESPUÉS
// del cierre del ejercicio 2025 — no hay Uprava identificable con certeza para todo el
// ejercicio 2025 en el documento (solo se lista el Nadzorni odbor, vigente desde
// 19.07.2024). gestionId: null, sin entrada en gestionesByClub (ya no es obligatorio,
// ver club-or-year-onboarding SKILL.md sección 16).
// ============================================================================

const osijekHrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Prihodi od ulaznica - Nacionalna natjecanja', normalizedCategory:'matchday_competition', amountNative:1.134206, disclosureLevel:'detailed' },
    { rawLabel:'Prihodi od ulaznica - Godišnje ulaznice', normalizedCategory:'season_tickets', amountNative:0.003667, disclosureLevel:'detailed' },
    { rawLabel:'Prihodi od ulaznica - Članarine', normalizedCategory:'member_dues', amountNative:0.032818, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja — Glavni sponzor na opremi + Sponzor za stadion', normalizedCategory:'sponsorship_commercial', amountNative:9.104688, disclosureLevel:'detailed', items:[
      ['Glavni sponzor na opremi', 8.756000], ['Sponzor za stadion', 0.348688],
    ]},
    { rawLabel:'Prihodi od prava emitiranja - Nacionalna natjecanja', normalizedCategory:'broadcasting', amountNative:0.855600, disclosureLevel:'detailed' },
    { rawLabel:'Komercijalni prihodi — Prodaja proizvoda + Ostali nerazvrstani', normalizedCategory:'sponsorship_commercial', amountNative:1.203004, disclosureLevel:'detailed', items:[
      ['Komercijalni prihodi - Prodaja proizvoda', 0.459111], ['Ostali nerazvrstani komercijalni prihodi', 0.743893],
    ]},
    { rawLabel:'Uefina klupska natjecanja - solidarne uplate', normalizedCategory:'competition_bonus', amountNative:1.982354, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi — donacije i izvanredni prihodi', normalizedCategory:'other_income', amountNative:4.493684, disclosureLevel:'detailed', items:[
      ['Donacije nepovezanih strana', 3.349012], ['Donacije i doprinosi povezanih strana', 0.102782],
      ['Izvanredni prihodi', 0.083374],
      ['Ostali nerazvrstani poslovni prihodi (Bjelica nagodba 0,618518 + Donacije 0,168000 + Ostali 0,171998)', 0.958516],
    ]},
  ],
};

const osijekHrExpenseLinesByYear = {
  2025: [
    { rawLabel:'Troškovi primanja igrača + Troškovi primanja stručnog stožera', normalizedCategory:'wages_squad', amountNative:-6.020068, disclosureLevel:'detailed', items:[
      ['Troškovi primanja igrača (Plaće 5,184527 + Ostali nerazvrstani 0,361003)', -5.545530],
      ['Troškovi primanja stručnog stožera (Plaće)', -0.474538],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika + Troškovi sponzorstva/komercijalnih aktivnosti/imovine i objekata/nenogometnih djelatnosti', normalizedCategory:'admin_general_expense', amountNative:-8.473839, disclosureLevel:'detailed', items:[
      ['Trošak primanja ostalih zaposlenika (Plaće 3,032037 + Porezi i doprinosi 1,678020 + Ostali 0,158601)', -4.868658],
      ['Troškovi sponzorstva i oglašavanja', -0.288719],
      ['Troškovi komercijalnih aktivnosti', -1.190487],
      ['Troškovi imovine i objekata', -0.356640],
      ['Troškovi za nenogometne djelatnosti', -1.769335],
    ]},
    { rawLabel:'Amortizacija dugotrajne materijalne imovine', normalizedCategory:'depreciation', amountNative:-1.145578, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi održavanja utakmica', normalizedCategory:'match_organisation_expense', amountNative:-1.085017, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-2.264797, disclosureLevel:'detailed', items:[
      ['Troškovi dugoročnog rezerviranja sudskih sporova', -1.168733], ['Članarine udrugama (HNS, ŽNS..)', -0.118519],
      ['Darovanja', -0.094283], ['Ugostiteljski troškovi', -0.276373],
      ['Prostojbe HNS (Odluke)', -0.052835], ['Troškovi platnog prometa', -0.052742], ['Ostalo', -0.501312],
    ]},
  ],
};

const osijekHrFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'osijek-hr-financijsko-izvjesce-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    // Dobit od raspolaganja dugotrajnom nematerijalnom imovinom (1.517.889) - Gubitak od
    // raspolaganja (1.381.230) - Nekapitalizirani troškovi za naknade agentima (471.793).
    // Osijek no amortiza pases este ejercicio (no capitaliza), ver comentario de cabecera.
    profitOnPlayerSales:-0.335134,
    assetSales:0,
    // Financijski prihodi(357) - Financijski rashodi(403.712).
    netInterest:-0.403355,
    tax:0,
    // grossDebt = Bankovni i drugi zajmovi (corriente 0 + no corriente 11.470.126, Nota 9).
    grossDebt:11.470126, cash:1.585818,
    officialTotalRevenue:18.810021, officialTotalExpenses:18.989299, officialPAT:-0.917767,
  },
};

const osijekHrPresupuestoOverlayByYear = {};

const osijekHrPasesData = [];
const osijekHrResultadosData = {};
const osijekHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['osijek-hr'] = {
  revenueLinesByYear: osijekHrRevenueLinesByYear, expenseLinesByYear: osijekHrExpenseLinesByYear,
  fiscalYearMeta: osijekHrFiscalYearMeta, pasesData: osijekHrPasesData,
  resultadosData: osijekHrResultadosData, titulosData: osijekHrTitulosData,
  presupuestoOverlayByYear: osijekHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'osijek-hr-financijsko-izvjesce-2025': {
    id:'osijek-hr-financijsko-izvjesce-2025', clubId:'osijek-hr',
    title:'Revidirani godišnji kombinirani financijski izvještaji za posebne namjene za 2025. godinu',
    type:'official_balance_sheet', reliability:'primary',
    note:'Balance auditado COMBINADO (NK Osijek s.d.d. + FM 20 d.o.o. + Škola nogometa NK Osijek, coproprietarios del estadio Opus Arena), preparado según el Pravilnik o licenciranju klubova de la HNS (11/2025). Auditor: Werkmann d.o.o., sin salvedades. El PDF es un escaneo sin capa de texto (transcripción OCR); las tablas de Rashodi y Bilanca del .md quedaron desalineadas por el OCR y se re-verificaron número por número contra imágenes del PDF antes de cargar. Transcripción completa en Clubes/Croacia/Osijek/financijsko-izvjesce-2025.md.',
  },
});

memberCountByClub['osijek-hr'] = null;
