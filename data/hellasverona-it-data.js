// ============================================================================
// data/hellasverona-it-data.js — Hellas Verona Football Club S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Hellas Verona/Hellas-Verona-bilancio-individuale-2020.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "hellasverona-it" — slug de "Hellas Verona" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Hellas Verona Football Club S.p.A." — el .md, 9 veces (nombre del club + forma societaria)
//   displayName        ok        "Hellas Verona" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (86 de 87 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 11 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] hellas verona: #FFD100 Yellow
//   anio               ok        2020 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2020-06-30" — año del ejercicio + mes de cierre (contenido del .md (86 de 87 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — el nombre del archivo dice que son los estados individuales ("Hellas-Verona-bilancio-individuale-2020.pdf"), y no hay un consolidado del mismo ejercic
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2020-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2020-06-30 = 0.893 (Cierre BCE al 30/6/2020 (1 EUR = 1,1198 USD))
//   sourceId           ok        "hellasverona-it-bilancio-individuale-2020" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2019–20 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Hellas Verona"
//
// FISCAL YEAR META PROPUESTO para 2020 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2020: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2020-06-30","sourceId":"hellasverona-it-bilancio-individuale-2020"}
// ============================================================================

const hellasveronaitRevenueLinesByYear = {};
const hellasveronaitExpenseLinesByYear = {};
const hellasveronaitFiscalYearMeta = {};
const hellasveronaitPresupuestoOverlayByYear = {};

const hellasveronaitPasesData = [];
const hellasveronaitResultadosData = {};
const hellasveronaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['hellasverona-it'] = {
  revenueLinesByYear: hellasveronaitRevenueLinesByYear, expenseLinesByYear: hellasveronaitExpenseLinesByYear,
  fiscalYearMeta: hellasveronaitFiscalYearMeta, pasesData: hellasveronaitPasesData,
  resultadosData: hellasveronaitResultadosData, titulosData: hellasveronaitTitulosData,
  presupuestoOverlayByYear: hellasveronaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['hellasverona-it'] = null;
