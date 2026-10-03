// ============================================================================
// data/aellarissa-gr-data.js — AEL Larissa (Grecia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-03), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "aellarissa-gr" — slug de "AEL Larissa" + '-gr' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               pendiente "AEL Larissa" — no se encontró el nombre legal en el .md; se usa el nombre de la carpeta
//   displayName        ok        "AEL Larissa" — nombre de la carpeta del club en Clubes/
//   country            ok        "GR" — carpeta de país "Grecia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Grecia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: nombre del archivo (2025-06-30) y contenido del .md (70 de 70 fechas de fin de mes)
//   sport              ok        "futbol" — el .md nombra el fútbol 2 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (nombre del archivo (2025-06-30) y contenido del .md (70 de 70 fechas de fin de mes))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Grecia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
//   sourceId           ok        "aellarissa-gr-ael-notes-elp-2025-06-30-a" — clubId + nombre del archivo en slug
//   liga               ok        "gr-superleague2" — roster cacheado de "2024–25 Super League Greece 2" (tools/club-league-reference/gr.json), coincidencia única por palabras "AEL" = "AEL Larissa"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"aellarissa-gr-ael-notes-elp-2025-06-30-a"}
// ============================================================================

const aellarissagrRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:2.300317, disclosureLevel:'aggregated' }, // pág. 7, Jev 1
    { rawLabel:'Έσοδα παρεπόμενων ασχολιών', normalizedCategory:'other_income', amountNative:0.814941, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.94
    { rawLabel:'Επιχορηγήσεις και διάφορα έσοδα πωλήσεων', normalizedCategory:'other_income', amountNative:0.247736, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.95
    { rawLabel:'Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0.02105, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.99
  ],
  // 2024: cargado por tools/cargar.mjs (2026-10-03) desde Clubes/Grecia/AEL Larissa/AEL_FS_ELP_2024-06-30.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Grecia/AEL Larissa/AEL_FS_ELP_2024-06-30.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'Κύκλος εργασιών (καθαρός)', normalizedCategory:'lump_football_operations', amountNative:0.418981, disclosureLevel:'aggregated' }, // pág. 8, Jev 1
    { rawLabel:'Επιχορηγήσεις & διάφορα έσοδα πωλήσεων', normalizedCategory:'other_income', amountNative:0.15142, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.92
    { rawLabel:'Έσοδα παρεπόμενων ασχολιών', normalizedCategory:'other_income', amountNative:0.642079, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.94
    { rawLabel:'(+) Λοιπά έσοδα και κέρδη', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.99
  ],
};
const aellarissagrExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Αμοιβές και έξοδα προσωπικού', normalizedCategory:'wages_squad', amountNative:-1.560207, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Αμοιβές και έξοδα τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.426318, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Παροχές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.080641, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Διάφορα έξοδα', normalizedCategory:'other_expenses', amountNative:-0.387312, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.93
    { rawLabel:'Αποσβέσεις', normalizedCategory:'depreciation', amountNative:-0.042048, disclosureLevel:'aggregated' }, // pág. 18, precedente
    { rawLabel:'Φόροι-Τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.005684, disclosureLevel:'aggregated' }, // pág. 18, Jev 0.98
    { rawLabel:'Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-0.216105, disclosureLevel:'aggregated' }, // pág. 7, Jev 0.95
  ],
  2024: [ // tools/cargar.mjs (2026-10-03)
    { rawLabel:'Αμοιβές και έξοδα προσωπικού', normalizedCategory:'wages_squad', amountNative:-1.351228, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Αμοιβές και έξοδα τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.232478, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Παροχές τρίτων', normalizedCategory:'admin_general_expense', amountNative:-0.054934, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Διάφορα έξοδα', normalizedCategory:'other_expenses', amountNative:-0.271693, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.93
    { rawLabel:'Αποσβέσεις', normalizedCategory:'depreciation', amountNative:-0.021413, disclosureLevel:'aggregated' }, // pág. 19, precedente
    { rawLabel:'Φόροι-τέλη', normalizedCategory:'admin_general_expense', amountNative:-0.004934, disclosureLevel:'aggregated' }, // pág. 19, Jev 0.98
    { rawLabel:'(-) Λοιπά έξοδα και ζημιές', normalizedCategory:'other_expenses', amountNative:-1.632104, disclosureLevel:'aggregated' }, // pág. 8, Jev 0.96
  ],
};
const aellarissagrFiscalYearMeta = {
  2025: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'aellarissa-gr-ael-notes-elp-2025-06-30-a',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.016094, tax:0,
    extraRows: [
      {label:'Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000003},
      {label:'Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.016097},
      {label:'Φόροι εισοδήματος', value:0},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:2.300317, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:3.384045, officialTotalExpenses:2.718314, officialPAT:0.649637,
  },
  2024: { // tools/cargar.mjs (2026-10-03). grossDebt/cash: no se leen por script todavía (null = sin dato). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'aellarissa-gr-ael-fs-elp-2024-06-30',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.007041, tax:0,
    extraRows: [
      {label:'(+) Πιστωτικοί τόκοι και συναφή έσοδα', value:0.000002},
      {label:'(-) Χρεωστικοί τόκοι και συναφή έξοδα', value:-0.007043},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'Κύκλος εργασιών (καθαρός)', lado:'revenue', importe:0.418981, motivo:'el documento no desglosa este renglón'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:1.21248, officialTotalExpenses:3.568785, officialPAT:-2.363346,
  },
};
const aellarissagrPresupuestoOverlayByYear = {};

const aellarissagrPasesData = [];
const aellarissagrResultadosData = {};
const aellarissagrTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['aellarissa-gr'] = {
  revenueLinesByYear: aellarissagrRevenueLinesByYear, expenseLinesByYear: aellarissagrExpenseLinesByYear,
  fiscalYearMeta: aellarissagrFiscalYearMeta, pasesData: aellarissagrPasesData,
  resultadosData: aellarissagrResultadosData, titulosData: aellarissagrTitulosData,
  presupuestoOverlayByYear: aellarissagrPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'aellarissa-gr-ael-notes-elp-2025-06-30-a': {
    id:'aellarissa-gr-ael-notes-elp-2025-06-30-a', clubId:'aellarissa-gr',
    title:'Athlitiki Enosi Larissas AEL P.A.E. — AEL_notes_ELP_2025-06-30_a (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_notes_ELP_2025-06-30_a.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'aellarissa-gr-ael-fs-elp-2024-06-30': {
    id:'aellarissa-gr-ael-fs-elp-2024-06-30', clubId:'aellarissa-gr',
    title:'Athlitiki Enosi Larissas AEL P.A.E. — AEL_FS_ELP_2024-06-30 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-03) desde la transcripción Clubes/Grecia/AEL Larissa/AEL_FS_ELP_2024-06-30.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['aellarissa-gr'] = null;
