// ============================================================================
// data/gestiones/be.js: quién condujo cada club de Bélgica y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'antwerp-be': [
    // Gheysens compró el club en 2015 (solo año en la fuente, 1/1 aproximado; se hizo público en marzo de 2017). Vendió a un grupo de Wouter Vandenhaute en julio de 2026 (16/7/2026 aproximado).
    { nombre:'Paul Gheysens', corto:'Gheysens', cargo:'Dueño', desde:'2015-01-01', hasta:'2026-07-16',
      fuente:'https://nl.wikipedia.org/wiki/Paul_Gheysens', confirmada:true },
  ],
  'clubbrugge-be': [
    { nombre:'Bart Verhaeghe', corto:'Verhaeghe', cargo:'Voorzitter', desde:'2011-02-01', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/Bart_Verhaeghe', confirmada:true },
  ],
});
