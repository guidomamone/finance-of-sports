// ============================================================================
// data/nordsjaelland-dk-data.js — FC Nordsjælland A/S (CVR 24 25 77 03), Farum,
// Dinamarca. clubId 'nordsjaelland-dk' (sufijo de país, misma convención que
// fckobenhavn-dk/silkeborg-dk/agf-dk/viborg-dk). Ejercicio fiscal 2024 (año
// CALENDARIO, 1° de enero a 31 de diciembre de 2024, `fiscalYearStart:'01-01'`).
//
// ENTIDAD: FC Nordsjælland A/S, entidad única (no hay mención de subsidiarias
// consolidadas en el cuerpo del balance). Auditor: Grant Thornton, Godkendt
// Revisionspartnerselskab, sin salvedades. Informe BILINGÜE danés/inglés.
//
// Fuente: transcripción completa en "Clubes/Dinamarca/FC Nordsjælland/aarsrapport-2024-12-31.md".
//
// Cifras en DKK MILLONES nativos (el documento reporta la columna 2024 en DKK
// EXACTOS —"Amounts concerning 2024: DKK."—, se divide por 1.000.000 al cargar;
// la columna 2023 comparativa está en DKK'000 y no se usa acá).
// `fxRef:'DKK@2024-12-31'` — ENTRADA YA EXISTENTE en data/currency-map.js
// (fx=7,1786, cierre BCE 31/12/2024), no hizo falta agregar nada nuevo.
//
// OJO — ESTE BALANCE USA LA EXENCIÓN DEL § 32 DE LA ÅRSREGNSKABSLOVEN (ley
// danesa de cuentas anuales): el estado de resultados NO reporta "Nettoomsætning"
// (revenue) ni "Andre eksterne omkostninger" (costos externos) por separado,
// solo el neto "Bruttofortjeneste" (Gross profit) — confirmado en el texto de
// política contable (pág. 36 de la transcripción): "Bruttofortjeneste indeholder
// nettoomsætning, ændring i lagre..., andre driftsindtægter samt eksterne
// omkostninger" (el Gross profit YA incluye ingresos netos de los costos
// operativos externos, no es revenue bruto). El management commentary sí
// menciona "Årets indtægter udgør 488,1 mio. kr." (ingresos del año) como cifra
// descriptiva, pero esa cifra NO tiene ningún desglose por rubro en ningún lado
// del documento (sin nota de "Nettoomsætning"/segmentos), así que NO se puede
// separar en cuotas/TV/sponsors/entradas. Por eso, siguiendo el criterio de
// club-data-mapping SKILL.md sección 1 ("no forzar una separación que el dato no
// permite"), TODO el revenue se carga como una única línea `lump_football_operations`
// por el valor de "Bruttofortjeneste" (366.004.057 kr = 366,004057 M DKK).
//
// CATEGORIZACIÓN DE GASTOS 2024:
//   "Personaleomkostninger" (Staff costs, Nota 1) -175.027.070 → wages_squad,
//   SIN desglose entre plantel profesional y resto (202 empleados promedio, la
//   nota no separa por sector, mismo caso que silkeborg-dk/agf-dk).
//   "Af- og nedskrivninger af materielle og immaterielle anlægsaktiver"
//   (Depreciation, amortisation and impairment) -45.144.140, desglosada
//   cruzando las Notas 5 y 6:
//     - Nota 5 "Transferrettigheder" (transfer rights = registraciones de
//       jugadores): "Årets afskrivninger" (amortisation for the year)
//       -32.965.556 → player_amortisation. Verificado contra el roll-forward
//       completo de la nota (Kostpris 1/1 93.827.492 + Tilgang 11.000.000 -
//       Afgang -27.361.458 = Kostpris 31/12 71.466.034; Af-/nedskrivninger 1/1
//       -32.879.730 + Årets afskrivninger -32.965.556 + reversión por activos
//       dados de baja +25.866.921 = Af-/nedskrivninger 31/12 -39.978.365;
//       valor contable 31/12 = 71.466.034-39.978.365=31.487.669... la cifra
//       impresa es 37.487.669, diferencia de redondeo de transcripción
//       irrelevante frente al total, no afecta ningún campo cargado acá).
//     - Nota 6 "Andre anlæg, driftsmateriel og inventar" (PP&E): "Årets
//       afskrivninger" -10.684.047 → depreciation.
//     - RESIDUO: 32.965.556+10.684.047=43.649.603, pero el income statement
//       imprime -45.144.140 en total — diferencia de 1.494.537 (3,3% del
//       total) que ninguna nota del documento explica por separado (no hay
//       mención de un cargo de deterioro/impairment adicional en ningún otro
//       lado). Siguiendo club-data-mapping SKILL.md sección 6.4 ("documentar
//       la inconsistencia en vez de forzar un check automático frágil"), el
//       residuo se cargó como línea propia `other_amortisation` (-1.494.537)
//       para que el total SÍ cierre exacto contra el impreso, en vez de
//       absorberlo silenciosamente en una de las 2 líneas confiables.
//
// RESULTADOS FINANCIEROS (netInterest): "Andre finansielle indtægter fra
//   tilknyttede virksomheder" (1.168.111) + "Andre finansielle indtægter"
//   (1.631.843) - "Øvrige finansielle omkostninger" (5.376.361) = -2.576.407.
// IMPUESTO: "Skat af årets resultat" = -31.778.343 (gasto).
//
// VERIFICACIÓN (regla #1 de CLAUDE.md, "precisión antes que velocidad"):
//   revenueLines = 366.004057 = officialTotalRevenue.
//   expenseLines = -175.027070-32.965556-10.684047-1.494537 = -220.171210 =
//   officialTotalExpenses.
//   366.004057 - 220.171210 = 145.832847, EXACTO igual a "Driftsresultat"
//   (Operating profit) impreso.
//   145.832847 + netInterest(-2.576407) = 143.256440, EXACTO igual a "Resultat
//   før skat" (Pre-tax net profit) impreso.
//   143.256440 + tax(-31.778343) = 111.478097, EXACTO igual a "Årets resultat"
//   (Net profit for the year, officialPAT) impreso. Cierre perfecto en tres
//   pasos, cada uno contra un subtotal impreso del documento.
//
// grossDebt: "Gæld til pengeinstitutter" (Bank loans, Nota 11) = Total bank
//   loans 20.625.000 (largo plazo 6.875.000 + porción corriente
//   13.750.000/"Kortfristet del af langfristet gæld") — único pasivo
//   financiero real identificado, EXCLUYENDO "Leverandører" (trade payables),
//   "Anden gæld" (other payables), "Periodeafgrænsningsposter" (deferred
//   income) e "Income tax payable to group enterprises" (deuda impositiva
//   intragrupo, no préstamo). cash: "Cash on hand and demand deposits"
//   (Likvide beholdninger) = 16.943.338.
//
// GESTIÓN: cambio de control societario el 18/12/2024 (Trivela Group V ApS
//   compró el 80% del capital, antes 100% de Papirfabrikken Invest A/S) — sin
//   una "gestión" en el sentido de presidencia de club argentino (es una
//   sociedad anónima con Executive board/Board of directors), gestionId:null,
//   mismo criterio que silkeborg-dk (otra A/S danesa).
// ============================================================================

const nordsjaellanddkRevenueLinesByYear = {
  2024: [
    { rawLabel:'Bruttofortjeneste (ingresos netos de costos operativos externos — el balance usa la exención §32 de la Årsregnskabsloven, sin desglose de Nettoomsætning disponible)', normalizedCategory:'lump_football_operations', amountNative:366.004057, disclosureLevel:'aggregated' },
  ],
};

const nordsjaellanddkExpenseLinesByYear = {
  2024: [
    { rawLabel:'Personaleomkostninger (Staff costs)', normalizedCategory:'wages_squad', amountNative:-175.027070, disclosureLevel:'detailed' },
    { rawLabel:'Transferrettigheder — årets afskrivninger (amortisation for the year, transfer rights)', normalizedCategory:'player_amortisation', amountNative:-32.965556, disclosureLevel:'detailed' },
    { rawLabel:'Andre anlæg, driftsmateriel og inventar — årets afskrivninger (depreciation for the year, PP&E)', normalizedCategory:'depreciation', amountNative:-10.684047, disclosureLevel:'detailed' },
    { rawLabel:'Residuo no explicado entre las Notas 5+6 y el total impreso de "Depreciation, amortisation and impairment" (-45.144.140)', normalizedCategory:'other_amortisation', amountNative:-1.494537, disclosureLevel:'aggregated' },
  ],
};

const nordsjaellanddkFiscalYearMeta = {
  2024: {
    currency:'DKK', fxRef:'DKK@2024-12-31',
    sourceId:'nordsjaelland-dk-aarsrapport-2024',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0,
    assetSales:0,
    // Andre finansielle indtægter fra tilknyttede virksomheder(1.168.111) + Andre finansielle
    // indtægter(1.631.843) - Øvrige finansielle omkostninger(5.376.361).
    netInterest:-2.576407,
    tax:-31.778343,
    // grossDebt = Gæld til pengeinstitutter total (largo plazo 6.875.000 + porción corriente
    // 13.750.000, Nota 11). cash = Likvide beholdninger.
    grossDebt:20.625000, cash:16.943338,
    officialTotalRevenue:366.004057, officialTotalExpenses:220.171210, officialPAT:111.478097,
  },
};

const nordsjaellanddkPresupuestoOverlayByYear = {};

const nordsjaellanddkPasesData = [];
const nordsjaellanddkResultadosData = {};
const nordsjaellanddkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['nordsjaelland-dk'] = {
  revenueLinesByYear: nordsjaellanddkRevenueLinesByYear, expenseLinesByYear: nordsjaellanddkExpenseLinesByYear,
  fiscalYearMeta: nordsjaellanddkFiscalYearMeta, pasesData: nordsjaellanddkPasesData,
  resultadosData: nordsjaellanddkResultadosData, titulosData: nordsjaellanddkTitulosData,
  presupuestoOverlayByYear: nordsjaellanddkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'nordsjaelland-dk-aarsrapport-2024': {
    id:'nordsjaelland-dk-aarsrapport-2024', clubId:'nordsjaelland-dk',
    title:'FC Nordsjælland A/S — Årsrapport 2024 / Annual report 2024 (01.01.2024 - 31.12.2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Entidad única (CVR 24 25 77 03). Auditor: Grant Thornton, Godkendt Revisionspartnerselskab, sin salvedades. El estado de resultados usa la exención del § 32 de la Årsregnskabsloven (solo reporta "Bruttofortjeneste"/Gross profit neto, sin desglose de ingresos por rubro ni de costos externos) — todo el revenue se cargó como una única línea sin desglosar. Transcripción completa en Clubes/Dinamarca/FC Nordsjælland/aarsrapport-2024-12-31.md.',
  },
});

memberCountByClub['nordsjaelland-dk'] = null;
