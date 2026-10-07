// ============================================================================
// data/acmilan-it-data.js — A.C. Milan S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "acmilan-it" — slug de "AC Milan" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "A.C. Milan S.p.A." — el .md, 18 veces (nombre del club + forma societaria)
//   displayName        ok        "AC Milan" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (619 de 641 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 74 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [argentina] ac milan: #E4002B Crimson Red, #101820 Black, #FFFFFF White | [italia] ac milan: #E4002B Crimso
//   anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (619 de 641 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 5 documento(s) con los dos estados votan consolidad
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 2 línea(s), pero ninguno es una cotización plausible
//   fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
//   sourceId           ok        "acmilan-it-bilanci-relazioni-2023-24" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "AC Milan"
//
// FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"acmilan-it-bilanci-relazioni-2023-24"}
// ============================================================================

const acmilanitRevenueLinesByYear = {
  // 2024: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2024: [
    { rawLabel:'a) ricavi da gare', normalizedCategory:'matchday_competition', amountNative:44.488, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'b) abbonamenti', normalizedCategory:'season_tickets', amountNative:19.276, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'c) ricavi da altre competizioni', normalizedCategory:'competition_bonus', amountNative:5.585, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.93
    { rawLabel:'2 variazioni delle rimanenze di prodotti in corso di lavorazione, semilavorati e finiti', normalizedCategory:'other_income', amountNative:3.258, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.94
    { rawLabel:'a) contributi in conto esercizio', normalizedCategory:'other_income', amountNative:0.109, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'b) proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:90.529, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'d) proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:52.919, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'e) proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:152.324, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'f) proventi vari', normalizedCategory:'other_income', amountNative:9.335, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'g) ricavi da cessione temporanea prestazioni calciatori', normalizedCategory:'player_sales', amountNative:4.164, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'h) plusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:44.899, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'i) altri proventi da gestione calciatori', normalizedCategory:'player_sales', amountNative:3.471, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.95
    { rawLabel:'l) ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:26.584, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
  ],
};
const acmilanitExpenseLinesByYear = {
  2024: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6 per materie prime, sussidiarie, di consumo, merci', normalizedCategory:'other_expenses', amountNative:-19.672, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'Costi generali attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-34.546, disclosureLevel:'aggregated' }, // pág. 91, precedente
    { rawLabel:'Consulenze e collaborazioni', normalizedCategory:'admin_general_expense', amountNative:-17.855, disclosureLevel:'aggregated' }, // pág. 91, precedente
    { rawLabel:'Pubblicità e spese promozionali', normalizedCategory:'admin_general_expense', amountNative:-7.439, disclosureLevel:'aggregated' }, // pág. 91, Jev 1
    { rawLabel:'Assicurazioni', normalizedCategory:'admin_general_expense', amountNative:-0.804, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Emolumenti ad organi sociali', normalizedCategory:'admin_general_expense', amountNative:-4.577, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.98
    { rawLabel:'Spese amministrative e generali', normalizedCategory:'admin_general_expense', amountNative:-7.355, disclosureLevel:'aggregated' }, // pág. 92, Jev 1
    { rawLabel:'Mensa e servizi di ristorazione', normalizedCategory:'admin_general_expense', amountNative:-1.709, disclosureLevel:'aggregated' }, // pág. 92, precedente
    { rawLabel:'Manutenzione e riparazione', normalizedCategory:'admin_general_expense', amountNative:-2.51, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.93
    { rawLabel:'Trasporti, magazzinaggio e spese viaggio', normalizedCategory:'match_organisation_expense', amountNative:-3.426, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.9
    { rawLabel:'Altri costi per servizi', normalizedCategory:'admin_general_expense', amountNative:-10.914, disclosureLevel:'aggregated' }, // pág. 92, Jev 0.92
    { rawLabel:'Affitti passivi', normalizedCategory:'admin_general_expense', amountNative:-10.427, disclosureLevel:'aggregated' }, // pág. 93, Jev 0.96
    { rawLabel:'Noleggi e altre locazioni', normalizedCategory:'admin_general_expense', amountNative:-4.263, disclosureLevel:'aggregated' }, // pág. 93, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-173.48, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-12.16, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-2.514, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'e) altri costi', normalizedCategory:'wages_squad', amountNative:-0.364, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-86.96, disclosureLevel:'aggregated' }, // pág. 39, Claude 0.8
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-2.237, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-3.199, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.93
    { rawLabel:'d) svalutazione dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-1.33, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'12 accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-14.085, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.97
    { rawLabel:'a) spese varie organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-10.701, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'b) tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.023, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'d) costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'e) minusvalenze da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'exceptional_items', amountNative:-0.551, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'f) altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-4.312, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'g) altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-6.331, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
  ],
};
const acmilanitFiscalYearMeta = {
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 672. D) rettifiche quedaban sin lado; las dos filas se llaman igual (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
  // 2024: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (800). ver el anterior (arreglo manual 2026-10-07, causa encontrada por subagente; ver to-do 155)
  2024: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2024-06-30',
    sourceId:'acmilan-it-bilanci-relazioni-2023-24',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.925, tax:-8.162,
    extraRows: [
      {label:'- altri', value:11.133},
      {label:'d) altri oneri finanziari', value:-11.619},
      {label:'a) utili su cambi', value:0.037},
      {label:'b) perdite su cambi', value:-0.348},
      {label:'rivalutazioni di partecipazioni', value:0.672},
      {label:'svalutazioni di partecipazioni (19, costo)', value:-0.8},
      {label:'a) imposte correnti', value:-10.203},
      {label:'b) imposte differite e anticipate', value:2.041},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:456.941, officialTotalExpenses:443.193, officialPAT:4.106,
  },
};
const acmilanitPresupuestoOverlayByYear = {};

const acmilanitPasesData = [];
const acmilanitResultadosData = {};
const acmilanitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['acmilan-it'] = {
  revenueLinesByYear: acmilanitRevenueLinesByYear, expenseLinesByYear: acmilanitExpenseLinesByYear,
  fiscalYearMeta: acmilanitFiscalYearMeta, pasesData: acmilanitPasesData,
  resultadosData: acmilanitResultadosData, titulosData: acmilanitTitulosData,
  presupuestoOverlayByYear: acmilanitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'acmilan-it-bilanci-relazioni-2023-24': {
    id:'acmilan-it-bilanci-relazioni-2023-24', clubId:'acmilan-it',
    title:'A.C. Milan S.p.A. — AC-Milan-bilanci-relazioni-2023-24 (ejercicio 2024)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.md; categorías del pipeline (claude-opus-5-5). Perímetro: consolidado.',
  },
});

memberCountByClub['acmilan-it'] = null;
