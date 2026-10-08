// ============================================================================
// data/parma-it-data.js — Parma Calcio 1913 S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Parma/Parma-bilancio-31.12.2023-individual.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "parma-it" — slug de "Parma" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Parma Calcio 1913 S.r.l." — el .md, 33 veces (nombre del club + forma societaria)
//   displayName        ok        "Parma" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — el documento más reciente del club (Parma-bilancio-31.12.2025-consolidato.md, cierre mes 12): el cierre CAMBIÓ en el tiempo (mes 6: 2018 / mes 12: 202
//   sport              ok        "futbol" — el .md nombra el fútbol 123 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] parma: #FFCF01 Yellow, #24338A Dark Blue, #1C1E1C Black, #FFFFFF White
//   anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2023-12-31" — año del ejercicio + mes de cierre (nombre del archivo (2023-12-31) y contenido del .md (149 de 158 fechas de fin de mes))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-06): Guido 2026-10-06: individual (Parma Calcio 1913 S.r.l.); en 2023 y 2024 el consolidado
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2023-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-12-31 = 0.905 (Cierre BCE del viernes 29/12/2023 (el 31 es domingo, sin cotización)
//   sourceId           ok        "parma-it-bilancio-31-12-2023-individual" — clubId + nombre del archivo en slug
//   liga               ok        "it-serieb" — roster cacheado de "2023–24 Serie B" (tools/club-league-reference/it.json), coincidencia exacta "Parma"
//
// FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-12-31","sourceId":"parma-it-bilancio-31-12-2023-individual"}
// ============================================================================

const parmaitRevenueLinesByYear = {
  // 2023: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Parma/Parma-bilancio-31.12.2023-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Parma/Parma-bilancio-31.12.2023-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; gastos "total de gastos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2023: [
    { rawLabel:'Gare Ufficiali Campionato', normalizedCategory:'matchday_competition', amountNative:1.950086, disclosureLevel:'aggregated' }, // pág. 37, Jev 0.99
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.993446, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:0.608116, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:2.104869, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:2.824032, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.050727, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:2.98068, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Proventi da cessione diritti prestazioni calciatori', normalizedCategory:'player_sales', amountNative:3.727064, disclosureLevel:'aggregated' }, // pág. 37, Jev 1
    { rawLabel:'Altri proventi gestione calciatori', normalizedCategory:'player_sales', amountNative:2.381525, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.9
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:5.936768, disclosureLevel:'aggregated' }, // pág. 38, Jev 0.97
    { rawLabel:'Ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:5.334062, disclosureLevel:'aggregated' }, // pág. 38, Jev 1
  ],
  // 2021: cargado por tools/cargar.mjs (2026-10-08) desde Clubes/Italia/Parma/Parma-bilancio-31.12.2021-individual.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Parma/Parma-bilancio-31.12.2021-individual.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2021: [
    { rawLabel:'Gare Ufficiali Campionato', normalizedCategory:'matchday_competition', amountNative:0.526552, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:0.228302, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:0.621111, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'4) incrementi di immobilizzazioni per lavori interni', normalizedCategory:'other_income', amountNative:0, disclosureLevel:'aggregated' }, // pág. 20, Jev 1
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:2.640706, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:3.075404, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.106859, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Proventi da cessione diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:15.06204, disclosureLevel:'aggregated' }, // pág. 38, precedente
    { rawLabel:'Proventi da cessione diritti pluriennali prestazioni calciatori', normalizedCategory:'player_sales', amountNative:1.394738, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Altri proventi gestione calciatori', normalizedCategory:'player_sales', amountNative:0.75978, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Contributi in conto esercizio', normalizedCategory:'other_income', amountNative:14.272881, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Ricavi e proventi diversi', normalizedCategory:'other_income', amountNative:1.992988, disclosureLevel:'aggregated' }, // pág. 39, precedente
  ],
};
const parmaitExpenseLinesByYear = {
  2023: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-3.136757, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-2.319997, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Costi specifici Tecnici', normalizedCategory:'match_organisation_expense', amountNative:-1.075539, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Costi per intermediazioni', normalizedCategory:'other_expenses', amountNative:-0.618357, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Costi per prestazioni servizi personale', normalizedCategory:'admin_general_expense', amountNative:-0.35308, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Costi vitto, alloggio e locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-3.048921, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Compensi e rimborsi spesa a terzi', normalizedCategory:'admin_general_expense', amountNative:-0.252173, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.98
    { rawLabel:'Costi per servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.502695, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Costi per pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-1.458608, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'Costi Assicurativi', normalizedCategory:'admin_general_expense', amountNative:-0.935834, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.94
    { rawLabel:'Costi per utenze e spese generali', normalizedCategory:'admin_general_expense', amountNative:-1.122875, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Costi per manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-1.526555, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.99
    { rawLabel:'Costi per servizio da banche e finanz.', normalizedCategory:'admin_general_expense', amountNative:-0.003205, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.95
    { rawLabel:'Legali e Amministrativi', normalizedCategory:'admin_general_expense', amountNative:-1.899744, disclosureLevel:'aggregated' }, // pág. 39, Jev 1
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-1.956473, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.94
    { rawLabel:'Fitti Passivi', normalizedCategory:'admin_general_expense', amountNative:-0.520435, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.97
    { rawLabel:'Costi per noleggi', normalizedCategory:'admin_general_expense', amountNative:-0.784282, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.95
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.118052, disclosureLevel:'aggregated' }, // pág. 39, precedente
    { rawLabel:'Altri costi per il godimento dei beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-0.007813, disclosureLevel:'aggregated' }, // pág. 39, Jev 0.96
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-38.840975, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-4.092251, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.95
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.865627, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.91
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-34.306505, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.903215, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-0.097591, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.94
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.390589, disclosureLevel:'aggregated' }, // pág. 17, Jev 1
    { rawLabel:'11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:0.635389, disclosureLevel:'aggregated' }, // pág. 17, Jev 0.99
    { rawLabel:'13) altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:-0.4, disclosureLevel:'aggregated' }, // pág. 17, precedente
    { rawLabel:'Spese per organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.081612, disclosureLevel:'aggregated' }, // pág. 40, Jev 1
    { rawLabel:'Tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.026714, disclosureLevel:'aggregated' }, // pág. 40, Jev 0.98
    { rawLabel:'Costi acq. Temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-0.309507, disclosureLevel:'aggregated' }, // pág. 40, Jev 0.98
    { rawLabel:'Altri oneri gestione calciatori', normalizedCategory:'other_expenses', amountNative:-4.52096, disclosureLevel:'aggregated' }, // pág. 40, Jev 0.99
    { rawLabel:'Altri oneri di gestione', normalizedCategory:'other_expenses', amountNative:-2.473522, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.99
  ],
  2021: [ // tools/cargar.mjs (2026-10-08)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-1.802752, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-3.113622, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi specifici Tecnici', normalizedCategory:'match_organisation_expense', amountNative:-0.494667, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per intermediazioni', normalizedCategory:'other_expenses', amountNative:-1.37273, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per prestazioni servizi personale', normalizedCategory:'admin_general_expense', amountNative:-0.432246, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi vitto, alloggio e locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.738192, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Compensi e rimborsi spesa a terzi', normalizedCategory:'admin_general_expense', amountNative:-0.323351, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per servizio biglietteria, controllo ingressi', normalizedCategory:'match_organisation_expense', amountNative:-0.089825, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per pubblicità e propaganda', normalizedCategory:'admin_general_expense', amountNative:-0.800362, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi Assicurativi', normalizedCategory:'admin_general_expense', amountNative:-0.411993, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per utenze e spese generali', normalizedCategory:'admin_general_expense', amountNative:-3.09042, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per manutenzioni e riparazioni', normalizedCategory:'admin_general_expense', amountNative:-0.591721, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per servizio da banche e finanz.', normalizedCategory:'admin_general_expense', amountNative:-0.840302, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Altri', normalizedCategory:'other_expenses', amountNative:-0.259671, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Fitti Passivi', normalizedCategory:'admin_general_expense', amountNative:-0.62935, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per noleggi', normalizedCategory:'admin_general_expense', amountNative:-0.107553, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.671864, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Altri costi per il godimento dei beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-0.042602, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.010497, disclosureLevel:'aggregated' }, // pág. 40, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-55.88052, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.582208, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.726685, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-41.469946, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-0.792947, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilità liquide', normalizedCategory:'other_expenses', amountNative:-0.21243, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'11) variazioni delle rimanenze di materie prime, sussidiarie, di consumo e merci', normalizedCategory:'other_expenses', amountNative:-0.112467, disclosureLevel:'aggregated' }, // pág. 20, precedente
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.015, disclosureLevel:'aggregated' }, // pág. 20, Jev 0.99
    { rawLabel:'Spese per organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.55061, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Tasse iscrizione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.012945, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Oneri Specifici verso squadre ospitate', normalizedCategory:'match_organisation_expense', amountNative:-0.003099, disclosureLevel:'aggregated' }, // pág. 41, Jev 1
    { rawLabel:'Costi acq. Temporanea calciatori', normalizedCategory:'other_expenses', amountNative:-2.563786, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Costi valorizzazione calciatori', normalizedCategory:'player_amortisation', amountNative:-0.01, disclosureLevel:'aggregated' }, // pág. 41, precedente
    { rawLabel:'Costi accessori campagna trasferimenti', normalizedCategory:'other_expenses', amountNative:-0.79778, disclosureLevel:'aggregated' }, // pág. 41, Jev 1
    { rawLabel:'Minusvalenze cessioni calciatori', normalizedCategory:'exceptional_items', amountNative:-1.412457, disclosureLevel:'aggregated' }, // pág. 41, Jev 0.99
    { rawLabel:'Altri oneri di gestione', normalizedCategory:'other_expenses', amountNative:-4.44432, disclosureLevel:'aggregated' }, // pág. 41, precedente
  ],
};
const parmaitFiscalYearMeta = {
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 0. el renglón 'altri' 25.339.727 se contaba dos veces: la nota b46 abre 'Totale altri ricavi e proventi' (L558) (to-do 155/156, arreglo manual 2026-10-07)
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 40.063. proventi y oneri con la misma etiqueta; el oneri impreso en positivo; Totale C (L589) (68.583) (to-do 155/156, arreglo manual 2026-10-07)
  // 2023: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (108.646). ver el anterior (to-do 155/156, arreglo manual 2026-10-07)
  2023: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2023-12-31',
    sourceId:'parma-it-bilancio-31-12-2023-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-0.068583, tax:0,
    extraRows: [
      {label:'altri (proventi finanziari)', value:0.040063},
      {label:'altri (oneri finanziari)', value:-0.108646},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:28.891375, officialTotalExpenses:109.315074, officialPAT:-80.492282,
  },
  2021: { // tools/cargar.mjs (2026-10-08). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2021-12-31',
    sourceId:'parma-it-bilancio-31-12-2021-individual',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:0.164714, tax:0,
    extraRows: [
      {label:'altri', value:0.216025},
      {label:'altri', value:-0.051311},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:40.681361, officialTotalExpenses:126.998463, officialPAT:-87.564848,
  },
};
const parmaitPresupuestoOverlayByYear = {};

const parmaitPasesData = [];
const parmaitResultadosData = {};
const parmaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['parma-it'] = {
  revenueLinesByYear: parmaitRevenueLinesByYear, expenseLinesByYear: parmaitExpenseLinesByYear,
  fiscalYearMeta: parmaitFiscalYearMeta, pasesData: parmaitPasesData,
  resultadosData: parmaitResultadosData, titulosData: parmaitTitulosData,
  presupuestoOverlayByYear: parmaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'parma-it-bilancio-31-12-2023-individual': {
    id:'parma-it-bilancio-31-12-2023-individual', clubId:'parma-it',
    title:'Parma Calcio 1913 S.r.l. — Parma-bilancio-31.12.2023-individual (ejercicio 2023)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-31.12.2023-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'parma-it-bilancio-31-12-2021-individual': {
    id:'parma-it-bilancio-31-12-2021-individual', clubId:'parma-it',
    title:'Parma Calcio 1913 S.r.l. — Parma-bilancio-31.12.2021-individual (ejercicio 2021)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-08) desde la transcripción Clubes/Italia/Parma/Parma-bilancio-31.12.2021-individual.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['parma-it'] = null;
