// ============================================================================
// data/vejle-dk-data.js — VB Alliancen A/S (CVR 31 08 51 79), Vejle, Dinamarca
// (la sociedad profesional de Vejle Boldklub, distinta de "VEJLE BOLDKLUB" a
// secas, CVR 68 04 67 18, que es la asociación sin fines de lucro dueña del
// resto del club — ver fuentes/Dinamarca/Vejle.md). clubId 'vejle-dk' (sufijo
// de país, misma convención que fckobenhavn-dk/silkeborg-dk/agf-dk/randers-dk).
// Ejercicio fiscal 2024 (año CALENDARIO, 1° de enero a 31 de diciembre de 2024,
// `fiscalYearStart:'01-01'`).
//
// ENTIDAD: VB Alliancen A/S, con una participación del 65% en VB Plus ApS
// (subsidiaria que "driver netværksgrupper for virksomheder i regionen",
// grupos de networking empresarial — no es fútbol, contabilizada por el
// método de la participación, ver más abajo). Documento ÍNTEGRAMENTE EN
// DANÉS.
//
// OJO — TRANSCRIPCIÓN CON TABLAS DESALINEADAS (labels y números en bloques
// separados por el PDF-a-texto, columnas leídas fuera de orden) Y CON EL
// SIGNO NEGATIVO DE VARIOS NÚMEROS CONVERTIDO EN UN "7" LITERAL AL PRINCIPIO
// DEL NÚMERO (ej. "73.665" en vez de "-3.665") — un artefacto de
// transcripción nuevo, no visto antes en otros balances daneses de esta
// sesión. Se RECONSTRUYERON todos los valores cruzando la aritmética interna
// de cada tabla (cada subtotal contra sus líneas) Y contra 2 anclas de texto
// confirmadas en el cuerpo del informe de gestión: "Selskabets
// resultatopgørelse for 2024 udviser et underskud på 3.665 t.kr. mod et
// underskud på 15.676 t.kr. sidste år, og selskabets balance pr. 31. december
// 2024 udviser en negativ egenkapital på 19.936 t.kr." — los 3 números
// (-3.665 resultado neto, -15.676 resultado neto 2023, -19.936 patrimonio
// neto) reconciliaron EXACTOS con la reconstrucción número por número, dando
// alta confianza en el resto de la tabla. Ver el .md fuente para el texto
// crudo tal como se transcribió.
//
// Fuente: transcripción completa en "Clubes/Dinamarca/Vejle/aarsrapport-2024-12-31.md".
//
// Cifras en DKK MILLONES nativos (el documento reporta TODA la tabla —2024 y
// 2023— en t.kr., miles de kr.; se divide por 1.000 al cargar, mismo criterio
// que silkeborg-dk/agf-dk).
// `fxRef:'DKK@2024-12-31'` — ENTRADA YA EXISTENTE en data/currency-map.js
// (fx=7,1786, cierre BCE 31/12/2024).
//
// OJO — MISMA EXENCIÓN §32 QUE nordsjaelland-dk/randers-dk: el propio
// documento lo dice EXPLÍCITO ("I resultatopgørelsen er nettoomsætning, andre
// driftsindtægter og eksterne omkostninger med henvisning til
// årsregnskabslovens § 32 sammendraget til én regnskabspost benævnt
// bruttofortjeneste") — sin desglose de ingresos por rubro disponible. TODO
// el revenue se carga como una única línea `lump_football_operations`
// (47.596 t.kr. = 47,596 M DKK).
//
// CATEGORIZACIÓN DE GASTOS 2024 (Nota, "Personaleomkostninger"):
//   "Personaleomkostninger" (Lønninger 45.433 + Pensioner 2.471 + Andre
//   omkostninger til social sikring 687 = 48.591 t.kr., 69 empleados
//   promedio, SIN desglose por sector) → wages_squad.
//   "Andre driftsomkostninger" (-82 t.kr., residual, sin nota que lo explique
//   — es un monto ínfimo, 0,17% de los gastos totales) → other_expenses.
//   "Af- og nedskrivninger af immaterielle og materielle anlægsaktiver"
//   (-3.354 t.kr.), desglosada cruzando las notas de activos:
//     - "Immaterielle anlægsaktiver" (Erhvervede lignende rettigheder =
//       registraciones de jugadores): "Afskrivninger" (amortisation for the
//       year) -2.392 t.kr. → player_amortisation. Roll-forward verificado
//       exacto: Kostpris 1/1 7.496 + Tilgange 975 - Afgange -4.091 = Kostpris
//       31/12 4.380; Af-/nedskrivninger 1/1 -4.879 + Afskrivninger -2.392 +
//       Tilbageførsel på afhændede aktiver +4.091 = -3.180; valor contable
//       31/12 = 4.380-3.180=1.200, EXACTO igual al valor de balance impreso
//       (Erhvervede lignende rettigheder 1.200 t.kr.).
//     - "Materielle anlægsaktiver" (Andre anlæg, driftsmateriel og inventar +
//       Indretning af lejede lokaler): "Afskrivninger" -828 (Andre anlæg) -134
//       (Indretning af lejede lokaler) = -962 t.kr. → depreciation.
//       Roll-forward verificado exacto contra el valor de balance impreso
//       (3.558+1.138=4.696 t.kr.).
//     - Suma: 2.392+962=3.354, EXACTO igual al total impreso.
//
// "INDTÆGTER AF KAPITALANDELE I TILKNYTTEDE VIRKSOMHEDER" (+715 t.kr.):
//   resultado del método de la participación en VB Plus ApS (65% controlada,
//   grupos de networking empresarial, no fútbol). El propio documento lo
//   presenta COMO LÍNEA FINANCIERA, entre el resultado operativo y
//   "Finansielle indtægter"/"Finansielle omkostninger" — mismo tratamiento
//   que randers-dk (Randers FC Jobakademi/Business Park Randers/Randers
//   Sports College): se sumó a netInterest, no es revenue operativo del
//   club. Verificado exacto contra la nota "Finansielle anlægsaktiver"
//   ("Årets resultat" de Kapitalandele i tilknyttede virksomheder = 715 t.kr.,
//   idéntico al valor del estado de resultados).
//
// RESULTADOS FINANCIEROS (netInterest): Indtægter af kapitalandele i
//   tilknyttede virksomheder(715) + Finansielle indtægter(98) - Finansielle
//   omkostninger(357) = 456 t.kr. = 0,456 M DKK.
// IMPUESTO: "Skat af årets resultat" = +310 t.kr. (INGRESO, crédito fiscal
//   neto, coherente con el resultado negativo del ejercicio).
//
// VERIFICACIÓN (regla #1 de CLAUDE.md, "precisión antes que velocidad"):
//   revenueLines = 47.596 = officialTotalRevenue.
//   expenseLines = -48.591-0.082-2.392-0.962 = -52.027 = officialTotalExpenses.
//   47.596 - 52.027 = -4.431, EXACTO igual a "Resultat før finansielle
//   poster" impreso.
//   -4.431 + netInterest(0.456) = -3.975, EXACTO igual a "Resultat før skat"
//   impreso.
//   -3.975 + tax(0.310) = -3.665, EXACTO igual a "Årets resultat"
//   (officialPAT) impreso Y a la cifra citada en el informe de gestión
//   ("underskud på 3.665 t.kr."). Cierre perfecto en tres pasos.
//
// grossDebt: NO HAY "Gæld til pengeinstitutter" (bank loans) en este balance
//   — el club se financia vía "Leasingforpligtelser" (lease liabilities,
//   largo plazo 658 + corto plazo 267 = 925 t.kr.) y "Ansvarlig lånekapital"
//   (subordinated loan capital, un préstamo subordinado de accionistas/partes
//   relacionadas, 23.203 t.kr. a largo plazo, sin porción corriente separada
//   en el balance). Ambos son financiamiento real (leasing financiero +
//   préstamo subordinado), a diferencia de "Anden gæld"/"Leverandører"
//   (pasivos operativos) y "Gæld til selskabsdeltagere og ledelse"
//   (relacionado operativo, no un préstamo etiquetado como tal) — se
//   incluyeron los 2 primeros: grossDebt = 925+23.203=24.128 t.kr. = 24,128 M
//   DKK. cash: "Likvide beholdninger" = 4.548 t.kr.
//
// NOTA DE CONTEXTO: el club tiene PATRIMONIO NETO NEGATIVO (-19.936 t.kr. al
//   31/12/2024, "Selskabet har tabt sin egenkapital" — el propio informe de
//   gestión dice que la sociedad perdió su capital social, con la
//   administración atenta a las normas de la ley de sociedades sobre pérdida
//   de capital). No cambia ningún criterio de carga, pero es contexto
//   relevante para interpretar los números (deuda de 24,1 M DKK contra un
//   patrimonio de -19,9 M DKK).
//
// GESTIÓN: sin mención de cambio de presidencia en el ejercicio — gestionId:null,
//   mismo criterio que nordsjaelland-dk/randers-dk/silkeborg-dk.
// ============================================================================

const vejledkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa explícitamente la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)', normalizedCategory:'lump_football_operations', amountNative:47.596, disclosureLevel:'aggregated' },
  ],
};

const vejledkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Personaleomkostninger (Lønninger + Pensioner + Andre omkostninger til social sikring)', normalizedCategory:'wages_squad', amountNative:-48.591, disclosureLevel:'detailed', items:[
      ['Lønninger', -45.433], ['Pensioner', -2.471], ['Andre omkostninger til social sikring', -0.687],
    ]},
    { rawLabel:'Andre driftsomkostninger (residual, sin nota propia)', normalizedCategory:'other_expenses', amountNative:-0.082, disclosureLevel:'aggregated' },
    { rawLabel:'Immaterielle anlægsaktiver — afskrivninger (amortisation for the year, registraciones de jugadores)', normalizedCategory:'player_amortisation', amountNative:-2.392, disclosureLevel:'detailed' },
    { rawLabel:'Materielle anlægsaktiver — afskrivninger (Andre anlæg, driftsmateriel og inventar + Indretning af lejede lokaler)', normalizedCategory:'depreciation', amountNative:-0.962, disclosureLevel:'detailed', items:[
      ['Andre anlæg, driftsmateriel og inventar', -0.828], ['Indretning af lejede lokaler', -0.134],
    ]},
  ],
};

const vejledkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-12-31',
    sourceId:'vejle-dk-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:0,
    // Indtægter af kapitalandele i tilknyttede virksomheder(715, ver comentario de
    // cabecera — VB Plus ApS, 65% controlada) + Finansielle indtægter(98) -
    // Finansielle omkostninger(357).
    netInterest:0.456,
    tax:0.310,
    // grossDebt = Leasingforpligtelser (largo 658 + corto 267) + Ansvarlig lånekapital
    // (23.203, préstamo subordinado). cash = Likvide beholdninger.
    grossDebt:24.128, cash:4.548,
    officialTotalRevenue:47.596, officialTotalExpenses:52.027, officialPAT:-3.665,
  },
};

const vejledkPresupuestoOverlayByYear = {};

const vejledkPasesData = [];
const vejledkResultadosData = {};
const vejledkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['vejle-dk'] = {
  revenueLinesByYear: vejledkRevenueLinesByYear, expenseLinesByYear: vejledkExpenseLinesByYear,
  fiscalYearMeta: vejledkFiscalYearMeta, pasesData: vejledkPasesData,
  resultadosData: vejledkResultadosData, titulosData: vejledkTitulosData,
  presupuestoOverlayByYear: vejledkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'vejle-dk-aarsrapport-2024': {
    id:'vejle-dk-aarsrapport-2024', clubId:'vejle-dk',
    title:'VB Alliancen A/S — Årsrapport 1. januar - 31. december 2024',
    type:'official_balance_sheet', reliability:'primary',
    note:'Sociedad profesional del fútbol de Vejle Boldklub (CVR 31 08 51 79, distinta de la asociación "VEJLE BOLDKLUB" CVR 68 04 67 18), con 65% de VB Plus ApS por el método de la participación (grupos de networking empresarial, no fútbol). El estado de resultados usa explícitamente la exención del § 32 de la Årsregnskabsloven (solo "Bruttofortjeneste"/Gross profit neto) — todo el revenue se cargó sin desglosar. Patrimonio neto negativo al cierre (-19,936 M DKK). La transcripción tenía las tablas desalineadas y el signo negativo de varios números convertido en un "7" literal; se reconstruyó cruzando la aritmética interna y 2 anclas de texto del informe de gestión (ver comentario de cabecera de data/vejle-dk-data.js). Transcripción completa en Clubes/Dinamarca/Vejle/aarsrapport-2024-12-31.md.',
  },
});

memberCountByClub['vejle-dk'] = null;
