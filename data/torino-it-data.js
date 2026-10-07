// ============================================================================
// data/torino-it-data.js — Torino Football Club S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Torino/Torino-bilancio-2024.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "torino-it" — slug de "Torino" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Torino Football Club S.p.A." — el .md, 4 veces (nombre del club + forma societaria)
//   displayName        ok        "Torino" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: contenido del .md (131 de 134 fechas de fin de mes caen en el mes 12)
//   sport              ok        "futbol" — el .md nombra el fútbol 7 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] torino: #ECAC00 Orange, #8B2A1F Dark Red, #5B8CC1 Blue, #FFFFFF White
//   anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2024-12-31" — año del ejercicio + mes de cierre (contenido del .md (131 de 134 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 3 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2024-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-12-31 = 0.9626 (Cierre BCE al 31/12/2024 (1 EUR = 1,0389 USD))
//   sourceId           ok        "torino-it-bilancio-2024" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Torino"
//
// FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-12-31","sourceId":"torino-it-bilancio-2024"}
// ============================================================================

const torinoitRevenueLinesByYear = {};
const torinoitExpenseLinesByYear = {};
const torinoitFiscalYearMeta = {};
const torinoitPresupuestoOverlayByYear = {};

const torinoitPasesData = [];
const torinoitResultadosData = {};
const torinoitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['torino-it'] = {
  revenueLinesByYear: torinoitRevenueLinesByYear, expenseLinesByYear: torinoitExpenseLinesByYear,
  fiscalYearMeta: torinoitFiscalYearMeta, pasesData: torinoitPasesData,
  resultadosData: torinoitResultadosData, titulosData: torinoitTitulosData,
  presupuestoOverlayByYear: torinoitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['torino-it'] = null;
