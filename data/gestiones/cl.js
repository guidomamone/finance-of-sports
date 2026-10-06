// ============================================================================
// data/gestiones/cl.js: quién condujo cada club de Chile y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'colocolo-cl': [
    { nombre:'Alfredo Stöhwing', corto:'Stöhwing', cargo:'Presidente del Directorio', desde:'2022-04-26', hasta:'2024-04-26',
      fuente:'https://www.elmostrador.cl/noticias/deportes/2022/04/26/colo-colo-alfredo-stohwing-es-el-nuevo-presidente-de-blanco-y-negro/', confirmada:true },
    { nombre:'Aníbal Mosa', corto:'Mosa', cargo:'Presidente del Directorio', desde:'2024-04-26', hasta:null,
      fuente:'https://www.emol.com/noticias/Deportes/2024/04/26/1129128/anibalmosa-alfredostohwing-colocolo-blancoynegro-presidente.html', confirmada:true },
  ],
});
