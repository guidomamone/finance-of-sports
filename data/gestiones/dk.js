// ============================================================================
// data/gestiones/dk.js: quién condujo cada club de Dinamarca y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'fredericia-dk': [
    // Rahbek es formand desde hace "32 años" a 2025 (~1993): el inicio es aproximado; en 2019 estaba en el cargo.
    { nombre:'Morten Rahbek Hansen', corto:'Rahbek', cargo:'Formand', desde:'1993-01-01', hasta:null,
      fuente:'https://frdb.dk/fc-fredericia/det-lykkedes-efter-32-aar-som-fc-fredericia-formand-rahbek-var-glad-og-en-smule-roert', confirmada:true },
  ],
  'midtjylland-dk': [
    // Benham es el accionista mayoritario de FCM Holding desde julio de 2014 (día 01 aproximado). El chairman operativo (Rasmus Ankersen) es otro cargo y no se carga.
    { nombre:'Matthew Benham', corto:'Benham', cargo:'Dueño', desde:'2014-07-01', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/FC_Midtjylland', confirmada:true },
  ],
});
