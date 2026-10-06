// ============================================================================
// data/gestiones/ar.js — quién condujo cada club de Argentina y desde/hasta cuándo (to-do 147, paso 12).
//
// FORMATO NUEVO DE GESTIONES (reemplaza a `gestionesByClub`, que sigue vivo solo para las pestañas
// ocultas Pases y Resultados hasta el to-do 149). Un archivo por país, igual que data/club-leagues/:
// es un dato sobre personas, que se actualiza con cada elección, no con cada documento.
//
// Cada gestión:
//   nombre      el nombre completo, como lo publica la fuente
//   corto       el que va en el botón y en la franja del gráfico (el apellido, casi siempre)
//   cargo       'Presidente' (en una sociedad, el dueño solo si es una persona con nombre)
//   desde       fecha en que ASUMIÓ (no la de la elección), AAAA-MM-DD
//   hasta       fecha en que dejó el cargo, o null si sigue
//   fuente      de dónde salen las fechas (una URL)
//   confirmada  true solo con fuente. Una gestión sin confirmar no se muestra en el sitio.
//
// LOS EJERCICIOS DE CADA GESTIÓN NO SE ESCRIBEN: se derivan. Un ejercicio es de quien estaba en el
// cargo el día de su CIERRE (30/6 para un club que arranca el 1/7). La regla que decidió Guido es
// "de quien firmó el balance"; las dos coinciden salvo cuando el cambio cae entre el cierre y la
// aprobación del balance. Para esos casos existe `firmo` (lista de ejercicios que esta gestión firmó
// aunque no estuviera al cierre), y se usa solo con el balance en la mano. Caso abierto: Racing
// 2012/13 cerró con Cogorno (30/6/2013) y Blanco asumió el 30/9/2013; la transcripción de ese balance
// no trae la página de firmas, así que por ahora queda con Cogorno, por la fecha de cierre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  racing: [
    { nombre:'Rodolfo Molina', corto:'Molina', cargo:'Presidente', desde:'2008-12-21', hasta:'2011-12-27',
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Racing_Club', confirmada:true },
    { nombre:'Gastón Cogorno', corto:'Cogorno', cargo:'Presidente', desde:'2011-12-27', hasta:'2013-09-30',
      fuente:'https://www.lanueva.com/nota/2011-12-27-22-36-0-cogorno-asumio-en-racing-y-ya-piensa-en-la-continuidad-de-teofilo', confirmada:true },
    { nombre:'Víctor Blanco', corto:'Blanco', cargo:'Presidente', desde:'2013-09-30', hasta:'2024-12-19',
      fuente:'https://www.vavel.com/ar/futbol-argentino/2013/09/30/racing-avellaneda/268054.html', confirmada:true },
    { nombre:'Diego Milito', corto:'Milito', cargo:'Presidente', desde:'2024-12-19', hasta:null,
      fuente:'https://www.espn.com.ar/futbol/argentina/nota/_/id/14584260/diego-milito-asumio-como-nuevo-presidente-de-racing', confirmada:true },
  ],
  boca: [
    { nombre:'Daniel Angelici', corto:'Angelici', cargo:'Presidente', desde:'2011-12-14', hasta:'2019-12-19',
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Club_Atl%C3%A9tico_Boca_Juniors', confirmada:true },
    { nombre:'Jorge Amor Ameal', corto:'Ameal', cargo:'Presidente', desde:'2019-12-19', hasta:'2023-12-27',
      fuente:'https://www.lanueva.com/nota/2019-12-19-21-53-0-jorge-ameal-asumio-como-presidente-de-boca-la-semana-que-viene-tendremos-dt-afirmo', confirmada:true },
    { nombre:'Juan Román Riquelme', corto:'Riquelme', cargo:'Presidente', desde:'2023-12-27', hasta:null,
      fuente:'https://www.infobae.com/deportes/2023/12/27/juan-roman-riquelme-asume-hoy-como-presidente-de-boca-juniors-las-primeras-3-decisiones-que-tiene-tomadas/', confirmada:true },
  ],
});
