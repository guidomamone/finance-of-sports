// ============================================================================
// data/gestiones/nl.js: quién condujo cada club de Países Bajos y desde/hasta cuándo (to-do 195).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. Los cierres son el 30/6.
// Criterio del país: el dueño solo si es una persona con nombre (Go Ahead Eagles); en las demás
// sociedades y fundaciones no hay dueño persona, y se carga quien conduce y firma el informe: el
// "algemeen directeur" (Ajax: "directievoorzitter"). El voorzitter de la raad van commissarissen y el
// del club-asociación (Excelsior, Groningen) no se cargan. Excepción: Volendam, una fundación cuyo
// voorzitter del bestuur firmaba el informe hasta 2023 (Kemper, Smit, Veerman); desde 2024 firma la directie.
// El `cargo` va con el título neerlandés. Cuando la fuente da solo el mes o el año, el día es 01 por convención.
// Fuente: donde dice Clubes/..., es el propio informe anual (ruta del .md o del PDF).
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'ajax-nl': [
    // Kinsbergen: algemeen directeur y voorzitter de la directie desde el 26/11/2012; su mandato terminó el 30/6/2015 (hasta = día siguiente, así el cierre 30/6/2015 es suyo).
    { nombre:'Michael Kinsbergen', corto:'Kinsbergen', cargo:'Algemeen directeur', desde:'2012-11-26', hasta:'2015-07-01',
      fuente:'Clubes/Países Bajos/Ajax/Ajax-Jaarverslag-2013-2014.pdf', confirmada:true },
    // Collee: directeur ad interim el 7/9/2015, statutair directeur y directievoorzitter el 13/11/2015; mandato hasta el 11/11/2016.
    { nombre:'Dolf Collee', corto:'Collee', cargo:'Directievoorzitter', desde:'2015-09-07', hasta:'2016-11-11',
      fuente:'Clubes/Países Bajos/Ajax/Ajax-Jaarverslag-2015-2016.pdf', confirmada:true },
    // Van der Sar: directievoorzitter y algemeen directeur desde el 11/11/2016; el 1/6/2023 traspasó sus tareas (el contrato terminó el 1/8/2023).
    { nombre:'Edwin van der Sar', corto:'Van der Sar', cargo:'Directievoorzitter', desde:'2016-11-11', hasta:'2023-06-01',
      fuente:'Clubes/Países Bajos/Ajax/jaarverslag-2023-24.md', confirmada:true },
    // Van Halst: algemeen directeur ad interim (titulair) del 1/6/2023 al 14/3/2024 inclusive.
    { nombre:'Jan van Halst', corto:'Van Halst', cargo:'Algemeen directeur (ad interim)', desde:'2023-06-01', hasta:'2024-03-15',
      fuente:'Clubes/Países Bajos/Ajax/jaarverslag-2023-24.md', confirmada:true },
    // Kroes: algemeen directeur (statutair) desde el 15/3/2024; desde el 1/5/2024 es technisch directeur (titulair).
    { nombre:'Alex Kroes', corto:'Kroes', cargo:'Algemeen directeur', desde:'2024-03-15', hasta:'2024-05-01',
      fuente:'Clubes/Países Bajos/Ajax/jaarverslag-2023-24.md', confirmada:true },
    // Geelen: algemeen directeur ad interim desde el 10/5/2024; el contrato como titular rige desde el 1/7/2025 (VI, según la prensa).
    { nombre:'Menno Geelen', corto:'Geelen', cargo:'Algemeen directeur', desde:'2024-05-10', hasta:null,
      fuente:'Clubes/Países Bajos/Ajax/jaarverslag-2023-24.md', confirmada:true },
  ],
  'psv-nl': [
    // Gerbrands: algemeen directeur desde el 1/7/2014 (sucedió a Tiny Sanders); dejó el cargo al final de la temporada 2021/22.
    { nombre:'Toon Gerbrands', corto:'Gerbrands', cargo:'Algemeen directeur', desde:'2014-07-01', hasta:'2022-07-01',
      fuente:'https://nos.nl/artikel/2417283-algemeen-directeur-gerbrands-vertrekt-bij-psv-brands-opvolger', confirmada:true },
    // Brands: anunciado el 14/2/2022 para entrar "después de esta temporada"; 1/7/2022 aproximado.
    { nombre:'Marcel Brands', corto:'Brands', cargo:'Algemeen directeur', desde:'2022-07-01', hasta:null,
      fuente:'https://nos.nl/artikel/2417283-algemeen-directeur-gerbrands-vertrekt-bij-psv-brands-opvolger', confirmada:true },
  ],
  'feyenoord-nl': [
    // De Jong: asumió en noviembre de 2017 (sin día: 01); dejó el 23/7/2019 (informe 2018/19).
    { nombre:'Jan de Jong', corto:'De Jong', cargo:'Algemeen directeur', desde:'2017-11-01', hasta:'2019-07-23',
      fuente:'Clubes/Países Bajos/Feyenoord/Feyenoord-Jaarverslag-2018-2019.pdf', confirmada:true },
    // Koevermans: ad interim desde mediados de julio de 2019, nombrado el 1/12/2019; renunció el 1/12/2021. Se carga desde el 23/7/2019.
    { nombre:'Mark Koevermans', corto:'Koevermans', cargo:'Algemeen directeur', desde:'2019-07-23', hasta:'2021-12-01',
      fuente:'Clubes/Países Bajos/Feyenoord/Feyenoord-Jaarverslag-2021-2022.pdf', confirmada:true },
    // Te Kloese: nombrado el 15/1/2022; deja el club el 1/7/2026.
    { nombre:'Dennis te Kloese', corto:'Te Kloese', cargo:'Algemeen directeur', desde:'2022-01-15', hasta:'2026-07-01',
      fuente:'https://www.fcupdate.nl/voetbalnieuws/2026/04/te-kloese-vertrekt-per-1-juli-bij-feyenoord', confirmada:true },
  ],
  'az-nl': [
    // Eenhoorn: algemeen directeur desde el 1/10/2014 (sucedió a Gerbrands); dejó de ser statutair bestuurder el 1/7/2024 pero siguió de titulair directeur hasta fines de 2024 (informe 2023/24).
    { nombre:'Robert Eenhoorn', corto:'Eenhoorn', cargo:'Algemeen directeur', desde:'2014-10-01', hasta:'2024-12-01',
      fuente:'Clubes/Países Bajos/AZ/jaarrekening-2023-24.md', confirmada:true },
    // Zeeman: algemeen directeur desde el 1/12/2024 (informe 2024/25).
    { nombre:'Merijn Zeeman', corto:'Zeeman', cargo:'Algemeen directeur', desde:'2024-12-01', hasta:null,
      fuente:'Clubes/Países Bajos/AZ/jaarrekening-2024-25.md', confirmada:true },
  ],
  'excelsior-nl': [
    // De Haan: algemeen directeur desde 2012 (en.wikipedia da solo el año: 01/01); se fue a Heerenveen en junio de 2021.
    { nombre:'Ferry de Haan', corto:'De Haan', cargo:'Algemeen directeur', desde:'2012-01-01', hasta:'2021-06-01',
      fuente:'https://en.wikipedia.org/wiki/Ferry_de_Haan', confirmada:true },
    // Bovenberg: algemeen directeur desde 2021 (nl.wikipedia da solo el año; De Haan ya trabajaba en Heerenveen desde junio de 2021).
    { nombre:'Daan Bovenberg', corto:'Bovenberg', cargo:'Algemeen directeur', desde:'2021-06-01', hasta:null,
      fuente:'https://nl.wikipedia.org/wiki/Excelsior_Rotterdam', confirmada:true },
  ],
  'fcgroningen-nl': [
    // Nijland: entró al directorio en septiembre de 1996 (nl.wikipedia, mes sin día: 01); último día 14/6/2019.
    { nombre:'Hans Nijland', corto:'Nijland', cargo:'Algemeen directeur', desde:'1996-09-01', hasta:'2019-06-15',
      fuente:'https://nl.wikipedia.org/wiki/Hans_Nijland', confirmada:true },
    // Gudde: tomó el cargo el 15/6/2019; dejó al final de la temporada 2023/24.
    { nombre:'Wouter Gudde', corto:'Gudde', cargo:'Algemeen directeur', desde:'2019-06-15', hasta:'2024-07-01',
      fuente:'https://nl.wikipedia.org/wiki/Hans_Nijland', confirmada:true },
    // Van Mosselveld: presentado en abril de 2024; empezó en julio de 2024 (Omroep Brabant, sin día: 01).
    { nombre:'Frank van Mosselveld', corto:'Van Mosselveld', cargo:'Algemeen directeur', desde:'2024-07-01', hasta:null,
      fuente:'Clubes/Países Bajos/FC Groningen/FC-Groningen-Jaarverslag-2023-2024.md', confirmada:true },
  ],
  'fcvolendam-nl': [
    // Stichting RKFC Volendam: hasta 2023 el informe lo firma el voorzitter del bestuur. Kemper: mandato de 3 años que terminó el 1/7/2022
    // (inicio 1/7/2019 deducido: 2019/20 fue "el primer año del nuevo bestuur"); firma los informes 2019/20 y 2020/21.
    { nombre:'Piet Kemper', corto:'Kemper', cargo:'Voorzitter', desde:'2019-07-01', hasta:'2022-07-01',
      fuente:'https://www.fcupdate.nl/voetbalnieuws/2022/05/fc-volendam-gaat-met-jan-smit-als-voorzitter-eredivisie-in', confirmada:true },
    // Smit: voorzitter desde el 1/7/2022; el 30/11/2023 la RvC lo destituyó junto con el bestuur.
    { nombre:'Jan Smit', corto:'Smit', cargo:'Voorzitter', desde:'2022-07-01', hasta:'2023-11-30',
      fuente:'https://nhnieuws.nl/nieuws/328513/bijltjesdag-bij-ruziend-fc-volendam-jan-smit-en-bestuur-definitief-ontslagen', confirmada:true },
    // Veerman: nombrado voorzitter el 14/12/2023 (Hart van Nederland, 18/12/2023). El fin es aproximado: el informe 2023/24 dice que la directie es hoy también el bestuur.
    { nombre:'Jaap Veerman', corto:'Veerman', cargo:'Voorzitter', desde:'2023-12-14', hasta:'2024-07-01',
      fuente:'https://www.hartvannederland.nl/sport/artikelen/jaap-veerman-volgt-jan-smit-op-als-voorzitter-fc-volendam', confirmada:true },
    // Driebergen: algemeen directeur desde el 1/7/2024 (sucedió a Frans ten Berge); firma el informe 2023/24 (24/10/2024), por eso `firmo`. Se fue el 1/7/2025.
    { nombre:'Cees Driebergen', corto:'Driebergen', cargo:'Algemeen directeur', desde:'2024-07-01', hasta:'2025-07-01', firmo:[2024],
      fuente:'https://www.nhnieuws.nl/nieuws/337098/nieuwe-directie-fc-volendam-compleet-cees-driebergen-aangesteld-als-algemeen-directeur', confirmada:true },
    // Van der Pol: desde agosto de 2025 (sin día: 01); se fue el 31/8/2026 tras 13 meses (nhnieuws), todavía sin sucesor en las fuentes.
    { nombre:'Piet van der Pol', corto:'Van der Pol', cargo:'Algemeen directeur', desde:'2025-08-01', hasta:'2026-08-31',
      fuente:'https://www.nhnieuws.nl/nieuws/361930/opnieuw-neemt-fc-volendam-na-een-jaar-afscheid-van-algemeen-directeur', confirmada:true },
  ],
  'goaheadeagles-nl': [
    // Vierhouten: dueño (89,9% de Go Ahead Eagles Holding BV vía KOWET BV) desde que la KNVB aprobó la compra a Alex Kroes el 22/8/2022. Quien tiene la eindverantwoording
    // operativa es el statutair directeur Jan Willem van Dop (desde 2018/19, a tiempo completo desde el 1/7/2022); no se carga por el criterio del dueño.
    { nombre:'Kees Vierhouten', corto:'Vierhouten', cargo:'Eigenaar', desde:'2022-08-22', hasta:null,
      fuente:'Clubes/Países Bajos/Go Ahead Eagles/Go-Ahead-Eagles-Jaarverslag-2022-2023.md', confirmada:true },
  ],
  'nec-nl': [
    // Van Ingen: en el club desde abril de 2012; "officieel algemeen directeur" (único statutair directeur) desde el 17/12/2014.
    { nombre:'Bart van Ingen', corto:'Van Ingen', cargo:'Algemeen directeur', desde:'2014-12-17', hasta:'2017-08-01',
      fuente:'https://www.nec-nijmegen.nl/nieuws/nieuws/bart-van-ingen-benoemd-tot-algemeen-directeur-n.e.c..htm', confirmada:true },
    { nombre:'Wilco van Schaik', corto:'Van Schaik', cargo:'Algemeen directeur', desde:'2017-08-01', hasta:null,
      fuente:'https://www.nec-nijmegen.nl/nieuws/nieuws/wilco-van-schaik-nieuwe-algemeen-directeur-n.e.c..htm', confirmada:true },
  ],
  'telstar-nl': [
    // De Waard: 17 años como algemeen directeur (2006 a 2023; solo el año de inicio: 01/01).
    { nombre:'Pieter de Waard', corto:'De Waard', cargo:'Algemeen directeur', desde:'2006-01-01', hasta:'2023-07-01',
      fuente:'https://www.nhnieuws.nl/nieuws/319007/leon-annokkee-volgt-pieter-de-waard-op-als-algemeen-directeur-bij-telstar', confirmada:true },
    // Annokkée: algemeen directeur desde el 1/7/2023; firma el informe 2022/23 (30/10/2023), por eso `firmo` (el cierre fue el último día de De Waard).
    { nombre:'Leon Annokkée', corto:'Annokkée', cargo:'Algemeen directeur', desde:'2023-07-01', hasta:null, firmo:[2023],
      fuente:'Clubes/Países Bajos/Telstar/Telstar-Bestuursverslag-2022-2023.md', confirmada:true },
  ],
});
