const besiktastrRevenueLinesByYear = {
  2023: [
    { rawLabel:'Lisanslı ürün satış gelirleri', normalizedCategory:'sponsorship_commercial', amountNative:318.834226, disclosureLevel:'aggregated' },
    { rawLabel:'Maç hasılatları ve kombine kart loca geliri', normalizedCategory:'matchday_competition', amountNative:306.124129, disclosureLevel:'aggregated' },
    { rawLabel:'Sponsorluk ve reklam geliri', normalizedCategory:'sponsorship_commercial', amountNative:258.089187, disclosureLevel:'aggregated' },
    { rawLabel:'İsim ve lisans hakkı gelirleri', normalizedCategory:'sponsorship_commercial', amountNative:256.609946, disclosureLevel:'aggregated' },
    { rawLabel:'Yayın gelirleri', normalizedCategory:'broadcasting', amountNative:157.273762, disclosureLevel:'aggregated' },
    { rawLabel:'UEFA gelirleri', normalizedCategory:'competition_bonus', amountNative:25.085224, disclosureLevel:'aggregated' },
    { rawLabel:'Futbolcu kiralama ve yetiştirme gelirleri', normalizedCategory:'player_sales', amountNative:4, disclosureLevel:'aggregated' },
    { rawLabel:'Diğer', normalizedCategory:'other_income', amountNative:21.14976, disclosureLevel:'aggregated' },
    { rawLabel:'Satıştan iadeler (-)', normalizedCategory:'other_income', amountNative:-14.508349, disclosureLevel:'aggregated' },
    { rawLabel:'Satış iskontoları / indirimleri (-)', normalizedCategory:'other_income', amountNative:-5.19232, disclosureLevel:'aggregated' },
    { rawLabel:'Konusu kalmayan karşılıklar', normalizedCategory:'other_income', amountNative:23.999743, disclosureLevel:'aggregated' },
    { rawLabel:'Esas faaliyetlerden kur farkı gelirleri', normalizedCategory:'other_income', amountNative:6.786205, disclosureLevel:'aggregated' },
    { rawLabel:'Esas faaliyetlerden diğer gelirler (*)', normalizedCategory:'other_income', amountNative:0.93899, disclosureLevel:'aggregated' },
    { rawLabel:'Yatırım faaliyetlerinden gelirler', normalizedCategory:'other_income', amountNative:244.757769, disclosureLevel:'aggregated' },
  ],
};
const besiktastrExpenseLinesByYear = {
  2023: [
    { rawLabel:'Satılan ticari mallar maliyeti', normalizedCategory:'other_expenses', amountNative:-154.337332, disclosureLevel:'aggregated' },
    { rawLabel:'Ücret giderleri', normalizedCategory:'wages_squad', amountNative:-1091.502916, disclosureLevel:'aggregated' },
    { rawLabel:'Maç giderleri', normalizedCategory:'match_organisation_expense', amountNative:-53.191966, disclosureLevel:'aggregated' },
    { rawLabel:'Seyahat giderleri', normalizedCategory:'match_organisation_expense', amountNative:-39.680673, disclosureLevel:'aggregated' },
    { rawLabel:'Futbolcu kiralama giderleri', normalizedCategory:'other_expenses', amountNative:-8.269985, disclosureLevel:'aggregated' },
    { rawLabel:'Federasyon giderleri', normalizedCategory:'match_organisation_expense', amountNative:-6.73162, disclosureLevel:'aggregated' },
    { rawLabel:'Malzeme giderleri', normalizedCategory:'other_expenses', amountNative:-4.92676, disclosureLevel:'aggregated' },
    { rawLabel:'Diğer giderler', normalizedCategory:'other_expenses', amountNative:-199.047449, disclosureLevel:'aggregated' },
    { rawLabel:'Personel ücret ve giderleri', normalizedCategory:'admin_general_expense', amountNative:-25.025962, disclosureLevel:'aggregated' },
    { rawLabel:'Lojistik hizmet gideri', normalizedCategory:'admin_general_expense', amountNative:-8.203455, disclosureLevel:'aggregated' },
    { rawLabel:'Yemek giderleri', normalizedCategory:'admin_general_expense', amountNative:-3.065111, disclosureLevel:'aggregated' },
    { rawLabel:'Kargo ve nakliye giderleri', normalizedCategory:'admin_general_expense', amountNative:-2.017497, disclosureLevel:'aggregated' },
    { rawLabel:'Ambalaj malzemesi giderleri', normalizedCategory:'admin_general_expense', amountNative:-1.616513, disclosureLevel:'aggregated' },
    { rawLabel:'Reklam ve ilan giderleri', normalizedCategory:'admin_general_expense', amountNative:-0.806602, disclosureLevel:'aggregated' },
    { rawLabel:'Tanıtım, fuar ve sergi giderleri', normalizedCategory:'admin_general_expense', amountNative:-0.699769, disclosureLevel:'aggregated' },
    { rawLabel:'Web yayın giderleri', normalizedCategory:'admin_general_expense', amountNative:-0.553238, disclosureLevel:'aggregated' },
    { rawLabel:'Haberleşme giderleri', normalizedCategory:'admin_general_expense', amountNative:-0.265112, disclosureLevel:'aggregated' },
    { rawLabel:'Diğer', normalizedCategory:'other_expenses', amountNative:-15.768111, disclosureLevel:'aggregated' },
    { rawLabel:'Müşavirlik, dava ve icra noter giderleri', normalizedCategory:'admin_general_expense', amountNative:-13.891789, disclosureLevel:'aggregated' },
    { rawLabel:'Personel ücret ve giderleri', normalizedCategory:'admin_general_expense', amountNative:-3.413304, disclosureLevel:'aggregated' },
    { rawLabel:'Şüpheli alacak karşılık giderleri', normalizedCategory:'other_expenses', amountNative:-2.538822, disclosureLevel:'aggregated' },
    { rawLabel:'Vergi resim ve harçlar', normalizedCategory:'admin_general_expense', amountNative:-1.803395, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisman ve tükenme/itfa payları', normalizedCategory:'depreciation', amountNative:-0.687806, disclosureLevel:'aggregated' },
    { rawLabel:'Danışmanlık giderleri', normalizedCategory:'admin_general_expense', amountNative:-0.564212, disclosureLevel:'aggregated' },
    { rawLabel:'Haberleşme giderleri', normalizedCategory:'admin_general_expense', amountNative:-0.450966, disclosureLevel:'aggregated' },
    { rawLabel:'Kargo ve nakliye giderleri', normalizedCategory:'admin_general_expense', amountNative:-0.072604, disclosureLevel:'aggregated' },
    { rawLabel:'Diğer giderler', normalizedCategory:'other_expenses', amountNative:-5.742031, disclosureLevel:'aggregated' },
    { rawLabel:'Esas faaliyetlerden kur farkı giderleri', normalizedCategory:'other_expenses', amountNative:-120.888145, disclosureLevel:'aggregated' },
    { rawLabel:'Dava karşılık giderleri', normalizedCategory:'other_expenses', amountNative:-14.995326, disclosureLevel:'aggregated' },
    { rawLabel:'Esas faaliyetlerden diğer giderler', normalizedCategory:'other_expenses', amountNative:-10.147485, disclosureLevel:'aggregated' },
    { rawLabel:'Vade farkı gideri', normalizedCategory:'other_expenses', amountNative:-0.518746, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisman ve tükenme payları (futbolcu lisansları, nota 12)', normalizedCategory:'player_amortisation', amountNative:-129.58709, disclosureLevel:'aggregated' },
    { rawLabel:'Amortisman ve tükenme payları (maddi duran varlıklar ve kullanım hakkı)', normalizedCategory:'depreciation', amountNative:-23.085014, disclosureLevel:'aggregated' },
  ],
};
const besiktastrFiscalYearMeta = {
  2023: {
    currency:'TRY', fxRef:'TRY@2023-05-31',
    sourceId:'besiktas-tr-futbol-bilanco-31-05-2023',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-128.260099, tax:-38.553939,
    extraRows: [
      {label:'Finansman gelirleri', value:213.871165},
      {label:'Finansman giderleri (-)', value:-342.131264},
      {label:'Dönem vergi gideri', value:-39.679793},
      {label:'Ertelenmiş vergi geliri/(gideri)', value:1.125854},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1603.948272, officialTotalExpenses:1944.096806, officialPAT:-506.962572,
  },
};
const besiktastrPresupuestoOverlayByYear = {};

const besiktastrPasesData = [];
const besiktastrResultadosData = {};
const besiktastrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['besiktas-tr'] = {
  revenueLinesByYear: besiktastrRevenueLinesByYear, expenseLinesByYear: besiktastrExpenseLinesByYear,
  fiscalYearMeta: besiktastrFiscalYearMeta, pasesData: besiktastrPasesData,
  resultadosData: besiktastrResultadosData, titulosData: besiktastrTitulosData,
  presupuestoOverlayByYear: besiktastrPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'besiktas-tr-futbol-bilanco-31-05-2023': {
    id:'besiktas-tr-futbol-bilanco-31-05-2023', clubId:'besiktas-tr',
    title:'Beşiktaş Futbol Yatırımları Sanayi ve Ticaret A.Ş. — besiktas-futbol-bilanco-31-05-2023 (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
  },
});

memberCountByClub['besiktas-tr'] = null;
