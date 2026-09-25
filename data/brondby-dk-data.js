// ============================================================================
// data/brondby-dk-data.js — Brøndbyernes I.F. Fodbold A/S (clubId 'brondby-dk'). Un solo ejercicio:
// 2020 (año calendario, 1° de enero a 31 de diciembre de 2020 — el archivo más reciente
// transcripto para este club, no hay años más nuevos disponibles todavía, ver
// fuentes/Dinamarca/Brøndby.md).
//
// ENTIDAD LEGAL: Brøndbyernes I.F. Fodbold A/S, CVR 83 93 34 10, Brøndby Stadion 30, 2605 Brøndby.
//
// Fuente: transcripción completa en "Clubes/Dinamarca/Brøndby/aarsrapport-2020-12-31.md". Reporta
// bajo NIIF/IFRS (Totalindkomstopgørelse, no el formato "årsregnskabsloven" clásico de FCK/
// Midtjylland) — estructura de P&L distinta, con "Transferaktiviteter" como sección propia NETA
// entre el resultado operativo y los ítems financieros.
//
// Cifras en DKK MILLONES nativos (documento en tDKK = miles de coronas, dividido por 1.000 al
// cargar). `fxRef:'DKK@2020-12-31'` porque el documento no declara ningún tipo de cambio propio
// (todo en DKK, sociedad 100% doméstica) — cotización de cierre EUR/DKK del BCE (7,4409) / EUR/USD
// del BCE (1,2271) = 6,0638 DKK por USD, mismo método que FC København (ver comentario de
// data/fckobenhavn-dk-data.js y la entrada 'DKK@2020-12-31' en FX_CLOSE).
//
// OJO — VARIOS SUBTOTALES DE LA TRANSCRIPCIÓN TENÍAN EL SIGNO NEGATIVO CAÍDO (probablemente un
// artefacto de la conversión del XHTML/iXBRL original a texto plano, no un error del documento en
// sí). Se detectaron y corrigieron CONTRA los totales impresos de cada nota antes de cargar nada
// (regla #1 de CLAUDE.md, "precisión antes que velocidad"; ver club-data-mapping sección 6):
//   - Nota 7 "Eksterne omkostninger": "F&B og arrangementer m.v." transcripto como "4.138" (positivo)
//     no reconciliaba contra "Eksterne omkostninger i alt -60.304" (faltaban exactamente 4.138 de
//     diferencia) -> el valor real es -4.138.
//   - Nota 9 "Personaleomkostninger": el subtotal "Vederlag mm. til direktionen" transcripto como
//     "4.543" (positivo) no reconciliaba contra "Løn til bestyrelse og direktion -5.042" (que sí
//     suma bien con Bestyrelseshonorar -499) -> el valor real es -4.543.
//   - Nota 11 "Af- og nedskrivninger": "Driftsmateriel og inventar" transcripto como "4.034"
//     (positivo) no reconciliaba contra "Af- og nedskrivninger i alt -10.766" -> el valor real es
//     -4.034.
//   - La línea "Resultat før transferaktiviteter, fin. poster og skat" transcripta como "15.047"
//     (positivo) no reconciliaba (158.471 Indtægter - 173.518 Omkostninger = -15.047, y el próximo
//     subtotal "Resultat før finansielle poster og skat -23.104" solo cierra si se resta 8.057 de
//     -15.047, no de +15.047) -> el valor real es -15.047.
// Todos los demás números de este archivo SÍ reconcilian exacto contra su subtotal impreso, así que
// se cargaron tal cual la transcripción.
//
// CATEGORIZACIÓN DE INGRESOS (Nota 5 "Nettoomsætning", 6 líneas que suman EXACTO los 113.262 tDKK
// impresos):
//   - "Entré-, TV- og præmieindtægter" (recaudación de entradas, TV Y premios, LOS TRES mezclados
//     en una sola línea) -> broadcasting. 2020 fue un año con la mayoría de los partidos jugados a
//     puertas cerradas/con público muy restringido por COVID-19 en Dinamarca (ver Nota 6, más
//     abajo: el propio club recibió compensación estatal por "arrangørtab" — pérdida de organizador
//     — durante marzo-agosto y solicitó otra para septiembre-diciembre), así que la porción de
//     recaudación de entradas de esta línea combinada fue mínima ese año específico; se optó por
//     `broadcasting` en vez de `matchday_competition` por ese motivo puntual de 2020, no como
//     regla general. Aproximación documentada — ver Admin/dudas-por-club.md.
//   - "Indtægter fra partnere og sponsorer" -> sponsorship_commercial.
//   - "F&B og arrangementer m.v." (ingreso, distinto del costo de la nota 7 del mismo nombre) ->
//     stadium_other, mismo criterio que FC København: F&B/eventos en la sede propia (Brøndby
//     Stadion) es concesión/evento fuera del partido.
//   - "Merchandise m.v." -> sponsorship_commercial.
//   - "Udlejning erhvervsejendom m.v." (alquiler de inmueble comercial, nota aclara "vedrører
//     hovedsageligt kontrakt med udløb i 2026") -> other_income, CRITERIO CONSERVADOR (el rótulo no
//     nombra el estadio, a diferencia de la línea de F&B/eventos de arriba) — mismo tratamiento que
//     "Ejendomsudlejning" de FC København, pregunta anotada en Admin/dudas-por-club.md.
//   - "Anden nettoomsætning" (otro ingreso neto residual) -> other_income.
//   - "Andre driftsindtægter" (Nota 6, FUERA de Nettoomsætning, 45.209 tDKK): "Kompensation fra
//     Staten" (42.029, compensación estatal por pérdidas de organizador/nómina durante los cierres
//     COVID) + "Donation" (3.181) -> other_income, con `items` para el desglose. No hay una
//     categoría de "ítem excepcional" del lado de Ingresos (ver REVENUE_CATEGORIES en
//     data/category-map.js), así que el catch-all es la opción más honesta disponible.
//
// TRANSFERENCIAS DE JUGADORES — NETAS, A `fiscalYearMeta.profitOnPlayerSales`, NO COMO LÍNEA:
// a diferencia de FC København (que muestra el resultado de pases DENTRO de "Andre driftsindtægter"
// junto con otros ítems secundarios, sin sección propia), Brøndby presenta "Transferaktiviteter"
// como una SECCIÓN PROPIA de la Totalindkomstopgørelse (paralela a "Finansielle poster"), NETA
// (Indtægter 30.997 - Omkostninger 13.559 - Nedskrivninger 2.078 - Afskrivninger 23.417 = -8.057).
// Por la regla de club-data-mapping sección 2/3 ("reflejá cómo LO PRESENTA CADA CLUB" + "si el
// documento los muestra aparte del cuerpo principal de Recursos/Gastos, van a fiscalYearMeta"):
// profitOnPlayerSales = -8.057 (una PÉRDIDA neta de actividad de pases en 2020, no una ganancia).
//
// CATEGORIZACIÓN DE GASTOS (Nota 7 "Eksterne omkostninger", -60.304 tDKK total; Nota 9
// "Personaleomkostninger", -102.448 tDKK; Nota 11 "Af- og nedskrivninger", -10.766 tDKK):
//   - "Kamp- og spilleromkostninger" (costos de partido y jugadores) -> match_organisation_expense.
//   - "Salgs- og markedsføringsomkostninger" -> admin_general_expense (comercial/marketing, mismo
//     criterio que el comentario de EXPENSE_CATEGORY_LABELS.admin_general_expense).
//   - "F&B og arrangementer m.v." (costo, corregido a -4.138, ver arriba) -> admin_general_expense
//     (costo operativo de correr F&B/eventos, análogo a "mantenimiento de sede/estadio").
//   - "Driftsomkostninger ejendomme" (gastos operativos de inmuebles) -> admin_general_expense
//     (calce directo con "mantenimiento de sede/estadio" del comentario de esa categoría).
//   - "Vareforbrug m.v. merchandise" (costo de mercadería) -> other_expenses.
//   - "Administrationsomkostninger" -> admin_general_expense.
//   - "Løn til bestyrelse og direktion" (sueldos de directorio/gerencia, -5.042, suma de "Vederlag
//     mm. til direktionen" corregido -4.543 + "Bestyrelseshonorar" -499) -> admin_general_expense
//     (compensación ejecutiva/directorio, no plantel).
//   - "Gager og lønninger til medarbejdere" + "Pensionsordninger, bidragsbaserede" + "Andre
//     omkostninger til social sikring" + "Øvrige personaleomkostninger" (sueldos/cargas sociales
//     del resto del personal, -97.407 combinado) -> wages_squad: la nota de empleados promedio
//     muestra que 99 de 142 empleados son "Kontraktfodboldspillere inkl. damefodboldspillere og
//     stab" (jugadores contractuales + plantel femenino + staff), y el resto (39 administración + 4
//     F&B/lounge por hora) no tiene un monto separable — el club es una entidad 100% fútbol, sin
//     colegio/polideportivo/otras secciones, así que el bulto completo del personal (fuera de
//     directorio/gerencia) va a wages_squad, mismo criterio que FC København.
//   - Nota 11 "Bygninger m.v." (depreciación de edificios) + "Driftsmateriel og inventar"
//     (corregido a -4.034) -> depreciation, agrupadas con `items`.
//   - "Tab ved salg/afgang af anlægsaktiver" (pérdida por venta/baja de activos fijos) ->
//     other_expenses (monto chico, sin categoría más específica).
//
// RESULTADOS FINANCIEROS: Nota 13 "Finansielle indtægter" (14) - Nota 14 "Finansielle omkostninger"
// (2.763) = netInterest -2.749 (fiscalYearMeta).
//
// IMPUESTO A LAS GANANCIAS: tax = 0. Nota 15 confirma "Effektiv skatteprocent 0,0%" para 2020 y
// 2019 — el crédito fiscal calculado (22% sobre el resultado antes de impuestos) no se reconoce
// como activo por impuesto diferido ("Ikkeindregnet skatteaktiv"), así que el impuesto reconocido
// en el resultado es 0 en la práctica.
//
// VERIFICACIÓN (regla #1 de CLAUDE.md):
//   revenueLines suman 158.471 (113.262 Nettoomsætning + 45.209 Andre driftsindtægter) =
//   officialTotalRevenue.
//   expenseLines suman -173.518 (60.304 Eksterne omkostninger + 102.448 Personaleomkostninger +
//   10.766 Af-og nedskrivninger) = officialTotalExpenses.
//   158.471 - 173.518 = -15.047 (EXACTO igual al "Resultat før transferaktiviteter..." corregido,
//   ver nota de signos arriba).
//   -15.047 + profitOnPlayerSales(-8.057) = -23.104, EXACTO igual a "Resultat før finansielle
//   poster og skat" impreso.
//   -23.104 + netInterest(-2.749) = -25.853, EXACTO igual a "Resultat før skat" Y a "Årets resultat"
//   (tax=0) — cierre perfecto contra 3 subtotales impresos distintos del documento.
// ============================================================================

const brondbydkRevenueLinesByYear = {
  2020: [
    { rawLabel:'Entré-, TV- og præmieindtægter (recaudación de entradas, TV y premios combinados — 2020, año de público muy restringido por COVID-19)', normalizedCategory:'broadcasting', amountNative:35.128, disclosureLevel:'detailed' },
    { rawLabel:'Indtægter fra partnere og sponsorer', normalizedCategory:'sponsorship_commercial', amountNative:41.805, disclosureLevel:'detailed' },
    { rawLabel:'F&B og arrangementer m.v.', normalizedCategory:'stadium_other', amountNative:3.792, disclosureLevel:'detailed' },
    { rawLabel:'Merchandise m.v.', normalizedCategory:'sponsorship_commercial', amountNative:26.799, disclosureLevel:'detailed' },
    { rawLabel:'Udlejning erhvervsejendom m.v.', normalizedCategory:'other_income', amountNative:2.333, disclosureLevel:'detailed' },
    { rawLabel:'Anden nettoomsætning', normalizedCategory:'other_income', amountNative:3.405, disclosureLevel:'detailed' },
    { rawLabel:'Andre driftsindtægter (compensación estatal COVID-19 + donación)', normalizedCategory:'other_income', amountNative:45.209, disclosureLevel:'detailed', items:[
      ['Kompensation fra Staten', 42.029], ['Donation', 3.181],
    ]},
  ],
};

const brondbydkExpenseLinesByYear = {
  2020: [
    { rawLabel:'Kamp- og spilleromkostninger', normalizedCategory:'match_organisation_expense', amountNative:-11.145, disclosureLevel:'detailed' },
    { rawLabel:'Salgs- og markedsføringsomkostninger', normalizedCategory:'admin_general_expense', amountNative:-4.377, disclosureLevel:'detailed' },
    { rawLabel:'F&B og arrangementer m.v. (costo)', normalizedCategory:'admin_general_expense', amountNative:-4.138, disclosureLevel:'detailed' },
    { rawLabel:'Driftsomkostninger ejendomme', normalizedCategory:'admin_general_expense', amountNative:-8.189, disclosureLevel:'detailed' },
    { rawLabel:'Vareforbrug m.v. merchandise', normalizedCategory:'other_expenses', amountNative:-12.859, disclosureLevel:'detailed' },
    { rawLabel:'Administrationsomkostninger', normalizedCategory:'admin_general_expense', amountNative:-19.596, disclosureLevel:'detailed' },
    { rawLabel:'Løn til bestyrelse og direktion', normalizedCategory:'admin_general_expense', amountNative:-5.042, disclosureLevel:'detailed', items:[
      ['Vederlag mm. til direktionen', -4.543], ['Bestyrelseshonorar', -0.499],
    ]},
    { rawLabel:'Personaleomkostninger (plantel, staff y resto del personal, excluye directorio/gerencia)', normalizedCategory:'wages_squad', amountNative:-97.407, disclosureLevel:'detailed', items:[
      ['Gager og lønninger til medarbejdere', -84.040], ['Pensionsordninger, bidragsbaserede', -5.815], ['Andre omkostninger til social sikring', -1.285], ['Øvrige personaleomkostninger', -6.267],
    ]},
    { rawLabel:'Af- og nedskrivninger (bygninger, driftsmateriel og inventar)', normalizedCategory:'depreciation', amountNative:-10.658, disclosureLevel:'detailed', items:[
      ['Bygninger m.v.', -6.624], ['Driftsmateriel og inventar', -4.034],
    ]},
    { rawLabel:'Tab ved salg/afgang af anlægsaktiver', normalizedCategory:'other_expenses', amountNative:-0.108, disclosureLevel:'detailed' },
  ],
};

const brondbydkFiscalYearMeta = {
  2020: {
    currency:'DKK', fxRef:'DKK@2020-12-31',
    sourceId:'brondby-aarsrapport-2020',
    reportType:'official_balance_sheet',
    gestionId:null,
    netInterest:-2.749, // 14 (fin. indtægter) - 2.763 (fin. omkostninger)
    profitOnPlayerSales:-8.057, // Transferaktiviteter neto (30.997 - 13.559 - 2.078 - 23.417), ver comentario de cabecera
    assetSales:0,
    tax:0, // Nota 15: efectivo 0,0% (activo por impuesto diferido no reconocido)
    grossDebt:0, cash:0, // fuera de alcance de esta carga (Finanzas)
    officialTotalRevenue:158.471, officialTotalExpenses:173.518, officialPAT:-25.853,
  },
};

const brondbydkPresupuestoOverlayByYear = {};

const brondbydkPasesData = [];
const brondbydkResultadosData = {};
const brondbydkTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['brondby-dk'] = {
  revenueLinesByYear: brondbydkRevenueLinesByYear, expenseLinesByYear: brondbydkExpenseLinesByYear,
  fiscalYearMeta: brondbydkFiscalYearMeta, pasesData: brondbydkPasesData,
  resultadosData: brondbydkResultadosData, titulosData: brondbydkTitulosData,
  presupuestoOverlayByYear: brondbydkPresupuestoOverlayByYear,
};

Object.assign(sources, {
  'brondby-aarsrapport-2020': {
      id:'brondby-aarsrapport-2020', clubId:'brondby-dk',
      title:'Brøndbyernes I.F. Fodbold A/S — Årsrapport 2020 (1. januar - 31. december 2020)',
      type:'official_balance_sheet', reliability:'primary',
      note:'Descargado vía distribution.virk.dk (Erhvervsstyrelsen, CVR 83 93 34 10). Año afectado por COVID-19 (compensación estatal por pérdidas de organizador y nómina durante los cierres, ver Nota 6). Reporta bajo NIIF/IFRS, formato Totalindkomstopgørelse (distinto del formato clásico "årsregnskabsloven" de FC København/FC Midtjylland). Transcripción completa en Clubes/Dinamarca/Brøndby/aarsrapport-2020-12-31.md. No hay ejercicios más nuevos transcriptos todavía para este club.',
    },
});

memberCountByClub['brondby-dk'] = null;
