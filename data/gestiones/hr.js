// ============================================================================
// data/gestiones/hr.js: quién condujo cada club de Croacia y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'gorica-hr': [
    // Karamatić pasó a conducir el club en agosto de 2025 (presidente de la Skupština, tras Nenad Črnko) y quedó con el 100% el 21/10/2025: 1/8/2025 es aproximada.
    // Črnko (presidente 16 años hasta agosto de 2025) no se carga: ningún año cargado cae en su gestión.
    { nombre:'Ilija Karamatić', corto:'Karamatić', cargo:'Predsjednik', desde:'2025-08-01', hasta:null,
      fuente:'https://rvg.hr/vise-necu-biti-predsjednik-ali-ostajem-uz-klub-dovodenje-kapitala-je-jedina-logika/', confirmada:true },
  ],
});
