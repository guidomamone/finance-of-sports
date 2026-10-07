// ============================================================================
// data/atalanta-it-data.js — Atalanta Bergamasca Calcio S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Atalanta/Atalanta-bilancio-consolidato-2021.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "atalanta-it" — slug de "Atalanta" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Atalanta Bergamasca Calcio S.p.A." — el .md, 7 veces (nombre del club + forma societaria)
//   displayName        ok        "Atalanta" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "07-01" — el documento más reciente del club (Atalanta-bilancio-consolidato-2025.md, cierre mes 6): el cierre CAMBIÓ en el tiempo (mes 12: 2018,2020,2021 / mes 
//   sport              ok        "futbol" — el .md nombra el fútbol 39 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — tools/brand-color-reference/ (footylogos): [italia] atalanta: #0D68B1 Blue, #FFFFFF White, #1E1E1E Black
//   anio               ok        2021 — nombre del archivo (misma regla que onboard.mjs --quien), confirmado por las fechas de cierre del .md
//   cierre             ok        "2021-12-31" — año del ejercicio + mes de cierre (contenido del .md (118 de 120 fechas de fin de mes caen en el mes 12))
//   reportType         ok        "official_balance_sheet" — el .md tiene un estado contable (resultados / balance) y el nombre del archivo no sugiere otro tipo
//   perimetro          ok        "consolidado" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 7 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2021-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.882924. --escribir agrega 'EUR@2021-12-31' a FX_CLOSE
//   sourceId           ok        "atalanta-it-bilancio-consolidato-2021" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2021–22 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Atalanta"
//
// FISCAL YEAR META PROPUESTO para 2021 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2021: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2021-12-31","sourceId":"atalanta-it-bilancio-consolidato-2021"}
// ============================================================================

const atalantaitRevenueLinesByYear = {};
const atalantaitExpenseLinesByYear = {};
const atalantaitFiscalYearMeta = {};
const atalantaitPresupuestoOverlayByYear = {};

const atalantaitPasesData = [];
const atalantaitResultadosData = {};
const atalantaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['atalanta-it'] = {
  revenueLinesByYear: atalantaitRevenueLinesByYear, expenseLinesByYear: atalantaitExpenseLinesByYear,
  fiscalYearMeta: atalantaitFiscalYearMeta, pasesData: atalantaitPasesData,
  resultadosData: atalantaitResultadosData, titulosData: atalantaitTitulosData,
  presupuestoOverlayByYear: atalantaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['atalanta-it'] = null;
