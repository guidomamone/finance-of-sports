// ============================================================================
// data/club-leagues/nl.js — en qué liga jugó cada club de Países Bajos en cada
// ejercicio. Los 4 clubes cargados hoy (Ajax, PSV, Feyenoord, AZ) cierran 30/6.
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
// Verificado en esta sesión (onboarding de Países Bajos como país nuevo) contra
// los infobox de Wikipedia de "2023–24 Eredivisie" y "2024–25 Eredivisie": los 4
// clubes jugaron 1ª división (Eredivisie) completa en los 2 ejercicios cargados,
// ninguno entre los descendidos de ninguna de las 2 temporadas (2023/24:
// Excelsior/Volendam/Vitesse; 2024/25: Willem II/Almere City/RKC Waalwijk). PSV
// fue campeón las 2 temporadas (título 25 y 26). Clasificación a copas
// continentales 2023/24: Champions League PSV/Feyenoord/Twente, Europa League
// AZ/Ajax. 2024/25: Champions League PSV/Ajax/Feyenoord, Conference League AZ.
// No se registró la posición exacta de tabla de cada uno (no estaba en el
// infobox), solo la categoría (Eredivisie, sin descenso), que es lo único que
// esta tabla necesita.
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  'ajax-nl':      { 2024: 'nl-eredivisie', 2025: 'nl-eredivisie' },
  'psv-nl':       { 2024: 'nl-eredivisie', 2025: 'nl-eredivisie' },
  'feyenoord-nl': { 2024: 'nl-eredivisie', 2025: 'nl-eredivisie' },
  'az-nl':        { 2024: 'nl-eredivisie', 2025: 'nl-eredivisie' },
});
