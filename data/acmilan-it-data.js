// ============================================================================
// data/acmilan-it-data.js — A.C. Milan S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/AC Milan/AC-Milan-bilanci-relazioni-2023-24.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "acmilan-it" — slug de "AC Milan" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "A.C. Milan S.p.A." — el .md, 18 veces (nombre del club + forma societaria)
//   displayName        ok        "AC Milan" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (619 de 641 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 74 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [argentina] ac milan: #E4002B Crimson Red, #101820 Black, #FFFFFF White | [italia] ac milan: #E4002B Crimso
//   anio               ok        2024 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2024-06-30" — año del ejercicio + mes de cierre (contenido del .md (619 de 641 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 5 documento(s) con los dos estados votan consolidad
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fx                 pendiente null — el .md menciona tipo de cambio y dólar con números en 2 línea(s), pero ninguno es una cotización plausible
//   fxRef              ok        "EUR@2024-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2024-06-30 = 0.9337 (Cierre BCE al 30/6/2024 (1 EUR = 1,071 USD))
//   sourceId           ok        "acmilan-it-bilanci-relazioni-2023-24" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2023–24 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "AC Milan"
//
// FISCAL YEAR META PROPUESTO para 2024 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2024: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2024-06-30","sourceId":"acmilan-it-bilanci-relazioni-2023-24"}
// ============================================================================

const acmilanitRevenueLinesByYear = {};
const acmilanitExpenseLinesByYear = {};
const acmilanitFiscalYearMeta = {};
const acmilanitPresupuestoOverlayByYear = {};

const acmilanitPasesData = [];
const acmilanitResultadosData = {};
const acmilanitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['acmilan-it'] = {
  revenueLinesByYear: acmilanitRevenueLinesByYear, expenseLinesByYear: acmilanitExpenseLinesByYear,
  fiscalYearMeta: acmilanitFiscalYearMeta, pasesData: acmilanitPasesData,
  resultadosData: acmilanitResultadosData, titulosData: acmilanitTitulosData,
  presupuestoOverlayByYear: acmilanitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['acmilan-it'] = null;
