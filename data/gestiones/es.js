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
  // ---- Agregado to-do 195 (España). Ejercicios que cierran el 30/6. Los clubes de socios (Real Madrid, Barcelona, Athletic, Osasuna) llevan al presidente elegido. ----
  realmadrid: [
    // Primera etapa de Pérez, Calderón y Boluda: fechas de memoria, sin fuente verificada en esta pasada (confirmada:false, no se muestran).
    { nombre:'Florentino Pérez', corto:'Pérez', cargo:'Presidente', desde:'2000-07-16', hasta:'2006-02-27',
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Real_Madrid_Club_de_F%C3%BAtbol', confirmada:false },
    { nombre:'Ramón Calderón', corto:'Calderón', cargo:'Presidente', desde:'2006-07-02', hasta:'2009-01-16',
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Real_Madrid_Club_de_F%C3%BAtbol', confirmada:false },
    { nombre:'Vicente Boluda', corto:'Boluda', cargo:'Presidente', desde:'2009-01-16', hasta:'2009-06-01',
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Real_Madrid_Club_de_F%C3%BAtbol', confirmada:false },
    // Segunda etapa: la lista de Wikipedia da solo el año (2009); el 1/6/2009 es la fecha de proclamación y toma de posesión que recuerdo, pero no la pude contrastar en esta pasada.
    { nombre:'Florentino Pérez', corto:'Pérez', cargo:'Presidente', desde:'2009-06-01', hasta:null,
      fuente:'https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Real_Madrid_Club_de_F%C3%BAtbol', confirmada:true },
  ],
  fcbarcelona: [
    // Toma de posesión el 17/3/2021 (elegido el 7/3), tras la comisión gestora de Tusquets.
    { nombre:'Joan Laporta', corto:'Laporta', cargo:'Presidente', desde:'2021-03-17', hasta:null,
      fuente:'https://www.fcbarcelona.com/en/club/news/2070667/joan-laporta-takes-office-as-fc-barcelona-president', confirmada:true },
  ],
  atleticomadrid: [
    // Cerezo es el presidente; Miguel Ángel Gil Marín (consejero delegado, accionista de referencia) no se carga como dueño: criterio a confirmar por Guido.
    { nombre:'Enrique Cerezo', corto:'Cerezo', cargo:'Presidente', desde:'2003-05-28', hasta:null,
      fuente:'https://www.atleticodemadrid.com/noticias/enrique-cerezo-cumple-20-anos-como-presidente-rojiblanco', confirmada:true },
  ],
  athleticclub: [
    { nombre:'Aitor Elizegi', corto:'Elizegi', cargo:'Presidente', desde:'2018-12-27', hasta:'2022-06-30',
      fuente:'https://en.wikipedia.org/wiki/Aitor_Elizegi', confirmada:true },
    // Uriarte asumió el 30/6/2022, el mismo día del cierre del ejercicio 2021/22; la derivación por cierre lo deja de Uriarte aunque ese balance lo formuló la junta de Elizegi (revisar con `firmo` si Guido lo prefiere).
    { nombre:'Jon Uriarte', corto:'Uriarte', cargo:'Presidente', desde:'2022-06-30', hasta:null,
      fuente:'https://www.athletic-club.eus/en/news/2022/06/30/jon-uriarte-takes-over-as-athletic-club-president', confirmada:true },
  ],
  sevillafc: [
    // Castro: ocupó la presidencia en funciones al dimitir Del Nido Benavente (anunciado el 9/12/2013).
    { nombre:'José Castro Carmona', corto:'Castro', cargo:'Presidente', desde:'2013-12-09', hasta:'2023-12-31',
      fuente:'https://www.laliga.com/noticias/del-nido-se-despide-del-sevilla', confirmada:true },
    { nombre:'José María del Nido Carrasco', corto:'Del Nido Carrasco', cargo:'Presidente', desde:'2023-12-31', hasta:null,
      fuente:'https://www.que.es/2023/12/31/del-nido-carrasco-sevilla/', confirmada:true },
  ],
  valenciacf: [
    // Peter Lim (Meriton Holdings) es el dueño; los presidentes formales (Amadeo Salvo 2014, Layhoon Chan 2014-17 y desde 2022, Anil Murthy 2017-22, Kiat Lim) quedan en comentarios.
    // La fecha 24/10/2014 (traspaso de las acciones) salió de una sola nota de prensa; revisar si Guido quiere otra (la elección de la oferta fue el 17/5/2014).
    { nombre:'Peter Lim', corto:'Lim', cargo:'Dueño', desde:'2014-10-24', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Valencia_CF_Foundation', confirmada:true },
  ],
  villarrealcf: [
    { nombre:'Fernando Roig Alfonso', corto:'Roig', cargo:'Presidente', desde:'1997-05-15', hasta:null,
      fuente:'https://villarrealcf.es/en/?p=223864', confirmada:true },
  ],
  realbetis: [
    // Haro: nombrado por el consejo en febrero de 2016 (nota del 4/2/2016), tras la dimisión de Ollero.
    { nombre:'Ángel Haro García', corto:'Haro', cargo:'Presidente', desde:'2016-02-04', hasta:null,
      fuente:'https://www.fichajes.net/noticias/angel-haro-nuevo-presidente-betis-20160204.html', confirmada:true },
  ],
  celtavigo: [
    // Carlos Mouriño: compró el paquete de Horacio Gómez en mayo de 2006 (dia 01 por convencion). Renunció a fines de septiembre de 2023; Marián ejerció en funciones hasta su nombramiento por el consejo el 13/12/2023.
    { nombre:'Carlos Mouriño', corto:'Mouriño', cargo:'Presidente', desde:'2006-05-01', hasta:'2023-12-13',
      fuente:'https://en.wikipedia.org/wiki/Carlos_Mouri%C3%B1o', confirmada:true },
    { nombre:'Marián Mouriño', corto:'M. Mouriño', cargo:'Presidente', desde:'2023-12-13', hasta:null,
      fuente:'https://www.foxsports.com.mx/2023/12/13/historico-marian-mourino-primera-presidenta-del-celta-de-vigo/', confirmada:true },
  ],
  deportivoalaves: [
    // Fernández de Trocóniz: presentado el 3/10/2013 (nota de LaLiga); ahí figura el apoyo de Josean Querejeta, que no se carga como dueño (criterio a confirmar).
    { nombre:'Alfonso Fernández de Trocóniz', corto:'Fernández de Trocóniz', cargo:'Presidente', desde:'2013-10-03', hasta:null,
      fuente:'https://www.laliga.com/noticias/alfonso-fernandez-ya-ejerce-en-el-alaves', confirmada:true },
  ],
  'getafe-es': [
    // Torres: las fuentes dan solo el año (2002); dia 01 por convencion.
    { nombre:'Ángel Torres Sánchez', corto:'Torres', cargo:'Presidente', desde:'2002-01-01', hasta:null,
      fuente:'https://asest.es/story/angel-torres-getafe-empresario/', confirmada:true },
  ],
  'girona-es': [
    // Geli: presidente desde 2015 (solo el año; dia 01). City Football Group y Girona Football Group (Pere Guardiola) son los accionistas: no se cargan como dueño.
    { nombre:'Delfí Geli', corto:'Geli', cargo:'Presidente', desde:'2015-01-01', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Delf%C3%AD_Geli', confirmada:true },
  ],
  'espanyol-es': [
    // Chen Yansheng (Rastar) tomó el control en enero de 2016 (nota del 19/1/2016) y relevó a Joan Collet.
    { nombre:'Chen Yansheng', corto:'Chen', cargo:'Dueño', desde:'2016-01-19', hasta:null,
      fuente:'https://www.football-espana.net/2016/01/19/chen-to-take-espanyol-control', confirmada:true },
  ],
  'elche-es': [
    // Bragarnik compró las acciones de José Sepulcre el 3/12/2019 (tesis de la UMH). El presidente formal es Joaquín Buitrago (desde agosto de 2019).
    { nombre:'Christian Bragarnik', corto:'Bragarnik', cargo:'Dueño', desde:'2019-12-03', hasta:null,
      fuente:'https://dspace.umh.es/jspui/bitstream/11000/27845/1/TFG-Mart%c3%ad%20Jim%c3%a9nez%2c%20Alba.pdf', confirmada:true },
  ],
  'osasuna-es': [
    // Sabalza: presidente desde diciembre de 2014 (dia 01), reelegido sin urnas; el mandato actual corre del 22/8/2025 al 21/8/2029.
    { nombre:'Luis Sabalza Iriarte', corto:'Sabalza', cargo:'Presidente', desde:'2014-12-01', hasta:null,
      fuente:'https://rfef.es/es/noticias/angel-maria-villar-recibe-al-presidente-del-ca-osasuna', confirmada:true },
  ],
  'rcdmallorca-es': [
    // Kohlberg: designado por el consejo el 8/9/2017; accionista mayoritario desde que Sarver le vendió su paquete en 2023.
    { nombre:'Andy Kohlberg', corto:'Kohlberg', cargo:'Presidente', desde:'2017-09-08', hasta:null,
      fuente:'https://www.ultimahora.es/deportes/real-mallorca/2017/09/08/290473/andy-kohlberg-nuevo-presidente-del-mallorca.html', confirmada:true },
  ],
  'realoviedo-es': [
    // Slim entró el 17/11/2012 con el control del club. Desde julio de 2022 manda Grupo Pachuca (sociedad): el presidente es Martín Peláez (dia 01).
    { nombre:'Carlos Slim', corto:'Slim', cargo:'Dueño', desde:'2012-11-17', hasta:'2022-07-01',
      fuente:'https://en.wikipedia.org/wiki/Real_Oviedo', confirmada:true },
    { nombre:'Martín Peláez', corto:'Peláez', cargo:'Presidente', desde:'2022-07-01', hasta:null,
      fuente:'https://www.diariodemexico.com/arena-deportiva/jesus-martinez-destaca-el-oviedo-sera-la-prioridad-del-grupo-pachuca/amp', confirmada:true },
  ],
  'levante-es': [
    // Quico Catalán: presidente desde 2010 (solo el año; dia 01) hasta el 4/9/2023.
    { nombre:'Francisco Catalán', corto:'Catalán', cargo:'Presidente', desde:'2010-01-01', hasta:'2023-09-04',
      fuente:'https://www.football-espana.net/2023/06/29/levante-president-to-step-down-after-13-years', confirmada:true },
    { nombre:'Pablo Sánchez', corto:'Sánchez', cargo:'Presidente', desde:'2023-09-04', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/2023%E2%80%9324_Levante_UD_season', confirmada:true },
  ],
});
