// ============================================================================
// data/napoli-it-data.js — SSC Napoli S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Napoli/Napoli-bilancio-2025.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "napoli-it" — slug de "Napoli" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "SSC Napoli S.p.A." — el .md, 67 veces (nombre del club + forma societaria)
//   displayName        ok        "Napoli" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (190 de 198 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 27 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] napoli: #00ABE7 Blue, #FFFFFF White
//   anio               ok        2025 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2025-06-30" — año del ejercicio + mes de cierre (contenido del .md (190 de 198 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2025-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2025-06-30 = 0.8532 (Cierre BCE al 30/6/2025 (1 EUR = 1,172 USD))
//   sourceId           ok        "napoli-it-bilancio-2025" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2024–25 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Napoli"
//
// FISCAL YEAR META PROPUESTO para 2025 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2025: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2025-06-30","sourceId":"napoli-it-bilancio-2025"}
// ============================================================================

const napoliitRevenueLinesByYear = {};
const napoliitExpenseLinesByYear = {};
const napoliitFiscalYearMeta = {};
const napoliitPresupuestoOverlayByYear = {};

const napoliitPasesData = [];
const napoliitResultadosData = {};
const napoliitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['napoli-it'] = {
  revenueLinesByYear: napoliitRevenueLinesByYear, expenseLinesByYear: napoliitExpenseLinesByYear,
  fiscalYearMeta: napoliitFiscalYearMeta, pasesData: napoliitPasesData,
  resultadosData: napoliitResultadosData, titulosData: napoliitTitulosData,
  presupuestoOverlayByYear: napoliitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['napoli-it'] = null;
