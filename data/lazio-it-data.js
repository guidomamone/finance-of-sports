// ============================================================================
// data/lazio-it-data.js — S.S. Lazio S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Lazio/Lazio-bilancio-separato-consolidato-2022-23.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "lazio-it" — slug de "Lazio" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "S.S. Lazio S.p.A." — el .md, 15 veces (nombre del club + forma societaria)
//   displayName        ok        "Lazio" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (658 de 691 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 26 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] lazio: #74D1EA Sky Blue, #FFFFFF White, #D69A2D Gold, #003A70 Navy Blue
//   anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2023-06-30" — año del ejercicio + mes de cierre (contenido del .md (658 de 691 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 5 documento(s) con los dos estados votan consolidad
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2023-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-06-30 = 0.9203 (Cierre BCE al 30/6/2023 (1 EUR = 1,0866 USD))
//   sourceId           ok        "lazio-it-bilancio-separato-consolidato-2022-23" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Lazio"
//
// FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-06-30","sourceId":"lazio-it-bilancio-separato-consolidato-2022-23"}
// ============================================================================

const lazioitRevenueLinesByYear = {};
const lazioitExpenseLinesByYear = {};
const lazioitFiscalYearMeta = {};
const lazioitPresupuestoOverlayByYear = {};

const lazioitPasesData = [];
const lazioitResultadosData = {};
const lazioitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['lazio-it'] = {
  revenueLinesByYear: lazioitRevenueLinesByYear, expenseLinesByYear: lazioitExpenseLinesByYear,
  fiscalYearMeta: lazioitFiscalYearMeta, pasesData: lazioitPasesData,
  resultadosData: lazioitResultadosData, titulosData: lazioitTitulosData,
  presupuestoOverlayByYear: lazioitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['lazio-it'] = null;
