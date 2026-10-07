// ============================================================================
// data/parma-it-data.js — Parma Calcio 1913 S.r.l. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Parma/Parma-bilancio-31.12.2023-individual.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "parma-it" — slug de "Parma" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Parma Calcio 1913 S.r.l." — el .md, 33 veces (nombre del club + forma societaria)
//   displayName        ok        "Parma" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — el documento más reciente del club (Parma-bilancio-31.12.2025-consolidato.md, cierre mes 12): el cierre CAMBIÓ en el tiempo (mes 6: 2018 / mes 12: 202
//   sport              ok        "futbol" — el .md nombra el fútbol 123 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] parma: #FFCF01 Yellow, #24338A Dark Blue, #1C1E1C Black, #FFFFFF White
//   anio               ok        2023 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2023-12-31" — año del ejercicio + mes de cierre (nombre del archivo (2023-12-31) y contenido del .md (149 de 158 fechas de fin de mes))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-06): Guido 2026-10-06: individual (Parma Calcio 1913 S.r.l.); en 2023 y 2024 el consolidado
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2023-12-31" — el documento no declara tipo de cambio; FX_CLOSE ya tiene EUR@2023-12-31 = 0.905 (Cierre BCE del viernes 29/12/2023 (el 31 es domingo, sin cotización)
//   sourceId           ok        "parma-it-bilancio-31-12-2023-individual" — clubId + nombre del archivo en slug
//   liga               ok        "it-serieb" — roster cacheado de "2023–24 Serie B" (tools/club-league-reference/it.json), coincidencia exacta "Parma"
//
// FISCAL YEAR META PROPUESTO para 2023 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2023: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2023-12-31","sourceId":"parma-it-bilancio-31-12-2023-individual"}
// ============================================================================

const parmaitRevenueLinesByYear = {};
const parmaitExpenseLinesByYear = {};
const parmaitFiscalYearMeta = {};
const parmaitPresupuestoOverlayByYear = {};

const parmaitPasesData = [];
const parmaitResultadosData = {};
const parmaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['parma-it'] = {
  revenueLinesByYear: parmaitRevenueLinesByYear, expenseLinesByYear: parmaitExpenseLinesByYear,
  fiscalYearMeta: parmaitFiscalYearMeta, pasesData: parmaitPasesData,
  resultadosData: parmaitResultadosData, titulosData: parmaitTitulosData,
  presupuestoOverlayByYear: parmaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['parma-it'] = null;
