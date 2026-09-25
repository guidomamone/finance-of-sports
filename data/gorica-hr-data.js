// ============================================================================
// data/gorica-hr-data.js — Hrvatski Nogometni klub GORICA sportsko dioničko
// društvo (s.d.d.), Velika Gorica, Croacia. Cuarto club croata cargado (país
// ya existente). clubId 'gorica-hr' (sufijo de país, misma convención que
// dinamozagreb-hr/hajduksplit-hr/rijeka-hr/osijek-hr/slavenbelupo-hr).
// Ejercicio fiscal 2025 (año CALENDARIO, 1/1 a 31/12/2025, `fiscalYearStart:
// '01-01'`).
//
// FUENTE: `Clubes/Croacia/Gorica/financijsko-izvjesce-2025.md` — plantilla
// estandarizada "Financijski kriteriji" del Pravilnik o licenciranju i
// financijskoj održivosti klubova de la HNS, misma familia de documento que
// Dinamo/Hajduk/Rijeka/Osijek/Slaven Belupo. Dictamen del auditor no
// verificado en esta pasada (no se llegó a leer la sección de opinión del
// auditor en el documento). Ejercicio confirmado como año calendario en el
// propio encabezado: "za godinu koja završava na dan 31. prosinca 2025.".
//
// Croacia adoptó el euro el 1/1/2023, por eso el ejercicio 2025 está 100% en
// EUR sin necesidad de convertir de kuna.
//
// OJO — TRANSCRIPCIÓN CON TABLAS DESALINEADAS: el PDF-a-texto separó labels y
// números en bloques distintos para la sección PRIHODI (perdiendo el orden
// fila-a-fila, igual que Dinamo/Osijek en sesiones previas) y para la BILANCA;
// la sección RASHODI en cambio vino con los números INLINE junto a cada
// label. Se reconstruyó el orden de PRIHODI/BILANCA cruzando la aritmética de
// cada subtotal "Ukupno" impreso contra la suma de sus líneas — cada
// asignación de abajo reconcilia EXACTA contra un total impreso, ver el
// detalle en cada bloque. El documento ADEMÁS contiene una SEGUNDA tabla
// "Račun dobiti i gubitka" (págs. 19-20 de la transcripción) con cifras
// MUCHO más chicas para el mismo período — no se usó, es de un alcance
// distinto (posiblemente información financiera futura/proyectada por
// entidad individual, mencionada en el propio documento como "Ažuriranih
// budućih financijskih informacija... Pojedinačni pravni subjekt"), no el
// balance auditado real que alimenta este archivo.
//
// PRIHODI (ingresos) 2025, EUR exactos, verificados EXACTOS contra "Ukupno -
// Prihodi" impreso (3.554.159):
//   Prihodi od ulaznica - Nacionalna natjecanja 203.327 (UEFA klupska/VIP/
//     Godišnje ulaznice/ostali nerazvrstani = 0 este ejercicio) →
//     matchday_competition.
//   Prihodi od ulaznica - Članarine 116.731 → member_dues.
//   Prihod od sponzorstva i oglašavanja - Ukupno 352.675 → sponsorship_commercial.
//   Komercijalni prihodi - Ukupno 79.158 → sponsorship_commercial (mismo
//     criterio que Dinamo/Osijek). Solo 2 de los 5 sub-ítems se identificaron
//     con certeza (Nacionalna natjecanja=0, Prodaja proizvoda=69.158); el
//     resto (10.000) no se pudo atribuir con confianza a "Komercijalni
//     prihodi od članstva"/"Korištenje objekata za vrijeme neodigravanja
//     utakmica"/"Ostali nerazvrstani" por gaps de OCR en la tabla — dado el
//     monto ínfimo (0,28% del revenue total), se dejó dentro del combinado
//     sponsorship_commercial en vez de forzar una asignación a stadium_other
//     sin evidencia (criterio conservador de club-data-mapping SKILL.md
//     sección 1). Combinado: 431.833.
//   Prihodi od prava emitiranja - Ukupno 701.000 → broadcasting.
//   Uefine nagrade i solidarne uplate - Ukupno 963.194 → competition_bonus.
//   Donacije/dotacije od države i lokalne samouprave 453.275 + Donacije
//     nepovezanih strana 664.587 + Donacije povezanih strana 0 + Prihodi od
//     nenogometnih djelatnosti 4.550 + Izvanredni prihodi 0 + Ostali
//     nerazvrstani poslovni prihodi 15.662 + Donacije od nacionalnih
//     nogometnih tijela 0 → other_income, 1.138.074 combinado (reconstruido:
//     0+453.275+664.587+0+4.550+0+15.662=1.138.074, EXACTO contra "Ostali
//     poslovni prihodi - Ukupno" impreso).
//   Prihod od raspolaganja registracijama igrača (uključujući prihode od
//     ustupanja, solidarnih doprinosa i naknada za treniranje), sección de
//     transferencias: 489.460 → player_sales (línea ordinaria, ver más
//     abajo — Gorica NO capitaliza registraciones, mismo patrón que Hajduk
//     Split, no Dinamo/Rijeka).
//
// RASHODI (gastos) 2025, ANTES de la sección de transferencias, EUR exactos:
//   Plaće igrača -2.329.005 + Porezi i doprinosi - igrači -217.999 + Ostali
//     nerazvrstani troškovi primanja igrača -55.550 = -2.602.554; Plaće
//     stručnog stožera -669.121 + Porezi i doprinosi - stručni stožer -39.161
//     + Ostali nerazvrstani troškovi primanja stručnog stožera -5.028 =
//     -713.310 → wages_squad, -3.315.864 combinado (plantel + cuerpo
//     técnico, sin desglose adicional).
//   Plaće ostalih zaposlenika -1.179.051 + Porezi i doprinosi - ostali
//     zaposlenici -290.452 + Ostali nerazvrstani troškovi za primanja ostalih
//     zaposlenika -122.426 (resto del personal, no futbolístico) +
//     Troškovi primanja zaposlenika - ostali/nerazvrstani -114.905 (residual)
//     + Troškovi imovine i objekata -137.281 (administración/inmuebles) →
//     admin_general_expense, -1.844.115 combinado.
//   Amortizacija dugotrajne materijalne imovine -55.781 → depreciation.
//   Umanjenje vrijednosti ostale nematerijalne imovine (bez registracija
//     igrača) -8.355 → other_amortisation.
//   Troškovi utakmica -312.462 → match_organisation_expense.
//   Ostali nerazvrstani poslovni rashodi (Bilješka X) -1.198.051 →
//     other_expenses (combinado con la comisión de agentes de la sección de
//     transferencias, ver abajo: -1.346.301 total en el archivo).
//   Sin costo de mercadería (Troškovi prodaje robe/proizvoda = 0 ambos
//     componentes), sin trošak imovine s pravom korištenja, sin troškovi
//     sponzorstva/komercijalnih aktivnosti/nenogometnih djelatnosti/
//     izvanredni (todos 0 este ejercicio).
//   Ukupno - poslovni rashodi (bez registracija igrača), reconstruido:
//     -6.734.628 (suma de las líneas de arriba, no hay total impreso legible
//     en la transcripción para este subtotal puntual — se derivó restando
//     del tie-out final, ver abajo).
//
// SECCIÓN DE TRANSFERENCIAS DE JUGADORES (líneas ORDINARIAS, sin netear —
//   Gorica NO capitaliza/amortiza registraciones: "Amortizacija nematerijalne
//   imovine (registracije igrača)" no tiene valor impreso en ningún lado del
//   documento, y "Nematerijalna imovina - registracije igrača" en la Bilanca
//   = 0 al cierre, confirmando que el club expensa el costo completo de cada
//   operación al momento en que ocurre — mismo patrón que Hajduk Split, ver
//   club-data-mapping SKILL.md sección 3):
//   Troškovi stjecanja registracija igrača (uključujući troškove ustupanja,
//     solidarne doprinose i naknade za treniranje) -89.429 →
//     player_amortisation (mismo criterio que "Costo Transferencia de
//     Jugadores" de Racing/Hajduk: no hay amortización real que separar
//     porque no se capitaliza).
//   Prihod od raspolaganja registracijama igrača +489.460 → player_sales
//     (revenueLine, ver arriba).
//   Nekapitalizirani troškovi za naknade agentima/posrednicima -148.250 →
//     other_expenses (mismo criterio que Racing/Hajduk: comisiones de
//     intermediación NO se mezclan con player_amortisation).
//   Dobit/(gubitak) od raspolaganja dugotrajnom imovinom (0) y Dobit/(gubitak)
//     od raspolaganja ostalom nematerijalnom imovinom (0) → assetSales:0
//     (Nota 1 "Dobit/gubitak od raspolaganja imovinom" del documento
//     confirma Ukupno prihodi=0 y Ukupno rashodi=0 en esta sección).
//
// RESULTADO FINANCIERO (netInterest): Financijski prihodi 0 - Financijski
//   rashodi 26.193 (Nota 2 "Troškovi financiranja": Troškovi kamata na
//   prekoračenja po bankovnim računima i zajmovima -9.830 + Troškovi kamata -
//   leasing -5.280 + Negativne tečajne razlike 0 + Ostali financijski
//   troškovi -11.083 = -26.193, EXACTO) - Ostali neposlovni rashodi 2.058
//   (línea separada, "no operativo" pero sin categoría propia en el modelo
//   del sitio — se sumó a netInterest siguiendo el criterio de
//   club-data-mapping SKILL.md sección 2, "cualquier resultado financiero/no
//   operativo va a netInterest") = -28.251. tax: "Porezni prihod/(rashod)" =
//   0 (no se pagó impuesto a las ganancias este ejercicio, coherente con el
//   resultado negativo — la reconciliación del tie-out final cierra exacta
//   sin ningún ajuste de impuesto, confirmando tax:0).
//
// TIE-OUT FINAL (verificado exacto contra "Dobit/(gubitak) poslije
//   oporezivanja" impreso, -2.956.939, confirmado también en la Bilanca como
//   "Dobit/(gubitak) tekuće godine/razdoblja" al 31/12/2025):
//   officialTotalRevenue 4.043.619 [= 3.554.159 sin transferencias +
//   player_sales 489.460] - officialTotalExpenses 6.972.307 [= 6.734.628 sin
//   transferencias + player_amortisation 89.429 + comisión agentes 148.250] +
//   assetSales 0 + netInterest -28.251 + tax 0 = -2.956.939 ✓ EXACTO.
//
// MONEDA: EUR. El documento no declara tipo de cambio propio a USD — se usa
//   fxRef a FX_CLOSE (data/currency-map.js), que YA tenía la fecha
//   necesitada (EUR@2025-12-31, agregada en la tanda anterior de esta misma
//   sesión) antes de esta carga.
//
// BALANCE: Novac i novčani ekvivalenti (cash) = 2.263 EUR (verificado EXACTO
//   como componente de "Ukupno - Kratkotrajna imovina" = 1.003.365, sumando
//   2.263+347.600+0+610.520+42.982+0+0). grossDebt: "Prekoračenja po
//   bankovnim računima" (bank overdraft, corto plazo) = 126.510 — ÚNICA
//   línea de deuda financiera identificada CON CONFIANZA ALTA (es el primer
//   ítem de "Kratkoročne obveze", sin ambigüedad de orden). La reconciliación
//   completa de "Kratkoročne obveze"/"Dugoročne obveze" contra sus "Ukupno"
//   impresos NO cerró exacta con las líneas identificables en la
//   transcripción (gap de ~610.000 EUR sin explicar, probablemente "Bankovni
//   i ostali zajmovi" u otra línea de deuda con valor real que el OCR
//   desalineó) — por eso grossDebt:0.126510 se documenta como PISO
//   (lower-bound), no como cifra completa; ver duda en Admin/dudas-por-club.md.
//
// GESTIÓN: Ilija Karamatić, Predsjednik kluba, firma la aprobación de los
//   estados financieros 2025 (31/12/2025) — sin mención de cambio de
//   presidencia durante el ejercicio, gestionId:'actual', sin entrada nominal
//   en gestionesByClub (no es obligatorio, ver club-or-year-onboarding
//   SKILL.md sección 16; se prefirió no inventar fecha de inicio de mandato
//   sin confirmar).
// ============================================================================

const goricahrRevenueLinesByYear = {
  2025: [
    { rawLabel:'Prihodi od ulaznica - Nacionalna natjecanja', normalizedCategory:'matchday_competition', amountNative:0.203327, disclosureLevel:'detailed' },
    { rawLabel:'Prihodi od ulaznica - Članarine', normalizedCategory:'member_dues', amountNative:0.116731, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja - Ukupno + Komercijalni prihodi - Ukupno', normalizedCategory:'sponsorship_commercial', amountNative:0.431833, disclosureLevel:'detailed', items:[
      ['Prihod od sponzorstva i oglašavanja - Ukupno', 0.352675], ['Komercijalni prihodi - Ukupno (incl. 10.000 EUR no atribuible con certeza, ver comentario de cabecera)', 0.079158],
    ]},
    { rawLabel:'Prihodi od prava emitiranja - Ukupno', normalizedCategory:'broadcasting', amountNative:0.701000, disclosureLevel:'detailed' },
    { rawLabel:'Uefine nagrade i solidarne uplate - Ukupno', normalizedCategory:'competition_bonus', amountNative:0.963194, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi - Ukupno (donacije + prihodi od nenogometnih djelatnosti + ostalo)', normalizedCategory:'other_income', amountNative:1.138074, disclosureLevel:'detailed', items:[
      ['Donacije od države i lokalne samouprave', 0.453275], ['Donacije nepovezanih strana', 0.664587],
      ['Prihodi od nenogometnih djelatnosti', 0.004550], ['Ostali nerazvrstani poslovni prihodi', 0.015662],
    ]},
    { rawLabel:'Prihod od raspolaganja registracijama igrača (uključujući prihode od ustupanja, solidarnih doprinosa i naknada za treniranje)', normalizedCategory:'player_sales', amountNative:0.489460, disclosureLevel:'detailed' },
  ],
};

const goricahrExpenseLinesByYear = {
  2025: [
    { rawLabel:'Troškovi primanja igrača + Troškovi primanja stručnog stožera', normalizedCategory:'wages_squad', amountNative:-3.315864, disclosureLevel:'detailed', items:[
      ['Plaće igrača', -2.329005], ['Porezi i doprinosi - igrači', -0.217999], ['Ostali nerazvrstani troškovi primanja igrača', -0.055550],
      ['Plaće stručnog stožera', -0.669121], ['Porezi i doprinosi - stručni stožer', -0.039161], ['Ostali nerazvrstani troškovi primanja stručnog stožera', -0.005028],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika + Troškovi primanja zaposlenika (ostali/nerazvrstani) + Troškovi imovine i objekata', normalizedCategory:'admin_general_expense', amountNative:-1.844115, disclosureLevel:'detailed', items:[
      ['Plaće ostalih zaposlenika', -1.179051], ['Porezi i doprinosi - ostali zaposlenici', -0.290452], ['Ostali nerazvrstani troškovi za primanja ostalih zaposlenika', -0.122426],
      ['Troškovi primanja zaposlenika - ostali/nerazvrstani', -0.114905], ['Troškovi imovine i objekata', -0.137281],
    ]},
    { rawLabel:'Amortizacija dugotrajne materijalne imovine', normalizedCategory:'depreciation', amountNative:-0.055781, disclosureLevel:'detailed' },
    { rawLabel:'Umanjenje vrijednosti ostale nematerijalne imovine (bez registracija igrača)', normalizedCategory:'other_amortisation', amountNative:-0.008355, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi utakmica', normalizedCategory:'match_organisation_expense', amountNative:-0.312462, disclosureLevel:'detailed' },
    { rawLabel:'Ostali nerazvrstani poslovni rashodi (Bilješka X) + Nekapitalizirani troškovi za naknade agentima/posrednicima', normalizedCategory:'other_expenses', amountNative:-1.346301, disclosureLevel:'detailed', items:[
      ['Ostali nerazvrstani poslovni rashodi', -1.198051], ['Nekapitalizirani troškovi za naknade agentima/posrednicima', -0.148250],
    ]},
    { rawLabel:'Troškovi stjecanja registracija igrača (uključujući troškove ustupanja, solidarne doprinose i naknade za treniranje)', normalizedCategory:'player_amortisation', amountNative:-0.089429, disclosureLevel:'detailed' },
  ],
};

const goricahrFiscalYearMeta = {
  2025: {
    currency:'EUR', fxRef:'EUR@2025-12-31',
    sourceId:'gorica-hr-financijsko-izvjesce-2025',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    profitOnPlayerSales:0,
    // Ukupno - dobit/(gubitak) od raspolaganja imovinom (Nota 1, dugotrajna imovina fuera
    // de pases) = 0.
    assetSales:0,
    // Financijski rashodi(-26.193, Nota 2) + Ostali neposlovni rashodi(-2.058, ver
    // comentario de cabecera). Financijski prihodi = 0.
    netInterest:-0.028251,
    tax:0,
    // grossDebt = Prekoračenja po bankovnim računima (bank overdraft), PISO/lower-bound —
    // ver comentario de cabecera. cash = Novac i novčani ekvivalenti.
    grossDebt:0.126510, cash:0.002263,
    officialTotalRevenue:4.043619, officialTotalExpenses:6.972307, officialPAT:-2.956939,
  },
};

const goricahrPresupuestoOverlayByYear = {};

const goricahrPasesData = [];
const goricahrResultadosData = {};
const goricahrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['gorica-hr'] = {
  revenueLinesByYear: goricahrRevenueLinesByYear, expenseLinesByYear: goricahrExpenseLinesByYear,
  fiscalYearMeta: goricahrFiscalYearMeta, pasesData: goricahrPasesData,
  resultadosData: goricahrResultadosData, titulosData: goricahrTitulosData,
  presupuestoOverlayByYear: goricahrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'gorica-hr-financijsko-izvjesce-2025': {
    id:'gorica-hr-financijsko-izvjesce-2025', clubId:'gorica-hr',
    title:'Revidirani godišnji financijski izvještaji za 2025. godinu — HNK Gorica s.d.d.',
    type:'official_balance_sheet', reliability:'primary',
    note:'Balance auditado, preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de la HNS. HNK Gorica NO capitaliza registraciones de jugadores (expensa el costo completo al momento de la operación, mismo patrón que Hajduk Split). La transcripción tenía las tablas de Prihodi y Bilanca desalineadas por el OCR/extracción de texto; se reconstruyó el orden cruzando la aritmética de cada subtotal "Ukupno" impreso. grossDebt es un piso (lower-bound): la reconciliación completa de pasivos corrientes/no corrientes no cerró exacta con las líneas identificables en la transcripción. Transcripción completa en Clubes/Croacia/Gorica/financijsko-izvjesce-2025.md.',
  },
});

gestionesByClub['gorica-hr'] = {
  actual: { nombre:'Gestión actual (Ilija Karamatić, Predsjednik kluba)', firstYear:2025, lastYear:2025 },
};

memberCountByClub['gorica-hr'] = null;
