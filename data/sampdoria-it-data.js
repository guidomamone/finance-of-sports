// ============================================================================
// data/sampdoria-it-data.js — U.C. Sampdoria S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "sampdoria-it" — slug de "Sampdoria" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "U.C. Sampdoria S.p.A." — el .md, 8 veces (nombre del club + forma societaria)
//   displayName        ok        "Sampdoria" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (125 de 182 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 98 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (125 de 182 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 1 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2021-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2021-12-31 = 0.882924 (Tipo de referencia del Banco Central Europeo al 2021-12-31)
//   sourceId           ok        "sampdoria-it-fascicolo-bilancio-2021" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Sampdoria"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2021-12-31","sourceId":"sampdoria-it-fascicolo-bilancio-2021"}
// ============================================================================

const sampdoriaitRevenueLinesByYear = {
  // 2021: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:1.015668, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.577893, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:3.261983, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'c) proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:3.405, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.983088, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:52.208405, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'f) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:2.691738, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'g) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:3.392901, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'h) altri proventi da trasferimento diritti calciatori', normalizedCategory:'player_sales', amountNative:8.773329, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
  ],
};
const sampdoriaitExpenseLinesByYear = {
  2021: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'Per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.572866, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Per servizi', normalizedCategory:'admin_general_expense', amountNative:-17.135343, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'Per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-3.071039, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'a) Salari e stipendi', normalizedCategory:'wages_squad', amountNative:-56.074528, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'b) Oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.739995, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.91
    { rawLabel:'c) Trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.627336, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.88
    { rawLabel:'d) altri costi', normalizedCategory:'wages_squad', amountNative:-0.032591, disclosureLevel:'aggregated' }, // pág. 27, precedente
    { rawLabel:'a) Ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-7.91662, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.85
    { rawLabel:'b) Ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.407155, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'Variazione delle rimanenze di materiale di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.007428, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'Accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.855701, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.97
    { rawLabel:'a) oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-0.545115, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'b) costi per acquisizione temporanea prestazioni calciatori', normalizedCategory:'other_expenses', amountNative:-1.809266, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.99
    { rawLabel:'c) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-2.754819, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'d) altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-1.200638, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'e) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-2.652781, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
  ],
};
const sampdoriaitFiscalYearMeta = {
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. renglón 'di cui' que ya está dentro de su padre: se contaba dos veces (arreglo manual 2026-10-07, causa encontrada por subagente)
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. to-do 157: i) es otro 'di cui' de h) (28.550 + 2.959.520 + 5.785.259 = 8.773.329 = h); se contaba dos veces
  // 2021: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): cierre = 2021-12-31. Claude 2026-10-07 (ok de Guido, cola d29023b): el conto economico es al 31/12/2021; 30/03/2022 es la fecha de aprobación del consiglio
  2021: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-12-31',
    sourceId:'sampdoria-it-fascicolo-bilancio-2021',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-4.139726, tax:3.817955,
    extraRows: [
      {label:'d) proventi diversi dai precedenti', value:0.697745},
      {label:'e) altri interessi e oneri finanziari', value:-4.837668},
      {label:'a) utile su cambi', value:0.000201},
      {label:'b) perdite su cambi', value:-0.000004},
      {label:'a) Imposte correnti', value:-0.392825},
      {label:'b) Imposte relative a esercizi precedenti', value:-0.104879},
      {label:'c) Imposte differite', value:-1.99323},
      {label:'d) Imposte anticipate', value:-0.118679},
      {label:'e) proventi (aneri) da adesione al regime di consolidato fiscale', value:6.427568},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:76.310005, officialTotalExpenses:97.648402, officialPAT:-24.414986,
  },
};
const sampdoriaitPresupuestoOverlayByYear = {};

const sampdoriaitPasesData = [];
const sampdoriaitResultadosData = {};
const sampdoriaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sampdoria-it'] = {
  revenueLinesByYear: sampdoriaitRevenueLinesByYear, expenseLinesByYear: sampdoriaitExpenseLinesByYear,
  fiscalYearMeta: sampdoriaitFiscalYearMeta, pasesData: sampdoriaitPasesData,
  resultadosData: sampdoriaitResultadosData, titulosData: sampdoriaitTitulosData,
  presupuestoOverlayByYear: sampdoriaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'sampdoria-it-fascicolo-bilancio-2021': {
    id:'sampdoria-it-fascicolo-bilancio-2021', clubId:'sampdoria-it',
    title:'U.C. Sampdoria S.p.A. — Sampdoria-fascicolo-bilancio-2021 (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Sampdoria/Sampdoria-fascicolo-bilancio-2021.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['sampdoria-it'] = null;
