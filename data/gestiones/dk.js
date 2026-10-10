// ============================================================================
// data/gestiones/dk.js: quién condujo cada club de Dinamarca y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// Cargo: 'Formand' (presidente del directorio). Salvo FC Midtjylland (dueño persona con nombre), la gestión es el
// bestyrelsesformand de la sociedad que firma el årsrapport (no el direktør: es quien figura en cada informe).
// FUENTE: salvo donde se cita otra, el propio årsrapport (ruta del .md en Clubes/Dinamarca/<club>/).
// CONVENCION DE FECHAS: el informe dice quién presidía al firmar, no el día del cambio. Cuando el cambio cae
// entre dos informes, el nuevo formand asume el primer día del primer ejercicio que firmó (01/01 en los que cierran
// el 31/12, 01/07 en los que cierran el 30/06) y el anterior termina esa misma fecha. El primero de cada serie
// arranca el primer día de su primer ejercicio con documento (la fuente no da el inicio real). Las fechas
// exactas (asamblea) figuran en el comentario de cada gestión.
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
  'agf-dk': [
    // Fournais: formand en todos los informes 2014 a 2021 (consejero desde 24/10/2008); en julio de 2025 sigue figurando como formand (inderes.dk, comunicado de AGF), por eso hasta null. Primer informe: 2013/14.
    { nombre:'Lars Fournais', corto:'Fournais', cargo:'Formand', desde:'2013-07-01', hasta:null,
      fuente:'Clubes/Dinamarca/AGF/aarsrapport-2014-06-30.md', confirmada:true },
  ],
  'brondby-dk': [
    // Cierre 31/12. Cambios por convencion (el informe 2016 trae "Jan Bech Andersen genopstiller ikke som formand" para la asamblea de 2016; Jesper Møller firma 2016 a 2018). Vuelta de Bech Andersen: asamblea del 2/4/2019 (informe 2019).
    { nombre:'Jan Bech Andersen', corto:'Bech Andersen', cargo:'Formand', desde:'2014-01-01', hasta:'2016-01-01',
      fuente:'Clubes/Dinamarca/Brøndby/aarsrapport-2014-12-31.md', confirmada:true },
    { nombre:'Jesper Møller', corto:'Møller', cargo:'Formand', desde:'2016-01-01', hasta:'2019-04-02',
      fuente:'Clubes/Dinamarca/Brøndby/aarsrapport-2016-12-31.md', confirmada:true },
    { nombre:'Jan Bech Andersen', corto:'Bech Andersen', cargo:'Formand', desde:'2019-04-02', hasta:null,
      fuente:'Clubes/Dinamarca/Brøndby/aarsrapport-2019-12-31.md', confirmada:true },
  ],
  'fckobenhavn-dk': [
    // Parken Sport & Entertainment. Formand del directorio, no el Koncerndirektør. Sin informe 2021 y 2022 en la carpeta.
    // Dueholm: formand en el informe 2014; no se presentó a la asamblea del 15/4 (tv2kosmopol.dk/kobenhavn/fck-skal-have-ny-formand, sin año en la nota; Rygaard entró al directorio en 2015 según el informe 2015). 15/4/2015 inferido.
    { nombre:'John Dueholm', corto:'Dueholm', cargo:'Formand', desde:'2014-01-01', hasta:'2015-04-15',
      fuente:'Clubes/Dinamarca/FC København/aarsrapport-2014-12-31-PSE-consolidado.md', confirmada:true },
    // Rygaard: se retiró tras seis años en la asamblea del 19/4/2021 (altinget.dk/artikel/formanden-for-parken-takker-af).
    { nombre:'Bo Rygaard', corto:'Rygaard', cargo:'Formand', desde:'2015-04-15', hasta:'2021-04-19',
      fuente:'Clubes/Dinamarca/FC København/aarsrapport-2015-12-31-PSE-consolidado.md', confirmada:true },
    // Møgelmose: era næstformand en 2020 y formand en los informes 2023 y 2024; la fecha de asuncion (asamblea del 19/4/2021) es inferida, no hay comunicado a mano.
    { nombre:'Henrik Møgelmose', corto:'Møgelmose', cargo:'Formand', desde:'2021-04-19', hasta:null,
      fuente:'Clubes/Dinamarca/FC København/aarsrapport-2023-12-31.md', confirmada:true },
  ],
  'nordsjaelland-dk': [
    // Right to Dream es el dueño (una organizacion, no una persona): se carga el formand del A/S.
    { nombre:'Allan K. Pedersen', corto:'Pedersen', cargo:'Formand', desde:'2013-01-01', hasta:'2015-01-01',
      fuente:'Clubes/Dinamarca/FC Nordsjælland/aarsrapport-2013-12-31.md', confirmada:true },
    { nombre:'Thomas Andrew Vernon', corto:'Vernon', cargo:'Formand', desde:'2015-01-01', hasta:'2020-01-01',
      fuente:'Clubes/Dinamarca/FC Nordsjælland/aarsrapport-2015-12-31.md', confirmada:true },
    { nombre:'Jan Laursen', corto:'Laursen', cargo:'Formand', desde:'2020-01-01', hasta:'2022-01-01',
      fuente:'Clubes/Dinamarca/FC Nordsjælland/aarsrapport-2020-12-31.md', confirmada:true },
    { nombre:'Thomas Andrew Vernon', corto:'Vernon', cargo:'Formand', desde:'2022-01-01', hasta:null,
      fuente:'Clubes/Dinamarca/FC Nordsjælland/aarsrapport-2022-12-31.md', confirmada:true },
  ],
  'randers-dk': [
    // Cierre 30/6. 2013 a 2016: Svend Lynge Jørgensen figura primero en Bestyrelse y firma primero (OCR dañado en las firmas); 2017 en adelante Per Hastrup firma como Formand.
    { nombre:'Svend Lynge Jørgensen', corto:'Lynge Jørgensen', cargo:'Formand', desde:'2012-07-01', hasta:'2016-07-01',
      fuente:'Clubes/Dinamarca/Randers FC/aarsrapport-2013-06-30.md', confirmada:true },
    { nombre:'Per Hastrup', corto:'Hastrup', cargo:'Formand', desde:'2016-07-01', hasta:null,
      fuente:'Clubes/Dinamarca/Randers FC/aarsrapport-2017-06-30.md', confirmada:true },
  ],
  'silkeborg-dk': [
    // 2012 a 2015: Kent Madsen firma como Bestyrelsesformand; 2024: Benjamin Albert Boycott figura como chairman y Lyhne como deputy chairman.
    { nombre:'Kent Madsen', corto:'Madsen', cargo:'Formand', desde:'2012-01-01', hasta:'2016-01-01',
      fuente:'Clubes/Dinamarca/Silkeborg IF/aarsrapport-2012-12-31.md', confirmada:true },
    { nombre:'Henrik Hedegård Lyhne', corto:'Lyhne', cargo:'Formand', desde:'2016-01-01', hasta:'2024-01-01',
      fuente:'Clubes/Dinamarca/Silkeborg IF/aarsrapport-2016-12-31.md', confirmada:true },
    { nombre:'Benjamin Albert Boycott', corto:'Boycott', cargo:'Formand', desde:'2024-01-01', hasta:null,
      fuente:'Clubes/Dinamarca/Silkeborg IF/aarsrapport-2024-12-31.md', confirmada:true },
  ],
  'sonderjyske-dk': [
    // Cierre 30/6. Kohls firma 2013 a 2021; Davidsen firma 2022 como formand.
    { nombre:'Gynther Kohls', corto:'Kohls', cargo:'Formand', desde:'2012-07-01', hasta:'2021-07-01',
      fuente:'Clubes/Dinamarca/SønderjyskE/aarsrapport-2013-06-30.md', confirmada:true },
    { nombre:'Søren Peder Dalager Davidsen', corto:'Davidsen', cargo:'Formand', desde:'2021-07-01', hasta:null,
      fuente:'Clubes/Dinamarca/SønderjyskE/aarsrapport-2022-06-30.md', confirmada:true },
  ],
  'vejle-dk': [
    // Sin cubrir 2012 y 2013 (los informes no marcan quien es formand). Ver tambien nota en el reporte: prensa cita a Tage Pedersen como chairman de Vejle Boldklub desde 2022.
    { nombre:'Gert Eg', corto:'Eg', cargo:'Formand', desde:'2014-01-01', hasta:'2016-01-01',
      fuente:'Clubes/Dinamarca/Vejle/aarsrapport-2014-12-31.md', confirmada:true },
    { nombre:'Flemming Jensen', corto:'Jensen', cargo:'Formand', desde:'2016-01-01', hasta:'2017-01-01',
      fuente:'Clubes/Dinamarca/Vejle/aarsrapport-2016-12-31.md', confirmada:true },
    { nombre:'Andrei Zolotko', corto:'Zolotko', cargo:'Formand', desde:'2017-01-01', hasta:'2024-01-01',
      fuente:'Clubes/Dinamarca/Vejle/aarsrapport-2017-12-31.md', confirmada:true },
    { nombre:'Klaus Skov Eskildsen', corto:'Skov Eskildsen', cargo:'Formand', desde:'2024-01-01', hasta:null,
      fuente:'Clubes/Dinamarca/Vejle/aarsrapport-2024-12-31.md', confirmada:true },
  ],
  'viborg-dk': [
    // Cierre 30/6. Kim Nielsen firma como formand todos los informes 2012 a 2024; inicio real no documentado.
    { nombre:'Kim Nielsen', corto:'Nielsen', cargo:'Formand', desde:'2011-07-01', hasta:null,
      fuente:'Clubes/Dinamarca/Viborg FF/aarsrapport-2012-06-30.md', confirmada:true },
  ],
  'ob-dk': [
    // Odense Boldklub A/S. Niels Thorborg figura como "Direktør ... formand" en todos los informes 2014 a 2021.
    { nombre:'Niels Thorborg', corto:'Thorborg', cargo:'Formand', desde:'2014-01-01', hasta:null,
      fuente:'Clubes/Dinamarca/OB/aarsrapport-2014-12-31.md', confirmada:true },
  ],
});
