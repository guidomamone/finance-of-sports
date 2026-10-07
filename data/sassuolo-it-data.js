// ============================================================================
// data/sassuolo-it-data.js — Unione Sportiva Sassuolo Calcio S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Sassuolo/Sassuolo-bilancio-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "sassuolo-it" — slug de "Sassuolo" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Unione Sportiva Sassuolo Calcio S.r.l." — el .md, 6 veces (nombre del club + forma societaria)
//   displayName        ok        "Sassuolo" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo
//   sport              ok        "futbol" — el .md nombra el fútbol 31 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] sassuolo: #1EA451 Green, #000000 Black
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien)
//   cierre             ok        "2025-12-31" — año del ejercicio + mes de cierre (los demás .md del club (1 de 1 documentos cierran en el mes 12); este documento no alcanza solo)
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-12-31 = 0.8511 (Cierre BCE al 31/12/2025 (1 EUR = 1,1750 USD))
//   sourceId           ok        "sassuolo-it-bilancio-2025" — clubId + nombre del archivo en slug
//   liga               pendiente null — no aparece en los rosters cacheados de 2025 (it-seriea): puede haber jugado otra división
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-12-31","sourceId":"sassuolo-it-bilancio-2025"}
// ============================================================================

const sassuoloitRevenueLinesByYear = {};
const sassuoloitExpenseLinesByYear = {};
const sassuoloitFiscalYearMeta = {};
const sassuoloitPresupuestoOverlayByYear = {};

const sassuoloitPasesData = [];
const sassuoloitResultadosData = {};
const sassuoloitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['sassuolo-it'] = {
  revenueLinesByYear: sassuoloitRevenueLinesByYear, expenseLinesByYear: sassuoloitExpenseLinesByYear,
  fiscalYearMeta: sassuoloitFiscalYearMeta, pasesData: sassuoloitPasesData,
  resultadosData: sassuoloitResultadosData, titulosData: sassuoloitTitulosData,
  presupuestoOverlayByYear: sassuoloitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['sassuolo-it'] = null;
