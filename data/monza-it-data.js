// ============================================================================
// data/monza-it-data.js — Associazione Calcio Monza S.p.A. (Italia).
// ALTA POR SCRIPT (tools/alta-club.mjs, 2026-10-07), SIN EJERCICIOS CARGADOS TODAVÍA:
// las estructuras de abajo están vacías a propósito. Los rubros, los totales
// oficiales y el resto del fiscalYearMeta los agrega la etapa de carga
// (tools/proponer-carga.mjs / sesión de onboarding), que es también la que
// reemplaza esta cabecera por la de siempre (fuente, perímetro, categorización).
//
// Documento que originó el alta: Clubes/Italia/Monza/Monza-bilancio-2022.pdf
//
// De dónde salió cada campo (estado según alta-club.mjs: ok / pendiente):
//   id                 ok        "monza-it" — slug de "Monza" + '-it' (convención de clubId, Admin/CONVENCIONES.md Versión 129)
//   name               ok        "Associazione Calcio Monza S.p.A." — el .md, 6 veces (nombre del club + forma societaria)
//   displayName        ok        "Monza" — nombre de la carpeta del club en Clubes/
//   country            ok        "IT" — carpeta de país "Italia" (tabla PAISES)
//   reportingCurrency  ok        "EUR" — moneda de curso legal de Italia
//   fiscalYearStart    ok        "01-01" — cierre del ejercicio: ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
//   sport              ok        "futbol" — el .md nombra el fútbol 37 veces y ningún otro deporte más que eso
//   brandColor         pendiente (ausente) — la liga del club no está en tools/brand-color-reference/ (o el club no está en footylogos)
//   anio               ok        2022 — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
//   cierre             ok        "2022-12-31" — año del ejercicio + mes de cierre (ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: el ejercicio cierra el 31/12/2022
//   reportType         ok        "official_balance_sheet" — ajuste manual (Admin/ajustes-manuales.jsonl, Guido 2026-10-07): Guido 2026-10-06: balance anual ('Bilancio d'Esercizio al 31 dicembre 2022'); 'semestr
//   perimetro          ok        "individual" — ajuste manual (Admin/ajustes-manuales.jsonl, perimetro-senales 2026-10-06): perimetro-senales.mjs: 0 documento(s) con los dos estados votan —; 1 ejerc
//   currency           ok        "EUR" — moneda de curso legal de Italia (tabla PAISES de alta-club.mjs)
//   fxRef              ok        "EUR@2022-12-31" — el documento no declara tipo de cambio; tools/fx-reference/ (lookup-fx-close.js): 0.937559. --escribir agrega 'EUR@2022-12-31' a FX_CLOSE
//   sourceId           ok        "monza-it-bilancio-2022" — clubId + nombre del archivo en slug
//   liga               ok        "it-seriea" — roster cacheado de "2022–23 Serie A" (tools/club-league-reference/it.json), coincidencia exacta "Monza"
//
// FISCAL YEAR META PROPUESTO para 2022 (NO registrado: un ejercicio con meta y
// sin rubros se vería en el sitio como un año en cero, y "sin dato no es cero"):
//   2022: {"reportType":"official_balance_sheet","currency":"EUR","fxRef":"EUR@2022-12-31","sourceId":"monza-it-bilancio-2022"}
// ============================================================================

const monzaitRevenueLinesByYear = {};
const monzaitExpenseLinesByYear = {};
const monzaitFiscalYearMeta = {};
const monzaitPresupuestoOverlayByYear = {};

const monzaitPasesData = [];
const monzaitResultadosData = {};
const monzaitTitulosData = [];

window.CLUB_GENERIC_DATA = window.CLUB_GENERIC_DATA || {};
window.CLUB_GENERIC_DATA['monza-it'] = {
  revenueLinesByYear: monzaitRevenueLinesByYear, expenseLinesByYear: monzaitExpenseLinesByYear,
  fiscalYearMeta: monzaitFiscalYearMeta, pasesData: monzaitPasesData,
  resultadosData: monzaitResultadosData, titulosData: monzaitTitulosData,
  presupuestoOverlayByYear: monzaitPresupuestoOverlayByYear,
};

// Fuentes de cada ejercicio: las agrega tools/cargar.mjs adentro de este bloque (Versión 379: hasta la 378 el esqueleto no lo traía y la
// primera carga de un club dado de alta por script se revertía, "no encontré Object.assign(sources, {"; caso: Fortaleza CEIF).
Object.assign(sources, {
});

memberCountByClub['monza-it'] = null;
