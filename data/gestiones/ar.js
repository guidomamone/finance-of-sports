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
// aunque no estuviera al cierre). Racing 2012/13: cerró con Cogorno (30/6/2013), Blanco asumió el
// 30/9/2013, así que probablemente aprobó ese balance; la transcripción no trae la página de firmas, y Guido
// decidió (2026-10-05) dejarlo con Blanco.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  racing: [
    { nombre:'Rodolfo Molina', corto:'Molina', cargo:'Presidente', desde:'2008-12-21', hasta:'2011-12-27',
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Racing_Club', confirmada:true },
    { nombre:'Gastón Cogorno', corto:'Cogorno', cargo:'Presidente', desde:'2011-12-27', hasta:'2013-09-30',
      fuente:'https://www.lanueva.com/nota/2011-12-27-22-36-0-cogorno-asumio-en-racing-y-ya-piensa-en-la-continuidad-de-teofilo', confirmada:true },
    { nombre:'Víctor Blanco', corto:'Blanco', cargo:'Presidente', desde:'2013-09-30', hasta:'2024-12-19', firmo:[2013],
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
  'almagro-ar': [
    // Romeo: las fuentes dan solo el año (2014); dia 01 por convencion. Cierre 31/10.
    { nombre:'Julián Romeo', corto:'Romeo', cargo:'Presidente', desde:'2014-01-01', hasta:'2021-11-01',
      fuente:'https://www.lanacion.com.ar/deportes/futbol/julian-romeo-ex-presidente-de-almagro-hoy-en-dia-no-hay-retorno-de-la-relacion-del-hincha-de-futbol-nid28122025/', confirmada:true },
    // Cucchi: ganó la elección del 31/10/2021 y la nota dice que asumiría formalmente "en los próximos días": 01/11 aproximado.
    { nombre:'Julio Cucchi', corto:'Cucchi', cargo:'Presidente', desde:'2021-11-01', hasta:null,
      fuente:'https://www.mundoascenso.com.ar/noticia/131208-cucchi-es-el-nuevo-presidente-de-almagro', confirmada:true },
  ],
  argentinosjuniors: [
    // Segura: la fuente da solo el año (elegido en las elecciones de 2001, presidente desde 2002); dia 01 por convencion.
    { nombre:'Luis Segura', corto:'Segura', cargo:'Presidente', desde:'2002-01-01', hasta:'2015-12-22',
      fuente:'https://es.wikipedia.org/wiki/Luis_Segura_(dirigente)', confirmada:true },
    // Malaspina: ganó el 19/12/2015 y asumió a las 72 horas.
    { nombre:'Cristian Malaspina', corto:'Malaspina', cargo:'Presidente', desde:'2015-12-22', hasta:null,
      fuente:'https://442.perfil.com/noticias/futbol/2015-12-19-406631-cristian-malaspina-nuevo-presidente-de-argentinos.phtml', confirmada:true },
  ],
  'banfield-ar': [
    // Barbuto: elegida el 6/10/2018 (lista única), asumió el 8/10/2018; el mandato terminó en octubre de 2021 (hasta aproximado, dia 08).
    { nombre:'Lucía Barbuto', corto:'Barbuto', cargo:'Presidente', desde:'2018-10-08', hasta:'2021-10-08',
      fuente:'https://www.espn.com.ar/futbol/argentina/nota/_/id/4758604/historico-lucia-barbuto-asumira-en-banfield-como-la-primera-presidenta-en-la-maxima-categoria', confirmada:true },
  ],
  'ferrocarriloeste-ar': [
    { nombre:'Daniel Pandolfi', corto:'Pandolfi', cargo:'Presidente', desde:'2014-12-14', hasta:'2023-09-17',
      fuente:'https://es.wikipedia.org/wiki/Daniel_Pandolfi', confirmada:true },
    // Bameule: sigue abierta; el 27/9/2026 hubo elecciones y ganó la oposición, todavía no figura quién asumió.
    { nombre:'Guillermo Bameule', corto:'Bameule', cargo:'Presidente', desde:'2023-09-17', hasta:null,
      fuente:'https://es.wikipedia.org/wiki/Daniel_Pandolfi', confirmada:true },
  ],
  'gimnasiaesgrima-ar': [
    { nombre:'Mariano Cowen', corto:'Cowen', cargo:'Presidente', desde:'2022-12-01', hasta:'2025-12-04',
      fuente:'https://www.eldia.com/nota/2022-12-1-20-28-0-mariano-cowen-asumio-como-presidente-de-gimnasia-deportes', confirmada:true },
    { nombre:'Carlos Alberto Anacleto', corto:'Anacleto', cargo:'Presidente', desde:'2025-12-04', hasta:null,
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Club_Gimnasia_y_Esgrima_La_Plata', confirmada:true },
  ],
  'godoycruz-ar': [
    { nombre:'José Mansur', corto:'Mansur', cargo:'Presidente', desde:'2013-03-10', hasta:'2021-12-12',
      fuente:'https://es.wikipedia.org/wiki/Jos%C3%A9_Mansur', confirmada:true },
    // Chapini: elegido por asamblea el 12/12/2021 (Wikipedia fecha el traspaso el 18/12/2021).
    { nombre:'Alejandro Chapini', corto:'Chapini', cargo:'Presidente', desde:'2021-12-12', hasta:'2025-12-14',
      fuente:'https://www.eldestapeweb.com/deportivo/argentina/chapini-es-el-nuevo-presidente-de-godoy-cruz-tras-una-polemica-eleccion-2021121215130', confirmada:true },
    { nombre:'José Mansur', corto:'Mansur', cargo:'Presidente', desde:'2025-12-14', hasta:null,
      fuente:'https://es.wikipedia.org/wiki/Jos%C3%A9_Mansur', confirmada:true },
  ],
  independiente: [
    // Grindetti asumió como interino el 11/4/2023 y la asamblea lo ratificó el 6/7/2023 (mandato hasta diciembre de 2026).
    { nombre:'Néstor Grindetti', corto:'Grindetti', cargo:'Presidente', desde:'2023-04-11', hasta:null,
      fuente:'https://www.espn.com.ar/futbol/argentina/nota/_/id/11888747/independiente-anuncio-que-grindetti-asume-como-nuevo-presidente-club-avellaneda-doman-renuncia', confirmada:true },
  ],
  instituto: [
    { nombre:'Juan Manuel Cavagliatto', corto:'Cavagliatto', cargo:'Presidente', desde:'2021-05-03', hasta:null,
      fuente:'https://www.ellitoral.com/deportes/juan-manuel-cavagliatto-asumio-presidente-instituto-cordoba_0_cynbGg8IXh.html', confirmada:true },
  ],
  'losandes-ar': [
    { nombre:'Víctor Grosi', corto:'Grosi', cargo:'Presidente', desde:'2019-06-30', hasta:'2023-03-01',
      fuente:'https://launion.com.ar/nota/-11383/2019/06/asume-victor-grosi-como-presidente-de-los-andes', confirmada:true },
    // Plaini: ganó la elección del 26/2/2023; la fuente dice que asumió en marzo de 2023 (dia 01 por convencion).
    { nombre:'Omar Plaini', corto:'Plaini', cargo:'Presidente', desde:'2023-03-01', hasta:null,
      fuente:'https://www.inforegion.com.ar/2023/02/26/los-andes-voto-y-omar-plaini-es-el-nuevo-presidente/', confirmada:true },
  ],
  'newells-ar': [
    { nombre:'Eduardo Bermúdez', corto:'Bermúdez', cargo:'Presidente', desde:'2016-06-21', hasta:'2021-09-20',
      fuente:'https://www.lacapital.com.ar/ovacion/eduardo-bermudez-asumio-como-presidente-newells-y-confirmo-la-continuidad-osella-n968017.html', confirmada:true },
  ],
  river: [
    { nombre:"Rodolfo D'Onofrio", corto:"D'Onofrio", cargo:'Presidente', desde:'2013-12-17', hasta:'2021-12-14',
      fuente:'https://www.infobae.com/2013/12/17/1531459-empezo-una-nueva-era-river-rodolfo-donofrio-asumio-oficialmente-como-presidente-la-ausencia-daniel-passarella/', confirmada:true },
    { nombre:'Jorge Brito', corto:'Brito', cargo:'Presidente', desde:'2021-12-14', hasta:'2025-11-03',
      fuente:'https://www.infobae.com/deportes/2021/12/14/jorge-brito-asumio-como-nuevo-presidente-de-river-es-el-dia-mas-importante-de-mi-vida/', confirmada:true },
    { nombre:'Stéfano Di Carlo', corto:'Di Carlo', cargo:'Presidente', desde:'2025-11-03', hasta:null,
      fuente:'https://www.espn.com.ar/futbol/argentina/nota/_/id/15911322/stefano-di-carlo-asumio-como-presidente-de-river', confirmada:true },
  ],
  rosariocentral: [
    // Belloso: proclamado en la elección del 18/12/2022; no hay una fecha de traspaso aparte, se usa la de la proclamación.
    { nombre:'Gonzalo Belloso', corto:'Belloso', cargo:'Presidente', desde:'2022-12-18', hasta:null,
      fuente:'https://rosariocentral.com/noticia/gonzalo-belloso-nuevo-presidente-de-rosario-central/', confirmada:true },
  ],
  sanlorenzo: [
    // Abdo: electo el 11/12/2010, asumió el 28/12/2010; renunció en julio de 2012 y Lammens asumió la conducción el 1/8/2012.
    { nombre:'Carlos Abdo', corto:'Abdo', cargo:'Presidente', desde:'2010-12-28', hasta:'2012-08-01',
      fuente:'https://www.elesquiu.com/deportes/2010/12/12/carlos-abdo-electo-presidente-lorenzo-13093.html', confirmada:true },
    // Lammens: interino desde el 1/8/2012, formalmente electo con asunción el 1/9/2012.
    { nombre:'Matías Lammens', corto:'Lammens', cargo:'Presidente', desde:'2012-08-01', hasta:'2019-12-18',
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Club_Atl%C3%A9tico_San_Lorenzo_de_Almagro', confirmada:true },
    // Tinelli: licencia desde mayo de 2021; la renuncia se anunció el 30/4/2022 y se formalizó a fines de mayo (30/5/2022, aproximado).
    { nombre:'Marcelo Tinelli', corto:'Tinelli', cargo:'Presidente', desde:'2019-12-18', hasta:'2022-05-30',
      fuente:'https://sanlorenzo.com.ar/club/noticias/1576719173_asumieron-las-nuevas-autoridades', confirmada:true },
    { nombre:'Horacio Arreceygor', corto:'Arreceygor', cargo:'Presidente', desde:'2022-05-30', hasta:'2023-12-26',
      fuente:'https://www.lanacion.com.ar/deportes/futbol/san-lorenzo/marcelo-moretti-asumio-como-presidente-de-san-lorenzo-se-lamento-por-una-deuda-y-aseguro-la-nid27122023/', confirmada:true },
    // Moretti: hasta = acefalía declarada el 16/12/2025 (licencia desde agosto de 2025 con Lopardo a cargo; Costantino transitorio desde el 22/12/2025). Sin gestiones posteriores cargadas.
    { nombre:'Marcelo Moretti', corto:'Moretti', cargo:'Presidente', desde:'2023-12-26', hasta:'2025-12-16',
      fuente:'https://www.lanacion.com.ar/deportes/futbol/san-lorenzo/marcelo-moretti-asumio-como-presidente-de-san-lorenzo-se-lamento-por-una-deuda-y-aseguro-la-nid27122023/', confirmada:true },
  ],
  'talleres-ar': [
    { nombre:'Andrés Fassi', corto:'Fassi', cargo:'Presidente', desde:'2014-12-02', hasta:null,
      fuente:'https://es.wikipedia.org/wiki/Andr%C3%A9s_Fassi', confirmada:true },
  ],
  union: [
    { nombre:'Luis Spahn', corto:'Spahn', cargo:'Presidente', desde:'2009-07-24', hasta:null,
      fuente:'https://www.ellitoral.com/actualidad-tatengue/luis-spahn-gano-elecciones-union-seguira-presidente_0_zgsXDMAYQl.html', confirmada:true },
  ],
  velez: [
    { nombre:'Raúl Gámez', corto:'Gámez', cargo:'Presidente', desde:'2014-11-26', hasta:'2017-11-21',
      fuente:'https://velez.com.ar/club/notas/2014/11/20/144542_', confirmada:true },
    { nombre:'Sergio Rapisarda', corto:'Rapisarda', cargo:'Presidente', desde:'2017-11-21', hasta:'2023-11-22',
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield', confirmada:true },
    { nombre:'Fabián Berlanga', corto:'Berlanga', cargo:'Presidente', desde:'2023-11-22', hasta:null,
      fuente:'https://velez.com.ar/club/notas/2023/11/22/231727_asumio-la-nueva-conduccion', confirmada:true },
  ],
  estudianteslp: [
    { nombre:'Martín Gorostegui', corto:'Gorostegui', cargo:'Presidente', desde:'2021-03-27', hasta:'2024-04-06',
      fuente:'https://es.wikipedia.org/wiki/Presidentes_del_Club_Estudiantes_de_La_Plata', confirmada:true },
    // Verón: desde el 27/11/2025 la AFA lo suspendió 6 meses y Gorostegui lo reemplazó de forma interina; se deja abierta.
    { nombre:'Juan Sebastián Verón', corto:'Verón', cargo:'Presidente', desde:'2024-04-06', hasta:null,
      fuente:'https://es.wikipedia.org/wiki/Presidentes_del_Club_Estudiantes_de_La_Plata', confirmada:true },
  ],
});
