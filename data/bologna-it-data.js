// ============================================================================
// data/bologna-it-data.js — Bologna F.C. 1909 S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Bologna/Bologna-bilancio-consolidato-2018-19.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "bologna-it" — slug de "Bologna" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Bologna F.C. 1909 S.p.A." — el .md, 47 veces (nombre del club + forma societaria)
//   displayName        ok        "Bologna" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — cierre del ejercicio: contenido del .md (149 de 151 fechas de fin de mes caen en el mes 6)
//   sport              ok        "futbol" — el .md nombra el fútbol 16 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] bologna: #1B2838 Navy Blue, #9F1F33 Dark Red, #FFFFFF White, #DEDEE2 Light Grey
//   anio               ok        2019 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2019-06-30" — año del ejercicio + mes de cierre (contenido del .md (149 de 151 fechas de fin de mes caen en el mes 6))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 6 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2019-06-30" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2019-06-30 = 0.878735 (Tipo de referencia del Banco Central Europeo, última rueda hábil 
//   sourceId           ok        "bologna-it-bilancio-consolidato-2018-19" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2018–19 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Bologna"
//
// FISCAL YEAR META PROPUESTO para 2019 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2019: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2019-06-30","sourceId":"bologna-it-bilancio-consolidato-2018-19"}
// ============================================================================

const bolognaitRevenueLinesByYear = {};
const bolognaitExpenseLinesByYear = {};
const bolognaitFiscalYearMeta = {};
const bolognaitPresupuestoOverlayByYear = {};

const bolognaitPasesData = [];
const bolognaitResultadosData = {};
const bolognaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['bologna-it'] = {
  revenueLinesByYear: bolognaitRevenueLinesByYear, expenseLinesByYear: bolognaitExpenseLinesByYear,
  fiscalYearMeta: bolognaitFiscalYearMeta, pasesData: bolognaitPasesData,
  resultadosData: bolognaitResultadosData, titulosData: bolognaitTitulosData,
  presupuestoOverlayByYear: bolognaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['bologna-it'] = null;
