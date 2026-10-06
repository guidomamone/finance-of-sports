// ============================================================================
// data/gestiones/de.js: quién condujo cada club de Alemania y desde/hasta cuándo (to-do 149).
// El formato, la regla de qué ejercicio es de qué gestión y el campo `firmo` están explicados en la
// cabecera de data/gestiones/ar.js. En una sociedad se carga el dueño solo si es una persona con nombre.
// ============================================================================

window.CLUB_GESTIONES = window.CLUB_GESTIONES || {};

Object.assign(window.CLUB_GESTIONES, {
  'bayernmunich-de': [
    // Cargo de quien firma: Vorstandsvorsitzender de la FC Bayern München AG. El presidente del e.V. (Herbert Hainer, desde 2019) es otro cargo y no se carga.
    // Rummenigge: Vorstandsvorsitzender desde 2002 (solo año en la fuente, 1/1 aproximado).
    { nombre:'Karl-Heinz Rummenigge', corto:'Rummenigge', cargo:'Vorstandsvorsitzender (CEO)', desde:'2002-01-01', hasta:'2021-07-01',
      fuente:'https://en.wikipedia.org/wiki/Oliver_Kahn', confirmada:true },
    { nombre:'Oliver Kahn', corto:'Kahn', cargo:'Vorstandsvorsitzender (CEO)', desde:'2021-07-01', hasta:'2023-05-27',
      fuente:'https://en.wikipedia.org/wiki/Oliver_Kahn', confirmada:true },
    // Dreesen asumió tras el despido de Kahn (votado el 26/5/2023); el 27/5/2023 es la fecha que da la prensa. Cierre del ejercicio 2023: 30/6/2023, ya con Dreesen.
    { nombre:'Jan-Christian Dreesen', corto:'Dreesen', cargo:'Vorstandsvorsitzender (CEO)', desde:'2023-05-27', hasta:null,
      fuente:'https://www.bundesliga.com/de/bundesliga/news/fc-bayern-munchen-jan-christian-dreesen-vorstandsvorsitzender-verlangerung-29706', confirmada:true },
  ],
  'dortmund-de': [
    // Watzke: Vorsitzender der Geschäftsführung desde 2005 (solo año en la fuente, 1/1 aproximado); dejó el cargo al ser elegido presidente del e.V. el 23/11/2025.
    { nombre:'Hans-Joachim Watzke', corto:'Watzke', cargo:'Vorsitzender der Geschäftsführung', desde:'2005-01-01', hasta:'2025-11-23',
      fuente:'https://www.bvb.de/de/de/aktuelles/news/news.html/2025/11/23/Mitgliederversammlung-waehlt-Hans-Joachim-Watzke-zum-BVB-Praesidenten.html', confirmada:true },
  ],
  'stuttgart-de': [
    { nombre:'Alexander Wehrle', corto:'Wehrle', cargo:'Vorstandsvorsitzender', desde:'2022-03-21', hasta:null,
      fuente:'https://en.wikipedia.org/wiki/Alexander_Wehrle', confirmada:true },
  ],
  'hoffenheim-de': [
    // Schütz asumió el 8/7/2024, después del cierre del ejercicio 2024 (30/6/2024), pero firmó ese Konzernabschluss (Zuzenhausen, 7/10/2024, "Dr. Markus Schütz, Geschäftsführer"): firmo:[2024].
    // Antes de él no había Vorsitzender (los Geschäftsführer eran Strich, Mayer y Rosen); Peter Görlich salió de la Geschäftsführung el 1/6/2021, así que no cubre ningún año cargado.
    { nombre:'Markus Schütz', corto:'Schütz', cargo:'Vorsitzender der Geschäftsführung', desde:'2024-07-08', hasta:null, firmo:[2024],
      fuente:'https://www.tsg-hoffenheim.de/aktuelles/news/2024/07/neuausrichtung-bei-der-tsg-hoffenheim', confirmada:true },
  ],
  'werderbremen-de': [
    // Filbry: Vorsitzender der Geschäftsführung desde noviembre de 2012 (solo mes en la fuente, día 01 aproximado).
    { nombre:'Klaus Filbry', corto:'Filbry', cargo:'Vorsitzender der Geschäftsführung', desde:'2012-11-01', hasta:null,
      fuente:'https://www.weser-kurier.de/werder/das-ist-werder-geschaeftsfuehrer-klaus-filbry-doc7e5xm7mngdhajibgcdj', confirmada:true },
  ],
});
