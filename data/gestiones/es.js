// ============================================================================
// data/gestiones/es.js: quién condujo cada club de España y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'rayovallecano-es': [
    // Martín Presa compró el club a Nueva Rumasa en 2011; su primera junta como dueño fue el 7/11/2011 (fecha aproximada de asunción).
    { nombre:'Raúl Martín Presa', corto:'Martín Presa', cargo:'Presidente', desde:'2011-11-07', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Ra%C3%BAl_Mart%C3%ADn_Presa', confirmada:true },
  ],
});
