// ============================================================================
// data/cremonese-it-data.js — U.S. Cremonese S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Cremonese/Cremonese-bilancio-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "cremonese-it" — slug de "Cremonese" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "U.S. Cremonese S.p.A." — el .md, 9 veces (nombre del club + forma societaria)
//   displayName        ok        "Cremonese" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (157 de 164 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 18 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] cremonese: #ED1C24 Red, #808285 Grey, #CF9C51 Gold, #0A4A9B Dark Blue
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (157 de 164 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (0 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
//   sourceId           ok        "cremonese-it-bilancio-2025" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"cremonese-it-bilancio-2025"}
// ============================================================================

const cremoneseitRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Cremonese/Cremonese-bilancio-2025.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Cremonese/Cremonese-bilancio-2025.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'Gare di campionato part. In casa 1^ squadra', normalizedCategory:'matchday_competition', amountNative:0.775482, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.99
    { rawLabel:'Abbonamenti stagione sportiva', normalizedCategory:'season_tickets', amountNative:0.778032, disclosureLevel:'aggregated' }, // pág. 41, Jev 1
    { rawLabel:'Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.071304, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.99
    { rawLabel:'Gare del settore giovanile', normalizedCategory:'youth_football', amountNative:0.0139, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.95
    { rawLabel:'Gare amichevoli e altri', normalizedCategory:'matchday_competition', amountNative:0.009921, disclosureLevel:'aggregated' }, // pág. 41, Claude 0.85
    { rawLabel:'contributi in conto esercizio', normalizedCategory:'other_income', amountNative:5.47336, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.97
    { rawLabel:'altri', normalizedCategory:'lump_football_operations', amountNative:50.276342, disclosureLevel:'aggregated' }, // pág. 5, precedente
  ],
};
const cremoneseitExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.368862, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.99
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.481316, disclosureLevel:'aggregated' }, // pág. 43, precedente
    { rawLabel:'Vitto, alloggio e locomozioni gare', normalizedCategory:'match_organisation_expense', amountNative:-0.730276, disclosureLevel:'aggregated' }, // pág. 43, Jev 1
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.147871, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per intermediazioni', normalizedCategory:'other_expenses', amountNative:-2.136098, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Servizio biglietteria, ingressi e stewarding', normalizedCategory:'match_organisation_expense', amountNative:-0.39994, disclosureLevel:'aggregated' }, // pág. 44, Jev 1
    { rawLabel:'Costi assicurativi', normalizedCategory:'admin_general_expense', amountNative:-0.124116, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.95
    { rawLabel:'Costi per servizi da banche e soc finanziarie', normalizedCategory:'admin_general_expense', amountNative:-0.504455, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per prestazioni al personale', normalizedCategory:'admin_general_expense', amountNative:-0.104616, disclosureLevel:'aggregated' }, // pág. 44, precedente
    { rawLabel:'Costi per utenze e spese generali', normalizedCategory:'admin_general_expense', amountNative:-0.821266, disclosureLevel:'aggregated' }, // pág. 44, Jev 1
    { rawLabel:'Compensi e rimborsi spese a terzi', normalizedCategory:'admin_general_expense', amountNative:-0.536433, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.98
    { rawLabel:'Costi per pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.100783, disclosureLevel:'aggregated' }, // pág. 44, Jev 1
    { rawLabel:'Costi per manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-0.463485, disclosureLevel:'aggregated' }, // pág. 44, Jev 0.99
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-0.873015, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.99
    { rawLabel:'Stipendi tesserati ed area sportiva 1° Squadra', normalizedCategory:'wages_squad', amountNative:-22.385854, disclosureLevel:'aggregated' }, // pág. 45, Jev 1
    { rawLabel:'Stipendi tesserati ed area sportiva SG', normalizedCategory:'youth_other_sports_expense', amountNative:-1.1501, disclosureLevel:'aggregated' }, // pág. 45, Claude 0.85
    { rawLabel:'Premi a tesserati ed area sport 1° squadra', normalizedCategory:'wages_squad', amountNative:-7.823304, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.99
    { rawLabel:'Premi a tesserati ed area sportiva SG', normalizedCategory:'youth_other_sports_expense', amountNative:-0.034, disclosureLevel:'aggregated' }, // pág. 45, Claude 0.85
    { rawLabel:'Indennità e incentivi all\'esodo tesserati', normalizedCategory:'wages_squad', amountNative:-1.3723, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Stipendi direzione', normalizedCategory:'admin_general_expense', amountNative:-0.8, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.97
    { rawLabel:'Premi promozione personale direttivo', normalizedCategory:'admin_general_expense', amountNative:-0.288, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Altri stipendi e salari', normalizedCategory:'admin_general_expense', amountNative:-1.269474, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.902203, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.96
    { rawLabel:'Indennità di fine carriera', normalizedCategory:'wages_squad', amountNative:-0.398228, disclosureLevel:'aggregated' }, // pág. 45, precedente
    { rawLabel:'Trattamento di fine rapporto maturato', normalizedCategory:'wages_squad', amountNative:-0.151312, disclosureLevel:'aggregated' }, // pág. 45, Jev 0.95
    { rawLabel:'e) altri costi', normalizedCategory:'other_expenses', amountNative:-0.004799, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.98
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-9.547126, disclosureLevel:'aggregated' }, // pág. 5, Claude 0.8
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.881789, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-1.4247, disclosureLevel:'aggregated' }, // pág. 5, Jev 0.93
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:0, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.023325, disclosureLevel:'aggregated' }, // pág. 5, Jev 1
    { rawLabel:'Oneri vari da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-0.226626, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'Tasse iscrizioni campionato e gare', normalizedCategory:'match_organisation_expense', amountNative:-0.23949, disclosureLevel:'aggregated' }, // pág. 46, Claude 0.85
    { rawLabel:'Costi per acquisizione temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.38, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.98
    { rawLabel:'Minusv. da cessione diritti pluriennali calciatori', normalizedCategory:'exceptional_items', amountNative:-0.005919, disclosureLevel:'aggregated' }, // pág. 46, Jev 1
    { rawLabel:'Costi per premi ex-art 103 comma 3 NOIF', normalizedCategory:'player_amortisation', amountNative:-0.4208, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri costi per premi e indennizzi', normalizedCategory:'other_expenses', amountNative:-2.244821, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri oneri da gestione calciatori', normalizedCategory:'other_expenses', amountNative:-0.159177, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.99
    { rawLabel:'Contributo di solidarietà alla Lega B', normalizedCategory:'match_organisation_expense', amountNative:-0.377828, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Multe gare ed imposte e tasse varie', normalizedCategory:'admin_general_expense', amountNative:-0.085823, disclosureLevel:'aggregated' }, // pág. 46, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.109739, disclosureLevel:'aggregated' }, // pág. 46, Jev 0.97
  ],
};
const cremoneseitFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 24.755. proventi y oneri con la misma etiqueta 'altri'; el oneri (L190) impreso en positivo; Totale C (L192) (4.261) (to-do 155/156, arreglo manual 2026-10-07)
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (29.016). ver el anterior (to-do 155/156, arreglo manual 2026-10-07)
  2025: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'cremonese-it-bilancio-2025',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.004261, tax:1.073132,
    extraRows: [
      {label:'altri (proventi finanziari)', value:-0.024755},
      {label:'altri (oneri finanziari)', value:0.029016},
      {label:'imposte correnti', value:-1.182142},
      {label:'imposte differite e anticipate', value:2.255274},
    ],
    // sinDesglose: líneas que el documento no desglosa (categoría "sin desglosar por la fuente"); la página todavía no lo lee (Versión 332).
    sinDesglose: [
      {renglon:'altri', lado:'revenue', importe:50.276342, motivo:'Claude 2026-10-07 (Guido delega; criterios del to-do 152)'},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:57.398341, officialTotalExpenses:65.452619, officialPAT:-6.985407,
  },
};
const cremoneseitPresupuestoOverlayByYear = {};

const cremoneseitPasesData = [];
const cremoneseitResultadosData = {};
const cremoneseitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['cremonese-it'] = {
  revenueLinesByYear: cremoneseitRevenueLinesByYear, expenseLinesByYear: cremoneseitExpenseLinesByYear,
  fiscalYearMeta: cremoneseitFiscalYearMeta, pasesData: cremoneseitPasesData,
  resultadosData: cremoneseitResultadosData, titulosData: cremoneseitTitulosData,
  presupuestoOverlayByYear: cremoneseitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'cremonese-it-bilancio-2025': {
    id:'cremonese-it-bilancio-2025', clubId:'cremonese-it',
    title:'U.S. Cremonese S.p.A. — Cremonese-bilancio-2025 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Cremonese/Cremonese-bilancio-2025.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['cremonese-it'] = null;
