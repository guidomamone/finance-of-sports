// ============================================================================
// data/club-leagues/hr.js — en qué liga jugó cada club de Croacia en cada
// ejercicio. Los 3 clubes cargados hoy (Dinamo Zagreb, Hajduk Split, Rijeka)
// cierran su ejercicio fiscal en año CALENDARIO (31/12).
//
// SE EDITA A MANO, no lo genera ninguna herramienta. Un archivo por país
// (Versión 164) para que el repaso anual de ascensos y descensos sea el de UN
// país y no el de una tabla con todos adentro.
//
// SE AUTOREGISTRA, igual que `sources{}` y `gestionesByClub{}`: no redeclara
// nada, le agrega sus clubes a la tabla que ya existe. El orden en que se
// carguen los países no importa.
//
// LAS REGLAS (qué significa `null`, el criterio de "la categoría al cierre", por
// qué los ids de liga nombran el escalón y no al organizador) están UNA sola vez,
// en la cabecera de `data/club-leagues.js`. No se copian acá.
//
// OJO CON EL DESCALCE ejercicio-calendario vs. temporada-liga (onboarding
// 2026-09-25): el ejercicio fiscal de estos 3 clubes es AÑO CALENDARIO
// (1/1-31/12/2024), pero la HNL juega en temporada partida (jul-jun, igual
// que las grandes ligas europeas). El ejercicio 2024 cae A CABALLO de 2
// temporadas de liga: 2023/24 (enero-mayo 2024) y 2024/25 (agosto-diciembre
// 2024). Verificado contra Wikipedia ("2023–24 Croatian Football League" y
// "2024–25 Croatian Football League") que los 3 jugaron 1ª división completa
// en LAS DOS temporadas, sin descenso ninguno de los 3 en ningún momento:
// 2023/24 — Dinamo Zagreb campeón (clasificó a Champions League 2024/25,
// donde jugó la fase de liga, ver ingreso de "Uefine nagrade" en
// data/dinamozagreb-hr-data.js), Rijeka 2°/3° (Europa League), Hajduk Split
// entre los primeros 4 (Conference League). 2024/25 — Rijeka campeón (2°
// título), Dinamo Zagreb 2° (Europa League), Hajduk Split 3°/4°
// (Conference League). Como las 2 temporadas que se superponen con el
// ejercicio 2024 son la MISMA categoría (HNL, 1ª división) para los 3
// clubes, no hay ambigüedad de escalón que resolver: se carga simplemente
// `hr-hnl` para 2024, mismo criterio que Borussia Mönchengladbach
// (data/club-leagues/de.js) cuando su ejercicio calendario cae dentro de una
// única temporada de Bundesliga sin cambio de categoría.
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  'dinamozagreb-hr': { 2024: 'hr-hnl' },
  'hajduksplit-hr':  { 2024: 'hr-hnl' },
  'rijeka-hr':       { 2024: 'hr-hnl' },
});
