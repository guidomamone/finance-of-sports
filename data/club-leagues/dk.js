// ============================================================================
// data/club-leagues/dk.js — en qué liga jugó cada club de Dinamarca en cada
// ejercicio. Los 3 clubes cargados hoy (FC København, Brøndby, FC Midtjylland)
// jugaron Superliga en el ejercicio cargado de cada uno.
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
// Verificado en esta sesión (onboarding de Dinamarca como país nuevo) contra
// Wikipedia: Brøndby (ejercicio calendario 2020, que cubre el final de la
// temporada 2019-20 y el arranque de la 2020-21) terminó 4° en 2019-20 y campeón
// en 2020-21, Superliga los dos tramos. FC København (ejercicio calendario 2024)
// y FC Midtjylland (ejercicio 2018/19, cierra 30/6) son clubes habituales de
// Superliga sin descenso en el período cargado.
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  'fckobenhavn-dk': { 2024: 'dk-superliga' },
  'brondby-dk':     { 2020: 'dk-superliga' },
  'midtjylland-dk': { 2019: 'dk-superliga' },
});
