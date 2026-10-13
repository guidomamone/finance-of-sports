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
    netInterest:-0.732257,
    tax:0,
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
