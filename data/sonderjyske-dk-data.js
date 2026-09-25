// ============================================================================
// data/sonderjyske-dk-data.js — Sønderjyske Fodbold A/S (Haderslev, Dinamarca),
// clubId 'sonderjyske-dk'. Cierre 30/6/2022 (ejercicio 1/7/2021-30/6/2022, temporada
// deportiva 2021/22) → clave 2022.
//
// FUENTE: `Clubes/Dinamarca/SønderjyskE/aarsrapport-2022-06-30.md` (única fuente
// asignada para este club en esta sesión; el archivo tiene años 2013-2025
// disponibles, pero solo se cargó el pedido). PDF con capa de texto nativa, informe
// aflagt efter årsregnskabslovens bestemmelser for klasse B-virksomheder (con
// tilvalg de algunas normas de clase C) — un escalón MENOS detallado que Silkeborg/
// Viborg/FCK (clase C), sin nota de "Revenue" que desglose por categoría. Auditor: EY
// (Michael Anker), sin salvedades.
//
// OJO — FORMATO "BRUTTOFORTJENESTE" (§32 ÅRL), MÁS AGREGADO QUE EL DE
// midtjylland-dk: la Resultatopgørelse arranca directo en "Bruttofortjeneste"
// (Ganancia Bruta), que por nota de política contable (pág. 11) es "nettoomsætning,
// vareforbrug, andre driftsindtægter og eksterne omkostninger... sammendraget til én
// regnskabspost" — es decir, Revenue NETO no solo del costo de ventas (como en el
// caso de Bruttofortjeneste que motivó a evitar el ejercicio 2022/23-2023/24 de
// midtjylland-dk) sino TAMBIÉN de "eksterne omkostninger" (gastos operativos
// externos: administración, organización de partidos, etc., que en cualquier otro
// club cargado es una línea de GASTO separada). Se decidió cargar igual este
// ejercicio (es el único asignado para este club en esta sesión), dejando
// explícitamente documentado que "Revenue"/"Expenses" acá NO son comparables 1:1
// contra un club con Nettoomsætning propia (ej. silkeborg-dk/viborg-dk): el PAT
// cierra exacto, pero el desglose Revenue/Expenses es más agregado de lo habitual.
// PREGUNTA ABIERTA (Admin/dudas-por-club.md): si conviene, en una sesión futura,
// cargar en su lugar un ejercicio más antiguo de este mismo club (2013-2021 SÍ están
// disponibles como .md) que sí desglose Nettoomsætning, mismo criterio que se usó
// para elegir el ejercicio 2018/19 de FC Midtjylland en vez de uno más reciente.
//
// INGRESOS (Resultatopgørelse pág. 8 + Nota "Særlige poster" pág. 16, DKK):
//   Bruttofortjeneste total: 21.464.987.
//   De esa cifra, la Nota "Særlige poster" identifica EXACTO cuánto es compensación
//     COVID-19 ("Kompensation for aflyste arrangementer og lønomkostninger"),
//     16.311.422, indicando explícito que "Særlige poster indgår på følgende linjer:
//     Bruttofortjeneste" → se promovió a línea propia, other_income (no es negocio de
//     fútbol recurrente, es una compensación estatal extraordinaria por COVID).
//   Residuo (21.464.987-16.311.422 = 5.153.565): el margen "de fútbol" propiamente
//     dicho, ya neto de vareforbrug/eksterne omkostninger por el formato §32 (ver
//     nota de arriba) → lump_football_operations, con su label dejando explícito que
//     NO es Revenue bruto.
//   officialTotalRevenue = 16.311.422+5.153.565 = 21.464.987 (= Bruttofortjeneste
//     impreso, exacto).
//
// GASTOS (Resultatopgørelse + Nota 1 "Personaleomkostninger" + Nota "Immaterielle
//   anlægsaktiver"/"Materielle anlægsaktiver" pág. 16-17):
//   wages_squad = Personaleomkostninger (-50.298.641: Lønninger 45.442.396 + Pensioner
//     1.453.435 + Andre omkostninger til social sikring 607.087 + Andre
//     personaleomkostninger 2.795.723) — sin separar plantel/resto del personal, se
//     carga completo (mismo criterio que dender-be/charleroi-be sin ese desglose).
//   player_amortisation = Årets afskrivninger de "Kontraktrettigheder" (-2.229.341,
//     Nota "Immaterielle anlægsaktiver"). CONFIRMADO por la política contable (pág.
//     12, "Immaterielle anlægsaktiver": "Andre immaterielle anlægsaktiver omfatter
//     kontrakt- og navnerettigheder. Kontraktrettigheder indregnes i balancen til
//     anskaffelsessummer (transfersummer)...") que esto ES depreciación de
//     registraciones de jugadores, a diferencia de dender-be donde esa confirmación
//     no existe.
//   depreciation = Årets afskrivninger de "Materielle anlægsaktiver" (-0.397022:
//     Andre anlæg/driftsmateriel/inventar -0.297495 + Indretning af lejede lokaler
//     -0.099527).
//   La suma (2.229.341+397.022=2.626.363) reconcilia contra "Af- og nedskrivninger af
//     immaterielle og materielle anlægsaktiver" impreso en la Resultatopgørelse
//     (-2.626.364) con diferencia de DKK 1, redondeo del propio documento.
//   officialTotalExpenses = 50.298.641+2.229.341+0.397022... = 52.925.004 (positivo).
//
// RESULTADO FINANCIERO: solo "Finansielle omkostninger" (-522.751) impreso, sin línea
//   de "Finansielle indtægter" separada (Resultat før finansielle poster -31.460.018
//   menos 522.751 = Resultat før skat -31.982.769, exacto, confirma que no hay ingreso
//   financiero adicional este ejercicio) → netInterest -0.522751.
// TAX: Skat af årets resultat = 0 este ejercicio (sí hubo -5.163.685 el ejercicio
//   anterior 2020/21, no aplica acá).
//
// TIE-OUT FINAL (verificado contra "Årets resultat" impreso, pág. 8):
//   revenue 21.464.987 - expenses 52.925.004 + netInterest (522.751) + tax 0 =
//   -31.982.768, contra -31.982.769 impreso — diferencia de DKK 1, redondeo del
//   propio documento (mismo orden de magnitud que la diferencia ya documentada en
//   la nota de depreciación de arriba).
//
// CONTEXTO DEL EJERCICIO (Ledelsesberetning, pág. 7): "et meget dårligt år"
//   (económicamente muy malo), con pérdida de más de la mitad del capital social
//   ("tabt mere end halvdelen af sin selskabskapital", régimen de "kapitaltab" de la
//   ley societaria danesa). Después del cierre, la controlante aportó DKK 25M de
//   "koncerntilskud" (aporte de grupo) y los dueños emitieron una carta de apoyo de
//   liquidez — informe preparado bajo el principio de empresa en marcha
//   ("going-concern") en base a esos 2 hechos posteriores. Después del cierre
//   (Begivenheder efter balancedagen) el club fue adquirido por Euro Steel-koncernen
//   y Davidsen-koncernen.
//
// MONEDA: DKK. El documento NO declara un tipo de cambio propio (no hay Anexo de
//   moneda extranjera). 'DKK@2022-06-30' NO existe en FX_CLOSE (data/currency-map.js)
//   — se calculó acá mismo como LITERAL (no se puede tocar currency-map.js): cruce
//   EUR/DKK × EUR/USD, ambos del 30/6/2022 (fuente: Pound Sterling Live, tasas de
//   referencia estilo BCE/Danmarks Nationalbank — EUR/DKK mid 7,4362; EUR/USD close
//   1,0477). fx (DKK por 1 USD) = 7,4362 / 1,0477 = 7,0980. fxSource:'market_close'
//   (no 'document_close', el documento no declara ninguno). CANDIDATO A PROMOVER a
//   FX_CLOSE en una sesión futura si se carga otro club/ejercicio con el mismo cierre
//   30/6/2022.
//
// grossDebt: Kortfristet del af langfristede gældsforpligtelser (2.000.000) + Gæld
//   til banker (7.892.593) + Langfristede gældsforpligtelser - Anden gæld
//   (4.187.740) = 14.080.333 — CRITERIO CONSERVADOR: se excluyó "Gæld til
//   tilknyttede virksomheder" (11.761.099, deuda con partes relacionadas/grupo, no
//   deuda financiera bancaria) y "Anden gæld" de corto plazo (11.231.909, rótulo
//   ambiguo, podría incluir deuda o no) — ver Admin/dudas-por-club.md si conviene
//   revisar este criterio. cash: Likvide beholdninger = 14.547 (muy bajo, consistente
//   con el "kapitaltab" narrado en la Ledelsesberetning).
//
// GESTIÓN: Bestyrelse (Søren Peder Dalager Davidsen, formand) vigente al cierre y a
//   la firma — pero la sociedad cambió de dueño DESPUÉS del cierre (Euro Steel +
//   Davidsen-koncernen), y no hay un criterio de "gestión" tipo club argentino acá
//   (sociedad anónima) → gestionId: null, sin entrada en gestionesByClub.
// ============================================================================

const sonderjyskeDkRevenueLinesByYear = {
  2022: [
    { rawLabel:'Kompensation for aflyste arrangementer og lønomkostninger, COVID-19 (Note "Særlige poster")', normalizedCategory:'other_income', amountNative:16.311422, disclosureLevel:'detailed' },
    { rawLabel:'Bruttofortjeneste, resto (nettoomsætning, vareforbrug, andre driftsindtægter og eksterne omkostninger sammendraget, § 32 ÅRL — NO es revenue bruto)', normalizedCategory:'lump_football_operations', amountNative:5.153565, disclosureLevel:'aggregated' },
  ],
};

const sonderjyskeDkExpenseLinesByYear = {
  2022: [
    { rawLabel:'Personaleomkostninger', normalizedCategory:'wages_squad', amountNative:-50.298641, disclosureLevel:'detailed', items:[
      ['Lønninger', -45.442396], ['Pensioner', -1.453435], ['Andre omkostninger til social sikring', -0.607087], ['Andre personaleomkostninger', -2.795723],
    ]},
    { rawLabel:'Årets afskrivninger — Kontraktrettigheder (immaterielle anlægsaktiver)', normalizedCategory:'player_amortisation', amountNative:-2.229341, disclosureLevel:'detailed' },
    { rawLabel:'Årets afskrivninger — materielle anlægsaktiver', normalizedCategory:'depreciation', amountNative:-0.397022, disclosureLevel:'detailed', items:[
      ['Andre anlæg, driftsmateriel og inventar', -0.297495], ['Indretning af lejede lokaler', -0.099527],
    ]},
  ],
};

const sonderjyskeDkFiscalYearMeta = {
  2022: {
    currency:'DKK',
    // 'DKK@2022-06-30' no existe en FX_CLOSE — calculado acá: EUR/DKK mid 7,4362 ÷
    // EUR/USD close 1,0477 (30/6/2022, Pound Sterling Live) = 7,0980 DKK por USD.
    fxRef:'DKK@2022-06-30', // promovido a FX_CLOSE en la integración (data/currency-map.js)
    sourceId:'sonderjyske-dk-aarsrapport-2022',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    // Finansielle omkostninger (no hay Finansielle indtægter impresas este ejercicio).
    netInterest:-0.522751,
    tax:0,
    // grossDebt = Kortfristet del af langfristede(2.000000) + Gæld til banker(7.892593)
    // + Langfristede gældsforpligtelser Anden gæld(4.187740). Excluye deuda con partes
    // relacionadas y "Anden gæld" de corto plazo ambigua (ver comentario de cabecera).
    grossDebt:14.080333, cash:0.014547,
    officialTotalRevenue:21.464987, officialTotalExpenses:52.925004, officialPAT:-31.982769,
  },
};

const sonderjyskeDkPresupuestoOverlayByYear = {};

const sonderjyskeDkPasesData = [];
const sonderjyskeDkResultadosData = {};
const sonderjyskeDkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sonderjyske-dk'] = {
  revenueLinesByYear: sonderjyskeDkRevenueLinesByYear, expenseLinesByYear: sonderjyskeDkExpenseLinesByYear,
  fiscalYearMeta: sonderjyskeDkFiscalYearMeta, pasesData: sonderjyskeDkPasesData,
  resultadosData: sonderjyskeDkResultadosData, titulosData: sonderjyskeDkTitulosData,
  presupuestoOverlayByYear: sonderjyskeDkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'sonderjyske-dk-aarsrapport-2022': {
    id:'sonderjyske-dk-aarsrapport-2022', clubId:'sonderjyske-dk',
    title:'Sønderjyske Fodbold A/S — Årsrapport 2021/22 (01.07.2021 - 30.06.2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Informe clase B (con algunas normas de clase C), formato "Bruttofortjeneste" que combina Nettoomsætning, vareforbrug, andre driftsindtægter Y eksterne omkostninger en una sola línea (§32 ÅRL) — más agregado que otros clubes daneses cargados (silkeborg-dk/viborg-dk/fckobenhavn-dk), que sí desglosan Revenue. Auditor: EY (Michael Anker), sin salvedades. Ejercicio de pérdida severa con pérdida de más de la mitad del capital social ("kapitaltab"); aporte de grupo de DKK 25M y carta de apoyo de liquidez de los dueños después del cierre sostienen el principio de empresa en marcha. Cambio de control societario después del cierre (Euro Steel-koncernen + Davidsen-koncernen). Transcripción completa en Clubes/Dinamarca/SønderjyskE/aarsrapport-2022-06-30.md.',
  },
});

memberCountByClub['sonderjyske-dk'] = null;
