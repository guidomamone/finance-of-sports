// ============================================================================
// data/hajduksplit-hr-data.js — HNK Hajduk s.d.d. (Split, Croacia).
// Segundo club croata cargado en esta sesión de onboarding de Croacia como
// país nuevo. clubId 'hajduksplit-hr' (sufijo de país, convención desde la
// Versión 129).
//
// FUENTE: `Clubes/Croacia/Hajduk Split/financijsko-izvjesce-2024.md`
// (transcripción provista al onboardear el país, plantilla "Financijski
// kriterij FO2" del Pravilnik o licenciranju i financijskoj održivosti
// klubova de la HNS — misma familia de documento que Dinamo/Rijeka). El PDF
// parece un escaneo con OCR de calidad media: varios dígitos y celdas salen
// garbled (ej. "340.81" en vez de "340.811", un "0" faltante en "44.267" en
// vez de "404.267"). Se RECONSTRUYERON los valores garbled restando/sumando
// contra los subtotales "Ukupno" impresos (que sí se leyeron limpios), no se
// tomó ningún número dudoso al pie de la letra sin cruzarlo — ver el detalle
// de cada reconstrucción en los comentarios de línea de abajo. Auditado por
// Kalibović i partneri d.o.o., dictamen LIMPIO ("Mišljenje" sin salvedades,
// "fer prezentiraju... financijski položaj"). Ejercicio fiscal = año
// CALENDARIO (1/1 a 31/12/2024, confirmado en el propio documento).
//
// Croacia adoptó el euro el 1/1/2023, por eso el ejercicio 2024 está 100% en
// EUR sin necesidad de convertir de kuna.
//
// A DIFERENCIA DE DINAMO: Hajduk NO capitaliza registraciones de jugadores
// (Nematerijalna imovina - registracije igrača = 0 en el balance, los 2
// años) — expensa el costo completo de adquirir un pase al momento de la
// operación, y reporta la venta de pases como ingreso BRUTO ordinario, sin
// netear. Es el MISMO patrón que Racing (club-data-mapping SKILL.md sección
// 3): "Transferencia de Jugadores" (ingreso) y "Costo Transferencia de
// Jugadores" (gasto) como líneas ordinarias separadas.
//
// PRIHODI (ingresos) 2024, EUR exactos:
//   Prihodi od ulaznica - ukupno: 6.437.224, desglosado en Nacionalna
//     natjecanja 2.717.370 + UEFA klupska natjecanja 768.095 →
//     matchday_competition (3.485.465 combinado; VIP/hospitality, Članarine
//     y "ostali nerazvrstani" dan 0 este año, se omiten); Godišnje ulaznice
//     2.951.759 → season_tickets.
//   Prihod od sponzorstva i oglašavanja - Ukupno: 4.176.713 →
//     sponsorship_commercial.
//   Prihodi od prava emitiranja - Ukupno: 1.090.600 → broadcasting (la suma
//     de sus 2 sub-líneas OCR da 1.090.609, 9 EUR de diferencia por ruido de
//     OCR sobre un total de 1,09M — irrelevante, se usó el "Ukupno" impreso).
//   Komercijalni prihodi - Ukupno: 9.273.142, desglosado en Nacionalna
//     natjecanja 340.811 (reconstruido: Ukupno 9.273.142 menos los otros 3
//     componentes visibles, el OCR había truncado el último dígito a
//     "340.81") + Prodaja proizvoda (merchandising) 8.453.825 + Ostali
//     nerazvrstani 385.611 → sponsorship_commercial (9.180.247 combinado);
//     Korištenje objekata para vrijeme neodigravanja utakmica 92.895 →
//     stadium_other (uso del estadio FUERA del partido, no catering de
//     matchday como Dinamo/Köln).
//   Uefine nagrade i solidarne uplate - Ukupno: 1.734.229 →
//     competition_bonus.
//   Ostali poslovni prihodi - Ukupno: 2.703.091 (donaciones de entidades
//     nacionales/terceros relacionados y no relacionados + ingresos
//     extraordinarios + partidas sueltas; "donaciones de estado/lokalne
//     samouprave" salió en 0 tras reconstruir contra el Ukupno, su celda OCR
//     estaba vacía/garbled) → other_income.
//   Prihod od raspolaganja registracijama igrača (venta de pases, BRUTO,
//     sección de transferencias): 1.990.492 → player_sales (línea ordinaria,
//     NO neteada, ver nota de cabecera).
//   Ukupno - Prihodi (impreso, EXCLUYE la sección de transferencias):
//     25.414.999. Suma de las 6 categorías de arriba (sin player_sales)
//     verificada EXACTA contra este total.
//
// RASHODI (gastos) 2024, ANTES de la sección de transferencias:
//   Troškovi prodaje/materijala: -5.490.518 → other_expenses.
//   Troškovi primanja igrača -14.043.603 + Troškovi primanja stručnog
//     stožera -1.369.507 → wages_squad (-15.413.110 combinado).
//   Trošak primanja ostalih zaposlenika: -4.791.301 → admin_general_expense.
//   Amortizacija dugotrajne materijalne imovine (tangible): -386.805 →
//     depreciation. Amortizacija ostale nematerijalne imovine, bez
//     registracija igrača: -1.165.210 → other_amortisation.
//   Troškovi utakmica: -2.329.584 → match_organisation_expense.
//   Troškovi sponzorstva i oglašavanja -298.428 + Troškovi komercijalnih
//     aktivnosti -1.076.187 + Troškovi imovine i objekata -554.550 →
//     admin_general_expense (-1.929.165 combinado).
//   Ostali nerazvrstani poslovni rashodi: -3.509.629 → other_expenses.
//   Ukupno - poslovni rashodi (bez registracija igrača) impreso: -35.015.322
//     (el documento OCR muestra "(9.600,323)" para el RESULTADO, no el
//     total de rashodi — se despejó: 25.414.999 - X = -9.600.323 → X =
//     35.015.322, y esta suma reconcilia EXACTA contra las líneas de arriba).
//
// SECCIÓN DE TRANSFERENCIAS DE JUGADORES (líneas ORDINARIAS, sin netear, ver
// nota de cabecera — a diferencia de Dinamo/Rijeka que sí capitalizan):
//   Troškovi stjecanja registracija igrača (uključujući troškove ustupanja):
//     -1.802.429 → player_amortisation (mismo criterio que "Costo
//     Transferencia de Jugadores" de Racing: no hay amortización real que
//     separar porque no se capitaliza, todo el costo de la operación entra
//     acá).
//   Prihod od raspolaganja registracijama igrača: +1.990.492 → player_sales
//     (revenueLine, ver arriba).
//   Nekapitalizirani troškovi za naknade agentima/posrednicima: -592.330 →
//     other_expenses (mismo criterio que Racing: comisiones de
//     intermediación NO se mezclan con player_amortisation).
//   Neto rezultat impreso de esta sección: el OCR mostraba "(44.267)", pero
//     -1.802.429 + 1.990.492 - 592.330 = -404.267, no -44.267 — se
//     reconstruyó como -404.267 (el OCR perdió un "0" interno), y ESTE valor
//     reconstruido es el que hace cerrar el resultado final del ejercicio
//     contra el Dobit/(gubitak) poslije oporezivanja impreso (ver tie-out
//     abajo), confirmando la reconstrucción.
//
// RESULTADO FINANCIERO (netInterest): Financijski prihodi 0 - Financijski
//   rashodi 810.410 + Neto tečajne razlike 78.153 = -732.257 (impreso
//   exacto).
// assetSales: Ukupno dobit/(gubitak) od raspolaganja imovinom (no pases) = 0
//   (impreso). tax: Porezni prihod/(rashod) = 0 (impreso, Hajduk no pagó
//   impuesto a las ganancias este ejercicio, coherente con el resultado
//   negativo).
//
// TIE-OUT FINAL (verificado exacto, usando el neto reconstruido de -404.267
//   para la sección de transferencias): Poslovni rezultat (bez registracija
//   igrača) -9.600.323 + neto sección transferencias -404.267 + assetSales 0
//   + netInterest -732.257 + tax 0 = -10.736.847 = Dobit/(gubitak) poslije
//   oporezivanja impreso EXACTO.
//   Equivalente en términos de revenueLines/expenseLines de este archivo:
//   officialTotalRevenue 27.405.491 [= 25.414.999 + player_sales 1.990.492]
//   - officialTotalExpenses 37.410.081 [= 35.015.322 + player_amortisation
//   1.802.429 + agentes 592.330] + netInterest -732.257 = -10.736.847 ✓.
//
// MONEDA: EUR. El documento no declara tipo de cambio propio a USD — se usa
// fxRef a FX_CLOSE (data/currency-map.js), que YA tenía la fecha necesitada
// (EUR@2024-12-31) antes de esta carga.
//
// BALANCE (también con celdas OCR desalineadas, reconstruido igual cruzando
// contra los "Ukupno" impresos — ver Clubes/Croacia/Hajduk Split/
// financijsko-izvjesce-2024.md para el detalle línea por línea): grossDebt =
// Bankovni i ostali zajmovi (bank loans), corriente 5.124.513 + no corriente
// 0 = 5.124.513 (mismo criterio angosto que Dinamo/Köln/Ajax, EXCLUYE
// obveze prema agentima/dobavljačima/zaposlenicima y obračunati
// troškovi/rezerviranja). cash: Novac i novčani ekvivalenti = 1.414.039.
//
// GESTIÓN: Ivan Bilić, Predsjednik Uprave, firma la Izjava o odgovornosti
// Uprave para todo el ejercicio 2024 (sin cambio de presidencia mencionado
// en el documento) — gestionId genérico 'actual' de todos modos, sin entrada
// nominal en gestionesByClub (no es obligatorio, ver club-or-year-onboarding
// SKILL.md sección 16; se prefirió no inventar el nombre completo de la
// gestión sin confirmar fecha de inicio/fin del mandato).
// ============================================================================

const hajduksplitHrRevenueLinesByYear = {
  2024: [
    { rawLabel:'Prihodi od ulaznica — Nacionalna natjecanja + UEFA klupska natjecanja', normalizedCategory:'matchday_competition', amountNative:3.485465, disclosureLevel:'detailed', items:[
      ['Nacionalna natjecanja', 2.717370], ['UEFA klupska natjecanja', 0.768095],
    ]},
    { rawLabel:'Prihodi od ulaznica - Godišnje ulaznice', normalizedCategory:'season_tickets', amountNative:2.951759, disclosureLevel:'detailed' },
    { rawLabel:'Prihod od sponzorstva i oglašavanja', normalizedCategory:'sponsorship_commercial', amountNative:4.176713, disclosureLevel:'detailed', items:[
      ['Sponzor za opremu (proizvođač opreme)', 0.474646], ['Glavni sponzor na opremi', 0.645277],
      ['Reklamiranje na panoima oko terena za igru', 0.811974], ['Ostali nerazvrstani prihodi od sponzorstva i oglašavanja', 2.244816],
    ]},
    { rawLabel:'Prihodi od prava emitiranja', normalizedCategory:'broadcasting', amountNative:1.090600, disclosureLevel:'detailed' },
    { rawLabel:'Komercijalni prihodi — Nacionalna natjecanja + Prodaja proizvoda + Ostali nerazvrstani', normalizedCategory:'sponsorship_commercial', amountNative:9.180247, disclosureLevel:'detailed', items:[
      ['Komercijalni prihodi - Nacionalna natjecanja', 0.340811], ['Komercijalni prihodi - Prodaja proizvoda (merchandising)', 8.453825],
      ['Ostali nerazvrstani komercijalni prihodi', 0.385611],
    ]},
    { rawLabel:'Komercijalni prihodi - Korištenje objekata za vrijeme neodigravanja utakmica', normalizedCategory:'stadium_other', amountNative:0.092895, disclosureLevel:'detailed' },
    { rawLabel:'Uefine nagrade i solidarne uplate', normalizedCategory:'competition_bonus', amountNative:1.734229, disclosureLevel:'detailed' },
    { rawLabel:'Ostali poslovni prihodi', normalizedCategory:'other_income', amountNative:2.703091, disclosureLevel:'detailed', items:[
      ['Donacije od nacionalnih nogometnih tijela', 0.152412], ['Donacije nepovezanih strana', 0.527068],
      ['Donacije i doprinosi povezanih strana', 0.999973], ['Izvanredni prihodi', 0.599877],
      ['Ostali nerazvrstani poslovni prihodi', 0.423761],
    ]},
    // Sección de transferencias, líneas ORDINARIAS sin netear (Hajduk no capitaliza pases, ver
    // comentario de cabecera).
    { rawLabel:'Prihod od raspolaganja registracijama igrača (uključujući prihod od ustupanja)', normalizedCategory:'player_sales', amountNative:1.990492, disclosureLevel:'detailed' },
  ],
};

const hajduksplitHrExpenseLinesByYear = {
  2024: [
    { rawLabel:'Troškovi prodaje robe/proizvoda - izravni + ostali nerazvrstani', normalizedCategory:'other_expenses', amountNative:-5.490518, disclosureLevel:'detailed', items:[
      ['Troškovi prodaje robe/proizvoda - izravni', -4.299304], ['Troškovi prodaje robe/proizvoda - ostali nerazvrstani', -1.191214],
    ]},
    { rawLabel:'Troškovi primanja igrača + Troškovi primanja stručnog stožera', normalizedCategory:'wages_squad', amountNative:-15.413110, disclosureLevel:'detailed', items:[
      ['Troškovi primanja igrača', -14.043603], ['Troškovi primanja stručnog stožera', -1.369507],
    ]},
    { rawLabel:'Trošak primanja ostalih zaposlenika', normalizedCategory:'admin_general_expense', amountNative:-4.791301, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija dugotrajne materijalne imovine', normalizedCategory:'depreciation', amountNative:-0.386805, disclosureLevel:'detailed' },
    { rawLabel:'Amortizacija ostale nematerijalne imovine (bez registracija igrača)', normalizedCategory:'other_amortisation', amountNative:-1.165210, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi utakmica', normalizedCategory:'match_organisation_expense', amountNative:-2.329584, disclosureLevel:'detailed' },
    { rawLabel:'Troškovi sponzorstva i oglašavanja + Troškovi komercijalnih aktivnosti + Troškovi imovine i objekata', normalizedCategory:'admin_general_expense', amountNative:-1.929165, disclosureLevel:'detailed', items:[
      ['Troškovi sponzorstva i oglašavanja', -0.298428], ['Troškovi komercijalnih aktivnosti', -1.076187],
      ['Troškovi imovine i objekata', -0.554550],
    ]},
    { rawLabel:'Ostali nerazvrstani poslovni rashodi', normalizedCategory:'other_expenses', amountNative:-3.509629, disclosureLevel:'detailed' },
    // Sección de transferencias, líneas ORDINARIAS (no capitaliza, ver comentario de cabecera).
    { rawLabel:'Troškovi stjecanja registracija igrača (uključujući troškove ustupanja)', normalizedCategory:'player_amortisation', amountNative:-1.802429, disclosureLevel:'detailed' },
    { rawLabel:'Nekapitalizirani troškovi za naknade agentima/posrednicima', normalizedCategory:'other_expenses', amountNative:-0.592330, disclosureLevel:'detailed' },
  ],
};

const hajduksplitHrFiscalYearMeta = {
  2024: {
    currency:'EUR', fxRef:'EUR@2024-12-31',
    sourceId:'hajduksplit-hr-financijsko-izvjesce-2024',
    reportType:'official_balance_sheet',
    gestionId:'actual',
    assetSales:0,
    // Financijski prihodi(0) - Financijski rashodi(810.410) + Neto tečajne razlike(78.153).
    netInterest:-0.732257,
    tax:0,
    // grossDebt = Bankovni i ostali zajmovi (corriente 5.124.513 + no corriente 0). cash = Novac i
    // novčani ekvivalenti.
    grossDebt:5.124513, cash:1.414039,
    officialTotalRevenue:27.405491, officialTotalExpenses:37.410081, officialPAT:-10.736847,
  },
};

const hajduksplitHrPresupuestoOverlayByYear = {};

const hajduksplitHrPasesData = [];
const hajduksplitHrResultadosData = {};
const hajduksplitHrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['hajduksplit-hr'] = {
  revenueLinesByYear: hajduksplitHrRevenueLinesByYear, expenseLinesByYear: hajduksplitHrExpenseLinesByYear,
  fiscalYearMeta: hajduksplitHrFiscalYearMeta, pasesData: hajduksplitHrPasesData,
  resultadosData: hajduksplitHrResultadosData, titulosData: hajduksplitHrTitulosData,
  presupuestoOverlayByYear: hajduksplitHrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'hajduksplit-hr-financijsko-izvjesce-2024': {
    id:'hajduksplit-hr-financijsko-izvjesce-2024', clubId:'hajduksplit-hr',
    title:'Godišnji financijski izvještaji za posebne namjene za 2024. godinu (Financijski kriterij FO2)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Balance auditado de HNK Hajduk s.d.d., preparado según el Pravilnik o licenciranju i financijskoj održivosti klubova de la HNS. Auditor: Kalibović i partneri d.o.o. Dictamen limpio, sin salvedades. El documento fuente presenta varias celdas con calidad de OCR media (dígitos truncados o perdidos); los valores afectados se reconstruyeron cruzando contra los subtotales "Ukupno" impresos (ver comentario de cabecera de data/hajduksplit-hr-data.js para el detalle de cada reconstrucción). Transcripción completa en Clubes/Croacia/Hajduk Split/financijsko-izvjesce-2024.md.',
  },
});

gestionesByClub['hajduksplit-hr'] = {
  actual: { nombre:'Gestión actual', firstYear:2024, lastYear:2024 },
};

memberCountByClub['hajduksplit-hr'] = null;
