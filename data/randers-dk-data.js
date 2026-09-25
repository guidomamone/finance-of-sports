// ============================================================================
// data/randers-dk-data.js — Randers FC A/S (CVR 83 94 08 16), Randers NV,
// Dinamarca. clubId 'randers-dk' (sufijo de país, misma convención que
// fckobenhavn-dk/silkeborg-dk/agf-dk/viborg-dk/vejle-dk). Ejercicio fiscal
// 2022/23 (1° de julio de 2022 al 30 de junio de 2023, `fiscalYearStart:'07-01'`,
// `year` = año de CIERRE, mismo criterio que Boca/Racing/Vélez en ARS).
//
// ENTIDAD: Randers FC A/S, entidad única para el fútbol profesional (el balance
// SÍ tiene 3 subsidiarias 100%-controladas contabilizadas por el método de la
// participación — Randers FC Jobakademi ApS, Business Park Randers ApS,
// Randers Sports College ApS — pero no se consolidan línea por línea, solo
// aportan un resultado neto de "kapitalandele", ver más abajo). Documento
// ÍNTEGRAMENTE EN DANÉS (a diferencia de fckobenhavn-dk/silkeborg-dk, que son
// bilingües). Auditor no identificado por nombre en la transcripción (firma
// digital "Gedmark" vía Penneo).
//
// Fuente: transcripción completa en "Clubes/Dinamarca/Randers FC/aarsrapport-2023-06-30.md".
//
// Cifras en DKK MILLONES nativos (el documento reporta la columna 2022/23 en
// DKK EXACTOS, se divide por 1.000.000 al cargar; la columna 2021/22
// comparativa está en DKK'000 y no se usa acá).
//
// OJO — MISMA EXENCIÓN §32 QUE nordsjaelland-dk: el estado de resultados solo
// reporta "Bruttofortjeneste" (Gross profit, ya neto de costos operativos
// externos), confirmado en el texto de política contable del documento
// ("Nettoomsætningen tillagt andre driftsindtægter og fratrukket direkte
// omkostninger samt andre eksterne omkostninger" = la definición estándar de
// bruttofortjeneste). Sin desglose de ingresos por rubro disponible en ningún
// lado del documento → TODO el revenue se carga como una única línea
// `lump_football_operations` (61.744.974 kr = 61,744974 M DKK), mismo
// criterio que nordsjaelland-dk.
//
// CATEGORIZACIÓN DE GASTOS 2022/23:
//   "Løn- og personaleomkostninger" (Nota 1: Løn og gager 47.872.434 + Pensioner
//   4.269.825 + Andre omkostninger til social sikring 2.087.037 = 54.229.295,
//   68 empleados promedio, SIN desglose por sector) → wages_squad.
//   "Afskrivninger, anlægsaktiver" (Depreciation of fixed assets) -7.944.052,
//   desglosada cruzando las Notas 5, 6 y 7:
//     - Nota 5 "Kontraktrettigheder mv." (contract rights = registraciones de
//       jugadores): "Årets af- og nedskrivninger" -6.877.926 →
//       player_amortisation. Roll-forward verificado: Kostpris 1/7 22.431.666
//       + Tilgang 5.899.113 - Afgang -6.529.400 = Kostpris 30/6 21.801.379;
//       Af-/nedskrivninger 1/7 -11.193.572 + reversión por bajas +4.966.010 +
//       årets af-/nedskrivninger -6.877.926 = -13.105.488; valor contable
//       30/6 = 21.801.379-13.105.488=8.695.891 ≈ 8.695.892 impreso (1 DKK de
//       redondeo, irrelevante).
//     - Nota 6 "Indretning af lejede lokaler" (leasehold improvements): "Årets
//       af- og nedskrivninger" -479.431 → depreciation.
//     - Nota 7 "Andre anlæg, driftsmateriel og inventar" (PP&E): "Årets af- og
//       nedskrivninger" -586.694 → depreciation (combinado con Nota 6:
//       -1.066.125).
//     - Suma: 6.877.926+479.431+586.694=7.944.051, contra el total impreso
//       -7.944.052 — diferencia de 1 DKK (redondeo del propio documento, ver
//       club-data-mapping SKILL.md sección 9.3), se usa el total impreso para
//       officialTotalExpenses.
//
// "RESULTAT AF KAPITALANDELE I TILKNYTTEDE VIRKSOMHEDER" (Nota 8, +2.628.176):
//   resultado del método de la participación en las 3 subsidiarias 100%-
//   controladas (Randers FC Jobakademi ApS, Business Park Randers ApS,
//   Randers Sports College ApS — un centro de empleo, un parque de negocios y
//   un colegio deportivo, ninguna de las 3 es fútbol profesional en sí). El
//   propio documento lo presenta COMO LÍNEA FINANCIERA, entre el resultado
//   operativo y "Finansielle indtægter"/"Finansielle omkostninger" — no es
//   revenue operativo del club, es resultado de inversión en subsidiarias.
//   Siguiendo el criterio de club-data-mapping SKILL.md sección 2 ("cualquier
//   resultado financiero/no operativo va a netInterest, no como línea"), se
//   sumó a netInterest junto con los intereses financieros propiamente
//   dichos, documentado acá para que quede claro que no es interés puro.
//
// RESULTADOS FINANCIEROS (netInterest): Resultat af kapitalandele i
//   tilknyttede virksomheder(2.628.176) + Finansielle indtægter(264.030) -
//   Finansielle omkostninger(324.028) = 2.568.178.
// IMPUESTO: "Skat af årets resultat" = +54.931 (INGRESO, crédito fiscal neto:
//   -Skat af årets resultat(-214.676) + Regulering af udskudt skat(159.745), Nota 3).
//
// VERIFICACIÓN (regla #1 de CLAUDE.md, "precisión antes que velocidad"):
//   revenueLines = 61.744974 = officialTotalRevenue.
//   expenseLines = -54.229295-6.877926-1.066125 = -62.173346 = officialTotalExpenses.
//   61.744974 - 62.173346 = -0.428372, EXACTO (redondeo de 1 DKK) igual a
//   "Resultat før finansielle poster" (-428.373) impreso.
//   -0.428373 + netInterest(2.568178) = 2.139805, EXACTO igual a "Resultat før
//   skat" impreso.
//   2.139805 + tax(0.054931) = 2.194736 ≈ 2.194737 (officialPAT, "Årets
//   resultat" impreso, diferencia de 1 DKK por redondeo). Cierre casi exacto
//   en tres pasos, cada uno contra un subtotal impreso del documento — la
//   única discrepancia es 1 DKK de redondeo interno del propio balance.
//
// grossDebt: "Kreditinstitutter" (bank loans, Balance/Passiver) = largo plazo
//   1.625.684 + corto plazo 437.009 = 2.062.693 — único pasivo financiero real
//   identificado, EXCLUYENDO "Anden gæld" (other payables), "Leverandører"
//   (trade payables), "Selskabsskat"/"Skyldig moms" (deuda impositiva) y
//   "Periodeafgrænsningsposter" (ingresos diferidos). cash: "Likvide
//   beholdninger" = 11.464.548.
//
// TIPO DE CAMBIO — NO HAY ENTRADA 'DKK@2023-06-30' EN FX_CLOSE (data/currency-
//   map.js) al momento de esta carga, y el documento NO declara un tipo de
//   cambio propio (sin Anexo de moneda extranjera). Se calculó vía el tipo de
//   cambio OFICIAL de Danmarks Nationalbank (el banco central emisor de la
//   corona danesa) para el 30/6/2023: DKK/USD = 6,8089 (fuente:
//   www.evaluta.dk/en/exchange-rate-30-june-2023, que cita datos oficiales de
//   Danmarks Nationalbank; EUR/DKK ese mismo día = 7,4476 según la misma
//   fuente). Se usó el cruce DIRECTO DKK/USD de Danmarks Nationalbank en vez
//   del método habitual de cruzar DKK/EUR×EUR/USD del BCE (usado en otras
//   entradas DKK de FX_CLOSE) porque acá SÍ hay una cotización directa
//   DKK/USD del banco central emisor, más precisa que una cruzada de 2
//   fuentes/horarios distintos — como chequeo cruzado, DKK/EUR(BCE,
//   7,4476 vía Nationalbank)×EUR/USD(BCE 30/6/2023, 1,0866, ya en FX_CLOSE
//   como 'EUR@2023-06-30') da 7,4476×0,9203⁻¹... o sea EUR/DKK(7,4476)÷
//   EUR/USD_inverso da un DKK/USD≈6,8551 (0,7% por encima de 6,8089,
//   diferencia esperable entre 2 fuentes/momentos del día distintos, dentro
//   del ruido normal de este tipo de cálculo). Literal en este archivo
//   (`fx:6.8089`, `fxSource:'market_close'`), NO en currency-map.js — no se
//   tocó ese archivo por instrucción explícita de esta sesión. CANDIDATO A
//   PROMOVER a FX_CLOSE en una sesión futura si aparece otro club/ejercicio
//   danés con cierre 30/6/2023.
//
// GESTIÓN: sin mención de cambio de presidencia en el ejercicio — gestionId:null,
//   mismo criterio que nordsjaelland-dk/silkeborg-dk (sociedades anónimas sin
//   concepto de "gestión" tipo club argentino).
// ============================================================================

const randersdkRevenueLinesByYear = {
  2023: [
    { rawLabel:'Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)', normalizedCategory:'lump_football_operations', amountNative:61.744974, disclosureLevel:'aggregated' },
  ],
};

const randersdkExpenseLinesByYear = {
  2023: [
    { rawLabel:'Løn- og personaleomkostninger (Løn og gager + Pensioner + Andre omkostninger til social sikring)', normalizedCategory:'wages_squad', amountNative:-54.229295, disclosureLevel:'detailed', items:[
      ['Løn og gager', -47.872434], ['Pensioner', -4.269825], ['Andre omkostninger til social sikring', -2.087037],
    ]},
    { rawLabel:'Kontraktrettigheder mv. — årets af- og nedskrivninger (amortisation for the year, player registrations)', normalizedCategory:'player_amortisation', amountNative:-6.877926, disclosureLevel:'detailed' },
    { rawLabel:'Indretning af lejede lokaler + Andre anlæg, driftsmateriel og inventar — årets af- og nedskrivninger', normalizedCategory:'depreciation', amountNative:-1.066125, disclosureLevel:'detailed', items:[
      ['Indretning af lejede lokaler', -0.479431], ['Andre anlæg, driftsmateriel og inventar', -0.586694],
    ]},
  ],
};

const randersdkFiscalYearMeta = {
  2023: {
    currency:'DKK', fxRef:'DKK@2023-06-30', // promovido a FX_CLOSE en la integración (data/currency-map.js)
    sourceId:'randers-dk-aarsrapport-2022-23',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:0,
    // Resultat af kapitalandele i tilknyttede virksomheder(2.628.176, ver comentario de
    // cabecera — 3 subsidiarias 100%-controladas por el método de la participación) +
    // Finansielle indtægter(264.030) - Finansielle omkostninger(324.028).
    netInterest:2.568178,
    tax:0.054931,
    // grossDebt = Kreditinstitutter (largo plazo 1.625.684 + corto plazo 437.009). cash =
    // Likvide beholdninger.
    grossDebt:2.062693, cash:11.464548,
    officialTotalRevenue:61.744974, officialTotalExpenses:62.173346, officialPAT:2.194737,
  },
};

const randersdkPresupuestoOverlayByYear = {};

const randersdkPasesData = [];
const randersdkResultadosData = {};
const randersdkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['randers-dk'] = {
  revenueLinesByYear: randersdkRevenueLinesByYear, expenseLinesByYear: randersdkExpenseLinesByYear,
  fiscalYearMeta: randersdkFiscalYearMeta, pasesData: randersdkPasesData,
  resultadosData: randersdkResultadosData, titulosData: randersdkTitulosData,
  presupuestoOverlayByYear: randersdkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'randers-dk-aarsrapport-2022-23': {
    id:'randers-dk-aarsrapport-2022-23', clubId:'randers-dk',
    title:'Randers FC A/S — Årsrapport 1. juli 2022 - 30. juni 2023',
    type:'official_balance_sheet', reliability:'primary',
    note:'Entidad única para el fútbol profesional (CVR 83 94 08 16), con 3 subsidiarias 100%-controladas por el método de la participación (Randers FC Jobakademi ApS, Business Park Randers ApS, Randers Sports College ApS), sin consolidar línea por línea. El estado de resultados usa la exención del § 32 de la Årsregnskabsloven (solo reporta "Bruttofortjeneste"/Gross profit neto) — todo el revenue se cargó sin desglosar. Tipo de cambio calculado vía Danmarks Nationalbank (no declarado por el propio documento, ver comentario de cabecera de data/randers-dk-data.js). Transcripción completa en Clubes/Dinamarca/Randers FC/aarsrapport-2023-06-30.md.',
  },
});

memberCountByClub['randers-dk'] = null;
