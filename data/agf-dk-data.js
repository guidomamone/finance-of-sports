// ============================================================================
// data/agf-dk-data.js — AGF A/S (clubId 'agf-dk'), Aarhus, Dinamarca. Ejercicio fiscal
// 2020/21 (1° de julio de 2020 a 30 de junio de 2021, `fiscalYearStart:'07-01'` — a
// diferencia de fckobenhavn-dk/brondby-dk que son año calendario, mismo criterio de
// cierre de ejercicio que midtjylland-dk).
//
// ENTIDAD Y PERÍMETRO: AGF A/S ("AGF Fodbold") es la sociedad que cotiza en Nasdaq
// Copenhagen, y su Koncern (grupo consolidado) integra AGF Esport ApS (57%), Atletion
// A/S — dueña de Ceres Park & Arena, el estadio (100%), AGF Kvindefodbold ApS (fútbol
// femenino, 80%) y Stadion Fysioterapi ApS (vía Atletion, 100%). A diferencia de
// fckobenhavn-dk (donde SÍ existía una entidad separada, F.C. København P/S, que aísla
// el fútbol masculino del estadio/holding), acá NO hay una entidad "solo fútbol"
// separada — AGF A/S reporta sus 2 segmentos operativos (Sport y Faciliteter) DENTRO de
// una única entidad legal, igual que el criterio "kombinirani/combinado" ya usado para
// los 3 clubes croatas (Osijek/Dinamo Zagreb/etc., que también combinan el club con su
// sociedad dueña del estadio). Se cargó el Koncern CONSOLIDADO (no el Moderselskab,
// columna paralela que el propio documento también publica) por ser el perímetro más
// completo y el que declara los ingresos/gastos con más detalle en notas 4-11.
//
// Fuente: transcripción completa en "Clubes/Dinamarca/AGF/aarsrapport-2021-06-30.md"
// (aarsrapport 2020/2021, texto nativo bien alineado, sin necesidad de OCR).
//
// Cifras en DKK MILLONES nativos (documento en t.kr. = miles de coronas, dividido por
// 1.000 al cargar, mismo criterio que fckobenhavn-dk/brondby-dk/midtjylland-dk).
// `fxRef:'DKK@2021-06-30'` porque el documento no declara ningún tipo de cambio propio a
// USD — se usó el cruce DKK/EUR (7,4362) × EUR/USD (1,1884) del BCE al 30/6/2021 =
// 6,2573 DKK por USD (mismo método que fckobenhavn-dk para DKK@2024-12-31). ENTRADA
// NUEVA, todavía no existe en data/currency-map.js, ver reporte de carga.
//
// CATEGORIZACIÓN DE INGRESOS (Nota 4 "Nettoomsætning", Koncern 2020/21 = 143.774,
// verificado exacto contra el subtotal impreso):
//   - "Entré- og tv-indtægter" (entradas de partido Y TV COMBINADAS, el documento no las
//     separa) 34.673 → broadcasting. Elegida por descarte: la Ledelsesberetning explica
//     que el salto de 21 a 35 mio. kr. se debe al corrimiento de partidos de la
//     temporada 2019/20 hacia este ejercicio (por COVID-19) y al mismo tiempo aclara que
//     la recaudación de ENTRADAS estuvo negativamente afectada por límites de aforo
//     ("har blandt andet påvirket matchday-indtægterne grundet tilskuerbegrænsningerne")
//     — el aumento es más consistente con más partidos TELEVISADOS que con más público
//     físico. Aproximación documentada, no una certeza — ver Admin/dudas-por-club.md.
//   - "Indtægter fra samarbejdspartnere og sponsorer" 66.973 → sponsorship_commercial.
//   - "Udlejningsvirksomhed" (alquiler de propiedad/locales, actividad del segmento
//     Faciliteter en Ceres Park & Arena) 7.148 → stadium_other.
//   - "Anden omsætning, tjenesteydelser" (otros servicios) 13.524 → other_income.
//   - "Restaurations- og cateringvirksomhed" (F&B/catering del estadio) 8.385 →
//     stadium_other (mismo criterio que fckobenhavn-dk "Food & Beverage").
//   - "Arrangementer, billetsalg" (venta de entradas para EVENTOS del estadio, no
//     partidos — conciertos/ferias en Ceres Park & Arena, segmento Faciliteter) 3.621 →
//     stadium_other.
//   - "Anden omsætning, varesalg" (venta de mercadería) 9.450 → sponsorship_commercial
//     (mismo criterio que merchandising de fckobenhavn-dk/brondby-dk).
//   Nota 8 "Andre driftsindtægter og -omkostninger" (Koncern 2020/21):
//   - "Nettotransferindtægter" (resultado NETO de ingresos por transferencias, el
//     documento no da un bruto de venta separado del costo) 28.637 → player_sales, línea
//     ordinaria SIN netear en fiscalYearMeta (mismo criterio que fckobenhavn-dk: el
//     documento da una única cifra "Andre driftsindtægter", no un desglose de
//     capitalización/amortización/disposición como sí tiene Dinamo Zagreb).
//   - "Gevinst på salg af anlægsaktiver" (ganancia por venta de activos fijos, NO
//     jugadores) +6 y "Tab på salg af anlægsaktiver" (pérdida) -298 → van a
//     `fiscalYearMeta.assetSales` (neto -292), no como línea (club-data-mapping SKILL.md
//     sección 2: ganancias/pérdidas de venta de activos fijos van SIEMPRE a meta, nunca a
//     revenueLines/expenseLines).
//
// CATEGORIZACIÓN DE GASTOS:
//   Nota 5 "Eksterne omkostninger" (Koncern 2020/21 = 62.469, verificado exacto):
//   - "Kamp- og spilleromkostninger" (gastos de partido/plantel) 20.730 →
//     match_organisation_expense.
//   - "Driftsomkostninger" (gastos operativos, ligados al segmento Faciliteter/estadio)
//     6.296 → admin_general_expense.
//   - "Salgs- og markedsføringsomkostninger" 16.783 → admin_general_expense.
//   - "Administrationsomkostninger" 12.865 → admin_general_expense.
//   - "Vareforbrug i restaurations- og cateringvirksomhed" (costo de mercadería F&B)
//     5.161 → other_expenses (mismo criterio que "Vareforbrug" de fckobenhavn-dk).
//   - "Andre omkostninger" 634 → other_expenses.
//   Nota 6 "Personaleomkostninger" (86.507, SIN desglose por departamento — plantel y
//     resto del personal mezclados, mismo caso que fckobenhavn-dk/brondby-dk) →
//     wages_squad, la cifra completa (Lønninger og gager 79.770 + Pensionsordninger
//     2.736 + Social sikring 849 + Bestyrelseshonorar 1.125 + Øvrige 2.247 - Refunderede
//     dagpenge 220).
//   Nota 7 "Af- og nedskrivninger" (18.744, desglosada línea por línea):
//     "Kontraktrettigheder" (amortización de pases) 10.841 → player_amortisation.
//     "Ombygning af lejede lokaler" + "Driftsmateriel og inventar" + "Leasingaktiver"
//     (depreciación de mejoras a locales alquilados, equipamiento, y activos de leasing
//     IFRS16) 3.096+2.586+2.221=7.903 → depreciation, agrupadas con `items`.
//   Nota 8: "Nettotransferomkostninger" (costo NETO de transferencias, la contraparte de
//     Nettotransferindtægter de arriba) -356 → player_amortisation (mismo bucket
//     "Compra de jugadores" que la amortización de la Nota 7, ambas son costo de
//     actividad de transferencias).
//
// RESULTADOS FINANCIEROS: "Finansielle indtægter" (5.193) - "Finansielle omkostninger"
// (328) = netInterest 4.865 (fiscalYearMeta, coincide EXACTO con "Resultat af
// finansielle poster" de la tabla de 5 años de la Ledelsesberetning).
//
// IMPUESTO: "Skat af årets resultat" = +500 (un BENEFICIO, no un gasto — reconocimiento
// de activo por impuesto diferido no reconocido en ejercicios anteriores, nota 11) →
// tax:+0.500 (positivo, suma al resultado).
//
// VERIFICACIÓN (regla #1 de CLAUDE.md, "precisión antes que velocidad"):
//   revenueLines suman 188.321 (143.774 Nettoomsætning + 44.547 de Andre driftsindtægter
//   sin la ganancia de 6 por venta de activos, que va a assetSales) = officialTotalRevenue.
//   expenseLines suman 168.076 (62.469 Eksterne omkostninger + 86.507 Personaleomkostninger
//   + 18.744 Af-/nedskrivninger + 0.356 Nettotransferomkostninger, sin la pérdida de 298
//   por venta de activos, que va a assetSales) = officialTotalExpenses.
//   188.321 - 168.076 = 20.245; 20.245 + assetSales(-0.292) = 19.953, EXACTO igual al
//   "Resultat før finansielle poster" impreso.
//   19.953 + netInterest(4.865) = 24.818, EXACTO igual a "Resultat før skat" impreso.
//   24.818 + tax(0.500) = 25.318, EXACTO igual a "Årets resultat / totalindkomst"
//   (officialPAT) impreso. Cierre perfecto en tres pasos, cada uno contra un subtotal
//   impreso del documento.
//
// grossDebt: "Leasingforpligtelser" (pasivo de leasing IFRS16, corriente 2.223 + no
//   corriente 2.404 = 4.627) es la única línea de deuda reconocible en el balance —
//   Leverandørgæld (proveedores), Anden gæld (otra deuda sin desglosar), Periodiseret
//   omsætning/Modtagne forudbetalinger (ingresos diferidos/anticipos de clientes) son
//   pasivos operativos, no deuda financiera. Aproximación (no hay línea de "préstamo
//   bancario" explícita en este balance) — ver reporte de carga. cash: Likvide
//   beholdninger (Koncern) = 29.347.
// ============================================================================

const agfdkRevenueLinesByYear = {
  2021: [
    { rawLabel:'Entré- og tv-indtægter (entradas y TV combinadas, la fuente no las separa)', normalizedCategory:'broadcasting', amountNative:34.673, disclosureLevel:'detailed' },
    { rawLabel:'Indtægter fra samarbejdspartnere og sponsorer', normalizedCategory:'sponsorship_commercial', amountNative:66.973, disclosureLevel:'detailed' },
    { rawLabel:'Anden omsætning, varesalg (merchandising)', normalizedCategory:'sponsorship_commercial', amountNative:9.450, disclosureLevel:'detailed' },
    { rawLabel:'Udlejningsvirksomhed + Restaurations- og cateringvirksomhed + Arrangementer/billetsalg (Ceres Park & Arena, segmento Faciliteter)', normalizedCategory:'stadium_other', amountNative:19.154, disclosureLevel:'detailed', items:[
      ['Udlejningsvirksomhed', 7.148], ['Restaurations- og cateringvirksomhed', 8.385], ['Arrangementer, billetsalg', 3.621],
    ]},
    { rawLabel:'Anden omsætning, tjenesteydelser', normalizedCategory:'other_income', amountNative:13.524, disclosureLevel:'detailed' },
    { rawLabel:'Offentlige tilskud (subvenciones estatales COVID-19)', normalizedCategory:'other_income', amountNative:15.910, disclosureLevel:'detailed' },
    { rawLabel:'Nettotransferindtægter', normalizedCategory:'player_sales', amountNative:28.637, disclosureLevel:'detailed' },
  ],
};

const agfdkExpenseLinesByYear = {
  2021: [
    { rawLabel:'Kamp- og spilleromkostninger', normalizedCategory:'match_organisation_expense', amountNative:-20.730, disclosureLevel:'detailed' },
    { rawLabel:'Driftsomkostninger + Salgs- og markedsføringsomkostninger + Administrationsomkostninger', normalizedCategory:'admin_general_expense', amountNative:-35.944, disclosureLevel:'detailed', items:[
      ['Driftsomkostninger', -6.296], ['Salgs- og markedsføringsomkostninger', -16.783], ['Administrationsomkostninger', -12.865],
    ]},
    { rawLabel:'Vareforbrug i restaurations- og cateringvirksomhed + Andre omkostninger', normalizedCategory:'other_expenses', amountNative:-5.795, disclosureLevel:'detailed', items:[
      ['Vareforbrug i restaurations- og cateringvirksomhed', -5.161], ['Andre omkostninger', -0.634],
    ]},
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-86.507, disclosureLevel:'detailed' },
    { rawLabel:'Af- og nedskrivninger — Ombygning af lejede lokaler + Driftsmateriel og inventar + Leasingaktiver', normalizedCategory:'depreciation', amountNative:-7.903, disclosureLevel:'detailed', items:[
      ['Ombygning af lejede lokaler', -3.096], ['Driftsmateriel og inventar', -2.586], ['Leasingaktiver', -2.221],
    ]},
    { rawLabel:'Af- og nedskrivninger — Kontraktrettigheder + Nettotransferomkostninger', normalizedCategory:'player_amortisation', amountNative:-11.197, disclosureLevel:'detailed', items:[
      ['Amortisering af kontraktrettigheder', -10.841], ['Nettotransferomkostninger', -0.356],
    ]},
  ],
};

const agfdkFiscalYearMeta = {
  2021: {
    currency:'DKK', fxRef:'DKK@2021-06-30',
    sourceId:'agf-aarsrapport-2020-21',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, // ya capturado íntegro en player_sales/player_amortisation, ver comentario de cabecera
    // Gevinst (6) - Tab (298) på salg af anlægsaktiver (activos fijos, no jugadores).
    assetSales:-0.292,
    // Finansielle indtægter(5.193) - Finansielle omkostninger(328).
    netInterest:4.865,
    // Skat af årets resultat: BENEFICIO (reconocimiento de activo por impuesto diferido).
    tax:0.500,
    // grossDebt = Leasingforpligtelser (corriente 2.223 + no corriente 2.404), única línea
    // de deuda reconocible en el balance (no hay préstamo bancario explícito).
    grossDebt:4.627, cash:29.347,
    officialTotalRevenue:188.321, officialTotalExpenses:168.076, officialPAT:25.318,
  },
};

const agfdkPresupuestoOverlayByYear = {};

const agfdkPasesData = [];
const agfdkResultadosData = {};
const agfdkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['agf-dk'] = {
  revenueLinesByYear: agfdkRevenueLinesByYear, expenseLinesByYear: agfdkExpenseLinesByYear,
  fiscalYearMeta: agfdkFiscalYearMeta, pasesData: agfdkPasesData,
  resultadosData: agfdkResultadosData, titulosData: agfdkTitulosData,
  presupuestoOverlayByYear: agfdkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'agf-aarsrapport-2020-21': {
    id:'agf-aarsrapport-2020-21', clubId:'agf-dk',
    title:'AGF A/S — Årsrapport 2020/21 (1. juli 2020 - 30. juni 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cifras del Koncern (grupo consolidado: AGF A/S + AGF Esport ApS 57% + Atletion A/S/Ceres Park & Arena 100% + AGF Kvindefodbold ApS 80% + Stadion Fysioterapi ApS), no del Moderselskab (columna paralela que el documento también publica). No existe una entidad "solo fútbol" separada para AGF, a diferencia de F.C. København. Sin salvedades de auditoría. Transcripción completa en Clubes/Dinamarca/AGF/aarsrapport-2021-06-30.md.',
  },
});

memberCountByClub['agf-dk'] = null;
