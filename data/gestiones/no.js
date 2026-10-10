// ============================================================================
// data/gestiones/no.js: quién condujo cada club de Noruega y desde/hasta cuándo (to-do 195).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. Los clubes noruegos son foreninger (asociaciones, sin dueño) o AS
// (Sandefjord, Sarpsborg Fotball Invest): la gestión es el styreleder (presidente del directorio) de la
// entidad que firma el documento del alta, como lo pide el `name` de cada club (Molde Fotballklubb,
// Viking Fotballklubb, Aalesund y Fredrikstad: la forening, no la AS filial).
// FUENTE: salvo donde se cita otra, es el propio årsregnskap/årsberetning (ruta del .md en
// Clubes/Noruega/<club>/), donde el styreleder firma el informe y figura en "Styrets sammensetning".
// CONVENCION DE FECHAS: los informes dicen quién presidía al firmar, no el día del cambio. Cuando el
// cambio cae entre dos informes consecutivos, el nuevo presidente asume el 01/01 del año de su primer
// ejercicio firmado (aproximado, el cambio real suele ser en el årsmøte de febrero-marzo del año siguiente
// al ejercicio) y el anterior termina esa misma fecha. El primer presidente de cada club arranca el 01/01
// de su primer ejercicio con documento (la fuente no da el inicio real), y el último de una serie que
// termina antes de 2025 cierra el 01/01 posterior a su último ejercicio documentado. Las fechas exactas
// (årsmøte o aviso del propio informe) están marcadas en el comentario de cada gestión.
// Donde falta el documento de uno o más ejercicios entre dos presidentes distintos, el hueco queda sin cubrir.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'aalesund-no': [
    // Forening (Aalesunds FK, aarsregnskap-fotballklubb-fli-*). Fechas por convencion. Standal firma 2008 a 2010.
    { nombre:'Torill Hole Standal', corto:'Standal', cargo:'Presidente', desde:'2008-01-01', hasta:'2011-01-01',
      fuente:'Clubes/Noruega/Aalesund/aarsregnskap-fotballklubb-fli-2008.md', confirmada:true },
    { nombre:'Kjell Tennfjord', corto:'Tennfjord', cargo:'Presidente', desde:'2011-01-01', hasta:'2015-01-01',
      fuente:'Clubes/Noruega/Aalesund/aarsregnskap-fotballklubb-fli-2011.md', confirmada:true },
    { nombre:'Reidar Mjelde', corto:'Mjelde', cargo:'Presidente', desde:'2015-01-01', hasta:'2017-01-01',
      fuente:'Clubes/Noruega/Aalesund/aarsregnskap-fotballklubb-fli-2015.md', confirmada:true },
    { nombre:'Jan Petter Hagen', corto:'Hagen', cargo:'Presidente', desde:'2017-01-01', hasta:'2023-01-01',
      fuente:'Clubes/Noruega/Aalesund/aarsregnskap-fotballklubb-fli-2017.md', confirmada:true },
    { nombre:'Gunnar Haagensen', corto:'Haagensen', cargo:'Presidente', desde:'2023-01-01', hasta:null,
      fuente:'Clubes/Noruega/Aalesund/aarsregnskap-fotballklubb-fli-2023.md', confirmada:true },
  ],
  'bodoglimt-no': [
    // Eidissen: presidente hasta el 15/1/2009 (informe 2008: "Leder Benn Eidissen (til 15. januar 2009)"); desde 01/01/2008 por convencion.
    { nombre:'Benn Eidissen', corto:'Eidissen', cargo:'Presidente', desde:'2008-01-01', hasta:'2009-01-15',
      fuente:'Clubes/Noruega/Bodø-Glimt/aarsregnskap-2008.md', confirmada:true },
    // Thomassen: presidente interino desde el 15/1/2009 (informe 2008); firma 2009 y 2010 como styreleder.
    { nombre:'Frode Thomassen', corto:'Thomassen', cargo:'Presidente', desde:'2009-01-15', hasta:'2011-01-01',
      fuente:'Clubes/Noruega/Bodø-Glimt/aarsregnskap-2008.md', confirmada:true },
    { nombre:'Mads Torrissen', corto:'Torrissen', cargo:'Presidente', desde:'2011-01-01', hasta:'2017-01-01',
      fuente:'Clubes/Noruega/Bodø-Glimt/aarsregnskap-2011.md', confirmada:true },
    // Ingebrigtsen: firma 2017; la ficha de la temporada 2021 en en.wikipedia la da de presidenta (2019 y 2020 igual). Sin informes 2018 a 2022: continuidad por esas fichas.
    { nombre:'Hege Leirfall Ingebrigtsen', corto:'Ingebrigtsen', cargo:'Presidente', desde:'2017-01-01', hasta:'2022-01-01',
      fuente:'Clubes/Noruega/Bodø-Glimt/aarsregnskap-2017.md', confirmada:true },
    // Andersen: ficha de la temporada 2022 en en.wikipedia (sin fecha de asuncion: 01/01/2022 por convencion); firma 2023 a 2025.
    { nombre:'Inge Henning Andersen', corto:'Andersen', cargo:'Presidente', desde:'2022-01-01', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/2022_FK_Bod%C3%B8/Glimt_season', confirmada:true },
  ],
  'brann-no': [
    { nombre:'Magne Revheim', corto:'Revheim', cargo:'Presidente', desde:'2008-01-01', hasta:'2009-01-01',
      fuente:'Clubes/Noruega/Brann/aarsregnskap-2008.md', confirmada:true },
    { nombre:'Hans Martin Brandtun', corto:'Brandtun', cargo:'Presidente', desde:'2009-01-01', hasta:'2010-01-01',
      fuente:'Clubes/Noruega/Brann/aarsregnskap-2009.md', confirmada:true },
    { nombre:'Lars Moldestad', corto:'Moldestad', cargo:'Presidente', desde:'2010-01-01', hasta:'2013-01-01',
      fuente:'Clubes/Noruega/Brann/aarsregnskap-2010.md', confirmada:true },
    { nombre:'Mette Nora Sætre', corto:'Sætre', cargo:'Presidente', desde:'2013-01-01', hasta:'2014-01-01',
      fuente:'Clubes/Noruega/Brann/aarsregnskap-2013.md', confirmada:true },
    { nombre:'Rolf Jørgen Barmen', corto:'Barmen', cargo:'Presidente', desde:'2014-01-01', hasta:'2015-01-01',
      fuente:'Clubes/Noruega/Brann/aarsregnskap-2014.md', confirmada:true },
    { nombre:'Eivind Lunde', corto:'Lunde', cargo:'Presidente', desde:'2015-01-01', hasta:'2021-01-01',
      fuente:'Clubes/Noruega/Brann/aarsregnskap-2015.md', confirmada:true },
    { nombre:'Siv Elisabeth Rosendahl Skard', corto:'Skard', cargo:'Presidente', desde:'2021-01-01', hasta:'2022-01-01',
      fuente:'Clubes/Noruega/Brann/aarsregnskap-2021.md', confirmada:true },
    { nombre:'Aslak Sverdrup', corto:'Sverdrup', cargo:'Presidente', desde:'2022-01-01', hasta:null,
      fuente:'Clubes/Noruega/Brann/aarsregnskap-2022.md', confirmada:true },
  ],
  'fredrikstad-no': [
    // Forening (Fredrikstad FK, aarsregnskap-fotballklubb-fli-*). Umbach Hansen: tras el årsmøte extraordinario de marzo de 2012 (informe 2012, sin dia: 01).
    { nombre:'Gunnar Umbach Hansen', corto:'Umbach Hansen', cargo:'Presidente', desde:'2012-03-01', hasta:'2013-08-14',
      fuente:'Clubes/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2012.md', confirmada:true },
    // Olsen: elegido en el årsmøte del 14/8/2013 (informe 2013: al traspasar FFK Sport AS a la forening).
    { nombre:'Arne Erik Olsen', corto:'Olsen', cargo:'Presidente', desde:'2013-08-14', hasta:'2017-01-01',
      fuente:'Clubes/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2013.md', confirmada:true },
    { nombre:'Jostein Lunde', corto:'Lunde', cargo:'Presidente', desde:'2017-01-01', hasta:'2019-01-01',
      fuente:'Clubes/Noruega/Fredrikstad/aarsregnskap-fotballklubb-fli-2017.md', confirmada:true },
  ],
  'hamkam-no': [
    // Meyer firma 2009; no hay informe 2010, queda sin cubrir.
    { nombre:'Morten Andreas Meyer', corto:'Meyer', cargo:'Presidente', desde:'2009-01-01', hasta:'2010-01-01',
      fuente:'Clubes/Noruega/HamKam/aarsregnskap-2009.md', confirmada:true },
    { nombre:'Tor Rullestad', corto:'Rullestad', cargo:'Presidente', desde:'2011-01-01', hasta:'2013-02-01',
      fuente:'Clubes/Noruega/HamKam/aarsregnskap-2011.md', confirmada:true },
    // Kristiansen: "På årsmøtet i februar 2013 ... Morten Kristiansen tok over" (informe 2013, sin dia: 01).
    { nombre:'Morten Kristiansen', corto:'Kristiansen', cargo:'Presidente', desde:'2013-02-01', hasta:'2015-01-01',
      fuente:'Clubes/Noruega/HamKam/aarsregnskap-2013.md', confirmada:true },
    { nombre:'Truls Nordby Johansen', corto:'Johansen', cargo:'Presidente', desde:'2015-01-01', hasta:'2020-01-01',
      fuente:'Clubes/Noruega/HamKam/aarsregnskap-2015.md', confirmada:true },
    { nombre:'Rune Strand', corto:'Strand', cargo:'Presidente', desde:'2020-01-01', hasta:'2023-01-01',
      fuente:'Clubes/Noruega/HamKam/aarsregnskap-2020.md', confirmada:true },
    { nombre:'Ronny Pedersen', corto:'Pedersen', cargo:'Presidente', desde:'2023-01-01', hasta:'2025-01-01',
      fuente:'Clubes/Noruega/HamKam/aarsregnskap-2023.md', confirmada:true },
    { nombre:'Tom Haakonsen', corto:'Haakonsen', cargo:'Presidente', desde:'2025-01-01', hasta:null,
      fuente:'Clubes/Noruega/HamKam/aarsregnskap-2025.md', confirmada:true },
  ],
  'kfum-no': [
    // Oslo KFUM: presidente del hovedstyre (leder) en los informes 2018 y 2019.
    { nombre:'Gaute Hartberg', corto:'Hartberg', cargo:'Presidente', desde:'2018-01-01', hasta:'2020-01-01',
      fuente:'Clubes/Noruega/KFUM/aarsregnskap-osloKFUM-2018.md', confirmada:true },
  ],
  'kristiansund-no': [
    { nombre:'Vidar Solli', corto:'Solli', cargo:'Presidente', desde:'2008-01-01', hasta:'2009-01-01',
      fuente:'Clubes/Noruega/Kristiansund/aarsregnskap-2008.md', confirmada:true },
    { nombre:'Geir Haanshuus', corto:'Haanshuus', cargo:'Presidente', desde:'2009-01-01', hasta:'2011-01-01',
      fuente:'Clubes/Noruega/Kristiansund/aarsregnskap-2009.md', confirmada:true },
    // Wiik firma 2011 y 2013 (no hay documento 2012).
    { nombre:'Terje Wiik', corto:'Wiik', cargo:'Presidente', desde:'2011-01-01', hasta:'2014-01-01',
      fuente:'Clubes/Noruega/Kristiansund/aarsregnskap-2011.md', confirmada:true },
    { nombre:'Bente Weiseth Frantzen', corto:'Frantzen', cargo:'Presidente', desde:'2014-01-01', hasta:'2015-01-01',
      fuente:'Clubes/Noruega/Kristiansund/aarsregnskap-2014.md', confirmada:true },
    { nombre:'Finn Backer', corto:'Backer', cargo:'Presidente', desde:'2015-01-01', hasta:'2020-01-01',
      fuente:'Clubes/Noruega/Kristiansund/aarsregnskap-2015.md', confirmada:true },
    { nombre:'Per Otto Dyb', corto:'Dyb', cargo:'Presidente', desde:'2020-01-01', hasta:'2024-01-01',
      fuente:'Clubes/Noruega/Kristiansund/aarsregnskap-2020.md', confirmada:true },
    { nombre:'Odd Einar Folland', corto:'Folland', cargo:'Presidente', desde:'2024-01-01', hasta:null,
      fuente:'Clubes/Noruega/Kristiansund/aarsregnskap-2024.md', confirmada:true },
  ],
  'lillestrom-no': [
    { nombre:'Per Mathisen', corto:'Mathisen', cargo:'Presidente', desde:'2008-01-01', hasta:'2012-01-01',
      fuente:'Clubes/Noruega/Lillestrøm/aarsregnskap-2008.md', confirmada:true },
  ],
  'molde-no': [
    // Forening (Molde Fotballklubb). El nombre "Oddne Hansen" es como lo imprime el informe 2008 (posible error de OCR de otro nombre).
    { nombre:'Oddne Hansen', corto:'Hansen', cargo:'Presidente', desde:'2008-01-01', hasta:'2009-02-25',
      fuente:'Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2008.md', confirmada:true },
    // Berg: el hovedstyre elegido en el årsmøte del 25/2/2009 lo tiene de leder (informe 2009); sigue tras los årsmøtes de 2010 y 2011.
    { nombre:'Erik Berg', corto:'Berg', cargo:'Presidente', desde:'2009-02-25', hasta:'2012-02-29',
      fuente:'Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2009.md', confirmada:true },
    // Neerland: leder tras el årsmøte del 29/2/2012 (informe 2012); sigue tras el del 26/2/2014. En 2015 el informe lo firma Moen como "styrets leder (konst)" y nombra a Neerland "klubbens leder".
    { nombre:'Øystein Neerland', corto:'Neerland', cargo:'Presidente', desde:'2012-02-29', hasta:'2016-01-01',
      fuente:'Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2012.md', confirmada:true },
    // Moen: firma 2015 como interino (firmo) y 2016 a 2025 como styrets leder.
    { nombre:'Odd Ivar Moen', corto:'Moen', cargo:'Presidente', desde:'2016-01-01', hasta:null, firmo:[2015],
      fuente:'Clubes/Noruega/Molde/aarsregnskap-fotballklubb-fli-2016.md', confirmada:true },
  ],
  'rosenborg-no': [
    // Svendsen firma el informe 2008 (11/2/2009), 2009, 2010 y 2011.
    { nombre:'Terje Svendsen', corto:'Svendsen', cargo:'Presidente', desde:'2008-01-01', hasta:'2012-02-01',
      fuente:'Clubes/Noruega/Rosenborg/aarsregnskap-2008.md', confirmada:true },
    // Koteng: "På årsmøtet i februar 2012 ... Ivar Koteng tok over" (informe 2012, sin dia: 01).
    { nombre:'Ivar Koteng', corto:'Koteng', cargo:'Presidente', desde:'2012-02-01', hasta:'2014-01-01',
      fuente:'Clubes/Noruega/Rosenborg/aarsregnskap-2012.md', confirmada:true },
  ],
  'sandefjord-no': [
    // Sandefjord Fotball AS: Bjønness firma desde el informe 2008 hasta el 2025 (el nombre sale impreso de formas distintas por OCR). Sin dueño con nombre.
    { nombre:'Gunnar Bjønness', corto:'Bjønness', cargo:'Presidente', desde:'2008-01-01', hasta:null,
      fuente:'Clubes/Noruega/Sandefjord/aarsregnskap-sandefjord-fotball-as-2008.md', confirmada:true },
  ],
  'sarpsborg08-no': [
    // Sarpsborg Fotball Invest AS (el documento es del vehiculo inversor, no del club): Jon Andersen firma 2008 y Jon Roger Andersen 2023; el nombre coincide, pero los ejercicios 2009 a 2022 no tienen documento.
    { nombre:'Jon Andersen', corto:'Andersen', cargo:'Presidente', desde:'2008-01-01', hasta:'2009-01-01',
      fuente:'Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotball-invest-as-2008.md', confirmada:true },
    { nombre:'Jon Roger Andersen', corto:'Andersen', cargo:'Presidente', desde:'2023-01-01', hasta:'2024-01-01',
      fuente:'Clubes/Noruega/Sarpsborg 08/aarsregnskap-fotball-invest-as-2023.md', confirmada:true },
  ],
  'start-no': [
    // IK Start (forening). Myhre: elegido en el årsmøte de marzo de 2009 (informe 2009, sin dia: 01). Dejó en agosto de 2009.
    { nombre:'Audun Myhre', corto:'Myhre', cargo:'Presidente', desde:'2009-03-01', hasta:'2009-09-15',
      fuente:'Clubes/Noruega/Start/aarsregnskap-2009.md', confirmada:true },
    // Edvardsen: asumio el 15/9/2009 hasta el årsmøte (informe 2009; la fecha del årsmøte 2010 no figura: 01/01/2010 por convencion). Firma 2009.
    { nombre:'Tom Edvardsen', corto:'Edvardsen', cargo:'Presidente', desde:'2009-09-15', hasta:'2010-01-01',
      fuente:'Clubes/Noruega/Start/aarsregnskap-2009.md', confirmada:true },
    // Kristiansen: leder del styre elegido en el årsmøte de marzo de 2014 (informe 2014, sin dia: 01). No hay documentos 2010 a 2013.
    { nombre:'Magne Kristiansen', corto:'Kristiansen', cargo:'Presidente', desde:'2014-03-01', hasta:'2015-01-01',
      fuente:'Clubes/Noruega/Start/aarsregnskap-2014.md', confirmada:true },
  ],
  'tromso-no': [
    { nombre:'Stig Bjørklund', corto:'Bjørklund', cargo:'Presidente', desde:'2022-01-01', hasta:'2023-01-01',
      fuente:'Clubes/Noruega/Tromsø/aarsregnskap-idrettslag-fli-2022.md', confirmada:true },
  ],
  'valerenga-no': [
    // Lind: styreleder de Vålerenga Fotball AS (informe 2020); Munkvold: styreleder en el informe 2023 de la forening matriz. Entidades distintas: ver criterio en el reporte.
    { nombre:'Erling Lind', corto:'Lind', cargo:'Presidente', desde:'2020-01-01', hasta:'2021-01-01',
      fuente:'Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-as-2020.md', confirmada:true },
    { nombre:'Jimmy Ragnar Munkvold', corto:'Munkvold', cargo:'Presidente', desde:'2023-01-01', hasta:'2024-01-01',
      fuente:'Clubes/Noruega/Vålerenga/aarsregnskap-valerenga-fotball-parent-fli-2023.md', confirmada:true },
  ],
  'viking-no': [
    // Viking FK (forening). Granfelt (leder en 2015) y Bertelsen (leder en 2022); sin documentos entre medio.
    { nombre:'Charlie Granfelt', corto:'Granfelt', cargo:'Presidente', desde:'2015-01-01', hasta:'2016-01-01',
      fuente:'Clubes/Noruega/Viking/aarsregnskap-fotballklubb-fli-2015.md', confirmada:true },
    { nombre:'Rune Bertelsen', corto:'Bertelsen', cargo:'Presidente', desde:'2022-01-01', hasta:'2023-01-01',
      fuente:'Clubes/Noruega/Viking/aarsregnskap-fotballklubb-fli-2022.md', confirmada:true },
  ],
});
