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

const sampdoriaitRevenueLinesByYear = {};
const sampdoriaitExpenseLinesByYear = {};
const sampdoriaitFiscalYearMeta = {};
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
});

memberCountByClub['sampdoria-it'] = null;
