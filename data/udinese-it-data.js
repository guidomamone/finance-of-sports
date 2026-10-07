// ============================================================================
// data/udinese-it-data.js — Udinese Calcio S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Udinese/Udinese-bilancio-2024-25.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "udinese-it" — slug de "Udinese" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Udinese Calcio S.p.A." — el .md, 50 veces (nombre del club + forma societaria)
//   displayName        ok        "Udinese" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (235 de 240 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 89 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] udinese: #7F7F7F Grey, #8B7D37 Gold, #FFFFFF White, #000000 Black
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (235 de 240 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el .md no presenta estados consolidados (1 menciones de "consolidado")
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
//   sourceId           ok        "udinese-it-bilancio-2024-25" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Udinese"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"udinese-it-bilancio-2024-25"}
// ============================================================================

const udineseitRevenueLinesByYear = {
  // 2025: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Udinese/Udinese-bilancio-2024-25.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Udinese/Udinese-bilancio-2024-25.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2025: [
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:4.32294, disclosureLevel:'aggregated' }, // pág. 64, Jev 0.99
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.069453, disclosureLevel:'aggregated' }, // pág. 64, Jev 0.99
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.241685, disclosureLevel:'aggregated' }, // pág. 64, Jev 0.99
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:4.76569, disclosureLevel:'aggregated' }, // pág. 64, Jev 1
    { rawLabel:'contributi in conto esercizio', normalizedCategory:'other_income', amountNative:4.478748, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.97
    { rawLabel:'Proventi da sponsorizzazioni', normalizedCategory:'sponsorship_commercial', amountNative:3.285, disclosureLevel:'aggregated' }, // pág. 64, Jev 1
    { rawLabel:'Proventi pubblicitari', normalizedCategory:'sponsorship_commercial', amountNative:6.68376, disclosureLevel:'aggregated' }, // pág. 64, Jev 1
    { rawLabel:'Proventi commerciali e royalties', normalizedCategory:'sponsorship_commercial', amountNative:0.66827, disclosureLevel:'aggregated' }, // pág. 64, Jev 0.99
    { rawLabel:'Proventi da cessioni diritti audiovisivi', normalizedCategory:'broadcasting', amountNative:36.955129, disclosureLevel:'aggregated' }, // pág. 65, Jev 1
    { rawLabel:'Ricavi da cessione temporanea prestazione calciatori', normalizedCategory:'player_sales', amountNative:1.05, disclosureLevel:'aggregated' }, // pág. 65, Jev 0.98
    { rawLabel:'Plusvalenze da cessione calciatori', normalizedCategory:'player_sales', amountNative:72.321288, disclosureLevel:'aggregated' }, // pág. 65, Jev 0.99
    { rawLabel:'Altri proventi da trasferimento calciatori', normalizedCategory:'player_sales', amountNative:1.849082, disclosureLevel:'aggregated' }, // pág. 65, Jev 0.93
    { rawLabel:'Rimborsi assicurativi', normalizedCategory:'other_income', amountNative:0.161012, disclosureLevel:'aggregated' }, // pág. 66, Jev 1
    { rawLabel:'Altri ricavi e proventi', normalizedCategory:'other_income', amountNative:4.843268, disclosureLevel:'aggregated' }, // pág. 66, Jev 0.99
  ],
  // 2022: cargado por tools/cargar.mjs (2026-10-07) desde Clubes/Italia/Udinese/Udinese-bilancio-2021-22.md. Filas: proponer-carga.mjs (ancla-listas); categorías:
  // Generados/Italia/Udinese/Udinese-bilancio-2021-22.categorias.json (escalón por línea al lado). Tie-out contra lo impreso: ingresos "total de ingresos (verificado)" pág. null; resultado "resultado detectado por proponer-carga".
  2022: [
    { rawLabel:'- Gare Campionato', normalizedCategory:'matchday_competition', amountNative:2.858916, disclosureLevel:'aggregated' }, // pág. 63, Jev 0.99
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.027534, disclosureLevel:'aggregated' }, // pág. 63, Jev 0.99
    { rawLabel:'- Gare Coppa Italia', normalizedCategory:'matchday_competition', amountNative:0.016281, disclosureLevel:'aggregated' }, // pág. 63, Jev 0.99
    { rawLabel:'Abbonamenti', normalizedCategory:'season_tickets', amountNative:2.212326, disclosureLevel:'aggregated' }, // pág. 63, Jev 1
    { rawLabel:'contributi in conto esercizio', normalizedCategory:'other_income', amountNative:2.046228, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'altri', normalizedCategory:'other_income', amountNative:70.918956, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
  ],
};
const udineseitExpenseLinesByYear = {
  2025: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.953704, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.63643, disclosureLevel:'aggregated' }, // pág. 66, precedente
    { rawLabel:'Spese per organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.423586, disclosureLevel:'aggregated' }, // pág. 66, Jev 0.99
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-6.762137, disclosureLevel:'aggregated' }, // pág. 66, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-2.204748, disclosureLevel:'aggregated' }, // pág. 66, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.542234, disclosureLevel:'aggregated' }, // pág. 66, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-2.88892, disclosureLevel:'aggregated' }, // pág. 66, Jev 1
    { rawLabel:'Altre prestazioni di servizi', normalizedCategory:'admin_general_expense', amountNative:-3.833013, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'8) per godimento di beni di terzi', normalizedCategory:'admin_general_expense', amountNative:-1.036121, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.99
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-38.265285, disclosureLevel:'aggregated' }, // pág. 29, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-3.686235, disclosureLevel:'aggregated' }, // pág. 29, Jev 0.97
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.189742, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.85
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-46.918882, disclosureLevel:'aggregated' }, // pág. 29, Claude 0.8
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.135265, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-2.445613, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.97
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilita\' liquide', normalizedCategory:'other_expenses', amountNative:-1.330152, disclosureLevel:'aggregated' }, // pág. 30, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 30, Jev 0.97
    { rawLabel:'Oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-0.850966, disclosureLevel:'aggregated' }, // pág. 72, Jev 1
    { rawLabel:'Minusvalenze da cessioni diritti calciatori', normalizedCategory:'exceptional_items', amountNative:-0.482151, disclosureLevel:'aggregated' }, // pág. 72, Jev 0.97
    { rawLabel:'Altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-9.700351, disclosureLevel:'aggregated' }, // pág. 72, Jev 0.94
    { rawLabel:'Altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-3.414033, disclosureLevel:'aggregated' }, // pág. 72, Jev 0.95
  ],
  2022: [ // tools/cargar.mjs (2026-10-07)
    { rawLabel:'6) per materie prime, sussidiarie, di consumo e di merci', normalizedCategory:'other_expenses', amountNative:-2.763664, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.99
    { rawLabel:'Costi per attività sportiva', normalizedCategory:'match_organisation_expense', amountNative:-0.44203, disclosureLevel:'aggregated' }, // pág. 66, precedente
    { rawLabel:'Spese per organizzazione gare', normalizedCategory:'match_organisation_expense', amountNative:-0.780382, disclosureLevel:'aggregated' }, // pág. 66, Jev 0.99
    { rawLabel:'Costi specifici tecnici', normalizedCategory:'match_organisation_expense', amountNative:-8.833332, disclosureLevel:'aggregated' }, // pág. 66, precedente
    { rawLabel:'Costi vitto, alloggio, locomozione gare', normalizedCategory:'match_organisation_expense', amountNative:-1.766056, disclosureLevel:'aggregated' }, // pág. 66, Jev 1
    { rawLabel:'Assicurative e previdenziali', normalizedCategory:'admin_general_expense', amountNative:-0.469379, disclosureLevel:'aggregated' }, // pág. 66, precedente
    { rawLabel:'Amministrative, pubblicitarie e generali', normalizedCategory:'admin_general_expense', amountNative:-2.382209, disclosureLevel:'aggregated' }, // pág. 66, Jev 1
    { rawLabel:'Altre prestazioni di servizi', normalizedCategory:'admin_general_expense', amountNative:-3.841433, disclosureLevel:'aggregated' }, // pág. 66, precedente
    { rawLabel:'affitto dei campi sportivi', normalizedCategory:'match_organisation_expense', amountNative:-0.03565, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.96
    { rawLabel:'noleggio autoveicoli e automezzi per uso aziendale', normalizedCategory:'admin_general_expense', amountNative:-0.152938, disclosureLevel:'aggregated' }, // pág. 67, Jev 1
    { rawLabel:'spese per affitti e utenze locali ad uso foresteria', normalizedCategory:'admin_general_expense', amountNative:-0.378075, disclosureLevel:'aggregated' }, // pág. 67, Jev 0.95
    { rawLabel:'noleggio attrezzature', normalizedCategory:'match_organisation_expense', amountNative:-0.281153, disclosureLevel:'aggregated' }, // pág. 67, precedente
    { rawLabel:'a) salari e stipendi', normalizedCategory:'wages_squad', amountNative:-39.236173, disclosureLevel:'aggregated' }, // pág. 27, Jev 1
    { rawLabel:'b) oneri sociali', normalizedCategory:'wages_squad', amountNative:-2.242366, disclosureLevel:'aggregated' }, // pág. 27, Jev 0.97
    { rawLabel:'c) trattamento di fine rapporto', normalizedCategory:'wages_squad', amountNative:-0.122458, disclosureLevel:'aggregated' }, // pág. 27, Claude 0.85
    { rawLabel:'a) ammortamento delle immobilizzazioni immateriali', normalizedCategory:'player_amortisation', amountNative:-57.930334, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'b) ammortamento delle immobilizzazioni materiali', normalizedCategory:'depreciation', amountNative:-1.103644, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'c) altre svalutazioni delle immobilizzazioni', normalizedCategory:'player_impairment', amountNative:-1.522949, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.97
    { rawLabel:'d) svalutazioni dei crediti compresi nell\'attivo circolante e delle disponibilita\' liquide', normalizedCategory:'other_expenses', amountNative:-2.31176, disclosureLevel:'aggregated' }, // pág. 28, Jev 1
    { rawLabel:'12) accantonamenti per rischi', normalizedCategory:'other_amortisation', amountNative:-0.275818, disclosureLevel:'aggregated' }, // pág. 28, Jev 0.97
    { rawLabel:'13) altri accantonamenti', normalizedCategory:'other_amortisation', amountNative:0, disclosureLevel:'aggregated' }, // pág. 28, Claude 0.8
    { rawLabel:'Oneri da organizzazione competizioni', normalizedCategory:'match_organisation_expense', amountNative:-1.186421, disclosureLevel:'aggregated' }, // pág. 69, Jev 1
    { rawLabel:'Minusvalenze da cessioni diritti calciatori', normalizedCategory:'exceptional_items', amountNative:-8.019148, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.97
    { rawLabel:'Altri oneri da trasferimento diritti calciatori', normalizedCategory:'other_expenses', amountNative:-6.554013, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.94
    { rawLabel:'Altri oneri diversi di gestione', normalizedCategory:'other_expenses', amountNative:-1.756328, disclosureLevel:'aggregated' }, // pág. 69, Jev 0.95
  ],
};
const udineseitFiscalYearMeta = {
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 125.708. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (7.546.991). Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (2.531.869). Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
  // 2025: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 1.450.800. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
  2025: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2025-06-30',
    sourceId:'udinese-it-bilancio-2024-25',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-6.990887, tax:-1.081069,
    extraRows: [
      {label:'17-bis) utili e perdite su cambi', value:0.430396},
      {label:'altri proventi finanziari', value:0.125708},
      {label:'altri oneri finanziari (17, costo)', value:-7.546991},
      {label:'imposte correnti (costo)', value:-2.531869},
      {label:'imposte differite e anticipate (ingreso)', value:1.4508},
    ],
    grossDebt:null, cash:null,
    officialTotalRevenue:141.695325, officialTotalExpenses:130.217417, officialPAT:2.923802,
  },
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 121.750. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (5.856.187). Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = (2.354.788). Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): fila = 5.153.111. Guido 2026-10-07: formato Codice Civile: el 17) (interessi e altri oneri finanziari) y las imposte se imprimen como costo en positivo; la etapa 6 los tomaba con el signo impreso (to-do 155). Los dos renglones del estado se llaman 'altri' (16 y 17): se reemplazan los dos
  // 2022: AJUSTE MANUAL (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): incluye = broadcasting. Claude 2026-10-07: la TV (Proventi da cessioni diritti audiovisivi 36.160.511, nota L2442) está dentro del renglón 'altri' 70.918.956 del estado (L857); no se separa porque --reemplaza 'altri' también tocaría el 16) y el 17) (ver to-do 157)
  2022: { // tools/cargar.mjs (2026-10-07). grossDebt/cash: los completa tools/caja-deuda.mjs después de cargar (null = sin dato todavía). netInterest/tax: filas de resultado financiero / impuesto del estado.
    currency:'EUR', fxRef:'EUR@2022-06-30',
    sourceId:'udinese-it-bilancio-2021-22',
    reportType:'official_balance_sheet',
    gestionId:null,
    profitOnPlayerSales:0, assetSales:0,
    netInterest:-5.544096, tax:2.798323,
    extraRows: [
      {label:'c) da titoli iscritti nell\'attivo circolante che non costituiscono partecipazioni', value:null},
      {label:'17-bis) utili e perdite su cambi', value:0.190341},
      {label:'altri proventi finanziari', value:0.12175},
      {label:'altri oneri finanziari (17, costo)', value:-5.856187},
      {label:'imposte correnti (costo)', value:-2.354788},
      {label:'imposte differite e anticipate (ingreso)', value:5.153111},
    ],
    incluidoEn:{"broadcasting":"other_income"}, // ajuste manual `incluye`: el documento junta estas categorías con otra línea
    grossDebt:null, cash:null,
    officialTotalRevenue:78.080241, officialTotalExpenses:136.368565, officialPAT:-69.053247,
  },
};
const udineseitPresupuestoOverlayByYear = {};

const udineseitPasesData = [];
const udineseitResultadosData = {};
const udineseitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['udinese-it'] = {
  revenueLinesByYear: udineseitRevenueLinesByYear, expenseLinesByYear: udineseitExpenseLinesByYear,
  fiscalYearMeta: udineseitFiscalYearMeta, pasesData: udineseitPasesData,
  resultadosData: udineseitResultadosData, titulosData: udineseitTitulosData,
  presupuestoOverlayByYear: udineseitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
  'udinese-it-bilancio-2024-25': {
    id:'udinese-it-bilancio-2024-25', clubId:'udinese-it',
    title:'Udinese Calcio S.p.A. — Udinese-bilancio-2024-25 (ejercicio 2025)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Udinese/Udinese-bilancio-2024-25.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
  'udinese-it-bilancio-2021-22': {
    id:'udinese-it-bilancio-2021-22', clubId:'udinese-it',
    title:'Udinese Calcio S.p.A. — Udinese-bilancio-2021-22 (ejercicio 2022)',
    type:'official_balance_sheet', reliability:'primary',
    note:'Cargado por tools/cargar.mjs (2026-10-07) desde la transcripción Clubes/Italia/Udinese/Udinese-bilancio-2021-22.md; categorías del pipeline (claude-opus-5-5). Perímetro: individual.',
  },
});

memberCountByClub['udinese-it'] = null;
