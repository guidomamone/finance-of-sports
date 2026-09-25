// ============================================================================
// data/club-leagues/be.js — en qué liga jugó cada club de Bélgica en cada
// ejercicio. Los 4 clubes cargados hoy (Club Brugge, Anderlecht, Genk, Gent)
// cierran 30/6.
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
// Verificado en esta sesión (onboarding de Bélgica como país nuevo) contra el
// infobox/tabla de "2024–25 Belgian Pro League" de Wikipedia: los 4 clubes
// jugaron la Pro League completa en el ejercicio 2024/2025 (matchday 1 a 30),
// ninguno entre los descendidos de esa temporada (Beerschot y Kortrijk, 16° y
// 15° en la fase regular, eliminados en los playoffs de descenso).
// ============================================================================

window.CLUB_LEAGUE_BY_YEAR = window.CLUB_LEAGUE_BY_YEAR || {};

Object.assign(window.CLUB_LEAGUE_BY_YEAR, {
  'clubbrugge-be': { 2025: 'be-proleague' },
  'anderlecht-be': { 2025: 'be-proleague' },
  'genk-be':       { 2025: 'be-proleague' },
  'gent-be':       { 2025: 'be-proleague' },
  // Charleroi/Mechelen/Antwerp (onboarding sesión 2026-09-25, tanda de 20 transcripts al azar):
  // los 3 jugaron Pro League completa en el ejercicio 2024/2025, sin descenso.
  'charleroi-be':  { 2025: 'be-proleague' },
  'mechelen-be':   { 2025: 'be-proleague' },
  'antwerp-be':    { 2025: 'be-proleague' },
});
