// ============================================================================
// data/rijeka-hr-data.js — HRVATSKI NOGOMETNI KLUB RIJEKA sportsko dioničko
// društvo (Rijeka, Croacia). Tercer club croata cargado en esta sesión de
// onboarding de Croacia como país nuevo. clubId 'rijeka-hr' (sufijo de país,
// convención desde la Versión 129).
//
// FUENTE ELEGIDA: `Clubes/Croacia/Rijeka/financijsko-izvjesce-2024-kombinirani.md`
// (el informe COMBINADO), NO `financijsko-izvjesce-2024.md` (el INDIVIDUAL).
// Investigado antes de decidir: el "kombinirani" consolida HNK Rijeka s.d.d.
// con Stadion Kantrida d.o.o. — la sociedad que ADMINISTRA EL ESTADIO Y VENDE
// LAS ENTRADAS — exigido desde el Pravilnik o licenciranju i financijskoj
// održivosti de octubre de 2024 de la HNS. Es decir: no es una versión
// "extendida" opcional del mismo informe, es un documento DISTINTO y más
// completo — el informe individual de HNK Rijeka s.d.d. a secas
// probablemente NO incluye (o incluye parcialmente) los ingresos de
// entradas/estadio, que se facturan a través de la subsidiaria. Usar el
// individual habría subestimado el revenue real del club. Mismo criterio que
// Dinamo (que también consolida sus 2 subsidiarias, Dinamo trade d.o.o. y
// Plavi korner d.o.o.) — de los 3 clubes croatas cargados en esta sesión,
// Dinamo y Rijeka reportan CONSOLIDADO, Hajduk reporta solo la sociedad
// matriz (sin subsidiarias mencionadas en su propio documento).
//
// El PDF del "kombinirani" tiene texto nativo limpio (sin problemas de OCR,
// a diferencia del de Hajduk) — la transcripción ya vino provista en tablas
// Markdown bien formateadas. Auditado por KPMG Croatia d.o.o. za reviziju,
// dictamen LIMPIO ("Mišljenje" sin salvedades — el párrafo "Isticanje
// pitanja" es solo una nota estándar sobre el marco contable de propósito
// especial de la HNS, no una salvedad: "Naše mišljenje nije modificirano
// zbog ovog pitanja"). Ejercicio fiscal = año CALENDARIO (1/1 a 31/12/2024).
//
// Croacia adoptó el euro el 1/1/2023, por eso el ejercicio 2024 está 100% en
// EUR sin necesidad de convertir de kuna.
//
// A diferencia de Hajduk, Rijeka SÍ capitaliza/amortiza registraciones de
// jugadores (misma "metoda kapitalizacije i amortizacije" que Dinamo) — la
// sección de transferencias del documento dice explícitamente "Ispunjava
// samo izvještajni subjekt koji primjenjuje metodu kapitalizacije i
// amortizacije registracija igrača".
//
// PRIHODI (ingresos) 2024, EUR exactos:
//   Prihodi od ulaznica - ukupno: 1.675.274, desglosado en Nacionalna
//     natjecanja 48.809 + UEFA klupska natjecanja 216.591 + Ostali
//     nerazvrstani 10.348 → matchday_competition (275.748 combinado);
//     Godišnje ulaznice 993.248 → season_tickets; Članarine 406.278 →
//     member_dues (mismo criterio y misma duda que Dinamo, ver
//     Admin/dudas-por-club.md).
//   Prihod od sponzorstva i oglašavanja - ukupno: 1.231.950 →
//     sponsorship_commercial.
//   Prihodi od prava emitiranja - ukupno: 1.214.000 (Nacionalna natjecanja)
//     → broadcasting.
//   Komercijalni prihodi - ukupno: 1.388.707, desglosado en Prodaja
//     proizvoda 771.956 + Ostali nerazvrstani 19.749 →
//     sponsorship_commercial (791.705 combinado); Korištenje objekata za
//     vrijeme neodigravanja utakmica 597.002 → stadium_other.
//   Uefine nagrade i solidarne uplate - ukupno: 2.026.304 →
//     competition_bonus.
//   Ostali poslovni prihodi - ukupno: 834.045 (donaciones de estado/lokalne
//     samouprave + terceros no relacionados + partidas sueltas) →
//     other_income.
//   Ukupno - Prihodi (impreso): 8.370.280. Suma de las 6 categorías de
//     arriba verificada EXACTA.
//
// RASHODI (gastos) 2024, ANTES de la sección de transferencias:
//   Troškovi prodaje/materijala - ukupno: -1.093.209 → other_expenses.
//   Troškovi primanja igrača -6.224.869 + Troškovi primanja stručnog
//     stožera -2.059.390 → wages_squad (-8.284.259 combinado).
//   Trošak primanja ostalih zaposlenika: -1.266.194 →
//     admin_general_expense.
//   Amortizacija i umanjenje vrijednosti dugotrajne materijalne imovine:
//     -948.359 → depreciation (no hay línea de intangible-no-jugador este
//     año, sale en 0).
//   Trošak imovine s pravom korištenja -162.783 + Troškovi sponzorstva i
//     oglašavanja -40.761 + Troškovi imovine i objekata -314.457 →
//     admin_general_expense (-518.001 combinado).
//   Troškovi održavanja utakmica: -645.353 → match_organisation_expense.
//   Ostali nerazvrstani poslovni rashodi: -4.372.293 → other_expenses.
//   Ukupno - poslovni rashodi (bez registracija igrača) impreso:
//     -17.127.668. Suma de líneas de arriba verificada EXACTA.
//   Poslovni rezultat (bez registracija igrača) impreso: -8.757.388 (=
//     8.370.280 - 17.127.668, verificado).
//
// SECCIÓN DE TRANSFERENCIAS DE JUGADORES (método de capitalización, misma
// estructura que Dinamo — se separa la amortización real como línea de
// gasto propia, se netea el resto en profitOnPlayerSales):
//   Amortizacija dugotrajne nematerijalne imovine (registracije igrača):
//     -502.826 → PROMOVIDA a línea propia `player_amortisation`.
//   Dobit od raspolaganja dugotrajnom nematerijalnom imovinom (registracije
//     igrača) +11.133.224, Gubitak od raspolaganja -1.040.429 → NETEADOS en
//     `fiscalYearMeta.profitOnPlayerSales` = 11.133.224 - 1.040.429 =
//     10.092.795.
//   Neto rezultat impreso de toda esta sección (incluyendo amortización):
//     9.589.969 = -502.826 + 10.092.795 ✓ tie-out exacto contra el impreso.
//
// RESULTADO FINANCIERO (netInterest): Financijski prihodi 173.977 -
//   Financijski rashodi 964.164 = -790.187 (impreso exacto, "Ukupni neto
//   prihod/rashod od financiranja"). tax: Porezni prihod/(rashod) = 0
//   (impreso).
//
// TIE-OUT FINAL (verificado exacto): Poslovni rezultat -8.757.388 + Neto
//   rezultat sección transferencias 9.589.969 + netInterest -790.187 + tax 0
//   = 42.394 = Dobit/(gubitak) poslije oporezivanja impreso EXACTO.
//   Equivalente en términos de revenueLines/expenseLines de este archivo:
//   officialTotalRevenue 8.370.280 - officialTotalExpenses 17.630.494 [=
//   17.127.668 + player_amortisation 502.826] + profitOnPlayerSales
//   10.092.795 + netInterest -790.187 = 42.394 ✓.
//
// MONEDA: EUR. El documento no declara tipo de cambio propio a USD — se usa
// fxRef a FX_CLOSE (data/currency-map.js), que YA tenía la fecha necesitada
// (EUR@2024-12-31) antes de esta carga.
//
// BALANCE: grossDebt = Bankovni i drugi zajmovi (bank loans), corriente
//   2.470.654 + no corriente 11.621.634 = 14.092.288 (mismo criterio angosto
//   que Dinamo/Hajduk/Köln/Ajax, EXCLUYE obveze prema posrednicima/
//   dobavljačima/zaposlenicima, factoring de transferencias, y obveze prema
//   subjektima grupe/rezerviranja). cash: Novac i novčani ekvivalenti =
//   1.691.323.
//
// GESTIÓN: firman la Izjava o odgovornosti Uprave Nikola Ivaniš (član Uprave)
// y Vlatko Vrkić (prokurist) — sin fecha de inicio/fin de mandato declarada
// en el documento, gestionId genérico 'actual', sin entrada nominal en
// gestionesByClub (no es obligatorio, ver club-or-year-onboarding SKILL.md
// sección 16).
// ============================================================================

const rijekaHrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Prihodi od ulaznica — Nacionalna natjecanja + UEFA klupska natjecanja + ostalo nerazvrstano', normalizedCategory:'matchday_competition', amountNative:0.275748, disclosureLevel:'detailed', items:[
      ['Nacionalna natjecanja', 0.048809], ['UEFA klupska natjecanja', 0.216591], ['Ostali nerazvrstani prihodi od ulaznica', 0.010348],
    ]},
    { rawLabel:'Prihodi od ulaznica - Godišnje ulaznice', normalizedCategory:'season_tickets', amountNative:0.993248, disclosureLevel:'detailed' },
    { rawLabel:'Prihodi od ulaznica - Članarine', normalizedCategory:'member_dues', amountNative:0.406278, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja', normalizedCategory:'sponsorship_commercial', amountNative:1.231950, disclosureLevel:'detailed', items:[
      ['Proizvođač opreme', 0.112113], ['Glavni sponzor', 0.312775], ['Ostali nerazvrstani prihodi od sponzorstva i oglašavanja', 0.807062],
    ]},
    { rawLabel:'Prihodi od prava emitiranja - Nacionalna natjecanja', normalizedCategory:'broadcasting', amountNative:1.214000, disclosureLevel:'detailed' },
    { rawLabel:'Komercijalni prihodi — Prodaja proizvoda + Ostali nerazvrstani', normalizedCategory:'sponsorship_commercial', amountNative:0.791705, disclosureLevel:'detailed', items:[
      ['Prodaja proizvoda (merchandising)', 0.771956], ['Ostali nerazvrstani komercijalni prihodi', 0.019749],
    ]},
    { rawLabel:'Komercijalni prihodi - Korištenje objekata za vrijeme neodigravanja utakmica', normalizedCategory:'stadium_other', amountNative:0.597002, disclosureLevel:'detailed' },
    { rawLabel:'Uefine nagrade i solidarne uplate', normalizedCategory:'competition_bonus', amountNative:2.026304, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi', normalizedCategory:'other_income', amountNative:0.834045, disclosureLevel:'detailed', items:[
      ['Donacije/dotacije od države i lokalne samouprave', 0.195526], ['Donacije nepovezanih strana', 0.169500],
      ['Ostali nerazvrstani poslovni prihodi', 0.469019],
    ]},
  ],
};

const rijekaHrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Troškovi prodaje/materijala', normalizedCategory:'other_expenses', amountNative:-1.093209, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi primanja igrača + Troškovi primanja stručnog stožera', normalizedCategory:'wages_squad', amountNative:-8.284259, disclosureLevel:'detailed', items:[
      ['Troškovi primanja igrača', -6.224869], ['Troškovi primanja stručnog stožera', -2.059390],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika', normalizedCategory:'admin_general_expense', amountNative:-1.266194, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija i umanjenje vrijednosti dugotrajne materijalne imovine', normalizedCategory:'depreciation', amountNative:-0.948359, disclosureLevel:'detailed' },
    { rawLabel:'Trošak imovine s pravom korištenja + Troškovi sponzorstva i oglašavanja + Troškovi imovine i objekata', normalizedCategory:'admin_general_expense', amountNative:-0.518001, disclosureLevel:'detailed', items:[
      ['Trošak imovine s pravom korištenja (operativni najam)', -0.162783], ['Troškovi sponzorstva i oglašavanja', -0.040761],
      ['Troškovi imovine i objekata', -0.314457],
    ]},
    { rawLabel:'Troškovi održavanja utakmica', normalizedCategory:'match_organisation_expense', amountNative:-0.645353, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-4.372293, disclosureLevel:'detailed' },
    // Amortizacija dugotrajne nematerijalne imovine (registracije igrača) — promovida a línea
    // propia, ver comentario de cabecera (no se netea con profitOnPlayerSales).
    { rawLabel:'Amortizacija dugotrajne nematerijalne imovine (registracije igrača)', normalizedCategory:'player_amortisation', amountNative:-0.502826, disclosureLevel:'detailed' },
  ],
};

const rijekaHrFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'rijeka-hr-financijsko-izvjesce-2024-kombinirani',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    // Dobit od raspolaganja (11.133.224) - Gubitak od raspolaganja (1.040.429), registracije
    // igrača. Ver comentario de cabecera para el tie-out completo de esta sección.
    profitOnPlayerSales:10.092795,
    assetSales:0,
    // Financijski prihodi(173.977) - Financijski rashodi(964.164).
    netInterest:-0.790187,
    tax:0,
    // grossDebt = Bankovni i drugi zajmovi (corriente 2.470.654 + no corriente 11.621.634). cash =
    // Novac i novčani ekvivalenti.
    grossDebt:14.092288, cash:1.691323,
    officialTotalRevenue:8.370280, officialTotalExpenses:17.630494, officialPAT:0.042394,
  },
};

const rijekaHrPresupuestoOverlayByYear = {};

const rijekaHrPasesData = [];
const rijekaHrResultadosData = {};
const rijekaHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['rijeka-hr'] = {
  revenueLinesByYear: rijekaHrRevenueLinesByYear, expenseLinesByYear: rijekaHrExpenseLinesByYear,
  fiscalYearMeta: rijekaHrFiscalYearMeta, pasesData: rijekaHrPasesData,
  resultadosData: rijekaHrResultadosData, titulosData: rijekaHrTitulosData,
  presupuestoOverlayByYear: rijekaHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'rijeka-hr-financijsko-izvjesce-2024-kombinirani': {
    id:'rijeka-hr-financijsko-izvjesce-2024-kombinirani', clubId:'rijeka-hr',
    title:'Revidirani godišnji kombinirani financijski izvještaji za posebne namjene za 2024. godinu (HNK Rijeka s.d.d. i Stadion Kantrida d.o.o.)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Balance auditado COMBINADO (HNK Rijeka s.d.d. + Stadion Kantrida d.o.o., la sociedad que administra el estadio y vende las entradas), preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de octubre de 2024 de la HNS — combinación exigida desde esa fecha. Auditor: KPMG Croatia d.o.o. za reviziju. Dictamen limpio, sin salvedades. Se usó este informe combinado en vez del informe individual de HNK Rijeka s.d.d. a secas (también disponible en la misma carpeta) porque los ingresos de entradas/estadio se facturan a través de la subsidiaria: el individual habría subestimado el revenue real del club. Transcripción completa en Clubes/Croacia/Rijeka/financijsko-izvjesce-2024-kombinirani.md.',
  },
});

gestionesByClub['rijeka-hr'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
};

memberCountByClub['rijeka-hr'] = null;
