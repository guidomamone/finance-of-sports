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

const udineseitRevenueLinesByYear = {};
const udineseitExpenseLinesByYear = {};
const udineseitFiscalYearMeta = {};
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
});

memberCountByClub['udinese-it'] = null;
